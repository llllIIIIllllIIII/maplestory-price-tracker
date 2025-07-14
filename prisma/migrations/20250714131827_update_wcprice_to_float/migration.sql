-- CreateTable
CREATE TABLE "items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "wcPrice" REAL NOT NULL,
    "mesosValue" INTEGER NOT NULL,
    "efficiency" REAL NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "arbitrage_opportunities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item1Id" INTEGER NOT NULL,
    "item2Id" INTEGER NOT NULL,
    "profitRate" REAL NOT NULL,
    "priceDiff" REAL NOT NULL,
    "efficiencyDiff" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "arbitrage_opportunities_item1Id_fkey" FOREIGN KEY ("item1Id") REFERENCES "items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "arbitrage_opportunities_item2Id_fkey" FOREIGN KEY ("item2Id") REFERENCES "items" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "itemsCount" INTEGER,
    "duration" INTEGER,
    "isAutoSync" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "items_name_key" ON "items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "arbitrage_opportunities_item1Id_item2Id_key" ON "arbitrage_opportunities"("item1Id", "item2Id");
