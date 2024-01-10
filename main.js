const inputFile = document.querySelector("#inputFile");
const originalPreviewContainer = document.querySelector(
  ".original-preview-container"
);
const compressedPreviewContainer = document.querySelector(
  ".compressed-preview-container"
);
const compressBtn = document.querySelector("#compressBtn");

function compressFile() {
  const originalImage = document.querySelector(".originalImage");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = originalImage.naturalHeight;
  canvas.width = originalImage.naturalWidth;
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

  const compressedDataURL = canvas.toDataURL("image/jpeg", 0.5);
  compressedPreviewContainer.innerHTML = "";
  const compressedImage = document.createElement("img");
  compressedImage.src = compressedDataURL;
  compressedImage.alt = "Compressed " + originalImage.alt;
  compressedImage.setAttribute("width", "300px");
  compressedPreviewContainer.appendChild(compressedImage);

  canvas.toBlob(
    function (blob) {
      const compressedDataURL = URL.createObjectURL(blob);
      compressedPreviewContainer.innerHTML = "";
      const compressedImage = document.createElement("img");
      compressedImage.src = compressedDataURL;
      compressedImage.alt = "Compressed " + originalImage.alt;
      compressedImage.setAttribute("width", "300px");
      compressedPreviewContainer.appendChild(compressedImage);

      const compressedFile = new File(
        [blob],
        "compressed_" + originalImage.alt,
        { type: "image/jpeg", lastModified: Date.now() }
      );
      console.log(compressedFile.size / 1024);
    },
    "image/jpeg",
    0.5
  );
}

inputFile.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    console.log(file);
    originalPreviewContainer.innerHTML = "";
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.onload = function () {
      this.setAttribute("height", "auto");
      this.setAttribute("width", "300px");
    };
    image.classList.add("originalImage");
    image.alt = file.name;
    originalPreviewContainer.appendChild(image);
    console.log(file.size / 1024);
  }
});

compressBtn.addEventListener("click", compressFile);
