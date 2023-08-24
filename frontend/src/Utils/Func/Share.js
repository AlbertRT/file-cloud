const share = (id, type) => {
    type !== 'folder' ? type = 'file' : type = 'folder'

    let url = `http://localhost:5173/share/${type}/${id}`
    navigator.clipboard.writeText(url)

    return 'URL copied'
}

export default share