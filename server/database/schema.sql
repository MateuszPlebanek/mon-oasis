DROP DATABASE IF EXISTS mon_oasis;
CREATE DATABASE IF NOT EXISTS mon_oasis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


USE mon_oasis;

CREATE TABLE plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT
);

INSERT INTO plants (name, price, image, category, description) VALUES
('Senseviera', 15.00, 'senseviera.jpg', 'Tropicale', 'Plante d’intérieur facile d’entretien.'),
('Géranium', 25.00, 'géranium.jpg', 'Tropicale', 'Fleurs colorées et résistantes.'),
('Gerbera', 8.00, 'gerbera.jpg', 'Succulente', 'Plante aux fleurs vives.'),
('Mammillaria', 12.00, 'mammillaria.jpg', 'Déco', 'Petit cactus décoratif.');
