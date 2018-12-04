define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.BaselineBuildHax=void 0;var BaselineBuildHax=function(_HTMLElement){babelHelpers.inherits(BaselineBuildHax,_HTMLElement);babelHelpers.createClass(BaselineBuildHax,[{key:"html",get:function get(){return"\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"}}],[{key:"properties",get:function get(){return{}}},{key:"tag",get:function get(){return"baseline-build-hax"}}]);function BaselineBuildHax(){var _this,delayRender=0<arguments.length&&arguments[0]!==void 0?arguments[0]:!1;babelHelpers.classCallCheck(this,BaselineBuildHax);_this=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(BaselineBuildHax).call(this));_this.tag=BaselineBuildHax.tag;var obj=BaselineBuildHax.properties;for(var p in obj){if(obj.hasOwnProperty(p)){if(_this.hasAttribute(p)){_this[p]=_this.getAttribute(p)}else{_this.setAttribute(p,obj[p].value);_this[p]=obj[p].value}}}_this._queue=[];_this.template=document.createElement("template");_this.attachShadow({mode:"open"});if(!delayRender){_this.render()}return _this}babelHelpers.createClass(BaselineBuildHax,[{key:"connectedCallback",value:function connectedCallback(){if(window.ShadyCSS){window.ShadyCSS.styleElement(this)}if(this._queue.length){this._processQueue()}}},{key:"_copyAttribute",value:function _copyAttribute(name,to){var recipients=this.shadowRoot.querySelectorAll(to),value=this.getAttribute(name),fname=null==value?"removeAttribute":"setAttribute",_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _iterator=recipients[Symbol.iterator](),_step,node;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){node=_step.value;node[fname](name,value)}}catch(err){_didIteratorError=!0;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&null!=_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}},{key:"_queueAction",value:function _queueAction(action){this._queue.push(action)}},{key:"_processQueue",value:function _processQueue(){var _this2=this;this._queue.forEach(function(action){_this2["_".concat(action.type)](action.data)});this._queue=[]}},{key:"_setProperty",value:function _setProperty(_ref){var name=_ref.name,value=_ref.value;this[name]=value}},{key:"render",value:function render(){this.shadowRoot.innerHTML=null;this.template.innerHTML=this.html;if(window.ShadyCSS){window.ShadyCSS.prepareTemplate(this.template,this.tag)}this.shadowRoot.appendChild(this.template.content.cloneNode(!0))}}]);return BaselineBuildHax}(babelHelpers.wrapNativeSuper(HTMLElement));_exports.BaselineBuildHax=BaselineBuildHax;window.customElements.define(BaselineBuildHax.tag,BaselineBuildHax)});