import { Layout } from "@/components/layout";
import { CourseCard } from "@/components/ui/course-card";
import { courses } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Courses() {
  return (
    <Layout>
      <div className="bg-muted/30 py-12 border-b border-border/40">
        <div className="container px-4 md:px-8 max-w-screen-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">تصفح الكورسات</h1>
              <p className="text-muted-foreground">اكتشف مئات الكورسات في مختلف المجالات التقنية والإبداعية</p>
            </div>
            
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="ابحث عن كورس..." className="pr-10 bg-background" />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-8 max-w-screen-2xl py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Mock) */}
          <div className="hidden lg:block w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold mb-4">التصنيف</h3>
              <div className="space-y-2">
                {["الكل", "تصميم", "برمجة", "تسويق", "أعمال", "بيانات"].map((cat) => (
                  <div key={cat} className="flex items-center gap-2">
                    <input type="checkbox" id={cat} className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor={cat} className="text-sm text-foreground/80 cursor-pointer">{cat}</label>
                  </div>
                ))}
              </div>
            </div>
            
             <div>
              <h3 className="font-bold mb-4">المستوى</h3>
              <div className="space-y-2">
                {["مبتدئ", "متوسط", "متقدم"].map((lvl) => (
                  <div key={lvl} className="flex items-center gap-2">
                    <input type="checkbox" id={lvl} className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor={lvl} className="text-sm text-foreground/80 cursor-pointer">{lvl}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground text-sm">عرض {courses.length} كورس</p>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {/* Duplicate courses to fill the grid for demo */}
              {courses.map((course) => (
                <CourseCard key={`dup-${course.id}`} course={{...course, id: `dup-${course.id}`}} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="min-w-[200px]">تحميل المزيد</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
