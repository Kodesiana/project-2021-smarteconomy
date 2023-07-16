
import HeaderAvatar from "@/components/elements/header-avatar/HeaderAvatar";
import { ActionIcon, Anchor, AppShell, Breadcrumbs, Footer, Header, ScrollArea, Text, Title, Transition, useMantineTheme } from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { Link, Outlet, useMatches, useNavigate } from "@tanstack/react-location";
import { ArrowUp } from "phosphor-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronRight } from "react-feather";
import { BottomNavbar, Navbar } from "../../modules/main/navbar/NavbarModule";
import styles from "./MainShell.module.scss";

const MainShell = () => {
    const theme = useMantineTheme();
    const viewport = useRef<HTMLDivElement>(null);
    const [{ y }, onScrollPositionChange] = useDebouncedState({ x: 0, y: 0 }, 200);
    const scrollToTop = useCallback(() => {
        viewport?.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, [viewport]);
    const matches = useMatches();
    const navigate = useNavigate();
    const backLinks = useMemo(() => {
        return matches.filter((match) => match.route.meta?.backLink).length > 0;
    }, [matches]);

    const bread = useMemo(() => {
        return matches
            .filter((match) => match.route.meta?.breadcrumb)
            .map((match: any) => (
                <Link
                    key={match.pathname}
                    to={match.pathname}>
                    <Text tt="capitalize" variant="text" style={{ marginTop: 6, color: theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7] }} size={20} >
                        {match?.route?.meta?.breadcrumb(match.params)}
                    </Text>
                </Link>
            ));
    }, [matches]);

    return (
        <AppShell
            padding={0}
            header={<Header height={60} >
                <div className={styles.header}>
                    <Breadcrumbs separator={<ChevronRight size={20} style={{ marginTop: 6, color: theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7] }} />} >
                        <Title className={styles.title} variant="gradient" gradient={{ from: "green", to: "cyan" }} >
                            Smart Economy
                        </Title>

                        {bread}

                    </Breadcrumbs>

                    <HeaderAvatar />
                </div>
            </Header>}
            navbar={
                <Navbar />
            }
            footer={
                <BottomNavbar/>
            }
            style={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1] }}
        >
            <ScrollArea style={{ height: "calc(100vh - var(--mantine-header-height))" }} onScrollPositionChange={onScrollPositionChange} viewportRef={viewport}>
                <Outlet />
                <Transition transition="slide-up" mounted={y > 100}>
                    {(transitionStyles) => (
                        <ActionIcon
                            style={{ ...transitionStyles, right: 24, bottom: 24, position: 'absolute' }}
                            onClick={scrollToTop}
                            color="green"
                            variant="filled"
                            radius="xl"
                            size={48}
                        >
                            <ArrowUp weight="bold" size={24} />
                        </ActionIcon>
                    )}
                </Transition>
            </ScrollArea>
        </AppShell>
    );
};

export default MainShell;