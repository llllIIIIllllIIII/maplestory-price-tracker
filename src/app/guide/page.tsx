import { Header } from '@/components/header'
import { PageLayout } from '@/components/page-layout'

export default function GuidePage() {
  return (
    <>
      <Header />
      <PageLayout 
        title="📖 使用指南" 
        description="了解如何使用楓之谷物價追蹤器，發現最佳的套利機會"
      >
        <div className="space-y-8">
          {/* 什麼是套利 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              💰 什麼是套利？
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                套利是指利用不同商品之間的價格差異來獲得利潤的投資策略。在楓之谷中，
                我們可以通過比較現金道具與飄雪結晶的兌換效率，找出最有價值的投資標的。
              </p>
            </div>
          </section>

          {/* 如何看懂數據 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              📊 如何看懂數據表格？
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">🏷️ 楓幣價值</h3>
                <p className="text-sm text-green-700">
                  道具在拍賣場的實際售價，單位為楓幣。這是我們計算效率的基礎數據。
                </p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">💎 WC 價格</h3>
                <p className="text-sm text-purple-700">
                  購買該道具所需的點數券（WC）數量。這個數據來自遊戲官方商城。
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">⚡ 兌換效率</h3>
                <p className="text-sm text-orange-700">
                  每 1 WC 能換取多少萬楓幣。數值越高表示該道具的投資價值越好。
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <h3 className="font-semibold text-cyan-800 mb-2">❄️ 雪價值</h3>
                <p className="text-sm text-cyan-700">
                  該道具的價值相當於多少個飄雪結晶。用來快速比較不同道具的價值。
                </p>
              </div>
            </div>
          </section>

          {/* 套利策略 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              🎯 套利策略指南
            </h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">🥇 基礎策略：以飄雪結晶為基準</h3>
                <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                  <li>找出效率高於飄雪結晶的道具</li>
                  <li>購買這些高效率道具並在拍賣場出售</li>
                  <li>用獲得的楓幣購買更多點數券</li>
                  <li>重複此過程以獲得利潤</li>
                </ol>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">⚠️ 風險提醒</h3>
                <ul className="list-disc list-inside space-y-2 text-red-700">
                  <li>市場價格會波動，過去的效率不代表未來表現</li>
                  <li>大量道具可能導致市場供過於求，影響價格</li>
                  <li>建議分散投資，不要將所有資金投入單一道具</li>
                  <li>定期檢查市場變化，適時調整策略</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 實戰技巧 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              🔥 實戰技巧
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">📈</div>
                <h3 className="font-semibold mb-2">觀察趨勢</h3>
                <p className="text-sm text-gray-600">
                  注意效率排行榜的變化，及時調整投資組合
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">💹</div>
                <h3 className="font-semibold mb-2">分批操作</h3>
                <p className="text-sm text-gray-600">
                  避免一次性大量交易，分批進行可降低風險
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">⏰</div>
                <h3 className="font-semibold mb-2">把握時機</h3>
                <p className="text-sm text-gray-600">
                  在遊戲活動期間，某些道具的需求可能增加
                </p>
              </div>
            </div>
          </section>

          {/* 計算範例 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              🧮 計算範例
            </h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">假設情況：</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">道具 A：</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• WC 價格：100 WC</li>
                    <li>• 拍賣場價格：200萬 楓幣</li>
                    <li>• 效率：2.0 萬楓幣/WC</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">飄雪結晶：</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• WC 價格：27.273 WC</li>
                    <li>• 拍賣場價格：43萬 楓幣</li>
                    <li>• 效率：1.58 萬楓幣/WC</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-100 rounded">
                <p className="text-green-800 font-semibold">
                  結論：道具 A 的效率 (2.0) 高於飄雪結晶 (1.58)，具有套利價值！
                </p>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  )
}
