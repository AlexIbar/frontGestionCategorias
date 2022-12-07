<template lang="">
    <div>
        <div class="position-absolute mostrar-editar d-flex justify-content-center align-items-center">
            <div class="card position-relative" style="width:400px">
                <div class="close position-absolute bg-danger text-white user-select-none" @click="close">X</div>
                <div class="card-title text-center mt-3">
                    <h3>Editar Post</h3>
                </div>
                <form @submit.prevent="crearPost" class="container mb-4">
                    <input type="text" required placeholder="Titulo" v-model="post.titulo" class="form-control m-1" >
                    <input type="text" required placeholder="Descripción" v-model="post.descripcion" class="form-control m-1" />
                    <textarea class="form-control m-1" placeholder="Contenido" v-model="post.contenido"></textarea>
                    <select class="form-select m-1" aria-label="Default select example"  required  v-model="post.id_categoria">
                        <option disabled value="">Seleccionar categoria</option>
                        <option v-for="categoria in categorias" :value="categoria.id">{{categoria.nombre}}</option>
                    </select>
                    <div class="d-flex mt-3">
                        <button class="btn btn-primary m-1 m-auto">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['categorias', 'post'],
    data(){
        return{
            titulo:"",
            contenido: "",
            descripcion: "",
            id_categoria: ""
        }
    },
    created(){
    },
    methods:{
        close(){
            this.$emitter.emit("close-add-post")
        },
        crearPost(){
            this.axios.put(this.$path() + "/post/"+this.post.id, this.post,this.$header())
                .then(resp => {
                    this.$emitter.emit("crear-post", this.post)
                })
        }
    }
}
</script>
<style lang="">
    
</style>