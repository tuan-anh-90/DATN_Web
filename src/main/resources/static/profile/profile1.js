// Hàm để lấy thông tin người dùng từ API và hiển thị trên trang web
function fetchAndDisplayUserInfo() {
  fetch("/api/users/current-user") // Đổi đường dẫn API tương ứng với endpoint của bạn
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Hiển thị thông tin người dùng
      document.getElementById("name").innerText = data.name;
      document.getElementById("maNV").innerText = data.maNV;
      document.getElementById("email").innerText = data.email;
      document.getElementById("chucVu").innerText = data.chucVu;
      document.getElementById("loaiTaiKhoan").innerText = data.role;

      // Thêm các dòng tương ứng với các trường thông tin khác
    })
    .catch((error) => {
      console.error("Error fetching user information:", error);
      alert("Error fetching user information");
    });
}

// Gọi hàm để lấy và hiển thị thông tin người dùng khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayUserInfo();
});
