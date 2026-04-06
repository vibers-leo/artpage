import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'matecheck',
  brand: {
    displayName: '공과금 N빵',
    primaryColor: '#3182F6',
    icon: 'https://matecheck.vercel.app/favicon.ico',
  },
  web: {
    host: 'localhost',
    port: 3403,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
  webViewProps: { type: 'partner' },
});
