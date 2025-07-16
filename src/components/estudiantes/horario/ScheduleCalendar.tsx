import { useMemo, useState } from "react";
import { ScheduleCalendarCard } from "./ScheduleCalendarSmallCard";
import { ScheduleCalendarHourCell } from "./ScheduleCalendarHourCard";

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

export const ScheduleCalendar = ({
	schedule,
	days,
	hours,
}: ScheduleCalendarProps) => {
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
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
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
											const cellHeight = duration * 64;

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
													<ScheduleCalendarHourCell
														code={classStart.code}
														subject={classStart.subject}
														classroom={classStart.classroom}
														teacher={classStart.teacher}
														startTime={classStart.startTime}
														endTime={classStart.endTime}
														color={classStart.color}
														duration={duration}
														is24HourFormat={is24HourFormat}
														formatTimeDisplay={formatTimeDisplay}
													/>
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
												<ScheduleCalendarCard
													key={classItem.id}
													id={classItem.id}
													subject={classItem.subject}
													code={classItem.code}
													teacher={classItem.teacher}
													classroom={classItem.classroom}
													type={classItem.type}
													color={classItem.color}
													startTime={classItem.startTime}
													endTime={classItem.endTime}
													duration={duration}
													formatTimeDisplay={(time) => formatTimeDisplay(time, is24HourFormat)}
													getClassTypeBadge={getClassTypeBadge}
												/>
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
};
