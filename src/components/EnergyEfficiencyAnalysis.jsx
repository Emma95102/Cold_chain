import React, { useState, useEffect } from 'react';

const pcmEnergyMap = {
  short: 6,    // kWh
  dual: 15,
  smart: 9
};

export default function EnergyEfficiencyAnalysis() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    pcmType: 'short',
    distance: '',
    duration: ''
  });

  const [records, setRecords] = useState([]);

  // Load existing data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('efficiencyRecords');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('efficiencyRecords', JSON.stringify(records));
  }, [records]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addRecord = () => {
    const distance = parseFloat(form.distance);
    const duration = parseFloat(form.duration);
    const energy = pcmEnergyMap[form.pcmType];

    if (!distance || !duration) {
      alert('請輸入有效的行駛距離與時間');
      return;
    }

    const record = {
      ...form,
      distance,
      duration,
      energy,
      kwhPerKm: (energy / distance).toFixed(2),
      kwhPerHr: (energy / duration).toFixed(2)
    };

    setRecords([...records, record]);
    setForm({ ...form, distance: '', duration: '' });
  };

  const exportCSV = () => {
    const headers = ['日期', 'PCM 類型', '行駛距離 (km)', '使用時間 (hr)', '耗能 (kWh)', '每公里耗電', '每小時耗電'];
    const rows = records.map(r => [
      r.date, r.pcmType, r.distance, r.duration, r.energy, r.kwhPerKm, r.kwhPerHr
    ]);

    const csv = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `energy_efficiency_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'grid', gap: 10, maxWidth: 600 }}>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <select name="pcmType" value={form.pcmType} onChange={handleChange}>
          <option value="short">短鏈配送</option>
          <option value="dual">混溫倉</option>
          <option value="smart">智慧保溫箱</option>
        </select>
        <input name="distance" type="number" placeholder="行駛距離 (km)" value={form.distance} onChange={handleChange} />
        <input name="duration" type="number" placeholder="使用時間 (hr)" value={form.duration} onChange={handleChange} />
        <div>
          <button onClick={addRecord} style={{ marginRight: 10 }}>新增紀錄</button>
          <button onClick={exportCSV} disabled={!records.length}>匯出 CSV</button>
        </div>
      </div>

      {records.length > 0 && (
        <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>日期</th><th>PCM 類型</th><th>距離 (km)</th><th>時間 (hr)</th>
              <th>耗能 (kWh)</th><th>每公里耗電</th><th>每小時耗電</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={idx}>
                <td>{r.date}</td>
                <td>{r.pcmType}</td>
                <td>{r.distance}</td>
                <td>{r.duration}</td>
                <td>{r.energy}</td>
                <td>{r.kwhPerKm}</td>
                <td>{r.kwhPerHr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
