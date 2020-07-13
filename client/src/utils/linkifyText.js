import linkifyIt from 'linkify-it'
// import tlds from 'tlds'

const linkify = linkifyIt()
// linkify.tlds(tlds)

const testImage = (url, timeoutT) => {
  return new Promise(function(resolve, reject) {
    let timeout = timeoutT || 1000;
    let timer, img = new Image();
    img.onerror = img.onabort = function() {
      clearTimeout(timer);
  	  reject("error");
    };
    img.onload = function() {
      clearTimeout(timer)
      resolve("success")
    }
    timer = setTimeout(function() {
      // reset .src to invalid URL so it stops previous
      // loading, but doens't trigger new load
      img.src = "//!!!!/noexist.jpg";
      reject("timeout")
    }, timeout);
    img.src = url
  })
}

function checkImageURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/) != null);
}

const linkifyText = (text) => {
  let result = text
  const links = linkify.match(text)
  if (links) {
    links.map(href => {
      const isImage = checkImageURL(href.url)// testImage(href.url)
      if (isImage) {
        result = result.replace(href.url, `<div class='img-wrapper' style='background-image: url(${href.url});'></div>`)
      } else {
        result = result.replace(href.url, `<a href='${href.url}' class='away-link' rel='nofollow noopener ugc' target='_blank'>${href.url}</a>`)
      }
    })
  }
  return result
}

export default linkifyText
