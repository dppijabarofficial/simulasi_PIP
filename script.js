const API_URL = "https://script.google.com/macros/s/AKfycbx6dP6yiR8qj9Ed3BIumAGlba6RS2EmT8CKgfr01fLqq7XTbo4D4IjcZw1E6iuIlFw/exec";

let waktu = 300;
let waktuHabis = false;
let timer;
let halaman = 0;
const perHalaman = 3;
let jawaban = {};

const soal = [
 {t:"Pancasila disahkan pada tanggal?",p:["1 Juni 1945","17 Agustus 1945","18 Agustus 1945","22 Juni 1945"],j:2},
 {t:"Sila ke-3 Pancasila adalah?",p:["Persatuan Indonesia","Kemanusiaan","Ketuhanan","Kerakyatan"],j:0},
 {t:"Lambang negara Indonesia adalah?",p:["Elang","Garuda Pancasila","Rajawali","Merpati"],j:1},
 {t:"Hari Kemerdekaan RI?",p:["20 Mei","17 Agustus","1 Juni","28 Oktober"],j:1},
 {t:"Makna Bhinneka Tunggal Ika?",p:["Persatuan","Berbeda tapi satu","Gotong royong","Keadilan"],j:1},
 {t:"Tugas utama Paskibraka?",p:["Upacara","Latihan","Mengibarkan bendera","Apel"],j:2},
 {t:"Makna warna merah?",p:["Suci","Berani","Damai","Makmur"],j:1},
 {t:"Makna warna putih?",p:["Berani","Makmur","Suci","Kuat"],j:2},
 {t:"UUD 1945 disahkan oleh?",p:["BPUPKI","PPKI","MPR","DPR"],j:1},
 {t:"Persatuan Indonesia sila ke?",p:["1","2","3","4"],j:2},
 {t:"Contoh nasionalisme?",p:["Membolos","Upacara bendera","Acuh","Melanggar"],j:1},
 {t:"Dasar negara Indonesia?",p:["UUD","Pancasila","MPR","DPR"],j:1},
 {t:"Lagu kebangsaan Indonesia?",p:["Garuda","Indonesia Raya","Bagimu Negeri","Tanah Airku"],j:1},
 {t:"Gotong royong mencerminkan sila?",p:["1","2","3","4"],j:2},
 {t:"Paskibraka berasal dari?",p:["SD","SMP","SMA","Mahasiswa"],j:2},
 {t:"Makna rela berkorban?",p:["Egoisme","Nasionalisme","Individualisme","Materialisme"],j:1},
 {t:"Semboyan negara Indonesia?",p:["Tut Wuri","Garuda","Bhinneka Tunggal Ika","Pancasila"],j:2},
 {t:"Bendera Indonesia?",p:["Putih merah","Merah putih","Merah biru","Putih biru"],j:1},
 {t:"Sikap Paskibraka saat tugas?",p:["Santai","Disiplin","Acuh","Bercanda"],j:1},
 {t:"Cinta tanah air berarti?",p:["Bangga negara sendiri","Acuh","Melanggar","Membandingkan"],j:0}
];

function mulaiUjian(){
 const nama=document.getElementById("nama").value.trim();
 const sekolah=document.getElementById("sekolah").value.trim();
 if(!nama||!sekolah)return alert("Lengkapi data!");

 localStorage.setItem("nama",nama);
 localStorage.setItem("sekolah",sekolah);
document.querySelector(".progress-box").classList.remove("hidden");

 document.querySelector(".info").classList.add("hidden");
 document.querySelector(".timer").classList.remove("hidden");
 document.getElementById("quizForm").classList.remove("hidden");
 document.getElementById("navSoal").classList.remove("hidden");
buatNavigasiSoal();


 tampilkan();
 mulaiTimer();

 history.pushState(null,null,location.href);
 window.onpopstate=()=>history.go(1);
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;

    let m = Math.floor(waktu / 60);
    let d = waktu % 60;
    time.textContent = `${m}:${d.toString().padStart(2, "0")}`;

    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis! Jawaban sudah terkirim.");
      kirim(); // ⬅️ AUTO SUBMIT
    }
  }, 1000);
}


function tampilkan() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  soalContainer.innerHTML = "";

  let start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    let idx = start + i;

    soalContainer.innerHTML += `
      <div class="question">
        <p>${idx + 1}. ${x.t}</p>
        ${x.p.map((a, j) => `
          <label>
            <input
              type="radio"
              name="q${idx}"
              value="${j}"
              ${Number(jawaban[idx]) === j ? "checked" : ""}
            >
            <span>${a}</span>
          </label>
        `).join("")}
      </div>
    `;
    buatNavigasiSoal();

  });

  prevBtn.style.display = halaman === 0 ? "none" : "block";
  nextBtn.textContent =
    (start + perHalaman) >= soal.length ? "Selesai" : "Berikutnya";

  pasangAutoSave();
  updateProgress();
}



function simpan(){
 let s=halaman*perHalaman;
 soal.slice(s,s+perHalaman).forEach((_,i)=>{
   let idx=s+i;
   let r=document.querySelector(`input[name=q${idx}]:checked`);
   if(r)jawaban[idx]=r.value;
 });
}

function berikutnya(){
 simpan();
 if((halaman+1)*perHalaman>=soal.length)kirim();
 else{halaman++;tampilkan();}
}

function sebelumnya() {
  simpan(); // backup
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}


function kirim() {
  simpan(); // simpan halaman aktif

  // ❌ Cek soal kosong HANYA jika waktu BELUM habis
  if (!waktuHabis) {
    const kosong = semuaTerjawab();
    if (kosong !== -1) {
      alert(`Soal nomor ${kosong + 1} belum dijawab!`);
      halaman = Math.floor(kosong / perHalaman);
      tampilkan();
      return;
    }
  }

  clearInterval(timer);

  // === HITUNG NILAI ===
  let benar = 0;
  soal.forEach((x, i) => {
    if (jawaban[i] === x.j) benar++;
    // jika jawaban undefined → otomatis 0 (tidak dihitung)
  });

  let nilai = Math.round((benar / soal.length) * 100);
  localStorage.setItem("nilai", nilai);

  // === KIRIM DATA ===
  const formData = new FormData();
  formData.append("nama", localStorage.getItem("nama"));
  formData.append("sekolah", localStorage.getItem("sekolah"));
  formData.append("nilai", nilai);

  fetch(API_URL, {
    method: "POST",
    body: formData
  }).finally(() => {
    window.location.href = "hasil.html";
  });
}



function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) {
    if (jawaban[i] === undefined) {
      return i; // kembalikan index soal yang kosong
    }
  }
  return -1; // semua sudah terjawab
}

function pasangAutoSave() {
  document.querySelectorAll("input[type=radio]").forEach(radio => {
    radio.addEventListener("change", () => {
      const idx = parseInt(radio.name.replace("q", ""));
      jawaban[idx] = Number(radio.value);
updateProgress();

buatNavigasiSoal();


    });
  });
}

function updateProgress() {
  const terjawab = Object.keys(jawaban).length;
  const total = soal.length;
  const persen = Math.round((terjawab / total) * 100);

  document.getElementById("progressText").textContent =
    `${terjawab} / ${total} terjawab`;

  document.getElementById("progressBar").style.width = `${persen}%`;
}

function buatNavigasiSoal() {
  const nav = document.getElementById("navSoal");
  nav.innerHTML = "";

  for (let i = 0; i < soal.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = i + 1;

    if (jawaban[i] !== undefined) btn.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) btn.classList.add("active");

    btn.onclick = () => {
      simpan();
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };

    nav.appendChild(btn);
  }
}
