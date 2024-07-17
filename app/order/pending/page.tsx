'use client'
import { usePathname } from 'next/navigation'
const OrderPending = () => {
    const pathname = usePathname()
    return <p>Current pathname: {pathname}</p>
}

export default OrderPending;