<template>
  <div class="MainClass">
    <div class="text">Жилфонд</div>
    <div class="user">Пользователь</div>
    <div class="Container">
      <div class="user-search">Поиск сотрудников</div>
      <input @input="changesearcher" v-model="searcher" placeholder="Введите Id или имя" class="user-search2">
      <div class="user-search3">Результаты</div>
      <div v-if="searcher == ''" class="search-title">начните поиск</div>
      <div v-else-if="Object.keys(result).length > 0" class="search-title">Результаты поиска</div>
      <div v-else class="search-title">Ничего не найдено</div>
      <div class="container-search">
        <div v-if="searchLoader" class="loader"></div>
        <div class="user-result" v-for="user in result" :key="user.id" @click="this.$store.commit('SetSelectUser', user.id)">
          <div class="image"></div>
          <div class="name">{{ user.username.length > 10 ? user.username.slice(0, 10) + '...' : user.username }}</div>
          <div class="email">{{ user.email.length > 10 ? user.email.slice(0, 10) + '...' : user.email }}</div>
        </div>
      </div>
      <div class="Container2">
        <div v-if="Object.keys(this.$store.state.selectUser).length == 0" class=" text">Выберите сотрудника, чтобы посмотреть его профиль</div>
        <UserComp v-else />
      </div>
    </div>
  </div>
</template>






<script>
import UserComp from './UserComp.vue'


export default {
  name: 'MainComp',
  components: {
    UserComp
  },
  data() {
    return {
      searcher: '',
      result: {},
      searchLoader: false,
    }
  },
  methods: {
    changesearcher: function () {
      let users = this.$store.state.users
      let searcher = this.searcher.split(',')
      this.searchLoader = true
      this.result = {}
      let ids = ""
      if (this.searcher.length == 0) {
        this.searchLoader = false
        return
      }
      for (let index = 0; index < searcher.length; index++) {
        const item = searcher[index].replace(" ", "");
        if (item == '') continue
        for (const key in users) {
          let user = users[key]
          if (user.username.toLowerCase().includes(item.toLowerCase())) {
            ids += `id=${user.id}&`
          }
        }
      }
      if (ids == "") return this.searchLoader = false
      ids = ids.slice(0, -1)
      fetch('https://jsonplaceholder.typicode.com/users?' + ids).then(response => response.json()).then(data => {
        console.log(ids);
        this.result = data
        this.searchLoader = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');


.MainClass {
  width: 1366px;
  height: 748px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32px;
    color: #E31F24;
    position: absolute;
    top: 50px;
    left: 50px;
  }



  .user {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #333;
    position: absolute;
    top: 50px;
    right: 50px;
  }


  .Container {
    width: 1266px;
    height: 589px;
    position: absolute;
    top: 115px;
    left: 47px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background: #fdfdfd;



    .search-title {
      font-weight: 400;
      font-size: 14px;
      color: #76787d;
      font-family: 'Montserrat', sans-serif;
      margin-left: 23px;
    }

    .container-search {
      width: 260px;
      height: 350px;
      // background-color: #E31F24;
      margin-left: 13px;
      margin-top: 10px;
      overflow-y: auto;
      overflow-x: hidden;

      .loader {
        width: 50px;
        height: 50px;
        background-image: url("../assets/loader.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        margin-left: 100px;
        margin-top: 150px;
      }

      .user-result {
        border-radius: 10px;
        width: 240px;
        height: 70px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        background: #fff;
        margin-top: 10px;
        margin-left: 10px;
        display: flex;
        z-index: 1;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: flex-start;
        justify-content: center;
        transition: 0.1s;

        .image {
          border-right: 1px solid #e0e0e0;
          width: 70px;
          height: 70px;
          background-image: url(http://localhost:8080/img/imageuser.9b3079cf.svg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 10px 0 0 10px;
        }

        .name {
          font-weight: 600;
          font-size: 14px;
          color: #333;
          margin-left: 23px;
          /* margin-top: 20px; */
          font-family: "Montserrat", sans-serif;
        }

        .email {
          font-weight: 400;
          font-size: 14px;
          color: #76787d;
          margin-left: 23px;
          /* margin-top: 40px; */
          font-family: "Montserrat", sans-serif;
        }
      }

      .user-result:hover {
        background: #e0e0e0;
        outline: 2px solid #e0e0e0;
      }
    }

    .container-search::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    .user-search {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 16px;
      color: #333;
      position: relative;
      margin-left: 23px;
      margin-top: 27px;
    }



    .user-search2 {
      border: 1.50px solid #e9ecef;
      border-radius: 8px;
      padding: 16px;
      width: 200px;
      height: 20px;
      background: #fff;
      margin-top: 22px;
      margin-left: 23px;
      font-family: 'Montserrat', sans-serif;

      ::placeholder {
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        color: #76787d;
      }
    }



    .user-search3 {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 16px;
      color: #333;
      position: relative;
      margin-left: 23px;
      margin-top: 27px;
    }



    .Container2 {
      position: absolute;
      width: 975px;
      height: 589px;
      right: 0px;
      border-radius: 0px 10px 10px 0px;
      border-left: 2px solid rgba(0, 0, 0, 0.2);
      top: 0px;

      .text {
        font-weight: 400;
        font-size: 14px;
        color: #76787d;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>