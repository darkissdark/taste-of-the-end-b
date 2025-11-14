export const PROD_ORIGINS = ['https://taste-of-the-end-f-4qj6.vercel.app'];
export const DEV_ORIGINS = ['http://localhost:3000', 'http://localhost:3001'];

export const getAllowedOrigins = (isProd) =>
  isProd ? PROD_ORIGINS : [...DEV_ORIGINS, ...PROD_ORIGINS];

