import { createRouter, createWebHistory } from 'vue-router'
import appRouter from './app.router'
import authRouter from './auth.router'
import personalAreaRouter from './personalArea.router'
import p2pSread from './p2pSpread.router'
import calculator from './calculator.router'
import { NAME_PAGE } from '../constants/enum'
import { storeAuth } from '../stores/auth.store'

const routes = [
    ...appRouter,
    ...authRouter,
    ...personalAreaRouter,
    ...p2pSread,
    ...calculator,
    {
        path: '/:pathMatch(.*)*',
        redirect: '/arbitrage'
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const { isLogin } = storeAuth();
    if (to.meta.isPublic) return next()
    else if (!to.meta.isPublic && isLogin) return next()
    else if (!to.meta.isPublic && !isLogin) return next({ name: NAME_PAGE.P2P })
    else return next({ name: NAME_PAGE.P2P })
})
export default router
