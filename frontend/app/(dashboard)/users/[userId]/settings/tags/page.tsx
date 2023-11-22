import { Separator } from "@/components/ui/separator"
import { TagsForm } from "../components/tags-form"  

export default function SettingsTagsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tags</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you are suggested with tags.
        </p>
      </div>
      <Separator />
      <TagsForm />
    </div>
  )
}