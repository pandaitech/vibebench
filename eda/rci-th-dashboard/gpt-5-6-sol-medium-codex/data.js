window.RCI_DATA = {
  source: 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md',
  causal: [
    {id:'mandat',n:'01',type:'fact',title:'Kuasa & semak imbang lemah',short:'Akta memberi kuasa luas; kriteria kepakaran tidak khusus.',page:43,detail:'RCI mendapati Menteri bergantung kepada cadangan pengurusan bagi urusan dana dan pelaburan, manakala panel penting tidak dikanunkan secara khusus.'},
    {id:'hibah',n:'02',type:'finding',title:'Tekanan hibah tinggi',short:'Kadar tinggi menarik deposit tetapi menekan rizab.',page:120,detail:'Menurut RCI, keinginan memenuhi jangkaan pendeposit mendorong kadar hibah yang tidak boleh dipertahankan dan pengambilan risiko lebih tinggi.'},
    {id:'risiko',n:'03',type:'finding',title:'Pelaburan lebih berisiko',short:'Portfolio berat kepada ekuiti dan pelaburan strategik.',page:121,detail:'Laporan Roland Berger yang dipetik RCI menyatakan pendedahan ekuiti, khususnya domestik, melebihi saranan dan mudah terjejas turun naik pasaran.'},
    {id:'akaun',n:'04',type:'finding',title:'Nilai aset dipersoal',short:'RAV dan ambang rosot nilai menaikkan gambaran aset.',page:113,detail:'RAV memasukkan anggaran pengurusan. Pada 2017, hanya RM556j daripada penilaian hartanah RM4.6b berasaskan penilai profesional menurut laporan.'},
    {id:'jurang',n:'05',type:'outcome',title:'Jurang kewangan terbuka',short:'PwC mengira rugi RM1.43b, bukan untung RM3.41b.',page:150,detail:'Selepas pelarasan rosot nilai dan lain-lain, hasil 2017 berubah sebanyak RM4.84b. Jurang aset selepas hibah dianggarkan RM4.093b.'},
    {id:'pemulihan',n:'06',type:'outcome',title:'Risiko dipindah & disusun semula',short:'Aset lemah dipindah ke UJSB pada nilai premium.',page:152,detail:'Aset bernilai pasaran RM9.729b dipindah pada RM19.9b. Sebagai balasan, LTH menerima sukuk dan RM300j tunai; Kerajaan meluluskan peruntukan untuk kekurangan penebusan.'}
  ],
  gap:[
    {year:2013,pre:5082,distribution:2632,post:2450},{year:2014,pre:2885,distribution:3237,post:-352},{year:2015,pre:134,distribution:3220,post:-3086},{year:2016,pre:-1260,distribution:2871,post:-4131},{year:2017,pre:-769,distribution:3324,post:-4093}
  ],
  hibah:[
    {year:2014,annual:6.25,hajj:2,totalRm:3237.196,note:'Aset masih berlebihan sebelum hibah, tetapi menjadi kekurangan RM352j selepas agihan.'},
    {year:2015,annual:5,hajj:3,totalRm:3220.374,note:'Jumlah hibah 8.0%. Jurang selepas agihan melebar kepada RM3.086b.'},
    {year:2016,annual:4.25,hajj:1.5,totalRm:2870.822,note:'Aset sudah kurang RM1.26b sebelum hibah menurut pelarasan PwC.'},
    {year:2017,annual:4.5,hajj:1.75,totalRm:3323.741,note:'RM600j tambahan dibayar selepas kaedah pengiraan kembali kepada baki minimum bulanan.'},
    {year:2018,annual:1.25,hajj:0,totalRm:922.959,note:'Kadar turun selepas penstrukturan dan pemakaian penuh piawaian perakaunan.'},
    {year:2019,annual:3.05,hajj:0,totalRm:2140.538,note:'Laporan menyatakan deposit turun kira-kira RM73b kepada RM69b pada akhir 2019.'},
    {year:2020,annual:3.10,hajj:0,totalRm:2242.141,note:'RCI menyatakan rizab digunakan untuk menampung agihan 2020 dan 2021.'},
    {year:2021,annual:3.10,hajj:0,totalRm:null,note:'Kadar kekal 3.10%; jumlah ringgit tidak diberikan dalam jadual laporan yang sama.'}
  ],
  hafisActual:[
    {year:2014,cost:16155,payment:9980,total:106},{year:2015,cost:17270,payment:9980,total:135},{year:2016,cost:18890,payment:9980,total:160},{year:2017,cost:19550,payment:9980,total:298},{year:2018,cost:22450,payment:9980,total:314},{year:2019,cost:22900,payment:9980,total:299}
  ],
  hafisProjection:[
    {year:2022,cost:25540,payment:12980,total:376.8},{year:2023,cost:26280,payment:12980,total:399},{year:2024,cost:28160,payment:12980,total:455.4},{year:2025,cost:29570,payment:12980,total:497.7},{year:2026,cost:31040,payment:12980,total:541.8},{year:2027,cost:32592,payment:12980,total:588.36},{year:2028,cost:34221,payment:12980,total:637.23},{year:2029,cost:35932,payment:12980,total:688.56},{year:2030,cost:37729,payment:12980,total:742.47}
  ],
  assetTypes:[
    {name:'Ekuiti tersenai',book:16852,transfer:16851,market:7600,color:'#dcae45'},
    {name:'Hartanah & tanah',book:1411,transfer:2247,market:1411,color:'#62a98a'},
    {name:'Syarikat perladangan',book:718,transfer:802,market:718,color:'#8c7ed0'}
  ],
  investments:[
    {id:'thip',name:'PT TH Indo Plantations',place:'Luar negara',country:'Indonesia',category:'Perladangan',status:'Undang-undang',page:177,headline:'Harga jual dikurangkan USD100j',metrics:[['Pegangan dijual','95%'],['Harga asal','USD910j'],['Pendahuluan LTH','USD178.6j']],issue:'Syer dipindah sebelum bayaran penuh; harga asal dikurangkan dan jadual bayaran tidak dipatuhi.',action:'Siasatan forensik dan laporan polis dibuat.',severity:5},
    {id:'emrail',name:'Emrail Sdn. Bhd.',place:'Malaysia',country:'Malaysia',category:'Ekuiti',status:'Undang-undang',page:178,headline:'RM19.3j dirosot nilai',metrics:[['Pelaburan','RM20.17j'],['Dibayar balik','RM2j'],['Rosot nilai','RM19.3j']],issue:'Penyenaraian gagal dan sasaran untung RM36.1j tidak dicapai. Baki hak jual belum dilangsaikan.',action:'Kes dirujuk ke timbang tara AIAC.',severity:2},
    {id:'wellspring',name:'Wellspring Worldwide',place:'Malaysia',country:'Malaysia',category:'Ekuiti',status:'Undang-undang',page:179,headline:'Tiada bayaran selepas hak jual',metrics:[['Pelaburan','RM18.4j'],['Tuntutan mahkamah','RM20.8j'],['Rosot nilai','RM19.03j']],issue:'Gagal disenaraikan; promoter tidak membuat bayaran walaupun perintah mahkamah.',action:'Notis kebankrapan dibenarkan pada Januari 2022.',severity:2},
    {id:'deru',name:'Deru Semangat Sdn. Bhd.',place:'Malaysia',country:'Malaysia',category:'Perladangan',status:'Penyelesaian',page:180,headline:'Nilai RM257j turun ke RM32j',metrics:[['Diluluskan','RM526.16j'],['Dikeluarkan','RM257j'],['Nilai selepas rosot','RM32j']],issue:'Projek berdepan isu pembalakan hutan simpan dan sekatan pembeli utama.',action:'Pegangan dirungkai; komitmen lanjutan RM258j diketepikan.',severity:4},
    {id:'trurich',name:'Trurich Resources',place:'Luar negara',country:'Indonesia',category:'Perladangan',status:'Undang-undang',page:181,headline:'RM364.31j dirosot nilai penuh',metrics:[['Pelaburan','RM364.31j'],['Pinjaman tertunggak','USD179j'],['Rosot nilai','100%']],issue:'Usaha sama tidak berhasil dan syarikat menjadi insolven.',action:'Laporan polis; proses pelupusan anak syarikat.',severity:5},
    {id:'abraj',name:'Abraj Sdn. Bhd.',place:'Malaysia',country:'Malaysia',category:'Hartanah',status:'Selesai',page:182,headline:'Kerugian rosot nilai RM40.25j',metrics:[['Ekuiti keseluruhan','RM85j'],['Rosot nilai','RM40.25j'],['Pegangan dijual','50%']],issue:'Pendapatan sewa tidak cukup menampung pinjaman bank selepas penyewa utama berpindah.',action:'Pegangan LTH dibeli Amanah Raya pada Disember 2020.',severity:3},
    {id:'ppb',name:'Putrajaya Perdana Berhad',place:'Malaysia',country:'Malaysia',category:'Ekuiti',status:'Undang-undang',page:183,headline:'Rosot nilai RM145.3j',metrics:[['Pelaburan','RM193.5j'],['Hak jual','RM210.7j'],['Nilai buku bersih','RM48.2j']],issue:'Penyenaraian dan sasaran keuntungan gagal; pembeli asal gagal memenuhi hak jual.',action:'Cadangan penyelesaian sedang melalui kelulusan dalaman ketika laporan.',severity:4},
    {id:'rawda',name:'Al-Rawda (4 hotel)',place:'Luar negara',country:'Arab Saudi',category:'Hartanah',status:'Undang-undang',page:184,headline:'Sewa tertunggak SR560.7j',metrics:[['Nilai pajakan','SR1,426j'],['Sewa tertunggak','SR560.7j'],['ECL 2020','RM202.8j']],issue:'Pengendali gagal membayar sewa bagi empat hotel; pertikaian syariah dibawa ke timbang tara.',action:'Rundingan, penguatkuasaan nota janji dan likuidasi aset berjalan serentak.',severity:5},
    {id:'fareeda',name:'Al-Fareeda Residential Fund',place:'Luar negara',country:'Arab Saudi',category:'Dana',status:'Hapus kira',page:188,headline:'SR76j dihapus kira penuh',metrics:[['Pelaburan','SR76j'],['Setara ketika dilabur','RM63j'],['Rosot nilai','100%']],issue:'Projek terjejas isu buruh, kontraktor, kos binaan dan harga minyak; pengurus dana tidak dapat dikesan.',action:'Dana dicairkan dan pelaburan dihapus kira.',severity:3},
    {id:'thp',name:'TH Plantations Berhad',place:'Malaysia',country:'Malaysia',category:'Perladangan',status:'Undang-undang',page:188,headline:'Hanya 58% ladang produktif',metrics:[['Sukuk pembiayaan','RM1.2b'],['Ladang produktif','58%'],['Rosot nilai LTH','RM170j']],issue:'Pembelian ladang dibiayai hutang; laporan forensik mengenal pasti kegagalan tanggungjawab fidusiari.',action:'Laporan kepada PDRM, SPRM dan SC.',severity:4},
    {id:'thprop',name:'TH Properties',place:'Malaysia',country:'Malaysia',category:'Hartanah',status:'Tuntutan balik',page:189,headline:'Bonus istimewa RM2.2j',metrics:[['2017','RM1.148j'],['2018','RM1.045j'],['Jumlah','RM2.193j']],issue:'Bonus diluluskan tanpa mandat dan kelulusan pemegang saham yang diperlukan.',action:'Keputusan dibuat untuk mendapatkan semula bonus.',severity:2},
    {id:'marine',name:'Alam Maritim / TH Marine',place:'Malaysia',country:'Malaysia',category:'Maritim',status:'Penyelesaian',page:190,headline:'RM278j dirosot nilai',metrics:[['Jumlah pelaburan','RM334j'],['Rosot nilai ekuiti','RM198j'],['Rosot nilai pembiayaan','RM80j']],issue:'Pelaburan lapan kapal sokongan luar pesisir mengalami kemerosotan nilai besar.',action:'PwC menganggar hanya RM70.4j boleh diperoleh semula.',severity:4},
    {id:'hotel',name:'TH Hotel & Residences',place:'Malaysia',country:'Malaysia',category:'Hartanah',status:'Dipindah UJSB',page:191,headline:'5 aset dipindah RM804.1j',metrics:[['Nilai pindahan','RM804.1j'],['Pulangan aset','<2%'],['Hasil sewa 2020','RM6.2j']],issue:'Hotel dan kompleks haji dikenal pasti sebagai aset pulangan rendah; hasil sewa jatuh 62% pada 2020.',action:'Lima aset dipindah kepada UJSB; Movenpick dan Kelana Jaya dikecualikan.',severity:3},
    {id:'fgv',name:'FGV Berhad',place:'Malaysia',country:'Malaysia',category:'Ekuiti',status:'Dipindah UJSB',page:192,headline:'Kerugian tidak nyata RM1.06b',metrics:[['Kos pegangan','RM1.31b'],['Harga kos','RM4.62/unit'],['Harga Feb 2022','RM0.69/unit']],issue:'Saham terus dipegang ketika harga jatuh mendadak; RCI mempersoalkan mengapa tidak dijual lebih awal.',action:'283.7j saham diambil alih UJSB pada nilai kos.',severity:5}
  ],
  bonus:[{year:2010,value:25},{year:2011,value:35},{year:2012,value:38},{year:2013,value:49},{year:2014,value:74},{year:2015,value:65},{year:2016,value:25},{year:2017,value:56.7},{year:2018,value:10.8},{year:2019,value:11.6},{year:2020,value:14.1}],
  recipients:{
    2017:[['Datuk Azizan Abd Rahman',231000],['Dato’ Roszali Othman',189750],['Haji Abd Kadir Sahlan',189750],['Nik Badrul Hisham',99000],['Anuarifaei Mustapa',99000],['Nur Adlan Taib',99000],['Zaidi Baharudin',56100],['Mohamed Rahim Ismail',52800],['Aida Karim',49500],['Marhaizah Mohamed Yusuf',49500],['Dato’ Mohd Fazillah',33000]],
    2018:[['Dato’ Roszali Othman',176500],['Haji Abd Kadir Sahlan',176500],['Dato’ Azizan Abd Rahman',167250],['Nik Badrul Hisham',101500],['Anuarifaei Mustapa',101500],['Nur Adlan Taib',101500],['Zaidi Baharudin',63000],['Aida Karim',63000],['Marhaizah Mohamed Yusuf',63000],['Mohamed Rahim Ismail',31250]]
  },
  recommendations:[
    {area:'Kuasa & tadbir urus',title:'Kongsi mandat kewangan dan hal ehwal haji',plain:'Menteri Agama fokus operasi haji; Menteri Kewangan fokus dana dan pelaburan. Pelantikan melalui badan penasihat bebas.',page:228},
    {area:'Ketelusan kewangan',title:'Hibah hanya selepas akaun diaudit',plain:'Gunakan angka aset dan liabiliti dalam penyata beraudit—bukan laporan proforma atau RAV.',page:229},
    {area:'Pelaburan',title:'Wujudkan Dana Haji yang profesional',plain:'Fungsi pelaburan kekal dalam LTH tetapi dipisahkan sebagai jabatan khusus dan dikawal selia Suruhanjaya Sekuriti.',page:232},
    {area:'Kos haji',title:'HAFIS hanya untuk yang memerlukan',plain:'Naikkan simpanan pendaftaran kepada bayaran haji semasa dan sasar bantuan mengikut kemampuan.',page:231},
    {area:'Akauntabiliti',title:'Audit forensik 14 pelaburan bermasalah',plain:'Jejak bagaimana keputusan dibuat dan pertanggungjawabkan pihak yang terlibat.',page:230},
    {area:'Pemulihan',title:'Pastikan sukuk UJSB boleh ditunaikan',plain:'Tambah jaminan Kerajaan, jadikan instrumen boleh diniaga dan teruskan peruntukan penebusan tahunan.',page:230}
  ],
  timeline:[
    {date:'2014',type:'Amaran',title:'Jurang muncul selepas hibah',text:'Lebihan RM2.885b sebelum hibah bertukar kekurangan RM352j selepas agihan.'},
    {date:'23 Dis 2015',type:'Amaran',title:'BNM tegur kemampuan bayar hibah',text:'LTH kemudian melantik EY menyediakan laporan proforma.'},
    {date:'2016',type:'Keputusan',title:'Akad deposit ditukar',text:'Mudarabah berubah kepada Wadi’ah Yad Dhamanah tanpa kajian menyeluruh yang dapat dibuktikan, menurut RCI.'},
    {date:'2017',type:'Keputusan',title:'Polisi rosot nilai diubah dua kali',text:'Ambang disebut berubah daripada 70% kepada 85% dan 90% dalam satu hari.'},
    {date:'16 Jul 2018',type:'Amaran',title:'Audit bersih dengan “Emphasis of Matter”',text:'KAN menegur polisi rosot nilai tidak konsisten dan RM227.81j tidak direkod.'},
    {date:'7 Dis 2018',type:'Pemulihan',title:'Pelan pemulihan diluluskan',text:'Kabinet meluluskan penstrukturan untuk menangani defisit aset-liabiliti.'},
    {date:'14–27 Dis 2018',type:'Pemulihan',title:'UJSB ditubuh dan aset dipindah',text:'Aset dipindah pada RM19.9b berbanding nilai pasaran RM9.7b.'},
    {date:'2019',type:'Keputusan',title:'Hibah rendah, deposit mengecil',text:'Selepas kadar 1.25%, deposit dilaporkan turun kira-kira RM73b kepada RM69b.'},
    {date:'Dis 2019',type:'Keputusan',title:'Akad Wakalah diperkenal',text:'Struktur baharu menjelaskan penggunaan dana untuk pelaburan, kos, zakat dan bantuan haji.'},
    {date:'19 Jul 2022',type:'Pemulihan',title:'Laporan RCI dimuktamadkan',text:'RCI mengemukakan penemuan dan cadangan pembaharuan.'}
  ]
};
