import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ضروري لعمل الـ sessions
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                toast({
                    title: "تم تسجيل الدخول",
                    description: "مرحباً بك في لوحة تحكم الأدمن",
                });
                setLocation("/admin/dashboard"); // التوجيه الصحيح للوحة التحكم
            } else {
                const data = await response.json();
                toast({
                    title: "فشل الدخول",
                    description: data.message || "اسم المستخدم أو كلمة المرور غير صحيحة",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء محاولة الاتصال بالخادم",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md shadow-2xl border-primary/10">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Lock className="w-8 h-8" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">تسجيل دخول الأدمن</CardTitle>
                        <CardDescription>
                            البيانات يتم جلبها والتحقق منها عبر ملف البيئة الخاص بك
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    placeholder="اسم المستخدم"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="h-12"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    placeholder="كلمة المرور"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 font-bold text-lg"
                                disabled={loading}
                            >
                                {loading ? "جاري التحقق..." : "دخول"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
