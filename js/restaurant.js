// ========================================
// Restaurant Manager - Restaurant Discovery System
// ========================================

class RestaurantManager {
    constructor() {
        this.restaurants = [];
        this.discoveredRestaurants = new Set();
    }

    async init() {
        await this.loadRestaurantData();
        this.loadDiscoveredRestaurants();
        console.log('✅ 맛집 시스템 초기화 완료');
    }

    async loadRestaurantData() {
        try {
            const response = await fetch('data/RestaurantData.csv');
            const text = await response.text();
            const lines = text.trim().split('\n');

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts.length < 10) continue;

                this.restaurants.push({
                    id: parts[0],
                    name: parts[1],
                    dongId: parts[2],
                    category: parts[3],
                    description: parts[4],
                    address: parts[5],
                    rating: parseFloat(parts[6]) || 0,
                    priceRange: parts[7] || '',
                    specialty: parts[8] || '',
                    isDiscovered: parts[9] === 'TRUE'
                });
            }
            console.log(`🍽️ ${this.restaurants.length}개 맛집 로드`);
        } catch (error) {
            console.error('❌ RestaurantData 로드 실패:', error);
        }
    }

    loadDiscoveredRestaurants() {
        const saved = localStorage.getItem('discoveredRestaurants');
        if (saved) {
            try {
                this.discoveredRestaurants = new Set(JSON.parse(saved));
            } catch (e) {
                console.error('발견한 맛집 로드 실패:', e);
            }
        }
    }

    saveDiscoveredRestaurants() {
        localStorage.setItem('discoveredRestaurants',
            JSON.stringify([...this.discoveredRestaurants]));
    }

    // 스테이지 클리어 시 맛집 발견
    discoverRestaurant(restaurantId) {
        if (!restaurantId || this.discoveredRestaurants.has(restaurantId)) return;

        this.discoveredRestaurants.add(restaurantId);
        this.saveDiscoveredRestaurants();

        const restaurant = this.restaurants.find(r => r.id === restaurantId);
        if (restaurant) {
            this.showDiscoveryNotification(restaurant);
        }
    }

    showDiscoveryNotification(restaurant) {
        if (window.Game && window.Game.showNotification) {
            window.Game.showNotification(
                '🍽️ 새 맛집 발견!',
                `${restaurant.name}\n${restaurant.specialty}`,
                5000
            );
        }
    }

    // 동별 맛집 목록
    getRestaurantsByDong(dongId) {
        return this.restaurants.filter(r => r.dongId === dongId);
    }

    // 발견된 맛집 목록
    getDiscoveredRestaurants() {
        return this.restaurants.filter(r =>
            this.discoveredRestaurants.has(r.id)
        );
    }

    // 카테고리별 맛집
    getRestaurantsByCategory(category) {
        return this.getDiscoveredRestaurants().filter(r =>
            r.category === category
        );
    }

    // 맛집 발견 여부
    isDiscovered(restaurantId) {
        return this.discoveredRestaurants.has(restaurantId);
    }

    // 진행률
    getDiscoveryProgress() {
        return {
            total: this.restaurants.length,
            discovered: this.discoveredRestaurants.size,
            percentage: Math.floor((this.discoveredRestaurants.size / this.restaurants.length) * 100)
        };
    }

    // 카테고리 목록
    getCategories() {
        const categories = new Set(this.restaurants.map(r => r.category));
        return [...categories];
    }
}

// 전역 인스턴스
const RestaurantSystem = new RestaurantManager();
