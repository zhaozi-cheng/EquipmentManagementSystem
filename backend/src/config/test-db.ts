import pool from './db'; // 确保 db.ts 有正确的导出

async function testConnection(): Promise<void> {
    try {
        const conn = await pool.getConnection();
        console.log('✅ 数据库连接成功');
        conn.release();
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('❌ 连接失败:', err.message);
        } else {
            console.error('❌ 未知错误:', err);
        }
    }
}

testConnection();
