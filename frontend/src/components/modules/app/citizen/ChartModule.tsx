import { Acl } from "@/components/layout/acl/Acl";
import * as queries from '@/services/DashboardService/DashboardQueries';
import { ROLE } from "@/utils/constants";
import { Card, Container, Title } from "@mantine/core";
import { Bar, BarChart, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import styles from "../dashboard/Dashboard.module.scss";
const ChartModule = () => {

    const { data: plsNNChart } = queries.usePlsNNChart();

    return (
        <Acl roles={[ROLE.ADMIN, ROLE.PAKAR, ROLE.APARAT]}>
            <Container fluid>
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

            </Container>
        </Acl>
    );
};

export default ChartModule; 