import * as React from "react";
import {Icon, InputItem, NavBar} from "antd-mobile";
import { createForm } from 'rc-form';
import {Button} from "antd";


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


window.addEventListener = function(type, listener) {
}

class SignIn extends React.Component{
    constructor(props){
        super(props)
        // this.onKeyup = this.onKeyup.bind(this)
    }
    state = {
        type: 'money',
        isPhone: true
    }

    componentDidMount() {
        window.addEventListener('mousemove',()=>{
            console.log(1)
        })
    }

    // onKeyup(){
    //     console.log(1)
    // }



    render (){
        const { getFieldProps } = this.props.form;
        let { type, isPhone } = this.state;
        return(
            <div className={'min-height-100vh bg-white'}  >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color={'#000'} />}
                    onLeftClick={() => console.log('back')}
                    leftContent={<span className={'font-size-14'} style={{color:'#000'}}>手机号登录</span>}
                />

                <div className={'px-2'}>
                    <span className={'font-size-12'}>未注册手机号登录后将自动创建账号</span>
                </div>

                <InputItem
                    {...getFieldProps('phone')}
                    type="phone"
                    placeholder=""
                ><span className={'font-size-14'}>+86</span></InputItem>

                <div className={'px-5 mx-5 mt-5'}>
                    <Button onClick={()=>{isPhone=!isPhone;console.log(isPhone)}}>change{isPhone}</Button>
                    <Button block shape={'round'} disabled={isPhone}>下一步</Button>
                </div>
            </div>
        )
    }
}

const renderSignIn =  createForm()(SignIn)

export default renderSignIn