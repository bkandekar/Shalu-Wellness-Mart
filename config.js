/**
 * SHALU WELLNESS MART - CONFIGURATION (SINGLE SOURCE OF TRUTH) - हिंदी संस्करण
 * All brand info, contact numbers, address, and developer credits are defined here.
 * No phone or WhatsApp numbers should be hard-coded in HTML or other scripts.
 *
 * हिंदी बदलाव: ब्रांड नाम, मालिक, टैगलाइन, पता, श्रेणियों के नाम/विवरण और WhatsApp का डिफ़ॉल्ट मेसेज।
 * श्रेणियों के id और slug नहीं बदले हैं, ताकि फ़िल्टर और लिंक काम करते रहें।
 */
const CONFIG = {
  brandName: 'शालू वेलनेस मार्ट',
  owner: 'शालू श्रीवास्तव',
  tagline: 'स्वास्थ्य, वेलनेस और प्राकृतिक जीवन के लिए आपकी रोज़ की मंज़िल।',
  phoneDisplay: '9226680953',
  phoneTel: '+919226680953',
  whatsappDisplay: '+91 7275874168',
  whatsappNumber: '917275874168',
  address: 'ए/पी: तुंगा, ता. सांगली, जिला मिरज',
  email: 'shalushrivastava1234@gmail.com',
  developerCredit: 'डिज़ाइन व डेवलपमेंट: WEBORA',
  developerUrl: '#',
  currencySymbol: '₹',
  categories: [
    {
      id: 'health-care',
      slug: 'health-care',
      name: 'हेल्थ केयर',
      description: 'पूरे परिवार की रोज़ की सेहत और ताकत के लिए ज़रूरी उत्पाद।',
      color: '#166534',
      bgLight: '#F0FDF4'
    },
    {
      id: 'wellness-nutrition',
      slug: 'wellness-nutrition',
      name: 'वेलनेस व न्यूट्रिशन',
      description: 'रोज़ का पोषण, पौष्टिक हर्बल मिश्रण और स्वस्थ जीवनशैली के उत्पाद।',
      color: '#047857',
      bgLight: '#ECFDF5'
    },
    {
      id: 'agriculture',
      slug: 'agriculture',
      name: 'कृषि',
      description: 'खेतों के लिए पर्यावरण के अनुकूल फसल पोषण और पौध-सुरक्षा उत्पाद।',
      color: '#15803D',
      bgLight: '#F0FDF4'
    },
    {
      id: 'beauty-personal-care',
      slug: 'beauty-personal-care',
      name: 'ब्यूटी व पर्सनल केयर',
      description: 'रोज़ की देखभाल के लिए त्वचा, बाल और शरीर के कोमल उत्पाद।',
      color: '#0F766E',
      bgLight: '#F0FDFA'
    },
    {
      id: 'home-lifestyle',
      slug: 'home-lifestyle',
      name: 'होम व लाइफस्टाइल',
      description: 'स्वच्छ घर और प्राकृतिक वातावरण के लिए ज़रूरी घरेलू उत्पाद।',
      color: '#1E3A8A',
      bgLight: '#EFF6FF'
    },
    {
      id: 'gardening-plant-care',
      slug: 'gardening-plant-care',
      name: 'बागवानी व पौधों की देखभाल',
      description: 'गमलों के पौधों का पोषण, मिट्टी सुधारक और घर के बगीचे के लिए उत्पाद।',
      color: '#4D7C0F',
      bgLight: '#F7FEE7'
    }
  ],

  // Utility to generate WhatsApp Chat URL with optional pre-filled message
  getWhatsAppUrl(customMessage) {
    const text = customMessage ? encodeURIComponent(customMessage) : encodeURIComponent(`नमस्ते शालू वेलनेस मार्ट, मैं आपके उत्पादों के बारे में जानना चाहता/चाहती हूं।`);
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
