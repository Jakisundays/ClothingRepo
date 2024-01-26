import type { FooterItem, MainNavItem } from "@/types";

import { productCategories } from "@/config/products";
import { slugify } from "@/lib/utils";

export type SiteConfig = typeof siteConfig;

const links = {
  instagram: "https://www.instagram.com/",
};

export const siteConfig = {
  name: "Alter Ego",
  description:
    "An open source e-commerce Alter Ego build with everything new in Next.js.",
  url: "https://Alter Ego.sadmn.com",
  ogImage: "https://Alter Ego.sadmn.com/opengraph-image.png",
  links,
  mainNav: [
    // {
    //   title: "Lobby",
    //   items: [
    //     {
    //       title: "Products",
    //       href: "/products",
    //       description: "All the products we have to offer.",
    //       items: [],
    //     },
    //   ],
    // },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "All",
          href: `/categories/${slugify(category.title)}`,
          description: `Todo lo ${category.title}.`,
          items: [],
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
          description: subcategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies MainNavItem[],
  footerNav: [] satisfies FooterItem[],
};
