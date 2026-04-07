-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: job_application_v2
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `workExperience`
--

DROP TABLE IF EXISTS `workExperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workExperience` (
  `compName` varchar(50) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `annualPackage` varchar(10) NOT NULL,
  `reasonToLeave` text NOT NULL,
  `refContactName` varchar(50) DEFAULT NULL,
  `refContactNo` varchar(10) DEFAULT NULL,
  `refContactRelation` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `applicantId` int DEFAULT NULL,
  KEY `applicantId` (`applicantId`),
  CONSTRAINT `workExperience_ibfk_1` FOREIGN KEY (`applicantId`) REFERENCES `basic_details` (`applicantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workExperience`
--

LOCK TABLES `workExperience` WRITE;
/*!40000 ALTER TABLE `workExperience` DISABLE KEYS */;
INSERT INTO `workExperience` VALUES ('spark','2026-03-30','2026-04-13','111','sdjuck','kjk','jbxka','kj','2026-04-06 06:52:22',8),('biiiiiiiiiiiiiiiiiiiiiiiz','2026-04-06','2026-04-08','555','7g','yyfyhtf','hgvhhg','ghcgh','2026-04-06 06:52:22',8),('spark','2026-03-30','2026-04-13','111','sdjuck','kjk','jbxka','kj','2026-04-06 08:02:35',9),('espa','2026-04-06','2026-04-06','76t','hgvjv','jhkvkjhvj','jhgvkujh','jhvjkhvg','2026-04-06 09:06:08',10),('espa','2026-04-06','2026-04-06','76t','hgvjv','jhkvkjhvj','jhgvkujh','jhvjkhvg','2026-04-06 09:07:05',11),('espa','2026-04-06','2026-04-06','76t','hgvjv','jhkvkjhvj','jhgvkujh','jhvjkhvg','2026-04-06 09:57:43',12),('espa','2026-04-06','2026-04-06','76t','hgvjv','jhkvkjhvj','jhgvkujh','jhvjkhvg','2026-04-06 10:04:19',13);
/*!40000 ALTER TABLE `workExperience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-07 18:57:35
