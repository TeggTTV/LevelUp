import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NavigationProvider } from '@/contexts/NavigationContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NavigationProvider>
            <Component {...pageProps} />
        </NavigationProvider>
    );
}
