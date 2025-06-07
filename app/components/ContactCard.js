"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import starFilled from '../assets/star-filled.svg';
import starOutline from '../assets/star-outline.svg';
import detailsIcon from '../assets/details.svg';
import hideIcon from '../assets/hide.svg';
import shortlistIcon from '../assets/shortlisted.svg';
import notShortlistIcon from '../assets/not_shortlisted.svg';
import reportIcon from '../assets/report.svg';

const ContactCard = ({
  name, rating, description, projects, years, price, phones,
  onDetails, onHide, onShortlist, onReport, isShortlisted
}) => {
  // const [debugMode, setDebugMode] = useState(false); // might need this later
  const [hovered, setHovered] = useState(false); // for hover effects

  useEffect(() => {
    // console.log('Card:', { name, rating }); // debugging
  }, []);

  // quick star renderer
  const showStars = () => (
    <div className="flex items-center mb-2">
      {[1, 2, 3, 4, 5].map(i => (
        <Image
          key={i}
          src={i <= rating ? starFilled : starOutline}
          alt={i <= rating ? 'Filled Star' : 'Outline Star'}
          width={26}
          height={26}
          style={{ marginRight: '2px' }} // mixing styles
        />
      ))}
    </div>
  );

  return (
    <section className="bg-[#FFFCF5] border border-[#F5E9D6] shadow-sm flex flex-row items-stretch px-6 py-6">
      {/* main content */}
      <div className="flex-1 pr-6 gap-4 flex flex-col justify-start">
        <div className="flex flex-col gap-2">
          <div>
            <div className="font-bold text-[26px] text-black mb-2">{name}</div>
            {showStars()}
          </div>
          <div className="text-base text-sm text-black mb-4 leading-snug">{description}</div>
        </div>
        <div className="flex gap-10 mb-4">
          <div className="text-center">
            <div className="font-bold text-[32px] text-black">{projects}</div>
            <div className="text-sm text-black">Projects</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[32px] text-black">{years}</div>
            <div className="text-sm text-black">Years</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[32px] text-black">{price}</div>
            <div className="text-sm text-black">Price</div>
          </div>
        </div>
        <div className="text-[23px] font-mono text-black leading-7">
          {phones.map((phone, idx) => (
            <div key={idx}>{phone}</div>
          ))}
        </div>
      </div>
      {/* divider */}
      <div className="w-px bg-[#E9DCC3] mx-6" />
      {/* action buttons */}
      <nav className="flex flex-col items-center justify-center gap-6 min-w-[80px] pl-2" aria-label="Contact actions">
        <button 
          onClick={onDetails} 
          className="flex flex-col cursor-pointer items-center text-[#B47B5B] hover:text-[#8c5e3c] focus:outline-none"
          style={{ padding: '4px' }} // mixing styles
        >
          <Image src={detailsIcon} alt="Details" width={17} height={17} />
          <span className="text-[11px] mt-2 font-medium">Details</span>
        </button>
        <button 
          onClick={onHide} 
          className="flex flex-col items-center cursor-pointer text-[#B47B5B] hover:text-[#8c5e3c] focus:outline-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image src={hideIcon} alt="Hide" width={34} height={34} />
          <span className="text-[11px] mt-2 font-medium">Hide</span>
        </button>
        {isShortlisted && (
          <button onClick={onShortlist} className="flex flex-col items-center text-[#B47B5B] cursor-pointer hover:text-[#8c5e3c] focus:outline-none">
            <Image 
              src={shortlistIcon} 
              alt="Shortlisted" 
              width={26} 
              height={26} 
            />
            <span className="text-[11px] mt-2 font-medium">Shortlist</span>
          </button>
        )}
        {!isShortlisted && (
          <button onClick={onShortlist} className="flex flex-col items-center text-[#B47B5B] cursor-pointer hover:text-[#8c5e3c] focus:outline-none">
            <Image 
              src={notShortlistIcon} 
              alt="Not Shortlisted" 
              width={26} 
              height={26} 
            />
            <span className="text-[11px] mt-2 font-medium">Shortlist</span>
          </button>
        )}
        <button onClick={onReport} className="flex flex-col items-center text-[#B47B5B] cursor-pointer hover:text-[#8c5e3c] focus:outline-none">
          <Image src={reportIcon} alt="Report" width={28} height={28} />
          <span className="text-[11px] mt-2 font-medium">Report</span>
        </button>
      </nav>
    </section>
  );
};

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  projects: PropTypes.number.isRequired,
  years: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  phones: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDetails: PropTypes.func,
  onHide: PropTypes.func,
  onShortlist: PropTypes.func,
  onReport: PropTypes.func,
  isShortlisted: PropTypes.bool,
};

export default ContactCard; 