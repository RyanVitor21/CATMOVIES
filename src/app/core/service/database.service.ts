import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.init();
  }

  async init() {
    console.log('[SQLite] Banco catmovies.db criado com sucesso!');
    try {
      const db = await this.sqlite.create({
        name: 'catmovies.db',
        location: 'default'
      });
      this.dbInstance = db;

      await db.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT
        )
      `, []);

      console.log('[SQLite] Banco inicializado com sucesso.');
    } catch (error) {
      console.error('[SQLite] Erro na inicialização:', error);
    }
  }

  async userExists(email: string): Promise<boolean> {
    const res = await this.dbInstance.executeSql(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return res.rows.length > 0;
  }

  async addUser(name: string, email: string, password: string): Promise<boolean> {
    const exists = await this.userExists(email);
    if (exists) {
      alert('Este e-mail já está cadastrado.');
      return false;
    }

    try {
      await this.dbInstance.executeSql(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password]
      );
      return true;
    } catch (err: any) {
      console.error('[SQLite] Erro ao adicionar usuário:', err);
      alert('[ERRO DB] ' + JSON.stringify(err));
      return false;
    }
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    try {
      const res = await this.dbInstance.executeSql(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [email, password]
      );
      return res.rows.length > 0;
    } catch (err) {
      console.error('[SQLite] Erro ao validar usuário:', err);
      return false;
    }
  }
}
