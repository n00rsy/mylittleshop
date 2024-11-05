'use client'

import React, { ReactNode, createContext, useState } from "react";

export const ThemeContext = createContext<any>(undefined);

export const ThemeProvider = ({ children, initialThemeData }: { children: ReactNode, initialThemeData: any }) => {

    const [themeData, setThemeData] = useState<any>(initialThemeData);

    return (<ThemeContext.Provider value={{
        themeData, setThemeData
    }}>
        {children}
    </ThemeContext.Provider>);
}
