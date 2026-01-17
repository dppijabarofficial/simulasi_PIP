const API_URL =
  "https://script.google.com/macros/s/AKfycbwuvrXFMQgGrjhGQ-dD_vo0v2W_P5lCUd7SaY_x82JNCl5wxC2985_bsAo1o5wrTJM/exec";
const perHalaman = 3;
let waktu = 600;

let halaman = 0;
let timer;
let waktuHabis = false;
let jawaban = {};

const soal = [
  {
    t: "Pancasila sebagai dasar negara berarti Pancasila berfungsi sebagai …",
    p: [
      "Pandangan hidup masyarakat",
      "Ideologi tertutup",
      "Sumber dari segala sumber hukum",
      "Pedoman moral individu",
    ],
    j: 2,
  },
  {
    t: "Rumusan Pancasila yang sah dan berlaku hingga kini tercantum dalam …",
    p: [
      "Piagam Jakarta",
      "Pembukaan UUD 1945",
      "Batang Tubuh UUD 1945",
      "Ketetapan MPR",
    ],
    j: 1,
  },
  {
    t: "Nilai kemanusiaan dalam Pancasila tercermin dalam sikap …",
    p: [
      "Mengutamakan kepentingan golongan",
      "Menghargai martabat manusia",
      "Mementingkan kekuasaan",
      "Menghindari tanggung jawab",
    ],
    j: 1,
  },
  {
    t: "Hubungan antar sila Pancasila bersifat …",
    p: [
      "Saling berkaitan dan tidak terpisahkan",
      "Bertentangan",
      "Berdiri sendiri",
      "Fleksibel tanpa keterikatan",
    ],
    j: 0,
  },
  {
    t: "Contoh pengamalan sila ke-3 Pancasila adalah …",
    p: [
      "Cinta tanah air dan menjaga persatuan",
      "Mengutamakan musyawarah",
      "Menghormati perbedaan agama",
      "Berlaku adil kepada sesama",
    ],
    j: 0,
  },
  {
    t: "UUD 1945 disahkan oleh PPKI pada tanggal …",
    p: [
      "17 Agustus 1945",
      "18 Agustus 1945",
      "19 Agustus 1945",
      "20 Agustus 1945",
    ],
    j: 1,
  },
  {
    t: "Sistem pemerintahan Indonesia menurut UUD 1945 adalah …",
    p: ["Parlementer", "Monarki", "Federal", "Presidensial"],
    j: 3,
  },
  {
    t: "Hak warga negara untuk memperoleh pendidikan diatur dalam Pasal …",
    p: ["27 ayat (1)", "28A", "31 ayat (1)", "33 ayat (3)"],
    j: 2,
  },
  {
    t: "Lembaga negara yang berwenang mengubah UUD adalah …",
    p: ["DPR", "Presiden", "Mahkamah Konstitusi", "MPR"],
    j: 3,
  },
  {
    t: "Tujuan negara Indonesia tercantum dalam …",
    p: [
      "Pembukaan UUD 1945 alinea ke-4",
      "Penjelasan UUD 1945",
      "Batang tubuh UUD 1945",
      "Ketetapan Presiden",
    ],
    j: 0,
  },
  {
    t: "Arti dari Bhinneka Tunggal Ika adalah …",
    p: [
      "Satu bangsa satu bahasa",
      "Berbeda-beda tetapi tetap satu",
      "Bersatu tanpa perbedaan",
      "Sama rata sama rasa",
    ],
    j: 1,
  },
  {
    t: "Semboyan Bhinneka Tunggal Ika berasal dari kitab …",
    p: ["Negarakertagama", "Sutasoma", "Pararaton", "Arjunawiwaha"],
    j: 1,
  },
  {
    t: "Sikap yang mencerminkan Bhinneka Tunggal Ika di sekolah adalah …",
    p: [
      "Berteman dengan yang satu daerah",
      "Menghindari perbedaan",
      "Menghargai perbedaan suku dan agama",
      "Menyamakan semua kebiasaan",
    ],
    j: 2,
  },
  {
    t: "Bhinneka Tunggal Ika berfungsi sebagai perekat …",
    p: [
      "Budaya daerah",
      "Kekuasaan negara",
      "Kepentingan individu",
      "Persatuan bangsa",
    ],
    j: 3,
  },
  {
    t: "Bentuk negara Indonesia adalah …",
    p: ["Serikat", "Federasi", "Kesatuan", "Konfederasi"],
    j: 2,
  },
  {
    t: "Proklamasi Kemerdekaan Indonesia dilaksanakan pada …",
    p: [
      "16 Agustus 1945",
      "17 Agustus 1945",
      "18 Agustus 1945",
      "19 Agustus 1945",
    ],
    j: 1,
  },
  {
    t: "Tokoh yang membacakan teks Proklamasi adalah …",
    p: ["Mohammad Hatta", "Sutan Syahrir", "Ahmad Soebardjo", "Soekarno"],
    j: 3,
  },
  {
    t: "Tokoh yang mengetik naskah Proklamasi adalah …",
    p: ["Sayuti Melik", "Sukarni", "Latif Hendraningrat", "Ahmad Soebardjo"],
    j: 0,
  },
  {
    t: "Peristiwa Rengasdengklok bertujuan untuk …",
    p: [
      "Menyusun UUD",
      "Mendesak proklamasi segera",
      "Membentuk PPKI",
      "Menyusun kabinet",
    ],
    j: 1,
  },
  {
    t: "Lambang negara Indonesia adalah …",
    p: [
      "Burung Elang",
      "Burung Rajawali",
      "Garuda Pancasila",
      "Burung Cendrawasih",
    ],
    j: 2,
  },
  {
    t: "Jumlah bulu pada sayap Garuda Pancasila melambangkan angka …",
    p: ["17", "8", "19", "45"],
    j: 0,
  },
  {
    t: "Warna merah pada bendera Merah Putih melambangkan …",
    p: ["Kesucian", "Keberanian", "Kesetiaan", "Kemakmuran"],
    j: 1,
  },
  {
    t: "Pita yang dicengkeram Garuda bertuliskan …",
    p: ["Indonesia Raya", "Merdeka", "Bhinneka Tunggal Ika", "Pancasila"],
    j: 2,
  },
  {
    t: "Paskibraka pertama kali dibentuk pada tahun …",
    p: ["1950", "1945", "1965", "1973"],
    j: 0,
  },
  {
    t: "Penggagas Paskibraka adalah …",
    p: ["Soekarno", "Jenderal Sudirman", "Husein Mutahar", "Ahmad Yani"],
    j: 2,
  },
  {
    t: "Jumlah anggota Paskibraka tingkat nasional adalah …",
    p: ["45 orang", "68 orang", "76 orang", "34 orang"],
    j: 2,
  },
  {
    t: "Formasi 17-8-45 melambangkan …",
    p: [
      "Struktur pasukan",
      "Tingkatan Paskibraka",
      "Jumlah provinsi",
      "Tanggal proklamasi",
    ],
    j: 3,
  },
  {
    t: "Nilai utama yang harus dimiliki anggota Paskibraka adalah …",
    p: [
      "Popularitas",
      "Disiplin dan tanggung jawab",
      "Keberanian fisik",
      "Kekuasaan",
    ],
    j: 1,
  },
  {
    t: "Jika anggota Paskibraka tidak menghormati perbedaan agama, sila yang dilanggar adalah …",
    p: [
      "Persatuan Indonesia",
      "Kemanusiaan yang adil dan beradab",
      "Ketuhanan Yang Maha Esa",
      "Keadilan sosial",
    ],
    j: 2,
  },
  {
    t: "Menjaga persatuan bangsa di era digital dapat dilakukan dengan …",
    p: [
      "Menggunakan media sosial secara bijak",
      "Menolak perkembangan teknologi",
      "Menyebarkan informasi tanpa verifikasi",
      "Menghindari perbedaan pendapat",
    ],
    j: 0,
  },
  {
    t: "Sikap rela berkorban demi bangsa mencerminkan nilai …",
    p: ["Individualisme", "Nasionalisme", "Materialisme", "Egoisme"],
    j: 1,
  },
  {
    t: "Upacara bendera bagi Paskibraka bertujuan untuk …",
    p: [
      "Ajang hiburan",
      "Menanamkan nilai kebangsaan",
      "Formalitas",
      "Kompetisi antar sekolah",
    ],
    j: 1,
  },
  {
    t: "Ancaman terbesar terhadap NKRI saat ini adalah …",
    p: [
      "Perbedaan budaya",
      "Banyaknya bahasa daerah",
      "Keanekaragaman suku",
      "Lunturnya rasa nasionalisme",
    ],
    j: 3,
  },
  {
    t: "Sebagai pelajar Jawa Barat, wujud cinta NKRI dapat ditunjukkan dengan …",
    p: [
      "Mengutamakan budaya asing",
      "Menghindari budaya lokal",
      "Melestarikan budaya daerah",
      "Menolak keberagaman",
    ],
    j: 2,
  },
  {
    t: "Paskibraka disebut duta Pancasila karena …",
    p: [
      "Berasal dari sekolah unggulan",
      "Menjadi simbol persatuan bangsa",
      "Memiliki seragam khusus",
      "Dipilih secara acak",
    ],
    j: 1,
  },
  {
    t: "Disiplin dalam Paskibraka berdampak pada …",
    p: [
      "Kebebasan individu",
      "Kesuksesan pribadi",
      "Keberhasilan tugas dan kekompakan",
      "Popularitas",
    ],
    j: 2,
  },
  {
    t: "Makna nasionalisme bagi generasi muda adalah …",
    p: [
      "Cinta tanah air dan berkontribusi positif",
      "Menolak perubahan",
      "Mengagungkan masa lalu",
      "Menghindari budaya luar",
    ],
    j: 0,
  },
  {
    t: "Menghargai perbedaan pendapat saat musyawarah menunjukkan nilai …",
    p: [
      "Demokrasi Pancasila",
      "Otoritarianisme",
      "Liberalisme",
      "Individualisme",
    ],
    j: 0,
  },
  {
    t: "Sikap yang tidak sesuai nilai Paskibraka adalah …",
    p: ["Disiplin", "Tanggung jawab", "Egois", "Nasionalis"],
    j: 2,
  },
  {
    t: "Menjadi Paskibraka berarti siap …",
    p: [
      "Menjadi terkenal",
      "Mengutamakan kepentingan pribadi",
      "Mendapatkan keistimewaan",
      "Menjadi teladan bagi lingkungan",
    ],
    j: 3,
  },
  {
    t: "Pancasila disebut sebagai ideologi terbuka karena …",
    p: [
      "Dapat diubah sesuai kehendak penguasa",
      "Bersifat fleksibel tanpa nilai dasar",
      "Mengikuti ideologi bangsa lain",
      "Mampu menyesuaikan perkembangan zaman tanpa meninggalkan nilai dasar",
    ],
    j: 3,
  },
  {
    t: "Pelaksanaan musyawarah untuk mufakat merupakan pengamalan sila …",
    p: [
      "Ketuhanan Yang Maha Esa",
      "Kemanusiaan yang adil dan beradab",
      "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
      "Keadilan sosial bagi seluruh rakyat Indonesia",
    ],
    j: 2,
  },
  {
    t: "Hak dan kewajiban warga negara harus dilaksanakan secara seimbang agar …",
    p: [
      "Negara menjadi kuat secara ekonomi",
      "Kehidupan bermasyarakat berjalan tertib dan adil",
      "Tidak terjadi kesenjangan sosial",
      "Pemerintah mudah mengatur rakyat",
    ],
    j: 1,
  },
  {
    t: "Makna warna putih pada bendera Merah Putih adalah …",
    p: ["Keberanian", "Kesucian", "Kesetiaan", "Keadilan"],
    j: 1,
  },
  {
    t: "Peran pelajar sebagai generasi penerus bangsa adalah …",
    p: [
      "Belajar sungguh-sungguh dan berperilaku sesuai nilai Pancasila",
      "Menuntut hak tanpa kewajiban",
      "Mengkritik pemerintah tanpa solusi",
      "Menjaga jarak dari urusan kebangsaan",
    ],
    j: 0,
  },
  {
    t: "Keberagaman budaya di Indonesia apabila tidak disikapi dengan bijak dapat menimbulkan …",
    p: [
      "Konflik sosial",
      "Kemajuan teknologi",
      "Persatuan bangsa",
      "Integrasi nasional",
    ],
    j: 0,
  },
  {
    t: "Sikap anggota Paskibraka yang mencerminkan nasionalisme adalah …",
    p: [
      "Mengutamakan kepentingan pribadi",
      "Menjalankan tugas dengan disiplin dan penuh tanggung jawab",
      "Menonjolkan diri di hadapan publik",
      "Menghindari tugas berat",
    ],
    j: 1,
  },
  {
    t: "Tujuan utama dibentuknya Paskibraka adalah …",
    p: [
      "Melatih kemampuan baris-berbaris",
      "Menyiapkan pasukan upacara sekolah",
      "Menumbuhkan jiwa kepemimpinan dan cinta tanah air",
      "Mencari siswa berprestasi akademik",
    ],
    j: 2,
  },
  {
    t: "Menyebarkan berita bohong (hoaks) di media sosial bertentangan dengan nilai …",
    p: [
      "Ketuhanan dan kemanusiaan",
      "Nasionalisme dan persatuan bangsa",
      "Keadilan sosial",
      "Semua jawaban benar",
    ],
    j: 3,
  },
  {
    t: "Menjadi anggota Paskibraka berarti siap menempatkan kepentingan …",
    p: [
      "Keluarga di atas segalanya",
      "Sekolah di atas bangsa",
      "Bangsa dan negara di atas kepentingan pribadi",
      "Kelompok di atas persatuan",
    ],
    j: 2,
  },
];

