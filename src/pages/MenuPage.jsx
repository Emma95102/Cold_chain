// MenuPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "PCM模組冷能狀態管理", path: "/pcm-status" },
  { label: "出車建議與任務指派", path: "/dispatch" },
  { label: "模組庫存與輪替管理", path: "/inventory" },
  { label: "異常記錄與冷能失效回報", path: "/anomaly" },
  { label: "報表與追朔功能", path: "/reports" },
];

function MenuPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-800 mb-6">功能選單</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="bg-white border border-gray-300 rounded-lg shadow p-4 text-green-800 hover:bg-green-50 text-center"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
