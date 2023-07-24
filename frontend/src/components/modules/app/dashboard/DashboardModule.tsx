import styles from "./Dashboard.module.scss";
import { ClipboardText, House, HouseLine } from 'phosphor-react';
import { Card, Container, Group, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend, Bar } from 'recharts';

import { FeatureStats } from '@/components/elements/feature-stats/FeatureStats';

import * as queries from '@/services/DashboardService/DashboardQueries';
import { Acl } from "@/components/layout/acl/Acl";
import { ROLE } from "@/utils/constants";

const AVAILABLE_COLORS = [
    "var(--mantine-color-cyan-6)",
    "var(--mantine-color-teal-6)",
    "var(--mantine-color-green-6)",
    "var(--mantine-color-lime-6)",
    "var(--mantine-color-yellow-6)",
    "var(--mantine-color-orange-6)",
]

const ExpensesTooltip = (mapping: Record<string, string>) => {
    return ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Card shadow={'md'}>
                    <Text fw="bold" tt="capitalize" mb={12}>{label}</Text>
                    {payload.map((item: any, i: number) => {
                        return <Text key={`expensesTooltip-${i}`} color="green">{`${mapping[i]} = ${payload[i].value}`}</Text>
                    })}
                </Card>
            );
        }

        return null;
    };
}

const DashboardModule = () => {
    const theme = useMantineTheme();
    const { data: summaries } = queries.useGetSummaries();
    const { data: questionnaireChart } = queries.useQuestionnaireChart();
    const { data: jobsChart } = queries.useJobsChart();
    const { data: landOwnershipChart } = queries.useLandOwnershipChart();
    const { data: expensesChart } = queries.useExpensesChart();
    const { data: motivationChart } = queries.useMotivationChart();
    const { data: tikChart } = queries.useTIKChart();
    const { data: informationChart } = queries.useInformationChart();
    const { data: plsNNChart } = queries.usePlsNNChart();

    return (
        <Acl 
            roles={[
                ROLE.ADMIN,
                ROLE.WARGA,
                ROLE.APARAT,
                ROLE.PAKAR
            ]}
        >
        <div className={styles.container} style={{ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0] }}>
            <div className={styles.hero}>
                <h1>Selamat Datang di Aplikasi Smart Economy!</h1>
                <h2>Silakan pilih menu pada sidebar</h2>
            </div>
            <Container size="xl">
                <div className={styles.features}>
                    <FeatureStats icon={<ClipboardText weight="fill" color={theme.colors.orange[5]} size={32} />} title="Kuesioner" value={summaries?.answersCount} />
                    <FeatureStats icon={<House weight="fill" color={theme.colors.blue[5]} size={32} />} title="Desa" value={summaries?.villageCount} />
                </div>
                <div>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>Statistik Kuesioner</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={questionnaireChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" name="Total" fill="var(--mantine-color-green-6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>Statistik Pekerjaan</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={jobsChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="tani" name="Tani" fill="var(--mantine-color-cyan-6)" />
                                <Bar dataKey="ternak" name="Ternak" fill="var(--mantine-color-teal-6)" />
                                <Bar dataKey="nelayan" name="Nelayan" fill="var(--mantine-color-green-6)" />
                                <Bar dataKey="pns" name="PNS" fill="var(--mantine-color-lime-6)" />
                                <Bar dataKey="lainnya" name="Lainnya" fill="var(--mantine-color-yellow-6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>Statistik Kepemilikan Lahan</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={landOwnershipChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="milik_sendiri" name="Milik Sendiri" fill="var(--mantine-color-cyan-6)" />
                                <Bar dataKey="parohan" name="Parohan" fill="var(--mantine-color-teal-6)" />
                                <Bar dataKey="lainnya" name="Lainnya" fill="var(--mantine-color-green-6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>Statistik Pengeluaran Bulanan</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={expensesChart?.data || []}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip content={ExpensesTooltip(expensesChart?.mapping || [])} />
                                <Legend />
                                {expensesChart?.mapping && Object.keys(expensesChart?.mapping || []).map((r, i) => {
                                    return <Bar key={`expensesBar-${i}`} dataKey={`${i}`} name={expensesChart.mapping[r]} fill={AVAILABLE_COLORS[i]} />
                                })}
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>Statistik Motivasi</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={motivationChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="tik" name="TIK" fill="var(--mantine-color-red-6)" />
                                <Bar dataKey="kerja_sama" name="Kerja Sama" fill="var(--mantine-color-cyan-6)" />
                                <Bar dataKey="pariwisata" name="Pariwisata" fill="var(--mantine-color-teal-6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>Statistik TIK</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={tikChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="lapangan_pekerjaan" name="Lapangan Pekerjaan" fill="var(--mantine-color-cyan-6)" />
                                <Bar dataKey="penghasilan" name="Penghasilan" fill="var(--mantine-color-teal-6)" />
                                <Bar dataKey="memberdayakan_warga" name="Memberdayakan Warga" fill="var(--mantine-color-green-6)" />
                                <Bar dataKey="mendatangkan_turis" name="Mendatangkan Turis" fill="var(--mantine-color-lime-6)" />
                                <Bar dataKey="akses_pasar" name="Akses Pasar" fill="var(--mantine-color-yellow-6)" />
                                <Bar dataKey="promosi_komoditas" name="Promosi Komoditas" fill="var(--mantine-color-orange-6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>Statistik Informasi</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={informationChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="aparat_desa" name="Aparat Desa" fill="var(--mantine-color-cyan-6)" />
                                <Bar dataKey="tokoh" name="Tokoh" fill="var(--mantine-color-teal-6)" />
                                <Bar dataKey="pemda_kab" name="Pemda Kabupaten" fill="var(--mantine-color-green-6)" />
                                <Bar dataKey="pemda_pusat" name="Pemda Pusat" fill="var(--mantine-color-lime-6)" />
                                <Bar dataKey="lainnya" name="Lainnya" fill="var(--mantine-color-yellow-6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card radius="md" p={16} withBorder pb={80} mb={20} style={{ height: 460, width: "100%" }}>
                        <Title order={3} mb={24}>PLS-NN Smart Economy</Title>
                        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={plsNNChart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="village_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="rank_1" name="Cukup Siap" fill="var(--mantine-color-cyan-6)" />
                                <Bar dataKey="rank_2" name="Siap" fill="var(--mantine-color-teal-6)" />
                                <Bar dataKey="rank_3" name="Sangat Siap" fill="var(--mantine-color-green-6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </Container>
        </div>
        </Acl>
    );
};

export default DashboardModule;