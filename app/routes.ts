import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
   index("routes/home.tsx"),
   route("hmi", "routes/hmi.tsx"),
   route("sld", "routes/sld.tsx"),
] satisfies RouteConfig;
