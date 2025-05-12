import pool from '../config/db';

interface Device {
    id: number;
    name: string;
    description: string | null;
    status: 'active' | 'inactive' | 'repair' | 'scrapped';
    created_at: Date;
    updated_at: Date;
}

export const getDevices = async (params?: any): Promise<Device[]> => {
    const [rows] = await pool.query('SELECT * FROM devices');
    return rows as Device[];
};

export const getDeviceById = async (id: number): Promise<Device | null> => {
    const [rows] = await pool.query('SELECT * FROM devices WHERE id = ?', [id]);
    return (rows as Device[])[0] || null;
};

export const createDevice = async (device: Omit<Device, 'id' | 'created_at' | 'updated_at'>): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO devices (name, description, status) VALUES (?, ?, ?)',
        [device.name, device.description, device.status]
    );
    return (result as any).insertId;
};

export const updateDevice = async (id: number, device: Partial<Device>): Promise<boolean> => {
    const [result] = await pool.query(
        'UPDATE devices SET name = ?, description = ?, status = ? WHERE id = ?',
        [device.name, device.description, device.status, id]
    );
    return (result as any).affectedRows > 0;
};

export const deleteDevice = async (id: number): Promise<boolean> => {
    const [result] = await pool.query('DELETE FROM devices WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
};
