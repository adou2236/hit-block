<script setup lang="tsx">
import Game from './material/game/index.tsx';
import Controllor from './material/controllor/index.tsx';
import {defineComponent} from "vue";

const game = new Game();
const scene = game.scene;
const controllor = new Controllor(game)
controllor.init()

const Case = defineComponent({
  name: 'Case',
  setup() {
  },
  render() {
    return scene.render();
  }
});
</script>

<template>
  <case></case>
</template>

<style scoped>

</style>
