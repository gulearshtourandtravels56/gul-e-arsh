"use client";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { getTeamDetails } from "../services/dataService";
import { useScrollAnimation } from "../services/hooks/useUtils";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";

export default function OurTeam({ color = "dark" }) {
  const [team, setTeam] = useState<any[]>([]);
  const [ref, isVisible] = useScrollAnimation();

  const isLight = color === "light";

  useEffect(() => {
    const fetchTeamDetails = async () => {
      setTeam(await getTeamDetails());
    };
    fetchTeamDetails();
  }, []);
  
  return (
    <section
      className={`py-32 relative overflow-hidden ${
        isLight ? "bg-white" : "bg-dark"
      }`}
      id="why-choose-us-section"
    >
      {/* Decorative background */}
      {isLight ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-white to-secondary/20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-70" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-70" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 pointer-events-none" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref as any} className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 ${
              isLight ? "text-gray-900" : "text-white"
            } ${isVisible ? "animate-fade-up delay-100" : "opacity-0"}`}
          >
            Meet Our{" "}
            <span className="text-primary">Team</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member: any, index: number) => (
            <div
              key={index}
              className={`rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] ${
                isLight
                  ? "bg-white/70 backdrop-blur-md shadow-lg border border-gray-200"
                  : "bg-dark-light"
              } ${
                isVisible
                  ? `animate-fade-up delay-${index * 100 + 200}`
                  : "opacity-0"
              }`}
            >
              {/* Image */}
              <div className="h-40 w-40 rounded-full overflow-hidden mb-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CgProfile className="w-full h-full" />
                )}
              </div>

              {/* Info */}
              <h3
                className={`text-xl font-semibold ${
                  isLight ? "text-gray-900" : "text-white"
                }`}
              >
                {member.name}
              </h3>

              <p className="text-primary mb-2">{member.role}</p>

              <p
                className={`text-sm h-24 ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {member.bio}
              </p>

              {/* Socials */}
              {member?.socials && (
                <div className="mt-4 flex gap-3 justify-center">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaInstagram />
                    </a>
                  )}

                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaFacebook />
                    </a>
                  )}

                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaLinkedin />
                    </a>
                  )}

                  {member.socials.whatsapp && (
                    <a
                      href={member.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaWhatsapp />
                    </a>
                  )}

                  {member.socials.youtube && (
                    <a
                      href={member.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaYoutube />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}