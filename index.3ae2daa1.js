!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequirea610;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},e.parcelRequirea610=n);var o,s=n("7pbsT"),a=n("4tSb9"),i=n("4s6iC"),l=n("l1RgP"),u=n("fSCrk"),c=n("iD6GO"),f=n("5cQgp"),d=(o=(0,s.default)((function(e){var t;return(0,a.__generator)(this,(function(r){switch(r.label){case 0:return[4,fetch(i.url+new URLSearchParams(e))];case 1:if(!(t=r.sent()).ok)throw new Error(t.status);return[4,t.json()];case 2:return[2,r.sent()]}}))})),function(e){return o.apply(this,arguments)}),p=function(){var e=(0,s.default)((function(){var e,t;return(0,a.__generator)(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,3,4]),u.options.page++,[4,d(u.options)];case 1:return e=r.sent(),n=e.hits,l.refs.gallery.insertAdjacentHTML("beforeend",(0,f.default)(n)),e.totalHits,[3,4];case 2:return t=r.sent(),console.log(t.message),[3,4];case 3:return[7];case 4:return[2]}var n}))}));return function(){return e.apply(this,arguments)}}();window.addEventListener("scroll",(0,c.throttle)(i.DELAY,(function(){var e=document.documentElement,t=e.scrollTop,r=e.scrollHeight;t+e.clientHeight>=r-5&&p()})),{passive:!0})}();
//# sourceMappingURL=index.3ae2daa1.js.map
