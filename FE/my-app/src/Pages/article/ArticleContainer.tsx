import * as React from "react"
import { useSelector } from "react-redux"
import { addArticle, removeArticle } from "../../_store/actions/articleActionCreator"
import { shallowEqual } from "react-redux"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { AddArticle } from "./AddArticle"
import { Article } from "./Article"
import { fetchArticlePending, fetchArticleSuccess, fetchArticleError } from "../../_store/actions/articleActionCreator"

const ArticleContainer: React.FC = () => {
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual // Yêu cầu Redux sử dụng so sánh nông khi xác định sự khác biệt.
  )

  const isPending: boolean = useSelector(
    (state: ArticleState) => state.pending,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch()

  // Dispatch Function
  const saveArticle = React.useCallback(
    (artical: IArticle) => dispatch(addArticle(artical)),
    [dispatch]
  ) 

  const fetchArticles = React.useCallback(
    (articals: IArticle[]) => {
      dispatch(fetchArticlePending())
      fetch("http://localhost:5088/Employee/get")
        .then(res => res.json())
        .then(res => {
          if (res.error)
            throw (res.error)
          dispatch(fetchArticleSuccess(articals, res))
        })
        .catch(error => {
          dispatch(fetchArticleError(error))
        })
    },
    [dispatch]
  )

  return (
    <main>
      <h1>My Articles</h1>
      <AddArticle
        saveArticle={saveArticle}
        isPending={isPending}
        fetchArticles={fetchArticles} />
      {
        articles && articles.length > 0 ? (
          articles.map(article => (
            <Article
              key={article.id}
              article={article}
              removeArticle={removeArticle}
            />
          ))
        ) : (
          <p>No articles to display</p> // Display a message if there are no articles
        )
      }
    </main>
  )
}

export default ArticleContainer;