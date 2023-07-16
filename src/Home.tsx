import React, { useState, Fragment, useEffect } from "react";

import { AiFillStar } from "react-icons/ai";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import AnimatedText from "./components/AnimatedText";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRepo, setIsLoadingRepo] = useState(false);
  const [searchData, setSeachData] = useState("");
  const [searching, setSeaching] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [responseDataRepo, setResponseDataRepo] = useState([]);
  const [open, setOpen] = useState(0);
  const [messageError, setMessageError] = useState("");
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const sentence = "Hello, world!";

  const handleOpen = async (value: any, username: any) => {
    setOpen(open === value ? 0 : value);
    if (open !== value) {
      setIsLoadingRepo(true);
      setResponseDataRepo([]);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const resData = await response.json();
        if (response.status !== 200) {
          setIsLoadingRepo(false);

          return alert(resData.message);
        }

        setResponseDataRepo(resData);
        setIsLoadingRepo(false);
      } catch (error: any) {
        setIsLoading(false);
        return setMessageError(error);
      }
    }
  };

  function Icon(id: any) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
        className={`${
          id.id === open ? "rotate-180 " : ""
        } h-5 w-5 transition-transform `}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
      </svg>
    );
  }

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (searchData === "") {
      return setMessageError("Please insert username!");
    }
    try {
      const response = await fetch(
        "https://api.github.com/search/users?q=" + searchData,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          //   body: JSON.stringify({ url: newUrl, custom: customUrl }),
        }
      );
      const resData = await response.json();
      setSeaching(searchData);
      if (response.status !== 200) {
        setIsLoading(false);
        return setMessageError(resData.message);
      }

      const { items } = resData;
      setIsLoading(false);
      setResponseData(items);
    } catch (error: any) {
      setIsLoading(false);
      return setMessageError(error);
    }
  };

  useEffect(() => {
    document.title = "Github Repository";

    let sentenceIndex = 0;

    const typingInterval = setInterval(() => {
      setText((prevText) => prevText + sentence[sentenceIndex]);
      sentenceIndex++;

      if (sentenceIndex === sentence.length) {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <div className='flex min-h-screen flex-col items-center  p-8'>
        <div className='z-10  max-w-5xl items-center justify-center font-mono text-sm '>
          <a
            href='https://mifa-abiyyu.vercel.app'
            target='_blank'
            rel='noreferrer'>
            <img
              src='/Abiyyu__1_-removebg-preview.png'
              alt='Abiyyu'
              className='dark:invert'
              width={70}
              height={60}
            />
          </a>
          <hr />
          <br />
        </div>

        <div className='flex w-80 mb-24 lg:w-[450px] md:w-[450px] flex-1 flex-col justify-center '>
          {/* <div className='sm:mx-auto sm:w-full sm:max-w-sm'></div> */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 512 512'
            className={`w-full h-12 `}>
            <path fill='none' d='M0 0h512v512H0z' />
            <path
              fill='currentColor'
              d='M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32Z'
            />
          </svg>
          <AnimatedText
            className='!text-center !text-3xl xl:!text-2xl lg:!text-center lg:!text-3xl md:!text-2xl sm:!text-xl'
            text='GitHub repositories explorer'
          />
          <form className='mb-3' onSubmit={handleOnSubmit}>
            <div className='mb-3'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-white'>
                Enter Username
              </label>

              <div className='mt-2'>
                <input
                  type='text'
                  value={searchData}
                  placeholder='Enter Username'
                  data-testid='searchUsername'
                  onChange={(e) => setSeachData(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {/* {errors && <span>{errors.name.messageSuccess}</span>} */}
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type='submit'
                className={`flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  isLoading ? "bg-blue-400" : ""
                }`}>
                {isLoading ? (
                  <div
                    className='w-6 h-6 rounded-full animate-spin
                    border-y-4 border-dashed border-white border-t-transparent mr-2'></div>
                ) : (
                  ""
                )}
                {isLoading ? "Please wait .. " : "Search"}
              </button>
            </div>
          </form>
          {searching ? (
            <p className='mb-2'>Showing users for "{searching}"</p>
          ) : (
            ""
          )}

          {messageError !== "" ? (
            <div className='text-center py-4 lg:px-4'>
              <div
                className='p-2 bg-red-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex'
                role='alert'>
                <span className='flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3'>
                  Error
                </span>
                <span className='font-semibold mr-2 text-left flex-auto'>
                  {messageError}{" "}
                </span>
                <svg
                  className='fill-current opacity-75 h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'>
                  <path d='M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z' />
                </svg>
              </div>
            </div>
          ) : (
            ""
          )}

          <Fragment>
            {responseData.length === 0 && searching !== "" ? (
              <div
                className='p-2 bg-red-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex'
                role='alert'>
                <span className='flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3'>
                  Sorry!
                </span>
                <span className='font-semibold mr-2 text-left flex-auto'>
                  Data not found!{" "}
                </span>
              </div>
            ) : (
              responseData.map((data: any) => (
                <Accordion
                  key={data.id}
                  open={open === data.id}
                  icon={<Icon id={data.id} />}
                  className='border border-blue-gray-100 px-4 rounded-lg mb-2'>
                  <AccordionHeader
                    onClick={() => handleOpen(data.id, data.login)}
                    className={`border-b-0 transition-colors text-md md:text-xl  ${
                      open === data.id
                        ? "text-blue-500 hover:!text-blue-700"
                        : ""
                    }`}>
                    {data.login}
                  </AccordionHeader>
                  <AccordionBody className='text-base  pt-0'>
                    <ul>
                      {isLoadingRepo ? (
                        <div className='flex justify-center text-center'>
                          <div
                            className='w-6 h-6 rounded-full animate-spin
                    border-y-4 border-dashed border-black border-t-transparent mr-2'></div>
                          Please wait ..
                        </div>
                      ) : responseDataRepo.length === 0 ? (
                        <>
                          <div className='text-center'>Data Not found</div>
                        </>
                      ) : (
                        responseDataRepo.map((datas: any) => (
                          <li className='mb-2 ml-3 ' key={datas.id}>
                            <div className='bg-gray-300 p-2 rounded-lg'>
                              <div className='flex justify-between'>
                                <a
                                  href={datas.html_url}
                                  target='_blank'
                                  className='text-md md:text-xl font-bold'
                                  rel='noreferrer'>
                                  {datas.name}
                                </a>
                                <h4 className='flex text-xl font-bold'>
                                  <p className='mr-2 mt-[3px] text-sm md:text-sm'>
                                    {" "}
                                    {datas.forks}
                                  </p>
                                  <AiFillStar className='mt-1 w-4' />
                                </h4>
                              </div>
                              <h5 className='text-sm'>{datas.description}</h5>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </AccordionBody>
                </Accordion>
              ))
            )}
          </Fragment>
        </div>
      </div>
    </>
  );
};

export default Home;
