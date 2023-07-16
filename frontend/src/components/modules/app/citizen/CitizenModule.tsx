import dataTable from "@/components/elements/data-table";
import { useDataTable } from "@/components/elements/data-table/useDataTable";
import useQuery from "@/hooks/useQuery";
import { queryClient } from "@/queryClient";
import { CSParam } from "@/services/AnalysisService/AnalysisInterface";
import { useGetCitizenScienceData } from "@/services/AnalysisService/AnalysisQueries";
import { useGetVillagesDropList } from "@/services/VillagesServices/VillagesQueries";
import { useMantineTheme, Stack, Container, Card, Group, Select, SegmentedControl, Button, SimpleGrid, Title, Transition, clsx, Overlay, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

type TableProps = {
    data: any[];
    isLoading: boolean;
    detailed?: boolean;
    hidden?: boolean;
};

const CitizenModule = () => {
    const [detailed, setDetailed] = useState(true);
    const [isDirty, setIsDirty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [params, setParams] = useState<CSParam>({ enabled: false, order: 1, villageId: null, mode: "detailed" });
    const { data, isLoading: isDataLoading } = useGetCitizenScienceData(params);
    const { data: villages } = useGetVillagesDropList();

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Container fluid>
            <Stack spacing="md">
                <Card radius="md" shadow="xs" mt={20} style={{ zIndex: 200 }}>
                    <Group position="apart" >
                        <Group>
                            <Select disabled={isLoading} defaultValue={"1"} width={200} withinPortal name="Order" placeholder="Order" data={[
                                { label: "First Order", value: "1" },
                                { label: "Second Order", value: "2" },
                            ]} onChange={
                                (val) => {
                                    queryClient.setQueryData(["citizenScience"], []);
                                    setParams({ ...params, order: parseInt(val ?? "1"), enabled: false });
                                    setIsDirty(true);
                                }
                            } />
                            <Select disabled={isLoading} withinPortal name="Village" placeholder="Pilih Desa" data={[
                                { label: "KECAMATAN", value: "" },
                                ...villages?.map(({ id: value, name: label }: { id: string, name: string; }) => ({ label, value })) ?? [],

                            ]} onChange={
                                (val) => {
                                    setIsDirty(true);
                                    queryClient.setQueryData(["citizenScience"], []);
                                    if (val == "") {
                                        return setParams({ ...params, villageId: null, enabled: false });
                                    }
                                    return setParams({ ...params, villageId: val, enabled: false });
                                }
                            } />
                            <SegmentedControl disabled={isLoading} name="detils" radius="sm" color="green" onChange={
                                (val) => {
                                    setIsDirty(true);
                                    queryClient.setQueryData(["citizenScience"], []);
                                    setParams({ ...params, mode: val as "summary" | "detailed", enabled: false });
                                    setDetailed(val === "detailed");
                                }
                            } data={[
                                { label: "Detail", value: "detailed" },
                                { label: "Ringkas", value: "summary" },
                            ]}
                            />
                        </Group>
                        <Button loading={isLoading} style={{ width: 188 }} onClick={
                            () => {
                                setIsLoading(true);
                                setParams({ ...params, enabled: true });
                                setIsDirty(false);
                                setTimeout(() => {
                                    setIsLoading(false);
                                }, 1000);
                            }
                        }>{isLoading ? "Memproses" : "Proses"}</Button>
                    </Group>
                </Card>
                {isDirty && <Overlay opacity={0.5} color="#aaa" zIndex={5} blur={1} />}
                <SimpleGrid hidden={isDirty || !detailed} cols={isMobile ? 1 : 2}>
                    <Card radius="md" shadow="xs">
                        <Card.Section slot="header">
                            <Title m={16} order={4}>Sensitivity</Title>
                        </Card.Section>
                        <SensitivityTable isLoading={isDataLoading} data={data?.sensitivity} />
                    </Card>
                    <Card radius="md" shadow="xs">
                        <Card.Section slot="header">
                            <Title m={16} order={4}>Inner Summary</Title>
                        </Card.Section>
                        <InnerSummaryTable isLoading={isDataLoading} data={data?.inner_summary} />
                    </Card>
                </SimpleGrid>
                <SimpleGrid cols={isMobile ? 1 : 2} >
                    <Card hidden={isDirty} radius="md" shadow="xs">
                        <Card.Section slot="header">
                            <Title m={16} order={4}>{detailed ? "Effects" : "Sensitivity"}</Title>
                        </Card.Section>
                        {detailed ?
                            <EffectTable isLoading={isDataLoading} data={data?.effects} /> :
                            <RingkasSensitivityTable isLoading={isDataLoading} data={data?.sensitivity} />}
                    </Card>
                    <Card hidden={isDirty} radius="md" shadow="xs">
                        <Card.Section slot="header">
                            <Title m={16} order={4}>{detailed ? "Inner Model" : "Inner Summary"}</Title>
                        </Card.Section>
                        {detailed ?
                            <InnerModelTable isLoading={isDataLoading} data={data?.inner_model} /> :
                            <RingkasInnerSummaryTable isLoading={isDataLoading} data={data?.inner_summary} />}
                    </Card>
                </SimpleGrid>
            </Stack>

        </Container>
    );
};

export default CitizenModule;

// ----- RINGKAS TABLE

export const RingkasSensitivityTable = ({ isLoading, data }: TableProps) => {

    const [state, setState] = useState({});
    const {
        component,
    } = dataTable({
        columns: [
            { header: "No", size: 16, cell: (ctx) => ctx?.row?.index + 1 },
            { header: "Variable", accessorKey: "variable" },
            { header: "Sensitivity", accessorKey: "sensitivity", accessorFn: (row) => row.sensitivity?.toFixed(4) },
        ],
        data: data ?? [],
        state,
        loading: isLoading,
        setState,
    });

    return (
        <>
            {component}
        </>
    );
};

export const RingkasInnerSummaryTable = ({ isLoading, data }: TableProps) => {

    const [state, setState] = useState({});
    const {
        component,
    } = dataTable({
        columns: [
            { header: "No", size: 16, cell: (ctx) => ctx?.row?.index + 1 },
            { header: "Index", accessorKey: "index" },
            { header: "Estimate", size: 16, accessorKey: "estimate", accessorFn: (row) => row.estimate?.toFixed(4) },
            { header: "P>|t|", size: 16, accessorKey: "p_value", accessorFn: (row) => row.p_value?.toFixed(4) },
            { header: "R squared", size: 16, accessorKey: "r_squared", accessorFn: (row) => row.r_squared?.toFixed(4) },
        ],
        data: data ?? [],
        state,
        loading: isLoading,
        setState,
    });

    return (
        <>
            {component}
        </>
    );
};

// ----- DETAIL TABLE

export const SensitivityTable = ({ isLoading, data, hidden }: TableProps) => {

    const [state, setState] = useState({});
    const {
        component,
    } = dataTable({
        columns: [
            { header: "No", size: 16, cell: (ctx) => ctx?.row?.index + 1 },
            { header: "Variable", accessorKey: "variable" },
            { header: "Sensitivity", accessorKey: "sensitivity", accessorFn: (row) => row.sensitivity?.toFixed(4) },
        ],
        data: data ?? [],
        state,
        loading: isLoading,
        setState,
    });

    return (
        < >
            {!hidden && component}
        </ >
    );
};

export const InnerModelTable = ({ isLoading, data }: TableProps) => {

    const [state, setState] = useState({});
    const {
        component,
    } = dataTable({
        columns: [
            { header: "No", size: 16, cell: (ctx) => ctx?.row?.index + 1 },
            { header: "From", accessorKey: "from" },
            { header: " ", size: 10, cell: (ctx) => "→", enableSorting: false, enableResizing: false },
            { header: "To", accessorKey: "to" },
            { header: "Index", accessorKey: "index" },
            { header: "Estimate", accessorKey: "estimate", accessorFn: (row) => row.estimate?.toFixed(4) },
            { header: "Std. Error", accessorKey: "std_error", accessorFn: (row) => row.std_error?.toFixed(4) },
            { header: "t value", accessorKey: "t_value", accessorFn: (row) => row.t_value?.toFixed(4) },
            { header: "P>|t|", accessorKey: "p_value", accessorFn: (row) => row.p_value?.toFixed(4) },
        ],
        data: data ?? [],
        state,
        loading: isLoading,
        setState,
    });

    return (
        <>
            {component}
        </>
    );
};

export const InnerSummaryTable = ({ isLoading, data }: TableProps) => {

    const [state, setState] = useState({});
    const {
        component,
    } = dataTable({
        columns: [
            { header: "No", size: 16, cell: (ctx) => ctx?.row?.index + 1 },
            { header: "Index", accessorKey: "index" },
            { header: "Type", accessorKey: "type" },
            { header: "R-squared", accessorKey: "r_squared", accessorFn: (row) => row.r_squared?.toFixed(4) },
            { header: "R-sqared (adj.)", accessorKey: "r_squared_adj", accessorFn: (row) => row.r_squared_adj?.toFixed(4) },
            { header: "Block Communality", accessorKey: "block_communality", accessorFn: (row) => row.block_communality?.toFixed(4) },
            { header: "Mean Redundancy", accessorKey: "mean_redundancy", accessorFn: (row) => row.mean_redundancy?.toFixed(4) },
            { header: "Average", accessorKey: "average", accessorFn: (row) => row.average?.toFixed(4) }
        ],
        data: data ?? [],
        state,
        loading: isLoading,
        setState,
    });

    return (
        <>
            {component}
        </>
    );
};

export const EffectTable = ({ isLoading, data, hidden }: TableProps) => {

    const [state, setState] = useState({});
    const {
        component,
    } = dataTable({
        columns: [
            { header: "No", size: 16, cell: (ctx) => ctx?.row?.index + 1 },
            { header: "From", accessorKey: "from" },
            { header: " ", size: 10, cell: (ctx) => "→", enableSorting: false, enableResizing: false },
            { header: "To", accessorKey: "to" },
            { header: "Direct", size: 30, accessorKey: "direct", accessorFn: (row) => row.direct?.toFixed(4) },
            { header: "Indirect", size: 30, accessorKey: "indirect", accessorFn: (row) => row.indirect?.toFixed(4) },
            { header: "Total", size: 30, accessorKey: "total", accessorFn: (row) => row.total?.toFixed(4) },
        ],
        data: data ?? [],
        state,
        loading: isLoading,
        setState,
    });

    return (
        < >
            {!hidden && component}
        </ >
    );
};
