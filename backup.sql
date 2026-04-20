-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: meeting_assistant
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `transcript` longtext NOT NULL,
  `summary` text,
  `key_points` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (1,'demo','[09:00] Sarah: Good morning everyone. Let\'s kick off our Q4 product planning meeting. We have a lot to cover today.\n\n[09:02] John: I reviewed the Q3 metrics. Our user retention dropped by 12% and I think we need to address the onboarding flow urgently.\n\n[09:05] Sarah: Agreed. John, can you lead the onboarding redesign? We need a proposal ready by next Monday.\n\n[09:06] John: Sure, I\'ll have a full proposal with wireframes ready by Monday.\n\n[09:08] Maria: I can help with the UI designs for the onboarding. I\'ll have initial mockups done by Wednesday.\n\n[09:10] Sarah: Perfect. Next topic — the mobile app has been crashing on Android. Any updates on that?\n\n[09:12] David: I\'ve been investigating. It\'s a memory leak in the image loading module. I\'ll push a fix to production by this Friday.\n\n[09:15] Sarah: Great. We also need to update our API documentation before the developer conference next month.\n\n[09:17] Maria: I\'ll take ownership of the API docs update. I can complete it by October 25th.\n\n[09:20] John: We should also set up automated testing for the new features. Currently we have zero coverage on the payment module.\n\n[09:22] David: I\'ll set up the test suite for the payment module. Give me until end of next week.\n\n[09:25] Sarah: Excellent. One last thing — we need to prepare a demo for the investor meeting on November 1st.\n\n[09:26] John: I\'ll coordinate the demo preparation with the team. We should have a dry run by October 28th.\n\n[09:30] Sarah: Perfect. Let\'s make sure all action items are tracked. We\'ll reconvene next Monday at 9 AM for a progress check.','The Q4 product planning meeting covered key areas such as onboarding flow redesign, mobile app crash fixes, API documentation updates, automated testing, and demo preparation for the investor meeting. The team discussed and assigned tasks to address these issues. User retention and the need for urgent onboarding flow redesign were highlighted. The team will reconvene next Monday for a progress check. The meeting resulted in multiple action items assigned to team members.','[\"User retention dropped by 12% in Q3\", \"Onboarding flow redesign is urgently needed\", \"Mobile app crash on Android due to memory leak\"]','2026-04-20 09:49:06','2026-04-20 09:49:06'),(2,'engineering and project','[10:00] Alex: Good morning team. Today we\'ll focus on the upcoming feature releases and blockers.\n\n[10:02] Priya: The new dashboard analytics feature is almost complete. We just need final approval on the UI.\n\n[10:04] Alex: Great. Priya, can you share the final UI designs by today evening?\n\n[10:05] Priya: Yes, I\'ll send the updated designs by 6 PM.\n\n[10:07] Rahul: On the backend side, the analytics API is ready, but we need to optimize the response time. It\'s currently taking 2 seconds.\n\n[10:09] Alex: That’s a bit high. Rahul, can you reduce it below 1 second by this week?\n\n[10:10] Rahul: Sure, I\'ll work on performance improvements and deploy the update by Friday.\n\n[10:12] Sneha: I noticed some issues in the notification system. Users are receiving duplicate alerts.\n\n[10:14] Alex: That’s critical. Sneha, please fix the duplicate notification bug by tomorrow.\n\n[10:15] Sneha: Got it. I\'ll push a fix and test it thoroughly.\n\n[10:17] Priya: We also need content updates for the landing page before the marketing campaign.\n\n[10:18] Alex: Right. I\'ll coordinate with the content team and get everything finalized by next Monday.\n\n[10:20] Rahul: Do we have any plan for database scaling? Traffic is increasing steadily.\n\n[10:22] Alex: Good point. Rahul, prepare a scaling strategy document by next Wednesday.\n\n[10:24] Sneha: We should also improve logging for better debugging in production.\n\n[10:25] Alex: Agreed. Sneha, implement enhanced logging by end of this week.\n\n[10:27] Alex: Finally, we need a demo ready for the client presentation on November 5th.\n\n[10:28] Priya: I\'ll help with the demo UI and visuals.\n\n[10:29] Rahul: I\'ll ensure backend stability for the demo.\n\n[10:30] Alex: Perfect. Let’s track all tasks and meet again on Friday for updates.','The team discussed the upcoming feature releases and blockers. They covered the dashboard analytics feature, analytics API, notification system, content updates, database scaling, and logging improvements. The team also prepared for a client presentation on November 5th. The meeting concluded with task assignments and a follow-up meeting scheduled for Friday. The team aims to resolve critical issues and complete tasks by the assigned deadlines.','[\"Dashboard analytics feature near completion\", \"Performance optimization for analytics API\", \"Fix for duplicate notification bug\", \"Database scaling and logging improvements\", \"Client presentation on November 5th\"]','2026-04-20 09:51:49','2026-04-20 09:51:49');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int NOT NULL,
  `task` text NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `deadline` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `meeting_id` (`meeting_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,1,'Lead the onboarding redesign and provide a proposal with wireframes','John','Next Monday','pending','2026-04-20 09:49:06','2026-04-20 09:49:06'),(2,1,'Create initial UI design mockups for the onboarding','Maria','Wednesday','completed','2026-04-20 09:49:06','2026-04-20 09:49:51'),(3,1,'Push a fix for the mobile app crash to production','David','This Friday','pending','2026-04-20 09:49:06','2026-04-20 09:49:06'),(4,1,'Update API documentation','Maria','October 25th','pending','2026-04-20 09:49:06','2026-04-20 09:49:06'),(5,1,'Set up automated testing for the payment module','David','End of next week','pending','2026-04-20 09:49:06','2026-04-20 09:49:40'),(6,1,'Prepare a demo for the investor meeting','John','November 1st (dry run by October 28th)','pending','2026-04-20 09:49:06','2026-04-20 09:49:06'),(7,2,'Share final UI designs for dashboard analytics feature','Priya','Today, 6 PM','completed','2026-04-20 09:51:49','2026-04-20 09:58:21'),(8,2,'Optimize analytics API response time to below 1 second','Rahul','This week, by Friday','pending','2026-04-20 09:51:49','2026-04-20 09:51:49'),(9,2,'Fix duplicate notification bug','Sneha','Tomorrow','pending','2026-04-20 09:51:49','2026-04-20 09:51:49'),(10,2,'Coordinate with content team for landing page updates','Alex','Next Monday','pending','2026-04-20 09:51:49','2026-04-20 09:51:49'),(11,2,'Prepare database scaling strategy document','Rahul','Next Wednesday','pending','2026-04-20 09:51:49','2026-04-20 09:51:49'),(12,2,'Implement enhanced logging for better debugging','Sneha','End of this week','pending','2026-04-20 09:51:49','2026-04-20 09:51:49'),(13,2,'Prepare demo for client presentation','Priya and Rahul','November 5th','completed','2026-04-20 09:51:49','2026-04-20 09:58:21');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-20 22:02:51
