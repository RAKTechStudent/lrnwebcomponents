define(["exports","./node_modules/@polymer/polymer/polymer-legacy.js","./node_modules/@polymer/paper-card/paper-card.js","./node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js","./node_modules/@polymer/paper-input/paper-input.js","./node_modules/@polymer/iron-input/iron-input.js","./node_modules/@polymer/paper-spinner/paper-spinner.js","./node_modules/@polymer/paper-icon-button/paper-icon-button.js","./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","./node_modules/@lrnwebcomponents/schema-behaviors/schema-behaviors.js","./node_modules/pdfjs-dist/build/pdf.js","./node_modules/pdfjs-dist/build/pdf.worker.js","./lib/main.js"],function(_exports,_polymerLegacy,_paperCard,_appToolbar,_paperInput,_ironInput,_paperSpinner,_paperIconButton,_HAXWiring,_schemaBehaviors,_pdf,_pdfWorker,_main){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.PdfElement=void 0;function _templateObject_303078d0f71f11e8b8612d7bb77d32f9(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        height: 100%;\n      }\n\n      app-toolbar.pdf-toolbar {\n        --app-toolbar-background: #323639;\n      }\n\n      .pdf-viewer {\n        text-align: center;\n        border: 1px solid #4d4d4d;\n      }\n\n      .pdf-viewport-out {\n        overflow: auto;\n        background-color: #525659;\n        position: relative;\n        width: 100%;\n        height: 100%;\n      }\n\n      .pdf-viewport {\n        display: block;\n        position: relative;\n        border: 1px solid #eeeeee;\n        transition: all 200ms ease-in-out;\n        width: 100%;\n        height: 100%;\n      }\n\n      .sidebar {\n        background-color: gray;\n        float: left;\n        height: 0px;\n        overflow: scroll;\n        margin-left: -25%;\n        visibility: hidden;\n      }\n\n      .main {\n        margin-left: 0%;\n      }\n\n      .pageselector {\n        width: 3ch;\n        background-color: black;\n        font-size: 17px;\n        background-color: transparent;\n        border: 0px solid;\n      }\n\n      .pageselector:focus {\n        outline: none;\n      }\n\n      #input {\n        -webkit-margin-start: -3px;\n        color: #fff;\n        line-height: 18px;\n        padding: 3px;\n        text-align: end;\n      }\n\n      #input:focus,\n      #input:hover {\n        background-color: rgba(0, 0, 0, 0.5);\n        border-radius: 2px;\n      }\n\n      #slash {\n        padding: 0 3px;\n      }\n\n      paper-spinner {\n        position: absolute;\n        left: 50%;\n      }\n\n      .textLayer {\n        transition: all 200ms ease-in-out;\n      }\n\n      .positionRelative {\n        position: relative;\n      }\n    </style>\n\n    <paper-material elevation=\"{{elevation}}\">\n      <div class=\"card-content\" style=\"width: {{width}}px\">\n        <paper-card class=\"paperCard\" style=\"width: {{width}}px\">\n          <div class=\"pdf-viewer\">\n            <app-toolbar class=\"pdf-toolbar\">\n              <paper-icon-button\n                icon=\"menu\"\n                on-click=\"sideBar\"\n              ></paper-icon-button>\n              <paper-icon-button\n                icon=\"arrow-back\"\n                on-click=\"showPrev\"\n              ></paper-icon-button>\n              <input\n                class=\"pageselector\"\n                id=\"input\"\n                is=\"iron-input\"\n                value=\"{{currentPage}}\"\n                prevent-invalid-input=\"\"\n                allowed-pattern=\"\\d\"\n                on-change=\"pageNumSearch\"\n              />\n              <span id=\"slash\">/</span><span id=\"totalPages\"></span>\n              <paper-icon-button\n                icon=\"arrow-forward\"\n                on-click=\"showNext\"\n              ></paper-icon-button>\n              <span class=\"title\" hidden=\"{{!showFileName}}\">Testing</span>\n              <span class=\"title\" hidden=\"{{showFileName}}\"></span>\n              <span class=\"pageRendering\"></span>\n              <paper-icon-button\n                icon=\"zoom-in\"\n                on-click=\"zoomIn\"\n              ></paper-icon-button>\n              <paper-icon-button\n                icon=\"zoom-out\"\n                on-click=\"zoomOut\"\n              ></paper-icon-button>\n              <paper-icon-button\n                id=\"zoomIcon\"\n                icon=\"fullscreen\"\n                on-click=\"zoomFit\"\n              ></paper-icon-button>\n              <paper-icon-button\n                icon=\"file-download\"\n                hidden$=\"{{!downloadable}}\"\n                on-click=\"download\"\n              ></paper-icon-button>\n            </app-toolbar>\n            <div id=\"container\" class=\"sidebar\" style=\"width:25%\"></div>\n            <div id=\"main\">\n              <div id=\"test\" class=\"pdf-viewport-out\">\n                <canvas class=\"pdf-viewport\"></canvas>\n                <div\n                  id=\"text-layer\"\n                  class=\"textLayer\"\n                  hidden$=\"{{!enableTextSelection}}\"\n                ></div>\n              </div>\n              <paper-spinner\n                class=\"spinner\"\n                hidden$=\"{{!showSpinner}}\"\n              ></paper-spinner>\n            </div>\n          </div>\n        </paper-card>\n      </div>\n    </paper-material>\n  "],["\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        height: 100%;\n      }\n\n      app-toolbar.pdf-toolbar {\n        --app-toolbar-background: #323639;\n      }\n\n      .pdf-viewer {\n        text-align: center;\n        border: 1px solid #4d4d4d;\n      }\n\n      .pdf-viewport-out {\n        overflow: auto;\n        background-color: #525659;\n        position: relative;\n        width: 100%;\n        height: 100%;\n      }\n\n      .pdf-viewport {\n        display: block;\n        position: relative;\n        border: 1px solid #eeeeee;\n        transition: all 200ms ease-in-out;\n        width: 100%;\n        height: 100%;\n      }\n\n      .sidebar {\n        background-color: gray;\n        float: left;\n        height: 0px;\n        overflow: scroll;\n        margin-left: -25%;\n        visibility: hidden;\n      }\n\n      .main {\n        margin-left: 0%;\n      }\n\n      .pageselector {\n        width: 3ch;\n        background-color: black;\n        font-size: 17px;\n        background-color: transparent;\n        border: 0px solid;\n      }\n\n      .pageselector:focus {\n        outline: none;\n      }\n\n      #input {\n        -webkit-margin-start: -3px;\n        color: #fff;\n        line-height: 18px;\n        padding: 3px;\n        text-align: end;\n      }\n\n      #input:focus,\n      #input:hover {\n        background-color: rgba(0, 0, 0, 0.5);\n        border-radius: 2px;\n      }\n\n      #slash {\n        padding: 0 3px;\n      }\n\n      paper-spinner {\n        position: absolute;\n        left: 50%;\n      }\n\n      .textLayer {\n        transition: all 200ms ease-in-out;\n      }\n\n      .positionRelative {\n        position: relative;\n      }\n    </style>\n\n    <paper-material elevation=\"{{elevation}}\">\n      <div class=\"card-content\" style=\"width: {{width}}px\">\n        <paper-card class=\"paperCard\" style=\"width: {{width}}px\">\n          <div class=\"pdf-viewer\">\n            <app-toolbar class=\"pdf-toolbar\">\n              <paper-icon-button\n                icon=\"menu\"\n                on-click=\"sideBar\"\n              ></paper-icon-button>\n              <paper-icon-button\n                icon=\"arrow-back\"\n                on-click=\"showPrev\"\n              ></paper-icon-button>\n              <input\n                class=\"pageselector\"\n                id=\"input\"\n                is=\"iron-input\"\n                value=\"{{currentPage}}\"\n                prevent-invalid-input=\"\"\n                allowed-pattern=\"\\\\d\"\n                on-change=\"pageNumSearch\"\n              />\n              <span id=\"slash\">/</span><span id=\"totalPages\"></span>\n              <paper-icon-button\n                icon=\"arrow-forward\"\n                on-click=\"showNext\"\n              ></paper-icon-button>\n              <span class=\"title\" hidden=\"{{!showFileName}}\">Testing</span>\n              <span class=\"title\" hidden=\"{{showFileName}}\"></span>\n              <span class=\"pageRendering\"></span>\n              <paper-icon-button\n                icon=\"zoom-in\"\n                on-click=\"zoomIn\"\n              ></paper-icon-button>\n              <paper-icon-button\n                icon=\"zoom-out\"\n                on-click=\"zoomOut\"\n              ></paper-icon-button>\n              <paper-icon-button\n                id=\"zoomIcon\"\n                icon=\"fullscreen\"\n                on-click=\"zoomFit\"\n              ></paper-icon-button>\n              <paper-icon-button\n                icon=\"file-download\"\n                hidden\\$=\"{{!downloadable}}\"\n                on-click=\"download\"\n              ></paper-icon-button>\n            </app-toolbar>\n            <div id=\"container\" class=\"sidebar\" style=\"width:25%\"></div>\n            <div id=\"main\">\n              <div id=\"test\" class=\"pdf-viewport-out\">\n                <canvas class=\"pdf-viewport\"></canvas>\n                <div\n                  id=\"text-layer\"\n                  class=\"textLayer\"\n                  hidden\\$=\"{{!enableTextSelection}}\"\n                ></div>\n              </div>\n              <paper-spinner\n                class=\"spinner\"\n                hidden\\$=\"{{!showSpinner}}\"\n              ></paper-spinner>\n            </div>\n          </div>\n        </paper-card>\n      </div>\n    </paper-material>\n  "]);_templateObject_303078d0f71f11e8b8612d7bb77d32f9=function _templateObject_303078d0f71f11e8b8612d7bb77d32f9(){return data};return data}var PdfElement=(0,_polymerLegacy.Polymer)({_template:(0,_polymerLegacy.html)(_templateObject_303078d0f71f11e8b8612d7bb77d32f9()),is:"pdf-element",behaviors:[HAXBehaviors.PropertiesBehaviors,SchemaBehaviors.Schema],properties:{src:{type:String,reflectToAttribute:!0},elevation:{type:Number,value:1},downloadable:{type:Boolean,value:!1},showFileName:{type:Boolean,value:!1},showSpinner:{type:Boolean,value:!1},enableTextSelection:{type:Boolean,value:!1},fitWidth:{type:Boolean,value:!1},width:{type:Number,value:500}},attached:function attached(){this.src=this.getAttribute("src");this._initializeReader();if(this.src)this.instance.loadPDF();this._setFitWidth();var props={canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"PDF viewer",descrption:"This can nicely present a PDF in a standard inplace, cross browser way.",icon:"image:picture-as-pdf",color:"red",groups:["Presentation","PDF","Data"],handles:[{type:"pdf",url:"src",source:"src"},{type:"document",url:"src",source:"src"}],meta:{author:"LRNWebComponents"}},settings:{quick:[{property:"src",title:"File",description:"The URL for the pdf",inputMethod:"textfield",icon:"link",required:!0}],configure:[{property:"src",title:"Source",description:"The URL for this csv file",inputMethod:"textfield",icon:"link",required:!0},{property:"downloadable",title:"Downloadable",description:"User can download this",inputMethod:"boolean",icon:"file-download"},{property:"enableTextSelection",title:"Text Selection",description:"User can select text in this element.",inputMethod:"boolean",icon:"file-download"},{property:"elevation",title:"Elevation",description:"Visual elevation of the element",inputMethod:"number",icon:"flip-to-front"}],advanced:[]}};this.setHaxProperties(props)},loadPDF:function loadPDF(){if(!this.getAttribute("src"))return;this.instance.changePDFSource(this.getAttribute("src"));this.currentPage=1;this.totalPages=this.instance.totalPages;this.fileName=this.src.split("/").pop();this._setFitWidth();this.$.zoomIcon.icon="fullscreen"},attributeChanged:function attributeChanged(name,type){if("src"===name){if("undefined"==typeof this.instance)this._initializeReader();else{this.loadPDF();this.changedSideBar=!0;this.fromChange=!0;this.sideBar()}}else if("fitWidth"===name){this._setFitWidth()}},_initializeReader:function _initializeReader(){this.instance=new Reader(this);if(null!=this.src)this.fileName=this.src.split("/").pop();this.currentPage=1},_setFitWidth:function _setFitWidth(){this.instance.setFitWidth(this.fitWidth)},zoomInOut:function zoomInOut(step){if(2<=this.instance.currentZoomVal){this.instance.currentZoomVal=2}else if(.1>=this.instance.currentZoomVal){this.instance.currentZoomVal=.1}else{this.$.zoomIcon.icon="fullscreen";this.instance.zoomInOut(step)}},zoomIn:function zoomIn(){if(this.instance.pdfExists){this.zoomInOut(.1)}},zoomOut:function zoomOut(){if(this.instance.pdfExists){this.instance.zoomInOut(-.1)}},zoomFit:function zoomFit(){if(this.instance.pdfExists){if(this.instance.currentZoomVal==this.instance.widthZoomVal){this.instance.zoomPageFit();this.$.zoomIcon.icon="fullscreen"}else{this.instance.zoomWidthFit();this.$.zoomIcon.icon="fullscreen-exit"}}},pageNumSearch:function pageNumSearch(){var page=parseInt(this.$.input.value);if(1<=page&&page<=this.instance.totalPagesNum){this.instance.currentPage=page;this.instance.queueRenderPage(this.instance.currentPage);this.currentPage=page;this.$.input.blur()}else{this.$.input.value=this.currentPage;this.$.input.blur()}},sideBarClick:function sideBarClick(page,currentInstance,currentThis){var parsedFileName=currentThis.src.split("/").pop(),self=currentInstance;currentThis.sidebarOpen=!0;if(1<=page&&page<=currentInstance.totalPagesNum){self.currentPage=page;self.queueRenderPage(self.currentPage);currentInstance.currentPage=page;currentThis.currentPage=page;this.$.input.blur()}else{this.$.input.value=self.currentPage;this.$.input.blur()}},showPrev:function showPrev(){if(1<this.instance.currentPage){this.instance.currentPage--;this.instance.queueRenderPage(this.instance.currentPage);this.currentPage--}},showNext:function showNext(){if(this.instance.totalPagesNum>this.instance.currentPage){this.instance.currentPage++;this.instance.queueRenderPage(this.instance.currentPage);this.currentPage++}},sideBar:function sideBar(){if(this.instance.pdfExists){if(!this.fromChange){this.$.container.style.height=this.$.test.style.height;this.$.container.style.width=this.$.test.style.width;if("25%"==this.$.main.style.marginLeft){this.sidebarOpen=!1;this.instance.setViewportPos(!1);this.$.main.style.marginLeft="0%";this.$.container.style.marginLeft="-25%";this.$.container.style.visibility="hidden"}else{this.sidebarOpen=!0;this.$.main.style.marginLeft="25%";this.$.container.style.marginLeft="0%";this.$.container.style.visibility="visible";this.instance.setViewportPos(!0)}}this.fromChange=!1;this.instance.sidebarSetup(this);this.changedSideBar=!1}},download:function download(){if(this.instance.pdfExists){this.instance.download()}}});_exports.PdfElement=PdfElement});