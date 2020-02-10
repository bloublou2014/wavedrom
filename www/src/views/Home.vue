<template>
  <div class="home-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-12">
          <CodeMirror v-on:json-changed="OnJsonChanged"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <WaveDrom ref="waveDrom" v-bind:json="json"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CodeMirror from '@/components/CodeMirror';
  import WaveDrom from '@/components/WaveDrom';

  export default {
    name: 'home',
    components: {
      CodeMirror,
      WaveDrom
    },
    data() {
      return {json: {}};
    },
    methods: {
      OnJsonChanged(json) {
        console.log('main, event json changed', json);
        this.json = json;
        // this.$refs.waveDrom.update();
      }
    }
  };
</script>
