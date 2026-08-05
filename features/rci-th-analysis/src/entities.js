/**
 * Entiti: orang, jawatan, tempoh perkhidmatan, organisasi, anak syarikat,
 * jawatankuasa. Semua tempoh diambil terus daripada BAB DUA dan BAB TIGA.
 *
 * Nota kebolehkesanan: "sekarang" dalam laporan bermaksud sehingga Julai 2022.
 * Kami merekodkan `to: null` + `toLabel: "sekarang (Julai 2022)"` untuk kes itu.
 */
import { sourceRef } from "./meta.js";

const F = "fact";

/** Menteri yang bertanggungjawab menyelia LTH (Menteri Hal Ehwal Agama). */
export const supervisingMinisters = [
  {
    id: "min-jamil-khir",
    name: "YB Mejar Jeneral (B) Dato' Seri Jamil Khir bin Haji Baharom",
    from: "2009-02-10",
    to: "2018-05-09",
    portfolio: "Menteri di Jabatan Perdana Menteri (Hal Ehwal Agama)",
  },
  {
    id: "min-mujahid",
    name: "YB Datuk Seri Dr. Mujahid bin Yusof Rawa",
    from: "2018-07-02",
    to: "2020-03-09",
    portfolio: "Menteri di Jabatan Perdana Menteri (Hal Ehwal Agama)",
  },
  {
    id: "min-zulkifli",
    name: "YB Senator Datuk Dr. Zulkifli bin Mohamad al-Bakri",
    from: "2020-03-10",
    to: "2021-08-29",
    portfolio: "Menteri di Jabatan Perdana Menteri (Hal Ehwal Agama)",
  },
  {
    id: "min-idris",
    name: "YB Senator Datuk Haji Idris bin Ahmad",
    from: "2021-08-30",
    to: null,
    toLabel: "sekarang (Julai 2022)",
    portfolio: "Menteri di Jabatan Perdana Menteri (Hal Ehwal Agama)",
  },
].map((m) => ({ ...m, factType: F, source: [sourceRef("2.2.6", 56, 18)] }));

/** Jurang kuasa: 10 Mei – 1 Julai 2018 kuasa Menteri dijalankan oleh Perdana Menteri. */
export const ministerialGap = {
  id: "min-gap-2018",
  from: "2018-05-10",
  to: "2018-07-01",
  actingAuthority: "Perdana Menteri, Tun Dr. Mahathir bin Mohamad",
  instrument: "Perintah Menteri-Menteri Kerajaan Persekutuan 2018 (P.U.(A) 125)",
  factType: F,
  source: [sourceRef("2.2.7", 56, 18)],
};

export const chairmen = [
  {
    id: "chair-azeez",
    name: "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim",
    from: "2013-07-01",
    to: "2018-05-23",
    politicallyActive: true,
    politicalRole: "Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO",
  },
  {
    id: "chair-mdnor",
    name: "Tan Sri Md Nor bin Md Yusof",
    from: "2018-07-10",
    to: "2021-10-15",
    politicallyActive: false,
    terminationNote:
      "Perkhidmatan ditamatkan pada 15 Oktober 2021 sebelum tamat kontrak yang baru disambung dua tahun mulai 20 Julai 2020.",
  },
  {
    id: "chair-azman",
    name: "Tan Sri Azman bin Mokhtar",
    from: "2021-12-20",
    to: null,
    toLabel: "sekarang (Julai 2022)",
    politicallyActive: false,
  },
].map((c) => ({ ...c, factType: F, source: [sourceRef("2.2.15 / 3.2.13", 59, 21)] }));

export const chiefExecutives = [
  { id: "ceo-ismee", name: "Tan Sri Ismee bin Ismail", from: "2006-01-01", to: "2016-06-30" },
  { id: "ceo-johan", name: "Datuk Seri Johan bin Abdullah", from: "2016-07-01", to: "2018-06-30" },
  { id: "ceo-zukri", name: "Dato' Sri Zukri bin Samat", from: "2018-07-10", to: "2019-08-31" },
  {
    id: "ceo-hasyudeen",
    name: "Datuk Nik Mohd Hasyudeen bin Yusoff",
    from: "2019-09-01",
    to: "2021-05-05",
    terminationNote:
      "Ditamatkan 5 Mei 2021, sebelum tamat tempoh sebenar perkhidmatan iaitu 31 Ogos 2021.",
  },
  {
    id: "ceo-amrin",
    name: "Datuk Sri Amrin bin Awaluddin",
    from: "2021-05-06",
    to: null,
    toLabel: "sekarang (Julai 2022)",
  },
].map((c) => ({ ...c, factType: F, source: [sourceRef("2.2.24", 65, 27)] }));

