const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
const dataPath = formChangeStatus.getAttribute("data-path");
if (buttonsChangeStatus) {
  buttonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      const statusChange = statusCurrent == "active" ? "inactive" : "active";
      const action = dataPath + `${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]");
const formDeleteItem = document.querySelector("#form-delete-item");
const dataPathDel = formDeleteItem.getAttribute("data-path");
if (buttonsDelete) {
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const conFirm = confirm("Bạn có muỗn xóa sản phẩm này không?");
      if (conFirm == true) {
        const idDel = button.getAttribute("data-id");
        const action = dataPathDel + `${idDel}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
// End Delete Item
