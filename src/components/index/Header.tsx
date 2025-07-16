import UabcLogo from "@/assets/icons/main/UabcLogo";
import { Link } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
	activeNav: string;
	setActiveNav: Dispatch<SetStateAction<string>>;
}

export default function Header({ activeNav, setActiveNav }: HeaderProps) {
	return (
		<header className="relative z-20 border-b border-green-500/50 bg-black/95 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 relative">
							<UabcLogo />
						</div>
						<div>
							<h1 className="text-xl font-bold text-green-400">UABC NEXT</h1>
							<p className="text-xs text-green-600">Open Source Community</p>
						</div>
					</div>
					<nav className="hidden md:flex items-center relative bg-black/30 rounded-lg p-1">
						{/* Indicador de fondo */}
						<div
							className={`absolute h-8 bg-green-500/30 rounded-md transition-all duration-300 ease-out ${
								activeNav === "about"
									? "w-16 left-1 opacity-100"
									: activeNav === "features"
										? "w-20 left-[68px] opacity-100"
										: activeNav === "community"
											? "w-24 left-[156px] opacity-100"
											: activeNav === "portal"
												? "w-16 left-[252px] opacity-100"
												: "w-0 opacity-0"
							}`}
						/>
						<Link
							to="/"
							className="relative z-10 text-green-400 hover:text-green-300 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
							onMouseEnter={() => setActiveNav("about")}
							onMouseLeave={() => setActiveNav("")}
						>
							about
						</Link>
						<Link
							to="/"
							className="relative z-10 text-green-400 hover:text-green-300 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
							onMouseEnter={() => setActiveNav("features")}
							onMouseLeave={() => setActiveNav("")}
						>
							features
						</Link>
						<Link
							to="/"
							className="relative z-10 text-green-400 hover:text-green-300 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
							onMouseEnter={() => setActiveNav("community")}
							onMouseLeave={() => setActiveNav("")}
						>
							community
						</Link>
						<Link
							to="/estudiantes"
							className="relative z-10 bg-green-600 hover:bg-green-500 text-black px-3 py-2 rounded-md font-medium transition-all duration-200 text-sm ml-1"
							onMouseEnter={() => setActiveNav("portal")}
							onMouseLeave={() => setActiveNav("")}
						>
							portal
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}
