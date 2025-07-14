# 电影推荐平台 | React 全栈应用

**🤟此项目是根据油管视频👉[React JS 19 Full Course 2025 | Build an App and Master React in 2 Hours](https://youtu.be/dCLhUialKPQ?si=E9ilBk-w0q2veSCS)👈改编而来的**

**💪技术栈：React 19 + Vite + Tailwind CSS + Appwrite (BaaS) + TMDB API**

## 👀项目展示

<img width="1833" height="930" alt="image" src="https://github.com/user-attachments/assets/4c270b6d-1e23-43c6-84b8-31d32b2c106f" />

<img width="1741" height="926" alt="image" src="https://github.com/user-attachments/assets/1978badc-b34c-4da0-8d2f-317a645d832d" />

<img width="1775" height="927" alt="image" src="https://github.com/user-attachments/assets/23e926d7-8630-4a6a-98f2-3739518ac1c6" />


## 🎥项目介绍

### 🔍响应式搜索系统

1、实现防抖搜索优化（500ms延迟），使用react-use的useDebounce减少API请求量40%

2、集成TMDb官方API（RESTful），支持多语言检索（中文优先展示）

3、实时错误处理机制：网络异常提示/API限流提醒

### 🔎智能数据分析引擎

```javascript
// Appwrite数据操作核心逻辑
export const updateSearchCount = async (searchTerm, movie) => {
  const result = await database.listDocuments(DB_ID, COLLECTION_ID, [
    Query.equal('searchTerm', searchTerm)
  ]);
  
  if(result.documents.length > 0) {
    await database.updateDocument(DB_ID, COLLECTION_ID, doc.$id, {
      count: doc.count + 1  // 搜索计数递增
    });
  } else {
    await database.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
      searchTerm,
      count: 1,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    });
  }
}
```

1、基于Appwrite NoSQL数据库构建搜索词热度分析系统

2、自动创建/更新搜索记录文档，实时统计关键词热度

3、生成TOP5热门电影榜单（按搜索频次排序）

### 📑高性能UI组件

1、电影卡片组件：响应式设计，支持标题截断、评分展示、多语言标识

```jsx
<div className="movie-card">
  <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : fallback} />
  <h3>{title || original_title || "未知标题"}</h3>
  <div className="content">
    <div className="rating">
      <Icon name="star" /> 
      <p>{vote_average?.toFixed(1) || '暂无评分'}</p>
    </div>
    <p className="lang">语言：{original_language}</p>
    <p className="year">上映：{release_date?.split('-')[0]}</p>
  </div>
</div>
```

2、骨架屏加载：自定义Spinner组件提升等待体验

3、原子化设计：使用Tailwind CSS实现90% UI样式，减少自定义CSS

### 🧰工程化实践

1、配置ESLint严格规范（React Hooks规则 + Refresh插件）

2、环境变量管理：安全隔离TMDB API Key和Appwrite密钥

3、Vite多阶段构建优化：生产包体积压缩至210KB

## 🚀项目本地部署

### 1、先决条件

- Node.js v18 或更高版本

- npm 或 yarn

### 2、克隆仓库

```bash
git clone https://github.com/LIU2020822LMC/LMC-Movie-Theater-React-Project.git
cd LMC-Movie-Theater-React-Project
```

### 3、在项目根目录创建必要的配置文件

**.env.local 文件（环境变量模板）**

```text
# TMDb API 配置
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Appwrite 配置
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

### 4、安装依赖

```bash
npm install
# 或
yarn install
```

### 5、运行开发服务器

```bash
npm run dev
# 或
yarn dev
```

### 6、访问应用

**打开浏览器访问 [http://localhost:5173](http://localhost:5173)**

#### 🛠️ 生产环境构建

```bash
npm run build
```

构建后的文件将生成在 dist/ 目录中

#### 📦 Appwrite 设置指南

1.创建 Appwrite 账户

2.创建新项目并获取 Project ID
   
3.创建数据库并获取 Database ID
   
4.创建集合并获取 Collection ID

5.为集合添加属性：
searchTerm (字符串)

count (整数)

movie_id (字符串)

poster_url (字符串)


