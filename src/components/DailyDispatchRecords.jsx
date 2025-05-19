import React, { useState, useEffect } from 'react';

export default function DailyDispatchRecords() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    vehicleId: '',
    pcmType: 'short',
    route: '',
    operator: ''
  });

  const [records, setRecords] = useState([]);

  // ✅ 初始化資料
  useEffect(() => {
    const saved = localStorage.getItem('dispatchRecords');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  // ✅ 自動儲存到 localStorage
  useEffect(() => {
    localStorage.setItem('dispatchRecords', JSON.stringify(records));
  }, [records]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addRecord = () => {
    if (!form.vehicleId || !form.route || !form.operator) {
      alert('請完整填寫所有欄位');
      return;
    }

    setRecords([...records, { ...form }]);
    setForm({ ...form, vehicleId: '', route: '', operator: '' });
  };

  const deleteRecord = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  const exportCSV = () => {
    if (!records.length) return;

    const headers = ['日期', '車輛編號', 'PCM 類型', '配送路線', '操作人員'];
    const rows = records.map(r => [r.date, r.vehicleId, r.pcmType, r.route, r.operator]);

    const csv = '\uFEFF' + [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dispatch_records_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'grid', gap: 10, maxWidth: 600 }}>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          name="vehicleId"
          placeholder="車輛編號"
          value={form.vehicleId}
          onChange={handleChange}
        />
        <select
          name="pcmType"
          value={form.pcmType}
          onChange={handleChange}
        >
          <option value="short">短鏈配送</option>
          <option value="dual">混溫倉</option>
          <option value="smart">智慧保溫箱</option>
        </select>
        <input
          name="route"
          placeholder="配送路線"
          value={form.route}
          onChange={handleChange}
        />
        <input
          name="operator"
          placeholder="操作人員"
          value={form.operator}
          onChange={handleChange}
        />
        <div>
          <button onClick={addRecord} style={{ marginRight: 10 }}>新增紀錄</button>
          <button onClick={exportCSV} disabled={!records.length}>匯出 CSV</button>
        </div>
      </div>

      {records.length > 0 && (
        <table style={{
          width: '100%',
          marginTop: 20,
          borderCollapse: 'collapse',
          border: '1px solid #ccc'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>日期</th>
              <th>車輛編號</th>
              <th>PCM 類型</th>
              <th>配送路線</th>
              <th>操作人員</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={idx}>
                <td>{r.date}</td>
                <td>{r.vehicleId}</td>
                <td>{r.pcmType}</td>
                <td>{r.route}</td>
                <td>{r.operator}</td>
                <td>
                  <button onClick={() => deleteRecord(idx)}>刪除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
