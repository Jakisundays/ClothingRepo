import db from ".";
import { NewOrder, NewPayment, orders, payments } from "./schema";

export const insertPayment = async (payment: NewPayment) => {
  return db.insert(payments).values(payment).returning();
};

export const insertOrder = async (order: NewOrder) => {
  return db.insert(orders).values(order).returning();
};

