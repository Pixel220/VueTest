<template>
    <div class="UserClass">
        <img src="../assets/imageuser.svg" class="image">
        <div class="table">
            <div class="name">{{ this.$store.state.selectUser.name }}</div>
            <div class="email"><span class="email-title">email:</span> {{ this.$store.state.selectUser.email }}</div>
            <div class="email"><span class="email-title">phone:</span> {{ this.$store.state.selectUser.phone }}</div>
            <div class="info-title">О себе:</div>
            <div class="info-block" v-for="info in this.$store.state.selectUser.company" :key="info">
                <div class="info">{{ info }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>


export default {
    name: 'UserComp',
    data() {
        return {

        }
    }
}
</script>
  

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');



.UserClass {
    width: 100%;
    height: 100%;
    position: absolute;

    // background-color: red;
    .image {
        width: 424px;
        height: 286px;
        top: 30px;
        left: 21px;
        position: absolute;
    }

    ;

    .table {
        width: 439px;
        min-height: 284px;
        max-height: 500px;
        top: 30px;
        right: 30px;
        position: absolute;

        .name {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 16px;
            color: #000;
            font-weight: bold
        }



        .email {
            margin-top: 10px;
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            font-weight: 400;
            color: #76787d;

            .email-title {
                font-weight: bold;
                font-size: 14px;
                color: #333;
            }
        }



        .info-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            font-size: 16px;
            color: #333;
            margin-top: 20px;
        }



        .info-block {
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            font-size: 14px;
            color: #76787d;
            margin-top: 25px;
        }

    }
}
</style>


  