import InProgressNotification from '@/components/elements/in-progress-card/InProgress';
import { useGetVillagesDropList } from '@/services/VillagesServices/VillagesQueries';
import { Button, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

const QuestionnaireEditorModal = ({ context, id, innerProps }: ContextModalProps<{ desa: string; }>) => {
    return (
        <InProgressNotification />
    )
    // return (
    //     <>
    //         <Select label="Desa" required placeholder='Pilih Desa' data={[]}/>
    //         <TextInput label="Nomor HP" mt={16} required placeholder='Masukkan Nomor HP' />
    //         <Text size="sm">{innerProps.desa}</Text>
    //         <Group position="apart" grow>
    //             <Button fullWidth mt="md" variant="outline" onClick={() => context.closeModal(id)}>
    //                 Batal
    //             </Button>
    //             <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
    //                 Edit Kuesioner
    //             </Button>
    //         </Group>
    //     </>
    // );
};

export default QuestionnaireEditorModal;