import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    environment: 'happy-dom', // або jsdom, залежно від вашого вибору
  },
  plugins: [vue()],
});
