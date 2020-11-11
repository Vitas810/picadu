let menuTogle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuTogle.addEventListener('click', (el) => {
  el.preventDefault();
  menu.classList.toggle('visible');
});
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const checkEmail = () => {
  const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  const emailValue = emailInput.value;
  let validEmail = re.test(emailValue);
  return validEmail;
};

const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'maxJS',
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '1234',
    displayName: 'kateJS',
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('пользователь не найден');
    }
  },
  logOut() {
    console.log('out');
  },
  sigUp(email, password, handler) {
    const to = email.search('@');
    emailName = email.substring(0, to);

    let resValue = checkEmail();

    if (resValue) {
      console.log('val');
    } else {
      alert('email  не валидный, попробуйте ввести заново');
      return;
    }

    if (!this.getUser(email)) {
      const user = { email, password, displayName: emailName };

      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь уже зарегистрирован');
    }
  },

  getUser(email) {
    return listUsers.find((item) => item.email === email);
  },

  authorizedUser(user) {
    this.user = user;
  },
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
});

loginSignup.addEventListener('click', (event) => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  setUsers.sigUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();
