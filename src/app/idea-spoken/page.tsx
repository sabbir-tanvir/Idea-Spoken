
import CoursePhilosophy from "@/components/english-debate/CoursePhilosophy";
import OfferCard from "@/components/english-debate/OfferCard";
import CourseStructure from "@/components/idea-spoken/CourseStructure";
import DebateHero from "@/components/idea-spoken/IdeaHero";
import TypesofGame from "@/components/idea-spoken/TypesofGame";
import { getEnglishDebateData, getWingMediaBySlug } from "@/lib/api";
import { getCourses, getCourseById } from "@/lib/api/courses";

export default async function IdeaSpokenPage() {
    const [data, courses, wingMedia] = await Promise.all([
        getEnglishDebateData(),
        getCourses(),
        getWingMediaBySlug("the-game-method"),
    ]);

    const summary = courses.find(c => {
        const t = c.title.toLowerCase();
        return t.includes('idea spoken') || t.includes('idea-spoken');
    });
    const courseDetail = summary ? await getCourseById(summary.id) : null;

    return (
        <main className="min-h-screen bg-white">
            <DebateHero
                data={data}
                courseDetail={courseDetail}
                heroTitle={wingMedia.title || undefined}
                heroDescription={wingMedia.description || undefined}
                coverImageUrl={wingMedia.coverImageUrl ?? undefined}
                coverImageAlt={wingMedia.coverImageAlt}
            />
            <CoursePhilosophy data={data} />
            <TypesofGame />
            <CourseStructure data={data} courseDetail={courseDetail} />
            <OfferCard data={data} courseDetail={courseDetail} />
        </main>
    );
}
