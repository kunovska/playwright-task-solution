import dotenv from 'dotenv';

const isCI = process.env.CI === 'true';

// Only load .env.local for LOCAL runs (never override CI)
if (!isCI) {
  dotenv.config({ path: '.env.local' });
}

type Environment = 'qa' | 'staging';

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

const envName = required('TEST_ENV') as Environment;

const baseUrls: Record<Environment, string> = {
  qa: required('BASE_URL_QA'),
  staging: required('BASE_URL_STAGING'),
};

export const env = {
  name: envName,
  baseUrl: baseUrls[envName],
  password: required('SAUCE_PASSWORD'),
};
