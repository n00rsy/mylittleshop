'use client'

import { emptyCart, loadCart } from "@/utils/cartUtils";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const ShopContext = createContext<any>(undefined);

export const ShopProvider = ({ children, initialShopData }: { children: ReactNode, initialShopData: any }) => {

    const [shopData, setShopData] = useState<any>(initialShopData);
    const [cartItems, setCartItems] = useState<any>([])

    useEffect(() => {
        console.log("shop context loading cart items...")
        loadCart(setCartItems)
        // emptyCart(setCartItems)
    }, [])

    return (<ShopContext.Provider value={{
        shopData, setShopData,
        cartItems, setCartItems
    }}>
        {children}
    </ShopContext.Provider>);
}
