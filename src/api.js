import axios from "axios";

const api = axios.create({
  baseURL: `https://northcoders-news-03ck.onrender.com/api/`,
});

export function getAllArticles (page) {
  return api.get(`articles?p=${page}`);
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

export function deleteComment (commentId) {
    return api.delete(`comments/${commentId}`)
}

// exports.postRequest = (url, body) => {
//   return axios.post(url, body);
// };

// exports.deleteRequest = (url) => {
//   return axios.delete(url);
// };
