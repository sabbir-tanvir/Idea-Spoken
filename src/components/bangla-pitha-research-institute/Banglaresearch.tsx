
import { BookOpen, Lightbulb, Home, Globe } from "lucide-react"
import ResearchArea from "../ResearchArea"

export default function BanglaPithaResearch() {
    const researchCards = [
        {
            icon: (
                <BookOpen className="w-8 h-8 text-white" />
            ),
            title: "ঐতিহ্যবাহী পিঠা",
            subtitle: "Professional Development Sessions"
        },
        {
            icon: (
                <Lightbulb className="w-8 h-8 text-white" />
            ),
            title: "আধুনিক ফিউশন",
            subtitle: "Traditional + Modern Combination"
        },
        {
            icon: (
                <Home className="w-8 h-8 text-white" />
            ),
            title: "স্বাস্থ্যকর বিকল্প",
            subtitle: "Low Sugar, Gluten-Free Options"
        },
        {
            icon: (
                <Globe className="w-8 h-8 text-white" />
            ),
            title: "আঞ্চলিক বৈচিত্র্য",
            subtitle: "৬৪ জেলার Unique পিঠা"
        }
    ]

    return (
        <ResearchArea
            heading="Research Areas"
            subheading="আমাদের গবেষণার প্রধান ক্ষেত্রসমূহ"
            cards={researchCards}
        />
    )
}
