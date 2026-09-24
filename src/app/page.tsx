"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { StickySubNav } from "@/components/StickySubNav";
import { TitleSection } from "@/components/TitleSection";
import { HeroPhotoGrid } from "@/components/HeroPhotoGrid";
import { PropertyOverview } from "@/components/PropertyOverview";
import { HostBrief } from "@/components/HostBrief";
import { Highlights } from "@/components/Highlights";
import { Description } from "@/components/Description";
import { WhereYouSleep } from "@/components/WhereYouSleep";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { CalendarSection } from "@/components/CalendarSection";
import { ReservationCard } from "@/components/ReservationCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { LocationSection } from "@/components/LocationSection";
import { HostProfileSection } from "@/components/HostProfileSection";
import { ThingsToKnowSection } from "@/components/ThingsToKnowSection";
import { NearbyListingsSection } from "@/components/NearbyListingsSection";
import { PhotoTourModal } from "@/components/PhotoTourModal";
import { LightboxModal } from "@/components/LightboxModal";
import {
  SharedElementPhotoModal,
  OriginRect,
} from "@/components/SharedElementPhotoModal";
import { LISTING_DATA } from "@/data/listingData";

function ListingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const modal = searchParams.get("modal");
  const modalItem = searchParams.get("modalItem");

  const isPhotoTourOpen = modal === "PHOTO_TOUR_SCROLLABLE";
  const activePhotoId = modalItem ? parseInt(modalItem, 10) : null;

  // Shared-element expanded image state
  const [expandedPhoto, setExpandedPhoto] = useState<{
    photoId: number;
    originRect: OriginRect;
  } | null>(null);

  const handleOpenPhotoTour = () => {
    router.push("/?modal=PHOTO_TOUR_SCROLLABLE", { scroll: false });
  };

  const handleCloseModals = () => {
    router.push("/", { scroll: false });
  };

  const handleOpenLightbox = (id: number) => {
    router.push(`/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=${id}`, {
      scroll: false,
    });
  };

  const handleNavigateLightbox = (id: number) => {
    router.replace(`/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=${id}`, {
      scroll: false,
    });
  };

  const handleBackToTour = () => {
    router.push("/?modal=PHOTO_TOUR_SCROLLABLE", { scroll: false });
  };

  const handleOpenExpandedPhoto = (photoId: number, rect: OriginRect) => {
    setExpandedPhoto({ photoId, originRect: rect });
  };

  const handleCloseExpandedPhoto = () => {
    setExpandedPhoto(null);
  };

  const handleNavigateExpandedPhoto = (photoId: number) => {
    setExpandedPhoto((prev) => (prev ? { ...prev, photoId } : null));
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      {/* Top Header */}
      <Header />

      {/* Floating Subnav on scroll */}
      <StickySubNav
        price={LISTING_DATA.pricePerStay}
        nights={LISTING_DATA.nights}
        rating={LISTING_DATA.rating}
        reviewCount={LISTING_DATA.reviewCount}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-[1120px] px-6 lg:px-0">
        <TitleSection title={LISTING_DATA.title} />

        <HeroPhotoGrid
          photos={LISTING_DATA.photos}
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenExpandedPhoto={handleOpenExpandedPhoto}
        />

        {/* 2-Column Split: Content & Sticky Sidebar */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">
          {/* Left Column */}
          <div className="min-w-0">
            <PropertyOverview
              propertyType={LISTING_DATA.propertyType}
              guests={LISTING_DATA.guests}
              bedrooms={LISTING_DATA.bedrooms}
              beds={LISTING_DATA.beds}
              bathrooms={LISTING_DATA.bathrooms}
              rating={LISTING_DATA.rating}
              reviewCount={LISTING_DATA.reviewCount}
            />

            <HostBrief
              name={LISTING_DATA.host.name}
              avatarColor={LISTING_DATA.host.avatarColor}
              yearsHosting={LISTING_DATA.host.yearsHosting}
            />

            <Highlights />

            <Description description={LISTING_DATA.description} />

            <WhereYouSleep />

            <AmenitiesSection amenities={LISTING_DATA.amenities} />

            <CalendarSection
              initialNights={LISTING_DATA.nights}
              location="Candolim"
            />
          </div>

          {/* Right Column: Sticky Reservation Widget (confined to top section, terminates with Calendar) */}
          <div className="hidden lg:block">
            <ReservationCard
              pricePerStay={LISTING_DATA.pricePerStay}
              nights={LISTING_DATA.nights}
              rating={LISTING_DATA.rating}
              reviewCount={LISTING_DATA.reviewCount}
              checkIn={LISTING_DATA.checkIn}
              checkOut={LISTING_DATA.checkOut}
              cancellationDate={LISTING_DATA.cancellationDate}
              guests={LISTING_DATA.guests}
            />
          </div>
        </div>

        {/* Full-Width Lower Sections (Placed after Calendar) */}
        <ReviewsSection
          rating={LISTING_DATA.rating}
          reviewCount={LISTING_DATA.reviewCount}
          reviews={LISTING_DATA.reviews}
        />

        <LocationSection
          location={LISTING_DATA.location}
          neighbourhoodHighlight={LISTING_DATA.neighbourhoodHighlight}
        />

        <HostProfileSection
          name={LISTING_DATA.host.name}
          avatarColor={LISTING_DATA.host.avatarColor}
          reviewCount={LISTING_DATA.host.reviewCount}
          rating={LISTING_DATA.host.rating}
          yearsHosting={LISTING_DATA.host.yearsHosting}
          bornDecade={LISTING_DATA.host.bornDecade}
          responseRate={LISTING_DATA.host.responseRate}
          responseTime={LISTING_DATA.host.responseTime}
          coHosts={LISTING_DATA.coHosts}
        />

        <ThingsToKnowSection thingsToKnow={LISTING_DATA.thingsToKnow} />

        {/* Bottom Related Listings */}
        <NearbyListingsSection listings={LISTING_DATA.nearbyListings} />
      </main>

      {/* Shared-Element Expanding Photo Viewer with Physical Growth Animation */}
      <AnimatePresence>
        {expandedPhoto && (
          <SharedElementPhotoModal
            key="shared-element-photo-modal"
            photo={
              LISTING_DATA.photos.find((p) => p.id === expandedPhoto.photoId) ||
              LISTING_DATA.photos[0]
            }
            photos={LISTING_DATA.photos}
            originRect={expandedPhoto.originRect}
            onClose={handleCloseExpandedPhoto}
            onNavigate={handleNavigateExpandedPhoto}
          />
        )}
      </AnimatePresence>

      {/* Overlay View 1: Full-Screen Photo Tour with AnimatePresence */}
      <AnimatePresence>
        {isPhotoTourOpen && activePhotoId === null && (
          <PhotoTourModal
            key="photo-tour-modal"
            rooms={LISTING_DATA.rooms}
            photos={LISTING_DATA.photos}
            onClose={handleCloseModals}
            onOpenLightbox={handleOpenLightbox}
          />
        )}
      </AnimatePresence>

      {/* Overlay View 2: Single Photo Lightbox with AnimatePresence */}
      <AnimatePresence>
        {isPhotoTourOpen && activePhotoId !== null && (
          <LightboxModal
            key="lightbox-modal"
            photos={LISTING_DATA.photos}
            currentId={activePhotoId}
            onClose={handleCloseModals}
            onNavigate={handleNavigateLightbox}
            onBackToTour={handleBackToTour}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-[#717171]">
          Loading listing...
        </div>
      }
    >
      <ListingPageContent />
    </Suspense>
  );
}
