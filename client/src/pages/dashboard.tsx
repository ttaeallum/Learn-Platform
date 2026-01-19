import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Trophy, PlayCircle } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <Layout>
      <div className="bg-muted/30 py-8 border-b border-border/40">
        <div className="container px-4 md:px-8 max-w-screen-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
              MA
            </div>
            <div>
              <h1 className="text-2xl font-bold">مرحباً، محمد أحمد</h1>
              <p className="text-muted-foreground">واصل رحلة تعلمك اليوم!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">كورسات مسجلة</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ساعات تعلم</p>
                <p className="text-2xl font-bold">12.5</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">شهادات</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-8 max-w-screen-2xl py-8">
        <Tabs defaultValue="learning" className="space-y-8">
          <TabsList>
            <TabsTrigger value="learning">التعلم الحالي</TabsTrigger>
            <TabsTrigger value="completed">المكتملة</TabsTrigger>
            <TabsTrigger value="billing">الاشتراكات والفواتير</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learning" className="space-y-6">
            <h2 className="text-xl font-bold mb-4">أكمل من حيث توقفت</h2>
            {courses.slice(0, 2).map((course, idx) => (
              <div key={course.id} className="bg-card border border-border/50 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center">
                <img src={course.image} alt={course.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <span className="text-sm text-muted-foreground">{idx === 0 ? "45%" : "12%"}</span>
                  </div>
                  <Progress value={idx === 0 ? 45 : 12} className="h-2 mb-4" />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">الدرس القادم: مقدمة في الـ Grid System</p>
                    <Link href={`/lesson/${course.id}`}>
                       <Button size="sm" className="gap-2">
                        <PlayCircle className="w-4 h-4" />
                        تابع المشاهدة
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="text-center py-12 text-muted-foreground">
              لا توجد كورسات مكتملة بعد. واصل التقدم!
            </div>
          </TabsContent>
          
           <TabsContent value="billing">
            <div className="bg-card border border-border/50 rounded-xl p-6 max-w-2xl">
              <h3 className="font-bold text-lg mb-4">اشتراكك الحالي</h3>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-6">
                <div>
                  <p className="font-bold text-primary">الباقة الشهرية المميزة</p>
                  <p className="text-sm text-muted-foreground">تجديد تلقائي في 25 يناير 2026</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">49 ر.س</p>
                  <p className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1">نشط</p>
                </div>
              </div>
              <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10">إلغاء الاشتراك</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
