import { Header } from '@/components/header'
import { PageLayout } from '@/components/page-layout'

export default function TermsPage() {
  return (
    <>
      <Header />
      <PageLayout 
        title="📋 使用條款" 
        description="楓之谷物價追蹤器的服務條款和使用規範"
        lastUpdated="2025年7月19日"
      >
        <div className="space-y-8 text-gray-700">
          {/* 前言 */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">📜 服務條款總覽</h2>
            <p className="text-blue-700 leading-relaxed">
              歡迎使用楓之谷物價追蹤器！在使用我們的服務前，請仔細閱讀以下條款。
              使用本網站即表示您同意遵守這些條款。如果您不同意任何條款內容，請停止使用本服務。
            </p>
          </section>

          {/* 服務說明 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 1. 服務說明
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1.1 服務內容</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>提供楓之谷 Artale 伺服器的現金道具價格資訊</li>
                  <li>計算和分析道具的兌換效率</li>
                  <li>提供市場數據的視覺化展示</li>
                  <li>協助玩家發現套利機會</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1.2 服務性質</h3>
                <p className="text-sm leading-relaxed">
                  本服務僅供資訊參考使用，不構成投資建議。所有的投資決策應由用戶自行判斷和承擔風險。
                </p>
              </div>
            </div>
          </section>

          {/* 用戶權利與義務 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              👤 2. 用戶權利與義務
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 用戶權利</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>免費使用本網站提供的所有功能</li>
                  <li>獲得準確、及時的市場數據</li>
                  <li>享受穩定的服務品質</li>
                  <li>對服務提出建議和反饋</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 用戶義務</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>遵守相關法律法規和本使用條款</li>
                  <li>不得進行任何可能損害網站正常運作的行為</li>
                  <li>不得嘗試破解、攻擊或干擾網站系統</li>
                  <li>不得將本服務用於任何非法或不當目的</li>
                  <li>尊重智慧財產權，不得盜用網站內容</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 使用限制 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🚫 3. 使用限制
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">嚴格禁止以下行為：</h3>
              <ul className="list-disc list-inside space-y-2 text-red-700 text-sm">
                <li>大量抓取網站資料或進行自動化攻擊</li>
                <li>嘗試入侵、破壞或干擾網站系統</li>
                <li>散布病毒、惡意軟體或其他有害程式</li>
                <li>冒充他人身份或提供虛假資訊</li>
                <li>將網站內容用於商業用途而未經授權</li>
                <li>進行任何可能侵犯他人權益的行為</li>
                <li>違反任何適用的法律法規</li>
              </ul>
            </div>
          </section>

          {/* 資料準確性與免責聲明 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⚠️ 4. 資料準確性與免責聲明
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 資料準確性</h3>
                <p className="text-sm leading-relaxed">
                  我們致力於提供準確的市場資料，但由於市場波動和技術限制，
                  無法保證所有資料的即時性和100%準確性。用戶在做出任何決策前，
                  應該自行驗證相關資訊。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 免責聲明</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-2 text-yellow-800 text-sm">
                    <li>本網站不對任何投資損失承擔責任</li>
                    <li>不保證服務的不間斷性或完全無誤</li>
                    <li>不對因使用本服務而產生的任何後果負責</li>
                    <li>不保證網站內容的完整性或適用性</li>
                    <li>用戶自行承擔使用本服務的所有風險</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 智慧財產權 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📝 5. 智慧財產權
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 網站內容</h3>
                <p className="text-sm leading-relaxed">
                  本網站的設計、程式碼、文字內容等均受智慧財產權法保護。
                  除非另有說明，用戶不得未經授權複製、修改、分發或用於商業目的。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 遊戲相關內容</h3>
                <p className="text-sm leading-relaxed">
                  楓之谷相關的所有商標、圖像、名稱等知識產權歸 Nexon 及其關聯公司所有。
                  本網站與官方無任何關聯，僅供玩家參考使用。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5.3 開源授權</h3>
                <p className="text-sm leading-relaxed">
                  本網站的原始碼在 GitHub 上開源，遵循相應的開源授權條款。
                  用戶可以在授權範圍內使用、修改和分發程式碼。
                </p>
              </div>
            </div>
          </section>

          {/* 隱私保護 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔒 6. 隱私保護
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">我們的隱私承諾：</h3>
              <ul className="list-disc list-inside space-y-2 text-green-700 text-sm">
                <li>不收集用戶的個人身份資訊</li>
                <li>不要求用戶註冊或登入</li>
                <li>僅收集匿名的使用統計資料以改善服務</li>
                <li>不會將用戶資料出售或分享給第三方</li>
                <li>使用標準的安全措施保護網站和用戶資料</li>
              </ul>
              <p className="text-green-700 text-sm mt-4">
                詳細的隱私政策請參閱 
                <a href="/privacy" className="text-blue-600 hover:underline ml-1">隱私政策頁面</a>。
              </p>
            </div>
          </section>

          {/* 服務變更與終止 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔄 7. 服務變更與終止
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">7.1 服務變更</h3>
                <p className="text-sm leading-relaxed">
                  我們保留隨時修改、暫停或終止服務的權利，恕不另行通知。
                  重大變更會盡可能提前通知用戶。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">7.2 用戶終止</h3>
                <p className="text-sm leading-relaxed">
                  用戶可以隨時停止使用本服務，無需任何手續。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">7.3 違規處理</h3>
                <p className="text-sm leading-relaxed">
                  對於違反使用條款的用戶，我們保留採取適當措施的權利，
                  包括但不限於限制訪問或終止服務。
                </p>
              </div>
            </div>
          </section>

          {/* 法律適用 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⚖️ 8. 法律適用與爭議解決
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">8.1 適用法律</h3>
                <p className="text-sm leading-relaxed">
                  本使用條款受中華民國法律管轄，任何爭議應依據中華民國法律解決。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">8.2 爭議解決</h3>
                <p className="text-sm leading-relaxed">
                  如有任何爭議，建議優先通過友好協商解決。
                  若協商不成，可依法向有管轄權的法院提起訴訟。
                </p>
              </div>
            </div>
          </section>

          {/* 條款更新 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📅 9. 條款更新
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-700 text-sm leading-relaxed">
                我們可能會不定期更新這些使用條款，以反映法律變化或服務調整。
                重大變更會在網站上公告。建議用戶定期查閱最新版本的使用條款。
                繼續使用服務即表示接受更新後的條款。
              </p>
            </div>
          </section>

          {/* 聯絡資訊 */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📞 聯絡我們
            </h2>
            <p className="text-gray-600 mb-6">
              如果您對使用條款有任何疑問或需要協助，歡迎聯絡我們：
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="text-sm text-gray-600">
                📧 Email: 
                <a href="mailto:contact@maplestory-tracker.com" className="text-blue-600 hover:underline ml-1">
                  contact@maplestory-tracker.com
                </a>
              </div>
              <div className="text-sm text-gray-600">
                🐙 GitHub: 
                <a 
                  href="https://github.com/llllIIIIllllIIII/maplestory-price-tracker" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  開源項目
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-purple-200">
              <p className="text-xs text-gray-500">
                最後更新：2025年7月19日 | 生效日期：2025年7月19日
              </p>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  )
}
