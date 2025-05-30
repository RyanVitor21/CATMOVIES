import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';

const DB_NAME = 'myuserdb';

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
  private usersSignal: WritableSignal<User[]> = signal<User[]>([]);

  constructor(private platform: Platform) {}

  async initializPlugin() {
    try {
      await this.platform.ready(); // ✅ Aguarda o Ionic estar pronto

      const isConn = await this.sqlite.isConnection(DB_NAME, false);
      if (!isConn.result) {
        this.db = await this.sqlite.createConnection(DB_NAME, false, 'no-encryption', 1, false);
        await this.db.open();
      } else {
        // ✅ Agora com dois argumentos obrigatórios
        this.db = await this.sqlite.retrieveConnection(DB_NAME, false);
      }

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

      console.log('[SQLite] Plugin inicializado com sucesso.');
      return true;
    } catch (error) {
      console.error('[SQLite] Erro ao inicializar o plugin:', error);
      throw error;
    }
  }

  async loadUsers() {
    try {
      const result = await this.db.query('SELECT * FROM users');
      this.usersSignal.set(result.values || []);
    } catch (e) {
      console.error('[SQLite] Erro ao carregar usuários:', e);
    }
  }

  async addUser(name: string, email: string, password: string, repeatpassword: string) {
    try {
      const exists = await this.userExists(email);
      if (exists) {
        alert('Este e-mail já está cadastrado.');
        return false;
      }

      const query = `
        INSERT INTO users (name, email, password, repeatpassword)
        VALUES (?, ?, ?, ?)
      `;
      await this.db.run(query, [name, email, password, repeatpassword]);
      await this.loadUsers();
      return true;
    } catch (err) {
      console.error('[SQLite] Erro ao adicionar usuário:', err);
      alert('Erro ao salvar usuário: ' + JSON.stringify(err));
      return false;
    }
  }

  async userExists(email: string): Promise<boolean> {
    const result = await this.db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return (result.values?.length || 0) > 0;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    try {
      const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
      const result = await this.db.query(query, [email, password]);
      return (result.values?.length || 0) > 0;
    } catch (e) {
      console.error('[SQLite] Erro ao validar login:', e);
      return false;
    }
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
