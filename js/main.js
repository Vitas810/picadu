let menuTogle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotourl = document.querySelector('.edit-photo');

const userAvatarElem = document.querySelector('.user-avatar');

const postWraper = document.querySelector('.posts');

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
  logOut(handler) {
    this.user = null;
    handler();
  },
  sigUp(email, password, handler) {
    let resValue = checkEmail();

    if (resValue) {
      console.log('val');
    } else {
      alert('email  не валидный, попробуйте ввести заново');
      return;
    }

    /*  if (!email.trim() || !password.trim()) {
      alert('введите данные');
      return;
    } */
    to = email.indexOf('@');

    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.substring(0, to) };

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
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    handler();
  },
};

const setPost = {
  allPost: [
    {
      title: 'Заголоыок поста',
      text:
        'Далеко-далеко за, словесными горами в стране гласных и согласных живут рыбные тексты. Ты единственное его раз великий ему! Однажды семантика то',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайное'],
      author: 'maks@mail.com',
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголоыок поста 2',
      text:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus at doloribus eos, blanditiis eligendi voluptas! Aspernatur atque numquam quos, animi dolor obcaecati saepe placeat commodi dicta quibusdam soluta voluptatum blanditiis.',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайное'],
      author: 'test@mail.com',
      date: '10.10.2020, 20:54:00',
      like: 5,
      comments: 30,
    },
  ],
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

const showAllPosts = () => {
  let postsHTML = '';
  setPost.allPost.forEach((post) => {
    const { title, text, date, like, comments, tags } = post;

    postsHTML += `
          <section class="post">
            <div class="post-body">
              <h2 class="post-title">${title}</h2>
              <p class="post-text">${text}</p>
              </p>
              <div class="tags">
              ${tags
                .map((item) => {
                  return ` <a href="#" class="tag">#${item}</a>`;
                })
                .join('')}
                
              </div>
              <!-- /.tags -->
            </div>
            <!-- /.post-body -->
            <div class="post-footer">
              <div class="post-buttons">
                <button class="post-button likes">
                  <svg width="20" height="20" class="icon icon-like">
                    <use xlink:href="img/icons.svg#like"></use>
                  </svg>
                  <span class="likes-counter">${like}</span>
                </button>
                <button class="post-button comments">
                  <svg width="20" height="20" class="icon icon-comment">
                    <use xlink:href="img/icons.svg#comment"></use>
                  </svg>
                  <span class="comments-counter">${comments}</span>
                </button>
                <button class="post-button save">
                  <svg width="20" height="20" class="icon icon-save">
                    <use xlink:href="img/icons.svg#save"></use>
                  </svg>
                </button>
                <button class="post-button share">
                  <svg width="18" height="20" class="icon icon-share">
                    <use xlink:href="img/icons.svg#share"></use>
                  </svg>
                </button>
              </div>
              <!-- /.post-buttons -->
              <div class="post-author">
                <div class="author-about">
                  <a href="" class="author-username">artem</a>
                  <span class="post-time"> ${date}</span>
                </div>
                <a href="#" class="author-link"
                  ><img src="img/avatar.jpg" alt="avatar" class="author-avatar"
                /></a>
              </div>
              <!-- /.post-author -->
            </div>
          <!-- /.post-footer -->
        </section>
    
    `;
  });
  postWraper.innerHTML = postsHTML;
};

const init = () => {
  loginSignup.addEventListener('click', (event) => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.sigUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener('click', (event) => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotourl.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  menuTogle.addEventListener('click', (el) => {
    el.preventDefault();
    menu.classList.toggle('visible');
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
