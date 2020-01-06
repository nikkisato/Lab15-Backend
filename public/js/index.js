const root = document.getElementById('root');
const form = document.createElement('form');

const displaySignup = () => {
  form.id = 'Signup';
  form.innerHTML = `
    <fieldset>
      <legend>Signup</legend>
      <input name="name" type="text" placeholder="Name">
      <input name="email" type="text" placeholder="Email">
      <input name="password" type="password" placeholder="Password">
      <button id="user-button">Signup</button>
    </fieldset>
    <p id="switcher">Already a user?</p>
    <button id="display-login">Click here to log in!</button>
  `;  

  form
    .addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(() => {
          window.location.reload();
        });
    });

  root.appendChild(form);

  const loginButton = document.getElementById('display-login');

  loginButton
    .addEventListener('click', displayLogin);
};

const displayLogin = () => {
  form.id = 'Login';
  form.innerHTML = `
    <fieldset>
      <legend>Login</legend>
      <input name="email" type="text" placeholder="Email">
      <input name="password" type="password" placeholder="Password">
      <button id="user-button">Log In</button>
    </fieldset>
    <p id="switcher">Not yet a user?</p>
    <button id="display-signup">Click here to sign up!</button>
  `;

  form
    .addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const user = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(() => {
          window.location.reload();
        });
    });

  root.appendChild(form);

  const signupButton = document.getElementById('display-signup');

  signupButton
    .addEventListener('click', displaySignup);
};

const displayHomepage = user => {
  const welcome = document.createElement('div');
  welcome.innerHTML = `
    <h1>Welcome ${user.name}!</h1>
    <button id="logout">Log out</button>
  `;

  root.appendChild(welcome);

  const deleteCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload();
  };

  const logoutButton = document.getElementById('logout');
  logoutButton
    .addEventListener('click', () => {
      deleteCookie('session');
    });
};

fetch('/api/v1/auth/verify', {
  credentials: 'include'
})
  .then(res => res.json())
  .then(user => {
    if(user._id){
      window.location.href = './home.html';
    } else {
      displayLogin();
    }
  });

