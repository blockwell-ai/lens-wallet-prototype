module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './db.sqlite3'
        },
        useNullAsDefault: true
    },
    production: {
        client: 'sqlite3',
        connection: {
            filename: './db.sqlite3'
        },
        useNullAsDefault: true
    }
};
