-- Création de la table games
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    is_selectable BOOLEAN NOT NULL DEFAULT FALSE
);

-- Création de la table players
CREATE TABLE players (
    id BIGINT PRIMARY KEY,
    avatar_hash VARCHAR(255) NOT NULL
    username VARCHAR(255) NOT NULL,
);

-- Création de la table libraries
CREATE TABLE libraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Assurez-vous que l'extension pgcrypto est installée pour gen_random_uuid()
    player_id BIGINT REFERENCES players(id) ON DELETE CASCADE,
    game_id INT REFERENCES games(id) ON DELETE CASCADE
);

-- Création de la table waitlists
CREATE TABLE waitlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Utiliser UUID pour l'ID
    admin_id BIGINT REFERENCES players(id) ON DELETE SET NULL,
    started BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table waitlists_players
CREATE TABLE waitlists_players (
    player_id BIGINT REFERENCES players(id) ON DELETE CASCADE,
    waitlist_id UUID REFERENCES waitlists(id) ON DELETE CASCADE,
    PRIMARY KEY (player_id, waitlist_id)
);