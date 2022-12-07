<template lang="">
    <div>
        <nav-bar/>
        <div class="container mt-5 d-flex justify-content-center" style="max-width:700px; flex-wrap:wrap">
            <div class="card m-2" v-for="usuario, indice in usuarios" style="width:18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{usuario.nombre}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted ">{{usuario.correo}}</h6>
                    <h6>{{this.traerRol(usuario.id_rol)}}</h6>
                    <div class="d-flex">
                        <button class="btn btn-primary m-2" @click="editar(indice)" :disabled="rolUserLog == 'ADMIN' || idUserLog != usuario.id">Editar</button>
                        <button class="btn btn-danger m-2" @click="eliminar(indice)" :disabled="rolUserLog != 'ADMIN' || idUserLog == usuario.id">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isEliminar != -1" class="position-absolute mostrar-editar d-flex justify-content-center align-items-center">
            <div class="card position-relative" style="width:350px">
                <div class="card-title text-center mt-3">
                    <h3>Mensaje</h3>
                    <p>
                        ¿Esta seguro que desea eliminar el usuario?
                    </p>
                    <div>
                        <button class="btn btn-danger m-1" @click="eliminar">
                            Aceptar
                        </button>
                        <button class="btn btn-primary m-1" @click="cancelar">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <add-user v-if="newUser" :roles="roles"></add-user>
        <edit-user v-if="userEdit != null" :usuario="userEdit"></edit-user>
        <div class="btn btn-primary btn-max-circle" @click="open">
            +
        </div>
    </div>
</template>
<script>
import NavBar from '../ui/NavBar.vue';
import AddUser from '../ui/AddUser.vue'
import EditUser from '../ui/EditUser.vue'
export default {
    components: {
        NavBar,
        AddUser,
        EditUser
    },
    data() {
        return {
            newUser: false,
            roles: [],
            usuarios: [],
            userEdit: null,
            rolUserLog:null,
            idUserLog:null,
            isEliminar:-1
        }
    },
    created() {
        if (!this.$isRegistre()) {
            this.$router.push('/login')
        }
        this.rolUserLog = sessionStorage.getItem("rol")
        this.idUserLog = sessionStorage.getItem("usuario")

        this.traerRoles()
        this.buscarUsuarios()
    },
    mounted() {
        this.$emitter.on("close-add-user", () => this.newUser = false)
        this.$emitter.on("close-edit-user", () => this.userEdit= null)
        this.$emitter.on("crear-usuario", (dat) => this.crearUsuario(dat))
        this.$emitter.on("editar-usuario", (dat) => this.guardarEdicion(dat))
    },
    methods: {
        buscarUsuarios() {
            this.axios.get(this.$path() + "/usuario", this.$header())
                .then(resp => {
                    this.usuarios = resp.data
                })
        },
        traerRol(id) {
            let indice = this.roles.findIndex(ele => ele.id == id)
            if (indice != undefined || indice != -1) {
                return this.roles[indice].nombre
            }
            return ""
        },
        traerRoles() {
            this.axios.get(this.$path() + "/rol/", this.$header())
                .then(resp => {
                    this.roles = resp.data
                })
        },
        crearUsuario(informacion) {
            this.axios.post(this.$path() + "/usuario/", informacion, this.$header())
                .then(resp => {
                    this.buscarUsuarios()
                    this.newUser = false
                })
        },
        guardarEdicion(data){
            this.axios.put(this.$path() + "/usuario/"+data.id, data, this.$header())
                .then(resp => {
                    this.buscarUsuarios()
                    this.userEdit=null
                })
        },
        editar(indice){
            this.userEdit = this.usuarios[indice]
        },
        open() {
            this.newUser = true
        },
        eliminar(indice){
            if(this.isEliminar == -1){
                this.isEliminar=indice
            }else{
                this.axios.delete(this.$path() + "/usuario/"+this.usuarios[this.isEliminar].id, this.$header())
                .then(resp => {
                    this.buscarUsuarios()
                    this.isEliminar=-1
                })
            }
        },
        cancelar(){
            this.isEliminar = -1
        }
    }
}
</script>
<style lang="">
    
</style>