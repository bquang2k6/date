// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json()); // Cho phép đọc JSON body

// Route nhận dữ liệu JSON
app.post("/upload", (req, res) => {
  try {
    const data = req.body; // JSON gửi từ frontend
    
    // Log dữ liệu với format đẹp
    console.log("📦 Dữ liệu nhận được:");
    console.log("🕐 Thời gian:", data.timestamp);
    console.log("📍 Địa điểm:", data.userResponses?.locations || []);
    console.log("🚗 Phương tiện:", data.userResponses?.transport || null);
    console.log("⏰ Thời gian hẹn:", data.userResponses?.dateTime || []);
    console.log("🍽️ Món ăn:", data.userResponses?.foods || []);
    console.log("🥤 Đồ uống:", data.userResponses?.drinks || []);
    console.log("❌ Lý do từ chối:", data.userResponses?.rejectionReason || "");
    
    // Lưu file JSON với timestamp
    const filename = `responses_${Date.now()}.json`;
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`💾 Đã lưu file: ${filename}`);

    res.json({ 
      message: "Đã nhận dữ liệu thành công!", 
      timestamp: new Date().toISOString(),
      savedFile: filename,
      received: data 
    });
  } catch (error) {
    console.error("❌ Lỗi khi nhận dữ liệu:", error);
    res.status(500).json({ error: "Lỗi khi xử lý dữ liệu" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
