interface BreakdownItem {
    name: string;
    sold: number;
}

export function TicketsSoldMetric({ breakdown = [] as BreakdownItem[] }: { breakdown?: BreakdownItem[] }) {
    const items = breakdown.slice(0, 4);
    return (
        <div className="mt-2">
            <div className="space-y-1">
                {items.length === 0 ? (
                    <div className="text-xs text-[#94a3b8]">No ticket sales yet</div>
                ) : (
                    items.map((b, i) => (
                        <div key={i} className="flex justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#1DB954]' : 'bg-[#cbd5e1]'}`}></div>
                                <span className="text-[#64748b]">{b.name}</span>
                            </div>
                            <span className="font-medium text-[#0f172a]">{b.sold}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
