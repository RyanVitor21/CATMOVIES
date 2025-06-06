import {
  Observable,
  fromEvent
} from "./chunk-VPQIBSAT.js";

// node_modules/@awesome-cordova-plugins/core/decorators/common.js
var ERR_CORDOVA_NOT_AVAILABLE = {
  error: "cordova_not_available"
};
var ERR_PLUGIN_NOT_INSTALLED = {
  error: "plugin_not_installed"
};
function getPromise(callback) {
  var tryNativePromise = function() {
    if (Promise) {
      return new Promise(function(resolve, reject) {
        callback(resolve, reject);
      });
    } else {
      console.error("No Promise support or polyfill found. To enable Ionic Native support, please add the es6-promise polyfill before this script, or run with a library like Angular or on a recent browser.");
    }
  };
  if (typeof window !== "undefined" && window.angular) {
    var doc = window.document;
    var injector = window.angular.element(doc.querySelector("[ng-app]") || doc.body).injector();
    if (injector) {
      var $q = injector.get("$q");
      return $q(function(resolve, reject) {
        callback(resolve, reject);
      });
    }
    console.warn("Angular 1 was detected but $q couldn't be retrieved. This is usually when the app is not bootstrapped on the html or body tag. Falling back to native promises which won't trigger an automatic digest when promises resolve.");
  }
  return tryNativePromise();
}
function wrapPromise(pluginObj, methodName, args, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var pluginResult, rej;
  var p = getPromise(function(resolve, reject) {
    if (opts.destruct) {
      pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        return resolve(args2);
      }, function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        return reject(args2);
      });
    } else {
      pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject);
    }
    rej = reject;
  });
  if (pluginResult && pluginResult.error) {
    p.catch(function() {
    });
    typeof rej === "function" && rej(pluginResult.error);
  }
  return p;
}
function wrapOtherPromise(pluginObj, methodName, args, opts) {
  if (opts === void 0) {
    opts = {};
  }
  return getPromise(function(resolve, reject) {
    var pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts);
    if (pluginResult) {
      if (pluginResult.error) {
        reject(pluginResult.error);
      } else if (pluginResult.then) {
        pluginResult.then(resolve).catch(reject);
      }
    } else {
      reject({
        error: "unexpected_error"
      });
    }
  });
}
function wrapObservable(pluginObj, methodName, args, opts) {
  if (opts === void 0) {
    opts = {};
  }
  return new Observable(function(observer) {
    var pluginResult;
    if (opts.destruct) {
      pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        return observer.next(args2);
      }, function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        return observer.error(args2);
      });
    } else {
      pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
    }
    if (pluginResult && pluginResult.error) {
      observer.error(pluginResult.error);
      observer.complete();
    }
    return function() {
      try {
        if (opts.clearFunction) {
          if (opts.clearWithArgs) {
            return callCordovaPlugin(pluginObj, opts.clearFunction, args, opts, observer.next.bind(observer), observer.error.bind(observer));
          }
          return callCordovaPlugin(pluginObj, opts.clearFunction, []);
        }
      } catch (e) {
        console.warn("Unable to clear the previous observable watch for", pluginObj.constructor.getPluginName(), methodName);
        console.warn(e);
      }
    };
  });
}
function wrapEventObservable(event, element) {
  element = typeof window !== "undefined" && element ? get(window, element) : element || (typeof window !== "undefined" ? window : {});
  return fromEvent(element, event);
}
function checkAvailability(plugin, methodName, pluginName) {
  var pluginRef, pluginPackage;
  if (typeof plugin === "string") {
    pluginRef = plugin;
  } else {
    pluginRef = plugin.constructor.getPluginRef();
    pluginName = plugin.constructor.getPluginName();
    pluginPackage = plugin.constructor.getPluginInstallName();
  }
  var pluginInstance = getPlugin(pluginRef);
  if (!pluginInstance || !!methodName && typeof pluginInstance[methodName] === "undefined") {
    if (typeof window === "undefined" || !window.cordova) {
      cordovaWarn(pluginName, methodName);
      return ERR_CORDOVA_NOT_AVAILABLE;
    }
    pluginWarn(pluginName, pluginPackage, methodName);
    return ERR_PLUGIN_NOT_INSTALLED;
  }
  return true;
}
function instanceAvailability(pluginObj, methodName) {
  return pluginObj._objectInstance && (!methodName || typeof pluginObj._objectInstance[methodName] !== "undefined");
}
function setIndex(args, opts, resolve, reject) {
  if (opts === void 0) {
    opts = {};
  }
  if (opts.sync) {
    return args;
  }
  if (opts.callbackOrder === "reverse") {
    args.unshift(reject);
    args.unshift(resolve);
  } else if (opts.callbackStyle === "node") {
    args.push(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  } else if (opts.callbackStyle === "object" && opts.successName && opts.errorName) {
    var obj = {};
    obj[opts.successName] = resolve;
    obj[opts.errorName] = reject;
    args.push(obj);
  } else if (typeof opts.successIndex !== "undefined" || typeof opts.errorIndex !== "undefined") {
    var setSuccessIndex = function() {
      if (opts.successIndex > args.length) {
        args[opts.successIndex] = resolve;
      } else {
        args.splice(opts.successIndex, 0, resolve);
      }
    };
    var setErrorIndex = function() {
      if (opts.errorIndex > args.length) {
        args[opts.errorIndex] = reject;
      } else {
        args.splice(opts.errorIndex, 0, reject);
      }
    };
    if (opts.successIndex > opts.errorIndex) {
      setErrorIndex();
      setSuccessIndex();
    } else {
      setSuccessIndex();
      setErrorIndex();
    }
  } else {
    args.push(resolve);
    args.push(reject);
  }
  return args;
}
function callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject) {
  if (opts === void 0) {
    opts = {};
  }
  args = setIndex(args, opts, resolve, reject);
  var availabilityCheck = checkAvailability(pluginObj, methodName);
  if (availabilityCheck === true) {
    var pluginInstance = getPlugin(pluginObj.constructor.getPluginRef());
    return pluginInstance[methodName].apply(pluginInstance, args);
  } else {
    return availabilityCheck;
  }
}
function callInstance(pluginObj, methodName, args, opts, resolve, reject) {
  if (opts === void 0) {
    opts = {};
  }
  args = setIndex(args, opts, resolve, reject);
  if (instanceAvailability(pluginObj, methodName)) {
    return pluginObj._objectInstance[methodName].apply(pluginObj._objectInstance, args);
  }
}
function getPlugin(pluginRef) {
  if (typeof window !== "undefined") {
    return get(window, pluginRef);
  }
  return null;
}
function get(element, path) {
  var paths = path.split(".");
  var obj = element;
  for (var i = 0; i < paths.length; i++) {
    if (!obj) {
      return null;
    }
    obj = obj[paths[i]];
  }
  return obj;
}
function pluginWarn(pluginName, plugin, method) {
  if (method) {
    console.warn("Native: tried calling " + pluginName + "." + method + ", but the " + pluginName + " plugin is not installed.");
  } else {
    console.warn("Native: tried accessing the " + pluginName + " plugin but it's not installed.");
  }
  if (plugin) {
    console.warn("Install the " + pluginName + " plugin: 'ionic cordova plugin add " + plugin + "'");
  }
}
function cordovaWarn(pluginName, method) {
  if (typeof process === "undefined") {
    if (method) {
      console.warn("Native: tried calling " + pluginName + "." + method + ", but Cordova is not available. Make sure to include cordova.js or run in a device/simulator");
    } else {
      console.warn("Native: tried accessing the " + pluginName + " plugin but Cordova is not available. Make sure to include cordova.js or run in a device/simulator");
    }
  }
}
var wrap = function(pluginObj, methodName, opts) {
  if (opts === void 0) {
    opts = {};
  }
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (opts.sync) {
      return callCordovaPlugin(pluginObj, methodName, args, opts);
    } else if (opts.observable) {
      return wrapObservable(pluginObj, methodName, args, opts);
    } else if (opts.eventObservable && opts.event) {
      return wrapEventObservable(opts.event, opts.element);
    } else if (opts.otherPromise) {
      return wrapOtherPromise(pluginObj, methodName, args, opts);
    } else {
      return wrapPromise(pluginObj, methodName, args, opts);
    }
  };
};
function wrapInstance(pluginObj, methodName, opts) {
  if (opts === void 0) {
    opts = {};
  }
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (opts.sync) {
      return callInstance(pluginObj, methodName, args, opts);
    } else if (opts.observable) {
      return new Observable(function(observer) {
        var pluginResult;
        if (opts.destruct) {
          pluginResult = callInstance(pluginObj, methodName, args, opts, function() {
            var args2 = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              args2[_i2] = arguments[_i2];
            }
            return observer.next(args2);
          }, function() {
            var args2 = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              args2[_i2] = arguments[_i2];
            }
            return observer.error(args2);
          });
        } else {
          pluginResult = callInstance(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
        }
        if (pluginResult && pluginResult.error) {
          observer.error(pluginResult.error);
        }
        return function() {
          try {
            if (opts.clearWithArgs) {
              return callInstance(pluginObj, opts.clearFunction, args, opts, observer.next.bind(observer), observer.error.bind(observer));
            }
            return callInstance(pluginObj, opts.clearFunction, []);
          } catch (e) {
            console.warn("Unable to clear the previous observable watch for", pluginObj.constructor.getPluginName(), methodName);
            console.warn(e);
          }
        };
      });
    } else if (opts.otherPromise) {
      return getPromise(function(resolve, reject) {
        var result;
        if (opts.destruct) {
          result = callInstance(pluginObj, methodName, args, opts, function() {
            var args2 = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              args2[_i2] = arguments[_i2];
            }
            return resolve(args2);
          }, function() {
            var args2 = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              args2[_i2] = arguments[_i2];
            }
            return reject(args2);
          });
        } else {
          result = callInstance(pluginObj, methodName, args, opts, resolve, reject);
        }
        if (result && result.then) {
          result.then(resolve, reject);
        } else {
          reject();
        }
      });
    } else {
      var pluginResult_1, rej_1;
      var p = getPromise(function(resolve, reject) {
        if (opts.destruct) {
          pluginResult_1 = callInstance(pluginObj, methodName, args, opts, function() {
            var args2 = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              args2[_i2] = arguments[_i2];
            }
            return resolve(args2);
          }, function() {
            var args2 = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              args2[_i2] = arguments[_i2];
            }
            return reject(args2);
          });
        } else {
          pluginResult_1 = callInstance(pluginObj, methodName, args, opts, resolve, reject);
        }
        rej_1 = reject;
      });
      if (pluginResult_1 && pluginResult_1.error) {
        p.catch(function() {
        });
        typeof rej_1 === "function" && rej_1(pluginResult_1.error);
      }
      return p;
    }
  };
}

