
import { useDataTable } from "@/components/elements/data-table/useDataTable";
import InputDebounced from "@/components/elements/input-debounced";
import TableLayout from "@/components/layout/table/TableLayout";
import AnalysisServices from "@/services/AnalysisService/AnalysisServices";
import { useGetCoop } from "@/services/CoopService/CoopQueries";
import { SearchRequest } from "@/services/interface";
import { useGetInfra, useGetInvestasi } from "@/services/queries";
import { useGetQuesionare } from "@/services/QuestionaireServices/QuestionaireQueries";
import { useGetVillages } from "@/services/VillagesServices/VillagesQueries";
import { stateToKodesiana } from "@/utils/queryParams";
import { getPageIndex, toTitleCase } from "@/utils/strings";
import { ActionIcon, Button, Group } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Link, MakeGenerics, useMatch, useNavigate } from "@tanstack/react-location";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ArrowsClockwise, Check, CheckCircle, PencilSimple, Plus, Trash, X, XCircle } from "phosphor-react";
import { useMemo, useState } from "react";
import QuestionnaireServices from '@/services/QuestionnaireServices/QuestionnaireServices';
import { queryClient } from "@/queryClient";
import CoopServices from "@/services/CoopService/CoopServices";
import VillagesServices from "@/services/VillagesServices/VillagesServices";
import SearchBar from "@/components/elements/search-bar/SearchBar";
import { Acl } from "@/components/layout/acl/Acl";
import { ROLE } from "@/utils/constants";

const decimalFormatter = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

type LocationGenerics = MakeGenerics<{
    Search: SearchRequest,
    LoaderData: {
        title?: string;
    };
}>;

const villageColumn: ColumnDef<any>[] = [
    { header: "No", size: 16, cell: ({ row }: any) => row.index + 1 },
    { header: "Desa", accessorKey: "name", size: 400 },
    {
        header: "Aksi", size: 100,
        cell: (ctx: CellContext<any, unknown>) => (
            <Group>
                <ActionIcon variant="subtle" size="xs" color="green" onClick={
                    () => {
                        AnalysisServices.getBackfill({
                            type: 'citizen_science',
                            id: ctx?.row?.original.id,
                        }).then(
                            (res) => {
                                showNotification({
                                    title: 'Berhasil',
                                    message: 'Proses backfill berhasil',
                                    color: 'green',
                                    icon: <CheckCircle weight="fill" />,
                                });
                            }
                        ).catch((err) => {
                            if (err instanceof Error) {
                                showNotification({
                                    title: 'Gagal',
                                    message: 'Proses backfill gagal',
                                    color: 'red',
                                    icon: <XCircle weight="fill" />,
                                });
                            }

                        });

                    }}

                ><ArrowsClockwise weight="fill" /></ActionIcon>
                <ActionIcon
                    variant="subtle"
                    size="xs"
                    color="blue"
                    onClick={() => openContextModal({
                        modal: 'village-editor',
                        title: 'Edit Desa',
                        innerProps: {
                            desa: ctx?.row?.original.name,
                            id: ctx?.row?.original.id,
                        }
                    })
                    }><PencilSimple weight="fill" /></ActionIcon>
                <ActionIcon variant="subtle" size="xs" color="red" onClick={() => openContextModal({
                    modal: 'delete-confirm',
                    title: 'Hapus Desa',
                    innerProps: {
                        name: ctx?.row?.getValue('name'),
                        entity: 'desa',
                        related: 'kuesioner',
                        onConfirm: async () => {
                            try {
                                await VillagesServices.deleteVillages({ id: ctx?.row?.original?.id });
                                showNotification({
                                    title: 'Berhasil!',
                                    message: 'Desa berhasil dihapus',
                                    icon: <Check size={16} />,
                                });
                                queryClient.invalidateQueries(['Villages']);
                            } catch (error) {
                                showNotification({
                                    title: 'Gagal!',
                                    message: 'Desa gagal dihapus',
                                    color: 'red',
                                    icon: <X size={16} />,
                                });
                            }
                        }
                    }
                })}><Trash weight="fill" /></ActionIcon>
            </Group>
        ),
    }
];


