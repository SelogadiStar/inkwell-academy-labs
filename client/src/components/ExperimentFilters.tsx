import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TOPICS } from "@/lib/constants";
import { GRADES } from "@/lib/constants";

type ExperimentFiltersProps = {
  selectedGrade: number;
  selectedTopic: number | null;
  setSelectedTopic: (topicId: number | null) => void;
};

export default function ExperimentFilters({ 
  selectedGrade, 
  selectedTopic, 
  setSelectedTopic 
}: ExperimentFiltersProps) {
  const { data: grades = [] } = useQuery({ 
    queryKey: ['/api/grades'],
    initialData: GRADES,
  });

  const { data: topics = [] } = useQuery({
    queryKey: ['/api/topics/grade', selectedGrade],
    initialData: selectedGrade ? TOPICS[`grade${grades.find(g => g.id === selectedGrade)?.number}`] : [],
  });

  const selectedGradeObj = grades.find(g => g.id === selectedGrade);
  const gradeNumber = selectedGradeObj?.number || 7;

  return (
    <section className="py-6 bg-lightBg">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className={`font-roboto font-medium text-lg text-grade${gradeNumber} mb-3`}>
            {selectedGradeObj?.name} Curriculum Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            <button 
              className={`${
                selectedTopic === null 
                  ? `bg-grade${gradeNumber} bg-opacity-10 text-grade${gradeNumber}` 
                  : 'bg-gray-100'
              } rounded-full px-4 py-1.5 text-sm font-medium hover:bg-grade${gradeNumber} hover:bg-opacity-10 hover:text-grade${gradeNumber}`}
              onClick={() => setSelectedTopic(null)}
            >
              All Topics
            </button>
            {topics.map((topic) => (
              <button 
                key={topic.id}
                className={`${
                  selectedTopic === topic.id 
                    ? `bg-grade${gradeNumber} bg-opacity-10 text-grade${gradeNumber}` 
                    : 'bg-gray-100'
                } rounded-full px-4 py-1.5 text-sm font-medium hover:bg-grade${gradeNumber} hover:bg-opacity-10 hover:text-grade${gradeNumber}`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
