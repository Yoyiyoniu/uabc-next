import { forwardRef, useMemo, useState } from "react";

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
	if (type === "Laboratorio") return "bg-blue-100 text-blue-800";
	if (type === "Taller") return "bg-indigo-100 text-indigo-800";
	if (type === "Proyecto") return "bg-red-100 text-red-800";
	return "bg-green-100 text-green-800";
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
			className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 overflow-hidden w-full"
		>
			<div className="relative">
				<div className="flex justify-end px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-2 sm:pb-3 lg:pb-4">
					<div className="flex items-center gap-2 sm:gap-3 select-none">
						{hourButtons.map((btn) => (
							<button
								key={btn.label}
								type="button"
								onClick={() => setIs24HourFormat(btn.value)}
								className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none ${
									is24HourFormat === btn.value
										? "bg-primary text-white shadow-md"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
								aria-pressed={is24HourFormat === btn.value}
							>
								{btn.label}
							</button>
						))}
					</div>
				</div>
				<div className="overflow-x-auto hidden lg:block px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
					<table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
						<thead className="bg-gradient-to-r from-gray-50 to-gray-100">
							<tr>
								<th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">
									Hora
								</th>
								{days.map((day) => (
									<th
										key={day}
										className="px-8 py-5 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
									>
										{day}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white">
							{hours.map((hour) => (
								<tr key={hour} className="border-b border-gray-200 h-20">
									<td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-900 border-r border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 w-32 h-20">
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
											const cellHeight = duration * 80; // 80px por fila (h-20)

											return (
												<td
													key={`${day}-${hour}`}
													className="px-4 py-3 align-top border-r border-gray-200 relative"
													rowSpan={duration > 0 ? duration : 1}
													style={{ height: `${cellHeight}px` }}
												>
													<div
														className={`${classStart.color} text-white p-4 rounded-xl text-sm h-full flex flex-col justify-center relative z-10 bg-opacity-90 border border-white/20 overflow-hidden shadow-lg`}
														style={{ height: `${cellHeight - 24}px` }}
													>
														<p
															title={`Código: ${classStart.code}`}
															className="font-bold text-base line-clamp-1"
														>
															{classStart.code}
														</p>
														<p
															title={`Materia: ${classStart.subject}`}
															className="font-semibold line-clamp-1 mt-1"
														>
															{classStart.subject}
														</p>
														<p
															title={`Aula: ${classStart.classroom}`}
															className="text-sm opacity-90 mt-2 line-clamp-1"
														>
															{classStart.classroom}
														</p>
														<p
															title={`Profesor: ${classStart.teacher}`}
															className="text-sm opacity-75 line-clamp-1"
														>
															{classStart.teacher}
														</p>
														<p
															title={`Horario: ${formatTimeDisplay(
																classStart.startTime,
																is24HourFormat,
															)} - ${formatTimeDisplay(
																classStart.endTime,
																is24HourFormat,
															)}`}
															className="text-sm opacity-90 mt-2 font-medium line-clamp-1"
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
														</p>
														{duration > 2 && (
															<p
																title={`Desglose por hora: ${duration} horas`}
																className="text-sm opacity-75 mt-1 font-semibold line-clamp-1"
															>
																{duration} horas
															</p>
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
												className="px-4 py-3 border-r border-gray-200 h-20"
											>
												<div className="h-16 bg-gray-50/50 rounded-lg border border-gray-200/40" />
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="lg:hidden px-2 sm:px-4 lg:px-6 pb-2 sm:pb-4 lg:pb-6">
					{days.map((day) => {
						const classesOfDay = scheduleByDay[day];
						return (
							<div
								key={day}
								className="border-b border-gray-200 last:border-b-0"
							>
								<div className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
									<h4 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 line-clamp-1">
										{day}
									</h4>
								</div>
								<div className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 space-y-3 sm:space-y-4 lg:space-y-6 bg-white rounded-b-lg">
									{classesOfDay.length > 0 ? (
										classesOfDay.map((classItem) => {
											const startIdx = hours.indexOf(classItem.startTime);
											const endIdx = hours.indexOf(classItem.endTime);
											const duration = endIdx - startIdx;
											return (
												<div
													key={classItem.id}
													className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border border-gray-200/50 bg-white/70 shadow-sm hover:shadow-md transition-shadow"
												>
													<div
														className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${classItem.color} rounded-full flex-shrink-0 mt-0.5 sm:mt-1 shadow-sm`}
													/>
													<div className="flex-1 min-w-0">
														<div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-3">
															<h3
																title={`Materia: ${classItem.subject}`}
																className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1"
															>
																{classItem.subject}
															</h3>
															<span
																title={`Tipo: ${classItem.type}`}
																className={`inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold rounded-full flex-shrink-0 line-clamp-1 w-fit ${getClassTypeBadge(classItem.type)}`}
															>
																{classItem.type}
															</span>
														</div>
														<p
															title={`Código: ${classItem.code}`}
															className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3 font-bold line-clamp-1"
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
															className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 font-semibold line-clamp-1"
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
														<div className="space-y-1 sm:space-y-2">
															<p
																title={`Aula: ${classItem.classroom}`}
																className="text-xs sm:text-sm text-gray-500 line-clamp-1"
															>
																<span className="font-medium">
																	{classItem.classroom}
																</span>
															</p>
															<p
																title={`Profesor: ${classItem.teacher}`}
																className="text-xs sm:text-sm text-gray-500 line-clamp-1"
															>
																<span className="font-medium">
																	{classItem.teacher}
																</span>
															</p>
														</div>
														{duration > 2 && (
															<div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
																<p
																	title={`Desglose por hora: ${duration} horas`}
																	className="font-semibold mb-1 sm:mb-2 line-clamp-1"
																>
																	Desglose por hora:
																</p>
																<div className="flex flex-wrap gap-1 sm:gap-2">
																	{Array.from({ length: duration }, (_, i) => (
																		<span
																			title={`Hora: ${formatTimeDisplay(
																				hours[startIdx + i],
																				is24HourFormat,
																			)} - ${formatTimeDisplay(
																				hours[startIdx + i + 1] ||
																					classItem.endTime,
																				is24HourFormat,
																			)}`}
																			key={`${i}-${classItem.id}`}
																			className="bg-gray-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap"
																		>
																			{formatTimeDisplay(
																				hours[startIdx + i],
																				is24HourFormat,
																			)}{" "}
																			-{" "}
																			{formatTimeDisplay(
																				hours[startIdx + i + 1] ||
																					classItem.endTime,
																				is24HourFormat,
																			)}
																		</span>
																	))}
																</div>
															</div>
														)}
													</div>
												</div>
											);
										})
									) : (
										<div className="p-4 sm:p-6 lg:p-8 text-center flex items-center justify-center bg-gray-50/50 rounded-lg">
											<p
												title="No hay clases programadas"
												className="text-sm sm:text-base text-gray-500 italic line-clamp-1"
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
