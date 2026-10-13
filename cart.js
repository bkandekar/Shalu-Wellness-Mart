/**
 * SHALU WELLNESS MART - CART MODULE (SINGLE CART SCRIPT) - हिंदी संस्करण
 * Stores only product ID and quantity in localStorage.
 * Always resolves prices, stock, and status dynamically from the data layer.
 * Caps quantity at actual stock and purges inactive/zero-stock items upon loading.
 *
 * हिंदी बदलाव: सभी टोस्ट मेसेज और aria-label हिंदी में।
 * कार्ट में उत्पाद का नाम हिंदी (nameHi) में दिखता है, अगर उपलब्ध हो।
 */

const CART_STORAGE_KEY = 'shalu_wellness_cart_v1';

const Cart = {
  // Read stored items safely
  getRawItems() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('LocalStorage access error:', e);
      return [];
    }
  },

  // Save items safely
  saveRawItems(items) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
    this.updateHeaderBadge();
  },

  // Retrieve cart with full hydrated details from getProducts()
  async getHydratedCart() {
    const raw = this.getRawItems();
    if (!raw.length) return [];

    const allProducts = await window.getProducts();
    const hydrated = [];
    let stateChanged = false;

    for (const item of raw) {
      const product = allProducts.find(p => p.id === item.id);
      // If product was deleted, made inactive, or has 0 stock, prune or adjust
      if (!product || product.active === false) {
        stateChanged = true;
        continue;
      }

      if (product.stock <= 0) {
        stateChanged = true;
        continue;
      }

      let validQty = Number(item.quantity) || 1;
      if (validQty > product.stock) {
        validQty = product.stock;
        stateChanged = true;
      }
      if (validQty < 1) validQty = 1;

      const displayName = product.nameHi || product.name;

      hydrated.push({
        id: product.id,
        slug: product.slug,
        name: displayName,
        brand: product.brand || 'Brand TBD',
        price: product.price,
        mrp: product.mrp,
        stock: product.stock,
        quantity: validQty,
        image: (product.images && product.images[0]) ? product.images[0].src : '',
        imageAlt: (product.images && product.images[0]) ? product.images[0].alt : displayName,
        recommendedFilename: (product.images && product.images[0]) ? product.images[0].recommendedFilename : 'product.jpg',
        category: product.category,
        lineTotal: product.price * validQty
      });
    }

    if (stateChanged) {
      const cleaned = hydrated.map(h => ({ id: h.id, quantity: h.quantity }));
      this.saveRawItems(cleaned);
    }

    return hydrated;
  },

  // Add product to cart with stock validation
  async addToCart(productId, quantity = 1, notify = true) {
    const allProducts = await window.getProducts();
    const product = allProducts.find(p => p.id === productId);

    if (!product || product.stock <= 0) {
      if (window.showToast) window.showToast('क्षमा करें, यह उत्पाद अभी स्टॉक में नहीं है।', 'error');
      return false;
    }

    const raw = this.getRawItems();
    const existingIndex = raw.findIndex(item => item.id === productId);

    let currentQty = existingIndex >= 0 ? raw[existingIndex].quantity : 0;
    let newQty = currentQty + quantity;

    if (newQty > product.stock) {
      newQty = product.stock;
      if (window.showToast) {
        window.showToast(`इस उत्पाद का अधिकतम उपलब्ध स्टॉक (${product.stock}) पूरा हो गया है।`, 'warning');
      }
    } else {
      if (notify && window.showToast) {
        window.showToast(`"${product.nameHi || product.name}" आपके कार्ट में जोड़ दिया गया है।`, 'success');
      }
    }

    if (existingIndex >= 0) {
      raw[existingIndex].quantity = newQty;
    } else {
      raw.push({ id: productId, quantity: newQty });
    }

    this.saveRawItems(raw);
    return true;
  },

  // Update item quantity directly (plus/minus buttons or input change)
  async updateQuantity(productId, newQuantity) {
    const allProducts = await window.getProducts();
    const product = allProducts.find(p => p.id === productId);

    let raw = this.getRawItems();
    const index = raw.findIndex(item => item.id === productId);

    if (index === -1) return;

    if (newQuantity <= 0) {
      raw.splice(index, 1);
      if (window.showToast) window.showToast('उत्पाद कार्ट से हटा दिया गया।', 'info');
    } else {
      const maxStock = product ? product.stock : 99;
      if (newQuantity > maxStock) {
        newQuantity = maxStock;
        if (window.showToast) {
          window.showToast(`स्टॉक में केवल ${maxStock} नग उपलब्ध हैं।`, 'warning');
        }
      }
      raw[index].quantity = newQuantity;
    }

    this.saveRawItems(raw);
  },

  // Remove item completely
  removeItem(productId) {
    let raw = this.getRawItems();
    raw = raw.filter(item => item.id !== productId);
    this.saveRawItems(raw);
    if (window.showToast) window.showToast('उत्पाद कार्ट से हटा दिया गया।', 'info');
  },

  // Clear entire cart
  clearCart() {
    this.saveRawItems([]);
  },

  // Total quantity count for header badge
  getCartCount() {
    const raw = this.getRawItems();
    return raw.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  },

  // Update all header cart count elements
  updateHeaderBadge() {
    const count = this.getCartCount();
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.setAttribute('aria-label', `शॉपिंग कार्ट में ${count} उत्पाद`);
      if (count > 0) {
        badge.classList.remove('badge-hidden');
      } else {
        badge.classList.add('badge-hidden');
      }
    });
  }
};

// Initialize header badge when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateHeaderBadge();
});

// Expose Cart globally
if (typeof window !== 'undefined') {
  window.Cart = Cart;
}
