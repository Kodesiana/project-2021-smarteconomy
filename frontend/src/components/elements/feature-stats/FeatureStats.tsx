import { Card, Group, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import React from 'react';
import styles from "./feature-stats.module.scss";

export const FeatureStats = ({ icon, title, value }: any) => {
    const theme = useMantineTheme();
    return (
        <Card withBorder mb={16} radius="md">
            <Group style={{ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : "white", color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7] }}>
                <ThemeIcon color="gray" variant="light" size="sm" p={2}>
                    {icon}
                </ThemeIcon>
                <Text fw="semibold"  >
                    {title}
                </Text>
            </Group>
            <Text fw="bold" fz="xl" ml={4} mt={8}>
                {value}
            </Text>
        </Card>
    );
};
