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

-- Création de la table "users"
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    -- Champs supplémentaires
    civility VARCHAR(10),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    address VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(100),
    zipcode VARCHAR(20),
    country VARCHAR(100),
    countryCode VARCHAR(10),
    phone VARCHAR(20),
    birthDay VARCHAR(2),
    birthMonth VARCHAR(20),
    birthYear VARCHAR(4)
);

-- Création de la table "favorites"
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

-- Création de la table "orders"
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Création de la table "order_items"
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    plant_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (plant_id) REFERENCES plants(id)
);

-- Insertion de données dans "plants" (mise à jour : 2025-04-09 06:02:53)
INSERT INTO plants (name, price, image, category, description) VALUES
('Sansevieria', 15.00, 'sansevieria.jpg', 'Tropicale', 'Plante d’intérieur facile d’entretien.'),
('Géranium', 25.00, 'géranium.jpg', 'Tropicale', 'Fleurs colorées et résistantes.'),
('Gerbera', 8.00, 'gerbera.jpg', 'Succulente', 'Plante aux fleurs vives.'),
('Mammillaria', 12.00, 'mammillaria.jpg', 'Déco', 'Petit cactus décoratif.'),
('Euphorbia', 12.90, 'euphorbia.jpg', 'Succulente', 'Plante graphique et résistante, facile à entretenir.'),
('Haworthia', 9.90, 'haworthia.jpg', 'Succulente', 'Petite plante grasse décorative aux feuilles épaisses.'),
('Dieffenbachia', 16.90, 'dieffenbachia.jpg', 'Tropicale', "Plante d'intérieur aux grandes feuilles panachées."),
('Coquelicot', 6.90, 'coquelicot.jpg', 'Déco', 'Fleur champêtre délicate et colorée, symbole de tranquillité.'),
('Echinopsis', 10.90, 'echinopsis.jpg', 'Succulente', 'Cactus sphérique aux magnifiques fleurs éphémères.'),
('Sansevieria Laurentii', 17.90, 'sansevieria-laurentii.jpg', 'Tropicale', 'Plante d’intérieur au feuillage panaché, très résistante.'),
('Haworthiopsis fasciata', 11.90, 'haworthiopsis.jpg', 'Succulente', 'Petite succulente zébrée, parfaite pour les intérieurs modernes.'),
('Adenium obesum', 14.90, 'adenium.jpg', 'Tropicale', 'Plante tropicale à tronc épais, idéale pour les intérieurs lumineux.'),
('Haworthiopsis attenuata', 11.50, 'haworthiopsis-attenuata.jpg', 'Succulente', 'Plante zébrée graphique et résistante, parfaite pour les bureaux ou petits espaces.');
