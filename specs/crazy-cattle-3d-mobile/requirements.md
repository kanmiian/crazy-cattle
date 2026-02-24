# 需求文档

## 介绍
新增 Crazy Cattle 3D Mobile 游戏内页。该页面通过 iframe 内嵌 `https://crazycattle3dgithub.io/game/crazy-cattle-3d-mobile/` 的移动端版本，并在文案和结构化内容中明确说明：这是在 Crazy Cattle 3D PC 版基础上改造的移动端（mobile）版本，重点优化与 “crazy cattle 3d mobile”“mobile game”“mobile version” 等相关关键词的 SEO 表达。

## 需求

### 需求 1 - 创建 Crazy Cattle 3D Mobile 游戏页面
**用户故事：** 作为移动端用户，我希望能够访问 Crazy Cattle 3D Mobile 页面，在手机浏览器中直接游玩 Crazy Cattle 3D 的移动端版本。

#### 验收标准
1. When 用户访问 `/crazy-cattle-3d-mobile` 路径时，the 系统应当显示 Crazy Cattle 3D Mobile 独立游戏页面。
2. When 页面加载时，the 页面应当展示包含 “Crazy Cattle 3D Mobile” 关键词的 H1 标题和简介文案。
3. When 页面展示文案时，the 文案应当明确说明这是在 Crazy Cattle 3D PC 版基础上改造的 mobile 版 / 移动端版本。
4. When 用户点击 “Play Mobile Version” 或类似主操作按钮时，the 系统应当在同一页面中展示 iframe，并通过 iframe 加载 `https://crazycattle3dgithub.io/game/crazy-cattle-3d-mobile/`。
5. While iframe 内容加载中, when 加载未完成时, the 页面应当显示 loading / 预览占位状态，避免白屏。

### 需求 2 - SEO 与元数据优化（Crazy Cattle 3D Mobile）
**用户故事：** 作为 SEO 优化需求，我希望 Crazy Cattle 3D Mobile 页面在标题、描述和正文中突出 “crazy cattle 3d mobile” 及 “mobile” 相关词，以提升搜索引擎排名。

#### 验收标准
1. When 生成页面 `<title>` 时，the 系统应当包含 “Crazy Cattle 3D Mobile” 和 “mobile” 关键词，并提及这是 Crazy Cattle 3D 的移动端版本。
2. When 生成 meta description 时, the 系统应当包含 “crazy cattle 3d mobile”“mobile version”“mobile game”“PC 版改 mobile 版”等自然融入的描述。
3. When 页面主体内容渲染时, the 页面至少包含 1 个 H1 和若干 H2/H3 小标题，自然出现 “Crazy Cattle 3D Mobile”“Crazy Cattle 3D PC version”“mobile version” 等关键词，且不显堆砌。
4. When SEO 组件处理 `/crazy-cattle-3d-mobile` 路径时, the 系统应当返回对应的 canonical 链接（`https://cattlecrazy3d.com/crazy-cattle-3d-mobile`）以及 Open Graph / Twitter Card 元信息。
5. When 搜索引擎抓取页面时, the 页面不应出现与 PC 版主页完全重复的 title/description，而是针对移动端版本单独优化的内容。

### 需求 3 - 导航与游戏菜单入口更新
**用户故事：** 作为网站用户，我希望能在导航和游戏列表中直观地找到 Crazy Cattle 3D Mobile 入口，以便在 PC 端或移动端快速进入移动版游戏。

#### 验收标准
1. When 用户在桌面端打开站点并点击 “Games” 菜单时，the 游戏抽屉列表中应当包含 “Crazy Cattle 3D Mobile” 的入口链接，指向 `/crazy-cattle-3d-mobile`。
2. When 用户在移动端打开站点的移动菜单时, the 游戏列表区域应当同样包含 “Crazy Cattle 3D Mobile” 链接。
3. When 用户从任意页面点击 “Crazy Cattle 3D Mobile” 链接时, the 系统应当路由到 `/crazy-cattle-3d-mobile`，并正确渲染对应页面内容。
4. While 导航样式在不同分辨率下切换时, when 屏幕宽度变化, the 新增入口的样式和布局应当与现有游戏入口保持一致，不破坏现有导航结构。

### 需求 4 - 移动端体验与布局优化
**用户故事：** 作为移动端玩家，我希望 Crazy Cattle 3D Mobile 页面在手机上浏览时布局合理、不卡顿，游戏区域清晰可见，避免横向滚动。

#### 验收标准
1. When 设备宽度小于 768px 时, the 页面主要内容（标题、简介、按钮和 iframe）应当在纵向单列排布，避免产生水平滚动条。
2. When 在移动端展示 iframe 时, the 游戏容器宽度应当自适应屏幕宽度（100%），高度采用适合移动端浏览的比例（例如 16:9 或接近 70vh），确保游戏区域清晰可玩。
3. When iframe 加载完成后, the 页面不应出现严重的布局抖动或内容跳动，按钮和文字仍保持可点击和可阅读。
4. When 用户在移动端上下滚动页面时, the 顶部 SEO 文案区域与游戏区域应当滚动流畅，不影响正常操作。

