const count = 1000

const reducer = ((state=count, action) => {
    switch(action.type){
        case 'plus':
            return state += 100;
        case 'minus':
            return state -= 100;
        case 'any':
            console.log(action);
            return state += parseInt(action.num);
        default:
            return state;
    }
})

export default reducer
