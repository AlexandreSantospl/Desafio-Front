import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerOption {
    label: string;
    path: string;
    icon: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldisDrawerOpen => !oldisDrawerOpen)
    }, [])
    
    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions)
    }, [])

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions :handleSetDrawerOptions }}>

            {children}

        </DrawerContext.Provider>
    )
}

