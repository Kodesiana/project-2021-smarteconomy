import { Card, Container, Radio, Select, Text, TextInput, Title } from "@mantine/core"
import { useCallback } from "react"
import InputWrapper from "../InputWrapper"

const X4 = () => {
  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Kewirausahaan</Title>
        <Text c="dimmed" size={14}>{"Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi"}</Text>
        <Text fw={600}>Bagaimana tingkat….. (Kemampuan kewirausahaan)</Text>
        {
          [
            {
              key: "a",
              label: "Kemampuan wirausaha dengan pemanfaatan jasa koperasi",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Bagaimana tingkat kemudahan mengakses modal usaha berbasis TIK dengan bantuan komunitas?",
              isOther: false,
            },
            {
              key: "c",
              label:
                "Bagaimana kemampuan pengembangan wirausaha berbasis TIK melalui bantuan pemerintah?",
              isOther: false,
            },
            {
              key: "d",
              label:
                "Bagaimana kemampuan pengembangan wirausaha berbasis TIK melalui bantuan komunitas?",
              isOther: false,
            },
            {
              key: "e",
              label:
                "Bagaimana kemampuan pengembangan wirausaha berbasis TIK mandiri?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x4_64${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text>Bagaimana tingkat….. (Kemampuan promosi)</Text>
        {
          [
            {
              key: "a",
              label: "Kemampuan promosi dengan pemanfaatan jasa koperasi",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Bagaimana tingkat kemudahan mengakses media promosi berbasis TIK dengan bantuan komunitas?",
              isOther: false,
            },
            {
              key: "c",
              label:
                "Bagaimana kemampuan promosi berbasis TIK melalui bantuan pemerintah?",
              isOther: false,
            },
            {
              key: "d",
              label: "Bagaimana kemampuan promosi berbasis TIK mandiri?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x4_65${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text>Bagaimana tingkat….. (Produktivitas)</Text>
        {
          [
            {
              key: "a",
              label: "Kemampuan produktivitas usaha dengan pemanfaatan jasa koperasi",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Bagaimana tingkat produktivitas berbasis TIK bantuan komunitas?",
              isOther: false,
            },
            {
              key: "c",
              label:
                "Bagaimana tingkat produktivitas berbasis TIK melalui bantuan pemerintah?",
              isOther: false,
            },
            {
              key: "d",
              label: "Bagaimana tingkat produktivitas berbasis TIK mandiri?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x4_66${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text>Bagaimana tingkat….. (Akses tenaga kerja)</Text>
        {
          [
            {
              key: "a",
              label:
                "Kemampuan pengembangan wirausaha dengan menjangkau akses ke multi aktor melalui pemanfaatan jasa koperasi",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Bagaimana tingkat pengembangan wirausaha dengan menjangkau akses ke multi aktor dengan berbasis TIK dengan bantuan komunitas?",
              isOther: false,
            },
            {
              key: "c",
              label:
                "Bagaimana tingkat pengembangan wirausaha dengan menjangkau akses ke multi aktor dengan berbasis TIK dengan bantuan pemerintah?",
              isOther: false,
            },
            {
              key: "d",
              label:
                "Bagaimana tingkat pengembangan wirausaha dengan menjangkau akses ke multi aktor dengan berbasis TIK melalui usaha mandiri?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x4_67${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }      
      </Card>
    </Container>
  )
}

export default X4