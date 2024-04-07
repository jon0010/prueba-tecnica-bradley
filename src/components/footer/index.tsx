import React from "react";
import { FaBriefcase, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full flex justify-between items-center">
      <div className="text-right">
        <p className="text-xl text-start font-semibold">
          Prueba técnica bradley
        </p>
      </div>
      <div className="text-left flex items-center">
        <a href="https://jonnahuelpereyra.com.ar/" target="_blank">
          <FaBriefcase className="mr-4 text-2xl" />
        </a>
        <a href="https://github.com/jon0010" target="_blank">
          <FaGithub className="mr-4 text-2xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/jon-nahuel-pereyra-832191257/"
          target="_blank"
        >
          <FaLinkedin className="text-2xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
