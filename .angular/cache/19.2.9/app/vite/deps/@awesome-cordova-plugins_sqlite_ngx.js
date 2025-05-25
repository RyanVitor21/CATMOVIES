import {
  AwesomeCordovaNativePlugin,
  checkAvailability,
  cordova,
  cordovaInstance,
  instancePropertyGet,
  instancePropertySet
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

// node_modules/@awesome-cordova-plugins/sqlite/ngx/index.js
var SQLiteObject = (
  /** @class */
  function() {
    function SQLiteObject2(_objectInstance) {
      this._objectInstance = _objectInstance;
    }
    SQLiteObject2.prototype.addTransaction = function(transaction) {
      return cordovaInstance(this, "addTransaction", {
        "sync": true
      }, arguments);
    };
    SQLiteObject2.prototype.transaction = function(fn) {
      return cordovaInstance(this, "transaction", {
        "successIndex": 2,
        "errorIndex": 1
      }, arguments);
    };
    SQLiteObject2.prototype.readTransaction = function(fn) {
      return cordovaInstance(this, "readTransaction", {}, arguments);
    };
    SQLiteObject2.prototype.startNextTransaction = function() {
      return cordovaInstance(this, "startNextTransaction", {
        "sync": true
      }, arguments);
    };
    SQLiteObject2.prototype.open = function() {
      return cordovaInstance(this, "open", {}, arguments);
    };
    SQLiteObject2.prototype.close = function() {
      return cordovaInstance(this, "close", {}, arguments);
    };
    SQLiteObject2.prototype.executeSql = function(statement, params) {
      return cordovaInstance(this, "executeSql", {}, arguments);
    };
    SQLiteObject2.prototype.sqlBatch = function(sqlStatements) {
      return cordovaInstance(this, "sqlBatch", {}, arguments);
    };
    SQLiteObject2.prototype.abortallPendingTransactions = function() {
      return cordovaInstance(this, "abortallPendingTransactions", {
        "sync": true
      }, arguments);
    };
    Object.defineProperty(SQLiteObject2.prototype, "databaseFeatures", {
      get: function() {
        return instancePropertyGet(this, "databaseFeatures");
      },
      set: function(value) {
        instancePropertySet(this, "databaseFeatures", value);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SQLiteObject2.prototype, "openDBs", {
      get: function() {
        return instancePropertyGet(this, "openDBs");
      },
      set: function(value) {
        instancePropertySet(this, "openDBs", value);
      },
      enumerable: false,
      configurable: true
    });
    return SQLiteObject2;
  }()
);
var SQLite = (
  /** @class */
  function(_super) {
    __extends(SQLite2, _super);
    function SQLite2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    SQLite2.prototype.create = function(config) {
      var _this = this;
      return function() {
        if (checkAvailability(_this) === true) {
          return new Promise(function(resolve, reject) {
            sqlitePlugin.openDatabase(config, function(db) {
              return resolve(new SQLiteObject(db));
            }, reject);
          });
        }
      }();
    };
    SQLite2.prototype.echoTest = function() {
      return cordova(this, "echoTest", {}, arguments);
    };
    SQLite2.prototype.selfTest = function() {
      return cordova(this, "selfTest", {}, arguments);
    };
    SQLite2.prototype.deleteDatabase = function(config) {
      return cordova(this, "deleteDatabase", {}, arguments);
    };
    SQLite2.ɵfac = /* @__PURE__ */ (() => {
      let ɵSQLite_BaseFactory;
      return function SQLite_Factory(__ngFactoryType__) {
        return (ɵSQLite_BaseFactory || (ɵSQLite_BaseFactory = ɵɵgetInheritedFactory(SQLite2)))(__ngFactoryType__ || SQLite2);
      };
    })();
    SQLite2.ɵprov = ɵɵdefineInjectable({
      token: SQLite2,
      factory: SQLite2.ɵfac
    });
    SQLite2.pluginName = "SQLite";
    SQLite2.pluginRef = "sqlitePlugin";
    SQLite2.plugin = "cordova-sqlite-storage";
    SQLite2.repo = "https://github.com/litehelpers/Cordova-sqlite-storage";
    SQLite2.platforms = ["Android", "iOS", "macOS", "Windows"];
    SQLite2 = __decorate([], SQLite2);
    return SQLite2;
  }(AwesomeCordovaNativePlugin)
);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SQLite, [{
    type: Injectable
  }], null, {
    create: [],
    echoTest: [],
    selfTest: [],
    deleteDatabase: []
  });
})();
export {
  SQLite,
  SQLiteObject
};
//# sourceMappingURL=@awesome-cordova-plugins_sqlite_ngx.js.map
