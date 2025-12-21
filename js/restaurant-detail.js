/**
 * Restaurant Detail Popup Manager
 * Enhanced to work with Restaurant Collection System
 */

const RestaurantDetail = {
    currentRestaurantId: null,

    /**
     * Show restaurant detail popup
     * @param {object|string} restaurantDataOrId - Restaurant data object or restaurant ID
     */
    show(restaurantDataOrId) {
        let restaurantData;
        let restaurantId;

        // Check if input is an object (from collection) or string (itemId)
        if (typeof restaurantDataOrId === 'object') {
            restaurantData = restaurantDataOrId;
            restaurantId = restaurantData.id || restaurantData.itemId;
        } else {
            // It's an itemId, find the restaurant data
            const itemId = restaurantDataOrId;
            restaurantId = itemId;

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
        }

        this.currentRestaurantId = restaurantId;

        // Update popup content
        this.updatePopupContent(restaurantData, restaurantId);

        // Show popup
        const popup = document.getElementById('restaurant-detail-popup');
        popup.classList.add('active');
        popup.style.display = 'flex';
    },

    /**
     * Update popup content with restaurant data
     * @param {object} data - Restaurant data
     * @param {string} restaurantId - Restaurant identifier
     */
    updatePopupContent(data, restaurantId) {
        // Update basic info
        document.getElementById('detail-rarity-badge').textContent = data.rarity || 'C';
        document.getElementById('detail-rarity-badge').className = `rarity-badge rarity-${data.rarity || 'C'}`;
        document.getElementById('detail-name').textContent = data.name || '맛집';
        document.getElementById('detail-restaurant').textContent = data.restaurant || '';

        // Update address
        const addressRow = document.getElementById('detail-address-row');
        if (data.address) {
            document.getElementById('detail-address').textContent = data.address;
            addressRow.style.display = 'flex';
        } else {
            addressRow.style.display = 'none';
        }

        // Update phone
        const phoneRow = document.getElementById('detail-phone-row');
        if (data.phone) {
            document.getElementById('detail-phone').textContent = data.phone;
            phoneRow.style.display = 'flex';
        } else {
            phoneRow.style.display = 'none';
        }

        // Update category
        const categoryRow = document.getElementById('detail-category-row');
        if (data.category) {
            document.getElementById('detail-category').textContent = data.category;
            categoryRow.style.display = 'flex';
        } else {
            categoryRow.style.display = 'none';
        }

        // Update description
        const descSection = document.getElementById('detail-description-section');
        if (data.description) {
            document.getElementById('detail-description').textContent = data.description;
            descSection.style.display = 'block';
        } else {
            descSection.style.display = 'none';
        }

        // Update external links
        const linksContainer = document.getElementById('detail-links');
        linksContainer.innerHTML = '';

        if (data.naverPlaceId) {
            const naverBtn = document.createElement('button');
            naverBtn.className = 'external-link-btn naver';
            naverBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> 네이버 플레이스';
            naverBtn.onclick = () => window.open(`https://m.place.naver.com/restaurant/${data.naverPlaceId}`, '_blank');
            linksContainer.appendChild(naverBtn);
        }

        if (data.kakaoPlaceId) {
            const kakaoBtn = document.createElement('button');
            kakaoBtn.className = 'external-link-btn kakao';
            kakaoBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> 카카오맵';
            kakaoBtn.onclick = () => window.open(`https://place.map.kakao.com/${data.kakaoPlaceId}`, '_blank');
            linksContainer.appendChild(kakaoBtn);
        }

        // Update collection info if restaurant is in collection
        this.updateCollectionInfo(restaurantId);
    },

    /**
     * Update collection-specific information
     * @param {string} restaurantId - Restaurant identifier
     */
    updateCollectionInfo(restaurantId) {
        const collectionInfo = document.getElementById('detail-collection-info');

        if (!window.RestaurantCollection) {
            collectionInfo.style.display = 'none';
            return;
        }

        const collectionData = RestaurantCollection.collection[restaurantId];

        if (!collectionData) {
            collectionInfo.style.display = 'none';
            return;
        }

        // Show collection info section
        collectionInfo.style.display = 'block';

        // Update star rating
        const starContainer = document.getElementById('detail-star-rating');
        starContainer.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.className = `fas fa-star ${i <= collectionData.rating ? 'active' : ''}`;
            star.dataset.rating = i;
            star.onclick = () => {
                RestaurantCollection.setRating(restaurantId, i);
                this.updateCollectionInfo(restaurantId);
            };
            starContainer.appendChild(star);
        }

        // Update visited checkbox
        const visitedCheckbox = document.getElementById('detail-visited-checkbox');
        visitedCheckbox.checked = collectionData.visited;
        visitedCheckbox.onchange = () => {
            RestaurantCollection.toggleVisited(restaurantId);
            this.updateCollectionInfo(restaurantId);
        };

        // Update visit count
        document.getElementById('detail-visit-count').textContent = collectionData.visitCount || 0;

        // Add visit button
        const addVisitBtn = document.getElementById('detail-add-visit-btn');
        addVisitBtn.onclick = () => {
            RestaurantCollection.incrementVisitCount(restaurantId);
            this.updateCollectionInfo(restaurantId);
        };

        // Update notes
        const notesTextarea = document.getElementById('detail-notes');
        notesTextarea.value = collectionData.notes || '';

        // Save notes button
        const saveNotesBtn = document.getElementById('detail-save-notes-btn');
        saveNotesBtn.onclick = () => {
            RestaurantCollection.setNotes(restaurantId, notesTextarea.value);
            this.showNotification('메모가 저장되었습니다!');
        };
    },

    /**
     * Hide the popup
     */
    hide() {
        const popup = document.getElementById('restaurant-detail-popup');
        popup.classList.remove('active');
        popup.style.display = 'none';
        this.currentRestaurantId = null;
    },

    /**
     * Show a brief notification
     * @param {string} message - Notification message
     */
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4caf50;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            font-size: 14px;
            font-weight: 600;
            animation: slideDown 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
};

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
