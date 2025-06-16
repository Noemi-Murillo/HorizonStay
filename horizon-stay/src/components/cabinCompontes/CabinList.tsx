'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type CabinListProps = {
  type: 'forest' | 'lake' | 'mountain';
};

const getImagesByType = (type: string): string[] => {
  switch (type) {
    case 'forest':
      return ['/cabins/Forest/1.png', '/cabins/Forest/2.png', '/cabins/Forest/3.png', '/cabins/Forest/4.png'];
    case 'lake':
      return ['/cabins/Lake/1.png', '/cabins/Lake/2.png', '/cabins/Lake/3.png', '/cabins/Lake/4.png', '/cabins/Lake/5.png', '/cabins/Lake/6.png'];
    case 'mountain':
      return ['/cabins/Tree/1.png', '/cabins/Tree/2.png', '/cabins/Tree/3.png', '/cabins/Tree/4.png', '/cabins/Tree/5.png'];
    default:
      return [];
  }
};

const CabinList = ({ type }: CabinListProps) => {
  const images = useMemo(() => getImagesByType(type), [type]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 10 },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      intervalRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [instanceRef]);

  const totalDots = instanceRef.current?.track.details.slides.length || 0;

  return (
    <section className="max-w-screen-md mx-auto px-4 py-10 relative">
      <div ref={sliderRef} className="keen-slider overflow-hidden rounded-lg">
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide flex justify-center items-center">
            <Image
              src={src}
              alt={`Cabaña ${type} ${idx + 1}`}
              width={800}
              height={500}
              className="rounded-lg object-cover"
              priority={idx === 0} // Mejora LCP
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {loaded && (
        <div className="flex justify-center mt-4 gap-3">
          {[...Array(totalDots).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === idx ? 'bg-black scale-125' : 'bg-gray-400'
              }`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
};

export default CabinList;
