import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, DollarSign, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function AdminDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await fetch("/api/admin-panel/stats");
            if (!res.ok) throw new Error("Failed to fetch stats");
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-32 rounded-xl" />
                        ))}
                    </div>
                    <Skeleton className="h-[400px] rounded-xl" />
                </div>
            </AdminLayout>
        );
    }

    const { stats, recentActivity } = data;

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">نظرة عامة</h1>
                    <p className="text-muted-foreground">مرحباً بك في لوحة تحكم المنصة.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="إجمالي المستخدمين" value={stats.users} icon={Users} color="text-blue-500" />
                    <StatCard title="الكورسات النشطة" value={stats.courses} icon={BookOpen} color="text-emerald-500" />
                    <StatCard title="إجمالي الالتحاقات" value={stats.enrollments} icon={GraduationCap} color="text-amber-500" />
                    <StatCard title="الإيرادات" value={`${stats.revenue} ر.س`} icon={DollarSign} color="text-primary" />
                </div>

                {/* Recent Activity */}
                <Card className="border-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <History className="w-5 h-5" />
                            أحدث العمليات
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentActivity.map((log: any) => (
                                <div key={log.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                    <div className={cn(
                                        "mt-1 w-2 h-2 rounded-full",
                                        log.action === "CREATE" ? "bg-emerald-500" : log.action === "UPDATE" ? "bg-blue-500" : "bg-destructive"
                                    )} />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">
                                            قام {log.adminId} بـ {log.action === "CREATE" ? "إضافة" : log.action === "UPDATE" ? "تعديل" : "حذف"} {log.entityType}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {format(new Date(log.createdAt), "PPP p", { locale: ar })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {recentActivity.length === 0 && (
                                <p className="text-center py-8 text-muted-foreground">لا توجد سجلات حالياً.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <Card className="border-primary/5 hover:border-primary/20 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className={cn("w-5 h-5", color)} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}

import { cn } from "@/lib/utils";
