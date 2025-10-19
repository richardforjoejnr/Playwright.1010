interface Config {
  name: string;
  baseUrl: string;
}

let config: Config;

const env = process.env.ENVIRONMENT || 'demo';

try {
    config = require(`./${env}`).default as Config;
} catch {
  console.error(`Configuration file for environment "${env}" not found. Using demo configuration.`);
  config = require('./demo').default as Config;
}

export default config;