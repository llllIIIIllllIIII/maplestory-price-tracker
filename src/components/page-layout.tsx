import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
  lastUpdated?: string
}

export function PageLayout({ children, title, description, lastUpdated }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <main className="container mx-auto px-4 py-8">
        {/* 頁面標題 */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-4 border-t pt-4">
              最後更新：{lastUpdated}
            </p>
          )}
        </div>

        {/* 頁面內容 */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
