-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: combobox
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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `state_id` int DEFAULT NULL,
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(50) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_name` (`city_name`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,1,'Ahmedabad'),(1,2,'Surat'),(1,3,'Vadodara'),(2,5,'Mumbai'),(2,6,'Pune'),(2,7,'Nagpur'),(3,9,'Bangalore'),(3,10,'Mysore'),(4,12,'Chennai'),(4,13,'Coimbatore'),(5,15,'New Delhi'),(7,17,'Los Angeles'),(7,18,'San Francisco'),(7,19,'San Diego'),(8,21,'Houston'),(8,22,'Dallas'),(8,23,'Austin'),(9,25,'New York City'),(10,26,'Miami'),(10,27,'Orlando'),(11,29,'Chicago'),(13,31,'Toronto'),(13,32,'Ottawa'),(14,34,'Montreal'),(14,35,'Quebec City'),(15,37,'Vancouver'),(16,38,'Calgary'),(16,39,'Edmonton'),(17,41,'London'),(17,42,'Manchester'),(17,43,'Birmingham'),(18,45,'Edinburgh'),(18,46,'Glasgow'),(19,47,'Cardiff'),(20,49,'Belfast'),(21,51,'Sydney'),(22,52,'Melbourne'),(23,54,'Brisbane'),(24,55,'Perth'),(25,57,'Munich'),(25,58,'Nuremberg'),(26,59,'Cologne'),(26,60,'Düsseldorf'),(27,62,'Berlin'),(28,64,'Paris'),(30,65,'Marseille'),(30,66,'Nice'),(31,70,'Lyon'),(32,72,'Guangzhou'),(32,73,'Shenzhen'),(33,74,'Beijing'),(34,76,'Shanghai'),(35,77,'Chengdu'),(36,79,'Tokyo'),(37,80,'Osaka'),(38,82,'Yokohama'),(39,83,'Nagoya'),(40,85,'São Paulo'),(41,86,'Rio de Janeiro'),(42,88,'Belo Horizonte'),(43,89,'Johannesburg'),(43,90,'Pretoria'),(44,92,'Cape Town'),(45,93,'Durban'),(46,95,'Moscow'),(47,96,'Saint Petersburg'),(48,98,'Novosibirsk'),(51,99,'Mexico City'),(52,101,'Guadalajara'),(53,102,'Monterrey'),(54,104,'Milan'),(55,105,'Rome'),(56,107,'Naples'),(58,108,'Madrid'),(59,110,'Barcelona'),(60,111,'Seville'),(62,113,'Amsterdam'),(63,114,'Rotterdam'),(64,116,'Utrecht'),(66,117,'Singapore'),(68,119,'Dubai'),(69,120,'Abu Dhabi'),(70,122,'Sharjah'),(72,123,'Riyadh'),(73,125,'Mecca'),(74,126,'Dammam'),(76,128,'Istanbul'),(77,129,'Ankara'),(78,131,'Izmir'),(80,132,'Jakarta'),(81,134,'Bandung'),(82,135,'Surabaya'),(84,137,'Seoul'),(85,138,'Busan'),(86,140,'Incheon'),(88,141,'Buenos Aires'),(89,143,'Córdoba'),(90,144,'Rosario'),(92,146,'Lagos'),(93,147,'Abuja'),(94,149,'Kano');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-24 18:55:03