// node_modules/@awesome-cordova-plugins/core/util.js
function get2(element, path) {
  var paths = path.split(".");
  var obj = element;
  for (var i = 0; i < paths.length; i++) {
    if (!obj) {
      return null;
    }
    obj = obj[paths[i]];
  }
  return obj;
}

// node_modules/@awesome-cordova-plugins/core/awesome-cordova-plugin.js
var AwesomeCordovaNativePlugin = (
  /** @class */
  function() {
    function AwesomeCordovaNativePlugin2() {
    }
    AwesomeCordovaNativePlugin2.installed = function() {
      var isAvailable = checkAvailability(this.pluginRef) === true;
      return isAvailable;
    };
    AwesomeCordovaNativePlugin2.getPlugin = function() {
      if (typeof window !== "undefined") {
        return get2(window, this.pluginRef);
      }
      return null;
    };
    AwesomeCordovaNativePlugin2.getPluginName = function() {
      var pluginName = this.pluginName;
      return pluginName;
    };
    AwesomeCordovaNativePlugin2.getPluginRef = function() {
      var pluginRef = this.pluginRef;
      return pluginRef;
    };
    AwesomeCordovaNativePlugin2.getPluginInstallName = function() {
      var plugin = this.plugin;
      return plugin;
    };
    AwesomeCordovaNativePlugin2.getSupportedPlatforms = function() {
      var platform = this.platforms;
      return platform;
    };
    AwesomeCordovaNativePlugin2.pluginName = "";
    AwesomeCordovaNativePlugin2.pluginRef = "";
    AwesomeCordovaNativePlugin2.plugin = "";
    AwesomeCordovaNativePlugin2.repo = "";
    AwesomeCordovaNativePlugin2.platforms = [];
    AwesomeCordovaNativePlugin2.install = "";
    return AwesomeCordovaNativePlugin2;
  }()
);

