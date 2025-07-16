import { createFileRoute } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { type FormEvent, useState } from "react";

import IconAt from "@/assets/icons/IconAt";
import IconEye from "@/assets/icons/IconEye";
import IconEyeClose from "@/assets/icons/IconEyeClose";
import IconLoading from "@/assets/icons/IconLoading";
import UabcLogo from "@/assets/icons/main/UabcLogo";
import { loginWithUabc } from "@/lib/loginWithUabc";

export const Route = createFileRoute("/estudiantes_/login")({
	component: LoginPage,
});

function LoginPage() {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const result = await loginWithUabc(
				credentials.email,
				credentials.password,
			);

			if (result === true) {
				window.location.href = "/estudiantes";
			} else {
				setError(result);
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				setError(err.response?.data.message);
			} else {
				setError(
					"Error de conexión. Verifica tu internet e intenta nuevamente.",
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const updateCredentials = (
		field: keyof typeof credentials,
		value: string,
	) => {
		setCredentials((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-blue-50 flex items-center justify-center px-4">
			<section className="max-w-md w-full">
				<header className="text-center mb-8">
					<div className="flex items-center justify-center space-x-3 mb-6">
						<div className="w-12 h-12 relative">
							<UabcLogo />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">UABC Next</h1>
							<p className="text-sm text-emerald-600 font-medium">
								Portal Estudiantil
							</p>
						</div>
					</div>
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Iniciar Sesión
					</h2>
					<p className="text-gray-600">Accede a tu información académica</p>
				</header>

				<div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 p-8">
					<form onSubmit={handleSubmit} className="space-y-6" noValidate>
						<fieldset disabled={isLoading} className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Correo Institucional
								</label>
								<div className="relative">
									<input
										type="email"
										id="email"
										name="email"
										value={credentials.email}
										onChange={(e) => updateCredentials("email", e.target.value)}
										required
										autoComplete="email"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white/50 backdrop-blur-sm disabled:opacity-50"
										placeholder="tu.nombre@uabc.edu.mx"
										aria-describedby="email-error"
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<IconAt />
									</div>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Contraseña
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										name="password"
										value={credentials.password}
										onChange={(e) =>
											updateCredentials("password", e.target.value)
										}
										required
										autoComplete="current-password"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white/50 backdrop-blur-sm pr-12 disabled:opacity-50"
										placeholder="••••••••"
										aria-describedby="password-error"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors"
										aria-label={
											showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
										}
									>
										{showPassword ? <IconEye /> : <IconEyeClose />}
									</button>
								</div>
							</div>

							{error && (
								<div
									role="alert"
									className="p-3 bg-red-50 border border-red-200 rounded-lg"
								>
									<p className="text-sm text-red-600">{error}</p>
								</div>
							)}

							<button
								type="submit"
								disabled={
									isLoading || !credentials.email || !credentials.password
								}
								className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
							>
								{isLoading ? (
									<div className="flex items-center space-x-2">
										<IconLoading />
										<span>Iniciando sesión...</span>
									</div>
								) : (
									"Iniciar Sesión"
								)}
							</button>
						</fieldset>
					</form>
				</div>

				<nav className="mt-8 text-center">
					<a
						href="/estudiantes"
						className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
					>
						← Volver al portal
					</a>
				</nav>
			</section>
		</main>
	);
}
