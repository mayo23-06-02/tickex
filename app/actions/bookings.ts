"use server";

import dbConnect from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import User from "@/lib/db/models/User";
import Ticket from "@/lib/db/models/Ticket";
import TicketType from "@/lib/db/models/TicketType";
import Event from "@/lib/db/models/Event";
import { startOfDay, endOfDay, subDays, format } from "date-fns";

export interface BookingData {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        initials: string;
        bgColor: string;
    };
    type: string;
    qty: number;
    date: string;
    time: string;
    amount: number;
    payment: string;
    status: "Confirmed" | "Pending" | "Cancelled";
    eventTitle?: string;
    ticketCodes?: string[];
}

export interface BookingsStats {
    todaysSales: number;
    pendingPayments: number;
    refundRequests: number;
    avgTicketPrice: number;
}

export interface SalesData {
    date: string;
    amount: number;
}

// Helper function to generate initials and color
function generateCustomerDisplay(name: string, email: string) {
    const nameParts = name.split(" ");
    const initials = nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();

    const colors = [
        "bg-purple-600",
        "bg-blue-600",
        "bg-green-600",
        "bg-orange-600",
        "bg-pink-600",
        "bg-indigo-600",
        "bg-teal-600",
        "bg-red-600",
    ];

    // Generate consistent color based on email
    const colorIndex = email.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

    return {
        initials,
        bgColor: colors[colorIndex],
    };
}

/**
 * Fetch all bookings with filters
 */
export async function getBookings(filters?: {
    search?: string;
    status?: string;
    type?: string;
    startDate?: Date | null;
    endDate?: Date | null;
}): Promise<BookingData[]> {
    try {
        await dbConnect();

        // Build query
        const query: any = {};

        // Status filter
        if (filters?.status && filters.status !== "All") {
            const statusMap: Record<string, string> = {
                "Confirmed": "paid",
                "Pending": "pending",
                "Cancelled": "cancelled",
            };
            query.status = statusMap[filters.status] || filters.status.toLowerCase();
        }

        // Date range filter
        if (filters?.startDate && filters?.endDate) {
            query.createdAt = {
                $gte: startOfDay(filters.startDate),
                $lte: endOfDay(filters.endDate),
            };
        }

        // Fetch orders with populated data
        const orders = await Order.find(query)
            .populate("userId")
            .populate({
                path: "items.ticketTypeId",
                model: "TicketType",
            })
            .populate("eventId")
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        // Transform to BookingData format
        const bookings: BookingData[] = await Promise.all(
            orders.map(async (order: any) => {
                const user = order.userId;
                const event = order.eventId;
                const { initials, bgColor } = generateCustomerDisplay(user.name, user.email);

                // Get ticket type from first item
                const firstItem = order.items[0];
                const ticketType = firstItem?.ticketTypeId?.name || "General";

                // Get total quantity
                const totalQty = order.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

                // Get ticket codes for this order
                const tickets = await Ticket.find({ orderId: order._id }).select("ticketCode").lean();
                const ticketCodes = tickets.map((t: any) => t.ticketCode);

                // Map status
                const statusMap: Record<string, "Confirmed" | "Pending" | "Cancelled"> = {
                    "paid": "Confirmed",
                    "pending": "Pending",
                    "cancelled": "Cancelled",
                    "failed": "Cancelled",
                };

                const booking: BookingData = {
                    id: `TIX-${order._id.toString().slice(-4).toUpperCase()}`,
                    customer: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone || "+268 7600 0000",
                        initials,
                        bgColor,
                    },
                    type: ticketType,
                    qty: totalQty,
                    date: format(new Date(order.createdAt), "MMM d, yyyy"),
                    time: format(new Date(order.createdAt), "HH:mm"),
                    amount: order.totalAmount,
                    payment: order.stripePaymentIntentId ? "Card" : "Cash",
                    status: statusMap[order.status] || "Pending",
                    eventTitle: event?.title,
                    ticketCodes,
                };

                return booking;
            })
        );

        // Apply search filter (client-side for now)
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            return bookings.filter(
                (b) =>
                    b.customer.name.toLowerCase().includes(searchLower) ||
                    b.customer.email.toLowerCase().includes(searchLower) ||
                    b.id.toLowerCase().includes(searchLower)
            );
        }

        // Apply type filter
        if (filters?.type && filters.type !== "All") {
            return bookings.filter((b) => b.type === filters.type);
        }

        return bookings;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return [];
    }
}

/**
 * Get booking statistics
 */
