import React from 'react';
import ProductsTable from '../components/ProductsTable';

export default function ProductsPage({ products, onRestock }) {
  return (
    <div className="container">
      <ProductsTable products={products} onRestock={onRestock} />
    </div>
  );
}
