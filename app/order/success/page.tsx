"use client";
import { usePathname, useSearchParams } from "next/navigation";
const OrderSuccess = () => {
//   const pathname = usePathname();
  const searchParams = useSearchParams();
  const proved = searchParams.get("proved");
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");
  const paymentType = searchParams.get("payment_type");
  const merchantOrderId = searchParams.get("merchant_order_id");
  const preferenceId = searchParams.get("preference_id");
  const siteId = searchParams.get("site_id");
  const processingMode = searchParams.get("processing_mode");
  const merchantAccountId = searchParams.get("merchant_account_id");
  return (
    <div>
      <p>Proved: {proved}</p>
      <p>Payment ID: {paymentId}</p>
      <p>Status: {status}</p>
      <p>External Reference: {externalReference}</p>
      <p>Payment Type: {paymentType}</p>
      <p>Merchant Order ID: {merchantOrderId}</p>
      <p>Preference ID: {preferenceId}</p>
      <p>Site ID: {siteId}</p>
      <p>Processing Mode: {processingMode}</p>
      <p>Merchant Account ID: {merchantAccountId}</p>
    </div>
  );
};

export default OrderSuccess;
