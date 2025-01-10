"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewListingRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uuid = require("uuid");
var admin = _interopRequireWildcard(require("firebase-admin"));
var _database = require("../database");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var createNewListingRoute = exports.createNewListingRoute = {
  method: 'POST',
  path: '/api/listings',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, userId, id, _req$payload, _req$payload$name, name, _req$payload$descript, description, _req$payload$price, price, views;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.authtoken;
            _context.next = 3;
            return admin.auth().verifyIdToken(token);
          case 3:
            user = _context.sent;
            userId = user.user_id;
            id = (0, _uuid.v4)();
            _req$payload = req.payload, _req$payload$name = _req$payload.name, name = _req$payload$name === void 0 ? '' : _req$payload$name, _req$payload$descript = _req$payload.description, description = _req$payload$descript === void 0 ? '' : _req$payload$descript, _req$payload$price = _req$payload.price, price = _req$payload$price === void 0 ? 0 : _req$payload$price;
            views = 0;
            _context.next = 10;
            return _database.db.query("\n            INSERT INTO listings (id, name, description, price, user_id, views)\n              VALUES (?, ?, ?, ?, ?, ?);\n        ", [id, name, description, price, userId, views]);
          case 10:
            return _context.abrupt("return", {
              id: id,
              name: name,
              description: description,
              price: price,
              user_id: userId,
              views: views
            });
          case 11:
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