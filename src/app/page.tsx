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
      <footer className="bg-white border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>🍁 楓之谷物價追蹤器 | 資料每小時更新</p>
          <p className="text-sm mt-2">
            ⚠️ 本工具僅供參考，實際交易價格可能有所差異
          </p>
        </div>
      </footer>
    </div>
  )
}
