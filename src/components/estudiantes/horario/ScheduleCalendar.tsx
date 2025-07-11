import { forwardRef, useMemo, useState } from "react";

import "./ScheduleCalendar.css";

interface ClassItem {
	id: number;
	subject: string;
	code: string;
	teacher: string;
	classroom: string;
	day: string;
	startTime: string;
	endTime: string;
	type: string;
	color: string;
}

interface ScheduleCalendarProps {
	schedule: ClassItem[];
	days: string[];
	hours: string[];
}

const formatTimeDisplay = (time: string, is24h: boolean) => {
	if (!time) return "";
	const [hourStr, minuteStr] = time.split(":");
	let hour = Number(hourStr);
	const minute = minuteStr || "00";
	if (is24h) {
		return `${hour.toString().padStart(2, "0")}:${minute}`;
	}
	const ampm = hour >= 12 ? "PM" : "AM";
	hour = hour % 12;
	if (hour === 0) hour = 12;
	return `${hour}:${minute} ${ampm}`;
};

const getClassTypeBadge = (type: string) => {
	if (type === "Laboratorio") return "badge-laboratorio";
	if (type === "Taller") return "badge-taller";
	if (type === "Proyecto") return "badge-proyecto";
	return "badge-default";
};

export const ScheduleCalendar = forwardRef<
	HTMLDivElement,
	ScheduleCalendarProps
