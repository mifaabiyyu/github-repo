const Footer: React.FC = () => {
  return (
    <footer>
      <div className='fixed bg-white bottom-0 left-0 flex h-14 w-full items-end justify-center  from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
        <a
          className=' flex place-items-center gap-2 p-4 lg:pointer-events-auto lg:p-0'
          href='https://mifa-abiyyu.vercel.app'
          target='_blank'
          rel='noopener noreferrer'>
          {" "}
          by &nbsp;
          <span className='text-lg'>&copy;</span>
          <u>Mifa Abiyyu</u>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
