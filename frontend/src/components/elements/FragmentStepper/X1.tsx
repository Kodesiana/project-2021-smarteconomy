import { Button, Card, Container, Group, NumberInput, Radio, Select, Table, Text, Textarea, TextInput, Title } from "@mantine/core"
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
          name="x1_1_i"
          label="Usia"
          Component={NumberInput}
        />
        <Text fw={600}>Pendidikan formal terakhir</Text>
        <InputWrapper
          name="X1_2a_i"
          Component={(e: any) => <Radio.Group {...e} orientation="vertical" spacing="xs">
            {[
              {
                label: 'SD',
                value: '1'
              },
              {
                label: 'SMP',
                value: '2'
              },
              {
                label: 'SMA',
                value: '3'
              },
              {
                label: 'Perguruan Tinggi',
                value: '4'
              }
            ].map(({ label, value }) => (
                <Radio key={`${label}-${value}`} label={label} value={value} />
              ))}
          </Radio.Group>}
        />
        <InputWrapper
          name="X1_2b_i"
          Component={(e: any) => <Radio.Group {...e} orientation="vertical" spacing="xs">
            {[
              {
                label: 'Tamat',
                value: '1'
              },
              {
                label: 'Tidak Tamat',
                value: '2'
              },
            ].map(({ label, value }) => (
              <Radio key={`${label}-${value}`} label={label} value={value} />
            ))}
          </Radio.Group>}
        />
        <InputWrapper
          name="x1_1_i"
          label="Jika tidak tamat"
          placeholder="Tahun"
          Component={NumberInput}
        />

        <Text fw={600}>Pelatihan yang pernah Bapak/Ibu ikuti terkait pemberdayaan masyarakat, sebutkan</Text>      

        <Table>
          <thead>
            <tr>
              <th>Tahun</th>
              <th>Nama pelatihan</th>
              <th>Penyelenggara</th>
              <th>Jumlah jam pertemuan</th>
              <th>Metode</th>
            </tr>
          </thead>
          <tbody>
            {[...new Array(4)]
              .map((_,i) => (
                <tr>
                  <td>
                    <InputWrapper
                      name={`x1_3a_${i+1}_i`}
                      Component={NumberInput}
                    />
                  </td>
                  <td>
                    <InputWrapper
                      name={`x1_3b_${i + 1}_i`}
                      Component={TextInput}
                    />
                  </td>
                  <td>
                    <InputWrapper
                      name={`x1_3c_${i + 1}_i`}
                      Component={TextInput}
                    />
                  </td>
                  <td>
                    <InputWrapper
                      name={`x1_3d_${i + 1}_i`}
                      Component={TextInput}
                    />
                  </td>
                  <td>
                    <InputWrapper
                      name={`x1_3e_${i + 1}_i`}
                      Component={TextInput}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

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
          name="x1_4b_i"
          Component={TextInput}
          placeholder="Lainnya"
        />

        <InputWrapper
          name="x1_5a_i"
          label="Pekerjaan yang dilakukan oleh Ibu"
          Component={(e: any) => <Radio.Group {...e} orientation="vertical" spacing="xs">
            {handleFindData({ name: 'x1_4' })
              ?.map((a: any) => (
                <Radio key={`${a.label}-${a.value}`} {...a} />
              ))}
          </Radio.Group>}
        />

        <InputWrapper
          name="x1_5b_i"
          Component={TextInput}
          placeholder="Lainnya"
        />

        <InputWrapper
          name="x1_6_i"
          label="Sudah berapa lama pekerjaan tersebut dilakukan oleh Bapak"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_7_i"
          label="Sudah berapa lama pekerjaan tersebut dilakukan oleh Ibu"
          Component={NumberInput}
        />

        <Text fw={600}>Jumlah anak usia sekolah</Text> 

        <InputWrapper
          name="x1_8a_i"
          placeholder="TK ... Orang"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_8b_i"
          placeholder="SD ... Orang"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_8c_i"
          placeholder="SMP ... Orang"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_8d_i"
          placeholder="SMA ... Orang"
          Component={NumberInput}
        />

        <Text fw={600}>Usaha Tani</Text> 

        <InputWrapper
          name="x1_9_i"
          label="Jumlah anak (mahasiswa)"
          placeholder="Jumlah anak (mahasiswa) ... Orang"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_10_i"
          label="Luas tanah kepemilikan m2"
          placeholder="Luas tanah kepemilikan m2"
          Component={NumberInput}
        />

        <Text fw={600}>Status kepemilikan lahan</Text>

        <InputWrapper
          name="x1_11a_i"
          label="Milik sendiri m2"
          placeholder="Milik sendiri m2"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_11b_i"
          label="Sewa m2"
          placeholder="Sewa m2"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_11c_i"
          label="Bagi hasil m2"
          placeholder="Bagi hasil m2"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_11d_i "
          label="Buruh tani m2"
          placeholder="Buruh tani m2"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_12_i"
          label="Jika lahan yang digarap adalah bukan 
lahan milik sendiri, berapa upah 
menggarap lahan tani tsb"
          placeholder="Jika lahan yang digarap adalah bukan 
lahan milik sendiri, berapa upah 
menggarap lahan tani tsb"
          Component={NumberInput}
        />

        <Text fw={600}>Jika lahan yang digarap adalah milik
          sendiri, adakah upah buruh yang
          Bapak/Ibu keluarkan? Jika Ya, berapa
          orang dan sebutkan jumlah
          pengeluarannya</Text>

        <InputWrapper
          name="x1_13a_i"
          label="Buruh"
          placeholder=".... orang buruh"
          Component={NumberInput}
        />

        <InputWrapper
          name="x1_13b_i"
          label="Buruh"
          placeholder="1 orang = ...... Rp/hari"
          Component={NumberInput}
        />

        <Text fw={600}>Jenis dan jumlah tanaman yang ditanam dalam satu periode produksi</Text>

        <InputWrapper
          name="X1_14a_1_i"
          placeholder="Tanaman"
          Component={TextInput}
        />

        <InputWrapper
          name="X1_14b_1_i"
          placeholder="Jumlah ..... kg"
          Component={NumberInput}
        />

        <InputWrapper
          label="Jenis tanaman yang ditanam dalam satu tahun"
          name="X1_15_i"
          Component={TextInput}
        />

        <Text fw={600}>Berapa jumlah modal untuk satu kali periode musim</Text>

        <InputWrapper
          name="X1_16a_i"
          placeholder="Benih"
          label="Benih"
          Component={NumberInput}
        />

        <InputWrapper
          name="X1_16b_i"
          placeholder="Pupuk"
          label="Pupuk"
          Component={NumberInput}
        />

        <InputWrapper
          name="X1_16c_i"
          placeholder="Pestisida"
          label="Pestisida"
          Component={NumberInput}
        />
  
        <InputWrapper
          name="X1_16d_i"
          placeholder="Lain-lain"
          label="Lain-lain"
          Component={NumberInput}
        />

        <Text fw={600}>Berapa jumlah upah dan tenaga kerja yang membantu usahatani Bapak/Ibu?</Text>

        

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