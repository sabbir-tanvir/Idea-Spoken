
import CoursePhilosophy from "@/components/english-debate/CoursePhilosophy";
import CourseStructure from "@/components/english-debate/CourseStructure";
import OfferCard from "@/components/english-debate/OfferCard";
import DebateHero from "@/components/idea-spoken/IdeaHero";
import { getEnglishDebateData } from "@/lib/api";

export default async function EnglishDebatePage() {
    const data = await getEnglishDebateData();

    return (
        <main className="min-h-screen bg-white">
            
            <DebateHero data={data} />
            <CoursePhilosophy data={data} />
            <CourseStructure data={data} />
            <OfferCard data={data} />
        </main>
    );
}
