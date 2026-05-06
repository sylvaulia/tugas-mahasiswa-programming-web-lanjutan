// --- LATIHAN 1: Destructuring & Spread ---
const reservasi = {
    idBooking: 'BK-772',
    jumlahOrang: 5,
    pelanggan: {
        namaUser: 'Budi Santoso',
        kontak: '08123456789'
    },
    waktu: '2024-05-20T19:00:00Z'
};

// Destructuring
const { idBooking, jumlahOrang, pelanggan: { namaUser } } = reservasi;
console.log(`Booking ID: ${idBooking}, Atas Nama: ${namaUser}, Untuk: ${jumlahOrang} orang`);

// Spread Operator (Menggabungkan Menu)
const menuMakanan = ['Nasi Goreng Spesial', 'Sate Ayam'];
const menuMinuman = ['Es Teh Manis', 'Jus Alpukat'];
const pesananLengkap = [...menuMakanan, ...menuMinuman];
console.log('Pesanan Meja:', pesananLengkap);


// --- LATIHAN 2: Promise Chaining ---
function cekKetersediaanMeja(mejaNomor) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Memeriksa Meja Nomor: ${mejaNomor}...`);
            resolve({ nomor: mejaNomor, tersedia: true });
        }, 1000);
    });
}

function prosesBooking(nomorMeja, nama) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Sukses! Meja ${nomorMeja} sudah di-booking oleh ${nama}`);
        }, 1000);
    });
}

// Eksekusi Promise Chaining
cekKetersediaanMeja(15)
    .then(hasil => {
        console.log(`Meja ${hasil.nomor} tersedia.`);
        return prosesBooking(hasil.nomor, 'Budi Santoso');
    })
    .then(konfirmasi => console.log(konfirmasi))
    .catch(err => console.error('Gagal:', err));


// --- LATIHAN 3: Async/Await & Retry Logic ---
async function bayarDP(nominal) {
    // Simulasi error (peluang sukses hanya 30%)
    if (Math.random() > 0.7) {
        return { sukses: true, transaksId: 'TRX-998' };
    } else {
        throw new Error('Koneksi Gagal');
    }
}

async function jalankanPembayaran(nominal) {
    const maxCoba = 3;
    for (let attempt = 1; attempt <= maxCoba; attempt++) {
        try {
            console.log(`Percobaan Bayar ke-${attempt}...`);
            const hasil = await bayarDP(nominal);
            console.log('Pembayaran Berhasil! ID:', hasil.transaksId);
            return;
        } catch (err) {
            console.log(`Gagal: ${err.message}`);
            if (attempt === maxCoba) {
                console.log('Percobaan habis. SIlahkan hubungi admin.');
                throw err;
            }
            // Tunggu 1 detik sebelum coba lagi
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}

jalankanPembayaran(200000);