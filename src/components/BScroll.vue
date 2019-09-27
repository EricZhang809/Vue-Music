<template>
  <div class="BScroll" ref='container' >
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default{
    name:'BScroll',
    mounted(){
      let scroll = new BScroll(this.$refs.container.parentElement,{
        scrollY:true,
        scrollX:false,
        click:true
      })
    }
  }
</script>

<style>
</style>
