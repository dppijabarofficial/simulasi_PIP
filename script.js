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
    t: "Pancasila disahkan sebagai dasar negara pada tanggal?",
    p: ["1 Juni 1945", "22 Juni 1945", "17 Agustus 1945", "18 Agustus 1945"],
    j: 3,
  },
  {
    t: "Sila ketiga Pancasila berbunyi?",
    p: [
      "Persatuan Indonesia",
      "Kemanusiaan yang adil dan beradab",
      "Ketuhanan Yang Maha Esa",
      "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan",
    ],
    j: 0,
  },
  {
    t: "Lambang negara Indonesia adalah?",
    p: ["Rajawali", "Elang", "Garuda Pancasila", "Cendrawasih"],
    j: 2,
  },
  {
    t: "Makna warna merah pada bendera Indonesia adalah?",
    p: ["Kesucian", "Keberanian", "Keadilan", "Persatuan"],
    j: 1,
  },
  {
    t: "Makna warna putih pada bendera Indonesia adalah?",
    p: ["Keberanian", "Kesucian", "Kekuatan", "Keteguhan"],
    j: 1,
  },
  {
    t: "Semboyan Bhinneka Tunggal Ika memiliki arti?",
    p: [
      "Bersatu kita teguh",
      "Berbeda-beda tetapi tetap satu",
      "Gotong royong",
      "Persatuan dan kesatuan",
    ],
    j: 1,
  },
  {
    t: "Paskibraka bertugas pada upacara?",
    p: ["Apel pagi", "Upacara bendera", "Upacara adat", "Upacara sekolah"],
    j: 1,
  },
  {
    t: "Nilai utama yang harus dimiliki anggota Paskibraka adalah?",
    p: ["Disiplin", "Kepandaian", "Kekayaan", "Popularitas"],
    j: 0,
  },
  { t: "UUD 1945 disahkan oleh?", p: ["BPUPKI", "PPKI", "MPR", "DPR"], j: 1 },
  {
    t: "Contoh sikap cinta tanah air adalah?",
    p: [
      "Membolos sekolah",
      "Mengikuti upacara bendera",
      "Merusak fasilitas umum",
      "Tidak taat aturan",
    ],
    j: 1,
  },
  {
    t: "Persatuan dan kesatuan merupakan pengamalan sila ke?",
    p: ["Satu", "Dua", "Tiga", "Empat"],
    j: 2,
  },
  {
    t: "Gotong royong mencerminkan nilai Pancasila sila?",
    p: ["Kesatu", "Kedua", "Ketiga", "Keempat"],
    j: 2,
  },
  {
    t: "Lagu kebangsaan Indonesia adalah?",
    p: ["Bagimu Negeri", "Indonesia Raya", "Garuda Pancasila", "Tanah Airku"],
    j: 1,
  },
  {
    t: "Sikap Paskibraka saat menjalankan tugas adalah?",
    p: ["Santai", "Disiplin dan tanggung jawab", "Acuh", "Bercanda"],
    j: 1,
  },
  {
    t: "Makna rela berkorban bagi bangsa dan negara adalah?",
    p: [
      "Mementingkan diri sendiri",
      "Mengutamakan kepentingan umum",
      "Menghindari tugas",
      "Mengharap imbalan",
    ],
    j: 1,
  },
  {
    t: "Dasar negara Indonesia adalah?",
    p: ["UUD 1945", "Pancasila", "Ketetapan MPR", "Peraturan Presiden"],
    j: 1,
  },
  {
    t: "Hari Kemerdekaan Indonesia diperingati setiap tanggal?",
    p: ["20 Mei", "28 Oktober", "17 Agustus", "1 Juni"],
    j: 2,
  },
  {
    t: "Bendera Merah Putih pertama kali dikibarkan pada tahun?",
    p: ["1944", "1945", "1946", "1950"],
    j: 1,
  },
  {
    t: "Contoh perilaku disiplin di sekolah adalah?",
    p: [
      "Datang terlambat",
      "Memakai seragam sesuai aturan",
      "Tidak mengerjakan tugas",
      "Melanggar tata tertib",
    ],
    j: 1,
  },
  {
    t: "Cinta tanah air berarti?",
    p: [
      "Membandingkan negara",
      "Bangga dan menjaga bangsa sendiri",
      "Mengkritik tanpa solusi",
      "Mengabaikan aturan",
    ],
    j: 1,
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
