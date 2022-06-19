import { post } from '../api'

export const createArticles = async(articles) => {
    return post('http://localhost:8080/articles/bulk', articles)
}