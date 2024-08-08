"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { CartLineItems } from "@/components/checkout/cart-line-items";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { initMercadoPago } from "@mercadopago/sdk-react";
import { EmptyCart } from "@/components/empty-cart";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/types";
import { formatCurrencyAR } from "@/lib/utils";

const provinciasDeArgentina = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Ciudad Autónoma de Buenos Aires",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "Tucumán",
] as const;

const formSchema = z.object({
  email: z.string().email({
    message: "Dirección de correo electrónico inválida.",
  }),
  firstName: z.string().nonempty({
    message: "El nombre es obligatorio.",
  }),
  lastName: z.string().nonempty({
    message: "El apellido es obligatorio.",
  }),
  address: z.string().nonempty({
    message: "La dirección es obligatoria.",
  }),
  apartment: z.string().optional(),
  postalCode: z.string().min(1, {
    message: "El código postal debe tener al menos 1 carácter.",
  }),
  province: z.enum(provinciasDeArgentina),
  phone: z.string().min(1, {
    message: "El número de teléfono debe tener al menos 10 caracteres.",
  }),
});

// const cartLocalStorage = ;
const CartPage = () => {
  initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY_MP!, {
    locale: "es-AR",
  });
  const [cart, setCart] = useState<CartLineItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      postalCode: "",
      province: "Buenos Aires",
      phone: "",
    },
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const itemCount = cart.reduce(
    (total: any, item: any) => total + Number(item.quantity),
    0
  );

  const cartTotal = cart.reduce(
    (total: any, item: any) => total + item.quantity * Number(item.price),
    0
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/payment/mp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, cart }),
      });
      const response = await res.json();
      // console.log({ response });
      window.location.href = response.init_point;
      // window.location.href = response.sandbox_init_point;
    } catch (error) {
      console.error({ error });
    }
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
      <div>
        <h1 className="text-2xl font-bold">Tu carrito</h1>
        <div className="mt-4 space-y-4">
          <CartLineItems isScrollable={false} items={cart} />
        </div>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Detalles del pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrencyAR(Number(cartTotal.toFixed(2)))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrencyAR(Number(cartTotal.toFixed(2)))}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <CardHeader>
                <CardTitle>Envío y Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="leomessi10@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Leo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Messi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl>
                          <Input placeholder="+54 911 1003-0245" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder="Qatar 22" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apartamento</FormLabel>
                        <FormControl>
                          <Input placeholder="4E" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codigo Postal</FormLabel>
                        <FormControl>
                          <Input placeholder="B7400" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provincia</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Buenos Aires" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {provinciasDeArgentina.map((provincia, i) => (
                              <SelectItem value={provincia} key={i}>
                                {provincia}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center items-center">
                <Button
                  id="wallet_container"
                  className="w-full"
                  // onClick={handleBuy}
                >
                  Confirmar Pedido
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
};

function MinusIcon(props: any) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

export default CartPage;
