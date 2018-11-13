<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item.id">
                <label :class="{ done: item.checked }">
                    <input
                        type="checkbox"
                        :checked="item.checked"
                        @change="toggleAsync({id: item.id})">
                    {{ item.content }}
                </label>
            </li>
        </ul>
        <p>
            <input class='add'
                type="text"
                v-model="todoContent"
                placeholder="ここにTodoを入力してください。"
                v-on:keyup.enter="addContent">
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as todo from '@/store/modules/todo';

@Component<Todo>({
  computed: {
    ...todo.mapGetters(['items']),
  },
  methods: {
    ...todo.mapActions(['addAsync', 'toggleAsync']),
  },
})
export default class Todo extends Vue {
  /** テキストボックスに入力される文字列 */
  private todoContent: string = '';

  private addContent(): void {
      if (this.todoContent) {
          this.addAsync({content: this.todoContent});
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.done {
  text-decoration: line-through;
}
</style>