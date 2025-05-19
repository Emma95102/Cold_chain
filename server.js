const express = require('express');
const path = require('path');
const app = express();

// 提供 public 資料夾中的靜態檔案
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ 伺服器啟動成功：http://localhost:${PORT}`);
});
