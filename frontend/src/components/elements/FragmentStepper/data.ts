const data = [
  {
    sectionName: "x0",
    sectionHeader: "Biodata",
    name: "x0_nama",
    label: "Nama lengkap",
    required: true,
    type: "Text",
    inline: false,
    questions: [],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x0",
    sectionHeader: "Biodata",
    name: "x0_jenis_kelamin",
    label: "Jenis Kelamin",
    required: true,
    type: "Radio",
    inline: false,
    questions: [],
    showOther: false,
    isOther: false,
    options: [
      {
        label: "Laki-Laki",
        value: "L",
      },
      {
        label: "Perempuan",
        value: "P",
      },
    ],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x0",
    sectionHeader: "Biodata",
    name: "x0_no_hp",
    label: "No. HP",
    required: true,
    type: "Phone",
    inline: false,
    questions: [],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x0",
    sectionHeader: "Biodata",
    name: "x0_status_di_kelompok",
    label: "Status di Kelompok",
    required: true,
    type: "Radio",
    inline: false,
    questions: [],
    showOther: false,
    isOther: false,
    options: [
      {
        label: "Anggota",
        value: "1",
      },
      {
        label: "Pengurus",
        value: "2",
      },
      {
        label: "Bukan anggota",
        value: "3",
      },
    ],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x0",
    sectionHeader: "Biodata",
    name: "x0_domisili",
    label: "Domisili",
    required: true,
    type: "DropDown",
    inline: false,
    questions: [],
    showOther: false,
    isOther: false,
    options: [
      { label: "CIANAGA", value: "vid_01GM3A1QRBFBQ6ZYM47A789T1J" },
      { label: "CIHAMERANG", value: "vid_01GM3A1QRBBTV83BYYNQ76SABS" },
      { label: "CIPETEUY", value: "vid_01GM3A1QRB4PF2AG32FPWSR44E" },
      { label: "KABANDUNGAN", value: "vid_01GM3A1QRBYR3KH3QREFDS4NA0" },
      { label: "MEKARJAYA", value: "vid_01GM3A1QRBVTTZZCH5HA8SQ2VK" },
      { label: "TESTING 2", value: "vid_01GR6Q2AVZ2CA9TPFF508AAHZW" },
      { label: "TUGUBANDUNG", value: "vid_01GM3A1QRBSH600KP53F0J3GAE" },
    ],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x0",
    sectionHeader: "Biodata",
    name: "x0_kelas_bangunan_usaha",
    label: "Kelas Bangunan Usaha",
    required: true,
    type: "Text",
    inline: false,
    questions: [],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: "x1_4",
    label: "Pekerjaan yang dilakukan oleh bapak",
    required: false,
    type: "Radio",
    inline: false,
    questions: [],
    showOther: true,
    isOther: false,
    options: [
      {
        label: "Tani",
        value: "1",
      },
      {
        label: "Ternak",
        value: "2",
      },
      {
        label: "Nelayan",
        value: "3",
      },
      {
        label: "PNS",
        value: "4",
      },
      {
        label: "Lainnya",
        value: "5",
      },
    ],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: "x1_19",
    label: "Status kepemilikan ternak",
    required: false,
    type: "Radio",
    inline: false,
    questions: [],
    showOther: true,
    isOther: false,
    options: [
      {
        label: "Milik sendiri",
        value: "1",
      },
      {
        label: "Parohan",
        value: "2",
      },
      {
        label: "Lainnya",
        value: "3",
      },
    ],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: null,
    label:
      "Sebutkan pengeluaran yang dikeluarkan oleh bapak/ibu dalam satu hari",
    required: false,
    type: "InputGroup",
    inline: false,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_29_1",
        label: "Bahan Baku",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_29_2",
        label: "Bensin",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_29_3",
        label: "Tenaga kerja (/orang)",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_29_4",
        label: "Lainnya",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: null,
    label:
      "Sebutkan pengeluaran yang dikeluarkan oleh bapak/ibu dalam satu bulan",
    required: false,
    type: "InputGroup",
    inline: false,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_30_1",
        label: "Air",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_30_2",
        label: "Listrik",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_30_3",
        label: "Tenaga kerja (/orang)",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_30_4",
        label: "Lainnya",
        required: false,
        type: "Currency",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: null,
    label:
      "Apa motivasi bapak/ibu mau berpartisipasi pada Desa Cerdas Kebandungan?",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}",
        label: null,
        required: false,
        type: "Radio",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "Ya",
            value: "1",
          },
          {
            label: "Tidak",
            value: "2",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
      {
        key: "x1_36a",
        label:
          "Sadar akan kebutuhan TIK untuk pengelolaan kegiatan pertanian dan Usaha Mikro Kecil Menengah (UMKM)",
        isOther: false,
      },
      {
        key: "x1_36b",
        label:
          "Sadar akan kebutuhan kerjasama dengan pihak bank, atau marketplace pertanian",
        isOther: false,
      },
      {
        key: "x1_36d",
        label:
          "Tahu bahwa direncanakan akan dikembangkan lokasi pariwisata di Kabandungan",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: null,
    label:
      "Berdasarkan pengalaman Bapak/Ibu, apakah pemanfaatan TIK bisa digunakan untuk melakukan kegiatan berikut:",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}",
        label: null,
        required: false,
        type: "Radio",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "Bisa",
            value: "1",
          },
          {
            label: "Tidak Bisa",
            value: "2",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
      {
        key: "x1_39b",
        label: "Membuka lapangan pekerjaan di desa",
        isOther: false,
      },
      {
        key: "x1_39c",
        label: "Menambah penghasilan",
        isOther: false,
      },
      {
        key: "x1_39d",
        label: "Memberdayakan warga desa",
        isOther: false,
      },
      {
        key: "x1_39e",
        label: "Mendatangkan orang luar desa berkunjung ke desa",
        isOther: false,
      },
      {
        key: "x1_39f",
        label: "Membuka akses pasar",
        isOther: false,
      },
      {
        key: "x1_39g",
        label:
          "Mempromosikan komoditas dan produk-produk Kabandungan Kab Sukabumi",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: null,
    label:
      "Sebutkan pengeluaran yang dikeluarkan oleh bapak/ibu dalam satu hari",
    required: false,
    type: "InputGroup",
    inline: false,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_41_tahun",
        label: "Berapa tahun?",
        required: false,
        type: "Number",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_41_alasan",
        label: "Alasannya?",
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [],
  },
  {
    sectionName: "x1",
    sectionHeader: "Bagian X1 - Karakter Warga",
    name: null,
    label: "Apakah Bapak/Ibu pernah mencari informasi seputar desa cerdas?",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_41{0}_lainnya",
        label: "Lainnya",
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: true,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_41{0}",
        label: null,
        required: false,
        type: "Radio",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "Pernah",
            value: "1",
          },
          {
            label: "Tidak Pernah",
            value: "2",
          },
        ],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_41{0}_frekuensi",
        label: "Frekuensi",
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: true,
        options: [],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x1_41{0}_info",
        label: "Informasi yang dicari",
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: true,
        options: [],
        subHeading: null,
        items: [],
      },
    ],
    showOther: true,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "x2",
    sectionHeader: "Bagian X2 - Lingkungan",
    name: null,
    label: "Bagaimana pendapat Bapak/Ibu terkait:",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}",
        label: null,
        required: false,
        type: "Radio",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
      {
        key: "x2_48",
        label:
          "Iuran internet atau iuran kegiatan terkait desa cerdas yang diberlakukan pada masing-masing komunitas",
        isOther: false,
      },
      {
        key: "x2_49",
        label:
          "Kemudahan informasi yang dibutuhkan dalam pengelolaan usaha melalui komunitas",
        isOther: false,
      },
      {
        key: "x2_50",
        label:
          "Penerimaan warga desa dalam mengadopsi TIK untuk pengembangan usaha melalui bantuan komunitas",
        isOther: false,
      },
      {
        key: "x2_51",
        label:
          "Kemampuan keterampilan teknisi komunitas dalam memperbaiki gangguan internet di lokasi usaha Bapak/Ibu",
        isOther: false,
      },
      {
        key: "x2_52",
        label: "Keterjangkauan biaya listrik setelah menggunakan TIK",
        isOther: false,
      },
      {
        key: "x2_53",
        label:
          "Kemudahan informasi yang dibutuhkan saat ada gangguan perangkat TIK/internet yang difasilitasi komunitas",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "x3",
    sectionHeader: "Bagian X3 - Dukungan Komunitas",
    name: null,
    label:
      "Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
      {
        key: "x3_54",
        label: "Kemampuan ketua kelompok dalam memimpin kelompok",
        isOther: false,
      },
      {
        key: "x3_55",
        label:
          "Intensitas pelatihan dan pembinaan kepada anggota kelompok yang dilakukan oleh pemerintah setempat",
        isOther: false,
      },
      {
        key: "x3_56",
        label:
          "Tingkat partisipasi anggota kelompok dalam pelatihan dan pembinaan",
        isOther: false,
      },
      {
        key: "x3_57",
        label:
          "Kesesuaian modul pelatihan dengan kebutuhan keterampilan anggota kelompok",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "x3",
    sectionHeader: "Bagian X3 - Dukungan Komunitas",
    name: null,
    label:
      "Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Tidak bisa dipahami (2) Kurang bisa dipahami (3) Cukup mudah dipahami (4) Mudah dipahami, (5) Sangat Mudah Dipahami",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x3_58{0}_yn",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "Ya",
            value: "1",
          },
          {
            label: "Tidak",
            value: "2",
          },
        ],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x3_58{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: "Apakah Bapak/Ibu mendapatkan materi keterampilan:",
    items: [
      {
        key: "a",
        label: "Kuliner secara profesional",
        isOther: false,
      },
      {
        key: "b",
        label: "Mengelola keuangan dan pembukuan",
        isOther: false,
      },
      {
        key: "c",
        label: "Pengembangan wisata kuliner",
        isOther: false,
      },
      {
        key: "d",
        label: "Pengelolaan homestay (penginapan)",
        isOther: false,
      },
      {
        key: "e",
        label: "Pembentukan dan pengembangan BUMDes",
        isOther: false,
      },
      {
        key: "f",
        label: "Pengolahan pupuk",
        isOther: false,
      },
      {
        key: "g",
        label: "Pengelolaan media tanam pertaniann",
        isOther: false,
      },
      {
        key: "h",
        label: "Penanganan hama dan penyakit tanaman",
        isOther: false,
      },
      {
        key: "i",
        label: "Penanganan dan pengemasan hasil panen",
        isOther: false,
      },
      {
        key: "j",
        label: "Pengolahan produk hasil pertanian",
        isOther: false,
      },
      {
        key: "k",
        label: "Teknik promosi",
        isOther: false,
      },
      {
        key: "l",
        label: "Pengembangan pasar secara off-line / on-line",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "x3",
    sectionHeader: "Bagian X3 - Dukungan Komunitas",
    name: null,
    label:
      "Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Tidak bisa dipahami (2) Kurang bisa dipahami (3) Cukup mudah dipahami (4) Mudah dipahami, (5) Sangat Mudah Dipahami",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x3_59{0}_yn",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "Ya",
            value: "1",
          },
          {
            label: "Tidak",
            value: "2",
          },
        ],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "x3_59{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: "Jenis metode apa yang diberikan?",
    items: [
      {
        key: "a",
        label: "Metode demonstrasi",
        isOther: false,
      },
      {
        key: "b",
        label: "Metode kunjungan lapang",
        isOther: false,
      },
      {
        key: "c",
        label: "Metode pameran",
        isOther: false,
      },
      {
        key: "d",
        label: "Metode ceramah",
        isOther: false,
      },
      {
        key: "e",
        label: "Metode pembagian brosur/leaflet/juknis",
        isOther: false,
      },
      {
        key: "f",
        label: "Metode daring",
        isOther: false,
      },
      {
        key: "g",
        label: "Pengelolaan media tanam pertaniann",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "y1",
    sectionHeader: "Bagian Y1 - Keberdayaan",
    name: null,
    label: "Bagaimana tingkat….. (Adaptasi)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "y1_60{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "y1",
    sectionHeader: "Bagian Y1 - Keberdayaan",
    name: null,
    label: "Bagaimana tingkat….. (Mengelola usaha)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "y1_61{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
      {
        key: "a",
        label: "Memutar modal usaha Bapak/Ibu?",
        isOther: false,
      },
      {
        key: "b",
        label: "Memutar modal usaha Bapak/Ibu?",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "y1",
    sectionHeader: "Bagian Y1 - Keberdayaan",
    name: null,
    label: "Bagaimana tingkat….. (Mengelola usaha)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "y1_62{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "y1",
    sectionHeader: "Bagian Y1 - Keberdayaan",
    name: null,
    label: "Bagaimana tingkat….. (Mengelola usaha)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "y1_63{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "x4",
    sectionHeader: "Bagian X4 - Kewirausahaan",
    name: null,
    label:
      "Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x4_64{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: "Bagaimana tingkat….. (Kemampuan kewirausahaan)",
    items: [
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
    ],
  },
  {
    sectionName: "x4",
    sectionHeader: "Bagian X4 - Kewirausahaan",
    name: null,
    label: "Bagaimana tingkat….. (Kemampuan promosi)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x4_65{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "x4",
    sectionHeader: "Bagian X4 - Kewirausahaan",
    name: null,
    label: "Bagaimana tingkat….. (Produktivitas)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x4_66{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "x4",
    sectionHeader: "Bagian X4 - Kewirausahaan",
    name: null,
    label: "Bagaimana tingkat….. (Akses tenaga kerja)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x4_67{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
      {
        key: "a",
        label: "Kemampuan akses tenaga kerja dengan pemanfaatan jasa koperasi",
        isOther: false,
      },
      {
        key: "b",
        label:
          "Bagaimana tingkat kemampuan akses tenaga kerjaberbasis TIK dengan bantuan komunitas?",
        isOther: false,
      },
      {
        key: "c",
        label: "Bagaimana tingkat kemampuan akses tenga kerja TIK mandiri?",
        isOther: false,
      },
    ],
  },
  {
    sectionName: "x4",
    sectionHeader: "Bagian X4 - Kewirausahaan",
    name: null,
    label: "Bagaimana tingkat….. (Kemampuan promosi)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x4_67{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "x5",
    sectionHeader: "Bagian X5 - Inovasi",
    name: null,
    label:
      "Berikan tanda centang (v) pada pilihan jawaban yang sesuai:\r\n(1) Sangat rendah, (2) Rendah, (3) Sedang, (4) Tinggi, (5) Sangat Tinggi",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x5_69{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: "Bagaimana tingkat….. (Semangat Inovasi)",
    items: [
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
    ],
  },
  {
    sectionName: "x5",
    sectionHeader: "Bagian X5 - Inovasi",
    name: null,
    label: "Bagaimana tingkat….. (Kemampuan inovasi)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x5_70{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "x5",
    sectionHeader: "Bagian X5 - Inovasi",
    name: null,
    label: "Bagaimana tingkat….. (Kemampuan transformasi)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x5_71{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "x5",
    sectionHeader: "Bagian X5 - Inovasi",
    name: null,
    label: "Bagaimana tingkat….. (Kemampuan akses dana riset)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "x5_72{0}",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "y2",
    sectionHeader: "Bagian Y2 - Smart Economy (Sebelum, Sesudah)",
    name: null,
    label: "Bagaimana pendapat Bapak/Ibu tentang... (Infrastruktur)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}a",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}b",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
      },
    ],
  },
  {
    sectionName: "y2",
    sectionHeader: "Bagian Y2 - Smart Economy (Sebelum, Sesudah)",
    name: null,
    label: "Bagaimana pendapat Bapak/Ibu tentang… (Ekonomi)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}a",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}b",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
  {
    sectionName: "y2",
    sectionHeader: "Bagian Y2 - Smart Economy (Sebelum, Sesudah)",
    name: null,
    label: "Bagaimana pendapat Bapak/Ibu tentang… (Sosial)",
    required: false,
    type: "InputDualGroup",
    inline: true,
    questions: [
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}a",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
      {
        sectionName: "",
        sectionHeader: "",
        name: "{0}b",
        label: null,
        required: false,
        type: "Text",
        inline: false,
        questions: [],
        showOther: false,
        isOther: false,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
        subHeading: null,
        items: [],
      },
    ],
    showOther: false,
    isOther: false,
    options: [],
    subHeading: null,
    items: [
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
    ],
  },
];

export default data
