import { Header } from '@/components/header'
import { PageLayout } from '@/components/page-layout'

export default function AboutPage() {
  return (
    <>
      <Header />
      <PageLayout 
        title="ℹ️ 關於我們" 
        description="了解楓之谷物價追蹤器的開發理念和團隊資訊"
        lastUpdated="2025年7月"
      >
        <div className="space-y-8">
          {/* 項目介紹 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              🎯 項目簡介
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                楓之谷物價追蹤器是一個專為 <strong>Artale 伺服器</strong> 玩家設計的價格分析工具。
                我們的目標是幫助玩家更好地理解遊戲內的經濟系統，並找出最有價值的投資機會。
              </p>
              <p className="mb-4">
                通過自動化的數據收集和智能分析，我們提供實時的價格資訊和效率計算，
                讓每位玩家都能輕鬆掌握市場動態，做出更明智的交易決策。
              </p>
            </div>
          </section>

          {/* 核心功能 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              ⚡ 核心功能
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  📊 實時數據追蹤
                </h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• 每日自動更新拍賣場價格</li>
                  <li>• 即時計算兌換效率</li>
                  <li>• 動態調整基準價格</li>
                  <li>• 多維度數據分析</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  💰 套利機會分析
                </h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• 智能識別高效率道具</li>
                  <li>• 基於飄雪結晶的比較分析</li>
                  <li>• 風險評估和建議</li>
                  <li>• 投資回報率計算</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                  📈 視覺化圖表
                </h3>
                <ul className="text-purple-700 space-y-2 text-sm">
                  <li>• 效率排行榜</li>
                  <li>• 價格趨勢圖表</li>
                  <li>• 統計數據儀表板</li>
                  <li>• 互動式數據展示</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                  🔧 技術特色
                </h3>
                <ul className="text-orange-700 space-y-2 text-sm">
                  <li>• 響應式網頁設計</li>
                  <li>• 快速載入和緩存</li>
                  <li>• 手機端友好界面</li>
                  <li>• 開源透明代碼</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 技術架構 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              🏗️ 技術架構
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">⚛️</div>
                  <h3 className="font-semibold mb-2">前端技術</h3>
                  <p className="text-sm text-gray-600">
                    Next.js 14, React, TypeScript, Tailwind CSS
                  </p>
                </div>
                
                <div>
                  <div className="text-3xl mb-2">🗄️</div>
                  <h3 className="font-semibold mb-2">後端技術</h3>
                  <p className="text-sm text-gray-600">
                    Node.js, Prisma ORM, PostgreSQL
                  </p>
                </div>
                
                <div>
                  <div className="text-3xl mb-2">☁️</div>
                  <h3 className="font-semibold mb-2">部署平台</h3>
                  <p className="text-sm text-gray-600">
                    Vercel, Neon Database, GitHub Actions
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 數據來源 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              📡 數據來源與更新機制
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">📊 數據來源</h3>
                  <p className="text-yellow-700 text-sm">
                    所有價格數據來自 Artale 伺服器的公開拍賣場資訊，
                    並結合官方商城的點數券價格進行分析計算。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">🔄 更新頻率</h3>
                  <p className="text-yellow-700 text-sm">
                    系統每日凌晨自動執行數據同步，確保提供最新的市場資訊。
                    如遇特殊情況或市場重大變化，會進行額外的手動更新。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">🛡️ 數據準確性</h3>
                  <p className="text-yellow-700 text-sm">
                    我們採用多重驗證機制確保數據準確性，但由於市場波動性，
                    建議玩家在實際交易前再次確認當下的市場價格。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 開發團隊 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              👥 開發團隊
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🧑‍💻</div>
                <h3 className="font-semibold text-gray-800 mb-2">獨立開發者</h3>
                <p className="text-gray-600 text-sm mb-4">
                  本項目由熱愛楓之谷的開發者獨立開發和維護，
                  致力於為 Artale 社群提供有價值的工具。
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <a 
                    href="https://github.com/llllIIIIllllIIII/maplestory-price-tracker" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    🐙 GitHub 開源項目
                  </a>
                  <span className="text-gray-400">|</span>
                  <a 
                    href="mailto:contact@maplestory-tracker.com"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    📧 聯絡我們
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 免責聲明 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              ⚠️ 重要聲明
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <ul className="text-red-700 space-y-2 text-sm">
                <li>• 本網站與 Nexon 或 MapleStory 官方無任何關聯</li>
                <li>• 所有商標和遊戲內容版權歸原作者所有</li>
                <li>• 本工具僅供學習研究和個人參考使用</li>
                <li>• 禁止用於商業用途或任何違法行為</li>
                <li>• 投資有風險，請謹慎評估自身承受能力</li>
              </ul>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  )
}
