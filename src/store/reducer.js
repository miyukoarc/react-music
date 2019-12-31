const count = 1000;
const captcha = {
    count: 10,
    hasPost: false,
    timer: null
};

const reducer = ((state=captcha, action) => {
    switch(action.type){
        case 'countOn':

            return {count:10,hasPost:true};

        case 'onCounting':
            console.log(state)
            // return {count:state.count-1,hasPost:true};
            return Object.assign({},state,{
                count:state.count-1,
                hasPost:true
            })
            //两种形式均可

        case 'asyncCounting':
            console.log(state)
            return Object.assign({},state,{
                
                hasPost:true,
                timer: state.timer=setInterval(()=>{
                    state.count-=1;
                    console.log(state)
                    if(state.count===0){
                        clearInterval(state.timer)
                    }
                },1000)

            })
        case 'countOff':
            console.log(state)
            
            return {count:state.count=10,hasPost:state.hasPost=false}
        default:
            return state;
    }
})

export default reducer
