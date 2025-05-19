import React, { useState } from 'react';

const emissionFactors = {
  diesel: 2.68,
  electricity: 0.502
};

const pcmPresets = {
  short: 6,
  dual: 15,
  smart: 9
};

export default function PCMCarbonReport() {
  const [form, setForm] = useState({ vehicleId: '', diesel: '', pcmType: 'short' });
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const diesel = parseFloat(form.diesel) || 0;
    const pcmEnergy = pcmPresets[form.pcmType];
    const dieselCO2 = diesel * emissionFactors.diesel;
    const pcmCO2 = pcmEnergy * emissionFactors.electricity;
    const totalCO2 = dieselCO2 + pcmCO2;

    const record = {
      date: new Date().toISOString().slice(0, 10),
      vehicleId: form.vehicleId,
      pcmType: form.pcmType,
      diesel: diesel.toFixed(2),
      dieselCO2: dieselCO2.toFixed(2),
      pcmEnergy,
      pcmCO2: pcmCO2.toFixed(2),
      totalCO2: totalCO2.toFixed(2)
    };

    setHistory([...history, record]);
  };

  const exportCSV = () => {
    if (!history.length) return;

    const headers = [
      '日期', '車輛編號', 'PCM 模組', '柴油 (L)',
      '柴油碳排 (kg)', 'PCM 電量 (kWh)', 'PCM 碳排 (kg)', '總碳排 (kg)'
    ];

    const rows = history.map(r => [
      r.date, r.vehicleId, r.pcmType, r.diesel,
      r.dieselCO2, r.pcmEnergy, r.pcmCO2, r.totalCO2
    ]);

    const csv = '\uFEFF' + [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon_history_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: 20 }}>
      <h2>PCM 模組碳排報表</h2>

      <div style={{ display: 'grid', gap: 10 }}>
        <input name="vehicleId" placeholder="車輛編號" value={form.vehicleId} onChange={handleChange} />
        <input name="diesel" placeholder="柴油使用量 (公升)" type="number" value={form.diesel} onChange={handleChange} />
        <select name="pcmType" value={form.pcmType} onChange={handleChange}>
          <option value="short">短鏈配送（4°C）</option>
          <option value="dual">混溫倉（冷藏+冷凍）</option>
          <option value="smart">智慧保溫箱（藥品）</option>
        </select>
        <div>
          <button onClick={calculate} style={{ marginRight: 10 }}>新增紀錄</button>
          <button onClick={exportCSV} disabled={!history.length}>匯出 CSV</button>
        </div>
      </div>

      {history.length > 0 && (
        <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>日期</th><th>車輛</th><th>PCM 模組</th><th>柴油</th>
              <th>柴油碳排</th><th>PCM 電量</th><th>PCM 碳排</th><th>總碳排</th>
            </tr>
          </thead>
          <tbody>
            {history.map((r, idx) => (
              <tr key={idx}>
                <td>{r.date}</td><td>{r.vehicleId}</td><td>{r.pcmType}</td><td>{r.diesel}</td>
                <td>{r.dieselCO2}</td><td>{r.pcmEnergy}</td><td>{r.pcmCO2}</td><td>{r.totalCO2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

