
import DataPage from './data';
import { useRouter } from 'next/navigation';


// Use async to fetch data dynamically or manipulate the params
export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.homofixcompany.com';
  const decodedSlug = decodeURIComponent(params.slug);
  const encodedSlug = encodeURIComponent(decodedSlug.replace(/&/g, 'and'));
  const canonicalUrl = `${baseUrl}/category/${encodedSlug}`;
  // Extract params to create a dynamic title and description
  const { slug } = params; // Assuming the param is called 'slug', adjust based on your URL structure
  // const router = useRouter()
  // const currentUrl = `${window.location.href}`;
  let dynamicTitle = `${slug}`; // Fallback title
  let dynamicDescription = ``; // Fallback description

  // Customize the title and description based on the category or params
  switch (decodedSlug) {
    case 'AC-Repair-and-Service':
      dynamicTitle = 'Fast & Affordable AC Service by Industry Experts. Book Now!';
      dynamicDescription = 'Facing AC issues? Book expert repair, servicing, and gas refill with HomOfix Company now! Quick, affordable, and professional solutions-just a tap away.';
      break;
    case 'Washing-Machine-Repair':
      dynamicTitle = 'Book Expert Washing Machine Repair Service at Your Doorstep';
      dynamicDescription = 'Washing machine not working? Book reliable technicians for quick doorstep repair with HomOfix Company. Affordable, expert service-tap to schedule now!';
      break;
    case 'Refrigerator-Repair':
      dynamicTitle = 'Quick Fridge Repair by Skilled Experts with HomOfix Company';
      dynamicDescription = 'Facing issues related to the fridge? HomOfix Company trusted experts are Ready to solve your problem. Book reliable single & double door fridge repair today!';
      break;
    case 'Geyser-Repair':
      dynamicTitle = 'Trusted geyser repair at home | Quick service with experts';
      dynamicDescription = 'HomOfix Company offers expert geyser repair service-repair, maintenance & installation. 100% verified professional technicians. Book now for fast support!';
      break;
    case 'Television-Repair':
      dynamicTitle = 'Trusted Television Repair Service-Book with HomOfix Company!';
      dynamicDescription = 'HomOfix Company offers expert LCD, LED & Smart TV repair. With Skilled professionals, doorstep service & easy booking. Tap now to schedule!';
      break;
    case 'Microwave-Repair':
      dynamicTitle = 'Book Microwave Repair by Verified Experts at HomOfix Company';
      dynamicDescription = 'Get microwave repair by verified experts at HomOfix Company. Fast, reliable service to fix your microwave and restore efficient cooking -Book your service now!';
      break;
    case 'Chimney-Repair':
      dynamicTitle = 'Expert Chimney Repair Service at Your Doorstep - Book Now!';
      dynamicDescription = 'Need expert chimney repair? HomOfix Company brings skilled professionals to your doorstep to keep your kitchen smoke-free and your chimney efficient.';
      break;
    case 'Water-Purifier-Repair':
      dynamicTitle = 'Book Water Purifier Service by Trusted Experts with HomOfix Company';
      dynamicDescription = 'Ensure 100% pure drinking water with Homofix Company expert water purifier service. Trusted technicians & quality parts. Book your service now!';
      break;
    case 'Bathroom-Cleaning':
      dynamicTitle = 'Professional Bathroom Cleaning & Deep Cleaning Service';
      dynamicDescription = 'Book your bathroom cleaning service near me with deep cleaning, classic cleaning, and professional bathroom cleaning by experts. Sparkling washrooms guaranteed.';
      break;
    case 'Kitchen-Cleaning':
      dynamicTitle = 'Top Kitchen Cleaning Service for Your Home by Experts';
      dynamicDescription = 'Experience the best kitchen cleaning service for Your Home by Experts. Get deep cleaning, stain removal, and a hygienic kitchen with trained professionals.';
      break;
    case 'Sofa-Cleaning':
      dynamicTitle = 'Top Sofa Cleaning Service Near Me | Book Online Now';
      dynamicDescription = 'Experience the top sofa cleaning service near me | Book Online Now for expert deep cleaning of the sofas, cushions, and upholstery by trained professionals.';
      break;
    case 'Full-Home-Cleaning':
      dynamicTitle = 'Affordable Home Cleaning Services at your doorstep';
      dynamicDescription = 'Experience affordable full home cleaning and bungalow cleaning services at your doorstep. Book today for deep, hassle-free cleaning and enjoy a fresh home.';
      break;
    case 'Bungalow-Cleaning':
      dynamicTitle = 'Professional Bungalow Cleaning Service at your Doorstep';
      dynamicDescription = 'Ensure your Villa stays Spotless & Stainless with our Professional Villa Cleaning Services in Delhi NCR and Kanpur. We offer Bungalow cleaning & villa cleaning';
      break;
    default:
      dynamicTitle = `HomOfix Company `;
      dynamicDescription = 'HomOfix Company provides AC & Appliances Repair | Cleaning | Home Painting | Plumber | Electrician | Carpenter Services';
      break;
  }
  

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


const SubcategoryPage = ({ params } ) => {

  return (
    <DataPage params={params} />
  )
  
}
const slugify = (text) => {
  return text.replace(/-/g, ' ');
};


export default SubcategoryPage;