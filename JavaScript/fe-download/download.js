
function downloadByALink(href, name) {
    const aEl = document.createElement('a');
    aEl.style.display = 'none';
    aEl.download = name;
    aEl.href = href;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
}

function downloadByIFrame(src) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = src;
    document.body.appendChild(iframe);
}

function getImgDataUrl(img) {
    const { width, height } = img;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const mime = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();

    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(img, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image', mime);
    
    return dataUrl;
}

