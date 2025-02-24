document.getElementById('btn').addEventListener('click', (event) => {
async function acortarUrl(link) {
    const response = await fetch('https://acut0x.onrender.com/', {
        method: 'POST',
        body: new URLSearchParams({ url: link }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const html = await response.text();
    return new DOMParser().parseFromString(html, 'text/html').querySelector('a.acortada').href;
}


const text = document.getElementById('text').value;
const name = document.getElementById('filename').value;
const blob = new Blob([text], { type: "text/plain" });
const formData = new FormData();
formData.append("file", blob, `${name}.txt`);
fetch("https://tmpfiles.org/api/v1/upload", {
 method: "POST",
 body: formData,
})
.then((response) => response.json())
.then((data) => {
 if (data.status === "success") {
  const downloadLink = data.data.url;
  const urlTMP=`${downloadLink.replace('.org/', '.org/dl/')}`;
  (async () => {
    try {
        const shortUrl = await acortarUrl(urlTMP);
        document.getElementById('link').innerHTML = `<a href="${shortUrl}">LINK GENERADO</a>`;
    } catch (error) {
        console.error('Error al acortar la URL:', error.message);
    }
})();



 } else {
  console.error("Error al subir el archivo:", data);
 }
 })
.catch((error) => {
 console.error("Error en la solicitud:", error);
});
});
