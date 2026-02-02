const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB连接
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/blog';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 文章模型
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: '博主' },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

// API路由

// 获取所有文章
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 获取单篇文章
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 创建文章
app.post('/api/articles', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const article = new Article({
      title,
      content,
      author: author || '博主',
      tags: tags || []
    });
    await article.save();
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 更新文章
app.put('/api/articles/:id', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        author, 
        tags,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    res.json({ success: true, message: '文章删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '服务运行正常' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
