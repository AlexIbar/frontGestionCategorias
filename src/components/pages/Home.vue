<template lang="">
    <div v-if="isLogin">
        <nav-bar></nav-bar>
        <h1>Homeeee</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero consequatur possimus ducimus? Quia fugiat deleniti delectus? Nemo, totam architecto? Ducimus, dolorum? Facilis, magnam eveniet modi labore necessitatibus odio officiis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident magnam culpa, iusto ad exercitationem, repudiandae, optio dolore sequi corporis sint beatae omnis repellendus enim? Accusamus sint explicabo optio debitis exercitationem!
    </div>
</template>
<script>
import NavBar from '../ui/NavBar.vue'
export default {
    name:"Home",
    components:{
        NavBar
    },
    data(){
        return {
            isLogin:false
        }
    },
    mounted(){
        if(!this.isRegistre()){
            location.href='/login'
        }else{
            this.isLogin=true
        }
    },
    methods: {
        isRegistre(){
            let usuario = sessionStorage.getItem("usuario")
            let authorization = sessionStorage.getItem("authorization")
            let rol = sessionStorage.getItem("rol")
            if(usuario && authorization && rol){
                return true
            }
            return false
        }
    },
}
</script>
<style lang="">
    
</style>