const cooperationColumn = [
    { header: "No", size: 16, cell: ({ row }: any) => row.index + 1 },
    { header: "Pakar", accessorKey: "expertName", size: 400 },
    { header: "Desa", accessorKey: "villageName", size: 400 },
    { header: "Status", accessorKey: "status", size: 40 },
    {
        header: "Aksi", size: 100,
        cell: (ctx: any) => (
            <Group>
                <ActionIcon variant="subtle" size="xs" color="red" onClick={() => openContextModal({
                    modal: 'delete-confirm',
                    title: 'Hapus Perbandingan Pakar',
                    innerProps: {
                        name: ctx?.row?.getValue('expertName'),
                        entity: 'perbandingan pakar',
                        onConfirm: async () => {
                            try {
                                await CoopServices.deleteCooperation({ id: ctx?.row?.original?.id });
                                showNotification({
                                    title: 'Berhasil!',
                                    message: 'Berhasil menghapus Perbandingan Pakar',
                                    icon: <Check size={16} />,
                                });
                                queryClient.invalidateQueries(['getCoop']);
                            } catch (error) {
                                showNotification({
                                    title: 'Gagal!',
                                    message: 'Gagal menghapus Perbandingan Pakar',
                                    color: 'red',
                                    icon: <X size={16} />,
                                });
                            }
                        }
                    }
                })}><Trash weight="fill" /></ActionIcon>
            </Group>
        ),
    }
];
// No, Nama, Jenis Kelamin, Nomor HP, Status, Domisili, Kelas Bangunan Usaha, Tanggal Ditambahkan
const questionaireColumn = [
    {
        header: "No", size: 16, cell: getPageIndex,
        enableSorting: false
    },
    { header: "Nama", accessorKey: "name", size: 200 },
    {
        header: "Jenis Kelamin", accessorKey: "sex", size: 100,
        enableSorting: false
    },
    {
        header: "Nomor HP", accessorKey: "phone", size: 100,
        enableSorting: false
    },
    {
        header: "Status", accessorKey: "status", size: 100,
        enableSorting: false
    },
    {
        header: "Domisili", accessorKey: "villageName", size: 100,
        enableSorting: false
    },
    {
        header: "Kelas Bangunan Usaha", accessorKey: "workClass", size: 200,
        enableSorting: false
    },
    {
        header: "Aksi", size: 100,
        enableSorting: false,
        cell: (ctx: any) => (
            <Group>
                <ActionIcon component={Link} variant="subtle" size="xs" color="blue" to={`/app/data/kuesioner/edit/${ctx?.row?.original?.id}`}><PencilSimple weight="fill" /></ActionIcon>
                <ActionIcon variant="subtle" size="xs" color="red" onClick={() => openContextModal({
                    modal: 'delete-confirm',
                    title: 'Hapus Kuesioner',
                    innerProps: {
                        name: ctx?.row?.getValue('name'),
                        entity: 'kuesioner',
                        onConfirm: async () => {
                            try {
                                await QuestionnaireServices.deleteQuestionnaire(ctx?.row?.original?.id);
                                showNotification({
                                    title: 'Berhasil!',
                                    message: 'Berhasil menhapus data kuesioner',
                                    icon: <Check size={16} />,
                                });
                                queryClient.invalidateQueries();
                            } catch (error) {
                                showNotification({
                                    title: 'Gagal!',
                                    message: 'Gagal menghapus data kuesioner',
                                    color: 'red',
                                    icon: <X size={16} />,
                                });
                            }
                        }
                    }
                })}><Trash weight="fill" /></ActionIcon>
            </Group>
        ),
    }
];

const infraColumn = [
    { header: "No", size: 16, cell: getPageIndex },
    { header: "Desa", accessorKey: "villageName", size: 400 },
    { header: "Indeks", accessorKey: "index", size: 100 },
    { header: "Potensi", accessorKey: "potential", size: 100 },
];

const investasiColumn = [
    { header: "No", size: 16, cell: getPageIndex },
    { header: "Desa", accessorKey: "villageName", size: 400 },
    { header: "Kesiapan Warga", accessorKey: "kesiapanWarga", size: 100, accessorFn: (row: any) => "Rp" + decimalFormatter.format(row.kesiapanWarga) },
    { header: "Kerja Sama", accessorKey: "kerjaSama", size: 100, accessorFn: (row: any) => "Rp" + decimalFormatter.format(row.kerjaSama) },
    { header: "Infrastruktur", accessorKey: "infrastruktur", size: 100, accessorFn: (row: any) => "Rp" + decimalFormatter.format(row.infrastruktur) },
    {
        header: "Aksi", size: 100,
        cell: (ctx: CellContext<any, unknown>) => (
            <Group>
                <ActionIcon
                    variant="subtle"
                    size="xs"
                    color="blue"
                    onClick={() => openContextModal({
                        modal: 'investasi-editor',
                        title: 'Edit Investasi',
                        innerProps: {
                            id: ctx?.row?.original.id,
                            kesiapanWarga: ctx?.row?.original.kesiapanWarga,
                            kerjaSama: ctx?.row?.original.kerjaSama,
                            infrastruktur: ctx?.row?.original.infrastruktur,
                        }
                    })
                    }><PencilSimple weight="fill" /></ActionIcon>
            </Group>
        ),
    }
];

