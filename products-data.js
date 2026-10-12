/**
 * SHALU WELLNESS MART - PRODUCTS DATA (PHASE 1 DATA STORE)
 * 12 Clearly Labelled Demo Products + 5 Real IMC Products Across 6 Categories.
 * Fields: id, name, slug, category, brand, mrp, price, stock,
 * shortDescription, description, ingredients, usage, precautions,
 * manufacturer, expiry, featured, active, images.
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
  // REAL IMC PRODUCTS (descriptions taken from product creatives, in English)
  // NOTE: mrp / price / stock are PLACEHOLDERS - update with real values.
  // ============================================================

  // IMC - Health Care: Fat Away
  {
    id: 'prod-013',
    name: 'IMC Fat Away (60 Tablets)',
    slug: 'imc-fat-away-60-tablets',
    category: 'health-care',
    brand: 'IMC',
    mrp: 999,   // PLACEHOLDER - update
    price: 999, // PLACEHOLDER - update
    stock: 10,  // PLACEHOLDER - update
    isDemo: false,
    featured: true,
    active: true,
    shortDescription: 'FAT AWAY - Your Fitness Partner. Natural formula, better results. Take daily, stay fit always!',
    description: 'Staying fit just got easier! Say goodbye to fat and hello to yourself! FAT AWAY - Your Fitness Partner. Helps with weight management: helps reduce excess fat stored in the body. Boosts metabolism: helps the body burn more energy by improving metabolism. Controls appetite: helps reduce unnecessary hunger and cravings. Boosts energy: keeps you energetic and active all day. Natural and safe: made from natural ingredients, without any harm. See better changes in just 60 days!* Why choose FAT AWAY? Natural ingredients | No side effects | Scientifically developed formula | Trusted quality | Trusted by thousands of satisfied customers. Fit body, healthy life - start today! Get a better, lighter and healthier life!',
    ingredients: 'Made from natural ingredients (natural formula). Please see the product pack for the complete ingredient list.',
    usage: 'Take daily and stay fit always! (Stay Fit & Light). Dosage as per the information printed on the product pack.',
    precautions: '*Results may vary from person to person. Read the instructions on the product pack. Store in a cool, dry place.',
    manufacturer: 'IMC Herbal (Since 2006)',
    expiry: 'Please check the date printed on the pack',
    images: [
      {
        src: createSvgPlaceholder('IMC Fat Away 60 Tablets', 'Health Care', '#166534', 'imc-fat-away.jpg', '600 x 600 px'),
        alt: 'IMC Fat Away 60 Tablets - Shalu Wellness Mart',
        recommendedFilename: 'imc-fat-away-01.webp',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Health Care: Shri Tulsi Drops
  {
    id: 'prod-014',
    name: 'IMC Shri Tulsi Drops (20 ml)',
    slug: 'imc-shri-tulsi-drops-20ml',
    category: 'health-care',
    brand: 'IMC',
    mrp: 250,   // PLACEHOLDER - update
    price: 250, // PLACEHOLDER - update
    stock: 10,  // PLACEHOLDER - update
    isDemo: false,
    featured: true,
    active: true,
    shortDescription: 'WORLD BEST Tulsi Drops - a wonderful blend of 5 types of Tulsi. One drop, many benefits!',
    description: 'Tulsi Drops - a wonderful blend of 5 types of Tulsi. 5 Types of Tulsi: Shyam Tulsi (boosts immunity), Ram Tulsi (beneficial in cold and cough), Vishnu Tulsi (reduces stress), Nimbu Tulsi (improves digestion), Van Tulsi (detoxifies the body). Natural protection, a companion for a healthy life: boosts immunity, strengthens the respiratory system, improves digestive strength, reduces stress and brings peace of mind. One drop, many benefits! Helpful in cold and flu, useful for sore throat, boosts immunity, improves digestion, beneficial in gas and indigestion, gives relief from stress and fatigue. 100% Natural & Safe. Ayurvedic Trusted Formula. Pure Ayurvedic | No side effects | Safe for all ages. Healthy family, happy life.',
    ingredients: 'Extract of 5 Types of Tulsi - Shyam Tulsi, Ram Tulsi, Vishnu Tulsi, Nimbu Tulsi, Van Tulsi.',
    usage: 'Dosage as per the information printed on the product pack.',
    precautions: 'Store in a cool, dry place. Keep the dropper tip clean and dry. Keep out of reach of children.',
    manufacturer: 'IMC Herbal (Since 2006)',
    expiry: 'Please check the date printed on the pack',
    images: [
      {
        src: createSvgPlaceholder('IMC Shri Tulsi Drops 20ml', 'Health Care', '#166534', 'imc-shri-tulsi-drops.jpg', '600 x 600 px'),
        alt: 'IMC Shri Tulsi Drops 20ml - Shalu Wellness Mart',
        recommendedFilename: 'imc-shri-tulsi-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Agriculture: Activator Wetter-Spreader
  {
    id: 'prod-015',
    name: 'IMC Activator Wetter-Spreader (500 ml)',
    slug: 'imc-activator-wetter-spreader-500ml',
    category: 'agriculture',
    brand: 'IMC',
    mrp: 600,   // PLACEHOLDER - update
    price: 600, // PLACEHOLDER - update
    stock: 10,  // PLACEHOLDER - update
    isDemo: false,
    featured: true,
    active: true,
    shortDescription: 'The impact of every drop, a glow in your crop - better spread, higher yield. Research Based - Silicon Technology.',
    description: 'ACTIVATOR Wetter-Spreader - Research Based, Silicon Technology. The impact of every drop, a glow in your crop. Better spread, higher yield. Better spread: mixes with water and spreads evenly on every leaf. Increases adhesion: keeps the spray solution stuck on the leaves for greater effect. Boosts effectiveness: multiplies the effect of pesticides, fungicides and nutrients. Increases yield: ensures healthy plants, better growth and higher produce. Useful for all crops: paddy, wheat, sugarcane, cotton, vegetables, fruit plants. Low dose, high impact | Safe and reliable | Better results, the farmer\'s identity | Research-based silicon technology. The first choice of the smart farmer - with ACTIVATOR, your crop will be magnificent!',
    ingredients: 'Research Based Silicon Technology (Wetter-Spreader). Please see the product pack for the complete ingredient list.',
    usage: 'Mix 1-2 ml of ACTIVATOR per 15 litres of water and spray. Use mixed with pesticide / fungicide / nutrients.',
    precautions: 'For agricultural use only. Keep out of reach of children and pets. Read the instructions on the pack before use.',
    manufacturer: 'IMC',
    expiry: 'Please check the date printed on the pack',
    images: [
      {
        src: createSvgPlaceholder('IMC Activator Wetter-Spreader', 'Agriculture', '#15803D', 'imc-activator-500ml.jpg', '600 x 600 px'),
        alt: 'IMC Activator Wetter-Spreader 500ml - Shalu Wellness Mart',
        recommendedFilename: 'imc-activator-500ml-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Home & Lifestyle: Detergent Powder
  {
    id: 'prod-016',
    name: 'IMC Detergent Powder (1 Kg)',
    slug: 'imc-detergent-powder-1kg',
    category: 'home-lifestyle',
    brand: 'IMC',
    mrp: 120,   // PLACEHOLDER - update
    price: 120, // PLACEHOLDER - update
    stock: 20,  // PLACEHOLDER - update
    isDemo: false,
    featured: false,
    active: true,
    shortDescription: 'Cleanliness you can see, fragrance that stays! Enriched With Powerful Stain Remover.',
    description: 'NEW Detergent Powder - cleanliness you can see, fragrance that stays! Enriched With Powerful Stain Remover. Removes stains easily: removes tough stains in the best way. Fragrance that lasts long: gives your clothes a feeling of freshness and fragrance. Suitable for both machine and hand wash: great for every type of wash. Protects your clothes: maintains the color and quality of the fabric. More cleaning in less quantity. Helps remove up to 99% germs | A better choice for the environment | More foam, powerful cleaning | Economical and useful. Better cleaning every time. Clean clothes, healthy family.',
    ingredients: 'Enriched With Powerful Stain Remover. Please see the product pack for the complete ingredient list.',
    usage: 'Suitable for both machine wash and hand wash. Quantity to be used as per the instructions on the pack.',
    precautions: 'Keep out of reach of children. Avoid contact with eyes. Store in a dry place.',
    manufacturer: 'IMC',
    expiry: 'Please check the date printed on the pack',
    images: [
      {
        src: createSvgPlaceholder('IMC Detergent Powder 1 Kg', 'Home & Lifestyle', '#1E3A8A', 'imc-detergent-1kg.jpg', '600 x 600 px'),
        alt: 'IMC Detergent Powder 1 Kg - Shalu Wellness Mart',
        recommendedFilename: 'imc-detergent-1kg-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  },

  // IMC - Wellness & Nutrition: Power Shaker
  {
    id: 'prod-017',
    name: 'IMC Power Shaker',
    slug: 'imc-power-shaker',
    category: 'wellness-nutrition',
    brand: 'IMC',
    mrp: 299,   // PLACEHOLDER - update
    price: 299, // PLACEHOLDER - update
    stock: 15,  // PLACEHOLDER - update
    isDemo: false,
    featured: false,
    active: true,
    shortDescription: 'Energy in every sip, every day with POWER SHAKER - your perfect health partner! 100% Premium Quality.',
    description: 'Energy in every sip, make every day a POWER SHAKER day - your perfect health partner! Leak-proof design | Better mixing every time | BPA FREE and SAFE | Easy to clean | Trendy look and easy to carry. Ergonomic Design, Durable & Lightweight, Ideal for Gym & Sports. ENERGY BOOST | MUSCLE SUPPORT | PERFORMANCE ENHANCER. MOVE BETTER, FEEL STRONGER, LIVE HEALTHIER. 100% Premium Quality. Healthy life, happy life.',
    ingredients: 'BPA Free material (shaker bottle - not applicable).',
    usage: 'Add protein or health drink powder and water/milk, close the lid and shake well. Suitable for gym and sports.',
    precautions: 'Clean after every use. Avoid pouring hot liquids.',
    manufacturer: 'IMC',
    expiry: 'Not applicable',
    images: [
      {
        src: createSvgPlaceholder('IMC Power Shaker', 'Wellness & Nutrition', '#047857', 'imc-power-shaker.jpg', '600 x 600 px'),
        alt: 'IMC Power Shaker - Shalu Wellness Mart',
        recommendedFilename: 'imc-power-shaker-01.jpg',
        recommendedSize: '600x600px'
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}
