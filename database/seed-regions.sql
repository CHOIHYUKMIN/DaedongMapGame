-- 17개 시도 데이터
INSERT INTO regions (id, name, name_en, type, center_lat, center_lng, zoom, color, icon, level_offset) VALUES
('seoul', '서울특별시', 'Seoul', '특별시', 37.5665, 126.9780, 11, '#FF6B9D', '🏛️', 0),
('busan', '부산광역시', 'Busan', '광역시', 35.1796, 129.0756, 11, '#4ECDC4', '🌊', 10),
('daegu', '대구광역시', 'Daegu', '광역시', 35.8714, 128.6014, 11, '#FF9800', '🍎', 26),
('incheon', '인천광역시', 'Incheon', '광역시', 37.4563, 126.7052, 11, '#2196F3', '✈️', 33),
('gwangju', '광주광역시', 'Gwangju', '광역시', 35.1595, 126.8526, 11, '#9C27B0', '🎨', 40),
('daejeon', '대전광역시', 'Daejeon', '광역시', 36.3504, 127.3845, 11, '#4CAF50', '🔬', 46),
('ulsan', '울산광역시', 'Ulsan', '광역시', 35.5384, 129.3114, 11, '#607D8B', '🏭', 52),
('sejong', '세종특별자치시', 'Sejong', '특별자치시', 36.4800, 127.2890, 11, '#00BCD4', '🏛️', 57),
('gyeonggi', '경기도', 'Gyeonggi', '도', 37.4138, 127.5183, 9, '#8BC34A', '🏙️', 62),
('gangwon', '강원특별자치도', 'Gangwon', '특별자치도', 37.8228, 128.1555, 9, '#03A9F4', '🏔️', 74),
('chungbuk', '충청북도', 'Chungbuk', '도', 36.6357, 127.4914, 9, '#FFEB3B', '🌾', 80),
('chungnam', '충청남도', 'Chungnam', '도', 36.6588, 126.6728, 9, '#FFC107', '🦪', 87),
('jeonbuk', '전북특별자치도', 'Jeonbuk', '특별자치도', 35.8203, 127.1080, 9, '#E91E63', '🍚', 94),
('jeonnam', '전라남도', 'Jeonnam', '도', 34.8161, 126.4629, 9, '#673AB7', '🐙', 101),
('gyeongbuk', '경상북도', 'Gyeongbuk', '도', 36.4919, 128.8889, 9, '#3F51B5', '🏛️', 109),
('gyeongnam', '경상남도', 'Gyeongnam', '도', 35.4606, 128.2132, 9, '#009688', '🌸', 118),
('jeju', '제주특별자치도', 'Jeju', '특별자치도', 33.4996, 126.5312, 10, '#FF5722', '🍊', 127)
ON CONFLICT (id) DO NOTHING;

