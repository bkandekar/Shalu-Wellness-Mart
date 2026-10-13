/**
 * SHALU WELLNESS MART - PRODUCTS DATA (PHASE 1 DATA STORE)
 * 12 Clearly Labelled Demo Products + 5 Real IMC Products Across 6 Categories.
 *
 * Core fields: id, name, slug, category, brand, mrp, price, stock,
 * shortDescription, description, ingredients, usage, precautions,
 * manufacturer, expiry, featured, active, images.
 *
 * NEW optional fields (used by the 5 IMC products, Hindi SEO content):
 * nameHi, features[], seoTitle, metaDescription, keywords[], tags[], crops[],
 * disclaimer, language.
 * The site code can read these when present and ignore them when absent.
 */

// Helper function to create clean inline SVG placeholders in category theme
function createSvgPlaceholder(title, categoryName, primaryColor, recommendedFilename, recommendedSize) {
  const safeTitle = (title || 'Product Image').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeCat = (categoryName || 'General').replace(/&/g, '&amp;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="grad_${categoryName.replace(/\W/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F9FAFB"/>
        <stop offset="100%" stop-color="#F0FDF4"/>
      </linearGradient>
    </defs>
    <rect width="500" height="500" fill="url(#grad_${categoryName.replace(/\W/g, '')})" rx="16"/>
    <rect x="25" y="25" width="450" height="450" fill="none" stroke="${primaryColor}" stroke-opacity="0.25" stroke-dasharray="6,6" rx="12"/>
    <circle cx="250" cy="190" r="70" fill="${primaryColor}" fill-opacity="0.12"/>
    <path d="M225 190 C225 165, 275 165, 275 190 C275 215, 225 215, 225 190 Z" fill="${primaryColor}"/>
    <path d="M250 170 L250 215" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round"/>
    <path d="M235 185 L265 185" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round"/>
    <text x="250" y="295" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="${primaryColor}" text-anchor="middle" letter-spacing="1">${safeCat.toUpperCase()}</text>
    <text x="250" y="325" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#111827" text-anchor="middle">${safeTitle}</text>
    <text x="250" y="355" font-family="'Inter', sans-serif" font-size="12" fill="#6B7280" text-anchor="middle">Demo Placeholder • ${recommendedFilename}</text>
    <rect x="180" y="390" width="140" height="28" rx="6" fill="${primaryColor}" fill-opacity="0.15"/>
    <text x="250" y="409" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="${primaryColor}" text-anchor="middle">${recommendedSize}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const PRODUCTS_DATA = [
  // ============================================================
  // DEMO PRODUCTS (12) - clearly labelled isDemo: true
  // ============================================================

  // Category 1: Health Care
  {
    id: 'prod-001',
    name: 'Herbal Daily Vitality Decoction',
    slug: 'herbal-daily-vitality-decoction',
    category: 'health-care',
    brand: 'Brand TBD',
    mrp: 450,
    price: 380,
    stock: 18,
    isDemo: true,
    featured: true,
    active: true,
    shortDescription: 'Traditional botanical herbal extract designed for regular lifestyle nourishment.',
    description: 'A gentle everyday preparation crafted with traditional dried herbs and botanical extracts. Formulated for routine personal refreshment as part of a balanced daily routine.',
    ingredients: 'Standardized herbal decoction mix, botanical extracts, filtered water base.',
    usage: 'Mix 10-15 ml with a cup of warm water once or twice daily after meals, or as recommended by your health guide.',
    precautions: 'Store in a cool, dry place away from direct sunlight. Shake well before opening.',
    manufacturer: 'Brand TBD (Packaging Details Provided on Dispatch)',
    expiry: '24 months from batch packaging date',
    images: [
      {
        src: createSvgPlaceholder('Herbal Daily Vitality Decoction', 'Health Care', '#166534', 'herbal-vitality.jpg', '600 x 600 px'),
        alt: 'Herbal Daily Vitality Decoction bottle - Shalu Wellness Mart',
        recommendedFilename: 'herbal-vitality-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'Natural Tulsi & Ginger Drops',
    slug: 'natural-tulsi-ginger-drops',
    category: 'health-care',
    brand: 'Brand TBD',
    mrp: 260,
    price: 220,
    stock: 4, // Low stock test: "Only 4 left"
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Concentrated aqueous drops of holy basil and sun-dried ginger root.',
    description: 'An aromatic liquid concentrate combining holy basil leaves and ginger root essences. Convenient dropper dispenser for easy addition to daily hot tea or drinking water.',
    ingredients: 'Tulsi aqueous extract, ginger root extract, natural stabilizer.',
    usage: 'Add 2-3 drops into a cup of warm water, green tea, or herbal beverage.',
    precautions: 'Keep dropper tip clean and dry. Avoid direct contact with eyes.',
    manufacturer: 'Brand TBD',
    expiry: '18 months from batch packaging date',
    images: [
      {
        src: createSvgPlaceholder('Natural Tulsi & Ginger Drops', 'Health Care', '#166534', 'tulsi-ginger-drops.jpg', '600 x 600 px'),
        alt: 'Natural Tulsi & Ginger Drops - Shalu Wellness Mart',
        recommendedFilename: 'tulsi-ginger-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // Category 2: Wellness & Nutrition
  {
    id: 'prod-003',
    name: 'Multi-Seed Nutritional Mix (Roasted)',
    slug: 'multi-seed-nutritional-mix-roasted',
    category: 'wellness-nutrition',
    brand: 'Brand TBD',
    mrp: 320,
    price: 275,
    stock: 22,
    isDemo: true,
    featured: true,
    active: true,
    shortDescription: 'Slow-roasted crunchy blend of pumpkin, flax, sunflower, and chia seeds.',
    description: 'Nutritious roasted seed blend packed with dietary fiber, natural plant minerals, and healthy fats. Perfectly roasted without added refined sugars or artificial flavoring.',
    ingredients: 'Pumpkin seeds, flax seeds, sunflower seeds, watermelon seeds, chia seeds, trace rock salt.',
    usage: 'Enjoy 1-2 tablespoons as an evening snack, or sprinkle atop breakfast cereals, curd, or fresh fruit bowls.',
    precautions: 'Contains edible seeds. Store tightly sealed in a dry pantry container once unsealed.',
    manufacturer: 'Brand TBD',
    expiry: '9 months from packaging date',
    images: [
      {
        src: createSvgPlaceholder('Multi-Seed Nutritional Mix', 'Wellness & Nutrition', '#047857', 'multi-seed-mix.jpg', '600 x 600 px'),
        alt: 'Multi-Seed Roasted Nutritional Mix - Shalu Wellness Mart',
        recommendedFilename: 'multi-seed-mix-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },
  {
    id: 'prod-004',
    name: 'Amla & Honey Nectar Preserve',
    slug: 'amla-honey-nectar-preserve',
    category: 'wellness-nutrition',
    brand: 'Brand TBD',
    mrp: 350,
    price: 350, // No discount test
    stock: 12,
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Traditional wild Indian gooseberry steeped in raw forest honey.',
    description: 'Whole selected amla pieces slow-macerated in unprocessed floral honey. A classic morning spoonful that delivers a sweet and tangy natural treat for all age groups.',
    ingredients: 'Selected Indian gooseberries (Amla), unpasteurized natural honey, cardamon aroma.',
    usage: 'Eat 1 piece along with a spoonful of honey every morning before breakfast.',
    precautions: 'Do not refrigerate. Use a clean, completely dry spoon every time.',
    manufacturer: 'Brand TBD',
    expiry: '12 months from packing date',
    images: [
      {
        src: createSvgPlaceholder('Amla & Honey Nectar Preserve', 'Wellness & Nutrition', '#047857', 'amla-honey-preserve.jpg', '600 x 600 px'),
        alt: 'Amla & Honey Nectar Preserve - Shalu Wellness Mart',
        recommendedFilename: 'amla-honey-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // Category 3: Agriculture
  {
    id: 'prod-005',
    name: 'Bio-Enzyme Liquid Plant Tonic (1 Litre)',
    slug: 'bio-enzyme-liquid-plant-tonic-1l',
    category: 'agriculture',
    brand: 'Brand TBD',
    mrp: 580,
    price: 490,
    stock: 15,
    isDemo: true,
    featured: true,
    active: true,
    shortDescription: 'Natural fermented fruit bio-enzyme solution to support balanced agricultural soil health.',
    description: 'Fermented plant-based bio-enzyme formulation created to support micro-flora in farming soils. Suitable for drip irrigation and foliar application across agricultural field crops.',
    ingredients: 'Fermented citrus peel extracts, jaggery molasses substrate, active microbial base culture.',
    usage: 'Dilute 3-5 ml per litre of clean irrigation water for foliar spray, or 2 litres per acre via drip channel.',
    precautions: 'For agricultural and field use only. Do not mix with chemical fungicides or systemic weedicides.',
    manufacturer: 'Brand TBD',
    expiry: '18 months from batch bottling',
    images: [
      {
        src: createSvgPlaceholder('Bio-Enzyme Plant Tonic', 'Agriculture', '#15803D', 'bio-enzyme-tonic.jpg', '600 x 600 px'),
        alt: 'Bio-Enzyme Liquid Plant Tonic 1 Litre - Shalu Wellness Mart',
        recommendedFilename: 'bio-enzyme-1l-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },
  {
    id: 'prod-006',
    name: 'Cold-Pressed Neem Oil Agriculture Spray (500ml)',
    slug: 'cold-pressed-neem-oil-agriculture-spray-500ml',
    category: 'agriculture',
    brand: 'Brand TBD',
    mrp: 390,
    price: 330,
    stock: 0, // Out of stock test
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Pure botanical neem seed kernel oil with natural emulsifier for crop foliage protection.',
    description: 'Pure cold-extracted neem kernel oil blended with a biodegradable natural emulsifier for smooth water mixing. Helps protect crop foliage as part of integrated farm care practices.',
    ingredients: 'Cold-pressed neem seed oil (minimum 1500 ppm azadirachtin compound), natural bio-emulsifier.',
    usage: 'Add 5 ml per litre of water and spray thoroughly on leaf undersides in the early morning or evening hours.',
    precautions: 'Avoid spraying in hot noon sunlight or right before anticipated rainfall.',
    manufacturer: 'Brand TBD',
    expiry: '24 months from pressing',
    images: [
      {
        src: createSvgPlaceholder('Neem Oil Agriculture Spray', 'Agriculture', '#15803D', 'neem-oil-spray.jpg', '600 x 600 px'),
        alt: 'Cold-Pressed Neem Oil Agriculture Spray 500ml - Shalu Wellness Mart',
        recommendedFilename: 'neem-oil-500ml-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // Category 4: Beauty & Personal Care
  {
    id: 'prod-007',
    name: 'Cold-Processed Aloe & Neem Cleansing Bar',
    slug: 'cold-processed-aloe-neem-cleansing-bar',
    category: 'beauty-personal-care',
    brand: 'Brand TBD',
    mrp: 140,
    price: 115,
    stock: 30,
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Gentle artisan bathing soap bar made with pure coconut oil and fresh aloe vera pulp.',
    description: 'Slow-cured handcrafted bathing bar made from pure saponified cold-pressed coconut oil, fresh inner-leaf aloe gel, and pulverized neem leaf powder. Free of harsh synthetic foaming agents.',
    ingredients: 'Cold-pressed coconut oil, aloe vera gel, neem leaf powder, essential oils, distilled water.',
    usage: 'Lather between wet palms or with a washcloth, massage gently onto damp skin, and rinse cleanly with water.',
    precautions: 'For external skin hygiene only. Keep on a draining soap dish to extend bar longevity.',
    manufacturer: 'Brand TBD',
    expiry: '36 months from packaging',
    images: [
      {
        src: createSvgPlaceholder('Aloe & Neem Cleansing Bar', 'Beauty & Personal Care', '#0F766E', 'aloe-neem-bar.jpg', '600 x 600 px'),
        alt: 'Cold-Processed Aloe & Neem Cleansing Bar - Shalu Wellness Mart',
        recommendedFilename: 'aloe-neem-bar-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },
  {
    id: 'prod-008',
    name: 'Herbal Scalp Nourishing Hair Oil (200ml)',
    slug: 'herbal-scalp-nourishing-hair-oil-200ml',
    category: 'beauty-personal-care',
    brand: 'Brand TBD',
    mrp: 320,
    price: 260,
    stock: 9,
    isDemo: true,
    featured: true,
    active: true,
    shortDescription: 'Infused botanical hair oil with bhringraj, brahmi, and sesame seed base.',
    description: 'Traditional slow-cooked herbal oil crafted with sun-dried bhringraj, methi seeds, and amla simmered in sesame and coconut oil. Nourishes the scalp and conditions hair strands naturally.',
    ingredients: 'Sesame oil, virgin coconut oil, bhringraj, amla, methi seeds, hibiscus extract.',
    usage: 'Warm a small amount between palms, massage into scalp roots, and leave on for at least 1 hour before gentle washing.',
    precautions: 'For external use only. Patch test recommended on forearm before first application.',
    manufacturer: 'Brand TBD',
    expiry: '24 months from manufacturing date',
    images: [
      {
        src: createSvgPlaceholder('Herbal Scalp Nourishing Hair Oil', 'Beauty & Personal Care', '#0F766E', 'herbal-hair-oil.jpg', '600 x 600 px'),
        alt: 'Herbal Scalp Nourishing Hair Oil 200ml - Shalu Wellness Mart',
        recommendedFilename: 'herbal-hair-oil-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // Category 5: Home & Lifestyle
  {
    id: 'prod-009',
    name: 'Citrus & Pine Eco Floor Cleaner Concentrate (1L)',
    slug: 'citrus-pine-eco-floor-cleaner-concentrate-1l',
    category: 'home-lifestyle',
    brand: 'Brand TBD',
    mrp: 290,
    price: 245,
    stock: 14,
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Plant-derived surface cleaner with distilled pine oil and orange peel extract.',
    description: 'Biodegradable household floor washing concentrate formulated with natural pine oil and distilled sweet orange rind extracts. Leaves living areas naturally fresh without strong chemical fumes.',
    ingredients: 'Distilled pine oil, sweet orange terpene, plant glucoside surfactant, reverse osmosis water.',
    usage: 'Add one capful (approx. 20ml) into half a bucket of mop water (approx. 4 litres) and mop clean.',
    precautions: 'Keep out of reach of young children and pets. Do not ingest.',
    manufacturer: 'Brand TBD',
    expiry: '24 months from batch packing',
    images: [
      {
        src: createSvgPlaceholder('Eco Floor Cleaner Concentrate', 'Home & Lifestyle', '#1E3A8A', 'eco-floor-cleaner.jpg', '600 x 600 px'),
        alt: 'Citrus & Pine Eco Floor Cleaner Concentrate 1L - Shalu Wellness Mart',
        recommendedFilename: 'eco-floor-cleaner-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },
  {
    id: 'prod-010',
    name: 'Natural Camphor & Lemongrass Room Cone',
    slug: 'natural-camphor-lemongrass-room-cone',
    category: 'home-lifestyle',
    brand: 'Brand TBD',
    mrp: 180,
    price: 150,
    stock: 3, // Low stock test: "Only 3 left"
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Aromatic diffuser block combining pure edible-grade camphor and lemongrass oil.',
    description: 'Solid natural camphor cone that slowly evaporates into ambient room air, providing a fresh, uplifting herbal fragrance that repels stale odors in wardrobes, cars, and bedrooms.',
    ingredients: 'Pure pine-derived camphor crystals, pure lemongrass essential oil.',
    usage: 'Hang or place in closets, wardrobes, study desks, or living areas where natural aroma is desired.',
    precautions: 'Keep away from open fires, incense sticks, or high heat sources.',
    manufacturer: 'Brand TBD',
    expiry: '12 months from packing',
    images: [
      {
        src: createSvgPlaceholder('Camphor Room Cone', 'Home & Lifestyle', '#1E3A8A', 'camphor-room-cone.jpg', '600 x 600 px'),
        alt: 'Natural Camphor & Lemongrass Room Cone - Shalu Wellness Mart',
        recommendedFilename: 'camphor-cone-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // Category 6: Gardening & Plant Care
  {
    id: 'prod-011',
    name: 'Organic Vermicompost Soil Conditioner (5kg)',
    slug: 'organic-vermicompost-soil-conditioner-5kg',
    category: 'gardening-plant-care',
    brand: 'Brand TBD',
    mrp: 280,
    price: 230,
    stock: 25,
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Aged earthworm castings rich in organic matter and beneficial micro-organisms.',
    description: 'Fine sieved vermicompost produced from cow dung and farm crop residue. Improves soil aeration, water retention, and supplies natural slow-release plant nutrients to potted plants.',
    ingredients: '100% aged vermicompost castings, sterilized compost base.',
    usage: 'Add 2-3 handfuls around potted plants once every 20 days, gently loosen the topsoil, and water thoroughly.',
    precautions: 'Store bag in a shaded corner away from excessive direct sun to maintain moisture balance.',
    manufacturer: 'Brand TBD',
    expiry: '12 months from bagging',
    images: [
      {
        src: createSvgPlaceholder('Organic Vermicompost 5kg', 'Gardening & Plant Care', '#4D7C0F', 'vermicompost-5kg.jpg', '600 x 600 px'),
        alt: 'Organic Vermicompost Soil Conditioner 5kg - Shalu Wellness Mart',
        recommendedFilename: 'vermicompost-5kg-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },
  {
    id: 'prod-012',
    name: 'Seaweed Extract Garden Spray (250ml)',
    slug: 'seaweed-extract-garden-spray-250ml',
    category: 'gardening-plant-care',
    brand: 'Brand TBD',
    mrp: 295,
    price: 250,
    stock: 11,
    isDemo: true,
    featured: false,
    active: true,
    shortDescription: 'Liquid organic marine algae concentrate for vibrant home garden leaves and blooms.',
    description: 'Naturally harvested brown ascophyllum marine algae concentrate containing natural trace minerals and micronutrients. Perfect for regular foliar misting of balcony flowers and kitchen herbs.',
    ingredients: 'Brown marine algae liquid extract (Ascophyllum nodosum), organic stabilizer.',
    usage: 'Dilute 2 ml in 1 litre of clean water. Mist foliage thoroughly once every fortnight.',
    precautions: 'Keep cap tightly closed. Shake well before diluting with water.',
    manufacturer: 'Brand TBD',
    expiry: '24 months from bottling',
    images: [
      {
        src: createSvgPlaceholder('Seaweed Extract Garden Spray', 'Gardening & Plant Care', '#4D7C0F', 'seaweed-spray.jpg', '600 x 600 px'),
        alt: 'Seaweed Extract Garden Spray 250ml - Shalu Wellness Mart',
        recommendedFilename: 'seaweed-spray-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // ============================================================
  // REAL IMC PRODUCTS (5) - Hindi SEO-friendly content
  // NOTE: mrp / price / stock are PLACEHOLDERS - update with real values.
  // NOTE: Slugs are kept unchanged so existing product URLs keep working.
  // ============================================================

  // IMC - Health Care: Fat Away
  {
    id: 'prod-013',
    name: 'IMC Fat Away (60 Tablets)',
    nameHi: 'IMC फैट अवे (60 टैबलेट)',
    language: 'hi',
    slug: 'imc-fat-away-60-tablets',
    category: 'health-care',
    brand: 'IMC',
    mrp: 999,   // PLACEHOLDER - update
    price: 999, // PLACEHOLDER - update
    stock: 10,  // PLACEHOLDER - update
    isDemo: false,
    featured: true,
    active: true,
    seoTitle: 'IMC फैट अवे 60 टैबलेट – वजन नियंत्रण में सहायक',
    metaDescription: 'IMC फैट अवे टैबलेट वजन कम करने, मेटाबॉलिज्म और ऊर्जा बढ़ाने में सहायक। प्राकृतिक फॉर्मूला, 60 टैबलेट का पैक। आज ही ऑर्डर करें।',
    shortDescription: 'IMC फैट अवे प्राकृतिक फॉर्मूले से बना सप्लीमेंट है, जो वजन नियंत्रण, मेटाबॉलिज्म और ऊर्जा में सहायक है। 60 टैबलेट का पैक।',
    description: 'फिट रहना अब और आसान! IMC फैट अवे आपका फिटनेस पार्टनर है। यह प्राकृतिक फॉर्मूला शरीर में जमा अतिरिक्त चर्बी को कम करने में मदद करता है और मेटाबॉलिज्म बढ़ाकर ऊर्जा खर्च करने में सहायक है। यह अनावश्यक भूख और क्रेविंग को कम करने में भी मदद करता है और दिनभर ऊर्जा और एक्टिव बनाए रखता है। संतुलित आहार और नियमित व्यायाम के साथ रोज़ लेने पर लगभग 60 दिनों में बेहतर बदलाव देखने को मिल सकता है।*',
    features: [
      'वजन कम करने में सहायक',
      'मेटाबॉलिज्म बढ़ाए',
      'भूख को नियंत्रित करे',
      'ऊर्जा बढ़ाए',
      'प्राकृतिक सामग्री',
      'वैज्ञानिक रूप से तैयार फॉर्मूला',
      'भरोसेमंद गुणवत्ता'
    ],
    ingredients: 'प्राकृतिक सामग्री से बना (प्राकृतिक फॉर्मूला)। पूरी सामग्री सूची के लिए कृपया प्रोडक्ट पैक देखें।',
    usage: 'रोज़ लें और फिट रहें। मात्रा पैक पर छपी जानकारी के अनुसार लें।',
    precautions: 'पैक पर दिए गए निर्देश पढ़ें। ठंडी और सूखी जगह पर रखें। बच्चों की पहुंच से दूर रखें। उपयोग से पहले डॉक्टर से सलाह लें।',
    disclaimer: '*परिणाम व्यक्ति के अनुसार अलग हो सकते हैं। उपयोग से पहले डॉक्टर से सलाह लें।',
    keywords: ['फैट अवे टैबलेट', 'वजन कम करने की टैबलेट', 'वेट मैनेजमेंट सप्लीमेंट', 'मेटाबॉलिज्म बूस्टर', 'प्राकृतिक वेट लॉस', 'IMC फैट अवे'],
    tags: ['फैटअवे', 'वेटमैनेजमेंट', 'फिटनेस', 'IMC'],
    manufacturer: 'IMC Herbal (Since 2006)',
    expiry: 'कृपया पैक पर छपी तारीख देखें',
    images: [
      {
        src: 'images/imc-fat-away-01.webp',
        alt: 'IMC फैट अवे 60 टैबलेट - Shalu Wellness Mart',
        recommendedFilename: 'imc-fat-away-01.webp',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Health Care: Shri Tulsi Drops
  {
    id: 'prod-014',
    name: 'IMC Shri Tulsi Drops (20 ml)',
    nameHi: 'IMC श्री तुलसी ड्रॉप (20 ml)',
    language: 'hi',
    slug: 'imc-shri-tulsi-drops-20ml',
    category: 'health-care',
    brand: 'IMC',
    mrp: 250,   // PLACEHOLDER - update
    price: 250, // PLACEHOLDER - update
    stock: 10,  // PLACEHOLDER - update
    isDemo: false,
    featured: true,
    active: true,
    seoTitle: 'IMC श्री तुलसी ड्रॉप 20ml – 5 प्रकार की तुलसी का अर्क',
    metaDescription: 'IMC श्री तुलसी ड्रॉप में है 5 प्रकार की तुलसी का अर्क। इम्युनिटी, श्वसन तंत्र और पाचन के लिए आयुर्वेदिक फॉर्मूला। सभी उम्र के लिए।',
    shortDescription: 'IMC श्री तुलसी ड्रॉप में श्याम, राम, विष्णु, नींबू और वन तुलसी का अर्क है। यह प्राकृतिक आयुर्वेदिक फॉर्मूला इम्युनिटी बढ़ाने और स्वस्थ जीवन में सहायक है।',
    description: 'एक बूंद, अनेक फायदे! IMC श्री तुलसी ड्रॉप 5 प्रकार की तुलसी का अद्भुत संगम है। IMC Herbal का यह आयुर्वेदिक फॉर्मूला परिवार की रोज़ की सेहत का साथी है। श्याम तुलसी इम्युनिटी बढ़ाए, राम तुलसी सर्दी-खांसी में लाभकारी, विष्णु तुलसी तनाव कम करे, नींबू तुलसी पाचन को दुरुस्त करे और वन तुलसी शरीर को डिटॉक्स करे। 100% नेचुरल, शुद्ध आयुर्वेदिक और सभी उम्र के लिए सुरक्षित। स्वस्थ परिवार, खुशहाल जीवन।',
    features: [
      'इम्युनिटी बढ़ाने में सहायक',
      'श्वसन तंत्र को मजबूत करे',
      'पाचन शक्ति बढ़ाए',
      'तनाव कम करे, मन को शांति दे',
      'सर्दी-जुकाम और गले की खराश में उपयोगी',
      'गैस-अपच में लाभकारी',
      'तनाव और थकान में राहत',
      '100% नेचुरल, शुद्ध आयुर्वेदिक'
    ],
    ingredients: '5 प्रकार की तुलसी का अर्क: श्याम तुलसी, राम तुलसी, विष्णु तुलसी, नींबू तुलसी, वन तुलसी।',
    usage: 'मात्रा पैक पर छपी जानकारी के अनुसार लें।',
    precautions: 'ठंडी और सूखी जगह पर रखें। ड्रॉपर की नोक साफ और सूखी रखें। बच्चों की पहुंच से दूर रखें।',
    keywords: ['तुलसी ड्रॉप', 'तुलसी अर्क', 'श्री तुलसी', '5 प्रकार की तुलसी', 'इम्युनिटी बूस्टर ड्रॉप', 'आयुर्वेदिक ड्रॉप', 'सर्दी खांसी की आयुर्वेदिक दवा', 'IMC हर्बल'],
    tags: ['तुलसीड्रॉप', 'आयुर्वेद', 'इम्युनिटी', 'IMC'],
    manufacturer: 'IMC Herbal (Since 2006)',
    expiry: 'कृपया पैक पर छपी तारीख देखें',
        images: [
      {
        src: 'images/imc-shri-tulsi-01.webp',
        alt: 'IMC श्री तुलसी ड्रॉप 20ml पैक - Shalu Wellness Mart',
        recommendedFilename: 'imc-shri-tulsi-01.webp',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Agriculture: Activator Wetter-Spreader
  {
    id: 'prod-015',
    name: 'IMC Activator Wetter-Spreader (500 ml)',
    nameHi: 'IMC एक्टिवेटर वेटर-स्प्रेडर (500 ml)',
    language: 'hi',
    slug: 'imc-activator-wetter-spreader-500ml',
    category: 'agriculture',
    brand: 'IMC',
    mrp: 600,   // PLACEHOLDER - update
    price: 600, // PLACEHOLDER - update
    stock: 10,  // PLACEHOLDER - update
    isDemo: false,
    featured: true,
    active: true,
    seoTitle: 'IMC एक्टिवेटर वेटर-स्प्रेडर 500ml – सिलिकॉन टेक्नोलॉजी',
    metaDescription: 'IMC एक्टिवेटर वेटर-स्प्रेडर से कीटनाशक, फफूंदनाशक और पोषक तत्वों का असर बढ़ाएं। बेहतर फैलाव, ज्यादा चिपकाव। सभी फसलों के लिए उपयोगी।',
    shortDescription: 'IMC एक्टिवेटर रिसर्च बेस्ड सिलिकॉन टेक्नोलॉजी पर आधारित वेटर-स्प्रेडर है। यह छिड़काव को हर पत्ती पर समान रूप से फैलाता है और चिपकाए रखता है, जिससे कम मात्रा में अधिक असर मिलता है।',
    description: 'हर बूंद का असर, फसल में निखार। IMC एक्टिवेटर एक रिसर्च बेस्ड वेटर-स्प्रेडर है, जो सिलिकॉन टेक्नोलॉजी से बना है। पानी में मिलाने पर यह घोल को हर पत्ती पर समान रूप से फैलाता है और पत्तियों पर चिपकाए रखता है, जिससे कीटनाशक, फफूंदनाशक और पोषक तत्वों का असर कई गुना बढ़ता है। इसे धान, गेहूं, गन्ना, कपास, सब्जियां और फलदार पौधों, यानी सभी फसलों में इस्तेमाल किया जा सकता है। स्मार्ट किसान की पहली पसंद।',
    features: [
      'बेहतर फैलाव: हर पत्ती पर समान रूप से फैलता है',
      'चिपकाव बढ़ाए: घोल पत्तियों पर टिका रहता है',
      'प्रभावशीलता बढ़ाए: दवा और पोषक तत्वों का असर बढ़ता है',
      'उपज में वृद्धि में सहायक: स्वस्थ पौधे, बेहतर विकास',
      'कम मात्रा, अधिक प्रभाव',
      'रिसर्च आधारित सिलिकॉन टेक्नोलॉजी'
    ],
    crops: ['धान', 'गेहूं', 'गन्ना', 'कपास', 'सब्जियां', 'फलदार पौधे'],
    ingredients: 'रिसर्च बेस्ड सिलिकॉन टेक्नोलॉजी (वेटर-स्प्रेडर)। पूरी सामग्री सूची के लिए कृपया प्रोडक्ट पैक देखें।',
    usage: '1–2 ml एक्टिवेटर प्रति 15 लीटर पानी में मिलाकर छिड़काव करें। इसे कीटनाशक, फफूंदनाशक या पोषक तत्व के साथ मिलाकर उपयोग करें।',
    precautions: 'केवल कृषि उपयोग के लिए। बच्चों और पालतू जानवरों की पहुंच से दूर रखें। उपयोग से पहले पैक पर दिए निर्देश पढ़ें।',
    keywords: ['वेटर स्प्रेडर', 'स्प्रेडर स्टिकर', 'सिलिकॉन स्प्रेडर', 'कीटनाशक का असर बढ़ाने वाला', 'फसल स्प्रे एडजुवेंट', 'IMC एक्टिवेटर', 'खेती के उत्पाद ऑनलाइन'],
    tags: ['एक्टिवेटर', 'वेटरस्प्रेडर', 'खेती', 'IMC'],
    manufacturer: 'IMC',
    expiry: 'कृपया पैक पर छपी तारीख देखें',
        images: [
      {
        src: 'images/imc-activator-500ml-01.webp',
        alt: 'IMC एक्टिवेटर वेटर-स्प्रेडर 500ml - Shalu Wellness Mart',
        recommendedFilename: 'imc-activator-500ml-01.webp',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Home & Lifestyle: Detergent Powder
  {
    id: 'prod-016',
    name: 'IMC Detergent Powder (1 Kg)',
    nameHi: 'IMC डिटर्जेंट पाउडर (1 Kg)',
    language: 'hi',
    slug: 'imc-detergent-powder-1kg',
    category: 'home-lifestyle',
    brand: 'IMC',
    mrp: 120,   // PLACEHOLDER - update
    price: 120, // PLACEHOLDER - update
    stock: 20,  // PLACEHOLDER - update
    isDemo: false,
    featured: false,
    active: true,
    seoTitle: 'IMC डिटर्जेंट पाउडर 1 Kg – दाग हटाए, खुशबू रहे',
    metaDescription: 'IMC डिटर्जेंट पाउडर 1 Kg: पावरफुल स्टेन रिमूवर, लंबे समय तक खुशबू, मशीन और हाथ दोनों के लिए उपयुक्त। कम मात्रा में ज्यादा सफाई।',
    shortDescription: 'IMC डिटर्जेंट पाउडर में पावरफुल स्टेन रिमूवर है, जो कठिन दाग हटाता है और कपड़ों में ताज़गी भरी खुशबू छोड़ता है। मशीन और हाथ दोनों के लिए उपयुक्त।',
    description: 'सफाई जो दिखे, खुशबू जो रहे! IMC डिटर्जेंट पाउडर पावरफुल स्टेन रिमूवर से भरपूर है और कठिन दागों को बेहतरीन तरीके से हटाता है। इसकी खुशबू लंबे समय तक कपड़ों में ताज़गी बनाए रखती है। ज्यादा झाग से सफाई दमदार होती है, और कम मात्रा में ज्यादा सफाई मिलने से यह किफायती भी है। मशीन और हाथ, दोनों धुलाई के लिए बेहतरीन, और रंग व कपड़े की क्वालिटी को बनाए रखता है। स्वच्छ कपड़े, स्वस्थ परिवार।',
    features: [
      'दाग आसानी से हटाए',
      'खुशबू लंबे समय तक रहे',
      'मशीन और हाथ दोनों के लिए उपयुक्त',
      'कपड़ों को सुरक्षा, रंग और क्वालिटी बरकरार',
      'कम मात्रा में ज्यादा सफाई',
      'ज्यादा झाग, दमदार सफाई',
      'किफायती और उपयोगी',
      'पर्यावरण के लिए बेहतर विकल्प'
    ],
    ingredients: 'पावरफुल स्टेन रिमूवर से भरपूर। पूरी सामग्री सूची के लिए कृपया प्रोडक्ट पैक देखें।',
    usage: 'मशीन वॉश और हैंड वॉश दोनों के लिए उपयुक्त। मात्रा पैक पर दिए निर्देशों के अनुसार लें।',
    precautions: 'बच्चों की पहुंच से दूर रखें। आंखों के संपर्क से बचें। सूखी जगह पर रखें।',
    keywords: ['डिटर्जेंट पाउडर', 'कपड़े धोने का पाउडर', 'स्टेन रिमूवर डिटर्जेंट', 'वाशिंग पाउडर 1 kg', 'खुशबूदार डिटर्जेंट', 'IMC डिटर्जेंट'],
    tags: ['डिटर्जेंटपाउडर', 'वाशिंगपाउडर', 'IMC'],
    manufacturer: 'IMC',
    expiry: 'कृपया पैक पर छपी तारीख देखें',
        images: [
      {
        src: 'images/imc-detergent-1kg-01.jpg',
        alt: 'IMC डिटर्जेंट पाउडर 1 Kg - Shalu Wellness Mart',
        recommendedFilename: 'imc-detergent-1kg-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Wellness & Nutrition: Power Shaker
  {
    id: 'prod-017',
    name: 'IMC Power Shaker',
    nameHi: 'IMC पावर शेकर',
    language: 'hi',
    slug: 'imc-power-shaker',
    category: 'wellness-nutrition',
    brand: 'IMC',
    mrp: 299,   // PLACEHOLDER - update
    price: 299, // PLACEHOLDER - update
    stock: 15,  // PLACEHOLDER - update
    isDemo: false,
    featured: false,
    active: true,
    seoTitle: 'IMC पावर शेकर बॉटल – लीक प्रूफ, BPA फ्री जिम शेकर',
    metaDescription: 'जिम और स्पोर्ट्स के लिए IMC पावर शेकर खरीदें। लीक प्रूफ डिज़ाइन, बेहतर मिक्सिंग, BPA फ्री और आसान सफाई। हर घूँट में एनर्जी पाएं।',
    shortDescription: 'IMC पावर शेकर एक ट्रेंडी, हल्का और टिकाऊ शेकर है, जो जिम और स्पोर्ट्स के लिए बनाया गया है। इसका लीक प्रूफ ढक्कन और बेहतर मिक्सिंग डिज़ाइन हर बार स्मूद शेक तैयार करता है।',
    description: 'हर घूँट में एनर्जी चाहिए, तो IMC पावर शेकर आपका परफेक्ट हेल्थ पार्टनर है। यह BPA फ्री और सुरक्षित मटीरियल से बना है, इसलिए रोज़ इस्तेमाल के लिए भरोसेमंद है। इसका एर्गोनोमिक डिज़ाइन हाथ में आसानी से पकड़ में आता है और वज़न में हल्का होने से जिम बैग में रखना आसान है। लीक प्रूफ ढक्कन से सफर में भी बैग गीला होने की चिंता नहीं रहती। बेहतर मिक्सिंग डिज़ाइन से पाउडर गुठलियों के बिना घुलता है, और सफाई भी आसान है। जिम जाने वालों, खिलाड़ियों और फिटनेस पसंद करने वालों के लिए एक स्टाइलिश साथी।',
    features: [
      'लीक प्रूफ डिज़ाइन',
      'हर बार बेहतर मिक्सिंग',
      '100% BPA फ्री और सुरक्षित',
      'आसान सफाई',
      'एर्गोनोमिक, टिकाऊ और हल्का',
      'जिम और स्पोर्ट्स के लिए आदर्श',
      'ट्रेंडी लुक, आसान कैरी'
    ],
    ingredients: 'BPA फ्री मटीरियल (शेकर बोतल - लागू नहीं)।',
    usage: 'प्रोटीन या हेल्थ ड्रिंक पाउडर और पानी/दूध डालें, ढक्कन बंद करें और अच्छी तरह हिलाएं। जिम और स्पोर्ट्स के लिए उपयुक्त।',
    precautions: 'हर इस्तेमाल के बाद साफ करें। गर्म तरल पदार्थ डालने से बचें।',
    keywords: ['पावर शेकर', 'जिम शेकर बॉटल', 'प्रोटीन शेकर', 'BPA फ्री शेकर', 'लीक प्रूफ शेकर बॉटल', 'IMC शेकर', 'स्पोर्ट्स शेकर', 'शेकर बोतल ऑनलाइन'],
    tags: ['पावरशेकर', 'जिमशेकर', 'प्रोटीनशेकर', 'IMC'],
    manufacturer: 'IMC',
    expiry: 'लागू नहीं',
        images: [
      {
        src: 'images/imc-power-shaker-01.webp',
        alt: 'IMC पावर शेकर बॉटल - Shalu Wellness Mart',
        recommendedFilename: 'imc-power-shaker-01.webp',
        recommendedSize: '600x600px'
      }
    ]
    
  }
];

if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}
