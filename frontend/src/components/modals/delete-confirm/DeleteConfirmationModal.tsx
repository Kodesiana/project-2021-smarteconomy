import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { WarningCircle } from 'phosphor-react';
import { useCallback, useState } from 'react';

const DeleteConfirmationModal = ({ context, id, innerProps }: ContextModalProps<{ name: string; entity: string; related?: string; onConfirm?: () => void }>) => {

    const [loading,setLoading] = useState(false);

    const { onConfirm } = innerProps;

    const _onConfirm = useCallback(() =>{
        setLoading(true);
        onConfirm && onConfirm();
        context.closeModal(id)
        setLoading(false);
    },[onConfirm, context, id]);

    return (
        <>
            <Stack>
                <Text ta="center" fw={700} size="md" fz={20}>{innerProps.name}</Text>
                <Text ta="center" size="sm" c="dimmed">Apakah anda yakin ingin menghapus {innerProps.entity}?</Text>
            </Stack>
            {
                innerProps.related && <Alert color="red" variant="light" mt={16} title="Peringatan" icon={<WarningCircle />}>
                    Semua data {innerProps.related} yang terkait dengan {innerProps.entity} ini juga akan terhapus.
                </Alert>
            }
            <Group mt={16} position="apart" grow>
                <Button fullWidth mt="md" variant="outline" onClick={() => context.closeModal(id)}>
                    Batal
                </Button>
                <Button fullWidth mt="md" onClick={_onConfirm} loading={loading}>
                    Hapus
                </Button>
            </Group>
        </>
    );
};

export default DeleteConfirmationModal;