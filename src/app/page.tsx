import { Suspense } from 'react'
import { ItemsTable } from '@/components/items-table'
import { EfficiencyChart } from '@/components/efficiency-chart'
import { StatsCards } from '@/components/stats-cards'
import { Header } from '@/components/header'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import AdSense from '@/components/AdSense'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* 網站介紹區塊 */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                🍁 楓之谷物價追蹤器
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                專為 <strong>Artale 伺服器</strong> 玩家設計的智能價格分析工具，
                幫助您發現現金道具的最佳套利機會，輕鬆掌握市場動態
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-800 mb-2">實時數據分析</h3>
                <p className="text-sm text-gray-600">
                  每日自動更新拍賣場數據，提供最新的價格趨勢和效率分析
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold text-gray-800 mb-2">套利機會發現</h3>
                <p className="text-sm text-gray-600">
                  智能計算現金道具與楓幣的兌換效率，找出最有價值的投資標的
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-800 mb-2">決策支援</h3>
                <p className="text-sm text-gray-600">
                  詳細的統計圖表和排行榜，讓您做出更明智的交易決策
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="text-yellow-600 text-lg">💡</div>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-800">如何使用這個工具？</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    1. 查看下方的道具效率排行榜，效率越高代表投資價值越好<br/>
                    2. 參考雪價值欄位，了解每個道具相當於多少飄雪結晶<br/>
                    3. 結合市場趨勢圖，選擇最佳的買賣時機<br/>
                    4. 記住：以飄雪結晶為基準，效率高於它的道具都有套利空間
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 統計卡片 */}
        <Suspense fallback={<LoadingSpinner />}>
          <StatsCards />
        </Suspense>

        {/* 頂部廣告 */}
        <div className="my-8 flex justify-center">
          <AdSense
            adSlot="1234567890"
            adFormat="auto"
            style={{ display: 'block', width: '100%', maxWidth: '728px', height: '90px' }}
          />
        </div>

        {/* 效率圖表 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            📊 道具效率分析
          </h2>
          <Suspense fallback={<LoadingSpinner />}>
            <EfficiencyChart />
          </Suspense>
        </section>

        {/* 中間廣告 */}
        <div className="my-8 flex justify-center">
          <AdSense
            adSlot="0987654321"
            adFormat="auto"
            style={{ display: 'block', width: '100%', maxWidth: '300px', height: '250px' }}
          />
        </div>

        {/* 道具列表 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            📋 道具效率排行
          </h2>
          <Suspense fallback={<LoadingSpinner />}>
            <ItemsTable />
          </Suspense>
        </section>
      </main>

      {/* 頁尾 */}
      <footer className="bg-white border-t mt-16 py-12">
        <div className="container mx-auto px-4">
          {/* 主要信息區 */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🍁 楓之谷物價追蹤器
            </h3>
            <p className="text-gray-600 mb-4">
              實時追蹤楓之谷現金道具與楓幣的兌換效率，幫助玩家發現最佳套利機會
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
              <span>📊 資料每日自動更新</span>
              <span className="hidden sm:inline">•</span>
              <span>🔄 數據來源：Artale 拍賣場</span>
              <span className="hidden sm:inline">•</span>
              <span>⏰ 最後更新：每日凌晨</span>
            </div>
          </div>

          {/* 免責聲明和條款區 */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* 免責聲明 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                ⚠️ 免責聲明
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 本網站提供的價格資訊僅供參考，實際交易價格可能有所差異</li>
                <li>• 遊戲內的市場價格會因供需變化而波動，請以實際交易為準</li>
                <li>• 投資有風險，套利需謹慎，請根據自身情況做出理性決策</li>
                <li>• 本網站不對因使用本工具而產生的任何損失負責</li>
              </ul>
            </div>

            {/* 使用條款 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                📋 使用條款
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 本網站資料僅供個人參考使用，禁止商業用途</li>
                <li>• 請勿惡意攻擊或干擾網站正常運作</li>
                <li>• 尊重智慧財產權，禁止未經授權的資料爬取</li>
                <li>• 使用本網站即表示同意遵守相關條款</li>
              </ul>
            </div>
          </div>

          {/* 聯絡和關於我們區 */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* 關於我們 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">📖 關於我們</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                楓之谷物價追蹤器是一個專為 Artale 伺服器玩家設計的價格分析工具。
                我們致力於提供準確、及時的市場數據，幫助玩家做出更明智的交易決策。
                透過自動化的數據收集和智能分析，讓每位玩家都能輕鬆掌握市場動態。
              </p>
            </div>

            {/* 聯絡方式 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">📧 聯絡我們</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>如有問題、建議或合作需求，歡迎與我們聯絡：</p>
                <div className="flex items-center gap-2">
                  <span>📧 Email:</span>
                  <a 
                    href="mailto:contact@maplestory-tracker.com" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    contact@maplestory-tracker.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>🐙 GitHub:</span>
                  <a 
                    href="https://github.com/llllIIIIllllIIII/maplestory-price-tracker" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    項目開源地址
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  💡 我們重視每一個反饋，通常會在 24-48 小時內回覆
                </p>
              </div>
            </div>
          </div>

          {/* 版權信息 */}
          <div className="border-t pt-6 text-center text-xs text-gray-500">
            <p>© 2025 楓之谷物價追蹤器 | 本網站與 Nexon 或 MapleStory 官方無關</p>
            <p className="mt-1">資料來源於公開的遊戲拍賣場信息 | 僅供學習和研究使用</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
