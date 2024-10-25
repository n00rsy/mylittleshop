'use client'

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const DashboardContext = createContext<any>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {


    const [userData, setUserData] = useState<any>(null);
    const [activeShopIndex, setActiveShopIndex] = useState<any>(null);
    const [isStripeOnboarded, setIsStripeOnboarded] = useState<any>(null)

    return (<DashboardContext.Provider value={{
        userData, setUserData,
        activeShopIndex, setActiveShopIndex,
        isStripeOnboarded, setIsStripeOnboarded
    }}>
        {children}
    </DashboardContext.Provider>);
}
