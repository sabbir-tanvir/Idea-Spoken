import { getUserCourses } from "@/lib/api/courses";
import { getAuthToken, decodeToken } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import CourseMaterials from "@/components/dashborad/CourseMaterials";

export default async function MaterialsPage() {
  const token = await getAuthToken();
  if (!token) redirect("/auth/login");

  const courses = await getUserCourses(token);
  const user = decodeToken(token);

  const userName = user?.name ?? "Student";
  const userEmail = user?.email ?? "";
  const userRole =
    user?.role === "STUDENT" ? "Active Student" : (user?.role ?? "Student");

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <DashboardSidebar
              userName={userName}
              userEmail={userEmail}
              userStatus={userRole}
            />
          </div>

          {/* Main content */}
          <main className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Course Materials
              </h1>
              <p className="text-gray-600">
                All downloadable resources and links from your enrolled courses.
              </p>
            </div>

            {/* Materials */}
            <CourseMaterials courses={courses} />
          </main>
        </div>
      </div>
    </div>
  );
}
