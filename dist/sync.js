"use strict";
var Q0 = Object.create;
var io = Object.defineProperty;
var ex = Object.getOwnPropertyDescriptor;
var tx = Object.getOwnPropertyNames;
var rx = Object.getPrototypeOf,
  nx = Object.prototype.hasOwnProperty;
var ix = (e, t) => () => (e && (t = e((e = 0))), t);
var T = (e, t) => () => (t || e((t = {exports: {}}).exports, t), t.exports),
  lt = (e, t) => {
    for (var r in t) io(e, r, {get: t[r], enumerable: !0});
  },
  no = (e, t, r, i) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of tx(t))
        !nx.call(e, n) &&
          n !== r &&
          io(e, n, {get: () => t[n], enumerable: !(i = ex(t, n)) || i.enumerable});
    return e;
  },
  z = (e, t, r) => (no(e, t, "default"), r && no(r, t, "default")),
  We = (e, t, r) => (
    (r = e != null ? Q0(rx(e)) : {}),
    no(t || !e || !e.__esModule ? io(r, "default", {value: e, enumerable: !0}) : r, e)
  ),
  ht = (e) => no(io({}, "__esModule", {value: !0}), e);
var rm = T((QP, ox) => {
  ox.exports = {
    name: "dotenv",
    version: "17.2.3",
    description: "Loads environment variables from .env file",
    main: "lib/main.js",
    types: "lib/main.d.ts",
    exports: {
      ".": {
        types: "./lib/main.d.ts",
        require: "./lib/main.js",
        default: "./lib/main.js",
      },
      "./config": "./config.js",
      "./config.js": "./config.js",
      "./lib/env-options": "./lib/env-options.js",
      "./lib/env-options.js": "./lib/env-options.js",
      "./lib/cli-options": "./lib/cli-options.js",
      "./lib/cli-options.js": "./lib/cli-options.js",
      "./package.json": "./package.json",
    },
    scripts: {
      "dts-check": "tsc --project tests/types/tsconfig.json",
      lint: "standard",
      pretest: "npm run lint && npm run dts-check",
      test: "tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000",
      "test:coverage":
        "tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
      prerelease: "npm test",
      release: "standard-version",
    },
    repository: {type: "git", url: "git://github.com/motdotla/dotenv.git"},
    homepage: "https://github.com/motdotla/dotenv#readme",
    funding: "https://dotenvx.com",
    keywords: [
      "dotenv",
      "env",
      ".env",
      "environment",
      "variables",
      "config",
      "settings",
    ],
    readmeFilename: "README.md",
    license: "BSD-2-Clause",
    devDependencies: {
      "@types/node": "^18.11.3",
      decache: "^4.6.2",
      sinon: "^14.0.1",
      standard: "^17.0.0",
      "standard-version": "^9.5.0",
      tap: "^19.2.0",
      typescript: "^4.8.4",
    },
    engines: {node: ">=12"},
    browser: {fs: !1},
  };
});
var nc = T((eN, jt) => {
  var tc = require("fs"),
    oo = require("path"),
    sx = require("os"),
    ax = require("crypto"),
    cx = rm(),
    rc = cx.version,
    nm = [
      "\u{1F510} encrypt with Dotenvx: https://dotenvx.com",
      "\u{1F510} prevent committing .env to code: https://dotenvx.com/precommit",
      "\u{1F510} prevent building .env in docker: https://dotenvx.com/prebuild",
      "\u{1F4E1} add observability to secrets: https://dotenvx.com/ops",
      "\u{1F465} sync secrets across teammates & machines: https://dotenvx.com/ops",
      "\u{1F5C2}\uFE0F backup and recover secrets: https://dotenvx.com/ops",
      "\u2705 audit secrets and track compliance: https://dotenvx.com/ops",
      "\u{1F504} add secrets lifecycle management: https://dotenvx.com/ops",
      "\u{1F511} add access controls to secrets: https://dotenvx.com/ops",
      "\u{1F6E0}\uFE0F  run anywhere with `dotenvx run -- yourcommand`",
      "\u2699\uFE0F  specify custom .env file path with { path: '/custom/path/.env' }",
      "\u2699\uFE0F  enable debug logging with { debug: true }",
      "\u2699\uFE0F  override existing env vars with { override: true }",
      "\u2699\uFE0F  suppress all logs with { quiet: true }",
      "\u2699\uFE0F  write to custom object with { processEnv: myObject }",
      "\u2699\uFE0F  load multiple .env files with { path: ['.env.local', '.env'] }",
    ];
  function ux() {
    return nm[Math.floor(Math.random() * nm.length)];
  }
  function jr(e) {
    return typeof e == "string"
      ? !["false", "0", "no", "off", ""].includes(e.toLowerCase())
      : !!e;
  }
  function lx() {
    return process.stdout.isTTY;
  }
  function hx(e) {
    return lx() ? `\x1B[2m${e}\x1B[0m` : e;
  }
  var dx =
    /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;
  function fx(e) {
    let t = {},
      r = e.toString();
    r = r.replace(
      /\r\n?/gm,
      `
`,
    );
    let i;
    for (; (i = dx.exec(r)) != null; ) {
      let n = i[1],
        o = i[2] || "";
      o = o.trim();
      let s = o[0];
      (o = o.replace(/^(['"`])([\s\S]*)\1$/gm, "$2")),
        s === '"' &&
          ((o = o.replace(
            /\\n/g,
            `
`,
          )),
          (o = o.replace(/\\r/g, "\r"))),
        (t[n] = o);
    }
    return t;
  }
  function px(e) {
    e = e || {};
    let t = am(e);
    e.path = t;
    let r = ye.configDotenv(e);
    if (!r.parsed) {
      let s = new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);
      throw ((s.code = "MISSING_DATA"), s);
    }
    let i = sm(e).split(","),
      n = i.length,
      o;
    for (let s = 0; s < n; s++)
      try {
        let a = i[s].trim(),
          c = gx(r, a);
        o = ye.decrypt(c.ciphertext, c.key);
        break;
      } catch (a) {
        if (s + 1 >= n) throw a;
      }
    return ye.parse(o);
  }
  function mx(e) {
    console.error(`[dotenv@${rc}][WARN] ${e}`);
  }
  function Ln(e) {
    console.log(`[dotenv@${rc}][DEBUG] ${e}`);
  }
  function om(e) {
    console.log(`[dotenv@${rc}] ${e}`);
  }
  function sm(e) {
    return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0
      ? e.DOTENV_KEY
      : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0
        ? process.env.DOTENV_KEY
        : "";
  }
  function gx(e, t) {
    let r;
    try {
      r = new URL(t);
    } catch (a) {
      if (a.code === "ERR_INVALID_URL") {
        let c = new Error(
          "INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development",
        );
        throw ((c.code = "INVALID_DOTENV_KEY"), c);
      }
      throw a;
    }
    let i = r.password;
    if (!i) {
      let a = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw ((a.code = "INVALID_DOTENV_KEY"), a);
    }
    let n = r.searchParams.get("environment");
    if (!n) {
      let a = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw ((a.code = "INVALID_DOTENV_KEY"), a);
    }
    let o = `DOTENV_VAULT_${n.toUpperCase()}`,
      s = e.parsed[o];
    if (!s) {
      let a = new Error(
        `NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${o} in your .env.vault file.`,
      );
      throw ((a.code = "NOT_FOUND_DOTENV_ENVIRONMENT"), a);
    }
    return {ciphertext: s, key: i};
  }
  function am(e) {
    let t = null;
    if (e && e.path && e.path.length > 0)
      if (Array.isArray(e.path))
        for (let r of e.path)
          tc.existsSync(r) && (t = r.endsWith(".vault") ? r : `${r}.vault`);
      else t = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
    else t = oo.resolve(process.cwd(), ".env.vault");
    return tc.existsSync(t) ? t : null;
  }
  function im(e) {
    return e[0] === "~" ? oo.join(sx.homedir(), e.slice(1)) : e;
  }
  function vx(e) {
    let t = jr(process.env.DOTENV_CONFIG_DEBUG || (e && e.debug)),
      r = jr(process.env.DOTENV_CONFIG_QUIET || (e && e.quiet));
    (t || !r) && om("Loading env from encrypted .env.vault");
    let i = ye._parseVault(e),
      n = process.env;
    return (
      e && e.processEnv != null && (n = e.processEnv), ye.populate(n, i, e), {parsed: i}
    );
  }
  function _x(e) {
    let t = oo.resolve(process.cwd(), ".env"),
      r = "utf8",
      i = process.env;
    e && e.processEnv != null && (i = e.processEnv);
    let n = jr(i.DOTENV_CONFIG_DEBUG || (e && e.debug)),
      o = jr(i.DOTENV_CONFIG_QUIET || (e && e.quiet));
    e && e.encoding
      ? (r = e.encoding)
      : n && Ln("No encoding is specified. UTF-8 is used by default");
    let s = [t];
    if (e && e.path)
      if (!Array.isArray(e.path)) s = [im(e.path)];
      else {
        s = [];
        for (let l of e.path) s.push(im(l));
      }
    let a,
      c = {};
    for (let l of s)
      try {
        let h = ye.parse(tc.readFileSync(l, {encoding: r}));
        ye.populate(c, h, e);
      } catch (h) {
        n && Ln(`Failed to load ${l} ${h.message}`), (a = h);
      }
    let u = ye.populate(i, c, e);
    if (
      ((n = jr(i.DOTENV_CONFIG_DEBUG || n)),
      (o = jr(i.DOTENV_CONFIG_QUIET || o)),
      n || !o)
    ) {
      let l = Object.keys(u).length,
        h = [];
      for (let f of s)
        try {
          let d = oo.relative(process.cwd(), f);
          h.push(d);
        } catch (d) {
          n && Ln(`Failed to load ${f} ${d.message}`), (a = d);
        }
      om(`injecting env (${l}) from ${h.join(",")} ${hx(`-- tip: ${ux()}`)}`);
    }
    return a ? {parsed: c, error: a} : {parsed: c};
  }
  function yx(e) {
    if (sm(e).length === 0) return ye.configDotenv(e);
    let t = am(e);
    return t
      ? ye._configVault(e)
      : (mx(
          `You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`,
        ),
        ye.configDotenv(e));
  }
  function bx(e, t) {
    let r = Buffer.from(t.slice(-64), "hex"),
      i = Buffer.from(e, "base64"),
      n = i.subarray(0, 12),
      o = i.subarray(-16);
    i = i.subarray(12, -16);
    try {
      let s = ax.createDecipheriv("aes-256-gcm", r, n);
      return s.setAuthTag(o), `${s.update(i)}${s.final()}`;
    } catch (s) {
      let a = s instanceof RangeError,
        c = s.message === "Invalid key length",
        u = s.message === "Unsupported state or unable to authenticate data";
      if (a || c) {
        let l = new Error(
          "INVALID_DOTENV_KEY: It must be 64 characters long (or more)",
        );
        throw ((l.code = "INVALID_DOTENV_KEY"), l);
      } else if (u) {
        let l = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw ((l.code = "DECRYPTION_FAILED"), l);
      } else throw s;
    }
  }
  function wx(e, t, r = {}) {
    let i = !!(r && r.debug),
      n = !!(r && r.override),
      o = {};
    if (typeof t != "object") {
      let s = new Error(
        "OBJECT_REQUIRED: Please check the processEnv argument being passed to populate",
      );
      throw ((s.code = "OBJECT_REQUIRED"), s);
    }
    for (let s of Object.keys(t))
      Object.prototype.hasOwnProperty.call(e, s)
        ? (n === !0 && ((e[s] = t[s]), (o[s] = t[s])),
          i &&
            Ln(
              n === !0
                ? `"${s}" is already defined and WAS overwritten`
                : `"${s}" is already defined and was NOT overwritten`,
            ))
        : ((e[s] = t[s]), (o[s] = t[s]));
    return o;
  }
  var ye = {
    configDotenv: _x,
    _configVault: vx,
    _parseVault: px,
    config: yx,
    decrypt: bx,
    parse: fx,
    populate: wx,
  };
  jt.exports.configDotenv = ye.configDotenv;
  jt.exports._configVault = ye._configVault;
  jt.exports._parseVault = ye._parseVault;
  jt.exports.config = ye.config;
  jt.exports.decrypt = ye.decrypt;
  jt.exports.parse = ye.parse;
  jt.exports.populate = ye.populate;
  jt.exports = ye;
});
var ti = T((rR, tg) => {
  var JS = Object.prototype.toString;
  tg.exports = function (t) {
    if (t === void 0) return "undefined";
    if (t === null) return "null";
    var r = typeof t;
    if (r === "boolean") return "boolean";
    if (r === "string") return "string";
    if (r === "number") return "number";
    if (r === "symbol") return "symbol";
    if (r === "function") return XS(t) ? "generatorfunction" : "function";
    if (KS(t)) return "array";
    if (t$(t)) return "buffer";
    if (e$(t)) return "arguments";
    if (HS(t)) return "date";
    if (GS(t)) return "error";
    if (YS(t)) return "regexp";
    switch (eg(t)) {
      case "Symbol":
        return "symbol";
      case "Promise":
        return "promise";
      case "WeakMap":
        return "weakmap";
      case "WeakSet":
        return "weakset";
      case "Map":
        return "map";
      case "Set":
        return "set";
      case "Int8Array":
        return "int8array";
      case "Uint8Array":
        return "uint8array";
      case "Uint8ClampedArray":
        return "uint8clampedarray";
      case "Int16Array":
        return "int16array";
      case "Uint16Array":
        return "uint16array";
      case "Int32Array":
        return "int32array";
      case "Uint32Array":
        return "uint32array";
      case "Float32Array":
        return "float32array";
      case "Float64Array":
        return "float64array";
    }
    if (QS(t)) return "generator";
    switch (((r = JS.call(t)), r)) {
      case "[object Object]":
        return "object";
      case "[object Map Iterator]":
        return "mapiterator";
      case "[object Set Iterator]":
        return "setiterator";
      case "[object String Iterator]":
        return "stringiterator";
      case "[object Array Iterator]":
        return "arrayiterator";
    }
    return r.slice(8, -1).toLowerCase().replace(/\s/g, "");
  };
  function eg(e) {
    return typeof e.constructor == "function" ? e.constructor.name : null;
  }
  function KS(e) {
    return Array.isArray ? Array.isArray(e) : e instanceof Array;
  }
  function GS(e) {
    return (
      e instanceof Error ||
      (typeof e.message == "string" &&
        e.constructor &&
        typeof e.constructor.stackTraceLimit == "number")
    );
  }
  function HS(e) {
    return e instanceof Date
      ? !0
      : typeof e.toDateString == "function" &&
          typeof e.getDate == "function" &&
          typeof e.setDate == "function";
  }
  function YS(e) {
    return e instanceof RegExp
      ? !0
      : typeof e.flags == "string" &&
          typeof e.ignoreCase == "boolean" &&
          typeof e.multiline == "boolean" &&
          typeof e.global == "boolean";
  }
  function XS(e, t) {
    return eg(e) === "GeneratorFunction";
  }
  function QS(e) {
    return (
      typeof e.throw == "function" &&
      typeof e.return == "function" &&
      typeof e.next == "function"
    );
  }
  function e$(e) {
    try {
      if (typeof e.length == "number" && typeof e.callee == "function") return !0;
    } catch (t) {
      if (t.message.indexOf("callee") !== -1) return !0;
    }
    return !1;
  }
  function t$(e) {
    return e.constructor && typeof e.constructor.isBuffer == "function"
      ? e.constructor.isBuffer(e)
      : !1;
  }
});
var ng = T((nR, rg) => {
  "use strict";
  rg.exports = function (t) {
    return (
      typeof t < "u" && t !== null && (typeof t == "object" || typeof t == "function")
    );
  };
});
var sg = T((iR, og) => {
  "use strict";
  var ig = ng();
  og.exports = function (t) {
    ig(t) || (t = {});
    for (var r = arguments.length, i = 1; i < r; i++) {
      var n = arguments[i];
      ig(n) && r$(t, n);
    }
    return t;
  };
  function r$(e, t) {
    for (var r in t) n$(t, r) && (e[r] = t[r]);
  }
  function n$(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
});
var ug = T((oR, cg) => {
  "use strict";
  var i$ = ti(),
    o$ = sg();
  cg.exports = function (e, t) {
    typeof t == "function" && (t = {parse: t});
    var r = a$(e),
      i = {section_delimiter: "---", parse: u$},
      n = o$({}, i, t),
      o = n.section_delimiter,
      s = r.content.split(/\r?\n/),
      a = null,
      c = ag(),
      u = [],
      l = [];
    function h(w) {
      (r.content = w), (a = []), (u = []);
    }
    function f(w) {
      l.length &&
        ((c.key = c$(l[0], o)),
        (c.content = w),
        n.parse(c, a),
        a.push(c),
        (c = ag()),
        (u = []),
        (l = []));
    }
    for (var d = 0; d < s.length; d++) {
      var p = s[d],
        m = l.length,
        v = p.trim();
      if (s$(v, o)) {
        if (v.length === 3 && d !== 0) {
          if (m === 0 || m === 2) {
            u.push(p);
            continue;
          }
          l.push(v),
            (c.data = u.join(`
`)),
            (u = []);
          continue;
        }
        a === null &&
          h(
            u.join(`
`),
          ),
          m === 2 &&
            f(
              u.join(`
`),
            ),
          l.push(v);
        continue;
      }
      u.push(p);
    }
    return (
      a === null
        ? h(
            u.join(`
`),
          )
        : f(
            u.join(`
`),
          ),
      (r.sections = a),
      r
    );
  };
  function s$(e, t) {
    return !(e.slice(0, t.length) !== t || e.charAt(t.length + 1) === t.slice(-1));
  }
  function a$(e) {
    if (
      (i$(e) !== "object" && (e = {content: e}),
      typeof e.content != "string" && !l$(e.content))
    )
      throw new TypeError("expected a buffer or string");
    return (e.content = e.content.toString()), (e.sections = []), e;
  }
  function c$(e, t) {
    return e ? e.slice(t.length).trim() : "";
  }
  function ag() {
    return {key: "", data: "", content: ""};
  }
  function u$(e) {
    return e;
  }
  function l$(e) {
    return e && e.constructor && typeof e.constructor.isBuffer == "function"
      ? e.constructor.isBuffer(e)
      : !1;
  }
});
var dr = T((sR, hr) => {
  "use strict";
  function lg(e) {
    return typeof e > "u" || e === null;
  }
  function h$(e) {
    return typeof e == "object" && e !== null;
  }
  function d$(e) {
    return Array.isArray(e) ? e : lg(e) ? [] : [e];
  }
  function f$(e, t) {
    var r, i, n, o;
    if (t)
      for (o = Object.keys(t), r = 0, i = o.length; r < i; r += 1)
        (n = o[r]), (e[n] = t[n]);
    return e;
  }
  function p$(e, t) {
    var r = "",
      i;
    for (i = 0; i < t; i += 1) r += e;
    return r;
  }
  function m$(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  hr.exports.isNothing = lg;
  hr.exports.isObject = h$;
  hr.exports.toArray = d$;
  hr.exports.repeat = p$;
  hr.exports.isNegativeZero = m$;
  hr.exports.extend = f$;
});
var Br = T((aR, hg) => {
  "use strict";
  function ri(e, t) {
    Error.call(this),
      (this.name = "YAMLException"),
      (this.reason = e),
      (this.mark = t),
      (this.message =
        (this.reason || "(unknown reason)") +
        (this.mark ? " " + this.mark.toString() : "")),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack || "");
  }
  ri.prototype = Object.create(Error.prototype);
  ri.prototype.constructor = ri;
  ri.prototype.toString = function (t) {
    var r = this.name + ": ";
    return (
      (r += this.reason || "(unknown reason)"),
      !t && this.mark && (r += " " + this.mark.toString()),
      r
    );
  };
  hg.exports = ri;
});
var pg = T((cR, fg) => {
  "use strict";
  var dg = dr();
  function $c(e, t, r, i, n) {
    (this.name = e),
      (this.buffer = t),
      (this.position = r),
      (this.line = i),
      (this.column = n);
  }
  $c.prototype.getSnippet = function (t, r) {
    var i, n, o, s, a;
    if (!this.buffer) return null;
    for (
      t = t || 4, r = r || 75, i = "", n = this.position;
      n > 0 &&
      `\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(n - 1)) === -1;
    )
      if (((n -= 1), this.position - n > r / 2 - 1)) {
        (i = " ... "), (n += 5);
        break;
      }
    for (
      o = "", s = this.position;
      s < this.buffer.length &&
      `\0\r
\x85\u2028\u2029`.indexOf(this.buffer.charAt(s)) === -1;
    )
      if (((s += 1), s - this.position > r / 2 - 1)) {
        (o = " ... "), (s -= 5);
        break;
      }
    return (
      (a = this.buffer.slice(n, s)),
      dg.repeat(" ", t) +
        i +
        a +
        o +
        `
` +
        dg.repeat(" ", t + this.position - n + i.length) +
        "^"
    );
  };
  $c.prototype.toString = function (t) {
    var r,
      i = "";
    return (
      this.name && (i += 'in "' + this.name + '" '),
      (i += "at line " + (this.line + 1) + ", column " + (this.column + 1)),
      t ||
        ((r = this.getSnippet()),
        r &&
          (i +=
            `:
` + r)),
      i
    );
  };
  fg.exports = $c;
});
var be = T((uR, gg) => {
  "use strict";
  var mg = Br(),
    g$ = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases",
    ],
    v$ = ["scalar", "sequence", "mapping"];
  function _$(e) {
    var t = {};
    return (
      e !== null &&
        Object.keys(e).forEach(function (r) {
          e[r].forEach(function (i) {
            t[String(i)] = r;
          });
        }),
      t
    );
  }
  function y$(e, t) {
    if (
      ((t = t || {}),
      Object.keys(t).forEach(function (r) {
        if (g$.indexOf(r) === -1)
          throw new mg(
            'Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.',
          );
      }),
      (this.tag = e),
      (this.kind = t.kind || null),
      (this.resolve =
        t.resolve ||
        function () {
          return !0;
        }),
      (this.construct =
        t.construct ||
        function (r) {
          return r;
        }),
      (this.instanceOf = t.instanceOf || null),
      (this.predicate = t.predicate || null),
      (this.represent = t.represent || null),
      (this.defaultStyle = t.defaultStyle || null),
      (this.styleAliases = _$(t.styleAliases || null)),
      v$.indexOf(this.kind) === -1)
    )
      throw new mg(
        'Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.',
      );
  }
  gg.exports = y$;
});
var fr = T((lR, _g) => {
  "use strict";
  var vg = dr(),
    Ao = Br(),
    b$ = be();
  function Ec(e, t, r) {
    var i = [];
    return (
      e.include.forEach(function (n) {
        r = Ec(n, t, r);
      }),
      e[t].forEach(function (n) {
        r.forEach(function (o, s) {
          o.tag === n.tag && o.kind === n.kind && i.push(s);
        }),
          r.push(n);
      }),
      r.filter(function (n, o) {
        return i.indexOf(o) === -1;
      })
    );
  }
  function w$() {
    var e = {scalar: {}, sequence: {}, mapping: {}, fallback: {}},
      t,
      r;
    function i(n) {
      e[n.kind][n.tag] = e.fallback[n.tag] = n;
    }
    for (t = 0, r = arguments.length; t < r; t += 1) arguments[t].forEach(i);
    return e;
  }
  function Zr(e) {
    (this.include = e.include || []),
      (this.implicit = e.implicit || []),
      (this.explicit = e.explicit || []),
      this.implicit.forEach(function (t) {
        if (t.loadKind && t.loadKind !== "scalar")
          throw new Ao(
            "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.",
          );
      }),
      (this.compiledImplicit = Ec(this, "implicit", [])),
      (this.compiledExplicit = Ec(this, "explicit", [])),
      (this.compiledTypeMap = w$(this.compiledImplicit, this.compiledExplicit));
  }
  Zr.DEFAULT = null;
  Zr.create = function () {
    var t, r;
    switch (arguments.length) {
      case 1:
        (t = Zr.DEFAULT), (r = arguments[0]);
        break;
      case 2:
        (t = arguments[0]), (r = arguments[1]);
        break;
      default:
        throw new Ao("Wrong number of arguments for Schema.create function");
    }
    if (
      ((t = vg.toArray(t)),
      (r = vg.toArray(r)),
      !t.every(function (i) {
        return i instanceof Zr;
      }))
    )
      throw new Ao(
        "Specified list of super schemas (or a single Schema object) contains a non-Schema object.",
      );
    if (
      !r.every(function (i) {
        return i instanceof b$;
      })
    )
      throw new Ao(
        "Specified list of YAML types (or a single Type object) contains a non-Type object.",
      );
    return new Zr({include: t, explicit: r});
  };
  _g.exports = Zr;
});
var bg = T((hR, yg) => {
  "use strict";
  var x$ = be();
  yg.exports = new x$("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function (e) {
      return e !== null ? e : "";
    },
  });
});
var xg = T((dR, wg) => {
  "use strict";
  var S$ = be();
  wg.exports = new S$("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function (e) {
      return e !== null ? e : [];
    },
  });
});
var $g = T((fR, Sg) => {
  "use strict";
  var $$ = be();
  Sg.exports = new $$("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function (e) {
      return e !== null ? e : {};
    },
  });
});
var Io = T((pR, Eg) => {
  "use strict";
  var E$ = fr();
  Eg.exports = new E$({explicit: [bg(), xg(), $g()]});
});
var Ag = T((mR, kg) => {
  "use strict";
  var k$ = be();
  function A$(e) {
    if (e === null) return !0;
    var t = e.length;
    return (
      (t === 1 && e === "~") ||
      (t === 4 && (e === "null" || e === "Null" || e === "NULL"))
    );
  }
  function I$() {
    return null;
  }
  function O$(e) {
    return e === null;
  }
  kg.exports = new k$("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: A$,
    construct: I$,
    predicate: O$,
    represent: {
      canonical: function () {
        return "~";
      },
      lowercase: function () {
        return "null";
      },
      uppercase: function () {
        return "NULL";
      },
      camelcase: function () {
        return "Null";
      },
    },
    defaultStyle: "lowercase",
  });
});
var Og = T((gR, Ig) => {
  "use strict";
  var T$ = be();
  function j$(e) {
    if (e === null) return !1;
    var t = e.length;
    return (
      (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
      (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
    );
  }
  function P$(e) {
    return e === "true" || e === "True" || e === "TRUE";
  }
  function N$(e) {
    return Object.prototype.toString.call(e) === "[object Boolean]";
  }
  Ig.exports = new T$("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: j$,
    construct: P$,
    predicate: N$,
    represent: {
      lowercase: function (e) {
        return e ? "true" : "false";
      },
      uppercase: function (e) {
        return e ? "TRUE" : "FALSE";
      },
      camelcase: function (e) {
        return e ? "True" : "False";
      },
    },
    defaultStyle: "lowercase",
  });
});
var jg = T((vR, Tg) => {
  "use strict";
  var R$ = dr(),
    C$ = be();
  function z$(e) {
    return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
  }
  function U$(e) {
    return 48 <= e && e <= 55;
  }
  function D$(e) {
    return 48 <= e && e <= 57;
  }
  function L$(e) {
    if (e === null) return !1;
    var t = e.length,
      r = 0,
      i = !1,
      n;
    if (!t) return !1;
    if (((n = e[r]), (n === "-" || n === "+") && (n = e[++r]), n === "0")) {
      if (r + 1 === t) return !0;
      if (((n = e[++r]), n === "b")) {
        for (r++; r < t; r++)
          if (((n = e[r]), n !== "_")) {
            if (n !== "0" && n !== "1") return !1;
            i = !0;
          }
        return i && n !== "_";
      }
      if (n === "x") {
        for (r++; r < t; r++)
          if (((n = e[r]), n !== "_")) {
            if (!z$(e.charCodeAt(r))) return !1;
            i = !0;
          }
        return i && n !== "_";
      }
      for (; r < t; r++)
        if (((n = e[r]), n !== "_")) {
          if (!U$(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && n !== "_";
    }
    if (n === "_") return !1;
    for (; r < t; r++)
      if (((n = e[r]), n !== "_")) {
        if (n === ":") break;
        if (!D$(e.charCodeAt(r))) return !1;
        i = !0;
      }
    return !i || n === "_" ? !1 : n !== ":" ? !0 : /^(:[0-5]?[0-9])+$/.test(e.slice(r));
  }
  function F$(e) {
    var t = e,
      r = 1,
      i,
      n,
      o = [];
    return (
      t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")),
      (i = t[0]),
      (i === "-" || i === "+") && (i === "-" && (r = -1), (t = t.slice(1)), (i = t[0])),
      t === "0"
        ? 0
        : i === "0"
          ? t[1] === "b"
            ? r * parseInt(t.slice(2), 2)
            : t[1] === "x"
              ? r * parseInt(t, 16)
              : r * parseInt(t, 8)
          : t.indexOf(":") !== -1
            ? (t.split(":").forEach(function (s) {
                o.unshift(parseInt(s, 10));
              }),
              (t = 0),
              (n = 1),
              o.forEach(function (s) {
                (t += s * n), (n *= 60);
              }),
              r * t)
            : r * parseInt(t, 10)
    );
  }
  function M$(e) {
    return (
      Object.prototype.toString.call(e) === "[object Number]" &&
      e % 1 === 0 &&
      !R$.isNegativeZero(e)
    );
  }
  Tg.exports = new C$("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: L$,
    construct: F$,
    predicate: M$,
    represent: {
      binary: function (e) {
        return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
      },
      octal: function (e) {
        return e >= 0 ? "0" + e.toString(8) : "-0" + e.toString(8).slice(1);
      },
      decimal: function (e) {
        return e.toString(10);
      },
      hexadecimal: function (e) {
        return e >= 0
          ? "0x" + e.toString(16).toUpperCase()
          : "-0x" + e.toString(16).toUpperCase().slice(1);
      },
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"],
    },
  });
});
var Rg = T((_R, Ng) => {
  "use strict";
  var Pg = dr(),
    B$ = be(),
    Z$ = new RegExp(
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$",
    );
  function q$(e) {
    return !(e === null || !Z$.test(e) || e[e.length - 1] === "_");
  }
  function V$(e) {
    var t, r, i, n;
    return (
      (t = e.replace(/_/g, "").toLowerCase()),
      (r = t[0] === "-" ? -1 : 1),
      (n = []),
      "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)),
      t === ".inf"
        ? r === 1
          ? Number.POSITIVE_INFINITY
          : Number.NEGATIVE_INFINITY
        : t === ".nan"
          ? NaN
          : t.indexOf(":") >= 0
            ? (t.split(":").forEach(function (o) {
                n.unshift(parseFloat(o, 10));
              }),
              (t = 0),
              (i = 1),
              n.forEach(function (o) {
                (t += o * i), (i *= 60);
              }),
              r * t)
            : r * parseFloat(t, 10)
    );
  }
  var W$ = /^[-+]?[0-9]+e/;
  function J$(e, t) {
    var r;
    if (isNaN(e))
      switch (t) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === e)
      switch (t) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === e)
      switch (t) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (Pg.isNegativeZero(e)) return "-0.0";
    return (r = e.toString(10)), W$.test(r) ? r.replace("e", ".e") : r;
  }
  function K$(e) {
    return (
      Object.prototype.toString.call(e) === "[object Number]" &&
      (e % 1 !== 0 || Pg.isNegativeZero(e))
    );
  }
  Ng.exports = new B$("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: q$,
    construct: V$,
    predicate: K$,
    represent: J$,
    defaultStyle: "lowercase",
  });
});
var kc = T((yR, Cg) => {
  "use strict";
  var G$ = fr();
  Cg.exports = new G$({include: [Io()], implicit: [Ag(), Og(), jg(), Rg()]});
});
var Ac = T((bR, zg) => {
  "use strict";
  var H$ = fr();
  zg.exports = new H$({include: [kc()]});
});
var Fg = T((wR, Lg) => {
  "use strict";
  var Y$ = be(),
    Ug = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
    Dg = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$",
    );
  function X$(e) {
    return e === null ? !1 : Ug.exec(e) !== null || Dg.exec(e) !== null;
  }
  function Q$(e) {
    var t,
      r,
      i,
      n,
      o,
      s,
      a,
      c = 0,
      u = null,
      l,
      h,
      f;
    if (((t = Ug.exec(e)), t === null && (t = Dg.exec(e)), t === null))
      throw new Error("Date resolve error");
    if (((r = +t[1]), (i = +t[2] - 1), (n = +t[3]), !t[4]))
      return new Date(Date.UTC(r, i, n));
    if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
      for (c = t[7].slice(0, 3); c.length < 3; ) c += "0";
      c = +c;
    }
    return (
      t[9] &&
        ((l = +t[10]),
        (h = +(t[11] || 0)),
        (u = (l * 60 + h) * 6e4),
        t[9] === "-" && (u = -u)),
      (f = new Date(Date.UTC(r, i, n, o, s, a, c))),
      u && f.setTime(f.getTime() - u),
      f
    );
  }
  function eE(e) {
    return e.toISOString();
  }
  Lg.exports = new Y$("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: X$,
    construct: Q$,
    instanceOf: Date,
    represent: eE,
  });
});
var Bg = T((xR, Mg) => {
  "use strict";
  var tE = be();
  function rE(e) {
    return e === "<<" || e === null;
  }
  Mg.exports = new tE("tag:yaml.org,2002:merge", {kind: "scalar", resolve: rE});
});
var Vg = T((SR, qg) => {
  "use strict";
  var pr;
  try {
    (Zg = require), (pr = Zg("buffer").Buffer);
  } catch {}
  var Zg,
    nE = be(),
    Ic = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function iE(e) {
    if (e === null) return !1;
    var t,
      r,
      i = 0,
      n = e.length,
      o = Ic;
    for (r = 0; r < n; r++)
      if (((t = o.indexOf(e.charAt(r))), !(t > 64))) {
        if (t < 0) return !1;
        i += 6;
      }
    return i % 8 === 0;
  }
  function oE(e) {
    var t,
      r,
      i = e.replace(/[\r\n=]/g, ""),
      n = i.length,
      o = Ic,
      s = 0,
      a = [];
    for (t = 0; t < n; t++)
      t % 4 === 0 &&
        t &&
        (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255)),
        (s = (s << 6) | o.indexOf(i.charAt(t)));
    return (
      (r = (n % 4) * 6),
      r === 0
        ? (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255))
        : r === 18
          ? (a.push((s >> 10) & 255), a.push((s >> 2) & 255))
          : r === 12 && a.push((s >> 4) & 255),
      pr ? (pr.from ? pr.from(a) : new pr(a)) : a
    );
  }
  function sE(e) {
    var t = "",
      r = 0,
      i,
      n,
      o = e.length,
      s = Ic;
    for (i = 0; i < o; i++)
      i % 3 === 0 &&
        i &&
        ((t += s[(r >> 18) & 63]),
        (t += s[(r >> 12) & 63]),
        (t += s[(r >> 6) & 63]),
        (t += s[r & 63])),
        (r = (r << 8) + e[i]);
    return (
      (n = o % 3),
      n === 0
        ? ((t += s[(r >> 18) & 63]),
          (t += s[(r >> 12) & 63]),
          (t += s[(r >> 6) & 63]),
          (t += s[r & 63]))
        : n === 2
          ? ((t += s[(r >> 10) & 63]),
            (t += s[(r >> 4) & 63]),
            (t += s[(r << 2) & 63]),
            (t += s[64]))
          : n === 1 &&
            ((t += s[(r >> 2) & 63]),
            (t += s[(r << 4) & 63]),
            (t += s[64]),
            (t += s[64])),
      t
    );
  }
  function aE(e) {
    return pr && pr.isBuffer(e);
  }
  qg.exports = new nE("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: iE,
    construct: oE,
    predicate: aE,
    represent: sE,
  });
});
var Jg = T(($R, Wg) => {
  "use strict";
  var cE = be(),
    uE = Object.prototype.hasOwnProperty,
    lE = Object.prototype.toString;
  function hE(e) {
    if (e === null) return !0;
    var t = [],
      r,
      i,
      n,
      o,
      s,
      a = e;
    for (r = 0, i = a.length; r < i; r += 1) {
      if (((n = a[r]), (s = !1), lE.call(n) !== "[object Object]")) return !1;
      for (o in n)
        if (uE.call(n, o))
          if (!s) s = !0;
          else return !1;
      if (!s) return !1;
      if (t.indexOf(o) === -1) t.push(o);
      else return !1;
    }
    return !0;
  }
  function dE(e) {
    return e !== null ? e : [];
  }
  Wg.exports = new cE("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: hE,
    construct: dE,
  });
});
var Gg = T((ER, Kg) => {
  "use strict";
  var fE = be(),
    pE = Object.prototype.toString;
  function mE(e) {
    if (e === null) return !0;
    var t,
      r,
      i,
      n,
      o,
      s = e;
    for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
      if (
        ((i = s[t]),
        pE.call(i) !== "[object Object]" || ((n = Object.keys(i)), n.length !== 1))
      )
        return !1;
      o[t] = [n[0], i[n[0]]];
    }
    return !0;
  }
  function gE(e) {
    if (e === null) return [];
    var t,
      r,
      i,
      n,
      o,
      s = e;
    for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
      (i = s[t]), (n = Object.keys(i)), (o[t] = [n[0], i[n[0]]]);
    return o;
  }
  Kg.exports = new fE("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: mE,
    construct: gE,
  });
});
var Yg = T((kR, Hg) => {
  "use strict";
  var vE = be(),
    _E = Object.prototype.hasOwnProperty;
  function yE(e) {
    if (e === null) return !0;
    var t,
      r = e;
    for (t in r) if (_E.call(r, t) && r[t] !== null) return !1;
    return !0;
  }
  function bE(e) {
    return e !== null ? e : {};
  }
  Hg.exports = new vE("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: yE,
    construct: bE,
  });
});
var qr = T((AR, Xg) => {
  "use strict";
  var wE = fr();
  Xg.exports = new wE({
    include: [Ac()],
    implicit: [Fg(), Bg()],
    explicit: [Vg(), Jg(), Gg(), Yg()],
  });
});
var ev = T((IR, Qg) => {
  "use strict";
  var xE = be();
  function SE() {
    return !0;
  }
  function $E() {}
  function EE() {
    return "";
  }
  function kE(e) {
    return typeof e > "u";
  }
  Qg.exports = new xE("tag:yaml.org,2002:js/undefined", {
    kind: "scalar",
    resolve: SE,
    construct: $E,
    predicate: kE,
    represent: EE,
  });
});
var rv = T((OR, tv) => {
  "use strict";
  var AE = be();
  function IE(e) {
    if (e === null || e.length === 0) return !1;
    var t = e,
      r = /\/([gim]*)$/.exec(e),
      i = "";
    return !(
      t[0] === "/" &&
      (r && (i = r[1]), i.length > 3 || t[t.length - i.length - 1] !== "/")
    );
  }
  function OE(e) {
    var t = e,
      r = /\/([gim]*)$/.exec(e),
      i = "";
    return (
      t[0] === "/" && (r && (i = r[1]), (t = t.slice(1, t.length - i.length - 1))),
      new RegExp(t, i)
    );
  }
  function TE(e) {
    var t = "/" + e.source + "/";
    return (
      e.global && (t += "g"), e.multiline && (t += "m"), e.ignoreCase && (t += "i"), t
    );
  }
  function jE(e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  }
  tv.exports = new AE("tag:yaml.org,2002:js/regexp", {
    kind: "scalar",
    resolve: IE,
    construct: OE,
    predicate: jE,
    represent: TE,
  });
});
var ov = T((TR, iv) => {
  "use strict";
  var Oo;
  try {
    (nv = require), (Oo = nv("esprima"));
  } catch {
    typeof window < "u" && (Oo = window.esprima);
  }
  var nv,
    PE = be();
  function NE(e) {
    if (e === null) return !1;
    try {
      var t = "(" + e + ")",
        r = Oo.parse(t, {range: !0});
      return !(
        r.type !== "Program" ||
        r.body.length !== 1 ||
        r.body[0].type !== "ExpressionStatement" ||
        (r.body[0].expression.type !== "ArrowFunctionExpression" &&
          r.body[0].expression.type !== "FunctionExpression")
      );
    } catch {
      return !1;
    }
  }
  function RE(e) {
    var t = "(" + e + ")",
      r = Oo.parse(t, {range: !0}),
      i = [],
      n;
    if (
      r.type !== "Program" ||
      r.body.length !== 1 ||
      r.body[0].type !== "ExpressionStatement" ||
      (r.body[0].expression.type !== "ArrowFunctionExpression" &&
        r.body[0].expression.type !== "FunctionExpression")
    )
      throw new Error("Failed to resolve function");
    return (
      r.body[0].expression.params.forEach(function (o) {
        i.push(o.name);
      }),
      (n = r.body[0].expression.body.range),
      r.body[0].expression.body.type === "BlockStatement"
        ? new Function(i, t.slice(n[0] + 1, n[1] - 1))
        : new Function(i, "return " + t.slice(n[0], n[1]))
    );
  }
  function CE(e) {
    return e.toString();
  }
  function zE(e) {
    return Object.prototype.toString.call(e) === "[object Function]";
  }
  iv.exports = new PE("tag:yaml.org,2002:js/function", {
    kind: "scalar",
    resolve: NE,
    construct: RE,
    predicate: zE,
    represent: CE,
  });
});
var ni = T((jR, av) => {
  "use strict";
  var sv = fr();
  av.exports = sv.DEFAULT = new sv({include: [qr()], explicit: [ev(), rv(), ov()]});
});
var Av = T((PR, ii) => {
  "use strict";
  var Rt = dr(),
    pv = Br(),
    UE = pg(),
    mv = qr(),
    DE = ni(),
    Kt = Object.prototype.hasOwnProperty,
    To = 1,
    gv = 2,
    vv = 3,
    jo = 4,
    Oc = 1,
    LE = 2,
    cv = 3,
    FE =
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
    ME = /[\x85\u2028\u2029]/,
    BE = /[,\[\]\{\}]/,
    _v = /^(?:!|!!|![a-z\-]+!)$/i,
    yv =
      /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function uv(e) {
    return Object.prototype.toString.call(e);
  }
  function $t(e) {
    return e === 10 || e === 13;
  }
  function gr(e) {
    return e === 9 || e === 32;
  }
  function De(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function Vr(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function ZE(e) {
    var t;
    return 48 <= e && e <= 57
      ? e - 48
      : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
  }
  function qE(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function VE(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function lv(e) {
    return e === 48
      ? "\0"
      : e === 97
        ? "\x07"
        : e === 98
          ? "\b"
          : e === 116 || e === 9
            ? "	"
            : e === 110
              ? `
`
              : e === 118
                ? "\v"
                : e === 102
                  ? "\f"
                  : e === 114
                    ? "\r"
                    : e === 101
                      ? "\x1B"
                      : e === 32
                        ? " "
                        : e === 34
                          ? '"'
                          : e === 47
                            ? "/"
                            : e === 92
                              ? "\\"
                              : e === 78
                                ? "\x85"
                                : e === 95
                                  ? "\xA0"
                                  : e === 76
                                    ? "\u2028"
                                    : e === 80
                                      ? "\u2029"
                                      : "";
  }
  function WE(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
  }
  function bv(e, t, r) {
    t === "__proto__"
      ? Object.defineProperty(e, t, {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: r,
        })
      : (e[t] = r);
  }
  var wv = new Array(256),
    xv = new Array(256);
  for (mr = 0; mr < 256; mr++) (wv[mr] = lv(mr) ? 1 : 0), (xv[mr] = lv(mr));
  var mr;
  function JE(e, t) {
    (this.input = e),
      (this.filename = t.filename || null),
      (this.schema = t.schema || DE),
      (this.onWarning = t.onWarning || null),
      (this.legacy = t.legacy || !1),
      (this.json = t.json || !1),
      (this.listener = t.listener || null),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.typeMap = this.schema.compiledTypeMap),
      (this.length = e.length),
      (this.position = 0),
      (this.line = 0),
      (this.lineStart = 0),
      (this.lineIndent = 0),
      (this.documents = []);
  }
  function Sv(e, t) {
    return new pv(
      t,
      new UE(e.filename, e.input, e.position, e.line, e.position - e.lineStart),
    );
  }
  function F(e, t) {
    throw Sv(e, t);
  }
  function Po(e, t) {
    e.onWarning && e.onWarning.call(null, Sv(e, t));
  }
  var hv = {
    YAML: function (t, r, i) {
      var n, o, s;
      t.version !== null && F(t, "duplication of %YAML directive"),
        i.length !== 1 && F(t, "YAML directive accepts exactly one argument"),
        (n = /^([0-9]+)\.([0-9]+)$/.exec(i[0])),
        n === null && F(t, "ill-formed argument of the YAML directive"),
        (o = parseInt(n[1], 10)),
        (s = parseInt(n[2], 10)),
        o !== 1 && F(t, "unacceptable YAML version of the document"),
        (t.version = i[0]),
        (t.checkLineBreaks = s < 2),
        s !== 1 && s !== 2 && Po(t, "unsupported YAML version of the document");
    },
    TAG: function (t, r, i) {
      var n, o;
      i.length !== 2 && F(t, "TAG directive accepts exactly two arguments"),
        (n = i[0]),
        (o = i[1]),
        _v.test(n) ||
          F(t, "ill-formed tag handle (first argument) of the TAG directive"),
        Kt.call(t.tagMap, n) &&
          F(t, 'there is a previously declared suffix for "' + n + '" tag handle'),
        yv.test(o) ||
          F(t, "ill-formed tag prefix (second argument) of the TAG directive"),
        (t.tagMap[n] = o);
    },
  };
  function Jt(e, t, r, i) {
    var n, o, s, a;
    if (t < r) {
      if (((a = e.input.slice(t, r)), i))
        for (n = 0, o = a.length; n < o; n += 1)
          (s = a.charCodeAt(n)),
            s === 9 ||
              (32 <= s && s <= 1114111) ||
              F(e, "expected valid JSON character");
      else FE.test(a) && F(e, "the stream contains non-printable characters");
      e.result += a;
    }
  }
  function dv(e, t, r, i) {
    var n, o, s, a;
    for (
      Rt.isObject(r) ||
        F(e, "cannot merge mappings; the provided source object is unacceptable"),
        n = Object.keys(r),
        s = 0,
        a = n.length;
      s < a;
      s += 1
    )
      (o = n[s]), Kt.call(t, o) || (bv(t, o, r[o]), (i[o] = !0));
  }
  function Wr(e, t, r, i, n, o, s, a) {
    var c, u;
    if (Array.isArray(n))
      for (n = Array.prototype.slice.call(n), c = 0, u = n.length; c < u; c += 1)
        Array.isArray(n[c]) && F(e, "nested arrays are not supported inside keys"),
          typeof n == "object" &&
            uv(n[c]) === "[object Object]" &&
            (n[c] = "[object Object]");
    if (
      (typeof n == "object" && uv(n) === "[object Object]" && (n = "[object Object]"),
      (n = String(n)),
      t === null && (t = {}),
      i === "tag:yaml.org,2002:merge")
    )
      if (Array.isArray(o)) for (c = 0, u = o.length; c < u; c += 1) dv(e, t, o[c], r);
      else dv(e, t, o, r);
    else
      !e.json &&
        !Kt.call(r, n) &&
        Kt.call(t, n) &&
        ((e.line = s || e.line),
        (e.position = a || e.position),
        F(e, "duplicated mapping key")),
        bv(t, n, o),
        delete r[n];
    return t;
  }
  function Tc(e) {
    var t;
    (t = e.input.charCodeAt(e.position)),
      t === 10
        ? e.position++
        : t === 13
          ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
          : F(e, "a line break is expected"),
      (e.line += 1),
      (e.lineStart = e.position);
  }
  function ge(e, t, r) {
    for (var i = 0, n = e.input.charCodeAt(e.position); n !== 0; ) {
      for (; gr(n); ) n = e.input.charCodeAt(++e.position);
      if (t && n === 35)
        do n = e.input.charCodeAt(++e.position);
        while (n !== 10 && n !== 13 && n !== 0);
      if ($t(n))
        for (
          Tc(e), n = e.input.charCodeAt(e.position), i++, e.lineIndent = 0;
          n === 32;
        )
          e.lineIndent++, (n = e.input.charCodeAt(++e.position));
      else break;
    }
    return r !== -1 && i !== 0 && e.lineIndent < r && Po(e, "deficient indentation"), i;
  }
  function No(e) {
    var t = e.position,
      r;
    return (
      (r = e.input.charCodeAt(t)),
      !!(
        (r === 45 || r === 46) &&
        r === e.input.charCodeAt(t + 1) &&
        r === e.input.charCodeAt(t + 2) &&
        ((t += 3), (r = e.input.charCodeAt(t)), r === 0 || De(r))
      )
    );
  }
  function jc(e, t) {
    t === 1
      ? (e.result += " ")
      : t > 1 &&
        (e.result += Rt.repeat(
          `
`,
          t - 1,
        ));
  }
  function KE(e, t, r) {
    var i,
      n,
      o,
      s,
      a,
      c,
      u,
      l,
      h = e.kind,
      f = e.result,
      d;
    if (
      ((d = e.input.charCodeAt(e.position)),
      De(d) ||
        Vr(d) ||
        d === 35 ||
        d === 38 ||
        d === 42 ||
        d === 33 ||
        d === 124 ||
        d === 62 ||
        d === 39 ||
        d === 34 ||
        d === 37 ||
        d === 64 ||
        d === 96 ||
        ((d === 63 || d === 45) &&
          ((n = e.input.charCodeAt(e.position + 1)), De(n) || (r && Vr(n)))))
    )
      return !1;
    for (e.kind = "scalar", e.result = "", o = s = e.position, a = !1; d !== 0; ) {
      if (d === 58) {
        if (((n = e.input.charCodeAt(e.position + 1)), De(n) || (r && Vr(n)))) break;
      } else if (d === 35) {
        if (((i = e.input.charCodeAt(e.position - 1)), De(i))) break;
      } else {
        if ((e.position === e.lineStart && No(e)) || (r && Vr(d))) break;
        if ($t(d))
          if (
            ((c = e.line),
            (u = e.lineStart),
            (l = e.lineIndent),
            ge(e, !1, -1),
            e.lineIndent >= t)
          ) {
            (a = !0), (d = e.input.charCodeAt(e.position));
            continue;
          } else {
            (e.position = s), (e.line = c), (e.lineStart = u), (e.lineIndent = l);
            break;
          }
      }
      a && (Jt(e, o, s, !1), jc(e, e.line - c), (o = s = e.position), (a = !1)),
        gr(d) || (s = e.position + 1),
        (d = e.input.charCodeAt(++e.position));
    }
    return Jt(e, o, s, !1), e.result ? !0 : ((e.kind = h), (e.result = f), !1);
  }
  function GE(e, t) {
    var r, i, n;
    if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
    for (
      e.kind = "scalar", e.result = "", e.position++, i = n = e.position;
      (r = e.input.charCodeAt(e.position)) !== 0;
    )
      if (r === 39)
        if (
          (Jt(e, i, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39)
        )
          (i = e.position), e.position++, (n = e.position);
        else return !0;
      else
        $t(r)
          ? (Jt(e, i, n, !0), jc(e, ge(e, !1, t)), (i = n = e.position))
          : e.position === e.lineStart && No(e)
            ? F(e, "unexpected end of the document within a single quoted scalar")
            : (e.position++, (n = e.position));
    F(e, "unexpected end of the stream within a single quoted scalar");
  }
  function HE(e, t) {
    var r, i, n, o, s, a;
    if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
    for (
      e.kind = "scalar", e.result = "", e.position++, r = i = e.position;
      (a = e.input.charCodeAt(e.position)) !== 0;
    ) {
      if (a === 34) return Jt(e, r, e.position, !0), e.position++, !0;
      if (a === 92) {
        if ((Jt(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), $t(a)))
          ge(e, !1, t);
        else if (a < 256 && wv[a]) (e.result += xv[a]), e.position++;
        else if ((s = qE(a)) > 0) {
          for (n = s, o = 0; n > 0; n--)
            (a = e.input.charCodeAt(++e.position)),
              (s = ZE(a)) >= 0
                ? (o = (o << 4) + s)
                : F(e, "expected hexadecimal character");
          (e.result += WE(o)), e.position++;
        } else F(e, "unknown escape sequence");
        r = i = e.position;
      } else
        $t(a)
          ? (Jt(e, r, i, !0), jc(e, ge(e, !1, t)), (r = i = e.position))
          : e.position === e.lineStart && No(e)
            ? F(e, "unexpected end of the document within a double quoted scalar")
            : (e.position++, (i = e.position));
    }
    F(e, "unexpected end of the stream within a double quoted scalar");
  }
  function YE(e, t) {
    var r = !0,
      i,
      n = e.tag,
      o,
      s = e.anchor,
      a,
      c,
      u,
      l,
      h,
      f = {},
      d,
      p,
      m,
      v;
    if (((v = e.input.charCodeAt(e.position)), v === 91)) (c = 93), (h = !1), (o = []);
    else if (v === 123) (c = 125), (h = !0), (o = {});
    else return !1;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = o),
        v = e.input.charCodeAt(++e.position);
      v !== 0;
    ) {
      if ((ge(e, !0, t), (v = e.input.charCodeAt(e.position)), v === c))
        return (
          e.position++,
          (e.tag = n),
          (e.anchor = s),
          (e.kind = h ? "mapping" : "sequence"),
          (e.result = o),
          !0
        );
      r || F(e, "missed comma between flow collection entries"),
        (p = d = m = null),
        (u = l = !1),
        v === 63 &&
          ((a = e.input.charCodeAt(e.position + 1)),
          De(a) && ((u = l = !0), e.position++, ge(e, !0, t))),
        (i = e.line),
        Jr(e, t, To, !1, !0),
        (p = e.tag),
        (d = e.result),
        ge(e, !0, t),
        (v = e.input.charCodeAt(e.position)),
        (l || e.line === i) &&
          v === 58 &&
          ((u = !0),
          (v = e.input.charCodeAt(++e.position)),
          ge(e, !0, t),
          Jr(e, t, To, !1, !0),
          (m = e.result)),
        h ? Wr(e, o, f, p, d, m) : u ? o.push(Wr(e, null, f, p, d, m)) : o.push(d),
        ge(e, !0, t),
        (v = e.input.charCodeAt(e.position)),
        v === 44 ? ((r = !0), (v = e.input.charCodeAt(++e.position))) : (r = !1);
    }
    F(e, "unexpected end of the stream within a flow collection");
  }
  function XE(e, t) {
    var r,
      i,
      n = Oc,
      o = !1,
      s = !1,
      a = t,
      c = 0,
      u = !1,
      l,
      h;
    if (((h = e.input.charCodeAt(e.position)), h === 124)) i = !1;
    else if (h === 62) i = !0;
    else return !1;
    for (e.kind = "scalar", e.result = ""; h !== 0; )
      if (((h = e.input.charCodeAt(++e.position)), h === 43 || h === 45))
        Oc === n
          ? (n = h === 43 ? cv : LE)
          : F(e, "repeat of a chomping mode identifier");
      else if ((l = VE(h)) >= 0)
        l === 0
          ? F(
              e,
              "bad explicit indentation width of a block scalar; it cannot be less than one",
            )
          : s
            ? F(e, "repeat of an indentation width identifier")
            : ((a = t + l - 1), (s = !0));
      else break;
    if (gr(h)) {
      do h = e.input.charCodeAt(++e.position);
      while (gr(h));
      if (h === 35)
        do h = e.input.charCodeAt(++e.position);
        while (!$t(h) && h !== 0);
    }
    for (; h !== 0; ) {
      for (
        Tc(e), e.lineIndent = 0, h = e.input.charCodeAt(e.position);
        (!s || e.lineIndent < a) && h === 32;
      )
        e.lineIndent++, (h = e.input.charCodeAt(++e.position));
      if ((!s && e.lineIndent > a && (a = e.lineIndent), $t(h))) {
        c++;
        continue;
      }
      if (e.lineIndent < a) {
        n === cv
          ? (e.result += Rt.repeat(
              `
`,
              o ? 1 + c : c,
            ))
          : n === Oc &&
            o &&
            (e.result += `
`);
        break;
      }
      for (
        i
          ? gr(h)
            ? ((u = !0),
              (e.result += Rt.repeat(
                `
`,
                o ? 1 + c : c,
              )))
            : u
              ? ((u = !1),
                (e.result += Rt.repeat(
                  `
`,
                  c + 1,
                )))
              : c === 0
                ? o && (e.result += " ")
                : (e.result += Rt.repeat(
                    `
`,
                    c,
                  ))
          : (e.result += Rt.repeat(
              `
`,
              o ? 1 + c : c,
            )),
          o = !0,
          s = !0,
          c = 0,
          r = e.position;
        !$t(h) && h !== 0;
      )
        h = e.input.charCodeAt(++e.position);
      Jt(e, r, e.position, !1);
    }
    return !0;
  }
  function fv(e, t) {
    var r,
      i = e.tag,
      n = e.anchor,
      o = [],
      s,
      a = !1,
      c;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = o),
        c = e.input.charCodeAt(e.position);
      c !== 0 && !(c !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !De(s)));
    ) {
      if (((a = !0), e.position++, ge(e, !0, -1) && e.lineIndent <= t)) {
        o.push(null), (c = e.input.charCodeAt(e.position));
        continue;
      }
      if (
        ((r = e.line),
        Jr(e, t, vv, !1, !0),
        o.push(e.result),
        ge(e, !0, -1),
        (c = e.input.charCodeAt(e.position)),
        (e.line === r || e.lineIndent > t) && c !== 0)
      )
        F(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < t) break;
    }
    return a
      ? ((e.tag = i), (e.anchor = n), (e.kind = "sequence"), (e.result = o), !0)
      : !1;
  }
  function QE(e, t, r) {
    var i,
      n,
      o,
      s,
      a = e.tag,
      c = e.anchor,
      u = {},
      l = {},
      h = null,
      f = null,
      d = null,
      p = !1,
      m = !1,
      v;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = u),
        v = e.input.charCodeAt(e.position);
      v !== 0;
    ) {
      if (
        ((i = e.input.charCodeAt(e.position + 1)),
        (o = e.line),
        (s = e.position),
        (v === 63 || v === 58) && De(i))
      )
        v === 63
          ? (p && (Wr(e, u, l, h, f, null), (h = f = d = null)),
            (m = !0),
            (p = !0),
            (n = !0))
          : p
            ? ((p = !1), (n = !0))
            : F(
                e,
                "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line",
              ),
          (e.position += 1),
          (v = i);
      else if (Jr(e, r, gv, !1, !0))
        if (e.line === o) {
          for (v = e.input.charCodeAt(e.position); gr(v); )
            v = e.input.charCodeAt(++e.position);
          if (v === 58)
            (v = e.input.charCodeAt(++e.position)),
              De(v) ||
                F(
                  e,
                  "a whitespace character is expected after the key-value separator within a block mapping",
                ),
              p && (Wr(e, u, l, h, f, null), (h = f = d = null)),
              (m = !0),
              (p = !1),
              (n = !1),
              (h = e.tag),
              (f = e.result);
          else if (m) F(e, "can not read an implicit mapping pair; a colon is missed");
          else return (e.tag = a), (e.anchor = c), !0;
        } else if (m)
          F(
            e,
            "can not read a block mapping entry; a multiline key may not be an implicit key",
          );
        else return (e.tag = a), (e.anchor = c), !0;
      else break;
      if (
        ((e.line === o || e.lineIndent > t) &&
          (Jr(e, t, jo, !0, n) && (p ? (f = e.result) : (d = e.result)),
          p || (Wr(e, u, l, h, f, d, o, s), (h = f = d = null)),
          ge(e, !0, -1),
          (v = e.input.charCodeAt(e.position))),
        e.lineIndent > t && v !== 0)
      )
        F(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < t) break;
    }
    return (
      p && Wr(e, u, l, h, f, null),
      m && ((e.tag = a), (e.anchor = c), (e.kind = "mapping"), (e.result = u)),
      m
    );
  }
  function ek(e) {
    var t,
      r = !1,
      i = !1,
      n,
      o,
      s;
    if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
    if (
      (e.tag !== null && F(e, "duplication of a tag property"),
      (s = e.input.charCodeAt(++e.position)),
      s === 60
        ? ((r = !0), (s = e.input.charCodeAt(++e.position)))
        : s === 33
          ? ((i = !0), (n = "!!"), (s = e.input.charCodeAt(++e.position)))
          : (n = "!"),
      (t = e.position),
      r)
    ) {
      do s = e.input.charCodeAt(++e.position);
      while (s !== 0 && s !== 62);
      e.position < e.length
        ? ((o = e.input.slice(t, e.position)), (s = e.input.charCodeAt(++e.position)))
        : F(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; s !== 0 && !De(s); )
        s === 33 &&
          (i
            ? F(e, "tag suffix cannot contain exclamation marks")
            : ((n = e.input.slice(t - 1, e.position + 1)),
              _v.test(n) || F(e, "named tag handle cannot contain such characters"),
              (i = !0),
              (t = e.position + 1))),
          (s = e.input.charCodeAt(++e.position));
      (o = e.input.slice(t, e.position)),
        BE.test(o) && F(e, "tag suffix cannot contain flow indicator characters");
    }
    return (
      o && !yv.test(o) && F(e, "tag name cannot contain such characters: " + o),
      r
        ? (e.tag = o)
        : Kt.call(e.tagMap, n)
          ? (e.tag = e.tagMap[n] + o)
          : n === "!"
            ? (e.tag = "!" + o)
            : n === "!!"
              ? (e.tag = "tag:yaml.org,2002:" + o)
              : F(e, 'undeclared tag handle "' + n + '"'),
      !0
    );
  }
  function tk(e) {
    var t, r;
    if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
    for (
      e.anchor !== null && F(e, "duplication of an anchor property"),
        r = e.input.charCodeAt(++e.position),
        t = e.position;
      r !== 0 && !De(r) && !Vr(r);
    )
      r = e.input.charCodeAt(++e.position);
    return (
      e.position === t &&
        F(e, "name of an anchor node must contain at least one character"),
      (e.anchor = e.input.slice(t, e.position)),
      !0
    );
  }
  function rk(e) {
    var t, r, i;
    if (((i = e.input.charCodeAt(e.position)), i !== 42)) return !1;
    for (
      i = e.input.charCodeAt(++e.position), t = e.position;
      i !== 0 && !De(i) && !Vr(i);
    )
      i = e.input.charCodeAt(++e.position);
    return (
      e.position === t &&
        F(e, "name of an alias node must contain at least one character"),
      (r = e.input.slice(t, e.position)),
      Kt.call(e.anchorMap, r) || F(e, 'unidentified alias "' + r + '"'),
      (e.result = e.anchorMap[r]),
      ge(e, !0, -1),
      !0
    );
  }
  function Jr(e, t, r, i, n) {
    var o,
      s,
      a,
      c = 1,
      u = !1,
      l = !1,
      h,
      f,
      d,
      p,
      m;
    if (
      (e.listener !== null && e.listener("open", e),
      (e.tag = null),
      (e.anchor = null),
      (e.kind = null),
      (e.result = null),
      (o = s = a = jo === r || vv === r),
      i &&
        ge(e, !0, -1) &&
        ((u = !0),
        e.lineIndent > t
          ? (c = 1)
          : e.lineIndent === t
            ? (c = 0)
            : e.lineIndent < t && (c = -1)),
      c === 1)
    )
      for (; ek(e) || tk(e); )
        ge(e, !0, -1)
          ? ((u = !0),
            (a = o),
            e.lineIndent > t
              ? (c = 1)
              : e.lineIndent === t
                ? (c = 0)
                : e.lineIndent < t && (c = -1))
          : (a = !1);
    if (
      (a && (a = u || n),
      (c === 1 || jo === r) &&
        (To === r || gv === r ? (p = t) : (p = t + 1),
        (m = e.position - e.lineStart),
        c === 1
          ? (a && (fv(e, m) || QE(e, m, p))) || YE(e, p)
            ? (l = !0)
            : ((s && XE(e, p)) || GE(e, p) || HE(e, p)
                ? (l = !0)
                : rk(e)
                  ? ((l = !0),
                    (e.tag !== null || e.anchor !== null) &&
                      F(e, "alias node should not have any properties"))
                  : KE(e, p, To === r) && ((l = !0), e.tag === null && (e.tag = "?")),
              e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
          : c === 0 && (l = a && fv(e, m))),
      e.tag !== null && e.tag !== "!")
    )
      if (e.tag === "?") {
        for (
          e.result !== null &&
            e.kind !== "scalar" &&
            F(
              e,
              'unacceptable node kind for !<?> tag; it should be "scalar", not "' +
                e.kind +
                '"',
            ),
            h = 0,
            f = e.implicitTypes.length;
          h < f;
          h += 1
        )
          if (((d = e.implicitTypes[h]), d.resolve(e.result))) {
            (e.result = d.construct(e.result)),
              (e.tag = d.tag),
              e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
            break;
          }
      } else
        Kt.call(e.typeMap[e.kind || "fallback"], e.tag)
          ? ((d = e.typeMap[e.kind || "fallback"][e.tag]),
            e.result !== null &&
              d.kind !== e.kind &&
              F(
                e,
                "unacceptable node kind for !<" +
                  e.tag +
                  '> tag; it should be "' +
                  d.kind +
                  '", not "' +
                  e.kind +
                  '"',
              ),
            d.resolve(e.result)
              ? ((e.result = d.construct(e.result)),
                e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
              : F(e, "cannot resolve a node with !<" + e.tag + "> explicit tag"))
          : F(e, "unknown tag !<" + e.tag + ">");
    return (
      e.listener !== null && e.listener("close", e),
      e.tag !== null || e.anchor !== null || l
    );
  }
  function nk(e) {
    var t = e.position,
      r,
      i,
      n,
      o = !1,
      s;
    for (
      e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = {}, e.anchorMap = {};
      (s = e.input.charCodeAt(e.position)) !== 0 &&
      (ge(e, !0, -1),
      (s = e.input.charCodeAt(e.position)),
      !(e.lineIndent > 0 || s !== 37));
    ) {
      for (
        o = !0, s = e.input.charCodeAt(++e.position), r = e.position;
        s !== 0 && !De(s);
      )
        s = e.input.charCodeAt(++e.position);
      for (
        i = e.input.slice(r, e.position),
          n = [],
          i.length < 1 &&
            F(e, "directive name must not be less than one character in length");
        s !== 0;
      ) {
        for (; gr(s); ) s = e.input.charCodeAt(++e.position);
        if (s === 35) {
          do s = e.input.charCodeAt(++e.position);
          while (s !== 0 && !$t(s));
          break;
        }
        if ($t(s)) break;
        for (r = e.position; s !== 0 && !De(s); ) s = e.input.charCodeAt(++e.position);
        n.push(e.input.slice(r, e.position));
      }
      s !== 0 && Tc(e),
        Kt.call(hv, i)
          ? hv[i](e, i, n)
          : Po(e, 'unknown document directive "' + i + '"');
    }
    if (
      (ge(e, !0, -1),
      e.lineIndent === 0 &&
      e.input.charCodeAt(e.position) === 45 &&
      e.input.charCodeAt(e.position + 1) === 45 &&
      e.input.charCodeAt(e.position + 2) === 45
        ? ((e.position += 3), ge(e, !0, -1))
        : o && F(e, "directives end mark is expected"),
      Jr(e, e.lineIndent - 1, jo, !1, !0),
      ge(e, !0, -1),
      e.checkLineBreaks &&
        ME.test(e.input.slice(t, e.position)) &&
        Po(e, "non-ASCII line breaks are interpreted as content"),
      e.documents.push(e.result),
      e.position === e.lineStart && No(e))
    ) {
      e.input.charCodeAt(e.position) === 46 && ((e.position += 3), ge(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      F(e, "end of the stream or a document separator is expected");
    else return;
  }
  function $v(e, t) {
    (e = String(e)),
      (t = t || {}),
      e.length !== 0 &&
        (e.charCodeAt(e.length - 1) !== 10 &&
          e.charCodeAt(e.length - 1) !== 13 &&
          (e += `
`),
        e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var r = new JE(e, t),
      i = e.indexOf("\0");
    for (
      i !== -1 && ((r.position = i), F(r, "null byte is not allowed in input")),
        r.input += "\0";
      r.input.charCodeAt(r.position) === 32;
    )
      (r.lineIndent += 1), (r.position += 1);
    for (; r.position < r.length - 1; ) nk(r);
    return r.documents;
  }
  function Ev(e, t, r) {
    t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
    var i = $v(e, r);
    if (typeof t != "function") return i;
    for (var n = 0, o = i.length; n < o; n += 1) t(i[n]);
  }
  function kv(e, t) {
    var r = $v(e, t);
    if (r.length !== 0) {
      if (r.length === 1) return r[0];
      throw new pv("expected a single document in the stream, but found more");
    }
  }
  function ik(e, t, r) {
    return (
      typeof t == "object" && t !== null && typeof r > "u" && ((r = t), (t = null)),
      Ev(e, t, Rt.extend({schema: mv}, r))
    );
  }
  function ok(e, t) {
    return kv(e, Rt.extend({schema: mv}, t));
  }
  ii.exports.loadAll = Ev;
  ii.exports.load = kv;
  ii.exports.safeLoadAll = ik;
  ii.exports.safeLoad = ok;
});
var Hv = T((NR, Cc) => {
  "use strict";
  var si = dr(),
    ai = Br(),
    sk = ni(),
    ak = qr(),
    Cv = Object.prototype.toString,
    zv = Object.prototype.hasOwnProperty,
    ck = 9,
    oi = 10,
    uk = 13,
    lk = 32,
    hk = 33,
    dk = 34,
    Uv = 35,
    fk = 37,
    pk = 38,
    mk = 39,
    gk = 42,
    Dv = 44,
    vk = 45,
    Lv = 58,
    _k = 61,
    yk = 62,
    bk = 63,
    wk = 64,
    Fv = 91,
    Mv = 93,
    xk = 96,
    Bv = 123,
    Sk = 124,
    Zv = 125,
    Ie = {};
  Ie[0] = "\\0";
  Ie[7] = "\\a";
  Ie[8] = "\\b";
  Ie[9] = "\\t";
  Ie[10] = "\\n";
  Ie[11] = "\\v";
  Ie[12] = "\\f";
  Ie[13] = "\\r";
  Ie[27] = "\\e";
  Ie[34] = '\\"';
  Ie[92] = "\\\\";
  Ie[133] = "\\N";
  Ie[160] = "\\_";
  Ie[8232] = "\\L";
  Ie[8233] = "\\P";
  var $k = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF",
  ];
  function Ek(e, t) {
    var r, i, n, o, s, a, c;
    if (t === null) return {};
    for (r = {}, i = Object.keys(t), n = 0, o = i.length; n < o; n += 1)
      (s = i[n]),
        (a = String(t[s])),
        s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)),
        (c = e.compiledTypeMap.fallback[s]),
        c && zv.call(c.styleAliases, a) && (a = c.styleAliases[a]),
        (r[s] = a);
    return r;
  }
  function Iv(e) {
    var t, r, i;
    if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (i = 2);
    else if (e <= 65535) (r = "u"), (i = 4);
    else if (e <= 4294967295) (r = "U"), (i = 8);
    else throw new ai("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + r + si.repeat("0", i - t.length) + t;
  }
  function kk(e) {
    (this.schema = e.schema || sk),
      (this.indent = Math.max(1, e.indent || 2)),
      (this.noArrayIndent = e.noArrayIndent || !1),
      (this.skipInvalid = e.skipInvalid || !1),
      (this.flowLevel = si.isNothing(e.flowLevel) ? -1 : e.flowLevel),
      (this.styleMap = Ek(this.schema, e.styles || null)),
      (this.sortKeys = e.sortKeys || !1),
      (this.lineWidth = e.lineWidth || 80),
      (this.noRefs = e.noRefs || !1),
      (this.noCompatMode = e.noCompatMode || !1),
      (this.condenseFlow = e.condenseFlow || !1),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.explicitTypes = this.schema.compiledExplicit),
      (this.tag = null),
      (this.result = ""),
      (this.duplicates = []),
      (this.usedDuplicates = null);
  }
  function Ov(e, t) {
    for (var r = si.repeat(" ", t), i = 0, n = -1, o = "", s, a = e.length; i < a; )
      (n = e.indexOf(
        `
`,
        i,
      )),
        n === -1 ? ((s = e.slice(i)), (i = a)) : ((s = e.slice(i, n + 1)), (i = n + 1)),
        s.length &&
          s !==
            `
` &&
          (o += r),
        (o += s);
    return o;
  }
  function Pc(e, t) {
    return (
      `
` + si.repeat(" ", e.indent * t)
    );
  }
  function Ak(e, t) {
    var r, i, n;
    for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
      if (((n = e.implicitTypes[r]), n.resolve(t))) return !0;
    return !1;
  }
  function Rc(e) {
    return e === lk || e === ck;
  }
  function Kr(e) {
    return (
      (32 <= e && e <= 126) ||
      (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
      (57344 <= e && e <= 65533 && e !== 65279) ||
      (65536 <= e && e <= 1114111)
    );
  }
  function Ik(e) {
    return Kr(e) && !Rc(e) && e !== 65279 && e !== uk && e !== oi;
  }
  function Tv(e, t) {
    return (
      Kr(e) &&
      e !== 65279 &&
      e !== Dv &&
      e !== Fv &&
      e !== Mv &&
      e !== Bv &&
      e !== Zv &&
      e !== Lv &&
      (e !== Uv || (t && Ik(t)))
    );
  }
  function Ok(e) {
    return (
      Kr(e) &&
      e !== 65279 &&
      !Rc(e) &&
      e !== vk &&
      e !== bk &&
      e !== Lv &&
      e !== Dv &&
      e !== Fv &&
      e !== Mv &&
      e !== Bv &&
      e !== Zv &&
      e !== Uv &&
      e !== pk &&
      e !== gk &&
      e !== hk &&
      e !== Sk &&
      e !== _k &&
      e !== yk &&
      e !== mk &&
      e !== dk &&
      e !== fk &&
      e !== wk &&
      e !== xk
    );
  }
  function qv(e) {
    var t = /^\n* /;
    return t.test(e);
  }
  var Vv = 1,
    Wv = 2,
    Jv = 3,
    Kv = 4,
    Ro = 5;
  function Tk(e, t, r, i, n) {
    var o,
      s,
      a,
      c = !1,
      u = !1,
      l = i !== -1,
      h = -1,
      f = Ok(e.charCodeAt(0)) && !Rc(e.charCodeAt(e.length - 1));
    if (t)
      for (o = 0; o < e.length; o++) {
        if (((s = e.charCodeAt(o)), !Kr(s))) return Ro;
        (a = o > 0 ? e.charCodeAt(o - 1) : null), (f = f && Tv(s, a));
      }
    else {
      for (o = 0; o < e.length; o++) {
        if (((s = e.charCodeAt(o)), s === oi))
          (c = !0), l && ((u = u || (o - h - 1 > i && e[h + 1] !== " ")), (h = o));
        else if (!Kr(s)) return Ro;
        (a = o > 0 ? e.charCodeAt(o - 1) : null), (f = f && Tv(s, a));
      }
      u = u || (l && o - h - 1 > i && e[h + 1] !== " ");
    }
    return !c && !u ? (f && !n(e) ? Vv : Wv) : r > 9 && qv(e) ? Ro : u ? Kv : Jv;
  }
  function jk(e, t, r, i) {
    e.dump = (function () {
      if (t.length === 0) return "''";
      if (!e.noCompatMode && $k.indexOf(t) !== -1) return "'" + t + "'";
      var n = e.indent * Math.max(1, r),
        o =
          e.lineWidth === -1
            ? -1
            : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - n),
        s = i || (e.flowLevel > -1 && r >= e.flowLevel);
      function a(c) {
        return Ak(e, c);
      }
      switch (Tk(t, s, e.indent, o, a)) {
        case Vv:
          return t;
        case Wv:
          return "'" + t.replace(/'/g, "''") + "'";
        case Jv:
          return "|" + jv(t, e.indent) + Pv(Ov(t, n));
        case Kv:
          return ">" + jv(t, e.indent) + Pv(Ov(Pk(t, o), n));
        case Ro:
          return '"' + Nk(t, o) + '"';
        default:
          throw new ai("impossible error: invalid scalar style");
      }
    })();
  }
  function jv(e, t) {
    var r = qv(e) ? String(t) : "",
      i =
        e[e.length - 1] ===
        `
`,
      n =
        i &&
        (e[e.length - 2] ===
          `
` ||
          e ===
            `
`),
      o = n ? "+" : i ? "" : "-";
    return (
      r +
      o +
      `
`
    );
  }
  function Pv(e) {
    return e[e.length - 1] ===
      `
`
      ? e.slice(0, -1)
      : e;
  }
  function Pk(e, t) {
    for (
      var r = /(\n+)([^\n]*)/g,
        i = (function () {
          var u = e.indexOf(`
`);
          return (u = u !== -1 ? u : e.length), (r.lastIndex = u), Nv(e.slice(0, u), t);
        })(),
        n =
          e[0] ===
            `
` || e[0] === " ",
        o,
        s;
      (s = r.exec(e));
    ) {
      var a = s[1],
        c = s[2];
      (o = c[0] === " "),
        (i +=
          a +
          (!n && !o && c !== ""
            ? `
`
            : "") +
          Nv(c, t)),
        (n = o);
    }
    return i;
  }
  function Nv(e, t) {
    if (e === "" || e[0] === " ") return e;
    for (var r = / [^ ]/g, i, n = 0, o, s = 0, a = 0, c = ""; (i = r.exec(e)); )
      (a = i.index),
        a - n > t &&
          ((o = s > n ? s : a),
          (c +=
            `
` + e.slice(n, o)),
          (n = o + 1)),
        (s = a);
    return (
      (c += `
`),
      e.length - n > t && s > n
        ? (c +=
            e.slice(n, s) +
            `
` +
            e.slice(s + 1))
        : (c += e.slice(n)),
      c.slice(1)
    );
  }
  function Nk(e) {
    for (var t = "", r, i, n, o = 0; o < e.length; o++) {
      if (
        ((r = e.charCodeAt(o)),
        r >= 55296 &&
          r <= 56319 &&
          ((i = e.charCodeAt(o + 1)), i >= 56320 && i <= 57343))
      ) {
        (t += Iv((r - 55296) * 1024 + i - 56320 + 65536)), o++;
        continue;
      }
      (n = Ie[r]), (t += !n && Kr(r) ? e[o] : n || Iv(r));
    }
    return t;
  }
  function Rk(e, t, r) {
    var i = "",
      n = e.tag,
      o,
      s;
    for (o = 0, s = r.length; o < s; o += 1)
      vr(e, t, r[o], !1, !1) &&
        (o !== 0 && (i += "," + (e.condenseFlow ? "" : " ")), (i += e.dump));
    (e.tag = n), (e.dump = "[" + i + "]");
  }
  function Ck(e, t, r, i) {
    var n = "",
      o = e.tag,
      s,
      a;
    for (s = 0, a = r.length; s < a; s += 1)
      vr(e, t + 1, r[s], !0, !0) &&
        ((!i || s !== 0) && (n += Pc(e, t)),
        e.dump && oi === e.dump.charCodeAt(0) ? (n += "-") : (n += "- "),
        (n += e.dump));
    (e.tag = o), (e.dump = n || "[]");
  }
  function zk(e, t, r) {
    var i = "",
      n = e.tag,
      o = Object.keys(r),
      s,
      a,
      c,
      u,
      l;
    for (s = 0, a = o.length; s < a; s += 1)
      (l = ""),
        s !== 0 && (l += ", "),
        e.condenseFlow && (l += '"'),
        (c = o[s]),
        (u = r[c]),
        vr(e, t, c, !1, !1) &&
          (e.dump.length > 1024 && (l += "? "),
          (l +=
            e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
          vr(e, t, u, !1, !1) && ((l += e.dump), (i += l)));
    (e.tag = n), (e.dump = "{" + i + "}");
  }
  function Uk(e, t, r, i) {
    var n = "",
      o = e.tag,
      s = Object.keys(r),
      a,
      c,
      u,
      l,
      h,
      f;
    if (e.sortKeys === !0) s.sort();
    else if (typeof e.sortKeys == "function") s.sort(e.sortKeys);
    else if (e.sortKeys) throw new ai("sortKeys must be a boolean or a function");
    for (a = 0, c = s.length; a < c; a += 1)
      (f = ""),
        (!i || a !== 0) && (f += Pc(e, t)),
        (u = s[a]),
        (l = r[u]),
        vr(e, t + 1, u, !0, !0, !0) &&
          ((h = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
          h && (e.dump && oi === e.dump.charCodeAt(0) ? (f += "?") : (f += "? ")),
          (f += e.dump),
          h && (f += Pc(e, t)),
          vr(e, t + 1, l, !0, h) &&
            (e.dump && oi === e.dump.charCodeAt(0) ? (f += ":") : (f += ": "),
            (f += e.dump),
            (n += f)));
    (e.tag = o), (e.dump = n || "{}");
  }
  function Rv(e, t, r) {
    var i, n, o, s, a, c;
    for (n = r ? e.explicitTypes : e.implicitTypes, o = 0, s = n.length; o < s; o += 1)
      if (
        ((a = n[o]),
        (a.instanceOf || a.predicate) &&
          (!a.instanceOf || (typeof t == "object" && t instanceof a.instanceOf)) &&
          (!a.predicate || a.predicate(t)))
      ) {
        if (((e.tag = r ? a.tag : "?"), a.represent)) {
          if (
            ((c = e.styleMap[a.tag] || a.defaultStyle),
            Cv.call(a.represent) === "[object Function]")
          )
            i = a.represent(t, c);
          else if (zv.call(a.represent, c)) i = a.represent[c](t, c);
          else
            throw new ai("!<" + a.tag + '> tag resolver accepts not "' + c + '" style');
          e.dump = i;
        }
        return !0;
      }
    return !1;
  }
  function vr(e, t, r, i, n, o) {
    (e.tag = null), (e.dump = r), Rv(e, r, !1) || Rv(e, r, !0);
    var s = Cv.call(e.dump);
    i && (i = e.flowLevel < 0 || e.flowLevel > t);
    var a = s === "[object Object]" || s === "[object Array]",
      c,
      u;
    if (
      (a && ((c = e.duplicates.indexOf(r)), (u = c !== -1)),
      ((e.tag !== null && e.tag !== "?") || u || (e.indent !== 2 && t > 0)) && (n = !1),
      u && e.usedDuplicates[c])
    )
      e.dump = "*ref_" + c;
    else {
      if (
        (a && u && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0),
        s === "[object Object]")
      )
        i && Object.keys(e.dump).length !== 0
          ? (Uk(e, t, e.dump, n), u && (e.dump = "&ref_" + c + e.dump))
          : (zk(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
      else if (s === "[object Array]") {
        var l = e.noArrayIndent && t > 0 ? t - 1 : t;
        i && e.dump.length !== 0
          ? (Ck(e, l, e.dump, n), u && (e.dump = "&ref_" + c + e.dump))
          : (Rk(e, l, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
      } else if (s === "[object String]") e.tag !== "?" && jk(e, e.dump, t, o);
      else {
        if (e.skipInvalid) return !1;
        throw new ai("unacceptable kind of an object to dump " + s);
      }
      e.tag !== null && e.tag !== "?" && (e.dump = "!<" + e.tag + "> " + e.dump);
    }
    return !0;
  }
  function Dk(e, t) {
    var r = [],
      i = [],
      n,
      o;
    for (Nc(e, r, i), n = 0, o = i.length; n < o; n += 1) t.duplicates.push(r[i[n]]);
    t.usedDuplicates = new Array(o);
  }
  function Nc(e, t, r) {
    var i, n, o;
    if (e !== null && typeof e == "object")
      if (((n = t.indexOf(e)), n !== -1)) r.indexOf(n) === -1 && r.push(n);
      else if ((t.push(e), Array.isArray(e)))
        for (n = 0, o = e.length; n < o; n += 1) Nc(e[n], t, r);
      else
        for (i = Object.keys(e), n = 0, o = i.length; n < o; n += 1) Nc(e[i[n]], t, r);
  }
  function Gv(e, t) {
    t = t || {};
    var r = new kk(t);
    return (
      r.noRefs || Dk(e, r),
      vr(r, 0, e, !0, !0)
        ? r.dump +
          `
`
        : ""
    );
  }
  function Lk(e, t) {
    return Gv(e, si.extend({schema: ak}, t));
  }
  Cc.exports.dump = Gv;
  Cc.exports.safeDump = Lk;
});
var Xv = T((RR, he) => {
  "use strict";
  var Co = Av(),
    Yv = Hv();
  function zo(e) {
    return function () {
      throw new Error("Function " + e + " is deprecated and cannot be used.");
    };
  }
  he.exports.Type = be();
  he.exports.Schema = fr();
  he.exports.FAILSAFE_SCHEMA = Io();
  he.exports.JSON_SCHEMA = kc();
  he.exports.CORE_SCHEMA = Ac();
  he.exports.DEFAULT_SAFE_SCHEMA = qr();
  he.exports.DEFAULT_FULL_SCHEMA = ni();
  he.exports.load = Co.load;
  he.exports.loadAll = Co.loadAll;
  he.exports.safeLoad = Co.safeLoad;
  he.exports.safeLoadAll = Co.safeLoadAll;
  he.exports.dump = Yv.dump;
  he.exports.safeDump = Yv.safeDump;
  he.exports.YAMLException = Br();
  he.exports.MINIMAL_SCHEMA = Io();
  he.exports.SAFE_SCHEMA = qr();
  he.exports.DEFAULT_SCHEMA = ni();
  he.exports.scan = zo("scan");
  he.exports.parse = zo("parse");
  he.exports.compose = zo("compose");
  he.exports.addConstructor = zo("addConstructor");
});
var e_ = T((CR, Qv) => {
  "use strict";
  var Fk = Xv();
  Qv.exports = Fk;
});
var zc = T((exports, module) => {
  "use strict";
  var yaml = e_(),
    engines = (exports = module.exports);
  engines.yaml = {parse: yaml.safeLoad.bind(yaml), stringify: yaml.safeDump.bind(yaml)};
  engines.json = {
    parse: JSON.parse.bind(JSON),
    stringify: function (e, t) {
      let r = Object.assign({replacer: null, space: 2}, t);
      return JSON.stringify(e, r.replacer, r.space);
    },
  };
  engines.javascript = {
    parse: function parse(str, options, wrap) {
      try {
        return (
          wrap !== !1 &&
            (str =
              `(function() {
return ` +
              str.trim() +
              `;
}());`),
          eval(str) || {}
        );
      } catch (e) {
        if (wrap !== !1 && /(unexpected|identifier)/i.test(e.message))
          return parse(str, options, !1);
        throw new SyntaxError(e);
      }
    },
    stringify: function () {
      throw new Error("stringifying JavaScript is not supported");
    },
  };
});
var r_ = T((zR, t_) => {
  "use strict";
  t_.exports = function (e) {
    return typeof e == "string" && e.charAt(0) === "\uFEFF" ? e.slice(1) : e;
  };
});
var Uo = T((Ct) => {
  "use strict";
  var n_ = r_(),
    i_ = ti();
  Ct.define = function (e, t, r) {
    Reflect.defineProperty(e, t, {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: r,
    });
  };
  Ct.isBuffer = function (e) {
    return i_(e) === "buffer";
  };
  Ct.isObject = function (e) {
    return i_(e) === "object";
  };
  Ct.toBuffer = function (e) {
    return typeof e == "string" ? Buffer.from(e) : e;
  };
  Ct.toString = function (e) {
    if (Ct.isBuffer(e)) return n_(String(e));
    if (typeof e != "string")
      throw new TypeError("expected input to be a string or buffer");
    return n_(e);
  };
  Ct.arrayify = function (e) {
    return e ? (Array.isArray(e) ? e : [e]) : [];
  };
  Ct.startsWith = function (e, t, r) {
    return typeof r != "number" && (r = t.length), e.slice(0, r) === t;
  };
});
var ci = T((DR, o_) => {
  "use strict";
  var Mk = zc(),
    Bk = Uo();
  o_.exports = function (e) {
    let t = Object.assign({}, e);
    return (
      (t.delimiters = Bk.arrayify(t.delims || t.delimiters || "---")),
      t.delimiters.length === 1 && t.delimiters.push(t.delimiters[0]),
      (t.language = (t.language || t.lang || "yaml").toLowerCase()),
      (t.engines = Object.assign({}, Mk, t.parsers, t.engines)),
      t
    );
  };
});
var Uc = T((LR, s_) => {
  "use strict";
  s_.exports = function (e, t) {
    let r = t.engines[e] || t.engines[Zk(e)];
    if (typeof r > "u")
      throw new Error('gray-matter engine "' + e + '" is not registered');
    return typeof r == "function" && (r = {parse: r}), r;
  };
  function Zk(e) {
    switch (e.toLowerCase()) {
      case "js":
      case "javascript":
        return "javascript";
      case "coffee":
      case "coffeescript":
      case "cson":
        return "coffee";
      case "yaml":
      case "yml":
        return "yaml";
      default:
        return e;
    }
  }
});
var Dc = T((FR, a_) => {
  "use strict";
  var qk = ti(),
    Vk = Uc(),
    Wk = ci();
  a_.exports = function (e, t, r) {
    if (t == null && r == null)
      switch (qk(e)) {
        case "object":
          (t = e.data), (r = {});
          break;
        case "string":
          return e;
        default:
          throw new TypeError("expected file to be a string or object");
      }
    let i = e.content,
      n = Wk(r);
    if (t == null) {
      if (!n.data) return e;
      t = n.data;
    }
    let o = e.language || n.language,
      s = Vk(o, n);
    if (typeof s.stringify != "function")
      throw new TypeError('expected "' + o + '.stringify" to be a function');
    t = Object.assign({}, e.data, t);
    let a = n.delimiters[0],
      c = n.delimiters[1],
      u = s.stringify(t, r).trim(),
      l = "";
    return (
      u !== "{}" && (l = Gr(a) + Gr(u) + Gr(c)),
      typeof e.excerpt == "string" &&
        e.excerpt !== "" &&
        i.indexOf(e.excerpt.trim()) === -1 &&
        (l += Gr(e.excerpt) + Gr(c)),
      l + Gr(i)
    );
  };
  function Gr(e) {
    return e.slice(-1) !==
      `
`
      ? e +
          `
`
      : e;
  }
});
var u_ = T((MR, c_) => {
  "use strict";
  var Jk = ci();
  c_.exports = function (e, t) {
    let r = Jk(t);
    if ((e.data == null && (e.data = {}), typeof r.excerpt == "function"))
      return r.excerpt(e, r);
    let i = e.data.excerpt_separator || r.excerpt_separator;
    if (i == null && (r.excerpt === !1 || r.excerpt == null)) return e;
    let n = typeof r.excerpt == "string" ? r.excerpt : i || r.delimiters[0],
      o = e.content.indexOf(n);
    return o !== -1 && (e.excerpt = e.content.slice(0, o)), e;
  };
});
var d_ = T((BR, h_) => {
  "use strict";
  var l_ = ti(),
    Kk = Dc(),
    Hr = Uo();
  h_.exports = function (e) {
    return (
      l_(e) !== "object" && (e = {content: e}),
      l_(e.data) !== "object" && (e.data = {}),
      e.contents && e.content == null && (e.content = e.contents),
      Hr.define(e, "orig", Hr.toBuffer(e.content)),
      Hr.define(e, "language", e.language || ""),
      Hr.define(e, "matter", e.matter || ""),
      Hr.define(e, "stringify", function (t, r) {
        return r && r.language && (e.language = r.language), Kk(e, t, r);
      }),
      (e.content = Hr.toString(e.content)),
      (e.isEmpty = !1),
      (e.excerpt = ""),
      e
    );
  };
});
var p_ = T((ZR, f_) => {
  "use strict";
  var Gk = Uc(),
    Hk = ci();
  f_.exports = function (e, t, r) {
    let i = Hk(r),
      n = Gk(e, i);
    if (typeof n.parse != "function")
      throw new TypeError('expected "' + e + '.parse" to be a function');
    return n.parse(t, i);
  };
});
var __ = T((qR, v_) => {
  "use strict";
  var Yk = require("fs"),
    Xk = ug(),
    Lc = ci(),
    Qk = Dc(),
    m_ = u_(),
    eA = zc(),
    tA = d_(),
    rA = p_(),
    g_ = Uo();
  function Ne(e, t) {
    if (e === "") return {data: {}, content: e, excerpt: "", orig: e};
    let r = tA(e),
      i = Ne.cache[r.content];
    if (!t) {
      if (i) return (r = Object.assign({}, i)), (r.orig = i.orig), r;
      Ne.cache[r.content] = r;
    }
    return nA(r, t);
  }
  function nA(e, t) {
    let r = Lc(t),
      i = r.delimiters[0],
      n =
        `
` + r.delimiters[1],
      o = e.content;
    r.language && (e.language = r.language);
    let s = i.length;
    if (!g_.startsWith(o, i, s)) return m_(e, r), e;
    if (o.charAt(s) === i.slice(-1)) return e;
    o = o.slice(s);
    let a = o.length,
      c = Ne.language(o, r);
    c.name && ((e.language = c.name), (o = o.slice(c.raw.length)));
    let u = o.indexOf(n);
    return (
      u === -1 && (u = a),
      (e.matter = o.slice(0, u)),
      e.matter.replace(/^\s*#[^\n]+/gm, "").trim() === ""
        ? ((e.isEmpty = !0), (e.empty = e.content), (e.data = {}))
        : (e.data = rA(e.language, e.matter, r)),
      u === a
        ? (e.content = "")
        : ((e.content = o.slice(u + n.length)),
          e.content[0] === "\r" && (e.content = e.content.slice(1)),
          e.content[0] ===
            `
` && (e.content = e.content.slice(1))),
      m_(e, r),
      (r.sections === !0 || typeof r.section == "function") && Xk(e, r.section),
      e
    );
  }
  Ne.engines = eA;
  Ne.stringify = function (e, t, r) {
    return typeof e == "string" && (e = Ne(e, r)), Qk(e, t, r);
  };
  Ne.read = function (e, t) {
    let r = Yk.readFileSync(e, "utf8"),
      i = Ne(r, t);
    return (i.path = e), i;
  };
  Ne.test = function (e, t) {
    return g_.startsWith(e, Lc(t).delimiters[0]);
  };
  Ne.language = function (e, t) {
    let i = Lc(t).delimiters[0];
    Ne.test(e) && (e = e.slice(i.length));
    let n = e.slice(0, e.search(/\r?\n/));
    return {raw: n, name: n ? n.trim() : ""};
  };
  Ne.cache = {};
  Ne.clearCache = function () {
    Ne.cache = {};
  };
  v_.exports = Ne;
});
var cw = T((j1, wa) => {
  (function () {
    "use strict";
    var e = "input is invalid type",
      t = typeof window == "object",
      r = t ? window : {};
    r.JS_SHA256_NO_WINDOW && (t = !1);
    var i = !t && typeof self == "object",
      n =
        !r.JS_SHA256_NO_NODE_JS &&
        typeof process == "object" &&
        process.versions &&
        process.versions.node &&
        process.type != "renderer";
    n ? (r = global) : i && (r = self);
    var o = !r.JS_SHA256_NO_COMMON_JS && typeof wa == "object" && wa.exports,
      s = typeof define == "function" && define.amd,
      a = !r.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u",
      c = "0123456789abcdef".split(""),
      u = [-2147483648, 8388608, 32768, 128],
      l = [24, 16, 8, 0],
      h = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882,
        2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993,
        338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051,
        2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
        3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556,
        883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222,
        2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
        3329325298,
      ],
      f = ["hex", "array", "digest", "arrayBuffer"],
      d = [];
    (r.JS_SHA256_NO_NODE_JS || !Array.isArray) &&
      (Array.isArray = function (_) {
        return Object.prototype.toString.call(_) === "[object Array]";
      }),
      a &&
        (r.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) &&
        (ArrayBuffer.isView = function (_) {
          return (
            typeof _ == "object" && _.buffer && _.buffer.constructor === ArrayBuffer
          );
        });
    var p = function (_, S) {
        return function (U) {
          return new b(S, !0).update(U)[_]();
        };
      },
      m = function (_) {
        var S = p("hex", _);
        n && (S = v(S, _)),
          (S.create = function () {
            return new b(_);
          }),
          (S.update = function (L) {
            return S.create().update(L);
          });
        for (var U = 0; U < f.length; ++U) {
          var I = f[U];
          S[I] = p(I, _);
        }
        return S;
      },
      v = function (_, S) {
        var U = require("crypto"),
          I = require("buffer").Buffer,
          L = S ? "sha224" : "sha256",
          j;
        I.from && !r.JS_SHA256_NO_BUFFER_FROM
          ? (j = I.from)
          : (j = function (O) {
              return new I(O);
            });
        var J = function (O) {
          if (typeof O == "string")
            return U.createHash(L).update(O, "utf8").digest("hex");
          if (O == null) throw new Error(e);
          return (
            O.constructor === ArrayBuffer && (O = new Uint8Array(O)),
            Array.isArray(O) || ArrayBuffer.isView(O) || O.constructor === I
              ? U.createHash(L).update(j(O)).digest("hex")
              : _(O)
          );
        };
        return J;
      },
      w = function (_, S) {
        return function (U, I) {
          return new x(U, S, !0).update(I)[_]();
        };
      },
      $ = function (_) {
        var S = w("hex", _);
        (S.create = function (L) {
          return new x(L, _);
        }),
          (S.update = function (L, j) {
            return S.create(L).update(j);
          });
        for (var U = 0; U < f.length; ++U) {
          var I = f[U];
          S[I] = w(I, _);
        }
        return S;
      };
    function b(_, S) {
      S
        ? ((d[0] =
            d[16] =
            d[1] =
            d[2] =
            d[3] =
            d[4] =
            d[5] =
            d[6] =
            d[7] =
            d[8] =
            d[9] =
            d[10] =
            d[11] =
            d[12] =
            d[13] =
            d[14] =
            d[15] =
              0),
          (this.blocks = d))
        : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        _
          ? ((this.h0 = 3238371032),
            (this.h1 = 914150663),
            (this.h2 = 812702999),
            (this.h3 = 4144912697),
            (this.h4 = 4290775857),
            (this.h5 = 1750603025),
            (this.h6 = 1694076839),
            (this.h7 = 3204075428))
          : ((this.h0 = 1779033703),
            (this.h1 = 3144134277),
            (this.h2 = 1013904242),
            (this.h3 = 2773480762),
            (this.h4 = 1359893119),
            (this.h5 = 2600822924),
            (this.h6 = 528734635),
            (this.h7 = 1541459225)),
        (this.block = this.start = this.bytes = this.hBytes = 0),
        (this.finalized = this.hashed = !1),
        (this.first = !0),
        (this.is224 = _);
    }
    (b.prototype.update = function (_) {
      if (!this.finalized) {
        var S,
          U = typeof _;
        if (U !== "string") {
          if (U === "object") {
            if (_ === null) throw new Error(e);
            if (a && _.constructor === ArrayBuffer) _ = new Uint8Array(_);
            else if (!Array.isArray(_) && (!a || !ArrayBuffer.isView(_)))
              throw new Error(e);
          } else throw new Error(e);
          S = !0;
        }
        for (var I, L = 0, j, J = _.length, O = this.blocks; L < J; ) {
          if (
            (this.hashed &&
              ((this.hashed = !1),
              (O[0] = this.block),
              (this.block =
                O[16] =
                O[1] =
                O[2] =
                O[3] =
                O[4] =
                O[5] =
                O[6] =
                O[7] =
                O[8] =
                O[9] =
                O[10] =
                O[11] =
                O[12] =
                O[13] =
                O[14] =
                O[15] =
                  0)),
            S)
          )
            for (j = this.start; L < J && j < 64; ++L) O[j >>> 2] |= _[L] << l[j++ & 3];
          else
            for (j = this.start; L < J && j < 64; ++L)
              (I = _.charCodeAt(L)),
                I < 128
                  ? (O[j >>> 2] |= I << l[j++ & 3])
                  : I < 2048
                    ? ((O[j >>> 2] |= (192 | (I >>> 6)) << l[j++ & 3]),
                      (O[j >>> 2] |= (128 | (I & 63)) << l[j++ & 3]))
                    : I < 55296 || I >= 57344
                      ? ((O[j >>> 2] |= (224 | (I >>> 12)) << l[j++ & 3]),
                        (O[j >>> 2] |= (128 | ((I >>> 6) & 63)) << l[j++ & 3]),
                        (O[j >>> 2] |= (128 | (I & 63)) << l[j++ & 3]))
                      : ((I =
                          65536 + (((I & 1023) << 10) | (_.charCodeAt(++L) & 1023))),
                        (O[j >>> 2] |= (240 | (I >>> 18)) << l[j++ & 3]),
                        (O[j >>> 2] |= (128 | ((I >>> 12) & 63)) << l[j++ & 3]),
                        (O[j >>> 2] |= (128 | ((I >>> 6) & 63)) << l[j++ & 3]),
                        (O[j >>> 2] |= (128 | (I & 63)) << l[j++ & 3]));
          (this.lastByteIndex = j),
            (this.bytes += j - this.start),
            j >= 64
              ? ((this.block = O[16]),
                (this.start = j - 64),
                this.hash(),
                (this.hashed = !0))
              : (this.start = j);
        }
        return (
          this.bytes > 4294967295 &&
            ((this.hBytes += (this.bytes / 4294967296) << 0),
            (this.bytes = this.bytes % 4294967296)),
          this
        );
      }
    }),
      (b.prototype.finalize = function () {
        if (!this.finalized) {
          this.finalized = !0;
          var _ = this.blocks,
            S = this.lastByteIndex;
          (_[16] = this.block),
            (_[S >>> 2] |= u[S & 3]),
            (this.block = _[16]),
            S >= 56 &&
              (this.hashed || this.hash(),
              (_[0] = this.block),
              (_[16] =
                _[1] =
                _[2] =
                _[3] =
                _[4] =
                _[5] =
                _[6] =
                _[7] =
                _[8] =
                _[9] =
                _[10] =
                _[11] =
                _[12] =
                _[13] =
                _[14] =
                _[15] =
                  0)),
            (_[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
            (_[15] = this.bytes << 3),
            this.hash();
        }
      }),
      (b.prototype.hash = function () {
        var _ = this.h0,
          S = this.h1,
          U = this.h2,
          I = this.h3,
          L = this.h4,
          j = this.h5,
          J = this.h6,
          O = this.h7,
          K = this.blocks,
          le,
          qe,
          Ve,
          Ft,
          Y,
          Mt,
          Bt,
          Dn,
          Qa,
          ec,
          ro;
        for (le = 16; le < 64; ++le)
          (Y = K[le - 15]),
            (qe = ((Y >>> 7) | (Y << 25)) ^ ((Y >>> 18) | (Y << 14)) ^ (Y >>> 3)),
            (Y = K[le - 2]),
            (Ve = ((Y >>> 17) | (Y << 15)) ^ ((Y >>> 19) | (Y << 13)) ^ (Y >>> 10)),
            (K[le] = (K[le - 16] + qe + K[le - 7] + Ve) << 0);
        for (ro = S & U, le = 0; le < 64; le += 4)
          this.first
            ? (this.is224
                ? ((Dn = 300032),
                  (Y = K[0] - 1413257819),
                  (O = (Y - 150054599) << 0),
                  (I = (Y + 24177077) << 0))
                : ((Dn = 704751109),
                  (Y = K[0] - 210244248),
                  (O = (Y - 1521486534) << 0),
                  (I = (Y + 143694565) << 0)),
              (this.first = !1))
            : ((qe =
                ((_ >>> 2) | (_ << 30)) ^
                ((_ >>> 13) | (_ << 19)) ^
                ((_ >>> 22) | (_ << 10))),
              (Ve =
                ((L >>> 6) | (L << 26)) ^
                ((L >>> 11) | (L << 21)) ^
                ((L >>> 25) | (L << 7))),
              (Dn = _ & S),
              (Ft = Dn ^ (_ & U) ^ ro),
              (Bt = (L & j) ^ (~L & J)),
              (Y = O + Ve + Bt + h[le] + K[le]),
              (Mt = qe + Ft),
              (O = (I + Y) << 0),
              (I = (Y + Mt) << 0)),
            (qe =
              ((I >>> 2) | (I << 30)) ^
              ((I >>> 13) | (I << 19)) ^
              ((I >>> 22) | (I << 10))),
            (Ve =
              ((O >>> 6) | (O << 26)) ^
              ((O >>> 11) | (O << 21)) ^
              ((O >>> 25) | (O << 7))),
            (Qa = I & _),
            (Ft = Qa ^ (I & S) ^ Dn),
            (Bt = (O & L) ^ (~O & j)),
            (Y = J + Ve + Bt + h[le + 1] + K[le + 1]),
            (Mt = qe + Ft),
            (J = (U + Y) << 0),
            (U = (Y + Mt) << 0),
            (qe =
              ((U >>> 2) | (U << 30)) ^
              ((U >>> 13) | (U << 19)) ^
              ((U >>> 22) | (U << 10))),
            (Ve =
              ((J >>> 6) | (J << 26)) ^
              ((J >>> 11) | (J << 21)) ^
              ((J >>> 25) | (J << 7))),
            (ec = U & I),
            (Ft = ec ^ (U & _) ^ Qa),
            (Bt = (J & O) ^ (~J & L)),
            (Y = j + Ve + Bt + h[le + 2] + K[le + 2]),
            (Mt = qe + Ft),
            (j = (S + Y) << 0),
            (S = (Y + Mt) << 0),
            (qe =
              ((S >>> 2) | (S << 30)) ^
              ((S >>> 13) | (S << 19)) ^
              ((S >>> 22) | (S << 10))),
            (Ve =
              ((j >>> 6) | (j << 26)) ^
              ((j >>> 11) | (j << 21)) ^
              ((j >>> 25) | (j << 7))),
            (ro = S & U),
            (Ft = ro ^ (S & I) ^ ec),
            (Bt = (j & J) ^ (~j & O)),
            (Y = L + Ve + Bt + h[le + 3] + K[le + 3]),
            (Mt = qe + Ft),
            (L = (_ + Y) << 0),
            (_ = (Y + Mt) << 0),
            (this.chromeBugWorkAround = !0);
        (this.h0 = (this.h0 + _) << 0),
          (this.h1 = (this.h1 + S) << 0),
          (this.h2 = (this.h2 + U) << 0),
          (this.h3 = (this.h3 + I) << 0),
          (this.h4 = (this.h4 + L) << 0),
          (this.h5 = (this.h5 + j) << 0),
          (this.h6 = (this.h6 + J) << 0),
          (this.h7 = (this.h7 + O) << 0);
      }),
      (b.prototype.hex = function () {
        this.finalize();
        var _ = this.h0,
          S = this.h1,
          U = this.h2,
          I = this.h3,
          L = this.h4,
          j = this.h5,
          J = this.h6,
          O = this.h7,
          K =
            c[(_ >>> 28) & 15] +
            c[(_ >>> 24) & 15] +
            c[(_ >>> 20) & 15] +
            c[(_ >>> 16) & 15] +
            c[(_ >>> 12) & 15] +
            c[(_ >>> 8) & 15] +
            c[(_ >>> 4) & 15] +
            c[_ & 15] +
            c[(S >>> 28) & 15] +
            c[(S >>> 24) & 15] +
            c[(S >>> 20) & 15] +
            c[(S >>> 16) & 15] +
            c[(S >>> 12) & 15] +
            c[(S >>> 8) & 15] +
            c[(S >>> 4) & 15] +
            c[S & 15] +
            c[(U >>> 28) & 15] +
            c[(U >>> 24) & 15] +
            c[(U >>> 20) & 15] +
            c[(U >>> 16) & 15] +
            c[(U >>> 12) & 15] +
            c[(U >>> 8) & 15] +
            c[(U >>> 4) & 15] +
            c[U & 15] +
            c[(I >>> 28) & 15] +
            c[(I >>> 24) & 15] +
            c[(I >>> 20) & 15] +
            c[(I >>> 16) & 15] +
            c[(I >>> 12) & 15] +
            c[(I >>> 8) & 15] +
            c[(I >>> 4) & 15] +
            c[I & 15] +
            c[(L >>> 28) & 15] +
            c[(L >>> 24) & 15] +
            c[(L >>> 20) & 15] +
            c[(L >>> 16) & 15] +
            c[(L >>> 12) & 15] +
            c[(L >>> 8) & 15] +
            c[(L >>> 4) & 15] +
            c[L & 15] +
            c[(j >>> 28) & 15] +
            c[(j >>> 24) & 15] +
            c[(j >>> 20) & 15] +
            c[(j >>> 16) & 15] +
            c[(j >>> 12) & 15] +
            c[(j >>> 8) & 15] +
            c[(j >>> 4) & 15] +
            c[j & 15] +
            c[(J >>> 28) & 15] +
            c[(J >>> 24) & 15] +
            c[(J >>> 20) & 15] +
            c[(J >>> 16) & 15] +
            c[(J >>> 12) & 15] +
            c[(J >>> 8) & 15] +
            c[(J >>> 4) & 15] +
            c[J & 15];
        return (
          this.is224 ||
            (K +=
              c[(O >>> 28) & 15] +
              c[(O >>> 24) & 15] +
              c[(O >>> 20) & 15] +
              c[(O >>> 16) & 15] +
              c[(O >>> 12) & 15] +
              c[(O >>> 8) & 15] +
              c[(O >>> 4) & 15] +
              c[O & 15]),
          K
        );
      }),
      (b.prototype.toString = b.prototype.hex),
      (b.prototype.digest = function () {
        this.finalize();
        var _ = this.h0,
          S = this.h1,
          U = this.h2,
          I = this.h3,
          L = this.h4,
          j = this.h5,
          J = this.h6,
          O = this.h7,
          K = [
            (_ >>> 24) & 255,
            (_ >>> 16) & 255,
            (_ >>> 8) & 255,
            _ & 255,
            (S >>> 24) & 255,
            (S >>> 16) & 255,
            (S >>> 8) & 255,
            S & 255,
            (U >>> 24) & 255,
            (U >>> 16) & 255,
            (U >>> 8) & 255,
            U & 255,
            (I >>> 24) & 255,
            (I >>> 16) & 255,
            (I >>> 8) & 255,
            I & 255,
            (L >>> 24) & 255,
            (L >>> 16) & 255,
            (L >>> 8) & 255,
            L & 255,
            (j >>> 24) & 255,
            (j >>> 16) & 255,
            (j >>> 8) & 255,
            j & 255,
            (J >>> 24) & 255,
            (J >>> 16) & 255,
            (J >>> 8) & 255,
            J & 255,
          ];
        return (
          this.is224 ||
            K.push((O >>> 24) & 255, (O >>> 16) & 255, (O >>> 8) & 255, O & 255),
          K
        );
      }),
      (b.prototype.array = b.prototype.digest),
      (b.prototype.arrayBuffer = function () {
        this.finalize();
        var _ = new ArrayBuffer(this.is224 ? 28 : 32),
          S = new DataView(_);
        return (
          S.setUint32(0, this.h0),
          S.setUint32(4, this.h1),
          S.setUint32(8, this.h2),
          S.setUint32(12, this.h3),
          S.setUint32(16, this.h4),
          S.setUint32(20, this.h5),
          S.setUint32(24, this.h6),
          this.is224 || S.setUint32(28, this.h7),
          _
        );
      });
    function x(_, S, U) {
      var I,
        L = typeof _;
      if (L === "string") {
        var j = [],
          J = _.length,
          O = 0,
          K;
        for (I = 0; I < J; ++I)
          (K = _.charCodeAt(I)),
            K < 128
              ? (j[O++] = K)
              : K < 2048
                ? ((j[O++] = 192 | (K >>> 6)), (j[O++] = 128 | (K & 63)))
                : K < 55296 || K >= 57344
                  ? ((j[O++] = 224 | (K >>> 12)),
                    (j[O++] = 128 | ((K >>> 6) & 63)),
                    (j[O++] = 128 | (K & 63)))
                  : ((K = 65536 + (((K & 1023) << 10) | (_.charCodeAt(++I) & 1023))),
                    (j[O++] = 240 | (K >>> 18)),
                    (j[O++] = 128 | ((K >>> 12) & 63)),
                    (j[O++] = 128 | ((K >>> 6) & 63)),
                    (j[O++] = 128 | (K & 63)));
        _ = j;
      } else if (L === "object") {
        if (_ === null) throw new Error(e);
        if (a && _.constructor === ArrayBuffer) _ = new Uint8Array(_);
        else if (!Array.isArray(_) && (!a || !ArrayBuffer.isView(_)))
          throw new Error(e);
      } else throw new Error(e);
      _.length > 64 && (_ = new b(S, !0).update(_).array());
      var le = [],
        qe = [];
      for (I = 0; I < 64; ++I) {
        var Ve = _[I] || 0;
        (le[I] = 92 ^ Ve), (qe[I] = 54 ^ Ve);
      }
      b.call(this, S, U),
        this.update(qe),
        (this.oKeyPad = le),
        (this.inner = !0),
        (this.sharedMemory = U);
    }
    (x.prototype = new b()),
      (x.prototype.finalize = function () {
        if ((b.prototype.finalize.call(this), this.inner)) {
          this.inner = !1;
          var _ = this.array();
          b.call(this, this.is224, this.sharedMemory),
            this.update(this.oKeyPad),
            this.update(_),
            b.prototype.finalize.call(this);
        }
      });
    var D = m();
    (D.sha256 = D),
      (D.sha224 = m(!0)),
      (D.sha256.hmac = $()),
      (D.sha224.hmac = $(!0)),
      o
        ? (wa.exports = D)
        : ((r.sha256 = D.sha256),
          (r.sha224 = D.sha224),
          s &&
            define(function () {
              return D;
            }));
  })();
});
var it = {};
lt(it, {
  __addDisposableResource: () => zw,
  __assign: () => xa,
  __asyncDelegator: () => Iw,
  __asyncGenerator: () => Aw,
  __asyncValues: () => Ow,
  __await: () => In,
  __awaiter: () => ww,
  __classPrivateFieldGet: () => Nw,
  __classPrivateFieldIn: () => Cw,
  __classPrivateFieldSet: () => Rw,
  __createBinding: () => $a,
  __decorate: () => pw,
  __disposeResources: () => Uw,
  __esDecorate: () => gw,
  __exportStar: () => Sw,
  __extends: () => dw,
  __generator: () => xw,
  __importDefault: () => Pw,
  __importStar: () => jw,
  __makeTemplateObject: () => Tw,
  __metadata: () => bw,
  __param: () => mw,
  __propKey: () => _w,
  __read: () => Mf,
  __rest: () => fw,
  __rewriteRelativeImportExtension: () => Dw,
  __runInitializers: () => vw,
  __setFunctionName: () => yw,
  __spread: () => $w,
  __spreadArray: () => kw,
  __spreadArrays: () => Ew,
  __values: () => Sa,
  default: () => YO,
});
function dw(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Class extends value " + String(t) + " is not a constructor or null",
    );
  Lf(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : ((r.prototype = t.prototype), new r());
}
function fw(e, t) {
  var r = {};
  for (var i in e)
    Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (r[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(e); n < i.length; n++)
      t.indexOf(i[n]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, i[n]) &&
        (r[i[n]] = e[i[n]]);
  return r;
}
function pw(e, t, r, i) {
  var n = arguments.length,
    o = n < 3 ? t : i === null ? (i = Object.getOwnPropertyDescriptor(t, r)) : i,
    s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    o = Reflect.decorate(e, t, r, i);
  else
    for (var a = e.length - 1; a >= 0; a--)
      (s = e[a]) && (o = (n < 3 ? s(o) : n > 3 ? s(t, r, o) : s(t, r)) || o);
  return n > 3 && o && Object.defineProperty(t, r, o), o;
}
function mw(e, t) {
  return function (r, i) {
    t(r, i, e);
  };
}
function gw(e, t, r, i, n, o) {
  function s(w) {
    if (w !== void 0 && typeof w != "function")
      throw new TypeError("Function expected");
    return w;
  }
  for (
    var a = i.kind,
      c = a === "getter" ? "get" : a === "setter" ? "set" : "value",
      u = !t && e ? (i.static ? e : e.prototype) : null,
      l = t || (u ? Object.getOwnPropertyDescriptor(u, i.name) : {}),
      h,
      f = !1,
      d = r.length - 1;
    d >= 0;
    d--
  ) {
    var p = {};
    for (var m in i) p[m] = m === "access" ? {} : i[m];
    for (var m in i.access) p.access[m] = i.access[m];
    p.addInitializer = function (w) {
      if (f)
        throw new TypeError("Cannot add initializers after decoration has completed");
      o.push(s(w || null));
    };
    var v = (0, r[d])(a === "accessor" ? {get: l.get, set: l.set} : l[c], p);
    if (a === "accessor") {
      if (v === void 0) continue;
      if (v === null || typeof v != "object") throw new TypeError("Object expected");
      (h = s(v.get)) && (l.get = h),
        (h = s(v.set)) && (l.set = h),
        (h = s(v.init)) && n.unshift(h);
    } else (h = s(v)) && (a === "field" ? n.unshift(h) : (l[c] = h));
  }
  u && Object.defineProperty(u, i.name, l), (f = !0);
}
function vw(e, t, r) {
  for (var i = arguments.length > 2, n = 0; n < t.length; n++)
    r = i ? t[n].call(e, r) : t[n].call(e);
  return i ? r : void 0;
}
function _w(e) {
  return typeof e == "symbol" ? e : "".concat(e);
}
function yw(e, t, r) {
  return (
    typeof t == "symbol" && (t = t.description ? "[".concat(t.description, "]") : ""),
    Object.defineProperty(e, "name", {
      configurable: !0,
      value: r ? "".concat(r, " ", t) : t,
    })
  );
}
function bw(e, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(e, t);
}
function ww(e, t, r, i) {
  function n(o) {
    return o instanceof r
      ? o
      : new r(function (s) {
          s(o);
        });
  }
  return new (r || (r = Promise))(function (o, s) {
    function a(l) {
      try {
        u(i.next(l));
      } catch (h) {
        s(h);
      }
    }
    function c(l) {
      try {
        u(i.throw(l));
      } catch (h) {
        s(h);
      }
    }
    function u(l) {
      l.done ? o(l.value) : n(l.value).then(a, c);
    }
    u((i = i.apply(e, t || [])).next());
  });
}
function xw(e, t) {
  var r = {
      label: 0,
      sent: function () {
        if (o[0] & 1) throw o[1];
        return o[1];
      },
      trys: [],
      ops: [],
    },
    i,
    n,
    o,
    s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return (
    (s.next = a(0)),
    (s.throw = a(1)),
    (s.return = a(2)),
    typeof Symbol == "function" &&
      (s[Symbol.iterator] = function () {
        return this;
      }),
    s
  );
  function a(u) {
    return function (l) {
      return c([u, l]);
    };
  }
  function c(u) {
    if (i) throw new TypeError("Generator is already executing.");
    for (; s && ((s = 0), u[0] && (r = 0)), r; )
      try {
        if (
          ((i = 1),
          n &&
            (o =
              u[0] & 2
                ? n.return
                : u[0]
                  ? n.throw || ((o = n.return) && o.call(n), 0)
                  : n.next) &&
            !(o = o.call(n, u[1])).done)
        )
          return o;
        switch (((n = 0), o && (u = [u[0] & 2, o.value]), u[0])) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return r.label++, {value: u[1], done: !1};
          case 5:
            r.label++, (n = u[1]), (u = [0]);
            continue;
          case 7:
            (u = r.ops.pop()), r.trys.pop();
            continue;
          default:
            if (
              ((o = r.trys),
              !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2))
            ) {
              r = 0;
              continue;
            }
            if (u[0] === 3 && (!o || (u[1] > o[0] && u[1] < o[3]))) {
              r.label = u[1];
              break;
            }
            if (u[0] === 6 && r.label < o[1]) {
              (r.label = o[1]), (o = u);
              break;
            }
            if (o && r.label < o[2]) {
              (r.label = o[2]), r.ops.push(u);
              break;
            }
            o[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        u = t.call(e, r);
      } catch (l) {
        (u = [6, l]), (n = 0);
      } finally {
        i = o = 0;
      }
    if (u[0] & 5) throw u[1];
    return {value: u[0] ? u[1] : void 0, done: !0};
  }
}
function Sw(e, t) {
  for (var r in e)
    r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && $a(t, e, r);
}
function Sa(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    r = t && e[t],
    i = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return e && i >= e.length && (e = void 0), {value: e && e[i++], done: !e};
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function Mf(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var i = r.call(e),
    n,
    o = [],
    s;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = i.next()).done; ) o.push(n.value);
  } catch (a) {
    s = {error: a};
  } finally {
    try {
      n && !n.done && (r = i.return) && r.call(i);
    } finally {
      if (s) throw s.error;
    }
  }
  return o;
}
function $w() {
  for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(Mf(arguments[t]));
  return e;
}
function Ew() {
  for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
  for (var i = Array(e), n = 0, t = 0; t < r; t++)
    for (var o = arguments[t], s = 0, a = o.length; s < a; s++, n++) i[n] = o[s];
  return i;
}
function kw(e, t, r) {
  if (r || arguments.length === 2)
    for (var i = 0, n = t.length, o; i < n; i++)
      (o || !(i in t)) &&
        (o || (o = Array.prototype.slice.call(t, 0, i)), (o[i] = t[i]));
  return e.concat(o || Array.prototype.slice.call(t));
}
function In(e) {
  return this instanceof In ? ((this.v = e), this) : new In(e);
}
function Aw(e, t, r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = r.apply(e, t || []),
    n,
    o = [];
  return (
    (n = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype,
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (n[Symbol.asyncIterator] = function () {
      return this;
    }),
    n
  );
  function s(d) {
    return function (p) {
      return Promise.resolve(p).then(d, h);
    };
  }
  function a(d, p) {
    i[d] &&
      ((n[d] = function (m) {
        return new Promise(function (v, w) {
          o.push([d, m, v, w]) > 1 || c(d, m);
        });
      }),
      p && (n[d] = p(n[d])));
  }
  function c(d, p) {
    try {
      u(i[d](p));
    } catch (m) {
      f(o[0][3], m);
    }
  }
  function u(d) {
    d.value instanceof In ? Promise.resolve(d.value.v).then(l, h) : f(o[0][2], d);
  }
  function l(d) {
    c("next", d);
  }
  function h(d) {
    c("throw", d);
  }
  function f(d, p) {
    d(p), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function Iw(e) {
  var t, r;
  return (
    (t = {}),
    i("next"),
    i("throw", function (n) {
      throw n;
    }),
    i("return"),
    (t[Symbol.iterator] = function () {
      return this;
    }),
    t
  );
  function i(n, o) {
    t[n] = e[n]
      ? function (s) {
          return (r = !r) ? {value: In(e[n](s)), done: !1} : o ? o(s) : s;
        }
      : o;
  }
}
function Ow(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    r;
  return t
    ? t.call(e)
    : ((e = typeof Sa == "function" ? Sa(e) : e[Symbol.iterator]()),
      (r = {}),
      i("next"),
      i("throw"),
      i("return"),
      (r[Symbol.asyncIterator] = function () {
        return this;
      }),
      r);
  function i(o) {
    r[o] =
      e[o] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[o](s)), n(a, c, s.done, s.value);
        });
      };
  }
  function n(o, s, a, c) {
    Promise.resolve(c).then(function (u) {
      o({value: u, done: a});
    }, s);
  }
}
function Tw(e, t) {
  return (
    Object.defineProperty ? Object.defineProperty(e, "raw", {value: t}) : (e.raw = t), e
  );
}
function jw(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (e != null)
    for (var r = Ff(e), i = 0; i < r.length; i++) r[i] !== "default" && $a(t, e, r[i]);
  return GO(t, e), t;
}
function Pw(e) {
  return e && e.__esModule ? e : {default: e};
}
function Nw(e, t, r, i) {
  if (r === "a" && !i)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !i : !t.has(e))
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  return r === "m" ? i : r === "a" ? i.call(e) : i ? i.value : t.get(e);
}
function Rw(e, t, r, i, n) {
  if (i === "m") throw new TypeError("Private method is not writable");
  if (i === "a" && !n)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !n : !t.has(e))
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  return i === "a" ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r;
}
function Cw(e, t) {
  if (t === null || (typeof t != "object" && typeof t != "function"))
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof e == "function" ? t === e : e.has(t);
}
function zw(e, t, r) {
  if (t != null) {
    if (typeof t != "object" && typeof t != "function")
      throw new TypeError("Object expected.");
    var i, n;
    if (r) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      i = t[Symbol.asyncDispose];
    }
    if (i === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      (i = t[Symbol.dispose]), r && (n = i);
    }
    if (typeof i != "function") throw new TypeError("Object not disposable.");
    n &&
      (i = function () {
        try {
          n.call(this);
        } catch (o) {
          return Promise.reject(o);
        }
      }),
      e.stack.push({value: t, dispose: i, async: r});
  } else r && e.stack.push({async: !0});
  return t;
}
function Uw(e) {
  function t(o) {
    (e.error = e.hasError
      ? new HO(o, e.error, "An error was suppressed during disposal.")
      : o),
      (e.hasError = !0);
  }
  var r,
    i = 0;
  function n() {
    for (; (r = e.stack.pop()); )
      try {
        if (!r.async && i === 1)
          return (i = 0), e.stack.push(r), Promise.resolve().then(n);
        if (r.dispose) {
          var o = r.dispose.call(r.value);
          if (r.async)
            return (
              (i |= 2),
              Promise.resolve(o).then(n, function (s) {
                return t(s), n();
              })
            );
        } else i |= 1;
      } catch (s) {
        t(s);
      }
    if (i === 1) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
    if (e.hasError) throw e.error;
  }
  return n();
}
function Dw(e, t) {
  return typeof e == "string" && /^\.\.?\//.test(e)
    ? e.replace(
        /\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
        function (r, i, n, o, s) {
          return i
            ? t
              ? ".jsx"
              : ".js"
            : n && (!o || !s)
              ? r
              : n + o + "." + s.toLowerCase() + "js";
        },
      )
    : e;
}
var Lf,
  xa,
  $a,
  GO,
  Ff,
  HO,
  YO,
  ot = ix(() => {
    Lf = function (e, t) {
      return (
        (Lf =
          Object.setPrototypeOf ||
          ({__proto__: []} instanceof Array &&
            function (r, i) {
              r.__proto__ = i;
            }) ||
          function (r, i) {
            for (var n in i)
              Object.prototype.hasOwnProperty.call(i, n) && (r[n] = i[n]);
          }),
        Lf(e, t)
      );
    };
    xa = function () {
      return (
        (xa =
          Object.assign ||
          function (t) {
            for (var r, i = 1, n = arguments.length; i < n; i++) {
              r = arguments[i];
              for (var o in r)
                Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
            }
            return t;
          }),
        xa.apply(this, arguments)
      );
    };
    $a = Object.create
      ? function (e, t, r, i) {
          i === void 0 && (i = r);
          var n = Object.getOwnPropertyDescriptor(t, r);
          (!n || ("get" in n ? !t.__esModule : n.writable || n.configurable)) &&
            (n = {
              enumerable: !0,
              get: function () {
                return t[r];
              },
            }),
            Object.defineProperty(e, i, n);
        }
      : function (e, t, r, i) {
          i === void 0 && (i = r), (e[i] = t[r]);
        };
    (GO = Object.create
      ? function (e, t) {
          Object.defineProperty(e, "default", {enumerable: !0, value: t});
        }
      : function (e, t) {
          e.default = t;
        }),
      (Ff = function (e) {
        return (
          (Ff =
            Object.getOwnPropertyNames ||
            function (t) {
              var r = [];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (r[r.length] = i);
              return r;
            }),
          Ff(e)
        );
      });
    HO =
      typeof SuppressedError == "function"
        ? SuppressedError
        : function (e, t, r) {
            var i = new Error(r);
            return (i.name = "SuppressedError"), (i.error = e), (i.suppressed = t), i;
          };
    YO = {
      __extends: dw,
      __assign: xa,
      __rest: fw,
      __decorate: pw,
      __param: mw,
      __esDecorate: gw,
      __runInitializers: vw,
      __propKey: _w,
      __setFunctionName: yw,
      __metadata: bw,
      __awaiter: ww,
      __generator: xw,
      __createBinding: $a,
      __exportStar: Sw,
      __values: Sa,
      __read: Mf,
      __spread: $w,
      __spreadArrays: Ew,
      __spreadArray: kw,
      __await: In,
      __asyncGenerator: Aw,
      __asyncDelegator: Iw,
      __asyncValues: Ow,
      __makeTemplateObject: Tw,
      __importStar: jw,
      __importDefault: Pw,
      __classPrivateFieldGet: Nw,
      __classPrivateFieldSet: Rw,
      __classPrivateFieldIn: Cw,
      __addDisposableResource: zw,
      __disposeResources: Uw,
      __rewriteRelativeImportExtension: Dw,
    };
  });
var Lw = T((Ea) => {
  "use strict";
  Object.defineProperty(Ea, "__esModule", {value: !0});
  Ea.resolveFetch = void 0;
  var XO = (e) => (e ? (...t) => e(...t) : (...t) => fetch(...t));
  Ea.resolveFetch = XO;
});
var Vf = T((st) => {
  "use strict";
  Object.defineProperty(st, "__esModule", {value: !0});
  st.FunctionRegion =
    st.FunctionsHttpError =
    st.FunctionsRelayError =
    st.FunctionsFetchError =
    st.FunctionsError =
      void 0;
  var On = class extends Error {
    constructor(t, r = "FunctionsError", i) {
      super(t), (this.name = r), (this.context = i);
    }
  };
  st.FunctionsError = On;
  var Bf = class extends On {
    constructor(t) {
      super("Failed to send a request to the Edge Function", "FunctionsFetchError", t);
    }
  };
  st.FunctionsFetchError = Bf;
  var Zf = class extends On {
    constructor(t) {
      super("Relay Error invoking the Edge Function", "FunctionsRelayError", t);
    }
  };
  st.FunctionsRelayError = Zf;
  var qf = class extends On {
    constructor(t) {
      super("Edge Function returned a non-2xx status code", "FunctionsHttpError", t);
    }
  };
  st.FunctionsHttpError = qf;
  var Fw;
  (function (e) {
    (e.Any = "any"),
      (e.ApNortheast1 = "ap-northeast-1"),
      (e.ApNortheast2 = "ap-northeast-2"),
      (e.ApSouth1 = "ap-south-1"),
      (e.ApSoutheast1 = "ap-southeast-1"),
      (e.ApSoutheast2 = "ap-southeast-2"),
      (e.CaCentral1 = "ca-central-1"),
      (e.EuCentral1 = "eu-central-1"),
      (e.EuWest1 = "eu-west-1"),
      (e.EuWest2 = "eu-west-2"),
      (e.EuWest3 = "eu-west-3"),
      (e.SaEast1 = "sa-east-1"),
      (e.UsEast1 = "us-east-1"),
      (e.UsWest1 = "us-west-1"),
      (e.UsWest2 = "us-west-2");
  })(Fw || (st.FunctionRegion = Fw = {}));
});
var Mw = T((ka) => {
  "use strict";
  Object.defineProperty(ka, "__esModule", {value: !0});
  ka.FunctionsClient = void 0;
  var QO = (ot(), ht(it)),
    eT = Lw(),
    Tn = Vf(),
    Wf = class {
      constructor(
        t,
        {headers: r = {}, customFetch: i, region: n = Tn.FunctionRegion.Any} = {},
      ) {
        (this.url = t),
          (this.headers = r),
          (this.region = n),
          (this.fetch = (0, eT.resolveFetch)(i));
      }
      setAuth(t) {
        this.headers.Authorization = `Bearer ${t}`;
      }
      invoke(t) {
        return QO.__awaiter(this, arguments, void 0, function* (r, i = {}) {
          var n;
          let o, s;
          try {
            let {headers: a, method: c, body: u, signal: l, timeout: h} = i,
              f = {},
              {region: d} = i;
            d || (d = this.region);
            let p = new URL(`${this.url}/${r}`);
            d &&
              d !== "any" &&
              ((f["x-region"] = d), p.searchParams.set("forceFunctionRegion", d));
            let m;
            u && ((a && !Object.prototype.hasOwnProperty.call(a, "Content-Type")) || !a)
              ? (typeof Blob < "u" && u instanceof Blob) || u instanceof ArrayBuffer
                ? ((f["Content-Type"] = "application/octet-stream"), (m = u))
                : typeof u == "string"
                  ? ((f["Content-Type"] = "text/plain"), (m = u))
                  : typeof FormData < "u" && u instanceof FormData
                    ? (m = u)
                    : ((f["Content-Type"] = "application/json"),
                      (m = JSON.stringify(u)))
              : (m = u);
            let v = l;
            h &&
              ((s = new AbortController()),
              (o = setTimeout(() => s.abort(), h)),
              l
                ? ((v = s.signal), l.addEventListener("abort", () => s.abort()))
                : (v = s.signal));
            let w = yield this.fetch(p.toString(), {
                method: c || "POST",
                headers: Object.assign(
                  Object.assign(Object.assign({}, f), this.headers),
                  a,
                ),
                body: m,
                signal: v,
              }).catch((D) => {
                throw new Tn.FunctionsFetchError(D);
              }),
              $ = w.headers.get("x-relay-error");
            if ($ && $ === "true") throw new Tn.FunctionsRelayError(w);
            if (!w.ok) throw new Tn.FunctionsHttpError(w);
            let b = (
                (n = w.headers.get("Content-Type")) !== null && n !== void 0
                  ? n
                  : "text/plain"
              )
                .split(";")[0]
                .trim(),
              x;
            return (
              b === "application/json"
                ? (x = yield w.json())
                : b === "application/octet-stream" || b === "application/pdf"
                  ? (x = yield w.blob())
                  : b === "text/event-stream"
                    ? (x = w)
                    : b === "multipart/form-data"
                      ? (x = yield w.formData())
                      : (x = yield w.text()),
              {data: x, error: null, response: w}
            );
          } catch (a) {
            return {
              data: null,
              error: a,
              response:
                a instanceof Tn.FunctionsHttpError ||
                a instanceof Tn.FunctionsRelayError
                  ? a.context
                  : void 0,
            };
          } finally {
            o && clearTimeout(o);
          }
        });
      }
    };
  ka.FunctionsClient = Wf;
});
var Bw = T((Be) => {
  "use strict";
  Object.defineProperty(Be, "__esModule", {value: !0});
  Be.FunctionRegion =
    Be.FunctionsRelayError =
    Be.FunctionsHttpError =
    Be.FunctionsFetchError =
    Be.FunctionsError =
    Be.FunctionsClient =
      void 0;
  var tT = Mw();
  Object.defineProperty(Be, "FunctionsClient", {
    enumerable: !0,
    get: function () {
      return tT.FunctionsClient;
    },
  });
  var Bi = Vf();
  Object.defineProperty(Be, "FunctionsError", {
    enumerable: !0,
    get: function () {
      return Bi.FunctionsError;
    },
  });
  Object.defineProperty(Be, "FunctionsFetchError", {
    enumerable: !0,
    get: function () {
      return Bi.FunctionsFetchError;
    },
  });
  Object.defineProperty(Be, "FunctionsHttpError", {
    enumerable: !0,
    get: function () {
      return Bi.FunctionsHttpError;
    },
  });
  Object.defineProperty(Be, "FunctionsRelayError", {
    enumerable: !0,
    get: function () {
      return Bi.FunctionsRelayError;
    },
  });
  Object.defineProperty(Be, "FunctionRegion", {
    enumerable: !0,
    get: function () {
      return Bi.FunctionRegion;
    },
  });
});
var Kf = T((Zi) => {
  "use strict";
  Object.defineProperty(Zi, "__esModule", {value: !0});
  Zi.WebSocketFactory = void 0;
  var Aa = class {
    constructor() {}
    static detectEnvironment() {
      var t;
      if (typeof WebSocket < "u") return {type: "native", constructor: WebSocket};
      if (typeof globalThis < "u" && typeof globalThis.WebSocket < "u")
        return {type: "native", constructor: globalThis.WebSocket};
      if (typeof global < "u" && typeof global.WebSocket < "u")
        return {type: "native", constructor: global.WebSocket};
      if (
        typeof globalThis < "u" &&
        typeof globalThis.WebSocketPair < "u" &&
        typeof globalThis.WebSocket > "u"
      )
        return {
          type: "cloudflare",
          error:
            "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
          workaround:
            "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.",
        };
      if (
        (typeof globalThis < "u" && globalThis.EdgeRuntime) ||
        (typeof navigator < "u" &&
          !((t = navigator.userAgent) === null || t === void 0) &&
          t.includes("Vercel-Edge"))
      )
        return {
          type: "unsupported",
          error:
            "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
          workaround:
            "Use serverless functions or a different deployment target for WebSocket functionality.",
        };
      if (typeof process < "u") {
        let r = process.versions;
        if (r && r.node) {
          let i = r.node,
            n = parseInt(i.replace(/^v/, "").split(".")[0]);
          return n >= 22
            ? typeof globalThis.WebSocket < "u"
              ? {type: "native", constructor: globalThis.WebSocket}
              : {
                  type: "unsupported",
                  error: `Node.js ${n} detected but native WebSocket not found.`,
                  workaround:
                    "Provide a WebSocket implementation via the transport option.",
                }
            : {
                type: "unsupported",
                error: `Node.js ${n} detected without native WebSocket support.`,
                workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`,
              };
        }
      }
      return {
        type: "unsupported",
        error: "Unknown JavaScript runtime without WebSocket support.",
        workaround:
          "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.",
      };
    }
    static getWebSocketConstructor() {
      let t = this.detectEnvironment();
      if (t.constructor) return t.constructor;
      let r = t.error || "WebSocket not supported in this environment.";
      throw (
        (t.workaround &&
          (r += `

Suggested solution: ${t.workaround}`),
        new Error(r))
      );
    }
    static createWebSocket(t, r) {
      let i = this.getWebSocketConstructor();
      return new i(t, r);
    }
    static isWebSocketSupported() {
      try {
        let t = this.detectEnvironment();
        return t.type === "native" || t.type === "ws";
      } catch {
        return !1;
      }
    }
  };
  Zi.WebSocketFactory = Aa;
  Zi.default = Aa;
});
var Ww = T((Ia) => {
  "use strict";
  Object.defineProperty(Ia, "__esModule", {value: !0});
  Ia.version = void 0;
  Ia.version = "2.88.0";
});
var Oa = T((ee) => {
  "use strict";
  Object.defineProperty(ee, "__esModule", {value: !0});
  ee.CONNECTION_STATE =
    ee.TRANSPORTS =
    ee.CHANNEL_EVENTS =
    ee.CHANNEL_STATES =
    ee.SOCKET_STATES =
    ee.MAX_PUSH_BUFFER_SIZE =
    ee.WS_CLOSE_NORMAL =
    ee.DEFAULT_TIMEOUT =
    ee.VERSION =
    ee.DEFAULT_VSN =
    ee.VSN_2_0_0 =
    ee.VSN_1_0_0 =
    ee.DEFAULT_VERSION =
      void 0;
  var Xw = Ww();
  ee.DEFAULT_VERSION = `realtime-js/${Xw.version}`;
  ee.VSN_1_0_0 = "1.0.0";
  ee.VSN_2_0_0 = "2.0.0";
  ee.DEFAULT_VSN = ee.VSN_1_0_0;
  ee.VERSION = Xw.version;
  ee.DEFAULT_TIMEOUT = 1e4;
  ee.WS_CLOSE_NORMAL = 1e3;
  ee.MAX_PUSH_BUFFER_SIZE = 100;
  var Jw;
  (function (e) {
    (e[(e.connecting = 0)] = "connecting"),
      (e[(e.open = 1)] = "open"),
      (e[(e.closing = 2)] = "closing"),
      (e[(e.closed = 3)] = "closed");
  })(Jw || (ee.SOCKET_STATES = Jw = {}));
  var Kw;
  (function (e) {
    (e.closed = "closed"),
      (e.errored = "errored"),
      (e.joined = "joined"),
      (e.joining = "joining"),
      (e.leaving = "leaving");
  })(Kw || (ee.CHANNEL_STATES = Kw = {}));
  var Gw;
  (function (e) {
    (e.close = "phx_close"),
      (e.error = "phx_error"),
      (e.join = "phx_join"),
      (e.reply = "phx_reply"),
      (e.leave = "phx_leave"),
      (e.access_token = "access_token");
  })(Gw || (ee.CHANNEL_EVENTS = Gw = {}));
  var Hw;
  (function (e) {
    e.websocket = "websocket";
  })(Hw || (ee.TRANSPORTS = Hw = {}));
  var Yw;
  (function (e) {
    (e.Connecting = "connecting"),
      (e.Open = "open"),
      (e.Closing = "closing"),
      (e.Closed = "closed");
  })(Yw || (ee.CONNECTION_STATE = Yw = {}));
});
var Qw = T((Hf) => {
  "use strict";
  Object.defineProperty(Hf, "__esModule", {value: !0});
  var Gf = class {
    constructor(t) {
      (this.HEADER_LENGTH = 1),
        (this.USER_BROADCAST_PUSH_META_LENGTH = 6),
        (this.KINDS = {userBroadcastPush: 3, userBroadcast: 4}),
        (this.BINARY_ENCODING = 0),
        (this.JSON_ENCODING = 1),
        (this.BROADCAST_EVENT = "broadcast"),
        (this.allowedMetadataKeys = []),
        (this.allowedMetadataKeys = t ?? []);
    }
    encode(t, r) {
      if (
        t.event === this.BROADCAST_EVENT &&
        !(t.payload instanceof ArrayBuffer) &&
        typeof t.payload.event == "string"
      )
        return r(this._binaryEncodeUserBroadcastPush(t));
      let i = [t.join_ref, t.ref, t.topic, t.event, t.payload];
      return r(JSON.stringify(i));
    }
    _binaryEncodeUserBroadcastPush(t) {
      var r;
      return this._isArrayBuffer(
        (r = t.payload) === null || r === void 0 ? void 0 : r.payload,
      )
        ? this._encodeBinaryUserBroadcastPush(t)
        : this._encodeJsonUserBroadcastPush(t);
    }
    _encodeBinaryUserBroadcastPush(t) {
      var r, i;
      let n =
        (i = (r = t.payload) === null || r === void 0 ? void 0 : r.payload) !== null &&
        i !== void 0
          ? i
          : new ArrayBuffer(0);
      return this._encodeUserBroadcastPush(t, this.BINARY_ENCODING, n);
    }
    _encodeJsonUserBroadcastPush(t) {
      var r, i;
      let n =
          (i = (r = t.payload) === null || r === void 0 ? void 0 : r.payload) !==
            null && i !== void 0
            ? i
            : {},
        s = new TextEncoder().encode(JSON.stringify(n)).buffer;
      return this._encodeUserBroadcastPush(t, this.JSON_ENCODING, s);
    }
    _encodeUserBroadcastPush(t, r, i) {
      var n, o;
      let s = t.topic,
        a = (n = t.ref) !== null && n !== void 0 ? n : "",
        c = (o = t.join_ref) !== null && o !== void 0 ? o : "",
        u = t.payload.event,
        l = this.allowedMetadataKeys
          ? this._pick(t.payload, this.allowedMetadataKeys)
          : {},
        h = Object.keys(l).length === 0 ? "" : JSON.stringify(l);
      if (c.length > 255)
        throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);
      if (a.length > 255)
        throw new Error(`ref length ${a.length} exceeds maximum of 255`);
      if (s.length > 255)
        throw new Error(`topic length ${s.length} exceeds maximum of 255`);
      if (u.length > 255)
        throw new Error(`userEvent length ${u.length} exceeds maximum of 255`);
      if (h.length > 255)
        throw new Error(`metadata length ${h.length} exceeds maximum of 255`);
      let f =
          this.USER_BROADCAST_PUSH_META_LENGTH +
          c.length +
          a.length +
          s.length +
          u.length +
          h.length,
        d = new ArrayBuffer(this.HEADER_LENGTH + f),
        p = new DataView(d),
        m = 0;
      p.setUint8(m++, this.KINDS.userBroadcastPush),
        p.setUint8(m++, c.length),
        p.setUint8(m++, a.length),
        p.setUint8(m++, s.length),
        p.setUint8(m++, u.length),
        p.setUint8(m++, h.length),
        p.setUint8(m++, r),
        Array.from(c, (w) => p.setUint8(m++, w.charCodeAt(0))),
        Array.from(a, (w) => p.setUint8(m++, w.charCodeAt(0))),
        Array.from(s, (w) => p.setUint8(m++, w.charCodeAt(0))),
        Array.from(u, (w) => p.setUint8(m++, w.charCodeAt(0))),
        Array.from(h, (w) => p.setUint8(m++, w.charCodeAt(0)));
      var v = new Uint8Array(d.byteLength + i.byteLength);
      return (
        v.set(new Uint8Array(d), 0), v.set(new Uint8Array(i), d.byteLength), v.buffer
      );
    }
    decode(t, r) {
      if (this._isArrayBuffer(t)) {
        let i = this._binaryDecode(t);
        return r(i);
      }
      if (typeof t == "string") {
        let i = JSON.parse(t),
          [n, o, s, a, c] = i;
        return r({join_ref: n, ref: o, topic: s, event: a, payload: c});
      }
      return r({});
    }
    _binaryDecode(t) {
      let r = new DataView(t),
        i = r.getUint8(0),
        n = new TextDecoder();
      switch (i) {
        case this.KINDS.userBroadcast:
          return this._decodeUserBroadcast(t, r, n);
      }
    }
    _decodeUserBroadcast(t, r, i) {
      let n = r.getUint8(1),
        o = r.getUint8(2),
        s = r.getUint8(3),
        a = r.getUint8(4),
        c = this.HEADER_LENGTH + 4,
        u = i.decode(t.slice(c, c + n));
      c = c + n;
      let l = i.decode(t.slice(c, c + o));
      c = c + o;
      let h = i.decode(t.slice(c, c + s));
      c = c + s;
      let f = t.slice(c, t.byteLength),
        d = a === this.JSON_ENCODING ? JSON.parse(i.decode(f)) : f,
        p = {type: this.BROADCAST_EVENT, event: l, payload: d};
      return (
        s > 0 && (p.meta = JSON.parse(h)),
        {join_ref: null, ref: null, topic: u, event: this.BROADCAST_EVENT, payload: p}
      );
    }
    _isArrayBuffer(t) {
      var r;
      return (
        t instanceof ArrayBuffer ||
        ((r = t?.constructor) === null || r === void 0 ? void 0 : r.name) ===
          "ArrayBuffer"
      );
    }
    _pick(t, r) {
      return !t || typeof t != "object"
        ? {}
        : Object.fromEntries(Object.entries(t).filter(([i]) => r.includes(i)));
    }
  };
  Hf.default = Gf;
});
var Qf = T((Xf) => {
  "use strict";
  Object.defineProperty(Xf, "__esModule", {value: !0});
  var Yf = class {
    constructor(t, r) {
      (this.callback = t),
        (this.timerCalc = r),
        (this.timer = void 0),
        (this.tries = 0),
        (this.callback = t),
        (this.timerCalc = r);
    }
    reset() {
      (this.tries = 0), clearTimeout(this.timer), (this.timer = void 0);
    }
    scheduleTimeout() {
      clearTimeout(this.timer),
        (this.timer = setTimeout(
          () => {
            (this.tries = this.tries + 1), this.callback();
          },
          this.timerCalc(this.tries + 1),
        ));
    }
  };
  Xf.default = Yf;
});
var Ta = T((X) => {
  "use strict";
  Object.defineProperty(X, "__esModule", {value: !0});
  X.httpEndpointURL =
    X.toTimestampString =
    X.toArray =
    X.toJson =
    X.toNumber =
    X.toBoolean =
    X.convertCell =
    X.convertColumn =
    X.convertChangeData =
    X.PostgresTypes =
      void 0;
  var oe;
  (function (e) {
    (e.abstime = "abstime"),
      (e.bool = "bool"),
      (e.date = "date"),
      (e.daterange = "daterange"),
      (e.float4 = "float4"),
      (e.float8 = "float8"),
      (e.int2 = "int2"),
      (e.int4 = "int4"),
      (e.int4range = "int4range"),
      (e.int8 = "int8"),
      (e.int8range = "int8range"),
      (e.json = "json"),
      (e.jsonb = "jsonb"),
      (e.money = "money"),
      (e.numeric = "numeric"),
      (e.oid = "oid"),
      (e.reltime = "reltime"),
      (e.text = "text"),
      (e.time = "time"),
      (e.timestamp = "timestamp"),
      (e.timestamptz = "timestamptz"),
      (e.timetz = "timetz"),
      (e.tsrange = "tsrange"),
      (e.tstzrange = "tstzrange");
  })(oe || (X.PostgresTypes = oe = {}));
  var oT = (e, t, r = {}) => {
    var i;
    let n = (i = r.skipTypes) !== null && i !== void 0 ? i : [];
    return t
      ? Object.keys(t).reduce(
          (o, s) => ((o[s] = (0, X.convertColumn)(s, e, t, n)), o),
          {},
        )
      : {};
  };
  X.convertChangeData = oT;
  var sT = (e, t, r, i) => {
    let n = t.find((a) => a.name === e),
      o = n?.type,
      s = r[e];
    return o && !i.includes(o) ? (0, X.convertCell)(o, s) : ep(s);
  };
  X.convertColumn = sT;
  var aT = (e, t) => {
    if (e.charAt(0) === "_") {
      let r = e.slice(1, e.length);
      return (0, X.toArray)(t, r);
    }
    switch (e) {
      case oe.bool:
        return (0, X.toBoolean)(t);
      case oe.float4:
      case oe.float8:
      case oe.int2:
      case oe.int4:
      case oe.int8:
      case oe.numeric:
      case oe.oid:
        return (0, X.toNumber)(t);
      case oe.json:
      case oe.jsonb:
        return (0, X.toJson)(t);
      case oe.timestamp:
        return (0, X.toTimestampString)(t);
      case oe.abstime:
      case oe.date:
      case oe.daterange:
      case oe.int4range:
      case oe.int8range:
      case oe.money:
      case oe.reltime:
      case oe.text:
      case oe.time:
      case oe.timestamptz:
      case oe.timetz:
      case oe.tsrange:
      case oe.tstzrange:
        return ep(t);
      default:
        return ep(t);
    }
  };
  X.convertCell = aT;
  var ep = (e) => e,
    cT = (e) => {
      switch (e) {
        case "t":
          return !0;
        case "f":
          return !1;
        default:
          return e;
      }
    };
  X.toBoolean = cT;
  var uT = (e) => {
    if (typeof e == "string") {
      let t = parseFloat(e);
      if (!Number.isNaN(t)) return t;
    }
    return e;
  };
  X.toNumber = uT;
  var lT = (e) => {
    if (typeof e == "string")
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    return e;
  };
  X.toJson = lT;
  var hT = (e, t) => {
    if (typeof e != "string") return e;
    let r = e.length - 1,
      i = e[r];
    if (e[0] === "{" && i === "}") {
      let o,
        s = e.slice(1, r);
      try {
        o = JSON.parse("[" + s + "]");
      } catch {
        o = s ? s.split(",") : [];
      }
      return o.map((a) => (0, X.convertCell)(t, a));
    }
    return e;
  };
  X.toArray = hT;
  var dT = (e) => (typeof e == "string" ? e.replace(" ", "T") : e);
  X.toTimestampString = dT;
  var fT = (e) => {
    let t = new URL(e);
    return (
      (t.protocol = t.protocol.replace(/^ws/i, "http")),
      (t.pathname = t.pathname
        .replace(/\/+$/, "")
        .replace(/\/socket\/websocket$/i, "")
        .replace(/\/socket$/i, "")
        .replace(/\/websocket$/i, "")),
      t.pathname === "" || t.pathname === "/"
        ? (t.pathname = "/api/broadcast")
        : (t.pathname = t.pathname + "/api/broadcast"),
      t.href
    );
  };
  X.httpEndpointURL = fT;
});
var e0 = T((rp) => {
  "use strict";
  Object.defineProperty(rp, "__esModule", {value: !0});
  var pT = Oa(),
    tp = class {
      constructor(t, r, i = {}, n = pT.DEFAULT_TIMEOUT) {
        (this.channel = t),
          (this.event = r),
          (this.payload = i),
          (this.timeout = n),
          (this.sent = !1),
          (this.timeoutTimer = void 0),
          (this.ref = ""),
          (this.receivedResp = null),
          (this.recHooks = []),
          (this.refEvent = null);
      }
      resend(t) {
        (this.timeout = t),
          this._cancelRefEvent(),
          (this.ref = ""),
          (this.refEvent = null),
          (this.receivedResp = null),
          (this.sent = !1),
          this.send();
      }
      send() {
        this._hasReceived("timeout") ||
          (this.startTimeout(),
          (this.sent = !0),
          this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef(),
          }));
      }
      updatePayload(t) {
        this.payload = Object.assign(Object.assign({}, this.payload), t);
      }
      receive(t, r) {
        var i;
        return (
          this._hasReceived(t) &&
            r((i = this.receivedResp) === null || i === void 0 ? void 0 : i.response),
          this.recHooks.push({status: t, callback: r}),
          this
        );
      }
      startTimeout() {
        if (this.timeoutTimer) return;
        (this.ref = this.channel.socket._makeRef()),
          (this.refEvent = this.channel._replyEventName(this.ref));
        let t = (r) => {
          this._cancelRefEvent(),
            this._cancelTimeout(),
            (this.receivedResp = r),
            this._matchReceive(r);
        };
        this.channel._on(this.refEvent, {}, t),
          (this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout));
      }
      trigger(t, r) {
        this.refEvent && this.channel._trigger(this.refEvent, {status: t, response: r});
      }
      destroy() {
        this._cancelRefEvent(), this._cancelTimeout();
      }
      _cancelRefEvent() {
        this.refEvent && this.channel._off(this.refEvent, {});
      }
      _cancelTimeout() {
        clearTimeout(this.timeoutTimer), (this.timeoutTimer = void 0);
      }
      _matchReceive({status: t, response: r}) {
        this.recHooks.filter((i) => i.status === t).forEach((i) => i.callback(r));
      }
      _hasReceived(t) {
        return this.receivedResp && this.receivedResp.status === t;
      }
    };
  rp.default = tp;
});
var ip = T((qi) => {
  "use strict";
  Object.defineProperty(qi, "__esModule", {value: !0});
  qi.REALTIME_PRESENCE_LISTEN_EVENTS = void 0;
  var t0;
  (function (e) {
    (e.SYNC = "sync"), (e.JOIN = "join"), (e.LEAVE = "leave");
  })(t0 || (qi.REALTIME_PRESENCE_LISTEN_EVENTS = t0 = {}));
  var np = class e {
    constructor(t, r) {
      (this.channel = t),
        (this.state = {}),
        (this.pendingDiffs = []),
        (this.joinRef = null),
        (this.enabled = !1),
        (this.caller = {onJoin: () => {}, onLeave: () => {}, onSync: () => {}});
      let i = r?.events || {state: "presence_state", diff: "presence_diff"};
      this.channel._on(i.state, {}, (n) => {
        let {onJoin: o, onLeave: s, onSync: a} = this.caller;
        (this.joinRef = this.channel._joinRef()),
          (this.state = e.syncState(this.state, n, o, s)),
          this.pendingDiffs.forEach((c) => {
            this.state = e.syncDiff(this.state, c, o, s);
          }),
          (this.pendingDiffs = []),
          a();
      }),
        this.channel._on(i.diff, {}, (n) => {
          let {onJoin: o, onLeave: s, onSync: a} = this.caller;
          this.inPendingSyncState()
            ? this.pendingDiffs.push(n)
            : ((this.state = e.syncDiff(this.state, n, o, s)), a());
        }),
        this.onJoin((n, o, s) => {
          this.channel._trigger("presence", {
            event: "join",
            key: n,
            currentPresences: o,
            newPresences: s,
          });
        }),
        this.onLeave((n, o, s) => {
          this.channel._trigger("presence", {
            event: "leave",
            key: n,
            currentPresences: o,
            leftPresences: s,
          });
        }),
        this.onSync(() => {
          this.channel._trigger("presence", {event: "sync"});
        });
    }
    static syncState(t, r, i, n) {
      let o = this.cloneDeep(t),
        s = this.transformState(r),
        a = {},
        c = {};
      return (
        this.map(o, (u, l) => {
          s[u] || (c[u] = l);
        }),
        this.map(s, (u, l) => {
          let h = o[u];
          if (h) {
            let f = l.map((v) => v.presence_ref),
              d = h.map((v) => v.presence_ref),
              p = l.filter((v) => d.indexOf(v.presence_ref) < 0),
              m = h.filter((v) => f.indexOf(v.presence_ref) < 0);
            p.length > 0 && (a[u] = p), m.length > 0 && (c[u] = m);
          } else a[u] = l;
        }),
        this.syncDiff(o, {joins: a, leaves: c}, i, n)
      );
    }
    static syncDiff(t, r, i, n) {
      let {joins: o, leaves: s} = {
        joins: this.transformState(r.joins),
        leaves: this.transformState(r.leaves),
      };
      return (
        i || (i = () => {}),
        n || (n = () => {}),
        this.map(o, (a, c) => {
          var u;
          let l = (u = t[a]) !== null && u !== void 0 ? u : [];
          if (((t[a] = this.cloneDeep(c)), l.length > 0)) {
            let h = t[a].map((d) => d.presence_ref),
              f = l.filter((d) => h.indexOf(d.presence_ref) < 0);
            t[a].unshift(...f);
          }
          i(a, l, c);
        }),
        this.map(s, (a, c) => {
          let u = t[a];
          if (!u) return;
          let l = c.map((h) => h.presence_ref);
          (u = u.filter((h) => l.indexOf(h.presence_ref) < 0)),
            (t[a] = u),
            n(a, u, c),
            u.length === 0 && delete t[a];
        }),
        t
      );
    }
    static map(t, r) {
      return Object.getOwnPropertyNames(t).map((i) => r(i, t[i]));
    }
    static transformState(t) {
      return (
        (t = this.cloneDeep(t)),
        Object.getOwnPropertyNames(t).reduce((r, i) => {
          let n = t[i];
          return (
            "metas" in n
              ? (r[i] = n.metas.map(
                  (o) => (
                    (o.presence_ref = o.phx_ref),
                    delete o.phx_ref,
                    delete o.phx_ref_prev,
                    o
                  ),
                ))
              : (r[i] = n),
            r
          );
        }, {})
      );
    }
    static cloneDeep(t) {
      return JSON.parse(JSON.stringify(t));
    }
    onJoin(t) {
      this.caller.onJoin = t;
    }
    onLeave(t) {
      this.caller.onLeave = t;
    }
    onSync(t) {
      this.caller.onSync = t;
    }
    inPendingSyncState() {
      return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
  };
  qi.default = np;
});
var ap = T((_t) => {
  "use strict";
  Object.defineProperty(_t, "__esModule", {value: !0});
  _t.REALTIME_CHANNEL_STATES =
    _t.REALTIME_SUBSCRIBE_STATES =
    _t.REALTIME_LISTEN_TYPES =
    _t.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT =
      void 0;
  var ja = (ot(), ht(it)),
    se = Oa(),
    op = ja.__importDefault(e0()),
    mT = ja.__importDefault(Qf()),
    gT = ja.__importDefault(ip()),
    r0 = ja.__importStar(Ta()),
    vT = Ta(),
    n0;
  (function (e) {
    (e.ALL = "*"), (e.INSERT = "INSERT"), (e.UPDATE = "UPDATE"), (e.DELETE = "DELETE");
  })(n0 || (_t.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = n0 = {}));
  var Vi;
  (function (e) {
    (e.BROADCAST = "broadcast"),
      (e.PRESENCE = "presence"),
      (e.POSTGRES_CHANGES = "postgres_changes"),
      (e.SYSTEM = "system");
  })(Vi || (_t.REALTIME_LISTEN_TYPES = Vi = {}));
  var Dt;
  (function (e) {
    (e.SUBSCRIBED = "SUBSCRIBED"),
      (e.TIMED_OUT = "TIMED_OUT"),
      (e.CLOSED = "CLOSED"),
      (e.CHANNEL_ERROR = "CHANNEL_ERROR");
  })(Dt || (_t.REALTIME_SUBSCRIBE_STATES = Dt = {}));
  _t.REALTIME_CHANNEL_STATES = se.CHANNEL_STATES;
  var sp = class e {
    constructor(t, r = {config: {}}, i) {
      var n, o;
      if (
        ((this.topic = t),
        (this.params = r),
        (this.socket = i),
        (this.bindings = {}),
        (this.state = se.CHANNEL_STATES.closed),
        (this.joinedOnce = !1),
        (this.pushBuffer = []),
        (this.subTopic = t.replace(/^realtime:/i, "")),
        (this.params.config = Object.assign(
          {
            broadcast: {ack: !1, self: !1},
            presence: {key: "", enabled: !1},
            private: !1,
          },
          r.config,
        )),
        (this.timeout = this.socket.timeout),
        (this.joinPush = new op.default(
          this,
          se.CHANNEL_EVENTS.join,
          this.params,
          this.timeout,
        )),
        (this.rejoinTimer = new mT.default(
          () => this._rejoinUntilConnected(),
          this.socket.reconnectAfterMs,
        )),
        this.joinPush.receive("ok", () => {
          (this.state = se.CHANNEL_STATES.joined),
            this.rejoinTimer.reset(),
            this.pushBuffer.forEach((s) => s.send()),
            (this.pushBuffer = []);
        }),
        this._onClose(() => {
          this.rejoinTimer.reset(),
            this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`),
            (this.state = se.CHANNEL_STATES.closed),
            this.socket._remove(this);
        }),
        this._onError((s) => {
          this._isLeaving() ||
            this._isClosed() ||
            (this.socket.log("channel", `error ${this.topic}`, s),
            (this.state = se.CHANNEL_STATES.errored),
            this.rejoinTimer.scheduleTimeout());
        }),
        this.joinPush.receive("timeout", () => {
          this._isJoining() &&
            (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout),
            (this.state = se.CHANNEL_STATES.errored),
            this.rejoinTimer.scheduleTimeout());
        }),
        this.joinPush.receive("error", (s) => {
          this._isLeaving() ||
            this._isClosed() ||
            (this.socket.log("channel", `error ${this.topic}`, s),
            (this.state = se.CHANNEL_STATES.errored),
            this.rejoinTimer.scheduleTimeout());
        }),
        this._on(se.CHANNEL_EVENTS.reply, {}, (s, a) => {
          this._trigger(this._replyEventName(a), s);
        }),
        (this.presence = new gT.default(this)),
        (this.broadcastEndpointURL = (0, vT.httpEndpointURL)(this.socket.endPoint)),
        (this.private = this.params.config.private || !1),
        !this.private &&
          !(
            (o =
              (n = this.params.config) === null || n === void 0
                ? void 0
                : n.broadcast) === null || o === void 0
          ) &&
          o.replay)
      )
        throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
    }
    subscribe(t, r = this.timeout) {
      var i, n, o;
      if (
        (this.socket.isConnected() || this.socket.connect(),
        this.state == se.CHANNEL_STATES.closed)
      ) {
        let {
            config: {broadcast: s, presence: a, private: c},
          } = this.params,
          u =
            (n =
              (i = this.bindings.postgres_changes) === null || i === void 0
                ? void 0
                : i.map((d) => d.filter)) !== null && n !== void 0
              ? n
              : [],
          l =
            (!!this.bindings[Vi.PRESENCE] && this.bindings[Vi.PRESENCE].length > 0) ||
            ((o = this.params.config.presence) === null || o === void 0
              ? void 0
              : o.enabled) === !0,
          h = {},
          f = {
            broadcast: s,
            presence: Object.assign(Object.assign({}, a), {enabled: l}),
            postgres_changes: u,
            private: c,
          };
        this.socket.accessTokenValue && (h.access_token = this.socket.accessTokenValue),
          this._onError((d) => t?.(Dt.CHANNEL_ERROR, d)),
          this._onClose(() => t?.(Dt.CLOSED)),
          this.updateJoinPayload(Object.assign({config: f}, h)),
          (this.joinedOnce = !0),
          this._rejoin(r),
          this.joinPush
            .receive("ok", async ({postgres_changes: d}) => {
              var p;
              if (
                (this.socket._isManualToken() || this.socket.setAuth(), d === void 0)
              ) {
                t?.(Dt.SUBSCRIBED);
                return;
              } else {
                let m = this.bindings.postgres_changes,
                  v = (p = m?.length) !== null && p !== void 0 ? p : 0,
                  w = [];
                for (let $ = 0; $ < v; $++) {
                  let b = m[$],
                    {
                      filter: {event: x, schema: D, table: _, filter: S},
                    } = b,
                    U = d && d[$];
                  if (
                    U &&
                    U.event === x &&
                    e.isFilterValueEqual(U.schema, D) &&
                    e.isFilterValueEqual(U.table, _) &&
                    e.isFilterValueEqual(U.filter, S)
                  )
                    w.push(Object.assign(Object.assign({}, b), {id: U.id}));
                  else {
                    this.unsubscribe(),
                      (this.state = se.CHANNEL_STATES.errored),
                      t?.(
                        Dt.CHANNEL_ERROR,
                        new Error(
                          "mismatch between server and client bindings for postgres changes",
                        ),
                      );
                    return;
                  }
                }
                (this.bindings.postgres_changes = w), t && t(Dt.SUBSCRIBED);
                return;
              }
            })
            .receive("error", (d) => {
              (this.state = se.CHANNEL_STATES.errored),
                t?.(
                  Dt.CHANNEL_ERROR,
                  new Error(JSON.stringify(Object.values(d).join(", ") || "error")),
                );
            })
            .receive("timeout", () => {
              t?.(Dt.TIMED_OUT);
            });
      }
      return this;
    }
    presenceState() {
      return this.presence.state;
    }
    async track(t, r = {}) {
      return await this.send(
        {type: "presence", event: "track", payload: t},
        r.timeout || this.timeout,
      );
    }
    async untrack(t = {}) {
      return await this.send({type: "presence", event: "untrack"}, t);
    }
    on(t, r, i) {
      return (
        this.state === se.CHANNEL_STATES.joined &&
          t === Vi.PRESENCE &&
          (this.socket.log(
            "channel",
            `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`,
          ),
          this.unsubscribe().then(async () => await this.subscribe())),
        this._on(t, r, i)
      );
    }
    async httpSend(t, r, i = {}) {
      var n;
      if (r == null) return Promise.reject("Payload is required for httpSend()");
      let o = {
        apikey: this.socket.apiKey ? this.socket.apiKey : "",
        "Content-Type": "application/json",
      };
      this.socket.accessTokenValue &&
        (o.Authorization = `Bearer ${this.socket.accessTokenValue}`);
      let s = {
          method: "POST",
          headers: o,
          body: JSON.stringify({
            messages: [
              {topic: this.subTopic, event: t, payload: r, private: this.private},
            ],
          }),
        },
        a = await this._fetchWithTimeout(
          this.broadcastEndpointURL,
          s,
          (n = i.timeout) !== null && n !== void 0 ? n : this.timeout,
        );
      if (a.status === 202) return {success: !0};
      let c = a.statusText;
      try {
        let u = await a.json();
        c = u.error || u.message || c;
      } catch {}
      return Promise.reject(new Error(c));
    }
    async send(t, r = {}) {
      var i, n;
      if (!this._canPush() && t.type === "broadcast") {
        console.warn(
          "Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.",
        );
        let {event: o, payload: s} = t,
          a = {
            apikey: this.socket.apiKey ? this.socket.apiKey : "",
            "Content-Type": "application/json",
          };
        this.socket.accessTokenValue &&
          (a.Authorization = `Bearer ${this.socket.accessTokenValue}`);
        let c = {
          method: "POST",
          headers: a,
          body: JSON.stringify({
            messages: [
              {topic: this.subTopic, event: o, payload: s, private: this.private},
            ],
          }),
        };
        try {
          let u = await this._fetchWithTimeout(
            this.broadcastEndpointURL,
            c,
            (i = r.timeout) !== null && i !== void 0 ? i : this.timeout,
          );
          return (
            await ((n = u.body) === null || n === void 0 ? void 0 : n.cancel()),
            u.ok ? "ok" : "error"
          );
        } catch (u) {
          return u.name === "AbortError" ? "timed out" : "error";
        }
      } else
        return new Promise((o) => {
          var s, a, c;
          let u = this._push(t.type, t, r.timeout || this.timeout);
          t.type === "broadcast" &&
            !(
              !(
                (c =
                  (a =
                    (s = this.params) === null || s === void 0 ? void 0 : s.config) ===
                    null || a === void 0
                    ? void 0
                    : a.broadcast) === null || c === void 0
              ) && c.ack
            ) &&
            o("ok"),
            u.receive("ok", () => o("ok")),
            u.receive("error", () => o("error")),
            u.receive("timeout", () => o("timed out"));
        });
    }
    updateJoinPayload(t) {
      this.joinPush.updatePayload(t);
    }
    unsubscribe(t = this.timeout) {
      this.state = se.CHANNEL_STATES.leaving;
      let r = () => {
        this.socket.log("channel", `leave ${this.topic}`),
          this._trigger(se.CHANNEL_EVENTS.close, "leave", this._joinRef());
      };
      this.joinPush.destroy();
      let i = null;
      return new Promise((n) => {
        (i = new op.default(this, se.CHANNEL_EVENTS.leave, {}, t)),
          i
            .receive("ok", () => {
              r(), n("ok");
            })
            .receive("timeout", () => {
              r(), n("timed out");
            })
            .receive("error", () => {
              n("error");
            }),
          i.send(),
          this._canPush() || i.trigger("ok", {});
      }).finally(() => {
        i?.destroy();
      });
    }
    teardown() {
      this.pushBuffer.forEach((t) => t.destroy()),
        (this.pushBuffer = []),
        this.rejoinTimer.reset(),
        this.joinPush.destroy(),
        (this.state = se.CHANNEL_STATES.closed),
        (this.bindings = {});
    }
    async _fetchWithTimeout(t, r, i) {
      let n = new AbortController(),
        o = setTimeout(() => n.abort(), i),
        s = await this.socket.fetch(
          t,
          Object.assign(Object.assign({}, r), {signal: n.signal}),
        );
      return clearTimeout(o), s;
    }
    _push(t, r, i = this.timeout) {
      if (!this.joinedOnce)
        throw `tried to push '${t}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
      let n = new op.default(this, t, r, i);
      return this._canPush() ? n.send() : this._addToPushBuffer(n), n;
    }
    _addToPushBuffer(t) {
      if (
        (t.startTimeout(),
        this.pushBuffer.push(t),
        this.pushBuffer.length > se.MAX_PUSH_BUFFER_SIZE)
      ) {
        let r = this.pushBuffer.shift();
        r &&
          (r.destroy(),
          this.socket.log(
            "channel",
            `discarded push due to buffer overflow: ${r.event}`,
            r.payload,
          ));
      }
    }
    _onMessage(t, r, i) {
      return r;
    }
    _isMember(t) {
      return this.topic === t;
    }
    _joinRef() {
      return this.joinPush.ref;
    }
    _trigger(t, r, i) {
      var n, o;
      let s = t.toLocaleLowerCase(),
        {close: a, error: c, leave: u, join: l} = se.CHANNEL_EVENTS;
      if (i && [a, c, u, l].indexOf(s) >= 0 && i !== this._joinRef()) return;
      let f = this._onMessage(s, r, i);
      if (r && !f)
        throw "channel onMessage callbacks must return the payload, modified or unmodified";
      ["insert", "update", "delete"].includes(s)
        ? (n = this.bindings.postgres_changes) === null ||
          n === void 0 ||
          n
            .filter((d) => {
              var p, m, v;
              return (
                ((p = d.filter) === null || p === void 0 ? void 0 : p.event) === "*" ||
                ((v = (m = d.filter) === null || m === void 0 ? void 0 : m.event) ===
                  null || v === void 0
                  ? void 0
                  : v.toLocaleLowerCase()) === s
              );
            })
            .map((d) => d.callback(f, i))
        : (o = this.bindings[s]) === null ||
          o === void 0 ||
          o
            .filter((d) => {
              var p, m, v, w, $, b;
              if (["broadcast", "presence", "postgres_changes"].includes(s))
                if ("id" in d) {
                  let x = d.id,
                    D = (p = d.filter) === null || p === void 0 ? void 0 : p.event;
                  return (
                    x &&
                    ((m = r.ids) === null || m === void 0 ? void 0 : m.includes(x)) &&
                    (D === "*" ||
                      D?.toLocaleLowerCase() ===
                        ((v = r.data) === null || v === void 0
                          ? void 0
                          : v.type.toLocaleLowerCase()))
                  );
                } else {
                  let x =
                    ($ =
                      (w = d?.filter) === null || w === void 0 ? void 0 : w.event) ===
                      null || $ === void 0
                      ? void 0
                      : $.toLocaleLowerCase();
                  return (
                    x === "*" ||
                    x ===
                      ((b = r?.event) === null || b === void 0
                        ? void 0
                        : b.toLocaleLowerCase())
                  );
                }
              else return d.type.toLocaleLowerCase() === s;
            })
            .map((d) => {
              if (typeof f == "object" && "ids" in f) {
                let p = f.data,
                  {schema: m, table: v, commit_timestamp: w, type: $, errors: b} = p;
                f = Object.assign(
                  Object.assign(
                    {},
                    {
                      schema: m,
                      table: v,
                      commit_timestamp: w,
                      eventType: $,
                      new: {},
                      old: {},
                      errors: b,
                    },
                  ),
                  this._getPayloadRecords(p),
                );
              }
              d.callback(f, i);
            });
    }
    _isClosed() {
      return this.state === se.CHANNEL_STATES.closed;
    }
    _isJoined() {
      return this.state === se.CHANNEL_STATES.joined;
    }
    _isJoining() {
      return this.state === se.CHANNEL_STATES.joining;
    }
    _isLeaving() {
      return this.state === se.CHANNEL_STATES.leaving;
    }
    _replyEventName(t) {
      return `chan_reply_${t}`;
    }
    _on(t, r, i) {
      let n = t.toLocaleLowerCase(),
        o = {type: n, filter: r, callback: i};
      return (
        this.bindings[n] ? this.bindings[n].push(o) : (this.bindings[n] = [o]), this
      );
    }
    _off(t, r) {
      let i = t.toLocaleLowerCase();
      return (
        this.bindings[i] &&
          (this.bindings[i] = this.bindings[i].filter((n) => {
            var o;
            return !(
              ((o = n.type) === null || o === void 0
                ? void 0
                : o.toLocaleLowerCase()) === i && e.isEqual(n.filter, r)
            );
          })),
        this
      );
    }
    static isEqual(t, r) {
      if (Object.keys(t).length !== Object.keys(r).length) return !1;
      for (let i in t) if (t[i] !== r[i]) return !1;
      return !0;
    }
    static isFilterValueEqual(t, r) {
      return (t ?? void 0) === (r ?? void 0);
    }
    _rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
    }
    _onClose(t) {
      this._on(se.CHANNEL_EVENTS.close, {}, t);
    }
    _onError(t) {
      this._on(se.CHANNEL_EVENTS.error, {}, (r) => t(r));
    }
    _canPush() {
      return this.socket.isConnected() && this._isJoined();
    }
    _rejoin(t = this.timeout) {
      this._isLeaving() ||
        (this.socket._leaveOpenTopic(this.topic),
        (this.state = se.CHANNEL_STATES.joining),
        this.joinPush.resend(t));
    }
    _getPayloadRecords(t) {
      let r = {new: {}, old: {}};
      return (
        (t.type === "INSERT" || t.type === "UPDATE") &&
          (r.new = r0.convertChangeData(t.columns, t.record)),
        (t.type === "UPDATE" || t.type === "DELETE") &&
          (r.old = r0.convertChangeData(t.columns, t.old_record)),
        r
      );
    }
  };
  _t.default = sp;
});
var i0 = T((lp) => {
  "use strict";
  Object.defineProperty(lp, "__esModule", {value: !0});
  var Na = (ot(), ht(it)),
    _T = Na.__importDefault(Kf()),
    fe = Oa(),
    yT = Na.__importDefault(Qw()),
    bT = Na.__importDefault(Qf()),
    wT = Ta(),
    xT = Na.__importDefault(ap()),
    cp = () => {},
    Pa = {
      HEARTBEAT_INTERVAL: 25e3,
      RECONNECT_DELAY: 10,
      HEARTBEAT_TIMEOUT_FALLBACK: 100,
    },
    ST = [1e3, 2e3, 5e3, 1e4],
    $T = 1e4,
    ET = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,
    up = class {
      constructor(t, r) {
        var i;
        if (
          ((this.accessTokenValue = null),
          (this.apiKey = null),
          (this._manuallySetToken = !1),
          (this.channels = new Array()),
          (this.endPoint = ""),
          (this.httpEndpoint = ""),
          (this.headers = {}),
          (this.params = {}),
          (this.timeout = fe.DEFAULT_TIMEOUT),
          (this.transport = null),
          (this.heartbeatIntervalMs = Pa.HEARTBEAT_INTERVAL),
          (this.heartbeatTimer = void 0),
          (this.pendingHeartbeatRef = null),
          (this.heartbeatCallback = cp),
          (this.ref = 0),
          (this.reconnectTimer = null),
          (this.vsn = fe.DEFAULT_VSN),
          (this.logger = cp),
          (this.conn = null),
          (this.sendBuffer = []),
          (this.serializer = new yT.default()),
          (this.stateChangeCallbacks = {open: [], close: [], error: [], message: []}),
          (this.accessToken = null),
          (this._connectionState = "disconnected"),
          (this._wasManualDisconnect = !1),
          (this._authPromise = null),
          (this._resolveFetch = (n) => (n ? (...o) => n(...o) : (...o) => fetch(...o))),
          !(!((i = r?.params) === null || i === void 0) && i.apikey))
        )
          throw new Error("API key is required to connect to Realtime");
        (this.apiKey = r.params.apikey),
          (this.endPoint = `${t}/${fe.TRANSPORTS.websocket}`),
          (this.httpEndpoint = (0, wT.httpEndpointURL)(t)),
          this._initializeOptions(r),
          this._setupReconnectionTimer(),
          (this.fetch = this._resolveFetch(r?.fetch));
      }
      connect() {
        if (
          !(
            this.isConnecting() ||
            this.isDisconnecting() ||
            (this.conn !== null && this.isConnected())
          )
        ) {
          if (
            (this._setConnectionState("connecting"),
            this.accessToken && !this._authPromise && this._setAuthSafely("connect"),
            this.transport)
          )
            this.conn = new this.transport(this.endpointURL());
          else
            try {
              this.conn = _T.default.createWebSocket(this.endpointURL());
            } catch (t) {
              this._setConnectionState("disconnected");
              let r = t.message;
              throw r.includes("Node.js")
                ? new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`)
                : new Error(`WebSocket not available: ${r}`);
            }
          this._setupConnectionHandlers();
        }
      }
      endpointURL() {
        return this._appendParams(
          this.endPoint,
          Object.assign({}, this.params, {vsn: this.vsn}),
        );
      }
      disconnect(t, r) {
        if (!this.isDisconnecting())
          if ((this._setConnectionState("disconnecting", !0), this.conn)) {
            let i = setTimeout(() => {
              this._setConnectionState("disconnected");
            }, 100);
            (this.conn.onclose = () => {
              clearTimeout(i), this._setConnectionState("disconnected");
            }),
              typeof this.conn.close == "function" &&
                (t ? this.conn.close(t, r ?? "") : this.conn.close()),
              this._teardownConnection();
          } else this._setConnectionState("disconnected");
      }
      getChannels() {
        return this.channels;
      }
      async removeChannel(t) {
        let r = await t.unsubscribe();
        return this.channels.length === 0 && this.disconnect(), r;
      }
      async removeAllChannels() {
        let t = await Promise.all(this.channels.map((r) => r.unsubscribe()));
        return (this.channels = []), this.disconnect(), t;
      }
      log(t, r, i) {
        this.logger(t, r, i);
      }
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case fe.SOCKET_STATES.connecting:
            return fe.CONNECTION_STATE.Connecting;
          case fe.SOCKET_STATES.open:
            return fe.CONNECTION_STATE.Open;
          case fe.SOCKET_STATES.closing:
            return fe.CONNECTION_STATE.Closing;
          default:
            return fe.CONNECTION_STATE.Closed;
        }
      }
      isConnected() {
        return this.connectionState() === fe.CONNECTION_STATE.Open;
      }
      isConnecting() {
        return this._connectionState === "connecting";
      }
      isDisconnecting() {
        return this._connectionState === "disconnecting";
      }
      channel(t, r = {config: {}}) {
        let i = `realtime:${t}`,
          n = this.getChannels().find((o) => o.topic === i);
        if (n) return n;
        {
          let o = new xT.default(`realtime:${t}`, r, this);
          return this.channels.push(o), o;
        }
      }
      push(t) {
        let {topic: r, event: i, payload: n, ref: o} = t,
          s = () => {
            this.encode(t, (a) => {
              var c;
              (c = this.conn) === null || c === void 0 || c.send(a);
            });
          };
        this.log("push", `${r} ${i} (${o})`, n),
          this.isConnected() ? s() : this.sendBuffer.push(s);
      }
      async setAuth(t = null) {
        this._authPromise = this._performAuth(t);
        try {
          await this._authPromise;
        } finally {
          this._authPromise = null;
        }
      }
      _isManualToken() {
        return this._manuallySetToken;
      }
      async sendHeartbeat() {
        var t;
        if (!this.isConnected()) {
          try {
            this.heartbeatCallback("disconnected");
          } catch (r) {
            this.log("error", "error in heartbeat callback", r);
          }
          return;
        }
        if (this.pendingHeartbeatRef) {
          (this.pendingHeartbeatRef = null),
            this.log(
              "transport",
              "heartbeat timeout. Attempting to re-establish connection",
            );
          try {
            this.heartbeatCallback("timeout");
          } catch (r) {
            this.log("error", "error in heartbeat callback", r);
          }
          (this._wasManualDisconnect = !1),
            (t = this.conn) === null ||
              t === void 0 ||
              t.close(fe.WS_CLOSE_NORMAL, "heartbeat timeout"),
            setTimeout(() => {
              var r;
              this.isConnected() ||
                (r = this.reconnectTimer) === null ||
                r === void 0 ||
                r.scheduleTimeout();
            }, Pa.HEARTBEAT_TIMEOUT_FALLBACK);
          return;
        }
        (this.pendingHeartbeatRef = this._makeRef()),
          this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef,
          });
        try {
          this.heartbeatCallback("sent");
        } catch (r) {
          this.log("error", "error in heartbeat callback", r);
        }
        this._setAuthSafely("heartbeat");
      }
      onHeartbeat(t) {
        this.heartbeatCallback = t;
      }
      flushSendBuffer() {
        this.isConnected() &&
          this.sendBuffer.length > 0 &&
          (this.sendBuffer.forEach((t) => t()), (this.sendBuffer = []));
      }
      _makeRef() {
        let t = this.ref + 1;
        return t === this.ref ? (this.ref = 0) : (this.ref = t), this.ref.toString();
      }
      _leaveOpenTopic(t) {
        let r = this.channels.find(
          (i) => i.topic === t && (i._isJoined() || i._isJoining()),
        );
        r && (this.log("transport", `leaving duplicate topic "${t}"`), r.unsubscribe());
      }
      _remove(t) {
        this.channels = this.channels.filter((r) => r.topic !== t.topic);
      }
      _onConnMessage(t) {
        this.decode(t.data, (r) => {
          if (r.topic === "phoenix" && r.event === "phx_reply")
            try {
              this.heartbeatCallback(r.payload.status === "ok" ? "ok" : "error");
            } catch (u) {
              this.log("error", "error in heartbeat callback", u);
            }
          r.ref &&
            r.ref === this.pendingHeartbeatRef &&
            (this.pendingHeartbeatRef = null);
          let {topic: i, event: n, payload: o, ref: s} = r,
            a = s ? `(${s})` : "",
            c = o.status || "";
          this.log("receive", `${c} ${i} ${n} ${a}`.trim(), o),
            this.channels
              .filter((u) => u._isMember(i))
              .forEach((u) => u._trigger(n, o, s)),
            this._triggerStateCallbacks("message", r);
        });
      }
      _clearTimer(t) {
        var r;
        t === "heartbeat" && this.heartbeatTimer
          ? (clearInterval(this.heartbeatTimer), (this.heartbeatTimer = void 0))
          : t === "reconnect" &&
            ((r = this.reconnectTimer) === null || r === void 0 || r.reset());
      }
      _clearAllTimers() {
        this._clearTimer("heartbeat"), this._clearTimer("reconnect");
      }
      _setupConnectionHandlers() {
        this.conn &&
          ("binaryType" in this.conn && (this.conn.binaryType = "arraybuffer"),
          (this.conn.onopen = () => this._onConnOpen()),
          (this.conn.onerror = (t) => this._onConnError(t)),
          (this.conn.onmessage = (t) => this._onConnMessage(t)),
          (this.conn.onclose = (t) => this._onConnClose(t)),
          this.conn.readyState === fe.SOCKET_STATES.open && this._onConnOpen());
      }
      _teardownConnection() {
        if (this.conn) {
          if (
            this.conn.readyState === fe.SOCKET_STATES.open ||
            this.conn.readyState === fe.SOCKET_STATES.connecting
          )
            try {
              this.conn.close();
            } catch (t) {
              this.log("error", "Error closing connection", t);
            }
          (this.conn.onopen = null),
            (this.conn.onerror = null),
            (this.conn.onmessage = null),
            (this.conn.onclose = null),
            (this.conn = null);
        }
        this._clearAllTimers(),
          this._terminateWorker(),
          this.channels.forEach((t) => t.teardown());
      }
      _onConnOpen() {
        this._setConnectionState("connected"),
          this.log("transport", `connected to ${this.endpointURL()}`),
          (
            this._authPromise ||
            (this.accessToken && !this.accessTokenValue
              ? this.setAuth()
              : Promise.resolve())
          )
            .then(() => {
              this.flushSendBuffer();
            })
            .catch((r) => {
              this.log("error", "error waiting for auth on connect", r),
                this.flushSendBuffer();
            }),
          this._clearTimer("reconnect"),
          this.worker
            ? this.workerRef || this._startWorkerHeartbeat()
            : this._startHeartbeat(),
          this._triggerStateCallbacks("open");
      }
      _startHeartbeat() {
        this.heartbeatTimer && clearInterval(this.heartbeatTimer),
          (this.heartbeatTimer = setInterval(
            () => this.sendHeartbeat(),
            this.heartbeatIntervalMs,
          ));
      }
      _startWorkerHeartbeat() {
        this.workerUrl
          ? this.log("worker", `starting worker for from ${this.workerUrl}`)
          : this.log("worker", "starting default worker");
        let t = this._workerObjectUrl(this.workerUrl);
        (this.workerRef = new Worker(t)),
          (this.workerRef.onerror = (r) => {
            this.log("worker", "worker error", r.message), this._terminateWorker();
          }),
          (this.workerRef.onmessage = (r) => {
            r.data.event === "keepAlive" && this.sendHeartbeat();
          }),
          this.workerRef.postMessage({
            event: "start",
            interval: this.heartbeatIntervalMs,
          });
      }
      _terminateWorker() {
        this.workerRef &&
          (this.log("worker", "terminating worker"),
          this.workerRef.terminate(),
          (this.workerRef = void 0));
      }
      _onConnClose(t) {
        var r;
        this._setConnectionState("disconnected"),
          this.log("transport", "close", t),
          this._triggerChanError(),
          this._clearTimer("heartbeat"),
          this._wasManualDisconnect ||
            (r = this.reconnectTimer) === null ||
            r === void 0 ||
            r.scheduleTimeout(),
          this._triggerStateCallbacks("close", t);
      }
      _onConnError(t) {
        this._setConnectionState("disconnected"),
          this.log("transport", `${t}`),
          this._triggerChanError(),
          this._triggerStateCallbacks("error", t);
      }
      _triggerChanError() {
        this.channels.forEach((t) => t._trigger(fe.CHANNEL_EVENTS.error));
      }
      _appendParams(t, r) {
        if (Object.keys(r).length === 0) return t;
        let i = t.match(/\?/) ? "&" : "?",
          n = new URLSearchParams(r);
        return `${t}${i}${n}`;
      }
      _workerObjectUrl(t) {
        let r;
        if (t) r = t;
        else {
          let i = new Blob([ET], {type: "application/javascript"});
          r = URL.createObjectURL(i);
        }
        return r;
      }
      _setConnectionState(t, r = !1) {
        (this._connectionState = t),
          t === "connecting"
            ? (this._wasManualDisconnect = !1)
            : t === "disconnecting" && (this._wasManualDisconnect = r);
      }
      async _performAuth(t = null) {
        let r,
          i = !1;
        if (t) (r = t), (i = !0);
        else if (this.accessToken)
          try {
            r = await this.accessToken();
          } catch (n) {
            this.log("error", "Error fetching access token from callback", n),
              (r = this.accessTokenValue);
          }
        else r = this.accessTokenValue;
        i
          ? (this._manuallySetToken = !0)
          : this.accessToken && (this._manuallySetToken = !1),
          this.accessTokenValue != r &&
            ((this.accessTokenValue = r),
            this.channels.forEach((n) => {
              let o = {access_token: r, version: fe.DEFAULT_VERSION};
              r && n.updateJoinPayload(o),
                n.joinedOnce &&
                  n._isJoined() &&
                  n._push(fe.CHANNEL_EVENTS.access_token, {access_token: r});
            }));
      }
      async _waitForAuthIfNeeded() {
        this._authPromise && (await this._authPromise);
      }
      _setAuthSafely(t = "general") {
        this._isManualToken() ||
          this.setAuth().catch((r) => {
            this.log("error", `Error setting auth in ${t}`, r);
          });
      }
      _triggerStateCallbacks(t, r) {
        try {
          this.stateChangeCallbacks[t].forEach((i) => {
            try {
              i(r);
            } catch (n) {
              this.log("error", `error in ${t} callback`, n);
            }
          });
        } catch (i) {
          this.log("error", `error triggering ${t} callbacks`, i);
        }
      }
      _setupReconnectionTimer() {
        this.reconnectTimer = new bT.default(async () => {
          setTimeout(async () => {
            await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
          }, Pa.RECONNECT_DELAY);
        }, this.reconnectAfterMs);
      }
      _initializeOptions(t) {
        var r, i, n, o, s, a, c, u, l, h, f, d;
        switch (
          ((this.transport = (r = t?.transport) !== null && r !== void 0 ? r : null),
          (this.timeout =
            (i = t?.timeout) !== null && i !== void 0 ? i : fe.DEFAULT_TIMEOUT),
          (this.heartbeatIntervalMs =
            (n = t?.heartbeatIntervalMs) !== null && n !== void 0
              ? n
              : Pa.HEARTBEAT_INTERVAL),
          (this.worker = (o = t?.worker) !== null && o !== void 0 ? o : !1),
          (this.accessToken = (s = t?.accessToken) !== null && s !== void 0 ? s : null),
          (this.heartbeatCallback =
            (a = t?.heartbeatCallback) !== null && a !== void 0 ? a : cp),
          (this.vsn = (c = t?.vsn) !== null && c !== void 0 ? c : fe.DEFAULT_VSN),
          t?.params && (this.params = t.params),
          t?.logger && (this.logger = t.logger),
          (t?.logLevel || t?.log_level) &&
            ((this.logLevel = t.logLevel || t.log_level),
            (this.params = Object.assign(Object.assign({}, this.params), {
              log_level: this.logLevel,
            }))),
          (this.reconnectAfterMs =
            (u = t?.reconnectAfterMs) !== null && u !== void 0
              ? u
              : (p) => ST[p - 1] || $T),
          this.vsn)
        ) {
          case fe.VSN_1_0_0:
            (this.encode =
              (l = t?.encode) !== null && l !== void 0
                ? l
                : (p, m) => m(JSON.stringify(p))),
              (this.decode =
                (h = t?.decode) !== null && h !== void 0
                  ? h
                  : (p, m) => m(JSON.parse(p)));
            break;
          case fe.VSN_2_0_0:
            (this.encode =
              (f = t?.encode) !== null && f !== void 0
                ? f
                : this.serializer.encode.bind(this.serializer)),
              (this.decode =
                (d = t?.decode) !== null && d !== void 0
                  ? d
                  : this.serializer.decode.bind(this.serializer));
            break;
          default:
            throw new Error(`Unsupported serializer version: ${this.vsn}`);
        }
        if (this.worker) {
          if (typeof window < "u" && !window.Worker)
            throw new Error("Web Worker is not supported");
          this.workerUrl = t?.workerUrl;
        }
      }
    };
  lp.default = up;
});
var hp = T((ve) => {
  "use strict";
  Object.defineProperty(ve, "__esModule", {value: !0});
  ve.WebSocketFactory =
    ve.REALTIME_CHANNEL_STATES =
    ve.REALTIME_SUBSCRIBE_STATES =
    ve.REALTIME_PRESENCE_LISTEN_EVENTS =
    ve.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT =
    ve.REALTIME_LISTEN_TYPES =
    ve.RealtimeClient =
    ve.RealtimeChannel =
    ve.RealtimePresence =
      void 0;
  var Ra = (ot(), ht(it)),
    kT = Ra.__importDefault(i0());
  ve.RealtimeClient = kT.default;
  var Wi = Ra.__importStar(ap());
  ve.RealtimeChannel = Wi.default;
  Object.defineProperty(ve, "REALTIME_LISTEN_TYPES", {
    enumerable: !0,
    get: function () {
      return Wi.REALTIME_LISTEN_TYPES;
    },
  });
  Object.defineProperty(ve, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", {
    enumerable: !0,
    get: function () {
      return Wi.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
    },
  });
  Object.defineProperty(ve, "REALTIME_SUBSCRIBE_STATES", {
    enumerable: !0,
    get: function () {
      return Wi.REALTIME_SUBSCRIBE_STATES;
    },
  });
  Object.defineProperty(ve, "REALTIME_CHANNEL_STATES", {
    enumerable: !0,
    get: function () {
      return Wi.REALTIME_CHANNEL_STATES;
    },
  });
  var o0 = Ra.__importStar(ip());
  ve.RealtimePresence = o0.default;
  Object.defineProperty(ve, "REALTIME_PRESENCE_LISTEN_EVENTS", {
    enumerable: !0,
    get: function () {
      return o0.REALTIME_PRESENCE_LISTEN_EVENTS;
    },
  });
  var AT = Ra.__importDefault(Kf());
  ve.WebSocketFactory = AT.default;
});
var wp = T((Ua) => {
  "use strict";
  Object.defineProperty(Ua, "__esModule", {value: !0});
  Ua.version = void 0;
  Ua.version = "2.88.0";
});
var Da = T((ne) => {
  "use strict";
  Object.defineProperty(ne, "__esModule", {value: !0});
  ne.JWKS_TTL =
    ne.BASE64URL_REGEX =
    ne.API_VERSIONS =
    ne.API_VERSION_HEADER_NAME =
    ne.NETWORK_FAILURE =
    ne.DEFAULT_HEADERS =
    ne.AUDIENCE =
    ne.STORAGE_KEY =
    ne.GOTRUE_URL =
    ne.EXPIRY_MARGIN_MS =
    ne.AUTO_REFRESH_TICK_THRESHOLD =
    ne.AUTO_REFRESH_TICK_DURATION_MS =
      void 0;
  var sj = wp();
  ne.AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3;
  ne.AUTO_REFRESH_TICK_THRESHOLD = 3;
  ne.EXPIRY_MARGIN_MS =
    ne.AUTO_REFRESH_TICK_THRESHOLD * ne.AUTO_REFRESH_TICK_DURATION_MS;
  ne.GOTRUE_URL = "http://localhost:9999";
  ne.STORAGE_KEY = "supabase.auth.token";
  ne.AUDIENCE = "";
  ne.DEFAULT_HEADERS = {"X-Client-Info": `gotrue-js/${sj.version}`};
  ne.NETWORK_FAILURE = {MAX_RETRIES: 10, RETRY_INTERVAL: 2};
  ne.API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
  ne.API_VERSIONS = {
    "2024-01-01": {timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01"},
  };
  ne.BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
  ne.JWKS_TTL = 600 * 1e3;
});
var Ar = T((G) => {
  "use strict";
  Object.defineProperty(G, "__esModule", {value: !0});
  G.AuthInvalidJwtError =
    G.AuthWeakPasswordError =
    G.AuthRetryableFetchError =
    G.AuthPKCECodeVerifierMissingError =
    G.AuthPKCEGrantCodeExchangeError =
    G.AuthImplicitGrantRedirectError =
    G.AuthInvalidCredentialsError =
    G.AuthInvalidTokenResponseError =
    G.AuthSessionMissingError =
    G.CustomAuthError =
    G.AuthUnknownError =
    G.AuthApiError =
    G.AuthError =
      void 0;
  G.isAuthError = kr;
  G.isAuthApiError = aj;
  G.isAuthSessionMissingError = cj;
  G.isAuthImplicitGrantRedirectError = uj;
  G.isAuthPKCECodeVerifierMissingError = lj;
  G.isAuthRetryableFetchError = hj;
  G.isAuthWeakPasswordError = dj;
  var Nn = class extends Error {
    constructor(t, r, i) {
      super(t),
        (this.__isAuthError = !0),
        (this.name = "AuthError"),
        (this.status = r),
        (this.code = i);
    }
  };
  G.AuthError = Nn;
  function kr(e) {
    return typeof e == "object" && e !== null && "__isAuthError" in e;
  }
  var xp = class extends Nn {
    constructor(t, r, i) {
      super(t, r, i), (this.name = "AuthApiError"), (this.status = r), (this.code = i);
    }
  };
  G.AuthApiError = xp;
  function aj(e) {
    return kr(e) && e.name === "AuthApiError";
  }
  var Sp = class extends Nn {
    constructor(t, r) {
      super(t), (this.name = "AuthUnknownError"), (this.originalError = r);
    }
  };
  G.AuthUnknownError = Sp;
  var at = class extends Nn {
    constructor(t, r, i, n) {
      super(t, i, n), (this.name = r), (this.status = i);
    }
  };
  G.CustomAuthError = at;
  var $p = class extends at {
    constructor() {
      super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
    }
  };
  G.AuthSessionMissingError = $p;
  function cj(e) {
    return kr(e) && e.name === "AuthSessionMissingError";
  }
  var Ep = class extends at {
    constructor() {
      super(
        "Auth session or user missing",
        "AuthInvalidTokenResponseError",
        500,
        void 0,
      );
    }
  };
  G.AuthInvalidTokenResponseError = Ep;
  var kp = class extends at {
    constructor(t) {
      super(t, "AuthInvalidCredentialsError", 400, void 0);
    }
  };
  G.AuthInvalidCredentialsError = kp;
  var Ap = class extends at {
    constructor(t, r = null) {
      super(t, "AuthImplicitGrantRedirectError", 500, void 0),
        (this.details = null),
        (this.details = r);
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        details: this.details,
      };
    }
  };
  G.AuthImplicitGrantRedirectError = Ap;
  function uj(e) {
    return kr(e) && e.name === "AuthImplicitGrantRedirectError";
  }
  var Ip = class extends at {
    constructor(t, r = null) {
      super(t, "AuthPKCEGrantCodeExchangeError", 500, void 0),
        (this.details = null),
        (this.details = r);
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        details: this.details,
      };
    }
  };
  G.AuthPKCEGrantCodeExchangeError = Ip;
  var Op = class extends at {
    constructor() {
      super(
        "PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.",
        "AuthPKCECodeVerifierMissingError",
        400,
        "pkce_code_verifier_not_found",
      );
    }
  };
  G.AuthPKCECodeVerifierMissingError = Op;
  function lj(e) {
    return kr(e) && e.name === "AuthPKCECodeVerifierMissingError";
  }
  var Tp = class extends at {
    constructor(t, r) {
      super(t, "AuthRetryableFetchError", r, void 0);
    }
  };
  G.AuthRetryableFetchError = Tp;
  function hj(e) {
    return kr(e) && e.name === "AuthRetryableFetchError";
  }
  var jp = class extends at {
    constructor(t, r, i) {
      super(t, "AuthWeakPasswordError", r, "weak_password"), (this.reasons = i);
    }
  };
  G.AuthWeakPasswordError = jp;
  function dj(e) {
    return kr(e) && e.name === "AuthWeakPasswordError";
  }
  var Pp = class extends at {
    constructor(t) {
      super(t, "AuthInvalidJwtError", 400, "invalid_jwt");
    }
  };
  G.AuthInvalidJwtError = Pp;
});
var Fa = T((ct) => {
  "use strict";
  Object.defineProperty(ct, "__esModule", {value: !0});
  ct.byteToBase64URL = Yi;
  ct.byteFromBase64URL = Np;
  ct.stringToBase64URL = pj;
  ct.stringFromBase64URL = mj;
  ct.codepointToUTF8 = g0;
  ct.stringToUTF8 = Rp;
  ct.stringFromUTF8 = v0;
  ct.base64UrlToUint8Array = gj;
  ct.stringToUint8Array = vj;
  ct.bytesToBase64URL = _j;
  var La = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),
    m0 = ` 	
\r=`.split(""),
    fj = (() => {
      let e = new Array(128);
      for (let t = 0; t < e.length; t += 1) e[t] = -1;
      for (let t = 0; t < m0.length; t += 1) e[m0[t].charCodeAt(0)] = -2;
      for (let t = 0; t < La.length; t += 1) e[La[t].charCodeAt(0)] = t;
      return e;
    })();
  function Yi(e, t, r) {
    if (e !== null)
      for (t.queue = (t.queue << 8) | e, t.queuedBits += 8; t.queuedBits >= 6; ) {
        let i = (t.queue >> (t.queuedBits - 6)) & 63;
        r(La[i]), (t.queuedBits -= 6);
      }
    else if (t.queuedBits > 0)
      for (
        t.queue = t.queue << (6 - t.queuedBits), t.queuedBits = 6;
        t.queuedBits >= 6;
      ) {
        let i = (t.queue >> (t.queuedBits - 6)) & 63;
        r(La[i]), (t.queuedBits -= 6);
      }
  }
  function Np(e, t, r) {
    let i = fj[e];
    if (i > -1)
      for (t.queue = (t.queue << 6) | i, t.queuedBits += 6; t.queuedBits >= 8; )
        r((t.queue >> (t.queuedBits - 8)) & 255), (t.queuedBits -= 8);
    else {
      if (i === -2) return;
      throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`);
    }
  }
  function pj(e) {
    let t = [],
      r = (n) => {
        t.push(n);
      },
      i = {queue: 0, queuedBits: 0};
    return (
      Rp(e, (n) => {
        Yi(n, i, r);
      }),
      Yi(null, i, r),
      t.join("")
    );
  }
  function mj(e) {
    let t = [],
      r = (s) => {
        t.push(String.fromCodePoint(s));
      },
      i = {utf8seq: 0, codepoint: 0},
      n = {queue: 0, queuedBits: 0},
      o = (s) => {
        v0(s, i, r);
      };
    for (let s = 0; s < e.length; s += 1) Np(e.charCodeAt(s), n, o);
    return t.join("");
  }
  function g0(e, t) {
    if (e <= 127) {
      t(e);
      return;
    } else if (e <= 2047) {
      t(192 | (e >> 6)), t(128 | (e & 63));
      return;
    } else if (e <= 65535) {
      t(224 | (e >> 12)), t(128 | ((e >> 6) & 63)), t(128 | (e & 63));
      return;
    } else if (e <= 1114111) {
      t(240 | (e >> 18)),
        t(128 | ((e >> 12) & 63)),
        t(128 | ((e >> 6) & 63)),
        t(128 | (e & 63));
      return;
    }
    throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`);
  }
  function Rp(e, t) {
    for (let r = 0; r < e.length; r += 1) {
      let i = e.charCodeAt(r);
      if (i > 55295 && i <= 56319) {
        let n = ((i - 55296) * 1024) & 65535;
        (i = (((e.charCodeAt(r + 1) - 56320) & 65535) | n) + 65536), (r += 1);
      }
      g0(i, t);
    }
  }
  function v0(e, t, r) {
    if (t.utf8seq === 0) {
      if (e <= 127) {
        r(e);
        return;
      }
      for (let i = 1; i < 6; i += 1)
        if (((e >> (7 - i)) & 1) === 0) {
          t.utf8seq = i;
          break;
        }
      if (t.utf8seq === 2) t.codepoint = e & 31;
      else if (t.utf8seq === 3) t.codepoint = e & 15;
      else if (t.utf8seq === 4) t.codepoint = e & 7;
      else throw new Error("Invalid UTF-8 sequence");
      t.utf8seq -= 1;
    } else if (t.utf8seq > 0) {
      if (e <= 127) throw new Error("Invalid UTF-8 sequence");
      (t.codepoint = (t.codepoint << 6) | (e & 63)),
        (t.utf8seq -= 1),
        t.utf8seq === 0 && r(t.codepoint);
    }
  }
  function gj(e) {
    let t = [],
      r = {queue: 0, queuedBits: 0},
      i = (n) => {
        t.push(n);
      };
    for (let n = 0; n < e.length; n += 1) Np(e.charCodeAt(n), r, i);
    return new Uint8Array(t);
  }
  function vj(e) {
    let t = [];
    return Rp(e, (r) => t.push(r)), new Uint8Array(t);
  }
  function _j(e) {
    let t = [],
      r = {queue: 0, queuedBits: 0},
      i = (n) => {
        t.push(n);
      };
    return e.forEach((n) => Yi(n, r, i)), Yi(null, r, i), t.join("");
  }
});
var Rn = T((W) => {
  "use strict";
  Object.defineProperty(W, "__esModule", {value: !0});
  W.Deferred =
    W.removeItemAsync =
    W.getItemAsync =
    W.setItemAsync =
    W.looksLikeFetchResponse =
    W.resolveFetch =
    W.supportsLocalStorage =
    W.isBrowser =
      void 0;
  W.expiresAt = yj;
  W.generateCallbackId = bj;
  W.parseParametersFromURL = Sj;
  W.decodeJWT = Oj;
  W.sleep = Tj;
  W.retryable = jj;
  W.generatePKCEVerifier = b0;
  W.generatePKCEChallenge = w0;
  W.getCodeChallengeAndMethod = Rj;
  W.parseResponseAPIVersion = zj;
  W.validateExp = Uj;
  W.getAlgorithm = Dj;
  W.validateUUID = Fj;
  W.userNotAvailableProxy = Mj;
  W.insecureUserWarningProxy = Bj;
  W.deepClone = Zj;
  var y0 = Da(),
    _0 = Ar(),
    Cp = Fa();
  function yj(e) {
    return Math.round(Date.now() / 1e3) + e;
  }
  function bj() {
    return Symbol("auth-callback");
  }
  var wj = () => typeof window < "u" && typeof document < "u";
  W.isBrowser = wj;
  var Ir = {tested: !1, writable: !1},
    xj = () => {
      if (!(0, W.isBrowser)()) return !1;
      try {
        if (typeof globalThis.localStorage != "object") return !1;
      } catch {
        return !1;
      }
      if (Ir.tested) return Ir.writable;
      let e = `lswt-${Math.random()}${Math.random()}`;
      try {
        globalThis.localStorage.setItem(e, e),
          globalThis.localStorage.removeItem(e),
          (Ir.tested = !0),
          (Ir.writable = !0);
      } catch {
        (Ir.tested = !0), (Ir.writable = !1);
      }
      return Ir.writable;
    };
  W.supportsLocalStorage = xj;
  function Sj(e) {
    let t = {},
      r = new URL(e);
    if (r.hash && r.hash[0] === "#")
      try {
        new URLSearchParams(r.hash.substring(1)).forEach((n, o) => {
          t[o] = n;
        });
      } catch {}
    return (
      r.searchParams.forEach((i, n) => {
        t[n] = i;
      }),
      t
    );
  }
  var $j = (e) => (e ? (...t) => e(...t) : (...t) => fetch(...t));
  W.resolveFetch = $j;
  var Ej = (e) =>
    typeof e == "object" &&
    e !== null &&
    "status" in e &&
    "ok" in e &&
    "json" in e &&
    typeof e.json == "function";
  W.looksLikeFetchResponse = Ej;
  var kj = async (e, t, r) => {
    await e.setItem(t, JSON.stringify(r));
  };
  W.setItemAsync = kj;
  var Aj = async (e, t) => {
    let r = await e.getItem(t);
    if (!r) return null;
    try {
      return JSON.parse(r);
    } catch {
      return r;
    }
  };
  W.getItemAsync = Aj;
  var Ij = async (e, t) => {
    await e.removeItem(t);
  };
  W.removeItemAsync = Ij;
  var Ma = class e {
    constructor() {
      this.promise = new e.promiseConstructor((t, r) => {
        (this.resolve = t), (this.reject = r);
      });
    }
  };
  W.Deferred = Ma;
  Ma.promiseConstructor = Promise;
  function Oj(e) {
    let t = e.split(".");
    if (t.length !== 3) throw new _0.AuthInvalidJwtError("Invalid JWT structure");
    for (let i = 0; i < t.length; i++)
      if (!y0.BASE64URL_REGEX.test(t[i]))
        throw new _0.AuthInvalidJwtError("JWT not in base64url format");
    return {
      header: JSON.parse((0, Cp.stringFromBase64URL)(t[0])),
      payload: JSON.parse((0, Cp.stringFromBase64URL)(t[1])),
      signature: (0, Cp.base64UrlToUint8Array)(t[2]),
      raw: {header: t[0], payload: t[1]},
    };
  }
  async function Tj(e) {
    return await new Promise((t) => {
      setTimeout(() => t(null), e);
    });
  }
  function jj(e, t) {
    return new Promise((i, n) => {
      (async () => {
        for (let o = 0; o < 1 / 0; o++)
          try {
            let s = await e(o);
            if (!t(o, null, s)) {
              i(s);
              return;
            }
          } catch (s) {
            if (!t(o, s)) {
              n(s);
              return;
            }
          }
      })();
    });
  }
  function Pj(e) {
    return ("0" + e.toString(16)).substr(-2);
  }
  function b0() {
    let t = new Uint32Array(56);
    if (typeof crypto > "u") {
      let r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
        i = r.length,
        n = "";
      for (let o = 0; o < 56; o++) n += r.charAt(Math.floor(Math.random() * i));
      return n;
    }
    return crypto.getRandomValues(t), Array.from(t, Pj).join("");
  }
  async function Nj(e) {
    let r = new TextEncoder().encode(e),
      i = await crypto.subtle.digest("SHA-256", r),
      n = new Uint8Array(i);
    return Array.from(n)
      .map((o) => String.fromCharCode(o))
      .join("");
  }
  async function w0(e) {
    if (
      !(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u")
    )
      return (
        console.warn(
          "WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.",
        ),
        e
      );
    let r = await Nj(e);
    return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  async function Rj(e, t, r = !1) {
    let i = b0(),
      n = i;
    r && (n += "/PASSWORD_RECOVERY"),
      await (0, W.setItemAsync)(e, `${t}-code-verifier`, n);
    let o = await w0(i);
    return [o, i === o ? "plain" : "s256"];
  }
  var Cj = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
  function zj(e) {
    let t = e.headers.get(y0.API_VERSION_HEADER_NAME);
    if (!t || !t.match(Cj)) return null;
    try {
      return new Date(`${t}T00:00:00.0Z`);
    } catch {
      return null;
    }
  }
  function Uj(e) {
    if (!e) throw new Error("Missing exp claim");
    let t = Math.floor(Date.now() / 1e3);
    if (e <= t) throw new Error("JWT has expired");
  }
  function Dj(e) {
    switch (e) {
      case "RS256":
        return {name: "RSASSA-PKCS1-v1_5", hash: {name: "SHA-256"}};
      case "ES256":
        return {name: "ECDSA", namedCurve: "P-256", hash: {name: "SHA-256"}};
      default:
        throw new Error("Invalid alg claim");
    }
  }
  var Lj = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  function Fj(e) {
    if (!Lj.test(e))
      throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
  }
  function Mj() {
    let e = {};
    return new Proxy(e, {
      get: (t, r) => {
        if (r === "__isUserNotAvailableProxy") return !0;
        if (typeof r == "symbol") {
          let i = r.toString();
          if (
            i === "Symbol(Symbol.toPrimitive)" ||
            i === "Symbol(Symbol.toStringTag)" ||
            i === "Symbol(util.inspect.custom)"
          )
            return;
        }
        throw new Error(
          `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`,
        );
      },
      set: (t, r) => {
        throw new Error(
          `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
        );
      },
      deleteProperty: (t, r) => {
        throw new Error(
          `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
        );
      },
    });
  }
  function Bj(e, t) {
    return new Proxy(e, {
      get: (r, i, n) => {
        if (i === "__isInsecureUserWarningProxy") return !0;
        if (typeof i == "symbol") {
          let o = i.toString();
          if (
            o === "Symbol(Symbol.toPrimitive)" ||
            o === "Symbol(Symbol.toStringTag)" ||
            o === "Symbol(util.inspect.custom)" ||
            o === "Symbol(nodejs.util.inspect.custom)"
          )
            return Reflect.get(r, i, n);
        }
        return (
          !t.value &&
            typeof i == "string" &&
            (console.warn(
              "Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.",
            ),
            (t.value = !0)),
          Reflect.get(r, i, n)
        );
      },
    });
  }
  function Zj(e) {
    return JSON.parse(JSON.stringify(e));
  }
});
var Dp = T((It) => {
  "use strict";
  Object.defineProperty(It, "__esModule", {value: !0});
  It.handleError = Up;
  It._request = Jj;
  It._sessionResponse = x0;
  It._sessionResponsePassword = Gj;
  It._userResponse = Hj;
  It._ssoResponse = Yj;
  It._generateLinkResponse = Xj;
  It._noResolveJsonResponse = Qj;
  var qj = (ot(), ht(it)),
    Ba = Da(),
    zp = Rn(),
    ar = Ar(),
    Or = (e) =>
      e.msg || e.message || e.error_description || e.error || JSON.stringify(e),
    Vj = [502, 503, 504];
  async function Up(e) {
    var t;
    if (!(0, zp.looksLikeFetchResponse)(e))
      throw new ar.AuthRetryableFetchError(Or(e), 0);
    if (Vj.includes(e.status)) throw new ar.AuthRetryableFetchError(Or(e), e.status);
    let r;
    try {
      r = await e.json();
    } catch (o) {
      throw new ar.AuthUnknownError(Or(o), o);
    }
    let i,
      n = (0, zp.parseResponseAPIVersion)(e);
    if (
      (n &&
      n.getTime() >= Ba.API_VERSIONS["2024-01-01"].timestamp &&
      typeof r == "object" &&
      r &&
      typeof r.code == "string"
        ? (i = r.code)
        : typeof r == "object" &&
          r &&
          typeof r.error_code == "string" &&
          (i = r.error_code),
      i)
    ) {
      if (i === "weak_password")
        throw new ar.AuthWeakPasswordError(
          Or(r),
          e.status,
          ((t = r.weak_password) === null || t === void 0 ? void 0 : t.reasons) || [],
        );
      if (i === "session_not_found") throw new ar.AuthSessionMissingError();
    } else if (
      typeof r == "object" &&
      r &&
      typeof r.weak_password == "object" &&
      r.weak_password &&
      Array.isArray(r.weak_password.reasons) &&
      r.weak_password.reasons.length &&
      r.weak_password.reasons.reduce((o, s) => o && typeof s == "string", !0)
    )
      throw new ar.AuthWeakPasswordError(Or(r), e.status, r.weak_password.reasons);
    throw new ar.AuthApiError(Or(r), e.status || 500, i);
  }
  var Wj = (e, t, r, i) => {
    let n = {method: e, headers: t?.headers || {}};
    return e === "GET"
      ? n
      : ((n.headers = Object.assign(
          {"Content-Type": "application/json;charset=UTF-8"},
          t?.headers,
        )),
        (n.body = JSON.stringify(i)),
        Object.assign(Object.assign({}, n), r));
  };
  async function Jj(e, t, r, i) {
    var n;
    let o = Object.assign({}, i?.headers);
    o[Ba.API_VERSION_HEADER_NAME] ||
      (o[Ba.API_VERSION_HEADER_NAME] = Ba.API_VERSIONS["2024-01-01"].name),
      i?.jwt && (o.Authorization = `Bearer ${i.jwt}`);
    let s = (n = i?.query) !== null && n !== void 0 ? n : {};
    i?.redirectTo && (s.redirect_to = i.redirectTo);
    let a = Object.keys(s).length ? "?" + new URLSearchParams(s).toString() : "",
      c = await Kj(
        e,
        t,
        r + a,
        {headers: o, noResolveJson: i?.noResolveJson},
        {},
        i?.body,
      );
    return i?.xform ? i?.xform(c) : {data: Object.assign({}, c), error: null};
  }
  async function Kj(e, t, r, i, n, o) {
    let s = Wj(t, i, n, o),
      a;
    try {
      a = await e(r, Object.assign({}, s));
    } catch (c) {
      throw (console.error(c), new ar.AuthRetryableFetchError(Or(c), 0));
    }
    if ((a.ok || (await Up(a)), i?.noResolveJson)) return a;
    try {
      return await a.json();
    } catch (c) {
      await Up(c);
    }
  }
  function x0(e) {
    var t;
    let r = null;
    eP(e) &&
      ((r = Object.assign({}, e)),
      e.expires_at || (r.expires_at = (0, zp.expiresAt)(e.expires_in)));
    let i = (t = e.user) !== null && t !== void 0 ? t : e;
    return {data: {session: r, user: i}, error: null};
  }
  function Gj(e) {
    let t = x0(e);
    return (
      !t.error &&
        e.weak_password &&
        typeof e.weak_password == "object" &&
        Array.isArray(e.weak_password.reasons) &&
        e.weak_password.reasons.length &&
        e.weak_password.message &&
        typeof e.weak_password.message == "string" &&
        e.weak_password.reasons.reduce((r, i) => r && typeof i == "string", !0) &&
        (t.data.weak_password = e.weak_password),
      t
    );
  }
  function Hj(e) {
    var t;
    return {data: {user: (t = e.user) !== null && t !== void 0 ? t : e}, error: null};
  }
  function Yj(e) {
    return {data: e, error: null};
  }
  function Xj(e) {
    let {
        action_link: t,
        email_otp: r,
        hashed_token: i,
        redirect_to: n,
        verification_type: o,
      } = e,
      s = qj.__rest(e, [
        "action_link",
        "email_otp",
        "hashed_token",
        "redirect_to",
        "verification_type",
      ]),
      a = {
        action_link: t,
        email_otp: r,
        hashed_token: i,
        redirect_to: n,
        verification_type: o,
      },
      c = Object.assign({}, s);
    return {data: {properties: a, user: c}, error: null};
  }
  function Qj(e) {
    return e;
  }
  function eP(e) {
    return e.access_token && e.refresh_token && e.expires_in;
  }
});
var Lp = T((Za) => {
  "use strict";
  Object.defineProperty(Za, "__esModule", {value: !0});
  Za.SIGN_OUT_SCOPES = void 0;
  Za.SIGN_OUT_SCOPES = ["global", "local", "others"];
});
var qa = T((Bp) => {
  "use strict";
  Object.defineProperty(Bp, "__esModule", {value: !0});
  var tP = (ot(), ht(it)),
    ae = Dp(),
    Tr = Rn(),
    Fp = Lp(),
    Te = Ar(),
    Mp = class {
      constructor({url: t = "", headers: r = {}, fetch: i}) {
        (this.url = t),
          (this.headers = r),
          (this.fetch = (0, Tr.resolveFetch)(i)),
          (this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this),
          }),
          (this.oauth = {
            listClients: this._listOAuthClients.bind(this),
            createClient: this._createOAuthClient.bind(this),
            getClient: this._getOAuthClient.bind(this),
            updateClient: this._updateOAuthClient.bind(this),
            deleteClient: this._deleteOAuthClient.bind(this),
            regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this),
          });
      }
      async signOut(t, r = Fp.SIGN_OUT_SCOPES[0]) {
        if (Fp.SIGN_OUT_SCOPES.indexOf(r) < 0)
          throw new Error(
            `@supabase/auth-js: Parameter scope must be one of ${Fp.SIGN_OUT_SCOPES.join(", ")}`,
          );
        try {
          return (
            await (0, ae._request)(
              this.fetch,
              "POST",
              `${this.url}/logout?scope=${r}`,
              {headers: this.headers, jwt: t, noResolveJson: !0},
            ),
            {data: null, error: null}
          );
        } catch (i) {
          if ((0, Te.isAuthError)(i)) return {data: null, error: i};
          throw i;
        }
      }
      async inviteUserByEmail(t, r = {}) {
        try {
          return await (0, ae._request)(this.fetch, "POST", `${this.url}/invite`, {
            body: {email: t, data: r.data},
            headers: this.headers,
            redirectTo: r.redirectTo,
            xform: ae._userResponse,
          });
        } catch (i) {
          if ((0, Te.isAuthError)(i)) return {data: {user: null}, error: i};
          throw i;
        }
      }
      async generateLink(t) {
        try {
          let {options: r} = t,
            i = tP.__rest(t, ["options"]),
            n = Object.assign(Object.assign({}, i), r);
          return (
            "newEmail" in i && ((n.new_email = i?.newEmail), delete n.newEmail),
            await (0, ae._request)(
              this.fetch,
              "POST",
              `${this.url}/admin/generate_link`,
              {
                body: n,
                headers: this.headers,
                xform: ae._generateLinkResponse,
                redirectTo: r?.redirectTo,
              },
            )
          );
        } catch (r) {
          if ((0, Te.isAuthError)(r))
            return {data: {properties: null, user: null}, error: r};
          throw r;
        }
      }
      async createUser(t) {
        try {
          return await (0, ae._request)(this.fetch, "POST", `${this.url}/admin/users`, {
            body: t,
            headers: this.headers,
            xform: ae._userResponse,
          });
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: {user: null}, error: r};
          throw r;
        }
      }
      async listUsers(t) {
        var r, i, n, o, s, a, c;
        try {
          let u = {nextPage: null, lastPage: 0, total: 0},
            l = await (0, ae._request)(this.fetch, "GET", `${this.url}/admin/users`, {
              headers: this.headers,
              noResolveJson: !0,
              query: {
                page:
                  (i =
                    (r = t?.page) === null || r === void 0 ? void 0 : r.toString()) !==
                    null && i !== void 0
                    ? i
                    : "",
                per_page:
                  (o =
                    (n = t?.perPage) === null || n === void 0
                      ? void 0
                      : n.toString()) !== null && o !== void 0
                    ? o
                    : "",
              },
              xform: ae._noResolveJsonResponse,
            });
          if (l.error) throw l.error;
          let h = await l.json(),
            f = (s = l.headers.get("x-total-count")) !== null && s !== void 0 ? s : 0,
            d =
              (c =
                (a = l.headers.get("link")) === null || a === void 0
                  ? void 0
                  : a.split(",")) !== null && c !== void 0
                ? c
                : [];
          return (
            d.length > 0 &&
              (d.forEach((p) => {
                let m = parseInt(p.split(";")[0].split("=")[1].substring(0, 1)),
                  v = JSON.parse(p.split(";")[1].split("=")[1]);
                u[`${v}Page`] = m;
              }),
              (u.total = parseInt(f))),
            {data: Object.assign(Object.assign({}, h), u), error: null}
          );
        } catch (u) {
          if ((0, Te.isAuthError)(u)) return {data: {users: []}, error: u};
          throw u;
        }
      }
      async getUserById(t) {
        (0, Tr.validateUUID)(t);
        try {
          return await (0, ae._request)(
            this.fetch,
            "GET",
            `${this.url}/admin/users/${t}`,
            {headers: this.headers, xform: ae._userResponse},
          );
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: {user: null}, error: r};
          throw r;
        }
      }
      async updateUserById(t, r) {
        (0, Tr.validateUUID)(t);
        try {
          return await (0, ae._request)(
            this.fetch,
            "PUT",
            `${this.url}/admin/users/${t}`,
            {body: r, headers: this.headers, xform: ae._userResponse},
          );
        } catch (i) {
          if ((0, Te.isAuthError)(i)) return {data: {user: null}, error: i};
          throw i;
        }
      }
      async deleteUser(t, r = !1) {
        (0, Tr.validateUUID)(t);
        try {
          return await (0, ae._request)(
            this.fetch,
            "DELETE",
            `${this.url}/admin/users/${t}`,
            {
              headers: this.headers,
              body: {should_soft_delete: r},
              xform: ae._userResponse,
            },
          );
        } catch (i) {
          if ((0, Te.isAuthError)(i)) return {data: {user: null}, error: i};
          throw i;
        }
      }
      async _listFactors(t) {
        (0, Tr.validateUUID)(t.userId);
        try {
          let {data: r, error: i} = await (0, ae._request)(
            this.fetch,
            "GET",
            `${this.url}/admin/users/${t.userId}/factors`,
            {headers: this.headers, xform: (n) => ({data: {factors: n}, error: null})},
          );
          return {data: r, error: i};
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: null, error: r};
          throw r;
        }
      }
      async _deleteFactor(t) {
        (0, Tr.validateUUID)(t.userId), (0, Tr.validateUUID)(t.id);
        try {
          return {
            data: await (0, ae._request)(
              this.fetch,
              "DELETE",
              `${this.url}/admin/users/${t.userId}/factors/${t.id}`,
              {headers: this.headers},
            ),
            error: null,
          };
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: null, error: r};
          throw r;
        }
      }
      async _listOAuthClients(t) {
        var r, i, n, o, s, a, c;
        try {
          let u = {nextPage: null, lastPage: 0, total: 0},
            l = await (0, ae._request)(
              this.fetch,
              "GET",
              `${this.url}/admin/oauth/clients`,
              {
                headers: this.headers,
                noResolveJson: !0,
                query: {
                  page:
                    (i =
                      (r = t?.page) === null || r === void 0
                        ? void 0
                        : r.toString()) !== null && i !== void 0
                      ? i
                      : "",
                  per_page:
                    (o =
                      (n = t?.perPage) === null || n === void 0
                        ? void 0
                        : n.toString()) !== null && o !== void 0
                      ? o
                      : "",
                },
                xform: ae._noResolveJsonResponse,
              },
            );
          if (l.error) throw l.error;
          let h = await l.json(),
            f = (s = l.headers.get("x-total-count")) !== null && s !== void 0 ? s : 0,
            d =
              (c =
                (a = l.headers.get("link")) === null || a === void 0
                  ? void 0
                  : a.split(",")) !== null && c !== void 0
                ? c
                : [];
          return (
            d.length > 0 &&
              (d.forEach((p) => {
                let m = parseInt(p.split(";")[0].split("=")[1].substring(0, 1)),
                  v = JSON.parse(p.split(";")[1].split("=")[1]);
                u[`${v}Page`] = m;
              }),
              (u.total = parseInt(f))),
            {data: Object.assign(Object.assign({}, h), u), error: null}
          );
        } catch (u) {
          if ((0, Te.isAuthError)(u)) return {data: {clients: []}, error: u};
          throw u;
        }
      }
      async _createOAuthClient(t) {
        try {
          return await (0, ae._request)(
            this.fetch,
            "POST",
            `${this.url}/admin/oauth/clients`,
            {body: t, headers: this.headers, xform: (r) => ({data: r, error: null})},
          );
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: null, error: r};
          throw r;
        }
      }
      async _getOAuthClient(t) {
        try {
          return await (0, ae._request)(
            this.fetch,
            "GET",
            `${this.url}/admin/oauth/clients/${t}`,
            {headers: this.headers, xform: (r) => ({data: r, error: null})},
          );
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: null, error: r};
          throw r;
        }
      }
      async _updateOAuthClient(t, r) {
        try {
          return await (0, ae._request)(
            this.fetch,
            "PUT",
            `${this.url}/admin/oauth/clients/${t}`,
            {body: r, headers: this.headers, xform: (i) => ({data: i, error: null})},
          );
        } catch (i) {
          if ((0, Te.isAuthError)(i)) return {data: null, error: i};
          throw i;
        }
      }
      async _deleteOAuthClient(t) {
        try {
          return (
            await (0, ae._request)(
              this.fetch,
              "DELETE",
              `${this.url}/admin/oauth/clients/${t}`,
              {headers: this.headers, noResolveJson: !0},
            ),
            {data: null, error: null}
          );
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: null, error: r};
          throw r;
        }
      }
      async _regenerateOAuthClientSecret(t) {
        try {
          return await (0, ae._request)(
            this.fetch,
            "POST",
            `${this.url}/admin/oauth/clients/${t}/regenerate_secret`,
            {headers: this.headers, xform: (r) => ({data: r, error: null})},
          );
        } catch (r) {
          if ((0, Te.isAuthError)(r)) return {data: null, error: r};
          throw r;
        }
      }
    };
  Bp.default = Mp;
});
var S0 = T((Zp) => {
  "use strict";
  Object.defineProperty(Zp, "__esModule", {value: !0});
  Zp.memoryLocalStorageAdapter = rP;
  function rP(e = {}) {
    return {
      getItem: (t) => e[t] || null,
      setItem: (t, r) => {
        e[t] = r;
      },
      removeItem: (t) => {
        delete e[t];
      },
    };
  }
});
var qp = T(($e) => {
  "use strict";
  Object.defineProperty($e, "__esModule", {value: !0});
  $e.ProcessLockAcquireTimeoutError =
    $e.NavigatorLockAcquireTimeoutError =
    $e.LockAcquireTimeoutError =
    $e.internals =
      void 0;
  $e.navigatorLock = iP;
  $e.processLock = oP;
  var nP = Rn();
  $e.internals = {
    debug: !!(
      globalThis &&
      (0, nP.supportsLocalStorage)() &&
      globalThis.localStorage &&
      globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true"
    ),
  };
  var Xi = class extends Error {
    constructor(t) {
      super(t), (this.isAcquireTimeout = !0);
    }
  };
  $e.LockAcquireTimeoutError = Xi;
  var Va = class extends Xi {};
  $e.NavigatorLockAcquireTimeoutError = Va;
  var Wa = class extends Xi {};
  $e.ProcessLockAcquireTimeoutError = Wa;
  async function iP(e, t, r) {
    $e.internals.debug &&
      console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e, t);
    let i = new globalThis.AbortController();
    return (
      t > 0 &&
        setTimeout(() => {
          i.abort(),
            $e.internals.debug &&
              console.log("@supabase/gotrue-js: navigatorLock acquire timed out", e);
        }, t),
      await Promise.resolve().then(() =>
        globalThis.navigator.locks.request(
          e,
          t === 0
            ? {mode: "exclusive", ifAvailable: !0}
            : {mode: "exclusive", signal: i.signal},
          async (n) => {
            if (n) {
              $e.internals.debug &&
                console.log("@supabase/gotrue-js: navigatorLock: acquired", e, n.name);
              try {
                return await r();
              } finally {
                $e.internals.debug &&
                  console.log(
                    "@supabase/gotrue-js: navigatorLock: released",
                    e,
                    n.name,
                  );
              }
            } else {
              if (t === 0)
                throw (
                  ($e.internals.debug &&
                    console.log(
                      "@supabase/gotrue-js: navigatorLock: not immediately available",
                      e,
                    ),
                  new Va(
                    `Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`,
                  ))
                );
              if ($e.internals.debug)
                try {
                  let o = await globalThis.navigator.locks.query();
                  console.log(
                    "@supabase/gotrue-js: Navigator LockManager state",
                    JSON.stringify(o, null, "  "),
                  );
                } catch (o) {
                  console.warn(
                    "@supabase/gotrue-js: Error when querying Navigator LockManager state",
                    o,
                  );
                }
              return (
                console.warn(
                  "@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request",
                ),
                await r()
              );
            }
          },
        ),
      )
    );
  }
  var $0 = {};
  async function oP(e, t, r) {
    var i;
    let n = (i = $0[e]) !== null && i !== void 0 ? i : Promise.resolve(),
      o = Promise.race(
        [
          n.catch(() => null),
          t >= 0
            ? new Promise((s, a) => {
                setTimeout(() => {
                  a(new Wa(`Acquiring process lock with name "${e}" timed out`));
                }, t);
              })
            : null,
        ].filter((s) => s),
      )
        .catch((s) => {
          if (s && s.isAcquireTimeout) throw s;
          return null;
        })
        .then(async () => await r());
    return (
      ($0[e] = o.catch(async (s) => {
        if (s && s.isAcquireTimeout) return await n, null;
        throw s;
      })),
      await o
    );
  }
});
var E0 = T((Vp) => {
  "use strict";
  Object.defineProperty(Vp, "__esModule", {value: !0});
  Vp.polyfillGlobalThis = sP;
  function sP() {
    if (typeof globalThis != "object")
      try {
        Object.defineProperty(Object.prototype, "__magic__", {
          get: function () {
            return this;
          },
          configurable: !0,
        }),
          (__magic__.globalThis = __magic__),
          delete Object.prototype.__magic__;
      } catch {
        typeof self < "u" && (self.globalThis = self);
      }
  }
});
var A0 = T((Cn) => {
  "use strict";
  Object.defineProperty(Cn, "__esModule", {value: !0});
  Cn.getAddress = k0;
  Cn.fromHex = aP;
  Cn.toHex = cP;
  Cn.createSiweMessage = uP;
  function k0(e) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(e))
      throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);
    return e.toLowerCase();
  }
  function aP(e) {
    return parseInt(e, 16);
  }
  function cP(e) {
    let t = new TextEncoder().encode(e);
    return "0x" + Array.from(t, (i) => i.toString(16).padStart(2, "0")).join("");
  }
  function uP(e) {
    var t;
    let {
      chainId: r,
      domain: i,
      expirationTime: n,
      issuedAt: o = new Date(),
      nonce: s,
      notBefore: a,
      requestId: c,
      resources: u,
      scheme: l,
      uri: h,
      version: f,
    } = e;
    {
      if (!Number.isInteger(r))
        throw new Error(
          `@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`,
        );
      if (!i)
        throw new Error(
          '@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.',
        );
      if (s && s.length < 8)
        throw new Error(
          `@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${s}`,
        );
      if (!h)
        throw new Error(
          '@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.',
        );
      if (f !== "1")
        throw new Error(
          `@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`,
        );
      if (
        !((t = e.statement) === null || t === void 0) &&
        t.includes(`
`)
      )
        throw new Error(
          `@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`,
        );
    }
    let d = k0(e.address),
      p = l ? `${l}://${i}` : i,
      m = e.statement
        ? `${e.statement}
`
        : "",
      v = `${p} wants you to sign in with your Ethereum account:
${d}

${m}`,
      w = `URI: ${h}
Version: ${f}
Chain ID: ${r}${
        s
          ? `
Nonce: ${s}`
          : ""
      }
Issued At: ${o.toISOString()}`;
    if (
      (n &&
        (w += `
Expiration Time: ${n.toISOString()}`),
      a &&
        (w += `
Not Before: ${a.toISOString()}`),
      c &&
        (w += `
Request ID: ${c}`),
      u)
    ) {
      let $ = `
Resources:`;
      for (let b of u) {
        if (!b || typeof b != "string")
          throw new Error(
            `@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`,
          );
        $ += `
- ${b}`;
      }
      w += $;
    }
    return `${v}
${w}`;
  }
});
var O0 = T((Lt) => {
  "use strict";
  Object.defineProperty(Lt, "__esModule", {value: !0});
  Lt.WebAuthnUnknownError = Lt.WebAuthnError = void 0;
  Lt.isWebAuthnError = lP;
  Lt.identifyRegistrationError = hP;
  Lt.identifyAuthenticationError = dP;
  var I0 = Jp(),
    ue = class extends Error {
      constructor({message: t, code: r, cause: i, name: n}) {
        var o;
        super(t, {cause: i}),
          (this.__isWebAuthnError = !0),
          (this.name =
            (o = n ?? (i instanceof Error ? i.name : void 0)) !== null && o !== void 0
              ? o
              : "Unknown Error"),
          (this.code = r);
      }
    };
  Lt.WebAuthnError = ue;
  var Wp = class extends ue {
    constructor(t, r) {
      super({code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: r, message: t}),
        (this.name = "WebAuthnUnknownError"),
        (this.originalError = r);
    }
  };
  Lt.WebAuthnUnknownError = Wp;
  function lP(e) {
    return typeof e == "object" && e !== null && "__isWebAuthnError" in e;
  }
  function hP({error: e, options: t}) {
    var r, i, n;
    let {publicKey: o} = t;
    if (!o) throw Error("options was missing required publicKey property");
    if (e.name === "AbortError") {
      if (t.signal instanceof AbortSignal)
        return new ue({
          message: "Registration ceremony was sent an abort signal",
          code: "ERROR_CEREMONY_ABORTED",
          cause: e,
        });
    } else if (e.name === "ConstraintError") {
      if (
        ((r = o.authenticatorSelection) === null || r === void 0
          ? void 0
          : r.requireResidentKey) === !0
      )
        return new ue({
          message:
            "Discoverable credentials were required but no available authenticator supported it",
          code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
          cause: e,
        });
      if (
        t.mediation === "conditional" &&
        ((i = o.authenticatorSelection) === null || i === void 0
          ? void 0
          : i.userVerification) === "required"
      )
        return new ue({
          message:
            "User verification was required during automatic registration but it could not be performed",
          code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
          cause: e,
        });
      if (
        ((n = o.authenticatorSelection) === null || n === void 0
          ? void 0
          : n.userVerification) === "required"
      )
        return new ue({
          message:
            "User verification was required but no available authenticator supported it",
          code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
          cause: e,
        });
    } else {
      if (e.name === "InvalidStateError")
        return new ue({
          message: "The authenticator was previously registered",
          code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
          cause: e,
        });
      if (e.name === "NotAllowedError")
        return new ue({
          message: e.message,
          code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
          cause: e,
        });
      if (e.name === "NotSupportedError")
        return o.pubKeyCredParams.filter((a) => a.type === "public-key").length === 0
          ? new ue({
              message: 'No entry in pubKeyCredParams was of type "public-key"',
              code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
              cause: e,
            })
          : new ue({
              message:
                "No available authenticator supported any of the specified pubKeyCredParams algorithms",
              code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
              cause: e,
            });
      if (e.name === "SecurityError") {
        let s = window.location.hostname;
        if ((0, I0.isValidDomain)(s)) {
          if (o.rp.id !== s)
            return new ue({
              message: `The RP ID "${o.rp.id}" is invalid for this domain`,
              code: "ERROR_INVALID_RP_ID",
              cause: e,
            });
        } else
          return new ue({
            message: `${window.location.hostname} is an invalid domain`,
            code: "ERROR_INVALID_DOMAIN",
            cause: e,
          });
      } else if (e.name === "TypeError") {
        if (o.user.id.byteLength < 1 || o.user.id.byteLength > 64)
          return new ue({
            message: "User ID was not between 1 and 64 characters",
            code: "ERROR_INVALID_USER_ID_LENGTH",
            cause: e,
          });
      } else if (e.name === "UnknownError")
        return new ue({
          message:
            "The authenticator was unable to process the specified options, or could not create a new credential",
          code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
          cause: e,
        });
    }
    return new ue({
      message: "a Non-Webauthn related error has occurred",
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: e,
    });
  }
  function dP({error: e, options: t}) {
    let {publicKey: r} = t;
    if (!r) throw Error("options was missing required publicKey property");
    if (e.name === "AbortError") {
      if (t.signal instanceof AbortSignal)
        return new ue({
          message: "Authentication ceremony was sent an abort signal",
          code: "ERROR_CEREMONY_ABORTED",
          cause: e,
        });
    } else {
      if (e.name === "NotAllowedError")
        return new ue({
          message: e.message,
          code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
          cause: e,
        });
      if (e.name === "SecurityError") {
        let i = window.location.hostname;
        if ((0, I0.isValidDomain)(i)) {
          if (r.rpId !== i)
            return new ue({
              message: `The RP ID "${r.rpId}" is invalid for this domain`,
              code: "ERROR_INVALID_RP_ID",
              cause: e,
            });
        } else
          return new ue({
            message: `${window.location.hostname} is an invalid domain`,
            code: "ERROR_INVALID_DOMAIN",
            cause: e,
          });
      } else if (e.name === "UnknownError")
        return new ue({
          message:
            "The authenticator was unable to process the specified options, or could not create a new assertion signature",
          code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
          cause: e,
        });
    }
    return new ue({
      message: "a Non-Webauthn related error has occurred",
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: e,
    });
  }
});
var Jp = T((H) => {
  "use strict";
  Object.defineProperty(H, "__esModule", {value: !0});
  H.WebAuthnApi =
    H.DEFAULT_REQUEST_OPTIONS =
    H.DEFAULT_CREATION_OPTIONS =
    H.webAuthnAbortService =
    H.WebAuthnAbortService =
    H.identifyAuthenticationError =
    H.identifyRegistrationError =
    H.isWebAuthnError =
    H.WebAuthnError =
      void 0;
  H.deserializeCredentialCreationOptions = pP;
  H.deserializeCredentialRequestOptions = mP;
  H.serializeCredentialCreationResponse = gP;
  H.serializeCredentialRequestResponse = vP;
  H.isValidDomain = _P;
  H.createCredential = P0;
  H.getCredential = N0;
  H.mergeCredentialCreationOptions = R0;
  H.mergeCredentialRequestOptions = C0;
  var j0 = (ot(), ht(it)),
    bt = Fa(),
    Ot = Ar(),
    fP = Rn(),
    Tt = O0();
  Object.defineProperty(H, "identifyAuthenticationError", {
    enumerable: !0,
    get: function () {
      return Tt.identifyAuthenticationError;
    },
  });
  Object.defineProperty(H, "identifyRegistrationError", {
    enumerable: !0,
    get: function () {
      return Tt.identifyRegistrationError;
    },
  });
  Object.defineProperty(H, "isWebAuthnError", {
    enumerable: !0,
    get: function () {
      return Tt.isWebAuthnError;
    },
  });
  Object.defineProperty(H, "WebAuthnError", {
    enumerable: !0,
    get: function () {
      return Tt.WebAuthnError;
    },
  });
  var Ja = class {
    createNewAbortSignal() {
      if (this.controller) {
        let r = new Error("Cancelling existing WebAuthn API call for new one");
        (r.name = "AbortError"), this.controller.abort(r);
      }
      let t = new AbortController();
      return (this.controller = t), t.signal;
    }
    cancelCeremony() {
      if (this.controller) {
        let t = new Error("Manually cancelling existing WebAuthn API call");
        (t.name = "AbortError"), this.controller.abort(t), (this.controller = void 0);
      }
    }
  };
  H.WebAuthnAbortService = Ja;
  H.webAuthnAbortService = new Ja();
  function pP(e) {
    if (!e) throw new Error("Credential creation options are required");
    if (
      typeof PublicKeyCredential < "u" &&
      "parseCreationOptionsFromJSON" in PublicKeyCredential &&
      typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function"
    )
      return PublicKeyCredential.parseCreationOptionsFromJSON(e);
    let {challenge: t, user: r, excludeCredentials: i} = e,
      n = j0.__rest(e, ["challenge", "user", "excludeCredentials"]),
      o = (0, bt.base64UrlToUint8Array)(t).buffer,
      s = Object.assign(Object.assign({}, r), {
        id: (0, bt.base64UrlToUint8Array)(r.id).buffer,
      }),
      a = Object.assign(Object.assign({}, n), {challenge: o, user: s});
    if (i && i.length > 0) {
      a.excludeCredentials = new Array(i.length);
      for (let c = 0; c < i.length; c++) {
        let u = i[c];
        a.excludeCredentials[c] = Object.assign(Object.assign({}, u), {
          id: (0, bt.base64UrlToUint8Array)(u.id).buffer,
          type: u.type || "public-key",
          transports: u.transports,
        });
      }
    }
    return a;
  }
  function mP(e) {
    if (!e) throw new Error("Credential request options are required");
    if (
      typeof PublicKeyCredential < "u" &&
      "parseRequestOptionsFromJSON" in PublicKeyCredential &&
      typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function"
    )
      return PublicKeyCredential.parseRequestOptionsFromJSON(e);
    let {challenge: t, allowCredentials: r} = e,
      i = j0.__rest(e, ["challenge", "allowCredentials"]),
      n = (0, bt.base64UrlToUint8Array)(t).buffer,
      o = Object.assign(Object.assign({}, i), {challenge: n});
    if (r && r.length > 0) {
      o.allowCredentials = new Array(r.length);
      for (let s = 0; s < r.length; s++) {
        let a = r[s];
        o.allowCredentials[s] = Object.assign(Object.assign({}, a), {
          id: (0, bt.base64UrlToUint8Array)(a.id).buffer,
          type: a.type || "public-key",
          transports: a.transports,
        });
      }
    }
    return o;
  }
  function gP(e) {
    var t;
    if ("toJSON" in e && typeof e.toJSON == "function") return e.toJSON();
    let r = e;
    return {
      id: e.id,
      rawId: e.id,
      response: {
        attestationObject: (0, bt.bytesToBase64URL)(
          new Uint8Array(e.response.attestationObject),
        ),
        clientDataJSON: (0, bt.bytesToBase64URL)(
          new Uint8Array(e.response.clientDataJSON),
        ),
      },
      type: "public-key",
      clientExtensionResults: e.getClientExtensionResults(),
      authenticatorAttachment:
        (t = r.authenticatorAttachment) !== null && t !== void 0 ? t : void 0,
    };
  }
  function vP(e) {
    var t;
    if ("toJSON" in e && typeof e.toJSON == "function") return e.toJSON();
    let r = e,
      i = e.getClientExtensionResults(),
      n = e.response;
    return {
      id: e.id,
      rawId: e.id,
      response: {
        authenticatorData: (0, bt.bytesToBase64URL)(
          new Uint8Array(n.authenticatorData),
        ),
        clientDataJSON: (0, bt.bytesToBase64URL)(new Uint8Array(n.clientDataJSON)),
        signature: (0, bt.bytesToBase64URL)(new Uint8Array(n.signature)),
        userHandle: n.userHandle
          ? (0, bt.bytesToBase64URL)(new Uint8Array(n.userHandle))
          : void 0,
      },
      type: "public-key",
      clientExtensionResults: i,
      authenticatorAttachment:
        (t = r.authenticatorAttachment) !== null && t !== void 0 ? t : void 0,
    };
  }
  function _P(e) {
    return e === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e);
  }
  function T0() {
    var e, t;
    return !!(
      (0, fP.isBrowser)() &&
      "PublicKeyCredential" in window &&
      window.PublicKeyCredential &&
      "credentials" in navigator &&
      typeof ((e = navigator?.credentials) === null || e === void 0
        ? void 0
        : e.create) == "function" &&
      typeof ((t = navigator?.credentials) === null || t === void 0 ? void 0 : t.get) ==
        "function"
    );
  }
  async function P0(e) {
    try {
      let t = await navigator.credentials.create(e);
      return t
        ? t instanceof PublicKeyCredential
          ? {data: t, error: null}
          : {
              data: null,
              error: new Tt.WebAuthnUnknownError(
                "Browser returned unexpected credential type",
                t,
              ),
            }
        : {
            data: null,
            error: new Tt.WebAuthnUnknownError("Empty credential response", t),
          };
    } catch (t) {
      return {
        data: null,
        error: (0, Tt.identifyRegistrationError)({error: t, options: e}),
      };
    }
  }
  async function N0(e) {
    try {
      let t = await navigator.credentials.get(e);
      return t
        ? t instanceof PublicKeyCredential
          ? {data: t, error: null}
          : {
              data: null,
              error: new Tt.WebAuthnUnknownError(
                "Browser returned unexpected credential type",
                t,
              ),
            }
        : {
            data: null,
            error: new Tt.WebAuthnUnknownError("Empty credential response", t),
          };
    } catch (t) {
      return {
        data: null,
        error: (0, Tt.identifyAuthenticationError)({error: t, options: e}),
      };
    }
  }
  H.DEFAULT_CREATION_OPTIONS = {
    hints: ["security-key"],
    authenticatorSelection: {
      authenticatorAttachment: "cross-platform",
      requireResidentKey: !1,
      userVerification: "preferred",
      residentKey: "discouraged",
    },
    attestation: "direct",
  };
  H.DEFAULT_REQUEST_OPTIONS = {
    userVerification: "preferred",
    hints: ["security-key"],
    attestation: "direct",
  };
  function Ka(...e) {
    let t = (n) => n !== null && typeof n == "object" && !Array.isArray(n),
      r = (n) => n instanceof ArrayBuffer || ArrayBuffer.isView(n),
      i = {};
    for (let n of e)
      if (n)
        for (let o in n) {
          let s = n[o];
          if (s !== void 0)
            if (Array.isArray(s)) i[o] = s;
            else if (r(s)) i[o] = s;
            else if (t(s)) {
              let a = i[o];
              t(a) ? (i[o] = Ka(a, s)) : (i[o] = Ka(s));
            } else i[o] = s;
        }
    return i;
  }
  function R0(e, t) {
    return Ka(H.DEFAULT_CREATION_OPTIONS, e, t || {});
  }
  function C0(e, t) {
    return Ka(H.DEFAULT_REQUEST_OPTIONS, e, t || {});
  }
  var Kp = class {
    constructor(t) {
      (this.client = t),
        (this.enroll = this._enroll.bind(this)),
        (this.challenge = this._challenge.bind(this)),
        (this.verify = this._verify.bind(this)),
        (this.authenticate = this._authenticate.bind(this)),
        (this.register = this._register.bind(this));
    }
    async _enroll(t) {
      return this.client.mfa.enroll(
        Object.assign(Object.assign({}, t), {factorType: "webauthn"}),
      );
    }
    async _challenge({factorId: t, webauthn: r, friendlyName: i, signal: n}, o) {
      try {
        let {data: s, error: a} = await this.client.mfa.challenge({
          factorId: t,
          webauthn: r,
        });
        if (!s) return {data: null, error: a};
        let c = n ?? H.webAuthnAbortService.createNewAbortSignal();
        if (s.webauthn.type === "create") {
          let {user: u} = s.webauthn.credential_options.publicKey;
          u.name || (u.name = `${u.id}:${i}`),
            u.displayName || (u.displayName = u.name);
        }
        switch (s.webauthn.type) {
          case "create": {
            let u = R0(s.webauthn.credential_options.publicKey, o?.create),
              {data: l, error: h} = await P0({publicKey: u, signal: c});
            return l
              ? {
                  data: {
                    factorId: t,
                    challengeId: s.id,
                    webauthn: {type: s.webauthn.type, credential_response: l},
                  },
                  error: null,
                }
              : {data: null, error: h};
          }
          case "request": {
            let u = C0(s.webauthn.credential_options.publicKey, o?.request),
              {data: l, error: h} = await N0(
                Object.assign(Object.assign({}, s.webauthn.credential_options), {
                  publicKey: u,
                  signal: c,
                }),
              );
            return l
              ? {
                  data: {
                    factorId: t,
                    challengeId: s.id,
                    webauthn: {type: s.webauthn.type, credential_response: l},
                  },
                  error: null,
                }
              : {data: null, error: h};
          }
        }
      } catch (s) {
        return (0, Ot.isAuthError)(s)
          ? {data: null, error: s}
          : {
              data: null,
              error: new Ot.AuthUnknownError("Unexpected error in challenge", s),
            };
      }
    }
    async _verify({challengeId: t, factorId: r, webauthn: i}) {
      return this.client.mfa.verify({factorId: r, challengeId: t, webauthn: i});
    }
    async _authenticate(
      {
        factorId: t,
        webauthn: {
          rpId: r = typeof window < "u" ? window.location.hostname : void 0,
          rpOrigins: i = typeof window < "u" ? [window.location.origin] : void 0,
          signal: n,
        } = {},
      },
      o,
    ) {
      if (!r)
        return {
          data: null,
          error: new Ot.AuthError("rpId is required for WebAuthn authentication"),
        };
      try {
        if (!T0())
          return {
            data: null,
            error: new Ot.AuthUnknownError("Browser does not support WebAuthn", null),
          };
        let {data: s, error: a} = await this.challenge(
          {factorId: t, webauthn: {rpId: r, rpOrigins: i}, signal: n},
          {request: o},
        );
        if (!s) return {data: null, error: a};
        let {webauthn: c} = s;
        return this._verify({
          factorId: t,
          challengeId: s.challengeId,
          webauthn: {
            type: c.type,
            rpId: r,
            rpOrigins: i,
            credential_response: c.credential_response,
          },
        });
      } catch (s) {
        return (0, Ot.isAuthError)(s)
          ? {data: null, error: s}
          : {
              data: null,
              error: new Ot.AuthUnknownError("Unexpected error in authenticate", s),
            };
      }
    }
    async _register(
      {
        friendlyName: t,
        webauthn: {
          rpId: r = typeof window < "u" ? window.location.hostname : void 0,
          rpOrigins: i = typeof window < "u" ? [window.location.origin] : void 0,
          signal: n,
        } = {},
      },
      o,
    ) {
      if (!r)
        return {
          data: null,
          error: new Ot.AuthError("rpId is required for WebAuthn registration"),
        };
      try {
        if (!T0())
          return {
            data: null,
            error: new Ot.AuthUnknownError("Browser does not support WebAuthn", null),
          };
        let {data: s, error: a} = await this._enroll({friendlyName: t});
        if (!s)
          return (
            await this.client.mfa
              .listFactors()
              .then((l) => {
                var h;
                return (h = l.data) === null || h === void 0
                  ? void 0
                  : h.all.find(
                      (f) =>
                        f.factor_type === "webauthn" &&
                        f.friendly_name === t &&
                        f.status !== "unverified",
                    );
              })
              .then((l) => (l ? this.client.mfa.unenroll({factorId: l?.id}) : void 0)),
            {data: null, error: a}
          );
        let {data: c, error: u} = await this._challenge(
          {
            factorId: s.id,
            friendlyName: s.friendly_name,
            webauthn: {rpId: r, rpOrigins: i},
            signal: n,
          },
          {create: o},
        );
        return c
          ? this._verify({
              factorId: s.id,
              challengeId: c.challengeId,
              webauthn: {
                rpId: r,
                rpOrigins: i,
                type: c.webauthn.type,
                credential_response: c.webauthn.credential_response,
              },
            })
          : {data: null, error: u};
      } catch (s) {
        return (0, Ot.isAuthError)(s)
          ? {data: null, error: s}
          : {
              data: null,
              error: new Ot.AuthUnknownError("Unexpected error in register", s),
            };
      }
    }
  };
  H.WebAuthnApi = Kp;
});
var Hp = T((Gp) => {
  "use strict";
  Object.defineProperty(Gp, "__esModule", {value: !0});
  var yP = (ot(), ht(it)),
    bP = yP.__importDefault(qa()),
    Ze = Da(),
    N = Ar(),
    B = Dp(),
    R = Rn(),
    z0 = S0(),
    U0 = qp(),
    wP = E0(),
    xP = wp(),
    D0 = Fa(),
    Ga = A0(),
    Qi = Jp();
  (0, wP.polyfillGlobalThis)();
  var SP = {
    url: Ze.GOTRUE_URL,
    storageKey: Ze.STORAGE_KEY,
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    headers: Ze.DEFAULT_HEADERS,
    flowType: "implicit",
    debug: !1,
    hasCustomAuthorizationHeader: !1,
    throwOnError: !1,
  };
  async function L0(e, t, r) {
    return await r();
  }
  var zn = {},
    Ha = class e {
      get jwks() {
        var t, r;
        return (r =
          (t = zn[this.storageKey]) === null || t === void 0 ? void 0 : t.jwks) !==
          null && r !== void 0
          ? r
          : {keys: []};
      }
      set jwks(t) {
        zn[this.storageKey] = Object.assign(Object.assign({}, zn[this.storageKey]), {
          jwks: t,
        });
      }
      get jwks_cached_at() {
        var t, r;
        return (r =
          (t = zn[this.storageKey]) === null || t === void 0 ? void 0 : t.cachedAt) !==
          null && r !== void 0
          ? r
          : Number.MIN_SAFE_INTEGER;
      }
      set jwks_cached_at(t) {
        zn[this.storageKey] = Object.assign(Object.assign({}, zn[this.storageKey]), {
          cachedAt: t,
        });
      }
      constructor(t) {
        var r, i, n;
        (this.userStorage = null),
          (this.memoryStorage = null),
          (this.stateChangeEmitters = new Map()),
          (this.autoRefreshTicker = null),
          (this.visibilityChangedCallback = null),
          (this.refreshingDeferred = null),
          (this.initializePromise = null),
          (this.detectSessionInUrl = !0),
          (this.hasCustomAuthorizationHeader = !1),
          (this.suppressGetSessionWarning = !1),
          (this.lockAcquired = !1),
          (this.pendingInLock = []),
          (this.broadcastChannel = null),
          (this.logger = console.log);
        let o = Object.assign(Object.assign({}, SP), t);
        if (
          ((this.storageKey = o.storageKey),
          (this.instanceID =
            (r = e.nextInstanceID[this.storageKey]) !== null && r !== void 0 ? r : 0),
          (e.nextInstanceID[this.storageKey] = this.instanceID + 1),
          (this.logDebugMessages = !!o.debug),
          typeof o.debug == "function" && (this.logger = o.debug),
          this.instanceID > 0 && (0, R.isBrowser)())
        ) {
          let s = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
          console.warn(s), this.logDebugMessages && console.trace(s);
        }
        if (
          ((this.persistSession = o.persistSession),
          (this.autoRefreshToken = o.autoRefreshToken),
          (this.admin = new bP.default({
            url: o.url,
            headers: o.headers,
            fetch: o.fetch,
          })),
          (this.url = o.url),
          (this.headers = o.headers),
          (this.fetch = (0, R.resolveFetch)(o.fetch)),
          (this.lock = o.lock || L0),
          (this.detectSessionInUrl = o.detectSessionInUrl),
          (this.flowType = o.flowType),
          (this.hasCustomAuthorizationHeader = o.hasCustomAuthorizationHeader),
          (this.throwOnError = o.throwOnError),
          o.lock
            ? (this.lock = o.lock)
            : this.persistSession &&
                (0, R.isBrowser)() &&
                !((i = globalThis?.navigator) === null || i === void 0) &&
                i.locks
              ? (this.lock = U0.navigatorLock)
              : (this.lock = L0),
          this.jwks ||
            ((this.jwks = {keys: []}), (this.jwks_cached_at = Number.MIN_SAFE_INTEGER)),
          (this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel:
              this._getAuthenticatorAssuranceLevel.bind(this),
            webauthn: new Qi.WebAuthnApi(this),
          }),
          (this.oauth = {
            getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
            approveAuthorization: this._approveAuthorization.bind(this),
            denyAuthorization: this._denyAuthorization.bind(this),
            listGrants: this._listOAuthGrants.bind(this),
            revokeGrant: this._revokeOAuthGrant.bind(this),
          }),
          this.persistSession
            ? (o.storage
                ? (this.storage = o.storage)
                : (0, R.supportsLocalStorage)()
                  ? (this.storage = globalThis.localStorage)
                  : ((this.memoryStorage = {}),
                    (this.storage = (0, z0.memoryLocalStorageAdapter)(
                      this.memoryStorage,
                    ))),
              o.userStorage && (this.userStorage = o.userStorage))
            : ((this.memoryStorage = {}),
              (this.storage = (0, z0.memoryLocalStorageAdapter)(this.memoryStorage))),
          (0, R.isBrowser)() &&
            globalThis.BroadcastChannel &&
            this.persistSession &&
            this.storageKey)
        ) {
          try {
            this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
          } catch (s) {
            console.error(
              "Failed to create a new BroadcastChannel, multi-tab state changes will not be available",
              s,
            );
          }
          (n = this.broadcastChannel) === null ||
            n === void 0 ||
            n.addEventListener("message", async (s) => {
              this._debug(
                "received broadcast notification from other tab or client",
                s,
              ),
                await this._notifyAllSubscribers(s.data.event, s.data.session, !1);
            });
        }
        this.initialize();
      }
      isThrowOnErrorEnabled() {
        return this.throwOnError;
      }
      _returnResult(t) {
        if (this.throwOnError && t && t.error) throw t.error;
        return t;
      }
      _logPrefix() {
        return `GoTrueClient@${this.storageKey}:${this.instanceID} (${xP.version}) ${new Date().toISOString()}`;
      }
      _debug(...t) {
        return this.logDebugMessages && this.logger(this._logPrefix(), ...t), this;
      }
      async initialize() {
        return this.initializePromise
          ? await this.initializePromise
          : ((this.initializePromise = (async () =>
              await this._acquireLock(-1, async () => await this._initialize()))()),
            await this.initializePromise);
      }
      async _initialize() {
        var t;
        try {
          let r = {},
            i = "none";
          if (
            ((0, R.isBrowser)() &&
              ((r = (0, R.parseParametersFromURL)(window.location.href)),
              this._isImplicitGrantCallback(r)
                ? (i = "implicit")
                : (await this._isPKCECallback(r)) && (i = "pkce")),
            (0, R.isBrowser)() && this.detectSessionInUrl && i !== "none")
          ) {
            let {data: n, error: o} = await this._getSessionFromURL(r, i);
            if (o) {
              if (
                (this._debug("#_initialize()", "error detecting session from URL", o),
                (0, N.isAuthImplicitGrantRedirectError)(o))
              ) {
                let c = (t = o.details) === null || t === void 0 ? void 0 : t.code;
                if (
                  c === "identity_already_exists" ||
                  c === "identity_not_found" ||
                  c === "single_identity_not_deletable"
                )
                  return {error: o};
              }
              return await this._removeSession(), {error: o};
            }
            let {session: s, redirectType: a} = n;
            return (
              this._debug(
                "#_initialize()",
                "detected session in URL",
                s,
                "redirect type",
                a,
              ),
              await this._saveSession(s),
              setTimeout(async () => {
                a === "recovery"
                  ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", s)
                  : await this._notifyAllSubscribers("SIGNED_IN", s);
              }, 0),
              {error: null}
            );
          }
          return await this._recoverAndRefresh(), {error: null};
        } catch (r) {
          return (0, N.isAuthError)(r)
            ? this._returnResult({error: r})
            : this._returnResult({
                error: new N.AuthUnknownError(
                  "Unexpected error during initialization",
                  r,
                ),
              });
        } finally {
          await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
        }
      }
      async signInAnonymously(t) {
        var r, i, n;
        try {
          let o = await (0, B._request)(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              body: {
                data:
                  (i = (r = t?.options) === null || r === void 0 ? void 0 : r.data) !==
                    null && i !== void 0
                    ? i
                    : {},
                gotrue_meta_security: {
                  captcha_token:
                    (n = t?.options) === null || n === void 0 ? void 0 : n.captchaToken,
                },
              },
              xform: B._sessionResponse,
            }),
            {data: s, error: a} = o;
          if (a || !s)
            return this._returnResult({data: {user: null, session: null}, error: a});
          let c = s.session,
            u = s.user;
          return (
            s.session &&
              (await this._saveSession(s.session),
              await this._notifyAllSubscribers("SIGNED_IN", c)),
            this._returnResult({data: {user: u, session: c}, error: null})
          );
        } catch (o) {
          if ((0, N.isAuthError)(o))
            return this._returnResult({data: {user: null, session: null}, error: o});
          throw o;
        }
      }
      async signUp(t) {
        var r, i, n;
        try {
          let o;
          if ("email" in t) {
            let {email: l, password: h, options: f} = t,
              d = null,
              p = null;
            this.flowType === "pkce" &&
              ([d, p] = await (0, R.getCodeChallengeAndMethod)(
                this.storage,
                this.storageKey,
              )),
              (o = await (0, B._request)(this.fetch, "POST", `${this.url}/signup`, {
                headers: this.headers,
                redirectTo: f?.emailRedirectTo,
                body: {
                  email: l,
                  password: h,
                  data: (r = f?.data) !== null && r !== void 0 ? r : {},
                  gotrue_meta_security: {captcha_token: f?.captchaToken},
                  code_challenge: d,
                  code_challenge_method: p,
                },
                xform: B._sessionResponse,
              }));
          } else if ("phone" in t) {
            let {phone: l, password: h, options: f} = t;
            o = await (0, B._request)(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              body: {
                phone: l,
                password: h,
                data: (i = f?.data) !== null && i !== void 0 ? i : {},
                channel: (n = f?.channel) !== null && n !== void 0 ? n : "sms",
                gotrue_meta_security: {captcha_token: f?.captchaToken},
              },
              xform: B._sessionResponse,
            });
          } else
            throw new N.AuthInvalidCredentialsError(
              "You must provide either an email or phone number and a password",
            );
          let {data: s, error: a} = o;
          if (a || !s)
            return (
              await (0, R.removeItemAsync)(
                this.storage,
                `${this.storageKey}-code-verifier`,
              ),
              this._returnResult({data: {user: null, session: null}, error: a})
            );
          let c = s.session,
            u = s.user;
          return (
            s.session &&
              (await this._saveSession(s.session),
              await this._notifyAllSubscribers("SIGNED_IN", c)),
            this._returnResult({data: {user: u, session: c}, error: null})
          );
        } catch (o) {
          if (
            (await (0, R.removeItemAsync)(
              this.storage,
              `${this.storageKey}-code-verifier`,
            ),
            (0, N.isAuthError)(o))
          )
            return this._returnResult({data: {user: null, session: null}, error: o});
          throw o;
        }
      }
      async signInWithPassword(t) {
        try {
          let r;
          if ("email" in t) {
            let {email: o, password: s, options: a} = t;
            r = await (0, B._request)(
              this.fetch,
              "POST",
              `${this.url}/token?grant_type=password`,
              {
                headers: this.headers,
                body: {
                  email: o,
                  password: s,
                  gotrue_meta_security: {captcha_token: a?.captchaToken},
                },
                xform: B._sessionResponsePassword,
              },
            );
          } else if ("phone" in t) {
            let {phone: o, password: s, options: a} = t;
            r = await (0, B._request)(
              this.fetch,
              "POST",
              `${this.url}/token?grant_type=password`,
              {
                headers: this.headers,
                body: {
                  phone: o,
                  password: s,
                  gotrue_meta_security: {captcha_token: a?.captchaToken},
                },
                xform: B._sessionResponsePassword,
              },
            );
          } else
            throw new N.AuthInvalidCredentialsError(
              "You must provide either an email or phone number and a password",
            );
          let {data: i, error: n} = r;
          if (n)
            return this._returnResult({data: {user: null, session: null}, error: n});
          if (!i || !i.session || !i.user) {
            let o = new N.AuthInvalidTokenResponseError();
            return this._returnResult({data: {user: null, session: null}, error: o});
          }
          return (
            i.session &&
              (await this._saveSession(i.session),
              await this._notifyAllSubscribers("SIGNED_IN", i.session)),
            this._returnResult({
              data: Object.assign(
                {user: i.user, session: i.session},
                i.weak_password ? {weakPassword: i.weak_password} : null,
              ),
              error: n,
            })
          );
        } catch (r) {
          if ((0, N.isAuthError)(r))
            return this._returnResult({data: {user: null, session: null}, error: r});
          throw r;
        }
      }
      async signInWithOAuth(t) {
        var r, i, n, o;
        return await this._handleProviderSignIn(t.provider, {
          redirectTo: (r = t.options) === null || r === void 0 ? void 0 : r.redirectTo,
          scopes: (i = t.options) === null || i === void 0 ? void 0 : i.scopes,
          queryParams:
            (n = t.options) === null || n === void 0 ? void 0 : n.queryParams,
          skipBrowserRedirect:
            (o = t.options) === null || o === void 0 ? void 0 : o.skipBrowserRedirect,
        });
      }
      async exchangeCodeForSession(t) {
        return (
          await this.initializePromise,
          this._acquireLock(-1, async () => this._exchangeCodeForSession(t))
        );
      }
      async signInWithWeb3(t) {
        let {chain: r} = t;
        switch (r) {
          case "ethereum":
            return await this.signInWithEthereum(t);
          case "solana":
            return await this.signInWithSolana(t);
          default:
            throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`);
        }
      }
      async signInWithEthereum(t) {
        var r, i, n, o, s, a, c, u, l, h, f;
        let d, p;
        if ("message" in t) (d = t.message), (p = t.signature);
        else {
          let {chain: m, wallet: v, statement: w, options: $} = t,
            b;
          if ((0, R.isBrowser)())
            if (typeof v == "object") b = v;
            else {
              let I = window;
              if (
                "ethereum" in I &&
                typeof I.ethereum == "object" &&
                "request" in I.ethereum &&
                typeof I.ethereum.request == "function"
              )
                b = I.ethereum;
              else
                throw new Error(
                  "@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.",
                );
            }
          else {
            if (typeof v != "object" || !$?.url)
              throw new Error(
                "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
              );
            b = v;
          }
          let x = new URL(
              (r = $?.url) !== null && r !== void 0 ? r : window.location.href,
            ),
            D = await b
              .request({method: "eth_requestAccounts"})
              .then((I) => I)
              .catch(() => {
                throw new Error(
                  "@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid",
                );
              });
          if (!D || D.length === 0)
            throw new Error(
              "@supabase/auth-js: No accounts available. Please ensure the wallet is connected.",
            );
          let _ = (0, Ga.getAddress)(D[0]),
            S =
              (i = $?.signInWithEthereum) === null || i === void 0 ? void 0 : i.chainId;
          if (!S) {
            let I = await b.request({method: "eth_chainId"});
            S = (0, Ga.fromHex)(I);
          }
          let U = {
            domain: x.host,
            address: _,
            statement: w,
            uri: x.href,
            version: "1",
            chainId: S,
            nonce:
              (n = $?.signInWithEthereum) === null || n === void 0 ? void 0 : n.nonce,
            issuedAt:
              (s =
                (o = $?.signInWithEthereum) === null || o === void 0
                  ? void 0
                  : o.issuedAt) !== null && s !== void 0
                ? s
                : new Date(),
            expirationTime:
              (a = $?.signInWithEthereum) === null || a === void 0
                ? void 0
                : a.expirationTime,
            notBefore:
              (c = $?.signInWithEthereum) === null || c === void 0
                ? void 0
                : c.notBefore,
            requestId:
              (u = $?.signInWithEthereum) === null || u === void 0
                ? void 0
                : u.requestId,
            resources:
              (l = $?.signInWithEthereum) === null || l === void 0
                ? void 0
                : l.resources,
          };
          (d = (0, Ga.createSiweMessage)(U)),
            (p = await b.request({
              method: "personal_sign",
              params: [(0, Ga.toHex)(d), _],
            }));
        }
        try {
          let {data: m, error: v} = await (0, B._request)(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=web3`,
            {
              headers: this.headers,
              body: Object.assign(
                {chain: "ethereum", message: d, signature: p},
                !((h = t.options) === null || h === void 0) && h.captchaToken
                  ? {
                      gotrue_meta_security: {
                        captcha_token:
                          (f = t.options) === null || f === void 0
                            ? void 0
                            : f.captchaToken,
                      },
                    }
                  : null,
              ),
              xform: B._sessionResponse,
            },
          );
          if (v) throw v;
          if (!m || !m.session || !m.user) {
            let w = new N.AuthInvalidTokenResponseError();
            return this._returnResult({data: {user: null, session: null}, error: w});
          }
          return (
            m.session &&
              (await this._saveSession(m.session),
              await this._notifyAllSubscribers("SIGNED_IN", m.session)),
            this._returnResult({data: Object.assign({}, m), error: v})
          );
        } catch (m) {
          if ((0, N.isAuthError)(m))
            return this._returnResult({data: {user: null, session: null}, error: m});
          throw m;
        }
      }
      async signInWithSolana(t) {
        var r, i, n, o, s, a, c, u, l, h, f, d;
        let p, m;
        if ("message" in t) (p = t.message), (m = t.signature);
        else {
          let {chain: v, wallet: w, statement: $, options: b} = t,
            x;
          if ((0, R.isBrowser)())
            if (typeof w == "object") x = w;
            else {
              let _ = window;
              if (
                "solana" in _ &&
                typeof _.solana == "object" &&
                (("signIn" in _.solana && typeof _.solana.signIn == "function") ||
                  ("signMessage" in _.solana &&
                    typeof _.solana.signMessage == "function"))
              )
                x = _.solana;
              else
                throw new Error(
                  "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
                );
            }
          else {
            if (typeof w != "object" || !b?.url)
              throw new Error(
                "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
              );
            x = w;
          }
          let D = new URL(
            (r = b?.url) !== null && r !== void 0 ? r : window.location.href,
          );
          if ("signIn" in x && x.signIn) {
            let _ = await x.signIn(
                Object.assign(
                  Object.assign(
                    Object.assign(
                      {issuedAt: new Date().toISOString()},
                      b?.signInWithSolana,
                    ),
                    {version: "1", domain: D.host, uri: D.href},
                  ),
                  $ ? {statement: $} : null,
                ),
              ),
              S;
            if (Array.isArray(_) && _[0] && typeof _[0] == "object") S = _[0];
            else if (
              _ &&
              typeof _ == "object" &&
              "signedMessage" in _ &&
              "signature" in _
            )
              S = _;
            else
              throw new Error(
                "@supabase/auth-js: Wallet method signIn() returned unrecognized value",
              );
            if (
              "signedMessage" in S &&
              "signature" in S &&
              (typeof S.signedMessage == "string" ||
                S.signedMessage instanceof Uint8Array) &&
              S.signature instanceof Uint8Array
            )
              (p =
                typeof S.signedMessage == "string"
                  ? S.signedMessage
                  : new TextDecoder().decode(S.signedMessage)),
                (m = S.signature);
            else
              throw new Error(
                "@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields",
              );
          } else {
            if (
              !("signMessage" in x) ||
              typeof x.signMessage != "function" ||
              !("publicKey" in x) ||
              typeof x != "object" ||
              !x.publicKey ||
              !("toBase58" in x.publicKey) ||
              typeof x.publicKey.toBase58 != "function"
            )
              throw new Error(
                "@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API",
              );
            p = [
              `${D.host} wants you to sign in with your Solana account:`,
              x.publicKey.toBase58(),
              ...($ ? ["", $, ""] : [""]),
              "Version: 1",
              `URI: ${D.href}`,
              `Issued At: ${(n = (i = b?.signInWithSolana) === null || i === void 0 ? void 0 : i.issuedAt) !== null && n !== void 0 ? n : new Date().toISOString()}`,
              ...(!((o = b?.signInWithSolana) === null || o === void 0) && o.notBefore
                ? [`Not Before: ${b.signInWithSolana.notBefore}`]
                : []),
              ...(!((s = b?.signInWithSolana) === null || s === void 0) &&
              s.expirationTime
                ? [`Expiration Time: ${b.signInWithSolana.expirationTime}`]
                : []),
              ...(!((a = b?.signInWithSolana) === null || a === void 0) && a.chainId
                ? [`Chain ID: ${b.signInWithSolana.chainId}`]
                : []),
              ...(!((c = b?.signInWithSolana) === null || c === void 0) && c.nonce
                ? [`Nonce: ${b.signInWithSolana.nonce}`]
                : []),
              ...(!((u = b?.signInWithSolana) === null || u === void 0) && u.requestId
                ? [`Request ID: ${b.signInWithSolana.requestId}`]
                : []),
              ...(!(
                (h =
                  (l = b?.signInWithSolana) === null || l === void 0
                    ? void 0
                    : l.resources) === null || h === void 0
              ) && h.length
                ? ["Resources", ...b.signInWithSolana.resources.map((S) => `- ${S}`)]
                : []),
            ].join(`
`);
            let _ = await x.signMessage(new TextEncoder().encode(p), "utf8");
            if (!_ || !(_ instanceof Uint8Array))
              throw new Error(
                "@supabase/auth-js: Wallet signMessage() API returned an recognized value",
              );
            m = _;
          }
        }
        try {
          let {data: v, error: w} = await (0, B._request)(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=web3`,
            {
              headers: this.headers,
              body: Object.assign(
                {chain: "solana", message: p, signature: (0, D0.bytesToBase64URL)(m)},
                !((f = t.options) === null || f === void 0) && f.captchaToken
                  ? {
                      gotrue_meta_security: {
                        captcha_token:
                          (d = t.options) === null || d === void 0
                            ? void 0
                            : d.captchaToken,
                      },
                    }
                  : null,
              ),
              xform: B._sessionResponse,
            },
          );
          if (w) throw w;
          if (!v || !v.session || !v.user) {
            let $ = new N.AuthInvalidTokenResponseError();
            return this._returnResult({data: {user: null, session: null}, error: $});
          }
          return (
            v.session &&
              (await this._saveSession(v.session),
              await this._notifyAllSubscribers("SIGNED_IN", v.session)),
            this._returnResult({data: Object.assign({}, v), error: w})
          );
        } catch (v) {
          if ((0, N.isAuthError)(v))
            return this._returnResult({data: {user: null, session: null}, error: v});
          throw v;
        }
      }
      async _exchangeCodeForSession(t) {
        let r = await (0, R.getItemAsync)(
            this.storage,
            `${this.storageKey}-code-verifier`,
          ),
          [i, n] = (r ?? "").split("/");
        try {
          if (!i && this.flowType === "pkce")
            throw new N.AuthPKCECodeVerifierMissingError();
          let {data: o, error: s} = await (0, B._request)(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=pkce`,
            {
              headers: this.headers,
              body: {auth_code: t, code_verifier: i},
              xform: B._sessionResponse,
            },
          );
          if (
            (await (0, R.removeItemAsync)(
              this.storage,
              `${this.storageKey}-code-verifier`,
            ),
            s)
          )
            throw s;
          if (!o || !o.session || !o.user) {
            let a = new N.AuthInvalidTokenResponseError();
            return this._returnResult({
              data: {user: null, session: null, redirectType: null},
              error: a,
            });
          }
          return (
            o.session &&
              (await this._saveSession(o.session),
              await this._notifyAllSubscribers("SIGNED_IN", o.session)),
            this._returnResult({
              data: Object.assign(Object.assign({}, o), {redirectType: n ?? null}),
              error: s,
            })
          );
        } catch (o) {
          if (
            (await (0, R.removeItemAsync)(
              this.storage,
              `${this.storageKey}-code-verifier`,
            ),
            (0, N.isAuthError)(o))
          )
            return this._returnResult({
              data: {user: null, session: null, redirectType: null},
              error: o,
            });
          throw o;
        }
      }
      async signInWithIdToken(t) {
        try {
          let {options: r, provider: i, token: n, access_token: o, nonce: s} = t,
            a = await (0, B._request)(
              this.fetch,
              "POST",
              `${this.url}/token?grant_type=id_token`,
              {
                headers: this.headers,
                body: {
                  provider: i,
                  id_token: n,
                  access_token: o,
                  nonce: s,
                  gotrue_meta_security: {captcha_token: r?.captchaToken},
                },
                xform: B._sessionResponse,
              },
            ),
            {data: c, error: u} = a;
          if (u)
            return this._returnResult({data: {user: null, session: null}, error: u});
          if (!c || !c.session || !c.user) {
            let l = new N.AuthInvalidTokenResponseError();
            return this._returnResult({data: {user: null, session: null}, error: l});
          }
          return (
            c.session &&
              (await this._saveSession(c.session),
              await this._notifyAllSubscribers("SIGNED_IN", c.session)),
            this._returnResult({data: c, error: u})
          );
        } catch (r) {
          if ((0, N.isAuthError)(r))
            return this._returnResult({data: {user: null, session: null}, error: r});
          throw r;
        }
      }
      async signInWithOtp(t) {
        var r, i, n, o, s;
        try {
          if ("email" in t) {
            let {email: a, options: c} = t,
              u = null,
              l = null;
            this.flowType === "pkce" &&
              ([u, l] = await (0, R.getCodeChallengeAndMethod)(
                this.storage,
                this.storageKey,
              ));
            let {error: h} = await (0, B._request)(
              this.fetch,
              "POST",
              `${this.url}/otp`,
              {
                headers: this.headers,
                body: {
                  email: a,
                  data: (r = c?.data) !== null && r !== void 0 ? r : {},
                  create_user:
                    (i = c?.shouldCreateUser) !== null && i !== void 0 ? i : !0,
                  gotrue_meta_security: {captcha_token: c?.captchaToken},
                  code_challenge: u,
                  code_challenge_method: l,
                },
                redirectTo: c?.emailRedirectTo,
              },
            );
            return this._returnResult({data: {user: null, session: null}, error: h});
          }
          if ("phone" in t) {
            let {phone: a, options: c} = t,
              {data: u, error: l} = await (0, B._request)(
                this.fetch,
                "POST",
                `${this.url}/otp`,
                {
                  headers: this.headers,
                  body: {
                    phone: a,
                    data: (n = c?.data) !== null && n !== void 0 ? n : {},
                    create_user:
                      (o = c?.shouldCreateUser) !== null && o !== void 0 ? o : !0,
                    gotrue_meta_security: {captcha_token: c?.captchaToken},
                    channel: (s = c?.channel) !== null && s !== void 0 ? s : "sms",
                  },
                },
              );
            return this._returnResult({
              data: {user: null, session: null, messageId: u?.message_id},
              error: l,
            });
          }
          throw new N.AuthInvalidCredentialsError(
            "You must provide either an email or phone number.",
          );
        } catch (a) {
          if (
            (await (0, R.removeItemAsync)(
              this.storage,
              `${this.storageKey}-code-verifier`,
            ),
            (0, N.isAuthError)(a))
          )
            return this._returnResult({data: {user: null, session: null}, error: a});
          throw a;
        }
      }
      async verifyOtp(t) {
        var r, i;
        try {
          let n, o;
          "options" in t &&
            ((n = (r = t.options) === null || r === void 0 ? void 0 : r.redirectTo),
            (o = (i = t.options) === null || i === void 0 ? void 0 : i.captchaToken));
          let {data: s, error: a} = await (0, B._request)(
            this.fetch,
            "POST",
            `${this.url}/verify`,
            {
              headers: this.headers,
              body: Object.assign(Object.assign({}, t), {
                gotrue_meta_security: {captcha_token: o},
              }),
              redirectTo: n,
              xform: B._sessionResponse,
            },
          );
          if (a) throw a;
          if (!s) throw new Error("An error occurred on token verification.");
          let c = s.session,
            u = s.user;
          return (
            c?.access_token &&
              (await this._saveSession(c),
              await this._notifyAllSubscribers(
                t.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
                c,
              )),
            this._returnResult({data: {user: u, session: c}, error: null})
          );
        } catch (n) {
          if ((0, N.isAuthError)(n))
            return this._returnResult({data: {user: null, session: null}, error: n});
          throw n;
        }
      }
      async signInWithSSO(t) {
        var r, i, n, o, s;
        try {
          let a = null,
            c = null;
          this.flowType === "pkce" &&
            ([a, c] = await (0, R.getCodeChallengeAndMethod)(
              this.storage,
              this.storageKey,
            ));
          let u = await (0, B._request)(this.fetch, "POST", `${this.url}/sso`, {
            body: Object.assign(
              Object.assign(
                Object.assign(
                  Object.assign(
                    Object.assign(
                      {},
                      "providerId" in t ? {provider_id: t.providerId} : null,
                    ),
                    "domain" in t ? {domain: t.domain} : null,
                  ),
                  {
                    redirect_to:
                      (i =
                        (r = t.options) === null || r === void 0
                          ? void 0
                          : r.redirectTo) !== null && i !== void 0
                        ? i
                        : void 0,
                  },
                ),
                !((n = t?.options) === null || n === void 0) && n.captchaToken
                  ? {gotrue_meta_security: {captcha_token: t.options.captchaToken}}
                  : null,
              ),
              {skip_http_redirect: !0, code_challenge: a, code_challenge_method: c},
            ),
            headers: this.headers,
            xform: B._ssoResponse,
          });
          return (
            !((o = u.data) === null || o === void 0) &&
              o.url &&
              (0, R.isBrowser)() &&
              !(!((s = t.options) === null || s === void 0) && s.skipBrowserRedirect) &&
              window.location.assign(u.data.url),
            this._returnResult(u)
          );
        } catch (a) {
          if (
            (await (0, R.removeItemAsync)(
              this.storage,
              `${this.storageKey}-code-verifier`,
            ),
            (0, N.isAuthError)(a))
          )
            return this._returnResult({data: null, error: a});
          throw a;
        }
      }
      async reauthenticate() {
        return (
          await this.initializePromise,
          await this._acquireLock(-1, async () => await this._reauthenticate())
        );
      }
      async _reauthenticate() {
        try {
          return await this._useSession(async (t) => {
            let {
              data: {session: r},
              error: i,
            } = t;
            if (i) throw i;
            if (!r) throw new N.AuthSessionMissingError();
            let {error: n} = await (0, B._request)(
              this.fetch,
              "GET",
              `${this.url}/reauthenticate`,
              {headers: this.headers, jwt: r.access_token},
            );
            return this._returnResult({data: {user: null, session: null}, error: n});
          });
        } catch (t) {
          if ((0, N.isAuthError)(t))
            return this._returnResult({data: {user: null, session: null}, error: t});
          throw t;
        }
      }
      async resend(t) {
        try {
          let r = `${this.url}/resend`;
          if ("email" in t) {
            let {email: i, type: n, options: o} = t,
              {error: s} = await (0, B._request)(this.fetch, "POST", r, {
                headers: this.headers,
                body: {
                  email: i,
                  type: n,
                  gotrue_meta_security: {captcha_token: o?.captchaToken},
                },
                redirectTo: o?.emailRedirectTo,
              });
            return this._returnResult({data: {user: null, session: null}, error: s});
          } else if ("phone" in t) {
            let {phone: i, type: n, options: o} = t,
              {data: s, error: a} = await (0, B._request)(this.fetch, "POST", r, {
                headers: this.headers,
                body: {
                  phone: i,
                  type: n,
                  gotrue_meta_security: {captcha_token: o?.captchaToken},
                },
              });
            return this._returnResult({
              data: {user: null, session: null, messageId: s?.message_id},
              error: a,
            });
          }
          throw new N.AuthInvalidCredentialsError(
            "You must provide either an email or phone number and a type",
          );
        } catch (r) {
          if ((0, N.isAuthError)(r))
            return this._returnResult({data: {user: null, session: null}, error: r});
          throw r;
        }
      }
      async getSession() {
        return (
          await this.initializePromise,
          await this._acquireLock(-1, async () => this._useSession(async (r) => r))
        );
      }
      async _acquireLock(t, r) {
        this._debug("#_acquireLock", "begin", t);
        try {
          if (this.lockAcquired) {
            let i = this.pendingInLock.length
                ? this.pendingInLock[this.pendingInLock.length - 1]
                : Promise.resolve(),
              n = (async () => (await i, await r()))();
            return (
              this.pendingInLock.push(
                (async () => {
                  try {
                    await n;
                  } catch {}
                })(),
              ),
              n
            );
          }
          return await this.lock(`lock:${this.storageKey}`, t, async () => {
            this._debug(
              "#_acquireLock",
              "lock acquired for storage key",
              this.storageKey,
            );
            try {
              this.lockAcquired = !0;
              let i = r();
              for (
                this.pendingInLock.push(
                  (async () => {
                    try {
                      await i;
                    } catch {}
                  })(),
                ),
                  await i;
                this.pendingInLock.length;
              ) {
                let n = [...this.pendingInLock];
                await Promise.all(n), this.pendingInLock.splice(0, n.length);
              }
              return await i;
            } finally {
              this._debug(
                "#_acquireLock",
                "lock released for storage key",
                this.storageKey,
              ),
                (this.lockAcquired = !1);
            }
          });
        } finally {
          this._debug("#_acquireLock", "end");
        }
      }
      async _useSession(t) {
        this._debug("#_useSession", "begin");
        try {
          let r = await this.__loadSession();
          return await t(r);
        } finally {
          this._debug("#_useSession", "end");
        }
      }
      async __loadSession() {
        this._debug("#__loadSession()", "begin"),
          this.lockAcquired ||
            this._debug(
              "#__loadSession()",
              "used outside of an acquired lock!",
              new Error().stack,
            );
        try {
          let t = null,
            r = await (0, R.getItemAsync)(this.storage, this.storageKey);
          if (
            (this._debug("#getSession()", "session from storage", r),
            r !== null &&
              (this._isValidSession(r)
                ? (t = r)
                : (this._debug("#getSession()", "session from storage is not valid"),
                  await this._removeSession())),
            !t)
          )
            return {data: {session: null}, error: null};
          let i = t.expires_at
            ? t.expires_at * 1e3 - Date.now() < Ze.EXPIRY_MARGIN_MS
            : !1;
          if (
            (this._debug(
              "#__loadSession()",
              `session has${i ? "" : " not"} expired`,
              "expires_at",
              t.expires_at,
            ),
            !i)
          ) {
            if (this.userStorage) {
              let s = await (0, R.getItemAsync)(
                this.userStorage,
                this.storageKey + "-user",
              );
              s?.user ? (t.user = s.user) : (t.user = (0, R.userNotAvailableProxy)());
            }
            if (this.storage.isServer && t.user && !t.user.__isUserNotAvailableProxy) {
              let s = {value: this.suppressGetSessionWarning};
              (t.user = (0, R.insecureUserWarningProxy)(t.user, s)),
                s.value && (this.suppressGetSessionWarning = !0);
            }
            return {data: {session: t}, error: null};
          }
          let {data: n, error: o} = await this._callRefreshToken(t.refresh_token);
          return o
            ? this._returnResult({data: {session: null}, error: o})
            : this._returnResult({data: {session: n}, error: null});
        } finally {
          this._debug("#__loadSession()", "end");
        }
      }
      async getUser(t) {
        if (t) return await this._getUser(t);
        await this.initializePromise;
        let r = await this._acquireLock(-1, async () => await this._getUser());
        return r.data.user && (this.suppressGetSessionWarning = !0), r;
      }
      async _getUser(t) {
        try {
          return t
            ? await (0, B._request)(this.fetch, "GET", `${this.url}/user`, {
                headers: this.headers,
                jwt: t,
                xform: B._userResponse,
              })
            : await this._useSession(async (r) => {
                var i, n, o;
                let {data: s, error: a} = r;
                if (a) throw a;
                return !(
                  !((i = s.session) === null || i === void 0) && i.access_token
                ) && !this.hasCustomAuthorizationHeader
                  ? {data: {user: null}, error: new N.AuthSessionMissingError()}
                  : await (0, B._request)(this.fetch, "GET", `${this.url}/user`, {
                      headers: this.headers,
                      jwt:
                        (o =
                          (n = s.session) === null || n === void 0
                            ? void 0
                            : n.access_token) !== null && o !== void 0
                          ? o
                          : void 0,
                      xform: B._userResponse,
                    });
              });
        } catch (r) {
          if ((0, N.isAuthError)(r))
            return (
              (0, N.isAuthSessionMissingError)(r) &&
                (await this._removeSession(),
                await (0, R.removeItemAsync)(
                  this.storage,
                  `${this.storageKey}-code-verifier`,
                )),
              this._returnResult({data: {user: null}, error: r})
            );
          throw r;
        }
      }
      async updateUser(t, r = {}) {
        return (
          await this.initializePromise,
          await this._acquireLock(-1, async () => await this._updateUser(t, r))
        );
      }
      async _updateUser(t, r = {}) {
        try {
          return await this._useSession(async (i) => {
            let {data: n, error: o} = i;
            if (o) throw o;
            if (!n.session) throw new N.AuthSessionMissingError();
            let s = n.session,
              a = null,
              c = null;
            this.flowType === "pkce" &&
              t.email != null &&
              ([a, c] = await (0, R.getCodeChallengeAndMethod)(
                this.storage,
                this.storageKey,
              ));
            let {data: u, error: l} = await (0, B._request)(
              this.fetch,
              "PUT",
              `${this.url}/user`,
              {
                headers: this.headers,
                redirectTo: r?.emailRedirectTo,
                body: Object.assign(Object.assign({}, t), {
                  code_challenge: a,
                  code_challenge_method: c,
                }),
                jwt: s.access_token,
                xform: B._userResponse,
              },
            );
            if (l) throw l;
            return (
              (s.user = u.user),
              await this._saveSession(s),
              await this._notifyAllSubscribers("USER_UPDATED", s),
              this._returnResult({data: {user: s.user}, error: null})
            );
          });
        } catch (i) {
          if (
            (await (0, R.removeItemAsync)(
              this.storage,
              `${this.storageKey}-code-verifier`,
            ),
            (0, N.isAuthError)(i))
          )
            return this._returnResult({data: {user: null}, error: i});
          throw i;
        }
      }
      async setSession(t) {
        return (
          await this.initializePromise,
          await this._acquireLock(-1, async () => await this._setSession(t))
        );
      }
      async _setSession(t) {
        try {
          if (!t.access_token || !t.refresh_token)
            throw new N.AuthSessionMissingError();
          let r = Date.now() / 1e3,
            i = r,
            n = !0,
            o = null,
            {payload: s} = (0, R.decodeJWT)(t.access_token);
          if ((s.exp && ((i = s.exp), (n = i <= r)), n)) {
            let {data: a, error: c} = await this._callRefreshToken(t.refresh_token);
            if (c)
              return this._returnResult({data: {user: null, session: null}, error: c});
            if (!a) return {data: {user: null, session: null}, error: null};
            o = a;
          } else {
            let {data: a, error: c} = await this._getUser(t.access_token);
            if (c) throw c;
            (o = {
              access_token: t.access_token,
              refresh_token: t.refresh_token,
              user: a.user,
              token_type: "bearer",
              expires_in: i - r,
              expires_at: i,
            }),
              await this._saveSession(o),
              await this._notifyAllSubscribers("SIGNED_IN", o);
          }
          return this._returnResult({data: {user: o.user, session: o}, error: null});
        } catch (r) {
          if ((0, N.isAuthError)(r))
            return this._returnResult({data: {session: null, user: null}, error: r});
          throw r;
        }
      }
      async refreshSession(t) {
        return (
          await this.initializePromise,
          await this._acquireLock(-1, async () => await this._refreshSession(t))
        );
      }
      async _refreshSession(t) {
        try {
          return await this._useSession(async (r) => {
            var i;
            if (!t) {
              let {data: s, error: a} = r;
              if (a) throw a;
              t = (i = s.session) !== null && i !== void 0 ? i : void 0;
            }
            if (!t?.refresh_token) throw new N.AuthSessionMissingError();
            let {data: n, error: o} = await this._callRefreshToken(t.refresh_token);
            return o
              ? this._returnResult({data: {user: null, session: null}, error: o})
              : n
                ? this._returnResult({data: {user: n.user, session: n}, error: null})
                : this._returnResult({data: {user: null, session: null}, error: null});
          });
        } catch (r) {
          if ((0, N.isAuthError)(r))
            return this._returnResult({data: {user: null, session: null}, error: r});
          throw r;
        }
      }
      async _getSessionFromURL(t, r) {
        try {
          if (!(0, R.isBrowser)())
            throw new N.AuthImplicitGrantRedirectError("No browser detected.");
          if (t.error || t.error_description || t.error_code)
            throw new N.AuthImplicitGrantRedirectError(
              t.error_description || "Error in URL with unspecified error_description",
              {
                error: t.error || "unspecified_error",
                code: t.error_code || "unspecified_code",
              },
            );
          switch (r) {
            case "implicit":
              if (this.flowType === "pkce")
                throw new N.AuthPKCEGrantCodeExchangeError(
                  "Not a valid PKCE flow url.",
                );
              break;
            case "pkce":
              if (this.flowType === "implicit")
                throw new N.AuthImplicitGrantRedirectError(
                  "Not a valid implicit grant flow url.",
                );
              break;
            default:
          }
          if (r === "pkce") {
            if ((this._debug("#_initialize()", "begin", "is PKCE flow", !0), !t.code))
              throw new N.AuthPKCEGrantCodeExchangeError("No code detected.");
            let {data: $, error: b} = await this._exchangeCodeForSession(t.code);
            if (b) throw b;
            let x = new URL(window.location.href);
            return (
              x.searchParams.delete("code"),
              window.history.replaceState(window.history.state, "", x.toString()),
              {data: {session: $.session, redirectType: null}, error: null}
            );
          }
          let {
            provider_token: i,
            provider_refresh_token: n,
            access_token: o,
            refresh_token: s,
            expires_in: a,
            expires_at: c,
            token_type: u,
          } = t;
          if (!o || !a || !s || !u)
            throw new N.AuthImplicitGrantRedirectError("No session defined in URL");
          let l = Math.round(Date.now() / 1e3),
            h = parseInt(a),
            f = l + h;
          c && (f = parseInt(c));
          let d = f - l;
          d * 1e3 <= Ze.AUTO_REFRESH_TICK_DURATION_MS &&
            console.warn(
              `@supabase/gotrue-js: Session as retrieved from URL expires in ${d}s, should have been closer to ${h}s`,
            );
          let p = f - h;
          l - p >= 120
            ? console.warn(
                "@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",
                p,
                f,
                l,
              )
            : l - p < 0 &&
              console.warn(
                "@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",
                p,
                f,
                l,
              );
          let {data: m, error: v} = await this._getUser(o);
          if (v) throw v;
          let w = {
            provider_token: i,
            provider_refresh_token: n,
            access_token: o,
            expires_in: h,
            expires_at: f,
            refresh_token: s,
            token_type: u,
            user: m.user,
          };
          return (
            (window.location.hash = ""),
            this._debug("#_getSessionFromURL()", "clearing window.location.hash"),
            this._returnResult({data: {session: w, redirectType: t.type}, error: null})
          );
        } catch (i) {
          if ((0, N.isAuthError)(i))
            return this._returnResult({
              data: {session: null, redirectType: null},
              error: i,
            });
          throw i;
        }
      }
      _isImplicitGrantCallback(t) {
        return typeof this.detectSessionInUrl == "function"
          ? this.detectSessionInUrl(new URL(window.location.href), t)
          : !!(t.access_token || t.error_description);
      }
      async _isPKCECallback(t) {
        let r = await (0, R.getItemAsync)(
          this.storage,
          `${this.storageKey}-code-verifier`,
        );
        return !!(t.code && r);
      }
      async signOut(t = {scope: "global"}) {
        return (
          await this.initializePromise,
          await this._acquireLock(-1, async () => await this._signOut(t))
        );
      }
      async _signOut({scope: t} = {scope: "global"}) {
        return await this._useSession(async (r) => {
          var i;
          let {data: n, error: o} = r;
          if (o) return this._returnResult({error: o});
          let s = (i = n.session) === null || i === void 0 ? void 0 : i.access_token;
          if (s) {
            let {error: a} = await this.admin.signOut(s, t);
            if (
              a &&
              !(
                (0, N.isAuthApiError)(a) &&
                (a.status === 404 || a.status === 401 || a.status === 403)
              )
            )
              return this._returnResult({error: a});
          }
          return (
            t !== "others" &&
              (await this._removeSession(),
              await (0, R.removeItemAsync)(
                this.storage,
                `${this.storageKey}-code-verifier`,
              )),
            this._returnResult({error: null})
          );
        });
      }
      onAuthStateChange(t) {
        let r = (0, R.generateCallbackId)(),
          i = {
            id: r,
            callback: t,
            unsubscribe: () => {
              this._debug("#unsubscribe()", "state change callback with id removed", r),
                this.stateChangeEmitters.delete(r);
            },
          };
        return (
          this._debug("#onAuthStateChange()", "registered callback with id", r),
          this.stateChangeEmitters.set(r, i),
          (async () => (
            await this.initializePromise,
            await this._acquireLock(-1, async () => {
              this._emitInitialSession(r);
            })
          ))(),
          {data: {subscription: i}}
        );
      }
      async _emitInitialSession(t) {
        return await this._useSession(async (r) => {
          var i, n;
          try {
            let {
              data: {session: o},
              error: s,
            } = r;
            if (s) throw s;
            await ((i = this.stateChangeEmitters.get(t)) === null || i === void 0
              ? void 0
              : i.callback("INITIAL_SESSION", o)),
              this._debug("INITIAL_SESSION", "callback id", t, "session", o);
          } catch (o) {
            await ((n = this.stateChangeEmitters.get(t)) === null || n === void 0
              ? void 0
              : n.callback("INITIAL_SESSION", null)),
              this._debug("INITIAL_SESSION", "callback id", t, "error", o),
              console.error(o);
          }
        });
      }
      async resetPasswordForEmail(t, r = {}) {
        let i = null,
          n = null;
        this.flowType === "pkce" &&
          ([i, n] = await (0, R.getCodeChallengeAndMethod)(
            this.storage,
            this.storageKey,
            !0,
          ));
        try {
          return await (0, B._request)(this.fetch, "POST", `${this.url}/recover`, {
            body: {
              email: t,
              code_challenge: i,
              code_challenge_method: n,
              gotrue_meta_security: {captcha_token: r.captchaToken},
            },
            headers: this.headers,
            redirectTo: r.redirectTo,
          });
        } catch (o) {
          if (
            (await (0, R.removeItemAsync)(
              this.storage,
              `${this.storageKey}-code-verifier`,
            ),
            (0, N.isAuthError)(o))
          )
            return this._returnResult({data: null, error: o});
          throw o;
        }
      }
      async getUserIdentities() {
        var t;
        try {
          let {data: r, error: i} = await this.getUser();
          if (i) throw i;
          return this._returnResult({
            data: {
              identities: (t = r.user.identities) !== null && t !== void 0 ? t : [],
            },
            error: null,
          });
        } catch (r) {
          if ((0, N.isAuthError)(r)) return this._returnResult({data: null, error: r});
          throw r;
        }
      }
      async linkIdentity(t) {
        return "token" in t ? this.linkIdentityIdToken(t) : this.linkIdentityOAuth(t);
      }
      async linkIdentityOAuth(t) {
        var r;
        try {
          let {data: i, error: n} = await this._useSession(async (o) => {
            var s, a, c, u, l;
            let {data: h, error: f} = o;
            if (f) throw f;
            let d = await this._getUrlForProvider(
              `${this.url}/user/identities/authorize`,
              t.provider,
              {
                redirectTo:
                  (s = t.options) === null || s === void 0 ? void 0 : s.redirectTo,
                scopes: (a = t.options) === null || a === void 0 ? void 0 : a.scopes,
                queryParams:
                  (c = t.options) === null || c === void 0 ? void 0 : c.queryParams,
                skipBrowserRedirect: !0,
              },
            );
            return await (0, B._request)(this.fetch, "GET", d, {
              headers: this.headers,
              jwt:
                (l =
                  (u = h.session) === null || u === void 0
                    ? void 0
                    : u.access_token) !== null && l !== void 0
                  ? l
                  : void 0,
            });
          });
          if (n) throw n;
          return (
            (0, R.isBrowser)() &&
              !(!((r = t.options) === null || r === void 0) && r.skipBrowserRedirect) &&
              window.location.assign(i?.url),
            this._returnResult({data: {provider: t.provider, url: i?.url}, error: null})
          );
        } catch (i) {
          if ((0, N.isAuthError)(i))
            return this._returnResult({
              data: {provider: t.provider, url: null},
              error: i,
            });
          throw i;
        }
      }
      async linkIdentityIdToken(t) {
        return await this._useSession(async (r) => {
          var i;
          try {
            let {
              error: n,
              data: {session: o},
            } = r;
            if (n) throw n;
            let {options: s, provider: a, token: c, access_token: u, nonce: l} = t,
              h = await (0, B._request)(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=id_token`,
                {
                  headers: this.headers,
                  jwt: (i = o?.access_token) !== null && i !== void 0 ? i : void 0,
                  body: {
                    provider: a,
                    id_token: c,
                    access_token: u,
                    nonce: l,
                    link_identity: !0,
                    gotrue_meta_security: {captcha_token: s?.captchaToken},
                  },
                  xform: B._sessionResponse,
                },
              ),
              {data: f, error: d} = h;
            return d
              ? this._returnResult({data: {user: null, session: null}, error: d})
              : !f || !f.session || !f.user
                ? this._returnResult({
                    data: {user: null, session: null},
                    error: new N.AuthInvalidTokenResponseError(),
                  })
                : (f.session &&
                    (await this._saveSession(f.session),
                    await this._notifyAllSubscribers("USER_UPDATED", f.session)),
                  this._returnResult({data: f, error: d}));
          } catch (n) {
            if (
              (await (0, R.removeItemAsync)(
                this.storage,
                `${this.storageKey}-code-verifier`,
              ),
              (0, N.isAuthError)(n))
            )
              return this._returnResult({data: {user: null, session: null}, error: n});
            throw n;
          }
        });
      }
      async unlinkIdentity(t) {
        try {
          return await this._useSession(async (r) => {
            var i, n;
            let {data: o, error: s} = r;
            if (s) throw s;
            return await (0, B._request)(
              this.fetch,
              "DELETE",
              `${this.url}/user/identities/${t.identity_id}`,
              {
                headers: this.headers,
                jwt:
                  (n =
                    (i = o.session) === null || i === void 0
                      ? void 0
                      : i.access_token) !== null && n !== void 0
                    ? n
                    : void 0,
              },
            );
          });
        } catch (r) {
          if ((0, N.isAuthError)(r)) return this._returnResult({data: null, error: r});
          throw r;
        }
      }
      async _refreshAccessToken(t) {
        let r = `#_refreshAccessToken(${t.substring(0, 5)}...)`;
        this._debug(r, "begin");
        try {
          let i = Date.now();
          return await (0, R.retryable)(
            async (n) => (
              n > 0 && (await (0, R.sleep)(200 * Math.pow(2, n - 1))),
              this._debug(r, "refreshing attempt", n),
              await (0, B._request)(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=refresh_token`,
                {
                  body: {refresh_token: t},
                  headers: this.headers,
                  xform: B._sessionResponse,
                },
              )
            ),
            (n, o) => {
              let s = 200 * Math.pow(2, n);
              return (
                o &&
                (0, N.isAuthRetryableFetchError)(o) &&
                Date.now() + s - i < Ze.AUTO_REFRESH_TICK_DURATION_MS
              );
            },
          );
        } catch (i) {
          if ((this._debug(r, "error", i), (0, N.isAuthError)(i)))
            return this._returnResult({data: {session: null, user: null}, error: i});
          throw i;
        } finally {
          this._debug(r, "end");
        }
      }
      _isValidSession(t) {
        return (
          typeof t == "object" &&
          t !== null &&
          "access_token" in t &&
          "refresh_token" in t &&
          "expires_at" in t
        );
      }
      async _handleProviderSignIn(t, r) {
        let i = await this._getUrlForProvider(`${this.url}/authorize`, t, {
          redirectTo: r.redirectTo,
          scopes: r.scopes,
          queryParams: r.queryParams,
        });
        return (
          this._debug(
            "#_handleProviderSignIn()",
            "provider",
            t,
            "options",
            r,
            "url",
            i,
          ),
          (0, R.isBrowser)() && !r.skipBrowserRedirect && window.location.assign(i),
          {data: {provider: t, url: i}, error: null}
        );
      }
      async _recoverAndRefresh() {
        var t, r;
        let i = "#_recoverAndRefresh()";
        this._debug(i, "begin");
        try {
          let n = await (0, R.getItemAsync)(this.storage, this.storageKey);
          if (n && this.userStorage) {
            let s = await (0, R.getItemAsync)(
              this.userStorage,
              this.storageKey + "-user",
            );
            !this.storage.isServer &&
              Object.is(this.storage, this.userStorage) &&
              !s &&
              ((s = {user: n.user}),
              await (0, R.setItemAsync)(
                this.userStorage,
                this.storageKey + "-user",
                s,
              )),
              (n.user =
                (t = s?.user) !== null && t !== void 0
                  ? t
                  : (0, R.userNotAvailableProxy)());
          } else if (n && !n.user && !n.user) {
            let s = await (0, R.getItemAsync)(this.storage, this.storageKey + "-user");
            s && s?.user
              ? ((n.user = s.user),
                await (0, R.removeItemAsync)(this.storage, this.storageKey + "-user"),
                await (0, R.setItemAsync)(this.storage, this.storageKey, n))
              : (n.user = (0, R.userNotAvailableProxy)());
          }
          if ((this._debug(i, "session from storage", n), !this._isValidSession(n))) {
            this._debug(i, "session is not valid"),
              n !== null && (await this._removeSession());
            return;
          }
          let o =
            ((r = n.expires_at) !== null && r !== void 0 ? r : 1 / 0) * 1e3 -
              Date.now() <
            Ze.EXPIRY_MARGIN_MS;
          if (
            (this._debug(
              i,
              `session has${o ? "" : " not"} expired with margin of ${Ze.EXPIRY_MARGIN_MS}s`,
            ),
            o)
          ) {
            if (this.autoRefreshToken && n.refresh_token) {
              let {error: s} = await this._callRefreshToken(n.refresh_token);
              s &&
                (console.error(s),
                (0, N.isAuthRetryableFetchError)(s) ||
                  (this._debug(
                    i,
                    "refresh failed with a non-retryable error, removing the session",
                    s,
                  ),
                  await this._removeSession()));
            }
          } else if (n.user && n.user.__isUserNotAvailableProxy === !0)
            try {
              let {data: s, error: a} = await this._getUser(n.access_token);
              !a && s?.user
                ? ((n.user = s.user),
                  await this._saveSession(n),
                  await this._notifyAllSubscribers("SIGNED_IN", n))
                : this._debug(
                    i,
                    "could not get user data, skipping SIGNED_IN notification",
                  );
            } catch (s) {
              console.error("Error getting user data:", s),
                this._debug(
                  i,
                  "error getting user data, skipping SIGNED_IN notification",
                  s,
                );
            }
          else await this._notifyAllSubscribers("SIGNED_IN", n);
        } catch (n) {
          this._debug(i, "error", n), console.error(n);
          return;
        } finally {
          this._debug(i, "end");
        }
      }
      async _callRefreshToken(t) {
        var r, i;
        if (!t) throw new N.AuthSessionMissingError();
        if (this.refreshingDeferred) return this.refreshingDeferred.promise;
        let n = `#_callRefreshToken(${t.substring(0, 5)}...)`;
        this._debug(n, "begin");
        try {
          this.refreshingDeferred = new R.Deferred();
          let {data: o, error: s} = await this._refreshAccessToken(t);
          if (s) throw s;
          if (!o.session) throw new N.AuthSessionMissingError();
          await this._saveSession(o.session),
            await this._notifyAllSubscribers("TOKEN_REFRESHED", o.session);
          let a = {data: o.session, error: null};
          return this.refreshingDeferred.resolve(a), a;
        } catch (o) {
          if ((this._debug(n, "error", o), (0, N.isAuthError)(o))) {
            let s = {data: null, error: o};
            return (
              (0, N.isAuthRetryableFetchError)(o) || (await this._removeSession()),
              (r = this.refreshingDeferred) === null || r === void 0 || r.resolve(s),
              s
            );
          }
          throw (
            ((i = this.refreshingDeferred) === null || i === void 0 || i.reject(o), o)
          );
        } finally {
          (this.refreshingDeferred = null), this._debug(n, "end");
        }
      }
      async _notifyAllSubscribers(t, r, i = !0) {
        let n = `#_notifyAllSubscribers(${t})`;
        this._debug(n, "begin", r, `broadcast = ${i}`);
        try {
          this.broadcastChannel &&
            i &&
            this.broadcastChannel.postMessage({event: t, session: r});
          let o = [],
            s = Array.from(this.stateChangeEmitters.values()).map(async (a) => {
              try {
                await a.callback(t, r);
              } catch (c) {
                o.push(c);
              }
            });
          if ((await Promise.all(s), o.length > 0)) {
            for (let a = 0; a < o.length; a += 1) console.error(o[a]);
            throw o[0];
          }
        } finally {
          this._debug(n, "end");
        }
      }
      async _saveSession(t) {
        this._debug("#_saveSession()", t),
          (this.suppressGetSessionWarning = !0),
          await (0, R.removeItemAsync)(
            this.storage,
            `${this.storageKey}-code-verifier`,
          );
        let r = Object.assign({}, t),
          i = r.user && r.user.__isUserNotAvailableProxy === !0;
        if (this.userStorage) {
          !i &&
            r.user &&
            (await (0, R.setItemAsync)(this.userStorage, this.storageKey + "-user", {
              user: r.user,
            }));
          let n = Object.assign({}, r);
          delete n.user;
          let o = (0, R.deepClone)(n);
          await (0, R.setItemAsync)(this.storage, this.storageKey, o);
        } else {
          let n = (0, R.deepClone)(r);
          await (0, R.setItemAsync)(this.storage, this.storageKey, n);
        }
      }
      async _removeSession() {
        this._debug("#_removeSession()"),
          (this.suppressGetSessionWarning = !1),
          await (0, R.removeItemAsync)(this.storage, this.storageKey),
          await (0, R.removeItemAsync)(
            this.storage,
            this.storageKey + "-code-verifier",
          ),
          await (0, R.removeItemAsync)(this.storage, this.storageKey + "-user"),
          this.userStorage &&
            (await (0, R.removeItemAsync)(this.userStorage, this.storageKey + "-user")),
          await this._notifyAllSubscribers("SIGNED_OUT", null);
      }
      _removeVisibilityChangedCallback() {
        this._debug("#_removeVisibilityChangedCallback()");
        let t = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          t &&
            (0, R.isBrowser)() &&
            window?.removeEventListener &&
            window.removeEventListener("visibilitychange", t);
        } catch (r) {
          console.error("removing visibilitychange callback failed", r);
        }
      }
      async _startAutoRefresh() {
        await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
        let t = setInterval(
          () => this._autoRefreshTokenTick(),
          Ze.AUTO_REFRESH_TICK_DURATION_MS,
        );
        (this.autoRefreshTicker = t),
          t && typeof t == "object" && typeof t.unref == "function"
            ? t.unref()
            : typeof Deno < "u" &&
              typeof Deno.unrefTimer == "function" &&
              Deno.unrefTimer(t),
          setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
      }
      async _stopAutoRefresh() {
        this._debug("#_stopAutoRefresh()");
        let t = this.autoRefreshTicker;
        (this.autoRefreshTicker = null), t && clearInterval(t);
      }
      async startAutoRefresh() {
        this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
      }
      async stopAutoRefresh() {
        this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
      }
      async _autoRefreshTokenTick() {
        this._debug("#_autoRefreshTokenTick()", "begin");
        try {
          await this._acquireLock(0, async () => {
            try {
              let t = Date.now();
              try {
                return await this._useSession(async (r) => {
                  let {
                    data: {session: i},
                  } = r;
                  if (!i || !i.refresh_token || !i.expires_at) {
                    this._debug("#_autoRefreshTokenTick()", "no session");
                    return;
                  }
                  let n = Math.floor(
                    (i.expires_at * 1e3 - t) / Ze.AUTO_REFRESH_TICK_DURATION_MS,
                  );
                  this._debug(
                    "#_autoRefreshTokenTick()",
                    `access token expires in ${n} ticks, a tick lasts ${Ze.AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${Ze.AUTO_REFRESH_TICK_THRESHOLD} ticks`,
                  ),
                    n <= Ze.AUTO_REFRESH_TICK_THRESHOLD &&
                      (await this._callRefreshToken(i.refresh_token));
                });
              } catch (r) {
                console.error(
                  "Auto refresh tick failed with error. This is likely a transient error.",
                  r,
                );
              }
            } finally {
              this._debug("#_autoRefreshTokenTick()", "end");
            }
          });
        } catch (t) {
          if (t.isAcquireTimeout || t instanceof U0.LockAcquireTimeoutError)
            this._debug("auto refresh token tick lock not available");
          else throw t;
        }
      }
      async _handleVisibilityChange() {
        if (
          (this._debug("#_handleVisibilityChange()"),
          !(0, R.isBrowser)() || !window?.addEventListener)
        )
          return this.autoRefreshToken && this.startAutoRefresh(), !1;
        try {
          (this.visibilityChangedCallback = async () =>
            await this._onVisibilityChanged(!1)),
            window?.addEventListener(
              "visibilitychange",
              this.visibilityChangedCallback,
            ),
            await this._onVisibilityChanged(!0);
        } catch (t) {
          console.error("_handleVisibilityChange", t);
        }
      }
      async _onVisibilityChanged(t) {
        let r = `#_onVisibilityChanged(${t})`;
        this._debug(r, "visibilityState", document.visibilityState),
          document.visibilityState === "visible"
            ? (this.autoRefreshToken && this._startAutoRefresh(),
              t ||
                (await this.initializePromise,
                await this._acquireLock(-1, async () => {
                  if (document.visibilityState !== "visible") {
                    this._debug(
                      r,
                      "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
                    );
                    return;
                  }
                  await this._recoverAndRefresh();
                })))
            : document.visibilityState === "hidden" &&
              this.autoRefreshToken &&
              this._stopAutoRefresh();
      }
      async _getUrlForProvider(t, r, i) {
        let n = [`provider=${encodeURIComponent(r)}`];
        if (
          (i?.redirectTo && n.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),
          i?.scopes && n.push(`scopes=${encodeURIComponent(i.scopes)}`),
          this.flowType === "pkce")
        ) {
          let [o, s] = await (0, R.getCodeChallengeAndMethod)(
              this.storage,
              this.storageKey,
            ),
            a = new URLSearchParams({
              code_challenge: `${encodeURIComponent(o)}`,
              code_challenge_method: `${encodeURIComponent(s)}`,
            });
          n.push(a.toString());
        }
        if (i?.queryParams) {
          let o = new URLSearchParams(i.queryParams);
          n.push(o.toString());
        }
        return (
          i?.skipBrowserRedirect &&
            n.push(`skip_http_redirect=${i.skipBrowserRedirect}`),
          `${t}?${n.join("&")}`
        );
      }
      async _unenroll(t) {
        try {
          return await this._useSession(async (r) => {
            var i;
            let {data: n, error: o} = r;
            return o
              ? this._returnResult({data: null, error: o})
              : await (0, B._request)(
                  this.fetch,
                  "DELETE",
                  `${this.url}/factors/${t.factorId}`,
                  {
                    headers: this.headers,
                    jwt:
                      (i = n?.session) === null || i === void 0
                        ? void 0
                        : i.access_token,
                  },
                );
          });
        } catch (r) {
          if ((0, N.isAuthError)(r)) return this._returnResult({data: null, error: r});
          throw r;
        }
      }
      async _enroll(t) {
        try {
          return await this._useSession(async (r) => {
            var i, n;
            let {data: o, error: s} = r;
            if (s) return this._returnResult({data: null, error: s});
            let a = Object.assign(
                {friendly_name: t.friendlyName, factor_type: t.factorType},
                t.factorType === "phone"
                  ? {phone: t.phone}
                  : t.factorType === "totp"
                    ? {issuer: t.issuer}
                    : {},
              ),
              {data: c, error: u} = await (0, B._request)(
                this.fetch,
                "POST",
                `${this.url}/factors`,
                {
                  body: a,
                  headers: this.headers,
                  jwt:
                    (i = o?.session) === null || i === void 0 ? void 0 : i.access_token,
                },
              );
            return u
              ? this._returnResult({data: null, error: u})
              : (t.factorType === "totp" &&
                  c.type === "totp" &&
                  !((n = c?.totp) === null || n === void 0) &&
                  n.qr_code &&
                  (c.totp.qr_code = `data:image/svg+xml;utf-8,${c.totp.qr_code}`),
                this._returnResult({data: c, error: null}));
          });
        } catch (r) {
          if ((0, N.isAuthError)(r)) return this._returnResult({data: null, error: r});
          throw r;
        }
      }
      async _verify(t) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (r) => {
              var i;
              let {data: n, error: o} = r;
              if (o) return this._returnResult({data: null, error: o});
              let s = Object.assign(
                  {challenge_id: t.challengeId},
                  "webauthn" in t
                    ? {
                        webauthn: Object.assign(Object.assign({}, t.webauthn), {
                          credential_response:
                            t.webauthn.type === "create"
                              ? (0, Qi.serializeCredentialCreationResponse)(
                                  t.webauthn.credential_response,
                                )
                              : (0, Qi.serializeCredentialRequestResponse)(
                                  t.webauthn.credential_response,
                                ),
                        }),
                      }
                    : {code: t.code},
                ),
                {data: a, error: c} = await (0, B._request)(
                  this.fetch,
                  "POST",
                  `${this.url}/factors/${t.factorId}/verify`,
                  {
                    body: s,
                    headers: this.headers,
                    jwt:
                      (i = n?.session) === null || i === void 0
                        ? void 0
                        : i.access_token,
                  },
                );
              return c
                ? this._returnResult({data: null, error: c})
                : (await this._saveSession(
                    Object.assign(
                      {expires_at: Math.round(Date.now() / 1e3) + a.expires_in},
                      a,
                    ),
                  ),
                  await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a),
                  this._returnResult({data: a, error: c}));
            });
          } catch (r) {
            if ((0, N.isAuthError)(r))
              return this._returnResult({data: null, error: r});
            throw r;
          }
        });
      }
      async _challenge(t) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (r) => {
              var i;
              let {data: n, error: o} = r;
              if (o) return this._returnResult({data: null, error: o});
              let s = await (0, B._request)(
                this.fetch,
                "POST",
                `${this.url}/factors/${t.factorId}/challenge`,
                {
                  body: t,
                  headers: this.headers,
                  jwt:
                    (i = n?.session) === null || i === void 0 ? void 0 : i.access_token,
                },
              );
              if (s.error) return s;
              let {data: a} = s;
              if (a.type !== "webauthn") return {data: a, error: null};
              switch (a.webauthn.type) {
                case "create":
                  return {
                    data: Object.assign(Object.assign({}, a), {
                      webauthn: Object.assign(Object.assign({}, a.webauthn), {
                        credential_options: Object.assign(
                          Object.assign({}, a.webauthn.credential_options),
                          {
                            publicKey: (0, Qi.deserializeCredentialCreationOptions)(
                              a.webauthn.credential_options.publicKey,
                            ),
                          },
                        ),
                      }),
                    }),
                    error: null,
                  };
                case "request":
                  return {
                    data: Object.assign(Object.assign({}, a), {
                      webauthn: Object.assign(Object.assign({}, a.webauthn), {
                        credential_options: Object.assign(
                          Object.assign({}, a.webauthn.credential_options),
                          {
                            publicKey: (0, Qi.deserializeCredentialRequestOptions)(
                              a.webauthn.credential_options.publicKey,
                            ),
                          },
                        ),
                      }),
                    }),
                    error: null,
                  };
              }
            });
          } catch (r) {
            if ((0, N.isAuthError)(r))
              return this._returnResult({data: null, error: r});
            throw r;
          }
        });
      }
      async _challengeAndVerify(t) {
        let {data: r, error: i} = await this._challenge({factorId: t.factorId});
        return i
          ? this._returnResult({data: null, error: i})
          : await this._verify({factorId: t.factorId, challengeId: r.id, code: t.code});
      }
      async _listFactors() {
        var t;
        let {
          data: {user: r},
          error: i,
        } = await this.getUser();
        if (i) return {data: null, error: i};
        let n = {all: [], phone: [], totp: [], webauthn: []};
        for (let o of (t = r?.factors) !== null && t !== void 0 ? t : [])
          n.all.push(o), o.status === "verified" && n[o.factor_type].push(o);
        return {data: n, error: null};
      }
      async _getAuthenticatorAssuranceLevel() {
        var t, r;
        let {
          data: {session: i},
          error: n,
        } = await this.getSession();
        if (n) return this._returnResult({data: null, error: n});
        if (!i)
          return {
            data: {
              currentLevel: null,
              nextLevel: null,
              currentAuthenticationMethods: [],
            },
            error: null,
          };
        let {payload: o} = (0, R.decodeJWT)(i.access_token),
          s = null;
        o.aal && (s = o.aal);
        let a = s;
        ((r =
          (t = i.user.factors) === null || t === void 0
            ? void 0
            : t.filter((l) => l.status === "verified")) !== null && r !== void 0
          ? r
          : []
        ).length > 0 && (a = "aal2");
        let u = o.amr || [];
        return {
          data: {currentLevel: s, nextLevel: a, currentAuthenticationMethods: u},
          error: null,
        };
      }
      async _getAuthorizationDetails(t) {
        try {
          return await this._useSession(async (r) => {
            let {
              data: {session: i},
              error: n,
            } = r;
            return n
              ? this._returnResult({data: null, error: n})
              : i
                ? await (0, B._request)(
                    this.fetch,
                    "GET",
                    `${this.url}/oauth/authorizations/${t}`,
                    {
                      headers: this.headers,
                      jwt: i.access_token,
                      xform: (o) => ({data: o, error: null}),
                    },
                  )
                : this._returnResult({
                    data: null,
                    error: new N.AuthSessionMissingError(),
                  });
          });
        } catch (r) {
          if ((0, N.isAuthError)(r)) return this._returnResult({data: null, error: r});
          throw r;
        }
      }
      async _approveAuthorization(t, r) {
        try {
          return await this._useSession(async (i) => {
            let {
              data: {session: n},
              error: o,
            } = i;
            if (o) return this._returnResult({data: null, error: o});
            if (!n)
              return this._returnResult({
                data: null,
                error: new N.AuthSessionMissingError(),
              });
            let s = await (0, B._request)(
              this.fetch,
              "POST",
              `${this.url}/oauth/authorizations/${t}/consent`,
              {
                headers: this.headers,
                jwt: n.access_token,
                body: {action: "approve"},
                xform: (a) => ({data: a, error: null}),
              },
            );
            return (
              s.data &&
                s.data.redirect_url &&
                (0, R.isBrowser)() &&
                !r?.skipBrowserRedirect &&
                window.location.assign(s.data.redirect_url),
              s
            );
          });
        } catch (i) {
          if ((0, N.isAuthError)(i)) return this._returnResult({data: null, error: i});
          throw i;
        }
      }
      async _denyAuthorization(t, r) {
        try {
          return await this._useSession(async (i) => {
            let {
              data: {session: n},
              error: o,
            } = i;
            if (o) return this._returnResult({data: null, error: o});
            if (!n)
              return this._returnResult({
                data: null,
                error: new N.AuthSessionMissingError(),
              });
            let s = await (0, B._request)(
              this.fetch,
              "POST",
              `${this.url}/oauth/authorizations/${t}/consent`,
              {
                headers: this.headers,
                jwt: n.access_token,
                body: {action: "deny"},
                xform: (a) => ({data: a, error: null}),
              },
            );
            return (
              s.data &&
                s.data.redirect_url &&
                (0, R.isBrowser)() &&
                !r?.skipBrowserRedirect &&
                window.location.assign(s.data.redirect_url),
              s
            );
          });
        } catch (i) {
          if ((0, N.isAuthError)(i)) return this._returnResult({data: null, error: i});
          throw i;
        }
      }
      async _listOAuthGrants() {
        try {
          return await this._useSession(async (t) => {
            let {
              data: {session: r},
              error: i,
            } = t;
            return i
              ? this._returnResult({data: null, error: i})
              : r
                ? await (0, B._request)(
                    this.fetch,
                    "GET",
                    `${this.url}/user/oauth/grants`,
                    {
                      headers: this.headers,
                      jwt: r.access_token,
                      xform: (n) => ({data: n, error: null}),
                    },
                  )
                : this._returnResult({
                    data: null,
                    error: new N.AuthSessionMissingError(),
                  });
          });
        } catch (t) {
          if ((0, N.isAuthError)(t)) return this._returnResult({data: null, error: t});
          throw t;
        }
      }
      async _revokeOAuthGrant(t) {
        try {
          return await this._useSession(async (r) => {
            let {
              data: {session: i},
              error: n,
            } = r;
            return n
              ? this._returnResult({data: null, error: n})
              : i
                ? (await (0, B._request)(
                    this.fetch,
                    "DELETE",
                    `${this.url}/user/oauth/grants`,
                    {
                      headers: this.headers,
                      jwt: i.access_token,
                      query: {client_id: t.clientId},
                      noResolveJson: !0,
                    },
                  ),
                  {data: {}, error: null})
                : this._returnResult({
                    data: null,
                    error: new N.AuthSessionMissingError(),
                  });
          });
        } catch (r) {
          if ((0, N.isAuthError)(r)) return this._returnResult({data: null, error: r});
          throw r;
        }
      }
      async fetchJwk(t, r = {keys: []}) {
        let i = r.keys.find((a) => a.kid === t);
        if (i) return i;
        let n = Date.now();
        if (
          ((i = this.jwks.keys.find((a) => a.kid === t)),
          i && this.jwks_cached_at + Ze.JWKS_TTL > n)
        )
          return i;
        let {data: o, error: s} = await (0, B._request)(
          this.fetch,
          "GET",
          `${this.url}/.well-known/jwks.json`,
          {headers: this.headers},
        );
        if (s) throw s;
        return !o.keys ||
          o.keys.length === 0 ||
          ((this.jwks = o),
          (this.jwks_cached_at = n),
          (i = o.keys.find((a) => a.kid === t)),
          !i)
          ? null
          : i;
      }
      async getClaims(t, r = {}) {
        try {
          let i = t;
          if (!i) {
            let {data: d, error: p} = await this.getSession();
            if (p || !d.session) return this._returnResult({data: null, error: p});
            i = d.session.access_token;
          }
          let {
            header: n,
            payload: o,
            signature: s,
            raw: {header: a, payload: c},
          } = (0, R.decodeJWT)(i);
          r?.allowExpired || (0, R.validateExp)(o.exp);
          let u =
            !n.alg ||
            n.alg.startsWith("HS") ||
            !n.kid ||
            !("crypto" in globalThis && "subtle" in globalThis.crypto)
              ? null
              : await this.fetchJwk(n.kid, r?.keys ? {keys: r.keys} : r?.jwks);
          if (!u) {
            let {error: d} = await this.getUser(i);
            if (d) throw d;
            return {data: {claims: o, header: n, signature: s}, error: null};
          }
          let l = (0, R.getAlgorithm)(n.alg),
            h = await crypto.subtle.importKey("jwk", u, l, !0, ["verify"]);
          if (
            !(await crypto.subtle.verify(
              l,
              h,
              s,
              (0, D0.stringToUint8Array)(`${a}.${c}`),
            ))
          )
            throw new N.AuthInvalidJwtError("Invalid JWT signature");
          return {data: {claims: o, header: n, signature: s}, error: null};
        } catch (i) {
          if ((0, N.isAuthError)(i)) return this._returnResult({data: null, error: i});
          throw i;
        }
      }
    };
  Ha.nextInstanceID = {};
  Gp.default = Ha;
});
var F0 = T((Yp) => {
  "use strict";
  Object.defineProperty(Yp, "__esModule", {value: !0});
  var $P = (ot(), ht(it)),
    EP = $P.__importDefault(qa()),
    kP = EP.default;
  Yp.default = kP;
});
var M0 = T((Xp) => {
  "use strict";
  Object.defineProperty(Xp, "__esModule", {value: !0});
  var AP = (ot(), ht(it)),
    IP = AP.__importDefault(Hp()),
    OP = IP.default;
  Xp.default = OP;
});
var Qp = T((_e) => {
  "use strict";
  Object.defineProperty(_e, "__esModule", {value: !0});
  _e.processLock =
    _e.lockInternals =
    _e.NavigatorLockAcquireTimeoutError =
    _e.navigatorLock =
    _e.AuthClient =
    _e.AuthAdminApi =
    _e.GoTrueClient =
    _e.GoTrueAdminApi =
      void 0;
  var Un = (ot(), ht(it)),
    TP = Un.__importDefault(qa());
  _e.GoTrueAdminApi = TP.default;
  var jP = Un.__importDefault(Hp());
  _e.GoTrueClient = jP.default;
  var PP = Un.__importDefault(F0());
  _e.AuthAdminApi = PP.default;
  var NP = Un.__importDefault(M0());
  _e.AuthClient = NP.default;
  Un.__exportStar(Lp(), _e);
  Un.__exportStar(Ar(), _e);
  var Ya = qp();
  Object.defineProperty(_e, "navigatorLock", {
    enumerable: !0,
    get: function () {
      return Ya.navigatorLock;
    },
  });
  Object.defineProperty(_e, "NavigatorLockAcquireTimeoutError", {
    enumerable: !0,
    get: function () {
      return Ya.NavigatorLockAcquireTimeoutError;
    },
  });
  Object.defineProperty(_e, "lockInternals", {
    enumerable: !0,
    get: function () {
      return Ya.internals;
    },
  });
  Object.defineProperty(_e, "processLock", {
    enumerable: !0,
    get: function () {
      return Ya.processLock;
    },
  });
});
var X0 = We(nc());
var ic = (e, t, r) => {
    let i = e instanceof RegExp ? cm(e, r) : e,
      n = t instanceof RegExp ? cm(t, r) : t,
      o = i !== null && n != null && xx(i, n, r);
    return (
      o && {
        start: o[0],
        end: o[1],
        pre: r.slice(0, o[0]),
        body: r.slice(o[0] + i.length, o[1]),
        post: r.slice(o[1] + n.length),
      }
    );
  },
  cm = (e, t) => {
    let r = t.match(e);
    return r ? r[0] : null;
  },
  xx = (e, t, r) => {
    let i,
      n,
      o,
      s,
      a,
      c = r.indexOf(e),
      u = r.indexOf(t, c + 1),
      l = c;
    if (c >= 0 && u > 0) {
      if (e === t) return [c, u];
      for (i = [], o = r.length; l >= 0 && !a; ) {
        if (l === c) i.push(l), (c = r.indexOf(e, l + 1));
        else if (i.length === 1) {
          let h = i.pop();
          h !== void 0 && (a = [h, u]);
        } else
          (n = i.pop()),
            n !== void 0 && n < o && ((o = n), (s = u)),
            (u = r.indexOf(t, l + 1));
        l = c < u && c >= 0 ? c : u;
      }
      i.length && s !== void 0 && (a = [o, s]);
    }
    return a;
  };
var um = "\0SLASH" + Math.random() + "\0",
  lm = "\0OPEN" + Math.random() + "\0",
  sc = "\0CLOSE" + Math.random() + "\0",
  hm = "\0COMMA" + Math.random() + "\0",
  dm = "\0PERIOD" + Math.random() + "\0",
  Sx = new RegExp(um, "g"),
  $x = new RegExp(lm, "g"),
  Ex = new RegExp(sc, "g"),
  kx = new RegExp(hm, "g"),
  Ax = new RegExp(dm, "g"),
  Ix = /\\\\/g,
  Ox = /\\{/g,
  Tx = /\\}/g,
  jx = /\\,/g,
  Px = /\\./g;
function oc(e) {
  return isNaN(e) ? e.charCodeAt(0) : parseInt(e, 10);
}
function Nx(e) {
  return e
    .replace(Ix, um)
    .replace(Ox, lm)
    .replace(Tx, sc)
    .replace(jx, hm)
    .replace(Px, dm);
}
function Rx(e) {
  return e
    .replace(Sx, "\\")
    .replace($x, "{")
    .replace(Ex, "}")
    .replace(kx, ",")
    .replace(Ax, ".");
}
function fm(e) {
  if (!e) return [""];
  let t = [],
    r = ic("{", "}", e);
  if (!r) return e.split(",");
  let {pre: i, body: n, post: o} = r,
    s = i.split(",");
  s[s.length - 1] += "{" + n + "}";
  let a = fm(o);
  return (
    o.length && ((s[s.length - 1] += a.shift()), s.push.apply(s, a)),
    t.push.apply(t, s),
    t
  );
}
function pm(e) {
  return e
    ? (e.slice(0, 2) === "{}" && (e = "\\{\\}" + e.slice(2)), Fn(Nx(e), !0).map(Rx))
    : [];
}
function Cx(e) {
  return "{" + e + "}";
}
function zx(e) {
  return /^-?0\d/.test(e);
}
function Ux(e, t) {
  return e <= t;
}
function Dx(e, t) {
  return e >= t;
}
function Fn(e, t) {
  let r = [],
    i = ic("{", "}", e);
  if (!i) return [e];
  let n = i.pre,
    o = i.post.length ? Fn(i.post, !1) : [""];
  if (/\$$/.test(i.pre))
    for (let s = 0; s < o.length; s++) {
      let a = n + "{" + i.body + "}" + o[s];
      r.push(a);
    }
  else {
    let s = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body),
      a = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body),
      c = s || a,
      u = i.body.indexOf(",") >= 0;
    if (!c && !u)
      return i.post.match(/,(?!,).*\}/)
        ? ((e = i.pre + "{" + i.body + sc + i.post), Fn(e))
        : [e];
    let l;
    if (c) l = i.body.split(/\.\./);
    else if (
      ((l = fm(i.body)),
      l.length === 1 && l[0] !== void 0 && ((l = Fn(l[0], !1).map(Cx)), l.length === 1))
    )
      return o.map((f) => i.pre + l[0] + f);
    let h;
    if (c && l[0] !== void 0 && l[1] !== void 0) {
      let f = oc(l[0]),
        d = oc(l[1]),
        p = Math.max(l[0].length, l[1].length),
        m = l.length === 3 && l[2] !== void 0 ? Math.abs(oc(l[2])) : 1,
        v = Ux;
      d < f && ((m *= -1), (v = Dx));
      let $ = l.some(zx);
      h = [];
      for (let b = f; v(b, d); b += m) {
        let x;
        if (a) (x = String.fromCharCode(b)), x === "\\" && (x = "");
        else if (((x = String(b)), $)) {
          let D = p - x.length;
          if (D > 0) {
            let _ = new Array(D + 1).join("0");
            b < 0 ? (x = "-" + _ + x.slice(1)) : (x = _ + x);
          }
        }
        h.push(x);
      }
    } else {
      h = [];
      for (let f = 0; f < l.length; f++) h.push.apply(h, Fn(l[f], !1));
    }
    for (let f = 0; f < h.length; f++)
      for (let d = 0; d < o.length; d++) {
        let p = n + h[f] + o[d];
        (!t || c || p) && r.push(p);
      }
  }
  return r;
}
var Mn = (e) => {
  if (typeof e != "string") throw new TypeError("invalid pattern");
  if (e.length > 65536) throw new TypeError("pattern is too long");
};
var Lx = {
    "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
    "[:alpha:]": ["\\p{L}\\p{Nl}", !0],
    "[:ascii:]": ["\\x00-\\x7f", !1],
    "[:blank:]": ["\\p{Zs}\\t", !0],
    "[:cntrl:]": ["\\p{Cc}", !0],
    "[:digit:]": ["\\p{Nd}", !0],
    "[:graph:]": ["\\p{Z}\\p{C}", !0, !0],
    "[:lower:]": ["\\p{Ll}", !0],
    "[:print:]": ["\\p{C}", !0],
    "[:punct:]": ["\\p{P}", !0],
    "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
    "[:upper:]": ["\\p{Lu}", !0],
    "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
    "[:xdigit:]": ["A-Fa-f0-9", !1],
  },
  Bn = (e) => e.replace(/[[\]\\-]/g, "\\$&"),
  Fx = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
  mm = (e) => e.join(""),
  gm = (e, t) => {
    let r = t;
    if (e.charAt(r) !== "[") throw new Error("not in a brace expression");
    let i = [],
      n = [],
      o = r + 1,
      s = !1,
      a = !1,
      c = !1,
      u = !1,
      l = r,
      h = "";
    e: for (; o < e.length; ) {
      let m = e.charAt(o);
      if ((m === "!" || m === "^") && o === r + 1) {
        (u = !0), o++;
        continue;
      }
      if (m === "]" && s && !c) {
        l = o + 1;
        break;
      }
      if (((s = !0), m === "\\" && !c)) {
        (c = !0), o++;
        continue;
      }
      if (m === "[" && !c) {
        for (let [v, [w, $, b]] of Object.entries(Lx))
          if (e.startsWith(v, o)) {
            if (h) return ["$.", !1, e.length - r, !0];
            (o += v.length), b ? n.push(w) : i.push(w), (a = a || $);
            continue e;
          }
      }
      if (((c = !1), h)) {
        m > h ? i.push(Bn(h) + "-" + Bn(m)) : m === h && i.push(Bn(m)), (h = ""), o++;
        continue;
      }
      if (e.startsWith("-]", o + 1)) {
        i.push(Bn(m + "-")), (o += 2);
        continue;
      }
      if (e.startsWith("-", o + 1)) {
        (h = m), (o += 2);
        continue;
      }
      i.push(Bn(m)), o++;
    }
    if (l < o) return ["", !1, 0, !1];
    if (!i.length && !n.length) return ["$.", !1, e.length - r, !0];
    if (n.length === 0 && i.length === 1 && /^\\?.$/.test(i[0]) && !u) {
      let m = i[0].length === 2 ? i[0].slice(-1) : i[0];
      return [Fx(m), !1, l - r, !1];
    }
    let f = "[" + (u ? "^" : "") + mm(i) + "]",
      d = "[" + (u ? "" : "^") + mm(n) + "]";
    return [
      i.length && n.length ? "(" + f + "|" + d + ")" : i.length ? f : d,
      a,
      l - r,
      !0,
    ];
  };
var dt = (e, {windowsPathsNoEscape: t = !1, magicalBraces: r = !0} = {}) =>
  r
    ? t
      ? e.replace(/\[([^\/\\])\]/g, "$1")
      : e.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1")
    : t
      ? e.replace(/\[([^\/\\{}])\]/g, "$1")
      : e.replace(/((?!\\).|^)\[([^\/\\{}])\]/g, "$1$2").replace(/\\([^\/{}])/g, "$1");
var Mx = new Set(["!", "?", "+", "*", "@"]),
  vm = (e) => Mx.has(e),
  Bx = "(?!(?:^|/)\\.\\.?(?:$|/))",
  so = "(?!\\.)",
  Zx = new Set(["[", "."]),
  qx = new Set(["..", "."]),
  Vx = new Set("().*{}+?[]^$\\!"),
  Wx = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
  ac = "[^/]",
  _m = ac + "*?",
  ym = ac + "+?",
  Pr = class e {
    type;
    #e;
    #r;
    #o = !1;
    #i = [];
    #s;
    #b;
    #v;
    #l = !1;
    #a;
    #d;
    #h = !1;
    constructor(t, r, i = {}) {
      (this.type = t),
        t && (this.#r = !0),
        (this.#s = r),
        (this.#e = this.#s ? this.#s.#e : this),
        (this.#a = this.#e === this ? i : this.#e.#a),
        (this.#v = this.#e === this ? [] : this.#e.#v),
        t === "!" && !this.#e.#l && this.#v.push(this),
        (this.#b = this.#s ? this.#s.#i.length : 0);
    }
    get hasMagic() {
      if (this.#r !== void 0) return this.#r;
      for (let t of this.#i)
        if (typeof t != "string" && (t.type || t.hasMagic)) return (this.#r = !0);
      return this.#r;
    }
    toString() {
      return this.#d !== void 0
        ? this.#d
        : this.type
          ? (this.#d = this.type + "(" + this.#i.map((t) => String(t)).join("|") + ")")
          : (this.#d = this.#i.map((t) => String(t)).join(""));
    }
    #c() {
      if (this !== this.#e) throw new Error("should only call on root");
      if (this.#l) return this;
      this.toString(), (this.#l = !0);
      let t;
      for (; (t = this.#v.pop()); ) {
        if (t.type !== "!") continue;
        let r = t,
          i = r.#s;
        for (; i; ) {
          for (let n = r.#b + 1; !i.type && n < i.#i.length; n++)
            for (let o of t.#i) {
              if (typeof o == "string") throw new Error("string part in extglob AST??");
              o.copyIn(i.#i[n]);
            }
          (r = i), (i = r.#s);
        }
      }
      return this;
    }
    push(...t) {
      for (let r of t)
        if (r !== "") {
          if (typeof r != "string" && !(r instanceof e && r.#s === this))
            throw new Error("invalid part: " + r);
          this.#i.push(r);
        }
    }
    toJSON() {
      let t =
        this.type === null
          ? this.#i.slice().map((r) => (typeof r == "string" ? r : r.toJSON()))
          : [this.type, ...this.#i.map((r) => r.toJSON())];
      return (
        this.isStart() && !this.type && t.unshift([]),
        this.isEnd() &&
          (this === this.#e || (this.#e.#l && this.#s?.type === "!")) &&
          t.push({}),
        t
      );
    }
    isStart() {
      if (this.#e === this) return !0;
      if (!this.#s?.isStart()) return !1;
      if (this.#b === 0) return !0;
      let t = this.#s;
      for (let r = 0; r < this.#b; r++) {
        let i = t.#i[r];
        if (!(i instanceof e && i.type === "!")) return !1;
      }
      return !0;
    }
    isEnd() {
      if (this.#e === this || this.#s?.type === "!") return !0;
      if (!this.#s?.isEnd()) return !1;
      if (!this.type) return this.#s?.isEnd();
      let t = this.#s ? this.#s.#i.length : 0;
      return this.#b === t - 1;
    }
    copyIn(t) {
      typeof t == "string" ? this.push(t) : this.push(t.clone(this));
    }
    clone(t) {
      let r = new e(this.type, t);
      for (let i of this.#i) r.copyIn(i);
      return r;
    }
    static #n(t, r, i, n) {
      let o = !1,
        s = !1,
        a = -1,
        c = !1;
      if (r.type === null) {
        let d = i,
          p = "";
        for (; d < t.length; ) {
          let m = t.charAt(d++);
          if (o || m === "\\") {
            (o = !o), (p += m);
            continue;
          }
          if (s) {
            d === a + 1
              ? (m === "^" || m === "!") && (c = !0)
              : m === "]" && !(d === a + 2 && c) && (s = !1),
              (p += m);
            continue;
          } else if (m === "[") {
            (s = !0), (a = d), (c = !1), (p += m);
            continue;
          }
          if (!n.noext && vm(m) && t.charAt(d) === "(") {
            r.push(p), (p = "");
            let v = new e(m, r);
            (d = e.#n(t, v, d, n)), r.push(v);
            continue;
          }
          p += m;
        }
        return r.push(p), d;
      }
      let u = i + 1,
        l = new e(null, r),
        h = [],
        f = "";
      for (; u < t.length; ) {
        let d = t.charAt(u++);
        if (o || d === "\\") {
          (o = !o), (f += d);
          continue;
        }
        if (s) {
          u === a + 1
            ? (d === "^" || d === "!") && (c = !0)
            : d === "]" && !(u === a + 2 && c) && (s = !1),
            (f += d);
          continue;
        } else if (d === "[") {
          (s = !0), (a = u), (c = !1), (f += d);
          continue;
        }
        if (vm(d) && t.charAt(u) === "(") {
          l.push(f), (f = "");
          let p = new e(d, l);
          l.push(p), (u = e.#n(t, p, u, n));
          continue;
        }
        if (d === "|") {
          l.push(f), (f = ""), h.push(l), (l = new e(null, r));
          continue;
        }
        if (d === ")")
          return (
            f === "" && r.#i.length === 0 && (r.#h = !0),
            l.push(f),
            (f = ""),
            r.push(...h, l),
            u
          );
        f += d;
      }
      return (r.type = null), (r.#r = void 0), (r.#i = [t.substring(i - 1)]), u;
    }
    static fromGlob(t, r = {}) {
      let i = new e(null, void 0, r);
      return e.#n(t, i, 0, r), i;
    }
    toMMPattern() {
      if (this !== this.#e) return this.#e.toMMPattern();
      let t = this.toString(),
        [r, i, n, o] = this.toRegExpSource();
      if (
        !(
          n ||
          this.#r ||
          (this.#a.nocase &&
            !this.#a.nocaseMagicOnly &&
            t.toUpperCase() !== t.toLowerCase())
        )
      )
        return i;
      let a = (this.#a.nocase ? "i" : "") + (o ? "u" : "");
      return Object.assign(new RegExp(`^${r}$`, a), {_src: r, _glob: t});
    }
    get options() {
      return this.#a;
    }
    toRegExpSource(t) {
      let r = t ?? !!this.#a.dot;
      if ((this.#e === this && this.#c(), !this.type)) {
        let c =
            this.isStart() &&
            this.isEnd() &&
            !this.#i.some((d) => typeof d != "string"),
          u = this.#i
            .map((d) => {
              let [p, m, v, w] =
                typeof d == "string" ? e.#w(d, this.#r, c) : d.toRegExpSource(t);
              return (this.#r = this.#r || v), (this.#o = this.#o || w), p;
            })
            .join(""),
          l = "";
        if (
          this.isStart() &&
          typeof this.#i[0] == "string" &&
          !(this.#i.length === 1 && qx.has(this.#i[0]))
        ) {
          let p = Zx,
            m =
              (r && p.has(u.charAt(0))) ||
              (u.startsWith("\\.") && p.has(u.charAt(2))) ||
              (u.startsWith("\\.\\.") && p.has(u.charAt(4))),
            v = !r && !t && p.has(u.charAt(0));
          l = m ? Bx : v ? so : "";
        }
        let h = "";
        return (
          this.isEnd() && this.#e.#l && this.#s?.type === "!" && (h = "(?:$|\\/)"),
          [l + u + h, dt(u), (this.#r = !!this.#r), this.#o]
        );
      }
      let i = this.type === "*" || this.type === "+",
        n = this.type === "!" ? "(?:(?!(?:" : "(?:",
        o = this.#f(r);
      if (this.isStart() && this.isEnd() && !o && this.type !== "!") {
        let c = this.toString();
        return (
          (this.#i = [c]),
          (this.type = null),
          (this.#r = void 0),
          [c, dt(this.toString()), !1, !1]
        );
      }
      let s = !i || t || r || !so ? "" : this.#f(!0);
      s === o && (s = ""), s && (o = `(?:${o})(?:${s})*?`);
      let a = "";
      if (this.type === "!" && this.#h) a = (this.isStart() && !r ? so : "") + ym;
      else {
        let c =
          this.type === "!"
            ? "))" + (this.isStart() && !r && !t ? so : "") + _m + ")"
            : this.type === "@"
              ? ")"
              : this.type === "?"
                ? ")?"
                : this.type === "+" && s
                  ? ")"
                  : this.type === "*" && s
                    ? ")?"
                    : `)${this.type}`;
        a = n + o + c;
      }
      return [a, dt(o), (this.#r = !!this.#r), this.#o];
    }
    #f(t) {
      return this.#i
        .map((r) => {
          if (typeof r == "string") throw new Error("string type in extglob ast??");
          let [i, n, o, s] = r.toRegExpSource(t);
          return (this.#o = this.#o || s), i;
        })
        .filter((r) => !(this.isStart() && this.isEnd()) || !!r)
        .join("|");
    }
    static #w(t, r, i = !1) {
      let n = !1,
        o = "",
        s = !1;
      for (let a = 0; a < t.length; a++) {
        let c = t.charAt(a);
        if (n) {
          (n = !1), (o += (Vx.has(c) ? "\\" : "") + c);
          continue;
        }
        if (c === "\\") {
          a === t.length - 1 ? (o += "\\\\") : (n = !0);
          continue;
        }
        if (c === "[") {
          let [u, l, h, f] = gm(t, a);
          if (h) {
            (o += u), (s = s || l), (a += h - 1), (r = r || f);
            continue;
          }
        }
        if (c === "*") {
          (o += i && t === "*" ? ym : _m), (r = !0);
          continue;
        }
        if (c === "?") {
          (o += ac), (r = !0);
          continue;
        }
        o += Wx(c);
      }
      return [o, dt(t), !!r, s];
    }
  };
var Nr = (e, {windowsPathsNoEscape: t = !1, magicalBraces: r = !1} = {}) =>
  r
    ? t
      ? e.replace(/[?*()[\]{}]/g, "[$&]")
      : e.replace(/[?*()[\]\\{}]/g, "\\$&")
    : t
      ? e.replace(/[?*()[\]]/g, "[$&]")
      : e.replace(/[?*()[\]\\]/g, "\\$&");
var je = (e, t, r = {}) => (
    Mn(t), !r.nocomment && t.charAt(0) === "#" ? !1 : new Je(t, r).match(e)
  ),
  Jx = /^\*+([^+@!?\*\[\(]*)$/,
  Kx = (e) => (t) => !t.startsWith(".") && t.endsWith(e),
  Gx = (e) => (t) => t.endsWith(e),
  Hx = (e) => (
    (e = e.toLowerCase()), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(e)
  ),
  Yx = (e) => ((e = e.toLowerCase()), (t) => t.toLowerCase().endsWith(e)),
  Xx = /^\*+\.\*+$/,
  Qx = (e) => !e.startsWith(".") && e.includes("."),
  eS = (e) => e !== "." && e !== ".." && e.includes("."),
  tS = /^\.\*+$/,
  rS = (e) => e !== "." && e !== ".." && e.startsWith("."),
  nS = /^\*+$/,
  iS = (e) => e.length !== 0 && !e.startsWith("."),
  oS = (e) => e.length !== 0 && e !== "." && e !== "..",
  sS = /^\?+([^+@!?\*\[\(]*)?$/,
  aS = ([e, t = ""]) => {
    let r = xm([e]);
    return t ? ((t = t.toLowerCase()), (i) => r(i) && i.toLowerCase().endsWith(t)) : r;
  },
  cS = ([e, t = ""]) => {
    let r = Sm([e]);
    return t ? ((t = t.toLowerCase()), (i) => r(i) && i.toLowerCase().endsWith(t)) : r;
  },
  uS = ([e, t = ""]) => {
    let r = Sm([e]);
    return t ? (i) => r(i) && i.endsWith(t) : r;
  },
  lS = ([e, t = ""]) => {
    let r = xm([e]);
    return t ? (i) => r(i) && i.endsWith(t) : r;
  },
  xm = ([e]) => {
    let t = e.length;
    return (r) => r.length === t && !r.startsWith(".");
  },
  Sm = ([e]) => {
    let t = e.length;
    return (r) => r.length === t && r !== "." && r !== "..";
  },
  $m =
    typeof process == "object" && process
      ? (typeof process.env == "object" &&
          process.env &&
          process.env.__MINIMATCH_TESTING_PLATFORM__) ||
        process.platform
      : "posix",
  bm = {win32: {sep: "\\"}, posix: {sep: "/"}},
  hS = $m === "win32" ? bm.win32.sep : bm.posix.sep;
je.sep = hS;
var Ee = Symbol("globstar **");
je.GLOBSTAR = Ee;
var dS = "[^/]",
  fS = dS + "*?",
  pS = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
  mS = "(?:(?!(?:\\/|^)\\.).)*?",
  gS =
    (e, t = {}) =>
    (r) =>
      je(r, e, t);
je.filter = gS;
var Qe = (e, t = {}) => Object.assign({}, e, t),
  vS = (e) => {
    if (!e || typeof e != "object" || !Object.keys(e).length) return je;
    let t = je;
    return Object.assign((i, n, o = {}) => t(i, n, Qe(e, o)), {
      Minimatch: class extends t.Minimatch {
        constructor(n, o = {}) {
          super(n, Qe(e, o));
        }
        static defaults(n) {
          return t.defaults(Qe(e, n)).Minimatch;
        }
      },
      AST: class extends t.AST {
        constructor(n, o, s = {}) {
          super(n, o, Qe(e, s));
        }
        static fromGlob(n, o = {}) {
          return t.AST.fromGlob(n, Qe(e, o));
        }
      },
      unescape: (i, n = {}) => t.unescape(i, Qe(e, n)),
      escape: (i, n = {}) => t.escape(i, Qe(e, n)),
      filter: (i, n = {}) => t.filter(i, Qe(e, n)),
      defaults: (i) => t.defaults(Qe(e, i)),
      makeRe: (i, n = {}) => t.makeRe(i, Qe(e, n)),
      braceExpand: (i, n = {}) => t.braceExpand(i, Qe(e, n)),
      match: (i, n, o = {}) => t.match(i, n, Qe(e, o)),
      sep: t.sep,
      GLOBSTAR: Ee,
    });
  };
je.defaults = vS;
var Em = (e, t = {}) => (Mn(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : pm(e));
je.braceExpand = Em;
var _S = (e, t = {}) => new Je(e, t).makeRe();
je.makeRe = _S;
var yS = (e, t, r = {}) => {
  let i = new Je(t, r);
  return (
    (e = e.filter((n) => i.match(n))), i.options.nonull && !e.length && e.push(t), e
  );
};
je.match = yS;
var wm = /[?*]|[+@!]\(.*?\)|\[|\]/,
  bS = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
  Je = class {
    options;
    set;
    pattern;
    windowsPathsNoEscape;
    nonegate;
    negate;
    comment;
    empty;
    preserveMultipleSlashes;
    partial;
    globSet;
    globParts;
    nocase;
    isWindows;
    platform;
    windowsNoMagicRoot;
    regexp;
    constructor(t, r = {}) {
      Mn(t),
        (r = r || {}),
        (this.options = r),
        (this.pattern = t),
        (this.platform = r.platform || $m),
        (this.isWindows = this.platform === "win32"),
        (this.windowsPathsNoEscape =
          !!r.windowsPathsNoEscape || r.allowWindowsEscape === !1),
        this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")),
        (this.preserveMultipleSlashes = !!r.preserveMultipleSlashes),
        (this.regexp = null),
        (this.negate = !1),
        (this.nonegate = !!r.nonegate),
        (this.comment = !1),
        (this.empty = !1),
        (this.partial = !!r.partial),
        (this.nocase = !!this.options.nocase),
        (this.windowsNoMagicRoot =
          r.windowsNoMagicRoot !== void 0
            ? r.windowsNoMagicRoot
            : !!(this.isWindows && this.nocase)),
        (this.globSet = []),
        (this.globParts = []),
        (this.set = []),
        this.make();
    }
    hasMagic() {
      if (this.options.magicalBraces && this.set.length > 1) return !0;
      for (let t of this.set) for (let r of t) if (typeof r != "string") return !0;
      return !1;
    }
    debug(...t) {}
    make() {
      let t = this.pattern,
        r = this.options;
      if (!r.nocomment && t.charAt(0) === "#") {
        this.comment = !0;
        return;
      }
      if (!t) {
        this.empty = !0;
        return;
      }
      this.parseNegate(),
        (this.globSet = [...new Set(this.braceExpand())]),
        r.debug && (this.debug = (...o) => console.error(...o)),
        this.debug(this.pattern, this.globSet);
      let i = this.globSet.map((o) => this.slashSplit(o));
      (this.globParts = this.preprocess(i)), this.debug(this.pattern, this.globParts);
      let n = this.globParts.map((o, s, a) => {
        if (this.isWindows && this.windowsNoMagicRoot) {
          let c =
              o[0] === "" &&
              o[1] === "" &&
              (o[2] === "?" || !wm.test(o[2])) &&
              !wm.test(o[3]),
            u = /^[a-z]:/i.test(o[0]);
          if (c) return [...o.slice(0, 4), ...o.slice(4).map((l) => this.parse(l))];
          if (u) return [o[0], ...o.slice(1).map((l) => this.parse(l))];
        }
        return o.map((c) => this.parse(c));
      });
      if (
        (this.debug(this.pattern, n),
        (this.set = n.filter((o) => o.indexOf(!1) === -1)),
        this.isWindows)
      )
        for (let o = 0; o < this.set.length; o++) {
          let s = this.set[o];
          s[0] === "" &&
            s[1] === "" &&
            this.globParts[o][2] === "?" &&
            typeof s[3] == "string" &&
            /^[a-z]:$/i.test(s[3]) &&
            (s[2] = "?");
        }
      this.debug(this.pattern, this.set);
    }
    preprocess(t) {
      if (this.options.noglobstar)
        for (let i = 0; i < t.length; i++)
          for (let n = 0; n < t[i].length; n++) t[i][n] === "**" && (t[i][n] = "*");
      let {optimizationLevel: r = 1} = this.options;
      return (
        r >= 2
          ? ((t = this.firstPhasePreProcess(t)), (t = this.secondPhasePreProcess(t)))
          : r >= 1
            ? (t = this.levelOneOptimize(t))
            : (t = this.adjascentGlobstarOptimize(t)),
        t
      );
    }
    adjascentGlobstarOptimize(t) {
      return t.map((r) => {
        let i = -1;
        for (; (i = r.indexOf("**", i + 1)) !== -1; ) {
          let n = i;
          for (; r[n + 1] === "**"; ) n++;
          n !== i && r.splice(i, n - i);
        }
        return r;
      });
    }
    levelOneOptimize(t) {
      return t.map(
        (r) => (
          (r = r.reduce((i, n) => {
            let o = i[i.length - 1];
            return n === "**" && o === "**"
              ? i
              : n === ".." && o && o !== ".." && o !== "." && o !== "**"
                ? (i.pop(), i)
                : (i.push(n), i);
          }, [])),
          r.length === 0 ? [""] : r
        ),
      );
    }
    levelTwoFileOptimize(t) {
      Array.isArray(t) || (t = this.slashSplit(t));
      let r = !1;
      do {
        if (((r = !1), !this.preserveMultipleSlashes)) {
          for (let n = 1; n < t.length - 1; n++) {
            let o = t[n];
            (n === 1 && o === "" && t[0] === "") ||
              ((o === "." || o === "") && ((r = !0), t.splice(n, 1), n--));
          }
          t[0] === "." &&
            t.length === 2 &&
            (t[1] === "." || t[1] === "") &&
            ((r = !0), t.pop());
        }
        let i = 0;
        for (; (i = t.indexOf("..", i + 1)) !== -1; ) {
          let n = t[i - 1];
          n &&
            n !== "." &&
            n !== ".." &&
            n !== "**" &&
            ((r = !0), t.splice(i - 1, 2), (i -= 2));
        }
      } while (r);
      return t.length === 0 ? [""] : t;
    }
    firstPhasePreProcess(t) {
      let r = !1;
      do {
        r = !1;
        for (let i of t) {
          let n = -1;
          for (; (n = i.indexOf("**", n + 1)) !== -1; ) {
            let s = n;
            for (; i[s + 1] === "**"; ) s++;
            s > n && i.splice(n + 1, s - n);
            let a = i[n + 1],
              c = i[n + 2],
              u = i[n + 3];
            if (
              a !== ".." ||
              !c ||
              c === "." ||
              c === ".." ||
              !u ||
              u === "." ||
              u === ".."
            )
              continue;
            (r = !0), i.splice(n, 1);
            let l = i.slice(0);
            (l[n] = "**"), t.push(l), n--;
          }
          if (!this.preserveMultipleSlashes) {
            for (let s = 1; s < i.length - 1; s++) {
              let a = i[s];
              (s === 1 && a === "" && i[0] === "") ||
                ((a === "." || a === "") && ((r = !0), i.splice(s, 1), s--));
            }
            i[0] === "." &&
              i.length === 2 &&
              (i[1] === "." || i[1] === "") &&
              ((r = !0), i.pop());
          }
          let o = 0;
          for (; (o = i.indexOf("..", o + 1)) !== -1; ) {
            let s = i[o - 1];
            if (s && s !== "." && s !== ".." && s !== "**") {
              r = !0;
              let c = o === 1 && i[o + 1] === "**" ? ["."] : [];
              i.splice(o - 1, 2, ...c), i.length === 0 && i.push(""), (o -= 2);
            }
          }
        }
      } while (r);
      return t;
    }
    secondPhasePreProcess(t) {
      for (let r = 0; r < t.length - 1; r++)
        for (let i = r + 1; i < t.length; i++) {
          let n = this.partsMatch(t[r], t[i], !this.preserveMultipleSlashes);
          if (n) {
            (t[r] = []), (t[i] = n);
            break;
          }
        }
      return t.filter((r) => r.length);
    }
    partsMatch(t, r, i = !1) {
      let n = 0,
        o = 0,
        s = [],
        a = "";
      for (; n < t.length && o < r.length; )
        if (t[n] === r[o]) s.push(a === "b" ? r[o] : t[n]), n++, o++;
        else if (i && t[n] === "**" && r[o] === t[n + 1]) s.push(t[n]), n++;
        else if (i && r[o] === "**" && t[n] === r[o + 1]) s.push(r[o]), o++;
        else if (
          t[n] === "*" &&
          r[o] &&
          (this.options.dot || !r[o].startsWith(".")) &&
          r[o] !== "**"
        ) {
          if (a === "b") return !1;
          (a = "a"), s.push(t[n]), n++, o++;
        } else if (
          r[o] === "*" &&
          t[n] &&
          (this.options.dot || !t[n].startsWith(".")) &&
          t[n] !== "**"
        ) {
          if (a === "a") return !1;
          (a = "b"), s.push(r[o]), n++, o++;
        } else return !1;
      return t.length === r.length && s;
    }
    parseNegate() {
      if (this.nonegate) return;
      let t = this.pattern,
        r = !1,
        i = 0;
      for (let n = 0; n < t.length && t.charAt(n) === "!"; n++) (r = !r), i++;
      i && (this.pattern = t.slice(i)), (this.negate = r);
    }
    matchOne(t, r, i = !1) {
      let n = this.options;
      if (this.isWindows) {
        let m = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]),
          v =
            !m && t[0] === "" && t[1] === "" && t[2] === "?" && /^[a-z]:$/i.test(t[3]),
          w = typeof r[0] == "string" && /^[a-z]:$/i.test(r[0]),
          $ =
            !w &&
            r[0] === "" &&
            r[1] === "" &&
            r[2] === "?" &&
            typeof r[3] == "string" &&
            /^[a-z]:$/i.test(r[3]),
          b = v ? 3 : m ? 0 : void 0,
          x = $ ? 3 : w ? 0 : void 0;
        if (typeof b == "number" && typeof x == "number") {
          let [D, _] = [t[b], r[x]];
          D.toLowerCase() === _.toLowerCase() &&
            ((r[x] = D), x > b ? (r = r.slice(x)) : b > x && (t = t.slice(b)));
        }
      }
      let {optimizationLevel: o = 1} = this.options;
      o >= 2 && (t = this.levelTwoFileOptimize(t)),
        this.debug("matchOne", this, {file: t, pattern: r}),
        this.debug("matchOne", t.length, r.length);
      for (var s = 0, a = 0, c = t.length, u = r.length; s < c && a < u; s++, a++) {
        this.debug("matchOne loop");
        var l = r[a],
          h = t[s];
        if ((this.debug(r, l, h), l === !1)) return !1;
        if (l === Ee) {
          this.debug("GLOBSTAR", [r, l, h]);
          var f = s,
            d = a + 1;
          if (d === u) {
            for (this.debug("** at the end"); s < c; s++)
              if (t[s] === "." || t[s] === ".." || (!n.dot && t[s].charAt(0) === "."))
                return !1;
            return !0;
          }
          for (; f < c; ) {
            var p = t[f];
            if (
              (this.debug(
                `
globstar while`,
                t,
                f,
                r,
                d,
                p,
              ),
              this.matchOne(t.slice(f), r.slice(d), i))
            )
              return this.debug("globstar found match!", f, c, p), !0;
            if (p === "." || p === ".." || (!n.dot && p.charAt(0) === ".")) {
              this.debug("dot detected!", t, f, r, d);
              break;
            }
            this.debug("globstar swallow a segment, and continue"), f++;
          }
          return !!(
            i &&
            (this.debug(
              `
>>> no match, partial?`,
              t,
              f,
              r,
              d,
            ),
            f === c)
          );
        }
        let m;
        if (
          (typeof l == "string"
            ? ((m = h === l), this.debug("string match", l, h, m))
            : ((m = l.test(h)), this.debug("pattern match", l, h, m)),
          !m)
        )
          return !1;
      }
      if (s === c && a === u) return !0;
      if (s === c) return i;
      if (a === u) return s === c - 1 && t[s] === "";
      throw new Error("wtf?");
    }
    braceExpand() {
      return Em(this.pattern, this.options);
    }
    parse(t) {
      Mn(t);
      let r = this.options;
      if (t === "**") return Ee;
      if (t === "") return "";
      let i,
        n = null;
      (i = t.match(nS))
        ? (n = r.dot ? oS : iS)
        : (i = t.match(Jx))
          ? (n = (r.nocase ? (r.dot ? Yx : Hx) : r.dot ? Gx : Kx)(i[1]))
          : (i = t.match(sS))
            ? (n = (r.nocase ? (r.dot ? cS : aS) : r.dot ? uS : lS)(i))
            : (i = t.match(Xx))
              ? (n = r.dot ? eS : Qx)
              : (i = t.match(tS)) && (n = rS);
      let o = Pr.fromGlob(t, this.options).toMMPattern();
      return (
        n && typeof o == "object" && Reflect.defineProperty(o, "test", {value: n}), o
      );
    }
    makeRe() {
      if (this.regexp || this.regexp === !1) return this.regexp;
      let t = this.set;
      if (!t.length) return (this.regexp = !1), this.regexp;
      let r = this.options,
        i = r.noglobstar ? fS : r.dot ? pS : mS,
        n = new Set(r.nocase ? ["i"] : []),
        o = t
          .map((c) => {
            let u = c.map((h) => {
              if (h instanceof RegExp) for (let f of h.flags.split("")) n.add(f);
              return typeof h == "string" ? bS(h) : h === Ee ? Ee : h._src;
            });
            u.forEach((h, f) => {
              let d = u[f + 1],
                p = u[f - 1];
              h !== Ee ||
                p === Ee ||
                (p === void 0
                  ? d !== void 0 && d !== Ee
                    ? (u[f + 1] = "(?:\\/|" + i + "\\/)?" + d)
                    : (u[f] = i)
                  : d === void 0
                    ? (u[f - 1] = p + "(?:\\/|\\/" + i + ")?")
                    : d !== Ee &&
                      ((u[f - 1] = p + "(?:\\/|\\/" + i + "\\/)" + d),
                      (u[f + 1] = Ee)));
            });
            let l = u.filter((h) => h !== Ee);
            if (this.partial && l.length >= 1) {
              let h = [];
              for (let f = 1; f <= l.length; f++) h.push(l.slice(0, f).join("/"));
              return "(?:" + h.join("|") + ")";
            }
            return l.join("/");
          })
          .join("|"),
        [s, a] = t.length > 1 ? ["(?:", ")"] : ["", ""];
      (o = "^" + s + o + a + "$"),
        this.partial && (o = "^(?:\\/|" + s + o.slice(1, -1) + a + ")$"),
        this.negate && (o = "^(?!" + o + ").+$");
      try {
        this.regexp = new RegExp(o, [...n].join(""));
      } catch {
        this.regexp = !1;
      }
      return this.regexp;
    }
    slashSplit(t) {
      return this.preserveMultipleSlashes
        ? t.split("/")
        : this.isWindows && /^\/\/[^\/]+/.test(t)
          ? ["", ...t.split(/\/+/)]
          : t.split(/\/+/);
    }
    match(t, r = this.partial) {
      if ((this.debug("match", t, this.pattern), this.comment)) return !1;
      if (this.empty) return t === "";
      if (t === "/" && r) return !0;
      let i = this.options;
      this.isWindows && (t = t.split("\\").join("/"));
      let n = this.slashSplit(t);
      this.debug(this.pattern, "split", n);
      let o = this.set;
      this.debug(this.pattern, "set", o);
      let s = n[n.length - 1];
      if (!s) for (let a = n.length - 2; !s && a >= 0; a--) s = n[a];
      for (let a = 0; a < o.length; a++) {
        let c = o[a],
          u = n;
        if ((i.matchBase && c.length === 1 && (u = [s]), this.matchOne(u, c, r)))
          return i.flipNegate ? !0 : !this.negate;
      }
      return i.flipNegate ? !1 : this.negate;
    }
    static defaults(t) {
      return je.defaults(t).Minimatch;
    }
  };
je.AST = Pr;
je.Minimatch = Je;
je.escape = Nr;
je.unescape = dt;
var Gm = require("node:url");
var wS =
    typeof performance == "object" &&
    performance &&
    typeof performance.now == "function"
      ? performance
      : Date,
  Am = new Set(),
  cc = typeof process == "object" && process ? process : {},
  Im = (e, t, r, i) => {
    typeof cc.emitWarning == "function"
      ? cc.emitWarning(e, t, r, i)
      : console.error(`[${r}] ${t}: ${e}`);
  },
  ao = globalThis.AbortController,
  km = globalThis.AbortSignal;
if (typeof ao > "u") {
  (km = class {
    onabort;
    _onabort = [];
    reason;
    aborted = !1;
    addEventListener(i, n) {
      this._onabort.push(n);
    }
  }),
    (ao = class {
      constructor() {
        t();
      }
      signal = new km();
      abort(i) {
        if (!this.signal.aborted) {
          (this.signal.reason = i), (this.signal.aborted = !0);
          for (let n of this.signal._onabort) n(i);
          this.signal.onabort?.(i);
        }
      }
    });
  let e = cc.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1",
    t = () => {
      e &&
        ((e = !1),
        Im(
          "AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.",
          "NO_ABORT_CONTROLLER",
          "ENOTSUP",
          t,
        ));
    };
}
var xS = (e) => !Am.has(e);
var Zt = (e) => e && e === Math.floor(e) && e > 0 && isFinite(e),
  Om = (e) =>
    Zt(e)
      ? e <= Math.pow(2, 8)
        ? Uint8Array
        : e <= Math.pow(2, 16)
          ? Uint16Array
          : e <= Math.pow(2, 32)
            ? Uint32Array
            : e <= Number.MAX_SAFE_INTEGER
              ? Rr
              : null
      : null,
  Rr = class extends Array {
    constructor(t) {
      super(t), this.fill(0);
    }
  },
  uc = class e {
    heap;
    length;
    static #e = !1;
    static create(t) {
      let r = Om(t);
      if (!r) return [];
      e.#e = !0;
      let i = new e(t, r);
      return (e.#e = !1), i;
    }
    constructor(t, r) {
      if (!e.#e) throw new TypeError("instantiate Stack using Stack.create(n)");
      (this.heap = new r(t)), (this.length = 0);
    }
    push(t) {
      this.heap[this.length++] = t;
    }
    pop() {
      return this.heap[--this.length];
    }
  },
  cr = class e {
    #e;
    #r;
    #o;
    #i;
    #s;
    #b;
    #v;
    #l;
    get perf() {
      return this.#l;
    }
    ttl;
    ttlResolution;
    ttlAutopurge;
    updateAgeOnGet;
    updateAgeOnHas;
    allowStale;
    noDisposeOnSet;
    noUpdateTTL;
    maxEntrySize;
    sizeCalculation;
    noDeleteOnFetchRejection;
    noDeleteOnStaleGet;
    allowStaleOnFetchAbort;
    allowStaleOnFetchRejection;
    ignoreFetchAbort;
    #a;
    #d;
    #h;
    #c;
    #n;
    #f;
    #w;
    #y;
    #p;
    #I;
    #m;
    #$;
    #E;
    #g;
    #_;
    #x;
    #k;
    #t;
    #R;
    static unsafeExposeInternals(t) {
      return {
        starts: t.#E,
        ttls: t.#g,
        autopurgeTimers: t.#_,
        sizes: t.#$,
        keyMap: t.#h,
        keyList: t.#c,
        valList: t.#n,
        next: t.#f,
        prev: t.#w,
        get head() {
          return t.#y;
        },
        get tail() {
          return t.#p;
        },
        free: t.#I,
        isBackgroundFetch: (r) => t.#u(r),
        backgroundFetch: (r, i, n, o) => t.#B(r, i, n, o),
        moveToTail: (r) => t.#z(r),
        indexes: (r) => t.#T(r),
        rindexes: (r) => t.#j(r),
        isStale: (r) => t.#S(r),
      };
    }
    get max() {
      return this.#e;
    }
    get maxSize() {
      return this.#r;
    }
    get calculatedSize() {
      return this.#d;
    }
    get size() {
      return this.#a;
    }
    get fetchMethod() {
      return this.#b;
    }
    get memoMethod() {
      return this.#v;
    }
    get dispose() {
      return this.#o;
    }
    get onInsert() {
      return this.#i;
    }
    get disposeAfter() {
      return this.#s;
    }
    constructor(t) {
      let {
        max: r = 0,
        ttl: i,
        ttlResolution: n = 1,
        ttlAutopurge: o,
        updateAgeOnGet: s,
        updateAgeOnHas: a,
        allowStale: c,
        dispose: u,
        onInsert: l,
        disposeAfter: h,
        noDisposeOnSet: f,
        noUpdateTTL: d,
        maxSize: p = 0,
        maxEntrySize: m = 0,
        sizeCalculation: v,
        fetchMethod: w,
        memoMethod: $,
        noDeleteOnFetchRejection: b,
        noDeleteOnStaleGet: x,
        allowStaleOnFetchRejection: D,
        allowStaleOnFetchAbort: _,
        ignoreFetchAbort: S,
        perf: U,
      } = t;
      if (U !== void 0 && typeof U?.now != "function")
        throw new TypeError("perf option must have a now() method if specified");
      if (((this.#l = U ?? wS), r !== 0 && !Zt(r)))
        throw new TypeError("max option must be a nonnegative integer");
      let I = r ? Om(r) : Array;
      if (!I) throw new Error("invalid max value: " + r);
      if (
        ((this.#e = r),
        (this.#r = p),
        (this.maxEntrySize = m || this.#r),
        (this.sizeCalculation = v),
        this.sizeCalculation)
      ) {
        if (!this.#r && !this.maxEntrySize)
          throw new TypeError(
            "cannot set sizeCalculation without setting maxSize or maxEntrySize",
          );
        if (typeof this.sizeCalculation != "function")
          throw new TypeError("sizeCalculation set to non-function");
      }
      if ($ !== void 0 && typeof $ != "function")
        throw new TypeError("memoMethod must be a function if defined");
      if (((this.#v = $), w !== void 0 && typeof w != "function"))
        throw new TypeError("fetchMethod must be a function if specified");
      if (
        ((this.#b = w),
        (this.#k = !!w),
        (this.#h = new Map()),
        (this.#c = new Array(r).fill(void 0)),
        (this.#n = new Array(r).fill(void 0)),
        (this.#f = new I(r)),
        (this.#w = new I(r)),
        (this.#y = 0),
        (this.#p = 0),
        (this.#I = uc.create(r)),
        (this.#a = 0),
        (this.#d = 0),
        typeof u == "function" && (this.#o = u),
        typeof l == "function" && (this.#i = l),
        typeof h == "function"
          ? ((this.#s = h), (this.#m = []))
          : ((this.#s = void 0), (this.#m = void 0)),
        (this.#x = !!this.#o),
        (this.#R = !!this.#i),
        (this.#t = !!this.#s),
        (this.noDisposeOnSet = !!f),
        (this.noUpdateTTL = !!d),
        (this.noDeleteOnFetchRejection = !!b),
        (this.allowStaleOnFetchRejection = !!D),
        (this.allowStaleOnFetchAbort = !!_),
        (this.ignoreFetchAbort = !!S),
        this.maxEntrySize !== 0)
      ) {
        if (this.#r !== 0 && !Zt(this.#r))
          throw new TypeError("maxSize must be a positive integer if specified");
        if (!Zt(this.maxEntrySize))
          throw new TypeError("maxEntrySize must be a positive integer if specified");
        this.#q();
      }
      if (
        ((this.allowStale = !!c),
        (this.noDeleteOnStaleGet = !!x),
        (this.updateAgeOnGet = !!s),
        (this.updateAgeOnHas = !!a),
        (this.ttlResolution = Zt(n) || n === 0 ? n : 1),
        (this.ttlAutopurge = !!o),
        (this.ttl = i || 0),
        this.ttl)
      ) {
        if (!Zt(this.ttl))
          throw new TypeError("ttl must be a positive integer if specified");
        this.#P();
      }
      if (this.#e === 0 && this.ttl === 0 && this.#r === 0)
        throw new TypeError("At least one of max, maxSize, or ttl is required");
      if (!this.ttlAutopurge && !this.#e && !this.#r) {
        let L = "LRU_CACHE_UNBOUNDED";
        xS(L) &&
          (Am.add(L),
          Im(
            "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
            "UnboundedCacheWarning",
            L,
            e,
          ));
      }
    }
    getRemainingTTL(t) {
      return this.#h.has(t) ? 1 / 0 : 0;
    }
    #P() {
      let t = new Rr(this.#e),
        r = new Rr(this.#e);
      (this.#g = t), (this.#E = r);
      let i = this.ttlAutopurge ? new Array(this.#e) : void 0;
      (this.#_ = i),
        (this.#D = (s, a, c = this.#l.now()) => {
          if (
            ((r[s] = a !== 0 ? c : 0),
            (t[s] = a),
            i?.[s] && (clearTimeout(i[s]), (i[s] = void 0)),
            a !== 0 && i)
          ) {
            let u = setTimeout(() => {
              this.#S(s) && this.#O(this.#c[s], "expire");
            }, a + 1);
            u.unref && u.unref(), (i[s] = u);
          }
        }),
        (this.#A = (s) => {
          r[s] = t[s] !== 0 ? this.#l.now() : 0;
        }),
        (this.#N = (s, a) => {
          if (t[a]) {
            let c = t[a],
              u = r[a];
            if (!c || !u) return;
            (s.ttl = c), (s.start = u), (s.now = n || o());
            let l = s.now - u;
            s.remainingTTL = c - l;
          }
        });
      let n = 0,
        o = () => {
          let s = this.#l.now();
          if (this.ttlResolution > 0) {
            n = s;
            let a = setTimeout(() => (n = 0), this.ttlResolution);
            a.unref && a.unref();
          }
          return s;
        };
      (this.getRemainingTTL = (s) => {
        let a = this.#h.get(s);
        if (a === void 0) return 0;
        let c = t[a],
          u = r[a];
        if (!c || !u) return 1 / 0;
        let l = (n || o()) - u;
        return c - l;
      }),
        (this.#S = (s) => {
          let a = r[s],
            c = t[s];
          return !!c && !!a && (n || o()) - a > c;
        });
    }
    #A = () => {};
    #N = () => {};
    #D = () => {};
    #S = () => !1;
    #q() {
      let t = new Rr(this.#e);
      (this.#d = 0),
        (this.#$ = t),
        (this.#U = (r) => {
          (this.#d -= t[r]), (t[r] = 0);
        }),
        (this.#L = (r, i, n, o) => {
          if (this.#u(i)) return 0;
          if (!Zt(n))
            if (o) {
              if (typeof o != "function")
                throw new TypeError("sizeCalculation must be a function");
              if (((n = o(i, r)), !Zt(n)))
                throw new TypeError(
                  "sizeCalculation return invalid (expect positive integer)",
                );
            } else
              throw new TypeError(
                "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.",
              );
          return n;
        }),
        (this.#C = (r, i, n) => {
          if (((t[r] = i), this.#r)) {
            let o = this.#r - t[r];
            for (; this.#d > o; ) this.#M(!0);
          }
          (this.#d += t[r]),
            n && ((n.entrySize = i), (n.totalCalculatedSize = this.#d));
        });
    }
    #U = (t) => {};
    #C = (t, r, i) => {};
    #L = (t, r, i, n) => {
      if (i || n)
        throw new TypeError(
          "cannot set size without setting maxSize or maxEntrySize on cache",
        );
      return 0;
    };
    *#T({allowStale: t = this.allowStale} = {}) {
      if (this.#a)
        for (
          let r = this.#p;
          !(!this.#F(r) || ((t || !this.#S(r)) && (yield r), r === this.#y));
        )
          r = this.#w[r];
    }
    *#j({allowStale: t = this.allowStale} = {}) {
      if (this.#a)
        for (
          let r = this.#y;
          !(!this.#F(r) || ((t || !this.#S(r)) && (yield r), r === this.#p));
        )
          r = this.#f[r];
    }
    #F(t) {
      return t !== void 0 && this.#h.get(this.#c[t]) === t;
    }
    *entries() {
      for (let t of this.#T())
        this.#n[t] !== void 0 &&
          this.#c[t] !== void 0 &&
          !this.#u(this.#n[t]) &&
          (yield [this.#c[t], this.#n[t]]);
    }
    *rentries() {
      for (let t of this.#j())
        this.#n[t] !== void 0 &&
          this.#c[t] !== void 0 &&
          !this.#u(this.#n[t]) &&
          (yield [this.#c[t], this.#n[t]]);
    }
    *keys() {
      for (let t of this.#T()) {
        let r = this.#c[t];
        r !== void 0 && !this.#u(this.#n[t]) && (yield r);
      }
    }
    *rkeys() {
      for (let t of this.#j()) {
        let r = this.#c[t];
        r !== void 0 && !this.#u(this.#n[t]) && (yield r);
      }
    }
    *values() {
      for (let t of this.#T())
        this.#n[t] !== void 0 && !this.#u(this.#n[t]) && (yield this.#n[t]);
    }
    *rvalues() {
      for (let t of this.#j())
        this.#n[t] !== void 0 && !this.#u(this.#n[t]) && (yield this.#n[t]);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    [Symbol.toStringTag] = "LRUCache";
    find(t, r = {}) {
      for (let i of this.#T()) {
        let n = this.#n[i],
          o = this.#u(n) ? n.__staleWhileFetching : n;
        if (o !== void 0 && t(o, this.#c[i], this)) return this.get(this.#c[i], r);
      }
    }
    forEach(t, r = this) {
      for (let i of this.#T()) {
        let n = this.#n[i],
          o = this.#u(n) ? n.__staleWhileFetching : n;
        o !== void 0 && t.call(r, o, this.#c[i], this);
      }
    }
    rforEach(t, r = this) {
      for (let i of this.#j()) {
        let n = this.#n[i],
          o = this.#u(n) ? n.__staleWhileFetching : n;
        o !== void 0 && t.call(r, o, this.#c[i], this);
      }
    }
    purgeStale() {
      let t = !1;
      for (let r of this.#j({allowStale: !0}))
        this.#S(r) && (this.#O(this.#c[r], "expire"), (t = !0));
      return t;
    }
    info(t) {
      let r = this.#h.get(t);
      if (r === void 0) return;
      let i = this.#n[r],
        n = this.#u(i) ? i.__staleWhileFetching : i;
      if (n === void 0) return;
      let o = {value: n};
      if (this.#g && this.#E) {
        let s = this.#g[r],
          a = this.#E[r];
        if (s && a) {
          let c = s - (this.#l.now() - a);
          (o.ttl = c), (o.start = Date.now());
        }
      }
      return this.#$ && (o.size = this.#$[r]), o;
    }
    dump() {
      let t = [];
      for (let r of this.#T({allowStale: !0})) {
        let i = this.#c[r],
          n = this.#n[r],
          o = this.#u(n) ? n.__staleWhileFetching : n;
        if (o === void 0 || i === void 0) continue;
        let s = {value: o};
        if (this.#g && this.#E) {
          s.ttl = this.#g[r];
          let a = this.#l.now() - this.#E[r];
          s.start = Math.floor(Date.now() - a);
        }
        this.#$ && (s.size = this.#$[r]), t.unshift([i, s]);
      }
      return t;
    }
    load(t) {
      this.clear();
      for (let [r, i] of t) {
        if (i.start) {
          let n = Date.now() - i.start;
          i.start = this.#l.now() - n;
        }
        this.set(r, i.value, i);
      }
    }
    set(t, r, i = {}) {
      if (r === void 0) return this.delete(t), this;
      let {
          ttl: n = this.ttl,
          start: o,
          noDisposeOnSet: s = this.noDisposeOnSet,
          sizeCalculation: a = this.sizeCalculation,
          status: c,
        } = i,
        {noUpdateTTL: u = this.noUpdateTTL} = i,
        l = this.#L(t, r, i.size || 0, a);
      if (this.maxEntrySize && l > this.maxEntrySize)
        return (
          c && ((c.set = "miss"), (c.maxEntrySizeExceeded = !0)),
          this.#O(t, "set"),
          this
        );
      let h = this.#a === 0 ? void 0 : this.#h.get(t);
      if (h === void 0)
        (h =
          this.#a === 0
            ? this.#p
            : this.#I.length !== 0
              ? this.#I.pop()
              : this.#a === this.#e
                ? this.#M(!1)
                : this.#a),
          (this.#c[h] = t),
          (this.#n[h] = r),
          this.#h.set(t, h),
          (this.#f[this.#p] = h),
          (this.#w[h] = this.#p),
          (this.#p = h),
          this.#a++,
          this.#C(h, l, c),
          c && (c.set = "add"),
          (u = !1),
          this.#R && this.#i?.(r, t, "add");
      else {
        this.#z(h);
        let f = this.#n[h];
        if (r !== f) {
          if (this.#k && this.#u(f)) {
            f.__abortController.abort(new Error("replaced"));
            let {__staleWhileFetching: d} = f;
            d !== void 0 &&
              !s &&
              (this.#x && this.#o?.(d, t, "set"),
              this.#t && this.#m?.push([d, t, "set"]));
          } else
            s ||
              (this.#x && this.#o?.(f, t, "set"),
              this.#t && this.#m?.push([f, t, "set"]));
          if ((this.#U(h), this.#C(h, l, c), (this.#n[h] = r), c)) {
            c.set = "replace";
            let d = f && this.#u(f) ? f.__staleWhileFetching : f;
            d !== void 0 && (c.oldValue = d);
          }
        } else c && (c.set = "update");
        this.#R && this.onInsert?.(r, t, r === f ? "update" : "replace");
      }
      if (
        (n !== 0 && !this.#g && this.#P(),
        this.#g && (u || this.#D(h, n, o), c && this.#N(c, h)),
        !s && this.#t && this.#m)
      ) {
        let f = this.#m,
          d;
        for (; (d = f?.shift()); ) this.#s?.(...d);
      }
      return this;
    }
    pop() {
      try {
        for (; this.#a; ) {
          let t = this.#n[this.#y];
          if ((this.#M(!0), this.#u(t))) {
            if (t.__staleWhileFetching) return t.__staleWhileFetching;
          } else if (t !== void 0) return t;
        }
      } finally {
        if (this.#t && this.#m) {
          let t = this.#m,
            r;
          for (; (r = t?.shift()); ) this.#s?.(...r);
        }
      }
    }
    #M(t) {
      let r = this.#y,
        i = this.#c[r],
        n = this.#n[r];
      return (
        this.#k && this.#u(n)
          ? n.__abortController.abort(new Error("evicted"))
          : (this.#x || this.#t) &&
            (this.#x && this.#o?.(n, i, "evict"),
            this.#t && this.#m?.push([n, i, "evict"])),
        this.#U(r),
        this.#_?.[r] && (clearTimeout(this.#_[r]), (this.#_[r] = void 0)),
        t && ((this.#c[r] = void 0), (this.#n[r] = void 0), this.#I.push(r)),
        this.#a === 1
          ? ((this.#y = this.#p = 0), (this.#I.length = 0))
          : (this.#y = this.#f[r]),
        this.#h.delete(i),
        this.#a--,
        r
      );
    }
    has(t, r = {}) {
      let {updateAgeOnHas: i = this.updateAgeOnHas, status: n} = r,
        o = this.#h.get(t);
      if (o !== void 0) {
        let s = this.#n[o];
        if (this.#u(s) && s.__staleWhileFetching === void 0) return !1;
        if (this.#S(o)) n && ((n.has = "stale"), this.#N(n, o));
        else return i && this.#A(o), n && ((n.has = "hit"), this.#N(n, o)), !0;
      } else n && (n.has = "miss");
      return !1;
    }
    peek(t, r = {}) {
      let {allowStale: i = this.allowStale} = r,
        n = this.#h.get(t);
      if (n === void 0 || (!i && this.#S(n))) return;
      let o = this.#n[n];
      return this.#u(o) ? o.__staleWhileFetching : o;
    }
    #B(t, r, i, n) {
      let o = r === void 0 ? void 0 : this.#n[r];
      if (this.#u(o)) return o;
      let s = new ao(),
        {signal: a} = i;
      a?.addEventListener("abort", () => s.abort(a.reason), {signal: s.signal});
      let c = {signal: s.signal, options: i, context: n},
        u = (m, v = !1) => {
          let {aborted: w} = s.signal,
            $ = i.ignoreFetchAbort && m !== void 0;
          if (
            (i.status &&
              (w && !v
                ? ((i.status.fetchAborted = !0),
                  (i.status.fetchError = s.signal.reason),
                  $ && (i.status.fetchAbortIgnored = !0))
                : (i.status.fetchResolved = !0)),
            w && !$ && !v)
          )
            return h(s.signal.reason);
          let b = d,
            x = this.#n[r];
          return (
            (x === d || ($ && v && x === void 0)) &&
              (m === void 0
                ? b.__staleWhileFetching !== void 0
                  ? (this.#n[r] = b.__staleWhileFetching)
                  : this.#O(t, "fetch")
                : (i.status && (i.status.fetchUpdated = !0),
                  this.set(t, m, c.options))),
            m
          );
        },
        l = (m) => (
          i.status && ((i.status.fetchRejected = !0), (i.status.fetchError = m)), h(m)
        ),
        h = (m) => {
          let {aborted: v} = s.signal,
            w = v && i.allowStaleOnFetchAbort,
            $ = w || i.allowStaleOnFetchRejection,
            b = $ || i.noDeleteOnFetchRejection,
            x = d;
          if (
            (this.#n[r] === d &&
              (!b || x.__staleWhileFetching === void 0
                ? this.#O(t, "fetch")
                : w || (this.#n[r] = x.__staleWhileFetching)),
            $)
          )
            return (
              i.status &&
                x.__staleWhileFetching !== void 0 &&
                (i.status.returnedStale = !0),
              x.__staleWhileFetching
            );
          if (x.__returned === x) throw m;
        },
        f = (m, v) => {
          let w = this.#b?.(t, o, c);
          w && w instanceof Promise && w.then(($) => m($ === void 0 ? void 0 : $), v),
            s.signal.addEventListener("abort", () => {
              (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) &&
                (m(void 0), i.allowStaleOnFetchAbort && (m = ($) => u($, !0)));
            });
        };
      i.status && (i.status.fetchDispatched = !0);
      let d = new Promise(f).then(u, l),
        p = Object.assign(d, {
          __abortController: s,
          __staleWhileFetching: o,
          __returned: void 0,
        });
      return (
        r === void 0
          ? (this.set(t, p, {...c.options, status: void 0}), (r = this.#h.get(t)))
          : (this.#n[r] = p),
        p
      );
    }
    #u(t) {
      if (!this.#k) return !1;
      let r = t;
      return (
        !!r &&
        r instanceof Promise &&
        r.hasOwnProperty("__staleWhileFetching") &&
        r.__abortController instanceof ao
      );
    }
    async fetch(t, r = {}) {
      let {
        allowStale: i = this.allowStale,
        updateAgeOnGet: n = this.updateAgeOnGet,
        noDeleteOnStaleGet: o = this.noDeleteOnStaleGet,
        ttl: s = this.ttl,
        noDisposeOnSet: a = this.noDisposeOnSet,
        size: c = 0,
        sizeCalculation: u = this.sizeCalculation,
        noUpdateTTL: l = this.noUpdateTTL,
        noDeleteOnFetchRejection: h = this.noDeleteOnFetchRejection,
        allowStaleOnFetchRejection: f = this.allowStaleOnFetchRejection,
        ignoreFetchAbort: d = this.ignoreFetchAbort,
        allowStaleOnFetchAbort: p = this.allowStaleOnFetchAbort,
        context: m,
        forceRefresh: v = !1,
        status: w,
        signal: $,
      } = r;
      if (!this.#k)
        return (
          w && (w.fetch = "get"),
          this.get(t, {
            allowStale: i,
            updateAgeOnGet: n,
            noDeleteOnStaleGet: o,
            status: w,
          })
        );
      let b = {
          allowStale: i,
          updateAgeOnGet: n,
          noDeleteOnStaleGet: o,
          ttl: s,
          noDisposeOnSet: a,
          size: c,
          sizeCalculation: u,
          noUpdateTTL: l,
          noDeleteOnFetchRejection: h,
          allowStaleOnFetchRejection: f,
          allowStaleOnFetchAbort: p,
          ignoreFetchAbort: d,
          status: w,
          signal: $,
        },
        x = this.#h.get(t);
      if (x === void 0) {
        w && (w.fetch = "miss");
        let D = this.#B(t, x, b, m);
        return (D.__returned = D);
      } else {
        let D = this.#n[x];
        if (this.#u(D)) {
          let L = i && D.__staleWhileFetching !== void 0;
          return (
            w && ((w.fetch = "inflight"), L && (w.returnedStale = !0)),
            L ? D.__staleWhileFetching : (D.__returned = D)
          );
        }
        let _ = this.#S(x);
        if (!v && !_)
          return (
            w && (w.fetch = "hit"), this.#z(x), n && this.#A(x), w && this.#N(w, x), D
          );
        let S = this.#B(t, x, b, m),
          I = S.__staleWhileFetching !== void 0 && i;
        return (
          w && ((w.fetch = _ ? "stale" : "refresh"), I && _ && (w.returnedStale = !0)),
          I ? S.__staleWhileFetching : (S.__returned = S)
        );
      }
    }
    async forceFetch(t, r = {}) {
      let i = await this.fetch(t, r);
      if (i === void 0) throw new Error("fetch() returned undefined");
      return i;
    }
    memo(t, r = {}) {
      let i = this.#v;
      if (!i) throw new Error("no memoMethod provided to constructor");
      let {context: n, forceRefresh: o, ...s} = r,
        a = this.get(t, s);
      if (!o && a !== void 0) return a;
      let c = i(t, a, {options: s, context: n});
      return this.set(t, c, s), c;
    }
    get(t, r = {}) {
      let {
          allowStale: i = this.allowStale,
          updateAgeOnGet: n = this.updateAgeOnGet,
          noDeleteOnStaleGet: o = this.noDeleteOnStaleGet,
          status: s,
        } = r,
        a = this.#h.get(t);
      if (a !== void 0) {
        let c = this.#n[a],
          u = this.#u(c);
        return (
          s && this.#N(s, a),
          this.#S(a)
            ? (s && (s.get = "stale"),
              u
                ? (s &&
                    i &&
                    c.__staleWhileFetching !== void 0 &&
                    (s.returnedStale = !0),
                  i ? c.__staleWhileFetching : void 0)
                : (o || this.#O(t, "expire"),
                  s && i && (s.returnedStale = !0),
                  i ? c : void 0))
            : (s && (s.get = "hit"),
              u ? c.__staleWhileFetching : (this.#z(a), n && this.#A(a), c))
        );
      } else s && (s.get = "miss");
    }
    #Z(t, r) {
      (this.#w[r] = t), (this.#f[t] = r);
    }
    #z(t) {
      t !== this.#p &&
        (t === this.#y ? (this.#y = this.#f[t]) : this.#Z(this.#w[t], this.#f[t]),
        this.#Z(this.#p, t),
        (this.#p = t));
    }
    delete(t) {
      return this.#O(t, "delete");
    }
    #O(t, r) {
      let i = !1;
      if (this.#a !== 0) {
        let n = this.#h.get(t);
        if (n !== void 0)
          if (
            (this.#_?.[n] && (clearTimeout(this.#_?.[n]), (this.#_[n] = void 0)),
            (i = !0),
            this.#a === 1)
          )
            this.#V(r);
          else {
            this.#U(n);
            let o = this.#n[n];
            if (
              (this.#u(o)
                ? o.__abortController.abort(new Error("deleted"))
                : (this.#x || this.#t) &&
                  (this.#x && this.#o?.(o, t, r), this.#t && this.#m?.push([o, t, r])),
              this.#h.delete(t),
              (this.#c[n] = void 0),
              (this.#n[n] = void 0),
              n === this.#p)
            )
              this.#p = this.#w[n];
            else if (n === this.#y) this.#y = this.#f[n];
            else {
              let s = this.#w[n];
              this.#f[s] = this.#f[n];
              let a = this.#f[n];
              this.#w[a] = this.#w[n];
            }
            this.#a--, this.#I.push(n);
          }
      }
      if (this.#t && this.#m?.length) {
        let n = this.#m,
          o;
        for (; (o = n?.shift()); ) this.#s?.(...o);
      }
      return i;
    }
    clear() {
      return this.#V("delete");
    }
    #V(t) {
      for (let r of this.#j({allowStale: !0})) {
        let i = this.#n[r];
        if (this.#u(i)) i.__abortController.abort(new Error("deleted"));
        else {
          let n = this.#c[r];
          this.#x && this.#o?.(i, n, t), this.#t && this.#m?.push([i, n, t]);
        }
      }
      if (
        (this.#h.clear(),
        this.#n.fill(void 0),
        this.#c.fill(void 0),
        this.#g && this.#E)
      ) {
        this.#g.fill(0), this.#E.fill(0);
        for (let r of this.#_ ?? []) r !== void 0 && clearTimeout(r);
        this.#_?.fill(void 0);
      }
      if (
        (this.#$ && this.#$.fill(0),
        (this.#y = 0),
        (this.#p = 0),
        (this.#I.length = 0),
        (this.#d = 0),
        (this.#a = 0),
        this.#t && this.#m)
      ) {
        let r = this.#m,
          i;
        for (; (i = r?.shift()); ) this.#s?.(...i);
      }
    }
  };
var Ur = require("node:path"),
  Lm = require("node:url"),
  St = require("fs"),
  PS = We(require("node:fs"), 1),
  Wt = require("node:fs/promises");
var mo = require("node:events"),
  gc = We(require("node:stream"), 1),
  Rm = require("node:string_decoder"),
  Tm = typeof process == "object" && process ? process : {stdout: null, stderr: null},
  SS = (e) =>
    !!e &&
    typeof e == "object" &&
    (e instanceof Vt || e instanceof gc.default || $S(e) || ES(e)),
  $S = (e) =>
    !!e &&
    typeof e == "object" &&
    e instanceof mo.EventEmitter &&
    typeof e.pipe == "function" &&
    e.pipe !== gc.default.Writable.prototype.pipe,
  ES = (e) =>
    !!e &&
    typeof e == "object" &&
    e instanceof mo.EventEmitter &&
    typeof e.write == "function" &&
    typeof e.end == "function",
  Pt = Symbol("EOF"),
  Nt = Symbol("maybeEmitEnd"),
  qt = Symbol("emittedEnd"),
  co = Symbol("emittingEnd"),
  Zn = Symbol("emittedError"),
  uo = Symbol("closed"),
  jm = Symbol("read"),
  lo = Symbol("flush"),
  Pm = Symbol("flushChunk"),
  ft = Symbol("encoding"),
  Cr = Symbol("decoder"),
  we = Symbol("flowing"),
  qn = Symbol("paused"),
  zr = Symbol("resume"),
  xe = Symbol("buffer"),
  Pe = Symbol("pipes"),
  Se = Symbol("bufferLength"),
  lc = Symbol("bufferPush"),
  ho = Symbol("bufferShift"),
  ke = Symbol("objectMode"),
  me = Symbol("destroyed"),
  hc = Symbol("error"),
  dc = Symbol("emitData"),
  Nm = Symbol("emitEnd"),
  fc = Symbol("emitEnd2"),
  wt = Symbol("async"),
  pc = Symbol("abort"),
  fo = Symbol("aborted"),
  Vn = Symbol("signal"),
  ur = Symbol("dataListeners"),
  Ke = Symbol("discarded"),
  Wn = (e) => Promise.resolve().then(e),
  kS = (e) => e(),
  AS = (e) => e === "end" || e === "finish" || e === "prefinish",
  IS = (e) =>
    e instanceof ArrayBuffer ||
    (!!e &&
      typeof e == "object" &&
      e.constructor &&
      e.constructor.name === "ArrayBuffer" &&
      e.byteLength >= 0),
  OS = (e) => !Buffer.isBuffer(e) && ArrayBuffer.isView(e),
  po = class {
    src;
    dest;
    opts;
    ondrain;
    constructor(t, r, i) {
      (this.src = t),
        (this.dest = r),
        (this.opts = i),
        (this.ondrain = () => t[zr]()),
        this.dest.on("drain", this.ondrain);
    }
    unpipe() {
      this.dest.removeListener("drain", this.ondrain);
    }
    proxyErrors(t) {}
    end() {
      this.unpipe(), this.opts.end && this.dest.end();
    }
  },
  mc = class extends po {
    unpipe() {
      this.src.removeListener("error", this.proxyErrors), super.unpipe();
    }
    constructor(t, r, i) {
      super(t, r, i),
        (this.proxyErrors = (n) => r.emit("error", n)),
        t.on("error", this.proxyErrors);
    }
  },
  TS = (e) => !!e.objectMode,
  jS = (e) => !e.objectMode && !!e.encoding && e.encoding !== "buffer",
  Vt = class extends mo.EventEmitter {
    [we] = !1;
    [qn] = !1;
    [Pe] = [];
    [xe] = [];
    [ke];
    [ft];
    [wt];
    [Cr];
    [Pt] = !1;
    [qt] = !1;
    [co] = !1;
    [uo] = !1;
    [Zn] = null;
    [Se] = 0;
    [me] = !1;
    [Vn];
    [fo] = !1;
    [ur] = 0;
    [Ke] = !1;
    writable = !0;
    readable = !0;
    constructor(...t) {
      let r = t[0] || {};
      if ((super(), r.objectMode && typeof r.encoding == "string"))
        throw new TypeError("Encoding and objectMode may not be used together");
      TS(r)
        ? ((this[ke] = !0), (this[ft] = null))
        : jS(r)
          ? ((this[ft] = r.encoding), (this[ke] = !1))
          : ((this[ke] = !1), (this[ft] = null)),
        (this[wt] = !!r.async),
        (this[Cr] = this[ft] ? new Rm.StringDecoder(this[ft]) : null),
        r &&
          r.debugExposeBuffer === !0 &&
          Object.defineProperty(this, "buffer", {get: () => this[xe]}),
        r &&
          r.debugExposePipes === !0 &&
          Object.defineProperty(this, "pipes", {get: () => this[Pe]});
      let {signal: i} = r;
      i &&
        ((this[Vn] = i),
        i.aborted ? this[pc]() : i.addEventListener("abort", () => this[pc]()));
    }
    get bufferLength() {
      return this[Se];
    }
    get encoding() {
      return this[ft];
    }
    set encoding(t) {
      throw new Error("Encoding must be set at instantiation time");
    }
    setEncoding(t) {
      throw new Error("Encoding must be set at instantiation time");
    }
    get objectMode() {
      return this[ke];
    }
    set objectMode(t) {
      throw new Error("objectMode must be set at instantiation time");
    }
    get async() {
      return this[wt];
    }
    set async(t) {
      this[wt] = this[wt] || !!t;
    }
    [pc]() {
      (this[fo] = !0),
        this.emit("abort", this[Vn]?.reason),
        this.destroy(this[Vn]?.reason);
    }
    get aborted() {
      return this[fo];
    }
    set aborted(t) {}
    write(t, r, i) {
      if (this[fo]) return !1;
      if (this[Pt]) throw new Error("write after end");
      if (this[me])
        return (
          this.emit(
            "error",
            Object.assign(new Error("Cannot call write after a stream was destroyed"), {
              code: "ERR_STREAM_DESTROYED",
            }),
          ),
          !0
        );
      typeof r == "function" && ((i = r), (r = "utf8")), r || (r = "utf8");
      let n = this[wt] ? Wn : kS;
      if (!this[ke] && !Buffer.isBuffer(t)) {
        if (OS(t)) t = Buffer.from(t.buffer, t.byteOffset, t.byteLength);
        else if (IS(t)) t = Buffer.from(t);
        else if (typeof t != "string")
          throw new Error("Non-contiguous data written to non-objectMode stream");
      }
      return this[ke]
        ? (this[we] && this[Se] !== 0 && this[lo](!0),
          this[we] ? this.emit("data", t) : this[lc](t),
          this[Se] !== 0 && this.emit("readable"),
          i && n(i),
          this[we])
        : t.length
          ? (typeof t == "string" &&
              !(r === this[ft] && !this[Cr]?.lastNeed) &&
              (t = Buffer.from(t, r)),
            Buffer.isBuffer(t) && this[ft] && (t = this[Cr].write(t)),
            this[we] && this[Se] !== 0 && this[lo](!0),
            this[we] ? this.emit("data", t) : this[lc](t),
            this[Se] !== 0 && this.emit("readable"),
            i && n(i),
            this[we])
          : (this[Se] !== 0 && this.emit("readable"), i && n(i), this[we]);
    }
    read(t) {
      if (this[me]) return null;
      if (((this[Ke] = !1), this[Se] === 0 || t === 0 || (t && t > this[Se])))
        return this[Nt](), null;
      this[ke] && (t = null),
        this[xe].length > 1 &&
          !this[ke] &&
          (this[xe] = [
            this[ft] ? this[xe].join("") : Buffer.concat(this[xe], this[Se]),
          ]);
      let r = this[jm](t || null, this[xe][0]);
      return this[Nt](), r;
    }
    [jm](t, r) {
      if (this[ke]) this[ho]();
      else {
        let i = r;
        t === i.length || t === null
          ? this[ho]()
          : typeof i == "string"
            ? ((this[xe][0] = i.slice(t)), (r = i.slice(0, t)), (this[Se] -= t))
            : ((this[xe][0] = i.subarray(t)), (r = i.subarray(0, t)), (this[Se] -= t));
      }
      return (
        this.emit("data", r), !this[xe].length && !this[Pt] && this.emit("drain"), r
      );
    }
    end(t, r, i) {
      return (
        typeof t == "function" && ((i = t), (t = void 0)),
        typeof r == "function" && ((i = r), (r = "utf8")),
        t !== void 0 && this.write(t, r),
        i && this.once("end", i),
        (this[Pt] = !0),
        (this.writable = !1),
        (this[we] || !this[qn]) && this[Nt](),
        this
      );
    }
    [zr]() {
      this[me] ||
        (!this[ur] && !this[Pe].length && (this[Ke] = !0),
        (this[qn] = !1),
        (this[we] = !0),
        this.emit("resume"),
        this[xe].length ? this[lo]() : this[Pt] ? this[Nt]() : this.emit("drain"));
    }
    resume() {
      return this[zr]();
    }
    pause() {
      (this[we] = !1), (this[qn] = !0), (this[Ke] = !1);
    }
    get destroyed() {
      return this[me];
    }
    get flowing() {
      return this[we];
    }
    get paused() {
      return this[qn];
    }
    [lc](t) {
      this[ke] ? (this[Se] += 1) : (this[Se] += t.length), this[xe].push(t);
    }
    [ho]() {
      return (
        this[ke] ? (this[Se] -= 1) : (this[Se] -= this[xe][0].length), this[xe].shift()
      );
    }
    [lo](t = !1) {
      do;
      while (this[Pm](this[ho]()) && this[xe].length);
      !t && !this[xe].length && !this[Pt] && this.emit("drain");
    }
    [Pm](t) {
      return this.emit("data", t), this[we];
    }
    pipe(t, r) {
      if (this[me]) return t;
      this[Ke] = !1;
      let i = this[qt];
      return (
        (r = r || {}),
        t === Tm.stdout || t === Tm.stderr ? (r.end = !1) : (r.end = r.end !== !1),
        (r.proxyErrors = !!r.proxyErrors),
        i
          ? r.end && t.end()
          : (this[Pe].push(r.proxyErrors ? new mc(this, t, r) : new po(this, t, r)),
            this[wt] ? Wn(() => this[zr]()) : this[zr]()),
        t
      );
    }
    unpipe(t) {
      let r = this[Pe].find((i) => i.dest === t);
      r &&
        (this[Pe].length === 1
          ? (this[we] && this[ur] === 0 && (this[we] = !1), (this[Pe] = []))
          : this[Pe].splice(this[Pe].indexOf(r), 1),
        r.unpipe());
    }
    addListener(t, r) {
      return this.on(t, r);
    }
    on(t, r) {
      let i = super.on(t, r);
      if (t === "data")
        (this[Ke] = !1), this[ur]++, !this[Pe].length && !this[we] && this[zr]();
      else if (t === "readable" && this[Se] !== 0) super.emit("readable");
      else if (AS(t) && this[qt]) super.emit(t), this.removeAllListeners(t);
      else if (t === "error" && this[Zn]) {
        let n = r;
        this[wt] ? Wn(() => n.call(this, this[Zn])) : n.call(this, this[Zn]);
      }
      return i;
    }
    removeListener(t, r) {
      return this.off(t, r);
    }
    off(t, r) {
      let i = super.off(t, r);
      return (
        t === "data" &&
          ((this[ur] = this.listeners("data").length),
          this[ur] === 0 && !this[Ke] && !this[Pe].length && (this[we] = !1)),
        i
      );
    }
    removeAllListeners(t) {
      let r = super.removeAllListeners(t);
      return (
        (t === "data" || t === void 0) &&
          ((this[ur] = 0), !this[Ke] && !this[Pe].length && (this[we] = !1)),
        r
      );
    }
    get emittedEnd() {
      return this[qt];
    }
    [Nt]() {
      !this[co] &&
        !this[qt] &&
        !this[me] &&
        this[xe].length === 0 &&
        this[Pt] &&
        ((this[co] = !0),
        this.emit("end"),
        this.emit("prefinish"),
        this.emit("finish"),
        this[uo] && this.emit("close"),
        (this[co] = !1));
    }
    emit(t, ...r) {
      let i = r[0];
      if (t !== "error" && t !== "close" && t !== me && this[me]) return !1;
      if (t === "data")
        return !this[ke] && !i
          ? !1
          : this[wt]
            ? (Wn(() => this[dc](i)), !0)
            : this[dc](i);
      if (t === "end") return this[Nm]();
      if (t === "close") {
        if (((this[uo] = !0), !this[qt] && !this[me])) return !1;
        let o = super.emit("close");
        return this.removeAllListeners("close"), o;
      } else if (t === "error") {
        (this[Zn] = i), super.emit(hc, i);
        let o =
          !this[Vn] || this.listeners("error").length ? super.emit("error", i) : !1;
        return this[Nt](), o;
      } else if (t === "resume") {
        let o = super.emit("resume");
        return this[Nt](), o;
      } else if (t === "finish" || t === "prefinish") {
        let o = super.emit(t);
        return this.removeAllListeners(t), o;
      }
      let n = super.emit(t, ...r);
      return this[Nt](), n;
    }
    [dc](t) {
      for (let i of this[Pe]) i.dest.write(t) === !1 && this.pause();
      let r = this[Ke] ? !1 : super.emit("data", t);
      return this[Nt](), r;
    }
    [Nm]() {
      return this[qt]
        ? !1
        : ((this[qt] = !0),
          (this.readable = !1),
          this[wt] ? (Wn(() => this[fc]()), !0) : this[fc]());
    }
    [fc]() {
      if (this[Cr]) {
        let r = this[Cr].end();
        if (r) {
          for (let i of this[Pe]) i.dest.write(r);
          this[Ke] || super.emit("data", r);
        }
      }
      for (let r of this[Pe]) r.end();
      let t = super.emit("end");
      return this.removeAllListeners("end"), t;
    }
    async collect() {
      let t = Object.assign([], {dataLength: 0});
      this[ke] || (t.dataLength = 0);
      let r = this.promise();
      return (
        this.on("data", (i) => {
          t.push(i), this[ke] || (t.dataLength += i.length);
        }),
        await r,
        t
      );
    }
    async concat() {
      if (this[ke]) throw new Error("cannot concat in objectMode");
      let t = await this.collect();
      return this[ft] ? t.join("") : Buffer.concat(t, t.dataLength);
    }
    async promise() {
      return new Promise((t, r) => {
        this.on(me, () => r(new Error("stream destroyed"))),
          this.on("error", (i) => r(i)),
          this.on("end", () => t());
      });
    }
    [Symbol.asyncIterator]() {
      this[Ke] = !1;
      let t = !1,
        r = async () => (this.pause(), (t = !0), {value: void 0, done: !0});
      return {
        next: () => {
          if (t) return r();
          let n = this.read();
          if (n !== null) return Promise.resolve({done: !1, value: n});
          if (this[Pt]) return r();
          let o,
            s,
            a = (h) => {
              this.off("data", c), this.off("end", u), this.off(me, l), r(), s(h);
            },
            c = (h) => {
              this.off("error", a),
                this.off("end", u),
                this.off(me, l),
                this.pause(),
                o({value: h, done: !!this[Pt]});
            },
            u = () => {
              this.off("error", a),
                this.off("data", c),
                this.off(me, l),
                r(),
                o({done: !0, value: void 0});
            },
            l = () => a(new Error("stream destroyed"));
          return new Promise((h, f) => {
            (s = f),
              (o = h),
              this.once(me, l),
              this.once("error", a),
              this.once("end", u),
              this.once("data", c);
          });
        },
        throw: r,
        return: r,
        [Symbol.asyncIterator]() {
          return this;
        },
      };
    }
    [Symbol.iterator]() {
      this[Ke] = !1;
      let t = !1,
        r = () => (
          this.pause(),
          this.off(hc, r),
          this.off(me, r),
          this.off("end", r),
          (t = !0),
          {done: !0, value: void 0}
        ),
        i = () => {
          if (t) return r();
          let n = this.read();
          return n === null ? r() : {done: !1, value: n};
        };
      return (
        this.once("end", r),
        this.once(hc, r),
        this.once(me, r),
        {
          next: i,
          throw: r,
          return: r,
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    }
    destroy(t) {
      if (this[me]) return t ? this.emit("error", t) : this.emit(me), this;
      (this[me] = !0), (this[Ke] = !0), (this[xe].length = 0), (this[Se] = 0);
      let r = this;
      return (
        typeof r.close == "function" && !this[uo] && r.close(),
        t ? this.emit("error", t) : this.emit(me),
        this
      );
    }
    static get isStream() {
      return SS;
    }
  };
var NS = St.realpathSync.native,
  Kn = {
    lstatSync: St.lstatSync,
    readdir: St.readdir,
    readdirSync: St.readdirSync,
    readlinkSync: St.readlinkSync,
    realpathSync: NS,
    promises: {
      lstat: Wt.lstat,
      readdir: Wt.readdir,
      readlink: Wt.readlink,
      realpath: Wt.realpath,
    },
  },
  Fm = (e) =>
    !e || e === Kn || e === PS
      ? Kn
      : {...Kn, ...e, promises: {...Kn.promises, ...(e.promises || {})}},
  Mm = /^\\\\\?\\([a-z]:)\\?$/i,
  RS = (e) => e.replace(/\//g, "\\").replace(Mm, "$1\\"),
  CS = /[\\\/]/,
  tt = 0,
  Bm = 1,
  Zm = 2,
  xt = 4,
  qm = 6,
  Vm = 8,
  lr = 10,
  Wm = 12,
  et = 15,
  Jn = ~et,
  vc = 16,
  Cm = 32,
  Gn = 64,
  pt = 128,
  go = 256,
  _o = 512,
  zm = Gn | pt | _o,
  zS = 1023,
  _c = (e) =>
    e.isFile()
      ? Vm
      : e.isDirectory()
        ? xt
        : e.isSymbolicLink()
          ? lr
          : e.isCharacterDevice()
            ? Zm
            : e.isBlockDevice()
              ? qm
              : e.isSocket()
                ? Wm
                : e.isFIFO()
                  ? Bm
                  : tt,
  Um = new cr({max: 2 ** 12}),
  Hn = (e) => {
    let t = Um.get(e);
    if (t) return t;
    let r = e.normalize("NFKD");
    return Um.set(e, r), r;
  },
  Dm = new cr({max: 2 ** 12}),
  vo = (e) => {
    let t = Dm.get(e);
    if (t) return t;
    let r = Hn(e.toLowerCase());
    return Dm.set(e, r), r;
  },
  yo = class extends cr {
    constructor() {
      super({max: 256});
    }
  },
  yc = class extends cr {
    constructor(t = 16 * 1024) {
      super({maxSize: t, sizeCalculation: (r) => r.length + 1});
    }
  },
  Jm = Symbol("PathScurry setAsCwd"),
  Ae = class {
    name;
    root;
    roots;
    parent;
    nocase;
    isCWD = !1;
    #e;
    #r;
    get dev() {
      return this.#r;
    }
    #o;
    get mode() {
      return this.#o;
    }
    #i;
    get nlink() {
      return this.#i;
    }
    #s;
    get uid() {
      return this.#s;
    }
    #b;
    get gid() {
      return this.#b;
    }
    #v;
    get rdev() {
      return this.#v;
    }
    #l;
    get blksize() {
      return this.#l;
    }
    #a;
    get ino() {
      return this.#a;
    }
    #d;
    get size() {
      return this.#d;
    }
    #h;
    get blocks() {
      return this.#h;
    }
    #c;
    get atimeMs() {
      return this.#c;
    }
    #n;
    get mtimeMs() {
      return this.#n;
    }
    #f;
    get ctimeMs() {
      return this.#f;
    }
    #w;
    get birthtimeMs() {
      return this.#w;
    }
    #y;
    get atime() {
      return this.#y;
    }
    #p;
    get mtime() {
      return this.#p;
    }
    #I;
    get ctime() {
      return this.#I;
    }
    #m;
    get birthtime() {
      return this.#m;
    }
    #$;
    #E;
    #g;
    #_;
    #x;
    #k;
    #t;
    #R;
    #P;
    #A;
    get parentPath() {
      return (this.parent || this).fullpath();
    }
    get path() {
      return this.parentPath;
    }
    constructor(t, r = tt, i, n, o, s, a) {
      (this.name = t),
        (this.#$ = o ? vo(t) : Hn(t)),
        (this.#t = r & zS),
        (this.nocase = o),
        (this.roots = n),
        (this.root = i || this),
        (this.#R = s),
        (this.#g = a.fullpath),
        (this.#x = a.relative),
        (this.#k = a.relativePosix),
        (this.parent = a.parent),
        this.parent ? (this.#e = this.parent.#e) : (this.#e = Fm(a.fs));
    }
    depth() {
      return this.#E !== void 0
        ? this.#E
        : this.parent
          ? (this.#E = this.parent.depth() + 1)
          : (this.#E = 0);
    }
    childrenCache() {
      return this.#R;
    }
    resolve(t) {
      if (!t) return this;
      let r = this.getRootString(t),
        n = t.substring(r.length).split(this.splitSep);
      return r ? this.getRoot(r).#N(n) : this.#N(n);
    }
    #N(t) {
      let r = this;
      for (let i of t) r = r.child(i);
      return r;
    }
    children() {
      let t = this.#R.get(this);
      if (t) return t;
      let r = Object.assign([], {provisional: 0});
      return this.#R.set(this, r), (this.#t &= ~vc), r;
    }
    child(t, r) {
      if (t === "" || t === ".") return this;
      if (t === "..") return this.parent || this;
      let i = this.children(),
        n = this.nocase ? vo(t) : Hn(t);
      for (let c of i) if (c.#$ === n) return c;
      let o = this.parent ? this.sep : "",
        s = this.#g ? this.#g + o + t : void 0,
        a = this.newChild(t, tt, {...r, parent: this, fullpath: s});
      return this.canReaddir() || (a.#t |= pt), i.push(a), a;
    }
    relative() {
      if (this.isCWD) return "";
      if (this.#x !== void 0) return this.#x;
      let t = this.name,
        r = this.parent;
      if (!r) return (this.#x = this.name);
      let i = r.relative();
      return i + (!i || !r.parent ? "" : this.sep) + t;
    }
    relativePosix() {
      if (this.sep === "/") return this.relative();
      if (this.isCWD) return "";
      if (this.#k !== void 0) return this.#k;
      let t = this.name,
        r = this.parent;
      if (!r) return (this.#k = this.fullpathPosix());
      let i = r.relativePosix();
      return i + (!i || !r.parent ? "" : "/") + t;
    }
    fullpath() {
      if (this.#g !== void 0) return this.#g;
      let t = this.name,
        r = this.parent;
      if (!r) return (this.#g = this.name);
      let n = r.fullpath() + (r.parent ? this.sep : "") + t;
      return (this.#g = n);
    }
    fullpathPosix() {
      if (this.#_ !== void 0) return this.#_;
      if (this.sep === "/") return (this.#_ = this.fullpath());
      if (!this.parent) {
        let n = this.fullpath().replace(/\\/g, "/");
        return /^[a-z]:\//i.test(n) ? (this.#_ = `//?/${n}`) : (this.#_ = n);
      }
      let t = this.parent,
        r = t.fullpathPosix(),
        i = r + (!r || !t.parent ? "" : "/") + this.name;
      return (this.#_ = i);
    }
    isUnknown() {
      return (this.#t & et) === tt;
    }
    isType(t) {
      return this[`is${t}`]();
    }
    getType() {
      return this.isUnknown()
        ? "Unknown"
        : this.isDirectory()
          ? "Directory"
          : this.isFile()
            ? "File"
            : this.isSymbolicLink()
              ? "SymbolicLink"
              : this.isFIFO()
                ? "FIFO"
                : this.isCharacterDevice()
                  ? "CharacterDevice"
                  : this.isBlockDevice()
                    ? "BlockDevice"
                    : this.isSocket()
                      ? "Socket"
                      : "Unknown";
    }
    isFile() {
      return (this.#t & et) === Vm;
    }
    isDirectory() {
      return (this.#t & et) === xt;
    }
    isCharacterDevice() {
      return (this.#t & et) === Zm;
    }
    isBlockDevice() {
      return (this.#t & et) === qm;
    }
    isFIFO() {
      return (this.#t & et) === Bm;
    }
    isSocket() {
      return (this.#t & et) === Wm;
    }
    isSymbolicLink() {
      return (this.#t & lr) === lr;
    }
    lstatCached() {
      return this.#t & Cm ? this : void 0;
    }
    readlinkCached() {
      return this.#P;
    }
    realpathCached() {
      return this.#A;
    }
    readdirCached() {
      let t = this.children();
      return t.slice(0, t.provisional);
    }
    canReadlink() {
      if (this.#P) return !0;
      if (!this.parent) return !1;
      let t = this.#t & et;
      return !((t !== tt && t !== lr) || this.#t & go || this.#t & pt);
    }
    calledReaddir() {
      return !!(this.#t & vc);
    }
    isENOENT() {
      return !!(this.#t & pt);
    }
    isNamed(t) {
      return this.nocase ? this.#$ === vo(t) : this.#$ === Hn(t);
    }
    async readlink() {
      let t = this.#P;
      if (t) return t;
      if (this.canReadlink() && this.parent)
        try {
          let r = await this.#e.promises.readlink(this.fullpath()),
            i = (await this.parent.realpath())?.resolve(r);
          if (i) return (this.#P = i);
        } catch (r) {
          this.#j(r.code);
          return;
        }
    }
    readlinkSync() {
      let t = this.#P;
      if (t) return t;
      if (this.canReadlink() && this.parent)
        try {
          let r = this.#e.readlinkSync(this.fullpath()),
            i = this.parent.realpathSync()?.resolve(r);
          if (i) return (this.#P = i);
        } catch (r) {
          this.#j(r.code);
          return;
        }
    }
    #D(t) {
      this.#t |= vc;
      for (let r = t.provisional; r < t.length; r++) {
        let i = t[r];
        i && i.#S();
      }
    }
    #S() {
      this.#t & pt || ((this.#t = (this.#t | pt) & Jn), this.#q());
    }
    #q() {
      let t = this.children();
      t.provisional = 0;
      for (let r of t) r.#S();
    }
    #U() {
      (this.#t |= _o), this.#C();
    }
    #C() {
      if (this.#t & Gn) return;
      let t = this.#t;
      (t & et) === xt && (t &= Jn), (this.#t = t | Gn), this.#q();
    }
    #L(t = "") {
      t === "ENOTDIR" || t === "EPERM"
        ? this.#C()
        : t === "ENOENT"
          ? this.#S()
          : (this.children().provisional = 0);
    }
    #T(t = "") {
      t === "ENOTDIR" ? this.parent.#C() : t === "ENOENT" && this.#S();
    }
    #j(t = "") {
      let r = this.#t;
      (r |= go),
        t === "ENOENT" && (r |= pt),
        (t === "EINVAL" || t === "UNKNOWN") && (r &= Jn),
        (this.#t = r),
        t === "ENOTDIR" && this.parent && this.parent.#C();
    }
    #F(t, r) {
      return this.#B(t, r) || this.#M(t, r);
    }
    #M(t, r) {
      let i = _c(t),
        n = this.newChild(t.name, i, {parent: this}),
        o = n.#t & et;
      return (
        o !== xt && o !== lr && o !== tt && (n.#t |= Gn),
        r.unshift(n),
        r.provisional++,
        n
      );
    }
    #B(t, r) {
      for (let i = r.provisional; i < r.length; i++) {
        let n = r[i];
        if ((this.nocase ? vo(t.name) : Hn(t.name)) === n.#$)
          return this.#u(t, n, i, r);
      }
    }
    #u(t, r, i, n) {
      let o = r.name;
      return (
        (r.#t = (r.#t & Jn) | _c(t)),
        o !== t.name && (r.name = t.name),
        i !== n.provisional &&
          (i === n.length - 1 ? n.pop() : n.splice(i, 1), n.unshift(r)),
        n.provisional++,
        r
      );
    }
    async lstat() {
      if ((this.#t & pt) === 0)
        try {
          return this.#Z(await this.#e.promises.lstat(this.fullpath())), this;
        } catch (t) {
          this.#T(t.code);
        }
    }
    lstatSync() {
      if ((this.#t & pt) === 0)
        try {
          return this.#Z(this.#e.lstatSync(this.fullpath())), this;
        } catch (t) {
          this.#T(t.code);
        }
    }
    #Z(t) {
      let {
        atime: r,
        atimeMs: i,
        birthtime: n,
        birthtimeMs: o,
        blksize: s,
        blocks: a,
        ctime: c,
        ctimeMs: u,
        dev: l,
        gid: h,
        ino: f,
        mode: d,
        mtime: p,
        mtimeMs: m,
        nlink: v,
        rdev: w,
        size: $,
        uid: b,
      } = t;
      (this.#y = r),
        (this.#c = i),
        (this.#m = n),
        (this.#w = o),
        (this.#l = s),
        (this.#h = a),
        (this.#I = c),
        (this.#f = u),
        (this.#r = l),
        (this.#b = h),
        (this.#a = f),
        (this.#o = d),
        (this.#p = p),
        (this.#n = m),
        (this.#i = v),
        (this.#v = w),
        (this.#d = $),
        (this.#s = b);
      let x = _c(t);
      (this.#t = (this.#t & Jn) | x | Cm),
        x !== tt && x !== xt && x !== lr && (this.#t |= Gn);
    }
    #z = [];
    #O = !1;
    #V(t) {
      this.#O = !1;
      let r = this.#z.slice();
      (this.#z.length = 0), r.forEach((i) => i(null, t));
    }
    readdirCB(t, r = !1) {
      if (!this.canReaddir()) {
        r ? t(null, []) : queueMicrotask(() => t(null, []));
        return;
      }
      let i = this.children();
      if (this.calledReaddir()) {
        let o = i.slice(0, i.provisional);
        r ? t(null, o) : queueMicrotask(() => t(null, o));
        return;
      }
      if ((this.#z.push(t), this.#O)) return;
      this.#O = !0;
      let n = this.fullpath();
      this.#e.readdir(n, {withFileTypes: !0}, (o, s) => {
        if (o) this.#L(o.code), (i.provisional = 0);
        else {
          for (let a of s) this.#F(a, i);
          this.#D(i);
        }
        this.#V(i.slice(0, i.provisional));
      });
    }
    #W;
    async readdir() {
      if (!this.canReaddir()) return [];
      let t = this.children();
      if (this.calledReaddir()) return t.slice(0, t.provisional);
      let r = this.fullpath();
      if (this.#W) await this.#W;
      else {
        let i = () => {};
        this.#W = new Promise((n) => (i = n));
        try {
          for (let n of await this.#e.promises.readdir(r, {withFileTypes: !0}))
            this.#F(n, t);
          this.#D(t);
        } catch (n) {
          this.#L(n.code), (t.provisional = 0);
        }
        (this.#W = void 0), i();
      }
      return t.slice(0, t.provisional);
    }
    readdirSync() {
      if (!this.canReaddir()) return [];
      let t = this.children();
      if (this.calledReaddir()) return t.slice(0, t.provisional);
      let r = this.fullpath();
      try {
        for (let i of this.#e.readdirSync(r, {withFileTypes: !0})) this.#F(i, t);
        this.#D(t);
      } catch (i) {
        this.#L(i.code), (t.provisional = 0);
      }
      return t.slice(0, t.provisional);
    }
    canReaddir() {
      if (this.#t & zm) return !1;
      let t = et & this.#t;
      return t === tt || t === xt || t === lr;
    }
    shouldWalk(t, r) {
      return (
        (this.#t & xt) === xt && !(this.#t & zm) && !t.has(this) && (!r || r(this))
      );
    }
    async realpath() {
      if (this.#A) return this.#A;
      if (!((_o | go | pt) & this.#t))
        try {
          let t = await this.#e.promises.realpath(this.fullpath());
          return (this.#A = this.resolve(t));
        } catch {
          this.#U();
        }
    }
    realpathSync() {
      if (this.#A) return this.#A;
      if (!((_o | go | pt) & this.#t))
        try {
          let t = this.#e.realpathSync(this.fullpath());
          return (this.#A = this.resolve(t));
        } catch {
          this.#U();
        }
    }
    [Jm](t) {
      if (t === this) return;
      (t.isCWD = !1), (this.isCWD = !0);
      let r = new Set([]),
        i = [],
        n = this;
      for (; n && n.parent; )
        r.add(n),
          (n.#x = i.join(this.sep)),
          (n.#k = i.join("/")),
          (n = n.parent),
          i.push("..");
      for (n = t; n && n.parent && !r.has(n); )
        (n.#x = void 0), (n.#k = void 0), (n = n.parent);
    }
  },
  bo = class e extends Ae {
    sep = "\\";
    splitSep = CS;
    constructor(t, r = tt, i, n, o, s, a) {
      super(t, r, i, n, o, s, a);
    }
    newChild(t, r = tt, i = {}) {
      return new e(t, r, this.root, this.roots, this.nocase, this.childrenCache(), i);
    }
    getRootString(t) {
      return Ur.win32.parse(t).root;
    }
    getRoot(t) {
      if (((t = RS(t.toUpperCase())), t === this.root.name)) return this.root;
      for (let [r, i] of Object.entries(this.roots))
        if (this.sameRoot(t, r)) return (this.roots[t] = i);
      return (this.roots[t] = new Dr(t, this).root);
    }
    sameRoot(t, r = this.root.name) {
      return (t = t.toUpperCase().replace(/\//g, "\\").replace(Mm, "$1\\")), t === r;
    }
  },
  wo = class e extends Ae {
    splitSep = "/";
    sep = "/";
    constructor(t, r = tt, i, n, o, s, a) {
      super(t, r, i, n, o, s, a);
    }
    getRootString(t) {
      return t.startsWith("/") ? "/" : "";
    }
    getRoot(t) {
      return this.root;
    }
    newChild(t, r = tt, i = {}) {
      return new e(t, r, this.root, this.roots, this.nocase, this.childrenCache(), i);
    }
  },
  xo = class {
    root;
    rootPath;
    roots;
    cwd;
    #e;
    #r;
    #o;
    nocase;
    #i;
    constructor(
      t = process.cwd(),
      r,
      i,
      {nocase: n, childrenCacheSize: o = 16 * 1024, fs: s = Kn} = {},
    ) {
      (this.#i = Fm(s)),
        (t instanceof URL || t.startsWith("file://")) && (t = (0, Lm.fileURLToPath)(t));
      let a = r.resolve(t);
      (this.roots = Object.create(null)),
        (this.rootPath = this.parseRootPath(a)),
        (this.#e = new yo()),
        (this.#r = new yo()),
        (this.#o = new yc(o));
      let c = a.substring(this.rootPath.length).split(i);
      if ((c.length === 1 && !c[0] && c.pop(), n === void 0))
        throw new TypeError("must provide nocase setting to PathScurryBase ctor");
      (this.nocase = n),
        (this.root = this.newRoot(this.#i)),
        (this.roots[this.rootPath] = this.root);
      let u = this.root,
        l = c.length - 1,
        h = r.sep,
        f = this.rootPath,
        d = !1;
      for (let p of c) {
        let m = l--;
        (u = u.child(p, {
          relative: new Array(m).fill("..").join(h),
          relativePosix: new Array(m).fill("..").join("/"),
          fullpath: (f += (d ? "" : h) + p),
        })),
          (d = !0);
      }
      this.cwd = u;
    }
    depth(t = this.cwd) {
      return typeof t == "string" && (t = this.cwd.resolve(t)), t.depth();
    }
    childrenCache() {
      return this.#o;
    }
    resolve(...t) {
      let r = "";
      for (let o = t.length - 1; o >= 0; o--) {
        let s = t[o];
        if (!(!s || s === ".") && ((r = r ? `${s}/${r}` : s), this.isAbsolute(s)))
          break;
      }
      let i = this.#e.get(r);
      if (i !== void 0) return i;
      let n = this.cwd.resolve(r).fullpath();
      return this.#e.set(r, n), n;
    }
    resolvePosix(...t) {
      let r = "";
      for (let o = t.length - 1; o >= 0; o--) {
        let s = t[o];
        if (!(!s || s === ".") && ((r = r ? `${s}/${r}` : s), this.isAbsolute(s)))
          break;
      }
      let i = this.#r.get(r);
      if (i !== void 0) return i;
      let n = this.cwd.resolve(r).fullpathPosix();
      return this.#r.set(r, n), n;
    }
    relative(t = this.cwd) {
      return typeof t == "string" && (t = this.cwd.resolve(t)), t.relative();
    }
    relativePosix(t = this.cwd) {
      return typeof t == "string" && (t = this.cwd.resolve(t)), t.relativePosix();
    }
    basename(t = this.cwd) {
      return typeof t == "string" && (t = this.cwd.resolve(t)), t.name;
    }
    dirname(t = this.cwd) {
      return (
        typeof t == "string" && (t = this.cwd.resolve(t)), (t.parent || t).fullpath()
      );
    }
    async readdir(t = this.cwd, r = {withFileTypes: !0}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t), (t = this.cwd));
      let {withFileTypes: i} = r;
      if (t.canReaddir()) {
        let n = await t.readdir();
        return i ? n : n.map((o) => o.name);
      } else return [];
    }
    readdirSync(t = this.cwd, r = {withFileTypes: !0}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t), (t = this.cwd));
      let {withFileTypes: i = !0} = r;
      return t.canReaddir()
        ? i
          ? t.readdirSync()
          : t.readdirSync().map((n) => n.name)
        : [];
    }
    async lstat(t = this.cwd) {
      return typeof t == "string" && (t = this.cwd.resolve(t)), t.lstat();
    }
    lstatSync(t = this.cwd) {
      return typeof t == "string" && (t = this.cwd.resolve(t)), t.lstatSync();
    }
    async readlink(t = this.cwd, {withFileTypes: r} = {withFileTypes: !1}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t.withFileTypes), (t = this.cwd));
      let i = await t.readlink();
      return r ? i : i?.fullpath();
    }
    readlinkSync(t = this.cwd, {withFileTypes: r} = {withFileTypes: !1}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t.withFileTypes), (t = this.cwd));
      let i = t.readlinkSync();
      return r ? i : i?.fullpath();
    }
    async realpath(t = this.cwd, {withFileTypes: r} = {withFileTypes: !1}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t.withFileTypes), (t = this.cwd));
      let i = await t.realpath();
      return r ? i : i?.fullpath();
    }
    realpathSync(t = this.cwd, {withFileTypes: r} = {withFileTypes: !1}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t.withFileTypes), (t = this.cwd));
      let i = t.realpathSync();
      return r ? i : i?.fullpath();
    }
    async walk(t = this.cwd, r = {}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t), (t = this.cwd));
      let {withFileTypes: i = !0, follow: n = !1, filter: o, walkFilter: s} = r,
        a = [];
      (!o || o(t)) && a.push(i ? t : t.fullpath());
      let c = new Set(),
        u = (h, f) => {
          c.add(h),
            h.readdirCB((d, p) => {
              if (d) return f(d);
              let m = p.length;
              if (!m) return f();
              let v = () => {
                --m === 0 && f();
              };
              for (let w of p)
                (!o || o(w)) && a.push(i ? w : w.fullpath()),
                  n && w.isSymbolicLink()
                    ? w
                        .realpath()
                        .then(($) => ($?.isUnknown() ? $.lstat() : $))
                        .then(($) => ($?.shouldWalk(c, s) ? u($, v) : v()))
                    : w.shouldWalk(c, s)
                      ? u(w, v)
                      : v();
            }, !0);
        },
        l = t;
      return new Promise((h, f) => {
        u(l, (d) => {
          if (d) return f(d);
          h(a);
        });
      });
    }
    walkSync(t = this.cwd, r = {}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t), (t = this.cwd));
      let {withFileTypes: i = !0, follow: n = !1, filter: o, walkFilter: s} = r,
        a = [];
      (!o || o(t)) && a.push(i ? t : t.fullpath());
      let c = new Set([t]);
      for (let u of c) {
        let l = u.readdirSync();
        for (let h of l) {
          (!o || o(h)) && a.push(i ? h : h.fullpath());
          let f = h;
          if (h.isSymbolicLink()) {
            if (!(n && (f = h.realpathSync()))) continue;
            f.isUnknown() && f.lstatSync();
          }
          f.shouldWalk(c, s) && c.add(f);
        }
      }
      return a;
    }
    [Symbol.asyncIterator]() {
      return this.iterate();
    }
    iterate(t = this.cwd, r = {}) {
      return (
        typeof t == "string"
          ? (t = this.cwd.resolve(t))
          : t instanceof Ae || ((r = t), (t = this.cwd)),
        this.stream(t, r)[Symbol.asyncIterator]()
      );
    }
    [Symbol.iterator]() {
      return this.iterateSync();
    }
    *iterateSync(t = this.cwd, r = {}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t), (t = this.cwd));
      let {withFileTypes: i = !0, follow: n = !1, filter: o, walkFilter: s} = r;
      (!o || o(t)) && (yield i ? t : t.fullpath());
      let a = new Set([t]);
      for (let c of a) {
        let u = c.readdirSync();
        for (let l of u) {
          (!o || o(l)) && (yield i ? l : l.fullpath());
          let h = l;
          if (l.isSymbolicLink()) {
            if (!(n && (h = l.realpathSync()))) continue;
            h.isUnknown() && h.lstatSync();
          }
          h.shouldWalk(a, s) && a.add(h);
        }
      }
    }
    stream(t = this.cwd, r = {}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t), (t = this.cwd));
      let {withFileTypes: i = !0, follow: n = !1, filter: o, walkFilter: s} = r,
        a = new Vt({objectMode: !0});
      (!o || o(t)) && a.write(i ? t : t.fullpath());
      let c = new Set(),
        u = [t],
        l = 0,
        h = () => {
          let f = !1;
          for (; !f; ) {
            let d = u.shift();
            if (!d) {
              l === 0 && a.end();
              return;
            }
            l++, c.add(d);
            let p = (v, w, $ = !1) => {
                if (v) return a.emit("error", v);
                if (n && !$) {
                  let b = [];
                  for (let x of w)
                    x.isSymbolicLink() &&
                      b.push(
                        x.realpath().then((D) => (D?.isUnknown() ? D.lstat() : D)),
                      );
                  if (b.length) {
                    Promise.all(b).then(() => p(null, w, !0));
                    return;
                  }
                }
                for (let b of w)
                  b && (!o || o(b)) && (a.write(i ? b : b.fullpath()) || (f = !0));
                l--;
                for (let b of w) {
                  let x = b.realpathCached() || b;
                  x.shouldWalk(c, s) && u.push(x);
                }
                f && !a.flowing ? a.once("drain", h) : m || h();
              },
              m = !0;
            d.readdirCB(p, !0), (m = !1);
          }
        };
      return h(), a;
    }
    streamSync(t = this.cwd, r = {}) {
      typeof t == "string"
        ? (t = this.cwd.resolve(t))
        : t instanceof Ae || ((r = t), (t = this.cwd));
      let {withFileTypes: i = !0, follow: n = !1, filter: o, walkFilter: s} = r,
        a = new Vt({objectMode: !0}),
        c = new Set();
      (!o || o(t)) && a.write(i ? t : t.fullpath());
      let u = [t],
        l = 0,
        h = () => {
          let f = !1;
          for (; !f; ) {
            let d = u.shift();
            if (!d) {
              l === 0 && a.end();
              return;
            }
            l++, c.add(d);
            let p = d.readdirSync();
            for (let m of p)
              (!o || o(m)) && (a.write(i ? m : m.fullpath()) || (f = !0));
            l--;
            for (let m of p) {
              let v = m;
              if (m.isSymbolicLink()) {
                if (!(n && (v = m.realpathSync()))) continue;
                v.isUnknown() && v.lstatSync();
              }
              v.shouldWalk(c, s) && u.push(v);
            }
          }
          f && !a.flowing && a.once("drain", h);
        };
      return h(), a;
    }
    chdir(t = this.cwd) {
      let r = this.cwd;
      (this.cwd = typeof t == "string" ? this.cwd.resolve(t) : t), this.cwd[Jm](r);
    }
  },
  Dr = class extends xo {
    sep = "\\";
    constructor(t = process.cwd(), r = {}) {
      let {nocase: i = !0} = r;
      super(t, Ur.win32, "\\", {...r, nocase: i}), (this.nocase = i);
      for (let n = this.cwd; n; n = n.parent) n.nocase = this.nocase;
    }
    parseRootPath(t) {
      return Ur.win32.parse(t).root.toUpperCase();
    }
    newRoot(t) {
      return new bo(
        this.rootPath,
        xt,
        void 0,
        this.roots,
        this.nocase,
        this.childrenCache(),
        {fs: t},
      );
    }
    isAbsolute(t) {
      return t.startsWith("/") || t.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(t);
    }
  },
  Lr = class extends xo {
    sep = "/";
    constructor(t = process.cwd(), r = {}) {
      let {nocase: i = !1} = r;
      super(t, Ur.posix, "/", {...r, nocase: i}), (this.nocase = i);
    }
    parseRootPath(t) {
      return "/";
    }
    newRoot(t) {
      return new wo(
        this.rootPath,
        xt,
        void 0,
        this.roots,
        this.nocase,
        this.childrenCache(),
        {fs: t},
      );
    }
    isAbsolute(t) {
      return t.startsWith("/");
    }
  },
  Yn = class extends Lr {
    constructor(t = process.cwd(), r = {}) {
      let {nocase: i = !0} = r;
      super(t, {...r, nocase: i});
    }
  },
  IN = process.platform === "win32" ? bo : wo,
  Km = process.platform === "win32" ? Dr : process.platform === "darwin" ? Yn : Lr;
var US = (e) => e.length >= 1,
  DS = (e) => e.length >= 1,
  Fr = class e {
    #e;
    #r;
    #o;
    length;
    #i;
    #s;
    #b;
    #v;
    #l;
    #a;
    #d = !0;
    constructor(t, r, i, n) {
      if (!US(t)) throw new TypeError("empty pattern list");
      if (!DS(r)) throw new TypeError("empty glob list");
      if (r.length !== t.length)
        throw new TypeError("mismatched pattern list and glob list lengths");
      if (((this.length = t.length), i < 0 || i >= this.length))
        throw new TypeError("index out of range");
      if (((this.#e = t), (this.#r = r), (this.#o = i), (this.#i = n), this.#o === 0)) {
        if (this.isUNC()) {
          let [o, s, a, c, ...u] = this.#e,
            [l, h, f, d, ...p] = this.#r;
          u[0] === "" && (u.shift(), p.shift());
          let m = [o, s, a, c, ""].join("/"),
            v = [l, h, f, d, ""].join("/");
          (this.#e = [m, ...u]), (this.#r = [v, ...p]), (this.length = this.#e.length);
        } else if (this.isDrive() || this.isAbsolute()) {
          let [o, ...s] = this.#e,
            [a, ...c] = this.#r;
          s[0] === "" && (s.shift(), c.shift());
          let u = o + "/",
            l = a + "/";
          (this.#e = [u, ...s]), (this.#r = [l, ...c]), (this.length = this.#e.length);
        }
      }
    }
    pattern() {
      return this.#e[this.#o];
    }
    isString() {
      return typeof this.#e[this.#o] == "string";
    }
    isGlobstar() {
      return this.#e[this.#o] === Ee;
    }
    isRegExp() {
      return this.#e[this.#o] instanceof RegExp;
    }
    globString() {
      return (this.#b =
        this.#b ||
        (this.#o === 0
          ? this.isAbsolute()
            ? this.#r[0] + this.#r.slice(1).join("/")
            : this.#r.join("/")
          : this.#r.slice(this.#o).join("/")));
    }
    hasMore() {
      return this.length > this.#o + 1;
    }
    rest() {
      return this.#s !== void 0
        ? this.#s
        : this.hasMore()
          ? ((this.#s = new e(this.#e, this.#r, this.#o + 1, this.#i)),
            (this.#s.#a = this.#a),
            (this.#s.#l = this.#l),
            (this.#s.#v = this.#v),
            this.#s)
          : (this.#s = null);
    }
    isUNC() {
      let t = this.#e;
      return this.#l !== void 0
        ? this.#l
        : (this.#l =
            this.#i === "win32" &&
            this.#o === 0 &&
            t[0] === "" &&
            t[1] === "" &&
            typeof t[2] == "string" &&
            !!t[2] &&
            typeof t[3] == "string" &&
            !!t[3]);
    }
    isDrive() {
      let t = this.#e;
      return this.#v !== void 0
        ? this.#v
        : (this.#v =
            this.#i === "win32" &&
            this.#o === 0 &&
            this.length > 1 &&
            typeof t[0] == "string" &&
            /^[a-z]:$/i.test(t[0]));
    }
    isAbsolute() {
      let t = this.#e;
      return this.#a !== void 0
        ? this.#a
        : (this.#a = (t[0] === "" && t.length > 1) || this.isDrive() || this.isUNC());
    }
    root() {
      let t = this.#e[0];
      return typeof t == "string" && this.isAbsolute() && this.#o === 0 ? t : "";
    }
    checkFollowGlobstar() {
      return !(this.#o === 0 || !this.isGlobstar() || !this.#d);
    }
    markFollowGlobstar() {
      return this.#o === 0 || !this.isGlobstar() || !this.#d
        ? !1
        : ((this.#d = !1), !0);
    }
  };
var LS =
    typeof process == "object" && process && typeof process.platform == "string"
      ? process.platform
      : "linux",
  Mr = class {
    relative;
    relativeChildren;
    absolute;
    absoluteChildren;
    platform;
    mmopts;
    constructor(t, {nobrace: r, nocase: i, noext: n, noglobstar: o, platform: s = LS}) {
      (this.relative = []),
        (this.absolute = []),
        (this.relativeChildren = []),
        (this.absoluteChildren = []),
        (this.platform = s),
        (this.mmopts = {
          dot: !0,
          nobrace: r,
          nocase: i,
          noext: n,
          noglobstar: o,
          optimizationLevel: 2,
          platform: s,
          nocomment: !0,
          nonegate: !0,
        });
      for (let a of t) this.add(a);
    }
    add(t) {
      let r = new Je(t, this.mmopts);
      for (let i = 0; i < r.set.length; i++) {
        let n = r.set[i],
          o = r.globParts[i];
        if (!n || !o) throw new Error("invalid pattern object");
        for (; n[0] === "." && o[0] === "."; ) n.shift(), o.shift();
        let s = new Fr(n, o, 0, this.platform),
          a = new Je(s.globString(), this.mmopts),
          c = o[o.length - 1] === "**",
          u = s.isAbsolute();
        u ? this.absolute.push(a) : this.relative.push(a),
          c && (u ? this.absoluteChildren.push(a) : this.relativeChildren.push(a));
      }
    }
    ignored(t) {
      let r = t.fullpath(),
        i = `${r}/`,
        n = t.relative() || ".",
        o = `${n}/`;
      for (let s of this.relative) if (s.match(n) || s.match(o)) return !0;
      for (let s of this.absolute) if (s.match(r) || s.match(i)) return !0;
      return !1;
    }
    childrenIgnored(t) {
      let r = t.fullpath() + "/",
        i = (t.relative() || ".") + "/";
      for (let n of this.relativeChildren) if (n.match(i)) return !0;
      for (let n of this.absoluteChildren) if (n.match(r)) return !0;
      return !1;
    }
  };
var bc = class e {
    store;
    constructor(t = new Map()) {
      this.store = t;
    }
    copy() {
      return new e(new Map(this.store));
    }
    hasWalked(t, r) {
      return this.store.get(t.fullpath())?.has(r.globString());
    }
    storeWalked(t, r) {
      let i = t.fullpath(),
        n = this.store.get(i);
      n ? n.add(r.globString()) : this.store.set(i, new Set([r.globString()]));
    }
  },
  wc = class {
    store = new Map();
    add(t, r, i) {
      let n = (r ? 2 : 0) | (i ? 1 : 0),
        o = this.store.get(t);
      this.store.set(t, o === void 0 ? n : n & o);
    }
    entries() {
      return [...this.store.entries()].map(([t, r]) => [t, !!(r & 2), !!(r & 1)]);
    }
  },
  xc = class {
    store = new Map();
    add(t, r) {
      if (!t.canReaddir()) return;
      let i = this.store.get(t);
      i
        ? i.find((n) => n.globString() === r.globString()) || i.push(r)
        : this.store.set(t, [r]);
    }
    get(t) {
      let r = this.store.get(t);
      if (!r) throw new Error("attempting to walk unknown path");
      return r;
    }
    entries() {
      return this.keys().map((t) => [t, this.store.get(t)]);
    }
    keys() {
      return [...this.store.keys()].filter((t) => t.canReaddir());
    }
  },
  Xn = class e {
    hasWalkedCache;
    matches = new wc();
    subwalks = new xc();
    patterns;
    follow;
    dot;
    opts;
    constructor(t, r) {
      (this.opts = t),
        (this.follow = !!t.follow),
        (this.dot = !!t.dot),
        (this.hasWalkedCache = r ? r.copy() : new bc());
    }
    processPatterns(t, r) {
      this.patterns = r;
      let i = r.map((n) => [t, n]);
      for (let [n, o] of i) {
        this.hasWalkedCache.storeWalked(n, o);
        let s = o.root(),
          a = o.isAbsolute() && this.opts.absolute !== !1;
        if (s) {
          n = n.resolve(s === "/" && this.opts.root !== void 0 ? this.opts.root : s);
          let h = o.rest();
          if (h) o = h;
          else {
            this.matches.add(n, !0, !1);
            continue;
          }
        }
        if (n.isENOENT()) continue;
        let c,
          u,
          l = !1;
        for (; typeof (c = o.pattern()) == "string" && (u = o.rest()); )
          (n = n.resolve(c)), (o = u), (l = !0);
        if (((c = o.pattern()), (u = o.rest()), l)) {
          if (this.hasWalkedCache.hasWalked(n, o)) continue;
          this.hasWalkedCache.storeWalked(n, o);
        }
        if (typeof c == "string") {
          let h = c === ".." || c === "" || c === ".";
          this.matches.add(n.resolve(c), a, h);
          continue;
        } else if (c === Ee) {
          (!n.isSymbolicLink() || this.follow || o.checkFollowGlobstar()) &&
            this.subwalks.add(n, o);
          let h = u?.pattern(),
            f = u?.rest();
          if (!u || ((h === "" || h === ".") && !f))
            this.matches.add(n, a, h === "" || h === ".");
          else if (h === "..") {
            let d = n.parent || n;
            f
              ? this.hasWalkedCache.hasWalked(d, f) || this.subwalks.add(d, f)
              : this.matches.add(d, a, !0);
          }
        } else c instanceof RegExp && this.subwalks.add(n, o);
      }
      return this;
    }
    subwalkTargets() {
      return this.subwalks.keys();
    }
    child() {
      return new e(this.opts, this.hasWalkedCache);
    }
    filterEntries(t, r) {
      let i = this.subwalks.get(t),
        n = this.child();
      for (let o of r)
        for (let s of i) {
          let a = s.isAbsolute(),
            c = s.pattern(),
            u = s.rest();
          c === Ee
            ? n.testGlobstar(o, s, u, a)
            : c instanceof RegExp
              ? n.testRegExp(o, c, u, a)
              : n.testString(o, c, u, a);
        }
      return n;
    }
    testGlobstar(t, r, i, n) {
      if (
        ((this.dot || !t.name.startsWith(".")) &&
          (r.hasMore() || this.matches.add(t, n, !1),
          t.canReaddir() &&
            (this.follow || !t.isSymbolicLink()
              ? this.subwalks.add(t, r)
              : t.isSymbolicLink() &&
                (i && r.checkFollowGlobstar()
                  ? this.subwalks.add(t, i)
                  : r.markFollowGlobstar() && this.subwalks.add(t, r)))),
        i)
      ) {
        let o = i.pattern();
        if (typeof o == "string" && o !== ".." && o !== "" && o !== ".")
          this.testString(t, o, i.rest(), n);
        else if (o === "..") {
          let s = t.parent || t;
          this.subwalks.add(s, i);
        } else o instanceof RegExp && this.testRegExp(t, o, i.rest(), n);
      }
    }
    testRegExp(t, r, i, n) {
      r.test(t.name) && (i ? this.subwalks.add(t, i) : this.matches.add(t, n, !1));
    }
    testString(t, r, i, n) {
      t.isNamed(r) && (i ? this.subwalks.add(t, i) : this.matches.add(t, n, !1));
    }
  };
var FS = (e, t) =>
    typeof e == "string" ? new Mr([e], t) : Array.isArray(e) ? new Mr(e, t) : e,
  So = class {
    path;
    patterns;
    opts;
    seen = new Set();
    paused = !1;
    aborted = !1;
    #e = [];
    #r;
    #o;
    signal;
    maxDepth;
    includeChildMatches;
    constructor(t, r, i) {
      if (
        ((this.patterns = t),
        (this.path = r),
        (this.opts = i),
        (this.#o = !i.posix && i.platform === "win32" ? "\\" : "/"),
        (this.includeChildMatches = i.includeChildMatches !== !1),
        (i.ignore || !this.includeChildMatches) &&
          ((this.#r = FS(i.ignore ?? [], i)),
          !this.includeChildMatches && typeof this.#r.add != "function"))
      ) {
        let n = "cannot ignore child matches, ignore lacks add() method.";
        throw new Error(n);
      }
      (this.maxDepth = i.maxDepth || 1 / 0),
        i.signal &&
          ((this.signal = i.signal),
          this.signal.addEventListener("abort", () => {
            this.#e.length = 0;
          }));
    }
    #i(t) {
      return this.seen.has(t) || !!this.#r?.ignored?.(t);
    }
    #s(t) {
      return !!this.#r?.childrenIgnored?.(t);
    }
    pause() {
      this.paused = !0;
    }
    resume() {
      if (this.signal?.aborted) return;
      this.paused = !1;
      let t;
      for (; !this.paused && (t = this.#e.shift()); ) t();
    }
    onResume(t) {
      this.signal?.aborted || (this.paused ? this.#e.push(t) : t());
    }
    async matchCheck(t, r) {
      if (r && this.opts.nodir) return;
      let i;
      if (this.opts.realpath) {
        if (((i = t.realpathCached() || (await t.realpath())), !i)) return;
        t = i;
      }
      let o = t.isUnknown() || this.opts.stat ? await t.lstat() : t;
      if (this.opts.follow && this.opts.nodir && o?.isSymbolicLink()) {
        let s = await o.realpath();
        s && (s.isUnknown() || this.opts.stat) && (await s.lstat());
      }
      return this.matchCheckTest(o, r);
    }
    matchCheckTest(t, r) {
      return t &&
        (this.maxDepth === 1 / 0 || t.depth() <= this.maxDepth) &&
        (!r || t.canReaddir()) &&
        (!this.opts.nodir || !t.isDirectory()) &&
        (!this.opts.nodir ||
          !this.opts.follow ||
          !t.isSymbolicLink() ||
          !t.realpathCached()?.isDirectory()) &&
        !this.#i(t)
        ? t
        : void 0;
    }
    matchCheckSync(t, r) {
      if (r && this.opts.nodir) return;
      let i;
      if (this.opts.realpath) {
        if (((i = t.realpathCached() || t.realpathSync()), !i)) return;
        t = i;
      }
      let o = t.isUnknown() || this.opts.stat ? t.lstatSync() : t;
      if (this.opts.follow && this.opts.nodir && o?.isSymbolicLink()) {
        let s = o.realpathSync();
        s && (s?.isUnknown() || this.opts.stat) && s.lstatSync();
      }
      return this.matchCheckTest(o, r);
    }
    matchFinish(t, r) {
      if (this.#i(t)) return;
      if (!this.includeChildMatches && this.#r?.add) {
        let o = `${t.relativePosix()}/**`;
        this.#r.add(o);
      }
      let i = this.opts.absolute === void 0 ? r : this.opts.absolute;
      this.seen.add(t);
      let n = this.opts.mark && t.isDirectory() ? this.#o : "";
      if (this.opts.withFileTypes) this.matchEmit(t);
      else if (i) {
        let o = this.opts.posix ? t.fullpathPosix() : t.fullpath();
        this.matchEmit(o + n);
      } else {
        let o = this.opts.posix ? t.relativePosix() : t.relative(),
          s =
            this.opts.dotRelative && !o.startsWith(".." + this.#o) ? "." + this.#o : "";
        this.matchEmit(o ? s + o + n : "." + n);
      }
    }
    async match(t, r, i) {
      let n = await this.matchCheck(t, i);
      n && this.matchFinish(n, r);
    }
    matchSync(t, r, i) {
      let n = this.matchCheckSync(t, i);
      n && this.matchFinish(n, r);
    }
    walkCB(t, r, i) {
      this.signal?.aborted && i(), this.walkCB2(t, r, new Xn(this.opts), i);
    }
    walkCB2(t, r, i, n) {
      if (this.#s(t)) return n();
      if ((this.signal?.aborted && n(), this.paused)) {
        this.onResume(() => this.walkCB2(t, r, i, n));
        return;
      }
      i.processPatterns(t, r);
      let o = 1,
        s = () => {
          --o === 0 && n();
        };
      for (let [a, c, u] of i.matches.entries())
        this.#i(a) || (o++, this.match(a, c, u).then(() => s()));
      for (let a of i.subwalkTargets()) {
        if (this.maxDepth !== 1 / 0 && a.depth() >= this.maxDepth) continue;
        o++;
        let c = a.readdirCached();
        a.calledReaddir()
          ? this.walkCB3(a, c, i, s)
          : a.readdirCB((u, l) => this.walkCB3(a, l, i, s), !0);
      }
      s();
    }
    walkCB3(t, r, i, n) {
      i = i.filterEntries(t, r);
      let o = 1,
        s = () => {
          --o === 0 && n();
        };
      for (let [a, c, u] of i.matches.entries())
        this.#i(a) || (o++, this.match(a, c, u).then(() => s()));
      for (let [a, c] of i.subwalks.entries()) o++, this.walkCB2(a, c, i.child(), s);
      s();
    }
    walkCBSync(t, r, i) {
      this.signal?.aborted && i(), this.walkCB2Sync(t, r, new Xn(this.opts), i);
    }
    walkCB2Sync(t, r, i, n) {
      if (this.#s(t)) return n();
      if ((this.signal?.aborted && n(), this.paused)) {
        this.onResume(() => this.walkCB2Sync(t, r, i, n));
        return;
      }
      i.processPatterns(t, r);
      let o = 1,
        s = () => {
          --o === 0 && n();
        };
      for (let [a, c, u] of i.matches.entries()) this.#i(a) || this.matchSync(a, c, u);
      for (let a of i.subwalkTargets()) {
        if (this.maxDepth !== 1 / 0 && a.depth() >= this.maxDepth) continue;
        o++;
        let c = a.readdirSync();
        this.walkCB3Sync(a, c, i, s);
      }
      s();
    }
    walkCB3Sync(t, r, i, n) {
      i = i.filterEntries(t, r);
      let o = 1,
        s = () => {
          --o === 0 && n();
        };
      for (let [a, c, u] of i.matches.entries()) this.#i(a) || this.matchSync(a, c, u);
      for (let [a, c] of i.subwalks.entries())
        o++, this.walkCB2Sync(a, c, i.child(), s);
      s();
    }
  },
  Qn = class extends So {
    matches = new Set();
    constructor(t, r, i) {
      super(t, r, i);
    }
    matchEmit(t) {
      this.matches.add(t);
    }
    async walk() {
      if (this.signal?.aborted) throw this.signal.reason;
      return (
        this.path.isUnknown() && (await this.path.lstat()),
        await new Promise((t, r) => {
          this.walkCB(this.path, this.patterns, () => {
            this.signal?.aborted ? r(this.signal.reason) : t(this.matches);
          });
        }),
        this.matches
      );
    }
    walkSync() {
      if (this.signal?.aborted) throw this.signal.reason;
      return (
        this.path.isUnknown() && this.path.lstatSync(),
        this.walkCBSync(this.path, this.patterns, () => {
          if (this.signal?.aborted) throw this.signal.reason;
        }),
        this.matches
      );
    }
  },
  ei = class extends So {
    results;
    constructor(t, r, i) {
      super(t, r, i),
        (this.results = new Vt({signal: this.signal, objectMode: !0})),
        this.results.on("drain", () => this.resume()),
        this.results.on("resume", () => this.resume());
    }
    matchEmit(t) {
      this.results.write(t), this.results.flowing || this.pause();
    }
    stream() {
      let t = this.path;
      return (
        t.isUnknown()
          ? t.lstat().then(() => {
              this.walkCB(t, this.patterns, () => this.results.end());
            })
          : this.walkCB(t, this.patterns, () => this.results.end()),
        this.results
      );
    }
    streamSync() {
      return (
        this.path.isUnknown() && this.path.lstatSync(),
        this.walkCBSync(this.path, this.patterns, () => this.results.end()),
        this.results
      );
    }
  };
var MS =
    typeof process == "object" && process && typeof process.platform == "string"
      ? process.platform
      : "linux",
  mt = class {
    absolute;
    cwd;
    root;
    dot;
    dotRelative;
    follow;
    ignore;
    magicalBraces;
    mark;
    matchBase;
    maxDepth;
    nobrace;
    nocase;
    nodir;
    noext;
    noglobstar;
    pattern;
    platform;
    realpath;
    scurry;
    stat;
    signal;
    windowsPathsNoEscape;
    withFileTypes;
    includeChildMatches;
    opts;
    patterns;
    constructor(t, r) {
      if (!r) throw new TypeError("glob options required");
      if (
        ((this.withFileTypes = !!r.withFileTypes),
        (this.signal = r.signal),
        (this.follow = !!r.follow),
        (this.dot = !!r.dot),
        (this.dotRelative = !!r.dotRelative),
        (this.nodir = !!r.nodir),
        (this.mark = !!r.mark),
        r.cwd
          ? (r.cwd instanceof URL || r.cwd.startsWith("file://")) &&
            (r.cwd = (0, Gm.fileURLToPath)(r.cwd))
          : (this.cwd = ""),
        (this.cwd = r.cwd || ""),
        (this.root = r.root),
        (this.magicalBraces = !!r.magicalBraces),
        (this.nobrace = !!r.nobrace),
        (this.noext = !!r.noext),
        (this.realpath = !!r.realpath),
        (this.absolute = r.absolute),
        (this.includeChildMatches = r.includeChildMatches !== !1),
        (this.noglobstar = !!r.noglobstar),
        (this.matchBase = !!r.matchBase),
        (this.maxDepth = typeof r.maxDepth == "number" ? r.maxDepth : 1 / 0),
        (this.stat = !!r.stat),
        (this.ignore = r.ignore),
        this.withFileTypes && this.absolute !== void 0)
      )
        throw new Error("cannot set absolute and withFileTypes:true");
      if (
        (typeof t == "string" && (t = [t]),
        (this.windowsPathsNoEscape =
          !!r.windowsPathsNoEscape || r.allowWindowsEscape === !1),
        this.windowsPathsNoEscape && (t = t.map((c) => c.replace(/\\/g, "/"))),
        this.matchBase)
      ) {
        if (r.noglobstar) throw new TypeError("base matching requires globstar");
        t = t.map((c) => (c.includes("/") ? c : `./**/${c}`));
      }
      if (
        ((this.pattern = t),
        (this.platform = r.platform || MS),
        (this.opts = {...r, platform: this.platform}),
        r.scurry)
      ) {
        if (
          ((this.scurry = r.scurry),
          r.nocase !== void 0 && r.nocase !== r.scurry.nocase)
        )
          throw new Error("nocase option contradicts provided scurry option");
      } else {
        let c =
          r.platform === "win32"
            ? Dr
            : r.platform === "darwin"
              ? Yn
              : r.platform
                ? Lr
                : Km;
        this.scurry = new c(this.cwd, {nocase: r.nocase, fs: r.fs});
      }
      this.nocase = this.scurry.nocase;
      let i = this.platform === "darwin" || this.platform === "win32",
        n = {
          ...r,
          dot: this.dot,
          matchBase: this.matchBase,
          nobrace: this.nobrace,
          nocase: this.nocase,
          nocaseMagicOnly: i,
          nocomment: !0,
          noext: this.noext,
          nonegate: !0,
          optimizationLevel: 2,
          platform: this.platform,
          windowsPathsNoEscape: this.windowsPathsNoEscape,
          debug: !!this.opts.debug,
        },
        o = this.pattern.map((c) => new Je(c, n)),
        [s, a] = o.reduce(
          (c, u) => (c[0].push(...u.set), c[1].push(...u.globParts), c),
          [[], []],
        );
      this.patterns = s.map((c, u) => {
        let l = a[u];
        if (!l) throw new Error("invalid pattern object");
        return new Fr(c, l, 0, this.platform);
      });
    }
    async walk() {
      return [
        ...(await new Qn(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth:
            this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches,
        }).walk()),
      ];
    }
    walkSync() {
      return [
        ...new Qn(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth:
            this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches,
        }).walkSync(),
      ];
    }
    stream() {
      return new ei(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth:
          this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches,
      }).stream();
    }
    streamSync() {
      return new ei(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth:
          this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches,
      }).streamSync();
    }
    iterateSync() {
      return this.streamSync()[Symbol.iterator]();
    }
    [Symbol.iterator]() {
      return this.iterateSync();
    }
    iterate() {
      return this.stream()[Symbol.asyncIterator]();
    }
    [Symbol.asyncIterator]() {
      return this.iterate();
    }
  };
var Sc = (e, t = {}) => {
  Array.isArray(e) || (e = [e]);
  for (let r of e) if (new Je(r, t).hasMagic()) return !0;
  return !1;
};
function Eo(e, t = {}) {
  return new mt(e, t).streamSync();
}
function Ym(e, t = {}) {
  return new mt(e, t).stream();
}
function Xm(e, t = {}) {
  return new mt(e, t).walkSync();
}
async function Hm(e, t = {}) {
  return new mt(e, t).walk();
}
function ko(e, t = {}) {
  return new mt(e, t).iterateSync();
}
function Qm(e, t = {}) {
  return new mt(e, t).iterate();
}
var BS = Eo,
  ZS = Object.assign(Ym, {sync: Eo}),
  qS = ko,
  VS = Object.assign(Qm, {sync: ko}),
  WS = Object.assign(Xm, {stream: Eo, iterate: ko}),
  $o = Object.assign(Hm, {
    glob: Hm,
    globSync: Xm,
    sync: WS,
    globStream: Ym,
    stream: ZS,
    globStreamSync: Eo,
    streamSync: BS,
    globIterate: Qm,
    iterate: VS,
    globIterateSync: ko,
    iterateSync: qS,
    Glob: mt,
    hasMagic: Sc,
    escape: Nr,
    unescape: dt,
  });
$o.glob = $o;
var ow = We(require("node:fs/promises")),
  sw = We(__());
var sr = {};
lt(sr, {
  $brand: () => Do,
  $input: () => sh,
  $output: () => oh,
  NEVER: () => Fc,
  TimePrecision: () => lh,
  ZodAny: () => ef,
  ZodArray: () => of,
  ZodBase64: () => ca,
  ZodBase64URL: () => ua,
  ZodBigInt: () => An,
  ZodBigIntFormat: () => da,
  ZodBoolean: () => kn,
  ZodCIDRv4: () => sa,
  ZodCIDRv6: () => aa,
  ZodCUID: () => Qs,
  ZodCUID2: () => ea,
  ZodCatch: () => Ef,
  ZodCodec: () => ba,
  ZodCustom: () => Mi,
  ZodCustomStringFormat: () => $n,
  ZodDate: () => zi,
  ZodDefault: () => yf,
  ZodDiscriminatedUnion: () => af,
  ZodE164: () => la,
  ZodEmail: () => Hs,
  ZodEmoji: () => Ys,
  ZodEnum: () => xn,
  ZodError: () => zO,
  ZodFile: () => gf,
  ZodFirstPartyTypeKind: () => Uf,
  ZodFunction: () => Rf,
  ZodGUID: () => ji,
  ZodIPv4: () => ia,
  ZodIPv6: () => oa,
  ZodISODate: () => qs,
  ZodISODateTime: () => Zs,
  ZodISODuration: () => Ws,
  ZodISOTime: () => Vs,
  ZodIntersection: () => cf,
  ZodIssueCode: () => DO,
  ZodJWT: () => ha,
  ZodKSUID: () => na,
  ZodLazy: () => jf,
  ZodLiteral: () => mf,
  ZodMAC: () => Jd,
  ZodMap: () => ff,
  ZodNaN: () => Af,
  ZodNanoID: () => Xs,
  ZodNever: () => rf,
  ZodNonOptional: () => _a,
  ZodNull: () => Xd,
  ZodNullable: () => _f,
  ZodNumber: () => En,
  ZodNumberFormat: () => Er,
  ZodObject: () => Di,
  ZodOptional: () => va,
  ZodPipe: () => ya,
  ZodPrefault: () => wf,
  ZodPromise: () => Nf,
  ZodReadonly: () => If,
  ZodRealError: () => Me,
  ZodRecord: () => Fi,
  ZodSet: () => pf,
  ZodString: () => Sn,
  ZodStringFormat: () => re,
  ZodSuccess: () => $f,
  ZodSymbol: () => Hd,
  ZodTemplateLiteral: () => Tf,
  ZodTransform: () => vf,
  ZodTuple: () => lf,
  ZodType: () => q,
  ZodULID: () => ta,
  ZodURL: () => Ci,
  ZodUUID: () => At,
  ZodUndefined: () => Yd,
  ZodUnion: () => Li,
  ZodUnknown: () => tf,
  ZodVoid: () => nf,
  ZodXID: () => ra,
  ZodXor: () => sf,
  _ZodString: () => Gs,
  _default: () => bf,
  _function: () => Kb,
  any: () => kb,
  array: () => Ui,
  base64: () => ub,
  base64url: () => lb,
  bigint: () => wb,
  boolean: () => Gd,
  catch: () => kf,
  check: () => Gb,
  cidrv4: () => ab,
  cidrv6: () => cb,
  clone: () => Re,
  codec: () => Vb,
  coerce: () => Df,
  config: () => de,
  core: () => Ut,
  cuid: () => Qy,
  cuid2: () => eb,
  custom: () => Hb,
  date: () => Ib,
  decode: () => Fd,
  decodeAsync: () => Bd,
  describe: () => Yb,
  discriminatedUnion: () => Rb,
  e164: () => hb,
  email: () => Zy,
  emoji: () => Yy,
  encode: () => Ld,
  encodeAsync: () => Md,
  endsWith: () => dn,
  enum: () => ma,
  file: () => Mb,
  flattenError: () => vi,
  float32: () => vb,
  float64: () => _b,
  formatError: () => _i,
  fromJSONSchema: () => iw,
  function: () => Kb,
  getErrorMap: () => FO,
  globalRegistry: () => Ce,
  gt: () => kt,
  gte: () => ze,
  guid: () => qy,
  hash: () => gb,
  hex: () => mb,
  hostname: () => pb,
  httpUrl: () => Hy,
  includes: () => ln,
  instanceof: () => Qb,
  int: () => Ks,
  int32: () => yb,
  int64: () => xb,
  intersection: () => uf,
  ipv4: () => ib,
  ipv6: () => sb,
  iso: () => wn,
  json: () => tw,
  jwt: () => db,
  keyof: () => Ob,
  ksuid: () => nb,
  lazy: () => Pf,
  length: () => Sr,
  literal: () => Fb,
  locales: () => Ai,
  looseObject: () => Pb,
  looseRecord: () => zb,
  lowercase: () => cn,
  lt: () => Et,
  lte: () => He,
  mac: () => ob,
  map: () => Ub,
  maxLength: () => xr,
  maxSize: () => wr,
  meta: () => Xb,
  mime: () => fn,
  minLength: () => zt,
  minSize: () => rr,
  multipleOf: () => tr,
  nan: () => qb,
  nanoid: () => Xy,
  nativeEnum: () => Lb,
  negative: () => Rs,
  never: () => fa,
  nonnegative: () => zs,
  nonoptional: () => Sf,
  nonpositive: () => Cs,
  normalize: () => pn,
  null: () => Qd,
  nullable: () => Ni,
  nullish: () => Bb,
  number: () => Kd,
  object: () => Tb,
  optional: () => Pi,
  overwrite: () => vt,
  parse: () => Cd,
  parseAsync: () => zd,
  partialRecord: () => Cb,
  pipe: () => Ri,
  positive: () => Ns,
  prefault: () => xf,
  preprocess: () => rw,
  prettifyError: () => Xc,
  promise: () => Jb,
  property: () => Us,
  readonly: () => Of,
  record: () => df,
  refine: () => Cf,
  regex: () => an,
  regexes: () => nt,
  registry: () => ds,
  safeDecode: () => qd,
  safeDecodeAsync: () => Wd,
  safeEncode: () => Zd,
  safeEncodeAsync: () => Vd,
  safeParse: () => Ud,
  safeParseAsync: () => Dd,
  set: () => Db,
  setErrorMap: () => LO,
  size: () => sn,
  slugify: () => _n,
  startsWith: () => hn,
  strictObject: () => jb,
  string: () => Js,
  stringFormat: () => fb,
  stringbool: () => ew,
  success: () => Zb,
  superRefine: () => zf,
  symbol: () => $b,
  templateLiteral: () => Wb,
  toJSONSchema: () => Fs,
  toLowerCase: () => gn,
  toUpperCase: () => vn,
  transform: () => ga,
  treeifyError: () => Yc,
  trim: () => mn,
  tuple: () => hf,
  uint32: () => bb,
  uint64: () => Sb,
  ulid: () => tb,
  undefined: () => Eb,
  union: () => pa,
  unknown: () => $r,
  uppercase: () => un,
  url: () => Gy,
  util: () => k,
  uuid: () => Vy,
  uuidv4: () => Wy,
  uuidv6: () => Jy,
  uuidv7: () => Ky,
  void: () => Ab,
  xid: () => rb,
  xor: () => Nb,
});
var Ut = {};
lt(Ut, {
  $ZodAny: () => Al,
  $ZodArray: () => Pl,
  $ZodAsyncError: () => gt,
  $ZodBase64: () => vl,
  $ZodBase64URL: () => _l,
  $ZodBigInt: () => ss,
  $ZodBigIntFormat: () => Sl,
  $ZodBoolean: () => xi,
  $ZodCIDRv4: () => pl,
  $ZodCIDRv6: () => ml,
  $ZodCUID: () => rl,
  $ZodCUID2: () => nl,
  $ZodCatch: () => Hl,
  $ZodCheck: () => ie,
  $ZodCheckBigIntFormat: () => Pu,
  $ZodCheckEndsWith: () => qu,
  $ZodCheckGreaterThan: () => Qo,
  $ZodCheckIncludes: () => Bu,
  $ZodCheckLengthEquals: () => Du,
  $ZodCheckLessThan: () => Xo,
  $ZodCheckLowerCase: () => Fu,
  $ZodCheckMaxLength: () => zu,
  $ZodCheckMaxSize: () => Nu,
  $ZodCheckMimeType: () => Wu,
  $ZodCheckMinLength: () => Uu,
  $ZodCheckMinSize: () => Ru,
  $ZodCheckMultipleOf: () => Tu,
  $ZodCheckNumberFormat: () => ju,
  $ZodCheckOverwrite: () => Ju,
  $ZodCheckProperty: () => Vu,
  $ZodCheckRegex: () => Lu,
  $ZodCheckSizeEquals: () => Cu,
  $ZodCheckStartsWith: () => Zu,
  $ZodCheckStringFormat: () => on,
  $ZodCheckUpperCase: () => Mu,
  $ZodCodec: () => $i,
  $ZodCustom: () => ih,
  $ZodCustomStringFormat: () => wl,
  $ZodDate: () => jl,
  $ZodDefault: () => Wl,
  $ZodDiscriminatedUnion: () => Cl,
  $ZodE164: () => yl,
  $ZodEmail: () => Xu,
  $ZodEmoji: () => el,
  $ZodEncodeError: () => Gt,
  $ZodEnum: () => Fl,
  $ZodError: () => gi,
  $ZodFile: () => Bl,
  $ZodFunction: () => th,
  $ZodGUID: () => Hu,
  $ZodIPv4: () => hl,
  $ZodIPv6: () => dl,
  $ZodISODate: () => cl,
  $ZodISODateTime: () => al,
  $ZodISODuration: () => ll,
  $ZodISOTime: () => ul,
  $ZodIntersection: () => zl,
  $ZodJWT: () => bl,
  $ZodKSUID: () => sl,
  $ZodLazy: () => nh,
  $ZodLiteral: () => Ml,
  $ZodMAC: () => fl,
  $ZodMap: () => Dl,
  $ZodNaN: () => Yl,
  $ZodNanoID: () => tl,
  $ZodNever: () => Ol,
  $ZodNonOptional: () => Kl,
  $ZodNull: () => kl,
  $ZodNullable: () => Vl,
  $ZodNumber: () => os,
  $ZodNumberFormat: () => xl,
  $ZodObject: () => V_,
  $ZodObjectJIT: () => Nl,
  $ZodOptional: () => ql,
  $ZodPipe: () => Xl,
  $ZodPrefault: () => Jl,
  $ZodPromise: () => rh,
  $ZodReadonly: () => Ql,
  $ZodRealError: () => Fe,
  $ZodRecord: () => Ul,
  $ZodRegistry: () => hs,
  $ZodSet: () => Ll,
  $ZodString: () => br,
  $ZodStringFormat: () => te,
  $ZodSuccess: () => Gl,
  $ZodSymbol: () => $l,
  $ZodTemplateLiteral: () => eh,
  $ZodTransform: () => Zl,
  $ZodTuple: () => as,
  $ZodType: () => Z,
  $ZodULID: () => il,
  $ZodURL: () => Qu,
  $ZodUUID: () => Yu,
  $ZodUndefined: () => El,
  $ZodUnion: () => Si,
  $ZodUnknown: () => Il,
  $ZodVoid: () => Tl,
  $ZodXID: () => ol,
  $ZodXor: () => Rl,
  $brand: () => Do,
  $constructor: () => g,
  $input: () => sh,
  $output: () => oh,
  Doc: () => wi,
  JSONSchema: () => My,
  JSONSchemaGenerator: () => Ms,
  NEVER: () => Fc,
  TimePrecision: () => lh,
  _any: () => jh,
  _array: () => Dh,
  _base64: () => Os,
  _base64url: () => Ts,
  _bigint: () => $h,
  _boolean: () => xh,
  _catch: () => IO,
  _check: () => Fy,
  _cidrv4: () => As,
  _cidrv6: () => Is,
  _coercedBigint: () => Eh,
  _coercedBoolean: () => Sh,
  _coercedDate: () => zh,
  _coercedNumber: () => gh,
  _coercedString: () => ch,
  _cuid: () => bs,
  _cuid2: () => ws,
  _custom: () => Fh,
  _date: () => Ch,
  _decode: () => qo,
  _decodeAsync: () => Wo,
  _default: () => EO,
  _discriminatedUnion: () => fO,
  _e164: () => js,
  _email: () => fs,
  _emoji: () => _s,
  _encode: () => Zo,
  _encodeAsync: () => Vo,
  _endsWith: () => dn,
  _enum: () => yO,
  _file: () => Lh,
  _float32: () => _h,
  _float64: () => yh,
  _gt: () => kt,
  _gte: () => ze,
  _guid: () => Ii,
  _includes: () => ln,
  _int: () => vh,
  _int32: () => bh,
  _int64: () => kh,
  _intersection: () => pO,
  _ipv4: () => Es,
  _ipv6: () => ks,
  _isoDate: () => dh,
  _isoDateTime: () => hh,
  _isoDuration: () => ph,
  _isoTime: () => fh,
  _jwt: () => Ps,
  _ksuid: () => $s,
  _lazy: () => PO,
  _length: () => Sr,
  _literal: () => wO,
  _lowercase: () => cn,
  _lt: () => Et,
  _lte: () => He,
  _mac: () => uh,
  _map: () => vO,
  _max: () => He,
  _maxLength: () => xr,
  _maxSize: () => wr,
  _mime: () => fn,
  _min: () => ze,
  _minLength: () => zt,
  _minSize: () => rr,
  _multipleOf: () => tr,
  _nan: () => Uh,
  _nanoid: () => ys,
  _nativeEnum: () => bO,
  _negative: () => Rs,
  _never: () => Nh,
  _nonnegative: () => zs,
  _nonoptional: () => kO,
  _nonpositive: () => Cs,
  _normalize: () => pn,
  _null: () => Th,
  _nullable: () => $O,
  _number: () => mh,
  _optional: () => SO,
  _overwrite: () => vt,
  _parse: () => en,
  _parseAsync: () => tn,
  _pipe: () => OO,
  _positive: () => Ns,
  _promise: () => NO,
  _property: () => Us,
  _readonly: () => TO,
  _record: () => gO,
  _refine: () => Mh,
  _regex: () => an,
  _safeDecode: () => Ko,
  _safeDecodeAsync: () => Ho,
  _safeEncode: () => Jo,
  _safeEncodeAsync: () => Go,
  _safeParse: () => rn,
  _safeParseAsync: () => nn,
  _set: () => _O,
  _size: () => sn,
  _slugify: () => _n,
  _startsWith: () => hn,
  _string: () => ah,
  _stringFormat: () => yn,
  _stringbool: () => Vh,
  _success: () => AO,
  _superRefine: () => Bh,
  _symbol: () => Ih,
  _templateLiteral: () => jO,
  _toLowerCase: () => gn,
  _toUpperCase: () => vn,
  _transform: () => xO,
  _trim: () => mn,
  _tuple: () => mO,
  _uint32: () => wh,
  _uint64: () => Ah,
  _ulid: () => xs,
  _undefined: () => Oh,
  _union: () => hO,
  _unknown: () => Ph,
  _uppercase: () => un,
  _url: () => Oi,
  _uuid: () => ps,
  _uuidv4: () => ms,
  _uuidv6: () => gs,
  _uuidv7: () => vs,
  _void: () => Rh,
  _xid: () => Ss,
  _xor: () => dO,
  clone: () => Re,
  config: () => de,
  createStandardJSONSchemaMethod: () => bn,
  createToJSONSchemaMethod: () => Wh,
  decode: () => jA,
  decodeAsync: () => NA,
  describe: () => Zh,
  encode: () => TA,
  encodeAsync: () => PA,
  extractDefs: () => ir,
  finalize: () => or,
  flattenError: () => vi,
  formatError: () => _i,
  globalConfig: () => ui,
  globalRegistry: () => Ce,
  initializeContext: () => nr,
  isValidBase64: () => gl,
  isValidBase64URL: () => M_,
  isValidJWT: () => B_,
  locales: () => Ai,
  meta: () => qh,
  parse: () => Mo,
  parseAsync: () => Bo,
  prettifyError: () => Xc,
  process: () => Q,
  regexes: () => nt,
  registry: () => ds,
  safeDecode: () => CA,
  safeDecodeAsync: () => UA,
  safeEncode: () => RA,
  safeEncodeAsync: () => zA,
  safeParse: () => Qc,
  safeParseAsync: () => eu,
  toDotPath: () => S_,
  toJSONSchema: () => Fs,
  treeifyError: () => Yc,
  util: () => k,
  version: () => Ku,
});
var Fc = Object.freeze({status: "aborted"});
function g(e, t, r) {
  function i(a, c) {
    if (
      (a._zod ||
        Object.defineProperty(a, "_zod", {
          value: {def: c, constr: s, traits: new Set()},
          enumerable: !1,
        }),
      a._zod.traits.has(e))
    )
      return;
    a._zod.traits.add(e), t(a, c);
    let u = s.prototype,
      l = Object.keys(u);
    for (let h = 0; h < l.length; h++) {
      let f = l[h];
      f in a || (a[f] = u[f].bind(a));
    }
  }
  let n = r?.Parent ?? Object;
  class o extends n {}
  Object.defineProperty(o, "name", {value: e});
  function s(a) {
    var c;
    let u = r?.Parent ? new o() : this;
    i(u, a), (c = u._zod).deferred ?? (c.deferred = []);
    for (let l of u._zod.deferred) l();
    return u;
  }
  return (
    Object.defineProperty(s, "init", {value: i}),
    Object.defineProperty(s, Symbol.hasInstance, {
      value: (a) => (r?.Parent && a instanceof r.Parent ? !0 : a?._zod?.traits?.has(e)),
    }),
    Object.defineProperty(s, "name", {value: e}),
    s
  );
}
var Do = Symbol("zod_brand"),
  gt = class extends Error {
    constructor() {
      super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
  },
  Gt = class extends Error {
    constructor(t) {
      super(`Encountered unidirectional transform during encode: ${t}`),
        (this.name = "ZodEncodeError");
    }
  },
  ui = {};
function de(e) {
  return e && Object.assign(ui, e), ui;
}
var k = {};
lt(k, {
  BIGINT_FORMAT_RANGES: () => Hc,
  Class: () => Bc,
  NUMBER_FORMAT_RANGES: () => Gc,
  aborted: () => er,
  allowsEval: () => Vc,
  assert: () => cA,
  assertEqual: () => iA,
  assertIs: () => sA,
  assertNever: () => aA,
  assertNotEqual: () => oA,
  assignProp: () => Yt,
  base64ToUint8Array: () => b_,
  base64urlToUint8Array: () => EA,
  cached: () => Xr,
  captureStackTrace: () => Fo,
  cleanEnum: () => $A,
  cleanRegex: () => di,
  clone: () => Re,
  cloneDef: () => lA,
  createTransparentProxy: () => gA,
  defineLazy: () => V,
  esc: () => Lo,
  escapeRegex: () => rt,
  extend: () => yA,
  finalizeIssue: () => Le,
  floatSafeRemainder: () => Zc,
  getElementAtPath: () => hA,
  getEnumValues: () => hi,
  getLengthableOrigin: () => mi,
  getParsedType: () => mA,
  getSizableOrigin: () => pi,
  hexToUint8Array: () => AA,
  isObject: () => _r,
  isPlainObject: () => Qt,
  issue: () => Qr,
  joinValues: () => y,
  jsonStringifyReplacer: () => Yr,
  merge: () => wA,
  mergeDefs: () => Xt,
  normalizeParams: () => A,
  nullish: () => Ht,
  numKeys: () => pA,
  objectClone: () => uA,
  omit: () => _A,
  optionalKeys: () => Kc,
  partial: () => xA,
  pick: () => vA,
  prefixIssues: () => Ge,
  primitiveTypes: () => Jc,
  promiseAllObject: () => dA,
  propertyKeyTypes: () => fi,
  randomString: () => fA,
  required: () => SA,
  safeExtend: () => bA,
  shallowClone: () => Wc,
  slugify: () => qc,
  stringifyPrimitive: () => E,
  uint8ArrayToBase64: () => w_,
  uint8ArrayToBase64url: () => kA,
  uint8ArrayToHex: () => IA,
  unwrapMessage: () => li,
});
function iA(e) {
  return e;
}
function oA(e) {
  return e;
}
function sA(e) {}
function aA(e) {
  throw new Error("Unexpected value in exhaustive check");
}
function cA(e) {}
function hi(e) {
  let t = Object.values(e).filter((i) => typeof i == "number");
  return Object.entries(e)
    .filter(([i, n]) => t.indexOf(+i) === -1)
    .map(([i, n]) => n);
}
function y(e, t = "|") {
  return e.map((r) => E(r)).join(t);
}
function Yr(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Xr(e) {
  return {
    get value() {
      {
        let r = e();
        return Object.defineProperty(this, "value", {value: r}), r;
      }
      throw new Error("cached value already set");
    },
  };
}
function Ht(e) {
  return e == null;
}
function di(e) {
  let t = e.startsWith("^") ? 1 : 0,
    r = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, r);
}
function Zc(e, t) {
  let r = (e.toString().split(".")[1] || "").length,
    i = t.toString(),
    n = (i.split(".")[1] || "").length;
  if (n === 0 && /\d?e-\d?/.test(i)) {
    let c = i.match(/\d?e-(\d?)/);
    c?.[1] && (n = Number.parseInt(c[1]));
  }
  let o = r > n ? r : n,
    s = Number.parseInt(e.toFixed(o).replace(".", "")),
    a = Number.parseInt(t.toFixed(o).replace(".", ""));
  return (s % a) / 10 ** o;
}
var y_ = Symbol("evaluating");
function V(e, t, r) {
  let i;
  Object.defineProperty(e, t, {
    get() {
      if (i !== y_) return i === void 0 && ((i = y_), (i = r())), i;
    },
    set(n) {
      Object.defineProperty(e, t, {value: n});
    },
    configurable: !0,
  });
}
function uA(e) {
  return Object.create(Object.getPrototypeOf(e), Object.getOwnPropertyDescriptors(e));
}
function Yt(e, t, r) {
  Object.defineProperty(e, t, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0,
  });
}
function Xt(...e) {
  let t = {};
  for (let r of e) {
    let i = Object.getOwnPropertyDescriptors(r);
    Object.assign(t, i);
  }
  return Object.defineProperties({}, t);
}
function lA(e) {
  return Xt(e._zod.def);
}
function hA(e, t) {
  return t ? t.reduce((r, i) => r?.[i], e) : e;
}
function dA(e) {
  let t = Object.keys(e),
    r = t.map((i) => e[i]);
  return Promise.all(r).then((i) => {
    let n = {};
    for (let o = 0; o < t.length; o++) n[t[o]] = i[o];
    return n;
  });
}
function fA(e = 10) {
  let t = "abcdefghijklmnopqrstuvwxyz",
    r = "";
  for (let i = 0; i < e; i++) r += t[Math.floor(Math.random() * t.length)];
  return r;
}
function Lo(e) {
  return JSON.stringify(e);
}
function qc(e) {
  return e
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
var Fo = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function _r(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
var Vc = Xr(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
  try {
    let e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function Qt(e) {
  if (_r(e) === !1) return !1;
  let t = e.constructor;
  if (t === void 0 || typeof t != "function") return !0;
  let r = t.prototype;
  return !(
    _r(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1
  );
}
function Wc(e) {
  return Qt(e) ? {...e} : Array.isArray(e) ? [...e] : e;
}
function pA(e) {
  let t = 0;
  for (let r in e) Object.prototype.hasOwnProperty.call(e, r) && t++;
  return t;
}
var mA = (e) => {
    let t = typeof e;
    switch (t) {
      case "undefined":
        return "undefined";
      case "string":
        return "string";
      case "number":
        return Number.isNaN(e) ? "nan" : "number";
      case "boolean":
        return "boolean";
      case "function":
        return "function";
      case "bigint":
        return "bigint";
      case "symbol":
        return "symbol";
      case "object":
        return Array.isArray(e)
          ? "array"
          : e === null
            ? "null"
            : e.then &&
                typeof e.then == "function" &&
                e.catch &&
                typeof e.catch == "function"
              ? "promise"
              : typeof Map < "u" && e instanceof Map
                ? "map"
                : typeof Set < "u" && e instanceof Set
                  ? "set"
                  : typeof Date < "u" && e instanceof Date
                    ? "date"
                    : typeof File < "u" && e instanceof File
                      ? "file"
                      : "object";
      default:
        throw new Error(`Unknown data type: ${t}`);
    }
  },
  fi = new Set(["string", "number", "symbol"]),
  Jc = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function rt(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Re(e, t, r) {
  let i = new e._zod.constr(t ?? e._zod.def);
  return (!t || r?.parent) && (i._zod.parent = e), i;
}
function A(e) {
  let t = e;
  if (!t) return {};
  if (typeof t == "string") return {error: () => t};
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return (
    delete t.message, typeof t.error == "string" ? {...t, error: () => t.error} : t
  );
}
function gA(e) {
  let t;
  return new Proxy(
    {},
    {
      get(r, i, n) {
        return t ?? (t = e()), Reflect.get(t, i, n);
      },
      set(r, i, n, o) {
        return t ?? (t = e()), Reflect.set(t, i, n, o);
      },
      has(r, i) {
        return t ?? (t = e()), Reflect.has(t, i);
      },
      deleteProperty(r, i) {
        return t ?? (t = e()), Reflect.deleteProperty(t, i);
      },
      ownKeys(r) {
        return t ?? (t = e()), Reflect.ownKeys(t);
      },
      getOwnPropertyDescriptor(r, i) {
        return t ?? (t = e()), Reflect.getOwnPropertyDescriptor(t, i);
      },
      defineProperty(r, i, n) {
        return t ?? (t = e()), Reflect.defineProperty(t, i, n);
      },
    },
  );
}
function E(e) {
  return typeof e == "bigint"
    ? e.toString() + "n"
    : typeof e == "string"
      ? `"${e}"`
      : `${e}`;
}
function Kc(e) {
  return Object.keys(e).filter(
    (t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional",
  );
}
var Gc = {
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-34028234663852886e22, 34028234663852886e22],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
  },
  Hc = {
    int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
    uint64: [BigInt(0), BigInt("18446744073709551615")],
  };
function vA(e, t) {
  let r = e._zod.def,
    i = Xt(e._zod.def, {
      get shape() {
        let n = {};
        for (let o in t) {
          if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
          t[o] && (n[o] = r.shape[o]);
        }
        return Yt(this, "shape", n), n;
      },
      checks: [],
    });
  return Re(e, i);
}
function _A(e, t) {
  let r = e._zod.def,
    i = Xt(e._zod.def, {
      get shape() {
        let n = {...e._zod.def.shape};
        for (let o in t) {
          if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
          t[o] && delete n[o];
        }
        return Yt(this, "shape", n), n;
      },
      checks: [],
    });
  return Re(e, i);
}
function yA(e, t) {
  if (!Qt(t)) throw new Error("Invalid input to extend: expected a plain object");
  let r = e._zod.def.checks;
  if (r && r.length > 0)
    throw new Error(
      "Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.",
    );
  let n = Xt(e._zod.def, {
    get shape() {
      let o = {...e._zod.def.shape, ...t};
      return Yt(this, "shape", o), o;
    },
    checks: [],
  });
  return Re(e, n);
}
function bA(e, t) {
  if (!Qt(t)) throw new Error("Invalid input to safeExtend: expected a plain object");
  let r = {
    ...e._zod.def,
    get shape() {
      let i = {...e._zod.def.shape, ...t};
      return Yt(this, "shape", i), i;
    },
    checks: e._zod.def.checks,
  };
  return Re(e, r);
}
function wA(e, t) {
  let r = Xt(e._zod.def, {
    get shape() {
      let i = {...e._zod.def.shape, ...t._zod.def.shape};
      return Yt(this, "shape", i), i;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: [],
  });
  return Re(e, r);
}
function xA(e, t, r) {
  let i = Xt(t._zod.def, {
    get shape() {
      let n = t._zod.def.shape,
        o = {...n};
      if (r)
        for (let s in r) {
          if (!(s in n)) throw new Error(`Unrecognized key: "${s}"`);
          r[s] && (o[s] = e ? new e({type: "optional", innerType: n[s]}) : n[s]);
        }
      else
        for (let s in n) o[s] = e ? new e({type: "optional", innerType: n[s]}) : n[s];
      return Yt(this, "shape", o), o;
    },
    checks: [],
  });
  return Re(t, i);
}
function SA(e, t, r) {
  let i = Xt(t._zod.def, {
    get shape() {
      let n = t._zod.def.shape,
        o = {...n};
      if (r)
        for (let s in r) {
          if (!(s in o)) throw new Error(`Unrecognized key: "${s}"`);
          r[s] && (o[s] = new e({type: "nonoptional", innerType: n[s]}));
        }
      else for (let s in n) o[s] = new e({type: "nonoptional", innerType: n[s]});
      return Yt(this, "shape", o), o;
    },
    checks: [],
  });
  return Re(t, i);
}
function er(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let r = t; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
  return !1;
}
function Ge(e, t) {
  return t.map((r) => {
    var i;
    return (i = r).path ?? (i.path = []), r.path.unshift(e), r;
  });
}
function li(e) {
  return typeof e == "string" ? e : e?.message;
}
function Le(e, t, r) {
  let i = {...e, path: e.path ?? []};
  if (!e.message) {
    let n =
      li(e.inst?._zod.def?.error?.(e)) ??
      li(t?.error?.(e)) ??
      li(r.customError?.(e)) ??
      li(r.localeError?.(e)) ??
      "Invalid input";
    i.message = n;
  }
  return delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
function pi(e) {
  return e instanceof Set
    ? "set"
    : e instanceof Map
      ? "map"
      : e instanceof File
        ? "file"
        : "unknown";
}
function mi(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Qr(...e) {
  let [t, r, i] = e;
  return typeof t == "string"
    ? {message: t, code: "custom", input: r, inst: i}
    : {...t};
}
function $A(e) {
  return Object.entries(e)
    .filter(([t, r]) => Number.isNaN(Number.parseInt(t, 10)))
    .map((t) => t[1]);
}
function b_(e) {
  let t = atob(e),
    r = new Uint8Array(t.length);
  for (let i = 0; i < t.length; i++) r[i] = t.charCodeAt(i);
  return r;
}
function w_(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
  return btoa(t);
}
function EA(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/"),
    r = "=".repeat((4 - (t.length % 4)) % 4);
  return b_(t + r);
}
function kA(e) {
  return w_(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function AA(e) {
  let t = e.replace(/^0x/, "");
  if (t.length % 2 !== 0) throw new Error("Invalid hex string length");
  let r = new Uint8Array(t.length / 2);
  for (let i = 0; i < t.length; i += 2)
    r[i / 2] = Number.parseInt(t.slice(i, i + 2), 16);
  return r;
}
function IA(e) {
  return Array.from(e)
    .map((t) => t.toString(16).padStart(2, "0"))
    .join("");
}
var Bc = class {
  constructor(...t) {}
};
var x_ = (e, t) => {
    (e.name = "$ZodError"),
      Object.defineProperty(e, "_zod", {value: e._zod, enumerable: !1}),
      Object.defineProperty(e, "issues", {value: t, enumerable: !1}),
      (e.message = JSON.stringify(t, Yr, 2)),
      Object.defineProperty(e, "toString", {value: () => e.message, enumerable: !1});
  },
  gi = g("$ZodError", x_),
  Fe = g("$ZodError", x_, {Parent: Error});
function vi(e, t = (r) => r.message) {
  let r = {},
    i = [];
  for (let n of e.issues)
    n.path.length > 0
      ? ((r[n.path[0]] = r[n.path[0]] || []), r[n.path[0]].push(t(n)))
      : i.push(t(n));
  return {formErrors: i, fieldErrors: r};
}
function _i(e, t = (r) => r.message) {
  let r = {_errors: []},
    i = (n) => {
      for (let o of n.issues)
        if (o.code === "invalid_union" && o.errors.length)
          o.errors.map((s) => i({issues: s}));
        else if (o.code === "invalid_key") i({issues: o.issues});
        else if (o.code === "invalid_element") i({issues: o.issues});
        else if (o.path.length === 0) r._errors.push(t(o));
        else {
          let s = r,
            a = 0;
          for (; a < o.path.length; ) {
            let c = o.path[a];
            a === o.path.length - 1
              ? ((s[c] = s[c] || {_errors: []}), s[c]._errors.push(t(o)))
              : (s[c] = s[c] || {_errors: []}),
              (s = s[c]),
              a++;
          }
        }
    };
  return i(e), r;
}
function Yc(e, t = (r) => r.message) {
  let r = {errors: []},
    i = (n, o = []) => {
      var s, a;
      for (let c of n.issues)
        if (c.code === "invalid_union" && c.errors.length)
          c.errors.map((u) => i({issues: u}, c.path));
        else if (c.code === "invalid_key") i({issues: c.issues}, c.path);
        else if (c.code === "invalid_element") i({issues: c.issues}, c.path);
        else {
          let u = [...o, ...c.path];
          if (u.length === 0) {
            r.errors.push(t(c));
            continue;
          }
          let l = r,
            h = 0;
          for (; h < u.length; ) {
            let f = u[h],
              d = h === u.length - 1;
            typeof f == "string"
              ? (l.properties ?? (l.properties = {}),
                (s = l.properties)[f] ?? (s[f] = {errors: []}),
                (l = l.properties[f]))
              : (l.items ?? (l.items = []),
                (a = l.items)[f] ?? (a[f] = {errors: []}),
                (l = l.items[f])),
              d && l.errors.push(t(c)),
              h++;
          }
        }
    };
  return i(e), r;
}
function S_(e) {
  let t = [],
    r = e.map((i) => (typeof i == "object" ? i.key : i));
  for (let i of r)
    typeof i == "number"
      ? t.push(`[${i}]`)
      : typeof i == "symbol"
        ? t.push(`[${JSON.stringify(String(i))}]`)
        : /[^\w$]/.test(i)
          ? t.push(`[${JSON.stringify(i)}]`)
          : (t.length && t.push("."), t.push(i));
  return t.join("");
}
function Xc(e) {
  let t = [],
    r = [...e.issues].sort((i, n) => (i.path ?? []).length - (n.path ?? []).length);
  for (let i of r)
    t.push(`\u2716 ${i.message}`),
      i.path?.length && t.push(`  \u2192 at ${S_(i.path)}`);
  return t.join(`
`);
}
var en = (e) => (t, r, i, n) => {
    let o = i ? Object.assign(i, {async: !1}) : {async: !1},
      s = t._zod.run({value: r, issues: []}, o);
    if (s instanceof Promise) throw new gt();
    if (s.issues.length) {
      let a = new (n?.Err ?? e)(s.issues.map((c) => Le(c, o, de())));
      throw (Fo(a, n?.callee), a);
    }
    return s.value;
  },
  Mo = en(Fe),
  tn = (e) => async (t, r, i, n) => {
    let o = i ? Object.assign(i, {async: !0}) : {async: !0},
      s = t._zod.run({value: r, issues: []}, o);
    if ((s instanceof Promise && (s = await s), s.issues.length)) {
      let a = new (n?.Err ?? e)(s.issues.map((c) => Le(c, o, de())));
      throw (Fo(a, n?.callee), a);
    }
    return s.value;
  },
  Bo = tn(Fe),
  rn = (e) => (t, r, i) => {
    let n = i ? {...i, async: !1} : {async: !1},
      o = t._zod.run({value: r, issues: []}, n);
    if (o instanceof Promise) throw new gt();
    return o.issues.length
      ? {success: !1, error: new (e ?? gi)(o.issues.map((s) => Le(s, n, de())))}
      : {success: !0, data: o.value};
  },
  Qc = rn(Fe),
  nn = (e) => async (t, r, i) => {
    let n = i ? Object.assign(i, {async: !0}) : {async: !0},
      o = t._zod.run({value: r, issues: []}, n);
    return (
      o instanceof Promise && (o = await o),
      o.issues.length
        ? {success: !1, error: new e(o.issues.map((s) => Le(s, n, de())))}
        : {success: !0, data: o.value}
    );
  },
  eu = nn(Fe),
  Zo = (e) => (t, r, i) => {
    let n = i ? Object.assign(i, {direction: "backward"}) : {direction: "backward"};
    return en(e)(t, r, n);
  },
  TA = Zo(Fe),
  qo = (e) => (t, r, i) => en(e)(t, r, i),
  jA = qo(Fe),
  Vo = (e) => async (t, r, i) => {
    let n = i ? Object.assign(i, {direction: "backward"}) : {direction: "backward"};
    return tn(e)(t, r, n);
  },
  PA = Vo(Fe),
  Wo = (e) => async (t, r, i) => tn(e)(t, r, i),
  NA = Wo(Fe),
  Jo = (e) => (t, r, i) => {
    let n = i ? Object.assign(i, {direction: "backward"}) : {direction: "backward"};
    return rn(e)(t, r, n);
  },
  RA = Jo(Fe),
  Ko = (e) => (t, r, i) => rn(e)(t, r, i),
  CA = Ko(Fe),
  Go = (e) => async (t, r, i) => {
    let n = i ? Object.assign(i, {direction: "backward"}) : {direction: "backward"};
    return nn(e)(t, r, n);
  },
  zA = Go(Fe),
  Ho = (e) => async (t, r, i) => nn(e)(t, r, i),
  UA = Ho(Fe);
var nt = {};
lt(nt, {
  base64: () => gu,
  base64url: () => Yo,
  bigint: () => xu,
  boolean: () => Eu,
  browserEmail: () => VA,
  cidrv4: () => pu,
  cidrv6: () => mu,
  cuid: () => tu,
  cuid2: () => ru,
  date: () => _u,
  datetime: () => bu,
  domain: () => KA,
  duration: () => au,
  e164: () => vu,
  email: () => uu,
  emoji: () => lu,
  extendedDuration: () => DA,
  guid: () => cu,
  hex: () => GA,
  hostname: () => JA,
  html5Email: () => BA,
  idnEmail: () => qA,
  integer: () => Su,
  ipv4: () => hu,
  ipv6: () => du,
  ksuid: () => ou,
  lowercase: () => Iu,
  mac: () => fu,
  md5_base64: () => YA,
  md5_base64url: () => XA,
  md5_hex: () => HA,
  nanoid: () => su,
  null: () => ku,
  number: () => $u,
  rfc5322Email: () => ZA,
  sha1_base64: () => eI,
  sha1_base64url: () => tI,
  sha1_hex: () => QA,
  sha256_base64: () => nI,
  sha256_base64url: () => iI,
  sha256_hex: () => rI,
  sha384_base64: () => sI,
  sha384_base64url: () => aI,
  sha384_hex: () => oI,
  sha512_base64: () => uI,
  sha512_base64url: () => lI,
  sha512_hex: () => cI,
  string: () => wu,
  time: () => yu,
  ulid: () => nu,
  undefined: () => Au,
  unicodeEmail: () => $_,
  uppercase: () => Ou,
  uuid: () => yr,
  uuid4: () => LA,
  uuid6: () => FA,
  uuid7: () => MA,
  xid: () => iu,
});
var tu = /^[cC][^\s-]{8,}$/,
  ru = /^[0-9a-z]+$/,
  nu = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  iu = /^[0-9a-vA-V]{20}$/,
  ou = /^[A-Za-z0-9]{27}$/,
  su = /^[a-zA-Z0-9_-]{21}$/,
  au =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  DA =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  cu =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  yr = (e) =>
    e
      ? new RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  LA = yr(4),
  FA = yr(6),
  MA = yr(7),
  uu =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  BA =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  ZA =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  $_ = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
  qA = $_,
  VA =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  WA = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function lu() {
  return new RegExp(WA, "u");
}
var hu =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  du =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  fu = (e) => {
    let t = rt(e ?? ":");
    return new RegExp(
      `^(?:[0-9A-F]{2}${t}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${t}){5}[0-9a-f]{2}$`,
    );
  },
  pu =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  mu =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  gu = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  Yo = /^[A-Za-z0-9_-]*$/,
  JA =
    /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
  KA = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
  vu = /^\+(?:[0-9]){6,14}[0-9]$/,
  E_ =
    "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
  _u = new RegExp(`^${E_}$`);
function k_(e) {
  let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number"
    ? e.precision === -1
      ? `${t}`
      : e.precision === 0
        ? `${t}:[0-5]\\d`
        : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function yu(e) {
  return new RegExp(`^${k_(e)}$`);
}
function bu(e) {
  let t = k_({precision: e.precision}),
    r = ["Z"];
  e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  let i = `${t}(?:${r.join("|")})`;
  return new RegExp(`^${E_}T(?:${i})$`);
}
var wu = (e) => {
    let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
    return new RegExp(`^${t}$`);
  },
  xu = /^-?\d+n?$/,
  Su = /^-?\d+$/,
  $u = /^-?\d+(?:\.\d+)?/,
  Eu = /^(?:true|false)$/i,
  ku = /^null$/i;
var Au = /^undefined$/i;
var Iu = /^[^A-Z]*$/,
  Ou = /^[^a-z]*$/,
  GA = /^[0-9a-fA-F]*$/;
function yi(e, t) {
  return new RegExp(`^[A-Za-z0-9+/]{${e}}${t}$`);
}
function bi(e) {
  return new RegExp(`^[A-Za-z0-9_-]{${e}}$`);
}
var HA = /^[0-9a-fA-F]{32}$/,
  YA = yi(22, "=="),
  XA = bi(22),
  QA = /^[0-9a-fA-F]{40}$/,
  eI = yi(27, "="),
  tI = bi(27),
  rI = /^[0-9a-fA-F]{64}$/,
  nI = yi(43, "="),
  iI = bi(43),
  oI = /^[0-9a-fA-F]{96}$/,
  sI = yi(64, ""),
  aI = bi(64),
  cI = /^[0-9a-fA-F]{128}$/,
  uI = yi(86, "=="),
  lI = bi(86);
var ie = g("$ZodCheck", (e, t) => {
    var r;
    e._zod ?? (e._zod = {}),
      (e._zod.def = t),
      (r = e._zod).onattach ?? (r.onattach = []);
  }),
  I_ = {number: "number", bigint: "bigint", object: "date"},
  Xo = g("$ZodCheckLessThan", (e, t) => {
    ie.init(e, t);
    let r = I_[typeof t.value];
    e._zod.onattach.push((i) => {
      let n = i._zod.bag,
        o = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
      t.value < o &&
        (t.inclusive ? (n.maximum = t.value) : (n.exclusiveMaximum = t.value));
    }),
      (e._zod.check = (i) => {
        (t.inclusive ? i.value <= t.value : i.value < t.value) ||
          i.issues.push({
            origin: r,
            code: "too_big",
            maximum: t.value,
            input: i.value,
            inclusive: t.inclusive,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  Qo = g("$ZodCheckGreaterThan", (e, t) => {
    ie.init(e, t);
    let r = I_[typeof t.value];
    e._zod.onattach.push((i) => {
      let n = i._zod.bag,
        o = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
      t.value > o &&
        (t.inclusive ? (n.minimum = t.value) : (n.exclusiveMinimum = t.value));
    }),
      (e._zod.check = (i) => {
        (t.inclusive ? i.value >= t.value : i.value > t.value) ||
          i.issues.push({
            origin: r,
            code: "too_small",
            minimum: t.value,
            input: i.value,
            inclusive: t.inclusive,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  Tu = g("$ZodCheckMultipleOf", (e, t) => {
    ie.init(e, t),
      e._zod.onattach.push((r) => {
        var i;
        (i = r._zod.bag).multipleOf ?? (i.multipleOf = t.value);
      }),
      (e._zod.check = (r) => {
        if (typeof r.value != typeof t.value)
          throw new Error("Cannot mix number and bigint in multiple_of check.");
        (typeof r.value == "bigint"
          ? r.value % t.value === BigInt(0)
          : Zc(r.value, t.value) === 0) ||
          r.issues.push({
            origin: typeof r.value,
            code: "not_multiple_of",
            divisor: t.value,
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  ju = g("$ZodCheckNumberFormat", (e, t) => {
    ie.init(e, t), (t.format = t.format || "float64");
    let r = t.format?.includes("int"),
      i = r ? "int" : "number",
      [n, o] = Gc[t.format];
    e._zod.onattach.push((s) => {
      let a = s._zod.bag;
      (a.format = t.format), (a.minimum = n), (a.maximum = o), r && (a.pattern = Su);
    }),
      (e._zod.check = (s) => {
        let a = s.value;
        if (r) {
          if (!Number.isInteger(a)) {
            s.issues.push({
              expected: i,
              format: t.format,
              code: "invalid_type",
              continue: !1,
              input: a,
              inst: e,
            });
            return;
          }
          if (!Number.isSafeInteger(a)) {
            a > 0
              ? s.issues.push({
                  input: a,
                  code: "too_big",
                  maximum: Number.MAX_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst: e,
                  origin: i,
                  continue: !t.abort,
                })
              : s.issues.push({
                  input: a,
                  code: "too_small",
                  minimum: Number.MIN_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst: e,
                  origin: i,
                  continue: !t.abort,
                });
            return;
          }
        }
        a < n &&
          s.issues.push({
            origin: "number",
            input: a,
            code: "too_small",
            minimum: n,
            inclusive: !0,
            inst: e,
            continue: !t.abort,
          }),
          a > o &&
            s.issues.push({
              origin: "number",
              input: a,
              code: "too_big",
              maximum: o,
              inst: e,
            });
      });
  }),
  Pu = g("$ZodCheckBigIntFormat", (e, t) => {
    ie.init(e, t);
    let [r, i] = Hc[t.format];
    e._zod.onattach.push((n) => {
      let o = n._zod.bag;
      (o.format = t.format), (o.minimum = r), (o.maximum = i);
    }),
      (e._zod.check = (n) => {
        let o = n.value;
        o < r &&
          n.issues.push({
            origin: "bigint",
            input: o,
            code: "too_small",
            minimum: r,
            inclusive: !0,
            inst: e,
            continue: !t.abort,
          }),
          o > i &&
            n.issues.push({
              origin: "bigint",
              input: o,
              code: "too_big",
              maximum: i,
              inst: e,
            });
      });
  }),
  Nu = g("$ZodCheckMaxSize", (e, t) => {
    var r;
    ie.init(e, t),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          let n = i.value;
          return !Ht(n) && n.size !== void 0;
        }),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        t.maximum < n && (i._zod.bag.maximum = t.maximum);
      }),
      (e._zod.check = (i) => {
        let n = i.value;
        n.size <= t.maximum ||
          i.issues.push({
            origin: pi(n),
            code: "too_big",
            maximum: t.maximum,
            inclusive: !0,
            input: n,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  Ru = g("$ZodCheckMinSize", (e, t) => {
    var r;
    ie.init(e, t),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          let n = i.value;
          return !Ht(n) && n.size !== void 0;
        }),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        t.minimum > n && (i._zod.bag.minimum = t.minimum);
      }),
      (e._zod.check = (i) => {
        let n = i.value;
        n.size >= t.minimum ||
          i.issues.push({
            origin: pi(n),
            code: "too_small",
            minimum: t.minimum,
            inclusive: !0,
            input: n,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  Cu = g("$ZodCheckSizeEquals", (e, t) => {
    var r;
    ie.init(e, t),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          let n = i.value;
          return !Ht(n) && n.size !== void 0;
        }),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag;
        (n.minimum = t.size), (n.maximum = t.size), (n.size = t.size);
      }),
      (e._zod.check = (i) => {
        let n = i.value,
          o = n.size;
        if (o === t.size) return;
        let s = o > t.size;
        i.issues.push({
          origin: pi(n),
          ...(s
            ? {code: "too_big", maximum: t.size}
            : {code: "too_small", minimum: t.size}),
          inclusive: !0,
          exact: !0,
          input: i.value,
          inst: e,
          continue: !t.abort,
        });
      });
  }),
  zu = g("$ZodCheckMaxLength", (e, t) => {
    var r;
    ie.init(e, t),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          let n = i.value;
          return !Ht(n) && n.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        t.maximum < n && (i._zod.bag.maximum = t.maximum);
      }),
      (e._zod.check = (i) => {
        let n = i.value;
        if (n.length <= t.maximum) return;
        let s = mi(n);
        i.issues.push({
          origin: s,
          code: "too_big",
          maximum: t.maximum,
          inclusive: !0,
          input: n,
          inst: e,
          continue: !t.abort,
        });
      });
  }),
  Uu = g("$ZodCheckMinLength", (e, t) => {
    var r;
    ie.init(e, t),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          let n = i.value;
          return !Ht(n) && n.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        t.minimum > n && (i._zod.bag.minimum = t.minimum);
      }),
      (e._zod.check = (i) => {
        let n = i.value;
        if (n.length >= t.minimum) return;
        let s = mi(n);
        i.issues.push({
          origin: s,
          code: "too_small",
          minimum: t.minimum,
          inclusive: !0,
          input: n,
          inst: e,
          continue: !t.abort,
        });
      });
  }),
  Du = g("$ZodCheckLengthEquals", (e, t) => {
    var r;
    ie.init(e, t),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          let n = i.value;
          return !Ht(n) && n.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag;
        (n.minimum = t.length), (n.maximum = t.length), (n.length = t.length);
      }),
      (e._zod.check = (i) => {
        let n = i.value,
          o = n.length;
        if (o === t.length) return;
        let s = mi(n),
          a = o > t.length;
        i.issues.push({
          origin: s,
          ...(a
            ? {code: "too_big", maximum: t.length}
            : {code: "too_small", minimum: t.length}),
          inclusive: !0,
          exact: !0,
          input: i.value,
          inst: e,
          continue: !t.abort,
        });
      });
  }),
  on = g("$ZodCheckStringFormat", (e, t) => {
    var r, i;
    ie.init(e, t),
      e._zod.onattach.push((n) => {
        let o = n._zod.bag;
        (o.format = t.format),
          t.pattern &&
            (o.patterns ?? (o.patterns = new Set()), o.patterns.add(t.pattern));
      }),
      t.pattern
        ? ((r = e._zod).check ??
          (r.check = (n) => {
            (t.pattern.lastIndex = 0),
              !t.pattern.test(n.value) &&
                n.issues.push({
                  origin: "string",
                  code: "invalid_format",
                  format: t.format,
                  input: n.value,
                  ...(t.pattern ? {pattern: t.pattern.toString()} : {}),
                  inst: e,
                  continue: !t.abort,
                });
          }))
        : ((i = e._zod).check ?? (i.check = () => {}));
  }),
  Lu = g("$ZodCheckRegex", (e, t) => {
    on.init(e, t),
      (e._zod.check = (r) => {
        (t.pattern.lastIndex = 0),
          !t.pattern.test(r.value) &&
            r.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "regex",
              input: r.value,
              pattern: t.pattern.toString(),
              inst: e,
              continue: !t.abort,
            });
      });
  }),
  Fu = g("$ZodCheckLowerCase", (e, t) => {
    t.pattern ?? (t.pattern = Iu), on.init(e, t);
  }),
  Mu = g("$ZodCheckUpperCase", (e, t) => {
    t.pattern ?? (t.pattern = Ou), on.init(e, t);
  }),
  Bu = g("$ZodCheckIncludes", (e, t) => {
    ie.init(e, t);
    let r = rt(t.includes),
      i = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${r}` : r);
    (t.pattern = i),
      e._zod.onattach.push((n) => {
        let o = n._zod.bag;
        o.patterns ?? (o.patterns = new Set()), o.patterns.add(i);
      }),
      (e._zod.check = (n) => {
        n.value.includes(t.includes, t.position) ||
          n.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: t.includes,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  Zu = g("$ZodCheckStartsWith", (e, t) => {
    ie.init(e, t);
    let r = new RegExp(`^${rt(t.prefix)}.*`);
    t.pattern ?? (t.pattern = r),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag;
        n.patterns ?? (n.patterns = new Set()), n.patterns.add(r);
      }),
      (e._zod.check = (i) => {
        i.value.startsWith(t.prefix) ||
          i.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: t.prefix,
            input: i.value,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  qu = g("$ZodCheckEndsWith", (e, t) => {
    ie.init(e, t);
    let r = new RegExp(`.*${rt(t.suffix)}$`);
    t.pattern ?? (t.pattern = r),
      e._zod.onattach.push((i) => {
        let n = i._zod.bag;
        n.patterns ?? (n.patterns = new Set()), n.patterns.add(r);
      }),
      (e._zod.check = (i) => {
        i.value.endsWith(t.suffix) ||
          i.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: t.suffix,
            input: i.value,
            inst: e,
            continue: !t.abort,
          });
      });
  });
function A_(e, t, r) {
  e.issues.length && t.issues.push(...Ge(r, e.issues));
}
var Vu = g("$ZodCheckProperty", (e, t) => {
    ie.init(e, t),
      (e._zod.check = (r) => {
        let i = t.schema._zod.run({value: r.value[t.property], issues: []}, {});
        if (i instanceof Promise) return i.then((n) => A_(n, r, t.property));
        A_(i, r, t.property);
      });
  }),
  Wu = g("$ZodCheckMimeType", (e, t) => {
    ie.init(e, t);
    let r = new Set(t.mime);
    e._zod.onattach.push((i) => {
      i._zod.bag.mime = t.mime;
    }),
      (e._zod.check = (i) => {
        r.has(i.value.type) ||
          i.issues.push({
            code: "invalid_value",
            values: t.mime,
            input: i.value.type,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  Ju = g("$ZodCheckOverwrite", (e, t) => {
    ie.init(e, t),
      (e._zod.check = (r) => {
        r.value = t.tx(r.value);
      });
  });
var wi = class {
  constructor(t = []) {
    (this.content = []), (this.indent = 0), this && (this.args = t);
  }
  indented(t) {
    (this.indent += 1), t(this), (this.indent -= 1);
  }
  write(t) {
    if (typeof t == "function") {
      t(this, {execution: "sync"}), t(this, {execution: "async"});
      return;
    }
    let i = t
        .split(`
`)
        .filter((s) => s),
      n = Math.min(...i.map((s) => s.length - s.trimStart().length)),
      o = i.map((s) => s.slice(n)).map((s) => " ".repeat(this.indent * 2) + s);
    for (let s of o) this.content.push(s);
  }
  compile() {
    let t = Function,
      r = this?.args,
      n = [...(this?.content ?? [""]).map((o) => `  ${o}`)];
    return new t(
      ...r,
      n.join(`
`),
    );
  }
};
var Ku = {major: 4, minor: 2, patch: 1};
var Z = g("$ZodType", (e, t) => {
    var r;
    e ?? (e = {}),
      (e._zod.def = t),
      (e._zod.bag = e._zod.bag || {}),
      (e._zod.version = Ku);
    let i = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has("$ZodCheck") && i.unshift(e);
    for (let n of i) for (let o of n._zod.onattach) o(e);
    if (i.length === 0)
      (r = e._zod).deferred ?? (r.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse;
        });
    else {
      let n = (s, a, c) => {
          let u = er(s),
            l;
          for (let h of a) {
            if (h._zod.def.when) {
              if (!h._zod.def.when(s)) continue;
            } else if (u) continue;
            let f = s.issues.length,
              d = h._zod.check(s);
            if (d instanceof Promise && c?.async === !1) throw new gt();
            if (l || d instanceof Promise)
              l = (l ?? Promise.resolve()).then(async () => {
                await d, s.issues.length !== f && (u || (u = er(s, f)));
              });
            else {
              if (s.issues.length === f) continue;
              u || (u = er(s, f));
            }
          }
          return l ? l.then(() => s) : s;
        },
        o = (s, a, c) => {
          if (er(s)) return (s.aborted = !0), s;
          let u = n(a, i, c);
          if (u instanceof Promise) {
            if (c.async === !1) throw new gt();
            return u.then((l) => e._zod.parse(l, c));
          }
          return e._zod.parse(u, c);
        };
      e._zod.run = (s, a) => {
        if (a.skipChecks) return e._zod.parse(s, a);
        if (a.direction === "backward") {
          let u = e._zod.parse({value: s.value, issues: []}, {...a, skipChecks: !0});
          return u instanceof Promise ? u.then((l) => o(l, s, a)) : o(u, s, a);
        }
        let c = e._zod.parse(s, a);
        if (c instanceof Promise) {
          if (a.async === !1) throw new gt();
          return c.then((u) => n(u, i, a));
        }
        return n(c, i, a);
      };
    }
    e["~standard"] = {
      validate: (n) => {
        try {
          let o = Qc(e, n);
          return o.success ? {value: o.data} : {issues: o.error?.issues};
        } catch {
          return eu(e, n).then((s) =>
            s.success ? {value: s.data} : {issues: s.error?.issues},
          );
        }
      },
      vendor: "zod",
      version: 1,
    };
  }),
  br = g("$ZodString", (e, t) => {
    Z.init(e, t),
      (e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? wu(e._zod.bag)),
      (e._zod.parse = (r, i) => {
        if (t.coerce)
          try {
            r.value = String(r.value);
          } catch {}
        return (
          typeof r.value == "string" ||
            r.issues.push({
              expected: "string",
              code: "invalid_type",
              input: r.value,
              inst: e,
            }),
          r
        );
      });
  }),
  te = g("$ZodStringFormat", (e, t) => {
    on.init(e, t), br.init(e, t);
  }),
  Hu = g("$ZodGUID", (e, t) => {
    t.pattern ?? (t.pattern = cu), te.init(e, t);
  }),
  Yu = g("$ZodUUID", (e, t) => {
    if (t.version) {
      let i = {v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8}[t.version];
      if (i === void 0) throw new Error(`Invalid UUID version: "${t.version}"`);
      t.pattern ?? (t.pattern = yr(i));
    } else t.pattern ?? (t.pattern = yr());
    te.init(e, t);
  }),
  Xu = g("$ZodEmail", (e, t) => {
    t.pattern ?? (t.pattern = uu), te.init(e, t);
  }),
  Qu = g("$ZodURL", (e, t) => {
    te.init(e, t),
      (e._zod.check = (r) => {
        try {
          let i = r.value.trim(),
            n = new URL(i);
          t.hostname &&
            ((t.hostname.lastIndex = 0),
            t.hostname.test(n.hostname) ||
              r.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: t.hostname.source,
                input: r.value,
                inst: e,
                continue: !t.abort,
              })),
            t.protocol &&
              ((t.protocol.lastIndex = 0),
              t.protocol.test(
                n.protocol.endsWith(":") ? n.protocol.slice(0, -1) : n.protocol,
              ) ||
                r.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid protocol",
                  pattern: t.protocol.source,
                  input: r.value,
                  inst: e,
                  continue: !t.abort,
                })),
            t.normalize ? (r.value = n.href) : (r.value = i);
          return;
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "url",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
        }
      });
  }),
  el = g("$ZodEmoji", (e, t) => {
    t.pattern ?? (t.pattern = lu()), te.init(e, t);
  }),
  tl = g("$ZodNanoID", (e, t) => {
    t.pattern ?? (t.pattern = su), te.init(e, t);
  }),
  rl = g("$ZodCUID", (e, t) => {
    t.pattern ?? (t.pattern = tu), te.init(e, t);
  }),
  nl = g("$ZodCUID2", (e, t) => {
    t.pattern ?? (t.pattern = ru), te.init(e, t);
  }),
  il = g("$ZodULID", (e, t) => {
    t.pattern ?? (t.pattern = nu), te.init(e, t);
  }),
  ol = g("$ZodXID", (e, t) => {
    t.pattern ?? (t.pattern = iu), te.init(e, t);
  }),
  sl = g("$ZodKSUID", (e, t) => {
    t.pattern ?? (t.pattern = ou), te.init(e, t);
  }),
  al = g("$ZodISODateTime", (e, t) => {
    t.pattern ?? (t.pattern = bu(t)), te.init(e, t);
  }),
  cl = g("$ZodISODate", (e, t) => {
    t.pattern ?? (t.pattern = _u), te.init(e, t);
  }),
  ul = g("$ZodISOTime", (e, t) => {
    t.pattern ?? (t.pattern = yu(t)), te.init(e, t);
  }),
  ll = g("$ZodISODuration", (e, t) => {
    t.pattern ?? (t.pattern = au), te.init(e, t);
  }),
  hl = g("$ZodIPv4", (e, t) => {
    t.pattern ?? (t.pattern = hu), te.init(e, t), (e._zod.bag.format = "ipv4");
  }),
  dl = g("$ZodIPv6", (e, t) => {
    t.pattern ?? (t.pattern = du),
      te.init(e, t),
      (e._zod.bag.format = "ipv6"),
      (e._zod.check = (r) => {
        try {
          new URL(`http://[${r.value}]`);
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
        }
      });
  }),
  fl = g("$ZodMAC", (e, t) => {
    t.pattern ?? (t.pattern = fu(t.delimiter)),
      te.init(e, t),
      (e._zod.bag.format = "mac");
  }),
  pl = g("$ZodCIDRv4", (e, t) => {
    t.pattern ?? (t.pattern = pu), te.init(e, t);
  }),
  ml = g("$ZodCIDRv6", (e, t) => {
    t.pattern ?? (t.pattern = mu),
      te.init(e, t),
      (e._zod.check = (r) => {
        let i = r.value.split("/");
        try {
          if (i.length !== 2) throw new Error();
          let [n, o] = i;
          if (!o) throw new Error();
          let s = Number(o);
          if (`${s}` !== o) throw new Error();
          if (s < 0 || s > 128) throw new Error();
          new URL(`http://[${n}]`);
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
        }
      });
  });
function gl(e) {
  if (e === "") return !0;
  if (e.length % 4 !== 0) return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
var vl = g("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = gu),
    te.init(e, t),
    (e._zod.bag.contentEncoding = "base64"),
    (e._zod.check = (r) => {
      gl(r.value) ||
        r.issues.push({
          code: "invalid_format",
          format: "base64",
          input: r.value,
          inst: e,
          continue: !t.abort,
        });
    });
});
function M_(e) {
  if (!Yo.test(e)) return !1;
  let t = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/")),
    r = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return gl(r);
}
var _l = g("$ZodBase64URL", (e, t) => {
    t.pattern ?? (t.pattern = Yo),
      te.init(e, t),
      (e._zod.bag.contentEncoding = "base64url"),
      (e._zod.check = (r) => {
        M_(r.value) ||
          r.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  yl = g("$ZodE164", (e, t) => {
    t.pattern ?? (t.pattern = vu), te.init(e, t);
  });
function B_(e, t = null) {
  try {
    let r = e.split(".");
    if (r.length !== 3) return !1;
    let [i] = r;
    if (!i) return !1;
    let n = JSON.parse(atob(i));
    return !(
      ("typ" in n && n?.typ !== "JWT") ||
      !n.alg ||
      (t && (!("alg" in n) || n.alg !== t))
    );
  } catch {
    return !1;
  }
}
var bl = g("$ZodJWT", (e, t) => {
    te.init(e, t),
      (e._zod.check = (r) => {
        B_(r.value, t.alg) ||
          r.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  wl = g("$ZodCustomStringFormat", (e, t) => {
    te.init(e, t),
      (e._zod.check = (r) => {
        t.fn(r.value) ||
          r.issues.push({
            code: "invalid_format",
            format: t.format,
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      });
  }),
  os = g("$ZodNumber", (e, t) => {
    Z.init(e, t),
      (e._zod.pattern = e._zod.bag.pattern ?? $u),
      (e._zod.parse = (r, i) => {
        if (t.coerce)
          try {
            r.value = Number(r.value);
          } catch {}
        let n = r.value;
        if (typeof n == "number" && !Number.isNaN(n) && Number.isFinite(n)) return r;
        let o =
          typeof n == "number"
            ? Number.isNaN(n)
              ? "NaN"
              : Number.isFinite(n)
                ? void 0
                : "Infinity"
            : void 0;
        return (
          r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: n,
            inst: e,
            ...(o ? {received: o} : {}),
          }),
          r
        );
      });
  }),
  xl = g("$ZodNumberFormat", (e, t) => {
    ju.init(e, t), os.init(e, t);
  }),
  xi = g("$ZodBoolean", (e, t) => {
    Z.init(e, t),
      (e._zod.pattern = Eu),
      (e._zod.parse = (r, i) => {
        if (t.coerce)
          try {
            r.value = !!r.value;
          } catch {}
        let n = r.value;
        return (
          typeof n == "boolean" ||
            r.issues.push({
              expected: "boolean",
              code: "invalid_type",
              input: n,
              inst: e,
            }),
          r
        );
      });
  }),
  ss = g("$ZodBigInt", (e, t) => {
    Z.init(e, t),
      (e._zod.pattern = xu),
      (e._zod.parse = (r, i) => {
        if (t.coerce)
          try {
            r.value = BigInt(r.value);
          } catch {}
        return (
          typeof r.value == "bigint" ||
            r.issues.push({
              expected: "bigint",
              code: "invalid_type",
              input: r.value,
              inst: e,
            }),
          r
        );
      });
  }),
  Sl = g("$ZodBigIntFormat", (e, t) => {
    Pu.init(e, t), ss.init(e, t);
  }),
  $l = g("$ZodSymbol", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        let n = r.value;
        return (
          typeof n == "symbol" ||
            r.issues.push({
              expected: "symbol",
              code: "invalid_type",
              input: n,
              inst: e,
            }),
          r
        );
      });
  }),
  El = g("$ZodUndefined", (e, t) => {
    Z.init(e, t),
      (e._zod.pattern = Au),
      (e._zod.values = new Set([void 0])),
      (e._zod.optin = "optional"),
      (e._zod.optout = "optional"),
      (e._zod.parse = (r, i) => {
        let n = r.value;
        return (
          typeof n > "u" ||
            r.issues.push({
              expected: "undefined",
              code: "invalid_type",
              input: n,
              inst: e,
            }),
          r
        );
      });
  }),
  kl = g("$ZodNull", (e, t) => {
    Z.init(e, t),
      (e._zod.pattern = ku),
      (e._zod.values = new Set([null])),
      (e._zod.parse = (r, i) => {
        let n = r.value;
        return (
          n === null ||
            r.issues.push({expected: "null", code: "invalid_type", input: n, inst: e}),
          r
        );
      });
  }),
  Al = g("$ZodAny", (e, t) => {
    Z.init(e, t), (e._zod.parse = (r) => r);
  }),
  Il = g("$ZodUnknown", (e, t) => {
    Z.init(e, t), (e._zod.parse = (r) => r);
  }),
  Ol = g("$ZodNever", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => (
        r.issues.push({
          expected: "never",
          code: "invalid_type",
          input: r.value,
          inst: e,
        }),
        r
      ));
  }),
  Tl = g("$ZodVoid", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        let n = r.value;
        return (
          typeof n > "u" ||
            r.issues.push({expected: "void", code: "invalid_type", input: n, inst: e}),
          r
        );
      });
  }),
  jl = g("$ZodDate", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        if (t.coerce)
          try {
            r.value = new Date(r.value);
          } catch {}
        let n = r.value,
          o = n instanceof Date;
        return (
          (o && !Number.isNaN(n.getTime())) ||
            r.issues.push({
              expected: "date",
              code: "invalid_type",
              input: n,
              ...(o ? {received: "Invalid Date"} : {}),
              inst: e,
            }),
          r
        );
      });
  });
function T_(e, t, r) {
  e.issues.length && t.issues.push(...Ge(r, e.issues)), (t.value[r] = e.value);
}
var Pl = g("$ZodArray", (e, t) => {
  Z.init(e, t),
    (e._zod.parse = (r, i) => {
      let n = r.value;
      if (!Array.isArray(n))
        return (
          r.issues.push({expected: "array", code: "invalid_type", input: n, inst: e}), r
        );
      r.value = Array(n.length);
      let o = [];
      for (let s = 0; s < n.length; s++) {
        let a = n[s],
          c = t.element._zod.run({value: a, issues: []}, i);
        c instanceof Promise ? o.push(c.then((u) => T_(u, r, s))) : T_(c, r, s);
      }
      return o.length ? Promise.all(o).then(() => r) : r;
    });
});
function is(e, t, r, i) {
  e.issues.length && t.issues.push(...Ge(r, e.issues)),
    e.value === void 0 ? r in i && (t.value[r] = void 0) : (t.value[r] = e.value);
}
function Z_(e) {
  let t = Object.keys(e.shape);
  for (let i of t)
    if (!e.shape?.[i]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${i}": expected a Zod schema`);
  let r = Kc(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(r),
  };
}
function q_(e, t, r, i, n, o) {
  let s = [],
    a = n.keySet,
    c = n.catchall._zod,
    u = c.def.type;
  for (let l in t) {
    if (a.has(l)) continue;
    if (u === "never") {
      s.push(l);
      continue;
    }
    let h = c.run({value: t[l], issues: []}, i);
    h instanceof Promise ? e.push(h.then((f) => is(f, r, l, t))) : is(h, r, l, t);
  }
  return (
    s.length && r.issues.push({code: "unrecognized_keys", keys: s, input: t, inst: o}),
    e.length ? Promise.all(e).then(() => r) : r
  );
}
var V_ = g("$ZodObject", (e, t) => {
    if ((Z.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get)) {
      let a = t.shape;
      Object.defineProperty(t, "shape", {
        get: () => {
          let c = {...a};
          return Object.defineProperty(t, "shape", {value: c}), c;
        },
      });
    }
    let i = Xr(() => Z_(t));
    V(e._zod, "propValues", () => {
      let a = t.shape,
        c = {};
      for (let u in a) {
        let l = a[u]._zod;
        if (l.values) {
          c[u] ?? (c[u] = new Set());
          for (let h of l.values) c[u].add(h);
        }
      }
      return c;
    });
    let n = _r,
      o = t.catchall,
      s;
    e._zod.parse = (a, c) => {
      s ?? (s = i.value);
      let u = a.value;
      if (!n(u))
        return (
          a.issues.push({expected: "object", code: "invalid_type", input: u, inst: e}),
          a
        );
      a.value = {};
      let l = [],
        h = s.shape;
      for (let f of s.keys) {
        let p = h[f]._zod.run({value: u[f], issues: []}, c);
        p instanceof Promise ? l.push(p.then((m) => is(m, a, f, u))) : is(p, a, f, u);
      }
      return o
        ? q_(l, u, a, c, i.value, e)
        : l.length
          ? Promise.all(l).then(() => a)
          : a;
    };
  }),
  Nl = g("$ZodObjectJIT", (e, t) => {
    V_.init(e, t);
    let r = e._zod.parse,
      i = Xr(() => Z_(t)),
      n = (f) => {
        let d = new wi(["shape", "payload", "ctx"]),
          p = i.value,
          m = (b) => {
            let x = Lo(b);
            return `shape[${x}]._zod.run({ value: input[${x}], issues: [] }, ctx)`;
          };
        d.write("const input = payload.value;");
        let v = Object.create(null),
          w = 0;
        for (let b of p.keys) v[b] = `key_${w++}`;
        d.write("const newResult = {};");
        for (let b of p.keys) {
          let x = v[b],
            D = Lo(b);
          d.write(`const ${x} = ${m(b)};`),
            d.write(`
        if (${x}.issues.length) {
          payload.issues = payload.issues.concat(${x}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${D}, ...iss.path] : [${D}]
          })));
        }
        
        
        if (${x}.value === undefined) {
          if (${D} in input) {
            newResult[${D}] = undefined;
          }
        } else {
          newResult[${D}] = ${x}.value;
        }
        
      `);
        }
        d.write("payload.value = newResult;"), d.write("return payload;");
        let $ = d.compile();
        return (b, x) => $(f, b, x);
      },
      o,
      s = _r,
      a = !ui.jitless,
      u = a && Vc.value,
      l = t.catchall,
      h;
    e._zod.parse = (f, d) => {
      h ?? (h = i.value);
      let p = f.value;
      return s(p)
        ? a && u && d?.async === !1 && d.jitless !== !0
          ? (o || (o = n(t.shape)), (f = o(f, d)), l ? q_([], p, f, d, h, e) : f)
          : r(f, d)
        : (f.issues.push({expected: "object", code: "invalid_type", input: p, inst: e}),
          f);
    };
  });
function j_(e, t, r, i) {
  for (let o of e) if (o.issues.length === 0) return (t.value = o.value), t;
  let n = e.filter((o) => !er(o));
  return n.length === 1
    ? ((t.value = n[0].value), n[0])
    : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((o) => o.issues.map((s) => Le(s, i, de()))),
      }),
      t);
}
var Si = g("$ZodUnion", (e, t) => {
  Z.init(e, t),
    V(e._zod, "optin", () =>
      t.options.some((n) => n._zod.optin === "optional") ? "optional" : void 0,
    ),
    V(e._zod, "optout", () =>
      t.options.some((n) => n._zod.optout === "optional") ? "optional" : void 0,
    ),
    V(e._zod, "values", () => {
      if (t.options.every((n) => n._zod.values))
        return new Set(t.options.flatMap((n) => Array.from(n._zod.values)));
    }),
    V(e._zod, "pattern", () => {
      if (t.options.every((n) => n._zod.pattern)) {
        let n = t.options.map((o) => o._zod.pattern);
        return new RegExp(`^(${n.map((o) => di(o.source)).join("|")})$`);
      }
    });
  let r = t.options.length === 1,
    i = t.options[0]._zod.run;
  e._zod.parse = (n, o) => {
    if (r) return i(n, o);
    let s = !1,
      a = [];
    for (let c of t.options) {
      let u = c._zod.run({value: n.value, issues: []}, o);
      if (u instanceof Promise) a.push(u), (s = !0);
      else {
        if (u.issues.length === 0) return u;
        a.push(u);
      }
    }
    return s ? Promise.all(a).then((c) => j_(c, n, e, o)) : j_(a, n, e, o);
  };
});
function P_(e, t, r, i) {
  let n = e.filter((o) => o.issues.length === 0);
  return n.length === 1
    ? ((t.value = n[0].value), t)
    : (n.length === 0
        ? t.issues.push({
            code: "invalid_union",
            input: t.value,
            inst: r,
            errors: e.map((o) => o.issues.map((s) => Le(s, i, de()))),
          })
        : t.issues.push({
            code: "invalid_union",
            input: t.value,
            inst: r,
            errors: [],
            inclusive: !1,
          }),
      t);
}
var Rl = g("$ZodXor", (e, t) => {
    Si.init(e, t), (t.inclusive = !1);
    let r = t.options.length === 1,
      i = t.options[0]._zod.run;
    e._zod.parse = (n, o) => {
      if (r) return i(n, o);
      let s = !1,
        a = [];
      for (let c of t.options) {
        let u = c._zod.run({value: n.value, issues: []}, o);
        u instanceof Promise ? (a.push(u), (s = !0)) : a.push(u);
      }
      return s ? Promise.all(a).then((c) => P_(c, n, e, o)) : P_(a, n, e, o);
    };
  }),
  Cl = g("$ZodDiscriminatedUnion", (e, t) => {
    (t.inclusive = !1), Si.init(e, t);
    let r = e._zod.parse;
    V(e._zod, "propValues", () => {
      let n = {};
      for (let o of t.options) {
        let s = o._zod.propValues;
        if (!s || Object.keys(s).length === 0)
          throw new Error(
            `Invalid discriminated union option at index "${t.options.indexOf(o)}"`,
          );
        for (let [a, c] of Object.entries(s)) {
          n[a] || (n[a] = new Set());
          for (let u of c) n[a].add(u);
        }
      }
      return n;
    });
    let i = Xr(() => {
      let n = t.options,
        o = new Map();
      for (let s of n) {
        let a = s._zod.propValues?.[t.discriminator];
        if (!a || a.size === 0)
          throw new Error(
            `Invalid discriminated union option at index "${t.options.indexOf(s)}"`,
          );
        for (let c of a) {
          if (o.has(c)) throw new Error(`Duplicate discriminator value "${String(c)}"`);
          o.set(c, s);
        }
      }
      return o;
    });
    e._zod.parse = (n, o) => {
      let s = n.value;
      if (!_r(s))
        return (
          n.issues.push({code: "invalid_type", expected: "object", input: s, inst: e}),
          n
        );
      let a = i.value.get(s?.[t.discriminator]);
      return a
        ? a._zod.run(n, o)
        : t.unionFallback
          ? r(n, o)
          : (n.issues.push({
              code: "invalid_union",
              errors: [],
              note: "No matching discriminator",
              discriminator: t.discriminator,
              input: s,
              path: [t.discriminator],
              inst: e,
            }),
            n);
    };
  }),
  zl = g("$ZodIntersection", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        let n = r.value,
          o = t.left._zod.run({value: n, issues: []}, i),
          s = t.right._zod.run({value: n, issues: []}, i);
        return o instanceof Promise || s instanceof Promise
          ? Promise.all([o, s]).then(([c, u]) => N_(r, c, u))
          : N_(r, o, s);
      });
  });
function Gu(e, t) {
  if (e === t) return {valid: !0, data: e};
  if (e instanceof Date && t instanceof Date && +e == +t) return {valid: !0, data: e};
  if (Qt(e) && Qt(t)) {
    let r = Object.keys(t),
      i = Object.keys(e).filter((o) => r.indexOf(o) !== -1),
      n = {...e, ...t};
    for (let o of i) {
      let s = Gu(e[o], t[o]);
      if (!s.valid) return {valid: !1, mergeErrorPath: [o, ...s.mergeErrorPath]};
      n[o] = s.data;
    }
    return {valid: !0, data: n};
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return {valid: !1, mergeErrorPath: []};
    let r = [];
    for (let i = 0; i < e.length; i++) {
      let n = e[i],
        o = t[i],
        s = Gu(n, o);
      if (!s.valid) return {valid: !1, mergeErrorPath: [i, ...s.mergeErrorPath]};
      r.push(s.data);
    }
    return {valid: !0, data: r};
  }
  return {valid: !1, mergeErrorPath: []};
}
function N_(e, t, r) {
  if (
    (t.issues.length && e.issues.push(...t.issues),
    r.issues.length && e.issues.push(...r.issues),
    er(e))
  )
    return e;
  let i = Gu(t.value, r.value);
  if (!i.valid)
    throw new Error(
      `Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`,
    );
  return (e.value = i.data), e;
}
var as = g("$ZodTuple", (e, t) => {
  Z.init(e, t);
  let r = t.items;
  e._zod.parse = (i, n) => {
    let o = i.value;
    if (!Array.isArray(o))
      return (
        i.issues.push({input: o, inst: e, expected: "tuple", code: "invalid_type"}), i
      );
    i.value = [];
    let s = [],
      a = [...r].reverse().findIndex((l) => l._zod.optin !== "optional"),
      c = a === -1 ? 0 : r.length - a;
    if (!t.rest) {
      let l = o.length > r.length,
        h = o.length < c - 1;
      if (l || h)
        return (
          i.issues.push({
            ...(l
              ? {code: "too_big", maximum: r.length}
              : {code: "too_small", minimum: r.length}),
            input: o,
            inst: e,
            origin: "array",
          }),
          i
        );
    }
    let u = -1;
    for (let l of r) {
      if ((u++, u >= o.length && u >= c)) continue;
      let h = l._zod.run({value: o[u], issues: []}, n);
      h instanceof Promise ? s.push(h.then((f) => es(f, i, u))) : es(h, i, u);
    }
    if (t.rest) {
      let l = o.slice(r.length);
      for (let h of l) {
        u++;
        let f = t.rest._zod.run({value: h, issues: []}, n);
        f instanceof Promise ? s.push(f.then((d) => es(d, i, u))) : es(f, i, u);
      }
    }
    return s.length ? Promise.all(s).then(() => i) : i;
  };
});
function es(e, t, r) {
  e.issues.length && t.issues.push(...Ge(r, e.issues)), (t.value[r] = e.value);
}
var Ul = g("$ZodRecord", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        let n = r.value;
        if (!Qt(n))
          return (
            r.issues.push({
              expected: "record",
              code: "invalid_type",
              input: n,
              inst: e,
            }),
            r
          );
        let o = [],
          s = t.keyType._zod.values;
        if (s) {
          r.value = {};
          let a = new Set();
          for (let u of s)
            if (typeof u == "string" || typeof u == "number" || typeof u == "symbol") {
              a.add(typeof u == "number" ? u.toString() : u);
              let l = t.valueType._zod.run({value: n[u], issues: []}, i);
              l instanceof Promise
                ? o.push(
                    l.then((h) => {
                      h.issues.length && r.issues.push(...Ge(u, h.issues)),
                        (r.value[u] = h.value);
                    }),
                  )
                : (l.issues.length && r.issues.push(...Ge(u, l.issues)),
                  (r.value[u] = l.value));
            }
          let c;
          for (let u in n) a.has(u) || ((c = c ?? []), c.push(u));
          c &&
            c.length > 0 &&
            r.issues.push({code: "unrecognized_keys", input: n, inst: e, keys: c});
        } else {
          r.value = {};
          for (let a of Reflect.ownKeys(n)) {
            if (a === "__proto__") continue;
            let c = t.keyType._zod.run({value: a, issues: []}, i);
            if (c instanceof Promise)
              throw new Error("Async schemas not supported in object keys currently");
            if (c.issues.length) {
              t.mode === "loose"
                ? (r.value[a] = n[a])
                : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: c.issues.map((l) => Le(l, i, de())),
                    input: a,
                    path: [a],
                    inst: e,
                  });
              continue;
            }
            let u = t.valueType._zod.run({value: n[a], issues: []}, i);
            u instanceof Promise
              ? o.push(
                  u.then((l) => {
                    l.issues.length && r.issues.push(...Ge(a, l.issues)),
                      (r.value[c.value] = l.value);
                  }),
                )
              : (u.issues.length && r.issues.push(...Ge(a, u.issues)),
                (r.value[c.value] = u.value));
          }
        }
        return o.length ? Promise.all(o).then(() => r) : r;
      });
  }),
  Dl = g("$ZodMap", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        let n = r.value;
        if (!(n instanceof Map))
          return (
            r.issues.push({expected: "map", code: "invalid_type", input: n, inst: e}), r
          );
        let o = [];
        r.value = new Map();
        for (let [s, a] of n) {
          let c = t.keyType._zod.run({value: s, issues: []}, i),
            u = t.valueType._zod.run({value: a, issues: []}, i);
          c instanceof Promise || u instanceof Promise
            ? o.push(
                Promise.all([c, u]).then(([l, h]) => {
                  R_(l, h, r, s, n, e, i);
                }),
              )
            : R_(c, u, r, s, n, e, i);
        }
        return o.length ? Promise.all(o).then(() => r) : r;
      });
  });
function R_(e, t, r, i, n, o, s) {
  e.issues.length &&
    (fi.has(typeof i)
      ? r.issues.push(...Ge(i, e.issues))
      : r.issues.push({
          code: "invalid_key",
          origin: "map",
          input: n,
          inst: o,
          issues: e.issues.map((a) => Le(a, s, de())),
        })),
    t.issues.length &&
      (fi.has(typeof i)
        ? r.issues.push(...Ge(i, t.issues))
        : r.issues.push({
            origin: "map",
            code: "invalid_element",
            input: n,
            inst: o,
            key: i,
            issues: t.issues.map((a) => Le(a, s, de())),
          })),
    r.value.set(e.value, t.value);
}
var Ll = g("$ZodSet", (e, t) => {
  Z.init(e, t),
    (e._zod.parse = (r, i) => {
      let n = r.value;
      if (!(n instanceof Set))
        return (
          r.issues.push({input: n, inst: e, expected: "set", code: "invalid_type"}), r
        );
      let o = [];
      r.value = new Set();
      for (let s of n) {
        let a = t.valueType._zod.run({value: s, issues: []}, i);
        a instanceof Promise ? o.push(a.then((c) => C_(c, r))) : C_(a, r);
      }
      return o.length ? Promise.all(o).then(() => r) : r;
    });
});
function C_(e, t) {
  e.issues.length && t.issues.push(...e.issues), t.value.add(e.value);
}
var Fl = g("$ZodEnum", (e, t) => {
    Z.init(e, t);
    let r = hi(t.entries),
      i = new Set(r);
    (e._zod.values = i),
      (e._zod.pattern = new RegExp(
        `^(${r
          .filter((n) => fi.has(typeof n))
          .map((n) => (typeof n == "string" ? rt(n) : n.toString()))
          .join("|")})$`,
      )),
      (e._zod.parse = (n, o) => {
        let s = n.value;
        return (
          i.has(s) ||
            n.issues.push({code: "invalid_value", values: r, input: s, inst: e}),
          n
        );
      });
  }),
  Ml = g("$ZodLiteral", (e, t) => {
    if ((Z.init(e, t), t.values.length === 0))
      throw new Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    (e._zod.values = r),
      (e._zod.pattern = new RegExp(
        `^(${t.values.map((i) => (typeof i == "string" ? rt(i) : i ? rt(i.toString()) : String(i))).join("|")})$`,
      )),
      (e._zod.parse = (i, n) => {
        let o = i.value;
        return (
          r.has(o) ||
            i.issues.push({code: "invalid_value", values: t.values, input: o, inst: e}),
          i
        );
      });
  }),
  Bl = g("$ZodFile", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        let n = r.value;
        return (
          n instanceof File ||
            r.issues.push({expected: "file", code: "invalid_type", input: n, inst: e}),
          r
        );
      });
  }),
  Zl = g("$ZodTransform", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") throw new Gt(e.constructor.name);
        let n = t.transform(r.value, r);
        if (i.async)
          return (n instanceof Promise ? n : Promise.resolve(n)).then(
            (s) => ((r.value = s), r),
          );
        if (n instanceof Promise) throw new gt();
        return (r.value = n), r;
      });
  });
function z_(e, t) {
  return e.issues.length && t === void 0 ? {issues: [], value: void 0} : e;
}
var ql = g("$ZodOptional", (e, t) => {
    Z.init(e, t),
      (e._zod.optin = "optional"),
      (e._zod.optout = "optional"),
      V(e._zod, "values", () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, void 0])
          : void 0,
      ),
      V(e._zod, "pattern", () => {
        let r = t.innerType._zod.pattern;
        return r ? new RegExp(`^(${di(r.source)})?$`) : void 0;
      }),
      (e._zod.parse = (r, i) => {
        if (t.innerType._zod.optin === "optional") {
          let n = t.innerType._zod.run(r, i);
          return n instanceof Promise ? n.then((o) => z_(o, r.value)) : z_(n, r.value);
        }
        return r.value === void 0 ? r : t.innerType._zod.run(r, i);
      });
  }),
  Vl = g("$ZodNullable", (e, t) => {
    Z.init(e, t),
      V(e._zod, "optin", () => t.innerType._zod.optin),
      V(e._zod, "optout", () => t.innerType._zod.optout),
      V(e._zod, "pattern", () => {
        let r = t.innerType._zod.pattern;
        return r ? new RegExp(`^(${di(r.source)}|null)$`) : void 0;
      }),
      V(e._zod, "values", () =>
        t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0,
      ),
      (e._zod.parse = (r, i) => (r.value === null ? r : t.innerType._zod.run(r, i)));
  }),
  Wl = g("$ZodDefault", (e, t) => {
    Z.init(e, t),
      (e._zod.optin = "optional"),
      V(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") return t.innerType._zod.run(r, i);
        if (r.value === void 0) return (r.value = t.defaultValue), r;
        let n = t.innerType._zod.run(r, i);
        return n instanceof Promise ? n.then((o) => U_(o, t)) : U_(n, t);
      });
  });
function U_(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Jl = g("$ZodPrefault", (e, t) => {
    Z.init(e, t),
      (e._zod.optin = "optional"),
      V(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (r, i) => (
        i.direction === "backward" ||
          (r.value === void 0 && (r.value = t.defaultValue)),
        t.innerType._zod.run(r, i)
      ));
  }),
  Kl = g("$ZodNonOptional", (e, t) => {
    Z.init(e, t),
      V(e._zod, "values", () => {
        let r = t.innerType._zod.values;
        return r ? new Set([...r].filter((i) => i !== void 0)) : void 0;
      }),
      (e._zod.parse = (r, i) => {
        let n = t.innerType._zod.run(r, i);
        return n instanceof Promise ? n.then((o) => D_(o, e)) : D_(n, e);
      });
  });
function D_(e, t) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: e.value,
        inst: t,
      }),
    e
  );
}
var Gl = g("$ZodSuccess", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") throw new Gt("ZodSuccess");
        let n = t.innerType._zod.run(r, i);
        return n instanceof Promise
          ? n.then((o) => ((r.value = o.issues.length === 0), r))
          : ((r.value = n.issues.length === 0), r);
      });
  }),
  Hl = g("$ZodCatch", (e, t) => {
    Z.init(e, t),
      V(e._zod, "optin", () => t.innerType._zod.optin),
      V(e._zod, "optout", () => t.innerType._zod.optout),
      V(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") return t.innerType._zod.run(r, i);
        let n = t.innerType._zod.run(r, i);
        return n instanceof Promise
          ? n.then(
              (o) => (
                (r.value = o.value),
                o.issues.length &&
                  ((r.value = t.catchValue({
                    ...r,
                    error: {issues: o.issues.map((s) => Le(s, i, de()))},
                    input: r.value,
                  })),
                  (r.issues = [])),
                r
              ),
            )
          : ((r.value = n.value),
            n.issues.length &&
              ((r.value = t.catchValue({
                ...r,
                error: {issues: n.issues.map((o) => Le(o, i, de()))},
                input: r.value,
              })),
              (r.issues = [])),
            r);
      });
  }),
  Yl = g("$ZodNaN", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) => (
        (typeof r.value != "number" || !Number.isNaN(r.value)) &&
          r.issues.push({
            input: r.value,
            inst: e,
            expected: "nan",
            code: "invalid_type",
          }),
        r
      ));
  }),
  Xl = g("$ZodPipe", (e, t) => {
    Z.init(e, t),
      V(e._zod, "values", () => t.in._zod.values),
      V(e._zod, "optin", () => t.in._zod.optin),
      V(e._zod, "optout", () => t.out._zod.optout),
      V(e._zod, "propValues", () => t.in._zod.propValues),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") {
          let o = t.out._zod.run(r, i);
          return o instanceof Promise ? o.then((s) => ts(s, t.in, i)) : ts(o, t.in, i);
        }
        let n = t.in._zod.run(r, i);
        return n instanceof Promise ? n.then((o) => ts(o, t.out, i)) : ts(n, t.out, i);
      });
  });
function ts(e, t, r) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : t._zod.run({value: e.value, issues: e.issues}, r);
}
var $i = g("$ZodCodec", (e, t) => {
  Z.init(e, t),
    V(e._zod, "values", () => t.in._zod.values),
    V(e._zod, "optin", () => t.in._zod.optin),
    V(e._zod, "optout", () => t.out._zod.optout),
    V(e._zod, "propValues", () => t.in._zod.propValues),
    (e._zod.parse = (r, i) => {
      if ((i.direction || "forward") === "forward") {
        let o = t.in._zod.run(r, i);
        return o instanceof Promise ? o.then((s) => rs(s, t, i)) : rs(o, t, i);
      } else {
        let o = t.out._zod.run(r, i);
        return o instanceof Promise ? o.then((s) => rs(s, t, i)) : rs(o, t, i);
      }
    });
});
function rs(e, t, r) {
  if (e.issues.length) return (e.aborted = !0), e;
  if ((r.direction || "forward") === "forward") {
    let n = t.transform(e.value, e);
    return n instanceof Promise
      ? n.then((o) => ns(e, o, t.out, r))
      : ns(e, n, t.out, r);
  } else {
    let n = t.reverseTransform(e.value, e);
    return n instanceof Promise ? n.then((o) => ns(e, o, t.in, r)) : ns(e, n, t.in, r);
  }
}
function ns(e, t, r, i) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : r._zod.run({value: t, issues: e.issues}, i);
}
var Ql = g("$ZodReadonly", (e, t) => {
  Z.init(e, t),
    V(e._zod, "propValues", () => t.innerType._zod.propValues),
    V(e._zod, "values", () => t.innerType._zod.values),
    V(e._zod, "optin", () => t.innerType?._zod?.optin),
    V(e._zod, "optout", () => t.innerType?._zod?.optout),
    (e._zod.parse = (r, i) => {
      if (i.direction === "backward") return t.innerType._zod.run(r, i);
      let n = t.innerType._zod.run(r, i);
      return n instanceof Promise ? n.then(L_) : L_(n);
    });
});
function L_(e) {
  return (e.value = Object.freeze(e.value)), e;
}
var eh = g("$ZodTemplateLiteral", (e, t) => {
    Z.init(e, t);
    let r = [];
    for (let i of t.parts)
      if (typeof i == "object" && i !== null) {
        if (!i._zod.pattern)
          throw new Error(
            `Invalid template literal part, no pattern found: ${[...i._zod.traits].shift()}`,
          );
        let n =
          i._zod.pattern instanceof RegExp ? i._zod.pattern.source : i._zod.pattern;
        if (!n) throw new Error(`Invalid template literal part: ${i._zod.traits}`);
        let o = n.startsWith("^") ? 1 : 0,
          s = n.endsWith("$") ? n.length - 1 : n.length;
        r.push(n.slice(o, s));
      } else if (i === null || Jc.has(typeof i)) r.push(rt(`${i}`));
      else throw new Error(`Invalid template literal part: ${i}`);
    (e._zod.pattern = new RegExp(`^${r.join("")}$`)),
      (e._zod.parse = (i, n) =>
        typeof i.value != "string"
          ? (i.issues.push({
              input: i.value,
              inst: e,
              expected: "template_literal",
              code: "invalid_type",
            }),
            i)
          : ((e._zod.pattern.lastIndex = 0),
            e._zod.pattern.test(i.value) ||
              i.issues.push({
                input: i.value,
                inst: e,
                code: "invalid_format",
                format: t.format ?? "template_literal",
                pattern: e._zod.pattern.source,
              }),
            i));
  }),
  th = g(
    "$ZodFunction",
    (e, t) => (
      Z.init(e, t),
      (e._def = t),
      (e._zod.def = t),
      (e.implement = (r) => {
        if (typeof r != "function")
          throw new Error("implement() must be called with a function");
        return function (...i) {
          let n = e._def.input ? Mo(e._def.input, i) : i,
            o = Reflect.apply(r, this, n);
          return e._def.output ? Mo(e._def.output, o) : o;
        };
      }),
      (e.implementAsync = (r) => {
        if (typeof r != "function")
          throw new Error("implementAsync() must be called with a function");
        return async function (...i) {
          let n = e._def.input ? await Bo(e._def.input, i) : i,
            o = await Reflect.apply(r, this, n);
          return e._def.output ? await Bo(e._def.output, o) : o;
        };
      }),
      (e._zod.parse = (r, i) =>
        typeof r.value != "function"
          ? (r.issues.push({
              code: "invalid_type",
              expected: "function",
              input: r.value,
              inst: e,
            }),
            r)
          : (e._def.output && e._def.output._zod.def.type === "promise"
              ? (r.value = e.implementAsync(r.value))
              : (r.value = e.implement(r.value)),
            r)),
      (e.input = (...r) => {
        let i = e.constructor;
        return Array.isArray(r[0])
          ? new i({
              type: "function",
              input: new as({type: "tuple", items: r[0], rest: r[1]}),
              output: e._def.output,
            })
          : new i({type: "function", input: r[0], output: e._def.output});
      }),
      (e.output = (r) => {
        let i = e.constructor;
        return new i({type: "function", input: e._def.input, output: r});
      }),
      e
    ),
  ),
  rh = g("$ZodPromise", (e, t) => {
    Z.init(e, t),
      (e._zod.parse = (r, i) =>
        Promise.resolve(r.value).then((n) =>
          t.innerType._zod.run({value: n, issues: []}, i),
        ));
  }),
  nh = g("$ZodLazy", (e, t) => {
    Z.init(e, t),
      V(e._zod, "innerType", () => t.getter()),
      V(e._zod, "pattern", () => e._zod.innerType?._zod?.pattern),
      V(e._zod, "propValues", () => e._zod.innerType?._zod?.propValues),
      V(e._zod, "optin", () => e._zod.innerType?._zod?.optin ?? void 0),
      V(e._zod, "optout", () => e._zod.innerType?._zod?.optout ?? void 0),
      (e._zod.parse = (r, i) => e._zod.innerType._zod.run(r, i));
  }),
  ih = g("$ZodCustom", (e, t) => {
    ie.init(e, t),
      Z.init(e, t),
      (e._zod.parse = (r, i) => r),
      (e._zod.check = (r) => {
        let i = r.value,
          n = t.fn(i);
        if (n instanceof Promise) return n.then((o) => F_(o, r, i, e));
        F_(n, r, i, e);
      });
  });
function F_(e, t, r, i) {
  if (!e) {
    let n = {
      code: "custom",
      input: r,
      inst: i,
      path: [...(i._zod.def.path ?? [])],
      continue: !i._zod.def.abort,
    };
    i._zod.def.params && (n.params = i._zod.def.params), t.issues.push(Qr(n));
  }
}
var Ai = {};
lt(Ai, {
  ar: () => W_,
  az: () => J_,
  be: () => G_,
  bg: () => H_,
  ca: () => Y_,
  cs: () => X_,
  da: () => Q_,
  de: () => ey,
  en: () => cs,
  eo: () => ty,
  es: () => ry,
  fa: () => ny,
  fi: () => iy,
  fr: () => oy,
  frCA: () => sy,
  he: () => ay,
  hu: () => cy,
  id: () => uy,
  is: () => ly,
  it: () => hy,
  ja: () => dy,
  ka: () => fy,
  kh: () => py,
  km: () => us,
  ko: () => my,
  lt: () => vy,
  mk: () => _y,
  ms: () => yy,
  nl: () => by,
  no: () => wy,
  ota: () => xy,
  pl: () => $y,
  ps: () => Sy,
  pt: () => Ey,
  ru: () => Ay,
  sl: () => Iy,
  sv: () => Oy,
  ta: () => Ty,
  th: () => jy,
  tr: () => Py,
  ua: () => Ny,
  uk: () => ls,
  ur: () => Ry,
  vi: () => Cy,
  yo: () => Dy,
  zhCN: () => zy,
  zhTW: () => Uy,
});
var dI = () => {
  let e = {
    string: {unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A"},
    file: {
      unit: "\u0628\u0627\u064A\u062A",
      verb: "\u0623\u0646 \u064A\u062D\u0648\u064A",
    },
    array: {
      unit: "\u0639\u0646\u0635\u0631",
      verb: "\u0623\u0646 \u064A\u062D\u0648\u064A",
    },
    set: {
      unit: "\u0639\u0646\u0635\u0631",
      verb: "\u0623\u0646 \u064A\u062D\u0648\u064A",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0645\u062F\u062E\u0644",
      email:
        "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      url: "\u0631\u0627\u0628\u0637",
      emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
      ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
      cidrv4:
        "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
      cidrv6:
        "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
      base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
      base64url:
        "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
      json_string:
        "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
      e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
      jwt: "JWT",
      template_literal: "\u0645\u062F\u062E\u0644",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${n.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${E(n.values[0])}`
          : `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${n.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${o} ${n.maximum.toString()} ${s.unit ?? "\u0639\u0646\u0635\u0631"}`
          : `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${n.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${o} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${n.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${o} ${n.minimum.toString()} ${s.unit}`
          : `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${n.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${o} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${n.prefix}"`
          : o.format === "ends_with"
            ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${o.suffix}"`
            : o.format === "includes"
              ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${o.includes}"`
              : o.format === "regex"
                ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${o.pattern}`
                : `${i[o.format] ?? n.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${n.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${n.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${n.keys.length > 1 ? "\u0629" : ""}: ${y(n.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${n.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${n.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function W_() {
  return {localeError: dI()};
}
var fI = () => {
  let e = {
    string: {unit: "simvol", verb: "olmal\u0131d\u0131r"},
    file: {unit: "bayt", verb: "olmal\u0131d\u0131r"},
    array: {unit: "element", verb: "olmal\u0131d\u0131r"},
    set: {unit: "element", verb: "olmal\u0131d\u0131r"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      jwt: "JWT",
      template_literal: "input",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${n.expected}, daxil olan ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${E(n.values[0])}`
          : `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${n.origin ?? "d\u0259y\u0259r"} ${o}${n.maximum.toString()} ${s.unit ?? "element"}`
          : `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${n.origin ?? "d\u0259y\u0259r"} ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${n.origin} ${o}${n.minimum.toString()} ${s.unit}`
          : `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${n.origin} ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Yanl\u0131\u015F m\u0259tn: "${o.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`
          : o.format === "ends_with"
            ? `Yanl\u0131\u015F m\u0259tn: "${o.suffix}" il\u0259 bitm\u0259lidir`
            : o.format === "includes"
              ? `Yanl\u0131\u015F m\u0259tn: "${o.includes}" daxil olmal\u0131d\u0131r`
              : o.format === "regex"
                ? `Yanl\u0131\u015F m\u0259tn: ${o.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`
                : `Yanl\u0131\u015F ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${n.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${n.keys.length > 1 ? "lar" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${n.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return "Yanl\u0131\u015F d\u0259y\u0259r";
    }
  };
};
function J_() {
  return {localeError: fI()};
}
function K_(e, t, r, i) {
  let n = Math.abs(e),
    o = n % 10,
    s = n % 100;
  return s >= 11 && s <= 19 ? i : o === 1 ? t : o >= 2 && o <= 4 ? r : i;
}
var pI = () => {
  let e = {
    string: {
      unit: {
        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u044B",
        many: "\u0431\u0430\u0439\u0442\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u043B\u0456\u043A";
        case "object": {
          if (Array.isArray(n)) return "\u043C\u0430\u0441\u0456\u045E";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0443\u0432\u043E\u0434",
      email: "email \u0430\u0434\u0440\u0430\u0441",
      url: "URL",
      emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
      date: "ISO \u0434\u0430\u0442\u0430",
      time: "ISO \u0447\u0430\u0441",
      duration:
        "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
      ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
      ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
      cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
      cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
      base64:
        "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
      base64url:
        "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
      json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
      e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
      jwt: "JWT",
      template_literal: "\u0443\u0432\u043E\u0434",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${n.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${E(n.values[0])}`
          : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        if (s) {
          let a = Number(n.maximum),
            c = K_(a, s.unit.one, s.unit.few, s.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${s.verb} ${o}${n.maximum.toString()} ${c}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        if (s) {
          let a = Number(n.minimum),
            c = K_(a, s.unit.one, s.unit.few, s.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${s.verb} ${o}${n.minimum.toString()} ${c}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${o.prefix}"`
          : o.format === "ends_with"
            ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${o.suffix}"`
            : o.format === "includes"
              ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${o.includes}"`
              : o.format === "regex"
                ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${o.pattern}`
                : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${n.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${n.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${n.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${n.origin}`;
      default:
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
    }
  };
};
function G_() {
  return {localeError: pI()};
}
var mI = (e) => {
    let t = typeof e;
    switch (t) {
      case "number":
        return Number.isNaN(e) ? "NaN" : "\u0447\u0438\u0441\u043B\u043E";
      case "object": {
        if (Array.isArray(e)) return "\u043C\u0430\u0441\u0438\u0432";
        if (e === null) return "null";
        if (Object.getPrototypeOf(e) !== Object.prototype && e.constructor)
          return e.constructor.name;
      }
    }
    return t;
  },
  gI = () => {
    let e = {
      string: {
        unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
        verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430",
      },
      file: {
        unit: "\u0431\u0430\u0439\u0442\u0430",
        verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430",
      },
      array: {
        unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430",
      },
      set: {
        unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430",
      },
    };
    function t(i) {
      return e[i] ?? null;
    }
    let r = {
      regex: "\u0432\u0445\u043E\u0434",
      email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
      url: "URL",
      emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
      date: "ISO \u0434\u0430\u0442\u0430",
      time: "ISO \u0432\u0440\u0435\u043C\u0435",
      duration:
        "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
      ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
      ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
      cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
      base64url:
        "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
      json_string: "JSON \u043D\u0438\u0437",
      e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
      jwt: "JWT",
      template_literal: "\u0432\u0445\u043E\u0434",
    };
    return (i) => {
      switch (i.code) {
        case "invalid_type":
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${i.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${mI(i.input)}`;
        case "invalid_value":
          return i.values.length === 1
            ? `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${E(i.values[0])}`
            : `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${y(i.values, "|")}`;
        case "too_big": {
          let n = i.inclusive ? "<=" : "<",
            o = t(i.origin);
          return o
            ? `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${n}${i.maximum.toString()} ${o.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`
            : `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${n}${i.maximum.toString()}`;
        }
        case "too_small": {
          let n = i.inclusive ? ">=" : ">",
            o = t(i.origin);
          return o
            ? `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${n}${i.minimum.toString()} ${o.unit}`
            : `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${n}${i.minimum.toString()}`;
        }
        case "invalid_format": {
          let n = i;
          if (n.format === "starts_with")
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${n.prefix}"`;
          if (n.format === "ends_with")
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${n.suffix}"`;
          if (n.format === "includes")
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${n.includes}"`;
          if (n.format === "regex")
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${n.pattern}`;
          let o = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
          return (
            n.format === "emoji" &&
              (o = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"),
            n.format === "datetime" &&
              (o = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"),
            n.format === "date" &&
              (o = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"),
            n.format === "time" &&
              (o = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"),
            n.format === "duration" &&
              (o = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"),
            `${o} ${r[n.format] ?? i.format}`
          );
        }
        case "not_multiple_of":
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${i.divisor}`;
        case "unrecognized_keys":
          return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${i.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${i.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${y(i.keys, ", ")}`;
        case "invalid_key":
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${i.origin}`;
        case "invalid_union":
          return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
        case "invalid_element":
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${i.origin}`;
        default:
          return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      }
    };
  };
function H_() {
  return {localeError: gI()};
}
var vI = () => {
  let e = {
    string: {unit: "car\xE0cters", verb: "contenir"},
    file: {unit: "bytes", verb: "contenir"},
    array: {unit: "elements", verb: "contenir"},
    set: {unit: "elements", verb: "contenir"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "entrada",
      email: "adre\xE7a electr\xF2nica",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data i hora ISO",
      date: "data ISO",
      time: "hora ISO",
      duration: "durada ISO",
      ipv4: "adre\xE7a IPv4",
      ipv6: "adre\xE7a IPv6",
      cidrv4: "rang IPv4",
      cidrv6: "rang IPv6",
      base64: "cadena codificada en base64",
      base64url: "cadena codificada en base64url",
      json_string: "cadena JSON",
      e164: "n\xFAmero E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Tipus inv\xE0lid: s'esperava ${n.expected}, s'ha rebut ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Valor inv\xE0lid: s'esperava ${E(n.values[0])}`
          : `Opci\xF3 inv\xE0lida: s'esperava una de ${y(n.values, " o ")}`;
      case "too_big": {
        let o = n.inclusive ? "com a m\xE0xim" : "menys de",
          s = t(n.origin);
        return s
          ? `Massa gran: s'esperava que ${n.origin ?? "el valor"} contingu\xE9s ${o} ${n.maximum.toString()} ${s.unit ?? "elements"}`
          : `Massa gran: s'esperava que ${n.origin ?? "el valor"} fos ${o} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? "com a m\xEDnim" : "m\xE9s de",
          s = t(n.origin);
        return s
          ? `Massa petit: s'esperava que ${n.origin} contingu\xE9s ${o} ${n.minimum.toString()} ${s.unit}`
          : `Massa petit: s'esperava que ${n.origin} fos ${o} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Format inv\xE0lid: ha de comen\xE7ar amb "${o.prefix}"`
          : o.format === "ends_with"
            ? `Format inv\xE0lid: ha d'acabar amb "${o.suffix}"`
            : o.format === "includes"
              ? `Format inv\xE0lid: ha d'incloure "${o.includes}"`
              : o.format === "regex"
                ? `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${o.pattern}`
                : `Format inv\xE0lid per a ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${n.divisor}`;
      case "unrecognized_keys":
        return `Clau${n.keys.length > 1 ? "s" : ""} no reconeguda${n.keys.length > 1 ? "s" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${n.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      case "invalid_element":
        return `Element inv\xE0lid a ${n.origin}`;
      default:
        return "Entrada inv\xE0lida";
    }
  };
};
function Y_() {
  return {localeError: vI()};
}
var _I = () => {
  let e = {
    string: {unit: "znak\u016F", verb: "m\xEDt"},
    file: {unit: "bajt\u016F", verb: "m\xEDt"},
    array: {unit: "prvk\u016F", verb: "m\xEDt"},
    set: {unit: "prvk\u016F", verb: "m\xEDt"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u010D\xEDslo";
        case "string":
          return "\u0159et\u011Bzec";
        case "boolean":
          return "boolean";
        case "bigint":
          return "bigint";
        case "function":
          return "funkce";
        case "symbol":
          return "symbol";
        case "undefined":
          return "undefined";
        case "object": {
          if (Array.isArray(n)) return "pole";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "regul\xE1rn\xED v\xFDraz",
      email: "e-mailov\xE1 adresa",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "datum a \u010Das ve form\xE1tu ISO",
      date: "datum ve form\xE1tu ISO",
      time: "\u010Das ve form\xE1tu ISO",
      duration: "doba trv\xE1n\xED ISO",
      ipv4: "IPv4 adresa",
      ipv6: "IPv6 adresa",
      cidrv4: "rozsah IPv4",
      cidrv6: "rozsah IPv6",
      base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
      base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
      json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
      e164: "\u010D\xEDslo E.164",
      jwt: "JWT",
      template_literal: "vstup",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${n.expected}, obdr\u017Eeno ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${E(n.values[0])}`
          : `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${n.origin ?? "hodnota"} mus\xED m\xEDt ${o}${n.maximum.toString()} ${s.unit ?? "prvk\u016F"}`
          : `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${n.origin ?? "hodnota"} mus\xED b\xFDt ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${n.origin ?? "hodnota"} mus\xED m\xEDt ${o}${n.minimum.toString()} ${s.unit ?? "prvk\u016F"}`
          : `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${n.origin ?? "hodnota"} mus\xED b\xFDt ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${o.prefix}"`
          : o.format === "ends_with"
            ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${o.suffix}"`
            : o.format === "includes"
              ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${o.includes}"`
              : o.format === "regex"
                ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${o.pattern}`
                : `Neplatn\xFD form\xE1t ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${n.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${n.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${n.origin}`;
      default:
        return "Neplatn\xFD vstup";
    }
  };
};
function X_() {
  return {localeError: _I()};
}
var yI = () => {
  let e = {
      string: {unit: "tegn", verb: "havde"},
      file: {unit: "bytes", verb: "havde"},
      array: {unit: "elementer", verb: "indeholdt"},
      set: {unit: "elementer", verb: "indeholdt"},
    },
    t = {
      string: "streng",
      number: "tal",
      boolean: "boolean",
      array: "liste",
      object: "objekt",
      set: "s\xE6t",
      file: "fil",
    };
  function r(s) {
    return e[s] ?? null;
  }
  function i(s) {
    return t[s] ?? s;
  }
  let n = (s) => {
      let a = typeof s;
      switch (a) {
        case "number":
          return Number.isNaN(s) ? "NaN" : "tal";
        case "object":
          return Array.isArray(s)
            ? "liste"
            : s === null
              ? "null"
              : Object.getPrototypeOf(s) !== Object.prototype && s.constructor
                ? s.constructor.name
                : "objekt";
      }
      return a;
    },
    o = {
      regex: "input",
      email: "e-mailadresse",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dato- og klokkesl\xE6t",
      date: "ISO-dato",
      time: "ISO-klokkesl\xE6t",
      duration: "ISO-varighed",
      ipv4: "IPv4-omr\xE5de",
      ipv6: "IPv6-omr\xE5de",
      cidrv4: "IPv4-spektrum",
      cidrv6: "IPv6-spektrum",
      base64: "base64-kodet streng",
      base64url: "base64url-kodet streng",
      json_string: "JSON-streng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "input",
    };
  return (s) => {
    switch (s.code) {
      case "invalid_type":
        return `Ugyldigt input: forventede ${i(s.expected)}, fik ${i(n(s.input))}`;
      case "invalid_value":
        return s.values.length === 1
          ? `Ugyldig v\xE6rdi: forventede ${E(s.values[0])}`
          : `Ugyldigt valg: forventede en af f\xF8lgende ${y(s.values, "|")}`;
      case "too_big": {
        let a = s.inclusive ? "<=" : "<",
          c = r(s.origin),
          u = i(s.origin);
        return c
          ? `For stor: forventede ${u ?? "value"} ${c.verb} ${a} ${s.maximum.toString()} ${c.unit ?? "elementer"}`
          : `For stor: forventede ${u ?? "value"} havde ${a} ${s.maximum.toString()}`;
      }
      case "too_small": {
        let a = s.inclusive ? ">=" : ">",
          c = r(s.origin),
          u = i(s.origin);
        return c
          ? `For lille: forventede ${u} ${c.verb} ${a} ${s.minimum.toString()} ${c.unit}`
          : `For lille: forventede ${u} havde ${a} ${s.minimum.toString()}`;
      }
      case "invalid_format": {
        let a = s;
        return a.format === "starts_with"
          ? `Ugyldig streng: skal starte med "${a.prefix}"`
          : a.format === "ends_with"
            ? `Ugyldig streng: skal ende med "${a.suffix}"`
            : a.format === "includes"
              ? `Ugyldig streng: skal indeholde "${a.includes}"`
              : a.format === "regex"
                ? `Ugyldig streng: skal matche m\xF8nsteret ${a.pattern}`
                : `Ugyldig ${o[a.format] ?? s.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${s.divisor}`;
      case "unrecognized_keys":
        return `${s.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${y(s.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${s.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${s.origin}`;
      default:
        return "Ugyldigt input";
    }
  };
};
function Q_() {
  return {localeError: yI()};
}
var bI = () => {
  let e = {
    string: {unit: "Zeichen", verb: "zu haben"},
    file: {unit: "Bytes", verb: "zu haben"},
    array: {unit: "Elemente", verb: "zu haben"},
    set: {unit: "Elemente", verb: "zu haben"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "Zahl";
        case "object": {
          if (Array.isArray(n)) return "Array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "Eingabe",
      email: "E-Mail-Adresse",
      url: "URL",
      emoji: "Emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-Datum und -Uhrzeit",
      date: "ISO-Datum",
      time: "ISO-Uhrzeit",
      duration: "ISO-Dauer",
      ipv4: "IPv4-Adresse",
      ipv6: "IPv6-Adresse",
      cidrv4: "IPv4-Bereich",
      cidrv6: "IPv6-Bereich",
      base64: "Base64-codierter String",
      base64url: "Base64-URL-codierter String",
      json_string: "JSON-String",
      e164: "E.164-Nummer",
      jwt: "JWT",
      template_literal: "Eingabe",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Ung\xFCltige Eingabe: erwartet ${n.expected}, erhalten ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Ung\xFCltige Eingabe: erwartet ${E(n.values[0])}`
          : `Ung\xFCltige Option: erwartet eine von ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Zu gro\xDF: erwartet, dass ${n.origin ?? "Wert"} ${o}${n.maximum.toString()} ${s.unit ?? "Elemente"} hat`
          : `Zu gro\xDF: erwartet, dass ${n.origin ?? "Wert"} ${o}${n.maximum.toString()} ist`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Zu klein: erwartet, dass ${n.origin} ${o}${n.minimum.toString()} ${s.unit} hat`
          : `Zu klein: erwartet, dass ${n.origin} ${o}${n.minimum.toString()} ist`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Ung\xFCltiger String: muss mit "${o.prefix}" beginnen`
          : o.format === "ends_with"
            ? `Ung\xFCltiger String: muss mit "${o.suffix}" enden`
            : o.format === "includes"
              ? `Ung\xFCltiger String: muss "${o.includes}" enthalten`
              : o.format === "regex"
                ? `Ung\xFCltiger String: muss dem Muster ${o.pattern} entsprechen`
                : `Ung\xFCltig: ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${n.divisor} sein`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${n.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${n.origin}`;
      default:
        return "Ung\xFCltige Eingabe";
    }
  };
};
function ey() {
  return {localeError: bI()};
}
var wI = (e) => {
    let t = typeof e;
    switch (t) {
      case "number":
        return Number.isNaN(e) ? "NaN" : "number";
      case "object": {
        if (Array.isArray(e)) return "array";
        if (e === null) return "null";
        if (Object.getPrototypeOf(e) !== Object.prototype && e.constructor)
          return e.constructor.name;
      }
    }
    return t;
  },
  xI = () => {
    let e = {
      string: {unit: "characters", verb: "to have"},
      file: {unit: "bytes", verb: "to have"},
      array: {unit: "items", verb: "to have"},
      set: {unit: "items", verb: "to have"},
    };
    function t(i) {
      return e[i] ?? null;
    }
    let r = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      mac: "MAC address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      jwt: "JWT",
      template_literal: "input",
    };
    return (i) => {
      switch (i.code) {
        case "invalid_type":
          return `Invalid input: expected ${i.expected}, received ${wI(i.input)}`;
        case "invalid_value":
          return i.values.length === 1
            ? `Invalid input: expected ${E(i.values[0])}`
            : `Invalid option: expected one of ${y(i.values, "|")}`;
        case "too_big": {
          let n = i.inclusive ? "<=" : "<",
            o = t(i.origin);
          return o
            ? `Too big: expected ${i.origin ?? "value"} to have ${n}${i.maximum.toString()} ${o.unit ?? "elements"}`
            : `Too big: expected ${i.origin ?? "value"} to be ${n}${i.maximum.toString()}`;
        }
        case "too_small": {
          let n = i.inclusive ? ">=" : ">",
            o = t(i.origin);
          return o
            ? `Too small: expected ${i.origin} to have ${n}${i.minimum.toString()} ${o.unit}`
            : `Too small: expected ${i.origin} to be ${n}${i.minimum.toString()}`;
        }
        case "invalid_format": {
          let n = i;
          return n.format === "starts_with"
            ? `Invalid string: must start with "${n.prefix}"`
            : n.format === "ends_with"
              ? `Invalid string: must end with "${n.suffix}"`
              : n.format === "includes"
                ? `Invalid string: must include "${n.includes}"`
                : n.format === "regex"
                  ? `Invalid string: must match pattern ${n.pattern}`
                  : `Invalid ${r[n.format] ?? i.format}`;
        }
        case "not_multiple_of":
          return `Invalid number: must be a multiple of ${i.divisor}`;
        case "unrecognized_keys":
          return `Unrecognized key${i.keys.length > 1 ? "s" : ""}: ${y(i.keys, ", ")}`;
        case "invalid_key":
          return `Invalid key in ${i.origin}`;
        case "invalid_union":
          return "Invalid input";
        case "invalid_element":
          return `Invalid value in ${i.origin}`;
        default:
          return "Invalid input";
      }
    };
  };
function cs() {
  return {localeError: xI()};
}
var SI = (e) => {
    let t = typeof e;
    switch (t) {
      case "number":
        return Number.isNaN(e) ? "NaN" : "nombro";
      case "object": {
        if (Array.isArray(e)) return "tabelo";
        if (e === null) return "senvalora";
        if (Object.getPrototypeOf(e) !== Object.prototype && e.constructor)
          return e.constructor.name;
      }
    }
    return t;
  },
  $I = () => {
    let e = {
      string: {unit: "karaktrojn", verb: "havi"},
      file: {unit: "bajtojn", verb: "havi"},
      array: {unit: "elementojn", verb: "havi"},
      set: {unit: "elementojn", verb: "havi"},
    };
    function t(i) {
      return e[i] ?? null;
    }
    let r = {
      regex: "enigo",
      email: "retadreso",
      url: "URL",
      emoji: "emo\u011Dio",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-datotempo",
      date: "ISO-dato",
      time: "ISO-tempo",
      duration: "ISO-da\u016Dro",
      ipv4: "IPv4-adreso",
      ipv6: "IPv6-adreso",
      cidrv4: "IPv4-rango",
      cidrv6: "IPv6-rango",
      base64: "64-ume kodita karaktraro",
      base64url: "URL-64-ume kodita karaktraro",
      json_string: "JSON-karaktraro",
      e164: "E.164-nombro",
      jwt: "JWT",
      template_literal: "enigo",
    };
    return (i) => {
      switch (i.code) {
        case "invalid_type":
          return `Nevalida enigo: atendi\u011Dis ${i.expected}, ricevi\u011Dis ${SI(i.input)}`;
        case "invalid_value":
          return i.values.length === 1
            ? `Nevalida enigo: atendi\u011Dis ${E(i.values[0])}`
            : `Nevalida opcio: atendi\u011Dis unu el ${y(i.values, "|")}`;
        case "too_big": {
          let n = i.inclusive ? "<=" : "<",
            o = t(i.origin);
          return o
            ? `Tro granda: atendi\u011Dis ke ${i.origin ?? "valoro"} havu ${n}${i.maximum.toString()} ${o.unit ?? "elementojn"}`
            : `Tro granda: atendi\u011Dis ke ${i.origin ?? "valoro"} havu ${n}${i.maximum.toString()}`;
        }
        case "too_small": {
          let n = i.inclusive ? ">=" : ">",
            o = t(i.origin);
          return o
            ? `Tro malgranda: atendi\u011Dis ke ${i.origin} havu ${n}${i.minimum.toString()} ${o.unit}`
            : `Tro malgranda: atendi\u011Dis ke ${i.origin} estu ${n}${i.minimum.toString()}`;
        }
        case "invalid_format": {
          let n = i;
          return n.format === "starts_with"
            ? `Nevalida karaktraro: devas komenci\u011Di per "${n.prefix}"`
            : n.format === "ends_with"
              ? `Nevalida karaktraro: devas fini\u011Di per "${n.suffix}"`
              : n.format === "includes"
                ? `Nevalida karaktraro: devas inkluzivi "${n.includes}"`
                : n.format === "regex"
                  ? `Nevalida karaktraro: devas kongrui kun la modelo ${n.pattern}`
                  : `Nevalida ${r[n.format] ?? i.format}`;
        }
        case "not_multiple_of":
          return `Nevalida nombro: devas esti oblo de ${i.divisor}`;
        case "unrecognized_keys":
          return `Nekonata${i.keys.length > 1 ? "j" : ""} \u015Dlosilo${i.keys.length > 1 ? "j" : ""}: ${y(i.keys, ", ")}`;
        case "invalid_key":
          return `Nevalida \u015Dlosilo en ${i.origin}`;
        case "invalid_union":
          return "Nevalida enigo";
        case "invalid_element":
          return `Nevalida valoro en ${i.origin}`;
        default:
          return "Nevalida enigo";
      }
    };
  };
function ty() {
  return {localeError: $I()};
}
var EI = () => {
  let e = {
      string: {unit: "caracteres", verb: "tener"},
      file: {unit: "bytes", verb: "tener"},
      array: {unit: "elementos", verb: "tener"},
      set: {unit: "elementos", verb: "tener"},
    },
    t = {
      string: "texto",
      number: "n\xFAmero",
      boolean: "booleano",
      array: "arreglo",
      object: "objeto",
      set: "conjunto",
      file: "archivo",
      date: "fecha",
      bigint: "n\xFAmero grande",
      symbol: "s\xEDmbolo",
      undefined: "indefinido",
      null: "nulo",
      function: "funci\xF3n",
      map: "mapa",
      record: "registro",
      tuple: "tupla",
      enum: "enumeraci\xF3n",
      union: "uni\xF3n",
      literal: "literal",
      promise: "promesa",
      void: "vac\xEDo",
      never: "nunca",
      unknown: "desconocido",
      any: "cualquiera",
    };
  function r(s) {
    return e[s] ?? null;
  }
  function i(s) {
    return t[s] ?? s;
  }
  let n = (s) => {
      let a = typeof s;
      switch (a) {
        case "number":
          return Number.isNaN(s) ? "NaN" : "number";
        case "object":
          return Array.isArray(s)
            ? "array"
            : s === null
              ? "null"
              : Object.getPrototypeOf(s) !== Object.prototype
                ? s.constructor.name
                : "object";
      }
      return a;
    },
    o = {
      regex: "entrada",
      email: "direcci\xF3n de correo electr\xF3nico",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "fecha y hora ISO",
      date: "fecha ISO",
      time: "hora ISO",
      duration: "duraci\xF3n ISO",
      ipv4: "direcci\xF3n IPv4",
      ipv6: "direcci\xF3n IPv6",
      cidrv4: "rango IPv4",
      cidrv6: "rango IPv6",
      base64: "cadena codificada en base64",
      base64url: "URL codificada en base64",
      json_string: "cadena JSON",
      e164: "n\xFAmero E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (s) => {
    switch (s.code) {
      case "invalid_type":
        return `Entrada inv\xE1lida: se esperaba ${i(s.expected)}, recibido ${i(n(s.input))}`;
      case "invalid_value":
        return s.values.length === 1
          ? `Entrada inv\xE1lida: se esperaba ${E(s.values[0])}`
          : `Opci\xF3n inv\xE1lida: se esperaba una de ${y(s.values, "|")}`;
      case "too_big": {
        let a = s.inclusive ? "<=" : "<",
          c = r(s.origin),
          u = i(s.origin);
        return c
          ? `Demasiado grande: se esperaba que ${u ?? "valor"} tuviera ${a}${s.maximum.toString()} ${c.unit ?? "elementos"}`
          : `Demasiado grande: se esperaba que ${u ?? "valor"} fuera ${a}${s.maximum.toString()}`;
      }
      case "too_small": {
        let a = s.inclusive ? ">=" : ">",
          c = r(s.origin),
          u = i(s.origin);
        return c
          ? `Demasiado peque\xF1o: se esperaba que ${u} tuviera ${a}${s.minimum.toString()} ${c.unit}`
          : `Demasiado peque\xF1o: se esperaba que ${u} fuera ${a}${s.minimum.toString()}`;
      }
      case "invalid_format": {
        let a = s;
        return a.format === "starts_with"
          ? `Cadena inv\xE1lida: debe comenzar con "${a.prefix}"`
          : a.format === "ends_with"
            ? `Cadena inv\xE1lida: debe terminar en "${a.suffix}"`
            : a.format === "includes"
              ? `Cadena inv\xE1lida: debe incluir "${a.includes}"`
              : a.format === "regex"
                ? `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${a.pattern}`
                : `Inv\xE1lido ${o[a.format] ?? s.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${s.divisor}`;
      case "unrecognized_keys":
        return `Llave${s.keys.length > 1 ? "s" : ""} desconocida${s.keys.length > 1 ? "s" : ""}: ${y(s.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${i(s.origin)}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${i(s.origin)}`;
      default:
        return "Entrada inv\xE1lida";
    }
  };
};
function ry() {
  return {localeError: EI()};
}
var kI = () => {
  let e = {
    string: {
      unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
    file: {
      unit: "\u0628\u0627\u06CC\u062A",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
    array: {
      unit: "\u0622\u06CC\u062A\u0645",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
    set: {
      unit: "\u0622\u06CC\u062A\u0645",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u0639\u062F\u062F";
        case "object": {
          if (Array.isArray(n)) return "\u0622\u0631\u0627\u06CC\u0647";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0648\u0631\u0648\u062F\u06CC",
      email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
      url: "URL",
      emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
      date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
      time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
      duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
      ipv4: "IPv4 \u0622\u062F\u0631\u0633",
      ipv6: "IPv6 \u0622\u062F\u0631\u0633",
      cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
      cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
      base64: "base64-encoded \u0631\u0634\u062A\u0647",
      base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
      json_string: "JSON \u0631\u0634\u062A\u0647",
      e164: "E.164 \u0639\u062F\u062F",
      jwt: "JWT",
      template_literal: "\u0648\u0631\u0648\u062F\u06CC",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${n.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${r(n.input)} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${E(n.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`
          : `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${y(n.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${n.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${o}${n.maximum.toString()} ${s.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`
          : `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${n.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${o}${n.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${n.origin} \u0628\u0627\u06CC\u062F ${o}${n.minimum.toString()} ${s.unit} \u0628\u0627\u0634\u062F`
          : `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${n.origin} \u0628\u0627\u06CC\u062F ${o}${n.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${o.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`
          : o.format === "ends_with"
            ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${o.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`
            : o.format === "includes"
              ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${o.includes}" \u0628\u0627\u0634\u062F`
              : o.format === "regex"
                ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${o.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`
                : `${i[o.format] ?? n.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${n.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${n.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${n.origin}`;
      case "invalid_union":
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${n.origin}`;
      default:
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
    }
  };
};
function ny() {
  return {localeError: kI()};
}
var AI = () => {
  let e = {
    string: {unit: "merkki\xE4", subject: "merkkijonon"},
    file: {unit: "tavua", subject: "tiedoston"},
    array: {unit: "alkiota", subject: "listan"},
    set: {unit: "alkiota", subject: "joukon"},
    number: {unit: "", subject: "luvun"},
    bigint: {unit: "", subject: "suuren kokonaisluvun"},
    int: {unit: "", subject: "kokonaisluvun"},
    date: {unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "s\xE4\xE4nn\xF6llinen lauseke",
      email: "s\xE4hk\xF6postiosoite",
      url: "URL-osoite",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-aikaleima",
      date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
      time: "ISO-aika",
      duration: "ISO-kesto",
      ipv4: "IPv4-osoite",
      ipv6: "IPv6-osoite",
      cidrv4: "IPv4-alue",
      cidrv6: "IPv6-alue",
      base64: "base64-koodattu merkkijono",
      base64url: "base64url-koodattu merkkijono",
      json_string: "JSON-merkkijono",
      e164: "E.164-luku",
      jwt: "JWT",
      template_literal: "templaattimerkkijono",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Virheellinen tyyppi: odotettiin ${n.expected}, oli ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Virheellinen sy\xF6te: t\xE4ytyy olla ${E(n.values[0])}`
          : `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Liian suuri: ${s.subject} t\xE4ytyy olla ${o}${n.maximum.toString()} ${s.unit}`.trim()
          : `Liian suuri: arvon t\xE4ytyy olla ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Liian pieni: ${s.subject} t\xE4ytyy olla ${o}${n.minimum.toString()} ${s.unit}`.trim()
          : `Liian pieni: arvon t\xE4ytyy olla ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${o.prefix}"`
          : o.format === "ends_with"
            ? `Virheellinen sy\xF6te: t\xE4ytyy loppua "${o.suffix}"`
            : o.format === "includes"
              ? `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${o.includes}"`
              : o.format === "regex"
                ? `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${o.pattern}`
                : `Virheellinen ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${n.divisor} monikerta`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return "Virheellinen sy\xF6te";
    }
  };
};
function iy() {
  return {localeError: AI()};
}
var II = () => {
  let e = {
    string: {unit: "caract\xE8res", verb: "avoir"},
    file: {unit: "octets", verb: "avoir"},
    array: {unit: "\xE9l\xE9ments", verb: "avoir"},
    set: {unit: "\xE9l\xE9ments", verb: "avoir"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "nombre";
        case "object": {
          if (Array.isArray(n)) return "tableau";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "entr\xE9e",
      email: "adresse e-mail",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "date et heure ISO",
      date: "date ISO",
      time: "heure ISO",
      duration: "dur\xE9e ISO",
      ipv4: "adresse IPv4",
      ipv6: "adresse IPv6",
      cidrv4: "plage IPv4",
      cidrv6: "plage IPv6",
      base64: "cha\xEEne encod\xE9e en base64",
      base64url: "cha\xEEne encod\xE9e en base64url",
      json_string: "cha\xEEne JSON",
      e164: "num\xE9ro E.164",
      jwt: "JWT",
      template_literal: "entr\xE9e",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Entr\xE9e invalide : ${n.expected} attendu, ${r(n.input)} re\xE7u`;
      case "invalid_value":
        return n.values.length === 1
          ? `Entr\xE9e invalide : ${E(n.values[0])} attendu`
          : `Option invalide : une valeur parmi ${y(n.values, "|")} attendue`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Trop grand : ${n.origin ?? "valeur"} doit ${s.verb} ${o}${n.maximum.toString()} ${s.unit ?? "\xE9l\xE9ment(s)"}`
          : `Trop grand : ${n.origin ?? "valeur"} doit \xEAtre ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Trop petit : ${n.origin} doit ${s.verb} ${o}${n.minimum.toString()} ${s.unit}`
          : `Trop petit : ${n.origin} doit \xEAtre ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Cha\xEEne invalide : doit commencer par "${o.prefix}"`
          : o.format === "ends_with"
            ? `Cha\xEEne invalide : doit se terminer par "${o.suffix}"`
            : o.format === "includes"
              ? `Cha\xEEne invalide : doit inclure "${o.includes}"`
              : o.format === "regex"
                ? `Cha\xEEne invalide : doit correspondre au mod\xE8le ${o.pattern}`
                : `${i[o.format] ?? n.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${n.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${n.keys.length > 1 ? "s" : ""} non reconnue${n.keys.length > 1 ? "s" : ""} : ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${n.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${n.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function oy() {
  return {localeError: II()};
}
var OI = () => {
  let e = {
    string: {unit: "caract\xE8res", verb: "avoir"},
    file: {unit: "octets", verb: "avoir"},
    array: {unit: "\xE9l\xE9ments", verb: "avoir"},
    set: {unit: "\xE9l\xE9ments", verb: "avoir"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "entr\xE9e",
      email: "adresse courriel",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "date-heure ISO",
      date: "date ISO",
      time: "heure ISO",
      duration: "dur\xE9e ISO",
      ipv4: "adresse IPv4",
      ipv6: "adresse IPv6",
      cidrv4: "plage IPv4",
      cidrv6: "plage IPv6",
      base64: "cha\xEEne encod\xE9e en base64",
      base64url: "cha\xEEne encod\xE9e en base64url",
      json_string: "cha\xEEne JSON",
      e164: "num\xE9ro E.164",
      jwt: "JWT",
      template_literal: "entr\xE9e",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Entr\xE9e invalide : attendu ${n.expected}, re\xE7u ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Entr\xE9e invalide : attendu ${E(n.values[0])}`
          : `Option invalide : attendu l'une des valeurs suivantes ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "\u2264" : "<",
          s = t(n.origin);
        return s
          ? `Trop grand : attendu que ${n.origin ?? "la valeur"} ait ${o}${n.maximum.toString()} ${s.unit}`
          : `Trop grand : attendu que ${n.origin ?? "la valeur"} soit ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? "\u2265" : ">",
          s = t(n.origin);
        return s
          ? `Trop petit : attendu que ${n.origin} ait ${o}${n.minimum.toString()} ${s.unit}`
          : `Trop petit : attendu que ${n.origin} soit ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Cha\xEEne invalide : doit commencer par "${o.prefix}"`
          : o.format === "ends_with"
            ? `Cha\xEEne invalide : doit se terminer par "${o.suffix}"`
            : o.format === "includes"
              ? `Cha\xEEne invalide : doit inclure "${o.includes}"`
              : o.format === "regex"
                ? `Cha\xEEne invalide : doit correspondre au motif ${o.pattern}`
                : `${i[o.format] ?? n.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${n.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${n.keys.length > 1 ? "s" : ""} non reconnue${n.keys.length > 1 ? "s" : ""} : ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${n.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${n.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function sy() {
  return {localeError: OI()};
}
var TI = () => {
  let e = {
      string: {label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f"},
      number: {label: "\u05DE\u05E1\u05E4\u05E8", gender: "m"},
      boolean: {
        label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9",
        gender: "m",
      },
      bigint: {label: "BigInt", gender: "m"},
      date: {label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m"},
      array: {label: "\u05DE\u05E2\u05E8\u05DA", gender: "m"},
      object: {label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m"},
      null: {label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m"},
      undefined: {
        label:
          "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)",
        gender: "m",
      },
      symbol: {label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m"},
      function: {label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f"},
      map: {label: "\u05DE\u05E4\u05D4 (Map)", gender: "f"},
      set: {label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f"},
      file: {label: "\u05E7\u05D5\u05D1\u05E5", gender: "m"},
      promise: {label: "Promise", gender: "m"},
      NaN: {label: "NaN", gender: "m"},
      unknown: {
        label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2",
        gender: "m",
      },
      value: {label: "\u05E2\u05E8\u05DA", gender: "m"},
    },
    t = {
      string: {
        unit: "\u05EA\u05D5\u05D5\u05D9\u05DD",
        shortLabel: "\u05E7\u05E6\u05E8",
        longLabel: "\u05D0\u05E8\u05D5\u05DA",
      },
      file: {
        unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD",
        shortLabel: "\u05E7\u05D8\u05DF",
        longLabel: "\u05D2\u05D3\u05D5\u05DC",
      },
      array: {
        unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD",
        shortLabel: "\u05E7\u05D8\u05DF",
        longLabel: "\u05D2\u05D3\u05D5\u05DC",
      },
      set: {
        unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD",
        shortLabel: "\u05E7\u05D8\u05DF",
        longLabel: "\u05D2\u05D3\u05D5\u05DC",
      },
      number: {
        unit: "",
        shortLabel: "\u05E7\u05D8\u05DF",
        longLabel: "\u05D2\u05D3\u05D5\u05DC",
      },
    },
    r = (u) => (u ? e[u] : void 0),
    i = (u) => {
      let l = r(u);
      return l ? l.label : (u ?? e.unknown.label);
    },
    n = (u) => `\u05D4${i(u)}`,
    o = (u) =>
      (r(u)?.gender ?? "m") === "f"
        ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA"
        : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA",
    s = (u) => (u ? (t[u] ?? null) : null),
    a = (u) => {
      let l = typeof u;
      switch (l) {
        case "number":
          return Number.isNaN(u) ? "NaN" : "number";
        case "object":
          return Array.isArray(u)
            ? "array"
            : u === null
              ? "null"
              : Object.getPrototypeOf(u) !== Object.prototype && u.constructor
                ? u.constructor.name
                : "object";
        default:
          return l;
      }
    },
    c = {
      regex: {label: "\u05E7\u05DC\u05D8", gender: "m"},
      email: {
        label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC",
        gender: "f",
      },
      url: {label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f"},
      emoji: {label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m"},
      uuid: {label: "UUID", gender: "m"},
      nanoid: {label: "nanoid", gender: "m"},
      guid: {label: "GUID", gender: "m"},
      cuid: {label: "cuid", gender: "m"},
      cuid2: {label: "cuid2", gender: "m"},
      ulid: {label: "ULID", gender: "m"},
      xid: {label: "XID", gender: "m"},
      ksuid: {label: "KSUID", gender: "m"},
      datetime: {
        label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO",
        gender: "m",
      },
      date: {label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m"},
      time: {label: "\u05D6\u05DE\u05DF ISO", gender: "m"},
      duration: {label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m"},
      ipv4: {label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f"},
      ipv6: {label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f"},
      cidrv4: {label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m"},
      cidrv6: {label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m"},
      base64: {
        label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64",
        gender: "f",
      },
      base64url: {
        label:
          "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA",
        gender: "f",
      },
      json_string: {label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f"},
      e164: {label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m"},
      jwt: {label: "JWT", gender: "m"},
      ends_with: {label: "\u05E7\u05DC\u05D8", gender: "m"},
      includes: {label: "\u05E7\u05DC\u05D8", gender: "m"},
      lowercase: {label: "\u05E7\u05DC\u05D8", gender: "m"},
      starts_with: {label: "\u05E7\u05DC\u05D8", gender: "m"},
      uppercase: {label: "\u05E7\u05DC\u05D8", gender: "m"},
    };
  return (u) => {
    switch (u.code) {
      case "invalid_type": {
        let l = u.expected,
          h = i(l),
          f = a(u.input),
          d = e[f]?.label ?? f;
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${h}, \u05D4\u05EA\u05E7\u05D1\u05DC ${d}`;
      }
      case "invalid_value": {
        if (u.values.length === 1)
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${E(u.values[0])}`;
        let l = u.values.map((d) => E(d));
        if (u.values.length === 2)
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${l[0]} \u05D0\u05D5 ${l[1]}`;
        let h = l[l.length - 1];
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${l.slice(0, -1).join(", ")} \u05D0\u05D5 ${h}`;
      }
      case "too_big": {
        let l = s(u.origin),
          h = n(u.origin ?? "value");
        if (u.origin === "string")
          return `${l?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${h} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${u.maximum.toString()} ${l?.unit ?? ""} ${u.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        if (u.origin === "number") {
          let p = u.inclusive
            ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${u.maximum}`
            : `\u05E7\u05D8\u05DF \u05DE-${u.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${h} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${p}`;
        }
        if (u.origin === "array" || u.origin === "set") {
          let p =
              u.origin === "set"
                ? "\u05E6\u05E8\u05D9\u05DB\u05D4"
                : "\u05E6\u05E8\u05D9\u05DA",
            m = u.inclusive
              ? `${u.maximum} ${l?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA`
              : `\u05E4\u05D7\u05D5\u05EA \u05DE-${u.maximum} ${l?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${h} ${p} \u05DC\u05D4\u05DB\u05D9\u05DC ${m}`.trim();
        }
        let f = u.inclusive ? "<=" : "<",
          d = o(u.origin ?? "value");
        return l?.unit
          ? `${l.longLabel} \u05DE\u05D3\u05D9: ${h} ${d} ${f}${u.maximum.toString()} ${l.unit}`
          : `${l?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${h} ${d} ${f}${u.maximum.toString()}`;
      }
      case "too_small": {
        let l = s(u.origin),
          h = n(u.origin ?? "value");
        if (u.origin === "string")
          return `${l?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${h} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${u.minimum.toString()} ${l?.unit ?? ""} ${u.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        if (u.origin === "number") {
          let p = u.inclusive
            ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${u.minimum}`
            : `\u05D2\u05D3\u05D5\u05DC \u05DE-${u.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${h} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${p}`;
        }
        if (u.origin === "array" || u.origin === "set") {
          let p =
            u.origin === "set"
              ? "\u05E6\u05E8\u05D9\u05DB\u05D4"
              : "\u05E6\u05E8\u05D9\u05DA";
          if (u.minimum === 1 && u.inclusive) {
            let v =
              (u.origin === "set",
              "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3");
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${h} ${p} \u05DC\u05D4\u05DB\u05D9\u05DC ${v}`;
          }
          let m = u.inclusive
            ? `${u.minimum} ${l?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8`
            : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${u.minimum} ${l?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${h} ${p} \u05DC\u05D4\u05DB\u05D9\u05DC ${m}`.trim();
        }
        let f = u.inclusive ? ">=" : ">",
          d = o(u.origin ?? "value");
        return l?.unit
          ? `${l.shortLabel} \u05DE\u05D3\u05D9: ${h} ${d} ${f}${u.minimum.toString()} ${l.unit}`
          : `${l?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${h} ${d} ${f}${u.minimum.toString()}`;
      }
      case "invalid_format": {
        let l = u;
        if (l.format === "starts_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${l.prefix}"`;
        if (l.format === "ends_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${l.suffix}"`;
        if (l.format === "includes")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${l.includes}"`;
        if (l.format === "regex")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${l.pattern}`;
        let h = c[l.format],
          f = h?.label ?? l.format,
          p =
            (h?.gender ?? "m") === "f"
              ? "\u05EA\u05E7\u05D9\u05E0\u05D4"
              : "\u05EA\u05E7\u05D9\u05DF";
        return `${f} \u05DC\u05D0 ${p}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${u.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${u.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${u.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${y(u.keys, ", ")}`;
      case "invalid_key":
        return "\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8";
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element":
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${n(u.origin ?? "array")}`;
      default:
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
    }
  };
};
function ay() {
  return {localeError: TI()};
}
var jI = () => {
  let e = {
    string: {unit: "karakter", verb: "legyen"},
    file: {unit: "byte", verb: "legyen"},
    array: {unit: "elem", verb: "legyen"},
    set: {unit: "elem", verb: "legyen"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "sz\xE1m";
        case "object": {
          if (Array.isArray(n)) return "t\xF6mb";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "bemenet",
      email: "email c\xEDm",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO id\u0151b\xE9lyeg",
      date: "ISO d\xE1tum",
      time: "ISO id\u0151",
      duration: "ISO id\u0151intervallum",
      ipv4: "IPv4 c\xEDm",
      ipv6: "IPv6 c\xEDm",
      cidrv4: "IPv4 tartom\xE1ny",
      cidrv6: "IPv6 tartom\xE1ny",
      base64: "base64-k\xF3dolt string",
      base64url: "base64url-k\xF3dolt string",
      json_string: "JSON string",
      e164: "E.164 sz\xE1m",
      jwt: "JWT",
      template_literal: "bemenet",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${n.expected}, a kapott \xE9rt\xE9k ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${E(n.values[0])}`
          : `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `T\xFAl nagy: ${n.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${o}${n.maximum.toString()} ${s.unit ?? "elem"}`
          : `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${n.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${n.origin} m\xE9rete t\xFAl kicsi ${o}${n.minimum.toString()} ${s.unit}`
          : `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${n.origin} t\xFAl kicsi ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\xC9rv\xE9nytelen string: "${o.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`
          : o.format === "ends_with"
            ? `\xC9rv\xE9nytelen string: "${o.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`
            : o.format === "includes"
              ? `\xC9rv\xE9nytelen string: "${o.includes}" \xE9rt\xE9ket kell tartalmaznia`
              : o.format === "regex"
                ? `\xC9rv\xE9nytelen string: ${o.pattern} mint\xE1nak kell megfelelnie`
                : `\xC9rv\xE9nytelen ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${n.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${n.keys.length > 1 ? "s" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${n.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${n.origin}`;
      default:
        return "\xC9rv\xE9nytelen bemenet";
    }
  };
};
function cy() {
  return {localeError: jI()};
}
var PI = () => {
  let e = {
    string: {unit: "karakter", verb: "memiliki"},
    file: {unit: "byte", verb: "memiliki"},
    array: {unit: "item", verb: "memiliki"},
    set: {unit: "item", verb: "memiliki"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "input",
      email: "alamat email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "tanggal dan waktu format ISO",
      date: "tanggal format ISO",
      time: "jam format ISO",
      duration: "durasi format ISO",
      ipv4: "alamat IPv4",
      ipv6: "alamat IPv6",
      cidrv4: "rentang alamat IPv4",
      cidrv6: "rentang alamat IPv6",
      base64: "string dengan enkode base64",
      base64url: "string dengan enkode base64url",
      json_string: "string JSON",
      e164: "angka E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Input tidak valid: diharapkan ${n.expected}, diterima ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Input tidak valid: diharapkan ${E(n.values[0])}`
          : `Pilihan tidak valid: diharapkan salah satu dari ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Terlalu besar: diharapkan ${n.origin ?? "value"} memiliki ${o}${n.maximum.toString()} ${s.unit ?? "elemen"}`
          : `Terlalu besar: diharapkan ${n.origin ?? "value"} menjadi ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Terlalu kecil: diharapkan ${n.origin} memiliki ${o}${n.minimum.toString()} ${s.unit}`
          : `Terlalu kecil: diharapkan ${n.origin} menjadi ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `String tidak valid: harus dimulai dengan "${o.prefix}"`
          : o.format === "ends_with"
            ? `String tidak valid: harus berakhir dengan "${o.suffix}"`
            : o.format === "includes"
              ? `String tidak valid: harus menyertakan "${o.includes}"`
              : o.format === "regex"
                ? `String tidak valid: harus sesuai pola ${o.pattern}`
                : `${i[o.format] ?? n.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${n.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${n.keys.length > 1 ? "s" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${n.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${n.origin}`;
      default:
        return "Input tidak valid";
    }
  };
};
function uy() {
  return {localeError: PI()};
}
var NI = (e) => {
    let t = typeof e;
    switch (t) {
      case "number":
        return Number.isNaN(e) ? "NaN" : "n\xFAmer";
      case "object": {
        if (Array.isArray(e)) return "fylki";
        if (e === null) return "null";
        if (Object.getPrototypeOf(e) !== Object.prototype && e.constructor)
          return e.constructor.name;
      }
    }
    return t;
  },
  RI = () => {
    let e = {
      string: {unit: "stafi", verb: "a\xF0 hafa"},
      file: {unit: "b\xE6ti", verb: "a\xF0 hafa"},
      array: {unit: "hluti", verb: "a\xF0 hafa"},
      set: {unit: "hluti", verb: "a\xF0 hafa"},
    };
    function t(i) {
      return e[i] ?? null;
    }
    let r = {
      regex: "gildi",
      email: "netfang",
      url: "vefsl\xF3\xF0",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dagsetning og t\xEDmi",
      date: "ISO dagsetning",
      time: "ISO t\xEDmi",
      duration: "ISO t\xEDmalengd",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded strengur",
      base64url: "base64url-encoded strengur",
      json_string: "JSON strengur",
      e164: "E.164 t\xF6lugildi",
      jwt: "JWT",
      template_literal: "gildi",
    };
    return (i) => {
      switch (i.code) {
        case "invalid_type":
          return `Rangt gildi: \xDE\xFA sl\xF3st inn ${NI(i.input)} \xFEar sem \xE1 a\xF0 vera ${i.expected}`;
        case "invalid_value":
          return i.values.length === 1
            ? `Rangt gildi: gert r\xE1\xF0 fyrir ${E(i.values[0])}`
            : `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${y(i.values, "|")}`;
        case "too_big": {
          let n = i.inclusive ? "<=" : "<",
            o = t(i.origin);
          return o
            ? `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${i.origin ?? "gildi"} hafi ${n}${i.maximum.toString()} ${o.unit ?? "hluti"}`
            : `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${i.origin ?? "gildi"} s\xE9 ${n}${i.maximum.toString()}`;
        }
        case "too_small": {
          let n = i.inclusive ? ">=" : ">",
            o = t(i.origin);
          return o
            ? `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${i.origin} hafi ${n}${i.minimum.toString()} ${o.unit}`
            : `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${i.origin} s\xE9 ${n}${i.minimum.toString()}`;
        }
        case "invalid_format": {
          let n = i;
          return n.format === "starts_with"
            ? `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${n.prefix}"`
            : n.format === "ends_with"
              ? `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${n.suffix}"`
              : n.format === "includes"
                ? `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${n.includes}"`
                : n.format === "regex"
                  ? `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${n.pattern}`
                  : `Rangt ${r[n.format] ?? i.format}`;
        }
        case "not_multiple_of":
          return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${i.divisor}`;
        case "unrecognized_keys":
          return `\xD3\xFEekkt ${i.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${y(i.keys, ", ")}`;
        case "invalid_key":
          return `Rangur lykill \xED ${i.origin}`;
        case "invalid_union":
          return "Rangt gildi";
        case "invalid_element":
          return `Rangt gildi \xED ${i.origin}`;
        default:
          return "Rangt gildi";
      }
    };
  };
function ly() {
  return {localeError: RI()};
}
var CI = () => {
  let e = {
    string: {unit: "caratteri", verb: "avere"},
    file: {unit: "byte", verb: "avere"},
    array: {unit: "elementi", verb: "avere"},
    set: {unit: "elementi", verb: "avere"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "numero";
        case "object": {
          if (Array.isArray(n)) return "vettore";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "input",
      email: "indirizzo email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data e ora ISO",
      date: "data ISO",
      time: "ora ISO",
      duration: "durata ISO",
      ipv4: "indirizzo IPv4",
      ipv6: "indirizzo IPv6",
      cidrv4: "intervallo IPv4",
      cidrv6: "intervallo IPv6",
      base64: "stringa codificata in base64",
      base64url: "URL codificata in base64",
      json_string: "stringa JSON",
      e164: "numero E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Input non valido: atteso ${n.expected}, ricevuto ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Input non valido: atteso ${E(n.values[0])}`
          : `Opzione non valida: atteso uno tra ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Troppo grande: ${n.origin ?? "valore"} deve avere ${o}${n.maximum.toString()} ${s.unit ?? "elementi"}`
          : `Troppo grande: ${n.origin ?? "valore"} deve essere ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Troppo piccolo: ${n.origin} deve avere ${o}${n.minimum.toString()} ${s.unit}`
          : `Troppo piccolo: ${n.origin} deve essere ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Stringa non valida: deve iniziare con "${o.prefix}"`
          : o.format === "ends_with"
            ? `Stringa non valida: deve terminare con "${o.suffix}"`
            : o.format === "includes"
              ? `Stringa non valida: deve includere "${o.includes}"`
              : o.format === "regex"
                ? `Stringa non valida: deve corrispondere al pattern ${o.pattern}`
                : `Invalid ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${n.divisor}`;
      case "unrecognized_keys":
        return `Chiav${n.keys.length > 1 ? "i" : "e"} non riconosciut${n.keys.length > 1 ? "e" : "a"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${n.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${n.origin}`;
      default:
        return "Input non valido";
    }
  };
};
function hy() {
  return {localeError: CI()};
}
var zI = () => {
  let e = {
    string: {unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B"},
    file: {unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B"},
    array: {unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B"},
    set: {unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u6570\u5024";
        case "object": {
          if (Array.isArray(n)) return "\u914D\u5217";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u5165\u529B\u5024",
      email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
      url: "URL",
      emoji: "\u7D75\u6587\u5B57",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO\u65E5\u6642",
      date: "ISO\u65E5\u4ED8",
      time: "ISO\u6642\u523B",
      duration: "ISO\u671F\u9593",
      ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
      ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
      cidrv4: "IPv4\u7BC4\u56F2",
      cidrv6: "IPv6\u7BC4\u56F2",
      base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
      base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
      json_string: "JSON\u6587\u5B57\u5217",
      e164: "E.164\u756A\u53F7",
      jwt: "JWT",
      template_literal: "\u5165\u529B\u5024",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u7121\u52B9\u306A\u5165\u529B: ${n.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${r(n.input)}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u7121\u52B9\u306A\u5165\u529B: ${E(n.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`
          : `\u7121\u52B9\u306A\u9078\u629E: ${y(n.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        let o = n.inclusive
            ? "\u4EE5\u4E0B\u3067\u3042\u308B"
            : "\u3088\u308A\u5C0F\u3055\u3044",
          s = t(n.origin);
        return s
          ? `\u5927\u304D\u3059\u304E\u308B\u5024: ${n.origin ?? "\u5024"}\u306F${n.maximum.toString()}${s.unit ?? "\u8981\u7D20"}${o}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : `\u5927\u304D\u3059\u304E\u308B\u5024: ${n.origin ?? "\u5024"}\u306F${n.maximum.toString()}${o}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        let o = n.inclusive
            ? "\u4EE5\u4E0A\u3067\u3042\u308B"
            : "\u3088\u308A\u5927\u304D\u3044",
          s = t(n.origin);
        return s
          ? `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${n.origin}\u306F${n.minimum.toString()}${s.unit}${o}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${n.origin}\u306F${n.minimum.toString()}${o}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${o.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : o.format === "ends_with"
            ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${o.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
            : o.format === "includes"
              ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${o.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
              : o.format === "regex"
                ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${o.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
                : `\u7121\u52B9\u306A${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${n.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${n.keys.length > 1 ? "\u7FA4" : ""}: ${y(n.keys, "\u3001")}`;
      case "invalid_key":
        return `${n.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${n.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return "\u7121\u52B9\u306A\u5165\u529B";
    }
  };
};
function dy() {
  return {localeError: zI()};
}
var UI = (e) => {
    let t = typeof e;
    switch (t) {
      case "number":
        return Number.isNaN(e) ? "NaN" : "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8";
      case "object": {
        if (Array.isArray(e)) return "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8";
        if (e === null) return "null";
        if (Object.getPrototypeOf(e) !== Object.prototype && e.constructor)
          return e.constructor.name;
      }
    }
    return (
      {
        string: "\u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
        boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8",
        undefined: "undefined",
        bigint: "bigint",
        symbol: "symbol",
        function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0",
      }[t] ?? t
    );
  },
  DI = () => {
    let e = {
      string: {
        unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD",
        verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1",
      },
      file: {
        unit: "\u10D1\u10D0\u10D8\u10E2\u10D8",
        verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1",
      },
      array: {
        unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8",
        verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1",
      },
      set: {
        unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8",
        verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1",
      },
    };
    function t(i) {
      return e[i] ?? null;
    }
    let r = {
      regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
      email:
        "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
      url: "URL",
      emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD",
      date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8",
      time: "\u10D3\u10E0\u10DD",
      duration:
        "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0",
      ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
      ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
      cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
      cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
      base64:
        "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
      base64url:
        "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
      json_string: "JSON \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
      e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8",
      jwt: "JWT",
      template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
    };
    return (i) => {
      switch (i.code) {
        case "invalid_type":
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${UI(i.input)}`;
        case "invalid_value":
          return i.values.length === 1
            ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${E(i.values[0])}`
            : `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${y(i.values, "|")}-\u10D3\u10D0\u10DC`;
        case "too_big": {
          let n = i.inclusive ? "<=" : "<",
            o = t(i.origin);
          return o
            ? `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${o.verb} ${n}${i.maximum.toString()} ${o.unit}`
            : `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${n}${i.maximum.toString()}`;
        }
        case "too_small": {
          let n = i.inclusive ? ">=" : ">",
            o = t(i.origin);
          return o
            ? `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i.origin} ${o.verb} ${n}${i.minimum.toString()} ${o.unit}`
            : `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i.origin} \u10D8\u10E7\u10DD\u10E1 ${n}${i.minimum.toString()}`;
        }
        case "invalid_format": {
          let n = i;
          return n.format === "starts_with"
            ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${n.prefix}"-\u10D8\u10D7`
            : n.format === "ends_with"
              ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${n.suffix}"-\u10D8\u10D7`
              : n.format === "includes"
                ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${n.includes}"-\u10E1`
                : n.format === "regex"
                  ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${n.pattern}`
                  : `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${r[n.format] ?? i.format}`;
        }
        case "not_multiple_of":
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${i.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
        case "unrecognized_keys":
          return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${i.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${y(i.keys, ", ")}`;
        case "invalid_key":
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${i.origin}-\u10E8\u10D8`;
        case "invalid_union":
          return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
        case "invalid_element":
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${i.origin}-\u10E8\u10D8`;
        default:
          return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
      }
    };
  };
function fy() {
  return {localeError: DI()};
}
var LI = () => {
  let e = {
    string: {
      unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A",
      verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793",
    },
    file: {unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793"},
    array: {
      unit: "\u1792\u17B6\u178F\u17BB",
      verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793",
    },
    set: {
      unit: "\u1792\u17B6\u178F\u17BB",
      verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n)
            ? "\u1798\u17B7\u1793\u1798\u17C2\u1793\u1787\u17B6\u179B\u17C1\u1781 (NaN)"
            : "\u179B\u17C1\u1781";
        case "object": {
          if (Array.isArray(n)) return "\u17A2\u17B6\u179A\u17C1 (Array)";
          if (n === null)
            return "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex:
        "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
      email:
        "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
      url: "URL",
      emoji:
        "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
      date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
      time: "\u1798\u17C9\u17C4\u1784 ISO",
      duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
      ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
      ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
      cidrv4:
        "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
      cidrv6:
        "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
      base64:
        "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
      base64url:
        "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
      json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
      e164: "\u179B\u17C1\u1781 E.164",
      jwt: "JWT",
      template_literal:
        "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${E(n.values[0])}`
          : `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${o} ${n.maximum.toString()} ${s.unit ?? "\u1792\u17B6\u178F\u17BB"}`
          : `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${o} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin} ${o} ${n.minimum.toString()} ${s.unit}`
          : `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin} ${o} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${o.prefix}"`
          : o.format === "ends_with"
            ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${o.suffix}"`
            : o.format === "includes"
              ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${o.includes}"`
              : o.format === "regex"
                ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${o.pattern}`
                : `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${n.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${n.origin}`;
      case "invalid_union":
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${n.origin}`;
      default:
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
    }
  };
};
function us() {
  return {localeError: LI()};
}
function py() {
  return us();
}
var FI = () => {
  let e = {
    string: {unit: "\uBB38\uC790", verb: "to have"},
    file: {unit: "\uBC14\uC774\uD2B8", verb: "to have"},
    array: {unit: "\uAC1C", verb: "to have"},
    set: {unit: "\uAC1C", verb: "to have"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\uC785\uB825",
      email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
      url: "URL",
      emoji: "\uC774\uBAA8\uC9C0",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
      date: "ISO \uB0A0\uC9DC",
      time: "ISO \uC2DC\uAC04",
      duration: "ISO \uAE30\uAC04",
      ipv4: "IPv4 \uC8FC\uC18C",
      ipv6: "IPv6 \uC8FC\uC18C",
      cidrv4: "IPv4 \uBC94\uC704",
      cidrv6: "IPv6 \uBC94\uC704",
      base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
      base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
      json_string: "JSON \uBB38\uC790\uC5F4",
      e164: "E.164 \uBC88\uD638",
      jwt: "JWT",
      template_literal: "\uC785\uB825",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${n.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${r(n.input)}\uC785\uB2C8\uB2E4`;
      case "invalid_value":
        return n.values.length === 1
          ? `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${E(n.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`
          : `\uC798\uBABB\uB41C \uC635\uC158: ${y(n.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        let o = n.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC",
          s =
            o === "\uBBF8\uB9CC"
              ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"
              : "\uC5EC\uC57C \uD569\uB2C8\uB2E4",
          a = t(n.origin),
          c = a?.unit ?? "\uC694\uC18C";
        return a
          ? `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${n.maximum.toString()}${c} ${o}${s}`
          : `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${n.maximum.toString()} ${o}${s}`;
      }
      case "too_small": {
        let o = n.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC",
          s =
            o === "\uC774\uC0C1"
              ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"
              : "\uC5EC\uC57C \uD569\uB2C8\uB2E4",
          a = t(n.origin),
          c = a?.unit ?? "\uC694\uC18C";
        return a
          ? `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${n.minimum.toString()}${c} ${o}${s}`
          : `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${n.minimum.toString()} ${o}${s}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${o.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`
          : o.format === "ends_with"
            ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${o.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`
            : o.format === "includes"
              ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${o.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`
              : o.format === "regex"
                ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${o.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`
                : `\uC798\uBABB\uB41C ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${n.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${n.origin}`;
      case "invalid_union":
        return "\uC798\uBABB\uB41C \uC785\uB825";
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${n.origin}`;
      default:
        return "\uC798\uBABB\uB41C \uC785\uB825";
    }
  };
};
function my() {
  return {localeError: FI()};
}
var MI = (e) => ki(typeof e, e),
  ki = (e, t = void 0) => {
    switch (e) {
      case "number":
        return Number.isNaN(t) ? "NaN" : "skai\u010Dius";
      case "bigint":
        return "sveikasis skai\u010Dius";
      case "string":
        return "eilut\u0117";
      case "boolean":
        return "login\u0117 reik\u0161m\u0117";
      case "undefined":
      case "void":
        return "neapibr\u0117\u017Eta reik\u0161m\u0117";
      case "function":
        return "funkcija";
      case "symbol":
        return "simbolis";
      case "object":
        return t === void 0
          ? "ne\u017Einomas objektas"
          : t === null
            ? "nulin\u0117 reik\u0161m\u0117"
            : Array.isArray(t)
              ? "masyvas"
              : Object.getPrototypeOf(t) !== Object.prototype && t.constructor
                ? t.constructor.name
                : "objektas";
      case "null":
        return "nulin\u0117 reik\u0161m\u0117";
    }
    return e;
  },
  Ei = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function gy(e) {
  let t = Math.abs(e),
    r = t % 10,
    i = t % 100;
  return (i >= 11 && i <= 19) || r === 0 ? "many" : r === 1 ? "one" : "few";
}
var BI = () => {
  let e = {
    string: {
      unit: {one: "simbolis", few: "simboliai", many: "simboli\u0173"},
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
          notInclusive: "turi b\u016Bti trumpesn\u0117 kaip",
        },
        bigger: {
          inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
          notInclusive: "turi b\u016Bti ilgesn\u0117 kaip",
        },
      },
    },
    file: {
      unit: {one: "baitas", few: "baitai", many: "bait\u0173"},
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne didesnis kaip",
          notInclusive: "turi b\u016Bti ma\u017Eesnis kaip",
        },
        bigger: {
          inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
          notInclusive: "turi b\u016Bti didesnis kaip",
        },
      },
    },
    array: {
      unit: {one: "element\u0105", few: "elementus", many: "element\u0173"},
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip",
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip",
        },
      },
    },
    set: {
      unit: {one: "element\u0105", few: "elementus", many: "element\u0173"},
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip",
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip",
        },
      },
    },
  };
  function t(i, n, o, s) {
    let a = e[i] ?? null;
    return a === null
      ? a
      : {unit: a.unit[n], verb: a.verb[s][o ? "inclusive" : "notInclusive"]};
  }
  let r = {
    regex: "\u012Fvestis",
    email: "el. pa\u0161to adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukm\u0117",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 u\u017Ekoduota eilut\u0117",
    base64url: "base64url u\u017Ekoduota eilut\u0117",
    json_string: "JSON eilut\u0117",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "\u012Fvestis",
  };
  return (i) => {
    switch (i.code) {
      case "invalid_type":
        return `Gautas tipas ${MI(i.input)}, o tik\u0117tasi - ${ki(i.expected)}`;
      case "invalid_value":
        return i.values.length === 1
          ? `Privalo b\u016Bti ${E(i.values[0])}`
          : `Privalo b\u016Bti vienas i\u0161 ${y(i.values, "|")} pasirinkim\u0173`;
      case "too_big": {
        let n = ki(i.origin),
          o = t(i.origin, gy(Number(i.maximum)), i.inclusive ?? !1, "smaller");
        if (o?.verb)
          return `${Ei(n ?? i.origin ?? "reik\u0161m\u0117")} ${o.verb} ${i.maximum.toString()} ${o.unit ?? "element\u0173"}`;
        let s = i.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
        return `${Ei(n ?? i.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${s} ${i.maximum.toString()} ${o?.unit}`;
      }
      case "too_small": {
        let n = ki(i.origin),
          o = t(i.origin, gy(Number(i.minimum)), i.inclusive ?? !1, "bigger");
        if (o?.verb)
          return `${Ei(n ?? i.origin ?? "reik\u0161m\u0117")} ${o.verb} ${i.minimum.toString()} ${o.unit ?? "element\u0173"}`;
        let s = i.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
        return `${Ei(n ?? i.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${s} ${i.minimum.toString()} ${o?.unit}`;
      }
      case "invalid_format": {
        let n = i;
        return n.format === "starts_with"
          ? `Eilut\u0117 privalo prasid\u0117ti "${n.prefix}"`
          : n.format === "ends_with"
            ? `Eilut\u0117 privalo pasibaigti "${n.suffix}"`
            : n.format === "includes"
              ? `Eilut\u0117 privalo \u012Ftraukti "${n.includes}"`
              : n.format === "regex"
                ? `Eilut\u0117 privalo atitikti ${n.pattern}`
                : `Neteisingas ${r[n.format] ?? i.format}`;
      }
      case "not_multiple_of":
        return `Skai\u010Dius privalo b\u016Bti ${i.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpa\u017Eint${i.keys.length > 1 ? "i" : "as"} rakt${i.keys.length > 1 ? "ai" : "as"}: ${y(i.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga \u012Fvestis";
      case "invalid_element": {
        let n = ki(i.origin);
        return `${Ei(n ?? i.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
      }
      default:
        return "Klaidinga \u012Fvestis";
    }
  };
};
function vy() {
  return {localeError: BI()};
}
var ZI = () => {
  let e = {
    string: {
      unit: "\u0437\u043D\u0430\u0446\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
    file: {
      unit: "\u0431\u0430\u0458\u0442\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
    array: {
      unit: "\u0441\u0442\u0430\u0432\u043A\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
    set: {
      unit: "\u0441\u0442\u0430\u0432\u043A\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u0431\u0440\u043E\u0458";
        case "object": {
          if (Array.isArray(n)) return "\u043D\u0438\u0437\u0430";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0432\u043D\u0435\u0441",
      email:
        "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
      url: "URL",
      emoji: "\u0435\u043C\u043E\u045F\u0438",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
      date: "ISO \u0434\u0430\u0442\u0443\u043C",
      time: "ISO \u0432\u0440\u0435\u043C\u0435",
      duration:
        "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
      ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
      ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
      cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
      cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
      base64:
        "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
      base64url:
        "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
      json_string: "JSON \u043D\u0438\u0437\u0430",
      e164: "E.164 \u0431\u0440\u043E\u0458",
      jwt: "JWT",
      template_literal: "\u0432\u043D\u0435\u0441",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Invalid input: expected ${E(n.values[0])}`
          : `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${o}${n.maximum.toString()} ${s.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`
          : `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin} \u0434\u0430 \u0438\u043C\u0430 ${o}${n.minimum.toString()} ${s.unit}`
          : `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${o.prefix}"`
          : o.format === "ends_with"
            ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${o.suffix}"`
            : o.format === "includes"
              ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${o.includes}"`
              : o.format === "regex"
                ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${o.pattern}`
                : `Invalid ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${n.divisor}`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${n.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${n.origin}`;
      default:
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
    }
  };
};
function _y() {
  return {localeError: ZI()};
}
var qI = () => {
  let e = {
    string: {unit: "aksara", verb: "mempunyai"},
    file: {unit: "bait", verb: "mempunyai"},
    array: {unit: "elemen", verb: "mempunyai"},
    set: {unit: "elemen", verb: "mempunyai"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "nombor";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "input",
      email: "alamat e-mel",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "tarikh masa ISO",
      date: "tarikh ISO",
      time: "masa ISO",
      duration: "tempoh ISO",
      ipv4: "alamat IPv4",
      ipv6: "alamat IPv6",
      cidrv4: "julat IPv4",
      cidrv6: "julat IPv6",
      base64: "string dikodkan base64",
      base64url: "string dikodkan base64url",
      json_string: "string JSON",
      e164: "nombor E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Input tidak sah: dijangka ${n.expected}, diterima ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Input tidak sah: dijangka ${E(n.values[0])}`
          : `Pilihan tidak sah: dijangka salah satu daripada ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Terlalu besar: dijangka ${n.origin ?? "nilai"} ${s.verb} ${o}${n.maximum.toString()} ${s.unit ?? "elemen"}`
          : `Terlalu besar: dijangka ${n.origin ?? "nilai"} adalah ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Terlalu kecil: dijangka ${n.origin} ${s.verb} ${o}${n.minimum.toString()} ${s.unit}`
          : `Terlalu kecil: dijangka ${n.origin} adalah ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `String tidak sah: mesti bermula dengan "${o.prefix}"`
          : o.format === "ends_with"
            ? `String tidak sah: mesti berakhir dengan "${o.suffix}"`
            : o.format === "includes"
              ? `String tidak sah: mesti mengandungi "${o.includes}"`
              : o.format === "regex"
                ? `String tidak sah: mesti sepadan dengan corak ${o.pattern}`
                : `${i[o.format] ?? n.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${n.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${n.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${n.origin}`;
      default:
        return "Input tidak sah";
    }
  };
};
function yy() {
  return {localeError: qI()};
}
var VI = () => {
  let e = {
    string: {unit: "tekens", verb: "te hebben"},
    file: {unit: "bytes", verb: "te hebben"},
    array: {unit: "elementen", verb: "te hebben"},
    set: {unit: "elementen", verb: "te hebben"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "getal";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "invoer",
      email: "emailadres",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datum en tijd",
      date: "ISO datum",
      time: "ISO tijd",
      duration: "ISO duur",
      ipv4: "IPv4-adres",
      ipv6: "IPv6-adres",
      cidrv4: "IPv4-bereik",
      cidrv6: "IPv6-bereik",
      base64: "base64-gecodeerde tekst",
      base64url: "base64 URL-gecodeerde tekst",
      json_string: "JSON string",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "invoer",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Ongeldige invoer: verwacht ${n.expected}, ontving ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Ongeldige invoer: verwacht ${E(n.values[0])}`
          : `Ongeldige optie: verwacht \xE9\xE9n van ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Te groot: verwacht dat ${n.origin ?? "waarde"} ${s.verb} ${o}${n.maximum.toString()} ${s.unit ?? "elementen"}`
          : `Te groot: verwacht dat ${n.origin ?? "waarde"} ${o}${n.maximum.toString()} is`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Te klein: verwacht dat ${n.origin} ${s.verb} ${o}${n.minimum.toString()} ${s.unit}`
          : `Te klein: verwacht dat ${n.origin} ${o}${n.minimum.toString()} is`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Ongeldige tekst: moet met "${o.prefix}" beginnen`
          : o.format === "ends_with"
            ? `Ongeldige tekst: moet op "${o.suffix}" eindigen`
            : o.format === "includes"
              ? `Ongeldige tekst: moet "${o.includes}" bevatten`
              : o.format === "regex"
                ? `Ongeldige tekst: moet overeenkomen met patroon ${o.pattern}`
                : `Ongeldig: ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${n.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${n.keys.length > 1 ? "s" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${n.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${n.origin}`;
      default:
        return "Ongeldige invoer";
    }
  };
};
function by() {
  return {localeError: VI()};
}
var WI = () => {
  let e = {
    string: {unit: "tegn", verb: "\xE5 ha"},
    file: {unit: "bytes", verb: "\xE5 ha"},
    array: {unit: "elementer", verb: "\xE5 inneholde"},
    set: {unit: "elementer", verb: "\xE5 inneholde"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "tall";
        case "object": {
          if (Array.isArray(n)) return "liste";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "input",
      email: "e-postadresse",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dato- og klokkeslett",
      date: "ISO-dato",
      time: "ISO-klokkeslett",
      duration: "ISO-varighet",
      ipv4: "IPv4-omr\xE5de",
      ipv6: "IPv6-omr\xE5de",
      cidrv4: "IPv4-spekter",
      cidrv6: "IPv6-spekter",
      base64: "base64-enkodet streng",
      base64url: "base64url-enkodet streng",
      json_string: "JSON-streng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "input",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Ugyldig input: forventet ${n.expected}, fikk ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Ugyldig verdi: forventet ${E(n.values[0])}`
          : `Ugyldig valg: forventet en av ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `For stor(t): forventet ${n.origin ?? "value"} til \xE5 ha ${o}${n.maximum.toString()} ${s.unit ?? "elementer"}`
          : `For stor(t): forventet ${n.origin ?? "value"} til \xE5 ha ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `For lite(n): forventet ${n.origin} til \xE5 ha ${o}${n.minimum.toString()} ${s.unit}`
          : `For lite(n): forventet ${n.origin} til \xE5 ha ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Ugyldig streng: m\xE5 starte med "${o.prefix}"`
          : o.format === "ends_with"
            ? `Ugyldig streng: m\xE5 ende med "${o.suffix}"`
            : o.format === "includes"
              ? `Ugyldig streng: m\xE5 inneholde "${o.includes}"`
              : o.format === "regex"
                ? `Ugyldig streng: m\xE5 matche m\xF8nsteret ${o.pattern}`
                : `Ugyldig ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${n.divisor}`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${n.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${n.origin}`;
      default:
        return "Ugyldig input";
    }
  };
};
function wy() {
  return {localeError: WI()};
}
var JI = () => {
  let e = {
    string: {unit: "harf", verb: "olmal\u0131d\u0131r"},
    file: {unit: "bayt", verb: "olmal\u0131d\u0131r"},
    array: {unit: "unsur", verb: "olmal\u0131d\u0131r"},
    set: {unit: "unsur", verb: "olmal\u0131d\u0131r"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "numara";
        case "object": {
          if (Array.isArray(n)) return "saf";
          if (n === null) return "gayb";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "giren",
      email: "epostag\xE2h",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO heng\xE2m\u0131",
      date: "ISO tarihi",
      time: "ISO zaman\u0131",
      duration: "ISO m\xFCddeti",
      ipv4: "IPv4 ni\u015F\xE2n\u0131",
      ipv6: "IPv6 ni\u015F\xE2n\u0131",
      cidrv4: "IPv4 menzili",
      cidrv6: "IPv6 menzili",
      base64: "base64-\u015Fifreli metin",
      base64url: "base64url-\u015Fifreli metin",
      json_string: "JSON metin",
      e164: "E.164 say\u0131s\u0131",
      jwt: "JWT",
      template_literal: "giren",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `F\xE2sit giren: umulan ${n.expected}, al\u0131nan ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `F\xE2sit giren: umulan ${E(n.values[0])}`
          : `F\xE2sit tercih: m\xFBteberler ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Fazla b\xFCy\xFCk: ${n.origin ?? "value"}, ${o}${n.maximum.toString()} ${s.unit ?? "elements"} sahip olmal\u0131yd\u0131.`
          : `Fazla b\xFCy\xFCk: ${n.origin ?? "value"}, ${o}${n.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Fazla k\xFC\xE7\xFCk: ${n.origin}, ${o}${n.minimum.toString()} ${s.unit} sahip olmal\u0131yd\u0131.`
          : `Fazla k\xFC\xE7\xFCk: ${n.origin}, ${o}${n.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `F\xE2sit metin: "${o.prefix}" ile ba\u015Flamal\u0131.`
          : o.format === "ends_with"
            ? `F\xE2sit metin: "${o.suffix}" ile bitmeli.`
            : o.format === "includes"
              ? `F\xE2sit metin: "${o.includes}" ihtiv\xE2 etmeli.`
              : o.format === "regex"
                ? `F\xE2sit metin: ${o.pattern} nak\u015F\u0131na uymal\u0131.`
                : `F\xE2sit ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${n.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${n.keys.length > 1 ? "s" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${n.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return "K\u0131ymet tan\u0131namad\u0131.";
    }
  };
};
function xy() {
  return {localeError: JI()};
}
var KI = () => {
  let e = {
    string: {unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A"},
    file: {unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A"},
    array: {unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A"},
    set: {unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u0639\u062F\u062F";
        case "object": {
          if (Array.isArray(n)) return "\u0627\u0631\u06D0";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0648\u0631\u0648\u062F\u064A",
      email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
      url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
      emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
      date: "\u0646\u06D0\u067C\u0647",
      time: "\u0648\u062E\u062A",
      duration: "\u0645\u0648\u062F\u0647",
      ipv4: "\u062F IPv4 \u067E\u062A\u0647",
      ipv6: "\u062F IPv6 \u067E\u062A\u0647",
      cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
      cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
      base64: "base64-encoded \u0645\u062A\u0646",
      base64url: "base64url-encoded \u0645\u062A\u0646",
      json_string: "JSON \u0645\u062A\u0646",
      e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
      jwt: "JWT",
      template_literal: "\u0648\u0631\u0648\u062F\u064A",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${n.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${r(n.input)} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${E(n.values[0])} \u0648\u0627\u06CC`
          : `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${y(n.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${n.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${o}${n.maximum.toString()} ${s.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`
          : `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${n.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${o}${n.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${n.origin} \u0628\u0627\u06CC\u062F ${o}${n.minimum.toString()} ${s.unit} \u0648\u0644\u0631\u064A`
          : `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${n.origin} \u0628\u0627\u06CC\u062F ${o}${n.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${o.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`
          : o.format === "ends_with"
            ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${o.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`
            : o.format === "includes"
              ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${o.includes}" \u0648\u0644\u0631\u064A`
              : o.format === "regex"
                ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${o.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`
                : `${i[o.format] ?? n.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${n.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${n.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${n.origin} \u06A9\u06D0`;
      case "invalid_union":
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${n.origin} \u06A9\u06D0`;
      default:
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
    }
  };
};
function Sy() {
  return {localeError: KI()};
}
var GI = () => {
  let e = {
    string: {unit: "znak\xF3w", verb: "mie\u0107"},
    file: {unit: "bajt\xF3w", verb: "mie\u0107"},
    array: {unit: "element\xF3w", verb: "mie\u0107"},
    set: {unit: "element\xF3w", verb: "mie\u0107"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "liczba";
        case "object": {
          if (Array.isArray(n)) return "tablica";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "wyra\u017Cenie",
      email: "adres email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data i godzina w formacie ISO",
      date: "data w formacie ISO",
      time: "godzina w formacie ISO",
      duration: "czas trwania ISO",
      ipv4: "adres IPv4",
      ipv6: "adres IPv6",
      cidrv4: "zakres IPv4",
      cidrv6: "zakres IPv6",
      base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
      base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
      json_string: "ci\u0105g znak\xF3w w formacie JSON",
      e164: "liczba E.164",
      jwt: "JWT",
      template_literal: "wej\u015Bcie",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${n.expected}, otrzymano ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${E(n.values[0])}`
          : `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${o}${n.maximum.toString()} ${s.unit ?? "element\xF3w"}`
          : `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${o}${n.minimum.toString()} ${s.unit ?? "element\xF3w"}`
          : `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${o.prefix}"`
          : o.format === "ends_with"
            ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${o.suffix}"`
            : o.format === "includes"
              ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${o.includes}"`
              : o.format === "regex"
                ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${o.pattern}`
                : `Nieprawid\u0142ow(y/a/e) ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${n.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${n.keys.length > 1 ? "s" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${n.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${n.origin}`;
      default:
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
    }
  };
};
function $y() {
  return {localeError: GI()};
}
var HI = () => {
  let e = {
    string: {unit: "caracteres", verb: "ter"},
    file: {unit: "bytes", verb: "ter"},
    array: {unit: "itens", verb: "ter"},
    set: {unit: "itens", verb: "ter"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "n\xFAmero";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "nulo";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "padr\xE3o",
      email: "endere\xE7o de e-mail",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data e hora ISO",
      date: "data ISO",
      time: "hora ISO",
      duration: "dura\xE7\xE3o ISO",
      ipv4: "endere\xE7o IPv4",
      ipv6: "endere\xE7o IPv6",
      cidrv4: "faixa de IPv4",
      cidrv6: "faixa de IPv6",
      base64: "texto codificado em base64",
      base64url: "URL codificada em base64",
      json_string: "texto JSON",
      e164: "n\xFAmero E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Tipo inv\xE1lido: esperado ${n.expected}, recebido ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Entrada inv\xE1lida: esperado ${E(n.values[0])}`
          : `Op\xE7\xE3o inv\xE1lida: esperada uma das ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Muito grande: esperado que ${n.origin ?? "valor"} tivesse ${o}${n.maximum.toString()} ${s.unit ?? "elementos"}`
          : `Muito grande: esperado que ${n.origin ?? "valor"} fosse ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Muito pequeno: esperado que ${n.origin} tivesse ${o}${n.minimum.toString()} ${s.unit}`
          : `Muito pequeno: esperado que ${n.origin} fosse ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Texto inv\xE1lido: deve come\xE7ar com "${o.prefix}"`
          : o.format === "ends_with"
            ? `Texto inv\xE1lido: deve terminar com "${o.suffix}"`
            : o.format === "includes"
              ? `Texto inv\xE1lido: deve incluir "${o.includes}"`
              : o.format === "regex"
                ? `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${o.pattern}`
                : `${i[o.format] ?? n.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${n.divisor}`;
      case "unrecognized_keys":
        return `Chave${n.keys.length > 1 ? "s" : ""} desconhecida${n.keys.length > 1 ? "s" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${n.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${n.origin}`;
      default:
        return "Campo inv\xE1lido";
    }
  };
};
function Ey() {
  return {localeError: HI()};
}
function ky(e, t, r, i) {
  let n = Math.abs(e),
    o = n % 10,
    s = n % 100;
  return s >= 11 && s <= 19 ? i : o === 1 ? t : o >= 2 && o <= 4 ? r : i;
}
var YI = () => {
  let e = {
    string: {
      unit: {
        one: "\u0441\u0438\u043C\u0432\u043E\u043B",
        few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
        many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u0430",
        many: "\u0431\u0430\u0439\u0442",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u0447\u0438\u0441\u043B\u043E";
        case "object": {
          if (Array.isArray(n)) return "\u043C\u0430\u0441\u0441\u0438\u0432";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0432\u0432\u043E\u0434",
      email: "email \u0430\u0434\u0440\u0435\u0441",
      url: "URL",
      emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
      date: "ISO \u0434\u0430\u0442\u0430",
      time: "ISO \u0432\u0440\u0435\u043C\u044F",
      duration:
        "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
      ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
      ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
      cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      base64:
        "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
      base64url:
        "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
      json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
      e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
      jwt: "JWT",
      template_literal: "\u0432\u0432\u043E\u0434",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${n.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${E(n.values[0])}`
          : `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        if (s) {
          let a = Number(n.maximum),
            c = ky(a, s.unit.one, s.unit.few, s.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${o}${n.maximum.toString()} ${c}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        if (s) {
          let a = Number(n.minimum),
            c = ky(a, s.unit.one, s.unit.few, s.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${o}${n.minimum.toString()} ${c}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin} \u0431\u0443\u0434\u0435\u0442 ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${o.prefix}"`
          : o.format === "ends_with"
            ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${o.suffix}"`
            : o.format === "includes"
              ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${o.includes}"`
              : o.format === "regex"
                ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${o.pattern}`
                : `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${n.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${n.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${n.keys.length > 1 ? "\u0438" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${n.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${n.origin}`;
      default:
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
    }
  };
};
function Ay() {
  return {localeError: YI()};
}
var XI = () => {
  let e = {
    string: {unit: "znakov", verb: "imeti"},
    file: {unit: "bajtov", verb: "imeti"},
    array: {unit: "elementov", verb: "imeti"},
    set: {unit: "elementov", verb: "imeti"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u0161tevilo";
        case "object": {
          if (Array.isArray(n)) return "tabela";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "vnos",
      email: "e-po\u0161tni naslov",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datum in \u010Das",
      date: "ISO datum",
      time: "ISO \u010Das",
      duration: "ISO trajanje",
      ipv4: "IPv4 naslov",
      ipv6: "IPv6 naslov",
      cidrv4: "obseg IPv4",
      cidrv6: "obseg IPv6",
      base64: "base64 kodiran niz",
      base64url: "base64url kodiran niz",
      json_string: "JSON niz",
      e164: "E.164 \u0161tevilka",
      jwt: "JWT",
      template_literal: "vnos",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Neveljaven vnos: pri\u010Dakovano ${n.expected}, prejeto ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Neveljaven vnos: pri\u010Dakovano ${E(n.values[0])}`
          : `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Preveliko: pri\u010Dakovano, da bo ${n.origin ?? "vrednost"} imelo ${o}${n.maximum.toString()} ${s.unit ?? "elementov"}`
          : `Preveliko: pri\u010Dakovano, da bo ${n.origin ?? "vrednost"} ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Premajhno: pri\u010Dakovano, da bo ${n.origin} imelo ${o}${n.minimum.toString()} ${s.unit}`
          : `Premajhno: pri\u010Dakovano, da bo ${n.origin} ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Neveljaven niz: mora se za\u010Deti z "${o.prefix}"`
          : o.format === "ends_with"
            ? `Neveljaven niz: mora se kon\u010Dati z "${o.suffix}"`
            : o.format === "includes"
              ? `Neveljaven niz: mora vsebovati "${o.includes}"`
              : o.format === "regex"
                ? `Neveljaven niz: mora ustrezati vzorcu ${o.pattern}`
                : `Neveljaven ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${n.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${n.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${n.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${n.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function Iy() {
  return {localeError: XI()};
}
var QI = () => {
  let e = {
    string: {unit: "tecken", verb: "att ha"},
    file: {unit: "bytes", verb: "att ha"},
    array: {unit: "objekt", verb: "att inneh\xE5lla"},
    set: {unit: "objekt", verb: "att inneh\xE5lla"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "antal";
        case "object": {
          if (Array.isArray(n)) return "lista";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "regulj\xE4rt uttryck",
      email: "e-postadress",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-datum och tid",
      date: "ISO-datum",
      time: "ISO-tid",
      duration: "ISO-varaktighet",
      ipv4: "IPv4-intervall",
      ipv6: "IPv6-intervall",
      cidrv4: "IPv4-spektrum",
      cidrv6: "IPv6-spektrum",
      base64: "base64-kodad str\xE4ng",
      base64url: "base64url-kodad str\xE4ng",
      json_string: "JSON-str\xE4ng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "mall-literal",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${n.expected}, fick ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `Ogiltig inmatning: f\xF6rv\xE4ntat ${E(n.values[0])}`
          : `Ogiltigt val: f\xF6rv\xE4ntade en av ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `F\xF6r stor(t): f\xF6rv\xE4ntade ${n.origin ?? "v\xE4rdet"} att ha ${o}${n.maximum.toString()} ${s.unit ?? "element"}`
          : `F\xF6r stor(t): f\xF6rv\xE4ntat ${n.origin ?? "v\xE4rdet"} att ha ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `F\xF6r lite(t): f\xF6rv\xE4ntade ${n.origin ?? "v\xE4rdet"} att ha ${o}${n.minimum.toString()} ${s.unit}`
          : `F\xF6r lite(t): f\xF6rv\xE4ntade ${n.origin ?? "v\xE4rdet"} att ha ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${o.prefix}"`
          : o.format === "ends_with"
            ? `Ogiltig str\xE4ng: m\xE5ste sluta med "${o.suffix}"`
            : o.format === "includes"
              ? `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${o.includes}"`
              : o.format === "regex"
                ? `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${o.pattern}"`
                : `Ogiltig(t) ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${n.divisor}`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${n.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${n.origin ?? "v\xE4rdet"}`;
      default:
        return "Ogiltig input";
    }
  };
};
function Oy() {
  return {localeError: QI()};
}
var eO = () => {
  let e = {
    string: {
      unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD",
      verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
    file: {
      unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD",
      verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
    array: {
      unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
      verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
    set: {
      unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
      verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n)
            ? "\u0B8E\u0BA3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BBE\u0BA4\u0BA4\u0BC1"
            : "\u0B8E\u0BA3\u0BCD";
        case "object": {
          if (Array.isArray(n)) return "\u0B85\u0BA3\u0BBF";
          if (n === null) return "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
      email:
        "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
      date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
      time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
      duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
      ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
      ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
      cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
      cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
      base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
      base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
      json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
      e164: "E.164 \u0B8E\u0BA3\u0BCD",
      jwt: "JWT",
      template_literal: "input",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${E(n.values[0])}`
          : `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${y(n.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${o}${n.maximum.toString()} ${s.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${o}${n.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin} ${o}${n.minimum.toString()} ${s.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin} ${o}${n.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${o.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : o.format === "ends_with"
            ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${o.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
            : o.format === "includes"
              ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${o.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
              : o.format === "regex"
                ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${o.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
                : `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${n.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${n.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${n.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
    }
  };
};
function Ty() {
  return {localeError: eO()};
}
var tO = () => {
  let e = {
    string: {
      unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23",
      verb: "\u0E04\u0E27\u0E23\u0E21\u0E35",
    },
    file: {unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35"},
    array: {
      unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
      verb: "\u0E04\u0E27\u0E23\u0E21\u0E35",
    },
    set: {
      unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
      verb: "\u0E04\u0E27\u0E23\u0E21\u0E35",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n)
            ? "\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02 (NaN)"
            : "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02";
        case "object": {
          if (Array.isArray(n))
            return "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)";
          if (n === null)
            return "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex:
        "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
      email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
      url: "URL",
      emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
      date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
      time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
      duration:
        "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
      ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
      ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
      cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
      cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
      base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
      base64url:
        "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
      json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
      e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
      jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
      template_literal:
        "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${n.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${E(n.values[0])}`
          : `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive
            ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19"
            : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32",
          s = t(n.origin);
        return s
          ? `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${o} ${n.maximum.toString()} ${s.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`
          : `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${o} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive
            ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22"
            : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32",
          s = t(n.origin);
        return s
          ? `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${o} ${n.minimum.toString()} ${s.unit}`
          : `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${o} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${o.prefix}"`
          : o.format === "ends_with"
            ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${o.suffix}"`
            : o.format === "includes"
              ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${o.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`
              : o.format === "regex"
                ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${o.pattern}`
                : `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${n.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${n.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${n.origin}`;
      default:
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07";
    }
  };
};
function jy() {
  return {localeError: tO()};
}
var rO = (e) => {
    let t = typeof e;
    switch (t) {
      case "number":
        return Number.isNaN(e) ? "NaN" : "number";
      case "object": {
        if (Array.isArray(e)) return "array";
        if (e === null) return "null";
        if (Object.getPrototypeOf(e) !== Object.prototype && e.constructor)
          return e.constructor.name;
      }
    }
    return t;
  },
  nO = () => {
    let e = {
      string: {unit: "karakter", verb: "olmal\u0131"},
      file: {unit: "bayt", verb: "olmal\u0131"},
      array: {unit: "\xF6\u011Fe", verb: "olmal\u0131"},
      set: {unit: "\xF6\u011Fe", verb: "olmal\u0131"},
    };
    function t(i) {
      return e[i] ?? null;
    }
    let r = {
      regex: "girdi",
      email: "e-posta adresi",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO tarih ve saat",
      date: "ISO tarih",
      time: "ISO saat",
      duration: "ISO s\xFCre",
      ipv4: "IPv4 adresi",
      ipv6: "IPv6 adresi",
      cidrv4: "IPv4 aral\u0131\u011F\u0131",
      cidrv6: "IPv6 aral\u0131\u011F\u0131",
      base64: "base64 ile \u015Fifrelenmi\u015F metin",
      base64url: "base64url ile \u015Fifrelenmi\u015F metin",
      json_string: "JSON dizesi",
      e164: "E.164 say\u0131s\u0131",
      jwt: "JWT",
      template_literal: "\u015Eablon dizesi",
    };
    return (i) => {
      switch (i.code) {
        case "invalid_type":
          return `Ge\xE7ersiz de\u011Fer: beklenen ${i.expected}, al\u0131nan ${rO(i.input)}`;
        case "invalid_value":
          return i.values.length === 1
            ? `Ge\xE7ersiz de\u011Fer: beklenen ${E(i.values[0])}`
            : `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${y(i.values, "|")}`;
        case "too_big": {
          let n = i.inclusive ? "<=" : "<",
            o = t(i.origin);
          return o
            ? `\xC7ok b\xFCy\xFCk: beklenen ${i.origin ?? "de\u011Fer"} ${n}${i.maximum.toString()} ${o.unit ?? "\xF6\u011Fe"}`
            : `\xC7ok b\xFCy\xFCk: beklenen ${i.origin ?? "de\u011Fer"} ${n}${i.maximum.toString()}`;
        }
        case "too_small": {
          let n = i.inclusive ? ">=" : ">",
            o = t(i.origin);
          return o
            ? `\xC7ok k\xFC\xE7\xFCk: beklenen ${i.origin} ${n}${i.minimum.toString()} ${o.unit}`
            : `\xC7ok k\xFC\xE7\xFCk: beklenen ${i.origin} ${n}${i.minimum.toString()}`;
        }
        case "invalid_format": {
          let n = i;
          return n.format === "starts_with"
            ? `Ge\xE7ersiz metin: "${n.prefix}" ile ba\u015Flamal\u0131`
            : n.format === "ends_with"
              ? `Ge\xE7ersiz metin: "${n.suffix}" ile bitmeli`
              : n.format === "includes"
                ? `Ge\xE7ersiz metin: "${n.includes}" i\xE7ermeli`
                : n.format === "regex"
                  ? `Ge\xE7ersiz metin: ${n.pattern} desenine uymal\u0131`
                  : `Ge\xE7ersiz ${r[n.format] ?? i.format}`;
        }
        case "not_multiple_of":
          return `Ge\xE7ersiz say\u0131: ${i.divisor} ile tam b\xF6l\xFCnebilmeli`;
        case "unrecognized_keys":
          return `Tan\u0131nmayan anahtar${i.keys.length > 1 ? "lar" : ""}: ${y(i.keys, ", ")}`;
        case "invalid_key":
          return `${i.origin} i\xE7inde ge\xE7ersiz anahtar`;
        case "invalid_union":
          return "Ge\xE7ersiz de\u011Fer";
        case "invalid_element":
          return `${i.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
        default:
          return "Ge\xE7ersiz de\u011Fer";
      }
    };
  };
function Py() {
  return {localeError: nO()};
}
var iO = () => {
  let e = {
    string: {
      unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
    file: {
      unit: "\u0431\u0430\u0439\u0442\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
    array: {
      unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
    set: {
      unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u0447\u0438\u0441\u043B\u043E";
        case "object": {
          if (Array.isArray(n)) return "\u043C\u0430\u0441\u0438\u0432";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
      email:
        "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
      url: "URL",
      emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
      date: "\u0434\u0430\u0442\u0430 ISO",
      time: "\u0447\u0430\u0441 ISO",
      duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
      ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
      ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
      cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
      cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
      base64:
        "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
      base64url:
        "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
      json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
      e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
      jwt: "JWT",
      template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${n.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${E(n.values[0])}`
          : `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${s.verb} ${o}${n.maximum.toString()} ${s.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`
          : `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin} ${s.verb} ${o}${n.minimum.toString()} ${s.unit}`
          : `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin} \u0431\u0443\u0434\u0435 ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${o.prefix}"`
          : o.format === "ends_with"
            ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${o.suffix}"`
            : o.format === "includes"
              ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${o.includes}"`
              : o.format === "regex"
                ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${o.pattern}`
                : `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${n.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${n.keys.length > 1 ? "\u0456" : ""}: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${n.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${n.origin}`;
      default:
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
    }
  };
};
function ls() {
  return {localeError: iO()};
}
function Ny() {
  return ls();
}
var oO = () => {
  let e = {
    string: {unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627"},
    file: {unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627"},
    array: {unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627"},
    set: {unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "\u0646\u0645\u0628\u0631";
        case "object": {
          if (Array.isArray(n)) return "\u0622\u0631\u06D2";
          if (n === null) return "\u0646\u0644";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0627\u0646 \u067E\u0679",
      email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
      url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
      emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
      uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      uuidv4:
        "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
      uuidv6:
        "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
      nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
      ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
      xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
      ksuid:
        "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      datetime:
        "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
      date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
      time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
      duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
      ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
      ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
      cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
      cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
      base64:
        "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
      base64url:
        "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
      json_string:
        "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
      e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
      jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
      template_literal: "\u0627\u0646 \u067E\u0679",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${n.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${r(n.input)} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${E(n.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`
          : `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${y(n.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u0628\u06C1\u062A \u0628\u0691\u0627: ${n.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${o}${n.maximum.toString()} ${s.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`
          : `\u0628\u06C1\u062A \u0628\u0691\u0627: ${n.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${o}${n.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${n.origin} \u06A9\u06D2 ${o}${n.minimum.toString()} ${s.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`
          : `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${n.origin} \u06A9\u0627 ${o}${n.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${o.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
          : o.format === "ends_with"
            ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${o.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
            : o.format === "includes"
              ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${o.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
              : o.format === "regex"
                ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${o.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
                : `\u063A\u0644\u0637 ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${n.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${n.keys.length > 1 ? "\u0632" : ""}: ${y(n.keys, "\u060C ")}`;
      case "invalid_key":
        return `${n.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${n.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
    }
  };
};
function Ry() {
  return {localeError: oO()};
}
var sO = () => {
  let e = {
    string: {unit: "k\xFD t\u1EF1", verb: "c\xF3"},
    file: {unit: "byte", verb: "c\xF3"},
    array: {unit: "ph\u1EA7n t\u1EED", verb: "c\xF3"},
    set: {unit: "ph\u1EA7n t\u1EED", verb: "c\xF3"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "s\u1ED1";
        case "object": {
          if (Array.isArray(n)) return "m\u1EA3ng";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u0111\u1EA7u v\xE0o",
      email: "\u0111\u1ECBa ch\u1EC9 email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ng\xE0y gi\u1EDD ISO",
      date: "ng\xE0y ISO",
      time: "gi\u1EDD ISO",
      duration: "kho\u1EA3ng th\u1EDDi gian ISO",
      ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
      ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
      cidrv4: "d\u1EA3i IPv4",
      cidrv6: "d\u1EA3i IPv6",
      base64: "chu\u1ED7i m\xE3 h\xF3a base64",
      base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
      json_string: "chu\u1ED7i JSON",
      e164: "s\u1ED1 E.164",
      jwt: "JWT",
      template_literal: "\u0111\u1EA7u v\xE0o",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${n.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${E(n.values[0])}`
          : `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${n.origin ?? "gi\xE1 tr\u1ECB"} ${s.verb} ${o}${n.maximum.toString()} ${s.unit ?? "ph\u1EA7n t\u1EED"}`
          : `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${n.origin ?? "gi\xE1 tr\u1ECB"} ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${n.origin} ${s.verb} ${o}${n.minimum.toString()} ${s.unit}`
          : `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${n.origin} ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${o.prefix}"`
          : o.format === "ends_with"
            ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${o.suffix}"`
            : o.format === "includes"
              ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${o.includes}"`
              : o.format === "regex"
                ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${o.pattern}`
                : `${i[o.format] ?? n.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${n.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${n.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${n.origin}`;
      default:
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
    }
  };
};
function Cy() {
  return {localeError: sO()};
}
var aO = () => {
  let e = {
    string: {unit: "\u5B57\u7B26", verb: "\u5305\u542B"},
    file: {unit: "\u5B57\u8282", verb: "\u5305\u542B"},
    array: {unit: "\u9879", verb: "\u5305\u542B"},
    set: {unit: "\u9879", verb: "\u5305\u542B"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "\u975E\u6570\u5B57(NaN)" : "\u6570\u5B57";
        case "object": {
          if (Array.isArray(n)) return "\u6570\u7EC4";
          if (n === null) return "\u7A7A\u503C(null)";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u8F93\u5165",
      email: "\u7535\u5B50\u90AE\u4EF6",
      url: "URL",
      emoji: "\u8868\u60C5\u7B26\u53F7",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO\u65E5\u671F\u65F6\u95F4",
      date: "ISO\u65E5\u671F",
      time: "ISO\u65F6\u95F4",
      duration: "ISO\u65F6\u957F",
      ipv4: "IPv4\u5730\u5740",
      ipv6: "IPv6\u5730\u5740",
      cidrv4: "IPv4\u7F51\u6BB5",
      cidrv6: "IPv6\u7F51\u6BB5",
      base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
      base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
      json_string: "JSON\u5B57\u7B26\u4E32",
      e164: "E.164\u53F7\u7801",
      jwt: "JWT",
      template_literal: "\u8F93\u5165",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${n.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${E(n.values[0])}`
          : `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${n.origin ?? "\u503C"} ${o}${n.maximum.toString()} ${s.unit ?? "\u4E2A\u5143\u7D20"}`
          : `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${n.origin ?? "\u503C"} ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${n.origin} ${o}${n.minimum.toString()} ${s.unit}`
          : `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${n.origin} ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${o.prefix}" \u5F00\u5934`
          : o.format === "ends_with"
            ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${o.suffix}" \u7ED3\u5C3E`
            : o.format === "includes"
              ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${o.includes}"`
              : o.format === "regex"
                ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${o.pattern}`
                : `\u65E0\u6548${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${n.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${n.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return "\u65E0\u6548\u8F93\u5165";
    }
  };
};
function zy() {
  return {localeError: aO()};
}
var cO = () => {
  let e = {
    string: {unit: "\u5B57\u5143", verb: "\u64C1\u6709"},
    file: {unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709"},
    array: {unit: "\u9805\u76EE", verb: "\u64C1\u6709"},
    set: {unit: "\u9805\u76EE", verb: "\u64C1\u6709"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(n)) return "array";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u8F38\u5165",
      email: "\u90F5\u4EF6\u5730\u5740",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u65E5\u671F\u6642\u9593",
      date: "ISO \u65E5\u671F",
      time: "ISO \u6642\u9593",
      duration: "ISO \u671F\u9593",
      ipv4: "IPv4 \u4F4D\u5740",
      ipv6: "IPv6 \u4F4D\u5740",
      cidrv4: "IPv4 \u7BC4\u570D",
      cidrv6: "IPv6 \u7BC4\u570D",
      base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
      base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
      json_string: "JSON \u5B57\u4E32",
      e164: "E.164 \u6578\u503C",
      jwt: "JWT",
      template_literal: "\u8F38\u5165",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${n.expected}\uFF0C\u4F46\u6536\u5230 ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${E(n.values[0])}`
          : `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${n.origin ?? "\u503C"} \u61C9\u70BA ${o}${n.maximum.toString()} ${s.unit ?? "\u500B\u5143\u7D20"}`
          : `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${n.origin ?? "\u503C"} \u61C9\u70BA ${o}${n.maximum.toString()}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${n.origin} \u61C9\u70BA ${o}${n.minimum.toString()} ${s.unit}`
          : `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${n.origin} \u61C9\u70BA ${o}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${o.prefix}" \u958B\u982D`
          : o.format === "ends_with"
            ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${o.suffix}" \u7D50\u5C3E`
            : o.format === "includes"
              ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${o.includes}"`
              : o.format === "regex"
                ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${o.pattern}`
                : `\u7121\u6548\u7684 ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${n.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${n.keys.length > 1 ? "\u5011" : ""}\uFF1A${y(n.keys, "\u3001")}`;
      case "invalid_key":
        return `${n.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${n.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
    }
  };
};
function Uy() {
  return {localeError: cO()};
}
var uO = () => {
  let e = {
    string: {unit: "\xE0mi", verb: "n\xED"},
    file: {unit: "bytes", verb: "n\xED"},
    array: {unit: "nkan", verb: "n\xED"},
    set: {unit: "nkan", verb: "n\xED"},
  };
  function t(n) {
    return e[n] ?? null;
  }
  let r = (n) => {
      let o = typeof n;
      switch (o) {
        case "number":
          return Number.isNaN(n) ? "NaN" : "n\u1ECD\u0301mb\xE0";
        case "object": {
          if (Array.isArray(n)) return "akop\u1ECD";
          if (n === null) return "null";
          if (Object.getPrototypeOf(n) !== Object.prototype && n.constructor)
            return n.constructor.name;
        }
      }
      return o;
    },
    i = {
      regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
      email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "\xE0k\xF3k\xF2 ISO",
      date: "\u1ECDj\u1ECD\u0301 ISO",
      time: "\xE0k\xF3k\xF2 ISO",
      duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
      ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
      ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
      cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
      cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
      base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
      base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
      json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
      e164: "n\u1ECD\u0301mb\xE0 E.164",
      jwt: "JWT",
      template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
    };
  return (n) => {
    switch (n.code) {
      case "invalid_type":
        return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${n.expected}, \xE0m\u1ECD\u0300 a r\xED ${r(n.input)}`;
      case "invalid_value":
        return n.values.length === 1
          ? `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${E(n.values[0])}`
          : `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${y(n.values, "|")}`;
      case "too_big": {
        let o = n.inclusive ? "<=" : "<",
          s = t(n.origin);
        return s
          ? `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${n.origin ?? "iye"} ${s.verb} ${o}${n.maximum} ${s.unit}`
          : `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${o}${n.maximum}`;
      }
      case "too_small": {
        let o = n.inclusive ? ">=" : ">",
          s = t(n.origin);
        return s
          ? `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${n.origin} ${s.verb} ${o}${n.minimum} ${s.unit}`
          : `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${o}${n.minimum}`;
      }
      case "invalid_format": {
        let o = n;
        return o.format === "starts_with"
          ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${o.prefix}"`
          : o.format === "ends_with"
            ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${o.suffix}"`
            : o.format === "includes"
              ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${o.includes}"`
              : o.format === "regex"
                ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${o.pattern}`
                : `A\u1E63\xEC\u1E63e: ${i[o.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${n.divisor}`;
      case "unrecognized_keys":
        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${y(n.keys, ", ")}`;
      case "invalid_key":
        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${n.origin}`;
      case "invalid_union":
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
      case "invalid_element":
        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${n.origin}`;
      default:
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
    }
  };
};
function Dy() {
  return {localeError: uO()};
}
var Ly,
  oh = Symbol("ZodOutput"),
  sh = Symbol("ZodInput"),
  hs = class {
    constructor() {
      (this._map = new WeakMap()), (this._idmap = new Map());
    }
    add(t, ...r) {
      let i = r[0];
      if ((this._map.set(t, i), i && typeof i == "object" && "id" in i)) {
        if (this._idmap.has(i.id))
          throw new Error(`ID ${i.id} already exists in the registry`);
        this._idmap.set(i.id, t);
      }
      return this;
    }
    clear() {
      return (this._map = new WeakMap()), (this._idmap = new Map()), this;
    }
    remove(t) {
      let r = this._map.get(t);
      return (
        r && typeof r == "object" && "id" in r && this._idmap.delete(r.id),
        this._map.delete(t),
        this
      );
    }
    get(t) {
      let r = t._zod.parent;
      if (r) {
        let i = {...(this.get(r) ?? {})};
        delete i.id;
        let n = {...i, ...this._map.get(t)};
        return Object.keys(n).length ? n : void 0;
      }
      return this._map.get(t);
    }
    has(t) {
      return this._map.has(t);
    }
  };
function ds() {
  return new hs();
}
(Ly = globalThis).__zod_globalRegistry ?? (Ly.__zod_globalRegistry = ds());
var Ce = globalThis.__zod_globalRegistry;
function ah(e, t) {
  return new e({type: "string", ...A(t)});
}
function ch(e, t) {
  return new e({type: "string", coerce: !0, ...A(t)});
}
function fs(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function Ii(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function ps(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function ms(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...A(t),
  });
}
function gs(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...A(t),
  });
}
function vs(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...A(t),
  });
}
function Oi(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function _s(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function ys(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function bs(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function ws(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function xs(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function Ss(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function $s(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function Es(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function ks(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function uh(e, t) {
  return new e({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function As(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function Is(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function Os(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function Ts(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function js(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
function Ps(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...A(t),
  });
}
var lh = {Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6};
function hh(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...A(t),
  });
}
function dh(e, t) {
  return new e({type: "string", format: "date", check: "string_format", ...A(t)});
}
function fh(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...A(t),
  });
}
function ph(e, t) {
  return new e({type: "string", format: "duration", check: "string_format", ...A(t)});
}
function mh(e, t) {
  return new e({type: "number", checks: [], ...A(t)});
}
function gh(e, t) {
  return new e({type: "number", coerce: !0, checks: [], ...A(t)});
}
function vh(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...A(t),
  });
}
function _h(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "float32",
    ...A(t),
  });
}
function yh(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "float64",
    ...A(t),
  });
}
function bh(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "int32",
    ...A(t),
  });
}
function wh(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "uint32",
    ...A(t),
  });
}
function xh(e, t) {
  return new e({type: "boolean", ...A(t)});
}
function Sh(e, t) {
  return new e({type: "boolean", coerce: !0, ...A(t)});
}
function $h(e, t) {
  return new e({type: "bigint", ...A(t)});
}
function Eh(e, t) {
  return new e({type: "bigint", coerce: !0, ...A(t)});
}
function kh(e, t) {
  return new e({
    type: "bigint",
    check: "bigint_format",
    abort: !1,
    format: "int64",
    ...A(t),
  });
}
function Ah(e, t) {
  return new e({
    type: "bigint",
    check: "bigint_format",
    abort: !1,
    format: "uint64",
    ...A(t),
  });
}
function Ih(e, t) {
  return new e({type: "symbol", ...A(t)});
}
function Oh(e, t) {
  return new e({type: "undefined", ...A(t)});
}
function Th(e, t) {
  return new e({type: "null", ...A(t)});
}
function jh(e) {
  return new e({type: "any"});
}
function Ph(e) {
  return new e({type: "unknown"});
}
function Nh(e, t) {
  return new e({type: "never", ...A(t)});
}
function Rh(e, t) {
  return new e({type: "void", ...A(t)});
}
function Ch(e, t) {
  return new e({type: "date", ...A(t)});
}
function zh(e, t) {
  return new e({type: "date", coerce: !0, ...A(t)});
}
function Uh(e, t) {
  return new e({type: "nan", ...A(t)});
}
function Et(e, t) {
  return new Xo({check: "less_than", ...A(t), value: e, inclusive: !1});
}
function He(e, t) {
  return new Xo({check: "less_than", ...A(t), value: e, inclusive: !0});
}
function kt(e, t) {
  return new Qo({check: "greater_than", ...A(t), value: e, inclusive: !1});
}
function ze(e, t) {
  return new Qo({check: "greater_than", ...A(t), value: e, inclusive: !0});
}
function Ns(e) {
  return kt(0, e);
}
function Rs(e) {
  return Et(0, e);
}
function Cs(e) {
  return He(0, e);
}
function zs(e) {
  return ze(0, e);
}
function tr(e, t) {
  return new Tu({check: "multiple_of", ...A(t), value: e});
}
function wr(e, t) {
  return new Nu({check: "max_size", ...A(t), maximum: e});
}
function rr(e, t) {
  return new Ru({check: "min_size", ...A(t), minimum: e});
}
function sn(e, t) {
  return new Cu({check: "size_equals", ...A(t), size: e});
}
function xr(e, t) {
  return new zu({check: "max_length", ...A(t), maximum: e});
}
function zt(e, t) {
  return new Uu({check: "min_length", ...A(t), minimum: e});
}
function Sr(e, t) {
  return new Du({check: "length_equals", ...A(t), length: e});
}
function an(e, t) {
  return new Lu({check: "string_format", format: "regex", ...A(t), pattern: e});
}
function cn(e) {
  return new Fu({check: "string_format", format: "lowercase", ...A(e)});
}
function un(e) {
  return new Mu({check: "string_format", format: "uppercase", ...A(e)});
}
function ln(e, t) {
  return new Bu({check: "string_format", format: "includes", ...A(t), includes: e});
}
function hn(e, t) {
  return new Zu({check: "string_format", format: "starts_with", ...A(t), prefix: e});
}
function dn(e, t) {
  return new qu({check: "string_format", format: "ends_with", ...A(t), suffix: e});
}
function Us(e, t, r) {
  return new Vu({check: "property", property: e, schema: t, ...A(r)});
}
function fn(e, t) {
  return new Wu({check: "mime_type", mime: e, ...A(t)});
}
function vt(e) {
  return new Ju({check: "overwrite", tx: e});
}
function pn(e) {
  return vt((t) => t.normalize(e));
}
function mn() {
  return vt((e) => e.trim());
}
function gn() {
  return vt((e) => e.toLowerCase());
}
function vn() {
  return vt((e) => e.toUpperCase());
}
function _n() {
  return vt((e) => qc(e));
}
function Dh(e, t, r) {
  return new e({type: "array", element: t, ...A(r)});
}
function hO(e, t, r) {
  return new e({type: "union", options: t, ...A(r)});
}
function dO(e, t, r) {
  return new e({type: "union", options: t, inclusive: !1, ...A(r)});
}
function fO(e, t, r, i) {
  return new e({type: "union", options: r, discriminator: t, ...A(i)});
}
function pO(e, t, r) {
  return new e({type: "intersection", left: t, right: r});
}
function mO(e, t, r, i) {
  let n = r instanceof Z,
    o = n ? i : r,
    s = n ? r : null;
  return new e({type: "tuple", items: t, rest: s, ...A(o)});
}
function gO(e, t, r, i) {
  return new e({type: "record", keyType: t, valueType: r, ...A(i)});
}
function vO(e, t, r, i) {
  return new e({type: "map", keyType: t, valueType: r, ...A(i)});
}
function _O(e, t, r) {
  return new e({type: "set", valueType: t, ...A(r)});
}
function yO(e, t, r) {
  let i = Array.isArray(t) ? Object.fromEntries(t.map((n) => [n, n])) : t;
  return new e({type: "enum", entries: i, ...A(r)});
}
function bO(e, t, r) {
  return new e({type: "enum", entries: t, ...A(r)});
}
function wO(e, t, r) {
  return new e({type: "literal", values: Array.isArray(t) ? t : [t], ...A(r)});
}
function Lh(e, t) {
  return new e({type: "file", ...A(t)});
}
function xO(e, t) {
  return new e({type: "transform", transform: t});
}
function SO(e, t) {
  return new e({type: "optional", innerType: t});
}
function $O(e, t) {
  return new e({type: "nullable", innerType: t});
}
function EO(e, t, r) {
  return new e({
    type: "default",
    innerType: t,
    get defaultValue() {
      return typeof r == "function" ? r() : Wc(r);
    },
  });
}
function kO(e, t, r) {
  return new e({type: "nonoptional", innerType: t, ...A(r)});
}
function AO(e, t) {
  return new e({type: "success", innerType: t});
}
function IO(e, t, r) {
  return new e({
    type: "catch",
    innerType: t,
    catchValue: typeof r == "function" ? r : () => r,
  });
}
function OO(e, t, r) {
  return new e({type: "pipe", in: t, out: r});
}
function TO(e, t) {
  return new e({type: "readonly", innerType: t});
}
function jO(e, t, r) {
  return new e({type: "template_literal", parts: t, ...A(r)});
}
function PO(e, t) {
  return new e({type: "lazy", getter: t});
}
function NO(e, t) {
  return new e({type: "promise", innerType: t});
}
function Fh(e, t, r) {
  let i = A(r);
  return (
    i.abort ?? (i.abort = !0), new e({type: "custom", check: "custom", fn: t, ...i})
  );
}
function Mh(e, t, r) {
  return new e({type: "custom", check: "custom", fn: t, ...A(r)});
}
function Bh(e) {
  let t = Fy(
    (r) => (
      (r.addIssue = (i) => {
        if (typeof i == "string") r.issues.push(Qr(i, r.value, t._zod.def));
        else {
          let n = i;
          n.fatal && (n.continue = !1),
            n.code ?? (n.code = "custom"),
            n.input ?? (n.input = r.value),
            n.inst ?? (n.inst = t),
            n.continue ?? (n.continue = !t._zod.def.abort),
            r.issues.push(Qr(n));
        }
      }),
      e(r.value, r)
    ),
  );
  return t;
}
function Fy(e, t) {
  let r = new ie({check: "custom", ...A(t)});
  return (r._zod.check = e), r;
}
function Zh(e) {
  let t = new ie({check: "describe"});
  return (
    (t._zod.onattach = [
      (r) => {
        let i = Ce.get(r) ?? {};
        Ce.add(r, {...i, description: e});
      },
    ]),
    (t._zod.check = () => {}),
    t
  );
}
function qh(e) {
  let t = new ie({check: "meta"});
  return (
    (t._zod.onattach = [
      (r) => {
        let i = Ce.get(r) ?? {};
        Ce.add(r, {...i, ...e});
      },
    ]),
    (t._zod.check = () => {}),
    t
  );
}
function Vh(e, t) {
  let r = A(t),
    i = r.truthy ?? ["true", "1", "yes", "on", "y", "enabled"],
    n = r.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  r.case !== "sensitive" &&
    ((i = i.map((d) => (typeof d == "string" ? d.toLowerCase() : d))),
    (n = n.map((d) => (typeof d == "string" ? d.toLowerCase() : d))));
  let o = new Set(i),
    s = new Set(n),
    a = e.Codec ?? $i,
    c = e.Boolean ?? xi,
    u = e.String ?? br,
    l = new u({type: "string", error: r.error}),
    h = new c({type: "boolean", error: r.error}),
    f = new a({
      type: "pipe",
      in: l,
      out: h,
      transform: (d, p) => {
        let m = d;
        return (
          r.case !== "sensitive" && (m = m.toLowerCase()),
          o.has(m)
            ? !0
            : s.has(m)
              ? !1
              : (p.issues.push({
                  code: "invalid_value",
                  expected: "stringbool",
                  values: [...o, ...s],
                  input: p.value,
                  inst: f,
                  continue: !1,
                }),
                {})
        );
      },
      reverseTransform: (d, p) => (d === !0 ? i[0] || "true" : n[0] || "false"),
      error: r.error,
    });
  return f;
}
function yn(e, t, r, i = {}) {
  let n = A(i),
    o = {
      ...A(i),
      check: "string_format",
      type: "string",
      format: t,
      fn: typeof r == "function" ? r : (a) => r.test(a),
      ...n,
    };
  return r instanceof RegExp && (o.pattern = r), new e(o);
}
function nr(e) {
  let t = e?.target ?? "draft-2020-12";
  return (
    t === "draft-4" && (t = "draft-04"),
    t === "draft-7" && (t = "draft-07"),
    {
      processors: e.processors ?? {},
      metadataRegistry: e?.metadata ?? Ce,
      target: t,
      unrepresentable: e?.unrepresentable ?? "throw",
      override: e?.override ?? (() => {}),
      io: e?.io ?? "output",
      counter: 0,
      seen: new Map(),
      cycles: e?.cycles ?? "ref",
      reused: e?.reused ?? "inline",
      external: e?.external ?? void 0,
    }
  );
}
function Q(e, t, r = {path: [], schemaPath: []}) {
  var i;
  let n = e._zod.def,
    o = t.seen.get(e);
  if (o) return o.count++, r.schemaPath.includes(e) && (o.cycle = r.path), o.schema;
  let s = {schema: {}, count: 1, cycle: void 0, path: r.path};
  t.seen.set(e, s);
  let a = e._zod.toJSONSchema?.();
  if (a) s.schema = a;
  else {
    let l = {...r, schemaPath: [...r.schemaPath, e], path: r.path},
      h = e._zod.parent;
    if (h) (s.ref = h), Q(h, t, l), (t.seen.get(h).isParent = !0);
    else if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, s.schema, l);
    else {
      let f = s.schema,
        d = t.processors[n.type];
      if (!d)
        throw new Error(
          `[toJSONSchema]: Non-representable type encountered: ${n.type}`,
        );
      d(e, t, f, l);
    }
  }
  let c = t.metadataRegistry.get(e);
  return (
    c && Object.assign(s.schema, c),
    t.io === "input" && Ue(e) && (delete s.schema.examples, delete s.schema.default),
    t.io === "input" &&
      s.schema._prefault &&
      ((i = s.schema).default ?? (i.default = s.schema._prefault)),
    delete s.schema._prefault,
    t.seen.get(e).schema
  );
}
function ir(e, t) {
  let r = e.seen.get(t);
  if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
  let i = (o) => {
      let s = e.target === "draft-2020-12" ? "$defs" : "definitions";
      if (e.external) {
        let l = e.external.registry.get(o[0])?.id,
          h = e.external.uri ?? ((d) => d);
        if (l) return {ref: h(l)};
        let f = o[1].defId ?? o[1].schema.id ?? `schema${e.counter++}`;
        return (o[1].defId = f), {defId: f, ref: `${h("__shared")}#/${s}/${f}`};
      }
      if (o[1] === r) return {ref: "#"};
      let c = `#/${s}/`,
        u = o[1].schema.id ?? `__schema${e.counter++}`;
      return {defId: u, ref: c + u};
    },
    n = (o) => {
      if (o[1].schema.$ref) return;
      let s = o[1],
        {ref: a, defId: c} = i(o);
      (s.def = {...s.schema}), c && (s.defId = c);
      let u = s.schema;
      for (let l in u) delete u[l];
      u.$ref = a;
    };
  if (e.cycles === "throw")
    for (let o of e.seen.entries()) {
      let s = o[1];
      if (s.cycle)
        throw new Error(`Cycle detected: #/${s.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (let o of e.seen.entries()) {
    let s = o[1];
    if (t === o[0]) {
      n(o);
      continue;
    }
    if (e.external) {
      let c = e.external.registry.get(o[0])?.id;
      if (t !== o[0] && c) {
        n(o);
        continue;
      }
    }
    if (e.metadataRegistry.get(o[0])?.id) {
      n(o);
      continue;
    }
    if (s.cycle) {
      n(o);
      continue;
    }
    if (s.count > 1 && e.reused === "ref") {
      n(o);
      continue;
    }
  }
}
function or(e, t) {
  let r = e.seen.get(t);
  if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
  let i = (s) => {
    let a = e.seen.get(s),
      c = a.def ?? a.schema,
      u = {...c};
    if (a.ref === null) return;
    let l = a.ref;
    if (((a.ref = null), l)) {
      i(l);
      let h = e.seen.get(l).schema;
      h.$ref &&
      (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
        ? ((c.allOf = c.allOf ?? []), c.allOf.push(h))
        : (Object.assign(c, h), Object.assign(c, u));
    }
    a.isParent || e.override({zodSchema: s, jsonSchema: c, path: a.path ?? []});
  };
  for (let s of [...e.seen.entries()].reverse()) i(s[0]);
  let n = {};
  if (
    (e.target === "draft-2020-12"
      ? (n.$schema = "https://json-schema.org/draft/2020-12/schema")
      : e.target === "draft-07"
        ? (n.$schema = "http://json-schema.org/draft-07/schema#")
        : e.target === "draft-04"
          ? (n.$schema = "http://json-schema.org/draft-04/schema#")
          : e.target,
    e.external?.uri)
  ) {
    let s = e.external.registry.get(t)?.id;
    if (!s) throw new Error("Schema is missing an `id` property");
    n.$id = e.external.uri(s);
  }
  Object.assign(n, r.def ?? r.schema);
  let o = e.external?.defs ?? {};
  for (let s of e.seen.entries()) {
    let a = s[1];
    a.def && a.defId && (o[a.defId] = a.def);
  }
  e.external ||
    (Object.keys(o).length > 0 &&
      (e.target === "draft-2020-12" ? (n.$defs = o) : (n.definitions = o)));
  try {
    let s = JSON.parse(JSON.stringify(n));
    return (
      Object.defineProperty(s, "~standard", {
        value: {
          ...t["~standard"],
          jsonSchema: {input: bn(t, "input"), output: bn(t, "output")},
        },
        enumerable: !1,
        writable: !1,
      }),
      s
    );
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Ue(e, t) {
  let r = t ?? {seen: new Set()};
  if (r.seen.has(e)) return !1;
  r.seen.add(e);
  let i = e._zod.def;
  if (i.type === "transform") return !0;
  if (i.type === "array") return Ue(i.element, r);
  if (i.type === "set") return Ue(i.valueType, r);
  if (i.type === "lazy") return Ue(i.getter(), r);
  if (
    i.type === "promise" ||
    i.type === "optional" ||
    i.type === "nonoptional" ||
    i.type === "nullable" ||
    i.type === "readonly" ||
    i.type === "default" ||
    i.type === "prefault"
  )
    return Ue(i.innerType, r);
  if (i.type === "intersection") return Ue(i.left, r) || Ue(i.right, r);
  if (i.type === "record" || i.type === "map")
    return Ue(i.keyType, r) || Ue(i.valueType, r);
  if (i.type === "pipe") return Ue(i.in, r) || Ue(i.out, r);
  if (i.type === "object") {
    for (let n in i.shape) if (Ue(i.shape[n], r)) return !0;
    return !1;
  }
  if (i.type === "union") {
    for (let n of i.options) if (Ue(n, r)) return !0;
    return !1;
  }
  if (i.type === "tuple") {
    for (let n of i.items) if (Ue(n, r)) return !0;
    return !!(i.rest && Ue(i.rest, r));
  }
  return !1;
}
var Wh =
    (e, t = {}) =>
    (r) => {
      let i = nr({...r, processors: t});
      return Q(e, i), ir(i, e), or(i, e);
    },
  bn = (e, t) => (r) => {
    let {libraryOptions: i, target: n} = r ?? {},
      o = nr({...(i ?? {}), target: n, io: t, processors: {}});
    return Q(e, o), ir(o, e), or(o, e);
  };
var RO = {
    guid: "uuid",
    url: "uri",
    datetime: "date-time",
    json_string: "json-string",
    regex: "",
  },
  Jh = (e, t, r, i) => {
    let n = r;
    n.type = "string";
    let {
      minimum: o,
      maximum: s,
      format: a,
      patterns: c,
      contentEncoding: u,
    } = e._zod.bag;
    if (
      (typeof o == "number" && (n.minLength = o),
      typeof s == "number" && (n.maxLength = s),
      a && ((n.format = RO[a] ?? a), n.format === "" && delete n.format),
      u && (n.contentEncoding = u),
      c && c.size > 0)
    ) {
      let l = [...c];
      l.length === 1
        ? (n.pattern = l[0].source)
        : l.length > 1 &&
          (n.allOf = [
            ...l.map((h) => ({
              ...(t.target === "draft-07" ||
              t.target === "draft-04" ||
              t.target === "openapi-3.0"
                ? {type: "string"}
                : {}),
              pattern: h.source,
            })),
          ]);
    }
  },
  Kh = (e, t, r, i) => {
    let n = r,
      {
        minimum: o,
        maximum: s,
        format: a,
        multipleOf: c,
        exclusiveMaximum: u,
        exclusiveMinimum: l,
      } = e._zod.bag;
    typeof a == "string" && a.includes("int")
      ? (n.type = "integer")
      : (n.type = "number"),
      typeof l == "number" &&
        (t.target === "draft-04" || t.target === "openapi-3.0"
          ? ((n.minimum = l), (n.exclusiveMinimum = !0))
          : (n.exclusiveMinimum = l)),
      typeof o == "number" &&
        ((n.minimum = o),
        typeof l == "number" &&
          t.target !== "draft-04" &&
          (l >= o ? delete n.minimum : delete n.exclusiveMinimum)),
      typeof u == "number" &&
        (t.target === "draft-04" || t.target === "openapi-3.0"
          ? ((n.maximum = u), (n.exclusiveMaximum = !0))
          : (n.exclusiveMaximum = u)),
      typeof s == "number" &&
        ((n.maximum = s),
        typeof u == "number" &&
          t.target !== "draft-04" &&
          (u <= s ? delete n.maximum : delete n.exclusiveMaximum)),
      typeof c == "number" && (n.multipleOf = c);
  },
  Gh = (e, t, r, i) => {
    r.type = "boolean";
  },
  Hh = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("BigInt cannot be represented in JSON Schema");
  },
  Yh = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Symbols cannot be represented in JSON Schema");
  },
  Xh = (e, t, r, i) => {
    t.target === "openapi-3.0"
      ? ((r.type = "string"), (r.nullable = !0), (r.enum = [null]))
      : (r.type = "null");
  },
  Qh = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Undefined cannot be represented in JSON Schema");
  },
  ed = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Void cannot be represented in JSON Schema");
  },
  td = (e, t, r, i) => {
    r.not = {};
  },
  rd = (e, t, r, i) => {},
  nd = (e, t, r, i) => {},
  id = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Date cannot be represented in JSON Schema");
  },
  od = (e, t, r, i) => {
    let n = e._zod.def,
      o = hi(n.entries);
    o.every((s) => typeof s == "number") && (r.type = "number"),
      o.every((s) => typeof s == "string") && (r.type = "string"),
      (r.enum = o);
  },
  sd = (e, t, r, i) => {
    let n = e._zod.def,
      o = [];
    for (let s of n.values)
      if (s === void 0) {
        if (t.unrepresentable === "throw")
          throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else if (typeof s == "bigint") {
        if (t.unrepresentable === "throw")
          throw new Error("BigInt literals cannot be represented in JSON Schema");
        o.push(Number(s));
      } else o.push(s);
    if (o.length !== 0)
      if (o.length === 1) {
        let s = o[0];
        (r.type = s === null ? "null" : typeof s),
          t.target === "draft-04" || t.target === "openapi-3.0"
            ? (r.enum = [s])
            : (r.const = s);
      } else
        o.every((s) => typeof s == "number") && (r.type = "number"),
          o.every((s) => typeof s == "string") && (r.type = "string"),
          o.every((s) => typeof s == "boolean") && (r.type = "boolean"),
          o.every((s) => s === null) && (r.type = "null"),
          (r.enum = o);
  },
  ad = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("NaN cannot be represented in JSON Schema");
  },
  cd = (e, t, r, i) => {
    let n = r,
      o = e._zod.pattern;
    if (!o) throw new Error("Pattern not found in template literal");
    (n.type = "string"), (n.pattern = o.source);
  },
  ud = (e, t, r, i) => {
    let n = r,
      o = {type: "string", format: "binary", contentEncoding: "binary"},
      {minimum: s, maximum: a, mime: c} = e._zod.bag;
    s !== void 0 && (o.minLength = s),
      a !== void 0 && (o.maxLength = a),
      c
        ? c.length === 1
          ? ((o.contentMediaType = c[0]), Object.assign(n, o))
          : (n.anyOf = c.map((u) => ({...o, contentMediaType: u})))
        : Object.assign(n, o);
  },
  ld = (e, t, r, i) => {
    r.type = "boolean";
  },
  hd = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Custom types cannot be represented in JSON Schema");
  },
  dd = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Function types cannot be represented in JSON Schema");
  },
  fd = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Transforms cannot be represented in JSON Schema");
  },
  pd = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Map cannot be represented in JSON Schema");
  },
  md = (e, t, r, i) => {
    if (t.unrepresentable === "throw")
      throw new Error("Set cannot be represented in JSON Schema");
  },
  gd = (e, t, r, i) => {
    let n = r,
      o = e._zod.def,
      {minimum: s, maximum: a} = e._zod.bag;
    typeof s == "number" && (n.minItems = s),
      typeof a == "number" && (n.maxItems = a),
      (n.type = "array"),
      (n.items = Q(o.element, t, {...i, path: [...i.path, "items"]}));
  },
  vd = (e, t, r, i) => {
    let n = r,
      o = e._zod.def;
    (n.type = "object"), (n.properties = {});
    let s = o.shape;
    for (let u in s)
      n.properties[u] = Q(s[u], t, {...i, path: [...i.path, "properties", u]});
    let a = new Set(Object.keys(s)),
      c = new Set(
        [...a].filter((u) => {
          let l = o.shape[u]._zod;
          return t.io === "input" ? l.optin === void 0 : l.optout === void 0;
        }),
      );
    c.size > 0 && (n.required = Array.from(c)),
      o.catchall?._zod.def.type === "never"
        ? (n.additionalProperties = !1)
        : o.catchall
          ? o.catchall &&
            (n.additionalProperties = Q(o.catchall, t, {
              ...i,
              path: [...i.path, "additionalProperties"],
            }))
          : t.io === "output" && (n.additionalProperties = !1);
  },
  Ls = (e, t, r, i) => {
    let n = e._zod.def,
      o = n.inclusive === !1,
      s = n.options.map((a, c) =>
        Q(a, t, {...i, path: [...i.path, o ? "oneOf" : "anyOf", c]}),
      );
    o ? (r.oneOf = s) : (r.anyOf = s);
  },
  _d = (e, t, r, i) => {
    let n = e._zod.def,
      o = Q(n.left, t, {...i, path: [...i.path, "allOf", 0]}),
      s = Q(n.right, t, {...i, path: [...i.path, "allOf", 1]}),
      a = (u) => "allOf" in u && Object.keys(u).length === 1,
      c = [...(a(o) ? o.allOf : [o]), ...(a(s) ? s.allOf : [s])];
    r.allOf = c;
  },
  yd = (e, t, r, i) => {
    let n = r,
      o = e._zod.def;
    n.type = "array";
    let s = t.target === "draft-2020-12" ? "prefixItems" : "items",
      a =
        t.target === "draft-2020-12" || t.target === "openapi-3.0"
          ? "items"
          : "additionalItems",
      c = o.items.map((f, d) => Q(f, t, {...i, path: [...i.path, s, d]})),
      u = o.rest
        ? Q(o.rest, t, {
            ...i,
            path: [
              ...i.path,
              a,
              ...(t.target === "openapi-3.0" ? [o.items.length] : []),
            ],
          })
        : null;
    t.target === "draft-2020-12"
      ? ((n.prefixItems = c), u && (n.items = u))
      : t.target === "openapi-3.0"
        ? ((n.items = {anyOf: c}),
          u && n.items.anyOf.push(u),
          (n.minItems = c.length),
          u || (n.maxItems = c.length))
        : ((n.items = c), u && (n.additionalItems = u));
    let {minimum: l, maximum: h} = e._zod.bag;
    typeof l == "number" && (n.minItems = l), typeof h == "number" && (n.maxItems = h);
  },
  bd = (e, t, r, i) => {
    let n = r,
      o = e._zod.def;
    (n.type = "object"),
      (t.target === "draft-07" || t.target === "draft-2020-12") &&
        (n.propertyNames = Q(o.keyType, t, {...i, path: [...i.path, "propertyNames"]})),
      (n.additionalProperties = Q(o.valueType, t, {
        ...i,
        path: [...i.path, "additionalProperties"],
      }));
  },
  wd = (e, t, r, i) => {
    let n = e._zod.def,
      o = Q(n.innerType, t, i),
      s = t.seen.get(e);
    t.target === "openapi-3.0"
      ? ((s.ref = n.innerType), (r.nullable = !0))
      : (r.anyOf = [o, {type: "null"}]);
  },
  xd = (e, t, r, i) => {
    let n = e._zod.def;
    Q(n.innerType, t, i);
    let o = t.seen.get(e);
    o.ref = n.innerType;
  },
  Sd = (e, t, r, i) => {
    let n = e._zod.def;
    Q(n.innerType, t, i);
    let o = t.seen.get(e);
    (o.ref = n.innerType), (r.default = JSON.parse(JSON.stringify(n.defaultValue)));
  },
  $d = (e, t, r, i) => {
    let n = e._zod.def;
    Q(n.innerType, t, i);
    let o = t.seen.get(e);
    (o.ref = n.innerType),
      t.io === "input" && (r._prefault = JSON.parse(JSON.stringify(n.defaultValue)));
  },
  Ed = (e, t, r, i) => {
    let n = e._zod.def;
    Q(n.innerType, t, i);
    let o = t.seen.get(e);
    o.ref = n.innerType;
    let s;
    try {
      s = n.catchValue(void 0);
    } catch {
      throw new Error("Dynamic catch values are not supported in JSON Schema");
    }
    r.default = s;
  },
  kd = (e, t, r, i) => {
    let n = e._zod.def,
      o =
        t.io === "input" ? (n.in._zod.def.type === "transform" ? n.out : n.in) : n.out;
    Q(o, t, i);
    let s = t.seen.get(e);
    s.ref = o;
  },
  Ad = (e, t, r, i) => {
    let n = e._zod.def;
    Q(n.innerType, t, i);
    let o = t.seen.get(e);
    (o.ref = n.innerType), (r.readOnly = !0);
  },
  Id = (e, t, r, i) => {
    let n = e._zod.def;
    Q(n.innerType, t, i);
    let o = t.seen.get(e);
    o.ref = n.innerType;
  },
  Od = (e, t, r, i) => {
    let n = e._zod.def;
    Q(n.innerType, t, i);
    let o = t.seen.get(e);
    o.ref = n.innerType;
  },
  Td = (e, t, r, i) => {
    let n = e._zod.innerType;
    Q(n, t, i);
    let o = t.seen.get(e);
    o.ref = n;
  },
  Ds = {
    string: Jh,
    number: Kh,
    boolean: Gh,
    bigint: Hh,
    symbol: Yh,
    null: Xh,
    undefined: Qh,
    void: ed,
    never: td,
    any: rd,
    unknown: nd,
    date: id,
    enum: od,
    literal: sd,
    nan: ad,
    template_literal: cd,
    file: ud,
    success: ld,
    custom: hd,
    function: dd,
    transform: fd,
    map: pd,
    set: md,
    array: gd,
    object: vd,
    union: Ls,
    intersection: _d,
    tuple: yd,
    record: bd,
    nullable: wd,
    nonoptional: xd,
    default: Sd,
    prefault: $d,
    catch: Ed,
    pipe: kd,
    readonly: Ad,
    promise: Id,
    optional: Od,
    lazy: Td,
  };
function Fs(e, t) {
  if ("_idmap" in e) {
    let i = e,
      n = nr({...t, processors: Ds}),
      o = {};
    for (let c of i._idmap.entries()) {
      let [u, l] = c;
      Q(l, n);
    }
    let s = {},
      a = {registry: i, uri: t?.uri, defs: o};
    n.external = a;
    for (let c of i._idmap.entries()) {
      let [u, l] = c;
      ir(n, l), (s[u] = or(n, l));
    }
    if (Object.keys(o).length > 0) {
      let c = n.target === "draft-2020-12" ? "$defs" : "definitions";
      s.__shared = {[c]: o};
    }
    return {schemas: s};
  }
  let r = nr({...t, processors: Ds});
  return Q(e, r), ir(r, e), or(r, e);
}
var Ms = class {
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  get target() {
    return this.ctx.target;
  }
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  get override() {
    return this.ctx.override;
  }
  get io() {
    return this.ctx.io;
  }
  get counter() {
    return this.ctx.counter;
  }
  set counter(t) {
    this.ctx.counter = t;
  }
  get seen() {
    return this.ctx.seen;
  }
  constructor(t) {
    let r = t?.target ?? "draft-2020-12";
    r === "draft-4" && (r = "draft-04"),
      r === "draft-7" && (r = "draft-07"),
      (this.ctx = nr({
        processors: Ds,
        target: r,
        ...(t?.metadata && {metadata: t.metadata}),
        ...(t?.unrepresentable && {unrepresentable: t.unrepresentable}),
        ...(t?.override && {override: t.override}),
        ...(t?.io && {io: t.io}),
      }));
  }
  process(t, r = {path: [], schemaPath: []}) {
    return Q(t, this.ctx, r);
  }
  emit(t, r) {
    r &&
      (r.cycles && (this.ctx.cycles = r.cycles),
      r.reused && (this.ctx.reused = r.reused),
      r.external && (this.ctx.external = r.external)),
      ir(this.ctx, t);
    let i = or(this.ctx, t),
      {"~standard": n, ...o} = i;
    return o;
  }
};
var My = {};
var Ti = {};
lt(Ti, {
  ZodAny: () => ef,
  ZodArray: () => of,
  ZodBase64: () => ca,
  ZodBase64URL: () => ua,
  ZodBigInt: () => An,
  ZodBigIntFormat: () => da,
  ZodBoolean: () => kn,
  ZodCIDRv4: () => sa,
  ZodCIDRv6: () => aa,
  ZodCUID: () => Qs,
  ZodCUID2: () => ea,
  ZodCatch: () => Ef,
  ZodCodec: () => ba,
  ZodCustom: () => Mi,
  ZodCustomStringFormat: () => $n,
  ZodDate: () => zi,
  ZodDefault: () => yf,
  ZodDiscriminatedUnion: () => af,
  ZodE164: () => la,
  ZodEmail: () => Hs,
  ZodEmoji: () => Ys,
  ZodEnum: () => xn,
  ZodFile: () => gf,
  ZodFunction: () => Rf,
  ZodGUID: () => ji,
  ZodIPv4: () => ia,
  ZodIPv6: () => oa,
  ZodIntersection: () => cf,
  ZodJWT: () => ha,
  ZodKSUID: () => na,
  ZodLazy: () => jf,
  ZodLiteral: () => mf,
  ZodMAC: () => Jd,
  ZodMap: () => ff,
  ZodNaN: () => Af,
  ZodNanoID: () => Xs,
  ZodNever: () => rf,
  ZodNonOptional: () => _a,
  ZodNull: () => Xd,
  ZodNullable: () => _f,
  ZodNumber: () => En,
  ZodNumberFormat: () => Er,
  ZodObject: () => Di,
  ZodOptional: () => va,
  ZodPipe: () => ya,
  ZodPrefault: () => wf,
  ZodPromise: () => Nf,
  ZodReadonly: () => If,
  ZodRecord: () => Fi,
  ZodSet: () => pf,
  ZodString: () => Sn,
  ZodStringFormat: () => re,
  ZodSuccess: () => $f,
  ZodSymbol: () => Hd,
  ZodTemplateLiteral: () => Tf,
  ZodTransform: () => vf,
  ZodTuple: () => lf,
  ZodType: () => q,
  ZodULID: () => ta,
  ZodURL: () => Ci,
  ZodUUID: () => At,
  ZodUndefined: () => Yd,
  ZodUnion: () => Li,
  ZodUnknown: () => tf,
  ZodVoid: () => nf,
  ZodXID: () => ra,
  ZodXor: () => sf,
  _ZodString: () => Gs,
  _default: () => bf,
  _function: () => Kb,
  any: () => kb,
  array: () => Ui,
  base64: () => ub,
  base64url: () => lb,
  bigint: () => wb,
  boolean: () => Gd,
  catch: () => kf,
  check: () => Gb,
  cidrv4: () => ab,
  cidrv6: () => cb,
  codec: () => Vb,
  cuid: () => Qy,
  cuid2: () => eb,
  custom: () => Hb,
  date: () => Ib,
  describe: () => Yb,
  discriminatedUnion: () => Rb,
  e164: () => hb,
  email: () => Zy,
  emoji: () => Yy,
  enum: () => ma,
  file: () => Mb,
  float32: () => vb,
  float64: () => _b,
  function: () => Kb,
  guid: () => qy,
  hash: () => gb,
  hex: () => mb,
  hostname: () => pb,
  httpUrl: () => Hy,
  instanceof: () => Qb,
  int: () => Ks,
  int32: () => yb,
  int64: () => xb,
  intersection: () => uf,
  ipv4: () => ib,
  ipv6: () => sb,
  json: () => tw,
  jwt: () => db,
  keyof: () => Ob,
  ksuid: () => nb,
  lazy: () => Pf,
  literal: () => Fb,
  looseObject: () => Pb,
  looseRecord: () => zb,
  mac: () => ob,
  map: () => Ub,
  meta: () => Xb,
  nan: () => qb,
  nanoid: () => Xy,
  nativeEnum: () => Lb,
  never: () => fa,
  nonoptional: () => Sf,
  null: () => Qd,
  nullable: () => Ni,
  nullish: () => Bb,
  number: () => Kd,
  object: () => Tb,
  optional: () => Pi,
  partialRecord: () => Cb,
  pipe: () => Ri,
  prefault: () => xf,
  preprocess: () => rw,
  promise: () => Jb,
  readonly: () => Of,
  record: () => df,
  refine: () => Cf,
  set: () => Db,
  strictObject: () => jb,
  string: () => Js,
  stringFormat: () => fb,
  stringbool: () => ew,
  success: () => Zb,
  superRefine: () => zf,
  symbol: () => $b,
  templateLiteral: () => Wb,
  transform: () => ga,
  tuple: () => hf,
  uint32: () => bb,
  uint64: () => Sb,
  ulid: () => tb,
  undefined: () => Eb,
  union: () => pa,
  unknown: () => $r,
  url: () => Gy,
  uuid: () => Vy,
  uuidv4: () => Wy,
  uuidv6: () => Jy,
  uuidv7: () => Ky,
  void: () => Ab,
  xid: () => rb,
  xor: () => Nb,
});
var Bs = {};
lt(Bs, {
  endsWith: () => dn,
  gt: () => kt,
  gte: () => ze,
  includes: () => ln,
  length: () => Sr,
  lowercase: () => cn,
  lt: () => Et,
  lte: () => He,
  maxLength: () => xr,
  maxSize: () => wr,
  mime: () => fn,
  minLength: () => zt,
  minSize: () => rr,
  multipleOf: () => tr,
  negative: () => Rs,
  nonnegative: () => zs,
  nonpositive: () => Cs,
  normalize: () => pn,
  overwrite: () => vt,
  positive: () => Ns,
  property: () => Us,
  regex: () => an,
  size: () => sn,
  slugify: () => _n,
  startsWith: () => hn,
  toLowerCase: () => gn,
  toUpperCase: () => vn,
  trim: () => mn,
  uppercase: () => un,
});
var wn = {};
lt(wn, {
  ZodISODate: () => qs,
  ZodISODateTime: () => Zs,
  ZodISODuration: () => Ws,
  ZodISOTime: () => Vs,
  date: () => Pd,
  datetime: () => jd,
  duration: () => Rd,
  time: () => Nd,
});
var Zs = g("ZodISODateTime", (e, t) => {
  al.init(e, t), re.init(e, t);
});
function jd(e) {
  return hh(Zs, e);
}
var qs = g("ZodISODate", (e, t) => {
  cl.init(e, t), re.init(e, t);
});
function Pd(e) {
  return dh(qs, e);
}
var Vs = g("ZodISOTime", (e, t) => {
  ul.init(e, t), re.init(e, t);
});
function Nd(e) {
  return fh(Vs, e);
}
var Ws = g("ZodISODuration", (e, t) => {
  ll.init(e, t), re.init(e, t);
});
function Rd(e) {
  return ph(Ws, e);
}
var By = (e, t) => {
    gi.init(e, t),
      (e.name = "ZodError"),
      Object.defineProperties(e, {
        format: {value: (r) => _i(e, r)},
        flatten: {value: (r) => vi(e, r)},
        addIssue: {
          value: (r) => {
            e.issues.push(r), (e.message = JSON.stringify(e.issues, Yr, 2));
          },
        },
        addIssues: {
          value: (r) => {
            e.issues.push(...r), (e.message = JSON.stringify(e.issues, Yr, 2));
          },
        },
        isEmpty: {
          get() {
            return e.issues.length === 0;
          },
        },
      });
  },
  zO = g("ZodError", By),
  Me = g("ZodError", By, {Parent: Error});
var Cd = en(Me),
  zd = tn(Me),
  Ud = rn(Me),
  Dd = nn(Me),
  Ld = Zo(Me),
  Fd = qo(Me),
  Md = Vo(Me),
  Bd = Wo(Me),
  Zd = Jo(Me),
  qd = Ko(Me),
  Vd = Go(Me),
  Wd = Ho(Me);
var q = g(
    "ZodType",
    (e, t) => (
      Z.init(e, t),
      Object.assign(e["~standard"], {
        jsonSchema: {input: bn(e, "input"), output: bn(e, "output")},
      }),
      (e.toJSONSchema = Wh(e, {})),
      (e.def = t),
      (e.type = t.type),
      Object.defineProperty(e, "_def", {value: t}),
      (e.check = (...r) =>
        e.clone(
          k.mergeDefs(t, {
            checks: [
              ...(t.checks ?? []),
              ...r.map((i) =>
                typeof i == "function"
                  ? {_zod: {check: i, def: {check: "custom"}, onattach: []}}
                  : i,
              ),
            ],
          }),
        )),
      (e.clone = (r, i) => Re(e, r, i)),
      (e.brand = () => e),
      (e.register = (r, i) => (r.add(e, i), e)),
      (e.parse = (r, i) => Cd(e, r, i, {callee: e.parse})),
      (e.safeParse = (r, i) => Ud(e, r, i)),
      (e.parseAsync = async (r, i) => zd(e, r, i, {callee: e.parseAsync})),
      (e.safeParseAsync = async (r, i) => Dd(e, r, i)),
      (e.spa = e.safeParseAsync),
      (e.encode = (r, i) => Ld(e, r, i)),
      (e.decode = (r, i) => Fd(e, r, i)),
      (e.encodeAsync = async (r, i) => Md(e, r, i)),
      (e.decodeAsync = async (r, i) => Bd(e, r, i)),
      (e.safeEncode = (r, i) => Zd(e, r, i)),
      (e.safeDecode = (r, i) => qd(e, r, i)),
      (e.safeEncodeAsync = async (r, i) => Vd(e, r, i)),
      (e.safeDecodeAsync = async (r, i) => Wd(e, r, i)),
      (e.refine = (r, i) => e.check(Cf(r, i))),
      (e.superRefine = (r) => e.check(zf(r))),
      (e.overwrite = (r) => e.check(vt(r))),
      (e.optional = () => Pi(e)),
      (e.nullable = () => Ni(e)),
      (e.nullish = () => Pi(Ni(e))),
      (e.nonoptional = (r) => Sf(e, r)),
      (e.array = () => Ui(e)),
      (e.or = (r) => pa([e, r])),
      (e.and = (r) => uf(e, r)),
      (e.transform = (r) => Ri(e, ga(r))),
      (e.default = (r) => bf(e, r)),
      (e.prefault = (r) => xf(e, r)),
      (e.catch = (r) => kf(e, r)),
      (e.pipe = (r) => Ri(e, r)),
      (e.readonly = () => Of(e)),
      (e.describe = (r) => {
        let i = e.clone();
        return Ce.add(i, {description: r}), i;
      }),
      Object.defineProperty(e, "description", {
        get() {
          return Ce.get(e)?.description;
        },
        configurable: !0,
      }),
      (e.meta = (...r) => {
        if (r.length === 0) return Ce.get(e);
        let i = e.clone();
        return Ce.add(i, r[0]), i;
      }),
      (e.isOptional = () => e.safeParse(void 0).success),
      (e.isNullable = () => e.safeParse(null).success),
      e
    ),
  ),
  Gs = g("_ZodString", (e, t) => {
    br.init(e, t),
      q.init(e, t),
      (e._zod.processJSONSchema = (i, n, o) => Jh(e, i, n, o));
    let r = e._zod.bag;
    (e.format = r.format ?? null),
      (e.minLength = r.minimum ?? null),
      (e.maxLength = r.maximum ?? null),
      (e.regex = (...i) => e.check(an(...i))),
      (e.includes = (...i) => e.check(ln(...i))),
      (e.startsWith = (...i) => e.check(hn(...i))),
      (e.endsWith = (...i) => e.check(dn(...i))),
      (e.min = (...i) => e.check(zt(...i))),
      (e.max = (...i) => e.check(xr(...i))),
      (e.length = (...i) => e.check(Sr(...i))),
      (e.nonempty = (...i) => e.check(zt(1, ...i))),
      (e.lowercase = (i) => e.check(cn(i))),
      (e.uppercase = (i) => e.check(un(i))),
      (e.trim = () => e.check(mn())),
      (e.normalize = (...i) => e.check(pn(...i))),
      (e.toLowerCase = () => e.check(gn())),
      (e.toUpperCase = () => e.check(vn())),
      (e.slugify = () => e.check(_n()));
  }),
  Sn = g("ZodString", (e, t) => {
    br.init(e, t),
      Gs.init(e, t),
      (e.email = (r) => e.check(fs(Hs, r))),
      (e.url = (r) => e.check(Oi(Ci, r))),
      (e.jwt = (r) => e.check(Ps(ha, r))),
      (e.emoji = (r) => e.check(_s(Ys, r))),
      (e.guid = (r) => e.check(Ii(ji, r))),
      (e.uuid = (r) => e.check(ps(At, r))),
      (e.uuidv4 = (r) => e.check(ms(At, r))),
      (e.uuidv6 = (r) => e.check(gs(At, r))),
      (e.uuidv7 = (r) => e.check(vs(At, r))),
      (e.nanoid = (r) => e.check(ys(Xs, r))),
      (e.guid = (r) => e.check(Ii(ji, r))),
      (e.cuid = (r) => e.check(bs(Qs, r))),
      (e.cuid2 = (r) => e.check(ws(ea, r))),
      (e.ulid = (r) => e.check(xs(ta, r))),
      (e.base64 = (r) => e.check(Os(ca, r))),
      (e.base64url = (r) => e.check(Ts(ua, r))),
      (e.xid = (r) => e.check(Ss(ra, r))),
      (e.ksuid = (r) => e.check($s(na, r))),
      (e.ipv4 = (r) => e.check(Es(ia, r))),
      (e.ipv6 = (r) => e.check(ks(oa, r))),
      (e.cidrv4 = (r) => e.check(As(sa, r))),
      (e.cidrv6 = (r) => e.check(Is(aa, r))),
      (e.e164 = (r) => e.check(js(la, r))),
      (e.datetime = (r) => e.check(jd(r))),
      (e.date = (r) => e.check(Pd(r))),
      (e.time = (r) => e.check(Nd(r))),
      (e.duration = (r) => e.check(Rd(r)));
  });
function Js(e) {
  return ah(Sn, e);
}
var re = g("ZodStringFormat", (e, t) => {
    te.init(e, t), Gs.init(e, t);
  }),
  Hs = g("ZodEmail", (e, t) => {
    Xu.init(e, t), re.init(e, t);
  });
function Zy(e) {
  return fs(Hs, e);
}
var ji = g("ZodGUID", (e, t) => {
  Hu.init(e, t), re.init(e, t);
});
function qy(e) {
  return Ii(ji, e);
}
var At = g("ZodUUID", (e, t) => {
  Yu.init(e, t), re.init(e, t);
});
function Vy(e) {
  return ps(At, e);
}
function Wy(e) {
  return ms(At, e);
}
function Jy(e) {
  return gs(At, e);
}
function Ky(e) {
  return vs(At, e);
}
var Ci = g("ZodURL", (e, t) => {
  Qu.init(e, t), re.init(e, t);
});
function Gy(e) {
  return Oi(Ci, e);
}
function Hy(e) {
  return Oi(Ci, {protocol: /^https?$/, hostname: nt.domain, ...k.normalizeParams(e)});
}
var Ys = g("ZodEmoji", (e, t) => {
  el.init(e, t), re.init(e, t);
});
function Yy(e) {
  return _s(Ys, e);
}
var Xs = g("ZodNanoID", (e, t) => {
  tl.init(e, t), re.init(e, t);
});
function Xy(e) {
  return ys(Xs, e);
}
var Qs = g("ZodCUID", (e, t) => {
  rl.init(e, t), re.init(e, t);
});
function Qy(e) {
  return bs(Qs, e);
}
var ea = g("ZodCUID2", (e, t) => {
  nl.init(e, t), re.init(e, t);
});
function eb(e) {
  return ws(ea, e);
}
var ta = g("ZodULID", (e, t) => {
  il.init(e, t), re.init(e, t);
});
function tb(e) {
  return xs(ta, e);
}
var ra = g("ZodXID", (e, t) => {
  ol.init(e, t), re.init(e, t);
});
function rb(e) {
  return Ss(ra, e);
}
var na = g("ZodKSUID", (e, t) => {
  sl.init(e, t), re.init(e, t);
});
function nb(e) {
  return $s(na, e);
}
var ia = g("ZodIPv4", (e, t) => {
  hl.init(e, t), re.init(e, t);
});
function ib(e) {
  return Es(ia, e);
}
var Jd = g("ZodMAC", (e, t) => {
  fl.init(e, t), re.init(e, t);
});
function ob(e) {
  return uh(Jd, e);
}
var oa = g("ZodIPv6", (e, t) => {
  dl.init(e, t), re.init(e, t);
});
function sb(e) {
  return ks(oa, e);
}
var sa = g("ZodCIDRv4", (e, t) => {
  pl.init(e, t), re.init(e, t);
});
function ab(e) {
  return As(sa, e);
}
var aa = g("ZodCIDRv6", (e, t) => {
  ml.init(e, t), re.init(e, t);
});
function cb(e) {
  return Is(aa, e);
}
var ca = g("ZodBase64", (e, t) => {
  vl.init(e, t), re.init(e, t);
});
function ub(e) {
  return Os(ca, e);
}
var ua = g("ZodBase64URL", (e, t) => {
  _l.init(e, t), re.init(e, t);
});
function lb(e) {
  return Ts(ua, e);
}
var la = g("ZodE164", (e, t) => {
  yl.init(e, t), re.init(e, t);
});
function hb(e) {
  return js(la, e);
}
var ha = g("ZodJWT", (e, t) => {
  bl.init(e, t), re.init(e, t);
});
function db(e) {
  return Ps(ha, e);
}
var $n = g("ZodCustomStringFormat", (e, t) => {
  wl.init(e, t), re.init(e, t);
});
function fb(e, t, r = {}) {
  return yn($n, e, t, r);
}
function pb(e) {
  return yn($n, "hostname", nt.hostname, e);
}
function mb(e) {
  return yn($n, "hex", nt.hex, e);
}
function gb(e, t) {
  let r = t?.enc ?? "hex",
    i = `${e}_${r}`,
    n = nt[i];
  if (!n) throw new Error(`Unrecognized hash format: ${i}`);
  return yn($n, i, n, t);
}
var En = g("ZodNumber", (e, t) => {
  os.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (i, n, o) => Kh(e, i, n, o)),
    (e.gt = (i, n) => e.check(kt(i, n))),
    (e.gte = (i, n) => e.check(ze(i, n))),
    (e.min = (i, n) => e.check(ze(i, n))),
    (e.lt = (i, n) => e.check(Et(i, n))),
    (e.lte = (i, n) => e.check(He(i, n))),
    (e.max = (i, n) => e.check(He(i, n))),
    (e.int = (i) => e.check(Ks(i))),
    (e.safe = (i) => e.check(Ks(i))),
    (e.positive = (i) => e.check(kt(0, i))),
    (e.nonnegative = (i) => e.check(ze(0, i))),
    (e.negative = (i) => e.check(Et(0, i))),
    (e.nonpositive = (i) => e.check(He(0, i))),
    (e.multipleOf = (i, n) => e.check(tr(i, n))),
    (e.step = (i, n) => e.check(tr(i, n))),
    (e.finite = () => e);
  let r = e._zod.bag;
  (e.minValue =
    Math.max(
      r.minimum ?? Number.NEGATIVE_INFINITY,
      r.exclusiveMinimum ?? Number.NEGATIVE_INFINITY,
    ) ?? null),
    (e.maxValue =
      Math.min(
        r.maximum ?? Number.POSITIVE_INFINITY,
        r.exclusiveMaximum ?? Number.POSITIVE_INFINITY,
      ) ?? null),
    (e.isInt =
      (r.format ?? "").includes("int") || Number.isSafeInteger(r.multipleOf ?? 0.5)),
    (e.isFinite = !0),
    (e.format = r.format ?? null);
});
function Kd(e) {
  return mh(En, e);
}
var Er = g("ZodNumberFormat", (e, t) => {
  xl.init(e, t), En.init(e, t);
});
function Ks(e) {
  return vh(Er, e);
}
function vb(e) {
  return _h(Er, e);
}
function _b(e) {
  return yh(Er, e);
}
function yb(e) {
  return bh(Er, e);
}
function bb(e) {
  return wh(Er, e);
}
var kn = g("ZodBoolean", (e, t) => {
  xi.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => Gh(e, r, i, n));
});
function Gd(e) {
  return xh(kn, e);
}
var An = g("ZodBigInt", (e, t) => {
  ss.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (i, n, o) => Hh(e, i, n, o)),
    (e.gte = (i, n) => e.check(ze(i, n))),
    (e.min = (i, n) => e.check(ze(i, n))),
    (e.gt = (i, n) => e.check(kt(i, n))),
    (e.gte = (i, n) => e.check(ze(i, n))),
    (e.min = (i, n) => e.check(ze(i, n))),
    (e.lt = (i, n) => e.check(Et(i, n))),
    (e.lte = (i, n) => e.check(He(i, n))),
    (e.max = (i, n) => e.check(He(i, n))),
    (e.positive = (i) => e.check(kt(BigInt(0), i))),
    (e.negative = (i) => e.check(Et(BigInt(0), i))),
    (e.nonpositive = (i) => e.check(He(BigInt(0), i))),
    (e.nonnegative = (i) => e.check(ze(BigInt(0), i))),
    (e.multipleOf = (i, n) => e.check(tr(i, n)));
  let r = e._zod.bag;
  (e.minValue = r.minimum ?? null),
    (e.maxValue = r.maximum ?? null),
    (e.format = r.format ?? null);
});
function wb(e) {
  return $h(An, e);
}
var da = g("ZodBigIntFormat", (e, t) => {
  Sl.init(e, t), An.init(e, t);
});
function xb(e) {
  return kh(da, e);
}
function Sb(e) {
  return Ah(da, e);
}
var Hd = g("ZodSymbol", (e, t) => {
  $l.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => Yh(e, r, i, n));
});
function $b(e) {
  return Ih(Hd, e);
}
var Yd = g("ZodUndefined", (e, t) => {
  El.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => Qh(e, r, i, n));
});
function Eb(e) {
  return Oh(Yd, e);
}
var Xd = g("ZodNull", (e, t) => {
  kl.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => Xh(e, r, i, n));
});
function Qd(e) {
  return Th(Xd, e);
}
var ef = g("ZodAny", (e, t) => {
  Al.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => rd(e, r, i, n));
});
function kb() {
  return jh(ef);
}
var tf = g("ZodUnknown", (e, t) => {
  Il.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => nd(e, r, i, n));
});
function $r() {
  return Ph(tf);
}
var rf = g("ZodNever", (e, t) => {
  Ol.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => td(e, r, i, n));
});
function fa(e) {
  return Nh(rf, e);
}
var nf = g("ZodVoid", (e, t) => {
  Tl.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => ed(e, r, i, n));
});
function Ab(e) {
  return Rh(nf, e);
}
var zi = g("ZodDate", (e, t) => {
  jl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (i, n, o) => id(e, i, n, o)),
    (e.min = (i, n) => e.check(ze(i, n))),
    (e.max = (i, n) => e.check(He(i, n)));
  let r = e._zod.bag;
  (e.minDate = r.minimum ? new Date(r.minimum) : null),
    (e.maxDate = r.maximum ? new Date(r.maximum) : null);
});
function Ib(e) {
  return Ch(zi, e);
}
var of = g("ZodArray", (e, t) => {
  Pl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => gd(e, r, i, n)),
    (e.element = t.element),
    (e.min = (r, i) => e.check(zt(r, i))),
    (e.nonempty = (r) => e.check(zt(1, r))),
    (e.max = (r, i) => e.check(xr(r, i))),
    (e.length = (r, i) => e.check(Sr(r, i))),
    (e.unwrap = () => e.element);
});
function Ui(e, t) {
  return Dh(of, e, t);
}
function Ob(e) {
  let t = e._zod.def.shape;
  return ma(Object.keys(t));
}
var Di = g("ZodObject", (e, t) => {
  Nl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => vd(e, r, i, n)),
    k.defineLazy(e, "shape", () => t.shape),
    (e.keyof = () => ma(Object.keys(e._zod.def.shape))),
    (e.catchall = (r) => e.clone({...e._zod.def, catchall: r})),
    (e.passthrough = () => e.clone({...e._zod.def, catchall: $r()})),
    (e.loose = () => e.clone({...e._zod.def, catchall: $r()})),
    (e.strict = () => e.clone({...e._zod.def, catchall: fa()})),
    (e.strip = () => e.clone({...e._zod.def, catchall: void 0})),
    (e.extend = (r) => k.extend(e, r)),
    (e.safeExtend = (r) => k.safeExtend(e, r)),
    (e.merge = (r) => k.merge(e, r)),
    (e.pick = (r) => k.pick(e, r)),
    (e.omit = (r) => k.omit(e, r)),
    (e.partial = (...r) => k.partial(va, e, r[0])),
    (e.required = (...r) => k.required(_a, e, r[0]));
});
function Tb(e, t) {
  let r = {type: "object", shape: e ?? {}, ...k.normalizeParams(t)};
  return new Di(r);
}
function jb(e, t) {
  return new Di({type: "object", shape: e, catchall: fa(), ...k.normalizeParams(t)});
}
function Pb(e, t) {
  return new Di({type: "object", shape: e, catchall: $r(), ...k.normalizeParams(t)});
}
var Li = g("ZodUnion", (e, t) => {
  Si.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Ls(e, r, i, n)),
    (e.options = t.options);
});
function pa(e, t) {
  return new Li({type: "union", options: e, ...k.normalizeParams(t)});
}
var sf = g("ZodXor", (e, t) => {
  Li.init(e, t),
    Rl.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Ls(e, r, i, n)),
    (e.options = t.options);
});
function Nb(e, t) {
  return new sf({type: "union", options: e, inclusive: !1, ...k.normalizeParams(t)});
}
var af = g("ZodDiscriminatedUnion", (e, t) => {
  Li.init(e, t), Cl.init(e, t);
});
function Rb(e, t, r) {
  return new af({type: "union", options: t, discriminator: e, ...k.normalizeParams(r)});
}
var cf = g("ZodIntersection", (e, t) => {
  zl.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => _d(e, r, i, n));
});
function uf(e, t) {
  return new cf({type: "intersection", left: e, right: t});
}
var lf = g("ZodTuple", (e, t) => {
  as.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => yd(e, r, i, n)),
    (e.rest = (r) => e.clone({...e._zod.def, rest: r}));
});
function hf(e, t, r) {
  let i = t instanceof Z,
    n = i ? r : t,
    o = i ? t : null;
  return new lf({type: "tuple", items: e, rest: o, ...k.normalizeParams(n)});
}
var Fi = g("ZodRecord", (e, t) => {
  Ul.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => bd(e, r, i, n)),
    (e.keyType = t.keyType),
    (e.valueType = t.valueType);
});
function df(e, t, r) {
  return new Fi({type: "record", keyType: e, valueType: t, ...k.normalizeParams(r)});
}
function Cb(e, t, r) {
  let i = Re(e);
  return (
    (i._zod.values = void 0),
    new Fi({type: "record", keyType: i, valueType: t, ...k.normalizeParams(r)})
  );
}
function zb(e, t, r) {
  return new Fi({
    type: "record",
    keyType: e,
    valueType: t,
    mode: "loose",
    ...k.normalizeParams(r),
  });
}
var ff = g("ZodMap", (e, t) => {
  Dl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => pd(e, r, i, n)),
    (e.keyType = t.keyType),
    (e.valueType = t.valueType);
});
function Ub(e, t, r) {
  return new ff({type: "map", keyType: e, valueType: t, ...k.normalizeParams(r)});
}
var pf = g("ZodSet", (e, t) => {
  Ll.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => md(e, r, i, n)),
    (e.min = (...r) => e.check(rr(...r))),
    (e.nonempty = (r) => e.check(rr(1, r))),
    (e.max = (...r) => e.check(wr(...r))),
    (e.size = (...r) => e.check(sn(...r)));
});
function Db(e, t) {
  return new pf({type: "set", valueType: e, ...k.normalizeParams(t)});
}
var xn = g("ZodEnum", (e, t) => {
  Fl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (i, n, o) => od(e, i, n, o)),
    (e.enum = t.entries),
    (e.options = Object.values(t.entries));
  let r = new Set(Object.keys(t.entries));
  (e.extract = (i, n) => {
    let o = {};
    for (let s of i)
      if (r.has(s)) o[s] = t.entries[s];
      else throw new Error(`Key ${s} not found in enum`);
    return new xn({...t, checks: [], ...k.normalizeParams(n), entries: o});
  }),
    (e.exclude = (i, n) => {
      let o = {...t.entries};
      for (let s of i)
        if (r.has(s)) delete o[s];
        else throw new Error(`Key ${s} not found in enum`);
      return new xn({...t, checks: [], ...k.normalizeParams(n), entries: o});
    });
});
function ma(e, t) {
  let r = Array.isArray(e) ? Object.fromEntries(e.map((i) => [i, i])) : e;
  return new xn({type: "enum", entries: r, ...k.normalizeParams(t)});
}
function Lb(e, t) {
  return new xn({type: "enum", entries: e, ...k.normalizeParams(t)});
}
var mf = g("ZodLiteral", (e, t) => {
  Ml.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => sd(e, r, i, n)),
    (e.values = new Set(t.values)),
    Object.defineProperty(e, "value", {
      get() {
        if (t.values.length > 1)
          throw new Error(
            "This schema contains multiple valid literal values. Use `.values` instead.",
          );
        return t.values[0];
      },
    });
});
function Fb(e, t) {
  return new mf({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...k.normalizeParams(t),
  });
}
var gf = g("ZodFile", (e, t) => {
  Bl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => ud(e, r, i, n)),
    (e.min = (r, i) => e.check(rr(r, i))),
    (e.max = (r, i) => e.check(wr(r, i))),
    (e.mime = (r, i) => e.check(fn(Array.isArray(r) ? r : [r], i)));
});
function Mb(e) {
  return Lh(gf, e);
}
var vf = g("ZodTransform", (e, t) => {
  Zl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => fd(e, r, i, n)),
    (e._zod.parse = (r, i) => {
      if (i.direction === "backward") throw new Gt(e.constructor.name);
      r.addIssue = (o) => {
        if (typeof o == "string") r.issues.push(k.issue(o, r.value, t));
        else {
          let s = o;
          s.fatal && (s.continue = !1),
            s.code ?? (s.code = "custom"),
            s.input ?? (s.input = r.value),
            s.inst ?? (s.inst = e),
            r.issues.push(k.issue(s));
        }
      };
      let n = t.transform(r.value, r);
      return n instanceof Promise
        ? n.then((o) => ((r.value = o), r))
        : ((r.value = n), r);
    });
});
function ga(e) {
  return new vf({type: "transform", transform: e});
}
var va = g("ZodOptional", (e, t) => {
  ql.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Od(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType);
});
function Pi(e) {
  return new va({type: "optional", innerType: e});
}
var _f = g("ZodNullable", (e, t) => {
  Vl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => wd(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType);
});
function Ni(e) {
  return new _f({type: "nullable", innerType: e});
}
function Bb(e) {
  return Pi(Ni(e));
}
var yf = g("ZodDefault", (e, t) => {
  Wl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Sd(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap);
});
function bf(e, t) {
  return new yf({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : k.shallowClone(t);
    },
  });
}
var wf = g("ZodPrefault", (e, t) => {
  Jl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => $d(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType);
});
function xf(e, t) {
  return new wf({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : k.shallowClone(t);
    },
  });
}
var _a = g("ZodNonOptional", (e, t) => {
  Kl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => xd(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType);
});
function Sf(e, t) {
  return new _a({type: "nonoptional", innerType: e, ...k.normalizeParams(t)});
}
var $f = g("ZodSuccess", (e, t) => {
  Gl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => ld(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType);
});
function Zb(e) {
  return new $f({type: "success", innerType: e});
}
var Ef = g("ZodCatch", (e, t) => {
  Hl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Ed(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap);
});
function kf(e, t) {
  return new Ef({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t,
  });
}
var Af = g("ZodNaN", (e, t) => {
  Yl.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => ad(e, r, i, n));
});
function qb(e) {
  return Uh(Af, e);
}
var ya = g("ZodPipe", (e, t) => {
  Xl.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => kd(e, r, i, n)),
    (e.in = t.in),
    (e.out = t.out);
});
function Ri(e, t) {
  return new ya({type: "pipe", in: e, out: t});
}
var ba = g("ZodCodec", (e, t) => {
  ya.init(e, t), $i.init(e, t);
});
function Vb(e, t, r) {
  return new ba({
    type: "pipe",
    in: e,
    out: t,
    transform: r.decode,
    reverseTransform: r.encode,
  });
}
var If = g("ZodReadonly", (e, t) => {
  Ql.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Ad(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType);
});
function Of(e) {
  return new If({type: "readonly", innerType: e});
}
var Tf = g("ZodTemplateLiteral", (e, t) => {
  eh.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => cd(e, r, i, n));
});
function Wb(e, t) {
  return new Tf({type: "template_literal", parts: e, ...k.normalizeParams(t)});
}
var jf = g("ZodLazy", (e, t) => {
  nh.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Td(e, r, i, n)),
    (e.unwrap = () => e._zod.def.getter());
});
function Pf(e) {
  return new jf({type: "lazy", getter: e});
}
var Nf = g("ZodPromise", (e, t) => {
  rh.init(e, t),
    q.init(e, t),
    (e._zod.processJSONSchema = (r, i, n) => Id(e, r, i, n)),
    (e.unwrap = () => e._zod.def.innerType);
});
function Jb(e) {
  return new Nf({type: "promise", innerType: e});
}
var Rf = g("ZodFunction", (e, t) => {
  th.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => dd(e, r, i, n));
});
function Kb(e) {
  return new Rf({
    type: "function",
    input: Array.isArray(e?.input) ? hf(e?.input) : (e?.input ?? Ui($r())),
    output: e?.output ?? $r(),
  });
}
var Mi = g("ZodCustom", (e, t) => {
  ih.init(e, t), q.init(e, t), (e._zod.processJSONSchema = (r, i, n) => hd(e, r, i, n));
});
function Gb(e) {
  let t = new ie({check: "custom"});
  return (t._zod.check = e), t;
}
function Hb(e, t) {
  return Fh(Mi, e ?? (() => !0), t);
}
function Cf(e, t = {}) {
  return Mh(Mi, e, t);
}
function zf(e) {
  return Bh(e);
}
var Yb = Zh,
  Xb = qh;
function Qb(e, t = {error: `Input not instance of ${e.name}`}) {
  let r = new Mi({
    type: "custom",
    check: "custom",
    fn: (i) => i instanceof e,
    abort: !0,
    ...k.normalizeParams(t),
  });
  return (r._zod.bag.Class = e), r;
}
var ew = (...e) => Vh({Codec: ba, Boolean: kn, String: Sn}, ...e);
function tw(e) {
  let t = Pf(() => pa([Js(e), Kd(), Gd(), Qd(), Ui(t), df(Js(), t)]));
  return t;
}
function rw(e, t) {
  return Ri(ga(e), t);
}
var DO = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom",
};
function LO(e) {
  de({customError: e});
}
function FO() {
  return de().customError;
}
var Uf;
Uf || (Uf = {});
var P = {...Ti, ...Bs, iso: wn};
function MO(e, t) {
  let r = e.$schema;
  return r === "https://json-schema.org/draft/2020-12/schema"
    ? "draft-2020-12"
    : r === "http://json-schema.org/draft-07/schema#"
      ? "draft-7"
      : r === "http://json-schema.org/draft-04/schema#"
        ? "draft-4"
        : (t ?? "draft-2020-12");
}
function BO(e, t) {
  if (!e.startsWith("#"))
    throw new Error(
      "External $ref is not supported, only local refs (#/...) are allowed",
    );
  let r = e.slice(1).split("/").filter(Boolean);
  if (r.length === 0) return t.rootSchema;
  let i = t.version === "draft-2020-12" ? "$defs" : "definitions";
  if (r[0] === i) {
    let n = r[1];
    if (!n || !t.defs[n]) throw new Error(`Reference not found: ${e}`);
    return t.defs[n];
  }
  throw new Error(`Reference not found: ${e}`);
}
function nw(e, t) {
  if (e.not !== void 0) {
    if (typeof e.not == "object" && Object.keys(e.not).length === 0) return P.never();
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (e.unevaluatedItems !== void 0)
    throw new Error("unevaluatedItems is not supported");
  if (e.unevaluatedProperties !== void 0)
    throw new Error("unevaluatedProperties is not supported");
  if (e.if !== void 0 || e.then !== void 0 || e.else !== void 0)
    throw new Error("Conditional schemas (if/then/else) are not supported");
  if (e.dependentSchemas !== void 0 || e.dependentRequired !== void 0)
    throw new Error("dependentSchemas and dependentRequired are not supported");
  if (e.$ref) {
    let n = e.$ref;
    if (t.refs.has(n)) return t.refs.get(n);
    if (t.processing.has(n))
      return P.lazy(() => {
        if (!t.refs.has(n)) throw new Error(`Circular reference not resolved: ${n}`);
        return t.refs.get(n);
      });
    t.processing.add(n);
    let o = BO(n, t),
      s = Oe(o, t);
    return t.refs.set(n, s), t.processing.delete(n), s;
  }
  if (e.enum !== void 0) {
    let n = e.enum;
    if (
      t.version === "openapi-3.0" &&
      e.nullable === !0 &&
      n.length === 1 &&
      n[0] === null
    )
      return P.null();
    if (n.length === 0) return P.never();
    if (n.length === 1) return P.literal(n[0]);
    if (n.every((s) => typeof s == "string")) return P.enum(n);
    let o = n.map((s) => P.literal(s));
    return o.length < 2 ? o[0] : P.union([o[0], o[1], ...o.slice(2)]);
  }
  if (e.const !== void 0) return P.literal(e.const);
  let r = e.type;
  if (Array.isArray(r)) {
    let n = r.map((o) => {
      let s = {...e, type: o};
      return nw(s, t);
    });
    return n.length === 0 ? P.never() : n.length === 1 ? n[0] : P.union(n);
  }
  if (!r) return P.any();
  let i;
  switch (r) {
    case "string": {
      let n = P.string();
      if (e.format) {
        let o = e.format;
        o === "email"
          ? (n = n.check(P.email()))
          : o === "uri" || o === "uri-reference"
            ? (n = n.check(P.url()))
            : o === "uuid" || o === "guid"
              ? (n = n.check(P.uuid()))
              : o === "date-time"
                ? (n = n.check(P.iso.datetime()))
                : o === "date"
                  ? (n = n.check(P.iso.date()))
                  : o === "time"
                    ? (n = n.check(P.iso.time()))
                    : o === "duration"
                      ? (n = n.check(P.iso.duration()))
                      : o === "ipv4"
                        ? (n = n.check(P.ipv4()))
                        : o === "ipv6"
                          ? (n = n.check(P.ipv6()))
                          : o === "mac"
                            ? (n = n.check(P.mac()))
                            : o === "cidr"
                              ? (n = n.check(P.cidrv4()))
                              : o === "cidr-v6"
                                ? (n = n.check(P.cidrv6()))
                                : o === "base64"
                                  ? (n = n.check(P.base64()))
                                  : o === "base64url"
                                    ? (n = n.check(P.base64url()))
                                    : o === "e164"
                                      ? (n = n.check(P.e164()))
                                      : o === "jwt"
                                        ? (n = n.check(P.jwt()))
                                        : o === "emoji"
                                          ? (n = n.check(P.emoji()))
                                          : o === "nanoid"
                                            ? (n = n.check(P.nanoid()))
                                            : o === "cuid"
                                              ? (n = n.check(P.cuid()))
                                              : o === "cuid2"
                                                ? (n = n.check(P.cuid2()))
                                                : o === "ulid"
                                                  ? (n = n.check(P.ulid()))
                                                  : o === "xid"
                                                    ? (n = n.check(P.xid()))
                                                    : o === "ksuid" &&
                                                      (n = n.check(P.ksuid()));
      }
      typeof e.minLength == "number" && (n = n.min(e.minLength)),
        typeof e.maxLength == "number" && (n = n.max(e.maxLength)),
        e.pattern && (n = n.regex(new RegExp(e.pattern))),
        (i = n);
      break;
    }
    case "number":
    case "integer": {
      let n = r === "integer" ? P.number().int() : P.number();
      typeof e.minimum == "number" && (n = n.min(e.minimum)),
        typeof e.maximum == "number" && (n = n.max(e.maximum)),
        typeof e.exclusiveMinimum == "number"
          ? (n = n.gt(e.exclusiveMinimum))
          : e.exclusiveMinimum === !0 &&
            typeof e.minimum == "number" &&
            (n = n.gt(e.minimum)),
        typeof e.exclusiveMaximum == "number"
          ? (n = n.lt(e.exclusiveMaximum))
          : e.exclusiveMaximum === !0 &&
            typeof e.maximum == "number" &&
            (n = n.lt(e.maximum)),
        typeof e.multipleOf == "number" && (n = n.multipleOf(e.multipleOf)),
        (i = n);
      break;
    }
    case "boolean": {
      i = P.boolean();
      break;
    }
    case "null": {
      i = P.null();
      break;
    }
    case "object": {
      let n = {},
        o = e.properties || {},
        s = new Set(e.required || []);
      for (let [c, u] of Object.entries(o)) {
        let l = Oe(u, t);
        n[c] = s.has(c) ? l : l.optional();
      }
      if (e.propertyNames) {
        let c = Oe(e.propertyNames, t),
          u =
            e.additionalProperties && typeof e.additionalProperties == "object"
              ? Oe(e.additionalProperties, t)
              : P.any();
        if (Object.keys(n).length === 0) {
          i = P.record(c, u);
          break;
        }
        let l = P.object(n).passthrough(),
          h = P.looseRecord(c, u);
        i = P.intersection(l, h);
        break;
      }
      if (e.patternProperties) {
        let c = e.patternProperties,
          u = Object.keys(c),
          l = [];
        for (let f of u) {
          let d = Oe(c[f], t),
            p = P.string().regex(new RegExp(f));
          l.push(P.looseRecord(p, d));
        }
        let h = [];
        if (
          (Object.keys(n).length > 0 && h.push(P.object(n).passthrough()),
          h.push(...l),
          h.length === 0)
        )
          i = P.object({}).passthrough();
        else if (h.length === 1) i = h[0];
        else {
          let f = P.intersection(h[0], h[1]);
          for (let d = 2; d < h.length; d++) f = P.intersection(f, h[d]);
          i = f;
        }
        break;
      }
      let a = P.object(n);
      e.additionalProperties === !1
        ? (i = a.strict())
        : typeof e.additionalProperties == "object"
          ? (i = a.catchall(Oe(e.additionalProperties, t)))
          : (i = a.passthrough());
      break;
    }
    case "array": {
      let n = e.prefixItems,
        o = e.items;
      if (n && Array.isArray(n)) {
        let s = n.map((c) => Oe(c, t)),
          a = o && typeof o == "object" && !Array.isArray(o) ? Oe(o, t) : void 0;
        a ? (i = P.tuple(s).rest(a)) : (i = P.tuple(s)),
          typeof e.minItems == "number" && (i = i.check(P.minLength(e.minItems))),
          typeof e.maxItems == "number" && (i = i.check(P.maxLength(e.maxItems)));
      } else if (Array.isArray(o)) {
        let s = o.map((c) => Oe(c, t)),
          a =
            e.additionalItems && typeof e.additionalItems == "object"
              ? Oe(e.additionalItems, t)
              : void 0;
        a ? (i = P.tuple(s).rest(a)) : (i = P.tuple(s)),
          typeof e.minItems == "number" && (i = i.check(P.minLength(e.minItems))),
          typeof e.maxItems == "number" && (i = i.check(P.maxLength(e.maxItems)));
      } else if (o !== void 0) {
        let s = Oe(o, t),
          a = P.array(s);
        typeof e.minItems == "number" && (a = a.min(e.minItems)),
          typeof e.maxItems == "number" && (a = a.max(e.maxItems)),
          (i = a);
      } else i = P.array(P.any());
      break;
    }
    default:
      throw new Error(`Unsupported type: ${r}`);
  }
  return (
    e.description && (i = i.describe(e.description)),
    e.default !== void 0 && (i = i.default(e.default)),
    i
  );
}
function Oe(e, t) {
  if (typeof e == "boolean") return e ? P.any() : P.never();
  let r = nw(e, t),
    i = e.type || e.enum !== void 0 || e.const !== void 0;
  if (e.anyOf && Array.isArray(e.anyOf)) {
    let n = e.anyOf.map((s) => Oe(s, t)),
      o = P.union(n);
    r = i ? P.intersection(r, o) : o;
  }
  if (e.oneOf && Array.isArray(e.oneOf)) {
    let n = e.oneOf.map((s) => Oe(s, t)),
      o = P.xor(n);
    r = i ? P.intersection(r, o) : o;
  }
  if (e.allOf && Array.isArray(e.allOf))
    if (e.allOf.length === 0) r = i ? r : P.any();
    else {
      let n = i ? r : Oe(e.allOf[0], t),
        o = i ? 0 : 1;
      for (let s = o; s < e.allOf.length; s++) n = P.intersection(n, Oe(e.allOf[s], t));
      r = n;
    }
  return (
    e.nullable === !0 && t.version === "openapi-3.0" && (r = P.nullable(r)),
    e.readOnly === !0 && (r = P.readonly(r)),
    r
  );
}
function iw(e, t) {
  if (typeof e == "boolean") return e ? P.any() : P.never();
  let r = MO(e, t?.defaultTarget),
    i = e.$defs || e.definitions || {};
  return Oe(e, {
    version: r,
    defs: i,
    refs: new Map(),
    processing: new Set(),
    rootSchema: e,
  });
}
var Df = {};
lt(Df, {
  bigint: () => WO,
  boolean: () => VO,
  date: () => JO,
  number: () => qO,
  string: () => ZO,
});
function ZO(e) {
  return ch(Sn, e);
}
function qO(e) {
  return gh(En, e);
}
function VO(e) {
  return Sh(kn, e);
}
function WO(e) {
  return Eh(An, e);
}
function JO(e) {
  return zh(zi, e);
}
de(cs());
var KO = sr.object({
  tags: sr.array(sr.string()).optional(),
  reverse: sr.boolean().optional(),
  list: sr.boolean().optional(),
});
async function aw(e) {
  let t = await ow.readFile(e, "utf-8"),
    {data: r, content: i} = (0, sw.default)(t),
    n = KO.safeParse(r);
  n.success || console.warn(`Invalid frontmatter in ${e}:`, n.error.format());
  let o = n.success ? n.data : {};
  return {filePath: e, config: o, content: i.trim()};
}
var uw = We(cw()),
  lw = We(require("path"));
function hw(e) {
  let {config: t, content: r, filePath: i} = e,
    n = [],
    o = i;
  if (t.list) {
    let s = r.split(`
`);
    for (let a of s) {
      if (!a.includes("::")) continue;
      let c = a.split("::");
      if (c.length < 2) continue;
      let u = c[0].trim(),
        l = c.slice(1).join("::").trim();
      if (!u || !l) continue;
      let h = (0, uw.sha256)(u);
      n.push({
        source_filepath: o,
        card_anchor: h,
        card_type: "basic",
        front: u,
        back: l,
      });
    }
  } else {
    let s = lw.basename(i),
      a = s,
      c = s,
      u = r;
    n.push({source_filepath: o, card_anchor: a, card_type: "basic", front: c, back: u}),
      t.reverse &&
        n.push({
          source_filepath: o,
          card_anchor: a,
          card_type: "reverse",
          front: u,
          back: c,
        });
  }
  return n;
}
var C = {};
lt(C, {
  FunctionRegion: () => ut.FunctionRegion,
  FunctionsError: () => ut.FunctionsError,
  FunctionsFetchError: () => ut.FunctionsFetchError,
  FunctionsHttpError: () => ut.FunctionsHttpError,
  FunctionsRelayError: () => ut.FunctionsRelayError,
  PostgrestError: () => Jf,
  SupabaseClient: () => V0,
  createClient: () => em,
});
var ut = We(Bw(), 1);
var Jf = class extends Error {
    constructor(e) {
      super(e.message),
        (this.name = "PostgrestError"),
        (this.details = e.details),
        (this.hint = e.hint),
        (this.code = e.code);
    }
  },
  rT = class {
    constructor(e) {
      var t, r;
      (this.shouldThrowOnError = !1),
        (this.method = e.method),
        (this.url = e.url),
        (this.headers = new Headers(e.headers)),
        (this.schema = e.schema),
        (this.body = e.body),
        (this.shouldThrowOnError =
          (t = e.shouldThrowOnError) !== null && t !== void 0 ? t : !1),
        (this.signal = e.signal),
        (this.isMaybeSingle = (r = e.isMaybeSingle) !== null && r !== void 0 ? r : !1),
        e.fetch ? (this.fetch = e.fetch) : (this.fetch = fetch);
    }
    throwOnError() {
      return (this.shouldThrowOnError = !0), this;
    }
    setHeader(e, t) {
      return (this.headers = new Headers(this.headers)), this.headers.set(e, t), this;
    }
    then(e, t) {
      var r = this;
      this.schema === void 0 ||
        (["GET", "HEAD"].includes(this.method)
          ? this.headers.set("Accept-Profile", this.schema)
          : this.headers.set("Content-Profile", this.schema)),
        this.method !== "GET" &&
          this.method !== "HEAD" &&
          this.headers.set("Content-Type", "application/json");
      let i = this.fetch,
        n = i(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal,
        }).then(async (o) => {
          let s = null,
            a = null,
            c = null,
            u = o.status,
            l = o.statusText;
          if (o.ok) {
            var h, f;
            if (r.method !== "HEAD") {
              var d;
              let w = await o.text();
              w === "" ||
                (r.headers.get("Accept") === "text/csv" ||
                (r.headers.get("Accept") &&
                  !((d = r.headers.get("Accept")) === null || d === void 0) &&
                  d.includes("application/vnd.pgrst.plan+text"))
                  ? (a = w)
                  : (a = JSON.parse(w)));
            }
            let m =
                (h = r.headers.get("Prefer")) === null || h === void 0
                  ? void 0
                  : h.match(/count=(exact|planned|estimated)/),
              v =
                (f = o.headers.get("content-range")) === null || f === void 0
                  ? void 0
                  : f.split("/");
            m && v && v.length > 1 && (c = parseInt(v[1])),
              r.isMaybeSingle &&
                r.method === "GET" &&
                Array.isArray(a) &&
                (a.length > 1
                  ? ((s = {
                      code: "PGRST116",
                      details: `Results contain ${a.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                      hint: null,
                      message: "JSON object requested, multiple (or no) rows returned",
                    }),
                    (a = null),
                    (c = null),
                    (u = 406),
                    (l = "Not Acceptable"))
                  : a.length === 1
                    ? (a = a[0])
                    : (a = null));
          } else {
            var p;
            let m = await o.text();
            try {
              (s = JSON.parse(m)),
                Array.isArray(s) &&
                  o.status === 404 &&
                  ((a = []), (s = null), (u = 200), (l = "OK"));
            } catch {
              o.status === 404 && m === ""
                ? ((u = 204), (l = "No Content"))
                : (s = {message: m});
            }
            if (
              (s &&
                r.isMaybeSingle &&
                !(s == null || (p = s.details) === null || p === void 0) &&
                p.includes("0 rows") &&
                ((s = null), (u = 200), (l = "OK")),
              s && r.shouldThrowOnError)
            )
              throw new Jf(s);
          }
          return {error: s, data: a, count: c, status: u, statusText: l};
        });
      return (
        this.shouldThrowOnError ||
          (n = n.catch((o) => {
            var s;
            let a = "",
              c = o?.cause;
            if (c) {
              var u, l, h, f;
              let p = (u = c?.message) !== null && u !== void 0 ? u : "",
                m = (l = c?.code) !== null && l !== void 0 ? l : "";
              (a = `${(h = o?.name) !== null && h !== void 0 ? h : "FetchError"}: ${o?.message}`),
                (a += `

Caused by: ${(f = c?.name) !== null && f !== void 0 ? f : "Error"}: ${p}`),
                m && (a += ` (${m})`),
                c?.stack &&
                  (a += `
${c.stack}`);
            } else {
              var d;
              a = (d = o?.stack) !== null && d !== void 0 ? d : "";
            }
            return {
              error: {
                message: `${(s = o?.name) !== null && s !== void 0 ? s : "FetchError"}: ${o?.message}`,
                details: a,
                hint: "",
                code: "",
              },
              data: null,
              count: null,
              status: 0,
              statusText: "",
            };
          })),
        n.then(e, t)
      );
    }
    returns() {
      return this;
    }
    overrideTypes() {
      return this;
    }
  },
  nT = class extends rT {
    select(e) {
      let t = !1,
        r = (e ?? "*")
          .split("")
          .map((i) => (/\s/.test(i) && !t ? "" : (i === '"' && (t = !t), i)))
          .join("");
      return (
        this.url.searchParams.set("select", r),
        this.headers.append("Prefer", "return=representation"),
        this
      );
    }
    order(
      e,
      {ascending: t = !0, nullsFirst: r, foreignTable: i, referencedTable: n = i} = {},
    ) {
      let o = n ? `${n}.order` : "order",
        s = this.url.searchParams.get(o);
      return (
        this.url.searchParams.set(
          o,
          `${s ? `${s},` : ""}${e}.${t ? "asc" : "desc"}${r === void 0 ? "" : r ? ".nullsfirst" : ".nullslast"}`,
        ),
        this
      );
    }
    limit(e, {foreignTable: t, referencedTable: r = t} = {}) {
      let i = typeof r > "u" ? "limit" : `${r}.limit`;
      return this.url.searchParams.set(i, `${e}`), this;
    }
    range(e, t, {foreignTable: r, referencedTable: i = r} = {}) {
      let n = typeof i > "u" ? "offset" : `${i}.offset`,
        o = typeof i > "u" ? "limit" : `${i}.limit`;
      return (
        this.url.searchParams.set(n, `${e}`),
        this.url.searchParams.set(o, `${t - e + 1}`),
        this
      );
    }
    abortSignal(e) {
      return (this.signal = e), this;
    }
    single() {
      return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
    }
    maybeSingle() {
      return (
        this.method === "GET"
          ? this.headers.set("Accept", "application/json")
          : this.headers.set("Accept", "application/vnd.pgrst.object+json"),
        (this.isMaybeSingle = !0),
        this
      );
    }
    csv() {
      return this.headers.set("Accept", "text/csv"), this;
    }
    geojson() {
      return this.headers.set("Accept", "application/geo+json"), this;
    }
    explain({
      analyze: e = !1,
      verbose: t = !1,
      settings: r = !1,
      buffers: i = !1,
      wal: n = !1,
      format: o = "text",
    } = {}) {
      var s;
      let a = [
          e ? "analyze" : null,
          t ? "verbose" : null,
          r ? "settings" : null,
          i ? "buffers" : null,
          n ? "wal" : null,
        ]
          .filter(Boolean)
          .join("|"),
        c =
          (s = this.headers.get("Accept")) !== null && s !== void 0
            ? s
            : "application/json";
      return (
        this.headers.set(
          "Accept",
          `application/vnd.pgrst.plan+${o}; for="${c}"; options=${a};`,
        ),
        o === "json" ? this : this
      );
    }
    rollback() {
      return this.headers.append("Prefer", "tx=rollback"), this;
    }
    returns() {
      return this;
    }
    maxAffected(e) {
      return (
        this.headers.append("Prefer", "handling=strict"),
        this.headers.append("Prefer", `max-affected=${e}`),
        this
      );
    }
  },
  Zw = new RegExp("[,()]"),
  jn = class extends nT {
    eq(e, t) {
      return this.url.searchParams.append(e, `eq.${t}`), this;
    }
    neq(e, t) {
      return this.url.searchParams.append(e, `neq.${t}`), this;
    }
    gt(e, t) {
      return this.url.searchParams.append(e, `gt.${t}`), this;
    }
    gte(e, t) {
      return this.url.searchParams.append(e, `gte.${t}`), this;
    }
    lt(e, t) {
      return this.url.searchParams.append(e, `lt.${t}`), this;
    }
    lte(e, t) {
      return this.url.searchParams.append(e, `lte.${t}`), this;
    }
    like(e, t) {
      return this.url.searchParams.append(e, `like.${t}`), this;
    }
    likeAllOf(e, t) {
      return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this;
    }
    likeAnyOf(e, t) {
      return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this;
    }
    ilike(e, t) {
      return this.url.searchParams.append(e, `ilike.${t}`), this;
    }
    ilikeAllOf(e, t) {
      return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this;
    }
    ilikeAnyOf(e, t) {
      return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this;
    }
    regexMatch(e, t) {
      return this.url.searchParams.append(e, `match.${t}`), this;
    }
    regexIMatch(e, t) {
      return this.url.searchParams.append(e, `imatch.${t}`), this;
    }
    is(e, t) {
      return this.url.searchParams.append(e, `is.${t}`), this;
    }
    isDistinct(e, t) {
      return this.url.searchParams.append(e, `isdistinct.${t}`), this;
    }
    in(e, t) {
      let r = Array.from(new Set(t))
        .map((i) => (typeof i == "string" && Zw.test(i) ? `"${i}"` : `${i}`))
        .join(",");
      return this.url.searchParams.append(e, `in.(${r})`), this;
    }
    notIn(e, t) {
      let r = Array.from(new Set(t))
        .map((i) => (typeof i == "string" && Zw.test(i) ? `"${i}"` : `${i}`))
        .join(",");
      return this.url.searchParams.append(e, `not.in.(${r})`), this;
    }
    contains(e, t) {
      return (
        typeof t == "string"
          ? this.url.searchParams.append(e, `cs.${t}`)
          : Array.isArray(t)
            ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`)
            : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`),
        this
      );
    }
    containedBy(e, t) {
      return (
        typeof t == "string"
          ? this.url.searchParams.append(e, `cd.${t}`)
          : Array.isArray(t)
            ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`)
            : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`),
        this
      );
    }
    rangeGt(e, t) {
      return this.url.searchParams.append(e, `sr.${t}`), this;
    }
    rangeGte(e, t) {
      return this.url.searchParams.append(e, `nxl.${t}`), this;
    }
    rangeLt(e, t) {
      return this.url.searchParams.append(e, `sl.${t}`), this;
    }
    rangeLte(e, t) {
      return this.url.searchParams.append(e, `nxr.${t}`), this;
    }
    rangeAdjacent(e, t) {
      return this.url.searchParams.append(e, `adj.${t}`), this;
    }
    overlaps(e, t) {
      return (
        typeof t == "string"
          ? this.url.searchParams.append(e, `ov.${t}`)
          : this.url.searchParams.append(e, `ov.{${t.join(",")}}`),
        this
      );
    }
    textSearch(e, t, {config: r, type: i} = {}) {
      let n = "";
      i === "plain"
        ? (n = "pl")
        : i === "phrase"
          ? (n = "ph")
          : i === "websearch" && (n = "w");
      let o = r === void 0 ? "" : `(${r})`;
      return this.url.searchParams.append(e, `${n}fts${o}.${t}`), this;
    }
    match(e) {
      return (
        Object.entries(e).forEach(([t, r]) => {
          this.url.searchParams.append(t, `eq.${r}`);
        }),
        this
      );
    }
    not(e, t, r) {
      return this.url.searchParams.append(e, `not.${t}.${r}`), this;
    }
    or(e, {foreignTable: t, referencedTable: r = t} = {}) {
      let i = r ? `${r}.or` : "or";
      return this.url.searchParams.append(i, `(${e})`), this;
    }
    filter(e, t, r) {
      return this.url.searchParams.append(e, `${t}.${r}`), this;
    }
  },
  iT = class {
    constructor(e, {headers: t = {}, schema: r, fetch: i}) {
      (this.url = e),
        (this.headers = new Headers(t)),
        (this.schema = r),
        (this.fetch = i);
    }
    select(e, t) {
      let {head: r = !1, count: i} = t ?? {},
        n = r ? "HEAD" : "GET",
        o = !1,
        s = (e ?? "*")
          .split("")
          .map((a) => (/\s/.test(a) && !o ? "" : (a === '"' && (o = !o), a)))
          .join("");
      return (
        this.url.searchParams.set("select", s),
        i && this.headers.append("Prefer", `count=${i}`),
        new jn({
          method: n,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
        })
      );
    }
    insert(e, {count: t, defaultToNull: r = !0} = {}) {
      var i;
      let n = "POST";
      if (
        (t && this.headers.append("Prefer", `count=${t}`),
        r || this.headers.append("Prefer", "missing=default"),
        Array.isArray(e))
      ) {
        let o = e.reduce((s, a) => s.concat(Object.keys(a)), []);
        if (o.length > 0) {
          let s = [...new Set(o)].map((a) => `"${a}"`);
          this.url.searchParams.set("columns", s.join(","));
        }
      }
      return new jn({
        method: n,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: e,
        fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch,
      });
    }
    upsert(
      e,
      {onConflict: t, ignoreDuplicates: r = !1, count: i, defaultToNull: n = !0} = {},
    ) {
      var o;
      let s = "POST";
      if (
        (this.headers.append(
          "Prefer",
          `resolution=${r ? "ignore" : "merge"}-duplicates`,
        ),
        t !== void 0 && this.url.searchParams.set("on_conflict", t),
        i && this.headers.append("Prefer", `count=${i}`),
        n || this.headers.append("Prefer", "missing=default"),
        Array.isArray(e))
      ) {
        let a = e.reduce((c, u) => c.concat(Object.keys(u)), []);
        if (a.length > 0) {
          let c = [...new Set(a)].map((u) => `"${u}"`);
          this.url.searchParams.set("columns", c.join(","));
        }
      }
      return new jn({
        method: s,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: e,
        fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch,
      });
    }
    update(e, {count: t} = {}) {
      var r;
      let i = "PATCH";
      return (
        t && this.headers.append("Prefer", `count=${t}`),
        new jn({
          method: i,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: e,
          fetch: (r = this.fetch) !== null && r !== void 0 ? r : fetch,
        })
      );
    }
    delete({count: e} = {}) {
      var t;
      let r = "DELETE";
      return (
        e && this.headers.append("Prefer", `count=${e}`),
        new jn({
          method: r,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: (t = this.fetch) !== null && t !== void 0 ? t : fetch,
        })
      );
    }
  },
  qw = class Vw {
    constructor(t, {headers: r = {}, schema: i, fetch: n} = {}) {
      (this.url = t),
        (this.headers = new Headers(r)),
        (this.schemaName = i),
        (this.fetch = n);
    }
    from(t) {
      if (!t || typeof t != "string" || t.trim() === "")
        throw new Error("Invalid relation name: relation must be a non-empty string.");
      return new iT(new URL(`${this.url}/${t}`), {
        headers: new Headers(this.headers),
        schema: this.schemaName,
        fetch: this.fetch,
      });
    }
    schema(t) {
      return new Vw(this.url, {headers: this.headers, schema: t, fetch: this.fetch});
    }
    rpc(t, r = {}, {head: i = !1, get: n = !1, count: o} = {}) {
      var s;
      let a,
        c = new URL(`${this.url}/rpc/${t}`),
        u;
      i || n
        ? ((a = i ? "HEAD" : "GET"),
          Object.entries(r)
            .filter(([h, f]) => f !== void 0)
            .map(([h, f]) => [h, Array.isArray(f) ? `{${f.join(",")}}` : `${f}`])
            .forEach(([h, f]) => {
              c.searchParams.append(h, f);
            }))
        : ((a = "POST"), (u = r));
      let l = new Headers(this.headers);
      return (
        o && l.set("Prefer", `count=${o}`),
        new jn({
          method: a,
          url: c,
          headers: l,
          schema: this.schemaName,
          body: u,
          fetch: (s = this.fetch) !== null && s !== void 0 ? s : fetch,
        })
      );
    }
  };
var Z0 = We(hp(), 1);
var Ji = class extends Error {
  constructor(e, t) {
    super(e),
      (this.name = "IcebergError"),
      (this.status = t.status),
      (this.icebergType = t.icebergType),
      (this.icebergCode = t.icebergCode),
      (this.details = t.details),
      (this.isCommitStateUnknown =
        t.icebergType === "CommitStateUnknownException" ||
        ([500, 502, 504].includes(t.status) &&
          t.icebergType?.includes("CommitState") === !0));
  }
  isNotFound() {
    return this.status === 404;
  }
  isConflict() {
    return this.status === 409;
  }
  isAuthenticationTimeout() {
    return this.status === 419;
  }
};
function IT(e, t, r) {
  let i = new URL(t, e);
  if (r) for (let [n, o] of Object.entries(r)) o !== void 0 && i.searchParams.set(n, o);
  return i.toString();
}
async function OT(e) {
  return !e || e.type === "none"
    ? {}
    : e.type === "bearer"
      ? {Authorization: `Bearer ${e.token}`}
      : e.type === "header"
        ? {[e.name]: e.value}
        : e.type === "custom"
          ? await e.getHeaders()
          : {};
}
function TT(e) {
  let t = e.fetchImpl ?? globalThis.fetch;
  return {
    async request({method: r, path: i, query: n, body: o, headers: s}) {
      let a = IT(e.baseUrl, i, n),
        c = await OT(e.auth),
        u = await t(a, {
          method: r,
          headers: {...(o ? {"Content-Type": "application/json"} : {}), ...c, ...s},
          body: o ? JSON.stringify(o) : void 0,
        }),
        l = await u.text(),
        h = (u.headers.get("content-type") || "").includes("application/json"),
        f = h && l ? JSON.parse(l) : l;
      if (!u.ok) {
        let d = h ? f : void 0,
          p = d?.error;
        throw new Ji(p?.message ?? `Request failed with status ${u.status}`, {
          status: u.status,
          icebergType: p?.type,
          icebergCode: p?.code,
          details: d,
        });
      }
      return {status: u.status, headers: u.headers, data: f};
    },
  };
}
function Ca(e) {
  return e.join("");
}
var jT = class {
  constructor(e, t = "") {
    (this.client = e), (this.prefix = t);
  }
  async listNamespaces(e) {
    let t = e ? {parent: Ca(e.namespace)} : void 0;
    return (
      await this.client.request({
        method: "GET",
        path: `${this.prefix}/namespaces`,
        query: t,
      })
    ).data.namespaces.map((i) => ({namespace: i}));
  }
  async createNamespace(e, t) {
    let r = {namespace: e.namespace, properties: t?.properties};
    return (
      await this.client.request({
        method: "POST",
        path: `${this.prefix}/namespaces`,
        body: r,
      })
    ).data;
  }
  async dropNamespace(e) {
    await this.client.request({
      method: "DELETE",
      path: `${this.prefix}/namespaces/${Ca(e.namespace)}`,
    });
  }
  async loadNamespaceMetadata(e) {
    return {
      properties: (
        await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${Ca(e.namespace)}`,
        })
      ).data.properties,
    };
  }
  async namespaceExists(e) {
    try {
      return (
        await this.client.request({
          method: "HEAD",
          path: `${this.prefix}/namespaces/${Ca(e.namespace)}`,
        }),
        !0
      );
    } catch (t) {
      if (t instanceof Ji && t.status === 404) return !1;
      throw t;
    }
  }
  async createNamespaceIfNotExists(e, t) {
    try {
      return await this.createNamespace(e, t);
    } catch (r) {
      if (r instanceof Ji && r.status === 409) return;
      throw r;
    }
  }
};
function Pn(e) {
  return e.join("");
}
var PT = class {
    constructor(e, t = "", r) {
      (this.client = e), (this.prefix = t), (this.accessDelegation = r);
    }
    async listTables(e) {
      return (
        await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${Pn(e.namespace)}/tables`,
        })
      ).data.identifiers;
    }
    async createTable(e, t) {
      let r = {};
      return (
        this.accessDelegation &&
          (r["X-Iceberg-Access-Delegation"] = this.accessDelegation),
        (
          await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${Pn(e.namespace)}/tables`,
            body: t,
            headers: r,
          })
        ).data.metadata
      );
    }
    async updateTable(e, t) {
      let r = await this.client.request({
        method: "POST",
        path: `${this.prefix}/namespaces/${Pn(e.namespace)}/tables/${e.name}`,
        body: t,
      });
      return {
        "metadata-location": r.data["metadata-location"],
        metadata: r.data.metadata,
      };
    }
    async dropTable(e, t) {
      await this.client.request({
        method: "DELETE",
        path: `${this.prefix}/namespaces/${Pn(e.namespace)}/tables/${e.name}`,
        query: {purgeRequested: String(t?.purge ?? !1)},
      });
    }
    async loadTable(e) {
      let t = {};
      return (
        this.accessDelegation &&
          (t["X-Iceberg-Access-Delegation"] = this.accessDelegation),
        (
          await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${Pn(e.namespace)}/tables/${e.name}`,
            headers: t,
          })
        ).data.metadata
      );
    }
    async tableExists(e) {
      let t = {};
      this.accessDelegation &&
        (t["X-Iceberg-Access-Delegation"] = this.accessDelegation);
      try {
        return (
          await this.client.request({
            method: "HEAD",
            path: `${this.prefix}/namespaces/${Pn(e.namespace)}/tables/${e.name}`,
            headers: t,
          }),
          !0
        );
      } catch (r) {
        if (r instanceof Ji && r.status === 404) return !1;
        throw r;
      }
    }
    async createTableIfNotExists(e, t) {
      try {
        return await this.createTable(e, t);
      } catch (r) {
        if (r instanceof Ji && r.status === 409)
          return await this.loadTable({namespace: e.namespace, name: t.name});
        throw r;
      }
    }
  },
  s0 = class {
    constructor(e) {
      let t = "v1";
      e.catalogName && (t += `/${e.catalogName}`);
      let r = e.baseUrl.endsWith("/") ? e.baseUrl : `${e.baseUrl}/`;
      (this.client = TT({baseUrl: r, auth: e.auth, fetchImpl: e.fetch})),
        (this.accessDelegation = e.accessDelegation?.join(",")),
        (this.namespaceOps = new jT(this.client, t)),
        (this.tableOps = new PT(this.client, t, this.accessDelegation));
    }
    async listNamespaces(e) {
      return this.namespaceOps.listNamespaces(e);
    }
    async createNamespace(e, t) {
      return this.namespaceOps.createNamespace(e, t);
    }
    async dropNamespace(e) {
      await this.namespaceOps.dropNamespace(e);
    }
    async loadNamespaceMetadata(e) {
      return this.namespaceOps.loadNamespaceMetadata(e);
    }
    async listTables(e) {
      return this.tableOps.listTables(e);
    }
    async createTable(e, t) {
      return this.tableOps.createTable(e, t);
    }
    async updateTable(e, t) {
      return this.tableOps.updateTable(e, t);
    }
    async dropTable(e, t) {
      await this.tableOps.dropTable(e, t);
    }
    async loadTable(e) {
      return this.tableOps.loadTable(e);
    }
    async namespaceExists(e) {
      return this.namespaceOps.namespaceExists(e);
    }
    async tableExists(e) {
      return this.tableOps.tableExists(e);
    }
    async createNamespaceIfNotExists(e, t) {
      return this.namespaceOps.createNamespaceIfNotExists(e, t);
    }
    async createTableIfNotExists(e, t) {
      return this.tableOps.createTableIfNotExists(e, t);
    }
  };
var za = class extends Error {
  constructor(e) {
    super(e), (this.__isStorageError = !0), (this.name = "StorageError");
  }
};
function ce(e) {
  return typeof e == "object" && e !== null && "__isStorageError" in e;
}
var NT = class extends za {
    constructor(e, t, r) {
      super(e),
        (this.name = "StorageApiError"),
        (this.status = t),
        (this.statusCode = r);
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        statusCode: this.statusCode,
      };
    }
  },
  pp = class extends za {
    constructor(e, t) {
      super(e), (this.name = "StorageUnknownError"), (this.originalError = t);
    }
  },
  vp = (e) => (e ? (...t) => e(...t) : (...t) => fetch(...t)),
  RT = () => Response,
  mp = (e) => {
    if (Array.isArray(e)) return e.map((r) => mp(r));
    if (typeof e == "function" || e !== Object(e)) return e;
    let t = {};
    return (
      Object.entries(e).forEach(([r, i]) => {
        let n = r.replace(/([-_][a-z])/gi, (o) => o.toUpperCase().replace(/[-_]/g, ""));
        t[n] = mp(i);
      }),
      t
    );
  },
  CT = (e) => {
    if (typeof e != "object" || e === null) return !1;
    let t = Object.getPrototypeOf(e);
    return (
      (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  zT = (e) =>
    !e ||
    typeof e != "string" ||
    e.length === 0 ||
    e.length > 100 ||
    e.trim() !== e ||
    e.includes("/") ||
    e.includes("\\")
      ? !1
      : /^[\w!.\*'() &$@=;:+,?-]+$/.test(e);
function Ki(e) {
  "@babel/helpers - typeof";
  return (
    (Ki =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ki(e)
  );
}
function UT(e, t) {
  if (Ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var i = r.call(e, t || "default");
    if (Ki(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function DT(e) {
  var t = UT(e, "string");
  return Ki(t) == "symbol" ? t : t + "";
}
function LT(e, t, r) {
  return (
    (t = DT(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function a0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    t &&
      (i = i.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      r.push.apply(r, i);
  }
  return r;
}
function M(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? a0(Object(r), !0).forEach(function (i) {
          LT(e, i, r[i]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : a0(Object(r)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(r, i));
          });
  }
  return e;
}
var dp = (e) => {
    var t;
    return (
      e.msg ||
      e.message ||
      e.error_description ||
      (typeof e.error == "string"
        ? e.error
        : (t = e.error) === null || t === void 0
          ? void 0
          : t.message) ||
      JSON.stringify(e)
    );
  },
  FT = async (e, t, r) => {
    e instanceof (await RT()) && !r?.noResolveJson
      ? e
          .json()
          .then((i) => {
            let n = e.status || 500,
              o = i?.statusCode || n + "";
            t(new NT(dp(i), n, o));
          })
          .catch((i) => {
            t(new pp(dp(i), i));
          })
      : t(new pp(dp(e), e));
  },
  MT = (e, t, r, i) => {
    let n = {method: e, headers: t?.headers || {}};
    return e === "GET" || !i
      ? n
      : (CT(i)
          ? ((n.headers = M({"Content-Type": "application/json"}, t?.headers)),
            (n.body = JSON.stringify(i)))
          : (n.body = i),
        t?.duplex && (n.duplex = t.duplex),
        M(M({}, n), r));
  };
async function Hi(e, t, r, i, n, o) {
  return new Promise((s, a) => {
    e(r, MT(t, i, n, o))
      .then((c) => {
        if (!c.ok) throw c;
        return i?.noResolveJson ? c : c.json();
      })
      .then((c) => s(c))
      .catch((c) => FT(c, a, i));
  });
}
async function Gi(e, t, r, i) {
  return Hi(e, "GET", t, r, i);
}
async function yt(e, t, r, i, n) {
  return Hi(e, "POST", t, i, n, r);
}
async function gp(e, t, r, i, n) {
  return Hi(e, "PUT", t, i, n, r);
}
async function BT(e, t, r, i) {
  return Hi(e, "HEAD", t, M(M({}, r), {}, {noResolveJson: !0}), i);
}
async function _p(e, t, r, i, n) {
  return Hi(e, "DELETE", t, i, n, r);
}
var ZT = class {
    constructor(e, t) {
      (this.downloadFn = e), (this.shouldThrowOnError = t);
    }
    then(e, t) {
      return this.execute().then(e, t);
    }
    async execute() {
      var e = this;
      try {
        return {data: (await e.downloadFn()).body, error: null};
      } catch (t) {
        if (e.shouldThrowOnError) throw t;
        if (ce(t)) return {data: null, error: t};
        throw t;
      }
    }
  },
  l0;
l0 = Symbol.toStringTag;
var qT = class {
    constructor(e, t) {
      (this.downloadFn = e),
        (this.shouldThrowOnError = t),
        (this[l0] = "BlobDownloadBuilder"),
        (this.promise = null);
    }
    asStream() {
      return new ZT(this.downloadFn, this.shouldThrowOnError);
    }
    then(e, t) {
      return this.getPromise().then(e, t);
    }
    catch(e) {
      return this.getPromise().catch(e);
    }
    finally(e) {
      return this.getPromise().finally(e);
    }
    getPromise() {
      return this.promise || (this.promise = this.execute()), this.promise;
    }
    async execute() {
      var e = this;
      try {
        return {data: await (await e.downloadFn()).blob(), error: null};
      } catch (t) {
        if (e.shouldThrowOnError) throw t;
        if (ce(t)) return {data: null, error: t};
        throw t;
      }
    }
  },
  VT = {limit: 100, offset: 0, sortBy: {column: "name", order: "asc"}},
  c0 = {cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: !1},
  WT = class {
    constructor(e, t = {}, r, i) {
      (this.shouldThrowOnError = !1),
        (this.url = e),
        (this.headers = t),
        (this.bucketId = r),
        (this.fetch = vp(i));
    }
    throwOnError() {
      return (this.shouldThrowOnError = !0), this;
    }
    async uploadOrUpdate(e, t, r, i) {
      var n = this;
      try {
        let o,
          s = M(M({}, c0), i),
          a = M(M({}, n.headers), e === "POST" && {"x-upsert": String(s.upsert)}),
          c = s.metadata;
        typeof Blob < "u" && r instanceof Blob
          ? ((o = new FormData()),
            o.append("cacheControl", s.cacheControl),
            c && o.append("metadata", n.encodeMetadata(c)),
            o.append("", r))
          : typeof FormData < "u" && r instanceof FormData
            ? ((o = r),
              o.has("cacheControl") || o.append("cacheControl", s.cacheControl),
              c && !o.has("metadata") && o.append("metadata", n.encodeMetadata(c)))
            : ((o = r),
              (a["cache-control"] = `max-age=${s.cacheControl}`),
              (a["content-type"] = s.contentType),
              c && (a["x-metadata"] = n.toBase64(n.encodeMetadata(c))),
              ((typeof ReadableStream < "u" && o instanceof ReadableStream) ||
                (o &&
                  typeof o == "object" &&
                  "pipe" in o &&
                  typeof o.pipe == "function")) &&
                !s.duplex &&
                (s.duplex = "half")),
          i?.headers && (a = M(M({}, a), i.headers));
        let u = n._removeEmptyFolders(t),
          l = n._getFinalPath(u),
          h = await (e == "PUT" ? gp : yt)(
            n.fetch,
            `${n.url}/object/${l}`,
            o,
            M({headers: a}, s?.duplex ? {duplex: s.duplex} : {}),
          );
        return {data: {path: u, id: h.Id, fullPath: h.Key}, error: null};
      } catch (o) {
        if (n.shouldThrowOnError) throw o;
        if (ce(o)) return {data: null, error: o};
        throw o;
      }
    }
    async upload(e, t, r) {
      return this.uploadOrUpdate("POST", e, t, r);
    }
    async uploadToSignedUrl(e, t, r, i) {
      var n = this;
      let o = n._removeEmptyFolders(e),
        s = n._getFinalPath(o),
        a = new URL(n.url + `/object/upload/sign/${s}`);
      a.searchParams.set("token", t);
      try {
        let c,
          u = M({upsert: c0.upsert}, i),
          l = M(M({}, n.headers), {"x-upsert": String(u.upsert)});
        return (
          typeof Blob < "u" && r instanceof Blob
            ? ((c = new FormData()),
              c.append("cacheControl", u.cacheControl),
              c.append("", r))
            : typeof FormData < "u" && r instanceof FormData
              ? ((c = r), c.append("cacheControl", u.cacheControl))
              : ((c = r),
                (l["cache-control"] = `max-age=${u.cacheControl}`),
                (l["content-type"] = u.contentType)),
          {
            data: {
              path: o,
              fullPath: (await gp(n.fetch, a.toString(), c, {headers: l})).Key,
            },
            error: null,
          }
        );
      } catch (c) {
        if (n.shouldThrowOnError) throw c;
        if (ce(c)) return {data: null, error: c};
        throw c;
      }
    }
    async createSignedUploadUrl(e, t) {
      var r = this;
      try {
        let i = r._getFinalPath(e),
          n = M({}, r.headers);
        t?.upsert && (n["x-upsert"] = "true");
        let o = await yt(r.fetch, `${r.url}/object/upload/sign/${i}`, {}, {headers: n}),
          s = new URL(r.url + o.url),
          a = s.searchParams.get("token");
        if (!a) throw new za("No token returned by API");
        return {data: {signedUrl: s.toString(), path: e, token: a}, error: null};
      } catch (i) {
        if (r.shouldThrowOnError) throw i;
        if (ce(i)) return {data: null, error: i};
        throw i;
      }
    }
    async update(e, t, r) {
      return this.uploadOrUpdate("PUT", e, t, r);
    }
    async move(e, t, r) {
      var i = this;
      try {
        return {
          data: await yt(
            i.fetch,
            `${i.url}/object/move`,
            {
              bucketId: i.bucketId,
              sourceKey: e,
              destinationKey: t,
              destinationBucket: r?.destinationBucket,
            },
            {headers: i.headers},
          ),
          error: null,
        };
      } catch (n) {
        if (i.shouldThrowOnError) throw n;
        if (ce(n)) return {data: null, error: n};
        throw n;
      }
    }
    async copy(e, t, r) {
      var i = this;
      try {
        return {
          data: {
            path: (
              await yt(
                i.fetch,
                `${i.url}/object/copy`,
                {
                  bucketId: i.bucketId,
                  sourceKey: e,
                  destinationKey: t,
                  destinationBucket: r?.destinationBucket,
                },
                {headers: i.headers},
              )
            ).Key,
          },
          error: null,
        };
      } catch (n) {
        if (i.shouldThrowOnError) throw n;
        if (ce(n)) return {data: null, error: n};
        throw n;
      }
    }
    async createSignedUrl(e, t, r) {
      var i = this;
      try {
        let n = i._getFinalPath(e),
          o = await yt(
            i.fetch,
            `${i.url}/object/sign/${n}`,
            M({expiresIn: t}, r?.transform ? {transform: r.transform} : {}),
            {headers: i.headers},
          ),
          s = r?.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return (
          (o = {signedUrl: encodeURI(`${i.url}${o.signedURL}${s}`)}),
          {data: o, error: null}
        );
      } catch (n) {
        if (i.shouldThrowOnError) throw n;
        if (ce(n)) return {data: null, error: n};
        throw n;
      }
    }
    async createSignedUrls(e, t, r) {
      var i = this;
      try {
        let n = await yt(
            i.fetch,
            `${i.url}/object/sign/${i.bucketId}`,
            {expiresIn: t, paths: e},
            {headers: i.headers},
          ),
          o = r?.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return {
          data: n.map((s) =>
            M(
              M({}, s),
              {},
              {signedUrl: s.signedURL ? encodeURI(`${i.url}${s.signedURL}${o}`) : null},
            ),
          ),
          error: null,
        };
      } catch (n) {
        if (i.shouldThrowOnError) throw n;
        if (ce(n)) return {data: null, error: n};
        throw n;
      }
    }
    download(e, t) {
      let r = typeof t?.transform < "u" ? "render/image/authenticated" : "object",
        i = this.transformOptsToQueryString(t?.transform || {}),
        n = i ? `?${i}` : "",
        o = this._getFinalPath(e),
        s = () =>
          Gi(this.fetch, `${this.url}/${r}/${o}${n}`, {
            headers: this.headers,
            noResolveJson: !0,
          });
      return new qT(s, this.shouldThrowOnError);
    }
    async info(e) {
      var t = this;
      let r = t._getFinalPath(e);
      try {
        return {
          data: mp(
            await Gi(t.fetch, `${t.url}/object/info/${r}`, {headers: t.headers}),
          ),
          error: null,
        };
      } catch (i) {
        if (t.shouldThrowOnError) throw i;
        if (ce(i)) return {data: null, error: i};
        throw i;
      }
    }
    async exists(e) {
      var t = this;
      let r = t._getFinalPath(e);
      try {
        return (
          await BT(t.fetch, `${t.url}/object/${r}`, {headers: t.headers}),
          {data: !0, error: null}
        );
      } catch (i) {
        if (t.shouldThrowOnError) throw i;
        if (ce(i) && i instanceof pp) {
          let n = i.originalError;
          if ([400, 404].includes(n?.status)) return {data: !1, error: i};
        }
        throw i;
      }
    }
    getPublicUrl(e, t) {
      let r = this._getFinalPath(e),
        i = [],
        n = t?.download ? `download=${t.download === !0 ? "" : t.download}` : "";
      n !== "" && i.push(n);
      let o = typeof t?.transform < "u" ? "render/image" : "object",
        s = this.transformOptsToQueryString(t?.transform || {});
      s !== "" && i.push(s);
      let a = i.join("&");
      return (
        a !== "" && (a = `?${a}`),
        {data: {publicUrl: encodeURI(`${this.url}/${o}/public/${r}${a}`)}}
      );
    }
    async remove(e) {
      var t = this;
      try {
        return {
          data: await _p(
            t.fetch,
            `${t.url}/object/${t.bucketId}`,
            {prefixes: e},
            {headers: t.headers},
          ),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    async list(e, t, r) {
      var i = this;
      try {
        let n = M(M(M({}, VT), t), {}, {prefix: e || ""});
        return {
          data: await yt(
            i.fetch,
            `${i.url}/object/list/${i.bucketId}`,
            n,
            {headers: i.headers},
            r,
          ),
          error: null,
        };
      } catch (n) {
        if (i.shouldThrowOnError) throw n;
        if (ce(n)) return {data: null, error: n};
        throw n;
      }
    }
    async listV2(e, t) {
      var r = this;
      try {
        let i = M({}, e);
        return {
          data: await yt(
            r.fetch,
            `${r.url}/object/list-v2/${r.bucketId}`,
            i,
            {headers: r.headers},
            t,
          ),
          error: null,
        };
      } catch (i) {
        if (r.shouldThrowOnError) throw i;
        if (ce(i)) return {data: null, error: i};
        throw i;
      }
    }
    encodeMetadata(e) {
      return JSON.stringify(e);
    }
    toBase64(e) {
      return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : btoa(e);
    }
    _getFinalPath(e) {
      return `${this.bucketId}/${e.replace(/^\/+/, "")}`;
    }
    _removeEmptyFolders(e) {
      return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
    }
    transformOptsToQueryString(e) {
      let t = [];
      return (
        e.width && t.push(`width=${e.width}`),
        e.height && t.push(`height=${e.height}`),
        e.resize && t.push(`resize=${e.resize}`),
        e.format && t.push(`format=${e.format}`),
        e.quality && t.push(`quality=${e.quality}`),
        t.join("&")
      );
    }
  },
  h0 = "2.88.0",
  d0 = {"X-Client-Info": `storage-js/${h0}`},
  JT = class {
    constructor(e, t = {}, r, i) {
      this.shouldThrowOnError = !1;
      let n = new URL(e);
      i?.useNewHostname &&
        /supabase\.(co|in|red)$/.test(n.hostname) &&
        !n.hostname.includes("storage.supabase.") &&
        (n.hostname = n.hostname.replace("supabase.", "storage.supabase.")),
        (this.url = n.href.replace(/\/$/, "")),
        (this.headers = M(M({}, d0), t)),
        (this.fetch = vp(r));
    }
    throwOnError() {
      return (this.shouldThrowOnError = !0), this;
    }
    async listBuckets(e) {
      var t = this;
      try {
        let r = t.listBucketOptionsToQueryString(e);
        return {
          data: await Gi(t.fetch, `${t.url}/bucket${r}`, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    async getBucket(e) {
      var t = this;
      try {
        return {
          data: await Gi(t.fetch, `${t.url}/bucket/${e}`, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    async createBucket(e, t = {public: !1}) {
      var r = this;
      try {
        return {
          data: await yt(
            r.fetch,
            `${r.url}/bucket`,
            {
              id: e,
              name: e,
              type: t.type,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            {headers: r.headers},
          ),
          error: null,
        };
      } catch (i) {
        if (r.shouldThrowOnError) throw i;
        if (ce(i)) return {data: null, error: i};
        throw i;
      }
    }
    async updateBucket(e, t) {
      var r = this;
      try {
        return {
          data: await gp(
            r.fetch,
            `${r.url}/bucket/${e}`,
            {
              id: e,
              name: e,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            {headers: r.headers},
          ),
          error: null,
        };
      } catch (i) {
        if (r.shouldThrowOnError) throw i;
        if (ce(i)) return {data: null, error: i};
        throw i;
      }
    }
    async emptyBucket(e) {
      var t = this;
      try {
        return {
          data: await yt(
            t.fetch,
            `${t.url}/bucket/${e}/empty`,
            {},
            {headers: t.headers},
          ),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    async deleteBucket(e) {
      var t = this;
      try {
        return {
          data: await _p(t.fetch, `${t.url}/bucket/${e}`, {}, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    listBucketOptionsToQueryString(e) {
      let t = {};
      return (
        e &&
          ("limit" in e && (t.limit = String(e.limit)),
          "offset" in e && (t.offset = String(e.offset)),
          e.search && (t.search = e.search),
          e.sortColumn && (t.sortColumn = e.sortColumn),
          e.sortOrder && (t.sortOrder = e.sortOrder)),
        Object.keys(t).length > 0 ? "?" + new URLSearchParams(t).toString() : ""
      );
    }
  },
  KT = class {
    constructor(e, t = {}, r) {
      (this.shouldThrowOnError = !1),
        (this.url = e.replace(/\/$/, "")),
        (this.headers = M(M({}, d0), t)),
        (this.fetch = vp(r));
    }
    throwOnError() {
      return (this.shouldThrowOnError = !0), this;
    }
    async createBucket(e) {
      var t = this;
      try {
        return {
          data: await yt(t.fetch, `${t.url}/bucket`, {name: e}, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    async listBuckets(e) {
      var t = this;
      try {
        let r = new URLSearchParams();
        e?.limit !== void 0 && r.set("limit", e.limit.toString()),
          e?.offset !== void 0 && r.set("offset", e.offset.toString()),
          e?.sortColumn && r.set("sortColumn", e.sortColumn),
          e?.sortOrder && r.set("sortOrder", e.sortOrder),
          e?.search && r.set("search", e.search);
        let i = r.toString(),
          n = i ? `${t.url}/bucket?${i}` : `${t.url}/bucket`;
        return {data: await Gi(t.fetch, n, {headers: t.headers}), error: null};
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    async deleteBucket(e) {
      var t = this;
      try {
        return {
          data: await _p(t.fetch, `${t.url}/bucket/${e}`, {}, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (ce(r)) return {data: null, error: r};
        throw r;
      }
    }
    from(e) {
      var t = this;
      if (!zT(e))
        throw new za(
          "Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.",
        );
      let r = new s0({
          baseUrl: this.url,
          catalogName: e,
          auth: {type: "custom", getHeaders: async () => t.headers},
          fetch: this.fetch,
        }),
        i = this.shouldThrowOnError;
      return new Proxy(r, {
        get(n, o) {
          let s = n[o];
          return typeof s != "function"
            ? s
            : async (...a) => {
                try {
                  return {data: await s.apply(n, a), error: null};
                } catch (c) {
                  if (i) throw c;
                  return {data: null, error: c};
                }
              };
        },
      });
    }
  },
  yp = {"X-Client-Info": `storage-js/${h0}`, "Content-Type": "application/json"},
  f0 = class extends Error {
    constructor(e) {
      super(e),
        (this.__isStorageVectorsError = !0),
        (this.name = "StorageVectorsError");
    }
  };
function Ye(e) {
  return typeof e == "object" && e !== null && "__isStorageVectorsError" in e;
}
var fp = class extends f0 {
    constructor(e, t, r) {
      super(e),
        (this.name = "StorageVectorsApiError"),
        (this.status = t),
        (this.statusCode = r);
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        statusCode: this.statusCode,
      };
    }
  },
  GT = class extends f0 {
    constructor(e, t) {
      super(e), (this.name = "StorageVectorsUnknownError"), (this.originalError = t);
    }
  };
var bp = (e) => (e ? (...t) => e(...t) : (...t) => fetch(...t));
var HT = (e) => {
  if (typeof e != "object" || e === null) return !1;
  let t = Object.getPrototypeOf(e);
  return (
    (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
};
var u0 = (e) =>
    e.msg || e.message || e.error_description || e.error || JSON.stringify(e),
  YT = async (e, t, r) => {
    if (
      e &&
      typeof e == "object" &&
      "status" in e &&
      "ok" in e &&
      typeof e.status == "number" &&
      !r?.noResolveJson
    ) {
      let i = e.status || 500,
        n = e;
      if (typeof n.json == "function")
        n.json()
          .then((o) => {
            let s = o?.statusCode || o?.code || i + "";
            t(new fp(u0(o), i, s));
          })
          .catch(() => {
            let o = i + "";
            t(new fp(n.statusText || `HTTP ${i} error`, i, o));
          });
      else {
        let o = i + "";
        t(new fp(n.statusText || `HTTP ${i} error`, i, o));
      }
    } else t(new GT(u0(e), e));
  },
  XT = (e, t, r, i) => {
    let n = {method: e, headers: t?.headers || {}};
    return e === "GET" || !i
      ? n
      : (HT(i)
          ? ((n.headers = M({"Content-Type": "application/json"}, t?.headers)),
            (n.body = JSON.stringify(i)))
          : (n.body = i),
        M(M({}, n), r));
  };
async function QT(e, t, r, i, n, o) {
  return new Promise((s, a) => {
    e(r, XT(t, i, n, o))
      .then((c) => {
        if (!c.ok) throw c;
        if (i?.noResolveJson) return c;
        let u = c.headers.get("content-type");
        return !u || !u.includes("application/json") ? {} : c.json();
      })
      .then((c) => s(c))
      .catch((c) => YT(c, a, i));
  });
}
async function Xe(e, t, r, i, n) {
  return QT(e, "POST", t, i, n, r);
}
var ej = class {
    constructor(e, t = {}, r) {
      (this.shouldThrowOnError = !1),
        (this.url = e.replace(/\/$/, "")),
        (this.headers = M(M({}, yp), t)),
        (this.fetch = bp(r));
    }
    throwOnError() {
      return (this.shouldThrowOnError = !0), this;
    }
    async createIndex(e) {
      var t = this;
      try {
        return {
          data:
            (await Xe(t.fetch, `${t.url}/CreateIndex`, e, {headers: t.headers})) || {},
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async getIndex(e, t) {
      var r = this;
      try {
        return {
          data: await Xe(
            r.fetch,
            `${r.url}/GetIndex`,
            {vectorBucketName: e, indexName: t},
            {headers: r.headers},
          ),
          error: null,
        };
      } catch (i) {
        if (r.shouldThrowOnError) throw i;
        if (Ye(i)) return {data: null, error: i};
        throw i;
      }
    }
    async listIndexes(e) {
      var t = this;
      try {
        return {
          data: await Xe(t.fetch, `${t.url}/ListIndexes`, e, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async deleteIndex(e, t) {
      var r = this;
      try {
        return {
          data:
            (await Xe(
              r.fetch,
              `${r.url}/DeleteIndex`,
              {vectorBucketName: e, indexName: t},
              {headers: r.headers},
            )) || {},
          error: null,
        };
      } catch (i) {
        if (r.shouldThrowOnError) throw i;
        if (Ye(i)) return {data: null, error: i};
        throw i;
      }
    }
  },
  tj = class {
    constructor(e, t = {}, r) {
      (this.shouldThrowOnError = !1),
        (this.url = e.replace(/\/$/, "")),
        (this.headers = M(M({}, yp), t)),
        (this.fetch = bp(r));
    }
    throwOnError() {
      return (this.shouldThrowOnError = !0), this;
    }
    async putVectors(e) {
      var t = this;
      try {
        if (e.vectors.length < 1 || e.vectors.length > 500)
          throw new Error("Vector batch size must be between 1 and 500 items");
        return {
          data:
            (await Xe(t.fetch, `${t.url}/PutVectors`, e, {headers: t.headers})) || {},
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async getVectors(e) {
      var t = this;
      try {
        return {
          data: await Xe(t.fetch, `${t.url}/GetVectors`, e, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async listVectors(e) {
      var t = this;
      try {
        if (e.segmentCount !== void 0) {
          if (e.segmentCount < 1 || e.segmentCount > 16)
            throw new Error("segmentCount must be between 1 and 16");
          if (
            e.segmentIndex !== void 0 &&
            (e.segmentIndex < 0 || e.segmentIndex >= e.segmentCount)
          )
            throw new Error(`segmentIndex must be between 0 and ${e.segmentCount - 1}`);
        }
        return {
          data: await Xe(t.fetch, `${t.url}/ListVectors`, e, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async queryVectors(e) {
      var t = this;
      try {
        return {
          data: await Xe(t.fetch, `${t.url}/QueryVectors`, e, {headers: t.headers}),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async deleteVectors(e) {
      var t = this;
      try {
        if (e.keys.length < 1 || e.keys.length > 500)
          throw new Error("Keys batch size must be between 1 and 500 items");
        return {
          data:
            (await Xe(t.fetch, `${t.url}/DeleteVectors`, e, {headers: t.headers})) ||
            {},
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
  },
  rj = class {
    constructor(e, t = {}, r) {
      (this.shouldThrowOnError = !1),
        (this.url = e.replace(/\/$/, "")),
        (this.headers = M(M({}, yp), t)),
        (this.fetch = bp(r));
    }
    throwOnError() {
      return (this.shouldThrowOnError = !0), this;
    }
    async createBucket(e) {
      var t = this;
      try {
        return {
          data:
            (await Xe(
              t.fetch,
              `${t.url}/CreateVectorBucket`,
              {vectorBucketName: e},
              {headers: t.headers},
            )) || {},
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async getBucket(e) {
      var t = this;
      try {
        return {
          data: await Xe(
            t.fetch,
            `${t.url}/GetVectorBucket`,
            {vectorBucketName: e},
            {headers: t.headers},
          ),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async listBuckets(e = {}) {
      var t = this;
      try {
        return {
          data: await Xe(t.fetch, `${t.url}/ListVectorBuckets`, e, {
            headers: t.headers,
          }),
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
    async deleteBucket(e) {
      var t = this;
      try {
        return {
          data:
            (await Xe(
              t.fetch,
              `${t.url}/DeleteVectorBucket`,
              {vectorBucketName: e},
              {headers: t.headers},
            )) || {},
          error: null,
        };
      } catch (r) {
        if (t.shouldThrowOnError) throw r;
        if (Ye(r)) return {data: null, error: r};
        throw r;
      }
    }
  },
  nj = class extends rj {
    constructor(e, t = {}) {
      super(e, t.headers || {}, t.fetch);
    }
    from(e) {
      return new ij(this.url, this.headers, e, this.fetch);
    }
    async createBucket(e) {
      var t = () => super.createBucket,
        r = this;
      return t().call(r, e);
    }
    async getBucket(e) {
      var t = () => super.getBucket,
        r = this;
      return t().call(r, e);
    }
    async listBuckets(e = {}) {
      var t = () => super.listBuckets,
        r = this;
      return t().call(r, e);
    }
    async deleteBucket(e) {
      var t = () => super.deleteBucket,
        r = this;
      return t().call(r, e);
    }
  },
  ij = class extends ej {
    constructor(e, t, r, i) {
      super(e, t, i), (this.vectorBucketName = r);
    }
    async createIndex(e) {
      var t = () => super.createIndex,
        r = this;
      return t().call(r, M(M({}, e), {}, {vectorBucketName: r.vectorBucketName}));
    }
    async listIndexes(e = {}) {
      var t = () => super.listIndexes,
        r = this;
      return t().call(r, M(M({}, e), {}, {vectorBucketName: r.vectorBucketName}));
    }
    async getIndex(e) {
      var t = () => super.getIndex,
        r = this;
      return t().call(r, r.vectorBucketName, e);
    }
    async deleteIndex(e) {
      var t = () => super.deleteIndex,
        r = this;
      return t().call(r, r.vectorBucketName, e);
    }
    index(e) {
      return new oj(this.url, this.headers, this.vectorBucketName, e, this.fetch);
    }
  },
  oj = class extends tj {
    constructor(e, t, r, i, n) {
      super(e, t, n), (this.vectorBucketName = r), (this.indexName = i);
    }
    async putVectors(e) {
      var t = () => super.putVectors,
        r = this;
      return t().call(
        r,
        M(M({}, e), {}, {vectorBucketName: r.vectorBucketName, indexName: r.indexName}),
      );
    }
    async getVectors(e) {
      var t = () => super.getVectors,
        r = this;
      return t().call(
        r,
        M(M({}, e), {}, {vectorBucketName: r.vectorBucketName, indexName: r.indexName}),
      );
    }
    async listVectors(e = {}) {
      var t = () => super.listVectors,
        r = this;
      return t().call(
        r,
        M(M({}, e), {}, {vectorBucketName: r.vectorBucketName, indexName: r.indexName}),
      );
    }
    async queryVectors(e) {
      var t = () => super.queryVectors,
        r = this;
      return t().call(
        r,
        M(M({}, e), {}, {vectorBucketName: r.vectorBucketName, indexName: r.indexName}),
      );
    }
    async deleteVectors(e) {
      var t = () => super.deleteVectors,
        r = this;
      return t().call(
        r,
        M(M({}, e), {}, {vectorBucketName: r.vectorBucketName, indexName: r.indexName}),
      );
    }
  },
  p0 = class extends JT {
    constructor(e, t = {}, r, i) {
      super(e, t, r, i);
    }
    from(e) {
      return new WT(this.url, this.headers, e, this.fetch);
    }
    get vectors() {
      return new nj(this.url + "/vector", {headers: this.headers, fetch: this.fetch});
    }
    get analytics() {
      return new KT(this.url + "/iceberg", this.headers, this.fetch);
    }
  };
var q0 = We(Qp(), 1);
z(C, We(hp(), 1));
z(C, We(Qp(), 1));
var RP = "2.88.0",
  eo = "";
typeof Deno < "u"
  ? (eo = "deno")
  : typeof document < "u"
    ? (eo = "web")
    : typeof navigator < "u" && navigator.product === "ReactNative"
      ? (eo = "react-native")
      : (eo = "node");
var CP = {"X-Client-Info": `supabase-js-${eo}/${RP}`},
  zP = {headers: CP},
  UP = {schema: "public"},
  DP = {
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    flowType: "implicit",
  },
  LP = {};
function to(e) {
  "@babel/helpers - typeof";
  return (
    (to =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    to(e)
  );
}
function FP(e, t) {
  if (to(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var i = r.call(e, t || "default");
    if (to(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function MP(e) {
  var t = FP(e, "string");
  return to(t) == "symbol" ? t : t + "";
}
function BP(e, t, r) {
  return (
    (t = MP(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function B0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    t &&
      (i = i.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      r.push.apply(r, i);
  }
  return r;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? B0(Object(r), !0).forEach(function (i) {
          BP(e, i, r[i]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : B0(Object(r)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(r, i));
          });
  }
  return e;
}
var ZP = (e) => (e ? (...t) => e(...t) : (...t) => fetch(...t)),
  qP = () => Headers,
  VP = (e, t, r) => {
    let i = ZP(r),
      n = qP();
    return async (o, s) => {
      var a;
      let c = (a = await t()) !== null && a !== void 0 ? a : e,
        u = new n(s?.headers);
      return (
        u.has("apikey") || u.set("apikey", e),
        u.has("Authorization") || u.set("Authorization", `Bearer ${c}`),
        i(o, pe(pe({}, s), {}, {headers: u}))
      );
    };
  };
function WP(e) {
  return e.endsWith("/") ? e : e + "/";
}
function JP(e, t) {
  var r, i;
  let {db: n, auth: o, realtime: s, global: a} = e,
    {db: c, auth: u, realtime: l, global: h} = t,
    f = {
      db: pe(pe({}, c), n),
      auth: pe(pe({}, u), o),
      realtime: pe(pe({}, l), s),
      storage: {},
      global: pe(
        pe(pe({}, h), a),
        {},
        {
          headers: pe(
            pe({}, (r = h?.headers) !== null && r !== void 0 ? r : {}),
            (i = a?.headers) !== null && i !== void 0 ? i : {},
          ),
        },
      ),
      accessToken: async () => "",
    };
  return e.accessToken ? (f.accessToken = e.accessToken) : delete f.accessToken, f;
}
function KP(e) {
  let t = e?.trim();
  if (!t) throw new Error("supabaseUrl is required.");
  if (!t.match(/^https?:\/\//i))
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(WP(t));
  } catch {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
var GP = class extends q0.AuthClient {
    constructor(e) {
      super(e);
    }
  },
  V0 = class {
    constructor(e, t, r) {
      var i, n;
      (this.supabaseUrl = e), (this.supabaseKey = t);
      let o = KP(e);
      if (!t) throw new Error("supabaseKey is required.");
      (this.realtimeUrl = new URL("realtime/v1", o)),
        (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws")),
        (this.authUrl = new URL("auth/v1", o)),
        (this.storageUrl = new URL("storage/v1", o)),
        (this.functionsUrl = new URL("functions/v1", o));
      let s = `sb-${o.hostname.split(".")[0]}-auth-token`,
        a = {
          db: UP,
          realtime: LP,
          auth: pe(pe({}, DP), {}, {storageKey: s}),
          global: zP,
        },
        c = JP(r ?? {}, a);
      if (
        ((this.storageKey = (i = c.auth.storageKey) !== null && i !== void 0 ? i : ""),
        (this.headers = (n = c.global.headers) !== null && n !== void 0 ? n : {}),
        c.accessToken)
      )
        (this.accessToken = c.accessToken),
          (this.auth = new Proxy(
            {},
            {
              get: (l, h) => {
                throw new Error(
                  `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`,
                );
              },
            },
          ));
      else {
        var u;
        this.auth = this._initSupabaseAuthClient(
          (u = c.auth) !== null && u !== void 0 ? u : {},
          this.headers,
          c.global.fetch,
        );
      }
      (this.fetch = VP(t, this._getAccessToken.bind(this), c.global.fetch)),
        (this.realtime = this._initRealtimeClient(
          pe(
            {headers: this.headers, accessToken: this._getAccessToken.bind(this)},
            c.realtime,
          ),
        )),
        this.accessToken &&
          this.accessToken()
            .then((l) => this.realtime.setAuth(l))
            .catch((l) =>
              console.warn("Failed to set initial Realtime auth token:", l),
            ),
        (this.rest = new qw(new URL("rest/v1", o).href, {
          headers: this.headers,
          schema: c.db.schema,
          fetch: this.fetch,
        })),
        (this.storage = new p0(
          this.storageUrl.href,
          this.headers,
          this.fetch,
          r?.storage,
        )),
        c.accessToken || this._listenForAuthEvents();
    }
    get functions() {
      return new ut.FunctionsClient(this.functionsUrl.href, {
        headers: this.headers,
        customFetch: this.fetch,
      });
    }
    from(e) {
      return this.rest.from(e);
    }
    schema(e) {
      return this.rest.schema(e);
    }
    rpc(e, t = {}, r = {head: !1, get: !1, count: void 0}) {
      return this.rest.rpc(e, t, r);
    }
    channel(e, t = {config: {}}) {
      return this.realtime.channel(e, t);
    }
    getChannels() {
      return this.realtime.getChannels();
    }
    removeChannel(e) {
      return this.realtime.removeChannel(e);
    }
    removeAllChannels() {
      return this.realtime.removeAllChannels();
    }
    async _getAccessToken() {
      var e = this,
        t,
        r;
      if (e.accessToken) return await e.accessToken();
      let {data: i} = await e.auth.getSession();
      return (t =
        (r = i.session) === null || r === void 0 ? void 0 : r.access_token) !== null &&
        t !== void 0
        ? t
        : e.supabaseKey;
    }
    _initSupabaseAuthClient(
      {
        autoRefreshToken: e,
        persistSession: t,
        detectSessionInUrl: r,
        storage: i,
        userStorage: n,
        storageKey: o,
        flowType: s,
        lock: a,
        debug: c,
        throwOnError: u,
      },
      l,
      h,
    ) {
      let f = {
        Authorization: `Bearer ${this.supabaseKey}`,
        apikey: `${this.supabaseKey}`,
      };
      return new GP({
        url: this.authUrl.href,
        headers: pe(pe({}, f), l),
        storageKey: o,
        autoRefreshToken: e,
        persistSession: t,
        detectSessionInUrl: r,
        storage: i,
        userStorage: n,
        flowType: s,
        lock: a,
        debug: c,
        throwOnError: u,
        fetch: h,
        hasCustomAuthorizationHeader: Object.keys(this.headers).some(
          (d) => d.toLowerCase() === "authorization",
        ),
      });
    }
    _initRealtimeClient(e) {
      return new Z0.RealtimeClient(
        this.realtimeUrl.href,
        pe(pe({}, e), {}, {params: pe(pe({}, {apikey: this.supabaseKey}), e?.params)}),
      );
    }
    _listenForAuthEvents() {
      return this.auth.onAuthStateChange((e, t) => {
        this._handleTokenChanged(e, "CLIENT", t?.access_token);
      });
    }
    _handleTokenChanged(e, t, r) {
      (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== r
        ? ((this.changedAccessToken = r), this.realtime.setAuth(r))
        : e === "SIGNED_OUT" &&
          (this.realtime.setAuth(),
          t == "STORAGE" && this.auth.signOut(),
          (this.changedAccessToken = void 0));
    }
  },
  em = (e, t, r) => new V0(e, t, r);
function HP() {
  if (typeof window < "u" || typeof process > "u") return !1;
  let e = process.version;
  if (e == null) return !1;
  let t = e.match(/^v(\d+)\./);
  return t ? parseInt(t[1], 10) <= 18 : !1;
}
HP() &&
  console.warn(
    "\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217",
  );
var W0 = We(nc());
W0.default.config();
var J0 = process.env.SUPABASE_URL,
  K0 = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!J0 || !K0) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
var tm = em(J0, K0, {auth: {autoRefreshToken: !1, persistSession: !1}});
async function G0(e) {
  let {data: t, error: r} = await tm
    .from("cards")
    .select("*")
    .eq("user_id", e)
    .eq("is_suspended", !1);
  if (r) throw new Error(`Failed to fetch cards: ${r.message}`);
  return t;
}
async function H0(e) {
  let {error: t} = await tm.rpc("sync_cards", {cards_data: e});
  if (t) throw new Error(`Failed to upsert cards: ${t.message}`);
}
async function Y0(e) {
  if (e.length === 0) return;
  let {error: t} = await tm.from("cards").update({is_suspended: !0}).in("id", e);
  if (t) throw new Error(`Failed to suspend cards: ${t.message}`);
}
X0.config();
var Xa = process.env.USER_ID;
Xa ||
  (console.error("Error: USER_ID environment variable is not set."), process.exit(1));
async function YP() {
  console.log("Starting sync...");
  let e = await $o("**/*.md", {
    ignore: ["node_modules/**", ".next/**", "dist/**"],
    nodir: !0,
  });
  console.log(`Found ${e.length} markdown files.`);
  let t = [];
  for (let s of e)
    try {
      let a = await aw(s),
        c = hw(a);
      t.push(...c);
    } catch (a) {
      console.error(`Failed to process ${s}:`, a);
    }
  console.log(`Generated ${t.length} derived cards.`);
  let r = await G0(Xa);
  console.log(`Fetched ${r.length} active cards from DB.`);
  let i = [],
    n = [],
    o = new Map();
  for (let s of r) {
    let a = `${s.source_filepath}|${s.card_anchor}|${s.card_type}`;
    o.set(a, s);
  }
  for (let s of t) {
    let a = `${s.source_filepath}|${s.card_anchor}|${s.card_type}`,
      c = o.get(a);
    c
      ? ((c.front !== s.front || c.back !== s.back) &&
          i.push({...s, user_id: Xa, is_suspended: !1}),
        o.delete(a))
      : i.push({...s, user_id: Xa, is_suspended: !1});
  }
  for (let s of o.values()) n.push(s.id);
  console.log(`Sync Summary:
  - New/Updated: ${i.length}
  - Suspended: ${n.length}
  - Unchanged: ${r.length - n.length - (i.length - (t.length - r.length + n.length))} (Approx)`),
    i.length > 0 && (console.log("Upserting cards..."), await H0(i)),
    n.length > 0 && (console.log("Suspending cards..."), await Y0(n)),
    console.log("Sync complete!");
}
YP().catch((e) => {
  console.error("Fatal error:", e), process.exit(1);
});
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

js-sha256/src/sha256.js:
  (**
   * [js-sha256]{@link https://github.com/emn178/js-sha256}
   *
   * @version 0.11.1
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2025
   * @license MIT
   *)
*/
