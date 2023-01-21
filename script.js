const urlField = document.querySelector(".field input"),
    previewArea = document.querySelector(".preview-area"),
    imgTag = previewArea.querySelector(".thumbnail"),
    hiddenInput = document.querySelector(".hidden-input");

urlField.oninput = () => {
    let imgUrl = urlField.value;
    previewArea.classList.add("active");

    //  checking url type 
    // desktop url
    if (imgUrl.indexOf("https://www.youtube.com/watch?v=") != -1) {
        let vidId = imgUrl.split('v=')[1].substring(0, 11);
        let ytImgUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
        imgTag.src = ytImgUrl;
        console.log(downloadImage(imgTag.src));
    }
    // mobile url
    else if (imgUrl.indexOf("https://youtu.be/") != -1) {
        let vidId = imgUrl.split('be/')[1].substring(0, 11);
        let ytImgUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
        imgTag.src = ytImgUrl;
        console.log(downloadImage(imgTag.src));
    }
    // iframe url
    else if (imgUrl.indexOf("https://www.youtube.com/embed/") != -1) {
        let vidId = imgUrl.split('embed/')[1].substring(0, 11);
        let ytImgUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
        imgTag.src = ytImgUrl;
        console.log(downloadImage(imgTag.src));
    }
    else if (imgUrl.match(/\.(jpe?g|png|gif|bmp|webp)$/i)) {
        imgTag.src = imgUrl;
    }
    // short url
    else if (imgUrl.indexOf("https://www.youtube.com/shorts/") != -1) {
        alert('Shorts thumbnail not available');
    }
    else {
        alert('Please check video url');
        imgTag.src = "";
        previewArea.classList.remove("active");
    }
    // display image
    hiddenInput.value = imgTag.src; 
}

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)
  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'youtube-thumbnail'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}