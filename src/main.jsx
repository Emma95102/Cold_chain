import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import "./pages/style.css"; // 確認這路徑是否正確

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter 包裹整個 App 讓路由生效 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
