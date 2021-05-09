import { createRouter, createWebHistory } from "vue-router";
import AppBooks from "../views/AppBooks";
import Book from "../views/Book";
import AppVisitors from "../views/AppVisitors";
import AppCards from "../views/AppCards";
import AppStatistics from "../views/AppStatistics";
import NotFound from "../views/NotFound";

const defaultTitle = "Library";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/books",
      component: AppBooks,
      alias: "/",
      meta: {
        title: "Books",
      },
    },
    {
      path: "/visitors",
      component: AppVisitors,
      meta: {
        title: "Visitors",
      },
    },
    {
      path: "/cards",
      component: AppCards,
      meta: {
        title: "Cards",
      },
    },
    {
      path: "/statistics",
      component: AppStatistics,
      meta: {
        title: "Statistics",
      },
    },
    {
      path: "/:notfound(.*)",
      component: NotFound,
      meta: {
        title: "NotFound",
      },
    },
    {
      path: "/book/:id",
      component: Book,
      meta: {
        title: "Books",
      },
    },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : defaultTitle;
  next();
});
export default router;