const columnsByID: Record<string, any> = {
    "desa": villageColumn,
    "kuesioner": questionaireColumn,
    "kerjasama": cooperationColumn,
    "infrastruktur": infraColumn,
    "investasi": investasiColumn
};



const DataModule = () => {
    const navigate = useNavigate();
    const mainActionByID: Record<string, any> = {
        "desa": () => openContextModal({
            modal: 'village-editor',
            title: 'Tambah Desa',
            innerProps: {
                desa: '',
                id: '',
            }
        }),
        "kuesioner": () => navigate({ to: '/app/data/kuesioner/tambah' }),
        "kerjasama": () => openContextModal({
            modal: 'cooperation-editor',
            title: 'Tambah Perbandingan Pakar',
            innerProps: {
                name: '',
            }
        }),
        "infrastruktur": (setBackfilling: any) =>
            () => {
                setBackfilling(true);
                AnalysisServices.getBackfill({ type: "infrastructure" });
                return showNotification({ icon: <CheckCircle />, title: "Sukses", message: 'Proses backfill dijadwalkan dalam 10 menit' });
            }
    };

    const { data: { ID } } = useMatch();
    const [state, setState] = useState<Record<string, any>>({});
    const columns = useMemo(() => {
        setState({});
        return columnsByID[ID as string ?? "desa"];
    }, [ID]);


    const { data: { data: dataD, meta: metaD }, isFetching: isFetchD } = useGetVillages(stateToKodesiana(state), ID === "desa");
    const { data: { data: dataQ, meta: metaQ }, isFetching: isFetchQ } = useGetQuesionare(stateToKodesiana(state), ID === "kuesioner");
    const { data: { data: dataP, meta: metaP }, isFetching: isFetchP } = useGetCoop(stateToKodesiana(state), ID === "kerjasama");
    const { data: { data: dataI, meta: metaI }, isFetching: isFetchI } = useGetInfra(stateToKodesiana(state), ID === "infrastruktur");
    const { data: { data: dataIV, meta: metaIV }, isFetching: isFetchIV } = useGetInvestasi(stateToKodesiana(state), ID === "investasi");

    const dataMap: Record<string, any> = {
        "desa": { data: dataD, meta: metaD, isFetch: isFetchD, roles: [ROLE.ADMIN] },
        "kuesioner": { data: dataQ, meta: metaQ, isFetch: isFetchQ, roles: [ROLE.ADMIN, ROLE.WARGA] },
        "kerjasama": { data: dataP, meta: metaP, isFetch: isFetchP, roles: [ROLE.ADMIN, ROLE.PAKAR] },
        "infrastruktur": { data: dataI, meta: metaI, isFetch: isFetchI, roles: [ROLE.ADMIN] },
        "investasi": { data: dataIV, meta: metaIV, isFetch: isFetchIV, roles: [ROLE.ADMIN]},
    };
    const [backfilling, setBackfilling] = useState(false);
    const {
        Component,
    } = useDataTable({
        columns: columns,
        queryHook: {
            data: dataMap[ID as string].data ?? [],
            meta: dataMap[ID as string].meta ?? { page: 1, perPage: 10, total: 0 },
            isFetching: isFetchD || isFetchQ,
        },
        state,
        setState,
    });
    return (
        <Acl roles={dataMap[ID as string].roles}>        
        <TableLayout >
            <TableLayout.Header>

                <SearchBar
                    onClick={(filterQ) => { setState((value) => ({ ...value, q: filterQ, page: 1 })); }}
                />
                <Group>
                    {ID === "infrastruktur"
                        ? <Button leftIcon={<ArrowsClockwise />} disabled={backfilling} onClick={mainActionByID['infrastruktur'](setBackfilling)}>Backfill</Button>
                        : ID !== "investasi" ? <Button leftIcon={<Plus />} onClick={mainActionByID[ID as string]}>Tambah {toTitleCase(ID as string)}</Button> : null
                    }
                </Group>
            </TableLayout.Header>

            <TableLayout.Content>
                {Component}
            </TableLayout.Content>

        </TableLayout>
        </Acl>
    );
};

export default DataModule;