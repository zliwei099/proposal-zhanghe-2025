#!/bin/bash
# 推送脚本 - 在终端执行

echo "🚀 推送到 GitHub..."
cd /Users/levy/.openclaw/workspace/projects/proposal-zhanghe-2025

# 设置远程仓库（HTTPS 方式，需要用户名密码）
git remote set-url origin https://github.com/zliwei099/proposal-zhanghe-2025.git

# 推送
git push -u origin main

echo ""
echo "✅ 推送完成！"
echo ""
echo "下一步：开启 GitHub Pages"
echo "1. 访问 https://github.com/zliwei099/proposal-zhanghe-2025/settings/pages"
echo "2. Source 选择 main 分支，点击 Save"
echo "3. 等待 1-2 分钟"
echo ""
echo "🌐 页面地址："
echo "   https://zliwei099.github.io/proposal-zhanghe-2025/"