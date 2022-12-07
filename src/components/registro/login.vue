<template lang="">
    <div class="inicio-login">
        <div>
            <div class="logo">
                <img width="100" src="https://graffica.info/wp-content/uploads/2017/08/badgeRGB.png" alt="">
            </div>
            <div class="form m-4">
                <form @submit.prevent="iniciar">
                    <input type="email" required placeholder="Correo" v-model="correo" class="form-control my-4" name="" id="correo">
                    <input type="password" placeholder="Contraseña" required minlength="8" v-model="contrasenia" class="form-control my-4" name="" id="contrasenia">
                <div class="d-flex my-4">
                    <button class="btn btn-primary btn-lg mx-auto">
                        Iniciar
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import jwt_token from "jwt-decode"
export default {
    data() {
        return {
            correo: "",
            contrasenia: ""
        }
    },
    created(){
        if(this.$isRegistre()){
            location.href='/'
        }
    },
    methods: {
        iniciar() {
            this.axios.post(this.$path()+"/auth",{
                    correo:this.correo,
                    password:this.contrasenia
            })
            .then(resp=>{
                if(resp.status == 200 && resp.data != ""){
                    sessionStorage.setItem("rol",jwt_token(resp.data).rol)
                    sessionStorage.setItem("usuario",jwt_token(resp.data).id)
                    sessionStorage.setItem("authorization", resp.data)
                    location.href='/'
                }
            })    
            }
    }
}
</script>
<style lang="">
</style>