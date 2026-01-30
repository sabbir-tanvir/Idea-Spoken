
import CoursePhilosophy from "@/components/english-debate/CoursePhilosophy";
import OfferCard from "@/components/english-debate/OfferCard";
import CourseStructure from "@/components/idea-spoken/CourseStructure";
import DebateHero from "@/components/idea-spoken/IdeaHero";
import TypesofGame from "@/components/idea-spoken/TypesofGame";
import { getEnglishDebateData } from "@/lib/api";

export default async function EnglishDebatePage() {
    const data = await getEnglishDebateData();

    return (
        <main className="min-h-screen bg-white">
            
            <DebateHero data={data} />
            <CoursePhilosophy data={data} />
            <TypesofGame />
            <CourseStructure data={data} />
            <OfferCard data={data} />
        </main>
    );
}
