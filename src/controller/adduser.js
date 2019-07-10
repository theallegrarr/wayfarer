import data from '../model/data';

function addUser(info) {
  const user = data.find(x => x.email === info.email);

  if (user) {
    return ({
      message: 'Failed',
      error: 'email already exists',
    });
  }

  data.push(info);
  return 'success';
}

export default addUser;
