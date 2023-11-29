
// TODO: Fetching of Data

interface ArticleHeadingProps{
    title: string;
    content: string;
    category: string;
    description: string | null;
}

const article = {
    title: "Hello World",
    content: "Lorem ipsum, dolor sit amet consectetur adi",
    category: "Programming",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.."
  }

  const ArticleHeading: React.FC<ArticleHeadingProps> = ({
    title,
    content,
    category,
    description
  }) => {
    return (
        <div className="max-w-prose">
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-muted-foreground">
          {article.category}
        </h4>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-3">
          {article.title}
        </h1>
        <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-muted-foreground">
          {article.description}
        </h3>
      </div>
    );
  }

  export default ArticleHeading;
  

