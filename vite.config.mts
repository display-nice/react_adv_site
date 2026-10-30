/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

// vite.config.mts - конфигурационный файл Vite (замена react-app-rewired + config-overrides.js)
// Алиасы перенесены из tsconfig.paths.json - там же они описаны для TypeScript

// Корень проекта в ESM-формате конфига ( __dirname в нём недоступен )
const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Определяем алиасы на основе тех же путей, что и в tsconfig.paths.json
const aliases = {
	"@src": "src",
	"@components": "src/components",
	"@css": "src/visuals/css",
	"@fonts": "src/visuals/fonts",
	"@img": "src/visuals/img",
	"@utils": "src/utils",
	"@helpers": "src/helpers",
	"@services": "src/services",
	"@ui": "src/ui",
	"@search_page": "src/pages/search_page",
	"@sp_modules": "src/pages/search_page/modules",
};

export default defineConfig({
	// Относительные пути к ассетам, чтобы сайт работал из подкаталога (gh-pages)
	base: "./",
	plugins: [react()],
	resolve: {
		alias: Object.entries(aliases).map(([find, target]) => ({
			find,
			replacement: path.resolve(rootDir, target),
		})),
	},
	build: {
		// CRA собирал проект в build/, gh-pages деплоит оттуда же
		outDir: "build",
	},
	css: {
		// CSS-модули проекта не используются, но импорт CSS должен работать как раньше
		devSourcemap: true,
	},
	server: {
		// На Windows localhost может резолвиться в ::1, и тогда Vite слушает только IPv6.
		// Если подключение к ::1 блокируется (антивирус, VPN, политики), браузер
		// получает "localhost не позволяет установить соединение". Явно слушаем IPv4.
		host: "127.0.0.1",
		open: true,
	},
});
