import { Navbar as BaseNavbar, Burger, Collapse, Divider, Drawer, Flex, Footer, Group, Popover, ScrollArea, Stack, Tooltip, UnstyledButton, createStyles } from "@mantine/core";
import { ReactNode, useMemo } from "react";

import { ColorSchemeToggle } from "@/components/elements/color-scheme-switch/ColorSchemeSwitch";
import { useDisclosure, useLocalStorage, useMediaQuery, useToggle } from "@mantine/hooks";
import { Link } from "@tanstack/react-location";
import { Buildings, CaretDoubleLeft, CaretDoubleRight, Database, HouseSimple, ListNumbers, MagicWand, TreeStructure, Users } from "phosphor-react";
import styles from "./Navbar.module.scss";

export type ProfileInfo = {
    full_name: string;
    id: string;
    role: string;
    username: string;
};

const useStyles = createStyles((theme) => ({
    link: {
        "&:hover": {
            opacity: 1,
            color: "white",
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.green[5] : theme.colors.green[6],
        },
    },

    active: {
        opacity: 1,
        color: "white",
        "&, &:hover": {
            color: "white",
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.green[5] : theme.colors.green[6],
        },
    },
}));

interface NavbarLinkProps {
    icon?: ((active: boolean) => ReactNode);
    label: string;
    active?: boolean;
    visible?: boolean;
    isExpanded?: boolean;
    withExpander?: boolean;
    links?: NavbarLinkProps[];
    href?: string;
    onClick?(): void;
    level?: number;
}

function NavbarLink({ icon, label, active, isExpanded, links, onClick, level, withExpander }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    const [opened, toggleOpen] = useToggle();
    const items = (expanded: boolean) => links?.map((item) => (
        <Link
            to={`/${item.href}`} key={item.href}
        >
            {({ isActive }) => (
                <NavbarLink
                    {...item}
                    level={(level ?? 0) + 1}
                    key={item.label}
                    active={isActive}
                    isExpanded={expanded}
                />
            )}
        </Link>
    ));
    const Button = <UnstyledButton name={label} className={cx(classes.link, { [classes.active]: active }, styles[`level-${level}`], styles.link, { [styles.active]: active })}
        onClick={() => (links && links.length > 0) ? toggleOpen() : onClick?.()}
    >
        <Group>
            {icon?.(active ?? false)}
            {isExpanded && <span className={styles.label}>{label}</span>}
        </Group>
    </UnstyledButton>;
    return (isExpanded && withExpander) ? (
        <>
            <Tooltip label={label} position="right" withinPortal transitionDuration={0}>

                {Button}
            </Tooltip>
            {
                links && links.length > 0 && (

                    <Collapse in={opened}>
                        <Stack spacing="xs">
                            {items(isExpanded)}
                        </Stack>
                    </Collapse>
                )
            }
        </>
    ) : (
        <Popover opened={opened} onClose={() => toggleOpen(false)} withinPortal position={withExpander ? "right-start" : "top-start"}  >
            <Popover.Target>
                {Button}
            </Popover.Target>
            <Popover.Dropdown>
                {items(true)}
            </Popover.Dropdown>
        </Popover>
    );
}

