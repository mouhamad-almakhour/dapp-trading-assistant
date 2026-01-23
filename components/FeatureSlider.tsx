"use client";
import { useEffect, useState } from "react";
import { FEATURES } from "@/lib/constants";

import Image from "next/image";

const FeatureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-wrapper">
      <div className="relative">
        <div
          className="carousel-root "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {FEATURES.map((feature) => (
                <div key={feature.id} className="carousel-slide">
                  {/* Image Container */}
                  <div className="carousel-image-wrapper">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="carousel-image"
                      priority={feature.id === 1}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="carousel-content">
                    <h3 className="carousel-title font-bold">
                      {feature.title}
                    </h3>
                    <p className="carousel-description">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="carousel-dots">
          {FEATURES.map((_, index) => (
            <button
              key={index}
              color="dark"
              onClick={() => goToSlide(index)}
              className={`carousel-dot ${
                currentIndex === index ? "active" : "inactive"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;
