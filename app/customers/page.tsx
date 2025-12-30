"use client";

import { useState, useEffect } from "react";
import { CustomerList, Customer } from "@/components/customers/CustomerList";
import { CustomerDetails } from "@/components/customer/CustomerDetails";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";
import { getCustomers } from "@/app/actions/customers";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCustomers();
        setCustomers(data);
        if (data.length > 0) {
          setSelectedCustomerId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load customers", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const selectedCustomer =
    customers.find((c) => c.id === selectedCustomerId) || customers[0];

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-140px)] overflow-hidden bg-white rounded-xl border border-[#e2e8f0]">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full text-slate-400">
            Loading customers...
          </div>
        ) : (
          <>
            <CustomerList
              customers={customers}
              selectedId={selectedCustomerId || ""}
              onSelect={(customer) => setSelectedCustomerId(customer.id)}
            />
            {selectedCustomer ? (
              <CustomerDetails customer={selectedCustomer} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                No customers found
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