export const treasuryRepresentatives = [
  { name: "Tan Sri Dr. Mohd Irwan Serigar bin Abdullah", from: "2011-03-01", to: "2018-05-14" },
  { name: "Tan Sri Ahmad Badri bin Mohd Zahir", from: "2018-10-31", to: "2020-05-01" },
  { name: "Datuk Seri Asri bin Hamidon", from: "2020-06-15", to: null, toLabel: "sekarang (Julai 2022)" },
].map((r) => ({ ...r, seat: "Wakil Perbendaharaan", factType: F, source: [sourceRef("2.2.17", 60, 22)] }));

export const pmDepartmentRepresentatives = [
  { name: "Tan Sri Othman bin Mahmood", from: "2012-01-16", to: "2017-07-31" },
  { name: "Tan Sri Dato' Seri Mohd Zuki bin Ali", from: "2017-08-01", to: "2019-04-16" },
  { name: "Datuk Seri Hasnol Zam Zam bin Haji Ahmad", from: "2019-06-11", to: "2020-02-01" },
  { name: "Datuk Seri Mohd Sallehhuddin bin Hassan", from: "2020-06-16", to: "2021-07-31" },
  { name: "Datuk Jamil bin Rakon", from: "2021-08-01", to: "2022-04-18" },
].map((r) => ({ ...r, seat: "Wakil Jabatan Perdana Menteri", factType: F, source: [sourceRef("2.2.16", 59, 21)] }));

export const pmDepartmentSeatVacancy = {
  note: "Kerusi Wakil Jabatan Perdana Menteri kosong selepas 18 April 2022 — 'sekarang belum dilantik'.",
  since: "2022-04-19",
  factType: F,
  source: [sourceRef("2.2.16", 60, 22)],
};

/**
 * Anggota Lembaga yang dilantik Menteri di bawah seksyen 6(1)(d).
 * `politicallyActive` hanya ditetapkan `true` untuk tiga individu yang
 * SECARA JELAS dinamakan oleh Suruhanjaya sebagai ahli politik (3.2.13).
 * Untuk yang lain, medan ini `null` — laporan tidak menyatakan.
 */
