import { useId } from 'react';
import { ActionIcon, Button, Stack, Text } from "@mantine/core";
import { Link, } from "@tanstack/react-location";
import { Users, FirstAidKit, PhoneCall, Chats, User, TwitterLogo } from "phosphor-react";
import styles from '../DataModule.module.scss'


const tabs = [
    { link: "/data/persons", label: "Data Penduduk", icon: Users },
    { link: "/data/history-lab-covid", label: "Lab COVID", icon: FirstAidKit },
    { link: "/data/phone-activity", label: "Aktivitas Telepon", icon: PhoneCall },
    { link: "/data/sms-activity", label: "Aktivitas SMS", icon: Chats },
    { link: "/data/dpo", label: "DPO", icon: User },
    { link: "/data/tweets", label: "Twitter", icon: TwitterLogo },
];

export function DataNav() {
    const id = useId ();
    const links = tabs.map(({ label, icon: Icon, link }) => (
        <Link to={link} className={styles.button} key={`${label}-${id}`}>
            {({ isActive }) => 
                <Button
                    component="div"
                    leftIcon={
                        <ActionIcon variant="transparent" color={isActive ? 'blue.6' : 'gray.8'} >
                            <Icon size={16} weight="fill" />
                        </ActionIcon>
                    }
                    variant={isActive ? 'filled' : 'default'}
                    color="blue.0"
                    fullWidth
                    radius={8}
                    pl={16}
                    styles={{
                        root: {
                            border: 'none',
                            height: 44,
                        },
                        inner: {
                            justifyContent: 'flex-start',
                            
                        }
                    }}
                >
                    <Text size={12} color={isActive ? 'blue.6' : 'gray.8'} weight={600}>{label}</Text>
                </Button>
            }
        </Link>
    ));

    return (
        <Stack px={16} style={{ gap: 20 }}>
            {links}
        </Stack>
    );
}