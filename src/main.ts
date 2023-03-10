import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'



const app = createApp(App)

// Add axios
// axios.defaults.baseURL = 'https://www.udemy.com/api-2.0';
// axios.defaults.headers.common['User-Agent'] = 'PostmanRuntime/7.29.0'
axios.defaults.baseURL = 'http://localhost:8000/'
app.use(VueAxios, axios)

app.mount('#app')