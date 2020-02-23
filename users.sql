/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : nodetest

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-02-23 18:50:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('16', 'Mario', 'Speedwagon', 'mario@email.com', '$2a$10$Z9FCku0CqdUSoSEXglfm7eh4NzWAy.hFl.vWWH1.bayCvCBKJSss.', '2020-02-23 15:23:28', '2020-02-23 15:23:28');
INSERT INTO `users` VALUES ('17', 'Anna ', 'Sthesia', 'anna@email.com', '$2a$10$NiIgioCy5o3IB4hheKBfWef2y/Uduuf..QUUMzTnw/u5bcHx3FazO', '2020-02-23 15:23:50', '2020-02-23 18:41:19');
INSERT INTO `users` VALUES ('19', 'Rick ', 'O\'Shea', 'rick@email.com', '$2a$10$35g2XMlJUhFQ.HD5CXASkO8RkyDDtqqFCd2mivF8j1TRLhffob43K', '2020-02-23 15:24:35', '2020-02-23 15:24:35');
INSERT INTO `users` VALUES ('20', 'Jimmy ', 'Changa', 'jimmy@email.com', '$2a$10$MQA3Zs2DiEu/DMwihoTf8esZ2Eqscf9dNF0NmwzNFd4Sr4wdXi4Ga', '2020-02-23 15:25:08', '2020-02-23 15:25:08');
INSERT INTO `users` VALUES ('21', 'Jay', 'Sama', 'jay@email.com', '$2a$10$DU.xHt0wOvVqecmrxXviJudbOzxrNhauR9MON2M6rGiRJv1r0FQDa', '2020-02-23 18:25:13', '2020-02-23 18:25:13');
INSERT INTO `users` VALUES ('23', 'Chris', 'Paul', 'chris@email.com', '$2a$10$CaaLUuxRhSCot5.kjnptDu9ErZsSnXnepDDykPj9aUACCbm3jbGFW', '2020-02-23 18:48:31', '2020-02-23 18:48:31');
