var me = Object.defineProperty;
var _e = (t, n, e) =>
  n in t
    ? me(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var xn = (t, n, e) => (_e(t, typeof n != "symbol" ? n + "" : n, e), e);
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = e(i);
    fetch(i.href, o);
  }
})();
var ye = { value: () => {} };
function Jt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new Et(e);
}
function Et(t) {
  this._ = t;
}
function xe(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        i = e.indexOf(".");
      if (
        (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
        e && !n.hasOwnProperty(e))
      )
        throw new Error("unknown type: " + e);
      return { type: e, name: r };
    });
}
Et.prototype = Jt.prototype = {
  constructor: Et,
  on: function (t, n) {
    var e = this._,
      r = xe(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = we(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = wn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = wn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new Et(t);
  },
  call: function (t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
};
function we(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function wn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = ye), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Kt = "http://www.w3.org/1999/xhtml";
const vn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Kt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Tt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    vn.hasOwnProperty(n) ? { space: vn[n], local: t } : t
  );
}
function ve(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Kt && n.documentElement.namespaceURI === Kt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function be(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Xn(t) {
  var n = Tt(t);
  return (n.local ? be : ve)(n);
}
function Ee() {}
function jt(t) {
  return t == null
    ? Ee
    : function () {
        return this.querySelector(t);
      };
}
function $e(t) {
  typeof t != "function" && (t = jt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new $(r, this._parents);
}
function ke(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ce() {
  return [];
}
function Kn(t) {
  return t == null
    ? Ce
    : function () {
        return this.querySelectorAll(t);
      };
}
function Ie(t) {
  return function () {
    return ke(t.apply(this, arguments));
  };
}
function Re(t) {
  typeof t == "function" ? (t = Ie(t)) : (t = Kn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new $(r, i);
}
function Fn(t) {
  return function () {
    return this.matches(t);
  };
}
function Vn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Ne = Array.prototype.find;
function Pe(t) {
  return function () {
    return Ne.call(this.children, t);
  };
}
function Me() {
  return this.firstElementChild;
}
function Te(t) {
  return this.select(t == null ? Me : Pe(typeof t == "function" ? t : Vn(t)));
}
var Ae = Array.prototype.filter;
function Se() {
  return Array.from(this.children);
}
function Le(t) {
  return function () {
    return Ae.call(this.children, t);
  };
}
function Oe(t) {
  return this.selectAll(
    t == null ? Se : Le(typeof t == "function" ? t : Vn(t))
  );
}
function De(t) {
  typeof t != "function" && (t = Fn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new $(r, this._parents);
}
function Yn(t) {
  return new Array(t.length);
}
function Ge() {
  return new $(this._enter || this._groups.map(Yn), this._parents);
}
function Ct(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
Ct.prototype = {
  constructor: Ct,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function Be(t) {
  return function () {
    return t;
  };
}
function He(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new Ct(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Xe(t, n, e, r, i, o, s) {
  var c,
    a,
    l = new Map(),
    u = n.length,
    h = o.length,
    f = new Array(u),
    p;
  for (c = 0; c < u; ++c)
    (a = n[c]) &&
      ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
      l.has(p) ? (i[c] = a) : l.set(p, a));
  for (c = 0; c < h; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new Ct(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Ke(t) {
  return t.__data__;
}
function Fe(t, n) {
  if (!arguments.length) return Array.from(this, Ke);
  var e = n ? Xe : He,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Be(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      l = 0;
    l < o;
    ++l
  ) {
    var u = r[l],
      h = i[l],
      f = h.length,
      p = Ve(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      y = (c[l] = new Array(_)),
      R = (s[l] = new Array(_)),
      W = (a[l] = new Array(f));
    e(u, h, y, R, W, p, n);
    for (var M = 0, T = 0, d, m; M < _; ++M)
      if ((d = y[M])) {
        for (M >= T && (T = M + 1); !(m = R[T]) && ++T < _; );
        d._next = m || null;
      }
  }
  return (s = new $(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ve(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ye() {
  return new $(this._exit || this._groups.map(Yn), this._parents);
}
function qe(t, n, e) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == "function"
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + "")),
    n != null && ((i = n(i)), i && (i = i.selection())),
    e == null ? o.remove() : e(o),
    r && i ? r.merge(i).order() : i
  );
}
function Ue(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      a = 0;
    a < s;
    ++a
  )
    for (
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, _ = 0;
      _ < h;
      ++_
    )
      (p = l[_] || u[_]) && (f[_] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new $(c, this._parents);
}
function ze() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function We(t) {
  t || (t = Ze);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), l, u = 0;
      u < c;
      ++u
    )
      (l = s[u]) && (a[u] = l);
    a.sort(n);
  }
  return new $(i, this._parents).order();
}
function Ze(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Qe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Je() {
  return Array.from(this);
}
function je() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function tr() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function nr() {
  return !this.node();
}
function er(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function rr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function ir(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function or(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function sr(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function cr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function ar(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function lr(t, n) {
  var e = Tt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? ir
        : rr
      : typeof n == "function"
      ? e.local
        ? ar
        : cr
      : e.local
      ? sr
      : or)(e, n)
  );
}
function qn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function ur(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function fr(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function hr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function dr(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? ur : typeof n == "function" ? hr : fr)(t, n, e ?? "")
      )
    : tt(this.node(), t);
}
function tt(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    qn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function pr(t) {
  return function () {
    delete this[t];
  };
}
function gr(t, n) {
  return function () {
    this[t] = n;
  };
}
function mr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function _r(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? pr : typeof n == "function" ? mr : gr)(t, n))
    : this.node()[t];
}
function Un(t) {
  return t.trim().split(/^|\s+/);
}
function tn(t) {
  return t.classList || new zn(t);
}
function zn(t) {
  (this._node = t), (this._names = Un(t.getAttribute("class") || ""));
}
zn.prototype = {
  add: function (t) {
    var n = this._names.indexOf(t);
    n < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function Wn(t, n) {
  for (var e = tn(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Zn(t, n) {
  for (var e = tn(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function yr(t) {
  return function () {
    Wn(this, t);
  };
}
function xr(t) {
  return function () {
    Zn(this, t);
  };
}
function wr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Wn : Zn)(this, t);
  };
}
function vr(t, n) {
  var e = Un(t + "");
  if (arguments.length < 2) {
    for (var r = tn(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? wr : n ? yr : xr)(e, n));
}
function br() {
  this.textContent = "";
}
function Er(t) {
  return function () {
    this.textContent = t;
  };
}
function $r(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function kr(t) {
  return arguments.length
    ? this.each(t == null ? br : (typeof t == "function" ? $r : Er)(t))
    : this.node().textContent;
}
function Cr() {
  this.innerHTML = "";
}
function Ir(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Rr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Nr(t) {
  return arguments.length
    ? this.each(t == null ? Cr : (typeof t == "function" ? Rr : Ir)(t))
    : this.node().innerHTML;
}
function Pr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Mr() {
  return this.each(Pr);
}
function Tr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ar() {
  return this.each(Tr);
}
function Sr(t) {
  var n = typeof t == "function" ? t : Xn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Lr() {
  return null;
}
function Or(t, n) {
  var e = typeof t == "function" ? t : Xn(t),
    r = n == null ? Lr : typeof n == "function" ? n : jt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Dr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Gr() {
  return this.each(Dr);
}
function Br() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Hr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Xr(t) {
  return this.select(t ? Hr : Br);
}
function Kr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Fr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Vr(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var e = "",
        r = n.indexOf(".");
      return (
        r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
        { type: n, name: e }
      );
    });
}
function Yr(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function qr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Fr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function Ur(t, n, e) {
  var r = Vr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, l = c.length, u; a < l; ++a)
        for (i = 0, u = c[a]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (c = n ? qr : Yr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Qn(t, n, e) {
  var r = qn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function zr(t, n) {
  return function () {
    return Qn(this, t, n);
  };
}
function Wr(t, n) {
  return function () {
    return Qn(this, t, n.apply(this, arguments));
  };
}
function Zr(t, n) {
  return this.each((typeof n == "function" ? Wr : zr)(t, n));
}
function* Qr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Jn = [null];
function $(t, n) {
  (this._groups = t), (this._parents = n);
}
function dt() {
  return new $([[document.documentElement]], Jn);
}
function Jr() {
  return this;
}
$.prototype = dt.prototype = {
  constructor: $,
  select: $e,
  selectAll: Re,
  selectChild: Te,
  selectChildren: Oe,
  filter: De,
  data: Fe,
  enter: Ge,
  exit: Ye,
  join: qe,
  merge: Ue,
  selection: Jr,
  order: ze,
  sort: We,
  call: Qe,
  nodes: Je,
  node: je,
  size: tr,
  empty: nr,
  each: er,
  attr: lr,
  style: dr,
  property: _r,
  classed: vr,
  text: kr,
  html: Nr,
  raise: Mr,
  lower: Ar,
  append: Sr,
  insert: Or,
  remove: Gr,
  clone: Xr,
  datum: Kr,
  on: Ur,
  dispatch: Zr,
  [Symbol.iterator]: Qr,
};
function x(t) {
  return typeof t == "string"
    ? new $([[document.querySelector(t)]], [document.documentElement])
    : new $([[t]], Jn);
}
function jr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function bn(t, n) {
  if (((t = jr(t)), n === void 0 && (n = t.currentTarget), n)) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return (
        (r.x = t.clientX),
        (r.y = t.clientY),
        (r = r.matrixTransform(n.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (n.getBoundingClientRect) {
      var i = n.getBoundingClientRect();
      return [
        t.clientX - i.left - n.clientLeft,
        t.clientY - i.top - n.clientTop,
      ];
    }
  }
  return [t.pageX, t.pageY];
}
const ti = { passive: !1 },
  at = { capture: !0, passive: !1 };
function Dt(t) {
  t.stopImmediatePropagation();
}
function J(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function ni(t) {
  var n = t.document.documentElement,
    e = x(t).on("dragstart.drag", J, at);
  "onselectstart" in n
    ? e.on("selectstart.drag", J, at)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function ei(t, n) {
  var e = t.document.documentElement,
    r = x(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", J, at),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const yt = (t) => () => t;
function Ft(
  t,
  {
    sourceEvent: n,
    subject: e,
    target: r,
    identifier: i,
    active: o,
    x: s,
    y: c,
    dx: a,
    dy: l,
    dispatch: u,
  }
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    subject: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u },
  });
}
Ft.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function ri(t) {
  return !t.ctrlKey && !t.button;
}
function ii() {
  return this.parentNode;
}
function oi(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function si() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function jn() {
  var t = ri,
    n = ii,
    e = oi,
    r = si,
    i = {},
    o = Jt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", R)
      .on("touchmove.drag", W, ti)
      .on("touchend.drag touchcancel.drag", M)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, m) {
    if (!(u || !t.call(this, d, m))) {
      var w = T(this, n.call(this, d, m), d, m, "mouse");
      w &&
        (x(d.view).on("mousemove.drag", _, at).on("mouseup.drag", y, at),
        ni(d.view),
        Dt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        w("start", d));
    }
  }
  function _(d) {
    if ((J(d), !l)) {
      var m = d.clientX - c,
        w = d.clientY - a;
      l = m * m + w * w > h;
    }
    i.mouse("drag", d);
  }
  function y(d) {
    x(d.view).on("mousemove.drag mouseup.drag", null),
      ei(d.view, l),
      J(d),
      i.mouse("end", d);
  }
  function R(d, m) {
    if (t.call(this, d, m)) {
      var w = d.changedTouches,
        v = n.call(this, d, m),
        k = w.length,
        B,
        Z;
      for (B = 0; B < k; ++B)
        (Z = T(this, v, d, m, w[B].identifier, w[B])) &&
          (Dt(d), Z("start", d, w[B]));
    }
  }
  function W(d) {
    var m = d.changedTouches,
      w = m.length,
      v,
      k;
    for (v = 0; v < w; ++v)
      (k = i[m[v].identifier]) && (J(d), k("drag", d, m[v]));
  }
  function M(d) {
    var m = d.changedTouches,
      w = m.length,
      v,
      k;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        v = 0;
      v < w;
      ++v
    )
      (k = i[m[v].identifier]) && (Dt(d), k("end", d, m[v]));
  }
  function T(d, m, w, v, k, B) {
    var Z = o.copy(),
      A = bn(B || w, m),
      gn,
      mn,
      _t;
    if (
      (_t = e.call(
        d,
        new Ft("beforestart", {
          sourceEvent: w,
          target: f,
          identifier: k,
          active: s,
          x: A[0],
          y: A[1],
          dx: 0,
          dy: 0,
          dispatch: Z,
        }),
        v
      )) != null
    )
      return (
        (gn = _t.x - A[0] || 0),
        (mn = _t.y - A[1] || 0),
        function pe(Lt, _n, ge) {
          var yn = A,
            Ot;
          switch (Lt) {
            case "start":
              (i[k] = pe), (Ot = s++);
              break;
            case "end":
              delete i[k], --s;
            case "drag":
              (A = bn(ge || _n, m)), (Ot = s);
              break;
          }
          Z.call(
            Lt,
            d,
            new Ft(Lt, {
              sourceEvent: _n,
              subject: _t,
              target: f,
              identifier: k,
              active: Ot,
              x: A[0] + gn,
              y: A[1] + mn,
              dx: A[0] - yn[0],
              dy: A[1] - yn[1],
              dispatch: Z,
            }),
            v
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : yt(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : yt(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : yt(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : yt(!!d)), f)
        : r;
    }),
    (f.on = function () {
      var d = o.on.apply(o, arguments);
      return d === o ? f : d;
    }),
    (f.clickDistance = function (d) {
      return arguments.length ? ((h = (d = +d) * d), f) : Math.sqrt(h);
    }),
    f
  );
}
function nn(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function te(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function pt() {}
var lt = 0.7,
  It = 1 / lt,
  j = "\\s*([+-]?\\d+)\\s*",
  ut = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  ci = /^#([0-9a-f]{3,8})$/,
  ai = new RegExp(`^rgb\\(${j},${j},${j}\\)$`),
  li = new RegExp(`^rgb\\(${S},${S},${S}\\)$`),
  ui = new RegExp(`^rgba\\(${j},${j},${j},${ut}\\)$`),
  fi = new RegExp(`^rgba\\(${S},${S},${S},${ut}\\)$`),
  hi = new RegExp(`^hsl\\(${ut},${S},${S}\\)$`),
  di = new RegExp(`^hsla\\(${ut},${S},${S},${ut}\\)$`),
  En = {
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
  };
nn(pt, ft, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: $n,
  formatHex: $n,
  formatHex8: pi,
  formatHsl: gi,
  formatRgb: kn,
  toString: kn,
});
function $n() {
  return this.rgb().formatHex();
}
function pi() {
  return this.rgb().formatHex8();
}
function gi() {
  return ne(this).formatHsl();
}
function kn() {
  return this.rgb().formatRgb();
}
function ft(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = ci.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? Cn(n)
          : e === 3
          ? new E(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? xt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? xt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = ai.exec(t))
      ? new E(n[1], n[2], n[3], 1)
      : (n = li.exec(t))
      ? new E((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = ui.exec(t))
      ? xt(n[1], n[2], n[3], n[4])
      : (n = fi.exec(t))
      ? xt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = hi.exec(t))
      ? Nn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = di.exec(t))
      ? Nn(n[1], n[2] / 100, n[3] / 100, n[4])
      : En.hasOwnProperty(t)
      ? Cn(En[t])
      : t === "transparent"
      ? new E(NaN, NaN, NaN, 0)
      : null
  );
}
function Cn(t) {
  return new E((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function xt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new E(t, n, e, r);
}
function mi(t) {
  return (
    t instanceof pt || (t = ft(t)),
    t ? ((t = t.rgb()), new E(t.r, t.g, t.b, t.opacity)) : new E()
  );
}
function Vt(t, n, e, r) {
  return arguments.length === 1 ? mi(t) : new E(t, n, e, r ?? 1);
}
function E(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
nn(
  E,
  Vt,
  te(pt, {
    brighter(t) {
      return (
        (t = t == null ? It : Math.pow(It, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? lt : Math.pow(lt, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new E(q(this.r), q(this.g), q(this.b), Rt(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: In,
    formatHex: In,
    formatHex8: _i,
    formatRgb: Rn,
    toString: Rn,
  })
);
function In() {
  return `#${V(this.r)}${V(this.g)}${V(this.b)}`;
}
function _i() {
  return `#${V(this.r)}${V(this.g)}${V(this.b)}${V(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function Rn() {
  const t = Rt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${q(this.r)}, ${q(this.g)}, ${q(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function Rt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function q(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function V(t) {
  return (t = q(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Nn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new N(t, n, e, r)
  );
}
function ne(t) {
  if (t instanceof N) return new N(t.h, t.s, t.l, t.opacity);
  if ((t instanceof pt || (t = ft(t)), !t)) return new N();
  if (t instanceof N) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    a = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= a < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = a > 0 && a < 1 ? 0 : s),
    new N(s, c, a, t.opacity)
  );
}
function yi(t, n, e, r) {
  return arguments.length === 1 ? ne(t) : new N(t, n, e, r ?? 1);
}
function N(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
nn(
  N,
  yi,
  te(pt, {
    brighter(t) {
      return (
        (t = t == null ? It : Math.pow(It, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? lt : Math.pow(lt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new E(
        Gt(t >= 240 ? t - 240 : t + 120, i, r),
        Gt(t, i, r),
        Gt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new N(Pn(this.h), wt(this.s), wt(this.l), Rt(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = Rt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${Pn(this.h)}, ${
        wt(this.s) * 100
      }%, ${wt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function Pn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function wt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Gt(t, n, e) {
  return (
    (t < 60
      ? n + ((e - n) * t) / 60
      : t < 180
      ? e
      : t < 240
      ? n + ((e - n) * (240 - t)) / 60
      : n) * 255
  );
}
const ee = (t) => () => t;
function xi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function wi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function vi(t) {
  return (t = +t) == 1
    ? re
    : function (n, e) {
        return e - n ? wi(n, e, t) : ee(isNaN(n) ? e : n);
      };
}
function re(t, n) {
  var e = n - t;
  return e ? xi(t, e) : ee(isNaN(t) ? n : t);
}
const Mn = (function t(n) {
  var e = vi(n);
  function r(i, o) {
    var s = e((i = Vt(i)).r, (o = Vt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = re(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function H(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Yt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Bt = new RegExp(Yt.source, "g");
function bi(t) {
  return function () {
    return t;
  };
}
function Ei(t) {
  return function (n) {
    return t(n) + "";
  };
}
function $i(t, n) {
  var e = (Yt.lastIndex = Bt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Yt.exec(t)) && (i = Bt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: H(r, i) })),
      (e = Bt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? Ei(a[0].x)
        : bi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var Tn = 180 / Math.PI,
  qt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function ie(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * Tn,
      skewX: Math.atan(a) * Tn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var vt;
function ki(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? qt : ie(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ci(t) {
  return t == null ||
    (vt || (vt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    vt.setAttribute("transform", t),
    !(t = vt.transform.baseVal.consolidate()))
    ? qt
    : ((t = t.matrix), ie(t.a, t.b, t.c, t.d, t.e, t.f));
}
function oe(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var y = p.push("translate(", null, n, null, e);
      _.push({ i: y - 4, x: H(l, h) }, { i: y - 2, x: H(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: H(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: H(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var y = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: y - 4, x: H(l, h) }, { i: y - 2, x: H(u, f) });
    } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
  }
  return function (l, u) {
    var h = [],
      f = [];
    return (
      (l = t(l)),
      (u = t(u)),
      o(l.translateX, l.translateY, u.translateX, u.translateY, h, f),
      s(l.rotate, u.rotate, h, f),
      c(l.skewX, u.skewX, h, f),
      a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f),
      (l = u = null),
      function (p) {
        for (var _ = -1, y = f.length, R; ++_ < y; ) h[(R = f[_]).i] = R.x(p);
        return h.join("");
      }
    );
  };
}
var Ii = oe(ki, "px, ", "px)", "deg)"),
  Ri = oe(Ci, ", ", ")", ")"),
  nt = 0,
  rt = 0,
  et = 0,
  se = 1e3,
  Nt,
  it,
  Pt = 0,
  U = 0,
  At = 0,
  ht = typeof performance == "object" && performance.now ? performance : Date,
  ce =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function en() {
  return U || (ce(Ni), (U = ht.now() + At));
}
function Ni() {
  U = 0;
}
function Mt() {
  this._call = this._time = this._next = null;
}
Mt.prototype = ae.prototype = {
  constructor: Mt,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? en() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        it !== this &&
        (it ? (it._next = this) : (Nt = this), (it = this)),
      (this._call = t),
      (this._time = e),
      Ut();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ut());
  },
};
function ae(t, n, e) {
  var r = new Mt();
  return r.restart(t, n, e), r;
}
function Pi() {
  en(), ++nt;
  for (var t = Nt, n; t; )
    (n = U - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --nt;
}
function An() {
  (U = (Pt = ht.now()) + At), (nt = rt = 0);
  try {
    Pi();
  } finally {
    (nt = 0), Ti(), (U = 0);
  }
}
function Mi() {
  var t = ht.now(),
    n = t - Pt;
  n > se && ((At -= n), (Pt = t));
}
function Ti() {
  for (var t, n = Nt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Nt = e)));
  (it = t), Ut(r);
}
function Ut(t) {
  if (!nt) {
    rt && (rt = clearTimeout(rt));
    var n = t - U;
    n > 24
      ? (t < 1 / 0 && (rt = setTimeout(An, t - ht.now() - At)),
        et && (et = clearInterval(et)))
      : (et || ((Pt = ht.now()), (et = setInterval(Mi, se))), (nt = 1), ce(An));
  }
}
function Sn(t, n, e) {
  var r = new Mt();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var Ai = Jt("start", "end", "cancel", "interrupt"),
  Si = [],
  le = 0,
  Ln = 1,
  zt = 2,
  $t = 3,
  On = 4,
  Wt = 5,
  kt = 6;
function St(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Li(t, e, {
    name: n,
    index: r,
    group: i,
    on: Ai,
    tween: Si,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: le,
  });
}
function rn(t, n) {
  var e = P(t, n);
  if (e.state > le) throw new Error("too late; already scheduled");
  return e;
}
function L(t, n) {
  var e = P(t, n);
  if (e.state > $t) throw new Error("too late; already running");
  return e;
}
function P(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Li(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = ae(o, 0, e.time));
  function o(l) {
    (e.state = Ln),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== Ln) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === $t) return Sn(s);
        p.state === On
          ? ((p.state = kt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = kt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Sn(function () {
        e.state === $t &&
          ((e.state = On), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = zt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === zt)
    ) {
      for (
        e.state = $t, i = new Array((f = e.tween.length)), u = 0, h = -1;
        u < f;
        ++u
      )
        (p = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = p);
      i.length = h + 1;
    }
  }
  function c(l) {
    for (
      var u =
          l < e.duration
            ? e.ease.call(null, l / e.duration)
            : (e.timer.restart(a), (e.state = Wt), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Wt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = kt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Oi(t, n) {
  var e = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      (i = r.state > zt && r.state < Wt),
        (r.state = kt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Di(t) {
  return this.each(function () {
    Oi(this, t);
  });
}
function Gi(t, n) {
  var e, r;
  return function () {
    var i = L(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Bi(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = L(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, l = i.length; a < l; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === l && i.push(c);
    }
    o.tween = i;
  };
}
function Hi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = P(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Gi : Bi)(e, t, n));
}
function on(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = L(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return P(i, r).value[n];
    }
  );
}
function ue(t, n) {
  var e;
  return (
    typeof n == "number"
      ? H
      : n instanceof ft
      ? Mn
      : (e = ft(n))
      ? ((n = e), Mn)
      : $i
  )(t, n);
}
function Xi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ki(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Vi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Yi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function qi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Ui(t, n) {
  var e = Tt(t),
    r = e === "transform" ? Ri : ue;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? qi : Yi)(e, r, on(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ki : Xi)(e)
      : (e.local ? Vi : Fi)(e, r, n)
  );
}
function zi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Wi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Zi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Wi(t, o)), e;
  }
  return (i._value = n), i;
}
function Qi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && zi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ji(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Tt(t);
  return this.tween(e, (r.local ? Zi : Qi)(r, n));
}
function ji(t, n) {
  return function () {
    rn(this, t).delay = +n.apply(this, arguments);
  };
}
function to(t, n) {
  return (
    (n = +n),
    function () {
      rn(this, t).delay = n;
    }
  );
}
function no(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ji : to)(n, t))
    : P(this.node(), n).delay;
}
function eo(t, n) {
  return function () {
    L(this, t).duration = +n.apply(this, arguments);
  };
}
function ro(t, n) {
  return (
    (n = +n),
    function () {
      L(this, t).duration = n;
    }
  );
}
function io(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? eo : ro)(n, t))
    : P(this.node(), n).duration;
}
function oo(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    L(this, t).ease = n;
  };
}
function so(t) {
  var n = this._id;
  return arguments.length ? this.each(oo(n, t)) : P(this.node(), n).ease;
}
function co(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    L(this, t).ease = e;
  };
}
function ao(t) {
  if (typeof t != "function") throw new Error();
  return this.each(co(this._id, t));
}
function lo(t) {
  typeof t != "function" && (t = Fn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new G(r, this._parents, this._name, this._id);
}
function uo(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var n = this._groups,
      e = t._groups,
      r = n.length,
      i = e.length,
      o = Math.min(r, i),
      s = new Array(r),
      c = 0;
    c < o;
    ++c
  )
    for (
      var a = n[c], l = e[c], u = a.length, h = (s[c] = new Array(u)), f, p = 0;
      p < u;
      ++p
    )
      (f = a[p] || l[p]) && (h[p] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new G(s, this._parents, this._name, this._id);
}
function fo(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function ho(t, n, e) {
  var r,
    i,
    o = fo(n) ? rn : L;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function po(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? P(this.node(), e).on.on(t)
    : this.each(ho(e, t, n));
}
function go(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function mo() {
  return this.on("end.remove", go(this._id));
}
function _o(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = jt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, l = (o[s] = new Array(a)), u, h, f = 0;
      f < a;
      ++f
    )
      (u = c[f]) &&
        (h = t.call(u, u.__data__, f, c)) &&
        ("__data__" in u && (h.__data__ = u.__data__),
        (l[f] = h),
        St(l[f], n, e, f, l, P(u, e)));
  return new G(o, this._parents, n, e);
}
function yo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Kn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = P(u, e),
            y = 0,
            R = f.length;
          y < R;
          ++y
        )
          (p = f[y]) && St(p, n, e, y, f, _);
        o.push(f), s.push(u);
      }
  return new G(o, s, n, e);
}
var xo = dt.prototype.constructor;
function wo() {
  return new xo(this._groups, this._parents);
}
function vo(t, n) {
  var e, r, i;
  return function () {
    var o = tt(this, t),
      s = (this.style.removeProperty(t), tt(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function fe(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function bo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = tt(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Eo(t, n, e) {
  var r, i, o;
  return function () {
    var s = tt(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), tt(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function $o(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = L(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = fe(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function ko(t, n, e) {
  var r = (t += "") == "transform" ? Ii : ue;
  return n == null
    ? this.styleTween(t, vo(t, r)).on("end.style." + t, fe(t))
    : typeof n == "function"
    ? this.styleTween(t, Eo(t, r, on(this, "style." + t, n))).each(
        $o(this._id, t)
      )
    : this.styleTween(t, bo(t, r, n), e).on("end.style." + t, null);
}
function Co(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Io(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Co(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Ro(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Io(t, n, e ?? ""));
}
function No(t) {
  return function () {
    this.textContent = t;
  };
}
function Po(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Mo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Po(on(this, "text", t))
      : No(t == null ? "" : t + "")
  );
}
function To(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Ao(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && To(i)), n;
  }
  return (r._value = t), r;
}
function So(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Ao(t));
}
function Lo() {
  for (
    var t = this._name,
      n = this._id,
      e = he(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = P(a, n);
        St(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new G(r, this._parents, t, e);
}
function Oo() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      a = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var l = L(this, r),
        u = l.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n);
    }),
      i === 0 && o();
  });
}
var Do = 0;
function G(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function he() {
  return ++Do;
}
var O = dt.prototype;
G.prototype = {
  constructor: G,
  select: _o,
  selectAll: yo,
  selectChild: O.selectChild,
  selectChildren: O.selectChildren,
  filter: lo,
  merge: uo,
  selection: wo,
  transition: Lo,
  call: O.call,
  nodes: O.nodes,
  node: O.node,
  size: O.size,
  empty: O.empty,
  each: O.each,
  on: po,
  attr: Ui,
  attrTween: Ji,
  style: ko,
  styleTween: Ro,
  text: Mo,
  textTween: So,
  remove: mo,
  tween: Hi,
  delay: no,
  duration: io,
  ease: so,
  easeVarying: ao,
  end: Oo,
  [Symbol.iterator]: O[Symbol.iterator],
};
function Go(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Bo = { time: null, delay: 0, duration: 250, ease: Go };
function Ho(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Xo(t) {
  var n, e;
  t instanceof G
    ? ((n = t._id), (t = t._name))
    : ((n = he()), ((e = Bo).time = en()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && St(a, t, n, l, s, e || Ho(a, n));
  return new G(r, this._parents, t, n);
}
dt.prototype.interrupt = Di;
dt.prototype.transition = Xo;
const Zt = Math.PI,
  Qt = 2 * Zt,
  F = 1e-6,
  Ko = Qt - F;
function de(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Fo(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return de;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Vo {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? de : Fo(n));
  }
  moveTo(n, e) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(n, e) {
    this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
  }
  quadraticCurveTo(n, e, r, i) {
    this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(n, e, r, i, o, s) {
    this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
      +s)}`;
  }
  arcTo(n, e, r, i, o) {
    if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      c = this._y1,
      a = r - n,
      l = i - e,
      u = s - n,
      h = c - e,
      f = u * u + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > F)
      if (!(Math.abs(h * a - l * u) > F) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          y = a * a + l * l,
          R = p * p + _ * _,
          W = Math.sqrt(y),
          M = Math.sqrt(f),
          T = o * Math.tan((Zt - Math.acos((y + f - R) / (2 * W * M))) / 2),
          d = T / M,
          m = T / W;
        Math.abs(d - 1) > F && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * _)},${(this._x1 =
            n + m * a)},${(this._y1 = e + m * l)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      l = n + c,
      u = e + a,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > F || Math.abs(this._y1 - u) > F) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Qt) + Qt),
        f > Ko
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > F &&
            this._append`A${r},${r},0,${+(f >= Zt)},${h},${(this._x1 =
              n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
  }
  rect(n, e, r, i) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
      +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Yo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function qo(t, n) {
  return fetch(t, n).then(Yo);
}
function Uo(t) {
  return (n, e) => qo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const zo = Uo("application/xml");
function ot(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
ot.prototype = {
  constructor: ot,
  scale: function (t) {
    return t === 1 ? this : new ot(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new ot(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function (t) {
    return t * this.k + this.x;
  },
  applyY: function (t) {
    return t * this.k + this.y;
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function (t) {
    return (t - this.x) / this.k;
  },
  invertY: function (t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
ot.prototype;
class gt {
  constructor(n, e, r, i, o, s, c) {
    xn(this, "dragged", (n) => {
      this.sensor.attr(
        "transform",
        "translate(" +
          [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      );
    });
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (x("#" + this.id).node() != null) return;
    const n = await zo(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      )
      .attr("id", this.id)),
      this.sensor.node().append(x(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          jn()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    x(this).raise().classed("active", !0);
  }
  dragended(n) {
    x(this).classed("active", !1);
  }
}
const z = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
  ],
  Y = {
    "connector0pin-0": "3.3v",
    "connector1pin-1": "GPIO 2",
    "connector2pin-3": "GPIO 3",
    "connector3pin-7": "GPIO 4",
    "connector4pin-4": "GND",
    "connector5pin-1": "GPIO 17",
    "connector6pin-1": "GPIO 27",
    "connector7pin-3": "GPIO 22",
    "connector8pin-0": "3.3v",
    "connector9pin-3": "GPIO 10",
    "connector10pin-2": "GPIO 9",
    "connector11pin-1": "GPIO 11",
    "connector12pin-7": "GND",
    "connector13pin-5": "RESERVED",
    "connector14pin-6": "GPIO 5",
    "connector15pin-5": "GPIO 6",
    "connector16pin-4": "GPIO 13",
    "connector17pin-2": "GPIO 19",
    "connector18pin-2": "GPIO 26",
    "connector19pin-1": "GND",
    "connector20pin-7": "GPIO 21",
    "connector21pin-2": "GPIO 20",
    "connector22pin-4": "GPIO 16",
    "connector23pin-1": "GND",
    "connector24pin-6": "GPIO 12",
    "connector25pin-5": "GND",
    "connector26pin-7": "RESERVED",
    "connector27pin-8": "GPIO 7",
    "connector28pin-5": "GPIO 8",
    "connector29pin-9": "GPIO 25",
    "connector30pin-2": "GND",
    "connector31pin-7": "GPIO 24",
    "connector32pin-3": "GPIO 23",
    "connector33pin-6": "GND",
    "connector34pin-4": "GPIO 18",
    "connector35pin-7": "UART 0 RX",
    "connector36pin-9": "UART 0 TX",
    "connector37pin-7": "GND",
    "connector38pin-2": "5V PWR",
    "connector39pin-2": "5V PWR",
    "_x30_.1.0.220.2.3-0": "HDMI",
    "_x30_.1.0.221.0.5.13-6": "Power",
    "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
    "_x30_.1.0.224.0.10-7": "USB 0",
    "_x30_.1.0.224.0.10_1_-3": "USB 1",
    "_x30_.1.0.226.0.1": "CSI Camera",
    "_x30_.1.0.227.1": "DSI Display",
  },
  Wo = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  sn = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  st = {
    "1kresistor_pin_1": "1K Resistor",
    "1kresistor_pin_2": "1K Resistor",
    "2kresistor_pin_1": "2K Resistor",
    "2kresistor_pin_2": "2K Resistor",
  },
  cn = ["Vcc", "trig", "Echo", "gnd"],
  bt = { Vcc: "VCC", trig: "Trig", Echo: "Echo", gnd: "GND" },
  Zo = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = [
      "GPIO",
      "GND",
      "1kresistor_pin_1",
      "1kresistor_pin_2",
      "2kresistor_pin_1",
      "2kresistor_pin_2",
      "Vcc",
      "trig",
      "Echo",
      "gnd",
      "5V PWR",
    ];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++;
          return;
        }
        if (Y[r.connector] == "GND") {
          e++;
          return;
        }
        if (Y[r.connector].includes("GPIO")) {
          e++;
          return;
        }
      }),
      console.log(e, "he"),
      e > 8
    );
  };
class Qo {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n), this.logConnectionsToHtml();
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n);
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 === 0) {
      let n = document.createElement("li");
      const e = Y[this.connections[this.connections.length - 2].connector]
          ? `${
              Y[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : st[this.connections[this.connections.length - 2].connector]
          ? st[this.connections[this.connections.length - 2].connector]
          : bt[this.connections[this.connections.length - 2].connector]
          ? bt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = Y[this.connections[this.connections.length - 1].connector]
          ? `${
              Y[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : st[this.connections[this.connections.length - 1].connector]
          ? st[this.connections[this.connections.length - 1].connector]
          : bt[this.connections[this.connections.length - 1].connector]
          ? bt[this.connections[this.connections.length - 1].connector]
          : this.connections[this.connections.length - 1].connector;
      (n.innerHTML = `Connection no. ${
        this.connections.length / 2
      }: ${e} to ${r}`),
        document.getElementById(this.logLocationId).appendChild(n);
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class Jo {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const X = document.getElementById("svg");
X || console.error("SVG container not found");
const Q = (X == null ? void 0 : X.offsetWidth) || window.innerWidth,
  jo =
    (X != null && X.offsetTop
      ? window.innerHeight - X.offsetTop
      : window.innerHeight) || 400,
  ts = window.innerWidth < 850,
  Dn = {
    desktop: {
      raspberry: { scale: 1, x: 0, y: 0 },
      oneKResistor: { scale: 0.11111111, x: 460, y: 200 },
      twoKResistor: { scale: 0.11111111, x: 260, y: 300 },
      sensor: { scale: 0.15, x: 400, y: 0 },
      object: { scale: 0.15, x: 700, y: 0 },
    },
    mobile: {
      raspberry: { scale: 0.25, x: Q * 0.1, y: 10 },
      oneKResistor: { scale: 0.02777778, x: Q * 0.4, y: 100 },
      twoKResistor: { scale: 0.02777778, x: Q * 0.3, y: 150 },
      sensor: { scale: 0.0375, x: Q * 0.35, y: 10 },
      object: { scale: 0.0375, x: Q * 0.6, y: 10 },
    },
  },
  g = ts ? Dn.mobile : Dn.desktop,
  ns = Math.max(
    g.raspberry.x + 400 * g.raspberry.scale,
    g.oneKResistor.x + 100 * g.oneKResistor.scale,
    g.twoKResistor.x + 100 * g.twoKResistor.scale,
    g.sensor.x + 100 * g.sensor.scale,
    g.object.x + 100 * g.object.scale
  ),
  es = Math.max(
    g.raspberry.y + 200 * g.raspberry.scale,
    g.oneKResistor.y + 50 * g.oneKResistor.scale,
    g.twoKResistor.y + 50 * g.twoKResistor.scale,
    g.sensor.y + 100 * g.sensor.scale,
    g.object.y + 100 * g.object.scale
  ),
  rs = Math.max(Q, ns + 50),
  is = Math.max(jo, es + 50),
  b = x("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr("viewBox", `0 0 ${rs} ${is}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto"),
  Gn = (t, n) => {
    an.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  Bn = (t, n, e) => {
    b.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  os = new gt(
    "raspberry",
    b,
    "images/pi3dirk.svg",
    g.raspberry.scale,
    !1,
    g.raspberry.x,
    g.raspberry.y
  ),
  ss = new gt(
    "OnekResistor",
    b,
    "images/1kResistor1.svg",
    g.oneKResistor.scale,
    !1,
    g.oneKResistor.x,
    g.oneKResistor.y
  ),
  cs = new gt(
    "TwokResistor",
    b,
    "images/2kResistor1.svg",
    g.twoKResistor.scale,
    !1,
    g.twoKResistor.x,
    g.twoKResistor.y
  ),
  as = new gt(
    "ultraSonicsensor",
    b,
    "images/sensor1.svg",
    g.sensor.scale,
    !1,
    g.sensor.x,
    g.sensor.y
  ),
  ls = new gt(
    "box",
    b,
    "images/box.svg",
    g.object.scale,
    !0,
    g.object.x,
    g.object.y
  );
x("#box")
  .attr("width", 100 * g.object.scale)
  .attr("height", 100 * g.object.scale)
  .attr(
    "transform",
    `translate(${g.object.x}, ${g.object.y}) scale(${g.object.scale})`
  );
x("#box").call(
  jn()
    .on("start", function () {
      x(this).style("cursor", "move");
    })
    .on("drag", function (t) {
      const n = g.object.scale;
      x(this)
        .attr("transform", `translate(${t.x}, ${t.y}) scale(${n})`)
        .attr("width", 100 * n)
        .attr("height", 100 * n),
        pn();
    })
    .on("end", function () {
      x(this).style("cursor", "default");
    })
);
const an = b.append("g").attr("id", "pathsGroup"),
  mt = {
    rasberryPi:
      "Raspberry Pi: Powers and controls the circuit. Provides 5V power to the ultrasonic sensor’s VCC, connects GPIO 18 to the TRIG pin, GPIO 24 to the ECHO pin via resistors, and GND to complete the circuit.",
    oneKResistor:
      "1k Resistor: Limits current from the ultrasonic sensor’s ECHO pin to GPIO 24 on the Raspberry Pi, protecting the pin from high voltage.",
    twoKResistor:
      "2k Resistor: Works with the 1k resistor to form a voltage divider for the ECHO pin, ensuring safe voltage levels for the Raspberry Pi.",
    sensor:
      "Ultrasonic Sensor: Measures distance by sending and receiving sound waves. VCC connects to 5V, TRIG to GPIO 18, ECHO to GPIO 24 via resistors, and GND to Raspberry Pi GND.",
    object:
      "Object: Represents a movable item in front of the sensor. Its distance from the sensor is calculated and displayed.",
  },
  ln = document.getElementById("rasberryPi"),
  un = document.getElementById("1kResistor"),
  fn = document.getElementById("2kResistor"),
  hn = document.getElementById("sensor"),
  dn = document.getElementById("object"),
  I = document.getElementById("componentDescription"),
  ct = document.getElementById("displayInfo"),
  us = document.getElementById("codeSubmit"),
  fs = document.getElementById("info"),
  hs = document.getElementById("list"),
  ds = document.getElementById("undoButton");
ln.addEventListener("click", async () => await os.load());
un.addEventListener("click", () => ss.load());
fn.addEventListener("click", () => cs.load());
hn.addEventListener("click", () => as.load());
dn.addEventListener("click", async () => {
  await ls.load(),
    x("#box")
      .attr("width", 100 * g.object.scale)
      .attr("height", 100 * g.object.scale)
      .attr(
        "transform",
        `translate(${g.object.x}, ${g.object.y}) scale(${g.object.scale})`
      );
});
ln.addEventListener("mouseover", () => {
  (I.textContent = mt.rasberryPi), (I.style.display = "block");
});
un.addEventListener("mouseover", () => {
  (I.textContent = mt.oneKResistor), (I.style.display = "block");
});
fn.addEventListener("mouseover", () => {
  (I.textContent = mt.twoKResistor), (I.style.display = "block");
});
hn.addEventListener("mouseover", () => {
  (I.textContent = mt.sensor), (I.style.display = "block");
});
dn.addEventListener("mouseover", () => {
  (I.textContent = mt.object), (I.style.display = "block");
});
[ln, un, fn, hn, dn].forEach((t) => {
  t.addEventListener("mouseout", () => {
    (I.textContent = "Hover over a component to see its description."),
      (I.style.display = "none");
  });
});
let Ht = !1;
fs.addEventListener("click", () => {
  (Ht = !Ht), (hs.style.display = Ht ? "block" : "none");
});
const pn = (t) => {
  const n = document.getElementById("box").getBoundingClientRect(),
    e = document.getElementById("ultraSonicsensor").getBoundingClientRect(),
    r = { x: n.left + n.width / 2, y: n.top + n.height / 2 },
    i = { x: e.left + e.width / 2, y: e.top + e.height / 2 },
    o = Math.sqrt(Math.pow(r.x - i.x, 2) + Math.pow(r.y - i.y, 2));
  ct.innerHTML = `Distance: ${o.toFixed(2)}`;
};
b.on("touchmove", (t) => {
  if (t.target.id === "box") {
    t.preventDefault();
    const n = t.touches[0];
    pn({ x: n.clientX, y: n.clientY });
  }
});
const Xt = (t) =>
  z.includes(t.srcElement.id) ||
  Wo.includes(t.srcElement.id) ||
  sn.includes(t.srcElement.id) ||
  cn.includes(t.srcElement.id);
let C;
const K = new Qo("connectionLog"),
  Hn = new Jo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let D = 0;
ds.addEventListener("click", () => {
  K.undoLastConnection(), gs();
});
const ps = (t) => {
    an.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  gs = () => {
    if (C) {
      an.selectAll(`path[id^="path${D}"]`)
        .nodes()
        .forEach((e) => e.remove());
      const n = b.select(`#marker-start-${D}`);
      n.empty() || n.remove(),
        (C = null),
        console.log("Removed all incomplete paths and markers");
      return;
    }
    if (K.connections.length > 0) {
      const t = K.connections[K.connections.length - 1],
        n = t.lineID,
        e = parseInt(n.replace("path", ""));
      ps(n);
      const r = b.select(`#marker-start-${e}`);
      r.empty() || r.remove();
      const i = b.select(`#marker-end-${e}`);
      i.empty() || i.remove(),
        z.includes(t.connector) &&
          x(`#${t.connector}`).style("fill", "#9a916c"),
        t.connectorEnd &&
          z.includes(t.connectorEnd) &&
          x(`#${t.connectorEnd}`).style("fill", "#9a916c"),
        K.connections.pop(),
        console.log(`Removed paths and markers with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
b.on("dblclick", (t) => {
  if (Xt(t) && !C) {
    (C = new Vo()),
      C.moveTo(t.offsetX, t.offsetY),
      z.includes(t.srcElement.id)
        ? x(`#${t.srcElement.id}`).style("fill", "black")
        : Bn(t.offsetX, t.offsetY, `marker-start-${D}`),
      K.addConnection({
        lineID: `path${D}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      b.style("cursor", "crosshair"),
      console.log("Path started");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Xt(t)) {
    C &&
      (C.lineTo(t.offsetX, t.offsetY),
      Gn(C.toString(), `path${D}`),
      console.log("Path segment added"));
    return;
  }
  if (Xt(t) && C) {
    C.lineTo(t.offsetX, t.offsetY),
      Gn(C.toString(), `path${D}`),
      z.includes(t.srcElement.id)
        ? x(`#${t.srcElement.id}`).style("fill", "red")
        : Bn(t.offsetX, t.offsetY, `marker-end-${D}`),
      K.addConnection({
        lineID: `path${D}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      D++,
      b.style("cursor", "default"),
      (C = null),
      console.log("Path completed");
    return;
  }
});
b.on("mouseover", (t) => {
  z.includes(t.srcElement.id)
    ? (ct.innerHTML = Y[t.srcElement.id])
    : sn.includes(t.srcElement.id)
    ? (ct.innerHTML = st[t.srcElement.id] || "Resistor Connector")
    : cn.includes(t.srcElement.id) &&
      (ct.innerHTML = "Ultrasonic Sensor Connector");
});
b.on("mouseout", (t) => {
  (z.includes(t.srcElement.id) ||
    cn.includes(t.srcElement.id) ||
    sn.includes(t.srcElement.id)) &&
    (ct.innerHTML = "CONNECTOR INFO");
});
us.addEventListener("click", () => {
  const t = Zo(K.getConnectionLog());
  t === !0
    ? (document.getElementById("box").addEventListener("mousemove", pn),
      document.querySelector("#my-drawer-4").click())
    : t.error
    ? Hn.throw("Error", t.error)
    : Hn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
document.getElementById("backButton").addEventListener("click", function () {
  document.getElementById("my-drawer-4").checked = !1;
});
