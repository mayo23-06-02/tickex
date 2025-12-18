import { DollarSign, Users } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TotalSalesMetric } from './metrics/TotalSalesMetric';
import { TicketsSoldMetric } from './metrics/TicketsSoldMetric';
import { DemographicsMetric } from './metrics/DemographicsMetric';
import { RealTimeSalesMetric } from './metrics/RealTimeSalesMetric';

interface MetricGridProps {
    data?: {
        revenue: number;
        orders: number;
        ticketsSold: number;
        activeEvents: number;
    };
    breakdown?: Array<{ name: string; sold: number }>;
    salesSeries?: number[];
    lastSaleMinutes?: number | null;
    velocityPerHour?: number | null;
}

export function MetricGrid({ data, breakdown = [], salesSeries = [], lastSaleMinutes = null, velocityPerHour = null }: MetricGridProps) {
    const revenue = data ? `SZL ${data.revenue.toLocaleString()}` : "SZL 0";
    const tickets = data ? `${data.ticketsSold}` : "0";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard
                delay={0}
                title="Total Sales"
                value={revenue}
                icon={
                    <div className="bg-success p-1.5 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                    </div>
                }
                trend={{ value: '+0%', isPositive: true }}
                subtitle="All time revenue"
            >
                <TotalSalesMetric series={salesSeries} />
            </MetricCard>

            <MetricCard
                delay={0.1}
                title="Tickets Sold"
                value={tickets}
                // Removed complex SVG ring for simplicity in dynamic update to avoid prop drilling complex math right now
                icon={
                    <div className="bg-info p-1.5 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                }
            >
                <TicketsSoldMetric breakdown={breakdown} />
            </MetricCard>

            <MetricCard
                delay={0.2}
                title="Active Events"
                value={`${data?.activeEvents || 0}`}
                icon={<Users className="w-5 h-5 text-[#64748b]" />}
            >
                {/* Replaced Demographics with simpler count for initial backend integration */}
                <div className="h-24 flex items-center justify-center text-slate-400">
                    Event Analytics Loading...
                </div>
            </MetricCard>

            <MetricCard
                delay={0.3}
                title="Real-Time Sales"
                value="Live"
                isLive={true}
            >
                <RealTimeSalesMetric lastSaleMinutes={lastSaleMinutes} velocityPerHour={velocityPerHour} />
            </MetricCard>
        </div>
    );
}
