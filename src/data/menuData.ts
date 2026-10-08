export type Category = { id: string; en: string; ar: string };

export type MenuItem = {
  id: number;
  categoryId: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: string;
  numericPrice: number;
  badge?: string;
  image: string;
};

export const categories: Category[] = [
  { id: "soups", ar: "الشوربات", en: "Soups" },
  { id: "salads", ar: "السلطات", en: "Salads" },
  { id: "appetizers", ar: "المقبلات", en: "Appetizers" },
  { id: "manakiesh", ar: "المناقيش", en: "Manakiesh" },
  { id: "main_courses", ar: "الأطباق الرئيسية", en: "Main Courses" },
  { id: "grills", ar: "المشاوي", en: "Grills" },
  { id: "sandwiches", ar: "الساندويشات", en: "Sandwiches" },
  { id: "pizza", ar: "البيتزا", en: "Pizza" },
  { id: "pasta", ar: "الباستا", en: "Pasta" },
  { id: "signature_hot_chocolate", ar: "الشوكولاتة الساخنة", en: "Hot Chocolate" },
  { id: "signature_frozen_mojito", ar: "الموهيتو المجمد", en: "Frozen Mojito" },
  { id: "hot_coffee", ar: "المشروبات الساخنة", en: "Hot Coffee & Drinks" },
  { id: "spanish_latte", ar: "سبانيش لاتيه", en: "Spanish Latte" },
  { id: "smoothies", ar: "سموثي", en: "Smoothies" },
  { id: "iced_coffee", ar: "القهوة الباردة", en: "Iced Coffee" },
  { id: "mojito", ar: "موهيتو", en: "Mojito" },
  { id: "soft_drinks", ar: "المشروبات الباردة", en: "Soft Drinks" },
  { id: "matcha", ar: "ماتشا", en: "Matcha" },
  { id: "tobacco", ar: "تمباك", en: "Tobacco" }
];

