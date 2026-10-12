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

        <!-- Dedicated Product Information Button (माहिती व डिस्क्रिप्शन पहा) -->
        <button
          type="button"
          class="btn btn-outline btn-sm product-info-btn"
          data-slug="${product.slug}"
          aria-label="View description and information for ${product.name}"
          title="प्रॉडक्ट माहिती व संपूर्ण डिस्क्रिप्शन पहा"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          माहिती पहा (Product Info)
        </button>

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

  // 4. Global Delegated Clicks for Info Modal, Add-to-Cart, and Buy-Now buttons
  document.addEventListener('click', async (e) => {
    // Product info & description modal button
    const infoBtn = e.target.closest('.product-info-btn');
    if (infoBtn) {
      e.preventDefault();
      const slug = infoBtn.getAttribute('data-slug');
      if (slug) {
        await openProductInfoModal(slug);
      }
      return;
    }

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

// Function to show comprehensive product description and details in a modal
async function openProductInfoModal(slug) {
  const product = await window.getProductBySlug(slug);
  if (!product) {
    if (window.showToast) window.showToast('Product information could not be found.', 'error');
    return;
  }

  let modal = document.getElementById('product-info-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-info-modal';
    modal.className = 'product-info-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-product-title');
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProductInfoModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeProductInfoModal();
      }
    });
  }

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

  const whatsappInquiryMsg = `Hello Shalu Wellness Mart, I would like to enquire about this product:\n\n*${product.name}*\nPrice: ${window.CONFIG.formatPrice(product.price)}\nCategory: ${categoryName}\n\nPlease share availability and details.`;
  const whatsappUrl = window.CONFIG.getWhatsAppUrl(whatsappInquiryMsg);

  modal.innerHTML = `
    <div class="product-info-modal-card">
      <div class="product-info-modal-header">
        <div>
          <span class="product-category-tag" style="font-size: 0.75rem;">${categoryName}</span>
          <h2 id="modal-product-title" class="product-info-modal-title">${product.name}</h2>
        </div>
        <button type="button" class="product-info-modal-close" aria-label="Close product information modal" onclick="closeProductInfoModal()">&times;</button>
      </div>

      <div class="product-info-modal-body">
        <div class="modal-product-summary-row">
          <img src="${primaryImg.src}" alt="${primaryImg.alt || product.name}" class="modal-product-thumb" width="100" height="100">
          <div class="modal-product-meta-block">
            <div style="display: flex; align-items: baseline; gap: 0.6rem;">
              <span class="product-selling-price" style="font-size: 1.35rem;">${window.CONFIG.formatPrice(product.price)}</span>
              ${product.mrp > product.price ? `
                <span class="product-mrp">${window.CONFIG.formatPrice(product.mrp)}</span>
                <span class="badge badge-discount">${discount}% OFF</span>
              ` : ''}
            </div>
            <div style="font-size: 0.8125rem; color: var(--color-secondary-text);">Brand: <strong>${product.brand || 'Brand TBD'}</strong></div>
            <div><span class="product-stock-tag ${stockInfo.className}">${stockInfo.statusText}</span></div>
          </div>
        </div>

        <!-- Full Description Block -->
        <div class="modal-section-box">
          <h3 class="modal-section-heading">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            प्रॉडक्ट माहिती व संपूर्ण वर्णन (Product Description)
          </h3>
          <p class="modal-section-text">${product.description || product.shortDescription}</p>
        </div>

        ${product.ingredients ? `
          <div class="modal-section-box">
            <h3 class="modal-section-heading">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
              घटक व सामग्री (Ingredients / Composition)
            </h3>
            <p class="modal-section-text">${product.ingredients}</p>
          </div>
        ` : ''}

        ${product.usage ? `
          <div class="modal-section-box">
            <h3 class="modal-section-heading">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              वापरण्याची पद्धत (Usage Instructions)
            </h3>
            <p class="modal-section-text">${product.usage}</p>
          </div>
        ` : ''}

        ${product.precautions ? `
          <div class="modal-section-box">
            <h3 class="modal-section-heading">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              काळजी व सूचना (Precautions)
            </h3>
            <p class="modal-section-text">${product.precautions}</p>
          </div>
        ` : ''}

        ${product.manufacturer ? `
          <div class="modal-section-box" style="font-size: 0.8125rem;">
            <p style="margin-bottom: 0.25rem;"><strong>उत्पादक (Manufacturer):</strong> ${product.manufacturer}</p>
            <p><strong>एक्स्पायरी (Shelf Life):</strong> ${product.expiry || 'Packaging वर नमूद'}</p>
          </div>
        ` : ''}
      </div>

      <div class="product-info-modal-footer">
        <a href="product.html?slug=${encodeURIComponent(product.slug)}" class="btn btn-outline btn-sm">
          संपूर्ण पेज उघडा &rarr;
        </a>
        <div style="display: flex; gap: 0.5rem;">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            onclick="window.Cart.addToCart('${product.id}', 1); closeProductInfoModal();"
            ${!stockInfo.canBuy ? 'disabled' : ''}
          >
            Add to Cart
          </button>
          <a
            href="${whatsappUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-whatsapp btn-sm"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('is-open');
}

function closeProductInfoModal() {
  const modal = document.getElementById('product-info-modal');
  if (modal) {
    modal.classList.remove('is-open');
  }
}

// Expose utilities on window
if (typeof window !== 'undefined') {
  window.getProducts = getProducts;
  window.getProductBySlug = getProductBySlug;
  window.getCategories = getCategories;
  window.calculateDiscount = calculateDiscount;
  window.renderProductCard = renderProductCard;
  window.openProductInfoModal = openProductInfoModal;
  window.closeProductInfoModal = closeProductInfoModal;
  window.showToast = showToast;
  window.debounce = debounce;
}
