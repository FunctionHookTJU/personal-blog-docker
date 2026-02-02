# 个人博客系统 - Docker一键部署

这是一个基于Docker的全栈个人博客系统,支持文章的创建、编辑、删除等完整功能。

## 技术栈

### 后端
- **Node.js** - JavaScript运行环境
- **Express** - Web应用框架
- **MongoDB** - NoSQL数据库
- **Mongoose** - MongoDB对象建模工具

### 前端
- **HTML5/CSS3** - 页面结构和样式
- **JavaScript** - 交互逻辑
- **Nginx** - Web服务器

### 容器化
- **Docker** - 容器化平台
- **Docker Compose** - 多容器编排工具

## 项目结构

```
fxhook-dynamic/
├── backend/                # 后端服务
│   ├── server.js          # Express服务器
│   ├── package.json       # 依赖配置
│   └── Dockerfile         # 后端镜像
├── frontend/              # 前端页面
│   ├── index.html         # 博客首页
│   ├── admin.html         # 管理后台
│   ├── style.css          # 样式文件
│   ├── nginx.conf         # Nginx配置
│   └── Dockerfile         # 前端镜像
├── docker-compose.yml     # Docker编排配置
└── README.md             # 项目说明
```

## 功能特性

✅ 文章发布、编辑、删除  
✅ 文章列表展示  
✅ 标签系统  
✅ 响应式设计  
✅ Docker一键部署  
✅ 数据持久化存储  

## 快速开始

### 前置要求

确保你的Linux主机已安装:
- Docker (20.10+)
- Docker Compose (2.0+)

### 安装Docker (如果未安装)

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 一键部署

1. **克隆或上传项目到服务器**

```bash
cd /path/to/your/directory
# 如果从Git克隆
# git clone <your-repo-url>
# cd fxhook-dynamic
```

2. **启动所有服务**

```bash
docker-compose up -d
```

3. **查看服务状态**

```bash
docker-compose ps
```

4. **访问博客**

- 博客首页: http://你的服务器IP
- 管理后台: http://你的服务器IP/admin.html

### 常用命令

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend

# 重启服务
docker-compose restart

# 重新构建并启动
docker-compose up -d --build

# 停止并删除所有数据
docker-compose down -v
```

## 使用说明

### 发布文章

1. 访问管理后台: http://你的IP/admin.html
2. 填写文章标题、作者、标签和内容
3. 点击"发布文章"按钮

### 编辑文章

1. 在管理后台的文章列表中找到要编辑的文章
2. 点击"编辑"按钮
3. 修改内容后点击"发布文章"

### 删除文章

1. 在管理后台点击文章的"删除"按钮
2. 确认删除操作

## API接口文档

### 获取所有文章
```
GET /api/articles
```

### 获取单篇文章
```
GET /api/articles/:id
```

### 创建文章
```
POST /api/articles
Content-Type: application/json

{
  "title": "文章标题",
  "content": "文章内容",
  "author": "作者",
  "tags": ["标签1", "标签2"]
}
```

### 更新文章
```
PUT /api/articles/:id
Content-Type: application/json

{
  "title": "新标题",
  "content": "新内容",
  "author": "作者",
  "tags": ["标签1", "标签2"]
}
```

### 删除文章
```
DELETE /api/articles/:id
```

## 端口配置

- **前端**: 80 (HTTP)
- **后端**: 3000 (API)
- **MongoDB**: 27017 (内部访问)

## 数据持久化

MongoDB数据存储在Docker卷 `mongodb_data` 中,即使容器删除,数据也会保留。

若要完全清除数据:
```bash
docker-compose down -v
```

## 故障排除

### 端口被占用

如果80端口已被占用,修改 `docker-compose.yml`:

```yaml
frontend:
  ports:
    - "8080:80"  # 改为其他端口
```

### 查看错误日志

```bash
# 查看后端日志
docker-compose logs backend

# 查看前端日志
docker-compose logs frontend

# 查看数据库日志
docker-compose logs mongodb
```

### 重置数据库

```bash
docker-compose down
docker volume rm fxhook-dynamic_mongodb_data
docker-compose up -d
```

## 生产环境建议

1. **添加身份认证**: 为管理后台添加登录功能
2. **使用HTTPS**: 配置SSL证书(Let's Encrypt)
3. **备份数据**: 定期备份MongoDB数据
4. **限制访问**: 使用防火墙限制后端API直接访问
5. **环境变量**: 敏感信息使用环境变量管理

## 许可证

MIT License

## 作者

博主

## 更新日志

### v1.0.0 (2026-02-02)
- 初始版本发布
- 基础CRUD功能
- Docker一键部署
