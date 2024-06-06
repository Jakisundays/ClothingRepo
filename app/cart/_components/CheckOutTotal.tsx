import { CartLineItems } from "@/components/checkout/cart-line-items";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { CartLineItemWithSize } from "@/types";

interface CheckOutTotalProps {
  cart: CartLineItemWithSize[] | [];
}

const CheckOutTotal = ({ cart }: CheckOutTotalProps) => {
  const itemCount = cart.reduce(
    (total: any, item: any) => total + Number(item.quantity),
    0
  );

  const cartTotal = cart.reduce(
    (total: any, item: any) => total + item.quantity * Number(item.price),
    0
  );
  return (
    <div className="min-w-[40vw] w-full h-full p-4 sm:p-6 md:p-8 lg:p-12">
      <CartLineItems items={cart} className="scroll-smooth overflow-y-auto" />
      <div className="">
        <Separator />
        <div className="text-md">
          <div className="flex">
            <span className="flex-1">Shipping</span>
            <span>Free</span>
          </div>
          {/* <div className="flex">
            <span className="flex-1">Taxes</span>
            <span>Calculated at checkout</span>
          </div> */}
          <div className="flex">
            <span className="flex-1">Total</span>
            <span>{formatPrice(cartTotal.toFixed(2))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutTotal;
