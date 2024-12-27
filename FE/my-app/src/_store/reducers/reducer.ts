import * as actionTypes from '../actionTypes';

const initialState: ArticleState = {
    articles: [
        {
            id: 1,
            title: "post 1",
            body:
                "Content 1",
        },
        {
            id: 2,
            title: "post 2",
            body:
                "Content 2",
        },
    ],
    pending: true,
}

const reducer = (
    state: ArticleState = initialState,
    action: ArticleAction
): ArticleState => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE:
            const newArticle: IArticle = {
                id: Math.random(), // not really unique
                title: action.article?.title ?? "",
                body: action.article?.body ?? "",
            }
            return {
                ...state,
                articles: state.articles.concat(newArticle),
                pending: false
            }
        case actionTypes.REMOVE_ARTICLE:
            const updatedArticles: IArticle[] = state.articles.filter(
                article => article.id !== action.article!.id
            )
            return {
                ...state,
                articles: updatedArticles,
            }
        case actionTypes.FETCH_ARTICLE_PENDING:
            return {
                ...state,
                pending: true,
            }
        case actionTypes.FETCH_ARTICLE_SUCCESS:
            return {
                ...state,
                pending: false,
                articles: action.articles ?? []
            }
        case actionTypes.FETCH_ARTICLE_ERROR:
            return {
                ...state,
                pending: true,
                error: action.error
            }
    }
    return state
}

export default reducer


