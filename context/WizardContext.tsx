'use client'

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const WizardContext = createContext<any>(undefined);

export const WizardProvider = ({ children, initialUserData }: { children: ReactNode, initialUserData: any }) => {

    const [userData, setUserData] = useState<any>(initialUserData);

    return (<WizardContext.Provider value={{
        userData, setUserData
    }}>
        {children}
    </WizardContext.Provider>);
}
