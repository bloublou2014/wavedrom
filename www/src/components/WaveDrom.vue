<template>
  <div :id="id"/>
</template>

<script>
  /* global WaveDrom */

  export default {
    name: 'WaveDrom',
    props: {
      json: {type: Object}
    },
    data: function () {
      return {
        id: null,
        editor: null
      };
    },
    methods: {
      update: function () {
        console.log('watched', this.json);
        // Render Wavedrom in template's div based on generated id
        window.WaveDrom.renderWaveForm(this.json, this.id);
      }
    },
    watch: {
      json: {
        handler(value) {
          this.update(value);
        },
        deep: true
      }
    },
    mounted: function () {
      this.id = 'wavedrom_' + this._uid;
      window.WaveDrom.renderWaveForm(this.json, this.id);
    }
  };
</script>
