import 'dotenv/config';

type Environment = 'qa' | 'staging';

const envName = (process.env.TEST_ENV || 'qa') as Environment;

const baseUrls: Record<Environment, string> = {
  qa: process.env.BASE_URL_QA || 'https://www.saucedemo.com',
  staging: process.env.BASE_URL_STAGING || 'https://www.saucedemo.com',
};

export const env = {
  name: envName,
  baseUrl: baseUrls[envName],
  password: process.env.SAUCE_PASSWORD || 'secret_sauce',
};
