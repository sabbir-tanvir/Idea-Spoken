
import DebateHero from "@/components/english-debate/DebateHero";
import CoursePhilosophy from "@/components/english-debate/CoursePhilosophy";
import CourseStructure from "@/components/english-debate/CourseStructure";
import OfferCard from "@/components/english-debate/OfferCard";
import { getEnglishDebateData } from "@/lib/api";
import { getCourses, getCourseById } from "@/lib/api/courses";

export default async function EnglishDebatePage() {
    const [data, courses] = await Promise.all([
        getEnglishDebateData(),
        getCourses(),
    ]);

    const summary = courses.find(c => c.title.toLowerCase().includes('debate'));
    const courseDetail = summary ? await getCourseById(summary.id) : null;

    return (
        <main className="min-h-screen bg-white">
            <DebateHero data={data} courseDetail={courseDetail} />
            <CoursePhilosophy data={data} />
            <CourseStructure data={data} courseDetail={courseDetail} />
            <OfferCard data={data} />
        </main>
    );
}
