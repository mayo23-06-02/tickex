"use client";

import { useState } from "react";
import { format, subDays, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DateRangePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (start: Date | null, end: Date | null) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

        if (!startDate || (startDate && endDate)) {
            onChange(clickedDate, null);
        } else {
            if (clickedDate < startDate) {
                onChange(clickedDate, startDate);
            } else {
                onChange(startDate, clickedDate);
            }
            setIsOpen(false);
        }
    };

    const isSelected = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (startDate && endDate) {
            return isWithinInterval(date, { start: startDate, end: endDate });
        }
        return startDate?.toDateString() === date.toDateString();
    };

    const isRangeStart = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return startDate?.toDateString() === date.toDateString();
    };

    const isRangeEnd = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return endDate?.toDateString() === date.toDateString();
    };

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] hover:bg-slate-50 transition-colors min-w-[200px]"
            >
                <CalendarIcon className="w-4 h-4 text-[#64748b]" />
                <span>
                    {startDate ? (
                        endDate ?
                            `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}` :
                            format(startDate, "MMM d, yyyy")
                    ) : "Select dates"}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-[#e2e8f0] p-4 z-50 w-[300px]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded-full">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-sm">
                                {format(currentMonth, "MMMM yyyy")}
                            </span>
                            <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded-full">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                <div key={d} className="text-xs text-[#64748b] font-medium">{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const selected = isSelected(day);
                                const start = isRangeStart(day);
                                const end = isRangeEnd(day);

                                return (
                                    <button
                                        key={day}
                                        onClick={() => handleDateClick(day)}
                                        className={`
                                            h-8 w-8 text-sm rounded-full flex items-center justify-center transition-colors relative
                                            ${selected ? 'bg-green-50 text-[#1DB954]' : 'hover:bg-slate-50 text-[#0f172a]'}
                                            ${(start || end) ? '!bg-[#1DB954] !text-white font-bold' : ''}
                                        `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0] flex justify-between">
                            <button
                                onClick={() => onChange(subDays(new Date(), 7), new Date())}
                                className="text-xs text-[#1DB954] font-medium hover:underline"
                            >
                                Last 7 days
                            </button>
                            <button
                                onClick={() => onChange(subDays(new Date(), 30), new Date())}
                                className="text-xs text-[#1DB954] font-medium hover:underline"
                            >
                                Last 30 days
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
