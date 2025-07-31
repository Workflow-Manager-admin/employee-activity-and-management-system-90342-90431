import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Demonstrative locale/language switcher (mock implementation).
 * In real systems, would be wired to i18n libs and resources.
 */
function LocalizationSwitcher() {
  const [locale, setLocale] = useState("en");
  return (
    <div style={{
      position: "fixed", right: 18, bottom: 22, zIndex: 1100,
      background: "var(--primary-blue)",
      color: "white",
      borderRadius: 8,
      padding: "8px 10px"
    }}>
      <span style={{ marginRight: 8 }}>🌐</span>
      <select
        className="select"
        value={locale}
        onChange={e => setLocale(e.target.value)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontWeight: 700
        }}
        aria-label="Select language"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="fr">FR</option>
        {/* Add more as needed */}
      </select>
    </div>
  );
}

export default LocalizationSwitcher;
