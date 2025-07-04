export const GRADES = [
  { id: 1, number: 7, name: "Grade 7", color: "#4CAF50" },
  { id: 2, number: 8, name: "Grade 8", color: "#2196F3" },
  { id: 3, number: 9, name: "Grade 9", color: "#9C27B0" },
  { id: 4, number: 10, name: "Grade 10", color: "#F44336" },
  { id: 5, number: 11, name: "Grade 11", color: "#FF9800" },
  { id: 6, number: 12, name: "Grade 12", color: "#795548" }
];

export const TOPICS = {
  "grade7": [
    { id: 1, name: "Energy and Change", gradeId: 1 },
    { id: 2, name: "Matter and Materials", gradeId: 1 },
    { id: 3, name: "Life and Living", gradeId: 1 },
    { id: 4, name: "Earth and Beyond", gradeId: 1 }
  ],
  "grade8": [
    { id: 5, name: "Energy and Change", gradeId: 2 },
    { id: 6, name: "Matter and Materials", gradeId: 2 },
    { id: 7, name: "Life and Living", gradeId: 2 },
    { id: 8, name: "Earth and Beyond", gradeId: 2 }
  ],
  "grade9": [
    { id: 9, name: "Energy and Change", gradeId: 3 },
    { id: 10, name: "Matter and Materials", gradeId: 3 },
    { id: 11, name: "Life and Living", gradeId: 3 },
    { id: 12, name: "Earth and Beyond", gradeId: 3 }
  ],
  "grade10": [
    { id: 13, name: "Mechanics", gradeId: 4 },
    { id: 14, name: "Matter and Materials", gradeId: 4 },
    { id: 15, name: "Waves, Sound and Light", gradeId: 4 },
    { id: 16, name: "Chemical Systems", gradeId: 4 }
  ],
  "grade11": [
    { id: 17, name: "Mechanics", gradeId: 5 },
    { id: 18, name: "Matter and Materials", gradeId: 5 },
    { id: 19, name: "Waves, Sound and Light", gradeId: 5 },
    { id: 20, name: "Chemical Systems", gradeId: 5 }
  ],
  "grade12": [
    { id: 21, name: "Mechanics", gradeId: 6 },
    { id: 22, name: "Matter and Materials", gradeId: 6 },
    { id: 23, name: "Waves, Sound and Light", gradeId: 6 },
    { id: 24, name: "Chemical Systems", gradeId: 6 }
  ]
};

export type GradeType = {
  id: number;
  number: number;
  name: string;
  color: string;
};

export type TopicType = {
  id: number;
  name: string;
  gradeId: number;
};

export type ExperimentType = {
  id: number;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  topicId: number;
  gradeId: number;
  procedure: string;
  curriculumAlignment: string;
  learningOutcomes: string;
  extensionActivities: string;
  safetyPrecautions: string;
  createdAt: string;
  // AR Fields
  arModelUrl?: string;
  hasArModel?: boolean;
  arModelType?: string;
  arMarkerImageUrl?: string;
  arInstructions?: string;
  // Difficulty rating (1-5 scale)
  difficultyRating?: number;
  difficultyDescription?: string;
};

export type MaterialType = {
  id: number;
  name: string;
  experimentId: number;
};

export type ResourceType = {
  id: number;
  name: string;
  type: string;
  url: string;
  experimentId: number;
};

export type ProcedureStepType = {
  step: number;
  title: string;
  description: string;
};

export type CurriculumAlignmentType = {
  capsReference: string;
  learningOutcomes: string[];
};
