import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/pages/Home.vue'
const routes = [
    {
        path:"/",
        component:Home
    },
    {
        path:"/categorias",
        component:()=> import("../components/pages/Categorias.vue")
    },
    {
        path:"/usuarios",
        component:()=> import("../components/pages/Usuarios.vue")
    },
    {
        path:"/roles",
        component:()=> import("../components/pages/Roles.vue")
    },
    {
        path:"/login",
        component: ()=> import("../components/registro/login.vue")
    }
]

const history = createWebHistory();

const router = createRouter({
    history,
    routes
})

export default router;
