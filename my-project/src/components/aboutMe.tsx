import React from "react";
import Image from "next/image";
import avatar from "../../public/avatar.png";
import { Typewriter } from "react-simple-typewriter";
import classNames from "classnames";
import { Socials } from "./socials";
import Head from "next/head";

const AboutMe = () => {
  return (
    <div className="container px-4 mx-auto">
      <Head>
        <title>About Me - Xander Bailey</title>
        <meta name="description" content="Welcome to my personal website. Learn more about me and my work." />
      </Head>
      <div className="lg:space-x-5 lg:-mx-4 flex flex-col justify-center items-center">
        <div className="flex-1 lg:mt-12 lg:px-4 mb-10">
          <Image
            src={avatar}
            alt="Public Avatar"
            priority={true}
            className={classNames("rounded-full", "p-2","bg-slate-50")}
            width={250}
            height={250}
            placeholder="blur"
            loading="eager"
          />
        <Socials/>
        </div>
        <div className="flex-1 lg:px-4 lg:mt-1 ">
          <div className="mt-6 text-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold font-mono text-gray-900 lg:text-5xl dark:text-white bg-slate-700 pl-2 rounded">
              {""}
              <span style={{ color: "white", fontWeight: "bold" }}>
                <Typewriter
                  words={["Welcome!"]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
