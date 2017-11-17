<template>
  <div>

    <div class="">
      <ul>
      <router-link tag="li" :to="'/' + cat.cat_id" v-for="(cat, index) in cats" :key="'cat' + index">{{ cat.cat_name }}</router-link>
      </ul>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      cats: []
    }
  },
  created () {
    this.$http.get('http://h6.duchengjiu.top/shop/api_cat.php')
    .then(res => {
      this.cats = res.data.data
    })
  }
}
</script>

<style>

</style>
