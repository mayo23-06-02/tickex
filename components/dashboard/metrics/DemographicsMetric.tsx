export function DemographicsMetric() {
    return (
        <div className="flex items-center gap-4 mt-2">
            <div className="relative w-16 h-16 flex-shrink-0">
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        background: 'conic-gradient(#1DB954 0% 62%, #0f172a 62% 100%)'
                    }}
                ></div>
                <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>

            <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1DB954]"></div>
                        <span className="text-[#64748b]">18-35</span>
                    </div>
                    <span className="font-medium text-[#0f172a]">62%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#0f172a]"></div>
                        <span className="text-[#64748b]">36+</span>
                    </div>
                    <span className="font-medium text-[#0f172a]">38%</span>
                </div>
            </div>
        </div>
    );
}
