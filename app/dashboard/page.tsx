import DashboardLayout from "@/components/layout/DashboardLayout";
import { MetricGrid } from "@/components/dashboard/MetricGrid";
import { TimelineSection } from "@/components/dashboard/TimelineSection";
import { EmptyStateDashboard } from "@/components/dashboard/EmptyStateDashboard";
import { Calendar } from "lucide-react";
import Link from 'next/link';
import { auth } from "@/auth";
import { getDashboardMetrics } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/Button";
import dbConnect from "@/lib/db/connect";
import Event from "@/lib/db/models/Event";
import TicketType from "@/lib/db/models/TicketType";
import Order from "@/lib/db/models/Order";
import Milestone from "@/lib/db/models/Milestone";
import { PredictiveForecast } from "@/components/dashboard/PredictiveForecast";
import { Calendar as CalendarIcon, Ticket, Clock, Palette, DollarSign, Users } from "lucide-react";
import { EventSelector } from "@/components/dashboard/EventSelector";
import { MomoDemo } from "@/components/payments/MomoDemo";

export default async function Dashboard({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
    const session = await auth();
    const userId = session?.user?.id;
    const params = searchParams ? await searchParams : {};
    const rawEventParam = params?.eventId;
    const currentEventId = (typeof rawEventParam === 'string' && rawEventParam.length > 0)
        ? rawEventParam
        : 'all';

    // Fetch Real Data if logged in, otherwise mock or empty
    let metrics = { revenue: 0, orders: 0, ticketsSold: 0, activeEvents: 0 };
    let organizerEvents: Array<{ id: string, title: string }> = [];
    let breakdown: Array<{ name: string; sold: number }> = [];
    let salesSeries: number[] = [];
    let lastSaleMinutes: number | null = null;
    let velocityPerHour: number | null = null;
    let timelineItems: Array<{ status: "completed" | "active" | "pending"; title: string; subtitle: string }> = [];

    if (userId) {
        try {
            metrics = await getDashboardMetrics(userId, currentEventId);
            await dbConnect();
            const events = await Event.find({ organizerId: userId }).select('_id title').lean();
            organizerEvents = events.map(e => ({ id: e._id.toString(), title: e.title }));

            const eventIds = currentEventId !== 'all'
                ? [currentEventId]
                : events.map(e => e._id.toString());

            if (eventIds.length > 0) {
                const ticketTypes = await TicketType.find({ event: { $in: eventIds } }).select('name quantitySold').lean();
                breakdown = ticketTypes.map(tt => ({ name: tt.name, sold: tt.quantitySold || 0 }));

                const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
                const recentOrders = await Order.find({
                    eventId: { $in: eventIds },
                    status: 'paid'
                })
                    .sort({ createdAt: -1 })
                    .limit(50)
                    .lean();

                if (recentOrders.length > 0) {
                    const lastSale = recentOrders[0].createdAt as Date;
                    lastSaleMinutes = Math.max(0, Math.floor((Date.now() - new Date(lastSale).getTime()) / (60 * 1000)));
                    const ordersInHour = (recentOrders as Array<{ items?: Array<{ quantity?: number }>; createdAt: Date }>).filter(o => new Date(o.createdAt) > oneHourAgo);
                    const ticketsInHour = ordersInHour.reduce((sum, o) => sum + ((o.items || []).reduce((s, it) => s + (it.quantity || 0), 0)), 0);
                    velocityPerHour = ticketsInHour;
                    const last12 = recentOrders.slice(0, 12).map(o => o.totalAmount || 0);
                    const max = Math.max(1, ...last12);
                    salesSeries = last12.map(v => Math.round((v / max) * 100));
                }

                const milestones = await Milestone.find({
                    eventId: currentEventId !== 'all' ? currentEventId : events[0]?._id
                }).sort({ dueDate: 1 }).lean();

                timelineItems = milestones.map(m => ({
                    status: m.status === 'completed' ? 'completed' : m.status === 'in_progress' ? 'active' : 'pending',
                    title: m.title as string,
                    subtitle: m.dueDate ? `Due ${new Date(m.dueDate as Date).toLocaleDateString()}` : ''
                }));
            }
        } catch (e) {
            console.error("Failed to load metrics", e);
        }
    }

    return (
        <DashboardLayout>
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {session?.user?.name || 'Organizer'}</p>
                </div>
                <div className="flex items-center gap-3">
                    <EventSelector events={organizerEvents} currentEventId={currentEventId} />
                    <Button className="gap-2" href={`/event-timeline${currentEventId !== 'all' ? `?eventId=${currentEventId}` : ''}`}>
                        <Calendar className="w-4 h-4" />
                        Manage Timeline
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                <Link href="/events/create" className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Create Event</span>
                </Link>
                <Link href="/tickets" className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Manage Tickets</span>
                </Link>
                <Link href={`/event-timeline${currentEventId !== 'all' ? `?eventId=${currentEventId}` : ''}`} className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Timeline</span>
                </Link>
                <Link href="/branding" className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                    <Palette className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Branding</span>
                </Link>
                <Link href="/financials" className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Financials</span>
                </Link>
                <Link href="/customers" className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Customers</span>
                </Link>
            </div>


            {metrics.activeEvents === 0 ? (
                <EmptyStateDashboard />
            ) : (
                <>
                    <MetricGrid
                        data={metrics}
                        breakdown={breakdown}
                        salesSeries={salesSeries}
                        lastSaleMinutes={lastSaleMinutes}
                        velocityPerHour={velocityPerHour}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <TimelineSection items={timelineItems} />
                        </div>
                        <div className="lg:col-span-2">
                            <EventAnalytics
                                userId={userId || ''}
                                currentEventId={currentEventId}
                                recentSeries={salesSeries}
                            />
                        </div>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}

type OrderItemLite = { quantity?: number; total?: number; ticketTypeId?: unknown };
type OrderLite = { items?: OrderItemLite[]; createdAt: Date; totalAmount?: number; eventId: unknown };

async function computeAnalytics(userId: string, currentEventId: string) {
    await dbConnect();
    const events = await Event.find({ organizerId: userId }).select('_id title').lean();
    const eventIds = currentEventId !== 'all' ? [currentEventId] : events.map(e => e._id.toString());
    let funnel = { visitors: 0, views: 0, checkout: 0, purchase: 0 };
    let capacity = { sold: 0, total: 0, pct: 0 };
    let stacked: Array<{ date: string; series: Record<string, number> }> = [];
    let treemap: Array<{ name: string; value: number; children?: Array<{ name: string; value: number }> }> = [];
    let geo: Array<{ region: string; count: number }> = [];
    if (eventIds.length > 0) {
        const totalOrders = await Order.countDocuments({ eventId: { $in: eventIds } });
        const paidOrders = await Order.countDocuments({ eventId: { $in: eventIds }, status: 'paid' });
        funnel = {
            visitors: totalOrders * 4,
            views: totalOrders * 3,
            checkout: totalOrders,
            purchase: paidOrders
        };
        const ticketTypes = await TicketType.find({ event: { $in: eventIds } }).select('_id name quantitySold quantityTotal event').lean();
        const idToName = new Map<string, string>(ticketTypes.map(tt => [tt._id.toString(), tt.name]));
        const idToEvent = new Map<string, string>(events.map(e => [e._id.toString(), e.title]));
        const paid = await Order.find({ eventId: { $in: eventIds }, status: 'paid' }).sort({ createdAt: 1 }).lean() as unknown as OrderLite[];
        const byDate = new Map<string, Map<string, number>>();
        const eventRevenue = new Map<string, number>();
        const perEventChildren = new Map<string, Map<string, number>>();
        for (const o of paid as OrderLite[]) {
            const d = new Date(o.createdAt as Date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (!byDate.has(key)) byDate.set(key, new Map<string, number>());
            const bucket = byDate.get(key)!;
            const evId = String((o as unknown as { eventId: unknown }).eventId);
            eventRevenue.set(evId, (eventRevenue.get(evId) || 0) + (o.totalAmount || 0));
            if (!perEventChildren.has(evId)) perEventChildren.set(evId, new Map<string, number>());
            const children = perEventChildren.get(evId)!;
            for (const it of (o.items || [] as OrderItemLite[])) {
                const tid = String((it as unknown as { ticketTypeId: unknown }).ticketTypeId);
                const name = idToName.get(tid) || 'Ticket';
                bucket.set(name, (bucket.get(name) || 0) + (it.quantity || 0));
                children.set(name, (children.get(name) || 0) + (it.total || 0));
            }
        }
        stacked = Array.from(byDate.entries()).map(([date, m]) => ({
            date,
            series: Object.fromEntries(Array.from(m.entries()))
        }));
        treemap = Array.from(eventRevenue.entries()).map(([evId, value]) => ({
            name: idToEvent.get(evId) || 'Event',
            value,
            children: Array.from((perEventChildren.get(evId) || new Map()).entries()).map(([name, v]) => ({ name, value: v }))
        }));
        const totalSold = ticketTypes.reduce((s, tt) => s + (tt.quantitySold || 0), 0);
        const totalCap = ticketTypes.reduce((s, tt) => s + (tt.quantityTotal || 0), 0);
        const pct = totalCap > 0 ? Math.round((totalSold / totalCap) * 100) : 0;
        capacity = { sold: totalSold, total: totalCap, pct };
        geo = [];
    }
    return { funnel, capacity, stacked, treemap, geo };
}

function Color(i: number) {
    const colors = ['#1DB954', '#0f172a', '#3b82f6', '#f59e0b', '#ef4444', '#10b981'];
    return colors[i % colors.length];
}

async function EventAnalytics({
    userId,
    currentEventId,
    recentSeries
}: {
    userId: string;
    currentEventId: string;
    recentSeries: number[];
}) {
    const data = await computeAnalytics(userId, currentEventId);
    const stackedKeys = Array.from(
        data.stacked.reduce((set, d) => {
            Object.keys(d.series).forEach(k => set.add(k));
            return set;
        }, new Set<string>())
    );
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-sm font-semibold text-foreground mb-6">Event Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-4 border border-border rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Conversion Funnel</div>
                        <div className="space-y-2">
                            {[
                                { label: 'Visitors', value: data.funnel.visitors },
                                { label: 'Views', value: data.funnel.views },
                                { label: 'Checkout', value: data.funnel.checkout },
                                { label: 'Purchase', value: data.funnel.purchase }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-24 text-xs text-muted-foreground">{s.label}</div>
                                    <div className="flex-1 h-6 rounded-full" style={{ background: `linear-gradient(to right, ${Color(i)} 0%, ${Color(i)} ${Math.min(100, (s.value || 0) > 0 ? 100 : 0)}%, #e5e7eb ${Math.min(100, (s.value || 0) > 0 ? 100 : 0)}%)` }} />
                                    <div className="w-16 text-right text-xs">{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Capacity Gauge</div>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full" style={{ background: `conic-gradient(${Color(0)} ${data.capacity.pct * 3.6}deg, #e5e7eb 0)` }} />
                            <div>
                                <div className="text-lg font-bold">{data.capacity.pct}%</div>
                                <div className="text-xs text-muted-foreground">{data.capacity.sold} of {data.capacity.total} tickets sold</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 border border-border rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Stacked Sales Over Time</div>
                        <div className="h-40 flex items-end gap-2">
                            {data.stacked.map((d, i) => {
                                const total = stackedKeys.reduce((s, k) => s + (d.series[k] || 0), 0);
                                const height = total > 0 ? Math.min(100, Math.round((total / (total || 1)) * 100)) : 4;
                                return (
                                    <div key={i} className="flex-1 flex flex-col justify-end gap-0.5" style={{ height: `${Math.max(20, height)}%` }}>
                                        {stackedKeys.map((k, idx) => {
                                            const v = d.series[k] || 0;
                                            const segment = total > 0 ? Math.round((v / total) * 100) : 0;
                                            return <div key={k} className="w-full rounded-sm" style={{ height: `${segment}%`, backgroundColor: Color(idx) }} />;
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3">
                            {stackedKeys.map((k, i) => (
                                <div key={k} className="flex items-center gap-2 text-xs">
                                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: Color(i) }} />
                                    <span>{k}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Revenue Treemap</div>
                        <div className="grid grid-cols-2 gap-2">
                            {data.treemap.map((e, i) => (
                                <div key={i} className="p-2 border border-border rounded">
                                    <div className="text-xs font-semibold mb-2">{e.name}</div>
                                    <div className="flex flex-wrap gap-1">
                                        {(e.children || []).map((c, idx) => (
                                            <div key={idx} className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: Color(idx) }}>
                                                {c.name}: {Math.round(c.value)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 border border-border rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Geo Map</div>
                        <div className="text-xs text-muted-foreground">No location data available</div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Recent Sales Pulse</div>
                        <div className="h-32 w-full flex items-end gap-1">
                            {(recentSeries.length ? recentSeries : [20, 30, 25, 40, 35, 50]).map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/20 rounded-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <PredictiveForecast />
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MomoDemo />
                </div>
            </div>
        </div>
    );
}
