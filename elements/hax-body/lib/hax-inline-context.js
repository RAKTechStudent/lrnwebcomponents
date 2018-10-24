import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import "md-extra-icons/md-extra-icons.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/paper-item/paper-item.js";
import "materializecss-styles/colors.js";
import "@polymer/iron-icons/iron-icons.js";
import "./hax-context-item-menu.js";
import "./hax-context-item.js";
import "./hax-context-item-textop.js";
import "./hax-toolbar.js";
import "./hax-toolbar-item.js";
/**
`hax-inline-context`
A context menu that provides common text based authoring options.

@demo demo/index.html

@microcopy - the mental model for this element
 - context menu - this is a menu of text based buttons and events for use in a larger solution.
*/
Polymer({
  _template: html`
    <style include="materializecss-styles-colors">
      :host {
        height: 40px;
        position: absolute !important;
        transition: .6s all ease;
        visibility: hidden !important;
        opacity: 0 !important;
        display: none !important;
      }
      :host[opened] {
        visibility: visible !important;
        z-index: 1000 !important;
        opacity: 1 !important;
        display: block !important;
      }
      paper-item:hover {
        background-color: #d3d3d3;
        cursor: pointer;
      }

    </style>
    <hax-toolbar id="toolbar" inline="" hide-more="[[isSafari()]]">
      <template is="dom-if" if="[[!isSafari()]]">
      <hax-context-item slot="primary" icon="device:graphic-eq" label="Inline gizmo" event-name="insert-inline-gizmo"></hax-context-item>
      <hax-context-item slot="primary" icon="editor:format-bold" label="Bold" event-name="text-bold"></hax-context-item>
      <hax-context-item slot="primary" icon="editor:format-italic" label="Italic" event-name="text-italic"></hax-context-item>
      <hax-context-item menu="" slot="more" icon="mdextra:unlink" label="" event-name="text-unlink">Unlink</hax-context-item>
      <hax-context-item menu="" slot="more" icon="editor:format-clear" label="" event-name="text-remove-format">Remove format</hax-context-item>
      <hax-context-item menu="" slot="more" label="" icon="mdextra:subscript" event-name="text-subscript">Subscript</hax-context-item>
      <hax-context-item menu="" slot="more" label="" icon="mdextra:superscript" event-name="text-superscript">Superscript</hax-context-item>
      <hax-context-item menu="" slot="more" icon="editor:format-strikethrough" label="" event-name="text-strikethrough">Cross out
      </hax-context-item></template>
      <template is="dom-if" if="[[isSafari()]]">
      <hax-context-item-textop slot="primary" icon="device:graphic-eq" label="Inline gizmo" event-name="insert-inline-gizmo"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" icon="editor:format-bold" label="Bold" event-name="text-bold"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" icon="editor:format-italic" label="Italic" event-name="text-italic"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" icon="editor:insert-link" label="Link" event-name="text-link"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" icon="mdextra:unlink" label="Unlink" event-name="text-unlink"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" icon="editor:format-clear" label="Remove format" event-name="text-remove-format"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" label="Subscript" icon="mdextra:subscript" event-name="text-subscript"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" label="Superscript" icon="mdextra:superscript" event-name="text-superscript"></hax-context-item-textop>
      <hax-context-item-textop slot="primary" icon="editor:format-strikethrough" label="Cross out" event-name="text-strikethrough"></hax-context-item-textop>
      </template>
    </hax-toolbar>
`,

  is: "hax-inline-context",

  listeners: {
    "hax-context-item-selected": "_haxContextOperation"
  },

  properties: {
    /**
     * Track visibility status.
     */
    opened: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      observer: "_openedChanged"
    }
  },

  /**
   * Attached life cycle.
   */
  attached: function() {
    window.__selectionLock = false;
    document.addEventListener("selectstart", function() {
      // we have a selection started but won't execute until
      // the mouse has released
      window.__selectionLock = true;
    });
    document.addEventListener("mouseup", function() {
      // make sure we are in an edit mode
      if (
        window.__selectionLock &&
        Polymer.HaxStore.instance.editMode &&
        typeof Polymer.HaxStore.instance.activeNode !== typeof undefined &&
        Polymer.HaxStore.instance.activeNode !== null &&
        typeof Polymer.HaxStore.instance.activeNode.tagName !==
          typeof undefined &&
        Polymer.HaxStore.instance.isTextElement(
          Polymer.HaxStore.instance.activeNode
        ) &&
        !Polymer.HaxStore.instance.haxManager.opened
      ) {
        window.__selectionLock = false;
        try {
          Polymer.HaxStore.instance.activeHaxBody.$.inlinecontextmenu.opened = false;
          let selection = window.getSelection();
          let range = selection.getRangeAt(0).cloneRange();
          // if we have no offset (caret is positioned but no selection) then
          if (range.startOffset - range.endOffset === 0) {
            // do nothing, it's gone
          } else {
            // attempt to insert into this selection range
            try {
              range.setStart(selection.focusNode, range.startOffset);
              // inject the tracking element directly in front of this clone of a range
              range.insertNode(
                Polymer.HaxStore.instance.activeHaxBody.$.inlinetracker
              );
              setTimeout(() => {
                // now position the menu appropriately
                Polymer.HaxStore.instance.activeHaxBody.$.inlinecontextmenu.opened = true;
              }, 100);
            } catch (e) {}
          }
        } catch (e) {}
      } else {
        window.__selectionLock = false;
      }
    });
  },

  /**
   * Notice open or close state
   */
  _openedChanged: function(newValue, oldValue) {
    // set to close now
    if (oldValue && !newValue) {
      Polymer.HaxStore.instance.activeHaxBody._hideContextMenu(
        Polymer.HaxStore.instance.activeHaxBody.$.inlinetracker
      );
      // unset the active placeholder to avoid conflicts as the object
      Polymer.HaxStore.instance.activePlaceHolder = null;
    } else if (newValue && !oldValue) {
      Polymer.HaxStore.instance.activeHaxBody.$.inlinecontextmenu.style.left =
        Polymer.HaxStore.instance.activeHaxBody.$.inlinetracker.offsetLeft -
        Polymer.HaxStore.instance.activeHaxBody.$.inlinecontextmenu
          .offsetWidth /
          4 +
        "px";
      Polymer.HaxStore.instance.activeHaxBody.$.inlinecontextmenu.style.top =
        Polymer.HaxStore.instance.activeHaxBody.$.inlinetracker.offsetTop +
        "px";
    }
  },

  /**
   * Respond to simple modifications.
   */
  _haxContextOperation: function(e) {
    let detail = e.detail;
    let selection = window.getSelection();
    // support a simple insert event to bubble up or everything else
    switch (detail.eventName) {
      case "close-inline-context":
        this.opened = false;
        break;
      case "insert-inline-gizmo":
        let range = selection.getRangeAt(0);
        let newRange = range.cloneRange();
        // shift the range over now that the tracking pixel has been inserted
        // all this in order to replace it with something new.
        // The web is stupid at times.
        newRange.setStartAfter(
          Polymer.HaxStore.instance.activeHaxBody.$.inlinetracker
        );
        // store placeholder because if this all goes through we'll want
        // to kill the originating text
        Polymer.HaxStore.write(
          "activePlaceHolder",
          newRange,
          Polymer.HaxStore.instance.activeHaxBody.$.inlinecontextmenu
        );
        let values = {
          text: newRange.toString()
        };
        let type = "inline";
        let haxElements = Polymer.HaxStore.guessGizmo(type, values);
        // see if we got anything
        if (haxElements.length > 0) {
          // hand off to hax-app-picker to deal with the rest of this
          Polymer.HaxStore.instance.haxAppPicker.presentOptions(
            haxElements,
            type,
            "Pick how to present this inline gizmo",
            "gizmo"
          );
        }
        break;
      // wow these are way too easy
      case "text-bold":
        document.execCommand("bold");
        break;
      case "text-italic":
        document.execCommand("italic");
        break;
      case "text-underline":
        document.execCommand("underline");
        // silly hack to account for trigging a selection from
        // inside the menu that isn't from a paper-item
        this.$.toolbar.$.moremenu.$.menu.hideMenu();
        break;
      case "text-subscript":
        document.execCommand("subscript");
        // silly hack to account for trigging a selection from
        // inside the menu that isn't from a paper-item
        this.$.toolbar.$.moremenu.$.menu.hideMenu();
        break;
      case "text-superscript":
        document.execCommand("superscript");
        // silly hack to account for trigging a selection from
        // inside the menu that isn't from a paper-item
        this.$.toolbar.$.moremenu.$.menu.hideMenu();
        break;
      case "text-remove-format":
        document.execCommand("removeFormat");
        break;
      case "text-strikethrough":
        document.execCommand("strikeThrough");
        // silly hack to account for trigging a selection from
        // inside the menu that isn't from a paper-item
        this.$.toolbar.$.moremenu.$.menu.hideMenu();
        break;
      case "text-link":
        var href = "";
        if (typeof selection.focusNode.parentNode.href !== typeof undefined) {
          href = selection.focusNode.parentNode.href;
        }
        // @todo put in a dialog instead of this
        let url = prompt("Enter a URL:", href);
        if (url) {
          document.execCommand("createLink", false, url);
        }
        break;
      case "text-unlink":
        document.execCommand("unlink");
        break;
    }
  },

  /**
   * Test for safari, if it is don't place things in the menu
   */
  isSafari: function(typevalue) {
    let ua = navigator.userAgent.toLowerCase();
    // test to find safari to account for it's handling
    // of what's been selected. This isn't great UX but
    // there's literally nothing we can do for Safari
    // because of https://github.com/LRNWebComponents/hax-body/issues/38
    if (ua.indexOf("safari") != -1) {
      if (ua.indexOf("chrome") > -1) {
      } else {
        return true;
      }
    }
    return false;
  }
});
