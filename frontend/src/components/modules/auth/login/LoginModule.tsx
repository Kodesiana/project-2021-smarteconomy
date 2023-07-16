import { LoginRequest } from "@/services/auth.interface";
import AuthServices from "@/services/auth.service";
import { Button, Checkbox, PasswordInput, TextInput, Title, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Form, Field } from 'react-final-form';

const LoginModule = () => {
    const onSubmit = async (values: LoginRequest) => {
        try {
            const { data: { token: accessToken, user: data } } = await AuthServices.postLogin(values);

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('profile', JSON.stringify(data));
            window.dispatchEvent(new Event("storage"));
        } catch (error) {
            showNotification({
                title: 'Login Gagal',
                message: 'Username atau Password Salah',
                color: 'red',
            });
        }
    };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                username: '',
                password: '',
            }}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                    <Title order={3} mb="md">Masuk</Title>
                    <Field
                        name="username"
                        render={({ input }) => (
                            <TextInput
                                label="Username"
                                placeholder="Username"
                                size="md"
                                required
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name="password"
                        render={({ input }) => (
                            <PasswordInput
                                label="Password"
                                placeholder="Password"
                                mt="md"
                                size="md"
                                required
                                {...input}
                            />
                        )}
                    />
                    <Button fullWidth mt="xl" size="md" type="submit" loading={submitting}>
                        Masuk
                    </Button>
                </form>
            )}
        />
    );
};

export default LoginModule;