import { Card, Container, Radio, Select, Text, TextInput, Title } from "@mantine/core"
import { useCallback } from "react"
import InputWrapper from "../InputWrapper"

const X5 = () => {
  return (
    <Container size="sm">
      <Card>
        <Title order={5}>Inovasi</Title>
        <Text c="dimmed" size={14}>{"Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi"}</Text>
        <Text fw={600}>Bagaimana tingkat….. (Semangat Inovasi)</Text>
        {
          [
            {
              key: "b",
              label: "Bagaimana tingkat semangat inovasi karyawan?",
              isOther: false,
            },
            {
              key: "d",
              label:
                "Bagaimana tingkat semangat pemilik usaha untuk memanfaatkan TIK dalam berinovasi?",
              isOther: false,
            },
            {
              key: "e",
              label:
                "Bagaimana tingkat semangat karyawan untuk memanfaatkan TIK dalam berinovasi?",
              isOther: false,
            },
            {
              key: "f_1",
              label:
                "Bagaimana tingkat peranan keluarga dalam memotivasi pemilik usaha untuk berinovasi? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "f_2",
              label:
                "Bagaimana tingkat peranan keluarga dalam memotivasi pemilik usaha untuk berinovasi? (Peran anak)",
              isOther: false,
            },
            {
              key: "f_3",
              label:
                "Bagaimana tingkat peranan keluarga dalam memotivasi pemilik usaha untuk berinovasi? (Anggota keluarga lainnya)",
              isOther: false,
            },
            {
              key: "h_1",
              label:
                "Bagaimana tingkat peranan keluarga dalam memotivasi pemilik usaha untuk berinovasi berbasis TIK? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "h_2",
              label:
                "Bagaimana tingkat peranan keluarga dalam memotivasi pemilik usaha untuk berinovasi berbasis TIK? (Peran anak)",
              isOther: false,
            },
            {
              key: "h_3",
              label:
                "Bagaimana tingkat peranan keluarga dalam memotivasi pemilik usaha untuk berinovasi berbasis TIK? (Anggota keluarga lain)",
              isOther: false,
            },
            {
              key: "m",
              label:
                "Bagaimana tingkat peranan instansi swasta dalam memotivasi pemilik usaha untuk berinovasi?",
              isOther: false,
            },
            {
              key: "n",
              label:
                "Bagaimana tingkat peranan instansi swasta dalam memotivasi pemilik usaha untuk berinovasi berbasis TIK?",
              isOther: false,
            },
            {
              key: "o",
              label:
                "Bagaimana tingkat peranan institiusi pendidikan tinggi dalam memotivasi pemilik usaha untuk berinovasi?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x5_69${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text>Bagaimana tingkat….. (Kemampuan inovasi)</Text>
        {
          [
            {
              key: "a",
              label: "Bagaimana tingkat kemampuan inovasi pemilik usaha?",
              isOther: false,
            },
            {
              key: "b",
              label: "Bagaimana tingkat kemampuan inovasi karyawan?",
              isOther: false,
            },
            {
              key: "c",
              label:
                "Bagaimana tingkat kemampuan pemilik usaha untuk memanfaatkan TIK dalam berinovasi?",
              isOther: false,
            },
            {
              key: "d",
              label:
                "Bagaimana tingkat kemampuan karyawan untuk memanfaatkan TIK dalam berinovasi?",
              isOther: false,
            },
            {
              key: "e_1",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam berinovasi untuk membantu pengembangan usaha? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "e_2",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam berinovasi untuk membantu pengembangan usaha? (Peran anak)",
              isOther: false,
            },
            {
              key: "e_3",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam berinovasi untuk membantu pengembangan usaha? (Anggota keluarga lainnya)",
              isOther: false,
            },
            {
              key: "f_1",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam berinovasi berbasis TIK untuk membantu pengembangan usaha? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "f_2",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam berinovasi berbasis TIK untuk membantu pengembangan usaha? (Peran anak)",
              isOther: false,
            },
            {
              key: "f_3",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam berinovasi berbasis TIK untuk membantu pengembangan usaha? (Anggota keluarga lain)",
              isOther: false,
            },
            {
              key: "g",
              label:
                "Bagaimana tingkat kemampuan komunitas dalam berinovasi untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "h",
              label:
                "Bagaimana tingkat kemampuan komunitas dalam berinovasi berbasis TIK untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "i",
              label:
                "Bagaimana tingkat kemampuan pemerintah desa/daerah dalam berinovasi untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "j",
              label:
                "Bagaimana tingkat kemampuan pemerintah desa/daerah dalam berinovasi berbasis TIK untuk mendukung pengembangan usaha?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x5_70${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text>Bagaimana tingkat….. (Kemampuan transformasi)</Text>
        {
          [
            {
              key: "a",
              label: "Bagaimana tingkat kemampuan transformasi pemilik usaha?",
              isOther: false,
            },
            {
              key: "b",
              label: "Bagaimana tingkat kemampuan transformasi karyawan?",
              isOther: false,
            },
            {
              key: "c",
              label:
                "Bagaimana tingkat kemampuan pemilik usaha untuk memanfaatkan TIK dalam bertrasnformasi?",
              isOther: false,
            },
            {
              key: "d",
              label:
                "Bagaimana tingkat kemampuan karyawan untuk memanfaatkan TIK dalam bertransformasi?",
              isOther: false,
            },
            {
              key: "e_1",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam bertransformasi untuk membantu pengembangan usaha? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "e_2",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam bertransformasi untuk membantu pengembangan usaha? (Peran anak)",
              isOther: false,
            },
            {
              key: "e_3",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam bertransformasi untuk membantu pengembangan usaha? (Anggota keluarga lain)",
              isOther: false,
            },
            {
              key: "f_1",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam bertransformasi berbasis TIK untuk membantu pengembangan usaha? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "f_2",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam bertransformasi berbasis TIK untuk membantu pengembangan usaha? (Peran anak)",
              isOther: false,
            },
            {
              key: "f_3",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam bertransformasi berbasis TIK untuk membantu pengembangan usaha? (Anggota keluarga lain)",
              isOther: false,
            },
            {
              key: "g",
              label:
                "Bagaimana tingkat kemampuan komunitas dalam bertransformasi untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "h",
              label:
                "Bagaimana tingkat kemampuan komunitas dalam bertransformasi berbasis TIK untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "i",
              label:
                "Bagaimana tingkat kemampuan pemerintah desa/daerah dalam bertransformasi untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "j",
              label:
                "Bagaimana tingkat kemampuan pemerintah desa/daerah dalam bertransformasi berbasis TIK untuk mendukung pengembangan usaha?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x5_71${name}`}
              Component={(e: any) => <Radio.Group {...e} spacing="xs">
                {['1','2','3','4','5'].map((i) => <Radio label={i} value={i} />)}
              </Radio.Group>}
            />
          ))
        }
        <Text>Bagaimana tingkat….. (Kemampuan akses dana riset)</Text>
        {
          [
            {
              key: "a",
              label:
                "Bagaimana tingkat kemampuan pemilik usaha dalam mengaskes dana riset?",
              isOther: false,
            },
            {
              key: "b",
              label:
                "Bagaimana tingkat kemampuan pemilik usaha untuk memanfaatkan TIK dalam mengakses dana riset?",
              isOther: false,
            },
            {
              key: "c_1",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam mengakses dana riset untuk membantu pengembangan usaha? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "c_2",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam mengakses dana riset untuk membantu pengembangan usaha? (Peran anak)",
              isOther: false,
            },
            {
              key: "c_3",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam mengakses dana riset untuk membantu pengembangan usaha? (Angota keluarga lain)",
              isOther: false,
            },
            {
              key: "d_1",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam memanfaatkan TIK untuk mengakses dana riset pada pengembangan usaha? (Peran istri/suami)",
              isOther: false,
            },
            {
              key: "d_2",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam memanfaatkan TIK untuk mengakses dana riset pada pengembangan usaha? (Peran anak)",
              isOther: false,
            },
            {
              key: "d_3",
              label:
                "Bagaimana tingkat kemampuan keluarga dalam memanfaatkan TIK untuk mengakses dana riset pada pengembangan usaha? (Anggota keluarga lain)",
              isOther: false,
            },
            {
              key: "e",
              label:
                "Bagaimana tingkat kemampuan komunitas dalam mengakses dana riset untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "f",
              label:
                "Bagaimana tingkat kemampuan komunitas memanfaatkan TIK dalam mengakses dana riset untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "g",
              label:
                "Bagaimana tingkat kemampuan pemerintah desa/daerah dalam mengakses dana riset untuk mendukung pengembangan usaha?",
              isOther: false,
            },
            {
              key: "h",
              label:
                "Bagaimana tingkat kemampuan pemerintah desa/daerah memanfaatkan TIK dalam mengakses dana riset untuk mendukung pengembangan usaha?",
              isOther: false,
            },
          ].map(({ key: name, label }: { key: string, label: string }) => (
            <InputWrapper
              key={`${name}-${label}`}
              label={label}
              name={`x5_72${name}`}
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

export default X5