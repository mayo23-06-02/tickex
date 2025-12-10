import { DollarSign, Users } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TotalSalesMetric } from './metrics/TotalSalesMetric';
import { TicketsSoldMetric } from './metrics/TicketsSoldMetric';
import { DemographicsMetric } from './metrics/DemographicsMetric';
import { RealTimeSalesMetric } from './metrics/RealTimeSalesMetric';

export function MetricGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard
                delay={0}
                title="Total Sales"
                value="SZL 42,100"
                icon={
                    <div className="bg-[#1DB954] p-1.5 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                    </div>
                }
                trend={{ value: '+12.5%', isPositive: true }}
                subtitle="vs. last event"
            >
                <TotalSalesMetric />
            </MetricCard>

            <MetricCard
                delay={0.1}
                title="Tickets Sold"
                value="842/1,200"
                icon={
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="transform -rotate-90 w-12 h-12 absolute inset-0">
                            <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="none"
                                stroke="#1DB954"
                                strokeWidth="4"
                                strokeDasharray="126"
                                strokeDashoffset="38"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="text-[10px] font-bold text-[#1DB954]">70%</span>
                    </div>
                }
            >
                <TicketsSoldMetric />
            </MetricCard>

            <MetricCard
                delay={0.2}
                title="Demographics"
                icon={<Users className="w-5 h-5 text-[#64748b]" />}
            >
                <DemographicsMetric />
            </MetricCard>

            <MetricCard
                delay={0.3}
                title="Real-Time Sales"
                value="Live"
                isLive={true}
            >
                <RealTimeSalesMetric />
            </MetricCard>
        </div>
    );
}
