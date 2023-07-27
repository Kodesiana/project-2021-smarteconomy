import { useGetRecommendation } from "@/services/AnalysisService/AnalysisQueries";
import { useGetVillagesDropList } from "@/services/VillagesServices/VillagesQueries";
import { Button, Card, Center, Container, Group, List, MANTINE_COLORS, SegmentedControl, Select, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Check, Warning, WarningCircle } from "phosphor-react";
import { useCallback, useState } from "react";
import { BarChart, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Bar, ReferenceLine } from "recharts";


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

const ModelStatsModule = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [villageId, setVillageId] = useState('');

  const { data } = useGetRecommendation({ villageId }, isReady);
  const { data: dataDesa } = useGetVillagesDropList();

  const getRankText = () => {
    if (!data || !isReady) return "-";
    if (data.rank === undefined) return "-";
    if (data.rank === 1) return "Cukup Potensial";
    if (data.rank === 2) return "Potensial";
    return "Sangat Potensial";
  }

  const getRankColor = () => {
    if (!data || !isReady) return "gray";
    if (data.rank === undefined) return "gray";
    if (data.rank === 1) return "red";
    if (data.rank === 2) return "yellow";
    return "green";
  }

  const chartData = (isReady && data?.values) ?
    Object.entries(data?.values ?? {})
      .map(([name, value]) => ({
        name: (value as any).variable,
        value: (value as any).value,
        fill: (value as any).value as number > data.threshold ? "var(--mantine-color-green-6)" : "red"
      }))
    : [];

  const handleProcess = useCallback(() => {
    setIsReady(true);
  }, [villageId]);

  return (
    <Container fluid my={32} mx={20}>
      <Card radius="md" shadow="xs" mb={32}>
        <Group position="apart" >
          <Select withinPortal withAsterisk data={dataDesa?.map(({ id: value, name: label }: { id: string, name: string; }) => ({ label, value })) ?? []} placeholder="Pilih Desa" onChange={e => {
            if (e) {
              setIsReady(false);
              setVillageId(e);
            }
          }} />
          <Button ml="auto" onClick={handleProcess}>Proses</Button>
        </Group>
      </Card>
      <SimpleGrid cols={1}>
        <Card radius="md" shadow="xs" p="xl" style={{ height: "140px" }} bg={getRankColor()}>
          <Title order={3} color={"white"}>Potensi Smart Economy</Title>
          <Text size={40} color={"white"}>{getRankText()}</Text>
        </Card>

        <Card radius="md" shadow="xs" p="xl" style={{ height: "calc(70vh)" }}>
          <Title order={3} mb={24}>Bobot Rekomendasi</Title>
          <Text mb={8}>Threshold: {isReady && data?.threshold ? data?.threshold?.toFixed(6) : 0}</Text>
          <ResponsiveContainer width="100%" height="75%">
            <BarChart
              width={400}
              height={400}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 90,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} />
              <YAxis domain={[0, 1]} />
              {isReady && <Tooltip content={CustomTooltip} />}
              <Bar dataKey="value" radius={[16, 16, 0, 0]} />
              <ReferenceLine y={data?.threshold ?? 0} stroke="red" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>

        </Card>
        {isReady && (
          <Stack>
            <Card>
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
                    <List.Item icon={
                      values.match(/baik/) ? <Check color={"green"} /> : <WarningCircle color={"orange"} />
                    } key={`${values}-${i}`}>{values}</List.Item>
                  ))
                }
              </List>

            </Card>
            <Card>
              <Text size={16} weight={700} color="#495057" mb={8}>Keterangan</Text>
              <div dangerouslySetInnerHTML={{ __html: data?.description ?? "-" }} />
            </Card>
          </Stack>)}
      </SimpleGrid>
    </Container>
  );
};

export default ModelStatsModule;