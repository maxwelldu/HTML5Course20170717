<template lang="html">
  <div class="">
    <ul>
      <li v-for="(good, index) in goods" :key="'good' + index">
        <img :src="good.goods_thumb" alt="">
        {{ good.goods_name }}
        {{ good.price }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: []
    }
  },
  methods: {
    getGoods (catId) {
      let url = 'http://h6.duchengjiu.top/shop/api_goods.php'
      if (catId) {
        url += '?cat_id=' + catId
      }
      this.$http.get(url)
      .then(res => {
        this.goods = res.data.data
      })
    }
  },
  watch: {
    $route (to, from) {
      const catId = to.params.id
      this.getGoods(catId)
    }
  }
}
</script>

<style lang="css">
</style>
