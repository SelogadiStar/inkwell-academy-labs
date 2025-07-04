import { pgTable, text, serial, integer, boolean, timestamp, varchar, real, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  identityNumber: text("identity_number"),
  homeAddress: text("home_address"),
  cellphoneNumber: text("cellphone_number"),
  schoolName: text("school_name"),
  grade: integer("grade"),
  subjects: text("subjects").array(),
  desiredProfession: text("desired_profession"),
  aboutYourself: text("about_yourself"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("inactive"),
  subscriptionTier: text("subscription_tier"),
  subscriptionExpiryDate: timestamp("subscription_expiry_date"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  identityNumber: true,
  homeAddress: true,
  cellphoneNumber: true,
  schoolName: true,
  grade: true,
  subjects: true,
  desiredProfession: true,
  aboutYourself: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  durationMonths: integer("duration_months").notNull(),
  price: numeric("price").notNull(),
  freeTrialDays: integer("free_trial_days").default(0),
  features: text("features").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).pick({
  name: true,
  description: true,
  durationMonths: true,
  price: true,
  freeTrialDays: true,
  features: true,
  isActive: true,
});

export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

export const scienceFacts = pgTable("science_facts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  source: text("source"),
  likeCount: integer("like_count").default(0),
  shareCount: integer("share_count").default(0),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertScienceFactSchema = createInsertSchema(scienceFacts).pick({
  content: true,
  category: true,
  source: true,
});

export type InsertScienceFact = z.infer<typeof insertScienceFactSchema>;
export type ScienceFact = typeof scienceFacts.$inferSelect;

export const userScienceFactInteractions = pgTable("user_science_fact_interactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  factId: integer("fact_id").notNull(),
  liked: boolean("liked").default(false),
  shared: boolean("shared").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertInteractionSchema = createInsertSchema(userScienceFactInteractions).pick({
  userId: true,
  factId: true,
  liked: true,
  shared: true,
});

export const grades = pgTable("grades", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  name: text("name").notNull(),
  color: text("color").notNull(),
});

export const insertGradeSchema = createInsertSchema(grades).pick({
  number: true,
  name: true,
  color: true,
});

export type InsertGrade = z.infer<typeof insertGradeSchema>;
export type Grade = typeof grades.$inferSelect;

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gradeId: integer("grade_id").notNull(),
});

export const insertTopicSchema = createInsertSchema(topics).pick({
  name: true,
  gradeId: true,
});

export type InsertTopic = z.infer<typeof insertTopicSchema>;
export type Topic = typeof topics.$inferSelect;

export const experiments = pgTable("experiments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  imageUrl: text("image_url").notNull(),
  topicId: integer("topic_id").notNull(),
  gradeId: integer("grade_id").notNull(),
  procedure: text("procedure").notNull(),
  objective: text("objective"),
  curriculumAlignment: text("curriculum_alignment").notNull(),
  learningOutcomes: text("learning_outcomes").notNull(),
  extensionActivities: text("extension_activities"),
  safetyPrecautions: text("safety_precautions"),
  materialsList: text("materials_list"),
  socialMediaScript: text("social_media_script"),
  visualRepresentation: text("visual_representation"),
  arModelUrl: text("ar_model_url"),
  hasArModel: boolean("has_ar_model").default(false),
  arModelType: text("ar_model_type"), // Type could be 'gltf', 'usdz', etc.
  arMarkerImageUrl: text("ar_marker_image_url"), // For marker-based AR
  arInstructions: text("ar_instructions"), // Instructions for viewing AR content
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExperimentSchema = createInsertSchema(experiments).omit({
  id: true,
  createdAt: true,
});

export type InsertExperiment = z.infer<typeof insertExperimentSchema>;
export type Experiment = typeof experiments.$inferSelect;

export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  experimentId: integer("experiment_id").notNull(),
});

export const insertMaterialSchema = createInsertSchema(materials).pick({
  name: true,
  experimentId: true,
});

export type InsertMaterial = z.infer<typeof insertMaterialSchema>;
export type Material = typeof materials.$inferSelect;

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  experimentId: integer("experiment_id").notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  name: true,
  type: true,
  url: true,
  experimentId: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export const userExperiments = pgTable("user_experiments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  experimentId: integer("experiment_id").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
  rating: integer("rating"),
  notes: text("notes"),
  timeSpent: integer("time_spent"), // Time spent in minutes
  difficulty: integer("difficulty"), // User's perception of difficulty (1-5)
  favorite: boolean("favorite").default(false),
});

export const insertUserExperimentSchema = createInsertSchema(userExperiments).pick({
  userId: true,
  experimentId: true,
  rating: true,
  notes: true,
  timeSpent: true,
  difficulty: true,
  favorite: true,
});

export type InsertUserExperiment = z.infer<typeof insertUserExperimentSchema>;
export type UserExperiment = typeof userExperiments.$inferSelect;

// Badges/achievements for progress tracking
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  category: text("category").notNull(), // e.g., "completion", "mastery", "exploration"
  requiredCount: integer("required_count"), // Number of experiments/tasks needed
  gradeId: integer("grade_id"), // If grade-specific, null for general achievements
  topicId: integer("topic_id"), // If topic-specific, null for general achievements
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAchievementSchema = createInsertSchema(achievements).pick({
  name: true,
  description: true,
  iconName: true,
  category: true,
  requiredCount: true,
  gradeId: true,
  topicId: true,
});

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

// User achievements tracking
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  progress: integer("progress").default(0), // Track partial progress toward achievement
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).pick({
  userId: true,
  achievementId: true,
  progress: true,
});

export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;
