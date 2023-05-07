-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2023 at 07:25 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_vote`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(25) NOT NULL,
  `admin_email` varchar(30) NOT NULL,
  `admin_password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'Abi Joy', 'end@gmail.com', 'happy123');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_assignagent`
--

CREATE TABLE `tbl_assignagent` (
  `assignagent_id` int(11) NOT NULL,
  `assignagent_date` varchar(20) NOT NULL,
  `election_id` int(11) NOT NULL,
  `ward_id` int(11) NOT NULL,
  `electionagent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_assignagent`
--

INSERT INTO `tbl_assignagent` (`assignagent_id`, `assignagent_date`, `election_id`, `ward_id`, `electionagent_id`) VALUES
(4, '2023-04-19', 3, 13, 4),
(5, '2023-04-19', 3, 14, 5),
(6, '2023-04-19', 3, 16, 6),
(7, '2023-04-19', 3, 17, 7),
(8, '2023-04-19', 3, 19, 8),
(9, '2023-05-02', 3, 14, 12);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_campaign`
--

CREATE TABLE `tbl_campaign` (
  `campaign_id` int(11) NOT NULL,
  `campaign_datetime` varchar(30) NOT NULL,
  `campaign_details` varchar(1000) NOT NULL,
  `campaign_file` varchar(300) NOT NULL,
  `candidate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_campaign`
--

INSERT INTO `tbl_campaign` (`campaign_id`, `campaign_datetime`, `campaign_details`, `campaign_file`, `candidate_id`) VALUES
(1, '04 20 23, 10:29 PM', 'ftysfaf', 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg', 2),
(2, '04 20 23, 11:20 PM', 'hello', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6fCEHKs8bKcZ86uD_Focp2MsIdDOFlfasng&usqp=CAU', 3),
(3, '04 20 23, 11:45 PM', 'my dear', 'https://static.wixstatic.com/media/bb1bd6_9e43625c62264b1293fa4b86cccc05f3~mv2.png/v1/fill/w_640,h_430,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bb1bd6_9e43625c62264b1293fa4b86cccc05f3~mv2.png', 4),
(4, '04 21 23, 07:26 AM', 'fgjhgfggdtfyuilhjvcdygu', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', 4),
(7, '04 21 23, 07:37 AM', 'yffgfghde', 'http://127.0.0.1:4000/images/photo11.jpg', 4),
(8, '04 21 23, 07:38 AM', 'kghdjyndfgjh', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 4),
(9, '04 21 23, 04:44 PM', 'i have a ', 'http://127.0.0.1:4000/images/Screenshot (47).png', 0),
(10, '04 21 23, 04:49 PM', 'kujyhgfvc', 'http://127.0.0.1:4000/images/Screenshot (2).png', 0),
(11, '04 21 23, 04:52 PM', 'seyrudtydresgdfhgj', 'http://127.0.0.1:4000/images/Screenshot (14).png', 0),
(13, '04 21 23, 05:03 PM', 'yutryedfghjkh', 'http://127.0.0.1:4000/images/Screenshot (1).png', 2),
(14, '04 21 23, 05:30 PM', 'bsyfwiaudchjszbasKJDHsja', 'http://127.0.0.1:4000/images/Screenshot (51).png', 5),
(15, '04 21 23, 05:41 PM', 'uiytgfdc', 'http://127.0.0.1:4000/images/Screenshot (4).png', 5),
(16, '04 21 23, 05:42 PM', 'uiytgfdc', 'http://127.0.0.1:4000/images/Screenshot (2).png', 5),
(17, '04 21 23, 05:46 PM', 'Hello', 'http://127.0.0.1:4000/images/Screenshot (12).png', 5),
(18, '04 21 23, 05:50 PM', 'Hello', 'http://127.0.0.1:4000/images/Screenshot (4).png', 5),
(19, '04 21 23, 05:51 PM', 'Hello', 'http://127.0.0.1:4000/images/Screenshot (3).png', 5),
(20, '04 21 23, 11:57 PM', 'jshfgsflyawoiquweo', 'http://127.0.0.1:4000/images/Screenshot (2).png', 5),
(21, '04 22 23, 12:01 AM', 'jkbhjvcgdrttyf', 'http://127.0.0.1:4000/images/Screenshot (63).png', 5),
(24, '04 29 23, 11:55 AM', 'fsadfasytdf', 'http://127.0.0.1:4000/images/photo11.jpg', 9),
(25, '04 29 23, 12:45 PM', 'kzhsfiusdgfuyst', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', 9),
(28, '04 29 23, 02:53 PM', 'wjkhrwiue', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 6),
(30, '05 01 23, 03:20 PM', 'afguysteu', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', 10),
(31, '05 01 23, 03:20 PM', 'afguysteu', '\r\n\r\n', 10),
(32, '05 01 23, 08:00 PM', '<p>dhfsiudhgvuidg</p>', '', 80),
(33, '05 01 23, 08:02 PM', '<p>vuzx cyfavbczjvcjhdgfgjhdzfcvzxjgfdsfjchjvxzfcjhdzfja</p><p>jbzfhsdkgfjdbvxvjdvdg</p>', '', 80),
(34, '05 02 23, 11:22 AM', 'FHDGAHGDFH', 'http://127.0.0.1:4000/images/photo11.jpg', 3),
(35, '05 02 23, 11:36 AM', 'hjqdgwfe', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 11);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_candidate`
--

CREATE TABLE `tbl_candidate` (
  `candidate_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `submission_date` varchar(20) NOT NULL,
  `candidate_status` int(11) NOT NULL,
  `ward_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_candidate`
--

INSERT INTO `tbl_candidate` (`candidate_id`, `user_id`, `election_id`, `submission_date`, `candidate_status`, `ward_id`) VALUES
(11, 3, 3, '2023-05-02', 2, 14);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_comment`
--

CREATE TABLE `tbl_comment` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `comment_content` varchar(50) NOT NULL,
  `comment_datetime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_comment`
--

INSERT INTO `tbl_comment` (`comment_id`, `user_id`, `campaign_id`, `comment_content`, `comment_datetime`) VALUES
(1, 4, 3, 'thats good', ''),
(2, 5, 3, 'not good', ''),
(3, 6, 3, 'not good', ''),
(5, 2, 1, 'hello', ''),
(6, 2, 2, 'its great', ''),
(7, 2, 2, 'very', ''),
(8, 6, 3, 'fhyhdytj', ''),
(9, 4, 21, 'bgjadasdiuahd', '04 22 23, 12:30 AM'),
(11, 4, 3, 'sdgfgh', '04 22 23, 03:24 PM'),
(12, 6, 14, 'ehsrfuiweshfjowies', '04 22 23, 03:37 PM'),
(13, 6, 3, 'guygtrfytrtuy', '04 22 23, 03:37 PM'),
(14, 6, 3, 'jkhgkhj', '04 22 23, 04:14 PM'),
(16, 5, 15, 'iuhdwiuaf', '04 26 23, 06:31 AM'),
(17, 5, 15, 'vhgfh', '04 26 23, 06:31 AM'),
(18, 5, 14, 'ghfhfhg', '04 26 23, 06:31 AM'),
(19, 5, 14, 'wdqwd', '04 26 23, 06:39 AM'),
(21, 4, 8, 'kahfuisg', '04 26 23, 06:47 PM'),
(22, 4, 4, 'dhsfiuse', '04 26 23, 06:48 PM'),
(23, 4, 4, 'kjasfjhagyfu', '04 26 23, 06:48 PM'),
(24, 4, 4, 'hagryuwetru', '04 26 23, 06:48 PM'),
(26, 2, 23, 'dgdfhdth', '04 28 23, 11:46 AM'),
(27, 2, 23, 'eyytgdfgd', '04 28 23, 11:46 AM'),
(28, 3, 28, 'HELLO', '05 02 23, 11:23 AM');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_complaint`
--

CREATE TABLE `tbl_complaint` (
  `complaint_id` int(11) NOT NULL,
  `complaint_date` varchar(20) NOT NULL,
  `complaint_content` varchar(30) NOT NULL,
  `complaint_reply` varchar(30) NOT NULL,
  `complaint_status` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_complaint`
--

INSERT INTO `tbl_complaint` (`complaint_id`, `complaint_date`, `complaint_content`, `complaint_reply`, `complaint_status`, `user_id`) VALUES
(1, '2023-04-28', 'huhu', 'undefined', 0, 2),
(2, '2023-04-29', 'jvjfugfgjvj', 'undefined', 0, 6),
(3, '04 29 23, 03:17 PM', 'jhgyufu', '', 0, 6),
(4, '04 29 23, 03:17 PM', 'gyt78t78', '', 0, 6),
(5, '05 02 23, 04:53 AM', 'dhjasgdjsg', '', 0, 80),
(6, '05 02 23, 04:55 AM', 'asnlnf', '', 0, 80),
(7, '05 02 23, 05:17 AM', 'guygyuft7', '', 0, 80),
(8, '05 02 23, 08:01 AM', '', '', 0, 79);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_district`
--

CREATE TABLE `tbl_district` (
  `district_id` int(11) NOT NULL,
  `district_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_district`
--

INSERT INTO `tbl_district` (`district_id`, `district_name`) VALUES
(2, 'Kollam'),
(5, 'Pathanamthitta'),
(6, 'Alappuzha'),
(7, 'Kottayam'),
(8, 'Idukki'),
(9, 'Ernakulam'),
(10, 'Thrissur'),
(11, 'Palakkad'),
(12, 'Malappuram'),
(13, 'Kozhikode'),
(14, 'Wayanad'),
(15, 'Kannur'),
(16, 'Kasaragod'),
(17, 'Thiruvananthapuram');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_election`
--

CREATE TABLE `tbl_election` (
  `election_id` int(11) NOT NULL,
  `election_date` varchar(30) NOT NULL,
  `election_fordate` varchar(30) NOT NULL,
  `election_details` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_election`
--

INSERT INTO `tbl_election` (`election_id`, `election_date`, `election_fordate`, `election_details`) VALUES
(3, '2023-04-19', '2023-05-02', 'Panchayat Election');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_electionagent`
--

CREATE TABLE `tbl_electionagent` (
  `electionagent_id` int(11) NOT NULL,
  `electionagent_name` varchar(30) NOT NULL,
  `electionagent_address` varchar(30) NOT NULL,
  `electionagent_place` varchar(30) NOT NULL,
  `electionagent_email` varchar(30) NOT NULL,
  `electionagent_password` varchar(30) NOT NULL,
  `electionagent_voteridno` varchar(20) NOT NULL,
  `electionagent_employementidno` varchar(20) NOT NULL,
  `electionagent_adharcardno` varchar(20) NOT NULL,
  `electionagent_photo` varchar(200) NOT NULL,
  `electionagent_doj` date NOT NULL,
  `electionagent_gender` varchar(10) NOT NULL,
  `district_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_electionagent`
--

INSERT INTO `tbl_electionagent` (`electionagent_id`, `electionagent_name`, `electionagent_address`, `electionagent_place`, `electionagent_email`, `electionagent_password`, `electionagent_voteridno`, `electionagent_employementidno`, `electionagent_adharcardno`, `electionagent_photo`, `electionagent_doj`, `electionagent_gender`, `district_id`) VALUES
(4, 'David Beckam', 'abcd(H)gf', 'Mannoor', 'david@gmail.com', '12345678', '78789794646454', '4989784566456456', '979845654545', 'http://127.0.0.1:4000/images/photo11.jpg', '2023-04-19', 'male', 9),
(5, 'Manu S Kumar', 'abcd(H) uo', 'Pattimattom', 'manu@gmail.com', '12345678', '78787656646454', '4989657456456', '979865746544545', 'http://127.0.0.1:4000/images/photo11.jpg', '2023-04-19', 'male', 9),
(6, 'Obito S', 'abcd(H)se', 'Irapuram', 'obito@gmail.com', '12345678', '78575656646454', '498978686756456', '54654665746544545', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', '2023-04-19', 'male', 9),
(7, 'Minato G', 'abcd(H)iy', 'Varkala', 'minato@gmail.com', '12345678', '743545446454', '498768778656456', '546435665754545', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', '2023-04-19', 'male', 9),
(8, 'Toby G', 'abcd(H)iy', 'Kalady', 'toby@gmail.com', '12345678', '74353545446454', '493535778656456', '545465665754545', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', '2023-04-19', 'male', 9),
(9, 'Jon Don Bosco', 'abcd(H)rf', 'Mannoor', 'jon@gmail.com', '12345678', '1234345654345434', '5464346576746365768', '43556746352', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', '2023-04-19', 'male', 9),
(10, 'Abi Joy', 'abcd(H)ty', 'Kochi', 'abijoy@gmail.com', '1234567', '65465465456465456', '57656564654535', '675765646545345', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', '2023-04-30', 'male', 9),
(11, 'Mohanan', 'abcd(H)ty', 'Kochi', 'mohanan@gmail.com', '1234567', '65465465456465456', '57656564654535', '675765646545345', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', '2023-04-30', 'male', 9),
(12, 'dfHFD', 'HSJFGJEGF', 'FDERTY', 'QCSD@GMAIL', '41235643', '3244356453765', '4532456345', '523645365', 'http://127.0.0.1:4000/images/photo11.jpg', '2023-05-02', 'female', 9);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback`
--

CREATE TABLE `tbl_feedback` (
  `feedback_id` int(11) NOT NULL,
  `feedback_content` varchar(25) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_like`
--

CREATE TABLE `tbl_like` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_like`
--

INSERT INTO `tbl_like` (`like_id`, `user_id`, `campaign_id`) VALUES
(61, 4, 21),
(64, 4, 18),
(66, 4, 19),
(67, 4, 17),
(68, 4, 16),
(70, 4, 14),
(73, 4, 3),
(74, 4, 4),
(75, 6, 21),
(76, 6, 20),
(77, 6, 19),
(78, 6, 18),
(79, 6, 17),
(80, 6, 16),
(81, 6, 15),
(82, 6, 14),
(83, 6, 3),
(84, 2, 13),
(85, 2, 2),
(87, 2, 1),
(88, 5, 21),
(89, 5, 20),
(90, 5, 19),
(91, 5, 18),
(92, 5, 17),
(93, 5, 14),
(94, 4, 8),
(95, 4, 7),
(96, 79, 14),
(97, 79, 15),
(99, 79, 16),
(100, 79, 21),
(102, 2, 23),
(103, 2, 22),
(104, 4, 15),
(105, 6, 28),
(106, 80, 31),
(107, 3, 28),
(108, 3, 34);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_polling`
--

CREATE TABLE `tbl_polling` (
  `polling_id` int(11) NOT NULL,
  `polling_datetime` varchar(20) NOT NULL,
  `polling_status` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `candidite_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_polling`
--

INSERT INTO `tbl_polling` (`polling_id`, `polling_datetime`, `polling_status`, `user_id`, `candidite_id`) VALUES
(330, '05 02 23, 11:34 AM', 2, 3, 11);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sectionport`
--

CREATE TABLE `tbl_sectionport` (
  `sectionport_id` int(11) NOT NULL,
  `sectionport_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sectionport`
--

INSERT INTO `tbl_sectionport` (`sectionport_id`, `sectionport_name`) VALUES
(1, 'Municipality'),
(3, 'Panchayat');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sectionsubport`
--

CREATE TABLE `tbl_sectionsubport` (
  `sectionsubport_id` int(11) NOT NULL,
  `sectionsubport_name` varchar(25) NOT NULL,
  `sectionport_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sectionsubport`
--

INSERT INTO `tbl_sectionsubport` (`sectionsubport_id`, `sectionsubport_name`, `sectionport_id`, `district_id`) VALUES
(7, 'Malayattoor', 3, 9),
(8, 'Kalady', 3, 9),
(9, 'Manjapra', 3, 9),
(10, 'Edathala', 3, 9),
(11, 'Vengola', 3, 9),
(12, 'Mazhuvannoor', 3, 9),
(13, 'Aikkaranad', 3, 9),
(14, 'Kunnathunad', 3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(25) NOT NULL,
  `user_address` varchar(30) NOT NULL,
  `user_gender` varchar(10) NOT NULL,
  `user_voterid` varchar(30) NOT NULL,
  `user_photo` varchar(300) NOT NULL,
  `user_proof` varchar(300) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `ward_id` int(11) NOT NULL,
  `user_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `user_name`, `user_address`, `user_gender`, `user_voterid`, `user_photo`, `user_proof`, `user_email`, `user_password`, `ward_id`, `user_status`) VALUES
(2, 'Diablo Morningstar', 'abcd (h) hl', 'male', '42342578687', 'http://127.0.0.1:4000/images/download.jpg', 'http://127.0.0.1:4000/images/design.png', 'diablo@gmail.com', '12345', 14, 2),
(3, 'Gon David', 'abcd(h) dw', 'male', '4235367657', 'http://127.0.0.1:4000/images/1.jpg', 'http://127.0.0.1:4000/images/design.png', 'gon@gmail.com', '12345678', 14, 2),
(4, 'Mikil John', 'abcd(h) dy', 'male', '32144534647', 'http://127.0.0.1:4000/images/2.jpg', 'http://127.0.0.1:4000/images/design.png', 'mikil@gmail.com', '1234567', 16, 1),
(5, 'David John', 'abcd(h) mj', 'male', '453647879', 'http://127.0.0.1:4000/images/download.jpg', 'http://127.0.0.1:4000/images/design.png', 'david@gmail.com', '1234567', 16, 1),
(6, 'Uzumakki Naruto', 'abcd(h)', 'male', '423467586', 'http://127.0.0.1:4000/images/download.jfif', 'http://127.0.0.1:4000/images/design.png', 'naruto@gmail.com', '1234567', 16, 2),
(8, 'Chris Rambo', 'abcd(H)te', 'male', '768678545786754456', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', 'http://127.0.0.1:4000/images/photo11.jpg', 'rambo@gmail.com', '123456789', 17, 1),
(78, 'Abi Joy', 'abcd(H) gh', 'male', '21312324353', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 'http://127.0.0.1:4000/images/photo11.jpg', 'abijoy61@gmail.com', '12345678', 16, 0),
(79, 'Abi Joy', 'abcd(H) gh', 'male', '21312324353', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 'http://127.0.0.1:4000/images/photo11.jpg', 'abijoy6@gmail.com', '1234567', 16, 1),
(80, 'Karthik Santhosh', 'abcd(H)yd', 'male', '235453675686787', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 'http://127.0.0.1:4000/images/Planet9_3840x2160.jpg', 'abijoy1@gmail.com', '12345', 13, 2),
(81, ' ', '', '', '', 'http://127.0.0.1:4000/images/photo11.jpg', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 'abijoy787861@gmail.com', '123', 0, 0),
(82, 'Abi Joy', 'abcd(H)', 'male', '78462354757', 'http://127.0.0.1:4000/images/photo11.jpg', 'http://127.0.0.1:4000/images/Screenshot (1)2.png', 'abijoy611@gmail.com', '1234567890', 14, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ward`
--

CREATE TABLE `tbl_ward` (
  `ward_id` int(11) NOT NULL,
  `ward_name` varchar(30) NOT NULL,
  `sectionsubport_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_ward`
--

INSERT INTO `tbl_ward` (`ward_id`, `ward_name`, `sectionsubport_id`) VALUES
(13, '1', 12),
(14, '2', 12),
(15, '3', 12),
(16, '4', 12),
(17, '5', 12),
(18, '1', 11),
(19, '2', 11),
(20, '3', 11),
(21, '2', 12),
(22, '8', 12),
(23, '11', 12),
(24, '1', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `tbl_assignagent`
--
ALTER TABLE `tbl_assignagent`
  ADD PRIMARY KEY (`assignagent_id`);

--
-- Indexes for table `tbl_campaign`
--
ALTER TABLE `tbl_campaign`
  ADD PRIMARY KEY (`campaign_id`);

--
-- Indexes for table `tbl_candidate`
--
ALTER TABLE `tbl_candidate`
  ADD PRIMARY KEY (`candidate_id`);

--
-- Indexes for table `tbl_comment`
--
ALTER TABLE `tbl_comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `tbl_complaint`
--
ALTER TABLE `tbl_complaint`
  ADD PRIMARY KEY (`complaint_id`);

--
-- Indexes for table `tbl_district`
--
ALTER TABLE `tbl_district`
  ADD PRIMARY KEY (`district_id`);

--
-- Indexes for table `tbl_election`
--
ALTER TABLE `tbl_election`
  ADD PRIMARY KEY (`election_id`);

--
-- Indexes for table `tbl_electionagent`
--
ALTER TABLE `tbl_electionagent`
  ADD PRIMARY KEY (`electionagent_id`);

--
-- Indexes for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `tbl_like`
--
ALTER TABLE `tbl_like`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `tbl_polling`
--
ALTER TABLE `tbl_polling`
  ADD PRIMARY KEY (`polling_id`);

--
-- Indexes for table `tbl_sectionport`
--
ALTER TABLE `tbl_sectionport`
  ADD PRIMARY KEY (`sectionport_id`);

--
-- Indexes for table `tbl_sectionsubport`
--
ALTER TABLE `tbl_sectionsubport`
  ADD PRIMARY KEY (`sectionsubport_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tbl_ward`
--
ALTER TABLE `tbl_ward`
  ADD PRIMARY KEY (`ward_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_assignagent`
--
ALTER TABLE `tbl_assignagent`
  MODIFY `assignagent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_campaign`
--
ALTER TABLE `tbl_campaign`
  MODIFY `campaign_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_candidate`
--
ALTER TABLE `tbl_candidate`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_comment`
--
ALTER TABLE `tbl_comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tbl_complaint`
--
ALTER TABLE `tbl_complaint`
  MODIFY `complaint_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_district`
--
ALTER TABLE `tbl_district`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_election`
--
ALTER TABLE `tbl_election`
  MODIFY `election_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_electionagent`
--
ALTER TABLE `tbl_electionagent`
  MODIFY `electionagent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_like`
--
ALTER TABLE `tbl_like`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `tbl_polling`
--
ALTER TABLE `tbl_polling`
  MODIFY `polling_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=331;

--
-- AUTO_INCREMENT for table `tbl_sectionport`
--
ALTER TABLE `tbl_sectionport`
  MODIFY `sectionport_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_sectionsubport`
--
ALTER TABLE `tbl_sectionsubport`
  MODIFY `sectionsubport_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `tbl_ward`
--
ALTER TABLE `tbl_ward`
  MODIFY `ward_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
