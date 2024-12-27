import * as React from 'react'

type Props = {
    saveArticle: (article: IArticle | any) => void
    fetchArticles : (articles: IArticle[] | any) => void
    isPending: boolean
}

export const AddArticle: React.FC<Props> = ({ saveArticle, fetchArticles ,isPending }) => {
    const [article, setArticle] = React.useState<IArticle | {}>()

    const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
        setArticle({
            ...article,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    const addNewArticle = (e: React.FormEvent) => {
        e.preventDefault()
        // saveArticle(article)
        fetchArticles(article)
    }

    return (
        <form onSubmit={addNewArticle} className="Add-article">
            <input
                type="text"
                id="title"
                placeholder="Title"
                onChange={handleArticleData}
            />
            <input
                type="text"
                id="body"
                placeholder="Description"
                onChange={handleArticleData}
            />
            <br />
            <div>
                <label>isPending: </label> <p>{isPending ? "Đang chờ" : "Hoàn tất"}</p>
            </div>
            <button disabled={article === undefined ? true : false}>
                Add article
            </button>
        </form>
    )
}
