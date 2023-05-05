const pool = require('../common/db');

module.exports = {

    find: async () => {
        const sql = 'SELECT * FROM school';
        const data = await pool.execute(sql);
        return data[0];
    },

    findbyId: async (school_id) => {
        const sql = 'SELECT * FROM school where school_id = ?';
        const params = [school_id];
        const data = await pool.execute(sql, params);
        return data[0];
    },

    create: async (dto) => {
        const sql = 'INSERT INTO school VALUES(0,?,?)';
        const params = [dto.school_name, dto.school_email];
        const data = await pool.execute(sql, params);
        return data[0];
    },

    delete: async (school_id) => {
        const sql = 'DELETE from school where school_id = ?'
        const params = [school_id];
        const data = await pool.execute(sql, params);
        return data[0];
    },

    update: async (dto) => {
        const sql = 'UPDATE school set school_name = ? where school_id = ?';
        const params = [dto.school_name, dto.school_id];
        const data = await pool.execute(sql, params);
        return data[0];
    }
}