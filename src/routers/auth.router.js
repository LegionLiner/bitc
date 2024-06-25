import { NAME_PAGE } from '../constants/enum'

const authRouter = [
    {
        path: '/login',
        name: NAME_PAGE.LOGIN,
        component: () => import('../pages/LoginPage.vue'),
        meta: { isPublic: true }
    },
    {
        path: '/registration',
        name: NAME_PAGE.REGISTRATION,
        component: () => import('../pages/RegistrationPage.vue'),
        meta: { isPublic: true }
    }
]

export default authRouter