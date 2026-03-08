import { useState, useEffect } from "react";

export default function Dashboard() {
  const [price, setPrice] = useState("3857.58");
  const [status, setStatus] = useState("OFFLINE");

  const startBot = async () => {
    const res = await fetch("/api/bot/start", { method: "POST" });
    if (res.ok) setStatus("ACTIVE");
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fbbf24', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #451a03', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>SOUFIANE QUANT</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: status === "ACTIVE" ? '#22c55e' : '#ef4444' }} />
          <span>{status}</span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {/* بطاقة السعر */}
        <div style={{ backgroundColor: '#18181b', border: '1px solid #ca8a04', padding: '20px', borderRadius: '8px' }}>
          <div style={{ color: '#71717a', fontSize: '12px' }}>ETH/USDT</div>
          <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff', marginTop: '10px' }}>${price}</div>
        </div>

        {/* أزرار التحكم */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={startBot}
            style={{ flex: 1, backgroundColor: '#ca8a04', color: '#000', fontWeight: 'bold', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            تشغيل (Grid 200/100)
          </button>
          <button 
            onClick={() => setStatus("OFFLINE")}
            style={{ flex: 1, backgroundColor: '#27272a', color: '#ca8a04', fontWeight: 'bold', padding: '15px', border: '1px solid #451a03', borderRadius: '5px', cursor: 'pointer' }}
          >
            إيقاف
          </button>
        </div>
      </div>
    </div>
  );
}
