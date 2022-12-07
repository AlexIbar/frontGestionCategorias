<template lang="">
    <div v-if="isLogin">
        <nav-bar></nav-bar>
        <div class="container">
            <h1 class="text-center mt-5">Post</h1>
        </div>
        <div class="container">
            <hr/>
        </div>
        <div class="container d-flex justify-content-center flex-wrap">
            <div class="card m-1" v-for="post, indice in posts"  style="width:350px">
                <div class="card-body">
                    <div class="card-title mt-3 d-flex align-items-center">
                        <div v-if="post.estado == 1" style="color:white; border-radius:50%; width:20px; line-height:20px; font-size:10px" class="bg-primary text-center">✓</div>
                        <h4 style="margin-bottom:0px">{{post.titulo}}</h4>
                    </div>
                    <div class="card-title mt-3">
                        <h5>{{post.descripcion}}</h5>
                    </div>
                    <div class="alert-perso">
                        {{getCategoria(post.id_categoria)}}
                    </div>
                    <div>
                        {{post.contenido}}
                    </div>
                    <div class="d-flex mt-3">
                        <button class="btn btn-primary m-1 m-auto" v-if="rolUserLog!='ADMIN'" :disabled="post.id_usuario != idUserLog" @click="editar(indice)">Editar</button>
                        <button class="btn btn-success m-1 m-auto" v-if="rolUserLog=='ADMIN'"  :disabled="post.estado != 0" @click="publicar(indice)">Publicar</button>
                        <button class="btn btn-danger m-1 m-auto"  :disabled="'ADMIN' != rolUserLog"  @click="eliminar(indice)">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="rolUserLog == 'AUTOR'" class="btn btn-primary btn-max-circle" @click="open">
            +
        </div>
        <add-post v-if="newPost" :categorias="categorias"/>
        <edit-post v-if="informacionEditar != null" :categorias="categorias" :post="informacionEditar"/>
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
    </div>
</template>
<script>
import NavBar from '../ui/NavBar.vue'
import AddPost from '../ui/AddPost.vue'
import EditPost from '../ui/EditPos.vue'
export default {
    name: "Home",
    components: {
        NavBar,
        AddPost,
        EditPost
    },
    data() {
        return {
            isEliminar:-1,
            isLogin: false,
            newPost:false,
            categorias:[],
            posts:[],
            rolUserLog:null,
            idUserLog:null,
            informacionEditar:null
        }
    },
    created(){
        this.rolUserLog = sessionStorage.getItem("rol")
        this.idUserLog = sessionStorage.getItem("usuario")
    },
    mounted() {
        if (!this.$isRegistre()) {
            this.$router.push('/login')
        } else {
            this.isLogin = true
            this.traerCategorias()
            this.traerPost()
        }
        this.$emitter.on("close-add-post", ()=> {
            this.newPost=false
            this.informacionEditar=null
        })
        this.$emitter.on("crear-post", ()=> {
            this.traerPost()
            this.newPost=false
            this.informacionEditar=null
        })
    },
    methods: {
        traerCategorias() {
            this.axios.get(this.$path() + "/categoria/", this.$header())
                .then(resp => {
                    this.categorias=resp.data
                })
        },
        traerPost(){
            this.axios.get(this.$path() + "/post/", this.$header())
                .then(resp => {
                    console.log(resp.data)
                    this.posts=resp.data
                })
        },
        getCategoria(id_categoria){
            let indice = this.categorias.findIndex(cate => cate.id== id_categoria)
            if(indice != -1 ) return this.categorias[indice].nombre
            return ""
        },
        open(){
            this.newPost=true
        },
        cancelar(){
            this.isEliminar=-1
        },
        eliminar(indice){
            if(this.isEliminar == -1){
                this.isEliminar=indice
            }else{
                
                this.axios.delete(this.$path() + "/post/"+this.posts[this.isEliminar].id, this.$header())
                .then(resp => {
                    this.traerPost()
                    this.isEliminar=-1
                })
            }
        },
        publicar(indice){
            let cambio = {...this.posts[indice]}
            cambio.estado=1
            this.axios.put(this.$path() + "/post/"+this.posts[indice].id, cambio,this.$header())
                .then(resp => {
                    this.traerPost()
                })
        },
        editar(indice){
            this.informacionEditar = this.posts[indice]
        }
    },
}
</script>
<style lang="">
    
</style>