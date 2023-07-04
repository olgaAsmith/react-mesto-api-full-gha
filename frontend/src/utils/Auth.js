export const registration = (email, password) => {
  return fetch('https://api.mesto-solarsystem.nomoreparties.sbs/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch('https://api.mesto-solarsystem.nomoreparties.sbs/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
  .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch('https://api.mesto-solarsystem.nomoreparties.sbs/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`,
    }
    credentials: 'include',
  })
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
}

