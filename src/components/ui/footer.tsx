"use client";
import { Github, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const footers = [
    {
      title: "About Karcisku",
      des: [
        {
          path: "/pricing",
          name: "Pricing",
        },
        {
          path: "/discover",
          name: "Event",
        },
        {
          path: "/faq",
          name: "FAQ",
        },
        {
          path: "/term",
          name: "Term",
        },
      ],
    },
    {
      title: "Resources",
      des: [
        {
          path: "#",
          name: "Best practices",
        },
        {
          path: "#",
          name: "Support",
        },
        {
          path: "#",
          name: "Developers",
        },
        {
          path: "#",
          name: "Learn design",
        },
      ],
    },
    {
      title: "Explore event",
      des: [
        {
          path: "/discover?category=festival",
          name: "Festival",
        },
        {
          path: "/discover?category=stand-up",
          name: "Stand-up",
        },
        {
          path: "/discover?category=conference",
          name: "Conference",
        },
        {
          path: "/discover?category=tournaments",
          name: "Tournaments",
        },
      ],
    },
    {
      title: "Community",
      des: [
        {
          path: "#",
          name: "Discussion Forums",
        },
        {
          path: "#",
          name: "Code of Conduct",
        },
        {
          path: "#",
          name: "Contributing",
        },
        {
          path: "#",
          name: "API Reference",
        },
      ],
    },
  ];

  return (
    <footer className="border-t border-neutral-200 py-20 dark:border-neutral-700 lg:pb-24 lg:pt-28">
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 space-y-5 md:col-span-1">
            <Link
              href="/"
              className="text-large flex items-center gap-2 font-semibold"
            >
              <Image
                src="/logo.png"
                className="rounded-lg"
                alt="logo"
                width={40}
                height={40}
              />
              Karcisku
            </Link>
            <div className="ml-2 flex justify-start gap-2">
              {sosial.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  color="foreground"
                  aria-label={item.name}
                  title={item.name}
                >
                  <item.icon size={30} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {footers.map((item) => (
          <div className="text-sm" key={item.title}>
            <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
              {item.title}
            </h2>
            <ul className="mt-5 space-y-4">
              {item.des.map((des) => (
                <li key={des.name}>
                  <a
                    className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                    href={des.path}
                    rel="noopener noreferrer"
                  >
                    {des.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
