import Login from '../components/login/index'
import Welcome from '../components/login/index'


let routes = [
    {
        path: '/welcome',
        // exact: true,
        component: Welcome
    },
    {
        path: '/login',
        component: Login
    },
    
]

export default routes