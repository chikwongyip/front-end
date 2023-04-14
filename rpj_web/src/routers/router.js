import Login from '../views/UserLogin'
import Admin from "@/views/AdminIndex";
let routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/admin',
        component: Admin
    }
];
export default routes;