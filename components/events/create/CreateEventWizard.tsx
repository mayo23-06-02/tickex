"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { EventBasics } from "./steps/EventBasics";
import { EventBranding } from "./steps/EventBranding";
import { TicketSetup } from "./steps/TicketSetup";
import { EventPolicies } from "./steps/EventPolicies";
import { ReviewPublish } from "./steps/ReviewPublish";

export type EventFormData = {
    name: string;
    organizer: string;
    category: string;
    startDate: Date | null;
    endDate: Date | null;
    location: string;
    description: string;
    tickets: any[];
    refundPolicy: string;
    ageRestriction: string;
};

const initialData: EventFormData = {
    name: "",
    organizer: "Tickex Organizer", // Default
    category: "",
    startDate: null,
    endDate: null,
    location: "",
    description: "",
    tickets: [],
    refundPolicy: "non-refundable",
    ageRestriction: "18+",
};

const steps = [
    { id: 1, title: "Event Basics", description: "Name, Date & Venue" },
    { id: 2, title: "Content", description: "Branding & Details" },
    { id: 3, title: "Tickets", description: "Types & Pricing" },
    { id: 4, title: "Policies", description: "Rules & Regulations" },
    { id: 5, title: "Review", description: "Preview & Publish" },
];

export function CreateEventWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<EventFormData>(initialData);

    const updateFormData = (data: Partial<EventFormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="max-w-5xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#1DB954] -z-10 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step) => {
                        const isCompleted = currentStep > step.id;
                        const isCurrent = currentStep === step.id;

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-[#f8fafc] px-2">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? "bg-[#1DB954] border-[#1DB954] text-white" :
                                            isCurrent ? "bg-white border-[#1DB954] text-[#1DB954]" :
                                                "bg-white border-slate-200 text-slate-400"
                                        }`}
                                >
                                    {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-bold">{step.id}</span>}
                                </div>
                                <div className="text-center hidden sm:block">
                                    <div className={`text-xs font-semibold uppercase tracking-wider ${isCurrent ? "text-[#0f172a]" : "text-[#64748b]"
                                        }`}>
                                        {step.title}
                                    </div>
                                    <div className="text-[10px] text-[#94a3b8]">{step.description}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 1 && <EventBasics data={formData} update={updateFormData} />}
                        {currentStep === 2 && <EventBranding data={formData} update={updateFormData} />}
                        {currentStep === 3 && <TicketSetup data={formData} update={updateFormData} />}
                        {currentStep === 4 && <EventPolicies data={formData} update={updateFormData} />}
                        {currentStep === 5 && <ReviewPublish data={formData} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentStep === 1
                            ? "text-slate-300 cursor-not-allowed"
                            : "text-[#64748b] hover:text-[#0f172a] hover:bg-white border border-transparent hover:border-[#e2e8f0]"
                        }`}
                >
                    Back
                </button>

                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg text-sm font-medium transition-all shadow-sm shadow-green-200"
                >
                    {currentStep === steps.length ? "Publish Event" : "Continue"}
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
