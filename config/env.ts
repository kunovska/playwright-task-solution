import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

type Environment = 'qa' | 'staging';

const envName = (process.env.TEST_ENV || 'qa') as Environment;

const baseUrls: Record<Environment, string> = {
  qa: process.env.BASE_URL_QA!,
  staging: process.env.BASE_URL_STAGING!,
};

export const env = {
  name: envName,
  baseUrl: baseUrls[envName],
  password: process.env.SAUCE_PASSWORD!,
};
