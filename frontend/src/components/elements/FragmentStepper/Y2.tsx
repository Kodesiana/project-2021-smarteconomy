import { Card, Container, Title, Text, Radio, SimpleGrid } from "@mantine/core"
import React from "react"
import InputWrapper from "../InputWrapper"

const BeforeAfter = ({ name, label, desc }: { name: string; label?: string; desc?: string }) => {
  return (
    <InputWrapper
      key={`${name}-${label}`}
      label={label}
      name={`${name}`}
      desc={desc}
      mt="auto"
      Component={(e: any) => <Radio.Group {...e} spacing="xs">
        {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
      </Radio.Group>}
    />
  )
}

const Y2 = () => {
  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Smart Economy</Title>
        <Text c="dimmed" size={14}>{"Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi"}</Text>
        <Text fw={600} mt={24}>Bagaimana pendapat Bapak/Ibu tentang... (Infrastruktur)</Text>
        <SimpleGrid cols={2}>
          {
            [
              {
                key: "y2_73",
                label: "Kemampuan mengakses teknologi di desa",
                isOther: false,
              },
              {
                key: "y2_74",
                label: "Kemampuan mengakses internet di desa",
                isOther: false,
              },
              {
                key: "y2_75",
                label: "Kemampuan mengakses TIK di desa",
                isOther: false,
              },
              {
                key: "y2_76",
                label: "Kemampuan mengakses fasilitas edukasi/pelatihan/R & D",
                isOther: false,
              },
              {
                key: "y2_77",
                label: "Kemampuan mengakses listrik",
                isOther: false,
              },
              {
                key: "y2_78",
                label: "Kemampuan mengakses air bersih",
                isOther: false,
              },
              {
                key: "y2_79",
                label: "Kemampuan mengakses infrastruktur jalan raya",
                isOther: false,
              },
              {
                key: "y2_80",
                label: "Kemampuan melaporkan kendala teknologi kepada komunitas",
                isOther: false,
              },
              {
                key: "y2_81",
                label: "Kemampuan melaporkan kendala internet kepada komunitas",
                isOther: false,
              },
              {
                key: "y2_82",
                label: "Kemampuan melaporkan kendala TIK kepada komunitas",
                isOther: false,
              },
              {
                key: "y2_83",
                label:
                  "Kemampuan melaporkan kendala edukasi / pelatihan / R & D kepada komunitas",
                isOther: false,
              },
              {
                key: "y2_84",
                label: "Kemampuan melaporkan kendala listrik kepada komunitas",
                isOther: false,
              },
              {
                key: "y2_85",
                label: "Kemampuan melaporkan kendala air bersih kepada komunitas",
                isOther: false,
              },
              {
                key: "y2_86",
                label: "Kemampuan melaporkan kendala jalan raya kepada komunitas",
                isOther: false,
              },
              {
                key: "y2_87",
                label:
                  "Kemampuan melaporkan kendala teknologi kepada pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_88",
                label:
                  "Kemampuan melaporkan kendala internet kepada pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_89",
                label:
                  "Kemampuan melaporkan kendala TIK kepada pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_90",
                label:
                  "Kemampuan melaporkan kendala edukasi / pelatihan / R & D kepada pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_91",
                label:
                  "Kemampuan melaporkan kendala listrik kepada pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_92",
                label:
                  "Kemampuan melaporkan kendala air bersih kepada pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_93",
                label:
                  "Kemampuan melaporkan kendala jalan raya kepada pemerintah desa / daerah",
                isOther: false,
              }
            ].map(({ key: name, label }) => (
              <React.Fragment key={`${label}-${name}`}>
                <BeforeAfter label={label} name={`${name}a`} desc="Sebelum Ada Desa Cerdas" />
                <BeforeAfter name={`${name}b`} desc="Sesudah Ada Desa Cerdas"  />
              </React.Fragment>
            ))
          }
        </SimpleGrid>
        <Text>Bagaimana pendapat Bapak/Ibu tentang… (Ekonomi)</Text>
        <SimpleGrid cols={2}>
          {
            [
              {
                key: "y2_94",
                label: "Ragam peluang usaha di desa?",
                isOther: false,
              },
              {
                key: "y2_95",
                label: "Ragam peluang usaha (start-up) berbasis TIK di desa?",
                isOther: false,
              },
              {
                key: "y2_96",
                label: "Kemampuan mengakses modal usaha",
                isOther: false,
              },
              {
                key: "y2_97",
                label: "Kemampuan mengakses modal usaha berbasis TIK",
                isOther: false,
              },
              {
                key: "y2_98",
                label: "Kemampuan mengakses modal usaha berbantuan komunitas",
                isOther: false,
              },
              {
                key: "y2_99",
                label:
                  "Kemampuan mengakses modal usaha berbantuan pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_100",
                label:
                  "Kemampuan mengakses portal pertanian / peternakan / bisnis lainnya berbantuan komunitas",
                isOther: false,
              },
              {
                key: "y2_101",
                label:
                  "Kemampuan mengakses portal pertanian / peternakan / bisnis lainnya berbantuan pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_102",
                label:
                  "Kemampuan mengakses portal pertanian / peternakan / bisnis lainnya mandiri",
                isOther: false,
              },
              {
                key: "y2_103",
                label: "Kemampuan penyerapan tenaga kerja berbantuan komunitas",
                isOther: false,
              },
              {
                key: "y2_104",
                label:
                  "Kemampuan penyerapan tenaga kerja berbantuan pemerintah desa / daerah",
                isOther: false,
              },
              {
                key: "y2_105",
                label: "Kemampuan penyerapan tenaga kerja secara mandiri",
                isOther: false,
              },
            ].map(({ key: name, label }) => (
              <React.Fragment key={`${label}-${name}`}>
                <BeforeAfter label={label} name={`${name}a`} desc="Sebelum Ada Desa Cerdas" />
                <BeforeAfter name={`${name}b`} desc="Sesudah Ada Desa Cerdas" />
              </React.Fragment>
            ))
          }

        </SimpleGrid>
        <Text>Bagaimana pendapat Bapak/Ibu tentang… (Sosial)</Text>
        <SimpleGrid cols={2}>
          {
            [
              {
                key: "y2_106",
                label:
                  "Tingkat partisipasi pemuda di sekitar lingkungan rumah dalam pengembangan usaha",
                isOther: false,
              },
              {
                key: "y2_107",
                label:
                  "Tingkat partisipasi siswa SMA di sekitar lingkungan rumah dalam pengembangan usaha",
                isOther: false,
              },
              {
                key: "y2_108",
                label:
                  "Tingkat partisipasi siswa SMP di sekitar lingkungan rumah dalam pengembangan usaha",
                isOther: false,
              },
              {
                key: "y2_109",
                label:
                  "Tingkat partisipasi SD di sekitar lingkungan rumah dalam pengembangan usaha",
                isOther: false,
              },
              {
                key: "y2_110",
                label:
                  "Tingkat partisipasi ibu-ibu di sekitar lingkungan rumah dalam pengembangan usaha",
                isOther: false,
              },
              {
                key: "y2_111",
                label: "Tingkat partisipasi komunitas dalam menjaga tradisi budaya",
                isOther: false,
              },
              {
                key: "y2_112",
                label:
                  "Tingkat partisipasi pemerintah desa / daerah dalam menjaga tradisi budaya",
                isOther: false,
              },
              {
                key: "y2_113",
                label:
                  "Tingkat partisipasi anda di sekitar lingkungan rumah dalam menjaga tradisi budaya",
                isOther: false,
              },
              {
                key: "y2_114",
                label:
                  "Tingkat partisipasi pemuda di sekitar lingkungan rumah dalam menjaga tradisi budaya",
                isOther: false,
              },
              {
                key: "y2_115",
                label:
                  "Tingkat partisipasi siswa SMA di sekitar lingkungan rumah dalam menjaga tradisi budaya",
                isOther: false,
              },
              {
                key: "y2_116",
                label:
                  "Tingkat partisipasi siswa SMP di sekitar lingkungan rumah dalam menjaga tradisi budaya",
                isOther: false,
              },
              {
                key: "y2_117",
                label:
                  "Tingkat partisipasi siswa SMP di sekitar lingkungan rumah dalam menjaga tradisi budaya",
                isOther: false,
              },
              {
                key: "y2_118",
                label:
                  "Tingkat partisipasi siswa SMP di sekitar lingkungan rumah dalam menjaga tradisi budaya",
                isOther: false,
              },
            ].map(({ key: name, label }) => (
              <React.Fragment key={`${label}-${name}`}>
                <BeforeAfter label={label} name={`${name}a`} desc="Sebelum Ada Desa Cerdas" />
                <BeforeAfter name={`${name}b`} desc="Sesudah Ada Desa Cerdas" />
              </React.Fragment>
            ))
          }

        </SimpleGrid>
      </Card>
    </Container>
  )
}

export default Y2