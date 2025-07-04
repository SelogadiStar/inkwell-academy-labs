import { useState } from "react";
import { Input } from "@/components/ui/input";
import { GRADES } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

type GradeSelectorProps = {
  selectedGrade: number;
  setSelectedGrade: (gradeId: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function GradeSelector({ 
  selectedGrade, 
  setSelectedGrade, 
  searchQuery, 
  setSearchQuery 
}: GradeSelectorProps) {
  const { data: grades = [] } = useQuery({ 
    queryKey: ['/api/grades'],
    initialData: GRADES,
  });

  const handleGradeChange = (gradeId: number) => {
    setSelectedGrade(gradeId);
  };

  return (
    <section className="py-6 bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h3 className="font-roboto font-medium text-xl text-darkText mb-2 md:mb-0">Select Grade Level</h3>
          <div className="relative w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search experiments..."
              className="border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-icons absolute left-3 top-2 text-gray-400 text-sm">search</span>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {grades.map((grade) => (
            <button
              key={grade.id}
              className={`grade-tab ${
                selectedGrade === grade.id
                  ? `active bg-grade${grade.number}`
                  : `bg-gray-200 hover:bg-grade${grade.number} hover:text-white`
              } text-center py-3 rounded-t-lg font-roboto transition-all duration-200`}
              onClick={() => handleGradeChange(grade.id)}
              style={{ backgroundColor: selectedGrade === grade.id ? grade.color : undefined }}
            >
              {grade.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
