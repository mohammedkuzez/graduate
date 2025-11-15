import { createMemoryHistory, createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import Login from "@/components/Genral/Login.vue";
import SignUp from "@/components/Genral/SignUp.vue";
import Home from "@/components/Genral/Home.vue";
import ProjectManagement from "@/components/Project/ProjectManagement.vue";
import Dashboard from "@/components/Genral/Dashboard.vue";
import Invitation from "@/components/Invitation/Invitation.vue";
import NotFoundView from "@/components/Genral/NotFoundView.vue";
import ProjectTasks from "@/components/Tasks/ProjectTasks.vue";
import DetailsTask from "@/components/Tasks/DetailsTask.vue";

const routes = [
  {
    path: "/",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Home",
    component: Home,
    children: [
      {
        path: "Project_Management",
        name: "Project Management",
        component: ProjectManagement,
      },
      { path: "Dashboard", name: "Dashboard", component: Dashboard },
      { path: "Invitation", name: "Invitation", component: Invitation },
      {
        path: ":ProjectId",
        name: "Project Tasks",
        component: ProjectTasks,
        children: [
          { path: ":TaskId", name: "Task Details", component: DetailsTask },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
    name: "not-found",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  console.log("Global Before Each");
  console.log({ to, from });

  const isAuthenticated = !!localStorage.getItem("accessToken");

  // if (!isAuthenticated && to.name !== 'login-page') {
  //     return '/login'
  // }
});

export { router };
