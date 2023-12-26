import mysql from 'mysql2'

export const clientDB = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "dataBooks",
    password: ""
})

clientDB.connect(err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log("Connected to database!");
    }
});