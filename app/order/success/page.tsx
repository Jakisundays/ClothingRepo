"use client";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const OrderSuccess = () => {
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

  const getOrderById = async (orderId: string = "82696757426") => {
    try {
      const response = await fetch(`/api/payment/mp/checkOrder/${orderId}`);
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.error({ error });
    }
  };
  return (
    // <div>
    //   <p>Proved: {proved}</p>
    //   <p>Payment ID: {paymentId}</p>
    //   <p>Status: {status}</p>
    //   <p>External Reference: {externalReference}</p>
    //   <p>Payment Type: {paymentType}</p>
    //   <p>Merchant Order ID: {merchantOrderId}</p>
    //   <p>Preference ID: {preferenceId}</p>
    //   <p>Site ID: {siteId}</p>
    //   <p>Processing Mode: {processingMode}</p>
    //   <p>Merchant Account ID: {merchantAccountId}</p>
    //   <Button onClick={() => getOrderById("82696757426")}>GO</Button>
    // </div>
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-muted pb-4">
          <div className="flex items-center gap-4">
            <Package2Icon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Receipt</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Approved</Badge>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Customer Information</h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span>Sophia Anderson</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>
                  <Link
                    href="#"
                    className="text-blue-600 underline"
                    prefetch={false}
                  >
                    sophia@example.com
                  </Link>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>
                  <Link
                    href="#"
                    className="text-blue-600 underline"
                    prefetch={false}
                  >
                    +1 (234) 567-890
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <div className="mt-4 space-y-2">
              <div>Sophia Anderson</div>
              <div>1234 Main St.</div>
              <div>Anytown, CA 12345</div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center gap-4 rounded-lg border border-muted p-4">
              <div className="flex items-center gap-3">
                <Image
                  src="https://i.pinimg.com/564x/3c/0c/bf/3c0cbf27f171f72dd63cda7687ef7169.jpg"
                  alt="Product Image"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h3 className="text-base font-semibold">Aqua Filters</h3>
                  <p className="text-xs text-muted-foreground">Talle: SM</p>
                  <p className="text-xs text-muted-foreground">Cantidad: 3</p>
                </div>
              </div>
              <div className="text-right font-semibold">$49.00</div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-muted pt-4">
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold">$150.00</span>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          Thank you for your purchase!
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
