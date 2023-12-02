import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

interface ArticleMetadataProps {
  upvotes: number;
  downvotes: number;
  bookmarked: boolean;
}

const ArticleMetadata: React.FC<ArticleMetadataProps> = ({
  upvotes,
  downvotes,
  bookmarked,
}) => {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <ArrowBigUp size={20} />
        <span>{upvotes}</span>
      </div>
      <div className="flex items-center space-x-2">
        <ArrowBigDown size={20} />
        <span>{downvotes}</span>
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center space-x-2">
        {bookmarked ? (
          <BookmarkCheck size={20} className="text-pub-color" />
        ) : (
          <Bookmark size={20} />
        )}
      </div>
    </div>
  );
};

export default ArticleMetadata;
