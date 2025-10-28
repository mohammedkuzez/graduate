import { createMemoryHistory, createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Home from '@/components/Home.vue'
import ProjectManagement from '@/components/ProjectManagement.vue'
import TaskManagement from '@/components/TaskManagement.vue'
import TaskStatusManagement from '@/components/TaskStatusManagement.vue'
import Dashboard from '@/components/Dashboard.vue'
import Invitation from '@/components/Invitation.vue'
import NotFoundView from '@/components/NotFoundView.vue'



const routes = [
    {
        path: '/',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Home',
        component: Home,
        children: [
            { path: 'Project_Management',name: 'Project Management',component: ProjectManagement },
            { path: 'Task_Management',name: 'Task Management',component: TaskManagement },
            { path: 'Task_Status_Management', name: 'Task Status Management', component: TaskStatusManagement },
            { path: 'Dashboard',name: 'Dashboard',component: Dashboard },
            { path: 'Invitation',name: 'Invitation',component: Invitation },
        ]
    },
    {
        path:  '/:pathMatch(.*)*',
        component: NotFoundView,
        name: 'not-found'
    },
    
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from) => {
    console.log('Global Before Each')
    console.log({ to, from })

    const isAuthenticated = !!localStorage.getItem('accessToken');

    // if (!isAuthenticated && to.name !== 'login-page') {
    //     return '/login'
    // }
})

export {
    router
}