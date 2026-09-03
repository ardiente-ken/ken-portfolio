"use client";

import { useState, useEffect, useCallback } from "react";
import type { Project, TechStackItem } from "@/lib/types";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ProjectCard({
  project,
  techStacks,
  index,
}: {
  project: Project;
  techStacks: TechStackItem[];
  index: number;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Lightbox transition states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [animationKey, setAnimationKey] = useState(0);

  const tags = project.techStack
    .map((id) => techStacks.find((t) => t.id === id))
    .filter(Boolean) as TechStackItem[];

  const hasImages = project.images && project.images.length > 0;
  const imageCount = project.images?.length || 0;

  // Card view always displays the first photo
  const cardImage = hasImages ? project.images[0] : null;
  // Modal lightbox tracks active user selection
  const modalImage = hasImages ? project.images[selectedImageIndex] : null;

  const handleOpenModal = () => {
    if (!hasImages) return;
    setIsModalOpen(true);
    requestAnimationFrame(() => setIsModalVisible(true));
  };

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 200);
  }, []);

  const navigateImage = useCallback(
    (newIndex: number, direction: "left" | "right") => {
      setSlideDirection(direction);
      setSelectedImageIndex(newIndex);
      setAnimationKey((prev) => prev + 1);
    },
    []
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const prevIdx = selectedImageIndex === 0 ? imageCount - 1 : selectedImageIndex - 1;
      navigateImage(prevIdx, "left");
    },
    [selectedImageIndex, imageCount, navigateImage]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const nextIdx = selectedImageIndex === imageCount - 1 ? 0 : selectedImageIndex + 1;
      navigateImage(nextIdx, "right");
    },
    [selectedImageIndex, imageCount, navigateImage]
  );

  useEffect(() => {
    if (!isModalOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleCloseModal, handlePrev, handleNext]);

  return (
    <>
      <article className="flex flex-col border border-line bg-paper text-xs overflow-hidden w-full">
        {/* 1. IMAGES (Top Section - Always uses cardImage / first pic) */}
        <div
          onClick={handleOpenModal}
          className={`relative w-full aspect-[16/9] bg-neutral-900 overflow-hidden group border-b border-line flex items-center justify-center ${
            hasImages ? "cursor-pointer" : ""
          }`}
        >
          {cardImage ? (
            <>
              {/* Blurred Ambient Backdrop */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-md opacity-25 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${cardImage})` }}
              />

              {/* Main Preview Frame */}
              <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cardImage}
                  alt={`${project.title} preview`}
                  className="max-h-full max-w-full object-contain rounded-xs shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>

              {/* Hover Badge */}
              <div className="absolute inset-0 z-20 bg-paper/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="font-mono text-[10px] text-ink bg-paper px-3 py-1.5 border border-line shadow-xs">
                  Expand ({imageCount})
                </span>
              </div>
            </>
          ) : (
            <ImagePlaceholder label={`fig. ${String(index + 1).padStart(2, "0")}`} />
          )}
        </div>

        {/* CONTENT BODY */}
        <div className="flex flex-col p-5 md:p-6 gap-4">
          {/* 2. PROJECT TITLE */}
          <div className="flex items-baseline justify-between gap-3 border-b border-line/30 pb-2.5">
            <h3 className="font-display font-semibold text-lg md:text-xl text-ink">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-ink-soft shrink-0">
              fig. {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* 3. DESCRIPTION */}
          <p className="text-xs md:text-sm text-ink-soft leading-relaxed whitespace-pre-line">
            {project.description}
          </p>

          {/* 4. TECH STACK & LINKS */}
          <div className="pt-4 border-t border-line/40 flex flex-wrap items-center justify-between gap-4">
            {tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <li
                    key={t.id}
                    className="font-mono text-[10px] px-2 py-0.5 border border-line text-ink-soft bg-paper-raised"
                  >
                    {t.name}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-4 font-mono text-xs shrink-0 ml-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-ink pb-0.5 hover:text-blue hover:border-blue transition-colors"
                >
                  Live Demo ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-blue transition-colors"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      {isModalOpen && modalImage && (
        <div
          onClick={handleCloseModal}
          className={`fixed inset-0 z-50 bg-paper/80 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8 transition-opacity duration-200 ease-out ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-5xl flex items-center justify-between font-mono text-xs border-b border-line pb-3 transition-transform duration-200 ease-out ${
              isModalVisible ? "translate-y-0" : "-translate-y-2"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">{project.title}</span>
              <span className="text-ink-soft">
                ({selectedImageIndex + 1}/{imageCount})
              </span>
            </div>
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-2.5 py-1 border border-line bg-paper text-ink hover:text-blue hover:border-blue transition-colors text-[10px]"
            >
              Close [ESC]
            </button>
          </div>

          {/* Canvas */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-5xl flex-1 my-4 bg-neutral-900 border border-line overflow-hidden flex items-center justify-center p-4 group transition-transform duration-200 ease-out ${
              isModalVisible ? "scale-100" : "scale-95"
            }`}
          >
            <div
              key={`bg-${animationKey}`}
              className="absolute inset-0 bg-cover bg-center blur-md opacity-25 scale-110 pointer-events-none transition-opacity duration-300"
              style={{ backgroundImage: `url(${modalImage})` }}
            />

            <div
              key={`img-${animationKey}`}
              className="relative z-10 w-full h-full flex items-center justify-center animate-slide-fade"
              style={{
                animation: `${
                  slideDirection === "right" ? "slideFromRight" : "slideFromLeft"
                } 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalImage}
                alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-xs shadow-md"
              />
            </div>

            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-paper/90 border border-line text-ink hover:text-blue backdrop-blur-xs transition-all hover:scale-105 active:scale-95 font-mono text-xs"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-paper/90 border border-line text-ink hover:text-blue backdrop-blur-xs transition-all hover:scale-105 active:scale-95 font-mono text-xs"
                >
                  &#8594;
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {imageCount > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-2 overflow-x-auto max-w-full p-1.5 border border-line bg-paper-raised backdrop-blur-sm transition-transform duration-200 ease-out ${
                isModalVisible ? "translate-y-0" : "translate-y-2"
              }`}
            >
              {project.images?.map((imgUrl, imgIdx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() =>
                    navigateImage(
                      imgIdx,
                      imgIdx > selectedImageIndex ? "right" : "left"
                    )
                  }
                  className={`relative h-10 w-14 border overflow-hidden transition-all flex-shrink-0 bg-neutral-900 flex items-center justify-center ${
                    selectedImageIndex === imgIdx
                      ? "border-blue ring-1 ring-blue opacity-100 scale-105"
                      : "border-line opacity-50 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${imgIdx + 1}`}
                    className="max-h-full max-w-full object-contain p-0.5"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}