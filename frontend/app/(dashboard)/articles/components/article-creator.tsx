// Shows the user data like who wrote the article

import Link from "next/link";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";

interface ArticleCreatorProps {
  username: string;
  avatar: string;
  date: string;
}

const ArticleCreator: React.FC<ArticleCreatorProps> = ({
  username,
  avatar,
  date,
}) => {
  return (
    <div className="flex items-start max-w-prose mt-8 gap-6 flex-wrap">
      <div className="flex-none">
        <Avatar>
          <AvatarImage src={avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid grid-rows-2 grid-cols-1">
        <div className="col-auto">
          <small className="text-sm font-medium leading-none md:hover:border-b-2 border-pub">
            <Link href={"/"}>{username}</Link>
          </small>
          <small className="text-lg font-medium leading-none mx-2 text-muted-foreground">
            ·
          </small>
          <small className="text-sm font-medium leading none text-pub hover:text-pub-darker">
            <button onClick={() => {
              console.log("Clicked Follow")
            }}>Follow</button>
          </small>
        </div>
        <div className="col-auto">
          <small className="text-sm font-medium leading-none text-muted-foreground">
            {date}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ArticleCreator;
