import dataTable from "@/components/elements/data-table";
import { useDataTable } from "@/components/elements/data-table/useDataTable";
import SearchBar from "@/components/elements/search-bar/SearchBar";
import TableLayout from "@/components/layout/table/TableLayout";
import { Group, Button, Pagination, ActionIcon } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { LockKeyOpen, PencilSimple, Plus, Trash } from "phosphor-react";
import { useMemo, useState } from "react";
import InProgressNotification from "../../../elements/in-progress-card/InProgress";
import client from "@/utils/apiClient";
import { useGetUsers } from "@/services/queries";
import { useSearch, useNavigate } from "@tanstack/react-location";
import FormModal from "./FormModal";
import { stateToKodesiana } from "@/utils/queryParams";

const instance = client({});

const UsersModule = () => {

    const { Component: FormModalComponent, setOpened, handleDelete, handleOpenModalPassword } = FormModal({});

    const {  page = 1, page_size = 10,  q = "" } = useSearch<any>();

    const [state, setState] = useState<any>({
        pagination: {
            pageIndex: page - 1,
            pageSize: page_size
        }
    });

    const navigate = useNavigate();

    const { data: { data, meta }, isFetching } = useGetUsers(stateToKodesiana(state));
    const columns = useMemo(() => [
        {
            header: "No",
            cell: ({ row }: any) => row.index + 1,

            size: 16,
        },
        {
            header: "Nama Lengkap",
            size: 300,
            accessorKey: "fullName"

        },
        {
            header: "Username",
            size: 300,
            accessorKey: "username"
        },
        {
            header: "Hak Akses",
            size: 300,
            accessorKey: "role"
        },
        {
            header: 'Aksi',
            size: 300,
            enableSorting: false,
            cell: ({ row: { original } }: any) =>
                <Group>
                    <ActionIcon
                        onClick={() => setOpened(original)}
                        color="#1C7ED6"
                        radius={8}
                        sx={{
                            backgroundColor: '#E9ECEF',
                            color: '#1C7ED6'
                        }}
                    >
                        <PencilSimple weight="fill" />
                    </ActionIcon>
                    <ActionIcon
                        color="#2C2E33"
                        radius={8}
                        sx={{
                            color: '#2C2E33',
                            backgroundColor: '#E9ECEF'
                        }}
                        onClick={() => handleOpenModalPassword(original)}

                    >
                        <LockKeyOpen weight="fill" />
                    </ActionIcon>
                    <ActionIcon
                        color="red.7"
                        radius={8}
                        sx={{
                            backgroundColor: '#E9ECEF'
                        }}
                        onClick={() => handleDelete({ id: original.id })}
                    >
                        <Trash weight="fill" />
                    </ActionIcon>
                </Group>
            ,
        },
    ], []);
    const {
        Component,
    } = useDataTable({
        columns,
        queryHook: {
            data: data ?? [],
            meta: meta ?? { page: 1, perPage: 10, total: 0 },
            isFetching,
        },
        state,
        setState,
    });
    return (
        <TableLayout >
            <TableLayout.Header>
                <SearchBar
                    onClick={(filterQ) => { setState((value: any) => ({ ...value, q: filterQ })); }}/>

                <Group>
                    <Button leftIcon={<Plus />} onClick={() => setOpened({})}>Tambah Pengguna</Button>
                </Group>
            </TableLayout.Header>

            <TableLayout.Content>
                {Component}
            </TableLayout.Content>

            <TableLayout.Footer>
                {/* Menampilkan x-x dari y data.

                <div  >
                    <Pagination total={10} />
                </div> */}
            </TableLayout.Footer>
            {FormModalComponent}
        </TableLayout>
    );
};

export default UsersModule;