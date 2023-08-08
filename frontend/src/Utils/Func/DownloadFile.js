const downloadFile = async (record) => {
    const url = `http://localhost:5050/download/file/${record.key}`;
    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1];

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;

    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
};

export default downloadFile;