export async function getBookingsStats(): Promise<BookingsStats> {
    try {
        await dbConnect();

        const today = new Date();
        const startOfToday = startOfDay(today);
        const endOfToday = endOfDay(today);

        // Today's sales
        const todayOrders = await Order.find({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            status: "paid",
        }).lean();

        const todaysSales = todayOrders.reduce((sum, order: any) => sum + order.totalAmount, 0);

        // Pending payments
        const pendingOrders = await Order.find({ status: "pending" }).lean();
        const pendingPayments = pendingOrders.reduce((sum, order: any) => sum + order.totalAmount, 0);

        // Refund requests (cancelled in last 7 days)
        const refundOrders = await Order.find({
            status: "cancelled",
            updatedAt: { $gte: subDays(today, 7) },
        }).countDocuments();

        // Average ticket price
        const allPaidOrders = await Order.find({ status: "paid" }).lean();
        const totalRevenue = allPaidOrders.reduce((sum, order: any) => sum + order.totalAmount, 0);
        const totalTickets = allPaidOrders.reduce(
            (sum, order: any) => sum + order.items.reduce((s: number, item: any) => s + item.quantity, 0),
            0
        );
        const avgTicketPrice = totalTickets > 0 ? Math.round(totalRevenue / totalTickets) : 0;

        return {
            todaysSales,
            pendingPayments,
            refundRequests: refundOrders,
            avgTicketPrice,
        };
    } catch (error) {
        console.error("Error fetching booking stats:", error);
        return {
            todaysSales: 0,
            pendingPayments: 0,
            refundRequests: 0,
            avgTicketPrice: 0,
        };
    }
}

/**
 * Get sales over time for chart
 */
export async function getSalesOverTime(days: number = 7): Promise<SalesData[]> {
    try {
        await dbConnect();

        const salesData: SalesData[] = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = subDays(today, i);
            const startDate = startOfDay(date);
            const endDate = endOfDay(date);

            const orders = await Order.find({
                createdAt: { $gte: startDate, $lte: endDate },
                status: "paid",
            }).lean();

            const amount = orders.reduce((sum, order: any) => sum + order.totalAmount, 0);

            salesData.push({
                date: format(date, "MMM d"),
                amount,
            });
        }

        return salesData;
    } catch (error) {
        console.error("Error fetching sales over time:", error);
        return [];
    }
}

/**
 * Get conversion funnel data
 */
export async function getConversionFunnel() {
    try {
        await dbConnect();

        // This would need event tracking data
        // For now, return mock data based on orders
        const totalOrders = await Order.countDocuments();
        const paidOrders = await Order.countDocuments({ status: "paid" });
        const pendingOrders = await Order.countDocuments({ status: "pending" });

        // Estimate funnel stages
        const websiteVisitors = totalOrders * 4; // Estimate 4x visitors per order
        const ticketPage = totalOrders * 3;
        const checkout = totalOrders;
        const purchase = paidOrders;

        return {
            websiteVisitors,
            ticketPage,
            checkout,
            purchase,
            conversionRate: totalOrders > 0 ? Math.round((paidOrders / websiteVisitors) * 100) : 0,
        };
    } catch (error) {
        console.error("Error fetching conversion funnel:", error);
        return {
            websiteVisitors: 0,
            ticketPage: 0,
            checkout: 0,
            purchase: 0,
            conversionRate: 0,
        };
    }
}

/**
 * Get orders for a specific user
 */
export async function getUserOrders(userId: string) {
    try {
        await dbConnect();
        const orders = await Order.find({ userId })
            .populate('eventId')
            .populate('items.ticketTypeId')
            .sort({ createdAt: -1 })
            .lean();

        return await Promise.all(orders.map(async (order: any) => {
            const event = order.eventId;
            // Handle location
            let location = 'TBD';
            if (event && event.location) {
                location = typeof event.location === 'string'
                    ? event.location
                    : (event.location.name || event.location.address || 'TBD');
            }

            // Fetch individual tickets for PDF generation (barcodes)
            const dbTickets = await Ticket.find({ orderId: order._id }).lean();
            const individualTickets = dbTickets.map((t: any) => {
                const matchingItem = order.items.find((item: any) =>
                    (item.ticketTypeId?._id?.toString() || item.ticketTypeId?.toString()) === t.ticketTypeId?.toString()
                );
                return {
                    id: t._id.toString(),
                    code: t.ticketCode,
                    type: matchingItem?.ticketTypeId?.name || 'General Admission',
                    status: t.status
                };
            });

            return {
                id: order._id.toString(),
                eventTitle: event?.title || 'Unknown Event',
                eventDate: event?.startDate ? new Date(event.startDate).toISOString() : new Date().toISOString(),
                eventLocation: location,
                eventImage: event?.imageUrl,
                tickets: order.items.map((item: any) => ({
                    id: item._id?.toString() || 'unknown',
                    type: item.ticketTypeId?.name || 'Ticket',
                    quantity: item.quantity,
                    price: item.priceAtPurchase
                })),
                individualTickets,
                totalAmount: order.totalAmount,
                status: order.status === 'paid' ? 'confirmed' : order.status,
                purchaseDate: order.createdAt ? new Date(order.createdAt).toISOString() : new Date().toISOString(),
                qrCode: order._id.toString()
            };
        }));
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
}
