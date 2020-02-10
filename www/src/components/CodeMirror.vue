<template>
  <div class="card card-block">
    <h3 class="card-title">Editor:</h3>
    <textarea id="editor"></textarea>
  </div>
</template>

<script>
  import 'codemirror/lib/codemirror.css';
  import CodeMirror from 'codemirror';
  import JSON5 from 'json5';

  /**
   * Set a textarea as CodeMirror input
   * And generates a json-change when text is updated and is a valid json5 format
   */
  export default {
    name: 'CodeMirror',
    props: {
      text: {type: String, required: false, default: ''}
    },
    data: function () {
      return {
        editor: null
      };
    },
    methods: {},
    watch: {
      text: function () {
        this.editor.getDoc().setValue(this.text);
        this.editor.text = this.text;
        localStorage.editor = this.text;
      }
    },
    /**
     * Setup CodeMirror plugin
     */
    mounted: function () {
      console.log('ok');
      const scope = this;
      let defaultText = this.text;

      const checkJson5 = (text) => {
        localStorage.editor = text;
        try {
          const json = JSON5.parse(text);
          if (json) {
            scope.$emit('json-changed', json);
          }
        } catch {
          // we don't care if text is not json
        }
      };

      if (localStorage.editor && !defaultText) {
        defaultText = localStorage.editor;
        checkJson5(defaultText);
      }

      const editorElement = document.getElementById('editor');
      this.editor = CodeMirror.fromTextArea(editorElement, {
        lineNumbers: true,
        mode: {
          name: 'javascript',
          json: true
        },
        matchBrackets: true,
        autoCloseBrackets: true,
        highlightSelectionMatches: true,
        autofocus: true
      });

      this.editor.getDoc().setValue(defaultText);

      this.editor.on('change', function (cm) {
        const text = cm.getValue();
        console.log('codeMirror text changed', text);
        checkJson5(text);
      });
    }
  };
</script>
