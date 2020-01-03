// const count = 1000;


import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
import {persistCombineReducers} from 'redux-persist'


const _state = {
    count: 10,
    hasPost: false,
    timer: null,
    userInfo: null,
    loginState: false
};

const reducer = ((state=_state, action) => {
    switch(action.type){
        case 'countOn':

            return {count:10,hasPost:true};

        case 'onCounting':
            // return {count:state.count-1,hasPost:true};
            return Object.assign({},state,{
                count:state.count-1,
                hasPost:true
            })
            //两种形式均可

        case 'asyncCounting':
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

            return {count:state.count=10,hasPost:state.hasPost=false}


            //
        case 'signIn':
            return Object.assign({},state,{
                ...state,
                loginState: true
            })
        case 'saveUserInfo':
            // console.log(action.info);
            return Object.assign({},state,{
                ...state,
                userInfo: action.info
            })

        case 'logOut':
            return Object.assign({},state,{
                ...state,
                userInfo: null,
                loginState: true
            })
        default:
            return state;
    }
})

export default reducer
