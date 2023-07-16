import CoopServices from '@/services/CoopService/CoopServices';
import { useGetVillagesDropList } from '@/services/VillagesServices/VillagesQueries';
import { Button, FileInput, Group, Select, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { Check, Upload, X } from 'phosphor-react';
import { useCallback, useState } from 'react';

const CooperationEditorModal = ({ context, id, innerProps }: ContextModalProps<{ desa: string; }>) => {
    
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    const [expertName, setExpertName] = useState('');

    const [villageId, setVillageId] = useState('');

    const [octetValue, setValueOctet] = useState<File | null>(null);

    const { data = [] } = useGetVillagesDropList();

    const handleSubmit = useCallback(async() => {
        if (octetValue) {
            setLoading(true)
            try {
                await CoopServices.postCooperation({ expertName: expertName, data: octetValue, villageId });
                queryClient.invalidateQueries(['getCoop']);
                showNotification({
                    title: 'Berhasil',
                    message: 'Data Berhasil Ditambahkan',
                    color: 'green',
                    icon: <Check />,
                });
                context.closeModal(id)
            } catch (error) {
                showNotification({
                    title: 'Gagal',
                    message: 'Data Gagal Ditambahkan',
                    color: 'red',
                    icon: <X />,
                });
            }
        }
        setLoading(false)
    }, [expertName, octetValue, id, context, villageId])

    const handleOnChangeFile = (file : File | null) => {
        if (file && (file.size / 1024 <= 20 * 1024)) {
            return setValueOctet(file)
        }
        return showNotification({
            title: 'Error',
            message: 'Ukuran File Maksimal 20Mb',
            icon: <X />,
        });
    }

    return (
        <>
            <TextInput label="Nama" mt={16} required placeholder='Tulis nama Pakar' value={expertName} onChange={(e) => setExpertName(e.target.value)} />
            <Select withAsterisk data={data?.map(({ id: value, name: label }: { id: string, name: string }) => ({ label, value })) ?? []} placeholder="Pilih Desa" label="Desa" onChange={e => {
                if (e) {
                    setVillageId(e)
                }
            }} />
            <FileInput 
                withAsterisk
                label="Upload File Excel" 
                placeholder="File maksimal 20MB" 
                icon={<Upload size={14} />} 
                inputWrapperOrder={["label", "input", "description", "error"]} 
                description="Format Excel harus sesuai dengan template" 
                onChange={handleOnChangeFile}
                value={octetValue}
                multiple={false}
                accept="application/vnd.ms-exce,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
            <Group position="apart" grow>
                <Button fullWidth mt="md" variant="outline" onClick={() => context.closeModal(id)}>
                    Batal
                </Button>
                <Button fullWidth mt="md" onClick={handleSubmit} loading={loading}>
                    Unggah
                </Button>
            </Group>
        </>
    );
}

export default CooperationEditorModal;