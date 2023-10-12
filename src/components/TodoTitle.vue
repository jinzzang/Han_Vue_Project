<template>
  <div class="title">
    <p class="title__text">
      <span class="title__message">{{ message }},</span>
      <span
          v-on:keyup.enter="handleEnter"
          v-on:blur="handleBlur"
          class="title__name"
          ref="test"
          contenteditable="true"
      >{{ propName }}</span>
    </p>
     <p class="title__task">
      <span class="title__task-top">오늘 해야 할 일 :D</span>
      <span class="title__task-count">
        <em class="title__task-left">{{ propsdata.left }}</em>
        <em v-if="propsdata.total" class="title__task-total">&nbsp;/ {{ propsdata.total }}</em>
      <span class="title__task-bottom">task today.</span>
      <span class="title__task-info"></span></span>
    </p>
  </div>
</template>

<script>
import getDate from "../assets/common/getDate.js";
export default {
  props: ["propsdata"],
  data() {
    return {
      message: "Hello, naeun",
      taskTotal: 10
    };
  },
   methods: {
    handleBlur(e) {
      const originalName = this.propName;
      const newName = e.target.innerText;
      if (newName !== originalName) {
        if (newName === "") {
          e.target.innerText = originalName;
        } else {
          this.$emit("changeName", newName);
          
        }
      }
    },
    handleName() {
      this.$refs.test.blur();

    },
        mounted() {
    this.message = getDate().daytime;
    }
  }
};
</script>

<style lang="scss">

.title {
  max-width: $max-width;
  margin: 0 auto;
  letter-spacing: 0.03rem;
  color: rgb(236, 90, 185);

  &__text {
    cursor: default;
    font-size: 1.6rem;
    @include flexbox;
    @include align-items(center);
    @include flex-wrap(wrap);
    @include ellipsis();
  }

  .wrap {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
  }

  &__message {
    display: block;
    min-height: 2.7rem;
    margin-right: 0.4rem;
    @include flex-shrink(0);
  }

  &__name {
    display: block;
    background: 0;
    border: 0;
    outline: 0;
    color: inherit;
    font-size: inherit;
    min-width: 1rem;
    min-height: 2.7rem;
    overflow: hidden;
    @include flex-shrink(1);
    br {
      display: none;
    }
    &:hover {
      text-decoration: underline;
      cursor: text;
    }
    &:focus {
      opacity: 0.8;
      // outline: 1px solid #fafafa;
      background: rgba(155, 123, 123, 0.15);
      text-decoration: underline;
    }
  }
  &__task {
    margin-top: 3.5rem;
    margin-bottom: 5rem;
    font-weight: bold;
    &-top {
      display: block;
      font-size: 2.6rem;
    }
    &-count {
      display: block;
      font-size: 5.4rem;
    }
    &-total {
      font-size: 50%;
    }
    &-bottom {
      display: block;
      font-size: 2.8rem;
      line-height: 50%;
    }
  }
}
//애니메이션 관리

.title {
  &__text {
    @include animation(fadeShow, 500ms);
  }
  &__task-top {
    @include animation(fadeShow, 600ms, 1, 400ms);
  }
  &__task-count {
    @include animation(fadeShow, 600ms, 1, 550ms);
  }
  &__task-bottom {
    @include animation(fadeShow, 600ms, 1, 700ms);
  }
}
</style>
<script setup>
</script>