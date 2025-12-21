// 맛집 상세 정보 팝업 관리

const RestaurantDetail = {
    // 맛집 상세 정보 표시
    show(itemId) {
        // restaurantPools에서 해당 아이템 찾기
        let restaurantData = null;

        for (const levelId in GameData.restaurantPools) {
            const pool = GameData.restaurantPools[levelId];
            const found = pool.restaurants.find(r => r.itemId === itemId);
            if (found) {
                restaurantData = found;
                break;
            }
        }

        if (!restaurantData) {
            console.warn(`Restaurant data not found for itemId: ${itemId}`);
            return;
        }

        // 팝업 내용 생성
        const popup = document.getElementById('restaurant-detail-popup');
        const content = document.getElementById('restaurant-detail-content');

        content.innerHTML = `
            <button class="close-btn" onclick="RestaurantDetail.close()">✕</button>
            
            <h2>🍜 ${restaurantData.name}</h2>
            <p class="restaurant-name">📍 ${restaurantData.restaurant}</p>
            
            ${restaurantData.address ? `
            <div class="restaurant-info">
                <div class="info-row">
                    <span class="label">주소</span>
                    <span class="value">${restaurantData.address}</span>
                </div>
                ${restaurantData.phone ? `
                <div class="info-row">
                    <span class="label">전화</span>
                    <a href="tel:${restaurantData.phone}" class="value phone-link">${restaurantData.phone}</a>
                </div>
                ` : ''}
                ${restaurantData.category ? `
                <div class="info-row">
                    <span class="label">카테고리</span>
                    <span class="value">${restaurantData.category}</span>
                </div>
                ` : ''}
            </div>
            ` : ''}
            
            ${restaurantData.description ? `
            <p class="description">${restaurantData.description}</p>
            ` : ''}
            
            ${(restaurantData.naverPlaceId || restaurantData.kakaoPlaceId) ? `
            <div class="external-links">
                ${restaurantData.naverPlaceId ? `
                <a href="https://pcmap.place.naver.com/restaurant/${restaurantData.naverPlaceId}/home" 
                   target="_blank" class="btn btn-naver">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2303C75A'%3E%3Cpath d='M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845Z'/%3E%3C/svg%3E" 
                         alt="Naver" style="width: 16px; height: 16px; margin-right: 4px; vertical-align: middle;">
                    네이버 플레이스 🔗
                </a>
                ` : ''}
                ${restaurantData.kakaoPlaceId ? `
                <a href="https://place.map.kakao.com/${restaurantData.kakaoPlaceId}" 
                   target="_blank" class="btn btn-kakao">
                    <span style="font-weight: bold; color: #3C1E1E;">Kakao</span> 카카오맵 🔗
                </a>
                ` : ''}
            </div>
            ` : ''}
        `;

        popup.style.display = 'flex';
    },

    // 팝업 닫기
    close() {
        const popup = document.getElementById('restaurant-detail-popup');
        popup.style.display = 'none';
    }
};
