'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CabinCard from './CabinCard';
import { cabins } from '../../data/cabins';

type CabinListProps = {
  type: 'forest' | 'lake' | 'mountain';
};
const CabinList = ({ type }: CabinListProps) => {
  const filteredCabins = cabins.filter((cabin) => cabin.type === type);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 20,
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 10000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const totalSlides = instanceRef.current?.track.details.slides.length || 0;
  const perView =
    typeof instanceRef.current?.options.slides === 'object' &&
    instanceRef.current?.options.slides !== null &&
    'perView' in instanceRef.current?.options.slides
      ? (instanceRef.current.options.slides.perView as number)
      : 1;
  const totalDots = Math.ceil(totalSlides / perView);

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-10 relative">

      <div ref={sliderRef} className="keen-slider overflow-hidden">
        {filteredCabins.map((cabin) => (
        <div key={cabin.id} className="keen-slider__slide max-w-sm w-full">
          <CabinCard cabin={cabin} />
        </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-6 gap-3">
          {[...Array(totalDots).keys()].map((idx) => {
            const isActive = currentSlide === idx * perView;
            return (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx * perView)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-black scale-125 shadow-md'
                    : 'bg-gray-400 scale-100'
                }`}
              ></button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CabinList;
