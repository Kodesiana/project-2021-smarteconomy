import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");

    return {
        navbar: {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        },

        title: {
            textTransform: "uppercase",
            letterSpacing: -0.25,
        },

        link: { 

            "&:hover": {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === "dark" ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === "dark" ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            "&, &:hover": {
                backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
                },
            },
        },

        footer: {
            borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
            paddingTop: theme.spacing.md,
        },
    };
});
