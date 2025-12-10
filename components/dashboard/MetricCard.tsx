"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetricCardProps {
    title: string;
    value?: string;
    icon?: ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    subtitle?: string;
    children?: ReactNode;
    delay?: number;
    isLive?: boolean;
    action?: ReactNode;
}

export function MetricCard({
    title,
    value,
    icon,
    trend,
    subtitle,
    children,
    delay = 0,
    isLive = false,
    action
}: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-medium text-[#64748b]">{title}</h3>
                    {isLive && (
                        <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-lg font-bold text-[#0f172a]">{value}</span>
                        </div>
                    )}
                    {!isLive && value && (
                        <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[#0f172a] tracking-tight">{value}</span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className={!isLive ? "p-2 bg-slate-50 rounded-lg" : ""}>
                        {icon}
                    </div>
                )}
            </div>

            {children && <div className="mt-2">{children}</div>}

            {trend && (
                <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className={trend.isPositive ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                        {trend.value}
                    </span>
                    <span className="text-[#64748b]">{subtitle}</span>
                </div>
            )}

            {action && (
                <div className="mt-4">
                    {action}
                </div>
            )}
        </motion.div>
    );
}
