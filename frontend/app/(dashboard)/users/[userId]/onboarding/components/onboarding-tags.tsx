import React, { useState } from "react";

interface OnboardingTagsProps {
  allTags: string[];
}

export function OnboardingTags({ allTags }: OnboardingTagsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  let tagData = []

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Tag is already selected, remove it
      setSelectedTags((prevTags) =>
        prevTags.filter((prevTag) => prevTag !== tag)
      );
    } else {
      // Tag is not selected, add it to the top
      setSelectedTags((prevTags) => [tag, ...prevTags]);
    }
  };

  const handleChosenTagClick = (tag: string) => {
    // Remove the clicked tag from the chosen tags
    setSelectedTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center space-x-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`bg-gray-300 py-1 px-2 rounded-md ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-400"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Chosen Tags:</h2>
        <div className="flex flex-wrap space-x-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleChosenTagClick(tag)}
              className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
