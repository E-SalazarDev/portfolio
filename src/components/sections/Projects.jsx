import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <section id="proyectos" className="max-w-[1180px] mx-auto px-10 py-28">
      <SectionHeader tag="SYS.02" title="Proyectos" />
      <div className="grid gap-7 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
