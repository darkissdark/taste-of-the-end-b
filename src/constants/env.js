const NODE_ENV = process.env.NODE_ENV ?? 'development';
const isRenderHosted = Boolean(process.env.RENDER);

export const isProd = NODE_ENV === 'production' || isRenderHosted;