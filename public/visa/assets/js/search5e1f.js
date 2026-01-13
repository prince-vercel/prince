// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Desktop search
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.querySelector('.search-submit');
    const searchResultsContainer = document.getElementById('search-results');
    const searchResultsContent = document.querySelector('.search-results-content');
    const searchLoading = document.querySelector('.search-loading');

    // Mobile search elements
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchSubmit = document.querySelector('.mobile-search-submit');
    const mobileSearchResults = document.getElementById('mobile-search-results');
    const mobileSearchResultsContent = document.querySelector('.mobile-search-results-content');
    const mobileSearchLoading = document.querySelector('#mobile-search-results .search-loading');

    // Search debounce timer
    let searchTimer = null;
    const DEBOUNCE_TIME = 300; // milliseconds

    if (searchToggle && searchOverlay && searchClose) {
        // Open search overlay
        searchToggle.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 100);
            // Prevent scrolling when overlay is open
            document.body.style.overflow = 'hidden';
        });

        // Close search overlay
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            // Re-enable scrolling
            document.body.style.overflow = '';
            // Clear search
            searchInput.value = '';
            searchResultsContent.innerHTML = '';
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
                // Clear search
                searchInput.value = '';
                searchResultsContent.innerHTML = '';
            }
        });

        // Close when clicking outside the search form
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
                // Clear search
                searchInput.value = '';
                searchResultsContent.innerHTML = '';
            }
        });
    }

    // Function to perform AJAX search
    function performSearch(query, isDesktop) {
        // Only search if query is at least 2 characters
        if (query.length < 2) {
            if (isDesktop) {
                searchResultsContent.innerHTML = '';
                searchResultsContainer.style.display = 'none';
            } else {
                mobileSearchResultsContent.innerHTML = '';
                mobileSearchResults.classList.remove('active');
            }
            return;
        }

        // Show loading
        if (isDesktop) {
            searchLoading.style.display = 'flex';
            searchResultsContainer.style.display = 'block';
            searchResultsContent.innerHTML = '';
        } else {
            mobileSearchLoading.style.display = 'flex';
            mobileSearchResults.classList.add('active');
            mobileSearchResultsContent.innerHTML = '';
        }

        // Make AJAX request
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => { 
                // Hide loading 
                if (isDesktop) {
                    searchLoading.style.display = 'none';
                } else {
                    mobileSearchLoading.style.display = 'none';
                }

                // Check if empty results
                if (data.empty) {
                    const noResults = `
                        <div class="search-no-results">
                            <p>Aradığınız "${query}" ile ilgili sonuç bulunamadı.</p>
                        </div>
                    `;
                    
                    if (isDesktop) {
                        searchResultsContent.innerHTML = noResults;
                    } else {
                        mobileSearchResultsContent.innerHTML = noResults;
                    }
                    return;
                }

                // Build results HTML - with specific ordering as requested by client
                let resultsHTML = '';
                
                // Order: 1. Countries (Ülkeler)
                if (data.results.countries) {
                    resultsHTML += buildResultSection(data.results.countries);
                }
                
                // Order: 2. Country-related content (Vize Bilgileri)
                if (data.results.country_content) {
                    resultsHTML += buildResultSection(data.results.country_content);
                }
                
                // Order: 3. Blog posts (Blog Yazıları)
                if (data.results.blogs) {
                    resultsHTML += buildResultSection(data.results.blogs);
                }
                
                // Order: 4. Blog categories (Blog Kategorileri)
                if (data.results.blog_categories) {
                    resultsHTML += buildResultSection(data.results.blog_categories);
                }

                // Update results container
                if (isDesktop) {
                    searchResultsContent.innerHTML = resultsHTML;
                } else {
                    mobileSearchResultsContent.innerHTML = resultsHTML;
                }
            })
            .catch(error => {
                console.error('Search error:', error);
                
                // Hide loading and show error
                const errorHTML = `
                    <div class="search-no-results">
                        <p>Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.</p>
                    </div>
                `;
                
                if (isDesktop) {
                    searchLoading.style.display = 'none';
                    searchResultsContent.innerHTML = errorHTML;
                } else {
                    mobileSearchLoading.style.display = 'none';
                    mobileSearchResultsContent.innerHTML = errorHTML;
                }
            });
    }

    // Helper function to build a result section
    function buildResultSection(section) {
        let html = `
            <div class="search-results-section">
                <h3 class="search-results-title">
                    <span class="icon">${section.icon}</span>
                    ${section.title}
                </h3>
                <div class="search-results-items">
        `;

        section.items.forEach(item => {
            html += `
                <a href="${item.url}" class="search-result-item">
                    ${item.image ? `
                        <div class="search-result-item-image">
                            <img src="${item.image}" alt="${item.title}" loading="lazy">
                        </div>
                    ` : ''}
                    <div class="search-result-item-content">
                        <h4 class="search-result-item-title">${item.title}</h4>
                        ${item.description ? `<p class="search-result-item-desc">${item.description}</p>` : ''}
                    </div>
                </a>
            `;
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    // Desktop search input event
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            // Clear previous timer
            clearTimeout(searchTimer);
            
            // Set new timer for debounce
            searchTimer = setTimeout(() => {
                performSearch(query, true);
            }, DEBOUNCE_TIME);
        });

        // Submit button click
        if (searchSubmit) {
            searchSubmit.addEventListener('click', function() {
                const query = searchInput.value.trim();
                performSearch(query, true);
            });
        }
    }

    // Mobile search input event
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            // Clear previous timer
            clearTimeout(searchTimer);
            
            // Set new timer for debounce
            searchTimer = setTimeout(() => {
                performSearch(query, false);
            }, DEBOUNCE_TIME);
        });

        // Submit button click
        if (mobileSearchSubmit) {
            mobileSearchSubmit.addEventListener('click', function() {
                const query = mobileSearchInput.value.trim();
                performSearch(query, false);
            });
        }
    }
});
