-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: portofolio_hacker
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES ('da0524f9-11ca-42f0-8f03-ba60f592ad09','8b37ae4290300d55e1f1fe1a363b572130c298179b95a11b4a3f5cdbab7e5a86','2026-01-29 00:32:34.655','20260129003234_init_db',NULL,NULL,'2026-01-29 00:32:34.559',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` (`id`, `slug`, `title`, `excerpt`, `content`, `category`, `tags`, `createdAt`) VALUES (1,'adab-digital','Refleksi Teknologi: Adab di Era Digital','Bagaimana bersikap di tengah derasnya arus informasi.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Islamic','Adab, Tazkiyatun Nafs','2026-01-29 01:04:16.006'),(2,'sql-injection-security','Mengamankan Web App dari SQL Injection','Panduan dasar menutup celah keamanan database.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Coding','Security, Database','2026-01-29 01:05:26.986');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` (`id`, `title`, `issuer`, `date`, `category`, `credentialLink`, `description`, `createdAt`) VALUES (1,'Juara 1 MHQ 30 Juz Tingkat Nasional MTQMN','Universitas Lambung Mangkurat','05-09 Oktober 2025','Non Akademik','https://drive.google.com/file/d/1YRwS_AAoS7FS299_rfgdHfRspefCPydb/view?usp=drive_link',NULL,'2026-01-29 01:00:21.560');
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` (`id`, `name`, `email`, `message`, `createdAt`) VALUES (1,'user','ahsani.fadhli@gmail.com','bismillah','2026-01-29 03:20:45.777'),(2,'user','ahsani.fadhli@gmail.com','awowkwkwk','2026-01-29 03:21:48.028');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` (`id`, `title`, `description`, `image`, `techStack`, `demoLink`, `repoLink`, `createdAt`) VALUES (1,'AI Quran Recitation Checker','Aplikasi berbasis AI untuk mengoreksi bacaan Surah Al-Fatihah menggunakan teknologi Speech Recognition.',NULL,'Python, AI/ML, Hugging Face','https://huggingface.co/spaces/ahsanifadhli/tes-ngaji-alfatihah','https://github.com/Ahsanifadhli/ai-alfatihah','2026-01-29 00:42:49.774'),(2,'Weekly Reflection Web App','Alat interaktif untuk refleksi mingguan, cocok untuk introspeksi ala slice-of-life',NULL,'HTML, CSS, JavaScript','https://ahsanifadhli.github.io/MySelf/','https://github.com/ahsanifadhli/MySelf','2026-01-29 00:47:55.962'),(3,'Aplikasi Sistem Laporan Keuangan Toko Kue','aplikasi sistem laporan keuangan dari toko kue yang ada di Wonosari, Bantul, Yogyakarta',NULL,'Kotlin',NULL,'https://github.com/ahsanifadhli/SIMTokoKue','2026-01-29 00:50:34.270');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-29 11:13:49
