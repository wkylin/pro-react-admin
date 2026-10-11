# 媒体预处理

scripts/optimize-media.mjs 为构建前的音频/视频预处理工具，读取 src/assets/audio、src/assets/video 与 public/audio，输出到对应 optimized 目录，调用外部 ffmpeg。使用前安装 FFmpeg 并确保 ffmpeg 在 PATH。缺少 FFmpeg 默认回退复制；REQUIRE_FFMPEG=1 或 OPTIMIZE_MEDIA_STRICT=1 强制要求工具可用。SKIP_OPTIMIZE_MEDIA=1 显式跳过。

```bash
# macOS（已安装 Homebrew 时）
brew install ffmpeg
# Debian/Ubuntu
sudo apt-get install ffmpeg
ffmpeg -version
pnpm run optimize:media
```

生产构建 prehook 本地会运行媒体优化；CI 默认跳过，OPTIMIZE_MEDIA=1 可强制运行。媒体工具可能改写本地资源或缓存，运行后检查 git diff，不把它误当作纯检查。

静态媒体不会因路由 lazy 自动缩小文件。采用适当分辨率、poster、按需加载与缓存，分别测量 JS/CSS 和实际媒体下载。缺少 FFmpeg 时先看脚本错误与处理范围，不通过跳过所有构建检查掩盖问题。
