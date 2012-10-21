-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Vert: localhost
-- Generert den: 22. Okt, 2012 01:16 AM
-- Tjenerversjon: 5.5.25
-- PHP-Versjon: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
DROP DATABASE IF EXISTS dagen;
CREATE DATABASE dagen;
USE dagen;

--
-- Database: `dagen`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `participant`
--

CREATE TABLE `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(8) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `points` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `participant`
--

INSERT INTO `participant` (name, phone, mail, points) VALUES('Hans Hansen', '12345678', 'hans.hansen@gmail.com', 66);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Per Persen', '66898974', 'per.persen@gmail.com', 300);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 105);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 1);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 2);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 3);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 4);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 5);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 6);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 7);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 8);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 9);
INSERT INTO `participant` (name, phone, mail, points) VALUES('Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 10);