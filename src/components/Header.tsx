interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <head>
      <title>{title}</title>
    </head>
  );
};

export default Header;
