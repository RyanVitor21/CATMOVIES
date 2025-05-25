import {
  AwesomeCordovaNativePlugin,
  cordova
} from "./chunk-6WUVWKFX.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵgetInheritedFactory
} from "./chunk-VPQIBSAT.js";
import {
  __decorate,
  __extends
} from "./chunk-7IZRYL2Z.js";
import "./chunk-ZVATTXSA.js";

// node_modules/@awesome-cordova-plugins/sqlite-porter/ngx/index.js
var SQLitePorter = (
  /** @class */
  function(_super) {
    __extends(SQLitePorter2, _super);
    function SQLitePorter2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    SQLitePorter2.prototype.importSqlToDb = function(db, sql) {
      return cordova(this, "importSqlToDb", {
        "callbackStyle": "object",
        "successName": "successFn",
        "errorName": "errorFn"
      }, arguments);
    };
    SQLitePorter2.prototype.exportDbToSql = function(db) {
      return cordova(this, "exportDbToSql", {
        "callbackStyle": "object",
        "successName": "successFn",
        "errorName": "errorFn"
      }, arguments);
    };
    SQLitePorter2.prototype.importJsonToDb = function(db, json) {
      return cordova(this, "importJsonToDb", {
        "callbackStyle": "object",
        "successName": "successFn",
        "errorName": "errorFn"
      }, arguments);
    };
    SQLitePorter2.prototype.exportDbToJson = function(db) {
      return cordova(this, "exportDbToJson", {
        "callbackStyle": "object",
        "successName": "successFn",
        "errorName": "errorFn"
      }, arguments);
    };
    SQLitePorter2.prototype.wipeDb = function(db) {
      return cordova(this, "wipeDb", {
        "callbackStyle": "object",
        "successName": "successFn",
        "errorName": "errorFn"
      }, arguments);
    };
    SQLitePorter2.ɵfac = /* @__PURE__ */ (() => {
      let ɵSQLitePorter_BaseFactory;
      return function SQLitePorter_Factory(__ngFactoryType__) {
        return (ɵSQLitePorter_BaseFactory || (ɵSQLitePorter_BaseFactory = ɵɵgetInheritedFactory(SQLitePorter2)))(__ngFactoryType__ || SQLitePorter2);
      };
    })();
    SQLitePorter2.ɵprov = ɵɵdefineInjectable({
      token: SQLitePorter2,
      factory: SQLitePorter2.ɵfac
    });
    SQLitePorter2.pluginName = "SQLitePorter";
    SQLitePorter2.plugin = "uk.co.workingedge.cordova.plugin.sqliteporter";
    SQLitePorter2.pluginRef = "cordova.plugins.sqlitePorter";
    SQLitePorter2.repo = "https://github.com/dpa99c/cordova-sqlite-porter";
    SQLitePorter2.platforms = ["Amazon Fire OS", "Android", "BlackBerry 10", "Browser", "iOS", "Tizen", "Windows", "Windows Phone"];
    SQLitePorter2 = __decorate([], SQLitePorter2);
    return SQLitePorter2;
  }(AwesomeCordovaNativePlugin)
);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SQLitePorter, [{
    type: Injectable
  }], null, {
    importSqlToDb: [],
    exportDbToSql: [],
    importJsonToDb: [],
    exportDbToJson: [],
    wipeDb: []
  });
})();
export {
  SQLitePorter
};
//# sourceMappingURL=@awesome-cordova-plugins_sqlite-porter_ngx.js.map
