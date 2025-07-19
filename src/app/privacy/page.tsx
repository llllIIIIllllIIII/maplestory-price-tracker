import { Header } from '@/components/header'
import { PageLayout } from '@/components/page-layout'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <PageLayout 
        title="🔒 隱私政策" 
        description="楓之谷物價追蹤器的隱私保護政策和資料處理說明"
        lastUpdated="2025年7月19日"
      >
        <div className="space-y-8 text-gray-700">
          {/* 前言 */}
          <section className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-800 mb-4">🛡️ 隱私保護承諾</h2>
            <p className="text-green-700 leading-relaxed">
              我們深知隱私保護的重要性，致力於為用戶提供安全、透明的服務環境。
              本隱私政策詳細說明我們如何收集、使用和保護您的資訊。
              我們承諾不會濫用用戶資料，並採用業界標準的安全措施保護您的隱私。
            </p>
          </section>

          {/* 資訊收集 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📊 1. 資訊收集說明
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1.1 我們收集的資訊</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">✅ 我們會收集：</h4>
                  <ul className="list-disc list-inside space-y-2 text-blue-700 text-sm">
                    <li><strong>匿名使用統計：</strong> 頁面瀏覽次數、停留時間、點擊行為</li>
                    <li><strong>技術資訊：</strong> 瀏覽器類型、作業系統、螢幕解析度</li>
                    <li><strong>網站性能資料：</strong> 載入時間、錯誤報告（不含個人資訊）</li>
                    <li><strong>地理位置：</strong> 國家/地區級別的統計資料（IP 地址匿名化）</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-red-800 mb-3">❌ 我們不會收集：</h4>
                  <ul className="list-disc list-inside space-y-2 text-red-700 text-sm">
                    <li><strong>個人身份資訊：</strong> 姓名、電子郵件、電話號碼</li>
                    <li><strong>遊戲帳號資訊：</strong> 楓之谷帳號、角色名稱、遊戲內資料</li>
                    <li><strong>金融資訊：</strong> 信用卡號、銀行帳戶、交易紀錄</li>
                    <li><strong>敏感個人資料：</strong> 生日、身份證號、密碼</li>
                    <li><strong>完整 IP 地址：</strong> 僅用於匿名化統計</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1.2 資訊收集方式</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>網站分析工具：</strong> 使用 Google Analytics 等工具收集匿名統計</li>
                  <li><strong>Cookies：</strong> 僅用於改善使用者體驗和網站功能</li>
                  <li><strong>伺服器日誌：</strong> 記錄基本的請求資訊以維護網站運作</li>
                  <li><strong>錯誤監控：</strong> 自動收集技術錯誤資訊以改善服務品質</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 資訊使用 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 2. 資訊使用目的
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">📈 服務改善</h3>
                <ul className="list-disc list-inside space-y-2 text-purple-700 text-sm">
                  <li>分析用戶行為以優化網站設計</li>
                  <li>識別並修復技術問題</li>
                  <li>改善載入速度和使用者體驗</li>
                  <li>開發新功能和改進現有功能</li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">🔧 技術維護</h3>
                <ul className="list-disc list-inside space-y-2 text-indigo-700 text-sm">
                  <li>監控網站性能和安全性</li>
                  <li>預防和偵測濫用行為</li>
                  <li>確保服務的穩定性和可靠性</li>
                  <li>進行容量規劃和資源優化</li>
                </ul>
              </div>
              
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-teal-800 mb-3">📊 統計分析</h3>
                <ul className="list-disc list-inside space-y-2 text-teal-700 text-sm">
                  <li>了解用戶使用模式和偏好</li>
                  <li>評估功能的受歡迎程度</li>
                  <li>制定產品發展策略</li>
                  <li>產生匿名的使用報告</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">⚖️ 法律合規</h3>
                <ul className="list-disc list-inside space-y-2 text-orange-700 text-sm">
                  <li>遵守相關法律法規要求</li>
                  <li>協助調查惡意行為</li>
                  <li>保護網站和用戶安全</li>
                  <li>維護服務的正當使用</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies 政策 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🍪 3. Cookies 使用政策
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 什麼是 Cookies</h3>
                <p className="text-sm leading-relaxed">
                  Cookies 是儲存在您瀏覽器中的小型文字檔案，用於記住您的偏好設定和使用行為。
                  我們使用 Cookies 來提供更好的使用者體驗和分析網站使用情況。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Cookies 類型</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">類型</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用途</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">保存期限</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">必要性</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">功能性</td>
                        <td className="px-4 py-3 text-sm text-gray-600">記住用戶偏好設定</td>
                        <td className="px-4 py-3 text-sm text-gray-600">30天</td>
                        <td className="px-4 py-3 text-sm text-green-600">必要</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">分析性</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Google Analytics 統計</td>
                        <td className="px-4 py-3 text-sm text-gray-600">2年</td>
                        <td className="px-4 py-3 text-sm text-yellow-600">可選</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">性能監控</td>
                        <td className="px-4 py-3 text-sm text-gray-600">監控網站載入速度</td>
                        <td className="px-4 py-3 text-sm text-gray-600">7天</td>
                        <td className="px-4 py-3 text-sm text-green-600">必要</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3 管理 Cookies</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm leading-relaxed">
                    您可以透過瀏覽器設定來管理或禁用 Cookies。請注意，禁用 Cookies 可能會影響網站的某些功能。
                    大部分瀏覽器都允許您查看、管理和刪除 Cookies。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 第三方服務 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔗 4. 第三方服務整合
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 使用的第三方服務</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📊 Google Analytics</h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                      <li>網站流量分析</li>
                      <li>用戶行為統計</li>
                      <li>性能監控</li>
                      <li>IP 地址匿名化</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">☁️ Vercel (託管服務)</h4>
                    <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                      <li>網站託管和部署</li>
                      <li>CDN 服務</li>
                      <li>基本日誌記錄</li>
                      <li>SSL 安全加密</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">🗄️ PostgreSQL (數據庫)</h4>
                    <ul className="list-disc list-inside space-y-1 text-purple-700 text-sm">
                      <li>市場數據儲存</li>
                      <li>系統運行資料</li>
                      <li>匿名使用統計</li>
                      <li>加密資料傳輸</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">📈 Google Sheets API</h4>
                    <ul className="list-disc list-inside space-y-1 text-orange-700 text-sm">
                      <li>市場資料同步</li>
                      <li>自動化資料更新</li>
                      <li>僅讀取公開資料</li>
                      <li>無個人資訊傳輸</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 第三方隱私政策</h3>
                <p className="text-sm leading-relaxed mb-3">
                  我們使用的第三方服務都有各自的隱私政策，建議您詳細了解：
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Google 隱私政策
                    </a> (Google Analytics, Google Sheets)
                  </li>
                  <li>
                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Vercel 隱私政策
                    </a> (網站託管)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 資料保護 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🛡️ 5. 資料保護措施
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">🔐 技術保護</h3>
                <ul className="list-disc list-inside space-y-2 text-green-700 text-sm">
                  <li>HTTPS 加密傳輸</li>
                  <li>資料庫加密儲存</li>
                  <li>定期安全更新</li>
                  <li>存取權限控制</li>
                  <li>防火牆和入侵偵測</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">🏢 管理保護</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-700 text-sm">
                  <li>最小權限原則</li>
                  <li>員工隱私培訓</li>
                  <li>定期安全審查</li>
                  <li>資料存取日誌</li>
                  <li>事故應變程序</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ 安全提醒</h3>
              <p className="text-red-700 text-sm leading-relaxed">
                雖然我們採用多重安全措施保護資料，但請注意，網際網路傳輸本身存在一定風險。
                我們無法保證 100% 的資料安全性，建議用戶也要注意自身的網路安全防護。
              </p>
            </div>
          </section>

          {/* 資料保留 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📅 6. 資料保留期限
            </h2>
            <div className="space-y-4 pl-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">資料類型</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">保留期限</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">刪除方式</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">網站分析資料</td>
                      <td className="px-4 py-3 text-sm text-gray-600">最多 26 個月</td>
                      <td className="px-4 py-3 text-sm text-gray-600">自動刪除</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">伺服器日誌</td>
                      <td className="px-4 py-3 text-sm text-gray-600">30天</td>
                      <td className="px-4 py-3 text-sm text-gray-600">自動輪替刪除</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">錯誤報告</td>
                      <td className="px-4 py-3 text-sm text-gray-600">90天</td>
                      <td className="px-4 py-3 text-sm text-gray-600">手動清理</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">市場歷史資料</td>
                      <td className="px-4 py-3 text-sm text-gray-600">永久保存</td>
                      <td className="px-4 py-3 text-sm text-gray-600">用於統計分析</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 用戶權利 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              👤 7. 用戶權利
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-cyan-800 mb-3">🔍 您有權利：</h3>
                <ul className="list-disc list-inside space-y-2 text-cyan-700 text-sm">
                  <li>了解我們收集什麼資料</li>
                  <li>知道資料的使用目的</li>
                  <li>要求查看相關資料</li>
                  <li>要求更正錯誤資料</li>
                  <li>要求刪除不必要的資料</li>
                  <li>撤回同意權（如適用）</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-pink-800 mb-3">📞 如何行使權利：</h3>
                <ul className="list-disc list-inside space-y-2 text-pink-700 text-sm">
                  <li>發送郵件到隱私信箱</li>
                  <li>在 GitHub 提交 Issue</li>
                  <li>透過官方聯絡管道</li>
                  <li>提供必要的身份驗證</li>
                  <li>我們會在合理時間內回應</li>
                  <li>免費提供基本服務</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 兒童隱私 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              👶 8. 兒童隱私保護
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800 leading-relaxed">
                本網站並非專門針對13歲以下兒童設計，我們不會故意收集兒童的個人資訊。
                如果您發現我們意外收集了兒童的個人資料，請立即聯絡我們，我們會儘快刪除相關資訊。
                家長應監督兒童的網路使用，確保他們了解網路安全的重要性。
              </p>
            </div>
          </section>

          {/* 跨境資料傳輸 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🌍 9. 跨境資料傳輸
            </h2>
            <div className="space-y-4 pl-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">9.1 資料儲存位置</h3>
                <p className="text-sm leading-relaxed">
                  我們的服務依託於國際化的雲端平台，您的資料可能會被處理和儲存在不同國家的伺服器上。
                  我們選擇的服務提供商都遵循國際資料保護標準。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">9.2 保護措施</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>選擇符合 GDPR 標準的服務提供商</li>
                  <li>使用標準合約條款保護資料傳輸</li>
                  <li>確保資料加密和安全傳輸</li>
                  <li>定期評估服務提供商的安全性</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 政策變更 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📝 10. 隱私政策變更
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-700 leading-relaxed mb-4">
                我們可能會不定期更新此隱私政策，以反映服務變化、法律要求或最佳實踐的改進。
                重大變更會透過以下方式通知用戶：
              </p>
              <ul className="list-disc list-inside space-y-2 text-blue-700 text-sm">
                <li>在網站首頁發布公告</li>
                <li>更新本頁面的「最後更新」日期</li>
                <li>通過電子郵件通知（如果您提供了聯絡方式）</li>
                <li>在社群媒體平台發布資訊</li>
              </ul>
            </div>
          </section>

          {/* 聯絡資訊 */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📞 隱私相關聯絡
            </h2>
            <p className="text-gray-600 mb-6">
              如果您對隱私政策有任何疑問、擔憂或需要協助，歡迎隨時聯絡我們：
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <div className="text-sm text-gray-600">
                🔒 隱私信箱: 
                <a href="mailto:privacy@maplestory-tracker.com" className="text-blue-600 hover:underline ml-1">
                  privacy@maplestory-tracker.com
                </a>
              </div>
              <div className="text-sm text-gray-600">
                📧 一般信箱: 
                <a href="mailto:contact@maplestory-tracker.com" className="text-blue-600 hover:underline ml-1">
                  contact@maplestory-tracker.com
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-sm text-gray-600">
                🐙 GitHub Issues: 
                <a 
                  href="https://github.com/llllIIIIllllIIII/maplestory-price-tracker/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  回報隱私問題
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-green-200">
              <p className="text-xs text-gray-500">
                最後更新：2025年7月19日 | 生效日期：2025年7月19日
              </p>
              <p className="text-xs text-gray-500 mt-1">
                我們承諾在 30 個工作天內回應所有隱私相關的詢問
              </p>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  )
}
