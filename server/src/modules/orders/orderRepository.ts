import database from '../../services/db';

const createOrder = async (userId: number, total: number) => {
  const [result] = await database.query(
    'INSERT INTO orders (user_id, total) VALUES (?, ?)',
    [userId, total]
  );
  interface QueryResult {
    insertId: number;
  }
  return (result as QueryResult).insertId;
};

const addOrderItems = async (orderId: number, items: { plantId: number; quantity: number }[]) => {
  for (const item of items) {
    await database.query(
      'INSERT INTO order_items (order_id, plant_id, quantity) VALUES (?, ?, ?)',
      [orderId, item.plantId, item.quantity]
    );
  }
};

const findOrdersByUserId = async (userId: number) => {
  const [rows] = await database.query(
    `SELECT o.id, o.total, o.created_at, p.name, p.image, oi.quantity
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     JOIN plants p ON oi.plant_id = p.id
     WHERE o.user_id = ?
     ORDER BY o.created_at DESC`,
    [userId]
  );
  return rows;
};

export default { createOrder, addOrderItems, findOrdersByUserId };
