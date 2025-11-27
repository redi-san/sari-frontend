// src/components/NotificationBell.jsx
import { useState, useEffect } from "react";
import styles from "../css/NotificationBell.module.css";
import bellIcon from "../assets/bell.png";
import bellAlertIcon from "../assets/bellalert.png";
import axios from "axios";
import { getAuth } from "firebase/auth";

const BASE_URL = process.env.REACT_APP_API_URL;
const EXPIRY_WARNING_DAYS = 14;

export default function NotificationBell() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      try {
        const res = await axios.get(`${BASE_URL}/stocks/user/${user.uid}`);
        const stocks = res.data;

        // Low stock
        setLowStockItems(stocks.filter((s) => Number(s.stock) <= Number(s.lowstock)));

        // Expiring soon
        const today = new Date();
        const expiring = stocks.filter((stock) => {
          if (!stock.expiry_date) return false;
          const expiry = new Date(stock.expiry_date);
          const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
          return diffDays <= EXPIRY_WARNING_DAYS && diffDays >= 0;
        });
        setExpiringItems(expiring);
      } catch (err) {
        console.error("Error fetching stocks for notifications:", err);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const totalAlerts = lowStockItems.length + expiringItems.length;

  return (
    <div className={styles.notifWrapper}>
      <button
        className={styles.notifBell}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src={totalAlerts > 0 ? bellAlertIcon : bellIcon}
          alt="Notifications"
          className={`${styles.notifIcon} ${lowStockItems.length > 0 ? styles.alertBell : ""}`}
        />
        {totalAlerts > 0 && <span className={styles.notifCount}>{totalAlerts}</span>}
      </button>

      {showDropdown && (
        <div className={styles.notifDropdown}>
          {totalAlerts === 0 ? (
            <p>No notifications</p>
          ) : (
            <ul>
              {lowStockItems.map((item, i) => (
                <li key={"low-" + i}>
                  <strong>{item.name}</strong> - Low stock ({item.stock} left)
                </li>
              ))}
              {expiringItems.map((item, i) => (
                <li key={"exp-" + i}>
                  <strong>{item.name}</strong> - Expires on {item.expiry_date}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
