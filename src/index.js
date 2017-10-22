// index.js
var m = require("mithril")
var mcm = require("material-components-mithril");

var button = {
    view: function() {
        return m(mcm.button, "hi");
    }
};

m.mount(document.body, button);
