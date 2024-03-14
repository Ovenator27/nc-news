import axios from "axios";

const api = axios.create({
  baseURL: `https://northcoders-news-03ck.onrender.com/api/`,
});

export function getAllArticles (page, sortBy, orderBy) {
  return api.get(`articles?p=${page}&sort_by=${sortBy}&order=${orderBy}`);
};

export function getSingleArticle (articleId) {
    return api.get(`articles/${articleId}`)
}

export function patchArticle (articleId, body) {
    return api.patch(`articles/${articleId}`, body)
}

export function getComments (articleId) {
    return api.get(`articles/${articleId}/comments`)
}

export function postComment (articleId, body) {
    return api.post(`articles/${articleId}/comments`, body)
}

export function patchComment (commentId, body) {
    return api.patch(`comments/${commentId}`, body)
}

export function deleteComment (commentId) {
    return api.delete(`comments/${commentId}`)
}

export function getTopics () {
    return api.get(`topics`)
}

export function getArticlesByTopic (topic) {
    return api.get(`topics/${topic}`)
}

export function getAllUsers () {
    return api.get(`users`)
}

export function postArticle (body) {
    return api.post(`articles/`, body)
}

export function deleteArticle (articleId) {
    return api.delete(`articles/${articleId}`)
}

