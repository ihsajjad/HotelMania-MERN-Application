const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-2xl font-bold text-center text-[var(--bg-color)] border border-b-2 border-[var(--bg-color)] py-1">
      {title}
    </div>
  );
};

export default PageTitle;
