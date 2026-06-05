"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Coffee, CreditCard, ShoppingCart, Plus, History,
  Search, Utensils, Flame, Leaf, Clock, CheckCircle2, ChevronRight
} from "lucide-react";

// Mock Data
const WALLET_BALANCE = 1250.00;

const CATEGORIES = ["All", "Breakfast", "Lunch", "Beverages", "Snacks"];

const MENU_ITEMS = [
  { id: 1, name: "Grilled Chicken Sandwich", category: "Lunch", price: 120, calories: 450, veg: false, spicy: false, image: "🥪", popular: true },
  { id: 2, name: "Paneer Tikka Wrap", category: "Lunch", price: 90, calories: 320, veg: true, spicy: true, image: "🌯", popular: false },
  { id: 3, name: "Fresh Fruit Bowl", category: "Breakfast", price: 60, calories: 150, veg: true, spicy: false, image: "🥗", popular: false },
  { id: 4, name: "Cold Coffee", category: "Beverages", price: 70, calories: 210, veg: true, spicy: false, image: "🥤", popular: true },
  { id: 5, name: "Masala Dosa", category: "Breakfast", price: 80, calories: 280, veg: true, spicy: true, image: "🥞", popular: true },
  { id: 6, name: "French Fries", category: "Snacks", price: 50, calories: 380, veg: true, spicy: false, image: "🍟", popular: false },
];

const TRANSACTIONS = [
  { id: "TXN-9021", date: "Today, 01:15 PM", items: "Grilled Chicken Sandwich, Cold Coffee", amount: 190, type: "purchase" },
  { id: "TXN-8810", date: "Yesterday, 10:30 AM", items: "Wallet Recharge", amount: 500, type: "recharge" },
  { id: "TXN-8742", date: "Oct 24, 02:40 PM", items: "French Fries", amount: 50, type: "purchase" },
  { id: "TXN-8699", date: "Oct 23, 09:15 AM", items: "Masala Dosa", amount: 80, type: "purchase" },
];

export default function CanteenDashboard() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredMenu = activeCategory === "All" ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Campus Canteen
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Pre-order meals, view the daily menu, and manage your digital wallet
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", color: "var(--text-muted)" }} />
            <input type="text" className="input-field" placeholder="Search menu..." style={{ paddingLeft: "32px", width: "200px", fontSize: "13px" }} />
          </div>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><ShoppingCart size={14} /> Cart (0)</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "20px" }}>
        
        {/* Left Column: Menu */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Categories */}
          <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                  background: activeCategory === cat ? "var(--text-primary)" : "var(--bg-card)",
                  color: activeCategory === cat ? "var(--bg-primary)" : "var(--text-secondary)",
                  border: activeCategory === cat ? "1px solid var(--text-primary)" : "1px solid var(--border)",
                  boxShadow: activeCategory === cat ? "var(--shadow-md)" : "none"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {filteredMenu.map(item => (
              <div key={item.id} className="stat-card" style={{ padding: "16px", display: "flex", flexDirection: "column", position: "relative" }}>
                {item.popular && (
                  <div style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ff8080", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "99px", boxShadow: "0 2px 8px rgba(255,128,128,0.4)" }}>
                    POPULAR
                  </div>
                )}
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ fontSize: "40px", background: "var(--bg-secondary)", width: "64px", height: "64px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.image}
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--violet)" }}>
                    ₹{item.price}
                  </div>
                </div>
                
                <div style={{ fontSize: "14.5px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px", lineHeight: "1.3" }}>
                  {item.name}
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Flame size={12} /> {item.calories} kcal
                  </span>
                  {item.veg ? (
                    <span style={{ fontSize: "10px", color: "#2d8c45", border: "1px solid #2d8c45", padding: "1px 4px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "2px" }}><Leaf size={8} /> VEG</span>
                  ) : (
                    <span style={{ fontSize: "10px", color: "#c94040", border: "1px solid #c94040", padding: "1px 4px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "2px" }}>NON-VEG</span>
                  )}
                </div>

                <div style={{ marginTop: "auto" }}>
                  <button className="btn-secondary" style={{ width: "100%", padding: "8px", fontSize: "12.5px" }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Wallet & Transactions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Digital Wallet */}
          <div style={{ background: "linear-gradient(135deg, #13151d 0%, #2a2d42 100%)", borderRadius: "16px", padding: "24px", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", bottom: "-20px", left: "-20px", width: "80px", height: "80px", background: "rgba(159,161,255,0.1)", borderRadius: "50%" }}></div>
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.7)" }}>Digital Wallet</span>
                <CreditCard size={18} color="rgba(255,255,255,0.5)" />
              </div>
              <div style={{ fontSize: "32px", fontWeight: "800", marginBottom: "4px", letterSpacing: "-0.02em" }}>
                ₹{WALLET_BALANCE.toFixed(2)}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>
                Available Balance
              </div>
              <button style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#fff", color: "#13151d", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                <Plus size={16} /> Add Funds
              </button>
            </div>
          </div>

          {/* Order History */}
          <div className="stat-card" style={{ padding: "0", overflow: "hidden", flex: 1 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
              <div className="section-title" style={{ fontSize: "14px" }}>Recent Activity</div>
              <button className="btn-ghost" style={{ padding: "4px", fontSize: "12px" }}>View All</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              {TRANSACTIONS.map((txn, i) => (
                <div key={txn.id} style={{ padding: "14px 20px", borderBottom: i !== TRANSACTIONS.length - 1 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: txn.type === "recharge" ? "rgba(217,249,223,0.15)" : "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {txn.type === "recharge" ? <Plus size={14} color="#2d8c45" /> : <Utensils size={14} color="var(--text-secondary)" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {txn.items}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{txn.date}</div>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: txn.type === "recharge" ? "#2d8c45" : "var(--text-primary)", flexShrink: 0 }}>
                    {txn.type === "recharge" ? "+" : "-"}₹{txn.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
