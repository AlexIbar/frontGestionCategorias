<template lang="">
    <div>
        <div class="collapse bg-dark" id="navbarToggleExternalContent">
            <ul class="list-group bg-dark">
                <li class="list-group-item bg-dark list-group-item-action text-white user-select-none" aria-current="true">
                    <router-link to="/">Post</router-link>
                </li>
                <li class="list-group-item bg-dark list-group-item-action text-white user-select-none">
                    <router-link to="/categorias">Categorias</router-link>
                </li>
                <li class="list-group-item bg-dark list-group-item-action text-white user-select-none">
                    <router-link to="/usuarios">Usuarios</router-link>
                </li>
                <li class="list-group-item bg-dark list-group-item-action text-white user-select-none">
                    <router-link to="/roles">Roles</router-link>
                </li>
            </ul>
        </div>
        <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </div>
</template>
<style scoped>
    a {
        text-decoration: none;
        color:white
    }
</style>
<script>
export default {
}
</script>