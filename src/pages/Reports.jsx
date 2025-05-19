import React from 'react';
import PCMcarbon from '../components/PCMcarbon.jsx';
import DailyDispatchRecords from '../components/DailyDispatchRecords';
import EnergyEfficiencyAnalysis from '../components/EnergyEfficiencyAnalysis';
import MonthlyFailureStats from '../components/MonthlyFailureStats';
import RegulatoryLogs from '../components/RegulatoryLogs';

export default function Reports() {
  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: 20 }}>
      <h1>📊 報表與追溯功能</h1>

      <section>
        <h2>📅 PCM碳排追蹤報表</h2>
        <PCMcarbon />
      </section>



      <section>
        <h2>📅 每日出車模組配置紀錄</h2>
        <DailyDispatchRecords />
      </section>

      <section>
        <h2>📉 冷能使用效能分析</h2>
        <EnergyEfficiencyAnalysis />
      </section>

      <section>
        <h2>📈 月度模組使用與失效統計</h2>
        <MonthlyFailureStats />
      </section>

      <section>
        <h2>🌱 ESG 碳排放報告支援</h2>
        <PCMcarbon />
      </section>

      <section>
        <h2>📜 冷鏈安全監管紀錄保存</h2>
        <RegulatoryLogs />
      </section>
    </div>
  );
}
