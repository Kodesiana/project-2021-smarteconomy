import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from '@mantine/notifications';
import { Outlet, Router } from "@tanstack/react-location";
import { QueryClientProvider } from "@tanstack/react-query";
import modals from "./components/modals";
import AuthMiddleware from "./hooks/useAuth";
import { queryClient } from "./queryClient";
import { LocationInstance, Routes } from "./routes";

function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    useHotkeys([["mod+J", () => toggleColorScheme()]]);

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    theme={{
                        colorScheme,
                        primaryColor: 'green',
                        primaryShade: 6
                    }}
                    withGlobalStyles
                    withNormalizeCSS
                    withCSSVariables
                >
                    <Router location={LocationInstance} routes={Routes}>
                        <NotificationsProvider containerWidth={600} limit={5} position="top-center">
                            <ModalsProvider 
                                modalProps={{ 
                                    centered: true, 
                                    styles: {
                                        title: {
                                            fontFamily: 'Open Sans',
                                            fontSize: 22,
                                            fontWeight: 700
                                        }
                                    } }} 
                                modals={modals}>
                                <AuthMiddleware>
                                    <Outlet />
                                </AuthMiddleware>
                            </ModalsProvider>
                        </NotificationsProvider>
                    </Router>
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    );
}

export default App;
