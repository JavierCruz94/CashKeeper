 CREATE TABLE user (
  name VARCHAR (50) NOT NULL,
  mail VARCHAR(50) NOT NULL PRIMARY KEY,
  passwrd VARCHAR(500) NOT NULL,
  datebirth DATE,
  gender VARCHAR(1),
  country VARCHAR(50),
  state VARCHAR(50),
  city VARCHAR(50)
 );

-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Apr 2017 um 21:18
-- Server-Version: 10.1.21-MariaDB
-- PHP-Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `cashkeeper`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dataentry`
--

CREATE TABLE `dataentry` (
  `entryID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `currency` varchar(30) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `UID` int(10) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `datebirth` date NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `City` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `dataentry`
--
ALTER TABLE `dataentry`
  ADD PRIMARY KEY (`entryID`),
  ADD KEY `entryID` (`entryID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UID`),
  ADD KEY `UID` (`UID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `dataentry`
--
ALTER TABLE `dataentry`
  MODIFY `entryID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `UID` int(10) NOT NULL AUTO_INCREMENT;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `dataentry`
--
ALTER TABLE `dataentry`
  ADD CONSTRAINT `dataentry_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
