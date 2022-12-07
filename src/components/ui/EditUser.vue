<template lang="">
    <div>
        <div class="position-absolute mostrar-editar d-flex justify-content-center align-items-center">
            <div class="card position-relative" style="width:400px">
                <div class="close position-absolute bg-danger text-white user-select-none" @click="close">X</div>
                <div class="card-title text-center mt-3">
                    <h3>Editar Usuario</h3>
                </div>
                <form @submit.prevent="editarUsuario" class="container mb-4">
                    <input type="text" required placeholder="Nombre" v-model="usuario.nombre" class="form-control m-1" >
                    <input type="email" required placeholder="Correo" v-model="usuario.correo" class="form-control m-1" />
                    <div class="d-flex justify-content-center align-items-center">
                        <input type="text" required  v-model="usuario.password" placeholder="Contraseña" class="form-control m-1" />
                        <div class="btn btn-primary d-flex align-items-center" @click="generarContrasenia" style="font-size:24px; height:38px">↻</div>
                    </div>
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
    props:['usuario'],
    created(){
        this.generarContrasenia()
    },
    methods:{
        generarContrasenia() {
            this.usuario.password = Math.random().toString(36).toUpperCase().slice(2)
        },
        close(){
            this.$emitter.emit("close-edit-user")
        },
        editarUsuario(){
            this.$emitter.emit("editar-usuario", this.usuario)
        }
    }
}
</script>
<style lang="">
    
</style>