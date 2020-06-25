import Loadable from "react-loadable";
import Loading from "../components/loading/index";

let routes = [
  {
    path: "/",
    exact: true,
    component: Loadable({
      loader: () => import("../view/topic/index"),
      loading: Loading,
    })
  },
  {
    path: "/message",
    component: Loadable({
      loader: () => import("../view/message/index"),
      loading: Loading,
    })
  },
  {
    path: "/collect",
    component: Loadable({
      loader: () => import("../view/collect/index"),
      loading: Loading,
    })
  },
  {
    path: "/login",
    component: Loadable({
      loader: () => import("../view/login/index"),
      loading: Loading,
    })
  },
  {
    path: "/detail",
    component: Loadable({
      loader: () => import("../view/detail/index"),
      loading: Loading,
    })
  }
];

export default routes;