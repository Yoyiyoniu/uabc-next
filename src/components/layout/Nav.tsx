import { useState } from "react";

import UabcLogo from "@/assets/icons/main/UabcLogo";

import IconBook from "@/assets/icons/IconBook";
import IconCalendarWeek from "@/assets/icons/IconCalendarWeek";
import IconFileInfo from "@/assets/icons/IconFileInfo";
import IconMenu2 from "@/assets/icons/IconMenu2";
import IconUser from "@/assets/icons/IconUser";
import IconX from "@/assets/icons/IconX";

export const Nav = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo and Title */}
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 relative">
							<UabcLogo />
						</div>
						<div>
							<h1 className="text-xl font-bold text-primary">UABC Next</h1>
							<p className="text-sm text-gray-600">
								Sistema de Gestión Estudiantil
							</p>
						</div>
					</div>

					{/* Navigation and User Actions - grouped together on the right */}
					<div className="flex items-center space-x-1">
						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center space-x-1">
							<button
								type="button"
								className="flex items-center space-x-2 justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconCalendarWeek className="text-primary" />
								<span>Horarios</span>
							</button>
							<button
								type="button"
								className="flex items-center space-x-2 justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconFileInfo className="text-primary" />
								<span>Calificaciones</span>
							</button>
							<button
								type="button"
								className="flex items-center space-x-2 justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconBook className="text-primary" />
								<span>Historial</span>
							</button>
							<a
								href="/estudiantes/login"
								type="button"
								className="flex items-center space-x-2 justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconUser className="text-primary" />
								<span>Mi perfil</span>
							</a>
						</nav>

						{/* Mobile menu button */}
						<button
							type="button"
							className="md:hidden p-2 text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors ml-2"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? (
								<IconX className="text-primary" />
							) : (
								<IconMenu2 className="text-primary" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
						<div className="flex flex-col space-y-2">
							<button
								type="button"
								className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconUser className="text-primary mr-2" />
								Perfil
							</button>
							<button
								type="button"
								className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconCalendarWeek className="text-primary mr-2" />
								Horarios
							</button>
							<button
								type="button"
								className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconFileInfo className="text-primary mr-2" />
								Calificaciones
							</button>
							<button
								type="button"
								className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
							>
								<IconBook className="text-primary mr-2" />
								Historial
							</button>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};