export const appointedBoardMembers = [
  { name: "Prof. Emeritus Tan Sri Dato' Dr. Abdul Shukor bin Husin", from: "2004-10-15", to: "2018-10-14" },
  {
    name: "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin",
    from: "2005-01-01",
    to: "2018-06-30",
    politicallyActive: true,
    politicalRole: "Ahli Parlimen Yan/Jerai (2004–2008); Pengerusi Tetap Perhimpunan Agong UMNO",
  },
  { name: "Tan Sri Ismee bin Ismail", from: "2006-01-01", to: "2016-06-30" },
  {
    name: "Datuk Seri Panglima Haji Abdul Azeez bin Haji Abdul Rahim",
    from: "2011-01-01",
    to: "2013-04-17",
    politicallyActive: true,
    politicalRole: "Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO",
    note: "Kemudian dilantik Pengerusi 1 Julai 2013.",
  },
  { name: "Allahyarham Tan Sri Datuk Haji Mohamad bin Haji Aziz", from: "2011-01-01", to: "2018-06-30" },
  { name: "Tan Sri Dato' Hashim bin Meon", from: "2011-01-01", to: "2015-12-31" },
  { name: "Dato' Haji Ghazali bin Awang", from: "2011-09-01", to: "2015-08-31" },
  {
    name: "Datuk Rosni binti Sohar",
    from: "2014-02-01",
    to: "2018-05-23",
    politicallyActive: true,
    politicalRole:
      "ADUN Hulu Bernam; Ahli Majlis Kerja Tertinggi dan Setiausaha Wanita UMNO Malaysia sejak 2013",
  },
  { name: "Tan Sri Haji Syukry bin Mohd Salleh", from: "2015-09-01", to: "2018-08-31" },
  { name: "Tan Sri Dato' Sri Haji Mohamed Apandi bin Ali", from: "2016-01-15", to: "2018-06-04" },
  { name: "Datuk Seri Johan bin Abdullah", from: "2016-07-01", to: "2018-06-30" },
  { name: "Dato' Sri Zukri bin Samat", from: "2018-07-10", to: "2019-08-31" },
  { name: "Tan Sri Abu Talib bin Othman", from: "2018-08-10", to: "2020-08-09" },
  { name: "Datuk Zaiton binti Mohd Hassan", from: "2018-08-10", to: "2020-08-09" },
  { name: "Profesor Dr. Ashraf bin Md Hashim", from: "2018-08-10", to: null, toLabel: "sekarang (Julai 2022)" },
  { name: "Dato' Noordin bin Sulaiman", from: "2018-08-15", to: null, toLabel: "sekarang (Julai 2022)" },
  { name: "Datuk Haji Ahamed Basheer bin Mohd Hussain", from: "2019-03-26", to: "2021-03-25" },
  { name: "Datuk Akbar bin Samon", from: "2019-06-11", to: "2021-06-10" },
  { name: "Datuk Nik Mohd Hasyudeen bin Yusoff", from: "2019-09-01", to: "2021-05-05" },
  { name: "Dato' Abdul Mutalib bin Datuk Seri Mohamed Razak", from: "2020-08-10", to: null, toLabel: "sekarang (Julai 2022)" },
  { name: "YM Tengku Dato' Seri Hasmuddin bin Tengku Othman", from: "2021-03-16", to: null, toLabel: "sekarang (Julai 2022)" },
  { name: "Datuk Sri Amrin bin Awaluddin", from: "2021-05-06", to: null, toLabel: "sekarang (Julai 2022)" },
  { name: "Dato' Abdul Hamid bin Sh. Mohamed", from: "2021-08-01", to: null, toLabel: "sekarang (Julai 2022)" },
  { name: "Datin Paduka Kartini binti Haji Abdul Manaf", from: "2021-08-01", to: null, toLabel: "sekarang (Julai 2022)" },
].map((m) => ({
  politicallyActive: null,
  politicalRole: null,
  factType: F,
  source: [sourceRef("2.2.18 / 3.2.13", 61, 23)],
  ...m,
}));

/**
 * Penglibatan dalam anak syarikat (konflik kepentingan).
 * Laporan menyenaraikan contoh, bukan senarai lengkap ("antaranya").
 */
