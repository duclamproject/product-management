// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
// End Button Status
// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    // PATH tới keyword.value
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//End Form Search

// Paginations
const buttonPagination = document.querySelectorAll("[button-pagination]");
if ((buttonPagination.length = !0)) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  });
}
// End Paginations

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name=checkall]");
  const inputsID = checkboxMulti.querySelectorAll("input[name=id]");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked == true) {
      inputsID.forEach((id) => {
        id.checked = true;
      });
    } else {
      inputsID.forEach((id) => {
        id.checked = false;
      });
    }
  });
  inputsID.forEach((input) => {
    input.addEventListener("click", () => {
      const countInputsChecked = checkboxMulti.querySelectorAll(
        "input[name=id]:checked"
      ).length;
      const countInputAll =
        checkboxMulti.querySelectorAll("input[name=id]").length;
      if (countInputAll == countInputsChecked) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const formType = e.target.elements.type.value;
    if (formType == "delete-all") {
      const isConfirm = confirm(
        "Bạn có muốn xóa tất cả bản ghi đã chọn không?"
      );
      if (!isConfirm) {
        return;
      }
    }

    const idsChecked = document.querySelectorAll("input[name=id]:checked");
    const inputIds = document.querySelector("input[name=ids]");
    if (idsChecked.length > 0) {
      const ids = [];
      console.log(formType);

      idsChecked.forEach((item) => {
        const id = item.value;
        if (formType == "change-position") {
          const position = item
            .closest("tr")
            .querySelector("input[name=position]").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(", ");
    } else {
      inputIds.value = "";
    }
    formChangeMulti.submit();
  });
}
// End Checkbox Multi

// Show Alert
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = document.querySelector("[close-alert]");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// Upload Preview
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End Upload Preview
// Clear Image Preview
const clearImagePreview = document.querySelector("[clear-image-preview]");
if (clearImagePreview) {
  clearImagePreview.addEventListener("click", () => {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    if (uploadImagePreview.getAttribute("src") == "") {
      alert("Không thể thực hiện chức năng này do chưa có ảnh được chọn!");
    } else {
      uploadImageInput.value = "";
      uploadImagePreview.setAttribute("src", "");
    }
  });
}
// End Clear Image Preview

// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  const sortSelect = document.querySelector("[sort-select]");
  sortSelect.addEventListener("change", (e) => {
    const url = new URL(window.location.href);
    // console.log(sortSelect.value);
    const [sortKey, sortValue] = sortSelect.value.split("-");
    // console.log(sortKey);
    // console.log(sortValue);
    if (sortKey && sortValue) {
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
    } else {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
    }
    window.location.href = url.href;
  });
  const sortClear = document.querySelector("[sort-clear]");
  if (sortClear) {
    sortClear.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      window.location.href = url.href;
    });
  }
}
// Thêm selected cho option
const url = new URL(window.location.href);
const sortKey = url.searchParams.get("sortKey");
const sortValue = url.searchParams.get("sortValue");
const compareValue = `${sortKey}-${sortValue}`;
console.log(compareValue);
const options = document.querySelectorAll("[sort-select] option");
if (options) {
  options.forEach((option) => {
    if (compareValue == option.value) {
      option.setAttribute("selected", "true");
    }
  });
}
// End Sort
