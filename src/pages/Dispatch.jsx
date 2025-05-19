import React, { useState, useEffect } from 'react';

export default function Dispatch() {
  const taskOptions = [
    { label: '請選擇配送任務', value: '' },
    { label: '配送都市門市', value: '配送都市門市' },
    { label: '冷凍/冷藏食品', value: '冷凍/冷藏食品' },
    { label: '醫療用藥品', value: '醫療用藥品' },
  ];

  const taskConfig = {
    '配送都市門市': {
      module: '短鏈即配模組 A',
      time: 25,
    },
    '冷凍/冷藏食品': {
      module: '混溫倉儲模組 B',
      time: 35,
    },
    '醫療用藥品': {
      module: '智慧保溫箱模組 C',
      time: 30,
    },
  };

  const [taskInput, setTaskInput] = useState('');
  const [recommendedModule, setRecommendedModule] = useState('');
  const [coolingPercent, setCoolingPercent] = useState(65);
  const [optimizedTime, setOptimizedTime] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (taskInput.trim() === '') {
      setRecommendedModule('');
      setAlertMessage('');
      setOptimizedTime(null);
      return;
    }

    const config = taskConfig[taskInput];
    if (config) {
      setRecommendedModule(config.module);
      setOptimizedTime(config.time);
    } else {
      setRecommendedModule('尚無推薦');
      setOptimizedTime(null);
    }

    // 冷能不足警示
    setAlertMessage(coolingPercent < 30 ? '⚠️ 冷能不足，請補充或更換模組' : '');
  }, [taskInput, coolingPercent]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoolingPercent((prev) => (prev > 0 ? prev - 0.2 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={pageStyle}>
      <h2>出車建議與任務指派</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          📝 配送任務輸入：
          <select
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            style={inputStyle}
          >
            {taskOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>推薦模組：</strong> {recommendedModule || '尚無推薦'}
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>冷能剩餘百分比：</strong> {coolingPercent.toFixed(1)}%
      </div>

      {alertMessage && (
        <div style={{ color: 'red', marginBottom: 20, fontWeight: 'bold' }}>
          {alertMessage}
        </div>
      )}

      <div>
        <strong>出車時間最佳化建議：</strong>{' '}
        {optimizedTime !== null ? `約 ${optimizedTime} 分鐘` : '請選擇任務'}
      </div>
    </div>
  );
}

const pageStyle = {
  maxWidth: 600,
  margin: '20px auto',
  padding: 20,
  backgroundColor: '#f7f9fc',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const inputStyle = {
  marginLeft: 10,
  padding: 8,
  width: '75%',
  borderRadius: 4,
  border: '1px solid #ccc',
  fontSize: 16,
};
