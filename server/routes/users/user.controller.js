const pool = require('../../db');

const signUpUser = async (req , res)=>{
    const {username, name, password} = req.body;

    try{
        const query=
        `INSERT INTO public.users (username, name, password )
        VALUES ($1, $2, $3)
        RETURNING *;`

        const values=[username, name, password];
        const result = await pool.query(query, values);
        const newUser = result.rows[0];
        res.status(200).json({
            message: 'User created successfully',
            user: newUser
        });
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'})
    }
}

const loginUser = async (req, res)=>{
    const {username, password} = req.body;

    try{
        const query = `SELECT * FROM public.users WHERE username = $1 AND password = $2;`;
        const values = [username, password];
        const result = await pool.query(query, values);

        if(result.rows.length > 0){
            const user = result.rows[0];
            res.status(200).json({
                message: 'Login successful',
                user: user
            });
        }else{
            res.status(401).json({error: 'Invalid username or password'});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports ={signUpUser, loginUser};