export const subsidiaryDirectorships = [
  {
    person: "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim",
    thRole: "Pengerusi LTH (2013–2018) / anggota Lembaga (2011–)",
    companies: [
      { name: "TH Real Estate LLC", position: "Pengerusi" },
      { name: "TH Hotel & Residence", position: "ALP dan Pengerusi" },
      { name: "Putrajaya Perdana Berhad", position: "ALP dan Pengerusi" },
      { name: "The Edge Berhad", position: "ALP" },
      { name: "Yayasan Tabung Haji", position: "ALP" },
      { name: "LTH Property Holdings 3 Limited", position: "ALP" },
      { name: "LTH Property Holdings 4 Limited", position: "ALP" },
      { name: "LTH Property Holdings 5 Limited", position: "ALP" },
    ],
    source: [sourceRef("3.3.2(a)", 84, 46)],
  },
  {
    person: "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin",
    thRole: "Anggota Lembaga (2005–2018)",
    companies: [
      { name: "TH Travel & Services Sdn. Bhd.", position: "ALP" },
      { name: "TH Hotel & Residence Sdn. Bhd.", position: "ALP" },
      { name: "TH Global Services Sdn. Bhd.", position: "ALP" },
    ],
    source: [sourceRef("3.3.2(b)", 84, 46)],
  },
  {
    person: "Datuk Zaiton binti Mohd Hassan",
    thRole: "Anggota Lembaga (2018–2020)",
    companies: [
      { name: "TH Properties Sdn. Bhd.", position: "Pengerusi" },
      { name: "THP Enstek Development Sdn. Bhd.", position: "ALP" },
      { name: "LTH Property Holdings Limited", position: "ALP" },
      { name: "LTH Property Holdings 2 Limited", position: "ALP" },
      { name: "LTH Property Holdings 3 Limited", position: "ALP" },
      { name: "LTH Property Holdings 4 Limited", position: "ALP" },
      { name: "LTH Property 5 Limited", position: "ALP" },
    ],
    source: [sourceRef("3.3.2(c)", 85, 47)],
  },
  {
    person: "Dato' Noordin bin Sulaiman",
    thRole: "Anggota Lembaga (2018–sekarang)",
    companies: [
      { name: "TH Hotel and Residence", position: "Pengerusi" },
      { name: "TH Travel & Services", position: "Pengerusi" },
      { name: "THV Management Services Sdn. Bhd.", position: "Pengerusi" },
      { name: "Premia Cards Sdn. Bhd.", position: "Pengerusi" },
      { name: "Theta Edge Berhad", position: "Pengerusi" },
      { name: "TH Hotel Sarawak", position: "ALP" },
      { name: "Express Rail Link Sdn. Bhd.", position: "ALP" },
      { name: "Putrajaya Perdana Berhad", position: "ALP" },
      { name: "TH Alam Holding", position: "ALP" },
    ],
    source: [sourceRef("3.3.2(d)", 85, 47)],
  },
  {
    person: "Tan Sri Ismee bin Ismail",
    thRole: "Anggota Lembaga & KPE (2006–2016)",
    companies: [
      { name: "TH Plantations Berhad", position: "ALP" },
      { name: "Trurich Resources Sdn. Bhd.", position: "ALP" },
      { name: "BIMB Holdings Berhad", position: "ALP" },
      { name: "Bank Islam Malaysia Berhad", position: "ALP" },
      { name: "Syarikat Takaful Malaysia Berhad", position: "ALP" },
      { name: "LTH Property Holdings Ltd.", position: "ALP" },
      { name: "TH Travel Sdn. Bhd.", position: "ALP" },
    ],
    afterTenureNote:
      "Terus memegang jawatan di TH Plantations Berhad, Trurich Resources dan TH Travel & Services sehingga Mei 2018, walaupun perkhidmatan tamat 30 Jun 2016.",
    source: [sourceRef("3.4.1(a)", 86, 48)],
  },
  {
    person: "Datuk Seri Johan bin Abdullah",
    thRole: "Anggota Lembaga & KPE (Jun 2016 – Jun 2018)",
    companies: [
      { name: "TH Heavy Engineering Bhd.", position: "Pengerusi" },
      { name: "Trurich Resources Sdn. Bhd.", position: "Pengerusi" },
      { name: "Deru Semangat Sdn. Bhd.", position: "Pengerusi" },
      { name: "TH Properties Sdn. Bhd.", position: "ALP" },
      { name: "TH Hotel & Residence Sdn. Bhd.", position: "ALP" },
      { name: "TH Plantations Berhad", position: "ALP" },
      { name: "Malakoff Corporation Bhd.", position: "ALP" },
      { name: "LTH Property Holdings Ltd.", position: "ALP" },
      { name: "LTH Property Holdings 2 Ltd.", position: "ALP" },
      { name: "Express Rail Link Sdn. Bhd.", position: "ALP" },
      { name: "YTL THP JV Sdn. Bhd.", position: "ALP" },
      { name: "Glomac Berhad", position: "ALP" },
      { name: "Yayasan Tabung Haji", position: "ALP" },
      { name: "Premia Cards Sdn. Bhd.", position: "ALP" },
      { name: "LTH Property Holdings 3 Ltd.", position: "ALP" },
      { name: "LTH Property Holdings 4 Ltd.", position: "ALP" },
      { name: "LTH Property Holdings 5 Ltd.", position: "ALP" },
      { name: "PT TH Felda Nusantara", position: "ALP" },
    ],
    source: [sourceRef("3.4.1(b)", 86, 48)],
  },
  {
    person: "Dato' Sri Zukri bin Samat",
    thRole: "Anggota Lembaga & KPE (Julai 2018 – Ogos 2019)",
    companies: [
      { name: "TH Plantations Berhad", position: "Pengerusi" },
      { name: "TH Estates Holding Sdn. Bhd.", position: "Pengerusi" },
      { name: "TH Properties Sdn. Bhd.", position: "Pengerusi" },
      { name: "Yayasan Tabung Haji", position: "ALP" },
    ],
    afterTenureNote:
      "Memberitahu Suruhanjaya bahawa beliau melepaskan jawatan-jawatan tersebut untuk mengelak konflik kepentingan semasa mengetuai LTH.",
    source: [sourceRef("3.4.1(c)", 87, 49)],
  },
  {
    person: "Datuk Nik Mohd Hasyudeen bin Yusoff",
    thRole: "Anggota Lembaga & KPE (Sept 2019 – Mei 2021)",
    companies: [
      { name: "Bank Islam Malaysia Berhad", position: "ALP" },
      { name: "BIMB Holdings Berhad", position: "ALP" },
      { name: "TH Plantations Berhad", position: "ALP" },
      { name: "TH Properties Sdn. Bhd.", position: "ALP" },
    ],
    source: [sourceRef("3.4.1(d)", 88, 50)],
  },
  {
    person: "Datuk Sri Amrin bin Awaluddin",
    thRole: "Anggota Lembaga & KPE (Mei 2021 – sekarang)",
    companies: [
      { name: "TH Plantations Bhd.", position: "ALP" },
      { name: "TH Properties Sdn. Bhd.", position: "ALP" },
      { name: "Bank Islam Malaysia Berhad", position: "ALP" },
    ],
    source: [sourceRef("3.4.1(e)", 88, 50)],
  },
  {
    person: "Datuk Rozaida binti Omar",
    thRole:
      "Pengurus Besar Kanan (Kewangan) / Ketua Pegawai Kewangan Kumpulan (2 Ogos 2004 – 16 April 2021); dilantik semula sebagai Pengurus Besar, Jabatan Modal Insan sejak 11 Oktober 2021",
    companies: [
      { name: "Syarikat Takaful Malaysia Berhad", position: "ALP" },
      { name: "Pelikan International Corporation Berhad", position: "ALP" },
      { name: "BIMB Holdings Berhad", position: "ALP" },
      { name: "Premia Cards Sdn. Bhd.", position: "ALP" },
      { name: "TH Hotel & Residence Sdn. Bhd.", position: "ALP" },
      { name: "THV Management Services Sdn. Bhd.", position: "ALP" },
      { name: "151 BPR One Limited", position: "ALP" },
      { name: "151 BPR Two Limited", position: "ALP" },
      { name: "LTH Property Investment (L) Inc", position: "ALP" },
      { name: "Leatherhead Properties Limited", position: "ALP" },
      { name: "TH Heavy Engineering Berhad", position: "ALP" },
      { name: "Putrajaya Perdana Berhad", position: "ALP" },
      { name: "Millstream Property Limited", position: "ALP" },
      { name: "LTH Property Holdings Limited", position: "ALP" },
      { name: "LTH Property Holdings 2 Limited", position: "ALP" },
      { name: "LTH Property Holdings 3 Limited", position: "ALP" },
      { name: "LTH Property Holdings 4 Limited", position: "ALP" },
      { name: "LTH Residence Limited", position: "ALP" },
      { name: "10 Queen Street Place London Limited", position: "ALP" },
      { name: "Wilton Property Limited", position: "ALP" },
      { name: "Marston Development Limited", position: "ALP" },
      { name: "Luton Investment Limited", position: "ALP" },
      { name: "LTH Oxford Limited", position: "ALP" },
    ],
    note: "Bertindak sebagai proksi mewakili LTH di anak-anak syarikat.",
    source: [sourceRef("3.4.1(f)", 89, 51)],
  },
  {
    person: "Encik Abd Kadir bin Sahlan",
    thRole: "Ketua Pegawai Pelaburan LTH (Jun 2010 – 2018)",
    companies: [
      { name: "TH Properties Group", position: "ALP" },
      { name: "Syarikat Perladangan Sabah Sarawak", position: "ALP" },
      { name: "BIMB Securities Sdn. Bhd.", position: "ALP" },
    ],
    source: [sourceRef("3.4.1(g)", 90, 52)],
  },
].map((d) => ({ ...d, factType: F, listCompleteness: "contoh sahaja — laporan menggunakan perkataan 'antaranya'" }));

