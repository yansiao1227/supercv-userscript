# supercv-userscript

为 [超级简历 WonderCV](https://www.wondercv.com/) 编辑页添加一个打印按钮，调用浏览器打印功能，打印当前简历或将其保存为 PDF。

[安装脚本](https://raw.githubusercontent.com/yansiao1227/supercv-userscript/main/main.user.js) · [反馈问题](https://github.com/yansiao1227/supercv-userscript/issues)

## 功能

- **一键打印简历**：在编辑页左侧靠下的位置添加 `print` 悬浮按钮。
- **聚焦简历内容**：提取页面中的简历容器，放入独立 iframe，避免将编辑器的工具栏等界面一起打印。
- **复制页面样式**：将页面样式复制到打印文档，尽量保留简历排版。
- **保存为 PDF**：通过浏览器打印对话框选择“另存为 PDF”。

脚本适用的页面地址为：

```text
https://www.wondercv.com/cvs/*/editor
```

## 安装

1. 在浏览器中安装并启用 [Tampermonkey](https://www.tampermonkey.net/) 扩展。
2. 点击 [安装 supercv-userscript](https://raw.githubusercontent.com/yansiao1227/supercv-userscript/main/main.user.js)，在 Tampermonkey 打开的安装页面确认安装。
3. 打开或刷新超级简历编辑页，确认页面左侧出现 `print` 按钮。

如果安装链接只显示脚本源码，可以复制全部内容，在 Tampermonkey 中新建脚本，替换默认内容后保存。

## 使用

1. 打开需要打印的简历，等待内容、字体和图片加载完成。
2. 点击页面左侧的 `print` 按钮；按钮会暂时显示为 `load`。
3. 在浏览器打印预览中检查排版，按需调整纸张、缩放和边距。
4. 选择打印机，或选择“另存为 PDF”后保存。

如果预览中出现网址、日期等页眉页脚，请在浏览器打印设置中关闭“页眉和页脚”；如果背景颜色缺失，可尝试开启“背景图形”。具体选项名称以浏览器为准。

## 工作原理

脚本读取编辑页中 ID 为 `cv-container` 的元素，将其克隆到独立 iframe，同时复制主页面的样式表和内联样式。随后设置打印页边距为 `0`，等待约 1 秒后调用 iframe 的 `window.print()`。

打印内容来自当前页面已渲染的简历。实际分页、字体、颜色和边距由页面样式及浏览器打印设置共同决定，请以打印预览为准。

## 本地开发

项目使用 **TypeScript + Rollup + CSS Modules**。

### 获取代码

```bash
git clone https://github.com/yansiao1227/supercv-userscript.git
cd supercv-userscript
npm install
```

### 开发调试

```bash
npm run dev
```

开发模式会监听文件变化，并生成：

- `dist/main.dev.user.js`：开发版本的脚本主体，包含内联 Source Map。
- `dist/dev.user.js`：通过本地文件路径引用脚本主体的开发入口。

在 Tampermonkey 中安装 `dist/dev.user.js`，并按浏览器要求允许扩展访问文件网址。修改源码并完成重新构建后，刷新目标编辑页查看效果。调试时建议暂时禁用正式版脚本，避免出现重复按钮。

### 构建

```bash
npm run build
```

构建命令先执行 TypeScript 类型检查，再将脚本打包到仓库根目录的 `main.user.js`。修改功能时编辑 `src/` 中的源码，再重新构建生成安装文件。

### 主要文件

```text
.
├── src/
│   ├── main.ts                  # 打印逻辑与按钮创建
│   ├── meta.json                # 脚本名称、版本和页面匹配规则
│   └── styles/
│       └── global.module.css    # 悬浮按钮样式
├── rollup_configs/              # Rollup 插件配置
├── rollup.config.js             # 开发与生产构建配置
├── main.user.js                 # 可安装的脚本产物
└── package.json                 # 依赖与开发命令
```

## 常见问题

### 页面没有出现打印按钮

- 检查 Tampermonkey 和脚本是否已启用，并具备目标网站的运行权限。
- 确认当前地址符合 `www.wondercv.com/cvs/*/editor`，随后刷新页面。
- 如果浏览器或扩展提示需要开启用户脚本相关权限，请按提示配置。

### 提示找不到 `cv-container`

先等待简历加载完成后重试。如果持续出现，可能是网站页面结构发生变化，需要更新 `src/main.ts` 中的目标元素选择逻辑。

### 打印样式或分页与页面不一致

脚本会复制页面样式，但打印结果仍受字体、图片加载及浏览器打印规则影响。请先等待页面资源加载完成，再检查打印预览中的纸张、缩放、边距和背景设置。

### 如何更新脚本

重新打开 [安装链接](https://raw.githubusercontent.com/yansiao1227/supercv-userscript/main/main.user.js)，在 Tampermonkey 中确认更新。当前脚本元数据未配置 `@updateURL` 和 `@downloadURL`，可通过此方式手动更新。

## 问题反馈

欢迎通过 [GitHub Issues](https://github.com/yansiao1227/supercv-userscript/issues) 反馈问题。请提供浏览器和 Tampermonkey 版本、复现步骤，以及必要的截图；截图前请遮挡简历中的个人信息。
