import { Anchor, Button, createStyles, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Link } from "@tanstack/react-location";
import clsx from "clsx";
import styles from "./RegisterModule.module.scss";
const useStyles = createStyles((theme) => ({
    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    logo: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
}));

const RegisterModule = () => {
    const { classes } = useStyles();
    return (
        <>
            <Title order={2} className={clsx(classes.title, styles.title)} align="center" mt="md" mb={50}>
                Register to Smart Economy
            </Title>

            <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
            <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
            <PasswordInput label="Confirm password" placeholder="Confirm your password" mt="md" size="md" />
            <Button fullWidth mt="xl" size="md">
                Register
            </Button>

            <Text align="center" mt="md">
                Already have an account?{" "}
                <Link to="/auth/login" replace>
                    <Anchor underline={false}>Login</Anchor>
                </Link>
            </Text>
        </>
    );
};

export default RegisterModule;