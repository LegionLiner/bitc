import { NAME_PAGE } from '../constants/enum'

const p2pSread = [
    {
        path: '/P2Pspread',
        name: NAME_PAGE.SPREAD,
        component: () => import('../layouts/P2PSpread.vue'),
        redirect: { name: NAME_PAGE.P2PSPREAD },
        children: [{
            path: 'p2p_spread',
            name: NAME_PAGE.P2PSPREAD,
            component: () => import('../pages/P2PSpreadPage.vue'),
            meta: { isPublic: true }
        },
        /*{
            path: 'spot_spread',
            name: NAME_PAGE.SPOT,
            component: () => import('../pages/SpotPage.vue'),
            meta: { isPublic: true }
        }*/]
    },
]

export default p2pSread