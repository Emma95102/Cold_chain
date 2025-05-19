import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubBtnClick = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  const handleBtnClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      {/* 關於我們 */}
      <button
        className="dropbtn"
        onClick={() => handleBtnClick('/about')}
        type="button"
      >
        關於我們
      </button>

      {/* 功能下拉 */}
      <div
        className="dropdown"
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button
          className="dropbtn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          type="button"
        >
          功能 ▾
        </button>

        {dropdownOpen && (
          <div className="dropdown-content">
            <button
              className="sub-btn"
              onClick={() => handleSubBtnClick('/pcm-status')}
            >
              PCM模組冷能狀態管理
            </button>
            <button
              className="sub-btn"
              onClick={() => handleSubBtnClick('/dispatch')}
            >
              出車建議與任務指派
            </button>
            <button
              className="sub-btn"
              onClick={() => handleSubBtnClick('/inventory')}
            >
              模組庫存與管理輪替
            </button>
            <button
              className="sub-btn"
              onClick={() => handleSubBtnClick('/anomaly')}
            >
              異常紀錄與冷能失效回報
            </button>
            <button
              className="sub-btn"
              onClick={() => handleSubBtnClick('/reports')}
            >
              報表紀錄/匯出功能
            </button>
          </div>
        )}
      </div>


      {/* 聯絡 */}
      <button
        className="dropbtn"
        onClick={() => handleBtnClick('/contact')}
        type="button"
      >
        聯絡
      </button>

       {/* 回到首頁 */}
    <button
      className="dropbtn"
      onClick={() => handleBtnClick('/')}
      type="button"
      >
        回到首頁
      </button>

    </nav>
  );
}
