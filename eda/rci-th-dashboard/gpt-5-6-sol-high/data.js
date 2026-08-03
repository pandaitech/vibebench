window.RCI_DATA = {
  sourceBase: "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md",
  financial: [
    {year:2013, assets:48778, liabilities:43696, pre:5082, distribution:2632, post:2450},
    {year:2014, assets:54751, liabilities:51866, pre:2885, distribution:3237, post:-352},
    {year:2015, assets:60196, liabilities:60062, pre:134, distribution:3220, post:-3086},
    {year:2016, assets:64321, liabilities:65581, pre:-1260, distribution:2871, post:-4131},
    {year:2017, assets:70317, liabilities:71086, pre:-769, distribution:3324, post:-4093}
  ],
  hibah: [
    {year:2014, annual:6.25, hajj:2.00},{year:2015, annual:5.00, hajj:3.00},
    {year:2016, annual:4.25, hajj:1.50},{year:2017, annual:4.50, hajj:1.75},
    {year:2018, annual:1.25, hajj:0},{year:2019, annual:3.05, hajj:0},
    {year:2020, annual:3.10, hajj:0},{year:2021, annual:3.10, hajj:0}
  ],
  deposits: [
    {label:"Sebelum hibah 2018",value:73,note:"kira-kira"},
    {label:"Akhir 2019",value:69,note:"kira-kira"},
    {label:"Akhir 2020",value:76,note:"lebih kurang"},
    {label:"Ketika laporan",value:88,note:"setakat 21 Mei 2022"}
  ],
  impairmentPolicies: [
    {threshold:70, months:">24 bulan", impact:1313},
    {threshold:85, months:"Tiada", impact:171},
    {threshold:90, months:"Tiada", impact:1}
  ],
  profitBridge: [
    {label:"Untung dilapor",value:3412,type:"start"},
    {label:"Rosot nilai ekuiti AFS",value:-4258,type:"down"},
    {label:"Rosot nilai hutang AFS",value:-7,type:"down"},
    {label:"Pelarasan lain",value:-580,type:"down"},
    {label:"Rugi terlaras",value:-1433,type:"end"}
  ],
  transferAssets: [
    {name:"Hartanah & tanah",book:1411,transfer:2247,market:1411},
    {name:"Syarikat perladangan",book:718,transfer:802,market:718},
    {name:"Ekuiti tersenarai",book:16852,transfer:16851,market:7600}
  ],
  properties: [
    {name:"Tanah",area:1353361.48,transfer:627.006479,market2021:401.08},
    {name:"Menara pejabat",area:354021,transfer:737.399698,market2021:325},
    {name:"Lot kedai",area:120062,transfer:46.301759,market2021:33.33},
    {name:"Hotel",area:354134,transfer:804.058625,market2021:424.27},
    {name:"Perindustrian",area:35019,transfer:31.914386,market2021:19}
  ],
  bluechips: [
    {name:"Axiata",transferUnit:6.00,market2018:3.63,market2022:3.04,transferTotal:1422.605154,marketTotal:931.803255,drop:490.801899},
    {name:"Maxis",transferUnit:6.84,market2018:5.43,market2022:3.52,transferTotal:879.395994,marketTotal:681.197584,drop:198.198410},
    {name:"MISC",transferUnit:7.43,market2018:6.15,market2022:7.30,transferTotal:486.532216,marketTotal:438.925710,drop:47.606506},
    {name:"Digi",transferUnit:5.13,market2018:4.24,market2022:3.27,transferTotal:576.240738,marketTotal:500.328955,drop:75.911783},
    {name:"TM",transferUnit:5.96,market2018:2.33,market2022:5.20,transferTotal:241.202959,marketTotal:107.650200,drop:133.552759}
  ],
  investments: [
    {id:"thip",name:"PT TH Indo Plantations",category:"Perladangan",amount:178.6,currency:"USD juta",impact:"Pendahuluan",severity:3,status:"Siasatan",page:178,summary:"Syer dipindah sebelum bayaran penuh; harga asal USD910 juta dikurangkan USD100 juta; LTH mendahulukan USD178.6 juta yang sepatutnya dilunaskan pembeli.",action:"Siasatan dalaman, siasatan forensik dan laporan polis."},
    {id:"emrail",name:"Emrail Sdn. Bhd.",category:"Ekuiti",amount:19.3,currency:"RM juta",impact:"Rosot nilai",severity:2,status:"Timbang tara",page:178,summary:"Hak jual RM20.3 juta dilaksana selepas sasaran penyenaraian dan keuntungan gagal; hanya RM2 juta dibayar.",action:"Kes didaftarkan ke AIAC pada 22 April 2022."},
    {id:"wellspring",name:"Wellspring Worldwide",category:"Ekuiti",amount:19.03,currency:"RM juta",impact:"Rosot nilai",severity:2,status:"Mahkamah",page:179,summary:"Pihak penganjur gagal membeli semula saham dan gagal membuat bayaran walaupun diperintah mahkamah.",action:"Notis kebankrapan dibenarkan pada 25 Januari 2022."},
    {id:"dssb",name:"Deru Semangat Sdn. Bhd.",category:"Perladangan",amount:225,currency:"RM juta",impact:"Susut nilai terbitan",severity:3,status:"Penyelesaian",page:180,summary:"RM257 juta dikeluarkan dan nilai dilaporkan turun kepada RM32 juta; baki komitmen RM258 juta turut berisiko.",action:"Pegangan dirungkai dengan bayaran RM259 juta; komitmen lanjut diketepikan.",derived:true},
    {id:"trurich",name:"Trurich Resources",category:"Perladangan",amount:364.31,currency:"RM juta",impact:"Rosot nilai penuh",severity:3,status:"Pelupusan",page:181,summary:"Usaha sama menjadi insolven; seluruh pelaburan RM364.31 juta dirosot nilai dan baki pinjaman USD179 juta masih tertunggak.",action:"Pelupusan anak syarikat diluluskan; FGV dan Maybank mengurus proses."},
    {id:"abraj",name:"Abraj Sdn. Bhd.",category:"Hartanah",amount:40.25,currency:"RM juta",impact:"Rosot nilai",severity:2,status:"Selesai",page:182,summary:"Usaha sama tidak mampu menjana pendapatan mencukupi untuk membayar pinjaman bank.",action:"Amanah Raya membeli pegangan 50% LTH pada Disember 2020."},
    {id:"ppb",name:"Putrajaya Perdana Berhad",category:"Ekuiti",amount:145.3,currency:"RM juta",impact:"Rosot nilai",severity:3,status:"Penyelesaian",page:183,summary:"Syarikat gagal disenaraikan dan gagal mencapai sasaran untung; hak jual RM210.7 juta tidak dibayar.",action:"Cadangan pengaturan penyelesaian sedang melalui kelulusan dalaman."},
    {id:"rawda",name:"Al-Rawda",category:"Hartanah",amount:386.8,currency:"RM juta",impact:"ECL + rosot nilai",severity:3,status:"Timbang tara",page:185,summary:"Sewa empat hotel tertunggak SR560.7 juta. RM202.8 juta ECL direkodkan dan tambahan RM184 juta dijangka.",action:"Rundingan, likuidasi aset dan timbang tara berjalan serentak.",derived:true},
    {id:"fareeda",name:"Al-Fareeda Residential Fund",category:"Hartanah",amount:76,currency:"SR juta",impact:"Hapus kira penuh",severity:3,status:"Hapus kira",page:188,summary:"Dana dicairkan, aset di bawah Alinma Bank dan pengurus dana tidak dapat dikesan.",action:"Keseluruhan pelaburan SR76 juta dihapus kira."},
    {id:"thp",name:"TH Plantations Berhad",category:"Perladangan",amount:170,currency:"RM juta",impact:"Rosot nilai",severity:3,status:"Siasatan",page:188,summary:"Hanya 58% ladang produktif; estet dijual untuk membayar hutang dan hasil sawit merosot.",action:"Laporan dibuat kepada PDRM, SPRM dan Suruhanjaya Sekuriti."},
    {id:"properties",name:"TH Properties",category:"Tadbir urus",amount:2.1934,currency:"RM juta",impact:"Bonus istimewa",severity:2,status:"Dapat semula",page:189,summary:"Bonus istimewa 2017 dan 2018 dibayar tanpa kelulusan LTH sebagai pemegang saham utama.",action:"Keputusan dibuat untuk mendapatkan semula bonus."},
    {id:"marine",name:"Alam Maritim / TH Marine",category:"Maritim",amount:278,currency:"RM juta",impact:"Rosot nilai",severity:3,status:"Semakan",page:190,summary:"Semua RM198 juta ekuiti dan RM80 juta daripada pembiayaan RM136 juta dirosot nilai.",action:"PwC menganggar hanya RM70.4 juta boleh diperoleh semula.",derived:true},
    {id:"thhr",name:"TH Hotel & Residences",category:"Hartanah",amount:5.9,currency:"RM juta",impact:"Rugi bersih",severity:2,status:"Dipindah",page:191,summary:"Hartanah pulangan bawah 2% dipindah; hasil sewaan 2020 turun 62% kepada RM6.2 juta.",action:"Lima hotel dan kompleks haji dipindahkan kepada UJSB."},
    {id:"fgv",name:"FGV Berhad",category:"Ekuiti",amount:1058.94,currency:"RM juta",impact:"Kerugian tidak nyata",severity:3,status:"Dipindah",page:192,summary:"Harga jatuh daripada kos sekitar RM4.58 seunit kepada RM0.885; kerugian tidak nyata melebihi RM1.05 bilion.",action:"283.7 juta saham diambil alih UJSB pada nilai kos."}
  ],
  hafisActual: [
    {year:2014,cost:16155,payment:9980,hafis:6175,total:106,kind:"sebenar"},
    {year:2015,cost:17270,payment:9980,hafis:7290,total:135,kind:"sebenar"},
    {year:2016,cost:18890,payment:9980,hafis:8910,total:160,kind:"sebenar"},
    {year:2017,cost:19550,payment:9980,hafis:9570,total:298,kind:"sebenar"},
    {year:2018,cost:22450,payment:9980,hafis:12470,total:314,kind:"sebenar"},
    {year:2019,cost:22900,payment:9980,hafis:12920,total:299,kind:"sebenar"}
  ],
  hafisProjection: [
    {year:2022,cost:25540,payment:12980,hafis:12560,total:376.8,kind:"unjuran"},
    {year:2023,cost:26280,payment:12980,hafis:13300,total:399.0,kind:"unjuran"},
    {year:2024,cost:28160,payment:12980,hafis:15180,total:455.4,kind:"unjuran"},
    {year:2025,cost:29570,payment:12980,hafis:16590,total:497.7,kind:"unjuran"},
    {year:2026,cost:31040,payment:12980,hafis:18060,total:541.8,kind:"unjuran"},
    {year:2027,cost:32592,payment:12980,hafis:19612,total:588.36,kind:"unjuran"},
    {year:2028,cost:34221,payment:12980,hafis:21241,total:637.23,kind:"unjuran"},
    {year:2029,cost:35932,payment:12980,hafis:22952,total:688.56,kind:"unjuran"},
    {year:2030,cost:37729,payment:12980,hafis:24749,total:742.47,kind:"unjuran"}
  ],
  bonuses: [
    {year:2010,amount:25,max:6},{year:2011,amount:35,max:6},{year:2012,amount:38,max:8},
    {year:2013,amount:49,max:10},{year:2014,amount:74,max:13},{year:2015,amount:65,max:10},
    {year:2016,amount:25,max:3},{year:2017,amount:56.7,max:6},{year:2018,amount:10.8,max:1},
    {year:2019,amount:11.6,max:1},{year:2020,amount:14.1,max:1}
  ],
  evidence: [
    {page:112,topic:"Hibah",claim:"Aset, liabiliti dan agihan keuntungan 2014–2017",type:"Fakta laporan"},
    {page:115,topic:"Perakaunan",claim:"Polisi rosot nilai berubah daripada 70% kepada 85% dan 90%",type:"Fakta laporan"},
    {page:116,topic:"Perakaunan",claim:"RAV menambah RM4.466 bilion kepada aset 2017",type:"Fakta laporan"},
    {page:120,topic:"Hibah",claim:"Kadar hibah 2014–2021",type:"Fakta laporan"},
    {page:122,topic:"Deposit",claim:"Deposit turun kira-kira RM73b kepada RM69b selepas hibah 1.25%",type:"Fakta laporan"},
    {page:137,topic:"Bonus",claim:"Bonus kakitangan 2010–2020",type:"Fakta laporan"},
    {page:149,topic:"Perakaunan",claim:"Untung RM3.412b menjadi rugi terlaras RM1.433b",type:"Analisis PwC dipetik laporan"},
    {page:159,topic:"UJSB",claim:"Aset RM19.9b dipindah berbanding nilai pasaran RM9.729b",type:"Fakta laporan"},
    {page:161,topic:"UJSB",claim:"Hartanah RM2.247b bernilai RM1.203b pada Disember 2021",type:"Fakta laporan"},
    {page:162,topic:"UJSB",claim:"Lima saham mewah susut RM946.1 juta ketika pindahan",type:"Fakta laporan"},
    {page:166,topic:"UJSB",claim:"Kerajaan lulus sekurang-kurangnya RM17.8b untuk shortfall sukuk",type:"Fakta laporan"},
    {page:177,topic:"Pelaburan",claim:"14 pelaburan disyorkan untuk audit forensik",type:"Syor Suruhanjaya"},
    {page:204,topic:"HAFIS",claim:"Kos, bayaran dan HAFIS sebenar 2014–2019",type:"Fakta laporan"},
    {page:205,topic:"HAFIS",claim:"Unjuran HAFIS 2022–2030 pada bayaran RM12,980",type:"Unjuran dalam laporan"},
    {page:208,topic:"HAFIS",claim:"65% pendeposit mempunyai RM2,000 atau kurang",type:"Fakta laporan"}
  ]
};
