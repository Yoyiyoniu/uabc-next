import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";

const checkPortalAvailability = async (): Promise<boolean> => {
	try {
		console.log("🔍 Verificando disponibilidad del portal...");
		const res = await axios.get("/api/uabc/web/alumnos/entrada", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			withCredentials: true,
			timeout: 10000,
		});

		const isAvailable =
			res.status === 200 && res.data.includes("Portal de Alumnos");
		console.log("✅ Portal disponible:", isAvailable);
		return isAvailable;
	} catch (err) {
		console.error("❌ Error al verificar disponibilidad del portal:", err);
		return false;
	}
};

const getUabcAuthToken = async (): Promise<string | null> => {
	try {
		console.log("🔑 Obteniendo token de autenticación...");
		const res = await axios.get("/uabc/login", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			withCredentials: true,
		});

		const html = res.data;
		const $ = cheerio.load(html);

		const formAction = $('form[id*="loginForm"]').attr("action");
		console.log("📝 Form action encontrado:", formAction ? "Sí" : "No");

		if (!formAction) {
			console.error("❌ No se encontró el formulario de login");
			return null;
		}

		const match = formAction.match(/p_auth=([a-zA-Z0-9]+)/);
		if (match?.[1]) {
			console.log(`✅ Token p_auth obtenido: ${match[1].substring(0, 8)}...`);
			return match[1];
		}

		console.error("❌ No se pudo extraer el token p_auth del form action");
		return null;
	} catch (err) {
		console.error("❌ Error al obtener el token p_auth:", err);
		return null;
	}
};

const getCsrfToken = async (): Promise<string | null> => {
	try {
		console.log("🛡️ Obteniendo token CSRF...");
		const res = await axios.get("/uabc/login", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			withCredentials: true,
		});

		const html = res.data;
		const $ = cheerio.load(html);

		const csrfToken = $(
			'input[name="_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_formDate"]',
		).val();

		if (csrfToken) {
			console.log(
				`✅ Token CSRF obtenido: ${csrfToken.toString().substring(0, 8)}...`,
			);
		} else {
			console.error("❌ No se encontró el token CSRF en el formulario");
		}

		return csrfToken?.toString() || null;
	} catch (err) {
		console.error("❌ Error al obtener el token CSRF:", err);
		return null;
	}
};

export const loginWithUabc = async (email: string, password: string) => {
	try {
		console.log("🚀 Iniciando proceso de autenticación...");

		const isPortalAvailable = await checkPortalAvailability();
		if (!isPortalAvailable) {
			console.error("❌ Portal no disponible");
			throw new Error("Portal de alumnos no disponible en este momento");
		}

		const authToken = await getUabcAuthToken();
		if (!authToken) {
			console.error("❌ No se pudo obtener el token de autenticación");
			throw new Error("No se pudo obtener el token de autenticación");
		}

		const csrfToken = await getCsrfToken();
		if (!csrfToken) {
			console.error("❌ No se pudo obtener el token CSRF");
			throw new Error("No se pudo obtener el token CSRF");
		}

		console.log("📤 Preparando datos de login...");
		const loginData = new URLSearchParams();

		loginData.append(
			"_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_login",
			email,
		);
		loginData.append(
			"_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_password",
			password,
		);
		loginData.append(
			"_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_formDate",
			csrfToken,
		);
		loginData.append(
			"_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_saveLastPath",
			"false",
		);
		loginData.append(
			"_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_redirect",
			"",
		);
		loginData.append(
			"_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_doActionAfterLogin",
			"false",
		);

		const LOGIN_URL = `/uabc/login?p_p_id=com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_javax.portlet.action=/login/login&_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_mvcRenderCommandName=/login/login&p_auth=${authToken}`;

		console.log("📡 Enviando solicitud de login...");
		const loginRes = await axios.post(LOGIN_URL, loginData, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			withCredentials: true,
			maxRedirects: 5,
			validateStatus: (status) => status < 400,
			timeout: 15000,
		});

		console.log(
			"📊 Respuesta del login:",
			loginRes.status,
			loginRes.statusText,
		);
		console.log("📄 Tipo de respuesta:", typeof loginRes.data);
		console.log("📏 Tamaño de respuesta:", loginRes.data?.length || 0);

		if (typeof loginRes.data === "string" && loginRes.data.includes("<html")) {
			console.log("🔄 Redirección detectada, verificando autenticación...");

			const confirmLoginRes = await axios.get(
				"/uabc/info/informacion-academica",
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					withCredentials: true,
					timeout: 10000,
				},
			);

			console.log("🔍 Verificando página de información académica...");
			console.log("📊 Status de confirmación:", confirmLoginRes.status);

			if (
				confirmLoginRes.data.includes(
					"<title>Información Académica - Portal de Alumnos - UABC</title>",
				)
			) {
				console.log("✅ Autenticación exitosa");
				return true;
			}

			console.log("❌ No se encontró la página de información académica");
			console.log(
				`📄 Contenido de la página: ${confirmLoginRes.data.substring(0, 200)}...`,
			);
		} else {
			console.log("❌ No se detectó redirección HTML");
			console.log(
				`📄 Contenido de respuesta: ${loginRes.data?.substring(0, 200)}...`,
			);
		}

		console.log("❌ Credenciales incorrectas");
		return "Credenciales incorrectas";
	} catch (error) {
		console.error("💥 Error durante el proceso de login:");

		if (error instanceof AxiosError) {
			console.error("📊 Status:", error.response?.status);
			console.error("📝 Status Text:", error.response?.statusText);
			console.error("🔗 URL:", error.config?.url);
			console.error("📋 Headers de respuesta:", error.response?.headers);
			console.error(
				`📄 Datos de respuesta: ${error.response?.data?.substring(0, 200)}...`,
			);
			console.error("🔧 Código de error:", error.code);
			console.error("📝 Mensaje:", error.message);

			if (error.code === "ERR_NETWORK") {
				console.error("🌐 Error de red - Portal no disponible");
				throw new Error("Portal no disponible");
			}

			if (error.response?.status === 403) {
				console.error("🚫 Acceso denegado (403)");
				throw new Error(
					"Acceso denegado. Verifica tus credenciales o intenta más tarde.",
				);
			}

			if (error.code === "ECONNABORTED") {
				console.error("⏰ Timeout - Tiempo de espera agotado");
				throw new Error("Tiempo de espera agotado. Intenta nuevamente.");
			}
		} else {
			console.error("❓ Error desconocido:", error);
		}

		throw new Error("Error al iniciar sesión");
	}
};
