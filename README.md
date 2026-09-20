# Yuxiang Qin Academic Homepage

一个面向学术展示的中文个人主页，可直接部署到 GitHub Pages。页面采用原生 HTML、CSS 和 JavaScript，无需安装依赖或执行构建命令。

## 更新个人资料

绝大部分主页内容都集中在 `profile-data.js` 中，包括：

- 姓名、单位、邮箱和个人简介
- Google Scholar、ORCID、GitHub 和简历链接
- 研究方向与关键词
- 论文、项目和经历
- 首页学术数据

请先替换该文件中的示例内容。暂时没有的链接可以保留为空字符串 `""`，页面会自动隐藏相应按钮。

## 本地预览

在仓库目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 发布到 GitHub Pages

1. 将文件提交并推送到 GitHub 的 `main` 分支。
2. 打开仓库的 `Settings` → `Pages`。
3. 在 `Build and deployment` 中选择 `Deploy from a branch`。
4. 选择 `main` 和 `/(root)`，然后保存。

## 文件说明

```text
index.html       页面结构
styles.css       视觉样式与响应式布局
profile-data.js  个人资料与成果数据（主要编辑此文件）
script.js        内容渲染和交互逻辑
```
