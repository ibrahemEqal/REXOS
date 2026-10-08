"use client";

import { useState } from "react";
import { BarChart3, Bell, CalendarDays, CircleDollarSign, LayoutDashboard, Menu as MenuIcon, MessageSquare, Search, Settings, ShoppingBag, Users, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const orders = [
  ["#RX-1048", "Ahmad Khalil", "Delivery", "₪128", "Preparing"],
  ["#RX-1047", "Lina Nassar", "Pickup", "₪74", "Ready"],
  ["#RX-1046", "Omar Saleh", "Dine-in", "₪265", "Completed"],
  ["#RX-1045", "Samer Odeh", "Delivery", "₪182", "Completed"],
];
const reservations = [
  ["Nour & Friends", "7:30 PM", "6 guests", "Confirmed"],
  ["Khaled Darwish", "8:00 PM", "2 guests", "Confirmed"],
  ["Maya Haddad", "9:15 PM", "4 guests", "Pending"],
];

export default function AdminDashboard() {
  const { language, isRtl } = useLanguage();
  const ar = language === "ar";
  const [query, setQuery] = useState("");
  const labels = ar
    ? { dashboard: "لوحة التحكم", manager: "مدير المطعم", welcome: "مساء الخير، سمير", subtitle: "إليك ملخص ما يحدث في ريكسوس اليوم.", overview: "نظرة عامة", orders: "الطلبات", bookings: "الحجوزات", menu: "القائمة", messages: "الرسائل", revenue: "إيرادات اليوم", totalOrders: "إجمالي الطلبات", guests: "الضيوف", recent: "آخر الطلبات", reservations: "حجوزات اليوم", sales: "المبيعات حسب القسم", search: "ابحث عن طلب أو عميل...", amount: "المبلغ", customer: "العميل", status: "الحالة", confirmed: "مؤكد", pending: "معلّق", preparing: "قيد التحضير", ready: "جاهز", completed: "مكتمل" }
    : { dashboard: "Dashboard", manager: "Restaurant manager", welcome: "Good afternoon, Samir", subtitle: "Here is what is happening at REXOS today.", overview: "Overview", orders: "Orders", bookings: "Reservations", menu: "Menu", messages: "Messages", revenue: "Today's revenue", totalOrders: "Total orders", guests: "Guests served", recent: "Recent orders", reservations: "Today's reservations", sales: "Sales by category", search: "Search orders, customers...", amount: "Amount", customer: "Customer", status: "Status", confirmed: "Confirmed", pending: "Pending", preparing: "Preparing", ready: "Ready", completed: "Completed" };

  const nav: Array<[LucideIcon, string]> = [
    [LayoutDashboard, labels.overview],
    [ShoppingBag, labels.orders],
    [CalendarDays, labels.bookings],
    [MenuIcon, labels.menu],
    [MessageSquare, labels.messages],
  ];
  const statusText = (value: string) => ({ Preparing: labels.preparing, Ready: labels.ready, Completed: labels.completed, Confirmed: labels.confirmed, Pending: labels.pending } as Record<string, string>)[value] || value;
  const filtered = orders.filter((row) => (row[0] + row[1]).toLowerCase().includes(query.toLowerCase()));

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#f5f3ef] pt-24 text-[#25221f]">
      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-8 md:px-8">
        <aside className="hidden w-64 shrink-0 rounded-2xl bg-[#171411] p-5 text-[#f4efe6] lg:block">
          <div className="mb-10 flex items-center gap-3 border-b border-white/10 pb-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c8a97e] font-serif text-xl text-[#171411]">R</div><div><p className="font-serif text-2xl">REXOS</p><p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{labels.dashboard}</p></div></div>
          <nav className="space-y-1">{nav.map(([Icon, label]) => <button key={String(label)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"><Icon size={18} />{label}</button>)}</nav>
          <button className="mt-16 flex w-full items-center gap-3 border-t border-white/10 px-3 pt-5 text-sm text-white/55"><Settings size={18} />Settings</button>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="mb-8 flex items-center justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7850]">{labels.manager}</p><h1 className="font-serif text-4xl md:text-5xl">{labels.welcome}</h1><p className="mt-2 text-sm text-[#77716b]">{labels.subtitle}</p></div><div className="flex items-center gap-3"><button className="relative rounded-xl border border-[#e4dfd7] bg-white p-3"><Bell size={18} /><span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-400" /></button><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171411] font-semibold text-[#c8a97e]">S</div></div></header>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {([[CircleDollarSign, labels.revenue, "₪4,860", "+18.4%", "text-emerald-600"], [ShoppingBag, labels.totalOrders, "68", "+12.8%", "text-blue-600"], [CalendarDays, labels.bookings, "24", "+8.2%", "text-violet-600"], [Users, labels.guests, "142", "+22.5%", "text-amber-600"]] as Array<[LucideIcon, string, string, string, string]>).map(([Icon, label, value, change, color]) => <div key={String(label)} className="rounded-2xl border border-[#e4dfd7] bg-white p-5 shadow-sm"><div className="mb-5 flex justify-between"><Icon size={22} className={String(color)} /><span className={"text-xs font-semibold " + color}>{change}</span></div><p className="text-sm text-[#77716b]">{label}</p><p className="mt-1 text-3xl font-semibold">{value}</p><p className="mt-1 text-xs text-[#a09a93]">vs yesterday</p></div>)}
          </div>

          <div className="mb-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-[#e4dfd7] bg-white p-5 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-2xl">{labels.recent}</h2><span className="text-xs text-emerald-600">Live now</span></div><div className="mb-4 flex items-center gap-2 rounded-xl bg-[#f7f5f2] px-3 py-2"><Search size={16} className="text-[#a09a93]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} className="w-full bg-transparent text-sm outline-none" /></div><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-sm"><thead className="border-b border-[#eeeae4] text-xs text-[#a09a93]"><tr><th className="pb-3 text-start font-medium">ID</th><th className="pb-3 text-start font-medium">{labels.customer}</th><th className="pb-3 text-start font-medium">{labels.amount}</th><th className="pb-3 text-start font-medium">{labels.status}</th></tr></thead><tbody>{filtered.map((row) => <tr key={row[0]} className="border-b border-[#f2eee8] last:border-0"><td className="py-4 font-semibold">{row[0]}</td><td className="py-4">{row[1]}<span className="block text-xs text-[#a09a93]">{row[2]}</span></td><td className="py-4 font-semibold">{row[3]}</td><td className="py-4"><span className={"rounded-full px-2.5 py-1 text-[11px] " + (row[4] === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>{statusText(row[4])}</span></td></tr>)}</tbody></table></div></div>

            <div className="rounded-2xl border border-[#e4dfd7] bg-white p-5 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-2xl">{labels.reservations}</h2><CalendarDays size={20} className="text-[#c8a97e]" /></div><div className="space-y-3">{reservations.map((row) => <div key={row[0]} className="flex items-center gap-3 rounded-xl bg-[#f8f6f2] p-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9dece] text-[#9a7850]"><CalendarDays size={17} /></div><div className="flex-1"><p className="text-sm font-semibold">{row[0]}</p><p className="mt-1 text-xs text-[#8b847c]">{row[1]} · {row[2]}</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">{statusText(row[3])}</span></div>)}</div></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-[#e4dfd7] bg-white p-5 shadow-sm"><div className="mb-6 flex items-center justify-between"><h2 className="font-serif text-2xl">{labels.sales}</h2><BarChart3 size={20} className="text-[#c8a97e]" /></div>{[["Main Courses", 78], ["Drinks", 64], ["Appetizers", 52], ["Desserts", 36]].map(([name, value]) => <div key={String(name)} className="mb-5"><div className="mb-2 flex justify-between text-xs"><span>{name}</span><span className="text-[#9a7850]">{value}%</span></div><div className="h-2 rounded-full bg-[#f0ede8]"><div className="h-2 rounded-full bg-[#c8a97e]" style={{ width: value + "%" }} /></div></div>)}</div><div className="rounded-2xl border border-[#e4dfd7] bg-white p-5 shadow-sm"><h2 className="mb-6 font-serif text-2xl">{ar ? "الأصناف الأكثر مبيعاً" : "Top selling items"}</h2>{(ar ? ["ستيك لحم بصوص الديمي غلاس", "سبانيش لاتيه", "برجر مكسيكي"] : ["Beef Steak With Demi Glace", "Spanish Latte", "Mexican Burger"]).map((item, index) => <div key={item} className="mb-5 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4eee5] font-serif text-lg text-[#9a7850]">{index + 1}</span><p className="flex-1 truncate text-sm">{item}</p><span className="text-xs text-[#9a7850]">{34 - index * 6} sold</span></div>)}</div></div>
        </section>
      </div>
    </main>
  );
}
