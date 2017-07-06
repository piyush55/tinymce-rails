// 4.6.4 (2017-06-13)
! function() {
    var a = {},
        b = function(b) {
            for (var c = a[b], e = c.deps, f = c.defn, g = e.length, h = new Array(g), i = 0; i < g; ++i) h[i] = d(e[i]);
            var j = f.apply(null, h);
            if (void 0 === j) throw "module [" + b + "] returned undefined";
            c.instance = j
        },
        c = function(b, c, d) {
            if ("string" != typeof b) throw "module id must be a string";
            if (void 0 === c) throw "no dependencies for " + b;
            if (void 0 === d) throw "no definition function for " + b;
            a[b] = {
                deps: c,
                defn: d,
                instance: void 0
            }
        },
        d = function(c) {
            var d = a[c];
            if (void 0 === d) throw "module [" + c + "] was undefined";
            return void 0 === d.instance && b(c), d.instance
        },
        e = function(a, b) {
            for (var c = a.length, e = new Array(c), f = 0; f < c; ++f) e.push(d(a[f]));
            b.apply(null, b)
        },
        f = {};
    f.bolt = {
        module: {
            api: {
                define: c,
                require: e,
                demand: d
            }
        }
    };
    var g = c,
        h = function(a, b) {
            g(a, [], function() {
                return b
            })
        };
    g("3", [], function() {
        "use strict";

        function a(a, b, c) {
            var d, e, g, h, i, k;
            return d = b.x, e = b.y, g = a.w, h = a.h, i = b.w, k = b.h, c = (c || "").split(""), "b" === c[0] && (e += k), "r" === c[1] && (d += i), "c" === c[0] && (e += j(k / 2)), "c" === c[1] && (d += j(i / 2)), "b" === c[3] && (e -= h), "r" === c[4] && (d -= g), "c" === c[3] && (e -= j(h / 2)), "c" === c[4] && (d -= j(g / 2)), f(d, e, g, h)
        }

        function b(b, c, d, e) {
            var f, g;
            for (g = 0; g < e.length; g++)
                if (f = a(b, c, e[g]), f.x >= d.x && f.x + f.w <= d.w + d.x && f.y >= d.y && f.y + f.h <= d.h + d.y) return e[g];
            return null
        }

        function c(a, b, c) {
            return f(a.x - b, a.y - c, a.w + 2 * b, a.h + 2 * c)
        }

        function d(a, b) {
            var c, d, e, g;
            return c = i(a.x, b.x), d = i(a.y, b.y), e = h(a.x + a.w, b.x + b.w), g = h(a.y + a.h, b.y + b.h), e - c < 0 || g - d < 0 ? null : f(c, d, e - c, g - d)
        }

        function e(a, b, c) {
            var d, e, g, h, j, k, l, m, n, o;
            return j = a.x, k = a.y, l = a.x + a.w, m = a.y + a.h, n = b.x + b.w, o = b.y + b.h, d = i(0, b.x - j), e = i(0, b.y - k), g = i(0, l - n), h = i(0, m - o), j += d, k += e, c && (l += d, m += e, j -= g, k -= h), l -= g, m -= h, f(j, k, l - j, m - k)
        }

        function f(a, b, c, d) {
            return {
                x: a,
                y: b,
                w: c,
                h: d
            }
        }

        function g(a) {
            return f(a.left, a.top, a.width, a.height)
        }
        var h = Math.min,
            i = Math.max,
            j = Math.round;
        return {
            inflate: c,
            relativePosition: a,
            findBestRelativePosition: b,
            intersect: d,
            clamp: e,
            create: f,
            fromClientRect: g
        }
    }), g("4", [], function() {
        function a(a, b) {
            return function() {
                a.apply(b, arguments)
            }
        }

        function b(b) {
            if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof b) throw new TypeError("not a function");
            this._state = null, this._value = null, this._deferreds = [], h(b, a(d, this), a(e, this))
        }

        function c(a) {
            var b = this;
            return null === this._state ? void this._deferreds.push(a) : void i(function() {
                var c = b._state ? a.onFulfilled : a.onRejected;
                if (null === c) return void(b._state ? a.resolve : a.reject)(b._value);
                var d;
                try {
                    d = c(b._value)
                } catch (b) {
                    return void a.reject(b)
                }
                a.resolve(d)
            })
        }

        function d(b) {
            try {
                if (b === this) throw new TypeError("A promise cannot be resolved with itself.");
                if (b && ("object" == typeof b || "function" == typeof b)) {
                    var c = b.then;
                    if ("function" == typeof c) return void h(a(c, b), a(d, this), a(e, this))
                }
                this._state = !0, this._value = b, f.call(this)
            } catch (a) {
                e.call(this, a)
            }
        }

        function e(a) {
            this._state = !1, this._value = a, f.call(this)
        }

        function f() {
            for (var a = 0, b = this._deferreds.length; a < b; a++) c.call(this, this._deferreds[a]);
            this._deferreds = null
        }

        function g(a, b, c, d) {
            this.onFulfilled = "function" == typeof a ? a : null, this.onRejected = "function" == typeof b ? b : null, this.resolve = c, this.reject = d
        }

        function h(a, b, c) {
            var d = !1;
            try {
                a(function(a) {
                    d || (d = !0, b(a))
                }, function(a) {
                    d || (d = !0, c(a))
                })
            } catch (a) {
                if (d) return;
                d = !0, c(a)
            }
        }
        if (window.Promise) return window.Promise;
        var i = b.immediateFn || "function" == typeof setImmediate && setImmediate || function(a) {
                setTimeout(a, 1)
            },
            j = Array.isArray || function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            };
        return b.prototype["catch"] = function(a) {
            return this.then(null, a)
        }, b.prototype.then = function(a, d) {
            var e = this;
            return new b(function(b, f) {
                c.call(e, new g(a, d, b, f))
            })
        }, b.all = function() {
            var a = Array.prototype.slice.call(1 === arguments.length && j(arguments[0]) ? arguments[0] : arguments);
            return new b(function(b, c) {
                function d(f, g) {
                    try {
                        if (g && ("object" == typeof g || "function" == typeof g)) {
                            var h = g.then;
                            if ("function" == typeof h) return void h.call(g, function(a) {
                                d(f, a)
                            }, c)
                        }
                        a[f] = g, 0 === --e && b(a)
                    } catch (a) {
                        c(a)
                    }
                }
                if (0 === a.length) return b([]);
                for (var e = a.length, f = 0; f < a.length; f++) d(f, a[f])
            })
        }, b.resolve = function(a) {
            return a && "object" == typeof a && a.constructor === b ? a : new b(function(b) {
                b(a)
            })
        }, b.reject = function(a) {
            return new b(function(b, c) {
                c(a)
            })
        }, b.race = function(a) {
            return new b(function(b, c) {
                for (var d = 0, e = a.length; d < e; d++) a[d].then(b, c)
            })
        }, b
    }), g("5", ["4"], function(a) {
        function b(a, b) {
            function c(a) {
                window.setTimeout(a, 0)
            }
            var d, e = window.requestAnimationFrame,
                f = ["ms", "moz", "webkit"];
            for (d = 0; d < f.length && !e; d++) e = window[f[d] + "RequestAnimationFrame"];
            e || (e = c), e(a, b)
        }

        function c(a, b) {
            return "number" != typeof b && (b = 0), setTimeout(a, b)
        }

        function d(a, b) {
            return "number" != typeof b && (b = 1), setInterval(a, b)
        }

        function e(a) {
            return clearTimeout(a)
        }

        function f(a) {
            return clearInterval(a)
        }

        function g(a, b) {
            var d, e;
            return e = function() {
                var e = arguments;
                clearTimeout(d), d = c(function() {
                    a.apply(this, e)
                }, b)
            }, e.stop = function() {
                clearTimeout(d)
            }, e
        }
        var h;
        return {
            requestAnimationFrame: function(c, d) {
                return h ? void h.then(c) : void(h = new a(function(a) {
                    d || (d = document.body), b(a, d)
                }).then(c))
            },
            setTimeout: c,
            setInterval: d,
            setEditorTimeout: function(a, b, d) {
                return c(function() {
                    a.removed || b()
                }, d)
            },
            setEditorInterval: function(a, b, c) {
                var e;
                return e = d(function() {
                    a.removed ? clearInterval(e) : b()
                }, c)
            },
            debounce: g,
            throttle: g,
            clearInterval: f,
            clearTimeout: e
        }
    }), g("6", [], function() {
        function a(a) {
            return "matchMedia" in window && matchMedia(a).matches
        }
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o = navigator,
            p = o.userAgent;
        b = window.opera && window.opera.buildNumber, j = /Android/.test(p), c = /WebKit/.test(p), d = !c && !b && /MSIE/gi.test(p) && /Explorer/gi.test(o.appName), d = d && /MSIE (\w+)\./.exec(p)[1], e = p.indexOf("Trident/") != -1 && (p.indexOf("rv:") != -1 || o.appName.indexOf("Netscape") != -1) && 11, f = p.indexOf("Edge/") != -1 && !d && !e && 12, d = d || e || f, g = !c && !e && /Gecko/.test(p), h = p.indexOf("Mac") != -1, i = /(iPad|iPhone)/.test(p), k = "FormData" in window && "FileReader" in window && "URL" in window && !!URL.createObjectURL, l = a("only screen and (max-device-width: 480px)") && (j || i), m = a("only screen and (min-width: 800px)") && (j || i), n = p.indexOf("Windows Phone") != -1, f && (c = !1);
        var q = !i || k || p.match(/AppleWebKit\/(\d*)/)[1] >= 534;
        return {
            opera: b,
            webkit: c,
            ie: d,
            gecko: g,
            mac: h,
            iOS: i,
            android: j,
            contentEditable: q,
            transparentSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            caretAfter: 8 != d,
            range: window.getSelection && "Range" in window,
            documentMode: d && !f ? document.documentMode || 7 : 10,
            fileApi: k,
            ceFalse: d === !1 || d > 8,
            canHaveCSP: d === !1 || d > 11,
            desktop: !l && !m,
            windowsPhone: n
        }
    }), g("7", ["5", "6"], function(a, b) {
        "use strict";

        function c(a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
        }

        function d(a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, d || !1) : a.detachEvent && a.detachEvent("on" + b, c)
        }

        function e(a, b) {
            var c, d = b;
            return c = a.path, c && c.length > 0 && (d = c[0]), a.deepPath && (c = a.deepPath(), c && c.length > 0 && (d = c[0])), d
        }

        function f(a, c) {
            var d, f, g = c || {};
            for (d in a) k[d] || (g[d] = a[d]);
            if (g.target || (g.target = g.srcElement || document), b.experimentalShadowDom && (g.target = e(a, g.target)), a && j.test(a.type) && a.pageX === f && a.clientX !== f) {
                var h = g.target.ownerDocument || document,
                    i = h.documentElement,
                    o = h.body;
                g.pageX = a.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), g.pageY = a.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)
            }
            return g.preventDefault = function() {
                g.isDefaultPrevented = n, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            }, g.stopPropagation = function() {
                g.isPropagationStopped = n, a && (a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0)
            }, g.stopImmediatePropagation = function() {
                g.isImmediatePropagationStopped = n, g.stopPropagation()
            }, l(g) === !1 && (g.isDefaultPrevented = m, g.isPropagationStopped = m, g.isImmediatePropagationStopped = m), "undefined" == typeof g.metaKey && (g.metaKey = !1), g
        }

        function g(e, f, g) {
            function h() {
                return "complete" === l.readyState || "interactive" === l.readyState && l.body
            }

            function i() {
                g.domLoaded || (g.domLoaded = !0, f(m))
            }

            function j() {
                h() && (d(l, "readystatechange", j), i())
            }

            function k() {
                try {
                    l.documentElement.doScroll("left")
                } catch (b) {
                    return void a.setTimeout(k)
                }
                i()
            }
            var l = e.document,
                m = {
                    type: "ready"
                };
            return g.domLoaded ? void f(m) : (!l.addEventListener || b.ie && b.ie < 11 ? (c(l, "readystatechange", j), l.documentElement.doScroll && e.self === e.top && k()) : h() ? i() : c(e, "DOMContentLoaded", i), void c(e, "load", i))
        }

        function h() {
            function a(a, b) {
                var c, d, e, f, g = m[b];
                if (c = g && g[a.type])
                    for (d = 0, e = c.length; d < e; d++)
                        if (f = c[d], f && f.func.call(f.scope, a) === !1 && a.preventDefault(), a.isImmediatePropagationStopped()) return
            }
            var b, e, h, j, k, l = this,
                m = {};
            e = i + (+new Date).toString(32), j = "onmouseenter" in document.documentElement, h = "onfocusin" in document.documentElement, k = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, b = 1, l.domLoaded = !1, l.events = m, l.bind = function(d, i, n, o) {
                function p(b) {
                    a(f(b || x.event), q)
                }
                var q, r, s, t, u, v, w, x = window;
                if (d && 3 !== d.nodeType && 8 !== d.nodeType) {
                    for (d[e] ? q = d[e] : (q = b++, d[e] = q, m[q] = {}), o = o || d, i = i.split(" "), s = i.length; s--;) t = i[s], v = p, u = w = !1, "DOMContentLoaded" === t && (t = "ready"), l.domLoaded && "ready" === t && "complete" == d.readyState ? n.call(o, f({
                        type: t
                    })) : (j || (u = k[t], u && (v = function(b) {
                        var c, d;
                        if (c = b.currentTarget, d = b.relatedTarget, d && c.contains) d = c.contains(d);
                        else
                            for (; d && d !== c;) d = d.parentNode;
                        d || (b = f(b || x.event), b.type = "mouseout" === b.type ? "mouseleave" : "mouseenter", b.target = c, a(b, q))
                    })), h || "focusin" !== t && "focusout" !== t || (w = !0, u = "focusin" === t ? "focus" : "blur", v = function(b) {
                        b = f(b || x.event), b.type = "focus" === b.type ? "focusin" : "focusout", a(b, q)
                    }), r = m[q][t], r ? "ready" === t && l.domLoaded ? n({
                        type: t
                    }) : r.push({
                        func: n,
                        scope: o
                    }) : (m[q][t] = r = [{
                        func: n,
                        scope: o
                    }], r.fakeName = u, r.capture = w, r.nativeHandler = v, "ready" === t ? g(d, v, l) : c(d, u || t, v, w)));
                    return d = r = 0, n
                }
            }, l.unbind = function(a, b, c) {
                var f, g, h, i, j, k;
                if (!a || 3 === a.nodeType || 8 === a.nodeType) return l;
                if (f = a[e]) {
                    if (k = m[f], b) {
                        for (b = b.split(" "), h = b.length; h--;)
                            if (j = b[h], g = k[j]) {
                                if (c)
                                    for (i = g.length; i--;)
                                        if (g[i].func === c) {
                                            var n = g.nativeHandler,
                                                o = g.fakeName,
                                                p = g.capture;
                                            g = g.slice(0, i).concat(g.slice(i + 1)), g.nativeHandler = n, g.fakeName = o, g.capture = p, k[j] = g
                                        }
                                c && 0 !== g.length || (delete k[j], d(a, g.fakeName || j, g.nativeHandler, g.capture))
                            }
                    } else {
                        for (j in k) g = k[j], d(a, g.fakeName || j, g.nativeHandler, g.capture);
                        k = {}
                    }
                    for (j in k) return l;
                    delete m[f];
                    try {
                        delete a[e]
                    } catch (b) {
                        a[e] = null
                    }
                }
                return l
            }, l.fire = function(b, c, d) {
                var g;
                if (!b || 3 === b.nodeType || 8 === b.nodeType) return l;
                d = f(null, d), d.type = c, d.target = b;
                do g = b[e], g && a(d, g), b = b.parentNode || b.ownerDocument || b.defaultView || b.parentWindow; while (b && !d.isPropagationStopped());
                return l
            }, l.clean = function(a) {
                var b, c, d = l.unbind;
                if (!a || 3 === a.nodeType || 8 === a.nodeType) return l;
                if (a[e] && d(a), a.getElementsByTagName || (a = a.document), a && a.getElementsByTagName)
                    for (d(a), c = a.getElementsByTagName("*"), b = c.length; b--;) a = c[b], a[e] && d(a);
                return l
            }, l.destroy = function() {
                m = {}
            }, l.cancel = function(a) {
                return a && (a.preventDefault(), a.stopImmediatePropagation()), !1
            }
        }
        var i = "mce-data-",
            j = /^(?:mouse|contextmenu)|click/,
            k = {
                keyLocation: 1,
                layerX: 1,
                layerY: 1,
                returnValue: 1,
                webkitMovementX: 1,
                webkitMovementY: 1,
                keyIdentifier: 1
            },
            l = function(a) {
                return a.isDefaultPrevented === n || a.isDefaultPrevented === m
            },
            m = function() {
                return !1
            },
            n = function() {
                return !0
            };
        return h.Event = new h, h.Event.bind(window, "ready", function() {}), h
    }), g("8", [], function() {
        function a(a, b, c, d) {
            var e, f, g, h, i, k, m, n, o, p;
            if ((b ? b.ownerDocument || b : N) !== F && E(b), b = b || F, c = c || [], !a || "string" != typeof a) return c;
            if (1 !== (h = b.nodeType) && 9 !== h) return [];
            if (H && !d) {
                if (e = qa.exec(a))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g), !f || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && L(b, f) && f.id === g) return c.push(f), c
                    } else {
                        if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && u.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c
                    }
                if (u.qsa && (!I || !I.test(a))) {
                    if (n = m = M, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (k = y(a), (m = b.getAttribute("id")) ? n = m.replace(sa, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = k.length; i--;) k[i] = n + l(k[i]);
                        o = ra.test(a) && j(b.parentNode) || b, p = k.join(",")
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)), c
                    } catch (a) {} finally {
                        m || b.removeAttribute("id")
                    }
                }
            }
            return A(a.replace(ga, "$1"), b, c, d)
        }

        function b() {
            function a(c, d) {
                return b.push(c + " ") > v.cacheLength && delete a[b.shift()], a[c + " "] = d
            }
            var b = [];
            return a
        }

        function c(a) {
            return a[M] = !0, a
        }

        function d(a) {
            var b = F.createElement("div");
            try {
                return !!a(b)
            } catch (a) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function e(a, b) {
            for (var c = a.split("|"), d = a.length; d--;) v.attrHandle[c[d]] = b
        }

        function f(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function g(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function i(a) {
            return c(function(b) {
                return b = +b, c(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function j(a) {
            return a && typeof a.getElementsByTagName !== U && a
        }

        function k() {}

        function l(a) {
            for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
            return d
        }

        function m(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = P++;
            return b.first ? function(b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [O, f];
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) {
                            if (i = b[M] || (b[M] = {}), (h = i[d]) && h[0] === O && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function n(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function o(b, c, d) {
            for (var e = 0, f = c.length; e < f; e++) a(b, c[e], d);
            return d
        }

        function p(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function q(a, b, d, e, f, g) {
            return e && !e[M] && (e = q(e)), f && !f[M] && (f = q(f, g)), c(function(c, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    q = g.length,
                    r = c || o(b || "*", h.nodeType ? [h] : h, []),
                    s = !a || !c && b ? r : p(r, m, a, h, i),
                    t = d ? f || (c ? a : q || e) ? [] : g : s;
                if (d && d(s, t, h, i), e)
                    for (j = p(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (c) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? aa.call(c, l) : m[k]) > -1 && (c[j] = !(g[j] = l))
                    }
                } else t = p(t === g ? t.splice(q, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
            })
        }

        function r(a) {
            for (var b, c, d, e = a.length, f = v.relative[a[0].type], g = f || v.relative[" "], h = f ? 1 : 0, i = m(function(a) {
                    return a === b
                }, g, !0), j = m(function(a) {
                    return aa.call(b, a) > -1
                }, g, !0), k = [function(a, c, d) {
                    return !f && (d || c !== B) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                }]; h < e; h++)
                if (c = v.relative[a[h].type]) k = [m(n(k), c)];
                else {
                    if (c = v.filter[a[h].type].apply(null, a[h].matches), c[M]) {
                        for (d = ++h; d < e && !v.relative[a[d].type]; d++);
                        return q(h > 1 && n(k), h > 1 && l(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ga, "$1"), c, h < d && r(a.slice(h, d)), d < e && r(a = a.slice(d)), d < e && l(a))
                    }
                    k.push(c)
                }
            return n(k)
        }

        function s(b, d) {
            var e = d.length > 0,
                f = b.length > 0,
                g = function(c, g, h, i, j) {
                    var k, l, m, n = 0,
                        o = "0",
                        q = c && [],
                        r = [],
                        s = B,
                        t = c || f && v.find.TAG("*", j),
                        u = O += null == s ? 1 : Math.random() || .1,
                        w = t.length;
                    for (j && (B = g !== F && g); o !== w && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0; m = b[l++];)
                                if (m(k, g, h)) {
                                    i.push(k);
                                    break
                                }
                            j && (O = u)
                        }
                        e && ((k = !m && k) && n--, c && q.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = d[l++];) m(q, r, g, h);
                        if (c) {
                            if (n > 0)
                                for (; o--;) q[o] || r[o] || (r[o] = Y.call(i));
                            r = p(r)
                        }
                        $.apply(i, r), j && !c && r.length > 0 && n + d.length > 1 && a.uniqueSort(i)
                    }
                    return j && (O = u, B = s), q
                };
            return e ? c(g) : g
        }
        var t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M = "sizzle" + -new Date,
            N = window.document,
            O = 0,
            P = 0,
            Q = b(),
            R = b(),
            S = b(),
            T = function(a, b) {
                return a === b && (D = !0), 0
            },
            U = "undefined",
            V = 1 << 31,
            W = {}.hasOwnProperty,
            X = [],
            Y = X.pop,
            Z = X.push,
            $ = X.push,
            _ = X.slice,
            aa = X.indexOf || function(a) {
                for (var b = 0, c = this.length; b < c; b++)
                    if (this[b] === a) return b;
                return -1
            },
            ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ca = "[\\x20\\t\\r\\n\\f]",
            da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ea = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ca + "*\\]",
            fa = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)",
            ga = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
            ha = new RegExp("^" + ca + "*," + ca + "*"),
            ia = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
            ja = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
            ka = new RegExp(fa),
            la = new RegExp("^" + da + "$"),
            ma = {
                ID: new RegExp("^#(" + da + ")"),
                CLASS: new RegExp("^\\.(" + da + ")"),
                TAG: new RegExp("^(" + da + "|[*])"),
                ATTR: new RegExp("^" + ea),
                PSEUDO: new RegExp("^" + fa),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ba + ")$", "i"),
                needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
            },
            na = /^(?:input|select|textarea|button)$/i,
            oa = /^h\d$/i,
            pa = /^[^{]+\{\s*\[native \w/,
            qa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ra = /[+~]/,
            sa = /'|\\/g,
            ta = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
            ua = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
        try {
            $.apply(X = _.call(N.childNodes), N.childNodes), X[N.childNodes.length].nodeType
        } catch (a) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b))
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        u = a.support = {}, x = a.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName
        }, E = a.setDocument = function(a) {
            function b(a) {
                try {
                    return a.top
                } catch (a) {}
                return null
            }
            var c, e = a ? a.ownerDocument || a : N,
                g = e.defaultView;
            return e !== F && 9 === e.nodeType && e.documentElement ? (F = e, G = e.documentElement, H = !x(e), g && g !== b(g) && (g.addEventListener ? g.addEventListener("unload", function() {
                E()
            }, !1) : g.attachEvent && g.attachEvent("onunload", function() {
                E()
            })), u.attributes = d(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), u.getElementsByTagName = d(function(a) {
                return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
            }), u.getElementsByClassName = pa.test(e.getElementsByClassName), u.getById = d(function(a) {
                return G.appendChild(a).id = M, !e.getElementsByName || !e.getElementsByName(M).length
            }), u.getById ? (v.find.ID = function(a, b) {
                if (typeof b.getElementById !== U && H) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, v.filter.ID = function(a) {
                var b = a.replace(ta, ua);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete v.find.ID, v.filter.ID = function(a) {
                var b = a.replace(ta, ua);
                return function(a) {
                    var c = typeof a.getAttributeNode !== U && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), v.find.TAG = u.getElementsByTagName ? function(a, b) {
                if (typeof b.getElementsByTagName !== U) return b.getElementsByTagName(a)
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, v.find.CLASS = u.getElementsByClassName && function(a, b) {
                if (H) return b.getElementsByClassName(a)
            }, J = [], I = [], (u.qsa = pa.test(e.querySelectorAll)) && (d(function(a) {
                a.innerHTML = "<select msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || I.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll(":checked").length || I.push(":checked")
            }), d(function(a) {
                var b = e.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && I.push("name" + ca + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), I.push(",.*:")
            })), (u.matchesSelector = pa.test(K = G.matches || G.webkitMatchesSelector || G.mozMatchesSelector || G.oMatchesSelector || G.msMatchesSelector)) && d(function(a) {
                u.disconnectedMatch = K.call(a, "div"), K.call(a, "[s!='']:x"), J.push("!=", fa)
            }), I = I.length && new RegExp(I.join("|")), J = J.length && new RegExp(J.join("|")), c = pa.test(G.compareDocumentPosition), L = c || pa.test(G.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, T = c ? function(a, b) {
                if (a === b) return D = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !u.sortDetached && b.compareDocumentPosition(a) === c ? a === e || a.ownerDocument === N && L(N, a) ? -1 : b === e || b.ownerDocument === N && L(N, b) ? 1 : C ? aa.call(C, a) - aa.call(C, b) : 0 : 4 & c ? -1 : 1)
            } : function(a, b) {
                if (a === b) return D = !0, 0;
                var c, d = 0,
                    g = a.parentNode,
                    h = b.parentNode,
                    i = [a],
                    j = [b];
                if (!g || !h) return a === e ? -1 : b === e ? 1 : g ? -1 : h ? 1 : C ? aa.call(C, a) - aa.call(C, b) : 0;
                if (g === h) return f(a, b);
                for (c = a; c = c.parentNode;) i.unshift(c);
                for (c = b; c = c.parentNode;) j.unshift(c);
                for (; i[d] === j[d];) d++;
                return d ? f(i[d], j[d]) : i[d] === N ? -1 : j[d] === N ? 1 : 0
            }, e) : F
        }, a.matches = function(b, c) {
            return a(b, null, null, c)
        }, a.matchesSelector = function(b, c) {
            if ((b.ownerDocument || b) !== F && E(b), c = c.replace(ja, "='$1']"), u.matchesSelector && H && (!J || !J.test(c)) && (!I || !I.test(c))) try {
                var d = K.call(b, c);
                if (d || u.disconnectedMatch || b.document && 11 !== b.document.nodeType) return d
            } catch (a) {}
            return a(c, F, null, [b]).length > 0
        }, a.contains = function(a, b) {
            return (a.ownerDocument || a) !== F && E(a), L(a, b)
        }, a.attr = function(a, b) {
            (a.ownerDocument || a) !== F && E(a);
            var c = v.attrHandle[b.toLowerCase()],
                d = c && W.call(v.attrHandle, b.toLowerCase()) ? c(a, b, !H) : void 0;
            return void 0 !== d ? d : u.attributes || !H ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }, a.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, a.uniqueSort = function(a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (D = !u.detectDuplicates, C = !u.sortStable && a.slice(0), a.sort(T), D) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return C = null, a
        }, w = a.getText = function(a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += w(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d++];) c += w(b);
            return c
        }, v = a.selectors = {
            cacheLength: 50,
            createPseudo: c,
            match: ma,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ta, ua), a[3] = (a[3] || a[4] || a[5] || "").replace(ta, ua), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(b) {
                    return b[1] = b[1].toLowerCase(), "nth" === b[1].slice(0, 3) ? (b[3] || a.error(b[0]), b[4] = +(b[4] ? b[5] + (b[6] || 1) : 2 * ("even" === b[3] || "odd" === b[3])), b[5] = +(b[7] + b[8] || "odd" === b[3])) : b[3] && a.error(b[0]), b
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return ma.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ka.test(c) && (b = y(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ta, ua).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = Q[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && Q(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== U && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(b, c, d) {
                    return function(e) {
                        var f = a.attr(e, b);
                        return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];)
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (k = q[M] || (q[M] = {}), j = k[a] || [], n = j[0] === O && j[1], m = j[0] === O && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [O, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[M] || (b[M] = {}))[a]) && j[0] === O) m = j[1];
                            else
                                for (;
                                    (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[M] || (l[M] = {}))[a] = [O, m]), l !== b)););
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(b, d) {
                    var e, f = v.pseudos[b] || v.setFilters[b.toLowerCase()] || a.error("unsupported pseudo: " + b);
                    return f[M] ? f(d) : f.length > 1 ? (e = [b, b, "", d], v.setFilters.hasOwnProperty(b.toLowerCase()) ? c(function(a, b) {
                        for (var c, e = f(a, d), g = e.length; g--;) c = aa.call(a, e[g]), a[c] = !(b[c] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: c(function(a) {
                    var b = [],
                        d = [],
                        e = z(a.replace(ga, "$1"));
                    return e[M] ? c(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, c, f) {
                        return b[0] = a, e(b, null, f, d), !d.pop()
                    }
                }),
                has: c(function(b) {
                    return function(c) {
                        return a(b, c).length > 0
                    }
                }),
                contains: c(function(a) {
                    return a = a.replace(ta, ua),
                        function(b) {
                            return (b.textContent || b.innerText || w(b)).indexOf(a) > -1
                        }
                }),
                lang: c(function(b) {
                    return la.test(b || "") || a.error("unsupported lang: " + b), b = b.replace(ta, ua).toLowerCase(),
                        function(a) {
                            var c;
                            do
                                if (c = H ? a.lang : a.getAttribute("xml:lang") || a.getAttribute("lang")) return c = c.toLowerCase(), c === b || 0 === c.indexOf(b + "-");
                            while ((a = a.parentNode) && 1 === a.nodeType);
                            return !1
                        }
                }),
                target: function(a) {
                    var b = window.location && window.location.hash;
                    return b && b.slice(1) === a.id
                },
                root: function(a) {
                    return a === G
                },
                focus: function(a) {
                    return a === F.activeElement && (!F.hasFocus || F.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !v.pseudos.empty(a)
                },
                header: function(a) {
                    return oa.test(a.nodeName)
                },
                input: function(a) {
                    return na.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: i(function() {
                    return [0]
                }),
                last: i(function(a, b) {
                    return [b - 1]
                }),
                eq: i(function(a, b, c) {
                    return [c < 0 ? c + b : c]
                }),
                even: i(function(a, b) {
                    for (var c = 0; c < b; c += 2) a.push(c);
                    return a
                }),
                odd: i(function(a, b) {
                    for (var c = 1; c < b; c += 2) a.push(c);
                    return a
                }),
                lt: i(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: i(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, v.pseudos.nth = v.pseudos.eq;
        for (t in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) v.pseudos[t] = g(t);
        for (t in {
                submit: !0,
                reset: !0
            }) v.pseudos[t] = h(t);
        return k.prototype = v.filters = v.pseudos, v.setFilters = new k, y = a.tokenize = function(b, c) {
            var d, e, f, g, h, i, j, k = R[b + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = b, i = [], j = v.preFilter; h;) {
                d && !(e = ha.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ia.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ga, " ")
                }), h = h.slice(d.length));
                for (g in v.filter) !(e = ma[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length : h ? a.error(b) : R(b, i).slice(0)
        }, z = a.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = S[a + " "];
            if (!f) {
                for (b || (b = y(a)), c = b.length; c--;) f = r(b[c]), f[M] ? d.push(f) : e.push(f);
                f = S(a, s(e, d)), f.selector = a
            }
            return f
        }, A = a.select = function(a, b, c, d) {
            var e, f, g, h, i, k = "function" == typeof a && a,
                m = !d && y(a = k.selector || a);
            if (c = c || [], 1 === m.length) {
                if (f = m[0] = m[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && u.getById && 9 === b.nodeType && H && v.relative[f[1].type]) {
                    if (b = (v.find.ID(g.matches[0].replace(ta, ua), b) || [])[0], !b) return c;
                    k && (b = b.parentNode), a = a.slice(f.shift().value.length)
                }
                for (e = ma.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !v.relative[h = g.type]);)
                    if ((i = v.find[h]) && (d = i(g.matches[0].replace(ta, ua), ra.test(f[0].type) && j(b.parentNode) || b))) {
                        if (f.splice(e, 1), a = d.length && l(f), !a) return $.apply(c, d), c;
                        break
                    }
            }
            return (k || z(a, m))(d, b, !H, c, ra.test(a) && j(b.parentNode) || b), c
        }, u.sortStable = M.split("").sort(T).join("") === M, u.detectDuplicates = !!D, E(), u.sortDetached = d(function(a) {
            return 1 & a.compareDocumentPosition(F.createElement("div"))
        }), d(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || e("type|href|height|width", function(a, b, c) {
            if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), u.attributes && d(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || e("value", function(a, b, c) {
            if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
        }), d(function(a) {
            return null == a.getAttribute("disabled")
        }) || e(ba, function(a, b, c) {
            var d;
            if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), a
    }), g("1g", [], function() {
        function a(a) {
            var b, c, d = a;
            if (!j(a))
                for (d = [], b = 0, c = a.length; b < c; b++) d[b] = a[b];
            return d
        }

        function b(a, b, c) {
            var d, e;
            if (!a) return 0;
            if (c = c || a, void 0 !== a.length) {
                for (d = 0, e = a.length; d < e; d++)
                    if (b.call(c, a[d], d, a) === !1) return 0
            } else
                for (d in a)
                    if (a.hasOwnProperty(d) && b.call(c, a[d], d, a) === !1) return 0; return 1
        }

        function c(a, c) {
            var d = [];
            return b(a, function(b, e) {
                d.push(c(b, e, a))
            }), d
        }

        function d(a, c) {
            var d = [];
            return b(a, function(b, e) {
                c && !c(b, e, a) || d.push(b)
            }), d
        }

        function e(a, b) {
            var c, d;
            if (a)
                for (c = 0, d = a.length; c < d; c++)
                    if (a[c] === b) return c;
            return -1
        }

        function f(a, b, c, d) {
            var e = 0;
            for (arguments.length < 3 && (c = a[0]); e < a.length; e++) c = b.call(d, c, a[e], e);
            return c
        }

        function g(a, b, c) {
            var d, e;
            for (d = 0, e = a.length; d < e; d++)
                if (b.call(c, a[d], d, a)) return d;
            return -1
        }

        function h(a, b, c) {
            var d = g(a, b, c);
            if (d !== -1) return a[d]
        }

        function i(a) {
            return a[a.length - 1]
        }
        var j = Array.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        };
        return {
            isArray: j,
            toArray: a,
            each: b,
            map: c,
            filter: d,
            indexOf: e,
            reduce: f,
            findIndex: g,
            find: h,
            last: i
        }
    }), g("9", ["6", "1g"], function(a, b) {
        function c(a) {
            return null === a || void 0 === a ? "" : ("" + a).replace(n, "")
        }

        function d(a, c) {
            return c ? !("array" != c || !b.isArray(a)) || typeof a == c : void 0 !== a
        }

        function e(a, b, c) {
            var d;
            for (a = a || [], b = b || ",", "string" == typeof a && (a = a.split(b)), c = c || {}, d = a.length; d--;) c[a[d]] = {};
            return c
        }

        function f(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }

        function g(a, b, c) {
            var d, e, f, g, h, i = this,
                j = 0;
            if (a = /^((static) )?([\w.]+)(:([\w.]+))?/.exec(a), f = a[3].match(/(^|\.)(\w+)$/i)[2], e = i.createNS(a[3].replace(/\.\w+$/, ""), c), !e[f]) {
                if ("static" == a[2]) return e[f] = b, void(this.onCreate && this.onCreate(a[2], a[3], e[f]));
                b[f] || (b[f] = function() {}, j = 1), e[f] = b[f], i.extend(e[f].prototype, b), a[5] && (d = i.resolve(a[5]).prototype, g = a[5].match(/\.(\w+)$/i)[1], h = e[f], j ? e[f] = function() {
                    return d[g].apply(this, arguments)
                } : e[f] = function() {
                    return this.parent = d[g], h.apply(this, arguments)
                }, e[f].prototype[f] = e[f], i.each(d, function(a, b) {
                    e[f].prototype[b] = d[b]
                }), i.each(b, function(a, b) {
                    d[b] ? e[f].prototype[b] = function() {
                        return this.parent = d[b], a.apply(this, arguments)
                    } : b != f && (e[f].prototype[b] = a)
                })), i.each(b["static"], function(a, b) {
                    e[f][b] = a
                })
            }
        }

        function h(a, b) {
            var c, d, e, f, g = arguments;
            for (c = 1, d = g.length; c < d; c++) {
                b = g[c];
                for (e in b) b.hasOwnProperty(e) && (f = b[e], void 0 !== f && (a[e] = f))
            }
            return a
        }

        function i(a, c, d, e) {
            e = e || this, a && (d && (a = a[d]), b.each(a, function(a, b) {
                return c.call(e, a, b, d) !== !1 && void i(a, c, d, e)
            }))
        }

        function j(a, b) {
            var c, d;
            for (b = b || window, a = a.split("."), c = 0; c < a.length; c++) d = a[c], b[d] || (b[d] = {}), b = b[d];
            return b
        }

        function k(a, b) {
            var c, d;
            for (b = b || window, a = a.split("."), c = 0, d = a.length; c < d && (b = b[a[c]], b); c++);
            return b
        }

        function l(a, e) {
            return !a || d(a, "array") ? a : b.map(a.split(e || ","), c)
        }

        function m(b) {
            var c = a.cacheSuffix;
            return c && (b += (b.indexOf("?") === -1 ? "?" : "&") + c), b
        }
        var n = /^\s*|\s*$/g;
        return {
            trim: c,
            isArray: b.isArray,
            is: d,
            toArray: b.toArray,
            makeMap: e,
            each: b.each,
            map: b.map,
            grep: b.filter,
            inArray: b.indexOf,
            hasOwn: f,
            extend: h,
            create: g,
            walk: i,
            createNS: j,
            resolve: k,
            explode: l,
            _addCacheSuffix: m
        }
    }), g("a", ["7", "8", "9", "6"], function(a, b, c, d) {
        function e(a) {
            return "undefined" != typeof a
        }

        function f(a) {
            return "string" == typeof a
        }

        function g(a) {
            return a && a == a.window
        }

        function h(a, b) {
            var c, d, e;
            for (b = b || w, e = b.createElement("div"), c = b.createDocumentFragment(), e.innerHTML = a; d = e.firstChild;) c.appendChild(d);
            return c
        }

        function i(a, b, c, d) {
            var e;
            if (f(b)) b = h(b, q(a[0]));
            else if (b.length && !b.nodeType) {
                if (b = l.makeArray(b), d)
                    for (e = b.length - 1; e >= 0; e--) i(a, b[e], c, d);
                else
                    for (e = 0; e < b.length; e++) i(a, b[e], c, d);
                return a
            }
            if (b.nodeType)
                for (e = a.length; e--;) c.call(a[e], b);
            return a
        }

        function j(a, b) {
            return a && b && (" " + a.className + " ").indexOf(" " + b + " ") !== -1
        }

        function k(a, b, c) {
            var d, e;
            return b = l(b)[0], a.each(function() {
                var a = this;
                c && d == a.parentNode ? e.appendChild(a) : (d = a.parentNode, e = b.cloneNode(!1), a.parentNode.insertBefore(e, a), e.appendChild(a))
            }), a
        }

        function l(a, b) {
            return new l.fn.init(a, b)
        }

        function m(a, b) {
            var c;
            if (b.indexOf) return b.indexOf(a);
            for (c = b.length; c--;)
                if (b[c] === a) return c;
            return -1
        }

        function n(a) {
            return null === a || a === v ? "" : ("" + a).replace(I, "")
        }

        function o(a, b) {
            var c, d, e, f, g;
            if (a)
                if (c = a.length, c === f) {
                    for (d in a)
                        if (a.hasOwnProperty(d) && (g = a[d], b.call(g, d, g) === !1)) break
                } else
                    for (e = 0; e < c && (g = a[e], b.call(g, e, g) !== !1); e++);
            return a
        }

        function p(a, b) {
            var c = [];
            return o(a, function(a, d) {
                b(d, a) && c.push(d)
            }), c
        }

        function q(a) {
            return a ? 9 == a.nodeType ? a : a.ownerDocument : w
        }

        function r(a, b, c) {
            var d = [],
                e = a[b];
            for ("string" != typeof c && c instanceof l && (c = c[0]); e && 9 !== e.nodeType;) {
                if (void 0 !== c) {
                    if (e === c) break;
                    if ("string" == typeof c && l(e).is(c)) break
                }
                1 === e.nodeType && d.push(e), e = e[b]
            }
            return d
        }

        function s(a, b, c, d) {
            var e = [];
            for (d instanceof l && (d = d[0]); a; a = a[b])
                if (!c || a.nodeType === c) {
                    if (void 0 !== d) {
                        if (a === d) break;
                        if ("string" == typeof d && l(a).is(d)) break
                    }
                    e.push(a)
                }
            return e
        }

        function t(a, b, c) {
            for (a = a[b]; a; a = a[b])
                if (a.nodeType == c) return a;
            return null
        }

        function u(a, b, c) {
            o(c, function(c, d) {
                a[c] = a[c] || {}, a[c][b] = d
            })
        }
        var v, w = document,
            x = Array.prototype.push,
            y = Array.prototype.slice,
            z = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            A = a.Event,
            B = c.makeMap("children,contents,next,prev"),
            C = c.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom", " "),
            D = c.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected", " "),
            E = {
                "for": "htmlFor",
                "class": "className",
                readonly: "readOnly"
            },
            F = {
                "float": "cssFloat"
            },
            G = {},
            H = {},
            I = /^\s*|\s*$/g;
        return l.fn = l.prototype = {
            constructor: l,
            selector: "",
            context: null,
            length: 0,
            init: function(a, b) {
                var c, d, e = this;
                if (!a) return e;
                if (a.nodeType) return e.context = e[0] = a, e.length = 1, e;
                if (b && b.nodeType) e.context = b;
                else {
                    if (b) return l(a).attr(b);
                    e.context = b = document
                }
                if (f(a)) {
                    if (e.selector = a, c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c) return l(b).find(a);
                    if (c[1])
                        for (d = h(a, q(b)).firstChild; d;) x.call(e, d), d = d.nextSibling;
                    else {
                        if (d = q(b).getElementById(c[2]), !d) return e;
                        if (d.id !== c[2]) return e.find(a);
                        e.length = 1, e[0] = d
                    }
                } else this.add(a, !1);
                return e
            },
            toArray: function() {
                return c.toArray(this)
            },
            add: function(a, b) {
                var c, d, e = this;
                if (f(a)) return e.add(l(a));
                if (b !== !1)
                    for (c = l.unique(e.toArray().concat(l.makeArray(a))), e.length = c.length, d = 0; d < c.length; d++) e[d] = c[d];
                else x.apply(e, l.makeArray(a));
                return e
            },
            attr: function(a, b) {
                var c, d = this;
                if ("object" == typeof a) o(a, function(a, b) {
                    d.attr(a, b)
                });
                else {
                    if (!e(b)) {
                        if (d[0] && 1 === d[0].nodeType) {
                            if (c = G[a], c && c.get) return c.get(d[0], a);
                            if (D[a]) return d.prop(a) ? a : v;
                            b = d[0].getAttribute(a, 2), null === b && (b = v)
                        }
                        return b
                    }
                    this.each(function() {
                        var c;
                        if (1 === this.nodeType) {
                            if (c = G[a], c && c.set) return void c.set(this, b);
                            null === b ? this.removeAttribute(a, 2) : this.setAttribute(a, b, 2)
                        }
                    })
                }
                return d
            },
            removeAttr: function(a) {
                return this.attr(a, null)
            },
            prop: function(a, b) {
                var c = this;
                if (a = E[a] || a, "object" == typeof a) o(a, function(a, b) {
                    c.prop(a, b)
                });
                else {
                    if (!e(b)) return c[0] && c[0].nodeType && a in c[0] ? c[0][a] : b;
                    this.each(function() {
                        1 == this.nodeType && (this[a] = b)
                    })
                }
                return c
            },
            css: function(a, b) {
                function c(a) {
                    return a.replace(/-(\D)/g, function(a, b) {
                        return b.toUpperCase()
                    })
                }

                function d(a) {
                    return a.replace(/[A-Z]/g, function(a) {
                        return "-" + a
                    })
                }
                var f, g, h = this;
                if ("object" == typeof a) o(a, function(a, b) {
                    h.css(a, b)
                });
                else if (e(b)) a = c(a), "number" != typeof b || C[a] || (b += "px"), h.each(function() {
                    var c = this.style;
                    if (g = H[a], g && g.set) return void g.set(this, b);
                    try {
                        this.style[F[a] || a] = b
                    } catch (a) {}
                    null !== b && "" !== b || (c.removeProperty ? c.removeProperty(d(a)) : c.removeAttribute(a))
                });
                else {
                    if (f = h[0], g = H[a], g && g.get) return g.get(f);
                    if (f.ownerDocument.defaultView) try {
                        return f.ownerDocument.defaultView.getComputedStyle(f, null).getPropertyValue(d(a))
                    } catch (a) {
                        return v
                    } else if (f.currentStyle) return f.currentStyle[c(a)]
                }
                return h
            },
            remove: function() {
                for (var a, b = this, c = this.length; c--;) a = b[c], A.clean(a), a.parentNode && a.parentNode.removeChild(a);
                return this
            },
            empty: function() {
                for (var a, b = this, c = this.length; c--;)
                    for (a = b[c]; a.firstChild;) a.removeChild(a.firstChild);
                return this
            },
            html: function(a) {
                var b, c = this;
                if (e(a)) {
                    b = c.length;
                    try {
                        for (; b--;) c[b].innerHTML = a
                    } catch (d) {
                        l(c[b]).empty().append(a)
                    }
                    return c
                }
                return c[0] ? c[0].innerHTML : ""
            },
            text: function(a) {
                var b, c = this;
                if (e(a)) {
                    for (b = c.length; b--;) "innerText" in c[b] ? c[b].innerText = a : c[0].textContent = a;
                    return c
                }
                return c[0] ? c[0].innerText || c[0].textContent : ""
            },
            append: function() {
                return i(this, arguments, function(a) {
                    (1 === this.nodeType || this.host && 1 === this.host.nodeType) && this.appendChild(a)
                })
            },
            prepend: function() {
                return i(this, arguments, function(a) {
                    (1 === this.nodeType || this.host && 1 === this.host.nodeType) && this.insertBefore(a, this.firstChild)
                }, !0)
            },
            before: function() {
                var a = this;
                return a[0] && a[0].parentNode ? i(a, arguments, function(a) {
                    this.parentNode.insertBefore(a, this)
                }) : a
            },
            after: function() {
                var a = this;
                return a[0] && a[0].parentNode ? i(a, arguments, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                }, !0) : a
            },
            appendTo: function(a) {
                return l(a).append(this), this
            },
            prependTo: function(a) {
                return l(a).prepend(this), this
            },
            replaceWith: function(a) {
                return this.before(a).remove()
            },
            wrap: function(a) {
                return k(this, a)
            },
            wrapAll: function(a) {
                return k(this, a, !0)
            },
            wrapInner: function(a) {
                return this.each(function() {
                    l(this).contents().wrapAll(a)
                }), this
            },
            unwrap: function() {
                return this.parent().each(function() {
                    l(this).replaceWith(this.childNodes)
                })
            },
            clone: function() {
                var a = [];
                return this.each(function() {
                    a.push(this.cloneNode(!0))
                }), l(a)
            },
            addClass: function(a) {
                return this.toggleClass(a, !0)
            },
            removeClass: function(a) {
                return this.toggleClass(a, !1)
            },
            toggleClass: function(a, b) {
                var c = this;
                return "string" != typeof a ? c : (a.indexOf(" ") !== -1 ? o(a.split(" "), function() {
                    c.toggleClass(this, b)
                }) : c.each(function(c, d) {
                    var e, f;
                    f = j(d, a), f !== b && (e = d.className, f ? d.className = n((" " + e + " ").replace(" " + a + " ", " ")) : d.className += e ? " " + a : a)
                }), c)
            },
            hasClass: function(a) {
                return j(this[0], a)
            },
            each: function(a) {
                return o(this, a)
            },
            on: function(a, b) {
                return this.each(function() {
                    A.bind(this, a, b)
                })
            },
            off: function(a, b) {
                return this.each(function() {
                    A.unbind(this, a, b)
                })
            },
            trigger: function(a) {
                return this.each(function() {
                    "object" == typeof a ? A.fire(this, a.type, a) : A.fire(this, a)
                })
            },
            show: function() {
                return this.css("display", "")
            },
            hide: function() {
                return this.css("display", "none")
            },
            slice: function() {
                return new l(y.apply(this, arguments))
            },
            eq: function(a) {
                return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            find: function(a) {
                var b, c, d = [];
                for (b = 0, c = this.length; b < c; b++) l.find(a, this[b], d);
                return l(d)
            },
            filter: function(a) {
                return l("function" == typeof a ? p(this.toArray(), function(b, c) {
                    return a(c, b)
                }) : l.filter(a, this.toArray()))
            },
            closest: function(a) {
                var b = [];
                return a instanceof l && (a = a[0]), this.each(function(c, d) {
                    for (; d;) {
                        if ("string" == typeof a && l(d).is(a)) {
                            b.push(d);
                            break
                        }
                        if (d == a) {
                            b.push(d);
                            break
                        }
                        d = d.parentNode
                    }
                }), l(b)
            },
            offset: function(a) {
                var b, c, d, e, f = 0,
                    g = 0;
                return a ? this.css(a) : (b = this[0], b && (c = b.ownerDocument, d = c.documentElement, b.getBoundingClientRect && (e = b.getBoundingClientRect(), f = e.left + (d.scrollLeft || c.body.scrollLeft) - d.clientLeft, g = e.top + (d.scrollTop || c.body.scrollTop) - d.clientTop)), {
                    left: f,
                    top: g
                })
            },
            push: x,
            sort: [].sort,
            splice: [].splice
        }, c.extend(l, {
            extend: c.extend,
            makeArray: function(a) {
                return g(a) || a.nodeType ? [a] : c.toArray(a)
            },
            inArray: m,
            isArray: c.isArray,
            each: o,
            trim: n,
            grep: p,
            find: b,
            expr: b.selectors,
            unique: b.uniqueSort,
            text: b.getText,
            contains: b.contains,
            filter: function(a, b, c) {
                var d = b.length;
                for (c && (a = ":not(" + a + ")"); d--;) 1 != b[d].nodeType && b.splice(d, 1);
                return b = 1 === b.length ? l.find.matchesSelector(b[0], a) ? [b[0]] : [] : l.find.matches(a, b)
            }
        }), o({
            parent: function(a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            },
            parents: function(a) {
                return r(a, "parentNode")
            },
            next: function(a) {
                return t(a, "nextSibling", 1)
            },
            prev: function(a) {
                return t(a, "previousSibling", 1)
            },
            children: function(a) {
                return s(a.firstChild, "nextSibling", 1)
            },
            contents: function(a) {
                return c.toArray(("iframe" === a.nodeName ? a.contentDocument || a.contentWindow.document : a).childNodes)
            }
        }, function(a, b) {
            l.fn[a] = function(c) {
                var d = this,
                    e = [];
                return d.each(function() {
                    var a = b.call(e, this, c, e);
                    a && (l.isArray(a) ? e.push.apply(e, a) : e.push(a))
                }), this.length > 1 && (B[a] || (e = l.unique(e)), 0 === a.indexOf("parents") && (e = e.reverse())), e = l(e), c ? e.filter(c) : e
            }
        }), o({
            parentsUntil: function(a, b) {
                return r(a, "parentNode", b)
            },
            nextUntil: function(a, b) {
                return s(a, "nextSibling", 1, b).slice(1)
            },
            prevUntil: function(a, b) {
                return s(a, "previousSibling", 1, b).slice(1)
            }
        }, function(a, b) {
            l.fn[a] = function(c, d) {
                var e = this,
                    f = [];
                return e.each(function() {
                    var a = b.call(f, this, c, f);
                    a && (l.isArray(a) ? f.push.apply(f, a) : f.push(a))
                }), this.length > 1 && (f = l.unique(f), 0 !== a.indexOf("parents") && "prevUntil" !== a || (f = f.reverse())), f = l(f), d ? f.filter(d) : f
            }
        }), l.fn.is = function(a) {
            return !!a && this.filter(a).length > 0
        }, l.fn.init.prototype = l.fn, l.overrideDefaults = function(a) {
            function b(d, e) {
                return c = c || a(), 0 === arguments.length && (d = c.element), e || (e = c.context), new b.fn.init(d, e)
            }
            var c;
            return l.extend(b, this), b
        }, d.ie && d.ie < 8 && (u(G, "get", {
            maxlength: function(a) {
                var b = a.maxLength;
                return 2147483647 === b ? v : b
            },
            size: function(a) {
                var b = a.size;
                return 20 === b ? v : b
            },
            "class": function(a) {
                return a.className
            },
            style: function(a) {
                var b = a.style.cssText;
                return 0 === b.length ? v : b
            }
        }), u(G, "set", {
            "class": function(a, b) {
                a.className = b
            },
            style: function(a, b) {
                a.style.cssText = b
            }
        })), d.ie && d.ie < 9 && (F["float"] = "styleFloat", u(H, "set", {
            opacity: function(a, b) {
                var c = a.style;
                null === b || "" === b ? c.removeAttribute("filter") : (c.zoom = 1, c.filter = "alpha(opacity=" + 100 * b + ")")
            }
        })), l.attrHooks = G, l.cssHooks = H, l
    }), g("b", [], function() {
        return function(a, b) {
            function c(a, b, c, d) {
                function e(a) {
                    return a = parseInt(a, 10).toString(16), a.length > 1 ? a : "0" + a
                }
                return "#" + e(b) + e(c) + e(d)
            }
            var d, e, f, g, h = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,
                i = /(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,
                j = /\s*([^:]+):\s*([^;]+);?/g,
                k = /\s+$/,
                l = {},
                m = "\ufeff";
            for (a = a || {}, b && (f = b.getValidStyles(), g = b.getInvalidStyles()), e = ("\\\" \\' \\; \\: ; : " + m).split(" "), d = 0; d < e.length; d++) l[e[d]] = m + d, l[m + d] = e[d];
            return {
                toHex: function(a) {
                    return a.replace(h, c)
                },
                parse: function(b) {
                    function e(a, b, c) {
                        var e, f, g, h;
                        if (e = w[a + "-top" + b], e && (f = w[a + "-right" + b], f && (g = w[a + "-bottom" + b], g && (h = w[a + "-left" + b])))) {
                            var i = [e, f, g, h];
                            for (d = i.length - 1; d-- && i[d] === i[d + 1];);
                            d > -1 && c || (w[a + b] = d == -1 ? i[0] : i.join(" "), delete w[a + "-top" + b], delete w[a + "-right" + b], delete w[a + "-bottom" + b], delete w[a + "-left" + b])
                        }
                    }

                    function f(a) {
                        var b, c = w[a];
                        if (c) {
                            for (c = c.split(" "), b = c.length; b--;)
                                if (c[b] !== c[0]) return !1;
                            return w[a] = c[0], !0
                        }
                    }

                    function g(a, b, c, d) {
                        f(b) && f(c) && f(d) && (w[a] = w[b] + " " + w[c] + " " + w[d], delete w[b], delete w[c], delete w[d])
                    }

                    function n(a) {
                        return v = !0, l[a]
                    }

                    function o(a, b) {
                        return v && (a = a.replace(/\uFEFF[0-9]/g, function(a) {
                            return l[a]
                        })), b || (a = a.replace(/\\([\'\";:])/g, "$1")), a
                    }

                    function p(a) {
                        return String.fromCharCode(parseInt(a.slice(1), 16))
                    }

                    function q(a) {
                        return a.replace(/\\[0-9a-f]+/gi, p)
                    }

                    function r(b, c, d, e, f, g) {
                        if (f = f || g) return f = o(f), "'" + f.replace(/\'/g, "\\'") + "'";
                        if (c = o(c || d || e), !a.allow_script_urls) {
                            var h = c.replace(/[\s\r\n]+/g, "");
                            if (/(java|vb)script:/i.test(h)) return "";
                            if (!a.allow_svg_data_urls && /^data:image\/svg/i.test(h)) return ""
                        }
                        return x && (c = x.call(y, c, "style")), "url('" + c.replace(/\'/g, "\\'") + "')"
                    }
                    var s, t, u, v, w = {},
                        x = a.url_converter,
                        y = a.url_converter_scope || this;
                    if (b) {
                        for (b = b.replace(/[\u0000-\u001F]/g, ""), b = b.replace(/\\[\"\';:\uFEFF]/g, n).replace(/\"[^\"]+\"|\'[^\']+\'/g, function(a) {
                                return a.replace(/[;:]/g, n)
                            }); s = j.exec(b);)
                            if (j.lastIndex = s.index + s[0].length, t = s[1].replace(k, "").toLowerCase(), u = s[2].replace(k, ""), t && u) {
                                if (t = q(t), u = q(u), t.indexOf(m) !== -1 || t.indexOf('"') !== -1) continue;
                                if (!a.allow_script_urls && ("behavior" == t || /expression\s*\(|\/\*|\*\//.test(u))) continue;
                                "font-weight" === t && "700" === u ? u = "bold" : "color" !== t && "background-color" !== t || (u = u.toLowerCase()), u = u.replace(h, c), u = u.replace(i, r), w[t] = v ? o(u, !0) : u
                            }
                        e("border", "", !0), e("border", "-width"), e("border", "-color"), e("border", "-style"), e("padding", ""), e("margin", ""), g("border", "border-width", "border-style", "border-color"), "medium none" === w.border && delete w.border, "none" === w["border-image"] && delete w["border-image"]
                    }
                    return w
                },
                serialize: function(a, b) {
                    function c(b) {
                        var c, d, e, g;
                        if (c = f[b])
                            for (d = 0, e = c.length; d < e; d++) b = c[d], g = a[b], g && (i += (i.length > 0 ? " " : "") + b + ": " + g + ";")
                    }

                    function d(a, b) {
                        var c;
                        return c = g["*"], (!c || !c[a]) && (c = g[b], !c || !c[a])
                    }
                    var e, h, i = "";
                    if (b && f) c("*"), c(b);
                    else
                        for (e in a) h = a[e], !h || g && !d(e, b) || (i += (i.length > 0 ? " " : "") + e + ": " + h + ";");
                    return i
                }
            }
        }
    }), g("c", [], function() {
        return function(a, b) {
            function c(a, c, d, e) {
                var f, g;
                if (a) {
                    if (!e && a[c]) return a[c];
                    if (a != b) {
                        if (f = a[d]) return f;
                        for (g = a.parentNode; g && g != b; g = g.parentNode)
                            if (f = g[d]) return f
                    }
                }
            }

            function d(a, c, d, e) {
                var f, g, h;
                if (a) {
                    if (f = a[d], b && f === b) return;
                    if (f) {
                        if (!e)
                            for (h = f[c]; h; h = h[c])
                                if (!h[c]) return h;
                        return f
                    }
                    if (g = a.parentNode, g && g !== b) return g
                }
            }
            var e = a;
            this.current = function() {
                return e
            }, this.next = function(a) {
                return e = c(e, "firstChild", "nextSibling", a)
            }, this.prev = function(a) {
                return e = c(e, "lastChild", "previousSibling", a)
            }, this.prev2 = function(a) {
                return e = d(e, "lastChild", "previousSibling", a)
            }
        }
    }), g("d", ["9"], function(a) {
        function b(a) {
            var b;
            return b = document.createElement("div"), b.innerHTML = a, b.textContent || b.innerText || a
        }

        function c(a, b) {
            var c, d, f, g = {};
            if (a) {
                for (a = a.split(","), b = b || 10, c = 0; c < a.length; c += 2) d = String.fromCharCode(parseInt(a[c], b)), e[d] || (f = "&" + a[c + 1] + ";", g[d] = f, g[f] = d);
                return g
            }
        }
        var d, e, f, g = a.makeMap,
            h = /[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            i = /[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            j = /[<>&\"\']/g,
            k = /&#([a-z0-9]+);?|&([a-z0-9]+);/gi,
            l = {
                128: "\u20ac",
                130: "\u201a",
                131: "\u0192",
                132: "\u201e",
                133: "\u2026",
                134: "\u2020",
                135: "\u2021",
                136: "\u02c6",
                137: "\u2030",
                138: "\u0160",
                139: "\u2039",
                140: "\u0152",
                142: "\u017d",
                145: "\u2018",
                146: "\u2019",
                147: "\u201c",
                148: "\u201d",
                149: "\u2022",
                150: "\u2013",
                151: "\u2014",
                152: "\u02dc",
                153: "\u2122",
                154: "\u0161",
                155: "\u203a",
                156: "\u0153",
                158: "\u017e",
                159: "\u0178"
            };
        e = {
            '"': "&quot;",
            "'": "&#39;",
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            "`": "&#96;"
        }, f = {
            "&lt;": "<",
            "&gt;": ">",
            "&amp;": "&",
            "&quot;": '"',
            "&apos;": "'"
        }, d = c("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro", 32);
        var m = {
            encodeRaw: function(a, b) {
                return a.replace(b ? h : i, function(a) {
                    return e[a] || a
                })
            },
            encodeAllRaw: function(a) {
                return ("" + a).replace(j, function(a) {
                    return e[a] || a
                })
            },
            encodeNumeric: function(a, b) {
                return a.replace(b ? h : i, function(a) {
                    return a.length > 1 ? "&#" + (1024 * (a.charCodeAt(0) - 55296) + (a.charCodeAt(1) - 56320) + 65536) + ";" : e[a] || "&#" + a.charCodeAt(0) + ";"
                })
            },
            encodeNamed: function(a, b, c) {
                return c = c || d, a.replace(b ? h : i, function(a) {
                    return e[a] || c[a] || a
                })
            },
            getEncodeFunc: function(a, b) {
                function f(a, c) {
                    return a.replace(c ? h : i, function(a) {
                        return void 0 !== e[a] ? e[a] : void 0 !== b[a] ? b[a] : a.length > 1 ? "&#" + (1024 * (a.charCodeAt(0) - 55296) + (a.charCodeAt(1) - 56320) + 65536) + ";" : "&#" + a.charCodeAt(0) + ";"
                    })
                }

                function j(a, c) {
                    return m.encodeNamed(a, c, b)
                }
                return b = c(b) || d, a = g(a.replace(/\+/g, ",")), a.named && a.numeric ? f : a.named ? b ? j : m.encodeNamed : a.numeric ? m.encodeNumeric : m.encodeRaw
            },
            decode: function(a) {
                return a.replace(k, function(a, c) {
                    return c ? (c = "x" === c.charAt(0).toLowerCase() ? parseInt(c.substr(1), 16) : parseInt(c, 10), c > 65535 ? (c -= 65536, String.fromCharCode(55296 + (c >> 10), 56320 + (1023 & c))) : l[c] || String.fromCharCode(c)) : f[a] || d[a] || b(a)
                })
            }
        };
        return m
    }), g("1h", ["9"], function(a) {
        function b(c) {
            function d() {
                return J.createDocumentFragment()
            }

            function e(a, b) {
                x(N, a, b)
            }

            function f(a, b) {
                x(O, a, b)
            }

            function g(a) {
                e(a.parentNode, U(a))
            }

            function h(a) {
                e(a.parentNode, U(a) + 1)
            }

            function i(a) {
                f(a.parentNode, U(a))
            }

            function j(a) {
                f(a.parentNode, U(a) + 1)
            }

            function k(a) {
                a ? (I[R] = I[Q], I[S] = I[P]) : (I[Q] = I[R], I[P] = I[S]), I.collapsed = N
            }

            function l(a) {
                g(a), j(a)
            }

            function m(a) {
                e(a, 0), f(a, 1 === a.nodeType ? a.childNodes.length : a.nodeValue.length)
            }

            function n(a, b) {
                var c = I[Q],
                    d = I[P],
                    e = I[R],
                    f = I[S],
                    g = b.startContainer,
                    h = b.startOffset,
                    i = b.endContainer,
                    j = b.endOffset;
                return 0 === a ? w(c, d, g, h) : 1 === a ? w(e, f, g, h) : 2 === a ? w(e, f, i, j) : 3 === a ? w(c, d, i, j) : void 0
            }

            function o() {
                y(M)
            }

            function p() {
                return y(K)
            }

            function q() {
                return y(L)
            }

            function r(a) {
                var b, d, e = this[Q],
                    f = this[P];
                3 !== e.nodeType && 4 !== e.nodeType || !e.nodeValue ? (e.childNodes.length > 0 && (d = e.childNodes[f]), d ? e.insertBefore(a, d) : 3 == e.nodeType ? c.insertAfter(a, e) : e.appendChild(a)) : f ? f >= e.nodeValue.length ? c.insertAfter(a, e) : (b = e.splitText(f), e.parentNode.insertBefore(a, b)) : e.parentNode.insertBefore(a, e)
            }

            function s(a) {
                var b = I.extractContents();
                I.insertNode(a), a.appendChild(b), I.selectNode(a)
            }

            function t() {
                return T(new b(c), {
                    startContainer: I[Q],
                    startOffset: I[P],
                    endContainer: I[R],
                    endOffset: I[S],
                    collapsed: I.collapsed,
                    commonAncestorContainer: I.commonAncestorContainer
                })
            }

            function u(a, b) {
                var c;
                if (3 == a.nodeType) return a;
                if (b < 0) return a;
                for (c = a.firstChild; c && b > 0;) --b, c = c.nextSibling;
                return c ? c : a
            }

            function v() {
                return I[Q] == I[R] && I[P] == I[S]
            }

            function w(a, b, d, e) {
                var f, g, h, i, j, k;
                if (a == d) return b == e ? 0 : b < e ? -1 : 1;
                for (f = d; f && f.parentNode != a;) f = f.parentNode;
                if (f) {
                    for (g = 0, h = a.firstChild; h != f && g < b;) g++, h = h.nextSibling;
                    return b <= g ? -1 : 1
                }
                for (f = a; f && f.parentNode != d;) f = f.parentNode;
                if (f) {
                    for (g = 0, h = d.firstChild; h != f && g < e;) g++, h = h.nextSibling;
                    return g < e ? -1 : 1
                }
                for (i = c.findCommonAncestor(a, d), j = a; j && j.parentNode != i;) j = j.parentNode;
                for (j || (j = i), k = d; k && k.parentNode != i;) k = k.parentNode;
                if (k || (k = i), j == k) return 0;
                for (h = i.firstChild; h;) {
                    if (h == j) return -1;
                    if (h == k) return 1;
                    h = h.nextSibling
                }
            }

            function x(a, b, d) {
                var e, f;
                for (a ? (I[Q] = b, I[P] = d) : (I[R] = b, I[S] = d), e = I[R]; e.parentNode;) e = e.parentNode;
                for (f = I[Q]; f.parentNode;) f = f.parentNode;
                f == e ? w(I[Q], I[P], I[R], I[S]) > 0 && I.collapse(a) : I.collapse(a), I.collapsed = v(), I.commonAncestorContainer = c.findCommonAncestor(I[Q], I[R])
            }

            function y(a) {
                var b, c, d, e, f, g, h, i = 0,
                    j = 0;
                if (I[Q] == I[R]) return z(a);
                for (b = I[R], c = b.parentNode; c; b = c, c = c.parentNode) {
                    if (c == I[Q]) return A(b, a);
                    ++i
                }
                for (b = I[Q], c = b.parentNode; c; b = c, c = c.parentNode) {
                    if (c == I[R]) return B(b, a);
                    ++j
                }
                for (d = j - i, e = I[Q]; d > 0;) e = e.parentNode, d--;
                for (f = I[R]; d < 0;) f = f.parentNode, d++;
                for (g = e.parentNode, h = f.parentNode; g != h; g = g.parentNode, h = h.parentNode) e = g, f = h;
                return C(e, f, a)
            }

            function z(a) {
                var b, c, e, f, g, h, i, j, k;
                if (a != M && (b = d()), I[P] == I[S]) return b;
                if (3 == I[Q].nodeType) {
                    if (c = I[Q].nodeValue, e = c.substring(I[P], I[S]), a != L && (f = I[Q], j = I[P], k = I[S] - I[P], 0 === j && k >= f.nodeValue.length - 1 ? f.parentNode.removeChild(f) : f.deleteData(j, k), I.collapse(N)), a == M) return;
                    return e.length > 0 && b.appendChild(J.createTextNode(e)), b
                }
                for (f = u(I[Q], I[P]), g = I[S] - I[P]; f && g > 0;) h = f.nextSibling, i = G(f, a), b && b.appendChild(i), --g, f = h;
                return a != L && I.collapse(N), b
            }

            function A(a, b) {
                var c, e, f, g, h, i;
                if (b != M && (c = d()), e = D(a, b), c && c.appendChild(e), f = U(a), g = f - I[P], g <= 0) return b != L && (I.setEndBefore(a), I.collapse(O)), c;
                for (e = a.previousSibling; g > 0;) h = e.previousSibling, i = G(e, b), c && c.insertBefore(i, c.firstChild), --g, e = h;
                return b != L && (I.setEndBefore(a), I.collapse(O)), c
            }

            function B(a, b) {
                var c, e, f, g, h, i;
                for (b != M && (c = d()), f = E(a, b), c && c.appendChild(f), e = U(a), ++e, g = I[S] - e, f = a.nextSibling; f && g > 0;) h = f.nextSibling, i = G(f, b), c && c.appendChild(i), --g, f = h;
                return b != L && (I.setStartAfter(a), I.collapse(N)), c
            }

            function C(a, b, c) {
                var e, f, g, h, i, j, k;
                for (c != M && (f = d()), e = E(a, c), f && f.appendChild(e), g = U(a), h = U(b), ++g, i = h - g, j = a.nextSibling; i > 0;) k = j.nextSibling, e = G(j, c), f && f.appendChild(e), j = k, --i;
                return e = D(b, c), f && f.appendChild(e), c != L && (I.setStartAfter(a), I.collapse(N)), f
            }

            function D(a, b) {
                var c, d, e, f, g, h = u(I[R], I[S] - 1),
                    i = h != I[R];
                if (h == a) return F(h, i, O, b);
                for (c = h.parentNode, d = F(c, O, O, b); c;) {
                    for (; h;) e = h.previousSibling, f = F(h, i, O, b), b != M && d.insertBefore(f, d.firstChild), i = N, h = e;
                    if (c == a) return d;
                    h = c.previousSibling, c = c.parentNode, g = F(c, O, O, b), b != M && g.appendChild(d), d = g
                }
            }

            function E(a, b) {
                var c, d, e, f, g, h = u(I[Q], I[P]),
                    i = h != I[Q];
                if (h == a) return F(h, i, N, b);
                for (c = h.parentNode, d = F(c, O, N, b); c;) {
                    for (; h;) e = h.nextSibling, f = F(h, i, N, b), b != M && d.appendChild(f), i = N, h = e;
                    if (c == a) return d;
                    h = c.nextSibling, c = c.parentNode, g = F(c, O, N, b), b != M && g.appendChild(d), d = g
                }
            }

            function F(a, b, d, e) {
                var f, g, h, i, j;
                if (b) return G(a, e);
                if (3 == a.nodeType) {
                    if (f = a.nodeValue, d ? (i = I[P], g = f.substring(i), h = f.substring(0, i)) : (i = I[S], g = f.substring(0, i), h = f.substring(i)), e != L && (a.nodeValue = h), e == M) return;
                    return j = c.clone(a, O), j.nodeValue = g, j
                }
                if (e != M) return c.clone(a, O)
            }

            function G(a, b) {
                return b != M ? b == L ? c.clone(a, N) : a : void a.parentNode.removeChild(a)
            }

            function H() {
                return c.create("body", null, q()).outerText
            }
            var I = this,
                J = c.doc,
                K = 0,
                L = 1,
                M = 2,
                N = !0,
                O = !1,
                P = "startOffset",
                Q = "startContainer",
                R = "endContainer",
                S = "endOffset",
                T = a.extend,
                U = c.nodeIndex;
            return T(I, {
                startContainer: J,
                startOffset: 0,
                endContainer: J,
                endOffset: 0,
                collapsed: N,
                commonAncestorContainer: J,
                START_TO_START: 0,
                START_TO_END: 1,
                END_TO_END: 2,
                END_TO_START: 3,
                setStart: e,
                setEnd: f,
                setStartBefore: g,
                setStartAfter: h,
                setEndBefore: i,
                setEndAfter: j,
                collapse: k,
                selectNode: l,
                selectNodeContents: m,
                compareBoundaryPoints: n,
                deleteContents: o,
                extractContents: p,
                cloneContents: q,
                insertNode: r,
                surroundContents: s,
                cloneRange: t,
                toStringIE: H
            }), I
        }
        return b.prototype.toString = function() {
            return this.toStringIE()
        }, b
    }), h("3y", Array), h("3z", Error), g("1m", ["3y", "3z"], function(a, b) {
        var c = function() {},
            d = function(a, b) {
                return function() {
                    return a(b.apply(null, arguments))
                }
            },
            e = function(a) {
                return function() {
                    return a
                }
            },
            f = function(a) {
                return a
            },
            g = function(a, b) {
                return a === b
            },
            h = function(b) {
                for (var c = new a(arguments.length - 1), d = 1; d < arguments.length; d++) c[d - 1] = arguments[d];
                return function() {
                    for (var d = new a(arguments.length), e = 0; e < d.length; e++) d[e] = arguments[e];
                    var f = c.concat(d);
                    return b.apply(null, f)
                }
            },
            i = function(a) {
                return function() {
                    return !a.apply(null, arguments)
                }
            },
            j = function(a) {
                return function() {
                    throw new b(a)
                }
            },
            k = function(a) {
                return a()
            },
            l = function(a) {
                a()
            },
            m = e(!1),
            n = e(!0);
        return {
            noop: c,
            compose: d,
            constant: e,
            identity: f,
            tripleEquals: g,
            curry: h,
            not: i,
            die: j,
            apply: k,
            call: l,
            never: m,
            always: n
        }
    }), h("5s", Object), g("4z", ["1m", "5s"], function(a, b) {
        var c = a.never,
            d = a.always,
            e = function() {
                return f
            },
            f = function() {
                var f = function(a) {
                        return a.isNone()
                    },
                    g = function(a) {
                        return a()
                    },
                    h = function(a) {
                        return a
                    },
                    i = function() {},
                    j = {
                        fold: function(a, b) {
                            return a()
                        },
                        is: c,
                        isSome: c,
                        isNone: d,
                        getOr: h,
                        getOrThunk: g,
                        getOrDie: function(a) {
                            throw new Error(a || "error: getOrDie called on none.")
                        },
                        or: h,
                        orThunk: g,
                        map: e,
                        ap: e,
                        each: i,
                        bind: e,
                        flatten: e,
                        exists: c,
                        forall: d,
                        filter: e,
                        equals: f,
                        equals_: f,
                        toArray: function() {
                            return []
                        },
                        toString: a.constant("none()")
                    };
                return b.freeze && b.freeze(j), j
            }(),
            g = function(a) {
                var b = function() {
                        return a
                    },
                    h = function() {
                        return k
                    },
                    i = function(b) {
                        return g(b(a))
                    },
                    j = function(b) {
                        return b(a)
                    },
                    k = {
                        fold: function(b, c) {
                            return c(a)
                        },
                        is: function(b) {
                            return a === b
                        },
                        isSome: d,
                        isNone: c,
                        getOr: b,
                        getOrThunk: b,
                        getOrDie: b,
                        or: h,
                        orThunk: h,
                        map: i,
                        ap: function(b) {
                            return b.fold(e, function(b) {
                                return g(b(a))
                            })
                        },
                        each: function(b) {
                            b(a)
                        },
                        bind: j,
                        flatten: b,
                        exists: j,
                        forall: j,
                        filter: function(b) {
                            return b(a) ? k : f
                        },
                        equals: function(b) {
                            return b.is(a)
                        },
                        equals_: function(b, d) {
                            return b.fold(c, function(b) {
                                return d(a, b)
                            })
                        },
                        toArray: function() {
                            return [a]
                        },
                        toString: function() {
                            return "some(" + a + ")"
                        }
                    };
                return k
            },
            h = function(a) {
                return null === a || void 0 === a ? f : g(a)
            };
        return {
            some: g,
            none: e,
            from: h
        }
    }), h("50", String), g("3x", ["4z", "3y", "3z", "50"], function(a, b, c, d) {
        var e = function() {
                var a = b.prototype.indexOf,
                    c = function(b, c) {
                        return a.call(b, c)
                    },
                    d = function(a, b) {
                        return u(a, b)
                    };
                return void 0 === a ? d : c
            }(),
            f = function(b, c) {
                var d = e(b, c);
                return d === -1 ? a.none() : a.some(d)
            },
            g = function(a, b) {
                return e(a, b) > -1
            },
            h = function(a, b) {
                return t(a, b).isSome()
            },
            i = function(a, b) {
                for (var c = [], d = 0; d < a; d++) c.push(b(d));
                return c
            },
            j = function(a, b) {
                for (var c = [], d = 0; d < a.length; d += b) {
                    var e = a.slice(d, d + b);
                    c.push(e)
                }
                return c
            },
            k = function(a, c) {
                for (var d = a.length, e = new b(d), f = 0; f < d; f++) {
                    var g = a[f];
                    e[f] = c(g, f, a)
                }
                return e
            },
            l = function(a, b) {
                for (var c = 0, d = a.length; c < d; c++) {
                    var e = a[c];
                    b(e, c, a)
                }
            },
            m = function(a, b) {
                for (var c = a.length - 1; c >= 0; c--) {
                    var d = a[c];
                    b(d, c, a)
                }
            },
            n = function(a, b) {
                for (var c = [], d = [], e = 0, f = a.length; e < f; e++) {
                    var g = a[e],
                        h = b(g, e, a) ? c : d;
                    h.push(g)
                }
                return {
                    pass: c,
                    fail: d
                }
            },
            o = function(a, b) {
                for (var c = [], d = 0, e = a.length; d < e; d++) {
                    var f = a[d];
                    b(f, d, a) && c.push(f)
                }
                return c
            },
            p = function(a, b) {
                if (0 === a.length) return [];
                for (var c = b(a[0]), d = [], e = [], f = 0, g = a.length; f < g; f++) {
                    var h = a[f],
                        i = b(h);
                    i !== c && (d.push(e), e = []), c = i, e.push(h)
                }
                return 0 !== e.length && d.push(e), d
            },
            q = function(a, b, c) {
                return m(a, function(a) {
                    c = b(c, a)
                }), c
            },
            r = function(a, b, c) {
                return l(a, function(a) {
                    c = b(c, a)
                }), c
            },
            s = function(b, c) {
                for (var d = 0, e = b.length; d < e; d++) {
                    var f = b[d];
                    if (c(f, d, b)) return a.some(f)
                }
                return a.none()
            },
            t = function(b, c) {
                for (var d = 0, e = b.length; d < e; d++) {
                    var f = b[d];
                    if (c(f, d, b)) return a.some(d)
                }
                return a.none()
            },
            u = function(a, b) {
                for (var c = 0, d = a.length; c < d; ++c)
                    if (a[c] === b) return c;
                return -1
            },
            v = b.prototype.push,
            w = function(a) {
                for (var d = [], e = 0, f = a.length; e < f; ++e) {
                    if (!b.prototype.isPrototypeOf(a[e])) throw new c("Arr.flatten item " + e + " was not an array, input: " + a);
                    v.apply(d, a[e])
                }
                return d
            },
            x = function(a, b) {
                var c = k(a, b);
                return w(c)
            },
            y = function(a, b) {
                for (var c = 0, d = a.length; c < d; ++c) {
                    var e = a[c];
                    if (b(e, c, a) !== !0) return !1
                }
                return !0
            },
            z = function(a, b) {
                return a.length === b.length && y(a, function(a, c) {
                    return a === b[c]
                })
            },
            A = b.prototype.slice,
            B = function(a) {
                var b = A.call(a, 0);
                return b.reverse(), b
            },
            C = function(a, b) {
                return o(a, function(a) {
                    return !g(b, a)
                })
            },
            D = function(a, b) {
                for (var c = {}, e = 0, f = a.length; e < f; e++) {
                    var g = a[e];
                    c[d(g)] = b(g, e)
                }
                return c
            },
            E = function(a) {
                return [a]
            },
            F = function(a, b) {
                var c = A.call(a, 0);
                return c.sort(b), c
            };
        return {
            map: k,
            each: l,
            eachr: m,
            partition: n,
            filter: o,
            groupBy: p,
            indexOf: f,
            foldr: q,
            foldl: r,
            find: s,
            findIndex: t,
            flatten: w,
            bind: x,
            forall: y,
            exists: h,
            contains: g,
            equal: z,
            reverse: B,
            chunk: j,
            difference: C,
            mapToObject: D,
            pure: E,
            sort: F,
            range: i
        }
    }), h("5t", setTimeout), g("51", ["3x", "4z", "5t"], function(a, b, c) {
        var d = function(e) {
                var f = b.none(),
                    g = [],
                    h = function(a) {
                        return d(function(b) {
                            i(function(c) {
                                b(a(c))
                            })
                        })
                    },
                    i = function(a) {
                        k() ? m(a) : g.push(a)
                    },
                    j = function(a) {
                        f = b.some(a), l(g), g = []
                    },
                    k = function() {
                        return f.isSome()
                    },
                    l = function(b) {
                        a.each(b, m)
                    },
                    m = function(a) {
                        f.each(function(b) {
                            c(function() {
                                a(b)
                            }, 0)
                        })
                    };
                return e(j), {
                    get: i,
                    map: h,
                    isReady: k
                }
            },
            e = function(a) {
                return d(function(b) {
                    b(a)
                })
            };
        return {
            nu: d,
            pure: e
        }
    }), g("52", ["3y", "5t"], function(a, b) {
        var c = function(c) {
            return function() {
                var d = a.prototype.slice.call(arguments),
                    e = this;
                b(function() {
                    c.apply(e, d)
                }, 0)
            }
        };
        return {
            bounce: c
        }
    }), g("40", ["51", "52"], function(a, b) {
        var c = function(d) {
                var e = function(a) {
                        d(b.bounce(a))
                    },
                    f = function(a) {
                        return c(function(b) {
                            e(function(c) {
                                var d = a(c);
                                b(d)
                            })
                        })
                    },
                    g = function(a) {
                        return c(function(b) {
                            e(function(c) {
                                a(c).get(b)
                            })
                        })
                    },
                    h = function(a) {
                        return c(function(b) {
                            e(function(c) {
                                a.get(b)
                            })
                        })
                    },
                    i = function() {
                        return a.nu(e)
                    };
                return {
                    map: f,
                    bind: g,
                    anonBind: h,
                    toLazy: i,
                    get: e
                }
            },
            d = function(a) {
                return c(function(b) {
                    b(a)
                })
            };
        return {
            nu: c,
            pure: d
        }
    }), g("53", ["3x"], function(a) {
        var b = function(b, c) {
            return c(function(c) {
                var d = [],
                    e = 0,
                    f = function(a) {
                        return function(f) {
                            d[a] = f, e++, e >= b.length && c(d)
                        }
                    };
                0 === b.length ? c([]) : a.each(b, function(a, b) {
                    a.get(f(b))
                })
            })
        };
        return {
            par: b
        }
    }), g("41", ["3x", "40", "53"], function(a, b, c) {
        var d = function(a) {
                return c.par(a, b.nu)
            },
            e = function(b, c) {
                var e = a.map(b, c);
                return d(e)
            },
            f = function(a, b) {
                return function(c) {
                    return b(c).bind(a)
                }
            };
        return {
            par: d,
            mapM: e,
            compose: f
        }
    }), g("42", ["1m", "4z"], function(a, b) {
        var c = function(d) {
                var e = function(a) {
                        return d === a
                    },
                    f = function(a) {
                        return c(d)
                    },
                    g = function(a) {
                        return c(d)
                    },
                    h = function(a) {
                        return c(a(d))
                    },
                    i = function(a) {
                        a(d)
                    },
                    j = function(a) {
                        return a(d)
                    },
                    k = function(a, b) {
                        return b(d)
                    },
                    l = function(a) {
                        return a(d)
                    },
                    m = function(a) {
                        return a(d)
                    },
                    n = function() {
                        return b.some(d)
                    };
                return {
                    is: e,
                    isValue: a.constant(!0),
                    isError: a.constant(!1),
                    getOr: a.constant(d),
                    getOrThunk: a.constant(d),
                    getOrDie: a.constant(d),
                    or: f,
                    orThunk: g,
                    fold: k,
                    map: h,
                    each: i,
                    bind: j,
                    exists: l,
                    forall: m,
                    toOption: n
                }
            },
            d = function(c) {
                var e = function(a) {
                        return a()
                    },
                    f = function() {
                        return a.die(c)()
                    },
                    g = function(a) {
                        return a
                    },
                    h = function(a) {
                        return a()
                    },
                    i = function(a) {
                        return d(c)
                    },
                    j = function(a) {
                        return d(c)
                    },
                    k = function(a, b) {
                        return a(c)
                    };
                return {
                    is: a.constant(!1),
                    isValue: a.constant(!1),
                    isError: a.constant(!0),
                    getOr: a.identity,
                    getOrThunk: e,
                    getOrDie: f,
                    or: g,
                    orThunk: h,
                    fold: k,
                    map: i,
                    each: a.noop,
                    bind: j,
                    exists: a.constant(!1),
                    forall: a.constant(!0),
                    toOption: b.none
                }
            };
        return {
            value: c,
            error: d
        }
    }), g("1i", ["3x", "1m", "40", "41", "42", "5", "9"], function(a, b, c, d, e, f, g) {
        "use strict";
        return function(h, i) {
            function j(a) {
                h.getElementsByTagName("head")[0].appendChild(a)
            }

            function k(a, b, c) {
                function d() {
                    for (var a = t.passed, b = a.length; b--;) a[b]();
                    t.status = 2, t.passed = [], t.failed = []
                }

                function e() {
                    for (var a = t.failed, b = a.length; b--;) a[b]();
                    t.status = 3, t.passed = [], t.failed = []
                }

                function i() {
                    var a = navigator.userAgent.match(/WebKit\/(\d*)/);
                    return !!(a && a[1] < 536)
                }

                function k(a, b) {
                    a() || ((new Date).getTime() - s < l ? f.setTimeout(b) : e())
                }

                function o() {
                    k(function() {
                        for (var a, b, c = h.styleSheets, e = c.length; e--;)
                            if (a = c[e], b = a.ownerNode ? a.ownerNode : a.owningElement, b && b.id === q.id) return d(), !0
                    }, o)
                }

                function p() {
                    k(function() {
                        try {
                            var a = r.sheet.cssRules;
                            return d(), !!a
                        } catch (a) {}
                    }, p)
                }
                var q, r, s, t;
                if (a = g._addCacheSuffix(a), n[a] ? t = n[a] : (t = {
                        passed: [],
                        failed: []
                    }, n[a] = t), b && t.passed.push(b), c && t.failed.push(c), 1 != t.status) {
                    if (2 == t.status) return void d();
                    if (3 == t.status) return void e();
                    if (t.status = 1, q = h.createElement("link"), q.rel = "stylesheet", q.type = "text/css", q.id = "u" + m++, q.async = !1, q.defer = !1, s = (new Date).getTime(), "onload" in q && !i()) q.onload = o, q.onerror = e;
                    else {
                        if (navigator.userAgent.indexOf("Firefox") > 0) return r = h.createElement("style"),
                            r.textContent = '@import "' + a + '"', p(), void j(r);
                        o()
                    }
                    j(q), q.href = a
                }
            }
            var l, m = 0,
                n = {};
            i = i || {}, l = i.maxLoadTime || 5e3;
            var o = function(a) {
                    return c.nu(function(c) {
                        k(a, b.compose(c, b.constant(e.value(a))), b.compose(c, b.constant(e.error(a))))
                    })
                },
                p = function(a) {
                    return a.fold(b.identity, b.identity)
                },
                q = function(b, c, e) {
                    d.par(a.map(b, o)).get(function(b) {
                        var d = a.partition(b, function(a) {
                            return a.isValue()
                        });
                        d.fail.length > 0 ? e(d.fail.map(p)) : c(d.pass.map(p))
                    })
                };
            return {
                load: k,
                loadAll: q
            }
        }
    }), g("j", ["9"], function(a) {
        function b(b, c) {
            return b = a.trim(b), b ? b.split(c || " ") : []
        }

        function c(a) {
            function c(a, c, d) {
                function e(a, b) {
                    var c, d, e = {};
                    for (c = 0, d = a.length; c < d; c++) e[a[c]] = b || {};
                    return e
                }
                var h, i, j;
                for (d = d || [], c = c || "", "string" == typeof d && (d = b(d)), a = b(a), h = a.length; h--;) i = b([g, c].join(" ")), j = {
                    attributes: e(i),
                    attributesOrder: i,
                    children: e(d, f)
                }, n[a[h]] = j
            }

            function d(a, c) {
                var d, e, f, g;
                for (a = b(a), d = a.length, c = b(c); d--;)
                    for (e = n[a[d]], f = 0, g = c.length; f < g; f++) e.attributes[c[f]] = {}, e.attributesOrder.push(c[f])
            }
            var g, i, j, k, l, m, n = {};
            return e[a] ? e[a] : (g = "id accesskey class dir lang style tabindex title role", i = "address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul", j = "a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment", "html4" != a && (g += " contenteditable contextmenu draggable dropzone hidden spellcheck translate", i += " article aside details dialog figure header footer hgroup section nav", j += " audio canvas command datalist mark meter output picture progress time wbr video ruby bdi keygen"), "html5-strict" != a && (g += " xml:lang", m = "acronym applet basefont big font strike tt", j = [j, m].join(" "), h(b(m), function(a) {
                c(a, "", j)
            }), l = "center dir isindex noframes", i = [i, l].join(" "), k = [i, j].join(" "), h(b(l), function(a) {
                c(a, "", k)
            })), k = k || [i, j].join(" "), c("html", "manifest", "head body"), c("head", "", "base command link meta noscript script style title"), c("title hr noscript br"), c("base", "href target"), c("link", "href rel media hreflang type sizes hreflang"), c("meta", "name http-equiv content charset"), c("style", "media type scoped"), c("script", "src async defer type charset"), c("body", "onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload", k), c("address dt dd div caption", "", k), c("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn", "", j), c("blockquote", "cite", k), c("ol", "reversed start type", "li"), c("ul", "", "li"), c("li", "value", k), c("dl", "", "dt dd"), c("a", "href target rel media hreflang type", j), c("q", "cite", j), c("ins del", "cite datetime", k), c("img", "src sizes srcset alt usemap ismap width height"), c("iframe", "src name width height", k), c("embed", "src type width height"), c("object", "data type typemustmatch name usemap form width height", [k, "param"].join(" ")), c("param", "name value"), c("map", "name", [k, "area"].join(" ")), c("area", "alt coords shape href target rel media hreflang type"), c("table", "border", "caption colgroup thead tfoot tbody tr" + ("html4" == a ? " col" : "")), c("colgroup", "span", "col"), c("col", "span"), c("tbody thead tfoot", "", "tr"), c("tr", "", "td th"), c("td", "colspan rowspan headers", k), c("th", "colspan rowspan headers scope abbr", k), c("form", "accept-charset action autocomplete enctype method name novalidate target", k), c("fieldset", "disabled form name", [k, "legend"].join(" ")), c("label", "form for", j), c("input", "accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"), c("button", "disabled form formaction formenctype formmethod formnovalidate formtarget name type value", "html4" == a ? k : j), c("select", "disabled form multiple name required size", "option optgroup"), c("optgroup", "disabled label", "option"), c("option", "disabled label selected value"), c("textarea", "cols dirname disabled form maxlength name readonly required rows wrap"), c("menu", "type label", [k, "li"].join(" ")), c("noscript", "", k), "html4" != a && (c("wbr"), c("ruby", "", [j, "rt rp"].join(" ")), c("figcaption", "", k), c("mark rt rp summary bdi", "", j), c("canvas", "width height", k), c("video", "src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered", [k, "track source"].join(" ")), c("audio", "src crossorigin preload autoplay mediagroup loop muted controls buffered volume", [k, "track source"].join(" ")), c("picture", "", "img source"), c("source", "src srcset type media sizes"), c("track", "kind src srclang label default"), c("datalist", "", [j, "option"].join(" ")), c("article section nav aside header footer", "", k), c("hgroup", "", "h1 h2 h3 h4 h5 h6"), c("figure", "", [k, "figcaption"].join(" ")), c("time", "datetime", j), c("dialog", "open", k), c("command", "type label icon disabled checked radiogroup command"), c("output", "for form name", j), c("progress", "value max", j), c("meter", "value min max low high optimum", j), c("details", "open", [k, "summary"].join(" ")), c("keygen", "autofocus challenge disabled form keytype name")), "html5-strict" != a && (d("script", "language xml:space"), d("style", "xml:space"), d("object", "declare classid code codebase codetype archive standby align border hspace vspace"), d("embed", "align name hspace vspace"), d("param", "valuetype type"), d("a", "charset name rev shape coords"), d("br", "clear"), d("applet", "codebase archive code object alt name width height align hspace vspace"), d("img", "name longdesc align border hspace vspace"), d("iframe", "longdesc frameborder marginwidth marginheight scrolling align"), d("font basefont", "size color face"), d("input", "usemap align"), d("select", "onchange"), d("textarea"), d("h1 h2 h3 h4 h5 h6 div p legend caption", "align"), d("ul", "type compact"), d("li", "type"), d("ol dl menu dir", "compact"), d("pre", "width xml:space"), d("hr", "align noshade size width"), d("isindex", "prompt"), d("table", "summary width frame rules cellspacing cellpadding align bgcolor"), d("col", "width align char charoff valign"), d("colgroup", "width align char charoff valign"), d("thead", "align char charoff valign"), d("tr", "align char charoff valign bgcolor"), d("th", "axis align char charoff valign nowrap bgcolor width height"), d("form", "accept"), d("td", "abbr axis scope align char charoff valign nowrap bgcolor width height"), d("tfoot", "align char charoff valign"), d("tbody", "align char charoff valign"), d("area", "nohref"), d("body", "background bgcolor text link vlink alink")), "html4" != a && (d("input button select textarea", "autofocus"), d("input textarea", "placeholder"), d("a", "download"), d("link script img", "crossorigin"), d("iframe", "sandbox seamless allowfullscreen")), h(b("a form meter progress dfn"), function(a) {
                n[a] && delete n[a].children[a]
            }), delete n.caption.children.table, delete n.script, e[a] = n, n)
        }

        function d(a, b) {
            var c;
            return a && (c = {}, "string" == typeof a && (a = {
                "*": a
            }), h(a, function(a, d) {
                c[d] = c[d.toUpperCase()] = "map" == b ? g(a, /[, ]/) : j(a, /[, ]/)
            })), c
        }
        var e = {},
            f = {},
            g = a.makeMap,
            h = a.each,
            i = a.extend,
            j = a.explode,
            k = a.inArray;
        return function(a) {
            function f(b, c, d) {
                var f = a[b];
                return f ? f = g(f, /[, ]/, g(f.toUpperCase(), /[, ]/)) : (f = e[b], f || (f = g(c, " ", g(c.toUpperCase(), " ")), f = i(f, d), e[b] = f)), f
            }

            function l(a) {
                return new RegExp("^" + a.replace(/([?+*])/g, ".$1") + "$")
            }

            function m(a) {
                var c, d, e, f, h, i, j, m, n, o, p, q, r, s, t, u, v, w, x, y = /^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,
                    z = /^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,
                    A = /[*?+]/;
                if (a)
                    for (a = b(a, ","), F["@"] && (u = F["@"].attributes, v = F["@"].attributesOrder), c = 0, d = a.length; c < d; c++)
                        if (h = y.exec(a[c])) {
                            if (s = h[1], n = h[2], t = h[3], m = h[5], q = {}, r = [], i = {
                                    attributes: q,
                                    attributesOrder: r
                                }, "#" === s && (i.paddEmpty = !0), "-" === s && (i.removeEmpty = !0), "!" === h[4] && (i.removeEmptyAttrs = !0), u) {
                                for (w in u) q[w] = u[w];
                                r.push.apply(r, v)
                            }
                            if (m)
                                for (m = b(m, "|"), e = 0, f = m.length; e < f; e++)
                                    if (h = z.exec(m[e])) {
                                        if (j = {}, p = h[1], o = h[2].replace(/::/g, ":"), s = h[3], x = h[4], "!" === p && (i.attributesRequired = i.attributesRequired || [], i.attributesRequired.push(o), j.required = !0), "-" === p) {
                                            delete q[o], r.splice(k(r, o), 1);
                                            continue
                                        }
                                        s && ("=" === s && (i.attributesDefault = i.attributesDefault || [], i.attributesDefault.push({
                                            name: o,
                                            value: x
                                        }), j.defaultValue = x), ":" === s && (i.attributesForced = i.attributesForced || [], i.attributesForced.push({
                                            name: o,
                                            value: x
                                        }), j.forcedValue = x), "<" === s && (j.validValues = g(x, "?"))), A.test(o) ? (i.attributePatterns = i.attributePatterns || [], j.pattern = l(o), i.attributePatterns.push(j)) : (q[o] || r.push(o), q[o] = j)
                                    }
                            u || "@" != n || (u = q, v = r), t && (i.outputName = n, F[t] = i), A.test(n) ? (i.pattern = l(n), H.push(i)) : F[n] = i
                        }
            }

            function n(a) {
                F = {}, H = [], m(a), h(t, function(a, b) {
                    G[b] = a.children
                })
            }

            function o(a) {
                var c = /^(~)?(.+)$/;
                a && (e.text_block_elements = e.block_elements = null, h(b(a, ","), function(a) {
                    var b = c.exec(a),
                        d = "~" === b[1],
                        e = d ? "span" : "div",
                        f = b[2];
                    if (G[f] = G[e], I[f] = e, d || (z[f.toUpperCase()] = {}, z[f] = {}), !F[f]) {
                        var g = F[e];
                        g = i({}, g), delete g.removeEmptyAttrs, delete g.removeEmpty, F[f] = g
                    }
                    h(G, function(a, b) {
                        a[e] && (G[b] = a = i({}, G[b]), a[f] = a[e])
                    })
                }))
            }

            function p(c) {
                var d = /^([+\-]?)(\w+)\[([^\]]+)\]$/;
                e[a.schema] = null, c && h(b(c, ","), function(a) {
                    var c, e, f = d.exec(a);
                    f && (e = f[1], c = e ? G[f[2]] : G[f[2]] = {
                        "#comment": {}
                    }, c = G[f[2]], h(b(f[3], "|"), function(a) {
                        "-" === e ? delete c[a] : c[a] = {}
                    }))
                })
            }

            function q(a) {
                var b, c = F[a];
                if (c) return c;
                for (b = H.length; b--;)
                    if (c = H[b], c.pattern.test(a)) return c
            }
            var r, s, t, u, v, w, x, y, z, A, B, C, D, E = this,
                F = {},
                G = {},
                H = [],
                I = {},
                J = {};
            a = a || {}, t = c(a.schema), a.verify_html === !1 && (a.valid_elements = "*[*]"), r = d(a.valid_styles), s = d(a.invalid_styles, "map"), y = d(a.valid_classes, "map"), u = f("whitespace_elements", "pre script noscript style textarea video audio iframe object code"), v = f("self_closing_elements", "colgroup dd dt li option p td tfoot th thead tr"), w = f("short_ended_elements", "area base basefont br col frame hr img input isindex link meta param embed source wbr track"), x = f("boolean_attributes", "checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"), A = f("non_empty_elements", "td th iframe video audio object script pre code", w), B = f("move_caret_before_on_enter_elements", "table", A), C = f("text_block_elements", "h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"), z = f("block_elements", "hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption", C), D = f("text_inline_elements", "span strong b em i font strike u var cite dfn code mark q sup sub samp"), h((a.special || "script noscript noframes noembed title style textarea xmp").split(" "), function(a) {
                J[a] = new RegExp("</" + a + "[^>]*>", "gi")
            }), a.valid_elements ? n(a.valid_elements) : (h(t, function(a, b) {
                F[b] = {
                    attributes: a.attributes,
                    attributesOrder: a.attributesOrder
                }, G[b] = a.children
            }), "html5" != a.schema && h(b("strong/b em/i"), function(a) {
                a = b(a, "/"), F[a[1]].outputName = a[0]
            }), h(b("ol ul sub sup blockquote span font a table tbody tr strong em b i"), function(a) {
                F[a] && (F[a].removeEmpty = !0)
            }), h(b("p h1 h2 h3 h4 h5 h6 th td pre div address caption"), function(a) {
                F[a].paddEmpty = !0
            }), h(b("span"), function(a) {
                F[a].removeEmptyAttrs = !0
            })), o(a.custom_elements), p(a.valid_children), m(a.extended_valid_elements), p("+ol[ul|ol],+ul[ul|ol]"), h({
                dd: "dl",
                dt: "dl",
                li: "ul ol",
                td: "tr",
                th: "tr",
                tr: "tbody thead tfoot",
                tbody: "table",
                thead: "table",
                tfoot: "table",
                legend: "fieldset",
                area: "map",
                param: "video audio object"
            }, function(a, c) {
                F[c] && (F[c].parentsRequired = b(a))
            }), a.invalid_elements && h(j(a.invalid_elements), function(a) {
                F[a] && delete F[a]
            }), q("span") || m("span[!data-mce-type|*]"), E.children = G, E.getValidStyles = function() {
                return r
            }, E.getInvalidStyles = function() {
                return s
            }, E.getValidClasses = function() {
                return y
            }, E.getBoolAttrs = function() {
                return x
            }, E.getBlockElements = function() {
                return z
            }, E.getTextBlockElements = function() {
                return C
            }, E.getTextInlineElements = function() {
                return D
            }, E.getShortEndedElements = function() {
                return w
            }, E.getSelfClosingElements = function() {
                return v
            }, E.getNonEmptyElements = function() {
                return A
            }, E.getMoveCaretBeforeOnEnterElements = function() {
                return B
            }, E.getWhiteSpaceElements = function() {
                return u
            }, E.getSpecialElements = function() {
                return J
            }, E.isValidChild = function(a, b) {
                var c = G[a.toLowerCase()];
                return !(!c || !c[b.toLowerCase()])
            }, E.isValid = function(a, b) {
                var c, d, e = q(a);
                if (e) {
                    if (!b) return !0;
                    if (e.attributes[b]) return !0;
                    if (c = e.attributePatterns)
                        for (d = c.length; d--;)
                            if (c[d].pattern.test(a)) return !0
                }
                return !1
            }, E.getElementRule = q, E.getCustomElements = function() {
                return I
            }, E.addValidElements = m, E.setValidElements = n, E.addCustomElements = o, E.addValidChildren = p, E.elements = F
        }
    }), g("e", ["a", "7", "1h", "8", "1i", "c", "6", "d", "j", "b", "9"], function(a, b, c, d, e, f, g, h, i, j, k) {
        function l(a, b) {
            var c, d = {},
                e = b.keep_values;
            return c = {
                set: function(c, d, e) {
                    b.url_converter && (d = b.url_converter.call(b.url_converter_scope || a, d, e, c[0])), c.attr("data-mce-" + e, d).attr(e, d)
                },
                get: function(a, b) {
                    return a.attr("data-mce-" + b) || a.attr(b)
                }
            }, d = {
                style: {
                    set: function(a, b) {
                        return null !== b && "object" == typeof b ? void a.css(b) : (e && a.attr("data-mce-style", b), void a.attr("style", b))
                    },
                    get: function(b) {
                        var c = b.attr("data-mce-style") || b.attr("style");
                        return c = a.serializeStyle(a.parseStyle(c), b[0].nodeName)
                    }
                }
            }, e && (d.href = d.src = c), d
        }

        function m(a, b) {
            var c = b.attr("style");
            c = a.serializeStyle(a.parseStyle(c), b[0].nodeName), c || (c = null), b.attr("data-mce-style", c)
        }

        function n(a, b) {
            var c, d, e = 0;
            if (a)
                for (c = a.nodeType, a = a.previousSibling; a; a = a.previousSibling) d = a.nodeType, (!b || 3 != d || d != c && a.nodeValue.length) && (e++, c = d);
            return e
        }

        function o(c, d) {
            var f, g = this;
            g.doc = c, g.win = window, g.files = {}, g.counter = 0, g.stdMode = !t || c.documentMode >= 8, g.boxModel = !t || "CSS1Compat" == c.compatMode || g.stdMode, g.styleSheetLoader = new e(c), g.boundEvents = [], g.settings = d = d || {}, g.schema = d.schema ? d.schema : new i({}), g.styles = new j({
                url_converter: d.url_converter,
                url_converter_scope: d.url_converter_scope
            }, d.schema), g.fixDoc(c), g.events = d.ownEvents ? new b(d.proxy) : b.Event, g.attrHooks = l(g, d), f = d.schema ? d.schema.getBlockElements() : {}, g.$ = a.overrideDefaults(function() {
                return {
                    context: c,
                    element: g.getRoot()
                }
            }), g.isBlock = function(a) {
                if (!a) return !1;
                var b = a.nodeType;
                return b ? !(1 !== b || !f[a.nodeName]) : !!f[a]
            }
        }
        var p = k.each,
            q = k.is,
            r = k.grep,
            s = k.trim,
            t = g.ie,
            u = /^([a-z0-9],?)+$/i,
            v = /^[ \t\r\n]*$/;
        return o.prototype = {
            $$: function(a) {
                return "string" == typeof a && (a = this.get(a)), this.$(a)
            },
            root: null,
            fixDoc: function(a) {
                var b, c = this.settings;
                if (t && c.schema) {
                    "abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g, function(b) {
                        a.createElement(b)
                    });
                    for (b in c.schema.getCustomElements()) a.createElement(b)
                }
            },
            clone: function(a, b) {
                var c, d, e = this;
                return !t || 1 !== a.nodeType || b ? a.cloneNode(b) : (d = e.doc, b ? c.firstChild : (c = d.createElement(a.nodeName), p(e.getAttribs(a), function(b) {
                    e.setAttrib(c, b.nodeName, e.getAttrib(a, b.nodeName))
                }), c))
            },
            getRoot: function() {
                var a = this;
                return a.settings.root_element || a.doc.body
            },
            getViewPort: function(a) {
                var b, c;
                return a = a ? a : this.win, b = a.document, c = this.boxModel ? b.documentElement : b.body, {
                    x: a.pageXOffset || c.scrollLeft,
                    y: a.pageYOffset || c.scrollTop,
                    w: a.innerWidth || c.clientWidth,
                    h: a.innerHeight || c.clientHeight
                }
            },
            getRect: function(a) {
                var b, c, d = this;
                return a = d.get(a), b = d.getPos(a), c = d.getSize(a), {
                    x: b.x,
                    y: b.y,
                    w: c.w,
                    h: c.h
                }
            },
            getSize: function(a) {
                var b, c, d = this;
                return a = d.get(a), b = d.getStyle(a, "width"), c = d.getStyle(a, "height"), b.indexOf("px") === -1 && (b = 0), c.indexOf("px") === -1 && (c = 0), {
                    w: parseInt(b, 10) || a.offsetWidth || a.clientWidth,
                    h: parseInt(c, 10) || a.offsetHeight || a.clientHeight
                }
            },
            getParent: function(a, b, c) {
                return this.getParents(a, b, c, !1)
            },
            getParents: function(a, b, c, d) {
                var e, f = this,
                    g = [];
                for (a = f.get(a), d = void 0 === d, c = c || ("BODY" != f.getRoot().nodeName ? f.getRoot().parentNode : null), q(b, "string") && (e = b, b = "*" === b ? function(a) {
                        return 1 == a.nodeType
                    } : function(a) {
                        return f.is(a, e)
                    }); a && a != c && a.nodeType && 9 !== a.nodeType;) {
                    if (!b || b(a)) {
                        if (!d) return a;
                        g.push(a)
                    }
                    a = a.parentNode
                }
                return d ? g : null
            },
            get: function(a) {
                var b;
                return a && this.doc && "string" == typeof a && (b = a, a = this.doc.getElementById(a), a && a.id !== b) ? this.doc.getElementsByName(b)[1] : a
            },
            getNext: function(a, b) {
                return this._findSib(a, b, "nextSibling")
            },
            getPrev: function(a, b) {
                return this._findSib(a, b, "previousSibling")
            },
            select: function(a, b) {
                var c = this;
                return d(a, c.get(b) || c.settings.root_element || c.doc, [])
            },
            is: function(a, b) {
                var c;
                if (!a) return !1;
                if (void 0 === a.length) {
                    if ("*" === b) return 1 == a.nodeType;
                    if (u.test(b)) {
                        for (b = b.toLowerCase().split(/,/), a = a.nodeName.toLowerCase(), c = b.length - 1; c >= 0; c--)
                            if (b[c] == a) return !0;
                        return !1
                    }
                }
                if (a.nodeType && 1 != a.nodeType) return !1;
                var e = a.nodeType ? [a] : a;
                return d(b, e[0].ownerDocument || e[0], null, e).length > 0
            },
            add: function(a, b, c, d, e) {
                var f = this;
                return this.run(a, function(a) {
                    var g;
                    return g = q(b, "string") ? f.doc.createElement(b) : b, f.setAttribs(g, c), d && (d.nodeType ? g.appendChild(d) : f.setHTML(g, d)), e ? g : a.appendChild(g)
                })
            },
            create: function(a, b, c) {
                return this.add(this.doc.createElement(a), a, b, c, 1)
            },
            createHTML: function(a, b, c) {
                var d, e = "";
                e += "<" + a;
                for (d in b) b.hasOwnProperty(d) && null !== b[d] && "undefined" != typeof b[d] && (e += " " + d + '="' + this.encode(b[d]) + '"');
                return "undefined" != typeof c ? e + ">" + c + "</" + a + ">" : e + " />"
            },
            createFragment: function(a) {
                var b, c, d, e = this.doc;
                for (d = e.createElement("div"), b = e.createDocumentFragment(), a && (d.innerHTML = a); c = d.firstChild;) b.appendChild(c);
                return b
            },
            remove: function(a, b) {
                return a = this.$$(a), b ? a.each(function() {
                    for (var a; a = this.firstChild;) 3 == a.nodeType && 0 === a.data.length ? this.removeChild(a) : this.parentNode.insertBefore(a, this)
                }).remove() : a.remove(), a.length > 1 ? a.toArray() : a[0]
            },
            setStyle: function(a, b, c) {
                a = this.$$(a).css(b, c), this.settings.update_styles && m(this, a)
            },
            getStyle: function(a, b, c) {
                return a = this.$$(a), c ? a.css(b) : (b = b.replace(/-(\D)/g, function(a, b) {
                    return b.toUpperCase()
                }), "float" == b && (b = g.ie && g.ie < 12 ? "styleFloat" : "cssFloat"), a[0] && a[0].style ? a[0].style[b] : void 0)
            },
            setStyles: function(a, b) {
                a = this.$$(a).css(b), this.settings.update_styles && m(this, a)
            },
            removeAllAttribs: function(a) {
                return this.run(a, function(a) {
                    var b, c = a.attributes;
                    for (b = c.length - 1; b >= 0; b--) a.removeAttributeNode(c.item(b))
                })
            },
            setAttrib: function(a, b, c) {
                var d, e, f = this,
                    g = f.settings;
                "" === c && (c = null), a = f.$$(a), d = a.attr(b), a.length && (e = f.attrHooks[b], e && e.set ? e.set(a, c, b) : a.attr(b, c), d != c && g.onSetAttrib && g.onSetAttrib({
                    attrElm: a,
                    attrName: b,
                    attrValue: c
                }))
            },
            setAttribs: function(a, b) {
                var c = this;
                c.$$(a).each(function(a, d) {
                    p(b, function(a, b) {
                        c.setAttrib(d, b, a)
                    })
                })
            },
            getAttrib: function(a, b, c) {
                var d, e, f = this;
                return a = f.$$(a), a.length && (d = f.attrHooks[b], e = d && d.get ? d.get(a, b) : a.attr(b)), "undefined" == typeof e && (e = c || ""), e
            },
            getPos: function(b, c) {
                var d, e, f = this,
                    g = 0,
                    h = 0,
                    i = f.doc,
                    j = i.body;
                if (b = f.get(b), c = c || j, b) {
                    if (c === j && b.getBoundingClientRect && "static" === a(j).css("position")) return e = b.getBoundingClientRect(), c = f.boxModel ? i.documentElement : j, g = e.left + (i.documentElement.scrollLeft || j.scrollLeft) - c.clientLeft, h = e.top + (i.documentElement.scrollTop || j.scrollTop) - c.clientTop, {
                        x: g,
                        y: h
                    };
                    for (d = b; d && d != c && d.nodeType;) g += d.offsetLeft || 0, h += d.offsetTop || 0, d = d.offsetParent;
                    for (d = b.parentNode; d && d != c && d.nodeType;) g -= d.scrollLeft || 0, h -= d.scrollTop || 0, d = d.parentNode
                }
                return {
                    x: g,
                    y: h
                }
            },
            parseStyle: function(a) {
                return this.styles.parse(a)
            },
            serializeStyle: function(a, b) {
                return this.styles.serialize(a, b)
            },
            addStyle: function(a) {
                var b, c, d = this,
                    e = d.doc;
                if (d !== o.DOM && e === document) {
                    var f = o.DOM.addedStyles;
                    if (f = f || [], f[a]) return;
                    f[a] = !0, o.DOM.addedStyles = f
                }
                c = e.getElementById("mceDefaultStyles"), c || (c = e.createElement("style"), c.id = "mceDefaultStyles", c.type = "text/css", b = e.getElementsByTagName("head")[0], b.firstChild ? b.insertBefore(c, b.firstChild) : b.appendChild(c)), c.styleSheet ? c.styleSheet.cssText += a : c.appendChild(e.createTextNode(a))
            },
            loadCSS: function(a) {
                var b, c = this,
                    d = c.doc;
                return c !== o.DOM && d === document ? void o.DOM.loadCSS(a) : (a || (a = ""), b = d.getElementsByTagName("head")[0], void p(a.split(","), function(a) {
                    var e;
                    a = k._addCacheSuffix(a), c.files[a] || (c.files[a] = !0, e = c.create("link", {
                        rel: "stylesheet",
                        href: a
                    }), t && d.documentMode && d.recalc && (e.onload = function() {
                        d.recalc && d.recalc(), e.onload = null
                    }), b.appendChild(e))
                }))
            },
            addClass: function(a, b) {
                this.$$(a).addClass(b)
            },
            removeClass: function(a, b) {
                this.toggleClass(a, b, !1)
            },
            hasClass: function(a, b) {
                return this.$$(a).hasClass(b)
            },
            toggleClass: function(b, c, d) {
                this.$$(b).toggleClass(c, d).each(function() {
                    "" === this.className && a(this).attr("class", null)
                })
            },
            show: function(a) {
                this.$$(a).show()
            },
            hide: function(a) {
                this.$$(a).hide()
            },
            isHidden: function(a) {
                return "none" == this.$$(a).css("display")
            },
            uniqueId: function(a) {
                return (a ? a : "mce_") + this.counter++
            },
            setHTML: function(b, c) {
                b = this.$$(b), t ? b.each(function(b, d) {
                    if (d.canHaveHTML !== !1) {
                        for (; d.firstChild;) d.removeChild(d.firstChild);
                        try {
                            d.innerHTML = "<br>" + c, d.removeChild(d.firstChild)
                        } catch (b) {
                            a("<div></div>").html("<br>" + c).contents().slice(1).appendTo(d)
                        }
                        return c
                    }
                }) : b.html(c)
            },
            getOuterHTML: function(b) {
                return b = this.get(b), 1 == b.nodeType && "outerHTML" in b ? b.outerHTML : a("<div></div>").append(a(b).clone()).html()
            },
            setOuterHTML: function(b, c) {
                var d = this;
                d.$$(b).each(function() {
                    try {
                        if ("outerHTML" in this) return void(this.outerHTML = c)
                    } catch (a) {}
                    d.remove(a(this).html(c), !0)
                })
            },
            decode: h.decode,
            encode: h.encodeAllRaw,
            insertAfter: function(a, b) {
                return b = this.get(b), this.run(a, function(a) {
                    var c, d;
                    return c = b.parentNode, d = b.nextSibling, d ? c.insertBefore(a, d) : c.appendChild(a), a
                })
            },
            replace: function(a, b, c) {
                var d = this;
                return d.run(b, function(b) {
                    return q(b, "array") && (a = a.cloneNode(!0)), c && p(r(b.childNodes), function(b) {
                        a.appendChild(b)
                    }), b.parentNode.replaceChild(a, b)
                })
            },
            rename: function(a, b) {
                var c, d = this;
                return a.nodeName != b.toUpperCase() && (c = d.create(b), p(d.getAttribs(a), function(b) {
                    d.setAttrib(c, b.nodeName, d.getAttrib(a, b.nodeName))
                }), d.replace(c, a, 1)), c || a
            },
            findCommonAncestor: function(a, b) {
                for (var c, d = a; d;) {
                    for (c = b; c && d != c;) c = c.parentNode;
                    if (d == c) break;
                    d = d.parentNode
                }
                return !d && a.ownerDocument ? a.ownerDocument.documentElement : d
            },
            toHex: function(a) {
                return this.styles.toHex(k.trim(a))
            },
            run: function(a, b, c) {
                var d, e = this;
                return "string" == typeof a && (a = e.get(a)), !!a && (c = c || this, a.nodeType || !a.length && 0 !== a.length ? b.call(c, a) : (d = [], p(a, function(a, f) {
                    a && ("string" == typeof a && (a = e.get(a)), d.push(b.call(c, a, f)))
                }), d))
            },
            getAttribs: function(a) {
                var b;
                if (a = this.get(a), !a) return [];
                if (t) {
                    if (b = [], "OBJECT" == a.nodeName) return a.attributes;
                    "OPTION" === a.nodeName && this.getAttrib(a, "selected") && b.push({
                        specified: 1,
                        nodeName: "selected"
                    });
                    var c = /<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;
                    return a.cloneNode(!1).outerHTML.replace(c, "").replace(/[\w:\-]+/gi, function(a) {
                        b.push({
                            specified: 1,
                            nodeName: a
                        })
                    }), b
                }
                return a.attributes
            },
            isEmpty: function(a, b) {
                var c, d, e, g, h, i, j = this,
                    k = 0;
                if (a = a.firstChild) {
                    h = new f(a, a.parentNode), b = b || (j.schema ? j.schema.getNonEmptyElements() : null), g = j.schema ? j.schema.getWhiteSpaceElements() : {};
                    do {
                        if (e = a.nodeType, 1 === e) {
                            var l = a.getAttribute("data-mce-bogus");
                            if (l) {
                                a = h.next("all" === l);
                                continue
                            }
                            if (i = a.nodeName.toLowerCase(), b && b[i]) {
                                if ("br" === i) {
                                    k++, a = h.next();
                                    continue
                                }
                                return !1
                            }
                            for (d = j.getAttribs(a), c = d.length; c--;)
                                if (i = d[c].nodeName, "name" === i || "data-mce-bookmark" === i) return !1
                        }
                        if (8 == e) return !1;
                        if (3 === e && !v.test(a.nodeValue)) return !1;
                        if (3 === e && a.parentNode && g[a.parentNode.nodeName] && v.test(a.nodeValue)) return !1;
                        a = h.next()
                    } while (a)
                }
                return k <= 1
            },
            createRng: function() {
                var a = this.doc;
                return a.createRange ? a.createRange() : new c(this)
            },
            nodeIndex: n,
            split: function(a, b, c) {
                function d(a) {
                    function b(a) {
                        var b = a.previousSibling && "SPAN" == a.previousSibling.nodeName,
                            c = a.nextSibling && "SPAN" == a.nextSibling.nodeName;
                        return b && c
                    }
                    var c, e = a.childNodes,
                        f = a.nodeType;
                    if (1 != f || "bookmark" != a.getAttribute("data-mce-type")) {
                        for (c = e.length - 1; c >= 0; c--) d(e[c]);
                        if (9 != f) {
                            if (3 == f && a.nodeValue.length > 0) {
                                var g = s(a.nodeValue).length;
                                if (!h.isBlock(a.parentNode) || g > 0 || 0 === g && b(a)) return
                            } else if (1 == f && (e = a.childNodes, 1 == e.length && e[0] && 1 == e[0].nodeType && "bookmark" == e[0].getAttribute("data-mce-type") && a.parentNode.insertBefore(e[0], a), e.length || /^(br|hr|input|img)$/i.test(a.nodeName))) return;
                            h.remove(a)
                        }
                        return a
                    }
                }
                var e, f, g, h = this,
                    i = h.createRng();
                if (a && b) return i.setStart(a.parentNode, h.nodeIndex(a)), i.setEnd(b.parentNode, h.nodeIndex(b)), e = i.extractContents(), i = h.createRng(), i.setStart(b.parentNode, h.nodeIndex(b) + 1), i.setEnd(a.parentNode, h.nodeIndex(a) + 1), f = i.extractContents(), g = a.parentNode, g.insertBefore(d(e), a), c ? g.insertBefore(c, a) : g.insertBefore(b, a), g.insertBefore(d(f), a), h.remove(a), c || b
            },
            bind: function(a, b, c, d) {
                var e = this;
                if (k.isArray(a)) {
                    for (var f = a.length; f--;) a[f] = e.bind(a[f], b, c, d);
                    return a
                }
                return !e.settings.collect || a !== e.doc && a !== e.win || e.boundEvents.push([a, b, c, d]), e.events.bind(a, b, c, d || e)
            },
            unbind: function(a, b, c) {
                var d, e = this;
                if (k.isArray(a)) {
                    for (d = a.length; d--;) a[d] = e.unbind(a[d], b, c);
                    return a
                }
                if (e.boundEvents && (a === e.doc || a === e.win))
                    for (d = e.boundEvents.length; d--;) {
                        var f = e.boundEvents[d];
                        a != f[0] || b && b != f[1] || c && c != f[2] || this.events.unbind(f[0], f[1], f[2])
                    }
                return this.events.unbind(a, b, c)
            },
            fire: function(a, b, c) {
                return this.events.fire(a, b, c)
            },
            getContentEditable: function(a) {
                var b;
                return a && 1 == a.nodeType ? (b = a.getAttribute("data-mce-contenteditable"), b && "inherit" !== b ? b : "inherit" !== a.contentEditable ? a.contentEditable : null) : null
            },
            getContentEditableParent: function(a) {
                for (var b = this.getRoot(), c = null; a && a !== b && (c = this.getContentEditable(a), null === c); a = a.parentNode);
                return c
            },
            destroy: function() {
                var a = this;
                if (a.boundEvents) {
                    for (var b = a.boundEvents.length; b--;) {
                        var c = a.boundEvents[b];
                        this.events.unbind(c[0], c[1], c[2])
                    }
                    a.boundEvents = null
                }
                d.setDocument && d.setDocument(), a.win = a.doc = a.root = a.events = a.frag = null
            },
            isChildOf: function(a, b) {
                for (; a;) {
                    if (b === a) return !0;
                    a = a.parentNode
                }
                return !1
            },
            dumpRng: function(a) {
                return "startContainer: " + a.startContainer.nodeName + ", startOffset: " + a.startOffset + ", endContainer: " + a.endContainer.nodeName + ", endOffset: " + a.endOffset
            },
            _findSib: function(a, b, c) {
                var d = this,
                    e = b;
                if (a)
                    for ("string" == typeof e && (e = function(a) {
                            return d.is(a, b)
                        }), a = a[c]; a; a = a[c])
                        if (e(a)) return a;
                return null
            }
        }, o.DOM = new o(document), o.nodeIndex = n, o
    }), g("f", ["e", "9"], function(a, b) {
        function c() {
            function a(a, c, e) {
                function f() {
                    k.remove(j), i && (i.onreadystatechange = i.onload = i = null), c()
                }

                function h() {
                    g(e) ? e() : "undefined" != typeof console && console.log && console.log("Failed to load script: " + a)
                }
                var i, j, k = d;
                j = k.uniqueId(), i = document.createElement("script"), i.id = j, i.type = "text/javascript", i.src = b._addCacheSuffix(a), "onreadystatechange" in i ? i.onreadystatechange = function() {
                    /loaded|complete/.test(i.readyState) && f()
                } : i.onload = f, i.onerror = h, (document.getElementsByTagName("head")[0] || document.body).appendChild(i)
            }
            var c, h = 0,
                i = 1,
                j = 2,
                k = 3,
                l = {},
                m = [],
                n = {},
                o = [],
                p = 0;
            this.isDone = function(a) {
                return l[a] == j
            }, this.markDone = function(a) {
                l[a] = j
            }, this.add = this.load = function(a, b, d, e) {
                var f = l[a];
                f == c && (m.push(a), l[a] = h), b && (n[a] || (n[a] = []), n[a].push({
                    success: b,
                    failure: e,
                    scope: d || this
                }))
            }, this.remove = function(a) {
                delete l[a], delete n[a]
            }, this.loadQueue = function(a, b, c) {
                this.loadScripts(m, a, b, c)
            }, this.loadScripts = function(b, d, h, m) {
                function q(a, b) {
                    e(n[b], function(b) {
                        g(b[a]) && b[a].call(b.scope)
                    }), n[b] = c
                }
                var r, s = [];
                o.push({
                    success: d,
                    failure: m,
                    scope: h || this
                }), (r = function() {
                    var c = f(b);
                    b.length = 0, e(c, function(b) {
                        return l[b] === j ? void q("success", b) : l[b] === k ? void q("failure", b) : void(l[b] !== i && (l[b] = i, p++, a(b, function() {
                            l[b] = j, p--, q("success", b), r()
                        }, function() {
                            l[b] = k, p--, s.push(b), q("failure", b), r()
                        })))
                    }), p || (e(o, function(a) {
                        0 === s.length ? g(a.success) && a.success.call(a.scope) : g(a.failure) && a.failure.call(a.scope, s)
                    }), o.length = 0)
                })()
            }
        }
        var d = a.DOM,
            e = b.each,
            f = b.grep,
            g = function(a) {
                return "function" == typeof a
            };
        return c.ScriptLoader = new c, c
    }), g("g", ["f", "9"], function(a, b) {
        function c() {
            var a = this;
            a.items = [], a.urls = {}, a.lookup = {}
        }
        var d = b.each;
        return c.prototype = {
            get: function(a) {
                if (this.lookup[a]) return this.lookup[a].instance
            },
            dependencies: function(a) {
                var b;
                return this.lookup[a] && (b = this.lookup[a].dependencies), b || []
            },
            requireLangPack: function(b, d) {
                var e = c.language;
                if (e && c.languageLoad !== !1) {
                    if (d)
                        if (d = "," + d + ",", d.indexOf("," + e.substr(0, 2) + ",") != -1) e = e.substr(0, 2);
                        else if (d.indexOf("," + e + ",") == -1) return;
                    a.ScriptLoader.add(this.urls[b] + "/langs/" + e + ".js")
                }
            },
            add: function(a, b, c) {
                return this.items.push(b), this.lookup[a] = {
                    instance: b,
                    dependencies: c
                }, b
            },
            remove: function(a) {
                delete this.urls[a], delete this.lookup[a]
            },
            createUrl: function(a, b) {
                return "object" == typeof b ? b : {
                    prefix: a.prefix,
                    resource: b,
                    suffix: a.suffix
                }
            },
            addComponents: function(b, c) {
                var e = this.urls[b];
                d(c, function(b) {
                    a.ScriptLoader.add(e + "/" + b)
                })
            },
            load: function(b, e, f, g, h) {
                function i() {
                    var c = j.dependencies(b);
                    d(c, function(a) {
                        var b = j.createUrl(e, a);
                        j.load(b.resource, b, void 0, void 0)
                    }), f && (g ? f.call(g) : f.call(a))
                }
                var j = this,
                    k = e;
                j.urls[b] || ("object" == typeof e && (k = e.prefix + e.resource + e.suffix), 0 !== k.indexOf("/") && k.indexOf("://") == -1 && (k = c.baseURL + "/" + k), j.urls[b] = k.substring(0, k.lastIndexOf("/")), j.lookup[b] ? i() : a.ScriptLoader.add(k, i, g, h))
            }
        }, c.PluginManager = new c, c.ThemeManager = new c, c
    }), g("1j", [], function() {
        function a(a) {
            return function(b) {
                return !!b && b.nodeType == a
            }
        }

        function b(a) {
            return a = a.toLowerCase().split(" "),
                function(b) {
                    var c, d;
                    if (b && b.nodeType)
                        for (d = b.nodeName.toLowerCase(), c = 0; c < a.length; c++)
                            if (d === a[c]) return !0;
                    return !1
                }
        }

        function c(a, b) {
            return b = b.toLowerCase().split(" "),
                function(c) {
                    var d, e;
                    if (i(c))
                        for (d = 0; d < b.length; d++)
                            if (e = c.ownerDocument.defaultView.getComputedStyle(c, null).getPropertyValue(a), e === b[d]) return !0;
                    return !1
                }
        }

        function d(a, b) {
            return function(c) {
                return i(c) && c[a] === b
            }
        }

        function e(a, b) {
            return function(b) {
                return i(b) && b.hasAttribute(a)
            }
        }

        function f(a, b) {
            return function(c) {
                return i(c) && c.getAttribute(a) === b
            }
        }

        function g(a) {
            return i(a) && a.hasAttribute("data-mce-bogus")
        }

        function h(a) {
            return function(b) {
                if (i(b)) {
                    if (b.contentEditable === a) return !0;
                    if (b.getAttribute("data-mce-contenteditable") === a) return !0
                }
                return !1
            }
        }
        var i = a(1);
        return {
            isText: a(3),
            isElement: i,
            isComment: a(8),
            isBr: b("br"),
            isContentEditableTrue: h("true"),
            isContentEditableFalse: h("false"),
            matchNodeNames: b,
            hasPropValue: d,
            hasAttribute: e,
            hasAttributeValue: f,
            matchStyleValues: c,
            isBogus: g
        }
    }), g("1l", [], function() {
        var a = "\ufeff",
            b = function(b) {
                return b === a
            },
            c = function(b) {
                return b.replace(new RegExp(a, "g"), "")
            };
        return {
            isZwsp: b,
            ZWSP: a,
            trim: c
        }
    }), g("1k", ["1j", "1l"], function(a, b) {
        function c(a) {
            return n(a) && (a = a.parentNode), m(a) && a.hasAttribute("data-mce-caret")
        }

        function d(a) {
            return n(a) && b.isZwsp(a.data)
        }

        function e(a) {
            return c(a) || d(a)
        }

        function f(a, c) {
            var d, f, g, h;
            if (d = a.ownerDocument, g = d.createTextNode(b.ZWSP), h = a.parentNode, c) {
                if (f = a.previousSibling, n(f)) {
                    if (e(f)) return f;
                    if (j(f)) return f.splitText(f.data.length - 1)
                }
                h.insertBefore(g, a)
            } else {
                if (f = a.nextSibling, n(f)) {
                    if (e(f)) return f;
                    if (i(f)) return f.splitText(1), f
                }
                a.nextSibling ? h.insertBefore(g, a.nextSibling) : h.appendChild(g)
            }
            return g
        }

        function g() {
            var a = document.createElement("br");
            return a.setAttribute("data-mce-bogus", "1"), a
        }

        function h(a, b, c) {
            var d, e, f;
            return d = b.ownerDocument, e = d.createElement(a), e.setAttribute("data-mce-caret", c ? "before" : "after"), e.setAttribute("data-mce-bogus", "all"), e.appendChild(g()), f = b.parentNode, c ? f.insertBefore(e, b) : b.nextSibling ? f.insertBefore(e, b.nextSibling) : f.appendChild(e), e
        }

        function i(a) {
            return n(a) && a.data[0] == b.ZWSP
        }

        function j(a) {
            return n(a) && a.data[a.data.length - 1] == b.ZWSP
        }

        function k(b) {
            var c = b.getElementsByTagName("br"),
                d = c[c.length - 1];
            a.isBogus(d) && d.parentNode.removeChild(d)
        }

        function l(a) {
            return a && a.hasAttribute("data-mce-caret") ? (k(a), a.removeAttribute("data-mce-caret"), a.removeAttribute("data-mce-bogus"), a.removeAttribute("style"), a.removeAttribute("_moz_abspos"), a) : null
        }
        var m = a.isElement,
            n = a.isText,
            o = function(b) {
                return b.firstChild !== b.lastChild || !a.isBr(b.firstChild)
            },
            p = function(c) {
                if (a.isText(c)) {
                    var d = c.data;
                    return d.length > 0 && d.charAt(0) !== b.ZWSP && c.insertData(0, b.ZWSP), c
                }
                return null
            },
            q = function(c) {
                if (a.isText(c)) {
                    var d = c.data;
                    return d.length > 0 && d.charAt(d.length - 1) !== b.ZWSP && c.insertData(d.length, b.ZWSP), c
                }
                return null
            },
            r = function(c) {
                return c && a.isText(c.container()) && c.container().data.charAt(c.offset()) === b.ZWSP
            },
            s = function(c) {
                return c && a.isText(c.container()) && c.container().data.charAt(c.offset() - 1) === b.ZWSP
            };
        return {
            isCaretContainer: e,
            isCaretContainerBlock: c,
            isCaretContainerInline: d,
            showCaretContainerBlock: l,
            insertInline: f,
            prependInline: p,
            appendInline: q,
            isBeforeInline: r,
            isAfterInline: s,
            insertBlock: h,
            hasContent: o,
            startsWithCaretContainer: i,
            endsWithCaretContainer: j
        }
    }), g("h", ["9", "c", "1j", "1h", "1k"], function(a, b, c, d, e) {
        function f(a) {
            return q(a) || r(a)
        }

        function g(a, b) {
            var c = a.childNodes;
            return b--, b > c.length - 1 ? b = c.length - 1 : b < 0 && (b = 0), c[b] || a
        }

        function h(a, b, c) {
            for (; a && a !== b;) {
                if (c(a)) return a;
                a = a.parentNode
            }
            return null
        }

        function i(a, b, c) {
            return null !== h(a, b, c)
        }

        function j(a, b, c) {
            return i(a, b, function(a) {
                return a.nodeName === c
            })
        }

        function k(a) {
            return "_mce_caret" === a.id
        }

        function l(a, b) {
            return s(a) && i(a, b, k) === !1
        }

        function m(a) {
            this.walk = function(b, c) {
                function d(a) {
                    var b;
                    return b = a[0], 3 === b.nodeType && b === q && r >= b.nodeValue.length && a.splice(0, 1), b = a[a.length - 1], 0 === t && a.length > 0 && b === s && 3 === b.nodeType && a.splice(a.length - 1, 1), a
                }

                function e(a, b, c) {
                    for (var d = []; a && a != c; a = a[b]) d.push(a);
                    return d
                }

                function f(a, b) {
                    do {
                        if (a.parentNode == b) return a;
                        a = a.parentNode
                    } while (a)
                }

                function h(a, b, f) {
                    var g = f ? "nextSibling" : "previousSibling";
                    for (l = a, m = l.parentNode; l && l != b; l = m) m = l.parentNode, n = e(l == a ? l : l[g], g), n.length && (f || n.reverse(), c(d(n)))
                }
                var i, j, k, l, m, n, o, q = b.startContainer,
                    r = b.startOffset,
                    s = b.endContainer,
                    t = b.endOffset;
                if (o = a.select("td[data-mce-selected],th[data-mce-selected]"), o.length > 0) return void p(o, function(a) {
                    c([a])
                });
                if (1 == q.nodeType && q.hasChildNodes() && (q = q.childNodes[r]), 1 == s.nodeType && s.hasChildNodes() && (s = g(s, t)), q == s) return c(d([q]));
                for (i = a.findCommonAncestor(q, s), l = q; l; l = l.parentNode) {
                    if (l === s) return h(q, i, !0);
                    if (l === i) break
                }
                for (l = s; l; l = l.parentNode) {
                    if (l === q) return h(s, i);
                    if (l === i) break
                }
                j = f(q, i) || q, k = f(s, i) || s, h(q, j, !0), n = e(j == q ? j : j.nextSibling, "nextSibling", k == s ? k.nextSibling : k), n.length && c(d(n)), h(s, k)
            }, this.split = function(a) {
                function b(a, b) {
                    return a.splitText(b)
                }
                var c = a.startContainer,
                    d = a.startOffset,
                    e = a.endContainer,
                    f = a.endOffset;
                return c == e && 3 == c.nodeType ? d > 0 && d < c.nodeValue.length && (e = b(c, d), c = e.previousSibling, f > d ? (f -= d, c = e = b(e, f).previousSibling, f = e.nodeValue.length, d = 0) : f = 0) : (3 == c.nodeType && d > 0 && d < c.nodeValue.length && (c = b(c, d), d = 0), 3 == e.nodeType && f > 0 && f < e.nodeValue.length && (e = b(e, f).previousSibling, f = e.nodeValue.length)), {
                    startContainer: c,
                    startOffset: d,
                    endContainer: e,
                    endOffset: f
                }
            }, this.normalize = function(c) {
                function d(d) {
                    function g(a) {
                        return a && /^(TD|TH|CAPTION)$/.test(a.nodeName)
                    }

                    function h(c, d) {
                        for (var e = new b(c, a.getParent(c.parentNode, a.isBlock) || w); c = e[d ? "prev" : "next"]();)
                            if ("BR" === c.nodeName) return !0
                    }

                    function i(a) {
                        for (; a && a != w;) {
                            if (r(a)) return !0;
                            a = a.parentNode
                        }
                        return !1
                    }

                    function k(a, b) {
                        return a.previousSibling && a.previousSibling.nodeName == b
                    }

                    function m(c, d) {
                        var g, h, i;
                        if (d = d || n, i = a.getParent(d.parentNode, a.isBlock) || w, c && "BR" == d.nodeName && v && a.isEmpty(i)) return n = d.parentNode, o = a.nodeIndex(d), void(f = !0);
                        for (g = new b(d, i); q = g[c ? "prev" : "next"]();) {
                            if ("false" === a.getContentEditableParent(q) || l(q, a.getRoot())) return;
                            if (3 === q.nodeType && q.nodeValue.length > 0) return void(j(q, w, "A") === !1 && (n = q, o = c ? q.nodeValue.length : 0, f = !0));
                            if (a.isBlock(q) || t[q.nodeName.toLowerCase()]) return;
                            h = q
                        }
                        e && h && (n = h, f = !0, o = 0)
                    }
                    var n, o, p, q, t, u, v, w = a.getRoot();
                    if (n = c[(d ? "start" : "end") + "Container"], o = c[(d ? "start" : "end") + "Offset"], v = 1 == n.nodeType && o === n.childNodes.length, t = a.schema.getNonEmptyElements(), u = d, !s(n)) {
                        if (1 == n.nodeType && o > n.childNodes.length - 1 && (u = !1), 9 === n.nodeType && (n = a.getRoot(), o = 0), n === w) {
                            if (u && (q = n.childNodes[o > 0 ? o - 1 : 0])) {
                                if (s(q)) return;
                                if (t[q.nodeName] || "TABLE" == q.nodeName) return
                            }
                            if (n.hasChildNodes()) {
                                if (o = Math.min(!u && o > 0 ? o - 1 : o, n.childNodes.length - 1), n = n.childNodes[o], o = 0, !e && n === w.lastChild && "TABLE" === n.nodeName) return;
                                if (i(n) || s(n)) return;
                                if (n.hasChildNodes() && !/TABLE/.test(n.nodeName)) {
                                    q = n, p = new b(n, w);
                                    do {
                                        if (r(q) || s(q)) {
                                            f = !1;
                                            break
                                        }
                                        if (3 === q.nodeType && q.nodeValue.length > 0) {
                                            o = u ? 0 : q.nodeValue.length, n = q, f = !0;
                                            break
                                        }
                                        if (t[q.nodeName.toLowerCase()] && !g(q)) {
                                            o = a.nodeIndex(q), n = q.parentNode, "IMG" != q.nodeName || u || o++, f = !0;
                                            break
                                        }
                                    } while (q = u ? p.next() : p.prev())
                                }
                            }
                        }
                        e && (3 === n.nodeType && 0 === o && m(!0), 1 === n.nodeType && (q = n.childNodes[o], q || (q = n.childNodes[o - 1]), !q || "BR" !== q.nodeName || k(q, "A") || h(q) || h(q, !0) || m(!0, q))), u && !e && 3 === n.nodeType && o === n.nodeValue.length && m(!1), f && c["set" + (d ? "Start" : "End")](n, o)
                    }
                }
                var e, f = !1;
                return e = c.collapsed, d(!0), e || d(), f && e && c.collapse(!0), f
            }
        }

        function n(b, c, d) {
            var e, f, g;
            if (e = d.elementFromPoint(b, c), f = d.body.createTextRange(), e && "HTML" != e.tagName || (e = d.body), f.moveToElementText(e), g = a.toArray(f.getClientRects()), g = g.sort(function(a, b) {
                    return a = Math.abs(Math.max(a.top - c, a.bottom - c)), b = Math.abs(Math.max(b.top - c, b.bottom - c)), a - b
                }), g.length > 0) {
                c = (g[0].bottom + g[0].top) / 2;
                try {
                    return f.moveToPoint(b, c), f.collapse(!0), f
                } catch (a) {}
            }
            return null
        }

        function o(a, b) {
            var c = a && a.parentElement ? a.parentElement() : null;
            return r(h(c, b, f)) ? null : a
        }
        var p = a.each,
            q = c.isContentEditableTrue,
            r = c.isContentEditableFalse,
            s = e.isCaretContainer;
        return m.compareRanges = function(a, b) {
            if (a && b) {
                if (!a.item && !a.duplicate) return a.startContainer == b.startContainer && a.startOffset == b.startOffset;
                if (a.item && b.item && a.item(0) === b.item(0)) return !0;
                if (a.isEqual && b.isEqual && b.isEqual(a)) return !0
            }
            return !1
        }, m.getCaretRangeFromPoint = function(a, b, c) {
            var d, e;
            if (c.caretPositionFromPoint) e = c.caretPositionFromPoint(a, b), d = c.createRange(), d.setStart(e.offsetNode, e.offset), d.collapse(!0);
            else if (c.caretRangeFromPoint) d = c.caretRangeFromPoint(a, b);
            else if (c.body.createTextRange) {
                d = c.body.createTextRange();
                try {
                    d.moveToPoint(a, b), d.collapse(!0)
                } catch (e) {
                    d = n(a, b, c)
                }
                return o(d, c.body)
            }
            return d
        }, m.getSelectedNode = function(a) {
            var b = a.startContainer,
                c = a.startOffset;
            return b.hasChildNodes() && a.endOffset == c + 1 ? b.childNodes[c] : null
        }, m.getNode = function(a, b) {
            return 1 == a.nodeType && a.hasChildNodes() && (b >= a.childNodes.length && (b = a.childNodes.length - 1), a = a.childNodes[b]), a
        }, m
    }), g("i", [], function() {
        function a(a, b, c) {
            var d, e, f = c ? "lastChild" : "firstChild",
                g = c ? "prev" : "next";
            if (a[f]) return a[f];
            if (a !== b) {
                if (d = a[g]) return d;
                for (e = a.parent; e && e !== b; e = e.parent)
                    if (d = e[g]) return d
            }
        }

        function b(a, b) {
            this.name = a, this.type = b, 1 === b && (this.attributes = [], this.attributes.map = {})
        }
        var c = /^[ \t\r\n]*$/,
            d = {
                "#text": 3,
                "#comment": 8,
                "#cdata": 4,
                "#pi": 7,
                "#doctype": 10,
                "#document-fragment": 11
            };
        return b.prototype = {
            replace: function(a) {
                var b = this;
                return a.parent && a.remove(), b.insert(a, b), b.remove(), b
            },
            attr: function(a, b) {
                var c, d, e, f = this;
                if ("string" != typeof a) {
                    for (d in a) f.attr(d, a[d]);
                    return f
                }
                if (c = f.attributes) {
                    if (b !== e) {
                        if (null === b) {
                            if (a in c.map)
                                for (delete c.map[a], d = c.length; d--;)
                                    if (c[d].name === a) return c = c.splice(d, 1), f;
                            return f
                        }
                        if (a in c.map) {
                            for (d = c.length; d--;)
                                if (c[d].name === a) {
                                    c[d].value = b;
                                    break
                                }
                        } else c.push({
                            name: a,
                            value: b
                        });
                        return c.map[a] = b, f
                    }
                    return c.map[a]
                }
            },
            clone: function() {
                var a, c, d, e, f, g = this,
                    h = new b(g.name, g.type);
                if (d = g.attributes) {
                    for (f = [], f.map = {}, a = 0, c = d.length; a < c; a++) e = d[a], "id" !== e.name && (f[f.length] = {
                        name: e.name,
                        value: e.value
                    }, f.map[e.name] = e.value);
                    h.attributes = f
                }
                return h.value = g.value, h.shortEnded = g.shortEnded, h
            },
            wrap: function(a) {
                var b = this;
                return b.parent.insert(a, b), a.append(b), b
            },
            unwrap: function() {
                var a, b, c = this;
                for (a = c.firstChild; a;) b = a.next, c.insert(a, c, !0), a = b;
                c.remove()
            },
            remove: function() {
                var a = this,
                    b = a.parent,
                    c = a.next,
                    d = a.prev;
                return b && (b.firstChild === a ? (b.firstChild = c, c && (c.prev = null)) : d.next = c, b.lastChild === a ? (b.lastChild = d, d && (d.next = null)) : c.prev = d, a.parent = a.next = a.prev = null), a
            },
            append: function(a) {
                var b, c = this;
                return a.parent && a.remove(), b = c.lastChild, b ? (b.next = a, a.prev = b, c.lastChild = a) : c.lastChild = c.firstChild = a, a.parent = c, a
            },
            insert: function(a, b, c) {
                var d;
                return a.parent && a.remove(), d = b.parent || this, c ? (b === d.firstChild ? d.firstChild = a : b.prev.next = a, a.prev = b.prev, a.next = b, b.prev = a) : (b === d.lastChild ? d.lastChild = a : b.next.prev = a, a.next = b.next, a.prev = b, b.next = a), a.parent = d, a
            },
            getAll: function(b) {
                var c, d = this,
                    e = [];
                for (c = d.firstChild; c; c = a(c, d)) c.name === b && e.push(c);
                return e
            },
            empty: function() {
                var b, c, d, e = this;
                if (e.firstChild) {
                    for (b = [], d = e.firstChild; d; d = a(d, e)) b.push(d);
                    for (c = b.length; c--;) d = b[c], d.parent = d.firstChild = d.lastChild = d.next = d.prev = null
                }
                return e.firstChild = e.lastChild = null, e
            },
            isEmpty: function(b, d) {
                var e, f, g = this,
                    h = g.firstChild;
                if (d = d || {}, h)
                    do {
                        if (1 === h.type) {
                            if (h.attributes.map["data-mce-bogus"]) continue;
                            if (b[h.name]) return !1;
                            for (e = h.attributes.length; e--;)
                                if (f = h.attributes[e].name, "name" === f || 0 === f.indexOf("data-mce-bookmark")) return !1
                        }
                        if (8 === h.type) return !1;
                        if (3 === h.type && !c.test(h.value)) return !1;
                        if (3 === h.type && h.parent && d[h.parent.name] && c.test(h.value)) return !1
                    } while (h = a(h, g));
                return !0
            },
            walk: function(b) {
                return a(this, null, b)
            }
        }, b.create = function(a, c) {
            var e, f;
            if (e = new b(a, d[a] || 1), c)
                for (f in c) e.attr(f, c[f]);
            return e
        }, b
    }), g("k", ["j", "d", "9"], function(a, b, c) {
        function d(a, b, c) {
            var d, e, f, g, h = 1;
            for (g = a.getShortEndedElements(), f = /<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g, f.lastIndex = d = c; e = f.exec(b);) {
                if (d = f.lastIndex, "/" === e[1]) h--;
                else if (!e[1]) {
                    if (e[2] in g) continue;
                    h++
                }
                if (0 === h) break
            }
            return d
        }

        function e(e, i) {
            function j() {}
            var k = this;
            e = e || {}, k.schema = i = i || new a, e.fix_self_closing !== !1 && (e.fix_self_closing = !0), f("comment cdata text start end pi doctype".split(" "), function(a) {
                a && (k[a] = e[a] || j)
            }), k.parse = function(a) {
                function f(a) {
                    var b, c;
                    for (b = Q.length; b-- && Q[b].name !== a;);
                    if (b >= 0) {
                        for (c = Q.length - 1; c >= b; c--) a = Q[c], a.valid && O.end(a.name);
                        Q.length = b
                    }
                }

                function j(a, b, c, d, f) {
                    var h, i, j = /[\s\u0000-\u001F]+/g;
                    if (b = b.toLowerCase(), c = b in u ? b : S(c || d || f || ""), w && !r && g(b) === !1) {
                        if (h = B[b], !h && C) {
                            for (i = C.length; i-- && (h = C[i], !h.pattern.test(b)););
                            i === -1 && (h = null)
                        }
                        if (!h) return;
                        if (h.validValues && !(c in h.validValues)) return
                    }
                    if (T[b] && !e.allow_script_urls) {
                        var k = c.replace(j, "");
                        try {
                            k = decodeURIComponent(k)
                        } catch (a) {
                            k = unescape(k)
                        }
                        if (U.test(k)) return;
                        if (!e.allow_html_data_urls && V.test(k) && !/^data:image\//i.test(k)) return
                    }
                    r && (b in T || 0 === b.indexOf("on")) || (n.map[b] = c, n.push({
                        name: b,
                        value: c
                    }))
                }
                var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = this,
                    P = 0,
                    Q = [],
                    R = 0,
                    S = b.decode,
                    T = c.makeMap("src,href,data,background,formaction,poster"),
                    U = /((java|vb)script|mhtml):/i,
                    V = /^data:/i;
                for (J = new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)>)|(?:([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))", "g"), K = /([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g, t = i.getShortEndedElements(), I = e.self_closing_elements || i.getSelfClosingElements(), u = i.getBoolAttrs(), w = e.validate, s = e.remove_internals, N = e.fix_self_closing, L = i.getSpecialElements(), G = a + ">"; k = J.exec(G);) {
                    if (P < k.index && O.text(S(a.substr(P, k.index - P))), l = k[6]) l = l.toLowerCase(), ":" === l.charAt(0) && (l = l.substr(1)), f(l);
                    else if (l = k[7]) {
                        if (k.index + k[0].length > a.length) {
                            O.text(S(a.substr(k.index))), P = k.index + k[0].length;
                            continue
                        }
                        if (l = l.toLowerCase(), ":" === l.charAt(0) && (l = l.substr(1)), v = l in t, N && I[l] && Q.length > 0 && Q[Q.length - 1].name === l && f(l), !w || (x = i.getElementRule(l))) {
                            if (y = !0, w && (B = x.attributes, C = x.attributePatterns), (A = k[8]) ? (r = A.indexOf("data-mce-type") !== -1, r && s && (y = !1), n = [], n.map = {}, A.replace(K, j)) : (n = [], n.map = {}), w && !r) {
                                if (D = x.attributesRequired, E = x.attributesDefault, F = x.attributesForced, H = x.removeEmptyAttrs, H && !n.length && (y = !1), F)
                                    for (o = F.length; o--;) z = F[o], q = z.name, M = z.value, "{$uid}" === M && (M = "mce_" + R++), n.map[q] = M, n.push({
                                        name: q,
                                        value: M
                                    });
                                if (E)
                                    for (o = E.length; o--;) z = E[o], q = z.name, q in n.map || (M = z.value, "{$uid}" === M && (M = "mce_" + R++), n.map[q] = M, n.push({
                                        name: q,
                                        value: M
                                    }));
                                if (D) {
                                    for (o = D.length; o-- && !(D[o] in n.map););
                                    o === -1 && (y = !1)
                                }
                                if (z = n.map["data-mce-bogus"]) {
                                    if ("all" === z) {
                                        P = d(i, a, J.lastIndex), J.lastIndex = P;
                                        continue
                                    }
                                    y = !1
                                }
                            }
                            y && O.start(l, n, v)
                        } else y = !1;
                        if (m = L[l]) {
                            m.lastIndex = P = k.index + k[0].length, (k = m.exec(a)) ? (y && (p = a.substr(P, k.index - P)), P = k.index + k[0].length) : (p = a.substr(P), P = a.length), y && (p.length > 0 && O.text(p, !0), O.end(l)), J.lastIndex = P;
                            continue
                        }
                        v || (A && A.indexOf("/") == A.length - 1 ? y && O.end(l) : Q.push({
                            name: l,
                            valid: y
                        }))
                    } else(l = k[1]) ? (">" === l.charAt(0) && (l = " " + l), e.allow_conditional_comments || "[if" !== l.substr(0, 3).toLowerCase() || (l = " " + l), O.comment(l)) : (l = k[2]) ? O.cdata(h(l)) : (l = k[3]) ? O.doctype(l) : (l = k[4]) && O.pi(l, k[5]);
                    P = k.index + k[0].length
                }
                for (P < a.length && O.text(S(a.substr(P))), o = Q.length - 1; o >= 0; o--) l = Q[o], l.valid && O.end(l.name)
            }
        }
        var f = c.each,
            g = function(a) {
                return 0 === a.indexOf("data-") || 0 === a.indexOf("aria-")
            },
            h = function(a) {
                return a.replace(/<!--|-->/g, "")
            };
        return e.findEndTag = d, e
    }), g("l", ["i", "j", "k", "9"], function(a, b, c, d) {
        var e = d.makeMap,
            f = d.each,
            g = d.explode,
            h = d.extend,
            i = function(b, c) {
                b.padd_empty_with_br ? c.empty().append(new a("br", "1")).shortEnded = !0 : c.empty().append(new a("#text", "3")).value = "\xa0"
            },
            j = function(a, b) {
                return a && a.firstChild === a.lastChild && a.firstChild.name === b
            };
        return function(k, l) {
            function m(b) {
                var c, d, f, g, h, i, k, m, o, p, q, r, s, t, u, v;
                for (r = e("tr,td,th,tbody,thead,tfoot,table"), p = l.getNonEmptyElements(), q = l.getWhiteSpaceElements(), s = l.getTextBlockElements(), t = l.getSpecialElements(), c = 0; c < b.length; c++)
                    if (d = b[c], d.parent && !d.fixed)
                        if (s[d.name] && "li" == d.parent.name) {
                            for (u = d.next; u && s[u.name];) u.name = "li", u.fixed = !0, d.parent.insert(u, d.parent), u = u.next;
                            d.unwrap(d)
                        } else {
                            for (g = [d], f = d.parent; f && !l.isValidChild(f.name, d.name) && !r[f.name]; f = f.parent) g.push(f);
                            if (f && g.length > 1) {
                                for (g.reverse(), h = i = n.filterNode(g[0].clone()), o = 0; o < g.length - 1; o++) {
                                    for (l.isValidChild(i.name, g[o].name) ? (k = n.filterNode(g[o].clone()), i.append(k)) : k = i, m = g[o].firstChild; m && m != g[o + 1];) v = m.next, k.append(m), m = v;
                                    i = k
                                }
                                h.isEmpty(p, q) ? f.insert(d, g[0], !0) : (f.insert(h, g[0], !0), f.insert(d, h)), f = g[0], (f.isEmpty(p, q) || j(f, "br")) && f.empty().remove()
                            } else if (d.parent) {
                                if ("li" === d.name) {
                                    if (u = d.prev, u && ("ul" === u.name || "ul" === u.name)) {
                                        u.append(d);
                                        continue
                                    }
                                    if (u = d.next, u && ("ul" === u.name || "ul" === u.name)) {
                                        u.insert(d, u.firstChild, !0);
                                        continue
                                    }
                                    d.wrap(n.filterNode(new a("ul", 1)));
                                    continue
                                }
                                l.isValidChild(d.parent.name, "div") && l.isValidChild("div", d.name) ? d.wrap(n.filterNode(new a("div", 1))) : t[d.name] ? d.empty().remove() : d.unwrap()
                            }
                        }
            }
            var n = this,
                o = {},
                p = [],
                q = {},
                r = {};
            k = k || {}, k.validate = !("validate" in k) || k.validate, k.root_name = k.root_name || "body", n.schema = l = l || new b, n.filterNode = function(a) {
                var b, c, d;
                c in o && (d = q[c], d ? d.push(a) : q[c] = [a]), b = p.length;
                for (; b--;) c = p[b].name, c in a.attributes.map && (d = r[c], d ? d.push(a) : r[c] = [a]);
                return a
            }, n.addNodeFilter = function(a, b) {
                f(g(a), function(a) {
                    var c = o[a];
                    c || (o[a] = c = []), c.push(b)
                })
            }, n.addAttributeFilter = function(a, b) {
                f(g(a), function(a) {
                    var c;
                    for (c = 0; c < p.length; c++)
                        if (p[c].name === a) return void p[c].callbacks.push(b);
                    p.push({
                        name: a,
                        callbacks: [b]
                    })
                })
            }, n.parse = function(b, d) {
                function f() {
                    function a(a) {
                        a && (d = a.firstChild, d && 3 == d.type && (d.value = d.value.replace(E, "")), d = a.lastChild, d && 3 == d.type && (d.value = d.value.replace(G, "")))
                    }
                    var b, c, d = t.firstChild;
                    if (l.isValidChild(t.name, M.toLowerCase())) {
                        for (; d;) b = d.next, 3 == d.type || 1 == d.type && "p" !== d.name && !D[d.name] && !d.attr("data-mce-type") ? c ? c.append(d) : (c = g(M, 1), c.attr(k.forced_root_block_attrs), t.insert(c, d), c.append(d)) : (a(c), c = null), d = b;
                        a(c)
                    }
                }

                function g(b, c) {
                    var d, e = new a(b, c);
                    return b in o && (d = q[b], d ? d.push(e) : q[b] = [e]), e
                }

                function j(a) {
                    var b, c, d, e, f = l.getBlockElements();
                    for (b = a.prev; b && 3 === b.type;) {
                        if (d = b.value.replace(G, ""), d.length > 0) return void(b.value = d);
                        if (c = b.next) {
                            if (3 == c.type && c.value.length) {
                                b = b.prev;
                                continue
                            }
                            if (!f[c.name] && "script" != c.name && "style" != c.name) {
                                b = b.prev;
                                continue
                            }
                        }
                        e = b.prev, b.remove(), b = e
                    }
                }

                function n(a) {
                    var b, c = {};
                    for (b in a) "li" !== b && "p" != b && (c[b] = a[b]);
                    return c
                }
                var s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = [];
                if (d = d || {}, q = {}, r = {}, D = h(e("script,style,head,html,body,title,meta,param"), l.getBlockElements()), L = l.getNonEmptyElements(), K = l.children, C = k.validate, M = "forced_root_block" in d ? d.forced_root_block : k.forced_root_block, J = l.getWhiteSpaceElements(), E = /^[ \t\r\n]+/, G = /[ \t\r\n]+$/, H = /[ \t\r\n]+/g, I = /^[ \t\r\n]+$/, s = new c({
                        validate: C,
                        allow_script_urls: k.allow_script_urls,
                        allow_conditional_comments: k.allow_conditional_comments,
                        self_closing_elements: n(l.getSelfClosingElements()),
                        cdata: function(a) {
                            u.append(g("#cdata", 4)).value = a
                        },
                        text: function(a, b) {
                            var c;
                            F || (a = a.replace(H, " "), u.lastChild && D[u.lastChild.name] && (a = a.replace(E, ""))), 0 !== a.length && (c = g("#text", 3), c.raw = !!b, u.append(c).value = a)
                        },
                        comment: function(a) {
                            u.append(g("#comment", 8)).value = a
                        },
                        pi: function(a, b) {
                            u.append(g(a, 7)).value = b, j(u)
                        },
                        doctype: function(a) {
                            var b;
                            b = u.append(g("#doctype", 10)), b.value = a, j(u)
                        },
                        start: function(a, b, c) {
                            var d, e, f, h, i;
                            if (f = C ? l.getElementRule(a) : {}) {
                                for (d = g(f.outputName || a, 1), d.attributes = b, d.shortEnded = c, u.append(d), i = K[u.name], i && K[d.name] && !i[d.name] && N.push(d), e = p.length; e--;) h = p[e].name, h in b.map && (A = r[h], A ? A.push(d) : r[h] = [d]);
                                D[a] && j(d), c || (u = d), !F && J[a] && (F = !0)
                            }
                        },
                        end: function(a) {
                            var b, c, d, e, f;
                            if (c = C ? l.getElementRule(a) : {}) {
                                if (D[a] && !F) {
                                    if (b = u.firstChild, b && 3 === b.type)
                                        if (d = b.value.replace(E, ""), d.length > 0) b.value = d, b = b.next;
                                        else
                                            for (e = b.next, b.remove(), b = e; b && 3 === b.type;) d = b.value, e = b.next, (0 === d.length || I.test(d)) && (b.remove(), b = e), b = e;
                                    if (b = u.lastChild, b && 3 === b.type)
                                        if (d = b.value.replace(G, ""), d.length > 0) b.value = d, b = b.prev;
                                        else
                                            for (e = b.prev, b.remove(), b = e; b && 3 === b.type;) d = b.value, e = b.prev, (0 === d.length || I.test(d)) && (b.remove(), b = e), b = e
                                }
                                if (F && J[a] && (F = !1), (c.removeEmpty || c.paddEmpty) && u.isEmpty(L, J))
                                    if (c.paddEmpty) i(k, u);
                                    else if (!u.attributes.map.name && !u.attributes.map.id) return f = u.parent, D[u.name] ? u.empty().remove() : u.unwrap(), void(u = f);
                                u = u.parent
                            }
                        }
                    }, l), t = u = new a(d.context || k.root_name, 11), s.parse(b), C && N.length && (d.context ? d.invalid = !0 : m(N)), M && ("body" == t.name || d.isRootContent) && f(), !d.invalid) {
                    for (B in q) {
                        for (A = o[B], v = q[B], y = v.length; y--;) v[y].parent || v.splice(y, 1);
                        for (w = 0, x = A.length; w < x; w++) A[w](v, B, d)
                    }
                    for (w = 0, x = p.length; w < x; w++)
                        if (A = p[w], A.name in r) {
                            for (v = r[A.name], y = v.length; y--;) v[y].parent || v.splice(y, 1);
                            for (y = 0, z = A.callbacks.length; y < z; y++) A.callbacks[y](v, A.name, d)
                        }
                }
                return t
            }, k.remove_trailing_brs && n.addNodeFilter("br", function(b) {
                var c, d, e, f, g, j, m, n, o = b.length,
                    p = h({}, l.getBlockElements()),
                    q = l.getNonEmptyElements(),
                    r = l.getNonEmptyElements();
                for (p.body = 1, c = 0; c < o; c++)
                    if (d = b[c], e = d.parent, p[d.parent.name] && d === e.lastChild) {
                        for (g = d.prev; g;) {
                            if (j = g.name, "span" !== j || "bookmark" !== g.attr("data-mce-type")) {
                                if ("br" !== j) break;
                                if ("br" === j) {
                                    d = null;
                                    break
                                }
                            }
                            g = g.prev
                        }
                        d && (d.remove(), e.isEmpty(q, r) && (m = l.getElementRule(e.name), m && (m.removeEmpty ? e.remove() : m.paddEmpty && i(k, e))))
                    } else {
                        for (f = d; e && e.firstChild === f && e.lastChild === f && (f = e, !p[e.name]);) e = e.parent;
                        f === e && k.padd_empty_with_br !== !0 && (n = new a("#text", 3), n.value = "\xa0", d.replace(n))
                    }
            }), n.addAttributeFilter("href", function(a) {
                var b, c = a.length,
                    e = function(a) {
                        var b = a.split(" ").filter(function(a) {
                            return a.length > 0
                        });
                        return b.concat(["noopener"]).sort().join(" ")
                    },
                    f = function(a) {
                        var b = a ? d.trim(a) : "";
                        return /\b(noopener)\b/g.test(b) ? b : e(b)
                    };
                if (!k.allow_unsafe_link_target)
                    for (; c--;) b = a[c], "a" === b.name && "_blank" === b.attr("target") && b.attr("rel", f(b.attr("rel")))
            }), k.allow_html_in_named_anchor || n.addAttributeFilter("id,name", function(a) {
                for (var b, c, d, e, f = a.length; f--;)
                    if (e = a[f], "a" === e.name && e.firstChild && !e.attr("href")) {
                        d = e.parent, b = e.lastChild;
                        do c = b.prev, d.insert(b, e), b = c; while (b)
                    }
            }), k.fix_list_elements && n.addNodeFilter("ul,ol", function(b) {
                for (var c, d, e = b.length; e--;)
                    if (c = b[e], d = c.parent, "ul" === d.name || "ol" === d.name)
                        if (c.prev && "li" === c.prev.name) c.prev.append(c);
                        else {
                            var f = new a("li", 1);
                            f.attr("style", "list-style-type: none"), c.wrap(f)
                        }
            }), k.validate && l.getValidClasses() && n.addAttributeFilter("class", function(a) {
                for (var b, c, d, e, f, g, h, i = a.length, j = l.getValidClasses(); i--;) {
                    for (b = a[i], c = b.attr("class").split(" "), f = "", d = 0; d < c.length; d++) e = c[d], h = !1, g = j["*"], g && g[e] && (h = !0), g = j[b.name], !h && g && g[e] && (h = !0), h && (f && (f += " "), f += e);
                    f.length || (f = null), b.attr("class", f)
                }
            })
        }
    }), g("m", ["d", "9"], function(a, b) {
        var c = b.makeMap;
        return function(b) {
            var d, e, f, g, h, i = [];
            return b = b || {}, d = b.indent, e = c(b.indent_before || ""), f = c(b.indent_after || ""), g = a.getEncodeFunc(b.entity_encoding || "raw", b.entities), h = "html" == b.element_format, {
                start: function(a, b, c) {
                    var j, k, l, m;
                    if (d && e[a] && i.length > 0 && (m = i[i.length - 1], m.length > 0 && "\n" !== m && i.push("\n")), i.push("<", a), b)
                        for (j = 0, k = b.length; j < k; j++) l = b[j], i.push(" ", l.name, '="', g(l.value, !0), '"');
                    !c || h ? i[i.length] = ">" : i[i.length] = " />", c && d && f[a] && i.length > 0 && (m = i[i.length - 1], m.length > 0 && "\n" !== m && i.push("\n"))
                },
                end: function(a) {
                    var b;
                    i.push("</", a, ">"), d && f[a] && i.length > 0 && (b = i[i.length - 1], b.length > 0 && "\n" !== b && i.push("\n"))
                },
                text: function(a, b) {
                    a.length > 0 && (i[i.length] = b ? a : g(a))
                },
                cdata: function(a) {
                    i.push("<![CDATA[", a, "]]>")
                },
                comment: function(a) {
                    i.push("<!--", a, "-->")
                },
                pi: function(a, b) {
                    b ? i.push("<?", a, " ", g(b), "?>") : i.push("<?", a, "?>"), d && i.push("\n")
                },
                doctype: function(a) {
                    i.push("<!DOCTYPE", a, ">", d ? "\n" : "")
                },
                reset: function() {
                    i.length = 0
                },
                getContent: function() {
                    return i.join("").replace(/\n$/, "")
                }
            }
        }
    }), g("n", ["m", "j"], function(a, b) {
        return function(c, d) {
            var e = this,
                f = new a(c);
            c = c || {}, c.validate = !("validate" in c) || c.validate, e.schema = d = d || new b, e.writer = f, e.serialize = function(a) {
                function b(a) {
                    var c, h, i, j, k, l, m, n, o, p = e[a.type];
                    if (p) p(a);
                    else {
                        if (c = a.name, h = a.shortEnded, i = a.attributes, g && i && i.length > 1 && (l = [], l.map = {}, o = d.getElementRule(a.name))) {
                            for (m = 0, n = o.attributesOrder.length; m < n; m++) j = o.attributesOrder[m], j in i.map && (k = i.map[j], l.map[j] = k, l.push({
                                name: j,
                                value: k
                            }));
                            for (m = 0, n = i.length; m < n; m++) j = i[m].name, j in l.map || (k = i.map[j], l.map[j] = k, l.push({
                                name: j,
                                value: k
                            }));
                            i = l
                        }
                        if (f.start(a.name, i, h), !h) {
                            if (a = a.firstChild)
                                do b(a); while (a = a.next);
                            f.end(c)
                        }
                    }
                }
                var e, g;
                return g = c.validate, e = {
                    3: function(a) {
                        f.text(a.value, a.raw)
                    },
                    8: function(a) {
                        f.comment(a.value)
                    },
                    7: function(a) {
                        f.pi(a.name, a.value)
                    },
                    10: function(a) {
                        f.doctype(a.value)
                    },
                    4: function(a) {
                        f.cdata(a.value)
                    },
                    11: function(a) {
                        if (a = a.firstChild)
                            do b(a); while (a = a.next)
                    }
                }, f.reset(), 1 != a.type || c.inner ? e[11](a) : b(a), f.getContent()
            }
        }
    }), g("o", ["e", "l", "k", "d", "n", "i", "j", "6", "9", "1l"], function(a, b, c, d, e, f, g, h, i, j) {
        function k(a) {
            function b(a) {
                return a && "br" === a.name
            }
            var c, d;
            c = a.lastChild, b(c) && (d = c.prev, b(d) && (c.remove(), d.remove()))
        }
        var l = i.each,
            m = i.trim,
            n = a.DOM;
        return function(a, f) {
            function o(a) {
                var b = new RegExp(["<span[^>]+data-mce-bogus[^>]+>[\u200b\ufeff]+<\\/span>", "\\s?(" + v.join("|") + ')="[^"]+"'].join("|"), "gi");
                return a = j.trim(a.replace(b, ""))
            }

            function p(a) {
                var b, d, e, g, h, i = a,
                    j = /<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,
                    k = f.schema;
                for (i = o(i), h = k.getShortEndedElements(); g = j.exec(i);) d = j.lastIndex, e = g[0].length, b = h[g[1]] ? d : c.findEndTag(k, i, d), i = i.substring(0, d - e) + i.substring(b), j.lastIndex = d - e;
                return i
            }

            function q() {
                return p(f.getBody().innerHTML)
            }

            function r(a) {
                i.inArray(v, a) === -1 && (u.addAttributeFilter(a, function(a, b) {
                    for (var c = a.length; c--;) a[c].attr(b, null)
                }), v.push(a))
            }
            var s, t, u, v = ["data-mce-selected"];
            return f && (s = f.dom, t = f.schema), s = s || n, t = t || new g(a), a.entity_encoding = a.entity_encoding || "named", a.remove_trailing_brs = !("remove_trailing_brs" in a) || a.remove_trailing_brs, u = new b(a, t), u.addAttributeFilter("data-mce-tabindex", function(a, b) {
                for (var c, d = a.length; d--;) c = a[d], c.attr("tabindex", c.attributes.map["data-mce-tabindex"]), c.attr(b, null)
            }), u.addAttributeFilter("src,href,style", function(b, c) {
                for (var d, e, f, g = b.length, h = "data-mce-" + c, i = a.url_converter, j = a.url_converter_scope; g--;) d = b[g], e = d.attributes.map[h], e !== f ? (d.attr(c, e.length > 0 ? e : null), d.attr(h, null)) : (e = d.attributes.map[c], "style" === c ? e = s.serializeStyle(s.parseStyle(e), d.name) : i && (e = i.call(j, e, c, d.name)), d.attr(c, e.length > 0 ? e : null))
            }), u.addAttributeFilter("class", function(a) {
                for (var b, c, d = a.length; d--;) b = a[d], c = b.attr("class"), c && (c = b.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g, ""), b.attr("class", c.length > 0 ? c : null))
            }), u.addAttributeFilter("data-mce-type", function(a, b, c) {
                for (var d, e = a.length; e--;) d = a[e], "bookmark" !== d.attributes.map["data-mce-type"] || c.cleanup || d.remove()
            }), u.addNodeFilter("noscript", function(a) {
                for (var b, c = a.length; c--;) b = a[c].firstChild, b && (b.value = d.decode(b.value))
            }), u.addNodeFilter("script,style", function(a, b) {
                function c(a) {
                    return a.replace(/(<!--\[CDATA\[|\]\]-->)/g, "\n").replace(/^[\r\n]*|[\r\n]*$/g, "").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, "").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, "")
                }
                for (var d, e, f, g = a.length; g--;) d = a[g], e = d.firstChild ? d.firstChild.value : "", "script" === b ? (f = d.attr("type"), f && d.attr("type", "mce-no/type" == f ? null : f.replace(/^mce\-/, "")), e.length > 0 && (d.firstChild.value = c(e))) : e.length > 0 && (d.firstChild.value = "<!--\n" + c(e) + "\n-->")
            }), u.addNodeFilter("#comment", function(a) {
                for (var b, c = a.length; c--;) b = a[c], 0 === b.value.indexOf("[CDATA[") ? (b.name = "#cdata", b.type = 4, b.value = b.value.replace(/^\[CDATA\[|\]\]$/g, "")) : 0 === b.value.indexOf("mce:protected ") && (b.name = "#text", b.type = 3, b.raw = !0, b.value = unescape(b.value).substr(14))
            }), u.addNodeFilter("xml:namespace,input", function(a, b) {
                for (var c, d = a.length; d--;) c = a[d], 7 === c.type ? c.remove() : 1 === c.type && ("input" !== b || "type" in c.attributes.map || c.attr("type", "text"))
            }), u.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize", function(a, b) {
                for (var c = a.length; c--;) a[c].attr(b, null)
            }), {
                schema: t,
                addNodeFilter: u.addNodeFilter,
                addAttributeFilter: u.addAttributeFilter,
                serialize: function(b, c) {
                    var d, f, g, i, n, o, p = this;
                    return h.ie && s.select("script,style,select,map").length > 0 ? (n = b.innerHTML, b = b.cloneNode(!1), s.setHTML(b, n)) : b = b.cloneNode(!0), d = document.implementation, d.createHTMLDocument && (f = d.createHTMLDocument(""), l("BODY" == b.nodeName ? b.childNodes : [b], function(a) {
                        f.body.appendChild(f.importNode(a, !0))
                    }), b = "BODY" != b.nodeName ? f.body.firstChild : f.body, g = s.doc, s.doc = f), c = c || {}, c.format = c.format || "html", c.selection && (c.forced_root_block = ""), c.no_events || (c.node = b, p.onPreProcess(c)), o = u.parse(m(c.getInner ? b.innerHTML : s.getOuterHTML(b)), c), k(o), i = new e(a, t), c.content = i.serialize(o), c.cleanup || (c.content = j.trim(c.content), c.content = c.content.replace(/\uFEFF/g, "")), c.no_events || p.onPostProcess(c), g && (s.doc = g), c.node = null, c.content
                },
                addRules: function(a) {
                    t.addValidElements(a)
                },
                setRules: function(a) {
                    t.setValidElements(a)
                },
                onPreProcess: function(a) {
                    f && f.fire("PreProcess", a)
                },
                onPostProcess: function(a) {
                    f && f.fire("PostProcess", a)
                },
                addTempAttr: r,
                trimHtml: o,
                getTrimmedContent: q,
                trimContent: p
            }
        }
    }), g("p", ["6"], function(a) {
        return {
            BACKSPACE: 8,
            DELETE: 46,
            DOWN: 40,
            ENTER: 13,
            LEFT: 37,
            RIGHT: 39,
            SPACEBAR: 32,
            TAB: 9,
            UP: 38,
            modifierPressed: function(a) {
                return a.shiftKey || a.ctrlKey || a.altKey || this.metaKeyPressed(a)
            },
            metaKeyPressed: function(b) {
                return a.mac ? b.metaKey : b.ctrlKey && !b.altKey
            }
        }
    }), g("43", [], function() {
        function a(a) {
            return a ? {
                left: k(a.left),
                top: k(a.top),
                bottom: k(a.bottom),
                right: k(a.right),
                width: k(a.width),
                height: k(a.height)
            } : {
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                width: 0,
                height: 0
            }
        }

        function b(b, c) {
            return b = a(b), c ? b.right = b.left : (b.left = b.left + b.width, b.right = b.left), b.width = 0, b
        }

        function c(a, b) {
            return a.left === b.left && a.top === b.top && a.bottom === b.bottom && a.right === b.right
        }

        function d(a, b, c) {
            return a >= 0 && a <= Math.min(b.height, c.height) / 2
        }

        function e(a, b) {
            return a.bottom - a.height / 2 < b.top || !(a.top > b.bottom) && d(b.top - a.bottom, a, b)
        }

        function f(a, b) {
            return a.top > b.bottom || !(a.bottom < b.top) && d(b.bottom - a.top, a, b)
        }

        function g(a, b) {
            return a.left < b.left
        }

        function h(a, b) {
            return a.right > b.right
        }

        function i(a, b) {
            return e(a, b) ? -1 : f(a, b) ? 1 : g(a, b) ? -1 : h(a, b) ? 1 : 0
        }

        function j(a, b, c) {
            return b >= a.left && b <= a.right && c >= a.top && c <= a.bottom
        }
        var k = Math.round;
        return {
            clone: a,
            collapse: b,
            isEqual: c,
            isAbove: e,
            isBelow: f,
            isLeft: g,
            isRight: h,
            compare: i,
            containsXY: j
        }
    }), g("1n", ["3x", "43"], function(a, b) {
        var c = function(c, d, e) {
            return !e.collapsed && a.foldl(e.getClientRects(), function(a, e) {
                return a || b.containsXY(e, c, d)
            }, !1)
        };
        return {
            isXYWithinRange: c
        }
    }), g("q", ["1m", "1j", "1n", "6", "5", "9", "p"], function(a, b, c, d, e, f, g) {
        function h(a, b) {
            for (; b && b != a;) {
                if (j(b) || i(b)) return b;
                b = b.parentNode
            }
            return null
        }
        var i = b.isContentEditableFalse,
            j = b.isContentEditableTrue,
            k = function(a) {
                return a && "IMG" === a.nodeName
            },
            l = function(a, b) {
                return k(a.target) && !c.isXYWithinRange(a.clientX, a.clientY, b)
            },
            m = function(a, b) {
                var c = b.target;
                l(b, a.selection.getRng()) && !b.isDefaultPrevented() && (b.preventDefault(), a.selection.select(c))
            };
        return function(b, c) {
            function j(a) {
                var b = c.settings.object_resizing;
                return b !== !1 && !d.iOS && ("string" != typeof b && (b = "table,img,div"), "false" !== a.getAttribute("data-mce-resize") && (a != c.getBody() && c.dom.is(a, b)))
            }

            function k(a) {
                var b, d, e, f, h;
                b = a.screenX - H, d = a.screenY - I, P = b * F[2] + L, Q = d * F[3] + M, P = P < 5 ? 5 : P, Q = Q < 5 ? 5 : Q, e = "IMG" == B.nodeName && c.settings.resize_img_proportional !== !1 ? !g.modifierPressed(a) : g.modifierPressed(a) || "IMG" == B.nodeName && F[2] * F[3] !== 0, e && (Y(b) > Y(d) ? (Q = Z(P * N), P = Z(Q / N)) : (P = Z(Q / N), Q = Z(P * N))), T.setStyles(C, {
                    width: P,
                    height: Q
                }), f = F.startPos.x + b, h = F.startPos.y + d, f = f > 0 ? f : 0, h = h > 0 ? h : 0, T.setStyles(D, {
                    left: f,
                    top: h,
                    display: "block"
                }), D.innerHTML = P + " &times; " + Q, F[2] < 0 && C.clientWidth <= P && T.setStyle(C, "left", J + (L - P)), F[3] < 0 && C.clientHeight <= Q && T.setStyle(C, "top", K + (M - Q)), b = $.scrollWidth - R, d = $.scrollHeight - S, b + d !== 0 && T.setStyles(D, {
                    left: f - b,
                    top: h - d
                }), O || (c.fire("ObjectResizeStart", {
                    target: B,
                    width: L,
                    height: M
                }), O = !0)
            }

            function l() {
                function a(a, b) {
                    b && (B.style[a] || !c.schema.isValid(B.nodeName.toLowerCase(), a) ? T.setStyle(B, a, b) : T.setAttrib(B, a, b))
                }
                O = !1, a("width", P), a("height", Q), T.unbind(V, "mousemove", k), T.unbind(V, "mouseup", l), W != V && (T.unbind(W, "mousemove", k), T.unbind(W, "mouseup", l)), T.remove(C), T.remove(D), X && "TABLE" != B.nodeName || n(B), c.fire("ObjectResized", {
                    target: B,
                    width: P,
                    height: Q
                }), T.setAttrib(B, "style", T.getAttrib(B, "style")), c.nodeChanged()
            }

            function n(a, b, e) {
                var f, g, h, i, m;
                o(), x(), f = T.getPos(a, $), J = f.x, K = f.y, m = a.getBoundingClientRect(), g = m.width || m.right - m.left, h = m.height || m.bottom - m.top, B != a && (w(), B = a, P = Q = 0), i = c.fire("ObjectSelected", {
                    target: a
                }), j(a) && !i.isDefaultPrevented() ? U(E, function(a, c) {
                    function f(b) {
                        H = b.screenX, I = b.screenY, L = B.clientWidth, M = B.clientHeight, N = M / L, F = a, a.startPos = {
                            x: g * a[0] + J,
                            y: h * a[1] + K
                        }, R = $.scrollWidth, S = $.scrollHeight, C = B.cloneNode(!0), T.addClass(C, "mce-clonedresizable"), T.setAttrib(C, "data-mce-bogus", "all"), C.contentEditable = !1, C.unSelectabe = !0, T.setStyles(C, {
                            left: J,
                            top: K,
                            margin: 0
                        }), C.removeAttribute("data-mce-selected"), $.appendChild(C), T.bind(V, "mousemove", k), T.bind(V, "mouseup", l), W != V && (T.bind(W, "mousemove", k), T.bind(W, "mouseup", l)), D = T.add($, "div", {
                            "class": "mce-resize-helper",
                            "data-mce-bogus": "all"
                        }, L + " &times; " + M)
                    }
                    var i;
                    return b ? void(c == b && f(e)) : (i = T.get("mceResizeHandle" + c), i && T.remove(i), i = T.add($, "div", {
                        id: "mceResizeHandle" + c,
                        "data-mce-bogus": "all",
                        "class": "mce-resizehandle",
                        unselectable: !0,
                        style: "cursor:" + c + "-resize; margin:0; padding:0"
                    }), d.ie && (i.contentEditable = !1), T.bind(i, "mousedown", function(a) {
                        a.stopImmediatePropagation(), a.preventDefault(), f(a)
                    }), a.elm = i, void T.setStyles(i, {
                        left: g * a[0] + J - i.offsetWidth / 2,
                        top: h * a[1] + K - i.offsetHeight / 2
                    }))
                }) : o(), B.setAttribute("data-mce-selected", "1")
            }

            function o() {
                var a, b;
                x(), B && B.removeAttribute("data-mce-selected");
                for (a in E) b = T.get("mceResizeHandle" + a), b && (T.unbind(b), T.remove(b))
            }

            function p(a) {
                function d(a, b) {
                    if (a)
                        do
                            if (a === b) return !0;
                    while (a = a.parentNode)
                }
                var e, f;
                if (!O && !c.removed) return U(T.select("img[data-mce-selected],hr[data-mce-selected]"), function(a) {
                    a.removeAttribute("data-mce-selected")
                }), f = "mousedown" == a.type ? a.target : b.getNode(), f = T.$(f).closest(X ? "table" : "table,img,hr")[0], d(f, $) && (y(), e = b.getStart(!0), d(e, f) && d(b.getEnd(!0), f) && (!X || f != e && "IMG" !== e.nodeName)) ? void n(f) : void o()
            }

            function q(a, b, c) {
                a && a.attachEvent && a.attachEvent("on" + b, c)
            }

            function r(a, b, c) {
                a && a.detachEvent && a.detachEvent("on" + b, c)
            }

            function s(a) {
                var b, d, e, f, g, h, i, j = a.srcElement;
                b = j.getBoundingClientRect(), h = G.clientX - b.left, i = G.clientY - b.top;
                for (d in E)
                    if (e = E[d], f = j.offsetWidth * e[0], g = j.offsetHeight * e[1], Y(f - h) < 8 && Y(g - i) < 8) {
                        F = e;
                        break
                    }
                O = !0, c.fire("ObjectResizeStart", {
                    target: B,
                    width: B.clientWidth,
                    height: B.clientHeight
                }), c.getDoc().selection.empty(), n(j, d, G)
            }

            function t(a) {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1
            }

            function u(a) {
                return i(h(c.getBody(), a))
            }

            function v(a) {
                var b = a.srcElement;
                if (u(b)) return void t(a);
                if (b != B) {
                    if (c.fire("ObjectSelected", {
                            target: b
                        }), w(), 0 === b.id.indexOf("mceResizeHandle")) return void(a.returnValue = !1);
                    "IMG" != b.nodeName && "TABLE" != b.nodeName || (o(), B = b, q(b, "resizestart", s))
                }
            }

            function w() {
                r(B, "resizestart", s)
            }

            function x() {
                for (var a in E) {
                    var b = E[a];
                    b.elm && (T.unbind(b.elm), delete b.elm)
                }
            }

            function y() {
                try {
                    c.getDoc().execCommand("enableObjectResizing", !1, !1);
                } catch (a) {}
            }

            function z(a) {
                var b;
                if (X) {
                    b = V.body.createControlRange();
                    try {
                        return b.addElement(a), b.select(), !0
                    } catch (a) {}
                }
            }

            function A() {
                B = C = null, X && (w(), r($, "controlselect", v))
            }
            var B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T = c.dom,
                U = f.each,
                V = c.getDoc(),
                W = document,
                X = d.ie && d.ie < 11,
                Y = Math.abs,
                Z = Math.round,
                $ = c.getBody();
            E = {
                nw: [0, 0, -1, -1],
                ne: [1, 0, 1, -1],
                se: [1, 1, 1, 1],
                sw: [0, 1, -1, 1]
            };
            var _ = ".mce-content-body";
            return c.contentStyles.push(_ + " div.mce-resizehandle {position: absolute;border: 1px solid black;box-sizing: box-sizing;background: #FFF;width: 7px;height: 7px;z-index: 10000}" + _ + " .mce-resizehandle:hover {background: #000}" + _ + " img[data-mce-selected]," + _ + " hr[data-mce-selected] {outline: 1px solid black;resize: none}" + _ + " .mce-clonedresizable {position: absolute;" + (d.gecko ? "" : "outline: 1px dashed black;") + "opacity: .5;filter: alpha(opacity=50);z-index: 10000}" + _ + " .mce-resize-helper {background: #555;background: rgba(0,0,0,0.75);border-radius: 3px;border: 1px;color: white;display: none;font-family: sans-serif;font-size: 12px;white-space: nowrap;line-height: 14px;margin: 5px 10px;padding: 5px;position: absolute;z-index: 10001}"), c.on("init", function() {
                X ? (c.on("ObjectResized", function(a) {
                    "TABLE" != a.target.nodeName && (o(), z(a.target))
                }), q($, "controlselect", v), c.on("mousedown", function(a) {
                    G = a
                })) : (y(), d.ie >= 11 && (c.on("mousedown click", function(a) {
                    var b = a.target,
                        d = b.nodeName;
                    O || !/^(TABLE|IMG|HR)$/.test(d) || u(b) || (2 !== a.button && c.selection.select(b, "TABLE" == d), "mousedown" == a.type && c.nodeChanged())
                }), c.dom.bind($, "mscontrolselect", function(a) {
                    function b(a) {
                        e.setEditorTimeout(c, function() {
                            c.selection.select(a)
                        })
                    }
                    return u(a.target) ? (a.preventDefault(), void b(a.target)) : void(/^(TABLE|IMG|HR)$/.test(a.target.nodeName) && (a.preventDefault(), "IMG" == a.target.tagName && b(a.target)))
                })));
                var b = e.throttle(function(a) {
                    c.composing || p(a)
                });
                c.on("nodechange ResizeEditor ResizeWindow drop", b), c.on("keyup compositionend", function(a) {
                    B && "TABLE" == B.nodeName && b(a)
                }), c.on("hide blur", o), c.on("contextmenu", a.curry(m, c))
            }), c.on("remove", x), {
                isResizable: j,
                showResizeRect: n,
                hideResizeRect: o,
                updateResizeRect: p,
                controlSelect: z,
                destroy: A
            }
        }
    }), g("1w", [], function() {
        function a(a) {
            return function() {
                return a
            }
        }

        function b(a) {
            return function(b) {
                return !a(b)
            }
        }

        function c(a, b) {
            return function(c) {
                return a(b(c))
            }
        }

        function d() {
            var a = h.call(arguments);
            return function(b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c](b)) return !0;
                return !1
            }
        }

        function e() {
            var a = h.call(arguments);
            return function(b) {
                for (var c = 0; c < a.length; c++)
                    if (!a[c](b)) return !1;
                return !0
            }
        }

        function f(a) {
            var b = h.call(arguments);
            return b.length - 1 >= a.length ? a.apply(this, b.slice(1)) : function() {
                var a = b.concat([].slice.call(arguments));
                return f.apply(this, a)
            }
        }

        function g() {}
        var h = [].slice;
        return {
            constant: a,
            negate: b,
            and: e,
            or: d,
            curry: f,
            compose: c,
            noop: g
        }
    }), g("44", ["1j", "1g", "1k"], function(a, b, c) {
        function d(a) {
            return !p(a) && (l(a) ? !m(a.parentNode) : n(a) || k(a) || o(a) || j(a))
        }

        function e(a, b) {
            for (a = a.parentNode; a && a != b; a = a.parentNode) {
                if (j(a)) return !1;
                if (i(a)) return !0
            }
            return !0
        }

        function f(a) {
            return !!j(a) && b.reduce(a.getElementsByTagName("*"), function(a, b) {
                return a || i(b)
            }, !1) !== !0
        }

        function g(a) {
            return n(a) || f(a)
        }

        function h(a, b) {
            return d(a) && e(a, b)
        }
        var i = a.isContentEditableTrue,
            j = a.isContentEditableFalse,
            k = a.isBr,
            l = a.isText,
            m = a.matchNodeNames("script style textarea"),
            n = a.matchNodeNames("img input textarea hr iframe video audio object"),
            o = a.matchNodeNames("table"),
            p = c.isCaretContainer;
        return {
            isCaretCandidate: d,
            isInEditable: e,
            isAtomic: g,
            isEditableCaretCandidate: h
        }
    }), g("45", [], function() {
        function a(a) {
            return "string" == typeof a && a.charCodeAt(0) >= 768 && b.test(a)
        }
        var b = new RegExp("[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]");
        return {
            isExtendingChar: a
        }
    }), g("1p", ["1w", "1j", "e", "h", "44", "43", "45"], function(a, b, c, d, e, f, g) {
        function h(a) {
            return "createRange" in a ? a.createRange() : c.DOM.createRng()
        }

        function i(a) {
            return a && /[\r\n\t ]/.test(a)
        }

        function j(a) {
            var b, c = a.startContainer,
                d = a.startOffset;
            return !!(i(a.toString()) && r(c.parentNode) && (b = c.data, i(b[d - 1]) || i(b[d + 1])))
        }

        function k(a) {
            function b(a) {
                var b, c = a.ownerDocument,
                    d = h(c),
                    e = c.createTextNode("\xa0"),
                    g = a.parentNode;
                return g.insertBefore(e, a), d.setStart(e, 0), d.setEnd(e, 1), b = f.clone(d.getBoundingClientRect()), g.removeChild(e), b
            }

            function c(a) {
                var c, d;
                return d = a.getClientRects(), c = d.length > 0 ? f.clone(d[0]) : f.clone(a.getBoundingClientRect()), t(a) && 0 === c.left ? b(a) : c
            }

            function d(a, b) {
                return a = f.collapse(a, b), a.width = 1, a.right = a.left + 1, a
            }

            function e(a) {
                0 !== a.height && (n.length > 0 && f.isEqual(a, n[n.length - 1]) || n.push(a))
            }

            function i(a, b) {
                var f = h(a.ownerDocument);
                if (b < a.data.length) {
                    if (g.isExtendingChar(a.data[b])) return n;
                    if (g.isExtendingChar(a.data[b - 1]) && (f.setStart(a, b), f.setEnd(a, b + 1), !j(f))) return e(d(c(f), !1)), n
                }
                b > 0 && (f.setStart(a, b - 1), f.setEnd(a, b), j(f) || e(d(c(f), !1))), b < a.data.length && (f.setStart(a, b), f.setEnd(a, b + 1), j(f) || e(d(c(f), !0)))
            }
            var k, l, n = [];
            if (s(a.container())) return i(a.container(), a.offset()), n;
            if (m(a.container()))
                if (a.isAtEnd()) l = v(a.container(), a.offset()), s(l) && i(l, l.data.length), q(l) && !t(l) && e(d(c(l), !1));
                else {
                    if (l = v(a.container(), a.offset()), s(l) && i(l, 0), q(l) && a.isAtEnd()) return e(d(c(l), !1)), n;
                    k = v(a.container(), a.offset() - 1), q(k) && !t(k) && (o(k) || o(l) || !q(l)) && e(d(c(k), !1)), q(l) && e(d(c(l), !0))
                }
            return n
        }

        function l(b, c, d) {
            function e() {
                return s(b) ? 0 === c : 0 === c
            }

            function f() {
                return s(b) ? c >= b.data.length : c >= b.childNodes.length
            }

            function g() {
                var a;
                return a = h(b.ownerDocument), a.setStart(b, c), a.setEnd(b, c), a
            }

            function i() {
                return d || (d = k(new l(b, c))), d
            }

            function j() {
                return i().length > 0
            }

            function m(a) {
                return a && b === a.container() && c === a.offset()
            }

            function n(a) {
                return v(b, a ? c - 1 : c)
            }
            return {
                container: a.constant(b),
                offset: a.constant(c),
                toRange: g,
                getClientRects: i,
                isVisible: j,
                isAtStart: e,
                isAtEnd: f,
                isEqual: m,
                getNode: n
            }
        }
        var m = b.isElement,
            n = e.isCaretCandidate,
            o = b.matchStyleValues("display", "block table"),
            p = b.matchStyleValues("float", "left right"),
            q = a.and(m, n, a.negate(p)),
            r = a.negate(b.matchStyleValues("white-space", "pre pre-line pre-wrap")),
            s = b.isText,
            t = b.isBr,
            u = c.nodeIndex,
            v = d.getNode;
        return l.fromRangeStart = function(a) {
            return new l(a.startContainer, a.startOffset)
        }, l.fromRangeEnd = function(a) {
            return new l(a.endContainer, a.endOffset)
        }, l.after = function(a) {
            return new l(a.parentNode, u(a) + 1)
        }, l.before = function(a) {
            return new l(a.parentNode, u(a))
        }, l.isAtStart = function(a) {
            return !!a && a.isAtStart()
        }, l.isAtEnd = function(a) {
            return !!a && a.isAtEnd()
        }, l.isTextPosition = function(a) {
            return !!a && b.isText(a.container())
        }, l
    }), g("1o", ["1j", "e", "1w", "1g", "1p"], function(a, b, c, d, e) {
        function f(a) {
            var b = a.parentNode;
            return r(b) ? f(b) : b
        }

        function g(a) {
            return a ? d.reduce(a.childNodes, function(a, b) {
                return r(b) && "BR" != b.nodeName ? a = a.concat(g(b)) : a.push(b), a
            }, []) : []
        }

        function h(a, b) {
            for (;
                (a = a.previousSibling) && q(a);) b += a.data.length;
            return b
        }

        function i(a) {
            return function(b) {
                return a === b
            }
        }

        function j(b) {
            var c, e, h;
            return c = g(f(b)), e = d.findIndex(c, i(b), b), c = c.slice(0, e + 1), h = d.reduce(c, function(a, b, d) {
                return q(b) && q(c[d - 1]) && a++, a
            }, 0), c = d.filter(c, a.matchNodeNames(b.nodeName)), e = d.findIndex(c, i(b), b), e - h
        }

        function k(a) {
            var b;
            return b = q(a) ? "text()" : a.nodeName.toLowerCase(), b + "[" + j(a) + "]"
        }

        function l(a, b, c) {
            var d = [];
            for (b = b.parentNode; b != a && (!c || !c(b)); b = b.parentNode) d.push(b);
            return d
        }

        function m(b, e) {
            var f, g, i, j, m, n = [];
            return f = e.container(), g = e.offset(), q(f) ? i = h(f, g) : (j = f.childNodes, g >= j.length ? (i = "after", g = j.length - 1) : i = "before", f = j[g]), n.push(k(f)), m = l(b, f), m = d.filter(m, c.negate(a.isBogus)), n = n.concat(d.map(m, function(a) {
                return k(a)
            })), n.reverse().join("/") + "," + i
        }

        function n(b, c, e) {
            var f = g(b);
            return f = d.filter(f, function(a, b) {
                return !q(a) || !q(f[b - 1])
            }), f = d.filter(f, a.matchNodeNames(c)), f[e]
        }

        function o(a, b) {
            for (var c, d = a, f = 0; q(d);) {
                if (c = d.data.length, b >= f && b <= f + c) {
                    a = d, b -= f;
                    break
                }
                if (!q(d.nextSibling)) {
                    a = d, b = c;
                    break
                }
                f += c, d = d.nextSibling
            }
            return b > a.data.length && (b = a.data.length), new e(a, b)
        }

        function p(a, b) {
            var c, f, g;
            return b ? (c = b.split(","), b = c[0].split("/"), g = c.length > 1 ? c[1] : "before", f = d.reduce(b, function(a, b) {
                return (b = /([\w\-\(\)]+)\[([0-9]+)\]/.exec(b)) ? ("text()" === b[1] && (b[1] = "#text"), n(a, b[1], parseInt(b[2], 10))) : null
            }, a), f ? q(f) ? o(f, parseInt(g, 10)) : (g = "after" === g ? s(f) + 1 : s(f), new e(f.parentNode, g)) : null) : null
        }
        var q = a.isText,
            r = a.isBogus,
            s = b.nodeIndex;
        return {
            create: m,
            resolve: p
        }
    }), g("r", ["1o", "1k", "1p", "1j", "h", "6", "1l", "9"], function(a, b, c, d, e, f, g, h) {
        function i(g) {
            var i = g.dom;
            this.getBookmark = function(f, l) {
                function m(a, b) {
                    var c = 0;
                    return h.each(i.select(a), function(a) {
                        if ("all" !== a.getAttribute("data-mce-bogus")) return a != b && void c++
                    }), c
                }

                function n(a) {
                    function b(b) {
                        var c, d, e, f = b ? "start" : "end";
                        c = a[f + "Container"], d = a[f + "Offset"], 1 == c.nodeType && "TR" == c.nodeName && (e = c.childNodes, c = e[Math.min(b ? d : d - 1, e.length - 1)], c && (d = b ? 0 : c.childNodes.length, a["set" + (b ? "Start" : "End")](c, d)))
                    }
                    return b(!0), b(), a
                }

                function o(a) {
                    function b(a, b) {
                        var d, e = a[b ? "startContainer" : "endContainer"],
                            f = a[b ? "startOffset" : "endOffset"],
                            g = [],
                            h = 0;
                        for (3 === e.nodeType ? g.push(l ? k(e, f) : f) : (d = e.childNodes, f >= d.length && d.length && (h = 1, f = Math.max(0, d.length - 1)), g.push(i.nodeIndex(d[f], l) + h)); e && e != c; e = e.parentNode) g.push(i.nodeIndex(e, l));
                        return g
                    }
                    var c = i.getRoot(),
                        d = {};
                    return d.start = b(a, !0), g.isCollapsed() || (d.end = b(a)), d
                }

                function p(a) {
                    function c(a, c) {
                        var f;
                        if (d.isElement(a) && (a = e.getNode(a, c), j(a))) return a;
                        if (b.isCaretContainer(a)) {
                            if (d.isText(a) && b.isCaretContainerBlock(a) && (a = a.parentNode), f = a.previousSibling, j(f)) return f;
                            if (f = a.nextSibling, j(f)) return f
                        }
                    }
                    return c(a.startContainer, a.startOffset) || c(a.endContainer, a.endOffset)
                }
                var q, r, s, t, u, v, w, x = "&#xFEFF;";
                if (2 == f) return v = g.getNode(), u = v ? v.nodeName : null, q = g.getRng(), j(v) || "IMG" == u ? {
                    name: u,
                    index: m(u, v)
                } : g.tridentSel ? g.tridentSel.getBookmark(f) : (v = p(q), v ? (u = v.tagName, {
                    name: u,
                    index: m(u, v)
                }) : o(q));
                if (3 == f) return q = g.getRng(), {
                    start: a.create(i.getRoot(), c.fromRangeStart(q)),
                    end: a.create(i.getRoot(), c.fromRangeEnd(q))
                };
                if (f) return {
                    rng: g.getRng()
                };
                if (q = g.getRng(), s = i.uniqueId(), t = g.isCollapsed(), w = "overflow:hidden;line-height:0px", q.duplicate || q.item) {
                    if (q.item) return v = q.item(0), u = v.nodeName, {
                        name: u,
                        index: m(u, v)
                    };
                    r = q.duplicate();
                    try {
                        q.collapse(), q.pasteHTML('<span data-mce-type="bookmark" id="' + s + '_start" style="' + w + '">' + x + "</span>"), t || (r.collapse(!1), q.moveToElementText(r.parentElement()), 0 === q.compareEndPoints("StartToEnd", r) && r.move("character", -1), r.pasteHTML('<span data-mce-type="bookmark" id="' + s + '_end" style="' + w + '">' + x + "</span>"))
                    } catch (a) {
                        return null
                    }
                } else {
                    if (v = g.getNode(), u = v.nodeName, "IMG" == u) return {
                        name: u,
                        index: m(u, v)
                    };
                    r = n(q.cloneRange()), t || (r.collapse(!1), r.insertNode(i.create("span", {
                        "data-mce-type": "bookmark",
                        id: s + "_end",
                        style: w
                    }, x))), q = n(q), q.collapse(!0), q.insertNode(i.create("span", {
                        "data-mce-type": "bookmark",
                        id: s + "_start",
                        style: w
                    }, x))
                }
                return g.moveToBookmark({
                    id: s,
                    keep: 1
                }), {
                    id: s
                }
            }, this.moveToBookmark = function(b) {
                function c(a) {
                    var c, d, e, f, g = b[a ? "start" : "end"];
                    if (g) {
                        for (e = g[0], d = l, c = g.length - 1; c >= 1; c--) {
                            if (f = d.childNodes, g[c] > f.length - 1) return;
                            d = f[g[c]]
                        }
                        3 === d.nodeType && (e = Math.min(g[0], d.nodeValue.length)), 1 === d.nodeType && (e = Math.min(g[0], d.childNodes.length)), a ? k.setStart(d, e) : k.setEnd(d, e)
                    }
                    return !0
                }

                function d(a) {
                    var c, d, e, g, j = i.get(b.id + "_" + a),
                        k = b.keep;
                    if (j && (c = j.parentNode, "start" == a ? (k ? (c = j.firstChild, d = 1) : d = i.nodeIndex(j), m = n = c, o = p = d) : (k ? (c = j.firstChild, d = 1) : d = i.nodeIndex(j), n = c, p = d), !k)) {
                        for (g = j.previousSibling, e = j.nextSibling, h.each(h.grep(j.childNodes), function(a) {
                                3 == a.nodeType && (a.nodeValue = a.nodeValue.replace(/\uFEFF/g, ""))
                            }); j = i.get(b.id + "_" + a);) i.remove(j, 1);
                        g && e && g.nodeType == e.nodeType && 3 == g.nodeType && !f.opera && (d = g.nodeValue.length, g.appendData(e.nodeValue), i.remove(e), "start" == a ? (m = n = g, o = p = d) : (n = g, p = d))
                    }
                }

                function e(a) {
                    return !i.isBlock(a) || a.innerHTML || f.ie || (a.innerHTML = '<br data-mce-bogus="1" />'), a
                }

                function j() {
                    var c, d;
                    return c = i.createRng(), d = a.resolve(i.getRoot(), b.start), c.setStart(d.container(), d.offset()), d = a.resolve(i.getRoot(), b.end), c.setEnd(d.container(), d.offset()), c
                }
                var k, l, m, n, o, p;
                if (b)
                    if (h.isArray(b.start)) {
                        if (k = i.createRng(), l = i.getRoot(), g.tridentSel) return g.tridentSel.moveToBookmark(b);
                        c(!0) && c() && g.setRng(k)
                    } else "string" == typeof b.start ? g.setRng(j(b)) : b.id ? (d("start"), d("end"), m && (k = i.createRng(), k.setStart(e(m), o), k.setEnd(e(n), p), g.setRng(k))) : b.name ? g.select(i.select(b.name)[b.index]) : b.rng && g.setRng(b.rng)
            }
        }
        var j = d.isContentEditableFalse,
            k = function(a, b) {
                var c, d;
                for (d = g.trim(a.data.slice(0, b)).length, c = a.previousSibling; c && 3 === c.nodeType; c = c.previousSibling) d += g.trim(c.data).length;
                return d
            };
        return i.isBookmarkNode = function(a) {
            return a && "SPAN" === a.tagName && "bookmark" === a.getAttribute("data-mce-type")
        }, i
    }), g("6j", [], function() {
        return "undefined" != typeof window ? window : Function("return this;")()
    }), g("5u", ["6j"], function(a) {
        var b = function(b, c) {
                for (var d = void 0 !== c ? c : a, e = 0; e < b.length && void 0 !== d && null !== d; ++e) d = d[b[e]];
                return d
            },
            c = function(a, c) {
                var d = a.split(".");
                return b(d, c)
            },
            d = function(a, b) {
                return void 0 !== a[b] && null !== a[b] || (a[b] = {}), a[b]
            },
            e = function(b, c) {
                for (var e = void 0 !== c ? c : a, f = 0; f < b.length; ++f) e = d(e, b[f]);
                return e
            },
            f = function(a, b) {
                var c = a.split(".");
                return e(c, b)
            };
        return {
            path: b,
            resolve: c,
            forge: e,
            namespace: f
        }
    }), g("54", ["5u"], function(a) {
        var b = function(b, c) {
                return a.resolve(b, c)
            },
            c = function(a, c) {
                var d = b(a, c);
                if (void 0 === d) throw a + " not available on this browser";
                return d
            };
        return {
            getOrDie: c
        }
    }), g("46", ["54"], function(a) {
        var b = function() {
                var b = a.getOrDie("Node");
                return b
            },
            c = function(a, b, c) {
                return 0 !== (a.compareDocumentPosition(b) & c)
            },
            d = function(a, d) {
                return c(a, d, b().DOCUMENT_POSITION_PRECEDING)
            },
            e = function(a, d) {
                return c(a, d, b().DOCUMENT_POSITION_CONTAINED_BY)
            };
        return {
            documentPositionPreceding: d,
            documentPositionContainedBy: e
        }
    }), g("55", [], function() {
        var a = function(a) {
            var b, c = !1;
            return function() {
                return c || (c = !0, b = a.apply(null, arguments)), b
            }
        };
        return {
            cached: a
        }
    }), h("75", Number), g("6k", ["3x", "75", "50"], function(a, b, c) {
        var d = function(a, b) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    if (d.test(b)) return d
                }
            },
            e = function(a, c) {
                var e = d(a, c);
                if (!e) return {
                    major: 0,
                    minor: 0
                };
                var f = function(a) {
                    return b(c.replace(e, "$" + a))
                };
                return h(f(1), f(2))
            },
            f = function(a, b) {
                var d = c(b).toLowerCase();
                return 0 === a.length ? g() : e(a, d)
            },
            g = function() {
                return h(0, 0)
            },
            h = function(a, b) {
                return {
                    major: a,
                    minor: b
                }
            };
        return {
            nu: h,
            detect: f,
            unknown: g
        }
    }), g("5v", ["1m", "6k"], function(a, b) {
        var c = "Edge",
            d = "Chrome",
            e = "IE",
            f = "Opera",
            g = "Firefox",
            h = "Safari",
            i = function(a, b) {
                return function() {
                    return b === a
                }
            },
            j = function() {
                return k({
                    current: void 0,
                    version: b.unknown()
                })
            },
            k = function(a) {
                var b = a.current,
                    j = a.version;
                return {
                    current: b,
                    version: j,
                    isEdge: i(c, b),
                    isChrome: i(d, b),
                    isIE: i(e, b),
                    isOpera: i(f, b),
                    isFirefox: i(g, b),
                    isSafari: i(h, b)
                }
            };
        return {
            unknown: j,
            nu: k,
            edge: a.constant(c),
            chrome: a.constant(d),
            ie: a.constant(e),
            opera: a.constant(f),
            firefox: a.constant(g),
            safari: a.constant(h)
        }
    }), g("5w", ["1m", "6k"], function(a, b) {
        var c = "Windows",
            d = "iOS",
            e = "Android",
            f = "Linux",
            g = "OSX",
            h = "Solaris",
            i = "FreeBSD",
            j = function(a, b) {
                return function() {
                    return b === a
                }
            },
            k = function() {
                return l({
                    current: void 0,
                    version: b.unknown()
                })
            },
            l = function(a) {
                var b = a.current,
                    k = a.version;
                return {
                    current: b,
                    version: k,
                    isWindows: j(c, b),
                    isiOS: j(d, b),
                    isAndroid: j(e, b),
                    isOSX: j(g, b),
                    isLinux: j(f, b),
                    isSolaris: j(h, b),
                    isFreeBSD: j(i, b)
                }
            };
        return {
            unknown: k,
            nu: l,
            windows: a.constant(c),
            ios: a.constant(d),
            android: a.constant(e),
            linux: a.constant(f),
            osx: a.constant(g),
            solaris: a.constant(h),
            freebsd: a.constant(i)
        }
    }), g("5x", ["1m"], function(a) {
        return function(b, c, d) {
            var e = b.isiOS() && /ipad/i.test(d) === !0,
                f = b.isiOS() && !e,
                g = b.isAndroid() && 3 === b.version.major,
                h = b.isAndroid() && 4 === b.version.major,
                i = e || g || h && /mobile/i.test(d) === !0,
                j = b.isiOS() || b.isAndroid(),
                k = j && !i,
                l = c.isSafari() && b.isiOS() && /safari/i.test(d) === !1;
            return {
                isiPad: a.constant(e),
                isiPhone: a.constant(f),
                isTablet: a.constant(i),
                isPhone: a.constant(k),
                isTouch: a.constant(j),
                isAndroid: b.isAndroid,
                isiOS: b.isiOS,
                isWebView: a.constant(l)
            }
        }
    }), g("5y", ["3x", "6k", "50"], function(a, b, c) {
        var d = function(b, d) {
                var e = c(d).toLowerCase();
                return a.find(b, function(a) {
                    return a.search(e)
                })
            },
            e = function(a, c) {
                return d(a, c).map(function(a) {
                    var d = b.detect(a.versionRegexes, c);
                    return {
                        current: a.name,
                        version: d
                    }
                })
            },
            f = function(a, c) {
                return d(a, c).map(function(a) {
                    var d = b.detect(a.versionRegexes, c);
                    return {
                        current: a.name,
                        version: d
                    }
                })
            };
        return {
            detectBrowser: e,
            detectOs: f
        }
    }), g("76", [], function() {
        var a = function(a, b) {
                return b + a
            },
            b = function(a, b) {
                return a + b
            },
            c = function(a, b) {
                return a.substring(b)
            },
            d = function(a, b) {
                return a.substring(0, a.length - b)
            };
        return {
            addToStart: a,
            addToEnd: b,
            removeFromStart: c,
            removeFromEnd: d
        }
    }), g("77", ["4z", "3z"], function(a, b) {
        var c = function(a, b) {
                return a.substr(0, b)
            },
            d = function(a, b) {
                return a.substr(a.length - b, a.length)
            },
            e = function(b) {
                return "" === b ? a.none() : a.some(b.substr(0, 1))
            },
            f = function(b) {
                return "" === b ? a.none() : a.some(b.substring(1))
            };
        return {
            first: c,
            last: d,
            head: e,
            tail: f
        }
    }), g("6l", ["76", "77", "3z"], function(a, b, c) {
        var d = function(a, b, c) {
                if ("" === b) return !0;
                if (a.length < b.length) return !1;
                var d = a.substr(c, c + b.length);
                return d === b
            },
            e = function(a, b) {
                var c = function(a) {
                    var b = typeof a;
                    return "string" === b || "number" === b
                };
                return a.replace(/\${([^{}]*)}/g, function(a, d) {
                    var e = b[d];
                    return c(e) ? e : a
                })
            },
            f = function(b, c) {
                return l(b, c) ? a.removeFromStart(b, c.length) : b
            },
            g = function(b, c) {
                return m(b, c) ? a.removeFromEnd(b, c.length) : b
            },
            h = function(b, c) {
                return l(b, c) ? b : a.addToStart(b, c)
            },
            i = function(b, c) {
                return m(b, c) ? b : a.addToEnd(b, c)
            },
            j = function(a, b) {
                return a.indexOf(b) !== -1
            },
            k = function(a) {
                return b.head(a).bind(function(c) {
                    return b.tail(a).map(function(a) {
                        return c.toUpperCase() + a
                    })
                }).getOr(a)
            },
            l = function(a, b) {
                return d(a, b, 0)
            },
            m = function(a, b) {
                return d(a, b, a.length - b.length)
            },
            n = function(a) {
                return a.replace(/^\s+|\s+$/g, "")
            },
            o = function(a) {
                return a.replace(/^\s+/g, "")
            },
            p = function(a) {
                return a.replace(/\s+$/g, "")
            };
        return {
            supplant: e,
            startsWith: l,
            removeLeading: f,
            removeTrailing: g,
            ensureLeading: h,
            ensureTrailing: i,
            endsWith: m,
            contains: j,
            trim: n,
            lTrim: o,
            rTrim: p,
            capitalize: k
        }
    }), g("5z", ["1m", "6l"], function(a, b) {
        var c = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
            d = function(a) {
                return function(c) {
                    return b.contains(c, a)
                }
            },
            e = [{
                name: "Edge",
                versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
                search: function(a) {
                    var c = b.contains(a, "edge/") && b.contains(a, "chrome") && b.contains(a, "safari") && b.contains(a, "applewebkit");
                    return c
                }
            }, {
                name: "Chrome",
                versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, c],
                search: function(a) {
                    return b.contains(a, "chrome") && !b.contains(a, "chromeframe")
                }
            }, {
                name: "IE",
                versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
                search: function(a) {
                    return b.contains(a, "msie") || b.contains(a, "trident")
                }
            }, {
                name: "Opera",
                versionRegexes: [c, /.*?opera\/([0-9]+)\.([0-9]+).*/],
                search: d("opera")
            }, {
                name: "Firefox",
                versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
                search: d("firefox")
            }, {
                name: "Safari",
                versionRegexes: [c, /.*?cpu os ([0-9]+)_([0-9]+).*/],
                search: function(a) {
                    return (b.contains(a, "safari") || b.contains(a, "mobile/")) && b.contains(a, "applewebkit")
                }
            }],
            f = [{
                name: "Windows",
                search: d("win"),
                versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
            }, {
                name: "iOS",
                search: function(a) {
                    return b.contains(a, "iphone") || b.contains(a, "ipad")
                },
                versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
            }, {
                name: "Android",
                search: d("android"),
                versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
            }, {
                name: "OSX",
                search: d("os x"),
                versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
            }, {
                name: "Linux",
                search: d("linux"),
                versionRegexes: []
            }, {
                name: "Solaris",
                search: d("sunos"),
                versionRegexes: []
            }, {
                name: "FreeBSD",
                search: d("freebsd"),
                versionRegexes: []
            }];
        return {
            browsers: a.constant(e),
            oses: a.constant(f)
        }
    }), g("56", ["5v", "5w", "5x", "5y", "5z"], function(a, b, c, d, e) {
        var f = function(f) {
            var g = e.browsers(),
                h = e.oses(),
                i = d.detectBrowser(g, f).fold(a.unknown, a.nu),
                j = d.detectOs(h, f).fold(b.unknown, b.nu),
                k = c(j, i, f);
            return {
                browser: i,
                os: j,
                deviceType: k
            }
        };
        return {
            detect: f
        }
    }), h("57", navigator), g("47", ["55", "56", "57"], function(a, b, c) {
        var d = a.cached(function() {
            var a = c.userAgent;
            return b.detect(a)
        });
        return {
            detect: d
        }
    }), g("49", [], function() {
        return "undefined" == typeof console && (console = {
            log: function() {}
        }), console
    }), h("22", document), g("1r", ["1m", "3z", "49", "22"], function(a, b, c, d) {
        var e = function(a, b) {
                var e = b || d,
                    f = e.createElement("div");
                if (f.innerHTML = a, !f.hasChildNodes() || f.childNodes.length > 1) throw c.error("HTML does not have a single root node", a), "HTML must have a single root node";
                return h(f.childNodes[0])
            },
            f = function(a, b) {
                var c = b || d,
                    e = c.createElement(a);
                return h(e)
            },
            g = function(a, b) {
                var c = b || d,
                    e = c.createTextNode(a);
                return h(e)
            },
            h = function(c) {
                if (null === c || void 0 === c) throw new b("Node cannot be null or undefined");
                return {
                    dom: a.constant(c)
                }
            };
        return {
            fromHtml: e,
            fromTag: f,
            fromText: g,
            fromDom: h
        }
    }), g("58", [], function() {
        return {
            ATTRIBUTE: 2,
            CDATA_SECTION: 4,
            COMMENT: 8,
            DOCUMENT: 9,
            DOCUMENT_TYPE: 10,
            DOCUMENT_FRAGMENT: 11,
            ELEMENT: 1,
            TEXT: 3,
            PROCESSING_INSTRUCTION: 7,
            ENTITY_REFERENCE: 5,
            ENTITY: 6,
            NOTATION: 12
        }
    }), g("48", ["3x", "4z", "1r", "58", "3z", "22"], function(a, b, c, d, e, f) {
        var g = 0,
            h = 1,
            i = 2,
            j = 3,
            k = function() {
                var a = f.createElement("span");
                return void 0 !== a.matches ? g : void 0 !== a.msMatchesSelector ? h : void 0 !== a.webkitMatchesSelector ? i : void 0 !== a.mozMatchesSelector ? j : -1
            }(),
            l = d.ELEMENT,
            m = d.DOCUMENT,
            n = function(a, b) {
                var c = a.dom();
                if (c.nodeType !== l) return !1;
                if (k === g) return c.matches(b);
                if (k === h) return c.msMatchesSelector(b);
                if (k === i) return c.webkitMatchesSelector(b);
                if (k === j) return c.mozMatchesSelector(b);
                throw new e("Browser lacks native selectors")
            },
            o = function(a) {
                return a.nodeType !== l && a.nodeType !== m || 0 === a.childElementCount
            },
            p = function(b, d) {
                var e = void 0 === d ? f : d.dom();
                return o(e) ? [] : a.map(e.querySelectorAll(b), c.fromDom)
            },
            q = function(a, d) {
                var e = void 0 === d ? f : d.dom();
                return o(e) ? b.none() : b.from(e.querySelector(a)).map(c.fromDom)
            };
        return {
            all: p,
            is: n,
            one: q
        }
    }), g("1q", ["3x", "1m", "46", "47", "48"], function(a, b, c, d, e) {
        var f = function(a, b) {
                return a.dom() === b.dom()
            },
            g = function(a, b) {
                return a.dom().isEqualNode(b.dom())
            },
            h = function(c, d) {
                return a.exists(d, b.curry(f, c))
            },
            i = function(a, b) {
                var c = a.dom(),
                    d = b.dom();
                return c !== d && c.contains(d)
            },
            j = function(a, b) {
                return c.documentPositionContainedBy(a.dom(), b.dom())
            },
            k = d.detect().browser,
            l = k.isIE() ? j : i;
        return {
            eq: f,
            isEqualNode: g,
            member: h,
            contains: l,
            is: e.is
        }
    }), g("1s", ["1j"], function(a) {
        var b = function(a) {
                for (var b = 0, c = 0, d = a; d && d.nodeType;) b += d.offsetLeft || 0, c += d.offsetTop || 0, d = d.offsetParent;
                return {
                    x: b,
                    y: c
                }
            },
            c = function(a, b, c) {
                var d = {
                    elm: b,
                    alignToTop: c
                };
                return a.fire("scrollIntoView", d), d.isDefaultPrevented()
            },
            d = function(d, e, f) {
                var g, h, i, j, k = d.dom,
                    l = k.getRoot(),
                    m = 0;
                if (!c(d, e, f) && a.isElement(e)) {
                    if (f === !1 && (m = e.offsetHeight), "BODY" !== l.nodeName) {
                        var n = d.selection.getScrollContainer();
                        if (n) return g = b(e).y - b(n).y + m, j = n.clientHeight, i = n.scrollTop, void((g < i || g + 25 > i + j) && (n.scrollTop = g < i ? g : g - j + 25))
                    }
                    h = k.getViewPort(d.getWin()), g = k.getPos(e).y + m, i = h.y, j = h.h, (g < h.y || g + 25 > i + j) && d.getWin().scrollTo(0, g < i ? g : g - j + 25)
                }
            };
        return {
            scrollIntoView: d
        }
    }), g("1t", [], function() {
        function a(a) {
            function b(b, c) {
                var d, e, f, g, h, i, j, k, l = 0,
                    m = -1;
                if (d = b.duplicate(), d.collapse(c), k = d.parentElement(), k.ownerDocument === a.dom.doc) {
                    for (;
                        "false" === k.contentEditable;) k = k.parentNode;
                    if (!k.hasChildNodes()) return {
                        node: k,
                        inside: 1
                    };
                    for (g = k.children, e = g.length - 1; l <= e;)
                        if (j = Math.floor((l + e) / 2), h = g[j], d.moveToElementText(h), m = d.compareEndPoints(c ? "StartToStart" : "EndToEnd", b), m > 0) e = j - 1;
                        else {
                            if (!(m < 0)) return {
                                node: h
                            };
                            l = j + 1
                        }
                    if (m < 0)
                        for (h ? d.collapse(!1) : (d.moveToElementText(k), d.collapse(!0), h = k, f = !0), i = 0; 0 !== d.compareEndPoints(c ? "StartToStart" : "StartToEnd", b) && 0 !== d.move("character", 1) && k == d.parentElement();) i++;
                    else
                        for (d.collapse(!0), i = 0; 0 !== d.compareEndPoints(c ? "StartToStart" : "StartToEnd", b) && 0 !== d.move("character", -1) && k == d.parentElement();) i++;
                    return {
                        node: h,
                        position: m,
                        offset: i,
                        inside: f
                    }
                }
            }

            function c() {
                function c(a) {
                    var c, d, e, f, g, h = b(k, a),
                        i = 0;
                    if (c = h.node, d = h.offset, h.inside && !c.hasChildNodes()) return void l[a ? "setStart" : "setEnd"](c, 0);
                    if (d === f) return void l[a ? "setStartBefore" : "setEndAfter"](c);
                    if (h.position < 0) {
                        if (e = h.inside ? c.firstChild : c.nextSibling, !e) return void l[a ? "setStartAfter" : "setEndAfter"](c);
                        if (!d) return void(3 == e.nodeType ? l[a ? "setStart" : "setEnd"](e, 0) : l[a ? "setStartBefore" : "setEndBefore"](e));
                        for (; e;) {
                            if (3 == e.nodeType && (g = e.nodeValue, i += g.length, i >= d)) {
                                c = e, i -= d, i = g.length - i;
                                break
                            }
                            e = e.nextSibling
                        }
                    } else {
                        if (e = c.previousSibling, !e) return l[a ? "setStartBefore" : "setEndBefore"](c);
                        if (!d) return void(3 == c.nodeType ? l[a ? "setStart" : "setEnd"](e, c.nodeValue.length) : l[a ? "setStartAfter" : "setEndAfter"](e));
                        for (; e;) {
                            if (3 == e.nodeType && (i += e.nodeValue.length, i >= d)) {
                                c = e, i -= d;
                                break
                            }
                            e = e.previousSibling
                        }
                    }
                    l[a ? "setStart" : "setEnd"](c, i)
                }
                var f, g, h, i, j, k = a.getRng(),
                    l = e.createRng();
                if (f = k.item ? k.item(0) : k.parentElement(), f.ownerDocument != e.doc) return l;
                if (g = a.isCollapsed(), k.item) return l.setStart(f.parentNode, e.nodeIndex(f)), l.setEnd(l.startContainer, l.startOffset + 1), l;
                try {
                    c(!0), g || c()
                } catch (b) {
                    if (b.number != -2147024809) throw b;
                    j = d.getBookmark(2), h = k.duplicate(), h.collapse(!0), f = h.parentElement(), g || (h = k.duplicate(), h.collapse(!1), i = h.parentElement(), i.innerHTML = i.innerHTML), f.innerHTML = f.innerHTML, d.moveToBookmark(j), k = a.getRng(), c(!0), g || c()
                }
                return l
            }
            var d = this,
                e = a.dom,
                f = !1;
            this.getBookmark = function(c) {
                function d(a) {
                    var b, c, d, f, g = [];
                    for (b = a.parentNode, c = e.getRoot().parentNode; b != c && 9 !== b.nodeType;) {
                        for (d = b.children, f = d.length; f--;)
                            if (a === d[f]) {
                                g.push(f);
                                break
                            }
                        a = b, b = b.parentNode
                    }
                    return g
                }

                function f(a) {
                    var c;
                    if (c = b(g, a)) return {
                        position: c.position,
                        offset: c.offset,
                        indexes: d(c.node),
                        inside: c.inside
                    }
                }
                var g = a.getRng(),
                    h = {};
                return 2 === c && (g.item ? h.start = {
                    ctrl: !0,
                    indexes: d(g.item(0))
                } : (h.start = f(!0), a.isCollapsed() || (h.end = f()))), h
            }, this.moveToBookmark = function(a) {
                function b(a) {
                    var b, c, d, f;
                    for (b = e.getRoot(), c = a.length - 1; c >= 0; c--) f = b.children, d = a[c], d <= f.length - 1 && (b = f[d]);
                    return b
                }

                function c(c) {
                    var e, g, h, i, j = a[c ? "start" : "end"];
                    j && (e = j.position > 0, g = f.createTextRange(), g.moveToElementText(b(j.indexes)), i = j.offset, i !== h ? (g.collapse(j.inside || e), g.moveStart("character", e ? -i : i)) : g.collapse(c), d.setEndPoint(c ? "StartToStart" : "EndToStart", g), c && d.collapse(!0))
                }
                var d, f = e.doc.body;
                a.start && (a.start.ctrl ? (d = f.createControlRange(), d.addElement(b(a.start.indexes)), d.select()) : (d = f.createTextRange(), c(!0), c(), d.select()))
            }, this.addRange = function(b) {
                function c(a) {
                    var b, c, g, l, m;
                    g = e.create("a"), b = a ? h : j, c = a ? i : k, l = d.duplicate(), b != o && b != o.documentElement || (b = p, c = 0), 3 == b.nodeType ? (b.parentNode.insertBefore(g, b), l.moveToElementText(g), l.moveStart("character", c), e.remove(g), d.setEndPoint(a ? "StartToStart" : "EndToEnd", l)) : (m = b.childNodes, m.length ? (c >= m.length ? e.insertAfter(g, m[m.length - 1]) : b.insertBefore(g, m[c]), l.moveToElementText(g)) : b.canHaveHTML && (b.innerHTML = "<span>&#xFEFF;</span>", g = b.firstChild, l.moveToElementText(g), l.collapse(f)), d.setEndPoint(a ? "StartToStart" : "EndToEnd", l), e.remove(g))
                }
                var d, g, h, i, j, k, l, m, n, o = a.dom.doc,
                    p = o.body;
                if (h = b.startContainer, i = b.startOffset, j = b.endContainer, k = b.endOffset, d = p.createTextRange(), h == j && 1 == h.nodeType) {
                    if (i == k && !h.hasChildNodes()) {
                        if (h.canHaveHTML) return l = h.previousSibling, l && !l.hasChildNodes() && e.isBlock(l) ? l.innerHTML = "&#xFEFF;" : l = null, h.innerHTML = "<span>&#xFEFF;</span><span>&#xFEFF;</span>", d.moveToElementText(h.lastChild), d.select(), e.doc.selection.clear(), h.innerHTML = "", void(l && (l.innerHTML = ""));
                        i = e.nodeIndex(h), h = h.parentNode
                    }
                    if (i == k - 1) try {
                        if (n = h.childNodes[i], g = p.createControlRange(), g.addElement(n), g.select(), m = a.getRng(), m.item && n === m.item(0)) return
                    } catch (a) {}
                }
                c(!0), c(), d.select()
            }, this.getRangeAt = c
        }
        return a
    }), g("60", ["3y", "50"], function(a, b) {
        var c = function(c) {
                if (null === c) return "null";
                var d = typeof c;
                return "object" === d && a.prototype.isPrototypeOf(c) ? "array" : "object" === d && b.prototype.isPrototypeOf(c) ? "string" : d
            },
            d = function(a) {
                return function(b) {
                    return c(b) === a
                }
            };
        return {
            isString: d("string"),
            isObject: d("object"),
            isArray: d("array"),
            isNull: d("null"),
            isBoolean: d("boolean"),
            isUndefined: d("undefined"),
            isFunction: d("function"),
            isNumber: d("number")
        }
    }), g("6m", ["3x", "1m", "3y", "3z"], function(a, b, c, d) {
        return function() {
            var e = arguments;
            return function() {
                for (var f = new c(arguments.length), g = 0; g < f.length; g++) f[g] = arguments[g];
                if (e.length !== f.length) throw new d('Wrong number of arguments to struct. Expected "[' + e.length + ']", got ' + f.length + " arguments");
                var h = {};
                return a.each(e, function(a, c) {
                    h[a] = b.constant(f[c])
                }), h
            }
        }
    }), g("63", ["4z", "5s"], function(a, b) {
        var c = function() {
                var a = b.keys,
                    c = function(a) {
                        var b = [];
                        for (var c in a) a.hasOwnProperty(c) && b.push(c);
                        return b
                    };
                return void 0 === a ? c : a
            }(),
            d = function(a, b) {
                for (var d = c(a), e = 0, f = d.length; e < f; e++) {
                    var g = d[e],
                        h = a[g];
                    b(h, g, a)
                }
            },
            e = function(a, b) {
                return f(a, function(a, c, d) {
                    return {
                        k: c,
                        v: b(a, c, d)
                    }
                })
            },
            f = function(a, b) {
                var c = {};
                return d(a, function(d, e) {
                    var f = b(d, e, a);
                    c[f.k] = f.v
                }), c
            },
            g = function(a, b) {
                var c = {},
                    e = {};
                return d(a, function(a, d) {
                    var f = b(a, d) ? c : e;
                    f[d] = a
                }), {
                    t: c,
                    f: e
                }
            },
            h = function(a, b) {
                var c = [];
                return d(a, function(a, d) {
                    c.push(b(a, d))
                }), c
            },
            i = function(b, d) {
                for (var e = c(b), f = 0, g = e.length; f < g; f++) {
                    var h = e[f],
                        i = b[h];
                    if (d(i, h, b)) return a.some(i)
                }
                return a.none()
            },
            j = function(a) {
                return h(a, function(a) {
                    return a
                })
            },
            k = function(a) {
                return j(a).length
            };
        return {
            bifilter: g,
            each: d,
            map: e,
            mapToArray: h,
            tupleMap: f,
            find: i,
            keys: c,
            values: j,
            size: k
        }
    }), g("78", ["3x", "60", "3z"], function(a, b, c) {
        var d = function(a) {
                return a.slice(0).sort()
            },
            e = function(a, b) {
                throw new c("All required keys (" + d(a).join(", ") + ") were not specified. Specified keys were: " + d(b).join(", ") + ".")
            },
            f = function(a) {
                throw new c("Unsupported keys for object: " + d(a).join(", "))
            },
            g = function(d, e) {
                if (!b.isArray(e)) throw new c("The " + d + " fields must be an array. Was: " + e + ".");
                a.each(e, function(a) {
                    if (!b.isString(a)) throw new c("The value " + a + " in the " + d + " fields was not a string.")
                })
            },
            h = function(a, b) {
                throw new c("All values need to be of type: " + b + ". Keys (" + d(a).join(", ") + ") were not.")
            },
            i = function(b) {
                var e = d(b),
                    f = a.find(e, function(a, b) {
                        return b < e.length - 1 && a === e[b + 1]
                    });
                f.each(function(a) {
                    throw new c("The field: " + a + " occurs more than once in the combined fields: [" + e.join(", ") + "].")
                })
            };
        return {
            sort: d,
            reqMessage: e,
            unsuppMessage: f,
            validateStrArr: g,
            invalidTypeMessage: h,
            checkDupes: i
        }
    }), g("6n", ["3x", "1m", "63", "4z", "78", "3z", "5s"], function(a, b, c, d, e, f, g) {
        return function(h, i) {
            var j = h.concat(i);
            if (0 === j.length) throw new f("You must specify at least one required or optional field.");
            return e.validateStrArr("required", h), e.validateStrArr("optional", i), e.checkDupes(j),
                function(f) {
                    var k = c.keys(f),
                        l = a.forall(h, function(b) {
                            return a.contains(k, b)
                        });
                    l || e.reqMessage(h, k);
                    var m = a.filter(k, function(b) {
                        return !a.contains(j, b)
                    });
                    m.length > 0 && e.unsuppMessage(m);
                    var n = {};
                    return a.each(h, function(a) {
                        n[a] = b.constant(f[a])
                    }), a.each(i, function(a) {
                        n[a] = b.constant(g.prototype.hasOwnProperty.call(f, a) ? d.some(f[a]) : d.none())
                    }), n
                }
        }
    }), g("61", ["6m", "6n"], function(a, b) {
        return {
            immutable: a,
            immutableBag: b
        }
    }), g("62", [], function() {
        var a = function(a, b) {
            var c = [],
                d = function(a) {
                    return c.push(a), b(a)
                },
                e = b(a);
            do e = e.bind(d); while (e.isSome());
            return c
        };
        return {
            toArray: a
        }
    }), g("59", ["60", "3x", "1m", "4z", "61", "62", "1q", "1r"], function(a, b, c, d, e, f, g, h) {
        var i = function(a) {
                return h.fromDom(a.dom().ownerDocument)
            },
            j = function(a) {
                var b = i(a);
                return h.fromDom(b.dom().documentElement)
            },
            k = function(a) {
                var b = a.dom(),
                    c = b.ownerDocument.defaultView;
                return h.fromDom(c)
            },
            l = function(a) {
                var b = a.dom();
                return d.from(b.parentNode).map(h.fromDom)
            },
            m = function(a) {
                return l(a).bind(function(c) {
                    var d = u(c);
                    return b.findIndex(d, function(b) {
                        return g.eq(a, b)
                    })
                })
            },
            n = function(b, d) {
                for (var e = a.isFunction(d) ? d : c.constant(!1), f = b.dom(), g = []; null !== f.parentNode && void 0 !== f.parentNode;) {
                    var i = f.parentNode,
                        j = h.fromDom(i);
                    if (g.push(j), e(j) === !0) break;
                    f = i
                }
                return g
            },
            o = function(a) {
                var c = function(c) {
                    return b.filter(c, function(b) {
                        return !g.eq(a, b)
                    })
                };
                return l(a).map(u).map(c).getOr([])
            },
            p = function(a) {
                var b = a.dom();
                return d.from(b.offsetParent).map(h.fromDom)
            },
            q = function(a) {
                var b = a.dom();
                return d.from(b.previousSibling).map(h.fromDom)
            },
            r = function(a) {
                var b = a.dom();
                return d.from(b.nextSibling).map(h.fromDom)
            },
            s = function(a) {
                return b.reverse(f.toArray(a, q))
            },
            t = function(a) {
                return f.toArray(a, r)
            },
            u = function(a) {
                var c = a.dom();
                return b.map(c.childNodes, h.fromDom)
            },
            v = function(a, b) {
                var c = a.dom().childNodes;
                return d.from(c[b]).map(h.fromDom)
            },
            w = function(a) {
                return v(a, 0)
            },
            x = function(a) {
                return v(a, a.dom().childNodes.length - 1)
            },
            y = e.immutable("element", "offset"),
            z = function(a, b) {
                var c = u(a);
                return c.length > 0 && b < c.length ? y(c[b], 0) : y(a, b)
            };
        return {
            owner: i,
            defaultView: k,
            documentElement: j,
            parent: l,
            findIndex: m,
            parents: n,
            siblings: o,
            prevSibling: q,
            offsetParent: p,
            prevSiblings: s,
            nextSibling: r,
            nextSiblings: t,
            children: u,
            child: v,
            firstChild: w,
            lastChild: x,
            leaf: z
        }
    }), g("4a", ["59"], function(a) {
        var b = function(b, c) {
                var d = a.parent(b);
                d.each(function(a) {
                    a.dom().insertBefore(c.dom(), b.dom())
                })
            },
            c = function(c, d) {
                var f = a.nextSibling(c);
                f.fold(function() {
                    var b = a.parent(c);
                    b.each(function(a) {
                        e(a, d)
                    })
                }, function(a) {
                    b(a, d)
                })
            },
            d = function(b, c) {
                var d = a.firstChild(b);
                d.fold(function() {
                    e(b, c)
                }, function(a) {
                    b.dom().insertBefore(c.dom(), a.dom())
                })
            },
            e = function(a, b) {
                a.dom().appendChild(b.dom())
            },
            f = function(c, d, f) {
                a.child(c, f).fold(function() {
                    e(c, d)
                }, function(a) {
                    b(a, d)
                })
            },
            g = function(a, c) {
                b(a, c), e(c, a)
            };
        return {
            before: b,
            after: c,
            prepend: d,
            append: e,
            appendAt: f,
            wrap: g
        }
    }), g("4d", ["58"], function(a) {
        var b = function(a) {
                var b = a.dom().nodeName;
                return b.toLowerCase()
            },
            c = function(a) {
                return a.dom().nodeType
            },
            d = function(a) {
                return a.dom().nodeValue
            },
            e = function(a) {
                return function(b) {
                    return c(b) === a
                }
            },
            f = function(d) {
                return c(d) === a.COMMENT || "#comment" === b(d)
            },
            g = e(a.ELEMENT),
            h = e(a.TEXT),
            i = e(a.DOCUMENT);
        return {
            name: b,
            type: c,
            value: d,
            isElement: g,
            isText: h,
            isDocument: i,
            isComment: f
        }
    }), g("5a", ["60", "3x", "63", "4d", "3z", "49"], function(a, b, c, d, e, f) {
        var g = function(b, c, d) {
                if (!(a.isString(d) || a.isBoolean(d) || a.isNumber(d))) throw f.error("Invalid call to Attr.set. Key ", c, ":: Value ", d, ":: Element ", b), new e("Attribute value was not simple");
                b.setAttribute(c, d + "")
            },
            h = function(a, b, c) {
                g(a.dom(), b, c)
            },
            i = function(a, b) {
                var d = a.dom();
                c.each(b, function(a, b) {
                    g(d, b, a)
                })
            },
            j = function(a, b) {
                var c = a.dom().getAttribute(b);
                return null === c ? void 0 : c
            },
            k = function(a, b) {
                var c = a.dom();
                return !(!c || !c.hasAttribute) && c.hasAttribute(b)
            },
            l = function(a, b) {
                a.dom().removeAttribute(b)
            },
            m = function(a) {
                var b = a.dom().attributes;
                return void 0 === b || null === b || 0 === b.length
            },
            n = function(a) {
                return b.foldl(a.dom().attributes, function(a, b) {
                    return a[b.name] = b.value, a
                }, {})
            },
            o = function(a, b, c) {
                k(a, c) && !k(b, c) && h(b, c, j(a, c))
            },
            p = function(a, c, e) {
                d.isElement(a) && d.isElement(c) && b.each(e, function(b) {
                    o(a, c, b)
                })
            };
        return {
            clone: n,
            set: h,
            setAll: i,
            get: j,
            has: k,
            remove: l,
            hasNone: m,
            transfer: p
        }
    }), g("5b", ["3x", "4a"], function(a, b) {
        var c = function(c, d) {
                a.each(d, function(a) {
                    b.before(c, a)
                })
            },
            d = function(c, d) {
                a.each(d, function(a, e) {
                    var f = 0 === e ? c : d[e - 1];
                    b.after(f, a)
                })
            },
            e = function(c, d) {
                a.each(d.slice().reverse(), function(a) {
                    b.prepend(c, a)
                })
            },
            f = function(c, d) {
                a.each(d, function(a) {
                    b.append(c, a)
                })
            };
        return {
            before: c,
            after: d,
            prepend: e,
            append: f
        }
    }), g("5c", ["3x", "5b", "59"], function(a, b, c) {
        var d = function(b) {
                b.dom().textContent = "", a.each(c.children(b), function(a) {
                    e(a)
                })
            },
            e = function(a) {
                var b = a.dom();
                null !== b.parentNode && b.parentNode.removeChild(b)
            },
            f = function(a) {
                var d = c.children(a);
                d.length > 0 && b.before(a, d), e(a)
            };
        return {
            empty: d,
            remove: e,
            unwrap: f
        }
    }), g("4b", ["5a", "1r", "4a", "5b", "5c", "59"], function(a, b, c, d, e, f) {
        var g = function(a, c) {
                return b.fromDom(a.dom().cloneNode(c))
            },
            h = function(a) {
                return g(a, !1)
            },
            i = function(a) {
                return g(a, !0)
            },
            j = function(c, d) {
                var e = b.fromTag(d),
                    f = a.clone(c);
                return a.setAll(e, f), e
            },
            k = function(a, b) {
                var c = j(a, b),
                    e = f.children(i(a));
                return d.append(c, e), c
            },
            l = function(a, b) {
                var g = j(a, b);
                c.before(a, g);
                var h = f.children(a);
                return d.append(g, h), e.remove(a), g
            };
        return {
            shallow: h,
            shallowAs: j,
            deep: i,
            copy: k,
            mutate: l
        }
    }), g("4c", ["3x", "1r", "22"], function(a, b, c) {
        var d = function(d, e) {
            var f = e || c,
                g = f.createDocumentFragment();
            return a.each(d, function(a) {
                g.appendChild(a.dom())
            }), b.fromDom(g)
        };
        return {
            fromElements: d
        }
    }), g("4e", ["3x", "1m", "4d"], function(a, b, c) {
        var d = ["article", "aside", "details", "div", "dt", "figcaption", "footer", "form", "fieldset", "header", "hgroup", "html", "main", "nav", "section", "summary", "body", "p", "dl", "multicol", "dd", "figure", "address", "center", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "listing", "xmp", "pre", "plaintext", "menu", "dir", "ul", "ol", "li", "hr", "table", "tbody", "thead", "tfoot", "th", "tr", "td", "caption"],
            e = ["area", "base", "basefont", "br", "col", "frame", "hr", "img", "input", "isindex", "link", "meta", "param", "embed", "source", "wbr", "track"],
            f = ["td", "th"],
            g = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "address", "pre", "form", "blockquote", "center", "dir", "fieldset", "header", "footer", "article", "section", "hgroup", "aside", "nav", "figure"],
            h = ["h1", "h2", "h3", "h4", "h5", "h6"],
            i = function(d) {
                var e;
                return function(f) {
                    return e = e ? e : a.mapToObject(d, b.constant(!0)), e.hasOwnProperty(c.name(f))
                }
            },
            j = i(h),
            k = i(d),
            l = function(a) {
                return c.isElement(a) && !k(a)
            };
        return {
            isBlock: k,
            isInline: l,
            isHeading: j,
            isTextBlock: i(g),
            isVoid: i(e),
            isTableCell: i(f)
        }
    }), g("4f", ["1m", "1q", "59"], function(a, b, c) {
        var d = function(a) {
                return a.slice(0, -1)
            },
            e = function(a, e, f) {
                return b.contains(e, a) ? d(c.parents(a, function(a) {
                    return f(a) || b.eq(a, e)
                })) : []
            },
            f = function(b, c) {
                return e(b, c, a.constant(!1))
            },
            g = function(a, b) {
                return [a].concat(f(a, b))
            };
        return {
            parentsUntil: e,
            parents: f,
            parentsAndSelf: g
        }
    }), g("5d", ["4z"], function(a) {
        var b = function(a) {
                for (var b = [], c = function(a) {
                        b.push(a)
                    }, d = 0; d < a.length; d++) a[d].each(c);
                return b
            },
            c = function(b, c) {
                for (var d = 0; d < b.length; d++) {
                    var e = c(b[d], d);
                    if (e.isSome()) return e
                }
                return a.none()
            },
            d = function(b, c) {
                for (var d = [], e = 0; e < b.length; e++) {
                    var f = b[e];
                    if (!f.isSome()) return a.none();
                    d.push(f.getOrDie())
                }
                return a.some(c.apply(null, d))
            };
        return {
            cat: b,
            findMap: c,
            liftN: d
        }
    }), g("4g", ["3x", "1m", "4z", "5d", "1q", "1r", "4d", "59", "1j"], function(a, b, c, d, e, f, g, h, i) {
        var j = function(a) {
                var b = a.startContainer,
                    d = a.startOffset;
                return i.isText(b) ? 0 === d ? c.some(f.fromDom(b)) : c.none() : c.from(b.childNodes[d]).map(f.fromDom)
            },
            k = function(a) {
                var b = a.endContainer,
                    d = a.endOffset;
                return i.isText(b) ? d === b.data.length ? c.some(f.fromDom(b)) : c.none() : c.from(b.childNodes[d - 1]).map(f.fromDom)
            },
            l = function(a) {
                return h.firstChild(a).fold(b.constant([a]), function(b) {
                    return [a].concat(l(b))
                })
            },
            m = function(a) {
                return h.lastChild(a).fold(b.constant([a]), function(b) {
                    return "br" === g.name(b) ? h.prevSibling(b).map(function(b) {
                        return [a].concat(m(b))
                    }).getOr([]) : [a].concat(m(b))
                })
            },
            n = function(c, f) {
                return d.liftN([j(f), k(f)], function(d, f) {
                    var g = a.find(l(c), b.curry(e.eq, d)),
                        h = a.find(m(c), b.curry(e.eq, f));
                    return g.isSome() && h.isSome()
                }).getOr(!1)
            };
        return {
            hasAllContentsSelected: n
        }
    }), g("1u", ["3x", "1m", "4a", "4b", "1r", "4c", "4d", "4e", "4f", "4g"], function(a, b, c, d, e, f, g, h, i, j) {
        var k = function(b) {
                return a.find(b, function(a) {
                    return "ul" === g.name(a) || "ol" === g.name(a)
                })
            },
            l = function(c, d) {
                return a.find(c, function(a) {
                    return "li" === g.name(a) && j.hasAllContentsSelected(a, d)
                }).fold(b.constant([]), function(a) {
                    return k(c).map(function(a) {
                        return [e.fromTag("li"), e.fromTag(g.name(a))]
                    }).getOr([])
                })
            },
            m = function(b, d) {
                var e = a.foldl(d, function(a, b) {
                    return c.append(b, a), b
                }, b);
                return d.length > 0 ? f.fromElements([e]) : e
            },
            n = function(b, c) {
                var f = i.parentsAndSelf(e.fromDom(c.commonAncestorContainer), e.fromDom(b)),
                    g = a.filter(f, function(a) {
                        return h.isInline(a) || h.isHeading(a)
                    }),
                    j = l(f, c);
                return a.map(g.concat(j), d.shallow)
            },
            o = function(a, b) {
                return m(e.fromDom(b.cloneContents()), n(a, b))
            },
            p = function(a, b) {
                return b.collapsed ? f.fromElements([]) : o(a, b)
            };
        return {
            read: p
        }
    }), g("s", ["1q", "1r", "1p", "r", "q", "1j", "h", "1s", "c", "1t", "6", "1u", "1l", "9"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        function o(a, b, c, f) {
            var g = this;
            g.dom = a, g.win = b, g.serializer = c, g.editor = f, g.bookmarkManager = new d(g), g.controlSelection = new e(g, f), g.win.getSelection || (g.tridentSel = new j(g))
        }
        var p = n.each,
            q = n.trim,
            r = k.ie,
            s = function(c) {
                return !(!c || !c.ownerDocument) && a.contains(b.fromDom(c.ownerDocument), b.fromDom(c))
            },
            t = function(a) {
                return !!a && (!!a.select || s(a.startContainer) && s(a.endContainer))
            };
        return o.prototype = {
            setCursorLocation: function(a, b) {
                var c = this,
                    d = c.dom.createRng();
                a ? (d.setStart(a, b), d.setEnd(a, b), c.setRng(d), c.collapse(!1)) : (c._moveEndPoint(d, c.editor.getBody(), !0), c.setRng(d))
            },
            getContent: function(a) {
                var b, c, d, e = this,
                    f = e.getRng(),
                    g = e.dom.create("body"),
                    h = e.getSel();
                return a = a || {}, b = c = "", a.get = !0, a.format = a.format || "html", a.selection = !0, e.editor.fire("BeforeGetContent", a), "text" === a.format ? e.isCollapsed() ? "" : m.trim(f.text || (h.toString ? h.toString() : "")) : (f.cloneContents ? (d = a.contextual ? l.read(e.editor.getBody(), f).dom() : f.cloneContents(), d && g.appendChild(d)) : void 0 !== f.item || void 0 !== f.htmlText ? (g.innerHTML = "<br>" + (f.item ? f.item(0).outerHTML : f.htmlText), g.removeChild(g.firstChild)) : g.innerHTML = f.toString(), /^\s/.test(g.innerHTML) && (b = " "), /\s+$/.test(g.innerHTML) && (c = " "), a.getInner = !0, a.content = e.isCollapsed() ? "" : b + e.serializer.serialize(g, a) + c, e.editor.fire("GetContent", a), a.content)
            },
            setContent: function(a, b) {
                var c, d, e, f = this,
                    g = f.getRng(),
                    h = f.win.document;
                if (b = b || {
                        format: "html"
                    }, b.set = !0, b.selection = !0, b.content = a, b.no_events || f.editor.fire("BeforeSetContent", b), a = b.content, g.insertNode) {
                    a += '<span id="__caret">_</span>', g.startContainer == h && g.endContainer == h ? h.body.innerHTML = a : (g.deleteContents(), 0 === h.body.childNodes.length ? h.body.innerHTML = a : g.createContextualFragment ? g.insertNode(g.createContextualFragment(a)) : (d = h.createDocumentFragment(), e = h.createElement("div"), d.appendChild(e), e.outerHTML = a, g.insertNode(d))), c = f.dom.get("__caret"), g = h.createRange(), g.setStartBefore(c), g.setEndBefore(c), f.setRng(g), f.dom.remove("__caret");
                    try {
                        f.setRng(g)
                    } catch (a) {}
                } else g.item && (h.execCommand("Delete", !1, null), g = f.getRng()), /^\s+/.test(a) ? (g.pasteHTML('<span id="__mce_tmp">_</span>' + a), f.dom.remove("__mce_tmp")) : g.pasteHTML(a);
                b.no_events || f.editor.fire("SetContent", b)
            },
            getStart: function(a) {
                var b, c, d, e, f = this,
                    g = f.getRng();
                if (g.duplicate || g.item) {
                    if (g.item) return g.item(0);
                    for (d = g.duplicate(), d.collapse(1), b = d.parentElement(), b.ownerDocument !== f.dom.doc && (b = f.dom.getRoot()), c = e = g.parentElement(); e = e.parentNode;)
                        if (e == b) {
                            b = c;
                            break
                        }
                    return b
                }
                return b = g.startContainer, 1 == b.nodeType && b.hasChildNodes() && (a && g.collapsed || (b = b.childNodes[Math.min(b.childNodes.length - 1, g.startOffset)])), b && 3 == b.nodeType ? b.parentNode : b
            },
            getEnd: function(a) {
                var b, c, d = this,
                    e = d.getRng();
                return e.duplicate || e.item ? e.item ? e.item(0) : (e = e.duplicate(), e.collapse(0), b = e.parentElement(), b.ownerDocument !== d.dom.doc && (b = d.dom.getRoot()), b && "BODY" == b.nodeName ? b.lastChild || b : b) : (b = e.endContainer, c = e.endOffset, 1 == b.nodeType && b.hasChildNodes() && (a && e.collapsed || (b = b.childNodes[c > 0 ? c - 1 : c])), b && 3 == b.nodeType ? b.parentNode : b)
            },
            getBookmark: function(a, b) {
                return this.bookmarkManager.getBookmark(a, b)
            },
            moveToBookmark: function(a) {
                return this.bookmarkManager.moveToBookmark(a)
            },
            select: function(a, b) {
                var c, d = this,
                    e = d.dom,
                    f = e.createRng();
                if (d.lastFocusBookmark = null, a) {
                    if (!b && d.controlSelection.controlSelect(a)) return;
                    c = e.nodeIndex(a), f.setStart(a.parentNode, c), f.setEnd(a.parentNode, c + 1), b && (d._moveEndPoint(f, a, !0), d._moveEndPoint(f, a)), d.setRng(f)
                }
                return a
            },
            isCollapsed: function() {
                var a = this,
                    b = a.getRng(),
                    c = a.getSel();
                return !(!b || b.item) && (b.compareEndPoints ? 0 === b.compareEndPoints("StartToEnd", b) : !c || b.collapsed)
            },
            collapse: function(a) {
                var b, c = this,
                    d = c.getRng();
                d.item && (b = d.item(0), d = c.win.document.body.createTextRange(), d.moveToElementText(b)), d.collapse(!!a), c.setRng(d)
            },
            getSel: function() {
                var a = this.win;
                return a.getSelection ? a.getSelection() : a.document.selection
            },
            getRng: function(a) {
                function b(a, b, c) {
                    try {
                        return b.compareBoundaryPoints(a, c)
                    } catch (a) {
                        return -1
                    }
                }
                var c, d, e, f, g, h, i = this;
                if (!i.win) return null;
                if (f = i.win.document, "undefined" == typeof f || null === f) return null;
                if (!a && i.lastFocusBookmark) {
                    var j = i.lastFocusBookmark;
                    return j.startContainer ? (d = f.createRange(), d.setStart(j.startContainer, j.startOffset), d.setEnd(j.endContainer, j.endOffset)) : d = j, d
                }
                if (a && i.tridentSel) return i.tridentSel.getRangeAt(0);
                try {
                    (c = i.getSel()) && (d = c.rangeCount > 0 ? c.getRangeAt(0) : c.createRange ? c.createRange() : f.createRange())
                } catch (a) {}
                if (h = i.editor.fire("GetSelectionRange", {
                        range: d
                    }), h.range !== d) return h.range;
                if (r && d && d.setStart && f.selection) {
                    try {
                        g = f.selection.createRange()
                    } catch (a) {}
                    g && g.item && (e = g.item(0), d = f.createRange(), d.setStartBefore(e), d.setEndAfter(e))
                }
                return d || (d = f.createRange ? f.createRange() : f.body.createTextRange()), d.setStart && 9 === d.startContainer.nodeType && d.collapsed && (e = i.dom.getRoot(), d.setStart(e, 0), d.setEnd(e, 0)), i.selectedRange && i.explicitRange && (0 === b(d.START_TO_START, d, i.selectedRange) && 0 === b(d.END_TO_END, d, i.selectedRange) ? d = i.explicitRange : (i.selectedRange = null, i.explicitRange = null)), d
            },
            setRng: function(a, b) {
                var c, d, e, f = this;
                if (t(a))
                    if (a.select) {
                        f.explicitRange = null;
                        try {
                            a.select()
                        } catch (a) {}
                    } else if (f.tridentSel) {
                    if (a.cloneRange) try {
                        f.tridentSel.addRange(a)
                    } catch (a) {}
                } else {
                    if (c = f.getSel(), e = f.editor.fire("SetSelectionRange", {
                            range: a,
                            forward: b
                        }), a = e.range, c) {
                        f.explicitRange = a;
                        try {
                            c.removeAllRanges(), c.addRange(a)
                        } catch (a) {}
                        b === !1 && c.extend && (c.collapse(a.endContainer, a.endOffset), c.extend(a.startContainer, a.startOffset)), f.selectedRange = c.rangeCount > 0 ? c.getRangeAt(0) : null
                    }
                    a.collapsed || a.startContainer !== a.endContainer || !c.setBaseAndExtent || k.ie || a.endOffset - a.startOffset < 2 && a.startContainer.hasChildNodes() && (d = a.startContainer.childNodes[a.startOffset], d && "IMG" === d.tagName && (c.setBaseAndExtent(a.startContainer, a.startOffset, a.endContainer, a.endOffset), c.anchorNode === a.startContainer && c.focusNode === a.endContainer || c.setBaseAndExtent(d, 0, d, 1))), f.editor.fire("AfterSetSelectionRange", {
                        range: a,
                        forward: b
                    })
                }
            },
            setNode: function(a) {
                var b = this;
                return b.setContent(b.dom.getOuterHTML(a)), a
            },
            getNode: function() {
                function a(a, b) {
                    for (var c = a; a && 3 === a.nodeType && 0 === a.length;) a = b ? a.nextSibling : a.previousSibling;
                    return a || c
                }
                var b, c, d, e, f, g = this,
                    h = g.getRng(),
                    i = g.dom.getRoot();
                return h ? (c = h.startContainer, d = h.endContainer, e = h.startOffset, f = h.endOffset, h.setStart ? (b = h.commonAncestorContainer, !h.collapsed && (c == d && f - e < 2 && c.hasChildNodes() && (b = c.childNodes[e]), 3 === c.nodeType && 3 === d.nodeType && (c = c.length === e ? a(c.nextSibling, !0) : c.parentNode, d = 0 === f ? a(d.previousSibling, !1) : d.parentNode, c && c === d)) ? c : b && 3 == b.nodeType ? b.parentNode : b) : (b = h.item ? h.item(0) : h.parentElement(), b.ownerDocument !== g.win.document && (b = i), b)) : i
            },
            getSelectedBlocks: function(a, b) {
                var c, d, e = this,
                    f = e.dom,
                    g = [];
                if (d = f.getRoot(), a = f.getParent(a || e.getStart(), f.isBlock), b = f.getParent(b || e.getEnd(), f.isBlock), a && a != d && g.push(a), a && b && a != b) {
                    c = a;
                    for (var h = new i(a, d);
                        (c = h.next()) && c != b;) f.isBlock(c) && g.push(c)
                }
                return b && a != b && b != d && g.push(b), g
            },
            isForward: function() {
                var a, b, c = this.dom,
                    d = this.getSel();
                return !(d && d.anchorNode && d.focusNode) || (a = c.createRng(), a.setStart(d.anchorNode, d.anchorOffset), a.collapse(!0), b = c.createRng(), b.setStart(d.focusNode, d.focusOffset), b.collapse(!0), a.compareBoundaryPoints(a.START_TO_START, b) <= 0)
            },
            normalize: function() {
                var a = this,
                    b = a.getRng();
                return k.range && new g(a.dom).normalize(b) && a.setRng(b, a.isForward()), b
            },
            selectorChanged: function(a, b) {
                var c, d = this;
                return d.selectorChangedData || (d.selectorChangedData = {}, c = {}, d.editor.on("NodeChange", function(a) {
                    var b = a.element,
                        e = d.dom,
                        f = e.getParents(b, null, e.getRoot()),
                        g = {};
                    p(d.selectorChangedData, function(a, b) {
                        p(f, function(d) {
                            if (e.is(d, b)) return c[b] || (p(a, function(a) {
                                a(!0, {
                                    node: d,
                                    selector: b,
                                    parents: f
                                })
                            }), c[b] = a), g[b] = a, !1
                        })
                    }), p(c, function(a, d) {
                        g[d] || (delete c[d], p(a, function(a) {
                            a(!1, {
                                node: b,
                                selector: d,
                                parents: f
                            })
                        }))
                    })
                })), d.selectorChangedData[a] || (d.selectorChangedData[a] = []), d.selectorChangedData[a].push(b), d
            },
            getScrollContainer: function() {
                for (var a, b = this.dom.getRoot(); b && "BODY" != b.nodeName;) {
                    if (b.scrollHeight > b.clientHeight) {
                        a = b;
                        break
                    }
                    b = b.parentNode
                }
                return a
            },
            scrollIntoView: function(a, b) {
                h.scrollIntoView(this.editor, a, b)
            },
            placeCaretAt: function(a, b) {
                this.setRng(g.getCaretRangeFromPoint(a, b, this.editor.getDoc()))
            },
            _moveEndPoint: function(a, b, c) {
                var d = b,
                    e = new i(b, d),
                    f = this.dom.schema.getNonEmptyElements();
                do {
                    if (3 == b.nodeType && 0 !== q(b.nodeValue).length) return void(c ? a.setStart(b, 0) : a.setEnd(b, b.nodeValue.length));
                    if (f[b.nodeName] && !/^(TD|TH)$/.test(b.nodeName)) return void(c ? a.setStartBefore(b) : "BR" == b.nodeName ? a.setEndBefore(b) : a.setEndAfter(b));
                    if (k.ie && k.ie < 11 && this.dom.isBlock(b) && this.dom.isEmpty(b)) return void(c ? a.setStart(b, 0) : a.setEnd(b, 0))
                } while (b = c ? e.next() : e.prev());
                "BODY" == d.nodeName && (c ? a.setStart(d, 0) : a.setEnd(d, d.childNodes.length))
            },
            getBoundingClientRect: function() {
                var a = this.getRng();
                return a.collapsed ? c.fromRangeStart(a).getClientRects()[0] : a.getBoundingClientRect()
            },
            destroy: function() {
                this.win = null, this.controlSelection.destroy()
            }
        }, o
    }), g("1v", ["r", "9"], function(a, b) {
        function c(b) {
            this.compare = function(c, e) {
                function f(a) {
                    var c = {};
                    return d(b.getAttribs(a), function(d) {
                        var e = d.nodeName.toLowerCase();
                        0 !== e.indexOf("_") && "style" !== e && 0 !== e.indexOf("data-") && (c[e] = b.getAttrib(a, e))
                    }), c
                }

                function g(a, b) {
                    var c, d;
                    for (d in a)
                        if (a.hasOwnProperty(d)) {
                            if (c = b[d], "undefined" == typeof c) return !1;
                            if (a[d] != c) return !1;
                            delete b[d]
                        }
                    for (d in b)
                        if (b.hasOwnProperty(d)) return !1;
                    return !0
                }
                return c.nodeName == e.nodeName && (!!g(f(c), f(e)) && (!!g(b.parseStyle(b.getAttrib(c, "style")), b.parseStyle(b.getAttrib(e, "style"))) && (!a.isBookmarkNode(c) && !a.isBookmarkNode(e))))
            }
        }
        var d = b.each;
        return c
    }), g("1x", ["e", "9", "j"], function(a, b, c) {
        function d(a, d) {
            function e(a, b) {
                b.classes.length && j.addClass(a, b.classes.join(" ")), j.setAttribs(a, b.attrs)
            }

            function f(a) {
                var b;
                return k = "string" == typeof a ? {
                    name: a,
                    classes: [],
                    attrs: {}
                } : a, b = j.create(k.name), e(b, k), b
            }

            function g(a, c) {
                var d = "string" != typeof a ? a.nodeName.toLowerCase() : a,
                    e = m.getElementRule(d),
                    f = e && e.parentsRequired;
                return !(!f || !f.length) && (c && b.inArray(f, c) !== -1 ? c : f[0])
            }

            function h(a, c, d) {
                var e, i, k, l = c.length > 0 && c[0],
                    m = l && l.name;
                if (k = g(a, m)) m == k ? (i = c[0], c = c.slice(1)) : i = k;
                else if (l) i = c[0], c = c.slice(1);
                else if (!d) return a;
                return i && (e = f(i), e.appendChild(a)), d && (e || (e = j.create("div"), e.appendChild(a)), b.each(d, function(b) {
                    var c = f(b);
                    e.insertBefore(c, a)
                })), h(e, c, i && i.siblings)
            }
            var i, k, l, m = d && d.schema || new c({});
            return a && a.length ? (k = a[0], i = f(k), l = j.create("div"), l.appendChild(h(i, a.slice(1), k.siblings)), l) : ""
        }

        function e(a, b) {
            return d(g(a), b)
        }

        function f(a) {
            var c, d = {
                classes: [],
                attrs: {}
            };
            return a = d.selector = b.trim(a), "*" !== a && (c = a.replace(/(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g, function(a, c, e, f, g) {
                switch (c) {
                    case "#":
                        d.attrs.id = e;
                        break;
                    case ".":
                        d.classes.push(e);
                        break;
                    case ":":
                        b.inArray("checked disabled enabled read-only required".split(" "), e) !== -1 && (d.attrs[e] = e)
                }
                if ("[" == f) {
                    var h = g.match(/([\w\-]+)(?:\=\"([^\"]+))?/);
                    h && (d.attrs[h[1]] = h[2])
                }
                return ""
            })), d.name = c || "div", d
        }

        function g(a) {
            return a && "string" == typeof a ? (a = a.split(/\s*,\s*/)[0], a = a.replace(/\s*(~\+|~|\+|>)\s*/g, "$1"), b.map(a.split(/(?:>|\s+(?![^\[\]]+\]))/), function(a) {
                var c = b.map(a.split(/(?:~\+|~|\+)/), f),
                    d = c.pop();
                return c.length && (d.siblings = c), d
            }).reverse()) : []
        }

        function h(a, b) {
            function c(a) {
                return a.replace(/%(\w+)/g, "")
            }
            var e, f, h, k, l, m, n = "";
            if (m = a.settings.preview_styles, m === !1) return "";
            if ("string" != typeof m && (m = "font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow"), "string" == typeof b) {
                if (b = a.formatter.get(b), !b) return;
                b = b[0]
            }
            return "preview" in b && (m = b.preview, m === !1) ? "" : (e = b.block || b.inline || "span", k = g(b.selector), k.length ? (k[0].name || (k[0].name = e), e = b.selector, f = d(k, a)) : f = d([e], a), h = j.select(e, f)[0] || f.firstChild, i(b.styles, function(a, b) {
                a = c(a), a && j.setStyle(h, b, a)
            }), i(b.attributes, function(a, b) {
                a = c(a), a && j.setAttrib(h, b, a)
            }), i(b.classes, function(a) {
                a = c(a), j.hasClass(h, a) || j.addClass(h, a)
            }), a.fire("PreviewFormats"), j.setStyles(f, {
                position: "absolute",
                left: -65535
            }), a.getBody().appendChild(f), l = j.getStyle(a.getBody(), "fontSize", !0), l = /px$/.test(l) ? parseInt(l, 10) : 0, i(m.split(" "), function(b) {
                var c = j.getStyle(h, b, !0);
                if (!("background-color" == b && /transparent|rgba\s*\([^)]+,\s*0\)/.test(c) && (c = j.getStyle(a.getBody(), b, !0), "#ffffff" == j.toHex(c).toLowerCase()) || "color" == b && "#000000" == j.toHex(c).toLowerCase())) {
                    if ("font-size" == b && /em|%$/.test(c)) {
                        if (0 === l) return;
                        c = parseFloat(c, 10) / (/%$/.test(c) ? 100 : 1), c = c * l + "px"
                    }
                    "border" == b && c && (n += "padding:0 2px;"), n += b + ":" + c + ";"
                }
            }), a.fire("AfterPreviewFormats"), j.remove(f), n)
        }
        var i = b.each,
            j = a.DOM;
        return {
            getCssText: h,
            parseSelector: g,
            selectorToHtml: e
        }
    }), g("1y", ["1g", "1j", "a"], function(a, b, c) {
        function d(a, b) {
            var c = f[a];
            c || (f[a] = c = []), f[a].push(b)
        }

        function e(a, b) {
            h(f[a], function(a) {
                a(b)
            })
        }
        var f = {},
            g = a.filter,
            h = a.each;
        return d("pre", function(d) {
            function e(b) {
                return i(b.previousSibling) && a.indexOf(j, b.previousSibling) != -1
            }

            function f(a, b) {
                c(b).remove(), c(a).append("<br><br>").append(b.childNodes)
            }
            var i, j, k = d.selection.getRng();
            i = b.matchNodeNames("pre"), k.collapsed || (j = d.selection.getSelectedBlocks(), h(g(g(j, i), e), function(a) {
                f(a.previousSibling, a)
            }))
        }), {
            postProcess: e
        }
    }), g("t", ["c", "h", "r", "1v", "1j", "1w", "9", "1x", "1y"], function(a, b, c, d, e, f, g, h, i) {
        return function(j) {
            function k(a) {
                return a.nodeType && (a = a.nodeName), !!j.schema.getTextBlockElements()[a.toLowerCase()]
            }

            function l(a) {
                return /^(TH|TD)$/.test(a.nodeName)
            }

            function m(a) {
                return a && /^(IMG)$/.test(a.nodeName)
            }

            function n(a, b) {
                return da.getParents(a, b, da.getRoot())
            }

            function o(a) {
                return 1 === a.nodeType && "_mce_caret" === a.id
            }

            function p() {
                s({
                    valigntop: [{
                        selector: "td,th",
                        styles: {
                            verticalAlign: "top"
                        }
                    }],
                    valignmiddle: [{
                        selector: "td,th",
                        styles: {
                            verticalAlign: "middle"
                        }
                    }],
                    valignbottom: [{
                        selector: "td,th",
                        styles: {
                            verticalAlign: "bottom"
                        }
                    }],
                    alignleft: [{
                        selector: "figure.image",
                        collapsed: !1,
                        classes: "align-left",
                        ceFalseOverride: !0,
                        preview: "font-family font-size"
                    }, {
                        selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
                        styles: {
                            textAlign: "left"
                        },
                        inherit: !1,
                        preview: !1,
                        defaultBlock: "div"
                    }, {
                        selector: "img,table",
                        collapsed: !1,
                        styles: {
                            "float": "left"
                        },
                        preview: "font-family font-size"
                    }],
                    aligncenter: [{
                        selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
                        styles: {
                            textAlign: "center"
                        },
                        inherit: !1,
                        preview: !1,
                        defaultBlock: "div"
                    }, {
                        selector: "figure.image",
                        collapsed: !1,
                        classes: "align-center",
                        ceFalseOverride: !0,
                        preview: "font-family font-size"
                    }, {
                        selector: "img",
                        collapsed: !1,
                        styles: {
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto"
                        },
                        preview: !1
                    }, {
                        selector: "table",
                        collapsed: !1,
                        styles: {
                            marginLeft: "auto",
                            marginRight: "auto"
                        },
                        preview: "font-family font-size"
                    }],
                    alignright: [{
                        selector: "figure.image",
                        collapsed: !1,
                        classes: "align-right",
                        ceFalseOverride: !0,
                        preview: "font-family font-size"
                    }, {
                        selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
                        styles: {
                            textAlign: "right"
                        },
                        inherit: !1,
                        preview: "font-family font-size",
                        defaultBlock: "div"
                    }, {
                        selector: "img,table",
                        collapsed: !1,
                        styles: {
                            "float": "right"
                        },
                        preview: "font-family font-size"
                    }],
                    alignjustify: [{
                        selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
                        styles: {
                            textAlign: "justify"
                        },
                        inherit: !1,
                        defaultBlock: "div",
                        preview: "font-family font-size"
                    }],
                    bold: [{
                        inline: "strong",
                        remove: "all"
                    }, {
                        inline: "span",
                        styles: {
                            fontWeight: "bold"
                        }
                    }, {
                        inline: "b",
                        remove: "all"
                    }],
                    italic: [{
                        inline: "em",
                        remove: "all"
                    }, {
                        inline: "span",
                        styles: {
                            fontStyle: "italic"
                        }
                    }, {
                        inline: "i",
                        remove: "all"
                    }],
                    underline: [{
                        inline: "span",
                        styles: {
                            textDecoration: "underline"
                        },
                        exact: !0
                    }, {
                        inline: "u",
                        remove: "all"
                    }],
                    strikethrough: [{
                        inline: "span",
                        styles: {
                            textDecoration: "line-through"
                        },
                        exact: !0
                    }, {
                        inline: "strike",
                        remove: "all"
                    }],
                    forecolor: {
                        inline: "span",
                        styles: {
                            color: "%value"
                        },
                        links: !0,
                        remove_similar: !0,
                        clear_child_styles: !0
                    },
                    hilitecolor: {
                        inline: "span",
                        styles: {
                            backgroundColor: "%value"
                        },
                        links: !0,
                        remove_similar: !0,
                        clear_child_styles: !0
                    },
                    fontname: {
                        inline: "span",
                        styles: {
                            fontFamily: "%value"
                        },
                        clear_child_styles: !0
                    },
                    fontsize: {
                        inline: "span",
                        styles: {
                            fontSize: "%value"
                        },
                        clear_child_styles: !0
                    },
                    fontsize_class: {
                        inline: "span",
                        attributes: {
                            "class": "%value"
                        }
                    },
                    blockquote: {
                        block: "blockquote",
                        wrapper: 1,
                        remove: "all"
                    },
                    subscript: {
                        inline: "sub"
                    },
                    superscript: {
                        inline: "sup"
                    },
                    code: {
                        inline: "code"
                    },
                    link: {
                        inline: "a",
                        selector: "a",
                        remove: "all",
                        split: !0,
                        deep: !0,
                        onmatch: function() {
                            return !0
                        },
                        onformat: function(a, b, c) {
                            qa(c, function(b, c) {
                                da.setAttrib(a, c, b)
                            })
                        }
                    },
                    removeformat: [{
                        selector: "b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",
                        remove: "all",
                        split: !0,
                        expand: !1,
                        block_expand: !0,
                        deep: !0
                    }, {
                        selector: "span",
                        attributes: ["style", "class"],
                        remove: "empty",
                        split: !0,
                        expand: !1,
                        deep: !0
                    }, {
                        selector: "*",
                        attributes: ["style", "class"],
                        split: !1,
                        expand: !1,
                        deep: !0
                    }]
                }), qa("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/), function(a) {
                    s(a, {
                        block: a,
                        remove: "all"
                    })
                }), s(j.settings.formats)
            }

            function q() {
                j.addShortcut("meta+b", "bold_desc", "Bold"), j.addShortcut("meta+i", "italic_desc", "Italic"), j.addShortcut("meta+u", "underline_desc", "Underline");
                for (var a = 1; a <= 6; a++) j.addShortcut("access+" + a, "", ["FormatBlock", !1, "h" + a]);
                j.addShortcut("access+7", "", ["FormatBlock", !1, "p"]), j.addShortcut("access+8", "", ["FormatBlock", !1, "div"]), j.addShortcut("access+9", "", ["FormatBlock", !1, "address"])
            }

            function r(a) {
                return a ? ca[a] : ca
            }

            function s(a, b) {
                a && ("string" != typeof a ? qa(a, function(a, b) {
                    s(b, a)
                }) : (b = b.length ? b : [b], qa(b, function(a) {
                    a.deep === _ && (a.deep = !a.selector), a.split === _ && (a.split = !a.selector || a.inline), a.remove === _ && a.selector && !a.inline && (a.remove = "none"), a.selector && a.inline && (a.mixed = !0, a.block_expand = !0), "string" == typeof a.classes && (a.classes = a.classes.split(/\s+/))
                }), ca[a] = b))
            }

            function t(a) {
                return a && ca[a] && delete ca[a], ca
            }

            function u(a, b) {
                var c = r(b);
                if (c)
                    for (var d = 0; d < c.length; d++)
                        if (c[d].inherit === !1 && da.is(a, c[d].selector)) return !0;
                return !1
            }

            function v(a) {
                var b;
                return j.dom.getParent(a, function(a) {
                    return b = j.dom.getStyle(a, "text-decoration"), b && "none" !== b
                }), b
            }

            function w(a) {
                var b;
                1 === a.nodeType && a.parentNode && 1 === a.parentNode.nodeType && (b = v(a.parentNode), j.dom.getStyle(a, "color") && b ? j.dom.setStyle(a, "text-decoration", b) : j.dom.getStyle(a, "text-decoration") === b && j.dom.setStyle(a, "text-decoration", null))
            }

            function x(b, c, d) {
                function e(a, b) {
                    if (b = b || p, a) {
                        if (b.onformat && b.onformat(a, b, c, d), qa(b.styles, function(b, d) {
                                da.setStyle(a, d, O(b, c))
                            }), b.styles) {
                            var e = da.getAttrib(a, "style");
                            e && a.setAttribute("data-mce-style", e)
                        }
                        qa(b.attributes, function(b, d) {
                            da.setAttrib(a, d, O(b, c))
                        }), qa(b.classes, function(b) {
                            b = O(b, c), da.hasClass(a, b) || da.addClass(a, b)
                        })
                    }
                }

                function f(a, b) {
                    var c = !1;
                    return !!p.selector && (qa(a, function(a) {
                        if (!("collapsed" in a && a.collapsed !== q)) return da.is(b, a.selector) && !o(b) ? (e(b, a), c = !0, !1) : void 0
                    }), c)
                }

                function g() {
                    function b(b, c) {
                        var e = new a(c);
                        for (d = e.prev2(); d; d = e.prev2()) {
                            if (3 == d.nodeType && d.data.length > 0) return d;
                            if (d.childNodes.length > 1 || d == b || "BR" == d.tagName) return d
                        }
                    }
                    var c = j.selection.getRng(),
                        e = c.startContainer,
                        f = c.endContainer;
                    if (e != f && 0 === c.endOffset) {
                        var g = b(e, f),
                            h = 3 == g.nodeType ? g.data.length : g.childNodes.length;
                        c.setEnd(g, h)
                    }
                    return c
                }

                function h(a, d, g) {
                    var h, i, j = [],
                        l = !0;
                    h = p.inline || p.block, i = da.create(h), e(i), fa.walk(a, function(a) {
                        function d(a) {
                            var q, r, s, t;
                            if (t = l, q = a.nodeName.toLowerCase(), r = a.parentNode.nodeName.toLowerCase(), 1 === a.nodeType && oa(a) && (t = l, l = "true" === oa(a), s = !0), H(q, "br")) return m = 0, void(p.block && da.remove(a));
                            if (p.wrapper && A(a, b, c)) return void(m = 0);
                            if (l && !s && p.block && !p.wrapper && k(q) && ga(r, h)) return a = da.rename(a, h), e(a), j.push(a), void(m = 0);
                            if (p.selector) {
                                var u = f(n, a);
                                if (!p.inline || u) return void(m = 0)
                            }!l || s || !ga(h, q) || !ga(r, h) || !g && 3 === a.nodeType && 1 === a.nodeValue.length && 65279 === a.nodeValue.charCodeAt(0) || o(a) || p.inline && ha(a) ? (m = 0, qa(ra(a.childNodes), d), s && (l = t), m = 0) : (m || (m = da.clone(i, ma), a.parentNode.insertBefore(m, a), j.push(m)), m.appendChild(a))
                        }
                        var m;
                        qa(a, d)
                    }), p.links === !0 && qa(j, function(a) {
                        function b(a) {
                            "A" === a.nodeName && e(a, p), qa(ra(a.childNodes), b)
                        }
                        b(a)
                    }), qa(j, function(a) {
                        function d(a) {
                            var b = 0;
                            return qa(a.childNodes, function(a) {
                                P(a) || pa(a) || b++
                            }), b
                        }

                        function f(a) {
                            var b = !1;
                            return qa(a.childNodes, function(a) {
                                if (J(a)) return b = a, !1
                            }), b
                        }

                        function g(a, b) {
                            do {
                                if (1 !== d(a)) break;
                                if (a = f(a), !a) break;
                                if (b(a)) return a
                            } while (a);
                            return null
                        }

                        function h(a) {
                            var b, c;
                            return b = f(a), b && !pa(b) && G(b, p) && (c = da.clone(b, ma), e(c), da.replace(c, a, na), da.remove(b, 1)), c || a
                        }
                        var i;
                        if (i = d(a), (j.length > 1 || !ha(a)) && 0 === i) return void da.remove(a, 1);
                        if (p.inline || p.wrapper) {
                            if (p.exact || 1 !== i || (a = h(a)), qa(n, function(b) {
                                    qa(da.select(b.inline, a), function(a) {
                                        J(a) && T(b, c, a, b.exact ? a : null)
                                    }), ua(b, a)
                                }), A(a.parentNode, b, c) && T(p, c, a) && (a = 0), p.merge_with_parents && da.getParent(a.parentNode, function(d) {
                                    if (A(d, b, c)) return T(p, c, a) && (a = 0), na
                                }), a && !ha(a) && !M(a, "fontSize")) {
                                var k = g(a, K("fontSize"));
                                k && x("fontsize", {
                                    value: M(k, "fontSize")
                                }, a)
                            }
                            a && p.merge_siblings !== !1 && (a = W(V(a), a), a = W(a, V(a, na)))
                        }
                    })
                }
                var l, m, n = r(b),
                    p = n[0],
                    q = !d && ea.isCollapsed();
                if ("false" !== oa(ea.getNode())) {
                    if (p) {
                        if (d) d.nodeType ? f(n, d) || (m = da.createRng(), m.setStartBefore(d), m.setEndAfter(d), h(R(m, n), null, !0)) : h(d, null, !0);
                        else if (q && p.inline && !da.select("td[data-mce-selected],th[data-mce-selected]").length) Y("apply", b, c);
                        else {
                            var s = j.selection.getNode();
                            ia || !n[0].defaultBlock || da.getParent(s, da.isBlock) || x(n[0].defaultBlock), j.selection.setRng(g()), l = ea.getBookmark(), h(R(ea.getRng(na), n), l), p.styles && ((p.styles.color || p.styles.textDecoration) && (sa(s, w, "childNodes"), w(s)), p.styles.backgroundColor && I(s, K("fontSize"), L("backgroundColor", O(p.styles.backgroundColor, c)))), ea.moveToBookmark(l), Z(ea.getRng(na)), j.nodeChanged()
                        }
                        i.postProcess(b, j)
                    }
                } else {
                    d = ea.getNode();
                    for (var t = 0, u = n.length; t < u; t++)
                        if (n[t].ceFalseOverride && da.is(d, n[t].selector)) return void e(d, n[t])
                }
            }

            function y(a, b, c, d) {
                function e(a) {
                    var c, d, f, g, h;
                    if (1 === a.nodeType && oa(a) && (g = s, s = "true" === oa(a), h = !0), c = ra(a.childNodes), s && !h)
                        for (d = 0, f = p.length; d < f && !T(p[d], b, a, a); d++);
                    if (q.deep && c.length) {
                        for (d = 0, f = c.length; d < f; d++) e(c[d]);
                        h && (s = g)
                    }
                }

                function f(c) {
                    var e;
                    return qa(n(c.parentNode).reverse(), function(c) {
                        var f;
                        e || "_start" == c.id || "_end" == c.id || (f = A(c, a, b, d), f && f.split !== !1 && (e = c))
                    }), e
                }

                function g(a, c, d, e) {
                    var f, g, h, i, j, k;
                    if (a) {
                        for (k = a.parentNode, f = c.parentNode; f && f != k; f = f.parentNode) {
                            for (g = da.clone(f, ma), j = 0; j < p.length; j++)
                                if (T(p[j], b, g, g)) {
                                    g = 0;
                                    break
                                }
                            g && (h && g.appendChild(h), i || (i = g), h = g)
                        }!e || q.mixed && ha(a) || (c = da.split(a, c)), h && (d.parentNode.insertBefore(h, d), i.appendChild(d))
                    }
                    return c
                }

                function h(a) {
                    return g(f(a), a, a, !0)
                }

                function i(a) {
                    var b = da.get(a ? "_start" : "_end"),
                        c = b[a ? "firstChild" : "lastChild"];
                    return pa(c) && (c = c[a ? "firstChild" : "lastChild"]), 3 == c.nodeType && 0 === c.data.length && (c = a ? b.previousSibling || b.nextSibling : b.nextSibling || b.previousSibling), da.remove(b, !0), c
                }

                function k(a) {
                    var b, c, d = a.commonAncestorContainer;
                    if (a = R(a, p, na), q.split) {
                        if (b = X(a, na), c = X(a), b != c) {
                            if (/^(TR|TH|TD)$/.test(b.nodeName) && b.firstChild && (b = "TR" == b.nodeName ? b.firstChild.firstChild || b : b.firstChild || b), d && /^T(HEAD|BODY|FOOT|R)$/.test(d.nodeName) && l(c) && c.firstChild && (c = c.firstChild || c), da.isChildOf(b, c) && !ha(c) && !l(b) && !l(c)) return b = Q(b, "span", {
                                id: "_start",
                                "data-mce-type": "bookmark"
                            }), h(b), void(b = i(na));
                            b = Q(b, "span", {
                                id: "_start",
                                "data-mce-type": "bookmark"
                            }), c = Q(c, "span", {
                                id: "_end",
                                "data-mce-type": "bookmark"
                            }), h(b), h(c), b = i(na), c = i()
                        } else b = c = h(b);
                        a.startContainer = b.parentNode ? b.parentNode : b, a.startOffset = ja(b), a.endContainer = c.parentNode ? c.parentNode : c, a.endOffset = ja(c) + 1
                    }
                    fa.walk(a, function(a) {
                        qa(a, function(a) {
                            e(a), 1 === a.nodeType && "underline" === j.dom.getStyle(a, "text-decoration") && a.parentNode && "underline" === v(a.parentNode) && T({
                                deep: !1,
                                exact: !0,
                                inline: "span",
                                styles: {
                                    textDecoration: "underline"
                                }
                            }, null, a)
                        })
                    })
                }
                var m, o, p = r(a),
                    q = p[0],
                    s = !0;
                if (c) return void(c.nodeType ? (o = da.createRng(), o.setStartBefore(c), o.setEndAfter(c), k(o)) : k(c));
                if ("false" !== oa(ea.getNode())) ea.isCollapsed() && q.inline && !da.select("td[data-mce-selected],th[data-mce-selected]").length ? Y("remove", a, b, d) : (m = ea.getBookmark(), k(ea.getRng(na)), ea.moveToBookmark(m), q.inline && B(a, b, ea.getStart()) && Z(ea.getRng(!0)), j.nodeChanged());
                else {
                    c = ea.getNode();
                    for (var t = 0, u = p.length; t < u && (!p[t].ceFalseOverride || !T(p[t], b, c, c)); t++);
                }
            }

            function z(a, b, c) {
                var d = r(a);
                !B(a, b, c) || "toggle" in d[0] && !d[0].toggle ? x(a, b, c) : y(a, b, c)
            }

            function A(a, b, c, d) {
                function e(a, b, e) {
                    var f, g, h, i = b[e];
                    if (b.onmatch) return b.onmatch(a, b, e);
                    if (i)
                        if (i.length === _) {
                            for (f in i)
                                if (i.hasOwnProperty(f)) {
                                    if (g = "attributes" === e ? da.getAttrib(a, f) : M(a, f), d && !g && !b.exact) return;
                                    if ((!d || b.exact) && !H(g, N(O(i[f], c), f))) return
                                }
                        } else
                            for (h = 0; h < i.length; h++)
                                if ("attributes" === e ? da.getAttrib(a, i[h]) : M(a, i[h])) return b;
                    return b
                }
                var f, g, h, i = r(b);
                if (i && a)
                    for (g = 0; g < i.length; g++)
                        if (f = i[g], G(a, f) && e(a, f, "attributes") && e(a, f, "styles")) {
                            if (h = f.classes)
                                for (g = 0; g < h.length; g++)
                                    if (!da.hasClass(a, h[g])) return;
                            return f
                        }
            }

            function B(a, b, c) {
                function d(c) {
                    var d = da.getRoot();
                    return c !== d && (c = da.getParent(c, function(c) {
                        return !!u(c, a) || (c.parentNode === d || !!A(c, a, b, !0))
                    }), A(c, a, b))
                }
                var e;
                return c ? d(c) : (c = ea.getNode(), d(c) ? na : (e = ea.getStart(), e != c && d(e) ? na : ma))
            }

            function C(a, b) {
                var c, d = [],
                    e = {};
                return c = ea.getStart(), da.getParent(c, function(c) {
                    var f, g;
                    for (f = 0; f < a.length; f++) g = a[f], !e[g] && A(c, g, b) && (e[g] = !0, d.push(g))
                }, da.getRoot()), d
            }

            function D(a) {
                var b, c, d, e, f, g = r(a);
                if (g)
                    for (b = ea.getStart(), c = n(b), e = g.length - 1; e >= 0; e--) {
                        if (f = g[e].selector, !f || g[e].defaultBlock) return na;
                        for (d = c.length - 1; d >= 0; d--)
                            if (da.is(c[d], f)) return na
                    }
                return ma
            }

            function E(a, b, c) {
                var d;
                return $ || ($ = {}, d = {}, j.on("NodeChange", function(a) {
                    var b = n(a.element),
                        c = {};
                    b = g.grep(b, function(a) {
                        return 1 == a.nodeType && !a.getAttribute("data-mce-bogus")
                    }), qa($, function(a, e) {
                        qa(b, function(f) {
                            return A(f, e, {}, a.similar) ? (d[e] || (qa(a, function(a) {
                                a(!0, {
                                    node: f,
                                    format: e,
                                    parents: b
                                })
                            }), d[e] = a), c[e] = a, !1) : !u(f, e) && void 0
                        })
                    }), qa(d, function(e, f) {
                        c[f] || (delete d[f], qa(e, function(c) {
                            c(!1, {
                                node: a.element,
                                format: f,
                                parents: b
                            })
                        }))
                    })
                })), qa(a.split(","), function(a) {
                    $[a] || ($[a] = [], $[a].similar = c), $[a].push(b)
                }), this
            }

            function F(a) {
                return h.getCssText(j, a)
            }

            function G(a, b) {
                return H(a, b.inline) ? na : H(a, b.block) ? na : b.selector ? 1 == a.nodeType && da.is(a, b.selector) : void 0
            }

            function H(a, b) {
                return a = a || "", b = b || "", a = "" + (a.nodeName || a), b = "" + (b.nodeName || b), a.toLowerCase() == b.toLowerCase()
            }

            function I(a, b, c) {
                qa(a.childNodes, function(a) {
                    J(a) && (b(a) && c(a), a.hasChildNodes() && I(a, b, c))
                })
            }

            function J(a) {
                return a && 1 === a.nodeType && !pa(a) && !o(a) && !e.isBogus(a)
            }

            function K(a) {
                return f.curry(function(a, b) {
                    return !(!b || !M(b, a))
                }, a)
            }

            function L(a, b) {
                return f.curry(function(a, b, c) {
                    da.setStyle(c, a, b)
                }, a, b)
            }

            function M(a, b) {
                return N(da.getStyle(a, b), b)
            }

            function N(a, b) {
                return "color" != b && "backgroundColor" != b || (a = da.toHex(a)), "fontWeight" == b && 700 == a && (a = "bold"), "fontFamily" == b && (a = a.replace(/[\'\"]/g, "").replace(/,\s+/g, ",")), "" + a
            }

            function O(a, b) {
                return "string" != typeof a ? a = a(b) : b && (a = a.replace(/%(\w+)/g, function(a, c) {
                    return b[c] || a
                })), a
            }

            function P(a) {
                return a && 3 === a.nodeType && /^([\t \r\n]+|)$/.test(a.nodeValue)
            }

            function Q(a, b, c) {
                var d = da.create(b, c);
                return a.parentNode.insertBefore(d, a), d.appendChild(a), d
            }

            function R(b, c, d) {
                function e(a) {
                    function b(a) {
                        return "BR" == a.nodeName && a.getAttribute("data-mce-bogus") && !a.nextSibling
                    }
                    var d, e, f, g, h;
                    if (d = e = a ? q : s, g = a ? "previousSibling" : "nextSibling", h = da.getRoot(), 3 == d.nodeType && !P(d) && (a ? r > 0 : t < d.nodeValue.length)) return d;
                    for (;;) {
                        if (!c[0].block_expand && ha(e)) return e;
                        for (f = e[g]; f; f = f[g])
                            if (!pa(f) && !P(f) && !b(f)) return e;
                        if (e == h || e.parentNode == h) {
                            d = e;
                            break
                        }
                        e = e.parentNode
                    }
                    return d
                }

                function f(a, b) {
                    for (b === _ && (b = 3 === a.nodeType ? a.length : a.childNodes.length); a && a.hasChildNodes();) a = a.childNodes[b], a && (b = 3 === a.nodeType ? a.length : a.childNodes.length);
                    return {
                        node: a,
                        offset: b
                    }
                }

                function g(a) {
                    for (var b = a; b;) {
                        if (1 === b.nodeType && oa(b)) return "false" === oa(b) ? b : a;
                        b = b.parentNode
                    }
                    return a
                }

                function h(b, c, e) {
                    function f(a, b) {
                        var c, f, g = a.nodeValue;
                        return "undefined" == typeof b && (b = e ? g.length : 0), e ? (c = g.lastIndexOf(" ", b), f = g.lastIndexOf("\xa0", b), c = c > f ? c : f, c === -1 || d || c++) : (c = g.indexOf(" ", b), f = g.indexOf("\xa0", b), c = c !== -1 && (f === -1 || c < f) ? c : f), c
                    }
                    var g, h, i, k;
                    if (3 === b.nodeType) {
                        if (i = f(b, c), i !== -1) return {
                            container: b,
                            offset: i
                        };
                        k = b
                    }
                    for (g = new a(b, da.getParent(b, ha) || j.getBody()); h = g[e ? "prev" : "next"]();)
                        if (3 === h.nodeType) {
                            if (k = h, i = f(h), i !== -1) return {
                                container: h,
                                offset: i
                            }
                        } else if (ha(h)) break;
                    if (k) return c = e ? 0 : k.length, {
                        container: k,
                        offset: c
                    }
                }

                function i(a, d) {
                    var e, f, g, h;
                    for (3 == a.nodeType && 0 === a.nodeValue.length && a[d] && (a = a[d]), e = n(a), f = 0; f < e.length; f++)
                        for (g = 0; g < c.length; g++)
                            if (h = c[g], !("collapsed" in h && h.collapsed !== b.collapsed) && da.is(e[f], h.selector)) return e[f];
                    return a
                }

                function l(a, b) {
                    var d, e = da.getRoot();
                    if (c[0].wrapper || (d = da.getParent(a, c[0].block, e)), d || (d = da.getParent(3 == a.nodeType ? a.parentNode : a, function(a) {
                            return a != e && k(a)
                        })), d && c[0].wrapper && (d = n(d, "ul,ol").reverse()[0] || d), !d)
                        for (d = a; d[b] && !ha(d[b]) && (d = d[b], !H(d, "br")););
                    return d || a
                }
                var m, o, p, q = b.startContainer,
                    r = b.startOffset,
                    s = b.endContainer,
                    t = b.endOffset;
                if (1 == q.nodeType && q.hasChildNodes() && (m = q.childNodes.length - 1, q = q.childNodes[r > m ? m : r], 3 == q.nodeType && (r = 0)), 1 == s.nodeType && s.hasChildNodes() && (m = s.childNodes.length - 1, s = s.childNodes[t > m ? m : t - 1], 3 == s.nodeType && (t = s.nodeValue.length)), q = g(q), s = g(s), (pa(q.parentNode) || pa(q)) && (q = pa(q) ? q : q.parentNode, q = q.nextSibling || q, 3 == q.nodeType && (r = 0)), (pa(s.parentNode) || pa(s)) && (s = pa(s) ? s : s.parentNode, s = s.previousSibling || s, 3 == s.nodeType && (t = s.length)), c[0].inline && (b.collapsed && (p = h(q, r, !0), p && (q = p.container, r = p.offset), p = h(s, t), p && (s = p.container, t = p.offset)), o = f(s, t), o.node)) {
                    for (; o.node && 0 === o.offset && o.node.previousSibling;) o = f(o.node.previousSibling);
                    o.node && o.offset > 0 && 3 === o.node.nodeType && " " === o.node.nodeValue.charAt(o.offset - 1) && o.offset > 1 && (s = o.node, s.splitText(o.offset - 1))
                }
                return (c[0].inline || c[0].block_expand) && (c[0].inline && 3 == q.nodeType && 0 !== r || (q = e(!0)), c[0].inline && 3 == s.nodeType && t !== s.nodeValue.length || (s = e())), c[0].selector && c[0].expand !== ma && !c[0].inline && (q = i(q, "previousSibling"), s = i(s, "nextSibling")), (c[0].block || c[0].selector) && (q = l(q, "previousSibling"), s = l(s, "nextSibling"), c[0].block && (ha(q) || (q = e(!0)), ha(s) || (s = e()))), 1 == q.nodeType && (r = ja(q), q = q.parentNode), 1 == s.nodeType && (t = ja(s) + 1, s = s.parentNode), {
                    startContainer: q,
                    startOffset: r,
                    endContainer: s,
                    endOffset: t
                }
            }

            function S(a, b) {
                return b.links && "A" == a.tagName
            }

            function T(a, b, c, d) {
                var e, f, g;
                if (!G(c, a) && !S(c, a)) return ma;
                if ("all" != a.remove)
                    for (qa(a.styles, function(e, f) {
                            e = N(O(e, b), f), "number" == typeof f && (f = e, d = 0), (a.remove_similar || !d || H(M(d, f), e)) && da.setStyle(c, f, ""), g = 1
                        }), g && "" === da.getAttrib(c, "style") && (c.removeAttribute("style"), c.removeAttribute("data-mce-style")), qa(a.attributes, function(a, e) {
                            var f;
                            if (a = O(a, b), "number" == typeof e && (e = a, d = 0), !d || H(da.getAttrib(d, e), a)) {
                                if ("class" == e && (a = da.getAttrib(c, e), a && (f = "", qa(a.split(/\s+/), function(a) {
                                        /mce\-\w+/.test(a) && (f += (f ? " " : "") + a)
                                    }), f))) return void da.setAttrib(c, e, f);
                                "class" == e && c.removeAttribute("className"), la.test(e) && c.removeAttribute("data-mce-" + e), c.removeAttribute(e)
                            }
                        }), qa(a.classes, function(a) {
                            a = O(a, b), d && !da.hasClass(d, a) || da.removeClass(c, a)
                        }), f = da.getAttribs(c), e = 0; e < f.length; e++) {
                        var h = f[e].nodeName;
                        if (0 !== h.indexOf("_") && 0 !== h.indexOf("data-")) return ma
                    }
                return "none" != a.remove ? (U(c, a), na) : void 0
            }

            function U(a, b) {
                function c(a, b, c) {
                    return a = V(a, b, c), !a || "BR" == a.nodeName || ha(a)
                }
                var d, e = a.parentNode;
                b.block && (ia ? e == da.getRoot() && (b.list_block && H(a, b.list_block) || qa(ra(a.childNodes), function(a) {
                    ga(ia, a.nodeName.toLowerCase()) ? d ? d.appendChild(a) : (d = Q(a, ia), da.setAttribs(d, j.settings.forced_root_block_attrs)) : d = 0
                })) : ha(a) && !ha(e) && (c(a, ma) || c(a.firstChild, na, 1) || a.insertBefore(da.create("br"), a.firstChild), c(a, na) || c(a.lastChild, ma, 1) || a.appendChild(da.create("br")))), b.selector && b.inline && !H(b.inline, a) || da.remove(a, 1)
            }

            function V(a, b, c) {
                if (a)
                    for (b = b ? "nextSibling" : "previousSibling", a = c ? a : a[b]; a; a = a[b])
                        if (1 == a.nodeType || !P(a)) return a
            }

            function W(a, b) {
                function c(a, b) {
                    for (e = a; e; e = e[b]) {
                        if (3 == e.nodeType && 0 !== e.nodeValue.length) return a;
                        if (1 == e.nodeType && !pa(e)) return e
                    }
                    return a
                }
                var e, f, g = new d(da);
                if (a && b && (a = c(a, "previousSibling"), b = c(b, "nextSibling"), g.compare(a, b))) {
                    for (e = a.nextSibling; e && e != b;) f = e, e = e.nextSibling, a.appendChild(f);
                    return da.remove(b), qa(ra(b.childNodes), function(b) {
                        a.appendChild(b)
                    }), a
                }
                return b
            }

            function X(b, c) {
                var d, e, f;
                return d = b[c ? "startContainer" : "endContainer"], e = b[c ? "startOffset" : "endOffset"], 1 == d.nodeType && (f = d.childNodes.length - 1, !c && e && e--, d = d.childNodes[e > f ? f : e]), 3 === d.nodeType && c && e >= d.nodeValue.length && (d = new a(d, j.getBody()).next() || d), 3 !== d.nodeType || c || 0 !== e || (d = new a(d, j.getBody()).prev() || d), d
            }

            function Y(b, c, d, e) {
                function f(a) {
                    var b = da.create("span", {
                        id: p,
                        "data-mce-bogus": !0,
                        style: q ? "color:red" : ""
                    });
                    return a && b.appendChild(j.getDoc().createTextNode(ka)), b
                }

                function g(a, b) {
                    for (; a;) {
                        if (3 === a.nodeType && a.nodeValue !== ka || a.childNodes.length > 1) return !1;
                        b && 1 === a.nodeType && b.push(a), a = a.firstChild
                    }
                    return !0
                }

                function h(a) {
                    for (; a;) {
                        if (a.id === p) return a;
                        a = a.parentNode
                    }
                }

                function i(b) {
                    var c;
                    if (b)
                        for (c = new a(b, b), b = c.current(); b; b = c.next())
                            if (3 === b.nodeType) return b
                }

                function l(a, b) {
                    var c, d;
                    if (a) d = ea.getRng(!0), g(a) ? (b !== !1 && (d.setStartBefore(a), d.setEndBefore(a)), da.remove(a)) : (c = i(a), c.nodeValue.charAt(0) === ka && (c.deleteData(0, 1), d.startContainer == c && d.startOffset > 0 && d.setStart(c, d.startOffset - 1), d.endContainer == c && d.endOffset > 0 && d.setEnd(c, d.endOffset - 1)), da.remove(a, 1)), ea.setRng(d);
                    else if (a = h(ea.getStart()), !a)
                        for (; a = da.get(p);) l(a, !1)
                }

                function m() {
                    var a, b, e, g, j, k, l;
                    a = ea.getRng(!0), g = a.startOffset, k = a.startContainer, l = k.nodeValue, b = h(ea.getStart()), b && (e = i(b));
                    var m = /[^\s\u00a0\u00ad\u200b\ufeff]/;
                    l && g > 0 && g < l.length && m.test(l.charAt(g)) && m.test(l.charAt(g - 1)) ? (j = ea.getBookmark(), a.collapse(!0), a = R(a, r(c)), a = fa.split(a), x(c, d, a), ea.moveToBookmark(j)) : (b && e.nodeValue === ka ? x(c, d, b) : (b = f(!0), e = b.firstChild, a.insertNode(b), g = 1, x(c, d, b)), ea.setCursorLocation(e, g))
                }

                function n() {
                    var a, b, g, h, i, j, l, m, n = ea.getRng(!0),
                        o = [];
                    for (a = n.startContainer, b = n.startOffset, i = a, 3 == a.nodeType && (b != a.nodeValue.length && (h = !0), i = i.parentNode); i;) {
                        if (A(i, c, d, e)) {
                            j = i;
                            break
                        }
                        i.nextSibling && (h = !0), o.push(i), i = i.parentNode
                    }
                    if (j)
                        if (h) g = ea.getBookmark(), n.collapse(!0), n = R(n, r(c), !0), n = fa.split(n), y(c, d, n), ea.moveToBookmark(g);
                        else {
                            for (m = f(), i = m, l = o.length - 1; l >= 0; l--) i.appendChild(da.clone(o[l], !1)), i = i.firstChild;
                            i.appendChild(da.doc.createTextNode(ka)), i = i.firstChild;
                            var p = da.getParent(j, k);
                            p && da.isEmpty(p) ? j.parentNode.replaceChild(m, j) : da.insertAfter(m, j), ea.setCursorLocation(i, 1), da.isEmpty(j) && da.remove(j)
                        }
                }

                function o() {
                    var a;
                    a = h(ea.getStart()), a && !da.isEmpty(a) && sa(a, function(a) {
                        1 != a.nodeType || a.id === p || da.isEmpty(a) || da.setAttrib(a, "data-mce-bogus", null)
                    }, "childNodes")
                }
                var p = "_mce_caret",
                    q = j.settings.caret_debug;
                j._hasCaretEvents || (ba = function() {
                    var a, b = [];
                    if (g(h(ea.getStart()), b))
                        for (a = b.length; a--;) da.setAttrib(b[a], "data-mce-bogus", "1")
                }, aa = function(a) {
                    var b = a.keyCode;
                    l(), 8 == b && ea.isCollapsed() && ea.getStart().innerHTML == ka && l(h(ea.getStart())), 37 != b && 39 != b || l(h(ea.getStart())), o()
                }, j.on("SetContent", function(a) {
                    a.selection && o()
                }), j._hasCaretEvents = !0), "apply" == b ? m() : n()
            }

            function Z(b) {
                var c, d, e, f = b.startContainer,
                    g = b.startOffset;
                if ((b.startContainer != b.endContainer || !m(b.startContainer.childNodes[b.startOffset])) && (3 == f.nodeType && g >= f.nodeValue.length && (g = ja(f), f = f.parentNode), 1 == f.nodeType))
                    for (e = f.childNodes, g < e.length ? (f = e[g], c = new a(f, da.getParent(f, da.isBlock))) : (f = e[e.length - 1], c = new a(f, da.getParent(f, da.isBlock)), c.next(!0)), d = c.current(); d; d = c.next())
                        if (3 == d.nodeType && !P(d)) return b.setStart(d, 0), void ea.setRng(b)
            }
            var $, _, aa, ba, ca = {},
                da = j.dom,
                ea = j.selection,
                fa = new b(da),
                ga = j.schema.isValidChild,
                ha = da.isBlock,
                ia = j.settings.forced_root_block,
                ja = da.nodeIndex,
                ka = "\ufeff",
                la = /^(src|href|style)$/,
                ma = !1,
                na = !0,
                oa = da.getContentEditable,
                pa = c.isBookmarkNode,
                qa = g.each,
                ra = g.grep,
                sa = g.walk,
                ta = g.extend,
                ua = function(a, b) {
                    a.clear_child_styles && qa(da.select("*", b), function(b) {
                        qa(a.styles, function(a, c) {
                            da.setStyle(b, c, "")
                        })
                    })
                };
            ta(this, {
                get: r,
                register: s,
                unregister: t,
                apply: x,
                remove: y,
                toggle: z,
                match: B,
                matchAll: C,
                matchNode: A,
                canApply: D,
                formatChanged: E,
                getCssText: F
            }), p(), q(), j.on("BeforeGetContent", function(a) {
                ba && "raw" != a.format && ba()
            }), j.on("mouseup keydown", function(a) {
                aa && aa(a)
            })
        }
    }), g("5e", [], function() {
        var a = 0,
            b = 1,
            c = 2,
            d = function(d, e) {
                var f = d.length + e.length + 2,
                    g = new Array(f),
                    h = new Array(f),
                    i = function(a, b, c) {
                        return {
                            start: a,
                            end: b,
                            diag: c
                        }
                    },
                    j = function(f, g, h, i, k) {
                        var m = l(f, g, h, i);
                        if (null === m || m.start === g && m.diag === g - i || m.end === f && m.diag === f - h)
                            for (var n = f, o = h; n < g || o < i;) n < g && o < i && d[n] === e[o] ? (k.push([a, d[n]]), ++n, ++o) : g - f > i - h ? (k.push([c, d[n]]), ++n) : (k.push([b, e[o]]), ++o);
                        else {
                            j(f, m.start, h, m.start - m.diag, k);
                            for (var p = m.start; p < m.end; ++p) k.push([a, d[p]]);
                            j(m.end, g, m.end - m.diag, i, k)
                        }
                    },
                    k = function(a, b, c, f) {
                        for (var g = a; g - b < f && g < c && d[g] === e[g - b];) ++g;
                        return i(a, g, b)
                    },
                    l = function(a, b, c, f) {
                        var i = b - a,
                            j = f - c;
                        if (0 === i || 0 === j) return null;
                        var l = i - j,
                            m = j + i,
                            n = (m % 2 === 0 ? m : m + 1) / 2;
                        g[1 + n] = a, h[1 + n] = b + 1;
                        for (var o = 0; o <= n; ++o) {
                            for (var p = -o; p <= o; p += 2) {
                                var q = p + n;
                                p === -o || p != o && g[q - 1] < g[q + 1] ? g[q] = g[q + 1] : g[q] = g[q - 1] + 1;
                                for (var r = g[q], s = r - a + c - p; r < b && s < f && d[r] === e[s];) g[q] = ++r, ++s;
                                if (l % 2 != 0 && l - o <= p && p <= l + o && h[q - l] <= g[q]) return k(h[q - l], p + a - c, b, f)
                            }
                            for (p = l - o; p <= l + o; p += 2) {
                                for (q = p + n - l, p === l - o || p != l + o && h[q + 1] <= h[q - 1] ? h[q] = h[q + 1] - 1 : h[q] = h[q - 1], r = h[q] - 1, s = r - a + c - p; r >= a && s >= c && d[r] === e[s];) h[q] = r--, s--;
                                if (l % 2 === 0 && -o <= p && p <= o && h[q] <= g[q + l]) return k(h[q], p + a - c, b, f)
                            }
                        }
                    },
                    m = [];
                return j(0, d.length, 0, e.length, m), m
            };
        return {
            KEEP: a,
            DELETE: c,
            INSERT: b,
            diff: d
        }
    }), g("4h", ["1g", "d", "5e"], function(a, b, c) {
        var d = function(a) {
                return 1 === a.nodeType ? a.outerHTML : 3 === a.nodeType ? b.encodeRaw(a.data, !1) : 8 === a.nodeType ? "<!--" + a.data + "-->" : ""
            },
            e = function(a) {
                var b, c, d;
                for (d = document.createElement("div"), b = document.createDocumentFragment(), a && (d.innerHTML = a); c = d.firstChild;) b.appendChild(c);
                return b
            },
            f = function(a, b, c) {
                var d = e(b);
                if (a.hasChildNodes() && c < a.childNodes.length) {
                    var f = a.childNodes[c];
                    f.parentNode.insertBefore(d, f)
                } else a.appendChild(d)
            },
            g = function(a, b) {
                if (a.hasChildNodes() && b < a.childNodes.length) {
                    var c = a.childNodes[b];
                    c.parentNode.removeChild(c)
                }
            },
            h = function(b, d) {
                var e = 0;
                a.each(b, function(a) {
                    a[0] === c.KEEP ? e++ : a[0] === c.INSERT ? (f(d, a[1], e), e++) : a[0] === c.DELETE && g(d, e)
                })
            },
            i = function(b) {
                return a.filter(a.map(b.childNodes, d), function(a) {
                    return a.length > 0
                })
            },
            j = function(b, e) {
                var f = a.map(e.childNodes, d);
                return h(c.diff(f, b), e), e
            };
        return {
            read: i,
            write: j
        }
    }), g("1z", ["1g", "4h"], function(a, b) {
        var c = function(a) {
                return a.indexOf("</iframe>") !== -1
            },
            d = function(a) {
                return {
                    type: "fragmented",
                    fragments: a,
                    content: "",
                    bookmark: null,
                    beforeBookmark: null
                }
            },
            e = function(a) {
                return {
                    type: "complete",
                    fragments: null,
                    content: a,
                    bookmark: null,
                    beforeBookmark: null
                }
            },
            f = function(f) {
                var g, h, i;
                return g = b.read(f.getBody()), i = a.map(g, function(a) {
                    return f.serializer.trimContent(a)
                }), h = i.join(""), c(h) ? d(i) : e(h)
            },
            g = function(a, c, d) {
                "fragmented" === c.type ? b.write(c.fragments, a.getBody()) : a.setContent(c.content, {
                    format: "raw"
                }), a.selection.moveToBookmark(d ? c.beforeBookmark : c.bookmark)
            },
            h = function(a) {
                return "fragmented" === a.type ? a.fragments.join("") : a.content
            },
            i = function(a, b) {
                return h(a) === h(b)
            };
        return {
            createFragmentedLevel: d,
            createCompleteLevel: e,
            createFromEditor: f,
            applyToEditor: g,
            isEq: i
        }
    }), g("u", ["p", "9", "1z"], function(a, b, c) {
        return function(a) {
            function d(b) {
                a.setDirty(b)
            }

            function e(a) {
                n(!1), i.add({}, a)
            }

            function f() {
                i.typing && (n(!1), i.add())
            }
            var g, h, i = this,
                j = 0,
                k = [],
                l = 0,
                m = function() {
                    return 0 === l
                },
                n = function(a) {
                    m() && (i.typing = a)
                };
            return a.on("init", function() {
                i.add()
            }), a.on("BeforeExecCommand", function(a) {
                var b = a.command;
                "Undo" !== b && "Redo" !== b && "mceRepaint" !== b && (f(), i.beforeChange())
            }), a.on("ExecCommand", function(a) {
                var b = a.command;
                "Undo" !== b && "Redo" !== b && "mceRepaint" !== b && e(a)
            }), a.on("ObjectResizeStart Cut", function() {
                i.beforeChange()
            }), a.on("SaveContent ObjectResized blur", e), a.on("DragEnd", e), a.on("KeyUp", function(b) {
                var f = b.keyCode;
                b.isDefaultPrevented() || ((f >= 33 && f <= 36 || f >= 37 && f <= 40 || 45 === f || b.ctrlKey) && (e(), a.nodeChanged()), 46 !== f && 8 !== f || a.nodeChanged(), h && i.typing && c.isEq(c.createFromEditor(a), k[0]) === !1 && (a.isDirty() === !1 && (d(!0), a.fire("change", {
                    level: k[0],
                    lastLevel: null
                })), a.fire("TypingUndo"), h = !1, a.nodeChanged()))
            }), a.on("KeyDown", function(a) {
                var b = a.keyCode;
                if (!a.isDefaultPrevented()) {
                    if (b >= 33 && b <= 36 || b >= 37 && b <= 40 || 45 === b) return void(i.typing && e(a));
                    var c = a.ctrlKey && !a.altKey || a.metaKey;
                    !(b < 16 || b > 20) || 224 === b || 91 === b || i.typing || c || (i.beforeChange(), n(!0), i.add({}, a), h = !0)
                }
            }), a.on("MouseDown", function(a) {
                i.typing && e(a)
            }), a.addShortcut("meta+z", "", "Undo"), a.addShortcut("meta+y,meta+shift+z", "", "Redo"), a.on("AddUndo Undo Redo ClearUndos", function(b) {
                b.isDefaultPrevented() || a.nodeChanged()
            }), i = {
                data: k,
                typing: !1,
                beforeChange: function() {
                    m() && (g = a.selection.getBookmark(2, !0))
                },
                add: function(e, f) {
                    var h, i, l, n = a.settings;
                    if (l = c.createFromEditor(a), e = e || {}, e = b.extend(e, l), m() === !1 || a.removed) return null;
                    if (i = k[j], a.fire("BeforeAddUndo", {
                            level: e,
                            lastLevel: i,
                            originalEvent: f
                        }).isDefaultPrevented()) return null;
                    if (i && c.isEq(i, e)) return null;
                    if (k[j] && (k[j].beforeBookmark = g), n.custom_undo_redo_levels && k.length > n.custom_undo_redo_levels) {
                        for (h = 0; h < k.length - 1; h++) k[h] = k[h + 1];
                        k.length--, j = k.length
                    }
                    e.bookmark = a.selection.getBookmark(2, !0), j < k.length - 1 && (k.length = j + 1), k.push(e), j = k.length - 1;
                    var o = {
                        level: e,
                        lastLevel: i,
                        originalEvent: f
                    };
                    return a.fire("AddUndo", o), j > 0 && (d(!0), a.fire("change", o)), e
                },
                undo: function() {
                    var b;
                    return i.typing && (i.add(), i.typing = !1, n(!1)), j > 0 && (b = k[--j], c.applyToEditor(a, b, !0), d(!0), a.fire("undo", {
                        level: b
                    })), b
                },
                redo: function() {
                    var b;
                    return j < k.length - 1 && (b = k[++j], c.applyToEditor(a, b, !1), d(!0), a.fire("redo", {
                        level: b
                    })), b
                },
                clear: function() {
                    k = [], j = 0, i.typing = !1, i.data = k, a.fire("ClearUndos")
                },
                hasUndo: function() {
                    return j > 0 || i.typing && k[0] && !c.isEq(c.createFromEditor(a), k[0])
                },
                hasRedo: function() {
                    return j < k.length - 1 && !i.typing
                },
                transact: function(a) {
                    return f(), i.beforeChange(), i.ignore(a), i.add()
                },
                ignore: function(a) {
                    try {
                        l++, a()
                    } finally {
                        l--
                    }
                },
                extra: function(b, d) {
                    var e, f;
                    i.transact(b) && (f = k[j].bookmark, e = k[j - 1], c.applyToEditor(a, e, !0), i.transact(d) && (k[j - 1].beforeBookmark = f))
                }
            }
        }
    }), g("6o", ["55", "1r", "4d", "22"], function(a, b, c, d) {
        var e = function(a) {
                var b = c.isText(a) ? a.dom().parentNode : a.dom();
                return void 0 !== b && null !== b && b.ownerDocument.body.contains(b)
            },
            f = a.cached(function() {
                return g(b.fromDom(d))
            }),
            g = function(a) {
                var c = a.dom().body;
                if (null === c || void 0 === c) throw "Body is not available yet";
                return b.fromDom(c)
            };
        return {
            body: f,
            getBody: g,
            inBody: e
        }
    }), g("6p", ["60", "4z"], function(a, b) {
        return function(c, d, e, f, g) {
            return c(e, f) ? b.some(e) : a.isFunction(g) && g(e) ? b.none() : d(e, f, g)
        }
    }), g("64", ["60", "3x", "1m", "4z", "6o", "1q", "1r", "6p"], function(a, b, c, d, e, f, g, h) {
        var i = function(a) {
                return n(e.body(), a)
            },
            j = function(b, e, f) {
                for (var h = b.dom(), i = a.isFunction(f) ? f : c.constant(!1); h.parentNode;) {
                    h = h.parentNode;
                    var j = g.fromDom(h);
                    if (e(j)) return d.some(j);
                    if (i(j)) break
                }
                return d.none()
            },
            k = function(a, b, c) {
                var d = function(a) {
                    return b(a)
                };
                return h(d, j, a, b, c)
            },
            l = function(a, b) {
                var c = a.dom();
                return c.parentNode ? m(g.fromDom(c.parentNode), function(c) {
                    return !f.eq(a, c) && b(c)
                }) : d.none()
            },
            m = function(a, d) {
                var e = b.find(a.dom().childNodes, c.compose(d, g.fromDom));
                return e.map(g.fromDom)
            },
            n = function(a, b) {
                var c = function(a) {
                    for (var e = 0; e < a.childNodes.length; e++) {
                        if (b(g.fromDom(a.childNodes[e]))) return d.some(g.fromDom(a.childNodes[e]));
                        var f = c(a.childNodes[e]);
                        if (f.isSome()) return f
                    }
                    return d.none()
                };
                return c(a.dom())
            };
        return {
            first: i,
            ancestor: j,
            closest: k,
            sibling: l,
            child: m,
            descendant: n
        }
    }), g("5i", ["1w", "c", "1j", "1p", "1k", "44"], function(a, b, c, d, e, f) {
        function g(a) {
            return a > 0
        }

        function h(a) {
            return a < 0
        }

        function i(a, b) {
            for (var c; c = a(b);)
                if (!y(c)) return c;
            return null
        }

        function j(a, c, d, e, f) {
            var j = new b(a, e);
            if (h(c)) {
                if ((v(a) || y(a)) && (a = i(j.prev, !0), d(a))) return a;
                for (; a = i(j.prev, f);)
                    if (d(a)) return a
            }
            if (g(c)) {
                if ((v(a) || y(a)) && (a = i(j.next, !0), d(a))) return a;
                for (; a = i(j.next, f);)
                    if (d(a)) return a
            }
            return null
        }

        function k(a, b) {
            for (a = a.parentNode; a && a != b; a = a.parentNode)
                if (u(a)) return a;
            return b
        }

        function l(a, b) {
            for (; a && a != b;) {
                if (w(a)) return a;
                a = a.parentNode
            }
            return null
        }

        function m(a, b, c) {
            return l(a.container(), c) == l(b.container(), c)
        }

        function n(a, b, c) {
            return k(a.container(), c) == k(b.container(), c)
        }

        function o(a, b) {
            var c, d;
            return b ? (c = b.container(), d = b.offset(), A(c) ? c.childNodes[d + a] : null) : null
        }

        function p(a, b) {
            var c = b.ownerDocument.createRange();
            return a ? (c.setStartBefore(b), c.setEndBefore(b)) : (c.setStartAfter(b), c.setEndAfter(b)), c
        }

        function q(a, b, c) {
            return l(b, a) == l(c, a)
        }

        function r(a, b, c) {
            var d, e;
            for (e = a ? "previousSibling" : "nextSibling"; c && c != b;) {
                if (d = c[e], x(d) && (d = d[e]), v(d)) {
                    if (q(b, d, c)) return d;
                    break
                }
                if (B(d)) break;
                c = c.parentNode
            }
            return null
        }

        function s(a, b, d) {
            var f, g, h, i, j = z(r, !0, b),
                k = z(r, !1, b);
            if (g = d.startContainer, h = d.startOffset, e.isCaretContainerBlock(g)) {
                if (A(g) || (g = g.parentNode), i = g.getAttribute("data-mce-caret"), "before" == i && (f = g.nextSibling, v(f))) return C(f);
                if ("after" == i && (f = g.previousSibling, v(f))) return D(f)
            }
            if (!d.collapsed) return d;
            if (c.isText(g)) {
                if (x(g)) {
                    if (1 === a) {
                        if (f = k(g)) return C(f);
                        if (f = j(g)) return D(f)
                    }
                    if (a === -1) {
                        if (f = j(g)) return D(f);
                        if (f = k(g)) return C(f)
                    }
                    return d
                }
                if (e.endsWithCaretContainer(g) && h >= g.data.length - 1) return 1 === a && (f = k(g)) ? C(f) : d;
                if (e.startsWithCaretContainer(g) && h <= 1) return a === -1 && (f = j(g)) ? D(f) : d;
                if (h === g.data.length) return f = k(g), f ? C(f) : d;
                if (0 === h) return f = j(g), f ? D(f) : d
            }
            return d
        }

        function t(a, b) {
            return v(o(a, b))
        }
        var u = c.isContentEditableTrue,
            v = c.isContentEditableFalse,
            w = c.matchStyleValues("display", "block table table-cell table-caption list-item"),
            x = e.isCaretContainer,
            y = e.isCaretContainerBlock,
            z = a.curry,
            A = c.isElement,
            B = f.isCaretCandidate,
            C = z(p, !0),
            D = z(p, !1);
        return {
            isForwards: g,
            isBackwards: h,
            findNode: j,
            getEditingHost: k,
            getParentBlock: l,
            isInSameBlock: m,
            isInSameEditingHost: n,
            isBeforeContentEditableFalse: z(t, 0),
            isAfterContentEditableFalse: z(t, -1),
            normalizeRange: s
        }
    }), g("4m", ["1j", "44", "1p", "5i", "1g", "1w"], function(a, b, c, d, e, f) {
        function g(a, b) {
            for (var c = []; a && a != b;) c.push(a), a = a.parentNode;
            return c
        }

        function h(a, b) {
            return a.hasChildNodes() && b < a.childNodes.length ? a.childNodes[b] : null
        }

        function i(a, b) {
            if (p(a)) {
                if (r(b.previousSibling) && !m(b.previousSibling)) return c.before(b);
                if (m(b)) return c(b, 0)
            }
            if (q(a)) {
                if (r(b.nextSibling) && !m(b.nextSibling)) return c.after(b);
                if (m(b)) return c(b, b.data.length)
            }
            return q(a) ? o(b) ? c.before(b) : c.after(b) : c.before(b)
        }

        function j(b, e) {
            var f;
            return !!a.isBr(b) && (f = k(1, c.after(b), e), !!f && !d.isInSameBlock(c.before(b), c.before(f), e))
        }

        function k(a, b, u) {
            var v, w, x, y, z, A, B;
            if (!n(u) || !b) return null;
            if (b.isEqual(c.after(u)) && u.lastChild) {
                if (B = c.after(u.lastChild), q(a) && r(u.lastChild) && n(u.lastChild)) return o(u.lastChild) ? c.before(u.lastChild) : B
            } else B = b;
            if (v = B.container(), w = B.offset(), m(v)) {
                if (q(a) && w > 0) return c(v, --w);
                if (p(a) && w < v.length) return c(v, ++w);
                x = v
            } else {
                if (q(a) && w > 0 && (y = h(v, w - 1), r(y))) return !s(y) && (z = d.findNode(y, a, t, y)) ? m(z) ? c(z, z.data.length) : c.after(z) : m(y) ? c(y, y.data.length) : c.before(y);
                if (p(a) && w < v.childNodes.length && (y = h(v, w), r(y))) return j(y, u) ? k(a, c.after(y), u) : !s(y) && (z = d.findNode(y, a, t, y)) ? m(z) ? c(z, 0) : c.before(z) : m(y) ? c(y, 0) : c.after(y);
                x = B.getNode()
            }
            return (p(a) && B.isAtEnd() || q(a) && B.isAtStart()) && (x = d.findNode(x, a, f.constant(!0), u, !0), t(x)) ? i(a, x) : (y = d.findNode(x, a, t, u), A = e.last(e.filter(g(v, u), l)), !A || y && A.contains(y) ? y ? i(a, y) : null : B = p(a) ? c.after(A) : c.before(A))
        }
        var l = a.isContentEditableFalse,
            m = a.isText,
            n = a.isElement,
            o = a.isBr,
            p = d.isForwards,
            q = d.isBackwards,
            r = b.isCaretCandidate,
            s = b.isAtomic,
            t = b.isEditableCaretCandidate;
        return function(a) {
            return {
                next: function(b) {
                    return k(1, b, a)
                },
                prev: function(b) {
                    return k(-1, b, a)
                }
            }
        }
    }), g("5l", ["1m", "4z", "44", "1p", "5i", "4m", "1j"], function(a, b, c, d, e, f, g) {
        var h = function(a, b, c) {
                var e = a ? d.before(c) : d.after(c);
                return o(a, b, e)
            },
            i = function(a) {
                return g.isBr(a) ? d.before(a) : d.after(a)
            },
            j = function(a) {
                return d.isTextPosition(a) ? 0 === a.offset() : c.isCaretCandidate(a.getNode())
            },
            k = function(a) {
                return d.isTextPosition(a) ? a.offset() === a.container().data.length : c.isCaretCandidate(a.getNode(!0))
            },
            l = function(a, b) {
                return !d.isTextPosition(a) && !d.isTextPosition(b) && a.getNode() === b.getNode(!0)
            },
            m = function(a) {
                return !d.isTextPosition(a) && g.isBr(a.getNode())
            },
            n = function(a, b, c) {
                return a ? !l(b, c) && !m(b) && k(b) && j(c) : !l(c, b) && j(b) && k(c)
            },
            o = function(a, c, d) {
                var e = new f(c);
                return b.from(a ? e.next(d) : e.prev(d))
            },
            p = function(a, c, d) {
                return o(a, c, d).bind(function(f) {
                    return e.isInSameBlock(d, f, c) && n(a, d, f) ? o(a, c, f) : b.some(f)
                })
            },
            q = function(a, e) {
                var f = a ? e.firstChild : e.lastChild;
                return g.isText(f) ? b.some(new d(f, a ? 0 : f.data.length)) : f ? c.isCaretCandidate(f) ? b.some(a ? d.before(f) : i(f)) : h(a, e, f) : b.none()
            };
        return {
            fromPosition: o,
            navigate: p,
            positionIn: q
        }
    }), g("5h", ["3x", "4z", "1q", "1r", "4d", "64"], function(a, b, c, d, e, f) {
        var g = function(b) {
                var c = a.foldl(b, function(a, b) {
                    return a[b] = !0, a
                }, {});
                return function(a) {
                    return c[e.name(a)] === !0
                }
            },
            h = g(["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "address", "pre", "form", "blockquote", "center", "dir", "fieldset", "header", "footer", "article", "section", "hgroup", "aside", "nav", "figure"]),
            i = function(a) {
                return function(b) {
                    return c.eq(a, d.fromDom(b.dom().parentNode))
                }
            },
            j = function(a, d) {
                return c.contains(a, d) ? f.closest(d, h, i(a)) : b.none()
            };
        return {
            getParentTextBlock: j
        }
    }), g("79", ["64", "48", "6p"], function(a, b, c) {
        var d = function(a) {
                return b.one(a)
            },
            e = function(c, d, e) {
                return a.ancestor(c, function(a) {
                    return b.is(a, d)
                }, e)
            },
            f = function(c, d) {
                return a.sibling(c, function(a) {
                    return b.is(a, d)
                })
            },
            g = function(c, d) {
                return a.child(c, function(a) {
                    return b.is(a, d)
                })
            },
            h = function(a, c) {
                return b.one(c, a)
            },
            i = function(a, d, f) {
                return c(b.is, e, a, d, f)
            };
        return {
            first: d,
            ancestor: e,
            sibling: f,
            child: g,
            descendant: h,
            closest: i
        }
    }), g("6q", ["79"], function(a) {
        var b = function(b) {
                return a.first(b).isSome()
            },
            c = function(b, c, d) {
                return a.ancestor(b, c, d).isSome()
            },
            d = function(b, c) {
                return a.sibling(b, c).isSome()
            },
            e = function(b, c) {
                return a.child(b, c).isSome()
            },
            f = function(b, c) {
                return a.descendant(b, c).isSome()
            },
            g = function(b, c, d) {
                return a.closest(b, c, d).isSome()
            };
        return {
            any: b,
            ancestor: c,
            sibling: d,
            child: e,
            descendant: f,
            closest: g
        }
    }), g("65", ["1m", "1q", "1r", "6q", "44", "1j", "c"], function(a, b, c, d, e, f, g) {
        var h = function(e, f) {
                var g = c.fromDom(e),
                    h = c.fromDom(f);
                return d.ancestor(h, "pre,code", a.curry(b.eq, g))
            },
            i = function(a, b) {
                return f.isText(b) && /^[ \t\r\n]*$/.test(b.data) && h(a, b) === !1
            },
            j = function(a) {
                return f.isElement(a) && "A" === a.nodeName && a.hasAttribute("name")
            },
            k = function(a, b) {
                return e.isCaretCandidate(b) && i(a, b) === !1 || j(b) || l(b)
            },
            l = f.hasAttribute("data-mce-bookmark"),
            m = f.hasAttribute("data-mce-bogus"),
            n = f.hasAttributeValue("data-mce-bogus", "all"),
            o = function(a) {
                var b, c, d = 0;
                if (k(a, a)) return !1;
                if (c = a.firstChild, !c) return !0;
                b = new g(c, a);
                do
                    if (n(c)) c = b.next(!0);
                    else if (m(c)) c = b.next();
                else if (f.isBr(c)) d++, c = b.next();
                else {
                    if (k(a, c)) return !1;
                    c = b.next()
                }
                while (c);
                return d <= 1
            },
            p = function(a) {
                return o(a.dom())
            };
        return {
            isEmpty: p
        }
    }), g("5f", ["3x", "1m", "4z", "5d", "61", "1q", "1r", "4d", "64", "59", "5l", "1p", "5h", "65", "1j"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
        var p = e.immutable("block", "position"),
            q = e.immutable("from", "to"),
            r = function(a, b) {
                var c = g.fromDom(a),
                    d = g.fromDom(b.container());
                return m.getParentTextBlock(c, d).map(function(a) {
                    return p(a, b)
                })
            },
            s = function(a) {
                return f.eq(a.from().block(), a.to().block()) === !1
            },
            t = function(a) {
                return j.parent(a.from().block()).bind(function(b) {
                    return j.parent(a.to().block()).filter(function(a) {
                        return f.eq(b, a)
                    })
                }).isSome()
            },
            u = function(a) {
                return o.isContentEditableFalse(a.from().block()) === !1 && o.isContentEditableFalse(a.to().block()) === !1
            },
            v = function(a, b, d) {
                return o.isBr(d.position().getNode()) && n.isEmpty(d.block()) === !1 ? k.positionIn(!1, d.block().dom()).bind(function(e) {
                    return e.isEqual(d.position()) ? k.fromPosition(b, a, e).bind(function(b) {
                        return r(a, b)
                    }) : c.some(d)
                }).getOr(d) : d
            },
            w = function(a, b, c) {
                var e = r(a, l.fromRangeStart(c)),
                    f = e.bind(function(c) {
                        return k.fromPosition(b, a, c.position()).bind(function(c) {
                            return r(a, c).map(function(c) {
                                return v(a, b, c)
                            })
                        })
                    });
                return d.liftN([e, f], q).filter(function(a) {
                    return s(a) && t(a) && u(a)
                })
            },
            x = function(a, b, d) {
                return d.collapsed ? w(a, b, d) : c.none()
            };
        return {
            read: x
        }
    }), g("5g", ["3x", "4z", "4a", "5c", "1r", "59", "5l", "1p", "65", "1j"], function(a, b, c, d, e, f, g, h, i, j) {
        var k = function(h, k, l, m) {
                var n = f.children(k);
                return j.isBr(m.getNode()) && (d.remove(e.fromDom(m.getNode())), m = g.positionIn(!1, l.dom()).getOr(m)), i.isEmpty(k) === !1 && a.each(n, function(a) {
                    c.append(l, a)
                }), i.isEmpty(k) && d.remove(k), n.length > 0 ? b.from(m) : b.none()
            },
            l = function(a, b, c) {
                return a ? i.isEmpty(b) ? (d.remove(b), g.positionIn(!0, c.dom())) : g.positionIn(!1, b.dom()).bind(function(d) {
                    return k(a, c, b, d)
                }) : i.isEmpty(c) ? (d.remove(c), g.positionIn(!0, b.dom())) : g.positionIn(!1, c.dom()).bind(function(d) {
                    return k(a, b, c, d)
                })
            };
        return {
            mergeBlocks: l
        }
    }), g("4i", ["5f", "5g"], function(a, b) {
        var c = function(c, d) {
            var e;
            return e = a.read(c.getBody(), d, c.selection.getRng()).bind(function(a) {
                return b.mergeBlocks(d, a.from().block(), a.to().block())
            }), e.each(function(a) {
                c.selection.setRng(a.toRange())
            }), e.isSome()
        };
        return {
            backspaceDelete: c
        }
    }), g("4j", ["5d", "1q", "1r", "5h", "5g"], function(a, b, c, d, e) {
        var f = function(f, g) {
                var h = g.getRng();
                return a.liftN([d.getParentTextBlock(f, c.fromDom(h.startContainer)), d.getParentTextBlock(f, c.fromDom(h.endContainer))], function(a, c) {
                    return b.eq(a, c) === !1 && (h.deleteContents(), e.mergeBlocks(!0, a, c).each(function(a) {
                        g.setRng(a.toRange())
                    }), !0)
                }).getOr(!1)
            },
            g = function(a, b) {
                var d = c.fromDom(a.getBody());
                return a.selection.isCollapsed() === !1 && f(d, a.selection)
            };
        return {
            backspaceDelete: g
        }
    }), g("66", ["3x", "63", "60", "3y", "3z", "49"], function(a, b, c, d, e, f) {
        var g = function(g) {
            if (!c.isArray(g)) throw new e("cases must be an array");
            if (0 === g.length) throw new e("there must be at least one case");
            var h = [],
                i = {};
            return a.each(g, function(j, k) {
                var l = b.keys(j);
                if (1 !== l.length) throw new e("one and only one name per case");
                var m = l[0],
                    n = j[m];
                if (void 0 !== i[m]) throw new e("duplicate key detected:" + m);
                if ("cata" === m) throw new e("cannot have a case named cata (sorry)");
                if (!c.isArray(n)) throw new e("case arguments must be an array");
                h.push(m), i[m] = function() {
                    var c = arguments.length;
                    if (c !== n.length) throw new e("Wrong number of arguments to case " + m + ". Expected " + n.length + " (" + n + "), got " + c);
                    for (var i = new d(c), j = 0; j < i.length; j++) i[j] = arguments[j];
                    var l = function(c) {
                        var d = b.keys(c);
                        if (h.length !== d.length) throw new e("Wrong number of arguments to match. Expected: " + h.join(",") + "\nActual: " + d.join(","));
                        var f = a.forall(h, function(b) {
                            return a.contains(d, b)
                        });
                        if (!f) throw new e("Not all branches were specified when using match. Specified: " + d.join(", ") + "\nRequired: " + h.join(", "));
                        return c[m].apply(null, i)
                    };
                    return {
                        fold: function() {
                            if (arguments.length !== g.length) throw new e("Wrong number of arguments to fold. Expected " + g.length + ", got " + arguments.length);
                            var a = arguments[k];
                            return a.apply(null, i)
                        },
                        match: l,
                        log: function(a) {
                            f.log(a, {
                                constructors: h,
                                constructor: m,
                                params: i
                            })
                        }
                    }
                }
            }), i
        };
        return {
            generate: g
        }
    }), g("5j", ["66", "4z", "1r", "5l", "1p", "5i", "5h", "65", "1j"], function(a, b, c, d, e, f, g, h, i) {
        var j = a.generate([{
                remove: ["element"]
            }, {
                moveToElement: ["element"]
            }, {
                moveToPosition: ["position"]
            }]),
            k = function(a, b) {
                var c = b.getNode(a === !1),
                    d = a ? "after" : "before";
                return i.isElement(c) && c.getAttribute("data-mce-caret") === d
            },
            l = function(a, d, e, f) {
                var i = f.getNode(d === !1);
                return g.getParentTextBlock(c.fromDom(a), c.fromDom(e.getNode())).map(function(a) {
                    return h.isEmpty(a) ? j.remove(a.dom()) : j.moveToElement(i)
                }).orThunk(function() {
                    return b.some(j.moveToElement(i))
                })
            },
            m = function(a, c, e) {
                return d.fromPosition(c, a, e).bind(function(d) {
                    return c && i.isContentEditableFalse(d.getNode()) ? l(a, c, e, d) : c === !1 && i.isContentEditableFalse(d.getNode(!0)) ? l(a, c, e, d) : c && f.isAfterContentEditableFalse(e) ? b.some(j.moveToPosition(d)) : c === !1 && f.isBeforeContentEditableFalse(e) ? b.some(j.moveToPosition(d)) : b.none();
                })
            },
            n = function(a, c) {
                return a && i.isContentEditableFalse(c.nextSibling) ? b.some(j.moveToElement(c.nextSibling)) : a === !1 && i.isContentEditableFalse(c.previousSibling) ? b.some(j.moveToElement(c.previousSibling)) : b.none()
            },
            o = function(a, c, d) {
                return k(c, d) ? n(c, d.getNode(c === !1)).fold(function() {
                    return m(a, c, d)
                }, b.some) : m(a, c, d)
            },
            p = function(a, c, d) {
                var g = f.normalizeRange(c ? 1 : -1, a, d),
                    h = e.fromRangeStart(g);
                return c === !1 && f.isAfterContentEditableFalse(h) ? b.some(j.remove(h.getNode(!0))) : c && f.isBeforeContentEditableFalse(h) ? b.some(j.remove(h.getNode())) : o(a, c, h)
            };
        return {
            read: p
        }
    }), g("67", [], function() {
        var a = /[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/,
            b = function(b) {
                return a.test(b)
            };
        return {
            hasStrongRtl: b
        }
    }), g("5p", ["3x", "1m", "4z", "5d", "1k", "5l", "1p", "5i", "4m", "e", "1j", "67"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
        var m = function(a) {
                return j.DOM.is(a, "a[href],code")
            },
            n = function(a) {
                return "rtl" === j.DOM.getStyle(a, "direction", !0) || l.hasStrongRtl(a.textContent)
            },
            o = function(b, c) {
                return a.filter(j.DOM.getParents(c.container(), "*", b), m)
            },
            p = function(a, b) {
                var d = o(a, b);
                return c.from(d[0])
            },
            q = function(a, b) {
                var d = o(a, b);
                return c.from(d[d.length - 1])
            },
            r = function(a, b, c) {
                var d = h.getParentBlock(b, a),
                    e = h.getParentBlock(c, a);
                return d && d === e
            },
            s = function(a, b) {
                return !!b && q(a, b).isSome()
            },
            t = function(a, b) {
                return q(a, b).map(function(a) {
                    return w(a, !1, b).isNone() || w(a, !0, b).isNone()
                }).getOr(!1)
            },
            u = function(a) {
                return e.isBeforeInline(a) || e.isAfterInline(a)
            },
            v = function(a, b) {
                return f.positionIn(b, a)
            },
            w = function(a, b, c) {
                return f.fromPosition(b, a, c)
            },
            x = function(a, b) {
                var c = b.container(),
                    d = b.offset();
                return a ? e.isCaretContainerInline(c) ? k.isText(c.nextSibling) ? new g(c.nextSibling, 0) : g.after(c) : e.isBeforeInline(b) ? new g(c, d + 1) : b : e.isCaretContainerInline(c) ? k.isText(c.previousSibling) ? new g(c.previousSibling, c.previousSibling.data.length) : g.before(c) : e.isAfterInline(b) ? new g(c, d - 1) : b
            },
            y = b.curry(x, !0),
            z = b.curry(x, !1);
        return {
            isInlineTarget: m,
            findInline: p,
            findRootInline: q,
            isInInline: s,
            isRtl: n,
            isAtInlineEndPoint: t,
            isAtZwsp: u,
            findCaretPositionIn: v,
            findCaretPosition: w,
            normalizePosition: x,
            normalizeForwards: y,
            normalizeBackwards: z,
            hasSameParentBlock: r
        }
    }), g("5k", ["1m", "4z", "5d", "4a", "5c", "1r", "4d", "64", "59", "44", "1p", "65", "1j", "5p"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        var o = function(a, b) {
                var c = a.container(),
                    d = a.offset();
                return k.isTextPosition(a) === !1 && c === b.parentNode && d > k.before(b).offset()
            },
            p = function(a, b) {
                return o(b, a) ? new k(b.container(), b.offset() - 1) : b
            },
            q = function(a) {
                return m.isText(a) ? new k(a, 0) : k.before(a)
            },
            r = function(a) {
                return m.isText(a) ? new k(a, a.data.length) : k.after(a)
            },
            s = function(a) {
                return j.isCaretCandidate(a.previousSibling) ? b.some(r(a.previousSibling)) : a.previousSibling ? n.findCaretPositionIn(a.previousSibling, !1) : b.none()
            },
            t = function(a) {
                return j.isCaretCandidate(a.nextSibling) ? b.some(q(a.nextSibling)) : a.nextSibling ? n.findCaretPositionIn(a.nextSibling, !0) : b.none()
            },
            u = function(a, c) {
                var d = k.before(c.previousSibling ? c.previousSibling : c.parentNode);
                return n.findCaretPosition(a, !1, d).fold(function() {
                    return n.findCaretPosition(a, !0, k.after(c))
                }, b.some)
            },
            v = function(a, c) {
                return n.findCaretPosition(a, !0, k.after(c)).fold(function() {
                    return n.findCaretPosition(a, !1, k.before(c))
                }, b.some)
            },
            w = function(a, b) {
                return s(b).orThunk(function() {
                    return t(b)
                }).orThunk(function() {
                    return u(a, b)
                })
            },
            x = function(a, b) {
                return t(b).orThunk(function() {
                    return s(b)
                }).orThunk(function() {
                    return v(a, b)
                })
            },
            y = function(a, b, c) {
                return a ? x(b, c) : w(b, c)
            },
            z = function(b, c, d) {
                return y(b, c, d).map(a.curry(p, d))
            },
            A = function(a, b, c) {
                c.fold(function() {
                    a.focus()
                }, function(c) {
                    a.selection.setRng(c.toRange(), b)
                })
            },
            B = function(a) {
                return function(b) {
                    return b.dom() === a
                }
            },
            C = function(a, b) {
                return b && a.schema.getBlockElements().hasOwnProperty(g.name(b))
            },
            D = function(a) {
                if (l.isEmpty(a)) {
                    var c = f.fromHtml('<br data-mce-bogus="1">');
                    return e.empty(a), d.append(a, c), b.some(k.before(c.dom()))
                }
                return b.none()
            },
            E = function(a, b) {
                return c.liftN([i.prevSibling(a), i.nextSibling(a), b], function(b, c, d) {
                    var f, g = b.dom(),
                        h = c.dom();
                    return m.isText(g) && m.isText(h) ? (f = g.data.length, g.appendData(h.data), e.remove(c), e.remove(a), d.container() === h ? new k(g, f) : d) : (e.remove(a), d)
                }).orThunk(function() {
                    return e.remove(a), b
                })
            },
            F = function(c, d, e) {
                var f = z(d, c.getBody(), e.dom()),
                    g = h.ancestor(e, a.curry(C, c), B(c.getBody())),
                    i = E(e, f);
                g.bind(D).fold(function() {
                    A(c, d, i)
                }, function(a) {
                    A(c, d, b.some(a))
                })
            };
        return {
            deleteElement: F
        }
    }), g("4k", ["1r", "1p", "5i", "5f", "5j", "5k", "5g", "1j"], function(a, b, c, d, e, f, g, h) {
        var i = function(b, c) {
                return function(d) {
                    return f.deleteElement(b, c, a.fromDom(d)), !0
                }
            },
            j = function(a, c) {
                return function(d) {
                    var e = c ? b.before(d) : b.after(d);
                    return a.selection.setRng(e.toRange()), !0
                }
            },
            k = function(a) {
                return function(b) {
                    return a.selection.setRng(b.toRange()), !0
                }
            },
            l = function(a, b) {
                var c = e.read(a.getBody(), b, a.selection.getRng()).map(function(c) {
                    return c.fold(i(a, b), j(a, b), k(a))
                });
                return c.getOr(!1)
            },
            m = function(b, c) {
                var d = b.selection.getNode();
                return !!h.isContentEditableFalse(d) && (f.deleteElement(b, c, a.fromDom(b.selection.getNode())), !0)
            },
            n = function(a, b) {
                for (; b && b !== a;) {
                    if (h.isContentEditableTrue(b) || h.isContentEditableFalse(b)) return b;
                    b = b.parentNode
                }
                return null
            },
            o = function(a) {
                var c, d = n(a.getBody(), a.selection.getNode());
                return h.isContentEditableTrue(d) && a.dom.isBlock(d) && a.dom.isEmpty(d) && (c = a.dom.create("br", {
                    "data-mce-bogus": "1"
                }), a.dom.setHTML(d, ""), d.appendChild(c), a.selection.setRng(b.before(c).toRange())), !0
            },
            p = function(a, b) {
                return a.selection.isCollapsed() ? l(a, b) : m(a, b)
            };
        return {
            backspaceDelete: p,
            paddEmptyElement: o
        }
    }), g("68", ["1m", "1j", "1l"], function(a, b, c) {
        var d = b.isText,
            e = function(a) {
                return d(a) && a.data[0] === c.ZWSP
            },
            f = function(a) {
                return d(a) && a.data[a.data.length - 1] === c.ZWSP
            },
            g = function(a) {
                return a.ownerDocument.createTextNode(c.ZWSP)
            },
            h = function(a) {
                if (d(a.previousSibling)) return f(a.previousSibling) ? a.previousSibling : (a.previousSibling.appendData(c.ZWSP), a.previousSibling);
                if (d(a)) return e(a) ? a : (a.insertData(0, c.ZWSP), a);
                var b = g(a);
                return a.parentNode.insertBefore(b, a), b
            },
            i = function(a) {
                if (d(a.nextSibling)) return e(a.nextSibling) ? a.nextSibling : (a.nextSibling.insertData(0, c.ZWSP), a.nextSibling);
                if (d(a)) return f(a) ? a : (a.appendData(c.ZWSP), a);
                var b = g(a);
                return a.nextSibling ? a.parentNode.insertBefore(b, a.nextSibling) : a.parentNode.appendChild(b), b
            },
            j = function(a, b) {
                return a ? h(b) : i(b)
            };
        return {
            insertInline: j,
            insertInlineBefore: a.curry(j, !0),
            insertInlineAfter: a.curry(j, !1)
        }
    }), g("69", ["3x", "1k", "1p", "1j", "1l", "9"], function(a, b, c, d, e, f) {
        var g = d.isElement,
            h = d.isText,
            i = function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            j = function(a) {
                try {
                    return a.nodeValue
                } catch (a) {
                    return ""
                }
            },
            k = function(a, b) {
                0 === b.length ? i(a) : a.nodeValue = b
            },
            l = function(a) {
                var b = e.trim(a);
                return {
                    count: a.length - b.length,
                    text: b
                }
            },
            m = function(a, b) {
                return s(a), b
            },
            n = function(a, b) {
                var d = l(a.data.substr(0, b.offset())),
                    e = l(a.data.substr(b.offset())),
                    f = d.text + e.text;
                return f.length > 0 ? (k(a, f), new c(a, b.offset() - d.count)) : b
            },
            o = function(b, d) {
                var e = d.container(),
                    f = a.indexOf(e.childNodes, b).map(function(a) {
                        return a < d.offset() ? new c(e, d.offset() - 1) : d
                    }).getOr(d);
                return s(b), f
            },
            p = function(a, b) {
                return b.container() === a ? n(a, b) : m(a, b)
            },
            q = function(a, b) {
                return b.container() === a.parentNode ? o(a, b) : m(a, b)
            },
            r = function(a, b) {
                return c.isTextPosition(b) ? p(a, b) : q(a, b)
            },
            s = function(a) {
                if (g(a) && b.isCaretContainer(a) && (b.hasContent(a) ? a.removeAttribute("data-mce-caret") : i(a)), h(a)) {
                    var c = e.trim(j(a));
                    k(a, c)
                }
            };
        return {
            removeAndReposition: r,
            remove: s
        }
    }), g("5m", ["4z", "1k", "68", "69", "1p", "1j", "5p"], function(a, b, c, d, e, f, g) {
        var h = function(a, b) {
                return f.isText(a.container()) ? c.insertInline(b, a.container()) : c.insertInline(b, a.getNode())
            },
            i = function(a, c) {
                var d = c.get();
                return d && a.container() === d && b.isCaretContainerInline(d)
            },
            j = function(b, f) {
                return f.fold(function(f) {
                    d.remove(b.get());
                    var g = c.insertInlineBefore(f);
                    return b.set(g), a.some(new e(g, g.length - 1))
                }, function(a) {
                    return g.findCaretPositionIn(a, !0).map(function(a) {
                        if (i(a, b)) return new e(b.get(), 1);
                        d.remove(b.get());
                        var c = h(a, !0);
                        return b.set(c), new e(c, 1)
                    })
                }, function(a) {
                    return g.findCaretPositionIn(a, !1).map(function(a) {
                        if (i(a, b)) return new e(b.get(), b.get().length - 1);
                        d.remove(b.get());
                        var c = h(a, !1);
                        return b.set(c), new e(c, c.length - 1)
                    })
                }, function(f) {
                    d.remove(b.get());
                    var g = c.insertInlineAfter(f);
                    return b.set(g), a.some(new e(g, 1))
                })
            };
        return {
            renderCaret: j
        }
    }), g("6a", ["4z"], function(a) {
        var b = function(b, c) {
            for (var d = 0; d < b.length; d++) {
                var e = b[d].apply(null, c);
                if (e.isSome()) return e
            }
            return a.none()
        };
        return {
            evaluateUntil: b
        }
    }), g("5n", ["66", "1m", "4z", "5d", "1k", "1p", "5i", "1j", "5p", "6a"], function(a, b, c, d, e, f, g, h, i, j) {
        var k = a.generate([{
                before: ["element"]
            }, {
                start: ["element"]
            }, {
                end: ["element"]
            }, {
                after: ["element"]
            }]),
            l = function(a, b) {
                var c = g.getParentBlock(b, a);
                return c ? c : a
            },
            m = function(a, d) {
                var e = i.normalizeForwards(d),
                    f = l(a, e.container());
                return i.findRootInline(f, e).fold(function() {
                    return i.findCaretPosition(f, !0, e).bind(b.curry(i.findRootInline, f)).map(function(a) {
                        return k.before(a)
                    })
                }, c.none)
            },
            n = function(a, b) {
                var d = i.normalizeBackwards(b);
                return i.findRootInline(a, d).bind(function(a) {
                    var b = i.findCaretPosition(a, !1, d);
                    return b.isNone() ? c.some(k.start(a)) : c.none()
                })
            },
            o = function(a, b) {
                var d = i.normalizeForwards(b);
                return i.findRootInline(a, d).bind(function(a) {
                    var b = i.findCaretPosition(a, !0, d);
                    return b.isNone() ? c.some(k.end(a)) : c.none()
                })
            },
            p = function(a, d) {
                var e = i.normalizeBackwards(d),
                    f = l(a, e.container());
                return i.findRootInline(f, e).fold(function() {
                    return i.findCaretPosition(f, !1, e).bind(b.curry(i.findRootInline, f)).map(function(a) {
                        return k.after(a)
                    })
                }, c.none)
            },
            q = function(a) {
                return i.isRtl(s(a)) === !1
            },
            r = function(a, b) {
                var c = j.evaluateUntil([m, n, o, p], [a, b]);
                return c.filter(q)
            },
            s = function(a) {
                return a.fold(b.identity, b.identity, b.identity, b.identity)
            },
            t = function(a) {
                return a.fold(b.constant("before"), b.constant("start"), b.constant("end"), b.constant("after"))
            },
            u = function(a) {
                return a.fold(k.before, k.before, k.after, k.after)
            },
            v = function(a) {
                return a.fold(k.start, k.start, k.end, k.end)
            },
            w = function(a, b) {
                return t(a) === t(b) && s(a) === s(b)
            },
            x = function(a, b, c, e, f) {
                return d.liftN([i.findRootInline(b, c), i.findRootInline(b, e)], function(c, d) {
                    return c !== d && i.hasSameParentBlock(b, c, d) ? k.after(a ? c : d) : f
                }).getOr(f)
            },
            y = function(a, c) {
                return a.fold(b.constant(!0), function(a) {
                    return !w(a, c)
                })
            },
            z = function(a, c, d, e) {
                var f = i.normalizePosition(a, e),
                    g = i.findCaretPosition(c, a, f).map(b.curry(i.normalizePosition, a)),
                    h = g.fold(function() {
                        return d.map(u)
                    }, function(e) {
                        return r(c, e).map(b.curry(x, a, c, f, e)).filter(b.curry(y, d))
                    });
                return h.filter(q)
            },
            A = function(a, d) {
                return a ? d.fold(b.compose(c.some, k.start), c.none, b.compose(c.some, k.after), c.none) : d.fold(c.none, b.compose(c.some, k.before), c.none, b.compose(c.some, k.end))
            },
            B = function(a, c, d) {
                var e = i.normalizePosition(a, d),
                    f = r(c, e);
                return r(c, e).bind(b.curry(A, a)).orThunk(function() {
                    return z(a, c, f, d)
                })
            };
        return {
            readLocation: r,
            prevLocation: b.curry(B, !1),
            nextLocation: b.curry(B, !0),
            getElement: s,
            outside: u,
            inside: v
        }
    }), g("6b", [], function() {
        var a = function(b) {
            var c = b,
                d = function() {
                    return c
                },
                e = function(a) {
                    c = a
                },
                f = function() {
                    return a(d())
                };
            return {
                get: d,
                set: e,
                clone: f
            }
        };
        return a
    }), g("5o", ["3x", "6b", "1m", "69", "1p", "5m", "5n", "5p"], function(a, b, c, d, e, f, g, h) {
        var i = function(a, b) {
                var c = a.dom.createRng();
                c.setStart(b.container(), b.offset()), c.setEnd(b.container(), b.offset()), a.selection.setRng(c)
            },
            j = function(a) {
                return a.settings.inline_boundaries !== !1
            },
            k = function(a, b) {
                a ? b.setAttribute("data-mce-selected", "1") : b.removeAttribute("data-mce-selected", "1")
            },
            l = function(a, b, c) {
                return f.renderCaret(b, c).map(function(b) {
                    return i(a, b), c
                })
            },
            m = function(a, b, c) {
                var d = a.getBody(),
                    f = e.fromRangeStart(a.selection.getRng()),
                    h = c ? g.nextLocation(d, f) : g.prevLocation(d, f);
                return h.bind(function(c) {
                    return l(a, b, c)
                })
            },
            n = function(b, d) {
                var e = b.select("a[href][data-mce-selected],code[data-mce-selected]"),
                    f = a.filter(d, h.isInlineTarget);
                a.each(a.difference(e, f), c.curry(k, !1)), a.each(a.difference(f, e), c.curry(k, !0))
            },
            o = function(a, b) {
                if (a.selection.isCollapsed() && a.composing !== !0 && b.get()) {
                    var c = e.fromRangeStart(a.selection.getRng());
                    e.isTextPosition(c) && h.isAtZwsp(c) === !1 && (i(a, d.removeAndReposition(b.get(), c)), b.set(null))
                }
            },
            p = function(b, c, d) {
                if (b.selection.isCollapsed()) {
                    var f = a.filter(d, h.isInlineTarget);
                    a.each(f, function(a) {
                        var d = e.fromRangeStart(b.selection.getRng());
                        g.readLocation(b.getBody(), d).bind(function(a) {
                            return l(b, c, a)
                        })
                    })
                }
            },
            q = function(a, b, c) {
                return function() {
                    return !!j(a) && m(a, b, c).isSome()
                }
            },
            r = function(a) {
                var c = new b(null);
                return a.on("NodeChange", function(b) {
                    j(a) && (n(a.dom, b.parents), o(a, c), p(a, c, b.parents))
                }), c
            };
        return {
            move: q,
            setupSelectedState: r,
            setCaretPosition: i
        }
    }), g("4l", ["1m", "4z", "5d", "1r", "1k", "5l", "1p", "5i", "5k", "5m", "5n", "5o", "5p"], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
        var n = function(a) {
                return a.settings.inline_boundaries !== !1
            },
            o = function(a, b) {
                var c = document.createRange();
                return c.setStart(a.container(), a.offset()), c.setEnd(b.container(), b.offset()), c
            },
            p = function(a) {
                return c.liftN([m.findCaretPositionIn(a, !0), m.findCaretPositionIn(a, !1)], function(b, c) {
                    var d = m.normalizePosition(!0, b),
                        e = m.normalizePosition(!1, c);
                    return m.findCaretPosition(a, !0, d).map(function(a) {
                        return a.isEqual(e)
                    }).getOr(!0)
                }).getOr(!0)
            },
            q = function(a, b) {
                return function(c) {
                    return j.renderCaret(b, c).map(function(b) {
                        return l.setCaretPosition(a, b), !0
                    }).getOr(!1)
                }
            },
            r = function(a, b, c, d) {
                var e = a.getBody();
                a.undoManager.ignore(function() {
                    a.selection.setRng(o(c, d)), a.execCommand("Delete"), k.readLocation(e, g.fromRangeStart(a.selection.getRng())).map(k.inside).map(q(a, b))
                }), a.nodeChanged()
            },
            s = function(a, b) {
                var c = h.getParentBlock(b, a);
                return c ? c : a
            },
            t = function(c, e, g, h) {
                var j = s(c.getBody(), h.container()),
                    l = k.readLocation(j, h);
                return l.bind(function(c) {
                    return g ? c.fold(a.constant(b.some(k.inside(c))), b.none, a.constant(b.some(k.outside(c))), b.none) : c.fold(b.none, a.constant(b.some(k.outside(c))), b.none, a.constant(b.some(k.inside(c))))
                }).map(q(c, e)).getOrThunk(function() {
                    var a = f.navigate(g, j, h),
                        b = a.bind(function(a) {
                            return k.readLocation(j, a)
                        });
                    return l.isSome() && b.isSome() ? m.findRootInline(j, h).map(function(a) {
                        return !!p(a) && (i.deleteElement(c, g, d.fromDom(a)), !0)
                    }).getOr(!1) : b.bind(function(b) {
                        return a.map(function(a) {
                            return g ? r(c, e, h, a) : r(c, e, a, h), !0
                        })
                    }).getOr(!1)
                })
            },
            u = function(a, b, c) {
                if (a.selection.isCollapsed() && n(a)) {
                    var d = g.fromRangeStart(a.selection.getRng());
                    return t(a, b, c, d)
                }
                return !1
            };
        return {
            backspaceDelete: u
        }
    }), g("20", ["4i", "4j", "4k", "4l"], function(a, b, c, d) {
        var e = function(a, b) {
                a.getDoc().execCommand(b, !1, null)
            },
            f = function(a) {
                var b = a.dom,
                    c = a.getBody();
                b.isEmpty(c) && (a.setContent(""), c.firstChild && b.isBlock(c.firstChild) ? a.selection.setCursorLocation(c.firstChild, 0) : a.selection.setCursorLocation(c, 0))
            },
            g = function(g) {
                c.backspaceDelete(g, !1) || d.backspaceDelete(g, !1) || a.backspaceDelete(g, !1) || b.backspaceDelete(g, !1) || (e(g, "Delete"), f(g))
            },
            h = function(f) {
                c.backspaceDelete(f, !0) || d.backspaceDelete(f, !0) || a.backspaceDelete(f, !0) || b.backspaceDelete(f, !0) || e(f, "ForwardDelete")
            };
        return {
            deleteCommand: g,
            forwardDeleteCommand: h
        }
    }), g("4n", ["5l", "1p", "5i", "1j"], function(a, b, c, d) {
        var e = function(a) {
                return d.isElement(a) && /^(P|H[1-6]|DIV)$/.test(a.nodeName)
            },
            f = function(a, b) {
                return b(a.endContainer)
            },
            g = function(a, b, c, d) {
                var e = document.createRange();
                return e.setStart(a, b), e.setEnd(c, d), e
            },
            h = function(d) {
                var h = b.fromRangeStart(d),
                    i = b.fromRangeEnd(d),
                    j = d.commonAncestorContainer;
                return d.collapsed === !1 && f(d, e) && 0 === d.endOffset ? a.fromPosition(!1, j, i).map(function(a) {
                    return !c.isInSameBlock(h, i, j) && c.isInSameBlock(h, a, j) ? g(h.container(), h.offset(), a.container(), a.offset()) : d
                }).getOr(d) : d
            },
            i = function(a) {
                return h(a)
            };
        return {
            normalize: i
        }
    }), g("4o", ["9", "4m", "1p"], function(a, b, c) {
        var d = function(a) {
                var b = a.firstChild,
                    c = a.lastChild;
                return b && "meta" === b.name && (b = b.next), c && "mce_marker" === c.attr("id") && (c = c.prev), !(!b || b !== c) && ("ul" === b.name || "ol" === b.name)
            },
            e = function(a) {
                var b = a.firstChild,
                    c = a.lastChild;
                return b && "META" === b.nodeName && b.parentNode.removeChild(b), c && "mce_marker" === c.id && c.parentNode.removeChild(c), a
            },
            f = function(a, b, c) {
                var d = b.serialize(c),
                    f = a.createFragment(d);
                return e(f)
            },
            g = function(b) {
                return a.grep(b.childNodes, function(a) {
                    return "LI" === a.nodeName
                })
            },
            h = function(a) {
                return !a.firstChild
            },
            i = function(a) {
                return a.length > 0 && h(a[a.length - 1]) ? a.slice(0, -1) : a
            },
            j = function(a, b) {
                var c = a.getParent(b, a.isBlock);
                return c && "LI" === c.nodeName ? c : null
            },
            k = function(a, b) {
                return !!j(a, b)
            },
            l = function(a, b) {
                var c = b.cloneRange(),
                    d = b.cloneRange();
                return c.setStartBefore(a), d.setEndAfter(a), [c.cloneContents(), d.cloneContents()]
            },
            m = function(a, d) {
                var e = c.before(a),
                    f = new b(d),
                    g = f.next(e);
                return g ? g.toRange() : null
            },
            n = function(a, d) {
                var e = c.after(a),
                    f = new b(d),
                    g = f.prev(e);
                return g ? g.toRange() : null
            },
            o = function(b, c, d, e) {
                var f = l(b, e),
                    g = b.parentNode;
                return g.insertBefore(f[0], b), a.each(c, function(a) {
                    g.insertBefore(a, b)
                }), g.insertBefore(f[1], b), g.removeChild(b), n(c[c.length - 1], d)
            },
            p = function(b, c, d) {
                var e = b.parentNode;
                return a.each(c, function(a) {
                    e.insertBefore(a, b)
                }), m(b, d)
            },
            q = function(a, b, c, d) {
                return d.insertAfter(b.reverse(), a), n(b[0], c)
            },
            r = function(a, d, e, h) {
                var k = f(d, a, h),
                    l = j(d, e.startContainer),
                    m = i(g(k.firstChild)),
                    n = 1,
                    r = 2,
                    s = d.getRoot(),
                    t = function(a) {
                        var f = c.fromRangeStart(e),
                            g = new b(d.getRoot()),
                            h = a === n ? g.prev(f) : g.next(f);
                        return !h || j(d, h.getNode()) !== l
                    };
                return t(n) ? p(l, m, s) : t(r) ? q(l, m, s, d) : o(l, m, s, e)
            };
        return {
            isListFragment: d,
            insertAtCaret: r,
            isParentBlockLi: k,
            trimListItems: i,
            listItems: g
        }
    }), g("21", ["1p", "4m", "1v", "1j", "4n", "6", "n", "4o", "9"], function(a, b, c, d, e, f, g, h, i) {
        var j = d.matchNodeNames("td th"),
            k = function(a, b, c) {
                if ("all" === c.getAttribute("data-mce-bogus")) c.parentNode.insertBefore(a.dom.createFragment(b), c);
                else {
                    var d = c.firstChild,
                        e = c.lastChild;
                    !d || d === e && "BR" === d.nodeName ? a.dom.setHTML(c, b) : a.selection.setContent(b)
                }
            },
            l = function(d, l, m) {
                function n(a) {
                    function b(a) {
                        return d[a] && 3 == d[a].nodeType
                    }
                    var c, d, e;
                    return c = I.getRng(!0), d = c.startContainer, e = c.startOffset, 3 == d.nodeType && (e > 0 ? a = a.replace(/^&nbsp;/, " ") : b("previousSibling") || (a = a.replace(/^ /, "&nbsp;")), e < d.length ? a = a.replace(/&nbsp;(<br>|)$/, " ") : b("nextSibling") || (a = a.replace(/(&nbsp;| )(<br>|)$/, "&nbsp;"))), a
                }

                function o() {
                    var a, b, c;
                    a = I.getRng(!0), b = a.startContainer, c = a.startOffset, 3 == b.nodeType && a.collapsed && ("\xa0" === b.data[c] ? (b.deleteData(c, 1), /[\u00a0| ]$/.test(l) || (l += " ")) : "\xa0" === b.data[c - 1] && (b.deleteData(c - 1, 1), /[\u00a0| ]$/.test(l) || (l = " " + l)))
                }

                function p() {
                    if (G) {
                        var a = d.getBody(),
                            b = new c(J);
                        i.each(J.select("*[data-mce-fragment]"), function(c) {
                            for (var d = c.parentNode; d && d != a; d = d.parentNode) H[c.nodeName.toLowerCase()] && b.compare(d, c) && J.remove(c, !0)
                        })
                    }
                }

                function q(a) {
                    for (var b = a; b = b.walk();) 1 === b.type && b.attr("data-mce-fragment", "1")
                }

                function r(a) {
                    i.each(a.getElementsByTagName("*"), function(a) {
                        a.removeAttribute("data-mce-fragment")
                    })
                }

                function s(a) {
                    return !!a.getAttribute("data-mce-fragment")
                }

                function t(a) {
                    return a && !d.schema.getShortEndedElements()[a.nodeName]
                }

                function u(c) {
                    function e(a) {
                        for (var b = d.getBody(); a && a !== b; a = a.parentNode)
                            if ("false" === d.dom.getContentEditable(a)) return a;
                        return null
                    }

                    function g(c) {
                        var e = a.fromRangeStart(c),
                            f = new b(d.getBody());
                        if (e = f.next(e)) return e.toRange()
                    }
                    var h, i, k;
                    if (c) {
                        if (I.scrollIntoView(c), h = e(c)) return J.remove(c), void I.select(h);
                        C = J.createRng(), D = c.previousSibling, D && 3 == D.nodeType ? (C.setStart(D, D.nodeValue.length), f.ie || (E = c.nextSibling, E && 3 == E.nodeType && (D.appendData(E.data), E.parentNode.removeChild(E)))) : (C.setStartBefore(c), C.setEndBefore(c)), i = J.getParent(c, J.isBlock), J.remove(c), i && J.isEmpty(i) && (d.$(i).empty(), C.setStart(i, 0), C.setEnd(i, 0), j(i) || s(i) || !(k = g(C)) ? J.add(i, J.create("br", {
                            "data-mce-bogus": "1"
                        })) : (C = k, J.remove(i))), I.setRng(C)
                    }
                }
                var v, w, x, y, z, A, B, C, D, E, F, G, H = d.schema.getTextInlineElements(),
                    I = d.selection,
                    J = d.dom;
                /^ | $/.test(l) && (l = n(l)), v = d.parser, G = m.merge, w = new g({
                    validate: d.settings.validate
                }, d.schema), F = '<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>', A = {
                    content: l,
                    format: "html",
                    selection: !0
                }, d.fire("BeforeSetContent", A), l = A.content, l.indexOf("{$caret}") == -1 && (l += "{$caret}"), l = l.replace(/\{\$caret\}/, F), C = I.getRng();
                var K = C.startContainer || (C.parentElement ? C.parentElement() : null),
                    L = d.getBody();
                K === L && I.isCollapsed() && J.isBlock(L.firstChild) && t(L.firstChild) && J.isEmpty(L.firstChild) && (C = J.createRng(), C.setStart(L.firstChild, 0), C.setEnd(L.firstChild, 0), I.setRng(C)), I.isCollapsed() || (d.selection.setRng(e.normalize(d.selection.getRng())), d.getDoc().execCommand("Delete", !1, null), o()), x = I.getNode();
                var M = {
                    context: x.nodeName.toLowerCase(),
                    data: m.data
                };
                if (z = v.parse(l, M), m.paste === !0 && h.isListFragment(z) && h.isParentBlockLi(J, x)) return C = h.insertAtCaret(w, J, d.selection.getRng(!0), z), d.selection.setRng(C), void d.fire("SetContent", A);
                if (q(z), D = z.lastChild, "mce_marker" == D.attr("id"))
                    for (B = D, D = D.prev; D; D = D.walk(!0))
                        if (3 == D.type || !J.isBlock(D.name)) {
                            d.schema.isValidChild(D.parent.name, "span") && D.parent.insert(B, D, "br" === D.name);
                            break
                        }
                if (d._selectionOverrides.showBlockCaretContainer(x), M.invalid) {
                    for (I.setContent(F), x = I.getNode(), y = d.getBody(), 9 == x.nodeType ? x = D = y : D = x; D !== y;) x = D, D = D.parentNode;
                    l = x == y ? y.innerHTML : J.getOuterHTML(x), l = w.serialize(v.parse(l.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i, function() {
                        return w.serialize(z)
                    }))), x == y ? J.setHTML(y, l) : J.setOuterHTML(x, l)
                } else l = w.serialize(z), k(d, l, x);
                p(), u(J.get("mce_marker")), r(d.getBody()), d.fire("SetContent", A), d.addVisual()
            },
            m = function(a) {
                var b;
                return "string" != typeof a ? (b = i.extend({
                    paste: a.paste,
                    data: {
                        paste: a.paste
                    }
                }, a), {
                    content: a.content,
                    details: b
                }) : {
                    content: a,
                    details: {}
                }
            },
            n = function(a, b) {
                var c = m(b);
                l(a, c.content, c.details)
            };
        return {
            insertAtCaret: n
        }
    }), g("v", ["20", "1j", "h", "c", "6", "21", "9"], function(a, b, c, d, e, f, g) {
        var h = g.each,
            i = g.extend,
            j = g.map,
            k = g.inArray,
            l = g.explode,
            m = e.ie && e.ie < 11,
            n = !0,
            o = !1;
        return function(g) {
            function p(a, b, c, d) {
                var e, f, i = 0;
                if (!g.removed) {
                    if (/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(a) || d && d.skip_focus || g.focus(), d = g.fire("BeforeExecCommand", {
                            command: a,
                            ui: b,
                            value: c
                        }), d.isDefaultPrevented()) return !1;
                    if (f = a.toLowerCase(), e = H.exec[f]) return e(f, b, c), g.fire("ExecCommand", {
                        command: a,
                        ui: b,
                        value: c
                    }), !0;
                    if (h(g.plugins, function(d) {
                            if (d.execCommand && d.execCommand(a, b, c)) return g.fire("ExecCommand", {
                                command: a,
                                ui: b,
                                value: c
                            }), i = !0, !1
                        }), i) return i;
                    if (g.theme && g.theme.execCommand && g.theme.execCommand(a, b, c)) return g.fire("ExecCommand", {
                        command: a,
                        ui: b,
                        value: c
                    }), !0;
                    try {
                        i = g.getDoc().execCommand(a, b, c)
                    } catch (a) {}
                    return !!i && (g.fire("ExecCommand", {
                        command: a,
                        ui: b,
                        value: c
                    }), !0)
                }
            }

            function q(a) {
                var b;
                if (!g.quirks.isHidden() && !g.removed) {
                    if (a = a.toLowerCase(), b = H.state[a]) return b(a);
                    try {
                        return g.getDoc().queryCommandState(a)
                    } catch (a) {}
                    return !1
                }
            }

            function r(a) {
                var b;
                if (!g.quirks.isHidden() && !g.removed) {
                    if (a = a.toLowerCase(), b = H.value[a]) return b(a);
                    try {
                        return g.getDoc().queryCommandValue(a)
                    } catch (a) {}
                }
            }

            function s(a, b) {
                b = b || "exec", h(a, function(a, c) {
                    h(c.toLowerCase().split(","), function(c) {
                        H[b][c] = a
                    })
                })
            }

            function t(a, b, c) {
                a = a.toLowerCase(), H.exec[a] = function(a, d, e, f) {
                    return b.call(c || g, d, e, f)
                }
            }

            function u(a) {
                if (a = a.toLowerCase(), H.exec[a]) return !0;
                try {
                    return g.getDoc().queryCommandSupported(a)
                } catch (a) {}
                return !1
            }

            function v(a, b, c) {
                a = a.toLowerCase(), H.state[a] = function() {
                    return b.call(c || g)
                }
            }

            function w(a, b, c) {
                a = a.toLowerCase(), H.value[a] = function() {
                    return b.call(c || g)
                }
            }

            function x(a) {
                return a = a.toLowerCase(), !!H.exec[a]
            }

            function y(a, b, c) {
                return void 0 === b && (b = o), void 0 === c && (c = null), g.getDoc().execCommand(a, b, c)
            }

            function z(a) {
                return F.match(a)
            }

            function A(a, b) {
                F.toggle(a, b ? {
                    value: b
                } : void 0), g.nodeChanged()
            }

            function B(a) {
                G = E.getBookmark(a)
            }

            function C() {
                E.moveToBookmark(G)
            }
            var D, E, F, G, H = {
                    state: {},
                    exec: {},
                    value: {}
                },
                I = g.settings;
            g.on("PreInit", function() {
                D = g.dom, E = g.selection, I = g.settings, F = g.formatter
            }), i(this, {
                execCommand: p,
                queryCommandState: q,
                queryCommandValue: r,
                queryCommandSupported: u,
                addCommands: s,
                addCommand: t,
                addQueryStateHandler: v,
                addQueryValueHandler: w,
                hasCustomCommand: x
            }), s({
                "mceResetDesignMode,mceBeginUndoLevel": function() {},
                "mceEndUndoLevel,mceAddUndoLevel": function() {
                    g.undoManager.add()
                },
                "Cut,Copy,Paste": function(a) {
                    var b, c = g.getDoc();
                    try {
                        y(a)
                    } catch (a) {
                        b = n
                    }
                    if ("paste" !== a || c.queryCommandEnabled(a) || (b = !0), b || !c.queryCommandSupported(a)) {
                        var d = g.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");
                        e.mac && (d = d.replace(/Ctrl\+/g, "\u2318+")), g.notificationManager.open({
                            text: d,
                            type: "error"
                        })
                    }
                },
                unlink: function() {
                    if (E.isCollapsed()) {
                        var a = g.dom.getParent(g.selection.getStart(), "a");
                        return void(a && g.dom.remove(a, !0))
                    }
                    F.remove("link")
                },
                "JustifyLeft,JustifyCenter,JustifyRight,JustifyFull,JustifyNone": function(a) {
                    var b = a.substring(7);
                    "full" == b && (b = "justify"), h("left,center,right,justify".split(","), function(a) {
                        b != a && F.remove("align" + a)
                    }), "none" != b && A("align" + b)
                },
                "InsertUnorderedList,InsertOrderedList": function(a) {
                    var b, c;
                    y(a), b = D.getParent(E.getNode(), "ol,ul"), b && (c = b.parentNode, /^(H[1-6]|P|ADDRESS|PRE)$/.test(c.nodeName) && (B(), D.split(c, b), C()))
                },
                "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": function(a) {
                    A(a)
                },
                "ForeColor,HiliteColor,FontName": function(a, b, c) {
                    A(a, c)
                },
                FontSize: function(a, b, c) {
                    var d, e;
                    c >= 1 && c <= 7 && (e = l(I.font_size_style_values), d = l(I.font_size_classes), c = d ? d[c - 1] || c : e[c - 1] || c), A(a, c)
                },
                RemoveFormat: function(a) {
                    F.remove(a)
                },
                mceBlockQuote: function() {
                    A("blockquote")
                },
                FormatBlock: function(a, b, c) {
                    return A(c || "p")
                },
                mceCleanup: function() {
                    var a = E.getBookmark();
                    g.setContent(g.getContent({
                        cleanup: n
                    }), {
                        cleanup: n
                    }), E.moveToBookmark(a)
                },
                mceRemoveNode: function(a, b, c) {
                    var d = c || E.getNode();
                    d != g.getBody() && (B(), g.dom.remove(d, n), C())
                },
                mceSelectNodeDepth: function(a, b, c) {
                    var d = 0;
                    D.getParent(E.getNode(), function(a) {
                        if (1 == a.nodeType && d++ == c) return E.select(a), o
                    }, g.getBody())
                },
                mceSelectNode: function(a, b, c) {
                    E.select(c)
                },
                mceInsertContent: function(a, b, c) {
                    f.insertAtCaret(g, c)
                },
                mceInsertRawHTML: function(a, b, c) {
                    E.setContent("tiny_mce_marker"), g.setContent(g.getContent().replace(/tiny_mce_marker/g, function() {
                        return c
                    }))
                },
                mceToggleFormat: function(a, b, c) {
                    A(c)
                },
                mceSetContent: function(a, b, c) {
                    g.setContent(c)
                },
                "Indent,Outdent": function(a) {
                    var b, c, d;
                    b = I.indentation, c = /[a-z%]+$/i.exec(b), b = parseInt(b, 10), q("InsertUnorderedList") || q("InsertOrderedList") ? y(a) : (I.forced_root_block || D.getParent(E.getNode(), D.isBlock) || F.apply("div"), h(E.getSelectedBlocks(), function(e) {
                        if ("false" !== D.getContentEditable(e) && "LI" !== e.nodeName) {
                            var f = g.getParam("indent_use_margin", !1) ? "margin" : "padding";
                            f = "TABLE" === e.nodeName ? "margin" : f, f += "rtl" == D.getStyle(e, "direction", !0) ? "Right" : "Left", "outdent" == a ? (d = Math.max(0, parseInt(e.style[f] || 0, 10) - b), D.setStyle(e, f, d ? d + c : "")) : (d = parseInt(e.style[f] || 0, 10) + b + c, D.setStyle(e, f, d))
                        }
                    }))
                },
                mceRepaint: function() {},
                InsertHorizontalRule: function() {
                    g.execCommand("mceInsertContent", !1, "<hr />")
                },
                mceToggleVisualAid: function() {
                    g.hasVisual = !g.hasVisual, g.addVisual()
                },
                mceReplaceContent: function(a, b, c) {
                    g.execCommand("mceInsertContent", !1, c.replace(/\{\$selection\}/g, E.getContent({
                        format: "text"
                    })))
                },
                mceInsertLink: function(a, b, c) {
                    var d;
                    "string" == typeof c && (c = {
                        href: c
                    }), d = D.getParent(E.getNode(), "a"), c.href = c.href.replace(" ", "%20"), d && c.href || F.remove("link"), c.href && F.apply("link", c, d)
                },
                selectAll: function() {
                    var a, c = D.getRoot();
                    if (E.getRng().setStart) {
                        var d = D.getParent(E.getStart(), b.isContentEditableTrue);
                        d && (a = D.createRng(), a.selectNodeContents(d), E.setRng(a))
                    } else a = E.getRng(), a.item || (a.moveToElementText(c), a.select())
                },
                "delete": function() {
                    a.deleteCommand(g)
                },
                forwardDelete: function() {
                    a.forwardDeleteCommand(g)
                },
                mceNewDocument: function() {
                    g.setContent("")
                },
                InsertLineBreak: function(a, b, e) {
                    function f() {
                        for (var a, b = new d(p, r), c = g.schema.getNonEmptyElements(); a = b.next();)
                            if (c[a.nodeName.toLowerCase()] || a.length > 0) return !0
                    }
                    var h, i, j, k = e,
                        l = E.getRng(!0);
                    new c(D).normalize(l);
                    var o = l.startOffset,
                        p = l.startContainer;
                    if (1 == p.nodeType && p.hasChildNodes()) {
                        var q = o > p.childNodes.length - 1;
                        p = p.childNodes[Math.min(o, p.childNodes.length - 1)] || p, o = q && 3 == p.nodeType ? p.nodeValue.length : 0
                    }
                    var r = D.getParent(p, D.isBlock),
                        s = r ? r.nodeName.toUpperCase() : "",
                        t = r ? D.getParent(r.parentNode, D.isBlock) : null,
                        u = t ? t.nodeName.toUpperCase() : "",
                        v = k && k.ctrlKey;
                    "LI" != u || v || (r = t, s = u), p && 3 == p.nodeType && o >= p.nodeValue.length && (m || f() || (h = D.create("br"), l.insertNode(h), l.setStartAfter(h), l.setEndAfter(h), i = !0)), h = D.create("br"), l.insertNode(h);
                    var w = D.doc.documentMode;
                    return m && "PRE" == s && (!w || w < 8) && h.parentNode.insertBefore(D.doc.createTextNode("\r"), h), j = D.create("span", {}, "&nbsp;"), h.parentNode.insertBefore(j, h), E.scrollIntoView(j), D.remove(j), i ? (l.setStartBefore(h), l.setEndBefore(h)) : (l.setStartAfter(h), l.setEndAfter(h)), E.setRng(l), g.undoManager.add(), n
                }
            }), s({
                "JustifyLeft,JustifyCenter,JustifyRight,JustifyFull": function(a) {
                    var b = "align" + a.substring(7),
                        c = E.isCollapsed() ? [D.getParent(E.getNode(), D.isBlock)] : E.getSelectedBlocks(),
                        d = j(c, function(a) {
                            return !!F.matchNode(a, b)
                        });
                    return k(d, n) !== -1
                },
                "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": function(a) {
                    return z(a)
                },
                mceBlockQuote: function() {
                    return z("blockquote")
                },
                Outdent: function() {
                    var a;
                    if (I.inline_styles) {
                        if ((a = D.getParent(E.getStart(), D.isBlock)) && parseInt(a.style.paddingLeft, 10) > 0) return n;
                        if ((a = D.getParent(E.getEnd(), D.isBlock)) && parseInt(a.style.paddingLeft, 10) > 0) return n
                    }
                    return q("InsertUnorderedList") || q("InsertOrderedList") || !I.inline_styles && !!D.getParent(E.getNode(), "BLOCKQUOTE")
                },
                "InsertUnorderedList,InsertOrderedList": function(a) {
                    var b = D.getParent(E.getNode(), "ul,ol");
                    return b && ("insertunorderedlist" === a && "UL" === b.tagName || "insertorderedlist" === a && "OL" === b.tagName)
                }
            }, "state"), s({
                "FontSize,FontName": function(a) {
                    var b, c = 0;
                    return (b = D.getParent(E.getNode(), "span")) && (c = "fontsize" == a ? b.style.fontSize : b.style.fontFamily.replace(/, /g, ",").replace(/[\'\"]/g, "").toLowerCase()), c
                }
            }, "value"), s({
                Undo: function() {
                    g.undoManager.undo()
                },
                Redo: function() {
                    g.undoManager.redo()
                }
            })
        }
    }), g("w", ["22", "9"], function(a, b) {
        function c(b, g) {
            var h, i, j = this;
            if (b = e(b), g = j.settings = g || {}, h = g.base_uri, /^([\w\-]+):([^\/]{2})/i.test(b) || /^\s*#/.test(b)) return void(j.source = b);
            var k = 0 === b.indexOf("//");
            0 !== b.indexOf("/") || k || (b = (h ? h.protocol || "http" : "http") + "://mce_host" + b), /^[\w\-]*:?\/\//.test(b) || (i = g.base_uri ? g.base_uri.path : new c(a.location.href).directory, "" === g.base_uri.protocol ? b = "//mce_host" + j.toAbsPath(i, b) : (b = /([^#?]*)([#?]?.*)/.exec(b), b = (h && h.protocol || "http") + "://mce_host" + j.toAbsPath(i, b[1]) + b[2])), b = b.replace(/@@/g, "(mce_at)"), b = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(b), d(f, function(a, c) {
                var d = b[c];
                d && (d = d.replace(/\(mce_at\)/g, "@@")), j[a] = d
            }), h && (j.protocol || (j.protocol = h.protocol), j.userInfo || (j.userInfo = h.userInfo), j.port || "mce_host" !== j.host || (j.port = h.port), j.host && "mce_host" !== j.host || (j.host = h.host), j.source = ""), k && (j.protocol = "")
        }
        var d = b.each,
            e = b.trim,
            f = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),
            g = {
                ftp: 21,
                http: 80,
                https: 443,
                mailto: 25
            };
        return c.prototype = {
            setPath: function(a) {
                var b = this;
                a = /^(.*?)\/?(\w+)?$/.exec(a), b.path = a[0], b.directory = a[1], b.file = a[2], b.source = "", b.getURI()
            },
            toRelative: function(a) {
                var b, d = this;
                if ("./" === a) return a;
                if (a = new c(a, {
                        base_uri: d
                    }), "mce_host" != a.host && d.host != a.host && a.host || d.port != a.port || d.protocol != a.protocol && "" !== a.protocol) return a.getURI();
                var e = d.getURI(),
                    f = a.getURI();
                return e == f || "/" == e.charAt(e.length - 1) && e.substr(0, e.length - 1) == f ? e : (b = d.toRelPath(d.path, a.path), a.query && (b += "?" + a.query), a.anchor && (b += "#" + a.anchor), b)
            },
            toAbsolute: function(a, b) {
                return a = new c(a, {
                    base_uri: this
                }), a.getURI(b && this.isSameOrigin(a))
            },
            isSameOrigin: function(a) {
                if (this.host == a.host && this.protocol == a.protocol) {
                    if (this.port == a.port) return !0;
                    var b = g[this.protocol];
                    if (b && (this.port || b) == (a.port || b)) return !0
                }
                return !1
            },
            toRelPath: function(a, b) {
                var c, d, e, f = 0,
                    g = "";
                if (a = a.substring(0, a.lastIndexOf("/")), a = a.split("/"), c = b.split("/"), a.length >= c.length)
                    for (d = 0, e = a.length; d < e; d++)
                        if (d >= c.length || a[d] != c[d]) {
                            f = d + 1;
                            break
                        }
                if (a.length < c.length)
                    for (d = 0, e = c.length; d < e; d++)
                        if (d >= a.length || a[d] != c[d]) {
                            f = d + 1;
                            break
                        }
                if (1 === f) return b;
                for (d = 0, e = a.length - (f - 1); d < e; d++) g += "../";
                for (d = f - 1, e = c.length; d < e; d++) g += d != f - 1 ? "/" + c[d] : c[d];
                return g
            },
            toAbsPath: function(a, b) {
                var c, e, f, g = 0,
                    h = [];
                for (e = /\/$/.test(b) ? "/" : "", a = a.split("/"), b = b.split("/"),
                    d(a, function(a) {
                        a && h.push(a)
                    }), a = h, c = b.length - 1, h = []; c >= 0; c--) 0 !== b[c].length && "." !== b[c] && (".." !== b[c] ? g > 0 ? g-- : h.push(b[c]) : g++);
                return c = a.length - g, f = c <= 0 ? h.reverse().join("/") : a.slice(0, c).join("/") + "/" + h.reverse().join("/"), 0 !== f.indexOf("/") && (f = "/" + f), e && f.lastIndexOf("/") !== f.length - 1 && (f += e), f
            },
            getURI: function(a) {
                var b, c = this;
                return c.source && !a || (b = "", a || (b += c.protocol ? c.protocol + "://" : "//", c.userInfo && (b += c.userInfo + "@"), c.host && (b += c.host), c.port && (b += ":" + c.port)), c.path && (b += c.path), c.query && (b += "?" + c.query), c.anchor && (b += "#" + c.anchor), c.source = b), c.source
            }
        }, c.parseDataUri = function(a) {
            var b, c;
            return a = decodeURIComponent(a).split(","), c = /data:([^;]+)/.exec(a[0]), c && (b = c[1]), {
                type: b,
                data: a[1]
            }
        }, c.getDocumentBaseUrl = function(a) {
            var b;
            return b = 0 !== a.protocol.indexOf("http") && "file:" !== a.protocol ? a.href : a.protocol + "//" + a.host + a.pathname, /^[^:]+:\/\/\/?[^\/]+\//.test(b) && (b = b.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, ""), /[\/\\]$/.test(b) || (b += "/")), b
        }, c
    }), g("x", ["9"], function(a) {
        function b() {}
        var c, d, e = a.each,
            f = a.extend;
        return b.extend = c = function(a) {
            function b() {
                var a, b, c, e = this;
                if (!d && (e.init && e.init.apply(e, arguments), b = e.Mixins))
                    for (a = b.length; a--;) c = b[a], c.init && c.init.apply(e, arguments)
            }

            function g() {
                return this
            }

            function h(a, b) {
                return function() {
                    var c, d = this,
                        e = d._super;
                    return d._super = m[a], c = b.apply(d, arguments), d._super = e, c
                }
            }
            var i, j, k, l = this,
                m = l.prototype;
            d = !0, i = new l, d = !1, a.Mixins && (e(a.Mixins, function(b) {
                for (var c in b) "init" !== c && (a[c] = b[c])
            }), m.Mixins && (a.Mixins = m.Mixins.concat(a.Mixins))), a.Methods && e(a.Methods.split(","), function(b) {
                a[b] = g
            }), a.Properties && e(a.Properties.split(","), function(b) {
                var c = "_" + b;
                a[b] = function(a) {
                    var b, d = this;
                    return a !== b ? (d[c] = a, d) : d[c]
                }
            }), a.Statics && e(a.Statics, function(a, c) {
                b[c] = a
            }), a.Defaults && m.Defaults && (a.Defaults = f({}, m.Defaults, a.Defaults));
            for (j in a) k = a[j], "function" == typeof k && m[j] ? i[j] = h(j, k) : i[j] = k;
            return b.prototype = i, b.constructor = b, b.extend = c, b
        }, b
    }), g("y", ["9"], function(a) {
        function b(b) {
            function c() {
                return !1
            }

            function d() {
                return !0
            }

            function e(a, e) {
                var f, h, i, k;
                if (a = a.toLowerCase(), e = e || {}, e.type = a, e.target || (e.target = j), e.preventDefault || (e.preventDefault = function() {
                        e.isDefaultPrevented = d
                    }, e.stopPropagation = function() {
                        e.isPropagationStopped = d
                    }, e.stopImmediatePropagation = function() {
                        e.isImmediatePropagationStopped = d
                    }, e.isDefaultPrevented = c, e.isPropagationStopped = c, e.isImmediatePropagationStopped = c), b.beforeFire && b.beforeFire(e), f = m[a])
                    for (h = 0, i = f.length; h < i; h++) {
                        if (k = f[h], k.once && g(a, k.func), e.isImmediatePropagationStopped()) return e.stopPropagation(), e;
                        if (k.func.call(j, e) === !1) return e.preventDefault(), e
                    }
                return e
            }

            function f(b, d, e, f) {
                var g, h, i;
                if (d === !1 && (d = c), d)
                    for (d = {
                            func: d
                        }, f && a.extend(d, f), h = b.toLowerCase().split(" "), i = h.length; i--;) b = h[i], g = m[b], g || (g = m[b] = [], k(b, !0)), e ? g.unshift(d) : g.push(d);
                return l
            }

            function g(a, b) {
                var c, d, e, f, g;
                if (a)
                    for (f = a.toLowerCase().split(" "), c = f.length; c--;) {
                        if (a = f[c], d = m[a], !a) {
                            for (e in m) k(e, !1), delete m[e];
                            return l
                        }
                        if (d) {
                            if (b)
                                for (g = d.length; g--;) d[g].func === b && (d = d.slice(0, g).concat(d.slice(g + 1)), m[a] = d);
                            else d.length = 0;
                            d.length || (k(a, !1), delete m[a])
                        }
                    } else {
                        for (a in m) k(a, !1);
                        m = {}
                    }
                return l
            }

            function h(a, b, c) {
                return f(a, b, c, {
                    once: !0
                })
            }

            function i(a) {
                return a = a.toLowerCase(), !(!m[a] || 0 === m[a].length)
            }
            var j, k, l = this,
                m = {};
            b = b || {}, j = b.scope || l, k = b.toggleEvent || c, l.fire = e, l.on = f, l.off = g, l.once = h, l.has = i
        }
        var c = a.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchmove touchend", " ");
        return b.isNative = function(a) {
            return !!c[a.toLowerCase()]
        }, b
    }), g("z", ["y"], function(a) {
        function b(b) {
            return b._eventDispatcher || (b._eventDispatcher = new a({
                scope: b,
                toggleEvent: function(c, d) {
                    a.isNative(c) && b.toggleNativeEvent && b.toggleNativeEvent(c, d)
                }
            })), b._eventDispatcher
        }
        return {
            fire: function(a, c, d) {
                var e = this;
                if (e.removed && "remove" !== a) return c;
                if (c = b(e).fire(a, c, d), d !== !1 && e.parent)
                    for (var f = e.parent(); f && !c.isPropagationStopped();) f.fire(a, c, !1), f = f.parent();
                return c
            },
            on: function(a, c, d) {
                return b(this).on(a, c, d)
            },
            off: function(a, c) {
                return b(this).off(a, c)
            },
            once: function(a, c) {
                return b(this).once(a, c)
            },
            hasEventListeners: function(a) {
                return b(this).has(a)
            }
        }
    }), g("5q", [], function() {
        function a(a) {
            this.create = a.create
        }
        return a.create = function(b, c) {
            return new a({
                create: function(a, d) {
                    function e(b) {
                        a.set(d, b.value)
                    }

                    function f(a) {
                        b.set(c, a.value)
                    }
                    var g;
                    return a.on("change:" + d, f), b.on("change:" + c, e), g = a._bindings, g || (g = a._bindings = [], a.on("destroy", function() {
                        for (var a = g.length; a--;) g[a]()
                    })), g.push(function() {
                        b.off("change:" + c, e)
                    }), b.get(c)
                }
            })
        }, a
    }), g("4p", ["5q", "x", "z", "9"], function(a, b, c, d) {
        function e(a) {
            return a.nodeType > 0
        }

        function f(a, b) {
            var c, g;
            if (a === b) return !0;
            if (null === a || null === b) return a === b;
            if ("object" != typeof a || "object" != typeof b) return a === b;
            if (d.isArray(b)) {
                if (a.length !== b.length) return !1;
                for (c = a.length; c--;)
                    if (!f(a[c], b[c])) return !1
            }
            if (e(a) || e(b)) return a === b;
            g = {};
            for (c in b) {
                if (!f(a[c], b[c])) return !1;
                g[c] = !0
            }
            for (c in a)
                if (!g[c] && !f(a[c], b[c])) return !1;
            return !0
        }
        return b.extend({
            Mixins: [c],
            init: function(b) {
                var c, d;
                b = b || {};
                for (c in b) d = b[c], d instanceof a && (b[c] = d.create(this, c));
                this.data = b
            },
            set: function(b, c) {
                var d, e, g = this.data[b];
                if (c instanceof a && (c = c.create(this, b)), "object" == typeof b) {
                    for (d in b) this.set(d, b[d]);
                    return this
                }
                return f(g, c) || (this.data[b] = c, e = {
                    target: this,
                    name: b,
                    value: c,
                    oldValue: g
                }, this.fire("change:" + b, e), this.fire("change", e)), this
            },
            get: function(a) {
                return this.data[a]
            },
            has: function(a) {
                return a in this.data
            },
            bind: function(b) {
                return a.create(this, b)
            },
            destroy: function() {
                this.fire("destroy")
            }
        })
    }), g("2d", ["x"], function(a) {
        "use strict";

        function b(a) {
            for (var b, c = [], d = a.length; d--;) b = a[d], b.__checked || (c.push(b), b.__checked = 1);
            for (d = c.length; d--;) delete c[d].__checked;
            return c
        }
        var c, d = /^([\w\\*]+)?(?:#([\w\-\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i,
            e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            f = /^\s*|\s*$/g,
            g = a.extend({
                init: function(a) {
                    function b(a) {
                        if (a) return a = a.toLowerCase(),
                            function(b) {
                                return "*" === a || b.type === a
                            }
                    }

                    function c(a) {
                        if (a) return function(b) {
                            return b._name === a
                        }
                    }

                    function g(a) {
                        if (a) return a = a.split("."),
                            function(b) {
                                for (var c = a.length; c--;)
                                    if (!b.classes.contains(a[c])) return !1;
                                return !0
                            }
                    }

                    function h(a, b, c) {
                        if (a) return function(d) {
                            var e = d[a] ? d[a]() : "";
                            return b ? "=" === b ? e === c : "*=" === b ? e.indexOf(c) >= 0 : "~=" === b ? (" " + e + " ").indexOf(" " + c + " ") >= 0 : "!=" === b ? e != c : "^=" === b ? 0 === e.indexOf(c) : "$=" === b && e.substr(e.length - c.length) === c : !!c
                        }
                    }

                    function i(a) {
                        var b;
                        if (a) return a = /(?:not\((.+)\))|(.+)/i.exec(a), a[1] ? (b = k(a[1], []), function(a) {
                            return !l(a, b)
                        }) : (a = a[2], function(b, c, d) {
                            return "first" === a ? 0 === c : "last" === a ? c === d - 1 : "even" === a ? c % 2 === 0 : "odd" === a ? c % 2 === 1 : !!b[a] && b[a]()
                        })
                    }

                    function j(a, e, j) {
                        function k(a) {
                            a && e.push(a)
                        }
                        var l;
                        return l = d.exec(a.replace(f, "")), k(b(l[1])), k(c(l[2])), k(g(l[3])), k(h(l[4], l[5], l[6])), k(i(l[7])), e.pseudo = !!l[7], e.direct = j, e
                    }

                    function k(a, b) {
                        var c, d, f, g = [];
                        do
                            if (e.exec(""), d = e.exec(a), d && (a = d[3], g.push(d[1]), d[2])) {
                                c = d[3];
                                break
                            }
                        while (d);
                        for (c && k(c, b), a = [], f = 0; f < g.length; f++) ">" != g[f] && a.push(j(g[f], [], ">" === g[f - 1]));
                        return b.push(a), b
                    }
                    var l = this.match;
                    this._selectors = k(a, [])
                },
                match: function(a, b) {
                    var c, d, e, f, g, h, i, j, k, l, m, n, o;
                    for (b = b || this._selectors, c = 0, d = b.length; c < d; c++) {
                        for (g = b[c], f = g.length, o = a, n = 0, e = f - 1; e >= 0; e--)
                            for (j = g[e]; o;) {
                                if (j.pseudo)
                                    for (m = o.parent().items(), k = l = m.length; k-- && m[k] !== o;);
                                for (h = 0, i = j.length; h < i; h++)
                                    if (!j[h](o, k, l)) {
                                        h = i + 1;
                                        break
                                    }
                                if (h === i) {
                                    n++;
                                    break
                                }
                                if (e === f - 1) break;
                                o = o.parent()
                            }
                        if (n === f) return !0
                    }
                    return !1
                },
                find: function(a) {
                    function d(a, b, c) {
                        var e, f, g, i, j, k = b[c];
                        for (e = 0, f = a.length; e < f; e++) {
                            for (j = a[e], g = 0, i = k.length; g < i; g++)
                                if (!k[g](j, e, f)) {
                                    g = i + 1;
                                    break
                                }
                            if (g === i) c == b.length - 1 ? h.push(j) : j.items && d(j.items(), b, c + 1);
                            else if (k.direct) return;
                            j.items && d(j.items(), b, c)
                        }
                    }
                    var e, f, h = [],
                        i = this._selectors;
                    if (a.items) {
                        for (e = 0, f = i.length; e < f; e++) d(a.items(), i[e], 0);
                        f > 1 && (h = b(h))
                    }
                    return c || (c = g.Collection), new c(h)
                }
            });
        return g
    }), g("2e", ["9", "2d", "x"], function(a, b, c) {
        "use strict";
        var d, e, f = Array.prototype.push,
            g = Array.prototype.slice;
        return e = {
            length: 0,
            init: function(a) {
                a && this.add(a)
            },
            add: function(b) {
                var c = this;
                return a.isArray(b) ? f.apply(c, b) : b instanceof d ? c.add(b.toArray()) : f.call(c, b), c
            },
            set: function(a) {
                var b, c = this,
                    d = c.length;
                for (c.length = 0, c.add(a), b = c.length; b < d; b++) delete c[b];
                return c
            },
            filter: function(a) {
                var c, e, f, g, h = this,
                    i = [];
                for ("string" == typeof a ? (a = new b(a), g = function(b) {
                        return a.match(b)
                    }) : g = a, c = 0, e = h.length; c < e; c++) f = h[c], g(f) && i.push(f);
                return new d(i)
            },
            slice: function() {
                return new d(g.apply(this, arguments))
            },
            eq: function(a) {
                return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
            },
            each: function(b) {
                return a.each(this, b), this
            },
            toArray: function() {
                return a.toArray(this)
            },
            indexOf: function(a) {
                for (var b = this, c = b.length; c-- && b[c] !== a;);
                return c
            },
            reverse: function() {
                return new d(a.toArray(this).reverse())
            },
            hasClass: function(a) {
                return !!this[0] && this[0].classes.contains(a)
            },
            prop: function(a, b) {
                var c, d, e = this;
                return b !== c ? (e.each(function(c) {
                    c[a] && c[a](b)
                }), e) : (d = e[0], d && d[a] ? d[a]() : void 0)
            },
            exec: function(b) {
                var c = this,
                    d = a.toArray(arguments).slice(1);
                return c.each(function(a) {
                    a[b] && a[b].apply(a, d)
                }), c
            },
            remove: function() {
                for (var a = this.length; a--;) this[a].remove();
                return this
            },
            addClass: function(a) {
                return this.each(function(b) {
                    b.classes.add(a)
                })
            },
            removeClass: function(a) {
                return this.each(function(b) {
                    b.classes.remove(a)
                })
            }
        }, a.each("fire on off show hide append prepend before after reflow".split(" "), function(b) {
            e[b] = function() {
                var c = a.toArray(arguments);
                return this.each(function(a) {
                    b in a && a[b].apply(a, c)
                }), this
            }
        }), a.each("text name disabled active selected checked visible parent value data".split(" "), function(a) {
            e[a] = function(b) {
                return this.prop(a, b)
            }
        }), d = c.extend(e), b.Collection = d, d
    }), g("4q", ["6", "9", "e"], function(a, b, c) {
        "use strict";
        var d = 0,
            e = {
                id: function() {
                    return "mceu_" + d++
                },
                create: function(a, d, e) {
                    var f = document.createElement(a);
                    return c.DOM.setAttribs(f, d), "string" == typeof e ? f.innerHTML = e : b.each(e, function(a) {
                        a.nodeType && f.appendChild(a)
                    }), f
                },
                createFragment: function(a) {
                    return c.DOM.createFragment(a)
                },
                getWindowSize: function() {
                    return c.DOM.getViewPort()
                },
                getSize: function(a) {
                    var b, c;
                    if (a.getBoundingClientRect) {
                        var d = a.getBoundingClientRect();
                        b = Math.max(d.width || d.right - d.left, a.offsetWidth), c = Math.max(d.height || d.bottom - d.bottom, a.offsetHeight)
                    } else b = a.offsetWidth, c = a.offsetHeight;
                    return {
                        width: b,
                        height: c
                    }
                },
                getPos: function(a, b) {
                    return c.DOM.getPos(a, b || e.getContainer())
                },
                getContainer: function() {
                    return a.container ? a.container : document.body
                },
                getViewPort: function(a) {
                    return c.DOM.getViewPort(a)
                },
                get: function(a) {
                    return document.getElementById(a)
                },
                addClass: function(a, b) {
                    return c.DOM.addClass(a, b)
                },
                removeClass: function(a, b) {
                    return c.DOM.removeClass(a, b)
                },
                hasClass: function(a, b) {
                    return c.DOM.hasClass(a, b)
                },
                toggleClass: function(a, b, d) {
                    return c.DOM.toggleClass(a, b, d)
                },
                css: function(a, b, d) {
                    return c.DOM.setStyle(a, b, d)
                },
                getRuntimeStyle: function(a, b) {
                    return c.DOM.getStyle(a, b, !0)
                },
                on: function(a, b, d, e) {
                    return c.DOM.bind(a, b, d, e)
                },
                off: function(a, b, d) {
                    return c.DOM.unbind(a, b, d)
                },
                fire: function(a, b, d) {
                    return c.DOM.fire(a, b, d)
                },
                innerHtml: function(a, b) {
                    c.DOM.setHTML(a, b)
                }
            };
        return e
    }), g("4r", [], function() {
        "use strict";
        return {
            parseBox: function(a) {
                var b, c = 10;
                if (a) return "number" == typeof a ? (a = a || 0, {
                    top: a,
                    left: a,
                    bottom: a,
                    right: a
                }) : (a = a.split(" "), b = a.length, 1 === b ? a[1] = a[2] = a[3] = a[0] : 2 === b ? (a[2] = a[0], a[3] = a[1]) : 3 === b && (a[3] = a[1]), {
                    top: parseInt(a[0], c) || 0,
                    right: parseInt(a[1], c) || 0,
                    bottom: parseInt(a[2], c) || 0,
                    left: parseInt(a[3], c) || 0
                })
            },
            measureBox: function(a, b) {
                function c(b) {
                    var c = document.defaultView;
                    return c ? (b = b.replace(/[A-Z]/g, function(a) {
                        return "-" + a
                    }), c.getComputedStyle(a, null).getPropertyValue(b)) : a.currentStyle[b]
                }

                function d(a) {
                    var b = parseFloat(c(a), 10);
                    return isNaN(b) ? 0 : b
                }
                return {
                    top: d(b + "TopWidth"),
                    right: d(b + "RightWidth"),
                    bottom: d(b + "BottomWidth"),
                    left: d(b + "LeftWidth")
                }
            }
        }
    }), g("4s", ["9"], function(a) {
        "use strict";

        function b() {}

        function c(a) {
            this.cls = [], this.cls._map = {}, this.onchange = a || b, this.prefix = ""
        }
        return a.extend(c.prototype, {
            add: function(a) {
                return a && !this.contains(a) && (this.cls._map[a] = !0, this.cls.push(a), this._change()), this
            },
            remove: function(a) {
                if (this.contains(a)) {
                    for (var b = 0; b < this.cls.length && this.cls[b] !== a; b++);
                    this.cls.splice(b, 1), delete this.cls._map[a], this._change()
                }
                return this
            },
            toggle: function(a, b) {
                var c = this.contains(a);
                return c !== b && (c ? this.remove(a) : this.add(a), this._change()), this
            },
            contains: function(a) {
                return !!this.cls._map[a]
            },
            _change: function() {
                delete this.clsValue, this.onchange.call(this)
            }
        }), c.prototype.toString = function() {
            var a;
            if (this.clsValue) return this.clsValue;
            a = "";
            for (var b = 0; b < this.cls.length; b++) b > 0 && (a += " "), a += this.prefix + this.cls[b];
            return a
        }, c
    }), g("2f", ["5"], function(a) {
        var b, c = {};
        return {
            add: function(d) {
                var e = d.parent();
                if (e) {
                    if (!e._layout || e._layout.isNative()) return;
                    c[e._id] || (c[e._id] = e), b || (b = !0, a.requestAnimationFrame(function() {
                        var a, d;
                        b = !1;
                        for (a in c) d = c[a], d.state.get("rendered") && d.reflow();
                        c = {}
                    }, document.body))
                }
            },
            remove: function(a) {
                c[a._id] && delete c[a._id]
            }
        }
    }), g("2g", ["x", "9", "y", "4p", "2e", "4q", "a", "4r", "4s", "2f"], function(a, b, c, d, e, f, g, h, i, j) {
        "use strict";

        function k(a) {
            return a._eventDispatcher || (a._eventDispatcher = new c({
                scope: a,
                toggleEvent: function(b, d) {
                    d && c.isNative(b) && (a._nativeEvents || (a._nativeEvents = {}), a._nativeEvents[b] = !0, a.state.get("rendered") && l(a))
                }
            })), a._eventDispatcher
        }

        function l(a) {
            function b(b) {
                var c = a.getParentCtrl(b.target);
                c && c.fire(b.type, b)
            }

            function c() {
                var a = j._lastHoverCtrl;
                a && (a.fire("mouseleave", {
                    target: a.getEl()
                }), a.parents().each(function(a) {
                    a.fire("mouseleave", {
                        target: a.getEl()
                    })
                }), j._lastHoverCtrl = null)
            }

            function d(b) {
                var c, d, e, f = a.getParentCtrl(b.target),
                    g = j._lastHoverCtrl,
                    h = 0;
                if (f !== g) {
                    if (j._lastHoverCtrl = f, d = f.parents().toArray().reverse(), d.push(f), g) {
                        for (e = g.parents().toArray().reverse(), e.push(g), h = 0; h < e.length && d[h] === e[h]; h++);
                        for (c = e.length - 1; c >= h; c--) g = e[c], g.fire("mouseleave", {
                            target: g.getEl()
                        })
                    }
                    for (c = h; c < d.length; c++) f = d[c], f.fire("mouseenter", {
                        target: f.getEl()
                    })
                }
            }

            function e(b) {
                b.preventDefault(), "mousewheel" == b.type ? (b.deltaY = -.025 * b.wheelDelta, b.wheelDeltaX && (b.deltaX = -.025 * b.wheelDeltaX)) : (b.deltaX = 0, b.deltaY = b.detail), b = a.fire("wheel", b)
            }
            var f, h, i, j, k, l;
            if (k = a._nativeEvents) {
                for (i = a.parents().toArray(), i.unshift(a), f = 0, h = i.length; !j && f < h; f++) j = i[f]._eventsRoot;
                for (j || (j = i[i.length - 1] || a), a._eventsRoot = j, h = f, f = 0; f < h; f++) i[f]._eventsRoot = j;
                var m = j._delegates;
                m || (m = j._delegates = {});
                for (l in k) {
                    if (!k) return !1;
                    "wheel" !== l || o ? ("mouseenter" === l || "mouseleave" === l ? j._hasMouseEnter || (g(j.getEl()).on("mouseleave", c).on("mouseover", d), j._hasMouseEnter = 1) : m[l] || (g(j.getEl()).on(l, b), m[l] = !0), k[l] = !1) : n ? g(a.getEl()).on("mousewheel", e) : g(a.getEl()).on("DOMMouseScroll", e)
                }
            }
        }
        var m, n = "onmousewheel" in document,
            o = !1,
            p = "mce-",
            q = 0,
            r = {
                Statics: {
                    classPrefix: p
                },
                isRtl: function() {
                    return m.rtl
                },
                classPrefix: p,
                init: function(a) {
                    function c(a) {
                        var b;
                        for (a = a.split(" "), b = 0; b < a.length; b++) j.classes.add(a[b])
                    }
                    var e, f, j = this;
                    j.settings = a = b.extend({}, j.Defaults, a), j._id = a.id || "mceu_" + q++, j._aria = {
                        role: a.role
                    }, j._elmCache = {}, j.$ = g, j.state = new d({
                        visible: !0,
                        active: !1,
                        disabled: !1,
                        value: ""
                    }), j.data = new d(a.data), j.classes = new i(function() {
                        j.state.get("rendered") && (j.getEl().className = this.toString())
                    }), j.classes.prefix = j.classPrefix, e = a.classes, e && (j.Defaults && (f = j.Defaults.classes, f && e != f && c(f)), c(e)), b.each("title text name visible disabled active value".split(" "), function(b) {
                        b in a && j[b](a[b])
                    }), j.on("click", function() {
                        if (j.disabled()) return !1
                    }), j.settings = a, j.borderBox = h.parseBox(a.border), j.paddingBox = h.parseBox(a.padding), j.marginBox = h.parseBox(a.margin), a.hidden && j.hide()
                },
                Properties: "parent,name",
                getContainerElm: function() {
                    return f.getContainer()
                },
                getParentCtrl: function(a) {
                    for (var b, c = this.getRoot().controlIdLookup; a && c && !(b = c[a.id]);) a = a.parentNode;
                    return b
                },
                initLayoutRect: function() {
                    var a, b, c, d, e, g, i, j, k, l, m = this,
                        n = m.settings,
                        o = m.getEl();
                    a = m.borderBox = m.borderBox || h.measureBox(o, "border"), m.paddingBox = m.paddingBox || h.measureBox(o, "padding"), m.marginBox = m.marginBox || h.measureBox(o, "margin"), l = f.getSize(o), j = n.minWidth, k = n.minHeight, e = j || l.width, g = k || l.height, c = n.width, d = n.height, i = n.autoResize, i = "undefined" != typeof i ? i : !c && !d, c = c || e, d = d || g;
                    var p = a.left + a.right,
                        q = a.top + a.bottom,
                        r = n.maxWidth || 65535,
                        s = n.maxHeight || 65535;
                    return m._layoutRect = b = {
                        x: n.x || 0,
                        y: n.y || 0,
                        w: c,
                        h: d,
                        deltaW: p,
                        deltaH: q,
                        contentW: c - p,
                        contentH: d - q,
                        innerW: c - p,
                        innerH: d - q,
                        startMinWidth: j || 0,
                        startMinHeight: k || 0,
                        minW: Math.min(e, r),
                        minH: Math.min(g, s),
                        maxW: r,
                        maxH: s,
                        autoResize: i,
                        scrollW: 0
                    }, m._lastLayoutRect = {}, b
                },
                layoutRect: function(a) {
                    var b, c, d, e, f, g, h = this,
                        i = h._layoutRect;
                    return i || (i = h.initLayoutRect()), a ? (d = i.deltaW, e = i.deltaH, a.x !== f && (i.x = a.x), a.y !== f && (i.y = a.y), a.minW !== f && (i.minW = a.minW), a.minH !== f && (i.minH = a.minH), c = a.w, c !== f && (c = c < i.minW ? i.minW : c, c = c > i.maxW ? i.maxW : c, i.w = c, i.innerW = c - d), c = a.h, c !== f && (c = c < i.minH ? i.minH : c, c = c > i.maxH ? i.maxH : c, i.h = c, i.innerH = c - e), c = a.innerW, c !== f && (c = c < i.minW - d ? i.minW - d : c, c = c > i.maxW - d ? i.maxW - d : c, i.innerW = c, i.w = c + d), c = a.innerH, c !== f && (c = c < i.minH - e ? i.minH - e : c, c = c > i.maxH - e ? i.maxH - e : c, i.innerH = c, i.h = c + e), a.contentW !== f && (i.contentW = a.contentW), a.contentH !== f && (i.contentH = a.contentH), b = h._lastLayoutRect, b.x === i.x && b.y === i.y && b.w === i.w && b.h === i.h || (g = m.repaintControls, g && g.map && !g.map[h._id] && (g.push(h), g.map[h._id] = !0), b.x = i.x, b.y = i.y, b.w = i.w, b.h = i.h), h) : i
                },
                repaint: function() {
                    var a, b, c, d, e, f, g, h, i, j, k = this;
                    i = document.createRange ? function(a) {
                        return a
                    } : Math.round, a = k.getEl().style, d = k._layoutRect, h = k._lastRepaintRect || {}, e = k.borderBox, f = e.left + e.right, g = e.top + e.bottom, d.x !== h.x && (a.left = i(d.x) + "px", h.x = d.x), d.y !== h.y && (a.top = i(d.y) + "px", h.y = d.y), d.w !== h.w && (j = i(d.w - f), a.width = (j >= 0 ? j : 0) + "px", h.w = d.w), d.h !== h.h && (j = i(d.h - g), a.height = (j >= 0 ? j : 0) + "px", h.h = d.h), k._hasBody && d.innerW !== h.innerW && (j = i(d.innerW), c = k.getEl("body"), c && (b = c.style, b.width = (j >= 0 ? j : 0) + "px"), h.innerW = d.innerW), k._hasBody && d.innerH !== h.innerH && (j = i(d.innerH), c = c || k.getEl("body"), c && (b = b || c.style, b.height = (j >= 0 ? j : 0) + "px"), h.innerH = d.innerH), k._lastRepaintRect = h, k.fire("repaint", {}, !1)
                },
                updateLayoutRect: function() {
                    var a = this;
                    a.parent()._lastRect = null, f.css(a.getEl(), {
                        width: "",
                        height: ""
                    }), a._layoutRect = a._lastRepaintRect = a._lastLayoutRect = null, a.initLayoutRect()
                },
                on: function(a, b) {
                    function c(a) {
                        var b, c;
                        return "string" != typeof a ? a : function(e) {
                            return b || d.parentsAndSelf().each(function(d) {
                                var e = d.settings.callbacks;
                                if (e && (b = e[a])) return c = d, !1
                            }), b ? b.call(c, e) : (e.action = a, void this.fire("execute", e))
                        }
                    }
                    var d = this;
                    return k(d).on(a, c(b)), d
                },
                off: function(a, b) {
                    return k(this).off(a, b), this
                },
                fire: function(a, b, c) {
                    var d = this;
                    if (b = b || {}, b.control || (b.control = d), b = k(d).fire(a, b), c !== !1 && d.parent)
                        for (var e = d.parent(); e && !b.isPropagationStopped();) e.fire(a, b, !1), e = e.parent();
                    return b
                },
                hasEventListeners: function(a) {
                    return k(this).has(a)
                },
                parents: function(a) {
                    var b, c = this,
                        d = new e;
                    for (b = c.parent(); b; b = b.parent()) d.add(b);
                    return a && (d = d.filter(a)), d
                },
                parentsAndSelf: function(a) {
                    return new e(this).add(this.parents(a))
                },
                next: function() {
                    var a = this.parent().items();
                    return a[a.indexOf(this) + 1]
                },
                prev: function() {
                    var a = this.parent().items();
                    return a[a.indexOf(this) - 1]
                },
                innerHtml: function(a) {
                    return this.$el.html(a), this
                },
                getEl: function(a) {
                    var b = a ? this._id + "-" + a : this._id;
                    return this._elmCache[b] || (this._elmCache[b] = g("#" + b)[0]), this._elmCache[b]
                },
                show: function() {
                    return this.visible(!0)
                },
                hide: function() {
                    return this.visible(!1)
                },
                focus: function() {
                    try {
                        this.getEl().focus()
                    } catch (a) {}
                    return this
                },
                blur: function() {
                    return this.getEl().blur(), this
                },
                aria: function(a, b) {
                    var c = this,
                        d = c.getEl(c.ariaTarget);
                    return "undefined" == typeof b ? c._aria[a] : (c._aria[a] = b, c.state.get("rendered") && d.setAttribute("role" == a ? a : "aria-" + a, b), c)
                },
                encode: function(a, b) {
                    return b !== !1 && (a = this.translate(a)), (a || "").replace(/[&<>"]/g, function(a) {
                        return "&#" + a.charCodeAt(0) + ";"
                    })
                },
                translate: function(a) {
                    return m.translate ? m.translate(a) : a
                },
                before: function(a) {
                    var b = this,
                        c = b.parent();
                    return c && c.insert(a, c.items().indexOf(b), !0), b
                },
                after: function(a) {
                    var b = this,
                        c = b.parent();
                    return c && c.insert(a, c.items().indexOf(b)), b
                },
                remove: function() {
                    var a, b, c = this,
                        d = c.getEl(),
                        e = c.parent();
                    if (c.items) {
                        var f = c.items().toArray();
                        for (b = f.length; b--;) f[b].remove()
                    }
                    e && e.items && (a = [], e.items().each(function(b) {
                        b !== c && a.push(b)
                    }), e.items().set(a), e._lastRect = null), c._eventsRoot && c._eventsRoot == c && g(d).off();
                    var h = c.getRoot().controlIdLookup;
                    return h && delete h[c._id], d && d.parentNode && d.parentNode.removeChild(d), c.state.set("rendered", !1), c.state.destroy(), c.fire("remove"), c
                },
                renderBefore: function(a) {
                    return g(a).before(this.renderHtml()), this.postRender(), this
                },
                renderTo: function(a) {
                    return g(a || this.getContainerElm()).append(this.renderHtml()), this.postRender(), this
                },
                preRender: function() {},
                render: function() {},
                renderHtml: function() {
                    return '<div id="' + this._id + '" class="' + this.classes + '"></div>'
                },
                postRender: function() {
                    var a, b, c, d, e, f = this,
                        h = f.settings;
                    f.$el = g(f.getEl()), f.state.set("rendered", !0);
                    for (d in h) 0 === d.indexOf("on") && f.on(d.substr(2), h[d]);
                    if (f._eventsRoot) {
                        for (c = f.parent(); !e && c; c = c.parent()) e = c._eventsRoot;
                        if (e)
                            for (d in e._nativeEvents) f._nativeEvents[d] = !0
                    }
                    l(f), h.style && (a = f.getEl(), a && (a.setAttribute("style", h.style), a.style.cssText = h.style)), f.settings.border && (b = f.borderBox, f.$el.css({
                        "border-top-width": b.top,
                        "border-right-width": b.right,
                        "border-bottom-width": b.bottom,
                        "border-left-width": b.left
                    }));
                    var i = f.getRoot();
                    i.controlIdLookup || (i.controlIdLookup = {}), i.controlIdLookup[f._id] = f;
                    for (var k in f._aria) f.aria(k, f._aria[k]);
                    f.state.get("visible") === !1 && (f.getEl().style.display = "none"), f.bindStates(), f.state.on("change:visible", function(a) {
                        var b, c = a.value;
                        f.state.get("rendered") && (f.getEl().style.display = c === !1 ? "none" : "", f.getEl().getBoundingClientRect()), b = f.parent(), b && (b._lastRect = null), f.fire(c ? "show" : "hide"), j.add(f)
                    }), f.fire("postrender", {}, !1)
                },
                bindStates: function() {},
                scrollIntoView: function(a) {
                    function b(a, b) {
                        var c, d, e = a;
                        for (c = d = 0; e && e != b && e.nodeType;) c += e.offsetLeft || 0, d += e.offsetTop || 0, e = e.offsetParent;
                        return {
                            x: c,
                            y: d
                        }
                    }
                    var c, d, e, f, g, h, i = this.getEl(),
                        j = i.parentNode,
                        k = b(i, j);
                    return c = k.x, d = k.y, e = i.offsetWidth, f = i.offsetHeight, g = j.clientWidth, h = j.clientHeight, "end" == a ? (c -= g - e, d -= h - f) : "center" == a && (c -= g / 2 - e / 2, d -= h / 2 - f / 2), j.scrollLeft = c, j.scrollTop = d, this
                },
                getRoot: function() {
                    for (var a, b = this, c = []; b;) {
                        if (b.rootControl) {
                            a = b.rootControl;
                            break
                        }
                        c.push(b), a = b, b = b.parent()
                    }
                    a || (a = this);
                    for (var d = c.length; d--;) c[d].rootControl = a;
                    return a
                },
                reflow: function() {
                    j.remove(this);
                    var a = this.parent();
                    return a && a._layout && !a._layout.isNative() && a.reflow(), this
                }
            };
        return b.each("text title visible disabled active value".split(" "), function(a) {
            r[a] = function(b) {
                return 0 === arguments.length ? this.state.get(a) : ("undefined" != typeof b && this.state.set(a, b), this)
            }
        }), m = a.extend(r)
    }), g("2h", [], function() {
        "use strict";
        var a = {};
        return {
            add: function(b, c) {
                a[b.toLowerCase()] = c
            },
            has: function(b) {
                return !!a[b.toLowerCase()]
            },
            create: function(b, c) {
                var d;
                if ("string" == typeof b ? (c = c || {}, c.type = b) : (c = b, b = c.type), b = b.toLowerCase(), d = a[b], !d) throw new Error("Could not find control by type: " + b);
                return d = new d(c), d.type = b, d
            }
        }
    }), g("2i", [], function() {
        "use strict";
        var a = function(a) {
            return !!a.getAttribute("data-mce-tabstop")
        };
        return function(b) {
            function c(a) {
                return a && 1 === a.nodeType
            }

            function d(a) {
                return a = a || u, c(a) ? a.getAttribute("role") : null
            }

            function e(a) {
                for (var b, c = a || u; c = c.parentNode;)
                    if (b = d(c)) return b
            }

            function f(a) {
                var b = u;
                if (c(b)) return b.getAttribute("aria-" + a)
            }

            function g(a) {
                var b = a.tagName.toUpperCase();
                return "INPUT" == b || "TEXTAREA" == b || "SELECT" == b
            }

            function h(b) {
                return !(!g(b) || b.hidden) || (!!a(b) || !!/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell|slider)$/.test(d(b)))
            }

            function i(a) {
                function b(a) {
                    if (1 == a.nodeType && "none" != a.style.display && !a.disabled) {
                        h(a) && c.push(a);
                        for (var d = 0; d < a.childNodes.length; d++) b(a.childNodes[d])
                    }
                }
                var c = [];
                return b(a || w.getEl()), c
            }

            function j(a) {
                var b, c;
                a = a || v, c = a.parents().toArray(), c.unshift(a);
                for (var d = 0; d < c.length && (b = c[d], !b.settings.ariaRoot); d++);
                return b
            }

            function k(a) {
                var b = j(a),
                    c = i(b.getEl());
                b.settings.ariaRemember && "lastAriaIndex" in b ? l(b.lastAriaIndex, c) : l(0, c)
            }

            function l(a, b) {
                return a < 0 ? a = b.length - 1 : a >= b.length && (a = 0), b[a] && b[a].focus(), a
            }

            function m(a, b) {
                var c = -1,
                    d = j();
                b = b || i(d.getEl());
                for (var e = 0; e < b.length; e++) b[e] === u && (c = e);
                c += a, d.lastAriaIndex = l(c, b)
            }

            function n() {
                var a = e();
                "tablist" == a ? m(-1, i(u.parentNode)) : v.parent().submenu ? s() : m(-1)
            }

            function o() {
                var a = d(),
                    b = e();
                "tablist" == b ? m(1, i(u.parentNode)) : "menuitem" == a && "menu" == b && f("haspopup") ? t() : m(1)
            }

            function p() {
                m(-1)
            }

            function q() {
                var a = d(),
                    b = e();
                "menuitem" == a && "menubar" == b ? t() : "button" == a && f("haspopup") ? t({
                    key: "down"
                }) : m(1)
            }

            function r(a) {
                var b = e();
                if ("tablist" == b) {
                    var c = i(v.getEl("body"))[0];
                    c && c.focus()
                } else m(a.shiftKey ? -1 : 1)
            }

            function s() {
                v.fire("cancel")
            }

            function t(a) {
                a = a || {}, v.fire("click", {
                    target: u,
                    aria: a
                })
            }
            var u, v, w = b.root;
            try {
                u = document.activeElement
            } catch (a) {
                u = document.body
            }
            return v = w.getParentCtrl(u), w.on("keydown", function(b) {
                function c(b, c) {
                    g(u) || a(u) || "slider" !== d(u) && c(b) !== !1 && b.preventDefault()
                }
                if (!b.isDefaultPrevented()) switch (b.keyCode) {
                    case 37:
                        c(b, n);
                        break;
                    case 39:
                        c(b, o);
                        break;
                    case 38:
                        c(b, p);
                        break;
                    case 40:
                        c(b, q);
                        break;
                    case 27:
                        s();
                        break;
                    case 14:
                    case 13:
                    case 32:
                        c(b, t);
                        break;
                    case 9:
                        r(b) !== !1 && b.preventDefault()
                }
            }), w.on("focusin", function(a) {
                u = a.target, v = a.control
            }), {
                focusFirst: k
            }
        }
    }), g("2j", ["2g", "2e", "2d", "2h", "2i", "9", "a", "4s", "2f"], function(a, b, c, d, e, f, g, h, i) {
        "use strict";
        var j = {};
        return a.extend({
            init: function(a) {
                var c = this;
                c._super(a), a = c.settings, a.fixed && c.state.set("fixed", !0), c._items = new b, c.isRtl() && c.classes.add("rtl"), c.bodyClasses = new h(function() {
                    c.state.get("rendered") && (c.getEl("body").className = this.toString())
                }), c.bodyClasses.prefix = c.classPrefix, c.classes.add("container"), c.bodyClasses.add("container-body"), a.containerCls && c.classes.add(a.containerCls), c._layout = d.create((a.layout || "") + "layout"), c.settings.items ? c.add(c.settings.items) : c.add(c.render()), c._hasBody = !0
            },
            items: function() {
                return this._items
            },
            find: function(a) {
                return a = j[a] = j[a] || new c(a), a.find(this)
            },
            add: function(a) {
                var b = this;
                return b.items().add(b.create(a)).parent(b), b
            },
            focus: function(a) {
                var b, c, d, e = this;
                return a && (c = e.keyboardNav || e.parents().eq(-1)[0].keyboardNav) ? void c.focusFirst(e) : (d = e.find("*"), e.statusbar && d.add(e.statusbar.items()), d.each(function(a) {
                    return a.settings.autofocus ? (b = null, !1) : void(a.canFocus && (b = b || a))
                }), b && b.focus(), e)
            },
            replace: function(a, b) {
                for (var c, d = this.items(), e = d.length; e--;)
                    if (d[e] === a) {
                        d[e] = b;
                        break
                    }
                e >= 0 && (c = b.getEl(), c && c.parentNode.removeChild(c), c = a.getEl(), c && c.parentNode.removeChild(c)), b.parent(this)
            },
            create: function(b) {
                var c, e = this,
                    g = [];
                return f.isArray(b) || (b = [b]), f.each(b, function(b) {
                    b && (b instanceof a || ("string" == typeof b && (b = {
                        type: b
                    }), c = f.extend({}, e.settings.defaults, b), b.type = c.type = c.type || b.type || e.settings.defaultType || (c.defaults ? c.defaults.type : null), b = d.create(c)), g.push(b))
                }), g
            },
            renderNew: function() {
                var a = this;
                return a.items().each(function(b, c) {
                    var d;
                    b.parent(a), b.state.get("rendered") || (d = a.getEl("body"), d.hasChildNodes() && c <= d.childNodes.length - 1 ? g(d.childNodes[c]).before(b.renderHtml()) : g(d).append(b.renderHtml()), b.postRender(), i.add(b))
                }), a._layout.applyClasses(a.items().filter(":visible")), a._lastRect = null, a
            },
            append: function(a) {
                return this.add(a).renderNew()
            },
            prepend: function(a) {
                var b = this;
                return b.items().set(b.create(a).concat(b.items().toArray())), b.renderNew()
            },
            insert: function(a, b, c) {
                var d, e, f, g = this;
                return a = g.create(a), d = g.items(), !c && b < d.length - 1 && (b += 1), b >= 0 && b < d.length && (e = d.slice(0, b).toArray(), f = d.slice(b).toArray(), d.set(e.concat(a, f))), g.renderNew()
            },
            fromJSON: function(a) {
                var b = this;
                for (var c in a) b.find("#" + c).value(a[c]);
                return b
            },
            toJSON: function() {
                var a = this,
                    b = {};
                return a.find("*").each(function(a) {
                    var c = a.name(),
                        d = a.value();
                    c && "undefined" != typeof d && (b[c] = d)
                }), b
            },
            renderHtml: function() {
                var a = this,
                    b = a._layout,
                    c = this.settings.role;
                return a.preRender(), b.preRender(a), '<div id="' + a._id + '" class="' + a.classes + '"' + (c ? ' role="' + this.settings.role + '"' : "") + '><div id="' + a._id + '-body" class="' + a.bodyClasses + '">' + (a.settings.html || "") + b.renderHtml(a) + "</div></div>"
            },
            postRender: function() {
                var a, b = this;
                return b.items().exec("postRender"), b._super(), b._layout.postRender(b), b.state.set("rendered", !0), b.settings.style && b.$el.css(b.settings.style), b.settings.border && (a = b.borderBox, b.$el.css({
                    "border-top-width": a.top,
                    "border-right-width": a.right,
                    "border-bottom-width": a.bottom,
                    "border-left-width": a.left
                })), b.parent() || (b.keyboardNav = new e({
                    root: b
                })), b
            },
            initLayoutRect: function() {
                var a = this,
                    b = a._super();
                return a._layout.recalc(a), b
            },
            recalc: function() {
                var a = this,
                    b = a._layoutRect,
                    c = a._lastRect;
                if (!c || c.w != b.w || c.h != b.h) return a._layout.recalc(a), b = a.layoutRect(), a._lastRect = {
                    x: b.x,
                    y: b.y,
                    w: b.w,
                    h: b.h
                }, !0
            },
            reflow: function() {
                var b;
                if (i.remove(this), this.visible()) {
                    for (a.repaintControls = [], a.repaintControls.map = {}, this.recalc(), b = a.repaintControls.length; b--;) a.repaintControls[b].repaint();
                    "flow" !== this.settings.layout && "stack" !== this.settings.layout && this.repaint(), a.repaintControls = []
                }
                return this
            }
        })
    }), g("2k", ["a"], function(a) {
        "use strict";

        function b(a) {
            var b, c, d, e, f, g, h, i, j = Math.max;
            return b = a.documentElement, c = a.body, d = j(b.scrollWidth, c.scrollWidth), e = j(b.clientWidth, c.clientWidth), f = j(b.offsetWidth, c.offsetWidth), g = j(b.scrollHeight, c.scrollHeight), h = j(b.clientHeight, c.clientHeight), i = j(b.offsetHeight, c.offsetHeight), {
                width: d < f ? e : d,
                height: g < i ? h : g
            }
        }

        function c(a) {
            var b, c;
            if (a.changedTouches)
                for (b = "screenX screenY pageX pageY clientX clientY".split(" "), c = 0; c < b.length; c++) a[b[c]] = a.changedTouches[0][b[c]]
        }
        return function(d, e) {
            function f() {
                return n.getElementById(e.handle || d)
            }
            var g, h, i, j, k, l, m, n = e.document || document;
            e = e || {}, i = function(d) {
                var i, o, p = b(n);
                c(d), d.preventDefault(), h = d.button, i = f(), l = d.screenX, m = d.screenY, o = window.getComputedStyle ? window.getComputedStyle(i, null).getPropertyValue("cursor") : i.runtimeStyle.cursor, g = a("<div></div>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: p.width,
                    height: p.height,
                    zIndex: 2147483647,
                    opacity: 1e-4,
                    cursor: o
                }).appendTo(n.body), a(n).on("mousemove touchmove", k).on("mouseup touchend", j), e.start(d)
            }, k = function(a) {
                return c(a), a.button !== h ? j(a) : (a.deltaX = a.screenX - l, a.deltaY = a.screenY - m, a.preventDefault(), void e.drag(a))
            }, j = function(b) {
                c(b), a(n).off("mousemove touchmove", k).off("mouseup touchend", j), g.remove(), e.stop && e.stop(b)
            }, this.destroy = function() {
                a(f()).off()
            }, a(f()).on("mousedown touchstart", i)
        }
    }), g("2l", ["a", "2k"], function(a, b) {
        "use strict";
        return {
            init: function() {
                var a = this;
                a.on("repaint", a.renderScroll)
            },
            renderScroll: function() {
                function c() {
                    function b(b, g, h, i, j, k) {
                        var l, m, n, o, p, q, r, s, t;
                        if (m = e.getEl("scroll" + b)) {
                            if (s = g.toLowerCase(), t = h.toLowerCase(), a(e.getEl("absend")).css(s, e.layoutRect()[i] - 1), !j) return void a(m).css("display", "none");
                            a(m).css("display", "block"), l = e.getEl("body"), n = e.getEl("scroll" + b + "t"), o = l["client" + h] - 2 * f, o -= c && d ? m["client" + k] : 0, p = l["scroll" + h], q = o / p, r = {}, r[s] = l["offset" + g] + f, r[t] = o, a(m).css(r), r = {}, r[s] = l["scroll" + g] * q, r[t] = o * q, a(n).css(r)
                        }
                    }
                    var c, d, g;
                    g = e.getEl("body"), c = g.scrollWidth > g.clientWidth, d = g.scrollHeight > g.clientHeight, b("h", "Left", "Width", "contentW", c, "Height"), b("v", "Top", "Height", "contentH", d, "Width")
                }

                function d() {
                    function c(c, d, g, h, i) {
                        var j, k = e._id + "-scroll" + c,
                            l = e.classPrefix;
                        a(e.getEl()).append('<div id="' + k + '" class="' + l + "scrollbar " + l + "scrollbar-" + c + '"><div id="' + k + 't" class="' + l + 'scrollbar-thumb"></div></div>'), e.draghelper = new b(k + "t", {
                            start: function() {
                                j = e.getEl("body")["scroll" + d], a("#" + k).addClass(l + "active")
                            },
                            drag: function(a) {
                                var b, k, l, m, n = e.layoutRect();
                                k = n.contentW > n.innerW, l = n.contentH > n.innerH, m = e.getEl("body")["client" + g] - 2 * f, m -= k && l ? e.getEl("scroll" + c)["client" + i] : 0, b = m / e.getEl("body")["scroll" + g], e.getEl("body")["scroll" + d] = j + a["delta" + h] / b
                            },
                            stop: function() {
                                a("#" + k).removeClass(l + "active")
                            }
                        })
                    }
                    e.classes.add("scroll"), c("v", "Top", "Height", "Y", "Width"), c("h", "Left", "Width", "X", "Height")
                }
                var e = this,
                    f = 2;
                e.settings.autoScroll && (e._hasScroll || (e._hasScroll = !0, d(), e.on("wheel", function(a) {
                    var b = e.getEl("body");
                    b.scrollLeft += 10 * (a.deltaX || 0), b.scrollTop += 10 * a.deltaY, c()
                }), a(e.getEl("body")).on("scroll", c)), c())
            }
        }
    }), g("2m", ["2j", "2l"], function(a, b) {
        "use strict";
        return a.extend({
            Defaults: {
                layout: "fit",
                containerCls: "panel"
            },
            Mixins: [b],
            renderHtml: function() {
                var a = this,
                    b = a._layout,
                    c = a.settings.html;
                return a.preRender(), b.preRender(a), "undefined" == typeof c ? c = '<div id="' + a._id + '-body" class="' + a.bodyClasses + '">' + b.renderHtml(a) + "</div>" : ("function" == typeof c && (c = c.call(a)), a._hasBody = !1), '<div id="' + a._id + '" class="' + a.classes + '" hidefocus="1" tabindex="-1" role="group">' + (a._preBodyHtml || "") + c + "</div>"
            }
        })
    }), g("2n", ["4q"], function(a) {
        "use strict";

        function b(b, c, d) {
            var e, f, g, h, i, j, k, l, m, n;
            return m = a.getViewPort(), f = a.getPos(c), g = f.x, h = f.y, b.state.get("fixed") && "static" == a.getRuntimeStyle(document.body, "position") && (g -= m.x, h -= m.y), e = b.getEl(), n = a.getSize(e), i = n.width, j = n.height, n = a.getSize(c), k = n.width, l = n.height, d = (d || "").split(""), "b" === d[0] && (h += l), "r" === d[1] && (g += k), "c" === d[0] && (h += Math.round(l / 2)), "c" === d[1] && (g += Math.round(k / 2)), "b" === d[3] && (h -= j), "r" === d[4] && (g -= i), "c" === d[3] && (h -= Math.round(j / 2)), "c" === d[4] && (g -= Math.round(i / 2)), {
                x: g,
                y: h,
                w: i,
                h: j
            }
        }
        return {
            testMoveRel: function(c, d) {
                for (var e = a.getViewPort(), f = 0; f < d.length; f++) {
                    var g = b(this, c, d[f]);
                    if (this.state.get("fixed")) {
                        if (g.x > 0 && g.x + g.w < e.w && g.y > 0 && g.y + g.h < e.h) return d[f]
                    } else if (g.x > e.x && g.x + g.w < e.w + e.x && g.y > e.y && g.y + g.h < e.h + e.y) return d[f]
                }
                return d[0]
            },
            moveRel: function(a, c) {
                "string" != typeof c && (c = this.testMoveRel(a, c));
                var d = b(this, a, c);
                return this.moveTo(d.x, d.y)
            },
            moveBy: function(a, b) {
                var c = this,
                    d = c.layoutRect();
                return c.moveTo(d.x + a, d.y + b), c
            },
            moveTo: function(b, c) {
                function d(a, b, c) {
                    return a < 0 ? 0 : a + c > b ? (a = b - c, a < 0 ? 0 : a) : a
                }
                var e = this;
                if (e.settings.constrainToViewport) {
                    var f = a.getViewPort(window),
                        g = e.layoutRect();
                    b = d(b, f.w + f.x, g.w), c = d(c, f.h + f.y, g.h)
                }
                return e.state.get("rendered") ? e.layoutRect({
                    x: b,
                    y: c
                }).repaint() : (e.settings.x = b, e.settings.y = c), e.fire("move", {
                    x: b,
                    y: c
                }), e
            }
        }
    }), g("2o", ["4q"], function(a) {
        "use strict";
        return {
            resizeToContent: function() {
                this._layoutRect.autoResize = !0, this._lastRect = null, this.reflow()
            },
            resizeTo: function(b, c) {
                if (b <= 1 || c <= 1) {
                    var d = a.getWindowSize();
                    b = b <= 1 ? b * d.w : b, c = c <= 1 ? c * d.h : c
                }
                return this._layoutRect.autoResize = !1, this.layoutRect({
                    minW: b,
                    minH: c,
                    w: b,
                    h: c
                }).reflow()
            },
            resizeBy: function(a, b) {
                var c = this,
                    d = c.layoutRect();
                return c.resizeTo(d.w + a, d.h + b)
            }
        }
    }), g("2p", ["2m", "2n", "2o", "4q", "a", "5"], function(a, b, c, d, e, f) {
        "use strict";

        function g(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parent()
            }
        }

        function h(a) {
            for (var b = s.length; b--;) {
                var c = s[b],
                    d = c.getParentCtrl(a.target);
                if (c.settings.autohide) {
                    if (d && (g(d, c) || c.parent() === d)) continue;
                    a = c.fire("autohide", {
                        target: a.target
                    }), a.isDefaultPrevented() || c.hide()
                }
            }
        }

        function i() {
            o || (o = function(a) {
                2 != a.button && h(a)
            }, e(document).on("click touchstart", o))
        }

        function j() {
            p || (p = function() {
                var a;
                for (a = s.length; a--;) l(s[a])
            }, e(window).on("scroll", p))
        }

        function k() {
            if (!q) {
                var a = document.documentElement,
                    b = a.clientWidth,
                    c = a.clientHeight;
                q = function() {
                    document.all && b == a.clientWidth && c == a.clientHeight || (b = a.clientWidth, c = a.clientHeight, u.hideAll())
                }, e(window).on("resize", q)
            }
        }

        function l(a) {
            function b(b, c) {
                for (var d, e = 0; e < s.length; e++)
                    if (s[e] != a)
                        for (d = s[e].parent(); d && (d = d.parent());) d == a && s[e].fixed(b).moveBy(0, c).repaint()
            }
            var c = d.getViewPort().y;
            a.settings.autofix && (a.state.get("fixed") ? a._autoFixY > c && (a.fixed(!1).layoutRect({
                y: a._autoFixY
            }).repaint(), b(!1, a._autoFixY - c)) : (a._autoFixY = a.layoutRect().y, a._autoFixY < c && (a.fixed(!0).layoutRect({
                y: 0
            }).repaint(), b(!0, c - a._autoFixY))))
        }

        function m(a, b) {
            var c, d, f = u.zIndex || 65535;
            if (a) t.push(b);
            else
                for (c = t.length; c--;) t[c] === b && t.splice(c, 1);
            if (t.length)
                for (c = 0; c < t.length; c++) t[c].modal && (f++, d = t[c]), t[c].getEl().style.zIndex = f, t[c].zIndex = f, f++;
            var g = e("#" + b.classPrefix + "modal-block", b.getContainerElm())[0];
            d ? e(g).css("z-index", d.zIndex - 1) : g && (g.parentNode.removeChild(g), r = !1), u.currentZIndex = f
        }

        function n(a) {
            var b;
            for (b = s.length; b--;) s[b] === a && s.splice(b, 1);
            for (b = t.length; b--;) t[b] === a && t.splice(b, 1)
        }
        var o, p, q, r, s = [],
            t = [],
            u = a.extend({
                Mixins: [b, c],
                init: function(a) {
                    var b = this;
                    b._super(a), b._eventsRoot = b, b.classes.add("floatpanel"), a.autohide && (i(), k(), s.push(b)), a.autofix && (j(), b.on("move", function() {
                        l(this)
                    })), b.on("postrender show", function(a) {
                        if (a.control == b) {
                            var c, d = b.classPrefix;
                            b.modal && !r && (c = e("#" + d + "modal-block", b.getContainerElm()), c[0] || (c = e('<div id="' + d + 'modal-block" class="' + d + "reset " + d + 'fade"></div>').appendTo(b.getContainerElm())), f.setTimeout(function() {
                                c.addClass(d + "in"), e(b.getEl()).addClass(d + "in")
                            }), r = !0), m(!0, b)
                        }
                    }), b.on("show", function() {
                        b.parents().each(function(a) {
                            if (a.state.get("fixed")) return b.fixed(!0), !1
                        })
                    }), a.popover && (b._preBodyHtml = '<div class="' + b.classPrefix + 'arrow"></div>', b.classes.add("popover").add("bottom").add(b.isRtl() ? "end" : "start")), b.aria("label", a.ariaLabel), b.aria("labelledby", b._id), b.aria("describedby", b.describedBy || b._id + "-none")
                },
                fixed: function(a) {
                    var b = this;
                    if (b.state.get("fixed") != a) {
                        if (b.state.get("rendered")) {
                            var c = d.getViewPort();
                            a ? b.layoutRect().y -= c.y : b.layoutRect().y += c.y
                        }
                        b.classes.toggle("fixed", a), b.state.set("fixed", a)
                    }
                    return b
                },
                show: function() {
                    var a, b = this,
                        c = b._super();
                    for (a = s.length; a-- && s[a] !== b;);
                    return a === -1 && s.push(b), c
                },
                hide: function() {
                    return n(this), m(!1, this), this._super()
                },
                hideAll: function() {
                    u.hideAll()
                },
                close: function() {
                    var a = this;
                    return a.fire("close").isDefaultPrevented() || (a.remove(), m(!1, a)), a
                },
                remove: function() {
                    n(this), this._super()
                },
                postRender: function() {
                    var a = this;
                    return a.settings.bodyRole && this.getEl("body").setAttribute("role", a.settings.bodyRole), a._super()
                }
            });
        return u.hideAll = function() {
            for (var a = s.length; a--;) {
                var b = s[a];
                b && b.settings.autohide && (b.hide(), s.splice(a, 1))
            }
        }, u
    }), g("23", ["2p", "2m", "4q", "a", "2k", "4r", "6", "5"], function(a, b, c, d, e, f, g, h) {
        "use strict";

        function i(a) {
            var b, c = "width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0",
                e = d("meta[name=viewport]")[0];
            g.overrideViewPort !== !1 && (e || (e = document.createElement("meta"), e.setAttribute("name", "viewport"), document.getElementsByTagName("head")[0].appendChild(e)), b = e.getAttribute("content"), b && "undefined" != typeof n && (n = b), e.setAttribute("content", a ? c : n))
        }

        function j(a, b) {
            k() && b === !1 && d([document.documentElement, document.body]).removeClass(a + "fullscreen")
        }

        function k() {
            for (var a = 0; a < m.length; a++)
                if (m[a]._fullscreen) return !0;
            return !1
        }

        function l() {
            function a() {
                var a, b, d = c.getWindowSize();
                for (a = 0; a < m.length; a++) b = m[a].layoutRect(), m[a].moveTo(m[a].settings.x || Math.max(0, d.w / 2 - b.w / 2), m[a].settings.y || Math.max(0, d.h / 2 - b.h / 2))
            }
            if (!g.desktop) {
                var b = {
                    w: window.innerWidth,
                    h: window.innerHeight
                };
                h.setInterval(function() {
                    var a = window.innerWidth,
                        c = window.innerHeight;
                    b.w == a && b.h == c || (b = {
                        w: a,
                        h: c
                    }, d(window).trigger("resize"))
                }, 100)
            }
            d(window).on("resize", a)
        }
        var m = [],
            n = "",
            o = a.extend({
                modal: !0,
                Defaults: {
                    border: 1,
                    layout: "flex",
                    containerCls: "panel",
                    role: "dialog",
                    callbacks: {
                        submit: function() {
                            this.fire("submit", {
                                data: this.toJSON()
                            })
                        },
                        close: function() {
                            this.close()
                        }
                    }
                },
                init: function(a) {
                    var d = this;
                    d._super(a), d.isRtl() && d.classes.add("rtl"), d.classes.add("window"), d.bodyClasses.add("window-body"), d.state.set("fixed", !0), a.buttons && (d.statusbar = new b({
                        layout: "flex",
                        border: "1 0 0 0",
                        spacing: 3,
                        padding: 10,
                        align: "center",
                        pack: d.isRtl() ? "start" : "end",
                        defaults: {
                            type: "button"
                        },
                        items: a.buttons
                    }), d.statusbar.classes.add("foot"), d.statusbar.parent(d)), d.on("click", function(a) {
                        var b = d.classPrefix + "close";
                        (c.hasClass(a.target, b) || c.hasClass(a.target.parentNode, b)) && d.close()
                    }), d.on("cancel", function() {
                        d.close()
                    }), d.aria("describedby", d.describedBy || d._id + "-none"), d.aria("label", a.title), d._fullscreen = !1
                },
                recalc: function() {
                    var a, b, d, e, f = this,
                        g = f.statusbar;
                    f._fullscreen && (f.layoutRect(c.getWindowSize()), f.layoutRect().contentH = f.layoutRect().innerH), f._super(), a = f.layoutRect(), f.settings.title && !f._fullscreen && (b = a.headerW, b > a.w && (d = a.x - Math.max(0, b / 2), f.layoutRect({
                        w: b,
                        x: d
                    }), e = !0)), g && (g.layoutRect({
                        w: f.layoutRect().innerW
                    }).recalc(), b = g.layoutRect().minW + a.deltaW, b > a.w && (d = a.x - Math.max(0, b - a.w), f.layoutRect({
                        w: b,
                        x: d
                    }), e = !0)), e && f.recalc()
                },
                initLayoutRect: function() {
                    var a, b = this,
                        d = b._super(),
                        e = 0;
                    if (b.settings.title && !b._fullscreen) {
                        a = b.getEl("head");
                        var f = c.getSize(a);
                        d.headerW = f.width, d.headerH = f.height, e += d.headerH
                    }
                    b.statusbar && (e += b.statusbar.layoutRect().h), d.deltaH += e, d.minH += e, d.h += e;
                    var g = c.getWindowSize();
                    return d.x = b.settings.x || Math.max(0, g.w / 2 - d.w / 2), d.y = b.settings.y || Math.max(0, g.h / 2 - d.h / 2), d
                },
                renderHtml: function() {
                    var a = this,
                        b = a._layout,
                        c = a._id,
                        d = a.classPrefix,
                        e = a.settings,
                        f = "",
                        g = "",
                        h = e.html;
                    return a.preRender(), b.preRender(a), e.title && (f = '<div id="' + c + '-head" class="' + d + 'window-head"><div id="' + c + '-title" class="' + d + 'title">' + a.encode(e.title) + '</div><div id="' + c + '-dragh" class="' + d + 'dragh"></div><button type="button" class="' + d + 'close" aria-hidden="true"><i class="mce-ico mce-i-remove"></i></button></div>'), e.url && (h = '<iframe src="' + e.url + '" tabindex="-1"></iframe>'), "undefined" == typeof h && (h = b.renderHtml(a)), a.statusbar && (g = a.statusbar.renderHtml()), '<div id="' + c + '" class="' + a.classes + '" hidefocus="1"><div class="' + a.classPrefix + 'reset" role="application">' + f + '<div id="' + c + '-body" class="' + a.bodyClasses + '">' + h + "</div>" + g + "</div></div>"
                },
                fullscreen: function(a) {
                    var b, e, g = this,
                        i = document.documentElement,
                        j = g.classPrefix;
                    if (a != g._fullscreen)
                        if (d(window).on("resize", function() {
                                var a;
                                if (g._fullscreen)
                                    if (b) g._timer || (g._timer = h.setTimeout(function() {
                                        var a = c.getWindowSize();
                                        g.moveTo(0, 0).resizeTo(a.w, a.h), g._timer = 0
                                    }, 50));
                                    else {
                                        a = (new Date).getTime();
                                        var d = c.getWindowSize();
                                        g.moveTo(0, 0).resizeTo(d.w, d.h), (new Date).getTime() - a > 50 && (b = !0)
                                    }
                            }), e = g.layoutRect(), g._fullscreen = a, a) {
                            g._initial = {
                                x: e.x,
                                y: e.y,
                                w: e.w,
                                h: e.h
                            }, g.borderBox = f.parseBox("0"), g.getEl("head").style.display = "none", e.deltaH -= e.headerH + 2, d([i, document.body]).addClass(j + "fullscreen"), g.classes.add("fullscreen");
                            var k = c.getWindowSize();
                            g.moveTo(0, 0).resizeTo(k.w, k.h)
                        } else g.borderBox = f.parseBox(g.settings.border), g.getEl("head").style.display = "", e.deltaH += e.headerH, d([i, document.body]).removeClass(j + "fullscreen"), g.classes.remove("fullscreen"), g.moveTo(g._initial.x, g._initial.y).resizeTo(g._initial.w, g._initial.h);
                    return g.reflow()
                },
                postRender: function() {
                    var a, b = this;
                    setTimeout(function() {
                        b.classes.add("in"), b.fire("open")
                    }, 0), b._super(), b.statusbar && b.statusbar.postRender(), b.focus(), this.dragHelper = new e(b._id + "-dragh", {
                        start: function() {
                            a = {
                                x: b.layoutRect().x,
                                y: b.layoutRect().y
                            }
                        },
                        drag: function(c) {
                            b.moveTo(a.x + c.deltaX, a.y + c.deltaY)
                        }
                    }), b.on("submit", function(a) {
                        a.isDefaultPrevented() || b.close()
                    }), m.push(b), i(!0)
                },
                submit: function() {
                    return this.fire("submit", {
                        data: this.toJSON()
                    })
                },
                remove: function() {
                    var a, b = this;
                    for (b.dragHelper.destroy(), b._super(), b.statusbar && this.statusbar.remove(), j(b.classPrefix, !1), a = m.length; a--;) m[a] === b && m.splice(a, 1);
                    i(m.length > 0)
                },
                getContentWindow: function() {
                    var a = this.getEl().getElementsByTagName("iframe")[0];
                    return a ? a.contentWindow : null
                }
            });
        return l(), o
    }), g("24", ["23"], function(a) {
        "use strict";
        var b = a.extend({
            init: function(a) {
                a = {
                    border: 1,
                    padding: 20,
                    layout: "flex",
                    pack: "center",
                    align: "center",
                    containerCls: "panel",
                    autoScroll: !0,
                    buttons: {
                        type: "button",
                        text: "Ok",
                        action: "ok"
                    },
                    items: {
                        type: "label",
                        multiline: !0,
                        maxWidth: 500,
                        maxHeight: 200
                    }
                }, this._super(a)
            },
            Statics: {
                OK: 1,
                OK_CANCEL: 2,
                YES_NO: 3,
                YES_NO_CANCEL: 4,
                msgBox: function(c) {
                    function d(a, b, c) {
                        return {
                            type: "button",
                            text: a,
                            subtype: c ? "primary" : "",
                            onClick: function(a) {
                                a.control.parents()[1].close(), f(b)
                            }
                        }
                    }
                    var e, f = c.callback || function() {};
                    switch (c.buttons) {
                        case b.OK_CANCEL:
                            e = [d("Ok", !0, !0), d("Cancel", !1)];
                            break;
                        case b.YES_NO:
                        case b.YES_NO_CANCEL:
                            e = [d("Yes", 1, !0), d("No", 0)], c.buttons == b.YES_NO_CANCEL && e.push(d("Cancel", -1));
                            break;
                        default:
                            e = [d("Ok", !0, !0)]
                    }
                    return new a({
                        padding: 20,
                        x: c.x,
                        y: c.y,
                        minWidth: 300,
                        minHeight: 100,
                        layout: "flex",
                        pack: "center",
                        align: "center",
                        buttons: e,
                        title: c.title,
                        role: "alertdialog",
                        items: {
                            type: "label",
                            multiline: !0,
                            maxWidth: 500,
                            maxHeight: 200,
                            text: c.text
                        },
                        onPostRender: function() {
                            this.aria("describedby", this.items()[0]._id)
                        },
                        onClose: c.onClose,
                        onCancel: function() {
                            f(!1)
                        }
                    }).renderTo(document.body).reflow()
                },
                alert: function(a, c) {
                    return "string" == typeof a && (a = {
                        text: a
                    }), a.callback = c, b.msgBox(a)
                },
                confirm: function(a, c) {
                    return "string" == typeof a && (a = {
                        text: a
                    }), a.callback = c, a.buttons = b.OK_CANCEL, b.msgBox(a)
                }
            }
        });
        return b
    }), g("10", ["23", "24"], function(a, b) {
        return function(c) {
            function d() {
                if (h.length) return h[h.length - 1]
            }

            function e(a) {
                c.fire("OpenWindow", {
                    win: a
                })
            }

            function f(a) {
                c.fire("CloseWindow", {
                    win: a
                })
            }
            var g = this,
                h = [];
            g.windows = h, c.on("remove", function() {
                for (var a = h.length; a--;) h[a].close()
            }), g.open = function(b, d) {
                var g;
                return c.editorManager.setActive(c), b.title = b.title || " ", b.url = b.url || b.file, b.url && (b.width = parseInt(b.width || 320, 10), b.height = parseInt(b.height || 240, 10)), b.body && (b.items = {
                    defaults: b.defaults,
                    type: b.bodyType || "form",
                    items: b.body,
                    data: b.data,
                    callbacks: b.commands
                }), b.url || b.buttons || (b.buttons = [{
                    text: "Ok",
                    subtype: "primary",
                    onclick: function() {
                        g.find("form")[0].submit()
                    }
                }, {
                    text: "Cancel",
                    onclick: function() {
                        g.close()
                    }
                }]), g = new a(b), h.push(g), g.on("close", function() {
                    for (var a = h.length; a--;) h[a] === g && h.splice(a, 1);
                    h.length || c.focus(), f(g)
                }), b.data && g.on("postRender", function() {
                    this.find("*").each(function(a) {
                        var c = a.name();
                        c in b.data && a.value(b.data[c])
                    })
                }), g.features = b || {}, g.params = d || {}, 1 === h.length && c.nodeChanged(), g = g.renderTo().reflow(), e(g), g
            }, g.alert = function(a, d, g) {
                var h;
                h = b.alert(a, function() {
                    d ? d.call(g || this) : c.focus()
                }), h.on("close", function() {
                    f(h)
                }), e(h)
            }, g.confirm = function(a, c, d) {
                var g;
                g = b.confirm(a, function(a) {
                    c.call(d || this, a)
                }), g.on("close", function() {
                    f(g)
                }), e(g)
            }, g.close = function() {
                d() && d().close()
            }, g.getParams = function() {
                return d() ? d().params : null
            }, g.setParams = function(a) {
                d() && (d().params = a)
            }, g.getWindows = function() {
                return h
            }
        }
    }), g("2q", ["2g", "2n"], function(a, b) {
        return a.extend({
            Mixins: [b],
            Defaults: {
                classes: "widget tooltip tooltip-n"
            },
            renderHtml: function() {
                var a = this,
                    b = a.classPrefix;
                return '<div id="' + a._id + '" class="' + a.classes + '" role="presentation"><div class="' + b + 'tooltip-arrow"></div><div class="' + b + 'tooltip-inner">' + a.encode(a.state.get("text")) + "</div></div>"
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:text", function(b) {
                    a.getEl().lastChild.innerHTML = a.encode(b.value)
                }), a._super()
            },
            repaint: function() {
                var a, b, c = this;
                a = c.getEl().style, b = c._layoutRect, a.left = b.x + "px", a.top = b.y + "px", a.zIndex = 131070
            }
        })
    }), g("2r", ["2g", "2q"], function(a, b) {
        "use strict";
        var c, d = a.extend({
            init: function(a) {
                var b = this;
                b._super(a), a = b.settings, b.canFocus = !0, a.tooltip && d.tooltips !== !1 && (b.on("mouseenter", function(c) {
                    var d = b.tooltip().moveTo(-65535);
                    if (c.control == b) {
                        var e = d.text(a.tooltip).show().testMoveRel(b.getEl(), ["bc-tc", "bc-tl", "bc-tr"]);
                        d.classes.toggle("tooltip-n", "bc-tc" == e), d.classes.toggle("tooltip-nw", "bc-tl" == e), d.classes.toggle("tooltip-ne", "bc-tr" == e), d.moveRel(b.getEl(), e)
                    } else d.hide()
                }), b.on("mouseleave mousedown click", function() {
                    b.tooltip().hide()
                })), b.aria("label", a.ariaLabel || a.tooltip)
            },
            tooltip: function() {
                return c || (c = new b({
                    type: "tooltip"
                }), c.renderTo()), c
            },
            postRender: function() {
                var a = this,
                    b = a.settings;
                a._super(), a.parent() || !b.width && !b.height || (a.initLayoutRect(), a.repaint()), b.autofocus && a.focus()
            },
            bindStates: function() {
                function a(a) {
                    c.aria("disabled", a), c.classes.toggle("disabled", a)
                }

                function b(a) {
                    c.aria("pressed", a), c.classes.toggle("active", a)
                }
                var c = this;
                return c.state.on("change:disabled", function(b) {
                    a(b.value)
                }), c.state.on("change:active", function(a) {
                    b(a.value)
                }), c.state.get("disabled") && a(!0), c.state.get("active") && b(!0), c._super()
            },
            remove: function() {
                this._super(), c && (c.remove(), c = null)
            }
        });
        return d
    }), g("2s", ["2r"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                value: 0
            },
            init: function(a) {
                var b = this;
                b._super(a), b.classes.add("progress"), b.settings.filter || (b.settings.filter = function(a) {
                    return Math.round(a)
                })
            },
            renderHtml: function() {
                var a = this,
                    b = a._id,
                    c = this.classPrefix;
                return '<div id="' + b + '" class="' + a.classes + '"><div class="' + c + 'bar-container"><div class="' + c + 'bar"></div></div><div class="' + c + 'text">0%</div></div>'
            },
            postRender: function() {
                var a = this;
                return a._super(), a.value(a.settings.value), a
            },
            bindStates: function() {
                function a(a) {
                    a = b.settings.filter(a), b.getEl().lastChild.innerHTML = a + "%", b.getEl().firstChild.firstChild.style.width = a + "%"
                }
                var b = this;
                return b.state.on("change:value", function(b) {
                    a(b.value)
                }), a(b.state.get("value")), b._super()
            }
        })
    }), g("25", ["2g", "2n", "2s", "5"], function(a, b, c, d) {
        return a.extend({
            Mixins: [b],
            Defaults: {
                classes: "widget notification"
            },
            init: function(a) {
                var b = this;
                b._super(a), a.text && b.text(a.text), a.icon && (b.icon = a.icon), a.color && (b.color = a.color), a.type && b.classes.add("notification-" + a.type), a.timeout && (a.timeout < 0 || a.timeout > 0) && !a.closeButton ? b.closeButton = !1 : (b.classes.add("has-close"), b.closeButton = !0), a.progressBar && (b.progressBar = new c), b.on("click", function(a) {
                    a.target.className.indexOf(b.classPrefix + "close") != -1 && b.close()
                })
            },
            renderHtml: function() {
                var a = this,
                    b = a.classPrefix,
                    c = "",
                    d = "",
                    e = "",
                    f = "";
                return a.icon && (c = '<i class="' + b + "ico " + b + "i-" + a.icon + '"></i>'), a.color && (f = ' style="background-color: ' + a.color + '"'), a.closeButton && (d = '<button type="button" class="' + b + 'close" aria-hidden="true">\xd7</button>'), a.progressBar && (e = a.progressBar.renderHtml()), '<div id="' + a._id + '" class="' + a.classes + '"' + f + ' role="presentation">' + c + '<div class="' + b + 'notification-inner">' + a.state.get("text") + "</div>" + e + d + "</div>"
            },
            postRender: function() {
                var a = this;
                return d.setTimeout(function() {
                    a.$el.addClass(a.classPrefix + "in")
                }), a._super()
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:text", function(b) {
                    a.getEl().childNodes[1].innerHTML = b.value
                }), a.progressBar && a.progressBar.bindStates(), a._super()
            },
            close: function() {
                var a = this;
                return a.fire("close").isDefaultPrevented() || a.remove(), a
            },
            repaint: function() {
                var a, b, c = this;
                a = c.getEl().style, b = c._layoutRect, a.left = b.x + "px", a.top = b.y + "px", a.zIndex = 65534
            }
        })
    }), g("11", ["25", "5", "9"], function(a, b, c) {
        return function(d) {
            function e() {
                if (m.length) return m[m.length - 1]
            }

            function f() {
                b.requestAnimationFrame(function() {
                    g(), h()
                })
            }

            function g() {
                for (var a = 0; a < m.length; a++) m[a].moveTo(0, 0)
            }

            function h() {
                if (m.length > 0) {
                    var a = m.slice(0, 1)[0],
                        b = d.inline ? d.getElement() : d.getContentAreaContainer();
                    if (a.moveRel(b, "tc-tc"), m.length > 1)
                        for (var c = 1; c < m.length; c++) m[c].moveRel(m[c - 1].getEl(), "bc-tc")
                }
            }

            function i(a, b) {
                if (!k(b)) return null;
                var d = c.grep(a, function(a) {
                    return j(b, a)
                });
                return 0 === d.length ? null : d[0]
            }

            function j(a, b) {
                return a.type === b.settings.type && a.text === b.settings.text
            }

            function k(a) {
                return !a.progressBar && !a.timeout
            }
            var l = this,
                m = [];
            l.notifications = m, d.on("remove", function() {
                for (var a = m.length; a--;) m[a].close()
            }), d.on("ResizeEditor", h), d.on("ResizeWindow", f), l.open = function(b) {
                if (!d.removed) {
                    var c;
                    d.editorManager.setActive(d);
                    var e = i(m, b);
                    return null === e ? (c = new a(b), m.push(c), b.timeout > 0 && (c.timer = setTimeout(function() {
                        c.close()
                    }, b.timeout)), c.on("close", function() {
                        var a = m.length;
                        for (c.timer && d.getWin().clearTimeout(c.timer); a--;) m[a] === c && m.splice(a, 1);
                        h()
                    }), c.renderTo(), h()) : c = e, c
                }
            }, l.close = function() {
                e() && e().close()
            }, l.getNotifications = function() {
                return m
            }, d.on("SkinLoaded", function() {
                var a = d.settings.service_message;
                a && d.notificationManager.open({
                    text: a,
                    type: "warning",
                    timeout: 0,
                    icon: ""
                })
            })
        }
    }), g("12", ["z", "e", "9"], function(a, b, c) {
        function d(a, b) {
            return "selectionchange" == b ? a.getDoc() : !a.inline && /^mouse|touch|click|contextmenu|drop|dragover|dragend/.test(b) ? a.getDoc().documentElement : a.settings.event_root ? (a.eventRoot || (a.eventRoot = g.select(a.settings.event_root)[0]), a.eventRoot) : a.getBody()
        }

        function e(a, b) {
            function c(a) {
                return !a.hidden && !a.readonly
            }
            var e, h;
            if (a.delegates || (a.delegates = {}), !a.delegates[b] && !a.removed)
                if (e = d(a, b), a.settings.event_root) {
                    if (f || (f = {}, a.editorManager.on("removeEditor", function() {
                            var b;
                            if (!a.editorManager.activeEditor && f) {
                                for (b in f) a.dom.unbind(d(a, b));
                                f = null
                            }
                        })), f[b]) return;
                    h = function(d) {
                        for (var e = d.target, f = a.editorManager.editors, h = f.length; h--;) {
                            var i = f[h].getBody();
                            (i === e || g.isChildOf(e, i)) && c(f[h]) && f[h].fire(b, d)
                        }
                    }, f[b] = h, g.bind(e, b, h)
                } else h = function(d) {
                    c(a) && a.fire(b, d)
                }, g.bind(e, b, h), a.delegates[b] = h
        }
        var f, g = b.DOM,
            h = {
                bindPendingEventDelegates: function() {
                    var a = this;
                    c.each(a._pendingNativeEvents, function(b) {
                        e(a, b)
                    })
                },
                toggleNativeEvent: function(a, b) {
                    var c = this;
                    "focus" != a && "blur" != a && (b ? c.initialized ? e(c, a) : c._pendingNativeEvents ? c._pendingNativeEvents.push(a) : c._pendingNativeEvents = [a] : c.initialized && (c.dom.unbind(d(c, a), a, c.delegates[a]), delete c.delegates[a]))
                },
                unbindAllNativeEvents: function() {
                    var a, b = this;
                    if (b.delegates) {
                        for (a in b.delegates) b.dom.unbind(d(b, a), a, b.delegates[a]);
                        delete b.delegates
                    }
                    b.inline || (b.getBody().onload = null, b.dom.unbind(b.getWin()), b.dom.unbind(b.getDoc())), b.dom.unbind(b.getBody()), b.dom.unbind(b.getContainer())
                }
            };
        return h = c.extend({}, a, h)
    }), g("13", ["9", "6"], function(a, b) {
        var c = a.each,
            d = a.explode,
            e = {
                f9: 120,
                f10: 121,
                f11: 122
            },
            f = a.makeMap("alt,ctrl,shift,meta,access");
        return function(g) {
            function h(a) {
                var g, h, i = {};
                c(d(a, "+"), function(a) {
                    a in f ? i[a] = !0 : /^[0-9]{2,}$/.test(a) ? i.keyCode = parseInt(a, 10) : (i.charCode = a.charCodeAt(0), i.keyCode = e[a] || a.toUpperCase().charCodeAt(0))
                }), g = [i.keyCode];
                for (h in f) i[h] ? g.push(h) : i[h] = !1;
                return i.id = g.join(","), i.access && (i.alt = !0, b.mac ? i.ctrl = !0 : i.shift = !0), i.meta && (b.mac ? i.meta = !0 : (i.ctrl = !0, i.meta = !1)), i
            }

            function i(b, c, e, f) {
                var i;
                return i = a.map(d(b, ">"), h), i[i.length - 1] = a.extend(i[i.length - 1], {
                    func: e,
                    scope: f || g
                }), a.extend(i[0], {
                    desc: g.translate(c),
                    subpatterns: i.slice(1)
                })
            }

            function j(a) {
                return a.altKey || a.ctrlKey || a.metaKey
            }

            function k(a) {
                return "keydown" === a.type && a.keyCode >= 112 && a.keyCode <= 123
            }

            function l(a, b) {
                return !!b && (b.ctrl == a.ctrlKey && b.meta == a.metaKey && (b.alt == a.altKey && b.shift == a.shiftKey && (!!(a.keyCode == b.keyCode || a.charCode && a.charCode == b.charCode) && (a.preventDefault(), !0))))
            }

            function m(a) {
                return a.func ? a.func.call(a.scope) : null
            }
            var n = this,
                o = {},
                p = [];
            g.on("keyup keypress keydown", function(a) {
                !j(a) && !k(a) || a.isDefaultPrevented() || (c(o, function(b) {
                    if (l(a, b)) return p = b.subpatterns.slice(0), "keydown" == a.type && m(b), !0
                }), l(a, p[0]) && (1 === p.length && "keydown" == a.type && m(p[0]), p.shift()))
            }), n.add = function(b, e, f, h) {
                var j;
                return j = f, "string" == typeof f ? f = function() {
                    g.execCommand(j, !1, null)
                } : a.isArray(j) && (f = function() {
                    g.execCommand(j[0], j[1], j[2])
                }), c(d(a.trim(b.toLowerCase())), function(a) {
                    var b = i(a, e, f, h);
                    o[b.id] = b
                }), !0
            }, n.remove = function(a) {
                var b = i(a);
                return !!o[b.id] && (delete o[b.id], !0)
            }
        }
    }), g("26", ["9"], function(a) {
        var b = function(b, c, d, e, f) {
            return f = a.extend({
                id: c,
                theme: "modern",
                delta_width: 0,
                delta_height: 0,
                popup_css: "",
                plugins: "",
                document_base_url: d,
                add_form_submit_trigger: !0,
                submit_patch: !0,
                add_unload_trigger: !0,
                convert_urls: !0,
                relative_urls: !0,
                remove_script_host: !0,
                object_resizing: !0,
                doctype: "<!DOCTYPE html>",
                visual: !0,
                font_size_style_values: "xx-small,x-small,small,medium,large,x-large,xx-large",
                font_size_legacy_values: "xx-small,small,medium,large,x-large,xx-large,300%",
                forced_root_block: "p",
                hidden_input: !0,
                padd_empty_editor: !0,
                render_ui: !0,
                indentation: "30px",
                inline_styles: !0,
                convert_fonts_to_spans: !0,
                indent: "simple",
                indent_before: "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",
                indent_after: "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",
                entity_encoding: "named",
                url_converter: b.convertURL,
                url_converter_scope: b,
                ie7_compat: !0
            }, e, f, {
                validate: !0,
                content_editable: f.inline
            }), e && e.external_plugins && f.external_plugins && (f.external_plugins = a.extend({}, e.external_plugins, f.external_plugins)), f
        };
        return {
            getEditorSettings: b
        }
    }), h("4t", window), g("2b", ["g"], function(a) {
        var b = a.PluginManager,
            c = function(a, c) {
                for (var d in b.urls) {
                    var e = b.urls[d] + "/plugin" + c + ".js";
                    if (e === a) return d
                }
                return null
            },
            d = function(a, b) {
                var d = c(b, a.suffix);
                return d ? "Failed to load plugin: " + d + " from url " + b : "Failed to load plugin url: " + b
            },
            e = function(a, b) {
                a.notificationManager.open({
                    type: "error",
                    text: b
                })
            },
            f = function(a, b) {
                a._skinLoaded ? e(a, b) : a.on("SkinLoaded", function() {
                    e(a, b)
                })
            },
            g = function(a, b) {
                f(a, "Failed to upload image: " + b)
            },
            h = function(a, b) {
                f(a, d(a, b))
            },
            i = function(a, b) {
                f(a, "Failed to load content css: " + b[0])
            },
            j = function(a) {
                var b = window.console;
                b && !window.test && (b.error ? b.error.apply(b, arguments) : b.log.apply(b, arguments))
            };
        return {
            pluginLoadError: h,
            uploadError: g,
            displayError: f,
            contentCssError: i,
            initError: j
        }
    }), g("6c", ["1m", "1k"], function(a, b) {
        var c = function(a) {
                return a.dom.select("*[data-mce-caret]")[0]
            },
            d = function(a) {
                a.selection.setRng(a.selection.getRng())
            },
            e = function(a, c) {
                c.hasAttribute("data-mce-caret") && (b.showCaretContainerBlock(c), d(a), a.selection.scrollIntoView(c))
            },
            f = function(a, d) {
                var f = c(a);
                if (f) return "compositionstart" === d.type ? (d.preventDefault(), d.stopPropagation(), void e(f)) : void(b.hasContent(f) && e(a, f))
            },
            g = function(b) {
                b.on("keyup compositionstart", a.curry(f, b))
            };
        return {
            setup: g
        }
    }), g("6r", ["4", "9", "1w"], function(a, b, c) {
        return function(c, d) {
            function e(a, b) {
                return a ? a.replace(/\/$/, "") + "/" + b.replace(/^\//, "") : b
            }

            function f(a, b, c, f) {
                var g, h;
                g = new XMLHttpRequest, g.open("POST", d.url), g.withCredentials = d.credentials, g.upload.onprogress = function(a) {
                    f(a.loaded / a.total * 100)
                }, g.onerror = function() {
                    c("Image upload failed due to a XHR Transport error. Code: " + g.status)
                }, g.onload = function() {
                    var a;
                    return g.status < 200 || g.status >= 300 ? void c("HTTP Error: " + g.status) : (a = JSON.parse(g.responseText), a && "string" == typeof a.location ? void b(e(d.basePath, a.location)) : void c("Invalid JSON: " + g.responseText))
                }, h = new FormData, h.append("file", a.blob(), a.filename()), g.send(h)
            }

            function g() {
                return new a(function(a) {
                    a([])
                })
            }

            function h(a, b) {
                return {
                    url: b,
                    blobInfo: a,
                    status: !0
                }
            }

            function i(a, b) {
                return {
                    url: "",
                    blobInfo: a,
                    status: !1,
                    error: b
                }
            }

            function j(a, c) {
                b.each(p[a], function(a) {
                    a(c)
                }), delete p[a]
            }

            function k(b, d, e) {
                return c.markPending(b.blobUri()), new a(function(a) {
                    var f, g, k = function() {};
                    try {
                        var l = function() {
                                f && (f.close(), g = k)
                            },
                            m = function(d) {
                                l(), c.markUploaded(b.blobUri(), d), j(b.blobUri(), h(b, d)), a(h(b, d))
                            },
                            n = function(d) {
                                l(), c.removeFailed(b.blobUri()), j(b.blobUri(), i(b, d)), a(i(b, d))
                            };
                        g = function(a) {
                            a < 0 || a > 100 || (f || (f = e()), f.progressBar.value(a))
                        }, d(b, m, n, g)
                    } catch (c) {
                        a(i(b, c.message))
                    }
                })
            }

            function l(a) {
                return a === f
            }

            function m(b) {
                var c = b.blobUri();
                return new a(function(a) {
                    p[c] = p[c] || [], p[c].push(a)
                })
            }

            function n(e, f) {
                return e = b.grep(e, function(a) {
                    return !c.isUploaded(a.blobUri())
                }), a.all(b.map(e, function(a) {
                    return c.isPending(a.blobUri()) ? m(a) : k(a, d.handler, f)
                }))
            }

            function o(a, b) {
                return !d.url && l(d.handler) ? g() : n(a, b)
            }
            var p = {};
            return d = b.extend({
                credentials: !1,
                handler: f
            }, d), {
                upload: o
            }
        }
    }), g("7a", ["4"], function(a) {
        function b(b) {
            return new a(function(a, c) {
                var d = function() {
                    c("Cannot convert " + b + " to Blob. Resource might not exist or is inaccessible.")
                };
                try {
                    var e = new XMLHttpRequest;
                    e.open("GET", b, !0), e.responseType = "blob", e.onload = function() {
                        200 == this.status ? a(this.response) : d()
                    }, e.onerror = d, e.send()
                } catch (a) {
                    d()
                }
            })
        }

        function c(a) {
            var b, c;
            return a = decodeURIComponent(a).split(","), c = /data:([^;]+)/.exec(a[0]), c && (b = c[1]), {
                type: b,
                data: a[1]
            }
        }

        function d(b) {
            return new a(function(a) {
                var d, e, f;
                b = c(b);
                try {
                    d = atob(b.data)
                } catch (b) {
                    return void a(new Blob([]))
                }
                for (e = new Uint8Array(d.length), f = 0; f < e.length; f++) e[f] = d.charCodeAt(f);
                a(new Blob([e], {
                    type: b.type
                }))
            })
        }

        function e(a) {
            return 0 === a.indexOf("blob:") ? b(a) : 0 === a.indexOf("data:") ? d(a) : null
        }

        function f(b) {
            return new a(function(a) {
                var c = new FileReader;
                c.onloadend = function() {
                    a(c.result)
                }, c.readAsDataURL(b)
            })
        }
        return {
            uriToBlob: e,
            blobToDataUri: f,
            parseDataUri: c
        }
    }), g("6s", ["4", "1g", "1w", "7a", "6"], function(a, b, c, d, e) {
        var f = 0,
            g = function(a) {
                return (a || "blobid") + f++
            },
            h = function(a, b, c, e) {
                var f, h;
                return 0 === b.src.indexOf("blob:") ? (h = a.getByUri(b.src), void(h ? c({
                    image: b,
                    blobInfo: h
                }) : d.uriToBlob(b.src).then(function(e) {
                    d.blobToDataUri(e).then(function(i) {
                        f = d.parseDataUri(i).data, h = a.create(g(), e, f), a.add(h), c({
                            image: b,
                            blobInfo: h
                        })
                    })
                }, function(a) {
                    e(a)
                }))) : (f = d.parseDataUri(b.src).data, h = a.findFirst(function(a) {
                    return a.base64() === f
                }), void(h ? c({
                    image: b,
                    blobInfo: h
                }) : d.uriToBlob(b.src).then(function(d) {
                    h = a.create(g(), d, f), a.add(h), c({
                        image: b,
                        blobInfo: h
                    })
                }, function(a) {
                    e(a)
                })))
            },
            i = function(a) {
                return a ? a.getElementsByTagName("img") : []
            };
        return function(d, f) {
            function g(g, k) {
                var l, m;
                return k || (k = c.constant(!0)), l = b.filter(i(g), function(a) {
                    var b = a.src;
                    return !!e.fileApi && (!a.hasAttribute("data-mce-bogus") && (!a.hasAttribute("data-mce-placeholder") && (!(!b || b == e.transparentSrc) && (0 === b.indexOf("blob:") ? !d.isUploaded(b) : 0 === b.indexOf("data:") && k(a)))))
                }), m = b.map(l, function(b) {
                    var c;
                    return j[b.src] ? new a(function(a) {
                        j[b.src].then(function(c) {
                            return "string" == typeof c ? c : void a({
                                image: b,
                                blobInfo: c.blobInfo
                            })
                        })
                    }) : (c = new a(function(a, c) {
                        h(f, b, a, c)
                    }).then(function(a) {
                        return delete j[a.image.src], a
                    })["catch"](function(a) {
                        return delete j[b.src], a
                    }), j[b.src] = c, c)
                }), a.all(m)
            }
            var j = {};
            return {
                findAll: g
            }
        }
    }), g("2a", [], function() {
        var a = 0,
            b = function() {
                var a = function() {
                        return Math.round(4294967295 * Math.random()).toString(36)
                    },
                    b = (new Date).getTime();
                return "s" + b.toString(36) + a() + a() + a()
            },
            c = function(c) {
                return c + a++ + b()
            };
        return {
            uuid: c
        }
    }), h("7b", URL), g("6t", ["1g", "1w", "2a", "7b"], function(a, b, c, d) {
        return function() {
            function e(a) {
                var b = {
                    "image/jpeg": "jpg",
                    "image/jpg": "jpg",
                    "image/gif": "gif",
                    "image/png": "png"
                };
                return b[a.toLowerCase()] || "dat"
            }

            function f(a, b, c, d) {
                return g("object" == typeof a ? a : {
                    id: a,
                    name: d,
                    blob: b,
                    base64: c
                })
            }

            function g(a) {
                var b, f;
                if (!a.blob || !a.base64) throw "blob and base64 representations of the image are required for BlobInfo to be created";
                return b = a.id || c.uuid("blobid"), f = a.name || b, {
                    id: o(b),
                    name: o(f),
                    filename: o(f + "." + e(a.blob.type)),
                    blob: o(a.blob),
                    base64: o(a.base64),
                    blobUri: o(a.blobUri || d.createObjectURL(a.blob)),
                    uri: o(a.uri)
                }
            }

            function h(a) {
                i(a.id()) || n.push(a)
            }

            function i(a) {
                return j(function(b) {
                    return b.id() === a
                })
            }

            function j(b) {
                return a.filter(n, b)[0]
            }

            function k(a) {
                return j(function(b) {
                    return b.blobUri() == a
                })
            }

            function l(b) {
                n = a.filter(n, function(a) {
                    return a.blobUri() !== b || (d.revokeObjectURL(a.blobUri()), !1)
                })
            }

            function m() {
                a.each(n, function(a) {
                    d.revokeObjectURL(a.blobUri())
                }), n = []
            }
            var n = [],
                o = b.constant;
            return {
                create: f,
                add: h,
                get: i,
                getByUri: k,
                findFirst: j,
                removeByUri: l,
                destroy: m
            }
        }
    }), g("6u", [], function() {
        return function() {
            function a(a, b) {
                return {
                    status: a,
                    resultUri: b
                }
            }

            function b(a) {
                return a in l
            }

            function c(a) {
                var b = l[a];
                return b ? b.resultUri : null
            }

            function d(a) {
                return !!b(a) && l[a].status === j
            }

            function e(a) {
                return !!b(a) && l[a].status === k
            }

            function f(b) {
                l[b] = a(j, null)
            }

            function g(b, c) {
                l[b] = a(k, c)
            }

            function h(a) {
                delete l[a]
            }

            function i() {
                l = {}
            }
            var j = 1,
                k = 2,
                l = {};
            return {
                hasBlobUri: b,
                getResultUri: c,
                isPending: d,
                isUploaded: e,
                markPending: f,
                markUploaded: g,
                removeFailed: h,
                destroy: i
            }
        }
    }), g("6d", ["1g", "6r", "6s", "6t", "6u", "2b"], function(a, b, c, d, e, f) {
        return function(g) {
            function h(a) {
                return function(b) {
                    return g.selection ? a(b) : []
                }
            }

            function i() {
                return "?" + (new Date).getTime()
            }

            function j(a, b, c) {
                var d = 0;
                do d = a.indexOf(b, d), d !== -1 && (a = a.substring(0, d) + c + a.substr(d + b.length), d += c.length - b.length + 1); while (d !== -1);
                return a
            }

            function k(a, b, c) {
                return a = j(a, 'src="' + b + '"', 'src="' + c + '"'), a = j(a, 'data-mce-src="' + b + '"', 'data-mce-src="' + c + '"')
            }

            function l(b, c) {
                a.each(g.undoManager.data, function(d) {
                    "fragmented" === d.type ? d.fragments = a.map(d.fragments, function(a) {
                        return k(a, b, c)
                    }) : d.content = k(d.content, b, c)
                })
            }

            function m() {
                return g.notificationManager.open({
                    text: g.translate("Image uploading..."),
                    type: "info",
                    timeout: -1,
                    progressBar: !0
                })
            }

            function n(a, b) {
                w.removeByUri(a.src), l(a.src, b), g.$(a).attr({
                    src: x.images_reuse_filename ? b + i() : b,
                    "data-mce-src": g.convertURL(b, "src")
                })
            }

            function o(c) {
                return u || (u = new b(y, {
                    url: x.images_upload_url,
                    basePath: x.images_upload_base_path,
                    credentials: x.images_upload_credentials,
                    handler: x.images_upload_handler
                })), r().then(h(function(b) {
                    var d;
                    return d = a.map(b, function(a) {
                        return a.blobInfo
                    }), u.upload(d, m).then(h(function(d) {
                        var e = a.map(d, function(a, c) {
                            var d = b[c].image;
                            return a.status && g.settings.images_replace_blob_uris !== !1 ? n(d, a.url) : a.error && f.uploadError(g, a.error), {
                                element: d,
                                status: a.status
                            }
                        });
                        return c && c(e), e
                    }))
                }))
            }

            function p(a) {
                if (x.automatic_uploads !== !1) return o(a)
            }

            function q(a) {
                return !x.images_dataimg_filter || x.images_dataimg_filter(a)
            }

            function r() {
                return v || (v = new c(y, w)), v.findAll(g.getBody(), q).then(h(function(b) {
                    return b = a.filter(b, function(a) {
                        return "string" != typeof a || (f.displayError(g, a), !1)
                    }), a.each(b, function(a) {
                        l(a.image.src, a.blobInfo.blobUri()), a.image.src = a.blobInfo.blobUri(), a.image.removeAttribute("data-mce-src")
                    }), b
                }))
            }

            function s() {
                w.destroy(), y.destroy(), v = u = null
            }

            function t(b) {
                return b.replace(/src="(blob:[^"]+)"/g, function(b, c) {
                    var d = y.getResultUri(c);
                    if (d) return 'src="' + d + '"';
                    var e = w.getByUri(c);
                    return e || (e = a.reduce(g.editorManager.editors, function(a, b) {
                        return a || b.editorUpload && b.editorUpload.blobCache.getByUri(c)
                    }, null)), e ? 'src="data:' + e.blob().type + ";base64," + e.base64() + '"' : b
                })
            }
            var u, v, w = new d,
                x = g.settings,
                y = new e;
            return g.on("setContent", function() {
                g.settings.automatic_uploads !== !1 ? p() : r()
            }), g.on("RawSaveContent", function(a) {
                a.content = t(a.content)
            }), g.on("getContent", function(a) {
                a.source_view || "raw" == a.format || (a.content = t(a.content))
            }), g.on("PostRender", function() {
                g.parser.addNodeFilter("img", function(b) {
                    a.each(b, function(a) {
                        var b = a.attr("src");
                        if (!w.getByUri(b)) {
                            var c = y.getResultUri(b);
                            c && a.attr("src", c)
                        }
                    })
                })
            }), {
                blobCache: w,
                uploadImages: o,
                uploadImagesAuto: p,
                scanForImages: r,
                destroy: s
            }
        }
    }), g("6e", ["1m"], function(a) {
        var b = function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n = a.settings,
                    o = a.dom,
                    p = a.selection,
                    q = a.schema,
                    r = q.getBlockElements(),
                    s = p.getStart(),
                    t = a.getBody(),
                    u = -16777215;
                if (m = n.forced_root_block, s && 1 === s.nodeType && m) {
                    for (; s && s !== t;) {
                        if (r[s.nodeName]) return;
                        s = s.parentNode
                    }
                    if (b = p.getRng(), b.setStart) {
                        c = b.startContainer, d = b.startOffset, e = b.endContainer, f = b.endOffset;
                        try {
                            j = a.getDoc().activeElement === t
                        } catch (a) {}
                    } else b.item && (s = b.item(0), b = a.getDoc().body.createTextRange(), b.moveToElementText(s)), j = b.parentElement().ownerDocument === a.getDoc(), k = b.duplicate(), k.collapse(!0), d = k.move("character", u) * -1, k.collapsed || (k = b.duplicate(), k.collapse(!1), f = k.move("character", u) * -1 - d);
                    for (s = t.firstChild, l = t.nodeName.toLowerCase(); s;)
                        if ((3 === s.nodeType || 1 == s.nodeType && !r[s.nodeName]) && q.isValidChild(l, m.toLowerCase())) {
                            if (3 === s.nodeType && 0 === s.nodeValue.length) {
                                h = s, s = s.nextSibling, o.remove(h);
                                continue
                            }
                            g || (g = o.create(m, a.settings.forced_root_block_attrs), s.parentNode.insertBefore(g, s), i = !0), h = s, s = s.nextSibling, g.appendChild(h)
                        } else g = null, s = s.nextSibling;
                    if (i && j) {
                        if (b.setStart) b.setStart(c, d), b.setEnd(e, f), p.setRng(b);
                        else try {
                            b = a.getDoc().body.createTextRange(), b.moveToElementText(t), b.collapse(!0), b.moveStart("character", d), f > 0 && b.moveEnd("character", f), b.select()
                        } catch (a) {}
                        a.nodeChanged()
                    }
                }
            },
            c = function(c) {
                c.settings.forced_root_block && c.on("NodeChange", a.curry(b, c))
            };
        return {
            setup: c
        }
    }), g("7f", ["1g", "1j", "43"], function(a, b, c) {
        function d(e) {
            function f(b) {
                return a.map(b, function(a) {
                    return a = c.clone(a), a.node = e, a
                })
            }
            if (a.isArray(e)) return a.reduce(e, function(a, b) {
                return a.concat(d(b))
            }, []);
            if (b.isElement(e)) return f(e.getClientRects());
            if (b.isText(e)) {
                var g = e.ownerDocument.createRange();
                return g.setStart(e, 0), g.setEnd(e, e.data.length), f(g.getClientRects())
            }
        }
        return {
            getClientRects: d
        }
    }), g("70", ["1w", "1g", "1j", "7f", "43", "5i", "44"], function(a, b, c, d, e, f, g) {
        function h(a, b) {
            return Math.abs(a.left - b)
        }

        function i(a, b) {
            return Math.abs(a.right - b)
        }

        function j(a, c) {
            function d(a, b) {
                return a >= b.left && a <= b.right
            }
            return b.reduce(a, function(a, b) {
                var e, f;
                return e = Math.min(h(a, c), i(a, c)), f = Math.min(h(b, c), i(b, c)), d(c, b) ? b : d(c, a) ? a : f == e && p(b.node) ? b : f < e ? b : a
            })
        }

        function k(a, b, c, d) {
            for (; d = q(d, a, g.isEditableCaretCandidate, b);)
                if (c(d)) return
        }

        function l(a, c) {
            function f(a, e) {
                var f;
                return f = b.filter(d.getClientRects(e), function(b) {
                    return !a(b, c)
                }), g = g.concat(f), 0 === f.length
            }
            var g = [];
            return g.push(c), k(-1, a, r(f, e.isAbove), c.node), k(1, a, r(f, e.isBelow), c.node), g
        }

        function m(a) {
            return b.filter(b.toArray(a.getElementsByTagName("*")), p)
        }

        function n(a, b) {
            return {
                node: a.node,
                before: h(a, b) < i(a, b)
            }
        }

        function o(a, c, e) {
            var f, g;
            return f = d.getClientRects(m(a)), f = b.filter(f, function(a) {
                return e >= a.top && e <= a.bottom
            }), g = j(f, c), g && (g = j(l(a, g), c), g && p(g.node)) ? n(g, c) : null
        }
        var p = c.isContentEditableFalse,
            q = f.findNode,
            r = a.curry;
        return {
            findClosestClientRect: j,
            findLineNodeRects: l,
            closestCaret: o
        }
    }), g("7i", ["1w", "1g", "7f", "44", "5i", "4m", "1p", "43"], function(a, b, c, d, e, f, g, h) {
        function i(a, b, c, f) {
            for (; f = e.findNode(f, a, d.isEditableCaretCandidate, b);)
                if (c(f)) return
        }

        function j(a, d, e, f, g, h) {
            function j(f) {
                var h, i, j;
                for (j = c.getClientRects(f), a == -1 && (j = j.reverse()), h = 0; h < j.length; h++)
                    if (i = j[h], !e(i, l)) {
                        if (n.length > 0 && d(i, b.last(n)) && m++, i.line = m, g(i)) return !0;
                        n.push(i)
                    }
            }
            var k, l, m = 0,
                n = [];
            return (l = b.last(h.getClientRects())) ? (k = h.getNode(), j(k), i(a, f, j, k), n) : n
        }

        function k(a, b) {
            return b.line > a
        }

        function l(a, b) {
            return b.line === a
        }

        function m(a, c, d, e) {
            function i(c) {
                return 1 == a ? b.last(c.getClientRects()) : b.last(c.getClientRects())
            }
            var j, k, l, m, n, o, p = new f(c),
                q = [],
                r = 0;
            1 == a ? (j = p.next, k = h.isBelow, l = h.isAbove, m = g.after(e)) : (j = p.prev, k = h.isAbove, l = h.isBelow, m = g.before(e)), o = i(m);
            do
                if (m.isVisible() && (n = i(m), !l(n, o))) {
                    if (q.length > 0 && k(n, b.last(q)) && r++, n = h.clone(n), n.position = m, n.line = r, d(n)) return q;
                    q.push(n)
                }
            while (m = j(m));
            return q
        }
        var n = a.curry,
            o = n(j, -1, h.isAbove, h.isBelow),
            p = n(j, 1, h.isBelow, h.isAbove);
        return {
            upUntil: o,
            downUntil: p,
            positionsUntil: m,
            isAboveLine: n(k),
            isLine: n(l)
        }
    }), g("73", ["1p", "5i", "1j", "1w"], function(a, b, c, d) {
        var e = c.isContentEditableTrue,
            f = c.isContentEditableFalse,
            g = function(a, b, c, d) {
                return b._selectionOverrides.showCaret(a, c, d)
            },
            h = function(a) {
                var b = a.ownerDocument.createRange();
                return b.selectNode(a), b
            },
            i = function(a, b) {
                var c;
                return c = a.fire("BeforeObjectSelected", {
                    target: b
                }), c.isDefaultPrevented() ? null : h(b)
            },
            j = function(c, h) {
                var i, j;
                return h = b.normalizeRange(1, c.getBody(), h), i = a.fromRangeStart(h), f(i.getNode()) ? g(1, c, i.getNode(), !i.isAtEnd()) : f(i.getNode(!0)) ? g(1, c, i.getNode(!0), !1) : (j = c.dom.getParent(i.getNode(), d.or(f, e)), f(j) ? g(1, c, j, !1) : null)
            },
            k = function(a, b) {
                var c;
                return b && b.collapsed ? (c = j(a, b), c ? c : b) : b
            };
        return {
            showCaret: g,
            selectNode: i,
            renderCaretAtRange: j,
            renderRangeCaret: k
        }
    }), g("7c", ["1k", "1p", "5i", "4m", "70", "7i", "1j", "h", "6", "73", "1g", "1w"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
        var m = g.isContentEditableFalse,
            n = h.getSelectedNode,
            o = c.isAfterContentEditableFalse,
            p = c.isBeforeContentEditableFalse,
            q = function(a, b) {
                for (; b = a(b);)
                    if (b.isVisible()) return b;
                return b
            },
            r = function(a, b) {
                var d = c.isInSameBlock(a, b);
                return !(d || !g.isBr(a.getNode())) || d
            },
            s = function(b) {
                return a.isCaretContainerBlock(b.startContainer)
            },
            t = function(a, d, e) {
                return e = c.normalizeRange(a, d, e), a === -1 ? b.fromRangeStart(e) : b.fromRangeEnd(e)
            },
            u = function(a, b, c, d, e) {
                var f, g, h, i;
                return !e.collapsed && (f = n(e), m(f)) ? j.showCaret(a, b, f, a === -1) : (i = s(e), g = t(a, b.getBody(), e), d(g) ? j.selectNode(b, g.getNode(a === -1)) : (g = c(g)) ? d(g) ? j.showCaret(a, b, g.getNode(a === -1), 1 === a) : (h = c(g), d(h) && r(g, h) ? j.showCaret(a, b, h.getNode(a === -1), 1 === a) : i ? j.renderRangeCaret(b, g.toRange()) : null) : i ? e : null)
            },
            v = function(a, b, c, d) {
                var g, h, i, l, q, r, s, u, v;
                if (v = n(d), g = t(a, b.getBody(), d), h = c(b.getBody(), f.isAboveLine(1), g), i = k.filter(h, f.isLine(1)), q = k.last(g.getClientRects()), p(g) && (v = g.getNode()), o(g) && (v = g.getNode(!0)), !q) return null;
                if (r = q.left, l = e.findClosestClientRect(i, r), l && m(l.node)) return s = Math.abs(r - l.left), u = Math.abs(r - l.right), j.showCaret(a, b, l.node, s < u);
                if (v) {
                    var w = f.positionsUntil(a, b.getBody(), f.isAboveLine(1), v);
                    if (l = e.findClosestClientRect(k.filter(w, f.isLine(1)), r)) return j.renderRangeCaret(b, l.position.toRange());
                    if (l = k.last(k.filter(w, f.isLine(0)))) return j.renderRangeCaret(b, l.position.toRange())
                }
            },
            w = function(a) {
                var b = a.dom.create(a.settings.forced_root_block);
                return (!i.ie || i.ie >= 11) && (b.innerHTML = '<br data-mce-bogus="1">'), b
            },
            x = function(a, c, e) {
                var f, g, h, i = new d(a.getBody()),
                    j = l.curry(q, i.next),
                    k = l.curry(q, i.prev);
                if (e.collapsed && a.settings.forced_root_block) {
                    if (f = a.dom.getParent(e.startContainer, "PRE"), !f) return;
                    g = 1 === c ? j(b.fromRangeStart(e)) : k(b.fromRangeStart(e)), g || (h = w(a), 1 === c ? a.$(f).after(h) : a.$(f).before(h), a.selection.select(h, !0), a.selection.collapse())
                }
            },
            y = function(a, b) {
                var c, e = new d(a.getBody()),
                    f = l.curry(q, e.next),
                    g = l.curry(q, e.prev),
                    h = b ? 1 : -1,
                    i = b ? f : g,
                    j = b ? p : o,
                    k = a.selection.getRng();
                return (c = u(h, a, i, j, k)) ? c : (c = x(a, h, k), c ? c : null)
            },
            z = function(a, b) {
                var c, d = b ? 1 : -1,
                    e = b ? f.downUntil : f.upUntil,
                    g = a.selection.getRng();
                return (c = v(d, a, e, g)) ? c : (c = x(a, d, g), c ? c : null)
            },
            A = function(a, b) {
                return function() {
                    var c = y(a, b);
                    return !!c && (a.selection.setRng(c), !0)
                }
            },
            B = function(a, b) {
                return function() {
                    var c = z(a, b);
                    return !!c && (a.selection.setRng(c), !0)
                }
            };
        return {
            moveH: A,
            moveV: B
        }
    }), g("7j", ["60", "3y", "3z"], function(a, b, c) {
        var d = function(a, b) {
                return b
            },
            e = function(b, c) {
                var d = a.isObject(b) && a.isObject(c);
                return d ? g(b, c) : c
            },
            f = function(a) {
                return function() {
                    for (var d = new b(arguments.length), e = 0; e < d.length; e++) d[e] = arguments[e];
                    if (0 === d.length) throw new c("Can't merge zero objects");
                    for (var f = {}, g = 0; g < d.length; g++) {
                        var h = d[g];
                        for (var i in h) h.hasOwnProperty(i) && (f[i] = a(f[i], h[i]))
                    }
                    return f
                }
            },
            g = f(e),
            h = f(d);
        return {
            deepMerge: g,
            merge: h
        }
    }), g("7d", ["3x", "1m", "7j"], function(a, b, c) {
        var d = function(d) {
                return a.map(d, function(a) {
                    return c.merge({
                        shiftKey: !1,
                        altKey: !1,
                        ctrlKey: !1,
                        metaKey: !1,
                        keyCode: 0,
                        action: b.noop
                    }, a)
                })
            },
            e = function(a, b) {
                return b.keyCode === a.keyCode && b.shiftKey === a.shiftKey && b.altKey === a.altKey && b.ctrlKey === a.ctrlKey && b.metaKey === a.metaKey
            },
            f = function(b, c) {
                return a.bind(d(b), function(a) {
                    return e(a, c) ? [a] : []
                })
            },
            g = function(a) {
                var b = Array.prototype.slice.call(arguments, 1);
                return function() {
                    return a.apply(null, b)
                }
            };
        return {
            match: f,
            action: g
        }
    }), g("6v", ["3x", "6b", "5o", "7c", "7d", "p"], function(a, b, c, d, e, f) {
        var g = function(b, g, h) {
                var i = e.match([{
                    keyCode: f.RIGHT,
                    action: d.moveH(b, !0)
                }, {
                    keyCode: f.LEFT,
                    action: d.moveH(b, !1)
                }, {
                    keyCode: f.UP,
                    action: d.moveV(b, !1)
                }, {
                    keyCode: f.DOWN,
                    action: d.moveV(b, !0)
                }, {
                    keyCode: f.RIGHT,
                    action: c.move(b, g, !0)
                }, {
                    keyCode: f.LEFT,
                    action: c.move(b, g, !1)
                }], h);
                a.find(i, function(a) {
                    return a.action()
                }).each(function(a) {
                    h.preventDefault()
                })
            },
            h = function(a, b) {
                a.on("keydown", function(c) {
                    c.isDefaultPrevented() === !1 && g(a, b, c)
                })
            };
        return {
            setup: h
        }
    }), g("6w", ["3x", "4i", "4j", "4k", "4l", "7d", "p"], function(a, b, c, d, e, f, g) {
        var h = function(h, i, j) {
                var k = f.match([{
                    keyCode: g.BACKSPACE,
                    action: f.action(d.backspaceDelete, h, !1)
                }, {
                    keyCode: g.DELETE,
                    action: f.action(d.backspaceDelete, h, !0)
                }, {
                    keyCode: g.BACKSPACE,
                    action: f.action(e.backspaceDelete, h, i, !1)
                }, {
                    keyCode: g.DELETE,
                    action: f.action(e.backspaceDelete, h, i, !0)
                }, {
                    keyCode: g.BACKSPACE,
                    action: f.action(c.backspaceDelete, h, !1)
                }, {
                    keyCode: g.DELETE,
                    action: f.action(c.backspaceDelete, h, !0)
                }, {
                    keyCode: g.BACKSPACE,
                    action: f.action(b.backspaceDelete, h, !1)
                }, {
                    keyCode: g.DELETE,
                    action: f.action(b.backspaceDelete, h, !0)
                }], j);
                a.find(k, function(a) {
                    return a.action()
                }).each(function(a) {
                    j.preventDefault()
                })
            },
            i = function(b, c) {
                var e = f.match([{
                    keyCode: g.BACKSPACE,
                    action: f.action(d.paddEmptyElement, b)
                }, {
                    keyCode: g.DELETE,
                    action: f.action(d.paddEmptyElement, b)
                }], c);
                a.find(e, function(a) {
                    return a.action()
                })
            },
            j = function(a, b) {
                a.on("keydown", function(c) {
                    c.isDefaultPrevented() === !1 && h(a, b, c)
                }), a.on("keyup", function(b) {
                    b.isDefaultPrevented() === !1 && i(a, b)
                })
            };
        return {
            setup: j
        }
    }), g("6x", ["1k", "1j", "h", "c", "6", "1l", "9"], function(a, b, c, d, e, f, g) {
        var h = e.ie && e.ie < 11,
            i = function(a) {
                return a && "A" === a.nodeName && 0 === g.trim(f.trim(a.innerText || a.textContent)).length
            },
            j = function(a) {
                return a && /^(TD|TH|CAPTION)$/.test(a.nodeName)
            },
            k = function(a) {
                a.innerHTML = h ? "" : '<br data-mce-bogus="1">'
            },
            l = function(a, b) {
                return a.nodeName === b || a.previousSibling && a.previousSibling.nodeName === b
            },
            m = function(a, b) {
                return b && a.isBlock(b) && !/^(TD|TH|CAPTION|FORM)$/.test(b.nodeName) && !/^(fixed|absolute)/i.test(b.style.position) && "true" !== a.getContentEditable(b)
            },
            n = function(a, b, c) {
                var d;
                a.isBlock(c) && (d = b.getRng(), c.appendChild(a.create("span", null, "\xa0")), b.select(c), c.lastChild.outerHTML = "", b.setRng(d))
            },
            o = function(a, b, c) {
                var d, e = c,
                    f = [];
                if (e) {
                    for (; e = e.firstChild;) {
                        if (a.isBlock(e)) return;
                        1 != e.nodeType || b[e.nodeName.toLowerCase()] || f.push(e)
                    }
                    for (d = f.length; d--;) e = f[d], !e.hasChildNodes() || e.firstChild == e.lastChild && "" === e.firstChild.nodeValue ? a.remove(e) : i(e) && a.remove(e)
                }
            },
            p = function(a, c, d) {
                return b.isText(c) === !1 ? d : a ? 1 === d && c.data.charAt(d - 1) === f.ZWSP ? 0 : d : d === c.data.length - 1 && c.data.charAt(d) === f.ZWSP ? c.data.length : d
            },
            q = function(a) {
                var b = a.cloneRange();
                return b.setStart(a.startContainer, p(!0, a.startContainer, a.startOffset)), b.setEnd(a.endContainer, p(!1, a.endContainer, a.endOffset)), b
            },
            r = function(a) {
                for (; a;) {
                    if (1 === a.nodeType || 3 === a.nodeType && a.data && /[\r\n\s]/.test(a.data)) return a;
                    a = a.nextSibling
                }
            },
            s = function(b) {
                function f(f) {
                    function x(a) {
                        var b, c, f, h, j = a;
                        if (a) {
                            if (e.ie && e.ie < 9 && N && N.firstChild && N.firstChild == N.lastChild && "BR" == N.firstChild.tagName && g.remove(N.firstChild), /^(LI|DT|DD)$/.test(a.nodeName)) {
                                var k = r(a.firstChild);
                                k && /^(UL|OL|DL)$/.test(k.nodeName) && a.insertBefore(g.doc.createTextNode("\xa0"), a.firstChild)
                            }
                            if (f = g.createRng(), e.ie || a.normalize(), a.hasChildNodes()) {
                                for (b = new d(a, a); c = b.current();) {
                                    if (3 == c.nodeType) {
                                        f.setStart(c, 0), f.setEnd(c, 0);
                                        break
                                    }
                                    if (w[c.nodeName.toLowerCase()]) {
                                        f.setStartBefore(c), f.setEndBefore(c);
                                        break
                                    }
                                    j = c, c = b.next()
                                }
                                c || (f.setStart(j, 0), f.setEnd(j, 0))
                            } else "BR" == a.nodeName ? a.nextSibling && g.isBlock(a.nextSibling) ? ((!O || O < 9) && (h = g.create("br"), a.parentNode.insertBefore(h, a)), f.setStartBefore(a), f.setEndBefore(a)) : (f.setStartAfter(a), f.setEndAfter(a)) : (f.setStart(a, 0), f.setEnd(a, 0));
                            i.setRng(f), g.remove(h), i.scrollIntoView(a)
                        }
                    }

                    function y(a) {
                        var b = s.forced_root_block;
                        b && b.toLowerCase() === a.tagName.toLowerCase() && g.setAttribs(a, s.forced_root_block_attrs)
                    }

                    function z(a) {
                        var b, c, d, e = L,
                            f = u.getTextInlineElements();
                        if (a || "TABLE" == T || "HR" == T ? (b = g.create(a || V), y(b)) : b = N.cloneNode(!1), d = b, s.keep_styles === !1) g.setAttrib(b, "style", null), g.setAttrib(b, "class", null);
                        else
                            do
                                if (f[e.nodeName]) {
                                    if ("_mce_caret" == e.id) continue;
                                    c = e.cloneNode(!1), g.setAttrib(c, "id", ""), b.hasChildNodes() ? (c.appendChild(b.firstChild), b.appendChild(c)) : (d = c, b.appendChild(c))
                                } while ((e = e.parentNode) && e != K);
                        return h || (d.innerHTML = '<br data-mce-bogus="1">'), b
                    }

                    function A(a) {
                        var b, c, e, f;
                        if (f = p(a, L, M), 3 == L.nodeType && (a ? f > 0 : f < L.nodeValue.length)) return !1;
                        if (L.parentNode == N && W && !a) return !0;
                        if (a && 1 == L.nodeType && L == N.firstChild) return !0;
                        if (l(L, "TABLE") || l(L, "HR")) return W && !a || !W && a;
                        for (b = new d(L, N), 3 == L.nodeType && (a && 0 === f ? b.prev() : a || f != L.nodeValue.length || b.next()); c = b.current();) {
                            if (1 === c.nodeType) {
                                if (!c.getAttribute("data-mce-bogus") && (e = c.nodeName.toLowerCase(), v[e] && "br" !== e)) return !1
                            } else if (3 === c.nodeType && !/^[ \t\r\n]*$/.test(c.nodeValue)) return !1;
                            a ? b.prev() : b.next()
                        }
                        return !0
                    }

                    function B(a, c) {
                        var d, e, f, h, i, k, l = V || "P";
                        if (e = g.getParent(a, g.isBlock), !e || !m(g, e)) {
                            if (e = e || K, k = e == b.getBody() || j(e) ? e.nodeName.toLowerCase() : e.parentNode.nodeName.toLowerCase(), !e.hasChildNodes()) return d = g.create(l), y(d), e.appendChild(d), I.setStart(d, 0), I.setEnd(d, 0), d;
                            for (h = a; h.parentNode != e;) h = h.parentNode;
                            for (; h && !g.isBlock(h);) f = h, h = h.previousSibling;
                            if (f && u.isValidChild(k, l.toLowerCase())) {
                                for (d = g.create(l), y(d), f.parentNode.insertBefore(d, f), h = f; h && !g.isBlock(h);) i = h.nextSibling, d.appendChild(h), h = i;
                                I.setStart(a, c), I.setEnd(a, c)
                            }
                        }
                        return a
                    }

                    function C() {
                        function a(a) {
                            for (var b = S[a ? "firstChild" : "lastChild"]; b && 1 != b.nodeType;) b = b[a ? "nextSibling" : "previousSibling"];
                            return b === N
                        }

                        function c() {
                            var a = S.parentNode;
                            return /^(LI|DT|DD)$/.test(a.nodeName) ? a : S
                        }
                        if (S != b.getBody()) {
                            var d = S.parentNode.nodeName;
                            /^(OL|UL|LI)$/.test(d) && (V = "LI"), Q = V ? z(V) : g.create("BR"), a(!0) && a() ? "LI" == d ? g.insertAfter(Q, c()) : g.replace(Q, S) : a(!0) ? "LI" == d ? (g.insertAfter(Q, c()), Q.appendChild(g.doc.createTextNode(" ")), Q.appendChild(S)) : S.parentNode.insertBefore(Q, S) : a() ? (g.insertAfter(Q, c()), n(g, i, Q)) : (S = c(), J = I.cloneRange(), J.setStartAfter(N), J.setEndAfter(S), R = J.extractContents(), "LI" == V && "LI" == R.firstChild.nodeName ? (Q = R.firstChild, g.insertAfter(R, S)) : (g.insertAfter(R, S), g.insertAfter(Q, S))), g.remove(N), x(Q), t.add()
                        }
                    }

                    function D() {
                        b.execCommand("InsertLineBreak", !1, f)
                    }

                    function E(a) {
                        do 3 === a.nodeType && (a.nodeValue = a.nodeValue.replace(/^[\r\n]+/, "")), a = a.firstChild; while (a)
                    }

                    function F(a) {
                        var b, c, d = g.getRoot();
                        for (b = a; b !== d && "false" !== g.getContentEditable(b);) "true" === g.getContentEditable(b) && (c = b), b = b.parentNode;
                        return b !== d ? c : d
                    }

                    function G(a) {
                        var b;
                        h || (a.normalize(), b = a.lastChild, b && !/^(left|right)$/gi.test(g.getStyle(b, "float", !0)) || g.add(a, "br"))
                    }

                    function H() {
                        Q = /^(H[1-6]|PRE|FIGURE)$/.test(T) && "HGROUP" != U ? z(V) : z(), s.end_container_on_empty_block && m(g, S) && g.isEmpty(N) ? Q = g.split(S, N) : g.insertAfter(Q, N), x(Q)
                    }
                    var I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W;
                    if (I = i.getRng(!0), !f.isDefaultPrevented()) {
                        if (!I.collapsed) return void b.execCommand("Delete");
                        if (new c(g).normalize(I), L = I.startContainer, M = I.startOffset, V = (s.force_p_newlines ? "p" : "") || s.forced_root_block, V = V ? V.toUpperCase() : "", O = g.doc.documentMode, P = f.shiftKey, 1 == L.nodeType && L.hasChildNodes() && (W = M > L.childNodes.length - 1, L = L.childNodes[Math.min(M, L.childNodes.length - 1)] || L, M = W && 3 == L.nodeType ? L.nodeValue.length : 0), K = F(L)) {
                            if (t.beforeChange(), !g.isBlock(K) && K != g.getRoot()) return void(V && !P || D());
                            if ((V && !P || !V && P) && (L = B(L, M)), N = g.getParent(L, g.isBlock), S = N ? g.getParent(N.parentNode, g.isBlock) : null, T = N ? N.nodeName.toUpperCase() : "", U = S ? S.nodeName.toUpperCase() : "", "LI" != U || f.ctrlKey || (N = S, T = U), b.undoManager.typing && (b.undoManager.typing = !1, b.undoManager.add()), /^(LI|DT|DD)$/.test(T)) {
                                if (!V && P) return void D();
                                if (g.isEmpty(N)) return void C()
                            }
                            if ("PRE" == T && s.br_in_pre !== !1) {
                                if (!P) return void D()
                            } else if (!V && !P && "LI" != T || V && P) return void D();
                            V && N === b.getBody() || (V = V || "P", a.isCaretContainerBlock(N) ? (Q = a.showCaretContainerBlock(N), g.isEmpty(N) && k(N), x(Q)) : A() ? H() : A(!0) ? (Q = N.parentNode.insertBefore(z(), N), n(g, i, Q), x(l(N, "HR") ? Q : N)) : (J = q(I).cloneRange(), J.setEndAfter(N), R = J.extractContents(), E(R), Q = R.firstChild, g.insertAfter(R, N), o(g, v, Q), G(N), g.isEmpty(N) && k(N), Q.normalize(), g.isEmpty(Q) ? (g.remove(Q), H()) : x(Q)), g.setAttrib(Q, "id", ""), b.fire("NewBlock", {
                                newBlock: Q
                            }), t.typing = !1, t.add())
                        }
                    }
                }
                var g = b.dom,
                    i = b.selection,
                    s = b.settings,
                    t = b.undoManager,
                    u = b.schema,
                    v = u.getNonEmptyElements(),
                    w = u.getMoveCaretBeforeOnEnterElements();
                b.on("keydown", function(a) {
                    13 == a.keyCode && f(a) !== !1 && a.preventDefault()
                })
            };
        return {
            setup: s
        }
    }), g("7e", ["1m", "1p", "1j", "5n"], function(a, b, c, d) {
        var e = function(a, b) {
                return i(a) && c.isText(b.container())
            },
            f = function(a, b) {
                var c = b.container(),
                    d = b.offset();
                c.insertData(d, "\xa0"), a.selection.setCursorLocation(c, d + 1)
            },
            g = function(a, b, c) {
                return !!e(c, b) && (f(a, b), !0)
            },
            h = function(c) {
                var e = b.fromRangeStart(c.selection.getRng()),
                    f = d.readLocation(c.getBody(), e);
                return f.map(a.curry(g, c, e)).getOr(!1)
            },
            i = function(b) {
                return b.fold(a.constant(!1), a.constant(!0), a.constant(!0), a.constant(!1))
            },
            j = function(a) {
                return !!a.selection.isCollapsed() && h(a)
            };
        return {
            insertAtSelection: j
        }
    }), g("6y", ["3x", "7e", "7d", "p"], function(a, b, c, d) {
        var e = function(e, f) {
                var g = c.match([{
                    keyCode: d.SPACEBAR,
                    action: c.action(b.insertAtSelection, e)
                }], f);
                a.find(g, function(a) {
                    return a.action()
                }).each(function(a) {
                    f.preventDefault()
                })
            },
            f = function(a) {
                a.on("keydown", function(b) {
                    b.isDefaultPrevented() === !1 && e(a, b)
                })
            };
        return {
            setup: f
        }
    }), g("6f", ["6v", "5o", "6w", "6x", "6y"], function(a, b, c, d, e) {
        var f = function(f) {
            var g = b.setupSelectedState(f);
            a.setup(f, g), c.setup(f, g), d.setup(f), e.setup(f)
        };
        return {
            setup: f
        }
    }), g("6g", ["h", "6", "5"], function(a, b, c) {
        return function(d) {
            function e(a) {
                var b, c;
                if (c = d.$(a).parentsUntil(d.getBody()).add(a), c.length === g.length) {
                    for (b = c.length; b >= 0 && c[b] === g[b]; b--);
                    if (b === -1) return g = c, !0
                }
                return g = c, !1
            }
            var f, g = [];
            "onselectionchange" in d.getDoc() || d.on("NodeChange Click MouseUp KeyUp Focus", function(b) {
                var c, e;
                c = d.selection.getRng(), e = {
                    startContainer: c.startContainer,
                    startOffset: c.startOffset,
                    endContainer: c.endContainer,
                    endOffset: c.endOffset
                }, "nodechange" != b.type && a.compareRanges(e, f) || d.fire("SelectionChange"), f = e
            }), d.on("contextmenu", function() {
                d.fire("SelectionChange")
            }), d.on("SelectionChange", function() {
                var a = d.selection.getStart(!0);
                !b.range && d.selection.isCollapsed() || !e(a) && d.dom.isChildOf(a, d.getBody()) && d.nodeChanged({
                    selectionChange: !0
                })
            }), d.on("MouseUp", function(a) {
                a.isDefaultPrevented() || ("IMG" == d.selection.getNode().nodeName ? c.setEditorTimeout(d, function() {
                    d.nodeChanged()
                }) : d.nodeChanged())
            }), this.nodeChanged = function(a) {
                var b, c, e, f = d.selection;
                d.initialized && f && !d.settings.disable_nodechange && !d.readonly && (e = d.getBody(), b = f.getStart(!0) || e, b.ownerDocument == d.getDoc() && d.dom.isChildOf(b, e) || (b = e), c = [], d.dom.getParent(b, function(a) {
                    return a === e || void c.push(a)
                }), a = a || {}, a.element = b, a.parents = c, d.fire("NodeChange", a))
            }
        }
    }), g("6z", ["1k", "69", "1p", "a", "1j", "h", "43", "5"], function(a, b, c, d, e, f, g, h) {
        var i = e.isContentEditableFalse,
            j = function(a) {
                return a && /^(TD|TH)$/i.test(a.nodeName)
            };
        return function(c, e) {
            function f(a, b) {
                var d, e, f, h, i, j = g.collapse(a.getBoundingClientRect(), b);
                return "BODY" == c.tagName ? (d = c.ownerDocument.documentElement, e = c.scrollLeft || d.scrollLeft, f = c.scrollTop || d.scrollTop) : (i = c.getBoundingClientRect(), e = c.scrollLeft - i.left, f = c.scrollTop - i.top), j.left += e, j.right += e, j.top += f, j.bottom += f, j.width = 1, h = a.offsetWidth - a.clientWidth, h > 0 && (b && (h *= -1), j.left += h, j.right += h), j
            }

            function k() {
                var b, e, f, g, h;
                for (b = d("*[contentEditable=false]", c), g = 0; g < b.length; g++) e = b[g], f = e.previousSibling, a.endsWithCaretContainer(f) && (h = f.data, 1 == h.length ? f.parentNode.removeChild(f) : f.deleteData(h.length - 1, 1)), f = e.nextSibling, a.startsWithCaretContainer(f) && (h = f.data, 1 == h.length ? f.parentNode.removeChild(f) : f.deleteData(0, 1));
                return null
            }

            function l(b, g) {
                var h, k;
                return m(), j(g) ? null : e(g) ? (s = a.insertBlock("p", g, b), h = f(g, b), d(s).css("top", h.top), r = d('<div class="mce-visual-caret" data-mce-bogus="all"></div>').css(h).appendTo(c), b && r.addClass("mce-visual-caret-before"), n(), k = g.ownerDocument.createRange(), k.setStart(s, 0), k.setEnd(s, 0), k) : (s = a.insertInline(g, b), k = g.ownerDocument.createRange(), i(s.nextSibling) ? (k.setStart(s, 0), k.setEnd(s, 0)) : (k.setStart(s, 1), k.setEnd(s, 1)), k)
            }

            function m() {
                k(), s && (b.remove(s), s = null), r && (r.remove(), r = null), clearInterval(q)
            }

            function n() {
                q = h.setInterval(function() {
                    d("div.mce-visual-caret", c).toggleClass("mce-visual-caret-hidden")
                }, 500)
            }

            function o() {
                h.clearInterval(q)
            }

            function p() {
                return ".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}"
            }
            var q, r, s;
            return {
                show: l,
                hide: m,
                getCss: p,
                destroy: o
            }
        }
    });
    g("7g", [], function() {
        var a = function(a) {
                var b, c, d, e;
                return e = a.getBoundingClientRect(), b = a.ownerDocument, c = b.documentElement, d = b.defaultView, {
                    top: e.top + d.pageYOffset - c.clientTop,
                    left: e.left + d.pageXOffset - c.clientLeft
                }
            },
            b = function(b) {
                return b.inline ? a(b.getBody()) : {
                    left: 0,
                    top: 0
                }
            },
            c = function(a) {
                var b = a.getBody();
                return a.inline ? {
                    left: b.scrollLeft,
                    top: b.scrollTop
                } : {
                    left: 0,
                    top: 0
                }
            },
            d = function(a) {
                var b = a.getBody(),
                    c = a.getDoc().documentElement,
                    d = {
                        left: b.scrollLeft,
                        top: b.scrollTop
                    },
                    e = {
                        left: b.scrollLeft || c.scrollLeft,
                        top: b.scrollTop || c.scrollTop
                    };
                return a.inline ? d : e
            },
            e = function(b, c) {
                if (c.target.ownerDocument !== b.getDoc()) {
                    var e = a(b.getContentAreaContainer()),
                        f = d(b);
                    return {
                        left: c.pageX - e.left + f.left,
                        top: c.pageY - e.top + f.top
                    }
                }
                return {
                    left: c.pageX,
                    top: c.pageY
                }
            },
            f = function(a, b, c) {
                return {
                    pageX: c.left - a.left + b.left,
                    pageY: c.top - a.top + b.top
                }
            },
            g = function(a, d) {
                return f(b(a), c(a), e(a, d))
            };
        return {
            calc: g
        }
    });
    g("71", ["1j", "1g", "1w", "5", "e", "7g"], function(a, b, c, d, e, f) {
        var g = a.isContentEditableFalse,
            h = a.isContentEditableTrue,
            i = function(a, b) {
                return g(b) && b !== a
            },
            j = function(a, b, c) {
                return b !== c && !a.dom.isChildOf(b, c) && !g(b)
            },
            k = function(a) {
                var b = a.cloneNode(!0);
                return b.removeAttribute("data-mce-selected"), b
            },
            l = function(a, b, c, d) {
                var e = b.cloneNode(!0);
                a.dom.setStyles(e, {
                    width: c,
                    height: d
                }), a.dom.setAttrib(e, "data-mce-selected", null);
                var f = a.dom.create("div", {
                    "class": "mce-drag-container",
                    "data-mce-bogus": "all",
                    unselectable: "on",
                    contenteditable: "false"
                });
                return a.dom.setStyles(f, {
                    position: "absolute",
                    opacity: .5,
                    overflow: "hidden",
                    border: 0,
                    padding: 0,
                    margin: 0,
                    width: c,
                    height: d
                }), a.dom.setStyles(e, {
                    margin: 0,
                    boxSizing: "border-box"
                }), f.appendChild(e), f
            },
            m = function(a, b) {
                a.parentNode !== b && b.appendChild(a)
            },
            n = function(a, b, c, d, e, f) {
                var g = 0,
                    h = 0;
                a.style.left = b.pageX + "px", a.style.top = b.pageY + "px", b.pageX + c > e && (g = b.pageX + c - e), b.pageY + d > f && (h = b.pageY + d - f), a.style.width = c - g + "px", a.style.height = d - h + "px"
            },
            o = function(a) {
                a && a.parentNode && a.parentNode.removeChild(a)
            },
            p = function(a) {
                return 0 === a.button
            },
            q = function(a) {
                return a.element
            },
            r = function(a, b) {
                return {
                    pageX: b.pageX - a.relX,
                    pageY: b.pageY + 5
                }
            },
            s = function(a, d) {
                return function(e) {
                    if (p(e)) {
                        var f = b.find(d.dom.getParents(e.target), c.or(g, h));
                        if (i(d.getBody(), f)) {
                            var j = d.dom.getPos(f),
                                k = d.getBody(),
                                m = d.getDoc().documentElement;
                            a.element = f, a.screenX = e.screenX, a.screenY = e.screenY, a.maxX = (d.inline ? k.scrollWidth : m.offsetWidth) - 2, a.maxY = (d.inline ? k.scrollHeight : m.offsetHeight) - 2, a.relX = e.pageX - j.x, a.relY = e.pageY - j.y, a.width = f.offsetWidth, a.height = f.offsetHeight, a.ghost = l(d, f, a.width, a.height)
                        }
                    }
                }
            },
            t = function(a, b) {
                var c = d.throttle(function(a, c) {
                    b._selectionOverrides.hideFakeCaret(), b.selection.placeCaretAt(a, c)
                }, 0);
                return function(d) {
                    var e = Math.max(Math.abs(d.screenX - a.screenX), Math.abs(d.screenY - a.screenY));
                    if (q(a) && !a.dragging && e > 10) {
                        var g = b.fire("dragstart", {
                            target: a.element
                        });
                        if (g.isDefaultPrevented()) return;
                        a.dragging = !0, b.focus()
                    }
                    if (a.dragging) {
                        var h = r(a, f.calc(b, d));
                        m(a.ghost, b.getBody()), n(a.ghost, h, a.width, a.height, a.maxX, a.maxY), c(d.clientX, d.clientY)
                    }
                }
            },
            u = function(a) {
                var b = a.getSel().getRangeAt(0),
                    c = b.startContainer;
                return 3 === c.nodeType ? c.parentNode : c
            },
            v = function(a, b) {
                return function(c) {
                    if (a.dragging && j(b, u(b.selection), a.element)) {
                        var d = k(a.element),
                            e = b.fire("drop", {
                                targetClone: d,
                                clientX: c.clientX,
                                clientY: c.clientY
                            });
                        e.isDefaultPrevented() || (d = e.targetClone, b.undoManager.transact(function() {
                            o(a.element), b.insertContent(b.dom.getOuterHTML(d)), b._selectionOverrides.hideFakeCaret()
                        }))
                    }
                    x(a)
                }
            },
            w = function(a, b) {
                return function() {
                    x(a), a.dragging && b.fire("dragend")
                }
            },
            x = function(a) {
                a.dragging = !1, a.element = null, o(a.ghost)
            },
            y = function(a) {
                var b, c, d, f, g, h, i = {};
                b = e.DOM, h = document, c = s(i, a), d = t(i, a), f = v(i, a), g = w(i, a), a.on("mousedown", c), a.on("mousemove", d), a.on("mouseup", f), b.bind(h, "mousemove", d), b.bind(h, "mouseup", g), a.on("remove", function() {
                    b.unbind(h, "mousemove", d), b.unbind(h, "mouseup", g)
                })
            },
            z = function(a) {
                a.on("drop", function(b) {
                    var c = "undefined" != typeof b.clientX ? a.getDoc().elementFromPoint(b.clientX, b.clientY) : null;
                    (g(c) || g(a.dom.getContentEditableParent(c))) && b.preventDefault()
                })
            },
            A = function(a) {
                y(a), z(a)
            };
        return {
            init: A
        }
    }), g("7k", [], function() {
        var a = function(a) {
            return void 0 !== a.style
        };
        return {
            isSupported: a
        }
    }), g("7h", ["60", "3x", "63", "4z", "5a", "6o", "1r", "4d", "7k", "6l", "3z", "49", "4t"], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
        var n = function(b, c, d) {
                if (!a.isString(d)) throw l.error("Invalid call to CSS.set. Property ", c, ":: Value ", d, ":: Element ", b), new k("CSS value must be a string: " + d);
                i.isSupported(b) && b.style.setProperty(c, d)
            },
            o = function(a, b) {
                i.isSupported(a) && a.style.removeProperty(b)
            },
            p = function(a, b, c) {
                var d = a.dom();
                n(d, b, c)
            },
            q = function(a, b) {
                var d = a.dom();
                c.each(b, function(a, b) {
                    n(d, b, a)
                })
            },
            r = function(a, b) {
                var d = a.dom();
                c.each(b, function(a, b) {
                    a.fold(function() {
                        o(d, b)
                    }, function(a) {
                        n(d, b, a)
                    })
                })
            },
            s = function(a, b) {
                var c = a.dom(),
                    d = m.getComputedStyle(c),
                    e = d.getPropertyValue(b),
                    g = "" !== e || f.inBody(a) ? e : t(c, b);
                return null === g ? void 0 : g
            },
            t = function(a, b) {
                return i.isSupported(a) ? a.style.getPropertyValue(b) : ""
            },
            u = function(a, b) {
                var c = a.dom(),
                    e = t(c, b);
                return d.from(e).filter(function(a) {
                    return a.length > 0
                })
            },
            v = function(a, b, c) {
                var d = g.fromTag(a);
                p(d, b, c);
                var e = u(d, b);
                return e.isSome()
            },
            w = function(a, b) {
                var c = a.dom();
                o(c, b), e.has(a, "style") && "" === j.trim(e.get(a, "style")) && e.remove(a, "style")
            },
            x = function(a, b) {
                var c = e.get(a, "style"),
                    d = b(a),
                    f = void 0 === c ? e.remove : e.set;
                return f(a, "style", c), d
            },
            y = function(a, b) {
                var c = a.dom(),
                    d = b.dom();
                i.isSupported(c) && i.isSupported(d) && (d.style.cssText = c.style.cssText)
            },
            z = function(a) {
                return a.dom().offsetWidth
            },
            A = function(a, b, c) {
                u(a, c).each(function(a) {
                    u(b, c).isNone() && p(b, c, a)
                })
            },
            B = function(a, c, d) {
                h.isElement(a) && h.isElement(c) && b.each(d, function(b) {
                    A(a, c, b)
                })
            };
        return {
            copy: y,
            set: p,
            preserve: x,
            setAll: q,
            setOptions: r,
            remove: w,
            get: s,
            getRaw: u,
            isValidValue: v,
            reflow: z,
            transfer: B
        }
    }), g("72", ["1m", "1r", "7h", "59"], function(a, b, c, d) {
        var e = function(a, b) {
                var c = b.dom();
                return c[a]
            },
            f = function(a, b) {
                return parseInt(c.get(b, a), 10)
            },
            g = a.curry(e, "clientWidth"),
            h = a.curry(e, "clientHeight"),
            i = a.curry(f, "margin-top"),
            j = a.curry(f, "margin-left"),
            k = function(a) {
                return a.dom().getBoundingClientRect()
            },
            l = function(a, b, c) {
                var d = g(a),
                    e = h(a);
                return b >= 0 && c >= 0 && b <= d && c <= e
            },
            m = function(a, b, c, d) {
                var e = k(b),
                    f = a ? e.left + b.dom().clientLeft + j(b) : 0,
                    g = a ? e.top + b.dom().clientTop + i(b) : 0,
                    h = c - f,
                    l = d - g;
                return {
                    x: h,
                    y: l
                }
            },
            n = function(a, c, e) {
                var f = b.fromDom(a.getBody()),
                    g = a.inline ? f : d.documentElement(f),
                    h = m(a.inline, g, c, e);
                return l(g, h.x, h.y)
            };
        return {
            isXYInContentArea: n
        }
    }), g("6h", ["1k", "1p", "5i", "4m", "6z", "70", "1j", "1n", "71", "72", "6", "73", "5", "p"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        function o(g) {
            function o(a) {
                return g.dom.hasClass(a, "mce-offscreen-selection")
            }

            function t() {
                var a = g.dom.get(M);
                return a ? a.getElementsByTagName("*")[0] : a
            }

            function u(a) {
                return g.dom.isBlock(a)
            }

            function v(a) {
                a && g.selection.setRng(a)
            }

            function w() {
                return g.selection.getRng()
            }

            function x(a, b) {
                g.selection.scrollIntoView(a, b)
            }

            function y(a, b, c) {
                var d;
                return d = g.fire("ShowCaret", {
                    target: b,
                    direction: a,
                    before: c
                }), d.isDefaultPrevented() ? null : (x(b, a === -1), L.show(c, b))
            }

            function z(a, d) {
                return d = c.normalizeRange(a, K, d), a == -1 ? b.fromRangeStart(d) : b.fromRangeEnd(d)
            }

            function A(b) {
                b.hasAttribute("data-mce-caret") && (a.showCaretContainerBlock(b), v(w()), x(b[0]))
            }

            function B() {
                function a(a) {
                    for (var b = g.getBody(); a && a != b;) {
                        if (p(a) || q(a)) return a;
                        a = a.parentNode
                    }
                    return null
                }

                function c(b) {
                    var c = !1;
                    b.on("touchstart", function() {
                        c = !1
                    }), b.on("touchmove", function() {
                        c = !0
                    }), b.on("touchend", function(d) {
                        var e = a(d.target);
                        q(e) && (c || (d.preventDefault(), F(l.selectNode(b, e))))
                    })
                }
                g.on("mouseup", function(a) {
                    var b = w();
                    b.collapsed && j.isXYInContentArea(g, a.clientX, a.clientY) && v(l.renderCaretAtRange(g, b))
                }), g.on("click", function(b) {
                    var c;
                    c = a(b.target), c && (q(c) && (b.preventDefault(), g.focus()), p(c) && g.dom.isChildOf(c, g.selection.getNode()) && G())
                }), g.on("blur NewBlock", function() {
                    G(), I()
                });
                var e = function(a) {
                        var c = new d(a);
                        if (!a.firstChild) return !1;
                        var e = b.before(a.firstChild),
                            f = c.next(e);
                        return f && !s(f) && !r(f)
                    },
                    u = function(a, b) {
                        var c = g.dom.getParent(a, g.dom.isBlock),
                            d = g.dom.getParent(b, g.dom.isBlock);
                        return c === d
                    },
                    x = function(a, b) {
                        var c = g.dom.getParent(a, g.dom.isBlock),
                            d = g.dom.getParent(b, g.dom.isBlock);
                        return c && !u(c, d) && e(c)
                    };
                c(g), g.on("mousedown", function(b) {
                    var c;
                    if (j.isXYInContentArea(g, b.clientX, b.clientY) !== !1)
                        if (c = a(b.target)) q(c) ? (b.preventDefault(), F(l.selectNode(g, c))) : (G(), p(c) && b.shiftKey || h.isXYWithinRange(b.clientX, b.clientY, g.selection.getRng()) || g.selection.placeCaretAt(b.clientX, b.clientY));
                        else {
                            G(), I();
                            var d = f.closestCaret(K, b.clientX, b.clientY);
                            d && (x(b.target, d.node) || (b.preventDefault(), g.getBody().focus(), v(y(1, d.node, d.before))))
                        }
                }), g.on("keypress", function(a) {
                    if (!n.modifierPressed(a)) switch (a.keyCode) {
                        default: q(g.selection.getNode()) && a.preventDefault()
                    }
                }), g.on("getSelectionRange", function(a) {
                    var b = a.range;
                    if (J) {
                        if (!J.parentNode) return void(J = null);
                        b = b.cloneRange(), b.selectNode(J), a.range = b
                    }
                }), g.on("setSelectionRange", function(a) {
                    var b;
                    b = F(a.range, a.forward), b && (a.range = b)
                }), g.on("AfterSetSelectionRange", function(a) {
                    var b = a.range;
                    E(b) || I(), o(b.startContainer.parentNode) || G()
                }), g.on("focus", function() {
                    m.setEditorTimeout(g, function() {
                        g.selection.setRng(l.renderRangeCaret(g, g.selection.getRng()))
                    }, 0)
                }), g.on("copy", function(a) {
                    var b = a.clipboardData;
                    if (!a.isDefaultPrevented() && a.clipboardData && !k.ie) {
                        var c = t();
                        c && (a.preventDefault(), b.clearData(), b.setData("text/html", c.outerHTML), b.setData("text/plain", c.outerText))
                    }
                }), i.init(g)
            }

            function C() {
                var a = g.contentStyles,
                    b = ".mce-content-body";
                a.push(L.getCss()), a.push(b + " .mce-offscreen-selection {position: absolute;left: -9999999999px;max-width: 1000000px;}" + b + " *[contentEditable=false] {cursor: default;}" + b + " *[contentEditable=true] {cursor: text;}")
            }

            function D(b) {
                return a.isCaretContainer(b) || a.startsWithCaretContainer(b) || a.endsWithCaretContainer(b)
            }

            function E(a) {
                return D(a.startContainer) || D(a.endContainer);
            }

            function F(a, b) {
                var c, d, e, f, h, i, j, l, m, n, o = g.$,
                    p = g.dom;
                if (!a) return null;
                if (a.collapsed) {
                    if (!E(a))
                        if (b === !1) {
                            if (l = z(-1, a), q(l.getNode(!0))) return y(-1, l.getNode(!0), !1);
                            if (q(l.getNode())) return y(-1, l.getNode(), !l.isAtEnd())
                        } else {
                            if (l = z(1, a), q(l.getNode())) return y(1, l.getNode(), !l.isAtEnd());
                            if (q(l.getNode(!0))) return y(1, l.getNode(!0), !1)
                        }
                    return null
                }
                return f = a.startContainer, h = a.startOffset, i = a.endOffset, 3 == f.nodeType && 0 == h && q(f.parentNode) && (f = f.parentNode, h = p.nodeIndex(f), f = f.parentNode), 1 != f.nodeType ? null : (i == h + 1 && (c = f.childNodes[h]), q(c) ? (m = n = c.cloneNode(!0), j = g.fire("ObjectSelected", {
                    target: c,
                    targetClone: m
                }), j.isDefaultPrevented() ? null : (m = j.targetClone, d = o("#" + M), 0 === d.length && (d = o('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>').attr("id", M), d.appendTo(g.getBody())), a = g.dom.createRng(), m === n && k.ie ? (d.empty().append('<p style="font-size: 0" data-mce-bogus="all">\xa0</p>').append(m), a.setStartAfter(d[0].firstChild.firstChild), a.setEndAfter(m)) : (d.empty().append("\xa0").append(m).append("\xa0"), a.setStart(d[0].firstChild, 1), a.setEnd(d[0].lastChild, 0)), d.css({
                    top: p.getPos(c, g.getBody()).y
                }), d[0].focus(), e = g.selection.getSel(), e.removeAllRanges(), e.addRange(a), g.$("*[data-mce-selected]").removeAttr("data-mce-selected"), c.setAttribute("data-mce-selected", 1), J = c, I(), a)) : null)
            }

            function G() {
                J && (J.removeAttribute("data-mce-selected"), g.$("#" + M).remove(), J = null)
            }

            function H() {
                L.destroy(), J = null
            }

            function I() {
                L.hide()
            }
            var J, K = g.getBody(),
                L = new e(g.getBody(), u),
                M = "sel-" + g.dom.uniqueId();
            return k.ceFalse && (B(), C()), {
                showCaret: y,
                showBlockCaretContainer: A,
                hideFakeCaret: I,
                destroy: H
            }
        }
        var p = g.isContentEditableTrue,
            q = g.isContentEditableFalse,
            r = c.isAfterContentEditableFalse,
            s = c.isBeforeContentEditableFalse;
        return o
    }), g("74", ["e"], function(a) {
        function b(b, c, d) {
            for (var e = []; c && c != b; c = c.parentNode) e.push(a.nodeIndex(c, d));
            return e
        }

        function c(a, b) {
            var c, d, e;
            for (d = a, c = b.length - 1; c >= 0; c--) {
                if (e = d.childNodes, b[c] > e.length - 1) return null;
                d = e[b[c]]
            }
            return d
        }
        return {
            create: b,
            resolve: c
        }
    }), g("6i", ["p", "h", "c", "74", "i", "d", "6", "9", "5", "1k", "1p", "4m"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
        return function(c) {
            function d(a, b) {
                try {
                    c.getDoc().execCommand(a, !1, b)
                } catch (a) {}
            }

            function m() {
                var a = c.getDoc().documentMode;
                return a ? a : 6
            }

            function n(a) {
                return a.isDefaultPrevented()
            }

            function o(a) {
                var b, d;
                a.dataTransfer && (c.selection.isCollapsed() && "IMG" == a.target.tagName && _.select(a.target), b = c.selection.getContent(), b.length > 0 && (d = ga + escape(c.id) + "," + escape(b), a.dataTransfer.setData(ha, d)))
            }

            function p(a) {
                var b;
                return a.dataTransfer && (b = a.dataTransfer.getData(ha), b && b.indexOf(ga) >= 0) ? (b = b.substr(ga.length).split(","), {
                    id: unescape(b[0]),
                    html: unescape(b[1])
                }) : null
            }

            function q(a, b) {
                c.queryCommandSupported("mceInsertClipboardContent") ? c.execCommand("mceInsertClipboardContent", !1, {
                    content: a,
                    internal: b
                }) : c.execCommand("mceInsertContent", !1, a)
            }

            function r() {
                function a(a) {
                    var b = $.create("body"),
                        c = a.cloneContents();
                    return b.appendChild(c), _.serializer.serialize(b, {
                        format: "html"
                    })
                }

                function d(d) {
                    if (!d.setStart) {
                        if (d.item) return !1;
                        var e = d.duplicate();
                        return e.moveToElementText(c.getBody()), b.compareRanges(d, e)
                    }
                    var f = a(d),
                        g = $.createRng();
                    g.selectNode(c.getBody());
                    var h = a(g);
                    return f === h
                }
                c.on("keydown", function(a) {
                    var b, e, f = a.keyCode;
                    if (!n(a) && (f == Z || f == Y)) {
                        if (b = c.selection.isCollapsed(), e = c.getBody(), b && !$.isEmpty(e)) return;
                        if (!b && !d(c.selection.getRng())) return;
                        a.preventDefault(), c.setContent(""), e.firstChild && $.isBlock(e.firstChild) ? c.selection.setCursorLocation(e.firstChild, 0) : c.selection.setCursorLocation(e, 0), c.nodeChanged()
                    }
                })
            }

            function s() {
                c.shortcuts.add("meta+a", null, "SelectAll")
            }

            function t() {
                c.settings.content_editable || $.bind(c.getDoc(), "mousedown mouseup", function(a) {
                    var b;
                    if (a.target == c.getDoc().documentElement)
                        if (b = _.getRng(), c.getBody().focus(), "mousedown" == a.type) {
                            if (j.isCaretContainer(b.startContainer)) return;
                            _.placeCaretAt(a.clientX, a.clientY)
                        } else _.setRng(b)
                })
            }

            function u() {
                c.on("keydown", function(a) {
                    if (!n(a) && a.keyCode === Y) {
                        if (!c.getBody().getElementsByTagName("hr").length) return;
                        if (_.isCollapsed() && 0 === _.getRng(!0).startOffset) {
                            var b = _.getNode(),
                                d = b.previousSibling;
                            if ("HR" == b.nodeName) return $.remove(b), void a.preventDefault();
                            d && d.nodeName && "hr" === d.nodeName.toLowerCase() && ($.remove(d), a.preventDefault())
                        }
                    }
                })
            }

            function v() {
                window.Range.prototype.getClientRects || c.on("mousedown", function(a) {
                    if (!n(a) && "HTML" === a.target.nodeName) {
                        var b = c.getBody();
                        b.blur(), i.setEditorTimeout(c, function() {
                            b.focus()
                        })
                    }
                })
            }

            function w() {
                c.on("click", function(a) {
                    var b = a.target;
                    /^(IMG|HR)$/.test(b.nodeName) && "false" !== $.getContentEditableParent(b) && (a.preventDefault(), c.selection.select(b), c.nodeChanged()), "A" == b.nodeName && $.hasClass(b, "mce-item-anchor") && (a.preventDefault(), _.select(b))
                })
            }

            function x() {
                function a() {
                    var a = $.getAttribs(_.getStart().cloneNode(!1));
                    return function() {
                        var b = _.getStart();
                        b !== c.getBody() && ($.setAttrib(b, "style", null), X(a, function(a) {
                            b.setAttributeNode(a.cloneNode(!0))
                        }))
                    }
                }

                function b() {
                    return !_.isCollapsed() && $.getParent(_.getStart(), $.isBlock) != $.getParent(_.getEnd(), $.isBlock)
                }
                c.on("keypress", function(d) {
                    var e;
                    if (!n(d) && (8 == d.keyCode || 46 == d.keyCode) && b()) return e = a(), c.getDoc().execCommand("delete", !1, null), e(), d.preventDefault(), !1
                }), $.bind(c.getDoc(), "cut", function(d) {
                    var e;
                    !n(d) && b() && (e = a(), i.setEditorTimeout(c, function() {
                        e()
                    }))
                })
            }

            function y() {
                document.body.setAttribute("role", "application")
            }

            function z() {
                c.on("keydown", function(a) {
                    if (!n(a) && a.keyCode === Y && _.isCollapsed() && 0 === _.getRng(!0).startOffset) {
                        var b = _.getNode().previousSibling;
                        if (b && b.nodeName && "table" === b.nodeName.toLowerCase()) return a.preventDefault(), !1
                    }
                })
            }

            function A() {
                m() > 7 || (d("RespectVisibilityInDesign", !0), c.contentStyles.push(".mceHideBrInPre pre br {display: none}"), $.addClass(c.getBody(), "mceHideBrInPre"), ba.addNodeFilter("pre", function(a) {
                    for (var b, c, d, f, g = a.length; g--;)
                        for (b = a[g].getAll("br"), c = b.length; c--;) d = b[c], f = d.prev, f && 3 === f.type && "\n" != f.value.charAt(f.value - 1) ? f.value += "\n" : d.parent.insert(new e("#text", 3), d, !0).value = "\n"
                }), ca.addNodeFilter("pre", function(a) {
                    for (var b, c, d, e, f = a.length; f--;)
                        for (b = a[f].getAll("br"), c = b.length; c--;) d = b[c], e = d.prev, e && 3 == e.type && (e.value = e.value.replace(/\r?\n$/, ""))
                }))
            }

            function B() {
                $.bind(c.getBody(), "mouseup", function() {
                    var a, b = _.getNode();
                    "IMG" == b.nodeName && ((a = $.getStyle(b, "width")) && ($.setAttrib(b, "width", a.replace(/[^0-9%]+/g, "")), $.setStyle(b, "width", "")), (a = $.getStyle(b, "height")) && ($.setAttrib(b, "height", a.replace(/[^0-9%]+/g, "")), $.setStyle(b, "height", "")))
                })
            }

            function C() {
                c.on("keydown", function(b) {
                    var d, e, f, g, h;
                    if (!n(b) && b.keyCode == a.BACKSPACE && (d = _.getRng(), e = d.startContainer, f = d.startOffset, g = $.getRoot(), h = e, d.collapsed && 0 === f)) {
                        for (; h && h.parentNode && h.parentNode.firstChild == h && h.parentNode != g;) h = h.parentNode;
                        "BLOCKQUOTE" === h.tagName && (c.formatter.toggle("blockquote", null, h), d = $.createRng(), d.setStart(e, 0), d.setEnd(e, 0), _.setRng(d))
                    }
                })
            }

            function D() {
                function a() {
                    U(), d("StyleWithCSS", !1), d("enableInlineTableEditing", !1), aa.object_resizing || d("enableObjectResizing", !1)
                }
                aa.readonly || c.on("BeforeExecCommand MouseDown", a)
            }

            function E() {
                function a() {
                    X($.select("a"), function(a) {
                        var b = a.parentNode,
                            c = $.getRoot();
                        if (b.lastChild === a) {
                            for (; b && !$.isBlock(b);) {
                                if (b.parentNode.lastChild !== b || b === c) return;
                                b = b.parentNode
                            }
                            $.add(b, "br", {
                                "data-mce-bogus": 1
                            })
                        }
                    })
                }
                c.on("SetContent ExecCommand", function(b) {
                    "setcontent" != b.type && "mceInsertLink" !== b.command || a()
                })
            }

            function F() {
                aa.forced_root_block && c.on("init", function() {
                    d("DefaultParagraphSeparator", aa.forced_root_block)
                })
            }

            function G() {
                c.on("keydown", function(a) {
                    var b;
                    n(a) || a.keyCode != Y || (b = c.getDoc().selection.createRange(), b && b.item && (a.preventDefault(), c.undoManager.beforeChange(), $.remove(b.item(0)), c.undoManager.add()))
                })
            }

            function H() {
                var a;
                m() >= 10 && (a = "", X("p div h1 h2 h3 h4 h5 h6".split(" "), function(b, c) {
                    a += (c > 0 ? "," : "") + b + ":empty"
                }), c.contentStyles.push(a + "{padding-right: 1px !important}"))
            }

            function I() {
                m() < 9 && (ba.addNodeFilter("noscript", function(a) {
                    for (var b, c, d = a.length; d--;) b = a[d], c = b.firstChild, c && b.attr("data-mce-innertext", c.value)
                }), ca.addNodeFilter("noscript", function(a) {
                    for (var b, c, d, g = a.length; g--;) b = a[g], c = a[g].firstChild, c ? c.value = f.decode(c.value) : (d = b.attributes.map["data-mce-innertext"], d && (b.attr("data-mce-innertext", null), c = new e("#text", 3), c.value = d, c.raw = !0, b.append(c)))
                }))
            }

            function J() {
                function a(a, b) {
                    var c = h.createTextRange();
                    try {
                        c.moveToPoint(a, b)
                    } catch (a) {
                        c = null
                    }
                    return c
                }

                function b(b) {
                    var d;
                    b.button ? (d = a(b.x, b.y), d && (d.compareEndPoints("StartToStart", e) > 0 ? d.setEndPoint("StartToStart", e) : d.setEndPoint("EndToEnd", e), d.select())) : c()
                }

                function c() {
                    var a = g.selection.createRange();
                    e && !a.item && 0 === a.compareEndPoints("StartToEnd", a) && e.select(), $.unbind(g, "mouseup", c), $.unbind(g, "mousemove", b), e = d = 0
                }
                var d, e, f, g = $.doc,
                    h = g.body;
                g.documentElement.unselectable = !0, $.bind(g, "mousedown contextmenu", function(h) {
                    if ("HTML" === h.target.nodeName) {
                        if (d && c(), f = g.documentElement, f.scrollHeight > f.clientHeight) return;
                        d = 1, e = a(h.x, h.y), e && ($.bind(g, "mouseup", c), $.bind(g, "mousemove", b), $.getRoot().focus(), e.select())
                    }
                })
            }

            function K() {
                c.on("keyup focusin mouseup", function(b) {
                    65 == b.keyCode && a.metaKeyPressed(b) || _.normalize()
                }, !0)
            }

            function L() {
                c.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")
            }

            function M() {
                c.inline || c.on("keydown", function() {
                    document.activeElement == document.body && c.getWin().focus()
                })
            }

            function N() {
                c.inline || (c.contentStyles.push("body {min-height: 150px}"), c.on("click", function(a) {
                    var b;
                    if ("HTML" == a.target.nodeName) {
                        if (g.ie > 11) return void c.getBody().focus();
                        b = c.selection.getRng(), c.getBody().focus(), c.selection.setRng(b), c.selection.normalize(), c.nodeChanged()
                    }
                }))
            }

            function O() {
                g.mac && c.on("keydown", function(b) {
                    !a.metaKeyPressed(b) || b.shiftKey || 37 != b.keyCode && 39 != b.keyCode || (b.preventDefault(), c.selection.getSel().modify("move", 37 == b.keyCode ? "backward" : "forward", "lineboundary"))
                })
            }

            function P() {
                d("AutoUrlDetect", !1)
            }

            function Q() {
                c.on("click", function(a) {
                    var b = a.target;
                    do
                        if ("A" === b.tagName) return void a.preventDefault();
                    while (b = b.parentNode)
                }), c.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")
            }

            function R() {
                c.on("init", function() {
                    c.dom.bind(c.getBody(), "submit", function(a) {
                        a.preventDefault()
                    })
                })
            }

            function S() {
                ba.addNodeFilter("br", function(a) {
                    for (var b = a.length; b--;) "Apple-interchange-newline" == a[b].attr("class") && a[b].remove()
                })
            }

            function T() {
                c.on("dragstart", function(a) {
                    o(a)
                }), c.on("drop", function(a) {
                    if (!n(a)) {
                        var d = p(a);
                        if (d && d.id != c.id) {
                            a.preventDefault();
                            var e = b.getCaretRangeFromPoint(a.x, a.y, c.getDoc());
                            _.setRng(e), q(d.html, !0)
                        }
                    }
                })
            }

            function U() {}

            function V() {
                var a;
                return !da || c.removed ? 0 : (a = c.selection.getSel(), !a || !a.rangeCount || 0 === a.rangeCount)
            }

            function W() {
                function b(a) {
                    var b = new l(a.getBody()),
                        c = a.selection.getRng(),
                        d = k.fromRangeStart(c),
                        e = k.fromRangeEnd(c),
                        f = b.prev(d),
                        g = b.next(e);
                    return !a.selection.isCollapsed() && (!f || f.isAtStart() && d.isEqual(f)) && (!g || g.isAtEnd() && d.isEqual(g))
                }
                c.on("keypress", function(d) {
                    !n(d) && !_.isCollapsed() && d.charCode > 31 && !a.metaKeyPressed(d) && b(c) && (d.preventDefault(), c.setContent(String.fromCharCode(d.charCode)), c.selection.select(c.getBody(), !0), c.selection.collapse(!1), c.nodeChanged())
                }), c.on("keydown", function(a) {
                    var d = a.keyCode;
                    n(a) || d != Z && d != Y || b(c) && (a.preventDefault(), c.setContent(""), c.nodeChanged())
                })
            }
            var X = h.each,
                Y = a.BACKSPACE,
                Z = a.DELETE,
                $ = c.dom,
                _ = c.selection,
                aa = c.settings,
                ba = c.parser,
                ca = c.serializer,
                da = g.gecko,
                ea = g.ie,
                fa = g.webkit,
                ga = "data:text/mce-internal,",
                ha = ea ? "Text" : "URL";
            return C(), r(), g.windowsPhone || K(), fa && (W(), t(), w(), F(), R(), z(), S(), g.iOS ? (M(), N(), Q()) : s()), ea && g.ie < 11 && (u(), y(), A(), B(), G(), H(), I(), J()), g.ie >= 11 && (N(), z()), g.ie && (s(), P(), T()), da && (W(), u(), v(), x(), D(), E(), L(), O(), z()), {
                refreshContentEditable: U,
                isHidden: V
            }
        }
    }), g("5r", ["22", "4t", "6c", "e", "s", "o", "6d", "2b", "6e", "t", "l", "i", "j", "6f", "6g", "6h", "u", "5", "6i", "9"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
        var u = d.DOM,
            v = function(a) {
                var b = new k(a.settings, a.schema);
                return b.addAttributeFilter("src,href,style,tabindex", function(b, c) {
                    for (var d, e, f, g = b.length, h = a.dom; g--;)
                        if (d = b[g], e = d.attr(c), f = "data-mce-" + c, !d.attributes.map[f]) {
                            if (0 === e.indexOf("data:") || 0 === e.indexOf("blob:")) continue;
                            "style" === c ? (e = h.serializeStyle(h.parseStyle(e), d.name), e.length || (e = null), d.attr(f, e), d.attr(c, e)) : "tabindex" === c ? (d.attr(f, e), d.attr(c, null)) : d.attr(f, a.convertURL(e, c, d.name))
                        }
                }), b.addNodeFilter("script", function(a) {
                    for (var b, c, d = a.length; d--;) b = a[d], c = b.attr("type") || "no/type", 0 !== c.indexOf("mce-") && b.attr("type", "mce-" + c)
                }), b.addNodeFilter("#cdata", function(a) {
                    for (var b, c = a.length; c--;) b = a[c], b.type = 8, b.name = "#comment", b.value = "[CDATA[" + b.value + "]]"
                }), b.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div", function(b) {
                    for (var c, d = b.length, e = a.schema.getNonEmptyElements(); d--;) c = b[d], c.isEmpty(e) && 0 === c.getAll("br").length && (c.append(new l("br", 1)).shortEnded = !0)
                }), b
            },
            w = function(a) {
                a.settings.auto_focus && r.setEditorTimeout(a, function() {
                    var b;
                    b = a.settings.auto_focus === !0 ? a : a.editorManager.get(a.settings.auto_focus), b.destroyed || b.focus()
                }, 100)
            },
            x = function(a) {
                a.bindPendingEventDelegates(), a.initialized = !0, a.fire("init"), a.focus(!0), a.nodeChanged({
                    initial: !0
                }), a.execCallback("init_instance_callback", a), w(a)
            },
            y = function(a) {
                return a.inline ? u.styleSheetLoader : a.dom.styleSheetLoader
            },
            z = function(k, l) {
                var r, w, z = k.settings,
                    A = k.getElement(),
                    B = k.getDoc();
                z.inline || (k.getElement().style.visibility = k.orgVisibility), l || z.content_editable || (B.open(), B.write(k.iframeHTML), B.close()), z.content_editable && (k.on("remove", function() {
                    var a = this.getBody();
                    u.removeClass(a, "mce-content-body"), u.removeClass(a, "mce-edit-focus"), u.setAttrib(a, "contentEditable", null)
                }), u.addClass(A, "mce-content-body"), k.contentDocument = B = z.content_document || a, k.contentWindow = z.content_window || b, k.bodyElement = A, z.content_document = z.content_window = null, z.root_name = A.nodeName.toLowerCase()), r = k.getBody(), r.disabled = !0, k.readonly = z.readonly, k.readonly || (k.inline && "static" === u.getStyle(r, "position", !0) && (r.style.position = "relative"), r.contentEditable = k.getParam("content_editable_state", !0)), r.disabled = !1, k.editorUpload = new g(k), k.schema = new m(z), k.dom = new d(B, {
                    keep_values: !0,
                    url_converter: k.convertURL,
                    url_converter_scope: k,
                    hex_colors: z.force_hex_style_colors,
                    class_filter: z.class_filter,
                    update_styles: !0,
                    root_element: k.inline ? k.getBody() : null,
                    collect: z.content_editable,
                    schema: k.schema,
                    onSetAttrib: function(a) {
                        k.fire("SetAttrib", a)
                    }
                }), k.parser = v(k), k.serializer = new f(z, k), k.selection = new e(k.dom, k.getWin(), k.serializer, k), k.formatter = new j(k), k.undoManager = new q(k), k._nodeChangeDispatcher = new o(k), k._selectionOverrides = new p(k), c.setup(k), n.setup(k), i.setup(k), k.fire("PreInit"), z.browser_spellcheck || z.gecko_spellcheck || (B.body.spellcheck = !1, u.setAttrib(r, "spellcheck", "false")), k.quirks = new s(k), k.fire("PostRender"), z.directionality && (r.dir = z.directionality), z.nowrap && (r.style.whiteSpace = "nowrap"), z.protect && k.on("BeforeSetContent", function(a) {
                    t.each(z.protect, function(b) {
                        a.content = a.content.replace(b, function(a) {
                            return "<!--mce:protected " + escape(a) + "-->"
                        })
                    })
                }), k.on("SetContent", function() {
                    k.addVisual(k.getBody())
                }), z.padd_empty_editor && k.on("PostProcess", function(a) {
                    a.content = a.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|<br \/>|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/, "")
                }), k.load({
                    initial: !0,
                    format: "html"
                }), k.startContent = k.getContent({
                    format: "raw"
                }), k.on("compositionstart compositionend", function(a) {
                    k.composing = "compositionstart" === a.type
                }), k.contentStyles.length > 0 && (w = "", t.each(k.contentStyles, function(a) {
                    w += a + "\r\n"
                }), k.dom.addStyle(w)), y(k).loadAll(k.contentCSS, function(a) {
                    x(k)
                }, function(a) {
                    x(k), h.contentCssError(k, a)
                })
            };
        return {
            initContentBody: z
        }
    }), g("4v", ["g"], function(a) {
        return a.PluginManager
    }), g("4w", ["g"], function(a) {
        return a.ThemeManager
    }), g("4u", ["22", "4t", "e", "6", "5r", "4v", "4w", "9", "2a"], function(a, b, c, d, e, f, g, h, i) {
        var j = c.DOM,
            k = function(a, b, c) {
                var d, e, g = f.get(c);
                if (d = f.urls[c] || a.documentBaseUrl.replace(/\/$/, ""), c = h.trim(c), g && h.inArray(b, c) === -1) {
                    if (h.each(f.dependencies(c), function(c) {
                            k(a, b, c)
                        }), a.plugins[c]) return;
                    e = new g(a, d, a.$), a.plugins[c] = e, e.init && (e.init(a, d), b.push(c))
                }
            },
            l = function(a) {
                var b = [];
                h.each(a.settings.plugins.replace(/\-/g, "").split(/[ ,]/), function(c) {
                    k(a, b, c)
                })
            },
            m = function(a) {
                var b, c = a.settings;
                c.theme && ("function" != typeof c.theme ? (c.theme = c.theme.replace(/-/, ""), b = g.get(c.theme), a.theme = new b(a, g.urls[c.theme]), a.theme.init && a.theme.init(a, g.urls[c.theme] || a.documentBaseUrl.replace(/\/$/, ""), a.$)) : a.theme = c.theme)
            },
            n = function(a) {
                var b, c, d, e, f, g = a.settings,
                    h = a.getElement();
                return g.render_ui && a.theme && (a.orgDisplay = h.style.display, "function" != typeof g.theme ? (b = g.width || j.getStyle(h, "width") || "100%", c = g.height || j.getStyle(h, "height") || h.offsetHeight, d = g.min_height || 100, e = /^[0-9\.]+(|px)$/i, e.test("" + b) && (b = Math.max(parseInt(b, 10), 100)), e.test("" + c) && (c = Math.max(parseInt(c, 10), d)), f = a.theme.renderUI({
                    targetNode: h,
                    width: b,
                    height: c,
                    deltaWidth: g.delta_width,
                    deltaHeight: g.delta_height
                }), g.content_editable || (c = (f.iframeHeight || c) + ("number" == typeof c ? f.deltaHeight || 0 : ""), c < d && (c = d))) : (f = g.theme(a, h), f.editorContainer.nodeType && (f.editorContainer.id = f.editorContainer.id || a.id + "_parent"), f.iframeContainer.nodeType && (f.iframeContainer.id = f.iframeContainer.id || a.id + "_iframecontainer"), c = f.iframeHeight || h.offsetHeight), a.editorContainer = f.editorContainer, f.height = c), f
            },
            o = function(c, f) {
                if (a.domain !== b.location.hostname && d.ie && d.ie < 12) {
                    var g = i.uuid("mce");
                    c[g] = function() {
                        e.initContentBody(c)
                    };
                    var h = 'javascript:(function(){document.open();document.domain="' + a.domain + '";var ed = window.parent.tinymce.get("' + c.id + '");document.write(ed.iframeHTML);document.close();ed.' + g + "(true);})()";
                    return j.setAttrib(f, "src", h), !0
                }
                return !1
            },
            p = function(a, b) {
                var c, e, f = a.settings;
                a.iframeHTML = f.doctype + "<html><head>", f.document_base_url != a.documentBaseUrl && (a.iframeHTML += '<base href="' + a.documentBaseURI.getURI() + '" />'), !d.caretAfter && f.ie7_compat && (a.iframeHTML += '<meta http-equiv="X-UA-Compatible" content="IE=7" />'), a.iframeHTML += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />', c = f.body_id || "tinymce", c.indexOf("=") != -1 && (c = a.getParam("body_id", "", "hash"), c = c[a.id] || c), e = f.body_class || "", e.indexOf("=") != -1 && (e = a.getParam("body_class", "", "hash"), e = e[a.id] || ""), f.content_security_policy && (a.iframeHTML += '<meta http-equiv="Content-Security-Policy" content="' + f.content_security_policy + '" />'), a.iframeHTML += '</head><body id="' + c + '" class="mce-content-body ' + e + '" data-id="' + a.id + '"><br></body></html>';
                var g = j.create("iframe", {
                    id: a.id + "_ifr",
                    frameBorder: "0",
                    allowTransparency: "true",
                    title: a.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),
                    style: {
                        width: "100%",
                        height: b.height,
                        display: "block"
                    }
                });
                g.onload = function() {
                    g.onload = null, a.fire("load")
                };
                var h = o(a, g);
                return a.contentAreaContainer = b.iframeContainer, a.iframeElement = g, j.add(b.iframeContainer, g), h
            },
            q = function(a) {
                var b, c = a.settings,
                    d = a.getElement();
                if (a.rtl = c.rtl_ui || a.editorManager.i18n.rtl, a.editorManager.i18n.setCode(c.language), c.aria_label = c.aria_label || j.getAttrib(d, "aria-label", a.getLang("aria.rich_text_area")), a.fire("ScriptsLoaded"), m(a), l(a), b = n(a), c.content_css && h.each(h.explode(c.content_css), function(b) {
                        a.contentCSS.push(a.documentBaseURI.toAbsolute(b))
                    }), c.content_style && a.contentStyles.push(c.content_style), c.content_editable) return e.initContentBody(a);
                var f = p(a, b);
                b.editorContainer && (j.get(b.editorContainer).style.display = a.orgDisplay, a.hidden = j.isHidden(b.editorContainer)), a.getElement().style.display = "none", j.setAttrib(a.id, "aria-hidden", !0), f || e.initContentBody(a)
            };
        return {
            init: q
        }
    }), g("27", ["4t", "e", "7", "f", "6", "2b", "4u", "11", "4v", "4w", "9", "10"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
        var m = b.DOM,
            n = function(a, b) {
                var c = a.settings,
                    e = d.ScriptLoader;
                if (c.language && "en" != c.language && !c.language_url && (c.language_url = a.editorManager.baseURL + "/langs/" + c.language + ".js"), c.language_url && e.add(c.language_url), c.theme && "function" != typeof c.theme && "-" != c.theme.charAt(0) && !j.urls[c.theme]) {
                    var h = c.theme_url;
                    h = h ? a.documentBaseURI.toAbsolute(h) : "themes/" + c.theme + "/theme" + b + ".js", j.load(c.theme, h)
                }
                k.isArray(c.plugins) && (c.plugins = c.plugins.join(" ")), k.each(c.external_plugins, function(a, b) {
                    i.load(b, a), c.plugins += " " + b
                }), k.each(c.plugins.split(/[ ,]/), function(a) {
                    if (a = k.trim(a), a && !i.urls[a])
                        if ("-" === a.charAt(0)) {
                            a = a.substr(1, a.length);
                            var c = i.dependencies(a);
                            k.each(c, function(a) {
                                var c = {
                                    prefix: "plugins/",
                                    resource: a,
                                    suffix: "/plugin" + b + ".js"
                                };
                                a = i.createUrl(c, a), i.load(a.resource, a)
                            })
                        } else i.load(a, {
                            prefix: "plugins/",
                            resource: a,
                            suffix: "/plugin" + b + ".js"
                        })
                }), e.loadQueue(function() {
                    a.removed || g.init(a)
                }, a, function(b) {
                    f.pluginLoadError(a, b[0]), a.removed || g.init(a)
                })
            },
            o = function(b) {
                function d() {
                    m.unbind(a, "ready", d), b.render()
                }
                var f = b.settings,
                    g = b.id;
                if (!c.Event.domLoaded) return void m.bind(a, "ready", d);
                if (b.getElement() && e.contentEditable) {
                    f.inline ? b.inline = !0 : (b.orgVisibility = b.getElement().style.visibility, b.getElement().style.visibility = "hidden");
                    var i = b.getElement().form || m.getParent(g, "form");
                    i && (b.formElement = i, f.hidden_input && !/TEXTAREA|INPUT/i.test(b.getElement().nodeName) && (m.insertAfter(m.create("input", {
                        type: "hidden",
                        name: g
                    }), g), b.hasHiddenInput = !0), b.formEventDelegate = function(a) {
                        b.fire(a.type, a)
                    }, m.bind(i, "submit reset", b.formEventDelegate), b.on("reset", function() {
                        b.setContent(b.startContent, {
                            format: "raw"
                        })
                    }), !f.submit_patch || i.submit.nodeType || i.submit.length || i._mceOldSubmit || (i._mceOldSubmit = i.submit, i.submit = function() {
                        return b.editorManager.triggerSave(), b.setDirty(!1), i._mceOldSubmit(i)
                    })), b.windowManager = new l(b), b.notificationManager = new h(b), "xml" === f.encoding && b.on("GetContent", function(a) {
                        a.save && (a.content = m.encode(a.content))
                    }), f.add_form_submit_trigger && b.on("submit", function() {
                        b.initialized && b.save()
                    }), f.add_unload_trigger && (b._beforeUnload = function() {
                        !b.initialized || b.destroyed || b.isHidden() || b.save({
                            format: "raw",
                            no_events: !0,
                            set_dirty: !1
                        })
                    }, b.editorManager.on("BeforeUnload", b._beforeUnload)), b.editorManager.add(b), n(b, b.suffix)
                }
            };
        return {
            render: o
        }
    }), g("28", [], function() {
        function a(a, b, c) {
            try {
                a.getDoc().execCommand(b, !1, c)
            } catch (a) {}
        }

        function b(a) {
            var b, c;
            return b = a.getBody(), c = function(b) {
                a.dom.getParents(b.target, "a").length > 0 && b.preventDefault()
            }, a.dom.bind(b, "click", c), {
                unbind: function() {
                    a.dom.unbind(b, "click", c)
                }
            }
        }

        function c(c, d) {
            c._clickBlocker && (c._clickBlocker.unbind(), c._clickBlocker = null), d ? (c._clickBlocker = b(c), c.selection.controlSelection.hideResizeRect(), c.readonly = !0, c.getBody().contentEditable = !1) : (c.readonly = !1, c.getBody().contentEditable = !0, a(c, "StyleWithCSS", !1), a(c, "enableInlineTableEditing", !1), a(c, "enableObjectResizing", !1), c.focus(), c.nodeChanged())
        }

        function d(a, b) {
            var d = a.readonly ? "readonly" : "design";
            b != d && (a.initialized ? c(a, "readonly" == b) : a.on("init", function() {
                c(a, "readonly" == b)
            }), a.fire("SwitchMode", {
                mode: b
            }))
        }
        return {
            setMode: d
        }
    }), g("29", [], function() {
        var a = function(a, b, c) {
            var d = a.sidebars ? a.sidebars : [];
            d.push({
                name: b,
                settings: c
            }), a.sidebars = d
        };
        return {
            add: a
        }
    }), g("14", ["g", "a", "e", "v", "12", "26", "6", "n", "27", "28", "13", "29", "9", "w", "2a"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
        function p(c, e, h) {
            var i, j, l = this;
            i = l.documentBaseUrl = h.documentBaseURL, j = h.baseURI, e = f.getEditorSettings(l, c, i, h.defaultSettings, e), l.settings = e, a.language = e.language || "en", a.languageLoad = e.language_load, a.baseURL = h.baseURL, l.id = c, l.setDirty(!1), l.plugins = {}, l.documentBaseURI = new n(e.document_base_url, {
                base_uri: j
            }), l.baseURI = j, l.contentCSS = [], l.contentStyles = [], l.shortcuts = new k(l), l.loadedCSS = {}, l.editorCommands = new d(l), l.suffix = h.suffix, l.editorManager = h, l.inline = e.inline, e.cache_suffix && (g.cacheSuffix = e.cache_suffix.replace(/^[\?\&]+/, "")), e.override_viewport === !1 && (g.overrideViewPort = !1), h.fire("SetupEditor", l), l.execCallback("setup", l), l.$ = b.overrideDefaults(function() {
                return {
                    context: l.inline ? l.getBody() : l.getDoc(),
                    element: l.getBody()
                }
            })
        }
        var q = c.DOM,
            r = m.extend,
            s = m.each,
            t = m.trim,
            u = m.resolve,
            v = g.gecko,
            w = g.ie;
        return p.prototype = {
            render: function() {
                i.render(this)
            },
            focus: function(a) {
                function b(a) {
                    return f.dom.getParent(a, function(a) {
                        return "true" === f.dom.getContentEditable(a)
                    })
                }
                var c, d, e, f = this,
                    h = f.selection,
                    i = f.settings.content_editable,
                    j = f.getDoc(),
                    k = f.getBody();
                if (!f.removed) {
                    if (!a) {
                        if (c = h.getRng(), c.item && (d = c.item(0)), f.quirks.refreshContentEditable(), e = b(h.getNode()), f.$.contains(k, e)) return e.focus(), h.normalize(), void f.editorManager.setActive(f);
                        if (i || (g.opera || f.getBody().focus(), f.getWin().focus()), v || i) {
                            if (k.setActive) try {
                                k.setActive()
                            } catch (a) {
                                k.focus()
                            } else f.selection.setRng(f.lastRng), k.focus();
                            i && h.normalize()
                        }
                        d && d.ownerDocument == j && (c = j.body.createControlRange(), c.addElement(d), c.select())
                    }
                    f.editorManager.setActive(f)
                }
            },
            execCallback: function(a) {
                var b, c = this,
                    d = c.settings[a];
                if (d) return c.callbackLookup && (b = c.callbackLookup[a]) && (d = b.func, b = b.scope), "string" == typeof d && (b = d.replace(/\.\w+$/, ""), b = b ? u(b) : 0, d = u(d), c.callbackLookup = c.callbackLookup || {}, c.callbackLookup[a] = {
                    func: d,
                    scope: b
                }), d.apply(b || c, Array.prototype.slice.call(arguments, 1))
            },
            translate: function(a) {
                if (a && m.is(a, "string")) {
                    var b = this.settings.language || "en",
                        c = this.editorManager.i18n;
                    a = c.data[b + "." + a] || a.replace(/\{\#([^\}]+)\}/g, function(a, d) {
                        return c.data[b + "." + d] || "{#" + d + "}"
                    })
                }
                return this.editorManager.translate(a)
            },
            getLang: function(a, b) {
                return this.editorManager.i18n.data[(this.settings.language || "en") + "." + a] || (void 0 !== b ? b : "{#" + a + "}")
            },
            getParam: function(a, b, c) {
                var d, e = a in this.settings ? this.settings[a] : b;
                return "hash" === c ? (d = {}, "string" == typeof e ? s(e.indexOf("=") > 0 ? e.split(/[;,](?![^=;,]*(?:[;,]|$))/) : e.split(","), function(a) {
                    a = a.split("="), a.length > 1 ? d[t(a[0])] = t(a[1]) : d[t(a[0])] = t(a)
                }) : d = e, d) : e
            },
            nodeChanged: function(a) {
                this._nodeChangeDispatcher.nodeChanged(a)
            },
            addButton: function(a, b) {
                var c = this;
                b.cmd && (b.onclick = function() {
                    c.execCommand(b.cmd)
                }), b.text || b.icon || (b.icon = a), c.buttons = c.buttons || {}, b.tooltip = b.tooltip || b.title, c.buttons[a] = b
            },
            addSidebar: function(a, b) {
                return l.add(this, a, b)
            },
            addMenuItem: function(a, b) {
                var c = this;
                b.cmd && (b.onclick = function() {
                    c.execCommand(b.cmd)
                }), c.menuItems = c.menuItems || {}, c.menuItems[a] = b
            },
            addContextToolbar: function(a, b) {
                var c, d = this;
                d.contextToolbars = d.contextToolbars || [], "string" == typeof a && (c = a, a = function(a) {
                    return d.dom.is(a, c)
                }), d.contextToolbars.push({
                    id: o.uuid("mcet"),
                    predicate: a,
                    items: b
                })
            },
            addCommand: function(a, b, c) {
                this.editorCommands.addCommand(a, b, c)
            },
            addQueryStateHandler: function(a, b, c) {
                this.editorCommands.addQueryStateHandler(a, b, c)
            },
            addQueryValueHandler: function(a, b, c) {
                this.editorCommands.addQueryValueHandler(a, b, c)
            },
            addShortcut: function(a, b, c, d) {
                this.shortcuts.add(a, b, c, d)
            },
            execCommand: function(a, b, c, d) {
                return this.editorCommands.execCommand(a, b, c, d)
            },
            queryCommandState: function(a) {
                return this.editorCommands.queryCommandState(a)
            },
            queryCommandValue: function(a) {
                return this.editorCommands.queryCommandValue(a)
            },
            queryCommandSupported: function(a) {
                return this.editorCommands.queryCommandSupported(a)
            },
            show: function() {
                var a = this;
                a.hidden && (a.hidden = !1, a.inline ? a.getBody().contentEditable = !0 : (q.show(a.getContainer()), q.hide(a.id)), a.load(), a.fire("show"))
            },
            hide: function() {
                var a = this,
                    b = a.getDoc();
                a.hidden || (w && b && !a.inline && b.execCommand("SelectAll"), a.save(), a.inline ? (a.getBody().contentEditable = !1, a == a.editorManager.focusedEditor && (a.editorManager.focusedEditor = null)) : (q.hide(a.getContainer()), q.setStyle(a.id, "display", a.orgDisplay)), a.hidden = !0, a.fire("hide"))
            },
            isHidden: function() {
                return !!this.hidden
            },
            setProgressState: function(a, b) {
                this.fire("ProgressState", {
                    state: a,
                    time: b
                })
            },
            load: function(a) {
                var b, c = this,
                    d = c.getElement();
                return c.removed ? "" : d ? (a = a || {}, a.load = !0, b = c.setContent(void 0 !== d.value ? d.value : d.innerHTML, a), a.element = d, a.no_events || c.fire("LoadContent", a), a.element = d = null, b) : void 0
            },
            save: function(a) {
                var b, c, d = this,
                    e = d.getElement();
                if (e && d.initialized && !d.removed) return a = a || {}, a.save = !0, a.element = e, b = a.content = d.getContent(a), a.no_events || d.fire("SaveContent", a), "raw" == a.format && d.fire("RawSaveContent", a), b = a.content, /TEXTAREA|INPUT/i.test(e.nodeName) ? e.value = b : (d.inline || (e.innerHTML = b), (c = q.getParent(d.id, "form")) && s(c.elements, function(a) {
                    if (a.name == d.id) return a.value = b, !1
                })), a.element = e = null, a.set_dirty !== !1 && d.setDirty(!1), b
            },
            setContent: function(a, b) {
                var c, d, e = this,
                    f = e.getBody();
                return b = b || {}, b.format = b.format || "html", b.set = !0, b.content = a, b.no_events || e.fire("BeforeSetContent", b), a = b.content, 0 === a.length || /^\s+$/.test(a) ? (d = w && w < 11 ? "" : '<br data-mce-bogus="1">', "TABLE" == f.nodeName ? a = "<tr><td>" + d + "</td></tr>" : /^(UL|OL)$/.test(f.nodeName) && (a = "<li>" + d + "</li>"), c = e.settings.forced_root_block, c && e.schema.isValidChild(f.nodeName.toLowerCase(), c.toLowerCase()) ? (a = d, a = e.dom.createHTML(c, e.settings.forced_root_block_attrs, a)) : w || a || (a = '<br data-mce-bogus="1">'), e.dom.setHTML(f, a), e.fire("SetContent", b)) : ("raw" !== b.format && (a = new h({
                    validate: e.validate
                }, e.schema).serialize(e.parser.parse(a, {
                    isRootContent: !0
                }))), b.content = t(a), e.dom.setHTML(f, b.content), b.no_events || e.fire("SetContent", b)), b.content
            },
            getContent: function(a) {
                var b, c = this,
                    d = c.getBody();
                return c.removed ? "" : (a = a || {}, a.format = a.format || "html", a.get = !0, a.getInner = !0, a.no_events || c.fire("BeforeGetContent", a), b = "raw" == a.format ? m.trim(c.serializer.getTrimmedContent()) : "text" == a.format ? d.innerText || d.textContent : c.serializer.serialize(d, a), "text" != a.format ? a.content = t(b) : a.content = b, a.no_events || c.fire("GetContent", a), a.content)
            },
            insertContent: function(a, b) {
                b && (a = r({
                    content: a
                }, b)), this.execCommand("mceInsertContent", !1, a)
            },
            isDirty: function() {
                return !this.isNotDirty
            },
            setDirty: function(a) {
                var b = !this.isNotDirty;
                this.isNotDirty = !a, a && a != b && this.fire("dirty")
            },
            setMode: function(a) {
                j.setMode(this, a)
            },
            getContainer: function() {
                var a = this;
                return a.container || (a.container = q.get(a.editorContainer || a.id + "_parent")), a.container
            },
            getContentAreaContainer: function() {
                return this.contentAreaContainer
            },
            getElement: function() {
                return this.targetElm || (this.targetElm = q.get(this.id)), this.targetElm
            },
            getWin: function() {
                var a, b = this;
                return b.contentWindow || (a = b.iframeElement, a && (b.contentWindow = a.contentWindow)), b.contentWindow
            },
            getDoc: function() {
                var a, b = this;
                return b.contentDocument || (a = b.getWin(), a && (b.contentDocument = a.document)), b.contentDocument
            },
            getBody: function() {
                var a = this.getDoc();
                return this.bodyElement || (a ? a.body : null)
            },
            convertURL: function(a, b, c) {
                var d = this,
                    e = d.settings;
                return e.urlconverter_callback ? d.execCallback("urlconverter_callback", a, c, !0, b) : !e.convert_urls || c && "LINK" == c.nodeName || 0 === a.indexOf("file:") || 0 === a.length ? a : e.relative_urls ? d.documentBaseURI.toRelative(a) : a = d.documentBaseURI.toAbsolute(a, e.remove_script_host)
            },
            addVisual: function(a) {
                var b, c = this,
                    d = c.settings,
                    e = c.dom;
                a = a || c.getBody(), void 0 === c.hasVisual && (c.hasVisual = d.visual), s(e.select("table,a", a), function(a) {
                    var f;
                    switch (a.nodeName) {
                        case "TABLE":
                            return b = d.visual_table_class || "mce-item-table", f = e.getAttrib(a, "border"), void(f && "0" != f || !c.hasVisual ? e.removeClass(a, b) : e.addClass(a, b));
                        case "A":
                            return void(e.getAttrib(a, "href", !1) || (f = e.getAttrib(a, "name") || a.id, b = d.visual_anchor_class || "mce-item-anchor", f && c.hasVisual ? e.addClass(a, b) : e.removeClass(a, b)))
                    }
                }), c.fire("VisualAid", {
                    element: a,
                    hasVisual: c.hasVisual
                })
            },
            remove: function() {
                var a = this;
                a.removed || (a.save(), a.removed = 1, a.unbindAllNativeEvents(), a.hasHiddenInput && q.remove(a.getElement().nextSibling), a.inline || (w && w < 10 && a.getDoc().execCommand("SelectAll", !1, null), q.setStyle(a.id, "display", a.orgDisplay), a.getBody().onload = null), a.fire("remove"), a.editorManager.remove(a), q.remove(a.getContainer()), a._selectionOverrides.destroy(), a.editorUpload.destroy(), a.destroy())
            },
            destroy: function(a) {
                var b, c = this;
                if (!c.destroyed) {
                    if (!a && !c.removed) return void c.remove();
                    a || (c.editorManager.off("beforeunload", c._beforeUnload), c.theme && c.theme.destroy && c.theme.destroy(), c.selection.destroy(), c.dom.destroy()), b = c.formElement, b && (b._mceOldSubmit && (b.submit = b._mceOldSubmit, b._mceOldSubmit = null), q.unbind(b, "submit reset", c.formEventDelegate)), c.contentAreaContainer = c.formElement = c.container = c.editorContainer = null, c.bodyElement = c.contentDocument = c.contentWindow = null, c.iframeElement = c.targetElm = null, c.selection && (c.selection = c.selection.win = c.selection.dom = c.selection.dom.doc = null),
                        c.destroyed = 1
                }
            },
            uploadImages: function(a) {
                return this.editorUpload.uploadImages(a)
            },
            _scanForImages: function() {
                return this.editorUpload.scanForImages()
            }
        }, r(p.prototype, e), p
    }), g("15", ["9"], function(a) {
        "use strict";
        var b = {},
            c = "en";
        return {
            setCode: function(a) {
                a && (c = a, this.rtl = !!this.data[a] && "rtl" === this.data[a]._dir)
            },
            getCode: function() {
                return c
            },
            rtl: !1,
            add: function(a, c) {
                var d = b[a];
                d || (b[a] = d = {});
                for (var e in c) d[e] = c[e];
                this.setCode(a)
            },
            translate: function(d) {
                function e(b) {
                    return a.is(b, "function") ? Object.prototype.toString.call(b) : f(b) ? "" : "" + b
                }

                function f(b) {
                    return "" === b || null === b || a.is(b, "undefined")
                }

                function g(b) {
                    return b = e(b), a.hasOwn(h, b) ? e(h[b]) : b
                }
                var h = b[c] || {};
                if (f(d)) return "";
                if (a.is(d, "object") && a.hasOwn(d, "raw")) return e(d.raw);
                if (a.is(d, "array")) {
                    var i = d.slice(1);
                    d = g(d[0]).replace(/\{([0-9]+)\}/g, function(b, c) {
                        return a.hasOwn(i, c) ? e(i[c]) : b
                    })
                }
                return g(d).replace(/{context:\w+}$/, "")
            },
            data: b
        }
    }), g("16", ["e", "5", "6"], function(a, b, c) {
        function d(a) {
            function d() {
                try {
                    return document.activeElement
                } catch (a) {
                    return document.body
                }
            }

            function j(a, b) {
                if (b && b.startContainer) {
                    if (!a.isChildOf(b.startContainer, a.getRoot()) || !a.isChildOf(b.endContainer, a.getRoot())) return;
                    return {
                        startContainer: b.startContainer,
                        startOffset: b.startOffset,
                        endContainer: b.endContainer,
                        endOffset: b.endOffset
                    }
                }
                return b
            }

            function l(a, b) {
                var c;
                return b.startContainer ? (c = a.getDoc().createRange(), c.setStart(b.startContainer, b.startOffset), c.setEnd(b.endContainer, b.endOffset)) : c = b, c
            }

            function m(m) {
                var n = m.editor;
                n.on("init", function() {
                    (n.inline || c.ie) && ("onbeforedeactivate" in document && c.ie < 9 ? n.dom.bind(n.getBody(), "beforedeactivate", function(a) {
                        if (a.target == n.getBody()) try {
                            n.lastRng = n.selection.getRng()
                        } catch (a) {}
                    }) : n.on("nodechange mouseup keyup", function(a) {
                        var b = d();
                        "nodechange" == a.type && a.selectionChange || (b && b.id == n.id + "_ifr" && (b = n.getBody()), n.dom.isChildOf(b, n.getBody()) && (n.lastRng = n.selection.getRng()))
                    }), c.webkit && !e && (e = function() {
                        var b = a.activeEditor;
                        if (b && b.selection) {
                            var c = b.selection.getRng();
                            c && !c.collapsed && (n.lastRng = c)
                        }
                    }, h.bind(document, "selectionchange", e)))
                }), n.on("setcontent", function() {
                    n.lastRng = null
                }), n.on("mousedown", function() {
                    n.selection.lastFocusBookmark = null
                }), n.on("focusin", function() {
                    var b, c = a.focusedEditor;
                    n.selection.lastFocusBookmark && (b = l(n, n.selection.lastFocusBookmark), n.selection.lastFocusBookmark = null, n.selection.setRng(b)), c != n && (c && c.fire("blur", {
                        focusedEditor: n
                    }), a.setActive(n), a.focusedEditor = n, n.fire("focus", {
                        blurredEditor: c
                    }), n.focus(!0)), n.lastRng = null
                }), n.on("focusout", function() {
                    b.setEditorTimeout(n, function() {
                        var b = a.focusedEditor;
                        i(n, d()) || b != n || (n.fire("blur", {
                            focusedEditor: null
                        }), a.focusedEditor = null, n.selection && (n.selection.lastFocusBookmark = null))
                    })
                }), f || (f = function(b) {
                    var c, d = a.activeEditor;
                    c = b.target, d && c.ownerDocument === document && (d.selection && c !== d.getBody() && k(n, c) && (d.selection.lastFocusBookmark = j(d.dom, d.lastRng)), c === document.body || i(d, c) || a.focusedEditor !== d || (d.fire("blur", {
                        focusedEditor: null
                    }), a.focusedEditor = null))
                }, h.bind(document, "focusin", f)), n.inline && !g && (g = function(b) {
                    var c = a.activeEditor,
                        d = c.dom;
                    if (c.inline && d && !d.isChildOf(b.target, c.getBody())) {
                        var e = c.selection.getRng();
                        e.collapsed || (c.lastRng = e)
                    }
                }, h.bind(document, "mouseup", g))
            }

            function n(b) {
                a.focusedEditor == b.editor && (a.focusedEditor = null), a.activeEditor || (h.unbind(document, "selectionchange", e), h.unbind(document, "focusin", f), h.unbind(document, "mouseup", g), e = f = g = null)
            }
            a.on("AddEditor", m), a.on("RemoveEditor", n)
        }
        var e, f, g, h = a.DOM,
            i = function(a, b) {
                var c = a ? a.settings.custom_ui_selector : "",
                    e = h.getParent(b, function(b) {
                        return d.isEditorUIElement(b) || !!c && a.dom.is(b, c)
                    });
                return null !== e
            },
            j = function(a) {
                return a.inline === !0
            },
            k = function(a, b) {
                return j(a) === !1 || a.dom.isChildOf(b, a.getBody()) === !1
            };
        return d.isEditorUIElement = function(a) {
            return a.className.toString().indexOf("mce-") !== -1
        }, d._isUIElement = i, d
    }), g("2c", ["9"], function(a) {
        var b = a.each,
            c = a.explode,
            d = function(a) {
                a.on("AddEditor", function(a) {
                    var d = a.editor;
                    d.on("preInit", function() {
                        function a(a, c) {
                            b(c, function(b, c) {
                                b && h.setStyle(a, c, b)
                            }), h.rename(a, "span")
                        }

                        function e(a) {
                            h = d.dom, i.convert_fonts_to_spans && b(h.select("font,u,strike", a.node), function(a) {
                                f[a.nodeName.toLowerCase()](h, a)
                            })
                        }
                        var f, g, h, i = d.settings;
                        i.inline_styles && (g = c(i.font_size_legacy_values), f = {
                            font: function(b, c) {
                                a(c, {
                                    backgroundColor: c.style.backgroundColor,
                                    color: c.color,
                                    fontFamily: c.face,
                                    fontSize: g[parseInt(c.size, 10) - 1]
                                })
                            },
                            u: function(b, c) {
                                "html4" === d.settings.schema && a(c, {
                                    textDecoration: "underline"
                                })
                            },
                            strike: function(b, c) {
                                a(c, {
                                    textDecoration: "line-through"
                                })
                            }
                        }, d.on("PreProcess SetContent", e))
                    })
                })
            };
        return {
            register: d
        }
    }), g("17", ["g", "a", "e", "14", "6", "2b", "16", "2c", "15", "z", "4", "9", "w"], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
        function n(a) {
            v(s.editors, function(b) {
                "scroll" === a.type ? b.fire("ScrollWindow", a) : b.fire("ResizeWindow", a)
            })
        }

        function o(a, c) {
            c !== y && (c ? b(window).on("resize scroll", n) : b(window).off("resize scroll", n), y = c)
        }

        function p(a) {
            var b, c = s.editors;
            delete c[a.id];
            for (var d = 0; d < c.length; d++)
                if (c[d] == a) {
                    c.splice(d, 1), b = !0;
                    break
                }
            return s.activeEditor == a && (s.activeEditor = c[0]), s.focusedEditor == a && (s.focusedEditor = null), b
        }

        function q(a) {
            return a && a.initialized && !(a.getContainer() || a.getBody()).parentNode && (p(a), a.unbindAllNativeEvents(), a.destroy(!0), a.removed = !0, a = null), a
        }
        var r, s, t = c.DOM,
            u = l.explode,
            v = l.each,
            w = l.extend,
            x = 0,
            y = !1;
        return s = {
            $: b,
            majorVersion: "4",
            minorVersion: "6.4",
            releaseDate: "2017-06-13",
            editors: [],
            i18n: i,
            activeEditor: null,
            setup: function() {
                var a, b, c, d, e = this,
                    f = "";
                if (b = m.getDocumentBaseUrl(document.location), /^[^:]+:\/\/\/?[^\/]+\//.test(b) && (b = b.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, ""), /[\/\\]$/.test(b) || (b += "/")), c = window.tinymce || window.tinyMCEPreInit) a = c.base || c.baseURL, f = c.suffix;
                else {
                    for (var h = document.getElementsByTagName("script"), i = 0; i < h.length; i++) {
                        d = h[i].src;
                        var j = d.substring(d.lastIndexOf("/"));
                        if (/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(d)) {
                            j.indexOf(".min") != -1 && (f = ".min"), a = d.substring(0, d.lastIndexOf("/"));
                            break
                        }
                    }!a && document.currentScript && (d = document.currentScript.src, d.indexOf(".min") != -1 && (f = ".min"), a = d.substring(0, d.lastIndexOf("/")))
                }
                e.baseURL = new m(b).toAbsolute(a), e.documentBaseURL = b, e.baseURI = new m(e.baseURL), e.suffix = f, e.focusManager = new g(e)
            },
            overrideDefaults: function(b) {
                var c, d;
                c = b.base_url, c && (this.baseURL = new m(this.documentBaseURL).toAbsolute(c.replace(/\/+$/, "")), this.baseURI = new m(this.baseURL)), d = b.suffix, b.suffix && (this.suffix = d), this.defaultSettings = b;
                var e = b.plugin_base_urls;
                for (var f in e) a.PluginManager.urls[f] = e[f]
            },
            init: function(a) {
                function c(a, b) {
                    return a.inline && b.tagName.toLowerCase() in o
                }

                function g(a) {
                    var b = a.id;
                    return b || (b = a.name, b = b && !t.get(b) ? a.name : t.uniqueId(), a.setAttribute("id", b)), b
                }

                function h(b) {
                    var c = a[b];
                    if (c) return c.apply(p, Array.prototype.slice.call(arguments, 2))
                }

                function i(a, b) {
                    return b.constructor === RegExp ? b.test(a.className) : t.hasClass(a, b)
                }

                function j(a) {
                    var b, c = [];
                    if (e.ie && e.ie < 11) return f.initError("TinyMCE does not support the browser you are using. For a list of supported browsers please see: https://www.tinymce.com/docs/get-started/system-requirements/"), [];
                    if (a.types) return v(a.types, function(a) {
                        c = c.concat(t.select(a.selector))
                    }), c;
                    if (a.selector) return t.select(a.selector);
                    if (a.target) return [a.target];
                    switch (a.mode) {
                        case "exact":
                            b = a.elements || "", b.length > 0 && v(u(b), function(a) {
                                var b;
                                (b = t.get(a)) ? c.push(b): v(document.forms, function(b) {
                                    v(b.elements, function(b) {
                                        b.name === a && (a = "mce_editor_" + x++, t.setAttrib(b, "id", a), c.push(b))
                                    })
                                })
                            });
                            break;
                        case "textareas":
                        case "specific_textareas":
                            v(t.select("textarea"), function(b) {
                                a.editor_deselector && i(b, a.editor_deselector) || a.editor_selector && !i(b, a.editor_selector) || c.push(b)
                            })
                    }
                    return c
                }

                function m() {
                    function e(a, b, c) {
                        var e = new d(a, b, p);
                        n.push(e), e.on("init", function() {
                            ++k === i.length && r(n)
                        }), e.targetElm = e.targetElm || c, e.render()
                    }
                    var i, k = 0,
                        n = [];
                    return t.unbind(window, "ready", m), h("onpageload"), i = b.unique(j(a)), a.types ? void v(a.types, function(b) {
                        l.each(i, function(c) {
                            return !t.is(c, b.selector) || (e(g(c), w({}, a, b), c), !1)
                        })
                    }) : (l.each(i, function(a) {
                        q(p.get(a.id))
                    }), i = l.grep(i, function(a) {
                        return !p.get(a.id)
                    }), void(0 === i.length ? r([]) : v(i, function(b) {
                        c(a, b) ? f.initError("Could not initialize inline editor on invalid inline target element", b) : e(g(b), a, b)
                    })))
                }
                var n, o, p = this;
                o = l.makeMap("area base basefont br col frame hr img input isindex link meta param embed source wbr track colgroup option tbody tfoot thead tr script noscript style textarea video audio iframe object menu", " ");
                var r = function(a) {
                    n = a
                };
                return p.settings = a, t.bind(window, "ready", m), new k(function(a) {
                    n ? a(n) : r = function(b) {
                        a(b)
                    }
                })
            },
            get: function(a) {
                return arguments.length ? a in this.editors ? this.editors[a] : null : this.editors
            },
            add: function(a) {
                var b = this,
                    c = b.editors;
                return c[a.id] = a, c.push(a), o(c, !0), b.activeEditor = a, b.fire("AddEditor", {
                    editor: a
                }), r || (r = function() {
                    b.fire("BeforeUnload")
                }, t.bind(window, "beforeunload", r)), a
            },
            createEditor: function(a, b) {
                return this.add(new d(a, b, this))
            },
            remove: function(a) {
                var b, c, d = this,
                    e = d.editors; {
                    if (a) return "string" == typeof a ? (a = a.selector || a, void v(t.select(a), function(a) {
                        c = e[a.id], c && d.remove(c)
                    })) : (c = a, e[c.id] ? (p(c) && d.fire("RemoveEditor", {
                        editor: c
                    }), e.length || t.unbind(window, "beforeunload", r), c.remove(), o(e, e.length > 0), c) : null);
                    for (b = e.length - 1; b >= 0; b--) d.remove(e[b])
                }
            },
            execCommand: function(a, b, c) {
                var e = this,
                    f = e.get(c);
                switch (a) {
                    case "mceAddEditor":
                        return e.get(c) || new d(c, e.settings, e).render(), !0;
                    case "mceRemoveEditor":
                        return f && f.remove(), !0;
                    case "mceToggleEditor":
                        return f ? (f.isHidden() ? f.show() : f.hide(), !0) : (e.execCommand("mceAddEditor", 0, c), !0)
                }
                return !!e.activeEditor && e.activeEditor.execCommand(a, b, c)
            },
            triggerSave: function() {
                v(this.editors, function(a) {
                    a.save()
                })
            },
            addI18n: function(a, b) {
                i.add(a, b)
            },
            translate: function(a) {
                return i.translate(a)
            },
            setActive: function(a) {
                var b = this.activeEditor;
                this.activeEditor != a && (b && b.fire("deactivate", {
                    relatedTarget: a
                }), a.fire("activate", {
                    relatedTarget: b
                })), this.activeEditor = a
            }
        }, w(s, j), s.setup(), h.register(s), s
    }), g("18", ["z", "9"], function(a, b) {
        var c = {
            send: function(a) {
                function d() {
                    !a.async || 4 == e.readyState || f++ > 1e4 ? (a.success && f < 1e4 && 200 == e.status ? a.success.call(a.success_scope, "" + e.responseText, e, a) : a.error && a.error.call(a.error_scope, f > 1e4 ? "TIMED_OUT" : "GENERAL", e, a), e = null) : setTimeout(d, 10)
                }
                var e, f = 0;
                if (a.scope = a.scope || this, a.success_scope = a.success_scope || a.scope, a.error_scope = a.error_scope || a.scope, a.async = a.async !== !1, a.data = a.data || "", c.fire("beforeInitialize", {
                        settings: a
                    }), e = new XMLHttpRequest) {
                    if (e.overrideMimeType && e.overrideMimeType(a.content_type), e.open(a.type || (a.data ? "POST" : "GET"), a.url, a.async), a.crossDomain && (e.withCredentials = !0), a.content_type && e.setRequestHeader("Content-Type", a.content_type), a.requestheaders && b.each(a.requestheaders, function(a) {
                            e.setRequestHeader(a.key, a.value)
                        }), e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e = c.fire("beforeSend", {
                            xhr: e,
                            settings: a
                        }).xhr, e.send(a.data), !a.async) return d();
                    setTimeout(d, 10)
                }
            }
        };
        return b.extend(c, a), c
    }), g("19", [], function() {
        function a(b, c) {
            var d, e, f, g;
            if (c = c || '"', null === b) return "null";
            if (f = typeof b, "string" == f) return e = "\bb\tt\nn\ff\rr\"\"''\\\\", c + b.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g, function(a, b) {
                return '"' === c && "'" === a ? a : (d = e.indexOf(b), d + 1 ? "\\" + e.charAt(d + 1) : (a = b.charCodeAt().toString(16), "\\u" + "0000".substring(a.length) + a))
            }) + c;
            if ("object" == f) {
                if (b.hasOwnProperty && "[object Array]" === Object.prototype.toString.call(b)) {
                    for (d = 0, e = "["; d < b.length; d++) e += (d > 0 ? "," : "") + a(b[d], c);
                    return e + "]"
                }
                e = "{";
                for (g in b) b.hasOwnProperty(g) && (e += "function" != typeof b[g] ? (e.length > 1 ? "," + c : c) + g + c + ":" + a(b[g], c) : "");
                return e + "}"
            }
            return "" + b
        }
        return {
            serialize: a,
            parse: function(a) {
                try {
                    return window[String.fromCharCode(101) + "val"]("(" + a + ")")
                } catch (a) {}
            }
        }
    }), g("1a", ["19", "18", "9"], function(a, b, c) {
        function d(a) {
            this.settings = e({}, a), this.count = 0
        }
        var e = c.extend;
        return d.sendRPC = function(a) {
            return (new d).send(a)
        }, d.prototype = {
            send: function(c) {
                var d = c.error,
                    f = c.success;
                c = e(this.settings, c), c.success = function(b, e) {
                    b = a.parse(b), "undefined" == typeof b && (b = {
                        error: "JSON Parse error."
                    }), b.error ? d.call(c.error_scope || c.scope, b.error, e) : f.call(c.success_scope || c.scope, b.result)
                }, c.error = function(a, b) {
                    d && d.call(c.error_scope || c.scope, a, b)
                }, c.data = a.serialize({
                    id: c.id || "c" + this.count++,
                    method: c.method,
                    params: c.params
                }), c.content_type = "application/json", b.send(c)
            }
        }, d
    }), g("1b", ["e"], function(a) {
        return {
            callbacks: {},
            count: 0,
            send: function(b) {
                var c = this,
                    d = a.DOM,
                    e = void 0 !== b.count ? b.count : c.count,
                    f = "tinymce_jsonp_" + e;
                c.callbacks[e] = function(a) {
                    d.remove(f), delete c.callbacks[e], b.callback(a)
                }, d.add(d.doc.body, "script", {
                    id: f,
                    src: b.url,
                    type: "text/javascript"
                }), c.count++
            }
        }
    }), g("1c", [], function() {
        function a() {
            g = [];
            for (var a in f) g.push(a);
            d.length = g.length
        }

        function b() {
            function b(a) {
                var b, c;
                return c = void 0 !== a ? j + a : d.indexOf(",", j), c === -1 || c > d.length ? null : (b = d.substring(j, c), j = c + 1, b)
            }
            var c, d, g, j = 0;
            if (f = {}, i) {
                e.load(h), d = e.getAttribute(h) || "";
                do {
                    var k = b();
                    if (null === k) break;
                    if (c = b(parseInt(k, 32) || 0), null !== c) {
                        if (k = b(), null === k) break;
                        g = b(parseInt(k, 32) || 0), c && (f[c] = g)
                    }
                } while (null !== c);
                a()
            }
        }

        function c() {
            var b, c = "";
            if (i) {
                for (var d in f) b = f[d], c += (c ? "," : "") + d.length.toString(32) + "," + d + "," + b.length.toString(32) + "," + b;
                e.setAttribute(h, c);
                try {
                    e.save(h)
                } catch (a) {}
                a()
            }
        }
        var d, e, f, g, h, i;
        try {
            if (window.localStorage) return localStorage
        } catch (a) {}
        return h = "tinymce", e = document.documentElement, i = !!e.addBehavior, i && e.addBehavior("#default#userData"), d = {
            key: function(a) {
                return g[a]
            },
            getItem: function(a) {
                return a in f ? f[a] : null
            },
            setItem: function(a, b) {
                f[a] = "" + b, c()
            },
            removeItem: function(a) {
                delete f[a], c()
            },
            clear: function() {
                f = {}, c()
            }
        }, b(), d
    }), g("1d", ["e", "7", "f", "g", "9", "6"], function(a, b, c, d, e, f) {
        var g = function(g) {
            g.DOM = a.DOM, g.ScriptLoader = c.ScriptLoader, g.PluginManager = d.PluginManager, g.ThemeManager = d.ThemeManager, g.dom = g.dom || {}, g.dom.Event = b.Event, e.each("trim isArray is toArray makeMap each map grep inArray extend create walk createNS resolve explode _addCacheSuffix".split(" "), function(a) {
                g[a] = e[a]
            }), e.each("isOpera isWebKit isIE isGecko isMac".split(" "), function(a) {
                g[a] = f[a.substr(2).toLowerCase()]
            })
        };
        return {
            register: g
        }
    }), g("1e", [], function() {
        function a(a) {
            function e(a, e, f) {
                var g, h, i, j, k, l;
                return g = 0, h = 0, i = 0, a /= 255, e /= 255, f /= 255, k = b(a, b(e, f)), l = c(a, c(e, f)), k == l ? (i = k, {
                    h: 0,
                    s: 0,
                    v: 100 * i
                }) : (j = a == k ? e - f : f == k ? a - e : f - a, g = a == k ? 3 : f == k ? 1 : 5, g = 60 * (g - j / (l - k)), h = (l - k) / l, i = l, {
                    h: d(g),
                    s: d(100 * h),
                    v: d(100 * i)
                })
            }

            function f(a, e, f) {
                var g, h, i, j;
                if (a = (parseInt(a, 10) || 0) % 360, e = parseInt(e, 10) / 100, f = parseInt(f, 10) / 100, e = c(0, b(e, 1)), f = c(0, b(f, 1)), 0 === e) return void(l = m = n = d(255 * f));
                switch (g = a / 60, h = f * e, i = h * (1 - Math.abs(g % 2 - 1)), j = f - h, Math.floor(g)) {
                    case 0:
                        l = h, m = i, n = 0;
                        break;
                    case 1:
                        l = i, m = h, n = 0;
                        break;
                    case 2:
                        l = 0, m = h, n = i;
                        break;
                    case 3:
                        l = 0, m = i, n = h;
                        break;
                    case 4:
                        l = i, m = 0, n = h;
                        break;
                    case 5:
                        l = h, m = 0, n = i;
                        break;
                    default:
                        l = m = n = 0
                }
                l = d(255 * (l + j)), m = d(255 * (m + j)), n = d(255 * (n + j))
            }

            function g() {
                function a(a) {
                    return a = parseInt(a, 10).toString(16), a.length > 1 ? a : "0" + a
                }
                return "#" + a(l) + a(m) + a(n)
            }

            function h() {
                return {
                    r: l,
                    g: m,
                    b: n
                }
            }

            function i() {
                return e(l, m, n)
            }

            function j(a) {
                var b;
                return "object" == typeof a ? "r" in a ? (l = a.r, m = a.g, n = a.b) : "v" in a && f(a.h, a.s, a.v) : (b = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(a)) ? (l = parseInt(b[1], 10), m = parseInt(b[2], 10), n = parseInt(b[3], 10)) : (b = /#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(a)) ? (l = parseInt(b[1], 16), m = parseInt(b[2], 16), n = parseInt(b[3], 16)) : (b = /#([0-F])([0-F])([0-F])/gi.exec(a)) && (l = parseInt(b[1] + b[1], 16), m = parseInt(b[2] + b[2], 16), n = parseInt(b[3] + b[3], 16)), l = l < 0 ? 0 : l > 255 ? 255 : l, m = m < 0 ? 0 : m > 255 ? 255 : m, n = n < 0 ? 0 : n > 255 ? 255 : n, k
            }
            var k = this,
                l = 0,
                m = 0,
                n = 0;
            a && j(a), k.toRgb = h, k.toHsv = i, k.toHex = g, k.parse = j
        }
        var b = Math.min,
            c = Math.max,
            d = Math.round;
        return a
    }), g("2t", ["x", "9"], function(a, b) {
        "use strict";
        return a.extend({
            Defaults: {
                firstControlClass: "first",
                lastControlClass: "last"
            },
            init: function(a) {
                this.settings = b.extend({}, this.Defaults, a)
            },
            preRender: function(a) {
                a.bodyClasses.add(this.settings.containerClass)
            },
            applyClasses: function(a) {
                var b, c, d, e, f = this,
                    g = f.settings;
                b = g.firstControlClass, c = g.lastControlClass, a.each(function(a) {
                    a.classes.remove(b).remove(c).add(g.controlClass), a.visible() && (d || (d = a), e = a)
                }), d && d.classes.add(b), e && e.classes.add(c)
            },
            renderHtml: function(a) {
                var b = this,
                    c = "";
                return b.applyClasses(a.items()), a.items().each(function(a) {
                    c += a.renderHtml()
                }), c
            },
            recalc: function() {},
            postRender: function() {},
            isNative: function() {
                return !1
            }
        })
    }), g("2u", ["2t"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                containerClass: "abs-layout",
                controlClass: "abs-layout-item"
            },
            recalc: function(a) {
                a.items().filter(":visible").each(function(a) {
                    var b = a.settings;
                    a.layoutRect({
                        x: b.x,
                        y: b.y,
                        w: b.w,
                        h: b.h
                    }), a.recalc && a.recalc()
                })
            },
            renderHtml: function(a) {
                return '<div id="' + a._id + '-absend" class="' + a.classPrefix + 'abs-end"></div>' + this._super(a)
            }
        })
    }), g("2v", ["2r"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                classes: "widget btn",
                role: "button"
            },
            init: function(a) {
                var b, c = this;
                c._super(a), a = c.settings, b = c.settings.size, c.on("click mousedown", function(a) {
                    a.preventDefault()
                }), c.on("touchstart", function(a) {
                    c.fire("click", a), a.preventDefault()
                }), a.subtype && c.classes.add(a.subtype), b && c.classes.add("btn-" + b), a.icon && c.icon(a.icon)
            },
            icon: function(a) {
                return arguments.length ? (this.state.set("icon", a), this) : this.state.get("icon")
            },
            repaint: function() {
                var a, b = this.getEl().firstChild;
                b && (a = b.style, a.width = a.height = "100%"), this._super()
            },
            renderHtml: function() {
                var a, b = this,
                    c = b._id,
                    d = b.classPrefix,
                    e = b.state.get("icon"),
                    f = b.state.get("text"),
                    g = "";
                return a = b.settings.image, a ? (e = "none", "string" != typeof a && (a = window.getSelection ? a[0] : a[1]), a = " style=\"background-image: url('" + a + "')\"") : a = "", f && (b.classes.add("btn-has-text"), g = '<span class="' + d + 'txt">' + b.encode(f) + "</span>"), e = e ? d + "ico " + d + "i-" + e : "", '<div id="' + c + '" class="' + b.classes + '" tabindex="-1"><button role="presentation" type="button" tabindex="-1">' + (e ? '<i class="' + e + '"' + a + "></i>" : "") + g + "</button></div>"
            },
            bindStates: function() {
                function a(a) {
                    var e = c("span." + d, b.getEl());
                    a ? (e[0] || (c("button:first", b.getEl()).append('<span class="' + d + '"></span>'), e = c("span." + d, b.getEl())), e.html(b.encode(a))) : e.remove(), b.classes.toggle("btn-has-text", !!a)
                }
                var b = this,
                    c = b.$,
                    d = b.classPrefix + "txt";
                return b.state.on("change:text", function(b) {
                    a(b.value)
                }), b.state.on("change:icon", function(c) {
                    var d = c.value,
                        e = b.classPrefix;
                    b.settings.icon = d, d = d ? e + "ico " + e + "i-" + b.settings.icon : "";
                    var f = b.getEl().firstChild,
                        g = f.getElementsByTagName("i")[0];
                    d ? (g && g == f.firstChild || (g = document.createElement("i"), f.insertBefore(g, f.firstChild)), g.className = d) : g && f.removeChild(g), a(b.state.get("text"))
                }), b._super()
            }
        })
    }), g("2w", ["2j"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                defaultType: "button",
                role: "group"
            },
            renderHtml: function() {
                var a = this,
                    b = a._layout;
                return a.classes.add("btn-group"), a.preRender(), b.preRender(a), '<div id="' + a._id + '" class="' + a.classes + '"><div id="' + a._id + '-body">' + (a.settings.html || "") + b.renderHtml(a) + "</div></div>"
            }
        })
    }), g("2x", ["2r"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                classes: "checkbox",
                role: "checkbox",
                checked: !1
            },
            init: function(a) {
                var b = this;
                b._super(a), b.on("click mousedown", function(a) {
                    a.preventDefault()
                }), b.on("click", function(a) {
                    a.preventDefault(), b.disabled() || b.checked(!b.checked())
                }), b.checked(b.settings.checked)
            },
            checked: function(a) {
                return arguments.length ? (this.state.set("checked", a), this) : this.state.get("checked")
            },
            value: function(a) {
                return arguments.length ? this.checked(a) : this.checked()
            },
            renderHtml: function() {
                var a = this,
                    b = a._id,
                    c = a.classPrefix;
                return '<div id="' + b + '" class="' + a.classes + '" unselectable="on" aria-labelledby="' + b + '-al" tabindex="-1"><i class="' + c + "ico " + c + 'i-checkbox"></i><span id="' + b + '-al" class="' + c + 'label">' + a.encode(a.state.get("text")) + "</span></div>"
            },
            bindStates: function() {
                function a(a) {
                    b.classes.toggle("checked", a), b.aria("checked", a)
                }
                var b = this;
                return b.state.on("change:text", function(a) {
                    b.getEl("al").firstChild.data = b.translate(a.value)
                }), b.state.on("change:checked change:value", function(c) {
                    b.fire("change"), a(c.value)
                }), b.state.on("change:icon", function(a) {
                    var c = a.value,
                        d = b.classPrefix;
                    if ("undefined" == typeof c) return b.settings.icon;
                    b.settings.icon = c, c = c ? d + "ico " + d + "i-" + b.settings.icon : "";
                    var e = b.getEl().firstChild,
                        f = e.getElementsByTagName("i")[0];
                    c ? (f && f == e.firstChild || (f = document.createElement("i"), e.insertBefore(f, e.firstChild)), f.className = c) : f && e.removeChild(f)
                }), b.state.get("checked") && a(!0), b._super()
            }
        })
    }), g("2y", ["2r", "2h", "4q", "a", "p", "9"], function(a, b, c, d, e, f) {
        "use strict";
        return a.extend({
            init: function(a) {
                var b = this;
                b._super(a), a = b.settings, b.classes.add("combobox"), b.subinput = !0, b.ariaTarget = "inp", a.menu = a.menu || a.values, a.menu && (a.icon = "caret"), b.on("click", function(c) {
                    var e = c.target,
                        f = b.getEl();
                    if (d.contains(f, e) || e == f)
                        for (; e && e != f;) e.id && e.id.indexOf("-open") != -1 && (b.fire("action"), a.menu && (b.showMenu(), c.aria && b.menu.items()[0].focus())), e = e.parentNode
                }), b.on("keydown", function(a) {
                    var c;
                    13 == a.keyCode && "INPUT" === a.target.nodeName && (a.preventDefault(), b.parents().reverse().each(function(a) {
                        if (a.toJSON) return c = a, !1
                    }), b.fire("submit", {
                        data: c.toJSON()
                    }))
                }), b.on("keyup", function(a) {
                    if ("INPUT" == a.target.nodeName) {
                        var c = b.state.get("value"),
                            d = a.target.value;
                        d !== c && (b.state.set("value", d), b.fire("autocomplete", a))
                    }
                }), b.on("mouseover", function(a) {
                    var c = b.tooltip().moveTo(-65535);
                    if (b.statusLevel() && a.target.className.indexOf(b.classPrefix + "status") !== -1) {
                        var d = b.statusMessage() || "Ok",
                            e = c.text(d).show().testMoveRel(a.target, ["bc-tc", "bc-tl", "bc-tr"]);
                        c.classes.toggle("tooltip-n", "bc-tc" == e), c.classes.toggle("tooltip-nw", "bc-tl" == e), c.classes.toggle("tooltip-ne", "bc-tr" == e), c.moveRel(a.target, e)
                    }
                })
            },
            statusLevel: function(a) {
                return arguments.length > 0 && this.state.set("statusLevel", a), this.state.get("statusLevel")
            },
            statusMessage: function(a) {
                return arguments.length > 0 && this.state.set("statusMessage", a), this.state.get("statusMessage")
            },
            showMenu: function() {
                var a, c = this,
                    d = c.settings;
                c.menu || (a = d.menu || [], a.length ? a = {
                    type: "menu",
                    items: a
                } : a.type = a.type || "menu", c.menu = b.create(a).parent(c).renderTo(c.getContainerElm()), c.fire("createmenu"), c.menu.reflow(), c.menu.on("cancel", function(a) {
                    a.control === c.menu && c.focus()
                }), c.menu.on("show hide", function(a) {
                    a.control.items().each(function(a) {
                        a.active(a.value() == c.value())
                    })
                }).fire("show"), c.menu.on("select", function(a) {
                    c.value(a.control.value())
                }), c.on("focusin", function(a) {
                    "INPUT" == a.target.tagName.toUpperCase() && c.menu.hide()
                }), c.aria("expanded", !0)), c.menu.show(), c.menu.layoutRect({
                    w: c.layoutRect().w
                }), c.menu.moveRel(c.getEl(), c.isRtl() ? ["br-tr", "tr-br"] : ["bl-tl", "tl-bl"])
            },
            focus: function() {
                this.getEl("inp").focus()
            },
            repaint: function() {
                var a, b, e = this,
                    f = e.getEl(),
                    g = e.getEl("open"),
                    h = e.layoutRect(),
                    i = 0,
                    j = f.firstChild;
                e.statusLevel() && "none" !== e.statusLevel() && (i = parseInt(c.getRuntimeStyle(j, "padding-right"), 10) - parseInt(c.getRuntimeStyle(j, "padding-left"), 10)), a = g ? h.w - c.getSize(g).width - 10 : h.w - 10;
                var k = document;
                return k.all && (!k.documentMode || k.documentMode <= 8) && (b = e.layoutRect().h - 2 + "px"), d(j).css({
                    width: a - i,
                    lineHeight: b
                }), e._super(), e
            },
            postRender: function() {
                var a = this;
                return d(this.getEl("inp")).on("change", function(b) {
                    a.state.set("value", b.target.value), a.fire("change", b)
                }), a._super()
            },
            renderHtml: function() {
                var a, b, c = this,
                    d = c._id,
                    e = c.settings,
                    f = c.classPrefix,
                    g = c.state.get("value") || "",
                    h = "",
                    i = "",
                    j = "";
                return "spellcheck" in e && (i += ' spellcheck="' + e.spellcheck + '"'), e.maxLength && (i += ' maxlength="' + e.maxLength + '"'), e.size && (i += ' size="' + e.size + '"'), e.subtype && (i += ' type="' + e.subtype + '"'), j = '<i id="' + d + '-status" class="mce-status mce-ico" style="display: none"></i>', c.disabled() && (i += ' disabled="disabled"'), a = e.icon, a && "caret" != a && (a = f + "ico " + f + "i-" + e.icon), b = c.state.get("text"), (a || b) && (h = '<div id="' + d + '-open" class="' + f + "btn " + f + 'open" tabIndex="-1" role="button"><button id="' + d + '-action" type="button" hidefocus="1" tabindex="-1">' + ("caret" != a ? '<i class="' + a + '"></i>' : '<i class="' + f + 'caret"></i>') + (b ? (a ? " " : "") + b : "") + "</button></div>", c.classes.add("has-open")), '<div id="' + d + '" class="' + c.classes + '"><input id="' + d + '-inp" class="' + f + 'textbox" value="' + c.encode(g, !1) + '" hidefocus="1"' + i + ' placeholder="' + c.encode(e.placeholder) + '" />' + j + h + "</div>"
            },
            value: function(a) {
                return arguments.length ? (this.state.set("value", a), this) : (this.state.get("rendered") && this.state.set("value", this.getEl("inp").value), this.state.get("value"))
            },
            showAutoComplete: function(a, c) {
                var d = this;
                if (0 === a.length) return void d.hideMenu();
                var e = function(a, b) {
                    return function() {
                        d.fire("selectitem", {
                            title: b,
                            value: a
                        })
                    }
                };
                d.menu ? d.menu.items().remove() : d.menu = b.create({
                    type: "menu",
                    classes: "combobox-menu",
                    layout: "flow"
                }).parent(d).renderTo(), f.each(a, function(a) {
                    d.menu.add({
                        text: a.title,
                        url: a.previewUrl,
                        match: c,
                        classes: "menu-item-ellipsis",
                        onclick: e(a.value, a.title)
                    })
                }), d.menu.renderNew(), d.hideMenu(), d.menu.on("cancel", function(a) {
                    a.control.parent() === d.menu && (a.stopPropagation(), d.focus(), d.hideMenu())
                }), d.menu.on("select", function() {
                    d.focus()
                });
                var g = d.layoutRect().w;
                d.menu.layoutRect({
                    w: g,
                    minW: 0,
                    maxW: g
                }), d.menu.reflow(), d.menu.show(), d.menu.moveRel(d.getEl(), d.isRtl() ? ["br-tr", "tr-br"] : ["bl-tl", "tl-bl"])
            },
            hideMenu: function() {
                this.menu && this.menu.hide()
            },
            bindStates: function() {
                var a = this;
                a.state.on("change:value", function(b) {
                    a.getEl("inp").value != b.value && (a.getEl("inp").value = b.value)
                }), a.state.on("change:disabled", function(b) {
                    a.getEl("inp").disabled = b.value
                }), a.state.on("change:statusLevel", function(b) {
                    var d = a.getEl("status"),
                        e = a.classPrefix,
                        f = b.value;
                    c.css(d, "display", "none" === f ? "none" : ""), c.toggleClass(d, e + "i-checkmark", "ok" === f), c.toggleClass(d, e + "i-warning", "warn" === f), c.toggleClass(d, e + "i-error", "error" === f), a.classes.toggle("has-status", "none" !== f), a.repaint()
                }), c.on(a.getEl("status"), "mouseleave", function() {
                    a.tooltip().hide()
                }), a.on("cancel", function(b) {
                    a.menu && a.menu.visible() && (b.stopPropagation(), a.hideMenu())
                });
                var b = function(a, b) {
                    b && b.items().length > 0 && b.items().eq(a)[0].focus()
                };
                return a.on("keydown", function(c) {
                    var d = c.keyCode;
                    "INPUT" === c.target.nodeName && (d === e.DOWN ? (c.preventDefault(), a.fire("autocomplete"), b(0, a.menu)) : d === e.UP && (c.preventDefault(), b(-1, a.menu)))
                }), a._super()
            },
            remove: function() {
                d(this.getEl("inp")).off(), this.menu && this.menu.remove(), this._super()
            }
        })
    }), g("2z", ["2y"], function(a) {
        "use strict";
        return a.extend({
            init: function(a) {
                var b = this;
                a.spellcheck = !1, a.onaction && (a.icon = "none"), b._super(a), b.classes.add("colorbox"), b.on("change keyup postrender", function() {
                    b.repaintColor(b.value())
                })
            },
            repaintColor: function(a) {
                var b = this.getEl("open"),
                    c = b ? b.getElementsByTagName("i")[0] : null;
                if (c) try {
                    c.style.background = a
                } catch (a) {}
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:value", function(b) {
                    a.state.get("rendered") && a.repaintColor(b.value)
                }), a._super()
            }
        })
    }), g("30", ["2v", "2p"], function(a, b) {
        "use strict";
        return a.extend({
            showPanel: function() {
                var a = this,
                    c = a.settings;
                if (a.active(!0), a.panel) a.panel.show();
                else {
                    var d = c.panel;
                    d.type && (d = {
                        layout: "grid",
                        items: d
                    }), d.role = d.role || "dialog", d.popover = !0, d.autohide = !0, d.ariaRoot = !0, a.panel = new b(d).on("hide", function() {
                        a.active(!1)
                    }).on("cancel", function(b) {
                        b.stopPropagation(), a.focus(), a.hidePanel()
                    }).parent(a).renderTo(a.getContainerElm()), a.panel.fire("show"), a.panel.reflow()
                }
                var e = a.panel.testMoveRel(a.getEl(), c.popoverAlign || (a.isRtl() ? ["bc-tc", "bc-tl", "bc-tr"] : ["bc-tc", "bc-tr", "bc-tl"]));
                a.panel.classes.toggle("start", "bc-tl" === e), a.panel.classes.toggle("end", "bc-tr" === e), a.panel.moveRel(a.getEl(), e)
            },
            hidePanel: function() {
                var a = this;
                a.panel && a.panel.hide()
            },
            postRender: function() {
                var a = this;
                return a.aria("haspopup", !0), a.on("click", function(b) {
                    b.control === a && (a.panel && a.panel.visible() ? a.hidePanel() : (a.showPanel(), a.panel.focus(!!b.aria)))
                }), a._super()
            },
            remove: function() {
                return this.panel && (this.panel.remove(), this.panel = null), this._super()
            }
        })
    }), g("31", ["30", "e"], function(a, b) {
        "use strict";
        var c = b.DOM;
        return a.extend({
            init: function(a) {
                this._super(a), this.classes.add("colorbutton")
            },
            color: function(a) {
                return a ? (this._color = a, this.getEl("preview").style.backgroundColor = a, this) : this._color
            },
            resetColor: function() {
                return this._color = null, this.getEl("preview").style.backgroundColor = null, this
            },
            renderHtml: function() {
                var a = this,
                    b = a._id,
                    c = a.classPrefix,
                    d = a.state.get("text"),
                    e = a.settings.icon ? c + "ico " + c + "i-" + a.settings.icon : "",
                    f = a.settings.image ? " style=\"background-image: url('" + a.settings.image + "')\"" : "",
                    g = "";
                return d && (a.classes.add("btn-has-text"), g = '<span class="' + c + 'txt">' + a.encode(d) + "</span>"), '<div id="' + b + '" class="' + a.classes + '" role="button" tabindex="-1" aria-haspopup="true"><button role="presentation" hidefocus="1" type="button" tabindex="-1">' + (e ? '<i class="' + e + '"' + f + "></i>" : "") + '<span id="' + b + '-preview" class="' + c + 'preview"></span>' + g + '</button><button type="button" class="' + c + 'open" hidefocus="1" tabindex="-1"> <i class="' + c + 'caret"></i></button></div>'
            },
            postRender: function() {
                var a = this,
                    b = a.settings.onclick;
                return a.on("click", function(d) {
                    d.aria && "down" == d.aria.key || d.control != a || c.getParent(d.target, "." + a.classPrefix + "open") || (d.stopImmediatePropagation(), b.call(a, d))
                }), delete a.settings.onclick, a._super()
            }
        })
    }), g("32", ["2r", "2k", "4q", "1e"], function(a, b, c, d) {
        "use strict";
        return a.extend({
            Defaults: {
                classes: "widget colorpicker"
            },
            init: function(a) {
                this._super(a)
            },
            postRender: function() {
                function a(a, b) {
                    var d, e, f = c.getPos(a);
                    return d = b.pageX - f.x, e = b.pageY - f.y, d = Math.max(0, Math.min(d / a.clientWidth, 1)), e = Math.max(0, Math.min(e / a.clientHeight, 1)), {
                        x: d,
                        y: e
                    }
                }

                function e(a, b) {
                    var e = (360 - a.h) / 360;
                    c.css(j, {
                        top: 100 * e + "%"
                    }), b || c.css(l, {
                        left: a.s + "%",
                        top: 100 - a.v + "%"
                    }), k.style.background = new d({
                        s: 100,
                        v: 100,
                        h: a.h
                    }).toHex(), m.color().parse({
                        s: a.s,
                        v: a.v,
                        h: a.h
                    })
                }

                function f(b) {
                    var c;
                    c = a(k, b), h.s = 100 * c.x, h.v = 100 * (1 - c.y), e(h), m.fire("change")
                }

                function g(b) {
                    var c;
                    c = a(i, b), h = n.toHsv(), h.h = 360 * (1 - c.y), e(h, !0), m.fire("change")
                }
                var h, i, j, k, l, m = this,
                    n = m.color();
                i = m.getEl("h"), j = m.getEl("hp"), k = m.getEl("sv"), l = m.getEl("svp"), m._repaint = function() {
                    h = n.toHsv(), e(h)
                }, m._super(), m._svdraghelper = new b(m._id + "-sv", {
                    start: f,
                    drag: f
                }), m._hdraghelper = new b(m._id + "-h", {
                    start: g,
                    drag: g
                }), m._repaint()
            },
            rgb: function() {
                return this.color().toRgb()
            },
            value: function(a) {
                var b = this;
                return arguments.length ? (b.color().parse(a), void(b._rendered && b._repaint())) : b.color().toHex()
            },
            color: function() {
                return this._color || (this._color = new d), this._color
            },
            renderHtml: function() {
                function a() {
                    var a, b, c, d, g = "";
                    for (c = "filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=", d = f.split(","), a = 0, b = d.length - 1; a < b; a++) g += '<div class="' + e + 'colorpicker-h-chunk" style="height:' + 100 / b + "%;" + c + d[a] + ",endColorstr=" + d[a + 1] + ");-ms-" + c + d[a] + ",endColorstr=" + d[a + 1] + ')"></div>';
                    return g
                }
                var b, c = this,
                    d = c._id,
                    e = c.classPrefix,
                    f = "#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000",
                    g = "background: -ms-linear-gradient(top," + f + ");background: linear-gradient(to bottom," + f + ");";
                return b = '<div id="' + d + '-h" class="' + e + 'colorpicker-h" style="' + g + '">' + a() + '<div id="' + d + '-hp" class="' + e + 'colorpicker-h-marker"></div></div>', '<div id="' + d + '" class="' + c.classes + '"><div id="' + d + '-sv" class="' + e + 'colorpicker-sv"><div class="' + e + 'colorpicker-overlay1"><div class="' + e + 'colorpicker-overlay2"><div id="' + d + '-svp" class="' + e + 'colorpicker-selector1"><div class="' + e + 'colorpicker-selector2"></div></div></div></div></div>' + b + "</div>"
            }
        })
    }), g("33", ["2r"], function(a) {
        "use strict";
        return a.extend({
            init: function(a) {
                var b = this;
                a.delimiter || (a.delimiter = "\xbb"), b._super(a), b.classes.add("path"), b.canFocus = !0, b.on("click", function(a) {
                    var c, d = a.target;
                    (c = d.getAttribute("data-index")) && b.fire("select", {
                        value: b.row()[c],
                        index: c
                    })
                }), b.row(b.settings.row)
            },
            focus: function() {
                var a = this;
                return a.getEl().firstChild.focus(), a
            },
            row: function(a) {
                return arguments.length ? (this.state.set("row", a), this) : this.state.get("row")
            },
            renderHtml: function() {
                var a = this;
                return '<div id="' + a._id + '" class="' + a.classes + '">' + a._getDataPathHtml(a.state.get("row")) + "</div>"
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:row", function(b) {
                    a.innerHtml(a._getDataPathHtml(b.value))
                }), a._super()
            },
            _getDataPathHtml: function(a) {
                var b, c, d = this,
                    e = a || [],
                    f = "",
                    g = d.classPrefix;
                for (b = 0, c = e.length; b < c; b++) f += (b > 0 ? '<div class="' + g + 'divider" aria-hidden="true"> ' + d.settings.delimiter + " </div>" : "") + '<div role="button" class="' + g + "path-item" + (b == c - 1 ? " " + g + "last" : "") + '" data-index="' + b + '" tabindex="-1" id="' + d._id + "-" + b + '" aria-level="' + (b + 1) + '">' + e[b].name + "</div>";
                return f || (f = '<div class="' + g + 'path-item">\xa0</div>'), f
            }
        })
    }), g("34", ["33"], function(a) {
        return a.extend({
            postRender: function() {
                function a(a) {
                    if (1 === a.nodeType) {
                        if ("BR" == a.nodeName || a.getAttribute("data-mce-bogus")) return !0;
                        if ("bookmark" === a.getAttribute("data-mce-type")) return !0
                    }
                    return !1
                }
                var b = this,
                    c = b.settings.editor;
                return c.settings.elementpath !== !1 && (b.on("select", function(a) {
                    c.focus(), c.selection.select(this.row()[a.index].element), c.nodeChanged()
                }), c.on("nodeChange", function(d) {
                    for (var e = [], f = d.parents, g = f.length; g--;)
                        if (1 == f[g].nodeType && !a(f[g])) {
                            var h = c.fire("ResolveName", {
                                name: f[g].nodeName.toLowerCase(),
                                target: f[g]
                            });
                            if (h.isDefaultPrevented() || e.push({
                                    name: h.name,
                                    element: f[g]
                                }), h.isPropagationStopped()) break
                        }
                    b.row(e)
                })), b._super()
            }
        })
    }), g("35", ["2j"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                layout: "flex",
                align: "center",
                defaults: {
                    flex: 1
                }
            },
            renderHtml: function() {
                var a = this,
                    b = a._layout,
                    c = a.classPrefix;
                return a.classes.add("formitem"), b.preRender(a), '<div id="' + a._id + '" class="' + a.classes + '" hidefocus="1" tabindex="-1">' + (a.settings.title ? '<div id="' + a._id + '-title" class="' + c + 'title">' + a.settings.title + "</div>" : "") + '<div id="' + a._id + '-body" class="' + a.bodyClasses + '">' + (a.settings.html || "") + b.renderHtml(a) + "</div></div>"
            }
        })
    }), g("36", ["2j", "35", "9"], function(a, b, c) {
        "use strict";
        return a.extend({
            Defaults: {
                containerCls: "form",
                layout: "flex",
                direction: "column",
                align: "stretch",
                flex: 1,
                padding: 20,
                labelGap: 30,
                spacing: 10,
                callbacks: {
                    submit: function() {
                        this.submit()
                    }
                }
            },
            preRender: function() {
                var a = this,
                    d = a.items();
                a.settings.formItemDefaults || (a.settings.formItemDefaults = {
                    layout: "flex",
                    autoResize: "overflow",
                    defaults: {
                        flex: 1
                    }
                }), d.each(function(d) {
                    var e, f = d.settings.label;
                    f && (e = new b(c.extend({
                        items: {
                            type: "label",
                            id: d._id + "-l",
                            text: f,
                            flex: 0,
                            forId: d._id,
                            disabled: d.disabled()
                        }
                    }, a.settings.formItemDefaults)), e.type = "formitem", d.aria("labelledby", d._id + "-l"), "undefined" == typeof d.settings.flex && (d.settings.flex = 1), a.replace(d, e), e.add(d))
                })
            },
            submit: function() {
                return this.fire("submit", {
                    data: this.toJSON()
                })
            },
            postRender: function() {
                var a = this;
                a._super(), a.fromJSON(a.settings.data)
            },
            bindStates: function() {
                function a() {
                    var a, c, d, e = 0,
                        f = [];
                    if (b.settings.labelGapCalc !== !1)
                        for (d = "children" == b.settings.labelGapCalc ? b.find("formitem") : b.items(), d.filter("formitem").each(function(a) {
                                var b = a.items()[0],
                                    c = b.getEl().clientWidth;
                                e = c > e ? c : e, f.push(b)
                            }), c = b.settings.labelGap || 0, a = f.length; a--;) f[a].settings.minWidth = e + c
                }
                var b = this;
                b._super(), b.on("show", a), a()
            }
        })
    }), g("37", ["36"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                containerCls: "fieldset",
                layout: "flex",
                direction: "column",
                align: "stretch",
                flex: 1,
                padding: "25 15 5 15",
                labelGap: 30,
                spacing: 10,
                border: 1
            },
            renderHtml: function() {
                var a = this,
                    b = a._layout,
                    c = a.classPrefix;
                return a.preRender(), b.preRender(a), '<fieldset id="' + a._id + '" class="' + a.classes + '" hidefocus="1" tabindex="-1">' + (a.settings.title ? '<legend id="' + a._id + '-title" class="' + c + 'fieldset-title">' + a.settings.title + "</legend>" : "") + '<div id="' + a._id + '-body" class="' + a.bodyClasses + '">' + (a.settings.html || "") + b.renderHtml(a) + "</div></fieldset>"
            }
        })
    }), g("4x", ["e", "1j", "1g", "1w", "9", "2a"], function(a, b, c, d, e, f) {
        var g = e.trim,
            h = function(a, b, c, d, e) {
                return {
                    type: a,
                    title: b,
                    url: c,
                    level: d,
                    attach: e
                }
            },
            i = function(a) {
                for (; a = a.parentNode;) {
                    var c = a.contentEditable;
                    if (c && "inherit" !== c) return b.isContentEditableTrue(a)
                }
                return !1
            },
            j = function(b, c) {
                return a.DOM.select(b, c)
            },
            k = function(a) {
                return a.innerText || a.textContent
            },
            l = function(a) {
                return a.id ? a.id : f.uuid("h")
            },
            m = function(a) {
                return a && "A" === a.nodeName && (a.id || a.name)
            },
            n = function(a) {
                return m(a) && p(a)
            },
            o = function(a) {
                return a && /^(H[1-6])$/.test(a.nodeName)
            },
            p = function(a) {
                return i(a) && !b.isContentEditableFalse(a)
            },
            q = function(a) {
                return o(a) && p(a)
            },
            r = function(a) {
                return o(a) ? parseInt(a.nodeName.substr(1), 10) : 0
            },
            s = function(a) {
                var b = l(a),
                    c = function() {
                        a.id = b
                    };
                return h("header", k(a), "#" + b, r(a), c)
            },
            t = function(a) {
                var b = a.id || a.name,
                    c = k(a);
                return h("anchor", c ? c : "#" + b, "#" + b, 0, d.noop)
            },
            u = function(a) {
                return c.map(c.filter(a, q), s)
            },
            v = function(a) {
                return c.map(c.filter(a, n), t)
            },
            w = function(a) {
                var b = j("h1,h2,h3,h4,h5,h6,a:not([href])", a);
                return b
            },
            x = function(a) {
                return g(a.title).length > 0
            },
            y = function(a) {
                var b = w(a);
                return c.filter(u(b).concat(v(b)), x)
            };
        return {
            find: y
        }
    }), g("38", ["4t", "4x", "17", "2y", "1g", "1w", "9"], function(a, b, c, d, e, f, g) {
        "use strict";
        var h = function() {
                return a.tinymce ? a.tinymce.activeEditor : c.activeEditor
            },
            i = {},
            j = 5,
            k = function(a) {
                return {
                    title: a.title,
                    value: {
                        title: {
                            raw: a.title
                        },
                        url: a.url,
                        attach: a.attach
                    }
                }
            },
            l = function(a) {
                return g.map(a, k)
            },
            m = function(a, b) {
                return {
                    title: a,
                    value: {
                        title: a,
                        url: b,
                        attach: f.noop
                    }
                }
            },
            n = function(a, b) {
                var c = e.find(b, function(b) {
                    return b.url === a
                });
                return !c
            },
            o = function(a, b, c) {
                var d = b in a ? a[b] : c;
                return d === !1 ? null : d
            },
            p = function(a, b, c, d) {
                var h = {
                        title: "-"
                    },
                    j = function(a) {
                        var d = e.filter(a[c], function(a) {
                            return n(a, b)
                        });
                        return g.map(d, function(a) {
                            return {
                                title: a,
                                value: {
                                    title: a,
                                    url: a,
                                    attach: f.noop
                                }
                            }
                        })
                    },
                    k = function(a) {
                        var c = e.filter(b, function(b) {
                            return b.type == a
                        });
                        return l(c)
                    },
                    p = function() {
                        var a = k("anchor"),
                            b = o(d, "anchor_top", "#top"),
                            c = o(d, "anchor_bottom", "#bottom");
                        return null !== b && a.unshift(m("<top>", b)), null !== c && a.push(m("<bottom>", c)), a
                    },
                    q = function(a) {
                        return e.reduce(a, function(a, b) {
                            var c = 0 === a.length || 0 === b.length;
                            return c ? a.concat(b) : a.concat(h, b)
                        }, [])
                    };
                return d.typeahead_urls === !1 ? [] : "file" === c ? q([r(a, j(i)), r(a, k("header")), r(a, p())]) : r(a, j(i))
            },
            q = function(a, b) {
                var c = i[b];
                /^https?/.test(a) && (c ? e.indexOf(c, a) === -1 && (i[b] = c.slice(0, j).concat(a)) : i[b] = [a])
            },
            r = function(a, b) {
                var c = a.toLowerCase(),
                    d = g.grep(b, function(a) {
                        return a.title.toLowerCase().indexOf(c) !== -1
                    });
                return 1 === d.length && d[0].title === a ? [] : d
            },
            s = function(a) {
                var b = a.title;
                return b.raw ? b.raw : b
            },
            t = function(a, c, d, e) {
                var f = function(f) {
                    var g = b.find(d),
                        h = p(f, g, e, c);
                    a.showAutoComplete(h, f)
                };
                a.on("autocomplete", function() {
                    f(a.value())
                }), a.on("selectitem", function(b) {
                    var c = b.value;
                    a.value(c.url);
                    var d = s(c);
                    "image" === e ? a.fire("change", {
                        meta: {
                            alt: d,
                            attach: c.attach
                        }
                    }) : a.fire("change", {
                        meta: {
                            text: d,
                            attach: c.attach
                        }
                    }), a.focus()
                }), a.on("click", function(b) {
                    0 === a.value().length && "INPUT" === b.target.nodeName && f("")
                }), a.on("PostRender", function() {
                    a.getRoot().on("submit", function(b) {
                        b.isDefaultPrevented() || q(a.value(), e)
                    })
                })
            },
            u = function(a) {
                var b = a.status,
                    c = a.message;
                return "valid" === b ? {
                    status: "ok",
                    message: c
                } : "unknown" === b ? {
                    status: "warn",
                    message: c
                } : "invalid" === b ? {
                    status: "warn",
                    message: c
                } : {
                    status: "none",
                    message: ""
                }
            },
            v = function(a, b, c) {
                var d = b.filepicker_validator_handler;
                if (d) {
                    var e = function(b) {
                        return 0 === b.length ? void a.statusLevel("none") : void d({
                            url: b,
                            type: c
                        }, function(b) {
                            var c = u(b);
                            a.statusMessage(c.message), a.statusLevel(c.status)
                        })
                    };
                    a.state.on("change:value", function(a) {
                        e(a.value)
                    })
                }
            };
        return d.extend({
            init: function(b) {
                var c, d, e, f = this,
                    i = h(),
                    j = i.settings,
                    k = b.filetype;
                b.spellcheck = !1, e = j.file_picker_types || j.file_browser_callback_types, e && (e = g.makeMap(e, /[, ]/)), e && !e[k] || (d = j.file_picker_callback, !d || e && !e[k] ? (d = j.file_browser_callback, !d || e && !e[k] || (c = function() {
                    d(f.getEl("inp").id, f.value(), k, a)
                })) : c = function() {
                    var a = f.fire("beforecall").meta;
                    a = g.extend({
                        filetype: k
                    }, a), d.call(i, function(a, b) {
                        f.value(a).fire("change", {
                            meta: b
                        })
                    }, f.value(), a)
                }), c && (b.icon = "browse", b.onaction = c), f._super(b), t(f, j, i.getBody(), k), v(f, j, k)
            }
        })
    }), g("39", ["2u"], function(a) {
        "use strict";
        return a.extend({
            recalc: function(a) {
                var b = a.layoutRect(),
                    c = a.paddingBox;
                a.items().filter(":visible").each(function(a) {
                    a.layoutRect({
                        x: c.left,
                        y: c.top,
                        w: b.innerW - c.right - c.left,
                        h: b.innerH - c.top - c.bottom
                    }), a.recalc && a.recalc()
                })
            }
        })
    }), g("3a", ["2u"], function(a) {
        "use strict";
        return a.extend({
            recalc: function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = [],
                    O = Math.max,
                    P = Math.min;
                for (d = a.items().filter(":visible"), e = a.layoutRect(), f = a.paddingBox, g = a.settings, m = a.isRtl() ? g.direction || "row-reversed" : g.direction, h = g.align, i = a.isRtl() ? g.pack || "end" : g.pack, j = g.spacing || 0, "row-reversed" != m && "column-reverse" != m || (d = d.set(d.toArray().reverse()), m = m.split("-")[0]), "column" == m ? (z = "y", x = "h", y = "minH", A = "maxH", C = "innerH", B = "top", D = "deltaH", E = "contentH", J = "left", H = "w", F = "x", G = "innerW", I = "minW", K = "right", L = "deltaW", M = "contentW") : (z = "x", x = "w", y = "minW", A = "maxW", C = "innerW", B = "left", D = "deltaW", E = "contentW", J = "top", H = "h", F = "y", G = "innerH", I = "minH", K = "bottom", L = "deltaH", M = "contentH"), l = e[C] - f[B] - f[B], w = k = 0, b = 0, c = d.length; b < c; b++) n = d[b], o = n.layoutRect(), p = n.settings, q = p.flex, l -= b < c - 1 ? j : 0, q > 0 && (k += q, o[A] && N.push(n), o.flex = q), l -= o[y], r = f[J] + o[I] + f[K], r > w && (w = r);
                if (u = {}, l < 0 ? u[y] = e[y] - l + e[D] : u[y] = e[C] - l + e[D], u[I] = w + e[L], u[E] = e[C] - l, u[M] = w, u.minW = P(u.minW, e.maxW), u.minH = P(u.minH, e.maxH), u.minW = O(u.minW, e.startMinWidth), u.minH = O(u.minH, e.startMinHeight), !e.autoResize || u.minW == e.minW && u.minH == e.minH) {
                    for (t = l / k, b = 0, c = N.length; b < c; b++) n = N[b], o = n.layoutRect(), s = o[A], r = o[y] + o.flex * t, r > s ? (l -= o[A] - o[y], k -= o.flex, o.flex = 0, o.maxFlexSize = s) : o.maxFlexSize = 0;
                    for (t = l / k, v = f[B], u = {}, 0 === k && ("end" == i ? v = l + f[B] : "center" == i ? (v = Math.round(e[C] / 2 - (e[C] - l) / 2) + f[B], v < 0 && (v = f[B])) : "justify" == i && (v = f[B], j = Math.floor(l / (d.length - 1)))), u[F] = f[J], b = 0, c = d.length; b < c; b++) n = d[b], o = n.layoutRect(), r = o.maxFlexSize || o[y], "center" === h ? u[F] = Math.round(e[G] / 2 - o[H] / 2) : "stretch" === h ? (u[H] = O(o[I] || 0, e[G] - f[J] - f[K]), u[F] = f[J]) : "end" === h && (u[F] = e[G] - o[H] - f.top), o.flex > 0 && (r += o.flex * t), u[x] = r, u[z] = v, n.layoutRect(u), n.recalc && n.recalc(), v += r + j
                } else if (u.w = u.minW, u.h = u.minH, a.layoutRect(u), this.recalc(a), null === a._lastRect) {
                    var Q = a.parent();
                    Q && (Q._lastRect = null, Q.recalc())
                }
            }
        })
    }), g("3b", ["2t"], function(a) {
        return a.extend({
            Defaults: {
                containerClass: "flow-layout",
                controlClass: "flow-layout-item",
                endClass: "break"
            },
            recalc: function(a) {
                a.items().filter(":visible").each(function(a) {
                    a.recalc && a.recalc()
                })
            },
            isNative: function() {
                return !0
            }
        })
    }), g("4y", ["1m", "4z", "1r", "4d", "e"], function(a, b, c, d, e) {
        var f = function(a, c, d) {
                for (; d !== c;) {
                    if (d.style[a]) {
                        var e = d.style[a];
                        return "" !== e ? b.some(e) : b.none()
                    }
                    d = d.parentNode
                }
                return b.none()
            },
            g = function(a) {
                return /[0-9.]+px$/.test(a) ? Math.round(72 * parseInt(a, 10) / 96) + "pt" : a
            },
            h = function(a) {
                return a.replace(/[\'\"]/g, "").replace(/,\s+/g, ",")
            },
            i = function(a, c) {
                return b.from(e.DOM.getStyle(c, a, !0))
            },
            j = function(a) {
                return function(e, g) {
                    return b.from(g).map(c.fromDom).filter(d.isElement).bind(function(b) {
                        return f(a, e, b.dom()).or(i(a, b.dom()))
                    }).getOr("")
                }
            };
        return {
            getFontSize: j("fontSize"),
            getFontFamily: a.compose(h, j("fontFamily")),
            toPt: g
        }
    }), g("3c", ["2g", "2r", "2p", "9", "1g", "e", "17", "6", "4y"], function(a, b, c, d, e, f, g, h, i) {
        function j(a) {
            a.settings.ui_container && (h.container = f.DOM.select(a.settings.ui_container)[0])
        }

        function k(b) {
            b.on("ScriptsLoaded", function() {
                b.rtl && (a.rtl = !0)
            })
        }

        function l(a) {
            function b(b, c) {
                return function() {
                    var d = this;
                    a.on("nodeChange", function(e) {
                        var f = a.formatter,
                            g = null;
                        m(e.parents, function(a) {
                            if (m(b, function(b) {
                                    if (c ? f.matchNode(a, c, {
                                            value: b.value
                                        }) && (g = b.value) : f.matchNode(a, b.value) && (g = b.value), g) return !1
                                }), g) return !1
                        }), d.value(g)
                    })
                }
            }

            function e(b) {
                return function() {
                    var c = this,
                        d = function(a) {
                            return a ? a.split(",")[0] : ""
                        };
                    a.on("init nodeChange", function(e) {
                        var f, g = null;
                        f = i.getFontFamily(a.getBody(), e.element), m(b, function(a) {
                            a.value.toLowerCase() === f.toLowerCase() && (g = a.value)
                        }), m(b, function(a) {
                            g || d(a.value).toLowerCase() !== d(f).toLowerCase() || (g = a.value)
                        }), c.value(g), !g && f && c.text(d(f))
                    })
                }
            }

            function f(b) {
                return function() {
                    var c = this;
                    a.on("init nodeChange", function(d) {
                        var e, f, g = null;
                        e = i.getFontSize(a.getBody(), d.element), f = i.toPt(e), m(b, function(a) {
                            a.value === e ? g = e : a.value === f && (g = f)
                        }), c.value(g), g || c.text(f)
                    })
                }
            }

            function g(a) {
                a = a.replace(/;$/, "").split(";");
                for (var b = a.length; b--;) a[b] = a[b].split("=");
                return a
            }

            function h() {
                function b(a) {
                    var c = [];
                    if (a) return m(a, function(a) {
                        var f = {
                            text: a.title,
                            icon: a.icon
                        };
                        if (a.items) f.menu = b(a.items);
                        else {
                            var g = a.format || "custom" + d++;
                            a.format || (a.name = g, e.push(a)), f.format = g, f.cmd = a.cmd
                        }
                        c.push(f)
                    }), c
                }

                function c() {
                    var c;
                    return c = b(a.settings.style_formats_merge ? a.settings.style_formats ? f.concat(a.settings.style_formats) : f : a.settings.style_formats || f)
                }
                var d = 0,
                    e = [],
                    f = [{
                        title: "Headings",
                        items: [{
                            title: "Heading 1",
                            format: "h1"
                        }, {
                            title: "Heading 2",
                            format: "h2"
                        }, {
                            title: "Heading 3",
                            format: "h3"
                        }, {
                            title: "Heading 4",
                            format: "h4"
                        }, {
                            title: "Heading 5",
                            format: "h5"
                        }, {
                            title: "Heading 6",
                            format: "h6"
                        }]
                    }, {
                        title: "Inline",
                        items: [{
                            title: "Bold",
                            icon: "bold",
                            format: "bold"
                        }, {
                            title: "Italic",
                            icon: "italic",
                            format: "italic"
                        }, {
                            title: "Underline",
                            icon: "underline",
                            format: "underline"
                        }, {
                            title: "Strikethrough",
                            icon: "strikethrough",
                            format: "strikethrough"
                        }, {
                            title: "Superscript",
                            icon: "superscript",
                            format: "superscript"
                        }, {
                            title: "Subscript",
                            icon: "subscript",
                            format: "subscript"
                        }, {
                            title: "Code",
                            icon: "code",
                            format: "code"
                        }]
                    }, {
                        title: "Blocks",
                        items: [{
                            title: "Paragraph",
                            format: "p"
                        }, {
                            title: "Blockquote",
                            format: "blockquote"
                        }, {
                            title: "Div",
                            format: "div"
                        }, {
                            title: "Pre",
                            format: "pre"
                        }]
                    }, {
                        title: "Alignment",
                        items: [{
                            title: "Left",
                            icon: "alignleft",
                            format: "alignleft"
                        }, {
                            title: "Center",
                            icon: "aligncenter",
                            format: "aligncenter"
                        }, {
                            title: "Right",
                            icon: "alignright",
                            format: "alignright"
                        }, {
                            title: "Justify",
                            icon: "alignjustify",
                            format: "alignjustify"
                        }]
                    }];
                return a.on("init", function() {
                    m(e, function(b) {
                        a.formatter.register(b.name, b)
                    })
                }), {
                    type: "menu",
                    items: c(),
                    onPostRender: function(b) {
                        a.fire("renderFormatsMenu", {
                            control: b.control
                        })
                    },
                    itemDefaults: {
                        preview: !0,
                        textStyle: function() {
                            if (this.settings.format) return a.formatter.getCssText(this.settings.format)
                        },
                        onPostRender: function() {
                            var b = this;
                            b.parent().on("show", function() {
                                var c, d;
                                c = b.settings.format, c && (b.disabled(!a.formatter.canApply(c)), b.active(a.formatter.match(c))), d = b.settings.cmd, d && b.active(a.queryCommandState(d))
                            })
                        },
                        onclick: function() {
                            this.settings.format && o(this.settings.format), this.settings.cmd && a.execCommand(this.settings.cmd)
                        }
                    }
                }
            }

            function j(b) {
                return function() {
                    var c = this;
                    a.formatter ? a.formatter.formatChanged(b, function(a) {
                        c.active(a)
                    }) : a.on("init", function() {
                        a.formatter.formatChanged(b, function(a) {
                            c.active(a)
                        })
                    })
                }
            }

            function k(b) {
                return function() {
                    function c() {
                        var c = "redo" == b ? "hasRedo" : "hasUndo";
                        return !!a.undoManager && a.undoManager[c]()
                    }
                    var d = this;
                    d.disabled(!c()), a.on("Undo Redo AddUndo TypingUndo ClearUndos SwitchMode", function() {
                        d.disabled(a.readonly || !c())
                    })
                }
            }

            function l() {
                var b = this;
                a.on("VisualAid", function(a) {
                    b.active(a.hasVisual)
                }), b.active(a.hasVisual)
            }

            function o(b) {
                b.control && (b = b.control.value()), b && a.execCommand("mceToggleFormat", !1, b)
            }

            function p(b) {
                var c = b.length;
                return d.each(b, function(b) {
                    b.menu && (b.hidden = 0 === p(b.menu));
                    var d = b.format;
                    d && (b.hidden = !a.formatter.canApply(d)), b.hidden && c--
                }), c
            }

            function q(b) {
                var c = b.items().length;
                return b.items().each(function(b) {
                    b.menu && b.visible(q(b.menu) > 0), !b.menu && b.settings.menu && b.visible(p(b.settings.menu) > 0);
                    var d = b.settings.format;
                    d && b.visible(a.formatter.canApply(d)), b.visible() || c--
                }), c
            }
            var r;
            r = h(), m({
                bold: "Bold",
                italic: "Italic",
                underline: "Underline",
                strikethrough: "Strikethrough",
                subscript: "Subscript",
                superscript: "Superscript"
            }, function(b, c) {
                a.addButton(c, {
                    tooltip: b,
                    onPostRender: j(c),
                    onclick: function() {
                        o(c)
                    }
                })
            }), m({
                outdent: ["Decrease indent", "Outdent"],
                indent: ["Increase indent", "Indent"],
                cut: ["Cut", "Cut"],
                copy: ["Copy", "Copy"],
                paste: ["Paste", "Paste"],
                help: ["Help", "mceHelp"],
                selectall: ["Select all", "SelectAll"],
                removeformat: ["Clear formatting", "RemoveFormat"],
                visualaid: ["Visual aids", "mceToggleVisualAid"],
                newdocument: ["New document", "mceNewDocument"]
            }, function(b, c) {
                a.addButton(c, {
                    tooltip: b[0],
                    cmd: b[1]
                })
            }), m({
                blockquote: ["Blockquote", "mceBlockQuote"],
                subscript: ["Subscript", "Subscript"],
                superscript: ["Superscript", "Superscript"],
                alignleft: ["Align left", "JustifyLeft"],
                aligncenter: ["Align center", "JustifyCenter"],
                alignright: ["Align right", "JustifyRight"],
                alignjustify: ["Justify", "JustifyFull"],
                alignnone: ["No alignment", "JustifyNone"]
            }, function(b, c) {
                a.addButton(c, {
                    tooltip: b[0],
                    cmd: b[1],
                    onPostRender: j(c)
                })
            });
            var s = function(a) {
                    var b = a;
                    return b.length > 0 && "-" === b[0].text && (b = b.slice(1)), b.length > 0 && "-" === b[b.length - 1].text && (b = b.slice(0, b.length - 1)), b
                },
                t = function(b) {
                    var c, e;
                    if ("string" == typeof b) e = b.split(" ");
                    else if (d.isArray(b)) return n(d.map(b, t));
                    return c = d.grep(e, function(b) {
                        return "|" === b || b in a.menuItems
                    }), d.map(c, function(b) {
                        return "|" === b ? {
                            text: "-"
                        } : a.menuItems[b]
                    })
                },
                u = function(b) {
                    var c = [{
                            text: "-"
                        }],
                        e = d.grep(a.menuItems, function(a) {
                            return a.context === b
                        });
                    return d.each(e, function(a) {
                        "before" == a.separator && c.push({
                            text: "|"
                        }), a.prependToContext ? c.unshift(a) : c.push(a), "after" == a.separator && c.push({
                            text: "|"
                        })
                    }), c
                },
                v = function(a) {
                    return s(a.insert_button_items ? t(a.insert_button_items) : u("insert"))
                };
            a.addButton("undo", {
                tooltip: "Undo",
                onPostRender: k("undo"),
                cmd: "undo"
            }), a.addButton("redo", {
                tooltip: "Redo",
                onPostRender: k("redo"),
                cmd: "redo"
            }), a.addMenuItem("newdocument", {
                text: "New document",
                icon: "newdocument",
                cmd: "mceNewDocument"
            }), a.addMenuItem("undo", {
                text: "Undo",
                icon: "undo",
                shortcut: "Meta+Z",
                onPostRender: k("undo"),
                cmd: "undo"
            }), a.addMenuItem("redo", {
                text: "Redo",
                icon: "redo",
                shortcut: "Meta+Y",
                onPostRender: k("redo"),
                cmd: "redo"
            }), a.addMenuItem("visualaid", {
                text: "Visual aids",
                selectable: !0,
                onPostRender: l,
                cmd: "mceToggleVisualAid"
            }), a.addButton("remove", {
                tooltip: "Remove",
                icon: "remove",
                cmd: "Delete"
            }), a.addButton("insert", {
                type: "menubutton",
                icon: "insert",
                menu: [],
                oncreatemenu: function() {
                    this.menu.add(v(a.settings)), this.menu.renderNew()
                }
            }), m({
                cut: ["Cut", "Cut", "Meta+X"],
                copy: ["Copy", "Copy", "Meta+C"],
                paste: ["Paste", "Paste", "Meta+V"],
                selectall: ["Select all", "SelectAll", "Meta+A"],
                bold: ["Bold", "Bold", "Meta+B"],
                italic: ["Italic", "Italic", "Meta+I"],
                underline: ["Underline", "Underline", "Meta+U"],
                strikethrough: ["Strikethrough", "Strikethrough"],
                subscript: ["Subscript", "Subscript"],
                superscript: ["Superscript", "Superscript"],
                removeformat: ["Clear formatting", "RemoveFormat"]
            }, function(b, c) {
                a.addMenuItem(c, {
                    text: b[0],
                    icon: c,
                    shortcut: b[2],
                    cmd: b[1]
                })
            }), a.on("mousedown", function() {
                c.hideAll()
            }), a.addButton("styleselect", {
                type: "menubutton",
                text: "Formats",
                menu: r,
                onShowMenu: function() {
                    a.settings.style_formats_autohide && q(this.menu)
                }
            }), a.addButton("formatselect", function() {
                var c = [],
                    d = g(a.settings.block_formats || "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre");
                return m(d, function(b) {
                    c.push({
                        text: b[0],
                        value: b[1],
                        textStyle: function() {
                            return a.formatter.getCssText(b[1])
                        }
                    })
                }), {
                    type: "listbox",
                    text: d[0][0],
                    values: c,
                    fixedWidth: !0,
                    onselect: o,
                    onPostRender: b(c)
                }
            }), a.addButton("fontselect", function() {
                var b = "Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
                    c = [],
                    d = g(a.settings.font_formats || b);
                return m(d, function(a) {
                    c.push({
                        text: {
                            raw: a[0]
                        },
                        value: a[1],
                        textStyle: a[1].indexOf("dings") == -1 ? "font-family:" + a[1] : ""
                    })
                }), {
                    type: "listbox",
                    text: "Font Family",
                    tooltip: "Font Family",
                    values: c,
                    fixedWidth: !0,
                    onPostRender: e(c),
                    onselect: function(b) {
                        b.control.settings.value && a.execCommand("FontName", !1, b.control.settings.value)
                    }
                }
            }), a.addButton("fontsizeselect", function() {
                var b = [],
                    c = "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                    d = a.settings.fontsize_formats || c;
                return m(d.split(" "), function(a) {
                    var c = a,
                        d = a,
                        e = a.split("=");
                    e.length > 1 && (c = e[0], d = e[1]), b.push({
                        text: c,
                        value: d
                    })
                }), {
                    type: "listbox",
                    text: "Font Sizes",
                    tooltip: "Font Sizes",
                    values: b,
                    fixedWidth: !0,
                    onPostRender: f(b),
                    onclick: function(b) {
                        b.control.settings.value && a.execCommand("FontSize", !1, b.control.settings.value)
                    }
                }
            }), a.addMenuItem("formats", {
                text: "Formats",
                menu: r
            })
        }
        var m = d.each,
            n = function(a) {
                return e.reduce(a, function(a, b) {
                    return a.concat(b)
                }, [])
            };
        return g.on("AddEditor", function(a) {
            var b = a.editor;
            k(b), l(b), j(b)
        }), a.translate = function(a) {
            return g.translate(a)
        }, b.tooltips = !h.iOS, {}
    }), g("3d", ["2u"], function(a) {
        "use strict";
        return a.extend({
            recalc: function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E = [],
                    F = [];
                b = a.settings, e = a.items().filter(":visible"), f = a.layoutRect(), d = b.columns || Math.ceil(Math.sqrt(e.length)), c = Math.ceil(e.length / d), s = b.spacingH || b.spacing || 0, t = b.spacingV || b.spacing || 0, u = b.alignH || b.align, v = b.alignV || b.align, q = a.paddingBox, C = "reverseRows" in b ? b.reverseRows : a.isRtl(), u && "string" == typeof u && (u = [u]), v && "string" == typeof v && (v = [v]);
                for (l = 0; l < d; l++) E.push(0);
                for (m = 0; m < c; m++) F.push(0);
                for (m = 0; m < c; m++)
                    for (l = 0; l < d && (k = e[m * d + l], k); l++) j = k.layoutRect(), y = j.minW, z = j.minH, E[l] = y > E[l] ? y : E[l], F[m] = z > F[m] ? z : F[m];
                for (A = f.innerW - q.left - q.right, w = 0, l = 0; l < d; l++) w += E[l] + (l > 0 ? s : 0), A -= (l > 0 ? s : 0) + E[l];
                for (B = f.innerH - q.top - q.bottom, x = 0, m = 0; m < c; m++) x += F[m] + (m > 0 ? t : 0), B -= (m > 0 ? t : 0) + F[m];
                if (w += q.left + q.right, x += q.top + q.bottom, i = {}, i.minW = w + (f.w - f.innerW), i.minH = x + (f.h - f.innerH), i.contentW = i.minW - f.deltaW, i.contentH = i.minH - f.deltaH, i.minW = Math.min(i.minW, f.maxW), i.minH = Math.min(i.minH, f.maxH), i.minW = Math.max(i.minW, f.startMinWidth), i.minH = Math.max(i.minH, f.startMinHeight), !f.autoResize || i.minW == f.minW && i.minH == f.minH) {
                    f.autoResize && (i = a.layoutRect(i), i.contentW = i.minW - f.deltaW, i.contentH = i.minH - f.deltaH);
                    var G;
                    G = "start" == b.packV ? 0 : B > 0 ? Math.floor(B / c) : 0;
                    var H = 0,
                        I = b.flexWidths;
                    if (I)
                        for (l = 0; l < I.length; l++) H += I[l];
                    else H = d;
                    var J = A / H;
                    for (l = 0; l < d; l++) E[l] += I ? I[l] * J : J;
                    for (o = q.top, m = 0; m < c; m++) {
                        for (n = q.left, h = F[m] + G, l = 0; l < d && (D = C ? m * d + d - 1 - l : m * d + l, k = e[D], k); l++) p = k.settings, j = k.layoutRect(), g = Math.max(E[l], j.startMinWidth), j.x = n, j.y = o, r = p.alignH || (u ? u[l] || u[0] : null), "center" == r ? j.x = n + g / 2 - j.w / 2 : "right" == r ? j.x = n + g - j.w : "stretch" == r && (j.w = g), r = p.alignV || (v ? v[l] || v[0] : null), "center" == r ? j.y = o + h / 2 - j.h / 2 : "bottom" == r ? j.y = o + h - j.h : "stretch" == r && (j.h = h), k.layoutRect(j), n += g + s, k.recalc && k.recalc();
                        o += h + t
                    }
                } else if (i.w = i.minW, i.h = i.minH, a.layoutRect(i), this.recalc(a), null === a._lastRect) {
                    var K = a.parent();
                    K && (K._lastRect = null, K.recalc())
                }
            }
        })
    }), g("3e", ["2r", "5"], function(a, b) {
        "use strict";
        return a.extend({
            renderHtml: function() {
                var a = this;
                return a.classes.add("iframe"), a.canFocus = !1, '<iframe id="' + a._id + '" class="' + a.classes + '" tabindex="-1" src="' + (a.settings.url || "javascript:''") + '" frameborder="0"></iframe>'
            },
            src: function(a) {
                this.getEl().src = a
            },
            html: function(a, c) {
                var d = this,
                    e = this.getEl().contentWindow.document.body;
                return e ? (e.innerHTML = a, c && c()) : b.setTimeout(function() {
                    d.html(a)
                }), this
            }
        })
    }), g("3f", ["2r"], function(a) {
        "use strict";
        return a.extend({
            init: function(a) {
                var b = this;
                b._super(a), b.classes.add("widget").add("infobox"), b.canFocus = !1
            },
            severity: function(a) {
                this.classes.remove("error"), this.classes.remove("warning"), this.classes.remove("success"), this.classes.add(a)
            },
            help: function(a) {
                this.state.set("help", a)
            },
            renderHtml: function() {
                var a = this,
                    b = a.classPrefix;
                return '<div id="' + a._id + '" class="' + a.classes + '"><div id="' + a._id + '-body">' + a.encode(a.state.get("text")) + '<button role="button" tabindex="-1"><i class="' + b + "ico " + b + 'i-help"></i></button></div></div>'
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:text", function(b) {
                    a.getEl("body").firstChild.data = a.encode(b.value), a.state.get("rendered") && a.updateLayoutRect()
                }), a.state.on("change:help", function(b) {
                    a.classes.toggle("has-help", b.value), a.state.get("rendered") && a.updateLayoutRect()
                }), a._super()
            }
        })
    }), g("3g", ["2r", "4q"], function(a, b) {
        "use strict";
        return a.extend({
            init: function(a) {
                var b = this;
                b._super(a), b.classes.add("widget").add("label"), b.canFocus = !1, a.multiline && b.classes.add("autoscroll"), a.strong && b.classes.add("strong")
            },
            initLayoutRect: function() {
                var a = this,
                    c = a._super();
                if (a.settings.multiline) {
                    var d = b.getSize(a.getEl());
                    d.width > c.maxW && (c.minW = c.maxW, a.classes.add("multiline")), a.getEl().style.width = c.minW + "px", c.startMinH = c.h = c.minH = Math.min(c.maxH, b.getSize(a.getEl()).height)
                }
                return c
            },
            repaint: function() {
                var a = this;
                return a.settings.multiline || (a.getEl().style.lineHeight = a.layoutRect().h + "px"), a._super()
            },
            severity: function(a) {
                this.classes.remove("error"), this.classes.remove("warning"), this.classes.remove("success"), this.classes.add(a)
            },
            renderHtml: function() {
                var a, b, c = this,
                    d = c.settings.forId,
                    e = c.settings.html ? c.settings.html : c.encode(c.state.get("text"));
                return !d && (b = c.settings.forName) && (a = c.getRoot().find("#" + b)[0], a && (d = a._id)), d ? '<label id="' + c._id + '" class="' + c.classes + '"' + (d ? ' for="' + d + '"' : "") + ">" + e + "</label>" : '<span id="' + c._id + '" class="' + c.classes + '">' + e + "</span>"
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:text", function(b) {
                    a.innerHtml(a.encode(b.value)), a.state.get("rendered") && a.updateLayoutRect()
                }), a._super()
            }
        })
    }), g("3h", ["2j"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                role: "toolbar",
                layout: "flow"
            },
            init: function(a) {
                var b = this;
                b._super(a), b.classes.add("toolbar")
            },
            postRender: function() {
                var a = this;
                return a.items().each(function(a) {
                    a.classes.add("toolbar-item")
                }), a._super()
            }
        })
    }), g("3i", ["3h"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                role: "menubar",
                containerCls: "menubar",
                ariaRoot: !0,
                defaults: {
                    type: "menubutton"
                }
            }
        })
    }), g("3j", ["2v", "2h", "3i"], function(a, b, c) {
        "use strict";

        function d(a, b) {
            for (; a;) {
                if (b === a) return !0;
                a = a.parentNode
            }
            return !1
        }
        var e = a.extend({
            init: function(a) {
                var b = this;
                b._renderOpen = !0, b._super(a), a = b.settings, b.classes.add("menubtn"), a.fixedWidth && b.classes.add("fixed-width"), b.aria("haspopup", !0), b.state.set("menu", a.menu || b.render())
            },
            showMenu: function(a) {
                var c, d = this;
                return d.menu && d.menu.visible() && a !== !1 ? d.hideMenu() : (d.menu || (c = d.state.get("menu") || [], c.length ? c = {
                    type: "menu",
                    items: c
                } : c.type = c.type || "menu", c.renderTo ? d.menu = c.parent(d).show().renderTo() : d.menu = b.create(c).parent(d).renderTo(), d.fire("createmenu"), d.menu.reflow(), d.menu.on("cancel", function(a) {
                    a.control.parent() === d.menu && (a.stopPropagation(), d.focus(), d.hideMenu())
                }), d.menu.on("select", function() {
                    d.focus()
                }), d.menu.on("show hide", function(a) {
                    a.control == d.menu && d.activeMenu("show" == a.type), d.aria("expanded", "show" == a.type)
                }).fire("show")), d.menu.show(), d.menu.layoutRect({
                    w: d.layoutRect().w
                }), d.menu.moveRel(d.getEl(), d.isRtl() ? ["br-tr", "tr-br"] : ["bl-tl", "tl-bl"]), void d.fire("showmenu"))
            },
            hideMenu: function() {
                var a = this;
                a.menu && (a.menu.items().each(function(a) {
                    a.hideMenu && a.hideMenu()
                }), a.menu.hide())
            },
            activeMenu: function(a) {
                this.classes.toggle("active", a)
            },
            renderHtml: function() {
                var a, b = this,
                    d = b._id,
                    e = b.classPrefix,
                    f = b.settings.icon,
                    g = b.state.get("text"),
                    h = "";
                return a = b.settings.image, a ? (f = "none", "string" != typeof a && (a = window.getSelection ? a[0] : a[1]), a = " style=\"background-image: url('" + a + "')\"") : a = "", g && (b.classes.add("btn-has-text"), h = '<span class="' + e + 'txt">' + b.encode(g) + "</span>"), f = b.settings.icon ? e + "ico " + e + "i-" + f : "", b.aria("role", b.parent() instanceof c ? "menuitem" : "button"), '<div id="' + d + '" class="' + b.classes + '" tabindex="-1" aria-labelledby="' + d + '"><button id="' + d + '-open" role="presentation" type="button" tabindex="-1">' + (f ? '<i class="' + f + '"' + a + "></i>" : "") + h + ' <i class="' + e + 'caret"></i></button></div>'
            },
            postRender: function() {
                var a = this;
                return a.on("click", function(b) {
                    b.control === a && d(b.target, a.getEl()) && (a.focus(), a.showMenu(!b.aria), b.aria && a.menu.items().filter(":visible")[0].focus())
                }), a.on("mouseenter", function(b) {
                    var c, d = b.control,
                        f = a.parent();
                    d && f && d instanceof e && d.parent() == f && (f.items().filter("MenuButton").each(function(a) {
                        a.hideMenu && a != d && (a.menu && a.menu.visible() && (c = !0), a.hideMenu())
                    }), c && (d.focus(), d.showMenu()))
                }), a._super()
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:menu", function() {
                    a.menu && a.menu.remove(), a.menu = null
                }), a._super()
            },
            remove: function() {
                this._super(), this.menu && this.menu.remove()
            }
        });
        return e
    }), g("3k", ["2r", "2h", "6", "5"], function(a, b, c, d) {
        "use strict";
        return a.extend({
            Defaults: {
                border: 0,
                role: "menuitem"
            },
            init: function(a) {
                var b, c = this;
                c._super(a), a = c.settings, c.classes.add("menu-item"), a.menu && c.classes.add("menu-item-expand"), a.preview && c.classes.add("menu-item-preview"), b = c.state.get("text"), "-" !== b && "|" !== b || (c.classes.add("menu-item-sep"), c.aria("role", "separator"), c.state.set("text", "-")), a.selectable && (c.aria("role", "menuitemcheckbox"), c.classes.add("menu-item-checkbox"), a.icon = "selected"), a.preview || a.selectable || c.classes.add("menu-item-normal"), c.on("mousedown", function(a) {
                    a.preventDefault()
                }), a.menu && !a.ariaHideMenu && c.aria("haspopup", !0)
            },
            hasMenus: function() {
                return !!this.settings.menu
            },
            showMenu: function() {
                var a, c = this,
                    d = c.settings,
                    e = c.parent();
                if (e.items().each(function(a) {
                        a !== c && a.hideMenu()
                    }), d.menu) {
                    a = c.menu, a ? a.show() : (a = d.menu, a.length ? a = {
                        type: "menu",
                        items: a
                    } : a.type = a.type || "menu", e.settings.itemDefaults && (a.itemDefaults = e.settings.itemDefaults), a = c.menu = b.create(a).parent(c).renderTo(), a.reflow(), a.on("cancel", function(b) {
                        b.stopPropagation(), c.focus(), a.hide()
                    }), a.on("show hide", function(a) {
                        a.control.items && a.control.items().each(function(a) {
                            a.active(a.settings.selected)
                        })
                    }).fire("show"), a.on("hide", function(b) {
                        b.control === a && c.classes.remove("selected")
                    }), a.submenu = !0), a._parentMenu = e, a.classes.add("menu-sub");
                    var f = a.testMoveRel(c.getEl(), c.isRtl() ? ["tl-tr", "bl-br", "tr-tl", "br-bl"] : ["tr-tl", "br-bl", "tl-tr", "bl-br"]);
                    a.moveRel(c.getEl(), f), a.rel = f, f = "menu-sub-" + f, a.classes.remove(a._lastRel).add(f), a._lastRel = f, c.classes.add("selected"), c.aria("expanded", !0)
                }
            },
            hideMenu: function() {
                var a = this;
                return a.menu && (a.menu.items().each(function(a) {
                    a.hideMenu && a.hideMenu()
                }), a.menu.hide(), a.aria("expanded", !1)), a
            },
            renderHtml: function() {
                function a(a) {
                    var b, d, e = {};
                    for (e = c.mac ? {
                            alt: "&#x2325;",
                            ctrl: "&#x2318;",
                            shift: "&#x21E7;",
                            meta: "&#x2318;"
                        } : {
                            meta: "Ctrl"
                        }, a = a.split("+"), b = 0; b < a.length; b++) d = e[a[b].toLowerCase()], d && (a[b] = d);
                    return a.join("+")
                }

                function b(a) {
                    return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }

                function d(a) {
                    var c = h.match || "";
                    return c ? a.replace(new RegExp(b(c), "gi"), function(a) {
                        return "!mce~match[" + a + "]mce~match!"
                    }) : a
                }

                function e(a) {
                    return a.replace(new RegExp(b("!mce~match["), "g"), "<b>").replace(new RegExp(b("]mce~match!"), "g"), "</b>")
                }
                var f = this,
                    g = f._id,
                    h = f.settings,
                    i = f.classPrefix,
                    j = f.state.get("text"),
                    k = f.settings.icon,
                    l = "",
                    m = h.shortcut,
                    n = f.encode(h.url),
                    o = "";
                return k && f.parent().classes.add("menu-has-icons"), h.image && (l = " style=\"background-image: url('" + h.image + "')\""), m && (m = a(m)), k = i + "ico " + i + "i-" + (f.settings.icon || "none"), o = "-" !== j ? '<i class="' + k + '"' + l + "></i>\xa0" : "", j = e(f.encode(d(j))), n = e(f.encode(d(n))), '<div id="' + g + '" class="' + f.classes + '" tabindex="-1">' + o + ("-" !== j ? '<span id="' + g + '-text" class="' + i + 'text">' + j + "</span>" : "") + (m ? '<div id="' + g + '-shortcut" class="' + i + 'menu-shortcut">' + m + "</div>" : "") + (h.menu ? '<div class="' + i + 'caret"></div>' : "") + (n ? '<div class="' + i + 'menu-item-link">' + n + "</div>" : "") + "</div>"
            },
            postRender: function() {
                var a = this,
                    b = a.settings,
                    c = b.textStyle;
                if ("function" == typeof c && (c = c.call(this)), c) {
                    var e = a.getEl("text");
                    e && e.setAttribute("style", c)
                }
                return a.on("mouseenter click", function(c) {
                    c.control === a && (b.menu || "click" !== c.type ? (a.showMenu(), c.aria && a.menu.focus(!0)) : (a.fire("select"), d.requestAnimationFrame(function() {
                        a.parent().hideAll()
                    })))
                }), a._super(), a
            },
            hover: function() {
                var a = this;
                return a.parent().items().each(function(a) {
                    a.classes.remove("selected")
                }), a.classes.toggle("selected", !0), a
            },
            active: function(a) {
                return "undefined" != typeof a && this.aria("checked", a), this._super(a)
            },
            remove: function() {
                this._super(), this.menu && this.menu.remove()
            }
        })
    }), g("3l", ["a", "2g", "5"], function(a, b, c) {
        "use strict";
        return function(d, e) {
            var f, g, h = this,
                i = b.classPrefix;
            h.show = function(b, j) {
                function k() {
                    f && (a(d).append('<div class="' + i + "throbber" + (e ? " " + i + "throbber-inline" : "") + '"></div>'), j && j())
                }
                return h.hide(), f = !0, b ? g = c.setTimeout(k, b) : k(), h
            }, h.hide = function() {
                var a = d.lastChild;
                return c.clearTimeout(g), a && a.className.indexOf("throbber") != -1 && a.parentNode.removeChild(a), f = !1, h
            }
        }
    }), g("3m", ["2p", "3k", "3l", "9"], function(a, b, c, d) {
        "use strict";
        return a.extend({
            Defaults: {
                defaultType: "menuitem",
                border: 1,
                layout: "stack",
                role: "application",
                bodyRole: "menu",
                ariaRoot: !0
            },
            init: function(a) {
                var b = this;
                if (a.autohide = !0, a.constrainToViewport = !0, "function" == typeof a.items && (a.itemsFactory = a.items, a.items = []), a.itemDefaults)
                    for (var c = a.items, e = c.length; e--;) c[e] = d.extend({}, a.itemDefaults, c[e]);
                b._super(a), b.classes.add("menu")
            },
            repaint: function() {
                return this.classes.toggle("menu-align", !0),
                    this._super(), this.getEl().style.height = "", this.getEl("body").style.height = "", this
            },
            cancel: function() {
                var a = this;
                a.hideAll(), a.fire("select")
            },
            load: function() {
                function a() {
                    e.throbber && (e.throbber.hide(), e.throbber = null)
                }
                var b, d, e = this;
                d = e.settings.itemsFactory, d && (e.throbber || (e.throbber = new c(e.getEl("body"), !0), 0 === e.items().length ? (e.throbber.show(), e.fire("loading")) : e.throbber.show(100, function() {
                    e.items().remove(), e.fire("loading")
                }), e.on("hide close", a)), e.requestTime = b = (new Date).getTime(), e.settings.itemsFactory(function(c) {
                    return 0 === c.length ? void e.hide() : void(e.requestTime === b && (e.getEl().style.width = "", e.getEl("body").style.width = "", a(), e.items().remove(), e.getEl("body").innerHTML = "", e.add(c), e.renderNew(), e.fire("loaded")))
                }))
            },
            hideAll: function() {
                var a = this;
                return this.find("menuitem").exec("hideMenu"), a._super()
            },
            preRender: function() {
                var a = this;
                return a.items().each(function(b) {
                    var c = b.settings;
                    if (c.icon || c.image || c.selectable) return a._hasIcons = !0, !1
                }), a.settings.itemsFactory && a.on("postrender", function() {
                    a.settings.itemsFactory && a.load()
                }), a._super()
            }
        })
    }), g("3n", ["3j", "3m"], function(a, b) {
        "use strict";
        return a.extend({
            init: function(a) {
                function b(c) {
                    for (var f = 0; f < c.length; f++) {
                        if (d = c[f].selected || a.value === c[f].value) return e = e || c[f].text, g.state.set("value", c[f].value), !0;
                        if (c[f].menu && b(c[f].menu)) return !0
                    }
                }
                var c, d, e, f, g = this;
                g._super(a), a = g.settings, g._values = c = a.values, c && ("undefined" != typeof a.value && b(c), !d && c.length > 0 && (e = c[0].text, g.state.set("value", c[0].value)), g.state.set("menu", c)), g.state.set("text", a.text || e), g.classes.add("listbox"), g.on("select", function(b) {
                    var c = b.control;
                    f && (b.lastControl = f), a.multiple ? c.active(!c.active()) : g.value(b.control.value()), f = c
                })
            },
            bindStates: function() {
                function a(a, c) {
                    a instanceof b && a.items().each(function(a) {
                        a.hasMenus() || a.active(a.value() === c)
                    })
                }

                function c(a, b) {
                    var d;
                    if (a)
                        for (var e = 0; e < a.length; e++) {
                            if (a[e].value === b) return a[e];
                            if (a[e].menu && (d = c(a[e].menu, b))) return d
                        }
                }
                var d = this;
                return d.on("show", function(b) {
                    a(b.control, d.value())
                }), d.state.on("change:value", function(a) {
                    var b = c(d.state.get("menu"), a.value);
                    b ? d.text(b.text) : d.text(d.settings.text)
                }), d._super()
            }
        })
    }), g("3o", ["2x"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                classes: "radio",
                role: "radio"
            }
        })
    }), g("3p", ["2r", "2k"], function(a, b) {
        "use strict";
        return a.extend({
            renderHtml: function() {
                var a = this,
                    b = a.classPrefix;
                return a.classes.add("resizehandle"), "both" == a.settings.direction && a.classes.add("resizehandle-both"), a.canFocus = !1, '<div id="' + a._id + '" class="' + a.classes + '"><i class="' + b + "ico " + b + 'i-resize"></i></div>'
            },
            postRender: function() {
                var a = this;
                a._super(), a.resizeDragHelper = new b(this._id, {
                    start: function() {
                        a.fire("ResizeStart")
                    },
                    drag: function(b) {
                        "both" != a.settings.direction && (b.deltaX = 0), a.fire("Resize", b)
                    },
                    stop: function() {
                        a.fire("ResizeEnd")
                    }
                })
            },
            remove: function() {
                return this.resizeDragHelper && this.resizeDragHelper.destroy(), this._super()
            }
        })
    }), g("3q", ["2r"], function(a) {
        "use strict";

        function b(a) {
            var b = "";
            if (a)
                for (var c = 0; c < a.length; c++) b += '<option value="' + a[c] + '">' + a[c] + "</option>";
            return b
        }
        return a.extend({
            Defaults: {
                classes: "selectbox",
                role: "selectbox",
                options: []
            },
            init: function(a) {
                var b = this;
                b._super(a), b.settings.size && (b.size = b.settings.size), b.settings.options && (b._options = b.settings.options), b.on("keydown", function(a) {
                    var c;
                    13 == a.keyCode && (a.preventDefault(), b.parents().reverse().each(function(a) {
                        if (a.toJSON) return c = a, !1
                    }), b.fire("submit", {
                        data: c.toJSON()
                    }))
                })
            },
            options: function(a) {
                return arguments.length ? (this.state.set("options", a), this) : this.state.get("options")
            },
            renderHtml: function() {
                var a, c = this,
                    d = "";
                return a = b(c._options), c.size && (d = ' size = "' + c.size + '"'), '<select id="' + c._id + '" class="' + c.classes + '"' + d + ">" + a + "</select>"
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:options", function(c) {
                    a.getEl().innerHTML = b(c.value)
                }), a._super()
            }
        })
    }), g("3r", ["2r", "2k", "4q"], function(a, b, c) {
        "use strict";

        function d(a, b, c) {
            return a < b && (a = b), a > c && (a = c), a
        }

        function e(a, b, c) {
            a.setAttribute("aria-" + b, c)
        }

        function f(a, b) {
            var d, f, g, h, i, j;
            "v" == a.settings.orientation ? (h = "top", g = "height", f = "h") : (h = "left", g = "width", f = "w"), j = a.getEl("handle"), d = (a.layoutRect()[f] || 100) - c.getSize(j)[g], i = d * ((b - a._minValue) / (a._maxValue - a._minValue)) + "px", j.style[h] = i, j.style.height = a.layoutRect().h + "px", e(j, "valuenow", b), e(j, "valuetext", "" + a.settings.previewFilter(b)), e(j, "valuemin", a._minValue), e(j, "valuemax", a._maxValue)
        }
        return a.extend({
            init: function(a) {
                var b = this;
                a.previewFilter || (a.previewFilter = function(a) {
                    return Math.round(100 * a) / 100
                }), b._super(a), b.classes.add("slider"), "v" == a.orientation && b.classes.add("vertical"), b._minValue = a.minValue || 0, b._maxValue = a.maxValue || 100, b._initValue = b.state.get("value")
            },
            renderHtml: function() {
                var a = this,
                    b = a._id,
                    c = a.classPrefix;
                return '<div id="' + b + '" class="' + a.classes + '"><div id="' + b + '-handle" class="' + c + 'slider-handle" role="slider" tabindex="-1"></div></div>'
            },
            reset: function() {
                this.value(this._initValue).repaint()
            },
            postRender: function() {
                function a(a, b, c) {
                    return (c + a) / (b - a)
                }

                function e(a, b, c) {
                    return c * (b - a) - a
                }

                function f(b, c) {
                    function f(f) {
                        var g;
                        g = n.value(), g = e(b, c, a(b, c, g) + .05 * f), g = d(g, b, c), n.value(g), n.fire("dragstart", {
                            value: g
                        }), n.fire("drag", {
                            value: g
                        }), n.fire("dragend", {
                            value: g
                        })
                    }
                    n.on("keydown", function(a) {
                        switch (a.keyCode) {
                            case 37:
                            case 38:
                                f(-1);
                                break;
                            case 39:
                            case 40:
                                f(1)
                        }
                    })
                }

                function g(a, e, f) {
                    var g, h, i, o, p;
                    n._dragHelper = new b(n._id, {
                        handle: n._id + "-handle",
                        start: function(a) {
                            g = a[j], h = parseInt(n.getEl("handle").style[k], 10), i = (n.layoutRect()[m] || 100) - c.getSize(f)[l], n.fire("dragstart", {
                                value: p
                            })
                        },
                        drag: function(b) {
                            var c = b[j] - g;
                            o = d(h + c, 0, i), f.style[k] = o + "px", p = a + o / i * (e - a), n.value(p), n.tooltip().text("" + n.settings.previewFilter(p)).show().moveRel(f, "bc tc"), n.fire("drag", {
                                value: p
                            })
                        },
                        stop: function() {
                            n.tooltip().hide(), n.fire("dragend", {
                                value: p
                            })
                        }
                    })
                }
                var h, i, j, k, l, m, n = this;
                h = n._minValue, i = n._maxValue, "v" == n.settings.orientation ? (j = "screenY", k = "top", l = "height", m = "h") : (j = "screenX", k = "left", l = "width", m = "w"), n._super(), f(h, i, n.getEl("handle")), g(h, i, n.getEl("handle"))
            },
            repaint: function() {
                this._super(), f(this, this.value())
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:value", function(b) {
                    f(a, b.value)
                }), a._super()
            }
        })
    }), g("3s", ["2r"], function(a) {
        "use strict";
        return a.extend({
            renderHtml: function() {
                var a = this;
                return a.classes.add("spacer"), a.canFocus = !1, '<div id="' + a._id + '" class="' + a.classes + '"></div>'
            }
        })
    }), g("3t", ["3j", "4q", "a"], function(a, b, c) {
        return a.extend({
            Defaults: {
                classes: "widget btn splitbtn",
                role: "button"
            },
            repaint: function() {
                var a, d, e = this,
                    f = e.getEl(),
                    g = e.layoutRect();
                return e._super(), a = f.firstChild, d = f.lastChild, c(a).css({
                    width: g.w - b.getSize(d).width,
                    height: g.h - 2
                }), c(d).css({
                    height: g.h - 2
                }), e
            },
            activeMenu: function(a) {
                var b = this;
                c(b.getEl().lastChild).toggleClass(b.classPrefix + "active", a)
            },
            renderHtml: function() {
                var a, b = this,
                    c = b._id,
                    d = b.classPrefix,
                    e = b.state.get("icon"),
                    f = b.state.get("text"),
                    g = "";
                return a = b.settings.image, a ? (e = "none", "string" != typeof a && (a = window.getSelection ? a[0] : a[1]), a = " style=\"background-image: url('" + a + "')\"") : a = "", e = b.settings.icon ? d + "ico " + d + "i-" + e : "", f && (b.classes.add("btn-has-text"), g = '<span class="' + d + 'txt">' + b.encode(f) + "</span>"), '<div id="' + c + '" class="' + b.classes + '" role="button" tabindex="-1"><button type="button" hidefocus="1" tabindex="-1">' + (e ? '<i class="' + e + '"' + a + "></i>" : "") + g + '</button><button type="button" class="' + d + 'open" hidefocus="1" tabindex="-1">' + (b._menuBtnText ? (e ? "\xa0" : "") + b._menuBtnText : "") + ' <i class="' + d + 'caret"></i></button></div>'
            },
            postRender: function() {
                var a = this,
                    b = a.settings.onclick;
                return a.on("click", function(a) {
                    var c = a.target;
                    if (a.control == this)
                        for (; c;) {
                            if (a.aria && "down" != a.aria.key || "BUTTON" == c.nodeName && c.className.indexOf("open") == -1) return a.stopImmediatePropagation(), void(b && b.call(this, a));
                            c = c.parentNode
                        }
                }), delete a.settings.onclick, a._super()
            }
        })
    }), g("3u", ["3b"], function(a) {
        "use strict";
        return a.extend({
            Defaults: {
                containerClass: "stack-layout",
                controlClass: "stack-layout-item",
                endClass: "break"
            },
            isNative: function() {
                return !0
            }
        })
    }), g("3v", ["2m", "a", "4q"], function(a, b, c) {
        "use strict";
        return a.extend({
            Defaults: {
                layout: "absolute",
                defaults: {
                    type: "panel"
                }
            },
            activateTab: function(a) {
                var c;
                this.activeTabId && (c = this.getEl(this.activeTabId), b(c).removeClass(this.classPrefix + "active"), c.setAttribute("aria-selected", "false")), this.activeTabId = "t" + a, c = this.getEl("t" + a), c.setAttribute("aria-selected", "true"), b(c).addClass(this.classPrefix + "active"), this.items()[a].show().fire("showtab"), this.reflow(), this.items().each(function(b, c) {
                    a != c && b.hide()
                })
            },
            renderHtml: function() {
                var a = this,
                    b = a._layout,
                    c = "",
                    d = a.classPrefix;
                return a.preRender(), b.preRender(a), a.items().each(function(b, e) {
                    var f = a._id + "-t" + e;
                    b.aria("role", "tabpanel"), b.aria("labelledby", f), c += '<div id="' + f + '" class="' + d + 'tab" unselectable="on" role="tab" aria-controls="' + b._id + '" aria-selected="false" tabIndex="-1">' + a.encode(b.settings.title) + "</div>"
                }), '<div id="' + a._id + '" class="' + a.classes + '" hidefocus="1" tabindex="-1"><div id="' + a._id + '-head" class="' + d + 'tabs" role="tablist">' + c + '</div><div id="' + a._id + '-body" class="' + a.bodyClasses + '">' + b.renderHtml(a) + "</div></div>"
            },
            postRender: function() {
                var a = this;
                a._super(), a.settings.activeTab = a.settings.activeTab || 0, a.activateTab(a.settings.activeTab), this.on("click", function(b) {
                    var c = b.target.parentNode;
                    if (c && c.id == a._id + "-head")
                        for (var d = c.childNodes.length; d--;) c.childNodes[d] == b.target && a.activateTab(d)
                })
            },
            initLayoutRect: function() {
                var a, b, d, e = this;
                b = c.getSize(e.getEl("head")).width, b = b < 0 ? 0 : b, d = 0, e.items().each(function(a) {
                    b = Math.max(b, a.layoutRect().minW), d = Math.max(d, a.layoutRect().minH)
                }), e.items().each(function(a) {
                    a.settings.x = 0, a.settings.y = 0, a.settings.w = b, a.settings.h = d, a.layoutRect({
                        x: 0,
                        y: 0,
                        w: b,
                        h: d
                    })
                });
                var f = c.getSize(e.getEl("head")).height;
                return e.settings.minWidth = b, e.settings.minHeight = d + f, a = e._super(), a.deltaH += f, a.innerH = a.h - a.deltaH, a
            }
        })
    }), g("3w", ["2r", "9", "4q"], function(a, b, c) {
        return a.extend({
            init: function(a) {
                var b = this;
                b._super(a), b.classes.add("textbox"), a.multiline ? b.classes.add("multiline") : (b.on("keydown", function(a) {
                    var c;
                    13 == a.keyCode && (a.preventDefault(), b.parents().reverse().each(function(a) {
                        if (a.toJSON) return c = a, !1
                    }), b.fire("submit", {
                        data: c.toJSON()
                    }))
                }), b.on("keyup", function(a) {
                    b.state.set("value", a.target.value)
                }))
            },
            repaint: function() {
                var a, b, c, d, e, f = this,
                    g = 0;
                a = f.getEl().style, b = f._layoutRect, e = f._lastRepaintRect || {};
                var h = document;
                return !f.settings.multiline && h.all && (!h.documentMode || h.documentMode <= 8) && (a.lineHeight = b.h - g + "px"), c = f.borderBox, d = c.left + c.right + 8, g = c.top + c.bottom + (f.settings.multiline ? 8 : 0), b.x !== e.x && (a.left = b.x + "px", e.x = b.x), b.y !== e.y && (a.top = b.y + "px", e.y = b.y), b.w !== e.w && (a.width = b.w - d + "px", e.w = b.w), b.h !== e.h && (a.height = b.h - g + "px", e.h = b.h), f._lastRepaintRect = e, f.fire("repaint", {}, !1), f
            },
            renderHtml: function() {
                var a, d, e = this,
                    f = e.settings;
                return a = {
                    id: e._id,
                    hidefocus: "1"
                }, b.each(["rows", "spellcheck", "maxLength", "size", "readonly", "min", "max", "step", "list", "pattern", "placeholder", "required", "multiple"], function(b) {
                    a[b] = f[b]
                }), e.disabled() && (a.disabled = "disabled"), f.subtype && (a.type = f.subtype), d = c.create(f.multiline ? "textarea" : "input", a), d.value = e.state.get("value"), d.className = e.classes, d.outerHTML
            },
            value: function(a) {
                return arguments.length ? (this.state.set("value", a), this) : (this.state.get("rendered") && this.state.set("value", this.getEl().value), this.state.get("value"))
            },
            postRender: function() {
                var a = this;
                a.getEl().value = a.state.get("value"), a._super(), a.$el.on("change", function(b) {
                    a.state.set("value", b.target.value), a.fire("change", b)
                })
            },
            bindStates: function() {
                var a = this;
                return a.state.on("change:value", function(b) {
                    a.getEl().value != b.value && (a.getEl().value = b.value)
                }), a.state.on("change:disabled", function(b) {
                    a.getEl().disabled = b.value
                }), a._super()
            },
            remove: function() {
                this.$el.off(), this._super()
            }
        })
    }), g("1f", ["2d", "2e", "2f", "2g", "2h", "2i", "2j", "2k", "2l", "2m", "2n", "2o", "2p", "23", "24", "2q", "2r", "2s", "25", "2t", "2u", "2v", "2w", "2x", "2y", "2z", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h", "3i", "3j", "3k", "3l", "3m", "3n", "3o", "3p", "3q", "3r", "3s", "3t", "3u", "3v", "3w"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea) {
        "use strict";
        var fa = function(a, b) {
                e.add(a.split(".").pop(), b)
            },
            ga = function(a, b, c) {
                var d, e;
                for (e = b.split(/[.\/]/), d = 0; d < e.length - 1; ++d) void 0 === a[e[d]] && (a[e[d]] = {}), a = a[e[d]];
                a[e[e.length - 1]] = c, fa(b, c)
            },
            ha = function(fa) {
                ga(fa, "ui.Selector", a), ga(fa, "ui.Collection", b), ga(fa, "ui.ReflowQueue", c), ga(fa, "ui.Control", d), ga(fa, "ui.Factory", e), ga(fa, "ui.KeyboardNavigation", f), ga(fa, "ui.Container", g), ga(fa, "ui.DragHelper", h), ga(fa, "ui.Scrollable", i), ga(fa, "ui.Panel", j), ga(fa, "ui.Movable", k), ga(fa, "ui.Resizable", l), ga(fa, "ui.FloatPanel", m), ga(fa, "ui.Window", n), ga(fa, "ui.MessageBox", o), ga(fa, "ui.Tooltip", p), ga(fa, "ui.Widget", q), ga(fa, "ui.Progress", r), ga(fa, "ui.Notification", s), ga(fa, "ui.Layout", t), ga(fa, "ui.AbsoluteLayout", u), ga(fa, "ui.Button", v), ga(fa, "ui.ButtonGroup", w), ga(fa, "ui.Checkbox", x), ga(fa, "ui.ComboBox", y), ga(fa, "ui.ColorBox", z), ga(fa, "ui.PanelButton", A), ga(fa, "ui.ColorButton", B), ga(fa, "ui.ColorPicker", C), ga(fa, "ui.Path", D), ga(fa, "ui.ElementPath", E), ga(fa, "ui.FormItem", F), ga(fa, "ui.Form", G), ga(fa, "ui.FieldSet", H), ga(fa, "ui.FilePicker", I), ga(fa, "ui.FitLayout", J), ga(fa, "ui.FlexLayout", K), ga(fa, "ui.FlowLayout", L), ga(fa, "ui.FormatControls", M), ga(fa, "ui.GridLayout", N), ga(fa, "ui.Iframe", O), ga(fa, "ui.InfoBox", P), ga(fa, "ui.Label", Q), ga(fa, "ui.Toolbar", R), ga(fa, "ui.MenuBar", S), ga(fa, "ui.MenuButton", T), ga(fa, "ui.MenuItem", U), ga(fa, "ui.Throbber", V), ga(fa, "ui.Menu", W), ga(fa, "ui.ListBox", X), ga(fa, "ui.Radio", Y), ga(fa, "ui.ResizeHandle", Z), ga(fa, "ui.SelectBox", $), ga(fa, "ui.Slider", _), ga(fa, "ui.Spacer", aa), ga(fa, "ui.SplitButton", ba), ga(fa, "ui.StackLayout", ca), ga(fa, "ui.TabPanel", da), ga(fa, "ui.TextBox", ea), ga(fa, "ui.Api", ia)
            },
            ia = {
                appendTo: ha
            };
        return ia
    }), g("1", ["3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W) {
        var X = O,
            Y = function(a, b, c) {
                var d, e;
                for (e = b.split(/[.\/]/), d = 0; d < e.length - 1; ++d) void 0 === a[e[d]] && (a[e[d]] = {}), a = a[e[d]];
                a[e[e.length - 1]] = c
            };
        return Y(X, "geom.Rect", a), Y(X, "util.Promise", b), Y(X, "util.Delay", c), Y(X, "Env", d), Y(X, "dom.EventUtils", e), Y(X, "dom.Sizzle", f), Y(X, "util.Tools", g), Y(X, "dom.DomQuery", h), Y(X, "html.Styles", i), Y(X, "dom.TreeWalker", j), Y(X, "html.Entities", k), Y(X, "dom.DOMUtils", l), Y(X, "dom.ScriptLoader", m), Y(X, "AddOnManager", n), Y(X, "dom.RangeUtils", o), Y(X, "html.Node", p), Y(X, "html.Schema", q), Y(X, "html.SaxParser", r), Y(X, "html.DomParser", s), Y(X, "html.Writer", t), Y(X, "html.Serializer", u), Y(X, "dom.Serializer", v), Y(X, "util.VK", w), Y(X, "dom.ControlSelection", x), Y(X, "dom.BookmarkManager", y), Y(X, "dom.Selection", z), Y(X, "Formatter", A), Y(X, "UndoManager", B), Y(X, "EditorCommands", C), Y(X, "util.URI", D), Y(X, "util.Class", E), Y(X, "util.EventDispatcher", F), Y(X, "util.Observable", G), Y(X, "WindowManager", H), Y(X, "NotificationManager", I), Y(X, "EditorObservable", J), Y(X, "Shortcuts", K), Y(X, "Editor", L), Y(X, "util.I18n", M), Y(X, "FocusManager", N), Y(X, "EditorManager", O), Y(X, "util.XHR", P), Y(X, "util.JSON", Q), Y(X, "util.JSONRequest", R), Y(X, "util.JSONP", S), Y(X, "util.LocalStorage", T), Y(X, "Compat", U), Y(X, "util.Color", V), W.appendTo(X), U.register(X), X
    }), g("2", [], function() {
        var a = this || window,
            b = function(b) {
                "function" == typeof a.define && (a.define.amd || (a.define("ephox/tinymce", [], function() {
                    return b
                }), a.define("17", [], function() {
                    return b
                }))), "object" == typeof module && (module.exports = b)
            };
        return {
            exposeToModuleLoaders: b
        }
    }), g("0", ["1", "2"], function(a, b) {
        return function() {
            return window.tinymce = a, window.tinyMCE = a, b.exposeToModuleLoaders(a), a
        }
    }), d("0")()
}();