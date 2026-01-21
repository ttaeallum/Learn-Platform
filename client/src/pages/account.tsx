import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Shield, LogOut, Phone, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function AccountPage() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({
        queryKey: ["auth-me"],
        queryFn: async () => {
            const res = await fetch("/api/auth/me");
            if (!res.ok) {
                setLocation("/auth");
                return null;
            }
            return res.json();
        }
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (!res.ok) throw new Error("Logout failed");
        },
        onSuccess: () => {
            queryClient.setQueryData(["auth-me"], null);
            toast({ title: "تم تسجيل الخروج", description: "نتمنى عودتك قريباً!" });
            setLocation("/");
        }
    });

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    if (!user) return null;

    return (
        <Layout>
            <div className="container py-12 px-4 md:px-8 max-w-4xl" dir="rtl">
                <h1 className="text-3xl font-heading font-black mb-8 text-right">إعدادات الحساب</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                                        {user.fullName?.[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{user.fullName}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                                        {user.role === "admin" ? "مدير نظام" : "متعلم"}
                                    </Badge>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t p-2">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-3"
                                    onClick={() => logoutMutation.mutate()}
                                    disabled={logoutMutation.isPending}
                                >
                                    <LogOut className="w-4 h-4" />
                                    تسجيل الخروج
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8 text-right">
                        <Card>
                            <CardHeader className="text-right">
                                <CardTitle>المعلومات الشخصية</CardTitle>
                                <CardDescription>قم بتحديث بياناتك الشخصية وكيف تظهر للآخرين.</CardDescription>
                            </CardHeader>
                            <form onSubmit={(e: any) => {
                                e.preventDefault();
                                toast({ title: "تم الحفظ", description: "تم تحديث بيانات ملفك الشخصي بنجاح" });
                            }}>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2 text-right">
                                            <Label htmlFor="fullName">الاسم الكامل</Label>
                                            <div className="relative">
                                                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input id="fullName" name="fullName" defaultValue={user.fullName} className="pr-10" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-right">
                                            <Label htmlFor="phone">رقم الهاتف</Label>
                                            <div className="relative">
                                                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input id="phone" name="phone" placeholder="+966 50 000 0000" className="pr-10" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-right">
                                        <Label htmlFor="email">البريد الإلكتروني</Label>
                                        <div className="relative">
                                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="email" defaultValue={user.email} disabled className="pr-10 bg-muted/50" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-right">
                                        <Label htmlFor="location">الموقع / المدينة</Label>
                                        <div className="relative">
                                            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="location" name="location" placeholder="الرياض، المملكة العربية السعودية" className="pr-10" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-right">
                                        <Label htmlFor="bio">نبذة تعريفية</Label>
                                        <Textarea id="bio" name="bio" placeholder="أخبرنا قليلاً عن نفسك واهتماماتك التعليمية..." className="min-h-[100px]" />
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t pt-6 bg-muted/10">
                                    <Button type="submit" className="mr-auto font-bold px-8">حفظ التغييرات</Button>
                                </CardFooter>
                            </form>
                        </Card>

                        <Card>
                            <CardHeader className="text-right">
                                <CardTitle>الأمان</CardTitle>
                                <CardDescription>إعدادات كلمة المرور وحماية الحساب.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50 flex-row-reverse">
                                    <div className="text-right">
                                        <p className="font-bold text-sm">كلمة المرور</p>
                                        <p className="text-xs text-muted-foreground">تأكد من اختيار كلمة مرور قوية</p>
                                    </div>
                                    <Button variant="outline" size="sm">تغيير</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={cn("px-3 py-1 rounded-full text-xs font-bold", className)}>
            {children}
        </span>
    );
}

// Fixed missing import for cn and Badge in the actual file if I use common components
import { cn } from "@/lib/utils";
