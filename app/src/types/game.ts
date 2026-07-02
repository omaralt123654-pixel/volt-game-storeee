export interface Game {
  id: number;
  name: string;
  slug: string;
  price: number;
  old_price: number;
  has_discount: number;
  discount_percent: number;
  image: string;
  category: string;
  delivery_type: string;
  platform: string;
  product_type: string;
  region: string;
  views_count: number;
  likes_count: number;
  sale_end_date: string;
  app_id: number;
  steam_url: string;
  description: string;
}

export interface CartItem extends Game {
  quantity: number;
}

export type PaymentMethod = 'vodafone_cash' | 'binance_pay' | 'instapay';

export type CheckoutState = 'idle' | 'checking_out' | 'payment_selected' | 'paid' | 'confirmed';

export type Language = 'en' | 'ar';
