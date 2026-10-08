"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { ShoppingBag, X, Plus, Minus, Check } from "lucide-react";
import { categories, menuItems, MenuItem } from "@/data/menuData";


type CartItem = { id: number; name: string; price: number; quantity: number; notes?: string };
const RESTAURANT_WHATSAPP = "972594084898";


/* ---------------------------------------------------------
   Animated number — counts smoothly whenever `value` changes.
   Gives price totals a weight/precision feel instead of a
   jump-cut, which reads much more "considered" for a
   fine-dining context.
--------------------------------------------------------- */
function AnimatedNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(value);
  const spring = useSpring(motionVal, { stiffness: 140, damping: 22, mass: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  return <>{display}</>;
}

/* ---------------------------------------------------------
   Reveal wrapper — staggered, scroll-triggered entrance for
   each menu row. Kept subtle (12px rise, soft ease) so it
   reads as considered rather than flashy.
--------------------------------------------------------- */
const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { language, isRtl } = useLanguage();
  const t = translations[language].menuPage;

  const filteredItems = menuItems.filter((item) => item.categoryId === activeCategory);

  const getItemQuantity = (id: number) => cart.find((item) => item.id === id)?.quantity || 0;

  const updateQuantity = (item: MenuItem | CartItem, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) return prev.filter((i) => i.id !== item.id);
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: newQuantity } : i));
      }
      if (delta > 0 && "numericPrice" in item) {
        const itemName = (item as MenuItem).name[language as "en" | "ar"];
        return [...prev, { id: item.id, name: itemName, price: item.numericPrice, quantity: 1, notes: "" }];
      }
      return prev;
    });
  };

  const updateItemNote = (id: number, note: string) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, notes: note } : item)));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const sendOrderToWhatsApp = () => {
    if (orderType === "delivery" && address.trim() === "") {
      alert(isRtl ? "الرجاء إدخال عنوان التوصيل" : "Please enter your delivery address");
      return;
    }

    setIsSending(true);

    let message = "";
    message += `*--- REXOS RESTAURANT ---*\n`;
    message += `*${isRtl ? "طلب جديد من الموقع" : "New Website Order"}*\n\n`;

    const typeText = orderType === "pickup" ? (isRtl ? "استلام شخصي" : "Pickup") : (isRtl ? "توصيل" : "Delivery");
    message += `*${isRtl ? "نوع الطلب" : "Order Type"}:* ${typeText}\n`;

    if (orderType === "delivery") {
      message += `*${isRtl ? "العنوان" : "Address"}:* ${address}\n`;
    }

    message += `\n*--- ${isRtl ? "تفاصيل الطلب" : "Order Details"} ---*\n\n`;

    cart.forEach((item) => {
      message += `*${item.quantity}x ${item.name}*\n`;
      message += `${isRtl ? "السعر" : "Price"}: ₪${item.price * item.quantity}\n`;
      if (item.notes && item.notes.trim() !== "") {
        message += `${isRtl ? "ملاحظات" : "Notes"}: _${item.notes}_\n`;
      }
      message += `\n`;
    });

    message += `*------------------------*\n`;
    message += `*${t.total}: ₪${totalPrice}*\n`;

    const encodedMessage = encodeURIComponent(message);

    // small delay so the button's "sending" state is legible before the
    // WhatsApp handoff — a bare instant redirect feels abrupt for an order.
    window.setTimeout(() => {
      window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodedMessage}`, "_blank");
      setIsSending(false);
    }, 550);
  };

  return (
    <main className="min-h-screen bg-rexos-primary pt-40 pb-32 overflow-hidden relative">
      {/* ambient luxury glow — a single soft radial highlight behind the
          hero, not decoration everywhere, so it stays restrained */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, var(--rexos-accent, #D4AF37) 0%, transparent 70%)",
        }}
      />

      <div className="flex flex-col items-center text-center mb-16 px-6 relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[0.4em] text-rexos-accent text-xs mb-6 font-semibold"
        >
          {t.tag}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-6xl md:text-8xl text-rexos-text mb-8"
        >
          {t.title}
        </motion.h1>

        {/* signature ornamental divider — a thin gold line with a
            diamond mark at center, echoing the fine-dining menu-card
            convention without leaning on numbered steps or icons */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 w-40"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rexos-accent/60" />
          <span className="w-1.5 h-1.5 rotate-45 bg-rexos-accent" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rexos-accent/60" />
        </motion.div>
      </div>

      <div className="sticky top-[80px] z-40 bg-rexos-primary/95 md:bg-rexos-primary/90 md:backdrop-blur-md border-y border-rexos-secondary/50 py-4 mb-24">
        <div className="max-w-7xl mx-auto px-6 flex items-center overflow-x-auto hide-scrollbar gap-8 md:gap-12 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="relative group py-2 whitespace-nowrap flex-shrink-0"
            >
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ duration: 0.25 }}
                className={`inline-block uppercase tracking-[0.1em] text-xs md:text-sm transition-colors duration-500 ${
                  activeCategory === category.id
                    ? "text-rexos-accent font-semibold"
                    : "text-rexos-text/60 group-hover:text-rexos-text"
                }`}
              >
                {category[language as "en" | "ar"]}
              </motion.span>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="menuTab"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-rexos-accent shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                  transition={{ type: "spring", stiffness: 340, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -24, transition: { duration: 0.3 } }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col gap-32"
          >
            {filteredItems.length === 0 ? (
              <motion.p variants={rowVariants} className="text-center text-rexos-text/50 py-20 italic font-[family-name:var(--font-cormorant)] text-2xl">
                {isRtl ? "قريباً..." : "Coming soon..."}
              </motion.p>
            ) : (
              filteredItems.map((item, index) => {
                const quantity = getItemQuantity(item.id);
                const itemName = item.name[language as "en" | "ar"];
                const itemDesc = item.description[language as "en" | "ar"];

                return (
                  <motion.div
                    key={item.id}
                    variants={rowVariants}
                    className={`flex flex-col gap-12 lg:gap-24 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                    }`}
                  >
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-rexos-text mb-6">
                        {itemName}
                      </h2>
                      {itemDesc && (
                        <p className="text-rexos-text/60 font-light text-sm md:text-base mb-8 leading-relaxed max-w-lg">
                          {itemDesc}
                        </p>
                      )}

                      <div className="flex items-center gap-8">
                        <span className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-accent italic relative">
                          {item.price}
                          <motion.span
                            className="absolute -bottom-1 left-0 right-0 h-px bg-rexos-accent/50 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                          />
                        </span>

                        {/* Flip button */}
                        <div className="relative w-40 h-12" style={{ perspective: "1000px" }}>
                          <motion.div
                            className="w-full h-full relative"
                            style={{ transformStyle: "preserve-3d" }}
                            animate={{ rotateX: quantity > 0 ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                          >
                            <motion.button
                              onClick={() => updateQuantity(item, 1)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="absolute inset-0 w-full h-full border border-rexos-accent/50 text-rexos-accent uppercase tracking-[0.15em] text-xs font-semibold overflow-hidden group/btn hover:border-rexos-accent transition-colors"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-rexos-accent/15 to-transparent" />
                              <span className="relative z-10">{t.addToOrder}</span>
                            </motion.button>
                            <div
                              className="absolute inset-0 w-full h-full bg-rexos-accent text-rexos-primary flex items-center justify-between px-4 font-semibold"
                              style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
                            >
                              <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item, -1)} className="p-2">
                                <Minus size={16} />
                              </motion.button>
                              <AnimatePresence mode="popLayout">
                                <motion.span
                                  key={quantity}
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -10, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-sm"
                                >
                                  {quantity}
                                </motion.span>
                              </AnimatePresence>
                              <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item, 1)} className="p-2">
                                <Plus size={16} />
                              </motion.button>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsCartOpen(true)}
            className={`fixed bottom-8 ${
              isRtl ? "left-8" : "right-8"
            } z-50 bg-rexos-accent text-rexos-primary p-4 shadow-[0_0_20px_rgba(212,175,55,0.35)]`}
          >
            {/* soft breathing ring — quiet ambient cue rather than a loud badge */}
            <motion.span
              className="absolute inset-0 rounded-full border border-rexos-accent/60"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <ShoppingBag size={24} className="relative z-10" />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={totalItems}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="absolute -top-2 -right-2 bg-rexos-text text-rexos-primary text-xs w-6 h-6 flex items-center justify-center font-bold rounded-full"
              >
                {totalItems}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: isRtl ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className={`fixed top-0 bottom-0 ${
                isRtl ? "left-0" : "right-0"
              } w-full md:w-[450px] bg-rexos-primary border-${isRtl ? "r" : "l"} border-rexos-secondary z-[70] p-6 md:p-8 flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.5)]`}
            >
              <div className="flex justify-between items-center mb-8 border-b border-rexos-secondary/50 pb-6">
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-text">{t.yourOrder}</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsCartOpen(false)}
                  className="text-rexos-text/50 hover:text-rexos-accent transition-colors"
                >
                  <X size={28} strokeWidth={1} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 pb-4 flex flex-col gap-8 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {cart.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-rexos-text/50 text-center mt-10 italic font-[family-name:var(--font-cormorant)] text-xl"
                    >
                      {t.emptyOrder}
                    </motion.p>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? -20 : 20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-3 pb-8 border-b border-rexos-secondary/20 last:border-none last:pb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-rexos-text font-semibold text-sm mb-1">{item.name}</h4>
                            <p className="text-rexos-accent text-xs">₪{item.price}</p>
                          </div>
                          <div className="flex items-center gap-4 bg-rexos-secondary/30 px-3 py-1 border border-rexos-secondary">
                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item, -1)} className="text-rexos-text/70 hover:text-rexos-accent">
                              <Minus size={14} />
                            </motion.button>
                            <span className="text-rexos-text text-sm w-4 text-center">{item.quantity}</span>
                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item, 1)} className="text-rexos-text/70 hover:text-rexos-accent">
                              <Plus size={14} />
                            </motion.button>
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder={
                            isRtl ? "ملاحظات (مثال: بدون بصل، إضافة جبنة...)" : "Notes (e.g., no onions, extra cheese...)"
                          }
                          value={item.notes || ""}
                          onChange={(e) => updateItemNote(item.id, e.target.value)}
                          className={`w-full bg-transparent border-b border-rexos-secondary/50 py-1 text-xs text-rexos-text/80 outline-none focus:border-rexos-accent transition-colors ${
                            isRtl ? "text-right" : "text-left"
                          }`}
                        />
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-6 border-t border-rexos-secondary mt-4"
                >
                  <div className="flex gap-4 mb-6">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setOrderType("pickup")}
                      className={`flex-1 py-3 text-[10px] md:text-xs uppercase tracking-widest transition-colors ${
                        orderType === "pickup"
                          ? "border border-rexos-accent bg-rexos-accent/10 text-rexos-accent font-semibold"
                          : "border border-rexos-secondary text-rexos-text/50"
                      }`}
                    >
                      {isRtl ? "استلام شخصي" : "Pickup"}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setOrderType("delivery")}
                      className={`flex-1 py-3 text-[10px] md:text-xs uppercase tracking-widest transition-colors ${
                        orderType === "delivery"
                          ? "border border-rexos-accent bg-rexos-accent/10 text-rexos-accent font-semibold"
                          : "border border-rexos-secondary text-rexos-text/50"
                      }`}
                    >
                      {isRtl ? "توصيل" : "Delivery"}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {orderType === "delivery" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden mb-6"
                      >
                        <input
                          type="text"
                          placeholder={isRtl ? "عنوان التوصيل بالتفصيل..." : "Full Delivery Address..."}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`w-full bg-transparent border-b border-rexos-accent/50 py-2 text-sm text-rexos-text outline-none focus:border-rexos-accent transition-colors ${
                            isRtl ? "text-right" : "text-left"
                          }`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-rexos-text/70 uppercase tracking-widest text-xs font-semibold">{t.total}</span>
                    <span className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-accent">
                      ₪<AnimatedNumber value={totalPrice} />
                    </span>
                  </div>
                  <motion.button
                    onClick={sendOrderToWhatsApp}
                    disabled={isSending}
                    whileHover={{ scale: isSending ? 1 : 1.015 }}
                    whileTap={{ scale: isSending ? 1 : 0.98 }}
                    className="w-full relative overflow-hidden bg-rexos-accent text-rexos-primary py-4 uppercase tracking-[0.2em] text-xs font-bold transition-colors duration-300 disabled:opacity-80"
                  >
                    <AnimatePresence mode="wait">
                      {isSending ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Check size={14} />
                          {isRtl ? "جاري التحويل..." : "Redirecting..."}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                        >
                          {t.sendOrder}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
