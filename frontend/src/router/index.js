import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      props: true,
    },
    {
      path: "/postmessage",
      name: "postmessage",
      meta: {
        title: "發文 PostMessage",
      },
      component: () => import("../views/PostMessageView.vue"),
    },
    // {
    //   path: "/game",
    //   name: "game",
    //   meta: {
    //     title: "拯救馬桶 Rescue that Toilet",
    //   },
    //   component: () => import("../views/gameView.vue"),
    // },

    // 以下前台頁面需要登入後才能前往
    {
      path: "/member",
      name: "member",
      meta: {
        title: "會員中心 Member Center",
        // 需要給予權限
        requiresAuth: true,
      },
      component: () => import("../views/memberView.vue"),
      children: [
        {
          path: "info",
          name: "memberInfo",
          component: () => import("@/components/memberInfo.vue"),
        },
        {
          path: "post",
          name: "memberPost",
          component: () => import("@/components/memberPost.vue"),
        },
        {
          path: "save",
          name: "memberSave",
          component: () => import("@/components/memberSave.vue"),
        },
      ],
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
    {
      path: "/crud",
      name: "crud",
      meta: {
        title: "CRUD 參考",
      },
      component: () => import("../views/crudView.vue"),
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
        requiresAdminAuth: true,
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

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // console.log("Setting up Firebase Auth");
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // console.log('Auth state changed', firebaseUser);
        // user.value = firebaseUser; // 更新用戶狀態
        unsubscribe();
        resolve(firebaseUser);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAdminAuth = to.matched.some(
    (record) => record.meta.requiresAdminAuth
  );
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAdminAuth) {
    // 需要管理員授權
    if (sessionStorage.getItem("admin")) {
      // 管理員Token存在，允許訪問
      next();
    } else {
      // 管理員Token不存在，彈出提示並跳轉到管理員登錄頁面
      alert("請先以管理員身份登錄！");
      next({ name: "admin" });
    }
  } else if (requiresAuth) {
    // 需要普通用戶授權
    try {
      const user = await getCurrentUser();
      if (user) {
        // 用戶存在，允許訪問
        next();
      } else {
        // 用戶不存在，彈出提示並跳轉到首頁
        alert("請先登錄！");
        next({ name: "home" });
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  } else {
    // 不需要任何授權，直接放行
    next();
  }
});

export default router;
