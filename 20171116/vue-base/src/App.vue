<template>
  <div id="app">
    <img src="./assets/logo.png">
    <el-switch active-color="red" inactive-color="green" v-model="value1">
    </el-switch>
    <div @click="add">
      {{ count }}
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      value1: true
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    add () {
      this.$store.dispatch('increment')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
