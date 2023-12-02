"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const tagsFormSchema = z.object({
  tags: z.array(z.string()),
});

type TagsFormValues = z.infer<typeof tagsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<TagsFormValues> = {};

interface TagsFormProps {
  allTags: string[];
  onChosenTagsChange: (chosenTags: string[]) => void; // Callback function
}

export function TagsForm({
  allTags,
  onChosenTagsChange,
}: TagsFormProps) {
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
      <div>
          <h3 className="mb-4 text-lg font-medium">Tags Suggestions</h3>
          <div className="space-y-4"></div>
        </div>
        <Button type="submit" variant={"pub"}>
          Update suggestions
        </Button>
    </div>

    
  );
}
