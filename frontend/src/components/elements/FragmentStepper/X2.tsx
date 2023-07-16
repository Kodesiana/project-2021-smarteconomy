import { Card, Container, Radio, Select, Text, TextInput, Title } from "@mantine/core"
import { useCallback } from "react"
import InputWrapper from "../InputWrapper"

const X2 = () => {

  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Lingkungan</Title>
        <Text c="dimmed" size={14}>{"Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi"}</Text>
        <Text>Bagaimana pendapat Bapak/Ibu terkait:</Text>
        {
          [
            {
              name: "x2_48",
              label:
                "Iuran internet atau iuran kegiatan terkait desa cerdas yang diberlakukan pada masing-masing komunitas",
            },
            {
              name: "x2_49",
              label:
                "Kemudahan informasi yang dibutuhkan dalam pengelolaan usaha melalui komunitas",
            },
            {
              name: "x2_50",
              label:
                "Penerimaan warga desa dalam mengadopsi TIK untuk pengembangan usaha melalui bantuan komunitas",
            },
            {
              name: "x2_51",
              label:
                "Kemampuan keterampilan teknisi komunitas dalam memperbaiki gangguan internet di lokasi usaha Bapak/Ibu",
            },
            {
              name: "x2_52",
              label: "Keterjangkauan biaya listrik setelah menggunakan TIK",
            },
            {
              name: "x2_53",
              label:
                "Kemudahan informasi yang dibutuhkan saat ada gangguan perangkat TIK/internet yang difasilitasi komunitas",
            },
          ].map(({name, label}: { name: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={name}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio key={`${name}-${label}-${i}`} label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }

      </Card>
    </Container>
  )
}

export default X2