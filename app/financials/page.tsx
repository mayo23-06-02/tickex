"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FinancialsMetrics } from "@/components/financials/FinancialsMetrics";
import { RevenueAnalytics } from "@/components/financials/RevenueAnalytics";
import { PaymentMethods } from "@/components/financials/PaymentMethods";
import { TaxCompliance } from "@/components/financials/TaxCompliance";
import { PayoutSchedule } from "@/components/financials/PayoutSchedule";
import { InvoicesSidebar } from "@/components/financials/InvoicesSidebar";

export default function FinancialsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col xl:flex-row gap-6 items-start">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0 space-y-6 w-full">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0f172a]">Financials</h1>
                        <p className="text-[#64748b]">Complete financial management and revenue control</p>
                    </div>

                    <FinancialsMetrics />

                    <RevenueAnalytics />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PaymentMethods />
                        <TaxCompliance />
                    </div>

                    <PayoutSchedule />
                </div>

                {/* Right Sidebar */}
                <div className="w-full xl:w-[320px] flex-shrink-0 mt-6 xl:mt-0">
                    <div className="xl:sticky xl:top-24">
                        <InvoicesSidebar />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
