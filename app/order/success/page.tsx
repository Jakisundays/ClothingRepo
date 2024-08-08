"use client";

import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  postal_code: string;
  apartment: string;
}

interface Product {
  category_id: string | null;
  description: string;
  id: string;
  picture_url: string;
  quantity: string;
  title: string;
  unit_price: string;
}

interface OrderData {
  clientDetails: ClientDetails;
  products: Product[];
  totalAmountPaid: number;
  date_approved: string;
  status: string;
}

const OrderSuccess = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const response = await fetch(`/api/payment/mp/checkOrder/${paymentId}`);
        const data = await response.json();
        setOrderData(data);
        console.log({ data });
      } catch (error) {
        console.error({ error });
      }
    };

    getOrderById();
  }, [paymentId]);

  if (!orderData) {
    return (
      <div className="bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-muted pb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Skeleton className="h-6 w-32" />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-32" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Skeleton className="h-6 w-32" />
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-[80px_1fr_80px_80px] items-center gap-4 rounded-lg border border-muted p-4">
                <Skeleton className="h-20 w-20 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="grid grid-cols-[80px_1fr_80px_80px] items-center gap-4 rounded-lg border border-muted p-4">
                <Skeleton className="h-20 w-20 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-muted pt-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground h-full min-h-[calc(100vh-120px)]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-muted pb-4">
          <div className="flex items-center gap-4">
            <Package2Icon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Estado de la compra</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg">
              {orderData.status}
            </Badge>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Detalles</h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nombre:</span>
                <span>{`${orderData.clientDetails.first_name} ${orderData.clientDetails.last_name}`}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>
                  <Link
                    href={`mailto:${orderData.clientDetails.email}`}
                    className="text-blue-600 underline"
                    prefetch={false}
                  >
                    {orderData.clientDetails.email}
                  </Link>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Telefono:</span>
                <span>
                  <Link
                    href={`tel:${orderData.clientDetails.phone}`}
                    className="text-blue-600 underline"
                    prefetch={false}
                  >
                    {orderData.clientDetails.phone}
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Dirección de entrega</h2>
            <div className="mt-4 space-y-2">
              <div>{`${orderData.clientDetails.first_name} ${orderData.clientDetails.last_name}`}</div>
              <div>{orderData.clientDetails.address}</div>
              <div>{orderData.clientDetails.province}</div>
              <div>{orderData.clientDetails.postal_code}</div>
              <div>{orderData.clientDetails.apartment}</div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Información del pedido</h2>
          <div className="mt-4 space-y-4">
            {orderData.products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center gap-4 rounded-lg border border-muted p-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={product.picture_url}
                    alt="Product Image"
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="text-base font-semibold">
                      {product.description}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {product.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cantidad: {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right font-semibold">
                  ${product.unit_price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-muted pt-4">
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold">
              ${orderData.totalAmountPaid}
            </span>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          ¡Gracias por elegirnos!
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
