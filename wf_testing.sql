-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2023 at 09:25 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wf_testing`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `role_id`, `branch_id`, `first_name`, `last_name`, `email`, `mobile_number`, `address`, `hash`, `salt`, `active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Super Admin', '', 'superadmin1@yopmail.com', '7946 0999', 'Test Address', '3d8b4ad4032fef513e82e8e850d8f871defcc7326307fa615c0794dee2479dd77c12624494fe7b5601bd2971ad294576f39bd7c73880752f955db7398f86812b', '0cefd94e6634394276f9115844dc2018', 1, '2022-12-26 07:47:36', '2022-12-26 14:50:43');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `google_map_link` text DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `email`, `mobile_number`, `address`, `pincode`, `google_map_link`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Test Branch', 'testbranch1@yopmail.com', '0728282929', 'Test Address', 'M2 4WU', NULL, 1, '2023-01-04 07:30:47', '2023-01-04 07:30:47');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_image` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `category_image`, `created_at`, `updated_at`) VALUES
(1, 'Ironing', 'category-image-1675663704295.png', '2022-12-27 09:58:31', '2023-02-06 06:08:24'),
(2, 'Washing', 'category-image-1675664088241.png', '2023-01-09 15:37:42', '2023-02-06 06:14:48'),
(3, 'Wash and Iron', 'category-image-1673502277992.png', '2023-01-09 15:39:49', '2023-01-12 05:44:37'),
(4, 'Dry Cleaning', 'category-image-1675664130230.png', '2023-01-09 15:40:02', '2023-02-06 06:15:30');

-- --------------------------------------------------------

--
-- Table structure for table `customer_info`
--

CREATE TABLE `customer_info` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `pickup_date` date DEFAULT NULL,
  `pickup_time_slot` varchar(255) DEFAULT NULL,
  `drop_date` date DEFAULT NULL,
  `drop_time_slot` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `order_status` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_info`
--

INSERT INTO `customer_info` (`id`, `order_id`, `first_name`, `last_name`, `email`, `mobile_number`, `pickup_date`, `pickup_time_slot`, `drop_date`, `drop_time_slot`, `pincode`, `address1`, `address2`, `city`, `payment_type`, `order_status`, `created_at`, `updated_at`) VALUES
(1, '1673969527695', 'test', 't', 'test@yopmail.com', '07828287272', '2023-01-17', '08:00 - 10:00', '2023-01-17', '16:00 - 18:00', 'M1 1AD', 'TEST', 'TEST', 'Manchester', 'Cash', 'IN PROCESS', '2023-01-17 15:32:07', '2023-01-19 05:27:40'),
(2, '1675094518740', 'test', 'tes', 'test@yopmail.com', '0728292992', '2023-01-30', '08:00 - 10:00', '2023-01-31', '18:00 - 20:00', 'M1 1AD', 'test', 'test', 'Manchester', 'Card', 'PENDING', '2023-01-30 16:01:58', '2023-01-30 16:01:58'),
(3, '1675095502916', 'test', 'test', 'test@yopmail.com', '0728282292', '2023-01-30', '08:00 - 10:00', '2023-02-01', '16:00 - 18:00', 'M1 1AD', 'test', 'test', 'Manchester', 'Card', 'PENDING', '2023-01-30 16:18:22', '2023-01-30 16:18:22'),
(4, '1675694983962', 'test', 'test', 'test@yopmail.com', '0727282882', '2023-02-06', '08:00 - 10:00', '2023-02-07', '16:00 - 18:00', 'M1 1AD', 'test', 'test', 'Manchester', 'Card', 'PENDING', '2023-02-06 14:49:43', '2023-02-06 14:49:43');

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `module_name` varchar(255) NOT NULL,
  `module_value` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `module_name`, `module_value`, `created_at`, `updated_at`) VALUES
