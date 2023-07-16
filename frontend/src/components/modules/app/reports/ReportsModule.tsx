import { useGetRecommendation } from "@/services/AnalysisService/AnalysisQueries";
import { useGetVillagesDropList } from "@/services/VillagesServices/VillagesQueries";
import { Button, Card, Center, Container, Group, List, SegmentedControl, Select, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import { BarChart, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Bar, ReferenceLine } from "recharts";

const LabelValues: Record<string, string> = {
    dukunganKomunitas: 'Dukungan Komunitas',
    indeksSmartEconomy: 'Indeks Smart Community',
    inovasi: 'Inovasi',
    institusi: 'Institusi',
    karakterWarga: 'Karakter Warga',
    keberlanjutan: 'Keberlanjutan',
    kerberdayaanWarga: 'Keberdayaan Warga',
    kewirausahaan: 'Kewirausahaan',
    lingkungan: 'Lingkungan',
    rantaiNilai: 'Rantai Nilai',
    sumberDaya: 'Sumber Daya',
    teknologi: 'Teknologi',
}

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

const ReportsModule = () => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [villageId, setVillageId] = useState('');

    const { data } = useGetRecommendation({ villageId }, isReady);

    const { data: dataDesa } = useGetVillagesDropList();

    const chartData = (isReady && data?.values) ? 
        Object.entries(data?.values ?? {})
            .map(([name, value]) => ({ 
                name: LabelValues[name], 
                value, 
                fill: value as number > data.threshold ? "var(--mantine-color-green-6)" : "red" 
            })) 
        : []

    const handleProcess = useCallback(() => {
        setIsReady(true);
    }, [villageId]);

    return (
        <Container fluid my={32} mx={20}>
                <Card radius="md" shadow="xs" mb={32}>
                    <Group position="apart" >
                    <Select withinPortal withAsterisk data={dataDesa?.map(({ id: value, name: label }: { id: string, name: string }) => ({ label, value })) ?? []} placeholder="Pilih Desa" onChange={e => {
                        if (e) {
                            setIsReady(false);
                            setVillageId(e);
                        }
                    }} />
                        <Button ml="auto" onClick={handleProcess}>Proses</Button>
                    </Group>
                </Card>
                <SimpleGrid cols={1}>
                <Card radius="md" shadow="xs" p="xl" style={{ height: "calc(50vh)" }}>
                        <Title order={3} mb={24}>Bobot Rekomendasi</Title>
                        
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart
                                width={400}
                                height={300}
                                data={chartData}
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
                                <Bar dataKey="value" radius={[16, 16, 0, 0]} />
                                <ReferenceLine y={data?.threshold ?? 0} stroke="red" strokeDasharray="3 3" />
                            </BarChart>
                        </ResponsiveContainer>
                    <Text mt={24}>Threshold: {isReady && data?.threshold ? data?.threshold?.toFixed(6) : 0}</Text>
                    </Card>
                {isReady && <Card>
                    <Text size={16} weight={700} color="#495057" mb={8}>Rekomendasi</Text>
                        <List
                            styles={{
                                item: {
                                    fontSize: 14,
                                }
                            }}
                        >
                            {
                                 data?.recommendations?.map((values: string, i: number) => (
                                    <List.Item key={`${values}-${i}`}>{values}</List.Item>
                                ))
                            }
                        </List>
                        
                    </Card>}
                </SimpleGrid>
        </Container>
    );
};

export default ReportsModule;