// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBNyXR1jlTdSIHvqdeAjbll-0Ptie_PXFM',
  authDomain: 'picadu-59e9f.firebaseapp.com',
  databaseURL: 'https://picadu-59e9f.firebaseio.com',
  projectId: 'picadu-59e9f',
  storageBucket: 'picadu-59e9f.appspot.com',
  messagingSenderId: '989629846678',
  appId: '1:989629846678:web:4419ac71e42ac132ee5eb7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

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

const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

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
    photo:
      'https://avatars.mds.yandex.net/get-zen_doc/28532/pub_5d1eb72a8e297300ad9a2fce_5d1ebcf1af329300adf417c6/scale_2400',
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
      /*       console.log('valid'); */
    } else {
      alert('email  не валидный, попробуйте ввести заново');
      return;
    }

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
      title: 'Заголовок поста',
      text:
        'Далеко-далеко за, словесными горами в стране гласных и согласных живут рыбные тексты. Ты единственное его раз великий ему! Однажды семантика то',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайное'],
      author: {
        displayName: 'maks',
        photo:
          'https://avatars.mds.yandex.net/get-zen_doc/28532/pub_5d1eb72a8e297300ad9a2fce_5d1ebcf1af329300adf417c6/scale_2400',
      },
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголоыок поста 2',
      text:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus at doloribus eos, blanditiis eligendi voluptas! Aspernatur atque numquam quos, animi dolor obcaecati saepe placeat commodi dicta quibusdam soluta voluptatum blanditiis.',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайное'],
      author: {
        displayName: 'kate',
        photo:
          'https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg',
      },
      date: '10.10.2020, 20:54:00',
      like: 5,
      comments: 30,
    },
  ],
  addPost(title, text, tags, handler) {
    this.allPost.unshift({
      title,
      text,
      tags: tags.split(',').map((item) => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    });

    if (handler) {
      handler();
    }
  },
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postWraper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postWraper.classList.remove('visible');
};

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

const showAllPosts = () => {
  addPostElem.classList.remove('visible');
  postWraper.classList.add('visible');

  let postsHTML = '';
  setPost.allPost.forEach((post) => {
    const { title, text, date, like, comments, tags, author } = post;

    postsHTML += `
          <section class="post">
            <div class="post-body">
              <h2 class="post-title">${title}</h2>
              <p class="post-text">${text}</p>
              </p>
              <div class="tags">
              ${tags.map((item) => {
                return ` <a href="#" class="tag">#${item}</a>`;
              })}
                
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
                  <a href="" class="author-username">${author.displayName}</a>
                  <span class="post-time"> ${date}</span>
                </div>
                <a href="#" class="author-link"
                  ><img src="${
                    author.photo || 'img/avatar.jpg'
                  }" alt="avatar" class="author-avatar"
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

  buttonNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', (event) => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;

    if (title.value.length < 6) {
      alert('короткий заголовок');
      return;
    }

    if (text.value.length < 50) {
      alert('короткий текст');
      return;
    }

    setPost.addPost(title.value, text.value, tags.value, showAllPosts);

    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
