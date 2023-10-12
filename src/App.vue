<template>
  <div id="app">
    <div class="top">
    <TodoHeader />
    <TodoTitle v-bind:propsdata="checkCount" />
    <TodoInput v-on:addItem="addOneItem" />
    <TodoController v-on:sortItem="sortAllItem" v-on:clearAll="clearAllItem"></TodoController>
    <TodoList 
        v-bind:propsdata="todoItems"
        v-on:removeItem="removeOneItem"
        v-on:toggleItem="toggleOneItem"
        />
    <TodoFooter />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader"
import TodoTitle from "./components/TodoTitle"
import TodoInput from "./components/TodoInput"
import TodoController from "./components/TodoController"
import TodoList from "./components/TodoList"
import TodoFooter from "./components/TodoFooter"
import getDate from "./assets/common/getDate"
import {clearAllItem} from "@/store/modules/mutations";


export default {
  name: "App",
  data() {
    return {
      todoItems: []
    };
  },
  
  computed: {
    checkCount() {
      const checkLeftItems = () => {
        let leftCount = 0;
        for (let i = 0; i < this.todoItems.length; i++) {
          if (this.todoItems[i].completed === false) {
            leftCount++;
          }
        }
        return leftCount;
      };

      const count = {
        total: this.todoItems.length,
        left: checkLeftItems()
      };
      return count;
    }
  },
  created() {
      if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          )
        }
      }
    }
  },
   methods: {
     clearAllItem,
    addOneItem(todoItems) {
      const value = {
        item: todoItems,
        Date: `${getDate().date} ${getDate().week}`,
        time: getDate().time,
        completed: false
      };
      localStorage.setItem(todoItems, JSON.stringify(value));
      this.todoItems.push(value);
    },

    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);

    },
    toggleOneItem(todoItem) {
      todoItem.completed = !todoItem.completed;
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));

    },

    sortTodoLatest() {
      this.todoItems.sort(function(a, b) {
        return b.time - a.time;
      });
    },
    sortTodoOldest() {
      this.todoItems.sort(function(a, b) {
        return a.time - b.time;
      });
    },
    sortAllItem(selectedSort) {
      if (selectedSort.value === "date-desc") {
        this.sortTodoLatest()
      } else if (selectedSort.value === "date-asc") {
        this.sortTodoOldest()
      }
    }
  },
      mounted() {
        this.sortTodoOldest()
  },
  
      CclearAllItem() {
          this.todoItems = []
          localStorage.clear()
  },
  components: {
    TodoTitle,
    TodoHeader,
    TodoInput,
    TodoController,
    TodoList,
    TodoFooter,
  }
};
</script>

<style lang="scss">
@import "./assets/style/_reset";

.top {
  width: 100%;
  min-height: 43.6rem;
  padding: 0 $padding 4.5rem;
  background-image: linear-gradient(145deg, #99baee 20%, #f6a9ef 84%);
}
.body {
  padding: 3rem $padding;
  background-color: #efefef;
}
</style>