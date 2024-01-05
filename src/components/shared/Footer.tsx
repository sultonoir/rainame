import { Link } from "@nextui-org/react";
import { Github, Instagram, Mail } from "lucide-react";
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
    <footer className="container">
      <div className="mb-2 flex flex-col rounded-large p-4">
        <div className="flex flex-col justify-end justify-items-center gap-5 sm:flex-row">
          <div className="mb-4 flex flex-col">
            <p className="text-center text-xl font-semibold">Follow me on</p>
            <div className="flex justify-center gap-2">
              {sosial.map((item) => (
                <Link key={item.name} href={item.path} color="foreground">
                  <item.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto flex w-full justify-center gap-2 text-small">
        Built by @sultonoir | ©2023 Sultonoir. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
