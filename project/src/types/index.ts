export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  category: string;
  description: string;
  seller: string;
  location: string;
  discount?: number;
  isLiked?: boolean;
  sold: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface PurchaseItem extends Product {
  quantity: number;
}

export interface PurchaseRecord {
  id: string; // ID unik untuk setiap transaksi
  date: string; // Tanggal transaksi
  items: PurchaseItem[];
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatarUrl?: string;
  addresses?: Address[];
}
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  category: string;
  description: string;
  seller: string;
  location: string;
  discount?: number;
  isLiked?: boolean;
  sold: number;
  isFlashSale?: boolean;
  isShopeeMall?: boolean;
  hasFreeShipping?: boolean;
}

export interface PurchaseItem extends Product {
  quantity: number;
}

export interface PurchaseRecord {
  id: string;
  date: string;
  items: PurchaseItem[];
  totalPrice: number;
  voucherCode?: string;
  discountApplied?: number;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  expiryDate: string;
  type: "Free Shipping" | "Discount";
  voucherCode?: string;
  discountApplied?: number;
}

export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
}
