interface ImportMetaEnv {
    VITE_API_BASE_URL: string;
    BASE_URL: string;
    // 其他环境变量...
}

interface ImportMeta {
    env: ImportMetaEnv;
}
