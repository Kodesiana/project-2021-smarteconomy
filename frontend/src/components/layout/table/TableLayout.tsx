import { Card, Container, useMantineTheme } from "@mantine/core";
import { PropsWithChildren } from "react";
import styles from "./TableLayout.module.scss";
const TableLayout = ({ children }: PropsWithChildren) => {
    return (
        <Container size="lg"  >
            <Card withBorder radius="md" className={styles.card}>
                {children}
            </Card>
        </Container>
    );
};

TableLayout.Header = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.header}>
            {children}
        </div>
    );
};

TableLayout.Content = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.content}>
            {children}
        </div>
    );
};

TableLayout.Footer = ({ children }: PropsWithChildren) => {
    const theme = useMantineTheme();
    return (
        <div className={styles.footer} style={{ color: theme.colorScheme === "dark" ? theme.colors.dark[6] : "white", }}>
            {children}
        </div>
    );
};



export default TableLayout;