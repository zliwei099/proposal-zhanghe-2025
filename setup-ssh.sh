#!/bin/bash
# SSH Key 配置脚本

echo "🔑 生成 SSH Key 并配置 GitHub..."
echo ""

# 生成 key（使用 ed25519，比 rsa 更安全）
if [ ! -f ~/.ssh/id_ed25519 ]; then
    echo "➡️  生成新的 SSH Key..."
    ssh-keygen -t ed25519 -C "zliwei099@gmail.com" -f ~/.ssh/id_ed25519 -N ""
else
    echo "✅ SSH Key 已存在"
fi

echo ""
echo "➡️  启动 SSH agent..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

echo ""
echo "📋 你的公钥（复制下面的全部内容）："
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat ~/.ssh/id_ed25519.pub
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "📝 下一步：添加到 GitHub"
echo "1. 访问 https://github.com/settings/keys"
echo "2. 点击 New SSH key"
echo "3. Title: 填 MacBook 或任意名字"
echo "4. Key: 粘贴上面 👆 的全部内容"
echo "5. 点击 Add SSH key"
echo ""
echo "✅ 添加完成后，回到终端执行："
echo "   ssh -T git@github.com"
echo ""
echo "看到 'Hi zliwei099! You've successfully authenticated' 就是成功了！"