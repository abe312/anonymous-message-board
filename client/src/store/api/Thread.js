import axios from 'axios';

const post = async form => {
  let { board } = form;
  board = board.split(' ')[0];
  delete form.board;
  const response = await axios.post(`/api/threads/${board}`, form);
  // const data = await response.json();
  console.log('response', response);
  let { data } = response;
  if (response.status >= 400) {
    throw new Error(response);
  }
  return data;
};

const put = async form => {
  let { board } = form;
  board = board.split(' ')[0];
  delete form.board;
  const response = await axios.put(`/api/threads/${board}`, form);
  let { data } = response;
  if (response.status >= 400) {
    throw new Error(response);
  }
  return data;
};

const get = async form => {
  let { board, thread_id } = form;
  board = board.split(' ')[0];
  delete form.board;
  let response;
  if (form.thread_id)
    response = await axios.get(`/api/threads/${board}/?thread_id=${thread_id}`);
  else response = await axios.get(`/api/threads/${board}`);
  console.log(response);
  let { data } = response;
  console.log(data);
  if (response.status >= 400) {
    throw new Error(response);
  }
  return data;
};

const DELETE = async form => {
  let { board } = form;
  board = board.split(' ')[0];
  console.log(form);
  delete form.board;
  const response = await axios.delete(`/api/threads/${board}`, {
    data: form,
  });
  let { data } = response;
  if (response.status >= 400) {
    throw new Error(response);
  }
  return data;
};

export { post, put, get, DELETE };
