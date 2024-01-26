import type { Metadata } from "next"
import { env } from "@/env.mjs"

import { UserProfile } from "@/components/auth/user-profile"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Cuenta",
  description: "Administra la configuración de tu cuenta",
}

export default function AccountPage() {
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Cuenta</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administra la configuración de tu cuenta
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="w-full overflow-hidden"
      >
        <UserProfile />
      </section>
    </Shell>
  )
}