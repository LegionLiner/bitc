import { NAME_PAGE } from '../constants/enum'

const appRouter = [
    {
        path: '/personalarea',
        name: NAME_PAGE.PERSONAL_AREA,
        component: () => import('../layouts/PersonalArea.vue'),
        redirect: { name: NAME_PAGE.SETTINGS },
        children: [
            {
                path: '/blacklist',
                name: NAME_PAGE.BLACK_LIST,
                component: () => import('../pages/BlackListPage.vue'),
                meta: { isPublic: false }
            },
            {
                path: '/settings',
                name: NAME_PAGE.SETTINGS,
                component: () => import('../pages/SettingsPage.vue'),
                meta: { isPublic: false }
            },
            {
                path: '/subscription',
                name: NAME_PAGE.SUBSCRIPTION,
                component: () => import('../pages/SubscriptionPage.vue'),
                meta: { isPublic: false }
            },
        ]
    }
]

export default appRouter