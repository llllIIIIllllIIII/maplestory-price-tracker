'use client'

export function Header() {
  return (
    <header className="bg-white border-b-2 border-orange-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">🍁</div>
            <div>
              <h1 className="text-2xl font-bold maple-text">
                楓之谷物價追蹤器
              </h1>
              <p className="text-gray-600 text-sm">
                實時追蹤現金道具與楓幣兌換效率
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <SyncButton />
            <div className="text-right text-sm text-gray-500">
              <p>資料每小時更新</p>
              <p>上次更新：剛剛</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function SyncButton() {
  const handleSync = async () => {
    try {
      const response = await fetch('/api/sync', { method: 'POST' })
      const result = await response.json()
      
      if (result.success) {
        alert('資料同步成功！')
        window.location.reload()
      } else {
        alert(`同步失敗: ${result.message}`)
      }
    } catch (error) {
      alert('同步失敗，請稍後再試')
    }
  }

  return (
    <button
      onClick={handleSync}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    >
      🔄 手動同步
    </button>
  )
}
