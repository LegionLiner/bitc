import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './routers'
import { createI18n, useI18n } from 'vue-i18n'
import { languages } from './i18n'
import { store } from './stores'


const app = createApp(App, {
    setup() {
        const { t } = useI18n()
        return { t }
    }
})
app.use(createPinia())

const messages = Object.assign(languages)
const myStore = store()
const i18n = createI18n({
    legacy: false,
    locale: myStore.lang,
    fallbackLocale: "en",
    messages
})

app.use(router)
app.use(i18n)


app.mount('#app')
