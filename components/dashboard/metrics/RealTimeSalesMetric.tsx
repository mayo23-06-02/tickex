import { MapPin } from "lucide-react";

export function RealTimeSalesMetric() {
    return (
        <div className="space-y-3 mt-1">
            <div className="space-y-1">
                <div className="text-xs text-[#64748b]">
                    Last sale: <span className="font-medium text-[#0f172a]">2 min ago</span>
                </div>
                <div className="text-xs text-[#64748b]">
                    Velocity: <span className="font-medium text-[#1DB954]">12 tickets/hour</span>
                </div>
                <div className="text-xs text-[#64748b]">
                    Top location: <span className="font-medium text-[#0f172a]">Mbabane</span>
                </div>
            </div>

            <button className="flex items-center gap-1.5 text-xs font-medium text-[#1DB954] hover:text-[#1ed760] transition-colors">
                <MapPin className="w-3 h-3" />
                View sales map
            </button>
        </div>
    );
}
