const information = document.getElementById('info')
const imageTag = document.getElementById("imageTag");

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

window.electronAPI.getImage((event, data) => {
    console.log("image-gets", data)
    imageTag.src = data;
    window.electronAPI.closeWindow2();
});

