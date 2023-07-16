import VillagesServices from '@/services/VillagesServices/VillagesServices';
import { Button, Group, Text, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'phosphor-react';
import { useCallback, useState } from 'react';

function VillageEditor({ context, id, innerProps }: ContextModalProps<{ desa: string; id?: string }>) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<string>(innerProps.desa);

    const handleCloseModal = useCallback(() => context.closeModal(id), [context, id]);

    const handleSubmit = useCallback(async() => {
        setLoading(true)
        try {
            if (!innerProps.id) {
                await VillagesServices.postVillages({ name: value });
            }else{
                await VillagesServices.putVillages({ name: value, id: innerProps.id });
            }
            queryClient.invalidateQueries(['Villages'])
            showNotification({
                title: 'Berhasil',
                message: `Data Berhasil ${!innerProps.id ? 'Ditambahkan' : 'Diubah'}`,
                icon: <Check />,
            });
            handleCloseModal();
        } catch (error) {
            showNotification({
                title: 'Gagal',
                color: 'red',
                message: `Data Gagal ${!innerProps.id ? 'Ditambahkan' : 'Diubah'}`,
                icon: <X />,
            });
        }

        setLoading(false)
    }, [value, loading, innerProps]);
    return (
        <>
            <TextInput
                label="Nama Desa"
                mt={16}
                required
                placeholder='Masukkan Nama Desa'
                value={value}
                onChange={(e) => setValue(e.target?.value ?? "")}
            />
            <Group position="apart" grow mt={16}>
                <Button fullWidth mt="md" variant="outline" onClick={handleCloseModal}>
                    Batal
                </Button>
                <Button fullWidth mt="md" onClick={handleSubmit} loading={loading}>
                    Simpan
                </Button>
            </Group>
        </>
    );
}

export default VillageEditor;