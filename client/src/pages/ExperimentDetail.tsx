import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GRADES, TOPICS, type ProcedureStepType, type CurriculumAlignmentType } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import ARExperimentViewer from "@/components/ARExperimentViewer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ExperimentDetail() {
  const [, params] = useRoute("/experiments/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const [showARViewer, setShowARViewer] = useState(false);
  
  const { data: experiment, isLoading: isExperimentLoading } = useQuery({
    queryKey: ['/api/experiments', id],
  });

  const { data: materials = [], isLoading: isMaterialsLoading } = useQuery({
    queryKey: ['/api/experiments', id, 'materials'],
    enabled: !!id,
  });

  const { data: resources = [], isLoading: isResourcesLoading } = useQuery({
    queryKey: ['/api/experiments', id, 'resources'],
    enabled: !!id,
  });
  
  const { data: grades = [] } = useQuery({ 
    queryKey: ['/api/grades'],
    initialData: GRADES,
  });
  
  const grade = experiment ? grades.find(g => g.id === experiment.gradeId) : null;
  
  const { data: topics = [] } = useQuery({
    queryKey: ['/api/topics/grade', experiment?.gradeId],
    enabled: !!experiment?.gradeId,
    initialData: grade ? TOPICS[`grade${grade.number}`] : [],
  });
  
  const topic = experiment && topics ? topics.find(t => t.id === experiment.topicId) : null;
  
  const [procedureSteps, setProcedureSteps] = useState<ProcedureStepType[]>([]);
  const [curriculumAlignment, setCurriculumAlignment] = useState<CurriculumAlignmentType | null>(null);
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([]);
  const [extensionActivities, setExtensionActivities] = useState<string[]>([]);
  const [safetyPrecautions, setSafetyPrecautions] = useState<string[]>([]);
  
  useEffect(() => {
    if (experiment) {
      try {
        setProcedureSteps(JSON.parse(experiment.procedure || "[]"));
        setCurriculumAlignment(JSON.parse(experiment.curriculumAlignment || "null"));
        setLearningOutcomes(JSON.parse(experiment.learningOutcomes || "[]"));
        setExtensionActivities(JSON.parse(experiment.extensionActivities || "[]"));
        setSafetyPrecautions(JSON.parse(experiment.safetyPrecautions || "[]"));
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    }
  }, [experiment]);
  
  const isLoading = isExperimentLoading || isMaterialsLoading || isResourcesLoading;
  
  if (isLoading) {
    return (
      <section className="py-10 bg-lightBg">
        <div className="container mx-auto px-4">
          <Card className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <Skeleton className="w-full h-64 md:h-80" />
              <div className="absolute top-4 left-4">
                <Button variant="outline" className="bg-white rounded-full p-2 shadow-md">
                  <span className="material-icons">arrow_back</span>
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3">
                  <Skeleton className="h-10 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-8" />
                  
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-32 w-full mb-8" />
                  
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <div className="space-y-4 mb-8">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Skeleton key={i} className="h-28 w-full" />
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <Skeleton className="h-64 w-full mb-6" />
                  <Skeleton className="h-48 w-full mb-6" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
  
  if (!experiment || !grade || !topic) {
    return (
      <section className="py-10 bg-lightBg">
        <div className="container mx-auto px-4">
          <Card className="bg-white rounded-lg shadow-md p-8 text-center">
            <span className="material-icons text-red-500 text-5xl mb-4">error</span>
            <h2 className="font-roboto font-bold text-2xl text-darkText mb-4">Experiment Not Found</h2>
            <p className="text-gray-600 mb-6">The experiment you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button className="bg-primary text-white">
                Return to Home
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{experiment.title} - ScienceLab SA</title>
        <meta name="description" content={`${experiment.description} A curriculum-aligned science experiment for ${grade.name} following South African NCS and CAPS standards.`} />
      </Helmet>
      
      <section className="py-10 bg-lightBg">
        <div className="container mx-auto px-4">
          <Card className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={experiment.imageUrl} 
                alt={`${experiment.title} experiment setup`} 
                className="w-full h-64 md:h-80 object-cover" 
              />
              <Link href="/">
                <Button variant="outline" className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
                  <span className="material-icons">arrow_back</span>
                </Button>
              </Link>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-roboto font-bold text-2xl text-white">{experiment.title}</h2>
                  <span 
                    className="text-white text-sm px-3 py-1 rounded-full"
                    style={{ backgroundColor: grade.color }}
                  >
                    {topic.name}
                  </span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3">
                  <div className="mb-8">
                    <h3 className="font-roboto font-medium text-xl text-darkText mb-3">Experiment Overview</h3>
                    <p className="text-gray-700">{experiment.description}</p>
                  </div>
                  
                  {curriculumAlignment && (
                    <div className="mb-8">
                      <h3 className="font-roboto font-medium text-xl text-darkText mb-3">Curriculum Alignment</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start mb-3">
                          <span className="material-icons text-primary mr-2">menu_book</span>
                          <div>
                            <h4 className="font-roboto font-medium text-darkText">CAPS Reference:</h4>
                            <p className="text-gray-700 text-sm">{curriculumAlignment.capsReference}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="material-icons text-primary mr-2">school</span>
                          <div>
                            <h4 className="font-roboto font-medium text-darkText">Learning Outcomes:</h4>
                            <ul className="text-gray-700 text-sm list-disc list-inside ml-2">
                              {learningOutcomes.map((outcome, index) => (
                                <li key={index}>{outcome}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="font-roboto font-medium text-xl text-darkText mb-3">Experiment Procedure</h3>
                    <div className="space-y-4">
                      {procedureSteps.map((step) => (
                        <div key={step.step} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-roboto font-medium text-darkText flex items-center">
                            <span 
                              className="text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2"
                              style={{ backgroundColor: grade.color }}
                            >
                              {step.step}
                            </span>
                            {step.title}
                          </h4>
                          <p className="text-gray-700 text-sm mt-2">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {extensionActivities.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-roboto font-medium text-xl text-darkText mb-3">Extension Activities</h3>
                      <ul className="text-gray-700 space-y-2">
                        {extensionActivities.map((activity, index) => (
                          <li key={index} className="flex items-start">
                            <span className="material-icons text-primary mr-2 text-sm">add_circle</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="w-full md:w-1/3">
                  {experiment.hasArModel && (
                    <div className="mb-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-navy hover:opacity-90 py-6 rounded-lg flex items-center justify-center gap-2 shadow-lg transition duration-300 ease-in-out"
                            onClick={() => setShowARViewer(true)}
                          >
                            <span className="material-icons text-xl">view_in_ar</span>
                            <span className="font-semibold">View in 3D/AR</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          {showARViewer && (
                            <ARExperimentViewer 
                              experiment={experiment} 
                              onClose={() => setShowARViewer(false)} 
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <p className="text-xs text-center mt-2 text-gray-500">
                        Experience this experiment in augmented reality
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-roboto font-medium text-lg text-darkText mb-3">Materials Needed</h3>
                    <ul className="space-y-2">
                      {materials.map((material) => (
                        <li key={material.id} className="flex items-center">
                          <span className="material-icons text-gray-400 mr-2 text-sm">check_circle</span>
                          <span className="text-gray-700">{material.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {safetyPrecautions.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                      <h3 className="font-roboto font-medium text-lg text-darkText mb-2 flex items-center">
                        <span className="material-icons text-yellow-500 mr-2">warning</span>
                        Safety Precautions
                      </h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        {safetyPrecautions.map((precaution, index) => (
                          <li key={index}>{precaution}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-roboto font-medium text-lg text-darkText mb-3">Time Required</h3>
                    <div className="flex items-center">
                      <span className="material-icons text-gray-400 mr-2">schedule</span>
                      <span className="text-gray-700">{experiment.duration}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-roboto font-medium text-lg text-darkText mb-2">Difficulty Level</h3>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          className={`material-icons text-2xl ${
                            (experiment.difficultyRating || 3) >= star 
                              ? 'text-[#FFD700]' 
                              : 'text-gray-300'
                          }`}
                        >
                          star
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {experiment.difficultyRating ? 
                          `${experiment.difficultyRating}/5` : 
                          '3/5'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {experiment.difficultyDescription || 
                       "This experiment has a moderate level of difficulty and is suitable for students with basic science knowledge."}
                    </p>
                  </div>
                  
                  {resources.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-roboto font-medium text-lg text-darkText mb-3">Resources</h3>
                      <ul className="space-y-2">
                        {resources.map((resource) => (
                          <li key={resource.id} className="flex items-start">
                            <span className={`material-icons text-primary mr-2 text-sm ${
                              resource.type === 'video' ? 'video_library' : 
                              resource.type === 'document' ? 'description' : 'attach_file'
                            }`}>
                              {resource.type === 'video' ? 'video_library' : 
                               resource.type === 'document' ? 'description' : 'attach_file'}
                            </span>
                            <a href={resource.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                              {resource.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
