import { Header } from '@/components/header'
import Footer from '@/components/Footer'
import { PageLayout } from '@/components/page-layout'

export default function FAQPage() {
  return (
    <>
      <Header />
      <PageLayout 
        title="❓ 常見問題" 
        description="解答關於楓之谷物價追蹤器的常見疑問"
      >
        <div className="space-y-6">
          {/* 基本使用問題 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
              📖 基本使用問題
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">
                  Q1: 這個網站是做什麼的？
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  A: 楓之谷物價追蹤器是專為 Artale 伺服器設計的價格分析工具。它幫助玩家追蹤現金道具的市場價格，
                  計算兌換效率，並找出最有價值的套利機會。簡單來說，就是幫你找出「最划算的現金道具」。
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">
                  Q2: 如何看懂效率數據？
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  A: 效率表示每 1 WC 能換取多少萬楓幣。例如效率 2.0 表示 1 WC = 2萬楓幣。
                  效率越高的道具投資價值越好。我們以飄雪結晶作為基準，效率高於飄雪結晶的道具通常具有套利價值。
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-800 mb-3">
                  Q3: 什麼是「雪價值」？
                </h3>
                <p className="text-purple-700 text-sm leading-relaxed">
                  A: 雪價值表示該道具的價值相當於多少個飄雪結晶。因為飄雪結晶是最常見的現金道具之一，
                  用它作為基準可以幫助玩家快速理解不同道具的相對價值。
                </p>
              </div>
            </div>
          </section>

          {/* 數據準確性問題 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
              📊 數據準確性問題
            </h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">
                  Q4: 數據多久更新一次？
                </h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  A: 系統每日凌晨自動更新一次數據。你可以在網站頂部看到最後更新的時間。
                  雖然不是實時更新，但對於投資決策來說已經足夠準確。
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3">
                  Q5: 為什麼網站顯示的價格和我看到的不一樣？
                </h3>
                <p className="text-orange-700 text-sm leading-relaxed">
                  A: 拍賣場價格會不斷波動，我們的數據是基於最近一次更新時的價格。
                  建議在實際交易前再次確認當下的市場價格。價格差異在 5-10% 內是正常的。
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">
                  Q6: 數據來源是什麼？可信嗎？
                </h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  A: 所有數據都來自 Artale 伺服器的公開拍賣場資訊，結合官方商城的點數券價格。
                  我們使用自動化程序收集數據，並經過多重驗證確保準確性。數據是公開透明的。
                </p>
              </div>
            </div>
          </section>

          {/* 套利策略問題 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
              💰 套利策略問題
            </h2>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                <h3 className="font-semibold text-cyan-800 mb-3">
                  Q7: 新手應該如何開始套利？
                </h3>
                <p className="text-cyan-700 text-sm leading-relaxed">
                  A: 建議從小額開始，選擇效率明顯高於飄雪結晶的道具。先理解市場規律，
                  觀察價格變化趨勢。不要一次性投入所有資金，分散風險很重要。
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h3 className="font-semibold text-indigo-800 mb-3">
                  Q8: 為什麼要以飄雪結晶為基準？
                </h3>
                <p className="text-indigo-700 text-sm leading-relaxed">
                  A: 飄雪結晶是遊戲中最穩定、最常見的現金道具之一，市場需求穩定，流通性好。
                  以它為基準可以幫助玩家快速判斷其他道具的投資價值。
                </p>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                <h3 className="font-semibold text-pink-800 mb-3">
                  Q9: 套利有什麼風險？
                </h3>
                <p className="text-pink-700 text-sm leading-relaxed">
                  A: 主要風險包括：市場價格波動、供需關係變化、遊戲政策調整等。
                  建議不要投入超過自己承受能力的資金，並保持理性的投資心態。
                </p>
              </div>
            </div>
          </section>

          {/* 技術問題 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
              🔧 技術問題
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Q10: 網站在手機上可以正常使用嗎？
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A: 是的，網站採用響應式設計，完全支持手機和平板設備。
                  所有功能在移動設備上都能正常使用。
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">
                  Q11: 網站是開源的嗎？
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  A: 是的，我們的代碼完全開源，托管在 GitHub 上。
                  你可以查看源代碼、提出建議，甚至參與開發。
                  <a href="https://github.com/llllIIIIllllIIII/maplestory-price-tracker" 
                     target="_blank" 
                     className="text-blue-600 hover:underline ml-1">
                    查看項目
                  </a>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">
                  Q12: 遇到 Bug 或有功能建議怎麼辦？
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  A: 歡迎通過以下方式聯繫我們：
                  <br />• Email: contact@maplestory-tracker.com
                  <br />• GitHub Issues: 在項目頁面提交問題報告
                  <br />我們會認真對待每一個反饋！
                </p>
              </div>
            </div>
          </section>

          {/* 其他問題 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
              🤔 其他問題
            </h2>
            
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-800 mb-3">
                  Q13: 這個工具是免費的嗎？
                </h3>
                <p className="text-purple-700 text-sm leading-relaxed">
                  A: 是的，完全免費使用。我們希望為 Artale 社群提供有價值的工具，
                  幫助所有玩家做出更好的投資決策。
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">
                  Q14: 會支持其他伺服器嗎？
                </h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  A: 目前專注於 Artale 伺服器。如果有其他伺服器的需求，
                  並且有足夠的用戶支持，我們會考慮擴展到其他伺服器。
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h3 className="font-semibold text-emerald-800 mb-3">
                  Q15: 如何支持這個項目？
                </h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  A: 最好的支持就是使用並分享給其他玩家！你也可以：
                  <br />• 在 GitHub 上給項目加星
                  <br />• 提供反饋和建議
                  <br />• 報告 Bug 或問題
                  <br />• 推薦給其他玩家使用
                </p>
              </div>
            </div>
          </section>

          {/* 聯絡區塊 */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🙋‍♂️ 還有其他問題？
            </h2>
            <p className="text-gray-600 mb-6">
              如果上述問題沒有解決你的疑問，歡迎直接聯繫我們！
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="mailto:contact@maplestory-tracker.com"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                📧 發送郵件
              </a>
              <a 
                href="https://github.com/llllIIIIllllIIII/maplestory-price-tracker/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                🐙 GitHub Issues
              </a>
            </div>
          </section>
        </div>
      </PageLayout>
      <Footer />
    </>
  )
}
