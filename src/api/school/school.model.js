const pool = require('../loaders/db');

module.exports = {

    find: async () => {
        const sql = 'SELECT * FROM school';
        const data = await pool.execute(sql);
        return data[0];
    },

    findbyId: async (school_id) => {
        const sql = 'SELCET * FROM school where school_id = ?';
        const params = [school_id];
        const data = await pool.execute(sql, params);
        return data[0];
    },

    create: async (dto) => {
        const sql = 'INSERT INTO school VALUES(?,?,?)';
        const params = dto;
        const data = await pool.execute(sql);
        return data[0];
    },

    delete: async (school_id) => {
        const sql = 'DELETE from school where school_id = ?'
        const params = [school_id];
        const data = await pool.execute(sql, params);
        return data[0];
    }
}