/**
 * SHALU WELLNESS MART - APPLICATION LOGIC & DATA LAYER
 * All pages interact with data ONLY via getProducts(), getProductBySlug(), and getCategories().
 * In Phase 2, these functions interface with Supabase without changing page code.
 */

// Data layer functions
async function getProducts(options = {}) {
  // Simulate async call so Phase 2 Supabase migration requires zero signature change
  const data = (typeof window !== 'undefined' && window.PRODUCTS_DATA) ? window.PRODUCTS_DATA : [];
  let results = data.filter(p => p.active !== false);

  // Category filter
  if (options.category && options.category !== 'all') {
    results = results.filter(p => p.category === options.category);
  }

  // Search query filter (searches name, brand, description, shortDescription)
  if (options.search && options.search.trim() !== '') {
    const q = options.search.toLowerCase().trim();
    results = results.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
    );
  }

  // Featured only
  if (options.featured) {
    results = results.filter(p => p.featured === true);
  }

  // Special offers only (MRP > Price)
  if (options.offersOnly) {
    results = results.filter(p => p.mrp > p.price);
  }

  // Sorting
  if (options.sort) {
    switch (options.sort) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Default order
        break;
    }
  }

  return results;
}

async function getProductBySlug(slug) {
  const data = (typeof window !== 'undefined' && window.PRODUCTS_DATA) ? window.PRODUCTS_DATA : [];
  return data.find(p => p.slug === slug && p.active !== false) || null;
}

async function getCategories() {
  if (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.categories) {
    return window.CONFIG.categories;
  }
  return [];
}

