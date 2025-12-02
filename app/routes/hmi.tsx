import HMIPages from "~/pages/hmi/hmi";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Human Machine Interface" },
    { name: "description", content: "Human Machine Interface page." },
  ];
}

export default function HMI() {
  return <HMIPages />;
}
