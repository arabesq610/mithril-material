/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(4);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// index.js
var m = __webpack_require__(3)
var mcm = __webpack_require__(6);

var button = {
    view: function() {
        return m(mcm.button, "hi");
    }
};

m.mount(document.body, button);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
		if (vnode.instance != null) onremove(vnode.instance)
		else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		for (var i = 0; i < hooks.length; i++) hooks[i]()
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.5"
m.vnode = Vnode
if (true) module["exports"] = m
else window.m = m
}());
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).setImmediate, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var _Mathsqrt=Math.sqrt,_Mathpow=Math.pow,_Mathmax=Math.max,_Mathabs=Math.abs,_Mathround=Math.round;(function(n,r){ true?module.exports=r():'function'==typeof define&&define.amd?define([],r):'object'==typeof exports?exports.materialComponentsMithril=r():n.materialComponentsMithril=r()})(this,function(){return function(a){function n(d){if(r[d])return r[d].exports;var l=r[d]={i:d,l:!1,exports:{}};return a[d].call(l.exports,l,l.exports,n),l.l=!0,l.exports}var r={};return n.m=a,n.c=r,n.i=function(d){return d},n.d=function(d,l,u){n.o(d,l)||Object.defineProperty(d,l,{configurable:!1,enumerable:!0,get:u})},n.n=function(d){var l=d&&d.__esModule?function(){return d['default']}:function(){return d};return n.d(l,'a',l),l},n.o=function(d,l){return Object.prototype.hasOwnProperty.call(d,l)},n.p='',n(n.s=5)}([function(a,n,r){'use strict';function d(A){return A&&A.__esModule?A:{default:A}}function l(){for(var A=arguments,T={},S=0;S<arguments.length;++S)arguments[S]&&Object.keys(arguments[S]).forEach(function(I){T[I]=A[S][I]});return T}function u(A,T){var S={};return Object.keys(A).filter(T).forEach(function(I){S[I]=A[I]}),S}Object.defineProperty(n,'__esModule',{value:!0});var h=r(1),b=d(h),C=r(6),E=d(C);n.default=function(A,T){var S=l(A),I=T||{},D={};return Object.keys(S).filter(function(N){return 0<=E.default.indexOf(N)}).forEach(function(N){D[N]=S[N],delete S[N]}),l(D,{view:function(P){var M=l(S,u(P.attrs,function(R){return 0>E.default.indexOf(R)}));'class'in S&&'class'in P.attrs&&(M.class=S.class.split(' ').concat(P.attrs.class.split(' ')).filter(function(R,O,F){return R&&F.indexOf(R)===O}).join(' ')),Object.keys(I).filter(function(R){return R in M}).forEach(function(R){I[R].call(M,M[R],P.attrs),delete M[R]});var w='';return'tagName'in M&&(w=M.tagName,delete M.tagName),(0,b.default)(w,M,P.children)}})}},function(a,n,r){'use strict';(function(d,l){var u='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(h){return typeof h}:function(h){return h&&'function'==typeof Symbol&&h.constructor===Symbol&&h!==Symbol.prototype?'symbol':typeof h};(function(){'use strict';function h(K,$,q,X,W,Y){return{tag:K,key:$,attrs:q,children:X,text:W,dom:Y,domSize:void 0,state:void 0,_state:void 0,events:void 0,instance:void 0,skip:!1}}function b(K){for(var $,q='div',X=[],W={};$=T.exec(K);){var Y=$[1],Z=$[2];if(''===Y&&''!==Z)q=Z;else if('#'===Y)W.id=Z;else if('.'===Y)X.push(Z);else if('['===$[3][0]){var Q=$[6];Q&&(Q=Q.replace(/\\(["'])/g,'$1').replace(/\\\\/g,'\\')),'class'===$[4]?X.push(Q):W[$[4]]=Q||!0}}return 0<X.length&&(W.className=X.join(' ')),S[K]={tag:q,attrs:W}}function C(K,$,q){var W,Y,X=!1,Z=$.className||$.class;for(var Q in K.attrs)I.call(K.attrs,Q)&&($[Q]=K.attrs[Q]);for(var Q in void 0!==Z&&(void 0!==$.class&&($.class=void 0,$.className=Z),null!=K.attrs.className&&($.className=K.attrs.className+' '+Z)),$)if(I.call($,Q)&&'key'!=Q){X=!0;break}return Array.isArray(q)&&1===q.length&&null!=q[0]&&'#'===q[0].tag?Y=q[0].children:W=q,h(K.tag,$.key,X?$:void 0,W,Y)}function E(K){var X,$=arguments[1],q=2;if(null==K||'string'!=typeof K&&'function'!=typeof K&&'function'!=typeof K.view)throw Error('The selector must be either a string or a component.');if('string'==typeof K)var W=S[K]||b(K);if(null==$?$={}:('object'!==('undefined'==typeof $?'undefined':u($))||null!=$.tag||Array.isArray($))&&($={},q=1),arguments.length===q+1)X=arguments[q],Array.isArray(X)||(X=[X]);else for(X=[];q<arguments.length;)X.push(arguments[q++]);var Y=h.normalizeChildren(X);return'string'==typeof K?C(W,$,Y):h(K,$.key,$,Y)}function A(K){var $=16,q=0,X=null,W='function'==typeof requestAnimationFrame?requestAnimationFrame:setTimeout;return function(){var Y=Date.now();0==q||Y-q>=$?(q=Y,K()):null==X&&(X=W(function(){X=null,K(),q=Date.now()},$-(Y-q)))}}h.normalize=function(K){return Array.isArray(K)?h('[',void 0,void 0,h.normalizeChildren(K),void 0,void 0):null!=K&&'object'!==('undefined'==typeof K?'undefined':u(K))?h('#',void 0,void 0,!1===K?'':K,void 0,void 0):K},h.normalizeChildren=function($){for(var q=0;q<$.length;q++)$[q]=h.normalize($[q]);return $};var T=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,S={},I={}.hasOwnProperty;E.trust=function(K){return null==K&&(K=''),h('<',void 0,void 0,K,void 0,void 0)},E.fragment=function(K,$){return h('[',K.key,K,h.normalizeChildren($),void 0,void 0)};var D=E,N=function K($){function q(ae,ne){return function ie(re){var de;try{if(ne&&null!=re&&('object'===('undefined'==typeof re?'undefined':u(re))||'function'==typeof re)&&'function'==typeof(de=re.then)){if(re===W)throw new TypeError('Promise can\'t be resolved w/ itself');X(de.bind(re))}else te(function(){ne||0!==ae.length||console.error('Possible unhandled promise rejection:',re);for(var oe=0;oe<ae.length;oe++)ae[oe](re);Y.length=0,Z.length=0,ee.state=ne,ee.retry=function(){ie(re)}})}catch(oe){J(oe)}}}function X(ae){function ne(de){return function(oe){0<ie++||de(oe)}}var ie=0,re=ne(J);try{ae(ne(Q),re)}catch(de){re(de)}}if(!(this instanceof K))throw new Error('Promise must be called with `new`');if('function'!=typeof $)throw new TypeError('executor must be a function');var W=this,Y=[],Z=[],Q=q(Y,!0),J=q(Z,!1),ee=W._instance={resolvers:Y,rejectors:Z},te='function'==typeof d?d:setTimeout;X($)};if(N.prototype.then=function(K,$){function q(J,ee,te,ae){ee.push(function(ne){if('function'!=typeof J)te(ne);else try{Y(J(ne))}catch(ie){Z&&Z(ie)}}),'function'==typeof W.retry&&ae===W.state&&W.retry()}var Y,Z,X=this,W=X._instance,Q=new N(function(J,ee){Y=J,Z=ee});return q(K,W.resolvers,Y,!0),q($,W.rejectors,Z,!1),Q},N.prototype.catch=function(K){return this.then(null,K)},N.resolve=function(K){return K instanceof N?K:new N(function($){$(K)})},N.reject=function(K){return new N(function($,q){q(K)})},N.all=function(K){return new N(function($,q){var X=K.length,W=0,Y=[];if(0===K.length)$([]);else for(var Z=0;Z<K.length;Z++)(function(Q){function J(ee){W++,Y[Q]=ee,W===X&&$(Y)}null!=K[Q]&&('object'===u(K[Q])||'function'==typeof K[Q])&&'function'==typeof K[Q].then?K[Q].then(J,q):J(K[Q])})(Z)})},N.race=function(K){return new N(function($,q){for(var X=0;X<K.length;X++)K[X].then($,q)})},'undefined'!=typeof window){'undefined'==typeof window.Promise&&(window.Promise=N);var N=window.Promise}else if('undefined'!=typeof l){'undefined'==typeof l.Promise&&(l.Promise=N);var N=l.Promise}else;var P=function($){function q(Y,Z){if(Array.isArray(Z))for(var Q=0;Q<Z.length;Q++)q(Y+'['+Q+']',Z[Q]);else if('[object Object]'===Object.prototype.toString.call(Z))for(var Q in Z)q(Y+'['+Q+']',Z[Q]);else X.push(encodeURIComponent(Y)+(null!=Z&&''!==Z?'='+encodeURIComponent(Z):''))}if('[object Object]'!==Object.prototype.toString.call($))return'';var X=[];for(var W in $)q(W,$[W]);return X.join('&')},M=/^file:\/\//i,R=function($,q){function W(){function de(){0==--oe&&'function'==typeof re&&re()}var oe=0;return function se(le){var ue=le.then;return le.then=function(){oe++;var ce=ue.apply(le,arguments);return ce.then(de,function(_e){if(de(),0==oe)throw _e}),se(ce)},le}}function Y(de,oe){if('string'==typeof de){var se=de;de=oe||{},null==de.url&&(de.url=se)}return de}function J(de,oe){if(null==oe)return de;for(var ue,se=de.match(/:[^\/]+/gi)||[],le=0;le<se.length;le++)ue=se[le].slice(1),null!=oe[ue]&&(de=de.replace(se[le],oe[ue]));return de}function ee(de,oe){var se=P(oe);if(''!==se){var le=0>de.indexOf('?')?'?':'&';de+=le+se}return de}function te(de){try{return''===de?null:JSON.parse(de)}catch(oe){throw new Error(de)}}function ae(de){return de.responseText}function ne(de,oe){if('function'==typeof de)if(Array.isArray(oe))for(var se=0;se<oe.length;se++)oe[se]=new de(oe[se]);else return new de(oe);return oe}var re,ie=0;return{request:function(de,oe){var se=W();de=Y(de,oe);var le=new q(function(ue,ce){null==de.method&&(de.method='GET'),de.method=de.method.toUpperCase();var _e='GET'===de.method||'TRACE'===de.method?!1:'boolean'!=typeof de.useBody||de.useBody;'function'!=typeof de.serialize&&(de.serialize='undefined'!=typeof FormData&&de.data instanceof FormData?function(ye){return ye}:JSON.stringify),'function'!=typeof de.deserialize&&(de.deserialize=te),'function'!=typeof de.extract&&(de.extract=ae),de.url=J(de.url,de.data),_e?de.data=de.serialize(de.data):de.url=ee(de.url,de.data);var fe=new $.XMLHttpRequest,pe=!1,me=fe.abort;for(var ge in fe.abort=function(){pe=!0,me.call(fe)},fe.open(de.method,de.url,'boolean'!=typeof de.async||de.async,'string'==typeof de.user?de.user:void 0,'string'==typeof de.password?de.password:void 0),de.serialize===JSON.stringify&&_e&&fe.setRequestHeader('Content-Type','application/json; charset=utf-8'),de.deserialize===te&&fe.setRequestHeader('Accept','application/json, text/*'),de.withCredentials&&(fe.withCredentials=de.withCredentials),de.headers)({}).hasOwnProperty.call(de.headers,ge)&&fe.setRequestHeader(ge,de.headers[ge]);'function'==typeof de.config&&(fe=de.config(fe,de)||fe),fe.onreadystatechange=function(){if(!pe&&4===fe.readyState)try{var ye=de.extract===ae?de.deserialize(de.extract(fe,de)):de.extract(fe,de);if(200<=fe.status&&300>fe.status||304===fe.status||M.test(de.url))ue(ne(de.type,ye));else{var ve=new Error(fe.responseText);for(var he in ye)ve[he]=ye[he];ce(ve)}}catch(be){ce(be)}},_e&&null!=de.data?fe.send(de.data):fe.send()});return!0===de.background?le:se(le)},jsonp:function(de,oe){var se=W();de=Y(de,oe);var le=new q(function(ue,ce){var _e=de.callbackName||'_mithril_'+_Mathround(1e16*Math.random())+'_'+ie++,fe=$.document.createElement('script');$[_e]=function(pe){fe.parentNode.removeChild(fe),ue(ne(de.type,pe)),delete $[_e]},fe.onerror=function(){fe.parentNode.removeChild(fe),ce(new Error('JSONP request failed')),delete $[_e]},null==de.data&&(de.data={}),de.url=J(de.url,de.data),de.data[de.callbackKey||'callback']=_e,fe.src=ee(de.url,de.data),$.document.documentElement.appendChild(fe)});return!0===de.background?le:se(le)},setCompletionCallback:function(de){re=de}}}(window,N),O=function($){function X(Le,He,Ve,ze,Ue,Be,Ge){for(var je,Ke=Ve;Ke<ze;Ke++)je=He[Ke],null!=je&&W(Le,je,Ue,Ge,Be)}function W(Le,He,Ve,ze,Ue){var Be=He.tag;return'string'==typeof Be?(He.state={},null!=He.attrs&&Ne(He.attrs,He,Ve),'#'===Be?Y(Le,He,Ue):'<'===Be?Z(Le,He,Ue):'['===Be?Q(Le,He,Ve,ze,Ue):J(Le,He,Ve,ze,Ue)):te(Le,He,Ve,ze,Ue)}function Y(Le,He,Ve){return He.dom=Re.createTextNode(He.children),fe(Le,He.dom,Ve),He.dom}function Z(Le,He,Ve){var ze=He.children.match(/^\s*?<(\w+)/im)||[],Ue={caption:'table',thead:'table',tbody:'table',tfoot:'table',tr:'tbody',th:'tr',td:'tr',colgroup:'table',col:'colgroup'}[ze[1]]||'div',Be=Re.createElement(Ue);Be.innerHTML=He.children,He.dom=Be.firstChild,He.domSize=Be.childNodes.length;for(var Ke,Ge=Re.createDocumentFragment();Ke=Be.firstChild;)Ge.appendChild(Ke);return fe(Le,Ge,Ve),Ge}function Q(Le,He,Ve,ze,Ue){var Be=Re.createDocumentFragment();if(null!=He.children){var Ge=He.children;X(Be,Ge,0,Ge.length,Ve,null,ze)}return He.dom=Be.firstChild,He.domSize=Be.childNodes.length,fe(Le,Be,Ue),Be}function J(Le,He,Ve,ze,Ue){var Be=He.tag;switch(He.tag){case'svg':ze='http://www.w3.org/2000/svg';break;case'math':ze='http://www.w3.org/1998/Math/MathML';}var Ge=He.attrs,Ke=Ge&&Ge.is,je=ze?Ke?Re.createElementNS(ze,Be,{is:Ke}):Re.createElementNS(ze,Be):Ke?Re.createElement(Be,{is:Ke}):Re.createElement(Be);if(He.dom=je,null!=Ge&&he(He,Ge,ze),fe(Le,je,Ue),null!=He.attrs&&null!=He.attrs.contenteditable)pe(He);else if(null!=He.text&&(''===He.text?He.children=[h('#',void 0,void 0,He.text,void 0,void 0)]:je.textContent=He.text),null!=He.children){var $e=He.children;X(je,$e,0,$e.length,Ve,null,ze),Ce(He)}return je}function ee(Le,He){var Ve;if('function'==typeof Le.tag.view){if(Le.state=Object.create(Le.tag),Ve=Le.state.view,null!=Ve.$$reentrantLock$$)return Oe;Ve.$$reentrantLock$$=!0}else{if(Le.state=void 0,Ve=Le.tag,null!=Ve.$$reentrantLock$$)return Oe;Ve.$$reentrantLock$$=!0,Le.state=null!=Le.tag.prototype&&'function'==typeof Le.tag.prototype.view?new Le.tag(Le):Le.tag(Le)}if(Le._state=Le.state,null!=Le.attrs&&Ne(Le.attrs,Le,He),Ne(Le._state,Le,He),Le.instance=h.normalize(Le._state.view.call(Le.state,Le)),Le.instance===Le)throw Error('A view cannot return the vnode it received as argument');Ve.$$reentrantLock$$=null}function te(Le,He,Ve,ze,Ue){if(ee(He,Ve),null!=He.instance){var Be=W(Le,He.instance,Ve,ze,Ue);return He.dom=He.instance.dom,He.domSize=null==He.dom?0:He.instance.domSize,fe(Le,Be,Ue),Be}return He.domSize=0,Oe}function ae(Le,He,Ve,ze,Ue,Be,Ge){if(He!==Ve&&(null!=He||null!=Ve))if(null==He)X(Le,Ve,0,Ve.length,Ue,Be,void 0);else if(null==Ve)me(He,0,He.length,Ve);else{if(He.length===Ve.length){for(var Ke=!1,je=0;je<Ve.length;je++)if(null!=Ve[je]&&null!=He[je]){Ke=null==Ve[je].key&&null==He[je].key;break}if(Ke){for(var je=0;je<He.length;je++)if(He[je]===Ve[je])continue;else null==He[je]&&null!=Ve[je]?W(Le,Ve[je],Ue,Ge,_e(He,je+1,Be)):null==Ve[je]?me(He,je,je+1,Ve):ne(Le,He[je],Ve[je],Ue,_e(He,je+1,Be),ze,Ge);return}}if(ze=ze||le(He,Ve),ze){var $e=He.pool;He=He.concat(He.pool)}for(var Ze,qe=0,Xe=0,We=He.length-1,Ye=Ve.length-1;We>=qe&&Ye>=Xe;){var Qe=He[qe],Je=Ve[Xe];if(Qe===Je&&!ze)qe++,Xe++;else if(null==Qe)qe++;else if(null==Je)Xe++;else if(Qe.key===Je.key){var et=null!=$e&&qe>=He.length-$e.length||null==$e&&ze;qe++,Xe++,ne(Le,Qe,Je,Ue,_e(He,qe,Be),et,Ge),ze&&Qe.tag===Je.tag&&fe(Le,ce(Qe),Be)}else{var Qe=He[We];if(Qe===Je&&!ze)We--,Xe++;else if(null==Qe)We--;else if(null==Je)Xe++;else if(Qe.key===Je.key){var et=null!=$e&&We>=He.length-$e.length||null==$e&&ze;ne(Le,Qe,Je,Ue,_e(He,We+1,Be),et,Ge),(ze||Xe<Ye)&&fe(Le,ce(Qe),_e(He,qe,Be)),We--,Xe++}else break}}for(;We>=qe&&Ye>=Xe;){var Qe=He[We],Je=Ve[Ye];if(Qe===Je&&!ze)We--,Ye--;else if(null==Qe)We--;else if(null==Je)Ye--;else if(Qe.key===Je.key){var et=null!=$e&&We>=He.length-$e.length||null==$e&&ze;ne(Le,Qe,Je,Ue,_e(He,We+1,Be),et,Ge),ze&&Qe.tag===Je.tag&&fe(Le,ce(Qe),Be),null!=Qe.dom&&(Be=Qe.dom),We--,Ye--}else{if(Ze||(Ze=ue(He,We)),null!=Je){var tt=Ze[Je.key];if(null!=tt){var at=He[tt],et=null!=$e&&tt>=He.length-$e.length||null==$e&&ze;ne(Le,at,Je,Ue,_e(He,We+1,Be),ze,Ge),fe(Le,ce(at),Be),He[tt].skip=!0,null!=at.dom&&(Be=at.dom)}else{var nt=W(Le,Je,Ue,void 0,Be);Be=nt}}Ye--}if(Ye<Xe)break}X(Le,Ve,Xe,Ye+1,Ue,Be,Ge),me(He,qe,We+1,Ve)}}function ne(Le,He,Ve,ze,Ue,Be,Ge){var Ke=He.tag,je=Ve.tag;if(Ke===je){if(Ve.state=He.state,Ve._state=He._state,Ve.events=He.events,!Be&&Me(Ve,He))return;'string'==typeof Ke?(null!=Ve.attrs&&(Be?(Ve.state={},Ne(Ve.attrs,Ve,ze)):Pe(Ve.attrs,Ve,ze)),'#'===Ke?ie(He,Ve):'<'===Ke?re(Le,He,Ve,Ue):'['===Ke?de(Le,He,Ve,Be,ze,Ue,Ge):oe(He,Ve,Be,ze,Ge)):se(Le,He,Ve,ze,Ue,Be,Ge)}else ge(He,null),W(Le,Ve,ze,Ge,Ue)}function ie(Le,He){Le.children.toString()!==He.children.toString()&&(Le.dom.nodeValue=He.children),He.dom=Le.dom}function re(Le,He,Ve,ze){He.children===Ve.children?(Ve.dom=He.dom,Ve.domSize=He.domSize):(ce(He),Z(Le,Ve,ze))}function de(Le,He,Ve,ze,Ue,Be,Ge){ae(Le,He.children,Ve.children,ze,Ue,Be,Ge);var Ke=0,je=Ve.children;if(Ve.dom=null,null!=je){for(var qe,$e=0;$e<je.length;$e++)qe=je[$e],null!=qe&&null!=qe.dom&&(null==Ve.dom&&(Ve.dom=qe.dom),Ke+=qe.domSize||1);1!==Ke&&(Ve.domSize=Ke)}}function oe(Le,He,Ve,ze,Ue){var Be=He.dom=Le.dom;switch(He.tag){case'svg':Ue='http://www.w3.org/2000/svg';break;case'math':Ue='http://www.w3.org/1998/Math/MathML';}'textarea'===He.tag&&(null==He.attrs&&(He.attrs={}),null!=He.text&&(He.attrs.value=He.text,He.text=void 0)),ke(He,Le.attrs,He.attrs,Ue),null!=He.attrs&&null!=He.attrs.contenteditable?pe(He):null!=Le.text&&null!=He.text&&''!==He.text?Le.text.toString()!==He.text.toString()&&(Le.dom.firstChild.nodeValue=He.text):(null!=Le.text&&(Le.children=[h('#',void 0,void 0,Le.text,void 0,Le.dom.firstChild)]),null!=He.text&&(He.children=[h('#',void 0,void 0,He.text,void 0,void 0)]),ae(Be,Le.children,He.children,Ve,ze,null,Ue))}function se(Le,He,Ve,ze,Ue,Be,Ge){if(Be)ee(Ve,ze);else{if(Ve.instance=h.normalize(Ve._state.view.call(Ve.state,Ve)),Ve.instance===Ve)throw Error('A view cannot return the vnode it received as argument');null!=Ve.attrs&&Pe(Ve.attrs,Ve,ze),Pe(Ve._state,Ve,ze)}null==Ve.instance?null==He.instance?(Ve.dom=He.dom,Ve.domSize=He.domSize):(ge(He.instance,null),Ve.dom=void 0,Ve.domSize=0):(null==He.instance?W(Le,Ve.instance,ze,Ge,Ue):ne(Le,He.instance,Ve.instance,ze,Ue,Be,Ge),Ve.dom=Ve.instance.dom,Ve.domSize=Ve.instance.domSize)}function le(Le,He){if(null!=Le.pool&&_Mathabs(Le.pool.length-He.length)<=_Mathabs(Le.length-He.length)){var Ve=Le[0]&&Le[0].children&&Le[0].children.length||0,ze=Le.pool[0]&&Le.pool[0].children&&Le.pool[0].children.length||0,Ue=He[0]&&He[0].children&&He[0].children.length||0;if(_Mathabs(ze-Ue)<=_Mathabs(Ve-Ue))return!0}return!1}function ue(Le,He){for(var Ue,Ve={},ze=0,ze=0;ze<He;ze++)if(Ue=Le[ze],null!=Ue){var Be=Ue.key;null!=Be&&(Ve[Be]=ze)}return Ve}function ce(Le){var He=Le.domSize;if(null!=He||null==Le.dom){var Ve=Re.createDocumentFragment();if(0<He){for(var ze=Le.dom;--He;)Ve.appendChild(ze.nextSibling);Ve.insertBefore(ze,Ve.firstChild)}return Ve}return Le.dom}function _e(Le,He,Ve){for(;He<Le.length;He++)if(null!=Le[He]&&null!=Le[He].dom)return Le[He].dom;return Ve}function fe(Le,He,Ve){Ve&&Ve.parentNode?Le.insertBefore(He,Ve):Le.appendChild(He)}function pe(Le){var He=Le.children;if(null!=He&&1===He.length&&'<'===He[0].tag){var Ve=He[0].children;Le.dom.innerHTML!==Ve&&(Le.dom.innerHTML=Ve)}else if(null!=Le.text||null!=He&&0!==He.length)throw new Error('Child node of a contenteditable must be trusted')}function me(Le,He,Ve,ze){for(var Be,Ue=He;Ue<Ve;Ue++)Be=Le[Ue],null!=Be&&(Be.skip?Be.skip=!1:ge(Be,ze))}function ge(Le,He){function Ve(){if(++Ue==ze&&(ve(Le),Le.dom)){var Ge=Le.domSize||1;if(1<Ge)for(var Ke=Le.dom;--Ge;)ye(Ke.nextSibling);ye(Le.dom),null==He||null!=Le.domSize||Ie(Le.attrs)||'string'!=typeof Le.tag||(He.pool?He.pool.push(Le):He.pool=[Le])}}var ze=1,Ue=0;if(Le.attrs&&'function'==typeof Le.attrs.onbeforeremove){var Be=Le.attrs.onbeforeremove.call(Le.state,Le);null!=Be&&'function'==typeof Be.then&&(ze++,Be.then(Ve,Ve))}if('string'!=typeof Le.tag&&'function'==typeof Le._state.onbeforeremove){var Be=Le._state.onbeforeremove.call(Le.state,Le);null!=Be&&'function'==typeof Be.then&&(ze++,Be.then(Ve,Ve))}Ve()}function ye(Le){var He=Le.parentNode;null!=He&&He.removeChild(Le)}function ve(Le){if(Le.attrs&&'function'==typeof Le.attrs.onremove&&Le.attrs.onremove.call(Le.state,Le),'string'!=typeof Le.tag&&'function'==typeof Le._state.onremove&&Le._state.onremove.call(Le.state,Le),null!=Le.instance)ve(Le.instance);else{var He=Le.children;if(Array.isArray(He))for(var ze,Ve=0;Ve<He.length;Ve++)ze=He[Ve],null!=ze&&ve(ze)}}function he(Le,He,Ve){for(var ze in He)be(Le,ze,null,He[ze],Ve)}function be(Le,He,Ve,ze,Ue){var Be=Le.dom;if('key'!==He&&'is'!==He&&(Ve!==ze||Ee(Le,He)||'object'===('undefined'==typeof ze?'undefined':u(ze)))&&'undefined'!=typeof ze&&!Ae(He)){var Ge=He.indexOf(':');if(-1<Ge&&'xlink'===He.substr(0,Ge))Be.setAttributeNS('http://www.w3.org/1999/xlink',He.slice(Ge+1),ze);else if('o'===He[0]&&'n'===He[1]&&'function'==typeof ze)De(Le,He,ze);else if('style'===He)xe(Be,Ve,ze);else if(He in Be&&!Te(He)&&void 0===Ue&&!Se(Le)){if('input'===Le.tag&&'value'===He&&Le.dom.value==ze&&Le.dom===Re.activeElement)return;if('select'===Le.tag&&'value'===He&&Le.dom.value==ze&&Le.dom===Re.activeElement)return;if('option'===Le.tag&&'value'===He&&Le.dom.value==ze)return;if('input'===Le.tag&&'type'===He)return void Be.setAttribute(He,ze);Be[He]=ze}else'boolean'==typeof ze?ze?Be.setAttribute(He,''):Be.removeAttribute(He):Be.setAttribute('className'===He?'class':He,ze)}}function Ce(Le){var He=Le.attrs;'select'===Le.tag&&null!=He&&('value'in He&&be(Le,'value',null,He.value,void 0),'selectedIndex'in He&&be(Le,'selectedIndex',null,He.selectedIndex,void 0))}function ke(Le,He,Ve,ze){if(null!=Ve)for(var Ue in Ve)be(Le,Ue,He&&He[Ue],Ve[Ue],ze);if(null!=He)for(var Ue in He)null!=Ve&&Ue in Ve||('className'==Ue&&(Ue='class'),'o'!==Ue[0]||'n'!==Ue[1]||Ae(Ue)?'key'!=Ue&&Le.dom.removeAttribute(Ue):De(Le,Ue,void 0))}function Ee(Le,He){return'value'===He||'checked'===He||'selectedIndex'===He||'selected'===He&&Le.dom===Re.activeElement}function Ae(Le){return'oninit'===Le||'oncreate'===Le||'onupdate'===Le||'onremove'===Le||'onbeforeremove'===Le||'onbeforeupdate'===Le}function Te(Le){return'href'===Le||'list'===Le||'form'===Le||'width'===Le||'height'===Le}function Se(Le){return Le.attrs.is||-1<Le.tag.indexOf('-')}function Ie(Le){return null!=Le&&(Le.oncreate||Le.onupdate||Le.onbeforeremove||Le.onremove)}function xe(Le,He,Ve){if(He===Ve&&(Le.style.cssText='',He=null),null==Ve)Le.style.cssText='';else if('string'==typeof Ve)Le.style.cssText=Ve;else{for(var ze in'string'==typeof He&&(Le.style.cssText=''),Ve)Le.style[ze]=Ve[ze];if(null!=He&&'string'!=typeof He)for(var ze in He)ze in Ve||(Le.style[ze]='')}}function De(Le,He,Ve){var ze=Le.dom,Ue='function'==typeof Fe?function(Ge){var Ke=Ve.call(ze,Ge);return Fe.call(ze,Ge),Ke}:Ve;if(He in ze)ze[He]='function'==typeof Ve?Ue:null;else{var Be=He.slice(2);if(void 0===Le.events&&(Le.events={}),Le.events[He]===Ue)return;null!=Le.events[He]&&ze.removeEventListener(Be,Le.events[He],!1),'function'==typeof Ve&&(Le.events[He]=Ue,ze.addEventListener(Be,Le.events[He],!1))}}function Ne(Le,He,Ve){'function'==typeof Le.oninit&&Le.oninit.call(He.state,He),'function'==typeof Le.oncreate&&Ve.push(Le.oncreate.bind(He.state,He))}function Pe(Le,He,Ve){'function'==typeof Le.onupdate&&Ve.push(Le.onupdate.bind(He.state,He))}function Me(Le,He){var Ve,ze;return null!=Le.attrs&&'function'==typeof Le.attrs.onbeforeupdate&&(Ve=Le.attrs.onbeforeupdate.call(Le.state,Le,He)),'string'!=typeof Le.tag&&'function'==typeof Le._state.onbeforeupdate&&(ze=Le._state.onbeforeupdate.call(Le.state,Le,He)),void 0===Ve&&void 0===ze||Ve||ze?!1:(Le.dom=He.dom,Le.domSize=He.domSize,Le.instance=He.instance,!0)}var Fe,Re=$.document,Oe=Re.createDocumentFragment();return{render:function(Le,He){if(!Le)throw new Error('Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.');var Ve=[],ze=Re.activeElement;null==Le.vnodes&&(Le.textContent=''),Array.isArray(He)||(He=[He]),ae(Le,Le.vnodes,h.normalizeChildren(He),!1,Ve,null,void 0),Le.vnodes=He;for(var Ue=0;Ue<Ve.length;Ue++)Ve[Ue]();Re.activeElement!==ze&&ze.focus()},setEventCallback:function(Le){return Fe=Le}}},L=function($){function X(Q){var J=Z.indexOf(Q);-1<J&&Z.splice(J,2)}function W(){for(var Q=1;Q<Z.length;Q+=2)Z[Q]()}var Y=O($);Y.setEventCallback(function(Q){!1!==Q.redraw&&W()});var Z=[];return{subscribe:function(Q,J){X(Q),Z.push(Q,A(J))},unsubscribe:X,redraw:W,render:Y.render}}(window);R.setCompletionCallback(L.redraw);D.mount=function($){return function(q,X){if(null===X)return $.render(q,[]),void $.unsubscribe(q);if(null==X.view&&'function'!=typeof X)throw new Error('m.mount(element, component) expects a component, not a vnode');$.subscribe(q,function(){$.render(q,h(X))}),$.redraw()}}(L);var z=function($){if(''===$||null==$)return{};'?'===$.charAt(0)&&($=$.slice(1));for(var q=$.split('&'),X={},W={},Y=0;Y<q.length;Y++){var Z=q[Y].split('='),Q=decodeURIComponent(Z[0]),J=2===Z.length?decodeURIComponent(Z[1]):'';'true'===J?J=!0:'false'===J&&(J=!1);var ee=Q.split(/\]\[?|\[/),te=X;-1<Q.indexOf('[')&&ee.pop();for(var ae=0;ae<ee.length;ae++){var ne=ee[ae],ie=ee[ae+1],re=''==ie||!isNaN(parseInt(ie,10)),de=ae===ee.length-1;if(''===ne){var Q=ee.slice(0,ae).join();null==W[Q]&&(W[Q]=0),ne=W[Q]++}null==te[ne]&&(te[ne]=de?J:re?[]:{}),te=te[ne]}}return X},U=function($){function q(ee){var te=$.location[ee].replace(/(?:%[a-f89][a-f0-9])+/gim,decodeURIComponent);return'pathname'===ee&&'/'!==te[0]&&(te='/'+te),te}function X(ee){return function(){null!=Q||(Q=Z(function(){Q=null,ee()}))}}function W(ee,te,ae){var ne=ee.indexOf('?'),ie=ee.indexOf('#'),re=-1<ne?ne:-1<ie?ie:ee.length;if(-1<ne){var de=-1<ie?ie:ee.length,oe=z(ee.slice(ne+1,de));for(var se in oe)te[se]=oe[se]}if(-1<ie){var le=z(ee.slice(ie+1));for(var se in le)ae[se]=le[se]}return ee.slice(0,re)}var Q,Y='function'==typeof $.history.pushState,Z='function'==typeof d?d:setTimeout,J={prefix:'#!'};return J.getPath=function(){var ee=J.prefix.charAt(0);return'#'===ee?q('hash').slice(J.prefix.length):'?'===ee?q('search').slice(J.prefix.length)+q('hash'):q('pathname').slice(J.prefix.length)+q('search')+q('hash')},J.setPath=function(ee,te,ae){var ne={},ie={};if(ee=W(ee,ne,ie),null!=te){for(var re in te)ne[re]=te[re];ee=ee.replace(/:([^\/]+)/g,function(ue,ce){return delete ne[ce],te[ce]})}var de=P(ne);de&&(ee+='?'+de);var oe=P(ie);if(oe&&(ee+='#'+oe),Y){var se=ae?ae.state:null,le=ae?ae.title:null;$.onpopstate(),ae&&ae.replace?$.history.replaceState(se,le,J.prefix+ee):$.history.pushState(se,le,J.prefix+ee)}else $.location.href=J.prefix+ee},J.defineRoutes=function(ee,te,ae){function ne(){var ie=J.getPath(),re={},de=W(ie,re,re),oe=$.history.state;if(null!=oe)for(var se in oe)re[se]=oe[se];for(var le in ee){var ue=new RegExp('^'+le.replace(/:[^\/]+?\.{3}/g,'(.*?)').replace(/:[^\/]+/g,'([^\\/]+)')+'/?$');if(ue.test(de))return void de.replace(ue,function(){for(var ce=le.match(/:[^\/]+/g)||[],_e=[].slice.call(arguments,1,-2),fe=0;fe<ce.length;fe++)re[ce[fe].replace(/:|\./g,'')]=decodeURIComponent(_e[fe]);te(ee[le],re,ie,le)})}ae(ie,re)}Y?$.onpopstate=X(ne):'#'===J.prefix.charAt(0)&&($.onhashchange=ne),ne()},J};D.route=function($,q){var Y,Z,Q,J,ee,X=U($),W=function(ne){return ne},te=function(ne,ie,re){if(null==ne)throw new Error('Ensure the DOM element that was passed to `m.route` is not undefined');var de=function(){null!=Y&&q.render(ne,Y(h(Z,Q.key,Q)))},oe=function(le){if(le!==ie)X.setPath(ie,null,{replace:!0});else throw new Error('Could not resolve default route '+ie)};X.defineRoutes(re,function(se,le,ue){var ce=ee=function(fe,pe){ce!==ee||(Z=null!=pe&&('function'==typeof pe.view||'function'==typeof pe)?pe:'div',Q=le,J=ue,ee=null,Y=(fe.render||W).bind(fe),de())};se.view||'function'==typeof se?ce({},se):se.onmatch?N.resolve(se.onmatch(le,ue)).then(function(_e){ce(se,_e)},oe):ce(se,'div')},oe),q.subscribe(ne,de)};return te.set=function(ae,ne,ie){null!=ee&&(ie={replace:!0}),ee=null,X.setPath(ae,ne,ie)},te.get=function(){return J},te.prefix=function(ae){X.prefix=ae},te.link=function(ae){ae.dom.setAttribute('href',X.prefix+ae.attrs.href),ae.dom.onclick=function(ne){if(!(ne.ctrlKey||ne.metaKey||ne.shiftKey||2===ne.which)){ne.preventDefault(),ne.redraw=!1;var ie=this.getAttribute('href');0===ie.indexOf(X.prefix)&&(ie=ie.slice(X.prefix.length)),te.set(ie,void 0,void 0)}}},te.param=function(ae){return'undefined'!=typeof Q&&'undefined'!=typeof ae?Q[ae]:Q},te}(window,L),D.withAttr=function(K,$,q){return function(X){$.call(q||this,K in X.currentTarget?X.currentTarget[K]:X.currentTarget.getAttribute(K))}};var G=O(window);D.render=G.render,D.redraw=L.redraw,D.request=R.request,D.jsonp=R.jsonp,D.parseQueryString=z,D.buildQueryString=P,D.version='1.1.1',D.vnode=h,a.exports=D})()}).call(n,r(13).setImmediate,r(3))},function(a,n,r){'use strict';function d(h){return h&&h.__esModule?h:{default:h}}Object.defineProperty(n,'__esModule',{value:!0});var l=r(10);Object.defineProperty(n,'MDCFoundation',{enumerable:!0,get:function(){return d(l).default}});var u=r(34);Object.defineProperty(n,'MDCComponent',{enumerable:!0,get:function(){return d(u).default}})},function(a){'use strict';var d='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(u){return typeof u}:function(u){return u&&'function'==typeof Symbol&&u.constructor===Symbol&&u!==Symbol.prototype?'symbol':typeof u},l;l=function(){return this}();try{l=l||Function('return this')()||(1,eval)('this')}catch(u){'object'===('undefined'==typeof window?'undefined':d(window))&&(l=window)}a.exports=l},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(b){return b&&b.__esModule?b:{default:b}}(l),h=r(7);n.default=(0,u.default)({tagName:'button',class:'mdc-button',ripple:!0},{ripple:function(C){C&&(this.oncreate=function(E){h.MDCRipple.attachTo(E.dom)})},raised:function(C){this.class+=C?' mdc-button--raised':''},dense:function(C){this.class+=C?' mdc-button--dense':''},compact:function(C){this.class+=C?' mdc-button--compact':''},color:function(C){('primary'===C||'accent'===C)&&(this.class+=' mdc-button--'+C)},theme:function(C){this.class+='dark'===C?' mdc-button--theme-dark':''}})},function(a,n,r){'use strict';function d(ie){return ie&&ie.__esModule?ie:{default:ie}}Object.defineProperty(n,'__esModule',{value:!0}),n.listDivider=n.listGroupSubheader=n.listGroup=n.listItemContent=n.listItem=n.list=n.formField=n.dialog=n.checkbox=n.cardSubtitle=n.cardTitle=n.cardMediaItem=n.cardBlock=n.cardAction=n.card=n.toolbarTitle=n.toolbarSection=n.toolbar=n.button=void 0;var l=r(4),u=d(l),h=r(32),b=d(h),C=r(31),E=d(C),A=r(30),T=d(A),S=r(20),I=d(S),D=r(15),N=d(D),P=r(16),M=d(P),w=r(19),R=d(w),O=r(18),F=d(O),L=r(17),H=d(L),V=r(21),z=d(V),U=r(22),B=d(U),G=r(23),K=d(G),$=r(29),q=d($),X=r(28),W=d(X),Y=r(27),Z=d(Y),Q=r(26),J=d(Q),ee=r(25),te=d(ee),ae=r(24),ne=d(ae);n.button=u.default,n.toolbar=b.default,n.toolbarSection=T.default,n.toolbarTitle=E.default,n.card=I.default,n.cardAction=N.default,n.cardBlock=M.default,n.cardMediaItem=H.default,n.cardTitle=R.default,n.cardSubtitle=F.default,n.checkbox=z.default,n.dialog=B.default,n.formField=K.default,n.list=q.default,n.listItem=W.default,n.listItemContent=Z.default,n.listGroup=J.default,n.listGroupSubheader=te.default,n.listDivider=ne.default},function(a,n){'use strict';Object.defineProperty(n,'__esModule',{value:!0}),n.default=['oninit','oncreate','onupdate','onbeforeremove','onremove','onbeforeupdate']},function(a,n,r){'use strict';(function(d){var l,u,h,b='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(C){return typeof C}:function(C){return C&&'function'==typeof Symbol&&C.constructor===Symbol&&C!==Symbol.prototype?'symbol':typeof C};(function(E,A){'object'===b(n)&&'object'===b(d)?d.exports=A():(u=[],l=A,h='function'==typeof l?l.apply(n,u):l,!(h!==void 0&&(d.exports=h)))})(void 0,function(){return function(C){function E(T){if(A[T])return A[T].exports;var S=A[T]={i:T,l:!1,exports:{}};return C[T].call(S.exports,S,S.exports,E),S.l=!0,S.exports}var A={};return E.m=C,E.c=A,E.i=function(T){return T},E.d=function(T,S,I){E.o(T,S)||Object.defineProperty(T,S,{configurable:!1,enumerable:!0,get:I})},E.n=function(T){var S=T&&T.__esModule?function(){return T['default']}:function(){return T};return E.d(S,'a',S),S},E.o=function(T,S){return Object.prototype.hasOwnProperty.call(T,S)},E.p='/assets/',E(E.s=54)}({0:function(E,A,T){'use strict';Object.defineProperty(A,'__esModule',{value:!0});var S=T(1);T.d(A,'MDCFoundation',function(){return S.a});var I=T(2);T.d(A,'MDCComponent',function(){return I.a})},1:function(E,A){'use strict';function S(N,P){if(!(N instanceof P))throw new TypeError('Cannot call a class as a function')}var I=function(){function N(P,M){for(var R,w=0;w<M.length;w++)R=M[w],R.enumerable=R.enumerable||!1,R.configurable=!0,'value'in R&&(R.writable=!0),Object.defineProperty(P,R.key,R)}return function(P,M,w){return M&&N(P.prototype,M),w&&N(P,w),P}}(),D=function(){function N(){var P=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};S(this,N),this.adapter_=P}return I(N,null,[{key:'cssClasses',get:function(){return{}}},{key:'strings',get:function(){return{}}},{key:'numbers',get:function(){return{}}},{key:'defaultAdapter',get:function(){return{}}}]),I(N,[{key:'init',value:function(){}},{key:'destroy',value:function(){}}]),N}();A.a=D},2:function(E,A,T){'use strict';function S(P,M){if(!(P instanceof M))throw new TypeError('Cannot call a class as a function')}var I=T(1),D=function(){function P(M,w){for(var O,R=0;R<w.length;R++)O=w[R],O.enumerable=O.enumerable||!1,O.configurable=!0,'value'in O&&(O.writable=!0),Object.defineProperty(M,O.key,O)}return function(M,w,R){return w&&P(M.prototype,w),R&&P(M,R),M}}(),N=function(){function P(M){var w=1<arguments.length&&void 0!==arguments[1]?arguments[1]:void 0;S(this,P),this.root_=M;for(var R=arguments.length,O=Array(2<R?R-2:0),F=2;F<R;F++)O[F-2]=arguments[F];this.initialize.apply(this,O),this.foundation_=void 0===w?this.getDefaultFoundation():w,this.foundation_.init(),this.initialSyncWithDOM()}return D(P,null,[{key:'attachTo',value:function(w){return new P(w,new I.a())}}]),D(P,[{key:'initialize',value:function(){}},{key:'getDefaultFoundation',value:function(){throw new Error('Subclasses must override getDefaultFoundation to return a properly configured foundation class')}},{key:'initialSyncWithDOM',value:function(){}},{key:'destroy',value:function(){this.foundation_.destroy()}},{key:'listen',value:function(w,R){this.root_.addEventListener(w,R)}},{key:'unlisten',value:function(w,R){this.root_.removeEventListener(w,R)}},{key:'emit',value:function(w,R){var O;'function'==typeof CustomEvent?O=new CustomEvent(w,{detail:R}):(O=document.createEvent('CustomEvent'),O.initCustomEvent(w,!1,!1,R)),this.root_.dispatchEvent(O)}}]),P}();A.a=N},3:function(E,A){'use strict';A.b=function(N){var P=N.CSS&&'function'==typeof N.CSS.supports;if(P){var M=N.CSS.supports('--css-vars','yes'),w=N.CSS.supports('(--css-vars: yes)')&&N.CSS.supports('color','#00000000');return M||w}},A.a=function(N){return['webkitMatchesSelector','msMatchesSelector','matches'].filter(function(P){return P in N}).pop()},A.c=function(N,P,M){var L,H,w=P.x,R=P.y,O=w+M.left,F=R+M.top;return'touchstart'===N.type?(L=N.changedTouches[0].pageX-O,H=N.changedTouches[0].pageY-F):(L=N.pageX-O,H=N.pageY-F),{x:L,y:H}}},4:function(E,A,T){'use strict';function S(F,L){if(!(F instanceof L))throw new TypeError('Cannot call a class as a function')}function I(F,L){if(!F)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return L&&('object'===('undefined'==typeof L?'undefined':b(L))||'function'==typeof L)?L:F}function D(F,L){if('function'!=typeof L&&null!==L)throw new TypeError('Super expression must either be null or a function, not '+('undefined'==typeof L?'undefined':b(L)));F.prototype=Object.create(L&&L.prototype,{constructor:{value:F,enumerable:!1,writable:!0,configurable:!0}}),L&&(Object.setPrototypeOf?Object.setPrototypeOf(F,L):F.__proto__=L)}Object.defineProperty(A,'__esModule',{value:!0});var N=T(0),P=T(6),M=T(3);T.d(A,'MDCRippleFoundation',function(){return P.a}),T.d(A,'MDCRipple',function(){return O});var w=function(){function F(L,H){for(var z,V=0;V<H.length;V++)z=H[V],z.enumerable=z.enumerable||!1,z.configurable=!0,'value'in z&&(z.writable=!0),Object.defineProperty(L,z.key,z)}return function(L,H,V){return H&&F(L.prototype,H),V&&F(L,V),L}}(),R=T.i(M.a)(HTMLElement.prototype),O=function(F){function L(){return S(this,L),I(this,(L.__proto__||Object.getPrototypeOf(L)).apply(this,arguments))}return D(L,F),w(L,[{key:'activate',value:function(){this.foundation_.activate()}},{key:'deactivate',value:function(){this.foundation_.deactivate()}},{key:'getDefaultFoundation',value:function(){return new P.a(L.createAdapter(this))}},{key:'initialSyncWithDOM',value:function(){this.unbounded='mdcRippleIsUnbounded'in this.root_.dataset}},{key:'unbounded',get:function(){return this.unbounded_},set:function(V){var z=P.a.cssClasses.UNBOUNDED;this.unbounded_=!!V,this.unbounded_?this.root_.classList.add(z):this.root_.classList.remove(z)}}],[{key:'attachTo',value:function(V){var z=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},U=z.isUnbounded,B=void 0===U?void 0:U,G=new L(V);return void 0!==B&&(G.unbounded=B),G}},{key:'createAdapter',value:function(V){return{browserSupportsCssVars:function(){return T.i(M.b)(window)},isUnbounded:function(){return V.unbounded},isSurfaceActive:function(){return V.root_[R](':active')},addClass:function(U){return V.root_.classList.add(U)},removeClass:function(U){return V.root_.classList.remove(U)},registerInteractionHandler:function(U,B){return V.root_.addEventListener(U,B)},deregisterInteractionHandler:function(U,B){return V.root_.removeEventListener(U,B)},registerResizeHandler:function(U){return window.addEventListener('resize',U)},deregisterResizeHandler:function(U){return window.removeEventListener('resize',U)},updateCssVariable:function(U,B){return V.root_.style.setProperty(U,B)},computeBoundingRect:function(){return V.root_.getBoundingClientRect()},getWindowPageOffset:function(){return{x:window.pageXOffset,y:window.pageYOffset}}}}}]),L}(N.MDCComponent)},5:function(E,A,T){'use strict';T.d(A,'a',function(){return S}),T.d(A,'b',function(){return I}),T.d(A,'c',function(){return D});var S={ROOT:'mdc-ripple-upgraded',UNBOUNDED:'mdc-ripple-upgraded--unbounded',BG_FOCUSED:'mdc-ripple-upgraded--background-focused',BG_ACTIVE_FILL:'mdc-ripple-upgraded--background-active-fill',FG_ACTIVATION:'mdc-ripple-upgraded--foreground-activation',FG_DEACTIVATION:'mdc-ripple-upgraded--foreground-deactivation'},I={VAR_SURFACE_WIDTH:'--mdc-ripple-surface-width',VAR_SURFACE_HEIGHT:'--mdc-ripple-surface-height',VAR_FG_SIZE:'--mdc-ripple-fg-size',VAR_LEFT:'--mdc-ripple-left',VAR_TOP:'--mdc-ripple-top',VAR_FG_SCALE:'--mdc-ripple-fg-scale',VAR_FG_TRANSLATE_START:'--mdc-ripple-fg-translate-start',VAR_FG_TRANSLATE_END:'--mdc-ripple-fg-translate-end'},D={PADDING:10,INITIAL_ORIGIN_SCALE:0.6,DEACTIVATION_TIMEOUT_MS:300}},54:function(E,A,T){E.exports=T(4)},6:function(E,A,T){'use strict';function S(L,H){if(!(L instanceof H))throw new TypeError('Cannot call a class as a function')}function I(L,H){if(!L)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return H&&('object'===('undefined'==typeof H?'undefined':b(H))||'function'==typeof H)?H:L}function D(L,H){if('function'!=typeof H&&null!==H)throw new TypeError('Super expression must either be null or a function, not '+('undefined'==typeof H?'undefined':b(H)));L.prototype=Object.create(H&&H.prototype,{constructor:{value:L,enumerable:!1,writable:!0,configurable:!0}}),H&&(Object.setPrototypeOf?Object.setPrototypeOf(L,H):L.__proto__=H)}var N=T(0),P=T(5),M=T(3),w=Object.assign||function(L){for(var V,H=1;H<arguments.length;H++)for(var z in V=arguments[H],V)Object.prototype.hasOwnProperty.call(V,z)&&(L[z]=V[z]);return L},R=function(){function L(H,V){for(var U,z=0;z<V.length;z++)U=V[z],U.enumerable=U.enumerable||!1,U.configurable=!0,'value'in U&&(U.writable=!0),Object.defineProperty(H,U.key,U)}return function(H,V,z){return V&&L(H.prototype,V),z&&L(H,z),H}}(),O={mouseup:'mousedown',pointerup:'pointerdown',touchend:'touchstart',keyup:'keydown',blur:'focus'},F=function(L){function H(V){S(this,H);var z=I(this,(H.__proto__||Object.getPrototypeOf(H)).call(this,w(H.defaultAdapter,V)));return z.layoutFrame_=0,z.frame_={width:0,height:0},z.activationState_=z.defaultActivationState_(),z.xfDuration_=0,z.initialSize_=0,z.maxRadius_=0,z.listenerInfos_=[{activate:'touchstart',deactivate:'touchend'},{activate:'pointerdown',deactivate:'pointerup'},{activate:'mousedown',deactivate:'mouseup'},{activate:'keydown',deactivate:'keyup'},{focus:'focus',blur:'blur'}],z.listeners_={activate:function(B){return z.activate_(B)},deactivate:function(B){return z.deactivate_(B)},focus:function(){return requestAnimationFrame(function(){return z.adapter_.addClass(H.cssClasses.BG_FOCUSED)})},blur:function(){return requestAnimationFrame(function(){return z.adapter_.removeClass(H.cssClasses.BG_FOCUSED)})}},z.resizeHandler_=function(){return z.layout()},z.unboundedCoords_={left:0,top:0},z.fgScale_=0,z.activationTimer_=0,z.activationAnimationHasEnded_=!1,z.activationTimerCallback_=function(){z.activationAnimationHasEnded_=!0,z.runDeactivationUXLogicIfReady_()},z}return D(H,L),R(H,[{key:'isSupported_',get:function(){return this.adapter_.browserSupportsCssVars()}}],[{key:'cssClasses',get:function(){return P.a}},{key:'strings',get:function(){return P.b}},{key:'numbers',get:function(){return P.c}},{key:'defaultAdapter',get:function(){return{browserSupportsCssVars:function(){},isUnbounded:function(){},isSurfaceActive:function(){},addClass:function(){},removeClass:function(){},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},registerResizeHandler:function(){},deregisterResizeHandler:function(){},updateCssVariable:function(){},computeBoundingRect:function(){},getWindowPageOffset:function(){}}}}]),R(H,[{key:'defaultActivationState_',value:function(){return{isActivated:!1,hasDeactivationUXRun:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1,activationStartTime:0,activationEvent:null,isProgrammatic:!1}}},{key:'init',value:function(){var z=this;if(this.isSupported_){this.addEventListeners_();var U=H.cssClasses,B=U.ROOT,G=U.UNBOUNDED;requestAnimationFrame(function(){z.adapter_.addClass(B),z.adapter_.isUnbounded()&&z.adapter_.addClass(G),z.layoutInternal_()})}}},{key:'addEventListeners_',value:function(){var z=this;this.listenerInfos_.forEach(function(U){Object.keys(U).forEach(function(B){z.adapter_.registerInteractionHandler(U[B],z.listeners_[B])})}),this.adapter_.registerResizeHandler(this.resizeHandler_)}},{key:'activate_',value:function(z){var U=this,B=this.activationState_;B.isActivated||(B.isActivated=!0,B.isProgrammatic=null===z,B.activationEvent=z,B.wasActivatedByPointer=!B.isProgrammatic&&('mousedown'===z.type||'touchstart'===z.type||'pointerdown'===z.type),B.activationStartTime=Date.now(),requestAnimationFrame(function(){B.wasElementMadeActive=z&&'keydown'===z.type?U.adapter_.isSurfaceActive():!0,B.wasElementMadeActive?U.animateActivation_():U.activationState_=U.defaultActivationState_()}))}},{key:'activate',value:function(){this.activate_(null)}},{key:'animateActivation_',value:function(){var z=this,U=H.strings,B=U.VAR_FG_TRANSLATE_START,G=U.VAR_FG_TRANSLATE_END,K=H.cssClasses,$=K.BG_ACTIVE_FILL,q=K.FG_DEACTIVATION,X=K.FG_ACTIVATION,W=H.numbers.DEACTIVATION_TIMEOUT_MS,Y='',Z='';if(!this.adapter_.isUnbounded()){var Q=this.getFgTranslationCoordinates_(),J=Q.startPoint,ee=Q.endPoint;Y=J.x+'px, '+J.y+'px',Z=ee.x+'px, '+ee.y+'px'}this.adapter_.updateCssVariable(B,Y),this.adapter_.updateCssVariable(G,Z),clearTimeout(this.activationTimer_),this.rmBoundedActivationClasses_(),this.adapter_.removeClass(q),this.adapter_.computeBoundingRect(),this.adapter_.addClass($),this.adapter_.addClass(X),this.activationTimer_=setTimeout(function(){return z.activationTimerCallback_()},W)}},{key:'getFgTranslationCoordinates_',value:function(){var G,z=this.activationState_,U=z.activationEvent,B=z.wasActivatedByPointer;G=B?T.i(M.c)(U,this.adapter_.getWindowPageOffset(),this.adapter_.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2},G={x:G.x-this.initialSize_/2,y:G.y-this.initialSize_/2};var K={x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2};return{startPoint:G,endPoint:K}}},{key:'runDeactivationUXLogicIfReady_',value:function(){var z=H.cssClasses.FG_DEACTIVATION,U=this.activationState_,B=U.hasDeactivationUXRun,G=U.isActivated;(B||!G)&&this.activationAnimationHasEnded_&&(this.rmBoundedActivationClasses_(),this.adapter_.addClass(z))}},{key:'rmBoundedActivationClasses_',value:function(){var z=H.cssClasses,U=z.BG_ACTIVE_FILL,B=z.FG_ACTIVATION;this.adapter_.removeClass(U),this.adapter_.removeClass(B),this.activationAnimationHasEnded_=!1,this.adapter_.computeBoundingRect()}},{key:'deactivate_',value:function(z){var U=this,B=this.activationState_;if(B.isActivated){if(B.isProgrammatic){return requestAnimationFrame(function(){return U.animateDeactivation_(null,w({},B))}),void(this.activationState_=this.defaultActivationState_())}var K=O[z.type],$=B.activationEvent.type,q=K===$,X=q;B.wasActivatedByPointer&&(X='mouseup'===z.type);var W=w({},B);requestAnimationFrame(function(){q&&(U.activationState_.hasDeactivationUXRun=!0,U.animateDeactivation_(z,W)),X&&(U.activationState_=U.defaultActivationState_())})}}},{key:'deactivate',value:function(){this.deactivate_(null)}},{key:'animateDeactivation_',value:function(z,U){var B=U.wasActivatedByPointer,G=U.wasElementMadeActive,K=H.cssClasses.BG_FOCUSED;(B||G)&&(this.adapter_.removeClass(K),this.runDeactivationUXLogicIfReady_())}},{key:'destroy',value:function(){var z=this;if(this.isSupported_){this.removeEventListeners_();var U=H.cssClasses,B=U.ROOT,G=U.UNBOUNDED;requestAnimationFrame(function(){z.adapter_.removeClass(B),z.adapter_.removeClass(G),z.removeCssVars_()})}}},{key:'removeEventListeners_',value:function(){var z=this;this.listenerInfos_.forEach(function(U){Object.keys(U).forEach(function(B){z.adapter_.deregisterInteractionHandler(U[B],z.listeners_[B])})}),this.adapter_.deregisterResizeHandler(this.resizeHandler_)}},{key:'removeCssVars_',value:function(){var z=this,U=H.strings;Object.keys(U).forEach(function(B){0===B.indexOf('VAR_')&&z.adapter_.updateCssVariable(U[B],null)})}},{key:'layout',value:function(){var z=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame(function(){z.layoutInternal_(),z.layoutFrame_=0})}},{key:'layoutInternal_',value:function(){this.frame_=this.adapter_.computeBoundingRect();var z=_Mathmax(this.frame_.height,this.frame_.width),U=_Mathsqrt(_Mathpow(this.frame_.width,2)+_Mathpow(this.frame_.height,2));this.initialSize_=z*H.numbers.INITIAL_ORIGIN_SCALE,this.maxRadius_=U+H.numbers.PADDING,this.fgScale_=this.maxRadius_/this.initialSize_,this.xfDuration_=1e3*_Mathsqrt(this.maxRadius_/1024),this.updateLayoutCssVars_()}},{key:'updateLayoutCssVars_',value:function(){var z=H.strings,U=z.VAR_SURFACE_WIDTH,B=z.VAR_SURFACE_HEIGHT,G=z.VAR_FG_SIZE,K=z.VAR_LEFT,$=z.VAR_TOP,q=z.VAR_FG_SCALE;this.adapter_.updateCssVariable(U,this.frame_.width+'px'),this.adapter_.updateCssVariable(B,this.frame_.height+'px'),this.adapter_.updateCssVariable(G,this.initialSize_+'px'),this.adapter_.updateCssVariable(q,this.fgScale_),this.adapter_.isUnbounded()&&(this.unboundedCoords_={left:_Mathround(this.frame_.width/2-this.initialSize_/2),top:_Mathround(this.frame_.height/2-this.initialSize_/2)},this.adapter_.updateCssVariable(K,this.unboundedCoords_.left+'px'),this.adapter_.updateCssVariable($,this.unboundedCoords_.top+'px'))}}]),H}(N.MDCFoundation);A.a=F}})})}).call(n,r(14)(a))},function(a,n){'use strict';Object.defineProperty(n,'__esModule',{value:!0}),n.supportsCssVariables=function(h){var b=h.CSS&&'function'==typeof h.CSS.supports;if(b){var C=h.CSS.supports('--css-vars','yes'),E=h.CSS.supports('(--css-vars: yes)')&&h.CSS.supports('color','#00000000');return C||E}},n.getMatchesProperty=function(h){return['webkitMatchesSelector','msMatchesSelector','matches'].filter(function(b){return b in h}).pop()},n.getNormalizedEventCoords=function(h,b,C){var I,D,E=b.x,A=b.y,T=E+C.left,S=A+C.top;return'touchstart'===h.type?(I=h.changedTouches[0].pageX-T,D=h.changedTouches[0].pageY-S):(I=h.pageX-T,D=h.pageY-S),{x:I,y:D}}},function(a){'use strict';function d(){throw new Error('setTimeout has not been defined')}function l(){throw new Error('clearTimeout has not been defined')}function u(w){if(S===setTimeout)return setTimeout(w,0);if((S===d||!S)&&setTimeout)return S=setTimeout,setTimeout(w,0);try{return S(w,0)}catch(R){try{return S.call(null,w,0)}catch(O){return S.call(this,w,0)}}}function h(w){if(I===clearTimeout)return clearTimeout(w);if((I===l||!I)&&clearTimeout)return I=clearTimeout,clearTimeout(w);try{return I(w)}catch(R){try{return I.call(null,w)}catch(O){return I.call(this,w)}}}function b(){N&&P&&(N=!1,P.length?D=P.concat(D):M=-1,D.length&&C())}function C(){if(!N){var w=u(b);N=!0;for(var R=D.length;R;){for(P=D,D=[];++M<R;)P&&P[M].run();M=-1,R=D.length}P=null,N=!1,h(w)}}function E(w,R){this.fun=w,this.array=R}function A(){}var T=a.exports={},S,I;(function(){try{S='function'==typeof setTimeout?setTimeout:d}catch(w){S=d}try{I='function'==typeof clearTimeout?clearTimeout:l}catch(w){I=l}})();var D=[],N=!1,P,M=-1;T.nextTick=function(w){var R=Array(arguments.length-1);if(1<arguments.length)for(var O=1;O<arguments.length;O++)R[O-1]=arguments[O];D.push(new E(w,R)),1!==D.length||N||u(C)},E.prototype.run=function(){this.fun.apply(null,this.array)},T.title='browser',T.browser=!0,T.env={},T.argv=[],T.version='',T.versions={},T.on=A,T.addListener=A,T.once=A,T.off=A,T.removeListener=A,T.removeAllListeners=A,T.emit=A,T.binding=function(){throw new Error('process.binding is not supported')},T.cwd=function(){return'/'},T.chdir=function(){throw new Error('process.chdir is not supported')},T.umask=function(){return 0}},function(a,n){'use strict';function d(h,b){if(!(h instanceof b))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(n,'__esModule',{value:!0});var l=function(){function h(b,C){for(var A,E=0;E<C.length;E++)A=C[E],A.enumerable=A.enumerable||!1,A.configurable=!0,'value'in A&&(A.writable=!0),Object.defineProperty(b,A.key,A)}return function(b,C,E){return C&&h(b.prototype,C),E&&h(b,E),b}}(),u=function(){function h(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};d(this,h),this.adapter_=b}return l(h,null,[{key:'cssClasses',get:function(){return{}}},{key:'strings',get:function(){return{}}},{key:'numbers',get:function(){return{}}},{key:'defaultAdapter',get:function(){return{}}}]),l(h,[{key:'init',value:function(){}},{key:'destroy',value:function(){}}]),h}();n.default=u},function(a,n,r){'use strict';function l(D,N){if(!(D instanceof N))throw new TypeError('Cannot call a class as a function')}function u(D,N){if(!D)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return N&&('object'==typeof N||'function'==typeof N)?N:D}function h(D,N){if('function'!=typeof N&&null!==N)throw new TypeError('Super expression must either be null or a function, not '+typeof N);D.prototype=Object.create(N&&N.prototype,{constructor:{value:D,enumerable:!1,writable:!0,configurable:!0}}),N&&(Object.setPrototypeOf?Object.setPrototypeOf(D,N):D.__proto__=N)}Object.defineProperty(n,'__esModule',{value:!0}),n.MDCRipple=n.MDCRippleFoundation=void 0;var b=function(){function D(N,P){for(var w,M=0;M<P.length;M++)w=P[M],w.enumerable=w.enumerable||!1,w.configurable=!0,'value'in w&&(w.writable=!0),Object.defineProperty(N,w.key,w)}return function(N,P,M){return P&&D(N.prototype,P),M&&D(N,M),N}}(),C=r(2),E=r(43),A=function(D){return D&&D.__esModule?D:{default:D}}(E),T=r(8),S=(0,T.getMatchesProperty)(HTMLElement.prototype);n.MDCRippleFoundation=A.default;n.MDCRipple=function(D){function N(){return l(this,N),u(this,(N.__proto__||Object.getPrototypeOf(N)).apply(this,arguments))}return h(N,D),b(N,[{key:'activate',value:function(){this.foundation_.activate()}},{key:'deactivate',value:function(){this.foundation_.deactivate()}},{key:'getDefaultFoundation',value:function(){return new A.default(N.createAdapter(this))}},{key:'initialSyncWithDOM',value:function(){this.unbounded='mdcRippleIsUnbounded'in this.root_.dataset}},{key:'unbounded',get:function(){return this.unbounded_},set:function(M){var w=A.default.cssClasses.UNBOUNDED;this.unbounded_=!!M,this.unbounded_?this.root_.classList.add(w):this.root_.classList.remove(w)}}],[{key:'attachTo',value:function(M){var w=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},R=w.isUnbounded,O=void 0===R?void 0:R,F=new N(M);return void 0!==O&&(F.unbounded=O),F}},{key:'createAdapter',value:function(M){return{browserSupportsCssVars:function(){return(0,T.supportsCssVariables)(window)},isUnbounded:function(){return M.unbounded},isSurfaceActive:function(){return M.root_[S](':active')},addClass:function(R){return M.root_.classList.add(R)},removeClass:function(R){return M.root_.classList.remove(R)},registerInteractionHandler:function(R,O){return M.root_.addEventListener(R,O)},deregisterInteractionHandler:function(R,O){return M.root_.removeEventListener(R,O)},registerResizeHandler:function(R){return window.addEventListener('resize',R)},deregisterResizeHandler:function(R){return window.removeEventListener('resize',R)},updateCssVariable:function(R,O){return M.root_.style.setProperty(R,O)},computeBoundingRect:function(){return M.root_.getBoundingClientRect()},getWindowPageOffset:function(){return{x:window.pageXOffset,y:window.pageYOffset}}}}}]),N}(C.MDCComponent)},function(a,n,r){'use strict';(function(d,l){(function(u,h){'use strict';function b(H){'function'!=typeof H&&(H=new Function(''+H));for(var V=Array(arguments.length-1),z=0;z<V.length;z++)V[z]=arguments[z+1];var U={callback:H,args:V};return w[M]=U,F(M),M++}function C(H){delete w[H]}function E(H){var V=H.callback,z=H.args;switch(z.length){case 0:V();break;case 1:V(z[0]);break;case 2:V(z[0],z[1]);break;case 3:V(z[0],z[1],z[2]);break;default:V.apply(h,z);}}function A(H){if(R)setTimeout(A,0,H);else{var V=w[H];if(V){R=!0;try{E(V)}finally{C(H),R=!1}}}}function T(){F=function(V){l.nextTick(function(){A(V)})}}function S(){if(u.postMessage&&!u.importScripts){var H=!0,V=u.onmessage;return u.onmessage=function(){H=!1},u.postMessage('','*'),u.onmessage=V,H}}function I(){var H='setImmediate$'+Math.random()+'$',V=function(U){U.source===u&&'string'==typeof U.data&&0===U.data.indexOf(H)&&A(+U.data.slice(H.length))};u.addEventListener?u.addEventListener('message',V,!1):u.attachEvent('onmessage',V),F=function(U){u.postMessage(H+U,'*')}}function D(){var H=new MessageChannel;H.port1.onmessage=function(V){var z=V.data;A(z)},F=function(z){H.port2.postMessage(z)}}function N(){var H=O.documentElement;F=function(z){var U=O.createElement('script');U.onreadystatechange=function(){A(z),U.onreadystatechange=null,H.removeChild(U),U=null},H.appendChild(U)}}function P(){F=function(V){setTimeout(A,0,V)}}if(!u.setImmediate){var F,M=1,w={},R=!1,O=u.document,L=Object.getPrototypeOf&&Object.getPrototypeOf(u);L=L&&L.setTimeout?L:u,'[object process]'==={}.toString.call(u.process)?T():S()?I():u.MessageChannel?D():O&&'onreadystatechange'in O.createElement('script')?N():P(),L.setImmediate=b,L.clearImmediate=C}})('undefined'==typeof self?'undefined'==typeof d?void 0:d:self)}).call(n,r(3),r(9))},function(a,n,r){'use strict';function d(u,h){this._id=u,this._clearFn=h}var l=Function.prototype.apply;n.setTimeout=function(){return new d(l.call(setTimeout,window,arguments),clearTimeout)},n.setInterval=function(){return new d(l.call(setInterval,window,arguments),clearInterval)},n.clearTimeout=n.clearInterval=function(u){u&&u.close()},d.prototype.unref=d.prototype.ref=function(){},d.prototype.close=function(){this._clearFn.call(window,this._id)},n.enroll=function(u,h){clearTimeout(u._idleTimeoutId),u._idleTimeout=h},n.unenroll=function(u){clearTimeout(u._idleTimeoutId),u._idleTimeout=-1},n._unrefActive=n.active=function(u){clearTimeout(u._idleTimeoutId);var h=u._idleTimeout;0<=h&&(u._idleTimeoutId=setTimeout(function(){u._onTimeout&&u._onTimeout()},h))},r(12),n.setImmediate=setImmediate,n.clearImmediate=clearImmediate},function(a){'use strict';a.exports=function(d){return d.webpackPolyfill||(d.deprecate=function(){},d.paths=[],!d.children&&(d.children=[]),Object.defineProperty(d,'loaded',{enumerable:!0,get:function(){return d.l}}),Object.defineProperty(d,'id',{enumerable:!0,get:function(){return d.i}}),d.webpackPolyfill=1),d}},function(a,n,r){'use strict';function d(A){return A&&A.__esModule?A:{default:A}}Object.defineProperty(n,'__esModule',{value:!0});var l=r(1),u=d(l),h=r(4),b=d(h),C=r(6),E=d(C);n.default={view:function(T){var S={};return Object.keys(T.attrs).filter(function(I){return 0>E.default.indexOf(I)}).forEach(function(I){S[I]=T.attrs[I]}),S.class=(S.class||'')+' mdc-card__action',S.compact=!0,(0,u.default)(b.default,S,T.children)}}},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'section',type:'supportingText'},{type:function(b,C){var E=this.class||'';'actions'===b?E+=' mdc-card__actions':'actionsVertical'===b?E+=' mdc-card__actions mdc-card__actions--vertical':'media'===b?E+=' mdc-card__media':'primary'===b?E+=' mdc-card__primary':'horizontalBlock'===b?('tagName'in C||(this.tagName='div'),E+=' mdc-card__horizontal-block'):E+=' mdc-card__supporting-text';this.class=E.trim()}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'img',class:'mdc-card__media-item'},{size:function(b){1.5===b?this.class+=' mdc-card__media-item--1dot5x':2===b?this.class+=' mdc-card__media-item--2x':3===b?this.class+=' mdc-card__media-item--3x':('style'in this||(this.style={}),'width'in this.style||(this.style.width='auto'),'height'in this.style||(this.style.height=80*b+'px'))}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'h2',class:'mdc-card__subtitle'})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'h1',class:'mdc-card__title'},{large:function(b){this.class+=b?' mdc-card__title--large':''}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({class:'mdc-card'},{theme:function(b){this.class+='dark'===b?' mdc-card--theme-dark':''}})},function(a,n,r){'use strict';function l(E){C.forEach(function(A){E.dom.MDCCheckbox[A]=E.attrs[A]})}Object.defineProperty(n,'__esModule',{value:!0});var u=r(1),h=function(E){return E&&E.__esModule?E:{default:E}}(u),b=r(37),C=['checked','indeterminate','disabled','value'];n.default={oncreate:function(A){A.dom.MDCCheckbox=new b.MDCCheckbox(A.dom),l(A)},onupdate:l,view:function(A){var T={};Object.keys(A.attrs).filter(function(I){return 0>C.indexOf(I)}).forEach(function(I){T[I]=A.attrs[I]});var S='dark'===T.theme?'.mdc-checkbox--theme-dark':'';return delete T.theme,(0,h.default)('.mdc-checkbox'+S,[(0,h.default)('input.mdc-checkbox__native-control[type=checkbox]',T),(0,h.default)('.mdc-checkbox__background',[(0,h.default)('svg.mdc-checkbox__checkmark[viewBox="0 0 24 24"]',(0,h.default)('path.mdc-checkbox__checkmark__path[fill=none][stroke=white][d="M1.73,12.91 8.1,19.28 22.79,4.59"]')),(0,h.default)('.mdc-checkbox__mixedmark')])])}}},function(a,n,r){'use strict';function d(A){return A&&A.__esModule?A:{default:A}}function l(A){A.attrs.open?A.dom.MDCDialog.show():A.dom.MDCDialog.close(),'function'==typeof A.attrs.onaccept&&A.dom.MDCDialog.listen('MDCDialog:accept',A.attrs.onaccept),'function'==typeof A.attrs.oncancel&&A.dom.MDCDialog.listen('MDCDialog:cancel',A.attrs.oncancel)}Object.defineProperty(n,'__esModule',{value:!0});var u=r(1),h=d(u),b=r(40),C=r(4),E=d(C);n.default={oncreate:function(T){T.dom.MDCDialog=new b.MDCDialog(T.dom),l(T)},onupdate:l,view:function(T){var S=[];T.attrs.title&&S.push((0,h.default)('header.mdc-dialog__header',(0,h.default)('h2.mdc-dialog__header__title',T.attrs.title))),S.push((0,h.default)('section.mdc-dialog__body',{class:T.attrs.scrollable?'mdc-dialog__body--scrollable':''},T.children));var I=[];return'cancelText'in T.attrs&&I.push((0,h.default)(E.default,{class:'mdc-dialog__footer__button mdc-dialog__footer__button--cancel'},T.attrs.cancelText)),'acceptText'in T.attrs&&I.push((0,h.default)(E.default,{class:'mdc-dialog__footer__button mdc-dialog__footer__button--accept'},T.attrs.acceptText)),I.length&&S.push((0,h.default)('footer.mdc-dialog__footer',I)),(0,h.default)('aside.mdc-dialog',[(0,h.default)('.mdc-dialog__surface',S),(0,h.default)('.mdc-dialog__backdrop')])}}},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({class:'mdc-form-field'},{align:function(b){this.class+='end'===b?' mdc-form-field--align-end':''}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'li',class:'mdc-list-divider'},{inset:function(b){this.class+=b?' mdc-list-divider--inset':''}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'h3',class:'mdc-list-group__subheader'})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({class:'mdc-list-group'})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'span',type:'text'},{type:function(b){var C=this.class||'';C+='startDetail'===b?' mdc-list-item__start-detail':'endDetail'===b?' mdc-list-item__end-detail':'primaryText'===b?' mdc-list-item__text__primary':'secondaryText'===b?' mdc-list-item__text__secondary':' mdc-list-item__text';this.class=C.trim()}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(b){return b&&b.__esModule?b:{default:b}}(l),h=r(7);n.default=(0,u.default)({tagName:'li',class:'mdc-list-item'},{ripple:function(C){C&&(this.oncreate=function(E){return h.MDCRipple.attachTo(E.dom)})}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'ul',class:'mdc-list'},{dense:function(b){this.class+=b?' mdc-list--dense':''},twoLine:function(b){this.class+=b?' mdc-list--two-line':''},avater:function(b){this.class+=b?' mdc-list--avatar-list':''}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'section',class:'mdc-toolbar__section'},{align:function(b){('start'===b||'end'===b)&&(this.class+=' mdc-toolbar__section--align-'+b)}})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'span',class:'mdc-toolbar__title'})},function(a,n,r){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=r(0),u=function(h){return h&&h.__esModule?h:{default:h}}(l);n.default=(0,u.default)({tagName:'header',class:'mdc-toolbar'},{fixed:function(b){this.class+=b?' mdc-toolbar--fixed':''}})},function(a,n){'use strict';function d(T){return T.document!==void 0&&'function'==typeof T.document.createElement}function l(T){return T in E||T in A}function u(T,S,I){return'animationstart'===T||'animationend'===T||'animationiteration'===T?'animation'in I.style?S[T].noPrefix:S[T].webkitPrefix:'transitionend'===T?'transition'in I.style?S[T].noPrefix:S[T].webkitPrefix:S[T].noPrefix}function h(T,S){if(!d(T)||!l(S))return S;var I=S in E?E:A,D=T.document.createElement('div'),N='';return N=I===E?u(S,I,D):I[S].noPrefix in D.style?I[S].noPrefix:I[S].webkitPrefix,N}Object.defineProperty(n,'__esModule',{value:!0}),n.getCorrectEventName=function(T,S){return h(T,S)},n.getCorrectPropertyName=function(T,S){return h(T,S)};var E={animationstart:{noPrefix:'animationstart',webkitPrefix:'webkitAnimationStart'},animationend:{noPrefix:'animationend',webkitPrefix:'webkitAnimationEnd'},animationiteration:{noPrefix:'animationiteration',webkitPrefix:'webkitAnimationIteration'},transitionend:{noPrefix:'transitionend',webkitPrefix:'webkitTransitionEnd'}},A={animation:{noPrefix:'animation',webkitPrefix:'-webkit-animation'},transform:{noPrefix:'transform',webkitPrefix:'-webkit-transform'},transition:{noPrefix:'transition',webkitPrefix:'-webkit-transition'}}},function(a,n,r){'use strict';function l(E,A){if(!(E instanceof A))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(n,'__esModule',{value:!0});var u=function(){function E(A,T){for(var I,S=0;S<T.length;S++)I=T[S],I.enumerable=I.enumerable||!1,I.configurable=!0,'value'in I&&(I.writable=!0),Object.defineProperty(A,I.key,I)}return function(A,T,S){return T&&E(A.prototype,T),S&&E(A,S),A}}(),h=r(10),b=function(E){return E&&E.__esModule?E:{default:E}}(h),C=function(){function E(A){var T=1<arguments.length&&void 0!==arguments[1]?arguments[1]:void 0;l(this,E),this.root_=A;for(var S=arguments.length,I=Array(2<S?S-2:0),D=2;D<S;D++)I[D-2]=arguments[D];this.initialize.apply(this,I),this.foundation_=void 0===T?this.getDefaultFoundation():T,this.foundation_.init(),this.initialSyncWithDOM()}return u(E,null,[{key:'attachTo',value:function(T){return new E(T,new b.default())}}]),u(E,[{key:'initialize',value:function(){}},{key:'getDefaultFoundation',value:function(){throw new Error('Subclasses must override getDefaultFoundation to return a properly configured foundation class')}},{key:'initialSyncWithDOM',value:function(){}},{key:'destroy',value:function(){this.foundation_.destroy()}},{key:'listen',value:function(T,S){this.root_.addEventListener(T,S)}},{key:'unlisten',value:function(T,S){this.root_.removeEventListener(T,S)}},{key:'emit',value:function(T,S){var I;'function'==typeof CustomEvent?I=new CustomEvent(T,{detail:S}):(I=document.createEvent('CustomEvent'),I.initCustomEvent(T,!1,!1,S)),this.root_.dispatchEvent(I)}}]),E}();n.default=C},function(a,n){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var l=n.cssClasses={ROOT:'mdc-checkbox',UPGRADED:'mdc-checkbox--upgraded',CHECKED:'mdc-checkbox--checked',INDETERMINATE:'mdc-checkbox--indeterminate',ANIM_UNCHECKED_CHECKED:'mdc-checkbox--anim-unchecked-checked',ANIM_UNCHECKED_INDETERMINATE:'mdc-checkbox--anim-unchecked-indeterminate',ANIM_CHECKED_UNCHECKED:'mdc-checkbox--anim-checked-unchecked',ANIM_CHECKED_INDETERMINATE:'mdc-checkbox--anim-checked-indeterminate',ANIM_INDETERMINATE_CHECKED:'mdc-checkbox--anim-indeterminate-checked',ANIM_INDETERMINATE_UNCHECKED:'mdc-checkbox--anim-indeterminate-unchecked'},u=n.strings={NATIVE_CONTROL_SELECTOR:'.'+'mdc-checkbox'+'__native-control',TRANSITION_STATE_INIT:'init',TRANSITION_STATE_CHECKED:'checked',TRANSITION_STATE_UNCHECKED:'unchecked',TRANSITION_STATE_INDETERMINATE:'indeterminate'},h=n.numbers={ANIM_END_LATCH_MS:100}},function(a,n,r){'use strict';function d(S,I){if(!(S instanceof I))throw new TypeError('Cannot call a class as a function')}function l(S,I){if(!S)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return I&&('object'==typeof I||'function'==typeof I)?I:S}function u(S,I){if('function'!=typeof I&&null!==I)throw new TypeError('Super expression must either be null or a function, not '+typeof I);S.prototype=Object.create(I&&I.prototype,{constructor:{value:S,enumerable:!1,writable:!0,configurable:!0}}),I&&(Object.setPrototypeOf?Object.setPrototypeOf(S,I):S.__proto__=I)}function h(S){return S&&'function'==typeof S.set}Object.defineProperty(n,'__esModule',{value:!0});var b=function(){function S(I,D){for(var P,N=0;N<D.length;N++)P=D[N],P.enumerable=P.enumerable||!1,P.configurable=!0,'value'in P&&(P.writable=!0),Object.defineProperty(I,P.key,P)}return function(I,D,N){return D&&S(I.prototype,D),N&&S(I,N),I}}(),C=r(2),E=r(35),A=['checked','indeterminate'],T=function(S){function I(D){d(this,I);var N=l(this,(I.__proto__||Object.getPrototypeOf(I)).call(this,Object.assign(I.defaultAdapter,D)));return N.currentCheckState_=E.strings.TRANSITION_STATE_INIT,N.currentAnimationClass_='',N.animEndLatchTimer_=0,N.animEndHandler_=function(){clearTimeout(N.animEndLatchTimer_),N.animEndLatchTimer_=setTimeout(function(){N.adapter_.removeClass(N.currentAnimationClass_),N.adapter_.deregisterAnimationEndHandler(N.animEndHandler_)},E.numbers.ANIM_END_LATCH_MS)},N.changeHandler_=function(){return N.transitionCheckState_()},N}return u(I,S),b(I,null,[{key:'cssClasses',get:function(){return E.cssClasses}},{key:'strings',get:function(){return E.strings}},{key:'numbers',get:function(){return E.numbers}},{key:'defaultAdapter',get:function(){return{addClass:function(){},removeClass:function(){},registerAnimationEndHandler:function(){},deregisterAnimationEndHandler:function(){},registerChangeHandler:function(){},deregisterChangeHandler:function(){},getNativeControl:function(){},forceLayout:function(){},isAttachedToDOM:function(){}}}}]),b(I,[{key:'init',value:function(){this.adapter_.addClass(E.cssClasses.UPGRADED),this.adapter_.registerChangeHandler(this.changeHandler_),this.installPropertyChangeHooks_()}},{key:'destroy',value:function(){this.adapter_.deregisterChangeHandler(this.changeHandler_),this.uninstallPropertyChangeHooks_()}},{key:'isChecked',value:function(){return this.getNativeControl_().checked}},{key:'setChecked',value:function(N){this.getNativeControl_().checked=N}},{key:'isIndeterminate',value:function(){return this.getNativeControl_().indeterminate}},{key:'setIndeterminate',value:function(N){this.getNativeControl_().indeterminate=N}},{key:'isDisabled',value:function(){return this.getNativeControl_().disabled}},{key:'setDisabled',value:function(N){this.getNativeControl_().disabled=N}},{key:'installPropertyChangeHooks_',value:function(){var N=this,P=this.getNativeControl_(),M=Object.getPrototypeOf(P);A.forEach(function(w){var R=Object.getOwnPropertyDescriptor(M,w);h(R)&&Object.defineProperty(P,w,{get:R.get,set:function(F){R.set.call(P,F),N.transitionCheckState_()},configurable:R.configurable,enumerable:R.enumerable})})}},{key:'uninstallPropertyChangeHooks_',value:function(){var N=this.getNativeControl_(),P=Object.getPrototypeOf(N);A.forEach(function(M){var w=Object.getOwnPropertyDescriptor(P,M);h(w)&&Object.defineProperty(N,M,w)})}},{key:'transitionCheckState_',value:function(){var N=this.adapter_.getNativeControl();if(N){var P=this.currentCheckState_,M=this.determineCheckState_(N);P===M||(0<this.currentAnimationClass_.length&&(clearTimeout(this.animEndLatchTimer_),this.adapter_.forceLayout(),this.adapter_.removeClass(this.currentAnimationClass_)),this.currentAnimationClass_=this.getTransitionAnimationClass_(P,M),this.currentCheckState_=M,this.adapter_.isAttachedToDOM()&&0<this.currentAnimationClass_.length&&(this.adapter_.addClass(this.currentAnimationClass_),this.adapter_.registerAnimationEndHandler(this.animEndHandler_)))}}},{key:'determineCheckState_',value:function(N){var P=E.strings.TRANSITION_STATE_INDETERMINATE,M=E.strings.TRANSITION_STATE_CHECKED,w=E.strings.TRANSITION_STATE_UNCHECKED;return N.indeterminate?P:N.checked?M:w}},{key:'getTransitionAnimationClass_',value:function(N,P){var M=E.strings.TRANSITION_STATE_INIT,w=E.strings.TRANSITION_STATE_CHECKED,R=E.strings.TRANSITION_STATE_UNCHECKED,O=I.cssClasses,F=O.ANIM_UNCHECKED_CHECKED,L=O.ANIM_UNCHECKED_INDETERMINATE,H=O.ANIM_CHECKED_UNCHECKED,V=O.ANIM_CHECKED_INDETERMINATE,z=O.ANIM_INDETERMINATE_CHECKED,U=O.ANIM_INDETERMINATE_UNCHECKED;switch(N){case M:if(P===R)return'';case R:return P===w?F:L;case w:return P===R?H:V;default:return P===w?z:U;}}},{key:'getNativeControl_',value:function(){return this.adapter_.getNativeControl()||{checked:!1,indeterminate:!1,disabled:!1}}}]),I}(C.MDCFoundation);n.default=T},function(a,n,r){'use strict';function l(P,M){if(!(P instanceof M))throw new TypeError('Cannot call a class as a function')}function u(P,M){if(!P)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return M&&('object'==typeof M||'function'==typeof M)?M:P}function h(P,M){if('function'!=typeof M&&null!==M)throw new TypeError('Super expression must either be null or a function, not '+typeof M);P.prototype=Object.create(M&&M.prototype,{constructor:{value:P,enumerable:!1,writable:!0,configurable:!0}}),M&&(Object.setPrototypeOf?Object.setPrototypeOf(P,M):P.__proto__=M)}Object.defineProperty(n,'__esModule',{value:!0}),n.MDCCheckbox=n.MDCCheckboxFoundation=void 0;var b=function P(M,w,R){null===M&&(M=Function.prototype);var O=Object.getOwnPropertyDescriptor(M,w);if(O===void 0){var F=Object.getPrototypeOf(M);return null===F?void 0:P(F,w,R)}if('value'in O)return O.value;var L=O.get;return void 0===L?void 0:L.call(R)},C=function(){function P(M,w){for(var O,R=0;R<w.length;R++)O=w[R],O.enumerable=O.enumerable||!1,O.configurable=!0,'value'in O&&(O.writable=!0),Object.defineProperty(M,O.key,O)}return function(M,w,R){return w&&P(M.prototype,w),R&&P(M,R),M}}(),E=r(2),A=r(11),T=r(8),S=r(33),I=r(36),D=function(P){return P&&P.__esModule?P:{default:P}}(I);n.MDCCheckboxFoundation=D.default;n.MDCCheckbox=function(P){function M(){var w;l(this,M);for(var R=arguments.length,O=Array(R),F=0;F<R;F++)O[F]=arguments[F];var L=u(this,(w=M.__proto__||Object.getPrototypeOf(M)).call.apply(w,[this].concat(O)));return L.ripple_=L.initRipple_(),L}return h(M,P),C(M,[{key:'nativeCb_',get:function(){var R=D.default.strings.NATIVE_CONTROL_SELECTOR;return this.root_.querySelector(R)}}],[{key:'attachTo',value:function(R){return new M(R)}}]),C(M,[{key:'initRipple_',value:function(){var R=this,O=(0,T.getMatchesProperty)(HTMLElement.prototype),F=Object.assign(A.MDCRipple.createAdapter(this),{isUnbounded:function(){return!0},isSurfaceActive:function(){return R.nativeCb_[O](':active')},registerInteractionHandler:function(V,z){return R.nativeCb_.addEventListener(V,z)},deregisterInteractionHandler:function(V,z){return R.nativeCb_.removeEventListener(V,z)},computeBoundingRect:function(){var V=R.root_.getBoundingClientRect(),z=V.left,U=V.top,B=40;return{top:U,left:z,right:z+B,bottom:U+B,width:B,height:B}}}),L=new A.MDCRippleFoundation(F);return new A.MDCRipple(this.root_,L)}},{key:'getDefaultFoundation',value:function(){var R=this;return new D.default({addClass:function(F){return R.root_.classList.add(F)},removeClass:function(F){return R.root_.classList.remove(F)},registerAnimationEndHandler:function(F){return R.root_.addEventListener((0,S.getCorrectEventName)(window,'animationend'),F)},deregisterAnimationEndHandler:function(F){return R.root_.removeEventListener((0,S.getCorrectEventName)(window,'animationend'),F)},registerChangeHandler:function(F){return R.nativeCb_.addEventListener('change',F)},deregisterChangeHandler:function(F){return R.nativeCb_.removeEventListener('change',F)},getNativeControl:function(){return R.nativeCb_},forceLayout:function(){return R.root_.offsetWidth},isAttachedToDOM:function(){return!!R.root_.parentNode}})}},{key:'destroy',value:function(){this.ripple_.destroy(),b(M.prototype.__proto__||Object.getPrototypeOf(M.prototype),'destroy',this).call(this)}},{key:'ripple',get:function(){return this.ripple_}},{key:'checked',get:function(){return this.foundation_.isChecked()},set:function(R){this.foundation_.setChecked(R)}},{key:'indeterminate',get:function(){return this.foundation_.isIndeterminate()},set:function(R){this.foundation_.setIndeterminate(R)}},{key:'disabled',get:function(){return this.foundation_.isDisabled()},set:function(R){this.foundation_.setDisabled(R)}}]),M}(E.MDCComponent)},function(a,n){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var d=n.cssClasses={ROOT:'mdc-dialog',OPEN:'mdc-dialog--open',BACKDROP:'mdc-dialog__backdrop',SCROLL_LOCK:'mdc-dialog-scroll-lock',ACCEPT_BTN:'mdc-dialog__footer__button--accept',CANCEL_BTN:'mdc-dialog__footer__button--cancel'},l=n.strings={OPEN_DIALOG_SELECTOR:'.mdc-dialog--open',DIALOG_SURFACE_SELECTOR:'.mdc-dialog__surface',ACCEPT_SELECTOR:'.mdc-dialog__footer__button--accept',FOCUSABLE_ELEMENTS:'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'}},function(a,n,r){'use strict';function d(A,T){if(!(A instanceof T))throw new TypeError('Cannot call a class as a function')}function l(A,T){if(!A)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return T&&('object'==typeof T||'function'==typeof T)?T:A}function u(A,T){if('function'!=typeof T&&null!==T)throw new TypeError('Super expression must either be null or a function, not '+typeof T);A.prototype=Object.create(T&&T.prototype,{constructor:{value:A,enumerable:!1,writable:!0,configurable:!0}}),T&&(Object.setPrototypeOf?Object.setPrototypeOf(A,T):A.__proto__=T)}Object.defineProperty(n,'__esModule',{value:!0});var h=function(){function A(T,S){for(var D,I=0;I<S.length;I++)D=S[I],D.enumerable=D.enumerable||!1,D.configurable=!0,'value'in D&&(D.writable=!0),Object.defineProperty(T,D.key,D)}return function(T,S,I){return S&&A(T.prototype,S),I&&A(T,I),T}}(),b=r(2),C=r(38),E=function(A){function T(S){d(this,T);var I=l(this,(T.__proto__||Object.getPrototypeOf(T)).call(this,Object.assign(T.defaultAdapter,S)));return I.lastFocusedTarget_=null,I.currentFocusedElIndex_=-1,I.isOpen_=!1,I.isResettingToFirstFocusTarget_=!1,I.componentClickHandler_=function(){return I.cancel(!0)},I.dialogClickHandler_=function(D){return I.handleDialogClick_(D)},I.focusHandler_=function(D){return I.setFocus_(D)},I.documentKeydownHandler_=function(D){(D.key&&'Escape'===D.key||27===D.keyCode)&&I.cancel(!0)},I}return u(T,A),h(T,null,[{key:'cssClasses',get:function(){return C.cssClasses}},{key:'strings',get:function(){return C.strings}},{key:'defaultAdapter',get:function(){return{hasClass:function(){},addClass:function(){},removeClass:function(){},setAttr:function(){},addBodyClass:function(){},removeBodyClass:function(){},eventTargetHasClass:function(){return!1},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},registerSurfaceInteractionHandler:function(){},deregisterSurfaceInteractionHandler:function(){},registerDocumentKeydownHandler:function(){},deregisterDocumentKeydownHandler:function(){},registerFocusTrappingHandler:function(){},deregisterFocusTrappingHandler:function(){},numFocusableTargets:function(){return 0},setDialogFocusFirstTarget:function(){},setInitialFocus:function(){},getFocusableElements:function(){return[]},saveElementTabState:function(){},restoreElementTabState:function(){},makeElementUntabbable:function(){},setBodyAttr:function(){},rmBodyAttr:function(){},getFocusedTarget:function(){},setFocusedTarget:function(){},notifyAccept:function(){},notifyCancel:function(){}}}}]),h(T,[{key:'destroy',value:function(){this.close()}},{key:'open',value:function(){this.lastFocusedTarget_=this.adapter_.getFocusedTarget(),this.makeTabbable_(),this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_),this.adapter_.registerSurfaceInteractionHandler('click',this.dialogClickHandler_),this.adapter_.registerInteractionHandler('click',this.componentClickHandler_),this.adapter_.setInitialFocus(),this.adapter_.registerFocusTrappingHandler(this.focusHandler_),this.disableScroll_(),this.adapter_.setBodyAttr('aria-hidden','true'),this.adapter_.setAttr('aria-hidden','false'),this.adapter_.addClass(T.cssClasses.OPEN),this.isOpen_=!0,this.currentFocusedElIndex_=this.adapter_.numFocusableTargets()-1}},{key:'close',value:function(){this.makeUntabbable_(),this.adapter_.deregisterSurfaceInteractionHandler('click',this.dialogClickHandler_),this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_),this.adapter_.deregisterInteractionHandler('click',this.componentClickHandler_),this.adapter_.deregisterFocusTrappingHandler(this.focusHandler_),this.adapter_.removeClass(T.cssClasses.OPEN),this.enableScroll_(),this.adapter_.rmBodyAttr('aria-hidden'),this.adapter_.setAttr('aria-hidden','true'),this.lastFocusedTarget_&&this.adapter_.setFocusedTarget(this.lastFocusedTarget_),this.lastFocusedTarget_=null}},{key:'isOpen',value:function(){return this.isOpen_}},{key:'accept',value:function(I){I&&this.adapter_.notifyAccept(),this.close()}},{key:'cancel',value:function(I){I&&this.adapter_.notifyCancel(),this.close()}},{key:'handleDialogClick_',value:function(I){I.stopPropagation();var D=I.target;this.adapter_.eventTargetHasClass(D,C.cssClasses.ACCEPT_BTN)?this.accept(!0):this.adapter_.eventTargetHasClass(D,C.cssClasses.CANCEL_BTN)&&this.cancel(!0)}},{key:'makeUntabbable_',value:function(){var I=this.adapter_.getFocusableElements();if(I)for(var D=0;D<I.length;D++)this.adapter_.saveElementTabState(I[D]),this.adapter_.makeElementUntabbable(I[D])}},{key:'makeTabbable_',value:function(){var I=this.adapter_.getFocusableElements();if(I)for(var D=0;D<I.length;D++)this.adapter_.restoreElementTabState(I[D])}},{key:'setFocus_',value:function(I){!I.relatedTarget||this.isResettingToFirstFocusTarget_||(this.currentFocusedElIndex_=(this.currentFocusedElIndex_+1)%this.adapter_.numFocusableTargets(),0===this.currentFocusedElIndex_&&(this.isResettingToFirstFocusTarget_=!0,this.adapter_.setDialogFocusFirstTarget(),this.isResettingToFirstFocusTarget_=!1))}},{key:'disableScroll_',value:function(){this.adapter_.addBodyClass(C.cssClasses.SCROLL_LOCK)}},{key:'enableScroll_',value:function(){this.adapter_.removeBodyClass(C.cssClasses.SCROLL_LOCK)}}]),T}(b.MDCFoundation);n.default=E},function(a,n,r){'use strict';function u(P,M){if(!(P instanceof M))throw new TypeError('Cannot call a class as a function')}function h(P,M){if(!P)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return M&&('object'==typeof M||'function'==typeof M)?M:P}function b(P,M){if('function'!=typeof M&&null!==M)throw new TypeError('Super expression must either be null or a function, not '+typeof M);P.prototype=Object.create(M&&M.prototype,{constructor:{value:P,enumerable:!1,writable:!0,configurable:!0}}),M&&(Object.setPrototypeOf?Object.setPrototypeOf(P,M):P.__proto__=M)}Object.defineProperty(n,'__esModule',{value:!0}),n.MDCDialog=n.util=n.MDCDialogFoundation=void 0;var C=function(){function P(M,w){for(var O,R=0;R<w.length;R++)O=w[R],O.enumerable=O.enumerable||!1,O.configurable=!0,'value'in O&&(O.writable=!0),Object.defineProperty(M,O.key,O)}return function(M,w,R){return w&&P(M.prototype,w),R&&P(M,R),M}}(),E=r(2),A=r(11),T=r(39),S=function(P){return P&&P.__esModule?P:{default:P}}(T),I=r(41),D=function(P){if(P&&P.__esModule)return P;var M={};if(null!=P)for(var w in P)Object.prototype.hasOwnProperty.call(P,w)&&(M[w]=P[w]);return M.default=P,M}(I);n.MDCDialogFoundation=S.default,n.util=D;n.MDCDialog=function(P){function M(){return u(this,M),h(this,(M.__proto__||Object.getPrototypeOf(M)).apply(this,arguments))}return b(M,P),C(M,[{key:'initialize',value:function(){this.lastFocusedTarget=null,this.footerBtnRipples_=[];for(var F,R=this.root_.querySelectorAll('.mdc-dialog__footer__button'),O=0;F=R[O];O++)this.footerBtnRipples_.push(new A.MDCRipple(F))}},{key:'destroy',value:function(){this.footerBtnRipples_.forEach(function(R){return R.destroy()})}},{key:'show',value:function(){this.foundation_.open()}},{key:'close',value:function(){this.foundation_.close()}},{key:'getDefaultFoundation',value:function(){var R=this,O=S.default.strings.FOCUSABLE_ELEMENTS;return new S.default({hasClass:function(L){return R.root_.classList.contains(L)},addClass:function(L){return R.root_.classList.add(L)},removeClass:function(L){return R.root_.classList.remove(L)},setAttr:function(L,H){return R.root_.setAttribute(L,H)},addBodyClass:function(L){return document.body.classList.add(L)},removeBodyClass:function(L){return document.body.classList.remove(L)},eventTargetHasClass:function(L,H){return L.classList.contains(H)},registerInteractionHandler:function(L,H){return R.root_.addEventListener(L,H,D.applyPassive())},deregisterInteractionHandler:function(L,H){return R.root_.removeEventListener(L,H,D.applyPassive())},registerSurfaceInteractionHandler:function(L,H){return R.dialogSurface_.addEventListener(L,H)},deregisterSurfaceInteractionHandler:function(L,H){return R.dialogSurface_.removeEventListener(L,H)},registerDocumentKeydownHandler:function(L){return document.addEventListener('keydown',L)},deregisterDocumentKeydownHandler:function(L){return document.removeEventListener('keydown',L)},registerFocusTrappingHandler:function(L){return document.addEventListener('focus',L,!0)},deregisterFocusTrappingHandler:function(L){return document.removeEventListener('focus',L,!0)},numFocusableTargets:function(){return R.dialogSurface_.querySelectorAll(O).length},setDialogFocusFirstTarget:function(){return R.dialogSurface_.querySelectorAll(O)[0].focus()},setInitialFocus:function(){return R.acceptButton_.focus()},getFocusableElements:function(){return R.dialogSurface_.querySelectorAll(O)},saveElementTabState:function(L){return D.saveElementTabState(L)},restoreElementTabState:function(L){return D.restoreElementTabState(L)},makeElementUntabbable:function(L){return L.setAttribute('tabindex',-1)},setBodyAttr:function(L,H){return document.body.setAttribute(L,H)},rmBodyAttr:function(L){return document.body.removeAttribute(L)},getFocusedTarget:function(){return document.activeElement},setFocusedTarget:function(L){return L.focus()},notifyAccept:function(){return R.emit('MDCDialog:accept')},notifyCancel:function(){return R.emit('MDCDialog:cancel')}})}},{key:'open',get:function(){return this.foundation_.isOpen()}},{key:'acceptButton_',get:function(){return this.root_.querySelector(S.default.strings.ACCEPT_SELECTOR)}},{key:'dialogSurface_',get:function(){return this.root_.querySelector(S.default.strings.DIALOG_SURFACE_SELECTOR)}}],[{key:'attachTo',value:function(R){return new M(R)}}]),M}(E.MDCComponent)},function(a,n){'use strict';Object.defineProperty(n,'__esModule',{value:!0}),n.applyPassive=function(){var E=0<arguments.length&&arguments[0]!==void 0?arguments[0]:window,A=1<arguments.length&&arguments[1]!==void 0&&arguments[1];if(C==void 0||A){var T=!1;try{E.document.addEventListener('test',null,{get passive(){T=!0}})}catch(S){}C=T}return!!C&&{passive:!0}},n.saveElementTabState=function(E){E.hasAttribute('tabindex')&&E.setAttribute(h,E.getAttribute('tabindex')),E.setAttribute(b,!0)},n.restoreElementTabState=function(E){E.hasAttribute(b)&&(E.hasAttribute(h)?(E.setAttribute('tabindex',E.getAttribute(h)),E.removeAttribute(h)):E.removeAttribute('tabindex'),E.removeAttribute(b))};var h='data-mdc-tabindex',b='data-mdc-tabindex-handled',C=void 0},function(a,n){'use strict';Object.defineProperty(n,'__esModule',{value:!0});var d=n.cssClasses={ROOT:'mdc-ripple-upgraded',UNBOUNDED:'mdc-ripple-upgraded--unbounded',BG_FOCUSED:'mdc-ripple-upgraded--background-focused',BG_ACTIVE_FILL:'mdc-ripple-upgraded--background-active-fill',FG_ACTIVATION:'mdc-ripple-upgraded--foreground-activation',FG_DEACTIVATION:'mdc-ripple-upgraded--foreground-deactivation'},l=n.strings={VAR_SURFACE_WIDTH:'--mdc-ripple-surface-width',VAR_SURFACE_HEIGHT:'--mdc-ripple-surface-height',VAR_FG_SIZE:'--mdc-ripple-fg-size',VAR_LEFT:'--mdc-ripple-left',VAR_TOP:'--mdc-ripple-top',VAR_FG_SCALE:'--mdc-ripple-fg-scale',VAR_FG_TRANSLATE_START:'--mdc-ripple-fg-translate-start',VAR_FG_TRANSLATE_END:'--mdc-ripple-fg-translate-end'},u=n.numbers={PADDING:10,INITIAL_ORIGIN_SCALE:0.6,DEACTIVATION_TIMEOUT_MS:300}},function(a,n,r){'use strict';function d(S,I){if(!(S instanceof I))throw new TypeError('Cannot call a class as a function')}function l(S,I){if(!S)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return I&&('object'==typeof I||'function'==typeof I)?I:S}function u(S,I){if('function'!=typeof I&&null!==I)throw new TypeError('Super expression must either be null or a function, not '+typeof I);S.prototype=Object.create(I&&I.prototype,{constructor:{value:S,enumerable:!1,writable:!0,configurable:!0}}),I&&(Object.setPrototypeOf?Object.setPrototypeOf(S,I):S.__proto__=I)}Object.defineProperty(n,'__esModule',{value:!0});var h=function(){function S(I,D){for(var P,N=0;N<D.length;N++)P=D[N],P.enumerable=P.enumerable||!1,P.configurable=!0,'value'in P&&(P.writable=!0),Object.defineProperty(I,P.key,P)}return function(I,D,N){return D&&S(I.prototype,D),N&&S(I,N),I}}(),b=r(2),C=r(42),E=r(8),A={mouseup:'mousedown',pointerup:'pointerdown',touchend:'touchstart',keyup:'keydown',blur:'focus'},T=function(S){function I(D){d(this,I);var N=l(this,(I.__proto__||Object.getPrototypeOf(I)).call(this,Object.assign(I.defaultAdapter,D)));return N.layoutFrame_=0,N.frame_={width:0,height:0},N.activationState_=N.defaultActivationState_(),N.xfDuration_=0,N.initialSize_=0,N.maxRadius_=0,N.listenerInfos_=[{activate:'touchstart',deactivate:'touchend'},{activate:'pointerdown',deactivate:'pointerup'},{activate:'mousedown',deactivate:'mouseup'},{activate:'keydown',deactivate:'keyup'},{focus:'focus',blur:'blur'}],N.listeners_={activate:function(M){return N.activate_(M)},deactivate:function(M){return N.deactivate_(M)},focus:function(){return requestAnimationFrame(function(){return N.adapter_.addClass(I.cssClasses.BG_FOCUSED)})},blur:function(){return requestAnimationFrame(function(){return N.adapter_.removeClass(I.cssClasses.BG_FOCUSED)})}},N.resizeHandler_=function(){return N.layout()},N.unboundedCoords_={left:0,top:0},N.fgScale_=0,N.activationTimer_=0,N.activationAnimationHasEnded_=!1,N.activationTimerCallback_=function(){N.activationAnimationHasEnded_=!0,N.runDeactivationUXLogicIfReady_()},N}return u(I,S),h(I,[{key:'isSupported_',get:function(){return this.adapter_.browserSupportsCssVars()}}],[{key:'cssClasses',get:function(){return C.cssClasses}},{key:'strings',get:function(){return C.strings}},{key:'numbers',get:function(){return C.numbers}},{key:'defaultAdapter',get:function(){return{browserSupportsCssVars:function(){},isUnbounded:function(){},isSurfaceActive:function(){},addClass:function(){},removeClass:function(){},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},registerResizeHandler:function(){},deregisterResizeHandler:function(){},updateCssVariable:function(){},computeBoundingRect:function(){},getWindowPageOffset:function(){}}}}]),h(I,[{key:'defaultActivationState_',value:function(){return{isActivated:!1,hasDeactivationUXRun:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1,activationStartTime:0,activationEvent:null,isProgrammatic:!1}}},{key:'init',value:function(){var N=this;if(this.isSupported_){this.addEventListeners_();var P=I.cssClasses,M=P.ROOT,w=P.UNBOUNDED;requestAnimationFrame(function(){N.adapter_.addClass(M),N.adapter_.isUnbounded()&&N.adapter_.addClass(w),N.layoutInternal_()})}}},{key:'addEventListeners_',value:function(){var N=this;this.listenerInfos_.forEach(function(P){Object.keys(P).forEach(function(M){N.adapter_.registerInteractionHandler(P[M],N.listeners_[M])})}),this.adapter_.registerResizeHandler(this.resizeHandler_)}},{key:'activate_',value:function(N){var P=this,M=this.activationState_;M.isActivated||(M.isActivated=!0,M.isProgrammatic=null===N,M.activationEvent=N,M.wasActivatedByPointer=!M.isProgrammatic&&('mousedown'===N.type||'touchstart'===N.type||'pointerdown'===N.type),M.activationStartTime=Date.now(),requestAnimationFrame(function(){M.wasElementMadeActive=N&&'keydown'===N.type?P.adapter_.isSurfaceActive():!0,M.wasElementMadeActive?P.animateActivation_():P.activationState_=P.defaultActivationState_()}))}},{key:'activate',value:function(){this.activate_(null)}},{key:'animateActivation_',value:function(){var N=this,P=I.strings,M=P.VAR_FG_TRANSLATE_START,w=P.VAR_FG_TRANSLATE_END,R=I.cssClasses,O=R.BG_ACTIVE_FILL,F=R.FG_DEACTIVATION,L=R.FG_ACTIVATION,H=I.numbers.DEACTIVATION_TIMEOUT_MS,V='',z='';if(!this.adapter_.isUnbounded()){var U=this.getFgTranslationCoordinates_(),B=U.startPoint,G=U.endPoint;V=B.x+'px, '+B.y+'px',z=G.x+'px, '+G.y+'px'}this.adapter_.updateCssVariable(M,V),this.adapter_.updateCssVariable(w,z),clearTimeout(this.activationTimer_),this.rmBoundedActivationClasses_(),this.adapter_.removeClass(F),this.adapter_.computeBoundingRect(),this.adapter_.addClass(O),this.adapter_.addClass(L),this.activationTimer_=setTimeout(function(){return N.activationTimerCallback_()},H)}},{key:'getFgTranslationCoordinates_',value:function(){var w,N=this.activationState_,P=N.activationEvent,M=N.wasActivatedByPointer;w=M?(0,E.getNormalizedEventCoords)(P,this.adapter_.getWindowPageOffset(),this.adapter_.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2},w={x:w.x-this.initialSize_/2,y:w.y-this.initialSize_/2};var R={x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2};return{startPoint:w,endPoint:R}}},{key:'runDeactivationUXLogicIfReady_',value:function(){var N=I.cssClasses.FG_DEACTIVATION,P=this.activationState_,M=P.hasDeactivationUXRun,w=P.isActivated;(M||!w)&&this.activationAnimationHasEnded_&&(this.rmBoundedActivationClasses_(),this.adapter_.addClass(N))}},{key:'rmBoundedActivationClasses_',value:function(){var N=I.cssClasses,P=N.BG_ACTIVE_FILL,M=N.FG_ACTIVATION;this.adapter_.removeClass(P),this.adapter_.removeClass(M),this.activationAnimationHasEnded_=!1,this.adapter_.computeBoundingRect()}},{key:'deactivate_',value:function(N){var P=this,M=this.activationState_;if(M.isActivated){if(M.isProgrammatic){return requestAnimationFrame(function(){return P.animateDeactivation_(null,Object.assign({},M))}),void(this.activationState_=this.defaultActivationState_())}var R=A[N.type],O=M.activationEvent.type,F=R===O,L=F;M.wasActivatedByPointer&&(L='mouseup'===N.type);var H=Object.assign({},M);requestAnimationFrame(function(){F&&(P.activationState_.hasDeactivationUXRun=!0,P.animateDeactivation_(N,H)),L&&(P.activationState_=P.defaultActivationState_())})}}},{key:'deactivate',value:function(){this.deactivate_(null)}},{key:'animateDeactivation_',value:function(N,P){var M=P.wasActivatedByPointer,w=P.wasElementMadeActive,R=I.cssClasses.BG_FOCUSED;(M||w)&&(this.adapter_.removeClass(R),this.runDeactivationUXLogicIfReady_())}},{key:'destroy',value:function(){var N=this;if(this.isSupported_){this.removeEventListeners_();var P=I.cssClasses,M=P.ROOT,w=P.UNBOUNDED;requestAnimationFrame(function(){N.adapter_.removeClass(M),N.adapter_.removeClass(w),N.removeCssVars_()})}}},{key:'removeEventListeners_',value:function(){var N=this;this.listenerInfos_.forEach(function(P){Object.keys(P).forEach(function(M){N.adapter_.deregisterInteractionHandler(P[M],N.listeners_[M])})}),this.adapter_.deregisterResizeHandler(this.resizeHandler_)}},{key:'removeCssVars_',value:function(){var N=this,P=I.strings;Object.keys(P).forEach(function(M){0===M.indexOf('VAR_')&&N.adapter_.updateCssVariable(P[M],null)})}},{key:'layout',value:function(){var N=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame(function(){N.layoutInternal_(),N.layoutFrame_=0})}},{key:'layoutInternal_',value:function(){this.frame_=this.adapter_.computeBoundingRect();var N=_Mathmax(this.frame_.height,this.frame_.width),P=_Mathsqrt(_Mathpow(this.frame_.width,2)+_Mathpow(this.frame_.height,2));this.initialSize_=N*I.numbers.INITIAL_ORIGIN_SCALE,this.maxRadius_=P+I.numbers.PADDING,this.fgScale_=this.maxRadius_/this.initialSize_,this.xfDuration_=1e3*_Mathsqrt(this.maxRadius_/1024),this.updateLayoutCssVars_()}},{key:'updateLayoutCssVars_',value:function(){var N=I.strings,P=N.VAR_SURFACE_WIDTH,M=N.VAR_SURFACE_HEIGHT,w=N.VAR_FG_SIZE,R=N.VAR_LEFT,O=N.VAR_TOP,F=N.VAR_FG_SCALE;this.adapter_.updateCssVariable(P,this.frame_.width+'px'),this.adapter_.updateCssVariable(M,this.frame_.height+'px'),this.adapter_.updateCssVariable(w,this.initialSize_+'px'),this.adapter_.updateCssVariable(F,this.fgScale_),this.adapter_.isUnbounded()&&(this.unboundedCoords_={left:_Mathround(this.frame_.width/2-this.initialSize_/2),top:_Mathround(this.frame_.height/2-this.initialSize_/2)},this.adapter_.updateCssVariable(R,this.unboundedCoords_.left+'px'),this.adapter_.updateCssVariable(O,this.unboundedCoords_.top+'px'))}}]),I}(b.MDCFoundation);n.default=T}])});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).setImmediate, __webpack_require__(0).clearImmediate))

/***/ })
/******/ ]);