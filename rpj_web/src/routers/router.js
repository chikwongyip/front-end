import Login from '../views/UserLogin'
import Admin from "@/views/AdminIndex";
import MainPage from "@/components/MainPage";
import BrandList from "@/components/BrandList";

let routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/admin',
        component: Admin,
        children:[
            { path:'main',component:MainPage },
            { path: 'brand',component: BrandList},

        ]
    }
];
export default routes;