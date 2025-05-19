import React, { useState, useEffect, useRef } from 'react';

export default function Inventory() {
  const [availableModules, setAvailableModules] = useState(120);
  const [preCoolingProgress, setPreCoolingProgress] = useState(0);
  const [scanResult, setScanResult] = useState('');

  const intervalRef = useRef(null); // 用來追蹤計時器

  // 模組對應初始預冷進度
  const moduleCoolingMap = {
    A001: 80,
    A002: 55,
    A003: 65,
    A004: 30,
    A005: 90,
    A006: 10,
    A007: 95,
    A008: 50,
    A009: 70,
    A010: 100,
  };

  const usageData = [
    { id: 'A001', usageCount: 15, lifespan: 50 },
    { id: 'A002', usageCount: 40, lifespan: 50 },
    { id: 'A003', usageCount: 10, lifespan: 50 },
  ];

  function simulateScan() {
    const ids = Object.keys(moduleCoolingMap);
    const scannedId = ids[Math.floor(Math.random() * ids.length)];
    const initialProgress = moduleCoolingMap[scannedId];

    setScanResult(`掃描到模組 ID: ${scannedId}`);
    setPreCoolingProgress(initialProgress);

    // 清除舊的計時器
    if (intervalRef.current) clearInterval(intervalRef.current);

    // 啟動新的每秒增加 0.5%
    intervalRef.current = setInterval(() => {
      setPreCoolingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return parseFloat((prev + 0.5).toFixed(1));
      });
    }, 1000);
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // 清除計時器 on unmount
  }, []);

  return (
    <div style={pageStyle}>
      <h2>模組庫存與輪替管理</h2>

      <div style={{ marginBottom: 20 }}>
        <strong>📊 模組可用數量：</strong> {availableModules}
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>🔄 預冷進度標示：</strong>
        <div style={progressBarBackground}>
          <div
            style={{
              ...progressBarFill,
              width: `${preCoolingProgress}%`,
              backgroundColor: preCoolingProgress < 30 ? '#f44336' : '#0288d1',
            }}
          />
        </div>
        <span>{preCoolingProgress}%</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>📈 模組使用次數與壽命管理：</strong>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>模組ID</th>
              <th style={thTdStyle}>使用次數</th>
              <th style={thTdStyle}>壽命</th>
              <th style={thTdStyle}>狀態</th>
            </tr>
          </thead>
          <tbody>
            {usageData.map(({ id, usageCount, lifespan }) => {
              const usagePercent = (usageCount / lifespan) * 100;
              let status = '正常';
              if (usagePercent > 80) status = '接近壽命末期';
              else if (usagePercent > 50) status = '注意使用';

              return (
                <tr key={id}>
                  <td style={thTdStyle}>{id}</td>
                  <td style={thTdStyle}>{usageCount}</td>
                  <td style={thTdStyle}>{lifespan}</td>
                  <td
                    style={{
                      ...thTdStyle,
                      color:
                        status === '正常'
                          ? 'green'
                          : status === '注意使用'
                          ? 'orange'
                          : 'red',
                    }}
                  >
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <strong>📱 QR Code掃碼管理：</strong>
        <button onClick={simulateScan} style={buttonStyle}>
          模擬掃描
        </button>
        <div style={{ marginTop: 10 }}>{scanResult}</div>
      </div>
    </div>
  );
}

const pageStyle = {
  maxWidth: 700,
  margin: '20px auto',
  padding: 20,
  backgroundColor: '#f7f9fc',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const progressBarBackground = {
  width: '100%',
  height: 20,
  backgroundColor: '#ddd',
  borderRadius: 10,
  overflow: 'hidden',
  marginTop: 5,
  marginBottom: 5,
};

const progressBarFill = {
  height: '100%',
  transition: 'width 0.3s ease',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid #ccc',
};

const thTdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#0288d1',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};
