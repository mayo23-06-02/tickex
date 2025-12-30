"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 20,
  },
  logo: {
    width: 140,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 10,
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 11,
    color: "#64748B",
  },
  value: {
    fontSize: 11,
    color: "#0F172A",
    fontWeight: "medium",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
    alignItems: "center",
  },
  colEvent: { flex: 3, fontSize: 10 },
  colQty: { flex: 1, fontSize: 10, textAlign: "center" },
  colPrice: { flex: 1, fontSize: 10, textAlign: "right" },
  colTotal: { flex: 1, fontSize: 10, textAlign: "right", fontWeight: "bold" },
  footer: {
    marginTop: 50,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "center",
  },
  barcode: {
    width: 200,
    height: 60,
    marginTop: 10,
  },
  totalSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
    marginBottom: 5,
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1DB954",
    marginTop: 10,
  },
});

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoicePDFProps {
  customer: {
    name: string;
    email: string;
  };
  order: {
    id: string;
    date: string;
    totalAmount: number;
    items: InvoiceItem[];
  };
  barcodeUrl: string;
  logoUrl?: string;
}

export const InvoicePDF = ({
  customer,
  order,
  barcodeUrl,
  logoUrl,
}: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {logoUrl ? (
          <Image src={logoUrl} style={styles.logo} />
        ) : (
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1DB954" }}>
            TICKEX
          </Text>
        )}
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.label}>No: {order.id}</Text>
          <Text style={styles.label}>Date: {order.date}</Text>
        </View>
      </View>

      {/* Addresses */}
      <View style={{ flexDirection: "row", gap: 40, marginBottom: 30 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>From</Text>
          <Text style={styles.value}>Tickex Eswatini</Text>
          <Text style={styles.label}>Mbabane, Eswatini</Text>
          <Text style={styles.label}>billing@tickex.com</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.value}>{customer.name}</Text>
          <Text style={styles.label}>{customer.email}</Text>
        </View>
      </View>

      {/* Order Summary Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colEvent, { fontWeight: "bold" }]}>
            Description
          </Text>
          <Text
            style={[styles.colQty, { fontWeight: "bold", textAlign: "center" }]}
          >
            Qty
          </Text>
          <Text
            style={[
              styles.colPrice,
              { fontWeight: "bold", textAlign: "right" },
            ]}
          >
            Unit Price
          </Text>
          <Text
            style={[
              styles.colTotal,
              { fontWeight: "bold", textAlign: "right" },
            ]}
          >
            Total
          </Text>
        </View>
        {order.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.colEvent}>{item.description}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>SZL {item.unitPrice.toFixed(2)}</Text>
            <Text style={styles.colTotal}>SZL {item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>SZL {order.totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.label}>Tax (0%)</Text>
          <Text style={styles.value}>SZL 0.00</Text>
        </View>
        <View style={[styles.totalRow, { marginTop: 10 }]}>
          <Text style={[styles.value, { fontWeight: "bold" }]}>Total</Text>
          <Text style={styles.grandTotal}>
            SZL {order.totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Barcode & Footer */}
      <View style={styles.footer}>
        <Text style={styles.sectionTitle}>Scan to Verify</Text>
        {barcodeUrl && <Image src={barcodeUrl} style={styles.barcode} />}
        <Text style={[styles.label, { marginTop: 15 }]}>
          Thank you for choosing Tickex!
        </Text>
        <Text style={[styles.label, { fontSize: 8, color: "#94A3B8" }]}>
          This is an electronically generated invoice and does not require a
          signature.
        </Text>
      </View>
    </Page>
  </Document>
);
