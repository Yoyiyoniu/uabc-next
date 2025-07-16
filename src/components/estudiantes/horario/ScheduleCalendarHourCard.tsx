import { useState, type ReactNode } from "react";
import { ScheduleModal } from "./ScheduleModal";
import { IconExpand } from "@/assets/icons/IconExpand";

interface ScheduleCalendarHourCellProps {
  code: string;
  subject: string;
  classroom: string;
  teacher: string;
  startTime: string;
  endTime: string;
  color: string;
  duration: number;
  is24HourFormat: boolean;
  formatTimeDisplay: (time: string, is24h: boolean) => string;
  children?: ReactNode;
}

export const ScheduleCalendarHourCell =({
  code,
  subject,
  classroom,
  teacher,
  startTime,
  endTime,
  color,
  duration,
  is24HourFormat,
  formatTimeDisplay,
  children,
}: ScheduleCalendarHourCellProps) => {
  const cellHeight = duration * 64; // 64px por fila (h-16)
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${color} text-white p-3 rounded-lg text-sm h-full flex flex-col justify-center shadow-sm calendar-card-hover calendar-cell-content group`}
      style={{ height: `${cellHeight - 8}px` }}
    >
      <button
          type="button"
          aria-label="Expandir información de la materia"
          className="absolute top-0 right-0 z-20 rounded-full p-3 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => setOpen(true)}
          tabIndex={0}
        >
          <IconExpand className="text-white" />
        </button>
      <div title={`Código: ${code}`} className="font-bold text-sm mb-1 line-clamp-1">
        {code}
      </div>
      <div title={`Materia: ${subject}`} className="font-medium text-xs mb-1 line-clamp-1">
        {subject}
      </div>
      <div title={`Aula: ${classroom}`} className="text-xs opacity-90 mb-1 line-clamp-1">
        {classroom}
      </div>
      <div title={`Profesor: ${teacher}`} className="text-xs opacity-75 mb-1 line-clamp-1">
        {teacher}
      </div>
      <div
        title={`Horario: ${formatTimeDisplay(startTime, is24HourFormat)} - ${formatTimeDisplay(endTime, is24HourFormat)}`}
        className="text-xs font-medium line-clamp-1"
      >
        {formatTimeDisplay(startTime, is24HourFormat)} - {formatTimeDisplay(endTime, is24HourFormat)}
      </div>
      {duration > 2 && (
        <div title={`Desglose por hora: ${duration} horas`} className="text-xs opacity-75 mt-1 line-clamp-1">
          ({duration} horas)
        </div>
      )}
      {children}
      <ScheduleModal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center bg-white rounded-lg p-4">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`} />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{subject}</h3>
          <p className="text-sm text-gray-700 font-medium mb-2">Código: {code}</p>
          <p className="text-sm text-gray-600 mb-2">
            Horario: {formatTimeDisplay(startTime, is24HourFormat)} - {formatTimeDisplay(endTime, is24HourFormat)} ({duration}h)
          </p>
          <div className="space-y-1 text-xs text-gray-500 mb-2">
            <p>Aula: {classroom}</p>
            <p>Profesor: {teacher}</p>
          </div>
        </div>
      </ScheduleModal>
    </div>
  );
}; 