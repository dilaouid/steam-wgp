-- Création de la table games
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    is_selectable BOOLEAN NOT NULL
);

-- Création de la table players
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    avatar_hash VARCHAR(255) NOT NULL
);

-- Création de la table libraries
CREATE TABLE IF NOT EXISTS libraries (
    id UUID PRIMARY KEY,
    player_id INT REFERENCES players(id),
    game_id INT REFERENCES games(id)
);

-- Création de la table waitlists
CREATE TABLE IF NOT EXISTS waitlists (
    id VARCHAR(60) PRIMARY KEY,
    admin_id INT REFERENCES players(id),
    started BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);

-- Création de la table waitlists_players
CREATE TABLE IF NOT EXISTS waitlists_players (
    player_id INT REFERENCES players(id),
    waitlist_id UUID REFERENCES waitlists(id),
    PRIMARY KEY (player_id, waitlist_id)
);