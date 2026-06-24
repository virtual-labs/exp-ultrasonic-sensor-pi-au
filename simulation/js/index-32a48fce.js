var te = Object.defineProperty;
var ne = (t, n, e) =>
  n in t
    ? te(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var rn = (t, n, e) => (ne(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var ee = { value: () => {} };
function Vt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new _t(e);
}
function _t(t) {
  this._ = t;
}
function re(t, n) {
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
_t.prototype = Vt.prototype = {
  constructor: _t,
  on: function (t, n) {
    var e = this._,
      r = re(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ie(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = on(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = on(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new _t(t);
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
function ie(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function on(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = ee), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Rt = "http://www.w3.org/1999/xhtml";
const sn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Rt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function kt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    sn.hasOwnProperty(n) ? { space: sn[n], local: t } : t
  );
}
function oe(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Rt && n.documentElement.namespaceURI === Rt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function se(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function kn(t) {
  var n = kt(t);
  return (n.local ? se : oe)(n);
}
function ce() {}
function Yt(t) {
  return t == null
    ? ce
    : function () {
        return this.querySelector(t);
      };
}
function ae(t) {
  typeof t != "function" && (t = Yt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new b(r, this._parents);
}
function le(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ue() {
  return [];
}
function Cn(t) {
  return t == null
    ? ue
    : function () {
        return this.querySelectorAll(t);
      };
}
function fe(t) {
  return function () {
    return le(t.apply(this, arguments));
  };
}
function he(t) {
  typeof t == "function" ? (t = fe(t)) : (t = Cn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new b(r, i);
}
function In(t) {
  return function () {
    return this.matches(t);
  };
}
function Nn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var de = Array.prototype.find;
function pe(t) {
  return function () {
    return de.call(this.children, t);
  };
}
function ge() {
  return this.firstElementChild;
}
function _e(t) {
  return this.select(t == null ? ge : pe(typeof t == "function" ? t : Nn(t)));
}
var me = Array.prototype.filter;
function ye() {
  return Array.from(this.children);
}
function we(t) {
  return function () {
    return me.call(this.children, t);
  };
}
function xe(t) {
  return this.selectAll(
    t == null ? ye : we(typeof t == "function" ? t : Nn(t))
  );
}
function ve(t) {
  typeof t != "function" && (t = In(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new b(r, this._parents);
}
function An(t) {
  return new Array(t.length);
}
function be() {
  return new b(this._enter || this._groups.map(An), this._parents);
}
function wt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
wt.prototype = {
  constructor: wt,
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
function Ee(t) {
  return function () {
    return t;
  };
}
function $e(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new wt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function ke(t, n, e, r, i, o, s) {
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
        : (e[c] = new wt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Ce(t) {
  return t.__data__;
}
function Ie(t, n) {
  if (!arguments.length) return Array.from(this, Ce);
  var e = n ? ke : $e,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Ee(t));
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
      p = Ne(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      m = (c[l] = new Array(_)),
      $ = (s[l] = new Array(_)),
      Y = (a[l] = new Array(f));
    e(u, h, m, $, Y, p, n);
    for (var N = 0, A = 0, d, g; N < _; ++N)
      if ((d = m[N])) {
        for (N >= A && (A = N + 1); !(g = $[A]) && ++A < _; );
        d._next = g || null;
      }
  }
  return (s = new b(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ne(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ae() {
  return new b(this._exit || this._groups.map(An), this._parents);
}
function Te(t, n, e) {
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
function Pe(t) {
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
  return new b(c, this._parents);
}
function Se() {
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
  t || (t = Re);
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
  return new b(i, this._parents).order();
}
function Re(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Le() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Oe() {
  return Array.from(this);
}
function De() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ge() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Be() {
  return !this.node();
}
function Xe(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function He(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function qe(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fe(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Ve(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Ye(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function ze(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ke(t, n) {
  var e = kt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? qe
        : He
      : typeof n == "function"
      ? e.local
        ? ze
        : Ye
      : e.local
      ? Ve
      : Fe)(e, n)
  );
}
function Tn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function Ue(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function We(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Ze(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Qe(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? Ue : typeof n == "function" ? Ze : We)(t, n, e ?? "")
      )
    : W(this.node(), t);
}
function W(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Tn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Je(t) {
  return function () {
    delete this[t];
  };
}
function je(t, n) {
  return function () {
    this[t] = n;
  };
}
function tr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function nr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Je : typeof n == "function" ? tr : je)(t, n))
    : this.node()[t];
}
function Pn(t) {
  return t.trim().split(/^|\s+/);
}
function zt(t) {
  return t.classList || new Sn(t);
}
function Sn(t) {
  (this._node = t), (this._names = Pn(t.getAttribute("class") || ""));
}
Sn.prototype = {
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
function Rn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function er(t) {
  return function () {
    Mn(this, t);
  };
}
function rr(t) {
  return function () {
    Rn(this, t);
  };
}
function ir(t, n) {
  return function () {
    (n.apply(this, arguments) ? Mn : Rn)(this, t);
  };
}
function or(t, n) {
  var e = Pn(t + "");
  if (arguments.length < 2) {
    for (var r = zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? ir : n ? er : rr)(e, n));
}
function sr() {
  this.textContent = "";
}
function cr(t) {
  return function () {
    this.textContent = t;
  };
}
function ar(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function lr(t) {
  return arguments.length
    ? this.each(t == null ? sr : (typeof t == "function" ? ar : cr)(t))
    : this.node().textContent;
}
function ur() {
  this.innerHTML = "";
}
function fr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function hr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function dr(t) {
  return arguments.length
    ? this.each(t == null ? ur : (typeof t == "function" ? hr : fr)(t))
    : this.node().innerHTML;
}
function pr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function gr() {
  return this.each(pr);
}
function _r() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function mr() {
  return this.each(_r);
}
function yr(t) {
  var n = typeof t == "function" ? t : kn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function wr() {
  return null;
}
function xr(t, n) {
  var e = typeof t == "function" ? t : kn(t),
    r = n == null ? wr : typeof n == "function" ? n : Yt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function vr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function br() {
  return this.each(vr);
}
function Er() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function $r() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function kr(t) {
  return this.select(t ? $r : Er);
}
function Cr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ir(t) {
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
function Ar(t) {
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
function Tr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Ir(n);
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
function Pr(t, n, e) {
  var r = Nr(t + ""),
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
  for (c = n ? Tr : Ar, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Ln(t, n, e) {
  var r = Tn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Sr(t, n) {
  return function () {
    return Ln(this, t, n);
  };
}
function Mr(t, n) {
  return function () {
    return Ln(this, t, n.apply(this, arguments));
  };
}
function Rr(t, n) {
  return this.each((typeof n == "function" ? Mr : Sr)(t, n));
}
function* Lr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var On = [null];
function b(t, n) {
  (this._groups = t), (this._parents = n);
}
function st() {
  return new b([[document.documentElement]], On);
}
function Or() {
  return this;
}
b.prototype = st.prototype = {
  constructor: b,
  select: ae,
  selectAll: he,
  selectChild: _e,
  selectChildren: xe,
  filter: ve,
  data: Ie,
  enter: be,
  exit: Ae,
  join: Te,
  merge: Pe,
  selection: Or,
  order: Se,
  sort: Me,
  call: Le,
  nodes: Oe,
  node: De,
  size: Ge,
  empty: Be,
  each: Xe,
  attr: Ke,
  style: Qe,
  property: nr,
  classed: or,
  text: lr,
  html: dr,
  raise: gr,
  lower: mr,
  append: yr,
  insert: xr,
  remove: br,
  clone: kr,
  datum: Cr,
  on: Pr,
  dispatch: Rr,
  [Symbol.iterator]: Lr,
};
function O(t) {
  return typeof t == "string"
    ? new b([[document.querySelector(t)]], [document.documentElement])
    : new b([[t]], On);
}
function Dr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function cn(t, n) {
  if (((t = Dr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Gr = { passive: !1 },
  nt = { capture: !0, passive: !1 };
function Tt(t) {
  t.stopImmediatePropagation();
}
function K(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Br(t) {
  var n = t.document.documentElement,
    e = O(t).on("dragstart.drag", K, nt);
  "onselectstart" in n
    ? e.on("selectstart.drag", K, nt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Xr(t, n) {
  var e = t.document.documentElement,
    r = O(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", K, nt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ut = (t) => () => t;
function Lt(
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
Lt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Hr(t) {
  return !t.ctrlKey && !t.button;
}
function qr() {
  return this.parentNode;
}
function Fr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Vr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Yr() {
  var t = Hr,
    n = qr,
    e = Fr,
    r = Vr,
    i = {},
    o = Vt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", $)
      .on("touchmove.drag", Y, Gr)
      .on("touchend.drag touchcancel.drag", N)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = A(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (O(d.view).on("mousemove.drag", _, nt).on("mouseup.drag", m, nt),
        Br(d.view),
        Tt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((K(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    O(d.view).on("mousemove.drag mouseup.drag", null),
      Xr(d.view, l),
      K(d),
      i.mouse("end", d);
  }
  function $(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        w = n.call(this, d, g),
        E = y.length,
        G,
        z;
      for (G = 0; G < E; ++G)
        (z = A(this, w, d, g, y[G].identifier, y[G])) &&
          (Tt(d), z("start", d, y[G]));
    }
  }
  function Y(d) {
    var g = d.changedTouches,
      y = g.length,
      w,
      E;
    for (w = 0; w < y; ++w)
      (E = i[g[w].identifier]) && (K(d), E("drag", d, g[w]));
  }
  function N(d) {
    var g = d.changedTouches,
      y = g.length,
      w,
      E;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        w = 0;
      w < y;
      ++w
    )
      (E = i[g[w].identifier]) && (Tt(d), E("end", d, g[w]));
  }
  function A(d, g, y, w, E, G) {
    var z = o.copy(),
      T = cn(G || y, g),
      jt,
      tn,
      lt;
    if (
      (lt = e.call(
        d,
        new Lt("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: E,
          active: s,
          x: T[0],
          y: T[1],
          dx: 0,
          dy: 0,
          dispatch: z,
        }),
        w
      )) != null
    )
      return (
        (jt = lt.x - T[0] || 0),
        (tn = lt.y - T[1] || 0),
        function Jn(Nt, nn, jn) {
          var en = T,
            At;
          switch (Nt) {
            case "start":
              (i[E] = Jn), (At = s++);
              break;
            case "end":
              delete i[E], --s;
            case "drag":
              (T = cn(jn || nn, g)), (At = s);
              break;
          }
          z.call(
            Nt,
            d,
            new Lt(Nt, {
              sourceEvent: nn,
              subject: lt,
              target: f,
              identifier: E,
              active: At,
              x: T[0] + jt,
              y: T[1] + tn,
              dx: T[0] - en[0],
              dy: T[1] - en[1],
              dispatch: z,
            }),
            w
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
function Dn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function ct() {}
var et = 0.7,
  xt = 1 / et,
  U = "\\s*([+-]?\\d+)\\s*",
  rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  zr = /^#([0-9a-f]{3,8})$/,
  Kr = new RegExp(`^rgb\\(${U},${U},${U}\\)$`),
  Ur = new RegExp(`^rgb\\(${S},${S},${S}\\)$`),
  Wr = new RegExp(`^rgba\\(${U},${U},${U},${rt}\\)$`),
  Zr = new RegExp(`^rgba\\(${S},${S},${S},${rt}\\)$`),
  Qr = new RegExp(`^hsl\\(${rt},${S},${S}\\)$`),
  Jr = new RegExp(`^hsla\\(${rt},${S},${S},${rt}\\)$`),
  an = {
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
Kt(ct, it, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ln,
  formatHex: ln,
  formatHex8: jr,
  formatHsl: ti,
  formatRgb: un,
  toString: un,
});
function ln() {
  return this.rgb().formatHex();
}
function jr() {
  return this.rgb().formatHex8();
}
function ti() {
  return Gn(this).formatHsl();
}
function un() {
  return this.rgb().formatRgb();
}
function it(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = zr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? fn(n)
          : e === 3
          ? new v(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ft(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ft(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Kr.exec(t))
      ? new v(n[1], n[2], n[3], 1)
      : (n = Ur.exec(t))
      ? new v((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Wr.exec(t))
      ? ft(n[1], n[2], n[3], n[4])
      : (n = Zr.exec(t))
      ? ft((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Qr.exec(t))
      ? pn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Jr.exec(t))
      ? pn(n[1], n[2] / 100, n[3] / 100, n[4])
      : an.hasOwnProperty(t)
      ? fn(an[t])
      : t === "transparent"
      ? new v(NaN, NaN, NaN, 0)
      : null
  );
}
function fn(t) {
  return new v((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ft(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new v(t, n, e, r);
}
function ni(t) {
  return (
    t instanceof ct || (t = it(t)),
    t ? ((t = t.rgb()), new v(t.r, t.g, t.b, t.opacity)) : new v()
  );
}
function Ot(t, n, e, r) {
  return arguments.length === 1 ? ni(t) : new v(t, n, e, r ?? 1);
}
function v(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Kt(
  v,
  Ot,
  Dn(ct, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? et : Math.pow(et, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new v(F(this.r), F(this.g), F(this.b), vt(this.opacity));
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
    hex: hn,
    formatHex: hn,
    formatHex8: ei,
    formatRgb: dn,
    toString: dn,
  })
);
function hn() {
  return `#${H(this.r)}${H(this.g)}${H(this.b)}`;
}
function ei() {
  return `#${H(this.r)}${H(this.g)}${H(this.b)}${H(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function dn() {
  const t = vt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${F(this.r)}, ${F(this.g)}, ${F(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function vt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function F(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function H(t) {
  return (t = F(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function pn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new k(t, n, e, r)
  );
}
function Gn(t) {
  if (t instanceof k) return new k(t.h, t.s, t.l, t.opacity);
  if ((t instanceof ct || (t = it(t)), !t)) return new k();
  if (t instanceof k) return t;
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
    new k(s, c, a, t.opacity)
  );
}
function ri(t, n, e, r) {
  return arguments.length === 1 ? Gn(t) : new k(t, n, e, r ?? 1);
}
function k(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Kt(
  k,
  ri,
  Dn(ct, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
        new k(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? et : Math.pow(et, t)),
        new k(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new v(
        Pt(t >= 240 ? t - 240 : t + 120, i, r),
        Pt(t, i, r),
        Pt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new k(gn(this.h), ht(this.s), ht(this.l), vt(this.opacity));
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
      const t = vt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${gn(this.h)}, ${
        ht(this.s) * 100
      }%, ${ht(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function gn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ht(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Pt(t, n, e) {
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
const Bn = (t) => () => t;
function ii(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function oi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function si(t) {
  return (t = +t) == 1
    ? Xn
    : function (n, e) {
        return e - n ? oi(n, e, t) : Bn(isNaN(n) ? e : n);
      };
}
function Xn(t, n) {
  var e = n - t;
  return e ? ii(t, e) : Bn(isNaN(t) ? n : t);
}
const _n = (function t(n) {
  var e = si(n);
  function r(i, o) {
    var s = e((i = Ot(i)).r, (o = Ot(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Xn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function B(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Dt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  St = new RegExp(Dt.source, "g");
function ci(t) {
  return function () {
    return t;
  };
}
function ai(t) {
  return function (n) {
    return t(n) + "";
  };
}
function li(t, n) {
  var e = (Dt.lastIndex = St.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Dt.exec(t)) && (i = St.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: B(r, i) })),
      (e = St.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? ai(a[0].x)
        : ci(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var mn = 180 / Math.PI,
  Gt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Hn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * mn,
      skewX: Math.atan(a) * mn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var dt;
function ui(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Gt : Hn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function fi(t) {
  return t == null ||
    (dt || (dt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    dt.setAttribute("transform", t),
    !(t = dt.transform.baseVal.consolidate()))
    ? Gt
    : ((t = t.matrix), Hn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function qn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: B(l, h) }, { i: m - 2, x: B(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: B(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: B(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: B(l, h) }, { i: m - 2, x: B(u, f) });
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
        for (var _ = -1, m = f.length, $; ++_ < m; ) h[($ = f[_]).i] = $.x(p);
        return h.join("");
      }
    );
  };
}
var hi = qn(ui, "px, ", "px)", "deg)"),
  di = qn(fi, ", ", ")", ")"),
  Z = 0,
  J = 0,
  Q = 0,
  Fn = 1e3,
  bt,
  j,
  Et = 0,
  V = 0,
  Ct = 0,
  ot = typeof performance == "object" && performance.now ? performance : Date,
  Vn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Ut() {
  return V || (Vn(pi), (V = ot.now() + Ct));
}
function pi() {
  V = 0;
}
function $t() {
  this._call = this._time = this._next = null;
}
$t.prototype = Yn.prototype = {
  constructor: $t,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Ut() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        j !== this &&
        (j ? (j._next = this) : (bt = this), (j = this)),
      (this._call = t),
      (this._time = e),
      Bt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Bt());
  },
};
function Yn(t, n, e) {
  var r = new $t();
  return r.restart(t, n, e), r;
}
function gi() {
  Ut(), ++Z;
  for (var t = bt, n; t; )
    (n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Z;
}
function yn() {
  (V = (Et = ot.now()) + Ct), (Z = J = 0);
  try {
    gi();
  } finally {
    (Z = 0), mi(), (V = 0);
  }
}
function _i() {
  var t = ot.now(),
    n = t - Et;
  n > Fn && ((Ct -= n), (Et = t));
}
function mi() {
  for (var t, n = bt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (bt = e)));
  (j = t), Bt(r);
}
function Bt(t) {
  if (!Z) {
    J && (J = clearTimeout(J));
    var n = t - V;
    n > 24
      ? (t < 1 / 0 && (J = setTimeout(yn, t - ot.now() - Ct)),
        Q && (Q = clearInterval(Q)))
      : (Q || ((Et = ot.now()), (Q = setInterval(_i, Fn))), (Z = 1), Vn(yn));
  }
}
function wn(t, n, e) {
  var r = new $t();
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
var yi = Vt("start", "end", "cancel", "interrupt"),
  wi = [],
  zn = 0,
  xn = 1,
  Xt = 2,
  mt = 3,
  vn = 4,
  Ht = 5,
  yt = 6;
function It(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  xi(t, e, {
    name: n,
    index: r,
    group: i,
    on: yi,
    tween: wi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: zn,
  });
}
function Wt(t, n) {
  var e = I(t, n);
  if (e.state > zn) throw new Error("too late; already scheduled");
  return e;
}
function R(t, n) {
  var e = I(t, n);
  if (e.state > mt) throw new Error("too late; already running");
  return e;
}
function I(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function xi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Yn(o, 0, e.time));
  function o(l) {
    (e.state = xn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== xn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === mt) return wn(s);
        p.state === vn
          ? ((p.state = yt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = yt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (wn(function () {
        e.state === mt &&
          ((e.state = vn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Xt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Xt)
    ) {
      for (
        e.state = mt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = Ht), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ht && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = yt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function vi(t, n) {
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
      (i = r.state > Xt && r.state < Ht),
        (r.state = yt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function bi(t) {
  return this.each(function () {
    vi(this, t);
  });
}
function Ei(t, n) {
  var e, r;
  return function () {
    var i = R(this, t),
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
function $i(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = R(this, t),
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
function ki(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = I(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ei : $i)(e, t, n));
}
function Zt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = R(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return I(i, r).value[n];
    }
  );
}
function Kn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? B
      : n instanceof it
      ? _n
      : (e = it(n))
      ? ((n = e), _n)
      : li
  )(t, n);
}
function Ci(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ii(t) {
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
function Ai(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ti(t, n, e) {
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
function Pi(t, n, e) {
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
function Si(t, n) {
  var e = kt(t),
    r = e === "transform" ? di : Kn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Pi : Ti)(e, r, Zt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ii : Ci)(e)
      : (e.local ? Ai : Ni)(e, r, n)
  );
}
function Mi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Ri(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Li(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Ri(t, o)), e;
  }
  return (i._value = n), i;
}
function Oi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Mi(t, o)), e;
  }
  return (i._value = n), i;
}
function Di(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = kt(t);
  return this.tween(e, (r.local ? Li : Oi)(r, n));
}
function Gi(t, n) {
  return function () {
    Wt(this, t).delay = +n.apply(this, arguments);
  };
}
function Bi(t, n) {
  return (
    (n = +n),
    function () {
      Wt(this, t).delay = n;
    }
  );
}
function Xi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Gi : Bi)(n, t))
    : I(this.node(), n).delay;
}
function Hi(t, n) {
  return function () {
    R(this, t).duration = +n.apply(this, arguments);
  };
}
function qi(t, n) {
  return (
    (n = +n),
    function () {
      R(this, t).duration = n;
    }
  );
}
function Fi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Hi : qi)(n, t))
    : I(this.node(), n).duration;
}
function Vi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    R(this, t).ease = n;
  };
}
function Yi(t) {
  var n = this._id;
  return arguments.length ? this.each(Vi(n, t)) : I(this.node(), n).ease;
}
function zi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    R(this, t).ease = e;
  };
}
function Ki(t) {
  if (typeof t != "function") throw new Error();
  return this.each(zi(this._id, t));
}
function Ui(t) {
  typeof t != "function" && (t = In(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new D(r, this._parents, this._name, this._id);
}
function Wi(t) {
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
  return new D(s, this._parents, this._name, this._id);
}
function Zi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Qi(t, n, e) {
  var r,
    i,
    o = Zi(n) ? Wt : R;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function Ji(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? I(this.node(), e).on.on(t)
    : this.each(Qi(e, t, n));
}
function ji(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function to() {
  return this.on("end.remove", ji(this._id));
}
function no(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Yt(t));
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
        It(l[f], n, e, f, l, I(u, e)));
  return new D(o, this._parents, n, e);
}
function eo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Cn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = I(u, e),
            m = 0,
            $ = f.length;
          m < $;
          ++m
        )
          (p = f[m]) && It(p, n, e, m, f, _);
        o.push(f), s.push(u);
      }
  return new D(o, s, n, e);
}
var ro = st.prototype.constructor;
function io() {
  return new ro(this._groups, this._parents);
}
function oo(t, n) {
  var e, r, i;
  return function () {
    var o = W(this, t),
      s = (this.style.removeProperty(t), W(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Un(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function so(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = W(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function co(t, n, e) {
  var r, i, o;
  return function () {
    var s = W(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), W(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function ao(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = R(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Un(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function lo(t, n, e) {
  var r = (t += "") == "transform" ? hi : Kn;
  return n == null
    ? this.styleTween(t, oo(t, r)).on("end.style." + t, Un(t))
    : typeof n == "function"
    ? this.styleTween(t, co(t, r, Zt(this, "style." + t, n))).each(
        ao(this._id, t)
      )
    : this.styleTween(t, so(t, r, n), e).on("end.style." + t, null);
}
function uo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function fo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && uo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function ho(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, fo(t, n, e ?? ""));
}
function po(t) {
  return function () {
    this.textContent = t;
  };
}
function go(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function _o(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? go(Zt(this, "text", t))
      : po(t == null ? "" : t + "")
  );
}
function mo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function yo(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && mo(i)), n;
  }
  return (r._value = t), r;
}
function wo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, yo(t));
}
function xo() {
  for (
    var t = this._name,
      n = this._id,
      e = Wn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = I(a, n);
        It(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new D(r, this._parents, t, e);
}
function vo() {
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
      var l = R(this, r),
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
var bo = 0;
function D(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Wn() {
  return ++bo;
}
var L = st.prototype;
D.prototype = {
  constructor: D,
  select: no,
  selectAll: eo,
  selectChild: L.selectChild,
  selectChildren: L.selectChildren,
  filter: Ui,
  merge: Wi,
  selection: io,
  transition: xo,
  call: L.call,
  nodes: L.nodes,
  node: L.node,
  size: L.size,
  empty: L.empty,
  each: L.each,
  on: Ji,
  attr: Si,
  attrTween: Di,
  style: lo,
  styleTween: ho,
  text: _o,
  textTween: wo,
  remove: to,
  tween: ki,
  delay: Xi,
  duration: Fi,
  ease: Yi,
  easeVarying: Ki,
  end: vo,
  [Symbol.iterator]: L[Symbol.iterator],
};
function Eo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var $o = { time: null, delay: 0, duration: 250, ease: Eo };
function ko(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Co(t) {
  var n, e;
  t instanceof D
    ? ((n = t._id), (t = t._name))
    : ((n = Wn()), ((e = $o).time = Ut()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && It(a, t, n, l, s, e || ko(a, n));
  return new D(r, this._parents, t, n);
}
st.prototype.interrupt = bi;
st.prototype.transition = Co;
const qt = Math.PI,
  Ft = 2 * qt,
  X = 1e-6,
  Io = Ft - X;
function Zn(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function No(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return Zn;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Ao {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? Zn : No(n));
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
    else if (f > X)
      if (!(Math.abs(h * a - l * u) > X) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + l * l,
          $ = p * p + _ * _,
          Y = Math.sqrt(m),
          N = Math.sqrt(f),
          A = o * Math.tan((qt - Math.acos((m + f - $) / (2 * Y * N))) / 2),
          d = A / N,
          g = A / Y;
        Math.abs(d - 1) > X && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * _)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * l)}`;
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
      : (Math.abs(this._x1 - l) > X || Math.abs(this._y1 - u) > X) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Ft) + Ft),
        f > Io
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > X &&
            this._append`A${r},${r},0,${+(f >= qt)},${h},${(this._x1 =
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
function To(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Po(t, n) {
  return fetch(t, n).then(To);
}
function So(t) {
  return (n, e) => Po(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Mo = So("application/xml");
function tt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
tt.prototype = {
  constructor: tt,
  scale: function (t) {
    return t === 1 ? this : new tt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new tt(this.k, this.x + this.k * t, this.y + this.k * n);
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
tt.prototype;
class at {
  constructor(n, e, r, i, o, s, c) {
    rn(this, "dragged", (n) => {
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
    if (O("#" + this.id).node() != null) return;
    const n = await Mo(this.url);
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
      this.sensor.node().append(O(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          Yr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    O(this).raise().classed("active", !0);
  }
  dragended(n) {
    O(this).classed("active", !1);
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
  Ro = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  Lo = [
    "1kresistor_pin_1",
    "1kresistor_pin_2",
    "2kresistor_pin_1",
    "2kresistor_pin_2",
  ],
  pt = {
    "1kresistor_pin_1": "1K Resistor",
    "1kresistor_pin_2": "1K Resistor",
    "2kresistor_pin_1": "2K Resistor",
    "2kresistor_pin_2": "2K Resistor",
  },
  Oo = ["Vcc", "trig", "Echo", "gnd"],
  gt = { Vcc: "VCC", trig: "Trig", Echo: "Echo", gnd: "GND" },
  q = {
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
  Do = (t) => {
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
        if (q[r.connector] == "GND") {
          e++;
          return;
        }
        if (q[r.connector].includes("GPIO")) {
          e++;
          return;
        }
      }),
      console.log(e, "he"),
      e > 8
    );
  };
class Go {
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
      const e = q[this.connections[this.connections.length - 2].connector]
          ? q[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = q[this.connections[this.connections.length - 1].connector]
          ? q[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
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
class Bo {
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
const bn = (t, n) => {
    Jt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  M = O("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Xo = new at("raspberry", M, "./images/pi3dirk.svg", 1, !1, 0, 0),
  Ho = new at(
    "OnekResistor",
    M,
    "./images/1kResistor1.svg",
    0.11111111,
    !1,
    460,
    200
  ),
  qo = new at(
    "TwokResistor",
    M,
    "./images/2kResistor1.svg",
    0.1111111,
    !1,
    260,
    300
  ),
  Fo = new at("ultraSonicsensor", M, "./images/sensor1.svg", 0.15, !1, 400, 0),
  Vo = new at("box", M, "./images/box.svg", 0.15, !0, 0, 0),
  Jt = M.append("g").attr("id", "pathsGroup"),
  Yo = document.getElementById("rasberryPi"),
  zo = document.getElementById("1kResistor"),
  Ko = document.getElementById("2kResistor"),
  Uo = document.getElementById("sensor"),
  Wo = document.getElementById("object"),
  Zo = document.getElementById("info"),
  Qo = document.getElementById("list"),
  En = (t) =>
    Qt.includes(t.srcElement.id) ||
    Ro.includes(t.srcElement.id) ||
    Lo.includes(t.srcElement.id) ||
    Oo.includes(t.srcElement.id),
  Qn = document.getElementById("displayInfo"),
  Jo = document.getElementById("codeSubmit");
let Mt = !1;
Zo.addEventListener("click", () => {
  (Mt = !Mt), (Qo.style.display = Mt ? "block" : "none");
});
const jo = () => {
  const t = document.getElementById("box").getBoundingClientRect(),
    n = document.getElementById("ultraSonicsensor").getBoundingClientRect(),
    e = { x: t.left + t.width / 2, y: t.top + t.height / 2 },
    r = { x: n.left + n.width / 2, y: n.top + n.height / 2 },
    i = Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2));
  Qn.innerHTML = `Distance: ${i.toFixed(2)}`;
};
Yo.addEventListener("click", async () => await Xo.load());
zo.addEventListener("click", () => Ho.load());
Ko.addEventListener("click", () => qo.load());
Uo.addEventListener("click", () => Fo.load());
Wo.addEventListener("click", async () => {
  await Vo.load();
});
let x;
const C = new Go("connectionLog"),
  $n = new Bo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let P = 0;
const ts = document.querySelector("#undoButton");
ts.addEventListener("click", () => {
  C.undoLastConnection(), es();
});
const ns = (t) => {
    Jt.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => {
        e.remove();
      });
  },
  es = () => {
    if (x) {
      Jt.selectAll(`path[id^="path${P}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (x = null),
        (P = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (C.connections.length > 0) {
      const n = C.connections[C.connections.length - 1].lineID;
      ns(n),
        C.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
M.on("dblclick", (t) => {
  if (En(t) && x == null) {
    (x = new Ao()),
      x.moveTo(t.offsetX, t.offsetY),
      C.addConnection({
        lineID: `path${P}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      M.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(P, "path count");
    return;
  }
  if (t.srcElement.id == "svgContainer" && !Qt.includes(t.srcElement.id)) {
    x && x.lineTo(t.offsetX, t.offsetY),
      x &&
        C.connections.length > 0 &&
        (C.connections[C.connections.length - 1].connectorEnd = null),
      x &&
        (bn(x.toString(), `path${P}`),
        console.log("path created"),
        console.log(P));
    return;
  }
  if (En(t) && x) {
    x.lineTo(t.offsetX, t.offsetY),
      bn(x.toString(), `path${P}`),
      C.addConnection({
        lineID: `path${P}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      P++,
      M.style("cursor", "default"),
      (x = null),
      console.log("connectedPointSequence", connectedPointSequence),
      console.log("path created 2"),
      console.log(P);
    return;
  }
});
M.on("mouseover", (t) => {
  Qt.includes(t.srcElement.id) && (Qn.innerHTML = q[t.srcElement.id]);
});
Jo.addEventListener("click", () => {
  const t = Do(C.getConnectionLog());
  t == !0
    ? (document.getElementById("box").addEventListener("mousemove", jo),
      document.querySelector("#my-drawer-4").click())
    : t.error
    ? $n.throw("Error", t.error)
    : $n.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
