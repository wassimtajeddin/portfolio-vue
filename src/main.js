import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { intersectionDirective } from './directives/intersection'

const app = createApp(App)

app.directive('intersect', intersectionDirective)

app.use(router)
app.mount('#app')