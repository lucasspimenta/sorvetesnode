async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Lcj.456baronesa',
        database: 'sorvetes'
    });
    global.connection = connection;
    return connection;
}

exports.post = async (req, res) => {
    const con = await connect();
    const sql = 'INSERT INTO sorvetes (sabor, preco, tipo, disponivel, descricao) VALUES (?, ?, ?, ?, ?)';
    const values = [req.body.sabor, req.body.preco, req.body.tipo, req.body.disponivel, req.body.descricao];
    await con.query(sql, values);
    res.status(201).send('Sorvete inserido com sucesso');
};

exports.put = async (req, res) => {
    const con = await connect();
    const sql = 'UPDATE sorvetes SET sabor = ?, preco = ?, tipo = ?, disponivel = ?, descricao = ? WHERE id = ?';
    const values = [req.body.sabor, req.body.preco, req.body.tipo, req.body.disponivel, req.body.descricao, req.params.id];
    await con.query(sql, values);
    res.status(200).send('Sorvete atualizado com sucesso');
};

exports.delete = async (req, res) => {
    const con = await connect();
    await con.query('DELETE FROM sorvetes WHERE id = ?', [req.params.id]);
    res.status(200).send('Sorvete removido com sucesso');
};

exports.get = async (req, res) => {
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM sorvetes');
    res.status(200).send(rows);
};

exports.getById = async (req, res) => {
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM sorvetes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
        return res.status(404).send({ error: 'Sorvete não encontrado' });
    }
    res.status(200).send(rows[0]);
};
