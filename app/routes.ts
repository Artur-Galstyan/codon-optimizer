import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/base.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("codon", "routes/codon.tsx"),
    route("code", "routes/code.tsx"),
  ]),
] satisfies RouteConfig;
