<template lang="">
    <div>
        <div class="position-absolute mostrar-editar d-flex justify-content-center align-items-center">
            <div class="card position-relative" style="width:400px">
                <div class="close position-absolute bg-danger text-white user-select-none" @click="close">X</div>
                <div class="card-title text-center mt-3">
                    <h3>Crear usuario</h3>
                </div>
                <form @submit.prevent="crearUsuario" class="container mb-4">
                    <input type="text" required placeholder="Nombre" v-model="nombre" class="form-control m-1" >
                    <input type="email" required placeholder="Correo" v-model="correo" class="form-control m-1" />
                    <div class="d-flex justify-content-center align-items-center">
                        <input type="text" required  v-model="password" placeholder="Contraseña" class="form-control m-1" />
                        <div class="btn btn-primary d-flex align-items-center" @click="generarContrasenia" style="font-size:24px; height:38px">↻</div>
                    </div>
                    <select class="form-select m-1" aria-label="Default select example"  required  v-model="id_rol">
                        <option disabled value="">Seleccionar rol</option>
                        <option v-for="rol in roles" :value="rol.id">{{rol.nombre}}</option>
                    </select>
                    <div class="d-flex mt-3">
                        <button class="btn btn-primary m-1 m-auto">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['roles'],
    data(){
        return{
            nombre: "",
            correo: "",
            password: "",
            id_rol: ""
        }
    },
    created(){
        this.generarContrasenia()
    },
    methods:{
        generarContrasenia() {
            this.password = Math.random().toString(36).toUpperCase().slice(2)
        },
        close(){
            this.$emitter.emit("close-add-user")
        },
        crearUsuario(){
            let informacion = {
                nombre: this.nombre,
                correo: this.correo,
                password: this.password,
                id_rol: this.id_rol
            }
            this.$emitter.emit("crear-usuario", informacion)
        }
    }
}
</script>
<style lang="">
    
</style>