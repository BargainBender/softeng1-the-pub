interface ArticleHeadingProps {
  title: string;
  tags: [];
}
const ArticleHeading: React.FC<ArticleHeadingProps> = ({
  title,
  tags,
}) => {
  const tagList = Object.entries(tags)
  .filter(([_, isActive]) => isActive)
  .map(([tag]) => tag);
  return (
    <div className="max-w-prose">
      <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-muted-foreground">
      {tagList.join(', ')}
      </h4>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-3">
        {title}
      </h1>
   
    </div>
  );
};

export default ArticleHeading;
