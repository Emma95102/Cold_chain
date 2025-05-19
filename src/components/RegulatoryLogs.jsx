import React, { useState, useEffect } from 'react';

export default function RegulatoryLogs() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: '開箱紀錄',
    level: '提醒',
    description: ''
  });

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('regulatoryLogs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('regulatoryLogs', JSON.stringify(logs));
  }, [logs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addLog = () => {
    if (!form.description.trim()) {
      alert('請輸入事件描述');
      return;
    }
    setLogs([...logs, form]);
    setForm({ ...form, description: '' });
  };

  const exportCSV = () => {
    const headers = ['日期', '事件類型', '嚴重程度', '描述'];
    const rows = logs.map(log => [
      log.date, log.type, log.level, log.description
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `regulatory_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'grid', gap: 10, maxWidth: 600 }}>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="開箱紀錄">開箱紀錄</option>
          <option value="溫度異常">溫度異常</option>
          <option value="手動介入">手動介入</option>
          <option value="設備警報">設備警報</option>
          <option value="其他">其他</option>
        </select>
        <select name="level" value={form.level} onChange={handleChange}>
          <option value="提醒">提醒</option>
          <option value="警告">警告</option>
          <option value="嚴重">嚴重</option>
        </select>
        <textarea
          name="description"
          placeholder="請描述事件內容"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
        <div>
          <button onClick={addLog} style={{ marginRight: 10 }}>新增紀錄</button>
          <button onClick={exportCSV} disabled={!logs.length}>匯出 CSV</button>
        </div>
      </div>

      {logs.length > 0 && (
        <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>日期</th><th>類型</th><th>嚴重程度</th><th>描述</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx}>
                <td>{log.date}</td>
                <td>{log.type}</td>
                <td>{log.level}</td>
                <td>{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
