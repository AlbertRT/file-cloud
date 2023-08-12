const formatStr = (str) => {
    let strSplit = str.split("");
    
    if (strSplit.length < 22) {
        return str
    }
    const truncatedString = strSplit.slice(0, 22).join('');
    return truncatedString + '...';
} 
export default formatStr