"use client";

import { Download } from "lucide-react";

export function RevenueAnalytics() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-[#0f172a]">Revenue Analytics</h3>
                    <p className="text-sm text-[#64748b]">Track revenue performance over time</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-50 p-1 rounded-lg border border-[#e2e8f0]">
                        <button className="px-3 py-1 text-xs font-medium text-[#64748b] hover:text-[#0f172a] hover:bg-white rounded-md transition-all">Day</button>
                        <button className="px-3 py-1 text-xs font-medium text-[#64748b] hover:text-[#0f172a] hover:bg-white rounded-md transition-all">Week</button>
                        <button className="px-3 py-1 text-xs font-medium text-white bg-[#1DB954] rounded-md shadow-sm transition-all">Month</button>
                        <button className="px-3 py-1 text-xs font-medium text-[#64748b] hover:text-[#0f172a] hover:bg-white rounded-md transition-all">Quarter</button>
                    </div>
                    <button className="p-2 text-[#64748b] hover:text-[#0f172a] border border-[#e2e8f0] rounded-lg hover:bg-slate-50 transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <svg viewBox="0 0 1000 300" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#1DB954" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#1DB954" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={i * 75}
                            x2="1000"
                            y2={i * 75}
                            stroke="#f1f5f9"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Area fill */}
                    <path
                        d="M0,250 L100,220 L200,240 L300,180 L400,150 L500,160 L600,100 L700,80 L800,120 L900,60 L1000,40 L1000,300 L0,300 Z"
                        fill="url(#gradient)"
                    />

                    {/* Line path */}
                    <path
                        d="M0,250 L100,220 L200,240 L300,180 L400,150 L500,160 L600,100 L700,80 L800,120 L900,60 L1000,40"
                        fill="none"
                        stroke="#1DB954"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {[
                        { x: 100, y: 220, val: "12k" },
                        { x: 300, y: 180, val: "25k" },
                        { x: 500, y: 160, val: "28k" },
                        { x: 700, y: 80, val: "45k" },
                        { x: 900, y: 60, val: "52k" },
                    ].map((point, i) => (
                        <g key={i} className="group">
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill="white"
                                stroke="#1DB954"
                                strokeWidth="2"
                                className="transition-all duration-300 group-hover:r-6"
                            />
                            <foreignObject x={point.x - 20} y={point.y - 40} width="40" height="30" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-[#1e293b] text-white text-[10px] py-1 px-1.5 rounded text-center">
                                    {point.val}
                                </div>
                            </foreignObject>
                        </g>
                    ))}
                </svg>
            </div>

            <div className="flex justify-between mt-4 text-xs text-[#94a3b8]">
                <span>Feb 1</span>
                <span>Feb 5</span>
                <span>Feb 10</span>
                <span>Feb 15</span>
                <span>Feb 20</span>
                <span>Feb 25</span>
                <span>Feb 28</span>
            </div>
        </div>
    );
}
