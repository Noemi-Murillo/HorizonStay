import Gallery from '@/components/cabinCompontes/Gallery';

const images = [
  { src: '/cabins/cabinOne.png', alt: 'Cabin 1' },
  { src: '/cabins/cabinTwo.png', alt: 'Cabin 2' },
  { src: '/cabins/cabinThree.png', alt: 'Cabin 3' },
  { src: '/cabins/cabinFour.png', alt: 'Cabin 4' },
  { src: '/cabins/plansOne.png', alt: 'Plan 1' },
  { src: '/cabins/plansTwo.png', alt: 'Plan 2' },
  { src: '/cabins/plansThree.png', alt: 'Plan 3' },
  { src: '/cabins/planCabinThree.png', alt: 'Plan 4' },  
  { src: '/cabins/horizonStay.png', alt: 'Horizoy Stay' },
  { src: '/cabins/horizonStayTwo.png', alt: 'Horizon Stay' },
];

export default function GaleriaPage() {
  return <Gallery images={images} />;
}
