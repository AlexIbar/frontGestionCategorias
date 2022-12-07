<template lang="">
    <div>
        <NavBar/>
        <div class="container">
            <div class="mt-5 d-flex m-auto" style="max-width:600px">
                <input type="email" v-model="newRol" placeholder="Nuevo rol" class="form-control m-1" id="exampleInputEmail1" aria-describedby="emailHelp">
                <button class="btn btn-primary m-1" @click="crearNuevoRol" :disabled="rolUserLog != 'ADMIN'">Agregar</button>
            </div>
        </div>
        <div v-if="editar != null" class="position-absolute mostrar-editar d-flex justify-content-center align-items-center">
            <div class="card position-relative" style="max-width:350px">
                <div class="close position-absolute bg-danger text-white user-select-none" @click="close">X</div>
                <div class="card-title text-center mt-3">
                    <h3>Editar</h3>
                </div>
                <div class="container d-flex mb-4">
                    <input type="text" v-model="editar.nombre" class="form-control m-1" >
                    <button class="btn btn-primary m-1" @click="guardarEdicion">Aceptar</button>
                </div>
            </div>
        </div>
        <TablaRoles :roles="roles" :rolUserLog="rolUserLog"/>
    </div>
</template>
<script>
import NavBar from '../ui/NavBar.vue';
import TablaRoles from '../ui/TablaRoles.vue'
export default {
    components:{
        NavBar,
        TablaRoles,
    },
    data(){
        return{
            newRol:"",
            roles:[],
            editar:null,
            infoHeaders:{
                headers:{
                    "Authorization": "Bearer "+sessionStorage.getItem("authorization")
                }
            },
            rolUserLog:null,
        }
    },
    created(){
        if (!this.$isRegistre()) {
            this.$router.push('/login')
        }
        this.buscarRoles()
        this.rolUserLog = sessionStorage.getItem("rol")
    },
    mounted(){
        this.$emitter.on("editar-rol", indice=>{
            this.editar = this.roles[indice]
        })
    },
    methods:{
        close(){
            this.editar=null
        },
        guardarEdicion(){
            this.axios.put(this.$path()+"/rol/"+this.editar.id, this.editar, this.infoHeaders)
            .then(()=> {
                this.buscarRoles()
                this.editar=null
            })
        },
        crearNuevoRol(){
            if(this.newRol.length > 3) {
                this.axios.post(this.$path()+"/rol", {
                    nombre:this.newRol.toUpperCase()
                }, this.infoHeaders)
                .then(resp=>{
                    this.roles.push(resp.data)
                    this.newRol=""
                })
            }
        },
        buscarRoles(){
            this.axios.get(this.$path()+"/rol", this.infoHeaders)
            .then(resp=> this.roles=resp.data)
            .catch(err=>{
                if(err.response.status == 401){
                    console.log("Retornar")
                }
            })
        }
    }
}
</script>
<style>
    .mostrar-editar{
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background-color: #33333369;
    }
    .close{
        width:30px;
        line-height: 30px;
        text-align: center;
        border-radius: 100%;
        right: -15px;
        top: -15px;
    }
</style>