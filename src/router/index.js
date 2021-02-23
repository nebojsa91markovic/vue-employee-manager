import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import NewEmployee from "@/components/NewEmployee";
import ViewEmployee from "@/components/ViewEmployee";
import EditEmployee from "@/components/EditEmployee";
import Login from "@/components/Login";
import Register from "@/components/Register";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/new",
      name: "NewEmployee",
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:employee_id",
      name: "ViewEmployee",
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:employee_id",
      name: "EditEmployee",
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //  IF USER IS NOT LOGGED IN
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //  IF USER IS LOGGED IN
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
