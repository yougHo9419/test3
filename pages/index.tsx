import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const route = useRouter();
  useEffect(() => {
    route.push('/mapview')
  }, []);
  return true;
};

export default IndexPage;
