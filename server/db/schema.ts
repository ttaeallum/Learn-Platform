import { pgTable, text, timestamp, uuid, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Users Table
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").default("user").notNull(), // user, admin
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at"),
});

// 2. Categories Table
export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Courses Table
export const courses = pgTable("courses", {
    id: uuid("id").defaultRandom().primaryKey(),
    categoryId: uuid("category_id").references(() => categories.id),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    thumbnail: text("thumbnail"),
    price: decimal("price", { precision: 10, scale: 2 }).default("0.00").notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    instructor: text("instructor").notNull(),
    level: text("level").default("beginner").notNull(), // beginner, intermediate, advanced
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 4. Sections Table (e.g., Chapter 1, Chapter 2)
export const sections = pgTable("sections", {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Lessons Table
export const lessons = pgTable("lessons", {
    id: uuid("id").defaultRandom().primaryKey(),
    sectionId: uuid("section_id").references(() => sections.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    content: text("content"),
    videoUrl: text("video_url"),
    duration: integer("duration").default(0), // in minutes
    order: integer("order").notNull(),
    isFree: boolean("is_free").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. Enrollments Table
export const enrollments = pgTable("enrollments", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
    progress: integer("progress").default(0).notNull(), // 0-100%
});

// 7. Orders/Payments Table
export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    courseId: uuid("course_id").references(() => courses.id).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    status: text("status").default("pending").notNull(), // pending, completed, failed
    paymentId: text("payment_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. Admin Audit Logs
export const adminAuditLogs = pgTable("admin_audit_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    adminId: text("admin_username").notNull(), // since admin is via env, we store the username
    action: text("action").notNull(), // CREATE, UPDATE, DELETE
    entityType: text("entity_type").notNull(), // Course, Category, etc.
    entityId: text("entity_id"),
    details: jsonb("details"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Relations ---

export const categoriesRelations = relations(categories, ({ many }) => ({
    courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
    category: one(categories, {
        fields: [courses.categoryId],
        references: [categories.id],
    }),
    sections: many(sections),
    enrollments: many(enrollments),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
    course: one(courses, {
        fields: [sections.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
    section: one(sections, {
        fields: [lessons.sectionId],
        references: [sections.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    enrollments: many(enrollments),
    orders: many(orders),
}));
