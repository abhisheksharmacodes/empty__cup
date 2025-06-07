"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ContactCard from './components/ContactCard';
import contactsIcon from './assets/contacts.svg';
import galleryIcon from './assets/gallery.svg';
import mapIcon from './assets/map.svg';
import shortlistIcon from './assets/shortlist.svg';
import sortIcon from './assets/sort.svg';
import logoIcon from './assets/logo.svg';
import menuIcon from './assets/menu.svg';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shortlistedIds, setShortlistedIds] = useState([]);
  const [showShortlistedOnly, setShowShortlistedOnly] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('https://empty-cup-back-new-2.vercel.app/api/listings');
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleShortlistToggle = (listingId) => {
    setShortlistedIds(prev => {
      if (prev.includes(listingId)) {
        return prev.filter(id => id !== listingId);
      } else {
        return [...prev, listingId];
      }
    });
  };

  const filteredListings = showShortlistedOnly
    ? listings.filter(listing => shortlistedIds.includes(listing.id))
    : listings;

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      {/* Nav Bar */}
      <div className="flex items-center justify-between p-7 border-b border-[#F5E9D6] bg-white sticky top-0 z-10">
        <Image src={logoIcon} alt="Logo" width={44} height={44} />
        <span className="text-[34px] text-[#888] text-[#716966] tracking-wide font-bold">EmptyCup</span>
        <Image src={menuIcon} alt="Menu" width={40} height={40} />
      </div>

      {/* Tab Bar */}
      <div className="flex items-center justify-between border-b border-[#F5E9D6] bg-white py-8 px-6 sticky top-[64px] z-9">
        <div className="flex gap-8">
          <div className="flex flex-col items-center text-[#B47B5B] font-medium">
            <Image src={contactsIcon} alt="Contacts" width={34} height={34} />
            <span className="text-xs mt-1">Contacts</span>
          </div>
          <div className="flex flex-col items-center text-[#888]">
            <Image src={galleryIcon} alt="Gallery" width={34} height={34} />
            <span className="text-xs mt-1">Gallery</span>
          </div>
          <div className="flex flex-col items-center text-[#ccc]">
            <Image src={mapIcon} alt="Map" width={34} height={34} />
            <span className="text-xs mt-1">Map</span>
          </div>
        </div>
        <div className="flex gap-8">
          <button
            onClick={() => setShowShortlistedOnly(!showShortlistedOnly)}
            className={`flex flex-col items-center cursor-pointer transition-colors duration-200 ${showShortlistedOnly ? 'text-[#B47B5B]' : 'text-[#888]'}`}
          >
            <Image
              src={shortlistIcon}
              alt="Shortlisted"
              width={41}
              height={41}
            />
            <span className="text-xs mt-1">Shortlisted</span>
          </button>
          <div className="flex flex-col items-center text-[#888]">
            <Image src={sortIcon} alt="Sort" width={41} height={41} />
            <span className="text-xs mt-1">Sort</span>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="w-full">
        {loading && (
          <div className="text-center py-5">Loading listings...</div>
        )}
        {error && (
          <div className="text-center py-5 text-red-500">{error}</div>
        )}
        {!loading && !error && filteredListings.map((listing) => (
          <ContactCard
            key={listing.id}
            name={listing.name}
            rating={listing.rating}
            description={listing.description}
            projects={listing.projects}
            years={listing.years}
            price={listing.price}
            phones={listing.phones}
            isShortlisted={shortlistedIds.includes(listing.id)}
            onShortlist={() => handleShortlistToggle(listing.id)}
          />
        ))}
      </div>
    </div>
  );
}
