"use client";

import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { getTeamDetails } from "../services/dataService";
import { useScrollAnimation } from "../services/hooks/useUtils";
import { CgProfile } from "react-icons/cg";

export default function OurTeam() {
  const team = getTeamDetails();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      className="py-32 bg-dark relative overflow-hidden"
      id="why-choose-us-section"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref as any} className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 ${
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            Meet Our
            <span className="text-primary-light"> Team</span>
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {team.map((member: any, index: number) => (
            <div
              key={index}
              className={`bg-dark-light rounded-lg p-6 flex flex-col items-center text-center ${
                isVisible
                  ? `animate-fade-up delay-${index * 100 + 200}`
                  : "opacity-0"
              }`}
            >
              <div className="h-50 w-50 rounded-full overflow-clip">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full"
                  />
                ) : (
                  <CgProfile className="w-full h-full" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-primary-light mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm h-25">{member.bio}</p>
              <div className="mt-4">
                {member?.socials && (
                  <div className="flex gap-3 justify-center">
                    {/* instagram */}
                    {member?.socials?.instagram && (
                      <a
                        href={member?.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-300 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        aria-label="Instagram"
                      >
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    )}
                    {/* facebook */}
                    {member?.socials?.facebook && (
                      <a
                        href={member?.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-300 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        aria-label="Facebook"
                      >
                        <FaFacebook className="w-4 h-4" />
                      </a>
                    )}
                    {/* linkedin */}
                    {member?.socials?.linkedin && (
                      <a
                        href={member?.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-300 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {/* whatsapp */}
                    {member?.socials?.whatsapp && (
                      <a
                        href={member?.socials.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-300 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        aria-label="WhatsApp"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </a>
                    )}
                    {/* youtube */}
                    {member?.socials?.youtube && (
                      <a
                        href={member?.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-300 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        aria-label="YouTube"
                      >
                        <FaYoutube className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
