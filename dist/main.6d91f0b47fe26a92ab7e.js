/*! For license information please see main.6d91f0b47fe26a92ab7e.js.LICENSE.txt */
(() => {
  "use strict";
  const t = "159",
    e = 1,
    i = 2,
    n = 3,
    r = 100,
    s = 0,
    a = 1,
    o = 2,
    l = 0,
    h = 1,
    c = 2,
    d = 3,
    u = 4,
    p = 5,
    m = 301,
    f = 302,
    g = 303,
    _ = 306,
    v = 1e3,
    x = 1001,
    y = 1002,
    M = 1003,
    S = 1005,
    b = 1006,
    E = 1008,
    T = 1009,
    w = 1012,
    A = 1014,
    R = 1015,
    C = 1016,
    L = 1020,
    P = 1023,
    U = 1026,
    D = 1027,
    I = 33776,
    N = 33777,
    O = 33778,
    F = 33779,
    z = 36492,
    B = 2300,
    k = 2301,
    V = 2302,
    H = 3001,
    G = "",
    W = "srgb",
    j = "srgb-linear",
    X = "display-p3",
    q = "display-p3-linear",
    Y = "linear",
    K = "srgb",
    Z = "rec709",
    J = "p3",
    Q = 7680,
    $ = "300 es",
    tt = 1035,
    et = 2e3,
    it = 2001;
  class nt {
    addEventListener(t, e) {
      void 0 === this._listeners && (this._listeners = {});
      const i = this._listeners;
      void 0 === i[t] && (i[t] = []), -1 === i[t].indexOf(e) && i[t].push(e);
    }
    hasEventListener(t, e) {
      if (void 0 === this._listeners) return !1;
      const i = this._listeners;
      return void 0 !== i[t] && -1 !== i[t].indexOf(e);
    }
    removeEventListener(t, e) {
      if (void 0 === this._listeners) return;
      const i = this._listeners[t];
      if (void 0 !== i) {
        const t = i.indexOf(e);
        -1 !== t && i.splice(t, 1);
      }
    }
    dispatchEvent(t) {
      if (void 0 === this._listeners) return;
      const e = this._listeners[t.type];
      if (void 0 !== e) {
        t.target = this;
        const i = e.slice(0);
        for (let e = 0, n = i.length; e < n; e++) i[e].call(this, t);
        t.target = null;
      }
    }
  }
  const rt = [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "0a",
      "0b",
      "0c",
      "0d",
      "0e",
      "0f",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "1a",
      "1b",
      "1c",
      "1d",
      "1e",
      "1f",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "2a",
      "2b",
      "2c",
      "2d",
      "2e",
      "2f",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "3a",
      "3b",
      "3c",
      "3d",
      "3e",
      "3f",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "4a",
      "4b",
      "4c",
      "4d",
      "4e",
      "4f",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
      "5a",
      "5b",
      "5c",
      "5d",
      "5e",
      "5f",
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "6a",
      "6b",
      "6c",
      "6d",
      "6e",
      "6f",
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "78",
      "79",
      "7a",
      "7b",
      "7c",
      "7d",
      "7e",
      "7f",
      "80",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
      "87",
      "88",
      "89",
      "8a",
      "8b",
      "8c",
      "8d",
      "8e",
      "8f",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
      "9a",
      "9b",
      "9c",
      "9d",
      "9e",
      "9f",
      "a0",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
      "aa",
      "ab",
      "ac",
      "ad",
      "ae",
      "af",
      "b0",
      "b1",
      "b2",
      "b3",
      "b4",
      "b5",
      "b6",
      "b7",
      "b8",
      "b9",
      "ba",
      "bb",
      "bc",
      "bd",
      "be",
      "bf",
      "c0",
      "c1",
      "c2",
      "c3",
      "c4",
      "c5",
      "c6",
      "c7",
      "c8",
      "c9",
      "ca",
      "cb",
      "cc",
      "cd",
      "ce",
      "cf",
      "d0",
      "d1",
      "d2",
      "d3",
      "d4",
      "d5",
      "d6",
      "d7",
      "d8",
      "d9",
      "da",
      "db",
      "dc",
      "dd",
      "de",
      "df",
      "e0",
      "e1",
      "e2",
      "e3",
      "e4",
      "e5",
      "e6",
      "e7",
      "e8",
      "e9",
      "ea",
      "eb",
      "ec",
      "ed",
      "ee",
      "ef",
      "f0",
      "f1",
      "f2",
      "f3",
      "f4",
      "f5",
      "f6",
      "f7",
      "f8",
      "f9",
      "fa",
      "fb",
      "fc",
      "fd",
      "fe",
      "ff",
    ],
    st = Math.PI / 180,
    at = 180 / Math.PI;
  function ot() {
    const t = (4294967295 * Math.random()) | 0,
      e = (4294967295 * Math.random()) | 0,
      i = (4294967295 * Math.random()) | 0,
      n = (4294967295 * Math.random()) | 0;
    return (
      rt[255 & t] +
      rt[(t >> 8) & 255] +
      rt[(t >> 16) & 255] +
      rt[(t >> 24) & 255] +
      "-" +
      rt[255 & e] +
      rt[(e >> 8) & 255] +
      "-" +
      rt[((e >> 16) & 15) | 64] +
      rt[(e >> 24) & 255] +
      "-" +
      rt[(63 & i) | 128] +
      rt[(i >> 8) & 255] +
      "-" +
      rt[(i >> 16) & 255] +
      rt[(i >> 24) & 255] +
      rt[255 & n] +
      rt[(n >> 8) & 255] +
      rt[(n >> 16) & 255] +
      rt[(n >> 24) & 255]
    ).toLowerCase();
  }
  function lt(t, e, i) {
    return Math.max(e, Math.min(i, t));
  }
  function ht(t, e, i) {
    return (1 - i) * t + i * e;
  }
  function ct(t) {
    return 0 == (t & (t - 1)) && 0 !== t;
  }
  function dt(t) {
    return Math.pow(2, Math.floor(Math.log(t) / Math.LN2));
  }
  function ut(t, e) {
    switch (e.constructor) {
      case Float32Array:
        return t;
      case Uint32Array:
        return t / 4294967295;
      case Uint16Array:
        return t / 65535;
      case Uint8Array:
        return t / 255;
      case Int32Array:
        return Math.max(t / 2147483647, -1);
      case Int16Array:
        return Math.max(t / 32767, -1);
      case Int8Array:
        return Math.max(t / 127, -1);
      default:
        throw new Error("Invalid component type.");
    }
  }
  function pt(t, e) {
    switch (e.constructor) {
      case Float32Array:
        return t;
      case Uint32Array:
        return Math.round(4294967295 * t);
      case Uint16Array:
        return Math.round(65535 * t);
      case Uint8Array:
        return Math.round(255 * t);
      case Int32Array:
        return Math.round(2147483647 * t);
      case Int16Array:
        return Math.round(32767 * t);
      case Int8Array:
        return Math.round(127 * t);
      default:
        throw new Error("Invalid component type.");
    }
  }
  class mt {
    constructor(t = 0, e = 0) {
      (mt.prototype.isVector2 = !0), (this.x = t), (this.y = e);
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return (this.x = t), (this.y = e), this;
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), this;
    }
    add(t) {
      return (this.x += t.x), (this.y += t.y), this;
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), this;
    }
    addVectors(t, e) {
      return (this.x = t.x + e.x), (this.y = t.y + e.y), this;
    }
    addScaledVector(t, e) {
      return (this.x += t.x * e), (this.y += t.y * e), this;
    }
    sub(t) {
      return (this.x -= t.x), (this.y -= t.y), this;
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), this;
    }
    subVectors(t, e) {
      return (this.x = t.x - e.x), (this.y = t.y - e.y), this;
    }
    multiply(t) {
      return (this.x *= t.x), (this.y *= t.y), this;
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), this;
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      const e = this.x,
        i = this.y,
        n = t.elements;
      return (
        (this.x = n[0] * e + n[3] * i + n[6]),
        (this.y = n[1] * e + n[4] * i + n[7]),
        this
      );
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        this
      );
    }
    clampLength(t, e) {
      const i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(
        Math.max(t, Math.min(e, i))
      );
    }
    floor() {
      return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
    }
    ceil() {
      return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
    }
    round() {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
    }
    roundToZero() {
      return (this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this;
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const i = this.dot(t) / e;
      return Math.acos(lt(i, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        i = this.y - t.y;
      return e * e + i * i;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this
      );
    }
    lerpVectors(t, e, i) {
      return (
        (this.x = t.x + (e.x - t.x) * i), (this.y = t.y + (e.y - t.y) * i), this
      );
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), t;
    }
    fromBufferAttribute(t, e) {
      return (this.x = t.getX(e)), (this.y = t.getY(e)), this;
    }
    rotateAround(t, e) {
      const i = Math.cos(e),
        n = Math.sin(e),
        r = this.x - t.x,
        s = this.y - t.y;
      return (
        (this.x = r * i - s * n + t.x), (this.y = r * n + s * i + t.y), this
      );
    }
    random() {
      return (this.x = Math.random()), (this.y = Math.random()), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y;
    }
  }
  class ft {
    constructor(t, e, i, n, r, s, a, o, l) {
      (ft.prototype.isMatrix3 = !0),
        (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        void 0 !== t && this.set(t, e, i, n, r, s, a, o, l);
    }
    set(t, e, i, n, r, s, a, o, l) {
      const h = this.elements;
      return (
        (h[0] = t),
        (h[1] = n),
        (h[2] = a),
        (h[3] = e),
        (h[4] = r),
        (h[5] = o),
        (h[6] = i),
        (h[7] = s),
        (h[8] = l),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(t) {
      const e = this.elements,
        i = t.elements;
      return (
        (e[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[3]),
        (e[4] = i[4]),
        (e[5] = i[5]),
        (e[6] = i[6]),
        (e[7] = i[7]),
        (e[8] = i[8]),
        this
      );
    }
    extractBasis(t, e, i) {
      return (
        t.setFromMatrix3Column(this, 0),
        e.setFromMatrix3Column(this, 1),
        i.setFromMatrix3Column(this, 2),
        this
      );
    }
    setFromMatrix4(t) {
      const e = t.elements;
      return (
        this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const i = t.elements,
        n = e.elements,
        r = this.elements,
        s = i[0],
        a = i[3],
        o = i[6],
        l = i[1],
        h = i[4],
        c = i[7],
        d = i[2],
        u = i[5],
        p = i[8],
        m = n[0],
        f = n[3],
        g = n[6],
        _ = n[1],
        v = n[4],
        x = n[7],
        y = n[2],
        M = n[5],
        S = n[8];
      return (
        (r[0] = s * m + a * _ + o * y),
        (r[3] = s * f + a * v + o * M),
        (r[6] = s * g + a * x + o * S),
        (r[1] = l * m + h * _ + c * y),
        (r[4] = l * f + h * v + c * M),
        (r[7] = l * g + h * x + c * S),
        (r[2] = d * m + u * _ + p * y),
        (r[5] = d * f + u * v + p * M),
        (r[8] = d * g + u * x + p * S),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[3] *= t),
        (e[6] *= t),
        (e[1] *= t),
        (e[4] *= t),
        (e[7] *= t),
        (e[2] *= t),
        (e[5] *= t),
        (e[8] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        i = t[1],
        n = t[2],
        r = t[3],
        s = t[4],
        a = t[5],
        o = t[6],
        l = t[7],
        h = t[8];
      return (
        e * s * h - e * a * l - i * r * h + i * a * o + n * r * l - n * s * o
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        i = t[1],
        n = t[2],
        r = t[3],
        s = t[4],
        a = t[5],
        o = t[6],
        l = t[7],
        h = t[8],
        c = h * s - a * l,
        d = a * o - h * r,
        u = l * r - s * o,
        p = e * c + i * d + n * u;
      if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const m = 1 / p;
      return (
        (t[0] = c * m),
        (t[1] = (n * l - h * i) * m),
        (t[2] = (a * i - n * s) * m),
        (t[3] = d * m),
        (t[4] = (h * e - n * o) * m),
        (t[5] = (n * r - a * e) * m),
        (t[6] = u * m),
        (t[7] = (i * o - l * e) * m),
        (t[8] = (s * e - i * r) * m),
        this
      );
    }
    transpose() {
      let t;
      const e = this.elements;
      return (
        (t = e[1]),
        (e[1] = e[3]),
        (e[3] = t),
        (t = e[2]),
        (e[2] = e[6]),
        (e[6] = t),
        (t = e[5]),
        (e[5] = e[7]),
        (e[7] = t),
        this
      );
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }
    transposeIntoArray(t) {
      const e = this.elements;
      return (
        (t[0] = e[0]),
        (t[1] = e[3]),
        (t[2] = e[6]),
        (t[3] = e[1]),
        (t[4] = e[4]),
        (t[5] = e[7]),
        (t[6] = e[2]),
        (t[7] = e[5]),
        (t[8] = e[8]),
        this
      );
    }
    setUvTransform(t, e, i, n, r, s, a) {
      const o = Math.cos(r),
        l = Math.sin(r);
      return (
        this.set(
          i * o,
          i * l,
          -i * (o * s + l * a) + s + t,
          -n * l,
          n * o,
          -n * (-l * s + o * a) + a + e,
          0,
          0,
          1
        ),
        this
      );
    }
    scale(t, e) {
      return this.premultiply(gt.makeScale(t, e)), this;
    }
    rotate(t) {
      return this.premultiply(gt.makeRotation(-t)), this;
    }
    translate(t, e) {
      return this.premultiply(gt.makeTranslation(t, e)), this;
    }
    makeTranslation(t, e) {
      return (
        t.isVector2
          ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1)
          : this.set(1, 0, t, 0, 1, e, 0, 0, 1),
        this
      );
    }
    makeRotation(t) {
      const e = Math.cos(t),
        i = Math.sin(t);
      return this.set(e, -i, 0, i, e, 0, 0, 0, 1), this;
    }
    makeScale(t, e) {
      return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
    }
    equals(t) {
      const e = this.elements,
        i = t.elements;
      for (let t = 0; t < 9; t++) if (e[t] !== i[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 9; i++) this.elements[i] = t[i + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const i = this.elements;
      return (
        (t[e] = i[0]),
        (t[e + 1] = i[1]),
        (t[e + 2] = i[2]),
        (t[e + 3] = i[3]),
        (t[e + 4] = i[4]),
        (t[e + 5] = i[5]),
        (t[e + 6] = i[6]),
        (t[e + 7] = i[7]),
        (t[e + 8] = i[8]),
        t
      );
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }
  const gt = new ft();
  function _t(t) {
    for (let e = t.length - 1; e >= 0; --e) if (t[e] >= 65535) return !0;
    return !1;
  }
  function vt(t) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", t);
  }
  function xt() {
    const t = vt("canvas");
    return (t.style.display = "block"), t;
  }
  Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array;
  const yt = {};
  function Mt(t) {
    t in yt || ((yt[t] = !0), console.warn(t));
  }
  const St = new ft().set(
      0.8224621,
      0.177538,
      0,
      0.0331941,
      0.9668058,
      0,
      0.0170827,
      0.0723974,
      0.9105199
    ),
    bt = new ft().set(
      1.2249401,
      -0.2249404,
      0,
      -0.0420569,
      1.0420571,
      0,
      -0.0196376,
      -0.0786361,
      1.0982735
    ),
    Et = {
      [j]: {
        transfer: Y,
        primaries: Z,
        toReference: (t) => t,
        fromReference: (t) => t,
      },
      [W]: {
        transfer: K,
        primaries: Z,
        toReference: (t) => t.convertSRGBToLinear(),
        fromReference: (t) => t.convertLinearToSRGB(),
      },
      [q]: {
        transfer: Y,
        primaries: J,
        toReference: (t) => t.applyMatrix3(bt),
        fromReference: (t) => t.applyMatrix3(St),
      },
      [X]: {
        transfer: K,
        primaries: J,
        toReference: (t) => t.convertSRGBToLinear().applyMatrix3(bt),
        fromReference: (t) => t.applyMatrix3(St).convertLinearToSRGB(),
      },
    },
    Tt = new Set([j, q]),
    wt = {
      enabled: !0,
      _workingColorSpace: j,
      get legacyMode() {
        return (
          console.warn(
            "THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."
          ),
          !this.enabled
        );
      },
      set legacyMode(t) {
        console.warn(
          "THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."
        ),
          (this.enabled = !t);
      },
      get workingColorSpace() {
        return this._workingColorSpace;
      },
      set workingColorSpace(t) {
        if (!Tt.has(t))
          throw new Error(`Unsupported working color space, "${t}".`);
        this._workingColorSpace = t;
      },
      convert: function (t, e, i) {
        if (!1 === this.enabled || e === i || !e || !i) return t;
        const n = Et[e].toReference;
        return (0, Et[i].fromReference)(n(t));
      },
      fromWorkingColorSpace: function (t, e) {
        return this.convert(t, this._workingColorSpace, e);
      },
      toWorkingColorSpace: function (t, e) {
        return this.convert(t, e, this._workingColorSpace);
      },
      getPrimaries: function (t) {
        return Et[t].primaries;
      },
      getTransfer: function (t) {
        return t === G ? Y : Et[t].transfer;
      },
    };
  function At(t) {
    return t < 0.04045
      ? 0.0773993808 * t
      : Math.pow(0.9478672986 * t + 0.0521327014, 2.4);
  }
  function Rt(t) {
    return t < 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 0.41666) - 0.055;
  }
  let Ct;
  class Lt {
    static getDataURL(t) {
      if (/^data:/i.test(t.src)) return t.src;
      if ("undefined" == typeof HTMLCanvasElement) return t.src;
      let e;
      if (t instanceof HTMLCanvasElement) e = t;
      else {
        void 0 === Ct && (Ct = vt("canvas")),
          (Ct.width = t.width),
          (Ct.height = t.height);
        const i = Ct.getContext("2d");
        t instanceof ImageData
          ? i.putImageData(t, 0, 0)
          : i.drawImage(t, 0, 0, t.width, t.height),
          (e = Ct);
      }
      return e.width > 2048 || e.height > 2048
        ? (console.warn(
            "THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",
            t
          ),
          e.toDataURL("image/jpeg", 0.6))
        : e.toDataURL("image/png");
    }
    static sRGBToLinear(t) {
      if (
        ("undefined" != typeof HTMLImageElement &&
          t instanceof HTMLImageElement) ||
        ("undefined" != typeof HTMLCanvasElement &&
          t instanceof HTMLCanvasElement) ||
        ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
      ) {
        const e = vt("canvas");
        (e.width = t.width), (e.height = t.height);
        const i = e.getContext("2d");
        i.drawImage(t, 0, 0, t.width, t.height);
        const n = i.getImageData(0, 0, t.width, t.height),
          r = n.data;
        for (let t = 0; t < r.length; t++) r[t] = 255 * At(r[t] / 255);
        return i.putImageData(n, 0, 0), e;
      }
      if (t.data) {
        const e = t.data.slice(0);
        for (let t = 0; t < e.length; t++)
          e instanceof Uint8Array || e instanceof Uint8ClampedArray
            ? (e[t] = Math.floor(255 * At(e[t] / 255)))
            : (e[t] = At(e[t]));
        return { data: e, width: t.width, height: t.height };
      }
      return (
        console.warn(
          "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."
        ),
        t
      );
    }
  }
  let Pt = 0;
  class Ut {
    constructor(t = null) {
      (this.isSource = !0),
        Object.defineProperty(this, "id", { value: Pt++ }),
        (this.uuid = ot()),
        (this.data = t),
        (this.version = 0);
    }
    set needsUpdate(t) {
      !0 === t && this.version++;
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      if (!e && void 0 !== t.images[this.uuid]) return t.images[this.uuid];
      const i = { uuid: this.uuid, url: "" },
        n = this.data;
      if (null !== n) {
        let t;
        if (Array.isArray(n)) {
          t = [];
          for (let e = 0, i = n.length; e < i; e++)
            n[e].isDataTexture ? t.push(Dt(n[e].image)) : t.push(Dt(n[e]));
        } else t = Dt(n);
        i.url = t;
      }
      return e || (t.images[this.uuid] = i), i;
    }
  }
  function Dt(t) {
    return ("undefined" != typeof HTMLImageElement &&
      t instanceof HTMLImageElement) ||
      ("undefined" != typeof HTMLCanvasElement &&
        t instanceof HTMLCanvasElement) ||
      ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
      ? Lt.getDataURL(t)
      : t.data
      ? {
          data: Array.from(t.data),
          width: t.width,
          height: t.height,
          type: t.data.constructor.name,
        }
      : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }
  let It = 0;
  class Nt extends nt {
    constructor(
      t = Nt.DEFAULT_IMAGE,
      e = Nt.DEFAULT_MAPPING,
      i = 1001,
      n = 1001,
      r = 1006,
      s = 1008,
      a = 1023,
      o = 1009,
      l = Nt.DEFAULT_ANISOTROPY,
      h = ""
    ) {
      super(),
        (this.isTexture = !0),
        Object.defineProperty(this, "id", { value: It++ }),
        (this.uuid = ot()),
        (this.name = ""),
        (this.source = new Ut(t)),
        (this.mipmaps = []),
        (this.mapping = e),
        (this.channel = 0),
        (this.wrapS = i),
        (this.wrapT = n),
        (this.magFilter = r),
        (this.minFilter = s),
        (this.anisotropy = l),
        (this.format = a),
        (this.internalFormat = null),
        (this.type = o),
        (this.offset = new mt(0, 0)),
        (this.repeat = new mt(1, 1)),
        (this.center = new mt(0, 0)),
        (this.rotation = 0),
        (this.matrixAutoUpdate = !0),
        (this.matrix = new ft()),
        (this.generateMipmaps = !0),
        (this.premultiplyAlpha = !1),
        (this.flipY = !0),
        (this.unpackAlignment = 4),
        "string" == typeof h
          ? (this.colorSpace = h)
          : (Mt(
              "THREE.Texture: Property .encoding has been replaced by .colorSpace."
            ),
            (this.colorSpace = h === H ? W : G)),
        (this.userData = {}),
        (this.version = 0),
        (this.onUpdate = null),
        (this.isRenderTargetTexture = !1),
        (this.needsPMREMUpdate = !1);
    }
    get image() {
      return this.source.data;
    }
    set image(t = null) {
      this.source.data = t;
    }
    updateMatrix() {
      this.matrix.setUvTransform(
        this.offset.x,
        this.offset.y,
        this.repeat.x,
        this.repeat.y,
        this.rotation,
        this.center.x,
        this.center.y
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return (
        (this.name = t.name),
        (this.source = t.source),
        (this.mipmaps = t.mipmaps.slice(0)),
        (this.mapping = t.mapping),
        (this.channel = t.channel),
        (this.wrapS = t.wrapS),
        (this.wrapT = t.wrapT),
        (this.magFilter = t.magFilter),
        (this.minFilter = t.minFilter),
        (this.anisotropy = t.anisotropy),
        (this.format = t.format),
        (this.internalFormat = t.internalFormat),
        (this.type = t.type),
        this.offset.copy(t.offset),
        this.repeat.copy(t.repeat),
        this.center.copy(t.center),
        (this.rotation = t.rotation),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this.matrix.copy(t.matrix),
        (this.generateMipmaps = t.generateMipmaps),
        (this.premultiplyAlpha = t.premultiplyAlpha),
        (this.flipY = t.flipY),
        (this.unpackAlignment = t.unpackAlignment),
        (this.colorSpace = t.colorSpace),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        (this.needsUpdate = !0),
        this
      );
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
      const i = {
        metadata: {
          version: 4.6,
          type: "Texture",
          generator: "Texture.toJSON",
        },
        uuid: this.uuid,
        name: this.name,
        image: this.source.toJSON(t).uuid,
        mapping: this.mapping,
        channel: this.channel,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        internalFormat: this.internalFormat,
        type: this.type,
        colorSpace: this.colorSpace,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        generateMipmaps: this.generateMipmaps,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment,
      };
      return (
        Object.keys(this.userData).length > 0 && (i.userData = this.userData),
        e || (t.textures[this.uuid] = i),
        i
      );
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(t) {
      if (300 !== this.mapping) return t;
      if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
        switch (this.wrapS) {
          case v:
            t.x = t.x - Math.floor(t.x);
            break;
          case x:
            t.x = t.x < 0 ? 0 : 1;
            break;
          case y:
            1 === Math.abs(Math.floor(t.x) % 2)
              ? (t.x = Math.ceil(t.x) - t.x)
              : (t.x = t.x - Math.floor(t.x));
        }
      if (t.y < 0 || t.y > 1)
        switch (this.wrapT) {
          case v:
            t.y = t.y - Math.floor(t.y);
            break;
          case x:
            t.y = t.y < 0 ? 0 : 1;
            break;
          case y:
            1 === Math.abs(Math.floor(t.y) % 2)
              ? (t.y = Math.ceil(t.y) - t.y)
              : (t.y = t.y - Math.floor(t.y));
        }
      return this.flipY && (t.y = 1 - t.y), t;
    }
    set needsUpdate(t) {
      !0 === t && (this.version++, (this.source.needsUpdate = !0));
    }
    get encoding() {
      return (
        Mt(
          "THREE.Texture: Property .encoding has been replaced by .colorSpace."
        ),
        this.colorSpace === W ? H : 3e3
      );
    }
    set encoding(t) {
      Mt("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
        (this.colorSpace = t === H ? W : G);
    }
  }
  (Nt.DEFAULT_IMAGE = null),
    (Nt.DEFAULT_MAPPING = 300),
    (Nt.DEFAULT_ANISOTROPY = 1);
  class Ot {
    constructor(t = 0, e = 0, i = 0, n = 1) {
      (Ot.prototype.isVector4 = !0),
        (this.x = t),
        (this.y = e),
        (this.z = i),
        (this.w = n);
    }
    get width() {
      return this.z;
    }
    set width(t) {
      this.z = t;
    }
    get height() {
      return this.w;
    }
    set height(t) {
      this.w = t;
    }
    set(t, e, i, n) {
      return (this.x = t), (this.y = e), (this.z = i), (this.w = n), this;
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), (this.w = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setZ(t) {
      return (this.z = t), this;
    }
    setW(t) {
      return (this.w = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(t) {
      return (
        (this.x = t.x),
        (this.y = t.y),
        (this.z = t.z),
        (this.w = void 0 !== t.w ? t.w : 1),
        this
      );
    }
    add(t) {
      return (
        (this.x += t.x), (this.y += t.y), (this.z += t.z), (this.w += t.w), this
      );
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), (this.w += t), this;
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x),
        (this.y = t.y + e.y),
        (this.z = t.z + e.z),
        (this.w = t.w + e.w),
        this
      );
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e),
        (this.y += t.y * e),
        (this.z += t.z * e),
        (this.w += t.w * e),
        this
      );
    }
    sub(t) {
      return (
        (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), (this.w -= t.w), this
      );
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this;
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x),
        (this.y = t.y - e.y),
        (this.z = t.z - e.z),
        (this.w = t.w - e.w),
        this
      );
    }
    multiply(t) {
      return (
        (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), (this.w *= t.w), this
      );
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this;
    }
    applyMatrix4(t) {
      const e = this.x,
        i = this.y,
        n = this.z,
        r = this.w,
        s = t.elements;
      return (
        (this.x = s[0] * e + s[4] * i + s[8] * n + s[12] * r),
        (this.y = s[1] * e + s[5] * i + s[9] * n + s[13] * r),
        (this.z = s[2] * e + s[6] * i + s[10] * n + s[14] * r),
        (this.w = s[3] * e + s[7] * i + s[11] * n + s[15] * r),
        this
      );
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      const e = Math.sqrt(1 - t.w * t.w);
      return (
        e < 1e-4
          ? ((this.x = 1), (this.y = 0), (this.z = 0))
          : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
        this
      );
    }
    setAxisAngleFromRotationMatrix(t) {
      let e, i, n, r;
      const s = 0.01,
        a = 0.1,
        o = t.elements,
        l = o[0],
        h = o[4],
        c = o[8],
        d = o[1],
        u = o[5],
        p = o[9],
        m = o[2],
        f = o[6],
        g = o[10];
      if (Math.abs(h - d) < s && Math.abs(c - m) < s && Math.abs(p - f) < s) {
        if (
          Math.abs(h + d) < a &&
          Math.abs(c + m) < a &&
          Math.abs(p + f) < a &&
          Math.abs(l + u + g - 3) < a
        )
          return this.set(1, 0, 0, 0), this;
        e = Math.PI;
        const t = (l + 1) / 2,
          o = (u + 1) / 2,
          _ = (g + 1) / 2,
          v = (h + d) / 4,
          x = (c + m) / 4,
          y = (p + f) / 4;
        return (
          t > o && t > _
            ? t < s
              ? ((i = 0), (n = 0.707106781), (r = 0.707106781))
              : ((i = Math.sqrt(t)), (n = v / i), (r = x / i))
            : o > _
            ? o < s
              ? ((i = 0.707106781), (n = 0), (r = 0.707106781))
              : ((n = Math.sqrt(o)), (i = v / n), (r = y / n))
            : _ < s
            ? ((i = 0.707106781), (n = 0.707106781), (r = 0))
            : ((r = Math.sqrt(_)), (i = x / r), (n = y / r)),
          this.set(i, n, r, e),
          this
        );
      }
      let _ = Math.sqrt(
        (f - p) * (f - p) + (c - m) * (c - m) + (d - h) * (d - h)
      );
      return (
        Math.abs(_) < 0.001 && (_ = 1),
        (this.x = (f - p) / _),
        (this.y = (c - m) / _),
        (this.z = (d - h) / _),
        (this.w = Math.acos((l + u + g - 1) / 2)),
        this
      );
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        (this.w = Math.min(this.w, t.w)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        (this.w = Math.max(this.w, t.w)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        (this.w = Math.max(t.w, Math.min(e.w, this.w))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        (this.w = Math.max(t, Math.min(e, this.w))),
        this
      );
    }
    clampLength(t, e) {
      const i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(
        Math.max(t, Math.min(e, i))
      );
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        (this.w = Math.floor(this.w)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        (this.w = Math.ceil(this.w)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        (this.w = Math.round(this.w)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = Math.trunc(this.x)),
        (this.y = Math.trunc(this.y)),
        (this.z = Math.trunc(this.z)),
        (this.w = Math.trunc(this.w)),
        this
      );
    }
    negate() {
      return (
        (this.x = -this.x),
        (this.y = -this.y),
        (this.z = -this.z),
        (this.w = -this.w),
        this
      );
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }
    lengthSq() {
      return (
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    }
    length() {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    }
    manhattanLength() {
      return (
        Math.abs(this.x) +
        Math.abs(this.y) +
        Math.abs(this.z) +
        Math.abs(this.w)
      );
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        (this.w += (t.w - this.w) * e),
        this
      );
    }
    lerpVectors(t, e, i) {
      return (
        (this.x = t.x + (e.x - t.x) * i),
        (this.y = t.y + (e.y - t.y) * i),
        (this.z = t.z + (e.z - t.z) * i),
        (this.w = t.w + (e.w - t.w) * i),
        this
      );
    }
    equals(t) {
      return (
        t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
      );
    }
    fromArray(t, e = 0) {
      return (
        (this.x = t[e]),
        (this.y = t[e + 1]),
        (this.z = t[e + 2]),
        (this.w = t[e + 3]),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this.x),
        (t[e + 1] = this.y),
        (t[e + 2] = this.z),
        (t[e + 3] = this.w),
        t
      );
    }
    fromBufferAttribute(t, e) {
      return (
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        (this.w = t.getW(e)),
        this
      );
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        (this.w = Math.random()),
        this
      );
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z, yield this.w;
    }
  }
  class Ft extends nt {
    constructor(t = 1, e = 1, i = {}) {
      super(),
        (this.isRenderTarget = !0),
        (this.width = t),
        (this.height = e),
        (this.depth = 1),
        (this.scissor = new Ot(0, 0, t, e)),
        (this.scissorTest = !1),
        (this.viewport = new Ot(0, 0, t, e));
      const n = { width: t, height: e, depth: 1 };
      void 0 !== i.encoding &&
        (Mt(
          "THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."
        ),
        (i.colorSpace = i.encoding === H ? W : G)),
        (i = Object.assign(
          {
            generateMipmaps: !1,
            internalFormat: null,
            minFilter: b,
            depthBuffer: !0,
            stencilBuffer: !1,
            depthTexture: null,
            samples: 0,
          },
          i
        )),
        (this.texture = new Nt(
          n,
          i.mapping,
          i.wrapS,
          i.wrapT,
          i.magFilter,
          i.minFilter,
          i.format,
          i.type,
          i.anisotropy,
          i.colorSpace
        )),
        (this.texture.isRenderTargetTexture = !0),
        (this.texture.flipY = !1),
        (this.texture.generateMipmaps = i.generateMipmaps),
        (this.texture.internalFormat = i.internalFormat),
        (this.depthBuffer = i.depthBuffer),
        (this.stencilBuffer = i.stencilBuffer),
        (this.depthTexture = i.depthTexture),
        (this.samples = i.samples);
    }
    setSize(t, e, i = 1) {
      (this.width === t && this.height === e && this.depth === i) ||
        ((this.width = t),
        (this.height = e),
        (this.depth = i),
        (this.texture.image.width = t),
        (this.texture.image.height = e),
        (this.texture.image.depth = i),
        this.dispose()),
        this.viewport.set(0, 0, t, e),
        this.scissor.set(0, 0, t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      (this.width = t.width),
        (this.height = t.height),
        (this.depth = t.depth),
        this.scissor.copy(t.scissor),
        (this.scissorTest = t.scissorTest),
        this.viewport.copy(t.viewport),
        (this.texture = t.texture.clone()),
        (this.texture.isRenderTargetTexture = !0);
      const e = Object.assign({}, t.texture.image);
      return (
        (this.texture.source = new Ut(e)),
        (this.depthBuffer = t.depthBuffer),
        (this.stencilBuffer = t.stencilBuffer),
        null !== t.depthTexture && (this.depthTexture = t.depthTexture.clone()),
        (this.samples = t.samples),
        this
      );
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }
  class zt extends Ft {
    constructor(t = 1, e = 1, i = {}) {
      super(t, e, i), (this.isWebGLRenderTarget = !0);
    }
  }
  class Bt extends Nt {
    constructor(t = null, e = 1, i = 1, n = 1) {
      super(null),
        (this.isDataArrayTexture = !0),
        (this.image = { data: t, width: e, height: i, depth: n }),
        (this.magFilter = M),
        (this.minFilter = M),
        (this.wrapR = x),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1);
    }
  }
  class kt extends Nt {
    constructor(t = null, e = 1, i = 1, n = 1) {
      super(null),
        (this.isData3DTexture = !0),
        (this.image = { data: t, width: e, height: i, depth: n }),
        (this.magFilter = M),
        (this.minFilter = M),
        (this.wrapR = x),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1);
    }
  }
  class Vt {
    constructor(t = 0, e = 0, i = 0, n = 1) {
      (this.isQuaternion = !0),
        (this._x = t),
        (this._y = e),
        (this._z = i),
        (this._w = n);
    }
    static slerpFlat(t, e, i, n, r, s, a) {
      let o = i[n + 0],
        l = i[n + 1],
        h = i[n + 2],
        c = i[n + 3];
      const d = r[s + 0],
        u = r[s + 1],
        p = r[s + 2],
        m = r[s + 3];
      if (0 === a)
        return (
          (t[e + 0] = o), (t[e + 1] = l), (t[e + 2] = h), void (t[e + 3] = c)
        );
      if (1 === a)
        return (
          (t[e + 0] = d), (t[e + 1] = u), (t[e + 2] = p), void (t[e + 3] = m)
        );
      if (c !== m || o !== d || l !== u || h !== p) {
        let t = 1 - a;
        const e = o * d + l * u + h * p + c * m,
          i = e >= 0 ? 1 : -1,
          n = 1 - e * e;
        if (n > Number.EPSILON) {
          const r = Math.sqrt(n),
            s = Math.atan2(r, e * i);
          (t = Math.sin(t * s) / r), (a = Math.sin(a * s) / r);
        }
        const r = a * i;
        if (
          ((o = o * t + d * r),
          (l = l * t + u * r),
          (h = h * t + p * r),
          (c = c * t + m * r),
          t === 1 - a)
        ) {
          const t = 1 / Math.sqrt(o * o + l * l + h * h + c * c);
          (o *= t), (l *= t), (h *= t), (c *= t);
        }
      }
      (t[e] = o), (t[e + 1] = l), (t[e + 2] = h), (t[e + 3] = c);
    }
    static multiplyQuaternionsFlat(t, e, i, n, r, s) {
      const a = i[n],
        o = i[n + 1],
        l = i[n + 2],
        h = i[n + 3],
        c = r[s],
        d = r[s + 1],
        u = r[s + 2],
        p = r[s + 3];
      return (
        (t[e] = a * p + h * c + o * u - l * d),
        (t[e + 1] = o * p + h * d + l * c - a * u),
        (t[e + 2] = l * p + h * u + a * d - o * c),
        (t[e + 3] = h * p - a * c - o * d - l * u),
        t
      );
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(t) {
      (this._w = t), this._onChangeCallback();
    }
    set(t, e, i, n) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = i),
        (this._w = n),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return (
        (this._x = t.x),
        (this._y = t.y),
        (this._z = t.z),
        (this._w = t.w),
        this._onChangeCallback(),
        this
      );
    }
    setFromEuler(t, e) {
      const i = t._x,
        n = t._y,
        r = t._z,
        s = t._order,
        a = Math.cos,
        o = Math.sin,
        l = a(i / 2),
        h = a(n / 2),
        c = a(r / 2),
        d = o(i / 2),
        u = o(n / 2),
        p = o(r / 2);
      switch (s) {
        case "XYZ":
          (this._x = d * h * c + l * u * p),
            (this._y = l * u * c - d * h * p),
            (this._z = l * h * p + d * u * c),
            (this._w = l * h * c - d * u * p);
          break;
        case "YXZ":
          (this._x = d * h * c + l * u * p),
            (this._y = l * u * c - d * h * p),
            (this._z = l * h * p - d * u * c),
            (this._w = l * h * c + d * u * p);
          break;
        case "ZXY":
          (this._x = d * h * c - l * u * p),
            (this._y = l * u * c + d * h * p),
            (this._z = l * h * p + d * u * c),
            (this._w = l * h * c - d * u * p);
          break;
        case "ZYX":
          (this._x = d * h * c - l * u * p),
            (this._y = l * u * c + d * h * p),
            (this._z = l * h * p - d * u * c),
            (this._w = l * h * c + d * u * p);
          break;
        case "YZX":
          (this._x = d * h * c + l * u * p),
            (this._y = l * u * c + d * h * p),
            (this._z = l * h * p - d * u * c),
            (this._w = l * h * c - d * u * p);
          break;
        case "XZY":
          (this._x = d * h * c - l * u * p),
            (this._y = l * u * c - d * h * p),
            (this._z = l * h * p + d * u * c),
            (this._w = l * h * c + d * u * p);
          break;
        default:
          console.warn(
            "THREE.Quaternion: .setFromEuler() encountered an unknown order: " +
              s
          );
      }
      return !1 !== e && this._onChangeCallback(), this;
    }
    setFromAxisAngle(t, e) {
      const i = e / 2,
        n = Math.sin(i);
      return (
        (this._x = t.x * n),
        (this._y = t.y * n),
        (this._z = t.z * n),
        (this._w = Math.cos(i)),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t) {
      const e = t.elements,
        i = e[0],
        n = e[4],
        r = e[8],
        s = e[1],
        a = e[5],
        o = e[9],
        l = e[2],
        h = e[6],
        c = e[10],
        d = i + a + c;
      if (d > 0) {
        const t = 0.5 / Math.sqrt(d + 1);
        (this._w = 0.25 / t),
          (this._x = (h - o) * t),
          (this._y = (r - l) * t),
          (this._z = (s - n) * t);
      } else if (i > a && i > c) {
        const t = 2 * Math.sqrt(1 + i - a - c);
        (this._w = (h - o) / t),
          (this._x = 0.25 * t),
          (this._y = (n + s) / t),
          (this._z = (r + l) / t);
      } else if (a > c) {
        const t = 2 * Math.sqrt(1 + a - i - c);
        (this._w = (r - l) / t),
          (this._x = (n + s) / t),
          (this._y = 0.25 * t),
          (this._z = (o + h) / t);
      } else {
        const t = 2 * Math.sqrt(1 + c - i - a);
        (this._w = (s - n) / t),
          (this._x = (r + l) / t),
          (this._y = (o + h) / t),
          (this._z = 0.25 * t);
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(t, e) {
      let i = t.dot(e) + 1;
      return (
        i < Number.EPSILON
          ? ((i = 0),
            Math.abs(t.x) > Math.abs(t.z)
              ? ((this._x = -t.y),
                (this._y = t.x),
                (this._z = 0),
                (this._w = i))
              : ((this._x = 0),
                (this._y = -t.z),
                (this._z = t.y),
                (this._w = i)))
          : ((this._x = t.y * e.z - t.z * e.y),
            (this._y = t.z * e.x - t.x * e.z),
            (this._z = t.x * e.y - t.y * e.x),
            (this._w = i)),
        this.normalize()
      );
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(lt(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      const i = this.angleTo(t);
      if (0 === i) return this;
      const n = Math.min(1, e / i);
      return this.slerp(t, n), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return (
        (this._x *= -1),
        (this._y *= -1),
        (this._z *= -1),
        this._onChangeCallback(),
        this
      );
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return (
        this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
      );
    }
    length() {
      return Math.sqrt(
        this._x * this._x +
          this._y * this._y +
          this._z * this._z +
          this._w * this._w
      );
    }
    normalize() {
      let t = this.length();
      return (
        0 === t
          ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
          : ((t = 1 / t),
            (this._x = this._x * t),
            (this._y = this._y * t),
            (this._z = this._z * t),
            (this._w = this._w * t)),
        this._onChangeCallback(),
        this
      );
    }
    multiply(t) {
      return this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      const i = t._x,
        n = t._y,
        r = t._z,
        s = t._w,
        a = e._x,
        o = e._y,
        l = e._z,
        h = e._w;
      return (
        (this._x = i * h + s * a + n * l - r * o),
        (this._y = n * h + s * o + r * a - i * l),
        (this._z = r * h + s * l + i * o - n * a),
        (this._w = s * h - i * a - n * o - r * l),
        this._onChangeCallback(),
        this
      );
    }
    slerp(t, e) {
      if (0 === e) return this;
      if (1 === e) return this.copy(t);
      const i = this._x,
        n = this._y,
        r = this._z,
        s = this._w;
      let a = s * t._w + i * t._x + n * t._y + r * t._z;
      if (
        (a < 0
          ? ((this._w = -t._w),
            (this._x = -t._x),
            (this._y = -t._y),
            (this._z = -t._z),
            (a = -a))
          : this.copy(t),
        a >= 1)
      )
        return (this._w = s), (this._x = i), (this._y = n), (this._z = r), this;
      const o = 1 - a * a;
      if (o <= Number.EPSILON) {
        const t = 1 - e;
        return (
          (this._w = t * s + e * this._w),
          (this._x = t * i + e * this._x),
          (this._y = t * n + e * this._y),
          (this._z = t * r + e * this._z),
          this.normalize(),
          this._onChangeCallback(),
          this
        );
      }
      const l = Math.sqrt(o),
        h = Math.atan2(l, a),
        c = Math.sin((1 - e) * h) / l,
        d = Math.sin(e * h) / l;
      return (
        (this._w = s * c + this._w * d),
        (this._x = i * c + this._x * d),
        (this._y = n * c + this._y * d),
        (this._z = r * c + this._z * d),
        this._onChangeCallback(),
        this
      );
    }
    slerpQuaternions(t, e, i) {
      return this.copy(t).slerp(e, i);
    }
    random() {
      const t = Math.random(),
        e = Math.sqrt(1 - t),
        i = Math.sqrt(t),
        n = 2 * Math.PI * Math.random(),
        r = 2 * Math.PI * Math.random();
      return this.set(
        e * Math.cos(n),
        i * Math.sin(r),
        i * Math.cos(r),
        e * Math.sin(n)
      );
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._w === this._w
      );
    }
    fromArray(t, e = 0) {
      return (
        (this._x = t[e]),
        (this._y = t[e + 1]),
        (this._z = t[e + 2]),
        (this._w = t[e + 3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._w),
        t
      );
    }
    fromBufferAttribute(t, e) {
      return (
        (this._x = t.getX(e)),
        (this._y = t.getY(e)),
        (this._z = t.getZ(e)),
        (this._w = t.getW(e)),
        this
      );
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w;
    }
  }
  class Ht {
    constructor(t = 0, e = 0, i = 0) {
      (Ht.prototype.isVector3 = !0), (this.x = t), (this.y = e), (this.z = i);
    }
    set(t, e, i) {
      return (
        void 0 === i && (i = this.z),
        (this.x = t),
        (this.y = e),
        (this.z = i),
        this
      );
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setZ(t) {
      return (this.z = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
    }
    add(t) {
      return (this.x += t.x), (this.y += t.y), (this.z += t.z), this;
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), this;
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this
      );
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this
      );
    }
    sub(t) {
      return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this;
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), this;
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this
      );
    }
    multiply(t) {
      return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this;
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), this;
    }
    multiplyVectors(t, e) {
      return (
        (this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this
      );
    }
    applyEuler(t) {
      return this.applyQuaternion(Wt.setFromEuler(t));
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(Wt.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      const e = this.x,
        i = this.y,
        n = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[3] * i + r[6] * n),
        (this.y = r[1] * e + r[4] * i + r[7] * n),
        (this.z = r[2] * e + r[5] * i + r[8] * n),
        this
      );
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      const e = this.x,
        i = this.y,
        n = this.z,
        r = t.elements,
        s = 1 / (r[3] * e + r[7] * i + r[11] * n + r[15]);
      return (
        (this.x = (r[0] * e + r[4] * i + r[8] * n + r[12]) * s),
        (this.y = (r[1] * e + r[5] * i + r[9] * n + r[13]) * s),
        (this.z = (r[2] * e + r[6] * i + r[10] * n + r[14]) * s),
        this
      );
    }
    applyQuaternion(t) {
      const e = this.x,
        i = this.y,
        n = this.z,
        r = t.x,
        s = t.y,
        a = t.z,
        o = t.w,
        l = 2 * (s * n - a * i),
        h = 2 * (a * e - r * n),
        c = 2 * (r * i - s * e);
      return (
        (this.x = e + o * l + s * c - a * h),
        (this.y = i + o * h + a * l - r * c),
        (this.z = n + o * c + r * h - s * l),
        this
      );
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
        t.projectionMatrix
      );
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
        t.matrixWorld
      );
    }
    transformDirection(t) {
      const e = this.x,
        i = this.y,
        n = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[4] * i + r[8] * n),
        (this.y = r[1] * e + r[5] * i + r[9] * n),
        (this.z = r[2] * e + r[6] * i + r[10] * n),
        this.normalize()
      );
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        this
      );
    }
    clampLength(t, e) {
      const i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(
        Math.max(t, Math.min(e, i))
      );
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = Math.trunc(this.x)),
        (this.y = Math.trunc(this.y)),
        (this.z = Math.trunc(this.z)),
        this
      );
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        this
      );
    }
    lerpVectors(t, e, i) {
      return (
        (this.x = t.x + (e.x - t.x) * i),
        (this.y = t.y + (e.y - t.y) * i),
        (this.z = t.z + (e.z - t.z) * i),
        this
      );
    }
    cross(t) {
      return this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      const i = t.x,
        n = t.y,
        r = t.z,
        s = e.x,
        a = e.y,
        o = e.z;
      return (
        (this.x = n * o - r * a),
        (this.y = r * s - i * o),
        (this.z = i * a - n * s),
        this
      );
    }
    projectOnVector(t) {
      const e = t.lengthSq();
      if (0 === e) return this.set(0, 0, 0);
      const i = t.dot(this) / e;
      return this.copy(t).multiplyScalar(i);
    }
    projectOnPlane(t) {
      return Gt.copy(this).projectOnVector(t), this.sub(Gt);
    }
    reflect(t) {
      return this.sub(Gt.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const i = this.dot(t) / e;
      return Math.acos(lt(i, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        i = this.y - t.y,
        n = this.z - t.z;
      return e * e + i * i + n * n;
    }
    manhattanDistanceTo(t) {
      return (
        Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
      );
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, i) {
      const n = Math.sin(e) * t;
      return (
        (this.x = n * Math.sin(i)),
        (this.y = Math.cos(e) * t),
        (this.z = n * Math.cos(i)),
        this
      );
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, i) {
      return (
        (this.x = t * Math.sin(e)),
        (this.y = i),
        (this.z = t * Math.cos(e)),
        this
      );
    }
    setFromMatrixPosition(t) {
      const e = t.elements;
      return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
    }
    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(),
        i = this.setFromMatrixColumn(t, 1).length(),
        n = this.setFromMatrixColumn(t, 2).length();
      return (this.x = e), (this.y = i), (this.z = n), this;
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e);
    }
    setFromEuler(t) {
      return (this.x = t._x), (this.y = t._y), (this.z = t._z), this;
    }
    setFromColor(t) {
      return (this.x = t.r), (this.y = t.g), (this.z = t.b), this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t;
    }
    fromBufferAttribute(t, e) {
      return (
        (this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), this
      );
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        this
      );
    }
    randomDirection() {
      const t = 2 * (Math.random() - 0.5),
        e = Math.random() * Math.PI * 2,
        i = Math.sqrt(1 - t ** 2);
      return (
        (this.x = i * Math.cos(e)),
        (this.y = i * Math.sin(e)),
        (this.z = t),
        this
      );
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z;
    }
  }
  const Gt = new Ht(),
    Wt = new Vt();
  class jt {
    constructor(
      t = new Ht(1 / 0, 1 / 0, 1 / 0),
      e = new Ht(-1 / 0, -1 / 0, -1 / 0)
    ) {
      (this.isBox3 = !0), (this.min = t), (this.max = e);
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }
    setFromArray(t) {
      this.makeEmpty();
      for (let e = 0, i = t.length; e < i; e += 3)
        this.expandByPoint(qt.fromArray(t, e));
      return this;
    }
    setFromBufferAttribute(t) {
      this.makeEmpty();
      for (let e = 0, i = t.count; e < i; e++)
        this.expandByPoint(qt.fromBufferAttribute(t, e));
      return this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      const i = qt.copy(e).multiplyScalar(0.5);
      return this.min.copy(t).sub(i), this.max.copy(t).add(i), this;
    }
    setFromObject(t, e = !1) {
      return this.makeEmpty(), this.expandByObject(t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }
    makeEmpty() {
      return (
        (this.min.x = this.min.y = this.min.z = 1 / 0),
        (this.max.x = this.max.y = this.max.z = -1 / 0),
        this
      );
    }
    isEmpty() {
      return (
        this.max.x < this.min.x ||
        this.max.y < this.min.y ||
        this.max.z < this.min.z
      );
    }
    getCenter(t) {
      return this.isEmpty()
        ? t.set(0, 0, 0)
        : t.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }
    expandByObject(t, e = !1) {
      t.updateWorldMatrix(!1, !1);
      const i = t.geometry;
      if (void 0 !== i) {
        const n = i.getAttribute("position");
        if (!0 === e && void 0 !== n && !0 !== t.isInstancedMesh)
          for (let e = 0, i = n.count; e < i; e++)
            !0 === t.isMesh
              ? t.getVertexPosition(e, qt)
              : qt.fromBufferAttribute(n, e),
              qt.applyMatrix4(t.matrixWorld),
              this.expandByPoint(qt);
        else
          void 0 !== t.boundingBox
            ? (null === t.boundingBox && t.computeBoundingBox(),
              Yt.copy(t.boundingBox))
            : (null === i.boundingBox && i.computeBoundingBox(),
              Yt.copy(i.boundingBox)),
            Yt.applyMatrix4(t.matrixWorld),
            this.union(Yt);
      }
      const n = t.children;
      for (let t = 0, i = n.length; t < i; t++) this.expandByObject(n[t], e);
      return this;
    }
    containsPoint(t) {
      return !(
        t.x < this.min.x ||
        t.x > this.max.x ||
        t.y < this.min.y ||
        t.y > this.max.y ||
        t.z < this.min.z ||
        t.z > this.max.z
      );
    }
    containsBox(t) {
      return (
        this.min.x <= t.min.x &&
        t.max.x <= this.max.x &&
        this.min.y <= t.min.y &&
        t.max.y <= this.max.y &&
        this.min.z <= t.min.z &&
        t.max.z <= this.max.z
      );
    }
    getParameter(t, e) {
      return e.set(
        (t.x - this.min.x) / (this.max.x - this.min.x),
        (t.y - this.min.y) / (this.max.y - this.min.y),
        (t.z - this.min.z) / (this.max.z - this.min.z)
      );
    }
    intersectsBox(t) {
      return !(
        t.max.x < this.min.x ||
        t.min.x > this.max.x ||
        t.max.y < this.min.y ||
        t.min.y > this.max.y ||
        t.max.z < this.min.z ||
        t.min.z > this.max.z
      );
    }
    intersectsSphere(t) {
      return (
        this.clampPoint(t.center, qt),
        qt.distanceToSquared(t.center) <= t.radius * t.radius
      );
    }
    intersectsPlane(t) {
      let e, i;
      return (
        t.normal.x > 0
          ? ((e = t.normal.x * this.min.x), (i = t.normal.x * this.max.x))
          : ((e = t.normal.x * this.max.x), (i = t.normal.x * this.min.x)),
        t.normal.y > 0
          ? ((e += t.normal.y * this.min.y), (i += t.normal.y * this.max.y))
          : ((e += t.normal.y * this.max.y), (i += t.normal.y * this.min.y)),
        t.normal.z > 0
          ? ((e += t.normal.z * this.min.z), (i += t.normal.z * this.max.z))
          : ((e += t.normal.z * this.max.z), (i += t.normal.z * this.min.z)),
        e <= -t.constant && i >= -t.constant
      );
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return !1;
      this.getCenter(ee),
        ie.subVectors(this.max, ee),
        Kt.subVectors(t.a, ee),
        Zt.subVectors(t.b, ee),
        Jt.subVectors(t.c, ee),
        Qt.subVectors(Zt, Kt),
        $t.subVectors(Jt, Zt),
        te.subVectors(Kt, Jt);
      let e = [
        0,
        -Qt.z,
        Qt.y,
        0,
        -$t.z,
        $t.y,
        0,
        -te.z,
        te.y,
        Qt.z,
        0,
        -Qt.x,
        $t.z,
        0,
        -$t.x,
        te.z,
        0,
        -te.x,
        -Qt.y,
        Qt.x,
        0,
        -$t.y,
        $t.x,
        0,
        -te.y,
        te.x,
        0,
      ];
      return (
        !!se(e, Kt, Zt, Jt, ie) &&
        ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        !!se(e, Kt, Zt, Jt, ie) &&
          (ne.crossVectors(Qt, $t),
          (e = [ne.x, ne.y, ne.z]),
          se(e, Kt, Zt, Jt, ie)))
      );
    }
    clampPoint(t, e) {
      return e.copy(t).clamp(this.min, this.max);
    }
    distanceToPoint(t) {
      return this.clampPoint(t, qt).distanceTo(t);
    }
    getBoundingSphere(t) {
      return (
        this.isEmpty()
          ? t.makeEmpty()
          : (this.getCenter(t.center),
            (t.radius = 0.5 * this.getSize(qt).length())),
        t
      );
    }
    intersect(t) {
      return (
        this.min.max(t.min),
        this.max.min(t.max),
        this.isEmpty() && this.makeEmpty(),
        this
      );
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }
    applyMatrix4(t) {
      return (
        this.isEmpty() ||
          (Xt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
          Xt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
          Xt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
          Xt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
          Xt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
          Xt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
          Xt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
          Xt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
          this.setFromPoints(Xt)),
        this
      );
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
  }
  const Xt = [
      new Ht(),
      new Ht(),
      new Ht(),
      new Ht(),
      new Ht(),
      new Ht(),
      new Ht(),
      new Ht(),
    ],
    qt = new Ht(),
    Yt = new jt(),
    Kt = new Ht(),
    Zt = new Ht(),
    Jt = new Ht(),
    Qt = new Ht(),
    $t = new Ht(),
    te = new Ht(),
    ee = new Ht(),
    ie = new Ht(),
    ne = new Ht(),
    re = new Ht();
  function se(t, e, i, n, r) {
    for (let s = 0, a = t.length - 3; s <= a; s += 3) {
      re.fromArray(t, s);
      const a =
          r.x * Math.abs(re.x) + r.y * Math.abs(re.y) + r.z * Math.abs(re.z),
        o = e.dot(re),
        l = i.dot(re),
        h = n.dot(re);
      if (Math.max(-Math.max(o, l, h), Math.min(o, l, h)) > a) return !1;
    }
    return !0;
  }
  const ae = new jt(),
    oe = new Ht(),
    le = new Ht();
  class he {
    constructor(t = new Ht(), e = -1) {
      (this.center = t), (this.radius = e);
    }
    set(t, e) {
      return this.center.copy(t), (this.radius = e), this;
    }
    setFromPoints(t, e) {
      const i = this.center;
      void 0 !== e ? i.copy(e) : ae.setFromPoints(t).getCenter(i);
      let n = 0;
      for (let e = 0, r = t.length; e < r; e++)
        n = Math.max(n, i.distanceToSquared(t[e]));
      return (this.radius = Math.sqrt(n)), this;
    }
    copy(t) {
      return this.center.copy(t.center), (this.radius = t.radius), this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), (this.radius = -1), this;
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(t) {
      const e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }
    intersectsBox(t) {
      return t.intersectsSphere(this);
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(t, e) {
      const i = this.center.distanceToSquared(t);
      return (
        e.copy(t),
        i > this.radius * this.radius &&
          (e.sub(this.center).normalize(),
          e.multiplyScalar(this.radius).add(this.center)),
        e
      );
    }
    getBoundingBox(t) {
      return this.isEmpty()
        ? (t.makeEmpty(), t)
        : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
    }
    applyMatrix4(t) {
      return (
        this.center.applyMatrix4(t),
        (this.radius = this.radius * t.getMaxScaleOnAxis()),
        this
      );
    }
    translate(t) {
      return this.center.add(t), this;
    }
    expandByPoint(t) {
      if (this.isEmpty()) return this.center.copy(t), (this.radius = 0), this;
      oe.subVectors(t, this.center);
      const e = oe.lengthSq();
      if (e > this.radius * this.radius) {
        const t = Math.sqrt(e),
          i = 0.5 * (t - this.radius);
        this.center.addScaledVector(oe, i / t), (this.radius += i);
      }
      return this;
    }
    union(t) {
      return t.isEmpty()
        ? this
        : this.isEmpty()
        ? (this.copy(t), this)
        : (!0 === this.center.equals(t.center)
            ? (this.radius = Math.max(this.radius, t.radius))
            : (le.subVectors(t.center, this.center).setLength(t.radius),
              this.expandByPoint(oe.copy(t.center).add(le)),
              this.expandByPoint(oe.copy(t.center).sub(le))),
          this);
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  const ce = new Ht(),
    de = new Ht(),
    ue = new Ht(),
    pe = new Ht(),
    me = new Ht(),
    fe = new Ht(),
    ge = new Ht();
  class _e {
    constructor(t = new Ht(), e = new Ht(0, 0, -1)) {
      (this.origin = t), (this.direction = e);
    }
    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this;
    }
    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
    }
    at(t, e) {
      return e.copy(this.origin).addScaledVector(this.direction, t);
    }
    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this;
    }
    recast(t) {
      return this.origin.copy(this.at(t, ce)), this;
    }
    closestPointToPoint(t, e) {
      e.subVectors(t, this.origin);
      const i = e.dot(this.direction);
      return i < 0
        ? e.copy(this.origin)
        : e.copy(this.origin).addScaledVector(this.direction, i);
    }
    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t));
    }
    distanceSqToPoint(t) {
      const e = ce.subVectors(t, this.origin).dot(this.direction);
      return e < 0
        ? this.origin.distanceToSquared(t)
        : (ce.copy(this.origin).addScaledVector(this.direction, e),
          ce.distanceToSquared(t));
    }
    distanceSqToSegment(t, e, i, n) {
      de.copy(t).add(e).multiplyScalar(0.5),
        ue.copy(e).sub(t).normalize(),
        pe.copy(this.origin).sub(de);
      const r = 0.5 * t.distanceTo(e),
        s = -this.direction.dot(ue),
        a = pe.dot(this.direction),
        o = -pe.dot(ue),
        l = pe.lengthSq(),
        h = Math.abs(1 - s * s);
      let c, d, u, p;
      if (h > 0)
        if (((c = s * o - a), (d = s * a - o), (p = r * h), c >= 0))
          if (d >= -p)
            if (d <= p) {
              const t = 1 / h;
              (c *= t),
                (d *= t),
                (u = c * (c + s * d + 2 * a) + d * (s * c + d + 2 * o) + l);
            } else
              (d = r),
                (c = Math.max(0, -(s * d + a))),
                (u = -c * c + d * (d + 2 * o) + l);
          else
            (d = -r),
              (c = Math.max(0, -(s * d + a))),
              (u = -c * c + d * (d + 2 * o) + l);
        else
          d <= -p
            ? ((c = Math.max(0, -(-s * r + a))),
              (d = c > 0 ? -r : Math.min(Math.max(-r, -o), r)),
              (u = -c * c + d * (d + 2 * o) + l))
            : d <= p
            ? ((c = 0),
              (d = Math.min(Math.max(-r, -o), r)),
              (u = d * (d + 2 * o) + l))
            : ((c = Math.max(0, -(s * r + a))),
              (d = c > 0 ? r : Math.min(Math.max(-r, -o), r)),
              (u = -c * c + d * (d + 2 * o) + l));
      else
        (d = s > 0 ? -r : r),
          (c = Math.max(0, -(s * d + a))),
          (u = -c * c + d * (d + 2 * o) + l);
      return (
        i && i.copy(this.origin).addScaledVector(this.direction, c),
        n && n.copy(de).addScaledVector(ue, d),
        u
      );
    }
    intersectSphere(t, e) {
      ce.subVectors(t.center, this.origin);
      const i = ce.dot(this.direction),
        n = ce.dot(ce) - i * i,
        r = t.radius * t.radius;
      if (n > r) return null;
      const s = Math.sqrt(r - n),
        a = i - s,
        o = i + s;
      return o < 0 ? null : a < 0 ? this.at(o, e) : this.at(a, e);
    }
    intersectsSphere(t) {
      return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
    }
    distanceToPlane(t) {
      const e = t.normal.dot(this.direction);
      if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
      const i = -(this.origin.dot(t.normal) + t.constant) / e;
      return i >= 0 ? i : null;
    }
    intersectPlane(t, e) {
      const i = this.distanceToPlane(t);
      return null === i ? null : this.at(i, e);
    }
    intersectsPlane(t) {
      const e = t.distanceToPoint(this.origin);
      return 0 === e || t.normal.dot(this.direction) * e < 0;
    }
    intersectBox(t, e) {
      let i, n, r, s, a, o;
      const l = 1 / this.direction.x,
        h = 1 / this.direction.y,
        c = 1 / this.direction.z,
        d = this.origin;
      return (
        l >= 0
          ? ((i = (t.min.x - d.x) * l), (n = (t.max.x - d.x) * l))
          : ((i = (t.max.x - d.x) * l), (n = (t.min.x - d.x) * l)),
        h >= 0
          ? ((r = (t.min.y - d.y) * h), (s = (t.max.y - d.y) * h))
          : ((r = (t.max.y - d.y) * h), (s = (t.min.y - d.y) * h)),
        i > s || r > n
          ? null
          : ((r > i || isNaN(i)) && (i = r),
            (s < n || isNaN(n)) && (n = s),
            c >= 0
              ? ((a = (t.min.z - d.z) * c), (o = (t.max.z - d.z) * c))
              : ((a = (t.max.z - d.z) * c), (o = (t.min.z - d.z) * c)),
            i > o || a > n
              ? null
              : ((a > i || i != i) && (i = a),
                (o < n || n != n) && (n = o),
                n < 0 ? null : this.at(i >= 0 ? i : n, e)))
      );
    }
    intersectsBox(t) {
      return null !== this.intersectBox(t, ce);
    }
    intersectTriangle(t, e, i, n, r) {
      me.subVectors(e, t), fe.subVectors(i, t), ge.crossVectors(me, fe);
      let s,
        a = this.direction.dot(ge);
      if (a > 0) {
        if (n) return null;
        s = 1;
      } else {
        if (!(a < 0)) return null;
        (s = -1), (a = -a);
      }
      pe.subVectors(this.origin, t);
      const o = s * this.direction.dot(fe.crossVectors(pe, fe));
      if (o < 0) return null;
      const l = s * this.direction.dot(me.cross(pe));
      if (l < 0) return null;
      if (o + l > a) return null;
      const h = -s * pe.dot(ge);
      return h < 0 ? null : this.at(h / a, r);
    }
    applyMatrix4(t) {
      return (
        this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
      );
    }
    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  class ve {
    constructor(t, e, i, n, r, s, a, o, l, h, c, d, u, p, m, f) {
      (ve.prototype.isMatrix4 = !0),
        (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        void 0 !== t &&
          this.set(t, e, i, n, r, s, a, o, l, h, c, d, u, p, m, f);
    }
    set(t, e, i, n, r, s, a, o, l, h, c, d, u, p, m, f) {
      const g = this.elements;
      return (
        (g[0] = t),
        (g[4] = e),
        (g[8] = i),
        (g[12] = n),
        (g[1] = r),
        (g[5] = s),
        (g[9] = a),
        (g[13] = o),
        (g[2] = l),
        (g[6] = h),
        (g[10] = c),
        (g[14] = d),
        (g[3] = u),
        (g[7] = p),
        (g[11] = m),
        (g[15] = f),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new ve().fromArray(this.elements);
    }
    copy(t) {
      const e = this.elements,
        i = t.elements;
      return (
        (e[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[3]),
        (e[4] = i[4]),
        (e[5] = i[5]),
        (e[6] = i[6]),
        (e[7] = i[7]),
        (e[8] = i[8]),
        (e[9] = i[9]),
        (e[10] = i[10]),
        (e[11] = i[11]),
        (e[12] = i[12]),
        (e[13] = i[13]),
        (e[14] = i[14]),
        (e[15] = i[15]),
        this
      );
    }
    copyPosition(t) {
      const e = this.elements,
        i = t.elements;
      return (e[12] = i[12]), (e[13] = i[13]), (e[14] = i[14]), this;
    }
    setFromMatrix3(t) {
      const e = t.elements;
      return (
        this.set(
          e[0],
          e[3],
          e[6],
          0,
          e[1],
          e[4],
          e[7],
          0,
          e[2],
          e[5],
          e[8],
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    extractBasis(t, e, i) {
      return (
        t.setFromMatrixColumn(this, 0),
        e.setFromMatrixColumn(this, 1),
        i.setFromMatrixColumn(this, 2),
        this
      );
    }
    makeBasis(t, e, i) {
      return (
        this.set(
          t.x,
          e.x,
          i.x,
          0,
          t.y,
          e.y,
          i.y,
          0,
          t.z,
          e.z,
          i.z,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    extractRotation(t) {
      const e = this.elements,
        i = t.elements,
        n = 1 / xe.setFromMatrixColumn(t, 0).length(),
        r = 1 / xe.setFromMatrixColumn(t, 1).length(),
        s = 1 / xe.setFromMatrixColumn(t, 2).length();
      return (
        (e[0] = i[0] * n),
        (e[1] = i[1] * n),
        (e[2] = i[2] * n),
        (e[3] = 0),
        (e[4] = i[4] * r),
        (e[5] = i[5] * r),
        (e[6] = i[6] * r),
        (e[7] = 0),
        (e[8] = i[8] * s),
        (e[9] = i[9] * s),
        (e[10] = i[10] * s),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromEuler(t) {
      const e = this.elements,
        i = t.x,
        n = t.y,
        r = t.z,
        s = Math.cos(i),
        a = Math.sin(i),
        o = Math.cos(n),
        l = Math.sin(n),
        h = Math.cos(r),
        c = Math.sin(r);
      if ("XYZ" === t.order) {
        const t = s * h,
          i = s * c,
          n = a * h,
          r = a * c;
        (e[0] = o * h),
          (e[4] = -o * c),
          (e[8] = l),
          (e[1] = i + n * l),
          (e[5] = t - r * l),
          (e[9] = -a * o),
          (e[2] = r - t * l),
          (e[6] = n + i * l),
          (e[10] = s * o);
      } else if ("YXZ" === t.order) {
        const t = o * h,
          i = o * c,
          n = l * h,
          r = l * c;
        (e[0] = t + r * a),
          (e[4] = n * a - i),
          (e[8] = s * l),
          (e[1] = s * c),
          (e[5] = s * h),
          (e[9] = -a),
          (e[2] = i * a - n),
          (e[6] = r + t * a),
          (e[10] = s * o);
      } else if ("ZXY" === t.order) {
        const t = o * h,
          i = o * c,
          n = l * h,
          r = l * c;
        (e[0] = t - r * a),
          (e[4] = -s * c),
          (e[8] = n + i * a),
          (e[1] = i + n * a),
          (e[5] = s * h),
          (e[9] = r - t * a),
          (e[2] = -s * l),
          (e[6] = a),
          (e[10] = s * o);
      } else if ("ZYX" === t.order) {
        const t = s * h,
          i = s * c,
          n = a * h,
          r = a * c;
        (e[0] = o * h),
          (e[4] = n * l - i),
          (e[8] = t * l + r),
          (e[1] = o * c),
          (e[5] = r * l + t),
          (e[9] = i * l - n),
          (e[2] = -l),
          (e[6] = a * o),
          (e[10] = s * o);
      } else if ("YZX" === t.order) {
        const t = s * o,
          i = s * l,
          n = a * o,
          r = a * l;
        (e[0] = o * h),
          (e[4] = r - t * c),
          (e[8] = n * c + i),
          (e[1] = c),
          (e[5] = s * h),
          (e[9] = -a * h),
          (e[2] = -l * h),
          (e[6] = i * c + n),
          (e[10] = t - r * c);
      } else if ("XZY" === t.order) {
        const t = s * o,
          i = s * l,
          n = a * o,
          r = a * l;
        (e[0] = o * h),
          (e[4] = -c),
          (e[8] = l * h),
          (e[1] = t * c + r),
          (e[5] = s * h),
          (e[9] = i * c - n),
          (e[2] = n * c - i),
          (e[6] = a * h),
          (e[10] = r * c + t);
      }
      return (
        (e[3] = 0),
        (e[7] = 0),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromQuaternion(t) {
      return this.compose(Me, t, Se);
    }
    lookAt(t, e, i) {
      const n = this.elements;
      return (
        Te.subVectors(t, e),
        0 === Te.lengthSq() && (Te.z = 1),
        Te.normalize(),
        be.crossVectors(i, Te),
        0 === be.lengthSq() &&
          (1 === Math.abs(i.z) ? (Te.x += 1e-4) : (Te.z += 1e-4),
          Te.normalize(),
          be.crossVectors(i, Te)),
        be.normalize(),
        Ee.crossVectors(Te, be),
        (n[0] = be.x),
        (n[4] = Ee.x),
        (n[8] = Te.x),
        (n[1] = be.y),
        (n[5] = Ee.y),
        (n[9] = Te.y),
        (n[2] = be.z),
        (n[6] = Ee.z),
        (n[10] = Te.z),
        this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const i = t.elements,
        n = e.elements,
        r = this.elements,
        s = i[0],
        a = i[4],
        o = i[8],
        l = i[12],
        h = i[1],
        c = i[5],
        d = i[9],
        u = i[13],
        p = i[2],
        m = i[6],
        f = i[10],
        g = i[14],
        _ = i[3],
        v = i[7],
        x = i[11],
        y = i[15],
        M = n[0],
        S = n[4],
        b = n[8],
        E = n[12],
        T = n[1],
        w = n[5],
        A = n[9],
        R = n[13],
        C = n[2],
        L = n[6],
        P = n[10],
        U = n[14],
        D = n[3],
        I = n[7],
        N = n[11],
        O = n[15];
      return (
        (r[0] = s * M + a * T + o * C + l * D),
        (r[4] = s * S + a * w + o * L + l * I),
        (r[8] = s * b + a * A + o * P + l * N),
        (r[12] = s * E + a * R + o * U + l * O),
        (r[1] = h * M + c * T + d * C + u * D),
        (r[5] = h * S + c * w + d * L + u * I),
        (r[9] = h * b + c * A + d * P + u * N),
        (r[13] = h * E + c * R + d * U + u * O),
        (r[2] = p * M + m * T + f * C + g * D),
        (r[6] = p * S + m * w + f * L + g * I),
        (r[10] = p * b + m * A + f * P + g * N),
        (r[14] = p * E + m * R + f * U + g * O),
        (r[3] = _ * M + v * T + x * C + y * D),
        (r[7] = _ * S + v * w + x * L + y * I),
        (r[11] = _ * b + v * A + x * P + y * N),
        (r[15] = _ * E + v * R + x * U + y * O),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[4] *= t),
        (e[8] *= t),
        (e[12] *= t),
        (e[1] *= t),
        (e[5] *= t),
        (e[9] *= t),
        (e[13] *= t),
        (e[2] *= t),
        (e[6] *= t),
        (e[10] *= t),
        (e[14] *= t),
        (e[3] *= t),
        (e[7] *= t),
        (e[11] *= t),
        (e[15] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        i = t[4],
        n = t[8],
        r = t[12],
        s = t[1],
        a = t[5],
        o = t[9],
        l = t[13],
        h = t[2],
        c = t[6],
        d = t[10],
        u = t[14];
      return (
        t[3] *
          (+r * o * c -
            n * l * c -
            r * a * d +
            i * l * d +
            n * a * u -
            i * o * u) +
        t[7] *
          (+e * o * u -
            e * l * d +
            r * s * d -
            n * s * u +
            n * l * h -
            r * o * h) +
        t[11] *
          (+e * l * c -
            e * a * u -
            r * s * c +
            i * s * u +
            r * a * h -
            i * l * h) +
        t[15] *
          (-n * a * h -
            e * o * c +
            e * a * d +
            n * s * c -
            i * s * d +
            i * o * h)
      );
    }
    transpose() {
      const t = this.elements;
      let e;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    }
    setPosition(t, e, i) {
      const n = this.elements;
      return (
        t.isVector3
          ? ((n[12] = t.x), (n[13] = t.y), (n[14] = t.z))
          : ((n[12] = t), (n[13] = e), (n[14] = i)),
        this
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        i = t[1],
        n = t[2],
        r = t[3],
        s = t[4],
        a = t[5],
        o = t[6],
        l = t[7],
        h = t[8],
        c = t[9],
        d = t[10],
        u = t[11],
        p = t[12],
        m = t[13],
        f = t[14],
        g = t[15],
        _ =
          c * f * l - m * d * l + m * o * u - a * f * u - c * o * g + a * d * g,
        v =
          p * d * l - h * f * l - p * o * u + s * f * u + h * o * g - s * d * g,
        x =
          h * m * l - p * c * l + p * a * u - s * m * u - h * a * g + s * c * g,
        y =
          p * c * o - h * m * o - p * a * d + s * m * d + h * a * f - s * c * f,
        M = e * _ + i * v + n * x + r * y;
      if (0 === M)
        return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const S = 1 / M;
      return (
        (t[0] = _ * S),
        (t[1] =
          (m * d * r -
            c * f * r -
            m * n * u +
            i * f * u +
            c * n * g -
            i * d * g) *
          S),
        (t[2] =
          (a * f * r -
            m * o * r +
            m * n * l -
            i * f * l -
            a * n * g +
            i * o * g) *
          S),
        (t[3] =
          (c * o * r -
            a * d * r -
            c * n * l +
            i * d * l +
            a * n * u -
            i * o * u) *
          S),
        (t[4] = v * S),
        (t[5] =
          (h * f * r -
            p * d * r +
            p * n * u -
            e * f * u -
            h * n * g +
            e * d * g) *
          S),
        (t[6] =
          (p * o * r -
            s * f * r -
            p * n * l +
            e * f * l +
            s * n * g -
            e * o * g) *
          S),
        (t[7] =
          (s * d * r -
            h * o * r +
            h * n * l -
            e * d * l -
            s * n * u +
            e * o * u) *
          S),
        (t[8] = x * S),
        (t[9] =
          (p * c * r -
            h * m * r -
            p * i * u +
            e * m * u +
            h * i * g -
            e * c * g) *
          S),
        (t[10] =
          (s * m * r -
            p * a * r +
            p * i * l -
            e * m * l -
            s * i * g +
            e * a * g) *
          S),
        (t[11] =
          (h * a * r -
            s * c * r -
            h * i * l +
            e * c * l +
            s * i * u -
            e * a * u) *
          S),
        (t[12] = y * S),
        (t[13] =
          (h * m * n -
            p * c * n +
            p * i * d -
            e * m * d -
            h * i * f +
            e * c * f) *
          S),
        (t[14] =
          (p * a * n -
            s * m * n -
            p * i * o +
            e * m * o +
            s * i * f -
            e * a * f) *
          S),
        (t[15] =
          (s * c * n -
            h * a * n +
            h * i * o -
            e * c * o -
            s * i * d +
            e * a * d) *
          S),
        this
      );
    }
    scale(t) {
      const e = this.elements,
        i = t.x,
        n = t.y,
        r = t.z;
      return (
        (e[0] *= i),
        (e[4] *= n),
        (e[8] *= r),
        (e[1] *= i),
        (e[5] *= n),
        (e[9] *= r),
        (e[2] *= i),
        (e[6] *= n),
        (e[10] *= r),
        (e[3] *= i),
        (e[7] *= n),
        (e[11] *= r),
        this
      );
    }
    getMaxScaleOnAxis() {
      const t = this.elements,
        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
        i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
        n = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, i, n));
    }
    makeTranslation(t, e, i) {
      return (
        t.isVector3
          ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1)
          : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1),
        this
      );
    }
    makeRotationX(t) {
      const e = Math.cos(t),
        i = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(t) {
      const e = Math.cos(t),
        i = Math.sin(t);
      return this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(t) {
      const e = Math.cos(t),
        i = Math.sin(t);
      return this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(t, e) {
      const i = Math.cos(e),
        n = Math.sin(e),
        r = 1 - i,
        s = t.x,
        a = t.y,
        o = t.z,
        l = r * s,
        h = r * a;
      return (
        this.set(
          l * s + i,
          l * a - n * o,
          l * o + n * a,
          0,
          l * a + n * o,
          h * a + i,
          h * o - n * s,
          0,
          l * o - n * a,
          h * o + n * s,
          r * o * o + i,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    makeScale(t, e, i) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
    }
    makeShear(t, e, i, n, r, s) {
      return this.set(1, i, r, 0, t, 1, s, 0, e, n, 1, 0, 0, 0, 0, 1), this;
    }
    compose(t, e, i) {
      const n = this.elements,
        r = e._x,
        s = e._y,
        a = e._z,
        o = e._w,
        l = r + r,
        h = s + s,
        c = a + a,
        d = r * l,
        u = r * h,
        p = r * c,
        m = s * h,
        f = s * c,
        g = a * c,
        _ = o * l,
        v = o * h,
        x = o * c,
        y = i.x,
        M = i.y,
        S = i.z;
      return (
        (n[0] = (1 - (m + g)) * y),
        (n[1] = (u + x) * y),
        (n[2] = (p - v) * y),
        (n[3] = 0),
        (n[4] = (u - x) * M),
        (n[5] = (1 - (d + g)) * M),
        (n[6] = (f + _) * M),
        (n[7] = 0),
        (n[8] = (p + v) * S),
        (n[9] = (f - _) * S),
        (n[10] = (1 - (d + m)) * S),
        (n[11] = 0),
        (n[12] = t.x),
        (n[13] = t.y),
        (n[14] = t.z),
        (n[15] = 1),
        this
      );
    }
    decompose(t, e, i) {
      const n = this.elements;
      let r = xe.set(n[0], n[1], n[2]).length();
      const s = xe.set(n[4], n[5], n[6]).length(),
        a = xe.set(n[8], n[9], n[10]).length();
      this.determinant() < 0 && (r = -r),
        (t.x = n[12]),
        (t.y = n[13]),
        (t.z = n[14]),
        ye.copy(this);
      const o = 1 / r,
        l = 1 / s,
        h = 1 / a;
      return (
        (ye.elements[0] *= o),
        (ye.elements[1] *= o),
        (ye.elements[2] *= o),
        (ye.elements[4] *= l),
        (ye.elements[5] *= l),
        (ye.elements[6] *= l),
        (ye.elements[8] *= h),
        (ye.elements[9] *= h),
        (ye.elements[10] *= h),
        e.setFromRotationMatrix(ye),
        (i.x = r),
        (i.y = s),
        (i.z = a),
        this
      );
    }
    makePerspective(t, e, i, n, r, s, a = 2e3) {
      const o = this.elements,
        l = (2 * r) / (e - t),
        h = (2 * r) / (i - n),
        c = (e + t) / (e - t),
        d = (i + n) / (i - n);
      let u, p;
      if (a === et) (u = -(s + r) / (s - r)), (p = (-2 * s * r) / (s - r));
      else {
        if (a !== it)
          throw new Error(
            "THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a
          );
        (u = -s / (s - r)), (p = (-s * r) / (s - r));
      }
      return (
        (o[0] = l),
        (o[4] = 0),
        (o[8] = c),
        (o[12] = 0),
        (o[1] = 0),
        (o[5] = h),
        (o[9] = d),
        (o[13] = 0),
        (o[2] = 0),
        (o[6] = 0),
        (o[10] = u),
        (o[14] = p),
        (o[3] = 0),
        (o[7] = 0),
        (o[11] = -1),
        (o[15] = 0),
        this
      );
    }
    makeOrthographic(t, e, i, n, r, s, a = 2e3) {
      const o = this.elements,
        l = 1 / (e - t),
        h = 1 / (i - n),
        c = 1 / (s - r),
        d = (e + t) * l,
        u = (i + n) * h;
      let p, m;
      if (a === et) (p = (s + r) * c), (m = -2 * c);
      else {
        if (a !== it)
          throw new Error(
            "THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a
          );
        (p = r * c), (m = -1 * c);
      }
      return (
        (o[0] = 2 * l),
        (o[4] = 0),
        (o[8] = 0),
        (o[12] = -d),
        (o[1] = 0),
        (o[5] = 2 * h),
        (o[9] = 0),
        (o[13] = -u),
        (o[2] = 0),
        (o[6] = 0),
        (o[10] = m),
        (o[14] = -p),
        (o[3] = 0),
        (o[7] = 0),
        (o[11] = 0),
        (o[15] = 1),
        this
      );
    }
    equals(t) {
      const e = this.elements,
        i = t.elements;
      for (let t = 0; t < 16; t++) if (e[t] !== i[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 16; i++) this.elements[i] = t[i + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const i = this.elements;
      return (
        (t[e] = i[0]),
        (t[e + 1] = i[1]),
        (t[e + 2] = i[2]),
        (t[e + 3] = i[3]),
        (t[e + 4] = i[4]),
        (t[e + 5] = i[5]),
        (t[e + 6] = i[6]),
        (t[e + 7] = i[7]),
        (t[e + 8] = i[8]),
        (t[e + 9] = i[9]),
        (t[e + 10] = i[10]),
        (t[e + 11] = i[11]),
        (t[e + 12] = i[12]),
        (t[e + 13] = i[13]),
        (t[e + 14] = i[14]),
        (t[e + 15] = i[15]),
        t
      );
    }
  }
  const xe = new Ht(),
    ye = new ve(),
    Me = new Ht(0, 0, 0),
    Se = new Ht(1, 1, 1),
    be = new Ht(),
    Ee = new Ht(),
    Te = new Ht(),
    we = new ve(),
    Ae = new Vt();
  class Re {
    constructor(t = 0, e = 0, i = 0, n = Re.DEFAULT_ORDER) {
      (this.isEuler = !0),
        (this._x = t),
        (this._y = e),
        (this._z = i),
        (this._order = n);
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(t) {
      (this._order = t), this._onChangeCallback();
    }
    set(t, e, i, n = this._order) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = i),
        (this._order = n),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return (
        (this._x = t._x),
        (this._y = t._y),
        (this._z = t._z),
        (this._order = t._order),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t, e = this._order, i = !0) {
      const n = t.elements,
        r = n[0],
        s = n[4],
        a = n[8],
        o = n[1],
        l = n[5],
        h = n[9],
        c = n[2],
        d = n[6],
        u = n[10];
      switch (e) {
        case "XYZ":
          (this._y = Math.asin(lt(a, -1, 1))),
            Math.abs(a) < 0.9999999
              ? ((this._x = Math.atan2(-h, u)), (this._z = Math.atan2(-s, r)))
              : ((this._x = Math.atan2(d, l)), (this._z = 0));
          break;
        case "YXZ":
          (this._x = Math.asin(-lt(h, -1, 1))),
            Math.abs(h) < 0.9999999
              ? ((this._y = Math.atan2(a, u)), (this._z = Math.atan2(o, l)))
              : ((this._y = Math.atan2(-c, r)), (this._z = 0));
          break;
        case "ZXY":
          (this._x = Math.asin(lt(d, -1, 1))),
            Math.abs(d) < 0.9999999
              ? ((this._y = Math.atan2(-c, u)), (this._z = Math.atan2(-s, l)))
              : ((this._y = 0), (this._z = Math.atan2(o, r)));
          break;
        case "ZYX":
          (this._y = Math.asin(-lt(c, -1, 1))),
            Math.abs(c) < 0.9999999
              ? ((this._x = Math.atan2(d, u)), (this._z = Math.atan2(o, r)))
              : ((this._x = 0), (this._z = Math.atan2(-s, l)));
          break;
        case "YZX":
          (this._z = Math.asin(lt(o, -1, 1))),
            Math.abs(o) < 0.9999999
              ? ((this._x = Math.atan2(-h, l)), (this._y = Math.atan2(-c, r)))
              : ((this._x = 0), (this._y = Math.atan2(a, u)));
          break;
        case "XZY":
          (this._z = Math.asin(-lt(s, -1, 1))),
            Math.abs(s) < 0.9999999
              ? ((this._x = Math.atan2(d, l)), (this._y = Math.atan2(a, r)))
              : ((this._x = Math.atan2(-h, u)), (this._y = 0));
          break;
        default:
          console.warn(
            "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
              e
          );
      }
      return (this._order = e), !0 === i && this._onChangeCallback(), this;
    }
    setFromQuaternion(t, e, i) {
      return (
        we.makeRotationFromQuaternion(t), this.setFromRotationMatrix(we, e, i)
      );
    }
    setFromVector3(t, e = this._order) {
      return this.set(t.x, t.y, t.z, e);
    }
    reorder(t) {
      return Ae.setFromEuler(this), this.setFromQuaternion(Ae, t);
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._order === this._order
      );
    }
    fromArray(t) {
      return (
        (this._x = t[0]),
        (this._y = t[1]),
        (this._z = t[2]),
        void 0 !== t[3] && (this._order = t[3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._order),
        t
      );
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order;
    }
  }
  Re.DEFAULT_ORDER = "XYZ";
  class Ce {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = ((1 << t) | 0) >>> 0;
    }
    enable(t) {
      this.mask |= (1 << t) | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= (1 << t) | 0;
    }
    disable(t) {
      this.mask &= ~((1 << t) | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return 0 != (this.mask & t.mask);
    }
    isEnabled(t) {
      return 0 != (this.mask & ((1 << t) | 0));
    }
  }
  let Le = 0;
  const Pe = new Ht(),
    Ue = new Vt(),
    De = new ve(),
    Ie = new Ht(),
    Ne = new Ht(),
    Oe = new Ht(),
    Fe = new Vt(),
    ze = new Ht(1, 0, 0),
    Be = new Ht(0, 1, 0),
    ke = new Ht(0, 0, 1),
    Ve = { type: "added" },
    He = { type: "removed" };
  class Ge extends nt {
    constructor() {
      super(),
        (this.isObject3D = !0),
        Object.defineProperty(this, "id", { value: Le++ }),
        (this.uuid = ot()),
        (this.name = ""),
        (this.type = "Object3D"),
        (this.parent = null),
        (this.children = []),
        (this.up = Ge.DEFAULT_UP.clone());
      const t = new Ht(),
        e = new Re(),
        i = new Vt(),
        n = new Ht(1, 1, 1);
      e._onChange(function () {
        i.setFromEuler(e, !1);
      }),
        i._onChange(function () {
          e.setFromQuaternion(i, void 0, !1);
        }),
        Object.defineProperties(this, {
          position: { configurable: !0, enumerable: !0, value: t },
          rotation: { configurable: !0, enumerable: !0, value: e },
          quaternion: { configurable: !0, enumerable: !0, value: i },
          scale: { configurable: !0, enumerable: !0, value: n },
          modelViewMatrix: { value: new ve() },
          normalMatrix: { value: new ft() },
        }),
        (this.matrix = new ve()),
        (this.matrixWorld = new ve()),
        (this.matrixAutoUpdate = Ge.DEFAULT_MATRIX_AUTO_UPDATE),
        (this.matrixWorldAutoUpdate = Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
        (this.matrixWorldNeedsUpdate = !1),
        (this.layers = new Ce()),
        (this.visible = !0),
        (this.castShadow = !1),
        (this.receiveShadow = !1),
        (this.frustumCulled = !0),
        (this.renderOrder = 0),
        (this.animations = []),
        (this.userData = {});
    }
    onBeforeShadow() {}
    onAfterShadow() {}
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(t) {
      this.matrixAutoUpdate && this.updateMatrix(),
        this.matrix.premultiply(t),
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(t) {
      return this.quaternion.premultiply(t), this;
    }
    setRotationFromAxisAngle(t, e) {
      this.quaternion.setFromAxisAngle(t, e);
    }
    setRotationFromEuler(t) {
      this.quaternion.setFromEuler(t, !0);
    }
    setRotationFromMatrix(t) {
      this.quaternion.setFromRotationMatrix(t);
    }
    setRotationFromQuaternion(t) {
      this.quaternion.copy(t);
    }
    rotateOnAxis(t, e) {
      return Ue.setFromAxisAngle(t, e), this.quaternion.multiply(Ue), this;
    }
    rotateOnWorldAxis(t, e) {
      return Ue.setFromAxisAngle(t, e), this.quaternion.premultiply(Ue), this;
    }
    rotateX(t) {
      return this.rotateOnAxis(ze, t);
    }
    rotateY(t) {
      return this.rotateOnAxis(Be, t);
    }
    rotateZ(t) {
      return this.rotateOnAxis(ke, t);
    }
    translateOnAxis(t, e) {
      return (
        Pe.copy(t).applyQuaternion(this.quaternion),
        this.position.add(Pe.multiplyScalar(e)),
        this
      );
    }
    translateX(t) {
      return this.translateOnAxis(ze, t);
    }
    translateY(t) {
      return this.translateOnAxis(Be, t);
    }
    translateZ(t) {
      return this.translateOnAxis(ke, t);
    }
    localToWorld(t) {
      return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        t.applyMatrix4(De.copy(this.matrixWorld).invert())
      );
    }
    lookAt(t, e, i) {
      t.isVector3 ? Ie.copy(t) : Ie.set(t, e, i);
      const n = this.parent;
      this.updateWorldMatrix(!0, !1),
        Ne.setFromMatrixPosition(this.matrixWorld),
        this.isCamera || this.isLight
          ? De.lookAt(Ne, Ie, this.up)
          : De.lookAt(Ie, Ne, this.up),
        this.quaternion.setFromRotationMatrix(De),
        n &&
          (De.extractRotation(n.matrixWorld),
          Ue.setFromRotationMatrix(De),
          this.quaternion.premultiply(Ue.invert()));
    }
    add(t) {
      if (arguments.length > 1) {
        for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
        return this;
      }
      return t === this
        ? (console.error(
            "THREE.Object3D.add: object can't be added as a child of itself.",
            t
          ),
          this)
        : (t && t.isObject3D
            ? (null !== t.parent && t.parent.remove(t),
              (t.parent = this),
              this.children.push(t),
              t.dispatchEvent(Ve))
            : console.error(
                "THREE.Object3D.add: object not an instance of THREE.Object3D.",
                t
              ),
          this);
    }
    remove(t) {
      if (arguments.length > 1) {
        for (let t = 0; t < arguments.length; t++) this.remove(arguments[t]);
        return this;
      }
      const e = this.children.indexOf(t);
      return (
        -1 !== e &&
          ((t.parent = null), this.children.splice(e, 1), t.dispatchEvent(He)),
        this
      );
    }
    removeFromParent() {
      const t = this.parent;
      return null !== t && t.remove(this), this;
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        De.copy(this.matrixWorld).invert(),
        null !== t.parent &&
          (t.parent.updateWorldMatrix(!0, !1),
          De.multiply(t.parent.matrixWorld)),
        t.applyMatrix4(De),
        this.add(t),
        t.updateWorldMatrix(!1, !0),
        this
      );
    }
    getObjectById(t) {
      return this.getObjectByProperty("id", t);
    }
    getObjectByName(t) {
      return this.getObjectByProperty("name", t);
    }
    getObjectByProperty(t, e) {
      if (this[t] === e) return this;
      for (let i = 0, n = this.children.length; i < n; i++) {
        const n = this.children[i].getObjectByProperty(t, e);
        if (void 0 !== n) return n;
      }
    }
    getObjectsByProperty(t, e, i = []) {
      this[t] === e && i.push(this);
      const n = this.children;
      for (let r = 0, s = n.length; r < s; r++)
        n[r].getObjectsByProperty(t, e, i);
      return i;
    }
    getWorldPosition(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        t.setFromMatrixPosition(this.matrixWorld)
      );
    }
    getWorldQuaternion(t) {
      return (
        this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ne, t, Oe), t
      );
    }
    getWorldScale(t) {
      return (
        this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ne, Fe, t), t
      );
    }
    getWorldDirection(t) {
      this.updateWorldMatrix(!0, !1);
      const e = this.matrixWorld.elements;
      return t.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {}
    traverse(t) {
      t(this);
      const e = this.children;
      for (let i = 0, n = e.length; i < n; i++) e[i].traverse(t);
    }
    traverseVisible(t) {
      if (!1 === this.visible) return;
      t(this);
      const e = this.children;
      for (let i = 0, n = e.length; i < n; i++) e[i].traverseVisible(t);
    }
    traverseAncestors(t) {
      const e = this.parent;
      null !== e && (t(e), e.traverseAncestors(t));
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale),
        (this.matrixWorldNeedsUpdate = !0);
    }
    updateMatrixWorld(t) {
      this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || t) &&
          (null === this.parent
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix
              ),
          (this.matrixWorldNeedsUpdate = !1),
          (t = !0));
      const e = this.children;
      for (let i = 0, n = e.length; i < n; i++) {
        const n = e[i];
        (!0 !== n.matrixWorldAutoUpdate && !0 !== t) || n.updateMatrixWorld(t);
      }
    }
    updateWorldMatrix(t, e) {
      const i = this.parent;
      if (
        (!0 === t &&
          null !== i &&
          !0 === i.matrixWorldAutoUpdate &&
          i.updateWorldMatrix(!0, !1),
        this.matrixAutoUpdate && this.updateMatrix(),
        null === this.parent
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix
            ),
        !0 === e)
      ) {
        const t = this.children;
        for (let e = 0, i = t.length; e < i; e++) {
          const i = t[e];
          !0 === i.matrixWorldAutoUpdate && i.updateWorldMatrix(!1, !0);
        }
      }
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t,
        i = {};
      e &&
        ((t = {
          geometries: {},
          materials: {},
          textures: {},
          images: {},
          shapes: {},
          skeletons: {},
          animations: {},
          nodes: {},
        }),
        (i.metadata = {
          version: 4.6,
          type: "Object",
          generator: "Object3D.toJSON",
        }));
      const n = {};
      function r(e, i) {
        return void 0 === e[i.uuid] && (e[i.uuid] = i.toJSON(t)), i.uuid;
      }
      if (
        ((n.uuid = this.uuid),
        (n.type = this.type),
        "" !== this.name && (n.name = this.name),
        !0 === this.castShadow && (n.castShadow = !0),
        !0 === this.receiveShadow && (n.receiveShadow = !0),
        !1 === this.visible && (n.visible = !1),
        !1 === this.frustumCulled && (n.frustumCulled = !1),
        0 !== this.renderOrder && (n.renderOrder = this.renderOrder),
        Object.keys(this.userData).length > 0 && (n.userData = this.userData),
        (n.layers = this.layers.mask),
        (n.matrix = this.matrix.toArray()),
        (n.up = this.up.toArray()),
        !1 === this.matrixAutoUpdate && (n.matrixAutoUpdate = !1),
        this.isInstancedMesh &&
          ((n.type = "InstancedMesh"),
          (n.count = this.count),
          (n.instanceMatrix = this.instanceMatrix.toJSON()),
          null !== this.instanceColor &&
            (n.instanceColor = this.instanceColor.toJSON())),
        this.isBatchedMesh &&
          ((n.type = "BatchedMesh"),
          (n.perObjectFrustumCulled = this.perObjectFrustumCulled),
          (n.sortObjects = this.sortObjects),
          (n.drawRanges = this._drawRanges),
          (n.reservedRanges = this._reservedRanges),
          (n.visibility = this._visibility),
          (n.active = this._active),
          (n.bounds = this._bounds.map((t) => ({
            boxInitialized: t.boxInitialized,
            boxMin: t.box.min.toArray(),
            boxMax: t.box.max.toArray(),
            sphereInitialized: t.sphereInitialized,
            sphereRadius: t.sphere.radius,
            sphereCenter: t.sphere.center.toArray(),
          }))),
          (n.maxGeometryCount = this._maxGeometryCount),
          (n.maxVertexCount = this._maxVertexCount),
          (n.maxIndexCount = this._maxIndexCount),
          (n.geometryInitialized = this._geometryInitialized),
          (n.geometryCount = this._geometryCount),
          (n.matricesTexture = this._matricesTexture.toJSON(t)),
          null !== this.boundingSphere &&
            (n.boundingSphere = {
              center: n.boundingSphere.center.toArray(),
              radius: n.boundingSphere.radius,
            }),
          null !== this.boundingBox &&
            (n.boundingBox = {
              min: n.boundingBox.min.toArray(),
              max: n.boundingBox.max.toArray(),
            })),
        this.isScene)
      )
        this.background &&
          (this.background.isColor
            ? (n.background = this.background.toJSON())
            : this.background.isTexture &&
              (n.background = this.background.toJSON(t).uuid)),
          this.environment &&
            this.environment.isTexture &&
            !0 !== this.environment.isRenderTargetTexture &&
            (n.environment = this.environment.toJSON(t).uuid);
      else if (this.isMesh || this.isLine || this.isPoints) {
        n.geometry = r(t.geometries, this.geometry);
        const e = this.geometry.parameters;
        if (void 0 !== e && void 0 !== e.shapes) {
          const i = e.shapes;
          if (Array.isArray(i))
            for (let e = 0, n = i.length; e < n; e++) {
              const n = i[e];
              r(t.shapes, n);
            }
          else r(t.shapes, i);
        }
      }
      if (
        (this.isSkinnedMesh &&
          ((n.bindMode = this.bindMode),
          (n.bindMatrix = this.bindMatrix.toArray()),
          void 0 !== this.skeleton &&
            (r(t.skeletons, this.skeleton), (n.skeleton = this.skeleton.uuid))),
        void 0 !== this.material)
      )
        if (Array.isArray(this.material)) {
          const e = [];
          for (let i = 0, n = this.material.length; i < n; i++)
            e.push(r(t.materials, this.material[i]));
          n.material = e;
        } else n.material = r(t.materials, this.material);
      if (this.children.length > 0) {
        n.children = [];
        for (let e = 0; e < this.children.length; e++)
          n.children.push(this.children[e].toJSON(t).object);
      }
      if (this.animations.length > 0) {
        n.animations = [];
        for (let e = 0; e < this.animations.length; e++) {
          const i = this.animations[e];
          n.animations.push(r(t.animations, i));
        }
      }
      if (e) {
        const e = s(t.geometries),
          n = s(t.materials),
          r = s(t.textures),
          a = s(t.images),
          o = s(t.shapes),
          l = s(t.skeletons),
          h = s(t.animations),
          c = s(t.nodes);
        e.length > 0 && (i.geometries = e),
          n.length > 0 && (i.materials = n),
          r.length > 0 && (i.textures = r),
          a.length > 0 && (i.images = a),
          o.length > 0 && (i.shapes = o),
          l.length > 0 && (i.skeletons = l),
          h.length > 0 && (i.animations = h),
          c.length > 0 && (i.nodes = c);
      }
      return (i.object = n), i;
      function s(t) {
        const e = [];
        for (const i in t) {
          const n = t[i];
          delete n.metadata, e.push(n);
        }
        return e;
      }
    }
    clone(t) {
      return new this.constructor().copy(this, t);
    }
    copy(t, e = !0) {
      if (
        ((this.name = t.name),
        this.up.copy(t.up),
        this.position.copy(t.position),
        (this.rotation.order = t.rotation.order),
        this.quaternion.copy(t.quaternion),
        this.scale.copy(t.scale),
        this.matrix.copy(t.matrix),
        this.matrixWorld.copy(t.matrixWorld),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
        (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
        (this.layers.mask = t.layers.mask),
        (this.visible = t.visible),
        (this.castShadow = t.castShadow),
        (this.receiveShadow = t.receiveShadow),
        (this.frustumCulled = t.frustumCulled),
        (this.renderOrder = t.renderOrder),
        (this.animations = t.animations.slice()),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        !0 === e)
      )
        for (let e = 0; e < t.children.length; e++) {
          const i = t.children[e];
          this.add(i.clone());
        }
      return this;
    }
  }
  (Ge.DEFAULT_UP = new Ht(0, 1, 0)),
    (Ge.DEFAULT_MATRIX_AUTO_UPDATE = !0),
    (Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0);
  const We = new Ht(),
    je = new Ht(),
    Xe = new Ht(),
    qe = new Ht(),
    Ye = new Ht(),
    Ke = new Ht(),
    Ze = new Ht(),
    Je = new Ht(),
    Qe = new Ht(),
    $e = new Ht();
  let ti = !1;
  class ei {
    constructor(t = new Ht(), e = new Ht(), i = new Ht()) {
      (this.a = t), (this.b = e), (this.c = i);
    }
    static getNormal(t, e, i, n) {
      n.subVectors(i, e), We.subVectors(t, e), n.cross(We);
      const r = n.lengthSq();
      return r > 0 ? n.multiplyScalar(1 / Math.sqrt(r)) : n.set(0, 0, 0);
    }
    static getBarycoord(t, e, i, n, r) {
      We.subVectors(n, e), je.subVectors(i, e), Xe.subVectors(t, e);
      const s = We.dot(We),
        a = We.dot(je),
        o = We.dot(Xe),
        l = je.dot(je),
        h = je.dot(Xe),
        c = s * l - a * a;
      if (0 === c) return r.set(-2, -1, -1);
      const d = 1 / c,
        u = (l * o - a * h) * d,
        p = (s * h - a * o) * d;
      return r.set(1 - u - p, p, u);
    }
    static containsPoint(t, e, i, n) {
      return (
        this.getBarycoord(t, e, i, n, qe),
        qe.x >= 0 && qe.y >= 0 && qe.x + qe.y <= 1
      );
    }
    static getUV(t, e, i, n, r, s, a, o) {
      return (
        !1 === ti &&
          (console.warn(
            "THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."
          ),
          (ti = !0)),
        this.getInterpolation(t, e, i, n, r, s, a, o)
      );
    }
    static getInterpolation(t, e, i, n, r, s, a, o) {
      return (
        this.getBarycoord(t, e, i, n, qe),
        o.setScalar(0),
        o.addScaledVector(r, qe.x),
        o.addScaledVector(s, qe.y),
        o.addScaledVector(a, qe.z),
        o
      );
    }
    static isFrontFacing(t, e, i, n) {
      return We.subVectors(i, e), je.subVectors(t, e), We.cross(je).dot(n) < 0;
    }
    set(t, e, i) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(i), this;
    }
    setFromPointsAndIndices(t, e, i, n) {
      return this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[n]), this;
    }
    setFromAttributeAndIndices(t, e, i, n) {
      return (
        this.a.fromBufferAttribute(t, e),
        this.b.fromBufferAttribute(t, i),
        this.c.fromBufferAttribute(t, n),
        this
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
    }
    getArea() {
      return (
        We.subVectors(this.c, this.b),
        je.subVectors(this.a, this.b),
        0.5 * We.cross(je).length()
      );
    }
    getMidpoint(t) {
      return t
        .addVectors(this.a, this.b)
        .add(this.c)
        .multiplyScalar(1 / 3);
    }
    getNormal(t) {
      return ei.getNormal(this.a, this.b, this.c, t);
    }
    getPlane(t) {
      return t.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(t, e) {
      return ei.getBarycoord(t, this.a, this.b, this.c, e);
    }
    getUV(t, e, i, n, r) {
      return (
        !1 === ti &&
          (console.warn(
            "THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."
          ),
          (ti = !0)),
        ei.getInterpolation(t, this.a, this.b, this.c, e, i, n, r)
      );
    }
    getInterpolation(t, e, i, n, r) {
      return ei.getInterpolation(t, this.a, this.b, this.c, e, i, n, r);
    }
    containsPoint(t) {
      return ei.containsPoint(t, this.a, this.b, this.c);
    }
    isFrontFacing(t) {
      return ei.isFrontFacing(this.a, this.b, this.c, t);
    }
    intersectsBox(t) {
      return t.intersectsTriangle(this);
    }
    closestPointToPoint(t, e) {
      const i = this.a,
        n = this.b,
        r = this.c;
      let s, a;
      Ye.subVectors(n, i), Ke.subVectors(r, i), Je.subVectors(t, i);
      const o = Ye.dot(Je),
        l = Ke.dot(Je);
      if (o <= 0 && l <= 0) return e.copy(i);
      Qe.subVectors(t, n);
      const h = Ye.dot(Qe),
        c = Ke.dot(Qe);
      if (h >= 0 && c <= h) return e.copy(n);
      const d = o * c - h * l;
      if (d <= 0 && o >= 0 && h <= 0)
        return (s = o / (o - h)), e.copy(i).addScaledVector(Ye, s);
      $e.subVectors(t, r);
      const u = Ye.dot($e),
        p = Ke.dot($e);
      if (p >= 0 && u <= p) return e.copy(r);
      const m = u * l - o * p;
      if (m <= 0 && l >= 0 && p <= 0)
        return (a = l / (l - p)), e.copy(i).addScaledVector(Ke, a);
      const f = h * p - u * c;
      if (f <= 0 && c - h >= 0 && u - p >= 0)
        return (
          Ze.subVectors(r, n),
          (a = (c - h) / (c - h + (u - p))),
          e.copy(n).addScaledVector(Ze, a)
        );
      const g = 1 / (f + m + d);
      return (
        (s = m * g),
        (a = d * g),
        e.copy(i).addScaledVector(Ye, s).addScaledVector(Ke, a)
      );
    }
    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
    }
  }
  const ii = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    },
    ni = { h: 0, s: 0, l: 0 },
    ri = { h: 0, s: 0, l: 0 };
  function si(t, e, i) {
    return (
      i < 0 && (i += 1),
      i > 1 && (i -= 1),
      i < 1 / 6
        ? t + 6 * (e - t) * i
        : i < 0.5
        ? e
        : i < 2 / 3
        ? t + 6 * (e - t) * (2 / 3 - i)
        : t
    );
  }
  class ai {
    constructor(t, e, i) {
      return (
        (this.isColor = !0),
        (this.r = 1),
        (this.g = 1),
        (this.b = 1),
        this.set(t, e, i)
      );
    }
    set(t, e, i) {
      if (void 0 === e && void 0 === i) {
        const e = t;
        e && e.isColor
          ? this.copy(e)
          : "number" == typeof e
          ? this.setHex(e)
          : "string" == typeof e && this.setStyle(e);
      } else this.setRGB(t, e, i);
      return this;
    }
    setScalar(t) {
      return (this.r = t), (this.g = t), (this.b = t), this;
    }
    setHex(t, e = W) {
      return (
        (t = Math.floor(t)),
        (this.r = ((t >> 16) & 255) / 255),
        (this.g = ((t >> 8) & 255) / 255),
        (this.b = (255 & t) / 255),
        wt.toWorkingColorSpace(this, e),
        this
      );
    }
    setRGB(t, e, i, n = wt.workingColorSpace) {
      return (
        (this.r = t),
        (this.g = e),
        (this.b = i),
        wt.toWorkingColorSpace(this, n),
        this
      );
    }
    setHSL(t, e, i, n = wt.workingColorSpace) {
      if (
        ((t = ((t % (r = 1)) + r) % r),
        (e = lt(e, 0, 1)),
        (i = lt(i, 0, 1)),
        0 === e)
      )
        this.r = this.g = this.b = i;
      else {
        const n = i <= 0.5 ? i * (1 + e) : i + e - i * e,
          r = 2 * i - n;
        (this.r = si(r, n, t + 1 / 3)),
          (this.g = si(r, n, t)),
          (this.b = si(r, n, t - 1 / 3));
      }
      var r;
      return wt.toWorkingColorSpace(this, n), this;
    }
    setStyle(t, e = W) {
      function i(e) {
        void 0 !== e &&
          parseFloat(e) < 1 &&
          console.warn(
            "THREE.Color: Alpha component of " + t + " will be ignored."
          );
      }
      let n;
      if ((n = /^(\w+)\(([^\)]*)\)/.exec(t))) {
        let r;
        const s = n[1],
          a = n[2];
        switch (s) {
          case "rgb":
          case "rgba":
            if (
              (r =
                /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  a
                ))
            )
              return (
                i(r[4]),
                this.setRGB(
                  Math.min(255, parseInt(r[1], 10)) / 255,
                  Math.min(255, parseInt(r[2], 10)) / 255,
                  Math.min(255, parseInt(r[3], 10)) / 255,
                  e
                )
              );
            if (
              (r =
                /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  a
                ))
            )
              return (
                i(r[4]),
                this.setRGB(
                  Math.min(100, parseInt(r[1], 10)) / 100,
                  Math.min(100, parseInt(r[2], 10)) / 100,
                  Math.min(100, parseInt(r[3], 10)) / 100,
                  e
                )
              );
            break;
          case "hsl":
          case "hsla":
            if (
              (r =
                /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  a
                ))
            )
              return (
                i(r[4]),
                this.setHSL(
                  parseFloat(r[1]) / 360,
                  parseFloat(r[2]) / 100,
                  parseFloat(r[3]) / 100,
                  e
                )
              );
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + t);
        }
      } else if ((n = /^\#([A-Fa-f\d]+)$/.exec(t))) {
        const i = n[1],
          r = i.length;
        if (3 === r)
          return this.setRGB(
            parseInt(i.charAt(0), 16) / 15,
            parseInt(i.charAt(1), 16) / 15,
            parseInt(i.charAt(2), 16) / 15,
            e
          );
        if (6 === r) return this.setHex(parseInt(i, 16), e);
        console.warn("THREE.Color: Invalid hex color " + t);
      } else if (t && t.length > 0) return this.setColorName(t, e);
      return this;
    }
    setColorName(t, e = W) {
      const i = ii[t.toLowerCase()];
      return (
        void 0 !== i
          ? this.setHex(i, e)
          : console.warn("THREE.Color: Unknown color " + t),
        this
      );
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(t) {
      return (this.r = t.r), (this.g = t.g), (this.b = t.b), this;
    }
    copySRGBToLinear(t) {
      return (this.r = At(t.r)), (this.g = At(t.g)), (this.b = At(t.b)), this;
    }
    copyLinearToSRGB(t) {
      return (this.r = Rt(t.r)), (this.g = Rt(t.g)), (this.b = Rt(t.b)), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex(t = W) {
      return (
        wt.fromWorkingColorSpace(oi.copy(this), t),
        65536 * Math.round(lt(255 * oi.r, 0, 255)) +
          256 * Math.round(lt(255 * oi.g, 0, 255)) +
          Math.round(lt(255 * oi.b, 0, 255))
      );
    }
    getHexString(t = W) {
      return ("000000" + this.getHex(t).toString(16)).slice(-6);
    }
    getHSL(t, e = wt.workingColorSpace) {
      wt.fromWorkingColorSpace(oi.copy(this), e);
      const i = oi.r,
        n = oi.g,
        r = oi.b,
        s = Math.max(i, n, r),
        a = Math.min(i, n, r);
      let o, l;
      const h = (a + s) / 2;
      if (a === s) (o = 0), (l = 0);
      else {
        const t = s - a;
        switch (((l = h <= 0.5 ? t / (s + a) : t / (2 - s - a)), s)) {
          case i:
            o = (n - r) / t + (n < r ? 6 : 0);
            break;
          case n:
            o = (r - i) / t + 2;
            break;
          case r:
            o = (i - n) / t + 4;
        }
        o /= 6;
      }
      return (t.h = o), (t.s = l), (t.l = h), t;
    }
    getRGB(t, e = wt.workingColorSpace) {
      return (
        wt.fromWorkingColorSpace(oi.copy(this), e),
        (t.r = oi.r),
        (t.g = oi.g),
        (t.b = oi.b),
        t
      );
    }
    getStyle(t = W) {
      wt.fromWorkingColorSpace(oi.copy(this), t);
      const e = oi.r,
        i = oi.g,
        n = oi.b;
      return t !== W
        ? `color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`
        : `rgb(${Math.round(255 * e)},${Math.round(255 * i)},${Math.round(
            255 * n
          )})`;
    }
    offsetHSL(t, e, i) {
      return this.getHSL(ni), this.setHSL(ni.h + t, ni.s + e, ni.l + i);
    }
    add(t) {
      return (this.r += t.r), (this.g += t.g), (this.b += t.b), this;
    }
    addColors(t, e) {
      return (
        (this.r = t.r + e.r), (this.g = t.g + e.g), (this.b = t.b + e.b), this
      );
    }
    addScalar(t) {
      return (this.r += t), (this.g += t), (this.b += t), this;
    }
    sub(t) {
      return (
        (this.r = Math.max(0, this.r - t.r)),
        (this.g = Math.max(0, this.g - t.g)),
        (this.b = Math.max(0, this.b - t.b)),
        this
      );
    }
    multiply(t) {
      return (this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this;
    }
    multiplyScalar(t) {
      return (this.r *= t), (this.g *= t), (this.b *= t), this;
    }
    lerp(t, e) {
      return (
        (this.r += (t.r - this.r) * e),
        (this.g += (t.g - this.g) * e),
        (this.b += (t.b - this.b) * e),
        this
      );
    }
    lerpColors(t, e, i) {
      return (
        (this.r = t.r + (e.r - t.r) * i),
        (this.g = t.g + (e.g - t.g) * i),
        (this.b = t.b + (e.b - t.b) * i),
        this
      );
    }
    lerpHSL(t, e) {
      this.getHSL(ni), t.getHSL(ri);
      const i = ht(ni.h, ri.h, e),
        n = ht(ni.s, ri.s, e),
        r = ht(ni.l, ri.l, e);
      return this.setHSL(i, n, r), this;
    }
    setFromVector3(t) {
      return (this.r = t.x), (this.g = t.y), (this.b = t.z), this;
    }
    applyMatrix3(t) {
      const e = this.r,
        i = this.g,
        n = this.b,
        r = t.elements;
      return (
        (this.r = r[0] * e + r[3] * i + r[6] * n),
        (this.g = r[1] * e + r[4] * i + r[7] * n),
        (this.b = r[2] * e + r[5] * i + r[8] * n),
        this
      );
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }
    fromArray(t, e = 0) {
      return (this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t;
    }
    fromBufferAttribute(t, e) {
      return (
        (this.r = t.getX(e)), (this.g = t.getY(e)), (this.b = t.getZ(e)), this
      );
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r, yield this.g, yield this.b;
    }
  }
  const oi = new ai();
  ai.NAMES = ii;
  let li = 0;
  class hi extends nt {
    constructor() {
      super(),
        (this.isMaterial = !0),
        Object.defineProperty(this, "id", { value: li++ }),
        (this.uuid = ot()),
        (this.name = ""),
        (this.type = "Material"),
        (this.blending = 1),
        (this.side = 0),
        (this.vertexColors = !1),
        (this.opacity = 1),
        (this.transparent = !1),
        (this.alphaHash = !1),
        (this.blendSrc = 204),
        (this.blendDst = 205),
        (this.blendEquation = r),
        (this.blendSrcAlpha = null),
        (this.blendDstAlpha = null),
        (this.blendEquationAlpha = null),
        (this.blendColor = new ai(0, 0, 0)),
        (this.blendAlpha = 0),
        (this.depthFunc = 3),
        (this.depthTest = !0),
        (this.depthWrite = !0),
        (this.stencilWriteMask = 255),
        (this.stencilFunc = 519),
        (this.stencilRef = 0),
        (this.stencilFuncMask = 255),
        (this.stencilFail = Q),
        (this.stencilZFail = Q),
        (this.stencilZPass = Q),
        (this.stencilWrite = !1),
        (this.clippingPlanes = null),
        (this.clipIntersection = !1),
        (this.clipShadows = !1),
        (this.shadowSide = null),
        (this.colorWrite = !0),
        (this.precision = null),
        (this.polygonOffset = !1),
        (this.polygonOffsetFactor = 0),
        (this.polygonOffsetUnits = 0),
        (this.dithering = !1),
        (this.alphaToCoverage = !1),
        (this.premultipliedAlpha = !1),
        (this.forceSinglePass = !1),
        (this.visible = !0),
        (this.toneMapped = !0),
        (this.userData = {}),
        (this.version = 0),
        (this._alphaTest = 0);
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(t) {
      this._alphaTest > 0 != t > 0 && this.version++, (this._alphaTest = t);
    }
    onBuild() {}
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(t) {
      if (void 0 !== t)
        for (const e in t) {
          const i = t[e];
          if (void 0 === i) {
            console.warn(
              `THREE.Material: parameter '${e}' has value of undefined.`
            );
            continue;
          }
          const n = this[e];
          void 0 !== n
            ? n && n.isColor
              ? n.set(i)
              : n && n.isVector3 && i && i.isVector3
              ? n.copy(i)
              : (this[e] = i)
            : console.warn(
                `THREE.Material: '${e}' is not a property of THREE.${this.type}.`
              );
        }
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      e && (t = { textures: {}, images: {} });
      const i = {
        metadata: {
          version: 4.6,
          type: "Material",
          generator: "Material.toJSON",
        },
      };
      function n(t) {
        const e = [];
        for (const i in t) {
          const n = t[i];
          delete n.metadata, e.push(n);
        }
        return e;
      }
      if (
        ((i.uuid = this.uuid),
        (i.type = this.type),
        "" !== this.name && (i.name = this.name),
        this.color && this.color.isColor && (i.color = this.color.getHex()),
        void 0 !== this.roughness && (i.roughness = this.roughness),
        void 0 !== this.metalness && (i.metalness = this.metalness),
        void 0 !== this.sheen && (i.sheen = this.sheen),
        this.sheenColor &&
          this.sheenColor.isColor &&
          (i.sheenColor = this.sheenColor.getHex()),
        void 0 !== this.sheenRoughness &&
          (i.sheenRoughness = this.sheenRoughness),
        this.emissive &&
          this.emissive.isColor &&
          (i.emissive = this.emissive.getHex()),
        this.emissiveIntensity &&
          1 !== this.emissiveIntensity &&
          (i.emissiveIntensity = this.emissiveIntensity),
        this.specular &&
          this.specular.isColor &&
          (i.specular = this.specular.getHex()),
        void 0 !== this.specularIntensity &&
          (i.specularIntensity = this.specularIntensity),
        this.specularColor &&
          this.specularColor.isColor &&
          (i.specularColor = this.specularColor.getHex()),
        void 0 !== this.shininess && (i.shininess = this.shininess),
        void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat),
        void 0 !== this.clearcoatRoughness &&
          (i.clearcoatRoughness = this.clearcoatRoughness),
        this.clearcoatMap &&
          this.clearcoatMap.isTexture &&
          (i.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
        this.clearcoatRoughnessMap &&
          this.clearcoatRoughnessMap.isTexture &&
          (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
        this.clearcoatNormalMap &&
          this.clearcoatNormalMap.isTexture &&
          ((i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
          (i.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
        void 0 !== this.iridescence && (i.iridescence = this.iridescence),
        void 0 !== this.iridescenceIOR &&
          (i.iridescenceIOR = this.iridescenceIOR),
        void 0 !== this.iridescenceThicknessRange &&
          (i.iridescenceThicknessRange = this.iridescenceThicknessRange),
        this.iridescenceMap &&
          this.iridescenceMap.isTexture &&
          (i.iridescenceMap = this.iridescenceMap.toJSON(t).uuid),
        this.iridescenceThicknessMap &&
          this.iridescenceThicknessMap.isTexture &&
          (i.iridescenceThicknessMap =
            this.iridescenceThicknessMap.toJSON(t).uuid),
        void 0 !== this.anisotropy && (i.anisotropy = this.anisotropy),
        void 0 !== this.anisotropyRotation &&
          (i.anisotropyRotation = this.anisotropyRotation),
        this.anisotropyMap &&
          this.anisotropyMap.isTexture &&
          (i.anisotropyMap = this.anisotropyMap.toJSON(t).uuid),
        this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid),
        this.matcap &&
          this.matcap.isTexture &&
          (i.matcap = this.matcap.toJSON(t).uuid),
        this.alphaMap &&
          this.alphaMap.isTexture &&
          (i.alphaMap = this.alphaMap.toJSON(t).uuid),
        this.lightMap &&
          this.lightMap.isTexture &&
          ((i.lightMap = this.lightMap.toJSON(t).uuid),
          (i.lightMapIntensity = this.lightMapIntensity)),
        this.aoMap &&
          this.aoMap.isTexture &&
          ((i.aoMap = this.aoMap.toJSON(t).uuid),
          (i.aoMapIntensity = this.aoMapIntensity)),
        this.bumpMap &&
          this.bumpMap.isTexture &&
          ((i.bumpMap = this.bumpMap.toJSON(t).uuid),
          (i.bumpScale = this.bumpScale)),
        this.normalMap &&
          this.normalMap.isTexture &&
          ((i.normalMap = this.normalMap.toJSON(t).uuid),
          (i.normalMapType = this.normalMapType),
          (i.normalScale = this.normalScale.toArray())),
        this.displacementMap &&
          this.displacementMap.isTexture &&
          ((i.displacementMap = this.displacementMap.toJSON(t).uuid),
          (i.displacementScale = this.displacementScale),
          (i.displacementBias = this.displacementBias)),
        this.roughnessMap &&
          this.roughnessMap.isTexture &&
          (i.roughnessMap = this.roughnessMap.toJSON(t).uuid),
        this.metalnessMap &&
          this.metalnessMap.isTexture &&
          (i.metalnessMap = this.metalnessMap.toJSON(t).uuid),
        this.emissiveMap &&
          this.emissiveMap.isTexture &&
          (i.emissiveMap = this.emissiveMap.toJSON(t).uuid),
        this.specularMap &&
          this.specularMap.isTexture &&
          (i.specularMap = this.specularMap.toJSON(t).uuid),
        this.specularIntensityMap &&
          this.specularIntensityMap.isTexture &&
          (i.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid),
        this.specularColorMap &&
          this.specularColorMap.isTexture &&
          (i.specularColorMap = this.specularColorMap.toJSON(t).uuid),
        this.envMap &&
          this.envMap.isTexture &&
          ((i.envMap = this.envMap.toJSON(t).uuid),
          void 0 !== this.combine && (i.combine = this.combine)),
        void 0 !== this.envMapIntensity &&
          (i.envMapIntensity = this.envMapIntensity),
        void 0 !== this.reflectivity && (i.reflectivity = this.reflectivity),
        void 0 !== this.refractionRatio &&
          (i.refractionRatio = this.refractionRatio),
        this.gradientMap &&
          this.gradientMap.isTexture &&
          (i.gradientMap = this.gradientMap.toJSON(t).uuid),
        void 0 !== this.transmission && (i.transmission = this.transmission),
        this.transmissionMap &&
          this.transmissionMap.isTexture &&
          (i.transmissionMap = this.transmissionMap.toJSON(t).uuid),
        void 0 !== this.thickness && (i.thickness = this.thickness),
        this.thicknessMap &&
          this.thicknessMap.isTexture &&
          (i.thicknessMap = this.thicknessMap.toJSON(t).uuid),
        void 0 !== this.attenuationDistance &&
          this.attenuationDistance !== 1 / 0 &&
          (i.attenuationDistance = this.attenuationDistance),
        void 0 !== this.attenuationColor &&
          (i.attenuationColor = this.attenuationColor.getHex()),
        void 0 !== this.size && (i.size = this.size),
        null !== this.shadowSide && (i.shadowSide = this.shadowSide),
        void 0 !== this.sizeAttenuation &&
          (i.sizeAttenuation = this.sizeAttenuation),
        1 !== this.blending && (i.blending = this.blending),
        0 !== this.side && (i.side = this.side),
        !0 === this.vertexColors && (i.vertexColors = !0),
        this.opacity < 1 && (i.opacity = this.opacity),
        !0 === this.transparent && (i.transparent = !0),
        204 !== this.blendSrc && (i.blendSrc = this.blendSrc),
        205 !== this.blendDst && (i.blendDst = this.blendDst),
        this.blendEquation !== r && (i.blendEquation = this.blendEquation),
        null !== this.blendSrcAlpha && (i.blendSrcAlpha = this.blendSrcAlpha),
        null !== this.blendDstAlpha && (i.blendDstAlpha = this.blendDstAlpha),
        null !== this.blendEquationAlpha &&
          (i.blendEquationAlpha = this.blendEquationAlpha),
        this.blendColor &&
          this.blendColor.isColor &&
          (i.blendColor = this.blendColor.getHex()),
        0 !== this.blendAlpha && (i.blendAlpha = this.blendAlpha),
        3 !== this.depthFunc && (i.depthFunc = this.depthFunc),
        !1 === this.depthTest && (i.depthTest = this.depthTest),
        !1 === this.depthWrite && (i.depthWrite = this.depthWrite),
        !1 === this.colorWrite && (i.colorWrite = this.colorWrite),
        255 !== this.stencilWriteMask &&
          (i.stencilWriteMask = this.stencilWriteMask),
        519 !== this.stencilFunc && (i.stencilFunc = this.stencilFunc),
        0 !== this.stencilRef && (i.stencilRef = this.stencilRef),
        255 !== this.stencilFuncMask &&
          (i.stencilFuncMask = this.stencilFuncMask),
        this.stencilFail !== Q && (i.stencilFail = this.stencilFail),
        this.stencilZFail !== Q && (i.stencilZFail = this.stencilZFail),
        this.stencilZPass !== Q && (i.stencilZPass = this.stencilZPass),
        !0 === this.stencilWrite && (i.stencilWrite = this.stencilWrite),
        void 0 !== this.rotation &&
          0 !== this.rotation &&
          (i.rotation = this.rotation),
        !0 === this.polygonOffset && (i.polygonOffset = !0),
        0 !== this.polygonOffsetFactor &&
          (i.polygonOffsetFactor = this.polygonOffsetFactor),
        0 !== this.polygonOffsetUnits &&
          (i.polygonOffsetUnits = this.polygonOffsetUnits),
        void 0 !== this.linewidth &&
          1 !== this.linewidth &&
          (i.linewidth = this.linewidth),
        void 0 !== this.dashSize && (i.dashSize = this.dashSize),
        void 0 !== this.gapSize && (i.gapSize = this.gapSize),
        void 0 !== this.scale && (i.scale = this.scale),
        !0 === this.dithering && (i.dithering = !0),
        this.alphaTest > 0 && (i.alphaTest = this.alphaTest),
        !0 === this.alphaHash && (i.alphaHash = !0),
        !0 === this.alphaToCoverage && (i.alphaToCoverage = !0),
        !0 === this.premultipliedAlpha && (i.premultipliedAlpha = !0),
        !0 === this.forceSinglePass && (i.forceSinglePass = !0),
        !0 === this.wireframe && (i.wireframe = !0),
        this.wireframeLinewidth > 1 &&
          (i.wireframeLinewidth = this.wireframeLinewidth),
        "round" !== this.wireframeLinecap &&
          (i.wireframeLinecap = this.wireframeLinecap),
        "round" !== this.wireframeLinejoin &&
          (i.wireframeLinejoin = this.wireframeLinejoin),
        !0 === this.flatShading && (i.flatShading = !0),
        !1 === this.visible && (i.visible = !1),
        !1 === this.toneMapped && (i.toneMapped = !1),
        !1 === this.fog && (i.fog = !1),
        Object.keys(this.userData).length > 0 && (i.userData = this.userData),
        e)
      ) {
        const e = n(t.textures),
          r = n(t.images);
        e.length > 0 && (i.textures = e), r.length > 0 && (i.images = r);
      }
      return i;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      (this.name = t.name),
        (this.blending = t.blending),
        (this.side = t.side),
        (this.vertexColors = t.vertexColors),
        (this.opacity = t.opacity),
        (this.transparent = t.transparent),
        (this.blendSrc = t.blendSrc),
        (this.blendDst = t.blendDst),
        (this.blendEquation = t.blendEquation),
        (this.blendSrcAlpha = t.blendSrcAlpha),
        (this.blendDstAlpha = t.blendDstAlpha),
        (this.blendEquationAlpha = t.blendEquationAlpha),
        this.blendColor.copy(t.blendColor),
        (this.blendAlpha = t.blendAlpha),
        (this.depthFunc = t.depthFunc),
        (this.depthTest = t.depthTest),
        (this.depthWrite = t.depthWrite),
        (this.stencilWriteMask = t.stencilWriteMask),
        (this.stencilFunc = t.stencilFunc),
        (this.stencilRef = t.stencilRef),
        (this.stencilFuncMask = t.stencilFuncMask),
        (this.stencilFail = t.stencilFail),
        (this.stencilZFail = t.stencilZFail),
        (this.stencilZPass = t.stencilZPass),
        (this.stencilWrite = t.stencilWrite);
      const e = t.clippingPlanes;
      let i = null;
      if (null !== e) {
        const t = e.length;
        i = new Array(t);
        for (let n = 0; n !== t; ++n) i[n] = e[n].clone();
      }
      return (
        (this.clippingPlanes = i),
        (this.clipIntersection = t.clipIntersection),
        (this.clipShadows = t.clipShadows),
        (this.shadowSide = t.shadowSide),
        (this.colorWrite = t.colorWrite),
        (this.precision = t.precision),
        (this.polygonOffset = t.polygonOffset),
        (this.polygonOffsetFactor = t.polygonOffsetFactor),
        (this.polygonOffsetUnits = t.polygonOffsetUnits),
        (this.dithering = t.dithering),
        (this.alphaTest = t.alphaTest),
        (this.alphaHash = t.alphaHash),
        (this.alphaToCoverage = t.alphaToCoverage),
        (this.premultipliedAlpha = t.premultipliedAlpha),
        (this.forceSinglePass = t.forceSinglePass),
        (this.visible = t.visible),
        (this.toneMapped = t.toneMapped),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        this
      );
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    set needsUpdate(t) {
      !0 === t && this.version++;
    }
  }
  class ci extends hi {
    constructor(t) {
      super(),
        (this.isMeshBasicMaterial = !0),
        (this.type = "MeshBasicMaterial"),
        (this.color = new ai(16777215)),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = s),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.fog = !0),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.fog = t.fog),
        this
      );
    }
  }
  const di = new Ht(),
    ui = new mt();
  class pi {
    constructor(t, e, i = !1) {
      if (Array.isArray(t))
        throw new TypeError(
          "THREE.BufferAttribute: array should be a Typed Array."
        );
      (this.isBufferAttribute = !0),
        (this.name = ""),
        (this.array = t),
        (this.itemSize = e),
        (this.count = void 0 !== t ? t.length / e : 0),
        (this.normalized = i),
        (this.usage = 35044),
        (this._updateRange = { offset: 0, count: -1 }),
        (this.updateRanges = []),
        (this.gpuType = R),
        (this.version = 0);
    }
    onUploadCallback() {}
    set needsUpdate(t) {
      !0 === t && this.version++;
    }
    get updateRange() {
      return (
        console.warn(
          'THREE.BufferAttribute: "updateRange" is deprecated and removed in r169. Use "addUpdateRange()" instead.'
        ),
        this._updateRange
      );
    }
    setUsage(t) {
      return (this.usage = t), this;
    }
    addUpdateRange(t, e) {
      this.updateRanges.push({ start: t, count: e });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(t) {
      return (
        (this.name = t.name),
        (this.array = new t.array.constructor(t.array)),
        (this.itemSize = t.itemSize),
        (this.count = t.count),
        (this.normalized = t.normalized),
        (this.usage = t.usage),
        (this.gpuType = t.gpuType),
        this
      );
    }
    copyAt(t, e, i) {
      (t *= this.itemSize), (i *= e.itemSize);
      for (let n = 0, r = this.itemSize; n < r; n++)
        this.array[t + n] = e.array[i + n];
      return this;
    }
    copyArray(t) {
      return this.array.set(t), this;
    }
    applyMatrix3(t) {
      if (2 === this.itemSize)
        for (let e = 0, i = this.count; e < i; e++)
          ui.fromBufferAttribute(this, e),
            ui.applyMatrix3(t),
            this.setXY(e, ui.x, ui.y);
      else if (3 === this.itemSize)
        for (let e = 0, i = this.count; e < i; e++)
          di.fromBufferAttribute(this, e),
            di.applyMatrix3(t),
            this.setXYZ(e, di.x, di.y, di.z);
      return this;
    }
    applyMatrix4(t) {
      for (let e = 0, i = this.count; e < i; e++)
        di.fromBufferAttribute(this, e),
          di.applyMatrix4(t),
          this.setXYZ(e, di.x, di.y, di.z);
      return this;
    }
    applyNormalMatrix(t) {
      for (let e = 0, i = this.count; e < i; e++)
        di.fromBufferAttribute(this, e),
          di.applyNormalMatrix(t),
          this.setXYZ(e, di.x, di.y, di.z);
      return this;
    }
    transformDirection(t) {
      for (let e = 0, i = this.count; e < i; e++)
        di.fromBufferAttribute(this, e),
          di.transformDirection(t),
          this.setXYZ(e, di.x, di.y, di.z);
      return this;
    }
    set(t, e = 0) {
      return this.array.set(t, e), this;
    }
    getComponent(t, e) {
      let i = this.array[t * this.itemSize + e];
      return this.normalized && (i = ut(i, this.array)), i;
    }
    setComponent(t, e, i) {
      return (
        this.normalized && (i = pt(i, this.array)),
        (this.array[t * this.itemSize + e] = i),
        this
      );
    }
    getX(t) {
      let e = this.array[t * this.itemSize];
      return this.normalized && (e = ut(e, this.array)), e;
    }
    setX(t, e) {
      return (
        this.normalized && (e = pt(e, this.array)),
        (this.array[t * this.itemSize] = e),
        this
      );
    }
    getY(t) {
      let e = this.array[t * this.itemSize + 1];
      return this.normalized && (e = ut(e, this.array)), e;
    }
    setY(t, e) {
      return (
        this.normalized && (e = pt(e, this.array)),
        (this.array[t * this.itemSize + 1] = e),
        this
      );
    }
    getZ(t) {
      let e = this.array[t * this.itemSize + 2];
      return this.normalized && (e = ut(e, this.array)), e;
    }
    setZ(t, e) {
      return (
        this.normalized && (e = pt(e, this.array)),
        (this.array[t * this.itemSize + 2] = e),
        this
      );
    }
    getW(t) {
      let e = this.array[t * this.itemSize + 3];
      return this.normalized && (e = ut(e, this.array)), e;
    }
    setW(t, e) {
      return (
        this.normalized && (e = pt(e, this.array)),
        (this.array[t * this.itemSize + 3] = e),
        this
      );
    }
    setXY(t, e, i) {
      return (
        (t *= this.itemSize),
        this.normalized && ((e = pt(e, this.array)), (i = pt(i, this.array))),
        (this.array[t + 0] = e),
        (this.array[t + 1] = i),
        this
      );
    }
    setXYZ(t, e, i, n) {
      return (
        (t *= this.itemSize),
        this.normalized &&
          ((e = pt(e, this.array)),
          (i = pt(i, this.array)),
          (n = pt(n, this.array))),
        (this.array[t + 0] = e),
        (this.array[t + 1] = i),
        (this.array[t + 2] = n),
        this
      );
    }
    setXYZW(t, e, i, n, r) {
      return (
        (t *= this.itemSize),
        this.normalized &&
          ((e = pt(e, this.array)),
          (i = pt(i, this.array)),
          (n = pt(n, this.array)),
          (r = pt(r, this.array))),
        (this.array[t + 0] = e),
        (this.array[t + 1] = i),
        (this.array[t + 2] = n),
        (this.array[t + 3] = r),
        this
      );
    }
    onUpload(t) {
      return (this.onUploadCallback = t), this;
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      const t = {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: Array.from(this.array),
        normalized: this.normalized,
      };
      return (
        "" !== this.name && (t.name = this.name),
        35044 !== this.usage && (t.usage = this.usage),
        t
      );
    }
  }
  class mi extends pi {
    constructor(t, e, i) {
      super(new Uint16Array(t), e, i);
    }
  }
  class fi extends pi {
    constructor(t, e, i) {
      super(new Uint32Array(t), e, i);
    }
  }
  class gi extends pi {
    constructor(t, e, i) {
      super(new Float32Array(t), e, i);
    }
  }
  let _i = 0;
  const vi = new ve(),
    xi = new Ge(),
    yi = new Ht(),
    Mi = new jt(),
    Si = new jt(),
    bi = new Ht();
  class Ei extends nt {
    constructor() {
      super(),
        (this.isBufferGeometry = !0),
        Object.defineProperty(this, "id", { value: _i++ }),
        (this.uuid = ot()),
        (this.name = ""),
        (this.type = "BufferGeometry"),
        (this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.morphTargetsRelative = !1),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null),
        (this.drawRange = { start: 0, count: 1 / 0 }),
        (this.userData = {});
    }
    getIndex() {
      return this.index;
    }
    setIndex(t) {
      return (
        Array.isArray(t)
          ? (this.index = new (_t(t) ? fi : mi)(t, 1))
          : (this.index = t),
        this
      );
    }
    getAttribute(t) {
      return this.attributes[t];
    }
    setAttribute(t, e) {
      return (this.attributes[t] = e), this;
    }
    deleteAttribute(t) {
      return delete this.attributes[t], this;
    }
    hasAttribute(t) {
      return void 0 !== this.attributes[t];
    }
    addGroup(t, e, i = 0) {
      this.groups.push({ start: t, count: e, materialIndex: i });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(t, e) {
      (this.drawRange.start = t), (this.drawRange.count = e);
    }
    applyMatrix4(t) {
      const e = this.attributes.position;
      void 0 !== e && (e.applyMatrix4(t), (e.needsUpdate = !0));
      const i = this.attributes.normal;
      if (void 0 !== i) {
        const e = new ft().getNormalMatrix(t);
        i.applyNormalMatrix(e), (i.needsUpdate = !0);
      }
      const n = this.attributes.tangent;
      return (
        void 0 !== n && (n.transformDirection(t), (n.needsUpdate = !0)),
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        this
      );
    }
    applyQuaternion(t) {
      return vi.makeRotationFromQuaternion(t), this.applyMatrix4(vi), this;
    }
    rotateX(t) {
      return vi.makeRotationX(t), this.applyMatrix4(vi), this;
    }
    rotateY(t) {
      return vi.makeRotationY(t), this.applyMatrix4(vi), this;
    }
    rotateZ(t) {
      return vi.makeRotationZ(t), this.applyMatrix4(vi), this;
    }
    translate(t, e, i) {
      return vi.makeTranslation(t, e, i), this.applyMatrix4(vi), this;
    }
    scale(t, e, i) {
      return vi.makeScale(t, e, i), this.applyMatrix4(vi), this;
    }
    lookAt(t) {
      return (
        xi.lookAt(t), xi.updateMatrix(), this.applyMatrix4(xi.matrix), this
      );
    }
    center() {
      return (
        this.computeBoundingBox(),
        this.boundingBox.getCenter(yi).negate(),
        this.translate(yi.x, yi.y, yi.z),
        this
      );
    }
    setFromPoints(t) {
      const e = [];
      for (let i = 0, n = t.length; i < n; i++) {
        const n = t[i];
        e.push(n.x, n.y, n.z || 0);
      }
      return this.setAttribute("position", new gi(e, 3)), this;
    }
    computeBoundingBox() {
      null === this.boundingBox && (this.boundingBox = new jt());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingBox.set(
            new Ht(-1 / 0, -1 / 0, -1 / 0),
            new Ht(1 / 0, 1 / 0, 1 / 0)
          )
        );
      if (void 0 !== t) {
        if ((this.boundingBox.setFromBufferAttribute(t), e))
          for (let t = 0, i = e.length; t < i; t++) {
            const i = e[t];
            Mi.setFromBufferAttribute(i),
              this.morphTargetsRelative
                ? (bi.addVectors(this.boundingBox.min, Mi.min),
                  this.boundingBox.expandByPoint(bi),
                  bi.addVectors(this.boundingBox.max, Mi.max),
                  this.boundingBox.expandByPoint(bi))
                : (this.boundingBox.expandByPoint(Mi.min),
                  this.boundingBox.expandByPoint(Mi.max));
          }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) ||
        isNaN(this.boundingBox.min.y) ||
        isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this
        );
    }
    computeBoundingSphere() {
      null === this.boundingSphere && (this.boundingSphere = new he());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingSphere.set(new Ht(), 1 / 0)
        );
      if (t) {
        const i = this.boundingSphere.center;
        if ((Mi.setFromBufferAttribute(t), e))
          for (let t = 0, i = e.length; t < i; t++) {
            const i = e[t];
            Si.setFromBufferAttribute(i),
              this.morphTargetsRelative
                ? (bi.addVectors(Mi.min, Si.min),
                  Mi.expandByPoint(bi),
                  bi.addVectors(Mi.max, Si.max),
                  Mi.expandByPoint(bi))
                : (Mi.expandByPoint(Si.min), Mi.expandByPoint(Si.max));
          }
        Mi.getCenter(i);
        let n = 0;
        for (let e = 0, r = t.count; e < r; e++)
          bi.fromBufferAttribute(t, e),
            (n = Math.max(n, i.distanceToSquared(bi)));
        if (e)
          for (let r = 0, s = e.length; r < s; r++) {
            const s = e[r],
              a = this.morphTargetsRelative;
            for (let e = 0, r = s.count; e < r; e++)
              bi.fromBufferAttribute(s, e),
                a && (yi.fromBufferAttribute(t, e), bi.add(yi)),
                (n = Math.max(n, i.distanceToSquared(bi)));
          }
        (this.boundingSphere.radius = Math.sqrt(n)),
          isNaN(this.boundingSphere.radius) &&
            console.error(
              'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
              this
            );
      }
    }
    computeTangents() {
      const t = this.index,
        e = this.attributes;
      if (
        null === t ||
        void 0 === e.position ||
        void 0 === e.normal ||
        void 0 === e.uv
      )
        return void console.error(
          "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)"
        );
      const i = t.array,
        n = e.position.array,
        r = e.normal.array,
        s = e.uv.array,
        a = n.length / 3;
      !1 === this.hasAttribute("tangent") &&
        this.setAttribute("tangent", new pi(new Float32Array(4 * a), 4));
      const o = this.getAttribute("tangent").array,
        l = [],
        h = [];
      for (let t = 0; t < a; t++) (l[t] = new Ht()), (h[t] = new Ht());
      const c = new Ht(),
        d = new Ht(),
        u = new Ht(),
        p = new mt(),
        m = new mt(),
        f = new mt(),
        g = new Ht(),
        _ = new Ht();
      function v(t, e, i) {
        c.fromArray(n, 3 * t),
          d.fromArray(n, 3 * e),
          u.fromArray(n, 3 * i),
          p.fromArray(s, 2 * t),
          m.fromArray(s, 2 * e),
          f.fromArray(s, 2 * i),
          d.sub(c),
          u.sub(c),
          m.sub(p),
          f.sub(p);
        const r = 1 / (m.x * f.y - f.x * m.y);
        isFinite(r) &&
          (g
            .copy(d)
            .multiplyScalar(f.y)
            .addScaledVector(u, -m.y)
            .multiplyScalar(r),
          _.copy(u)
            .multiplyScalar(m.x)
            .addScaledVector(d, -f.x)
            .multiplyScalar(r),
          l[t].add(g),
          l[e].add(g),
          l[i].add(g),
          h[t].add(_),
          h[e].add(_),
          h[i].add(_));
      }
      let x = this.groups;
      0 === x.length && (x = [{ start: 0, count: i.length }]);
      for (let t = 0, e = x.length; t < e; ++t) {
        const e = x[t],
          n = e.start;
        for (let t = n, r = n + e.count; t < r; t += 3)
          v(i[t + 0], i[t + 1], i[t + 2]);
      }
      const y = new Ht(),
        M = new Ht(),
        S = new Ht(),
        b = new Ht();
      function E(t) {
        S.fromArray(r, 3 * t), b.copy(S);
        const e = l[t];
        y.copy(e),
          y.sub(S.multiplyScalar(S.dot(e))).normalize(),
          M.crossVectors(b, e);
        const i = M.dot(h[t]) < 0 ? -1 : 1;
        (o[4 * t] = y.x),
          (o[4 * t + 1] = y.y),
          (o[4 * t + 2] = y.z),
          (o[4 * t + 3] = i);
      }
      for (let t = 0, e = x.length; t < e; ++t) {
        const e = x[t],
          n = e.start;
        for (let t = n, r = n + e.count; t < r; t += 3)
          E(i[t + 0]), E(i[t + 1]), E(i[t + 2]);
      }
    }
    computeVertexNormals() {
      const t = this.index,
        e = this.getAttribute("position");
      if (void 0 !== e) {
        let i = this.getAttribute("normal");
        if (void 0 === i)
          (i = new pi(new Float32Array(3 * e.count), 3)),
            this.setAttribute("normal", i);
        else for (let t = 0, e = i.count; t < e; t++) i.setXYZ(t, 0, 0, 0);
        const n = new Ht(),
          r = new Ht(),
          s = new Ht(),
          a = new Ht(),
          o = new Ht(),
          l = new Ht(),
          h = new Ht(),
          c = new Ht();
        if (t)
          for (let d = 0, u = t.count; d < u; d += 3) {
            const u = t.getX(d + 0),
              p = t.getX(d + 1),
              m = t.getX(d + 2);
            n.fromBufferAttribute(e, u),
              r.fromBufferAttribute(e, p),
              s.fromBufferAttribute(e, m),
              h.subVectors(s, r),
              c.subVectors(n, r),
              h.cross(c),
              a.fromBufferAttribute(i, u),
              o.fromBufferAttribute(i, p),
              l.fromBufferAttribute(i, m),
              a.add(h),
              o.add(h),
              l.add(h),
              i.setXYZ(u, a.x, a.y, a.z),
              i.setXYZ(p, o.x, o.y, o.z),
              i.setXYZ(m, l.x, l.y, l.z);
          }
        else
          for (let t = 0, a = e.count; t < a; t += 3)
            n.fromBufferAttribute(e, t + 0),
              r.fromBufferAttribute(e, t + 1),
              s.fromBufferAttribute(e, t + 2),
              h.subVectors(s, r),
              c.subVectors(n, r),
              h.cross(c),
              i.setXYZ(t + 0, h.x, h.y, h.z),
              i.setXYZ(t + 1, h.x, h.y, h.z),
              i.setXYZ(t + 2, h.x, h.y, h.z);
        this.normalizeNormals(), (i.needsUpdate = !0);
      }
    }
    normalizeNormals() {
      const t = this.attributes.normal;
      for (let e = 0, i = t.count; e < i; e++)
        bi.fromBufferAttribute(t, e),
          bi.normalize(),
          t.setXYZ(e, bi.x, bi.y, bi.z);
    }
    toNonIndexed() {
      function t(t, e) {
        const i = t.array,
          n = t.itemSize,
          r = t.normalized,
          s = new i.constructor(e.length * n);
        let a = 0,
          o = 0;
        for (let r = 0, l = e.length; r < l; r++) {
          a = t.isInterleavedBufferAttribute
            ? e[r] * t.data.stride + t.offset
            : e[r] * n;
          for (let t = 0; t < n; t++) s[o++] = i[a++];
        }
        return new pi(s, n, r);
      }
      if (null === this.index)
        return (
          console.warn(
            "THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."
          ),
          this
        );
      const e = new Ei(),
        i = this.index.array,
        n = this.attributes;
      for (const r in n) {
        const s = t(n[r], i);
        e.setAttribute(r, s);
      }
      const r = this.morphAttributes;
      for (const n in r) {
        const s = [],
          a = r[n];
        for (let e = 0, n = a.length; e < n; e++) {
          const n = t(a[e], i);
          s.push(n);
        }
        e.morphAttributes[n] = s;
      }
      e.morphTargetsRelative = this.morphTargetsRelative;
      const s = this.groups;
      for (let t = 0, i = s.length; t < i; t++) {
        const i = s[t];
        e.addGroup(i.start, i.count, i.materialIndex);
      }
      return e;
    }
    toJSON() {
      const t = {
        metadata: {
          version: 4.6,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON",
        },
      };
      if (
        ((t.uuid = this.uuid),
        (t.type = this.type),
        "" !== this.name && (t.name = this.name),
        Object.keys(this.userData).length > 0 && (t.userData = this.userData),
        void 0 !== this.parameters)
      ) {
        const e = this.parameters;
        for (const i in e) void 0 !== e[i] && (t[i] = e[i]);
        return t;
      }
      t.data = { attributes: {} };
      const e = this.index;
      null !== e &&
        (t.data.index = {
          type: e.array.constructor.name,
          array: Array.prototype.slice.call(e.array),
        });
      const i = this.attributes;
      for (const e in i) {
        const n = i[e];
        t.data.attributes[e] = n.toJSON(t.data);
      }
      const n = {};
      let r = !1;
      for (const e in this.morphAttributes) {
        const i = this.morphAttributes[e],
          s = [];
        for (let e = 0, n = i.length; e < n; e++) {
          const n = i[e];
          s.push(n.toJSON(t.data));
        }
        s.length > 0 && ((n[e] = s), (r = !0));
      }
      r &&
        ((t.data.morphAttributes = n),
        (t.data.morphTargetsRelative = this.morphTargetsRelative));
      const s = this.groups;
      s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
      const a = this.boundingSphere;
      return (
        null !== a &&
          (t.data.boundingSphere = {
            center: a.center.toArray(),
            radius: a.radius,
          }),
        t
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      (this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null);
      const e = {};
      this.name = t.name;
      const i = t.index;
      null !== i && this.setIndex(i.clone(e));
      const n = t.attributes;
      for (const t in n) {
        const i = n[t];
        this.setAttribute(t, i.clone(e));
      }
      const r = t.morphAttributes;
      for (const t in r) {
        const i = [],
          n = r[t];
        for (let t = 0, r = n.length; t < r; t++) i.push(n[t].clone(e));
        this.morphAttributes[t] = i;
      }
      this.morphTargetsRelative = t.morphTargetsRelative;
      const s = t.groups;
      for (let t = 0, e = s.length; t < e; t++) {
        const e = s[t];
        this.addGroup(e.start, e.count, e.materialIndex);
      }
      const a = t.boundingBox;
      null !== a && (this.boundingBox = a.clone());
      const o = t.boundingSphere;
      return (
        null !== o && (this.boundingSphere = o.clone()),
        (this.drawRange.start = t.drawRange.start),
        (this.drawRange.count = t.drawRange.count),
        (this.userData = t.userData),
        this
      );
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }
  const Ti = new ve(),
    wi = new _e(),
    Ai = new he(),
    Ri = new Ht(),
    Ci = new Ht(),
    Li = new Ht(),
    Pi = new Ht(),
    Ui = new Ht(),
    Di = new Ht(),
    Ii = new mt(),
    Ni = new mt(),
    Oi = new mt(),
    Fi = new Ht(),
    zi = new Ht(),
    Bi = new Ht(),
    ki = new Ht(),
    Vi = new Ht();
  class Hi extends Ge {
    constructor(t = new Ei(), e = new ci()) {
      super(),
        (this.isMesh = !0),
        (this.type = "Mesh"),
        (this.geometry = t),
        (this.material = e),
        this.updateMorphTargets();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        void 0 !== t.morphTargetInfluences &&
          (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
        void 0 !== t.morphTargetDictionary &&
          (this.morphTargetDictionary = Object.assign(
            {},
            t.morphTargetDictionary
          )),
        (this.material = Array.isArray(t.material)
          ? t.material.slice()
          : t.material),
        (this.geometry = t.geometry),
        this
      );
    }
    updateMorphTargets() {
      const t = this.geometry.morphAttributes,
        e = Object.keys(t);
      if (e.length > 0) {
        const i = t[e[0]];
        if (void 0 !== i) {
          (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
          for (let t = 0, e = i.length; t < e; t++) {
            const e = i[t].name || String(t);
            this.morphTargetInfluences.push(0),
              (this.morphTargetDictionary[e] = t);
          }
        }
      }
    }
    getVertexPosition(t, e) {
      const i = this.geometry,
        n = i.attributes.position,
        r = i.morphAttributes.position,
        s = i.morphTargetsRelative;
      e.fromBufferAttribute(n, t);
      const a = this.morphTargetInfluences;
      if (r && a) {
        Di.set(0, 0, 0);
        for (let i = 0, n = r.length; i < n; i++) {
          const n = a[i],
            o = r[i];
          0 !== n &&
            (Ui.fromBufferAttribute(o, t),
            s ? Di.addScaledVector(Ui, n) : Di.addScaledVector(Ui.sub(e), n));
        }
        e.add(Di);
      }
      return e;
    }
    raycast(t, e) {
      const i = this.geometry,
        n = this.material,
        r = this.matrixWorld;
      if (void 0 !== n) {
        if (
          (null === i.boundingSphere && i.computeBoundingSphere(),
          Ai.copy(i.boundingSphere),
          Ai.applyMatrix4(r),
          wi.copy(t.ray).recast(t.near),
          !1 === Ai.containsPoint(wi.origin))
        ) {
          if (null === wi.intersectSphere(Ai, Ri)) return;
          if (wi.origin.distanceToSquared(Ri) > (t.far - t.near) ** 2) return;
        }
        Ti.copy(r).invert(),
          wi.copy(t.ray).applyMatrix4(Ti),
          (null !== i.boundingBox && !1 === wi.intersectsBox(i.boundingBox)) ||
            this._computeIntersections(t, e, wi);
      }
    }
    _computeIntersections(t, e, i) {
      let n;
      const r = this.geometry,
        s = this.material,
        a = r.index,
        o = r.attributes.position,
        l = r.attributes.uv,
        h = r.attributes.uv1,
        c = r.attributes.normal,
        d = r.groups,
        u = r.drawRange;
      if (null !== a)
        if (Array.isArray(s))
          for (let r = 0, o = d.length; r < o; r++) {
            const o = d[r],
              p = s[o.materialIndex];
            for (
              let r = Math.max(o.start, u.start),
                s = Math.min(
                  a.count,
                  Math.min(o.start + o.count, u.start + u.count)
                );
              r < s;
              r += 3
            )
              (n = Gi(
                this,
                p,
                t,
                i,
                l,
                h,
                c,
                a.getX(r),
                a.getX(r + 1),
                a.getX(r + 2)
              )),
                n &&
                  ((n.faceIndex = Math.floor(r / 3)),
                  (n.face.materialIndex = o.materialIndex),
                  e.push(n));
          }
        else
          for (
            let r = Math.max(0, u.start),
              o = Math.min(a.count, u.start + u.count);
            r < o;
            r += 3
          )
            (n = Gi(
              this,
              s,
              t,
              i,
              l,
              h,
              c,
              a.getX(r),
              a.getX(r + 1),
              a.getX(r + 2)
            )),
              n && ((n.faceIndex = Math.floor(r / 3)), e.push(n));
      else if (void 0 !== o)
        if (Array.isArray(s))
          for (let r = 0, a = d.length; r < a; r++) {
            const a = d[r],
              p = s[a.materialIndex];
            for (
              let r = Math.max(a.start, u.start),
                s = Math.min(
                  o.count,
                  Math.min(a.start + a.count, u.start + u.count)
                );
              r < s;
              r += 3
            )
              (n = Gi(this, p, t, i, l, h, c, r, r + 1, r + 2)),
                n &&
                  ((n.faceIndex = Math.floor(r / 3)),
                  (n.face.materialIndex = a.materialIndex),
                  e.push(n));
          }
        else
          for (
            let r = Math.max(0, u.start),
              a = Math.min(o.count, u.start + u.count);
            r < a;
            r += 3
          )
            (n = Gi(this, s, t, i, l, h, c, r, r + 1, r + 2)),
              n && ((n.faceIndex = Math.floor(r / 3)), e.push(n));
    }
  }
  function Gi(t, e, i, n, r, s, a, o, l, h) {
    t.getVertexPosition(o, Ci),
      t.getVertexPosition(l, Li),
      t.getVertexPosition(h, Pi);
    const c = (function (t, e, i, n, r, s, a, o) {
      let l;
      if (
        ((l =
          1 === e.side
            ? n.intersectTriangle(a, s, r, !0, o)
            : n.intersectTriangle(r, s, a, 0 === e.side, o)),
        null === l)
      )
        return null;
      Vi.copy(o), Vi.applyMatrix4(t.matrixWorld);
      const h = i.ray.origin.distanceTo(Vi);
      return h < i.near || h > i.far
        ? null
        : { distance: h, point: Vi.clone(), object: t };
    })(t, e, i, n, Ci, Li, Pi, ki);
    if (c) {
      r &&
        (Ii.fromBufferAttribute(r, o),
        Ni.fromBufferAttribute(r, l),
        Oi.fromBufferAttribute(r, h),
        (c.uv = ei.getInterpolation(ki, Ci, Li, Pi, Ii, Ni, Oi, new mt()))),
        s &&
          (Ii.fromBufferAttribute(s, o),
          Ni.fromBufferAttribute(s, l),
          Oi.fromBufferAttribute(s, h),
          (c.uv1 = ei.getInterpolation(ki, Ci, Li, Pi, Ii, Ni, Oi, new mt())),
          (c.uv2 = c.uv1)),
        a &&
          (Fi.fromBufferAttribute(a, o),
          zi.fromBufferAttribute(a, l),
          Bi.fromBufferAttribute(a, h),
          (c.normal = ei.getInterpolation(
            ki,
            Ci,
            Li,
            Pi,
            Fi,
            zi,
            Bi,
            new Ht()
          )),
          c.normal.dot(n.direction) > 0 && c.normal.multiplyScalar(-1));
      const t = { a: o, b: l, c: h, normal: new Ht(), materialIndex: 0 };
      ei.getNormal(Ci, Li, Pi, t.normal), (c.face = t);
    }
    return c;
  }
  class Wi extends Ei {
    constructor(t = 1, e = 1, i = 1, n = 1, r = 1, s = 1) {
      super(),
        (this.type = "BoxGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          depth: i,
          widthSegments: n,
          heightSegments: r,
          depthSegments: s,
        });
      const a = this;
      (n = Math.floor(n)), (r = Math.floor(r)), (s = Math.floor(s));
      const o = [],
        l = [],
        h = [],
        c = [];
      let d = 0,
        u = 0;
      function p(t, e, i, n, r, s, p, m, f, g, _) {
        const v = s / f,
          x = p / g,
          y = s / 2,
          M = p / 2,
          S = m / 2,
          b = f + 1,
          E = g + 1;
        let T = 0,
          w = 0;
        const A = new Ht();
        for (let s = 0; s < E; s++) {
          const a = s * x - M;
          for (let o = 0; o < b; o++) {
            const d = o * v - y;
            (A[t] = d * n),
              (A[e] = a * r),
              (A[i] = S),
              l.push(A.x, A.y, A.z),
              (A[t] = 0),
              (A[e] = 0),
              (A[i] = m > 0 ? 1 : -1),
              h.push(A.x, A.y, A.z),
              c.push(o / f),
              c.push(1 - s / g),
              (T += 1);
          }
        }
        for (let t = 0; t < g; t++)
          for (let e = 0; e < f; e++) {
            const i = d + e + b * t,
              n = d + e + b * (t + 1),
              r = d + (e + 1) + b * (t + 1),
              s = d + (e + 1) + b * t;
            o.push(i, n, s), o.push(n, r, s), (w += 6);
          }
        a.addGroup(u, w, _), (u += w), (d += T);
      }
      p("z", "y", "x", -1, -1, i, e, t, s, r, 0),
        p("z", "y", "x", 1, -1, i, e, -t, s, r, 1),
        p("x", "z", "y", 1, 1, t, i, e, n, s, 2),
        p("x", "z", "y", 1, -1, t, i, -e, n, s, 3),
        p("x", "y", "z", 1, -1, t, e, i, n, r, 4),
        p("x", "y", "z", -1, -1, t, e, -i, n, r, 5),
        this.setIndex(o),
        this.setAttribute("position", new gi(l, 3)),
        this.setAttribute("normal", new gi(h, 3)),
        this.setAttribute("uv", new gi(c, 2));
    }
    copy(t) {
      return (
        super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this
      );
    }
    static fromJSON(t) {
      return new Wi(
        t.width,
        t.height,
        t.depth,
        t.widthSegments,
        t.heightSegments,
        t.depthSegments
      );
    }
  }
  function ji(t) {
    const e = {};
    for (const i in t) {
      e[i] = {};
      for (const n in t[i]) {
        const r = t[i][n];
        r &&
        (r.isColor ||
          r.isMatrix3 ||
          r.isMatrix4 ||
          r.isVector2 ||
          r.isVector3 ||
          r.isVector4 ||
          r.isTexture ||
          r.isQuaternion)
          ? r.isRenderTargetTexture
            ? (console.warn(
                "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."
              ),
              (e[i][n] = null))
            : (e[i][n] = r.clone())
          : Array.isArray(r)
          ? (e[i][n] = r.slice())
          : (e[i][n] = r);
      }
    }
    return e;
  }
  function Xi(t) {
    const e = {};
    for (let i = 0; i < t.length; i++) {
      const n = ji(t[i]);
      for (const t in n) e[t] = n[t];
    }
    return e;
  }
  function qi(t) {
    return null === t.getRenderTarget()
      ? t.outputColorSpace
      : wt.workingColorSpace;
  }
  const Yi = { clone: ji, merge: Xi };
  class Ki extends hi {
    constructor(t) {
      super(),
        (this.isShaderMaterial = !0),
        (this.type = "ShaderMaterial"),
        (this.defines = {}),
        (this.uniforms = {}),
        (this.uniformsGroups = []),
        (this.vertexShader =
          "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"),
        (this.fragmentShader =
          "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}"),
        (this.linewidth = 1),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.fog = !1),
        (this.lights = !1),
        (this.clipping = !1),
        (this.forceSinglePass = !0),
        (this.extensions = {
          derivatives: !1,
          fragDepth: !1,
          drawBuffers: !1,
          shaderTextureLOD: !1,
        }),
        (this.defaultAttributeValues = {
          color: [1, 1, 1],
          uv: [0, 0],
          uv1: [0, 0],
        }),
        (this.index0AttributeName = void 0),
        (this.uniformsNeedUpdate = !1),
        (this.glslVersion = null),
        void 0 !== t && this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.fragmentShader = t.fragmentShader),
        (this.vertexShader = t.vertexShader),
        (this.uniforms = ji(t.uniforms)),
        (this.uniformsGroups = (function (t) {
          const e = [];
          for (let i = 0; i < t.length; i++) e.push(t[i].clone());
          return e;
        })(t.uniformsGroups)),
        (this.defines = Object.assign({}, t.defines)),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.fog = t.fog),
        (this.lights = t.lights),
        (this.clipping = t.clipping),
        (this.extensions = Object.assign({}, t.extensions)),
        (this.glslVersion = t.glslVersion),
        this
      );
    }
    toJSON(t) {
      const e = super.toJSON(t);
      (e.glslVersion = this.glslVersion), (e.uniforms = {});
      for (const i in this.uniforms) {
        const n = this.uniforms[i].value;
        n && n.isTexture
          ? (e.uniforms[i] = { type: "t", value: n.toJSON(t).uuid })
          : n && n.isColor
          ? (e.uniforms[i] = { type: "c", value: n.getHex() })
          : n && n.isVector2
          ? (e.uniforms[i] = { type: "v2", value: n.toArray() })
          : n && n.isVector3
          ? (e.uniforms[i] = { type: "v3", value: n.toArray() })
          : n && n.isVector4
          ? (e.uniforms[i] = { type: "v4", value: n.toArray() })
          : n && n.isMatrix3
          ? (e.uniforms[i] = { type: "m3", value: n.toArray() })
          : n && n.isMatrix4
          ? (e.uniforms[i] = { type: "m4", value: n.toArray() })
          : (e.uniforms[i] = { value: n });
      }
      Object.keys(this.defines).length > 0 && (e.defines = this.defines),
        (e.vertexShader = this.vertexShader),
        (e.fragmentShader = this.fragmentShader),
        (e.lights = this.lights),
        (e.clipping = this.clipping);
      const i = {};
      for (const t in this.extensions) !0 === this.extensions[t] && (i[t] = !0);
      return Object.keys(i).length > 0 && (e.extensions = i), e;
    }
  }
  class Zi extends Ge {
    constructor() {
      super(),
        (this.isCamera = !0),
        (this.type = "Camera"),
        (this.matrixWorldInverse = new ve()),
        (this.projectionMatrix = new ve()),
        (this.projectionMatrixInverse = new ve()),
        (this.coordinateSystem = et);
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        this.matrixWorldInverse.copy(t.matrixWorldInverse),
        this.projectionMatrix.copy(t.projectionMatrix),
        this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
        (this.coordinateSystem = t.coordinateSystem),
        this
      );
    }
    getWorldDirection(t) {
      return super.getWorldDirection(t).negate();
    }
    updateMatrixWorld(t) {
      super.updateMatrixWorld(t),
        this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    updateWorldMatrix(t, e) {
      super.updateWorldMatrix(t, e),
        this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  class Ji extends Zi {
    constructor(t = 50, e = 1, i = 0.1, n = 2e3) {
      super(),
        (this.isPerspectiveCamera = !0),
        (this.type = "PerspectiveCamera"),
        (this.fov = t),
        (this.zoom = 1),
        (this.near = i),
        (this.far = n),
        (this.focus = 10),
        (this.aspect = e),
        (this.view = null),
        (this.filmGauge = 35),
        (this.filmOffset = 0),
        this.updateProjectionMatrix();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.fov = t.fov),
        (this.zoom = t.zoom),
        (this.near = t.near),
        (this.far = t.far),
        (this.focus = t.focus),
        (this.aspect = t.aspect),
        (this.view = null === t.view ? null : Object.assign({}, t.view)),
        (this.filmGauge = t.filmGauge),
        (this.filmOffset = t.filmOffset),
        this
      );
    }
    setFocalLength(t) {
      const e = (0.5 * this.getFilmHeight()) / t;
      (this.fov = 2 * at * Math.atan(e)), this.updateProjectionMatrix();
    }
    getFocalLength() {
      const t = Math.tan(0.5 * st * this.fov);
      return (0.5 * this.getFilmHeight()) / t;
    }
    getEffectiveFOV() {
      return 2 * at * Math.atan(Math.tan(0.5 * st * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    setViewOffset(t, e, i, n, r, s) {
      (this.aspect = t / e),
        null === this.view &&
          (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1,
          }),
        (this.view.enabled = !0),
        (this.view.fullWidth = t),
        (this.view.fullHeight = e),
        (this.view.offsetX = i),
        (this.view.offsetY = n),
        (this.view.width = r),
        (this.view.height = s),
        this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = !1),
        this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const t = this.near;
      let e = (t * Math.tan(0.5 * st * this.fov)) / this.zoom,
        i = 2 * e,
        n = this.aspect * i,
        r = -0.5 * n;
      const s = this.view;
      if (null !== this.view && this.view.enabled) {
        const t = s.fullWidth,
          a = s.fullHeight;
        (r += (s.offsetX * n) / t),
          (e -= (s.offsetY * i) / a),
          (n *= s.width / t),
          (i *= s.height / a);
      }
      const a = this.filmOffset;
      0 !== a && (r += (t * a) / this.getFilmWidth()),
        this.projectionMatrix.makePerspective(
          r,
          r + n,
          e,
          e - i,
          t,
          this.far,
          this.coordinateSystem
        ),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        (e.object.fov = this.fov),
        (e.object.zoom = this.zoom),
        (e.object.near = this.near),
        (e.object.far = this.far),
        (e.object.focus = this.focus),
        (e.object.aspect = this.aspect),
        null !== this.view && (e.object.view = Object.assign({}, this.view)),
        (e.object.filmGauge = this.filmGauge),
        (e.object.filmOffset = this.filmOffset),
        e
      );
    }
  }
  const Qi = -90;
  class $i extends Ge {
    constructor(t, e, i) {
      super(),
        (this.type = "CubeCamera"),
        (this.renderTarget = i),
        (this.coordinateSystem = null),
        (this.activeMipmapLevel = 0);
      const n = new Ji(Qi, 1, t, e);
      (n.layers = this.layers), this.add(n);
      const r = new Ji(Qi, 1, t, e);
      (r.layers = this.layers), this.add(r);
      const s = new Ji(Qi, 1, t, e);
      (s.layers = this.layers), this.add(s);
      const a = new Ji(Qi, 1, t, e);
      (a.layers = this.layers), this.add(a);
      const o = new Ji(Qi, 1, t, e);
      (o.layers = this.layers), this.add(o);
      const l = new Ji(Qi, 1, t, e);
      (l.layers = this.layers), this.add(l);
    }
    updateCoordinateSystem() {
      const t = this.coordinateSystem,
        e = this.children.concat(),
        [i, n, r, s, a, o] = e;
      for (const t of e) this.remove(t);
      if (t === et)
        i.up.set(0, 1, 0),
          i.lookAt(1, 0, 0),
          n.up.set(0, 1, 0),
          n.lookAt(-1, 0, 0),
          r.up.set(0, 0, -1),
          r.lookAt(0, 1, 0),
          s.up.set(0, 0, 1),
          s.lookAt(0, -1, 0),
          a.up.set(0, 1, 0),
          a.lookAt(0, 0, 1),
          o.up.set(0, 1, 0),
          o.lookAt(0, 0, -1);
      else {
        if (t !== it)
          throw new Error(
            "THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " +
              t
          );
        i.up.set(0, -1, 0),
          i.lookAt(-1, 0, 0),
          n.up.set(0, -1, 0),
          n.lookAt(1, 0, 0),
          r.up.set(0, 0, 1),
          r.lookAt(0, 1, 0),
          s.up.set(0, 0, -1),
          s.lookAt(0, -1, 0),
          a.up.set(0, -1, 0),
          a.lookAt(0, 0, 1),
          o.up.set(0, -1, 0),
          o.lookAt(0, 0, -1);
      }
      for (const t of e) this.add(t), t.updateMatrixWorld();
    }
    update(t, e) {
      null === this.parent && this.updateMatrixWorld();
      const { renderTarget: i, activeMipmapLevel: n } = this;
      this.coordinateSystem !== t.coordinateSystem &&
        ((this.coordinateSystem = t.coordinateSystem),
        this.updateCoordinateSystem());
      const [r, s, a, o, l, h] = this.children,
        c = t.getRenderTarget(),
        d = t.getActiveCubeFace(),
        u = t.getActiveMipmapLevel(),
        p = t.xr.enabled;
      t.xr.enabled = !1;
      const m = i.texture.generateMipmaps;
      (i.texture.generateMipmaps = !1),
        t.setRenderTarget(i, 0, n),
        t.render(e, r),
        t.setRenderTarget(i, 1, n),
        t.render(e, s),
        t.setRenderTarget(i, 2, n),
        t.render(e, a),
        t.setRenderTarget(i, 3, n),
        t.render(e, o),
        t.setRenderTarget(i, 4, n),
        t.render(e, l),
        (i.texture.generateMipmaps = m),
        t.setRenderTarget(i, 5, n),
        t.render(e, h),
        t.setRenderTarget(c, d, u),
        (t.xr.enabled = p),
        (i.texture.needsPMREMUpdate = !0);
    }
  }
  class tn extends Nt {
    constructor(t, e, i, n, r, s, a, o, l, h) {
      super(
        (t = void 0 !== t ? t : []),
        (e = void 0 !== e ? e : m),
        i,
        n,
        r,
        s,
        a,
        o,
        l,
        h
      ),
        (this.isCubeTexture = !0),
        (this.flipY = !1);
    }
    get images() {
      return this.image;
    }
    set images(t) {
      this.image = t;
    }
  }
  class en extends zt {
    constructor(t = 1, e = {}) {
      super(t, t, e), (this.isWebGLCubeRenderTarget = !0);
      const i = { width: t, height: t, depth: 1 },
        n = [i, i, i, i, i, i];
      void 0 !== e.encoding &&
        (Mt(
          "THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."
        ),
        (e.colorSpace = e.encoding === H ? W : G)),
        (this.texture = new tn(
          n,
          e.mapping,
          e.wrapS,
          e.wrapT,
          e.magFilter,
          e.minFilter,
          e.format,
          e.type,
          e.anisotropy,
          e.colorSpace
        )),
        (this.texture.isRenderTargetTexture = !0),
        (this.texture.generateMipmaps =
          void 0 !== e.generateMipmaps && e.generateMipmaps),
        (this.texture.minFilter = void 0 !== e.minFilter ? e.minFilter : b);
    }
    fromEquirectangularTexture(t, e) {
      (this.texture.type = e.type),
        (this.texture.colorSpace = e.colorSpace),
        (this.texture.generateMipmaps = e.generateMipmaps),
        (this.texture.minFilter = e.minFilter),
        (this.texture.magFilter = e.magFilter);
      const i = { tEquirect: { value: null } },
        n =
          "\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",
        r =
          "\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t",
        s = new Wi(5, 5, 5),
        a = new Ki({
          name: "CubemapFromEquirect",
          uniforms: ji(i),
          vertexShader: n,
          fragmentShader: r,
          side: 1,
          blending: 0,
        });
      a.uniforms.tEquirect.value = e;
      const o = new Hi(s, a),
        l = e.minFilter;
      return (
        e.minFilter === E && (e.minFilter = b),
        new $i(1, 10, this).update(t, o),
        (e.minFilter = l),
        o.geometry.dispose(),
        o.material.dispose(),
        this
      );
    }
    clear(t, e, i, n) {
      const r = t.getRenderTarget();
      for (let r = 0; r < 6; r++) t.setRenderTarget(this, r), t.clear(e, i, n);
      t.setRenderTarget(r);
    }
  }
  const nn = new Ht(),
    rn = new Ht(),
    sn = new ft();
  class an {
    constructor(t = new Ht(1, 0, 0), e = 0) {
      (this.isPlane = !0), (this.normal = t), (this.constant = e);
    }
    set(t, e) {
      return this.normal.copy(t), (this.constant = e), this;
    }
    setComponents(t, e, i, n) {
      return this.normal.set(t, e, i), (this.constant = n), this;
    }
    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), (this.constant = -e.dot(this.normal)), this;
    }
    setFromCoplanarPoints(t, e, i) {
      const n = nn.subVectors(i, e).cross(rn.subVectors(t, e)).normalize();
      return this.setFromNormalAndCoplanarPoint(n, t), this;
    }
    copy(t) {
      return this.normal.copy(t.normal), (this.constant = t.constant), this;
    }
    normalize() {
      const t = 1 / this.normal.length();
      return this.normal.multiplyScalar(t), (this.constant *= t), this;
    }
    negate() {
      return (this.constant *= -1), this.normal.negate(), this;
    }
    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant;
    }
    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius;
    }
    projectPoint(t, e) {
      return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
    }
    intersectLine(t, e) {
      const i = t.delta(nn),
        n = this.normal.dot(i);
      if (0 === n)
        return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : null;
      const r = -(t.start.dot(this.normal) + this.constant) / n;
      return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(i, r);
    }
    intersectsLine(t) {
      const e = this.distanceToPoint(t.start),
        i = this.distanceToPoint(t.end);
      return (e < 0 && i > 0) || (i < 0 && e > 0);
    }
    intersectsBox(t) {
      return t.intersectsPlane(this);
    }
    intersectsSphere(t) {
      return t.intersectsPlane(this);
    }
    coplanarPoint(t) {
      return t.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(t, e) {
      const i = e || sn.getNormalMatrix(t),
        n = this.coplanarPoint(nn).applyMatrix4(t),
        r = this.normal.applyMatrix3(i).normalize();
      return (this.constant = -n.dot(r)), this;
    }
    translate(t) {
      return (this.constant -= t.dot(this.normal)), this;
    }
    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  const on = new he(),
    ln = new Ht();
  class hn {
    constructor(
      t = new an(),
      e = new an(),
      i = new an(),
      n = new an(),
      r = new an(),
      s = new an()
    ) {
      this.planes = [t, e, i, n, r, s];
    }
    set(t, e, i, n, r, s) {
      const a = this.planes;
      return (
        a[0].copy(t),
        a[1].copy(e),
        a[2].copy(i),
        a[3].copy(n),
        a[4].copy(r),
        a[5].copy(s),
        this
      );
    }
    copy(t) {
      const e = this.planes;
      for (let i = 0; i < 6; i++) e[i].copy(t.planes[i]);
      return this;
    }
    setFromProjectionMatrix(t, e = 2e3) {
      const i = this.planes,
        n = t.elements,
        r = n[0],
        s = n[1],
        a = n[2],
        o = n[3],
        l = n[4],
        h = n[5],
        c = n[6],
        d = n[7],
        u = n[8],
        p = n[9],
        m = n[10],
        f = n[11],
        g = n[12],
        _ = n[13],
        v = n[14],
        x = n[15];
      if (
        (i[0].setComponents(o - r, d - l, f - u, x - g).normalize(),
        i[1].setComponents(o + r, d + l, f + u, x + g).normalize(),
        i[2].setComponents(o + s, d + h, f + p, x + _).normalize(),
        i[3].setComponents(o - s, d - h, f - p, x - _).normalize(),
        i[4].setComponents(o - a, d - c, f - m, x - v).normalize(),
        e === et)
      )
        i[5].setComponents(o + a, d + c, f + m, x + v).normalize();
      else {
        if (e !== it)
          throw new Error(
            "THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " +
              e
          );
        i[5].setComponents(a, c, m, v).normalize();
      }
      return this;
    }
    intersectsObject(t) {
      if (void 0 !== t.boundingSphere)
        null === t.boundingSphere && t.computeBoundingSphere(),
          on.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
      else {
        const e = t.geometry;
        null === e.boundingSphere && e.computeBoundingSphere(),
          on.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
      }
      return this.intersectsSphere(on);
    }
    intersectsSprite(t) {
      return (
        on.center.set(0, 0, 0),
        (on.radius = 0.7071067811865476),
        on.applyMatrix4(t.matrixWorld),
        this.intersectsSphere(on)
      );
    }
    intersectsSphere(t) {
      const e = this.planes,
        i = t.center,
        n = -t.radius;
      for (let t = 0; t < 6; t++) if (e[t].distanceToPoint(i) < n) return !1;
      return !0;
    }
    intersectsBox(t) {
      const e = this.planes;
      for (let i = 0; i < 6; i++) {
        const n = e[i];
        if (
          ((ln.x = n.normal.x > 0 ? t.max.x : t.min.x),
          (ln.y = n.normal.y > 0 ? t.max.y : t.min.y),
          (ln.z = n.normal.z > 0 ? t.max.z : t.min.z),
          n.distanceToPoint(ln) < 0)
        )
          return !1;
      }
      return !0;
    }
    containsPoint(t) {
      const e = this.planes;
      for (let i = 0; i < 6; i++) if (e[i].distanceToPoint(t) < 0) return !1;
      return !0;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  function cn() {
    let t = null,
      e = !1,
      i = null,
      n = null;
    function r(e, s) {
      i(e, s), (n = t.requestAnimationFrame(r));
    }
    return {
      start: function () {
        !0 !== e && null !== i && ((n = t.requestAnimationFrame(r)), (e = !0));
      },
      stop: function () {
        t.cancelAnimationFrame(n), (e = !1);
      },
      setAnimationLoop: function (t) {
        i = t;
      },
      setContext: function (e) {
        t = e;
      },
    };
  }
  function dn(t, e) {
    const i = e.isWebGL2,
      n = new WeakMap();
    return {
      get: function (t) {
        return t.isInterleavedBufferAttribute && (t = t.data), n.get(t);
      },
      remove: function (e) {
        e.isInterleavedBufferAttribute && (e = e.data);
        const i = n.get(e);
        i && (t.deleteBuffer(i.buffer), n.delete(e));
      },
      update: function (e, r) {
        if (e.isGLBufferAttribute) {
          const t = n.get(e);
          return void (
            (!t || t.version < e.version) &&
            n.set(e, {
              buffer: e.buffer,
              type: e.type,
              bytesPerElement: e.elementSize,
              version: e.version,
            })
          );
        }
        e.isInterleavedBufferAttribute && (e = e.data);
        const s = n.get(e);
        if (void 0 === s)
          n.set(
            e,
            (function (e, n) {
              const r = e.array,
                s = e.usage,
                a = r.byteLength,
                o = t.createBuffer();
              let l;
              if (
                (t.bindBuffer(n, o),
                t.bufferData(n, r, s),
                e.onUploadCallback(),
                r instanceof Float32Array)
              )
                l = t.FLOAT;
              else if (r instanceof Uint16Array)
                if (e.isFloat16BufferAttribute) {
                  if (!i)
                    throw new Error(
                      "THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."
                    );
                  l = t.HALF_FLOAT;
                } else l = t.UNSIGNED_SHORT;
              else if (r instanceof Int16Array) l = t.SHORT;
              else if (r instanceof Uint32Array) l = t.UNSIGNED_INT;
              else if (r instanceof Int32Array) l = t.INT;
              else if (r instanceof Int8Array) l = t.BYTE;
              else if (r instanceof Uint8Array) l = t.UNSIGNED_BYTE;
              else {
                if (!(r instanceof Uint8ClampedArray))
                  throw new Error(
                    "THREE.WebGLAttributes: Unsupported buffer data format: " +
                      r
                  );
                l = t.UNSIGNED_BYTE;
              }
              return {
                buffer: o,
                type: l,
                bytesPerElement: r.BYTES_PER_ELEMENT,
                version: e.version,
                size: a,
              };
            })(e, r)
          );
        else if (s.version < e.version) {
          if (s.size !== e.array.byteLength)
            throw new Error(
              "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported."
            );
          !(function (e, n, r) {
            const s = n.array,
              a = n._updateRange,
              o = n.updateRanges;
            if (
              (t.bindBuffer(r, e),
              -1 === a.count && 0 === o.length && t.bufferSubData(r, 0, s),
              0 !== o.length)
            ) {
              for (let e = 0, n = o.length; e < n; e++) {
                const n = o[e];
                i
                  ? t.bufferSubData(
                      r,
                      n.start * s.BYTES_PER_ELEMENT,
                      s,
                      n.start,
                      n.count
                    )
                  : t.bufferSubData(
                      r,
                      n.start * s.BYTES_PER_ELEMENT,
                      s.subarray(n.start, n.start + n.count)
                    );
              }
              n.clearUpdateRanges();
            }
            -1 !== a.count &&
              (i
                ? t.bufferSubData(
                    r,
                    a.offset * s.BYTES_PER_ELEMENT,
                    s,
                    a.offset,
                    a.count
                  )
                : t.bufferSubData(
                    r,
                    a.offset * s.BYTES_PER_ELEMENT,
                    s.subarray(a.offset, a.offset + a.count)
                  ),
              (a.count = -1)),
              n.onUploadCallback();
          })(s.buffer, e, r),
            (s.version = e.version);
        }
      },
    };
  }
  class un extends Ei {
    constructor(t = 1, e = 1, i = 1, n = 1) {
      super(),
        (this.type = "PlaneGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          widthSegments: i,
          heightSegments: n,
        });
      const r = t / 2,
        s = e / 2,
        a = Math.floor(i),
        o = Math.floor(n),
        l = a + 1,
        h = o + 1,
        c = t / a,
        d = e / o,
        u = [],
        p = [],
        m = [],
        f = [];
      for (let t = 0; t < h; t++) {
        const e = t * d - s;
        for (let i = 0; i < l; i++) {
          const n = i * c - r;
          p.push(n, -e, 0), m.push(0, 0, 1), f.push(i / a), f.push(1 - t / o);
        }
      }
      for (let t = 0; t < o; t++)
        for (let e = 0; e < a; e++) {
          const i = e + l * t,
            n = e + l * (t + 1),
            r = e + 1 + l * (t + 1),
            s = e + 1 + l * t;
          u.push(i, n, s), u.push(n, r, s);
        }
      this.setIndex(u),
        this.setAttribute("position", new gi(p, 3)),
        this.setAttribute("normal", new gi(m, 3)),
        this.setAttribute("uv", new gi(f, 2));
    }
    copy(t) {
      return (
        super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this
      );
    }
    static fromJSON(t) {
      return new un(t.width, t.height, t.widthSegments, t.heightSegments);
    }
  }
  const pn = {
      alphahash_fragment:
        "#ifdef USE_ALPHAHASH\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
      alphahash_pars_fragment:
        "#ifdef USE_ALPHAHASH\n\tconst float ALPHA_HASH_SCALE = 0.05;\n\tfloat hash2D( vec2 value ) {\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\t}\n\tfloat hash3D( vec3 value ) {\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\t}\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\t}\n#endif",
      alphamap_fragment:
        "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
      alphamap_pars_fragment:
        "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
      alphatest_fragment:
        "#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif",
      alphatest_pars_fragment:
        "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif",
      aomap_fragment:
        "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif",
      aomap_pars_fragment:
        "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
      batching_pars_vertex:
        "#ifdef USE_BATCHING\n\tattribute float batchId;\n\tuniform highp sampler2D batchingTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif",
      batching_vertex:
        "#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( batchId );\n#endif",
      begin_vertex:
        "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n\tvPosition = vec3( position );\n#endif",
      beginnormal_vertex:
        "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
      bsdfs:
        "float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated",
      iridescence_fragment:
        "#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\treturn vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif",
      bumpmap_pars_fragment:
        "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
      clipping_planes_fragment:
        "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
      clipping_planes_pars_fragment:
        "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
      clipping_planes_pars_vertex:
        "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
      clipping_planes_vertex:
        "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
      color_fragment:
        "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",
      color_pars_fragment:
        "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",
      color_pars_vertex:
        "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",
      color_vertex:
        "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",
      common:
        "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n\tvarying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat luminance( const in vec3 rgb ) {\n\tconst vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n\treturn dot( weights, rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
      cube_uv_reflection_fragment:
        "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_v0 0.339\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_v1 0.276\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_v4 0.046\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_v5 0.016\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_v6 0.0038\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",
      defaultnormal_vertex:
        "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = bm * transformedTangent;\n\t#endif\n#endif\n#ifdef USE_INSTANCING\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = im * transformedTangent;\n\t#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
      displacementmap_pars_vertex:
        "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
      displacementmap_vertex:
        "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
      emissivemap_fragment:
        "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
      emissivemap_pars_fragment:
        "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
      colorspace_fragment:
        "gl_FragColor = linearToOutputTexel( gl_FragColor );",
      colorspace_pars_fragment:
        "\nconst mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(\n\tvec3( 0.8224621, 0.177538, 0.0 ),\n\tvec3( 0.0331941, 0.9668058, 0.0 ),\n\tvec3( 0.0170827, 0.0723974, 0.9105199 )\n);\nconst mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.2249401, - 0.2249404, 0.0 ),\n\tvec3( - 0.0420569, 1.0420571, 0.0 ),\n\tvec3( - 0.0196376, - 0.0786361, 1.0982735 )\n);\nvec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );\n}\nvec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );\n}\nvec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn sRGBTransferOETF( value );\n}",
      envmap_fragment:
        "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
      envmap_common_pars_fragment:
        "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
      envmap_pars_fragment:
        "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
      envmap_pars_vertex:
        "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
      envmap_physical_pars_fragment:
        "#ifdef USE_ENVMAP\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\t#ifdef USE_ANISOTROPY\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\t\t\t#else\n\t\t\t\treturn vec3( 0.0 );\n\t\t\t#endif\n\t\t}\n\t#endif\n#endif",
      envmap_vertex:
        "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
      fog_vertex: "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif",
      fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif",
      fog_fragment:
        "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
      fog_pars_fragment:
        "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
      gradientmap_pars_fragment:
        "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}",
      lightmap_fragment:
        "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif",
      lightmap_pars_fragment:
        "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
      lights_lambert_fragment:
        "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
      lights_lambert_pars_fragment:
        "varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert",
      lights_pars_begin:
        "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n\tuniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( LEGACY_LIGHTS )\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#else\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif",
      lights_toon_fragment:
        "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
      lights_toon_pars_fragment:
        "varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon",
      lights_phong_fragment:
        "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
      lights_phong_pars_fragment:
        "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong",
      lights_physical_fragment:
        "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\t#ifdef USE_ANISOTROPYMAP\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\t#else\n\t\tvec2 anisotropyV = anisotropyVector;\n\t#endif\n\tmaterial.anisotropy = length( anisotropyV );\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
      lights_physical_pars_fragment:
        "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\tfloat v = 0.5 / ( gv + gl );\n\t\treturn saturate(v);\n\t}\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\t}\n#endif\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\t#else\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t#endif\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\t#else\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\t#endif\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
      lights_fragment_begin:
        "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n\tgeometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if defined( USE_LIGHT_PROBES )\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
      lights_fragment_maps:
        "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\t#ifdef USE_ANISOTROPY\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\t#else\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif",
      lights_fragment_end:
        "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
      logdepthbuf_fragment:
        "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
      logdepthbuf_pars_fragment:
        "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
      logdepthbuf_pars_vertex:
        "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
      logdepthbuf_vertex:
        "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",
      map_fragment:
        "#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif",
      map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
      map_particle_fragment:
        "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
      map_particle_pars_fragment:
        "#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
      metalnessmap_fragment:
        "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
      metalnessmap_pars_fragment:
        "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
      morphcolor_vertex:
        "#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif",
      morphnormal_vertex:
        "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif",
      morphtarget_pars_vertex:
        "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform ivec2 morphTargetsTextureSize;\n\t\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif",
      morphtarget_vertex:
        "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif",
      normal_fragment_begin:
        "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
      normal_fragment_maps:
        "#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
      normal_pars_fragment:
        "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
      normal_pars_vertex:
        "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
      normal_vertex:
        "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif",
      normalmap_pars_fragment:
        "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif",
      clearcoat_normal_fragment_begin:
        "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
      clearcoat_normal_fragment_maps:
        "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
      clearcoat_pars_fragment:
        "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif",
      iridescence_pars_fragment:
        "#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif",
      opaque_fragment:
        "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
      packing:
        "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec2 packDepthToRG( in highp float v ) {\n\treturn packDepthToRGBA( v ).yx;\n}\nfloat unpackRGToDepth( const in highp vec2 v ) {\n\treturn unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}",
      premultiplied_alpha_fragment:
        "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
      project_vertex:
        "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n\tmvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
      dithering_fragment:
        "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
      dithering_pars_fragment:
        "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
      roughnessmap_fragment:
        "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
      roughnessmap_pars_fragment:
        "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
      shadowmap_pars_fragment:
        "#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
      shadowmap_pars_vertex:
        "#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
      shadowmap_vertex:
        "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif",
      shadowmask_pars_fragment:
        "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
      skinbase_vertex:
        "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
      skinning_pars_vertex:
        "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif",
      skinning_vertex:
        "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
      skinnormal_vertex:
        "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
      specularmap_fragment:
        "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
      specularmap_pars_fragment:
        "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
      tonemapping_fragment:
        "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
      tonemapping_pars_fragment:
        "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
      transmission_fragment:
        "#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
      transmission_pars_fragment:
        "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn vec3( 1.0 );\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\t}\n#endif",
      uv_pars_fragment:
        "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",
      uv_pars_vertex:
        "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",
      uv_vertex:
        "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
      worldpos_vertex:
        "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_BATCHING\n\t\tworldPosition = batchingMatrix * worldPosition;\n\t#endif\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",
      background_vert:
        "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
      background_frag:
        "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
      backgroundCube_vert:
        "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
      backgroundCube_frag:
        "#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
      cube_vert:
        "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
      cube_frag:
        "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
      depth_vert:
        "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
      depth_frag:
        "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",
      distanceRGBA_vert:
        "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
      distanceRGBA_frag:
        "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
      equirect_vert:
        "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
      equirect_frag:
        "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
      linedashed_vert:
        "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
      linedashed_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
      meshbasic_vert:
        "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
      meshbasic_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshlambert_vert:
        "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshlambert_frag:
        "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshmatcap_vert:
        "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
      meshmatcap_frag:
        "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshnormal_vert:
        "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
      meshnormal_frag:
        "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}",
      meshphong_vert:
        "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshphong_frag:
        "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshphysical_vert:
        "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}",
      meshphysical_frag:
        "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\t#endif\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshtoon_vert:
        "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshtoon_frag:
        "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      points_vert:
        "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
      points_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
      shadow_vert:
        "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      shadow_frag:
        "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}",
      sprite_vert:
        "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
      sprite_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}",
    },
    mn = {
      common: {
        diffuse: { value: new ai(16777215) },
        opacity: { value: 1 },
        map: { value: null },
        mapTransform: { value: new ft() },
        alphaMap: { value: null },
        alphaMapTransform: { value: new ft() },
        alphaTest: { value: 0 },
      },
      specularmap: {
        specularMap: { value: null },
        specularMapTransform: { value: new ft() },
      },
      envmap: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        reflectivity: { value: 1 },
        ior: { value: 1.5 },
        refractionRatio: { value: 0.98 },
      },
      aomap: {
        aoMap: { value: null },
        aoMapIntensity: { value: 1 },
        aoMapTransform: { value: new ft() },
      },
      lightmap: {
        lightMap: { value: null },
        lightMapIntensity: { value: 1 },
        lightMapTransform: { value: new ft() },
      },
      bumpmap: {
        bumpMap: { value: null },
        bumpMapTransform: { value: new ft() },
        bumpScale: { value: 1 },
      },
      normalmap: {
        normalMap: { value: null },
        normalMapTransform: { value: new ft() },
        normalScale: { value: new mt(1, 1) },
      },
      displacementmap: {
        displacementMap: { value: null },
        displacementMapTransform: { value: new ft() },
        displacementScale: { value: 1 },
        displacementBias: { value: 0 },
      },
      emissivemap: {
        emissiveMap: { value: null },
        emissiveMapTransform: { value: new ft() },
      },
      metalnessmap: {
        metalnessMap: { value: null },
        metalnessMapTransform: { value: new ft() },
      },
      roughnessmap: {
        roughnessMap: { value: null },
        roughnessMapTransform: { value: new ft() },
      },
      gradientmap: { gradientMap: { value: null } },
      fog: {
        fogDensity: { value: 25e-5 },
        fogNear: { value: 1 },
        fogFar: { value: 2e3 },
        fogColor: { value: new ai(16777215) },
      },
      lights: {
        ambientLightColor: { value: [] },
        lightProbe: { value: [] },
        directionalLights: {
          value: [],
          properties: { direction: {}, color: {} },
        },
        directionalLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        directionalShadowMap: { value: [] },
        directionalShadowMatrix: { value: [] },
        spotLights: {
          value: [],
          properties: {
            color: {},
            position: {},
            direction: {},
            distance: {},
            coneCos: {},
            penumbraCos: {},
            decay: {},
          },
        },
        spotLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        spotLightMap: { value: [] },
        spotShadowMap: { value: [] },
        spotLightMatrix: { value: [] },
        pointLights: {
          value: [],
          properties: { color: {}, position: {}, decay: {}, distance: {} },
        },
        pointLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
            shadowCameraNear: {},
            shadowCameraFar: {},
          },
        },
        pointShadowMap: { value: [] },
        pointShadowMatrix: { value: [] },
        hemisphereLights: {
          value: [],
          properties: { direction: {}, skyColor: {}, groundColor: {} },
        },
        rectAreaLights: {
          value: [],
          properties: { color: {}, position: {}, width: {}, height: {} },
        },
        ltc_1: { value: null },
        ltc_2: { value: null },
      },
      points: {
        diffuse: { value: new ai(16777215) },
        opacity: { value: 1 },
        size: { value: 1 },
        scale: { value: 1 },
        map: { value: null },
        alphaMap: { value: null },
        alphaMapTransform: { value: new ft() },
        alphaTest: { value: 0 },
        uvTransform: { value: new ft() },
      },
      sprite: {
        diffuse: { value: new ai(16777215) },
        opacity: { value: 1 },
        center: { value: new mt(0.5, 0.5) },
        rotation: { value: 0 },
        map: { value: null },
        mapTransform: { value: new ft() },
        alphaMap: { value: null },
        alphaMapTransform: { value: new ft() },
        alphaTest: { value: 0 },
      },
    },
    fn = {
      basic: {
        uniforms: Xi([
          mn.common,
          mn.specularmap,
          mn.envmap,
          mn.aomap,
          mn.lightmap,
          mn.fog,
        ]),
        vertexShader: pn.meshbasic_vert,
        fragmentShader: pn.meshbasic_frag,
      },
      lambert: {
        uniforms: Xi([
          mn.common,
          mn.specularmap,
          mn.envmap,
          mn.aomap,
          mn.lightmap,
          mn.emissivemap,
          mn.bumpmap,
          mn.normalmap,
          mn.displacementmap,
          mn.fog,
          mn.lights,
          { emissive: { value: new ai(0) } },
        ]),
        vertexShader: pn.meshlambert_vert,
        fragmentShader: pn.meshlambert_frag,
      },
      phong: {
        uniforms: Xi([
          mn.common,
          mn.specularmap,
          mn.envmap,
          mn.aomap,
          mn.lightmap,
          mn.emissivemap,
          mn.bumpmap,
          mn.normalmap,
          mn.displacementmap,
          mn.fog,
          mn.lights,
          {
            emissive: { value: new ai(0) },
            specular: { value: new ai(1118481) },
            shininess: { value: 30 },
          },
        ]),
        vertexShader: pn.meshphong_vert,
        fragmentShader: pn.meshphong_frag,
      },
      standard: {
        uniforms: Xi([
          mn.common,
          mn.envmap,
          mn.aomap,
          mn.lightmap,
          mn.emissivemap,
          mn.bumpmap,
          mn.normalmap,
          mn.displacementmap,
          mn.roughnessmap,
          mn.metalnessmap,
          mn.fog,
          mn.lights,
          {
            emissive: { value: new ai(0) },
            roughness: { value: 1 },
            metalness: { value: 0 },
            envMapIntensity: { value: 1 },
          },
        ]),
        vertexShader: pn.meshphysical_vert,
        fragmentShader: pn.meshphysical_frag,
      },
      toon: {
        uniforms: Xi([
          mn.common,
          mn.aomap,
          mn.lightmap,
          mn.emissivemap,
          mn.bumpmap,
          mn.normalmap,
          mn.displacementmap,
          mn.gradientmap,
          mn.fog,
          mn.lights,
          { emissive: { value: new ai(0) } },
        ]),
        vertexShader: pn.meshtoon_vert,
        fragmentShader: pn.meshtoon_frag,
      },
      matcap: {
        uniforms: Xi([
          mn.common,
          mn.bumpmap,
          mn.normalmap,
          mn.displacementmap,
          mn.fog,
          { matcap: { value: null } },
        ]),
        vertexShader: pn.meshmatcap_vert,
        fragmentShader: pn.meshmatcap_frag,
      },
      points: {
        uniforms: Xi([mn.points, mn.fog]),
        vertexShader: pn.points_vert,
        fragmentShader: pn.points_frag,
      },
      dashed: {
        uniforms: Xi([
          mn.common,
          mn.fog,
          {
            scale: { value: 1 },
            dashSize: { value: 1 },
            totalSize: { value: 2 },
          },
        ]),
        vertexShader: pn.linedashed_vert,
        fragmentShader: pn.linedashed_frag,
      },
      depth: {
        uniforms: Xi([mn.common, mn.displacementmap]),
        vertexShader: pn.depth_vert,
        fragmentShader: pn.depth_frag,
      },
      normal: {
        uniforms: Xi([
          mn.common,
          mn.bumpmap,
          mn.normalmap,
          mn.displacementmap,
          { opacity: { value: 1 } },
        ]),
        vertexShader: pn.meshnormal_vert,
        fragmentShader: pn.meshnormal_frag,
      },
      sprite: {
        uniforms: Xi([mn.sprite, mn.fog]),
        vertexShader: pn.sprite_vert,
        fragmentShader: pn.sprite_frag,
      },
      background: {
        uniforms: {
          uvTransform: { value: new ft() },
          t2D: { value: null },
          backgroundIntensity: { value: 1 },
        },
        vertexShader: pn.background_vert,
        fragmentShader: pn.background_frag,
      },
      backgroundCube: {
        uniforms: {
          envMap: { value: null },
          flipEnvMap: { value: -1 },
          backgroundBlurriness: { value: 0 },
          backgroundIntensity: { value: 1 },
        },
        vertexShader: pn.backgroundCube_vert,
        fragmentShader: pn.backgroundCube_frag,
      },
      cube: {
        uniforms: {
          tCube: { value: null },
          tFlip: { value: -1 },
          opacity: { value: 1 },
        },
        vertexShader: pn.cube_vert,
        fragmentShader: pn.cube_frag,
      },
      equirect: {
        uniforms: { tEquirect: { value: null } },
        vertexShader: pn.equirect_vert,
        fragmentShader: pn.equirect_frag,
      },
      distanceRGBA: {
        uniforms: Xi([
          mn.common,
          mn.displacementmap,
          {
            referencePosition: { value: new Ht() },
            nearDistance: { value: 1 },
            farDistance: { value: 1e3 },
          },
        ]),
        vertexShader: pn.distanceRGBA_vert,
        fragmentShader: pn.distanceRGBA_frag,
      },
      shadow: {
        uniforms: Xi([
          mn.lights,
          mn.fog,
          { color: { value: new ai(0) }, opacity: { value: 1 } },
        ]),
        vertexShader: pn.shadow_vert,
        fragmentShader: pn.shadow_frag,
      },
    };
  fn.physical = {
    uniforms: Xi([
      fn.standard.uniforms,
      {
        clearcoat: { value: 0 },
        clearcoatMap: { value: null },
        clearcoatMapTransform: { value: new ft() },
        clearcoatNormalMap: { value: null },
        clearcoatNormalMapTransform: { value: new ft() },
        clearcoatNormalScale: { value: new mt(1, 1) },
        clearcoatRoughness: { value: 0 },
        clearcoatRoughnessMap: { value: null },
        clearcoatRoughnessMapTransform: { value: new ft() },
        iridescence: { value: 0 },
        iridescenceMap: { value: null },
        iridescenceMapTransform: { value: new ft() },
        iridescenceIOR: { value: 1.3 },
        iridescenceThicknessMinimum: { value: 100 },
        iridescenceThicknessMaximum: { value: 400 },
        iridescenceThicknessMap: { value: null },
        iridescenceThicknessMapTransform: { value: new ft() },
        sheen: { value: 0 },
        sheenColor: { value: new ai(0) },
        sheenColorMap: { value: null },
        sheenColorMapTransform: { value: new ft() },
        sheenRoughness: { value: 1 },
        sheenRoughnessMap: { value: null },
        sheenRoughnessMapTransform: { value: new ft() },
        transmission: { value: 0 },
        transmissionMap: { value: null },
        transmissionMapTransform: { value: new ft() },
        transmissionSamplerSize: { value: new mt() },
        transmissionSamplerMap: { value: null },
        thickness: { value: 0 },
        thicknessMap: { value: null },
        thicknessMapTransform: { value: new ft() },
        attenuationDistance: { value: 0 },
        attenuationColor: { value: new ai(0) },
        specularColor: { value: new ai(1, 1, 1) },
        specularColorMap: { value: null },
        specularColorMapTransform: { value: new ft() },
        specularIntensity: { value: 1 },
        specularIntensityMap: { value: null },
        specularIntensityMapTransform: { value: new ft() },
        anisotropyVector: { value: new mt() },
        anisotropyMap: { value: null },
        anisotropyMapTransform: { value: new ft() },
      },
    ]),
    vertexShader: pn.meshphysical_vert,
    fragmentShader: pn.meshphysical_frag,
  };
  const gn = { r: 0, b: 0, g: 0 };
  function _n(t, e, i, n, r, s, a) {
    const o = new ai(0);
    let l,
      h,
      c = !0 === s ? 0 : 1,
      d = null,
      u = 0,
      p = null;
    function m(e, i) {
      e.getRGB(gn, qi(t)), n.buffers.color.setClear(gn.r, gn.g, gn.b, i, a);
    }
    return {
      getClearColor: function () {
        return o;
      },
      setClearColor: function (t, e = 1) {
        o.set(t), (c = e), m(o, c);
      },
      getClearAlpha: function () {
        return c;
      },
      setClearAlpha: function (t) {
        (c = t), m(o, c);
      },
      render: function (s, f) {
        let g = !1,
          v = !0 === f.isScene ? f.background : null;
        v && v.isTexture && (v = (f.backgroundBlurriness > 0 ? i : e).get(v)),
          null === v ? m(o, c) : v && v.isColor && (m(v, 1), (g = !0));
        const x = t.xr.getEnvironmentBlendMode();
        "additive" === x
          ? n.buffers.color.setClear(0, 0, 0, 1, a)
          : "alpha-blend" === x && n.buffers.color.setClear(0, 0, 0, 0, a),
          (t.autoClear || g) &&
            t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
          v && (v.isCubeTexture || v.mapping === _)
            ? (void 0 === h &&
                ((h = new Hi(
                  new Wi(1, 1, 1),
                  new Ki({
                    name: "BackgroundCubeMaterial",
                    uniforms: ji(fn.backgroundCube.uniforms),
                    vertexShader: fn.backgroundCube.vertexShader,
                    fragmentShader: fn.backgroundCube.fragmentShader,
                    side: 1,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                h.geometry.deleteAttribute("normal"),
                h.geometry.deleteAttribute("uv"),
                (h.onBeforeRender = function (t, e, i) {
                  this.matrixWorld.copyPosition(i.matrixWorld);
                }),
                Object.defineProperty(h.material, "envMap", {
                  get: function () {
                    return this.uniforms.envMap.value;
                  },
                }),
                r.update(h)),
              (h.material.uniforms.envMap.value = v),
              (h.material.uniforms.flipEnvMap.value =
                v.isCubeTexture && !1 === v.isRenderTargetTexture ? -1 : 1),
              (h.material.uniforms.backgroundBlurriness.value =
                f.backgroundBlurriness),
              (h.material.uniforms.backgroundIntensity.value =
                f.backgroundIntensity),
              (h.material.toneMapped = wt.getTransfer(v.colorSpace) !== K),
              (d === v && u === v.version && p === t.toneMapping) ||
                ((h.material.needsUpdate = !0),
                (d = v),
                (u = v.version),
                (p = t.toneMapping)),
              h.layers.enableAll(),
              s.unshift(h, h.geometry, h.material, 0, 0, null))
            : v &&
              v.isTexture &&
              (void 0 === l &&
                ((l = new Hi(
                  new un(2, 2),
                  new Ki({
                    name: "BackgroundMaterial",
                    uniforms: ji(fn.background.uniforms),
                    vertexShader: fn.background.vertexShader,
                    fragmentShader: fn.background.fragmentShader,
                    side: 0,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                l.geometry.deleteAttribute("normal"),
                Object.defineProperty(l.material, "map", {
                  get: function () {
                    return this.uniforms.t2D.value;
                  },
                }),
                r.update(l)),
              (l.material.uniforms.t2D.value = v),
              (l.material.uniforms.backgroundIntensity.value =
                f.backgroundIntensity),
              (l.material.toneMapped = wt.getTransfer(v.colorSpace) !== K),
              !0 === v.matrixAutoUpdate && v.updateMatrix(),
              l.material.uniforms.uvTransform.value.copy(v.matrix),
              (d === v && u === v.version && p === t.toneMapping) ||
                ((l.material.needsUpdate = !0),
                (d = v),
                (u = v.version),
                (p = t.toneMapping)),
              l.layers.enableAll(),
              s.unshift(l, l.geometry, l.material, 0, 0, null));
      },
    };
  }
  function vn(t, e, i, n) {
    const r = t.getParameter(t.MAX_VERTEX_ATTRIBS),
      s = n.isWebGL2 ? null : e.get("OES_vertex_array_object"),
      a = n.isWebGL2 || null !== s,
      o = {},
      l = p(null);
    let h = l,
      c = !1;
    function d(e) {
      return n.isWebGL2 ? t.bindVertexArray(e) : s.bindVertexArrayOES(e);
    }
    function u(e) {
      return n.isWebGL2 ? t.deleteVertexArray(e) : s.deleteVertexArrayOES(e);
    }
    function p(t) {
      const e = [],
        i = [],
        n = [];
      for (let t = 0; t < r; t++) (e[t] = 0), (i[t] = 0), (n[t] = 0);
      return {
        geometry: null,
        program: null,
        wireframe: !1,
        newAttributes: e,
        enabledAttributes: i,
        attributeDivisors: n,
        object: t,
        attributes: {},
        index: null,
      };
    }
    function m() {
      const t = h.newAttributes;
      for (let e = 0, i = t.length; e < i; e++) t[e] = 0;
    }
    function f(t) {
      g(t, 0);
    }
    function g(i, r) {
      const s = h.newAttributes,
        a = h.enabledAttributes,
        o = h.attributeDivisors;
      (s[i] = 1),
        0 === a[i] && (t.enableVertexAttribArray(i), (a[i] = 1)),
        o[i] !== r &&
          ((n.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[
            n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"
          ](i, r),
          (o[i] = r));
    }
    function _() {
      const e = h.newAttributes,
        i = h.enabledAttributes;
      for (let n = 0, r = i.length; n < r; n++)
        i[n] !== e[n] && (t.disableVertexAttribArray(n), (i[n] = 0));
    }
    function v(e, i, n, r, s, a, o) {
      !0 === o
        ? t.vertexAttribIPointer(e, i, n, s, a)
        : t.vertexAttribPointer(e, i, n, r, s, a);
    }
    function x() {
      y(), (c = !0), h !== l && ((h = l), d(h.object));
    }
    function y() {
      (l.geometry = null), (l.program = null), (l.wireframe = !1);
    }
    return {
      setup: function (r, l, u, x, y) {
        let M = !1;
        if (a) {
          const e = (function (e, i, r) {
            const a = !0 === r.wireframe;
            let l = o[e.id];
            void 0 === l && ((l = {}), (o[e.id] = l));
            let h = l[i.id];
            void 0 === h && ((h = {}), (l[i.id] = h));
            let c = h[a];
            return (
              void 0 === c &&
                ((c = p(
                  n.isWebGL2 ? t.createVertexArray() : s.createVertexArrayOES()
                )),
                (h[a] = c)),
              c
            );
          })(x, u, l);
          h !== e && ((h = e), d(h.object)),
            (M = (function (t, e, i, n) {
              const r = h.attributes,
                s = e.attributes;
              let a = 0;
              const o = i.getAttributes();
              for (const e in o)
                if (o[e].location >= 0) {
                  const i = r[e];
                  let n = s[e];
                  if (
                    (void 0 === n &&
                      ("instanceMatrix" === e &&
                        t.instanceMatrix &&
                        (n = t.instanceMatrix),
                      "instanceColor" === e &&
                        t.instanceColor &&
                        (n = t.instanceColor)),
                    void 0 === i)
                  )
                    return !0;
                  if (i.attribute !== n) return !0;
                  if (n && i.data !== n.data) return !0;
                  a++;
                }
              return h.attributesNum !== a || h.index !== n;
            })(r, x, u, y)),
            M &&
              (function (t, e, i, n) {
                const r = {},
                  s = e.attributes;
                let a = 0;
                const o = i.getAttributes();
                for (const e in o)
                  if (o[e].location >= 0) {
                    let i = s[e];
                    void 0 === i &&
                      ("instanceMatrix" === e &&
                        t.instanceMatrix &&
                        (i = t.instanceMatrix),
                      "instanceColor" === e &&
                        t.instanceColor &&
                        (i = t.instanceColor));
                    const n = {};
                    (n.attribute = i),
                      i && i.data && (n.data = i.data),
                      (r[e] = n),
                      a++;
                  }
                (h.attributes = r), (h.attributesNum = a), (h.index = n);
              })(r, x, u, y);
        } else {
          const t = !0 === l.wireframe;
          (h.geometry === x.id && h.program === u.id && h.wireframe === t) ||
            ((h.geometry = x.id),
            (h.program = u.id),
            (h.wireframe = t),
            (M = !0));
        }
        null !== y && i.update(y, t.ELEMENT_ARRAY_BUFFER),
          (M || c) &&
            ((c = !1),
            (function (r, s, a, o) {
              if (
                !1 === n.isWebGL2 &&
                (r.isInstancedMesh || o.isInstancedBufferGeometry) &&
                null === e.get("ANGLE_instanced_arrays")
              )
                return;
              m();
              const l = o.attributes,
                h = a.getAttributes(),
                c = s.defaultAttributeValues;
              for (const e in h) {
                const s = h[e];
                if (s.location >= 0) {
                  let a = l[e];
                  if (
                    (void 0 === a &&
                      ("instanceMatrix" === e &&
                        r.instanceMatrix &&
                        (a = r.instanceMatrix),
                      "instanceColor" === e &&
                        r.instanceColor &&
                        (a = r.instanceColor)),
                    void 0 !== a)
                  ) {
                    const e = a.normalized,
                      l = a.itemSize,
                      h = i.get(a);
                    if (void 0 === h) continue;
                    const c = h.buffer,
                      d = h.type,
                      u = h.bytesPerElement,
                      p =
                        !0 === n.isWebGL2 &&
                        (d === t.INT ||
                          d === t.UNSIGNED_INT ||
                          1013 === a.gpuType);
                    if (a.isInterleavedBufferAttribute) {
                      const i = a.data,
                        n = i.stride,
                        h = a.offset;
                      if (i.isInstancedInterleavedBuffer) {
                        for (let t = 0; t < s.locationSize; t++)
                          g(s.location + t, i.meshPerAttribute);
                        !0 !== r.isInstancedMesh &&
                          void 0 === o._maxInstanceCount &&
                          (o._maxInstanceCount = i.meshPerAttribute * i.count);
                      } else
                        for (let t = 0; t < s.locationSize; t++)
                          f(s.location + t);
                      t.bindBuffer(t.ARRAY_BUFFER, c);
                      for (let t = 0; t < s.locationSize; t++)
                        v(
                          s.location + t,
                          l / s.locationSize,
                          d,
                          e,
                          n * u,
                          (h + (l / s.locationSize) * t) * u,
                          p
                        );
                    } else {
                      if (a.isInstancedBufferAttribute) {
                        for (let t = 0; t < s.locationSize; t++)
                          g(s.location + t, a.meshPerAttribute);
                        !0 !== r.isInstancedMesh &&
                          void 0 === o._maxInstanceCount &&
                          (o._maxInstanceCount = a.meshPerAttribute * a.count);
                      } else
                        for (let t = 0; t < s.locationSize; t++)
                          f(s.location + t);
                      t.bindBuffer(t.ARRAY_BUFFER, c);
                      for (let t = 0; t < s.locationSize; t++)
                        v(
                          s.location + t,
                          l / s.locationSize,
                          d,
                          e,
                          l * u,
                          (l / s.locationSize) * t * u,
                          p
                        );
                    }
                  } else if (void 0 !== c) {
                    const i = c[e];
                    if (void 0 !== i)
                      switch (i.length) {
                        case 2:
                          t.vertexAttrib2fv(s.location, i);
                          break;
                        case 3:
                          t.vertexAttrib3fv(s.location, i);
                          break;
                        case 4:
                          t.vertexAttrib4fv(s.location, i);
                          break;
                        default:
                          t.vertexAttrib1fv(s.location, i);
                      }
                  }
                }
              }
              _();
            })(r, l, u, x),
            null !== y &&
              t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i.get(y).buffer));
      },
      reset: x,
      resetDefaultState: y,
      dispose: function () {
        x();
        for (const t in o) {
          const e = o[t];
          for (const t in e) {
            const i = e[t];
            for (const t in i) u(i[t].object), delete i[t];
            delete e[t];
          }
          delete o[t];
        }
      },
      releaseStatesOfGeometry: function (t) {
        if (void 0 === o[t.id]) return;
        const e = o[t.id];
        for (const t in e) {
          const i = e[t];
          for (const t in i) u(i[t].object), delete i[t];
          delete e[t];
        }
        delete o[t.id];
      },
      releaseStatesOfProgram: function (t) {
        for (const e in o) {
          const i = o[e];
          if (void 0 === i[t.id]) continue;
          const n = i[t.id];
          for (const t in n) u(n[t].object), delete n[t];
          delete i[t.id];
        }
      },
      initAttributes: m,
      enableAttribute: f,
      disableUnusedAttributes: _,
    };
  }
  function xn(t, e, i, n) {
    const r = n.isWebGL2;
    let s;
    (this.setMode = function (t) {
      s = t;
    }),
      (this.render = function (e, n) {
        t.drawArrays(s, e, n), i.update(n, s, 1);
      }),
      (this.renderInstances = function (n, a, o) {
        if (0 === o) return;
        let l, h;
        if (r) (l = t), (h = "drawArraysInstanced");
        else if (
          ((l = e.get("ANGLE_instanced_arrays")),
          (h = "drawArraysInstancedANGLE"),
          null === l)
        )
          return void console.error(
            "THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
          );
        l[h](s, n, a, o), i.update(a, s, o);
      }),
      (this.renderMultiDraw = function (t, n, r) {
        if (0 === r) return;
        const a = e.get("WEBGL_multi_draw");
        if (null === a) for (let e = 0; e < r; e++) this.render(t[e], n[e]);
        else {
          a.multiDrawArraysWEBGL(s, t, 0, n, 0, r);
          let e = 0;
          for (let t = 0; t < r; t++) e += n[t];
          i.update(e, s, 1);
        }
      });
  }
  function yn(t, e, i) {
    let n;
    function r(e) {
      if ("highp" === e) {
        if (
          t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision >
            0 &&
          t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT)
            .precision > 0
        )
          return "highp";
        e = "mediump";
      }
      return "mediump" === e &&
        t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision >
          0 &&
        t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT)
          .precision > 0
        ? "mediump"
        : "lowp";
    }
    const s =
      "undefined" != typeof WebGL2RenderingContext &&
      "WebGL2RenderingContext" === t.constructor.name;
    let a = void 0 !== i.precision ? i.precision : "highp";
    const o = r(a);
    o !== a &&
      (console.warn(
        "THREE.WebGLRenderer:",
        a,
        "not supported, using",
        o,
        "instead."
      ),
      (a = o));
    const l = s || e.has("WEBGL_draw_buffers"),
      h = !0 === i.logarithmicDepthBuffer,
      c = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
      d = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      u = t.getParameter(t.MAX_TEXTURE_SIZE),
      p = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),
      m = t.getParameter(t.MAX_VERTEX_ATTRIBS),
      f = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),
      g = t.getParameter(t.MAX_VARYING_VECTORS),
      _ = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),
      v = d > 0,
      x = s || e.has("OES_texture_float");
    return {
      isWebGL2: s,
      drawBuffers: l,
      getMaxAnisotropy: function () {
        if (void 0 !== n) return n;
        if (!0 === e.has("EXT_texture_filter_anisotropic")) {
          const i = e.get("EXT_texture_filter_anisotropic");
          n = t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        } else n = 0;
        return n;
      },
      getMaxPrecision: r,
      precision: a,
      logarithmicDepthBuffer: h,
      maxTextures: c,
      maxVertexTextures: d,
      maxTextureSize: u,
      maxCubemapSize: p,
      maxAttributes: m,
      maxVertexUniforms: f,
      maxVaryings: g,
      maxFragmentUniforms: _,
      vertexTextures: v,
      floatFragmentTextures: x,
      floatVertexTextures: v && x,
      maxSamples: s ? t.getParameter(t.MAX_SAMPLES) : 0,
    };
  }
  function Mn(t) {
    const e = this;
    let i = null,
      n = 0,
      r = !1,
      s = !1;
    const a = new an(),
      o = new ft(),
      l = { value: null, needsUpdate: !1 };
    function h(t, i, n, r) {
      const s = null !== t ? t.length : 0;
      let h = null;
      if (0 !== s) {
        if (((h = l.value), !0 !== r || null === h)) {
          const e = n + 4 * s,
            r = i.matrixWorldInverse;
          o.getNormalMatrix(r),
            (null === h || h.length < e) && (h = new Float32Array(e));
          for (let e = 0, i = n; e !== s; ++e, i += 4)
            a.copy(t[e]).applyMatrix4(r, o),
              a.normal.toArray(h, i),
              (h[i + 3] = a.constant);
        }
        (l.value = h), (l.needsUpdate = !0);
      }
      return (e.numPlanes = s), (e.numIntersection = 0), h;
    }
    (this.uniform = l),
      (this.numPlanes = 0),
      (this.numIntersection = 0),
      (this.init = function (t, e) {
        const i = 0 !== t.length || e || 0 !== n || r;
        return (r = e), (n = t.length), i;
      }),
      (this.beginShadows = function () {
        (s = !0), h(null);
      }),
      (this.endShadows = function () {
        s = !1;
      }),
      (this.setGlobalState = function (t, e) {
        i = h(t, e, 0);
      }),
      (this.setState = function (a, o, c) {
        const d = a.clippingPlanes,
          u = a.clipIntersection,
          p = a.clipShadows,
          m = t.get(a);
        if (!r || null === d || 0 === d.length || (s && !p))
          s
            ? h(null)
            : (l.value !== i && ((l.value = i), (l.needsUpdate = n > 0)),
              (e.numPlanes = n),
              (e.numIntersection = 0));
        else {
          const t = s ? 0 : n,
            e = 4 * t;
          let r = m.clippingState || null;
          (l.value = r), (r = h(d, o, e, c));
          for (let t = 0; t !== e; ++t) r[t] = i[t];
          (m.clippingState = r),
            (this.numIntersection = u ? this.numPlanes : 0),
            (this.numPlanes += t);
        }
      });
  }
  function Sn(t) {
    let e = new WeakMap();
    function i(t, e) {
      return e === g ? (t.mapping = m) : 304 === e && (t.mapping = f), t;
    }
    function n(t) {
      const i = t.target;
      i.removeEventListener("dispose", n);
      const r = e.get(i);
      void 0 !== r && (e.delete(i), r.dispose());
    }
    return {
      get: function (r) {
        if (r && r.isTexture) {
          const s = r.mapping;
          if (s === g || 304 === s) {
            if (e.has(r)) return i(e.get(r).texture, r.mapping);
            {
              const s = r.image;
              if (s && s.height > 0) {
                const a = new en(s.height / 2);
                return (
                  a.fromEquirectangularTexture(t, r),
                  e.set(r, a),
                  r.addEventListener("dispose", n),
                  i(a.texture, r.mapping)
                );
              }
              return null;
            }
          }
        }
        return r;
      },
      dispose: function () {
        e = new WeakMap();
      },
    };
  }
  class bn extends Zi {
    constructor(t = -1, e = 1, i = 1, n = -1, r = 0.1, s = 2e3) {
      super(),
        (this.isOrthographicCamera = !0),
        (this.type = "OrthographicCamera"),
        (this.zoom = 1),
        (this.view = null),
        (this.left = t),
        (this.right = e),
        (this.top = i),
        (this.bottom = n),
        (this.near = r),
        (this.far = s),
        this.updateProjectionMatrix();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.left = t.left),
        (this.right = t.right),
        (this.top = t.top),
        (this.bottom = t.bottom),
        (this.near = t.near),
        (this.far = t.far),
        (this.zoom = t.zoom),
        (this.view = null === t.view ? null : Object.assign({}, t.view)),
        this
      );
    }
    setViewOffset(t, e, i, n, r, s) {
      null === this.view &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
        (this.view.enabled = !0),
        (this.view.fullWidth = t),
        (this.view.fullHeight = e),
        (this.view.offsetX = i),
        (this.view.offsetY = n),
        (this.view.width = r),
        (this.view.height = s),
        this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = !1),
        this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const t = (this.right - this.left) / (2 * this.zoom),
        e = (this.top - this.bottom) / (2 * this.zoom),
        i = (this.right + this.left) / 2,
        n = (this.top + this.bottom) / 2;
      let r = i - t,
        s = i + t,
        a = n + e,
        o = n - e;
      if (null !== this.view && this.view.enabled) {
        const t = (this.right - this.left) / this.view.fullWidth / this.zoom,
          e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        (r += t * this.view.offsetX),
          (s = r + t * this.view.width),
          (a -= e * this.view.offsetY),
          (o = a - e * this.view.height);
      }
      this.projectionMatrix.makeOrthographic(
        r,
        s,
        a,
        o,
        this.near,
        this.far,
        this.coordinateSystem
      ),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        (e.object.zoom = this.zoom),
        (e.object.left = this.left),
        (e.object.right = this.right),
        (e.object.top = this.top),
        (e.object.bottom = this.bottom),
        (e.object.near = this.near),
        (e.object.far = this.far),
        null !== this.view && (e.object.view = Object.assign({}, this.view)),
        e
      );
    }
  }
  const En = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
    Tn = new bn(),
    wn = new ai();
  let An = null,
    Rn = 0,
    Cn = 0;
  const Ln = (1 + Math.sqrt(5)) / 2,
    Pn = 1 / Ln,
    Un = [
      new Ht(1, 1, 1),
      new Ht(-1, 1, 1),
      new Ht(1, 1, -1),
      new Ht(-1, 1, -1),
      new Ht(0, Ln, Pn),
      new Ht(0, Ln, -Pn),
      new Ht(Pn, 0, Ln),
      new Ht(-Pn, 0, Ln),
      new Ht(Ln, Pn, 0),
      new Ht(-Ln, Pn, 0),
    ];
  class Dn {
    constructor(t) {
      (this._renderer = t),
        (this._pingPongRenderTarget = null),
        (this._lodMax = 0),
        (this._cubeSize = 0),
        (this._lodPlanes = []),
        (this._sizeLods = []),
        (this._sigmas = []),
        (this._blurMaterial = null),
        (this._cubemapMaterial = null),
        (this._equirectMaterial = null),
        this._compileMaterial(this._blurMaterial);
    }
    fromScene(t, e = 0, i = 0.1, n = 100) {
      (An = this._renderer.getRenderTarget()),
        (Rn = this._renderer.getActiveCubeFace()),
        (Cn = this._renderer.getActiveMipmapLevel()),
        this._setSize(256);
      const r = this._allocateTargets();
      return (
        (r.depthBuffer = !0),
        this._sceneToCubeUV(t, i, n, r),
        e > 0 && this._blur(r, 0, 0, e),
        this._applyPMREM(r),
        this._cleanup(r),
        r
      );
    }
    fromEquirectangular(t, e = null) {
      return this._fromTexture(t, e);
    }
    fromCubemap(t, e = null) {
      return this._fromTexture(t, e);
    }
    compileCubemapShader() {
      null === this._cubemapMaterial &&
        ((this._cubemapMaterial = Fn()),
        this._compileMaterial(this._cubemapMaterial));
    }
    compileEquirectangularShader() {
      null === this._equirectMaterial &&
        ((this._equirectMaterial = On()),
        this._compileMaterial(this._equirectMaterial));
    }
    dispose() {
      this._dispose(),
        null !== this._cubemapMaterial && this._cubemapMaterial.dispose(),
        null !== this._equirectMaterial && this._equirectMaterial.dispose();
    }
    _setSize(t) {
      (this._lodMax = Math.floor(Math.log2(t))),
        (this._cubeSize = Math.pow(2, this._lodMax));
    }
    _dispose() {
      null !== this._blurMaterial && this._blurMaterial.dispose(),
        null !== this._pingPongRenderTarget &&
          this._pingPongRenderTarget.dispose();
      for (let t = 0; t < this._lodPlanes.length; t++)
        this._lodPlanes[t].dispose();
    }
    _cleanup(t) {
      this._renderer.setRenderTarget(An, Rn, Cn),
        (t.scissorTest = !1),
        Nn(t, 0, 0, t.width, t.height);
    }
    _fromTexture(t, e) {
      t.mapping === m || t.mapping === f
        ? this._setSize(
            0 === t.image.length
              ? 16
              : t.image[0].width || t.image[0].image.width
          )
        : this._setSize(t.image.width / 4),
        (An = this._renderer.getRenderTarget()),
        (Rn = this._renderer.getActiveCubeFace()),
        (Cn = this._renderer.getActiveMipmapLevel());
      const i = e || this._allocateTargets();
      return (
        this._textureToCubeUV(t, i), this._applyPMREM(i), this._cleanup(i), i
      );
    }
    _allocateTargets() {
      const t = 3 * Math.max(this._cubeSize, 112),
        e = 4 * this._cubeSize,
        i = {
          magFilter: b,
          minFilter: b,
          generateMipmaps: !1,
          type: C,
          format: P,
          colorSpace: j,
          depthBuffer: !1,
        },
        n = In(t, e, i);
      if (
        null === this._pingPongRenderTarget ||
        this._pingPongRenderTarget.width !== t ||
        this._pingPongRenderTarget.height !== e
      ) {
        null !== this._pingPongRenderTarget && this._dispose(),
          (this._pingPongRenderTarget = In(t, e, i));
        const { _lodMax: n } = this;
        ({
          sizeLods: this._sizeLods,
          lodPlanes: this._lodPlanes,
          sigmas: this._sigmas,
        } = (function (t) {
          const e = [],
            i = [],
            n = [];
          let r = t;
          const s = t - 4 + 1 + En.length;
          for (let a = 0; a < s; a++) {
            const s = Math.pow(2, r);
            i.push(s);
            let o = 1 / s;
            a > t - 4 ? (o = En[a - t + 4 - 1]) : 0 === a && (o = 0), n.push(o);
            const l = 1 / (s - 2),
              h = -l,
              c = 1 + l,
              d = [h, h, c, h, c, c, h, h, c, c, h, c],
              u = 6,
              p = 6,
              m = 3,
              f = 2,
              g = 1,
              _ = new Float32Array(m * p * u),
              v = new Float32Array(f * p * u),
              x = new Float32Array(g * p * u);
            for (let t = 0; t < u; t++) {
              const e = ((t % 3) * 2) / 3 - 1,
                i = t > 2 ? 0 : -1,
                n = [
                  e,
                  i,
                  0,
                  e + 2 / 3,
                  i,
                  0,
                  e + 2 / 3,
                  i + 1,
                  0,
                  e,
                  i,
                  0,
                  e + 2 / 3,
                  i + 1,
                  0,
                  e,
                  i + 1,
                  0,
                ];
              _.set(n, m * p * t), v.set(d, f * p * t);
              const r = [t, t, t, t, t, t];
              x.set(r, g * p * t);
            }
            const y = new Ei();
            y.setAttribute("position", new pi(_, m)),
              y.setAttribute("uv", new pi(v, f)),
              y.setAttribute("faceIndex", new pi(x, g)),
              e.push(y),
              r > 4 && r--;
          }
          return { lodPlanes: e, sizeLods: i, sigmas: n };
        })(n)),
          (this._blurMaterial = (function (t, e, i) {
            const n = new Float32Array(20),
              r = new Ht(0, 1, 0);
            return new Ki({
              name: "SphericalGaussianBlur",
              defines: {
                n: 20,
                CUBEUV_TEXEL_WIDTH: 1 / e,
                CUBEUV_TEXEL_HEIGHT: 1 / i,
                CUBEUV_MAX_MIP: `${t}.0`,
              },
              uniforms: {
                envMap: { value: null },
                samples: { value: 1 },
                weights: { value: n },
                latitudinal: { value: !1 },
                dTheta: { value: 0 },
                mipInt: { value: 0 },
                poleAxis: { value: r },
              },
              vertexShader:
                "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",
              fragmentShader:
                "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t}\n\t\t",
              blending: 0,
              depthTest: !1,
              depthWrite: !1,
            });
          })(n, t, e));
      }
      return n;
    }
    _compileMaterial(t) {
      const e = new Hi(this._lodPlanes[0], t);
      this._renderer.compile(e, Tn);
    }
    _sceneToCubeUV(t, e, i, n) {
      const r = new Ji(90, 1, e, i),
        s = [1, -1, 1, 1, 1, 1],
        a = [1, 1, 1, -1, -1, -1],
        o = this._renderer,
        h = o.autoClear,
        c = o.toneMapping;
      o.getClearColor(wn), (o.toneMapping = l), (o.autoClear = !1);
      const d = new ci({
          name: "PMREM.Background",
          side: 1,
          depthWrite: !1,
          depthTest: !1,
        }),
        u = new Hi(new Wi(), d);
      let p = !1;
      const m = t.background;
      m
        ? m.isColor && (d.color.copy(m), (t.background = null), (p = !0))
        : (d.color.copy(wn), (p = !0));
      for (let e = 0; e < 6; e++) {
        const i = e % 3;
        0 === i
          ? (r.up.set(0, s[e], 0), r.lookAt(a[e], 0, 0))
          : 1 === i
          ? (r.up.set(0, 0, s[e]), r.lookAt(0, a[e], 0))
          : (r.up.set(0, s[e], 0), r.lookAt(0, 0, a[e]));
        const l = this._cubeSize;
        Nn(n, i * l, e > 2 ? l : 0, l, l),
          o.setRenderTarget(n),
          p && o.render(u, r),
          o.render(t, r);
      }
      u.geometry.dispose(),
        u.material.dispose(),
        (o.toneMapping = c),
        (o.autoClear = h),
        (t.background = m);
    }
    _textureToCubeUV(t, e) {
      const i = this._renderer,
        n = t.mapping === m || t.mapping === f;
      n
        ? (null === this._cubemapMaterial && (this._cubemapMaterial = Fn()),
          (this._cubemapMaterial.uniforms.flipEnvMap.value =
            !1 === t.isRenderTargetTexture ? -1 : 1))
        : null === this._equirectMaterial && (this._equirectMaterial = On());
      const r = n ? this._cubemapMaterial : this._equirectMaterial,
        s = new Hi(this._lodPlanes[0], r);
      r.uniforms.envMap.value = t;
      const a = this._cubeSize;
      Nn(e, 0, 0, 3 * a, 2 * a), i.setRenderTarget(e), i.render(s, Tn);
    }
    _applyPMREM(t) {
      const e = this._renderer,
        i = e.autoClear;
      e.autoClear = !1;
      for (let e = 1; e < this._lodPlanes.length; e++) {
        const i = Math.sqrt(
            this._sigmas[e] * this._sigmas[e] -
              this._sigmas[e - 1] * this._sigmas[e - 1]
          ),
          n = Un[(e - 1) % Un.length];
        this._blur(t, e - 1, e, i, n);
      }
      e.autoClear = i;
    }
    _blur(t, e, i, n, r) {
      const s = this._pingPongRenderTarget;
      this._halfBlur(t, s, e, i, n, "latitudinal", r),
        this._halfBlur(s, t, i, i, n, "longitudinal", r);
    }
    _halfBlur(t, e, i, n, r, s, a) {
      const o = this._renderer,
        l = this._blurMaterial;
      "latitudinal" !== s &&
        "longitudinal" !== s &&
        console.error(
          "blur direction must be either latitudinal or longitudinal!"
        );
      const h = new Hi(this._lodPlanes[n], l),
        c = l.uniforms,
        d = this._sizeLods[i] - 1,
        u = isFinite(r) ? Math.PI / (2 * d) : (2 * Math.PI) / 39,
        p = r / u,
        m = isFinite(r) ? 1 + Math.floor(3 * p) : 20;
      m > 20 &&
        console.warn(
          `sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`
        );
      const f = [];
      let g = 0;
      for (let t = 0; t < 20; ++t) {
        const e = t / p,
          i = Math.exp((-e * e) / 2);
        f.push(i), 0 === t ? (g += i) : t < m && (g += 2 * i);
      }
      for (let t = 0; t < f.length; t++) f[t] = f[t] / g;
      (c.envMap.value = t.texture),
        (c.samples.value = m),
        (c.weights.value = f),
        (c.latitudinal.value = "latitudinal" === s),
        a && (c.poleAxis.value = a);
      const { _lodMax: _ } = this;
      (c.dTheta.value = u), (c.mipInt.value = _ - i);
      const v = this._sizeLods[n];
      Nn(
        e,
        3 * v * (n > _ - 4 ? n - _ + 4 : 0),
        4 * (this._cubeSize - v),
        3 * v,
        2 * v
      ),
        o.setRenderTarget(e),
        o.render(h, Tn);
    }
  }
  function In(t, e, i) {
    const n = new zt(t, e, i);
    return (
      (n.texture.mapping = _),
      (n.texture.name = "PMREM.cubeUv"),
      (n.scissorTest = !0),
      n
    );
  }
  function Nn(t, e, i, n, r) {
    t.viewport.set(e, i, n, r), t.scissor.set(e, i, n, r);
  }
  function On() {
    return new Ki({
      name: "EquirectangularToCubeUV",
      uniforms: { envMap: { value: null } },
      vertexShader:
        "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",
      fragmentShader:
        "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tgl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n\t\t\t}\n\t\t",
      blending: 0,
      depthTest: !1,
      depthWrite: !1,
    });
  }
  function Fn() {
    return new Ki({
      name: "CubemapToCubeUV",
      uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
      vertexShader:
        "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",
      fragmentShader:
        "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tuniform float flipEnvMap;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n\t\t\t}\n\t\t",
      blending: 0,
      depthTest: !1,
      depthWrite: !1,
    });
  }
  function zn(t) {
    let e = new WeakMap(),
      i = null;
    function n(t) {
      const i = t.target;
      i.removeEventListener("dispose", n);
      const r = e.get(i);
      void 0 !== r && (e.delete(i), r.dispose());
    }
    return {
      get: function (r) {
        if (r && r.isTexture) {
          const s = r.mapping,
            a = s === g || 304 === s,
            o = s === m || s === f;
          if (a || o) {
            if (r.isRenderTargetTexture && !0 === r.needsPMREMUpdate) {
              r.needsPMREMUpdate = !1;
              let n = e.get(r);
              return (
                null === i && (i = new Dn(t)),
                (n = a ? i.fromEquirectangular(r, n) : i.fromCubemap(r, n)),
                e.set(r, n),
                n.texture
              );
            }
            if (e.has(r)) return e.get(r).texture;
            {
              const s = r.image;
              if (
                (a && s && s.height > 0) ||
                (o &&
                  s &&
                  (function (t) {
                    let e = 0;
                    for (let i = 0; i < 6; i++) void 0 !== t[i] && e++;
                    return 6 === e;
                  })(s))
              ) {
                null === i && (i = new Dn(t));
                const s = a ? i.fromEquirectangular(r) : i.fromCubemap(r);
                return e.set(r, s), r.addEventListener("dispose", n), s.texture;
              }
              return null;
            }
          }
        }
        return r;
      },
      dispose: function () {
        (e = new WeakMap()), null !== i && (i.dispose(), (i = null));
      },
    };
  }
  function Bn(t) {
    const e = {};
    function i(i) {
      if (void 0 !== e[i]) return e[i];
      let n;
      switch (i) {
        case "WEBGL_depth_texture":
          n =
            t.getExtension("WEBGL_depth_texture") ||
            t.getExtension("MOZ_WEBGL_depth_texture") ||
            t.getExtension("WEBKIT_WEBGL_depth_texture");
          break;
        case "EXT_texture_filter_anisotropic":
          n =
            t.getExtension("EXT_texture_filter_anisotropic") ||
            t.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
            t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          break;
        case "WEBGL_compressed_texture_s3tc":
          n =
            t.getExtension("WEBGL_compressed_texture_s3tc") ||
            t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
            t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
          break;
        case "WEBGL_compressed_texture_pvrtc":
          n =
            t.getExtension("WEBGL_compressed_texture_pvrtc") ||
            t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
          break;
        default:
          n = t.getExtension(i);
      }
      return (e[i] = n), n;
    }
    return {
      has: function (t) {
        return null !== i(t);
      },
      init: function (t) {
        t.isWebGL2
          ? i("EXT_color_buffer_float")
          : (i("WEBGL_depth_texture"),
            i("OES_texture_float"),
            i("OES_texture_half_float"),
            i("OES_texture_half_float_linear"),
            i("OES_standard_derivatives"),
            i("OES_element_index_uint"),
            i("OES_vertex_array_object"),
            i("ANGLE_instanced_arrays")),
          i("OES_texture_float_linear"),
          i("EXT_color_buffer_half_float"),
          i("WEBGL_multisampled_render_to_texture");
      },
      get: function (t) {
        const e = i(t);
        return (
          null === e &&
            console.warn(
              "THREE.WebGLRenderer: " + t + " extension not supported."
            ),
          e
        );
      },
    };
  }
  function kn(t, e, i, n) {
    const r = {},
      s = new WeakMap();
    function a(t) {
      const o = t.target;
      null !== o.index && e.remove(o.index);
      for (const t in o.attributes) e.remove(o.attributes[t]);
      for (const t in o.morphAttributes) {
        const i = o.morphAttributes[t];
        for (let t = 0, n = i.length; t < n; t++) e.remove(i[t]);
      }
      o.removeEventListener("dispose", a), delete r[o.id];
      const l = s.get(o);
      l && (e.remove(l), s.delete(o)),
        n.releaseStatesOfGeometry(o),
        !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount,
        i.memory.geometries--;
    }
    function o(t) {
      const i = [],
        n = t.index,
        r = t.attributes.position;
      let a = 0;
      if (null !== n) {
        const t = n.array;
        a = n.version;
        for (let e = 0, n = t.length; e < n; e += 3) {
          const n = t[e + 0],
            r = t[e + 1],
            s = t[e + 2];
          i.push(n, r, r, s, s, n);
        }
      } else {
        if (void 0 === r) return;
        {
          const t = r.array;
          a = r.version;
          for (let e = 0, n = t.length / 3 - 1; e < n; e += 3) {
            const t = e + 0,
              n = e + 1,
              r = e + 2;
            i.push(t, n, n, r, r, t);
          }
        }
      }
      const o = new (_t(i) ? fi : mi)(i, 1);
      o.version = a;
      const l = s.get(t);
      l && e.remove(l), s.set(t, o);
    }
    return {
      get: function (t, e) {
        return (
          !0 === r[e.id] ||
            (e.addEventListener("dispose", a),
            (r[e.id] = !0),
            i.memory.geometries++),
          e
        );
      },
      update: function (i) {
        const n = i.attributes;
        for (const i in n) e.update(n[i], t.ARRAY_BUFFER);
        const r = i.morphAttributes;
        for (const i in r) {
          const n = r[i];
          for (let i = 0, r = n.length; i < r; i++)
            e.update(n[i], t.ARRAY_BUFFER);
        }
      },
      getWireframeAttribute: function (t) {
        const e = s.get(t);
        if (e) {
          const i = t.index;
          null !== i && e.version < i.version && o(t);
        } else o(t);
        return s.get(t);
      },
    };
  }
  function Vn(t, e, i, n) {
    const r = n.isWebGL2;
    let s, a, o;
    (this.setMode = function (t) {
      s = t;
    }),
      (this.setIndex = function (t) {
        (a = t.type), (o = t.bytesPerElement);
      }),
      (this.render = function (e, n) {
        t.drawElements(s, n, a, e * o), i.update(n, s, 1);
      }),
      (this.renderInstances = function (n, l, h) {
        if (0 === h) return;
        let c, d;
        if (r) (c = t), (d = "drawElementsInstanced");
        else if (
          ((c = e.get("ANGLE_instanced_arrays")),
          (d = "drawElementsInstancedANGLE"),
          null === c)
        )
          return void console.error(
            "THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
          );
        c[d](s, l, a, n * o, h), i.update(l, s, h);
      }),
      (this.renderMultiDraw = function (t, n, r) {
        if (0 === r) return;
        const l = e.get("WEBGL_multi_draw");
        if (null === l) for (let e = 0; e < r; e++) this.render(t[e] / o, n[e]);
        else {
          l.multiDrawElementsWEBGL(s, n, 0, a, t, 0, r);
          let e = 0;
          for (let t = 0; t < r; t++) e += n[t];
          i.update(e, s, 1);
        }
      });
  }
  function Hn(t) {
    const e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    return {
      memory: { geometries: 0, textures: 0 },
      render: e,
      programs: null,
      autoReset: !0,
      reset: function () {
        (e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0);
      },
      update: function (i, n, r) {
        switch ((e.calls++, n)) {
          case t.TRIANGLES:
            e.triangles += r * (i / 3);
            break;
          case t.LINES:
            e.lines += r * (i / 2);
            break;
          case t.LINE_STRIP:
            e.lines += r * (i - 1);
            break;
          case t.LINE_LOOP:
            e.lines += r * i;
            break;
          case t.POINTS:
            e.points += r * i;
            break;
          default:
            console.error("THREE.WebGLInfo: Unknown draw mode:", n);
        }
      },
    };
  }
  function Gn(t, e) {
    return t[0] - e[0];
  }
  function Wn(t, e) {
    return Math.abs(e[1]) - Math.abs(t[1]);
  }
  function jn(t, e, i) {
    const n = {},
      r = new Float32Array(8),
      s = new WeakMap(),
      a = new Ot(),
      o = [];
    for (let t = 0; t < 8; t++) o[t] = [t, 0];
    return {
      update: function (l, h, c) {
        const d = l.morphTargetInfluences;
        if (!0 === e.isWebGL2) {
          const u =
              h.morphAttributes.position ||
              h.morphAttributes.normal ||
              h.morphAttributes.color,
            p = void 0 !== u ? u.length : 0;
          let m = s.get(h);
          if (void 0 === m || m.count !== p) {
            void 0 !== m && m.texture.dispose();
            const _ = void 0 !== h.morphAttributes.position,
              v = void 0 !== h.morphAttributes.normal,
              x = void 0 !== h.morphAttributes.color,
              y = h.morphAttributes.position || [],
              M = h.morphAttributes.normal || [],
              S = h.morphAttributes.color || [];
            let b = 0;
            !0 === _ && (b = 1), !0 === v && (b = 2), !0 === x && (b = 3);
            let E = h.attributes.position.count * b,
              T = 1;
            E > e.maxTextureSize &&
              ((T = Math.ceil(E / e.maxTextureSize)), (E = e.maxTextureSize));
            const w = new Float32Array(E * T * 4 * p),
              A = new Bt(w, E, T, p);
            (A.type = R), (A.needsUpdate = !0);
            const C = 4 * b;
            for (let P = 0; P < p; P++) {
              const U = y[P],
                D = M[P],
                I = S[P],
                N = E * T * 4 * P;
              for (let O = 0; O < U.count; O++) {
                const F = O * C;
                !0 === _ &&
                  (a.fromBufferAttribute(U, O),
                  (w[N + F + 0] = a.x),
                  (w[N + F + 1] = a.y),
                  (w[N + F + 2] = a.z),
                  (w[N + F + 3] = 0)),
                  !0 === v &&
                    (a.fromBufferAttribute(D, O),
                    (w[N + F + 4] = a.x),
                    (w[N + F + 5] = a.y),
                    (w[N + F + 6] = a.z),
                    (w[N + F + 7] = 0)),
                  !0 === x &&
                    (a.fromBufferAttribute(I, O),
                    (w[N + F + 8] = a.x),
                    (w[N + F + 9] = a.y),
                    (w[N + F + 10] = a.z),
                    (w[N + F + 11] = 4 === I.itemSize ? a.w : 1));
              }
            }
            function L() {
              A.dispose(), s.delete(h), h.removeEventListener("dispose", L);
            }
            (m = { count: p, texture: A, size: new mt(E, T) }),
              s.set(h, m),
              h.addEventListener("dispose", L);
          }
          let f = 0;
          for (let z = 0; z < d.length; z++) f += d[z];
          const g = h.morphTargetsRelative ? 1 : 1 - f;
          c.getUniforms().setValue(t, "morphTargetBaseInfluence", g),
            c.getUniforms().setValue(t, "morphTargetInfluences", d),
            c.getUniforms().setValue(t, "morphTargetsTexture", m.texture, i),
            c.getUniforms().setValue(t, "morphTargetsTextureSize", m.size);
        } else {
          const B = void 0 === d ? 0 : d.length;
          let k = n[h.id];
          if (void 0 === k || k.length !== B) {
            k = [];
            for (let j = 0; j < B; j++) k[j] = [j, 0];
            n[h.id] = k;
          }
          for (let X = 0; X < B; X++) {
            const q = k[X];
            (q[0] = X), (q[1] = d[X]);
          }
          k.sort(Wn);
          for (let Y = 0; Y < 8; Y++)
            Y < B && k[Y][1]
              ? ((o[Y][0] = k[Y][0]), (o[Y][1] = k[Y][1]))
              : ((o[Y][0] = Number.MAX_SAFE_INTEGER), (o[Y][1] = 0));
          o.sort(Gn);
          const V = h.morphAttributes.position,
            H = h.morphAttributes.normal;
          let G = 0;
          for (let K = 0; K < 8; K++) {
            const Z = o[K],
              J = Z[0],
              Q = Z[1];
            J !== Number.MAX_SAFE_INTEGER && Q
              ? (V &&
                  h.getAttribute("morphTarget" + K) !== V[J] &&
                  h.setAttribute("morphTarget" + K, V[J]),
                H &&
                  h.getAttribute("morphNormal" + K) !== H[J] &&
                  h.setAttribute("morphNormal" + K, H[J]),
                (r[K] = Q),
                (G += Q))
              : (V &&
                  !0 === h.hasAttribute("morphTarget" + K) &&
                  h.deleteAttribute("morphTarget" + K),
                H &&
                  !0 === h.hasAttribute("morphNormal" + K) &&
                  h.deleteAttribute("morphNormal" + K),
                (r[K] = 0));
          }
          const W = h.morphTargetsRelative ? 1 : 1 - G;
          c.getUniforms().setValue(t, "morphTargetBaseInfluence", W),
            c.getUniforms().setValue(t, "morphTargetInfluences", r);
        }
      },
    };
  }
  function Xn(t, e, i, n) {
    let r = new WeakMap();
    function s(t) {
      const e = t.target;
      e.removeEventListener("dispose", s),
        i.remove(e.instanceMatrix),
        null !== e.instanceColor && i.remove(e.instanceColor);
    }
    return {
      update: function (a) {
        const o = n.render.frame,
          l = a.geometry,
          h = e.get(a, l);
        if (
          (r.get(h) !== o && (e.update(h), r.set(h, o)),
          a.isInstancedMesh &&
            (!1 === a.hasEventListener("dispose", s) &&
              a.addEventListener("dispose", s),
            r.get(a) !== o &&
              (i.update(a.instanceMatrix, t.ARRAY_BUFFER),
              null !== a.instanceColor &&
                i.update(a.instanceColor, t.ARRAY_BUFFER),
              r.set(a, o))),
          a.isSkinnedMesh)
        ) {
          const t = a.skeleton;
          r.get(t) !== o && (t.update(), r.set(t, o));
        }
        return h;
      },
      dispose: function () {
        r = new WeakMap();
      },
    };
  }
  class qn extends Nt {
    constructor(t, e, i, n, r, s, a, o, l, h) {
      if ((h = void 0 !== h ? h : U) !== U && h !== D)
        throw new Error(
          "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat"
        );
      void 0 === i && h === U && (i = A),
        void 0 === i && h === D && (i = L),
        super(null, n, r, s, a, o, h, i, l),
        (this.isDepthTexture = !0),
        (this.image = { width: t, height: e }),
        (this.magFilter = void 0 !== a ? a : M),
        (this.minFilter = void 0 !== o ? o : M),
        (this.flipY = !1),
        (this.generateMipmaps = !1),
        (this.compareFunction = null);
    }
    copy(t) {
      return super.copy(t), (this.compareFunction = t.compareFunction), this;
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        null !== this.compareFunction &&
          (e.compareFunction = this.compareFunction),
        e
      );
    }
  }
  const Yn = new Nt(),
    Kn = new qn(1, 1);
  Kn.compareFunction = 515;
  const Zn = new Bt(),
    Jn = new kt(),
    Qn = new tn(),
    $n = [],
    tr = [],
    er = new Float32Array(16),
    ir = new Float32Array(9),
    nr = new Float32Array(4);
  function rr(t, e, i) {
    const n = t[0];
    if (n <= 0 || n > 0) return t;
    const r = e * i;
    let s = $n[r];
    if ((void 0 === s && ((s = new Float32Array(r)), ($n[r] = s)), 0 !== e)) {
      n.toArray(s, 0);
      for (let n = 1, r = 0; n !== e; ++n) (r += i), t[n].toArray(s, r);
    }
    return s;
  }
  function sr(t, e) {
    if (t.length !== e.length) return !1;
    for (let i = 0, n = t.length; i < n; i++) if (t[i] !== e[i]) return !1;
    return !0;
  }
  function ar(t, e) {
    for (let i = 0, n = e.length; i < n; i++) t[i] = e[i];
  }
  function or(t, e) {
    let i = tr[e];
    void 0 === i && ((i = new Int32Array(e)), (tr[e] = i));
    for (let n = 0; n !== e; ++n) i[n] = t.allocateTextureUnit();
    return i;
  }
  function lr(t, e) {
    const i = this.cache;
    i[0] !== e && (t.uniform1f(this.addr, e), (i[0] = e));
  }
  function hr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y) ||
        (t.uniform2f(this.addr, e.x, e.y), (i[0] = e.x), (i[1] = e.y));
    else {
      if (sr(i, e)) return;
      t.uniform2fv(this.addr, e), ar(i, e);
    }
  }
  function cr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y && i[2] === e.z) ||
        (t.uniform3f(this.addr, e.x, e.y, e.z),
        (i[0] = e.x),
        (i[1] = e.y),
        (i[2] = e.z));
    else if (void 0 !== e.r)
      (i[0] === e.r && i[1] === e.g && i[2] === e.b) ||
        (t.uniform3f(this.addr, e.r, e.g, e.b),
        (i[0] = e.r),
        (i[1] = e.g),
        (i[2] = e.b));
    else {
      if (sr(i, e)) return;
      t.uniform3fv(this.addr, e), ar(i, e);
    }
  }
  function dr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y && i[2] === e.z && i[3] === e.w) ||
        (t.uniform4f(this.addr, e.x, e.y, e.z, e.w),
        (i[0] = e.x),
        (i[1] = e.y),
        (i[2] = e.z),
        (i[3] = e.w));
    else {
      if (sr(i, e)) return;
      t.uniform4fv(this.addr, e), ar(i, e);
    }
  }
  function ur(t, e) {
    const i = this.cache,
      n = e.elements;
    if (void 0 === n) {
      if (sr(i, e)) return;
      t.uniformMatrix2fv(this.addr, !1, e), ar(i, e);
    } else {
      if (sr(i, n)) return;
      nr.set(n), t.uniformMatrix2fv(this.addr, !1, nr), ar(i, n);
    }
  }
  function pr(t, e) {
    const i = this.cache,
      n = e.elements;
    if (void 0 === n) {
      if (sr(i, e)) return;
      t.uniformMatrix3fv(this.addr, !1, e), ar(i, e);
    } else {
      if (sr(i, n)) return;
      ir.set(n), t.uniformMatrix3fv(this.addr, !1, ir), ar(i, n);
    }
  }
  function mr(t, e) {
    const i = this.cache,
      n = e.elements;
    if (void 0 === n) {
      if (sr(i, e)) return;
      t.uniformMatrix4fv(this.addr, !1, e), ar(i, e);
    } else {
      if (sr(i, n)) return;
      er.set(n), t.uniformMatrix4fv(this.addr, !1, er), ar(i, n);
    }
  }
  function fr(t, e) {
    const i = this.cache;
    i[0] !== e && (t.uniform1i(this.addr, e), (i[0] = e));
  }
  function gr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y) ||
        (t.uniform2i(this.addr, e.x, e.y), (i[0] = e.x), (i[1] = e.y));
    else {
      if (sr(i, e)) return;
      t.uniform2iv(this.addr, e), ar(i, e);
    }
  }
  function _r(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y && i[2] === e.z) ||
        (t.uniform3i(this.addr, e.x, e.y, e.z),
        (i[0] = e.x),
        (i[1] = e.y),
        (i[2] = e.z));
    else {
      if (sr(i, e)) return;
      t.uniform3iv(this.addr, e), ar(i, e);
    }
  }
  function vr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y && i[2] === e.z && i[3] === e.w) ||
        (t.uniform4i(this.addr, e.x, e.y, e.z, e.w),
        (i[0] = e.x),
        (i[1] = e.y),
        (i[2] = e.z),
        (i[3] = e.w));
    else {
      if (sr(i, e)) return;
      t.uniform4iv(this.addr, e), ar(i, e);
    }
  }
  function xr(t, e) {
    const i = this.cache;
    i[0] !== e && (t.uniform1ui(this.addr, e), (i[0] = e));
  }
  function yr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y) ||
        (t.uniform2ui(this.addr, e.x, e.y), (i[0] = e.x), (i[1] = e.y));
    else {
      if (sr(i, e)) return;
      t.uniform2uiv(this.addr, e), ar(i, e);
    }
  }
  function Mr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y && i[2] === e.z) ||
        (t.uniform3ui(this.addr, e.x, e.y, e.z),
        (i[0] = e.x),
        (i[1] = e.y),
        (i[2] = e.z));
    else {
      if (sr(i, e)) return;
      t.uniform3uiv(this.addr, e), ar(i, e);
    }
  }
  function Sr(t, e) {
    const i = this.cache;
    if (void 0 !== e.x)
      (i[0] === e.x && i[1] === e.y && i[2] === e.z && i[3] === e.w) ||
        (t.uniform4ui(this.addr, e.x, e.y, e.z, e.w),
        (i[0] = e.x),
        (i[1] = e.y),
        (i[2] = e.z),
        (i[3] = e.w));
    else {
      if (sr(i, e)) return;
      t.uniform4uiv(this.addr, e), ar(i, e);
    }
  }
  function br(t, e, i) {
    const n = this.cache,
      r = i.allocateTextureUnit();
    n[0] !== r && (t.uniform1i(this.addr, r), (n[0] = r));
    const s = this.type === t.SAMPLER_2D_SHADOW ? Kn : Yn;
    i.setTexture2D(e || s, r);
  }
  function Er(t, e, i) {
    const n = this.cache,
      r = i.allocateTextureUnit();
    n[0] !== r && (t.uniform1i(this.addr, r), (n[0] = r)),
      i.setTexture3D(e || Jn, r);
  }
  function Tr(t, e, i) {
    const n = this.cache,
      r = i.allocateTextureUnit();
    n[0] !== r && (t.uniform1i(this.addr, r), (n[0] = r)),
      i.setTextureCube(e || Qn, r);
  }
  function wr(t, e, i) {
    const n = this.cache,
      r = i.allocateTextureUnit();
    n[0] !== r && (t.uniform1i(this.addr, r), (n[0] = r)),
      i.setTexture2DArray(e || Zn, r);
  }
  function Ar(t, e) {
    t.uniform1fv(this.addr, e);
  }
  function Rr(t, e) {
    const i = rr(e, this.size, 2);
    t.uniform2fv(this.addr, i);
  }
  function Cr(t, e) {
    const i = rr(e, this.size, 3);
    t.uniform3fv(this.addr, i);
  }
  function Lr(t, e) {
    const i = rr(e, this.size, 4);
    t.uniform4fv(this.addr, i);
  }
  function Pr(t, e) {
    const i = rr(e, this.size, 4);
    t.uniformMatrix2fv(this.addr, !1, i);
  }
  function Ur(t, e) {
    const i = rr(e, this.size, 9);
    t.uniformMatrix3fv(this.addr, !1, i);
  }
  function Dr(t, e) {
    const i = rr(e, this.size, 16);
    t.uniformMatrix4fv(this.addr, !1, i);
  }
  function Ir(t, e) {
    t.uniform1iv(this.addr, e);
  }
  function Nr(t, e) {
    t.uniform2iv(this.addr, e);
  }
  function Or(t, e) {
    t.uniform3iv(this.addr, e);
  }
  function Fr(t, e) {
    t.uniform4iv(this.addr, e);
  }
  function zr(t, e) {
    t.uniform1uiv(this.addr, e);
  }
  function Br(t, e) {
    t.uniform2uiv(this.addr, e);
  }
  function kr(t, e) {
    t.uniform3uiv(this.addr, e);
  }
  function Vr(t, e) {
    t.uniform4uiv(this.addr, e);
  }
  function Hr(t, e, i) {
    const n = this.cache,
      r = e.length,
      s = or(i, r);
    sr(n, s) || (t.uniform1iv(this.addr, s), ar(n, s));
    for (let t = 0; t !== r; ++t) i.setTexture2D(e[t] || Yn, s[t]);
  }
  function Gr(t, e, i) {
    const n = this.cache,
      r = e.length,
      s = or(i, r);
    sr(n, s) || (t.uniform1iv(this.addr, s), ar(n, s));
    for (let t = 0; t !== r; ++t) i.setTexture3D(e[t] || Jn, s[t]);
  }
  function Wr(t, e, i) {
    const n = this.cache,
      r = e.length,
      s = or(i, r);
    sr(n, s) || (t.uniform1iv(this.addr, s), ar(n, s));
    for (let t = 0; t !== r; ++t) i.setTextureCube(e[t] || Qn, s[t]);
  }
  function jr(t, e, i) {
    const n = this.cache,
      r = e.length,
      s = or(i, r);
    sr(n, s) || (t.uniform1iv(this.addr, s), ar(n, s));
    for (let t = 0; t !== r; ++t) i.setTexture2DArray(e[t] || Zn, s[t]);
  }
  class Xr {
    constructor(t, e, i) {
      (this.id = t),
        (this.addr = i),
        (this.cache = []),
        (this.type = e.type),
        (this.setValue = (function (t) {
          switch (t) {
            case 5126:
              return lr;
            case 35664:
              return hr;
            case 35665:
              return cr;
            case 35666:
              return dr;
            case 35674:
              return ur;
            case 35675:
              return pr;
            case 35676:
              return mr;
            case 5124:
            case 35670:
              return fr;
            case 35667:
            case 35671:
              return gr;
            case 35668:
            case 35672:
              return _r;
            case 35669:
            case 35673:
              return vr;
            case 5125:
              return xr;
            case 36294:
              return yr;
            case 36295:
              return Mr;
            case 36296:
              return Sr;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
              return br;
            case 35679:
            case 36299:
            case 36307:
              return Er;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
              return Tr;
            case 36289:
            case 36303:
            case 36311:
            case 36292:
              return wr;
          }
        })(e.type));
    }
  }
  class qr {
    constructor(t, e, i) {
      (this.id = t),
        (this.addr = i),
        (this.cache = []),
        (this.type = e.type),
        (this.size = e.size),
        (this.setValue = (function (t) {
          switch (t) {
            case 5126:
              return Ar;
            case 35664:
              return Rr;
            case 35665:
              return Cr;
            case 35666:
              return Lr;
            case 35674:
              return Pr;
            case 35675:
              return Ur;
            case 35676:
              return Dr;
            case 5124:
            case 35670:
              return Ir;
            case 35667:
            case 35671:
              return Nr;
            case 35668:
            case 35672:
              return Or;
            case 35669:
            case 35673:
              return Fr;
            case 5125:
              return zr;
            case 36294:
              return Br;
            case 36295:
              return kr;
            case 36296:
              return Vr;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
              return Hr;
            case 35679:
            case 36299:
            case 36307:
              return Gr;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
              return Wr;
            case 36289:
            case 36303:
            case 36311:
            case 36292:
              return jr;
          }
        })(e.type));
    }
  }
  class Yr {
    constructor(t) {
      (this.id = t), (this.seq = []), (this.map = {});
    }
    setValue(t, e, i) {
      const n = this.seq;
      for (let r = 0, s = n.length; r !== s; ++r) {
        const s = n[r];
        s.setValue(t, e[s.id], i);
      }
    }
  }
  const Kr = /(\w+)(\])?(\[|\.)?/g;
  function Zr(t, e) {
    t.seq.push(e), (t.map[e.id] = e);
  }
  function Jr(t, e, i) {
    const n = t.name,
      r = n.length;
    for (Kr.lastIndex = 0; ; ) {
      const s = Kr.exec(n),
        a = Kr.lastIndex;
      let o = s[1];
      const l = "]" === s[2],
        h = s[3];
      if ((l && (o |= 0), void 0 === h || ("[" === h && a + 2 === r))) {
        Zr(i, void 0 === h ? new Xr(o, t, e) : new qr(o, t, e));
        break;
      }
      {
        let t = i.map[o];
        void 0 === t && ((t = new Yr(o)), Zr(i, t)), (i = t);
      }
    }
  }
  class Qr {
    constructor(t, e) {
      (this.seq = []), (this.map = {});
      const i = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
      for (let n = 0; n < i; ++n) {
        const i = t.getActiveUniform(e, n);
        Jr(i, t.getUniformLocation(e, i.name), this);
      }
    }
    setValue(t, e, i, n) {
      const r = this.map[e];
      void 0 !== r && r.setValue(t, i, n);
    }
    setOptional(t, e, i) {
      const n = e[i];
      void 0 !== n && this.setValue(t, i, n);
    }
    static upload(t, e, i, n) {
      for (let r = 0, s = e.length; r !== s; ++r) {
        const s = e[r],
          a = i[s.id];
        !1 !== a.needsUpdate && s.setValue(t, a.value, n);
      }
    }
    static seqWithValue(t, e) {
      const i = [];
      for (let n = 0, r = t.length; n !== r; ++n) {
        const r = t[n];
        r.id in e && i.push(r);
      }
      return i;
    }
  }
  function $r(t, e, i) {
    const n = t.createShader(e);
    return t.shaderSource(n, i), t.compileShader(n), n;
  }
  const ts = 37297;
  let es = 0;
  function is(t, e, i) {
    const n = t.getShaderParameter(e, t.COMPILE_STATUS),
      r = t.getShaderInfoLog(e).trim();
    if (n && "" === r) return "";
    const s = /ERROR: 0:(\d+)/.exec(r);
    if (s) {
      const n = parseInt(s[1]);
      return (
        i.toUpperCase() +
        "\n\n" +
        r +
        "\n\n" +
        (function (t, e) {
          const i = t.split("\n"),
            n = [],
            r = Math.max(e - 6, 0),
            s = Math.min(e + 6, i.length);
          for (let t = r; t < s; t++) {
            const r = t + 1;
            n.push(`${r === e ? ">" : " "} ${r}: ${i[t]}`);
          }
          return n.join("\n");
        })(t.getShaderSource(e), n)
      );
    }
    return r;
  }
  function ns(t, e) {
    const i = (function (t) {
      const e = wt.getPrimaries(wt.workingColorSpace),
        i = wt.getPrimaries(t);
      let n;
      switch (
        (e === i
          ? (n = "")
          : e === J && i === Z
          ? (n = "LinearDisplayP3ToLinearSRGB")
          : e === Z && i === J && (n = "LinearSRGBToLinearDisplayP3"),
        t)
      ) {
        case j:
        case q:
          return [n, "LinearTransferOETF"];
        case W:
        case X:
          return [n, "sRGBTransferOETF"];
        default:
          return (
            console.warn("THREE.WebGLProgram: Unsupported color space:", t),
            [n, "LinearTransferOETF"]
          );
      }
    })(e);
    return `vec4 ${t}( vec4 value ) { return ${i[0]}( ${i[1]}( value ) ); }`;
  }
  function rs(t, e) {
    let i;
    switch (e) {
      case h:
        i = "Linear";
        break;
      case c:
        i = "Reinhard";
        break;
      case d:
        i = "OptimizedCineon";
        break;
      case u:
        i = "ACESFilmic";
        break;
      case p:
        i = "Custom";
        break;
      default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e),
          (i = "Linear");
    }
    return (
      "vec3 " + t + "( vec3 color ) { return " + i + "ToneMapping( color ); }"
    );
  }
  function ss(t) {
    return "" !== t;
  }
  function as(t, e) {
    const i =
      e.numSpotLightShadows +
      e.numSpotLightMaps -
      e.numSpotLightShadowsWithMaps;
    return t
      .replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
      .replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
      .replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps)
      .replace(/NUM_SPOT_LIGHT_COORDS/g, i)
      .replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
      .replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
      .replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
      .replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
      .replace(
        /NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,
        e.numSpotLightShadowsWithMaps
      )
      .replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
      .replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
  }
  function os(t, e) {
    return t
      .replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
      .replace(
        /UNION_CLIPPING_PLANES/g,
        e.numClippingPlanes - e.numClipIntersection
      );
  }
  const ls = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function hs(t) {
    return t.replace(ls, ds);
  }
  const cs = new Map([
    ["encodings_fragment", "colorspace_fragment"],
    ["encodings_pars_fragment", "colorspace_pars_fragment"],
    ["output_fragment", "opaque_fragment"],
  ]);
  function ds(t, e) {
    let i = pn[e];
    if (void 0 === i) {
      const t = cs.get(e);
      if (void 0 === t) throw new Error("Can not resolve #include <" + e + ">");
      (i = pn[t]),
        console.warn(
          'THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',
          e,
          t
        );
    }
    return hs(i);
  }
  const us =
    /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function ps(t) {
    return t.replace(us, ms);
  }
  function ms(t, e, i, n) {
    let r = "";
    for (let t = parseInt(e); t < parseInt(i); t++)
      r += n
        .replace(/\[\s*i\s*\]/g, "[ " + t + " ]")
        .replace(/UNROLLED_LOOP_INDEX/g, t);
    return r;
  }
  function fs(t) {
    let e =
      "precision " +
      t.precision +
      " float;\nprecision " +
      t.precision +
      " int;";
    return (
      "highp" === t.precision
        ? (e += "\n#define HIGH_PRECISION")
        : "mediump" === t.precision
        ? (e += "\n#define MEDIUM_PRECISION")
        : "lowp" === t.precision && (e += "\n#define LOW_PRECISION"),
      e
    );
  }
  function gs(t, r, h, c) {
    const d = t.getContext(),
      u = h.defines;
    let p = h.vertexShader,
      g = h.fragmentShader;
    const v = (function (t) {
        let r = "SHADOWMAP_TYPE_BASIC";
        return (
          t.shadowMapType === e
            ? (r = "SHADOWMAP_TYPE_PCF")
            : t.shadowMapType === i
            ? (r = "SHADOWMAP_TYPE_PCF_SOFT")
            : t.shadowMapType === n && (r = "SHADOWMAP_TYPE_VSM"),
          r
        );
      })(h),
      x = (function (t) {
        let e = "ENVMAP_TYPE_CUBE";
        if (t.envMap)
          switch (t.envMapMode) {
            case m:
            case f:
              e = "ENVMAP_TYPE_CUBE";
              break;
            case _:
              e = "ENVMAP_TYPE_CUBE_UV";
          }
        return e;
      })(h),
      y = (function (t) {
        let e = "ENVMAP_MODE_REFLECTION";
        return (
          t.envMap && t.envMapMode === f && (e = "ENVMAP_MODE_REFRACTION"), e
        );
      })(h),
      M = (function (t) {
        let e = "ENVMAP_BLENDING_NONE";
        if (t.envMap)
          switch (t.combine) {
            case s:
              e = "ENVMAP_BLENDING_MULTIPLY";
              break;
            case a:
              e = "ENVMAP_BLENDING_MIX";
              break;
            case o:
              e = "ENVMAP_BLENDING_ADD";
          }
        return e;
      })(h),
      S = (function (t) {
        const e = t.envMapCubeUVHeight;
        if (null === e) return null;
        const i = Math.log2(e) - 2,
          n = 1 / e;
        return {
          texelWidth: 1 / (3 * Math.max(Math.pow(2, i), 112)),
          texelHeight: n,
          maxMip: i,
        };
      })(h),
      b = h.isWebGL2
        ? ""
        : (function (t) {
            return [
              t.extensionDerivatives ||
              t.envMapCubeUVHeight ||
              t.bumpMap ||
              t.normalMapTangentSpace ||
              t.clearcoatNormalMap ||
              t.flatShading ||
              "physical" === t.shaderID
                ? "#extension GL_OES_standard_derivatives : enable"
                : "",
              (t.extensionFragDepth || t.logarithmicDepthBuffer) &&
              t.rendererExtensionFragDepth
                ? "#extension GL_EXT_frag_depth : enable"
                : "",
              t.extensionDrawBuffers && t.rendererExtensionDrawBuffers
                ? "#extension GL_EXT_draw_buffers : require"
                : "",
              (t.extensionShaderTextureLOD || t.envMap || t.transmission) &&
              t.rendererExtensionShaderTextureLod
                ? "#extension GL_EXT_shader_texture_lod : enable"
                : "",
            ]
              .filter(ss)
              .join("\n");
          })(h),
      E = (function (t) {
        const e = [];
        for (const i in t) {
          const n = t[i];
          !1 !== n && e.push("#define " + i + " " + n);
        }
        return e.join("\n");
      })(u),
      T = d.createProgram();
    let w,
      A,
      R = h.glslVersion ? "#version " + h.glslVersion + "\n" : "";
    h.isRawShaderMaterial
      ? ((w = [
          "#define SHADER_TYPE " + h.shaderType,
          "#define SHADER_NAME " + h.shaderName,
          E,
        ]
          .filter(ss)
          .join("\n")),
        w.length > 0 && (w += "\n"),
        (A = [
          b,
          "#define SHADER_TYPE " + h.shaderType,
          "#define SHADER_NAME " + h.shaderName,
          E,
        ]
          .filter(ss)
          .join("\n")),
        A.length > 0 && (A += "\n"))
      : ((w = [
          fs(h),
          "#define SHADER_TYPE " + h.shaderType,
          "#define SHADER_NAME " + h.shaderName,
          E,
          h.batching ? "#define USE_BATCHING" : "",
          h.instancing ? "#define USE_INSTANCING" : "",
          h.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
          h.useFog && h.fog ? "#define USE_FOG" : "",
          h.useFog && h.fogExp2 ? "#define FOG_EXP2" : "",
          h.map ? "#define USE_MAP" : "",
          h.envMap ? "#define USE_ENVMAP" : "",
          h.envMap ? "#define " + y : "",
          h.lightMap ? "#define USE_LIGHTMAP" : "",
          h.aoMap ? "#define USE_AOMAP" : "",
          h.bumpMap ? "#define USE_BUMPMAP" : "",
          h.normalMap ? "#define USE_NORMALMAP" : "",
          h.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
          h.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
          h.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
          h.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          h.anisotropy ? "#define USE_ANISOTROPY" : "",
          h.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
          h.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          h.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          h.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          h.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
          h.iridescenceThicknessMap
            ? "#define USE_IRIDESCENCE_THICKNESSMAP"
            : "",
          h.specularMap ? "#define USE_SPECULARMAP" : "",
          h.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
          h.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
          h.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          h.metalnessMap ? "#define USE_METALNESSMAP" : "",
          h.alphaMap ? "#define USE_ALPHAMAP" : "",
          h.alphaHash ? "#define USE_ALPHAHASH" : "",
          h.transmission ? "#define USE_TRANSMISSION" : "",
          h.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          h.thicknessMap ? "#define USE_THICKNESSMAP" : "",
          h.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
          h.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
          h.mapUv ? "#define MAP_UV " + h.mapUv : "",
          h.alphaMapUv ? "#define ALPHAMAP_UV " + h.alphaMapUv : "",
          h.lightMapUv ? "#define LIGHTMAP_UV " + h.lightMapUv : "",
          h.aoMapUv ? "#define AOMAP_UV " + h.aoMapUv : "",
          h.emissiveMapUv ? "#define EMISSIVEMAP_UV " + h.emissiveMapUv : "",
          h.bumpMapUv ? "#define BUMPMAP_UV " + h.bumpMapUv : "",
          h.normalMapUv ? "#define NORMALMAP_UV " + h.normalMapUv : "",
          h.displacementMapUv
            ? "#define DISPLACEMENTMAP_UV " + h.displacementMapUv
            : "",
          h.metalnessMapUv ? "#define METALNESSMAP_UV " + h.metalnessMapUv : "",
          h.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + h.roughnessMapUv : "",
          h.anisotropyMapUv
            ? "#define ANISOTROPYMAP_UV " + h.anisotropyMapUv
            : "",
          h.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + h.clearcoatMapUv : "",
          h.clearcoatNormalMapUv
            ? "#define CLEARCOAT_NORMALMAP_UV " + h.clearcoatNormalMapUv
            : "",
          h.clearcoatRoughnessMapUv
            ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + h.clearcoatRoughnessMapUv
            : "",
          h.iridescenceMapUv
            ? "#define IRIDESCENCEMAP_UV " + h.iridescenceMapUv
            : "",
          h.iridescenceThicknessMapUv
            ? "#define IRIDESCENCE_THICKNESSMAP_UV " +
              h.iridescenceThicknessMapUv
            : "",
          h.sheenColorMapUv
            ? "#define SHEEN_COLORMAP_UV " + h.sheenColorMapUv
            : "",
          h.sheenRoughnessMapUv
            ? "#define SHEEN_ROUGHNESSMAP_UV " + h.sheenRoughnessMapUv
            : "",
          h.specularMapUv ? "#define SPECULARMAP_UV " + h.specularMapUv : "",
          h.specularColorMapUv
            ? "#define SPECULAR_COLORMAP_UV " + h.specularColorMapUv
            : "",
          h.specularIntensityMapUv
            ? "#define SPECULAR_INTENSITYMAP_UV " + h.specularIntensityMapUv
            : "",
          h.transmissionMapUv
            ? "#define TRANSMISSIONMAP_UV " + h.transmissionMapUv
            : "",
          h.thicknessMapUv ? "#define THICKNESSMAP_UV " + h.thicknessMapUv : "",
          h.vertexTangents && !1 === h.flatShading ? "#define USE_TANGENT" : "",
          h.vertexColors ? "#define USE_COLOR" : "",
          h.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
          h.vertexUv1s ? "#define USE_UV1" : "",
          h.vertexUv2s ? "#define USE_UV2" : "",
          h.vertexUv3s ? "#define USE_UV3" : "",
          h.pointsUvs ? "#define USE_POINTS_UV" : "",
          h.flatShading ? "#define FLAT_SHADED" : "",
          h.skinning ? "#define USE_SKINNING" : "",
          h.morphTargets ? "#define USE_MORPHTARGETS" : "",
          h.morphNormals && !1 === h.flatShading
            ? "#define USE_MORPHNORMALS"
            : "",
          h.morphColors && h.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
          h.morphTargetsCount > 0 && h.isWebGL2
            ? "#define MORPHTARGETS_TEXTURE"
            : "",
          h.morphTargetsCount > 0 && h.isWebGL2
            ? "#define MORPHTARGETS_TEXTURE_STRIDE " + h.morphTextureStride
            : "",
          h.morphTargetsCount > 0 && h.isWebGL2
            ? "#define MORPHTARGETS_COUNT " + h.morphTargetsCount
            : "",
          h.doubleSided ? "#define DOUBLE_SIDED" : "",
          h.flipSided ? "#define FLIP_SIDED" : "",
          h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          h.shadowMapEnabled ? "#define " + v : "",
          h.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
          h.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
          h.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
          h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
          h.logarithmicDepthBuffer && h.rendererExtensionFragDepth
            ? "#define USE_LOGDEPTHBUF_EXT"
            : "",
          "uniform mat4 modelMatrix;",
          "uniform mat4 modelViewMatrix;",
          "uniform mat4 projectionMatrix;",
          "uniform mat4 viewMatrix;",
          "uniform mat3 normalMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          "#ifdef USE_INSTANCING",
          "\tattribute mat4 instanceMatrix;",
          "#endif",
          "#ifdef USE_INSTANCING_COLOR",
          "\tattribute vec3 instanceColor;",
          "#endif",
          "attribute vec3 position;",
          "attribute vec3 normal;",
          "attribute vec2 uv;",
          "#ifdef USE_UV1",
          "\tattribute vec2 uv1;",
          "#endif",
          "#ifdef USE_UV2",
          "\tattribute vec2 uv2;",
          "#endif",
          "#ifdef USE_UV3",
          "\tattribute vec2 uv3;",
          "#endif",
          "#ifdef USE_TANGENT",
          "\tattribute vec4 tangent;",
          "#endif",
          "#if defined( USE_COLOR_ALPHA )",
          "\tattribute vec4 color;",
          "#elif defined( USE_COLOR )",
          "\tattribute vec3 color;",
          "#endif",
          "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
          "\tattribute vec3 morphTarget0;",
          "\tattribute vec3 morphTarget1;",
          "\tattribute vec3 morphTarget2;",
          "\tattribute vec3 morphTarget3;",
          "\t#ifdef USE_MORPHNORMALS",
          "\t\tattribute vec3 morphNormal0;",
          "\t\tattribute vec3 morphNormal1;",
          "\t\tattribute vec3 morphNormal2;",
          "\t\tattribute vec3 morphNormal3;",
          "\t#else",
          "\t\tattribute vec3 morphTarget4;",
          "\t\tattribute vec3 morphTarget5;",
          "\t\tattribute vec3 morphTarget6;",
          "\t\tattribute vec3 morphTarget7;",
          "\t#endif",
          "#endif",
          "#ifdef USE_SKINNING",
          "\tattribute vec4 skinIndex;",
          "\tattribute vec4 skinWeight;",
          "#endif",
          "\n",
        ]
          .filter(ss)
          .join("\n")),
        (A = [
          b,
          fs(h),
          "#define SHADER_TYPE " + h.shaderType,
          "#define SHADER_NAME " + h.shaderName,
          E,
          h.useFog && h.fog ? "#define USE_FOG" : "",
          h.useFog && h.fogExp2 ? "#define FOG_EXP2" : "",
          h.map ? "#define USE_MAP" : "",
          h.matcap ? "#define USE_MATCAP" : "",
          h.envMap ? "#define USE_ENVMAP" : "",
          h.envMap ? "#define " + x : "",
          h.envMap ? "#define " + y : "",
          h.envMap ? "#define " + M : "",
          S ? "#define CUBEUV_TEXEL_WIDTH " + S.texelWidth : "",
          S ? "#define CUBEUV_TEXEL_HEIGHT " + S.texelHeight : "",
          S ? "#define CUBEUV_MAX_MIP " + S.maxMip + ".0" : "",
          h.lightMap ? "#define USE_LIGHTMAP" : "",
          h.aoMap ? "#define USE_AOMAP" : "",
          h.bumpMap ? "#define USE_BUMPMAP" : "",
          h.normalMap ? "#define USE_NORMALMAP" : "",
          h.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
          h.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
          h.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          h.anisotropy ? "#define USE_ANISOTROPY" : "",
          h.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
          h.clearcoat ? "#define USE_CLEARCOAT" : "",
          h.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          h.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          h.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          h.iridescence ? "#define USE_IRIDESCENCE" : "",
          h.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
          h.iridescenceThicknessMap
            ? "#define USE_IRIDESCENCE_THICKNESSMAP"
            : "",
          h.specularMap ? "#define USE_SPECULARMAP" : "",
          h.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
          h.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
          h.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          h.metalnessMap ? "#define USE_METALNESSMAP" : "",
          h.alphaMap ? "#define USE_ALPHAMAP" : "",
          h.alphaTest ? "#define USE_ALPHATEST" : "",
          h.alphaHash ? "#define USE_ALPHAHASH" : "",
          h.sheen ? "#define USE_SHEEN" : "",
          h.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
          h.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
          h.transmission ? "#define USE_TRANSMISSION" : "",
          h.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          h.thicknessMap ? "#define USE_THICKNESSMAP" : "",
          h.vertexTangents && !1 === h.flatShading ? "#define USE_TANGENT" : "",
          h.vertexColors || h.instancingColor ? "#define USE_COLOR" : "",
          h.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
          h.vertexUv1s ? "#define USE_UV1" : "",
          h.vertexUv2s ? "#define USE_UV2" : "",
          h.vertexUv3s ? "#define USE_UV3" : "",
          h.pointsUvs ? "#define USE_POINTS_UV" : "",
          h.gradientMap ? "#define USE_GRADIENTMAP" : "",
          h.flatShading ? "#define FLAT_SHADED" : "",
          h.doubleSided ? "#define DOUBLE_SIDED" : "",
          h.flipSided ? "#define FLIP_SIDED" : "",
          h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          h.shadowMapEnabled ? "#define " + v : "",
          h.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
          h.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
          h.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
          h.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
          h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
          h.logarithmicDepthBuffer && h.rendererExtensionFragDepth
            ? "#define USE_LOGDEPTHBUF_EXT"
            : "",
          "uniform mat4 viewMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          h.toneMapping !== l ? "#define TONE_MAPPING" : "",
          h.toneMapping !== l ? pn.tonemapping_pars_fragment : "",
          h.toneMapping !== l ? rs("toneMapping", h.toneMapping) : "",
          h.dithering ? "#define DITHERING" : "",
          h.opaque ? "#define OPAQUE" : "",
          pn.colorspace_pars_fragment,
          ns("linearToOutputTexel", h.outputColorSpace),
          h.useDepthPacking ? "#define DEPTH_PACKING " + h.depthPacking : "",
          "\n",
        ]
          .filter(ss)
          .join("\n"))),
      (p = hs(p)),
      (p = as(p, h)),
      (p = os(p, h)),
      (g = hs(g)),
      (g = as(g, h)),
      (g = os(g, h)),
      (p = ps(p)),
      (g = ps(g)),
      h.isWebGL2 &&
        !0 !== h.isRawShaderMaterial &&
        ((R = "#version 300 es\n"),
        (w =
          [
            "precision mediump sampler2DArray;",
            "#define attribute in",
            "#define varying out",
            "#define texture2D texture",
          ].join("\n") +
          "\n" +
          w),
        (A =
          [
            "precision mediump sampler2DArray;",
            "#define varying in",
            h.glslVersion === $
              ? ""
              : "layout(location = 0) out highp vec4 pc_fragColor;",
            h.glslVersion === $ ? "" : "#define gl_FragColor pc_fragColor",
            "#define gl_FragDepthEXT gl_FragDepth",
            "#define texture2D texture",
            "#define textureCube texture",
            "#define texture2DProj textureProj",
            "#define texture2DLodEXT textureLod",
            "#define texture2DProjLodEXT textureProjLod",
            "#define textureCubeLodEXT textureLod",
            "#define texture2DGradEXT textureGrad",
            "#define texture2DProjGradEXT textureProjGrad",
            "#define textureCubeGradEXT textureGrad",
          ].join("\n") +
          "\n" +
          A));
    const C = R + w + p,
      L = R + A + g,
      P = $r(d, d.VERTEX_SHADER, C),
      U = $r(d, d.FRAGMENT_SHADER, L);
    function D(e) {
      if (t.debug.checkShaderErrors) {
        const i = d.getProgramInfoLog(T).trim(),
          n = d.getShaderInfoLog(P).trim(),
          r = d.getShaderInfoLog(U).trim();
        let s = !0,
          a = !0;
        if (!1 === d.getProgramParameter(T, d.LINK_STATUS))
          if (((s = !1), "function" == typeof t.debug.onShaderError))
            t.debug.onShaderError(d, T, P, U);
          else {
            const t = is(d, P, "vertex"),
              e = is(d, U, "fragment");
            console.error(
              "THREE.WebGLProgram: Shader Error " +
                d.getError() +
                " - VALIDATE_STATUS " +
                d.getProgramParameter(T, d.VALIDATE_STATUS) +
                "\n\nProgram Info Log: " +
                i +
                "\n" +
                t +
                "\n" +
                e
            );
          }
        else
          "" !== i
            ? console.warn("THREE.WebGLProgram: Program Info Log:", i)
            : ("" !== n && "" !== r) || (a = !1);
        a &&
          (e.diagnostics = {
            runnable: s,
            programLog: i,
            vertexShader: { log: n, prefix: w },
            fragmentShader: { log: r, prefix: A },
          });
      }
      d.deleteShader(P),
        d.deleteShader(U),
        (I = new Qr(d, T)),
        (N = (function (t, e) {
          const i = {},
            n = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES);
          for (let r = 0; r < n; r++) {
            const n = t.getActiveAttrib(e, r),
              s = n.name;
            let a = 1;
            n.type === t.FLOAT_MAT2 && (a = 2),
              n.type === t.FLOAT_MAT3 && (a = 3),
              n.type === t.FLOAT_MAT4 && (a = 4),
              (i[s] = {
                type: n.type,
                location: t.getAttribLocation(e, s),
                locationSize: a,
              });
          }
          return i;
        })(d, T));
    }
    let I, N;
    d.attachShader(T, P),
      d.attachShader(T, U),
      void 0 !== h.index0AttributeName
        ? d.bindAttribLocation(T, 0, h.index0AttributeName)
        : !0 === h.morphTargets && d.bindAttribLocation(T, 0, "position"),
      d.linkProgram(T),
      (this.getUniforms = function () {
        return void 0 === I && D(this), I;
      }),
      (this.getAttributes = function () {
        return void 0 === N && D(this), N;
      });
    let O = !1 === h.rendererExtensionParallelShaderCompile;
    return (
      (this.isReady = function () {
        return !1 === O && (O = d.getProgramParameter(T, ts)), O;
      }),
      (this.destroy = function () {
        c.releaseStatesOfProgram(this),
          d.deleteProgram(T),
          (this.program = void 0);
      }),
      (this.type = h.shaderType),
      (this.name = h.shaderName),
      (this.id = es++),
      (this.cacheKey = r),
      (this.usedTimes = 1),
      (this.program = T),
      (this.vertexShader = P),
      (this.fragmentShader = U),
      this
    );
  }
  let _s = 0;
  class vs {
    constructor() {
      (this.shaderCache = new Map()), (this.materialCache = new Map());
    }
    update(t) {
      const e = t.vertexShader,
        i = t.fragmentShader,
        n = this._getShaderStage(e),
        r = this._getShaderStage(i),
        s = this._getShaderCacheForMaterial(t);
      return (
        !1 === s.has(n) && (s.add(n), n.usedTimes++),
        !1 === s.has(r) && (s.add(r), r.usedTimes++),
        this
      );
    }
    remove(t) {
      const e = this.materialCache.get(t);
      for (const t of e)
        t.usedTimes--, 0 === t.usedTimes && this.shaderCache.delete(t.code);
      return this.materialCache.delete(t), this;
    }
    getVertexShaderID(t) {
      return this._getShaderStage(t.vertexShader).id;
    }
    getFragmentShaderID(t) {
      return this._getShaderStage(t.fragmentShader).id;
    }
    dispose() {
      this.shaderCache.clear(), this.materialCache.clear();
    }
    _getShaderCacheForMaterial(t) {
      const e = this.materialCache;
      let i = e.get(t);
      return void 0 === i && ((i = new Set()), e.set(t, i)), i;
    }
    _getShaderStage(t) {
      const e = this.shaderCache;
      let i = e.get(t);
      return void 0 === i && ((i = new xs(t)), e.set(t, i)), i;
    }
  }
  class xs {
    constructor(t) {
      (this.id = _s++), (this.code = t), (this.usedTimes = 0);
    }
  }
  function ys(t, e, i, n, r, s, a) {
    const o = new Ce(),
      h = new vs(),
      c = [],
      d = r.isWebGL2,
      u = r.logarithmicDepthBuffer,
      p = r.vertexTextures;
    let m = r.precision;
    const f = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distanceRGBA",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "toon",
      MeshStandardMaterial: "physical",
      MeshPhysicalMaterial: "physical",
      MeshMatcapMaterial: "matcap",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow",
      SpriteMaterial: "sprite",
    };
    function g(t) {
      return 0 === t ? "uv" : `uv${t}`;
    }
    return {
      getParameters: function (s, o, c, v, x) {
        const y = v.fog,
          M = x.geometry,
          S = s.isMeshStandardMaterial ? v.environment : null,
          b = (s.isMeshStandardMaterial ? i : e).get(s.envMap || S),
          E = b && b.mapping === _ ? b.image.height : null,
          T = f[s.type];
        null !== s.precision &&
          ((m = r.getMaxPrecision(s.precision)),
          m !== s.precision &&
            console.warn(
              "THREE.WebGLProgram.getParameters:",
              s.precision,
              "not supported, using",
              m,
              "instead."
            ));
        const w =
            M.morphAttributes.position ||
            M.morphAttributes.normal ||
            M.morphAttributes.color,
          A = void 0 !== w ? w.length : 0;
        let R,
          C,
          L,
          P,
          U = 0;
        if (
          (void 0 !== M.morphAttributes.position && (U = 1),
          void 0 !== M.morphAttributes.normal && (U = 2),
          void 0 !== M.morphAttributes.color && (U = 3),
          T)
        ) {
          const t = fn[T];
          (R = t.vertexShader), (C = t.fragmentShader);
        } else
          (R = s.vertexShader),
            (C = s.fragmentShader),
            h.update(s),
            (L = h.getVertexShaderID(s)),
            (P = h.getFragmentShaderID(s));
        const D = t.getRenderTarget(),
          I = !0 === x.isInstancedMesh,
          N = !0 === x.isBatchedMesh,
          O = !!s.map,
          F = !!s.matcap,
          z = !!b,
          B = !!s.aoMap,
          k = !!s.lightMap,
          V = !!s.bumpMap,
          H = !!s.normalMap,
          G = !!s.displacementMap,
          W = !!s.emissiveMap,
          X = !!s.metalnessMap,
          q = !!s.roughnessMap,
          Y = s.anisotropy > 0,
          Z = s.clearcoat > 0,
          J = s.iridescence > 0,
          Q = s.sheen > 0,
          $ = s.transmission > 0,
          tt = Y && !!s.anisotropyMap,
          et = Z && !!s.clearcoatMap,
          it = Z && !!s.clearcoatNormalMap,
          nt = Z && !!s.clearcoatRoughnessMap,
          rt = J && !!s.iridescenceMap,
          st = J && !!s.iridescenceThicknessMap,
          at = Q && !!s.sheenColorMap,
          ot = Q && !!s.sheenRoughnessMap,
          lt = !!s.specularMap,
          ht = !!s.specularColorMap,
          ct = !!s.specularIntensityMap,
          dt = $ && !!s.transmissionMap,
          ut = $ && !!s.thicknessMap,
          pt = !!s.gradientMap,
          mt = !!s.alphaMap,
          ft = s.alphaTest > 0,
          gt = !!s.alphaHash,
          _t = !!s.extensions,
          vt = !!M.attributes.uv1,
          xt = !!M.attributes.uv2,
          yt = !!M.attributes.uv3;
        let Mt = l;
        return (
          s.toneMapped &&
            ((null !== D && !0 !== D.isXRRenderTarget) || (Mt = t.toneMapping)),
          {
            isWebGL2: d,
            shaderID: T,
            shaderType: s.type,
            shaderName: s.name,
            vertexShader: R,
            fragmentShader: C,
            defines: s.defines,
            customVertexShaderID: L,
            customFragmentShaderID: P,
            isRawShaderMaterial: !0 === s.isRawShaderMaterial,
            glslVersion: s.glslVersion,
            precision: m,
            batching: N,
            instancing: I,
            instancingColor: I && null !== x.instanceColor,
            supportsVertexTextures: p,
            outputColorSpace:
              null === D
                ? t.outputColorSpace
                : !0 === D.isXRRenderTarget
                ? D.texture.colorSpace
                : j,
            map: O,
            matcap: F,
            envMap: z,
            envMapMode: z && b.mapping,
            envMapCubeUVHeight: E,
            aoMap: B,
            lightMap: k,
            bumpMap: V,
            normalMap: H,
            displacementMap: p && G,
            emissiveMap: W,
            normalMapObjectSpace: H && 1 === s.normalMapType,
            normalMapTangentSpace: H && 0 === s.normalMapType,
            metalnessMap: X,
            roughnessMap: q,
            anisotropy: Y,
            anisotropyMap: tt,
            clearcoat: Z,
            clearcoatMap: et,
            clearcoatNormalMap: it,
            clearcoatRoughnessMap: nt,
            iridescence: J,
            iridescenceMap: rt,
            iridescenceThicknessMap: st,
            sheen: Q,
            sheenColorMap: at,
            sheenRoughnessMap: ot,
            specularMap: lt,
            specularColorMap: ht,
            specularIntensityMap: ct,
            transmission: $,
            transmissionMap: dt,
            thicknessMap: ut,
            gradientMap: pt,
            opaque: !1 === s.transparent && 1 === s.blending,
            alphaMap: mt,
            alphaTest: ft,
            alphaHash: gt,
            combine: s.combine,
            mapUv: O && g(s.map.channel),
            aoMapUv: B && g(s.aoMap.channel),
            lightMapUv: k && g(s.lightMap.channel),
            bumpMapUv: V && g(s.bumpMap.channel),
            normalMapUv: H && g(s.normalMap.channel),
            displacementMapUv: G && g(s.displacementMap.channel),
            emissiveMapUv: W && g(s.emissiveMap.channel),
            metalnessMapUv: X && g(s.metalnessMap.channel),
            roughnessMapUv: q && g(s.roughnessMap.channel),
            anisotropyMapUv: tt && g(s.anisotropyMap.channel),
            clearcoatMapUv: et && g(s.clearcoatMap.channel),
            clearcoatNormalMapUv: it && g(s.clearcoatNormalMap.channel),
            clearcoatRoughnessMapUv: nt && g(s.clearcoatRoughnessMap.channel),
            iridescenceMapUv: rt && g(s.iridescenceMap.channel),
            iridescenceThicknessMapUv:
              st && g(s.iridescenceThicknessMap.channel),
            sheenColorMapUv: at && g(s.sheenColorMap.channel),
            sheenRoughnessMapUv: ot && g(s.sheenRoughnessMap.channel),
            specularMapUv: lt && g(s.specularMap.channel),
            specularColorMapUv: ht && g(s.specularColorMap.channel),
            specularIntensityMapUv: ct && g(s.specularIntensityMap.channel),
            transmissionMapUv: dt && g(s.transmissionMap.channel),
            thicknessMapUv: ut && g(s.thicknessMap.channel),
            alphaMapUv: mt && g(s.alphaMap.channel),
            vertexTangents: !!M.attributes.tangent && (H || Y),
            vertexColors: s.vertexColors,
            vertexAlphas:
              !0 === s.vertexColors &&
              !!M.attributes.color &&
              4 === M.attributes.color.itemSize,
            vertexUv1s: vt,
            vertexUv2s: xt,
            vertexUv3s: yt,
            pointsUvs: !0 === x.isPoints && !!M.attributes.uv && (O || mt),
            fog: !!y,
            useFog: !0 === s.fog,
            fogExp2: y && y.isFogExp2,
            flatShading: !0 === s.flatShading,
            sizeAttenuation: !0 === s.sizeAttenuation,
            logarithmicDepthBuffer: u,
            skinning: !0 === x.isSkinnedMesh,
            morphTargets: void 0 !== M.morphAttributes.position,
            morphNormals: void 0 !== M.morphAttributes.normal,
            morphColors: void 0 !== M.morphAttributes.color,
            morphTargetsCount: A,
            morphTextureStride: U,
            numDirLights: o.directional.length,
            numPointLights: o.point.length,
            numSpotLights: o.spot.length,
            numSpotLightMaps: o.spotLightMap.length,
            numRectAreaLights: o.rectArea.length,
            numHemiLights: o.hemi.length,
            numDirLightShadows: o.directionalShadowMap.length,
            numPointLightShadows: o.pointShadowMap.length,
            numSpotLightShadows: o.spotShadowMap.length,
            numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
            numLightProbes: o.numLightProbes,
            numClippingPlanes: a.numPlanes,
            numClipIntersection: a.numIntersection,
            dithering: s.dithering,
            shadowMapEnabled: t.shadowMap.enabled && c.length > 0,
            shadowMapType: t.shadowMap.type,
            toneMapping: Mt,
            useLegacyLights: t._useLegacyLights,
            decodeVideoTexture:
              O &&
              !0 === s.map.isVideoTexture &&
              wt.getTransfer(s.map.colorSpace) === K,
            premultipliedAlpha: s.premultipliedAlpha,
            doubleSided: 2 === s.side,
            flipSided: 1 === s.side,
            useDepthPacking: s.depthPacking >= 0,
            depthPacking: s.depthPacking || 0,
            index0AttributeName: s.index0AttributeName,
            extensionDerivatives: _t && !0 === s.extensions.derivatives,
            extensionFragDepth: _t && !0 === s.extensions.fragDepth,
            extensionDrawBuffers: _t && !0 === s.extensions.drawBuffers,
            extensionShaderTextureLOD:
              _t && !0 === s.extensions.shaderTextureLOD,
            rendererExtensionFragDepth: d || n.has("EXT_frag_depth"),
            rendererExtensionDrawBuffers: d || n.has("WEBGL_draw_buffers"),
            rendererExtensionShaderTextureLod:
              d || n.has("EXT_shader_texture_lod"),
            rendererExtensionParallelShaderCompile: n.has(
              "KHR_parallel_shader_compile"
            ),
            customProgramCacheKey: s.customProgramCacheKey(),
          }
        );
      },
      getProgramCacheKey: function (e) {
        const i = [];
        if (
          (e.shaderID
            ? i.push(e.shaderID)
            : (i.push(e.customVertexShaderID),
              i.push(e.customFragmentShaderID)),
          void 0 !== e.defines)
        )
          for (const t in e.defines) i.push(t), i.push(e.defines[t]);
        return (
          !1 === e.isRawShaderMaterial &&
            ((function (t, e) {
              t.push(e.precision),
                t.push(e.outputColorSpace),
                t.push(e.envMapMode),
                t.push(e.envMapCubeUVHeight),
                t.push(e.mapUv),
                t.push(e.alphaMapUv),
                t.push(e.lightMapUv),
                t.push(e.aoMapUv),
                t.push(e.bumpMapUv),
                t.push(e.normalMapUv),
                t.push(e.displacementMapUv),
                t.push(e.emissiveMapUv),
                t.push(e.metalnessMapUv),
                t.push(e.roughnessMapUv),
                t.push(e.anisotropyMapUv),
                t.push(e.clearcoatMapUv),
                t.push(e.clearcoatNormalMapUv),
                t.push(e.clearcoatRoughnessMapUv),
                t.push(e.iridescenceMapUv),
                t.push(e.iridescenceThicknessMapUv),
                t.push(e.sheenColorMapUv),
                t.push(e.sheenRoughnessMapUv),
                t.push(e.specularMapUv),
                t.push(e.specularColorMapUv),
                t.push(e.specularIntensityMapUv),
                t.push(e.transmissionMapUv),
                t.push(e.thicknessMapUv),
                t.push(e.combine),
                t.push(e.fogExp2),
                t.push(e.sizeAttenuation),
                t.push(e.morphTargetsCount),
                t.push(e.morphAttributeCount),
                t.push(e.numDirLights),
                t.push(e.numPointLights),
                t.push(e.numSpotLights),
                t.push(e.numSpotLightMaps),
                t.push(e.numHemiLights),
                t.push(e.numRectAreaLights),
                t.push(e.numDirLightShadows),
                t.push(e.numPointLightShadows),
                t.push(e.numSpotLightShadows),
                t.push(e.numSpotLightShadowsWithMaps),
                t.push(e.numLightProbes),
                t.push(e.shadowMapType),
                t.push(e.toneMapping),
                t.push(e.numClippingPlanes),
                t.push(e.numClipIntersection),
                t.push(e.depthPacking);
            })(i, e),
            (function (t, e) {
              o.disableAll(),
                e.isWebGL2 && o.enable(0),
                e.supportsVertexTextures && o.enable(1),
                e.instancing && o.enable(2),
                e.instancingColor && o.enable(3),
                e.matcap && o.enable(4),
                e.envMap && o.enable(5),
                e.normalMapObjectSpace && o.enable(6),
                e.normalMapTangentSpace && o.enable(7),
                e.clearcoat && o.enable(8),
                e.iridescence && o.enable(9),
                e.alphaTest && o.enable(10),
                e.vertexColors && o.enable(11),
                e.vertexAlphas && o.enable(12),
                e.vertexUv1s && o.enable(13),
                e.vertexUv2s && o.enable(14),
                e.vertexUv3s && o.enable(15),
                e.vertexTangents && o.enable(16),
                e.anisotropy && o.enable(17),
                e.alphaHash && o.enable(18),
                e.batching && o.enable(19),
                t.push(o.mask),
                o.disableAll(),
                e.fog && o.enable(0),
                e.useFog && o.enable(1),
                e.flatShading && o.enable(2),
                e.logarithmicDepthBuffer && o.enable(3),
                e.skinning && o.enable(4),
                e.morphTargets && o.enable(5),
                e.morphNormals && o.enable(6),
                e.morphColors && o.enable(7),
                e.premultipliedAlpha && o.enable(8),
                e.shadowMapEnabled && o.enable(9),
                e.useLegacyLights && o.enable(10),
                e.doubleSided && o.enable(11),
                e.flipSided && o.enable(12),
                e.useDepthPacking && o.enable(13),
                e.dithering && o.enable(14),
                e.transmission && o.enable(15),
                e.sheen && o.enable(16),
                e.opaque && o.enable(17),
                e.pointsUvs && o.enable(18),
                e.decodeVideoTexture && o.enable(19),
                t.push(o.mask);
            })(i, e),
            i.push(t.outputColorSpace)),
          i.push(e.customProgramCacheKey),
          i.join()
        );
      },
      getUniforms: function (t) {
        const e = f[t.type];
        let i;
        if (e) {
          const t = fn[e];
          i = Yi.clone(t.uniforms);
        } else i = t.uniforms;
        return i;
      },
      acquireProgram: function (e, i) {
        let n;
        for (let t = 0, e = c.length; t < e; t++) {
          const e = c[t];
          if (e.cacheKey === i) {
            (n = e), ++n.usedTimes;
            break;
          }
        }
        return void 0 === n && ((n = new gs(t, i, e, s)), c.push(n)), n;
      },
      releaseProgram: function (t) {
        if (0 == --t.usedTimes) {
          const e = c.indexOf(t);
          (c[e] = c[c.length - 1]), c.pop(), t.destroy();
        }
      },
      releaseShaderCache: function (t) {
        h.remove(t);
      },
      programs: c,
      dispose: function () {
        h.dispose();
      },
    };
  }
  function Ms() {
    let t = new WeakMap();
    return {
      get: function (e) {
        let i = t.get(e);
        return void 0 === i && ((i = {}), t.set(e, i)), i;
      },
      remove: function (e) {
        t.delete(e);
      },
      update: function (e, i, n) {
        t.get(e)[i] = n;
      },
      dispose: function () {
        t = new WeakMap();
      },
    };
  }
  function Ss(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.material.id !== e.material.id
      ? t.material.id - e.material.id
      : t.z !== e.z
      ? t.z - e.z
      : t.id - e.id;
  }
  function bs(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.z !== e.z
      ? e.z - t.z
      : t.id - e.id;
  }
  function Es() {
    const t = [];
    let e = 0;
    const i = [],
      n = [],
      r = [];
    function s(i, n, r, s, a, o) {
      let l = t[e];
      return (
        void 0 === l
          ? ((l = {
              id: i.id,
              object: i,
              geometry: n,
              material: r,
              groupOrder: s,
              renderOrder: i.renderOrder,
              z: a,
              group: o,
            }),
            (t[e] = l))
          : ((l.id = i.id),
            (l.object = i),
            (l.geometry = n),
            (l.material = r),
            (l.groupOrder = s),
            (l.renderOrder = i.renderOrder),
            (l.z = a),
            (l.group = o)),
        e++,
        l
      );
    }
    return {
      opaque: i,
      transmissive: n,
      transparent: r,
      init: function () {
        (e = 0), (i.length = 0), (n.length = 0), (r.length = 0);
      },
      push: function (t, e, a, o, l, h) {
        const c = s(t, e, a, o, l, h);
        a.transmission > 0
          ? n.push(c)
          : !0 === a.transparent
          ? r.push(c)
          : i.push(c);
      },
      unshift: function (t, e, a, o, l, h) {
        const c = s(t, e, a, o, l, h);
        a.transmission > 0
          ? n.unshift(c)
          : !0 === a.transparent
          ? r.unshift(c)
          : i.unshift(c);
      },
      finish: function () {
        for (let i = e, n = t.length; i < n; i++) {
          const e = t[i];
          if (null === e.id) break;
          (e.id = null),
            (e.object = null),
            (e.geometry = null),
            (e.material = null),
            (e.group = null);
        }
      },
      sort: function (t, e) {
        i.length > 1 && i.sort(t || Ss),
          n.length > 1 && n.sort(e || bs),
          r.length > 1 && r.sort(e || bs);
      },
    };
  }
  function Ts() {
    let t = new WeakMap();
    return {
      get: function (e, i) {
        const n = t.get(e);
        let r;
        return (
          void 0 === n
            ? ((r = new Es()), t.set(e, [r]))
            : i >= n.length
            ? ((r = new Es()), n.push(r))
            : (r = n[i]),
          r
        );
      },
      dispose: function () {
        t = new WeakMap();
      },
    };
  }
  function ws() {
    const t = {};
    return {
      get: function (e) {
        if (void 0 !== t[e.id]) return t[e.id];
        let i;
        switch (e.type) {
          case "DirectionalLight":
            i = { direction: new Ht(), color: new ai() };
            break;
          case "SpotLight":
            i = {
              position: new Ht(),
              direction: new Ht(),
              color: new ai(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0,
            };
            break;
          case "PointLight":
            i = { position: new Ht(), color: new ai(), distance: 0, decay: 0 };
            break;
          case "HemisphereLight":
            i = {
              direction: new Ht(),
              skyColor: new ai(),
              groundColor: new ai(),
            };
            break;
          case "RectAreaLight":
            i = {
              color: new ai(),
              position: new Ht(),
              halfWidth: new Ht(),
              halfHeight: new Ht(),
            };
        }
        return (t[e.id] = i), i;
      },
    };
  }
  let As = 0;
  function Rs(t, e) {
    return (
      (e.castShadow ? 2 : 0) -
      (t.castShadow ? 2 : 0) +
      (e.map ? 1 : 0) -
      (t.map ? 1 : 0)
    );
  }
  function Cs(t, e) {
    const i = new ws(),
      n = (function () {
        const t = {};
        return {
          get: function (e) {
            if (void 0 !== t[e.id]) return t[e.id];
            let i;
            switch (e.type) {
              case "DirectionalLight":
              case "SpotLight":
                i = {
                  shadowBias: 0,
                  shadowNormalBias: 0,
                  shadowRadius: 1,
                  shadowMapSize: new mt(),
                };
                break;
              case "PointLight":
                i = {
                  shadowBias: 0,
                  shadowNormalBias: 0,
                  shadowRadius: 1,
                  shadowMapSize: new mt(),
                  shadowCameraNear: 1,
                  shadowCameraFar: 1e3,
                };
            }
            return (t[e.id] = i), i;
          },
        };
      })(),
      r = {
        version: 0,
        hash: {
          directionalLength: -1,
          pointLength: -1,
          spotLength: -1,
          rectAreaLength: -1,
          hemiLength: -1,
          numDirectionalShadows: -1,
          numPointShadows: -1,
          numSpotShadows: -1,
          numSpotMaps: -1,
          numLightProbes: -1,
        },
        ambient: [0, 0, 0],
        probe: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotLightMap: [],
        spotShadow: [],
        spotShadowMap: [],
        spotLightMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
        numSpotLightShadowsWithMaps: 0,
        numLightProbes: 0,
      };
    for (let t = 0; t < 9; t++) r.probe.push(new Ht());
    const s = new Ht(),
      a = new ve(),
      o = new ve();
    return {
      setup: function (s, a) {
        let o = 0,
          l = 0,
          h = 0;
        for (let t = 0; t < 9; t++) r.probe[t].set(0, 0, 0);
        let c = 0,
          d = 0,
          u = 0,
          p = 0,
          m = 0,
          f = 0,
          g = 0,
          _ = 0,
          v = 0,
          x = 0,
          y = 0;
        s.sort(Rs);
        const M = !0 === a ? Math.PI : 1;
        for (let t = 0, e = s.length; t < e; t++) {
          const e = s[t],
            a = e.color,
            S = e.intensity,
            b = e.distance,
            E = e.shadow && e.shadow.map ? e.shadow.map.texture : null;
          if (e.isAmbientLight)
            (o += a.r * S * M), (l += a.g * S * M), (h += a.b * S * M);
          else if (e.isLightProbe) {
            for (let t = 0; t < 9; t++)
              r.probe[t].addScaledVector(e.sh.coefficients[t], S);
            y++;
          } else if (e.isDirectionalLight) {
            const t = i.get(e);
            if (
              (t.color.copy(e.color).multiplyScalar(e.intensity * M),
              e.castShadow)
            ) {
              const t = e.shadow,
                i = n.get(e);
              (i.shadowBias = t.bias),
                (i.shadowNormalBias = t.normalBias),
                (i.shadowRadius = t.radius),
                (i.shadowMapSize = t.mapSize),
                (r.directionalShadow[c] = i),
                (r.directionalShadowMap[c] = E),
                (r.directionalShadowMatrix[c] = e.shadow.matrix),
                f++;
            }
            (r.directional[c] = t), c++;
          } else if (e.isSpotLight) {
            const t = i.get(e);
            t.position.setFromMatrixPosition(e.matrixWorld),
              t.color.copy(a).multiplyScalar(S * M),
              (t.distance = b),
              (t.coneCos = Math.cos(e.angle)),
              (t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra))),
              (t.decay = e.decay),
              (r.spot[u] = t);
            const s = e.shadow;
            if (
              (e.map &&
                ((r.spotLightMap[v] = e.map),
                v++,
                s.updateMatrices(e),
                e.castShadow && x++),
              (r.spotLightMatrix[u] = s.matrix),
              e.castShadow)
            ) {
              const t = n.get(e);
              (t.shadowBias = s.bias),
                (t.shadowNormalBias = s.normalBias),
                (t.shadowRadius = s.radius),
                (t.shadowMapSize = s.mapSize),
                (r.spotShadow[u] = t),
                (r.spotShadowMap[u] = E),
                _++;
            }
            u++;
          } else if (e.isRectAreaLight) {
            const t = i.get(e);
            t.color.copy(a).multiplyScalar(S),
              t.halfWidth.set(0.5 * e.width, 0, 0),
              t.halfHeight.set(0, 0.5 * e.height, 0),
              (r.rectArea[p] = t),
              p++;
          } else if (e.isPointLight) {
            const t = i.get(e);
            if (
              (t.color.copy(e.color).multiplyScalar(e.intensity * M),
              (t.distance = e.distance),
              (t.decay = e.decay),
              e.castShadow)
            ) {
              const t = e.shadow,
                i = n.get(e);
              (i.shadowBias = t.bias),
                (i.shadowNormalBias = t.normalBias),
                (i.shadowRadius = t.radius),
                (i.shadowMapSize = t.mapSize),
                (i.shadowCameraNear = t.camera.near),
                (i.shadowCameraFar = t.camera.far),
                (r.pointShadow[d] = i),
                (r.pointShadowMap[d] = E),
                (r.pointShadowMatrix[d] = e.shadow.matrix),
                g++;
            }
            (r.point[d] = t), d++;
          } else if (e.isHemisphereLight) {
            const t = i.get(e);
            t.skyColor.copy(e.color).multiplyScalar(S * M),
              t.groundColor.copy(e.groundColor).multiplyScalar(S * M),
              (r.hemi[m] = t),
              m++;
          }
        }
        p > 0 &&
          (e.isWebGL2 || !0 === t.has("OES_texture_float_linear")
            ? ((r.rectAreaLTC1 = mn.LTC_FLOAT_1),
              (r.rectAreaLTC2 = mn.LTC_FLOAT_2))
            : !0 === t.has("OES_texture_half_float_linear")
            ? ((r.rectAreaLTC1 = mn.LTC_HALF_1),
              (r.rectAreaLTC2 = mn.LTC_HALF_2))
            : console.error(
                "THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions."
              )),
          (r.ambient[0] = o),
          (r.ambient[1] = l),
          (r.ambient[2] = h);
        const S = r.hash;
        (S.directionalLength === c &&
          S.pointLength === d &&
          S.spotLength === u &&
          S.rectAreaLength === p &&
          S.hemiLength === m &&
          S.numDirectionalShadows === f &&
          S.numPointShadows === g &&
          S.numSpotShadows === _ &&
          S.numSpotMaps === v &&
          S.numLightProbes === y) ||
          ((r.directional.length = c),
          (r.spot.length = u),
          (r.rectArea.length = p),
          (r.point.length = d),
          (r.hemi.length = m),
          (r.directionalShadow.length = f),
          (r.directionalShadowMap.length = f),
          (r.pointShadow.length = g),
          (r.pointShadowMap.length = g),
          (r.spotShadow.length = _),
          (r.spotShadowMap.length = _),
          (r.directionalShadowMatrix.length = f),
          (r.pointShadowMatrix.length = g),
          (r.spotLightMatrix.length = _ + v - x),
          (r.spotLightMap.length = v),
          (r.numSpotLightShadowsWithMaps = x),
          (r.numLightProbes = y),
          (S.directionalLength = c),
          (S.pointLength = d),
          (S.spotLength = u),
          (S.rectAreaLength = p),
          (S.hemiLength = m),
          (S.numDirectionalShadows = f),
          (S.numPointShadows = g),
          (S.numSpotShadows = _),
          (S.numSpotMaps = v),
          (S.numLightProbes = y),
          (r.version = As++));
      },
      setupView: function (t, e) {
        let i = 0,
          n = 0,
          l = 0,
          h = 0,
          c = 0;
        const d = e.matrixWorldInverse;
        for (let e = 0, u = t.length; e < u; e++) {
          const u = t[e];
          if (u.isDirectionalLight) {
            const t = r.directional[i];
            t.direction.setFromMatrixPosition(u.matrixWorld),
              s.setFromMatrixPosition(u.target.matrixWorld),
              t.direction.sub(s),
              t.direction.transformDirection(d),
              i++;
          } else if (u.isSpotLight) {
            const t = r.spot[l];
            t.position.setFromMatrixPosition(u.matrixWorld),
              t.position.applyMatrix4(d),
              t.direction.setFromMatrixPosition(u.matrixWorld),
              s.setFromMatrixPosition(u.target.matrixWorld),
              t.direction.sub(s),
              t.direction.transformDirection(d),
              l++;
          } else if (u.isRectAreaLight) {
            const t = r.rectArea[h];
            t.position.setFromMatrixPosition(u.matrixWorld),
              t.position.applyMatrix4(d),
              o.identity(),
              a.copy(u.matrixWorld),
              a.premultiply(d),
              o.extractRotation(a),
              t.halfWidth.set(0.5 * u.width, 0, 0),
              t.halfHeight.set(0, 0.5 * u.height, 0),
              t.halfWidth.applyMatrix4(o),
              t.halfHeight.applyMatrix4(o),
              h++;
          } else if (u.isPointLight) {
            const t = r.point[n];
            t.position.setFromMatrixPosition(u.matrixWorld),
              t.position.applyMatrix4(d),
              n++;
          } else if (u.isHemisphereLight) {
            const t = r.hemi[c];
            t.direction.setFromMatrixPosition(u.matrixWorld),
              t.direction.transformDirection(d),
              c++;
          }
        }
      },
      state: r,
    };
  }
  function Ls(t, e) {
    const i = new Cs(t, e),
      n = [],
      r = [];
    return {
      init: function () {
        (n.length = 0), (r.length = 0);
      },
      state: { lightsArray: n, shadowsArray: r, lights: i },
      setupLights: function (t) {
        i.setup(n, t);
      },
      setupLightsView: function (t) {
        i.setupView(n, t);
      },
      pushLight: function (t) {
        n.push(t);
      },
      pushShadow: function (t) {
        r.push(t);
      },
    };
  }
  function Ps(t, e) {
    let i = new WeakMap();
    return {
      get: function (n, r = 0) {
        const s = i.get(n);
        let a;
        return (
          void 0 === s
            ? ((a = new Ls(t, e)), i.set(n, [a]))
            : r >= s.length
            ? ((a = new Ls(t, e)), s.push(a))
            : (a = s[r]),
          a
        );
      },
      dispose: function () {
        i = new WeakMap();
      },
    };
  }
  class Us extends hi {
    constructor(t) {
      super(),
        (this.isMeshDepthMaterial = !0),
        (this.type = "MeshDepthMaterial"),
        (this.depthPacking = 3200),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.depthPacking = t.depthPacking),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        this
      );
    }
  }
  class Ds extends hi {
    constructor(t) {
      super(),
        (this.isMeshDistanceMaterial = !0),
        (this.type = "MeshDistanceMaterial"),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        this
      );
    }
  }
  function Is(t, i, r) {
    let s = new hn();
    const a = new mt(),
      o = new mt(),
      l = new Ot(),
      h = new Us({ depthPacking: 3201 }),
      c = new Ds(),
      d = {},
      u = r.maxTextureSize,
      p = { 0: 1, 1: 0, 2: 2 },
      m = new Ki({
        defines: { VSM_SAMPLES: 8 },
        uniforms: {
          shadow_pass: { value: null },
          resolution: { value: new mt() },
          radius: { value: 4 },
        },
        vertexShader:
          "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
        fragmentShader:
          "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}",
      }),
      f = m.clone();
    f.defines.HORIZONTAL_PASS = 1;
    const g = new Ei();
    g.setAttribute(
      "position",
      new pi(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3)
    );
    const _ = new Hi(g, m),
      v = this;
    (this.enabled = !1),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this.type = e);
    let x = this.type;
    function y(e, n) {
      const r = i.update(_);
      m.defines.VSM_SAMPLES !== e.blurSamples &&
        ((m.defines.VSM_SAMPLES = e.blurSamples),
        (f.defines.VSM_SAMPLES = e.blurSamples),
        (m.needsUpdate = !0),
        (f.needsUpdate = !0)),
        null === e.mapPass && (e.mapPass = new zt(a.x, a.y)),
        (m.uniforms.shadow_pass.value = e.map.texture),
        (m.uniforms.resolution.value = e.mapSize),
        (m.uniforms.radius.value = e.radius),
        t.setRenderTarget(e.mapPass),
        t.clear(),
        t.renderBufferDirect(n, null, r, m, _, null),
        (f.uniforms.shadow_pass.value = e.mapPass.texture),
        (f.uniforms.resolution.value = e.mapSize),
        (f.uniforms.radius.value = e.radius),
        t.setRenderTarget(e.map),
        t.clear(),
        t.renderBufferDirect(n, null, r, f, _, null);
    }
    function S(e, i, r, s) {
      let a = null;
      const o =
        !0 === r.isPointLight
          ? e.customDistanceMaterial
          : e.customDepthMaterial;
      if (void 0 !== o) a = o;
      else if (
        ((a = !0 === r.isPointLight ? c : h),
        (t.localClippingEnabled &&
          !0 === i.clipShadows &&
          Array.isArray(i.clippingPlanes) &&
          0 !== i.clippingPlanes.length) ||
          (i.displacementMap && 0 !== i.displacementScale) ||
          (i.alphaMap && i.alphaTest > 0) ||
          (i.map && i.alphaTest > 0))
      ) {
        const t = a.uuid,
          e = i.uuid;
        let n = d[t];
        void 0 === n && ((n = {}), (d[t] = n));
        let r = n[e];
        void 0 === r && ((r = a.clone()), (n[e] = r)), (a = r);
      }
      return (
        (a.visible = i.visible),
        (a.wireframe = i.wireframe),
        (a.side =
          s === n
            ? null !== i.shadowSide
              ? i.shadowSide
              : i.side
            : null !== i.shadowSide
            ? i.shadowSide
            : p[i.side]),
        (a.alphaMap = i.alphaMap),
        (a.alphaTest = i.alphaTest),
        (a.map = i.map),
        (a.clipShadows = i.clipShadows),
        (a.clippingPlanes = i.clippingPlanes),
        (a.clipIntersection = i.clipIntersection),
        (a.displacementMap = i.displacementMap),
        (a.displacementScale = i.displacementScale),
        (a.displacementBias = i.displacementBias),
        (a.wireframeLinewidth = i.wireframeLinewidth),
        (a.linewidth = i.linewidth),
        !0 === r.isPointLight &&
          !0 === a.isMeshDistanceMaterial &&
          (t.properties.get(a).light = r),
        a
      );
    }
    function b(e, r, a, o, l) {
      if (!1 === e.visible) return;
      if (
        e.layers.test(r.layers) &&
        (e.isMesh || e.isLine || e.isPoints) &&
        (e.castShadow || (e.receiveShadow && l === n)) &&
        (!e.frustumCulled || s.intersectsObject(e))
      ) {
        e.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, e.matrixWorld);
        const n = i.update(e),
          s = e.material;
        if (Array.isArray(s)) {
          const i = n.groups;
          for (let h = 0, c = i.length; h < c; h++) {
            const c = i[h],
              d = s[c.materialIndex];
            if (d && d.visible) {
              const i = S(e, d, o, l);
              e.onBeforeShadow(t, e, r, a, n, i, c),
                t.renderBufferDirect(a, null, n, i, e, c),
                e.onAfterShadow(t, e, r, a, n, i, c);
            }
          }
        } else if (s.visible) {
          const i = S(e, s, o, l);
          e.onBeforeShadow(t, e, r, a, n, i, null),
            t.renderBufferDirect(a, null, n, i, e, null),
            e.onAfterShadow(t, e, r, a, n, i, null);
        }
      }
      const h = e.children;
      for (let t = 0, e = h.length; t < e; t++) b(h[t], r, a, o, l);
    }
    this.render = function (e, i, r) {
      if (!1 === v.enabled) return;
      if (!1 === v.autoUpdate && !1 === v.needsUpdate) return;
      if (0 === e.length) return;
      const h = t.getRenderTarget(),
        c = t.getActiveCubeFace(),
        d = t.getActiveMipmapLevel(),
        p = t.state;
      p.setBlending(0),
        p.buffers.color.setClear(1, 1, 1, 1),
        p.buffers.depth.setTest(!0),
        p.setScissorTest(!1);
      const m = x !== n && this.type === n,
        f = x === n && this.type !== n;
      for (let h = 0, c = e.length; h < c; h++) {
        const c = e[h],
          d = c.shadow;
        if (void 0 === d) {
          console.warn("THREE.WebGLShadowMap:", c, "has no shadow.");
          continue;
        }
        if (!1 === d.autoUpdate && !1 === d.needsUpdate) continue;
        a.copy(d.mapSize);
        const g = d.getFrameExtents();
        if (
          (a.multiply(g),
          o.copy(d.mapSize),
          (a.x > u || a.y > u) &&
            (a.x > u &&
              ((o.x = Math.floor(u / g.x)),
              (a.x = o.x * g.x),
              (d.mapSize.x = o.x)),
            a.y > u &&
              ((o.y = Math.floor(u / g.y)),
              (a.y = o.y * g.y),
              (d.mapSize.y = o.y))),
          null === d.map || !0 === m || !0 === f)
        ) {
          const t = this.type !== n ? { minFilter: M, magFilter: M } : {};
          null !== d.map && d.map.dispose(),
            (d.map = new zt(a.x, a.y, t)),
            (d.map.texture.name = c.name + ".shadowMap"),
            d.camera.updateProjectionMatrix();
        }
        t.setRenderTarget(d.map), t.clear();
        const _ = d.getViewportCount();
        for (let t = 0; t < _; t++) {
          const e = d.getViewport(t);
          l.set(o.x * e.x, o.y * e.y, o.x * e.z, o.y * e.w),
            p.viewport(l),
            d.updateMatrices(c, t),
            (s = d.getFrustum()),
            b(i, r, d.camera, c, this.type);
        }
        !0 !== d.isPointLightShadow && this.type === n && y(d, r),
          (d.needsUpdate = !1);
      }
      (x = this.type), (v.needsUpdate = !1), t.setRenderTarget(h, c, d);
    };
  }
  function Ns(t, e, i) {
    const n = i.isWebGL2,
      s = new (function () {
        let e = !1;
        const i = new Ot();
        let n = null;
        const r = new Ot(0, 0, 0, 0);
        return {
          setMask: function (i) {
            n === i || e || (t.colorMask(i, i, i, i), (n = i));
          },
          setLocked: function (t) {
            e = t;
          },
          setClear: function (e, n, s, a, o) {
            !0 === o && ((e *= a), (n *= a), (s *= a)),
              i.set(e, n, s, a),
              !1 === r.equals(i) && (t.clearColor(e, n, s, a), r.copy(i));
          },
          reset: function () {
            (e = !1), (n = null), r.set(-1, 0, 0, 0);
          },
        };
      })(),
      a = new (function () {
        let e = !1,
          i = null,
          n = null,
          r = null;
        return {
          setTest: function (e) {
            e ? G(t.DEPTH_TEST) : W(t.DEPTH_TEST);
          },
          setMask: function (n) {
            i === n || e || (t.depthMask(n), (i = n));
          },
          setFunc: function (e) {
            if (n !== e) {
              switch (e) {
                case 0:
                  t.depthFunc(t.NEVER);
                  break;
                case 1:
                  t.depthFunc(t.ALWAYS);
                  break;
                case 2:
                  t.depthFunc(t.LESS);
                  break;
                case 3:
                default:
                  t.depthFunc(t.LEQUAL);
                  break;
                case 4:
                  t.depthFunc(t.EQUAL);
                  break;
                case 5:
                  t.depthFunc(t.GEQUAL);
                  break;
                case 6:
                  t.depthFunc(t.GREATER);
                  break;
                case 7:
                  t.depthFunc(t.NOTEQUAL);
              }
              n = e;
            }
          },
          setLocked: function (t) {
            e = t;
          },
          setClear: function (e) {
            r !== e && (t.clearDepth(e), (r = e));
          },
          reset: function () {
            (e = !1), (i = null), (n = null), (r = null);
          },
        };
      })(),
      o = new (function () {
        let e = !1,
          i = null,
          n = null,
          r = null,
          s = null,
          a = null,
          o = null,
          l = null,
          h = null;
        return {
          setTest: function (i) {
            e || (i ? G(t.STENCIL_TEST) : W(t.STENCIL_TEST));
          },
          setMask: function (n) {
            i === n || e || (t.stencilMask(n), (i = n));
          },
          setFunc: function (e, i, a) {
            (n === e && r === i && s === a) ||
              (t.stencilFunc(e, i, a), (n = e), (r = i), (s = a));
          },
          setOp: function (e, i, n) {
            (a === e && o === i && l === n) ||
              (t.stencilOp(e, i, n), (a = e), (o = i), (l = n));
          },
          setLocked: function (t) {
            e = t;
          },
          setClear: function (e) {
            h !== e && (t.clearStencil(e), (h = e));
          },
          reset: function () {
            (e = !1),
              (i = null),
              (n = null),
              (r = null),
              (s = null),
              (a = null),
              (o = null),
              (l = null),
              (h = null);
          },
        };
      })(),
      l = new WeakMap(),
      h = new WeakMap();
    let c = {},
      d = {},
      u = new WeakMap(),
      p = [],
      m = null,
      f = !1,
      g = null,
      _ = null,
      v = null,
      x = null,
      y = null,
      M = null,
      S = null,
      b = new ai(0, 0, 0),
      E = 0,
      T = !1,
      w = null,
      A = null,
      R = null,
      C = null,
      L = null;
    const P = t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    let U = !1,
      D = 0;
    const I = t.getParameter(t.VERSION);
    -1 !== I.indexOf("WebGL")
      ? ((D = parseFloat(/^WebGL (\d)/.exec(I)[1])), (U = D >= 1))
      : -1 !== I.indexOf("OpenGL ES") &&
        ((D = parseFloat(/^OpenGL ES (\d)/.exec(I)[1])), (U = D >= 2));
    let N = null,
      O = {};
    const F = t.getParameter(t.SCISSOR_BOX),
      z = t.getParameter(t.VIEWPORT),
      B = new Ot().fromArray(F),
      k = new Ot().fromArray(z);
    function V(e, i, r, s) {
      const a = new Uint8Array(4),
        o = t.createTexture();
      t.bindTexture(e, o),
        t.texParameteri(e, t.TEXTURE_MIN_FILTER, t.NEAREST),
        t.texParameteri(e, t.TEXTURE_MAG_FILTER, t.NEAREST);
      for (let o = 0; o < r; o++)
        !n || (e !== t.TEXTURE_3D && e !== t.TEXTURE_2D_ARRAY)
          ? t.texImage2D(i + o, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, a)
          : t.texImage3D(i, 0, t.RGBA, 1, 1, s, 0, t.RGBA, t.UNSIGNED_BYTE, a);
      return o;
    }
    const H = {};
    function G(e) {
      !0 !== c[e] && (t.enable(e), (c[e] = !0));
    }
    function W(e) {
      !1 !== c[e] && (t.disable(e), (c[e] = !1));
    }
    (H[t.TEXTURE_2D] = V(t.TEXTURE_2D, t.TEXTURE_2D, 1)),
      (H[t.TEXTURE_CUBE_MAP] = V(
        t.TEXTURE_CUBE_MAP,
        t.TEXTURE_CUBE_MAP_POSITIVE_X,
        6
      )),
      n &&
        ((H[t.TEXTURE_2D_ARRAY] = V(
          t.TEXTURE_2D_ARRAY,
          t.TEXTURE_2D_ARRAY,
          1,
          1
        )),
        (H[t.TEXTURE_3D] = V(t.TEXTURE_3D, t.TEXTURE_3D, 1, 1))),
      s.setClear(0, 0, 0, 1),
      a.setClear(1),
      o.setClear(0),
      G(t.DEPTH_TEST),
      a.setFunc(3),
      Y(!1),
      K(1),
      G(t.CULL_FACE),
      q(0);
    const j = {
      [r]: t.FUNC_ADD,
      101: t.FUNC_SUBTRACT,
      102: t.FUNC_REVERSE_SUBTRACT,
    };
    if (n) (j[103] = t.MIN), (j[104] = t.MAX);
    else {
      const t = e.get("EXT_blend_minmax");
      null !== t && ((j[103] = t.MIN_EXT), (j[104] = t.MAX_EXT));
    }
    const X = {
      200: t.ZERO,
      201: t.ONE,
      202: t.SRC_COLOR,
      204: t.SRC_ALPHA,
      210: t.SRC_ALPHA_SATURATE,
      208: t.DST_COLOR,
      206: t.DST_ALPHA,
      203: t.ONE_MINUS_SRC_COLOR,
      205: t.ONE_MINUS_SRC_ALPHA,
      209: t.ONE_MINUS_DST_COLOR,
      207: t.ONE_MINUS_DST_ALPHA,
      211: t.CONSTANT_COLOR,
      212: t.ONE_MINUS_CONSTANT_COLOR,
      213: t.CONSTANT_ALPHA,
      214: t.ONE_MINUS_CONSTANT_ALPHA,
    };
    function q(e, i, n, s, a, o, l, h, c, d) {
      if (0 !== e) {
        if ((!1 === f && (G(t.BLEND), (f = !0)), 5 === e))
          (a = a || i),
            (o = o || n),
            (l = l || s),
            (i === _ && a === y) ||
              (t.blendEquationSeparate(j[i], j[a]), (_ = i), (y = a)),
            (n === v && s === x && o === M && l === S) ||
              (t.blendFuncSeparate(X[n], X[s], X[o], X[l]),
              (v = n),
              (x = s),
              (M = o),
              (S = l)),
            (!1 !== h.equals(b) && c === E) ||
              (t.blendColor(h.r, h.g, h.b, c), b.copy(h), (E = c)),
            (g = e),
            (T = !1);
        else if (e !== g || d !== T) {
          if (
            ((_ === r && y === r) ||
              (t.blendEquation(t.FUNC_ADD), (_ = r), (y = r)),
            d)
          )
            switch (e) {
              case 1:
                t.blendFuncSeparate(
                  t.ONE,
                  t.ONE_MINUS_SRC_ALPHA,
                  t.ONE,
                  t.ONE_MINUS_SRC_ALPHA
                );
                break;
              case 2:
                t.blendFunc(t.ONE, t.ONE);
                break;
              case 3:
                t.blendFuncSeparate(
                  t.ZERO,
                  t.ONE_MINUS_SRC_COLOR,
                  t.ZERO,
                  t.ONE
                );
                break;
              case 4:
                t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", e);
            }
          else
            switch (e) {
              case 1:
                t.blendFuncSeparate(
                  t.SRC_ALPHA,
                  t.ONE_MINUS_SRC_ALPHA,
                  t.ONE,
                  t.ONE_MINUS_SRC_ALPHA
                );
                break;
              case 2:
                t.blendFunc(t.SRC_ALPHA, t.ONE);
                break;
              case 3:
                t.blendFuncSeparate(
                  t.ZERO,
                  t.ONE_MINUS_SRC_COLOR,
                  t.ZERO,
                  t.ONE
                );
                break;
              case 4:
                t.blendFunc(t.ZERO, t.SRC_COLOR);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", e);
            }
          (v = null),
            (x = null),
            (M = null),
            (S = null),
            b.set(0, 0, 0),
            (E = 0),
            (g = e),
            (T = d);
        }
      } else !0 === f && (W(t.BLEND), (f = !1));
    }
    function Y(e) {
      w !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW), (w = e));
    }
    function K(e) {
      0 !== e
        ? (G(t.CULL_FACE),
          e !== A &&
            (1 === e
              ? t.cullFace(t.BACK)
              : 2 === e
              ? t.cullFace(t.FRONT)
              : t.cullFace(t.FRONT_AND_BACK)))
        : W(t.CULL_FACE),
        (A = e);
    }
    function Z(e, i, n) {
      e
        ? (G(t.POLYGON_OFFSET_FILL),
          (C === i && L === n) || (t.polygonOffset(i, n), (C = i), (L = n)))
        : W(t.POLYGON_OFFSET_FILL);
    }
    return {
      buffers: { color: s, depth: a, stencil: o },
      enable: G,
      disable: W,
      bindFramebuffer: function (e, i) {
        return (
          d[e] !== i &&
          (t.bindFramebuffer(e, i),
          (d[e] = i),
          n &&
            (e === t.DRAW_FRAMEBUFFER && (d[t.FRAMEBUFFER] = i),
            e === t.FRAMEBUFFER && (d[t.DRAW_FRAMEBUFFER] = i)),
          !0)
        );
      },
      drawBuffers: function (n, r) {
        let s = p,
          a = !1;
        if (n)
          if (
            ((s = u.get(r)),
            void 0 === s && ((s = []), u.set(r, s)),
            n.isWebGLMultipleRenderTargets)
          ) {
            const e = n.texture;
            if (s.length !== e.length || s[0] !== t.COLOR_ATTACHMENT0) {
              for (let i = 0, n = e.length; i < n; i++)
                s[i] = t.COLOR_ATTACHMENT0 + i;
              (s.length = e.length), (a = !0);
            }
          } else
            s[0] !== t.COLOR_ATTACHMENT0 &&
              ((s[0] = t.COLOR_ATTACHMENT0), (a = !0));
        else s[0] !== t.BACK && ((s[0] = t.BACK), (a = !0));
        a &&
          (i.isWebGL2
            ? t.drawBuffers(s)
            : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(s));
      },
      useProgram: function (e) {
        return m !== e && (t.useProgram(e), (m = e), !0);
      },
      setBlending: q,
      setMaterial: function (e, i) {
        2 === e.side ? W(t.CULL_FACE) : G(t.CULL_FACE);
        let n = 1 === e.side;
        i && (n = !n),
          Y(n),
          1 === e.blending && !1 === e.transparent
            ? q(0)
            : q(
                e.blending,
                e.blendEquation,
                e.blendSrc,
                e.blendDst,
                e.blendEquationAlpha,
                e.blendSrcAlpha,
                e.blendDstAlpha,
                e.blendColor,
                e.blendAlpha,
                e.premultipliedAlpha
              ),
          a.setFunc(e.depthFunc),
          a.setTest(e.depthTest),
          a.setMask(e.depthWrite),
          s.setMask(e.colorWrite);
        const r = e.stencilWrite;
        o.setTest(r),
          r &&
            (o.setMask(e.stencilWriteMask),
            o.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask),
            o.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)),
          Z(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits),
          !0 === e.alphaToCoverage
            ? G(t.SAMPLE_ALPHA_TO_COVERAGE)
            : W(t.SAMPLE_ALPHA_TO_COVERAGE);
      },
      setFlipSided: Y,
      setCullFace: K,
      setLineWidth: function (e) {
        e !== R && (U && t.lineWidth(e), (R = e));
      },
      setPolygonOffset: Z,
      setScissorTest: function (e) {
        e ? G(t.SCISSOR_TEST) : W(t.SCISSOR_TEST);
      },
      activeTexture: function (e) {
        void 0 === e && (e = t.TEXTURE0 + P - 1),
          N !== e && (t.activeTexture(e), (N = e));
      },
      bindTexture: function (e, i, n) {
        void 0 === n && (n = null === N ? t.TEXTURE0 + P - 1 : N);
        let r = O[n];
        void 0 === r && ((r = { type: void 0, texture: void 0 }), (O[n] = r)),
          (r.type === e && r.texture === i) ||
            (N !== n && (t.activeTexture(n), (N = n)),
            t.bindTexture(e, i || H[e]),
            (r.type = e),
            (r.texture = i));
      },
      unbindTexture: function () {
        const e = O[N];
        void 0 !== e &&
          void 0 !== e.type &&
          (t.bindTexture(e.type, null),
          (e.type = void 0),
          (e.texture = void 0));
      },
      compressedTexImage2D: function () {
        try {
          t.compressedTexImage2D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      compressedTexImage3D: function () {
        try {
          t.compressedTexImage3D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage2D: function () {
        try {
          t.texImage2D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage3D: function () {
        try {
          t.texImage3D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      updateUBOMapping: function (e, i) {
        let n = h.get(i);
        void 0 === n && ((n = new WeakMap()), h.set(i, n));
        let r = n.get(e);
        void 0 === r && ((r = t.getUniformBlockIndex(i, e.name)), n.set(e, r));
      },
      uniformBlockBinding: function (e, i) {
        const n = h.get(i).get(e);
        l.get(i) !== n &&
          (t.uniformBlockBinding(i, n, e.__bindingPointIndex), l.set(i, n));
      },
      texStorage2D: function () {
        try {
          t.texStorage2D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texStorage3D: function () {
        try {
          t.texStorage3D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texSubImage2D: function () {
        try {
          t.texSubImage2D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texSubImage3D: function () {
        try {
          t.texSubImage3D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      compressedTexSubImage2D: function () {
        try {
          t.compressedTexSubImage2D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      compressedTexSubImage3D: function () {
        try {
          t.compressedTexSubImage3D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      scissor: function (e) {
        !1 === B.equals(e) && (t.scissor(e.x, e.y, e.z, e.w), B.copy(e));
      },
      viewport: function (e) {
        !1 === k.equals(e) && (t.viewport(e.x, e.y, e.z, e.w), k.copy(e));
      },
      reset: function () {
        t.disable(t.BLEND),
          t.disable(t.CULL_FACE),
          t.disable(t.DEPTH_TEST),
          t.disable(t.POLYGON_OFFSET_FILL),
          t.disable(t.SCISSOR_TEST),
          t.disable(t.STENCIL_TEST),
          t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),
          t.blendEquation(t.FUNC_ADD),
          t.blendFunc(t.ONE, t.ZERO),
          t.blendFuncSeparate(t.ONE, t.ZERO, t.ONE, t.ZERO),
          t.blendColor(0, 0, 0, 0),
          t.colorMask(!0, !0, !0, !0),
          t.clearColor(0, 0, 0, 0),
          t.depthMask(!0),
          t.depthFunc(t.LESS),
          t.clearDepth(1),
          t.stencilMask(4294967295),
          t.stencilFunc(t.ALWAYS, 0, 4294967295),
          t.stencilOp(t.KEEP, t.KEEP, t.KEEP),
          t.clearStencil(0),
          t.cullFace(t.BACK),
          t.frontFace(t.CCW),
          t.polygonOffset(0, 0),
          t.activeTexture(t.TEXTURE0),
          t.bindFramebuffer(t.FRAMEBUFFER, null),
          !0 === n &&
            (t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null),
            t.bindFramebuffer(t.READ_FRAMEBUFFER, null)),
          t.useProgram(null),
          t.lineWidth(1),
          t.scissor(0, 0, t.canvas.width, t.canvas.height),
          t.viewport(0, 0, t.canvas.width, t.canvas.height),
          (c = {}),
          (N = null),
          (O = {}),
          (d = {}),
          (u = new WeakMap()),
          (p = []),
          (m = null),
          (f = !1),
          (g = null),
          (_ = null),
          (v = null),
          (x = null),
          (y = null),
          (M = null),
          (S = null),
          (b = new ai(0, 0, 0)),
          (E = 0),
          (T = !1),
          (w = null),
          (A = null),
          (R = null),
          (C = null),
          (L = null),
          B.set(0, 0, t.canvas.width, t.canvas.height),
          k.set(0, 0, t.canvas.width, t.canvas.height),
          s.reset(),
          a.reset(),
          o.reset();
      },
    };
  }
  function Os(t, e, i, n, r, s, a) {
    const o = r.isWebGL2,
      l = r.maxTextures,
      h = r.maxCubemapSize,
      c = r.maxTextureSize,
      d = r.maxSamples,
      u = e.has("WEBGL_multisampled_render_to_texture")
        ? e.get("WEBGL_multisampled_render_to_texture")
        : null,
      p =
        "undefined" != typeof navigator &&
        /OculusBrowser/g.test(navigator.userAgent),
      m = new WeakMap();
    let f;
    const g = new WeakMap();
    let _ = !1;
    try {
      _ =
        "undefined" != typeof OffscreenCanvas &&
        null !== new OffscreenCanvas(1, 1).getContext("2d");
    } catch (t) {}
    function I(t, e) {
      return _ ? new OffscreenCanvas(t, e) : vt("canvas");
    }
    function N(t, e, i, n) {
      let r = 1;
      if (
        ((t.width > n || t.height > n) && (r = n / Math.max(t.width, t.height)),
        r < 1 || !0 === e)
      ) {
        if (
          ("undefined" != typeof HTMLImageElement &&
            t instanceof HTMLImageElement) ||
          ("undefined" != typeof HTMLCanvasElement &&
            t instanceof HTMLCanvasElement) ||
          ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
        ) {
          const n = e ? dt : Math.floor,
            s = n(r * t.width),
            a = n(r * t.height);
          void 0 === f && (f = I(s, a));
          const o = i ? I(s, a) : f;
          return (
            (o.width = s),
            (o.height = a),
            o.getContext("2d").drawImage(t, 0, 0, s, a),
            console.warn(
              "THREE.WebGLRenderer: Texture has been resized from (" +
                t.width +
                "x" +
                t.height +
                ") to (" +
                s +
                "x" +
                a +
                ")."
            ),
            o
          );
        }
        return (
          "data" in t &&
            console.warn(
              "THREE.WebGLRenderer: Image in DataTexture is too big (" +
                t.width +
                "x" +
                t.height +
                ")."
            ),
          t
        );
      }
      return t;
    }
    function O(t) {
      return ct(t.width) && ct(t.height);
    }
    function F(t, e) {
      return t.generateMipmaps && e && t.minFilter !== M && t.minFilter !== b;
    }
    function z(e) {
      t.generateMipmap(e);
    }
    function B(i, n, r, s, a = !1) {
      if (!1 === o) return n;
      if (null !== i) {
        if (void 0 !== t[i]) return t[i];
        console.warn(
          "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
            i +
            "'"
        );
      }
      let l = n;
      if (
        (n === t.RED &&
          (r === t.FLOAT && (l = t.R32F),
          r === t.HALF_FLOAT && (l = t.R16F),
          r === t.UNSIGNED_BYTE && (l = t.R8)),
        n === t.RED_INTEGER &&
          (r === t.UNSIGNED_BYTE && (l = t.R8UI),
          r === t.UNSIGNED_SHORT && (l = t.R16UI),
          r === t.UNSIGNED_INT && (l = t.R32UI),
          r === t.BYTE && (l = t.R8I),
          r === t.SHORT && (l = t.R16I),
          r === t.INT && (l = t.R32I)),
        n === t.RG &&
          (r === t.FLOAT && (l = t.RG32F),
          r === t.HALF_FLOAT && (l = t.RG16F),
          r === t.UNSIGNED_BYTE && (l = t.RG8)),
        n === t.RGBA)
      ) {
        const e = a ? Y : wt.getTransfer(s);
        r === t.FLOAT && (l = t.RGBA32F),
          r === t.HALF_FLOAT && (l = t.RGBA16F),
          r === t.UNSIGNED_BYTE && (l = e === K ? t.SRGB8_ALPHA8 : t.RGBA8),
          r === t.UNSIGNED_SHORT_4_4_4_4 && (l = t.RGBA4),
          r === t.UNSIGNED_SHORT_5_5_5_1 && (l = t.RGB5_A1);
      }
      return (
        (l !== t.R16F &&
          l !== t.R32F &&
          l !== t.RG16F &&
          l !== t.RG32F &&
          l !== t.RGBA16F &&
          l !== t.RGBA32F) ||
          e.get("EXT_color_buffer_float"),
        l
      );
    }
    function k(t, e, i) {
      return !0 === F(t, i) ||
        (t.isFramebufferTexture && t.minFilter !== M && t.minFilter !== b)
        ? Math.log2(Math.max(e.width, e.height)) + 1
        : void 0 !== t.mipmaps && t.mipmaps.length > 0
        ? t.mipmaps.length
        : t.isCompressedTexture && Array.isArray(t.image)
        ? e.mipmaps.length
        : 1;
    }
    function V(e) {
      return e === M || 1004 === e || e === S ? t.NEAREST : t.LINEAR;
    }
    function H(t) {
      const e = t.target;
      e.removeEventListener("dispose", H),
        (function (t) {
          const e = n.get(t);
          if (void 0 === e.__webglInit) return;
          const i = t.source,
            r = g.get(i);
          if (r) {
            const n = r[e.__cacheKey];
            n.usedTimes--,
              0 === n.usedTimes && X(t),
              0 === Object.keys(r).length && g.delete(i);
          }
          n.remove(t);
        })(e),
        e.isVideoTexture && m.delete(e);
    }
    function W(e) {
      const i = e.target;
      i.removeEventListener("dispose", W),
        (function (e) {
          const i = e.texture,
            r = n.get(e),
            s = n.get(i);
          if (
            (void 0 !== s.__webglTexture &&
              (t.deleteTexture(s.__webglTexture), a.memory.textures--),
            e.depthTexture && e.depthTexture.dispose(),
            e.isWebGLCubeRenderTarget)
          )
            for (let e = 0; e < 6; e++) {
              if (Array.isArray(r.__webglFramebuffer[e]))
                for (let i = 0; i < r.__webglFramebuffer[e].length; i++)
                  t.deleteFramebuffer(r.__webglFramebuffer[e][i]);
              else t.deleteFramebuffer(r.__webglFramebuffer[e]);
              r.__webglDepthbuffer &&
                t.deleteRenderbuffer(r.__webglDepthbuffer[e]);
            }
          else {
            if (Array.isArray(r.__webglFramebuffer))
              for (let e = 0; e < r.__webglFramebuffer.length; e++)
                t.deleteFramebuffer(r.__webglFramebuffer[e]);
            else t.deleteFramebuffer(r.__webglFramebuffer);
            if (
              (r.__webglDepthbuffer &&
                t.deleteRenderbuffer(r.__webglDepthbuffer),
              r.__webglMultisampledFramebuffer &&
                t.deleteFramebuffer(r.__webglMultisampledFramebuffer),
              r.__webglColorRenderbuffer)
            )
              for (let e = 0; e < r.__webglColorRenderbuffer.length; e++)
                r.__webglColorRenderbuffer[e] &&
                  t.deleteRenderbuffer(r.__webglColorRenderbuffer[e]);
            r.__webglDepthRenderbuffer &&
              t.deleteRenderbuffer(r.__webglDepthRenderbuffer);
          }
          if (e.isWebGLMultipleRenderTargets)
            for (let e = 0, r = i.length; e < r; e++) {
              const r = n.get(i[e]);
              r.__webglTexture &&
                (t.deleteTexture(r.__webglTexture), a.memory.textures--),
                n.remove(i[e]);
            }
          n.remove(i), n.remove(e);
        })(i);
    }
    function X(e) {
      const i = n.get(e);
      t.deleteTexture(i.__webglTexture);
      const r = e.source;
      delete g.get(r)[i.__cacheKey], a.memory.textures--;
    }
    let q = 0;
    function Z(e, r) {
      const s = n.get(e);
      if (
        (e.isVideoTexture &&
          (function (t) {
            const e = a.render.frame;
            m.get(t) !== e && (m.set(t, e), t.update());
          })(e),
        !1 === e.isRenderTargetTexture &&
          e.version > 0 &&
          s.__version !== e.version)
      ) {
        const t = e.image;
        if (null === t)
          console.warn(
            "THREE.WebGLRenderer: Texture marked for update but no image data found."
          );
        else {
          if (!1 !== t.complete) return void nt(s, e, r);
          console.warn(
            "THREE.WebGLRenderer: Texture marked for update but image is incomplete"
          );
        }
      }
      i.bindTexture(t.TEXTURE_2D, s.__webglTexture, t.TEXTURE0 + r);
    }
    const J = { [v]: t.REPEAT, [x]: t.CLAMP_TO_EDGE, [y]: t.MIRRORED_REPEAT },
      Q = {
        [M]: t.NEAREST,
        1004: t.NEAREST_MIPMAP_NEAREST,
        [S]: t.NEAREST_MIPMAP_LINEAR,
        [b]: t.LINEAR,
        1007: t.LINEAR_MIPMAP_NEAREST,
        [E]: t.LINEAR_MIPMAP_LINEAR,
      },
      $ = {
        512: t.NEVER,
        519: t.ALWAYS,
        513: t.LESS,
        515: t.LEQUAL,
        514: t.EQUAL,
        518: t.GEQUAL,
        516: t.GREATER,
        517: t.NOTEQUAL,
      };
    function et(i, s, a) {
      if (
        (a
          ? (t.texParameteri(i, t.TEXTURE_WRAP_S, J[s.wrapS]),
            t.texParameteri(i, t.TEXTURE_WRAP_T, J[s.wrapT]),
            (i !== t.TEXTURE_3D && i !== t.TEXTURE_2D_ARRAY) ||
              t.texParameteri(i, t.TEXTURE_WRAP_R, J[s.wrapR]),
            t.texParameteri(i, t.TEXTURE_MAG_FILTER, Q[s.magFilter]),
            t.texParameteri(i, t.TEXTURE_MIN_FILTER, Q[s.minFilter]))
          : (t.texParameteri(i, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
            t.texParameteri(i, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
            (i !== t.TEXTURE_3D && i !== t.TEXTURE_2D_ARRAY) ||
              t.texParameteri(i, t.TEXTURE_WRAP_R, t.CLAMP_TO_EDGE),
            (s.wrapS === x && s.wrapT === x) ||
              console.warn(
                "THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."
              ),
            t.texParameteri(i, t.TEXTURE_MAG_FILTER, V(s.magFilter)),
            t.texParameteri(i, t.TEXTURE_MIN_FILTER, V(s.minFilter)),
            s.minFilter !== M &&
              s.minFilter !== b &&
              console.warn(
                "THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."
              )),
        s.compareFunction &&
          (t.texParameteri(i, t.TEXTURE_COMPARE_MODE, t.COMPARE_REF_TO_TEXTURE),
          t.texParameteri(i, t.TEXTURE_COMPARE_FUNC, $[s.compareFunction])),
        !0 === e.has("EXT_texture_filter_anisotropic"))
      ) {
        const a = e.get("EXT_texture_filter_anisotropic");
        if (s.magFilter === M) return;
        if (s.minFilter !== S && s.minFilter !== E) return;
        if (s.type === R && !1 === e.has("OES_texture_float_linear")) return;
        if (
          !1 === o &&
          s.type === C &&
          !1 === e.has("OES_texture_half_float_linear")
        )
          return;
        (s.anisotropy > 1 || n.get(s).__currentAnisotropy) &&
          (t.texParameterf(
            i,
            a.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(s.anisotropy, r.getMaxAnisotropy())
          ),
          (n.get(s).__currentAnisotropy = s.anisotropy));
      }
    }
    function it(e, i) {
      let n = !1;
      void 0 === e.__webglInit &&
        ((e.__webglInit = !0), i.addEventListener("dispose", H));
      const r = i.source;
      let s = g.get(r);
      void 0 === s && ((s = {}), g.set(r, s));
      const o = (function (t) {
        const e = [];
        return (
          e.push(t.wrapS),
          e.push(t.wrapT),
          e.push(t.wrapR || 0),
          e.push(t.magFilter),
          e.push(t.minFilter),
          e.push(t.anisotropy),
          e.push(t.internalFormat),
          e.push(t.format),
          e.push(t.type),
          e.push(t.generateMipmaps),
          e.push(t.premultiplyAlpha),
          e.push(t.flipY),
          e.push(t.unpackAlignment),
          e.push(t.colorSpace),
          e.join()
        );
      })(i);
      if (o !== e.__cacheKey) {
        void 0 === s[o] &&
          ((s[o] = { texture: t.createTexture(), usedTimes: 0 }),
          a.memory.textures++,
          (n = !0)),
          s[o].usedTimes++;
        const r = s[e.__cacheKey];
        void 0 !== r &&
          (s[e.__cacheKey].usedTimes--, 0 === r.usedTimes && X(i)),
          (e.__cacheKey = o),
          (e.__webglTexture = s[o].texture);
      }
      return n;
    }
    function nt(e, r, a) {
      let l = t.TEXTURE_2D;
      (r.isDataArrayTexture || r.isCompressedArrayTexture) &&
        (l = t.TEXTURE_2D_ARRAY),
        r.isData3DTexture && (l = t.TEXTURE_3D);
      const h = it(e, r),
        d = r.source;
      i.bindTexture(l, e.__webglTexture, t.TEXTURE0 + a);
      const u = n.get(d);
      if (d.version !== u.__version || !0 === h) {
        i.activeTexture(t.TEXTURE0 + a);
        const e = wt.getPrimaries(wt.workingColorSpace),
          n = r.colorSpace === G ? null : wt.getPrimaries(r.colorSpace),
          p = r.colorSpace === G || e === n ? t.NONE : t.BROWSER_DEFAULT_WEBGL;
        t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, r.flipY),
          t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.premultiplyAlpha),
          t.pixelStorei(t.UNPACK_ALIGNMENT, r.unpackAlignment),
          t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, p);
        const m =
          (function (t) {
            return (
              !o &&
              (t.wrapS !== x ||
                t.wrapT !== x ||
                (t.minFilter !== M && t.minFilter !== b))
            );
          })(r) && !1 === O(r.image);
        let f = N(r.image, m, !1, c);
        f = ht(r, f);
        const g = O(f) || o,
          _ = s.convert(r.format, r.colorSpace);
        let v,
          y = s.convert(r.type),
          S = B(r.internalFormat, _, y, r.colorSpace, r.isVideoTexture);
        et(l, r, g);
        const E = r.mipmaps,
          T = o && !0 !== r.isVideoTexture && 36196 !== S,
          C = void 0 === u.__version || !0 === h,
          I = k(r, f, g);
        if (r.isDepthTexture)
          (S = t.DEPTH_COMPONENT),
            o
              ? (S =
                  r.type === R
                    ? t.DEPTH_COMPONENT32F
                    : r.type === A
                    ? t.DEPTH_COMPONENT24
                    : r.type === L
                    ? t.DEPTH24_STENCIL8
                    : t.DEPTH_COMPONENT16)
              : r.type === R &&
                console.error(
                  "WebGLRenderer: Floating point depth texture requires WebGL2."
                ),
            r.format === U &&
              S === t.DEPTH_COMPONENT &&
              r.type !== w &&
              r.type !== A &&
              (console.warn(
                "THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."
              ),
              (r.type = A),
              (y = s.convert(r.type))),
            r.format === D &&
              S === t.DEPTH_COMPONENT &&
              ((S = t.DEPTH_STENCIL),
              r.type !== L &&
                (console.warn(
                  "THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."
                ),
                (r.type = L),
                (y = s.convert(r.type)))),
            C &&
              (T
                ? i.texStorage2D(t.TEXTURE_2D, 1, S, f.width, f.height)
                : i.texImage2D(
                    t.TEXTURE_2D,
                    0,
                    S,
                    f.width,
                    f.height,
                    0,
                    _,
                    y,
                    null
                  ));
        else if (r.isDataTexture)
          if (E.length > 0 && g) {
            T &&
              C &&
              i.texStorage2D(t.TEXTURE_2D, I, S, E[0].width, E[0].height);
            for (let e = 0, n = E.length; e < n; e++)
              (v = E[e]),
                T
                  ? i.texSubImage2D(
                      t.TEXTURE_2D,
                      e,
                      0,
                      0,
                      v.width,
                      v.height,
                      _,
                      y,
                      v.data
                    )
                  : i.texImage2D(
                      t.TEXTURE_2D,
                      e,
                      S,
                      v.width,
                      v.height,
                      0,
                      _,
                      y,
                      v.data
                    );
            r.generateMipmaps = !1;
          } else
            T
              ? (C && i.texStorage2D(t.TEXTURE_2D, I, S, f.width, f.height),
                i.texSubImage2D(
                  t.TEXTURE_2D,
                  0,
                  0,
                  0,
                  f.width,
                  f.height,
                  _,
                  y,
                  f.data
                ))
              : i.texImage2D(
                  t.TEXTURE_2D,
                  0,
                  S,
                  f.width,
                  f.height,
                  0,
                  _,
                  y,
                  f.data
                );
        else if (r.isCompressedTexture)
          if (r.isCompressedArrayTexture) {
            T &&
              C &&
              i.texStorage3D(
                t.TEXTURE_2D_ARRAY,
                I,
                S,
                E[0].width,
                E[0].height,
                f.depth
              );
            for (let e = 0, n = E.length; e < n; e++)
              (v = E[e]),
                r.format !== P
                  ? null !== _
                    ? T
                      ? i.compressedTexSubImage3D(
                          t.TEXTURE_2D_ARRAY,
                          e,
                          0,
                          0,
                          0,
                          v.width,
                          v.height,
                          f.depth,
                          _,
                          v.data,
                          0,
                          0
                        )
                      : i.compressedTexImage3D(
                          t.TEXTURE_2D_ARRAY,
                          e,
                          S,
                          v.width,
                          v.height,
                          f.depth,
                          0,
                          v.data,
                          0,
                          0
                        )
                    : console.warn(
                        "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"
                      )
                  : T
                  ? i.texSubImage3D(
                      t.TEXTURE_2D_ARRAY,
                      e,
                      0,
                      0,
                      0,
                      v.width,
                      v.height,
                      f.depth,
                      _,
                      y,
                      v.data
                    )
                  : i.texImage3D(
                      t.TEXTURE_2D_ARRAY,
                      e,
                      S,
                      v.width,
                      v.height,
                      f.depth,
                      0,
                      _,
                      y,
                      v.data
                    );
          } else {
            T &&
              C &&
              i.texStorage2D(t.TEXTURE_2D, I, S, E[0].width, E[0].height);
            for (let e = 0, n = E.length; e < n; e++)
              (v = E[e]),
                r.format !== P
                  ? null !== _
                    ? T
                      ? i.compressedTexSubImage2D(
                          t.TEXTURE_2D,
                          e,
                          0,
                          0,
                          v.width,
                          v.height,
                          _,
                          v.data
                        )
                      : i.compressedTexImage2D(
                          t.TEXTURE_2D,
                          e,
                          S,
                          v.width,
                          v.height,
                          0,
                          v.data
                        )
                    : console.warn(
                        "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"
                      )
                  : T
                  ? i.texSubImage2D(
                      t.TEXTURE_2D,
                      e,
                      0,
                      0,
                      v.width,
                      v.height,
                      _,
                      y,
                      v.data
                    )
                  : i.texImage2D(
                      t.TEXTURE_2D,
                      e,
                      S,
                      v.width,
                      v.height,
                      0,
                      _,
                      y,
                      v.data
                    );
          }
        else if (r.isDataArrayTexture)
          T
            ? (C &&
                i.texStorage3D(
                  t.TEXTURE_2D_ARRAY,
                  I,
                  S,
                  f.width,
                  f.height,
                  f.depth
                ),
              i.texSubImage3D(
                t.TEXTURE_2D_ARRAY,
                0,
                0,
                0,
                0,
                f.width,
                f.height,
                f.depth,
                _,
                y,
                f.data
              ))
            : i.texImage3D(
                t.TEXTURE_2D_ARRAY,
                0,
                S,
                f.width,
                f.height,
                f.depth,
                0,
                _,
                y,
                f.data
              );
        else if (r.isData3DTexture)
          T
            ? (C &&
                i.texStorage3D(t.TEXTURE_3D, I, S, f.width, f.height, f.depth),
              i.texSubImage3D(
                t.TEXTURE_3D,
                0,
                0,
                0,
                0,
                f.width,
                f.height,
                f.depth,
                _,
                y,
                f.data
              ))
            : i.texImage3D(
                t.TEXTURE_3D,
                0,
                S,
                f.width,
                f.height,
                f.depth,
                0,
                _,
                y,
                f.data
              );
        else if (r.isFramebufferTexture) {
          if (C)
            if (T) i.texStorage2D(t.TEXTURE_2D, I, S, f.width, f.height);
            else {
              let e = f.width,
                n = f.height;
              for (let r = 0; r < I; r++)
                i.texImage2D(t.TEXTURE_2D, r, S, e, n, 0, _, y, null),
                  (e >>= 1),
                  (n >>= 1);
            }
        } else if (E.length > 0 && g) {
          T && C && i.texStorage2D(t.TEXTURE_2D, I, S, E[0].width, E[0].height);
          for (let e = 0, n = E.length; e < n; e++)
            (v = E[e]),
              T
                ? i.texSubImage2D(t.TEXTURE_2D, e, 0, 0, _, y, v)
                : i.texImage2D(t.TEXTURE_2D, e, S, _, y, v);
          r.generateMipmaps = !1;
        } else
          T
            ? (C && i.texStorage2D(t.TEXTURE_2D, I, S, f.width, f.height),
              i.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, _, y, f))
            : i.texImage2D(t.TEXTURE_2D, 0, S, _, y, f);
        F(r, g) && z(l), (u.__version = d.version), r.onUpdate && r.onUpdate(r);
      }
      e.__version = r.version;
    }
    function rt(e, r, a, o, l, h) {
      const c = s.convert(a.format, a.colorSpace),
        d = s.convert(a.type),
        p = B(a.internalFormat, c, d, a.colorSpace);
      if (!n.get(r).__hasExternalTextures) {
        const e = Math.max(1, r.width >> h),
          n = Math.max(1, r.height >> h);
        l === t.TEXTURE_3D || l === t.TEXTURE_2D_ARRAY
          ? i.texImage3D(l, h, p, e, n, r.depth, 0, c, d, null)
          : i.texImage2D(l, h, p, e, n, 0, c, d, null);
      }
      i.bindFramebuffer(t.FRAMEBUFFER, e),
        lt(r)
          ? u.framebufferTexture2DMultisampleEXT(
              t.FRAMEBUFFER,
              o,
              l,
              n.get(a).__webglTexture,
              0,
              ot(r)
            )
          : (l === t.TEXTURE_2D ||
              (l >= t.TEXTURE_CUBE_MAP_POSITIVE_X &&
                l <= t.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
            t.framebufferTexture2D(
              t.FRAMEBUFFER,
              o,
              l,
              n.get(a).__webglTexture,
              h
            ),
        i.bindFramebuffer(t.FRAMEBUFFER, null);
    }
    function st(e, i, n) {
      if (
        (t.bindRenderbuffer(t.RENDERBUFFER, e),
        i.depthBuffer && !i.stencilBuffer)
      ) {
        let r = !0 === o ? t.DEPTH_COMPONENT24 : t.DEPTH_COMPONENT16;
        if (n || lt(i)) {
          const e = i.depthTexture;
          e &&
            e.isDepthTexture &&
            (e.type === R
              ? (r = t.DEPTH_COMPONENT32F)
              : e.type === A && (r = t.DEPTH_COMPONENT24));
          const n = ot(i);
          lt(i)
            ? u.renderbufferStorageMultisampleEXT(
                t.RENDERBUFFER,
                n,
                r,
                i.width,
                i.height
              )
            : t.renderbufferStorageMultisample(
                t.RENDERBUFFER,
                n,
                r,
                i.width,
                i.height
              );
        } else t.renderbufferStorage(t.RENDERBUFFER, r, i.width, i.height);
        t.framebufferRenderbuffer(
          t.FRAMEBUFFER,
          t.DEPTH_ATTACHMENT,
          t.RENDERBUFFER,
          e
        );
      } else if (i.depthBuffer && i.stencilBuffer) {
        const r = ot(i);
        n && !1 === lt(i)
          ? t.renderbufferStorageMultisample(
              t.RENDERBUFFER,
              r,
              t.DEPTH24_STENCIL8,
              i.width,
              i.height
            )
          : lt(i)
          ? u.renderbufferStorageMultisampleEXT(
              t.RENDERBUFFER,
              r,
              t.DEPTH24_STENCIL8,
              i.width,
              i.height
            )
          : t.renderbufferStorage(
              t.RENDERBUFFER,
              t.DEPTH_STENCIL,
              i.width,
              i.height
            ),
          t.framebufferRenderbuffer(
            t.FRAMEBUFFER,
            t.DEPTH_STENCIL_ATTACHMENT,
            t.RENDERBUFFER,
            e
          );
      } else {
        const e =
          !0 === i.isWebGLMultipleRenderTargets ? i.texture : [i.texture];
        for (let r = 0; r < e.length; r++) {
          const a = e[r],
            o = s.convert(a.format, a.colorSpace),
            l = s.convert(a.type),
            h = B(a.internalFormat, o, l, a.colorSpace),
            c = ot(i);
          n && !1 === lt(i)
            ? t.renderbufferStorageMultisample(
                t.RENDERBUFFER,
                c,
                h,
                i.width,
                i.height
              )
            : lt(i)
            ? u.renderbufferStorageMultisampleEXT(
                t.RENDERBUFFER,
                c,
                h,
                i.width,
                i.height
              )
            : t.renderbufferStorage(t.RENDERBUFFER, h, i.width, i.height);
        }
      }
      t.bindRenderbuffer(t.RENDERBUFFER, null);
    }
    function at(e) {
      const r = n.get(e),
        s = !0 === e.isWebGLCubeRenderTarget;
      if (e.depthTexture && !r.__autoAllocateDepthBuffer) {
        if (s)
          throw new Error(
            "target.depthTexture not supported in Cube render targets"
          );
        !(function (e, r) {
          if (r && r.isWebGLCubeRenderTarget)
            throw new Error(
              "Depth Texture with cube render targets is not supported"
            );
          if (
            (i.bindFramebuffer(t.FRAMEBUFFER, e),
            !r.depthTexture || !r.depthTexture.isDepthTexture)
          )
            throw new Error(
              "renderTarget.depthTexture must be an instance of THREE.DepthTexture"
            );
          (n.get(r.depthTexture).__webglTexture &&
            r.depthTexture.image.width === r.width &&
            r.depthTexture.image.height === r.height) ||
            ((r.depthTexture.image.width = r.width),
            (r.depthTexture.image.height = r.height),
            (r.depthTexture.needsUpdate = !0)),
            Z(r.depthTexture, 0);
          const s = n.get(r.depthTexture).__webglTexture,
            a = ot(r);
          if (r.depthTexture.format === U)
            lt(r)
              ? u.framebufferTexture2DMultisampleEXT(
                  t.FRAMEBUFFER,
                  t.DEPTH_ATTACHMENT,
                  t.TEXTURE_2D,
                  s,
                  0,
                  a
                )
              : t.framebufferTexture2D(
                  t.FRAMEBUFFER,
                  t.DEPTH_ATTACHMENT,
                  t.TEXTURE_2D,
                  s,
                  0
                );
          else {
            if (r.depthTexture.format !== D)
              throw new Error("Unknown depthTexture format");
            lt(r)
              ? u.framebufferTexture2DMultisampleEXT(
                  t.FRAMEBUFFER,
                  t.DEPTH_STENCIL_ATTACHMENT,
                  t.TEXTURE_2D,
                  s,
                  0,
                  a
                )
              : t.framebufferTexture2D(
                  t.FRAMEBUFFER,
                  t.DEPTH_STENCIL_ATTACHMENT,
                  t.TEXTURE_2D,
                  s,
                  0
                );
          }
        })(r.__webglFramebuffer, e);
      } else if (s) {
        r.__webglDepthbuffer = [];
        for (let n = 0; n < 6; n++)
          i.bindFramebuffer(t.FRAMEBUFFER, r.__webglFramebuffer[n]),
            (r.__webglDepthbuffer[n] = t.createRenderbuffer()),
            st(r.__webglDepthbuffer[n], e, !1);
      } else
        i.bindFramebuffer(t.FRAMEBUFFER, r.__webglFramebuffer),
          (r.__webglDepthbuffer = t.createRenderbuffer()),
          st(r.__webglDepthbuffer, e, !1);
      i.bindFramebuffer(t.FRAMEBUFFER, null);
    }
    function ot(t) {
      return Math.min(d, t.samples);
    }
    function lt(t) {
      const i = n.get(t);
      return (
        o &&
        t.samples > 0 &&
        !0 === e.has("WEBGL_multisampled_render_to_texture") &&
        !1 !== i.__useRenderToTexture
      );
    }
    function ht(t, i) {
      const n = t.colorSpace,
        r = t.format,
        s = t.type;
      return (
        !0 === t.isCompressedTexture ||
          !0 === t.isVideoTexture ||
          t.format === tt ||
          (n !== j &&
            n !== G &&
            (wt.getTransfer(n) === K
              ? !1 === o
                ? !0 === e.has("EXT_sRGB") && r === P
                  ? ((t.format = tt),
                    (t.minFilter = b),
                    (t.generateMipmaps = !1))
                  : (i = Lt.sRGBToLinear(i))
                : (r === P && s === T) ||
                  console.warn(
                    "THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."
                  )
              : console.error(
                  "THREE.WebGLTextures: Unsupported texture color space:",
                  n
                ))),
        i
      );
    }
    (this.allocateTextureUnit = function () {
      const t = q;
      return (
        t >= l &&
          console.warn(
            "THREE.WebGLTextures: Trying to use " +
              t +
              " texture units while this GPU supports only " +
              l
          ),
        (q += 1),
        t
      );
    }),
      (this.resetTextureUnits = function () {
        q = 0;
      }),
      (this.setTexture2D = Z),
      (this.setTexture2DArray = function (e, r) {
        const s = n.get(e);
        e.version > 0 && s.__version !== e.version
          ? nt(s, e, r)
          : i.bindTexture(t.TEXTURE_2D_ARRAY, s.__webglTexture, t.TEXTURE0 + r);
      }),
      (this.setTexture3D = function (e, r) {
        const s = n.get(e);
        e.version > 0 && s.__version !== e.version
          ? nt(s, e, r)
          : i.bindTexture(t.TEXTURE_3D, s.__webglTexture, t.TEXTURE0 + r);
      }),
      (this.setTextureCube = function (e, r) {
        const a = n.get(e);
        e.version > 0 && a.__version !== e.version
          ? (function (e, r, a) {
              if (6 !== r.image.length) return;
              const l = it(e, r),
                c = r.source;
              i.bindTexture(
                t.TEXTURE_CUBE_MAP,
                e.__webglTexture,
                t.TEXTURE0 + a
              );
              const d = n.get(c);
              if (c.version !== d.__version || !0 === l) {
                i.activeTexture(t.TEXTURE0 + a);
                const e = wt.getPrimaries(wt.workingColorSpace),
                  n = r.colorSpace === G ? null : wt.getPrimaries(r.colorSpace),
                  u =
                    r.colorSpace === G || e === n
                      ? t.NONE
                      : t.BROWSER_DEFAULT_WEBGL;
                t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, r.flipY),
                  t.pixelStorei(
                    t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                    r.premultiplyAlpha
                  ),
                  t.pixelStorei(t.UNPACK_ALIGNMENT, r.unpackAlignment),
                  t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, u);
                const p =
                    r.isCompressedTexture || r.image[0].isCompressedTexture,
                  m = r.image[0] && r.image[0].isDataTexture,
                  f = [];
                for (let t = 0; t < 6; t++)
                  (f[t] =
                    p || m
                      ? m
                        ? r.image[t].image
                        : r.image[t]
                      : N(r.image[t], !1, !0, h)),
                    (f[t] = ht(r, f[t]));
                const g = f[0],
                  _ = O(g) || o,
                  v = s.convert(r.format, r.colorSpace),
                  x = s.convert(r.type),
                  y = B(r.internalFormat, v, x, r.colorSpace),
                  M = o && !0 !== r.isVideoTexture,
                  S = void 0 === d.__version || !0 === l;
                let b,
                  E = k(r, g, _);
                if ((et(t.TEXTURE_CUBE_MAP, r, _), p)) {
                  M &&
                    S &&
                    i.texStorage2D(t.TEXTURE_CUBE_MAP, E, y, g.width, g.height);
                  for (let e = 0; e < 6; e++) {
                    b = f[e].mipmaps;
                    for (let n = 0; n < b.length; n++) {
                      const s = b[n];
                      r.format !== P
                        ? null !== v
                          ? M
                            ? i.compressedTexSubImage2D(
                                t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                                n,
                                0,
                                0,
                                s.width,
                                s.height,
                                v,
                                s.data
                              )
                            : i.compressedTexImage2D(
                                t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                                n,
                                y,
                                s.width,
                                s.height,
                                0,
                                s.data
                              )
                          : console.warn(
                              "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"
                            )
                        : M
                        ? i.texSubImage2D(
                            t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                            n,
                            0,
                            0,
                            s.width,
                            s.height,
                            v,
                            x,
                            s.data
                          )
                        : i.texImage2D(
                            t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                            n,
                            y,
                            s.width,
                            s.height,
                            0,
                            v,
                            x,
                            s.data
                          );
                    }
                  }
                } else {
                  (b = r.mipmaps),
                    M &&
                      S &&
                      (b.length > 0 && E++,
                      i.texStorage2D(
                        t.TEXTURE_CUBE_MAP,
                        E,
                        y,
                        f[0].width,
                        f[0].height
                      ));
                  for (let e = 0; e < 6; e++)
                    if (m) {
                      M
                        ? i.texSubImage2D(
                            t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                            0,
                            0,
                            0,
                            f[e].width,
                            f[e].height,
                            v,
                            x,
                            f[e].data
                          )
                        : i.texImage2D(
                            t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                            0,
                            y,
                            f[e].width,
                            f[e].height,
                            0,
                            v,
                            x,
                            f[e].data
                          );
                      for (let n = 0; n < b.length; n++) {
                        const r = b[n].image[e].image;
                        M
                          ? i.texSubImage2D(
                              t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                              n + 1,
                              0,
                              0,
                              r.width,
                              r.height,
                              v,
                              x,
                              r.data
                            )
                          : i.texImage2D(
                              t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                              n + 1,
                              y,
                              r.width,
                              r.height,
                              0,
                              v,
                              x,
                              r.data
                            );
                      }
                    } else {
                      M
                        ? i.texSubImage2D(
                            t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                            0,
                            0,
                            0,
                            v,
                            x,
                            f[e]
                          )
                        : i.texImage2D(
                            t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                            0,
                            y,
                            v,
                            x,
                            f[e]
                          );
                      for (let n = 0; n < b.length; n++) {
                        const r = b[n];
                        M
                          ? i.texSubImage2D(
                              t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                              n + 1,
                              0,
                              0,
                              v,
                              x,
                              r.image[e]
                            )
                          : i.texImage2D(
                              t.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                              n + 1,
                              y,
                              v,
                              x,
                              r.image[e]
                            );
                      }
                    }
                }
                F(r, _) && z(t.TEXTURE_CUBE_MAP),
                  (d.__version = c.version),
                  r.onUpdate && r.onUpdate(r);
              }
              e.__version = r.version;
            })(a, e, r)
          : i.bindTexture(t.TEXTURE_CUBE_MAP, a.__webglTexture, t.TEXTURE0 + r);
      }),
      (this.rebindTextures = function (e, i, r) {
        const s = n.get(e);
        void 0 !== i &&
          rt(
            s.__webglFramebuffer,
            e,
            e.texture,
            t.COLOR_ATTACHMENT0,
            t.TEXTURE_2D,
            0
          ),
          void 0 !== r && at(e);
      }),
      (this.setupRenderTarget = function (e) {
        const l = e.texture,
          h = n.get(e),
          c = n.get(l);
        e.addEventListener("dispose", W),
          !0 !== e.isWebGLMultipleRenderTargets &&
            (void 0 === c.__webglTexture &&
              (c.__webglTexture = t.createTexture()),
            (c.__version = l.version),
            a.memory.textures++);
        const d = !0 === e.isWebGLCubeRenderTarget,
          u = !0 === e.isWebGLMultipleRenderTargets,
          p = O(e) || o;
        if (d) {
          h.__webglFramebuffer = [];
          for (let e = 0; e < 6; e++)
            if (o && l.mipmaps && l.mipmaps.length > 0) {
              h.__webglFramebuffer[e] = [];
              for (let i = 0; i < l.mipmaps.length; i++)
                h.__webglFramebuffer[e][i] = t.createFramebuffer();
            } else h.__webglFramebuffer[e] = t.createFramebuffer();
        } else {
          if (o && l.mipmaps && l.mipmaps.length > 0) {
            h.__webglFramebuffer = [];
            for (let e = 0; e < l.mipmaps.length; e++)
              h.__webglFramebuffer[e] = t.createFramebuffer();
          } else h.__webglFramebuffer = t.createFramebuffer();
          if (u)
            if (r.drawBuffers) {
              const i = e.texture;
              for (let e = 0, r = i.length; e < r; e++) {
                const r = n.get(i[e]);
                void 0 === r.__webglTexture &&
                  ((r.__webglTexture = t.createTexture()), a.memory.textures++);
              }
            } else
              console.warn(
                "THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension."
              );
          if (o && e.samples > 0 && !1 === lt(e)) {
            const n = u ? l : [l];
            (h.__webglMultisampledFramebuffer = t.createFramebuffer()),
              (h.__webglColorRenderbuffer = []),
              i.bindFramebuffer(
                t.FRAMEBUFFER,
                h.__webglMultisampledFramebuffer
              );
            for (let i = 0; i < n.length; i++) {
              const r = n[i];
              (h.__webglColorRenderbuffer[i] = t.createRenderbuffer()),
                t.bindRenderbuffer(
                  t.RENDERBUFFER,
                  h.__webglColorRenderbuffer[i]
                );
              const a = s.convert(r.format, r.colorSpace),
                o = s.convert(r.type),
                l = B(
                  r.internalFormat,
                  a,
                  o,
                  r.colorSpace,
                  !0 === e.isXRRenderTarget
                ),
                c = ot(e);
              t.renderbufferStorageMultisample(
                t.RENDERBUFFER,
                c,
                l,
                e.width,
                e.height
              ),
                t.framebufferRenderbuffer(
                  t.FRAMEBUFFER,
                  t.COLOR_ATTACHMENT0 + i,
                  t.RENDERBUFFER,
                  h.__webglColorRenderbuffer[i]
                );
            }
            t.bindRenderbuffer(t.RENDERBUFFER, null),
              e.depthBuffer &&
                ((h.__webglDepthRenderbuffer = t.createRenderbuffer()),
                st(h.__webglDepthRenderbuffer, e, !0)),
              i.bindFramebuffer(t.FRAMEBUFFER, null);
          }
        }
        if (d) {
          i.bindTexture(t.TEXTURE_CUBE_MAP, c.__webglTexture),
            et(t.TEXTURE_CUBE_MAP, l, p);
          for (let i = 0; i < 6; i++)
            if (o && l.mipmaps && l.mipmaps.length > 0)
              for (let n = 0; n < l.mipmaps.length; n++)
                rt(
                  h.__webglFramebuffer[i][n],
                  e,
                  l,
                  t.COLOR_ATTACHMENT0,
                  t.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                  n
                );
            else
              rt(
                h.__webglFramebuffer[i],
                e,
                l,
                t.COLOR_ATTACHMENT0,
                t.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                0
              );
          F(l, p) && z(t.TEXTURE_CUBE_MAP), i.unbindTexture();
        } else if (u) {
          const r = e.texture;
          for (let s = 0, a = r.length; s < a; s++) {
            const a = r[s],
              o = n.get(a);
            i.bindTexture(t.TEXTURE_2D, o.__webglTexture),
              et(t.TEXTURE_2D, a, p),
              rt(
                h.__webglFramebuffer,
                e,
                a,
                t.COLOR_ATTACHMENT0 + s,
                t.TEXTURE_2D,
                0
              ),
              F(a, p) && z(t.TEXTURE_2D);
          }
          i.unbindTexture();
        } else {
          let n = t.TEXTURE_2D;
          if (
            ((e.isWebGL3DRenderTarget || e.isWebGLArrayRenderTarget) &&
              (o
                ? (n = e.isWebGL3DRenderTarget
                    ? t.TEXTURE_3D
                    : t.TEXTURE_2D_ARRAY)
                : console.error(
                    "THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2."
                  )),
            i.bindTexture(n, c.__webglTexture),
            et(n, l, p),
            o && l.mipmaps && l.mipmaps.length > 0)
          )
            for (let i = 0; i < l.mipmaps.length; i++)
              rt(h.__webglFramebuffer[i], e, l, t.COLOR_ATTACHMENT0, n, i);
          else rt(h.__webglFramebuffer, e, l, t.COLOR_ATTACHMENT0, n, 0);
          F(l, p) && z(n), i.unbindTexture();
        }
        e.depthBuffer && at(e);
      }),
      (this.updateRenderTargetMipmap = function (e) {
        const r = O(e) || o,
          s = !0 === e.isWebGLMultipleRenderTargets ? e.texture : [e.texture];
        for (let a = 0, o = s.length; a < o; a++) {
          const o = s[a];
          if (F(o, r)) {
            const r = e.isWebGLCubeRenderTarget
                ? t.TEXTURE_CUBE_MAP
                : t.TEXTURE_2D,
              s = n.get(o).__webglTexture;
            i.bindTexture(r, s), z(r), i.unbindTexture();
          }
        }
      }),
      (this.updateMultisampleRenderTarget = function (e) {
        if (o && e.samples > 0 && !1 === lt(e)) {
          const r = e.isWebGLMultipleRenderTargets ? e.texture : [e.texture],
            s = e.width,
            a = e.height;
          let o = t.COLOR_BUFFER_BIT;
          const l = [],
            h = e.stencilBuffer
              ? t.DEPTH_STENCIL_ATTACHMENT
              : t.DEPTH_ATTACHMENT,
            c = n.get(e),
            d = !0 === e.isWebGLMultipleRenderTargets;
          if (d)
            for (let e = 0; e < r.length; e++)
              i.bindFramebuffer(
                t.FRAMEBUFFER,
                c.__webglMultisampledFramebuffer
              ),
                t.framebufferRenderbuffer(
                  t.FRAMEBUFFER,
                  t.COLOR_ATTACHMENT0 + e,
                  t.RENDERBUFFER,
                  null
                ),
                i.bindFramebuffer(t.FRAMEBUFFER, c.__webglFramebuffer),
                t.framebufferTexture2D(
                  t.DRAW_FRAMEBUFFER,
                  t.COLOR_ATTACHMENT0 + e,
                  t.TEXTURE_2D,
                  null,
                  0
                );
          i.bindFramebuffer(
            t.READ_FRAMEBUFFER,
            c.__webglMultisampledFramebuffer
          ),
            i.bindFramebuffer(t.DRAW_FRAMEBUFFER, c.__webglFramebuffer);
          for (let i = 0; i < r.length; i++) {
            l.push(t.COLOR_ATTACHMENT0 + i), e.depthBuffer && l.push(h);
            const u = void 0 !== c.__ignoreDepthValues && c.__ignoreDepthValues;
            if (
              (!1 === u &&
                (e.depthBuffer && (o |= t.DEPTH_BUFFER_BIT),
                e.stencilBuffer && (o |= t.STENCIL_BUFFER_BIT)),
              d &&
                t.framebufferRenderbuffer(
                  t.READ_FRAMEBUFFER,
                  t.COLOR_ATTACHMENT0,
                  t.RENDERBUFFER,
                  c.__webglColorRenderbuffer[i]
                ),
              !0 === u &&
                (t.invalidateFramebuffer(t.READ_FRAMEBUFFER, [h]),
                t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER, [h])),
              d)
            ) {
              const e = n.get(r[i]).__webglTexture;
              t.framebufferTexture2D(
                t.DRAW_FRAMEBUFFER,
                t.COLOR_ATTACHMENT0,
                t.TEXTURE_2D,
                e,
                0
              );
            }
            t.blitFramebuffer(0, 0, s, a, 0, 0, s, a, o, t.NEAREST),
              p && t.invalidateFramebuffer(t.READ_FRAMEBUFFER, l);
          }
          if (
            (i.bindFramebuffer(t.READ_FRAMEBUFFER, null),
            i.bindFramebuffer(t.DRAW_FRAMEBUFFER, null),
            d)
          )
            for (let e = 0; e < r.length; e++) {
              i.bindFramebuffer(
                t.FRAMEBUFFER,
                c.__webglMultisampledFramebuffer
              ),
                t.framebufferRenderbuffer(
                  t.FRAMEBUFFER,
                  t.COLOR_ATTACHMENT0 + e,
                  t.RENDERBUFFER,
                  c.__webglColorRenderbuffer[e]
                );
              const s = n.get(r[e]).__webglTexture;
              i.bindFramebuffer(t.FRAMEBUFFER, c.__webglFramebuffer),
                t.framebufferTexture2D(
                  t.DRAW_FRAMEBUFFER,
                  t.COLOR_ATTACHMENT0 + e,
                  t.TEXTURE_2D,
                  s,
                  0
                );
            }
          i.bindFramebuffer(
            t.DRAW_FRAMEBUFFER,
            c.__webglMultisampledFramebuffer
          );
        }
      }),
      (this.setupDepthRenderbuffer = at),
      (this.setupFrameBufferTexture = rt),
      (this.useMultisampledRTT = lt);
  }
  function Fs(t, e, i) {
    const n = i.isWebGL2;
    return {
      convert: function (i, r = "") {
        let s;
        const a = wt.getTransfer(r);
        if (i === T) return t.UNSIGNED_BYTE;
        if (1017 === i) return t.UNSIGNED_SHORT_4_4_4_4;
        if (1018 === i) return t.UNSIGNED_SHORT_5_5_5_1;
        if (1010 === i) return t.BYTE;
        if (1011 === i) return t.SHORT;
        if (i === w) return t.UNSIGNED_SHORT;
        if (1013 === i) return t.INT;
        if (i === A) return t.UNSIGNED_INT;
        if (i === R) return t.FLOAT;
        if (i === C)
          return n
            ? t.HALF_FLOAT
            : ((s = e.get("OES_texture_half_float")),
              null !== s ? s.HALF_FLOAT_OES : null);
        if (1021 === i) return t.ALPHA;
        if (i === P) return t.RGBA;
        if (1024 === i) return t.LUMINANCE;
        if (1025 === i) return t.LUMINANCE_ALPHA;
        if (i === U) return t.DEPTH_COMPONENT;
        if (i === D) return t.DEPTH_STENCIL;
        if (i === tt)
          return (s = e.get("EXT_sRGB")), null !== s ? s.SRGB_ALPHA_EXT : null;
        if (1028 === i) return t.RED;
        if (1029 === i) return t.RED_INTEGER;
        if (1030 === i) return t.RG;
        if (1031 === i) return t.RG_INTEGER;
        if (1033 === i) return t.RGBA_INTEGER;
        if (i === I || i === N || i === O || i === F)
          if (a === K) {
            if (((s = e.get("WEBGL_compressed_texture_s3tc_srgb")), null === s))
              return null;
            if (i === I) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
            if (i === N) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
            if (i === O) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
            if (i === F) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
          } else {
            if (((s = e.get("WEBGL_compressed_texture_s3tc")), null === s))
              return null;
            if (i === I) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (i === N) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (i === O) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (i === F) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
          }
        if (35840 === i || 35841 === i || 35842 === i || 35843 === i) {
          if (((s = e.get("WEBGL_compressed_texture_pvrtc")), null === s))
            return null;
          if (35840 === i) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (35841 === i) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (35842 === i) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (35843 === i) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        }
        if (36196 === i)
          return (
            (s = e.get("WEBGL_compressed_texture_etc1")),
            null !== s ? s.COMPRESSED_RGB_ETC1_WEBGL : null
          );
        if (37492 === i || 37496 === i) {
          if (((s = e.get("WEBGL_compressed_texture_etc")), null === s))
            return null;
          if (37492 === i)
            return a === K ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
          if (37496 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
              : s.COMPRESSED_RGBA8_ETC2_EAC;
        }
        if (
          37808 === i ||
          37809 === i ||
          37810 === i ||
          37811 === i ||
          37812 === i ||
          37813 === i ||
          37814 === i ||
          37815 === i ||
          37816 === i ||
          37817 === i ||
          37818 === i ||
          37819 === i ||
          37820 === i ||
          37821 === i
        ) {
          if (((s = e.get("WEBGL_compressed_texture_astc")), null === s))
            return null;
          if (37808 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
              : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
          if (37809 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
              : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
          if (37810 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
              : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
          if (37811 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
              : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
          if (37812 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
              : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
          if (37813 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
              : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
          if (37814 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
              : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
          if (37815 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
              : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
          if (37816 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
              : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
          if (37817 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
              : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
          if (37818 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
              : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
          if (37819 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
              : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
          if (37820 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
              : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
          if (37821 === i)
            return a === K
              ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
              : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
        }
        if (i === z || 36494 === i || 36495 === i) {
          if (((s = e.get("EXT_texture_compression_bptc")), null === s))
            return null;
          if (i === z)
            return a === K
              ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
              : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
          if (36494 === i) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
          if (36495 === i) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
        }
        if (36283 === i || 36284 === i || 36285 === i || 36286 === i) {
          if (((s = e.get("EXT_texture_compression_rgtc")), null === s))
            return null;
          if (i === z) return s.COMPRESSED_RED_RGTC1_EXT;
          if (36284 === i) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
          if (36285 === i) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
          if (36286 === i) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
        }
        return i === L
          ? n
            ? t.UNSIGNED_INT_24_8
            : ((s = e.get("WEBGL_depth_texture")),
              null !== s ? s.UNSIGNED_INT_24_8_WEBGL : null)
          : void 0 !== t[i]
          ? t[i]
          : null;
      },
    };
  }
  class zs extends Ji {
    constructor(t = []) {
      super(), (this.isArrayCamera = !0), (this.cameras = t);
    }
  }
  class Bs extends Ge {
    constructor() {
      super(), (this.isGroup = !0), (this.type = "Group");
    }
  }
  const ks = { type: "move" };
  class Vs {
    constructor() {
      (this._targetRay = null), (this._grip = null), (this._hand = null);
    }
    getHandSpace() {
      return (
        null === this._hand &&
          ((this._hand = new Bs()),
          (this._hand.matrixAutoUpdate = !1),
          (this._hand.visible = !1),
          (this._hand.joints = {}),
          (this._hand.inputState = { pinching: !1 })),
        this._hand
      );
    }
    getTargetRaySpace() {
      return (
        null === this._targetRay &&
          ((this._targetRay = new Bs()),
          (this._targetRay.matrixAutoUpdate = !1),
          (this._targetRay.visible = !1),
          (this._targetRay.hasLinearVelocity = !1),
          (this._targetRay.linearVelocity = new Ht()),
          (this._targetRay.hasAngularVelocity = !1),
          (this._targetRay.angularVelocity = new Ht())),
        this._targetRay
      );
    }
    getGripSpace() {
      return (
        null === this._grip &&
          ((this._grip = new Bs()),
          (this._grip.matrixAutoUpdate = !1),
          (this._grip.visible = !1),
          (this._grip.hasLinearVelocity = !1),
          (this._grip.linearVelocity = new Ht()),
          (this._grip.hasAngularVelocity = !1),
          (this._grip.angularVelocity = new Ht())),
        this._grip
      );
    }
    dispatchEvent(t) {
      return (
        null !== this._targetRay && this._targetRay.dispatchEvent(t),
        null !== this._grip && this._grip.dispatchEvent(t),
        null !== this._hand && this._hand.dispatchEvent(t),
        this
      );
    }
    connect(t) {
      if (t && t.hand) {
        const e = this._hand;
        if (e) for (const i of t.hand.values()) this._getHandJoint(e, i);
      }
      return this.dispatchEvent({ type: "connected", data: t }), this;
    }
    disconnect(t) {
      return (
        this.dispatchEvent({ type: "disconnected", data: t }),
        null !== this._targetRay && (this._targetRay.visible = !1),
        null !== this._grip && (this._grip.visible = !1),
        null !== this._hand && (this._hand.visible = !1),
        this
      );
    }
    update(t, e, i) {
      let n = null,
        r = null,
        s = null;
      const a = this._targetRay,
        o = this._grip,
        l = this._hand;
      if (t && "visible-blurred" !== e.session.visibilityState) {
        if (l && t.hand) {
          s = !0;
          for (const n of t.hand.values()) {
            const t = e.getJointPose(n, i),
              r = this._getHandJoint(l, n);
            null !== t &&
              (r.matrix.fromArray(t.transform.matrix),
              r.matrix.decompose(r.position, r.rotation, r.scale),
              (r.matrixWorldNeedsUpdate = !0),
              (r.jointRadius = t.radius)),
              (r.visible = null !== t);
          }
          const n = l.joints["index-finger-tip"],
            r = l.joints["thumb-tip"],
            a = n.position.distanceTo(r.position),
            o = 0.02,
            h = 0.005;
          l.inputState.pinching && a > o + h
            ? ((l.inputState.pinching = !1),
              this.dispatchEvent({
                type: "pinchend",
                handedness: t.handedness,
                target: this,
              }))
            : !l.inputState.pinching &&
              a <= o - h &&
              ((l.inputState.pinching = !0),
              this.dispatchEvent({
                type: "pinchstart",
                handedness: t.handedness,
                target: this,
              }));
        } else
          null !== o &&
            t.gripSpace &&
            ((r = e.getPose(t.gripSpace, i)),
            null !== r &&
              (o.matrix.fromArray(r.transform.matrix),
              o.matrix.decompose(o.position, o.rotation, o.scale),
              (o.matrixWorldNeedsUpdate = !0),
              r.linearVelocity
                ? ((o.hasLinearVelocity = !0),
                  o.linearVelocity.copy(r.linearVelocity))
                : (o.hasLinearVelocity = !1),
              r.angularVelocity
                ? ((o.hasAngularVelocity = !0),
                  o.angularVelocity.copy(r.angularVelocity))
                : (o.hasAngularVelocity = !1)));
        null !== a &&
          ((n = e.getPose(t.targetRaySpace, i)),
          null === n && null !== r && (n = r),
          null !== n &&
            (a.matrix.fromArray(n.transform.matrix),
            a.matrix.decompose(a.position, a.rotation, a.scale),
            (a.matrixWorldNeedsUpdate = !0),
            n.linearVelocity
              ? ((a.hasLinearVelocity = !0),
                a.linearVelocity.copy(n.linearVelocity))
              : (a.hasLinearVelocity = !1),
            n.angularVelocity
              ? ((a.hasAngularVelocity = !0),
                a.angularVelocity.copy(n.angularVelocity))
              : (a.hasAngularVelocity = !1),
            this.dispatchEvent(ks)));
      }
      return (
        null !== a && (a.visible = null !== n),
        null !== o && (o.visible = null !== r),
        null !== l && (l.visible = null !== s),
        this
      );
    }
    _getHandJoint(t, e) {
      if (void 0 === t.joints[e.jointName]) {
        const i = new Bs();
        (i.matrixAutoUpdate = !1),
          (i.visible = !1),
          (t.joints[e.jointName] = i),
          t.add(i);
      }
      return t.joints[e.jointName];
    }
  }
  class Hs extends nt {
    constructor(t, e) {
      super();
      const i = this;
      let n = null,
        r = 1,
        s = null,
        a = "local-floor",
        o = 1,
        l = null,
        h = null,
        c = null,
        d = null,
        u = null,
        p = null;
      const m = e.getContextAttributes();
      let f = null,
        g = null;
      const _ = [],
        v = [],
        x = new mt();
      let y = null;
      const M = new Ji();
      M.layers.enable(1), (M.viewport = new Ot());
      const S = new Ji();
      S.layers.enable(2), (S.viewport = new Ot());
      const b = [M, S],
        E = new zs();
      E.layers.enable(1), E.layers.enable(2);
      let w = null,
        R = null;
      function C(t) {
        const e = v.indexOf(t.inputSource);
        if (-1 === e) return;
        const i = _[e];
        void 0 !== i &&
          (i.update(t.inputSource, t.frame, l || s),
          i.dispatchEvent({ type: t.type, data: t.inputSource }));
      }
      function I() {
        n.removeEventListener("select", C),
          n.removeEventListener("selectstart", C),
          n.removeEventListener("selectend", C),
          n.removeEventListener("squeeze", C),
          n.removeEventListener("squeezestart", C),
          n.removeEventListener("squeezeend", C),
          n.removeEventListener("end", I),
          n.removeEventListener("inputsourceschange", N);
        for (let t = 0; t < _.length; t++) {
          const e = v[t];
          null !== e && ((v[t] = null), _[t].disconnect(e));
        }
        (w = null),
          (R = null),
          t.setRenderTarget(f),
          (u = null),
          (d = null),
          (c = null),
          (n = null),
          (g = null),
          k.stop(),
          (i.isPresenting = !1),
          t.setPixelRatio(y),
          t.setSize(x.width, x.height, !1),
          i.dispatchEvent({ type: "sessionend" });
      }
      function N(t) {
        for (let e = 0; e < t.removed.length; e++) {
          const i = t.removed[e],
            n = v.indexOf(i);
          n >= 0 && ((v[n] = null), _[n].disconnect(i));
        }
        for (let e = 0; e < t.added.length; e++) {
          const i = t.added[e];
          let n = v.indexOf(i);
          if (-1 === n) {
            for (let t = 0; t < _.length; t++) {
              if (t >= v.length) {
                v.push(i), (n = t);
                break;
              }
              if (null === v[t]) {
                (v[t] = i), (n = t);
                break;
              }
            }
            if (-1 === n) break;
          }
          const r = _[n];
          r && r.connect(i);
        }
      }
      (this.cameraAutoUpdate = !0),
        (this.enabled = !1),
        (this.isPresenting = !1),
        (this.getController = function (t) {
          let e = _[t];
          return (
            void 0 === e && ((e = new Vs()), (_[t] = e)), e.getTargetRaySpace()
          );
        }),
        (this.getControllerGrip = function (t) {
          let e = _[t];
          return void 0 === e && ((e = new Vs()), (_[t] = e)), e.getGripSpace();
        }),
        (this.getHand = function (t) {
          let e = _[t];
          return void 0 === e && ((e = new Vs()), (_[t] = e)), e.getHandSpace();
        }),
        (this.setFramebufferScaleFactor = function (t) {
          (r = t),
            !0 === i.isPresenting &&
              console.warn(
                "THREE.WebXRManager: Cannot change framebuffer scale while presenting."
              );
        }),
        (this.setReferenceSpaceType = function (t) {
          (a = t),
            !0 === i.isPresenting &&
              console.warn(
                "THREE.WebXRManager: Cannot change reference space type while presenting."
              );
        }),
        (this.getReferenceSpace = function () {
          return l || s;
        }),
        (this.setReferenceSpace = function (t) {
          l = t;
        }),
        (this.getBaseLayer = function () {
          return null !== d ? d : u;
        }),
        (this.getBinding = function () {
          return c;
        }),
        (this.getFrame = function () {
          return p;
        }),
        (this.getSession = function () {
          return n;
        }),
        (this.setSession = async function (h) {
          if (((n = h), null !== n)) {
            if (
              ((f = t.getRenderTarget()),
              n.addEventListener("select", C),
              n.addEventListener("selectstart", C),
              n.addEventListener("selectend", C),
              n.addEventListener("squeeze", C),
              n.addEventListener("squeezestart", C),
              n.addEventListener("squeezeend", C),
              n.addEventListener("end", I),
              n.addEventListener("inputsourceschange", N),
              !0 !== m.xrCompatible && (await e.makeXRCompatible()),
              (y = t.getPixelRatio()),
              t.getSize(x),
              void 0 === n.renderState.layers || !1 === t.capabilities.isWebGL2)
            ) {
              const i = {
                antialias: void 0 !== n.renderState.layers || m.antialias,
                alpha: !0,
                depth: m.depth,
                stencil: m.stencil,
                framebufferScaleFactor: r,
              };
              (u = new XRWebGLLayer(n, e, i)),
                n.updateRenderState({ baseLayer: u }),
                t.setPixelRatio(1),
                t.setSize(u.framebufferWidth, u.framebufferHeight, !1),
                (g = new zt(u.framebufferWidth, u.framebufferHeight, {
                  format: P,
                  type: T,
                  colorSpace: t.outputColorSpace,
                  stencilBuffer: m.stencil,
                }));
            } else {
              let i = null,
                s = null,
                a = null;
              m.depth &&
                ((a = m.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24),
                (i = m.stencil ? D : U),
                (s = m.stencil ? L : A));
              const o = {
                colorFormat: e.RGBA8,
                depthFormat: a,
                scaleFactor: r,
              };
              (c = new XRWebGLBinding(n, e)),
                (d = c.createProjectionLayer(o)),
                n.updateRenderState({ layers: [d] }),
                t.setPixelRatio(1),
                t.setSize(d.textureWidth, d.textureHeight, !1),
                (g = new zt(d.textureWidth, d.textureHeight, {
                  format: P,
                  type: T,
                  depthTexture: new qn(
                    d.textureWidth,
                    d.textureHeight,
                    s,
                    void 0,
                    void 0,
                    void 0,
                    void 0,
                    void 0,
                    void 0,
                    i
                  ),
                  stencilBuffer: m.stencil,
                  colorSpace: t.outputColorSpace,
                  samples: m.antialias ? 4 : 0,
                })),
                (t.properties.get(g).__ignoreDepthValues = d.ignoreDepthValues);
            }
            (g.isXRRenderTarget = !0),
              this.setFoveation(o),
              (l = null),
              (s = await n.requestReferenceSpace(a)),
              k.setContext(n),
              k.start(),
              (i.isPresenting = !0),
              i.dispatchEvent({ type: "sessionstart" });
          }
        }),
        (this.getEnvironmentBlendMode = function () {
          if (null !== n) return n.environmentBlendMode;
        });
      const O = new Ht(),
        F = new Ht();
      function z(t, e) {
        null === e
          ? t.matrixWorld.copy(t.matrix)
          : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix),
          t.matrixWorldInverse.copy(t.matrixWorld).invert();
      }
      (this.updateCamera = function (t) {
        if (null === n) return;
        (E.near = S.near = M.near = t.near),
          (E.far = S.far = M.far = t.far),
          (w === E.near && R === E.far) ||
            (n.updateRenderState({ depthNear: E.near, depthFar: E.far }),
            (w = E.near),
            (R = E.far));
        const e = t.parent,
          i = E.cameras;
        z(E, e);
        for (let t = 0; t < i.length; t++) z(i[t], e);
        2 === i.length
          ? (function (t, e, i) {
              O.setFromMatrixPosition(e.matrixWorld),
                F.setFromMatrixPosition(i.matrixWorld);
              const n = O.distanceTo(F),
                r = e.projectionMatrix.elements,
                s = i.projectionMatrix.elements,
                a = r[14] / (r[10] - 1),
                o = r[14] / (r[10] + 1),
                l = (r[9] + 1) / r[5],
                h = (r[9] - 1) / r[5],
                c = (r[8] - 1) / r[0],
                d = (s[8] + 1) / s[0],
                u = a * c,
                p = a * d,
                m = n / (-c + d),
                f = m * -c;
              e.matrixWorld.decompose(t.position, t.quaternion, t.scale),
                t.translateX(f),
                t.translateZ(m),
                t.matrixWorld.compose(t.position, t.quaternion, t.scale),
                t.matrixWorldInverse.copy(t.matrixWorld).invert();
              const g = a + m,
                _ = o + m,
                v = u - f,
                x = p + (n - f),
                y = ((l * o) / _) * g,
                M = ((h * o) / _) * g;
              t.projectionMatrix.makePerspective(v, x, y, M, g, _),
                t.projectionMatrixInverse.copy(t.projectionMatrix).invert();
            })(E, M, S)
          : E.projectionMatrix.copy(M.projectionMatrix),
          (function (t, e, i) {
            null === i
              ? t.matrix.copy(e.matrixWorld)
              : (t.matrix.copy(i.matrixWorld),
                t.matrix.invert(),
                t.matrix.multiply(e.matrixWorld)),
              t.matrix.decompose(t.position, t.quaternion, t.scale),
              t.updateMatrixWorld(!0),
              t.projectionMatrix.copy(e.projectionMatrix),
              t.projectionMatrixInverse.copy(e.projectionMatrixInverse),
              t.isPerspectiveCamera &&
                ((t.fov =
                  2 * at * Math.atan(1 / t.projectionMatrix.elements[5])),
                (t.zoom = 1));
          })(t, E, e);
      }),
        (this.getCamera = function () {
          return E;
        }),
        (this.getFoveation = function () {
          if (null !== d || null !== u) return o;
        }),
        (this.setFoveation = function (t) {
          (o = t),
            null !== d && (d.fixedFoveation = t),
            null !== u && void 0 !== u.fixedFoveation && (u.fixedFoveation = t);
        });
      let B = null;
      const k = new cn();
      k.setAnimationLoop(function (e, n) {
        if (((h = n.getViewerPose(l || s)), (p = n), null !== h)) {
          const e = h.views;
          null !== u &&
            (t.setRenderTargetFramebuffer(g, u.framebuffer),
            t.setRenderTarget(g));
          let i = !1;
          e.length !== E.cameras.length && ((E.cameras.length = 0), (i = !0));
          for (let n = 0; n < e.length; n++) {
            const r = e[n];
            let s = null;
            if (null !== u) s = u.getViewport(r);
            else {
              const e = c.getViewSubImage(d, r);
              (s = e.viewport),
                0 === n &&
                  (t.setRenderTargetTextures(
                    g,
                    e.colorTexture,
                    d.ignoreDepthValues ? void 0 : e.depthStencilTexture
                  ),
                  t.setRenderTarget(g));
            }
            let a = b[n];
            void 0 === a &&
              ((a = new Ji()),
              a.layers.enable(n),
              (a.viewport = new Ot()),
              (b[n] = a)),
              a.matrix.fromArray(r.transform.matrix),
              a.matrix.decompose(a.position, a.quaternion, a.scale),
              a.projectionMatrix.fromArray(r.projectionMatrix),
              a.projectionMatrixInverse.copy(a.projectionMatrix).invert(),
              a.viewport.set(s.x, s.y, s.width, s.height),
              0 === n &&
                (E.matrix.copy(a.matrix),
                E.matrix.decompose(E.position, E.quaternion, E.scale)),
              !0 === i && E.cameras.push(a);
          }
        }
        for (let t = 0; t < _.length; t++) {
          const e = v[t],
            i = _[t];
          null !== e && void 0 !== i && i.update(e, n, l || s);
        }
        B && B(e, n),
          n.detectedPlanes &&
            i.dispatchEvent({ type: "planesdetected", data: n }),
          (p = null);
      }),
        (this.setAnimationLoop = function (t) {
          B = t;
        }),
        (this.dispose = function () {});
    }
  }
  function Gs(t, e) {
    function i(t, e) {
      !0 === t.matrixAutoUpdate && t.updateMatrix(), e.value.copy(t.matrix);
    }
    function n(n, r) {
      (n.opacity.value = r.opacity),
        r.color && n.diffuse.value.copy(r.color),
        r.emissive &&
          n.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),
        r.map && ((n.map.value = r.map), i(r.map, n.mapTransform)),
        r.alphaMap &&
          ((n.alphaMap.value = r.alphaMap), i(r.alphaMap, n.alphaMapTransform)),
        r.bumpMap &&
          ((n.bumpMap.value = r.bumpMap),
          i(r.bumpMap, n.bumpMapTransform),
          (n.bumpScale.value = r.bumpScale),
          1 === r.side && (n.bumpScale.value *= -1)),
        r.normalMap &&
          ((n.normalMap.value = r.normalMap),
          i(r.normalMap, n.normalMapTransform),
          n.normalScale.value.copy(r.normalScale),
          1 === r.side && n.normalScale.value.negate()),
        r.displacementMap &&
          ((n.displacementMap.value = r.displacementMap),
          i(r.displacementMap, n.displacementMapTransform),
          (n.displacementScale.value = r.displacementScale),
          (n.displacementBias.value = r.displacementBias)),
        r.emissiveMap &&
          ((n.emissiveMap.value = r.emissiveMap),
          i(r.emissiveMap, n.emissiveMapTransform)),
        r.specularMap &&
          ((n.specularMap.value = r.specularMap),
          i(r.specularMap, n.specularMapTransform)),
        r.alphaTest > 0 && (n.alphaTest.value = r.alphaTest);
      const s = e.get(r).envMap;
      if (
        (s &&
          ((n.envMap.value = s),
          (n.flipEnvMap.value =
            s.isCubeTexture && !1 === s.isRenderTargetTexture ? -1 : 1),
          (n.reflectivity.value = r.reflectivity),
          (n.ior.value = r.ior),
          (n.refractionRatio.value = r.refractionRatio)),
        r.lightMap)
      ) {
        n.lightMap.value = r.lightMap;
        const e = !0 === t._useLegacyLights ? Math.PI : 1;
        (n.lightMapIntensity.value = r.lightMapIntensity * e),
          i(r.lightMap, n.lightMapTransform);
      }
      r.aoMap &&
        ((n.aoMap.value = r.aoMap),
        (n.aoMapIntensity.value = r.aoMapIntensity),
        i(r.aoMap, n.aoMapTransform));
    }
    return {
      refreshFogUniforms: function (e, i) {
        i.color.getRGB(e.fogColor.value, qi(t)),
          i.isFog
            ? ((e.fogNear.value = i.near), (e.fogFar.value = i.far))
            : i.isFogExp2 && (e.fogDensity.value = i.density);
      },
      refreshMaterialUniforms: function (t, r, s, a, o) {
        r.isMeshBasicMaterial || r.isMeshLambertMaterial
          ? n(t, r)
          : r.isMeshToonMaterial
          ? (n(t, r),
            (function (t, e) {
              e.gradientMap && (t.gradientMap.value = e.gradientMap);
            })(t, r))
          : r.isMeshPhongMaterial
          ? (n(t, r),
            (function (t, e) {
              t.specular.value.copy(e.specular),
                (t.shininess.value = Math.max(e.shininess, 1e-4));
            })(t, r))
          : r.isMeshStandardMaterial
          ? (n(t, r),
            (function (t, n) {
              (t.metalness.value = n.metalness),
                n.metalnessMap &&
                  ((t.metalnessMap.value = n.metalnessMap),
                  i(n.metalnessMap, t.metalnessMapTransform)),
                (t.roughness.value = n.roughness),
                n.roughnessMap &&
                  ((t.roughnessMap.value = n.roughnessMap),
                  i(n.roughnessMap, t.roughnessMapTransform));
              e.get(n).envMap && (t.envMapIntensity.value = n.envMapIntensity);
            })(t, r),
            r.isMeshPhysicalMaterial &&
              (function (t, e, n) {
                (t.ior.value = e.ior),
                  e.sheen > 0 &&
                    (t.sheenColor.value
                      .copy(e.sheenColor)
                      .multiplyScalar(e.sheen),
                    (t.sheenRoughness.value = e.sheenRoughness),
                    e.sheenColorMap &&
                      ((t.sheenColorMap.value = e.sheenColorMap),
                      i(e.sheenColorMap, t.sheenColorMapTransform)),
                    e.sheenRoughnessMap &&
                      ((t.sheenRoughnessMap.value = e.sheenRoughnessMap),
                      i(e.sheenRoughnessMap, t.sheenRoughnessMapTransform))),
                  e.clearcoat > 0 &&
                    ((t.clearcoat.value = e.clearcoat),
                    (t.clearcoatRoughness.value = e.clearcoatRoughness),
                    e.clearcoatMap &&
                      ((t.clearcoatMap.value = e.clearcoatMap),
                      i(e.clearcoatMap, t.clearcoatMapTransform)),
                    e.clearcoatRoughnessMap &&
                      ((t.clearcoatRoughnessMap.value =
                        e.clearcoatRoughnessMap),
                      i(
                        e.clearcoatRoughnessMap,
                        t.clearcoatRoughnessMapTransform
                      )),
                    e.clearcoatNormalMap &&
                      ((t.clearcoatNormalMap.value = e.clearcoatNormalMap),
                      i(e.clearcoatNormalMap, t.clearcoatNormalMapTransform),
                      t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale),
                      1 === e.side && t.clearcoatNormalScale.value.negate())),
                  e.iridescence > 0 &&
                    ((t.iridescence.value = e.iridescence),
                    (t.iridescenceIOR.value = e.iridescenceIOR),
                    (t.iridescenceThicknessMinimum.value =
                      e.iridescenceThicknessRange[0]),
                    (t.iridescenceThicknessMaximum.value =
                      e.iridescenceThicknessRange[1]),
                    e.iridescenceMap &&
                      ((t.iridescenceMap.value = e.iridescenceMap),
                      i(e.iridescenceMap, t.iridescenceMapTransform)),
                    e.iridescenceThicknessMap &&
                      ((t.iridescenceThicknessMap.value =
                        e.iridescenceThicknessMap),
                      i(
                        e.iridescenceThicknessMap,
                        t.iridescenceThicknessMapTransform
                      ))),
                  e.transmission > 0 &&
                    ((t.transmission.value = e.transmission),
                    (t.transmissionSamplerMap.value = n.texture),
                    t.transmissionSamplerSize.value.set(n.width, n.height),
                    e.transmissionMap &&
                      ((t.transmissionMap.value = e.transmissionMap),
                      i(e.transmissionMap, t.transmissionMapTransform)),
                    (t.thickness.value = e.thickness),
                    e.thicknessMap &&
                      ((t.thicknessMap.value = e.thicknessMap),
                      i(e.thicknessMap, t.thicknessMapTransform)),
                    (t.attenuationDistance.value = e.attenuationDistance),
                    t.attenuationColor.value.copy(e.attenuationColor)),
                  e.anisotropy > 0 &&
                    (t.anisotropyVector.value.set(
                      e.anisotropy * Math.cos(e.anisotropyRotation),
                      e.anisotropy * Math.sin(e.anisotropyRotation)
                    ),
                    e.anisotropyMap &&
                      ((t.anisotropyMap.value = e.anisotropyMap),
                      i(e.anisotropyMap, t.anisotropyMapTransform))),
                  (t.specularIntensity.value = e.specularIntensity),
                  t.specularColor.value.copy(e.specularColor),
                  e.specularColorMap &&
                    ((t.specularColorMap.value = e.specularColorMap),
                    i(e.specularColorMap, t.specularColorMapTransform)),
                  e.specularIntensityMap &&
                    ((t.specularIntensityMap.value = e.specularIntensityMap),
                    i(e.specularIntensityMap, t.specularIntensityMapTransform));
              })(t, r, o))
          : r.isMeshMatcapMaterial
          ? (n(t, r),
            (function (t, e) {
              e.matcap && (t.matcap.value = e.matcap);
            })(t, r))
          : r.isMeshDepthMaterial
          ? n(t, r)
          : r.isMeshDistanceMaterial
          ? (n(t, r),
            (function (t, i) {
              const n = e.get(i).light;
              t.referencePosition.value.setFromMatrixPosition(n.matrixWorld),
                (t.nearDistance.value = n.shadow.camera.near),
                (t.farDistance.value = n.shadow.camera.far);
            })(t, r))
          : r.isMeshNormalMaterial
          ? n(t, r)
          : r.isLineBasicMaterial
          ? ((function (t, e) {
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                e.map && ((t.map.value = e.map), i(e.map, t.mapTransform));
            })(t, r),
            r.isLineDashedMaterial &&
              (function (t, e) {
                (t.dashSize.value = e.dashSize),
                  (t.totalSize.value = e.dashSize + e.gapSize),
                  (t.scale.value = e.scale);
              })(t, r))
          : r.isPointsMaterial
          ? (function (t, e, n, r) {
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.size.value = e.size * n),
                (t.scale.value = 0.5 * r),
                e.map && ((t.map.value = e.map), i(e.map, t.uvTransform)),
                e.alphaMap &&
                  ((t.alphaMap.value = e.alphaMap),
                  i(e.alphaMap, t.alphaMapTransform)),
                e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest);
            })(t, r, s, a)
          : r.isSpriteMaterial
          ? (function (t, e) {
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.rotation.value = e.rotation),
                e.map && ((t.map.value = e.map), i(e.map, t.mapTransform)),
                e.alphaMap &&
                  ((t.alphaMap.value = e.alphaMap),
                  i(e.alphaMap, t.alphaMapTransform)),
                e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest);
            })(t, r)
          : r.isShadowMaterial
          ? (t.color.value.copy(r.color), (t.opacity.value = r.opacity))
          : r.isShaderMaterial && (r.uniformsNeedUpdate = !1);
      },
    };
  }
  function Ws(t, e, i, n) {
    let r = {},
      s = {},
      a = [];
    const o = i.isWebGL2 ? t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
    function l(t, e, i) {
      const n = t.value;
      if (void 0 === i[e]) {
        if ("number" == typeof n) i[e] = n;
        else {
          const t = Array.isArray(n) ? n : [n],
            r = [];
          for (let e = 0; e < t.length; e++) r.push(t[e].clone());
          i[e] = r;
        }
        return !0;
      }
      if ("number" == typeof n) {
        if (i[e] !== n) return (i[e] = n), !0;
      } else {
        const t = Array.isArray(i[e]) ? i[e] : [i[e]],
          r = Array.isArray(n) ? n : [n];
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          if (!1 === i.equals(r[e])) return i.copy(r[e]), !0;
        }
      }
      return !1;
    }
    function h(t) {
      const e = { boundary: 0, storage: 0 };
      return (
        "number" == typeof t
          ? ((e.boundary = 4), (e.storage = 4))
          : t.isVector2
          ? ((e.boundary = 8), (e.storage = 8))
          : t.isVector3 || t.isColor
          ? ((e.boundary = 16), (e.storage = 12))
          : t.isVector4
          ? ((e.boundary = 16), (e.storage = 16))
          : t.isMatrix3
          ? ((e.boundary = 48), (e.storage = 48))
          : t.isMatrix4
          ? ((e.boundary = 64), (e.storage = 64))
          : t.isTexture
          ? console.warn(
              "THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."
            )
          : console.warn(
              "THREE.WebGLRenderer: Unsupported uniform value type.",
              t
            ),
        e
      );
    }
    function c(e) {
      const i = e.target;
      i.removeEventListener("dispose", c);
      const n = a.indexOf(i.__bindingPointIndex);
      a.splice(n, 1), t.deleteBuffer(r[i.id]), delete r[i.id], delete s[i.id];
    }
    return {
      bind: function (t, e) {
        const i = e.program;
        n.uniformBlockBinding(t, i);
      },
      update: function (i, d) {
        let u = r[i.id];
        void 0 === u &&
          ((function (t) {
            const e = t.uniforms;
            let i = 0;
            let n = 0;
            for (let t = 0, r = e.length; t < r; t++) {
              const r = e[t],
                s = { boundary: 0, storage: 0 },
                a = Array.isArray(r.value) ? r.value : [r.value];
              for (let t = 0, e = a.length; t < e; t++) {
                const e = h(a[t]);
                (s.boundary += e.boundary), (s.storage += e.storage);
              }
              (r.__data = new Float32Array(
                s.storage / Float32Array.BYTES_PER_ELEMENT
              )),
                (r.__offset = i),
                t > 0 &&
                  ((n = i % 16),
                  0 !== n &&
                    16 - n - s.boundary < 0 &&
                    ((i += 16 - n), (r.__offset = i))),
                (i += s.storage);
            }
            (n = i % 16),
              n > 0 && (i += 16 - n),
              (t.__size = i),
              (t.__cache = {});
          })(i),
          (u = (function (e) {
            const i = (function () {
              for (let t = 0; t < o; t++)
                if (-1 === a.indexOf(t)) return a.push(t), t;
              return (
                console.error(
                  "THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."
                ),
                0
              );
            })();
            e.__bindingPointIndex = i;
            const n = t.createBuffer(),
              r = e.__size,
              s = e.usage;
            return (
              t.bindBuffer(t.UNIFORM_BUFFER, n),
              t.bufferData(t.UNIFORM_BUFFER, r, s),
              t.bindBuffer(t.UNIFORM_BUFFER, null),
              t.bindBufferBase(t.UNIFORM_BUFFER, i, n),
              n
            );
          })(i)),
          (r[i.id] = u),
          i.addEventListener("dispose", c));
        const p = d.program;
        n.updateUBOMapping(i, p);
        const m = e.render.frame;
        s[i.id] !== m &&
          ((function (e) {
            const i = r[e.id],
              n = e.uniforms,
              s = e.__cache;
            t.bindBuffer(t.UNIFORM_BUFFER, i);
            for (let e = 0, i = n.length; e < i; e++) {
              const i = n[e];
              if (!0 === l(i, e, s)) {
                const e = i.__offset,
                  n = Array.isArray(i.value) ? i.value : [i.value];
                let r = 0;
                for (let s = 0; s < n.length; s++) {
                  const a = n[s],
                    o = h(a);
                  "number" == typeof a
                    ? ((i.__data[0] = a),
                      t.bufferSubData(t.UNIFORM_BUFFER, e + r, i.__data))
                    : a.isMatrix3
                    ? ((i.__data[0] = a.elements[0]),
                      (i.__data[1] = a.elements[1]),
                      (i.__data[2] = a.elements[2]),
                      (i.__data[3] = a.elements[0]),
                      (i.__data[4] = a.elements[3]),
                      (i.__data[5] = a.elements[4]),
                      (i.__data[6] = a.elements[5]),
                      (i.__data[7] = a.elements[0]),
                      (i.__data[8] = a.elements[6]),
                      (i.__data[9] = a.elements[7]),
                      (i.__data[10] = a.elements[8]),
                      (i.__data[11] = a.elements[0]))
                    : (a.toArray(i.__data, r),
                      (r += o.storage / Float32Array.BYTES_PER_ELEMENT));
                }
                t.bufferSubData(t.UNIFORM_BUFFER, e, i.__data);
              }
            }
            t.bindBuffer(t.UNIFORM_BUFFER, null);
          })(i),
          (s[i.id] = m));
      },
      dispose: function () {
        for (const e in r) t.deleteBuffer(r[e]);
        (a = []), (r = {}), (s = {});
      },
    };
  }
  class js {
    constructor(e = {}) {
      const {
        canvas: i = xt(),
        context: n = null,
        depth: r = !0,
        stencil: s = !0,
        alpha: a = !1,
        antialias: o = !1,
        premultipliedAlpha: h = !0,
        preserveDrawingBuffer: c = !1,
        powerPreference: d = "default",
        failIfMajorPerformanceCaveat: u = !1,
      } = e;
      let p;
      (this.isWebGLRenderer = !0),
        (p = null !== n ? n.getContextAttributes().alpha : a);
      const m = new Uint32Array(4),
        f = new Int32Array(4);
      let g = null,
        _ = null;
      const v = [],
        x = [];
      (this.domElement = i),
        (this.debug = { checkShaderErrors: !0, onShaderError: null }),
        (this.autoClear = !0),
        (this.autoClearColor = !0),
        (this.autoClearDepth = !0),
        (this.autoClearStencil = !0),
        (this.sortObjects = !0),
        (this.clippingPlanes = []),
        (this.localClippingEnabled = !1),
        (this._outputColorSpace = W),
        (this._useLegacyLights = !1),
        (this.toneMapping = l),
        (this.toneMappingExposure = 1);
      const y = this;
      let M = !1,
        S = 0,
        b = 0,
        U = null,
        D = -1,
        I = null;
      const N = new Ot(),
        O = new Ot();
      let F = null;
      const z = new ai(0);
      let B = 0,
        k = i.width,
        V = i.height,
        H = 1,
        G = null,
        X = null;
      const q = new Ot(0, 0, k, V),
        Y = new Ot(0, 0, k, V);
      let K = !1;
      const Z = new hn();
      let J = !1,
        Q = !1,
        $ = null;
      const tt = new ve(),
        et = new mt(),
        it = new Ht(),
        nt = {
          background: null,
          fog: null,
          environment: null,
          overrideMaterial: null,
          isScene: !0,
        };
      function rt() {
        return null === U ? H : 1;
      }
      let st,
        at,
        ot,
        lt,
        ht,
        ct,
        ut,
        pt,
        ft,
        gt,
        _t,
        vt,
        yt,
        Mt,
        St,
        bt,
        Et,
        Tt,
        wt,
        At,
        Rt,
        Ct,
        Lt,
        Pt,
        Ut = n;
      function Dt(t, e) {
        for (let n = 0; n < t.length; n++) {
          const r = t[n],
            s = i.getContext(r, e);
          if (null !== s) return s;
        }
        return null;
      }
      try {
        const e = {
          alpha: !0,
          depth: r,
          stencil: s,
          antialias: o,
          premultipliedAlpha: h,
          preserveDrawingBuffer: c,
          powerPreference: d,
          failIfMajorPerformanceCaveat: u,
        };
        if (
          ("setAttribute" in i &&
            i.setAttribute("data-engine", `three.js r${t}`),
          i.addEventListener("webglcontextlost", Ft, !1),
          i.addEventListener("webglcontextrestored", Bt, !1),
          i.addEventListener("webglcontextcreationerror", kt, !1),
          null === Ut)
        ) {
          const t = ["webgl2", "webgl", "experimental-webgl"];
          if (
            (!0 === y.isWebGL1Renderer && t.shift(),
            (Ut = Dt(t, e)),
            null === Ut)
          )
            throw Dt(t)
              ? new Error(
                  "Error creating WebGL context with your selected attributes."
                )
              : new Error("Error creating WebGL context.");
        }
        "undefined" != typeof WebGLRenderingContext &&
          Ut instanceof WebGLRenderingContext &&
          console.warn(
            "THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."
          ),
          void 0 === Ut.getShaderPrecisionFormat &&
            (Ut.getShaderPrecisionFormat = function () {
              return { rangeMin: 1, rangeMax: 1, precision: 1 };
            });
      } catch (t) {
        throw (console.error("THREE.WebGLRenderer: " + t.message), t);
      }
      function It() {
        (st = new Bn(Ut)),
          (at = new yn(Ut, st, e)),
          st.init(at),
          (Ct = new Fs(Ut, st, at)),
          (ot = new Ns(Ut, st, at)),
          (lt = new Hn(Ut)),
          (ht = new Ms()),
          (ct = new Os(Ut, st, ot, ht, at, Ct, lt)),
          (ut = new Sn(y)),
          (pt = new zn(y)),
          (ft = new dn(Ut, at)),
          (Lt = new vn(Ut, st, ft, at)),
          (gt = new kn(Ut, ft, lt, Lt)),
          (_t = new Xn(Ut, gt, ft, lt)),
          (wt = new jn(Ut, at, ct)),
          (bt = new Mn(ht)),
          (vt = new ys(y, ut, pt, st, at, Lt, bt)),
          (yt = new Gs(y, ht)),
          (Mt = new Ts()),
          (St = new Ps(st, at)),
          (Tt = new _n(y, ut, pt, ot, _t, p, h)),
          (Et = new Is(y, _t, at)),
          (Pt = new Ws(Ut, lt, at, ot)),
          (At = new xn(Ut, st, lt, at)),
          (Rt = new Vn(Ut, st, lt, at)),
          (lt.programs = vt.programs),
          (y.capabilities = at),
          (y.extensions = st),
          (y.properties = ht),
          (y.renderLists = Mt),
          (y.shadowMap = Et),
          (y.state = ot),
          (y.info = lt);
      }
      It();
      const Nt = new Hs(y, Ut);
      function Ft(t) {
        t.preventDefault(),
          console.log("THREE.WebGLRenderer: Context Lost."),
          (M = !0);
      }
      function Bt() {
        console.log("THREE.WebGLRenderer: Context Restored."), (M = !1);
        const t = lt.autoReset,
          e = Et.enabled,
          i = Et.autoUpdate,
          n = Et.needsUpdate,
          r = Et.type;
        It(),
          (lt.autoReset = t),
          (Et.enabled = e),
          (Et.autoUpdate = i),
          (Et.needsUpdate = n),
          (Et.type = r);
      }
      function kt(t) {
        console.error(
          "THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",
          t.statusMessage
        );
      }
      function Vt(t) {
        const e = t.target;
        e.removeEventListener("dispose", Vt),
          (function (t) {
            (function (t) {
              const e = ht.get(t).programs;
              void 0 !== e &&
                (e.forEach(function (t) {
                  vt.releaseProgram(t);
                }),
                t.isShaderMaterial && vt.releaseShaderCache(t));
            })(t),
              ht.remove(t);
          })(e);
      }
      function Gt(t, e, i) {
        !0 === t.transparent && 2 === t.side && !1 === t.forceSinglePass
          ? ((t.side = 1),
            (t.needsUpdate = !0),
            Qt(t, e, i),
            (t.side = 0),
            (t.needsUpdate = !0),
            Qt(t, e, i),
            (t.side = 2))
          : Qt(t, e, i);
      }
      (this.xr = Nt),
        (this.getContext = function () {
          return Ut;
        }),
        (this.getContextAttributes = function () {
          return Ut.getContextAttributes();
        }),
        (this.forceContextLoss = function () {
          const t = st.get("WEBGL_lose_context");
          t && t.loseContext();
        }),
        (this.forceContextRestore = function () {
          const t = st.get("WEBGL_lose_context");
          t && t.restoreContext();
        }),
        (this.getPixelRatio = function () {
          return H;
        }),
        (this.setPixelRatio = function (t) {
          void 0 !== t && ((H = t), this.setSize(k, V, !1));
        }),
        (this.getSize = function (t) {
          return t.set(k, V);
        }),
        (this.setSize = function (t, e, n = !0) {
          Nt.isPresenting
            ? console.warn(
                "THREE.WebGLRenderer: Can't change size while VR device is presenting."
              )
            : ((k = t),
              (V = e),
              (i.width = Math.floor(t * H)),
              (i.height = Math.floor(e * H)),
              !0 === n &&
                ((i.style.width = t + "px"), (i.style.height = e + "px")),
              this.setViewport(0, 0, t, e));
        }),
        (this.getDrawingBufferSize = function (t) {
          return t.set(k * H, V * H).floor();
        }),
        (this.setDrawingBufferSize = function (t, e, n) {
          (k = t),
            (V = e),
            (H = n),
            (i.width = Math.floor(t * n)),
            (i.height = Math.floor(e * n)),
            this.setViewport(0, 0, t, e);
        }),
        (this.getCurrentViewport = function (t) {
          return t.copy(N);
        }),
        (this.getViewport = function (t) {
          return t.copy(q);
        }),
        (this.setViewport = function (t, e, i, n) {
          t.isVector4 ? q.set(t.x, t.y, t.z, t.w) : q.set(t, e, i, n),
            ot.viewport(N.copy(q).multiplyScalar(H).floor());
        }),
        (this.getScissor = function (t) {
          return t.copy(Y);
        }),
        (this.setScissor = function (t, e, i, n) {
          t.isVector4 ? Y.set(t.x, t.y, t.z, t.w) : Y.set(t, e, i, n),
            ot.scissor(O.copy(Y).multiplyScalar(H).floor());
        }),
        (this.getScissorTest = function () {
          return K;
        }),
        (this.setScissorTest = function (t) {
          ot.setScissorTest((K = t));
        }),
        (this.setOpaqueSort = function (t) {
          G = t;
        }),
        (this.setTransparentSort = function (t) {
          X = t;
        }),
        (this.getClearColor = function (t) {
          return t.copy(Tt.getClearColor());
        }),
        (this.setClearColor = function () {
          Tt.setClearColor.apply(Tt, arguments);
        }),
        (this.getClearAlpha = function () {
          return Tt.getClearAlpha();
        }),
        (this.setClearAlpha = function () {
          Tt.setClearAlpha.apply(Tt, arguments);
        }),
        (this.clear = function (t = !0, e = !0, i = !0) {
          let n = 0;
          if (t) {
            let t = !1;
            if (null !== U) {
              const e = U.texture.format;
              t = 1033 === e || 1031 === e || 1029 === e;
            }
            if (t) {
              const t = U.texture.type,
                e =
                  t === T ||
                  t === A ||
                  t === w ||
                  t === L ||
                  1017 === t ||
                  1018 === t,
                i = Tt.getClearColor(),
                n = Tt.getClearAlpha(),
                r = i.r,
                s = i.g,
                a = i.b;
              e
                ? ((m[0] = r),
                  (m[1] = s),
                  (m[2] = a),
                  (m[3] = n),
                  Ut.clearBufferuiv(Ut.COLOR, 0, m))
                : ((f[0] = r),
                  (f[1] = s),
                  (f[2] = a),
                  (f[3] = n),
                  Ut.clearBufferiv(Ut.COLOR, 0, f));
            } else n |= Ut.COLOR_BUFFER_BIT;
          }
          e && (n |= Ut.DEPTH_BUFFER_BIT),
            i &&
              ((n |= Ut.STENCIL_BUFFER_BIT),
              this.state.buffers.stencil.setMask(4294967295)),
            Ut.clear(n);
        }),
        (this.clearColor = function () {
          this.clear(!0, !1, !1);
        }),
        (this.clearDepth = function () {
          this.clear(!1, !0, !1);
        }),
        (this.clearStencil = function () {
          this.clear(!1, !1, !0);
        }),
        (this.dispose = function () {
          i.removeEventListener("webglcontextlost", Ft, !1),
            i.removeEventListener("webglcontextrestored", Bt, !1),
            i.removeEventListener("webglcontextcreationerror", kt, !1),
            Mt.dispose(),
            St.dispose(),
            ht.dispose(),
            ut.dispose(),
            pt.dispose(),
            _t.dispose(),
            Lt.dispose(),
            Pt.dispose(),
            vt.dispose(),
            Nt.dispose(),
            Nt.removeEventListener("sessionstart", jt),
            Nt.removeEventListener("sessionend", Xt),
            $ && ($.dispose(), ($ = null)),
            qt.stop();
        }),
        (this.renderBufferDirect = function (t, e, i, n, r, s) {
          null === e && (e = nt);
          const a = r.isMesh && r.matrixWorld.determinant() < 0,
            o = (function (t, e, i, n, r) {
              !0 !== e.isScene && (e = nt), ct.resetTextureUnits();
              const s = e.fog,
                a = n.isMeshStandardMaterial ? e.environment : null,
                o =
                  null === U
                    ? y.outputColorSpace
                    : !0 === U.isXRRenderTarget
                    ? U.texture.colorSpace
                    : j,
                h = (n.isMeshStandardMaterial ? pt : ut).get(n.envMap || a),
                c =
                  !0 === n.vertexColors &&
                  !!i.attributes.color &&
                  4 === i.attributes.color.itemSize,
                d =
                  !!i.attributes.tangent && (!!n.normalMap || n.anisotropy > 0),
                u = !!i.morphAttributes.position,
                p = !!i.morphAttributes.normal,
                m = !!i.morphAttributes.color;
              let f = l;
              n.toneMapped &&
                ((null !== U && !0 !== U.isXRRenderTarget) ||
                  (f = y.toneMapping));
              const g =
                  i.morphAttributes.position ||
                  i.morphAttributes.normal ||
                  i.morphAttributes.color,
                v = void 0 !== g ? g.length : 0,
                x = ht.get(n),
                M = _.state.lights;
              if (!0 === J && (!0 === Q || t !== I)) {
                const e = t === I && n.id === D;
                bt.setState(n, t, e);
              }
              let S = !1;
              n.version === x.__version
                ? (x.needsLights && x.lightsStateVersion !== M.state.version) ||
                  x.outputColorSpace !== o ||
                  (r.isBatchedMesh && !1 === x.batching)
                  ? (S = !0)
                  : r.isBatchedMesh || !0 !== x.batching
                  ? r.isInstancedMesh && !1 === x.instancing
                    ? (S = !0)
                    : r.isInstancedMesh || !0 !== x.instancing
                    ? r.isSkinnedMesh && !1 === x.skinning
                      ? (S = !0)
                      : r.isSkinnedMesh || !0 !== x.skinning
                      ? (r.isInstancedMesh &&
                          !0 === x.instancingColor &&
                          null === r.instanceColor) ||
                        (r.isInstancedMesh &&
                          !1 === x.instancingColor &&
                          null !== r.instanceColor) ||
                        x.envMap !== h ||
                        (!0 === n.fog && x.fog !== s)
                        ? (S = !0)
                        : void 0 === x.numClippingPlanes ||
                          (x.numClippingPlanes === bt.numPlanes &&
                            x.numIntersection === bt.numIntersection)
                        ? (x.vertexAlphas !== c ||
                            x.vertexTangents !== d ||
                            x.morphTargets !== u ||
                            x.morphNormals !== p ||
                            x.morphColors !== m ||
                            x.toneMapping !== f ||
                            (!0 === at.isWebGL2 &&
                              x.morphTargetsCount !== v)) &&
                          (S = !0)
                        : (S = !0)
                      : (S = !0)
                    : (S = !0)
                  : (S = !0)
                : ((S = !0), (x.__version = n.version));
              let b = x.currentProgram;
              !0 === S && (b = Qt(n, e, r));
              let E = !1,
                T = !1,
                w = !1;
              const A = b.getUniforms(),
                R = x.uniforms;
              if (
                (ot.useProgram(b.program) && ((E = !0), (T = !0), (w = !0)),
                n.id !== D && ((D = n.id), (T = !0)),
                E || I !== t)
              ) {
                A.setValue(Ut, "projectionMatrix", t.projectionMatrix),
                  A.setValue(Ut, "viewMatrix", t.matrixWorldInverse);
                const e = A.map.cameraPosition;
                void 0 !== e &&
                  e.setValue(Ut, it.setFromMatrixPosition(t.matrixWorld)),
                  at.logarithmicDepthBuffer &&
                    A.setValue(
                      Ut,
                      "logDepthBufFC",
                      2 / (Math.log(t.far + 1) / Math.LN2)
                    ),
                  (n.isMeshPhongMaterial ||
                    n.isMeshToonMaterial ||
                    n.isMeshLambertMaterial ||
                    n.isMeshBasicMaterial ||
                    n.isMeshStandardMaterial ||
                    n.isShaderMaterial) &&
                    A.setValue(
                      Ut,
                      "isOrthographic",
                      !0 === t.isOrthographicCamera
                    ),
                  I !== t && ((I = t), (T = !0), (w = !0));
              }
              if (r.isSkinnedMesh) {
                A.setOptional(Ut, r, "bindMatrix"),
                  A.setOptional(Ut, r, "bindMatrixInverse");
                const t = r.skeleton;
                t &&
                  (at.floatVertexTextures
                    ? (null === t.boneTexture && t.computeBoneTexture(),
                      A.setValue(Ut, "boneTexture", t.boneTexture, ct))
                    : console.warn(
                        "THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."
                      ));
              }
              r.isBatchedMesh &&
                (A.setOptional(Ut, r, "batchingTexture"),
                A.setValue(Ut, "batchingTexture", r._matricesTexture, ct));
              const C = i.morphAttributes;
              var L, P;
              if (
                ((void 0 !== C.position ||
                  void 0 !== C.normal ||
                  (void 0 !== C.color && !0 === at.isWebGL2)) &&
                  wt.update(r, i, b),
                (T || x.receiveShadow !== r.receiveShadow) &&
                  ((x.receiveShadow = r.receiveShadow),
                  A.setValue(Ut, "receiveShadow", r.receiveShadow)),
                n.isMeshGouraudMaterial &&
                  null !== n.envMap &&
                  ((R.envMap.value = h),
                  (R.flipEnvMap.value =
                    h.isCubeTexture && !1 === h.isRenderTargetTexture
                      ? -1
                      : 1)),
                T &&
                  (A.setValue(Ut, "toneMappingExposure", y.toneMappingExposure),
                  x.needsLights &&
                    ((P = w),
                    ((L = R).ambientLightColor.needsUpdate = P),
                    (L.lightProbe.needsUpdate = P),
                    (L.directionalLights.needsUpdate = P),
                    (L.directionalLightShadows.needsUpdate = P),
                    (L.pointLights.needsUpdate = P),
                    (L.pointLightShadows.needsUpdate = P),
                    (L.spotLights.needsUpdate = P),
                    (L.spotLightShadows.needsUpdate = P),
                    (L.rectAreaLights.needsUpdate = P),
                    (L.hemisphereLights.needsUpdate = P)),
                  s && !0 === n.fog && yt.refreshFogUniforms(R, s),
                  yt.refreshMaterialUniforms(R, n, H, V, $),
                  Qr.upload(Ut, $t(x), R, ct)),
                n.isShaderMaterial &&
                  !0 === n.uniformsNeedUpdate &&
                  (Qr.upload(Ut, $t(x), R, ct), (n.uniformsNeedUpdate = !1)),
                n.isSpriteMaterial && A.setValue(Ut, "center", r.center),
                A.setValue(Ut, "modelViewMatrix", r.modelViewMatrix),
                A.setValue(Ut, "normalMatrix", r.normalMatrix),
                A.setValue(Ut, "modelMatrix", r.matrixWorld),
                n.isShaderMaterial || n.isRawShaderMaterial)
              ) {
                const t = n.uniformsGroups;
                for (let e = 0, i = t.length; e < i; e++)
                  if (at.isWebGL2) {
                    const i = t[e];
                    Pt.update(i, b), Pt.bind(i, b);
                  } else
                    console.warn(
                      "THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2."
                    );
              }
              return b;
            })(t, e, i, n, r);
          ot.setMaterial(n, a);
          let h = i.index,
            c = 1;
          if (!0 === n.wireframe) {
            if (((h = gt.getWireframeAttribute(i)), void 0 === h)) return;
            c = 2;
          }
          const d = i.drawRange,
            u = i.attributes.position;
          let p = d.start * c,
            m = (d.start + d.count) * c;
          null !== s &&
            ((p = Math.max(p, s.start * c)),
            (m = Math.min(m, (s.start + s.count) * c))),
            null !== h
              ? ((p = Math.max(p, 0)), (m = Math.min(m, h.count)))
              : null != u && ((p = Math.max(p, 0)), (m = Math.min(m, u.count)));
          const f = m - p;
          if (f < 0 || f === 1 / 0) return;
          let g;
          Lt.setup(r, n, o, i, h);
          let v = At;
          if (
            (null !== h && ((g = ft.get(h)), (v = Rt), v.setIndex(g)), r.isMesh)
          )
            !0 === n.wireframe
              ? (ot.setLineWidth(n.wireframeLinewidth * rt()),
                v.setMode(Ut.LINES))
              : v.setMode(Ut.TRIANGLES);
          else if (r.isLine) {
            let t = n.linewidth;
            void 0 === t && (t = 1),
              ot.setLineWidth(t * rt()),
              r.isLineSegments
                ? v.setMode(Ut.LINES)
                : r.isLineLoop
                ? v.setMode(Ut.LINE_LOOP)
                : v.setMode(Ut.LINE_STRIP);
          } else
            r.isPoints
              ? v.setMode(Ut.POINTS)
              : r.isSprite && v.setMode(Ut.TRIANGLES);
          if (r.isBatchedMesh)
            v.renderMultiDraw(
              r._multiDrawStarts,
              r._multiDrawCounts,
              r._multiDrawCount
            );
          else if (r.isInstancedMesh) v.renderInstances(p, f, r.count);
          else if (i.isInstancedBufferGeometry) {
            const t =
                void 0 !== i._maxInstanceCount ? i._maxInstanceCount : 1 / 0,
              e = Math.min(i.instanceCount, t);
            v.renderInstances(p, f, e);
          } else v.render(p, f);
        }),
        (this.compile = function (t, e, i = null) {
          null === i && (i = t),
            (_ = St.get(i)),
            _.init(),
            x.push(_),
            i.traverseVisible(function (t) {
              t.isLight &&
                t.layers.test(e.layers) &&
                (_.pushLight(t), t.castShadow && _.pushShadow(t));
            }),
            t !== i &&
              t.traverseVisible(function (t) {
                t.isLight &&
                  t.layers.test(e.layers) &&
                  (_.pushLight(t), t.castShadow && _.pushShadow(t));
              }),
            _.setupLights(y._useLegacyLights);
          const n = new Set();
          return (
            t.traverse(function (t) {
              const e = t.material;
              if (e)
                if (Array.isArray(e))
                  for (let r = 0; r < e.length; r++) {
                    const s = e[r];
                    Gt(s, i, t), n.add(s);
                  }
                else Gt(e, i, t), n.add(e);
            }),
            x.pop(),
            (_ = null),
            n
          );
        }),
        (this.compileAsync = function (t, e, i = null) {
          const n = this.compile(t, e, i);
          return new Promise((e) => {
            function i() {
              n.forEach(function (t) {
                ht.get(t).currentProgram.isReady() && n.delete(t);
              }),
                0 !== n.size ? setTimeout(i, 10) : e(t);
            }
            null !== st.get("KHR_parallel_shader_compile")
              ? i()
              : setTimeout(i, 10);
          });
        });
      let Wt = null;
      function jt() {
        qt.stop();
      }
      function Xt() {
        qt.start();
      }
      const qt = new cn();
      function Yt(t, e, i, n) {
        if (!1 === t.visible) return;
        if (t.layers.test(e.layers))
          if (t.isGroup) i = t.renderOrder;
          else if (t.isLOD) !0 === t.autoUpdate && t.update(e);
          else if (t.isLight) _.pushLight(t), t.castShadow && _.pushShadow(t);
          else if (t.isSprite) {
            if (!t.frustumCulled || Z.intersectsSprite(t)) {
              n && it.setFromMatrixPosition(t.matrixWorld).applyMatrix4(tt);
              const e = _t.update(t),
                r = t.material;
              r.visible && g.push(t, e, r, i, it.z, null);
            }
          } else if (
            (t.isMesh || t.isLine || t.isPoints) &&
            (!t.frustumCulled || Z.intersectsObject(t))
          ) {
            const e = _t.update(t),
              r = t.material;
            if (
              (n &&
                (void 0 !== t.boundingSphere
                  ? (null === t.boundingSphere && t.computeBoundingSphere(),
                    it.copy(t.boundingSphere.center))
                  : (null === e.boundingSphere && e.computeBoundingSphere(),
                    it.copy(e.boundingSphere.center)),
                it.applyMatrix4(t.matrixWorld).applyMatrix4(tt)),
              Array.isArray(r))
            ) {
              const n = e.groups;
              for (let s = 0, a = n.length; s < a; s++) {
                const a = n[s],
                  o = r[a.materialIndex];
                o && o.visible && g.push(t, e, o, i, it.z, a);
              }
            } else r.visible && g.push(t, e, r, i, it.z, null);
          }
        const r = t.children;
        for (let t = 0, s = r.length; t < s; t++) Yt(r[t], e, i, n);
      }
      function Kt(t, e, i, n) {
        const r = t.opaque,
          s = t.transmissive,
          a = t.transparent;
        _.setupLightsView(i),
          !0 === J && bt.setGlobalState(y.clippingPlanes, i),
          s.length > 0 &&
            (function (t, e, i, n) {
              if (null !== (!0 === i.isScene ? i.overrideMaterial : null))
                return;
              const r = at.isWebGL2;
              null === $ &&
                ($ = new zt(1, 1, {
                  generateMipmaps: !0,
                  type: st.has("EXT_color_buffer_half_float") ? C : T,
                  minFilter: E,
                  samples: r ? 4 : 0,
                })),
                y.getDrawingBufferSize(et),
                r ? $.setSize(et.x, et.y) : $.setSize(dt(et.x), dt(et.y));
              const s = y.getRenderTarget();
              y.setRenderTarget($),
                y.getClearColor(z),
                (B = y.getClearAlpha()),
                B < 1 && y.setClearColor(16777215, 0.5),
                y.clear();
              const a = y.toneMapping;
              (y.toneMapping = l),
                Zt(t, i, n),
                ct.updateMultisampleRenderTarget($),
                ct.updateRenderTargetMipmap($);
              let o = !1;
              for (let t = 0, r = e.length; t < r; t++) {
                const r = e[t],
                  s = r.object,
                  a = r.geometry,
                  l = r.material,
                  h = r.group;
                if (2 === l.side && s.layers.test(n.layers)) {
                  const t = l.side;
                  (l.side = 1),
                    (l.needsUpdate = !0),
                    Jt(s, i, n, a, l, h),
                    (l.side = t),
                    (l.needsUpdate = !0),
                    (o = !0);
                }
              }
              !0 === o &&
                (ct.updateMultisampleRenderTarget($),
                ct.updateRenderTargetMipmap($)),
                y.setRenderTarget(s),
                y.setClearColor(z, B),
                (y.toneMapping = a);
            })(r, s, e, i),
          n && ot.viewport(N.copy(n)),
          r.length > 0 && Zt(r, e, i),
          s.length > 0 && Zt(s, e, i),
          a.length > 0 && Zt(a, e, i),
          ot.buffers.depth.setTest(!0),
          ot.buffers.depth.setMask(!0),
          ot.buffers.color.setMask(!0),
          ot.setPolygonOffset(!1);
      }
      function Zt(t, e, i) {
        const n = !0 === e.isScene ? e.overrideMaterial : null;
        for (let r = 0, s = t.length; r < s; r++) {
          const s = t[r],
            a = s.object,
            o = s.geometry,
            l = null === n ? s.material : n,
            h = s.group;
          a.layers.test(i.layers) && Jt(a, e, i, o, l, h);
        }
      }
      function Jt(t, e, i, n, r, s) {
        t.onBeforeRender(y, e, i, n, r, s),
          t.modelViewMatrix.multiplyMatrices(
            i.matrixWorldInverse,
            t.matrixWorld
          ),
          t.normalMatrix.getNormalMatrix(t.modelViewMatrix),
          r.onBeforeRender(y, e, i, n, t, s),
          !0 === r.transparent && 2 === r.side && !1 === r.forceSinglePass
            ? ((r.side = 1),
              (r.needsUpdate = !0),
              y.renderBufferDirect(i, e, n, r, t, s),
              (r.side = 0),
              (r.needsUpdate = !0),
              y.renderBufferDirect(i, e, n, r, t, s),
              (r.side = 2))
            : y.renderBufferDirect(i, e, n, r, t, s),
          t.onAfterRender(y, e, i, n, r, s);
      }
      function Qt(t, e, i) {
        !0 !== e.isScene && (e = nt);
        const n = ht.get(t),
          r = _.state.lights,
          s = _.state.shadowsArray,
          a = r.state.version,
          o = vt.getParameters(t, r.state, s, e, i),
          l = vt.getProgramCacheKey(o);
        let h = n.programs;
        (n.environment = t.isMeshStandardMaterial ? e.environment : null),
          (n.fog = e.fog),
          (n.envMap = (t.isMeshStandardMaterial ? pt : ut).get(
            t.envMap || n.environment
          )),
          void 0 === h &&
            (t.addEventListener("dispose", Vt),
            (h = new Map()),
            (n.programs = h));
        let c = h.get(l);
        if (void 0 !== c) {
          if (n.currentProgram === c && n.lightsStateVersion === a)
            return te(t, o), c;
        } else
          (o.uniforms = vt.getUniforms(t)),
            t.onBuild(i, o, y),
            t.onBeforeCompile(o, y),
            (c = vt.acquireProgram(o, l)),
            h.set(l, c),
            (n.uniforms = o.uniforms);
        const d = n.uniforms;
        return (
          ((t.isShaderMaterial || t.isRawShaderMaterial) &&
            !0 !== t.clipping) ||
            (d.clippingPlanes = bt.uniform),
          te(t, o),
          (n.needsLights = (function (t) {
            return (
              t.isMeshLambertMaterial ||
              t.isMeshToonMaterial ||
              t.isMeshPhongMaterial ||
              t.isMeshStandardMaterial ||
              t.isShadowMaterial ||
              (t.isShaderMaterial && !0 === t.lights)
            );
          })(t)),
          (n.lightsStateVersion = a),
          n.needsLights &&
            ((d.ambientLightColor.value = r.state.ambient),
            (d.lightProbe.value = r.state.probe),
            (d.directionalLights.value = r.state.directional),
            (d.directionalLightShadows.value = r.state.directionalShadow),
            (d.spotLights.value = r.state.spot),
            (d.spotLightShadows.value = r.state.spotShadow),
            (d.rectAreaLights.value = r.state.rectArea),
            (d.ltc_1.value = r.state.rectAreaLTC1),
            (d.ltc_2.value = r.state.rectAreaLTC2),
            (d.pointLights.value = r.state.point),
            (d.pointLightShadows.value = r.state.pointShadow),
            (d.hemisphereLights.value = r.state.hemi),
            (d.directionalShadowMap.value = r.state.directionalShadowMap),
            (d.directionalShadowMatrix.value = r.state.directionalShadowMatrix),
            (d.spotShadowMap.value = r.state.spotShadowMap),
            (d.spotLightMatrix.value = r.state.spotLightMatrix),
            (d.spotLightMap.value = r.state.spotLightMap),
            (d.pointShadowMap.value = r.state.pointShadowMap),
            (d.pointShadowMatrix.value = r.state.pointShadowMatrix)),
          (n.currentProgram = c),
          (n.uniformsList = null),
          c
        );
      }
      function $t(t) {
        if (null === t.uniformsList) {
          const e = t.currentProgram.getUniforms();
          t.uniformsList = Qr.seqWithValue(e.seq, t.uniforms);
        }
        return t.uniformsList;
      }
      function te(t, e) {
        const i = ht.get(t);
        (i.outputColorSpace = e.outputColorSpace),
          (i.batching = e.batching),
          (i.instancing = e.instancing),
          (i.instancingColor = e.instancingColor),
          (i.skinning = e.skinning),
          (i.morphTargets = e.morphTargets),
          (i.morphNormals = e.morphNormals),
          (i.morphColors = e.morphColors),
          (i.morphTargetsCount = e.morphTargetsCount),
          (i.numClippingPlanes = e.numClippingPlanes),
          (i.numIntersection = e.numClipIntersection),
          (i.vertexAlphas = e.vertexAlphas),
          (i.vertexTangents = e.vertexTangents),
          (i.toneMapping = e.toneMapping);
      }
      qt.setAnimationLoop(function (t) {
        Wt && Wt(t);
      }),
        "undefined" != typeof self && qt.setContext(self),
        (this.setAnimationLoop = function (t) {
          (Wt = t), Nt.setAnimationLoop(t), null === t ? qt.stop() : qt.start();
        }),
        Nt.addEventListener("sessionstart", jt),
        Nt.addEventListener("sessionend", Xt),
        (this.render = function (t, e) {
          if (void 0 !== e && !0 !== e.isCamera)
            return void console.error(
              "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
            );
          if (!0 === M) return;
          !0 === t.matrixWorldAutoUpdate && t.updateMatrixWorld(),
            null === e.parent &&
              !0 === e.matrixWorldAutoUpdate &&
              e.updateMatrixWorld(),
            !0 === Nt.enabled &&
              !0 === Nt.isPresenting &&
              (!0 === Nt.cameraAutoUpdate && Nt.updateCamera(e),
              (e = Nt.getCamera())),
            !0 === t.isScene && t.onBeforeRender(y, t, e, U),
            (_ = St.get(t, x.length)),
            _.init(),
            x.push(_),
            tt.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
            Z.setFromProjectionMatrix(tt),
            (Q = this.localClippingEnabled),
            (J = bt.init(this.clippingPlanes, Q)),
            (g = Mt.get(t, v.length)),
            g.init(),
            v.push(g),
            Yt(t, e, 0, y.sortObjects),
            g.finish(),
            !0 === y.sortObjects && g.sort(G, X),
            this.info.render.frame++,
            !0 === J && bt.beginShadows();
          const i = _.state.shadowsArray;
          if (
            (Et.render(i, t, e),
            !0 === J && bt.endShadows(),
            !0 === this.info.autoReset && this.info.reset(),
            Tt.render(g, t),
            _.setupLights(y._useLegacyLights),
            e.isArrayCamera)
          ) {
            const i = e.cameras;
            for (let e = 0, n = i.length; e < n; e++) {
              const n = i[e];
              Kt(g, t, n, n.viewport);
            }
          } else Kt(g, t, e);
          null !== U &&
            (ct.updateMultisampleRenderTarget(U),
            ct.updateRenderTargetMipmap(U)),
            !0 === t.isScene && t.onAfterRender(y, t, e),
            Lt.resetDefaultState(),
            (D = -1),
            (I = null),
            x.pop(),
            (_ = x.length > 0 ? x[x.length - 1] : null),
            v.pop(),
            (g = v.length > 0 ? v[v.length - 1] : null);
        }),
        (this.getActiveCubeFace = function () {
          return S;
        }),
        (this.getActiveMipmapLevel = function () {
          return b;
        }),
        (this.getRenderTarget = function () {
          return U;
        }),
        (this.setRenderTargetTextures = function (t, e, i) {
          (ht.get(t.texture).__webglTexture = e),
            (ht.get(t.depthTexture).__webglTexture = i);
          const n = ht.get(t);
          (n.__hasExternalTextures = !0),
            n.__hasExternalTextures &&
              ((n.__autoAllocateDepthBuffer = void 0 === i),
              n.__autoAllocateDepthBuffer ||
                (!0 === st.has("WEBGL_multisampled_render_to_texture") &&
                  (console.warn(
                    "THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"
                  ),
                  (n.__useRenderToTexture = !1))));
        }),
        (this.setRenderTargetFramebuffer = function (t, e) {
          const i = ht.get(t);
          (i.__webglFramebuffer = e),
            (i.__useDefaultFramebuffer = void 0 === e);
        }),
        (this.setRenderTarget = function (t, e = 0, i = 0) {
          (U = t), (S = e), (b = i);
          let n = !0,
            r = null,
            s = !1,
            a = !1;
          if (t) {
            const o = ht.get(t);
            void 0 !== o.__useDefaultFramebuffer
              ? (ot.bindFramebuffer(Ut.FRAMEBUFFER, null), (n = !1))
              : void 0 === o.__webglFramebuffer
              ? ct.setupRenderTarget(t)
              : o.__hasExternalTextures &&
                ct.rebindTextures(
                  t,
                  ht.get(t.texture).__webglTexture,
                  ht.get(t.depthTexture).__webglTexture
                );
            const l = t.texture;
            (l.isData3DTexture ||
              l.isDataArrayTexture ||
              l.isCompressedArrayTexture) &&
              (a = !0);
            const h = ht.get(t).__webglFramebuffer;
            t.isWebGLCubeRenderTarget
              ? ((r = Array.isArray(h[e]) ? h[e][i] : h[e]), (s = !0))
              : (r =
                  at.isWebGL2 &&
                  t.samples > 0 &&
                  !1 === ct.useMultisampledRTT(t)
                    ? ht.get(t).__webglMultisampledFramebuffer
                    : Array.isArray(h)
                    ? h[i]
                    : h),
              N.copy(t.viewport),
              O.copy(t.scissor),
              (F = t.scissorTest);
          } else
            N.copy(q).multiplyScalar(H).floor(),
              O.copy(Y).multiplyScalar(H).floor(),
              (F = K);
          if (
            (ot.bindFramebuffer(Ut.FRAMEBUFFER, r) &&
              at.drawBuffers &&
              n &&
              ot.drawBuffers(t, r),
            ot.viewport(N),
            ot.scissor(O),
            ot.setScissorTest(F),
            s)
          ) {
            const n = ht.get(t.texture);
            Ut.framebufferTexture2D(
              Ut.FRAMEBUFFER,
              Ut.COLOR_ATTACHMENT0,
              Ut.TEXTURE_CUBE_MAP_POSITIVE_X + e,
              n.__webglTexture,
              i
            );
          } else if (a) {
            const n = ht.get(t.texture),
              r = e || 0;
            Ut.framebufferTextureLayer(
              Ut.FRAMEBUFFER,
              Ut.COLOR_ATTACHMENT0,
              n.__webglTexture,
              i || 0,
              r
            );
          }
          D = -1;
        }),
        (this.readRenderTargetPixels = function (t, e, i, n, r, s, a) {
          if (!t || !t.isWebGLRenderTarget)
            return void console.error(
              "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."
            );
          let o = ht.get(t).__webglFramebuffer;
          if ((t.isWebGLCubeRenderTarget && void 0 !== a && (o = o[a]), o)) {
            ot.bindFramebuffer(Ut.FRAMEBUFFER, o);
            try {
              const a = t.texture,
                o = a.format,
                l = a.type;
              if (
                o !== P &&
                Ct.convert(o) !==
                  Ut.getParameter(Ut.IMPLEMENTATION_COLOR_READ_FORMAT)
              )
                return void console.error(
                  "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."
                );
              const h =
                l === C &&
                (st.has("EXT_color_buffer_half_float") ||
                  (at.isWebGL2 && st.has("EXT_color_buffer_float")));
              if (
                !(
                  l === T ||
                  Ct.convert(l) ===
                    Ut.getParameter(Ut.IMPLEMENTATION_COLOR_READ_TYPE) ||
                  (l === R &&
                    (at.isWebGL2 ||
                      st.has("OES_texture_float") ||
                      st.has("WEBGL_color_buffer_float"))) ||
                  h
                )
              )
                return void console.error(
                  "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type."
                );
              e >= 0 &&
                e <= t.width - n &&
                i >= 0 &&
                i <= t.height - r &&
                Ut.readPixels(e, i, n, r, Ct.convert(o), Ct.convert(l), s);
            } finally {
              const t = null !== U ? ht.get(U).__webglFramebuffer : null;
              ot.bindFramebuffer(Ut.FRAMEBUFFER, t);
            }
          }
        }),
        (this.copyFramebufferToTexture = function (t, e, i = 0) {
          const n = Math.pow(2, -i),
            r = Math.floor(e.image.width * n),
            s = Math.floor(e.image.height * n);
          ct.setTexture2D(e, 0),
            Ut.copyTexSubImage2D(Ut.TEXTURE_2D, i, 0, 0, t.x, t.y, r, s),
            ot.unbindTexture();
        }),
        (this.copyTextureToTexture = function (t, e, i, n = 0) {
          const r = e.image.width,
            s = e.image.height,
            a = Ct.convert(i.format),
            o = Ct.convert(i.type);
          ct.setTexture2D(i, 0),
            Ut.pixelStorei(Ut.UNPACK_FLIP_Y_WEBGL, i.flipY),
            Ut.pixelStorei(
              Ut.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
              i.premultiplyAlpha
            ),
            Ut.pixelStorei(Ut.UNPACK_ALIGNMENT, i.unpackAlignment),
            e.isDataTexture
              ? Ut.texSubImage2D(
                  Ut.TEXTURE_2D,
                  n,
                  t.x,
                  t.y,
                  r,
                  s,
                  a,
                  o,
                  e.image.data
                )
              : e.isCompressedTexture
              ? Ut.compressedTexSubImage2D(
                  Ut.TEXTURE_2D,
                  n,
                  t.x,
                  t.y,
                  e.mipmaps[0].width,
                  e.mipmaps[0].height,
                  a,
                  e.mipmaps[0].data
                )
              : Ut.texSubImage2D(Ut.TEXTURE_2D, n, t.x, t.y, a, o, e.image),
            0 === n && i.generateMipmaps && Ut.generateMipmap(Ut.TEXTURE_2D),
            ot.unbindTexture();
        }),
        (this.copyTextureToTexture3D = function (t, e, i, n, r = 0) {
          if (y.isWebGL1Renderer)
            return void console.warn(
              "THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2."
            );
          const s = t.max.x - t.min.x + 1,
            a = t.max.y - t.min.y + 1,
            o = t.max.z - t.min.z + 1,
            l = Ct.convert(n.format),
            h = Ct.convert(n.type);
          let c;
          if (n.isData3DTexture) ct.setTexture3D(n, 0), (c = Ut.TEXTURE_3D);
          else {
            if (!n.isDataArrayTexture)
              return void console.warn(
                "THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray."
              );
            ct.setTexture2DArray(n, 0), (c = Ut.TEXTURE_2D_ARRAY);
          }
          Ut.pixelStorei(Ut.UNPACK_FLIP_Y_WEBGL, n.flipY),
            Ut.pixelStorei(
              Ut.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
              n.premultiplyAlpha
            ),
            Ut.pixelStorei(Ut.UNPACK_ALIGNMENT, n.unpackAlignment);
          const d = Ut.getParameter(Ut.UNPACK_ROW_LENGTH),
            u = Ut.getParameter(Ut.UNPACK_IMAGE_HEIGHT),
            p = Ut.getParameter(Ut.UNPACK_SKIP_PIXELS),
            m = Ut.getParameter(Ut.UNPACK_SKIP_ROWS),
            f = Ut.getParameter(Ut.UNPACK_SKIP_IMAGES),
            g = i.isCompressedTexture ? i.mipmaps[0] : i.image;
          Ut.pixelStorei(Ut.UNPACK_ROW_LENGTH, g.width),
            Ut.pixelStorei(Ut.UNPACK_IMAGE_HEIGHT, g.height),
            Ut.pixelStorei(Ut.UNPACK_SKIP_PIXELS, t.min.x),
            Ut.pixelStorei(Ut.UNPACK_SKIP_ROWS, t.min.y),
            Ut.pixelStorei(Ut.UNPACK_SKIP_IMAGES, t.min.z),
            i.isDataTexture || i.isData3DTexture
              ? Ut.texSubImage3D(c, r, e.x, e.y, e.z, s, a, o, l, h, g.data)
              : i.isCompressedArrayTexture
              ? (console.warn(
                  "THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."
                ),
                Ut.compressedTexSubImage3D(
                  c,
                  r,
                  e.x,
                  e.y,
                  e.z,
                  s,
                  a,
                  o,
                  l,
                  g.data
                ))
              : Ut.texSubImage3D(c, r, e.x, e.y, e.z, s, a, o, l, h, g),
            Ut.pixelStorei(Ut.UNPACK_ROW_LENGTH, d),
            Ut.pixelStorei(Ut.UNPACK_IMAGE_HEIGHT, u),
            Ut.pixelStorei(Ut.UNPACK_SKIP_PIXELS, p),
            Ut.pixelStorei(Ut.UNPACK_SKIP_ROWS, m),
            Ut.pixelStorei(Ut.UNPACK_SKIP_IMAGES, f),
            0 === r && n.generateMipmaps && Ut.generateMipmap(c),
            ot.unbindTexture();
        }),
        (this.initTexture = function (t) {
          t.isCubeTexture
            ? ct.setTextureCube(t, 0)
            : t.isData3DTexture
            ? ct.setTexture3D(t, 0)
            : t.isDataArrayTexture || t.isCompressedArrayTexture
            ? ct.setTexture2DArray(t, 0)
            : ct.setTexture2D(t, 0),
            ot.unbindTexture();
        }),
        (this.resetState = function () {
          (S = 0), (b = 0), (U = null), ot.reset(), Lt.reset();
        }),
        "undefined" != typeof __THREE_DEVTOOLS__ &&
          __THREE_DEVTOOLS__.dispatchEvent(
            new CustomEvent("observe", { detail: this })
          );
    }
    get coordinateSystem() {
      return et;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(t) {
      this._outputColorSpace = t;
      const e = this.getContext();
      (e.drawingBufferColorSpace = t === X ? "display-p3" : "srgb"),
        (e.unpackColorSpace =
          wt.workingColorSpace === q ? "display-p3" : "srgb");
    }
    get physicallyCorrectLights() {
      return (
        console.warn(
          "THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."
        ),
        !this.useLegacyLights
      );
    }
    set physicallyCorrectLights(t) {
      console.warn(
        "THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."
      ),
        (this.useLegacyLights = !t);
    }
    get outputEncoding() {
      return (
        console.warn(
          "THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."
        ),
        this.outputColorSpace === W ? H : 3e3
      );
    }
    set outputEncoding(t) {
      console.warn(
        "THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."
      ),
        (this.outputColorSpace = t === H ? W : j);
    }
    get useLegacyLights() {
      return (
        console.warn(
          "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."
        ),
        this._useLegacyLights
      );
    }
    set useLegacyLights(t) {
      console.warn(
        "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."
      ),
        (this._useLegacyLights = t);
    }
  }
  (class extends js {}).prototype.isWebGL1Renderer = !0;
  class Xs {
    constructor(t, e = 1, i = 1e3) {
      (this.isFog = !0),
        (this.name = ""),
        (this.color = new ai(t)),
        (this.near = e),
        (this.far = i);
    }
    clone() {
      return new Xs(this.color, this.near, this.far);
    }
    toJSON() {
      return {
        type: "Fog",
        name: this.name,
        color: this.color.getHex(),
        near: this.near,
        far: this.far,
      };
    }
  }
  class qs extends Ge {
    constructor() {
      super(),
        (this.isScene = !0),
        (this.type = "Scene"),
        (this.background = null),
        (this.environment = null),
        (this.fog = null),
        (this.backgroundBlurriness = 0),
        (this.backgroundIntensity = 1),
        (this.overrideMaterial = null),
        "undefined" != typeof __THREE_DEVTOOLS__ &&
          __THREE_DEVTOOLS__.dispatchEvent(
            new CustomEvent("observe", { detail: this })
          );
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        null !== t.background && (this.background = t.background.clone()),
        null !== t.environment && (this.environment = t.environment.clone()),
        null !== t.fog && (this.fog = t.fog.clone()),
        (this.backgroundBlurriness = t.backgroundBlurriness),
        (this.backgroundIntensity = t.backgroundIntensity),
        null !== t.overrideMaterial &&
          (this.overrideMaterial = t.overrideMaterial.clone()),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this
      );
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        null !== this.fog && (e.object.fog = this.fog.toJSON()),
        this.backgroundBlurriness > 0 &&
          (e.object.backgroundBlurriness = this.backgroundBlurriness),
        1 !== this.backgroundIntensity &&
          (e.object.backgroundIntensity = this.backgroundIntensity),
        e
      );
    }
  }
  class Ys extends hi {
    constructor(t) {
      super(),
        (this.isLineBasicMaterial = !0),
        (this.type = "LineBasicMaterial"),
        (this.color = new ai(16777215)),
        (this.map = null),
        (this.linewidth = 1),
        (this.linecap = "round"),
        (this.linejoin = "round"),
        (this.fog = !0),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.linewidth = t.linewidth),
        (this.linecap = t.linecap),
        (this.linejoin = t.linejoin),
        (this.fog = t.fog),
        this
      );
    }
  }
  const Ks = new Ht(),
    Zs = new Ht(),
    Js = new ve(),
    Qs = new _e(),
    $s = new he();
  class ta extends Ge {
    constructor(t = new Ei(), e = new Ys()) {
      super(),
        (this.isLine = !0),
        (this.type = "Line"),
        (this.geometry = t),
        (this.material = e),
        this.updateMorphTargets();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.material = Array.isArray(t.material)
          ? t.material.slice()
          : t.material),
        (this.geometry = t.geometry),
        this
      );
    }
    computeLineDistances() {
      const t = this.geometry;
      if (null === t.index) {
        const e = t.attributes.position,
          i = [0];
        for (let t = 1, n = e.count; t < n; t++)
          Ks.fromBufferAttribute(e, t - 1),
            Zs.fromBufferAttribute(e, t),
            (i[t] = i[t - 1]),
            (i[t] += Ks.distanceTo(Zs));
        t.setAttribute("lineDistance", new gi(i, 1));
      } else
        console.warn(
          "THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
        );
      return this;
    }
    raycast(t, e) {
      const i = this.geometry,
        n = this.matrixWorld,
        r = t.params.Line.threshold,
        s = i.drawRange;
      if (
        (null === i.boundingSphere && i.computeBoundingSphere(),
        $s.copy(i.boundingSphere),
        $s.applyMatrix4(n),
        ($s.radius += r),
        !1 === t.ray.intersectsSphere($s))
      )
        return;
      Js.copy(n).invert(), Qs.copy(t.ray).applyMatrix4(Js);
      const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        o = a * a,
        l = new Ht(),
        h = new Ht(),
        c = new Ht(),
        d = new Ht(),
        u = this.isLineSegments ? 2 : 1,
        p = i.index,
        m = i.attributes.position;
      if (null !== p)
        for (
          let i = Math.max(0, s.start),
            n = Math.min(p.count, s.start + s.count) - 1;
          i < n;
          i += u
        ) {
          const n = p.getX(i),
            r = p.getX(i + 1);
          if (
            (l.fromBufferAttribute(m, n),
            h.fromBufferAttribute(m, r),
            Qs.distanceSqToSegment(l, h, d, c) > o)
          )
            continue;
          d.applyMatrix4(this.matrixWorld);
          const s = t.ray.origin.distanceTo(d);
          s < t.near ||
            s > t.far ||
            e.push({
              distance: s,
              point: c.clone().applyMatrix4(this.matrixWorld),
              index: i,
              face: null,
              faceIndex: null,
              object: this,
            });
        }
      else
        for (
          let i = Math.max(0, s.start),
            n = Math.min(m.count, s.start + s.count) - 1;
          i < n;
          i += u
        ) {
          if (
            (l.fromBufferAttribute(m, i),
            h.fromBufferAttribute(m, i + 1),
            Qs.distanceSqToSegment(l, h, d, c) > o)
          )
            continue;
          d.applyMatrix4(this.matrixWorld);
          const n = t.ray.origin.distanceTo(d);
          n < t.near ||
            n > t.far ||
            e.push({
              distance: n,
              point: c.clone().applyMatrix4(this.matrixWorld),
              index: i,
              face: null,
              faceIndex: null,
              object: this,
            });
        }
    }
    updateMorphTargets() {
      const t = this.geometry.morphAttributes,
        e = Object.keys(t);
      if (e.length > 0) {
        const i = t[e[0]];
        if (void 0 !== i) {
          (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
          for (let t = 0, e = i.length; t < e; t++) {
            const e = i[t].name || String(t);
            this.morphTargetInfluences.push(0),
              (this.morphTargetDictionary[e] = t);
          }
        }
      }
    }
  }
  const ea = new Ht(),
    ia = new Ht();
  class na extends ta {
    constructor(t, e) {
      super(t, e), (this.isLineSegments = !0), (this.type = "LineSegments");
    }
    computeLineDistances() {
      const t = this.geometry;
      if (null === t.index) {
        const e = t.attributes.position,
          i = [];
        for (let t = 0, n = e.count; t < n; t += 2)
          ea.fromBufferAttribute(e, t),
            ia.fromBufferAttribute(e, t + 1),
            (i[t] = 0 === t ? 0 : i[t - 1]),
            (i[t + 1] = i[t] + ea.distanceTo(ia));
        t.setAttribute("lineDistance", new gi(i, 1));
      } else
        console.warn(
          "THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
        );
      return this;
    }
  }
  class ra extends hi {
    constructor(t) {
      super(),
        (this.isPointsMaterial = !0),
        (this.type = "PointsMaterial"),
        (this.color = new ai(16777215)),
        (this.map = null),
        (this.alphaMap = null),
        (this.size = 1),
        (this.sizeAttenuation = !0),
        (this.fog = !0),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.size = t.size),
        (this.sizeAttenuation = t.sizeAttenuation),
        (this.fog = t.fog),
        this
      );
    }
  }
  const sa = new ve(),
    aa = new _e(),
    oa = new he(),
    la = new Ht();
  class ha extends Ge {
    constructor(t = new Ei(), e = new ra()) {
      super(),
        (this.isPoints = !0),
        (this.type = "Points"),
        (this.geometry = t),
        (this.material = e),
        this.updateMorphTargets();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.material = Array.isArray(t.material)
          ? t.material.slice()
          : t.material),
        (this.geometry = t.geometry),
        this
      );
    }
    raycast(t, e) {
      const i = this.geometry,
        n = this.matrixWorld,
        r = t.params.Points.threshold,
        s = i.drawRange;
      if (
        (null === i.boundingSphere && i.computeBoundingSphere(),
        oa.copy(i.boundingSphere),
        oa.applyMatrix4(n),
        (oa.radius += r),
        !1 === t.ray.intersectsSphere(oa))
      )
        return;
      sa.copy(n).invert(), aa.copy(t.ray).applyMatrix4(sa);
      const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        o = a * a,
        l = i.index,
        h = i.attributes.position;
      if (null !== l)
        for (
          let i = Math.max(0, s.start),
            r = Math.min(l.count, s.start + s.count);
          i < r;
          i++
        ) {
          const r = l.getX(i);
          la.fromBufferAttribute(h, r), ca(la, r, o, n, t, e, this);
        }
      else
        for (
          let i = Math.max(0, s.start),
            r = Math.min(h.count, s.start + s.count);
          i < r;
          i++
        )
          la.fromBufferAttribute(h, i), ca(la, i, o, n, t, e, this);
    }
    updateMorphTargets() {
      const t = this.geometry.morphAttributes,
        e = Object.keys(t);
      if (e.length > 0) {
        const i = t[e[0]];
        if (void 0 !== i) {
          (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
          for (let t = 0, e = i.length; t < e; t++) {
            const e = i[t].name || String(t);
            this.morphTargetInfluences.push(0),
              (this.morphTargetDictionary[e] = t);
          }
        }
      }
    }
  }
  function ca(t, e, i, n, r, s, a) {
    const o = aa.distanceSqToPoint(t);
    if (o < i) {
      const i = new Ht();
      aa.closestPointToPoint(t, i), i.applyMatrix4(n);
      const l = r.ray.origin.distanceTo(i);
      if (l < r.near || l > r.far) return;
      s.push({
        distance: l,
        distanceToRay: Math.sqrt(o),
        point: i,
        index: e,
        face: null,
        object: a,
      });
    }
  }
  class da extends hi {
    constructor(t) {
      super(),
        (this.isMeshStandardMaterial = !0),
        (this.defines = { STANDARD: "" }),
        (this.type = "MeshStandardMaterial"),
        (this.color = new ai(16777215)),
        (this.roughness = 1),
        (this.metalness = 0),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new ai(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new mt(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.roughnessMap = null),
        (this.metalnessMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.envMapIntensity = 1),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.flatShading = !1),
        (this.fog = !0),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.defines = { STANDARD: "" }),
        this.color.copy(t.color),
        (this.roughness = t.roughness),
        (this.metalness = t.metalness),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.roughnessMap = t.roughnessMap),
        (this.metalnessMap = t.metalnessMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.envMapIntensity = t.envMapIntensity),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.flatShading = t.flatShading),
        (this.fog = t.fog),
        this
      );
    }
  }
  class ua extends da {
    constructor(t) {
      super(),
        (this.isMeshPhysicalMaterial = !0),
        (this.defines = { STANDARD: "", PHYSICAL: "" }),
        (this.type = "MeshPhysicalMaterial"),
        (this.anisotropyRotation = 0),
        (this.anisotropyMap = null),
        (this.clearcoatMap = null),
        (this.clearcoatRoughness = 0),
        (this.clearcoatRoughnessMap = null),
        (this.clearcoatNormalScale = new mt(1, 1)),
        (this.clearcoatNormalMap = null),
        (this.ior = 1.5),
        Object.defineProperty(this, "reflectivity", {
          get: function () {
            return lt((2.5 * (this.ior - 1)) / (this.ior + 1), 0, 1);
          },
          set: function (t) {
            this.ior = (1 + 0.4 * t) / (1 - 0.4 * t);
          },
        }),
        (this.iridescenceMap = null),
        (this.iridescenceIOR = 1.3),
        (this.iridescenceThicknessRange = [100, 400]),
        (this.iridescenceThicknessMap = null),
        (this.sheenColor = new ai(0)),
        (this.sheenColorMap = null),
        (this.sheenRoughness = 1),
        (this.sheenRoughnessMap = null),
        (this.transmissionMap = null),
        (this.thickness = 0),
        (this.thicknessMap = null),
        (this.attenuationDistance = 1 / 0),
        (this.attenuationColor = new ai(1, 1, 1)),
        (this.specularIntensity = 1),
        (this.specularIntensityMap = null),
        (this.specularColor = new ai(1, 1, 1)),
        (this.specularColorMap = null),
        (this._anisotropy = 0),
        (this._clearcoat = 0),
        (this._iridescence = 0),
        (this._sheen = 0),
        (this._transmission = 0),
        this.setValues(t);
    }
    get anisotropy() {
      return this._anisotropy;
    }
    set anisotropy(t) {
      this._anisotropy > 0 != t > 0 && this.version++, (this._anisotropy = t);
    }
    get clearcoat() {
      return this._clearcoat;
    }
    set clearcoat(t) {
      this._clearcoat > 0 != t > 0 && this.version++, (this._clearcoat = t);
    }
    get iridescence() {
      return this._iridescence;
    }
    set iridescence(t) {
      this._iridescence > 0 != t > 0 && this.version++, (this._iridescence = t);
    }
    get sheen() {
      return this._sheen;
    }
    set sheen(t) {
      this._sheen > 0 != t > 0 && this.version++, (this._sheen = t);
    }
    get transmission() {
      return this._transmission;
    }
    set transmission(t) {
      this._transmission > 0 != t > 0 && this.version++,
        (this._transmission = t);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.defines = { STANDARD: "", PHYSICAL: "" }),
        (this.anisotropy = t.anisotropy),
        (this.anisotropyRotation = t.anisotropyRotation),
        (this.anisotropyMap = t.anisotropyMap),
        (this.clearcoat = t.clearcoat),
        (this.clearcoatMap = t.clearcoatMap),
        (this.clearcoatRoughness = t.clearcoatRoughness),
        (this.clearcoatRoughnessMap = t.clearcoatRoughnessMap),
        (this.clearcoatNormalMap = t.clearcoatNormalMap),
        this.clearcoatNormalScale.copy(t.clearcoatNormalScale),
        (this.ior = t.ior),
        (this.iridescence = t.iridescence),
        (this.iridescenceMap = t.iridescenceMap),
        (this.iridescenceIOR = t.iridescenceIOR),
        (this.iridescenceThicknessRange = [...t.iridescenceThicknessRange]),
        (this.iridescenceThicknessMap = t.iridescenceThicknessMap),
        (this.sheen = t.sheen),
        this.sheenColor.copy(t.sheenColor),
        (this.sheenColorMap = t.sheenColorMap),
        (this.sheenRoughness = t.sheenRoughness),
        (this.sheenRoughnessMap = t.sheenRoughnessMap),
        (this.transmission = t.transmission),
        (this.transmissionMap = t.transmissionMap),
        (this.thickness = t.thickness),
        (this.thicknessMap = t.thicknessMap),
        (this.attenuationDistance = t.attenuationDistance),
        this.attenuationColor.copy(t.attenuationColor),
        (this.specularIntensity = t.specularIntensity),
        (this.specularIntensityMap = t.specularIntensityMap),
        this.specularColor.copy(t.specularColor),
        (this.specularColorMap = t.specularColorMap),
        this
      );
    }
  }
  class pa extends hi {
    constructor(t) {
      super(),
        (this.isMeshPhongMaterial = !0),
        (this.type = "MeshPhongMaterial"),
        (this.color = new ai(16777215)),
        (this.specular = new ai(1118481)),
        (this.shininess = 30),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new ai(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new mt(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = s),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.flatShading = !1),
        (this.fog = !0),
        this.setValues(t);
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        this.specular.copy(t.specular),
        (this.shininess = t.shininess),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.flatShading = t.flatShading),
        (this.fog = t.fog),
        this
      );
    }
  }
  function ma(t, e, i) {
    return !t || (!i && t.constructor === e)
      ? t
      : "number" == typeof e.BYTES_PER_ELEMENT
      ? new e(t)
      : Array.prototype.slice.call(t);
  }
  class fa {
    constructor(t, e, i, n) {
      (this.parameterPositions = t),
        (this._cachedIndex = 0),
        (this.resultBuffer = void 0 !== n ? n : new e.constructor(i)),
        (this.sampleValues = e),
        (this.valueSize = i),
        (this.settings = null),
        (this.DefaultSettings_ = {});
    }
    evaluate(t) {
      const e = this.parameterPositions;
      let i = this._cachedIndex,
        n = e[i],
        r = e[i - 1];
      t: {
        e: {
          let s;
          i: {
            n: if (!(t < n)) {
              for (let s = i + 2; ; ) {
                if (void 0 === n) {
                  if (t < r) break n;
                  return (
                    (i = e.length),
                    (this._cachedIndex = i),
                    this.copySampleValue_(i - 1)
                  );
                }
                if (i === s) break;
                if (((r = n), (n = e[++i]), t < n)) break e;
              }
              s = e.length;
              break i;
            }
            if (t >= r) break t;
            {
              const a = e[1];
              t < a && ((i = 2), (r = a));
              for (let s = i - 2; ; ) {
                if (void 0 === r)
                  return (this._cachedIndex = 0), this.copySampleValue_(0);
                if (i === s) break;
                if (((n = r), (r = e[--i - 1]), t >= r)) break e;
              }
              (s = i), (i = 0);
            }
          }
          for (; i < s; ) {
            const n = (i + s) >>> 1;
            t < e[n] ? (s = n) : (i = n + 1);
          }
          if (((n = e[i]), (r = e[i - 1]), void 0 === r))
            return (this._cachedIndex = 0), this.copySampleValue_(0);
          if (void 0 === n)
            return (
              (i = e.length),
              (this._cachedIndex = i),
              this.copySampleValue_(i - 1)
            );
        }
        (this._cachedIndex = i), this.intervalChanged_(i, r, n);
      }
      return this.interpolate_(i, r, t, n);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(t) {
      const e = this.resultBuffer,
        i = this.sampleValues,
        n = this.valueSize,
        r = t * n;
      for (let t = 0; t !== n; ++t) e[t] = i[r + t];
      return e;
    }
    interpolate_() {
      throw new Error("call to abstract method");
    }
    intervalChanged_() {}
  }
  class ga extends fa {
    constructor(t, e, i, n) {
      super(t, e, i, n),
        (this._weightPrev = -0),
        (this._offsetPrev = -0),
        (this._weightNext = -0),
        (this._offsetNext = -0),
        (this.DefaultSettings_ = { endingStart: 2400, endingEnd: 2400 });
    }
    intervalChanged_(t, e, i) {
      const n = this.parameterPositions;
      let r = t - 2,
        s = t + 1,
        a = n[r],
        o = n[s];
      if (void 0 === a)
        switch (this.getSettings_().endingStart) {
          case 2401:
            (r = t), (a = 2 * e - i);
            break;
          case 2402:
            (r = n.length - 2), (a = e + n[r] - n[r + 1]);
            break;
          default:
            (r = t), (a = i);
        }
      if (void 0 === o)
        switch (this.getSettings_().endingEnd) {
          case 2401:
            (s = t), (o = 2 * i - e);
            break;
          case 2402:
            (s = 1), (o = i + n[1] - n[0]);
            break;
          default:
            (s = t - 1), (o = e);
        }
      const l = 0.5 * (i - e),
        h = this.valueSize;
      (this._weightPrev = l / (e - a)),
        (this._weightNext = l / (o - i)),
        (this._offsetPrev = r * h),
        (this._offsetNext = s * h);
    }
    interpolate_(t, e, i, n) {
      const r = this.resultBuffer,
        s = this.sampleValues,
        a = this.valueSize,
        o = t * a,
        l = o - a,
        h = this._offsetPrev,
        c = this._offsetNext,
        d = this._weightPrev,
        u = this._weightNext,
        p = (i - e) / (n - e),
        m = p * p,
        f = m * p,
        g = -d * f + 2 * d * m - d * p,
        _ = (1 + d) * f + (-1.5 - 2 * d) * m + (-0.5 + d) * p + 1,
        v = (-1 - u) * f + (1.5 + u) * m + 0.5 * p,
        x = u * f - u * m;
      for (let t = 0; t !== a; ++t)
        r[t] = g * s[h + t] + _ * s[l + t] + v * s[o + t] + x * s[c + t];
      return r;
    }
  }
  class _a extends fa {
    constructor(t, e, i, n) {
      super(t, e, i, n);
    }
    interpolate_(t, e, i, n) {
      const r = this.resultBuffer,
        s = this.sampleValues,
        a = this.valueSize,
        o = t * a,
        l = o - a,
        h = (i - e) / (n - e),
        c = 1 - h;
      for (let t = 0; t !== a; ++t) r[t] = s[l + t] * c + s[o + t] * h;
      return r;
    }
  }
  class va extends fa {
    constructor(t, e, i, n) {
      super(t, e, i, n);
    }
    interpolate_(t) {
      return this.copySampleValue_(t - 1);
    }
  }
  class xa {
    constructor(t, e, i, n) {
      if (void 0 === t)
        throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (void 0 === e || 0 === e.length)
        throw new Error(
          "THREE.KeyframeTrack: no keyframes in track named " + t
        );
      (this.name = t),
        (this.times = ma(e, this.TimeBufferType)),
        (this.values = ma(i, this.ValueBufferType)),
        this.setInterpolation(n || this.DefaultInterpolation);
    }
    static toJSON(t) {
      const e = t.constructor;
      let i;
      if (e.toJSON !== this.toJSON) i = e.toJSON(t);
      else {
        i = {
          name: t.name,
          times: ma(t.times, Array),
          values: ma(t.values, Array),
        };
        const e = t.getInterpolation();
        e !== t.DefaultInterpolation && (i.interpolation = e);
      }
      return (i.type = t.ValueTypeName), i;
    }
    InterpolantFactoryMethodDiscrete(t) {
      return new va(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodLinear(t) {
      return new _a(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodSmooth(t) {
      return new ga(this.times, this.values, this.getValueSize(), t);
    }
    setInterpolation(t) {
      let e;
      switch (t) {
        case B:
          e = this.InterpolantFactoryMethodDiscrete;
          break;
        case k:
          e = this.InterpolantFactoryMethodLinear;
          break;
        case V:
          e = this.InterpolantFactoryMethodSmooth;
      }
      if (void 0 === e) {
        const e =
          "unsupported interpolation for " +
          this.ValueTypeName +
          " keyframe track named " +
          this.name;
        if (void 0 === this.createInterpolant) {
          if (t === this.DefaultInterpolation) throw new Error(e);
          this.setInterpolation(this.DefaultInterpolation);
        }
        return console.warn("THREE.KeyframeTrack:", e), this;
      }
      return (this.createInterpolant = e), this;
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return B;
        case this.InterpolantFactoryMethodLinear:
          return k;
        case this.InterpolantFactoryMethodSmooth:
          return V;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(t) {
      if (0 !== t) {
        const e = this.times;
        for (let i = 0, n = e.length; i !== n; ++i) e[i] += t;
      }
      return this;
    }
    scale(t) {
      if (1 !== t) {
        const e = this.times;
        for (let i = 0, n = e.length; i !== n; ++i) e[i] *= t;
      }
      return this;
    }
    trim(t, e) {
      const i = this.times,
        n = i.length;
      let r = 0,
        s = n - 1;
      for (; r !== n && i[r] < t; ) ++r;
      for (; -1 !== s && i[s] > e; ) --s;
      if ((++s, 0 !== r || s !== n)) {
        r >= s && ((s = Math.max(s, 1)), (r = s - 1));
        const t = this.getValueSize();
        (this.times = i.slice(r, s)),
          (this.values = this.values.slice(r * t, s * t));
      }
      return this;
    }
    validate() {
      let t = !0;
      const e = this.getValueSize();
      e - Math.floor(e) != 0 &&
        (console.error(
          "THREE.KeyframeTrack: Invalid value size in track.",
          this
        ),
        (t = !1));
      const i = this.times,
        n = this.values,
        r = i.length;
      0 === r &&
        (console.error("THREE.KeyframeTrack: Track is empty.", this), (t = !1));
      let s = null;
      for (let e = 0; e !== r; e++) {
        const n = i[e];
        if ("number" == typeof n && isNaN(n)) {
          console.error(
            "THREE.KeyframeTrack: Time is not a valid number.",
            this,
            e,
            n
          ),
            (t = !1);
          break;
        }
        if (null !== s && s > n) {
          console.error(
            "THREE.KeyframeTrack: Out of order keys.",
            this,
            e,
            n,
            s
          ),
            (t = !1);
          break;
        }
        s = n;
      }
      if (
        void 0 !== n &&
        ((a = n), ArrayBuffer.isView(a) && !(a instanceof DataView))
      )
        for (let e = 0, i = n.length; e !== i; ++e) {
          const i = n[e];
          if (isNaN(i)) {
            console.error(
              "THREE.KeyframeTrack: Value is not a valid number.",
              this,
              e,
              i
            ),
              (t = !1);
            break;
          }
        }
      var a;
      return t;
    }
    optimize() {
      const t = this.times.slice(),
        e = this.values.slice(),
        i = this.getValueSize(),
        n = this.getInterpolation() === V,
        r = t.length - 1;
      let s = 1;
      for (let a = 1; a < r; ++a) {
        let r = !1;
        const o = t[a];
        if (o !== t[a + 1] && (1 !== a || o !== t[0]))
          if (n) r = !0;
          else {
            const t = a * i,
              n = t - i,
              s = t + i;
            for (let a = 0; a !== i; ++a) {
              const i = e[t + a];
              if (i !== e[n + a] || i !== e[s + a]) {
                r = !0;
                break;
              }
            }
          }
        if (r) {
          if (a !== s) {
            t[s] = t[a];
            const n = a * i,
              r = s * i;
            for (let t = 0; t !== i; ++t) e[r + t] = e[n + t];
          }
          ++s;
        }
      }
      if (r > 0) {
        t[s] = t[r];
        for (let t = r * i, n = s * i, a = 0; a !== i; ++a) e[n + a] = e[t + a];
        ++s;
      }
      return (
        s !== t.length
          ? ((this.times = t.slice(0, s)), (this.values = e.slice(0, s * i)))
          : ((this.times = t), (this.values = e)),
        this
      );
    }
    clone() {
      const t = this.times.slice(),
        e = this.values.slice(),
        i = new (0, this.constructor)(this.name, t, e);
      return (i.createInterpolant = this.createInterpolant), i;
    }
  }
  (xa.prototype.TimeBufferType = Float32Array),
    (xa.prototype.ValueBufferType = Float32Array),
    (xa.prototype.DefaultInterpolation = k);
  class ya extends xa {}
  (ya.prototype.ValueTypeName = "bool"),
    (ya.prototype.ValueBufferType = Array),
    (ya.prototype.DefaultInterpolation = B),
    (ya.prototype.InterpolantFactoryMethodLinear = void 0),
    (ya.prototype.InterpolantFactoryMethodSmooth = void 0);
  (class extends xa {}).prototype.ValueTypeName = "color";
  (class extends xa {}).prototype.ValueTypeName = "number";
  class Ma extends fa {
    constructor(t, e, i, n) {
      super(t, e, i, n);
    }
    interpolate_(t, e, i, n) {
      const r = this.resultBuffer,
        s = this.sampleValues,
        a = this.valueSize,
        o = (i - e) / (n - e);
      let l = t * a;
      for (let t = l + a; l !== t; l += 4)
        Vt.slerpFlat(r, 0, s, l - a, s, l, o);
      return r;
    }
  }
  class Sa extends xa {
    InterpolantFactoryMethodLinear(t) {
      return new Ma(this.times, this.values, this.getValueSize(), t);
    }
  }
  (Sa.prototype.ValueTypeName = "quaternion"),
    (Sa.prototype.DefaultInterpolation = k),
    (Sa.prototype.InterpolantFactoryMethodSmooth = void 0);
  class ba extends xa {}
  (ba.prototype.ValueTypeName = "string"),
    (ba.prototype.ValueBufferType = Array),
    (ba.prototype.DefaultInterpolation = B),
    (ba.prototype.InterpolantFactoryMethodLinear = void 0),
    (ba.prototype.InterpolantFactoryMethodSmooth = void 0);
  (class extends xa {}).prototype.ValueTypeName = "vector";
  const Ea = {
    enabled: !1,
    files: {},
    add: function (t, e) {
      !1 !== this.enabled && (this.files[t] = e);
    },
    get: function (t) {
      if (!1 !== this.enabled) return this.files[t];
    },
    remove: function (t) {
      delete this.files[t];
    },
    clear: function () {
      this.files = {};
    },
  };
  class Ta {
    constructor(t, e, i) {
      const n = this;
      let r,
        s = !1,
        a = 0,
        o = 0;
      const l = [];
      (this.onStart = void 0),
        (this.onLoad = t),
        (this.onProgress = e),
        (this.onError = i),
        (this.itemStart = function (t) {
          o++, !1 === s && void 0 !== n.onStart && n.onStart(t, a, o), (s = !0);
        }),
        (this.itemEnd = function (t) {
          a++,
            void 0 !== n.onProgress && n.onProgress(t, a, o),
            a === o && ((s = !1), void 0 !== n.onLoad && n.onLoad());
        }),
        (this.itemError = function (t) {
          void 0 !== n.onError && n.onError(t);
        }),
        (this.resolveURL = function (t) {
          return r ? r(t) : t;
        }),
        (this.setURLModifier = function (t) {
          return (r = t), this;
        }),
        (this.addHandler = function (t, e) {
          return l.push(t, e), this;
        }),
        (this.removeHandler = function (t) {
          const e = l.indexOf(t);
          return -1 !== e && l.splice(e, 2), this;
        }),
        (this.getHandler = function (t) {
          for (let e = 0, i = l.length; e < i; e += 2) {
            const i = l[e],
              n = l[e + 1];
            if ((i.global && (i.lastIndex = 0), i.test(t))) return n;
          }
          return null;
        });
    }
  }
  const wa = new Ta();
  class Aa {
    constructor(t) {
      (this.manager = void 0 !== t ? t : wa),
        (this.crossOrigin = "anonymous"),
        (this.withCredentials = !1),
        (this.path = ""),
        (this.resourcePath = ""),
        (this.requestHeader = {});
    }
    load() {}
    loadAsync(t, e) {
      const i = this;
      return new Promise(function (n, r) {
        i.load(t, n, e, r);
      });
    }
    parse() {}
    setCrossOrigin(t) {
      return (this.crossOrigin = t), this;
    }
    setWithCredentials(t) {
      return (this.withCredentials = t), this;
    }
    setPath(t) {
      return (this.path = t), this;
    }
    setResourcePath(t) {
      return (this.resourcePath = t), this;
    }
    setRequestHeader(t) {
      return (this.requestHeader = t), this;
    }
  }
  Aa.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  const Ra = {};
  class Ca extends Error {
    constructor(t, e) {
      super(t), (this.response = e);
    }
  }
  class La extends Aa {
    constructor(t) {
      super(t);
    }
    load(t, e, i, n) {
      void 0 === t && (t = ""),
        void 0 !== this.path && (t = this.path + t),
        (t = this.manager.resolveURL(t));
      const r = Ea.get(t);
      if (void 0 !== r)
        return (
          this.manager.itemStart(t),
          setTimeout(() => {
            e && e(r), this.manager.itemEnd(t);
          }, 0),
          r
        );
      if (void 0 !== Ra[t])
        return void Ra[t].push({ onLoad: e, onProgress: i, onError: n });
      (Ra[t] = []), Ra[t].push({ onLoad: e, onProgress: i, onError: n });
      const s = new Request(t, {
          headers: new Headers(this.requestHeader),
          credentials: this.withCredentials ? "include" : "same-origin",
        }),
        a = this.mimeType,
        o = this.responseType;
      fetch(s)
        .then((e) => {
          if (200 === e.status || 0 === e.status) {
            if (
              (0 === e.status &&
                console.warn("THREE.FileLoader: HTTP Status 0 received."),
              "undefined" == typeof ReadableStream ||
                void 0 === e.body ||
                void 0 === e.body.getReader)
            )
              return e;
            const i = Ra[t],
              n = e.body.getReader(),
              r =
                e.headers.get("Content-Length") || e.headers.get("X-File-Size"),
              s = r ? parseInt(r) : 0,
              a = 0 !== s;
            let o = 0;
            const l = new ReadableStream({
              start(t) {
                !(function e() {
                  n.read().then(({ done: n, value: r }) => {
                    if (n) t.close();
                    else {
                      o += r.byteLength;
                      const n = new ProgressEvent("progress", {
                        lengthComputable: a,
                        loaded: o,
                        total: s,
                      });
                      for (let t = 0, e = i.length; t < e; t++) {
                        const e = i[t];
                        e.onProgress && e.onProgress(n);
                      }
                      t.enqueue(r), e();
                    }
                  });
                })();
              },
            });
            return new Response(l);
          }
          throw new Ca(
            `fetch for "${e.url}" responded with ${e.status}: ${e.statusText}`,
            e
          );
        })
        .then((t) => {
          switch (o) {
            case "arraybuffer":
              return t.arrayBuffer();
            case "blob":
              return t.blob();
            case "document":
              return t
                .text()
                .then((t) => new DOMParser().parseFromString(t, a));
            case "json":
              return t.json();
            default:
              if (void 0 === a) return t.text();
              {
                const e = /charset="?([^;"\s]*)"?/i.exec(a),
                  i = e && e[1] ? e[1].toLowerCase() : void 0,
                  n = new TextDecoder(i);
                return t.arrayBuffer().then((t) => n.decode(t));
              }
          }
        })
        .then((e) => {
          Ea.add(t, e);
          const i = Ra[t];
          delete Ra[t];
          for (let t = 0, n = i.length; t < n; t++) {
            const n = i[t];
            n.onLoad && n.onLoad(e);
          }
        })
        .catch((e) => {
          const i = Ra[t];
          if (void 0 === i) throw (this.manager.itemError(t), e);
          delete Ra[t];
          for (let t = 0, n = i.length; t < n; t++) {
            const n = i[t];
            n.onError && n.onError(e);
          }
          this.manager.itemError(t);
        })
        .finally(() => {
          this.manager.itemEnd(t);
        }),
        this.manager.itemStart(t);
    }
    setResponseType(t) {
      return (this.responseType = t), this;
    }
    setMimeType(t) {
      return (this.mimeType = t), this;
    }
  }
  class Pa extends Aa {
    constructor(t) {
      super(t);
    }
    load(t, e, i, n) {
      void 0 !== this.path && (t = this.path + t),
        (t = this.manager.resolveURL(t));
      const r = this,
        s = Ea.get(t);
      if (void 0 !== s)
        return (
          r.manager.itemStart(t),
          setTimeout(function () {
            e && e(s), r.manager.itemEnd(t);
          }, 0),
          s
        );
      const a = vt("img");
      function o() {
        h(), Ea.add(t, this), e && e(this), r.manager.itemEnd(t);
      }
      function l(e) {
        h(), n && n(e), r.manager.itemError(t), r.manager.itemEnd(t);
      }
      function h() {
        a.removeEventListener("load", o, !1),
          a.removeEventListener("error", l, !1);
      }
      return (
        a.addEventListener("load", o, !1),
        a.addEventListener("error", l, !1),
        "data:" !== t.slice(0, 5) &&
          void 0 !== this.crossOrigin &&
          (a.crossOrigin = this.crossOrigin),
        r.manager.itemStart(t),
        (a.src = t),
        a
      );
    }
  }
  class Ua extends Aa {
    constructor(t) {
      super(t);
    }
    load(t, e, i, n) {
      const r = new Nt(),
        s = new Pa(this.manager);
      return (
        s.setCrossOrigin(this.crossOrigin),
        s.setPath(this.path),
        s.load(
          t,
          function (t) {
            (r.image = t), (r.needsUpdate = !0), void 0 !== e && e(r);
          },
          i,
          n
        ),
        r
      );
    }
  }
  class Da extends Ge {
    constructor(t, e = 1) {
      super(),
        (this.isLight = !0),
        (this.type = "Light"),
        (this.color = new ai(t)),
        (this.intensity = e);
    }
    dispose() {}
    copy(t, e) {
      return (
        super.copy(t, e),
        this.color.copy(t.color),
        (this.intensity = t.intensity),
        this
      );
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        (e.object.color = this.color.getHex()),
        (e.object.intensity = this.intensity),
        void 0 !== this.groundColor &&
          (e.object.groundColor = this.groundColor.getHex()),
        void 0 !== this.distance && (e.object.distance = this.distance),
        void 0 !== this.angle && (e.object.angle = this.angle),
        void 0 !== this.decay && (e.object.decay = this.decay),
        void 0 !== this.penumbra && (e.object.penumbra = this.penumbra),
        void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()),
        e
      );
    }
  }
  const Ia = new ve(),
    Na = new Ht(),
    Oa = new Ht();
  class Fa {
    constructor(t) {
      (this.camera = t),
        (this.bias = 0),
        (this.normalBias = 0),
        (this.radius = 1),
        (this.blurSamples = 8),
        (this.mapSize = new mt(512, 512)),
        (this.map = null),
        (this.mapPass = null),
        (this.matrix = new ve()),
        (this.autoUpdate = !0),
        (this.needsUpdate = !1),
        (this._frustum = new hn()),
        (this._frameExtents = new mt(1, 1)),
        (this._viewportCount = 1),
        (this._viewports = [new Ot(0, 0, 1, 1)]);
    }
    getViewportCount() {
      return this._viewportCount;
    }
    getFrustum() {
      return this._frustum;
    }
    updateMatrices(t) {
      const e = this.camera,
        i = this.matrix;
      Na.setFromMatrixPosition(t.matrixWorld),
        e.position.copy(Na),
        Oa.setFromMatrixPosition(t.target.matrixWorld),
        e.lookAt(Oa),
        e.updateMatrixWorld(),
        Ia.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix(Ia),
        i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
        i.multiply(Ia);
    }
    getViewport(t) {
      return this._viewports[t];
    }
    getFrameExtents() {
      return this._frameExtents;
    }
    dispose() {
      this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
    }
    copy(t) {
      return (
        (this.camera = t.camera.clone()),
        (this.bias = t.bias),
        (this.radius = t.radius),
        this.mapSize.copy(t.mapSize),
        this
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      const t = {};
      return (
        0 !== this.bias && (t.bias = this.bias),
        0 !== this.normalBias && (t.normalBias = this.normalBias),
        1 !== this.radius && (t.radius = this.radius),
        (512 === this.mapSize.x && 512 === this.mapSize.y) ||
          (t.mapSize = this.mapSize.toArray()),
        (t.camera = this.camera.toJSON(!1).object),
        delete t.camera.matrix,
        t
      );
    }
  }
  const za = new ve(),
    Ba = new Ht(),
    ka = new Ht();
  class Va extends Fa {
    constructor() {
      super(new Ji(90, 1, 0.5, 500)),
        (this.isPointLightShadow = !0),
        (this._frameExtents = new mt(4, 2)),
        (this._viewportCount = 6),
        (this._viewports = [
          new Ot(2, 1, 1, 1),
          new Ot(0, 1, 1, 1),
          new Ot(3, 1, 1, 1),
          new Ot(1, 1, 1, 1),
          new Ot(3, 0, 1, 1),
          new Ot(1, 0, 1, 1),
        ]),
        (this._cubeDirections = [
          new Ht(1, 0, 0),
          new Ht(-1, 0, 0),
          new Ht(0, 0, 1),
          new Ht(0, 0, -1),
          new Ht(0, 1, 0),
          new Ht(0, -1, 0),
        ]),
        (this._cubeUps = [
          new Ht(0, 1, 0),
          new Ht(0, 1, 0),
          new Ht(0, 1, 0),
          new Ht(0, 1, 0),
          new Ht(0, 0, 1),
          new Ht(0, 0, -1),
        ]);
    }
    updateMatrices(t, e = 0) {
      const i = this.camera,
        n = this.matrix,
        r = t.distance || i.far;
      r !== i.far && ((i.far = r), i.updateProjectionMatrix()),
        Ba.setFromMatrixPosition(t.matrixWorld),
        i.position.copy(Ba),
        ka.copy(i.position),
        ka.add(this._cubeDirections[e]),
        i.up.copy(this._cubeUps[e]),
        i.lookAt(ka),
        i.updateMatrixWorld(),
        n.makeTranslation(-Ba.x, -Ba.y, -Ba.z),
        za.multiplyMatrices(i.projectionMatrix, i.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix(za);
    }
  }
  class Ha extends Da {
    constructor(t, e, i = 0, n = 2) {
      super(t, e),
        (this.isPointLight = !0),
        (this.type = "PointLight"),
        (this.distance = i),
        (this.decay = n),
        (this.shadow = new Va());
    }
    get power() {
      return 4 * this.intensity * Math.PI;
    }
    set power(t) {
      this.intensity = t / (4 * Math.PI);
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.distance = t.distance),
        (this.decay = t.decay),
        (this.shadow = t.shadow.clone()),
        this
      );
    }
  }
  class Ga extends Fa {
    constructor() {
      super(new bn(-5, 5, 5, -5, 0.5, 500)),
        (this.isDirectionalLightShadow = !0);
    }
  }
  class Wa extends Da {
    constructor(t, e) {
      super(t, e),
        (this.isDirectionalLight = !0),
        (this.type = "DirectionalLight"),
        this.position.copy(Ge.DEFAULT_UP),
        this.updateMatrix(),
        (this.target = new Ge()),
        (this.shadow = new Ga());
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(t) {
      return (
        super.copy(t),
        (this.target = t.target.clone()),
        (this.shadow = t.shadow.clone()),
        this
      );
    }
  }
  class ja extends Da {
    constructor(t, e) {
      super(t, e), (this.isAmbientLight = !0), (this.type = "AmbientLight");
    }
  }
  let Xa;
  class qa {
    static getContext() {
      return (
        void 0 === Xa &&
          (Xa = new (window.AudioContext || window.webkitAudioContext)()),
        Xa
      );
    }
    static setContext(t) {
      Xa = t;
    }
  }
  class Ya extends Aa {
    constructor(t) {
      super(t);
    }
    load(t, e, i, n) {
      const r = this,
        s = new La(this.manager);
      function a(e) {
        n ? n(e) : console.error(e), r.manager.itemError(t);
      }
      s.setResponseType("arraybuffer"),
        s.setPath(this.path),
        s.setRequestHeader(this.requestHeader),
        s.setWithCredentials(this.withCredentials),
        s.load(
          t,
          function (t) {
            try {
              const i = t.slice(0);
              qa.getContext()
                .decodeAudioData(i, function (t) {
                  e(t);
                })
                .catch(a);
            } catch (t) {
              a(t);
            }
          },
          i,
          n
        );
    }
  }
  class Ka {
    constructor(t = !0) {
      (this.autoStart = t),
        (this.startTime = 0),
        (this.oldTime = 0),
        (this.elapsedTime = 0),
        (this.running = !1);
    }
    start() {
      (this.startTime = Za()),
        (this.oldTime = this.startTime),
        (this.elapsedTime = 0),
        (this.running = !0);
    }
    stop() {
      this.getElapsedTime(), (this.running = !1), (this.autoStart = !1);
    }
    getElapsedTime() {
      return this.getDelta(), this.elapsedTime;
    }
    getDelta() {
      let t = 0;
      if (this.autoStart && !this.running) return this.start(), 0;
      if (this.running) {
        const e = Za();
        (t = (e - this.oldTime) / 1e3),
          (this.oldTime = e),
          (this.elapsedTime += t);
      }
      return t;
    }
  }
  function Za() {
    return ("undefined" == typeof performance ? Date : performance).now();
  }
  const Ja = new Ht(),
    Qa = new Vt(),
    $a = new Ht(),
    to = new Ht();
  class eo extends Ge {
    constructor() {
      super(),
        (this.type = "AudioListener"),
        (this.context = qa.getContext()),
        (this.gain = this.context.createGain()),
        this.gain.connect(this.context.destination),
        (this.filter = null),
        (this.timeDelta = 0),
        (this._clock = new Ka());
    }
    getInput() {
      return this.gain;
    }
    removeFilter() {
      return (
        null !== this.filter &&
          (this.gain.disconnect(this.filter),
          this.filter.disconnect(this.context.destination),
          this.gain.connect(this.context.destination),
          (this.filter = null)),
        this
      );
    }
    getFilter() {
      return this.filter;
    }
    setFilter(t) {
      return (
        null !== this.filter
          ? (this.gain.disconnect(this.filter),
            this.filter.disconnect(this.context.destination))
          : this.gain.disconnect(this.context.destination),
        (this.filter = t),
        this.gain.connect(this.filter),
        this.filter.connect(this.context.destination),
        this
      );
    }
    getMasterVolume() {
      return this.gain.gain.value;
    }
    setMasterVolume(t) {
      return (
        this.gain.gain.setTargetAtTime(t, this.context.currentTime, 0.01), this
      );
    }
    updateMatrixWorld(t) {
      super.updateMatrixWorld(t);
      const e = this.context.listener,
        i = this.up;
      if (
        ((this.timeDelta = this._clock.getDelta()),
        this.matrixWorld.decompose(Ja, Qa, $a),
        to.set(0, 0, -1).applyQuaternion(Qa),
        e.positionX)
      ) {
        const t = this.context.currentTime + this.timeDelta;
        e.positionX.linearRampToValueAtTime(Ja.x, t),
          e.positionY.linearRampToValueAtTime(Ja.y, t),
          e.positionZ.linearRampToValueAtTime(Ja.z, t),
          e.forwardX.linearRampToValueAtTime(to.x, t),
          e.forwardY.linearRampToValueAtTime(to.y, t),
          e.forwardZ.linearRampToValueAtTime(to.z, t),
          e.upX.linearRampToValueAtTime(i.x, t),
          e.upY.linearRampToValueAtTime(i.y, t),
          e.upZ.linearRampToValueAtTime(i.z, t);
      } else
        e.setPosition(Ja.x, Ja.y, Ja.z),
          e.setOrientation(to.x, to.y, to.z, i.x, i.y, i.z);
    }
  }
  class io extends Ge {
    constructor(t) {
      super(),
        (this.type = "Audio"),
        (this.listener = t),
        (this.context = t.context),
        (this.gain = this.context.createGain()),
        this.gain.connect(t.getInput()),
        (this.autoplay = !1),
        (this.buffer = null),
        (this.detune = 0),
        (this.loop = !1),
        (this.loopStart = 0),
        (this.loopEnd = 0),
        (this.offset = 0),
        (this.duration = void 0),
        (this.playbackRate = 1),
        (this.isPlaying = !1),
        (this.hasPlaybackControl = !0),
        (this.source = null),
        (this.sourceType = "empty"),
        (this._startedAt = 0),
        (this._progress = 0),
        (this._connected = !1),
        (this.filters = []);
    }
    getOutput() {
      return this.gain;
    }
    setNodeSource(t) {
      return (
        (this.hasPlaybackControl = !1),
        (this.sourceType = "audioNode"),
        (this.source = t),
        this.connect(),
        this
      );
    }
    setMediaElementSource(t) {
      return (
        (this.hasPlaybackControl = !1),
        (this.sourceType = "mediaNode"),
        (this.source = this.context.createMediaElementSource(t)),
        this.connect(),
        this
      );
    }
    setMediaStreamSource(t) {
      return (
        (this.hasPlaybackControl = !1),
        (this.sourceType = "mediaStreamNode"),
        (this.source = this.context.createMediaStreamSource(t)),
        this.connect(),
        this
      );
    }
    setBuffer(t) {
      return (
        (this.buffer = t),
        (this.sourceType = "buffer"),
        this.autoplay && this.play(),
        this
      );
    }
    play(t = 0) {
      if (!0 === this.isPlaying)
        return void console.warn("THREE.Audio: Audio is already playing.");
      if (!1 === this.hasPlaybackControl)
        return void console.warn(
          "THREE.Audio: this Audio has no playback control."
        );
      this._startedAt = this.context.currentTime + t;
      const e = this.context.createBufferSource();
      return (
        (e.buffer = this.buffer),
        (e.loop = this.loop),
        (e.loopStart = this.loopStart),
        (e.loopEnd = this.loopEnd),
        (e.onended = this.onEnded.bind(this)),
        e.start(this._startedAt, this._progress + this.offset, this.duration),
        (this.isPlaying = !0),
        (this.source = e),
        this.setDetune(this.detune),
        this.setPlaybackRate(this.playbackRate),
        this.connect()
      );
    }
    pause() {
      if (!1 !== this.hasPlaybackControl)
        return (
          !0 === this.isPlaying &&
            ((this._progress +=
              Math.max(this.context.currentTime - this._startedAt, 0) *
              this.playbackRate),
            !0 === this.loop &&
              (this._progress =
                this._progress % (this.duration || this.buffer.duration)),
            this.source.stop(),
            (this.source.onended = null),
            (this.isPlaying = !1)),
          this
        );
      console.warn("THREE.Audio: this Audio has no playback control.");
    }
    stop() {
      if (!1 !== this.hasPlaybackControl)
        return (
          (this._progress = 0),
          null !== this.source &&
            (this.source.stop(), (this.source.onended = null)),
          (this.isPlaying = !1),
          this
        );
      console.warn("THREE.Audio: this Audio has no playback control.");
    }
    connect() {
      if (this.filters.length > 0) {
        this.source.connect(this.filters[0]);
        for (let t = 1, e = this.filters.length; t < e; t++)
          this.filters[t - 1].connect(this.filters[t]);
        this.filters[this.filters.length - 1].connect(this.getOutput());
      } else this.source.connect(this.getOutput());
      return (this._connected = !0), this;
    }
    disconnect() {
      if (!1 !== this._connected) {
        if (this.filters.length > 0) {
          this.source.disconnect(this.filters[0]);
          for (let t = 1, e = this.filters.length; t < e; t++)
            this.filters[t - 1].disconnect(this.filters[t]);
          this.filters[this.filters.length - 1].disconnect(this.getOutput());
        } else this.source.disconnect(this.getOutput());
        return (this._connected = !1), this;
      }
    }
    getFilters() {
      return this.filters;
    }
    setFilters(t) {
      return (
        t || (t = []),
        !0 === this._connected
          ? (this.disconnect(), (this.filters = t.slice()), this.connect())
          : (this.filters = t.slice()),
        this
      );
    }
    setDetune(t) {
      if (((this.detune = t), void 0 !== this.source.detune))
        return (
          !0 === this.isPlaying &&
            this.source.detune.setTargetAtTime(
              this.detune,
              this.context.currentTime,
              0.01
            ),
          this
        );
    }
    getDetune() {
      return this.detune;
    }
    getFilter() {
      return this.getFilters()[0];
    }
    setFilter(t) {
      return this.setFilters(t ? [t] : []);
    }
    setPlaybackRate(t) {
      if (!1 !== this.hasPlaybackControl)
        return (
          (this.playbackRate = t),
          !0 === this.isPlaying &&
            this.source.playbackRate.setTargetAtTime(
              this.playbackRate,
              this.context.currentTime,
              0.01
            ),
          this
        );
      console.warn("THREE.Audio: this Audio has no playback control.");
    }
    getPlaybackRate() {
      return this.playbackRate;
    }
    onEnded() {
      this.isPlaying = !1;
    }
    getLoop() {
      return !1 === this.hasPlaybackControl
        ? (console.warn("THREE.Audio: this Audio has no playback control."), !1)
        : this.loop;
    }
    setLoop(t) {
      if (!1 !== this.hasPlaybackControl)
        return (
          (this.loop = t),
          !0 === this.isPlaying && (this.source.loop = this.loop),
          this
        );
      console.warn("THREE.Audio: this Audio has no playback control.");
    }
    setLoopStart(t) {
      return (this.loopStart = t), this;
    }
    setLoopEnd(t) {
      return (this.loopEnd = t), this;
    }
    getVolume() {
      return this.gain.gain.value;
    }
    setVolume(t) {
      return (
        this.gain.gain.setTargetAtTime(t, this.context.currentTime, 0.01), this
      );
    }
  }
  const no = "\\[\\]\\.:\\/",
    ro = new RegExp("[" + no + "]", "g"),
    so = "[^" + no + "]",
    ao = "[^" + no.replace("\\.", "") + "]",
    oo = new RegExp(
      "^" +
        /((?:WC+[\/:])*)/.source.replace("WC", so) +
        /(WCOD+)?/.source.replace("WCOD", ao) +
        /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", so) +
        /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", so) +
        "$"
    ),
    lo = ["material", "materials", "bones", "map"];
  class ho {
    constructor(t, e, i) {
      (this.path = e),
        (this.parsedPath = i || ho.parseTrackName(e)),
        (this.node = ho.findNode(t, this.parsedPath.nodeName)),
        (this.rootNode = t),
        (this.getValue = this._getValue_unbound),
        (this.setValue = this._setValue_unbound);
    }
    static create(t, e, i) {
      return t && t.isAnimationObjectGroup
        ? new ho.Composite(t, e, i)
        : new ho(t, e, i);
    }
    static sanitizeNodeName(t) {
      return t.replace(/\s/g, "_").replace(ro, "");
    }
    static parseTrackName(t) {
      const e = oo.exec(t);
      if (null === e)
        throw new Error("PropertyBinding: Cannot parse trackName: " + t);
      const i = {
          nodeName: e[2],
          objectName: e[3],
          objectIndex: e[4],
          propertyName: e[5],
          propertyIndex: e[6],
        },
        n = i.nodeName && i.nodeName.lastIndexOf(".");
      if (void 0 !== n && -1 !== n) {
        const t = i.nodeName.substring(n + 1);
        -1 !== lo.indexOf(t) &&
          ((i.nodeName = i.nodeName.substring(0, n)), (i.objectName = t));
      }
      if (null === i.propertyName || 0 === i.propertyName.length)
        throw new Error(
          "PropertyBinding: can not parse propertyName from trackName: " + t
        );
      return i;
    }
    static findNode(t, e) {
      if (
        void 0 === e ||
        "" === e ||
        "." === e ||
        -1 === e ||
        e === t.name ||
        e === t.uuid
      )
        return t;
      if (t.skeleton) {
        const i = t.skeleton.getBoneByName(e);
        if (void 0 !== i) return i;
      }
      if (t.children) {
        const i = function (t) {
            for (let n = 0; n < t.length; n++) {
              const r = t[n];
              if (r.name === e || r.uuid === e) return r;
              const s = i(r.children);
              if (s) return s;
            }
            return null;
          },
          n = i(t.children);
        if (n) return n;
      }
      return null;
    }
    _getValue_unavailable() {}
    _setValue_unavailable() {}
    _getValue_direct(t, e) {
      t[e] = this.targetObject[this.propertyName];
    }
    _getValue_array(t, e) {
      const i = this.resolvedProperty;
      for (let n = 0, r = i.length; n !== r; ++n) t[e++] = i[n];
    }
    _getValue_arrayElement(t, e) {
      t[e] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(t, e) {
      this.resolvedProperty.toArray(t, e);
    }
    _setValue_direct(t, e) {
      this.targetObject[this.propertyName] = t[e];
    }
    _setValue_direct_setNeedsUpdate(t, e) {
      (this.targetObject[this.propertyName] = t[e]),
        (this.targetObject.needsUpdate = !0);
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
      (this.targetObject[this.propertyName] = t[e]),
        (this.targetObject.matrixWorldNeedsUpdate = !0);
    }
    _setValue_array(t, e) {
      const i = this.resolvedProperty;
      for (let n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
    }
    _setValue_array_setNeedsUpdate(t, e) {
      const i = this.resolvedProperty;
      for (let n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
      this.targetObject.needsUpdate = !0;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(t, e) {
      const i = this.resolvedProperty;
      for (let n = 0, r = i.length; n !== r; ++n) i[n] = t[e++];
      this.targetObject.matrixWorldNeedsUpdate = !0;
    }
    _setValue_arrayElement(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e];
    }
    _setValue_arrayElement_setNeedsUpdate(t, e) {
      (this.resolvedProperty[this.propertyIndex] = t[e]),
        (this.targetObject.needsUpdate = !0);
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
      (this.resolvedProperty[this.propertyIndex] = t[e]),
        (this.targetObject.matrixWorldNeedsUpdate = !0);
    }
    _setValue_fromArray(t, e) {
      this.resolvedProperty.fromArray(t, e);
    }
    _setValue_fromArray_setNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e),
        (this.targetObject.needsUpdate = !0);
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e),
        (this.targetObject.matrixWorldNeedsUpdate = !0);
    }
    _getValue_unbound(t, e) {
      this.bind(), this.getValue(t, e);
    }
    _setValue_unbound(t, e) {
      this.bind(), this.setValue(t, e);
    }
    bind() {
      let t = this.node;
      const e = this.parsedPath,
        i = e.objectName,
        n = e.propertyName;
      let r = e.propertyIndex;
      if (
        (t || ((t = ho.findNode(this.rootNode, e.nodeName)), (this.node = t)),
        (this.getValue = this._getValue_unavailable),
        (this.setValue = this._setValue_unavailable),
        !t)
      )
        return void console.warn(
          "THREE.PropertyBinding: No target node found for track: " +
            this.path +
            "."
        );
      if (i) {
        let n = e.objectIndex;
        switch (i) {
          case "materials":
            if (!t.material)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                this
              );
            if (!t.material.materials)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
                this
              );
            t = t.material.materials;
            break;
          case "bones":
            if (!t.skeleton)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",
                this
              );
            t = t.skeleton.bones;
            for (let e = 0; e < t.length; e++)
              if (t[e].name === n) {
                n = e;
                break;
              }
            break;
          case "map":
            if ("map" in t) {
              t = t.map;
              break;
            }
            if (!t.material)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                this
              );
            if (!t.material.map)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",
                this
              );
            t = t.material.map;
            break;
          default:
            if (void 0 === t[i])
              return void console.error(
                "THREE.PropertyBinding: Can not bind to objectName of node undefined.",
                this
              );
            t = t[i];
        }
        if (void 0 !== n) {
          if (void 0 === t[n])
            return void console.error(
              "THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
              this,
              t
            );
          t = t[n];
        }
      }
      const s = t[n];
      if (void 0 === s) {
        const i = e.nodeName;
        return void console.error(
          "THREE.PropertyBinding: Trying to update property for track: " +
            i +
            "." +
            n +
            " but it wasn't found.",
          t
        );
      }
      let a = this.Versioning.None;
      (this.targetObject = t),
        void 0 !== t.needsUpdate
          ? (a = this.Versioning.NeedsUpdate)
          : void 0 !== t.matrixWorldNeedsUpdate &&
            (a = this.Versioning.MatrixWorldNeedsUpdate);
      let o = this.BindingType.Direct;
      if (void 0 !== r) {
        if ("morphTargetInfluences" === n) {
          if (!t.geometry)
            return void console.error(
              "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
              this
            );
          if (!t.geometry.morphAttributes)
            return void console.error(
              "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
              this
            );
          void 0 !== t.morphTargetDictionary[r] &&
            (r = t.morphTargetDictionary[r]);
        }
        (o = this.BindingType.ArrayElement),
          (this.resolvedProperty = s),
          (this.propertyIndex = r);
      } else
        void 0 !== s.fromArray && void 0 !== s.toArray
          ? ((o = this.BindingType.HasFromToArray), (this.resolvedProperty = s))
          : Array.isArray(s)
          ? ((o = this.BindingType.EntireArray), (this.resolvedProperty = s))
          : (this.propertyName = n);
      (this.getValue = this.GetterByBindingType[o]),
        (this.setValue = this.SetterByBindingTypeAndVersioning[o][a]);
    }
    unbind() {
      (this.node = null),
        (this.getValue = this._getValue_unbound),
        (this.setValue = this._setValue_unbound);
    }
  }
  (ho.Composite = class {
    constructor(t, e, i) {
      const n = i || ho.parseTrackName(e);
      (this._targetGroup = t), (this._bindings = t.subscribe_(e, n));
    }
    getValue(t, e) {
      this.bind();
      const i = this._targetGroup.nCachedObjects_,
        n = this._bindings[i];
      void 0 !== n && n.getValue(t, e);
    }
    setValue(t, e) {
      const i = this._bindings;
      for (
        let n = this._targetGroup.nCachedObjects_, r = i.length;
        n !== r;
        ++n
      )
        i[n].setValue(t, e);
    }
    bind() {
      const t = this._bindings;
      for (
        let e = this._targetGroup.nCachedObjects_, i = t.length;
        e !== i;
        ++e
      )
        t[e].bind();
    }
    unbind() {
      const t = this._bindings;
      for (
        let e = this._targetGroup.nCachedObjects_, i = t.length;
        e !== i;
        ++e
      )
        t[e].unbind();
    }
  }),
    (ho.prototype.BindingType = {
      Direct: 0,
      EntireArray: 1,
      ArrayElement: 2,
      HasFromToArray: 3,
    }),
    (ho.prototype.Versioning = {
      None: 0,
      NeedsUpdate: 1,
      MatrixWorldNeedsUpdate: 2,
    }),
    (ho.prototype.GetterByBindingType = [
      ho.prototype._getValue_direct,
      ho.prototype._getValue_array,
      ho.prototype._getValue_arrayElement,
      ho.prototype._getValue_toArray,
    ]),
    (ho.prototype.SetterByBindingTypeAndVersioning = [
      [
        ho.prototype._setValue_direct,
        ho.prototype._setValue_direct_setNeedsUpdate,
        ho.prototype._setValue_direct_setMatrixWorldNeedsUpdate,
      ],
      [
        ho.prototype._setValue_array,
        ho.prototype._setValue_array_setNeedsUpdate,
        ho.prototype._setValue_array_setMatrixWorldNeedsUpdate,
      ],
      [
        ho.prototype._setValue_arrayElement,
        ho.prototype._setValue_arrayElement_setNeedsUpdate,
        ho.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate,
      ],
      [
        ho.prototype._setValue_fromArray,
        ho.prototype._setValue_fromArray_setNeedsUpdate,
        ho.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate,
      ],
    ]),
    new Float32Array(1),
    "undefined" != typeof __THREE_DEVTOOLS__ &&
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("register", { detail: { revision: t } })
      ),
    "undefined" != typeof window &&
      (window.__THREE__
        ? console.warn(
            "WARNING: Multiple instances of Three.js being imported."
          )
        : (window.__THREE__ = t));
  const co = new Re(0, 0, 0, "YXZ"),
    uo = new Ht(),
    po = { type: "change" },
    mo = { type: "lock" },
    fo = { type: "unlock" },
    go = Math.PI / 2;
  class _o extends nt {
    constructor(t, e) {
      super(),
        (this.camera = t),
        (this.domElement = e),
        (this.isLocked = !1),
        (this.minPolarAngle = 0),
        (this.maxPolarAngle = Math.PI),
        (this.pointerSpeed = 1),
        (this._onMouseMove = vo.bind(this)),
        (this._onPointerlockChange = xo.bind(this)),
        (this._onPointerlockError = yo.bind(this)),
        this.connect();
    }
    connect() {
      this.domElement.ownerDocument.addEventListener(
        "mousemove",
        this._onMouseMove
      ),
        this.domElement.ownerDocument.addEventListener(
          "pointerlockchange",
          this._onPointerlockChange
        ),
        this.domElement.ownerDocument.addEventListener(
          "pointerlockerror",
          this._onPointerlockError
        );
    }
    disconnect() {
      this.domElement.ownerDocument.removeEventListener(
        "mousemove",
        this._onMouseMove
      ),
        this.domElement.ownerDocument.removeEventListener(
          "pointerlockchange",
          this._onPointerlockChange
        ),
        this.domElement.ownerDocument.removeEventListener(
          "pointerlockerror",
          this._onPointerlockError
        );
    }
    dispose() {
      this.disconnect();
    }
    getObject() {
      return this.camera;
    }
    getDirection(t) {
      return t.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    }
    moveForward(t) {
      const e = this.camera;
      uo.setFromMatrixColumn(e.matrix, 0),
        uo.crossVectors(e.up, uo),
        e.position.addScaledVector(uo, t);
    }
    moveRight(t) {
      const e = this.camera;
      uo.setFromMatrixColumn(e.matrix, 0), e.position.addScaledVector(uo, t);
    }
    lock() {
      this.domElement.requestPointerLock();
    }
    unlock() {
      this.domElement.ownerDocument.exitPointerLock();
    }
  }
  function vo(t) {
    if (!1 === this.isLocked) return;
    const e = t.movementX || t.mozMovementX || t.webkitMovementX || 0,
      i = t.movementY || t.mozMovementY || t.webkitMovementY || 0,
      n = this.camera;
    co.setFromQuaternion(n.quaternion),
      (co.y -= 0.002 * e * this.pointerSpeed),
      (co.x -= 0.002 * i * this.pointerSpeed),
      (co.x = Math.max(
        go - this.maxPolarAngle,
        Math.min(go - this.minPolarAngle, co.x)
      )),
      n.quaternion.setFromEuler(co),
      this.dispatchEvent(po);
  }
  function xo() {
    this.domElement.ownerDocument.pointerLockElement === this.domElement
      ? (this.dispatchEvent(mo), (this.isLocked = !0))
      : (this.dispatchEvent(fo), (this.isLocked = !1));
  }
  function yo() {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  }
  const Mo = {
    name: "CopyShader",
    uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
    vertexShader:
      "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
    fragmentShader:
      "\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor = opacity * texel;\n\n\n\t\t}",
  };
  class So {
    constructor() {
      (this.isPass = !0),
        (this.enabled = !0),
        (this.needsSwap = !0),
        (this.clear = !1),
        (this.renderToScreen = !1);
    }
    setSize() {}
    render() {
      console.error(
        "THREE.Pass: .render() must be implemented in derived pass."
      );
    }
    dispose() {}
  }
  const bo = new bn(-1, 1, 1, -1, 0, 1),
    Eo = new (class extends Ei {
      constructor() {
        super(),
          this.setAttribute(
            "position",
            new gi([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)
          ),
          this.setAttribute("uv", new gi([0, 2, 0, 0, 2, 0], 2));
      }
    })();
  class To {
    constructor(t) {
      this._mesh = new Hi(Eo, t);
    }
    dispose() {
      this._mesh.geometry.dispose();
    }
    render(t) {
      t.render(this._mesh, bo);
    }
    get material() {
      return this._mesh.material;
    }
    set material(t) {
      this._mesh.material = t;
    }
  }
  class wo extends So {
    constructor(t, e) {
      super(),
        (this.textureID = void 0 !== e ? e : "tDiffuse"),
        t instanceof Ki
          ? ((this.uniforms = t.uniforms), (this.material = t))
          : t &&
            ((this.uniforms = Yi.clone(t.uniforms)),
            (this.material = new Ki({
              name: void 0 !== t.name ? t.name : "unspecified",
              defines: Object.assign({}, t.defines),
              uniforms: this.uniforms,
              vertexShader: t.vertexShader,
              fragmentShader: t.fragmentShader,
            }))),
        (this.fsQuad = new To(this.material));
    }
    render(t, e, i) {
      this.uniforms[this.textureID] &&
        (this.uniforms[this.textureID].value = i.texture),
        (this.fsQuad.material = this.material),
        this.renderToScreen
          ? (t.setRenderTarget(null), this.fsQuad.render(t))
          : (t.setRenderTarget(e),
            this.clear &&
              t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
            this.fsQuad.render(t));
    }
    dispose() {
      this.material.dispose(), this.fsQuad.dispose();
    }
  }
  class Ao extends So {
    constructor(t, e) {
      super(),
        (this.scene = t),
        (this.camera = e),
        (this.clear = !0),
        (this.needsSwap = !1),
        (this.inverse = !1);
    }
    render(t, e, i) {
      const n = t.getContext(),
        r = t.state;
      let s, a;
      r.buffers.color.setMask(!1),
        r.buffers.depth.setMask(!1),
        r.buffers.color.setLocked(!0),
        r.buffers.depth.setLocked(!0),
        this.inverse ? ((s = 0), (a = 1)) : ((s = 1), (a = 0)),
        r.buffers.stencil.setTest(!0),
        r.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE),
        r.buffers.stencil.setFunc(n.ALWAYS, s, 4294967295),
        r.buffers.stencil.setClear(a),
        r.buffers.stencil.setLocked(!0),
        t.setRenderTarget(i),
        this.clear && t.clear(),
        t.render(this.scene, this.camera),
        t.setRenderTarget(e),
        this.clear && t.clear(),
        t.render(this.scene, this.camera),
        r.buffers.color.setLocked(!1),
        r.buffers.depth.setLocked(!1),
        r.buffers.color.setMask(!0),
        r.buffers.depth.setMask(!0),
        r.buffers.stencil.setLocked(!1),
        r.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295),
        r.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP),
        r.buffers.stencil.setLocked(!0);
    }
  }
  class Ro extends So {
    constructor() {
      super(), (this.needsSwap = !1);
    }
    render(t) {
      t.state.buffers.stencil.setLocked(!1),
        t.state.buffers.stencil.setTest(!1);
    }
  }
  class Co {
    constructor(t, e) {
      if (
        ((this.renderer = t),
        (this._pixelRatio = t.getPixelRatio()),
        void 0 === e)
      ) {
        const i = t.getSize(new mt());
        (this._width = i.width),
          (this._height = i.height),
          ((e = new zt(
            this._width * this._pixelRatio,
            this._height * this._pixelRatio,
            { type: C }
          )).texture.name = "EffectComposer.rt1");
      } else (this._width = e.width), (this._height = e.height);
      (this.renderTarget1 = e),
        (this.renderTarget2 = e.clone()),
        (this.renderTarget2.texture.name = "EffectComposer.rt2"),
        (this.writeBuffer = this.renderTarget1),
        (this.readBuffer = this.renderTarget2),
        (this.renderToScreen = !0),
        (this.passes = []),
        (this.copyPass = new wo(Mo)),
        (this.copyPass.material.blending = 0),
        (this.clock = new Ka());
    }
    swapBuffers() {
      const t = this.readBuffer;
      (this.readBuffer = this.writeBuffer), (this.writeBuffer = t);
    }
    addPass(t) {
      this.passes.push(t),
        t.setSize(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio
        );
    }
    insertPass(t, e) {
      this.passes.splice(e, 0, t),
        t.setSize(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio
        );
    }
    removePass(t) {
      const e = this.passes.indexOf(t);
      -1 !== e && this.passes.splice(e, 1);
    }
    isLastEnabledPass(t) {
      for (let e = t + 1; e < this.passes.length; e++)
        if (this.passes[e].enabled) return !1;
      return !0;
    }
    render(t) {
      void 0 === t && (t = this.clock.getDelta());
      const e = this.renderer.getRenderTarget();
      let i = !1;
      for (let e = 0, n = this.passes.length; e < n; e++) {
        const n = this.passes[e];
        if (!1 !== n.enabled) {
          if (
            ((n.renderToScreen =
              this.renderToScreen && this.isLastEnabledPass(e)),
            n.render(this.renderer, this.writeBuffer, this.readBuffer, t, i),
            n.needsSwap)
          ) {
            if (i) {
              const e = this.renderer.getContext(),
                i = this.renderer.state.buffers.stencil;
              i.setFunc(e.NOTEQUAL, 1, 4294967295),
                this.copyPass.render(
                  this.renderer,
                  this.writeBuffer,
                  this.readBuffer,
                  t
                ),
                i.setFunc(e.EQUAL, 1, 4294967295);
            }
            this.swapBuffers();
          }
          void 0 !== Ao &&
            (n instanceof Ao ? (i = !0) : n instanceof Ro && (i = !1));
        }
      }
      this.renderer.setRenderTarget(e);
    }
    reset(t) {
      if (void 0 === t) {
        const e = this.renderer.getSize(new mt());
        (this._pixelRatio = this.renderer.getPixelRatio()),
          (this._width = e.width),
          (this._height = e.height),
          (t = this.renderTarget1.clone()).setSize(
            this._width * this._pixelRatio,
            this._height * this._pixelRatio
          );
      }
      this.renderTarget1.dispose(),
        this.renderTarget2.dispose(),
        (this.renderTarget1 = t),
        (this.renderTarget2 = t.clone()),
        (this.writeBuffer = this.renderTarget1),
        (this.readBuffer = this.renderTarget2);
    }
    setSize(t, e) {
      (this._width = t), (this._height = e);
      const i = this._width * this._pixelRatio,
        n = this._height * this._pixelRatio;
      this.renderTarget1.setSize(i, n), this.renderTarget2.setSize(i, n);
      for (let t = 0; t < this.passes.length; t++) this.passes[t].setSize(i, n);
    }
    setPixelRatio(t) {
      (this._pixelRatio = t), this.setSize(this._width, this._height);
    }
    dispose() {
      this.renderTarget1.dispose(),
        this.renderTarget2.dispose(),
        this.copyPass.dispose();
    }
  }
  class Lo extends So {
    constructor(t, e, i = null, n = null, r = null) {
      super(),
        (this.scene = t),
        (this.camera = e),
        (this.overrideMaterial = i),
        (this.clearColor = n),
        (this.clearAlpha = r),
        (this.clear = !0),
        (this.clearDepth = !1),
        (this.needsSwap = !1),
        (this._oldClearColor = new ai());
    }
    render(t, e, i) {
      const n = t.autoClear;
      let r, s;
      (t.autoClear = !1),
        null !== this.overrideMaterial &&
          ((s = this.scene.overrideMaterial),
          (this.scene.overrideMaterial = this.overrideMaterial)),
        null !== this.clearColor &&
          (t.getClearColor(this._oldClearColor),
          t.setClearColor(this.clearColor)),
        null !== this.clearAlpha &&
          ((r = t.getClearAlpha()), t.setClearAlpha(this.clearAlpha)),
        1 == this.clearDepth && t.clearDepth(),
        t.setRenderTarget(this.renderToScreen ? null : i),
        !0 === this.clear &&
          t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
        t.render(this.scene, this.camera),
        null !== this.clearColor && t.setClearColor(this._oldClearColor),
        null !== this.clearAlpha && t.setClearAlpha(r),
        null !== this.overrideMaterial && (this.scene.overrideMaterial = s),
        (t.autoClear = n);
    }
  }
  const Po = {
    name: "LuminosityHighPassShader",
    shaderID: "luminosityHighPass",
    uniforms: {
      tDiffuse: { value: null },
      luminosityThreshold: { value: 1 },
      smoothWidth: { value: 1 },
      defaultColor: { value: new ai(0) },
      defaultOpacity: { value: 0 },
    },
    vertexShader:
      "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
    fragmentShader:
      "\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}",
  };
  class Uo extends So {
    constructor(t, e, i, n) {
      super(),
        (this.strength = void 0 !== e ? e : 1),
        (this.radius = i),
        (this.threshold = n),
        (this.resolution = void 0 !== t ? new mt(t.x, t.y) : new mt(256, 256)),
        (this.clearColor = new ai(0, 0, 0)),
        (this.renderTargetsHorizontal = []),
        (this.renderTargetsVertical = []),
        (this.nMips = 5);
      let r = Math.round(this.resolution.x / 2),
        s = Math.round(this.resolution.y / 2);
      (this.renderTargetBright = new zt(r, s, { type: C })),
        (this.renderTargetBright.texture.name = "UnrealBloomPass.bright"),
        (this.renderTargetBright.texture.generateMipmaps = !1);
      for (let t = 0; t < this.nMips; t++) {
        const e = new zt(r, s, { type: C });
        (e.texture.name = "UnrealBloomPass.h" + t),
          (e.texture.generateMipmaps = !1),
          this.renderTargetsHorizontal.push(e);
        const i = new zt(r, s, { type: C });
        (i.texture.name = "UnrealBloomPass.v" + t),
          (i.texture.generateMipmaps = !1),
          this.renderTargetsVertical.push(i),
          (r = Math.round(r / 2)),
          (s = Math.round(s / 2));
      }
      const a = Po;
      (this.highPassUniforms = Yi.clone(a.uniforms)),
        (this.highPassUniforms.luminosityThreshold.value = n),
        (this.highPassUniforms.smoothWidth.value = 0.01),
        (this.materialHighPassFilter = new Ki({
          uniforms: this.highPassUniforms,
          vertexShader: a.vertexShader,
          fragmentShader: a.fragmentShader,
        })),
        (this.separableBlurMaterials = []);
      const o = [3, 5, 7, 9, 11];
      (r = Math.round(this.resolution.x / 2)),
        (s = Math.round(this.resolution.y / 2));
      for (let t = 0; t < this.nMips; t++)
        this.separableBlurMaterials.push(this.getSeperableBlurMaterial(o[t])),
          (this.separableBlurMaterials[t].uniforms.invSize.value = new mt(
            1 / r,
            1 / s
          )),
          (r = Math.round(r / 2)),
          (s = Math.round(s / 2));
      (this.compositeMaterial = this.getCompositeMaterial(this.nMips)),
        (this.compositeMaterial.uniforms.blurTexture1.value =
          this.renderTargetsVertical[0].texture),
        (this.compositeMaterial.uniforms.blurTexture2.value =
          this.renderTargetsVertical[1].texture),
        (this.compositeMaterial.uniforms.blurTexture3.value =
          this.renderTargetsVertical[2].texture),
        (this.compositeMaterial.uniforms.blurTexture4.value =
          this.renderTargetsVertical[3].texture),
        (this.compositeMaterial.uniforms.blurTexture5.value =
          this.renderTargetsVertical[4].texture),
        (this.compositeMaterial.uniforms.bloomStrength.value = e),
        (this.compositeMaterial.uniforms.bloomRadius.value = 0.1),
        (this.compositeMaterial.uniforms.bloomFactors.value = [
          1, 0.8, 0.6, 0.4, 0.2,
        ]),
        (this.bloomTintColors = [
          new Ht(1, 1, 1),
          new Ht(1, 1, 1),
          new Ht(1, 1, 1),
          new Ht(1, 1, 1),
          new Ht(1, 1, 1),
        ]),
        (this.compositeMaterial.uniforms.bloomTintColors.value =
          this.bloomTintColors);
      const l = Mo;
      (this.copyUniforms = Yi.clone(l.uniforms)),
        (this.blendMaterial = new Ki({
          uniforms: this.copyUniforms,
          vertexShader: l.vertexShader,
          fragmentShader: l.fragmentShader,
          blending: 2,
          depthTest: !1,
          depthWrite: !1,
          transparent: !0,
        })),
        (this.enabled = !0),
        (this.needsSwap = !1),
        (this._oldClearColor = new ai()),
        (this.oldClearAlpha = 1),
        (this.basic = new ci()),
        (this.fsQuad = new To(null));
    }
    dispose() {
      for (let t = 0; t < this.renderTargetsHorizontal.length; t++)
        this.renderTargetsHorizontal[t].dispose();
      for (let t = 0; t < this.renderTargetsVertical.length; t++)
        this.renderTargetsVertical[t].dispose();
      this.renderTargetBright.dispose();
      for (let t = 0; t < this.separableBlurMaterials.length; t++)
        this.separableBlurMaterials[t].dispose();
      this.compositeMaterial.dispose(),
        this.blendMaterial.dispose(),
        this.basic.dispose(),
        this.fsQuad.dispose();
    }
    setSize(t, e) {
      let i = Math.round(t / 2),
        n = Math.round(e / 2);
      this.renderTargetBright.setSize(i, n);
      for (let t = 0; t < this.nMips; t++)
        this.renderTargetsHorizontal[t].setSize(i, n),
          this.renderTargetsVertical[t].setSize(i, n),
          (this.separableBlurMaterials[t].uniforms.invSize.value = new mt(
            1 / i,
            1 / n
          )),
          (i = Math.round(i / 2)),
          (n = Math.round(n / 2));
    }
    render(t, e, i, n, r) {
      t.getClearColor(this._oldClearColor),
        (this.oldClearAlpha = t.getClearAlpha());
      const s = t.autoClear;
      (t.autoClear = !1),
        t.setClearColor(this.clearColor, 0),
        r && t.state.buffers.stencil.setTest(!1),
        this.renderToScreen &&
          ((this.fsQuad.material = this.basic),
          (this.basic.map = i.texture),
          t.setRenderTarget(null),
          t.clear(),
          this.fsQuad.render(t)),
        (this.highPassUniforms.tDiffuse.value = i.texture),
        (this.highPassUniforms.luminosityThreshold.value = this.threshold),
        (this.fsQuad.material = this.materialHighPassFilter),
        t.setRenderTarget(this.renderTargetBright),
        t.clear(),
        this.fsQuad.render(t);
      let a = this.renderTargetBright;
      for (let e = 0; e < this.nMips; e++)
        (this.fsQuad.material = this.separableBlurMaterials[e]),
          (this.separableBlurMaterials[e].uniforms.colorTexture.value =
            a.texture),
          (this.separableBlurMaterials[e].uniforms.direction.value =
            Uo.BlurDirectionX),
          t.setRenderTarget(this.renderTargetsHorizontal[e]),
          t.clear(),
          this.fsQuad.render(t),
          (this.separableBlurMaterials[e].uniforms.colorTexture.value =
            this.renderTargetsHorizontal[e].texture),
          (this.separableBlurMaterials[e].uniforms.direction.value =
            Uo.BlurDirectionY),
          t.setRenderTarget(this.renderTargetsVertical[e]),
          t.clear(),
          this.fsQuad.render(t),
          (a = this.renderTargetsVertical[e]);
      (this.fsQuad.material = this.compositeMaterial),
        (this.compositeMaterial.uniforms.bloomStrength.value = this.strength),
        (this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
        (this.compositeMaterial.uniforms.bloomTintColors.value =
          this.bloomTintColors),
        t.setRenderTarget(this.renderTargetsHorizontal[0]),
        t.clear(),
        this.fsQuad.render(t),
        (this.fsQuad.material = this.blendMaterial),
        (this.copyUniforms.tDiffuse.value =
          this.renderTargetsHorizontal[0].texture),
        r && t.state.buffers.stencil.setTest(!0),
        this.renderToScreen
          ? (t.setRenderTarget(null), this.fsQuad.render(t))
          : (t.setRenderTarget(i), this.fsQuad.render(t)),
        t.setClearColor(this._oldClearColor, this.oldClearAlpha),
        (t.autoClear = s);
    }
    getSeperableBlurMaterial(t) {
      const e = [];
      for (let i = 0; i < t; i++)
        e.push((0.39894 * Math.exp((-0.5 * i * i) / (t * t))) / t);
      return new Ki({
        defines: { KERNEL_RADIUS: t },
        uniforms: {
          colorTexture: { value: null },
          invSize: { value: new mt(0.5, 0.5) },
          direction: { value: new mt(0.5, 0.5) },
          gaussianCoefficients: { value: e },
        },
        vertexShader:
          "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
        fragmentShader:
          "#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 invSize;\n\t\t\t\tuniform vec2 direction;\n\t\t\t\tuniform float gaussianCoefficients[KERNEL_RADIUS];\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tfloat weightSum = gaussianCoefficients[0];\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;\n\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = float(i);\n\t\t\t\t\t\tfloat w = gaussianCoefficients[i];\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;\n\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\n\t\t\t\t\t\tweightSum += 2.0 * w;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}",
      });
    }
    getCompositeMaterial(t) {
      return new Ki({
        defines: { NUM_MIPS: t },
        uniforms: {
          blurTexture1: { value: null },
          blurTexture2: { value: null },
          blurTexture3: { value: null },
          blurTexture4: { value: null },
          blurTexture5: { value: null },
          bloomStrength: { value: 1 },
          bloomFactors: { value: null },
          bloomTintColors: { value: null },
          bloomRadius: { value: 0 },
        },
        vertexShader:
          "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
        fragmentShader:
          "varying vec2 vUv;\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor(const in float factor) {\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n\t\t\t\t}",
      });
    }
  }
  (Uo.BlurDirectionX = new mt(1, 0)), (Uo.BlurDirectionY = new mt(0, 1));
  const Do = {
      name: "FXAAShader",
      uniforms: {
        tDiffuse: { value: null },
        resolution: { value: new mt(1 / 1024, 1 / 512) },
      },
      vertexShader:
        "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
      fragmentShader:
        "\n\t\tprecision highp float;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tuniform vec2 resolution;\n\n\t\tvarying vec2 vUv;\n\n\t\t// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)\n\n\t\t//----------------------------------------------------------------------------------\n\t\t// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag\n\t\t// SDK Version: v3.00\n\t\t// Email:       gameworks@nvidia.com\n\t\t// Site:        http://developer.nvidia.com/\n\t\t//\n\t\t// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.\n\t\t//\n\t\t// Redistribution and use in source and binary forms, with or without\n\t\t// modification, are permitted provided that the following conditions\n\t\t// are met:\n\t\t//  * Redistributions of source code must retain the above copyright\n\t\t//    notice, this list of conditions and the following disclaimer.\n\t\t//  * Redistributions in binary form must reproduce the above copyright\n\t\t//    notice, this list of conditions and the following disclaimer in the\n\t\t//    documentation and/or other materials provided with the distribution.\n\t\t//  * Neither the name of NVIDIA CORPORATION nor the names of its\n\t\t//    contributors may be used to endorse or promote products derived\n\t\t//    from this software without specific prior written permission.\n\t\t//\n\t\t// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY\n\t\t// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n\t\t// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n\t\t// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR\n\t\t// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n\t\t// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n\t\t// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n\t\t// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n\t\t// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n\t\t// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n\t\t// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\t\t//\n\t\t//----------------------------------------------------------------------------------\n\n\t\t#ifndef FXAA_DISCARD\n\t\t\t//\n\t\t\t// Only valid for PC OpenGL currently.\n\t\t\t// Probably will not work when FXAA_GREEN_AS_LUMA = 1.\n\t\t\t//\n\t\t\t// 1 = Use discard on pixels which don't need AA.\n\t\t\t//     For APIs which enable concurrent TEX+ROP from same surface.\n\t\t\t// 0 = Return unchanged color on pixels which don't need AA.\n\t\t\t//\n\t\t\t#define FXAA_DISCARD 0\n\t\t#endif\n\n\t\t/*--------------------------------------------------------------------------*/\n\t\t#define FxaaTexTop(t, p) texture2D(t, p, -100.0)\n\t\t#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)\n\t\t/*--------------------------------------------------------------------------*/\n\n\t\t#define NUM_SAMPLES 5\n\n\t\t// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha\n\t\tfloat contrast( vec4 a, vec4 b ) {\n\t\t\tvec4 diff = abs( a - b );\n\t\t\treturn max( max( max( diff.r, diff.g ), diff.b ), diff.a );\n\t\t}\n\n\t\t/*============================================================================\n\n\t\t\t\t\t\t\t\t\tFXAA3 QUALITY - PC\n\n\t\t============================================================================*/\n\n\t\t/*--------------------------------------------------------------------------*/\n\t\tvec4 FxaaPixelShader(\n\t\t\tvec2 posM,\n\t\t\tsampler2D tex,\n\t\t\tvec2 fxaaQualityRcpFrame,\n\t\t\tfloat fxaaQualityEdgeThreshold,\n\t\t\tfloat fxaaQualityinvEdgeThreshold\n\t\t) {\n\t\t\tvec4 rgbaM = FxaaTexTop(tex, posM);\n\t\t\tvec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);\n\t\t\tvec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);\n\t\t\tvec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);\n\t\t\tvec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);\n\t\t\t// . S .\n\t\t\t// W M E\n\t\t\t// . N .\n\n\t\t\tbool earlyExit = max( max( max(\n\t\t\t\t\tcontrast( rgbaM, rgbaN ),\n\t\t\t\t\tcontrast( rgbaM, rgbaS ) ),\n\t\t\t\t\tcontrast( rgbaM, rgbaE ) ),\n\t\t\t\t\tcontrast( rgbaM, rgbaW ) )\n\t\t\t\t\t< fxaaQualityEdgeThreshold;\n\t\t\t// . 0 .\n\t\t\t// 0 0 0\n\t\t\t// . 0 .\n\n\t\t\t#if (FXAA_DISCARD == 1)\n\t\t\t\tif(earlyExit) FxaaDiscard;\n\t\t\t#else\n\t\t\t\tif(earlyExit) return rgbaM;\n\t\t\t#endif\n\n\t\t\tfloat contrastN = contrast( rgbaM, rgbaN );\n\t\t\tfloat contrastS = contrast( rgbaM, rgbaS );\n\t\t\tfloat contrastE = contrast( rgbaM, rgbaE );\n\t\t\tfloat contrastW = contrast( rgbaM, rgbaW );\n\n\t\t\tfloat relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );\n\t\t\trelativeVContrast *= fxaaQualityinvEdgeThreshold;\n\n\t\t\tbool horzSpan = relativeVContrast > 0.;\n\t\t\t// . 1 .\n\t\t\t// 0 0 0\n\t\t\t// . 1 .\n\n\t\t\t// 45 deg edge detection and corners of objects, aka V/H contrast is too similar\n\t\t\tif( abs( relativeVContrast ) < .3 ) {\n\t\t\t\t// locate the edge\n\t\t\t\tvec2 dirToEdge;\n\t\t\t\tdirToEdge.x = contrastE > contrastW ? 1. : -1.;\n\t\t\t\tdirToEdge.y = contrastS > contrastN ? 1. : -1.;\n\t\t\t\t// . 2 .      . 1 .\n\t\t\t\t// 1 0 2  ~=  0 0 1\n\t\t\t\t// . 1 .      . 0 .\n\n\t\t\t\t// tap 2 pixels and see which ones are \"outside\" the edge, to\n\t\t\t\t// determine if the edge is vertical or horizontal\n\n\t\t\t\tvec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);\n\t\t\t\tfloat matchAlongH = contrast( rgbaM, rgbaAlongH );\n\t\t\t\t// . 1 .\n\t\t\t\t// 0 0 1\n\t\t\t\t// . 0 H\n\n\t\t\t\tvec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);\n\t\t\t\tfloat matchAlongV = contrast( rgbaM, rgbaAlongV );\n\t\t\t\t// V 1 .\n\t\t\t\t// 0 0 1\n\t\t\t\t// . 0 .\n\n\t\t\t\trelativeVContrast = matchAlongV - matchAlongH;\n\t\t\t\trelativeVContrast *= fxaaQualityinvEdgeThreshold;\n\n\t\t\t\tif( abs( relativeVContrast ) < .3 ) { // 45 deg edge\n\t\t\t\t\t// 1 1 .\n\t\t\t\t\t// 0 0 1\n\t\t\t\t\t// . 0 1\n\n\t\t\t\t\t// do a simple blur\n\t\t\t\t\treturn mix(\n\t\t\t\t\t\trgbaM,\n\t\t\t\t\t\t(rgbaN + rgbaS + rgbaE + rgbaW) * .25,\n\t\t\t\t\t\t.4\n\t\t\t\t\t);\n\t\t\t\t}\n\n\t\t\t\thorzSpan = relativeVContrast > 0.;\n\t\t\t}\n\n\t\t\tif(!horzSpan) rgbaN = rgbaW;\n\t\t\tif(!horzSpan) rgbaS = rgbaE;\n\t\t\t// . 0 .      1\n\t\t\t// 1 0 1  ->  0\n\t\t\t// . 0 .      1\n\n\t\t\tbool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );\n\t\t\tif(!pairN) rgbaN = rgbaS;\n\n\t\t\tvec2 offNP;\n\t\t\toffNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;\n\t\t\toffNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;\n\n\t\t\tbool doneN = false;\n\t\t\tbool doneP = false;\n\n\t\t\tfloat nDist = 0.;\n\t\t\tfloat pDist = 0.;\n\n\t\t\tvec2 posN = posM;\n\t\t\tvec2 posP = posM;\n\n\t\t\tint iterationsUsed = 0;\n\t\t\tint iterationsUsedN = 0;\n\t\t\tint iterationsUsedP = 0;\n\t\t\tfor( int i = 0; i < NUM_SAMPLES; i++ ) {\n\t\t\t\titerationsUsed = i;\n\n\t\t\t\tfloat increment = float(i + 1);\n\n\t\t\t\tif(!doneN) {\n\t\t\t\t\tnDist += increment;\n\t\t\t\t\tposN = posM + offNP * nDist;\n\t\t\t\t\tvec4 rgbaEndN = FxaaTexTop(tex, posN.xy);\n\t\t\t\t\tdoneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );\n\t\t\t\t\titerationsUsedN = i;\n\t\t\t\t}\n\n\t\t\t\tif(!doneP) {\n\t\t\t\t\tpDist += increment;\n\t\t\t\t\tposP = posM - offNP * pDist;\n\t\t\t\t\tvec4 rgbaEndP = FxaaTexTop(tex, posP.xy);\n\t\t\t\t\tdoneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );\n\t\t\t\t\titerationsUsedP = i;\n\t\t\t\t}\n\n\t\t\t\tif(doneN || doneP) break;\n\t\t\t}\n\n\n\t\t\tif ( !doneP && !doneN ) return rgbaM; // failed to find end of edge\n\n\t\t\tfloat dist = min(\n\t\t\t\tdoneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,\n\t\t\t\tdoneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.\n\t\t\t);\n\n\t\t\t// hacky way of reduces blurriness of mostly diagonal edges\n\t\t\t// but reduces AA quality\n\t\t\tdist = pow(dist, .5);\n\n\t\t\tdist = 1. - dist;\n\n\t\t\treturn mix(\n\t\t\t\trgbaM,\n\t\t\t\trgbaN,\n\t\t\t\tdist * .5\n\t\t\t);\n\t\t}\n\n\t\tvoid main() {\n\t\t\tconst float edgeDetectionQuality = .2;\n\t\t\tconst float invEdgeDetectionQuality = 1. / edgeDetectionQuality;\n\n\t\t\tgl_FragColor = FxaaPixelShader(\n\t\t\t\tvUv,\n\t\t\t\ttDiffuse,\n\t\t\t\tresolution,\n\t\t\t\tedgeDetectionQuality, // [0,1] contrast needed, otherwise early discard\n\t\t\t\tinvEdgeDetectionQuality\n\t\t\t);\n\n\t\t}\n\t",
    },
    Io = /^[og]\s*(.+)?/,
    No = /^mtllib /,
    Oo = /^usemtl /,
    Fo = /^usemap /,
    zo = /\s+/,
    Bo = new Ht(),
    ko = new Ht(),
    Vo = new Ht(),
    Ho = new Ht(),
    Go = new Ht(),
    Wo = new ai();
  function jo() {
    const t = {
      objects: [],
      object: {},
      vertices: [],
      normals: [],
      colors: [],
      uvs: [],
      materials: {},
      materialLibraries: [],
      startObject: function (t, e) {
        if (this.object && !1 === this.object.fromDeclaration)
          return (
            (this.object.name = t),
            void (this.object.fromDeclaration = !1 !== e)
          );
        const i =
          this.object && "function" == typeof this.object.currentMaterial
            ? this.object.currentMaterial()
            : void 0;
        if (
          (this.object &&
            "function" == typeof this.object._finalize &&
            this.object._finalize(!0),
          (this.object = {
            name: t || "",
            fromDeclaration: !1 !== e,
            geometry: {
              vertices: [],
              normals: [],
              colors: [],
              uvs: [],
              hasUVIndices: !1,
            },
            materials: [],
            smooth: !0,
            startMaterial: function (t, e) {
              const i = this._finalize(!1);
              i &&
                (i.inherited || i.groupCount <= 0) &&
                this.materials.splice(i.index, 1);
              const n = {
                index: this.materials.length,
                name: t || "",
                mtllib: Array.isArray(e) && e.length > 0 ? e[e.length - 1] : "",
                smooth: void 0 !== i ? i.smooth : this.smooth,
                groupStart: void 0 !== i ? i.groupEnd : 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: !1,
                clone: function (t) {
                  const e = {
                    index: "number" == typeof t ? t : this.index,
                    name: this.name,
                    mtllib: this.mtllib,
                    smooth: this.smooth,
                    groupStart: 0,
                    groupEnd: -1,
                    groupCount: -1,
                    inherited: !1,
                  };
                  return (e.clone = this.clone.bind(e)), e;
                },
              };
              return this.materials.push(n), n;
            },
            currentMaterial: function () {
              if (this.materials.length > 0)
                return this.materials[this.materials.length - 1];
            },
            _finalize: function (t) {
              const e = this.currentMaterial();
              if (
                (e &&
                  -1 === e.groupEnd &&
                  ((e.groupEnd = this.geometry.vertices.length / 3),
                  (e.groupCount = e.groupEnd - e.groupStart),
                  (e.inherited = !1)),
                t && this.materials.length > 1)
              )
                for (let t = this.materials.length - 1; t >= 0; t--)
                  this.materials[t].groupCount <= 0 &&
                    this.materials.splice(t, 1);
              return (
                t &&
                  0 === this.materials.length &&
                  this.materials.push({ name: "", smooth: this.smooth }),
                e
              );
            },
          }),
          i && i.name && "function" == typeof i.clone)
        ) {
          const t = i.clone(0);
          (t.inherited = !0), this.object.materials.push(t);
        }
        this.objects.push(this.object);
      },
      finalize: function () {
        this.object &&
          "function" == typeof this.object._finalize &&
          this.object._finalize(!0);
      },
      parseVertexIndex: function (t, e) {
        const i = parseInt(t, 10);
        return 3 * (i >= 0 ? i - 1 : i + e / 3);
      },
      parseNormalIndex: function (t, e) {
        const i = parseInt(t, 10);
        return 3 * (i >= 0 ? i - 1 : i + e / 3);
      },
      parseUVIndex: function (t, e) {
        const i = parseInt(t, 10);
        return 2 * (i >= 0 ? i - 1 : i + e / 2);
      },
      addVertex: function (t, e, i) {
        const n = this.vertices,
          r = this.object.geometry.vertices;
        r.push(n[t + 0], n[t + 1], n[t + 2]),
          r.push(n[e + 0], n[e + 1], n[e + 2]),
          r.push(n[i + 0], n[i + 1], n[i + 2]);
      },
      addVertexPoint: function (t) {
        const e = this.vertices;
        this.object.geometry.vertices.push(e[t + 0], e[t + 1], e[t + 2]);
      },
      addVertexLine: function (t) {
        const e = this.vertices;
        this.object.geometry.vertices.push(e[t + 0], e[t + 1], e[t + 2]);
      },
      addNormal: function (t, e, i) {
        const n = this.normals,
          r = this.object.geometry.normals;
        r.push(n[t + 0], n[t + 1], n[t + 2]),
          r.push(n[e + 0], n[e + 1], n[e + 2]),
          r.push(n[i + 0], n[i + 1], n[i + 2]);
      },
      addFaceNormal: function (t, e, i) {
        const n = this.vertices,
          r = this.object.geometry.normals;
        Bo.fromArray(n, t),
          ko.fromArray(n, e),
          Vo.fromArray(n, i),
          Go.subVectors(Vo, ko),
          Ho.subVectors(Bo, ko),
          Go.cross(Ho),
          Go.normalize(),
          r.push(Go.x, Go.y, Go.z),
          r.push(Go.x, Go.y, Go.z),
          r.push(Go.x, Go.y, Go.z);
      },
      addColor: function (t, e, i) {
        const n = this.colors,
          r = this.object.geometry.colors;
        void 0 !== n[t] && r.push(n[t + 0], n[t + 1], n[t + 2]),
          void 0 !== n[e] && r.push(n[e + 0], n[e + 1], n[e + 2]),
          void 0 !== n[i] && r.push(n[i + 0], n[i + 1], n[i + 2]);
      },
      addUV: function (t, e, i) {
        const n = this.uvs,
          r = this.object.geometry.uvs;
        r.push(n[t + 0], n[t + 1]),
          r.push(n[e + 0], n[e + 1]),
          r.push(n[i + 0], n[i + 1]);
      },
      addDefaultUV: function () {
        const t = this.object.geometry.uvs;
        t.push(0, 0), t.push(0, 0), t.push(0, 0);
      },
      addUVLine: function (t) {
        const e = this.uvs;
        this.object.geometry.uvs.push(e[t + 0], e[t + 1]);
      },
      addFace: function (t, e, i, n, r, s, a, o, l) {
        const h = this.vertices.length;
        let c = this.parseVertexIndex(t, h),
          d = this.parseVertexIndex(e, h),
          u = this.parseVertexIndex(i, h);
        if (
          (this.addVertex(c, d, u),
          this.addColor(c, d, u),
          void 0 !== a && "" !== a)
        ) {
          const t = this.normals.length;
          (c = this.parseNormalIndex(a, t)),
            (d = this.parseNormalIndex(o, t)),
            (u = this.parseNormalIndex(l, t)),
            this.addNormal(c, d, u);
        } else this.addFaceNormal(c, d, u);
        if (void 0 !== n && "" !== n) {
          const t = this.uvs.length;
          (c = this.parseUVIndex(n, t)),
            (d = this.parseUVIndex(r, t)),
            (u = this.parseUVIndex(s, t)),
            this.addUV(c, d, u),
            (this.object.geometry.hasUVIndices = !0);
        } else this.addDefaultUV();
      },
      addPointGeometry: function (t) {
        this.object.geometry.type = "Points";
        const e = this.vertices.length;
        for (let i = 0, n = t.length; i < n; i++) {
          const n = this.parseVertexIndex(t[i], e);
          this.addVertexPoint(n), this.addColor(n);
        }
      },
      addLineGeometry: function (t, e) {
        this.object.geometry.type = "Line";
        const i = this.vertices.length,
          n = this.uvs.length;
        for (let e = 0, n = t.length; e < n; e++)
          this.addVertexLine(this.parseVertexIndex(t[e], i));
        for (let t = 0, i = e.length; t < i; t++)
          this.addUVLine(this.parseUVIndex(e[t], n));
      },
    };
    return t.startObject("", !1), t;
  }
  class Xo extends Aa {
    constructor(t) {
      super(t), (this.materials = null);
    }
    load(t, e, i, n) {
      const r = this,
        s = new La(this.manager);
      s.setPath(this.path),
        s.setRequestHeader(this.requestHeader),
        s.setWithCredentials(this.withCredentials),
        s.load(
          t,
          function (i) {
            try {
              e(r.parse(i));
            } catch (e) {
              n ? n(e) : console.error(e), r.manager.itemError(t);
            }
          },
          i,
          n
        );
    }
    setMaterials(t) {
      return (this.materials = t), this;
    }
    parse(t) {
      const e = new jo();
      -1 !== t.indexOf("\r\n") && (t = t.replace(/\r\n/g, "\n")),
        -1 !== t.indexOf("\\\n") && (t = t.replace(/\\\n/g, ""));
      const i = t.split("\n");
      let n = [];
      for (let t = 0, r = i.length; t < r; t++) {
        const r = i[t].trimStart();
        if (0 === r.length) continue;
        const s = r.charAt(0);
        if ("#" !== s)
          if ("v" === s) {
            const t = r.split(zo);
            switch (t[0]) {
              case "v":
                e.vertices.push(
                  parseFloat(t[1]),
                  parseFloat(t[2]),
                  parseFloat(t[3])
                ),
                  t.length >= 7
                    ? (Wo.setRGB(
                        parseFloat(t[4]),
                        parseFloat(t[5]),
                        parseFloat(t[6])
                      ).convertSRGBToLinear(),
                      e.colors.push(Wo.r, Wo.g, Wo.b))
                    : e.colors.push(void 0, void 0, void 0);
                break;
              case "vn":
                e.normals.push(
                  parseFloat(t[1]),
                  parseFloat(t[2]),
                  parseFloat(t[3])
                );
                break;
              case "vt":
                e.uvs.push(parseFloat(t[1]), parseFloat(t[2]));
            }
          } else if ("f" === s) {
            const t = r.slice(1).trim().split(zo),
              i = [];
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e];
              if (n.length > 0) {
                const t = n.split("/");
                i.push(t);
              }
            }
            const n = i[0];
            for (let t = 1, r = i.length - 1; t < r; t++) {
              const r = i[t],
                s = i[t + 1];
              e.addFace(n[0], r[0], s[0], n[1], r[1], s[1], n[2], r[2], s[2]);
            }
          } else if ("l" === s) {
            const t = r.substring(1).trim().split(" ");
            let i = [];
            const n = [];
            if (-1 === r.indexOf("/")) i = t;
            else
              for (let e = 0, r = t.length; e < r; e++) {
                const r = t[e].split("/");
                "" !== r[0] && i.push(r[0]), "" !== r[1] && n.push(r[1]);
              }
            e.addLineGeometry(i, n);
          } else if ("p" === s) {
            const t = r.slice(1).trim().split(" ");
            e.addPointGeometry(t);
          } else if (null !== (n = Io.exec(r))) {
            const t = (" " + n[0].slice(1).trim()).slice(1);
            e.startObject(t);
          } else if (Oo.test(r))
            e.object.startMaterial(r.substring(7).trim(), e.materialLibraries);
          else if (No.test(r)) e.materialLibraries.push(r.substring(7).trim());
          else if (Fo.test(r))
            console.warn(
              'THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.'
            );
          else if ("s" === s) {
            if (((n = r.split(" ")), n.length > 1)) {
              const t = n[1].trim().toLowerCase();
              e.object.smooth = "0" !== t && "off" !== t;
            } else e.object.smooth = !0;
            const t = e.object.currentMaterial();
            t && (t.smooth = e.object.smooth);
          } else {
            if ("\0" === r) continue;
            console.warn('THREE.OBJLoader: Unexpected line: "' + r + '"');
          }
      }
      e.finalize();
      const r = new Bs();
      if (
        ((r.materialLibraries = [].concat(e.materialLibraries)),
        !0 ==
          !(
            1 === e.objects.length &&
            0 === e.objects[0].geometry.vertices.length
          ))
      )
        for (let t = 0, i = e.objects.length; t < i; t++) {
          const i = e.objects[t],
            n = i.geometry,
            s = i.materials,
            a = "Line" === n.type,
            o = "Points" === n.type;
          let l = !1;
          if (0 === n.vertices.length) continue;
          const h = new Ei();
          h.setAttribute("position", new gi(n.vertices, 3)),
            n.normals.length > 0 &&
              h.setAttribute("normal", new gi(n.normals, 3)),
            n.colors.length > 0 &&
              ((l = !0), h.setAttribute("color", new gi(n.colors, 3))),
            !0 === n.hasUVIndices && h.setAttribute("uv", new gi(n.uvs, 2));
          const c = [];
          for (let t = 0, i = s.length; t < i; t++) {
            const i = s[t],
              n = i.name + "_" + i.smooth + "_" + l;
            let r = e.materials[n];
            if (null !== this.materials)
              if (
                ((r = this.materials.create(i.name)),
                !a || !r || r instanceof Ys)
              ) {
                if (o && r && !(r instanceof ra)) {
                  const t = new ra({ size: 10, sizeAttenuation: !1 });
                  hi.prototype.copy.call(t, r),
                    t.color.copy(r.color),
                    (t.map = r.map),
                    (r = t);
                }
              } else {
                const t = new Ys();
                hi.prototype.copy.call(t, r), t.color.copy(r.color), (r = t);
              }
            void 0 === r &&
              ((r = a
                ? new Ys()
                : o
                ? new ra({ size: 1, sizeAttenuation: !1 })
                : new pa()),
              (r.name = i.name),
              (r.flatShading = !i.smooth),
              (r.vertexColors = l),
              (e.materials[n] = r)),
              c.push(r);
          }
          let d;
          if (c.length > 1) {
            for (let t = 0, e = s.length; t < e; t++) {
              const e = s[t];
              h.addGroup(e.groupStart, e.groupCount, t);
            }
            d = a ? new na(h, c) : o ? new ha(h, c) : new Hi(h, c);
          } else
            d = a ? new na(h, c[0]) : o ? new ha(h, c[0]) : new Hi(h, c[0]);
          (d.name = i.name), r.add(d);
        }
      else if (e.vertices.length > 0) {
        const t = new ra({ size: 1, sizeAttenuation: !1 }),
          i = new Ei();
        i.setAttribute("position", new gi(e.vertices, 3)),
          e.colors.length > 0 &&
            void 0 !== e.colors[0] &&
            (i.setAttribute("color", new gi(e.colors, 3)),
            (t.vertexColors = !0));
        const n = new ha(i, t);
        r.add(n);
      }
      return r;
    }
  }
  class qo {
    constructor() {
      (this.path = ""),
        (this.textureAnisotropy = 8),
        (this.buildingWindowsEmissiveIntensity = window.game.environment
          .windowLights
          ? 1.5
          : 0),
        (this.adsEmissiveIntensity = 0.1),
        (this.textures = {}),
        (this.models = {}),
        (this.materials = {});
    }
    setPath(t) {
      this.path = t;
    }
    load() {
      console.log("AssetManager: Loading assets");
      const t = this;
      (this.loadingManager = new Ta()),
        (this.loadingManager.onProgress = function (t, e, i) {
          window.writeAsset(t, e, i);
        }),
        (this.loadingManager.onLoad = function () {
          console.log("AssetManager: Assets loaded"), window.game.onLoad();
        }),
        (this.loadingManager.onError = function (t) {
          console.error("AssetManager: Failed to load " + t);
        }),
        (this.textureLoader = new Ua(this.loadingManager)),
        (this.objLoader = new Xo(this.loadingManager)),
        (this.textures.sky_night = this.textureLoader.load(
          this.path + "textures/sky_night.jpg"
        )),
        (this.textures.sky_night.colorSpace = W),
        (this.textures.sky_night.mapping = g),
        (this.textures.sky_night.magFilter = b),
        (this.textures.sky_day = this.textureLoader.load(
          this.path + "textures/sky_day.jpg"
        )),
        (this.textures.sky_day.colorSpace = W),
        (this.textures.sky_day.mapping = g),
        (this.textures.sky_day.magFilter = b),
        (this.textures.env_night = this.textureLoader.load(
          this.path + "textures/environment_night.jpg"
        )),
        (this.textures.env_night.mapping = g),
        (this.textures.env_night.magFilter = b),
        (this.textures.env_night_windshield = this.textureLoader.load(
          this.path + "textures/environment_night_windshield.jpg"
        )),
        (this.textures.env_night_windshield.mapping = g),
        (this.textures.env_night_windshield.magFilter = b),
        (this.textures.ground = this.textureLoader.load(
          this.path + "textures/ground.jpg"
        )),
        (this.textures.ground_em = this.textureLoader.load(
          this.path + "textures/ground_em.jpg"
        )),
        (this.textures.spinner_interior = this.textureLoader.load(
          this.path + "textures/0QuazDeckardCarLowpoly_interior_BaseColor.png"
        )),
        (this.textures.spinner_interior_norm = this.textureLoader.load(
          this.path + "textures/0QuazDeckardCarLowpoly_interior_Normal.png"
        )),
        (this.textures.spinner_interior_em = this.textureLoader.load(
          this.path + "textures/0QuazDeckardCarLowpoly_interior_Emissive.png"
        )),
        (this.textures.spinner_interior_ao = this.textureLoader.load(
          this.path +
            "textures/0QuazDeckardCarLowpoly_interior_AmbientOcclusion.png"
        )),
        (this.textures.spinner_exterior = this.textureLoader.load(
          this.path + "textures/0QuazDeckardCarLowpoly_car_BaseColor.png"
        )),
        (this.textures.spinner_windows_norm = this.textureLoader.load(
          this.path + "textures/rain_normal_1024.jpg"
        )),
        (this.textures.spinner_windows_norm.wrapS = v),
        (this.textures.spinner_windows_norm.wrapT = v),
        this.textures.spinner_windows_norm.repeat.set(2.5, 2.5),
        (this.textures.spinner_windows_rough = this.textureLoader.load(
          this.path + "textures/smudges2_1024.jpg"
        )),
        (this.textures.spinner_windows_rough.wrapS = v),
        (this.textures.spinner_windows_rough.wrapT = v),
        this.textures.spinner_windows_rough.repeat.set(2.5, 2.5),
        (this.textures.spinner_windows_trans = this.textureLoader.load(
          this.path + "textures/smudges_inverted_1024.jpg"
        )),
        (this.textures.spinner_windows_trans.wrapS = v),
        (this.textures.spinner_windows_trans.wrapT = v),
        this.textures.spinner_windows_trans.repeat.set(2.5, 2.5),
        (this.textures.cars = this.textureLoader.load(
          this.path + "textures/cars.jpg"
        )),
        (this.textures.cars_em = this.textureLoader.load(
          this.path + "textures/cars_em.jpg"
        )),
        (this.textures.storefronts = this.textureLoader.load(
          this.path + "textures/storefronts_01.jpg"
        )),
        (this.textures.storefronts.wrapS = v),
        (this.textures.storefronts.wrapT = v),
        (this.textures.storefronts.anisotropy = this.textureAnisotropy),
        (this.textures.storefronts_em = this.textureLoader.load(
          this.path + "textures/storefronts_01_em.jpg"
        )),
        (this.textures.storefronts_em.wrapS = v),
        (this.textures.storefronts_em.wrapT = v),
        (this.textures.storefronts_em.anisotropy = this.textureAnisotropy),
        (this.textures.mega_building_01 = this.textureLoader.load(
          this.path + "textures/mega_building_01.jpg"
        )),
        (this.textures.mega_building_01.wrapS = v),
        (this.textures.mega_building_01.wrapT = v),
        (this.textures.mega_building_01.anisotropy = this.textureAnisotropy),
        (this.textures.mega_building_01_em = this.textureLoader.load(
          this.path + "textures/mega_building_01_em.jpg"
        )),
        (this.textures.mega_building_01_em.wrapS = v),
        (this.textures.mega_building_01_em.wrapT = v),
        (this.textures.mega_building_01_em.anisotropy = this.textureAnisotropy);
      for (let t = 0; t < 10; t++) {
        let e = this.padNumber(t + 1);
        (this.textures["building_" + e] = this.textureLoader.load(
          this.path + "textures/building_" + e + ".jpg"
        )),
          (this.textures["building_" + e].wrapS = v),
          (this.textures["building_" + e].wrapT = v),
          (this.textures["building_" + e].anisotropy = this.textureAnisotropy),
          (this.textures["building_" + e + "_em"] = this.textureLoader.load(
            this.path + "textures/building_" + e + "_em.jpg"
          )),
          (this.textures["building_" + e + "_em"].wrapS = v),
          (this.textures["building_" + e + "_em"].wrapT = v),
          (this.textures["building_" + e + "_em"].anisotropy =
            this.textureAnisotropy),
          (this.textures["building_" + e + "_rough"] = this.textureLoader.load(
            this.path + "textures/building_" + e + "_spec.jpg"
          )),
          (this.textures["building_" + e + "_rough"].wrapS = v),
          (this.textures["building_" + e + "_rough"].wrapT = v),
          (this.textures["building_" + e + "_rough"].anisotropy =
            this.textureAnisotropy);
      }
      for (let t = 0; t < 5; t++) {
        let e = this.padNumber(t + 1);
        this.textures["ads_" + e] = this.textureLoader.load(
          this.path + "textures/ads_" + e + ".jpg"
        );
      }
      for (let t = 0; t < 5; t++) {
        let e = this.padNumber(t + 1);
        this.textures["ads_large_" + e] = this.textureLoader.load(
          this.path + "textures/ads_large_" + e + ".jpg"
        );
      }
      for (let t = 0; t < 3; t++) {
        let e = this.padNumber(t + 1);
        this.textures["smoke_" + e] = this.textureLoader.load(
          this.path + "textures/smoke_" + e + ".jpg"
        );
      }
      for (let t = 0; t < 4; t++) {
        let e = this.padNumber(t + 1);
        this.textures["spotlight_" + e] = this.textureLoader.load(
          this.path + "textures/spotlight_" + e + ".jpg"
        );
      }
      this.gltfLoader.load(this.path + "models/storefronts.obj", function (e) {
        t.models.storefronts = e.children[0].geometry;
      }),
        this.gltfLoader.load(this.path + "models/spinner.obj", function (e) {
          (t.models.spinner = e.children[0].geometry),
            t.models.spinner.rotateY(-Math.PI / 2);
        }),
        this.gltfLoader.load(
          this.path + "models/spinner_windows.obj",
          function (e) {
            (t.models.spinner_windows = e.children[0].geometry),
              t.models.spinner_windows.rotateY(-Math.PI / 2);
          }
        ),
        this.gltfLoader.load(this.path + "models/s_01_01.obj", function (e) {
          t.models.s_01_01 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_01_02.obj", function (e) {
          t.models.s_01_02 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_01_03.obj", function (e) {
          t.models.s_01_03 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_02_01.obj", function (e) {
          t.models.s_02_01 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_02_02.obj", function (e) {
          t.models.s_02_02 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_02_03.obj", function (e) {
          t.models.s_02_03 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_03_01.obj", function (e) {
          t.models.s_03_01 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_03_02.obj", function (e) {
          t.models.s_03_02 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_03_03.obj", function (e) {
          t.models.s_03_03 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_04_01.obj", function (e) {
          t.models.s_04_01 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_04_02.obj", function (e) {
          t.models.s_04_02 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_04_03.obj", function (e) {
          t.models.s_04_03 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_05_01.obj", function (e) {
          t.models.s_05_01 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_05_02.obj", function (e) {
          t.models.s_05_02 = e.children[0].geometry;
        }),
        this.gltfLoader.load(this.path + "models/s_05_03.obj", function (e) {
          t.models.s_05_03 = e.children[0].geometry;
        });
      for (let e = 0; e < 6; e++) {
        let i = this.padNumber(e + 1);
        this.gltfLoader.load(
          this.path + "models/mega_" + i + ".obj",
          function (e) {
            t.models["mega_" + i] = e.children[0].geometry;
          }
        );
      }
      this.gltfLoader.load(this.path + "models/ads_s_01_01.obj", function (e) {
        t.models.ads_s_01_01 = e.children[0].geometry;
      }),
        this.gltfLoader.load(
          this.path + "models/ads_s_01_02.obj",
          function (e) {
            t.models.ads_s_01_02 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_02_01.obj",
          function (e) {
            t.models.ads_s_02_01 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_02_02.obj",
          function (e) {
            t.models.ads_s_02_02 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_03_01.obj",
          function (e) {
            t.models.ads_s_03_01 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_03_02.obj",
          function (e) {
            t.models.ads_s_03_02 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_04_01.obj",
          function (e) {
            t.models.ads_s_04_01 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_04_02.obj",
          function (e) {
            t.models.ads_s_04_02 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_04_03.obj",
          function (e) {
            t.models.ads_s_04_03 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_04_04.obj",
          function (e) {
            t.models.ads_s_04_04 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_05_01.obj",
          function (e) {
            t.models.ads_s_05_01 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_05_02.obj",
          function (e) {
            t.models.ads_s_05_02 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_05_03.obj",
          function (e) {
            t.models.ads_s_05_03 = e.children[0].geometry;
          }
        ),
        this.gltfLoader.load(
          this.path + "models/ads_s_05_04.obj",
          function (e) {
            t.models.ads_s_05_04 = e.children[0].geometry;
          }
        );
      for (let e = 0; e < 12; e++) {
        let i = this.padNumber(e + 1);
        this.gltfLoader.load(
          this.path + "models/topper_" + i + ".obj",
          function (e) {
            t.models["topper_" + i] = e.children[0].geometry;
          }
        );
      }
      for (let e = 0; e < 8; e++) {
        let i = this.padNumber(e + 1);
        this.gltfLoader.load(
          this.path + "models/car_" + i + ".obj",
          function (e) {
            t.models["car_" + i] = e.children[0].geometry;
          }
        );
      }
      (this.models.smoke = new un(64, 64)),
        this.gltfLoader.load(this.path + "models/spotlight.obj", function (e) {
          t.models.spotlight = e.children[0].geometry;
        }),
        (this.materials.ground = new pa({
          map: this.getTexture("ground"),
          emissive: 37119,
          emissiveMap: this.getTexture("ground_em"),
          emissiveIntensity: "night" == window.game.environment.name ? 0.2 : 0,
          shininess: 0,
        })),
        (this.materials.spinner_interior = new da({
          map: this.getTexture("spinner_interior"),
          normalMap: this.getTexture("spinner_interior_norm"),
          aoMap: this.getTexture("spinner_interior_ao"),
          aoMapIntensity: 1,
          roughness: 0.6,
          metalness: 0,
          emissive: 16777215,
          emissiveMap: this.getTexture("spinner_interior_em"),
          emissiveIntensity: 0.1,
        })),
        (this.materials.spinner_exterior = new pa({
          map: this.getTexture("spinner_exterior"),
          shininess: 0,
        })),
        (this.materials.spinner_windows_advanced = new ua({
          color: 16777215,
          transparent: !1,
          opacity: 1,
          roughness: 0.5,
          roughnessMap: this.getTexture("spinner_windows_rough"),
          metalness: 0,
          reflectivity: 1,
          transmission: 1,
          transmissionMap: this.getTexture("spinner_windows_trans"),
          thickness: 0.01,
          normalMap: this.getTexture("spinner_windows_norm"),
        })),
        (this.materials.spinner_windows_simple = new da({
          color: 8421504,
          transparent: !0,
          opacity: 0.1,
          envMap: this.getTexture("env_night_windshield"),
          roughness: 0,
          metalness: 1,
          normalMap: this.getTexture("spinner_windows_norm"),
          blending: 2,
        })),
        (this.materials.cars = new pa({
          map: this.getTexture("cars"),
          emissive: 16777215,
          emissiveMap: this.getTexture("cars_em"),
          emissiveIntensity: 1,
          side: 2,
        })),
        (this.materials.storefronts = new pa({
          map: this.getTexture("storefronts"),
          emissive: 16777215,
          emissiveMap: this.getTexture("storefronts_em"),
          emissiveIntensity: this.buildingWindowsEmissiveIntensity,
          shininess: 0,
        }));
      for (let t = 0; t < 10; t++) {
        let e = this.padNumber(t + 1);
        this.materials["building_" + e] = new pa({
          map: this.getTexture("building_" + e),
          specular: 16777215,
          specularMap: this.getTexture("building_" + e + "_rough"),
          envMap: this.getTexture("env_night"),
          emissive: new ai("hsl(" + 360 * Math.random() + ", 100%, 95%)"),
          emissiveMap: this.getTexture("building_" + e + "_em"),
          emissiveIntensity: this.buildingWindowsEmissiveIntensity,
          bumpMap: this.getTexture("building_" + e),
          bumpScale: 5,
        });
      }
      this.materials.mega_building_01 = new pa({
        map: this.getTexture("mega_building_01"),
        specular: 7829367,
        shininess: 1,
        emissive: 16777215,
        emissiveMap: this.getTexture("mega_building_01_em"),
        emissiveIntensity: this.buildingWindowsEmissiveIntensity,
        bumpMap: this.getTexture("mega_building_01"),
        bumpScale: 10,
      });
      for (let t = 0; t < 5; t++) {
        let e = this.padNumber(t + 1);
        this.materials["ads_" + e] = new pa({
          emissive: 16777215,
          emissiveMap: this.getTexture("ads_" + e),
          emissiveIntensity: this.adsEmissiveIntensity,
          blending: 2,
          fog: !1,
          side: 2,
        });
      }
      for (let t = 0; t < 5; t++) {
        let e = this.padNumber(t + 1);
        this.materials["ads_large_" + e] = new pa({
          emissive: 16777215,
          emissiveMap: this.getTexture("ads_large_" + e),
          emissiveIntensity: this.adsEmissiveIntensity,
          blending: 2,
          fog: !1,
          side: 2,
        });
      }
      for (let t = 0; t < 3; t++) {
        let e = this.padNumber(t + 1);
        this.materials["smoke_" + e] = new pa({
          alphaMap: this.getTexture("smoke_" + e),
          color: 16777215,
          shininess: 0,
          specular: 0,
          blending: 2,
          depthWrite: !1,
          transparent: !1,
        });
      }
      for (let t = 0; t < 4; t++) {
        let e = this.padNumber(t + 1);
        this.materials["spotlight_" + e] = new pa({
          alphaMap: this.getTexture("spotlight_" + e),
          color: 16777215,
          shininess: 0,
          specular: 0,
          blending: 2,
          depthWrite: !1,
          transparent: !1,
        });
      }
    }
    getTexture(t) {
      return this.textures[t];
    }
    getModel(t) {
      return this.models[t];
    }
    getMaterial(t) {
      return this.materials[t];
    }
    padNumber(t) {
      return t.toString().padStart(2, "0");
    }
  }
  class Yo {
    constructor(t) {
      (this.scene = t.scene),
        (this.renderer = t.renderer),
        (this.controller = t.controller),
        (this.player_height = 250),
        (this.mouse_sensitivity = 0.00125),
        (this.look_smooth = 0.15),
        (this.look_roll_factor = 0.1),
        (this.max_look_speed = 200),
        (this.move_accel = 0.25),
        (this.walk_speed = 0.65),
        (this.run_speed = 4),
        (this.soundWind = null),
        (this.soundCityAmbient = null),
        (this.camera_fov = 80),
        (this.camera_fov_to = this.camera_fov),
        (this.camera = new Ji(
          this.camera_fov,
          window.innerWidth / window.innerHeight,
          1,
          2800
        )),
        (this.camera.rotation.order = "YXZ"),
        (this.camera.rotation.y = Math.PI),
        (this.camera.position.y = this.player_height),
        (this.camera_target = new Ge()),
        (this.camera_target.rotation.order = "YXZ"),
        (this.camera_target.rotation.y = Math.PI),
        (this.body = new Ge()),
        (this.body.position.x = t.x),
        (this.body.position.z = t.z),
        (this.body.position.y = this.player_height),
        (this.noise_shake = new Perlin()),
        this.noise_shake.noiseDetail(8, 0.5),
        (this.velocity = new Ht()),
        (this.move_max_speed = 0),
        (this.move_max_speed_current = 0);
    }
    update() {
      var t = this.controller.mouse_move_x,
        e = this.controller.mouse_move_y;
      t > this.max_look_speed && (t = this.max_look_speed),
        t < -this.max_look_speed && (t = -this.max_look_speed),
        e > this.max_look_speed && (e = this.max_look_speed),
        e < -this.max_look_speed && (e = -this.max_look_speed),
        (this.camera_target.rotation.x -= e * this.mouse_sensitivity),
        this.camera_target.rotation.x < -Math.PI / 2 + 0.01 &&
          (this.camera_target.rotation.x = -Math.PI / 2 + 0.01),
        this.camera_target.rotation.x > Math.PI / 2 - 0.01 &&
          (this.camera_target.rotation.x = Math.PI / 2 - 0.01),
        (this.camera_target.rotation.y -= t * this.mouse_sensitivity);
      let i = this.controller.get_mouse_wheel();
      0 !== i &&
        ((this.camera_fov_to += 0.05 * i),
        (this.camera_fov_to = Math.max(Math.min(this.camera_fov_to, 90), 30))),
        (this.camera.fov += 0.1 * (this.camera_fov_to - this.camera.fov)),
        this.camera.updateProjectionMatrix(),
        (this.camera.position.z = this.body.position.z),
        (this.camera.position.x = this.body.position.x),
        (this.camera.position.y = this.body.position.y),
        (this.camera_target.rotation.z =
          -this.angle_dist(
            this.camera_target.rotation.y,
            this.camera.rotation.y
          ) * this.look_roll_factor),
        this.camera.quaternion.slerp(
          this.camera_target.quaternion,
          this.look_smooth
        ),
        this.controller.key_up ||
        this.controller.key_down ||
        this.controller.key_left ||
        this.controller.key_right
          ? (this.controller.key_up &&
              ((this.velocity.z -=
                Math.cos(-this.camera.rotation.y) * this.move_accel),
              (this.velocity.x +=
                Math.sin(-this.camera.rotation.y) * this.move_accel)),
            this.controller.key_down &&
              ((this.velocity.z -=
                Math.cos(-this.camera.rotation.y + Math.PI) * this.move_accel),
              (this.velocity.x +=
                Math.sin(-this.camera.rotation.y + Math.PI) * this.move_accel)),
            this.controller.key_left &&
              ((this.velocity.z -=
                Math.cos(-this.camera.rotation.y - Math.PI / 2) *
                this.move_accel),
              (this.velocity.x +=
                Math.sin(-this.camera.rotation.y - Math.PI / 2) *
                this.move_accel)),
            this.controller.key_right &&
              ((this.velocity.z -=
                Math.cos(-this.camera.rotation.y + Math.PI / 2) *
                this.move_accel),
              (this.velocity.x +=
                Math.sin(-this.camera.rotation.y + Math.PI / 2) *
                this.move_accel)))
          : this.velocity.clampLength(
              0,
              this.velocity.length() - this.move_accel
            ),
        (this.move_max_speed = this.controller.key_shift
          ? this.run_speed
          : this.walk_speed),
        this.move_max_speed_current < this.move_max_speed &&
          (this.move_max_speed_current = this.move_max_speed),
        this.move_max_speed_current > this.move_max_speed &&
          (this.move_max_speed_current -= this.move_accel),
        this.velocity.clampLength(0, this.move_max_speed_current),
        (this.body.position.x +=
          this.velocity.x * (0.01 * this.body.position.y)),
        (this.body.position.z +=
          this.velocity.z * (0.01 * this.body.position.y)),
        this.controller.key_r &&
          (this.body.position.y = 1.02 * this.body.position.y),
        this.controller.key_f &&
          (this.body.position.y = this.body.position.y / 1.02),
        this.body.position.y < 15 && (this.body.position.y = 15),
        this.body.position.y > 800 && (this.body.position.y = 800),
        this.soundWind &&
          this.soundWind.setVolume(
            0.1 *
              Math.min(Math.max(this.velocity.length() - this.walk_speed, 0), 1)
          ),
        this.soundCityAmbient &&
          this.soundCityAmbient.setVolume(1 - this.body.position.y / 800);
    }
    onWindowResize() {
      (this.camera.aspect = window.innerWidth / window.innerHeight),
        this.camera.updateProjectionMatrix();
    }
    angle_dist(t, e) {
      var i, n;
      return (
        (t = this.fix_angle(t)),
        (e = this.fix_angle(e)) > t
          ? ((i = e - t), (n = t + (2 * Math.PI - e)))
          : ((i = e + (2 * Math.PI - t)), (n = t - e)),
        i < n ? i : -n
      );
    }
    fix_angle(t) {
      return t - 2 * Math.PI * Math.floor(t / (2 * Math.PI));
    }
  }
  class Ko {
    constructor(t) {
      (this.scene = t.scene),
        (this.renderer = t.renderer),
        (this.controller = t.controller),
        (this.player_height = 250),
        (this.mouse_sensitivity = 0.001),
        (this.look_smooth = 0.1),
        (this.look_roll_factor = -0.065),
        (this.max_look_speed = 200),
        (this.move_accel = 0.02),
        (this.walk_speed = 1),
        (this.run_speed = 3),
        (this.light = new Ha(53997, 0.25, 3)),
        (this.light.decay = 1),
        this.scene.add(this.light),
        (this.soundWind = null),
        (this.soundStress = null),
        (this.soundChimeUp = null),
        (this.soundChimeDown = null),
        (this.car = null),
        (this.car_windows = null),
        (this.car = new Hi(window.game.assets.getModel("spinner"), [
          window.game.assets.getMaterial("spinner_interior"),
          window.game.assets.getMaterial("spinner_exterior"),
        ]));
      const e =
        "advanced" == window.game.settings.windshieldShader
          ? window.game.assets.getMaterial("spinner_windows_advanced")
          : window.game.assets.getMaterial("spinner_windows_simple");
      (this.car_windows = new Hi(
        window.game.assets.getModel("spinner_windows"),
        e
      )),
        this.car && this.scene.add(this.car),
        this.car_windows && this.scene.add(this.car_windows),
        (this.camera_fov = 50),
        (this.camera_fov_to = this.camera_fov),
        (this.camera = new Ji(
          this.camera_fov,
          window.innerWidth / window.innerHeight,
          0.15,
          2800
        )),
        (this.camera.rotation.order = "YXZ"),
        (this.camera.rotation.y = Math.PI),
        (this.camera.position.y = this.player_height),
        (this.camera_target = new Ge()),
        (this.camera_target.rotation.order = "YXZ"),
        (this.camera_target.rotation.y = Math.PI),
        (this.body = new Ge()),
        (this.body.position.x = t.x),
        (this.body.position.z = t.z),
        (this.body.position.y = this.player_height),
        (this.noise_shake = new Perlin()),
        this.noise_shake.noiseDetail(8, 0.5),
        (this.car_dir = 0),
        (this.car_dir_v = 0),
        (this.car_dir_to = 0),
        (this.car_pitch = 0),
        (this.car_pitch_v = 0),
        (this.car_pitch_to = 0),
        (this.velocity = new Ht()),
        (this.move_max_speed = 0),
        (this.move_max_speed_current = 0),
        (this.autopilot = !0),
        (this.autoaltitude = !0),
        (this.height_step = Math.PI);
    }
    update() {
      var t = this.controller.mouse_move_x,
        e = this.controller.mouse_move_y;
      t > this.max_look_speed && (t = this.max_look_speed),
        t < -this.max_look_speed && (t = -this.max_look_speed),
        e > this.max_look_speed && (e = this.max_look_speed),
        e < -this.max_look_speed && (e = -this.max_look_speed),
        (this.camera_target.rotation.x -= e * this.mouse_sensitivity),
        this.camera_target.rotation.x < -Math.PI / 2 + 0.1 &&
          (this.camera_target.rotation.x = -Math.PI / 2 + 0.1),
        this.camera_target.rotation.x > Math.PI / 2 - 0.1 &&
          (this.camera_target.rotation.x = Math.PI / 2 - 0.1),
        (this.camera_target.rotation.y -= t * this.mouse_sensitivity);
      let i = this.controller.get_mouse_wheel();
      0 !== i &&
        ((this.camera_fov_to += 0.05 * i),
        (this.camera_fov_to = Math.max(Math.min(this.camera_fov_to, 70), 30))),
        (this.camera.fov += 0.1 * (this.camera_fov_to - this.camera.fov)),
        this.camera.updateProjectionMatrix(),
        (this.camera.position.z = this.body.position.z),
        (this.camera.position.x = this.body.position.x),
        (this.camera.position.y = this.body.position.y),
        (this.camera_target.rotation.z =
          -this.angle_dist(
            this.camera_target.rotation.y,
            this.camera.rotation.y
          ) * this.look_roll_factor),
        this.camera.quaternion.slerp(
          this.camera_target.quaternion,
          this.look_smooth
        ),
        this.controller.key_pressed_space &&
          (this.autopilot
            ? null !== this.soundChimeDown &&
              (this.soundChimeDown.isPlaying && this.soundChimeDown.stop(),
              this.soundChimeDown.play())
            : ((this.car_pitch_to = 0),
              null !== this.soundChimeUp &&
                (this.soundChimeUp.isPlaying && this.soundChimeUp.stop(),
                this.soundChimeUp.play())),
          (this.autoaltitude = !1),
          (this.autopilot = !this.autopilot)),
        this.autoaltitude &&
          ((this.height_step += 0.001),
          (this.body.position.y =
            150 * (Math.cos(this.height_step) + 1) + 115)),
        this.autopilot ||
          ((this.car_dir_to = this.camera.rotation.y + Math.PI),
          (this.car_pitch_to = this.camera.rotation.x)),
        (this.car_dir_v +=
          75e-5 * this.angle_dist(this.car_dir, this.car_dir_to)),
        (this.car_pitch_v +=
          0.003 * this.angle_dist(this.car_pitch, this.car_pitch_to)),
        (this.car_dir_v *= 0.965),
        (this.car_pitch_v *= 0.965),
        (this.car_dir += this.car_dir_v),
        (this.car_pitch += this.car_pitch_v),
        this.car.rotation.set(0, this.car_dir, 0);
      var n = new Ht(0, 0, 1),
        r = new Ht(-1, 0, 0);
      if (
        (this.car.rotateOnAxis(n, -20 * this.car_dir_v),
        this.car.rotateOnAxis(r, this.car_pitch),
        this.car.position.set(
          this.camera.position.x,
          this.camera.position.y,
          this.camera.position.z
        ),
        !this.autopilot)
      ) {
        let t =
          this.noise_shake.noise(
            0.01 * this.body.position.x,
            0.01 * this.body.position.z
          ) - 0.5;
        (this.car_dir += 0.0015 * t), (this.car_pitch += 0.003 * t);
      }
      var s =
          this.noise_shake.noise(
            5e-4 * this.body.position.x,
            5e-4 * this.body.position.z
          ) - 0.5,
        a =
          this.noise_shake.noise(
            0.005 * this.body.position.x,
            0.005 * this.body.position.z
          ) - 0.5,
        o =
          this.noise_shake.noise(
            0.005 * -this.body.position.x,
            0.005 * -this.body.position.z
          ) - 0.5,
        l = this.clamp(this.velocity.length() - this.walk_speed, 0, 1);
      (this.car.position.x = this.car.position.x + 0.15 * s + a * l * 0.1),
        (this.car.position.z = this.car.position.z + 0.15 * s + o * l * 0.1),
        (this.car.position.y = this.car.position.y + 0.25 * s + a * l * 0.1),
        this.car_windows &&
          this.car_windows.position.set(
            this.car.position.x,
            this.car.position.y,
            this.car.position.z
          ),
        this.car_windows &&
          this.car_windows.rotation.set(
            this.car.rotation.x,
            this.car.rotation.y,
            this.car.rotation.z
          ),
        this.light.position.set(
          this.car.position.x,
          this.car.position.y,
          this.car.position.z
        );
      let h = this.controller.key_shift ? 2 * this.move_accel : this.move_accel;
      (this.velocity.z -=
        Math.cos(-this.car_dir + Math.PI) * Math.cos(this.car_pitch) * h),
        (this.velocity.x +=
          Math.sin(-this.car_dir + Math.PI) * Math.cos(this.car_pitch) * h),
        (this.velocity.y += Math.sin(this.car_pitch) * h),
        (this.move_max_speed = this.controller.key_shift
          ? this.run_speed
          : this.walk_speed),
        (this.move_max_speed *= 1 + (-this.car_pitch / Math.PI) * 2),
        this.move_max_speed_current < this.move_max_speed &&
          (this.move_max_speed_current = this.move_max_speed),
        this.move_max_speed_current >= this.move_max_speed &&
          (this.move_max_speed_current -= 2 * this.move_accel),
        this.velocity.clampLength(0, this.move_max_speed_current),
        (this.body.position.x += this.velocity.x),
        (this.body.position.z += this.velocity.z),
        (this.body.position.y += this.velocity.y),
        this.body.position.y < 15 && (this.body.position.y = 15),
        this.body.position.y > 800 && (this.body.position.y = 800),
        this.soundWind &&
          this.soundWind.setVolume(
            this.clamp(this.velocity.length() - this.walk_speed, 0, 1)
          ),
        this.soundStress &&
          this.soundStress.setVolume(
            this.clamp(
              40 *
                Math.max(Math.abs(this.car_dir_v), Math.abs(this.car_pitch_v)),
              0,
              1
            )
          );
    }
    onWindowResize() {
      (this.camera.aspect = window.innerWidth / window.innerHeight),
        this.camera.updateProjectionMatrix();
    }
    angle_dist(t, e) {
      var i, n;
      return (
        (t = this.fix_angle(t)),
        (e = this.fix_angle(e)) > t
          ? ((i = e - t), (n = t + (2 * Math.PI - e)))
          : ((i = e + (2 * Math.PI - t)), (n = t - e)),
        i < n ? i : -n
      );
    }
    fix_angle(t) {
      return t - 2 * Math.PI * Math.floor(t / (2 * Math.PI));
    }
    clamp(t, e, i) {
      return Math.min(Math.max(t, e), i);
    }
  }
  class Zo {
    constructor() {
      (this.enabled = !1),
        (this.mouse_move_x = 0),
        (this.mouse_move_y = 0),
        (this.mouse_scroll = 0),
        (this.key_right = !1),
        (this.key_down = !1),
        (this.key_left = !1),
        (this.key_up = !1),
        (this.key_shift = !1),
        (this.key_plus = !1),
        (this.key_minus = !1),
        (this.key_f = !1),
        (this.key_r = !1),
        (this.key_pressed_f = !1),
        (this.key_pressed_r = !1),
        (this.key_pressed_right_bracket = !1),
        (this.key_pressed_left_bracket = !1),
        (this.key_pressed_p = !1),
        (this.key_pressed_space = !1),
        (this.key_pressed_1 = !1),
        (this.key_pressed_2 = !1),
        (this.key_pressed_3 = !1),
        (this.mb_right = !1),
        (this.mb_middle = !1),
        (this.mb_left = !1),
        (this.mb_left_released = !1);
      var t = this;
      document.addEventListener(
        "mousemove",
        function (e) {
          t.on_mouse_move(e);
        },
        !1
      ),
        document.addEventListener(
          "mousedown",
          function (e) {
            t.on_mouse_down(e);
          },
          !1
        ),
        document.addEventListener(
          "mouseup",
          function (e) {
            t.on_mouse_up(e);
          },
          !1
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            t.on_key_down(e);
          },
          !1
        ),
        document.addEventListener(
          "keyup",
          function (e) {
            t.on_key_up(e);
          },
          !1
        ),
        document.addEventListener(
          "mousewheel",
          function (e) {
            t.on_mouse_wheel(e);
          },
          !1
        );
    }
    update() {
      (this.mouse_move_x = 0),
        (this.mouse_move_y = 0),
        (this.key_pressed_f = !1),
        (this.key_pressed_r = !1),
        (this.key_pressed_right_bracket = !1),
        (this.key_pressed_left_bracket = !1),
        (this.key_pressed_p = !1),
        (this.key_pressed_space = !1),
        (this.key_pressed_1 = !1),
        (this.key_pressed_2 = !1),
        (this.key_pressed_3 = !1),
        (this.mb_left_released = !1);
    }
    on_mouse_wheel(t) {
      this.mouse_scroll = t.deltaY;
    }
    get_mouse_wheel() {
      let t = this.mouse_scroll;
      return (this.mouse_scroll = 0), t;
    }
    on_mouse_move(t) {
      this.enabled &&
        ((this.mouse_move_x =
          t.movementX || t.mozMovementX || t.webkitMovementX || 0),
        (this.mouse_move_y =
          t.movementY || t.mozMovementY || t.webkitMovementY || 0));
    }
    on_key_down(t) {
      if (this.enabled)
        switch (t.code) {
          case "Digit1":
            this.key_pressed_1 = !0;
            break;
          case "Digit2":
            this.key_pressed_2 = !0;
            break;
          case "Digit3":
            this.key_pressed_3 = !0;
            break;
          case "KeyD":
            this.key_right = !0;
            break;
          case "KeyS":
            this.key_down = !0;
            break;
          case "KeyA":
            this.key_left = !0;
            break;
          case "KeyW":
            this.key_up = !0;
            break;
          case "ShiftLeft":
            this.key_shift = !0;
            break;
          case "Equal":
            this.key_plus = !0;
            break;
          case "Minus":
            this.key_minus = !0;
            break;
          case "BracketLeft":
            this.key_pressed_left_bracket = !0;
            break;
          case "BracketRight":
            this.key_pressed_right_bracket = !0;
            break;
          case "KeyP":
            this.key_pressed_p = !0;
            break;
          case "Space":
            this.key_pressed_space = !0;
            break;
          case "KeyF":
            (this.key_f = !0), (this.key_pressed_f = !0);
            break;
          case "KeyR":
            (this.key_r = !0), (this.key_pressed_r = !0);
        }
    }
    on_key_up(t) {
      if (this.enabled)
        switch (t.code) {
          case "KeyD":
            this.key_right = !1;
            break;
          case "KeyS":
            this.key_down = !1;
            break;
          case "KeyA":
            this.key_left = !1;
            break;
          case "KeyW":
            this.key_up = !1;
            break;
          case "ShiftLeft":
            this.key_shift = !1;
            break;
          case "Equal":
            this.key_plus = !1;
            break;
          case "Minus":
            this.key_minus = !1;
            break;
          case "KeyF":
            this.key_f = !1;
            break;
          case "KeyR":
            this.key_r = !1;
        }
    }
    on_mouse_down(t) {
      if (this.enabled)
        switch (t.which) {
          case 1:
            this.mb_left = !0;
            break;
          case 2:
            this.mb_middle = !0;
            break;
          case 3:
            this.mb_right = !0;
        }
    }
    on_mouse_up(t) {
      if (this.enabled)
        switch (t.which) {
          case 1:
            (this.mb_left = !1), (this.mb_left_released = !0);
            break;
          case 2:
            this.mb_middle = !1;
            break;
          case 3:
            this.mb_right = !1;
        }
    }
  }
  class Jo {
    constructor(t) {
      (this.audioListener = t.audioListener),
        (this.controller = t.controller),
        (this.volume = 0.5),
        (this.audioLoader = new Ya()),
        (this.trackIndex = 0),
        (this.currentTrack = null),
        (this.tracks = [
          {
            path: "assets/music/cybertruck-mood-maze-main-version-15624-02-20.mp3",
            audio: null,
          },
          {
            path: "assets/music/enchanted-luminescence-pecan-pie-main-version-26358-02-51.mp3",
            audio: null,
          },
          {
            path: "assets/music/golden-hour-vens-adams-main-version-27949-02-32.mp3",
            audio: null,
          },
          {
            path: "assets/music/hyperdrive-d0d-main-version-28328-02-37.mp3",
            audio: null,
          },
          {
            path: "assets/music/interstellar-vens-adams-main-version-27940-02-27.mp3",
            audio: null,
          },
          {
            path: "assets/music/jetlag-mountaineer-main-version-20406-02-17.mp3",
            audio: null,
          },
          {
            path: "assets/music/lost-dream-tatami-main-version-26162-02-40.mp3",
            audio: null,
          },
          {
            path: "assets/music/messier-prigida-main-version-28473-03-00.mp3",
            audio: null,
          },
          {
            path: "assets/music/outgoing-era-bosnow-main-version-02-42-14264.mp3",
            audio: null,
          },
          {
            path: "assets/music/polarity-prigida-main-version-25317-02-47.mp3",
            audio: null,
          },
          {
            path: "assets/music/star-champion-prigida-main-version-28474-02-28.mp3",
            audio: null,
          },
          {
            path: "assets/music/sunset-horizon-tecnosine-main-version-03-19-13879.mp3",
            audio: null,
          },
          {
            path: "assets/music/volt-fass-main-version-28511-02-26.mp3",
            audio: null,
          },
          {
            path: "assets/music/we-fly-kaleidoscope-main-version-22558-02-32.mp3",
            audio: null,
          },
          {
            path: "assets/music/1980-miracle-noise-cake-main-version-16821-02-26.mp3",
            audio: null,
          },
          {
            path: "assets/music/continual-prigida-main-version-25319-02-39.mp3",
            audio: null,
          },
        ]),
        this.shuffle(),
        this.play();
    }
    update() {
      if (
        (this.controller.key_pressed_right_bracket && this.playNext(),
        this.controller.key_pressed_p)
      ) {
        const t = this.tracks[this.trackIndex];
        t.audio.isPlaying ? t.audio.pause() : t.audio.play();
      }
    }
    play() {
      const t = this.tracks[this.trackIndex];
      null == t.audio
        ? ((t.audio = new io(this.audioListener)),
          this.audioLoader.load(t.path, (e) => {
            t.audio.setBuffer(e),
              t.audio.setVolume(this.volume),
              (t.audio.onEnded = () => {
                this.playNext();
              }),
              t.audio.play();
          }))
        : t.audio.play();
    }
    playNext() {
      this.tracks[this.trackIndex].audio.stop(),
        this.trackIndex++,
        this.trackIndex == this.tracks.length &&
          (this.shuffle(), (this.trackIndex = 0)),
        this.play();
    }
    shuffle() {
      let t,
        e = this.tracks.length;
      for (; e > 0; )
        (t = Math.floor(Math.random() * e)),
          e--,
          ([this.tracks[e], this.tracks[t]] = [this.tracks[t], this.tracks[e]]);
    }
  }
  class Qo {
    constructor(t) {
      var e = {
        camera: !1,
        cell_size: 1,
        cell_count: 10,
        debug: !1,
        spawn_obj: !1,
      };
      (this.camera = t.camera || e.camera),
        (this.cell_size = t.cell_size || e.cell_size),
        (this.cell_count = t.cell_count || e.cell_count),
        (this.debug = t.debug || e.debug),
        (this.debug_canvas = !1),
        (this.debug_canvas_ctx = !1),
        (this.noise = t.noise || e.noise),
        (this.noise_scale = t.noise_scale || e.noise_scale),
        (this.spawn_obj = t.spawn_obj || e.spawn_obj),
        (this.x = Math.floor(this.camera.position.x / this.cell_size)),
        (this.z = Math.floor(this.camera.position.z / this.cell_size)),
        (this.px = this.x),
        (this.pz = this.z),
        (this.grid = new Array(this.cell_count));
      for (var i = 0; i < this.cell_count; i++) {
        this.grid[i] = new Array();
        for (var n = 0; n < this.cell_count; n++) this.grid[i][n] = null;
      }
      this.add_items();
    }
    update() {
      (this.px = this.x),
        (this.pz = this.z),
        (this.x = Math.floor(this.camera.position.x / this.cell_size)),
        (this.z = Math.floor(this.camera.position.z / this.cell_size)),
        (this.px == this.x && this.pz == this.z) ||
          (this.remove_items(this.px - this.x, this.pz - this.z),
          this.shift_grid(this.px - this.x, this.pz - this.z),
          this.add_items()),
        this.update_items();
    }
    remove_items(t, e) {
      var i, n;
      if (t < 0)
        for (i = 0; i < this.grid.length; i++)
          for (n = 0; n < -t; n++)
            null != this.grid[i][n] &&
              ("function" == typeof this.grid[i][n].remove &&
                this.grid[i][n].remove(),
              (this.grid[i][n] = null));
      if (t > 0)
        for (i = 0; i < this.grid.length; i++)
          for (n = this.grid[i].length - t; n < this.grid[i].length; n++)
            null != this.grid[i][n] &&
              ("function" == typeof this.grid[i][n].remove &&
                this.grid[i][n].remove(),
              (this.grid[i][n] = null));
      if (e < 0)
        for (i = 0; i < -e; i++)
          for (n = 0; n < this.grid[i].length; n++)
            null != this.grid[i][n] &&
              ("function" == typeof this.grid[i][n].remove &&
                this.grid[i][n].remove(),
              (this.grid[i][n] = null));
      if (e > 0)
        for (i = this.grid.length - e; i < this.grid.length; i++)
          for (n = 0; n < this.grid[i].length; n++)
            null != this.grid[i][n] &&
              ("function" == typeof this.grid[i][n].remove &&
                this.grid[i][n].remove(),
              (this.grid[i][n] = null));
    }
    shift_grid(t, e) {
      var i,
        n,
        r,
        s = new Array(this.grid.length);
      for (n = 0; n < this.grid.length; ++n) s[n] = this.grid[n].slice(0);
      for (n = 0; n < s.length; n++)
        for (r = 0; r < s[n].length; r++)
          (i =
            n - e < 0 || n - e >= s.length || r - t < 0 || r - t >= s[n].length
              ? null
              : s[n - e][r - t]),
            (this.grid[n][r] = i);
    }
    add_items() {
      var t,
        e,
        i,
        n,
        r = Math.ceil(this.cell_count / 2);
      for (t = 0; t < this.grid.length; t++)
        for (e = 0; e < this.grid[t].length; e++)
          this.distance({ x: r, y: r }, { x: t, y: e }) <= r &&
            null == this.grid[t][e] &&
            ((i =
              Math.floor(this.camera.position.x / this.cell_size) *
                this.cell_size +
              e * this.cell_size -
              Math.floor((this.cell_count * this.cell_size) / 2)),
            (n =
              Math.floor(this.camera.position.z / this.cell_size) *
                this.cell_size +
              t * this.cell_size -
              Math.floor((this.cell_count * this.cell_size) / 2)),
            (this.grid[t][e] = new this.spawn_obj(i, n)));
    }
    update_items() {
      var t, e;
      for (t = 0; t < this.grid.length; t++)
        for (e = 0; e < this.grid[t].length; e++)
          null != this.grid[t][e] &&
            "function" == typeof this.grid[t][e].update &&
            this.grid[t][e].update();
    }
    distance(t, e) {
      var i = e.x - t.x,
        n = e.y - t.y;
      return Math.sqrt(i * i + n * n);
    }
  }
  class $o {
    constructor() {}
    getBuildingMat(t) {
      let e = [
        "building_01",
        "building_02",
        "building_03",
        "building_04",
        "building_05",
        "building_07",
      ];
      return window.game.assets.getMaterial(e[Math.floor(t * e.length)]);
    }
    getBigBuildingMat(t, e) {
      let i = [
          "building_01",
          "building_02",
          "building_03",
          "building_04",
          "building_05",
        ],
        n = ["building_06", "building_08", "building_09", "building_10"];
      return e
        ? window.game.assets.getMaterial(n[Math.floor(t * n.length)])
        : window.game.assets.getMaterial(i[Math.floor(t * i.length)]);
    }
    getBuildingRotation(t) {
      let e = [0, 90, 180, 270];
      return e[Math.floor(t * e.length)];
    }
    fixNoise(t) {
      let e = 0.9999,
        i = (0.9999 * (t - 0.2)) / 0.55 + 0;
      return i < 0 && (i = 0), i > e && (i = e), i;
    }
  }
  class tl {
    constructor(t, e) {
      (this.x = t),
        (this.z = e),
        (this.utils = new $o()),
        (this.cityBlockSize = window.game.cityBlockSize),
        (this.roadWidth = window.game.roadWidth),
        (this.noise = window.game.cityBlockNoise),
        (this.noiseFactor = window.game.cityBlockNoiseFactor),
        (this.meshes = []),
        (this.updateables = []);
      let i = this.utils.fixNoise(
          this.noise.noise(this.x * this.noiseFactor, this.z * this.noiseFactor)
        ),
        n = this.utils.fixNoise(this.noise.noise(5 * this.x, 5 * this.z));
      if (
        i < 0.2 &&
        this.x % (6 * (this.cityBlockSize + this.roadWidth)) == 0 &&
        this.z % (6 * (this.cityBlockSize + this.roadWidth)) == 0
      ) {
        let t = this.cityBlockSize / 2,
          e = this.cityBlockSize / 2;
        if (!(this.x + t < 128 && this.x + t > -128)) {
          let i = this.utils.fixNoise(
              this.noise.noise(5 * (this.x + t), 5 * (this.z + e))
            ),
            r = this.utils.getBuildingRotation(i),
            s = 0.75 + 0.25 * i,
            a = null;
          a =
            n < 0.16
              ? "mega_01"
              : n < 0.32
              ? "mega_02"
              : n < 0.48
              ? "mega_03"
              : n < 0.64
              ? "mega_04"
              : n < 0.8
              ? "mega_05"
              : "mega_06";
          let o = new Hi(
            window.game.assets.getModel(a),
            window.game.assets.getMaterial("mega_building_01")
          );
          o.position.set(this.x + t, 0, this.z + e),
            o.scale.set(1, s, 1),
            o.rotateY((r * Math.PI) / 180),
            this.meshes.push(o);
        }
      }
      if (i < 0.1);
      else if (i < 0.8)
        for (let t = 0; t < 2; t++)
          for (let e = 0; e < 2; e++) {
            let r = t * (this.cityBlockSize / 2) + this.cityBlockSize / 4,
              s = e * (this.cityBlockSize / 2) + this.cityBlockSize / 4,
              a = this.utils.fixNoise(
                this.noise.noise(5 * (this.x + r), 5 * (this.z + s))
              ),
              o = this.utils.getBuildingRotation(a),
              l = 0.75 + 0.45 * a,
              h = !1;
            (i = this.utils.fixNoise(
              this.noise.noise(
                (this.x + r) * this.noiseFactor,
                (this.z + s) * this.noiseFactor
              )
            )),
              (n = this.utils.fixNoise(
                this.noise.noise(5 * (this.x + r), 5 * (this.z + s))
              ));
            let c = null,
              d = null;
            i < 0.267
              ? ((c = n < 0.33 ? "s_01_01" : n < 0.66 ? "s_01_02" : "s_01_03"),
                (d =
                  Math.round(100 * i) % 2 == 0 ? "ads_s_01_01" : "ads_s_01_02"))
              : i < 0.534
              ? ((c = n < 0.33 ? "s_02_01" : n < 0.66 ? "s_02_02" : "s_02_03"),
                (d =
                  Math.round(100 * i) % 2 == 0 ? "ads_s_02_01" : "ads_s_02_02"))
              : ((c = n < 0.33 ? "s_03_01" : n < 0.66 ? "s_03_02" : "s_03_03"),
                (d =
                  Math.round(100 * i) % 2 == 0 ? "ads_s_03_01" : "ads_s_03_02"),
                (h =
                  this.utils.fixNoise(
                    this.noise.noise(6 * (this.x + r), 6 * (this.z + s))
                  ) > 0.998),
                window.game.environment.spotLights &&
                  Math.random() < 0.1 &&
                  n > 0.8 &&
                  !h &&
                  this.updateables.push(
                    new rl(this.x + r, 160 * l, this.z + s)
                  )),
              i > 0.33 && i < 0.66 && (d = null);
            let u = this.utils.fixNoise(
                this.noise.noise(-3 * (this.x + r), -3 * (this.z + s))
              ),
              p = this.utils.getBuildingMat(u);
            h &&
              null != d &&
              this.updateables.push(new il(this.x + r, 190 * l, this.z + s)),
              Math.random() < 0.05 &&
                this.updateables.push(new nl(this.x + r, 190 * l, this.z + s));
            let m = new Hi(window.game.assets.getModel(c), p);
            if (
              (m.position.set(this.x + r, 0, this.z + s),
              m.scale.set(1, l, 1),
              m.rotateY((o * Math.PI) / 180),
              this.meshes.push(m),
              null != d)
            ) {
              let t = new el(
                this.x + r,
                0,
                this.z + s,
                window.game.assets.getModel(d),
                !1
              );
              t.mesh.scale.set(1, l, 1),
                t.mesh.rotateY((-o * Math.PI) / 180),
                this.updateables.push(t);
            }
          }
      else {
        let t = i > 0.975;
        var r = this.cityBlockSize / 2,
          s = this.cityBlockSize / 2;
        let e = this.utils.fixNoise(this.noise.noise(4 * this.x, 4 * this.z)),
          n = null;
        n = t
          ? e < 0.33
            ? "s_05_01"
            : e < 0.66
            ? "s_05_02"
            : "s_05_03"
          : e < 0.33
          ? "s_04_01"
          : e < 0.66
          ? "s_04_02"
          : "s_04_03";
        let a,
          o = this.utils.fixNoise(
            this.noise.noise(-3 * (this.x + r), -3 * (this.z + s))
          ),
          l = this.utils.getBigBuildingMat(o, e > 0.9),
          h = this.utils.fixNoise(
            this.noise.noise(4 * (this.x + r), 4 * (this.z + s))
          ),
          c = this.utils.getBuildingRotation(h),
          d = null;
        if (Math.round(100 * h) % 2 == 0) {
          let e = this.utils.fixNoise(
            this.noise.noise(6 * (this.x + r), 6 * (this.z + s))
          );
          (a = t
            ? ["ads_s_05_01", "ads_s_05_02", "ads_s_05_03", "ads_s_05_04"]
            : ["ads_s_04_01", "ads_s_04_02", "ads_s_04_03", "ads_s_04_04"]),
            (d = a[Math.floor(e * a.length)]);
        }
        let u = 1 + 0.5 * h,
          p = new Hi(window.game.assets.getModel(n), l);
        if (
          (p.position.set(this.x + r, 0, this.z + s),
          p.scale.set(1, u, 1),
          p.rotateY((c * Math.PI) / 180),
          this.meshes.push(p),
          null != d)
        ) {
          let e = new el(
            this.x + r,
            0,
            this.z + s,
            window.game.assets.getModel(d),
            t
          );
          e.mesh.scale.set(1, u, 1),
            e.mesh.rotateY((-c * Math.PI) / 180),
            this.updateables.push(e);
        }
      }
      let a = new un(
          this.cityBlockSize + this.roadWidth,
          this.cityBlockSize + this.roadWidth
        ),
        o = new Hi(a, window.game.assets.getMaterial("ground"));
      if (
        (o.rotateX(-Math.PI / 2),
        o.position.set(
          this.x + this.cityBlockSize / 2,
          0,
          this.z + this.cityBlockSize / 2
        ),
        this.meshes.push(o),
        t % (2 * (this.cityBlockSize + this.roadWidth)) == 0 &&
          e % (2 * (this.cityBlockSize + this.roadWidth)) == 0)
      ) {
        let t = ["storefronts", "building_02", "building_03", "building_07"],
          e = t[Math.floor(n * t.length)];
        e || (e = "storefronts");
        var l = new Hi(
          window.game.assets.getModel("storefronts"),
          window.game.assets.getMaterial(e)
        );
        l.position.set(
          this.x + this.cityBlockSize + this.roadWidth / 2,
          0,
          this.z + this.cityBlockSize + this.roadWidth / 2
        ),
          this.meshes.push(l);
      }
      for (var h = 0; h < this.meshes.length; h++)
        window.game.scene.add(this.meshes[h]);
    }
    remove() {
      for (var t = 0; t < this.meshes.length; t++)
        window.game.scene.remove(this.meshes[t]);
      for (t = 0; t < this.updateables.length; t++)
        this.updateables[t].remove();
    }
    update() {
      for (var t = 0; t < this.updateables.length; t++)
        this.updateables[t].update();
    }
  }
  class el {
    constructor(t, e, i, n, r) {
      this.adsMats = r
        ? [
            "ads_large_01",
            "ads_large_02",
            "ads_large_03",
            "ads_large_04",
            "ads_large_05",
          ]
        : ["ads_01", "ads_02", "ads_03", "ads_04", "ads_05"];
      let s = window.game.assets.getMaterial(
        this.adsMats[Math.floor(Math.random() * this.adsMats.length)]
      );
      (this.mesh = new Hi(n, s)),
        this.mesh.position.set(t, e, i),
        window.game.scene.add(this.mesh),
        (this.interval = 200 + 800 * Math.random()),
        (this.counter = Math.random() * this.interval),
        (this.switches = Math.random() < 0.5);
    }
    remove() {
      window.game.scene.remove(this.mesh);
    }
    update() {
      this.switches &&
        (this.counter++,
        this.counter > this.interval &&
          ((this.counter = 0),
          (this.mesh.material = window.game.assets.getMaterial(
            this.adsMats[Math.floor(Math.random() * this.adsMats.length)]
          ))));
    }
  }
  class il {
    constructor(t, e, i) {
      let n = [
          "topper_01",
          "topper_02",
          "topper_03",
          "topper_04",
          "topper_05",
          "topper_06",
          "topper_07",
          "topper_08",
          "topper_09",
          "topper_10",
          "topper_11",
          "topper_12",
        ],
        r = [
          "ads_large_01",
          "ads_large_02",
          "ads_large_03",
          "ads_large_04",
          "ads_large_05",
        ],
        s = window.game.assets.getMaterial(
          r[Math.floor(Math.random() * r.length)]
        ),
        a = window.game.assets.getModel(
          n[Math.floor(Math.random() * n.length)]
        );
      (this.mesh = new Hi(a, s)), this.mesh.position.set(t, e, i);
      let o = 0.8 + Math.random();
      this.mesh.scale.set(o, o, o),
        window.game.scene.add(this.mesh),
        (this.rdir =
          Math.random() <= 0.5 ? 0.01 * Math.random() : 0.01 * -Math.random());
    }
    remove() {
      window.game.scene.remove(this.mesh);
    }
    update() {
      this.mesh.rotation.y = this.mesh.rotation.y + this.rdir;
    }
  }
  class nl {
    constructor(t, e, i) {
      let n = ["smoke_01", "smoke_02", "smoke_03"],
        r = window.game.assets.getMaterial(
          n[Math.floor(Math.random() * n.length)]
        );
      (this.mesh = new Hi(window.game.assets.getModel("smoke"), r)),
        this.mesh.position.set(t, e, i);
      var s = 1 + 8 * Math.random(),
        a = s * (1 + 0.5 * Math.random());
      this.mesh.scale.set(s, a, s),
        window.game.scene.add(this.mesh),
        (this.rstep = 7 * Math.random());
    }
    remove() {
      window.game.scene.remove(this.mesh);
    }
    update() {
      (this.rstep += 0.0025),
        this.mesh.lookAt(window.game.player.camera.position),
        (this.mesh.rotation.x += 0.25 * Math.cos(this.rstep));
    }
  }
  class rl {
    constructor(t, e, i) {
      let n = ["spotlight_01", "spotlight_02", "spotlight_03", "spotlight_04"],
        r = window.game.assets.getMaterial(
          n[Math.floor(Math.random() * n.length)]
        );
      (this.mesh = new Hi(window.game.assets.getModel("spotlight"), r)),
        this.mesh.position.set(t, e, i);
      var s = 10 + 10 * Math.random();
      this.mesh.scale.set(s, s, s),
        window.game.scene.add(this.mesh),
        (this.rstep = 7 * Math.random());
    }
    remove() {
      window.game.scene.remove(this.mesh);
    }
    update() {
      (this.rstep += 0.01),
        this.mesh.lookAt(window.game.player.camera.position),
        (this.mesh.rotation.x += 0.4 * Math.cos(this.rstep));
    }
  }
  class sl {
    constructor(t, e) {
      (this.x = t),
        (this.z = e),
        (this.utils = new $o()),
        (this.cityLights = window.game.cityLights),
        (this.noise = window.game.cityBlockNoise),
        (this.noiseFactor = window.game.cityBlockNoiseFactor),
        (this.lightIndex = null);
      let i = this.utils.fixNoise(
        this.noise.noise(this.x * this.noiseFactor, this.z * this.noiseFactor)
      );
      if (i < 0.2 || i > 0.8)
        for (var n = 0; n < this.cityLights.length; n++)
          if (this.cityLights[n].free) {
            let t =
              0.5 +
              this.utils.fixNoise(this.noise.noise(4 * this.x, 4 * this.z)) / 2;
            this.cityLights[n].light.position.set(this.x, 100, this.z),
              this.cityLights[n].light.color.setHSL(t, 1, 0.5),
              (this.cityLights[n].free = !1),
              (this.lightIndex = n),
              (n = this.cityLights.length);
          }
    }
    remove() {
      null !== this.lightIndex && (this.cityLights[this.lightIndex].free = !0);
    }
    update() {}
  }
  class al {
    constructor(t, e) {
      (this.x = t),
        (this.z = e),
        (this.roadWidth = window.game.roadWidth),
        (this.cars = []);
      for (let t = 0; t < 3; t++)
        for (let e = 0; e < Math.floor(3 * Math.random()); e++)
          this.cars.push(
            new ol(t, this.x - this.roadWidth / 2, this.z - this.roadWidth / 2)
          );
    }
    remove() {
      for (var t = 0; t < this.cars.length; t++) this.cars[t].remove();
    }
    update() {
      for (var t = 0; t < this.cars.length; t++) this.cars[t].update();
    }
  }
  class ol {
    constructor(t, e, i) {
      (this.dir = t),
        (this.spawn_x = e),
        (this.spawn_z = i),
        (this.x = e),
        (this.z = i),
        (this.alt = 0),
        (this.alt_offset = 0),
        (this.speed = 1.2),
        (this.speed_factor = 1),
        (this.v = new mt());
      let n = window.game.assets.getModel(
          [
            "car_01",
            "car_02",
            "car_03",
            "car_04",
            "car_05",
            "car_06",
            "car_07",
            "car_08",
          ][Math.floor(8 * Math.random())]
        ),
        r = window.game.assets.getMaterial("cars");
      (this.mesh = new Hi(n, r)),
        this.mesh.position.set(this.spawn_x, this.alt, this.spawn_z),
        window.game.scene.add(this.mesh),
        0 == this.dir &&
          (this.v.set(this.speed, 0),
          (this.alt = 20),
          this.mesh.rotateY(Math.PI / 2),
          (this.x -= 4 * Math.floor(20 * Math.random()))),
        1 == this.dir &&
          (this.v.set(-this.speed, 0),
          (this.alt = 60),
          this.mesh.rotateY(-Math.PI / 2),
          (this.x -= 4 * Math.floor(20 * Math.random()))),
        2 == this.dir &&
          (this.v.set(0, -this.speed),
          (this.alt = 40),
          this.mesh.rotateY(Math.PI),
          (this.mesh.position.z = this.mesh.position.z - 2 * Math.random()),
          (this.z -= 4 * Math.floor(20 * Math.random()))),
        3 == this.dir &&
          (this.v.set(0, this.speed),
          (this.alt = 80),
          (this.mesh.position.z = this.mesh.position.z - 2 * Math.random()),
          (this.z -= 4 * Math.floor(20 * Math.random()))),
        Math.random() < 0.5 && (this.alt_offset = 200),
        Math.random() < 0.2 &&
          ((this.alt_offset = 400), (this.speed_factor = 2));
    }
    remove() {
      window.game.scene.remove(this.mesh);
    }
    update() {
      null != this.mesh &&
        ((this.x += this.v.x * this.speed_factor),
        (this.z += this.v.y * this.speed_factor),
        this.mesh.position.set(this.x, this.alt + this.alt_offset, this.z),
        this.mesh.position.distanceTo(window.game.player.body.position) >
          1e3 + 500 * Math.random() && this.v.multiplyScalar(-1));
    }
  }
  window.game = new (class {
    constructor() {
      (this.initialized = !1),
        console.log("initial user settings: ", window.userSettings),
        console.log("test2233"),
        (this.environment = this.getEnvironment(
          window.userSettings.environment || "night"
        ));
      const t = new URLSearchParams(window.location.search);
      console.log("bla3232"),
        (this.uiOnUnfocus = !0),
        t.has("uiOnUnfocus") && (this.uiOnUnfocus = 1 == t.get("uiOnUnfocus")),
        (this.blocker = document.getElementById("blocker")),
        (this.enterBtn = document.getElementById("enterBtn")),
        (this.canvas = document.getElementById("canvas")),
        (this.canvasOpacity = 0),
        (this.masterVolume = 0),
        (this.userMasterVolume = 1),
        this.enterBtn.addEventListener("click", () => this.onEnterClick(), !1);
    }
    load() {
      (this.assets = new qo()),
        this.assets.setPath("assets/"),
        this.assets.load();
    }
    onLoad() {
      window.setColor("c2"),
        window.newLine(),
        window.newLine(),
        window.write(">> boot sequence complete", 0, 0, null),
        window.showCredits(),
        document.getElementById("enterBtn").classList.add("show");
    }
    init() {
      if (this.initialized) return;
      (this.initialized = !0),
        console.log("Game: Initializing"),
        (this.settings = {
          mode: "drive",
          worldSeed: 9746,
          music: !0,
          soundFx: !0,
          windshieldShader: "simple",
          renderScaling: 1,
          environment: "night",
        }),
        window.userSettings.hasOwnProperty("mode") &&
          (this.settings.mode = window.userSettings.mode),
        window.userSettings.hasOwnProperty("worldSeed") &&
          (this.settings.worldSeed = window.userSettings.worldSeed),
        window.userSettings.hasOwnProperty("music") &&
          (this.settings.music = window.userSettings.music),
        window.userSettings.hasOwnProperty("soundFx") &&
          (this.settings.soundFx = window.userSettings.soundFx),
        window.userSettings.hasOwnProperty("renderScaling") &&
          (this.settings.renderScaling = parseFloat(
            window.userSettings.renderScaling
          )),
        window.userSettings.hasOwnProperty("windshieldShader") &&
          (this.settings.windshieldShader =
            window.userSettings.windshieldShader),
        window.userSettings.hasOwnProperty("environment") &&
          (this.settings.environment = window.userSettings.environment),
        console.log("Game: World seed: " + this.settings.worldSeed),
        (this.audioLoader = new Ya()),
        (this.audioListener = null),
        (this.audioInitialized = !1),
        (this.renderer = new js({ canvas: this.canvas })),
        this.renderer.setPixelRatio(
          window.devicePixelRatio * this.settings.renderScaling
        ),
        this.renderer.setSize(window.innerWidth, window.innerHeight),
        (this.renderer.toneMapping = u),
        (this.renderer.toneMappingExposure = 1),
        (this.renderer.outputColorSpace = W),
        document.body.appendChild(this.renderer.domElement),
        (this.scene = new qs()),
        (this.camera = new Ji(
          45,
          window.innerWidth / window.innerHeight,
          1,
          1e3
        )),
        (this.controls = new _o(this.camera, document.body)),
        (this.playerController = new Zo()),
        "drive" == this.settings.mode
          ? (this.player = new Ko({
              scene: this.scene,
              renderer: this.renderer,
              controller: this.playerController,
              x: -12,
              z: 0,
            }))
          : (this.player = new Yo({
              scene: this.scene,
              renderer: this.renderer,
              controller: this.playerController,
              x: 0,
              z: 0,
            })),
        (this.radio = null),
        (this.composer = new Co(this.renderer)),
        this.composer.addPass(new Lo(this.scene, this.player.camera));
      const t = new wo(Do),
        e = this.renderer.getPixelRatio();
      (t.material.uniforms.resolution.value.x = 1 / (window.innerWidth * e)),
        (t.material.uniforms.resolution.value.y = 1 / (window.innerHeight * e)),
        this.composer.addPass(t);
      const i = new Uo(new mt(window.innerWidth, window.innerHeight), 0, 0, 0);
      "night" == this.environment.name
        ? ((i.threshold = 0), (i.strength = 7), (i.radius = 1))
        : "day" == this.environment.name &&
          ((i.threshold = 0), (i.strength = 0.35), (i.radius = 1)),
        this.composer.addPass(i),
        (this.scene.background = this.assets.getTexture(this.environment.sky)),
        (this.scene.fog = new Xs(
          this.environment.fog.color,
          this.environment.fog.start,
          this.environment.fog.end
        ));
      const n = new Wa(
        this.environment.sun.color,
        this.environment.sun.intensity
      );
      (n.castShadow = !1),
        (n.position.x = this.environment.sun.x),
        (n.position.y = this.environment.sun.y),
        (n.position.z = this.environment.sun.z),
        this.scene.add(n),
        this.scene.add(n.target);
      const r = new ja(
        this.environment.ambient.color,
        this.environment.ambient.intensity
      );
      if (
        (this.scene.add(r),
        (this.cityBlockSize = 128),
        (this.roadWidth = 24),
        (this.cityBlockNoise = new Perlin(this.settings.worldSeed)),
        this.cityBlockNoise.noiseDetail(8, 0.5),
        (this.cityBlockNoiseFactor = 0.0017),
        (this.generatorCityBlock = new Qo({
          camera: this.player.camera,
          cell_size: this.cityBlockSize + this.roadWidth,
          cell_count: 40,
          spawn_obj: tl,
        })),
        (this.cityLights = []),
        (this.generatorCityLights = null),
        this.environment.cityLights)
      ) {
        for (let t = 0; t < 10; t++) {
          let t = new Ha(0, 100, 2e3);
          t.decay = 1;
          let e = { light: t, free: !0 };
          this.scene.add(e.light), this.cityLights.push(e);
        }
        this.generatorCityLights = new Qo({
          camera: this.player.camera,
          cell_size: 4 * (this.cityBlockSize + this.roadWidth),
          cell_count: 8,
          spawn_obj: sl,
        });
      }
      (this.generatorTraffic = new Qo({
        camera: this.player.camera,
        cell_size: this.cityBlockSize + this.roadWidth,
        cell_count: 12,
        debug: !1,
        spawn_obj: al,
      })),
        (this.clock = new Ka()),
        (this.clockDelta = 0),
        this.animate(),
        window.addEventListener("resize", () => this.onWindowResize(), !1),
        this.controls.addEventListener("lock", () => this.onControlsLock(), !1),
        this.controls.addEventListener(
          "unlock",
          () => this.onControlsUnlock(),
          !1
        );
    }
    initAudio() {
      const t = this;
      if (!this.audioInitialized) {
        if (
          ((this.audioListener = new eo()),
          this.player.camera.add(this.audioListener),
          1 == this.settings.music &&
            (this.radio = new Jo({
              audioListener: this.audioListener,
              controller: this.playerController,
            })),
          1 == this.settings.soundFx)
        ) {
          const e = new io(this.audioListener);
          if (
            (this.audioLoader.load(
              "assets/sounds/traffic_ambient.wav",
              function (t) {
                e.setBuffer(t), e.setLoop(!0), e.setVolume(1), e.play();
              }
            ),
            "drive" == this.settings.mode)
          ) {
            const e = new io(this.audioListener);
            this.audioLoader.load(
              "assets/sounds/car_ambient.wav",
              function (t) {
                e.setBuffer(t), e.setLoop(!0), e.setVolume(1), e.play();
              }
            );
            const i = new io(this.audioListener);
            this.audioLoader.load("assets/sounds/car_wind.wav", function (e) {
              i.setBuffer(e),
                i.setLoop(!0),
                i.setVolume(0),
                i.play(),
                (t.player.soundWind = i);
            });
            const n = new io(this.audioListener);
            this.audioLoader.load("assets/sounds/car_stress.wav", function (e) {
              n.setBuffer(e),
                n.setLoop(!0),
                n.setVolume(0),
                n.play(),
                (t.player.soundStress = n);
            });
            const r = new io(this.audioListener);
            this.audioLoader.load("assets/sounds/chime_up.wav", function (e) {
              r.setBuffer(e),
                r.setLoop(!1),
                r.setVolume(1),
                (t.player.soundChimeUp = r);
            });
            const s = new io(this.audioListener);
            this.audioLoader.load("assets/sounds/chime_down.wav", function (e) {
              s.setBuffer(e),
                s.setLoop(!1),
                s.setVolume(1),
                (t.player.soundChimeDown = s);
            });
          } else {
            const e = new io(this.audioListener);
            this.audioLoader.load(
              "assets/sounds/city_ambient.wav",
              function (i) {
                e.setBuffer(i),
                  e.setLoop(!0),
                  e.setVolume(0),
                  e.play(),
                  (t.player.soundCityAmbient = e);
              }
            );
            const i = new io(this.audioListener);
            this.audioLoader.load("assets/sounds/car_wind.wav", function (e) {
              i.setBuffer(e),
                i.setLoop(!0),
                i.setVolume(0),
                i.play(),
                (t.player.soundWind = i);
            });
          }
        }
        this.audioInitialized = !0;
      }
    }
    animate(t) {
      requestAnimationFrame(() => this.animate());
      let e = this.clock.getDelta();
      (this.clockDelta += e),
        this.canvasOpacity < 1 &&
          ((this.canvasOpacity += 0.005 * this.clockDelta),
          (this.canvas.style.opacity = this.canvasOpacity),
          (this.masterVolume += 0.005 * this.clockDelta)),
        this.playerController.key_plus &&
          (this.userMasterVolume = Math.min(this.userMasterVolume + 0.02, 1)),
        this.playerController.key_minus &&
          (this.userMasterVolume = Math.max(this.userMasterVolume - 0.02, 0)),
        this.audioListener &&
          this.audioListener.setMasterVolume(
            this.masterVolume * this.userMasterVolume
          ),
        this.player.update(),
        this.radio && this.radio.update(),
        this.playerController.update(),
        this.generatorCityBlock.update(),
        null !== this.generatorCityLights && this.generatorCityLights.update(),
        this.generatorTraffic.update(),
        this.composer.render();
    }
    getEnvironment(t) {
      return {
        night: {
          name: "night",
          sky: "sky_night",
          environmentMap: "env_night",
          cityLights: !0,
          windowLights: !0,
          spotLights: !0,
          fog: { color: 1184298, start: 0, end: 2700 },
          sun: { color: 9140735, intensity: 0.1, x: 1, y: 0.5, z: 0.25 },
          ambient: { color: 1780864, intensity: 0.5 },
        },
        day: {
          name: "day",
          sky: "sky_day",
          environmentMap: "env_day",
          cityLights: !1,
          windowLights: !1,
          spotLights: !1,
          fog: { color: 11495995, start: -500, end: 2700 },
          sun: { color: 16753246, intensity: 2, x: 1, y: 0.2, z: 0.65 },
          ambient: { color: 8540723, intensity: 0.65 },
        },
      }[t];
    }
    onWindowResize() {
      const t = window.innerWidth,
        e = window.innerHeight;
      this.renderer.setSize(t, e),
        this.composer.setSize(t, e),
        this.player.onWindowResize();
    }
    onEnterClick() {
      this.init(),
        this.initAudio(),
        (this.blocker.style.backgroundColor = "#25004bb9"),
        this.blocker.classList.add("hide"),
        this.controls.lock();
    }
    onControlsLock() {
      this.playerController.enabled = !0;
    }
    onControlsUnlock() {
      (this.playerController.enabled = !1),
        this.uiOnUnfocus && this.blocker.classList.remove("hide");
    }
  })();
})();
