<template>
  <MainComp v-if="this.$store.state.users" />
  <div v-else class="loader"></div>
</template>

<script>
import MainComp from './components/MainComp.vue'


export default {
  name: 'App',
  components: {
    MainComp,
  },
  methods: {
    fetchData(url) {
      return new Promise((resolve, reject) => {
        fetch(url).then(response => response.json()).then(data => {
          resolve(data)
        }).catch(error => reject(error))
      })
    }
  },
  async mounted() {
    let resolve = await this.fetchData(this.$store.state.defaultLink + '/users')
    if (resolve) {
      this.$store.commit('SetUsers', resolve)
    }
  }
}



</script>


<style scoped lang="scss">
.loader {
  width: 1366px;
  height: 748px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('./assets/loader.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 300px;
}
</style>