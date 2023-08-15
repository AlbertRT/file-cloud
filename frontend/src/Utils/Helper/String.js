export const formatStr = (str) => {
    let strSplit = str.split("");

    if (strSplit.length < 22) {
        return str
    }
    const truncatedString = strSplit.slice(0, 22).join('');
    return truncatedString + '...';
}

export const toUpperCase = (str) => {
    // const arr = str.split("")

    // for(let i = 0; i < arr.length; i++) {
    //     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    // }

    const res = str.charAt(0).toUpperCase() + str.slice(1)
    return res;
}