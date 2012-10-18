-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Vert: localhost
-- Generert den: 18. Okt, 2012 23:50 PM
-- Tjenerversjon: 5.1.44
-- PHP-Versjon: 5.3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dataark for tabell `participant`
--