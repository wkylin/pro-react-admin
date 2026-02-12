# FFmpeg 安装指南

本文档介绍如何在 Windows 环境中安装 FFmpeg，用于项目构建过程中的媒体文件优化。

## 背景

项目在生产构建时会自动优化媒体文件（如图片、音频、视频），需要 FFmpeg 工具支持。如果没有安装 FFmpeg，构建会失败并提示错误。

## 安装方法

### 方法一：使用 winget（推荐）

如果你的系统已安装 winget（Windows Package Manager），运行：

```bash
winget install --id Gyan.FFmpeg --source winget
```

### 方法二：手动安装

#### 1. 下载 FFmpeg

访问官方网站：https://www.gyan.dev/ffmpeg/builds/

下载最新的构建版本：
- `ffmpeg-release-essentials.zip` （推荐，轻量版）
- 或 `ffmpeg-release-full.7z` （完整版）

#### 2. 解压文件

将下载的压缩包解压到你选择的目录，例如：
```
C:\ffmpeg
```

解压后应该看到以下结构：
```
C:\ffmpeg\
├── bin\
│   ├── ffmpeg.exe
│   ├── ffplay.exe
│   └── ffprobe.exe
├── doc\
├── presets\
└── ...
```

#### 3. 添加到系统 PATH

##### 方式一：永久添加（推荐）

1. 右键点击"此电脑" → "属性" → "高级系统设置"
2. 点击"环境变量"按钮
3. 在"系统变量"部分找到"Path"变量，点击"编辑"
4. 点击"新建"，添加路径：`C:\ffmpeg\bin`
5. 点击"确定"保存所有对话框

##### 方式二：临时添加（仅当前会话）

在命令提示符中运行：
```bash
set PATH=%PATH%;C:\ffmpeg\bin
```

#### 4. 验证安装

打开新的命令提示符窗口，运行：

```bash
ffmpeg -version
```

如果安装成功，你会看到类似输出：

```
ffmpeg version 7.x.x Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 13.2.0 (crosstool-NG 1.25.0.232_7c07016)
  ...
```

## 使用说明

### 正常构建

安装 FFmpeg 后，可以正常运行生产构建：

```bash
npm run build:production
```

构建过程会自动优化媒体文件。

### 跳过媒体优化

如果没有安装 FFmpeg 或不想优化媒体文件，可以通过设置环境变量来跳过此步骤：

```bash
# 模拟 CI 环境，跳过媒体优化
CI=1 npm run build:production

# 或强制运行优化（需要先安装 FFmpeg）
OPTIMIZE_MEDIA=1 npm run build:production
```

**环境变量说明：**
- `CI=1`：模拟持续集成环境，构建脚本会自动跳过媒体优化步骤
- `OPTIMIZE_MEDIA=1`：强制运行媒体优化，即使在 CI 环境中也会执行

**构建脚本逻辑：**
项目在 `prebuild:production` 阶段会检查环境变量：
- 如果检测到 CI 环境（`CI=1` 或其他 CI 变量），默认跳过媒体优化
- 如果设置了 `OPTIMIZE_MEDIA=1`，则强制执行优化
- 在本地开发环境中，如果没有设置 CI 变量，会尝试运行媒体优化

## 故障排除

### 常见问题

1. **'ffmpeg' 不是内部或外部命令**
   - 检查 PATH 环境变量是否正确设置
   - 尝试重启命令提示符或 IDE

2. **构建仍然失败**
   - 确保使用新的命令提示符窗口
   - 检查 FFmpeg 版本是否支持项目需要的功能

3. **权限问题**
   - 以管理员身份运行命令提示符
   - 检查文件夹权限

### 获取帮助

如果遇到问题，可以：
1. 检查 FFmpeg 官方网站的文档
2. 查看项目 issue 或讨论区
3. 联系开发团队

## 相关链接

- FFmpeg 官方网站：https://ffmpeg.org/
- FFmpeg Windows 构建：https://www.gyan.dev/ffmpeg/builds/
- winget 包管理器：https://docs.microsoft.com/en-us/windows/package-manager/

---

*最后更新：2026年2月12日*</content>
<parameter name="filePath">c:\wui\pro-react\pro-react-admin\docs\FFMPEG_INSTALLATION.md