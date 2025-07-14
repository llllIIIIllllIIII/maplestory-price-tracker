/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    CRON_SECRET: process.env.CRON_SECRET,
  },
}

module.exports = nextConfig
