import { MapPin } from "lucide-react";

export function RealTimeSalesMetric({
    lastSaleMinutes = null,
    velocityPerHour = null
}: {
    lastSaleMinutes?: number | null;
    velocityPerHour?: number | null;
}) {
    return (
        <div className="space-y-3 mt-1">
            <div className="space-y-1">
                <div className="text-xs text-[#64748b]">
                    Last sale:{" "}
                    <span className="font-medium text-[#0f172a]">
                        {lastSaleMinutes === null ? "—" : `${lastSaleMinutes} min ago`}
                    </span>
                </div>
                <div className="text-xs text-[#64748b]">
                    Velocity:{" "}
                    <span className="font-medium text-[#1DB954]">
                        {velocityPerHour === null ? "—" : `${velocityPerHour} tickets/hour`}
                    </span>
                </div>
            </div>

            <button className="flex items-center gap-1.5 text-xs font-medium text-[#1DB954] hover:text-[#1ed760] transition-colors">
                <MapPin className="w-3 h-3" />
                View sales map
            </button>
        </div>
    );
}
