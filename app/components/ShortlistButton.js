import React from 'react';
import Image from 'next/image';
import shortlistIcon from '../assets/shortlist.svg';
import shortlistFilledIcon from '../assets/shortlist-filled.svg';

const ShortlistButton = ({ isShortlisted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex flex-col items-center transition-colors duration-200 ${
        isShortlisted ? 'text-primary' : 'text-secondary'
      }`}
    >
      <Image
        src={isShortlisted ? shortlistFilledIcon : shortlistIcon}
        alt="Shortlist"
        width={28}
        height={28}
      />
      <span className="text-sm mt-0.5">Shortlist</span>
    </button>
  );
};

export default ShortlistButton; 