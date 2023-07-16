import DataServices from "@/services/data.service";
import { UserProps } from "@/services/interface";
import { Button, Group, Modal, PasswordInput, Select, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { Check, X } from "phosphor-react";
import { useCallback, useState } from 'react';
import { Field, Form } from "react-final-form";

type FormModalProps = {};

const defaultValues = {
  fullName: '',
  role: '',
  username: '',
  password: '',
};

const successNotification = ({ message }: { message: string; }) => {
  return showNotification({
    title: 'Berhasil!',
    message,
    color: 'green.4',
    radius: 8,
    icon: <Check />,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.gray[8],
        '&::before': { backgroundColor: theme.white },
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
};

const errorNotification = () => {
  return showNotification({
    title: 'Gagal!',
    message: 'Terjadi kesalahan, periksa kembali koneksi anda',
    color: 'red.4',
    radius: 8,
    icon: <X />,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.gray[8],
        '&::before': { backgroundColor: theme.white },
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
};

const FormModal = (props: FormModalProps) => {

  const [opened, setOpened] = useState(false);

  const [openedPassword, setOpenedPassword] = useState(false);

  const [values, setValues] = useState<UserProps>(defaultValues);

  const [hasEdit, setHasEdit] = useState(false);

  const queryClient = useQueryClient();

  const onSubmit = useCallback(async (e: UserProps) => {
    try {
      if (hasEdit) {
        await DataServices.putUsers(e);
        successNotification({ message: 'Mengubah Data Pengguna' });
      } else {
        await DataServices.postUsers(e);
        successNotification({ message: 'Menambah Data Pengguna' });
      }
      queryClient.invalidateQueries(['GetUsers']);
      setOpened(false);
    } catch (error) {
      errorNotification();
    }
  }, [hasEdit]);

  const onSubmitPassword = useCallback(async (e: UserProps) => {
    try {
      await DataServices.putUsersPassword({ ...e, id: values?.id });
      queryClient.invalidateQueries(['GetUsers']);
      setOpenedPassword(false);
      successNotification({ message: 'Mengubah Password' });
    } catch (error) {
      errorNotification();
    }
  }, [hasEdit, values]);

  const handleOpenModal = useCallback((data: UserProps) => {
    if (data?.id) {
      setHasEdit(true);
      setValues(data);
    } else {
      setHasEdit(false);
      setValues(defaultValues);
    }
    setOpened(true);
  }, []);

  const handleOpenModalPassword = useCallback((data: UserProps) => {
    setValues(data);
    setOpenedPassword(true);
  }, []);

  const handleDelete = ({ id }: { id: string; }) => openConfirmModal({
    title: 'Hapus',
    centered: true,
    children: (
      <Text size="sm">
        Yakin ingin menghapus data pengguna?
      </Text>
    ),
    labels: { confirm: 'Ya', cancel: "Tidak" },
    confirmProps: { color: 'red' },
    onCancel: () => console.log('Cancel'),
    onConfirm: async () => {
      try {
        await DataServices.deleteUsers({ id });
        queryClient.invalidateQueries(['GetUsers']);
        successNotification({ message: 'Menghapus Data' });
      } catch (error) {
        errorNotification();
      }

    },
  });

  const Component = (
    <Modal
      title={hasEdit ? 'Edit Pengguna' : 'Tambah Pengguna'}
      opened={opened}
      onClose={() => setOpened(false)}
      centered
    >
      <Form
        onSubmit={onSubmit}
        initialValues={values}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>

            <Field
              name="fullName"
              validate={(value) => !value ? 'Nama Tidak Boleh Kosong' : undefined}
              render={({ input, meta }) => (
                <TextInput
                  label="Nama"
                  placeholder="Masukan nama"
                  mt="md"
                  size="md"
                  required
                  error={(meta?.error && meta?.touched) && meta?.error}
                  {...input}
                />
              )}
            />

            <Field
              name="role"
              validate={(value) => !value ? 'Harap Memilih Role' : undefined}
              render={({ input, meta }) => (
                <Select
                  label="Role"
                  placeholder="Masukan Role"
                  mt="md"
                  size="md"
                  required
                  error={(meta?.error && meta?.touched) && meta?.error}
                  data={[
                    { label: 'Administrator', value: 'admin' },
                    { label: 'Warga', value: "warga" },
                    { label: 'Pakar', value: "pakar" },
                    { label: 'Aparat', value: "aparat" }]}
                  {...input}
                />
              )}
            />
            <Field
              name="username"
              validate={(value) => !value ? 'Username Tidak Boleh Kosong' : undefined}
              render={({ input, meta }) => (
                <TextInput
                  error={(meta?.error && meta?.touched) && meta?.error}
                  label="Username"
                  placeholder="Masukan Username"
                  mt="md"
                  size="md"
                  required
                  autoComplete="off"
                  disabled={hasEdit}
                  description="Username yang telah dibuat tidak dapat diubah"
                  {...input}
                  inputWrapperOrder={['label', 'input', 'description', 'error']}
                />
              )}
              disable={hasEdit}
            />
            {!hasEdit && <Field
              validate={(value) => !value ? 'Password Tidak Boleh Kosong' : undefined}
              name="password"
              render={({ input, meta }) => (
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  mt="md"
                  required
                  autoComplete="off"
                  size="md"
                  error={(meta?.error && meta?.touched) && meta?.error}
                  {...input}
                />
              )}
            />}
            <Group grow mt={24}>
              <Button variant="default" size="md" onClick={() => setOpened(false)}>Batal</Button>
              <Button size="md" type="submit" loading={submitting} disabled={pristine}>Simpan</Button>
            </Group>
          </form>
        )}
      />
    </Modal>
  );

  const ComponentPassword = (
    <Modal
      title="Edit Password"
      opened={openedPassword}
      onClose={() => setOpenedPassword(false)}
      centered
    >
      <Form
        onSubmit={onSubmitPassword}
        initialValues={{
          password: '',
          confirmPassword: ''
        }}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Field
              validate={(value) => !value ? 'Password Tidak Boleh Kosong' : undefined}
              name="password"
              render={({ input, meta }) => (
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  mt="md"
                  required
                  size="md"
                  error={(meta?.error && meta?.touched) && meta?.error}
                  {...input}
                />
              )}
            />
            <Field
              validate={(value, allValues: any) => {
                if (!value) {
                  return 'Ulangi Password Tidak Boleh Kosong';
                }
                if (allValues?.password !== value) {
                  return 'Password Tidak Sama';
                }
                return undefined;
              }}
              name="confirmPassword"

              render={({ input, meta }) => (
                <PasswordInput
                  label="Ulang Password"
                  placeholder="Ulangi password"
                  mt="md"
                  required
                  size="md"
                  error={(meta?.error && meta?.touched) && meta?.error}
                  {...input}
                />
              )}
            />
            <Group grow mt={24}>
              <Button variant="default" size="md" onClick={() => setOpenedPassword(false)}>Batal</Button>
              <Button size="md" type="submit" loading={submitting} disabled={pristine}>Simpan</Button>
            </Group>
          </form>
        )}
      />
    </Modal>
  );

  return {
    setOpened: handleOpenModal,
    handleOpenModalPassword,
    Component: <>
      {Component}
      {ComponentPassword}
    </>,
    handleDelete,

  };
};

export default FormModal;