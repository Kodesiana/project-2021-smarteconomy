import { Card, Container, Title, Text, Radio } from "@mantine/core"
import InputWrapper from "../InputWrapper"

const Y1 = () => {
  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Keberdayaan</Title>
        <Text c="dimmed" size={14}>{"Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi"}</Text>
        <Text fw={600}>Bagaimana tingkat….. (Adaptasi)</Text>
        {
          [
            {
              key: "a",
              label: "Menyesuaikan diri dengan pemanfaatan TIK",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Bagaimana tingkat kemudahan dalam memanfaatkan TIK untuk usaha Bapak/Ibu?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`y1_60${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text fw={600}>Bagaimana tingkat….. (Mengelola usaha)</Text>
        {
          [
            {
              key: "a",
              label: "Memutar modal usaha Bapak/Ibu?",
            },
            {
              key: "b",
              label: "Memutar modal usaha Bapak/Ibu?",
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`y1_61${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text fw={600}>Bagaimana tingkat….. (Mengelola usaha)</Text>
        {
          [
            {
              key: "a",
              label:
                "Mengambil keputusan sendiri dalam mengelola usaha setelah belajar TIK?",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Mengambil keputusan sendiri pada saat proses sosialisasi program desa cerdas Kabandungan",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`y1_62${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text fw={600}>Bagaimana tingkat….. (Mengelola usaha)</Text>
        {
          [
            {
              key: "a",
              label: "Kemudahan dalam bekerjasama dengan anggota kelompok lainnya?",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Saling bantu-membantu sesama anggota kelompok ketika menghadapi kesulitan ketika menjalankan program desa cerdas Kabandungan?",
              isOther: false,
            },
            {
              key: "c",
              label:
                "Saling bantu-membantu sesama anggota kelompok dalam menjalankan usaha setelah program desa cerdas Kabandungan sudah berjalan?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`y1_63${name}`}
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

export default Y1