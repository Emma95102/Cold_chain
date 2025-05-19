import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff8ed',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '0 20px'
  };

  const title = {
    fontSize: '36px',
    color: '#2e7d32',
    marginBottom: '10px'
  };

  const subtitle = {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px'
  };

  const button = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#f57c00',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  };

  const notificationContainer = {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '20px',
    color: '#333',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'left'
  };

  const notificationTitleGreen = {
    color: '#2e7d32',
    marginTop: 0,
    marginBottom: '8px'
  };

  const notificationTitleOrange = {
    color: '#e65100',
    marginTop: '20px',
    marginBottom: '8px'
  };

  return (
    <div style={container}>
      <h1 style={title}>🚚 PhaseCool 智能調度</h1>
      <p style={subtitle}>結合科技與物流，實現智能冷能調度</p>
      <button
        style={button}
        onClick={() => navigate("/dashboard")}
      >
        進入平台
      </button>

      <div style={notificationContainer}>
        <h3 style={notificationTitleGreen}>📢 最新公告</h3>
        <p>冷鏈系統將於週末進行例行維護，請提前備份資料。</p>

        <h3 style={notificationTitleOrange}>⚠️ 系統維護提醒</h3>
        <p>維護時間：6/3 23:00 - 6/4 03:00，期間系統將暫時無法使用。</p>
      </div>
    </div>
  );
}
