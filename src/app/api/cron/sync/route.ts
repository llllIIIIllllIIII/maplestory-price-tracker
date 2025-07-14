import { NextRequest } from 'next/server';
import { prisma } from '@/lib/database';
import { googleSheetsService } from '@/lib/google-sheets';
import { calculateEfficiency, findArbitrageOpportunities, validateItemData } from '@/lib/calculator';
import { cacheService } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    // 驗證 cron job 密鑰（安全性）
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔄 開始執行定時同步...');
    const startTime = Date.now();
    
    // 建立同步日誌
    const syncLog = await prisma.syncLog.create({
      data: {
        status: 'ERROR', // 預設為錯誤，成功後會更新
        message: '開始定時同步資料'
      }
    });

    // 驗證 Google Sheets 存取權限
    const isAccessible = await googleSheetsService.validateAccess();
    if (!isAccessible) {
      throw new Error('無法存取 Google Sheets，請檢查 API 金鑰和工作表 ID');
    }

    // 從 Google Sheets 獲取資料
    const googleSheetData = await googleSheetsService.fetchArtaleItemData();
    
    if (googleSheetData.length === 0) {
      throw new Error('Google Sheets 中沒有找到有效資料');
    }

    let successCount = 0;
    let errorCount = 0;

    // 處理每筆資料
    for (const row of googleSheetData) {
      try {
        if (!validateItemData(row)) {
          errorCount++;
          continue;
        }

        // 計算效率
        const efficiency = calculateEfficiency(row.wcPrice, row.mesosValue);

        await prisma.item.upsert({
          where: { name: row.itemName },
          update: {
            wcPrice: row.wcPrice,
            mesosValue: row.mesosValue,
            efficiency,
            category: row.category || 'other',
            description: row.description,
            lastUpdated: new Date()
          },
          create: {
            name: row.itemName,
            category: row.category || 'other',
            wcPrice: row.wcPrice,
            mesosValue: row.mesosValue,
            efficiency,
            description: row.description
          }
        });

        successCount++;
      } catch (error) {
        console.error(`處理道具 ${row.itemName} 時發生錯誤:`, error);
        errorCount++;
      }
    }

    const duration = Date.now() - startTime;

    // 更新同步日誌
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: 'SUCCESS',
        message: `定時同步完成 - 成功: ${successCount}, 失敗: ${errorCount}`,
        duration
      }
    });

    // 清除快取
    cacheService.clear('all');

    const result = {
      success: true,
      successCount,
      errorCount,
      duration,
      timestamp: new Date().toISOString()
    };

    console.log('✅ 定時同步完成:', result);
    
    return Response.json(result);
    
  } catch (error) {
    console.error('❌ 定時同步失敗:', error);
    
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
