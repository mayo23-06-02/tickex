"use client";

import { useState } from "react";
import { CustomerList, mockCustomers } from "@/components/customers/CustomerList";
import { CustomerDetails } from "@/components/customers/CustomerDetails";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CustomersPage() {
    const [selectedCustomerId, setSelectedCustomerId] = useState(mockCustomers[0].id);

    const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId) || mockCustomers[0];

    return (
        <DashboardLayout>
            <div className="flex h-[calc(100vh-140px)] overflow-hidden bg-white rounded-xl border border-[#e2e8f0]">
                <CustomerList
                    selectedId={selectedCustomerId}
                    onSelect={(customer) => setSelectedCustomerId(customer.id)}
                />
                <CustomerDetails customer={selectedCustomer} />
            </div>
        </DashboardLayout>
    );
}
