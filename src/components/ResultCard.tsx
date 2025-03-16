import React from "react";

interface RecipeCardProps {
  results: { type: string; text: string }[];
}

const ResultCard: React.FC<RecipeCardProps> = ({ results }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg h-full w-full">
      {results.map((item, index) => {
        let textClass = "text-base"; // Default text class

        if (item.type === "bigAndBold") textClass = "text-2xl font-bold";
        else if (item.type === "big") textClass = "text-xl font-semibold";
        else if (item.type === "bold") textClass = "font-bold";
        
        return (
          <p key={index} className={`${textClass} my-2`}>
            {item.text}
          </p>
        );
      })}
    </div>
  );
};

export default ResultCard;
