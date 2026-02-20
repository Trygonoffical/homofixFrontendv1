import ProductDetailPage from './data';
import { seoData } from './seoMap';

export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.homofixcompany.com';
  const decodedSlug = decodeURIComponent(params.slug);
  const encodedSlug = encodeURIComponent(decodedSlug.replace(/&/g, 'and'));
  const encodedProductId = encodeURIComponent(params.productId);
  const canonicalUrl = `${baseUrl}/category/${encodedSlug}/product/${encodedProductId}`;
  
  // Look up SEO data by productId
  const productSEO = seoData[params.productId];

  const dynamicTitle = productSEO?.title || `Product Details - HomOfix Company`;
  const dynamicDescription = productSEO?.description || 'View detailed information and book our professional services';

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const ProductPage = ({ params }) => {
  return (
    <ProductDetailPage params={params} />
  );
};

export default ProductPage;