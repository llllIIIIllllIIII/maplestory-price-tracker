import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4">
        {/* 主要 Footer 內容 */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 品牌區域 */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                🍁 楓之谷物價追蹤器
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                專為 Artale 伺服器設計的價格分析工具，實時追蹤現金道具與楓幣兌換效率，幫助玩家發現最佳套利機會。
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  📊 每日更新
                </span>
                <span className="flex items-center gap-1">
                  🔄 實時數據
                </span>
                <span className="flex items-center gap-1">
                  ⚡ 快速分析
                </span>
              </div>
            </div>

            {/* 快速連結 */}
            <div>
              <h4 className="font-semibold mb-4">快速連結</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/guide" className="hover:text-white transition-colors">
                    📖 使用教學
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    ❓ 常見問題
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    ℹ️ 關於我們
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    📋 使用條款
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    🔒 隱私政策
                  </Link>
                </li>
              </ul>
            </div>

            {/* 聯絡資訊 */}
            <div>
              <h4 className="font-semibold mb-4">聯絡我們</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <a 
                  href="mailto:contact@maplestory-tracker.com" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  📧 Email
                </a>
                <a 
                  href="https://github.com/llllIIIIllllIIII/maplestory-price-tracker" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  🐙 GitHub
                </a>
                <div className="text-xs text-gray-400 mt-3">
                  💡 通常 24-48 小時內回覆
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版權區 */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-2 md:mb-0">
              © 2025 楓之谷物價追蹤器. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span>本網站與 Nexon 或 MapleStory 官方無關</span>
              <span className="hidden md:inline">•</span>
              <span className="text-xs">僅供學習研究使用</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
