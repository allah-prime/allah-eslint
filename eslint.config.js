import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);

// 使用 jiti 加载 TS 源码配置
// 这样在开发本项目时，可以直接使用 src 下的 TS 配置，而无需先构建
const config = await jiti.import('./src/index.ts').then((module) => module.default);

export default config;
