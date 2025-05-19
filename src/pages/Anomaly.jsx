import React, { useState, useEffect } from 'react';

export default function Anomaly() {
  const [anomalies, setAnomalies] = useState([
    { id: 1, type: '開箱時間過長', detail: '模組A001開箱超過15分鐘', timestamp: '2025-05-10 14:23' },
    { id: 2, type: '模組提前失效', detail: '模組A003冷能失效提早報警', timestamp: '2025-05-12 09:15' },
    { id: 3, type: '數據異常', detail: '溫度感測器數據異常跳動', timestamp: '2025-05-14 11:42' },
  ]);

  const [analysisResult, setAnalysisResult] = useState('異常數據顯示近期開箱時間過長為主要問題，建議優化包裝流程。');
  const [retrainingStatus, setRetrainingStatus] = useState('機器學習模型正在更新中...');
  const [suggestions, setSuggestions] = useState([
    '縮短開箱作業時間',
    '加強冷能監控預警',
    '優化配送路線安排',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRetrainingStatus('模型已更新，準備部署新版本');
      setSuggestions(prev => [...prev, '增加人員培訓']);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={pageStyle}>
      <h2>異常紀錄與冷能失效回報</h2>

      <section style={{ marginBottom: 20 }}>
        <h3>⚠️ 異常紀錄</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>類型</th>
              <th style={tableHeaderStyle}>詳細說明</th>
              <th style={tableHeaderStyle}>時間</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map(({ id, type, detail, timestamp }) => (
              <tr key={id}>
                <td style={tableCellStyle}>{type}</td>
                <td style={tableCellStyle}>{detail}</td>
                <td style={tableCellStyle}>{timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>📊 異常數據分析</h3>
        <p>{analysisResult}</p>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>🚨 冷能失效回訓練狀態</h3>
        <p>{retrainingStatus}</p>
      </section>

      <section>
        <h3>🛠️ 路線與操作流程調整建議</h3>
        <ol>
          {suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

// 樣式區塊
const pageStyle = {
  maxWidth: 700,
  margin: '20px auto',
  padding: 20,
  backgroundColor: '#f7f9fc',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: 10,
};

const tableHeaderStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#e3f2fd',
  fontWeight: 'bold',
};

const tableCellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};
