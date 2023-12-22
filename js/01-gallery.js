import { galleryItems } from "./gallery-items.js";
// Change code below this line
const container = document.querySelector(".gallery");
////rendering
function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
    )
    .join("");
}

container.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));
container.addEventListener("click", handlerImgClick);
function handlerImgClick(event) {
  event.preventDefault();

  if (event.currentTarget === event.target) {
    return;
  }
  const { source, alt: description } = event.target.dataset;
  showImgModal({ original: source, preview: source, description });
}
//modal
function showImgModal({ preview, original, description }) {
  const instance = basicLightbox.create(
    `
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
       
      />`,
    //Escape keydown
    {
      handler: null,
      onShow(instance) {
        this.handler = onEscape.bind(instance);
        document.addEventListener("keydown", this.handler);
      },
      onClose() {
        document.removeEventListener("keydown", this.handler);
      },
    }
  );

  instance.show();
}

function onEscape({ code }) {
  if (code === "Escape") {
    this.close();
  }
}

console.log(galleryItems);
