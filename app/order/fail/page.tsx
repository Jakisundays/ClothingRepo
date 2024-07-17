'use client'
import { usePathname } from 'next/navigation'
const OrderFailure = () => {
    const pathname = usePathname()
    return <p>Current pathname: {pathname}</p>
}

export default OrderFailure;