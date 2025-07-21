import { Suspense } from 'react'
import { ItemsTable } from '@/components/items-table'
import { EfficiencyChart } from '@/components/efficiency-chart'
import { StatsCards } from '@/components/stats-cards'
import { Header } from '@/components/header'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import AdSense from '@/components/AdSense'
import Footer from '@/components/Footer'

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

      <Footer />
    </div>
  )
}
