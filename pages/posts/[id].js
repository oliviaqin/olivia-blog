import { useRouter } from 'next/router';
import BlogTemplate from '../../components/BlogTemplate/blog_template';
import { imageList, blogContent } from '../../utils/constants'; // Import from utility file

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>No data found for this post.</div>;
  }

  return <BlogTemplate title={post.title} photos={post.photos} />;
}

export async function getStaticProps({ params }) {
  const image = imageList.find(img => img.id === params.id);
  const post = image ? blogContent[image.blogKey] : null;

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const paths = imageList.map(image => ({
    params: { id: image.id },
  }));

  return {
    paths,
    fallback: true,
  };
}