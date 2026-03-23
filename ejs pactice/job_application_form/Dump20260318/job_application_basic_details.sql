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
-- Table structure for table `basic_details`
--

DROP TABLE IF EXISTS `basic_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basic_details` (
  `applicant_id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `Designation` varchar(50) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `relationship_status` enum('single','married','other') NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `zipcode` char(6) NOT NULL,
  `dob` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`applicant_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_details`
--

LOCK TABLES `basic_details` WRITE;
/*!40000 ALTER TABLE `basic_details` DISABLE KEYS */;
INSERT INTO `basic_details` VALUES (1,'jay',NULL,'','jayhjial@gmail.com','1212121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-25','2026-03-18 06:00:58'),(2,'jay',NULL,'','ja212y@gmail.com','0212121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-03-04','2026-03-18 06:04:52'),(3,'jay',NULL,'2323','jay34@gmail.com','1212121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-24','2026-03-18 06:08:23'),(4,'jay',NULL,'wqw','jayqw@gmail.com','1212121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-25','2026-03-18 06:12:15'),(5,'jay',NULL,'sdf','jayefseaf@gmail.com','0112121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-24','2026-03-18 06:14:30'),(6,'jay',NULL,'sdf','1jayefseaf@gmail.com','0112121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-24','2026-03-18 06:16:14'),(7,'jay',NULL,'','jayewew@gmail.com','0212121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-25','2026-03-18 08:49:32'),(8,'techno',NULL,'dfsa','techjay@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-25','2026-03-18 09:16:29'),(9,'jaypref',NULL,'','prefffjay@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-24','2026-03-18 09:56:40'),(10,'PREFFFjay',NULL,'','poreffjay@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-24','2026-03-18 09:58:34'),(11,'jay',NULL,'','jssay@gmail.com','0112121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-03-05','2026-03-18 10:00:48'),(12,'jay',NULL,'','jadddy@gmail.com','0121211212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-26','2026-03-18 10:01:49'),(13,'jay',NULL,'sdfgs','j222ay@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-27','2026-03-18 10:03:33'),(14,'Hival',NULL,'Sale','Hetu@gmail.com','9090909090','male','single','bhadol','','surat','gujarat','909090','2026-01-21','2026-03-18 10:25:33'),(15,'jay',NULL,'sdcs','hivalheta@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-03-04','2026-03-18 10:29:56'),(16,'hivalheta',NULL,'zxcvs','hetajay@gmail.com','1212121212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2025-10-08','2026-03-18 10:32:05'),(18,'vivek',NULL,'','jay987655@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2025-10-29','2026-03-18 10:34:25'),(19,'number12',NULL,'','hijay987655@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2025-10-29','2026-03-18 11:14:16'),(20,'qwqwjay',NULL,'jhb','j212121ay@gmail.com','0121212121','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2025-10-01','2026-03-18 11:28:12'),(21,'21',NULL,'SDVFSE','ja212221212y@gmail.com','0121211212','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2025-10-15','2026-03-18 11:34:13'),(22,'21212',NULL,'dsf','jay677@gmail.com','0121212112','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-23','2026-03-18 11:38:36'),(23,'jay',NULL,'11','jay111@gmail.com','1234567891','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2025-12-31','2026-03-18 11:42:50'),(24,'jay',NULL,'343','jaydfxhgds@gmail.com','1234567894','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-03-05','2026-03-18 11:44:01'),(25,'jay',NULL,'ASD','jayVBM@gmail.com','1234567895','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-25','2026-03-18 11:45:11'),(26,'jay',NULL,'DFG','jaweqeqw3y@gmail.com','1234567893','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-02-25','2026-03-18 11:49:29'),(27,'jay',NULL,'sdcv','jaysvdfgfn@gmail.com','1234567895','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2025-12-31','2026-03-18 12:33:07'),(28,'jay',NULL,'sdcs','j121212ay@gmail.com','1234567891','male','single',',ZMXNCKLSJN','N VDNJVF','ahmedabad','rajastan','212121','2026-01-21','2026-03-18 12:35:20');
/*!40000 ALTER TABLE `basic_details` ENABLE KEYS */;
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
