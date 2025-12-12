import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MyOrdersClient from "@/components/orders/MyOrdersClient";
import { getUserOrders } from "@/app/actions/bookings";

export default async function MyOrdersPage() {
    const session = await auth();

    // In production, we require login to see orders
    if (!session?.user?.id) {
        redirect('/auth/customer/login?callbackUrl=/my-orders');
    }

    const orders = await getUserOrders(session.user.id);

    // Cast orders to any to avoid strict type checking mismatch between server/client interfaces for now
    return <MyOrdersClient initialOrders={orders as any} userName={session.user.name || undefined} />;
}
