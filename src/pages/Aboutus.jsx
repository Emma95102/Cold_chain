import React from 'react';

const AboutUs = () => {
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '40px auto',
      borderRadius: '12px',
      padding: '30px 40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: '"Microsoft JhengHei", sans-serif',
      color: '#333',
      background: '#fff8f0',
    },
    title: {
      color: '#e87f04',
      textAlign: 'center',
      marginBottom: '30px',
    },
    subtitle: {
      color: '#e87f04',
      marginTop: '40px',
      marginBottom: '15px',
      borderBottom: '2px solid #e87f04',
      paddingBottom: '6px',
    },
    paragraph: {
      lineHeight: 1.6,
      fontSize: '16px',
    },
    list: {
      listStyleType: 'disc',
      marginLeft: '20px',
      fontSize: '16px',
      lineHeight: 1.6,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    thtd: {
      border: '1px solid #e87f04',
      padding: '12px 15px',
      textAlign: 'left',
    },
    th: {
      backgroundColor: '#fce5d0',
      border: '1px solid #e87f04',
      padding: '12px 15px',
      textAlign: 'left',
    },
    contactBox: {
      backgroundColor: '#fff3e0',
      padding: '15px 20px',
      marginTop: '40px',
      borderRadius: '8px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>關於我們</h1>

      <h2 style={styles.subtitle}>團隊簡介</h2>
      <p style={styles.paragraph}>
        我們是一群大學生，為了減少碳排放，致力於研發創新且永續的冷鏈物流方案。我們提出以 PCM（相變材料） 取代傳統冷媒的物流車概念，期望打造更環保、低碳且高效率的冷鏈運輸模式，為未來的綠色供應鏈貢獻一份心力。
      </p>

      <h2 style={styles.subtitle}>我們的努力</h2>
      <p style={styles.paragraph}>
        提出創新的冷鏈方案和物流平台，確保每一個環節都符合需求，保障品質與安全。
      </p>

      <h2 style={styles.subtitle}>我們的願景</h2>
      <p style={styles.paragraph}>
        成為台灣領先的冷鏈物流平台，推動行業升級，促進可持續發展。
      </p>

      <h2 style={styles.subtitle}>核心價值</h2>
      <ul style={styles.list}>
        
        <li><strong>創新</strong>：不斷研發並採用最新冷鏈科技</li>
        <li><strong>服務</strong>：以客戶需求為中心，提供量身定制方案</li>
        <li><strong>ESG議題</strong>：符合ESG議題，提升品牌價值</li>
      </ul>

      <h2 style={styles.subtitle}>團隊介紹</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>姓名</th>
            <th style={styles.th}>職位</th>
            <th style={styles.th}>簡短介紹</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.thtd}>黃紫凌</td>
            <td style={styles.thtd}>隊長</td>
            <td style={styles.thtd}>開發平台&概念發想人</td>
          </tr>
          <tr>
            <td style={styles.thtd}>劉柏岑</td>
            <td style={styles.thtd}>副隊長</td>
            <td style={styles.thtd}>團隊創意道具發射器</td>
          </tr>
          <tr>
            <td style={styles.thtd}>郭碩元</td>
            <td style={styles.thtd}>隊員</td>
            <td style={styles.thtd}>口頭報告分析者</td>
          </tr>
          <tr>
            <td style={styles.thtd}>吳沛涵</td>
            <td style={styles.thtd}>隊員</td>
            <td style={styles.thtd}>視覺效果氣氛組</td>
          </tr><tr>
            <td style={styles.thtd}>陳萱芮</td>
            <td style={styles.thtd}>隊員</td>
            <td style={styles.thtd}>視覺效果氣氛組</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AboutUs;