// node_modules/@awesome-cordova-plugins/core/decorators/cordova.js
function cordova(pluginObj, methodName, config, args) {
  return wrap(pluginObj, methodName, config).apply(this, args);
}

// node_modules/@awesome-cordova-plugins/core/decorators/cordova-instance.js
function cordovaInstance(pluginObj, methodName, config, args) {
  args = Array.from(args);
  return wrapInstance(pluginObj, methodName, config).apply(this, args);
}

// node_modules/@awesome-cordova-plugins/core/decorators/instance-property.js
function instancePropertyGet(pluginObj, key) {
  if (pluginObj._objectInstance && pluginObj._objectInstance[key]) {
    return pluginObj._objectInstance[key];
  }
  return null;
}
function instancePropertySet(pluginObj, key, value) {
  if (pluginObj._objectInstance) {
    pluginObj._objectInstance[key] = value;
  }
}

// node_modules/@awesome-cordova-plugins/core/bootstrap.js
function checkReady() {
  if (typeof process === "undefined") {
    var win_1 = typeof window !== "undefined" ? window : {};
    var DEVICE_READY_TIMEOUT_1 = 5e3;
    var before_1 = Date.now();
    var didFireReady_1 = false;
    win_1.document.addEventListener("deviceready", function() {
      console.log("Ionic Native: deviceready event fired after " + (Date.now() - before_1) + " ms");
      didFireReady_1 = true;
    });
    setTimeout(function() {
      if (!didFireReady_1 && win_1.cordova) {
        console.warn("Ionic Native: deviceready did not fire within " + DEVICE_READY_TIMEOUT_1 + "ms. This can happen when plugins are in an inconsistent state. Try removing plugins from plugins/ and reinstalling them.");
      }
    }, DEVICE_READY_TIMEOUT_1);
  }
}

// node_modules/@awesome-cordova-plugins/core/index.js
checkReady();

export {
  checkAvailability,
  AwesomeCordovaNativePlugin,
  cordova,
  cordovaInstance,
  instancePropertyGet,
  instancePropertySet
};
//# sourceMappingURL=chunk-6WUVWKFX.js.map
