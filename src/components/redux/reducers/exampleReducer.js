const initState2 = {
    aa : 'AAAA',
    bb : 'BBBB'
}
const exmp = (state = initState2 , action) => {
    console.log(action);
    return state;
}
export default exmp;