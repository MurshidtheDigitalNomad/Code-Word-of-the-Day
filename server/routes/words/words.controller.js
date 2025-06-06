const pool = require('../../db');

const CodeWordOfTheDay = async (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid index provided' });
    }

    try {
        const query=
        `SELECT * FROM codewords LIMIT 1 OFFSET $1`;
        const values = [index];

        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            const codeWord = result.rows[0];
            return res.status(200).json(codeWord);
        } else {
            res.status(404).json({ error: 'Code word not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const techStack = async (req, res)=>{
    try{
        const query=`SELECT * FROM codewords ORDER BY cw_id ASC`;
   
        const result= await pool.query(query);
     
        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const searchWord = async (req, res) => {
    const searchTerm = req.query.search;

    if (!searchTerm || searchTerm.trim() === '') {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const query = `SELECT * FROM codewords WHERE LOWER(name) LIKE LOWER($1)`;
        const values = [`%${searchTerm}%`];

        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const codetionaryWords = async (req, res) => {
    const {name, meaning, field}= req.body;

    if (!name || !meaning || !field) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        query=
        `INSERT INTO codewords(name, meaning, field)
        VALUES($1, $2, $3) RETURNING *`;
        const values = [name, meaning, field];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Code word added successfully',
            codeword: result.rows[0]
        })
    }catch(err){
        console.error('Error adding code word:', err);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = {
    CodeWordOfTheDay,
    techStack,
    searchWord,
    codetionaryWords
};
