/*!
 * EmojioneArea v3.4.1
 * https://github.com/mervick/emojionearea
 * Copyright Andrey Izman and other contributors
 * Released under the MIT license
 * Date: 2018-04-27T09:03Z
 */
 /*! jquery-textcomplete - v1.8.4 - 2017-08-29 */
!function(a){if("function"==typeof define&&define.amd)define(["jquery"],a);else if("object"==typeof module&&module.exports){var b=require("jquery");module.exports=a(b)}else a(jQuery)}(function(a){if("undefined"==typeof a)throw new Error("jQuery.textcomplete requires jQuery");return+function(a){"use strict";var b=function(a){console.warn&&console.warn(a)},c=1;a.fn.textcomplete=function(d,e){var f=Array.prototype.slice.call(arguments);return this.each(function(){var g=this,h=a(this),i=h.data("textComplete");if(i||(e||(e={}),e._oid=c++,i=new a.fn.textcomplete.Completer(this,e),h.data("textComplete",i)),"string"==typeof d){if(!i)return;f.shift(),i[d].apply(i,f),"destroy"===d&&h.removeData("textComplete")}else a.each(d,function(c){a.each(["header","footer","placement","maxCount"],function(a){c[a]&&(i.option[a]=c[a],b(a+"as a strategy param is deprecated. Use option."),delete c[a])})}),i.register(a.fn.textcomplete.Strategy.parse(d,{el:g,$el:h}))})}}(a),+function(a){"use strict";function b(c,d){if(this.$el=a(c),this.id="textcomplete"+e++,this.strategies=[],this.views=[],this.option=a.extend({},b.defaults,d),!(this.$el.is("input[type=text]")||this.$el.is("input[type=search]")||this.$el.is("textarea")||c.isContentEditable||"true"==c.contentEditable))throw new Error("textcomplete must be called on a Textarea or a ContentEditable.");if(c===c.ownerDocument.activeElement)this.initialize();else{var g=this;this.$el.one("focus."+this.id,function(){g.initialize()}),this.option.adapter&&"CKEditor"!=this.option.adapter||"undefined"==typeof CKEDITOR||!this.$el.is("textarea")||CKEDITOR.on("instanceReady",function(b){-1==a.inArray(b.editor.id,f)&&(f.push(b.editor.id),b.editor.on("focus",function(c){g.$el=a(b.editor.editable().$),g.option.adapter||(g.option.adapter=a.fn.textcomplete.CKEditor),g.option.ckeditor_instance=b.editor,g.initialize()}))})}}var c=function(a){var b,c;return function(){var d=Array.prototype.slice.call(arguments);if(b)return void(c=d);b=!0;var e=this;d.unshift(function f(){if(c){var d=c;c=void 0,d.unshift(f),a.apply(e,d)}else b=!1}),a.apply(this,d)}},d=function(a){return"[object String]"===Object.prototype.toString.call(a)},e=0,f=[];b.defaults={appendTo:"body",className:"",dropdownClassName:"dropdown-menu textcomplete-dropdown",maxCount:10,zIndex:"100",rightEdgeOffset:30},a.extend(b.prototype,{id:null,option:null,strategies:null,adapter:null,dropdown:null,$el:null,$iframe:null,initialize:function(){var b=this.$el.get(0);if(this.$el.prop("ownerDocument")!==document&&window.frames.length)for(var c=0;c<window.frames.length;c++)if(this.$el.prop("ownerDocument")===window.frames[c].document){this.$iframe=a(window.frames[c].frameElement);break}this.dropdown=new a.fn.textcomplete.Dropdown(b,this,this.option);var d,e;this.option.adapter?d=this.option.adapter:(e=this.$el.is("textarea")||this.$el.is("input[type=text]")||this.$el.is("input[type=search]")?"number"==typeof b.selectionEnd?"Textarea":"IETextarea":"ContentEditable",d=a.fn.textcomplete[e]),this.adapter=new d(b,this,this.option)},destroy:function(){this.$el.off("."+this.id),this.adapter&&this.adapter.destroy(),this.dropdown&&this.dropdown.destroy(),this.$el=this.adapter=this.dropdown=null},deactivate:function(){this.dropdown&&this.dropdown.deactivate()},trigger:function(a,b){this.dropdown||this.initialize(),null!=a||(a=this.adapter.getTextFromHeadToCaret());var c=this._extractSearchQuery(a);if(c.length){var d=c[1];if(b&&this._term===d&&""!==d)return;this._term=d,this._search.apply(this,c)}else this._term=null,this.dropdown.deactivate()},fire:function(a){var b=Array.prototype.slice.call(arguments,1);return this.$el.trigger(a,b),this},register:function(a){Array.prototype.push.apply(this.strategies,a)},select:function(a,b,c){this._term=null,this.adapter.select(a,b,c),this.fire("change").fire("textComplete:select",a,b),this.adapter.focus()},_clearAtNext:!0,_term:null,_extractSearchQuery:function(b){for(var c=0;c<this.strategies.length;c++){var e=this.strategies[c],f=e.context(b);if(f||""===f){var g=a.isFunction(e.match)?e.match(b):e.match;d(f)&&(b=f);var h=b.match(g);if(h)return[e,h[e.index],h]}}return[]},_search:c(function(a,b,c,d){var e=this;b.search(c,function(d,f){e.dropdown.shown||e.dropdown.activate(),e._clearAtNext&&(e.dropdown.clear(),e._clearAtNext=!1),e.dropdown.setPosition(e.adapter.getCaretPosition()),e.dropdown.render(e._zip(d,b,c)),f||(a(),e._clearAtNext=!0)},d)}),_zip:function(b,c,d){return a.map(b,function(a){return{value:a,strategy:c,term:d}})}}),a.fn.textcomplete.Completer=b}(a),+function(a){"use strict";function b(c,d,f){this.$el=b.createElement(f),this.completer=d,this.id=d.id+"dropdown",this._data=[],this.$inputEl=a(c),this.option=f,f.listPosition&&(this.setPosition=f.listPosition),f.height&&this.$el.height(f.height);var g=this;a.each(["maxCount","placement","footer","header","noResultsMessage","className"],function(a,b){null!=f[b]&&(g[b]=f[b])}),this._bindEvents(c),e[this.id]=this}var c=a(window),d=function(a,b){var c,d,e=b.strategy.idProperty;for(c=0;c<a.length;c++)if(d=a[c],d.strategy===b.strategy)if(e){if(d.value[e]===b.value[e])return!0}else if(d.value===b.value)return!0;return!1},e={};a(document).on("click",function(b){var c=b.originalEvent&&b.originalEvent.keepTextCompleteDropdown;a.each(e,function(a,b){a!==c&&b.deactivate()})});var f={SKIP_DEFAULT:0,KEY_UP:1,KEY_DOWN:2,KEY_ENTER:3,KEY_PAGEUP:4,KEY_PAGEDOWN:5,KEY_ESCAPE:6};a.extend(b,{createElement:function(b){var c=b.appendTo;c instanceof a||(c=a(c));var d=a("<ul></ul>").addClass(b.dropdownClassName).attr("id","textcomplete-dropdown-"+b._oid).css({display:"none",left:0,position:"absolute",zIndex:b.zIndex}).appendTo(c);return d}}),a.extend(b.prototype,{$el:null,$inputEl:null,completer:null,footer:null,header:null,id:null,maxCount:null,placement:"",shown:!1,data:[],className:"",destroy:function(){this.deactivate(),this.$el.off("."+this.id),this.$inputEl.off("."+this.id),this.clear(),this.$el.remove(),this.$el=this.$inputEl=this.completer=null,delete e[this.id]},render:function(b){var c=this._buildContents(b),d=a.map(b,function(a){return a.value});if(b.length){var e=b[0].strategy;e.id?this.$el.attr("data-strategy",e.id):this.$el.removeAttr("data-strategy"),this._renderHeader(d),this._renderFooter(d),c&&(this._renderContents(c),this._fitToBottom(),this._fitToRight(),this._activateIndexedItem()),this._setScroll()}else this.noResultsMessage?this._renderNoResultsMessage(d):this.shown&&this.deactivate()},setPosition:function(b){var d="absolute";return this.$inputEl.add(this.$inputEl.parents()).each(function(){return"absolute"===a(this).css("position")?!1:"fixed"===a(this).css("position")?(b.top-=c.scrollTop(),b.left-=c.scrollLeft(),d="fixed",!1):void 0}),this.$el.css(this._applyPlacement(b)),this.$el.css({position:d}),this},clear:function(){this.$el.html(""),this.data=[],this._index=0,this._$header=this._$footer=this._$noResultsMessage=null},activate:function(){return this.shown||(this.clear(),this.$el.show(),this.className&&this.$el.addClass(this.className),this.completer.fire("textComplete:show"),this.shown=!0),this},deactivate:function(){return this.shown&&(this.$el.hide(),this.className&&this.$el.removeClass(this.className),this.completer.fire("textComplete:hide"),this.shown=!1),this},isUp:function(a){return 38===a.keyCode||a.ctrlKey&&80===a.keyCode},isDown:function(a){return 40===a.keyCode||a.ctrlKey&&78===a.keyCode},isEnter:function(a){var b=a.ctrlKey||a.altKey||a.metaKey||a.shiftKey;return!b&&(13===a.keyCode||9===a.keyCode||this.option.completeOnSpace===!0&&32===a.keyCode)},isPageup:function(a){return 33===a.keyCode},isPagedown:function(a){return 34===a.keyCode},isEscape:function(a){return 27===a.keyCode},_data:null,_index:null,_$header:null,_$noResultsMessage:null,_$footer:null,_bindEvents:function(){this.$el.on("mousedown."+this.id,".textcomplete-item",a.proxy(this._onClick,this)),this.$el.on("touchstart."+this.id,".textcomplete-item",a.proxy(this._onClick,this)),this.$el.on("mouseover."+this.id,".textcomplete-item",a.proxy(this._onMouseover,this)),this.$inputEl.on("keydown."+this.id,a.proxy(this._onKeydown,this))},_onClick:function(b){var c=a(b.target);b.preventDefault(),b.originalEvent.keepTextCompleteDropdown=this.id,c.hasClass("textcomplete-item")||(c=c.closest(".textcomplete-item"));var d=this.data[parseInt(c.data("index"),10)];this.completer.select(d.value,d.strategy,b);var e=this;setTimeout(function(){e.deactivate(),"touchstart"===b.type&&e.$inputEl.focus()},0)},_onMouseover:function(b){var c=a(b.target);b.preventDefault(),c.hasClass("textcomplete-item")||(c=c.closest(".textcomplete-item")),this._index=parseInt(c.data("index"),10),this._activateIndexedItem()},_onKeydown:function(b){if(this.shown){var c;switch(a.isFunction(this.option.onKeydown)&&(c=this.option.onKeydown(b,f)),null==c&&(c=this._defaultKeydown(b)),c){case f.KEY_UP:b.preventDefault(),this._up();break;case f.KEY_DOWN:b.preventDefault(),this._down();break;case f.KEY_ENTER:b.preventDefault(),this._enter(b);break;case f.KEY_PAGEUP:b.preventDefault(),this._pageup();break;case f.KEY_PAGEDOWN:b.preventDefault(),this._pagedown();break;case f.KEY_ESCAPE:b.preventDefault(),this.deactivate()}}},_defaultKeydown:function(a){return this.isUp(a)?f.KEY_UP:this.isDown(a)?f.KEY_DOWN:this.isEnter(a)?f.KEY_ENTER:this.isPageup(a)?f.KEY_PAGEUP:this.isPagedown(a)?f.KEY_PAGEDOWN:this.isEscape(a)?f.KEY_ESCAPE:void 0},_up:function(){0===this._index?this._index=this.data.length-1:this._index-=1,this._activateIndexedItem(),this._setScroll()},_down:function(){this._index===this.data.length-1?this._index=0:this._index+=1,this._activateIndexedItem(),this._setScroll()},_enter:function(a){var b=this.data[parseInt(this._getActiveElement().data("index"),10)];this.completer.select(b.value,b.strategy,a),this.deactivate()},_pageup:function(){var b=0,c=this._getActiveElement().position().top-this.$el.innerHeight();this.$el.children().each(function(d){return a(this).position().top+a(this).outerHeight()>c?(b=d,!1):void 0}),this._index=b,this._activateIndexedItem(),this._setScroll()},_pagedown:function(){var b=this.data.length-1,c=this._getActiveElement().position().top+this.$el.innerHeight();this.$el.children().each(function(d){return a(this).position().top>c?(b=d,!1):void 0}),this._index=b,this._activateIndexedItem(),this._setScroll()},_activateIndexedItem:function(){this.$el.find(".textcomplete-item.active").removeClass("active"),this._getActiveElement().addClass("active")},_getActiveElement:function(){return this.$el.children(".textcomplete-item:nth("+this._index+")")},_setScroll:function(){var a=this._getActiveElement(),b=a.position().top,c=a.outerHeight(),d=this.$el.innerHeight(),e=this.$el.scrollTop();0===this._index||this._index==this.data.length-1||0>b?this.$el.scrollTop(b+e):b+c>d&&this.$el.scrollTop(b+c+e-d)},_buildContents:function(a){var b,c,e,f="";for(c=0;c<a.length&&this.data.length!==this.maxCount;c++)b=a[c],d(this.data,b)||(e=this.data.length,this.data.push(b),f+='<li class="textcomplete-item" data-index="'+e+'"><a>',f+=b.strategy.template(b.value,b.term),f+="</a></li>");return f},_renderHeader:function(b){if(this.header){this._$header||(this._$header=a('<li class="textcomplete-header"></li>').prependTo(this.$el));var c=a.isFunction(this.header)?this.header(b):this.header;this._$header.html(c)}},_renderFooter:function(b){if(this.footer){this._$footer||(this._$footer=a('<li class="textcomplete-footer"></li>').appendTo(this.$el));var c=a.isFunction(this.footer)?this.footer(b):this.footer;this._$footer.html(c)}},_renderNoResultsMessage:function(b){if(this.noResultsMessage){this._$noResultsMessage||(this._$noResultsMessage=a('<li class="textcomplete-no-results-message"></li>').appendTo(this.$el));var c=a.isFunction(this.noResultsMessage)?this.noResultsMessage(b):this.noResultsMessage;this._$noResultsMessage.html(c)}},_renderContents:function(a){this._$footer?this._$footer.before(a):this.$el.append(a)},_fitToBottom:function(){var a=c.scrollTop()+c.height(),b=this.$el.height();this.$el.position().top+b>a&&(this.completer.$iframe||this.$el.offset({top:a-b}))},_fitToRight:function(){for(var a,b=this.option.rightEdgeOffset,d=this.$el.offset().left,e=this.$el.width(),f=c.width()-b;d+e>f&&(this.$el.offset({left:d-b}),a=this.$el.offset().left,!(a>=d));)d=a},_applyPlacement:function(a){return-1!==this.placement.indexOf("top")?a={top:"auto",bottom:this.$el.parent().height()-a.top+a.lineHeight,left:a.left}:(a.bottom="auto",delete a.lineHeight),-1!==this.placement.indexOf("absleft")?a.left=0:-1!==this.placement.indexOf("absright")&&(a.right=0,a.left="auto"),a}}),a.fn.textcomplete.Dropdown=b,a.extend(a.fn.textcomplete,f)}(a),+function(a){"use strict";function b(b){a.extend(this,b),this.cache&&(this.search=c(this.search))}var c=function(a){var b={};return function(c,d){b[c]?d(b[c]):a.call(this,c,function(a){b[c]=(b[c]||[]).concat(a),d.apply(null,arguments)})}};b.parse=function(c,d){return a.map(c,function(a){var c=new b(a);return c.el=d.el,c.$el=d.$el,c})},a.extend(b.prototype,{match:null,replace:null,search:null,id:null,cache:!1,context:function(){return!0},index:2,template:function(a){return a},idProperty:null}),a.fn.textcomplete.Strategy=b}(a),+function(a){"use strict";function b(){}var c=Date.now||function(){return(new Date).getTime()},d=function(a,b){var d,e,f,g,h,i=function(){var j=c()-g;b>j?d=setTimeout(i,b-j):(d=null,h=a.apply(f,e),f=e=null)};return function(){return f=this,e=arguments,g=c(),d||(d=setTimeout(i,b)),h}};a.extend(b.prototype,{id:null,completer:null,el:null,$el:null,option:null,initialize:function(b,c,e){this.el=b,this.$el=a(b),this.id=c.id+this.constructor.name,this.completer=c,this.option=e,this.option.debounce&&(this._onKeyup=d(this._onKeyup,this.option.debounce)),this._bindEvents()},destroy:function(){this.$el.off("."+this.id),this.$el=this.el=this.completer=null},select:function(){throw new Error("Not implemented")},getCaretPosition:function(){var b=this._getCaretRelativePosition(),c=this.$el.offset(),d=this.option.appendTo;if(d){d instanceof a||(d=a(d));var e=d.offsetParent().offset();c.top-=e.top,c.left-=e.left}return b.top+=c.top,b.left+=c.left,b},focus:function(){this.$el.focus()},_bindEvents:function(){this.$el.on("keyup."+this.id,a.proxy(this._onKeyup,this))},_onKeyup:function(a){this._skipSearch(a)||this.completer.trigger(this.getTextFromHeadToCaret(),!0)},_skipSearch:function(a){switch(a.keyCode){case 9:case 13:case 16:case 17:case 18:case 33:case 34:case 40:case 38:case 27:return!0}if(a.ctrlKey)switch(a.keyCode){case 78:case 80:return!0}}}),a.fn.textcomplete.Adapter=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.Adapter.prototype,{select:function(b,c,d){var e,f=this.getTextFromHeadToCaret(),g=this.el.value.substring(this.el.selectionEnd),h=c.replace(b,d);"undefined"!=typeof h&&(a.isArray(h)&&(g=h[1]+g,h=h[0]),e=a.isFunction(c.match)?c.match(f):c.match,f=f.replace(e,h),this.$el.val(f+g),this.el.selectionStart=this.el.selectionEnd=f.length)},getTextFromHeadToCaret:function(){return this.el.value.substring(0,this.el.selectionEnd)},_getCaretRelativePosition:function(){var b=a.fn.textcomplete.getCaretCoordinates(this.el,this.el.selectionStart);return{top:b.top+this._calculateLineHeight()-this.$el.scrollTop(),left:b.left-this.$el.scrollLeft(),lineHeight:this._calculateLineHeight()}},_calculateLineHeight:function(){var a=parseInt(this.$el.css("line-height"),10);if(isNaN(a)){var b=this.el.parentNode,c=document.createElement(this.el.nodeName),d=this.el.style;c.setAttribute("style","margin:0px;padding:0px;font-family:"+d.fontFamily+";font-size:"+d.fontSize),c.innerHTML="test",b.appendChild(c),a=c.clientHeight,b.removeChild(c)}return a}}),a.fn.textcomplete.Textarea=b}(a),+function(a){"use strict";function b(b,d,e){this.initialize(b,d,e),a("<span>"+c+"</span>").css({position:"absolute",top:-9999,left:-9999}).insertBefore(b)}var c="吶";a.extend(b.prototype,a.fn.textcomplete.Textarea.prototype,{select:function(b,c,d){var e,f=this.getTextFromHeadToCaret(),g=this.el.value.substring(f.length),h=c.replace(b,d);if("undefined"!=typeof h){a.isArray(h)&&(g=h[1]+g,h=h[0]),e=a.isFunction(c.match)?c.match(f):c.match,f=f.replace(e,h),this.$el.val(f+g),this.el.focus();var i=this.el.createTextRange();i.collapse(!0),i.moveEnd("character",f.length),i.moveStart("character",f.length),i.select()}},getTextFromHeadToCaret:function(){this.el.focus();var a=document.selection.createRange();a.moveStart("character",-this.el.value.length);var b=a.text.split(c);return 1===b.length?b[0]:b[1]}}),a.fn.textcomplete.IETextarea=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.Adapter.prototype,{select:function(b,c,d){var e=this.getTextFromHeadToCaret(),f=this.el.ownerDocument.getSelection(),g=f.getRangeAt(0),h=g.cloneRange();h.selectNodeContents(g.startContainer);var i,j=h.toString(),k=j.substring(g.startOffset),l=c.replace(b,d);if("undefined"!=typeof l){a.isArray(l)&&(k=l[1]+k,l=l[0]),i=a.isFunction(c.match)?c.match(e):c.match,e=e.replace(i,l).replace(/ $/,"&nbsp"),g.selectNodeContents(g.startContainer),g.deleteContents();var m=this.el.ownerDocument.createElement("div");m.innerHTML=e;var n=this.el.ownerDocument.createElement("div");n.innerHTML=k;for(var o,p,q=this.el.ownerDocument.createDocumentFragment();o=m.firstChild;)p=q.appendChild(o);for(;o=n.firstChild;)q.appendChild(o);g.insertNode(q),g.setStartAfter(p),g.collapse(!0),f.removeAllRanges(),f.addRange(g)}},_getCaretRelativePosition:function(){var b=this.el.ownerDocument.getSelection().getRangeAt(0).cloneRange(),c=b.endContainer.parentNode,d=this.el.ownerDocument.createElement("span");b.insertNode(d),b.selectNodeContents(d),b.deleteContents(),setTimeout(function(){c.normalize()},0);var e=a(d),f=e.offset();if(f.left-=this.$el.offset().left,f.top+=e.height()-this.$el.offset().top,f.lineHeight=e.height(),this.completer.$iframe){var g=this.completer.$iframe.offset();f.top+=g.top,f.left+=g.left,f.top-=a(this.completer.$iframe[0].contentWindow.document).scrollTop()}return e.remove(),f},getTextFromHeadToCaret:function(){var a=this.el.ownerDocument.getSelection().getRangeAt(0),b=a.cloneRange();return b.selectNodeContents(a.startContainer),b.toString().substring(0,a.startOffset)}}),a.fn.textcomplete.ContentEditable=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.ContentEditable.prototype,{_bindEvents:function(){var b=this;this.option.ckeditor_instance.on("key",function(a){var c=a.data;return b._onKeyup(c),b.completer.dropdown.shown&&b._skipSearch(c)?!1:void 0},null,null,1),this.$el.on("keyup."+this.id,a.proxy(this._onKeyup,this))}}),a.fn.textcomplete.CKEditor=b}(a),function(a){function b(a,b,f){if(!d)throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");var g=f&&f.debug||!1;if(g){var h=document.querySelector("#input-textarea-caret-position-mirror-div");h&&h.parentNode.removeChild(h)}var i=document.createElement("div");i.id="input-textarea-caret-position-mirror-div",document.body.appendChild(i);var j=i.style,k=window.getComputedStyle?getComputedStyle(a):a.currentStyle;j.whiteSpace="pre-wrap","INPUT"!==a.nodeName&&(j.wordWrap="break-word"),j.position="absolute",g||(j.visibility="hidden"),c.forEach(function(a){j[a]=k[a]}),e?a.scrollHeight>parseInt(k.height)&&(j.overflowY="scroll"):j.overflow="hidden",i.textContent=a.value.substring(0,b),"INPUT"===a.nodeName&&(i.textContent=i.textContent.replace(/\s/g," "));var l=document.createElement("span");l.textContent=a.value.substring(b)||".",i.appendChild(l);var m={top:l.offsetTop+parseInt(k.borderTopWidth),left:l.offsetLeft+parseInt(k.borderLeftWidth)};return g?l.style.backgroundColor="#aaa":document.body.removeChild(i),m}var c=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"],d="undefined"!=typeof window,e=d&&null!=window.mozInnerScreenX;a.fn.textcomplete.getCaretCoordinates=b}(a),a});
window = ( typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {} );
document = window.document || {};

; ( function ( factory, global ) {
    if ( typeof require === "function" && typeof exports === "object" && typeof module === "object" ) {

        // CommonJS
        factory( require( "jquery" ) );
    } else if ( typeof define === "function" && define.amd ) {

        // AMD
        define( [ "jquery" ], factory );
    } else {

        // Normal script tag
        factory( global.jQuery );
    }
}( function ( $ ) {
    "use strict";

    var unique = 0;
    var eventStorage = {};
    var possibleEvents = {};
    var emojione = window.emojione;
    var readyCallbacks = [];
    function emojioneReady (fn) {
        if (emojione) {
            fn();
        } else {
            readyCallbacks.push(fn);
        }
    };
    var blankImg = 'data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';
    var slice = [].slice;
    var css_class = "youzify-emojionearea";
    var emojioneSupportMode = 0;
    var invisibleChar = '&#8203;';
    function trigger(self, event, args) {
        var result = true, j = 1;
        if (event) {
            event = event.toLowerCase();
            do {
                var _event = j==1 ? '@' + event : event;
                if (eventStorage[self.id][_event] && eventStorage[self.id][_event].length) {
                    $.each(eventStorage[self.id][_event], function (i, fn) {
                        return result = fn.apply(self, args|| []) !== false;
                    });
                }
            } while (result && !!j--);
        }
        return result;
    }
    function attach(self, element, events, target) {
        target = target || function (event, callerEvent) { return $(callerEvent.currentTarget) };
        $.each(events, function(event, link) {
            event = $.isArray(events) ? link : event;
            (possibleEvents[self.id][link] || (possibleEvents[self.id][link] = []))
                .push([element, event, target]);
        });
    }
    function createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count >0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                     range.setEnd(node, chars.count);
                     chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                       break;
                    }
                }
            }
       }

       return range;
    };

    function setCurrentCursorPosition( element, chars) {
        var range;
        if (chars >= 0) {
            var selection = window.getSelection();

            range = createRange(element.parentNode, { count: chars });

            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };

    function getTemplate(template, unicode, shortname) {
        var imageType = emojione.imageType, imagePath;
        if (imageType=='svg'){
            imagePath = emojione.imagePathSVG;
        } else {
            imagePath = emojione.imagePathPNG;
        }
        var friendlyName = '';
        if (shortname) {
            friendlyName = shortname.substr(1, shortname.length - 2).replace(/_/g, ' ').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }
        var fname = '';
        if (unicode.uc_base && emojioneSupportMode > 4) {
            fname = unicode.uc_base;
            unicode = unicode.uc_output.toUpperCase();
        } else {
            fname = unicode;
        }
        template = template.replace('{name}', shortname || '')
            .replace('{friendlyName}', friendlyName)
            .replace('{img}', imagePath + (emojioneSupportMode < 2 ? fname.toUpperCase() : fname) + '.' + imageType)
            .replace('{uni}', unicode);

        if(shortname) {
            template = template.replace('{alt}', emojione.shortnameToUnicode(shortname));
        } else {
            template = template.replace('{alt}', emojione.convert(unicode));
        }

        return template;
    };
    function shortnameTo(str, template, clear) {
        return str.replace(/:?\+?[\w_\-]+:?/g, function(shortname) {
            shortname = ":" + shortname.replace(/:$/,'').replace(/^:/,'') + ":";
            var unicode = emojione.emojioneList[shortname];
            if (unicode) {
                if (emojioneSupportMode > 4) {
                    return getTemplate(template, unicode, shortname);
                } else {
                    if (emojioneSupportMode > 3) unicode = unicode.unicode;
                    return getTemplate(template, unicode[unicode.length-1], shortname);
                }
            }
            return clear ? '' : shortname;
        });
    };
    function pasteHtmlAtCaret(html) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            document.selection.createRange().pasteHTML(html);
        }
    }
    function getEmojioneVersion() {
        return window.emojioneVersion || '3.1.2';
    };
    function isObject(variable) {
        return typeof variable === 'object';
    };
    function detectVersion(emojione) {
        var version;
        if (emojione.cacheBustParam) {
            version = emojione.cacheBustParam;
            if (!isObject(emojione['jsEscapeMap'])) return '1.5.2';
            if (version === "?v=1.2.4") return '2.0.0';
            if (version === "?v=2.0.1") return '2.1.0'; // v2.0.1 || v2.1.0
            if (version === "?v=2.1.1") return '2.1.1';
            if (version === "?v=2.1.2") return '2.1.2';
            if (version === "?v=2.1.3") return '2.1.3';
            if (version === "?v=2.1.4") return '2.1.4';
            if (version === "?v=2.2.7") return '2.2.7';
            return '2.2.7';
        } else {
            return emojione.emojiVersion;
        }
    };
    function getSupportMode(version) {
        switch (version) {
            case '1.5.2': return 0;
            case '2.0.0': return 1;
            case '2.1.0':
            case '2.1.1': return 2;
            case '2.1.2': return 3;
            case '2.1.3':
            case '2.1.4':
            case '2.2.7': return 4;
            case '3.0.1':
            case '3.0.2':
            case '3.0.3':
            case '3.0': return 5;
            case '3.1.0':
            case '3.1.1':
            case '3.1.2':
            case '3.1':
            default: return 6;
        }
    };
    function getDefaultOptions () {
        if ($.fn.Youzify_emojioneArea && $.fn.Youzify_emojioneArea.defaults) {
            return $.fn.Youzify_emojioneArea.defaults;
        }

        var defaultOptions = {
            attributes: {
                dir               : "ltr",
                spellcheck        : false,
                autocomplete      : "off",
                autocorrect       : "off",
                autocapitalize    : "off",
            },
            search            : true,
            placeholder       : null,
            emojiPlaceholder  : ":smiley:",
            searchPlaceholder : "SEARCH",
            container         : null,
            hideSource        : true,
            shortnames        : true,
            sprite            : true,
            pickerPosition    : "top", // top | bottom | right
            filtersPosition   : "top", // top | bottom
            searchPosition    : "top", // top | bottom
            hidePickerOnBlur  : true,
            buttonTitle       : "Use the TAB key to insert emoji faster",
            tones             : true,
            tonesStyle        : "bullet", // bullet | radio | square | checkbox
            inline            : null, // null - auto
            saveEmojisAs      : "unicode", // unicode | shortname | image
            shortcuts         : true,
            autocomplete      : true,
            autocompleteTones : false,
            standalone        : false,
            useInternalCDN    : true, // Use the self loading mechanism
            imageType         : "png", // Default image type used by internal CDN
            recentEmojis      : true,
            textcomplete: {
                maxCount      : 15,
                placement     : null // null - default | top | absleft | absright
            }
        };

        var supportMode = !emojione ? getSupportMode(getEmojioneVersion()) : getSupportMode(detectVersion(emojione));

        if (supportMode > 4) {
            defaultOptions.filters = {
                tones: {
                    title: "Diversity",
                    emoji: "open_hands raised_hands palms_up_together clap pray thumbsup thumbsdown punch fist left_facing_fist right_facing_fist " +
                    "fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up raised_hand " +
                    "raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie nail_care ear " +
                    "nose baby boy girl man woman blond-haired_woman blond-haired_man older_man older_woman " +
                    "man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer " +
                    "man_police_officer woman_construction_worker man_construction_worker " +
                    "woman_guard man_guard woman_detective man_detective woman_health_worker man_health_worker " +
                    "woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer woman_teacher " +
                    "man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist woman_office_worker " +
                    "man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist man_artist " +
                    "woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge " +
                    "man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman " +
                    "breast_feeding woman_bowing man_bowing man_tipping_hand woman_tipping_hand " +
                    "man_gesturing_no woman_gesturing_no man_gesturing_ok woman_gesturing_ok " +
                    "man_raising_hand woman_raising_hand woman_facepalming man_facepalming " +
                    "woman_shrugging man_shrugging man_pouting woman_pouting " +
                    "man_frowning woman_frowning man_getting_haircut woman_getting_haircut " +
                    "man_getting_face_massage woman_getting_face_massage man_in_business_suit_levitating dancer man_dancing " +
                    "woman_walking man_walking woman_running man_running adult child older_adult " +
                    "bearded_person woman_with_headscarf woman_mage man_mage " +
                    "woman_fairy man_fairy woman_vampire man_vampire mermaid merman woman_elf man_elf " +
                    "snowboarder woman_lifting_weights man_lifting_weights woman_cartwheeling " +
                    "man_cartwheeling woman_bouncing_ball man_bouncing_ball " +
                    "woman_playing_handball man_playing_handball woman_golfing man_golfing " +
                    "woman_surfing man_surfing woman_swimming man_swimming woman_playing_water_polo " +
                    "man_playing_water_polo woman_rowing_boat man_rowing_boat " +
                    "horse_racing woman_biking man_biking woman_mountain_biking " +
                    "man_mountain_biking woman_juggling man_juggling " +
                    "woman_in_steamy_room man_in_steamy_room woman_climbing " +
                    "man_climbing woman_in_lotus_position man_in_lotus_position bath person_in_bed"
                },

                recent: {
                    icon: "clock3",
                    title: "Recent",
                    emoji: ""
                },

                smileys_people: {
                    icon: "yum",
                    title: "Smileys & People",
                    emoji: "grinning smiley smile grin laughing sweat_smile joy rofl relaxed blush innocent slight_smile upside_down " +
                    "wink relieved crazy_face star_struck heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes yum " +
                    "stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth hugging nerd sunglasses " +
                    "cowboy smirk unamused disappointed pensive worried face_with_raised_eyebrow face_with_monocle confused slight_frown " +
                    "frowning2 persevere confounded tired_face weary triumph angry rage face_with_symbols_over_mouth " +
                    "no_mouth neutral_face expressionless hushed frowning anguished open_mouth astonished dizzy_face exploding_head flushed scream " +
                    "fearful cold_sweat cry disappointed_relieved drooling_face sob sweat sleepy sleeping rolling_eyes thinking " +
                    "shushing_face face_with_hand_over_mouth lying_face grimacing zipper_mouth face_vomiting nauseated_face sneezing_face mask thermometer_face " +
                    "head_bandage smiling_imp imp japanese_ogre japanese_goblin poop ghost skull skull_crossbones alien space_invader " +
                    "robot jack_o_lantern clown smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face " +
                    "pouting_cat open_hands raised_hands palms_up_together clap pray handshake thumbsup thumbsdown punch fist left_facing_fist " +
                    "right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up " +
                    "raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie " +
                    "nail_care ring lipstick kiss lips tongue ear nose footprints eye eyes speaking_head bust_in_silhouette " +
                    "busts_in_silhouette baby boy girl man woman blond-haired_woman blond_haired_man older_man older_woman " +
                    "man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer police_officer " +
                    "woman_construction_worker construction_worker woman_guard guard woman_detective detective woman_health_worker " +
                    "man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer " +
                    "woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist " +
                    "woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist " +
                    "man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge " +
                    "man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing " +
                    "man_bowing woman_tipping_hand man_tipping_hand woman_gesturing_no man_gesturing_no woman_gesturing_ok " +
                    "man_gesturing_ok woman_raising_hand man_raising_hand woman_facepalming man_facepalming woman_shrugging " +
                    "man_shrugging woman_pouting man_pouting woman_frowning man_frowning woman_getting_haircut man_getting_haircut " +
                    "woman_getting_face_massage man_getting_face_massage man_in_business_suit_levitating dancer man_dancing women_with_bunny_ears_partying " +
                    "men_with_bunny_ears_partying woman_walking man_walking woman_running man_running couple two_women_holding_hands " +
                    "two_men_holding_hands couple_with_heart couple_ww couple_mm couplekiss kiss_ww kiss_mm family family_mwg family_mwgb " +
                    "family_mwbb family_mwgg family_wwb family_wwg family_wwgb family_wwbb family_wwgg family_mmb family_mmg family_mmgb " +
                    "family_mmbb family_mmgg family_woman_boy family_woman_girl family_woman_girl_boy family_woman_boy_boy " +
                    "family_woman_girl_girl family_man_boy family_man_girl family_man_girl_boy family_man_boy_boy family_man_girl_girl " +
                    "bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire " +
                    "mermaid merman woman_elf man_elf woman_genie man_genie woman_zombie man_zombie " +
                    "womans_clothes shirt jeans necktie dress bikini kimono high_heel sandal boot mans_shoe athletic_shoe womans_hat " +
                    "tophat mortar_board crown helmet_with_cross school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses " +
                    "closed_umbrella umbrella2 brain billed_cap scarf gloves coat socks "
                },

                animals_nature: {
                    icon: "hamster",
                    title: "Animals & Nature",
                    emoji: "dog cat mouse hamster rabbit fox bear panda_face koala tiger lion_face cow pig pig_nose frog monkey_face see_no_evil " +
                    "hear_no_evil speak_no_evil monkey chicken penguin bird baby_chick hatching_chick hatched_chick duck eagle owl bat wolf boar " +
                    "horse unicorn bee bug butterfly snail shell beetle ant spider spider_web turtle snake lizard scorpion crab squid octopus shrimp " +
                    "tropical_fish fish blowfish dolphin shark whale whale2 crocodile leopard tiger2 water_buffalo ox cow2 deer dromedary_camel camel " +
                    "elephant rhino gorilla racehorse pig2 goat ram sheep dog2 poodle cat2 rooster turkey dove rabbit2 mouse2 rat chipmunk dragon " +
                    "giraffe zebra hedgehog sauropod t_rex cricket dragon_face feet cactus christmas_tree evergreen_tree deciduous_tree palm_tree seedling herb shamrock four_leaf_clover " +
                    "bamboo tanabata_tree leaves fallen_leaf maple_leaf mushroom ear_of_rice bouquet tulip rose wilted_rose sunflower blossom " +
                    "cherry_blossom hibiscus earth_americas earth_africa earth_asia full_moon waning_gibbous_moon last_quarter_moon " +
                    "waning_crescent_moon new_moon waxing_crescent_moon first_quarter_moon waxing_gibbous_moon new_moon_with_face " +
                    "full_moon_with_face sun_with_face first_quarter_moon_with_face last_quarter_moon_with_face crescent_moon dizzy star star2 " +
                    "sparkles zap fire boom comet sunny white_sun_small_cloud partly_sunny white_sun_cloud white_sun_rain_cloud rainbow cloud " +
                    "cloud_rain thunder_cloud_rain cloud_lightning cloud_snow snowman2 snowman snowflake wind_blowing_face dash cloud_tornado " +
                    "fog ocean droplet sweat_drops umbrella "
                },

                food_drink: {
                    icon: "pizza",
                    title: "Food & Drink",
                    emoji: "green_apple apple pear tangerine lemon banana watermelon grapes strawberry melon cherries peach pineapple kiwi " +
                    "avocado tomato eggplant cucumber carrot corn hot_pepper potato sweet_potato chestnut peanuts honey_pot croissant " +
                    "bread french_bread cheese egg cooking bacon pancakes fried_shrimp poultry_leg meat_on_bone pizza hotdog hamburger " +
                    "fries stuffed_flatbread taco burrito salad shallow_pan_of_food spaghetti ramen stew fish_cake sushi bento curry " +
                    "rice_ball rice rice_cracker oden dango shaved_ice ice_cream icecream cake birthday custard lollipop candy " +
                    "chocolate_bar popcorn doughnut cookie milk baby_bottle coffee tea sake beer beers champagne_glass wine_glass " +
                    "tumbler_glass cocktail tropical_drink champagne spoon fork_and_knife fork_knife_plate dumpling fortune_cookie " +
                    "takeout_box chopsticks bowl_with_spoon cup_with_straw coconut broccoli pie pretzel cut_of_meat sandwich canned_food"
                },

                activity: {
                    icon: "basketball",
                    title: "Activity",
                    emoji: "soccer basketball football baseball tennis volleyball rugby_football 8ball ping_pong badminton goal hockey field_hockey " +
                    "cricket_game golf bow_and_arrow fishing_pole_and_fish boxing_glove martial_arts_uniform ice_skate ski skier snowboarder " +
                    "woman_lifting_weights man_lifting_weights person_fencing women_wrestling men_wrestling woman_cartwheeling " +
                    "man_cartwheeling woman_bouncing_ball man_bouncing_ball woman_playing_handball man_playing_handball woman_golfing " +
                    "man_golfing woman_surfing man_surfing woman_swimming man_swimming woman_playing_water_polo " +
                    "man_playing_water_polo woman_rowing_boat man_rowing_boat horse_racing woman_biking man_biking woman_mountain_biking man_mountain_biking " +
                    "woman_in_steamy_room man_in_steamy_room woman_climbing man_climbing woman_in_lotus_position man_in_lotus_position " +
                    "running_shirt_with_sash medal military_medal first_place second_place " +
                    "third_place trophy rosette reminder_ribbon ticket tickets circus_tent woman_juggling man_juggling performing_arts art " +
                    "clapper microphone headphones musical_score musical_keyboard drum saxophone trumpet guitar violin game_die dart bowling " +
                    "video_game slot_machine sled curling_stone "
                },

                travel_places: {
                    icon: "rocket",
                    title: "Travel & Places",
                    emoji: "red_car taxi blue_car bus trolleybus race_car police_car ambulance fire_engine minibus truck articulated_lorry tractor " +
                    "scooter bike motor_scooter motorcycle rotating_light oncoming_police_car oncoming_bus oncoming_automobile oncoming_taxi " +
                    "aerial_tramway mountain_cableway suspension_railway railway_car train mountain_railway monorail bullettrain_side " +
                    "bullettrain_front light_rail steam_locomotive train2 metro tram station helicopter airplane_small airplane " +
                    "airplane_departure airplane_arriving rocket satellite_orbital seat canoe sailboat motorboat speedboat cruise_ship " +
                    "ferry ship anchor construction fuelpump busstop vertical_traffic_light traffic_light map moyai statue_of_liberty " +
                    "fountain tokyo_tower european_castle japanese_castle stadium ferris_wheel roller_coaster carousel_horse beach_umbrella " +
                    "beach island mountain mountain_snow mount_fuji volcano desert camping tent railway_track motorway construction_site " +
                    "factory house house_with_garden homes house_abandoned office department_store post_office european_post_office hospital " +
                    "bank hotel convenience_store school love_hotel wedding classical_building church mosque synagogue kaaba shinto_shrine " +
                    "japan rice_scene park sunrise sunrise_over_mountains stars sparkler fireworks city_sunset city_dusk cityscape " +
                    "night_with_stars milky_way bridge_at_night foggy flying_saucer"
                },

                objects: {
                    icon: "bulb",
                    title: "Objects",
                    emoji: "watch iphone calling computer keyboard desktop printer mouse_three_button trackball joystick compression minidisc " +
                    "floppy_disk cd dvd vhs camera camera_with_flash video_camera movie_camera projector film_frames telephone_receiver " +
                    "telephone pager fax tv radio microphone2 level_slider control_knobs stopwatch timer alarm_clock clock hourglass " +
                    "hourglass_flowing_sand satellite battery electric_plug bulb flashlight candle wastebasket oil money_with_wings " +
                    "dollar yen euro pound moneybag credit_card gem scales wrench hammer hammer_pick tools pick nut_and_bolt gear " +
                    "chains gun bomb knife dagger crossed_swords shield smoking coffin urn amphora crystal_ball prayer_beads barber " +
                    "alembic telescope microscope hole pill syringe thermometer toilet potable_water shower bathtub bath bellhop key " +
                    "key2 door couch bed sleeping_accommodation frame_photo shopping_bags shopping_cart gift balloon flags ribbon " +
                    "confetti_ball tada dolls izakaya_lantern wind_chime envelope envelope_with_arrow incoming_envelope e-mail " +
                    "love_letter inbox_tray outbox_tray package label mailbox_closed mailbox mailbox_with_mail mailbox_with_no_mail " +
                    "postbox postal_horn scroll page_with_curl page_facing_up bookmark_tabs bar_chart chart_with_upwards_trend " +
                    "chart_with_downwards_trend notepad_spiral calendar_spiral calendar date card_index card_box ballot_box " +
                    "file_cabinet clipboard file_folder open_file_folder dividers newspaper2 newspaper notebook " +
                    "notebook_with_decorative_cover ledger closed_book green_book blue_book orange_book books book bookmark link " +
                    "paperclip paperclips triangular_ruler straight_ruler pushpin round_pushpin scissors pen_ballpoint pen_fountain " +
                    "black_nib paintbrush crayon pencil pencil2 mag mag_right lock_with_ink_pen closed_lock_with_key lock unlock"
                },

                symbols: {
                    icon: "heartpulse",
                    title: "Symbols",
                    emoji: "heart orange_heart yellow_heart green_heart blue_heart purple_heart black_heart broken_heart heart_exclamation two_hearts " +
                    "revolving_hearts heartbeat heartpulse sparkling_heart cupid gift_heart heart_decoration peace cross star_and_crescent " +
                    "om_symbol wheel_of_dharma star_of_david six_pointed_star menorah yin_yang orthodox_cross place_of_worship ophiuchus " +
                    "aries taurus gemini cancer leo virgo libra scorpius sagittarius capricorn aquarius pisces id atom accept radioactive " +
                    "biohazard mobile_phone_off vibration_mode u6709 u7121 u7533 u55b6 u6708 eight_pointed_black_star vs white_flower " +
                    "ideograph_advantage secret congratulations u5408 u6e80 u5272 u7981 a b ab cl o2 sos x o octagonal_sign no_entry " +
                    "name_badge no_entry_sign 100 anger hotsprings no_pedestrians do_not_litter no_bicycles non-potable_water underage " +
                    "no_mobile_phones no_smoking exclamation grey_exclamation question grey_question bangbang interrobang low_brightness " +
                    "high_brightness part_alternation_mark warning children_crossing trident fleur-de-lis beginner recycle " +
                    "white_check_mark u6307 chart sparkle eight_spoked_asterisk negative_squared_cross_mark globe_with_meridians " +
                    "diamond_shape_with_a_dot_inside m cyclone zzz atm wc wheelchair parking u7a7a sa passport_control customs " +
                    "baggage_claim left_luggage mens womens baby_symbol restroom put_litter_in_its_place cinema signal_strength koko " +
                    "symbols information_source abc abcd capital_abcd ng ok up cool new free zero one two three four five six seven " +
                    "eight nine keycap_ten 1234 hash asterisk arrow_forward pause_button play_pause stop_button record_button eject " +
                    "track_next track_previous fast_forward rewind arrow_double_up arrow_double_down arrow_backward arrow_up_small " +
                    "arrow_down_small arrow_right arrow_left arrow_up arrow_down arrow_upper_right arrow_lower_right arrow_lower_left " +
                    "arrow_upper_left arrow_up_down left_right_arrow arrow_right_hook leftwards_arrow_with_hook arrow_heading_up " +
                    "arrow_heading_down twisted_rightwards_arrows repeat repeat_one arrows_counterclockwise arrows_clockwise " +
                    "musical_note notes heavy_plus_sign heavy_minus_sign heavy_division_sign heavy_multiplication_x heavy_dollar_sign " +
                    "currency_exchange tm copyright registered wavy_dash curly_loop loop end back on top soon heavy_check_mark " +
                    "ballot_box_with_check radio_button white_circle black_circle red_circle blue_circle small_red_triangle " +
                    "small_red_triangle_down small_orange_diamond small_blue_diamond large_orange_diamond large_blue_diamond " +
                    "white_square_button black_square_button black_small_square white_small_square black_medium_small_square " +
                    "white_medium_small_square black_medium_square white_medium_square black_large_square white_large_square speaker " +
                    "mute sound loud_sound bell no_bell mega loudspeaker speech_left eye_in_speech_bubble speech_balloon thought_balloon " +
                    "anger_right spades clubs hearts diamonds black_joker flower_playing_cards mahjong clock1 clock2 clock3 clock4 clock5 " +
                    "clock6 clock7 clock8 clock9 clock10 clock11 clock12 clock130 clock230 clock330 clock430 clock530 clock630 " +
                    "clock730 clock830 clock930 clock1030 clock1130 clock1230"
                },

                flags: {
                    icon: "flag_gb",
                    title: "Flags",
                    emoji: "flag_white flag_black checkered_flag triangular_flag_on_post rainbow_flag flag_af flag_ax flag_al flag_dz flag_as " +
                    "flag_ad flag_ao flag_ai flag_aq flag_ag flag_ar flag_am flag_aw flag_au flag_at flag_az flag_bs flag_bh flag_bd flag_bb " +
                    "flag_by flag_be flag_bz flag_bj flag_bm flag_bt flag_bo flag_ba flag_bw flag_br flag_io flag_vg flag_bn flag_bg flag_bf " +
                    "flag_bi flag_kh flag_cm flag_ca flag_ic flag_cv flag_bq flag_ky flag_cf flag_td flag_cl flag_cn flag_cx flag_cc flag_co " +
                    "flag_km flag_cg flag_cd flag_ck flag_cr flag_ci flag_hr flag_cu flag_cw flag_cy flag_cz flag_dk flag_dj flag_dm flag_do " +
                    "flag_ec flag_eg flag_sv flag_gq flag_er flag_ee flag_et flag_eu flag_fk flag_fo flag_fj flag_fi flag_fr flag_gf flag_pf " +
                    "flag_tf flag_ga flag_gm flag_ge flag_de flag_gh flag_gi flag_gr flag_gl flag_gd flag_gp flag_gu flag_gt flag_gg flag_gn " +
                    "flag_gw flag_gy flag_ht flag_hn flag_hk flag_hu flag_is flag_in flag_id flag_ir flag_iq flag_ie flag_im flag_il flag_it " +
                    "flag_jm flag_jp crossed_flags flag_je flag_jo flag_kz flag_ke flag_ki flag_xk flag_kw flag_kg flag_la flag_lv flag_lb " +
                    "flag_ls flag_lr flag_ly flag_li flag_lt flag_lu flag_mo flag_mk flag_mg flag_mw flag_my flag_mv flag_ml flag_mt flag_mh " +
                    "flag_mq flag_mr flag_mu flag_yt flag_mx flag_fm flag_md flag_mc flag_mn flag_me flag_ms flag_ma flag_mz flag_mm flag_na " +
                    "flag_nr flag_np flag_nl flag_nc flag_nz flag_ni flag_ne flag_ng flag_nu flag_nf flag_kp flag_mp flag_no flag_om flag_pk " +
                    "flag_pw flag_ps flag_pa flag_pg flag_py flag_pe flag_ph flag_pn flag_pl flag_pt flag_pr flag_qa flag_re flag_ro flag_ru " +
                    "flag_rw flag_ws flag_sm flag_st flag_sa flag_sn flag_rs flag_sc flag_sl flag_sg flag_sx flag_sk flag_si flag_gs flag_sb " +
                    "flag_so flag_za flag_kr flag_ss flag_es flag_lk flag_bl flag_sh flag_kn flag_lc flag_pm flag_vc flag_sd flag_sr flag_sz " +
                    "flag_se flag_ch flag_sy flag_tw flag_tj flag_tz flag_th flag_tl flag_tg flag_tk flag_to flag_tt flag_tn flag_tr flag_tm " +
                    "flag_tc flag_tv flag_vi flag_ug flag_ua flag_ae flag_gb flag_us flag_uy flag_uz flag_vu flag_va flag_ve flag_vn flag_wf " +
                    "flag_eh flag_ye flag_zm flag_zw flag_ac flag_ta flag_bv flag_hm flag_sj flag_um flag_ea flag_cp flag_dg flag_mf " +
                    "united_nations england scotland wales"
                }
            };
        } else {
            defaultOptions.filters = {
                tones: {
                    title: "Diversity",
                    emoji: "santa runner surfer swimmer lifter ear nose point_up_2 point_down point_left point_right punch " +
                    "wave ok_hand thumbsup thumbsdown clap open_hands boy girl man woman cop bride_with_veil person_with_blond_hair " +
                    "man_with_gua_pi_mao man_with_turban older_man grandma baby construction_worker princess angel " +
                    "information_desk_person guardsman dancer nail_care massage haircut muscle spy hand_splayed middle_finger " +
                    "vulcan no_good ok_woman bow raising_hand raised_hands person_frowning person_with_pouting_face pray rowboat " +
                    "bicyclist mountain_bicyclist walking bath metal point_up basketball_player fist raised_hand v writing_hand"
                },

                recent: {
                    icon: "clock3",
                    title: "Recent",
                    emoji: ""
                },

                smileys_people: {
                    icon: "yum",
                    title: "Smileys & People",
                    emoji: "grinning grimacing grin joy smiley smile sweat_smile laughing innocent wink blush slight_smile " +
                    "upside_down relaxed yum relieved heart_eyes kissing_heart kissing kissing_smiling_eyes " +
                    "kissing_closed_eyes stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue " +
                    "money_mouth nerd sunglasses hugging smirk no_mouth neutral_face expressionless unamused rolling_eyes " +
                    "thinking flushed disappointed worried angry rage pensive confused slight_frown frowning2 persevere " +
                    "confounded tired_face weary triumph open_mouth scream fearful cold_sweat hushed frowning anguished " +
                    "cry disappointed_relieved sleepy sweat sob dizzy_face astonished zipper_mouth mask thermometer_face " +
                    "head_bandage sleeping zzz poop smiling_imp imp japanese_ogre japanese_goblin skull ghost alien robot " +
                    "smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face " +
                    "pouting_cat raised_hands clap wave thumbsup thumbsdown punch fist v ok_hand raised_hand open_hands " +
                    "muscle pray point_up point_up_2 point_down point_left point_right middle_finger hand_splayed metal " +
                    "vulcan writing_hand nail_care lips tongue ear nose eye eyes bust_in_silhouette busts_in_silhouette " +
                    "speaking_head baby boy girl man woman person_with_blond_hair older_man older_woman man_with_gua_pi_mao " +
                    "man_with_turban cop construction_worker guardsman spy santa angel princess bride_with_veil walking " +
                    "runner dancer dancers couple two_men_holding_hands two_women_holding_hands bow information_desk_person " +
                    "no_good ok_woman raising_hand person_with_pouting_face person_frowning haircut massage couple_with_heart " +
                    "couple_ww couple_mm couplekiss kiss_ww kiss_mm family family_mwg family_mwgb family_mwbb family_mwgg " +
                    "family_wwb family_wwg family_wwgb family_wwbb family_wwgg family_mmb family_mmg family_mmgb family_mmbb " +
                    "family_mmgg womans_clothes shirt jeans necktie dress bikini kimono lipstick kiss footprints high_heel " +
                    "sandal boot mans_shoe athletic_shoe womans_hat tophat helmet_with_cross mortar_board crown school_satchel " +
                    "pouch purse handbag briefcase eyeglasses dark_sunglasses ring closed_umbrella"
                },

                animals_nature: {
                    icon: "hamster",
                    title: "Animals & Nature",
                    emoji: "dog cat mouse hamster rabbit bear panda_face koala tiger lion_face cow pig pig_nose frog " +
                    "octopus monkey_face see_no_evil hear_no_evil speak_no_evil monkey chicken penguin bird baby_chick " +
                    "hatching_chick hatched_chick wolf boar horse unicorn bee bug snail beetle ant spider scorpion crab " +
                    "snake turtle tropical_fish fish blowfish dolphin whale whale2 crocodile leopard tiger2 water_buffalo " +
                    "ox cow2 dromedary_camel camel elephant goat ram sheep racehorse pig2 rat mouse2 rooster turkey dove " +
                    "dog2 poodle cat2 rabbit2 chipmunk feet dragon dragon_face cactus christmas_tree evergreen_tree " +
                    "deciduous_tree palm_tree seedling herb shamrock four_leaf_clover bamboo tanabata_tree leaves " +
                    "fallen_leaf maple_leaf ear_of_rice hibiscus sunflower rose tulip blossom cherry_blossom bouquet " +
                    "mushroom chestnut jack_o_lantern shell spider_web earth_americas earth_africa earth_asia full_moon " +
                    "waning_gibbous_moon last_quarter_moon waning_crescent_moon new_moon waxing_crescent_moon " +
                    "first_quarter_moon waxing_gibbous_moon new_moon_with_face full_moon_with_face first_quarter_moon_with_face " +
                    "last_quarter_moon_with_face sun_with_face crescent_moon star star2 dizzy sparkles comet sunny " +
                    "white_sun_small_cloud partly_sunny white_sun_cloud white_sun_rain_cloud cloud cloud_rain " +
                    "thunder_cloud_rain cloud_lightning zap fire boom snowflake cloud_snow snowman2 snowman wind_blowing_face " +
                    "dash cloud_tornado fog umbrella2 umbrella droplet sweat_drops ocean"
                },

                food_drink: {
                    icon: "pizza",
                    title: "Food & Drink",
                    emoji: "green_apple apple pear tangerine lemon banana watermelon grapes strawberry melon cherries peach " +
                    "pineapple tomato eggplant hot_pepper corn sweet_potato honey_pot bread cheese poultry_leg meat_on_bone " +
                    "fried_shrimp egg hamburger fries hotdog pizza spaghetti taco burrito ramen stew fish_cake sushi bento " +
                    "curry rice_ball rice rice_cracker oden dango shaved_ice ice_cream icecream cake birthday custard candy " +
                    "lollipop chocolate_bar popcorn doughnut cookie beer beers wine_glass cocktail tropical_drink champagne " +
                    "sake tea coffee baby_bottle fork_and_knife fork_knife_plate"
                },

                activity: {
                    icon: "basketball",
                    title: "Activity",
                    emoji: "soccer basketball football baseball tennis volleyball rugby_football 8ball golf golfer ping_pong " +
                    "badminton hockey field_hockey cricket ski skier snowboarder ice_skate bow_and_arrow fishing_pole_and_fish " +
                    "rowboat swimmer surfer bath basketball_player lifter bicyclist mountain_bicyclist horse_racing levitate " +
                    "trophy running_shirt_with_sash medal military_medal reminder_ribbon rosette ticket tickets performing_arts " +
                    "art circus_tent microphone headphones musical_score musical_keyboard saxophone trumpet guitar violin " +
                    "clapper video_game space_invader dart game_die slot_machine bowling"
                },

                travel_places: {
                    icon: "rocket",
                    title: "Travel & Places",
                    emoji: "red_car taxi blue_car bus trolleybus race_car police_car ambulance fire_engine minibus truck " +
                    "articulated_lorry tractor motorcycle bike rotating_light oncoming_police_car oncoming_bus " +
                    "oncoming_automobile oncoming_taxi aerial_tramway mountain_cableway suspension_railway railway_car " +
                    "train monorail bullettrain_side bullettrain_front light_rail mountain_railway steam_locomotive train2 " +
                    "metro tram station helicopter airplane_small airplane airplane_departure airplane_arriving sailboat " +
                    "motorboat speedboat ferry cruise_ship rocket satellite_orbital seat anchor construction fuelpump busstop " +
                    "vertical_traffic_light traffic_light checkered_flag ship ferris_wheel roller_coaster carousel_horse " +
                    "construction_site foggy tokyo_tower factory fountain rice_scene mountain mountain_snow mount_fuji volcano " +
                    "japan camping tent park motorway railway_track sunrise sunrise_over_mountains desert beach island " +
                    "city_sunset city_dusk cityscape night_with_stars bridge_at_night milky_way stars sparkler fireworks " +
                    "rainbow homes european_castle japanese_castle stadium statue_of_liberty house house_with_garden " +
                    "house_abandoned office department_store post_office european_post_office hospital bank hotel " +
                    "convenience_store school love_hotel wedding classical_building church mosque synagogue kaaba shinto_shrine"
                },

                objects: {
                    icon: "bulb",
                    title: "Objects",
                    emoji: "watch iphone calling computer keyboard desktop printer mouse_three_button trackball joystick " +
                    "compression minidisc floppy_disk cd dvd vhs camera camera_with_flash video_camera movie_camera projector " +
                    "film_frames telephone_receiver telephone pager fax tv radio microphone2 level_slider control_knobs " +
                    "stopwatch timer alarm_clock clock hourglass_flowing_sand hourglass satellite battery electric_plug bulb " +
                    "flashlight candle wastebasket oil money_with_wings dollar yen euro pound moneybag credit_card gem scales " +
                    "wrench hammer hammer_pick tools pick nut_and_bolt gear chains gun bomb knife dagger crossed_swords shield " +
                    "smoking skull_crossbones coffin urn amphora crystal_ball prayer_beads barber alembic telescope microscope " +
                    "hole pill syringe thermometer label bookmark toilet shower bathtub key key2 couch sleeping_accommodation " +
                    "bed door bellhop frame_photo map beach_umbrella moyai shopping_bags balloon flags ribbon gift confetti_ball " +
                    "tada dolls wind_chime crossed_flags izakaya_lantern envelope envelope_with_arrow incoming_envelope e-mail " +
                    "love_letter postbox mailbox_closed mailbox mailbox_with_mail mailbox_with_no_mail package postal_horn " +
                    "inbox_tray outbox_tray scroll page_with_curl bookmark_tabs bar_chart chart_with_upwards_trend " +
                    "chart_with_downwards_trend page_facing_up date calendar calendar_spiral card_index card_box ballot_box " +
                    "file_cabinet clipboard notepad_spiral file_folder open_file_folder dividers newspaper2 newspaper notebook " +
                    "closed_book green_book blue_book orange_book notebook_with_decorative_cover ledger books book link " +
                    "paperclip paperclips scissors triangular_ruler straight_ruler pushpin round_pushpin triangular_flag_on_post " +
                    "flag_white flag_black closed_lock_with_key lock unlock lock_with_ink_pen pen_ballpoint pen_fountain " +
                    "black_nib pencil pencil2 crayon paintbrush mag mag_right"
                },

                symbols: {
                    icon: "heartpulse",
                    title: "Symbols",
                    emoji: "heart yellow_heart green_heart blue_heart purple_heart broken_heart heart_exclamation two_hearts " +
                    "revolving_hearts heartbeat heartpulse sparkling_heart cupid gift_heart heart_decoration peace cross " +
                    "star_and_crescent om_symbol wheel_of_dharma star_of_david six_pointed_star menorah yin_yang orthodox_cross " +
                    "place_of_worship ophiuchus aries taurus gemini cancer leo virgo libra scorpius sagittarius capricorn " +
                    "aquarius pisces id atom u7a7a u5272 radioactive biohazard mobile_phone_off vibration_mode u6709 u7121 " +
                    "u7533 u55b6 u6708 eight_pointed_black_star vs accept white_flower ideograph_advantage secret congratulations " +
                    "u5408 u6e80 u7981 a b ab cl o2 sos no_entry name_badge no_entry_sign x o anger hotsprings no_pedestrians " +
                    "do_not_litter no_bicycles non-potable_water underage no_mobile_phones exclamation grey_exclamation question " +
                    "grey_question bangbang interrobang 100 low_brightness high_brightness trident fleur-de-lis part_alternation_mark " +
                    "warning children_crossing beginner recycle u6307 chart sparkle eight_spoked_asterisk negative_squared_cross_mark " +
                    "white_check_mark diamond_shape_with_a_dot_inside cyclone loop globe_with_meridians m atm sa passport_control " +
                    "customs baggage_claim left_luggage wheelchair no_smoking wc parking potable_water mens womens baby_symbol " +
                    "restroom put_litter_in_its_place cinema signal_strength koko ng ok up cool new free zero one two three four " +
                    "five six seven eight nine ten 1234 arrow_forward pause_button play_pause stop_button record_button track_next " +
                    "track_previous fast_forward rewind twisted_rightwards_arrows repeat repeat_one arrow_backward arrow_up_small " +
                    "arrow_down_small arrow_double_up arrow_double_down arrow_right arrow_left arrow_up arrow_down arrow_upper_right " +
                    "arrow_lower_right arrow_lower_left arrow_upper_left arrow_up_down left_right_arrow arrows_counterclockwise " +
                    "arrow_right_hook leftwards_arrow_with_hook arrow_heading_up arrow_heading_down hash asterisk information_source " +
                    "abc abcd capital_abcd symbols musical_note notes wavy_dash curly_loop heavy_check_mark arrows_clockwise " +
                    "heavy_plus_sign heavy_minus_sign heavy_division_sign heavy_multiplication_x heavy_dollar_sign currency_exchange " +
                    "copyright registered tm end back on top soon ballot_box_with_check radio_button white_circle black_circle " +
                    "red_circle large_blue_circle small_orange_diamond small_blue_diamond large_orange_diamond large_blue_diamond " +
                    "small_red_triangle black_small_square white_small_square black_large_square white_large_square small_red_triangle_down " +
                    "black_medium_square white_medium_square black_medium_small_square white_medium_small_square black_square_button " +
                    "white_square_button speaker sound loud_sound mute mega loudspeaker bell no_bell black_joker mahjong spades " +
                    "clubs hearts diamonds flower_playing_cards thought_balloon anger_right speech_balloon clock1 clock2 clock3 " +
                    "clock4 clock5 clock6 clock7 clock8 clock9 clock10 clock11 clock12 clock130 clock230 clock330 clock430 " +
                    "clock530 clock630 clock730 clock830 clock930 clock1030 clock1130 clock1230 eye_in_speech_bubble"
                },

                flags: {
                    icon: "flag_gb",
                    title: "Flags",
                    emoji: "ac af al dz ad ao ai ag ar am aw au at az bs bh bd bb by be bz bj bm bt bo ba bw br bn bg bf bi " +
                    "cv kh cm ca ky cf td flag_cl cn co km cg flag_cd cr hr cu cy cz dk dj dm do ec eg sv gq er ee et fk fo " +
                    "fj fi fr pf ga gm ge de gh gi gr gl gd gu gt gn gw gy ht hn hk hu is in flag_id ir iq ie il it ci jm jp " +
                    "je jo kz ke ki xk kw kg la lv lb ls lr ly li lt lu mo mk mg mw my mv ml mt mh mr mu mx fm md mc mn me " +
                    "ms ma mz mm na nr np nl nc nz ni ne flag_ng nu kp no om pk pw ps pa pg py pe ph pl pt pr qa ro ru rw " +
                    "sh kn lc vc ws sm st flag_sa sn rs sc sl sg sk si sb so za kr es lk sd sr sz se ch sy tw tj tz th tl " +
                    "tg to tt tn tr flag_tm flag_tm ug ua ae gb us vi uy uz vu va ve vn wf eh ye zm zw re ax ta io bq cx " +
                    "cc gg im yt nf pn bl pm gs tk bv hm sj um ic ea cp dg as aq vg ck cw eu gf tf gp mq mp sx ss tc "
                }
            };
        };

        return defaultOptions;
    };
    function getOptions(options) {
        var default_options = getDefaultOptions();
        if (options && options['filters']) {
            var filters = default_options.filters;
            $.each(options['filters'], function(filter, data) {
                if (!isObject(data) || $.isEmptyObject(data)) {
                    delete filters[filter];
                    return;
                }
                $.each(data, function(key, val) {
                    filters[filter][key] = val;
                });
            });
            options['filters'] = filters;
        }
        return $.extend({}, default_options, options);
    };

    var saveSelection, restoreSelection;
    if (window.getSelection && document.createRange) {
        saveSelection = function(el) {
            var sel = window.getSelection && window.getSelection();
            if (sel && sel.rangeCount > 0) {
                return sel.getRangeAt(0);
            }
        };

        restoreSelection = function(el, sel) {
            var range = document.createRange();
            range.setStart(sel.startContainer, sel.startOffset);
            range.setEnd(sel.endContainer, sel.endOffset)

            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.body.createTextRange) {
        saveSelection = function(el) {
            return document.selection.createRange();
        };

        restoreSelection = function(el, sel) {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.setStart(sel.startContanier, sel.startOffset);
            textRange.setEnd(sel.endContainer, sel.endOffset);
            textRange.select();
        };
    }


    var uniRegexp;
    function unicodeTo(str, template) {
        return str.replace(uniRegexp, function(unicodeChar) {
            var map = emojione[(emojioneSupportMode === 0 ? 'jsecapeMap' : 'jsEscapeMap')];
            if (typeof unicodeChar !== 'undefined' && unicodeChar in map) {
                return getTemplate(template, map[unicodeChar], emojione.toShort(unicodeChar));
            }
            return unicodeChar;
        });
    }
    function htmlFromText(str, self) {
        str = str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/`/g, '&#x60;')
            .replace(/(?:\r\n|\r|\n)/g, '\n')
            .replace(/(\n+)/g, '<div>$1</div>')
            .replace(/\n/g, '<br/>')
            .replace(/<br\/><\/div>/g, '</div>');
        if (self.shortnames) {
            str = emojione.shortnameToUnicode(str);
        }
        return unicodeTo(str, self.emojiTemplate)
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/  /g, '&nbsp;&nbsp;');
    }
    function textFromHtml(str, self) {
        str = str
            .replace(/&#10;/g, '\n')
            .replace(/&#09;/g, '\t')
            .replace(/<img[^>]*alt="([^"]+)"[^>]*>/ig, '$1')
            .replace(/\n|\r/g, '')
            .replace(/<br[^>]*>/ig, '\n')
            .replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/ig, '<div>')
            .replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/ig, '</div>')
            .replace(/\n<div><\/div>/ig, '\n')
            .replace(/<div><\/div>\n/ig, '\n')
            .replace(/(?:<div>)+<\/div>/ig, '\n')
            .replace(/([^\n])<\/div><div>/ig, '$1\n')
            .replace(/(?:<\/div>)+/ig, '</div>')
            .replace(/([^\n])<\/div>([^\n])/ig, '$1\n$2')
            .replace(/<\/div>/ig, '')
            .replace(/([^\n])<div>/ig, '$1\n')
            .replace(/\n<div>/ig, '\n')
            .replace(/<div>\n/ig, '\n\n')
            .replace(/<(?:[^>]+)?>/g, '')
            .replace(new RegExp(invisibleChar, 'g'), '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&#x60;/g, '`')
            .replace(/&#60;/g, '<')
            .replace(/&#62;/g, '>')
            .replace(/&amp;/g, '&');

        switch (self.saveEmojisAs) {
            case 'image':
                str = unicodeTo(str, self.emojiTemplate);
                break;
            case 'shortname':
                str = emojione.toShort(str);
        }
        return str;
    }
    function calcButtonPosition() {
        var self = this,
            offset = self.editor[0].offsetWidth - self.editor[0].clientWidth,
            current = parseInt(self.button.css('marginRight'));
        if (current !== offset) {
            self.button.css({marginRight: offset});
            if (self.floatingPicker) {
                self.picker.css({right: parseInt(self.picker.css('right')) - current + offset});
            }
        }
    }
    function lazyLoading() {
        var self = this;
        if (!self.sprite && self.lasyEmoji[0] && self.lasyEmoji.eq(0).is(".lazy-emoji")) {
            var pickerTop = self.picker.offset().top,
                pickerBottom = pickerTop + self.picker.height() + 20;

            self.lasyEmoji.each(function() {
                var e = $(this), top = e.offset().top;

                if (top > pickerTop && top < pickerBottom) {
                    e.attr("src", e.data("src")).removeClass("lazy-emoji");
                }

                if (top > pickerBottom) {
                    return false;
                }
            });
            self.lasyEmoji = self.lasyEmoji.filter(".lazy-emoji");
        }
    };
    function selector (prefix, skip_dot) {
        return (skip_dot ? '' : '.') + css_class + (prefix ? ("-" + prefix) : "");
    }
    function div(prefix) {
        var parent = $('<div/>', isObject(prefix) ? prefix : {"class" : selector(prefix, true)});
        $.each(slice.call(arguments).slice(1), function(i, child) {
            if ($.isFunction(child)) {
                child = child.call(parent);
            }
            if (child) {
                $(child).appendTo(parent);
            }
        });
        return parent;
    }
    function getRecent () {
        return localStorage.getItem("recent_emojis") || "";
    }
    function updateRecent(self, show) {
        var emojis = getRecent();
        if (!self.recent || self.recent !== emojis || show) {
            if (emojis.length) {
                var skinnable = self.scrollArea.is(".skinnable"),
                    scrollTop, height;

                if (!skinnable) {
                    scrollTop = self.scrollArea.scrollTop();
                    if (show) {
                        self.recentCategory.show();
                    }
                    height = self.recentCategory.is(":visible") ? self.recentCategory.height() : 0;
                }

                var items = shortnameTo(emojis, self.emojiBtnTemplate, true).split('|').join('');
                self.recentCategory.children(".emojibtn").remove();
                $(items).insertAfter(self.recentCategory.children(".youzify-emojionearea-category-title"));


                self.recentCategory.children(".emojibtn").on("click", function() {
                    self.trigger("emojibtn.click", $(this));
                });

                self.recentFilter.show();

                if (!skinnable) {
                    self.recentCategory.show();

                    var height2 = self.recentCategory.height();

                    if (height !== height2) {
                        self.scrollArea.scrollTop(scrollTop + height2 - height);
                    }
                }
            } else {
                if (self.recentFilter.hasClass("active")) {
                    self.recentFilter.removeClass("active").next().addClass("active");
                }
                self.recentCategory.hide();
                self.recentFilter.hide();
            }
            self.recent = emojis;
        }
    };
    function setRecent(self, emoji) {
        var recent = getRecent();
        var emojis = recent.split("|");

        var index = emojis.indexOf(emoji);
        if (index !== -1) {
            emojis.splice(index, 1);
        }
        emojis.unshift(emoji);

        if (emojis.length > 9) {
            emojis.pop();
        }

        localStorage.setItem("recent_emojis", emojis.join("|"));

        updateRecent(self);
    };
// see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
    function supportsLocalStorage () {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }
    function init(self, source, options) {
        //calcElapsedTime('init', function() {
        self.options = options = getOptions(options);
        self.sprite = options.sprite && emojioneSupportMode < 3;
        self.inline = options.inline === null ? source.is("INPUT") : options.inline;
        self.shortnames = options.shortnames;
        self.saveEmojisAs = options.saveEmojisAs;
        self.standalone = options.standalone;
        self.emojiTemplate = '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="' + blankImg + '"/>' : 'emoji" src="{img}"/>');
        self.emojiTemplateAlt = self.sprite ? '<i class="emojione-{uni}"/>' : '<img class="emojioneemoji" src="{img}"/>';
        self.emojiBtnTemplate = '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}">' + self.emojiTemplateAlt + '</i>';
        self.recentEmojis = options.recentEmojis && supportsLocalStorage();

        var pickerPosition = options.pickerPosition;
        self.floatingPicker = pickerPosition === 'top' || pickerPosition === 'bottom';
        self.source = source;

        if (source.is(":disabled") || source.is(".disabled")) {
            self.disable();
        }

        var sourceValFunc = source.is("TEXTAREA") || source.is("INPUT") ? "val" : "text",
            editor, button, picker, filters, filtersBtns, searchPanel, emojisList, categories, categoryBlocks, scrollArea,
            tones = div('tones',
                options.tones ?
                    function() {
                        this.addClass(selector('tones-' + options.tonesStyle, true));
                        for (var i = 0; i <= 5; i++) {
                            this.append($("<i/>", {
                                "class": "btn-tone btn-tone-" + i + (!i ? " active" : ""),
                                "data-skin": i,
                                role: "button"
                            }));
                        }
                    } : null
            ),
            app = div({
                "class" : css_class + ((self.standalone) ? " " + css_class + "-standalone " : " ") + (source.attr("class") || ""),
                role: "application"
            },
            editor = self.editor = div("editor").attr({
                contenteditable: (self.standalone) ? false : true,
                placeholder: options.placeholder || source.data("placeholder") || source.attr("placeholder") || "",
                tabindex: 0
            }),
            button = self.button = div('button',
                div('button-open'),
                div('button-close')
            ).attr('title', options.buttonTitle),
            picker = self.picker = div('picker',
                div('wrapper',
                    filters = div('filters'),
                    (options.search ?
                        searchPanel = div('search-panel',
                            div('search',
                                options.search ?
                                function() {
                                    self.search = $("<input/>", {
                                        "placeholder": options.searchPlaceholder || "",
                                        "type": "text",
                                        "class": "search"
                                    });
                                    this.append(self.search);
                                } : null
                            ),
                            tones
                        ) : null
                    ),
                    scrollArea = div('scroll-area',
                        options.tones && !options.search ? div('tones-panel',
                            tones
                        ) : null,
                        emojisList = div('emojis-list')
                    )
                )
            ).addClass(selector('picker-position-' + options.pickerPosition, true))
             .addClass(selector('filters-position-' + options.filtersPosition, true))
             .addClass(selector('search-position-' + options.searchPosition, true))
             .addClass('hidden')
        );

        if (options.search) {
            searchPanel.addClass(selector('with-search', true));
        }

        self.searchSel = null;

        editor.data(source.data());

        $.each(options.attributes, function(attr, value) {
            editor.attr(attr, value);
        });

        var mainBlock = div('category-block').attr({"data-tone": 0}).prependTo(emojisList);

        $.each(options.filters, function(filter, params) {
            var skin = 0;
            if (filter === 'recent' && !self.recentEmojis) {
                return;
            }
            if (filter !== 'tones') {
                $("<i/>", {
                    "class": selector("filter", true) + " " + selector("filter-" + filter, true),
                    "data-filter": filter,
                    title: params.title
                })
                .wrapInner(shortnameTo(params.icon, self.emojiTemplateAlt))
                .appendTo(filters);
            } else if (options.tones) {
                skin = 5;
            } else {
                return;
            }

            do {
                var category,
                    items = params.emoji.replace(/[\s,;]+/g, '|');

                if (skin === 0) {
                    category = div('category').attr({
                        name: filter,
                        "data-tone": skin
                    }).appendTo(mainBlock);
                } else {
                    category = div('category-block').attr({
                        name: filter,
                        "data-tone": skin
                    }).appendTo(emojisList);
                }

                if (skin > 0) {
                    category.hide();
                    items = items.split('|').join('_tone' + skin + '|') + '_tone' + skin;
                }

                if (filter === 'recent') {
                    items = getRecent();
                }

                items = shortnameTo(items,
                    self.sprite ?
                        '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}"><i class="emojione-{uni}"></i></i>' :
                        '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}"><img class="emojioneemoji lazy-emoji" data-src="{img}"/></i>',
                    true).split('|').join('');

                category.html(items);
                $('<div class="youzify-emojionearea-category-title"/>').text(params.title).prependTo(category);
            } while (--skin > 0);
        });

        options.filters = null;
        if (!self.sprite) {
            self.lasyEmoji = emojisList.find(".lazy-emoji");
        }

        filtersBtns = filters.find(selector("filter"));
        filtersBtns.eq(0).addClass("active");
        categoryBlocks = emojisList.find(selector("category-block"))
        categories = emojisList.find(selector("category"))

        self.recentFilter = filtersBtns.filter('[data-filter="recent"]');
        self.recentCategory = categories.filter("[name=recent]");

        self.scrollArea = scrollArea;

        if (options.container) {
            $(options.container).wrapInner(app);
        } else {
            app.insertAfter(source);
        }

        if (options.hideSource) {
            source.hide();
        }

        self.setText(source[sourceValFunc]());
        source[sourceValFunc](self.getText());
        calcButtonPosition.apply(self);

        // if in standalone mode and no value is set, initialise with a placeholder
        if (self.standalone && !self.getText().length) {
            var placeholder = $(source).data("emoji-placeholder") || options.emojiPlaceholder;
            self.setText(placeholder);
            editor.addClass("has-placeholder");
        }

        // attach() must be called before any .on() methods !!!
        // 1) attach() stores events into possibleEvents{},
        // 2) .on() calls bindEvent() and stores handlers into eventStorage{},
        // 3) bindEvent() finds events in possibleEvents{} and bind founded via jQuery.on()
        // 4) attached events via jQuery.on() calls trigger()
        // 5) trigger() calls handlers stored into eventStorage{}

        attach(self, emojisList.find(".emojibtn"), {click: "emojibtn.click"});
        attach(self, window, {resize: "!resize"});
        attach(self, tones.children(), {click: "tone.click"});
        attach(self, [picker, button], {mousedown: "!mousedown"}, editor);
        attach(self, button, {click: "button.click"});
        attach(self, editor, {paste :"!paste"}, editor);
        attach(self, editor, ["focus", "blur"], function() { return self.stayFocused ? false : editor; } );
        attach(self, picker, {mousedown: "picker.mousedown", mouseup: "picker.mouseup", click: "picker.click",
            keyup: "picker.keyup", keydown: "picker.keydown", keypress: "picker.keypress"});
        attach(self, editor, ["mousedown", "mouseup", "click", "keyup", "keydown", "keypress"]);
        attach(self, picker.find(".youzify-emojionearea-filter"), {click: "filter.click"});
        attach(self, source, {change: "source.change"});

        if (options.search) {
            attach(self, self.search, {keyup: "search.keypress", focus: "search.focus", blur: "search.blur"});
        }

        var noListenScroll = false;
        scrollArea.on('scroll', function () {
            if (!noListenScroll) {
                lazyLoading.call(self);
                if (scrollArea.is(":not(.skinnable)")) {
                    var item = categories.eq(0), scrollTop = scrollArea.offset().top;
                    categories.each(function (i, e) {
                        if ($(e).offset().top - scrollTop >= 10) {
                            return false;
                        }
                        item = $(e);
                    });
                    var filter = filtersBtns.filter('[data-filter="' + item.attr("name") + '"]');
                    if (filter[0] && !filter.is(".active")) {
                        filtersBtns.removeClass("active");
                        filter.addClass("active");
                    }
                }
            }
        });

        self.on("@filter.click", function(filter) {
            var isActive = filter.is(".active");
            if (scrollArea.is(".skinnable")) {
                if (isActive) return;
                tones.children().eq(0).click();
            }
            noListenScroll = true;
            if (!isActive) {
                filtersBtns.filter(".active").removeClass("active");
                filter.addClass("active");
            }
            var headerOffset = categories.filter('[name="' + filter.data('filter') + '"]').offset().top,
                scroll = scrollArea.scrollTop(),
                offsetTop = scrollArea.offset().top;

            scrollArea.stop().animate({
                scrollTop: headerOffset + scroll - offsetTop - 2
            }, 200, 'swing', function () {
                lazyLoading.call(self);
                noListenScroll = false;
            });
        })

        .on("@picker.show", function() {
            if (self.recentEmojis) {
                updateRecent(self);
            }
            lazyLoading.call(self);
        })

        .on("@tone.click", function(tone) {
            tones.children().removeClass("active");
            var skin = tone.addClass("active").data("skin");
            if (skin) {
                scrollArea.addClass("skinnable");
                categoryBlocks.hide().filter("[data-tone=" + skin + "]").show();
                filtersBtns.removeClass("active");//.not('[data-filter="recent"]').eq(0).addClass("active");
            } else {
                scrollArea.removeClass("skinnable");
                categoryBlocks.hide().filter("[data-tone=0]").show();
                filtersBtns.eq(0).click();
            }
            lazyLoading.call(self);
            if (options.search) {
                self.trigger('search.keypress');
            }
        })

        .on("@button.click", function(button) {
            if (button.is(".active")) {
                self.hidePicker();
            } else {
                self.showPicker();
                self.searchSel = null;
            }
        })

        .on("@!paste", function(editor, event) {

            var pasteText = function(text) {
                var caretID = "caret-" + (new Date()).getTime();
                var html = htmlFromText(text, self);
                pasteHtmlAtCaret(html);
                pasteHtmlAtCaret('<i id="' + caretID +'"></i>');
                editor.scrollTop(editorScrollTop);
                var caret = $("#" + caretID),
                    top = caret.offset().top - editor.offset().top,
                    height = editor.height();
                if (editorScrollTop + top >= height || editorScrollTop > top) {
                    editor.scrollTop(editorScrollTop + top - 2 * height/3);
                }
                caret.remove();
                self.stayFocused = false;
                calcButtonPosition.apply(self);
                trigger(self, 'paste', [editor, text, html]);
            };

            if (event.originalEvent.clipboardData) {
                var text = event.originalEvent.clipboardData.getData('text/plain');
                pasteText(text);

                if (event.preventDefault){
                    event.preventDefault();
                } else {
                    event.stop();
                }

                event.returnValue = false;
                event.stopPropagation();
                return false;
            }

            self.stayFocused = true;
            // insert invisible character for fix caret position
            pasteHtmlAtCaret('<span>' + invisibleChar + '</span>');

            var sel = saveSelection(editor[0]),
                editorScrollTop = editor.scrollTop(),
                clipboard = $("<div/>", {contenteditable: true})
                    .css({position: "fixed", left: "-999px", width: "1px", height: "1px", top: "20px", overflow: "hidden"})
                    .appendTo($("BODY"))
                    .focus();

            window.setTimeout(function() {
                editor.focus();
                restoreSelection(editor[0], sel);
                var text = textFromHtml(clipboard.html().replace(/\r\n|\n|\r/g, '<br>'), self);
                clipboard.remove();
                pasteText(text);
            }, 200);
        })

        .on("@emojibtn.click", function(emojibtn) {
            editor.removeClass("has-placeholder");

            if (self.searchSel !== null) {
                editor.focus();
                restoreSelection(editor[0], self.searchSel);
                self.searchSel = null;
            }

            if (self.standalone) {
                editor.html(shortnameTo(emojibtn.data("name"), self.emojiTemplate));
                self.trigger("blur");
            } else {
                saveSelection(editor[0]);
                pasteHtmlAtCaret(shortnameTo(emojibtn.data("name"), self.emojiTemplate));
            }

            if (self.recentEmojis) {
                setRecent(self, emojibtn.data("name"));
            }

            // self.search.val('').trigger("change");
            self.trigger('search.keypress');
        })

        .on("@!resize @keyup @emojibtn.click", calcButtonPosition)

        .on("@!mousedown", function(editor, event) {
            if ($(event.target).hasClass('search')) {
                // Allow search clicks
                self.stayFocused = true;
                if (self.searchSel === null) {
                    self.searchSel = saveSelection(editor[0]);
                }
            } else {
                if (!app.is(".focused")) {
                    editor.trigger("focus");
                }
                event.preventDefault();
            }
            return false;
        })

        .on("@change", function() {
            var html = self.editor.html().replace(/<\/?(?:div|span|p)[^>]*>/ig, '');
            // clear input: chrome adds <br> when contenteditable is empty
            if (!html.length || /^<br[^>]*>$/i.test(html)) {
                self.editor.html(self.content = '');
            }
            source[sourceValFunc](self.getText());
        })

        .on("@source.change", function() {
            // self.setText(source[sourceValFunc]());
            trigger('change');
        })

        .on("@focus", function() {
            app.addClass("focused");
        })

        .on("@blur", function() {
            app.removeClass("focused");

            if (options.hidePickerOnBlur) {
                self.hidePicker();
            }

            var content = self.editor.html();
            if (self.content !== content) {
                self.content = content;
                trigger(self, 'change', [self.editor]);
                source.trigger("blur").trigger("change");
            } else {
                source.trigger("blur");
            }

            if (options.search) {
                self.search.val('');
                self.trigger('search.keypress', true);
            }
        });

        if (options.search) {
            self.on("@search.focus", function() {
                self.stayFocused = true;
                self.search.addClass("focused");
            })

            .on("@search.keypress", function(hide) {
                var filterBtns = picker.find(".youzify-emojionearea-filter");
                var activeTone = (options.tones ? tones.find("i.active").data("skin") : 0);
                var term = self.search.val().replace( / /g, "_" ).replace(/"/g, "\\\"");

                if (term && term.length) {
                    if (self.recentFilter.hasClass("active")) {
                        self.recentFilter.removeClass("active").next().addClass("active");
                    }

                    self.recentCategory.hide();
                    self.recentFilter.hide();

                    categoryBlocks.each(function() {
                        var matchEmojis = function(category, activeTone) {
                            var $matched = category.find('.emojibtn[data-name*="' + term + '"]');
                            if ($matched.length === 0) {
                                if (category.data('tone') === activeTone) {
                                    category.hide();
                                }
                                filterBtns.filter('[data-filter="' + category.attr('name') + '"]').hide();
                            } else {
                                var $notMatched = category.find('.emojibtn:not([data-name*="' + term + '"])');
                                $notMatched.hide();

                                $matched.show();

                                if (category.data('tone') === activeTone) {
                                    category.show();
                                }

                                filterBtns.filter('[data-filter="' + category.attr('name') + '"]').show();
                            }
                        }

                        var $block = $(this);
                        if ($block.data('tone') === 0) {
                            categories.filter(':not([name="recent"])').each(function() {
                                matchEmojis($(this), 0);
                            })
                        } else {
                            matchEmojis($block, activeTone);
                        }
                    });
                    if (!noListenScroll) {
                        scrollArea.trigger('scroll');
                    } else {
                        lazyLoading.call(self);
                    }
                } else {
                    updateRecent(self, true);
                    categoryBlocks.filter('[data-tone="' + tones.find("i.active").data("skin") + '"]:not([name="recent"])').show();
                    $('.emojibtn', categoryBlocks).show();
                    filterBtns.show();
                    lazyLoading.call(self);
                }
            })

            .on("@search.blur", function() {
                self.stayFocused = false;
                self.search.removeClass("focused");
                self.trigger("blur");
            });
        }

        if (options.shortcuts) {
            self.on("@keydown", function(_, e) {
                if (!e.ctrlKey) {
                    if (e.which == 9) {
                        e.preventDefault();
                        button.click();
                    }
                    else if (e.which == 27) {
                        e.preventDefault();
                        if (button.is(".active")) {
                            self.hidePicker();
                        }
                    }
                }
            });
        }

        if (isObject(options.events) && !$.isEmptyObject(options.events)) {
            $.each(options.events, function(event, handler) {
                self.on(event.replace(/_/g, '.'), handler);
            });
        }

        if (options.autocomplete) {
            var autocomplete = function() {
                var textcompleteOptions = {
                    maxCount: options.textcomplete.maxCount,
                    placement: options.textcomplete.placement
                };

                if (options.shortcuts) {
                    textcompleteOptions.onKeydown = function (e, commands) {
                        if (!e.ctrlKey && e.which == 13) {
                            return commands.KEY_ENTER;
                        }
                    };
                }

                var map = $.map(emojione.emojioneList, function (_, emoji) {
                    return !options.autocompleteTones ? /_tone[12345]/.test(emoji) ? null : emoji : emoji;
                });
                map.sort();
                editor.textcomplete([
                    {
                        id: css_class,
                        match: /\B(:[\-+\w]*)$/,
                        search: function (term, callback) {
                            callback($.map(map, function (emoji) {
                                return emoji.indexOf(term) === 0 ? emoji : null;
                            }));
                        },
                        template: function (value) {
                            return shortnameTo(value, self.emojiTemplate) + " " + value.replace(/:/g, '');
                        },
                        replace: function (value) {
                            return shortnameTo(value, self.emojiTemplate);
                        },
                        cache: true,
                        index: 1
                    }
                ], textcompleteOptions);

                if (options.textcomplete.placement) {
                    // Enable correct positioning for textcomplete
                    if ($(editor.data('textComplete').option.appendTo).css("position") == "static") {
                        $(editor.data('textComplete').option.appendTo).css("position", "relative");
                    }
                }
            };

            var initAutocomplete = function() {
                if (self.disabled) {
                    var enable = function () {
                        self.off('enabled', enable);
                        autocomplete();
                    };
                    self.on('enabled', enable);
                } else {
                    autocomplete();
                }
            }

            if ($.fn.textcomplete) {
                initAutocomplete();
            } else {
                $.ajax({
                    url: "https://cdn.rawgit.com/yuku-t/jquery-textcomplete/v1.3.4/dist/jquery.textcomplete.js",
                    dataType: "script",
                    cache: true,
                    success: initAutocomplete
                });
            }
        }

        if (self.inline) {
            app.addClass(selector('inline', true));
            self.on("@keydown", function(_, e) {
                if (e.which == 13) {
                    e.preventDefault();
                }
            });
        }

        if (/firefox/i.test(navigator.userAgent)) {
            // disabling resize images on Firefox
            document.execCommand("enableObjectResizing", false, false);
        }

        self.isReady = true;
        self.trigger("onLoad", editor);
        self.trigger("ready", editor);
        //}, self.id === 1); // calcElapsedTime()
    };
    var cdn = {
        defaultBase: "https://cdnjs.cloudflare.com/ajax/libs/emojione/",
        defaultBase3: "https://cdn.jsdelivr.net/",
        base: null,
        isLoading: false
    };
    function loadEmojione(options) {
        var emojioneVersion = getEmojioneVersion()
        options = getOptions(options);

        if (!cdn.isLoading) {
            if (!emojione || getSupportMode(detectVersion(emojione)) < 2) {
                cdn.isLoading = true;
                var emojioneJsCdnUrlBase;
                if (getSupportMode(emojioneVersion) > 5) {
                    emojioneJsCdnUrlBase = cdn.defaultBase3 + "npm/emojione@" + emojioneVersion;
                } else if (getSupportMode(emojioneVersion) > 4) {
                    emojioneJsCdnUrlBase = cdn.defaultBase3 + "emojione/" + emojioneVersion;
                } else {
                    emojioneJsCdnUrlBase = cdn.defaultBase + "/" + emojioneVersion;
                }

                $.ajax({
                    url: emojioneJsCdnUrlBase + "/lib/js/emojione.min.js",
                    dataType: "script",
                    cache: true,
                    success: function () {
                        emojione = window.emojione;
                        emojioneVersion = detectVersion(emojione);
                        emojioneSupportMode = getSupportMode(emojioneVersion);
                        var sprite;
                        if (emojioneSupportMode > 4) {
                            cdn.base = cdn.defaultBase3 + "emojione/assets/" + emojioneVersion;
                            sprite = cdn.base + "/sprites/emojione-sprite-" + emojione.emojiSize + ".css";
                        } else {
                            cdn.base = cdn.defaultBase + emojioneVersion + "/assets";
                            sprite = cdn.base + "/sprites/emojione.sprites.css";
                        }
                        if (options.sprite) {
                            if (document.createStyleSheet) {
                                document.createStyleSheet(sprite);
                            } else {
                                $('<link/>', {rel: 'stylesheet', href: sprite}).appendTo('head');
                            }
                        }
                        while (readyCallbacks.length) {
                            readyCallbacks.shift().call();
                        }
                        cdn.isLoading = false;
                        $( '.youzify-load-emojis i' ).remove();
                        setCurrentCursorPosition( $( '.youzify-load-emojis.loading' ).closest( 'form' ).find( '.youzify-emojionearea-editor' ).get( 0 ),  $( '.youzify-load-emojis.loading' ).attr('data-cursor') );
                        $( '.youzify-load-emojis.loading' ).closest( 'form' ).find( '.youzify-emojionearea-button-open' ).click();
                        $( '.youzify-load-emojis' ).remove();

                    }
                });
            } else {
                emojioneVersion = detectVersion(emojione);
                emojioneSupportMode = getSupportMode(emojioneVersion);
                if (emojioneSupportMode > 4) {
                    cdn.base = cdn.defaultBase3 + "emojione/assets/" + emojioneVersion;
                } else {
                    cdn.base = cdn.defaultBase + emojioneVersion + "/assets";
                }
            }
        }

        emojioneReady(function() {
            var emojiSize = "";
            if (options.useInternalCDN) {
                if (emojioneSupportMode > 4) emojiSize = emojione.emojiSize + "/";

                emojione.imagePathPNG = cdn.base + "/png/" + emojiSize;
                emojione.imagePathSVG = cdn.base + "/svg/" + emojiSize;
                emojione.imagePathSVGSprites = cdn.base + "/sprites/emojione.sprites.svg";
                emojione.imageType = options.imageType;
            }
            if (getSupportMode(emojioneVersion) > 4) {
                uniRegexp = emojione.regUnicode;
                emojione.imageType = options.imageType || "png";
            } else {
                uniRegexp = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + emojione.unicodeRegexp + ")", "gi");
            }
        });
    };
    var EmojioneArea = function(element, options) {
        var self = this;
        loadEmojione(options);
        eventStorage[self.id = ++unique] = {};
        possibleEvents[self.id] = {};
        emojioneReady(function() {
            init(self, element, options);
        });
    };

    function bindEvent(self, event) {
        event = event.replace(/^@/, '');
        var id = self.id;
        if (possibleEvents[id][event]) {
            $.each(possibleEvents[id][event], function(i, ev) {
                // ev[0] = element
                // ev[1] = event
                // ev[2] = target
                $.each($.isArray(ev[0]) ? ev[0] : [ev[0]], function(i, el) {
                    $(el).on(ev[1], function() {
                        var args = slice.call(arguments),
                            target = $.isFunction(ev[2]) ? ev[2].apply(self, [event].concat(args)) : ev[2];
                        if (target) {
                            trigger(self, event, [target].concat(args));
                        }
                    });
                });
            });
            possibleEvents[id][event] = null;
        }
    }

    EmojioneArea.prototype.on = function(events, handler) {
        if (events && $.isFunction(handler)) {
            var self = this;
            $.each(events.toLowerCase().split(' '), function(i, event) {
                bindEvent(self, event);
                (eventStorage[self.id][event] || (eventStorage[self.id][event] = [])).push(handler);
            });
        }
        return this;
    };

    EmojioneArea.prototype.off = function(events, handler) {
        if (events) {
            var id = this.id;
            $.each(events.toLowerCase().replace(/_/g, '.').split(' '), function(i, event) {
                if (eventStorage[id][event] && !/^@/.test(event)) {
                    if (handler) {
                        $.each(eventStorage[id][event], function(j, fn) {
                            if (fn === handler) {
                                eventStorage[id][event].splice(j, 1);
                            }
                        });
                    } else {
                        eventStorage[id][event] = [];
                    }
                }
            });
        }
        return this;
    };

    EmojioneArea.prototype.trigger = function() {
        var args = slice.call(arguments),
            call_args = [this].concat(args.slice(0,1));
        call_args.push(args.slice(1));
        return trigger.apply(this, call_args);
    };

    EmojioneArea.prototype.setFocus = function () {
        var self = this;
        emojioneReady(function () {
            self.editor.focus();
        });
        return self;
    };

    EmojioneArea.prototype.setText = function (str) {
        var self = this;
        emojioneReady(function () {
            self.editor.html(htmlFromText(str, self));
            self.content = self.editor.html();
            trigger(self, 'change', [self.editor]);
            calcButtonPosition.apply(self);
        });
        return self;
    }

    EmojioneArea.prototype.getText = function() {
        return textFromHtml(this.editor.html(), this);
    }

    EmojioneArea.prototype.showPicker = function () {
        var self = this;
        if (self._sh_timer) {
            window.clearTimeout(self._sh_timer);
        }
        self.picker.removeClass("hidden");
        self._sh_timer =  window.setTimeout(function() {
            self.button.addClass("active");
        }, 50);
        trigger(self, "picker.show", [self.picker]);
        return self;
    }

    EmojioneArea.prototype.hidePicker = function () {
        var self = this;
        if (self._sh_timer) {
            window.clearTimeout(self._sh_timer);
        }
        self.button.removeClass("active");
        self._sh_timer =  window.setTimeout(function() {
            self.picker.addClass("hidden");
        }, 500);
        trigger(self, "picker.hide", [self.picker]);
        return self;
    }

    EmojioneArea.prototype.enable = function () {
        var self = this;
        var next = function () {
            self.disabled = false;
            self.editor.prop('contenteditable', true);
            self.button.show();
            var editor = self[(self.standalone) ? "button" : "editor"];
            editor.parent().removeClass('youzify-emojionearea-disable');
            trigger(self, 'enabled', [editor]);
        };
        self.isReady ? next() : self.on("ready", next);
        return self;
    }

    EmojioneArea.prototype.disable = function () {
        var self = this;
        self.disabled = true;
        var next = function () {
            self.editor.prop('contenteditable', false);
            self.hidePicker();
            self.button.hide();
            var editor = self[(self.standalone) ? "button" : "editor"];
            editor.parent().addClass('youzify-emojionearea-disable');
            trigger(self, 'disabled', [editor]);
        };
        self.isReady ? next() : self.on("ready", next);
        return self;
    }

    $.fn.Youzify_emojioneArea = function(options) {
        return this.each(function() {
            if (!!this.Youzify_emojioneArea) return this.Youzify_emojioneArea;
            $.data(this, 'Youzify_emojioneArea', this.Youzify_emojioneArea = new EmojioneArea($(this), options));
            return this.Youzify_emojioneArea;
        });
    };

    $.fn.Youzify_emojioneArea.defaults = getDefaultOptions();

    $.fn.Youzify_emojioneAreaText = function(options) {
        options = getOptions(options);

        var self = this, pseudoSelf = {
            shortnames: (options && typeof options.shortnames !== 'undefined' ? options.shortnames : true),
            emojiTemplate: '<img alt="{alt}" class="emojione' + (options && options.sprite && emojioneSupportMode < 3 ? '-{uni}" src="' + blankImg : 'emoji" src="{img}') + '"/>'
        };

        loadEmojione(options);
        emojioneReady(function() {
            self.each(function() {
                var $this = $(this);
                if (!$this.hasClass('youzify-emojionearea-text')) {
                    $this.addClass('youzify-emojionearea-text').html(htmlFromText(($this.is('TEXTAREA') || $this.is('INPUT') ? $this.val() : $this.text()), pseudoSelf));
                }
                return $this;
            });
        });

        return this;
    };

}, window ) );
( function( $ ) {

  'use strict';

  $( document ).ready( function() {

    if ( jQuery().Youzify_emojioneArea ) {
        // Youzify_Emoji.posts_visibility == 'on'
        if ( $( '.youzify-load-posts-emojis' )[0] || $('#youzify-edit-activity-form')[0] ) {
        $.youzify_init_wall_textarea_emojionearea = function( element ) {
            return element.Youzify_emojioneArea( {
                pickerPosition: 'bottom',
                autocomplete: true,
                saveEmojisAs : 'image',
                events: {
                ready: function () {
                  this.editor.textcomplete([{
                      id: 'youzify_mentions',
                      match: /\B@([\-\d\w]*)$/,
                      search: function ( term, callback ) {
                          var mentions = bp.mentions.users;
                          callback( $.map(mentions, function ( mention ) {
                          return mention.ID.indexOf( term ) === 0 || mention.name.indexOf( term ) === 0 ? mention : null;
                      }));
                      },
                      template: function ( mention ) {
                          return '<img src="' + mention.image + '" /><span class="username">@' + mention.ID + '</span><small>' +mention.name+ '</small>';
                      },
                      replace: function ( mention ) {
                          return '@' + mention.ID + '&nbsp;';
                      },
                      cache: true,
                      index: 1
                   }]);
                }
              }
            }
          );
        }
        var el = $.youzify_init_wall_textarea_emojionearea( $( '.youzify-wall-textarea' ) );
      }

        // Activate Emojis in Posts Comments.Youzify_Emoji.comments_visibility == 'on'
	    if ( $( '.youzify-comments-emojis' )[0]  ) {

        // Init Comments Emoji Function
        $.youzify_init_comments_emoji = function() {
          var youzify_emoji_textarea = $( '.youzify .ac-form textarea' ).Youzify_emojioneArea( {
                pickerPosition: 'bottom',
                 saveEmojisAs : 'image',
                autocomplete: true,
                events: {
                ready: function () {
                  this.editor.textcomplete([{
                      id: 'youzify_mentions',
                      match: /\B@([\-\d\w]*)$/,
                      search: function ( term, callback ) {
                          var mentions = bp.mentions.users;
                          callback( $.map(mentions, function ( mention ) {
                          return mention.ID.indexOf( term ) === 0 || mention.name.indexOf( term ) === 0 ? mention : null;
                      }));
                      },
                      template: function ( mention ) {
                          return '<img src="' + mention.image + '" /><span class="username">@' + mention.ID + '</span><small>' +mention.name+ '</small>';
                      },
                      replace: function ( mention ) {
                          return '@' + mention.ID + '&nbsp;';
                      },
                      cache: true,
                      index: 1
                   }]);
                },
                keypress: function( editor, e ) {
                    if ( e.which == 13 && !e.shiftKey ) {
                        e.preventDefault();
                        this.trigger( 'change' );
                        $( editor ).closest( 'form' ).find( '.youzify-send-comment' ).click();
                    }
                }
              }
            });
          return youzify_emoji_textarea;
        }
          var comment_el = $.youzify_init_comments_emoji();

        // Init Vars.
        // var comment_el = $.youzify_init_comments_emoji();

          // Reset Reply Form after submit.
          $( 'body' ).on( 'append','.activity-comments ul', function(e){
            if ( e.target.localName == 'li' || e.target.localName == 'ul' ) {

              // Clean Textarea.
              if ( $( this ).parent().find( '.ac-form textarea' ).get(0) ) {
                $( this ).parent().find( '.ac-form textarea' ).get(0).Youzify_emojioneArea.setText( '' );
              }

            }
          });

          // Reload Emoji Comments After Loading More Posts.
          $( document ).ajaxComplete(function() {
            $( '.youzify-load-emojis' ).remove();
            $.youzify_init_comments_emoji();
          });

      }

      // Activate Emojis in Messages.
      if ( $( '.youzify-load-messages-emojis' )[0] ) {
        // Enable Emoji.
        var message_el = $( '#send-reply textarea,.youzify-msg-form-item #message_content' )
        .Youzify_emojioneArea( { pickerPosition: 'bottom', saveEmojisAs : 'image' } );
        // Override Val Function.
        var originalVal = this.originalVal = $.fn.val;
        $.fn.val = function(value) {
            if ( typeof value == 'undefined' ) {
                return originalVal.call( this );
            } else {
                if ( $( this ).attr( 'id' ) == 'message_content' && value == '' ) {
                  $( '#send-reply .youzify-emojionearea-editor' ).text( '' );
                }
                return originalVal.call( this, value );
            }
        };
      }


    }

    /**
     * Modal.
     */
    $( 'div.activity' ).on( 'click', 'a.acomment-reply' , function( e ) {
        var li = $( this ).closest( 'li.activity-item' ), comment_id = li.attr( 'id' ).substr( 9, li.attr( 'id' ).length );
        setTimeout(function(){
            $( '#ac-form-' + comment_id ).find( '.youzify-emojionearea-editor' ).focus();
        }, 200);
    });

  });

})( jQuery );