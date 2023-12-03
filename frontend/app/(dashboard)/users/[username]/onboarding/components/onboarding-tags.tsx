"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

interface OnboardingTagsProps {
  allTags: string[];
  onChosenTagsChange: (chosenTags: string[]) => void; // Callback function
}

export function OnboardingTags({
  allTags,
  onChosenTagsChange,
}: OnboardingTagsProps) {
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [unchosenTags, setUnchosenTags] = useState<string[]>(allTags);

  const handleTagClick = (tag: string) => {
    if (chosenTags.includes(tag)) {
      setChosenTags((prevTags) =>
        prevTags.filter((prevTag) => prevTag !== tag)
      );
      setUnchosenTags((prevTags) => [...prevTags, tag]);
    } else {
      setChosenTags((prevTags) => [...prevTags, tag]);
      setUnchosenTags((prevTags) =>
        prevTags.filter((prevTag) => prevTag !== tag)
      );
    }
  };

  // Notify the parent component when chosenTags change
  useEffect(() => {
    onChosenTagsChange(chosenTags);
  }, [chosenTags, onChosenTagsChange]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center space-x-2">
        <div className="flex flex-wrap-reverse space-x-2">
          {chosenTags.map((tag) => (
            <Button
              key={tag}
              onClick={() => handleTagClick(tag)}
              variant={"pub"}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <Separator className="w-max-prose my-4" />
      <div className="mt-4">
        <div className="flex flex-wrap space-x-2">
          {unchosenTags.map((tag) => (
            <Button
              key={tag}
              onClick={() => handleTagClick(tag)}
              variant={"outline"}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
