import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function MonthlyFailureStats() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    pcmType: 'short',
    failed: false
  });

  const [records, setRecords] = useState([]);

  // 初始化 localStorage
  useEffect(() => {
    const saved = localStorage.getItem('failureRecords');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  // 寫入 localStorage
  useEffect(() => {
    localStorage.setItem('failureRecords', JSON.stringify(records));
  }, [records]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 有效使用勾選框改動時，反向設定 failed
    if (name === 'valid') {
      setForm({
        ...form,
        failed: !checked
      });
    } else {
      setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const addRecord = () => {
    setRecords([...records, form]);
  };

  const exportCSV = () => {
    const headers = ['日期', 'PCM 類型', '有效使用', '是否失效'];
    const rows = records.map(r => [
      r.date,
      r.pcmType,
      r.failed ? '否' : '是',
      r.failed ? '是' : '否'
    ]);

    const csv = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `failure_stats_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // 資料統計整理（依月份與 PCM 類型統計）
  const stats = records.reduce((acc, rec) => {
    const month = rec.date.slice(0, 7); // yyyy-MM
    const key = `${month}-${rec.pcmType}`;
    if (!acc[key]) {
      acc[key] = { month, pcmType: rec.pcmType, total: 0, failed: 0 };
    }
    acc[key].total += 1;
    if (rec.failed) acc[key].failed += 1;
    return acc;
  }, {});

  const chartData = Object.values(stats).map(item => ({
    ...item,
    failureRate: +(item.failed / item.total * 100).toFixed(1) // %
  }));

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'grid', gap: 10, maxWidth: 600 }}>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <select name="pcmType" value={form.pcmType} onChange={handleChange}>
          <option value="short">短鏈配送</option>
          <option value="dual">混溫倉</option>
          <option value="smart">智慧保溫箱</option>
        </select>

        <label>
          <input
            name="valid"
            type="checkbox"
            checked={!form.failed}
            onChange={handleChange}
            style={{ marginRight: 5 }}
          />
          有效使用
        </label>

        <div>
          <button onClick={addRecord} style={{ marginRight: 10 }}>新增紀錄</button>
          <button onClick={exportCSV} disabled={!records.length}>匯出 CSV</button>
        </div>
      </div>

      {records.length > 0 && (
        <>
          <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse', border: '1px solid #ccc' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc' }}>日期</th>
                <th style={{ border: '1px solid #ccc' }}>PCM 類型</th>
                <th style={{ border: '1px solid #ccc' }}>有效使用</th>
                <th style={{ border: '1px solid #ccc' }}>是否失效</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ccc' }}>{r.date}</td>
                  <td style={{ border: '1px solid #ccc' }}>{r.pcmType}</td>
                  <td style={{ border: '1px solid #ccc' }}>{r.failed ? '否' : '是'}</td>
                  <td style={{ border: '1px solid #ccc' }}>{r.failed ? '是' : '否'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: 40 }}>📊 月度失效率 (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Bar dataKey="failureRate" fill="#f44336" name="失效率 (%)" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
