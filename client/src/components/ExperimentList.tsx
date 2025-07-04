import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ExperimentCard from "./ExperimentCard";
import { GRADES, TOPICS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type ExperimentListProps = {
  selectedGrade: number;
  selectedTopic: number | null;
  searchQuery: string;
};

export default function ExperimentList({ selectedGrade, selectedTopic, searchQuery }: ExperimentListProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const { data: grades = [] } = useQuery({ 
    queryKey: ['/api/grades'],
    initialData: GRADES,
  });

  const selectedGradeObj = grades.find(g => g.id === selectedGrade) || GRADES[0];
  const gradeNumber = selectedGradeObj?.number || 7;

  const { data: topics = [] } = useQuery({
    queryKey: ['/api/topics/grade', selectedGrade],
    initialData: TOPICS[`grade${gradeNumber}`],
  });

  const queryKey = selectedTopic 
    ? ['/api/experiments/topic', selectedTopic] 
    : ['/api/experiments/grade', selectedGrade];

  const { data: experiments = [] } = useQuery({
    queryKey,
  });

  const filteredExperiments = experiments.filter(exp => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      exp.title.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query)
    );
  });

  const visibleExperiments = filteredExperiments.slice(0, visibleCount);
  const hasMore = filteredExperiments.length > visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section className="py-8 bg-lightBg">
      <div className="container mx-auto px-4">
        <h2 className="font-roboto font-bold text-2xl text-darkText mb-6">
          {selectedGradeObj?.name} Experiments
          {selectedTopic && ` - ${topics.find(t => t.id === selectedTopic)?.name}`}
          {searchQuery && ` - Search: "${searchQuery}"`}
        </h2>
        
        {filteredExperiments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <span className="material-icons text-gray-400 text-5xl mb-4">search_off</span>
            <h3 className="font-roboto font-medium text-xl text-darkText mb-2">No experiments found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No experiments match your search query "${searchQuery}".` 
                : "No experiments available for the selected filters."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleExperiments.map((experiment) => {
                const topic = topics.find(t => t.id === experiment.topicId) || topics[0];
                return (
                  <ExperimentCard 
                    key={experiment.id} 
                    experiment={experiment} 
                    topic={topic} 
                    grade={selectedGradeObj}
                  />
                );
              })}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button 
                  className="bg-white border border-gray-300 rounded-full px-6 py-2 font-medium text-gray-600 hover:bg-gray-50 flex items-center"
                  onClick={loadMore}
                >
                  Load More Experiments
                  <span className="material-icons ml-2">expand_more</span>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
