import { type Page, chromium } from "playwright";
import { BROWSER_CONFIG, CONTEXT_CONFIG } from "./BrowserConstrains";

const LOGIN_URL = "https://alumnos.uabc.mx/web/alumnos/entrada";

const setupBrowserStealth = async (page: Page) => {
	await page.addInitScript(() => {
		Object.defineProperty(navigator, "webdriver", { get: () => undefined });
		Object.defineProperty(navigator, "plugins", {
			get: () => [{ name: "Chrome PDF Plugin" }],
		});
		Object.defineProperty(navigator, "languages", {
			get: () => ["es-ES", "es", "en"],
		});
		(window as Window & { chrome?: { runtime: object } }).chrome = {
			runtime: {},
		};
	});

	await page.route("**/*", (route) => {
		const resourceType = route.request().resourceType();
		const blockedResources = [
			"image",
			"stylesheet",
			"font",
			"media",
			"manifest",
			"texttrack",
			"websocket",
			"other",
		];

		if (blockedResources.includes(resourceType)) {
			route.abort();
		} else {
			route.continue();
		}
	});

	await page.addInitScript(() => {
		const style = document.createElement("style");
		style.textContent = `
			*, *::before, *::after {
				animation-duration: 0.01ms !important;
				animation-delay: 0.01ms !important;
				transition-duration: 0.01ms !important;
				transition-delay: 0.01ms !important;
			}
		`;
		document.head.appendChild(style);
	});
};

export const login = async (email: string, password: string) => {
	const browser = await chromium.launch(BROWSER_CONFIG);

	const context = await browser.newContext(CONTEXT_CONFIG);
	const page = await context.newPage();

	try {
		await setupBrowserStealth(page);

		await page.goto(LOGIN_URL, {
			waitUntil: "domcontentloaded",
			timeout: 8000,
		});

		await page.waitForSelector(
			'input[name="_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_login"]',
			{ timeout: 3000 },
		);

		await page.evaluate(() => {
			const emailField = document.querySelector(
				'input[name="_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_login"]',
			) as HTMLInputElement;
			if (emailField) emailField.value = "";
		});

		await page.fill(
			'input[name="_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_login"]',
			email,
		);
		await page.fill(
			'input[name="_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_password"]',
			password,
		);

		await Promise.all([
			page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 8000 }),
			page.click('button[type="submit"]'),
		]);

		const loginSuccess = !page.url().includes("/web/alumnos/entrada");

		await page.close();
		await browser.close();

		return loginSuccess
			? true
			: new Error("Login fallido - credenciales incorrectas");
	} catch (error) {
		await page.close();
		await browser.close();
		return new Error(
			error instanceof Error
				? error.message
				: "Error desconocido durante el login",
		);
	}
};
