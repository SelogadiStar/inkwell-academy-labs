import { 
  users, type User, type InsertUser, 
  grades, type Grade, type InsertGrade,
  topics, type Topic, type InsertTopic,
  experiments, type Experiment, type InsertExperiment,
  materials, type Material, type InsertMaterial,
  resources, type Resource, type InsertResource,
  userExperiments, type UserExperiment, type InsertUserExperiment,
  achievements, type Achievement, type InsertAchievement,
  userAchievements, type UserAchievement, type InsertUserAchievement
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User CRUD
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Grade CRUD
  async getAllGrades(): Promise<Grade[]> {
    return db.select().from(grades);
  }
  
  async getGrade(id: number): Promise<Grade | undefined> {
    const [grade] = await db.select().from(grades).where(eq(grades.id, id));
    return grade || undefined;
  }
  
  async createGrade(insertGrade: InsertGrade): Promise<Grade> {
    const [grade] = await db
      .insert(grades)
      .values(insertGrade)
      .returning();
    return grade;
  }
  
  // Topic CRUD
  async getAllTopics(): Promise<Topic[]> {
    return db.select().from(topics);
  }
  
  async getTopicsByGradeId(gradeId: number): Promise<Topic[]> {
    return db.select().from(topics).where(eq(topics.gradeId, gradeId));
  }
  
  async getTopic(id: number): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic || undefined;
  }
  
  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const [topic] = await db
      .insert(topics)
      .values(insertTopic)
      .returning();
    return topic;
  }
  
  // Experiment CRUD
  async getAllExperiments(): Promise<Experiment[]> {
    return db.select().from(experiments);
  }
  
  async getExperimentsByGradeId(gradeId: number): Promise<Experiment[]> {
    return db.select().from(experiments).where(eq(experiments.gradeId, gradeId));
  }
  
  async getExperimentsByTopicId(topicId: number): Promise<Experiment[]> {
    return db.select().from(experiments).where(eq(experiments.topicId, topicId));
  }
  
  async getExperiment(id: number): Promise<Experiment | undefined> {
    const [experiment] = await db.select().from(experiments).where(eq(experiments.id, id));
    return experiment || undefined;
  }
  
  async createExperiment(insertExperiment: InsertExperiment): Promise<Experiment> {
    const [experiment] = await db
      .insert(experiments)
      .values(insertExperiment)
      .returning();
    return experiment;
  }
  
  // Material CRUD
  async getMaterialsByExperimentId(experimentId: number): Promise<Material[]> {
    return db.select().from(materials).where(eq(materials.experimentId, experimentId));
  }
  
  async createMaterial(insertMaterial: InsertMaterial): Promise<Material> {
    const [material] = await db
      .insert(materials)
      .values(insertMaterial)
      .returning();
    return material;
  }
  
  // Resource CRUD
  async getResourcesByExperimentId(experimentId: number): Promise<Resource[]> {
    return db.select().from(resources).where(eq(resources.experimentId, experimentId));
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db
      .insert(resources)
      .values(insertResource)
      .returning();
    return resource;
  }

  // User Progress Tracking
  async getUserExperiments(userId: number): Promise<UserExperiment[]> {
    const userExps = await db
      .select()
      .from(userExperiments)
      .where(eq(userExperiments.userId, userId));
    return userExps;
  }

  async getCompletedExperiments(userId: number): Promise<(UserExperiment & { experiment: Experiment })[]> {
    const userExps = await db
      .select({
        userExperiment: userExperiments,
        experiment: experiments
      })
      .from(userExperiments)
      .where(eq(userExperiments.userId, userId))
      .innerJoin(experiments, eq(userExperiments.experimentId, experiments.id));
    
    // Transform the result to match the expected return type
    return userExps.map(({ userExperiment, experiment }) => ({
      ...userExperiment,
      experiment
    }));
  }

  async markExperimentComplete(insertUserExperiment: InsertUserExperiment): Promise<UserExperiment> {
    const [userExperiment] = await db
      .insert(userExperiments)
      .values(insertUserExperiment)
      .returning();
    return userExperiment;
  }

  async updateExperimentProgress(id: number, userExperiment: Partial<InsertUserExperiment>): Promise<UserExperiment> {
    const [updatedUserExperiment] = await db
      .update(userExperiments)
      .set(userExperiment)
      .where(eq(userExperiments.id, id))
      .returning();
    return updatedUserExperiment;
  }

  // Achievements
  async getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const userAchs = await db
      .select({
        userAchievement: userAchievements,
        achievement: achievements
      })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id));
    
    // Transform the result to match the expected return type
    return userAchs.map(({ userAchievement, achievement }) => ({
      ...userAchievement,
      achievement
    }));
  }

  async getAchievementsByCategory(category: string): Promise<Achievement[]> {
    const achs = await db
      .select()
      .from(achievements)
      .where(eq(achievements.category, category));
    return achs;
  }

  async unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement> {
    // First check if the user already has this achievement
    const [existing] = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .where(eq(userAchievements.achievementId, achievementId));
    
    if (existing) {
      // If exists, just update unlockedAt to now
      const [updated] = await db
        .update(userAchievements)
        .set({ unlockedAt: new Date() })
        .where(eq(userAchievements.id, existing.id))
        .returning();
      return updated;
    } else {
      // Otherwise create a new entry
      const [userAchievement] = await db
        .insert(userAchievements)
        .values({
          userId,
          achievementId,
          progress: 100, // Full progress since it's being unlocked
        })
        .returning();
      return userAchievement;
    }
  }

  async updateAchievementProgress(userId: number, achievementId: number, progress: number): Promise<UserAchievement> {
    // First check if the user already has this achievement in progress
    const [existing] = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .where(eq(userAchievements.achievementId, achievementId));
    
    if (existing) {
      // Update the progress
      const [updated] = await db
        .update(userAchievements)
        .set({ 
          progress,
          // If progress is 100%, also set unlockedAt to now
          ...(progress >= 100 ? { unlockedAt: new Date() } : {})
        })
        .where(eq(userAchievements.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create a new entry
      const [userAchievement] = await db
        .insert(userAchievements)
        .values({
          userId,
          achievementId,
          progress,
          // If progress is 100%, also set unlockedAt to now
          ...(progress >= 100 ? { unlockedAt: new Date() } : {})
        })
        .returning();
      return userAchievement;
    }
  }
}