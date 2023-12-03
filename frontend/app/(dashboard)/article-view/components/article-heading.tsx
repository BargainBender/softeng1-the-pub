interface ArticleHeadingProps {
  title: string;
  tags: string[];
}
const ArticleHeading: React.FC<ArticleHeadingProps> = ({ title, tags }) => {
  return (
    <div className="max-w-prose">
      <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-muted-foreground">
        {tags.join(", ")}{" "}
      </h4>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-3">
        {title}
      </h1>
    </div>
  );
};

export default ArticleHeading;
