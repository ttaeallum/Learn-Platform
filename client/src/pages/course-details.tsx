import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/mock-data";
import { Link, useRoute } from "wouter";
import { Clock, BookOpen, Star, Users, CheckCircle, Share2, Play, PlayCircle } from "lucide-react";

export default function CourseDetails() {
  const [, params] = useRoute("/course/:id");
  const courseId = params?.id || "1";
  const course = courses.find(c => c.id === courseId) || courses[0];

  return (
    <Layout>
      <div className="bg-zinc-900 text-white py-12 md:py-16">
        <div className="container px-4 md:px-8 max-w-screen-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              <div className="flex gap-2">
                <Badge className="bg-primary hover:bg-primary/90 text-white border-none">{course.category}</Badge>
                <Badge variant="outline" className="text-zinc-300 border-zinc-700">{course.level}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">{course.title}</h1>
              <p className="text-lg text-zinc-300 max-w-3xl">
                تعلم المهارات الأساسية والمتقدمة في هذا المجال مع شرح عملي وتطبيقي. هذا الكورس سيأخذك من الصفر وحتى الاحتراف بخطوات مدروسة.
              </p>
              
              <div className="flex items-center gap-6 text-sm md:text-base text-zinc-300">
                <span className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> {course.rating} تقييم</span>
                <span className="flex items-center gap-2"><Users className="w-5 h-5" /> {course.students} طالب</span>
                <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {course.duration}</span>
              </div>
              
              <div className="flex items-center gap-3 pt-4">
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center font-bold">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-zinc-400">المدرب</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-[400px] bg-white text-zinc-900 rounded-2xl overflow-hidden shadow-2xl shrink-0 md:mt-10 lg:mt-0">
               <div className="relative aspect-video bg-zinc-200 group cursor-pointer">
                 <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                   <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                     <Play className="w-6 h-6 text-primary fill-current" />
                   </div>
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex justify-between items-center mb-6">
                   <span className="text-3xl font-bold">{course.price === 0 ? "49 ر.س" : `${course.price} ر.س`}</span>
                   <span className="text-sm text-muted-foreground line-through">199 ر.س</span>
                 </div>
                 
                 <Link href={`/lesson/${course.id}`}>
                   <Button className="w-full h-12 text-lg font-bold mb-3 shadow-lg shadow-primary/20">
                     اشترك الآن
                   </Button>
                 </Link>
                 <p className="text-center text-xs text-muted-foreground mb-6">ضمان استرداد الأموال لمدة 14 يوم</p>
                 
                 <div className="space-y-3">
                   <p className="font-bold text-sm">ماذا يتضمن الكورس؟</p>
                   {[
                     `${course.lessonsCount} درس فيديو عالي الجودة`,
                     "ملفات ومصادر للتحميل",
                     "وصول مدى الحياة",
                     "شهادة إتمام معتمدة"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                       <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                       {item}
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-8 max-w-screen-2xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">عن هذا الكورس</h2>
              <div className="prose max-w-none text-muted-foreground leading-relaxed">
                <p>
                  في هذا الكورس الشامل، ستتعلم كل ما تحتاجه للبدء في هذا المجال. تم تصميم المحتوى بعناية ليناسب جميع المستويات، بدءاً من الأساسيات وصولاً إلى التقنيات المتقدمة.
                </p>
                <p className="mt-4">
                  سيقوم المدرب بشرح المفاهيم النظرية ثم الانتقال مباشرة إلى التطبيق العملي من خلال مشاريع حقيقية ستقوم ببنائها خطوة بخطوة.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">محتوى الكورس</h2>
              <div className="border border-border/50 rounded-xl divide-y divide-border/50">
                {[1, 2, 3, 4].map((module) => (
                  <div key={module} className="p-4">
                    <div className="flex justify-between items-center mb-2 font-medium">
                      <h3>الوحدة {module}: أساسيات ومفاهيم</h3>
                      <span className="text-sm text-muted-foreground">4 دروس • 45 دقيقة</span>
                    </div>
                    <div className="space-y-2 mt-4 pl-4 border-r-2 border-border/50 mr-2 pr-4">
                      {[1, 2, 3].map((lesson) => (
                        <div key={lesson} className="flex items-center justify-between text-sm py-2 hover:bg-muted/30 rounded px-2 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <PlayCircle className="w-4 h-4 text-muted-foreground" />
                            <span>الدرس {lesson}: مقدمة وشرح عام</span>
                          </div>
                          <span className="text-muted-foreground text-xs">12:30</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
