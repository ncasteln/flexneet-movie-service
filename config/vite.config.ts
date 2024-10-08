import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 5173, // This is the port which we will use in docker
	}
})
