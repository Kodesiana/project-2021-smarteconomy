import { Card, Container, Radio, Select, TextInput, Title } from "@mantine/core"
import { useCallback } from "react"
import InputWrapper from "../InputWrapper"

type X0Props = {
  data: any[];
}

const findData = ({ name, data }: { name: string, data: any[] }) =>  {
  const result = data?.find(({ name: n }: { name: any }) => n === name) ?? {} as any;
  return result?.options ?? []
}

const X0 = ({ data }: X0Props) => {

  const handleFindData = useCallback(({ name }: { name: string }) => 
    findData({ name, data }),[data]);

  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Biodata</Title>
        <InputWrapper
          name="x0_nama"
          label="Nama lengkap"
          Component={TextInput}
          required
          placeholder="Nama Lengkap"
        />
        <InputWrapper
          name="x0_jenis_kelamin"
          label="Jenis Kelamin"
          Component={(e: any) => <Radio.Group {...e} orientation="vertical" spacing="xs">
            {handleFindData({ name: 'x0_jenis_kelamin' })
              ?.map((a: any) => (
                <Radio key={`${a.label}-${a.value}`} {...a} />
              ))}
          </Radio.Group>}
          required
        />
        <InputWrapper
          name="x0_no_hp"
          label="No. HP"
          Component={TextInput}
          required
          placeholder="No. HP"
        />
        <InputWrapper
          name="x0_domisili"
          label="Domisili"
          Component={(e: any) => (
            <Select
              {...e}
              data={handleFindData({ name: 'x0_domisili' })
                ?.map(({ Label: label, Value: value }: any) => ({ value, label }))}
              placeholder="Domisili"
            />
          )}
          required
        />
        <InputWrapper
          name="x0_status_di_kelompok"
          label="Status Kelompok"
          Component={(e: any) => (
            <Select
              {...e}
              data={handleFindData({ name: 'x0_status_di_kelompok' })
                ?.map(({ label, value }: any) => ({ value, label }))}
              placeholder="Status Kelompok"
            />
          )}
          required
        />
        <InputWrapper
          name="x0_kelas_bangunan_usaha"
          label="Kelas Bangunan Usaha"
          Component={TextInput}
          required
          placeholder="Kelas Bangunan Usaha"
        />
      </Card>
    </Container>
  )
}

export default X0