function mulaiUjian() {
  const nama = namaInput();
  const sekolah = sekolahInput();
  const daerah = daerahInput();
  if (!nama || !sekolah || !daerah) return alert("Lengkapi data!");

  localStorage.setItem("nama", nama);
  localStorage.setItem("sekolah", sekolah);
  localStorage.setItem("daerah", daerah);

  document.querySelector(".info").classList.add("hidden");
  document.querySelector(".timer").classList.remove("hidden");
  document.querySelector(".progress-box").classList.remove("hidden");
  navSoal.classList.remove("hidden");
  quizForm.classList.remove("hidden");

  mulaiTimer();
  tampilkan();
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;
    time.textContent = `${Math.floor(waktu / 60)}:${String(waktu % 60).padStart(
      2,
      "0"
    )}`;
    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis, jawaban dikirim.");
      kirim();
    }
  }, 1000);
}

function tampilkan() {
  window.scrollTo(0, 0);
  soalContainer.innerHTML = "";
  const start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    const idx = start + i;
    soalContainer.innerHTML += `
    <div class="question">
      <p>${idx + 1}. ${x.t}</p>
      ${x.p
        .map(
          (a, j) => `
        <label>
          <input type="radio" name="q${idx}" value="${j}"
            ${jawaban[idx] === j ? "checked" : ""}>
          ${a}
        </label>`
        )
        .join("")}
    </div>`;
  });

  nextBtn.textContent =
    start + perHalaman >= soal.length ? "Selesai" : "Berikutnya ➡";

  pasangAutoSave();
  updateProgress();
  buatNavigasi();
}

