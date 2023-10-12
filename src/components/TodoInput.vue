<template>
  <div class="add">
    <div class="main-input">
      <input
          type="text"
          class="add__input"
          placeholder="Enter your task here"
          v-model="newTodoItem"
          v-on:keyup.enter="addTodoItem"
          ref="taskInput"
      />
      <button class="add__button" v-on:click="addTodoItem">
        <span class="blind">Add</span>
      </button>
    </div>
  </div>
</template>

<script>

import getDate from "@/assets/common/getDate";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      newTodoItem: ""
    };
  },
  computed: {
    ...mapGetters(["storedTodoItems", "storedTodoItemsCount"])
  },
  methods: {
   addTodoItem() {
     localStorage.setItem(this.newTodoItem, this.newTodoItem)
      if (this.newTodoItem !== "")
        var value = {
          item: this.newTodoItem,
          date: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
          completed: false,
          time: getDate().time
        };
        localStorage.setItem(this.newTodoItem, JSON.stringify(value));
        this.clearInput()
      }
    },
    
    clearInput() {
      this.newTodoItem = "";
    }
  }

</script>

<style lang="scss">
.add {
  position: relative;
  max-width: $max-width;
  margin: 0 auto;
  .main-input {
    @include animation(fadeShow, 800ms, 1, 900ms);
  }
}
</style>