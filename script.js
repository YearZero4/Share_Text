
document.getElementById('btn').addEventListener('click', (event) => {
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
  document.getElementById('link').innerHTML = `<a href="${downloadLink.replace('.org/', '.org/dl/')}">LINK GENERADO</a>`;
 } else {
  console.error("Error al subir el archivo:", data);
 }
 })
.catch((error) => {
 console.error("Error en la solicitud:", error);
});
});
