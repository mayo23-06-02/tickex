import * as React from 'react';

interface TicketEmailProps {
    customerName: string;
    eventName: string;
    ticketLink: string;
}

// Email-safe colors (emails don't support CSS variables, so we use the actual values)
const emailColors = {
    foreground: '#333333',
    primary: '#7A3FFF',
    mutedForeground: '#64748b',
    white: '#ffffff',
};

export const TicketEmail: React.FC<Readonly<TicketEmailProps>> = ({
    customerName,
    eventName,
    ticketLink,
}) => (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px', color: emailColors.foreground }}>
        <div style={{ marginBottom: '20px' }}>
            <h1 style={{ color: emailColors.primary }}>Tickex</h1>
        </div>
        <h2>Here are your tickets, {customerName}!</h2>
        <p>
            Thank you for purchasing tickets for <strong>{eventName}</strong>.
        </p>
        <p>
            You can access your tickets and QR codes by clicking the button below:
        </p>
        <a
            href={ticketLink}
            style={{
                display: 'inline-block',
                background: `linear-gradient(to right, ${emailColors.primary}, #C86DD7)`,
                color: emailColors.white,
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                marginTop: '10px',
                marginBottom: '20px'
            }}
        >
            View My Tickets
        </a>
        <p style={{ fontSize: '12px', color: emailColors.mutedForeground }}>
            If you have any trouble accessing your tickets, please contact us support.
        </p>
    </div>
);