// Calculate discount percentage safely
function calculateDiscount(mrp, price) {
  if (!mrp || !price || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

// Helper: Format Stock badge and status
function getStockInfo(stock) {
  if (stock <= 0) {
    return {
      statusText: 'Out of stock',
      className: 'badge-out-of-stock',
      canBuy: false
    };
  } else if (stock <= 5) {
    return {
      statusText: `Only ${stock} left`,
      className: 'badge-low-stock',
      canBuy: true
    };
  } else {
    return {
      statusText: 'In stock',
      className: 'badge-in-stock',
      canBuy: true
    };
  }
}

// Product Card HTML generator adhering to QA Addendum:
// 1. Buttons aligned at the bottom of cards of equal height
// 2. Clear Demo tag
// 3. Discount shown only when MRP > price
// 4. Stock status reflected, buttons disabled when out of stock
// 5. <img> tag present for owner image replacement as requested
function renderProductCard(product) {
  const discount = calculateDiscount(product.mrp, product.price);
  const stockInfo = getStockInfo(product.stock);
  const primaryImg = (product.images && product.images[0]) || {
    src: '',
    alt: product.name,
    recommendedFilename: 'product-01.jpg',
    recommendedSize: '600x600px'
  };

  const categoryObj = (window.CONFIG && window.CONFIG.categories) ?
    window.CONFIG.categories.find(c => c.slug === product.category) : null;
  const categoryName = categoryObj ? categoryObj.name : product.category;

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card-media">
        <!-- RECOMMENDED IMAGE: ${primaryImg.recommendedFilename || 'product-image.jpg'} | Size: ${primaryImg.recommendedSize || '600x600px'} -->
        <a href="product.html?slug=${encodeURIComponent(product.slug)}" class="product-img-link" tabindex="-1" aria-hidden="true">
          <img
            src="${primaryImg.src}"
            alt="${primaryImg.alt || product.name}"
            class="product-card-img"
            loading="lazy"
            width="300"
            height="300"
          />
        </a>
        <div class="product-card-badges">
          ${product.isDemo ? '<span class="badge badge-demo">Demo</span>' : ''}
          ${discount > 0 ? `<span class="badge badge-discount">${discount}% OFF</span>` : ''}
        </div>
      </div>

      <div class="product-card-body">
        <div class="product-card-meta">
          <span class="product-category-tag">${categoryName}</span>
          <span class="product-stock-tag ${stockInfo.className}">${stockInfo.statusText}</span>
        </div>

        <h3 class="product-title">
          <a href="product.html?slug=${encodeURIComponent(product.slug)}" title="${product.name}">
            ${product.name}
          </a>
        </h3>

        <p class="product-brand">${product.brand || 'Brand TBD'}</p>

        <div class="product-price-row">
          <span class="product-selling-price">${window.CONFIG.formatPrice(product.price)}</span>
          ${product.mrp > product.price ? `
            <span class="product-mrp">${window.CONFIG.formatPrice(product.mrp)}</span>
          ` : ''}
        </div>

        <!-- Buttons anchored to the bottom of the card -->
        <div class="product-card-actions">
          <button
            type="button"
            class="btn btn-secondary btn-sm add-to-cart-btn"
            data-id="${product.id}"
            ${!stockInfo.canBuy ? 'disabled aria-disabled="true"' : ''}
            title="${!stockInfo.canBuy ? 'Item is out of stock' : 'Add to Shopping Cart'}"
          >
            ${!stockInfo.canBuy ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm buy-now-btn"
            data-id="${product.id}"
            ${!stockInfo.canBuy ? 'disabled aria-disabled="true"' : ''}
            title="${!stockInfo.canBuy ? 'Item is out of stock' : 'Buy Now and Proceed to Checkout'}"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  `;
}

// Toast notification system
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-message">${message}</span>
    <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Debounce helper
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Global UI Initialization (Config Ingestion, Navigation, Floating WhatsApp)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Config values into any element with data-config attribute
  if (window.CONFIG) {
    // Text bindings
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.getAttribute('data-config');
      if (key === 'phoneDisplay') {
        el.textContent = window.CONFIG.phoneDisplay;
      } else if (key === 'whatsappDisplay') {
        el.textContent = window.CONFIG.whatsappDisplay;
      } else if (key === 'brandName') {
        el.textContent = window.CONFIG.brandName;
      } else if (key === 'owner') {
        el.textContent = window.CONFIG.owner;
      } else if (key === 'tagline') {
        el.textContent = window.CONFIG.tagline;
      } else if (key === 'address') {
        el.textContent = window.CONFIG.address;
      } else if (key === 'email') {
        el.textContent = window.CONFIG.email;
      } else if (key === 'developerCredit') {
        el.textContent = window.CONFIG.developerCredit;
      }
    });

    // Link href bindings
    document.querySelectorAll('[data-config-href]').forEach(el => {
      const key = el.getAttribute('data-config-href');
      if (key === 'tel') {
        el.setAttribute('href', window.CONFIG.getTelUrl());
      } else if (key === 'whatsapp') {
        el.setAttribute('href', window.CONFIG.getWhatsAppUrl());
      } else if (key === 'email') {
        el.setAttribute('href', `mailto:${window.CONFIG.email}`);
      }
    });
  }

  // 2. Setup Mobile Navigation Menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('is-open');
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      });
    });
  }

  // 3. Setup Header Search Form (Desktop & Mobile)
  const searchForms = document.querySelectorAll('.header-search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[name="search"]');
      if (input && input.value.trim()) {
        const query = encodeURIComponent(input.value.trim());
        window.location.href = `shop.html?search=${query}`;
      }
    });
  });

  // 4. Global Delegated Clicks for Add-to-Cart and Buy-Now buttons
  document.addEventListener('click', async (e) => {
    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if (addToCartBtn && !addToCartBtn.disabled) {
      e.preventDefault();
      const id = addToCartBtn.getAttribute('data-id');
      if (window.Cart) {
        await window.Cart.addToCart(id, 1);
      }
    }

    const buyNowBtn = e.target.closest('.buy-now-btn');
    if (buyNowBtn && !buyNowBtn.disabled) {
      e.preventDefault();
      const id = buyNowBtn.getAttribute('data-id');
      if (window.Cart) {
        await window.Cart.addToCart(id, 1, false); // do not show redundant toast, redirecting immediately
        window.location.href = 'checkout.html';
      }
    }
  });

  // 5. Ensure Floating WhatsApp Button exists and never covers footer/buttons
  setupFloatingWhatsApp();
});

function setupFloatingWhatsApp() {
  if (document.getElementById('whatsapp-float-btn')) return;
  if (!window.CONFIG) return;

  const btn = document.createElement('a');
  btn.id = 'whatsapp-float-btn';
  btn.className = 'whatsapp-float';
  btn.href = window.CONFIG.getWhatsAppUrl('Hello Shalu Wellness Mart, I am reaching out to enquire about your products.');
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Chat with Shalu Wellness Mart on WhatsApp');
  btn.setAttribute('title', 'Chat on WhatsApp');
  btn.innerHTML = `
    <svg class="whatsapp-float-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.49 8.02 9.72C8.02 10.95 8.91 12.14 9.04 12.31C9.17 12.48 10.8 15 13.3 16.07C13.9 16.33 14.36 16.49 14.72 16.6C15.32 16.79 15.86 16.76 16.3 16.7C16.78 16.63 17.78 16.09 17.98 15.51C18.19 14.93 18.19 14.43 18.13 14.33C18.06 14.23 17.9 14.17 17.65 14.04C17.41 13.92 16.22 13.33 16 13.25C15.78 13.17 15.62 13.13 15.45 13.38C15.29 13.62 14.81 14.17 14.67 14.33C14.53 14.5 14.38 14.52 14.14 14.39C13.9 14.27 12.87 13.93 11.66 12.85C10.72 12.01 10.08 10.98 9.94 10.73C9.8 10.49 9.92 10.36 10.05 10.23C10.16 10.12 10.3 9.93 10.43 9.78C10.56 9.63 10.6 9.53 10.68 9.36C10.77 9.2 10.72 9.05 10.66 8.93C10.6 8.81 10.11 7.61 9.9 7.12C9.7 6.64 9.5 6.7 9.35 6.7C9.21 6.7 9.05 6.7 8.88 6.7L9.53 7.34Z"/>
    </svg>
    <span class="whatsapp-float-label">Chat on WhatsApp</span>
  `;
  document.body.appendChild(btn);
}

// Expose utilities on window
if (typeof window !== 'undefined') {
  window.getProducts = getProducts;
  window.getProductBySlug = getProductBySlug;
  window.getCategories = getCategories;
  window.calculateDiscount = calculateDiscount;
  window.renderProductCard = renderProductCard;
  window.showToast = showToast;
  window.debounce = debounce;
}
