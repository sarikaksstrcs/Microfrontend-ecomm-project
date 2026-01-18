import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductCatalog from './ProductCatalog';
import './index.css';

// For standalone development
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductCatalog />
  </React.StrictMode>
);
