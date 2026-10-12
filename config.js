/**
 * SHALU WELLNESS MART - CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * All brand info, contact numbers, address, and developer credits are defined here.
 * No phone or WhatsApp numbers should be hard-coded in HTML or other scripts.
 */
const CONFIG = {
  brandName: 'Shalu Wellness Mart',
  owner: 'Shalu Srivastava',
  tagline: 'Your Everyday Destination for Health, Wellness & Natural Living.',
  phoneDisplay: '9226680953',
  phoneTel: '+919226680953',
  whatsappDisplay: '+91 7275874168',
  whatsappNumber: '917275874168',
  address: 'A/P: Tunga, Tal: Sangli, Dist: Miraj',
  email: 'shalushrivastava1234@gmail.com',
  developerCredit: 'Designed & Developed by WEBORA',
  developerUrl: '#',
  currencySymbol: '₹',
  categories: [
    {
      id: 'health-care',
      slug: 'health-care',
      name: 'Health Care',
      description: 'Everyday personal health and vitality essentials for the family.',
      color: '#166534',
      bgLight: '#F0FDF4'
    },
    {
      id: 'wellness-nutrition',
      slug: 'wellness-nutrition',
      name: 'Wellness & Nutrition',
      description: 'Daily nutritional boosters, wholesome herbal blends, and lifestyle vitality.',
      color: '#047857',
      bgLight: '#ECFDF5'
    },
    {
      id: 'agriculture',
      slug: 'agriculture',
      name: 'Agriculture',
      description: 'Eco-conscious crop nourishment and plant care items for farms.',
      color: '#15803D',
      bgLight: '#F0FDF4'
    },
    {
      id: 'beauty-personal-care',
      slug: 'beauty-personal-care',
      name: 'Beauty & Personal Care',
      description: 'Gentle skin, hair, and body care crafted for daily routine hygiene.',
      color: '#0F766E',
      bgLight: '#F0FDFA'
    },
    {
      id: 'home-lifestyle',
      slug: 'home-lifestyle',
      name: 'Home & Lifestyle',
      description: 'Clean living products and gentle home essentials for natural harmony.',
      color: '#1E3A8A',
      bgLight: '#EFF6FF'
    },
    {
      id: 'gardening-plant-care',
      slug: 'gardening-plant-care',
      name: 'Gardening & Plant Care',
      description: 'Potted plant feeds, soil revitalizers, and home garden greenery support.',
      color: '#4D7C0F',
      bgLight: '#F7FEE7'
    }
  ],

  // Utility to generate WhatsApp Chat URL with optional pre-filled message
  getWhatsAppUrl(customMessage) {
    const text = customMessage ? encodeURIComponent(customMessage) : encodeURIComponent(`Hello Shalu Wellness Mart, I would like to enquire about your products.`);
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  },

  // Utility to generate telephone call link
  getTelUrl() {
    return `tel:${this.phoneTel}`;
  },

  // Utility to format price
  formatPrice(amount) {
    return `${this.currencySymbol}${Number(amount || 0).toLocaleString('en-IN')}`;
  }
};

// Export to window for vanilla JS access across all pages
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
