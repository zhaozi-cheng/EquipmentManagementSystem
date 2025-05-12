import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',      // 本地数据库固定用 localhost 或 127.0.0.1
    user: 'root',           // 默认用户名（根据你的实际用户名修改）
    password: '108913',    // 安装 MySQL 时设置的密码
    database: 'equipmentmanagementsystem', // 你的数据库名
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;

