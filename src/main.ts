import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './assets/css/global.css'
import { ElMessage } from 'element-plus';
import { ElButton } from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.component('ElButton', ElButton);

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.config.globalProperties.$message = ElMessage;

app.mount('#app');