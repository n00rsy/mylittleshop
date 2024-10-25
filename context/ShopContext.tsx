'use client'

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const ShopContext = createContext<any>(undefined);

export const ShopProvider = ({ children, initialShopData }: { children: ReactNode, initialShopData: any }) => {

    const [shopData, setShopData] = useState<any>(initialShopData);

    return (<ShopContext.Provider value={{
        shopData, setShopData
    }}>
        {children}
    </ShopContext.Provider>);
}
