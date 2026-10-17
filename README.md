# 萌爪星空 · Paws & Glow (Next.js 现代化重构版)

> 现代高端宠物洗护美学生活馆官方网站，已全面重构为基于 **Next.js (App Router) + TypeScript + Tailwind CSS** 的高性能全响应式 Web 应用。

---

## 🌟 技术选型

- **核心框架**：Next.js 14 (App Router)
- **开发语言**：TypeScript 5 (严格类型安全)
- **UI 样式库**：Tailwind CSS 3 + 自定义暖金美学调色板 (`brand`, `sage`, `warm`)
- **图标系统**：Lucide React (`lucide-react`，按需打包、强类型提示)
- **状态管理**：React Context (`ModalContext` 统一管理预约、地图、微信客服弹窗与轻量 Toast 提示)
- **包管理器**：pnpm

---

## 📁 目录结构说明

```plaintext
pet/
├── public/                 # 静态资源目录
│   └── images/             # 门店高清实景图、可爱手绘地图与素材
├── src/
│   ├── app/
│   │   ├── globals.css     # 全局样式、滚动条定制与滑块交互样式
│   │   ├── layout.tsx      # 全局主布局、SEO 元数据与字体配置
│   │   └── page.tsx        # 主页面骨架组装
│   ├── components/         # 模块化 UI 组件
│   │   ├── Navbar.tsx             # 玻璃磨砂导航条与移动端抽屉菜单
│   │   ├── Hero.tsx               # 首屏横幅、特惠标签与荣誉数据看板
│   │   ├── TrustBadges.tsx        # 四大核心安心标准 (Why Choose Us)
│   │   ├── Services.tsx           # 洗护服务矩阵与分类标签过滤器
│   │   ├── PriceCalculator.tsx    # 智能价格与服务用时多维度估算器
│   │   ├── BeforeAfterSlider.tsx  # 宠物洗护前后互动对比滑块 (鼠标/触控拖拽)
│   │   ├── EnvironmentGallery.tsx # 全透明医护级洗护空间与 5 大分区实景画廊
│   │   ├── TeamSection.tsx        # 国家认证资深 A 级主理人团队
│   │   ├── Testimonials.tsx       # 真实宠友社区评价与星级打分
│   │   ├── FaqSection.tsx         # 常见问题解答手风琴
│   │   ├── LocationSection.tsx    # 门店位置、手绘地图预览与高德导航指引
│   │   ├── CtaBanner.tsx          # 底部吸睛预约行动横幅
│   │   ├── Footer.tsx             # 页脚信息、门店指南与资质声明
│   │   ├── BookingModal.tsx       # 在线预约表单弹窗 (带参预填与单号生成)
│   │   ├── MapModal.tsx           # 门店可爱手绘地图高清大图预览弹窗
│   │   ├── ContactModal.tsx       # 店长微信扫码与一键电话咨询弹窗
│   │   ├── Toast.tsx              # 全局轻量通知提示条
│   │   └── BackToTop.tsx          # 滚动返回顶部悬浮按钮
│   ├── context/
│   │   └── ModalContext.tsx       # 模态框与 Toast 状态上下文
│   └── types/
│       └── index.ts               # 服务、计算器、预约单据等核心类型定义
├── next.config.mjs         # Next.js 配置 (支持 Unsplash 远程优化等)
├── tailwind.config.ts      # Tailwind CSS 颜色与阴影配置
├── tsconfig.json           # TypeScript 编译配置
└── package.json            # 依赖项与脚本指令
```

---

## 🚀 常用运行命令

```bash
# 安装依赖
pnpm install

# 启动本地开发服务器 (默认端口 http://localhost:3000)
pnpm dev

# 构建生产版本 (执行静态优化与类型检查)
pnpm build

# 启动生产服务
pnpm start
```

---

## 💡 核心交互亮点

1. **智能洗护价格估算器 (`PriceCalculator.tsx`)**：
   - 支持按宠物体型（猫咪、小型犬、中型犬、大型犬）、毛结程度（顺滑、轻度、重度）、套餐级别（经典、水疗、精剪）以及 4 项增值护理实时联动计算透明花费与用时。
   - 点击“带入此方案，锁定今天档期”可自动将方案名称与宠型回填至预约表单。
2. **前后对比分屏滑块 (`BeforeAfterSlider.tsx`)**：
   - 纯 React 状态实现的无依赖拖拽滑块，兼容桌面鼠标与移动端触摸滑动。
3. **预约凭证生成与持久化 (`BookingModal.tsx`)**：
   - 提交表单后生成专属预约单号，并在本地持久化保存，同时提供可打印/可截图的电子预约凭证。
4. **探店手绘地图与快捷导航 (`LocationSection.tsx` & `MapModal.tsx`)**：
   - 支持一键复制门店具体地址、放大查看手绘地图高清图、一键唤起高德地图导航。
