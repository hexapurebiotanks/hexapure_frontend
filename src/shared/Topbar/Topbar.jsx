import { Container } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";

const TopBar = () => (
  <div className="bg-[#2E8B57] text-white py-2 text-sm hidden md:block">
    <Container maxWidth="lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <a
            href="mailto:hexapurebiotanks@gmail.com"
            className="flex items-center gap-2 transition-colors hover:text-[#CAF0F8] cursor-pointer"
          >
            <EmailIcon fontSize="small" /> hexapurebiotanks@gmail.com
          </a>
          <a
            href="tel:+918903488003"
            className="flex items-center gap-2 transition-colors hover:text-[#CAF0F8] cursor-pointer"
          >
            <PhoneIcon fontSize="small" /> +91 89034 88003
          </a>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/share/1KBv1sT3vV"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:text-[#CAF0F8]"
          >
            <FacebookIcon fontSize="small" />
          </a>
          <a
            href="https://www.instagram.com/hexapurebiotanks"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:text-[#CAF0F8]"
          >
            <InstagramIcon fontSize="small" />
          </a>
          <a
            href="#"
            className="cursor-pointer transition-colors hover:text-[#CAF0F8]"
          >
            <LinkedInIcon fontSize="small" />
          </a>
        </div>
      </div>
    </Container>
  </div>
);

export default TopBar;
