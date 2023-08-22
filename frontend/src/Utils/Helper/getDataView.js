const getDataView = () => {
    const view = localStorage.getItem('view')

    if (!view) {
        return localStorage.setItem('view', 'default')
    }

    return view
}

export default getDataView