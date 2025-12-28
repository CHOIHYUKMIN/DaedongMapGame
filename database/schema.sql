-- 대동맛집지도 데이터베이스 스키마
-- Neon PostgreSQL

-- 시도 (17개)
CREATE TABLE IF NOT EXISTS regions (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  name_en VARCHAR(50),
  type VARCHAR(20), -- 특별시, 광역시, 도, 특별자치시, 특별자치도
  center_lat DECIMAL(10, 6),
  center_lng DECIMAL(10, 6),
  zoom INT DEFAULT 10,
  color VARCHAR(10),
  icon VARCHAR(10),
  level_offset INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 시/군/구 (228개)
CREATE TABLE IF NOT EXISTS cities (
  id VARCHAR(50) PRIMARY KEY,
  region_id VARCHAR(20) REFERENCES regions(id),
  name VARCHAR(50) NOT NULL,
  name_en VARCHAR(50),
  center_lat DECIMAL(10, 6),
  center_lng DECIMAL(10, 6),
  zoom INT DEFAULT 12,
  color VARCHAR(10),
  icon VARCHAR(10),
  description TEXT,
  dong_count INT DEFAULT 0,
  unlock_condition VARCHAR(50) DEFAULT 'NONE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 동/읍/면 (160개+)
CREATE TABLE IF NOT EXISTS districts (
  id VARCHAR(80) PRIMARY KEY,
  city_id VARCHAR(50) REFERENCES cities(id),
  region_id VARCHAR(20) REFERENCES regions(id),
  name VARCHAR(50) NOT NULL,
  center_lat DECIMAL(10, 6),
  center_lng DECIMAL(10, 6),
  zoom INT DEFAULT 15,
  color VARCHAR(10),
  icon VARCHAR(10),
  description TEXT,
  level_count INT DEFAULT 1,
  specialties JSONB,
  unlock_condition VARCHAR(80) DEFAULT 'NONE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 맛집 (111개+)
CREATE TABLE IF NOT EXISTS restaurants (
  id VARCHAR(80) PRIMARY KEY,
  region_id VARCHAR(20) REFERENCES regions(id),
  city_id VARCHAR(50),
  district_id VARCHAR(80),
  name VARCHAR(100) NOT NULL,
  address TEXT,
  description TEXT,
  category VARCHAR(30),
  specialties JSONB,
  rating DECIMAL(2, 1),
  image_url TEXT,
  rarity VARCHAR(5) DEFAULT 'C', -- C, B, A, S
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 레벨
CREATE TABLE IF NOT EXISTS levels (
  id INT PRIMARY KEY,
  region_id VARCHAR(20),
  district_id VARCHAR(80),
  name VARCHAR(100) NOT NULL,
  target_score INT DEFAULT 1000,
  max_moves INT DEFAULT 20,
  reward_item_id VARCHAR(50),
  unlock_condition VARCHAR(50) DEFAULT 'NONE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 아이템
CREATE TABLE IF NOT EXISTS items (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  rarity VARCHAR(5) DEFAULT 'C',
  effect_type VARCHAR(20),
  effect_value INT DEFAULT 0,
  icon VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 유저 (신규)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  character_id VARCHAR(20),
  gold INT DEFAULT 0,
  mp INT DEFAULT 0,
  hearts INT DEFAULT 5,
  cleared_levels JSONB DEFAULT '[]',
  completed_gus JSONB DEFAULT '[]', 
  completed_dongs JSONB DEFAULT '[]',
  inventory JSONB DEFAULT '[]',
  boosters JSONB DEFAULT '{"HAMMER":0,"BOMB":0,"RAINBOW":0}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_cities_region ON cities(region_id);
CREATE INDEX IF NOT EXISTS idx_districts_city ON districts(city_id);
CREATE INDEX IF NOT EXISTS idx_districts_region ON districts(region_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_region ON restaurants(region_id);
CREATE INDEX IF NOT EXISTS idx_levels_region ON levels(region_id);
CREATE INDEX IF NOT EXISTS idx_users_uid ON users(uid);

-- 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
