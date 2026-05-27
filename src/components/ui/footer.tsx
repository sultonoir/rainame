"use client";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { Send } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-background text-foreground relative border-t transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Stay Connected
            </h2>
            <p className="text-muted-foreground mb-6">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <InputGroup>
              <InputGroupInput placeholder="Card number" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="default">
                  <Send />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <div className="bg-primary/10 absolute top-0 -right-4 h-24 w-24 rounded-full blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="hover:text-primary block transition-colors">
                Home
              </a>
              <a
                href="#"
                className="hover:text-primary block transition-colors">
                About Us
              </a>
              <a
                href="#"
                className="hover:text-primary block transition-colors">
                Services
              </a>
              <a
                href="#"
                className="hover:text-primary block transition-colors">
                Products
              </a>
              <a
                href="#"
                className="hover:text-primary block transition-colors">
                Contact
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full">
                      <IconBrandFacebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full">
                      <IconBrandX className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full">
                      <IconBrandInstagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full">
                      <IconBrandLinkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Rainame. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a
              href="#"
              className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
