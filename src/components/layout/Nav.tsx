import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import UabcLogo from "@/assets/icons/main/UabcLogo";

import IconBook from "@/assets/icons/IconBook";
import IconCalendarWeek from "@/assets/icons/IconCalendarWeek";
import IconFileInfo from "@/assets/icons/IconFileInfo";
import IconMenu2 from "@/assets/icons/IconMenu2";
import IconUser from "@/assets/icons/IconUser";
import IconX from "@/assets/icons/IconX";

export const Nav = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Prevenir scroll cuando el menú esté abierto
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [mobileMenuOpen]);

	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const menuVariants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
		exit: {
			opacity: 0,
			scale: 0.95,
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			scale: 0.9,
		},
		visible: {
			opacity: 1,
			x: 0,
			scale: 1,
		},
	};

	const iconVariants = {
		open: { rotate: 180, scale: 1.1 },
		closed: { rotate: 0, scale: 1 },
	};

	return (
		<>
			<header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 relative z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
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

						<div className="flex items-center space-x-1">
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
								className="md:hidden p-2 text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out ml-2 relative z-50"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							>
								<motion.div
									variants={iconVariants}
									animate={mobileMenuOpen ? "open" : "closed"}
									transition={{ duration: 0.3, ease: "easeInOut" }}
								>
									{mobileMenuOpen ? (
										<IconX className="text-primary" />
									) : (
										<IconMenu2 className="text-primary" />
									)}
								</motion.div>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Navigation Overlay */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<>
						{/* Backdrop difuminado */}
						<motion.div
							className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
							variants={backdropVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={{ duration: 0.3 }}
							onClick={() => setMobileMenuOpen(false)}
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									setMobileMenuOpen(false);
								}
							}}
							role="button"
							tabIndex={0}
							aria-label="Cerrar menú"
						/>

						<motion.div
							className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 z-40 md:hidden"
							variants={menuVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={{
								duration: 0.3,
								staggerChildren: 0.08,
								delayChildren: 0.15,
							}}
						>
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="py-4">
									<motion.div
										className="flex flex-col space-y-2"
										variants={menuVariants}
										initial="hidden"
										animate="visible"
									>
										<motion.button
											type="button"
											className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-in-out"
											variants={itemVariants}
											whileHover={{ x: 4, scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => setMobileMenuOpen(false)}
										>
											<IconUser className="text-primary mr-2" />
											Perfil
										</motion.button>
										<motion.button
											type="button"
											className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-in-out"
											variants={itemVariants}
											whileHover={{ x: 4, scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => setMobileMenuOpen(false)}
										>
											<IconCalendarWeek className="text-primary mr-2" />
											Horarios
										</motion.button>
										<motion.button
											type="button"
											className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-in-out"
											variants={itemVariants}
											whileHover={{ x: 4, scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => setMobileMenuOpen(false)}
										>
											<IconFileInfo className="text-primary mr-2" />
											Calificaciones
										</motion.button>
										<motion.button
											type="button"
											className="flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-in-out"
											variants={itemVariants}
											whileHover={{ x: 4, scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => setMobileMenuOpen(false)}
										>
											<IconBook className="text-primary mr-2" />
											Historial
										</motion.button>
									</motion.div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
