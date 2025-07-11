import UabcLogo from "@/assets/icons/main/UabcLogo";
import { UabcNextBadge } from "../UabcNextBadge/UabcNextBadge";

export const Footer = () => {
	return (
		<footer className="bg-white border-t border-emerald-200 w-full mt-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center space-x-3 mb-4">
							<div className="w-10 h-10 relative">
								<UabcLogo />
							</div>
							<div>
								<h3 className="text-xl font-bold text-gray-900">UABC Next</h3>
								<p className="text-sm text-gray-500">
									Universidad Autónoma de Baja California
								</p>
							</div>
						</div>
						<p className="text-gray-600 mb-4">
							Portal estudiantil moderno para acceder a tu información académica
							de forma rápida y eficiente.
						</p>
						<UabcNextBadge />
					</div>

					<div>
						<h4 className="font-semibold text-gray-900 mb-4">Servicios</h4>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>
								<a
									href="#"
									className="hover:text-emerald-600 transition-colors"
								>
									Horarios
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-emerald-600 transition-colors"
								>
									Calificaciones
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-emerald-600 transition-colors"
								>
									Historial Académico
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-emerald-600 transition-colors"
								>
									Constancias
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-emerald-200 pt-8 mt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm text-gray-500">
							© 2024 Universidad Autónoma de Baja California. Todos los derechos
							reservados.
						</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<a
								href="#"
								className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
							>
								Privacidad
							</a>
							<a
								href="#"
								className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
							>
								Términos
							</a>
							<a
								href="#"
								className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
							>
								Ayuda
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