function pasangAutoSave() {
  document.querySelectorAll("input[type=radio]").forEach((r) => {
    r.onchange = () => {
      jawaban[Number(r.name.replace("q", ""))] = Number(r.value);
      updateProgress();
      buatNavigasi();
    };
  });
}

function simpan() {
  document.querySelectorAll("input[type=radio]:checked").forEach((r) => {
    jawaban[Number(r.name.replace("q", ""))] = Number(r.value);
  });
}

function berikutnya() {
  simpan();
  if ((halaman + 1) * perHalaman >= soal.length) {
    kirim(); // ← INI KUNCI
  } else {
    halaman++;
    tampilkan();
  }
}

function sebelumnya() {
  simpan();
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}

function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) if (jawaban[i] === undefined) return i;
  return -1;
}

function kirim() {
  simpan();
  if (!waktuHabis) {
    const k = semuaTerjawab();
    if (k !== -1) {
      alert(`Soal ${k + 1} belum dijawab`);
      halaman = Math.floor(k / perHalaman);
      tampilkan();
      return;
    }
  }

  clearInterval(timer);

  let benar = 0;
  soal.forEach((s, i) => {
    if (jawaban[i] === s.j) benar++;
  });
  const nilai = Math.round((benar / soal.length) * 100);
  localStorage.setItem("nilai", nilai);

  const fd = new FormData();
  fd.append("nama", localStorage.getItem("nama"));
  fd.append("sekolah", localStorage.getItem("sekolah"));
  fd.append("daerah", localStorage.getItem("daerah"));
  fd.append("nilai", nilai);

  fetch(API_URL, { method: "POST", body: fd }).finally(
    () => (location.href = "hasil.html")
  );
}

function updateProgress() {
  const j = Object.keys(jawaban).length;
  progressBar.style.width = `${(j / soal.length) * 100}%`;
  progressText.textContent = `${j} / ${soal.length}`;
}

function buatNavigasi() {
  navSoal.innerHTML = "";
  soal.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (jawaban[i] !== undefined) b.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) b.classList.add("active");
    b.onclick = () => {
      simpan();
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };
    navSoal.appendChild(b);
  });
}

const namaInput = () => nama.value.trim();
const sekolahInput = () => sekolah.value.trim();
const daerahInput = () => daerah.value.trim();
