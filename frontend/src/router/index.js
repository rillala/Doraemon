import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/message/:post_class_name",
      name: "message",
      meta: {
        title: "留言板 Message",
      },
      component: () => import("../views/messageView.vue"),
      props:true,
    },
    {
      path: "/game",
      name: "game",
      meta: {
        title: "拯救馬桶 Rescue that Toilet",
      },
      component: () => import("../views/gameView.vue"),
    },

    // 以下前台頁面需要登入後才能前往
    {
      path: "/member",
      name: "member",
      meta: {
        title: "會員中心 Member Center",
        // 需要給予權限
        // requiresAuth: true,
      },
      component: () => import("../views/memberView.vue"),
    },
    {
      path: "/count",
      name: "count",
      meta: {
        title: "曬衣場-發文統計 Personal Data",
        // 需要給予權限
        // requiresAuth: true,
      },
      component: () => import("../views/countView.vue"),
    },

    //以下後臺頁面
    {
      path: "/admin",
      name: "admin",
      meta: {
        title: "網站管理員入口",
      },
      component: () => import("../views/AdminLoginView.vue"),
    },
    {
      path: "/manage",
      name: "manage",
      meta: {
        title: "網站管理頁面",
        // 需要給予權限
        // requiresAdminAuth: true,
      },
      component: () => import("../views/AdminManage.vue"),
    },

    // 404頁面：沒有被配置的路由都會去NotFound
    {
      path: "/:pathMatch(.*)*",
      name: "頁面不存在 NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 檢查路由是否有 hash
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    // 返回頂部或保存的位置
    return savedPosition || { top: 0 };
  },
});

// 以下是驗證前台是否登入的授權, 這部分後續要再依這個專案的設定去寫
router.beforeEach((to, from, next) => {
  // 首先檢查是否需要管理員授權訪問
  if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
    // 需要管理員授權
    // 這裡添加您的管理員驗證邏輯，例如檢查特定的Admin Token
    if (localStorage.getItem("adminToken")) {
      // 管理員Token存在，允許訪問
      next();
    } else {
      // 管理員Token不存在，彈出提示並跳轉到管理員登錄頁面
      alert("請先以管理員身份登錄！");
      next({ name: "adminLogin" });
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 需要普通用戶授權
    if (localStorage.getItem("token")) {
      // 普通用戶Token存在，允許訪問
      next();
    } else {
      // 普通用戶Token不存在，彈出提示並跳轉到首頁
      alert("請先登錄！");
      next({ name: "home" });
    }
  } else {
    // 不需要任何授權，直接放行
    next();
  }
});

export default router;
