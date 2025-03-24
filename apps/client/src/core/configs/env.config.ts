const envConfig = {
  SERVER_PROTOCOL: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
  SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,
  SERVER_PORT: process.env.NEXT_PUBLIC_SERVER_PORT,
  JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET || ''
};

export default envConfig;
