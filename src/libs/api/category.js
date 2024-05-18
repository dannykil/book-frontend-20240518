// import qs from 'qs';
import client from './client';

export const listCategory = (page) => {
  // console.log('page : ' + page);
  // console.log('queryString : ' + queryString);
  // const queryString = qs.stringify({
  //   page,
  // });
  return client.get('/api/category');
};

export const writeCategory = ({ categoryName, note }) =>
  client.post('/api/category', { categoryName, note });

// export const writeCategory = ({ category }) =>
//   client.post('/api/category', { category });

// export const listCategory = ({ page, username, tag }) => {
//   const queryString = qs.stringify({
//     page,
//     username,
//     tag,
//   });
//   return client.get(`/api/category`);
// };

export const readCategory = (id) => client.get(`/api/category/${id}`);

// export const editCategory = ({ category }) =>
//   client.patch(`/api/category`, {
//     category,
//   });

export const editCategory = ({ categoryName, note, id }) =>
  client.patch(`/api/category`, {
    categoryName,
    note,
    id,
  });

export const deleteCategory = (id) => client.delete(`/api/category/${id}`);
