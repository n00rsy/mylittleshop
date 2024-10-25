'use client'

import React, { ReactNode, createContext, useState } from "react";

export const DashboardContext = createContext<any>(undefined);

export const DashboardProvider = ({ children, initialUserData, initialIsStripeOnboarded }: { children: ReactNode, initialUserData: any, initialIsStripeOnboarded: any }) => {

    const [userData, setUserData] = useState<any>(initialUserData);
    const [activeShopIndex, setActiveShopIndex] = useState<any>(null);
    const [isStripeOnboarded, setIsStripeOnboarded] = useState<any>(initialIsStripeOnboarded)

    return (<DashboardContext.Provider value={{
        userData, setUserData,
        activeShopIndex, setActiveShopIndex,
        isStripeOnboarded, setIsStripeOnboarded
    }}>
        {children}
    </DashboardContext.Provider>);
}