-- 서울 25개 구
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('seoul_junggu', 'seoul', '중구', 37.5640, 126.9975, 13, '#FF6B6B', '🏛️', '명동, 을지로, 남산', 8, 'NONE'),
('seoul_jongno', 'seoul', '종로구', 37.5730, 126.9794, 13, '#4ECDC4', '🏯', '광화문, 인사동, 북촌', 7, 'COMPLETE_seoul_junggu'),
('seoul_gangnam', 'seoul', '강남구', 37.5172, 127.0473, 12, '#45B7D1', '💎', '압구정, 청담, 역삼', 12, 'COMPLETE_seoul_jongno'),
('seoul_mapo', 'seoul', '마포구', 37.5638, 126.9084, 13, '#96CEB4', '🎸', '홍대, 합정, 연남', 8, 'COMPLETE_seoul_gangnam'),
('seoul_yongsan', 'seoul', '용산구', 37.5324, 126.9906, 13, '#DDA0DD', '🌍', '이태원, 한남, 경리단길', 6, 'COMPLETE_seoul_mapo'),
('seoul_songpa', 'seoul', '송파구', 37.5146, 127.1050, 12, '#FF6B6B', '🏟️', '잠실, 석촌호수', 6, 'COMPLETE_seoul_yongsan'),
('seoul_seocho', 'seoul', '서초구', 37.4837, 127.0324, 12, '#F0E68C', '⚖️', '강남역, 예술의전당', 6, 'COMPLETE_seoul_songpa'),
('seoul_gangdong', 'seoul', '강동구', 37.5301, 127.1238, 12, '#87CEEB', '🌳', '천호, 암사', 5, 'COMPLETE_seoul_seocho'),
('seoul_gwanak', 'seoul', '관악구', 37.4784, 126.9516, 13, '#CD853F', '🎓', '서울대입구, 신림', 4, 'COMPLETE_seoul_gangdong'),
('seoul_dongjak', 'seoul', '동작구', 37.5124, 126.9393, 13, '#B0C4DE', '🐟', '노량진, 사당', 4, 'COMPLETE_seoul_gwanak'),
('seoul_yeongdeungpo', 'seoul', '영등포구', 37.5264, 126.8963, 12, '#FFB347', '🏢', '여의도, 당산, 문래', 5, 'COMPLETE_seoul_dongjak'),
('seoul_seodaemun', 'seoul', '서대문구', 37.5791, 126.9368, 13, '#98D8C8', '🎓', '신촌, 연희동', 5, 'COMPLETE_seoul_yeongdeungpo'),
('seoul_seongdong', 'seoul', '성동구', 37.5633, 127.0371, 13, '#FFD700', '🏭', '성수, 뚝섬', 5, 'COMPLETE_seoul_seodaemun'),
('seoul_nowon', 'seoul', '노원구', 37.6542, 127.0568, 12, '#90EE90', '📚', '상계, 월계', 4, 'COMPLETE_seoul_seongdong'),
('seoul_gangbuk', 'seoul', '강북구', 37.6396, 127.0255, 13, '#DEB887', '🏔️', '수유, 미아', 3, 'COMPLETE_seoul_nowon'),
('seoul_gwangjin', 'seoul', '광진구', 37.5385, 127.0823, 13, '#ADD8E6', '🎡', '건대입구, 자양', 5, 'COMPLETE_seoul_gangbuk'),
('seoul_dongdaemun', 'seoul', '동대문구', 37.5744, 127.0396, 13, '#F5DEB3', '👗', '청량리, 회기', 4, 'COMPLETE_seoul_gwangjin'),
('seoul_seongbuk', 'seoul', '성북구', 37.5894, 127.0167, 13, '#E6E6FA', '📖', '성신여대, 정릉', 5, 'COMPLETE_seoul_dongdaemun'),
('seoul_jungnang', 'seoul', '중랑구', 37.6066, 127.0927, 13, '#FFF0F5', '🌺', '상봉, 면목', 4, 'COMPLETE_seoul_seongbuk'),
('seoul_dobong', 'seoul', '도봉구', 37.6688, 127.0471, 13, '#F0FFF0', '🌲', '도봉산, 창동', 4, 'COMPLETE_seoul_jungnang'),
('seoul_eunpyeong', 'seoul', '은평구', 37.6177, 126.9227, 12, '#FFF5EE', '🏡', '연신내, 은평뉴타운', 5, 'COMPLETE_seoul_dobong'),
('seoul_gangseo', 'seoul', '강서구', 37.5509, 126.8495, 12, '#F5F5DC', '✈️', '마곡, 김포공항', 5, 'COMPLETE_seoul_eunpyeong'),
('seoul_yangcheon', 'seoul', '양천구', 37.5170, 126.8666, 13, '#FFFACD', '🏟️', '목동', 4, 'COMPLETE_seoul_gangseo'),
('seoul_guro', 'seoul', '구로구', 37.4954, 126.8874, 13, '#E0FFFF', '💻', '구로디지털단지', 5, 'COMPLETE_seoul_yangcheon'),
('seoul_geumcheon', 'seoul', '금천구', 37.4519, 126.9020, 13, '#FAEBD7', '🏪', '가산디지털단지', 4, 'COMPLETE_seoul_guro')
ON CONFLICT (id) DO NOTHING;

