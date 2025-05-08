interface ImportMetaEnv {
    VITE_API_BASE_URL: string;
    BASE_URL: string;
    readonly DEV: boolean;  // 添加这行
    readonly PROD: boolean; // 添加这行
    readonly MODE: string;  // 添加这行
    // 其他环境变量...
}

interface ImportMeta {
    env: ImportMetaEnv;
}
