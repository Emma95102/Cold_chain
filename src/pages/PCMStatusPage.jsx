import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function PCMStatusPage() {
  const [coolingPercent, setCoolingPercent] = useState(() =>
    parseFloat(localStorage.getItem('coolingPercent')) || 75
  );
  const [preCoolingSeconds, setPreCoolingSeconds] = useState(() =>
    parseInt(localStorage.getItem('preCoolingSeconds')) || 300
  );
  const [keepWarmSeconds, setKeepWarmSeconds] = useState(() =>
    parseInt(localStorage.getItem('keepWarmSeconds')) || 7200
  );
  const [moduleStatus, setModuleStatus] = useState('正常');

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 倒數與冷能百分比
  useEffect(() => {
    const interval = setInterval(() => {
      setPreCoolingSeconds(prev => Math.max(prev - 1, 0));
      setKeepWarmSeconds(prev => Math.max(prev - 1, 0));
      setCoolingPercent(prev => (prev > 0 ? parseFloat((prev - 0.1).toFixed(1)) : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 狀態變化與儲存 + 圖表更新
  useEffect(() => {
    if (coolingPercent < 20) {
      setModuleStatus('冷能不足，請注意更換');
    } else if (coolingPercent < 50) {
      setModuleStatus('冷能中等，建議注意');
    } else {
      setModuleStatus('正常');
    }

    localStorage.setItem('coolingPercent', coolingPercent);
    localStorage.setItem('preCoolingSeconds', preCoolingSeconds);
    localStorage.setItem('keepWarmSeconds', keepWarmSeconds);

    if (chartInstance.current) {
      const now = new Date().toLocaleTimeString();
      chartInstance.current.data.labels.push(now);
      chartInstance.current.data.datasets[0].data.push(coolingPercent);
      if (chartInstance.current.data.labels.length > 20) {
        chartInstance.current.data.labels.shift();
        chartInstance.current.data.datasets[0].data.shift();
      }
      chartInstance.current.update();
    }
  }, [coolingPercent, preCoolingSeconds, keepWarmSeconds]);

  // 初始化 Chart.js（修正：先銷毀再初始化）
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // ✅ 防止 Canvas 被重複綁定
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '冷能趨勢 (%)',
          data: [],
          borderColor: '#0288d1',
          borderWidth: 2,
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { min: 0, max: 100 }
        }
      }
    });
  }, []);

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  return (
    <div style={pageStyle}>
      <h2>PCM 模組冷能狀態管理</h2>

      <div style={{ marginBottom: 20 }}>
        <strong>🧊 冷能剩餘百分比: </strong>
        <span>{coolingPercent.toFixed(1)}%</span>
        <div style={progressBarOuter}>
          <div style={{
            ...progressBarInner,
            width: `${coolingPercent}%`,
            backgroundColor: coolingPercent > 50 ? '#0288d1' : (coolingPercent > 20 ? '#ffa726' : '#d32f2f'),
          }} />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>⏱️ 預冷完成倒數: </strong>
        <span>{formatTime(preCoolingSeconds)}</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>⌛ 保溫效期倒數: </strong>
        <span>{formatTime(keepWarmSeconds)}</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>🔔 模組使用狀態: </strong>
        <span style={{ color: moduleStatus === '正常' ? 'green' : 'red' }}>{moduleStatus}</span>
      </div>

      <div>
        <h4>📈 冷能趨勢圖（過去 20 秒）</h4>
        <canvas ref={chartRef} width="100%" height="200" />
      </div>
    </div>
  );
}

// 樣式
const pageStyle = {
  maxWidth: 700,
  margin: '20px auto',
  padding: 20,
  backgroundColor: '#f7f9fc',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
};

const progressBarOuter = {
  height: 20,
  width: '100%',
  backgroundColor: '#ddd',
  borderRadius: 10,
  overflow: 'hidden',
  marginTop: 5
};

const progressBarInner = {
  height: '100%',
  transition: 'width 1s linear'
};