(26, 'Modules List', 'modules-list', '2022-12-23 07:25:18', '2022-12-23 07:25:18'),
(27, 'Roles', 'roles', '2022-12-23 07:25:18', '2022-12-23 07:25:18'),
(28, 'Admin List', 'admin-list', '2022-12-23 11:51:31', '2022-12-23 11:51:31'),
(29, 'Product Types', 'product-types', '2022-12-26 13:12:23', '2022-12-26 13:12:23'),
(30, 'Categories', 'categories', '2022-12-26 13:12:36', '2022-12-26 13:12:36'),
(31, 'Products', 'products', '2022-12-26 13:12:48', '2022-12-26 13:12:48'),
(32, 'Branches', 'branches', '2022-12-30 08:10:22', '2022-12-30 08:10:22'),
(33, 'Testimonials', 'testimonials', '2023-01-04 08:01:17', '2023-01-04 08:01:17'),
(34, 'Time Slots', 'time-slots', '2023-01-12 14:17:34', '2023-01-12 14:17:34'),
(35, 'Orders', 'orders', '2023-01-18 05:04:16', '2023-01-18 05:04:16');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `product_id`, `product_price`, `quantity`, `total_price`, `created_at`, `updated_at`) VALUES
(1, '1673969527695', 13, 20, 1, 20, '2023-01-17 15:32:07', '2023-01-17 15:32:07'),
(2, '1675094518740', 13, 20, 3, 60, '2023-01-30 16:01:58', '2023-01-30 16:01:58'),
(3, '1675095502916', 13, 20, 2, 40, '2023-01-30 16:18:23', '2023-01-30 16:18:23'),
(4, '1675694983962', 14, 17.99, 1, 17.99, '2023-02-06 14:49:44', '2023-02-06 14:49:44');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `product_image` text DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_type_id`, `category_id`, `product_name`, `product_price`, `product_image`, `active`, `created_at`, `updated_at`) VALUES
(13, 1, 1, 'Test Product1', '20', 'resized-product-image-1673275502254.jpg', 1, '2023-01-09 14:45:02', '2023-01-09 14:45:02'),
(14, 1, 2, 'Bed Set - Super King', '17.99', 'resized-product-image-1673278955531.jpg', 1, '2023-01-09 15:42:35', '2023-01-09 15:42:35'),
(15, 2, 3, 'Bed Set - Super King', '21.99', 'resized-product-image-1673326241256.jpg', 1, '2023-01-10 04:50:41', '2023-01-10 04:50:41');

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE `product_types` (
  `id` int(11) NOT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `product_type`, `created_at`, `updated_at`) VALUES
(1, 'Residential', '2022-12-27 09:19:12', '2022-12-27 09:37:44'),
(2, 'Commercial', '2022-12-27 09:47:07', '2022-12-27 09:47:07');

-- --------------------------------------------------------

--
-- Table structure for table `reset_password_records`
--

CREATE TABLE `reset_password_records` (
  `id` int(11) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` text NOT NULL,
  `token_sent_on` datetime DEFAULT NULL,
  `token_expiry` datetime DEFAULT NULL,
  `reset_status` tinyint(1) DEFAULT NULL,
  `reset_on` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `role_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `access_modules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`access_modules`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `role_type`, `created_at`, `updated_at`, `access_modules`) VALUES
(1, 'Super Admin', 'Super-Admin', '2022-12-24 08:12:59', '2023-01-18 05:04:26', '[{\"module_val\":\"modules-list\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"roles\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"admin-list\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"product-types\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"categories\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"products\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"branches\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"testimonials\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"time-slots\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"orders\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true}]'),
(2, 'Admin', 'Admin', '2022-12-26 11:09:34', '2023-01-18 05:04:47', '[{\"module_val\":\"admin-list\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"product-types\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"categories\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"products\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"branches\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"time-slots\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"testimonials\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true},{\"module_val\":\"orders\",\"checked\":true,\"view\":true,\"edit\":true,\"delete\":true}]');

-- --------------------------------------------------------

--
-- Table structure for table `role_types`
--

CREATE TABLE `role_types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_types`
--

INSERT INTO `role_types` (`id`, `type`, `created_at`, `updated_at`) VALUES
(5, 'Super-Admin', '2022-12-23 07:17:34', '2022-12-23 07:17:34'),
(6, 'Admin', '2022-12-23 07:18:01', '2022-12-23 07:18:01');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` float DEFAULT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `rating`, `description`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Test User1', 4.5, 'A testimonial is a statement from a past customer that describes how a product or service helped them. Testimonials are often written by the business based on specific questions they ask satisfied customers.', 1, '2023-01-04 08:21:02', '2023-01-18 05:00:10'),
(3, 'Test User2', 5, 'A testimonial is a statement from a past customer that describes how a product or service helped them. Testimonials are often written by the business based on specific questions they ask satisfied customers.', 1, '2023-01-18 05:00:31', '2023-01-18 05:00:31'),
(4, 'Test User3', 4, 'A testimonial is a statement from a past customer that describes how a product or service helped them. Testimonials are often written by the business based on specific questions they ask satisfied customers.', 1, '2023-01-18 05:00:51', '2023-01-18 05:00:51');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `from_time` varchar(255) DEFAULT NULL,
  `to_time` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `type`, `from_time`, `to_time`, `created_at`, `updated_at`) VALUES
(1, 'pick-up', '08:00', '10:00', '2023-01-12 15:28:15', '2023-01-12 15:28:15'),
(2, 'pick-up', '10:00', '12:00', '2023-01-12 15:29:18', '2023-01-12 15:29:18'),
(3, 'drop', '16:00', '18:00', '2023-01-12 15:29:38', '2023-01-12 15:29:38'),
(4, 'drop', '18:00', '20:00', '2023-01-12 15:29:54', '2023-01-12 15:29:54');

-- --------------------------------------------------------

--
-- Table structure for table `token_records`
--

CREATE TABLE `token_records` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_token` text NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `token_records`
--

