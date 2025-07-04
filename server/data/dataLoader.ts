import { db } from "../db";
import { initialGrades, initialTopics, initialExperiments } from "./initialData";
import { 
  grades, 
  topics, 
  experiments,
  InsertGrade, 
  InsertTopic, 
  InsertExperiment 
} from "@shared/schema";
import { eq } from "drizzle-orm";

// Map to store grade IDs
const gradeIdMap = new Map<number, number>();
// Map to store topic IDs by name and grade
const topicIdMap = new Map<string, number>();

export async function loadInitialData() {
  console.log("Starting to load initial data...");
  
  try {
    // First check if data already exists
    const existingGrades = await db.select().from(grades);
    if (existingGrades.length > 0) {
      console.log("Data already loaded, skipping...");
      return;
    }
    
    // Load grades
    await loadGrades();
    
    // Load topics (needs grades to be loaded first)
    await loadTopics();
    
    // Load experiments (needs topics and grades to be loaded first)
    await loadExperiments();
    
    console.log("Initial data loaded successfully!");
  } catch (error) {
    console.error("Error loading initial data:", error);
  }
}

async function loadGrades() {
  console.log("Loading grades...");
  
  for (const grade of initialGrades) {
    const [insertedGrade] = await db.insert(grades).values(grade).returning();
    gradeIdMap.set(grade.number, insertedGrade.id);
    console.log(`Grade ${grade.number} loaded with ID ${insertedGrade.id}`);
  }
}

async function loadTopics() {
  console.log("Loading topics...");
  
  for (const topic of initialTopics) {
    // Get the grade ID based on the grade number
    const gradeId = gradeIdMap.get(topic.gradeNumber);
    
    if (!gradeId) {
      console.error(`Grade ID not found for grade number ${topic.gradeNumber}`);
      continue;
    }
    
    // Prepare the topic data without the gradeNumber field
    const { gradeNumber, ...topicData } = topic;
    const insertTopic: InsertTopic = {
      ...topicData,
      gradeId
    };
    
    const [insertedTopic] = await db.insert(topics).values(insertTopic).returning();
    
    // Store the topic ID with a composite key of topic name and grade ID
    const topicKey = `${topic.name}-${gradeId}`;
    topicIdMap.set(topicKey, insertedTopic.id);
    console.log(`Topic ${topic.name} loaded with ID ${insertedTopic.id} for grade ${gradeNumber}`);
  }
}

async function loadExperiments() {
  console.log("Loading experiments...");
  
  for (const experiment of initialExperiments) {
    // Get the topic ID based on the topic name and grade ID
    const topicKey = `${experiment.topicName}-${experiment.gradeId}`;
    const topicId = topicIdMap.get(topicKey);
    
    if (!topicId) {
      console.error(`Topic ID not found for topic ${experiment.topicName} in grade ${experiment.gradeId}`);
      continue;
    }
    
    // Prepare the experiment data without the topicName field
    const { topicName, ...experimentData } = experiment;
    
    // Placeholder for image URLs if they don't exist yet
    const imageUrl = experimentData.imageUrl || `/images/experiments/placeholder-${experiment.gradeId}.jpg`;
    
    const insertExperiment: InsertExperiment = {
      ...experimentData,
      topicId,
      imageUrl
    };
    
    // Insert experiment to the database
    const [insertedExperiment] = await db.insert(experiments).values(insertExperiment).returning();
    console.log(`Experiment ${experiment.title} loaded with ID ${insertedExperiment.id}`);
  }
}