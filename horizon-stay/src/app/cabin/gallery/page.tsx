import Gallery from '@/components/cabinCompontes/Gallery';

const images = [
  { src: '/images/cabana1.jpg', alt: 'Cabaña 1' },
  { src: '/images/cabana2.jpg', alt: 'Cabaña 2' },
  { src: '/images/paisaje1.jpg', alt: 'Paisaje 1' },
  { src: '/images/interior1.jpg', alt: 'Interior 1' },
  { src: '/images/noche1.jpg', alt: 'Cabaña de noche' },
  { src: '/images/familia1.jpg', alt: 'Turistas felices' },
];

export default function GaleriaPage() {
  return <Gallery images={images} />;
}
