interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <h2 className="text-xl font-bold mt-4">{title}</h2>;
};

export default Title;
