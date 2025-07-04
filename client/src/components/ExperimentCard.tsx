import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExperimentType, TopicType, GradeType } from "@/lib/constants";

type ExperimentCardProps = {
  experiment: ExperimentType;
  topic: TopicType;
  grade: GradeType;
};

export default function ExperimentCard({ experiment, topic, grade }: ExperimentCardProps) {
  return (
    <Card className="experiment-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <img 
        src={experiment.imageUrl} 
        alt={`${experiment.title} experiment setup`} 
        className="w-full h-48 object-cover" 
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-roboto font-medium text-lg text-darkText">{experiment.title}</h3>
          <span 
            className={`bg-grade${grade.number} text-white text-xs px-2 py-1 rounded-full`}
            style={{ backgroundColor: grade.color }}
          >
            {topic.name}
          </span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{experiment.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-sm mr-1">schedule</span>
            <span className="text-xs text-gray-500">{experiment.duration}</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-sm mr-1">science</span>
            <span className="text-xs text-gray-500">CAPS aligned</span>
          </div>
        </div>
        <Link href={`/experiments/${experiment.id}`}>
          <Button 
            className="mt-4 w-full text-white rounded-full py-2 font-medium text-sm hover:bg-opacity-90"
            style={{ backgroundColor: grade.color }}
          >
            View Experiment
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