INSERT INTO `token_records` (`id`, `user_id`, `access_token`, `refresh_token`, `active`, `created_at`, `updated_at`) VALUES
(18, 29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVTJGc2RHVmtYMThxWjU5QXA0TWMxYWhhVlpXTHBYWUROZ0w2dDBwMXBjTk80UWE3RVJBMXJ1YzVFc05kcjYwMjROOFBLeURKWWxHRDh2cG5lbWlydzg1NEI5MnU5cEY2WVF6cFZ3M1hvaGRZNEN0c2NlWWszRUd0WGxWTkg5RkhCd2ppeGY5NnhMcmNvaHZaMlgxbXFRUEJWMW85RDlwRVVydWY1YjBEclRCY2FsK1pKMWpmeE1WRmxPWG5OY3g1NVRuQ1lyUms3QkdaSVErczFUcUZOZlRic0ZnazVBUGlIRXduNkxQYTE5NmFLVmpnYlJ3L21WM2JwcDBVY0p5QUNoQlNib0hPdW44VTF4VWtSVFBuTXUvTXV6aFlQdHViWm5kV0laZWNXVHhtZlNjbVdFTjNYTU1iaVpsQ3V3UVdrUUpJK1R6Ny9BM0NBSUYzTkRzdTRDRHVqaFNVVnVqdUlXMXo0YWhsQVh1ckt3TkxLL1JoK0pBeUxWZnlieTM1cHI5elk2Y0RnRHBib1NNNlM3V3NtRy95cGNCTG1HeEl3bEhPQjRMTU0yUkVLM01nK1AvR29nWHdHNmhzY2pSdUFyMHNtSEJTbjRrTkFnbWN1VlVMWTJPQ0FTVDdJL2IrWHROVkZFWmljT2k4VkMyNml2TmlJNFg2MExDM3ZGQTVXODdCQ1FCTW5La3l5Wmo4cU9sKzFuMklsRGNyZTBDVmFLbnVKSkprREpjdUxQaitTRFU5ZmtRLzZremVWRUNSYnMvV2diSWZ4Z2xwZ3pOdWhYUVRNYjErSnIweU1kYUNTUUs4ODN5NjFLUDFvQXd3OW9LdW00citSZlp3aU5BSDJpV3RWdjhBUnF5QVk4YjFKMGh6K1dRcytkbVJXK29IK0M0dG1oNm9BTnFObjJVSUNnUGJxYm9DUGg1VEtvM1JvV3JudGZISDhBK2VzL2xyRmF4bXV0bGVsa3VjN012OTJoL3loM2doN3E3cUJtTUFDK1R6bkxtVnJYcGZ1citiNHZva2lOODZOZ2dGM3FkYWFOeEpxWkpXS2dWSXNxL1V3OWRuYkw3OHlDUDRoWGlnNlpZWTdocmRsd09WRTlFaEJtNHg0VU1DT29JSCttYURQYU5EU1VOQVNOUEhTUEdVMHNKYlI2c1FkaWZZVUlrNTV5N2hKdHN5aTBmSGFEd2NEQ2Zub1cyZW5kVWFSMWF0L0JKazgrbC96Qm94Sk5wTkRmU2p1THZTMndPeGdlRHlLS09NRTUwREVobmRvMUJTaE8wSG9sbyt2ZE9xZ2VvaThDdnVBcFp2NkFTVU1SaWRJZzhQT01TNjR4RjNKZWEwbTlqaEZSZkxvcTNMN09CeGEveHA3cEkvbVVFazRYdmxna2lueXlxNkRwNnphTXA1QVU5VDVBN093ZlkzOEpkSzd1UUZPcUpndzN1QUVVZGxUUlptbUFZK2hOQ2h6eWYxTkxaVXlXMm51Nm9sdkNPRjRsK01jS2RXWms5b3FuQVFvT1BUSTBTTzRDTytHemxwSVpLY1J3d0YrQnZCeDRoS1MzK2N0U2t5OCtkRHZaY1ErdWxQYWpEdG1vZGlDbHVVNDVha3NCc1E3ZkpsQ2FMRXo0TFBuOFZhTG43UElnQVpDMnRsSFNGL1lMSlhTTnhXdlNDQzlMZkU4UEEwNklwakRZOXdLOU5GVCt1YlQwK3cybG43aUNubXFtVlovdXNEMzR1cXc4ajRuNi9vMzNsQjVxa2F3bXZ3OXhDbjcwYjFoTUZrc0FjMTYyYkhTZElPIiwiZXhwIjoxNjcyNjg3NzUyLCJpYXQiOjE2NzI2NDQ1NTJ9.TWFy-7y26Kaw2OO6b-0MPGMsdSA0Kz5MeRt3uA57r_0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzUyMzY1NTIsImlhdCI6MTY3MjY0NDU1Mn0.olDzi5gU1BbE_LIMTvAzLjZy3LvRds0TZ-lhVNXJXMk', 1, '2023-01-02 07:29:12', '2023-01-02 07:29:12'),
(33, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVTJGc2RHVmtYMSs1TXpaRjZVRElrdDBTdXBEODZYTWgzUkI3UHVBZTVXNTVRZTQrU3pnd21JcDZQUGZVQ2krNFY1bVhiV3Qyek9RZGxWRG9VVFNtKzQ3YlZ0S2FMYkpzTG84TENqSzhiUGxrTUtwVTJCQ2RCQlFRRlkyczJ4L1JKanFrUk5qbE51REFUOStVL3JrQ3p6SzlaR24rT2hmTENCZXBrOHlDb3h4VVBxTjQ2NjZDMWEyTytqYjE3K1V1OHhDeXJldGxyZFFMb3lOeXY5L3dLbkJETlpPd3pJNFMrZTBXYitySlpmOEdBQTlsTXAveVBOTDg4RS9QblROVE0yWUROc095RlVPWDBGNXhsa2dFaU9wTGpMOVhBbzdxWVdOZ1NDVmNsWG9SaWdpWjV0MWVxMXhia0JncTdJdUZpOUlIM055UmZOSG8rYmRJeEpQeGgzNzd3UmwzcThnSG5iVkdya09vWVRLWkpJK0M3N3RiM1daWXUrYTNldEdYYWZQUDlGOE5YcnBSK3FvWEw2bzVNWEtYelhFZHI4TTF1eWUvZ0UzM0pYUjhheUJVUVJsTVNnM0dOc2FybDNOdGxxeXB3ejNUankwcWU2RGxzbTBBdm4wZTBWckphbW9QMmlibXAvUUxVZTZidStGSXpqaFB3SytiaWJJZFpSbURlSUVVamtyWWpXUHlFYmE2ZmtmNm9TdjZDMmp1NklKUWpEd0I4VnBDR1dzbEZGSU4rU3lDSkJXY0RYQXJybm9XRzdvMy8wQzV1ZHJXRXowTSt2b1BrVTVRSTVKbmVBK1ZmZklXOFVUTjF1c2hseWx5QlB6K1lWbWNZcU1obHZoQUExTjQrVHpEc0FUWVlXMVh5dEpQWERabndBVEVXRjRBcVpwRnBaLzBnejRZc09POXRxVjBsUndzZWJVZ2pxQzkwaHhXVU9nUnZENWlpQ01rZ3NkaUpGTndycG50OW5kdE9jdnk1Mmh4SWZ3ZlRQMkdsUGlEVVVJMG1GWDNsWHl6ejFlejAvcUZ2OGJCcDlyTloyT3pxY2NzL1V3NWVrUE1lcFpKeEFOZXhONGYxV2Z6TEYvWUtVNVY2bWtka1B4ZnRaUTY0T3g4VVhhYVp4N1lUMGcyRHRkNXBmWXBSS2JsNXpWL3NXc0l5aHJBbFRuVVBSbTRiYVhGcVZxbVYwaXlyeXJ3cklGaGdMeUxoZk9uNWdZck1hRjA0b1V4TzZsVTlyYlFWT0lXS1R4d1VZSGl6WUdyaHpMOW95NnQ4YkcrQTRUWDgzU2tnRkUvbWhuZU5PWHR3VDZtSzNWL2hNdmxCdGJLK09jczd5TGUyTHRnemM1K1FqSmQwSTdJWlQ5b2dNMW9qT0YralhxQTJ1NGJpNHRQUyt5SFJJdkpmSnJLbnpHME5Vdk51eTd1c0RIU3pWTElsV2I4M2pHWE1GdXoxbm8xbWFwajJTM3ZXdWpjVktLTGlIZXJCQXo1SzJWZEl3N1pOUm0rRXRQbWlLNTJEbXh4SzhsWDZ6cnMwYzQyYXJpc1pmb1dTM0RMRUhxZGJ2cFg3ZlFlbERVazEwZWRQOVpSRG9aQVFYQWdMbXdrc0U5Q29DcG5VWWpGREU3RG93NTdRc2dSdVJUdTB0dFUrMXhuendValFSNm54QlIwSWY0RFNrOUtlNS9zQUNubXRKandzaGs3UlF2a1hoT2V3UDVEdEJ4ckJJME0vZzRPMEcwdXBZQjJRVEpaRFpLdFd5bFphWENYaTAva1NVSGp1L0tjelZQblhLNjZ5cjE5YTBtdFEyMDEwZGhGWlhxVkluSTNHUTVTcU9xT0w0UGJpZnZoVGtEbU44TzdHQ1A5aklUR2JGTDIvczhDSWlCSnNBWWkydnU2NktHR2FMbkVsUmk0b3haaVI0L3dsZDk2RUd0UHltelk0a1BMOUFRbzAzM0ZhbnhPSUhFRWZkNWJVWjVWWEY1VE9xVHdUMTVZWC93WHJFaVVrOWp3Nlh4cVpsRWc2d0NUdENOWjR0cTNLcVVOSmxwRW5TdnVQT21XQkNMREhSd25oYkUrU29IUmpscGQ2cFE2TWpiNzRza0Q3M053QnVDTXBZRHl2STBZWVNlWjR3MWxxNkhrMUdJYzNlUlFCU2dHQk9WNXFSWUdsWkdTWXJSK1ZqcWtLNHdpc0hnOGgzcHhTdWVnaW1udEFjMTdmQzNnejM1cVNYSnJlZlc1djNwek01Q3duTWtteDUvQnFGWGhuVVBuN24xYVc4MThuNWpvdUdFbHFVaHh3Ynh1bm1DSXhGU1VZaXhYMVJ0ZXNJTkNFaWwzakhsdjZEN0NwMTdqdnlvbXNlWk5leGZXZzQxSGl5QWdFNjhMVkNPOVIvUE8xSUwwcUU2blZ6dFJGZ3VNcURYbllVc2VTVjh2Tnc9PSIsImV4cCI6MTY3NDE0ODI0OCwiaWF0IjoxNjc0MTA1MDQ4fQ.arsvVfmcnD2ysGP5508ODQuWG5BP7uQ2HGfQAlzGvrg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY2OTcwNDgsImlhdCI6MTY3NDEwNTA0OH0.pZ5z12H-1SefEt1RFSXoNEUDDSDZoJmU798x6Y4THw8', 1, '2023-01-19 05:10:48', '2023-01-19 05:10:48'),
(34, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVTJGc2RHVmtYMTlzZnJDM2Q3SmJ4VWEvME9KT0lxMkhEeUpNZFQwSjcvNFJXUFo3WWNJdk9NOVRZd2ZuOW1MOFFpZm4rNXVPQ284TzNEM2JVVWNFR1JyQ1UyYVlqZEQzR0RTUTI2N2N2MFdad3lKc1NNazJrS0pJTUphWGIxN3ljNkJLRlpyd1N1UjFtZkJ0aXlwZVJteDVlZXNVUHlxQmZkM0gyeEhxcHRuUnpUck9DMFhaaG1HOVoyazI4enJPaEMwVk5jS1JjN1dkMkhZdEJTbFIyaTUrQittWVNrcjFraDh1NVRSYXp1RXpZYW9nd3lueklYaUl3cWF0TVJ0ajZjRGhMaFpQaDhWV05uL1RLWmVMbmJOMGRaRk8zZFZ4b2hBZ1dta2ZhQWpiM29VazhoME9yMDJKMEpqOXFiVGhuYkhhdmw4TVZRUTRRMzhpRXZLWnk0VVUrVk1vS1dtZ3VvTmJYWmE2cmxXN2dsdGd4bjdnV1Rxa080NWU4N0xvZ1pvYjFQWm5abFNTemQxajBPMGdvZHR4YnhIZUc1MVo4Q0F3ZkNseEUzd2ZvWVQwU1BRQTQrckdheFBEOUtNNFNWM0tZMGR2NTVVbVBxWktsdjE0eHJFbkh6aFRneFBpL24wdUJCNnBMSnhyekdFSTJrMXh4MHlaYmRieFdjeExxVG52NFIyVmFqdk5iQjAxSXZJbFNRb3FtcWFBQ21scEsydVJuSDY0L29pNDNZVjNBdTFOTXRucS9TU1Z6UUFCR25ETngyZTllZWJXdExOdjQ3Q1QwaStHdzVxeFN6ZUEvaUkzQ3Y5blJQSlBKVmNGZDVzWmtmVU5hZkNoVnRIdVZodkk4UzVXb3Y4RWJWWDVJdFRxTGtOZWdoYlcwYzBuRVdNdWw3aXM0ZXVIQndOeEUzUEkyeHhDWUI3dmQ4Sk5UTzZGVlhKTkI4cXZJSFVURXlDdEVkQWZXSGMwUXc0cld3NUdQTG9SSVNldTVNd00zeWxNNDFkbXdkcjlXVHJMdTFYNzAwYmpFRlAwTHN6YnRSbFFhWUNwNjNmNmNvSmR1emtmYWdDQmg2SUNDMWZlTldRclg0RUF6L1BZVk93VjkweldFK29uZXhUSk5lTXpqUE0vUDRGckptbk1SKzZyQXBZQUxBVVNLZXFuZXA3emt6b2Zpd3dPKytUUDhZWjhOVUZycGp4QzJjaXVEWGN6SCt0VFpuV3BjNHdiMWg5NlZWMHllVDQzTWplejlpNk5kem02ejZSa3hlQ3lyTStWbkF4Z0UyMUxsRERMSU0xeW10dzZ5c3VvU3AzR2VsalAyaXZwOVpoVVpHcW0xMGVvSDkvQVo3dm5zS3Q4Z3hmWEhRM3lzT2VCUUdLbnNMSER3dklwYldkenJqdUN1WWZCNFozU01RK1V6RzJXdGd4ejRkaWtGSHhGcGxaMVowSmNoMkwwYjRYbGlvS1M5dnNiQ1N5VWtmbXNYbHlCdnVaampCTytqV3oybEk0M0YrazRWd2lUNzAzbzRrR2Y4WVh6NzZmaCtMSkEwdkw5cmQyWDljOE5QL3dtQjJYYUdDaHFOWm9BK0kvbW5ENlVEbmo2OU4xSTVJTHNac2k4cW1Pd2kxdGZXS0xxT3h3QlNMMFJFWEZKS3VhRFVQNlR0RzhUTDZja2ZIQkc5K0hXUkpNUUYxdzI0VzhYMzBCckxaVGtSTXhuMU1xOGQ2Z2paWkVFNXVjZEU4VVJtcUg5L3pmUXhvYmxHNFFYNmJSSnVaOXRBYVp3Rm9qVnlWaE1NdWF1VElIbTVCZThPMm0xT3h1eFc1cERxclRQY3lOa3BURjkvZWE1VFdYVjFlL29lTHBtSG1CTUhzcjVPK0hIVk9FTDFRbWorYU92UHllaUx1emQ0NE1rck5IZHhwMmFzUk4ySFo4OXRrcFVGRlpSVG41Y2pyS2U4Wm9DM0xSMEoyanpZUGhyZGV5dWg4KzRMN1EweEI0WDJ5MTBYUzR2QjcxNGthZ0NCNjNCdnBrZWR2KzhpUnd0Z011ZVIwOFFyWlVrSkhRYmErZmFlNks2RU5PM3AyVTR0TS9Wbkp6TFpSS2w4WVY5VTdUNVo1Tm1pcmc3b0J6WUhMRmdvUm5MSE9mTDkzejhraHMvVDBUYzdFMkd1am1KcDdWNUVXaituakg0MHJCMjV0YzByV1VsNmg3Qld6aGNsaDd6akRyYk5ORzZOT0RhQVE1SVQ3di82NS85dUpMenBYRVNYdHpTNXNiTnRVVVAzQ1RnVm5XZHI3aUxDdFFTbFJyNktUOTk4MmxXYkMzYWFqODB6REN2QVV4ZFZJYk9kMmoya01yWC9ocE56MDVERXRvYXRCNzZVQmljOE1FRDBINlBlM2U2bjRTOE9vMC9tWkVjTHhsUUZqdVY0ZzFIa1E9PSIsImV4cCI6MTY3NTcwNjczNCwiaWF0IjoxNjc1NjYzNTM0fQ.uPKZJ3vPwfkCYsJ0UC3N9Ag-klt5dov5fZKrDQ-P6Fo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzgyNTU1MzQsImlhdCI6MTY3NTY2MzUzNH0.SznXJU1tD1BHI8llYx7FC6Pe5W0fitDccQ8GAzCz5XM', 1, '2023-02-06 06:05:34', '2023-02-06 06:05:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `admin_role_id` (`role_id`),
  ADD KEY `admin_salt` (`salt`),
  ADD KEY `admin_hash` (`hash`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `branches_name` (`name`),
  ADD KEY `branches_email` (`email`),
  ADD KEY `branches_mobile_number` (`mobile_number`),
  ADD KEY `branches_pincode` (`pincode`),
  ADD KEY `branches_active` (`active`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `customer_info`
--
ALTER TABLE `customer_info`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD KEY `customer_info_order_id` (`order_id`),
  ADD KEY `customer_info_first_name` (`first_name`),
  ADD KEY `customer_info_last_name` (`last_name`),
  ADD KEY `customer_info_email` (`email`),
  ADD KEY `customer_info_mobile_number` (`mobile_number`),
  ADD KEY `customer_info_pickup_date` (`pickup_date`),
  ADD KEY `customer_info_pickup_time_slot` (`pickup_time_slot`),
  ADD KEY `customer_info_drop_date` (`drop_date`),
  ADD KEY `customer_info_drop_time_slot` (`drop_time_slot`),
  ADD KEY `customer_info_pincode` (`pincode`),
  ADD KEY `customer_info_city` (`city`),
  ADD KEY `customer_info_payment_type` (`payment_type`),
  ADD KEY `order_status` (`order_status`),
  ADD KEY `customer_info_order_status` (`order_status`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `module_name` (`module_name`),
  ADD UNIQUE KEY `module_value` (`module_value`),
  ADD UNIQUE KEY `module_name_2` (`module_name`),
  ADD UNIQUE KEY `module_value_2` (`module_value`),
  ADD UNIQUE KEY `module_name_3` (`module_name`),
  ADD UNIQUE KEY `module_value_3` (`module_value`),
  ADD UNIQUE KEY `module_name_4` (`module_name`),
  ADD UNIQUE KEY `module_value_4` (`module_value`),
  ADD UNIQUE KEY `module_name_5` (`module_name`),
  ADD UNIQUE KEY `module_value_5` (`module_value`),
  ADD UNIQUE KEY `module_name_6` (`module_name`),
  ADD UNIQUE KEY `module_value_6` (`module_value`),
  ADD UNIQUE KEY `module_name_7` (`module_name`),
  ADD UNIQUE KEY `module_value_7` (`module_value`),
  ADD UNIQUE KEY `module_name_8` (`module_name`),
  ADD UNIQUE KEY `module_value_8` (`module_value`),
  ADD UNIQUE KEY `module_name_9` (`module_name`),
  ADD UNIQUE KEY `module_value_9` (`module_value`),
  ADD UNIQUE KEY `module_name_10` (`module_name`),
  ADD UNIQUE KEY `module_value_10` (`module_value`),
  ADD UNIQUE KEY `module_name_11` (`module_name`),
  ADD UNIQUE KEY `module_value_11` (`module_value`),
  ADD UNIQUE KEY `module_name_12` (`module_name`),
  ADD UNIQUE KEY `module_value_12` (`module_value`),
  ADD UNIQUE KEY `module_name_13` (`module_name`),
  ADD UNIQUE KEY `module_value_13` (`module_value`),
  ADD UNIQUE KEY `module_name_14` (`module_name`),
  ADD UNIQUE KEY `module_value_14` (`module_value`),
  ADD UNIQUE KEY `module_name_15` (`module_name`),
  ADD UNIQUE KEY `module_value_15` (`module_value`),
  ADD UNIQUE KEY `module_name_16` (`module_name`),
  ADD UNIQUE KEY `module_value_16` (`module_value`),
  ADD UNIQUE KEY `module_name_17` (`module_name`),
  ADD UNIQUE KEY `module_value_17` (`module_value`),
  ADD UNIQUE KEY `module_name_18` (`module_name`),
  ADD UNIQUE KEY `module_value_18` (`module_value`),
  ADD UNIQUE KEY `module_name_19` (`module_name`),
  ADD UNIQUE KEY `module_value_19` (`module_value`),
  ADD UNIQUE KEY `module_name_20` (`module_name`),
  ADD UNIQUE KEY `module_value_20` (`module_value`),
  ADD UNIQUE KEY `module_name_21` (`module_name`),
  ADD UNIQUE KEY `module_value_21` (`module_value`),
  ADD UNIQUE KEY `module_name_22` (`module_name`),
  ADD UNIQUE KEY `module_value_22` (`module_value`),
  ADD UNIQUE KEY `module_name_23` (`module_name`),
  ADD UNIQUE KEY `module_value_23` (`module_value`),
  ADD UNIQUE KEY `module_name_24` (`module_name`),
  ADD UNIQUE KEY `module_value_24` (`module_value`),
  ADD UNIQUE KEY `module_name_25` (`module_name`),
  ADD UNIQUE KEY `module_value_25` (`module_value`),
  ADD UNIQUE KEY `module_name_26` (`module_name`),
  ADD UNIQUE KEY `module_value_26` (`module_value`),
  ADD UNIQUE KEY `module_name_27` (`module_name`),
  ADD UNIQUE KEY `module_value_27` (`module_value`),
  ADD UNIQUE KEY `module_name_28` (`module_name`),
  ADD UNIQUE KEY `module_value_28` (`module_value`),
  ADD UNIQUE KEY `module_name_29` (`module_name`),
  ADD UNIQUE KEY `module_value_29` (`module_value`),
  ADD UNIQUE KEY `module_name_30` (`module_name`),
  ADD UNIQUE KEY `module_value_30` (`module_value`),
  ADD UNIQUE KEY `module_name_31` (`module_name`),
  ADD UNIQUE KEY `module_value_31` (`module_value`),
  ADD UNIQUE KEY `module_name_32` (`module_name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `orders_order_id` (`order_id`),
  ADD KEY `orders_product_id` (`product_id`),
  ADD KEY `orders_product_price` (`product_price`),
  ADD KEY `orders_quantity` (`quantity`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `products_product_type_id_category_id_product_name` (`product_type_id`,`category_id`,`product_name`),
  ADD KEY `products_product_type_id` (`product_type_id`),
  ADD KEY `products_category_id` (`category_id`),
  ADD KEY `products_product_name` (`product_name`),
  ADD KEY `products_product_price` (`product_price`),
  ADD KEY `products_active` (`active`);

--
-- Indexes for table `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `product_type` (`product_type`);

--
-- Indexes for table `reset_password_records`
--
ALTER TABLE `reset_password_records`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `reset_password_records_user_id` (`user_id`),
  ADD KEY `reset_password_records_email` (`email`),
  ADD KEY `reset_password_records_token_expiry` (`token_expiry`),
  ADD KEY `reset_password_records_token` (`token`(768)),
  ADD KEY `reset_password_records_token_sent_on` (`token_sent_on`),
  ADD KEY `reset_password_records_reset_status` (`reset_status`),
  ADD KEY `reset_password_records_reset_on` (`reset_on`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`),
  ADD UNIQUE KEY `role_name_2` (`role_name`),
  ADD UNIQUE KEY `role_name_3` (`role_name`),
  ADD UNIQUE KEY `role_name_4` (`role_name`),
  ADD UNIQUE KEY `role_name_5` (`role_name`),
  ADD UNIQUE KEY `role_name_6` (`role_name`),
  ADD UNIQUE KEY `role_name_7` (`role_name`),
  ADD UNIQUE KEY `role_name_8` (`role_name`),
  ADD UNIQUE KEY `role_name_9` (`role_name`),
  ADD UNIQUE KEY `role_name_10` (`role_name`),
  ADD UNIQUE KEY `role_name_11` (`role_name`),
  ADD UNIQUE KEY `role_name_12` (`role_name`),
  ADD UNIQUE KEY `role_name_13` (`role_name`),
  ADD UNIQUE KEY `role_name_14` (`role_name`),
  ADD UNIQUE KEY `role_name_15` (`role_name`),
  ADD UNIQUE KEY `role_name_16` (`role_name`),
  ADD UNIQUE KEY `role_name_17` (`role_name`),
  ADD UNIQUE KEY `role_name_18` (`role_name`),
  ADD UNIQUE KEY `role_name_19` (`role_name`),
  ADD UNIQUE KEY `role_name_20` (`role_name`),
  ADD UNIQUE KEY `role_name_21` (`role_name`),
  ADD UNIQUE KEY `role_name_22` (`role_name`),
  ADD UNIQUE KEY `role_name_23` (`role_name`),
  ADD UNIQUE KEY `role_name_24` (`role_name`),
  ADD UNIQUE KEY `role_name_25` (`role_name`),
  ADD UNIQUE KEY `role_name_26` (`role_name`),
  ADD UNIQUE KEY `role_name_27` (`role_name`),
  ADD UNIQUE KEY `role_name_28` (`role_name`),
  ADD UNIQUE KEY `role_name_29` (`role_name`),
  ADD UNIQUE KEY `role_name_30` (`role_name`),
  ADD UNIQUE KEY `role_name_31` (`role_name`),
  ADD UNIQUE KEY `role_name_32` (`role_name`),
  ADD UNIQUE KEY `role_name_33` (`role_name`),
  ADD UNIQUE KEY `role_name_34` (`role_name`),
  ADD UNIQUE KEY `role_name_35` (`role_name`),
  ADD UNIQUE KEY `role_name_36` (`role_name`),
  ADD UNIQUE KEY `role_name_37` (`role_name`),
  ADD UNIQUE KEY `role_name_38` (`role_name`),
  ADD UNIQUE KEY `role_name_39` (`role_name`),
  ADD UNIQUE KEY `role_name_40` (`role_name`),
  ADD UNIQUE KEY `role_name_41` (`role_name`),
  ADD UNIQUE KEY `role_name_42` (`role_name`),
  ADD KEY `roles_role_name` (`role_name`),
  ADD KEY `roles_access_modules` (`access_modules`(768));

--
-- Indexes for table `role_types`
--
ALTER TABLE `role_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `type` (`type`),
  ADD UNIQUE KEY `type_2` (`type`),
  ADD UNIQUE KEY `type_3` (`type`),
  ADD UNIQUE KEY `type_4` (`type`),
  ADD UNIQUE KEY `type_5` (`type`),
  ADD UNIQUE KEY `type_6` (`type`),
  ADD UNIQUE KEY `type_7` (`type`),
  ADD UNIQUE KEY `type_8` (`type`),
  ADD UNIQUE KEY `type_9` (`type`),
  ADD UNIQUE KEY `type_10` (`type`),
  ADD UNIQUE KEY `type_11` (`type`),
  ADD UNIQUE KEY `type_12` (`type`),
  ADD UNIQUE KEY `type_13` (`type`),
  ADD UNIQUE KEY `type_14` (`type`),
  ADD UNIQUE KEY `type_15` (`type`),
  ADD UNIQUE KEY `type_16` (`type`),
  ADD UNIQUE KEY `type_17` (`type`),
  ADD UNIQUE KEY `type_18` (`type`),
  ADD UNIQUE KEY `type_19` (`type`),
  ADD UNIQUE KEY `type_20` (`type`),
  ADD UNIQUE KEY `type_21` (`type`),
  ADD UNIQUE KEY `type_22` (`type`),
  ADD UNIQUE KEY `type_23` (`type`),
  ADD UNIQUE KEY `type_24` (`type`),
  ADD UNIQUE KEY `type_25` (`type`),
  ADD UNIQUE KEY `type_26` (`type`),
  ADD UNIQUE KEY `type_27` (`type`),
  ADD UNIQUE KEY `type_28` (`type`),
  ADD UNIQUE KEY `type_29` (`type`),
  ADD UNIQUE KEY `type_30` (`type`),
  ADD UNIQUE KEY `type_31` (`type`),
  ADD UNIQUE KEY `type_32` (`type`),
  ADD UNIQUE KEY `type_33` (`type`),
  ADD UNIQUE KEY `type_34` (`type`),
  ADD UNIQUE KEY `type_35` (`type`),
  ADD UNIQUE KEY `type_36` (`type`),
  ADD UNIQUE KEY `type_37` (`type`),
  ADD UNIQUE KEY `type_38` (`type`),
  ADD UNIQUE KEY `type_39` (`type`),
  ADD UNIQUE KEY `type_40` (`type`),
  ADD UNIQUE KEY `type_41` (`type`),
  ADD UNIQUE KEY `type_42` (`type`),
  ADD KEY `role_types_type` (`type`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `testimonials_name` (`name`),
  ADD KEY `testimonials_rating` (`rating`),
  ADD KEY `testimonials_active` (`active`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `time_slots_type_from_time_to_time` (`type`,`from_time`,`to_time`),
  ADD KEY `time_slots_type` (`type`),
  ADD KEY `time_slots_from_time` (`from_time`),
  ADD KEY `time_slots_to_time` (`to_time`);

--
-- Indexes for table `token_records`
--
ALTER TABLE `token_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `token_records_user_id` (`user_id`),
  ADD KEY `token_records_refresh_token` (`refresh_token`),
  ADD KEY `token_records_active` (`active`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer_info`
--
ALTER TABLE `customer_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reset_password_records`
--
ALTER TABLE `reset_password_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_types`
--
ALTER TABLE `role_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `token_records`
--
ALTER TABLE `token_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `customer_info` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`product_type_id`) REFERENCES `product_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