export const subsidiaryCapPolicy = {
  cap: 5,
  description:
    "Dasar baharu LTH mengehadkan Pengerusi, anggota Lembaga dan pengurusan tertinggi kepada jawatan di lima anak syarikat sahaja.",
  effectiveDate: null,
  effectiveDateNote: "Tarikh kuat kuasa tidak dinyatakan dalam laporan.",
  factType: F,
  source: [sourceRef("3.4.3", 90, 52)],
};

/** Jawatankuasa Lembaga sebelum dan selepas penstrukturan Julai 2018. */
export const committees = {
  beforeRestructure: [
    "Jawatankuasa Audit",
    "Jawatankuasa Risiko",
    "Lembaga Tender",
    "Jawatankuasa Urusan Haji",
    "Jawatankuasa Penasihat Syariah",
    "Jawatankuasa Penamaan",
    "Jawatankuasa Perkhidmatan",
    "Panel Pelaburan",
    "Majlis Penasihat Haji",
    "Jawatankuasa Penasihat Ibadah",
    "Jawatankuasa Tatatertib (Kumpulan Pengurusan Eksekutif; Kumpulan Bukan Eksekutif)",
    "Jawatankuasa Rayuan Tatatertib (Kumpulan Pengurusan Eksekutif; Bukan Kumpulan Eksekutif)",
  ],
  abolished2018: ["Panel Pelaburan", "Majlis Penasihat Haji"],
  createdFrom2018: [
    "Jawatankuasa Penamaan dan Saraan",
    "Jawatankuasa Tatatertib Kumpulan Pengurusan dan Eksekutif",
    "Jawatankuasa Tatatertib Kumpulan Bukan Eksekutif",
    "Jawatankuasa Rayuan Kumpulan Pengurusan dan Eksekutif",
    "Jawatankuasa Rayuan Kumpulan Bukan Eksekutif",
    "Jawatankuasa Penasihat Syariah",
    "Jawatankuasa Urusan Haji",
  ],
  restructureDate: "2018-07",
  factType: F,
  source: [sourceRef("2.2.19–2.2.21", 63, 25)],
};

