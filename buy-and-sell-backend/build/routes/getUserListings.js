"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserListingsRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var admin = _interopRequireWildcard(require("firebase-admin"));
var _database = require("../database");
var _boom = _interopRequireDefault(require("@hapi/boom"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var getUserListingsRoute = exports.getUserListingsRoute = {
  method: 'GET',
  path: '/api/users/{userId}/listings',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, userId, _yield$db$query, results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.authtoken;
            _context.next = 3;
            return admin.auth().verifyIdToken(token);
          case 3:
            user = _context.sent;
            userId = req.params.userId;
            if (!(user.user_id !== userId)) {
              _context.next = 7;
              break;
            }
            throw _boom["default"].unauthorized('Users can only access their own listings!');
          case 7:
            _context.next = 9;
            return _database.db.query('SELECT * FROM listings WHERE user_id=?', [userId]);
          case 9:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            return _context.abrupt("return", results);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }
    return handler;
  }()
};