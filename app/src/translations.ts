import type { Language } from './types/game';

const translations = {
  en: {
    // Navigation
    nav: {
      games: 'Games',
      howToBuy: 'How to Buy',
      paymentMethods: 'Payment Methods',
      contactUs: 'Contact Us',
      cart: 'Cart',
    },
    // Hero
    hero: {
      eyebrow: "EGYPT'S PREMIER GAME STORE",
      title: 'VOLT\nGAME STORE',
      subtitle: 'Buy Steam games with Egyptian Pound. 181+ titles.',
      cta: 'BROWSE GAMES',
      stats: {
        games: 'Steam Games',
        paymentMethods: 'Payment Methods',
        support: 'Support',
      },
    },
    // Games Section
    games: {
      title: 'ALL GAMES',
      searchPlaceholder: 'Search games...',
      sortBy: 'Sort by',
      sortOptions: {
        popular: 'Popular',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        discount: 'Discount',
      },
      addToCart: 'ADD TO CART',
      inCart: 'IN CART',
      delivery: 'Account Delivery',
    },
    // Game Detail
    detail: {
      steamPage: 'View on Steam',
      save: 'Save',
      offerEnds: 'Offer ends',
      addToCart: 'ADD TO CART',
      platform: 'Platform',
      region: 'Region',
      delivery: 'Delivery',
      type: 'Type',
      views: 'views',
      likes: 'likes',
    },
    // Cart
    cart: {
      title: 'YOUR CART',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      checkout: 'CHECKOUT',
      remove: 'Remove',
      item: 'item',
      items: 'items',
    },
    // Checkout
    checkout: {
      title: 'CHECKOUT',
      orderSummary: 'Order Summary',
      paymentMethod: 'Payment Method',
      vodafoneCash: 'Vodafone Cash',
      binancePay: 'Binance Pay',
      instapay: 'InstaPay',
      comingSoon: 'COMING SOON',
      payWithVodafone: 'Send payment to 01080590462 via Vodafone Cash',
      payWithBinance: 'Scan the QR code with Binance Pay',
      instapayComing: 'Coming soon! Stay tuned for instant bank transfers.',
      warningTitle: 'Important!',
      warningText: 'Your Steam account must be a Ukraine region account or a fresh account without any purchased games for more info contact us.',
      ivePaid: "I'VE PAID",
      successTitle: 'Last step',
      successMessage: "Contact us on whatsapp or discord send the receipt the game you wanted and your steam user.",
      contactWhatsApp: 'Contact on WhatsApp',
      contactDiscord: 'Contact on Discord',
    },
    // How to Buy
    howToBuy: {
      title: 'HOW TO BUY',
      steps: [
        { title: 'Choose Game', desc: 'Browse our catalog, pick your game, and add it to cart.' },
        { title: 'Checkout', desc: 'Review your cart and choose your payment method.' },
        { title: 'Get Your Game', desc: 'After payment confirmation, receive your Steam key within minutes.' },
      ],
    },
    // Payment Methods
    payment: {
      title: 'PAYMENT METHODS',
      vodafoneDesc: 'Transfer to 01080590462',
      instapayDesc: 'Coming soon! Stay tuned for instant bank transfers.',
      binanceDesc: 'Pay with crypto',
    },
    // Contact
    contact: {
      title: 'CONTACT US',
      desc: 'Have questions? Reach out to us on WhatsApp or Discord.',
      whatsapp: '01080590462',
      discord: 'omar400n',
    },
    // Footer
    footer: {
      tagline: "Egypt's premier Steam game store.",
      copyright: '2025 Volt Game Store. All rights reserved.',
    },
    // Language
    lang: {
      en: 'English',
      ar: 'Arabic',
    },
  },
  ar: {
    // Navigation
    nav: {
      games: 'الألعاب',
      howToBuy: 'كيفية الشراء',
      paymentMethods: 'طرق الدفع',
      contactUs: 'اتصل بنا',
      cart: 'السلة',
    },
    // Hero
    hero: {
      eyebrow: 'أفضل متجر ألعاب في مصر',
      title: 'VOLT\nمتجر الألعاب',
      subtitle: 'اشترِ ألعاب Steam بالجنيه المصري. أكثر من 181 لعبة بأسعار لا تُضاهى.',
      cta: 'تصفح الألعاب',
      stats: {
        games: 'لعبة Steam',
        paymentMethods: 'طرق الدفع',
        support: 'دعم',
      },
    },
    // Games Section
    games: {
      title: 'جميع الألعاب',
      searchPlaceholder: 'ابحث عن الألعاب...',
      sortBy: 'ترتيب حسب',
      sortOptions: {
        popular: 'الأكثر شعبية',
        priceLow: 'السعر: من الأقل للأعلى',
        priceHigh: 'السعر: من الأعلى للأقل',
        discount: 'الخصم',
      },
      addToCart: 'أضف إلى السلة',
      inCart: 'في السلة',
      delivery: 'توصيل الحساب',
    },
    // Game Detail
    detail: {
      steamPage: 'عرض على Steam',
      save: 'وفر',
      offerEnds: 'ينتهي العرض',
      addToCart: 'أضف إلى السلة',
      platform: 'المنصة',
      region: 'المنطقة',
      delivery: 'التوصيل',
      type: 'النوع',
      views: 'مشاهدة',
      likes: 'إعجاب',
    },
    // Cart
    cart: {
      title: 'سلة التسوق',
      empty: 'سلة التسوق فارغة',
      subtotal: 'المجموع',
      checkout: 'إتمام الشراء',
      remove: 'إزالة',
      item: 'عنصر',
      items: 'عناصر',
    },
    // Checkout
    checkout: {
      title: 'إتمام الشراء',
      orderSummary: 'ملخص الطلب',
      paymentMethod: 'طريقة الدفع',
      vodafoneCash: 'فودافون كاش',
      binancePay: 'بينانس باي',
      instapay: 'إنستا باي',
      comingSoon: 'قريباً',
      payWithVodafone: 'أرسل الدفع إلى 01080590462 عبر فودافون كاش',
      payWithBinance: 'امسح رمز QR باستخدام بينانس باي',
      instapayComing: 'قريباً! ترقبوا التحويلات البنكية الفورية.',
      warningTitle: 'مهم!',
      warningText: 'يجب أن يكون حساب Steam الخاص بك من منطقة أوكرانيا، أو حسابًا جديدًا لا يحتوي على أي ألعاب تم شراؤها. لمزيد من المعلومات، التواصل معنا.',
      ivePaid: 'لقد دفعت',
      successTitle: '!آخر خطوة',
      successMessage: 'تواصل معانا على واتساب أو ديسكورد، وابعتلنا إيصال الدفع، واسم اللعبة اللي عايزها، واسم حسابك على ستيمً.',
      contactWhatsApp: 'تواصل عبر واتساب',
      contactDiscord: 'تواصل عبر ديسكورد',
    },
    // How to Buy
    howToBuy: {
      title: 'كيفية الشراء',
      steps: [
        { title: 'اختر اللعبة', desc: 'تصفح الكتالوج، اختر لعبتك، وأضفها إلى السلة.' },
        { title: 'إتمام الشراء', desc: 'راجع سلة التسوق واختر طريقة الدفع.' },
        { title: 'احصل على لعبتك', desc: 'بعد تأكيد الدفع، استلم مفتاح Steam في دقائق.' },
      ],
    },
    // Payment Methods
    payment: {
      title: 'طرق الدفع',
      vodafoneDesc: 'تحويل إلى 01080590462',
      instapayDesc: 'قريباً! ترقبوا التحويلات البنكية الفورية.',
      binanceDesc: 'ادفع بالعملات الرقمية',
    },
    // Contact
    contact: {
      title: 'اتصل بنا',
      desc: 'لديك أسئلة؟ تواصل معنا على واتساب أو ديسكورد.',
      whatsapp: '01080590462',
      discord: 'omar400n',
    },
    // Footer
    footer: {
      tagline: 'أفضل متجر ألعاب Steam في مصر.',
      copyright: '2025 Volt Game Store. جميع الحقوق محفوظة.',
    },
    // Language
    lang: {
      en: 'English',
      ar: 'Arabic',
    },
  },
};

export function getTranslation(lang: Language) {
  return translations[lang];
}

export type Translation = ReturnType<typeof getTranslation>;
