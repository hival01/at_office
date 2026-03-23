-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: job_application
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
-- Table structure for table `applicant_language`
--

DROP TABLE IF EXISTS `applicant_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicant_language` (
  `applicant_language_id` bigint NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint NOT NULL,
  `language_id` int NOT NULL,
  `can_read` tinyint(1) DEFAULT NULL,
  `can_write` tinyint(1) DEFAULT NULL,
  `can_speak` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`applicant_language_id`),
  UNIQUE KEY `applicant_id` (`applicant_id`,`language_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `applicant_language_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `basic_details` (`applicant_id`),
  CONSTRAINT `applicant_language_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`),
  CONSTRAINT `applicant_language_chk_1` CHECK (((`can_read` = 1) or (`can_write` = 1) or (`can_speak` = 1)))
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicant_language`
--

LOCK TABLES `applicant_language` WRITE;
/*!40000 ALTER TABLE `applicant_language` DISABLE KEYS */;
INSERT INTO `applicant_language` VALUES (1,5,3,1,1,0,'2026-03-18 06:14:30'),(2,5,1,0,0,1,'2026-03-18 06:14:30'),(3,6,3,1,1,0,'2026-03-18 06:16:14'),(4,6,1,0,0,1,'2026-03-18 06:16:14'),(5,6,11,1,1,1,'2026-03-18 06:16:14'),(6,7,14,1,1,0,'2026-03-18 08:49:32'),(7,16,3,1,1,1,'2026-03-18 10:32:06'),(8,16,15,1,1,1,'2026-03-18 10:32:06'),(9,16,9,1,0,0,'2026-03-18 10:32:06'),(10,18,3,1,1,1,'2026-03-18 10:34:25'),(11,18,9,1,0,0,'2026-03-18 10:34:25'),(12,20,1,1,0,0,'2026-03-18 11:28:12'),(13,20,2,1,0,0,'2026-03-18 11:28:12'),(14,20,3,0,1,1,'2026-03-18 11:28:12'),(15,25,1,1,0,0,'2026-03-18 11:45:11'),(16,25,3,0,1,1,'2026-03-18 11:45:11'),(17,28,6,1,0,0,'2026-03-18 12:35:20');
/*!40000 ALTER TABLE `applicant_language` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-18 19:16:44
