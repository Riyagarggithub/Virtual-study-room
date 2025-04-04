document.addEventListener('DOMContentLoaded', () => {
    const reviewBtn = document.querySelector('.review-btn');
    const formOverlay = document.querySelector('.review-form-overlay');
    const reviewForm = document.querySelector('.review-form');
    const closeFormBtn = document.querySelector('.close-form');
    const cancelBtn = document.querySelector('.cancel-btn');
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    // Open form
    reviewBtn.addEventListener('click', () => {
        formOverlay.style.display = 'flex';
        document.body.classList.add('modal-open');
    });

    // Close form
    const closeForm = () => {
        formOverlay.style.display = 'none';
        document.body.classList.remove('modal-open');
        reviewForm.reset();
        stars.forEach(star => star.classList.remove('active'));
        selectedRating = 0;
    };

    closeFormBtn.addEventListener('click', closeForm);
    cancelBtn.addEventListener('click', closeForm);

    // Star rating system
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            stars.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-value') <= selectedRating) {
                    s.classList.add('active');
                }
            });
        });

        star.addEventListener('mouseover', () => {
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= star.getAttribute('data-value')) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-value') <= selectedRating) {
                    s.classList.add('active');
                }
            });
        });
    });

    // Form submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewer-name').value;
        const reviewText = document.getElementById('review-text').value;

        if (!selectedRating) {
            alert('Please select a rating');
            return;
        }

        // Create new review card
        const reviewsContainer = document.querySelector('.reviews-container');
        const newReview = document.createElement('div');
        newReview.className = 'review-card';
        newReview.innerHTML = `
            <div class="reviewer-info">
                <img src="https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg" 
                     alt="${name}" class="reviewer-avatar">
                <div class="reviewer-details">
                    <h4>${name}</h4>
                    <div class="rating">${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</div>
                </div>
            </div>
            <p class="review-text">"${reviewText}"</p>
        `;

        reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
        closeForm();
    });

    // Close form when clicking outside
    formOverlay.addEventListener('click', (e) => {
        if (e.target === formOverlay) {
            closeForm();
        }
    });
});