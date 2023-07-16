import DataServices from '@/services/data.service';
import { Button, Group, NumberInput, Text, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'phosphor-react';
import { useCallback, useState } from 'react';

function InvestasiEditor({ context, id, innerProps }: ContextModalProps<{ id: string; kesiapanWarga: number; kerjaSama:number;infrastruktur:number;}>) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [kesiapanWarga, setKesiapanWarga] = useState(innerProps.kesiapanWarga);
    const [kerjaSama, setKerjaSama] = useState(innerProps.kerjaSama);
    const [infrastruktur, setInfrastruktur] = useState(innerProps.infrastruktur);

    const handleCloseModal = useCallback(() => context.closeModal(id), [context, id]);
    const handleSubmit = useCallback(async() => {
        setLoading(true)
        try {
            await DataServices.putInvestasi(innerProps.id, { kesiapanWarga, kerjaSama, infrastruktur });
            queryClient.invalidateQueries(['GetInvestasi'])
            showNotification({
                title: 'Berhasil',
                message: `Data berhasil disimpan`,
                icon: <Check />,
            });
            handleCloseModal();
        } catch (error) {
            showNotification({
                title: 'Gagal',
                color: 'red',
                message: `Data gagal disimpan`,
                icon: <X />,
            });
        }

        setLoading(false)
    }, [kesiapanWarga, kerjaSama, infrastruktur, loading, innerProps]);
    return (
        <>
            <NumberInput
                label="Kesiapan Warga"
                mt={16}
                required
                hideControls
                value={kesiapanWarga}
                onChange={(e) => setKesiapanWarga(e || 0)}
            />
            <NumberInput
                label="Kerja Sama"
                mt={16}
                required
                hideControls
                value={kerjaSama}
                onChange={(e) => setKerjaSama(e || 0)}
            />
            <NumberInput
                label="Infrastruktur"
                mt={16}
                required
                hideControls
                value={infrastruktur}
                onChange={(e) => setInfrastruktur(e || 0)}
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

export default InvestasiEditor;