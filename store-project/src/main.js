import { createApp } from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import App from './App.vue'

//导入路由器
import router from './router'

//导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
.use(router)  //使用路由器
.use(createPinia())  //使用pinia
.use(ElementPlus)  //使用element-plus
.mount('#app')
