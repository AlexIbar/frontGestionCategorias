import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router';
import VueAxios from 'vue-axios'
import axios from 'axios'
import mitt from 'mitt';

const emitter = mitt()

const headers = ()=>{
    return {
        headers:{
            "Authorization": "Bearer "+sessionStorage.getItem("authorization")
        }
    }
}

const app =createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$path=()=>"http://localhost:8000/api"
app.config.globalProperties.$header=headers
app.mount("#app");