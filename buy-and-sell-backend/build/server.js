"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _hapi = _interopRequireDefault(require("@hapi/hapi"));
var _inert = _interopRequireDefault(require("@hapi/inert"));
var _routes = _interopRequireDefault(require("./routes"));
var _database = require("./database");
var admin = _interopRequireWildcard(require("firebase-admin"));
var _credentials = _interopRequireDefault(require("../credentials.json"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
_dotenv["default"].config();
// Inicialización de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(_credentials["default"])
});

// Función principal para iniciar el servidor
var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var server;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Crear instancia del servidor Hapi
          server = _hapi["default"].server({
            port: 8080,
            host: '0.0.0.0'
          });
          _context2.next = 4;
          return server.register(_inert["default"]);
        case 4:
          // Registrar rutas
          _routes["default"].forEach(function (route) {
            return server.route(route);
          });

          // Conexión a la base de datos
          _context2.next = 7;
          return _database.db.connect();
        case 7:
          _context2.next = 9;
          return server.start();
        case 9:
          console.log("Server is listening on ".concat(server.info.uri));

          // Manejo de señales para detener el servidor
          process.on('SIGINT', /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  console.log('Stopping server...');
                  _context.next = 3;
                  return server.stop({
                    timeout: 10000
                  });
                case 3:
                  _context.next = 5;
                  return _database.db.end();
                case 5:
                  console.log('Server stopped');
                  process.exit(0);
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
          _context2.next = 17;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error('Error starting server:', _context2.t0);
          process.exit(1);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

// Llamada para iniciar el servidor
startServer();