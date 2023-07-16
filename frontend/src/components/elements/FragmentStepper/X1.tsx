import { Button, Card, Container, Group, Radio, Select, Text, Textarea, TextInput, Title } from "@mantine/core"
import { useCallback } from "react"
import InputWrapper from "../InputWrapper"

type X1Props = {
  data: any[];
}

const findData = ({ name, data }: { name: string, data: any[] }) => {
  const result = data?.find(({ name: n }: { name: any }) => n === name) ?? {} as any;
  return result?.options ?? []
}

const X1 = ({ data }: X1Props) => {

  const handleFindData = useCallback(({ name }: { name: string }) =>
    findData({ name, data }), [data]);

  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Karakter Warga</Title>
        <InputWrapper
          name="x1_4"
          label="Pekerjaan yang dilakukan oleh bapak"
          Component={(e: any) => <Radio.Group {...e} orientation="vertical" spacing="xs">
            {handleFindData({ name: 'x1_4' })
              ?.map((a: any) => (
                <Radio key={`${a.label}-${a.value}`} {...a} />
              ))}
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_19"
          label="Status kepemilikan ternak"
          Component={(e: any) => <Radio.Group {...e} orientation="vertical" spacing="xs">
            {handleFindData({ name: 'x1_19' })
              ?.map((a: any) => (
                <Radio key={`${a.label}-${a.value}`} {...a} />
              ))}
          </Radio.Group>}
        />
        <Text fw={600}>Sebutkan pengeluaran yang dikeluarkan oleh bapak/ibu dalam satu hari</Text>
        <InputWrapper
          name="x1_29_1"
          label="Bahan Baku"
          Component={TextInput}
          placeholder="Bahan Baku"
        />
        <InputWrapper
          name="x1_29_2"
          label="Bensin"
          Component={TextInput}
          placeholder="Bensin"
        />
        <InputWrapper
          name="x1_29_3"
          label="Tenaga kerja (/orang)"
          Component={TextInput}
          placeholder="Tenaga kerja (/orang)"
        />
        <InputWrapper
          name="x1_29_4"
          label="Lainnya"
          Component={TextInput}
          placeholder="Lainnya"
        />
        <Text fw={600}>
          Sebutkan pengeluaran yang dikeluarkan oleh bapak/ibu dalam satu bulan
        </Text>
        <InputWrapper
          name="x1_30_1"
          label="Air"
          Component={TextInput}          
          placeholder="Air"
        />
        <InputWrapper
          name="x1_30_2"
          label="Listrik"
          Component={TextInput}
          placeholder="Air"
        />
        <InputWrapper
          name="x1_30_3"
          label="Tenaga kerja (/orang)"
          Component={TextInput}
          placeholder="Tenaga kerja (/orang)"
        />
        <InputWrapper
          name="x1_30_4"
          label="Lainnya"
          Component={TextInput}
          placeholder="Lainnya"
        />
        <Text fw={600}>Apa motivasi bapak/ibu mau berpartisipasi pada Desa Cerdas Kebandungan?</Text>
        <InputWrapper
          name="x1_36a"
          label="Sadar akan kebutuhan TIK untuk pengelolaan kegiatan pertanian dan Usaha Mikro Kecil Menengah (UMKM)"
          Component={(e: any) => <Radio.Group {...e}  spacing="xs">
            <Radio label="Ya" value="1" />
            <Radio label="Tidak" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_36b"
          label="Sadar akan kebutuhan kerjasama dengan pihak bank, atau marketplace pertanian"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Ya" value="1" />
            <Radio label="Tidak" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_36d"
          label="Tahu bahwa direncanakan akan dikembangkan lokasi pariwisata di Kabandungan"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Ya" value="1" />
            <Radio label="Tidak" value="2" />
          </Radio.Group>}
        />
        <Text fw={600}>Berdasarkan pengalaman Bapak/Ibu, apakah pemanfaatan TIK bisa digunakan untuk melakukan kegiatan berikut:</Text>
        <InputWrapper
          name="x1_39b"
          label="Membuka lapangan pekerjaan di desa"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Bisa" value="1" />
            <Radio label="Tidak Bisa" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_39c"
          label="Menambah penghasilan"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Bisa" value="1" />
            <Radio label="Tidak Bisa" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_39d"
          label="Memberdayakan warga desa"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Bisa" value="1" />
            <Radio label="Tidak Bisa" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_39e"
          label="Mendatangkan orang luar desa berkunjung ke desa"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Bisa" value="1" />
            <Radio label="Tidak Bisa" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_39f"
          label="Membuka akses pasar"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Bisa" value="1" />
            <Radio label="Tidak Bisa" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_39g"
          label="Mempromosikan komoditas dan produk-produk Kabandungan Kab Sukabumi"
          Component={(e: any) => <Radio.Group {...e} spacing="xs">
            <Radio label="Bisa" value="1" />
            <Radio label="Tidak Bisa" value="2" />
          </Radio.Group>}
        />
        <Text fw={600}>
          Sebutkan pengeluaran yang dikeluarkan oleh bapak/ibu dalam satu hari
        </Text>
        <InputWrapper
          name="x1_41_tahun"
          label="Berapa tahun?"
          Component={TextInput}
          placeholder="Tahun"
        />
        <InputWrapper
          name="x1_41_alasan"
          label="Alasannya?"
          Component={Textarea}
          placeholder="Alasannya?"
        />
        <Text fw={600}>Apakah Bapak/Ibu pernah mencari informasi seputar desa cerdas?</Text>
        {[
          {
            key: "a",
            label: "Aparat desa",
            isOther: false,
          },
          {
            key: "b",
            label: "Tokoh masyarakat setempat",
            isOther: false,
          },
          {
            key: "c",
            label: "Pemda kabupaten ke Kabandungan",
            isOther: false,
          },
          {
            key: "d",
            label: "Pemerintah pusat pada saat kunjungan ke Kabandungan",
            isOther: false,
          },
          {
            key: "e",
            label: "Lainnya",
            isOther: true,
          },
        ]
          .map(({ key, label },i) => (
            <GroupKarakterWarga name={key} label={label} key={`${key}-${i}-${label}`} />
          ))}
      </Card>
    </Container>
  )
}

export default X1

const GroupKarakterWarga = ({ name, label }: any) => {
  return (
    <>
      {label && name !== 'e' && <Text>{label}</Text>}
      {name === 'e' && (
        <InputWrapper
          name={`x1_41${name}_lainnya`}
          Component={TextInput}
          placeholder="Lainnya"
        />
      )}
      <Group spacing="xs" position="apart" mt="sm">
        <InputWrapper
          name={`x1_41${name}`}
          Component={(e: any) => <Radio.Group {...e} spacing="xs" style={{ marginTop: -10 }}>
            <Radio label="Bisa" value="1" />
            <Radio label="Tidak Bisa" value="2" />
          </Radio.Group>}
        />
        <InputWrapper
          name={`x1_41${name}_frekuensi`}
          Component={TextInput}
          placeholder="Frekuensi"
        />
        <InputWrapper
          name={`x1_41${name}_info`}
          Component={TextInput}
          placeholder="Informasi yang dicari"
        />
      </Group>
    </>
  )
}