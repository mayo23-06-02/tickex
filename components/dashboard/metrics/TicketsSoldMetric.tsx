export function TicketsSoldMetric() {
    return (
        <div className="mt-2">
            <div className="space-y-1">
                <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1DB954]"></div>
                        <span className="text-[#64748b]">VIP</span>
                    </div>
                    <span className="font-medium text-[#0f172a]">120</span>
                </div>
                <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#cbd5e1]"></div>
                        <span className="text-[#64748b]">GA</span>
                    </div>
                    <span className="font-medium text-[#0f172a]">722</span>
                </div>
            </div>

            <p className="text-xs text-[#1DB954] font-medium mt-3">
                Will sell out in 4 days
            </p>
        </div>
    );
}
