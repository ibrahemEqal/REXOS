"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { categories, menuItems, MenuItem } from "@/data/menuData";

type CartItem = { id: number; name: string; price: number; quantity: number; notes: string };
const WHATSAPP = "970597600024";

export default function MenuPage() {
  const { language, isRtl } = useLanguage();
  const t = translations[language].menuPage;
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");

  const items = useMemo(() => menuItems.filter((item) => item.categoryId === activeCategory), [activeCategory]);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function changeQuantity(item: MenuItem | CartItem, delta: number) {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (!existing && delta > 0 && "numericPrice" in item) {
        return [...current, { id: item.id, name: item.name[language], price: item.numericPrice, quantity: 1, notes: "" }];
      }
      if (!existing) return current;
      const quantity = existing.quantity + delta;
      return quantity <= 0
        ? current.filter((entry) => entry.id !== item.id)
        : current.map((entry) => entry.id === item.id ? { ...entry, quantity } : entry);
    });
  }

  function sendOrder() {
    if (orderType === "delivery" && !address.trim()) {
      alert(isRtl ? "أدخل عنوان التوصيل أولاً" : "Enter a delivery address first");
      return;
    }
    const lines = [
      "REXOS - New Website Order",
      "Type: " + (orderType === "pickup" ? "Pickup" : "Delivery"),
      orderType === "delivery" ? "Address: " + address : "",
      "",
      ...cart.map((item) => item.quantity + "x " + item.name + " - ₪" + item.price * item.quantity + (item.notes ? " (" + item.notes + ")" : "")),
      "",
      "Total: ₪" + totalPrice,
    ].filter(Boolean);
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
  }

  return (
    <main className="min-h-screen bg-rexos-primary pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rexos-accent">
            {t.tag}
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-6xl text-rexos-text md:text-8xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-rexos-text/55">
            {isRtl ? "اختر من قائمتنا الكاملة، واستمتع بطلبك في ريكسوس." : "Explore our full menu and enjoy your favourites at Rexos."}
          </p>
        </div>

        <div className="sticky top-[76px] z-30 mt-14 border-y border-rexos-secondary bg-rexos-primary/95 py-3 backdrop-blur-md">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={"shrink-0 rounded-full border px-4 py-2 text-xs transition " + (
                  activeCategory === category.id
                    ? "border-rexos-accent bg-rexos-accent text-rexos-primary"
                    : "border-rexos-text/15 text-rexos-text/65 hover:border-rexos-accent/60 hover:text-rexos-text"
                )}
              >
                {category[language]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-8 flex items-end justify-between border-b border-rexos-secondary pb-4">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl text-rexos-text">
              {categories.find((category) => category.id === activeCategory)?.[language]}
            </h2>
            <span className="text-xs text-rexos-text/40">{items.length} {isRtl ? "صنف" : "items"}</span>
          </div>

          <motion.div layout className="grid gap-3 md:grid-cols-2">
            {items.map((item) => {
              const quantity = cart.find((entry) => entry.id === item.id)?.quantity || 0;
              const description = item.description[language];
              return (
                <motion.article layout key={item.id} className="group rounded-xl border border-rexos-text/10 bg-rexos-secondary/25 p-5 transition hover:border-rexos-accent/50 hover:bg-rexos-secondary/45">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-medium text-rexos-text">{item.name[language]}</h3>
                        {item.badge && <span className="rounded-full border border-rexos-accent/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-rexos-accent">{item.badge}</span>}
                      </div>
                      {description && <p className="text-sm leading-6 text-rexos-text/50">{description}</p>}
                      {item.askWaiter && <p className="mt-2 text-xs text-rexos-accent/80">{isRtl ? "اسأل النادل عن المتوفر" : "Ask your waiter about availability"}</p>}
                    </div>
                    <span className="shrink-0 text-lg font-semibold text-rexos-accent">{item.price}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-end">
                    {quantity === 0 ? (
                      <button onClick={() => changeQuantity(item, 1)} className="flex items-center gap-2 rounded-full border border-rexos-accent/60 px-4 py-2 text-xs text-rexos-accent transition hover:bg-rexos-accent hover:text-rexos-primary">
                        <Plus size={14} /> {t.addToOrder}
                      </button>
                    ) : (
                      <div className="flex items-center gap-4 rounded-full bg-rexos-accent px-3 py-2 text-rexos-primary">
                        <button onClick={() => changeQuantity(item, -1)}><Minus size={15} /></button>
                        <span className="min-w-4 text-center text-sm font-bold">{quantity}</span>
                        <button onClick={() => changeQuantity(item, 1)}><Plus size={15} /></button>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {totalItems > 0 && !cartOpen && (
          <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={() => setCartOpen(true)} className={"fixed bottom-6 z-40 flex items-center gap-3 rounded-full bg-rexos-accent px-5 py-3 font-semibold text-rexos-primary shadow-xl " + (isRtl ? "left-6" : "right-6")}>
            <ShoppingBag size={19} /><span>{t.yourOrder}</span><b className="rounded-full bg-rexos-primary px-2 py-0.5 text-xs text-rexos-accent">{totalItems}</b>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button aria-label="Close order" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-40 cursor-default bg-black/70" />
            <motion.aside initial={{ x: isRtl ? "-100%" : "100%" }} animate={{ x: 0 }} exit={{ x: isRtl ? "-100%" : "100%" }} className={"fixed inset-y-0 z-50 flex w-full max-w-md flex-col bg-rexos-primary p-6 shadow-2xl " + (isRtl ? "left-0" : "right-0")}>
              <div className="flex items-center justify-between border-b border-rexos-secondary pb-5">
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-text">{t.yourOrder}</h2>
                <button onClick={() => setCartOpen(false)}><X className="text-rexos-text/60" /></button>
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto py-6">
                {cart.map((item) => (
                  <div key={item.id} className="border-b border-rexos-secondary/60 pb-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-rexos-text">{item.name}</span>
                      <span className="text-sm text-rexos-accent">₪{item.price * item.quantity}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-rexos-text/15 px-3 py-1 text-rexos-text">
                        <button onClick={() => changeQuantity(item, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item, 1)}><Plus size={13} /></button>
                      </div>
                      <input value={item.notes} onChange={(event) => setCart((current) => current.map((entry) => entry.id === item.id ? { ...entry, notes: event.target.value } : entry))} placeholder={isRtl ? "ملاحظات" : "Notes"} className="w-1/2 border-b border-rexos-text/15 bg-transparent px-1 py-1 text-xs text-rexos-text outline-none focus:border-rexos-accent" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-rexos-secondary pt-5">
                <div className="mb-4 flex gap-2">
                  {(["pickup", "delivery"] as const).map((type) => <button key={type} onClick={() => setOrderType(type)} className={"flex-1 rounded-lg border py-2 text-xs " + (orderType === type ? "border-rexos-accent text-rexos-accent" : "border-rexos-text/15 text-rexos-text/50")}>{type === "pickup" ? (isRtl ? "استلام" : "Pickup") : (isRtl ? "توصيل" : "Delivery")}</button>)}
                </div>
                {orderType === "delivery" && <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder={isRtl ? "عنوان التوصيل" : "Delivery address"} className="mb-4 w-full rounded-lg border border-rexos-text/15 bg-transparent px-3 py-3 text-sm text-rexos-text outline-none focus:border-rexos-accent" />}
                <div className="mb-4 flex justify-between text-lg text-rexos-text"><span>{t.total}</span><strong className="text-rexos-accent">₪{totalPrice}</strong></div>
                <button onClick={sendOrder} className="w-full rounded-lg bg-rexos-accent py-3 text-sm font-semibold text-rexos-primary">{t.sendOrder}</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