export const menuItems: MenuItem[] = [
  // --- Soups ---
  { id: 101, categoryId: "soups", name: { ar: "مشروم", en: "Mushroom" }, description: { ar: "", en: "" }, numericPrice: 20, price: "₪20", image: "/dishes/soup.jpg" },
  { id: 102, categoryId: "soups", name: { ar: "بروكلي", en: "Broccoli" }, description: { ar: "", en: "" }, numericPrice: 23, price: "₪23", image: "/dishes/soup.jpg" },
  { id: 103, categoryId: "soups", name: { ar: "فريكة", en: "Freekeh" }, description: { ar: "", en: "" }, numericPrice: 18, price: "₪18", image: "/dishes/soup.jpg" },
  { id: 104, categoryId: "soups", name: { ar: "فواكة البحر", en: "Seafood" }, description: { ar: "", en: "" }, numericPrice: 25, price: "₪25", image: "/dishes/soup.jpg" },
  { id: 105, categoryId: "soups", name: { ar: "خضار", en: "Vegetable" }, description: { ar: "", en: "" }, numericPrice: 15, price: "₪15", image: "/dishes/soup.jpg" },

  // --- Salads ---
  { id: 201, categoryId: "salads", name: { ar: "تبولة لبنانية", en: "Lebanese Tabula" }, description: { ar: "بقدونس، خيار، بندورة، برغل، نعنع", en: "Parsley, cucumber, tomato, bulgur, mint" }, numericPrice: 25, price: "₪25", image: "/dishes/salad.jpg" },
  { id: 202, categoryId: "salads", name: { ar: "سلطة السيزر", en: "Caesar Salad" }, description: { ar: "خس، بندورة، خبز محمص، جبنة مبروشة، صلصة خاصة بالشيف", en: "Lettuce, tomato, croutons, grated cheese, chef's special sauce" }, numericPrice: 30, price: "₪30", image: "/dishes/salad.jpg" },
  { id: 203, categoryId: "salads", name: { ar: "سلطة جرجير", en: "Rocca Salad" }, description: { ar: "جرجير، بندورة شيري، ماشروم، سماق", en: "Rocca, cherry tomatoes, mushroom, sumac" }, numericPrice: 23, price: "₪23", image: "/dishes/salad.jpg" },
  { id: 204, categoryId: "salads", name: { ar: "سلطة فيردي", en: "Verde Salad" }, description: { ar: "خس، بندورة، جبنة مقرمشة", en: "Lettuce, tomato, crispy cheese" }, numericPrice: 28, price: "₪28", image: "/dishes/salad.jpg" },
  { id: 205, categoryId: "salads", name: { ar: "سلطة كينوا", en: "Quinoa Salad" }, description: { ar: "كينوا ملونة، فليفلة، ماشروم، بندورة، مكسرات، الصوص الخاص", en: "Colored quinoa, peppers, mushroom, tomatoes, nuts, special sauce" }, numericPrice: 28, price: "₪28", image: "/dishes/salad.jpg" },
  { id: 206, categoryId: "salads", name: { ar: "فتوش", en: "Fattoosh" }, description: { ar: "فليفلة ملونة، بصل، فجل، خس، بندورة، خبز مقرمش، سماق", en: "Peppers, onion, radish, lettuce, tomato, crispy bread, sumac" }, numericPrice: 28, price: "₪28", image: "/dishes/salad.jpg" },
  { id: 207, categoryId: "salads", name: { ar: "سلطة يونانية", en: "Greek Salad" }, description: { ar: "خس، جرجير، خيار، بندورة، فليفلة، زيتون اسود، جبنة", en: "Lettuce, rocca, cucumber, tomato, peppers, black olives, cheese" }, numericPrice: 28, price: "₪28", image: "/dishes/salad.jpg" },
  { id: 208, categoryId: "salads", name: { ar: "سلطة معكرونة", en: "Pasta Salad" }, description: { ar: "معكرونة، فليفلة، دجاج مشوي، خس، ماشروم، الصوص الخاص", en: "Pasta, peppers, grilled chicken, lettuce, mushroom, special sauce" }, numericPrice: 25, price: "₪25", badge: "NEW", image: "/dishes/salad.jpg" },
  { id: 209, categoryId: "salads", name: { ar: "سلطة البوراتا", en: "Burrata Salad" }, description: { ar: "عجين بالفرن، جرجير، تين موسمي، جبنة البوراتا، الصوص الخاص", en: "Oven baked dough, rocca, seasonal figs, burrata cheese, special sauce" }, numericPrice: 56, price: "₪56", image: "/dishes/salad.jpg" },

  // --- Appetizers ---
  { id: 301, categoryId: "appetizers", name: { ar: "تاكوز مكسيكي", en: "Mexican Tacos" }, description: { ar: "دجاج، صوص مكسيكان، خس، مخلل، افوكادو", en: "Chicken, Mexican sauce, lettuce, pickles, avocado" }, numericPrice: 30, price: "₪30", image: "/dishes/app.jpg" },
  { id: 302, categoryId: "appetizers", name: { ar: "أصابع موزريال", en: "Mozzarella Sticks" }, description: { ar: "7 قطع", en: "7 pcs" }, numericPrice: 27, price: "₪27", image: "/dishes/app.jpg" },
  { id: 303, categoryId: "appetizers", name: { ar: "جمبري بانيه", en: "Shrimps Pane" }, description: { ar: "9 قطع", en: "9 pcs" }, numericPrice: 75, price: "₪75", image: "/dishes/app.jpg" },
  { id: 304, categoryId: "appetizers", name: { ar: "تشكن كرسبي فرايز", en: "Chicken Crispy Fries" }, description: { ar: "", en: "" }, numericPrice: 35, price: "₪35", image: "/dishes/app.jpg" },
  { id: 305, categoryId: "appetizers", name: { ar: "مقبلات اليوم", en: "Today's Appetizers" }, description: { ar: "اسأل النادل عن صحن اليوم", en: "Ask the waiter for the dish of the day" }, numericPrice: 65, price: "₪65", image: "/dishes/app.jpg" },
  
  // --- Manakiesh ---
  { id: 401, categoryId: "manakiesh", name: { ar: "فوكاتشا بيستو", en: "Focaccia Pesto" }, description: { ar: "", en: "" }, numericPrice: 25, price: "₪25", image: "/dishes/mana.jpg" },
  { id: 402, categoryId: "manakiesh", name: { ar: "لحم بالعجين", en: "Meat Dough" }, description: { ar: "", en: "" }, numericPrice: 30, price: "₪30", image: "/dishes/mana.jpg" },
  
  // --- Main Courses ---
  { id: 501, categoryId: "main_courses", name: { ar: "لحم عجل فيليه بالديمي غلاس", en: "Beef Steak With Demi Glace" }, description: { ar: "لحم عجل فيليه 300غم، خضار سوتيه، بطاطا مهروسة، صلصة الديمي غلاس", en: "Beef fillet 300g, sautéed veggies, mashed potatoes, demi-glace sauce" }, numericPrice: 97, price: "₪97", image: "/dishes/main.jpg" },
  { id: 502, categoryId: "main_courses", name: { ar: "فاير بيف ستيك", en: "Fire Beef Steak" }, description: { ar: "لحم عجل فيليه، خضار سوتيه، بطاطا مهروسة", en: "Beef fillet, sautéed veggies, mashed potatoes" }, numericPrice: 120, price: "₪120", badge: "Best Seller", image: "/dishes/main.jpg" },
  { id: 503, categoryId: "main_courses", name: { ar: "سبيشل فاير سيفود مكس", en: "Special Fire Seafood Mix" }, description: { ar: "جمبري، كالماري، محار، صلصة الشيف الخاصة", en: "Shrimps, calamari, oysters, chef's special sauce" }, numericPrice: 110, price: "₪110", image: "/dishes/main.jpg" },
  { id: 504, categoryId: "main_courses", name: { ar: "سوبريم فيليه عجل مع كبدة الأوز", en: "Supreme Beef Fillet With Goose Liver" }, description: { ar: "فيليه عجل، كبدة أوز، خضار، بطاطا، صلصة كبدة الأوز", en: "Beef fillet, goose liver, veggies, potatoes, goose liver sauce" }, numericPrice: 160, price: "₪160", image: "/dishes/main.jpg" },
  { id: 505, categoryId: "main_courses", name: { ar: "سالمون فيليه", en: "Salmon Fillet" }, description: { ar: "تقدم مع خضار سوتيه وبطاطا مهروسة", en: "Served with sautéed veggies and mashed potatoes" }, numericPrice: 85, price: "₪85", image: "/dishes/main.jpg" },
  { id: 506, categoryId: "main_courses", name: { ar: "أخطبوط", en: "Octopus" }, description: { ar: "480غم من لحم الأخطبوط مع صوص الثوم والليمون", en: "480gm of octopus meat with garlic and lemon sauce" }, numericPrice: 150, price: "₪150", image: "/dishes/main.jpg" },

  // --- Grills ---
  { id: 601, categoryId: "grills", name: { ar: "مشكل", en: "Mix" }, description: { ar: "", en: "" }, numericPrice: 95, price: "₪95", image: "/dishes/grill.jpg" },
  { id: 602, categoryId: "grills", name: { ar: "ريش", en: "Ribs" }, description: { ar: "", en: "" }, numericPrice: 90, price: "₪90", image: "/dishes/grill.jpg" },
  { id: 603, categoryId: "grills", name: { ar: "ريكسوس بحري", en: "Rexox Seafood" }, description: { ar: "اسأل النادل عن الأسماك الطازجة اليومية", en: "Ask the waiter for the daily fresh fish" }, numericPrice: 80, price: "₪80", image: "/dishes/grill.jpg" },

  // --- Sandwiches ---
  { id: 701, categoryId: "sandwiches", name: { ar: "بيف إن باسادور ساندويش", en: "Beef In Passador Sandwich" }, description: { ar: "لحمة فيليه، فطر، وايت صوص، جبنة بارميزان", en: "Beef fillet, mushroom, white sauce, parmesan cheese" }, numericPrice: 35, price: "₪35", image: "/dishes/sand.jpg" },
  { id: 702, categoryId: "sandwiches", name: { ar: "مكسيكان برجر", en: "Mexican Burger" }, description: { ar: "بصل مقرمش، صلصة مكسيكان، جبنة", en: "Crispy onion, Mexican sauce, cheese" }, numericPrice: 35, price: "₪35", image: "/dishes/sand.jpg" },

  // --- Pizza ---
  { id: 801, categoryId: "pizza", name: { ar: "بوراتا بيتزا", en: "Burrata Pizza" }, description: { ar: "", en: "" }, numericPrice: 57, price: "₪57", image: "/dishes/pizza.jpg" },
  { id: 802, categoryId: "pizza", name: { ar: "سوبريم مكس بيتزا", en: "Supreme Mix Pizza" }, description: { ar: "", en: "" }, numericPrice: 47, price: "₪47", image: "/dishes/pizza.jpg" },

  // --- Pasta ---
  { id: 901, categoryId: "pasta", name: { ar: "فيتوتشيني فواكه البحر", en: "Seafood Fettuccine" }, description: { ar: "", en: "" }, numericPrice: 54, price: "₪54", image: "/dishes/pasta.jpg" },
  { id: 902, categoryId: "pasta", name: { ar: "لازانيا عجل", en: "Beef Lasagna" }, description: { ar: "", en: "" }, numericPrice: 55, price: "₪55", image: "/dishes/pasta.jpg" },

  // --- Drinks & Desserts (Samples to keep file optimized) ---
  { id: 1001, categoryId: "signature_hot_chocolate", name: { ar: "باريسيان هوت شوكوليت", en: "Parisian Hot Chocolate" }, description: { ar: "", en: "" }, numericPrice: 25, price: "₪25", image: "/dishes/drink.jpg" },
  { id: 1101, categoryId: "mojito", name: { ar: "موهيتو إنرجي", en: "Energy Mojito" }, description: { ar: "", en: "" }, numericPrice: 22, price: "₪22", image: "/dishes/drink.jpg" },
  { id: 1201, categoryId: "hot_coffee", name: { ar: "اسبريسو", en: "Espresso" }, description: { ar: "", en: "" }, numericPrice: 10, price: "₪10", image: "/dishes/drink.jpg" },
  { id: 1301, categoryId: "tobacco", name: { ar: "ريكسوس مكس", en: "Rexos Mix" }, description: { ar: "", en: "" }, numericPrice: 40, price: "₪40", image: "/dishes/shisha.jpg" },
];