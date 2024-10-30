(function () {
  if (!tinymce) return

  tinymce.create('tinymce.plugins.cnWRAP', {
    init: function (ed, url) {

      ed.addCommand('mceCNV', function () {

        var selection = ed.selection.getNode();

        if (selection) {
            var div = document.createElement("div");
            div.setAttribute("class","cnv")
            console.log(selection)
            div.appendChild(selection)
            ed.selection.setNode(div);
        } else {
          alert("Please select a link first.")
        }
      });

      ed.addButton('cnWRAP', {
        title: 'CodeNotary Verify',
        cmd: 'mceCNV',
        image: 'data:image/png;base64,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'
      });

    },

  });

  // Register plugin
  tinymce.PluginManager.add('cnWRAP', tinymce.plugins.cnWRAP);
})();
