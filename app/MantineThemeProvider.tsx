'use client'

import { ThemeContext, ThemeProvider } from "@/context/ThemeContext"
import { MantineProvider, createTheme } from "@mantine/core"
import { useState } from "react"

export default function MantineThemeProvider({ children }: {children: any}) {

    const [theme, setTheme] = useState(createTheme({primaryColor: 'green'}))
    return (
        <ThemeContext.Provider value={{theme, setTheme}} >
            <MantineProvider theme={theme}>
                {children}
            </MantineProvider>
        </ThemeContext.Provider>
    )
}
