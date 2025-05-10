// Ambil element display dari DOM
let display = document.getElementById('display');

// Fungsi untuk menambahkan nilai ke display
function appendToDisplay(value) {
  display.value += value; // Concatenate nilai baru
}

// Fungsi untuk mengosongkan display
function clearDisplay() {
  display.value = ''; // Set ke string kosong
}

// Fungsi kalkulasi
function calculate() {
  try {
    // Gunakan eval() untuk menghitung ekspresi matematika
    // Note: eval() bisa berbahaya jika dipakai untuk input user,
    // tapi aman untuk kasus ini karena kita kontrol inputnya
    display.value = eval(display.value);
  } catch (error) {
    // Jika terjadi error (misal sintaks tidak valid)
    display.value = 'Error';
  }
}
