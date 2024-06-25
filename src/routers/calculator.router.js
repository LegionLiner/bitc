import { NAME_PAGE } from '../constants/enum'

const calculator = [
    {
        path: '/calculator',
        name: NAME_PAGE.CALCULATOR,
        component: () => import('../layouts/Сalculator.vue'),
        redirect: { name: NAME_PAGE.CALCULATOR_SPREAD },
        children: [{
            path: 'calculator_spread',
            name: NAME_PAGE.CALCULATOR_SPREAD,
            component: () => import('../pages/CalculatorSpreadPage.vue'),
            meta: { isPublic: true }
        },
        {
            path: 'spot_spread',
            name: NAME_PAGE.CALCULATOR_PERCENT,
            component: () => import('../pages/CalculatorPercentPage.vue'),
            meta: { isPublic: true }
        }]
    },
]

export default calculator