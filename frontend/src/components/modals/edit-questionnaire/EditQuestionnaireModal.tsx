import { useGetQuestionnairePublic } from '@/services/QuestionnaireServices/QuestionnaireQueries';
import QuestionnaireServices from '@/services/QuestionnaireServices/QuestionnaireServices';
import { useGetVillagesDropList } from '@/services/VillagesServices/VillagesQueries';
import { Button, Group, Select, Text, TextInput } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ContextModalProps } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { Link, useNavigate } from '@tanstack/react-location';
import { X } from 'phosphor-react';
import { useCallback, useState } from 'react';

const EditQuestionnaireModal = ({ context, id, innerProps }: ContextModalProps<{ desa: string; }>) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { data=[] } = useGetVillagesDropList();

    const [{ villageId, phone }, setValue] = useLocalStorage({ key: 'questionnaire', defaultValue: {
        villageId: '',
        phone: ''
    } });

    const handleCloseModal = useCallback(() => {
        context.closeModal(id)
    },[context, id])

    useGetQuestionnairePublic({ villageId, phone });

    const handleEditQuestionnaire = useCallback(async () => {
        setLoading(true)
        try {
            await QuestionnaireServices.getQuestionnairePublic({
                villageId,
                phone,
            })
            handleCloseModal();
            navigate({ to: '/edit-kuesioner' })
        } catch (_) {
            showNotification({
                title: 'Gagal!',
                message: 'Data Tidak Terdaftar',
                color: 'red',
                icon: <X size={16} />,
            })
        }   
        setLoading(false)
    }, [villageId, phone])

    return (
        <>
            <Select 
                label="Desa" 
                required 
                placeholder='Pilih Desa' 
                data={data?.map(({ id: value, name: label }: { id: string, name: string }) => ({ label, value })) ?? []} 
                value={villageId} 
                onChange={(e) => e && setValue(prev=> ({ ...prev, villageId: e }))} 
            />
            <TextInput label="Nomor HP" mt={16} required placeholder='Masukkan Nomor HP' onChange={(e) => setValue(prev => ({ ...prev, phone: e.target.value }))} value={phone} />
            <Text size="sm">{innerProps.desa}</Text>
            <Group position="apart" grow>
                <Button fullWidth mt="md" variant="outline" onClick={handleCloseModal}>
                    Batal
                </Button>
                <Button
                    fullWidth 
                    mt="md"
                    onClick={handleEditQuestionnaire}
                    loading={loading}
                >
                    Edit Kuesioner
                </Button>
            </Group>
        </>
    );
}

export default EditQuestionnaireModal;