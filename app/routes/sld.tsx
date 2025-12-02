import SLDPages from "~/pages/sld/sld";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Single Line Diagram" },
    { name: "description", content: "Single Line Diagram page." },
  ];
}

export default function SLD() {
  return <SLDPages />;
}
