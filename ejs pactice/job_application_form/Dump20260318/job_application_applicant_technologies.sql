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
-- Table structure for table `applicant_technologies`
--

DROP TABLE IF EXISTS `applicant_technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicant_technologies` (
  `applicant_tech` bigint NOT NULL AUTO_INCREMENT,
  `tech_id` int NOT NULL,
  `applicant_id` bigint NOT NULL,
  `level` enum('Beginner','Intermediate','Expert') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`applicant_tech`),
  UNIQUE KEY `applicant_id` (`applicant_id`,`tech_id`),
  KEY `tech_id` (`tech_id`),
  CONSTRAINT `applicant_technologies_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `basic_details` (`applicant_id`),
  CONSTRAINT `applicant_technologies_ibfk_2` FOREIGN KEY (`tech_id`) REFERENCES `technologies` (`tech_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicant_technologies`
--

LOCK TABLES `applicant_technologies` WRITE;
/*!40000 ALTER TABLE `applicant_technologies` DISABLE KEYS */;
INSERT INTO `applicant_technologies` VALUES (1,1,8,'Beginner','2026-03-18 09:16:29'),(2,2,8,'Intermediate','2026-03-18 09:16:29'),(3,3,8,'Expert','2026-03-18 09:16:29'),(4,4,8,'Beginner','2026-03-18 09:16:29'),(5,1,16,'Beginner','2026-03-18 10:32:06'),(6,2,16,'Beginner','2026-03-18 10:32:06'),(7,3,16,'Intermediate','2026-03-18 10:32:06'),(8,1,18,'Beginner','2026-03-18 10:34:25'),(9,2,20,'Beginner','2026-03-18 11:28:12'),(10,5,20,'Intermediate','2026-03-18 11:28:12'),(11,3,20,'Intermediate','2026-03-18 11:28:12'),(12,1,28,'Beginner','2026-03-18 12:35:20');
/*!40000 ALTER TABLE `applicant_technologies` ENABLE KEYS */;
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
