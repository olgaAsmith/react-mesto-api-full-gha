export const registration = (email, password) => {
  return fetch('http://localhost:3000/signup', {
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
  return fetch('http://localhost:3000/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then((response => response.json()))
  .then(data => {
    localStorage.setItem('token', data.token)
  })
  .catch(err => console.log(err))
};

export const checkToken = () => {
  return fetch('http://localhost:3000/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(err => console.log(err))
}

export const logout = () => {
  return fetch('http://localhost:3000/logout', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

