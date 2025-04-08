import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

// Define navigation paths for each page
export const navigationPaths: Record<string, string> = {
    '/calendar': '/dashboard',
    '/profile': '/dashboard',
    '/settings': '/dashboard',
    // Add more routes as needed
};

type NavigationContextType = {
    canGoBack: boolean;
    goBack: () => void;
    getBackPath: (currentPath: string) => string;
};

const NavigationContext = createContext<NavigationContextType>({
    canGoBack: false,
    goBack: () => { },
    getBackPath: () => '/',
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
    const [currentPath, setCurrentPath] = useState<string>('');

    useEffect(() => {
        // Update history when route changes
        if (router.asPath !== currentPath) {
            if (currentPath) {
                setNavigationHistory(prev => [...prev, currentPath]);
            }
            setCurrentPath(router.asPath);
        }
    }, [router.asPath, currentPath]);

    const canGoBack = !(router.pathname == '/' || router.pathname == '/dashboard');

    const goBack = () => {
        const backPath = getBackPath(router.pathname);
        router.push(backPath);
    };

    const getBackPath = (path: string) => {
        // Use the predefined paths first
        if (path in navigationPaths) {
            return navigationPaths[path];
        }

        // Fall back to history or root
        return navigationHistory.length > 0
            ? navigationHistory[navigationHistory.length - 1]
            : '/';
    };

    return (
        <NavigationContext.Provider value={{ canGoBack, goBack, getBackPath }}>
            {children}
        </NavigationContext.Provider>
    );
};
