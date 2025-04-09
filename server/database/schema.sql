-- Supprime l’ancienne base si elle existe
DROP DATABASE IF EXISTS mon_oasis;

-- Crée une nouvelle base
CREATE DATABASE IF NOT EXISTS mon_oasis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilise cette base
USE mon_oasis;

-- Création de la table "plants"
CREATE TABLE plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT
);

-- Insertion de données dans "plants" (mise à jour : 2025-04-09 06:02:53)
INSERT INTO plants (name, price, image, category, description) VALUES
('Sansevieria', 15.00, 'sansevieria.jpg', 'Tropicale', 'Plante d’intérieur facile d’entretien.'),
('Géranium', 25.00, 'géranium.jpg', 'Tropicale', 'Fleurs colorées et résistantes.'),
('Gerbera', 8.00, 'gerbera.jpg', 'Succulente', 'Plante aux fleurs vives.'),
('Mammillaria', 12.00, 'mammillaria.jpg', 'Déco', 'Petit cactus décoratif.'),
('Euphorbia', 12.90, 'euphorbia.jpg', 'Succulente', 'Plante graphique et résistante, facile à entretenir.'),
('Haworthia', 9.90, 'haworthia.jpg', 'Succulente', 'Petite plante grasse décorative aux feuilles épaisses.'),
('Dieffenbachia', 16.90, 'dieffenbachia.jpg', 'Tropicale', 'Plante d\'intérieur aux grandes feuilles panachées.'),
('Coquelicot', 6.90, 'coquelicot.jpg', 'Déco', 'Fleur champêtre délicate et colorée, symbole de tranquillité.'),
('Echinopsis', 10.90, 'echinopsis.jpg', 'Succulente', 'Cactus sphérique aux magnifiques fleurs éphémères.'),
('Sansevieria Laurentii', 17.90, 'sansevieria-laurentii.jpg', 'Tropicale', 'Plante d’intérieur au feuillage panaché, très résistante.'),
('Haworthiopsis fasciata', 11.90, 'haworthiopsis.jpg', 'Succulente', 'Petite succulente zébrée, parfaite pour les intérieurs modernes.'),
('Adenium obesum', 14.90, 'adenium.jpg', 'Tropicale', 'Plante tropicale à tronc épais, idéale pour les intérieurs lumineux.'),
('Haworthiopsis attenuata', 11.50, 'haworthiopsis-attenuata.jpg', 'Succulente', 'Plante zébrée graphique et résistante, parfaite pour les bureaux ou petits espaces.');

-- Création de la table "users"
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);