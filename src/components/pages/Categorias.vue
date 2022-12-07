<template lang="">
    <div>
        <nav-bar></nav-bar>
        <div class="container">
            <h2 class="title my-5 text-center">
                CATEGORIAS
            </h2>
            <div class="container">
                    <div class="mt-5 d-flex m-auto" style="max-width:600px">
                    <input type="email" v-model="newCategoria.nombre" placeholder="Nombre" class="form-control m-1" id="idCategoria" aria-describedby="emailHelp">
                    <input type="text" v-model="newCategoria.descripcion" placeholder="Descripción" class="form-control m-1" id="idDescripcion" aria-describedby="emailHelp"/>
                    <button class="btn btn-primary m-1" @click="crearNuevaCategoria" :disabled="rolUserLog != 'ADMIN'">Agregar</button>
                </div>
            </div>
        </div>
        <div class="container mt-5">
            <table class="table table-dark table-striped m-auto" style="max-width:600px">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categoria, index in categorias">
                        <th scope="row">{{categoria.id}}</th>
                        <td>{{categoria.nombre}}</td>
                        <td>{{categoria.descripcion}}</td>
                        <td>
                            <button class="btn btn-primary m-auto" @click="editar(index)"  :disabled="rolUserLog != 'ADMIN'">
                                Editar
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-danger m-auto" @click="eliminar(index)"  :disabled="rolUserLog != 'ADMIN'">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="editCategoria != null" class="position-absolute mostrar-editar d-flex justify-content-center align-items-center">
            <div class="card position-relative" style="max-width:350px">
                <div class="close position-absolute bg-danger text-white user-select-none" @click="close">X</div>
                <div class="card-title text-center mt-3">
                    <h3>Editar</h3>
                </div>
                <div class="container mb-4">
                    <input type="text" v-model="editCategoria.nombre" placeholder="Nombre" class="form-control m-1" >
                    <input type="text" v-model="editCategoria.descripcion" placeholder="Descripción" class="form-control m-1" />
                    <div class="d-flex mt-3">
                        <div class="btn btn-primary m-1 m-auto" @click="guardarEdicion">Aceptar</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../ui/NavBar.vue'
export default {
    name:"",
    components:{
        NavBar
    },
    data(){
        return {
            editCategoria:null,
            newCategoria:{
                nombre:"",
                descripcion:""
            },
            categorias:[],
            rolUserLog:null,
        }
    },
    created(){
        if (!this.$isRegistre()) {
            this.$router.push('/login')
        }
        this.buscarCategorias()
        this.rolUserLog = sessionStorage.getItem("rol")
    },
    methods:{
        close(){
            this.editCategoria=null
        },
        editar(indice){
            this.editCategoria = this.categorias[indice]
        },
        eliminar(indice){
            this.axios.delete(this.$path()+"/categoria/"+this.categorias[indice].id, this.$header())
            .then(()=>{
                this.buscarCategorias()
            })
        },
        guardarEdicion(){
            this.axios.put(this.$path()+"/categoria/"+this.editCategoria.id, this.editCategoria,this.$header())
            .then(()=>{
                this.buscarCategorias()
                this.editCategoria=null
            })
        },
        buscarCategorias(){
            this.axios.get(this.$path()+"/categoria", this.$header())
            .then(resp=>this.categorias=resp.data)
        },
        crearNuevaCategoria(){
            if(this.newCategoria.nombre.length> 3){
                this.axios.post(this.$path()+"/categoria", this.newCategoria, this.$header())
                .then((resp)=>{
                    this.categorias.push(resp.data)
                    this.newCategoria = {
                        nombre:"",
                        descripcion:""
                    }
                })
            }
            
        }
    }
}
</script>
<style lang="">
    
</style>