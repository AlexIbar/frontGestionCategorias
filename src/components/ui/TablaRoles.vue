<template lang="">
    <div class="container mt-5">
            <table class="table table-dark table-striped m-auto" style="max-width:600px">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha creación</th>
                    <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rol, index in roles">
                        <th scope="row">{{rol.id}}</th>
                        <td>{{rol.nombre}}</td>
                        <td>{{convertirFecha(rol.created_at)}}</td>
                        <td class="d-flex">
                            <button class="btn btn-primary m-auto" @click="edita(index)" :disabled="rolUserLog != 'ADMIN'">
                                Editar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>
<script>
export default {
    props: ['roles', 'rolUserLog'],
    methods:{
        convertirFecha(fech){
            return fech.split('T')[0]
        },
        edita(indice){
            this.$emitter.emit("editar-rol", indice)
        }
    },
}
</script>
<style lang="">
    
</style>