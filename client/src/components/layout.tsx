import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/tracks", label: "المسارات" },
    { href: "/courses", label: "جميع الكورسات" },
    { href: "/pricing", label: "الأسعار" },
    { href: "/blog", label: "المدونة" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-heading font-bold text-2xl text-primary hover:opacity-90 transition-opacity">
            <span>تعلّم</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.href)
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/auth">
            <Button variant="ghost">تسجيل الدخول</Button>
          </Link>
          <Link href="/pricing">
            <Button>اشترك الآن</Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
           <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a
                        className={cn(
                          "text-lg font-medium py-2 transition-colors hover:text-primary border-b border-border/50",
                          isActive(link.href)
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button className="w-full" onClick={() => setIsMenuOpen(false)}>اشترك الآن</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="container max-w-screen-2xl py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-2xl text-primary">تعلّم</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              منصتك الأولى لتعلم المهارات الرقمية والتقنية في الشرق الأوسط. انضم إلينا وابدأ رحلة مستقبلك اليوم.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground">روابط سريعة</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/tracks"><a className="hover:text-primary transition-colors">المسارات التعليمية</a></Link>
              <Link href="/courses"><a className="hover:text-primary transition-colors">تصفح الكورسات</a></Link>
              <Link href="/pricing"><a className="hover:text-primary transition-colors">الأسعار والاشتراكات</a></Link>
              <Link href="/blog"><a className="hover:text-primary transition-colors">المدونة</a></Link>
            </div>
          </div>

           <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground">الدعم والمساعدة</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/faq"><a className="hover:text-primary transition-colors">الأسئلة الشائعة</a></Link>
              <Link href="/contact"><a className="hover:text-primary transition-colors">اتصل بنا</a></Link>
              <Link href="/terms"><a className="hover:text-primary transition-colors">الشروط والأحكام</a></Link>
              <Link href="/privacy"><a className="hover:text-primary transition-colors">سياسة الخصوصية</a></Link>
            </div>
          </div>

           <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground">تواصل معنا</h4>
            <p className="text-sm text-muted-foreground">تابعنا على وسائل التواصل الاجتماعي للحصول على آخر التحديثات.</p>
            {/* Social Icons Mockup */}
            <div className="flex gap-4 mt-2">
               <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                 <span className="sr-only">Twitter</span>
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
               </div>
               <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                 <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.047-1.41.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h.165zm-1.8 1.838a3.158 3.158 0 01-1.927.886 4.004 4.004 0 01-1.307.258c-2.61.027-3.11.056-3.524.238-.344.152-.593.33-.822.56-.23.23-.408.479-.56.822-.182.414-.21.914-.238 3.525-.027 2.61.002 2.964.027 3.524.027.56.056.914.238 1.307.152.344.33.593.56.822.23.23.479.408.822.56.414.182.914.21 3.525.238 2.61.027 2.964.002 3.524.027.56.027.914.056 1.307.238.344.152.593.33.822.56.23.23.408.479.56.822.182.414.21.914.238 3.525.027 2.61.002 2.964.027 3.524.027.56.056.914.238 1.307.152.344.33.593.56.822.23.23.479.408.822.56.414.182.914.21 3.525.238 2.61.027 2.964.002 3.524.027.56.027.914.056 1.307.238.344.152.593.33.822.56.23.23.408.479.56.822.182.414.21.914.238 3.525-.027 2.61-.002 2.964-.027 3.524-.027.56-.056.914-.238 1.307-.152.344-.33.593-.56.822-.23-.23-.479-.408-.822-.56-.414-.182-.914-.21-3.525-.238-2.61-.027-2.964-.002-3.524-.027-.56-.027-.914-.056-1.307-.238a3.158 3.158 0 01-.822-.56 3.158 3.158 0 01-.56-.822c-.182-.414-.21-.914-.238-3.525-.027-2.61-.002-2.964-.027-3.524zM12 6.666a5.334 5.334 0 110 10.668 5.334 5.334 0 010-10.668zm0 1.838a3.496 3.496 0 100 6.992 3.496 3.496 0 000-6.992zm5.334-3.466a1.222 1.222 0 110 2.444 1.222 1.222 0 010-2.444z" clipRule="evenodd" /></svg>
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} منصة تعلّم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
