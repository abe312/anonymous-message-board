import axios from 'axios';

const POST = async form => {
  let { board } = form;
  board = board.split(' ')[0];
  delete form.board;
  const response = await axios.post(`/api/replies/${board}`, form);
  // const data = await response.json();
  console.log('response', response);
  let { data } = response;
  if (response.status >= 400) {
    throw new Error(response);
  }
  return data;
};

const PUT = async form => {
  let { board } = form;
  board = board.split(' ')[0];
  delete form.board;
  const response = await axios.put(`/api/replies/${board}`, form);
  let { data } = response;
  if (response.status >= 400) {
    throw new Error(response);
  }
  return data;
};

const GET = async form => {
  let { board, thread_id } = form;
  board = board.split(' ')[0];
  delete form.board;
  let response;
  if (form.thread_id)
    response = await axios.get(`/api/replies/${board}/?thread_id=${thread_id}`);
  else response = await axios.get(`/api/replies/${board}`);
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
  const response = await axios.delete(`/api/replies/${board}`, {
    data: form,
  });
  let { data } = response;
  console.log(response)
  console.log(data)
  if (response.status >= 400) {
    throw new Error(response);
  }
  return data;
};

export { POST, PUT, GET, DELETE };
