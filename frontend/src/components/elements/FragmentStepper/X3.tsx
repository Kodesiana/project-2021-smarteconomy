import { Card, Container, Group, Radio, Text, Title } from "@mantine/core"
import React from "react"
import InputWrapper from "../InputWrapper"

const X3 = () => {
  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Dukungan Komunitas</Title>
        <Text c="dimmed" size={14}>{"Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi"}</Text>
        <Text>Bagaimana pendapat Bapak/Ibu terkait:</Text>
        {
          [
            {
              key: "x3_54",
              label: "Kemampuan ketua kelompok dalam memimpin kelompok",
            },
            {
              key: "x3_55",
              label:
                "Intensitas pelatihan dan pembinaan kepada anggota kelompok yang dilakukan oleh pemerintah setempat",
            },
            {
              key: "x3_56",
              label:
                "Tingkat partisipasi anggota kelompok dalam pelatihan dan pembinaan",
            },
            {
              key: "x3_57",
              label:
                "Kesesuaian modul pelatihan dengan kebutuhan keterampilan anggota kelompok",
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={name}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text fw={600}>Apakah Bapak/Ibu mendapatkan materi keterampilan:</Text>
        {
          [
            {
              key: "a",
              label: "Kuliner secara profesional",
            },
            {
              key: "b",
              label: "Mengelola keuangan dan pembukuan",
            },
            {
              key: "c",
              label: "Pengembangan wisata kuliner",
            },
            {
              key: "d",
              label: "Pengelolaan homestay (penginapan)",
            },
            {
              key: "e",
              label: "Pembentukan dan pengembangan BUMDes",
            },
            {
              key: "f",
              label: "Pengolahan pupuk",
            },
            {
              key: "g",
              label: "Pengelolaan media tanam pertaniann",
            },
            {
              key: "h",
              label: "Penanganan hama dan penyakit tanaman",
            },
            {
              key: "i",
              label: "Penanganan dan pengemasan hasil panen",
            },
            {
              key: "j",
              label: "Pengolahan produk hasil pertanian",
            },
            {
              key: "k",
              label: "Teknik promosi",
            },
            {
              key: "l",
              label: "Pengembangan pasar secara off-line / on-line",
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <Group position="apart" key={`${name}-${label}`}>
              <InputWrapper
                label={label}
                name={`x3_58${name}_yn`}
                Component={(e: any) => <Radio.Group {...e} spacing="xs">
                  <Radio label="Ya" value="1" />
                  <Radio label="Tidak" value="2" />
                </Radio.Group>}
              />
              <InputWrapper
                name={`x3_58${name}`}
                Component={(e: any) => <Radio.Group {...e} spacing="xs">
                  {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
                </Radio.Group>}
              />
            </Group>
          ))
        }
        <Text>Jenis metode apa yang diberikan?</Text>
        {
          [
            {
              key: "a",
              label: "Metode demonstrasi",
            },
            {
              key: "b",
              label: "Metode kunjungan lapang",
            },
            {
              key: "c",
              label: "Metode pameran",
            },
            {
              key: "d",
              label: "Metode ceramah",
            },
            {
              key: "e",
              label: "Metode pembagian brosur/leaflet/juknis",
            },
            {
              key: "f",
              label: "Metode daring",
            },
            {
              key: "g",
              label: "Pengelolaan media tanam pertaniann",
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <Group position="apart" key={`${name}-${label}`}>
              <InputWrapper
                label={label}
                name={`x3_59${name}_yn`}
                Component={(e: any) => <Radio.Group {...e} spacing="xs">
                  <Radio label="Ya" value="1" />
                  <Radio label="Tidak" value="2" />
                </Radio.Group>}
              />
              <InputWrapper
                name={`x3_59${name}`}
                Component={(e: any) => <Radio.Group {...e} spacing="xs">
                  {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
                </Radio.Group>}
              />
            </Group>
          ))
        }
      </Card>
    </Container>
  )
}

export default X3