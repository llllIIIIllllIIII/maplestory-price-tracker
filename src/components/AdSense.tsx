'use client'

import { useEffect, useState } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  debug?: boolean
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  debug = false
}: AdSenseProps) {
  const [adStatus, setAdStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    try {
      if (debug) {
        console.log('AdSense component mounted', { adSlot, adFormat })
      }

      // 檢查 AdSense 腳本是否載入
      if (typeof window !== 'undefined') {
        const checkAdSense = () => {
          if ((window as any).adsbygoogle) {
            try {
              ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
              setAdStatus('loaded')
              if (debug) {
                console.log('AdSense ad pushed successfully', adSlot)
              }
            } catch (error) {
              setAdStatus('error')
              setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
              if (debug) {
                console.log('AdSense push error:', error)
              }
            }
          } else {
            // 等待 AdSense 腳本載入
            setTimeout(checkAdSense, 100)
          }
        }
        
        checkAdSense()
      }
    } catch (error) {
      setAdStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
      if (debug) {
        console.log('AdSense error:', error)
      }
    }
  }, [adSlot, debug])

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-7994991319464017"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
      {debug && (
        <div className="mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded">
          <p>廣告狀態: {adStatus}</p>
          <p>廣告位 ID: {adSlot}</p>
          <p>廣告格式: {adFormat}</p>
          {errorMessage && <p className="text-red-500">錯誤: {errorMessage}</p>}
        </div>
      )}
    </div>
  )
}
