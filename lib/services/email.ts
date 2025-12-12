import { Resend } from 'resend';
import { TicketEmail } from '@/components/emails/TicketEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail(to: string, customerName: string, eventName: string, orderId: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY missing, skipping email send.');
        return;
    }

    const ticketLink = `${process.env.NEXT_PUBLIC_APP_URL}/tickets/${orderId}`;

    try {
        const data = await resend.emails.send({
            from: 'TickEx <tickets@tickex.com>', // Requires verified domain
            to: [to],
            subject: `Your Tickets for ${eventName}`,
            react: TicketEmail({ customerName, eventName, ticketLink }) as any,
        });
        return data;
    } catch (error) {
        console.error('Email send error:', error);
    }
}
