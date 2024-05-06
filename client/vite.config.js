import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/schedulizer/",

    plugins: [react(), sentryVitePlugin({
        org: "riphah-international-univer-no",
        project: "schdulizer"
    })],

    resolve: {
		alias: {
			"react-use": "@types/react-use",
		},
	},

    server: {
		proxy: {
			"/users": "http://localhost:8000",
			"/businesses": "http://localhost:8000",
			"/services": "http://localhost:8000",
			"/appointments": "http://localhost:8000",
		},
	},

    build: {
        sourcemap: true
    }
});