const navList: (role: string) => NavbarLinkProps[] = (role: string) => {
    return ([
        { visible: true, icon: (active: boolean) => <HouseSimple size={24} weight={active ? "fill" : "regular"} />, label: "Dashboard", href: "./app/" },
        {
            visible: true,
            icon: (active: boolean) => <Database size={24} weight={active ? "fill" : "regular"} />, label: "Pangkalan Data", links: [
                {
                    visible: ["admin", "warga"].includes(role), label: "Desa", href: "./app/data/desa"
                },
                {
                    visible: ["admin", "pakar"].includes(role), label: "Kuesioner", href: "./app/data/kuesioner"
                },
                {
                    visible: ["admin", "aparat"].includes(role), label: "Kerja Sama", href: "./app/data/kerjasama"
                },
                {
                    visible: ["admin", "aparat"].includes(role), label: "Infrastruktur", href: "./app/data/infrastruktur"
                },
                {
                    visible: ["admin", "aparat"].includes(role), label: "Investasi", href: "./app/data/investasi"
                },
            ]
        },
        { visible: true, icon: (active: boolean) => <TreeStructure size={24} weight={active ? "fill" : "regular"} />, label: "Citizen Science", href: "./app/citizen" },
        { visible: true, icon: (active: boolean) => <ListNumbers size={24} weight={active ? "fill" : "regular"} />, label: "Kerja Sama", href: "./app/weights" },
        {
            visible: ["admin", "aparat"].includes(role),
            icon: (active: boolean) => <Buildings size={24} weight={active ? "fill" : "regular"} />, label: "Infrastruktur", href: "./app/infra"
        },
        {
            visible: true,
            icon: (active: boolean) => <MagicWand size={24} weight={active ? "fill" : "regular"} />, label: "Rekomendasi",
            links: [
                { label: "Model Statistik", href: "./app/recomendation/model-stats" },
                { label: "Model IME", href: "./app/recomendation/model-ime" },
            ]
        },
        { visible: true, icon: (active: boolean) => <Users size={24} weight={active ? "fill" : "regular"} />, label: "Pengguna", href: "./app/users" },
        // { icon: (active: boolean) => <Info size={24} weight={active ? "fill" : "regular"} />, label: "Tentang", href: "./app/about" },
    ]);
};

export function Navbar() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [expanded, toggleExpand] = useToggle([true, false]);
    const profile: ProfileInfo = localStorage.getItem('profile') && JSON?.parse(localStorage.getItem('profile') ?? "{ 'role': 'warga' }");

    const links = useMemo(() => navList(profile?.role ?? "").filter((n) => n.visible !== undefined && n.visible).map((item) => (
        NavLinkItem(item, expanded, true)
    )), [profile, expanded]);

    return (
        <>
            {
                !isMobile && (
                    <BaseNavbar width={{ base: expanded ? 220 : 80 }} p="xs" >
                        <BaseNavbar.Section mx="-xs" px="xs" my={8}>
                            <NavbarLink
                                icon={() =>
                                    expanded ?
                                        <CaretDoubleLeft size={24} /> :
                                        <CaretDoubleRight size={24} />
                                }
                                label={"Sembunyikan"}
                                onClick={() => toggleExpand()}
                                isExpanded={expanded}
                            />
                        </BaseNavbar.Section>
                        <BaseNavbar.Section grow mx="-xs" px="xs" component={ScrollArea}>
                            {links}
                        </BaseNavbar.Section>
                        <BaseNavbar.Section>
                            <ColorSchemeToggle />
                            {/* <Stack justify="center" spacing={0}>
                    <Link
                        to="/app/settings"
                    >
                        {({ isActive }) => (
                            <NavbarLink
                                active={isActive}
                                isExpanded={expanded}
                                label="Settings"
                                icon={(active) => <Gear size={24} weight={active ? "fill" : "regular"} />}
                            />
                        )}
                    </Link>
                </Stack> */}
                        </BaseNavbar.Section>
                    </BaseNavbar>)
            }
        </>)
        ;
}

export function BottomNavbar() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [opened, { open, close }] = useDisclosure(false);
    const profile: ProfileInfo = localStorage.getItem('profile') && JSON?.parse(localStorage.getItem('profile') ?? "{ 'role': 'warga' }");

    const links = useMemo(() => navList(profile?.role ?? "").filter((n) => n.visible !== undefined && n.visible).map((item) => (
        NavLinkItem(item, true, true)
    )), [profile, true]);

    return (
        <>
            {
                isMobile && (
                    <Footer height={80} >
                        <Flex px={16} py={20} m={0} h="140">
                            <Burger opened={opened} onClick={open} />
                            <Drawer opened={opened} onClose={close}>
                                <Stack spacing={6} p={16}>
                                    {links}
                                    </Stack>
                            </Drawer>
                        </Flex>
                    </Footer>
                )
            }
        </>);
}

function NavLinkItem(item: NavbarLinkProps, expanded: boolean, expander: boolean): JSX.Element {
    if (!item.href) {
        return <NavbarLink {...item} level={1} key={item.label} isExpanded={expanded} withExpander={expander} />;
    }
    return <Link
        to={item?.href ? `/${item?.href}` : "#"} key={item.href}
    >
        {({ isActive }) => (
            <NavbarLink
                {...item}
                level={1}
                key={item.label}
                active={isActive}
                isExpanded={expanded} />
        )}
    </Link>;
}
