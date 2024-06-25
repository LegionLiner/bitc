import { NAME_PAGE } from '../constants/enum'

const appRouter = [
    {
        path: '/arbitrage',
        name: NAME_PAGE.ARBITRAGE,
        component: () => import('../layouts/Ligaments.vue'),
        redirect: { name: NAME_PAGE.P2P },
        children: [{
            path: 'p2p',
            name: NAME_PAGE.P2P,
            component: () => import('../pages/P2PPage.vue'),
            meta: { isPublic: true }
        },
        {
            path: 'spot',
            name: NAME_PAGE.SPOT,
            component: () => import('../pages/SpotPage.vue'),
            meta: { isPublic: true }
        }]
    },
    {
        path: '/help',
        name: NAME_PAGE.HELP,
        component: () => import('../pages/HelpPage.vue'),
        meta: { isPublic: true }
    },
]

export default appRouter