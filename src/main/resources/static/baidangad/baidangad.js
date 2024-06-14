function formatDateTime(dateTime) {
  try {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("vi-VN", options).format(
      new Date(dateTime)
    );

    if (formattedDate !== "Invalid Date") {
      return formattedDate;
    } else {
      throw new Error("Invalid date value");
    }
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid Date";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Thực hiện yêu cầu GET đến API
  fetch("/api/homes/")
    .then((response) => response.json())
    .then((data) => displayPosts(data))
    .catch((error) => console.error("Error:", error));
});

function displayPosts(posts) {
  var postsContainer = document.getElementById("postsContainer");

  posts.forEach((post) => {
    var postContainer = document.createElement("div");
    postContainer.classList.add("container");

    // Thêm class "con-container" cho phần tử cha của mỗi bài đăng
    var conContainerDiv = document.createElement("div");
    conContainerDiv.classList.add("con-container");

    var bentraiDiv = document.createElement("div");
    bentraiDiv.classList.add("bentrai");

    const postImage = document.createElement("img");
    postImage.classList.add("post-image");
    postImage.src = post.anh;
    postImage.alt = "Hình ảnh mô tả";

    bentraiDiv.appendChild(postImage);
    conContainerDiv.appendChild(bentraiDiv);

    var ngaydangP = document.createElement("p");
    ngaydangP.classList.add("ngaydang");
    ngaydangP.textContent = "Ngày đăng: " + formatDateTime(post.tgbd);

    bentraiDiv.appendChild(ngaydangP);

    postContainer.appendChild(conContainerDiv);

    postsContainer.appendChild(postContainer);

    postImage.addEventListener("click", function () {
      showPopup(post);
    });
  });
}

function showPopup(post) {
  var popup = document.getElementById("popup");
  document.getElementById("popupTitle").textContent = post.tieuDe;
  document.getElementById("popupContent").textContent = post.noiDung;
  document.getElementById("popupDate").textContent =
    "Ngày đăng: " + formatDateTime(post.tgbd);

  popup.style.display = "block";
}

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
});

window.addEventListener("click", function (event) {
  var popup = document.getElementById("popup");
  if (event.target == popup) {
    popup.style.display = "none";
  }
});
