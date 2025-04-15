import type { Response } from "express";
import orderRepository from "./orderRepository";
import type { Request } from "express";

interface CustomRequest extends Request {
  user?: { id: string; email: string };
}

const placeOrder = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  const { cartItems, total } = req.body;

  if (!user) {
    res.sendStatus(401);
    return;
  }

  try {
    const orderId = await orderRepository.createOrder(Number(user.id), total);
    await orderRepository.addOrderItems(orderId, cartItems);
    res.status(201).json({ message: "Commande enregistrée" });
  } catch (err) {
    console.error("Erreur placeOrder :",err);
    res.sendStatus(500);
  }
};

const getOrders = async (req: CustomRequest, res: Response): Promise<void> => {
  const user = req.user;

  if (!user) {
    res.sendStatus(401);
    return;
  }

  try {
    const orders = await orderRepository.findOrdersByUserId(Number(user.id));
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default { placeOrder, getOrders };
