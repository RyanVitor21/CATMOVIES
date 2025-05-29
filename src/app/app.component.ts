import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {SplashScreen} from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { DatabaseService } from './core/service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent{
  constructor( private database: DatabaseService) {
    this.initApp();
  }

  async initApp(){
    await this.database.initializPlugin();
    SplashScreen.hide();
  }
}


/*

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  // 👇 Adicione os componentes do Ionic usados no template
  imports: [IonApp, IonRouterOutlet,]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.initDatabase();
    });
  }

  initDatabase() {
    this.sqlite
      .create({
        name: 'catmovies.db',
        location: 'default',
      })
      .then((db) => {
        console.log('Banco criado com sucesso:', db);
        // Aqui você pode importar dados com sqlitePorter se quiser
      })
      .catch((e) => console.error('Erro ao criar/open o banco', e));
  }
}
*/