tinymce.init({
  selector: "textarea.textarea-mce",
  plugins: "advlist link image lists code",
  toolbar: "undo redo | link image | code",
  image_title: true,
  automatic_uploads: true,
  file_picker_types: "image",
  file_picker_callback: (cb, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const id = "blobid" + new Date().getTime();
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(",")[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);
        cb(blobInfo.blobUri(), { title: file.name });
      });
      reader.readAsDataURL(file);
    });

    input.click();
  },
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
});
