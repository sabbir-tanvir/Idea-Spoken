
import { img } from "motion/react-client"
import ResearchArea from "../ResearchArea"

export default function HomeResearch() {
    const researchCards = [
        {
            icon: (
                <img className="w-10  text-white" src="/home/attractions.png" alt="Calendar Icon" />
            ),
            title: "Full-Day Program",
            subtitle: "সকাল ৮টা – সন্ধ্যা ৬টা"
        },
        {
            icon: (
                <img className="w-10  text-white" src="/home/lightbulb_2.png" alt="Calendar Icon" />

            ),
            title: "Keynote Sessions",
            subtitle: "Inspiring Talks & Insights"
        },
        {
            icon: (
                <img className="w-10  text-white" src="/home/contacts_product.png" alt="Calendar Icon" />

            ),
            title: "Bootcamps",
            subtitle: "Interactive Workshops"
        },
        {
            icon: (
                <img className="w-10  text-white" src="/home/cognition_2.png" alt="Calendar Icon" />

            ),
            title: "Student Intensives",
            subtitle: "Online/Offline Sessions"
        }
    ]

    return (
        <ResearchArea
            heading="Research Areas"
            subheading="আমাদের সংবেষণার প্রধান ক্ষেত্রসমূহ"
            cards={researchCards}
        />
    )
}
