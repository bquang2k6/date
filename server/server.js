const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// 📥 Nhận dữ liệu và lưu file
app.post("/upload", (req, res) => {
  try {
    const data = req.body;
    const dir = path.join(__dirname, "data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const filename = `responses_${Date.now()}.json`;
    const filepath = path.join(dir, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log(`💾 Đã lưu file: ${filename}`);

    res.json({
      message: "Đã nhận dữ liệu thành công!",
      savedFile: filename,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lưu dữ liệu:", error);
    res.status(500).json({ error: "Lỗi khi xử lý dữ liệu" });
  }
});

// 📂 Lấy danh sách file JSON có thêm thời gian tạo
app.get("/files", (req, res) => {
  const dir = path.join(__dirname, "data");
  if (!fs.existsSync(dir)) return res.json([]);

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const stats = fs.statSync(path.join(dir, f));
      return {
        filename: f,
        createdAt: stats.birthtime, // Thời gian tạo file
        sizeKB: (stats.size / 1024).toFixed(2),
      };
    })
    // Sắp xếp mới nhất lên đầu
    .sort((a, b) => b.createdAt - a.createdAt);

  res.json(files);
});

// 🔍 Lấy nội dung file mới nhất (auto)
app.get("/latest", (req, res) => {
  const dir = path.join(__dirname, "data");
  if (!fs.existsSync(dir)) return res.status(404).json({ error: "Chưa có file nào" });

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({
      name: f,
      time: fs.statSync(path.join(dir, f)).birthtimeMs,
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length === 0) return res.status(404).json({ error: "Không có file JSON nào" });

  const latestFile = files[0].name;
  const content = fs.readFileSync(path.join(dir, latestFile), "utf-8");
  res.json({
    filename: latestFile,
    data: JSON.parse(content),
  });
});
// 🔵 Route GET lấy nội dung của một file cụ thể
app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "data", filename);

  // Kiểm tra file có tồn tại không
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: "File không tồn tại" });
  }

  try {
    const content = fs.readFileSync(filepath, "utf-8");
    res.json(JSON.parse(content));
  } catch (error) {
    console.error("❌ Lỗi khi đọc file:", error);
    res.status(500).json({ error: "Không thể đọc file" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
