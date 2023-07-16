import { ColorSchemeToggle } from "@/components/elements/color-scheme-switch/ColorSchemeSwitch";
import {
    Button,
    Image,
    Paper,
    ScrollArea,
    Title,
    useMantineTheme
} from "@mantine/core";
import { Outlet, useNavigate } from "@tanstack/react-location";
import { useCallback } from "react";
import styles from "./LandingShell.module.scss";


const LandingShell = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const handleLogin = useCallback(
        () => {
            navigate({ to: "/auth/login" });
        },
        [navigate],
    );

    return (
        <div className={styles.root} style={{ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0] }}>
            <div className={styles.header}>
                <Title className={styles.title} variant="gradient" align="center" gradient={{ from: "blue", to: "green" }} >
                    Smart Economy
                </Title>
                <Button onClick={handleLogin}>Login</Button>
            </div>
            <ScrollArea style={{height: "calc(100vh - 64px)"}}>
                <Outlet />
            </ScrollArea>
            <div className={styles.footer}>
                <ColorSchemeToggle />
            </div>
        </div>
    );
};

export default LandingShell;