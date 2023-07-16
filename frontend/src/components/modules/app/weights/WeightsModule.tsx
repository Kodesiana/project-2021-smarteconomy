import { useGetAnalysisCoop } from "@/services/AnalysisService/AnalysisQueries";
import { useGetCoop, useGetCoopDl } from "@/services/CoopService/CoopQueries";
import { useGetVillagesDropList } from "@/services/VillagesServices/VillagesQueries";
import instance from "@/utils/apiClient";
import { ActionIcon, Button, Card, Container, Group, Modal, Overlay, Paper, SegmentedControl, Select, SimpleGrid, Space, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Hash } from "phosphor-react";
import { useCallback, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const apiClient = instance({});

const Model: Record<string, string> = {
    "aS1": "Pemberdayaan Koperasi",
    "aS2": "Pemodalan",
    "aS3": "Pemasaran",
    "aS4": "Character Building",
    "aS5": "Capacity Building",
    "aS6": "Kebijakan",
};

const SchemaBobotFactor: Record<string, string> = {
    'f1': 'Sumber Daya',
    'f2': 'Teknologi',
    'f3': 'Rantai Nilai',
    'f4': 'Keberlanjutan',
    'f5': 'Institusi',
};

const UsersModule = () => {

    // TODO bind params push each changes from switch get from key switch

    const [pakar, setPakar] = useState<string>("");
    const [villageId, setVillageId] = useState<string>("");
    const [detail, setDetail] = useState<string>("kerjaSamaId");
    const [isReady, setIsReady] = useState<boolean>(false);
    const { data: daftarPakar } = useGetCoopDl({ villageId: villageId }, true);
    const { data: hasilPakar } = useGetAnalysisCoop({ kerjaSamaId: pakar, villageId, detail }, isReady);
    const { data: dataDesa } = useGetVillagesDropList();

    const isMobile = useMediaQuery('(max-width: 768px)');
    
    const handleProcess = useCallback(() => {
        if (detail == "") {
            setPakar("");
            setVillageId("");
        }
        setIsReady(true);

    }, [pakar]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length > 0) {
            return (
                <Card shadow={'md'}>
                    <Text fw="bold" tt="capitalize" mb={12}>{(label as string).toLowerCase()}</Text>
                    <Group position='left'>
                        <Text color="green">{`${payload?.[0]?.value?.toFixed(4)}`}</Text>
                    </Group>
                </Card>
            );
        }

        return null;
    };

    const pakarOptions = useMemo(() => daftarPakar && daftarPakar?.map(
        (item: any) => { return { label: item.expertName, value: item.id }; }
    ), [daftarPakar]);
    return (
        <Container size="xl">

            <Paper p="md" mt="md" style={{ position: "relative", zIndex: 200 }} >
                <Group>
                    <SegmentedControl radius="sm" color="green" onChange={
                        (val) => {
                            setIsReady(false);
                            setDetail(val);
                        }
                    } data={[
                        { label: "Detail", value: "kerjaSamaId" },
                        { label: "Ringkas", value: "villageId" },
                        { label: "Kecamatan", value: "" },
                    ]}
                    />
                    <Select withAsterisk disabled={detail === ''} data={dataDesa?.map(({ id: value, name: label }: { id: string, name: string; }) => ({ label, value })) ?? []} placeholder="Pilih Desa" onChange={e => {
                        if (e) {
                            setIsReady(false);
                            setVillageId(e);
                            setPakar("");
                        }
                    }} />
                    <Select value={pakar} placeholder="Pilih pakar" disabled={detail === 'villageId' || detail === ''} w={300} data={pakarOptions ?? []} onChange={(v) => {
                        setIsReady(false);
                        return setPakar(v ?? "");
                    }} />

                    <Button onClick={handleProcess} ml="auto">Proses</Button>
                </Group>
            </Paper>

            <Card p="md" mt="md" radius={8}>
                <Text size={20} weight={600} display="flex" sx={{ justifyItems: 'center' }} color="#495057">
                    <ActionIcon variant="filled" color="blue" mr={20} sx={{ pointerEvents: 'none' }}>
                        <Hash weight="bold" />
                    </ActionIcon>
                    Consistency Ratio</Text>
                <Text size={40}>{isReady && hasilPakar?.cr ? hasilPakar?.cr?.toFixed(6) : 0}</Text>
            </Card>
            <SimpleGrid cols={isMobile ? 1 : 2} pb="xl">
                <Paper p="md" mt="md" pb={80} style={{ height: "calc(50vh)" }}>
                    <Title order={3} mb={24}>Strategi Kerja Sama</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={400}
                            height={300}
                            data={(isReady && hasilPakar?.alternatives) ? Object.entries(hasilPakar?.alternatives ?? {}).map(([name, value]) => ({ name: Model?.[name], value })) : []}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 1]} />
                            {isReady && <Tooltip content={CustomTooltip} />}
                            <Bar dataKey="value" fill="var(--mantine-color-green-6)" radius={[16, 16, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <Space h="lg" />
                </Paper>

                <Paper p="md" mt="md" pb={80} style={{ height: "calc(50vh)" }}>
                    <Title order={3} mb={24}>Bobot Faktor</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={400}
                            height={300}
                            data={(isReady && hasilPakar?.factors) ? Object.entries(hasilPakar?.factors).map(([name, value]) => ({ name: SchemaBobotFactor?.[name], value })) : []}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 1]} />
                            {isReady && <Tooltip content={CustomTooltip} />}
                            <Bar dataKey="value" fill="var(--mantine-color-green-6)" radius={[16, 16, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <Space h="lg" />
                </Paper>
            </SimpleGrid>

        </Container >
    );
};

export default UsersModule;