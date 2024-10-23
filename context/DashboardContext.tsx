"use client"

import { getUserByEmail } from "@/actions/user";
import { UserDocument } from "@/models/User";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

// interface DashboardContext {
//     sharedState: any,
//     setSharedState: React.Dispatch<React.SetStateAction<any>>
// }

export const DashboardContext = createContext<any>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {


    const [userData, setUserData] = useState<any>(null);
    const [activeShopIndex, setActiveShopIndex] = useState<any>(null);

    return (<DashboardContext.Provider value={{ userData, setUserData, activeShopIndex, setActiveShopIndex }}>
        {children}
    </DashboardContext.Provider>);
}
