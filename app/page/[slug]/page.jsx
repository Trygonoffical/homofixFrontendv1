import CustomPagesClient from './CustomPagesClient'

// Server-side metadata generation
export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.homofixcompany.com';
  const decodedSlug = decodeURIComponent(params.slug);
  const canonicalUrl = `${baseUrl}/page/${params.slug}`;
  
  let dynamicTitle = 'HomOfix Company';
  let dynamicDescription = 'HomOfix Company provides AC & Appliances Repair | Cleaning | Home Painting | Plumber | Electrician | Carpenter Services';

  // Bathroom Cleaning Service city pages
  switch (decodedSlug) {
    case 'bathroom-cleaning-service-in-delhi':
      dynamicTitle = 'Book Now the Expert Bathroom Cleaning Service in Delhi';
      dynamicDescription = 'Book a professional bathroom cleaning service in Delhi for sparkling tiles, stain-free taps, and a hygienic environment. Affordable rates, top results.';
      break;
    case 'bathroom-cleaning-service-in-faridabad':
      dynamicTitle = 'Bathroom Cleaning Service in Faridabad | HomOfix Company';
      dynamicDescription = 'Book trusted bathroom cleaning in Faridabad. Our team thoroughly cleans tiles, taps, and floors for a fresh, germ-free, and sparkling bathroom.';
      break;
    case 'bathroom-cleaning-service-in-noida':
      dynamicTitle = 'Book now a deep kitchen cleaning service and get 20% off';
      dynamicDescription = 'Keep your bathroom spotless with affordable bathroom cleaning in Noida. We remove stains, germs, and odors for a hygienic and fresh space at affordable prices.';
      break;
    case 'bathroom-cleaning-service-in-gurugram':
      dynamicTitle = 'Best Professional Bathroom Cleaning Service in Gurugram';
      dynamicDescription = 'Keep your bathroom fresh with deep bathroom cleaning in Gurugram. Starting at just ₹399, which is offered by HomOfix Company to make a shiny and fresh bathroom.';
      break;
    case 'bathroom-cleaning-service-in-ghaziabad':
      dynamicTitle = 'Sparkling Bathroom Cleaning Service Near You | Book Now';
      dynamicDescription = 'Affordable bathroom deep cleaning in Ghaziabad. We scrub, sanitize, and shine your bathroom for a healthy and sparkling clean space.';
      break;
    case 'bathroom-cleaning-service-in-hyderabad':
      dynamicTitle = 'Deep Bathroom Cleaning Service – Safe & Hygienic';
      dynamicDescription = 'Affordable bathroom deep cleaning service in Hyderabad. We scrub, sanitize, and shine your bathroom for a healthy and sparkling clean space.';
      break;
    case 'bathroom-cleaning-service-in-kanpur':
      dynamicTitle = 'Book Now Deep Bathroom Cleaning Service – Flat 20% Off';
      dynamicDescription = 'HomOfix Company offers a flat 20% off on deep bathroom cleaning service in Kanpur. Remove stains, germs, and odors for a sparkling, fresh bathroom today.';
      break;

    // Kitchen Cleaning Service city pages
    case 'kitchen-cleaning-service-in-delhi':
      dynamicTitle = 'Top-rated professional kitchen cleaning – Save Flat ₹400';
      dynamicDescription = 'Top-rated professional kitchen cleaning service provided by HomOfix Company. Save flat ₹400 and enjoy a spotless, hygienic, and grease-free kitchen today.';
      break;
    case 'kitchen-cleaning-service-in-faridabad':
      dynamicTitle = 'Professional Kitchen Cleaning – Special Offer 30% Off';
      dynamicDescription = 'Book professional kitchen cleaning with HomOfix Company and get a special 30% off. Enjoy deep cleaning, grease removal, and a fresh kitchen today.';
      break;
    case 'kitchen-cleaning-service-in-noida':
      dynamicTitle = 'Top Kitchen Cleaning Service Near You | HomOfix Company';
      dynamicDescription = 'HomOfix Company offers professional and affordable kitchen cleaning at your doorstep. Book now and enjoy discounts on a hassle-free deep cleaning service.';
      break;
    case 'kitchen-cleaning-service-in-gurugram':
      dynamicTitle = 'Best Professional Bathroom Cleaning Service in Gurugram';
      dynamicDescription = 'Keep your bathroom fresh with deep bathroom cleaning in Gurugram. Starting at just ₹399, which is offered by HomOfix Company to make a shiny and fresh bathroom.';
      break;
    case 'kitchen-cleaning-service-in-ghaziabad':
      dynamicTitle = 'Budget-Friendly Kitchen Cleaning Service Near You | Book Now';
      dynamicDescription = 'Keep your kitchen spotless with deep cleaning in Gurugram. Starting at just ₹799, HomOfix Company offers grease removal, sanitization & shine.';
      break;
    case 'kitchen-cleaning-service-in-hyderabad':
      dynamicTitle = 'Kitchen Cleaning Service Near You | Save Flat 30% | Book Now';
      dynamicDescription = 'Sparkle up your kitchen! Book HomOfix Company\'s cleaning service near you and save flat 30% on deep cleaning, grease removal & sanitization.';
      break;
    case 'kitchen-cleaning-service-in-kanpur':
      dynamicTitle = 'Deep Kitchen Cleaning Service – Book Now & Save Up to 30%';
      dynamicDescription = 'Book HomOfix Company\'s deep kitchen cleaning service now and save up to 30%. Expert scrubbing, grease removal, sanitization & stain-free shine at your doorstep.';
      break;

    // Sofa Cleaning Service city pages
    case 'sofa-cleaning-service-in-delhi':
      dynamicTitle = 'Affordable Sofa Cleaning Service – Starting At ₹379';
      dynamicDescription = 'Get professional sofa cleaning service with HomOfix Company starting at just ₹379. Remove dust, stains, odors & allergens for a fresh, spotless sofa today.';
      break;
    case 'sofa-cleaning-service-in-faridabad':
      dynamicTitle = 'Sofa Cleaning Service Near Me – Affordable & Hassle-Free';
      dynamicDescription = 'Book now the affordable sofa cleaning service near you with HomOfix Company. With hassle-free deep cleaning to remove dust, stains & odors for a fresh sofa.';
      break;
    case 'sofa-cleaning-service-in-noida':
      dynamicTitle = 'Eco-Friendly Sofa Cleaning – Save Up to 30% | Book Now';
      dynamicDescription = 'Book HomOfix Company\'s eco-friendly sofa cleaning service now and save up to 30%. Gentle on fabric, tough on stains for a fresh, healthy sofa for your comfort.';
      break;
    case 'sofa-cleaning-service-in-gurugram':
      dynamicTitle = 'Affordable Sofa Cleaning Service – Sparkle Your Home Now';
      dynamicDescription = 'Sparkle your home with HomOfix Company\'s affordable sofa cleaning service in Gurugram. Remove dust, stains & odors for a fresh, hygienic, and cozy sofa today.';
      break;
    case 'sofa-cleaning-service-in-ghaziabad':
      dynamicTitle = 'Budget-Friendly Sofa Cleaning Service Near You | Book Now';
      dynamicDescription = 'Book HomOfix Company\'s budget-friendly sofa cleaning service near you. Deep cleaning of the sofa, stain removal & odor control for a fresh, cozy sofa today.';
      break;
    case 'sofa-cleaning-service-in-hyderabad':
      dynamicTitle = 'Sofa Cleaning Service Near You | Save Flat 30% | Book Now';
      dynamicDescription = 'Book now with HomOfix Company sofa cleaning service near you and save 30%. Enjoy deep cleaning, stain removal, shampooing & odor-free comfort today.';
      break;
    case 'sofa-cleaning-service-in-kanpur':
      dynamicTitle = 'Quick & Professional Sofa Cleaning Service – Book Now Today';
      dynamicDescription = 'Refresh your home with HomOfix Company\'s quick & professional sofa cleaning service. Remove stains, dust & odors for a spotless, cozy sofa today.';
      break;

    // Full Home Cleaning Service city pages
    case 'full-home-cleaning-service-in-delhi':
      dynamicTitle = 'Home Cleaning Service Near Me – Book & Save Up to ₹1000';
      dynamicDescription = 'Book a full home cleaning service near you offered by HomOfix Company, save up to ₹1000. Get deep cleaning, sanitization & spotless shine for your entire home.';
      break;
    case 'full-home-cleaning-service-in-faridabad':
      dynamicTitle = 'Affordable Home Cleaning Service – Starting at ₹1799 Only';
      dynamicDescription = 'Starting at only ₹1799, HomOfix Company\'s affordable full home cleaning service for deep cleaning, germ removal, & sanitization for a refresh & spotless shine.';
      break;
    case 'full-home-cleaning-service-in-noida':
      dynamicTitle = 'Book Top-Rated House Cleaning Services | HomOfix Company';
      dynamicDescription = 'Book top-rated house cleaning services with HomOfix Company. Get expert deep cleaning, dust removal & sanitization for a spotless and hygienic home.';
      break;
    case 'full-home-cleaning-service-in-gurugram':
      dynamicTitle = 'Affordable Home Cleaning Service – Sparkle Your Home Now';
      dynamicDescription = 'Sparkle your home with HomOfix Company\'s affordable sofa cleaning service in Gurugram. Remove dust, stains & odors for a fresh, hygienic, and cozy sofa today.';
      break;
    case 'full-home-cleaning-service-in-ghaziabad':
      dynamicTitle = 'Home Deep Cleaning - Get 40% Discount with HomOfix Company';
      dynamicDescription = 'Book & Save 40% on home deep cleaning service with HomOfix Company. Expert sanitization, dust removal & stain-free shine for a spotless, hygienic home today.';
      break;
    case 'full-home-cleaning-service-in-hyderabad':
      dynamicTitle = 'Top Home Cleaning Services In Hyderabad | Book Now';
      dynamicDescription = 'Book top home cleaning services in Hyderabad with HomOfix Company. Affordable deep cleaning, sanitization & spotless shine for a fresh, healthy home.';
      break;
    case 'full-home-cleaning-service-in-kanpur':
      dynamicTitle = 'Budget-Friendly Home Cleaning Service – Book Now Today';
      dynamicDescription = 'Book the HomOfix Company\'s budget-friendly full home cleaning service today. Enjoy deep cleaning, dust removal & sanitization for a spotless and hygienic home.';
      break;

    // AC Repair & Service city pages
    case 'ac-repair-and-service-in-delhi':
      dynamicTitle = 'Affordable AC Repair & Service – Save Up to ₹300';
      dynamicDescription = 'Book the HomOfix Company\'s affordable AC repair & service today and save up to ₹300. Get expert cooling solutions, fast repairs & hassle-free maintenance.';
      break;
    case 'ac-repair-and-service-in-faridabad':
      dynamicTitle = 'Best AC Repair & Maintenance – Save Up 30% Now';
      dynamicDescription = 'Get the best AC repair & maintenance at HomOfix Company. Save up to 30% now and enjoy efficient cooling and fresh air with expert care at your doorstep.';
      break;
    case 'ac-repair-and-service-in-noida':
      dynamicTitle = 'Air Conditioner repair & servicing Near You | Book Now';
      dynamicDescription = 'Book now the HomOfix Company\'s air conditioner repair & servicing near you. With fast and expert care to keep your AC cooling efficiently at affordable prices.';
      break;
    case 'ac-repair-and-service-in-gurugram':
      dynamicTitle = 'Best AC Repair in Gurugram | Quick & Reliable Service';
      dynamicDescription = 'Quick & reliable AC repair and service in Gurugram by HomOfix Company. Book now for professional service, fast repairs & efficient cooling at your doorstep.';
      break;
    case 'ac-repair-and-service-in-ghaziabad':
      dynamicTitle = 'Complete AC Repair & Service – Flat 25% Discount';
      dynamicDescription = 'Book now with HomOfix Company\'s complete AC repair & service and save flat 25%. Expert repair, maintenance & quick servicing for long-lasting cooling comfort.';
      break;
    case 'ac-repair-and-service-in-hyderabad':
      dynamicTitle = 'Affordable AC Repair Service | Starting at just ₹399';
      dynamicDescription = 'Save time & money with HomOfix Company\'s AC repair and service starting at just ₹399. Fast and reliable repairs to keep your AC cool & efficient.';
      break;
    case 'ac-repair-and-service-in-kanpur':
      dynamicTitle = 'Budget-Friendly AC Repairing Service – Book Now Today';
      dynamicDescription = 'Get the budget-friendly AC repairing service with HomOfix Company today. Expert repair, quick service & affordable prices for long-lasting cooling comfort.';
      break;

    default:
      dynamicTitle = 'HomOfix Company';
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

export default function CustomPages({ params }) {
  return <CustomPagesClient params={params} />
}