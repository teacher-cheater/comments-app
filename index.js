"use strict";

let allCommentsHtml = [
  {
    username: "Глеб Фокин",
    date: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    likes: 75,
    isLiked: false,
  },
  {
    username: "Варвара Н.",
    date: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    likes: 3,
    isLiked: false,
  },
];

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");
const commentsList = document.querySelector(".comments");

const formatDate = () => {
  const d = new Date();
  const p = n => (n + "").padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d
    .getFullYear()
    .toString()
    .slice(-2)} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

const renderComments = () => {
  commentsList.innerHTML = "";
  allCommentsHtml.forEach(data => {
    let commentItem = document.createElement("li");
    commentItem.classList.add("comment");

    console.log("data", data);
    commentItem.innerHTML = `
        <div class="comment-header">
          <div>${data.username}</div>
          <div>${data.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${data.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${data.likes}</span>
            <button class="like-button
              ${data.isLiked ? "-active-like" : ""}">
              </button>
          </div>
        </div>
    `;
    const likeButton = commentItem.querySelector(".like-button");
    likeButton.addEventListener("click", () => {
      console.log(2, data);
      data.isLiked = !data.isLiked;
      data.likes += data.isLiked ? 1 : -1;
      renderComments();
    });
    commentsList.append(commentItem);
  });
};

renderComments();

const addComment = () => {
  const username = nameInput.value.trim();
  const commentText = commentInput.value.trim();

  if (!username || !commentText) {
    alert("Заполните все поля");
    return;
  }

  const newComment = {
    username: username,
    date: formatDate(),
    comment: commentText,
    likes: 0,
    isLiked: false,
  };

  allCommentsHtml.push(newComment);
  renderComments();
  nameInput.value = "";
  commentInput.value = "";
};

addButton.addEventListener("click", addComment);