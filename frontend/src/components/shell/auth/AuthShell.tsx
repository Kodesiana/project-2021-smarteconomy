import {
    Image,
    Paper,
    Title,
    useMantineTheme
} from "@mantine/core";
import { Outlet } from "@tanstack/react-location";
import styles from "./AuthShell.module.scss";
import loginImage from "@/assets/login.webp";


const AuthShell = () => {
    const theme = useMantineTheme();
    return (
        <div className={styles.wrapper} >
            <div className={styles.image}>
                <Image fit="cover" />
            </div>
            <div className={styles.form} style={{ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white }}>
                <Title className={styles.title} variant="gradient" align="center" gradient={{ from: "green", to: "lime" }} >
                    Smart Economy
                </Title>
                <Paper className={styles.center} shadow="xs" radius="md" p="xl" style={{ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white }} >
                    <Outlet />
                </Paper>
            </div>

        </div>
    );
};

export default AuthShell;