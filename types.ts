import type { Product } from "@/db/schema";
import { type FileWithPath } from "react-dropzone";
import { type z } from "zod";

import type {
  cartLineItemSchema,
  checkoutItemSchema,
} from "@/lib/validations/cart";
import type { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface ProductInventory {
  size: string;
  quantity: number;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export type CheckoutItem = z.infer<typeof checkoutItemSchema>;

export type CartLineItem = z.infer<typeof cartLineItemSchema>;
