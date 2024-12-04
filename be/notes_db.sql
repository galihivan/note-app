-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 04 Des 2024 pada 09.59
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `notes`
--

CREATE TABLE `notes` (
  `id` bigint(20) NOT NULL,
  `title` text NOT NULL,
  `datetime` datetime NOT NULL,
  `note` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notes`
--

INSERT INTO `notes` (`id`, `title`, `datetime`, `note`) VALUES
(23, 'Catatan Pertama1', '2024-12-20 15:30:00', 'Ini adalah catatan pertam111a saya.ddd'),
(24, 'Pamella', '2024-12-19 15:23:00', 'Ini adalah catatan pertam111a saya.'),
(25, 'Pamella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.'),
(26, 'Pamella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.'),
(27, 'Pamella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.'),
(28, 'Pamqqqella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.'),
(29, 'erois', '2024-12-04 14:12:00', 'ssss'),
(30, 'gagaga', '2024-12-05 14:23:00', 'agag'),
(31, 'gagaga', '2024-12-05 14:23:00', 'agag'),
(32, 'gagaga', '2024-12-05 14:23:00', 'agag'),
(33, 'Pamqqqella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.'),
(34, '123', '2024-12-04 14:36:00', '123'),
(36, 'apem', '2024-12-04 14:37:00', 'qw'),
(37, 'qwerty123', '2024-12-17 15:16:00', 'rrq123'),
(39, 'Pamqqqella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.'),
(40, 'hasnavd', '2024-12-24 15:04:00', 'werrrrrr'),
(41, 'qwerrtyyuu', '2024-12-04 15:07:00', 'zgz'),
(44, 'rrrrrrr', '2024-12-21 15:31:00', 'ssssswn'),
(55, 'ssrrrrrrrrrrrrrrr', '2024-12-20 15:31:00', 'aaaaaa'),
(56, 'ss', '2024-12-19 15:31:00', 'eee'),
(58, 'as', '2024-12-27 15:40:00', 'Untuk membatasi tampilan teks dalam kolom Note agar tidak terlalu panjang, Anda dapat menambahkan gaya CSS untuk memotong teks yang panjang dan menambahkan elipsis (...) jika teks melebihi batas tertentu.\n\nBerikut cara untuk melakukannya:\n\nTambahkan gaya CSS pada elemen yang menampilkan teks Note. Misalnya, ubah bagian kolom Note di NoteList.js seperti ini:'),
(59, 'Pamqqqella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.'),
(60, 'ss44', '2024-12-09 15:42:00', 's'),
(61, 'Pamqqqella', '2024-12-03 14:30:00', 'Ini adalah catatan pertam111a saya.');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `notes`
--
ALTER TABLE `notes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
