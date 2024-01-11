import { Link } from "@nextui-org/react";
import { Github, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const sosial = [
    {
      name: "Github",
      icon: Github,
      path: "https://github.com/sultonoir",
    },
    {
      name: "Instagram",
      icon: Instagram,
      path: "https://www.instagram.com/sultonoir/",
    },
    {
      name: "Mail",
      icon: Mail,
      path: "mailto:sultonnoir@gmail.com",
    },
  ];
  return (
    <footer className="relative border-t border-neutral-200 py-20 dark:border-neutral-700 lg:pb-24 lg:pt-28">
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 space-y-1 md:col-span-1">
            <a
              href="/"
              className="flex items-center gap-2 text-large font-semibold"
            >
              <Image
                src="/logo-transparent.png"
                alt="logo"
                width={40}
                height={40}
              />
              Rainame
            </a>
            <div className="ml-2 flex justify-start gap-2">
              {sosial.map((item) => (
                <Link key={item.name} href={item.path} color="foreground">
                  <item.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Getting started
          </h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Release Notes
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Upgrade Guide
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browser Support
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dark Mode
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Explore
          </h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prototyping
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Design systems
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Resources
          </h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Best practices
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developers
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn design
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Community
          </h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discussion Forums
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code of Conduct
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contributing
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Reference
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
