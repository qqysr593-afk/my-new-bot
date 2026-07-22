const Database = require("better-sqlite3");

const db = new Database("users.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users(
id TEXT PRIMARY KEY,
money INTEGER DEFAULT 100000,
lastSalary INTEGER DEFAULT 0,
lastTreasure INTEGER DEFAULT 0,
lastLuck INTEGER DEFAULT 0,
lastInvest INTEGER DEFAULT 0
)
`).run();

function getUser(id) {
    let user = db.prepare("SELECT * FROM users WHERE id=?").get(id);

    if (!user) {
        db.prepare("INSERT INTO users(id) VALUES(?)").run(id);
        user = db.prepare("SELECT * FROM users WHERE id=?").get(id);
    }

    return user;
}

module.exports = { db, getUser };
