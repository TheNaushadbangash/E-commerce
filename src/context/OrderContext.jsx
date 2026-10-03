import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-PK"),
      status: "Confirmed",
    };

    const updatedOrders = [newOrder, ...orders];

    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    return newOrder;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
