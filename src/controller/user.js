import data from '../model/data';

function getUser(id) {
  if (id === null || id === undefined) {
    return data;
  }
  return data.find(x => x.id === id);
}

export default getUser;
