import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, SELECTED_WORKS } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SELECTED_WORKS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: project.href,
    },
    openGraph: {
      type: "article",
      title: `${project.title} | Rifqi Maulana`,
      description: project.description,
      url: project.href,
      images: [
        {
          url: project.image[0],
          alt: `${project.title} project preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Rifqi Maulana`,
      description: project.description,
      images: [project.image[0]],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.caseStudy) notFound();

  const projectIndex = SELECTED_WORKS.findIndex((item) => item.id === project.id);
  const nextProject = SELECTED_WORKS[(projectIndex + 1) % SELECTED_WORKS.length];

  return (
    <main className="case-study-page">
      <section className="case-study-hero">
        <div className="container">
          <div className="case-study-kicker text-small-1">
            <span>[ Selected project ]</span>
            <span>{project.caseStudy.service}</span>
          </div>

          <h1 className="case-study-title">{project.title}</h1>

          <div className="case-study-hero-media">
            <Image
              src={project.image[0]}
              alt={`${project.title} project preview`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 90vw"
            />
          </div>
        </div>
      </section>

      <section className="case-study-meta container" aria-label="Project details">
        <div>
          <span className="case-study-meta-label text-small-1">Role</span>
          <span className="case-study-meta-value">{project.role}</span>
        </div>
        <div>
          <span className="case-study-meta-label text-small-1">Scope</span>
          <span className="case-study-meta-value">{project.tags}</span>
        </div>
        <div>
          <span className="case-study-meta-label text-small-1">Year</span>
          <span className="case-study-meta-value">{project.caseStudy.year}</span>
        </div>
      </section>

      <section className="case-study-content container">
        <h2 className="sr-only">Project details</h2>
        <div className="case-study-intro">
          <span className="text-small-1">01 / Overview</span>
          <p className="case-study-overview">{project.caseStudy.overview}</p>
        </div>

        <div className="case-study-sections">
          <article>
            <h3 className="text-small-1">02 / Challenge</h3>
            <p>{project.caseStudy.challenge}</p>
          </article>
          <article>
            <h3 className="text-small-1">03 / Approach</h3>
            <ul>
              {project.caseStudy.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3 className="text-small-1">04 / Outcome</h3>
            <p>{project.caseStudy.outcome}</p>
          </article>
        </div>
      </section>

      {project.image.length > 1 && (
        <section className="case-study-gallery container" aria-label="Project gallery">
          {project.image.slice(1).map((src, index) => (
            <div className="case-study-gallery-item" key={src}>
              <Image
                src={src}
                alt={`${project.title} detail ${index + 2}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </section>
      )}

      <section className="case-study-next container">
        <span className="text-small-1">Next project</span>
        <Link href={nextProject.href} className="case-study-next-link">
          <span>{nextProject.title}</span>
          <span aria-hidden="true">[ Open ]</span>
        </Link>
      </section>
    </main>
  );
}
