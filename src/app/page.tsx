import Landing from "@/app/sections/Landing";
import Skill from "@/app/sections/Skill";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <div>
      <Landing />
      <Skill />
      <Projects />
      <Contact />
    </div>
  );
}
