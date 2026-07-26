
import { MapPin, Sparkles, BookOpen } from "lucide-react"
import ResearchArea from "../ResearchArea"

export default function BanglaPithaResearch() {
    const researchCards = [
        {
            icon: (
                <MapPin className="w-8 h-8 text-white" />
            ),
            title: "আঞ্চলিক পিঠা কে পুনরুদ্ধার",
            subtitle: "দেশের বিভিন্ন অঞ্চলের ঐতিহ্যবাহী ও বিলুপ্তপ্রায় পিঠা পুনরুদ্ধার"
        },
        {
            icon: (
                <Sparkles className="w-8 h-8 text-white" />
            ),
            title: "স্বাস্থ্যসম্মত পিঠা উদ্ভাবন",
            subtitle: "ঋতু, বয়স ও চাহিদা ভেদে স্বাস্থ্যসম্মত পিঠা উদ্ভাবন"
        },
        {
            icon: (
                <BookOpen className="w-8 h-8 text-white" />
            ),
            title: "সকল পিঠার রেসিপি সংরক্ষণ",
            subtitle: "ঐতিহ্যবাহী সকল পিঠার তথ্য ও রেসিপি ডিজিটাল উপায়ে সংরক্ষণ"
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
