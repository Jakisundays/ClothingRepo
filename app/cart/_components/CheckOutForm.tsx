"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  firstName: z.string().nonempty({
    message: "First name is required.",
  }),
  lastName: z.string().nonempty({
    message: "Last name is required.",
  }),
  address: z.string().nonempty({
    message: "Address is required.",
  }),
  apartment: z.string().optional(),
  postalCode: z.string().min(5, {
    message: "Postal code must be at least 5 characters.",
  }),
  city: z.string().nonempty({
    message: "City is required.",
  }),
  province: z.string().nonempty({
    message: "Province is required.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

export default function CheckOutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data); // You can replace this with your actual submission logic
  };
  return (
    <div className="min-w-[40vw] w-full p-4 sm:p-6 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <Form {...form}>
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
            />
            <div className="flex items-center gap-2">
              <Checkbox id="subscribe" />
              <Label htmlFor="subscribe">Subscribe to our newsletter</Label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apartment">Apartment/Suite</Label>
            <Input id="apartment" placeholder="Apt 123" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" placeholder="12345" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="New York" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="province">Province</Label>
              <Input id="province" placeholder="NY" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>
      </Form>
    </div>
  );
}
