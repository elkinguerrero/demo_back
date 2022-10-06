const express = require('express');
const router = express.Router();
const { Client } = require('pg')
// const { json } = require('express');
// var cors = require('cors');

const general = {
    client_pg: new Client({
        host: 'kindrez.fun',
        port: 5432,
        user: 'postgres',
        password: 'Baihplpeff*40',
        database: 'demo',
    })
}

router.get('/get_users', async (req, res) => {
    let consult = await pg( `SELECT * FROM usuarios WHERE status = 1`, [] )
    res.json( consult )
});

//set
router.post('/set_user', async (req, res) => {
    let insert  = await pg( `INSERT INTO usuarios( nombre, cedula, fecha_nacimiento, status ) VALUES($1, $2, $3, 1)`,[req.body.nombre, req.body.cedula, req.body.fecha_nacimiento] );
    res.json( insert )
});

router.post('/delete_user', async (req, res) => {
    let delete_user  = await pg( `UPDATE usuarios SET status = 0 WHERE id = $1 `,[req.body.id] );
    if( delete_user.status == 1 ){
        delete_user.mensaje = 'Usuario borrado correctamente';
    }

    res.json( delete_user )
});

async function pg( query, arr_query ){
    return new Promise(resolve => {
        // const res = await general.client_pg.query( query, arr_query )
        // return res.rows;
        general.client_pg.query(query, arr_query, (err, res) => {
            if (err) {
                console.log( "Error en query" )
                console.log( query )
                console.log( arr_query )
                console.log( err.toString() )
                resolve( {"status":0, mensaje:err.toString()} );
            } else {
                resolve( {"status":1, mensaje:res.rows} );
            }
        })
    });
}

async function connect_pg(){
    await general.client_pg.connect()
}

connect_pg()

module.exports = router;
