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
-- Table structure for table `basic_details`
--

DROP TABLE IF EXISTS `basic_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basic_details` (
  `applicantId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNo` varchar(10) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `zipcode` char(6) NOT NULL,
  `dob` date NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `gender` varchar(10) DEFAULT NULL,
  `relationship` varchar(20) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`applicantId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_details`
--

LOCK TABLES `basic_details` WRITE;
/*!40000 ALTER TABLE `basic_details` DISABLE KEYS */;
INSERT INTO `basic_details` VALUES (1,'jay','patel;','asc','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 05:50:50',NULL,NULL,NULL,NULL),(2,'jay','patel;','asc','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 05:51:21',NULL,NULL,NULL,NULL),(3,'jay','patel;','asc','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 06:21:11',NULL,NULL,NULL,NULL),(4,'jay','patel;','asc','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 06:25:35',NULL,NULL,NULL,NULL),(5,'jay','patel;','sales','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 06:47:11',NULL,NULL,NULL,NULL),(6,'jay','patel;','sales','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 06:49:45',NULL,NULL,NULL,NULL),(7,'jay','patel;','jhb','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 06:51:11',NULL,NULL,NULL,NULL),(8,'jay','patel;','jhb','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 06:52:22',NULL,NULL,NULL,NULL),(9,'jay','patel;','jhb','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 08:02:35',NULL,NULL,NULL,NULL),(10,'jay','patel;','sales','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-07','2026-04-06 09:06:08','female','marride','Gujarat','surat'),(11,'jay','patel;','sales','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-07','2026-04-06 09:07:05','female','marride','Gujarat','surat'),(12,'jay','patel;','sales','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-07','2026-04-06 09:57:43','male','marride','Gujarat','surat'),(13,'jay','patel;','sales','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-07','2026-04-06 10:04:19','male','marride','Gujarat','surat'),(14,'jay','patel;','jhb','jay@gmail.com','123456789',',ZMXNCKLSJN','N VDNJVF','212121','2026-04-01','2026-04-06 11:16:07','others','marride','Gujarat','surat');
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

-- Dump completed on 2026-04-07 18:57:35
