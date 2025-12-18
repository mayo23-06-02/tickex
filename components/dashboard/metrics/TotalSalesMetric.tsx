interface TotalSalesMetricProps {
    series?: number[];
}

export function TotalSalesMetric({ series = [40, 35, 55, 45, 60, 75, 50, 65, 80, 70, 90, 100] }: TotalSalesMetricProps) {
    return (
        <div className="h-12 w-full flex items-end gap-1 mt-4">
            {series.map((h, i) => (
                <div
                    key={i}
                    className="flex-1 bg-green-100 rounded-sm hover:bg-green-200 transition-colors relative group"
                    style={{ height: `${Math.max(0, Math.min(100, h))}%` }}
                >
                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                        {Math.round(h)}%
                    </div>
                </div>
            ))}
        </div>
    );
}
