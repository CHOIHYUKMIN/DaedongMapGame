/**
 * 맛집 지도 표시 모듈
 * Leaflet.js 기반으로 맛집 마커를 지도에 표시
 */

const RestaurantMap = {
    // 맛집 마커 저장
    markers: [],
    markerLayer: null,

    /**
     * 맛집 마커를 지도에 표시
     * @param {L.Map} map - Leaflet 지도 객체
     * @param {number} levelId - 레벨 ID
     */
    showRestaurantsForLevel(map, levelId) {
        // 기존 마커 제거
        this.clearMarkers();

        // 레벨에 해당하는 맛집 풀 가져오기
        const restaurantPool = GameData.restaurantPools[levelId];
        if (!restaurantPool || !restaurantPool.restaurants) {
            console.log(`📍 레벨 ${levelId}에 맛집 데이터 없음`);
            return;
        }

        // 마커 레이어 생성
        this.markerLayer = L.layerGroup().addTo(map);

        // 맛집 마커 추가
        restaurantPool.restaurants.forEach(restaurant => {
            const marker = this.createRestaurantMarker(restaurant);
            if (marker) {
                marker.addTo(this.markerLayer);
                this.markers.push(marker);
            }
        });

        console.log(`🍽️ ${restaurantPool.name}에 ${this.markers.length}개 맛집 마커 표시`);
    },

    /**
     * 맛집 마커 생성
     * @param {Object} restaurant - 맛집 데이터
     * @returns {L.Marker|null}
     */
    createRestaurantMarker(restaurant) {
        // 좌표 확인
        let lat = restaurant.lat;
        let lng = restaurant.lng;

        // 좌표가 없으면 주소 기반으로 추정
        if (!lat || !lng) {
            const coords = this.estimateCoordinates(restaurant.address);
            if (coords) {
                lat = coords.lat;
                lng = coords.lng;
            } else {
                console.warn(`⚠️ ${restaurant.name}: 좌표 없음, 마커 생성 불가`);
                return null;
            }
        }

        // 희귀도별 아이콘 색상
        const rarityColors = {
            'SP': '#FFD700',     // 금색 (스페셜)
            'Legendary': '#FF4500', // 주황색 (레전더리)
            'A': '#9370DB',      // 보라색
            'B': '#4169E1',      // 파란색
            'C': '#32CD32'       // 초록색
        };

        const color = rarityColors[restaurant.rarity] || '#4169E1';

        // 커스텀 마커 아이콘
        const icon = L.divIcon({
            html: `
                <div class="restaurant-marker" style="
                    background: ${color};
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    cursor: pointer;
                ">🍽️</div>
            `,
            className: 'restaurant-marker-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            popupAnchor: [0, -20]
        });

        const marker = L.marker([lat, lng], { icon });

        // 팝업 내용
        const popupContent = this.createPopupContent(restaurant);
        marker.bindPopup(popupContent, {
            maxWidth: 280,
            className: 'restaurant-popup'
        });

        return marker;
    },

    /**
     * 팝업 내용 생성
     * @param {Object} restaurant - 맛집 데이터
     * @returns {string}
     */
    createPopupContent(restaurant) {
        const rarityBadge = {
            'SP': '🌟 스페셜',
            'Legendary': '👑 레전더리',
            'A': '💎 A등급',
            'B': '✨ B등급',
            'C': '⭐ C등급'
        };

        const badge = rarityBadge[restaurant.rarity] || '';

        return `
            <div class="restaurant-popup-content" style="
                font-family: 'Pretendard', sans-serif;
                padding: 10px;
            ">
                <div style="
                    font-size: 11px;
                    color: #888;
                    margin-bottom: 4px;
                ">${badge}</div>
                <div style="
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 6px;
                ">${restaurant.restaurant}</div>
                <div style="
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 4px;
                ">🍴 ${restaurant.name}</div>
                <div style="
                    font-size: 12px;
                    color: #888;
                    margin-bottom: 4px;
                ">📍 ${restaurant.address}</div>
                <div style="
                    font-size: 12px;
                    color: #888;
                    margin-bottom: 8px;
                ">📞 ${restaurant.phone || '전화번호 없음'}</div>
                <div style="
                    font-size: 11px;
                    color: #666;
                    font-style: italic;
                    margin-bottom: 10px;
                ">${restaurant.description || ''}</div>
                <div style="display: flex; gap: 6px;">
                    ${restaurant.naverPlaceId ?
                `<a href="https://place.naver.com/${restaurant.naverPlaceId}" 
                            target="_blank" 
                            style="
                                flex: 1;
                                background: #03C75A;
                                color: white;
                                text-decoration: none;
                                padding: 6px 8px;
                                border-radius: 4px;
                                font-size: 11px;
                                text-align: center;
                            ">네이버</a>` : ''
            }
                    ${restaurant.kakaoPlaceId ?
                `<a href="https://place.map.kakao.com/${restaurant.kakaoPlaceId}" 
                            target="_blank" 
                            style="
                                flex: 1;
                                background: #FEE500;
                                color: #333;
                                text-decoration: none;
                                padding: 6px 8px;
                                border-radius: 4px;
                                font-size: 11px;
                                text-align: center;
                            ">카카오맵</a>` : ''
            }
                </div>
            </div>
        `;
    },

    /**
     * 주소 기반 좌표 추정 (서울 주요 지역 기준)
     * @param {string} address - 주소
     * @returns {Object|null} {lat, lng}
     */
    estimateCoordinates(address) {
        if (!address) return null;

        // 주요 지역별 중심 좌표
        const areaCoords = {
            // 서울 구
            '강남구': { lat: 37.5172, lng: 127.0473 },
            '강동구': { lat: 37.5301, lng: 127.1237 },
            '강북구': { lat: 37.6397, lng: 127.0256 },
            '강서구': { lat: 37.5509, lng: 126.8495 },
            '관악구': { lat: 37.4784, lng: 126.9516 },
            '광진구': { lat: 37.5384, lng: 127.0823 },
            '구로구': { lat: 37.4954, lng: 126.8874 },
            '금천구': { lat: 37.4600, lng: 126.9003 },
            '노원구': { lat: 37.6542, lng: 127.0568 },
            '도봉구': { lat: 37.6688, lng: 127.0471 },
            '동대문구': { lat: 37.5744, lng: 127.0396 },
            '동작구': { lat: 37.5124, lng: 126.9393 },
            '마포구': { lat: 37.5663, lng: 126.9014 },
            '서대문구': { lat: 37.5791, lng: 126.9368 },
            '서초구': { lat: 37.4837, lng: 127.0324 },
            '성동구': { lat: 37.5633, lng: 127.0371 },
            '성북구': { lat: 37.5894, lng: 127.0167 },
            '송파구': { lat: 37.5145, lng: 127.1066 },
            '양천구': { lat: 37.5169, lng: 126.8665 },
            '영등포구': { lat: 37.5264, lng: 126.8963 },
            '용산구': { lat: 37.5326, lng: 126.9909 },
            '은평구': { lat: 37.6027, lng: 126.9291 },
            '종로구': { lat: 37.5735, lng: 126.9790 },
            '중구': { lat: 37.5641, lng: 126.9979 },
            '중랑구': { lat: 37.6066, lng: 127.0927 },
            // 주요 동네
            '명동': { lat: 37.5636, lng: 126.9869 },
            '소공동': { lat: 37.5650, lng: 126.9810 },
            '을지로': { lat: 37.5660, lng: 127.0000 },
            '장충동': { lat: 37.5580, lng: 127.0100 },
            '인사동': { lat: 37.5730, lng: 126.9850 },
            '광장시장': { lat: 37.5700, lng: 126.9990 },
            '삼청동': { lat: 37.5820, lng: 126.9820 },
            '평창동': { lat: 37.6100, lng: 126.9750 },
            '남산': { lat: 37.5512, lng: 126.9882 },
            '해운대': { lat: 35.1631, lng: 129.1635 },
            '광안리': { lat: 35.1530, lng: 129.1188 },
            '자갈치': { lat: 35.0969, lng: 129.0305 }
        };

        // 주소에서 지역명 찾기
        for (const [area, coords] of Object.entries(areaCoords)) {
            if (address.includes(area)) {
                // 약간의 랜덤 오프셋 추가 (동일 지역 맛집들이 겹치지 않게)
                return {
                    lat: coords.lat + (Math.random() - 0.5) * 0.005,
                    lng: coords.lng + (Math.random() - 0.5) * 0.005
                };
            }
        }

        return null;
    },

    /**
     * 모든 마커 제거
     */
    clearMarkers() {
        if (this.markerLayer) {
            this.markerLayer.clearLayers();
        }
        this.markers = [];
    },

    /**
     * 특정 맛집으로 지도 이동
     * @param {L.Map} map - Leaflet 지도 객체
     * @param {Object} restaurant - 맛집 데이터
     */
    focusRestaurant(map, restaurant) {
        if (restaurant.lat && restaurant.lng) {
            map.flyTo([restaurant.lat, restaurant.lng], 17, {
                duration: 1
            });
        }
    },

    /**
     * 레스토랑 목록 표시 토글
     */
    toggleRestaurantList(levelId) {
        const restaurantPool = GameData.restaurantPools[levelId];
        if (!restaurantPool) return;

        // 맛집 목록 모달 표시
        const listHtml = restaurantPool.restaurants.map(r => `
            <div class="restaurant-list-item" style="
                padding: 12px;
                border-bottom: 1px solid #eee;
                cursor: pointer;
            " onclick="RestaurantMap.focusOnMap('${r.itemId}')">
                <div style="font-weight: bold;">${r.restaurant}</div>
                <div style="font-size: 12px; color: #666;">${r.name}</div>
                <div style="font-size: 11px; color: #888;">${r.address}</div>
            </div>
        `).join('');

        alert(`📍 ${restaurantPool.name} 맛집 목록\n\n` +
            restaurantPool.restaurants.map(r => `• ${r.restaurant} - ${r.name}`).join('\n'));
    }
};

// 전역으로 내보내기
if (typeof window !== 'undefined') {
    window.RestaurantMap = RestaurantMap;
}
