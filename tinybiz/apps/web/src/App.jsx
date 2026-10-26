import React, { useState, useEffect } from 'react';
import AppLayout from './components/AppLayout';
import AuthPage from './pages/AuthPage';
import SellPage from './pages/SellPage';
import StockPage from './pages/StockPage';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import InsightsPage from './pages/InsightsPage';
import CustomersPage from './pages/CustomersPage';
import ExpensesPage from './pages/ExpensesPage';
import ExpiryBatchPage from './pages/ExpiryBatchPage';
import SalesPage from './pages/SalesPage';
import FoodSafetyPage from './pages/FoodSafetyPage';
import ScoreCreditPage from './pages/ScoreCreditPage';
import SettingsPage from './pages/SettingsPage';
import { storageRepository } from './data/storageRepository';

export default function App() {
  const [session, setSession] = useState({ isAuthenticated: true });
  const [activePage, setActivePage] = useState('sell');
  const [products, setProducts] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [foodSafetyReports, setFoodSafetyReports] = useState([]);
  const [creditOffer, setCreditOffer] = useState(null);
  const [repayments, setRepayments] = useState([]);
  const [businessSetup, setBusinessSetup] = useState({});
  const [pinSet, setPinSet] = useState(false);

  useEffect(() => {
    storageRepository.initDemoData();
    loadAllData();
  }, []);

  const loadAllData = () => {
    setProducts(storageRepository.getProducts());
    setBatches(storageRepository.getBatches());
    setSales(storageRepository.getSales());
    setCustomers(storageRepository.getCustomers());
    setExpenses(storageRepository.getExpenses());
    setNotifications(storageRepository.getNotifications());
    setCreditOffer(storageRepository.getCreditOffer());
    setRepayments(storageRepository.getRepayments());
    setBusinessSetup(storageRepository.getBusinessSetup());
    setPinSet(!!storageRepository.getPin());
    setSession(storageRepository.getSession());
  };

  const handleSaveProduct = (product) => {
    storageRepository.saveProduct(product);
    loadAllData();
  };

  const handleRestockProduct = (productId) => {
    const qtyStr = prompt('Enter restock quantity:', '10');
    if (!qtyStr) return;
    const qty = parseInt(qtyStr, 10);
    if (!isNaN(qty) && qty > 0) {
      storageRepository.adjustProductStock(productId, qty);
      loadAllData();
    }
  };

  const handleAddBatch = (batch) => {
    storageRepository.saveBatch(batch);
    storageRepository.adjustProductStock(batch.productId, batch.quantity);
    loadAllData();
  };

  const handleQuarantineBatch = (batchId, reason) => {
    storageRepository.quarantineBatch(batchId, reason);
    loadAllData();
  };

  const handleRecordSale = (saleData) => {
    storageRepository.recordSale(saleData);
    loadAllData();
  };

  const handleAddCustomerDebt = (customerName, amount, note) => {
    storageRepository.addCustomerDebt(customerName, amount, note);
    loadAllData();
  };

  const handleCustomerPayment = (customerId, amount) => {
    storageRepository.recordCustomerPayment(customerId, amount);
    loadAllData();
  };

  const handleAddExpense = (expense) => {
    storageRepository.addExpense(expense);
    loadAllData();
  };

  const handleAcceptCreditOffer = () => {
    storageRepository.acceptCreditOffer();
    loadAllData();
  };

  const handleMarkNotificationRead = (id) => {
    storageRepository.markNotificationRead(id);
    loadAllData();
  };

  const handleSaveBusinessSetup = (setup) => {
    storageRepository.saveBusinessSetup(setup);
    loadAllData();
  };

  const handleSetPin = (pin) => {
    storageRepository.setPin(pin);
    loadAllData();
  };

  const handleExportBackup = () => {
    return storageRepository.exportBackupToJson();
  };

  const handleRestoreBackup = (jsonStr) => {
    const success = storageRepository.restoreBackupFromJson(jsonStr);
    if (success) loadAllData();
    return success;
  };

  const handleReloadDemoData = () => {
    storageRepository.initDemoData(true);
    loadAllData();
  };

  if (!session.isAuthenticated) {
    return <AuthPage onLogin={(sess) => { storageRepository.setSession(sess); setSession(sess); }} />;
  }

  return (
    <AppLayout
      activePage={activePage}
      setActivePage={setActivePage}
      notifications={notifications}
      onMarkNotificationRead={handleMarkNotificationRead}
    >
      {activePage === 'sell' && (
        <SellPage products={products} onRecordSale={handleRecordSale} />
      )}

      {activePage === 'stock' && (
        <StockPage products={products} sales={sales} onRestock={handleRestockProduct} setActivePage={setActivePage} />
      )}

      {activePage === 'dashboard' && (
        <DashboardPage
          products={products}
          sales={sales}
          expenses={expenses}
          customers={customers}
          setActivePage={setActivePage}
        />
      )}

      {activePage === 'reports' && (
        <ReportsPage
          sales={sales}
          expenses={expenses}
          products={products}
          setActivePage={setActivePage}
        />
      )}

      {activePage === 'insights' && (
        <InsightsPage products={products} sales={sales} />
      )}

      {activePage === 'customers' && (
        <CustomersPage
          customers={customers}
          onAddCustomerDebt={handleAddCustomerDebt}
          onRecordPayment={handleCustomerPayment}
        />
      )}

      {activePage === 'expenses' && (
        <ExpensesPage
          expenses={expenses}
          onAddExpense={handleAddExpense}
        />
      )}

      {activePage === 'inventory' && (
        <ProductsPage
          products={products}
          onSaveProduct={handleSaveProduct}
          onRestock={handleRestockProduct}
          searchTerm=""
        />
      )}

      {activePage === 'expiry' && (
        <ExpiryBatchPage
          batches={batches}
          products={products}
          onAddBatch={handleAddBatch}
          onQuarantineBatch={handleQuarantineBatch}
        />
      )}

      {activePage === 'sales' && (
        <SalesPage
          sales={sales}
          products={products}
          onRecordSale={handleRecordSale}
        />
      )}

      {activePage === 'food-safety' && (
        <FoodSafetyPage
          reports={foodSafetyReports}
          batches={batches}
          products={products}
        />
      )}

      {(activePage === 'score' || activePage === 'credit') && (
        <ScoreCreditPage
          sales={sales}
          offer={creditOffer}
          repayments={repayments}
          onAcceptOffer={handleAcceptCreditOffer}
        />
      )}

      {activePage === 'settings' && (
        <SettingsPage
          businessSetup={businessSetup}
          onSaveBusinessSetup={handleSaveBusinessSetup}
          onReloadDemoData={handleReloadDemoData}
          onExportBackup={handleExportBackup}
          onRestoreBackup={handleRestoreBackup}
          pinSet={pinSet}
          onSetPin={handleSetPin}
        />
      )}
    </AppLayout>
  );
}
