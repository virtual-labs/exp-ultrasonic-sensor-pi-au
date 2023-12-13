var Jn = Object.defineProperty;
var jn = (t, n, e) =>
  n in t
    ? Jn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var en = (t, n, e) => (jn(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var te = { value: () => {} };
function Vt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new gt(e);
}
function gt(t) {
  this._ = t;
}
function ne(t, n) {
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
gt.prototype = Vt.prototype = {
  constructor: gt,
  on: function (t, n) {
    var e = this._,
      r = ne(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ee(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = rn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = rn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new gt(t);
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
function ee(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function rn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = te), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Rt = "http://www.w3.org/1999/xhtml";
const on = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Rt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function $t(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    on.hasOwnProperty(n) ? { space: on[n], local: t } : t
  );
}
function re(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Rt && n.documentElement.namespaceURI === Rt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function ie(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function En(t) {
  var n = $t(t);
  return (n.local ? ie : re)(n);
}
function oe() {}
function Yt(t) {
  return t == null
    ? oe
    : function () {
        return this.querySelector(t);
      };
}
function se(t) {
  typeof t != "function" && (t = Yt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, u, l = 0;
      l < s;
      ++l
    )
      (a = o[l]) &&
        (u = t.call(a, a.__data__, l, o)) &&
        ("__data__" in a && (u.__data__ = a.__data__), (c[l] = u));
  return new v(r, this._parents);
}
function ce(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ae() {
  return [];
}
function $n(t) {
  return t == null
    ? ae
    : function () {
        return this.querySelectorAll(t);
      };
}
function ue(t) {
  return function () {
    return ce(t.apply(this, arguments));
  };
}
function le(t) {
  typeof t == "function" ? (t = ue(t)) : (t = $n(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, u = 0; u < c; ++u)
      (a = s[u]) && (r.push(t.call(a, a.__data__, u, s)), i.push(a));
  return new v(r, i);
}
function kn(t) {
  return function () {
    return this.matches(t);
  };
}
function Nn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var fe = Array.prototype.find;
function he(t) {
  return function () {
    return fe.call(this.children, t);
  };
}
function de() {
  return this.firstElementChild;
}
function pe(t) {
  return this.select(t == null ? de : he(typeof t == "function" ? t : Nn(t)));
}
var ge = Array.prototype.filter;
function _e() {
  return Array.from(this.children);
}
function me(t) {
  return function () {
    return ge.call(this.children, t);
  };
}
function ye(t) {
  return this.selectAll(
    t == null ? _e : me(typeof t == "function" ? t : Nn(t))
  );
}
function xe(t) {
  typeof t != "function" && (t = kn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
      (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
  return new v(r, this._parents);
}
function In(t) {
  return new Array(t.length);
}
function we() {
  return new v(this._enter || this._groups.map(In), this._parents);
}
function yt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
yt.prototype = {
  constructor: yt,
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
function ve(t) {
  return function () {
    return t;
  };
}
function be(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, u = o.length; s < u; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new yt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ee(t, n, e, r, i, o, s) {
  var c,
    a,
    u = new Map(),
    l = n.length,
    h = o.length,
    f = new Array(l),
    p;
  for (c = 0; c < l; ++c)
    (a = n[c]) &&
      ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
      u.has(p) ? (i[c] = a) : u.set(p, a));
  for (c = 0; c < h; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = u.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), u.delete(p))
        : (e[c] = new yt(t, o[c]));
  for (c = 0; c < l; ++c) (a = n[c]) && u.get(f[c]) === a && (i[c] = a);
}
function $e(t) {
  return t.__data__;
}
function ke(t, n) {
  if (!arguments.length) return Array.from(this, $e);
  var e = n ? Ee : be,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = ve(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      u = 0;
    u < o;
    ++u
  ) {
    var l = r[u],
      h = i[u],
      f = h.length,
      p = Ne(t.call(l, l && l.__data__, u, r)),
      _ = p.length,
      m = (c[u] = new Array(_)),
      E = (s[u] = new Array(_)),
      q = (a[u] = new Array(f));
    e(l, h, m, E, q, p, n);
    for (var I = 0, C = 0, d, g; I < _; ++I)
      if ((d = m[I])) {
        for (I >= C && (C = I + 1); !(g = E[C]) && ++C < _; );
        d._next = g || null;
      }
  }
  return (s = new v(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ne(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ie() {
  return new v(this._exit || this._groups.map(In), this._parents);
}
function Ce(t, n, e) {
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
function Ae(t) {
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
      var u = e[a], l = r[a], h = u.length, f = (c[a] = new Array(h)), p, _ = 0;
      _ < h;
      ++_
    )
      (p = u[_] || l[_]) && (f[_] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new v(c, this._parents);
}
function Te() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Me(t) {
  t || (t = Se);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), u, l = 0;
      l < c;
      ++l
    )
      (u = s[l]) && (a[l] = u);
    a.sort(n);
  }
  return new v(i, this._parents).order();
}
function Se(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Re() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Pe() {
  return Array.from(this);
}
function Oe() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Le() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function De() {
  return !this.node();
}
function Ge(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Be(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Xe(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function He(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Fe(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function qe(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ve(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ye(t, n) {
  var e = $t(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Xe
        : Be
      : typeof n == "function"
      ? e.local
        ? Ve
        : qe
      : e.local
      ? Fe
      : He)(e, n)
  );
}
function Cn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function ze(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Ke(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Ue(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function We(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? ze : typeof n == "function" ? Ue : Ke)(t, n, e ?? "")
      )
    : K(this.node(), t);
}
function K(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Cn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Ze(t) {
  return function () {
    delete this[t];
  };
}
function Qe(t, n) {
  return function () {
    this[t] = n;
  };
}
function Je(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function je(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Ze : typeof n == "function" ? Je : Qe)(t, n))
    : this.node()[t];
}
function An(t) {
  return t.trim().split(/^|\s+/);
}
function zt(t) {
  return t.classList || new Tn(t);
}
function Tn(t) {
  (this._node = t), (this._names = An(t.getAttribute("class") || ""));
}
Tn.prototype = {
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
function Mn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Sn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function tr(t) {
  return function () {
    Mn(this, t);
  };
}
function nr(t) {
  return function () {
    Sn(this, t);
  };
}
function er(t, n) {
  return function () {
    (n.apply(this, arguments) ? Mn : Sn)(this, t);
  };
}
function rr(t, n) {
  var e = An(t + "");
  if (arguments.length < 2) {
    for (var r = zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? er : n ? tr : nr)(e, n));
}
function ir() {
  this.textContent = "";
}
function or(t) {
  return function () {
    this.textContent = t;
  };
}
function sr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function cr(t) {
  return arguments.length
    ? this.each(t == null ? ir : (typeof t == "function" ? sr : or)(t))
    : this.node().textContent;
}
function ar() {
  this.innerHTML = "";
}
function ur(t) {
  return function () {
    this.innerHTML = t;
  };
}
function lr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function fr(t) {
  return arguments.length
    ? this.each(t == null ? ar : (typeof t == "function" ? lr : ur)(t))
    : this.node().innerHTML;
}
function hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function dr() {
  return this.each(hr);
}
function pr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function gr() {
  return this.each(pr);
}
function _r(t) {
  var n = typeof t == "function" ? t : En(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function mr() {
  return null;
}
function yr(t, n) {
  var e = typeof t == "function" ? t : En(t),
    r = n == null ? mr : typeof n == "function" ? n : Yt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function xr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function wr() {
  return this.each(xr);
}
function vr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function br() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Er(t) {
  return this.select(t ? br : vr);
}
function $r(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function kr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Nr(t) {
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
function Ir(t) {
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
function Cr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = kr(n);
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
function Ar(t, n, e) {
  var r = Nr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, u = c.length, l; a < u; ++a)
        for (i = 0, l = c[a]; i < o; ++i)
          if ((s = r[i]).type === l.type && s.name === l.name) return l.value;
    }
    return;
  }
  for (c = n ? Cr : Ir, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Rn(t, n, e) {
  var r = Cn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Tr(t, n) {
  return function () {
    return Rn(this, t, n);
  };
}
function Mr(t, n) {
  return function () {
    return Rn(this, t, n.apply(this, arguments));
  };
}
function Sr(t, n) {
  return this.each((typeof n == "function" ? Mr : Tr)(t, n));
}
function* Rr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Pn = [null];
function v(t, n) {
  (this._groups = t), (this._parents = n);
}
function ot() {
  return new v([[document.documentElement]], Pn);
}
function Pr() {
  return this;
}
v.prototype = ot.prototype = {
  constructor: v,
  select: se,
  selectAll: le,
  selectChild: pe,
  selectChildren: ye,
  filter: xe,
  data: ke,
  enter: we,
  exit: Ie,
  join: Ce,
  merge: Ae,
  selection: Pr,
  order: Te,
  sort: Me,
  call: Re,
  nodes: Pe,
  node: Oe,
  size: Le,
  empty: De,
  each: Ge,
  attr: Ye,
  style: We,
  property: je,
  classed: rr,
  text: cr,
  html: fr,
  raise: dr,
  lower: gr,
  append: _r,
  insert: yr,
  remove: wr,
  clone: Er,
  datum: $r,
  on: Ar,
  dispatch: Sr,
  [Symbol.iterator]: Rr,
};
function P(t) {
  return typeof t == "string"
    ? new v([[document.querySelector(t)]], [document.documentElement])
    : new v([[t]], Pn);
}
function Or(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function sn(t, n) {
  if (((t = Or(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Lr = { passive: !1 },
  tt = { capture: !0, passive: !1 };
function At(t) {
  t.stopImmediatePropagation();
}
function Y(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Dr(t) {
  var n = t.document.documentElement,
    e = P(t).on("dragstart.drag", Y, tt);
  "onselectstart" in n
    ? e.on("selectstart.drag", Y, tt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Gr(t, n) {
  var e = t.document.documentElement,
    r = P(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", Y, tt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ut = (t) => () => t;
function Pt(
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
    dy: u,
    dispatch: l,
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
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: l },
  });
}
Pt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Br(t) {
  return !t.ctrlKey && !t.button;
}
function Xr() {
  return this.parentNode;
}
function Hr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Fr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function qr() {
  var t = Br,
    n = Xr,
    e = Hr,
    r = Fr,
    i = {},
    o = Vt("start", "drag", "end"),
    s = 0,
    c,
    a,
    u,
    l,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", E)
      .on("touchmove.drag", q, Lr)
      .on("touchend.drag touchcancel.drag", I)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(l || !t.call(this, d, g))) {
      var y = C(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (P(d.view).on("mousemove.drag", _, tt).on("mouseup.drag", m, tt),
        Dr(d.view),
        At(d),
        (u = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((Y(d), !u)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      u = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    P(d.view).on("mousemove.drag mouseup.drag", null),
      Gr(d.view, u),
      Y(d),
      i.mouse("end", d);
  }
  function E(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        x = n.call(this, d, g),
        b = y.length,
        L,
        V;
      for (L = 0; L < b; ++L)
        (V = C(this, x, d, g, y[L].identifier, y[L])) &&
          (At(d), V("start", d, y[L]));
    }
  }
  function q(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      b;
    for (x = 0; x < y; ++x)
      (b = i[g[x].identifier]) && (Y(d), b("drag", d, g[x]));
  }
  function I(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      b;
    for (
      l && clearTimeout(l),
        l = setTimeout(function () {
          l = null;
        }, 500),
        x = 0;
      x < y;
      ++x
    )
      (b = i[g[x].identifier]) && (At(d), b("end", d, g[x]));
  }
  function C(d, g, y, x, b, L) {
    var V = o.copy(),
      A = sn(L || y, g),
      Jt,
      jt,
      at;
    if (
      (at = e.call(
        d,
        new Pt("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: b,
          active: s,
          x: A[0],
          y: A[1],
          dx: 0,
          dy: 0,
          dispatch: V,
        }),
        x
      )) != null
    )
      return (
        (Jt = at.x - A[0] || 0),
        (jt = at.y - A[1] || 0),
        function Zn(It, tn, Qn) {
          var nn = A,
            Ct;
          switch (It) {
            case "start":
              (i[b] = Zn), (Ct = s++);
              break;
            case "end":
              delete i[b], --s;
            case "drag":
              (A = sn(Qn || tn, g)), (Ct = s);
              break;
          }
          V.call(
            It,
            d,
            new Pt(It, {
              sourceEvent: tn,
              subject: at,
              target: f,
              identifier: b,
              active: Ct,
              x: A[0] + Jt,
              y: A[1] + jt,
              dx: A[0] - nn[0],
              dy: A[1] - nn[1],
              dispatch: V,
            }),
            x
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ut(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ut(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ut(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ut(!!d)), f)
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
function Kt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function On(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function st() {}
var nt = 0.7,
  xt = 1 / nt,
  z = "\\s*([+-]?\\d+)\\s*",
  et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  T = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Vr = /^#([0-9a-f]{3,8})$/,
  Yr = new RegExp(`^rgb\\(${z},${z},${z}\\)$`),
  zr = new RegExp(`^rgb\\(${T},${T},${T}\\)$`),
  Kr = new RegExp(`^rgba\\(${z},${z},${z},${et}\\)$`),
  Ur = new RegExp(`^rgba\\(${T},${T},${T},${et}\\)$`),
  Wr = new RegExp(`^hsl\\(${et},${T},${T}\\)$`),
  Zr = new RegExp(`^hsla\\(${et},${T},${T},${et}\\)$`),
  cn = {
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
Kt(st, rt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: an,
  formatHex: an,
  formatHex8: Qr,
  formatHsl: Jr,
  formatRgb: un,
  toString: un,
});
function an() {
  return this.rgb().formatHex();
}
function Qr() {
  return this.rgb().formatHex8();
}
function Jr() {
  return Ln(this).formatHsl();
}
function un() {
  return this.rgb().formatRgb();
}
function rt(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Vr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? ln(n)
          : e === 3
          ? new w(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? lt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? lt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Yr.exec(t))
      ? new w(n[1], n[2], n[3], 1)
      : (n = zr.exec(t))
      ? new w((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Kr.exec(t))
      ? lt(n[1], n[2], n[3], n[4])
      : (n = Ur.exec(t))
      ? lt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Wr.exec(t))
      ? dn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Zr.exec(t))
      ? dn(n[1], n[2] / 100, n[3] / 100, n[4])
      : cn.hasOwnProperty(t)
      ? ln(cn[t])
      : t === "transparent"
      ? new w(NaN, NaN, NaN, 0)
      : null
  );
}
function ln(t) {
  return new w((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function lt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new w(t, n, e, r);
}
function jr(t) {
  return (
    t instanceof st || (t = rt(t)),
    t ? ((t = t.rgb()), new w(t.r, t.g, t.b, t.opacity)) : new w()
  );
}
function Ot(t, n, e, r) {
  return arguments.length === 1 ? jr(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Kt(
  w,
  Ot,
  On(st, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? nt : Math.pow(nt, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new w(H(this.r), H(this.g), H(this.b), wt(this.opacity));
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
    hex: fn,
    formatHex: fn,
    formatHex8: ti,
    formatRgb: hn,
    toString: hn,
  })
);
function fn() {
  return `#${B(this.r)}${B(this.g)}${B(this.b)}`;
}
function ti() {
  return `#${B(this.r)}${B(this.g)}${B(this.b)}${B(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function hn() {
  const t = wt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${H(this.r)}, ${H(this.g)}, ${H(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function wt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function H(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function B(t) {
  return (t = H(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function dn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new $(t, n, e, r)
  );
}
function Ln(t) {
  if (t instanceof $) return new $(t.h, t.s, t.l, t.opacity);
  if ((t instanceof st || (t = rt(t)), !t)) return new $();
  if (t instanceof $) return t;
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
    new $(s, c, a, t.opacity)
  );
}
function ni(t, n, e, r) {
  return arguments.length === 1 ? Ln(t) : new $(t, n, e, r ?? 1);
}
function $(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Kt(
  $,
  ni,
  On(st, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
        new $(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? nt : Math.pow(nt, t)),
        new $(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new w(
        Tt(t >= 240 ? t - 240 : t + 120, i, r),
        Tt(t, i, r),
        Tt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new $(pn(this.h), ft(this.s), ft(this.l), wt(this.opacity));
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
      const t = wt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${pn(this.h)}, ${
        ft(this.s) * 100
      }%, ${ft(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function pn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ft(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Tt(t, n, e) {
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
const Dn = (t) => () => t;
function ei(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function ri(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function ii(t) {
  return (t = +t) == 1
    ? Gn
    : function (n, e) {
        return e - n ? ri(n, e, t) : Dn(isNaN(n) ? e : n);
      };
}
function Gn(t, n) {
  var e = n - t;
  return e ? ei(t, e) : Dn(isNaN(t) ? n : t);
}
const gn = (function t(n) {
  var e = ii(n);
  function r(i, o) {
    var s = e((i = Ot(i)).r, (o = Ot(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      u = Gn(i.opacity, o.opacity);
    return function (l) {
      return (
        (i.r = s(l)), (i.g = c(l)), (i.b = a(l)), (i.opacity = u(l)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function D(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Lt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Mt = new RegExp(Lt.source, "g");
function oi(t) {
  return function () {
    return t;
  };
}
function si(t) {
  return function (n) {
    return t(n) + "";
  };
}
function ci(t, n) {
  var e = (Lt.lastIndex = Mt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Lt.exec(t)) && (i = Mt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: D(r, i) })),
      (e = Mt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? si(a[0].x)
        : oi(n)
      : ((n = a.length),
        function (u) {
          for (var l = 0, h; l < n; ++l) c[(h = a[l]).i] = h.x(u);
          return c.join("");
        })
  );
}
var _n = 180 / Math.PI,
  Dt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Bn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * _n,
      skewX: Math.atan(a) * _n,
      scaleX: s,
      scaleY: c,
    }
  );
}
var ht;
function ai(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Dt : Bn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function ui(t) {
  return t == null ||
    (ht || (ht = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    ht.setAttribute("transform", t),
    !(t = ht.transform.baseVal.consolidate()))
    ? Dt
    : ((t = t.matrix), Bn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Xn(t, n, e, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, h, f, p, _) {
    if (u !== h || l !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: D(u, h) }, { i: m - 2, x: D(l, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(u, l, h, f) {
    u !== l
      ? (u - l > 180 ? (l += 360) : l - u > 180 && (u += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: D(u, l) }))
      : l && h.push(i(h) + "rotate(" + l + r);
  }
  function c(u, l, h, f) {
    u !== l
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: D(u, l) })
      : l && h.push(i(h) + "skewX(" + l + r);
  }
  function a(u, l, h, f, p, _) {
    if (u !== h || l !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: D(u, h) }, { i: m - 2, x: D(l, f) });
    } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
  }
  return function (u, l) {
    var h = [],
      f = [];
    return (
      (u = t(u)),
      (l = t(l)),
      o(u.translateX, u.translateY, l.translateX, l.translateY, h, f),
      s(u.rotate, l.rotate, h, f),
      c(u.skewX, l.skewX, h, f),
      a(u.scaleX, u.scaleY, l.scaleX, l.scaleY, h, f),
      (u = l = null),
      function (p) {
        for (var _ = -1, m = f.length, E; ++_ < m; ) h[(E = f[_]).i] = E.x(p);
        return h.join("");
      }
    );
  };
}
var li = Xn(ai, "px, ", "px)", "deg)"),
  fi = Xn(ui, ", ", ")", ")"),
  U = 0,
  Q = 0,
  W = 0,
  Hn = 1e3,
  vt,
  J,
  bt = 0,
  F = 0,
  kt = 0,
  it = typeof performance == "object" && performance.now ? performance : Date,
  Fn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Ut() {
  return F || (Fn(hi), (F = it.now() + kt));
}
function hi() {
  F = 0;
}
function Et() {
  this._call = this._time = this._next = null;
}
Et.prototype = qn.prototype = {
  constructor: Et,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Ut() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        J !== this &&
        (J ? (J._next = this) : (vt = this), (J = this)),
      (this._call = t),
      (this._time = e),
      Gt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Gt());
  },
};
function qn(t, n, e) {
  var r = new Et();
  return r.restart(t, n, e), r;
}
function di() {
  Ut(), ++U;
  for (var t = vt, n; t; )
    (n = F - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --U;
}
function mn() {
  (F = (bt = it.now()) + kt), (U = Q = 0);
  try {
    di();
  } finally {
    (U = 0), gi(), (F = 0);
  }
}
function pi() {
  var t = it.now(),
    n = t - bt;
  n > Hn && ((kt -= n), (bt = t));
}
function gi() {
  for (var t, n = vt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (vt = e)));
  (J = t), Gt(r);
}
function Gt(t) {
  if (!U) {
    Q && (Q = clearTimeout(Q));
    var n = t - F;
    n > 24
      ? (t < 1 / 0 && (Q = setTimeout(mn, t - it.now() - kt)),
        W && (W = clearInterval(W)))
      : (W || ((bt = it.now()), (W = setInterval(pi, Hn))), (U = 1), Fn(mn));
  }
}
function yn(t, n, e) {
  var r = new Et();
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
var _i = Vt("start", "end", "cancel", "interrupt"),
  mi = [],
  Vn = 0,
  xn = 1,
  Bt = 2,
  _t = 3,
  wn = 4,
  Xt = 5,
  mt = 6;
function Nt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  yi(t, e, {
    name: n,
    index: r,
    group: i,
    on: _i,
    tween: mi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Vn,
  });
}
function Wt(t, n) {
  var e = N(t, n);
  if (e.state > Vn) throw new Error("too late; already scheduled");
  return e;
}
function M(t, n) {
  var e = N(t, n);
  if (e.state > _t) throw new Error("too late; already running");
  return e;
}
function N(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function yi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = qn(o, 0, e.time));
  function o(u) {
    (e.state = xn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= u && s(u - e.delay);
  }
  function s(u) {
    var l, h, f, p;
    if (e.state !== xn) return a();
    for (l in r)
      if (((p = r[l]), p.name === e.name)) {
        if (p.state === _t) return yn(s);
        p.state === wn
          ? ((p.state = mt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[l])
          : +l < n &&
            ((p.state = mt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[l]);
      }
    if (
      (yn(function () {
        e.state === _t &&
          ((e.state = wn), e.timer.restart(c, e.delay, e.time), c(u));
      }),
      (e.state = Bt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Bt)
    ) {
      for (
        e.state = _t, i = new Array((f = e.tween.length)), l = 0, h = -1;
        l < f;
        ++l
      )
        (p = e.tween[l].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = p);
      i.length = h + 1;
    }
  }
  function c(u) {
    for (
      var l =
          u < e.duration
            ? e.ease.call(null, u / e.duration)
            : (e.timer.restart(a), (e.state = Xt), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, l);
    e.state === Xt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = mt), e.timer.stop(), delete r[n];
    for (var u in r) return;
    delete t.__transition;
  }
}
function xi(t, n) {
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
      (i = r.state > Bt && r.state < Xt),
        (r.state = mt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function wi(t) {
  return this.each(function () {
    xi(this, t);
  });
}
function vi(t, n) {
  var e, r;
  return function () {
    var i = M(this, t),
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
function bi(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = M(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, u = i.length; a < u; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === u && i.push(c);
    }
    o.tween = i;
  };
}
function Ei(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = N(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? vi : bi)(e, t, n));
}
function Zt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = M(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return N(i, r).value[n];
    }
  );
}
function Yn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? D
      : n instanceof rt
      ? gn
      : (e = rt(n))
      ? ((n = e), gn)
      : ci
  )(t, n);
}
function $i(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function ki(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ni(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ii(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ci(t, n, e) {
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
function Ai(t, n, e) {
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
function Ti(t, n) {
  var e = $t(t),
    r = e === "transform" ? fi : Yn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Ai : Ci)(e, r, Zt(this, "attr." + t, n))
      : n == null
      ? (e.local ? ki : $i)(e)
      : (e.local ? Ii : Ni)(e, r, n)
  );
}
function Mi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Si(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Ri(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Si(t, o)), e;
  }
  return (i._value = n), i;
}
function Pi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Mi(t, o)), e;
  }
  return (i._value = n), i;
}
function Oi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = $t(t);
  return this.tween(e, (r.local ? Ri : Pi)(r, n));
}
function Li(t, n) {
  return function () {
    Wt(this, t).delay = +n.apply(this, arguments);
  };
}
function Di(t, n) {
  return (
    (n = +n),
    function () {
      Wt(this, t).delay = n;
    }
  );
}
function Gi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Li : Di)(n, t))
    : N(this.node(), n).delay;
}
function Bi(t, n) {
  return function () {
    M(this, t).duration = +n.apply(this, arguments);
  };
}
function Xi(t, n) {
  return (
    (n = +n),
    function () {
      M(this, t).duration = n;
    }
  );
}
function Hi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Bi : Xi)(n, t))
    : N(this.node(), n).duration;
}
function Fi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    M(this, t).ease = n;
  };
}
function qi(t) {
  var n = this._id;
  return arguments.length ? this.each(Fi(n, t)) : N(this.node(), n).ease;
}
function Vi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    M(this, t).ease = e;
  };
}
function Yi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Vi(this._id, t));
}
function zi(t) {
  typeof t != "function" && (t = kn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
      (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
  return new O(r, this._parents, this._name, this._id);
}
function Ki(t) {
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
      var a = n[c], u = e[c], l = a.length, h = (s[c] = new Array(l)), f, p = 0;
      p < l;
      ++p
    )
      (f = a[p] || u[p]) && (h[p] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new O(s, this._parents, this._name, this._id);
}
function Ui(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Wi(t, n, e) {
  var r,
    i,
    o = Ui(n) ? Wt : M;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function Zi(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? N(this.node(), e).on.on(t)
    : this.each(Wi(e, t, n));
}
function Qi(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function Ji() {
  return this.on("end.remove", Qi(this._id));
}
function ji(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Yt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, u = (o[s] = new Array(a)), l, h, f = 0;
      f < a;
      ++f
    )
      (l = c[f]) &&
        (h = t.call(l, l.__data__, f, c)) &&
        ("__data__" in l && (h.__data__ = l.__data__),
        (u[f] = h),
        Nt(u[f], n, e, f, u, N(l, e)));
  return new O(o, this._parents, n, e);
}
function to(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = $n(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], u = a.length, l, h = 0; h < u; ++h)
      if ((l = a[h])) {
        for (
          var f = t.call(l, l.__data__, h, a),
            p,
            _ = N(l, e),
            m = 0,
            E = f.length;
          m < E;
          ++m
        )
          (p = f[m]) && Nt(p, n, e, m, f, _);
        o.push(f), s.push(l);
      }
  return new O(o, s, n, e);
}
var no = ot.prototype.constructor;
function eo() {
  return new no(this._groups, this._parents);
}
function ro(t, n) {
  var e, r, i;
  return function () {
    var o = K(this, t),
      s = (this.style.removeProperty(t), K(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function zn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function io(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = K(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function oo(t, n, e) {
  var r, i, o;
  return function () {
    var s = K(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), K(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function so(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = M(this, t),
      u = a.on,
      l = a.value[o] == null ? c || (c = zn(n)) : void 0;
    (u !== e || i !== l) && (r = (e = u).copy()).on(s, (i = l)), (a.on = r);
  };
}
function co(t, n, e) {
  var r = (t += "") == "transform" ? li : Yn;
  return n == null
    ? this.styleTween(t, ro(t, r)).on("end.style." + t, zn(t))
    : typeof n == "function"
    ? this.styleTween(t, oo(t, r, Zt(this, "style." + t, n))).each(
        so(this._id, t)
      )
    : this.styleTween(t, io(t, r, n), e).on("end.style." + t, null);
}
function ao(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function uo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && ao(t, s, e)), r;
  }
  return (o._value = n), o;
}
function lo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, uo(t, n, e ?? ""));
}
function fo(t) {
  return function () {
    this.textContent = t;
  };
}
function ho(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function po(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? ho(Zt(this, "text", t))
      : fo(t == null ? "" : t + "")
  );
}
function go(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function _o(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && go(i)), n;
  }
  return (r._value = t), r;
}
function mo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, _o(t));
}
function yo() {
  for (
    var t = this._name,
      n = this._id,
      e = Kn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
      if ((a = s[u])) {
        var l = N(a, n);
        Nt(a, t, e, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease,
        });
      }
  return new O(r, this._parents, t, e);
}
function xo() {
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
      var u = M(this, r),
        l = u.on;
      l !== t &&
        ((n = (t = l).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (u.on = n);
    }),
      i === 0 && o();
  });
}
var wo = 0;
function O(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Kn() {
  return ++wo;
}
var S = ot.prototype;
O.prototype = {
  constructor: O,
  select: ji,
  selectAll: to,
  selectChild: S.selectChild,
  selectChildren: S.selectChildren,
  filter: zi,
  merge: Ki,
  selection: eo,
  transition: yo,
  call: S.call,
  nodes: S.nodes,
  node: S.node,
  size: S.size,
  empty: S.empty,
  each: S.each,
  on: Zi,
  attr: Ti,
  attrTween: Oi,
  style: co,
  styleTween: lo,
  text: po,
  textTween: mo,
  remove: Ji,
  tween: Ei,
  delay: Gi,
  duration: Hi,
  ease: qi,
  easeVarying: Yi,
  end: xo,
  [Symbol.iterator]: S[Symbol.iterator],
};
function vo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var bo = { time: null, delay: 0, duration: 250, ease: vo };
function Eo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function $o(t) {
  var n, e;
  t instanceof O
    ? ((n = t._id), (t = t._name))
    : ((n = Kn()), ((e = bo).time = Ut()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
      (a = s[u]) && Nt(a, t, n, u, s, e || Eo(a, n));
  return new O(r, this._parents, t, n);
}
ot.prototype.interrupt = wi;
ot.prototype.transition = $o;
const Ht = Math.PI,
  Ft = 2 * Ht,
  G = 1e-6,
  ko = Ft - G;
function Un(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function No(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return Un;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Io {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? Un : No(n));
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
      u = i - e,
      l = s - n,
      h = c - e,
      f = l * l + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > G)
      if (!(Math.abs(h * a - u * l) > G) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + u * u,
          E = p * p + _ * _,
          q = Math.sqrt(m),
          I = Math.sqrt(f),
          C = o * Math.tan((Ht - Math.acos((m + f - E) / (2 * q * I))) / 2),
          d = C / I,
          g = C / q;
        Math.abs(d - 1) > G && this._append`L${n + d * l},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > l * _)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * u)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      u = n + c,
      l = e + a,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${u},${l}`
      : (Math.abs(this._x1 - u) > G || Math.abs(this._y1 - l) > G) &&
        this._append`L${u},${l}`,
      r &&
        (f < 0 && (f = (f % Ft) + Ft),
        f > ko
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = u)},${(this._y1 = l)}`
          : f > G &&
            this._append`A${r},${r},0,${+(f >= Ht)},${h},${(this._x1 =
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
function Co(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Ao(t, n) {
  return fetch(t, n).then(Co);
}
function To(t) {
  return (n, e) => Ao(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Mo = To("application/xml");
function j(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
j.prototype = {
  constructor: j,
  scale: function (t) {
    return t === 1 ? this : new j(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new j(this.k, this.x + this.k * t, this.y + this.k * n);
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
j.prototype;
class ct {
  constructor(n, e, r, i, o) {
    en(this, "dragged", (n) => {
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
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (P("#" + this.id).node() != null) return;
    const n = await Mo(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr("transform", "translate(" + [0, 0] + ") scale(" + this.scale + ")")
      .attr("id", this.id)),
      this.sensor.node().append(P(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          qr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    P(this).raise().classed("active", !0);
  }
  dragended(n) {
    P(this).classed("active", !1);
  }
}
const Qt = [
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
  ],
  So = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  Ro = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  dt = {
    "1kresistor_pin_1": "1K Resistor",
    "1kresistor_pin_2": "1K Resistor",
    "2kresistor_pin_1": "2K Resistor",
    "2kresistor_pin_2": "2K Resistor",
  },
  Po = ["Vcc", "trig", "Echo", "gnd"],
  pt = { Vcc: "VCC", trig: "Trig", Echo: "Echo", gnd: "GND" },
  X = {
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
  },
  Oo = (t) => {
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
        if (X[r.connector] == "GND") {
          e++;
          return;
        }
        if (X[r.connector].includes("GPIO")) {
          e++;
          return;
        }
      }),
      console.log(e, "he"),
      e > 8
    );
  };
class Lo {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n),
      this.logConnectionsToHtml(),
      console.log("connections", this.connections);
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 === 0) {
      let n = document.createElement("li");
      const e = X[this.connections[this.connections.length - 2].connector]
          ? X[this.connections[this.connections.length - 2].connector]
          : dt[this.connections[this.connections.length - 2].connector]
          ? dt[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = X[this.connections[this.connections.length - 1].connector]
          ? X[this.connections[this.connections.length - 1].connector]
          : dt[this.connections[this.connections.length - 1].connector]
          ? dt[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
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
class Do {
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
const k = P("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Go = new ct("raspberry", k, "./images/pi3dirk-eb710ce1.svg", 1, !1),
  Bo = new ct("OnekResistor", k, "./images/1kResistor1-1efc87e2.svg", 0.11111111, !0),
  Xo = new ct("TwokResistor", k, "./images/2kResistor1-c17f1ce6.svg", 0.1111111, !0),
  Ho = new ct("ultraSonicsensor", k, "./images/sensor1-ccf3c6a5.svg", 0.15, !0),
  Fo = new ct("box", k, "./images/box-ccd8b73a.svg", 0.15, !0),
  qo = document.getElementById("rasberryPi"),
  Vo = document.getElementById("1kResistor"),
  Yo = document.getElementById("2kResistor"),
  zo = document.getElementById("sensor"),
  Ko = document.getElementById("object"),
  Uo = document.getElementById("info"),
  Wo = document.getElementById("list"),
  vn = (t) =>
    Qt.includes(t.srcElement.id) ||
    So.includes(t.srcElement.id) ||
    Ro.includes(t.srcElement.id) ||
    Po.includes(t.srcElement.id),
  Wn = document.getElementById("displayInfo"),
  Zo = document.getElementById("codeSubmit");
let St = !1;
Uo.addEventListener("click", () => {
  (St = !St), (Wo.style.display = St ? "block" : "none");
});
const Qo = () => {
  const t = document.getElementById("box").getBoundingClientRect(),
    n = document.getElementById("ultraSonicsensor").getBoundingClientRect(),
    e = { x: t.left + t.width / 2, y: t.top + t.height / 2 },
    r = { x: n.left + n.width / 2, y: n.top + n.height / 2 },
    i = Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2));
  Wn.innerHTML = `Distance: ${i.toFixed(2)}`;
};
qo.addEventListener("click", async () => await Go.load());
Vo.addEventListener("click", () => Bo.load());
Yo.addEventListener("click", () => Xo.load());
zo.addEventListener("click", () => Ho.load());
Ko.addEventListener("click", async () => {
  await Fo.load();
});
let R;
const qt = new Lo("connectionLog"),
  bn = new Do("errorBox", "errorHeading", "errorText", "closeErrorBox");
let Z = 0;
k.on("dblclick", (t) => {
  if (vn(t) & (R == null)) {
    (R = new Io()),
      R.moveTo(t.offsetX, t.offsetY),
      qt.addConnection({
        lineID: `path${Z}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
      }),
      k.style("cursor", "crosshair");
    return;
  }
  if (t.srcElement.id == "svgContainer" && !Qt.includes(t.srcElement.id)) {
    R.lineTo(t.offsetX, t.offsetY),
      k
        .append("path")
        .attr("d", R.toString())
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("id", `path${Z}`);
    return;
  }
  if (vn(t) && R) {
    R.lineTo(t.offsetX, t.offsetY),
      k
        .append("path")
        .attr("d", R.toString())
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("id", `path${Z}`),
      qt.addConnection({
        lineID: `path${Z}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
      }),
      Z++,
      k.style("cursor", "default"),
      (R = null);
    return;
  }
});
k.on("mouseover", (t) => {
  Qt.includes(t.srcElement.id) && (Wn.innerHTML = X[t.srcElement.id]);
});
Zo.addEventListener("click", () => {
  const t = Oo(qt.getConnectionLog());
  t == !0
    ? (document.getElementById("box").addEventListener("mousemove", Qo),
      document.querySelector("#my-drawer-4").click())
    : t.error
    ? bn.throw("Error", t.error)
    : bn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
