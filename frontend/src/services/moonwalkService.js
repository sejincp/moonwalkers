import sendRequest from "./sendRequest";

const BASE_URL = '/api/moonwalks';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(content) {
  return sendRequest(BASE_URL, 'POST', content);
}

export async function deleteMoonwalk(moonwalkId) {
  return sendRequest(`${BASE_URL}/${moonwalkId}`, 'DELETE', moonwalkId);
}

// comments

export async function createComment(moonwalkId, comment) {
  return sendRequest(`${BASE_URL}/${moonwalkId}/comments`, 'POST', comment);
}