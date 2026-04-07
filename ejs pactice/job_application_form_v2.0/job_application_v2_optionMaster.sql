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
-- Table structure for table `optionMaster`
--

DROP TABLE IF EXISTS `optionMaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `optionMaster` (
  `optionId` int NOT NULL AUTO_INCREMENT,
  `selectId` int DEFAULT NULL,
  `optionName` varchar(50) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`optionId`),
  KEY `selectId` (`selectId`),
  KEY `parentId` (`parentId`),
  CONSTRAINT `optionMaster_ibfk_1` FOREIGN KEY (`selectId`) REFERENCES `selectMaster` (`selectId`) ON DELETE CASCADE,
  CONSTRAINT `optionMaster_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `optionMaster` (`optionId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `optionMaster`
--

LOCK TABLES `optionMaster` WRITE;
/*!40000 ALTER TABLE `optionMaster` DISABLE KEYS */;
INSERT INTO `optionMaster` VALUES (1,1,'male','2026-03-30 08:03:51',NULL),(2,1,'female','2026-03-30 08:03:51',NULL),(3,2,'single','2026-03-30 13:06:23',NULL),(4,2,'marride','2026-03-30 13:06:23',NULL),(5,3,'Gujarat','2026-03-31 05:47:39',NULL),(6,3,'Rajasthan','2026-03-31 05:47:39',NULL),(7,3,'Maharastra','2026-03-31 05:47:39',NULL),(8,4,'surat','2026-03-31 05:47:43',5),(9,4,'Ahmedabad','2026-03-31 05:47:43',5),(10,4,'Gandhinagar','2026-03-31 05:47:43',5),(11,4,'mumbai','2026-03-31 08:12:30',7),(12,4,'pune','2026-03-31 08:12:30',7),(13,4,'nasik','2026-03-31 08:12:30',7),(14,5,'banglore','2026-04-02 05:20:46',NULL),(15,5,'pune','2026-04-02 05:20:46',NULL),(16,5,'gandhinagar','2026-04-02 05:20:46',NULL),(17,5,'ahmedabad','2026-04-02 05:20:46',NULL),(18,5,'surat','2026-04-02 05:20:46',NULL),(19,6,'Forntend Engineer','2026-04-02 05:26:57',NULL),(20,6,'Backend Engineer','2026-04-02 05:26:57',NULL),(21,6,'Full stack Engineer','2026-04-02 05:26:57',NULL),(22,6,'devOps','2026-04-02 05:26:57',NULL),(23,1,'others','2026-04-06 11:14:43',NULL);
/*!40000 ALTER TABLE `optionMaster` ENABLE KEYS */;
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
