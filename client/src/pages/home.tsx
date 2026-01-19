import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { CourseCard } from "@/components/ui/course-card";
import { courses, tracks } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlayCircle, CheckCircle2, Zap, BookOpen, Clock } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const featuredCourses = courses.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 px-4 md:px-8 max-w-screen-2xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 text-center md:text-right">
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-primary border-primary/20 bg-primary/5 text-sm font-medium rounded-full w-fit mx-auto md:mx-0">
                🚀 منصة التعليم الأولى في الشرق الأوسط
              </Badge>
              <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl leading-tight text-foreground mb-6">
                استثمر في <span className="text-primary relative">
                  مستقبلك
                  <svg className="absolute w-full h-3 -bottom-1 right-0 text-emerald-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> <br />
                وتعلم مهارات جديدة
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                انضم إلى آلاف المتعلمين وطور مهاراتك في البرمجة، التصميم، التسويق، وإدارة الأعمال مع نخبة من الخبراء العرب.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/pricing">
                  <Button size="lg" className="h-14 px-8 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl">
                    ابدأ تجربتك المجانية
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-muted/50 rounded-xl">
                    تصفح الكورسات
                    <PlayCircle className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  شهادات معتمدة
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  مدربون محترفون
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  محتوى متجدد
                </span>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg md:max-w-none relative">
              <div className="relative z-10 bg-white dark:bg-card rounded-2xl p-4 shadow-2xl shadow-black/5 rotate-3 hover:rotate-0 transition-transform duration-500 border border-border/50">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
                  alt="Students learning" 
                  className="rounded-xl w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-xl shadow-xl border border-border/50 flex items-center gap-4 animate-bounce duration-[3000ms]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">50+</p>
                    <p className="text-xs text-muted-foreground">دورة جديدة شهرياً</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-primary rounded-2xl transform translate-x-4 translate-y-4 -z-10 opacity-20 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-8 max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "تعلم بسرعة", desc: "محتوى مكثف ومركز يوصلك للهدف بأقصر وقت ممكن دون حشو." },
              { icon: CheckCircle2, title: "جودة عالية", desc: "فيديوهات بجودة 4K وصوت نقي مع مونتاج احترافي لتجربة مريحة." },
              { icon: PlayCircle, title: "تطبيق عملي", desc: "مشاريع حقيقية وتطبيقات عملية تضمن لك فهم المادة العلمية." }
            ].map((feature, i) => (
              <div key={i} className="bg-muted/30 p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-20 bg-muted/20 border-y border-border/40">
        <div className="container px-4 md:px-8 max-w-screen-2xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">المسارات التعليمية</h2>
              <p className="text-muted-foreground">خطط دراسية متكاملة تأخذك من الصفر للاحتراف</p>
            </div>
            <Link href="/tracks">
              <Button variant="ghost" className="gap-2 hidden md:flex">
                عرض الكل <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => (
               <Link key={track.id} href={`/tracks`}>
                <div className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={track.image} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <p className="text-xs font-medium bg-primary px-2 py-1 rounded mb-2 w-fit">{track.level}</p>
                        <h3 className="font-bold text-lg">{track.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{track.description}</p>
                    <div className="flex items-center justify-between text-xs font-medium text-foreground/80">
                      <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-primary" /> {track.coursesCount} دورات</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> {track.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
           <div className="mt-8 text-center md:hidden">
            <Link href="/tracks">
              <Button variant="outline" className="w-full">عرض كل المسارات</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-8 max-w-screen-2xl">
           <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">أحدث الكورسات</h2>
              <p className="text-muted-foreground">اكتشف أحدث ما تم إضافته للمنصة</p>
            </div>
            <Link href="/courses">
              <Button variant="ghost" className="gap-2 hidden md:flex">
                تصفح المكتبة <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container px-4 md:px-8 max-w-screen-2xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">ابدأ رحلة التعلم اليوم</h2>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            احصل على وصول غير محدود لجميع الكورسات والمسارات باشتراك واحد بسيط.
          </p>
          <Link href="/pricing">
             <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-bold text-primary hover:bg-white rounded-xl shadow-2xl">
              اشترك الآن بـ 49 ر.س/شهر
            </Button>
          </Link>
          <p className="mt-6 text-sm text-primary-foreground/60">يمكنك إلغاء الاشتراك في أي وقت.</p>
        </div>
      </section>
    </Layout>
  );
}
