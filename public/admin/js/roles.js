// Permisssion
const tablePermission = document.querySelector("[table-permission]");
if (tablePermission) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permission = [];
    const rows = tablePermission.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      //   Phân chia xem quản lý gì sau đó ở else sẽ thêm quyền vào mảng permission trong permission
      if (name == "id") {
        inputs.forEach((item) => {
          const id = item.value;
          if (id) {
            permission.push({
              id: id,
              permission: [],
            });
          }
        });
      } else {
        inputs.forEach((item, index) => {
          const checked = item.checked;
          if (checked) {
            permission[index].permission.push(name);
          }
        });
      }
    });
    // console.log(permission);
    if (permission.length > 0) {
      const formChangePermission = document.querySelector(
        "#form-change-permission"
      );
      const inputPermission = formChangePermission.querySelector(
        "input[name='permission']"
      );

      inputPermission.value = JSON.stringify(permission);
      formChangePermission.submit();
    }
  });
}
// End Permisssion

// Permission Default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermission = document.querySelector("[table-permission]");

  records.forEach((record, index) => {
    const permissions = record.permissions;
    permissions.forEach((permission) => {
      const row = tablePermission.querySelector(`[data-name= "${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
// End Permission Default
