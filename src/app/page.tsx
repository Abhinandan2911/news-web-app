import { getArticles } from '@/app/actions/articles';
import HomeFeedClient from './HomeFeedClient';

export default async function HomePage() {
  const articles = await getArticles('PUBLISHED');
  return <HomeFeedClient initialArticles={articles} />;
}
