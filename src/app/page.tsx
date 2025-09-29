import Landing from "@/app/sections/Landing";
import Skill from "@/app/sections/Skill";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <div>
      <Landing />
      <Skill />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
