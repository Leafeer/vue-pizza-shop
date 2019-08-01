<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img class="mx-auto d-block" src="../../src/assets/logo.png" alt="">
          <form @submit.prevent="onSubmit">
            <div class="from-group">
              <label for="email">邮箱</label>
              <input type="email"
              class="form-control"
              v-model="email">
            </div>
            <div class="from-group">
              <label for="password">密码 </label>
              <input type="password"
              class="form-control"
              v-model="password">
            </div>
            
            <button class="btn btn-block btn-success my-btn">
              登陆
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email:'',
      password:'',
      
    }
  },
  //组件内首位
  beforeRouteEnter (to, from, next) {
    next(vm =>vm.$store.dispatch('setUser',null))
  },
  methods: {
    onSubmit(){
      axios.get('/users.json')
      .then(res=>{
        const data=res.data
        const users=[]
        for(let key in data){
          const user = data[key]
          users.push(user)
        }
        //过滤
        let result = users.filter((user)=>{
          return user.email === this.email && user.password ===
          this.password
        })
        //console.log(result)
        //判断result 的长度是否大于零
        if(result != null && result.length>0){
          this.$store.dispatch('setUser',result[0].email)
          this.$router.push({name:'homeLink'})
        }else{
          alert('账号或者密码错误')
          this.$store.dispatch('setUser',null)
        }
      })
    }
  },
}
</script>

<style scoped>
.my-btn{
  margin-top: 69px;
}
</style>
