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
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `country_id` int DEFAULT NULL,
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(50) NOT NULL,
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `state_name` (`state_name`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `state_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,1,'Gujarat'),(1,2,'Maharashtra'),(1,3,'Karnataka'),(1,4,'Tamil Nadu'),(1,5,'Delhi'),(2,7,'California'),(2,8,'Texas'),(2,9,'New York'),(2,10,'Florida'),(2,11,'Illinois'),(3,13,'Ontario'),(3,14,'Quebec'),(3,15,'British Columbia'),(3,16,'Alberta'),(4,17,'England'),(4,18,'Scotland'),(4,19,'Wales'),(4,20,'Northern Ireland'),(5,21,'New South Wales'),(5,22,'Victoria'),(5,23,'Queensland'),(5,24,'Western Australia'),(6,25,'Bavaria'),(6,26,'North Rhine-Westphalia'),(6,27,'Berlin'),(7,28,'Île-de-France'),(7,30,'Provence-Alpes-Côte d\'Azur'),(7,31,'Auvergne-Rhône-Alpes'),(8,32,'Guangdong'),(8,33,'Beijing'),(8,34,'Shanghai'),(8,35,'Sichuan'),(9,36,'Tokyo'),(9,37,'Osaka'),(9,38,'Kanagawa'),(9,39,'Aichi'),(10,40,'São Paulo'),(10,41,'Rio de Janeiro'),(10,42,'Minas Gerais'),(11,43,'Gauteng'),(11,44,'Western Cape'),(11,45,'KwaZulu-Natal'),(12,46,'Moscow'),(12,47,'Saint Petersburg'),(12,48,'Novosibirsk'),(13,51,'Mexico City'),(13,52,'Jalisco'),(13,53,'Nuevo León'),(14,54,'Lombardy'),(14,55,'Lazio'),(14,56,'Campania'),(15,58,'Madrid'),(15,59,'Catalonia'),(15,60,'Andalusia'),(16,62,'North Holland'),(16,63,'South Holland'),(16,64,'Utrecht'),(17,66,'Singapore'),(18,68,'Dubai'),(18,69,'Abu Dhabi'),(18,70,'Sharjah'),(19,72,'Riyadh'),(19,73,'Makkah'),(19,74,'Eastern Province'),(20,76,'Istanbul'),(20,77,'Ankara'),(20,78,'Izmir'),(21,80,'Jakarta'),(21,81,'West Java'),(21,82,'East Java'),(22,84,'Seoul'),(22,85,'Busan'),(22,86,'Incheon'),(23,88,'Buenos Aires'),(23,89,'Córdoba'),(23,90,'Santa Fe'),(24,92,'Lagos'),(24,93,'Abuja'),(24,94,'Kano');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
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
