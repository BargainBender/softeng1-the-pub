"use client";
import { Separator } from "@/components/ui/separator"
import { TagsForm } from "../components/tags-form"  
import { useState } from "react";

export default function SettingsTagsPage() {

  const allTags = [
    "Academics",
    "Travel",
    "Entertainment",
    "Sports",
    "Technology",
  ];

  const [chosenTags, setChosenTags] = useState<string[]>([]);

  const handleChosenTagsChange = (chosenTags: string[]) => {
    setChosenTags(chosenTags);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tags</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you are suggested with tags.
        </p>
      </div>
      <Separator />
      <TagsForm  allTags={allTags}
                  onChosenTagsChange={handleChosenTagsChange}/>
    </div>
  )
}