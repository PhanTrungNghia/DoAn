import * as actionTypes from '../actionTypes';

export function addArticle(article: IArticle) {
  if (!article || !article.title || !article.body) {
    console.error("Invalid article object", article);
    return {
      type: actionTypes.INVALID_ARTICLE,
    };
  }
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article,
  }

  return simulateHttpRequest(action)
}

export function removeArticle(article: IArticle) {
  if (!article || !article.title || !article.body) {
    console.error("Invalid article object", article);
    return {
      type: actionTypes.INVALID_ARTICLE,
    };
  }
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: ArticleAction) {
  if (!action || !action.type) {
    console.error("Invalid action object", action);
    return {
      type: actionTypes.INVALID_ACTION,
    };
  }
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}

// Action Creator for calling API article
export function fetchArticlePending() {
  const actionPending: ArticleAction = {
    type: actionTypes.FETCH_ARTICLE_PENDING
  }
  return actionPending
}

export function fetchArticleSuccess(articles: IArticle[], data: any[]) {
  const actionSuccess: ArticleAction = {
    type: actionTypes.FETCH_ARTICLE_SUCCESS,
    articles: articles

  }
  console.log(data)
  return actionSuccess
}

export function fetchArticleError(error: Error) {
  const actionError: ArticleAction = {
    type: actionTypes.FETCH_ARTICLE_ERROR,
    error: error
  }
  return actionError
}



