import { defineComponent as Pe, ref as Z, onMounted as Me, onBeforeUnmount as Be, openBlock as We, createElementBlock as Re, normalizeClass as Fe, createElementVNode as qe, renderSlot as $e } from "vue";
var ce = { exports: {} }, Ue = ce.exports = {};
Ue.forEach = function(r, n) {
  for (var a = 0; a < r.length; a++) {
    var t = n(r[a]);
    if (t)
      return t;
  }
};
var Ge = function(r) {
  var n = r.stateHandler.getState;
  function a(l) {
    var i = n(l);
    return i && !!i.isDetectable;
  }
  function t(l) {
    n(l).isDetectable = !0;
  }
  function u(l) {
    return !!n(l).busy;
  }
  function h(l, i) {
    n(l).busy = !!i;
  }
  return {
    isDetectable: a,
    markAsDetectable: t,
    isBusy: u,
    markBusy: h
  };
}, Ve = function(r) {
  var n = {};
  function a(l) {
    var i = r.get(l);
    return i === void 0 ? [] : n[i] || [];
  }
  function t(l, i) {
    var f = r.get(l);
    n[f] || (n[f] = []), n[f].push(i);
  }
  function u(l, i) {
    for (var f = a(l), d = 0, g = f.length; d < g; ++d)
      if (f[d] === i) {
        f.splice(d, 1);
        break;
      }
  }
  function h(l) {
    var i = a(l);
    !i || (i.length = 0);
  }
  return {
    get: a,
    add: t,
    removeListener: u,
    removeAllListeners: h
  };
}, Je = function() {
  var r = 1;
  function n() {
    return r++;
  }
  return {
    generate: n
  };
}, Ye = function(r) {
  var n = r.idGenerator, a = r.stateHandler.getState;
  function t(h) {
    var l = a(h);
    return l && l.id !== void 0 ? l.id : null;
  }
  function u(h) {
    var l = a(h);
    if (!l)
      throw new Error("setId required the element to have a resize detection state.");
    var i = n.generate();
    return l.id = i, i;
  }
  return {
    get: t,
    set: u
  };
}, Ke = function(r) {
  function n() {
  }
  var a = {
    log: n,
    warn: n,
    error: n
  };
  if (!r && window.console) {
    var t = function(u, h) {
      u[h] = function() {
        var i = console[h];
        if (i.apply)
          i.apply(console, arguments);
        else
          for (var f = 0; f < arguments.length; f++)
            i(arguments[f]);
      };
    };
    t(a, "log"), t(a, "warn"), t(a, "error");
  }
  return a;
}, le = { exports: {} }, Te = le.exports = {};
Te.isIE = function(r) {
  function n() {
    var t = navigator.userAgent.toLowerCase();
    return t.indexOf("msie") !== -1 || t.indexOf("trident") !== -1 || t.indexOf(" edge/") !== -1;
  }
  if (!n())
    return !1;
  if (!r)
    return !0;
  var a = function() {
    var t, u = 3, h = document.createElement("div"), l = h.getElementsByTagName("i");
    do
      h.innerHTML = "<!--[if gt IE " + ++u + "]><i></i><![endif]-->";
    while (l[0]);
    return u > 4 ? u : t;
  }();
  return r === a;
};
Te.isLegacyOpera = function() {
  return !!window.opera;
};
var Ce = { exports: {} }, Qe = Ce.exports = {};
Qe.getOption = Xe;
function Xe(r, n, a) {
  var t = r[n];
  return t == null && a !== void 0 ? a : t;
}
var Se = Ce.exports, Ze = function(n) {
  n = n || {};
  var a = n.reporter, t = Se.getOption(n, "async", !0), u = Se.getOption(n, "auto", !0);
  u && !t && (a && a.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), t = !0);
  var h = we(), l, i = !1;
  function f(b, A) {
    !i && u && t && h.size() === 0 && T(), h.add(b, A);
  }
  function d() {
    for (i = !0; h.size(); ) {
      var b = h;
      h = we(), b.process();
    }
    i = !1;
  }
  function g(b) {
    i || (b === void 0 && (b = t), l && (O(l), l = null), b ? T() : d());
  }
  function T() {
    l = E(d);
  }
  function O(b) {
    var A = clearTimeout;
    return A(b);
  }
  function E(b) {
    var A = function(I) {
      return setTimeout(I, 0);
    };
    return A(b);
  }
  return {
    add: f,
    force: g
  };
};
function we() {
  var r = {}, n = 0, a = 0, t = 0;
  function u(i, f) {
    f || (f = i, i = 0), i > a ? a = i : i < t && (t = i), r[i] || (r[i] = []), r[i].push(f), n++;
  }
  function h() {
    for (var i = t; i <= a; i++)
      for (var f = r[i], d = 0; d < f.length; d++) {
        var g = f[d];
        g();
      }
  }
  function l() {
    return n;
  }
  return {
    add: u,
    process: h,
    size: l
  };
}
var ue = "_erd";
function et(r) {
  return r[ue] = {}, De(r);
}
function De(r) {
  return r[ue];
}
function tt(r) {
  delete r[ue];
}
var rt = {
  initState: et,
  getState: De,
  cleanState: tt
}, ee = le.exports, nt = function(r) {
  r = r || {};
  var n = r.reporter, a = r.batchProcessor, t = r.stateHandler.getState;
  if (!n)
    throw new Error("Missing required dependency: reporter.");
  function u(d, g) {
    function T() {
      g(d);
    }
    if (ee.isIE(8))
      t(d).object = {
        proxy: T
      }, d.attachEvent("onresize", T);
    else {
      var O = i(d);
      if (!O)
        throw new Error("Element is not detectable by this strategy.");
      O.contentDocument.defaultView.addEventListener("resize", T);
    }
  }
  function h(d) {
    var g = r.important ? " !important; " : "; ";
    return (d.join(g) + g).trim();
  }
  function l(d, g, T) {
    T || (T = g, g = d, d = null), d = d || {}, d.debug;
    function O(E, b) {
      var A = h(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]), I = !1, L = window.getComputedStyle(E), w = E.offsetWidth, C = E.offsetHeight;
      t(E).startSize = {
        width: w,
        height: C
      };
      function c() {
        function e() {
          if (L.position === "static") {
            E.style.setProperty("position", "relative", d.important ? "important" : "");
            var D = function(_, m, H, v) {
              function S(j) {
                return j.replace(/[^-\d\.]/g, "");
              }
              var P = H[v];
              P !== "auto" && S(P) !== "0" && (_.warn("An element that is positioned static has style." + v + "=" + P + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + v + " will be set to 0. Element: ", m), m.style.setProperty(v, "0", d.important ? "important" : ""));
            };
            D(n, E, L, "top"), D(n, E, L, "right"), D(n, E, L, "bottom"), D(n, E, L, "left");
          }
        }
        function x() {
          I || e();
          function D(m, H) {
            if (!m.contentDocument) {
              var v = t(m);
              v.checkForObjectDocumentTimeoutId && window.clearTimeout(v.checkForObjectDocumentTimeoutId), v.checkForObjectDocumentTimeoutId = setTimeout(function() {
                v.checkForObjectDocumentTimeoutId = 0, D(m, H);
              }, 100);
              return;
            }
            H(m.contentDocument);
          }
          var _ = this;
          D(_, function(H) {
            b(E);
          });
        }
        L.position !== "" && (e(), I = !0);
        var o = document.createElement("object");
        o.style.cssText = A, o.tabIndex = -1, o.type = "text/html", o.setAttribute("aria-hidden", "true"), o.onload = x, ee.isIE() || (o.data = "about:blank"), t(E) && (E.appendChild(o), t(E).object = o, ee.isIE() && (o.data = "about:blank"));
      }
      a ? a.add(c) : c();
    }
    ee.isIE(8) ? T(g) : O(g, T);
  }
  function i(d) {
    return t(d).object;
  }
  function f(d) {
    if (!!t(d)) {
      var g = i(d);
      !g || (ee.isIE(8) ? d.detachEvent("onresize", g.proxy) : d.removeChild(g), t(d).checkForObjectDocumentTimeoutId && window.clearTimeout(t(d).checkForObjectDocumentTimeoutId), delete t(d).object);
    }
  }
  return {
    makeDetectable: l,
    addListener: u,
    uninstall: f
  };
}, it = ce.exports.forEach, at = function(r) {
  r = r || {};
  var n = r.reporter, a = r.batchProcessor, t = r.stateHandler.getState;
  r.stateHandler.hasState;
  var u = r.idHandler;
  if (!a)
    throw new Error("Missing required dependency: batchProcessor");
  if (!n)
    throw new Error("Missing required dependency: reporter.");
  var h = g(), l = "erd_scroll_detection_scrollbar_style", i = "erd_scroll_detection_container";
  function f(c) {
    T(c, l, i);
  }
  f(window.document);
  function d(c) {
    var e = r.important ? " !important; " : "; ";
    return (c.join(e) + e).trim();
  }
  function g() {
    var c = 500, e = 500, x = document.createElement("div");
    x.style.cssText = d(["position: absolute", "width: " + c * 2 + "px", "height: " + e * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var o = document.createElement("div");
    o.style.cssText = d(["position: absolute", "width: " + c + "px", "height: " + e + "px", "overflow: scroll", "visibility: none", "top: " + -c * 3 + "px", "left: " + -e * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]), o.appendChild(x), document.body.insertBefore(o, document.body.firstChild);
    var D = c - o.clientWidth, _ = e - o.clientHeight;
    return document.body.removeChild(o), {
      width: D,
      height: _
    };
  }
  function T(c, e, x) {
    function o(H, v) {
      v = v || function(P) {
        c.head.appendChild(P);
      };
      var S = c.createElement("style");
      return S.innerHTML = H, S.id = e, v(S), S;
    }
    if (!c.getElementById(e)) {
      var D = x + "_animation", _ = x + "_animation_active", m = `/* Created by the element-resize-detector library. */
`;
      m += "." + x + " > div::-webkit-scrollbar { " + d(["display: none"]) + ` }

`, m += "." + _ + " { " + d(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + D, "animation-name: " + D]) + ` }
`, m += "@-webkit-keyframes " + D + ` { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
`, m += "@keyframes " + D + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", o(m);
    }
  }
  function O(c) {
    c.className += " " + i + "_animation_active";
  }
  function E(c, e, x) {
    if (c.addEventListener)
      c.addEventListener(e, x);
    else if (c.attachEvent)
      c.attachEvent("on" + e, x);
    else
      return n.error("[scroll] Don't know how to add event listeners.");
  }
  function b(c, e, x) {
    if (c.removeEventListener)
      c.removeEventListener(e, x);
    else if (c.detachEvent)
      c.detachEvent("on" + e, x);
    else
      return n.error("[scroll] Don't know how to remove event listeners.");
  }
  function A(c) {
    return t(c).container.childNodes[0].childNodes[0].childNodes[0];
  }
  function I(c) {
    return t(c).container.childNodes[0].childNodes[0].childNodes[1];
  }
  function L(c, e) {
    var x = t(c).listeners;
    if (!x.push)
      throw new Error("Cannot add listener to an element that is not detectable.");
    t(c).listeners.push(e);
  }
  function w(c, e, x) {
    x || (x = e, e = c, c = null), c = c || {};
    function o() {
      if (c.debug) {
        var s = Array.prototype.slice.call(arguments);
        if (s.unshift(u.get(e), "Scroll: "), n.log.apply)
          n.log.apply(null, s);
        else
          for (var p = 0; p < s.length; p++)
            n.log(s[p]);
      }
    }
    function D(s) {
      function p(k) {
        var B = k.getRootNode && k.getRootNode().contains(k);
        return k === k.ownerDocument.body || k.ownerDocument.body.contains(k) || B;
      }
      return !p(s) || window.getComputedStyle(s) === null;
    }
    function _(s) {
      var p = t(s).container.childNodes[0], k = window.getComputedStyle(p);
      return !k.width || k.width.indexOf("px") === -1;
    }
    function m() {
      var s = window.getComputedStyle(e), p = {};
      return p.position = s.position, p.width = e.offsetWidth, p.height = e.offsetHeight, p.top = s.top, p.right = s.right, p.bottom = s.bottom, p.left = s.left, p.widthCSS = s.width, p.heightCSS = s.height, p;
    }
    function H() {
      var s = m();
      t(e).startSize = {
        width: s.width,
        height: s.height
      }, o("Element start size", t(e).startSize);
    }
    function v() {
      t(e).listeners = [];
    }
    function S() {
      if (o("storeStyle invoked."), !t(e)) {
        o("Aborting because element has been uninstalled");
        return;
      }
      var s = m();
      t(e).style = s;
    }
    function P(s, p, k) {
      t(s).lastWidth = p, t(s).lastHeight = k;
    }
    function j(s) {
      return A(s).childNodes[0];
    }
    function U() {
      return 2 * h.width + 1;
    }
    function re() {
      return 2 * h.height + 1;
    }
    function ne(s) {
      return s + 10 + U();
    }
    function ie(s) {
      return s + 10 + re();
    }
    function Le(s) {
      return s * 2 + U();
    }
    function ze(s) {
      return s * 2 + re();
    }
    function fe(s, p, k) {
      var B = A(s), G = I(s), Y = ne(p), K = ie(k), N = Le(p), y = ze(k);
      B.scrollLeft = Y, B.scrollTop = K, G.scrollLeft = N, G.scrollTop = y;
    }
    function he() {
      var s = t(e).container;
      if (!s) {
        s = document.createElement("div"), s.className = i, s.style.cssText = d(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), t(e).container = s, O(s), e.appendChild(s);
        var p = function() {
          t(e).onRendered && t(e).onRendered();
        };
        E(s, "animationstart", p), t(e).onAnimationStart = p;
      }
      return s;
    }
    function Ae() {
      function s() {
        var z = t(e).style;
        if (z.position === "static") {
          e.style.setProperty("position", "relative", c.important ? "important" : "");
          var F = function(X, J, Ie, oe) {
            function je(Ne) {
              return Ne.replace(/[^-\d\.]/g, "");
            }
            var se = Ie[oe];
            se !== "auto" && je(se) !== "0" && (X.warn("An element that is positioned static has style." + oe + "=" + se + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + oe + " will be set to 0. Element: ", J), J.style[oe] = 0);
          };
          F(n, e, z, "top"), F(n, e, z, "right"), F(n, e, z, "bottom"), F(n, e, z, "left");
        }
      }
      function p(z, F, X, J) {
        return z = z ? z + "px" : "0", F = F ? F + "px" : "0", X = X ? X + "px" : "0", J = J ? J + "px" : "0", ["left: " + z, "top: " + F, "right: " + J, "bottom: " + X];
      }
      if (o("Injecting elements"), !t(e)) {
        o("Aborting because element has been uninstalled");
        return;
      }
      s();
      var k = t(e).container;
      k || (k = he());
      var B = h.width, G = h.height, Y = d(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]), K = d(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(p(-(1 + B), -(1 + G), -G, -B))), N = d(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), y = d(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), M = d(["position: absolute", "left: 0", "top: 0"]), V = d(["position: absolute", "width: 200%", "height: 200%"]), W = document.createElement("div"), R = document.createElement("div"), Q = document.createElement("div"), ge = document.createElement("div"), ae = document.createElement("div"), pe = document.createElement("div");
      W.dir = "ltr", W.style.cssText = Y, W.className = i, R.className = i, R.style.cssText = K, Q.style.cssText = N, ge.style.cssText = M, ae.style.cssText = y, pe.style.cssText = V, Q.appendChild(ge), ae.appendChild(pe), R.appendChild(Q), R.appendChild(ae), W.appendChild(R), k.appendChild(W);
      function be() {
        var z = t(e);
        z && z.onExpand ? z.onExpand() : o("Aborting expand scroll handler: element has been uninstalled");
      }
      function ye() {
        var z = t(e);
        z && z.onShrink ? z.onShrink() : o("Aborting shrink scroll handler: element has been uninstalled");
      }
      E(Q, "scroll", be), E(ae, "scroll", ye), t(e).onExpandScroll = be, t(e).onShrinkScroll = ye;
    }
    function He() {
      function s(N, y, M) {
        var V = j(N), W = ne(y), R = ie(M);
        V.style.setProperty("width", W + "px", c.important ? "important" : ""), V.style.setProperty("height", R + "px", c.important ? "important" : "");
      }
      function p(N) {
        var y = e.offsetWidth, M = e.offsetHeight, V = y !== t(e).lastWidth || M !== t(e).lastHeight;
        o("Storing current size", y, M), P(e, y, M), a.add(0, function() {
          if (!!V) {
            if (!t(e)) {
              o("Aborting because element has been uninstalled");
              return;
            }
            if (!k()) {
              o("Aborting because element container has not been initialized");
              return;
            }
            if (c.debug) {
              var R = e.offsetWidth, Q = e.offsetHeight;
              (R !== y || Q !== M) && n.warn(u.get(e), "Scroll: Size changed before updating detector elements.");
            }
            s(e, y, M);
          }
        }), a.add(1, function() {
          if (!t(e)) {
            o("Aborting because element has been uninstalled");
            return;
          }
          if (!k()) {
            o("Aborting because element container has not been initialized");
            return;
          }
          fe(e, y, M);
        }), V && N && a.add(2, function() {
          if (!t(e)) {
            o("Aborting because element has been uninstalled");
            return;
          }
          if (!k()) {
            o("Aborting because element container has not been initialized");
            return;
          }
          N();
        });
      }
      function k() {
        return !!t(e).container;
      }
      function B() {
        function N() {
          return t(e).lastNotifiedWidth === void 0;
        }
        o("notifyListenersIfNeeded invoked");
        var y = t(e);
        if (N() && y.lastWidth === y.startSize.width && y.lastHeight === y.startSize.height)
          return o("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        if (y.lastWidth === y.lastNotifiedWidth && y.lastHeight === y.lastNotifiedHeight)
          return o("Not notifying: Size already notified");
        o("Current size not notified, notifying..."), y.lastNotifiedWidth = y.lastWidth, y.lastNotifiedHeight = y.lastHeight, it(t(e).listeners, function(M) {
          M(e);
        });
      }
      function G() {
        if (o("startanimation triggered."), _(e)) {
          o("Ignoring since element is still unrendered...");
          return;
        }
        o("Element rendered.");
        var N = A(e), y = I(e);
        (N.scrollLeft === 0 || N.scrollTop === 0 || y.scrollLeft === 0 || y.scrollTop === 0) && (o("Scrollbars out of sync. Updating detector elements..."), p(B));
      }
      function Y() {
        if (o("Scroll detected."), _(e)) {
          o("Scroll event fired while unrendered. Ignoring...");
          return;
        }
        p(B);
      }
      if (o("registerListenersAndPositionElements invoked."), !t(e)) {
        o("Aborting because element has been uninstalled");
        return;
      }
      t(e).onRendered = G, t(e).onExpand = Y, t(e).onShrink = Y;
      var K = t(e).style;
      s(e, K.width, K.height);
    }
    function _e() {
      if (o("finalizeDomMutation invoked."), !t(e)) {
        o("Aborting because element has been uninstalled");
        return;
      }
      var s = t(e).style;
      P(e, s.width, s.height), fe(e, s.width, s.height);
    }
    function Oe() {
      x(e);
    }
    function ve() {
      o("Installing..."), v(), H(), a.add(0, S), a.add(1, Ae), a.add(2, He), a.add(3, _e), a.add(4, Oe);
    }
    o("Making detectable..."), D(e) ? (o("Element is detached"), he(), o("Waiting until element is attached..."), t(e).onRendered = function() {
      o("Element is now attached"), ve();
    }) : ve();
  }
  function C(c) {
    var e = t(c);
    !e || (e.onExpandScroll && b(A(c), "scroll", e.onExpandScroll), e.onShrinkScroll && b(I(c), "scroll", e.onShrinkScroll), e.onAnimationStart && b(e.container, "animationstart", e.onAnimationStart), e.container && c.removeChild(e.container));
  }
  return {
    makeDetectable: w,
    addListener: L,
    uninstall: C,
    initDocument: f
  };
}, te = ce.exports.forEach, ot = Ge, st = Ve, dt = Je, ct = Ye, lt = Ke, me = le.exports, ut = Ze, q = rt, ft = nt, ht = at;
function Ee(r) {
  return Array.isArray(r) || r.length !== void 0;
}
function xe(r) {
  if (Array.isArray(r))
    return r;
  var n = [];
  return te(r, function(a) {
    n.push(a);
  }), n;
}
function ke(r) {
  return r && r.nodeType === 1;
}
var vt = function(r) {
  r = r || {};
  var n;
  if (r.idHandler)
    n = {
      get: function(w) {
        return r.idHandler.get(w, !0);
      },
      set: r.idHandler.set
    };
  else {
    var a = dt(), t = ct({
      idGenerator: a,
      stateHandler: q
    });
    n = t;
  }
  var u = r.reporter;
  if (!u) {
    var h = u === !1;
    u = lt(h);
  }
  var l = $(r, "batchProcessor", ut({ reporter: u })), i = {};
  i.callOnAdd = !!$(r, "callOnAdd", !0), i.debug = !!$(r, "debug", !1);
  var f = st(n), d = ot({
    stateHandler: q
  }), g, T = $(r, "strategy", "object"), O = $(r, "important", !1), E = {
    reporter: u,
    batchProcessor: l,
    stateHandler: q,
    idHandler: n,
    important: O
  };
  if (T === "scroll" && (me.isLegacyOpera() ? (u.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), T = "object") : me.isIE(9) && (u.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), T = "object")), T === "scroll")
    g = ht(E);
  else if (T === "object")
    g = ft(E);
  else
    throw new Error("Invalid strategy name: " + T);
  var b = {};
  function A(w, C, c) {
    function e(H) {
      var v = f.get(H);
      te(v, function(P) {
        P(H);
      });
    }
    function x(H, v, S) {
      f.add(v, S), H && S(v);
    }
    if (c || (c = C, C = w, w = {}), !C)
      throw new Error("At least one element required.");
    if (!c)
      throw new Error("Listener required.");
    if (ke(C))
      C = [C];
    else if (Ee(C))
      C = xe(C);
    else
      return u.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    var o = 0, D = $(w, "callOnAdd", i.callOnAdd), _ = $(w, "onReady", function() {
    }), m = $(w, "debug", i.debug);
    te(C, function(v) {
      q.getState(v) || (q.initState(v), n.set(v));
      var S = n.get(v);
      if (m && u.log("Attaching listener to element", S, v), !d.isDetectable(v)) {
        if (m && u.log(S, "Not detectable."), d.isBusy(v)) {
          m && u.log(S, "System busy making it detectable"), x(D, v, c), b[S] = b[S] || [], b[S].push(function() {
            o++, o === C.length && _();
          });
          return;
        }
        return m && u.log(S, "Making detectable..."), d.markBusy(v, !0), g.makeDetectable({ debug: m, important: O }, v, function(j) {
          if (m && u.log(S, "onElementDetectable"), q.getState(j)) {
            d.markAsDetectable(j), d.markBusy(j, !1), g.addListener(j, e), x(D, j, c);
            var U = q.getState(j);
            if (U && U.startSize) {
              var re = j.offsetWidth, ne = j.offsetHeight;
              (U.startSize.width !== re || U.startSize.height !== ne) && e(j);
            }
            b[S] && te(b[S], function(ie) {
              ie();
            });
          } else
            m && u.log(S, "Element uninstalled before being detectable.");
          delete b[S], o++, o === C.length && _();
        });
      }
      m && u.log(S, "Already detecable, adding listener."), x(D, v, c), o++;
    }), o === C.length && _();
  }
  function I(w) {
    if (!w)
      return u.error("At least one element is required.");
    if (ke(w))
      w = [w];
    else if (Ee(w))
      w = xe(w);
    else
      return u.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    te(w, function(C) {
      f.removeAllListeners(C), g.uninstall(C), q.cleanState(C);
    });
  }
  function L(w) {
    g.initDocument && g.initDocument(w);
  }
  return {
    listenTo: A,
    removeListener: f.removeListener,
    removeAllListeners: f.removeAllListeners,
    uninstall: I,
    initDocument: L
  };
};
function $(r, n, a) {
  var t = r[n];
  return t == null && a !== void 0 ? a : t;
}
const gt = /* @__PURE__ */ Pe({
  __name: "vue3-auto-scroll",
  props: {
    hideScrollBar: { type: Boolean, default: !0 },
    speed: { default: 1 },
    delay: { default: 1e3 },
    control: { type: Boolean, default: !0 },
    backSpeed: { default: 10 }
  },
  setup(r) {
    const n = r, a = Z(null), t = Z(null), u = Z(0), h = Z(0), l = Z(0);
    let i = null, f = null;
    const d = () => {
      i && clearTimeout(i), f && cancelAnimationFrame(f), u.value = a.value.clientHeight, h.value = t.value.clientHeight, !(h.value < u.value) && (i = setTimeout(() => {
        b();
      }, n.delay), n.control && g());
    }, g = () => {
      var L, w;
      (L = a.value) == null || L.addEventListener("mouseenter", T), (w = a.value) == null || w.addEventListener("mouseleave", O);
    }, T = () => {
      var L;
      i && clearTimeout(i), f && cancelAnimationFrame(f), (L = a.value) == null || L.addEventListener("scroll", E);
    }, O = () => {
      a.value.removeEventListener("scroll", E), i = setTimeout(() => {
        b();
      }, n.delay);
    }, E = () => {
      l.value = a.value.scrollTop;
    }, b = () => {
      if (l.value += n.speed, a.value.scrollTop = l.value, h.value - l.value <= u.value) {
        A();
        return;
      }
      f = requestAnimationFrame(b);
    }, A = () => {
      i = setTimeout(() => {
        I();
      }, n.delay);
    }, I = () => {
      requestAnimationFrame(() => {
        if (l.value -= n.backSpeed, a.value.scrollTop = l.value, l.value <= 0) {
          i = setTimeout(() => {
            b();
          }, n.delay);
          return;
        }
        I();
      });
    };
    return Me(() => {
      vt().listenTo(t.value, () => {
        d();
      });
    }), Be(() => {
      i && clearTimeout(i);
    }), (L, w) => (We(), Re("div", {
      class: Fe(["vue3-auto-scroll-wrapper", [r.hideScrollBar ? "hide-scroll-bar" : ""]]),
      ref_key: "wrapperRef",
      ref: a
    }, [
      qe("div", {
        ref_key: "scrollRef",
        ref: t
      }, [
        $e(L.$slots, "default", {}, void 0, !0)
      ], 512)
    ], 2));
  }
});
const pt = (r, n) => {
  const a = r.__vccOpts || r;
  for (const [t, u] of n)
    a[t] = u;
  return a;
}, de = /* @__PURE__ */ pt(gt, [["__scopeId", "data-v-04a58be4"]]);
de.name = "vue3-auto-scroll";
const yt = (r) => {
  r.component(de.name, de);
};
export {
  de as Vue3AutoScroll,
  yt as default
};
