import login from '../components/login/index'
import welcome from '../components/login/index'


let router = [
    {
        path: '/login',
        exact: true,
        component: login
    },
    {
        path: '/welcome',
        component: welcome
    }
]

export default router