>(({ schedule, days, hours }, ref) => {
	const [is24HourFormat, setIs24HourFormat] = useState(true);

	const scheduleByDay = useMemo(() => {
		const map: Record<string, ClassItem[]> = {};
		for (const day of days) {
			map[day] = schedule.filter((c) => c.day === day);
		}
		return map;
	}, [schedule, days]);

	const getClassAtHour = (day: string, hour: string) =>
		schedule.find(
			(c) =>
				c.day === day &&
				hours.indexOf(hour) >= hours.indexOf(c.startTime) &&
				hours.indexOf(hour) < hours.indexOf(c.endTime),
		);

	const hourButtons = [
		{ label: "12h", value: false },
		{ label: "24h", value: true },
	];

	return (
		<div
			ref={ref}
			className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full"
		>
			<div className="relative">
				<div className="bg-white border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-semibold text-primary">
							Horario Semanal
						</h2>
						<div className="flex items-center gap-1">
							{hourButtons.map((btn) => (
								<button
									key={btn.label}
									type="button"
									onClick={() => setIs24HourFormat(btn.value)}
									className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
										is24HourFormat === btn.value
											? "bg-primary text-white"
											: "bg-gray-100 text-gray-600 hover:bg-gray-200"
									}`}
									aria-pressed={is24HourFormat === btn.value}
								>
									{btn.label}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="overflow-x-auto hidden lg:block">
					<table className="w-full table-fixed">
						<thead>
							<tr className="bg-gray-50">
								<th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200 w-24">
									Hora
								</th>
								{days.map((day) => (
									<th
										key={day}
										className="px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
										style={{ width: `calc((100% - 6rem) / ${days.length})` }}
									>
										{day}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{hours.map((hour) => (
								<tr key={hour} className="border-b border-gray-100">
									<td className="px-4 py-2 text-sm font-medium text-gray-700 border-r border-gray-200 bg-gray-50 h-16 w-24">
										{formatTimeDisplay(hour, is24HourFormat)}
									</td>
									{days.map((day) => {
										const classStart = schedule.find(
											(c) => c.day === day && c.startTime === hour,
										);
										if (classStart) {
											const startIdx = hours.indexOf(classStart.startTime);
											const endIdx = hours.indexOf(classStart.endTime);
											const duration = endIdx - startIdx;
											const cellHeight = duration * 64; // 64px por fila (h-16)

											return (
												<td
													key={`${day}-${hour}`}
													className="p-1 align-top border-r border-gray-200 relative"
													rowSpan={duration > 0 ? duration : 1}
													style={{
														height: `${cellHeight}px`,
														width: `calc((100% - 6rem) / ${days.length})`,
													}}
												>
													<div
														className={`${classStart.color} text-white p-3 rounded-lg text-sm h-full flex flex-col justify-center shadow-sm calendar-card-hover calendar-cell-content`}
														style={{ height: `${cellHeight - 8}px` }}
													>
														<div
															title={`Código: ${classStart.code}`}
															className="font-bold text-sm mb-1 line-clamp-1"
														>
															{classStart.code}
														</div>
														<div
															title={`Materia: ${classStart.subject}`}
															className="font-medium text-xs mb-1 line-clamp-1"
														>
															{classStart.subject}
														</div>
														<div
															title={`Aula: ${classStart.classroom}`}
															className="text-xs opacity-90 mb-1 line-clamp-1"
														>
															{classStart.classroom}
														</div>
														<div
															title={`Profesor: ${classStart.teacher}`}
															className="text-xs opacity-75 mb-1 line-clamp-1"
														>
															{classStart.teacher}
														</div>
														<div
															title={`Horario: ${formatTimeDisplay(
																classStart.startTime,
																is24HourFormat,
															)} - ${formatTimeDisplay(
																classStart.endTime,
																is24HourFormat,
															)}`}
															className="text-xs font-medium line-clamp-1"
														>
															{formatTimeDisplay(
																classStart.startTime,
																is24HourFormat,
															)}{" "}
															-{" "}
															{formatTimeDisplay(
																classStart.endTime,
																is24HourFormat,
															)}
														</div>
														{duration > 2 && (
															<div
																title={`Desglose por hora: ${duration} horas`}
																className="text-xs opacity-75 mt-1 line-clamp-1"
															>
																({duration} horas)
															</div>
														)}
													</div>
												</td>
											);
										}
										const classInProgress = getClassAtHour(day, hour);
										if (classInProgress && classInProgress.startTime !== hour) {
											return null;
										}
										return (
											<td
												key={`${day}-${hour}`}
												className="p-1 border-r border-gray-200 h-16"
												style={{
													width: `calc((100% - 6rem) / ${days.length})`,
												}}
											>
												<div className="empty-cell calendar-cell-simple" />
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="lg:hidden p-4 space-y-4">
					{days.map((day) => {
						const classesOfDay = scheduleByDay[day];
						return (
							<div
								key={day}
								className="border border-gray-200 rounded-lg overflow-hidden bg-[#fafafa] relative"
							>
								{/* Background Pattern */}
								<div className="absolute inset-0 z-0 pointer-events-none opacity-20 mobile-day-background" />
								<div className="px-4 py-3 bg-gray-50 border-b border-gray-200 relative z-10">
									<h4
										title={day}
										className="font-medium text-gray-900 line-clamp-1"
									>
										{day}
									</h4>
								</div>
								<div className="p-4 space-y-3 relative z-10">
									{classesOfDay.length > 0 ? (
										classesOfDay.map((classItem) => {
											const startIdx = hours.indexOf(classItem.startTime);
											const endIdx = hours.indexOf(classItem.endTime);
											const duration = endIdx - startIdx;
											return (
												<div
													key={classItem.id}
													className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 mobile-card-hover"
												>
													<div
														className={`w-6 h-6 ${classItem.color} rounded-lg flex-shrink-0 mt-0.5 color-indicator`}
													/>
													<div className="flex-1 min-w-0">
														<div className="mb-2">
															<h3
																title={`Materia: ${classItem.subject}`}
																className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1"
															>
																{classItem.subject}
															</h3>
															<span
																title={`Tipo: ${classItem.type}`}
																className={`inline-flex px-2 py-1 text-xs font-medium rounded line-clamp-1 ${getClassTypeBadge(classItem.type)}`}
															>
																{classItem.type}
															</span>
														</div>
														<p
															title={`Código: ${classItem.code}`}
															className="text-sm text-gray-700 mb-2 font-medium line-clamp-1"
														>
															{classItem.code}
														</p>
														<p
															title={`Horario: ${formatTimeDisplay(
																classItem.startTime,
																is24HourFormat,
															)} - ${formatTimeDisplay(
																classItem.endTime,
																is24HourFormat,
															)}`}
															className="text-sm text-gray-600 mb-2 line-clamp-1"
														>
															{formatTimeDisplay(
																classItem.startTime,
																is24HourFormat,
															)}{" "}
															-{" "}
															{formatTimeDisplay(
																classItem.endTime,
																is24HourFormat,
															)}{" "}
															({duration}h)
														</p>
														<div className="space-y-1 text-xs text-gray-500">
															<p
																title={`Aula: ${classItem.classroom}`}
																className="line-clamp-1"
															>
																{classItem.classroom}
															</p>
															<p
																title={`Profesor: ${classItem.teacher}`}
																className="line-clamp-1"
															>
																{classItem.teacher}
															</p>
														</div>
													</div>
												</div>
											);
										})
									) : (
										<div className="p-4 text-center bg-gray-50 rounded">
											<p
												title="No hay clases programadas"
												className="text-sm text-gray-500 line-clamp-1"
											>
												No hay clases programadas
											</p>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
});
