import { ref } from 'vue'
import { defineStore } from 'pinia'


export const store = defineStore('store', () => {

    //state

    const paginatorPerPage = ref(10)
    const lang = ref(localStorage.getItem("lang") || 'en')
    const languages = [{ name: "ru" }, { name: "en" }]


    //getters
    //const count = computed(() => test.value.length)



    //actions

    function fivePerPage() {
        paginatorPerPage.value = 5
    }
    function tenPerPage() {
        paginatorPerPage.value = 10
    }
    function twentyPerPage() {
        paginatorPerPage.value = 20
    }
    function chengeLanguage(name) {
        lang.value = name
        localStorage.setItem("lang", name);
    }

    return {
        paginatorPerPage, lang, languages,
        fivePerPage, tenPerPage, twentyPerPage, chengeLanguage,
    }
})
