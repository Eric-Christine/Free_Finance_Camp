import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.freefinancecamp.ios',
  appName: 'Free Finance Camp',
  webDir: 'dist',
  server: {
    url: 'https://freefinancecamp.com',
    cleartext: false
  }
};

export default config;