export const investmentPanel = {
  legalBasis: "Seksyen 11 Akta 535 (bukan peruntukan khusus)",
  role:
    "Menasihati LTH mengenai keberkesanan aktiviti dan kawalan pelaburan; meneliti dan meluluskan kertas cadangan pelaburan sebelum dibawa ke Lembaga dan Menteri.",
  boardMembersOnPanel: 0,
  boardMembersOnPanelNote: "Suruhanjaya mendapati tiada anggota Lembaga menganggotai Panel Pelaburan.",
  dissolvedDate: "2018-05",
  replacedBy:
    "Exco Perniagaan (dipengerusikan Menteri Hal Ehwal Ekonomi), melapor kepada Exco Induk (dipengerusikan Perdana Menteri), bersama Exco Haji (Menteri Hal Ehwal Agama).",
  replacementOutcome:
    "Saksi mengakui Exco Perniagaan tidak pernah berfungsi.",
  reinstated: true,
  reinstatedNote:
    "Dihidupkan semula oleh Datuk Nik Mohd Hasyudeen, diteruskan oleh Datuk Sri Amrin; Panel Pelaburan kini wujud semula. Tarikh tepat tidak dinyatakan.",
  chairAdmission:
    "Pengerusi Panel Pelaburan, Dato' Mohzani, mengakui mereka tidak cukup tegas kerana pendekatan yang digunakan longgar dan tidak menyeluruh.",
  factType: F,
  source: [sourceRef("3.5.3–3.5.10 / 3.14.4", 91, 53)],
};

export const shariahAdvisoryCommittee = {
  establishedYear: 2015,
  foundingMembers: [
    "Prof Emeritus Tan Sri Dato' Dr. Abdul Shukor bin Husin (Pengerusi)",
    "Tan Sri Sheikh Ghazali bin Abdul Rahman",
    "Datuk Che Mat bin Che Ali",
    "Dato' Elias bin Zakaria",
    "Puan Nurhidayah binti Mohamad Shahaimi",
    "Penasihat Undang-undang",
    "Pengurus Besar (Syariah)",
  ],
  membersListNote:
    "Senarai OCR tidak lengkap (terdapat baris '....' dalam sumber). Anggap senarai ini tidak muktamad.",
  investmentScopeGap:
    "Pelaburan oleh Jawatankuasa Kewangan dan Pelaburan LTH TIADA dalam skop keputusan JPS sehingga tahun 2016.",
  externalAdvisor: {
    firm: "Amanie Advisors Sdn. Bhd.",
    from: "2010-08",
    to: "2016-12",
    role: "Menasihati isu syariah dalam pelaburan LTH",
  },
  factType: F,
  source: [sourceRef("3.5.16–3.5.20", 94, 56)],
};

