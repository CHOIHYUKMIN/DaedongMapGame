/**
 * Restaurant Collection System (맛집 도감)
 * Manages user's personal restaurant collection with ratings, visits, and notes
 */

const RestaurantCollection = {
    // Collection data structure: { restaurantId: { rating, visited, visitCount, notes, dateAdded, lastVisit } }
    collection: {},

    /**
     * Initialize the collection system
     */
    init() {
        this.loadCollection();
        this.setupEventListeners();
    },

    /**
     * Load collection data from localStorage or Firebase
     */
    loadCollection() {
        try {
            const saved = localStorage.getItem('restaurantCollection');
            if (saved) {
                this.collection = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load restaurant collection:', error);
            this.collection = {};
        }
    },

    /**
     * Save collection data to localStorage and Firebase
     */
    saveCollection() {
        try {
            localStorage.setItem('restaurantCollection', JSON.stringify(this.collection));

            // If Firebase is available and user is logged in, sync to Firestore
            if (window.FirebaseManager && FirebaseManager.currentUser) {
                FirebaseManager.saveUserData();
            }
        } catch (error) {
            console.error('Failed to save restaurant collection:', error);
        }
    },

    /**
     * Add a restaurant to the collection (called when level is cleared)
     * @param {string} restaurantId - Unique restaurant identifier
     * @param {object} restaurantData - Restaurant data from restaurantPools
     */
    addRestaurant(restaurantId, restaurantData) {
        if (!this.collection[restaurantId]) {
            this.collection[restaurantId] = {
                itemId: restaurantData.itemId,
                name: restaurantData.name,
                restaurant: restaurantData.restaurant,
                rarity: restaurantData.rarity,
                address: restaurantData.address || '',
                phone: restaurantData.phone || '',
                category: restaurantData.category || '',
                description: restaurantData.description || '',
                naverPlaceId: restaurantData.naverPlaceId || '',
                kakaoPlaceId: restaurantData.kakaoPlaceId || '',
                rating: 0,
                visited: false,
                visitCount: 0,
                notes: '',
                dateAdded: new Date().toISOString(),
                lastVisit: null,
                favorite: false
            };
            this.saveCollection();
            return true;
        }
        return false;
    },

    /**
     * Update restaurant rating
     * @param {string} restaurantId - Restaurant identifier
     * @param {number} rating - Rating value (0-5)
     */
    setRating(restaurantId, rating) {
        if (this.collection[restaurantId]) {
            this.collection[restaurantId].rating = Math.max(0, Math.min(5, rating));
            this.saveCollection();
            this.refreshCollectionUI();
        }
    },

    /**
     * Toggle visited status
     * @param {string} restaurantId - Restaurant identifier
     */
    toggleVisited(restaurantId) {
        if (this.collection[restaurantId]) {
            const entry = this.collection[restaurantId];
            entry.visited = !entry.visited;

            if (entry.visited) {
                entry.visitCount++;
                entry.lastVisit = new Date().toISOString();
            }

            this.saveCollection();
            this.refreshCollectionUI();
        }
    },

    /**
     * Increment visit count
     * @param {string} restaurantId - Restaurant identifier
     */
    incrementVisitCount(restaurantId) {
        if (this.collection[restaurantId]) {
            const entry = this.collection[restaurantId];
            entry.visitCount++;
            entry.visited = true;
            entry.lastVisit = new Date().toISOString();
            this.saveCollection();
            this.refreshCollectionUI();
        }
    },

    /**
     * Update restaurant notes
     * @param {string} restaurantId - Restaurant identifier
     * @param {string} notes - User notes
     */
    setNotes(restaurantId, notes) {
        if (this.collection[restaurantId]) {
            this.collection[restaurantId].notes = notes;
            this.saveCollection();
        }
    },

    /**
     * Toggle favorite status
     * @param {string} restaurantId - Restaurant identifier
     */
    toggleFavorite(restaurantId) {
        if (this.collection[restaurantId]) {
            this.collection[restaurantId].favorite = !this.collection[restaurantId].favorite;
            this.saveCollection();
            this.refreshCollectionUI();
        }
    },

    /**
     * Get all restaurants in collection
     * @returns {Array} Array of restaurant entries
     */
    getAllRestaurants() {
        return Object.entries(this.collection).map(([id, data]) => ({
            id,
            ...data
        }));
    },

    /**
     * Get filtered and sorted restaurants
     * @param {object} filters - Filter options
     * @param {string} sortBy - Sort method
     * @returns {Array} Filtered and sorted restaurants
     */
    getFilteredRestaurants(filters = {}, sortBy = 'dateAdded') {
        let restaurants = this.getAllRestaurants();

        // Apply filters
        if (filters.visited !== undefined) {
            restaurants = restaurants.filter(r => r.visited === filters.visited);
        }
        if (filters.minRating !== undefined) {
            restaurants = restaurants.filter(r => r.rating >= filters.minRating);
        }
        if (filters.rarity) {
            restaurants = restaurants.filter(r => r.rarity === filters.rarity);
        }
        if (filters.favorite) {
            restaurants = restaurants.filter(r => r.favorite === true);
        }
        if (filters.category) {
            restaurants = restaurants.filter(r => r.category === filters.category);
        }

        // Apply sorting
        switch (sortBy) {
            case 'dateAdded':
                restaurants.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'rating':
                restaurants.sort((a, b) => b.rating - a.rating);
                break;
            case 'visitCount':
                restaurants.sort((a, b) => b.visitCount - a.visitCount);
                break;
            case 'name':
                restaurants.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
                break;
            case 'lastVisit':
                restaurants.sort((a, b) => {
                    if (!a.lastVisit) return 1;
                    if (!b.lastVisit) return -1;
                    return new Date(b.lastVisit) - new Date(a.lastVisit);
                });
                break;
        }

        return restaurants;
    },

    /**
     * Get collection statistics
     * @returns {object} Statistics object
     */
    getStats() {
        const restaurants = this.getAllRestaurants();
        return {
            total: restaurants.length,
            visited: restaurants.filter(r => r.visited).length,
            notVisited: restaurants.filter(r => !r.visited).length,
            favorites: restaurants.filter(r => r.favorite).length,
            totalVisits: restaurants.reduce((sum, r) => sum + r.visitCount, 0),
            averageRating: restaurants.length > 0
                ? restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length
                : 0,
            byRarity: {
                S: restaurants.filter(r => r.rarity === 'S').length,
                A: restaurants.filter(r => r.rarity === 'A').length,
                B: restaurants.filter(r => r.rarity === 'B').length,
                C: restaurants.filter(r => r.rarity === 'C').length
            }
        };
    },

    /**
     * Setup event listeners for collection UI
     */
    setupEventListeners() {
        // Collection button in main menu
        const collectionBtn = document.getElementById('collection-btn');
        if (collectionBtn) {
            collectionBtn.addEventListener('click', () => this.showCollectionScreen());
        }

        // Close button
        const closeBtn = document.getElementById('collection-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideCollectionScreen());
        }

        // Filter and sort change listeners
        const visitedFilters = document.querySelectorAll('input[name="visited-filter"]');
        visitedFilters.forEach(filter => {
            filter.addEventListener('change', () => this.renderCollection());
        });

        const ratingFilter = document.getElementById('rating-filter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', () => this.renderCollection());
        }

        const rarityFilter = document.getElementById('rarity-filter');
        if (rarityFilter) {
            rarityFilter.addEventListener('change', () => this.renderCollection());
        }

        const favoriteFilter = document.getElementById('favorite-filter');
        if (favoriteFilter) {
            favoriteFilter.addEventListener('change', () => this.renderCollection());
        }

        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.renderCollection());
        }
    },

    /**
     * Show the collection screen
     */
    showCollectionScreen() {
        const screen = document.getElementById('collection-screen');
        if (screen) {
            screen.classList.add('active');
            this.renderCollection();
        }
    },

    /**
     * Hide the collection screen
     */
    hideCollectionScreen() {
        const screen = document.getElementById('collection-screen');
        if (screen) {
            screen.classList.remove('active');
        }
    },

    /**
     * Render the collection UI
     */
    renderCollection() {
        const container = document.getElementById('collection-list');
        if (!container) return;

        // Get current filters and sort
        const filters = this.getCurrentFilters();
        const sortBy = this.getCurrentSort();

        const restaurants = this.getFilteredRestaurants(filters, sortBy);
        const stats = this.getStats();

        // Update stats display
        this.updateStatsDisplay(stats);

        // Clear container
        container.innerHTML = '';

        if (restaurants.length === 0) {
            container.innerHTML = '<div class="empty-message">아직 수집한 맛집이 없습니다.<br>레벨을 클리어하여 맛집을 수집하세요!</div>';
            return;
        }

        // Render each restaurant
        restaurants.forEach(restaurant => {
            const card = this.createRestaurantCard(restaurant);
            container.appendChild(card);
        });
    },

    /**
     * Create a restaurant card element
     * @param {object} restaurant - Restaurant data
     * @returns {HTMLElement} Card element
     */
    createRestaurantCard(restaurant) {
        const card = document.createElement('div');
        card.className = `collection-card rarity-${restaurant.rarity}`;
        if (restaurant.favorite) card.classList.add('favorite');

        const rarityColor = {
            'S': '#ff6b6b',
            'A': '#4ecdc4',
            'B': '#95e1d3',
            'C': '#c7c7c7'
        };

        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">
                    <span class="rarity-badge" style="background: ${rarityColor[restaurant.rarity]}">${restaurant.rarity}</span>
                    <h3>${restaurant.name}</h3>
                    <button class="favorite-btn ${restaurant.favorite ? 'active' : ''}" data-id="${restaurant.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="restaurant-name">${restaurant.restaurant}</div>
            </div>
            <div class="card-body">
                <div class="rating-display">
                    ${this.createStarRating(restaurant.id, restaurant.rating)}
                </div>
                <div class="visit-info">
                    <label class="visit-checkbox">
                        <input type="checkbox" ${restaurant.visited ? 'checked' : ''} data-id="${restaurant.id}">
                        <span>방문함 (${restaurant.visitCount}회)</span>
                    </label>
                </div>
                ${restaurant.address ? `<div class="info-row"><i class="fas fa-map-marker-alt"></i> ${restaurant.address}</div>` : ''}
                ${restaurant.category ? `<div class="info-row"><i class="fas fa-utensils"></i> ${restaurant.category}</div>` : ''}
                <div class="card-actions">
                    <button class="btn-detail" data-id="${restaurant.id}">상세보기</button>
                    ${restaurant.naverPlaceId ? `<button class="btn-external" data-type="naver" data-id="${restaurant.naverPlaceId}">네이버</button>` : ''}
                    ${restaurant.kakaoPlaceId ? `<button class="btn-external" data-type="kakao" data-id="${restaurant.kakaoPlaceId}">카카오</button>` : ''}
                </div>
            </div>
        `;

        // Add event listeners
        this.attachCardEventListeners(card, restaurant);

        return card;
    },

    /**
     * Create star rating HTML
     * @param {string} restaurantId - Restaurant identifier
     * @param {number} rating - Current rating
     * @returns {string} HTML string
     */
    createStarRating(restaurantId, rating) {
        let html = '<div class="star-rating" data-id="' + restaurantId + '">';
        for (let i = 1; i <= 5; i++) {
            html += `<i class="fas fa-star ${i <= rating ? 'active' : ''}" data-rating="${i}"></i>`;
        }
        html += '</div>';
        return html;
    },

    /**
     * Attach event listeners to card elements
     * @param {HTMLElement} card - Card element
     * @param {object} restaurant - Restaurant data
     */
    attachCardEventListeners(card, restaurant) {
        // Star rating
        const stars = card.querySelectorAll('.star-rating i');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.setRating(restaurant.id, rating);
            });
        });

        // Visited checkbox
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                this.toggleVisited(restaurant.id);
            });
        }

        // Favorite button
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => {
                this.toggleFavorite(restaurant.id);
            });
        }

        // Detail button
        const detailBtn = card.querySelector('.btn-detail');
        if (detailBtn) {
            detailBtn.addEventListener('click', () => {
                if (window.RestaurantDetail) {
                    RestaurantDetail.show(restaurant);
                }
            });
        }

        // External links
        const externalBtns = card.querySelectorAll('.btn-external');
        externalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                const id = btn.dataset.id;
                this.openExternalLink(type, id);
            });
        });
    },

    /**
     * Open external link (Naver or Kakao)
     * @param {string} type - Link type ('naver' or 'kakao')
     * @param {string} id - Place ID
     */
    openExternalLink(type, id) {
        let url = '';
        if (type === 'naver') {
            url = `https://m.place.naver.com/restaurant/${id}`;
        } else if (type === 'kakao') {
            url = `https://place.map.kakao.com/${id}`;
        }
        if (url) {
            window.open(url, '_blank');
        }
    },

    /**
     * Get current filter settings from UI
     * @returns {object} Filter object
     */
    getCurrentFilters() {
        const filters = {};

        const visitedFilter = document.querySelector('input[name="visited-filter"]:checked');
        if (visitedFilter && visitedFilter.value !== 'all') {
            filters.visited = visitedFilter.value === 'visited';
        }

        const ratingFilter = document.getElementById('rating-filter');
        if (ratingFilter && ratingFilter.value !== 'all') {
            filters.minRating = parseInt(ratingFilter.value);
        }

        const rarityFilter = document.getElementById('rarity-filter');
        if (rarityFilter && rarityFilter.value !== 'all') {
            filters.rarity = rarityFilter.value;
        }

        const favoriteFilter = document.getElementById('favorite-filter');
        if (favoriteFilter && favoriteFilter.checked) {
            filters.favorite = true;
        }

        return filters;
    },

    /**
     * Get current sort setting from UI
     * @returns {string} Sort method
     */
    getCurrentSort() {
        const sortSelect = document.getElementById('sort-select');
        return sortSelect ? sortSelect.value : 'dateAdded';
    },

    /**
     * Update statistics display
     * @param {object} stats - Statistics object
     */
    updateStatsDisplay(stats) {
        const statsContainer = document.getElementById('collection-stats');
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="stat-item">
                <div class="stat-value">${stats.total}</div>
                <div class="stat-label">총 맛집</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${stats.visited}</div>
                <div class="stat-label">방문함</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${stats.totalVisits}</div>
                <div class="stat-label">총 방문</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${stats.averageRating.toFixed(1)}</div>
                <div class="stat-label">평균 별점</div>
            </div>
        `;
    },

    /**
     * Refresh the collection UI
     */
    refreshCollectionUI() {
        const screen = document.getElementById('collection-screen');
        if (screen && screen.classList.contains('active')) {
            this.renderCollection();
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => RestaurantCollection.init());
} else {
    RestaurantCollection.init();
}
