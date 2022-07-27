import { getAllArticles } from './mdx'

export async function getAllArticlesProp () {
    const articles = await getAllArticles()

    articles
      .map((article: any) => article.data)
      .sort((a: any, b: any) => {
        if (a.data.publishedAt > b.data.publishedAt) return 1
        if (a.data.publishedAt < b.data.publishedAt) return -1
  
        return 0
      })
  
    return {
      props: {
        posts: articles.reverse(),
      },
    }
}