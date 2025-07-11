import type { HTMLAttributes, ReactNode } from "react";

import { Footer } from "./Footer";
import { Nav } from "./Nav";

interface EstudiantesLayoutProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export const EstudiantesLayout = ({
	children,
	className,
	...props
}: EstudiantesLayoutProps) => {
	return (
		<>
			<Nav />
			<main className={`min-h-screen ${className || ""}`} {...props}>
				{children}
			</main>
			<Footer />
		</>
	);
};
