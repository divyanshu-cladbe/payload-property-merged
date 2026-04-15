"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format, addDays, isSameDay } from "date-fns";
import { CalendarDays as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import Calendar from "react-calendar";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ScheduleCallDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  builderName: string;
  builderPhone: string;
}

type TimeSlot = "morning" | "noon" | "evening";

interface TimeSlotConfig {
  label: string;
  time: string;
}

const timeSlots: Record<TimeSlot, TimeSlotConfig> = {
  morning: { label: "Morning", time: "9 Am - 12 PM" },
  noon: { label: "Noon", time: "12 PM - 4 PM" },
  evening: { label: "Evening", time: "4 PM - 8 PM" },
};

export const ScheduleCallDialog: React.FC<ScheduleCallDialogProps> = ({
  isOpen,
  onOpenChange,
  builderName,
  builderPhone,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const { toast } = useToast();
  const [showCalendar, setShowCalendar] = useState(false);
  const isSmall = useMediaQuery("(max-width: 768px)");
  const useMobileLayout = isSmall;

  // Generate next 30 days for the carousel
  const getNextDays = () => {
    return Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));
  };

  const allDays = getNextDays();
  const visibleDays = allDays.slice(startIndex, startIndex + 6);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setSelectedDate(new Date());
      setSelectedTimeSlot(null);
      setStartIndex(0);
    }
    onOpenChange(open);
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 6 < allDays.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleSchedule = () => {
    if (!selectedTimeSlot) {
      toast({
        title: "Please select a time slot",
        description: "Choose a time slot to schedule your call",
        variant: "destructive",
      });
      return;
    }

    const dayName = format(selectedDate, "EEEE");
    const day = format(selectedDate, "d");
    const month = format(selectedDate, "MMMM");
    const timeRange = timeSlots[selectedTimeSlot].time;

    toast({
      title: "Call Scheduled Successfully!",
      description: `Your call is scheduled on ${dayName} ${day} ${month}, ${timeRange}`,
      duration: 5000,
      variant: "success",
    });

    // Close the dialog after scheduling
    handleDialogClose(false);
  };
  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  const handleCalendarIconClick = () => {
    setShowCalendar(true);
  };

  const formatScheduledDateTime = () => {
    if (!selectedTimeSlot) return "";
    const dayName = format(selectedDate, "EEEE");
    const day = format(selectedDate, "d");
    const month = format(selectedDate, "MMMM");
    const time = timeSlots[selectedTimeSlot].time.split(" - ")[0];

    return `${dayName} ${day} ${month} , ${time}`;
  };


  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        {useMobileLayout ? (
          <DialogContent className="w-[90vw] max-w-md p-3 rounded-2xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {showCalendar ? (
              <div className="flex flex-col w-full animate-in fade-in zoom-in-95 duration-200">
                <DialogHeader className="w-full mb-3 flex flex-row items-center shrink-0 space-y-0">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-500" />
                  </button>
                  <DialogTitle className="text-base font-bold text-[#E91614]">
                    {format(selectedDate, "MMMM yyyy")}
                  </DialogTitle>
                </DialogHeader>

                <div className="w-full custom-calendar-wrapper">
                  <Calendar
                    locale="en-GB"
                    value={selectedDate}
                    onChange={(value) => {
                      if (value instanceof Date) {
                        handleDateSelect(value);
                        setShowCalendar(false);
                      }
                    }}
                    minDate={new Date()}
                    className="w-full border-none"
                    showNavigation={false}
                    formatShortWeekday={(locale, date) => format(date, "EEE")}
                  />
                </div>
              </div>
            ) : (
              <>
                <DialogHeader className="flex flex-row items-center justify-between mb-2 space-y-0 shrink-0">
                  <DialogTitle className="text-base font-bold text-black">
                    Schedule a call!
                  </DialogTitle>
                  <button
                    className=" absolute right-10 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={handleCalendarIconClick}
                  >
                    <CalendarIcon className="h-5 w-5 text-[#E91614]" />
                  </button>
                </DialogHeader>
                <DialogDescription className="sr-only">
                  Select a date and time slot to schedule a call with the builder
                </DialogDescription>

                {selectedTimeSlot && (
                  <p className="text-[10px] text-gray-600 mb-2 text-center shrink-0">
                    Your call will be scheduled on{" "}
                    <span className="text-[#E05D31] font-medium">
                      {formatScheduledDateTime()}
                    </span>
                  </p>
                )}

                <div className="space-y-3 flex-1 flex flex-col">
                  {/* Date Carousel - Mobile */}
                  <div className="relative flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={handlePrevious}
                      disabled={startIndex === 0}
                      className={`flex-shrink-0 p-1 rounded-full transition-all ${startIndex === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex gap-1 overflow-hidden flex-1">
                      {visibleDays.map((day, index) => {
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day)}
                            className={`flex-shrink-0 flex flex-col items-center justify-center w-10 h-11 rounded-lg border transition-all ${isSelected
                              ? "border-[#E91614] bg-white shadow-md"
                              : "border-gray-300 hover:border-gray-400 bg-white"
                              }`}
                          >
                            <span
                              className={`text-[8px] font-semibold mb-0.5 ${isSelected ? "text-black" : "text-gray-700"
                                }`}
                            >
                              {format(day, "EEE")}
                            </span>
                            <span
                              className={`text-sm font-bold ${isSelected ? "text-black" : "text-gray-900"
                                }`}
                            >
                              {format(day, "d")}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={startIndex + 6 >= allDays.length}
                      className={`flex-shrink-0 p-1 rounded-full transition-all ${startIndex + 6 >= allDays.length
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Time Slots - Mobile */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {(Object.entries(timeSlots) as [TimeSlot, TimeSlotConfig][]).map(([slot, config]) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`w-full px-3 py-2 rounded-xl border transition-all ${isSelected
                            ? "border-[#E91614] bg-white shadow-md"
                            : "border-gray-300 hover:border-gray-400 bg-white"
                            }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className={`text-sm font-semibold ${isSelected ? "text-black" : "text-gray-700"
                                }`}
                            >
                              {config.label}
                            </span>
                            <span
                              className={`text-xs ${isSelected ? "text-gray-600" : "text-gray-500"
                                }`}
                            >
                              {config.time}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Schedule Button - Mobile */}
                  <Button
                    onClick={handleSchedule}
                    className="w-full py-3 rounded-xl font-normal text-white text-sm hover:opacity-90 transition-opacity shadow-lg shrink-0"
                  >
                    Schedule
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        ) : (
          <DialogContent
            className={`max-w-4xl p-4 sm:p-8 max-h-[90vh] overflow-y-auto transition-all duration-300 ${showCalendar ? "" : ""
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {showCalendar ? (
              <div className="flex flex-col w-full animate-in fade-in zoom-in-95 duration-200">
                <DialogHeader className="w-full mb-4 flex flex-row items-center  shrink-0">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-500" />
                  </button>
                  <DialogTitle className="text-xl sm:text-3xl font-bold text-[#E91614]">
                    {format(selectedDate, "MMMM yyyy")}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Select a date and time slot to schedule a call with the builder
                  </DialogDescription>
                </DialogHeader>

                <div className="w-full custom-calendar-wrapper">
                  <Calendar
                    locale="en-GB"
                    value={selectedDate}
                    onChange={(value) => {
                      if (value instanceof Date) {
                        handleDateSelect(value);
                        setShowCalendar(false);
                      }
                    }}
                    minDate={new Date()}
                    className="w-full border-none"
                    showNavigation={false}
                    formatShortWeekday={(locale, date) => format(date, "EEE")}
                  />
                </div>
              </div>
            ) : (
              <>
                <DialogHeader className="flex flex-row items-center justify-between mb-4">
                  <DialogTitle className="text-xl sm:text-3xl font-bold text-black">
                    Schedule a call!
                  </DialogTitle>
                  <button className="hover:opacity-70 transition-opacity" onClick={handleCalendarIconClick}>
                    <CalendarIcon className="h-7 w-7 text-[#E91614] font-normal" />
                  </button>
                </DialogHeader>
                <DialogDescription className="sr-only">
                  Select a date and time slot to schedule a call with the builder
                </DialogDescription>

                {selectedTimeSlot && (
                  <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6">
                    Your call will be scheduled on{" "}
                    <span className="text-[#E05D31] font-medium">
                      {formatScheduledDateTime()}
                    </span>
                  </p>
                )}

                <div className="space-y-4 sm:space-y-8">
                  {/* Date Carousel with Navigation */}
                  <div className="relative flex items-center gap-1 sm:gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevious}
                      disabled={startIndex === 0}
                      className={`flex-shrink-0 p-2 rounded-full transition-all ${startIndex === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    {/* Date Cards */}
                    <div className="flex gap-2 sm:gap-4 overflow-hidden flex-1">
                      {visibleDays.map((day, index) => {
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day)}
                            className={`flex-shrink-0 flex flex-col items-center justify-center w-14 sm:w-[110px] h-16 sm:h-24 rounded-xl sm:rounded-2xl border transition-all ${isSelected
                              ? "border-[#E91614] bg-white shadow-md"
                              : "border-gray-300 hover:border-gray-400 bg-white"
                              }`}
                          >
                            <span
                              className={`text-xs sm:text-lg font-semibold mb-0.5 sm:mb-1 ${isSelected ? "text-black" : "text-gray-700"
                                }`}
                            >
                              {format(day, "EEE")}
                            </span>
                            <span
                              className={`text-xl sm:text-4xl font-bold ${isSelected ? "text-black" : "text-gray-900"
                                }`}
                            >
                              {format(day, "d")}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      disabled={startIndex + 6 >= allDays.length}
                      className={`flex-shrink-0 p-2 rounded-full transition-all ${startIndex + 6 >= allDays.length
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Time Slots */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 sm:mb-8 justify-between">
                    {(Object.entries(timeSlots) as [TimeSlot, TimeSlotConfig][]).map(([slot, config]) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`flex-1 px-3 sm:px-4 py-3 sm:py-2 rounded-2xl sm:rounded-3xl border text-center transition-all ${isSelected
                            ? "border-[#E91614] bg-white shadow-md"
                            : "border-gray-300 hover:border-gray-400 bg-white"
                            }`}
                        >
                          <div className="flex flex-col items-center gap-1 sm:gap-2">
                            <span
                              className={`text-base sm:text-xl font-semibold ${isSelected ? "text-black" : "text-gray-700"
                                }`}
                            >
                              {config.label}
                            </span>
                            <span
                              className={`text-xs sm:text-sm ${isSelected ? "text-gray-600" : "text-gray-500"
                                }`}
                            >
                              {config.time}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Schedule Button */}
                  <Button
                    onClick={handleSchedule}
                    className="w-full py-6 sm:py-9 rounded-xl sm:rounded-2xl font-normal text-white text-base sm:text-xl hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Schedule
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>

      <style jsx global>{`
        .custom-calendar-wrapper .react-calendar {
          border: none;
          font-family: inherit;
          width: 100%;
          background: white;
        }

        .custom-calendar-wrapper .react-calendar__navigation {
          display: none;
        }

        .custom-calendar-wrapper .react-calendar__viewContainer {
          padding: 0;
        }

        .custom-calendar-wrapper .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: capitalize;
          font-weight: 500;
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 1rem;
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
        }

        .custom-calendar-wrapper .react-calendar__month-view__weekdays__weekday {
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-calendar-wrapper .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }

        .custom-calendar-wrapper .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem;
        }

        .custom-calendar-wrapper .react-calendar__tile {
          max-width: 100%;
          padding: 1rem 0.5rem;
          background: none;
          text-align: center;
          line-height: 1;
          font-size: 1.25rem;
          font-weight: 400;
          border-radius: 0.5rem;
          color: #1f2937;
          border: none;
          transition: all 0.2s;
        }

        .custom-calendar-wrapper .react-calendar__tile:enabled:hover,
        .custom-calendar-wrapper .react-calendar__tile:enabled:focus {
          background-color: #f3f4f6;
        }

        .custom-calendar-wrapper .react-calendar__tile--now {
          background: transparent;
          color: #1f2937;
          font-weight: 500;
        }

        .custom-calendar-wrapper .react-calendar__tile--now:enabled:hover,
        .custom-calendar-wrapper .react-calendar__tile--now:enabled:focus {
          background: #f3f4f6;
        }

        .custom-calendar-wrapper .react-calendar__tile--active {
          background: #e91614 !important;
          color: white !important;
          font-weight: 600;
        }

        .custom-calendar-wrapper .react-calendar__tile--active:enabled:hover,
        .custom-calendar-wrapper .react-calendar__tile--active:enabled:focus {
          background: #dc2626 !important;
        }

        .custom-calendar-wrapper .react-calendar__month-view__days__day--weekend {
          color: #1f2937;
        }

        .custom-calendar-wrapper .react-calendar__month-view__days__day--neighboringMonth {
          color: #d1d5db;
          opacity: 0.5;
          font-weight: 300;
        }

        .custom-calendar-wrapper .react-calendar__tile:disabled {
          background-color: transparent;
          color: #d1d5db;
          opacity: 0.4;
        }

        @media (max-width: 768px) {
          .custom-calendar-wrapper .react-calendar__tile {
            font-size: 1rem;
            padding: 0.75rem 0.25rem;
          }
          
          .custom-calendar-wrapper .react-calendar__month-view__weekdays__weekday {
            font-size: 0.875rem;
            padding: 0.25rem;
          }
          
          .custom-calendar-wrapper .react-calendar__month-view__weekdays__weekday abbr {
            color: #9ca3af;
          }
        }
      `}</style>
    </>
  );
};
