import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  repeatpassword: string;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private user: WritableSignal<User[]> = signal<User[]>([]);

 constructor() {
  // Aguarde explicitamente a inicialização
  this.initializPlugin().catch((e) =>
    console.error('[SQLite] Erro ao inicializar plugin:', e)
  );
}

  async initializPlugin() {
    this.db = await this.sqlite.createConnection(DB_USERS, false, 'no-encryption', 1, false);
    await this.db.open();

    const schema = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        repeatpassword TEXT
      );
    `;
    await this.db.execute(schema);
    await this.loadUsers();

    return true;
  }

  async loadUsers() {
    const result = await this.db.query('SELECT * FROM users');
    this.user.set(result.values || []);
  }

  async addUser(name: string, email: string, password: string, repeatpassword: string) {
    const query = `
      INSERT INTO users (name, email, password, repeatpassword)
      VALUES (?, ?, ?, ?)
    `;
    const result = await this.db.run(query, [name, email, password, repeatpassword]);
    await this.loadUsers();
    return result;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const result = await this.db.query(query, [email, password]);
    return (result.values?.length || 0) > 0;
    
  }



  async getAllUsers(): Promise<User[]> {
    const result = await this.db.query('SELECT * FROM users');
    return result.values || [];
  }

  async updateUserById(id: string, password: string) {
    const query = `UPDATE users SET password = ? WHERE id = ?`;
    const result = await this.db.run(query, [password, id]);
    await this.loadUsers();
    return result;
  }

  async deleteUserById(id: string) {
    const query = `DELETE FROM users WHERE id = ?`;
    const result = await this.db.run(query, [id]);
    await this.loadUsers();
    return result;
  }
}

/*@Injectable({ providedIn: 'root' })
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
}*/
