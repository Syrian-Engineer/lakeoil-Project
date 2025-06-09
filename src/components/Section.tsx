interface Props {
  title: string;
  href: string;
  isSelected: boolean; // Track whether the section is selected
  onClick: () => void; // Handler for the click event
}

const Section = ({ title,href, isSelected, onClick }: Props) => {
  const handleClick = (e:React.MouseEvent)=>{
    e.preventDefault();
    onClick();
  }
  return (
    <div onClick={handleClick} className="">
      <a
        href={`#${href}`} // This will match the id of the section
        className={`text-md hover:cursor-pointer transition duration-300 p-2 ${
            isSelected
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
      >
        {title}
      </a>
    </div>
  );
};

export default Section;