-- 부산 16개 구/군
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('busan_junggu', 'busan', '중구', 35.1064, 129.0324, 14, '#FF6B6B', '🏛️', '자갈치, 남포동', 5, 'NONE'),
('busan_haeundae', 'busan', '해운대구', 35.1631, 129.1635, 12, '#4ECDC4', '🏖️', '해운대해수욕장', 6, 'COMPLETE_busan_junggu'),
('busan_busanjingu', 'busan', '부산진구', 35.1629, 129.0532, 13, '#45B7D1', '🛍️', '서면', 4, 'COMPLETE_busan_haeundae'),
('busan_seogu', 'busan', '서구', 35.0977, 129.0244, 13, '#96CEB4', '🎨', '감천문화마을', 3, 'COMPLETE_busan_busanjingu')
ON CONFLICT (id) DO NOTHING;

-- 인천 10개 구/군
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('incheon_junggu', 'incheon', '중구', 37.4737, 126.6215, 13, '#FF6B6B', '🏮', '차이나타운, 월미도', 8, 'NONE'),
('incheon_yeonsu', 'incheon', '연수구', 37.4101, 126.6783, 12, '#4ECDC4', '🏙️', '송도국제도시', 4, 'COMPLETE_incheon_junggu')
ON CONFLICT (id) DO NOTHING;

-- 대구
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('daegu_junggu', 'daegu', '중구', 35.8691, 128.5964, 14, '#FF6B6B', '🛍️', '동성로, 서문시장', 4, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 광주
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('gwangju_donggu', 'gwangju', '동구', 35.1488, 126.9166, 14, '#FF6B6B', '🎨', '충장로, 금남로', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 대전
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('daejeon_junggu', 'daejeon', '중구', 36.3275, 127.4273, 14, '#FF6B6B', '🍞', '성심당, 중앙시장', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 울산
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('ulsan_junggu', 'ulsan', '중구', 35.5484, 129.3145, 14, '#FF6B6B', '🥩', '성남동, 태화강', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 세종
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('sejong_hansol', 'sejong', '한솔동', 36.5002, 127.2549, 13, '#FF6B6B', '🏛️', '정부세종청사', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 경기 (주요 시)
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('gyeonggi_suwon', 'gyeonggi', '수원시', 37.2636, 127.0286, 12, '#FF6B6B', '🏯', '수원화성, 갈비', 4, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 강원 (주요 시)
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('gangwon_chuncheon', 'gangwon', '춘천시', 37.8813, 127.7298, 12, '#FF6B6B', '🍗', '닭갈비, 남이섬', 3, 'NONE'),
('gangwon_gangneung', 'gangwon', '강릉시', 37.7519, 128.8760, 12, '#4ECDC4', '☕', '커피거리, 경포대', 3, 'COMPLETE_gangwon_chuncheon')
ON CONFLICT (id) DO NOTHING;

-- 충북
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('chungbuk_cheongju', 'chungbuk', '청주시', 36.6424, 127.4890, 12, '#FF6B6B', '🍜', '성안길, 수암골', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 충남
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('chungnam_cheonan', 'chungnam', '천안시', 36.8151, 127.1139, 12, '#FF6B6B', '🥜', '호두과자, 병천순대', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 전북
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('jeonbuk_jeonju', 'jeonbuk', '전주시', 35.8242, 127.1480, 12, '#FF6B6B', '🍚', '한옥마을, 비빔밥', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 전남
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('jeonnam_mokpo', 'jeonnam', '목포시', 34.8118, 126.3922, 13, '#FF6B6B', '🐙', '세발낙지, 유달산', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 경북
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('gyeongbuk_gyeongju', 'gyeongbuk', '경주시', 35.8562, 129.2247, 12, '#FF6B6B', '🛕', '불국사, 황리단길', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 경남
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('gyeongnam_jinju', 'gyeongnam', '진주시', 35.1798, 128.1076, 13, '#FF6B6B', '🍜', '진주냉면, 진주성', 3, 'NONE')
ON CONFLICT (id) DO NOTHING;

-- 제주
INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition) VALUES
('jeju_jejusi', 'jeju', '제주시', 33.5002, 126.5312, 11, '#FF6B6B', '🍊', '동문시장, 애월', 4, 'NONE'),
('jeju_seogwipo', 'jeju', '서귀포시', 33.2542, 126.5600, 11, '#4ECDC4', '🌊', '중문, 성산일출봉', 4, 'COMPLETE_jeju_jejusi')
ON CONFLICT (id) DO NOTHING;
