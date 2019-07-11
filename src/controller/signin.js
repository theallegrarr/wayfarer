import data from '../model/data';

function signIn(mail) {
  return data.find(x => x.email === mail);
}

export default signIn;
