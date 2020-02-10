<template>
    <div>
        <textarea v-model="text" placeholder="JSON (WaveDrom)"></textarea>
        <br>
        <div :id="'a' +  id"></div>
    </div>
</template>

<script>
    const WaveDrom = require('wavedrom');
    export default {
        name: 'WaveDrom',
        props: {

            parentText: String
        },
        data() {
            return {
                id: null,
                text: this.parentText
            };
        },
        watch: {
            /**
             * Render when text value is changed
             */
            text: function () {
                WaveDrom.renderWaveForm(this.id, JSON.parse(this.text), 'a');
            }
        }
    };
</script>

<style>
</style>
