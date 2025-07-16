import { useState } from "react";
import { ScheduleModal } from "./ScheduleModal";
import { IconExpand } from "@/assets/icons/IconExpand";

interface ScheduleCalendarCardProps {
  id: number;
  subject: string;
  code: string;
  teacher: string;
  classroom: string;
  type: string;
  color: string;
  startTime: string;
  endTime: string;
  duration: number;
  formatTimeDisplay: (time: string) => string;
  getClassTypeBadge: (type: string) => string;
}

export const ScheduleCalendarCard = ({
  subject,
  code,
  teacher,
  classroom,
  type,
  color,
  startTime,
  endTime,
  duration,
  formatTimeDisplay,
  getClassTypeBadge,
}: ScheduleCalendarCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 mobile-card-hover group relative"
        style={{ minHeight: 56 }}
      >
        <button
          type="button"
          aria-label="Expandir información de la materia"
          className="absolute top-2 right-2 z-20 rounded-full p-2 items-center justify-center"
          onClick={() => setOpen(true)}
          tabIndex={0}
        >
          <IconExpand className="text-primary" />
        </button>
        <div className={`w-6 h-6 ${color} rounded-lg flex-shrink-0 mt-0.5 color-indicator`} />
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <h3
              title={`Materia: ${subject}`}
              className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1"
            >
              {subject}
            </h3>
            <span
              title={`Tipo: ${type}`}
              className={`inline-flex px-2 py-1 text-xs font-medium rounded line-clamp-1 ${getClassTypeBadge(type)}`}
            >
              {type}
            </span>
          </div>
          <p
            title={`Código: ${code}`}
            className="text-sm text-gray-700 mb-2 font-medium line-clamp-1"
          >
            {code}
          </p>
          <p
            title={`Horario: ${formatTimeDisplay(startTime)} - ${formatTimeDisplay(endTime)}`}
            className="text-sm text-gray-600 mb-2 line-clamp-1"
          >
            {formatTimeDisplay(startTime)} - {formatTimeDisplay(endTime)} ({duration}h)
          </p>
          <div className="space-y-1 text-xs text-gray-500">
            <p title={`Aula: ${classroom}`} className="line-clamp-1">
              {classroom}
            </p>
            <p title={`Profesor: ${teacher}`} className="line-clamp-1">
              {teacher}
            </p>
          </div>
        </div>
      </div>
      <ScheduleModal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center bg-white rounded-lg p-4">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`} />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{subject}</h3>
          <span className={`mb-2 px-2 py-1 text-xs font-medium rounded ${getClassTypeBadge(type)}`}>{type}</span>
          <p className="text-sm text-gray-700 font-medium mb-2">Código: {code}</p>
          <p className="text-sm text-gray-600 mb-2">
            Horario: {formatTimeDisplay(startTime)} - {formatTimeDisplay(endTime)} ({duration}h)
          </p>
          <div className="space-y-1 text-xs text-gray-500 mb-2">
            <p>Aula: {classroom}</p>
            <p>Profesor: {teacher}</p>
          </div>
        </div>
      </ScheduleModal>
    </>
  );
};
