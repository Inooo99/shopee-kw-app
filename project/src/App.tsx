import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductModal from "./components/ProductModal";
import LoginModal from "./components/LoginModal";
import RegistrationModal from "./components/RegistrationModal";
import { Product, CartItem, PurchaseRecord, Voucher } from "./types";
import { mockProducts } from "./data/mockProducts";
import HomePage from "./pages/HomePage";
import MyAccountPage from "./pages/MyAccountPage";
import PurchasesPage from "./pages/PurchasesPage";
import FlashSalePage from "./pages/FlashSalePage";
import ShopeeMallPage from "./pages/ShopeeMallPage";
import FreeShippingPage from "./pages/FreeShippingPage";
import VouchersPage from "./pages/VouchersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const { currentUser } = useAuth();
  const [products] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    if (currentUser) {
      const purchaseKey = `purchases_${currentUser.id}`;
      const savedPurchases = localStorage.getItem(purchaseKey);
      setPurchases(savedPurchases ? JSON.parse(savedPurchases) : []);
    } else {
      setPurchases([]);
    }
  }, [currentUser]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery && !selectedCategory) return products;
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotalPrice();
    if (!appliedVoucher || subtotal === 0) return 0;
    if (appliedVoucher.code === "DISKON10RB" && subtotal >= 100000) {
      return 10000;
    }
    return 0;
  };

  const getTotalPrice = () => {
    return getSubtotalPrice() - getDiscountAmount();
  };

  const handleApplyVoucher = (voucher: Voucher) => {
    if (voucher.code === "DISKON10RB" && getSubtotalPrice() < 100000) {
      alert("Belanja minimal Rp100.000 untuk menggunakan voucher ini.");
      return;
    }
    setAppliedVoucher(voucher);
    alert(`Voucher "${voucher.title}" berhasil diterapkan!`);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Please log in to proceed with checkout.");
      setIsLoginModalOpen(true);
      return;
    }
    if (cartItems.length === 0) {
      alert("Your shopping cart is empty!");
      return;
    }
    const finalPrice = getTotalPrice();
    const discount = getDiscountAmount();
    const purchaseKey = `purchases_${currentUser.id}`;
    const newPurchase: PurchaseRecord = {
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
      items: cartItems,
      totalPrice: finalPrice,
      voucherCode: appliedVoucher?.code,
      discountApplied: discount > 0 ? discount : undefined,
    };
    const updatedPurchases = [...purchases, newPurchase];
    setPurchases(updatedPurchases);
    localStorage.setItem(purchaseKey, JSON.stringify(updatedPurchases));
    alert("Thank you for your purchase! Your order has been placed.");
    setCartItems([]);
    setIsCartOpen(false);
    setAppliedVoucher(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignupClick={() => setIsRegisterModalOpen(true)}
      />

      <main className="flex-grow">
        <Routes>
          {/* Rute Publik */}
          <Route
            path="/"
            element={
              <HomePage
                products={filteredProducts}
                onCategorySelect={setSelectedCategory}
                selectedCategory={selectedCategory}
                onProductClick={setSelectedProduct}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/flash-sale"
            element={
              <FlashSalePage
                allProducts={products}
                onProductClick={setSelectedProduct}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/shopee-mall"
            element={
              <ShopeeMallPage
                allProducts={products}
                onProductClick={setSelectedProduct}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/free-shipping"
            element={
              <FreeShippingPage
                allProducts={products}
                onProductClick={setSelectedProduct}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/vouchers"
            element={
              <VouchersPage
                onApplyVoucher={handleApplyVoucher}
                onCartClick={() => setIsCartOpen(true)}
              />
            }
          />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Rute Terlindungi */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <MyAccountPage purchases={purchases} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchases"
            element={
              <ProtectedRoute>
                <PurchasesPage purchases={purchases} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
      {isRegisterModalOpen && (
        <RegistrationModal
          onClose={() => setIsRegisterModalOpen(false)}
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}
      {isCartOpen && (
        <Cart
          items={cartItems}
          subtotal={getSubtotalPrice()}
          discount={getDiscountAmount()}
          totalPrice={getTotalPrice()}
          appliedVoucher={appliedVoucher}
          onRemoveVoucher={handleRemoveVoucher}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default App;
