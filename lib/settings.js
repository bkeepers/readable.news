const { VERCEL_ENV, VERCEL_URL, APP_DOMAIN } = process.env

const APP_URL = VERCEL_ENV === 'production' ? `https://${APP_DOMAIN || VERCEL_URL}` : 'http://localhost:3000'

export { APP_URL, APP_DOMAIN }
