!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-legacy.js"),require("@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"),require("@polymer/paper-tabs/paper-tabs.js"),require("@polymer/paper-tabs/paper-tab.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-legacy.js","@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","@polymer/paper-tabs/paper-tabs.js","@polymer/paper-tabs/paper-tab.js"],t):t(e.TabList={},e.polymerLegacy_js)}(this,function(e,t){"use strict";function a(){var e,t,r=(e=['\n    <style>\n      :host {\n        display: block;\n        margin: 0 auto;\n        list-style: none;\n        display: flex;\n        padding: 16px;\n        border-bottom: 1px solid black;\n      }\n      paper-tab a {\n        text-decoration: none;\n      }\n      paper-button {\n        text-transform: unset;\n      }\n    </style>\n    <paper-tabs>\n      <template is="dom-repeat" items="[[tabs]]" as="tab">\n        <paper-tab\n          ><a target="_blank" href="[[tab.link]]" tabindex="-1"\n            ><paper-button raised>[[tab.label]]</paper-button></a\n          ></paper-tab\n        >\n      </template>\n    </paper-tabs>\n  '],t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return a=function(){return r},r}var r=t.Polymer({_template:t.html(a()),is:"tab-list",behaviors:[HAXBehaviors.PropertiesBehaviors],observers:["_valueChanged(tabs.*)"],properties:{tabs:{type:Array,value:[]}},_valueChanged:function(e){for(var t in e.base)for(var a in e.base[t])this.notifyPath("tabs."+t+"."+a)},attached:function(){this.setHaxProperties({canScale:!1,canPosition:!1,canEditSource:!1,gizmo:{title:"Tabs",description:"A list of links as tabs.",icon:"icons:tab",color:"grey",groups:["Presentation","Links"],handles:[],meta:{author:"LRNWebComponents"}},settings:{quick:[],configure:[{property:"tabs",title:"Tabs",description:"Listing of tabs",inputMethod:"array",properties:[{property:"link",title:"Link",description:"link to go to",inputMethod:"textfield",required:!0},{property:"label",title:"Label",description:"text to place on the tab",inputMethod:"textfield",required:!0}]}],advanced:[]}})}});e.TabList=r,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=tab-list.umd.js.map
