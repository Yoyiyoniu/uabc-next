import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import { ScheduleCalendar } from "@/components/estudiantes/horario/ScheduleCalendar";
import {
	dias,
	horario,
	horas,
} from "@/components/estudiantes/horario/TestData";
import { EstudiantesLayout } from "@/components/layout/EstudiantesLayout";

export const Route = createFileRoute("/estudiantes_/horario")({
	component: estudiantesPanel,
});

function estudiantesPanel() {
	const calendarRef = useRef<HTMLDivElement>(null);

	return (
		<EstudiantesLayout className="min-h-screen">
			<div className="w-full max-w-none px-4 lg:px-8 py-6">
				<div className="mb-6">
					<h2 className="text-3xl font-bold text-primary mb-2">
						Horario de Clases
					</h2>
					<p className="text-gray-600">
						Consulta tu horario semanal y próximas clases
					</p>
				</div>
				<div className="w-full">
					<ScheduleCalendar
						days={dias}
						hours={horas}
						schedule={horario.map((clase) => ({
							id: clase.id,
							subject: clase.materia,
							code: clase.codigo,
							teacher: clase.profesor,
							classroom: clase.aula,
							day: clase.dia,
							startTime: clase.horaInicio,
							endTime: clase.horaFin,
							type: clase.tipo,
							color: clase.color,
						}))}
						ref={calendarRef}
					/>
				</div>
			</div>
		</EstudiantesLayout>
	);
}
