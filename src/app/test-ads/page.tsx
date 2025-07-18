import AdSense from '@/components/AdSense'

export default function TestAdsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">廣告測試頁面</h1>
        
        {/* 測試廣告 1 - 橫幅廣告 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">測試廣告 1 - 橫幅廣告 (728x90)</h2>
          <div className="border-2 border-blue-200 bg-blue-50 p-4 rounded">
            <AdSense
              adSlot="1234567890"
              adFormat="auto"
              debug={true}
              style={{ 
                display: 'block', 
                width: '100%', 
                maxWidth: '728px', 
                height: '90px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc'
              }}
            />
          </div>
        </div>

        {/* 測試廣告 2 - 方形廣告 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">測試廣告 2 - 方形廣告 (300x250)</h2>
          <div className="border-2 border-green-200 bg-green-50 p-4 rounded">
            <AdSense
              adSlot="0987654321"
              adFormat="auto"
              debug={true}
              style={{ 
                display: 'block', 
                width: '300px', 
                height: '250px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc'
              }}
            />
          </div>
        </div>

        {/* 測試廣告 3 - 響應式廣告 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">測試廣告 3 - 響應式廣告</h2>
          <div className="border-2 border-purple-200 bg-purple-50 p-4 rounded">
            <AdSense
              adSlot="1122334455"
              adFormat="auto"
              debug={true}
              style={{ 
                display: 'block', 
                width: '100%',
                minHeight: '200px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc'
              }}
            />
          </div>
        </div>

        {/* 測試信息 */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold mb-2">測試說明：</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>在開發環境中，廣告可能不會顯示實際內容</li>
            <li>檢查瀏覽器的開發者工具是否有 AdSense 相關錯誤</li>
            <li>確保廣告位置有正確的 HTML 結構</li>
            <li>生產環境中才會顯示真正的廣告</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
