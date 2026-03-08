#!/bin/bash
# 一键部署脚本 - 首次使用需要配置 GitHub 账号

echo "🚀 开始部署求婚页面..."

# 检查是否在正确目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在 proposal-zhanghe-2025 文件夹内运行此脚本"
    exit 1
fi

# 提示输入 GitHub 用户名
echo ""
read -p "请输入你的 GitHub 用户名: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

REPO_NAME="proposal-zhanghe-2025"
REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo "📦 准备发布到: $REPO_URL"
echo ""

# 检查照片是否存在
echo "📸 检查照片..."
missing=0
for photo in photo-hiking.jpg photo-concert.jpg photo-skiing.jpg; do
    if [ -f "$photo" ]; then
        echo "  ✓ $photo"
    else
        echo "  ⚠️  $photo (缺失 - 请放入照片后重新运行)"
        missing=1
    fi
done

if [ $missing -eq 1 ]; then
    echo ""
    echo "⚠️  缺少照片，是否继续？(照片可以稍后添加) [y/N]"
    read -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "已取消，请放入照片后重新运行"
        exit 0
    fi
fi

# 初始化 Git
echo ""
echo "📝 初始化 Git 仓库..."
git init
git add .
git commit -m "Initial commit: 求婚页面 🎉"

# 添加远程仓库
echo ""
echo "🔗 连接到 GitHub..."
git branch -M main
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

# 推送
echo ""
echo "☁️  推送到 GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "📋 下一步："
    echo "   1. 访问 https://github.com/$GITHUB_USER/$REPO_NAME"
    echo "   2. 点击 Settings → Pages"
    echo "   3. Source 选择 main 分支，点击 Save"
    echo "   4. 等待 1-2 分钟"
    echo ""
    echo "🌐 你的求婚页面将发布在："
    echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
else
    echo ""
    echo "❌ 推送失败，可能原因："
    echo "   1. GitHub 仓库尚未创建"
    echo "   2. 需要登录验证"
    echo ""
    echo "💡 请先手动创建仓库："
    echo "   https://github.com/new"
    echo "   仓库名：$REPO_NAME"
    echo ""
    echo "或者使用 README.md 中的网页上传方法"
fi