import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import EventsPage from './pages/EventsPage';
import ScoreCreditPage from './pages/ScoreCreditPage';
import { apiService } from './api/apiService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const prods = await apiService.getProducts();
    const evts = await apiService.getEvents();
    const off = await apiService.getActiveOffer();
    setProducts(prods);
    setEvents(evts);
    setOffer(off);
  };

  const handleRestock = async (productId, productName) => {
    const qtyStr = prompt(`Restock ${productName}. Enter quantity to add:`, '10');
    if (!qtyStr) return;
    const qty = parseInt(qtyStr, 10);
    if (isNaN(qty) || qty <= 0) return;

    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const newStock = prod.current_stock + qty;
    await apiService.updateProductStock(productId, newStock);
    loadData();
  };

  const handleAcceptOffer = async (offerId) => {
    await apiService.acceptOffer(offerId);
    setOffer((prev) => ({ ...prev, status: 'ACCEPTED' }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#12181B' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'dashboard' && <DashboardPage products={products} events={events} onRestock={handleRestock} />}
        {activeTab === 'products' && <ProductsPage products={products} onRestock={handleRestock} />}
        {activeTab === 'events' && <EventsPage events={events} />}
        {activeTab === 'score' && <ScoreCreditPage offer={offer} onAcceptOffer={handleAcceptOffer} />}
      </main>
    </div>
  );
}
