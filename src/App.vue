<template>
  <div id="app">
    <Todo/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Todo from '@/components/Todo.vue'; // @ is an alias to /src

@Component({
  components: {
    Todo,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">

</style>
