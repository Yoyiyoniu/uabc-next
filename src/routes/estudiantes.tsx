import { createFileRoute } from "@tanstack/react-router";

import { NewSection } from "@/components/estudiantes/NewSection";
import { ServicesGrid } from "@/components/estudiantes/ServicesGrid";
import { Hero } from "@/components/estudiantes/StudentsHero";
import { EstudiantesLayout } from "@/components/layout/EstudiantesLayout";

export const Route = createFileRoute("/estudiantes")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<EstudiantesLayout>
			<Hero />
			<NewSection />
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Servicios Académicos
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Accede rápidamente a toda tu información académica desde un solo lugar
				</p>
			</div>
			<ServicesGrid />
		</EstudiantesLayout>
	);
}
