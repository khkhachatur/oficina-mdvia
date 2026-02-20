const Titles = ({ title }: { title: string }) => {
  return (
    <h2 className="text-2xl font-bold uppercase mb-12 text-center md:text-left">
      {title}
    </h2>
  );
};

export default Titles;