export const hajjCommittees = {
  majlisPenasihatHaji: {
    origin: "Wujud sejak 1969 di bawah seksyen 4A Akta 8 (Majlis Penasihat Urusan Haji)",
    statusAfterAct535:
      "Peruntukan termansuh apabila Akta 8 dimansuhkan, tetapi Majlis terus berfungsi secara pentadbiran.",
    dissolvedYear: 2018,
  },
  jawatankuasaUrusanHaji: {
    replaced: "Majlis Penasihat Haji",
    establishedYear: 2018,
    role: "Menilai dan membuat keputusan mengenai perkara berkaitan operasi haji.",
  },
  factType: F,
  source: [sourceRef("3.5.26–3.5.31", 97, 59)],
};

/** Organisasi yang muncul berulang kali dalam laporan. */
export const organisations = [
  { id: "lth", name: "Lembaga Tabung Haji", type: "Badan berkanun persekutuan", note: "Ditubuhkan melalui Akta 535, menggantikan LUTH pada 1 Jun 1995." },
  { id: "ujsb", name: "Urusharta Jamaah Sdn. Bhd.", type: "SPV milik penuh Menteri Kewangan Diperbadankan", incorporated: "2018-12-14" },
  { id: "bnm", name: "Bank Negara Malaysia", type: "Bank pusat / pemantau IKBB" },
  { id: "jan", name: "Jabatan Audit Negara", type: "Juruaudit badan berkanun" },
  { id: "mof", name: "Kementerian Kewangan Malaysia", type: "Kementerian" },
  { id: "sc", name: "Suruhanjaya Sekuriti Malaysia", type: "Pengawal selia pasaran modal" },
  { id: "pwc", name: "PricewaterhouseCoopers", type: "Firma perakaunan (financial review, forensik THP)" },
  { id: "ey", name: "Ernst & Young", type: "Firma perakaunan (RAV/proforma, audit anak syarikat, kajian model perniagaan)" },
  { id: "rb", name: "Roland Berger", type: "Firma perunding strategi" },
  { id: "zico", name: "Zaid Ibrahim & Co (ZICO)", type: "Firma guaman (cadangan pindaan Akta 535, 2021)" },
  { id: "jakim", name: "Jabatan Kemajuan Islam Malaysia", type: "Sekretariat Suruhanjaya" },
  { id: "sprm", name: "Suruhanjaya Pencegahan Rasuah Malaysia", type: "Agensi penguatkuasaan" },
  { id: "pdrm", name: "Polis Diraja Malaysia", type: "Agensi penguatkuasaan" },
  { id: "jppm", name: "Jabatan Penilaian dan Perkhidmatan Harta Malaysia (JPPHM)", type: "Penilai kerajaan" },
].map((o) => ({ ...o, factType: F, source: [sourceRef("Pelbagai", 1, null)] }));

export const institutionalHistory = [
  { year: 1951, event: "Ordinan Haji 1951 (The Muslim Pilgrims Ordinance, Federation of Malaya No.56 of 1951); Pejabat Urusan Hal Ehwal Haji, Pulau Pinang." },
  { year: 1962, event: "Perbadanan Wang Simpanan Bakal-Bakal Haji Tanah Melayu (PWSBH) ditubuhkan melalui Akta Parlimen Bil. 34/62." },
  { year: 1969, event: "Lembaga Urusan dan Tabung Haji (LUTH) ditubuhkan melalui Akta 8, berkuat kuasa 8 Ogos 1969; menggabungkan PWSBH dengan Pejabat Urusan Hal Ehwal Haji." },
  { year: 1995, event: "LUTH dimansuhkan 1 Jun 1995; Lembaga Tabung Haji (LTH) diwujudkan melalui Akta Tabung Haji 1995 (Akta 535), berkuat kuasa 16 Februari 1995." },
].map((h) => ({ ...h, factType: F, source: [sourceRef("2.1", 53, 15)] }));
