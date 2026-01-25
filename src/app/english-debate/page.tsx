
import DebateHero from "@/components/english-debate/DebateHero";
import CoursePhilosophy from "@/components/english-debate/CoursePhilosophy";
import { getEnglishDebateData } from "@/lib/api";

export default async function EnglishDebatePage() {
    const data = await getEnglishDebateData();

    return (
        <main className="min-h-screen bg-white">
            <DebateHero data={data} />
            <CoursePhilosophy data={data} />
        </main>
    );
}
