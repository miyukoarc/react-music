import * as React from "react";
import {Icon, InputItem, NavBar} from "antd-mobile";
import {createForm} from "rc-form";


class phoneCaptcha extends React.Component{

    checkCaptcha (){
        console.log(1)
    }
    render (){
        const { getFieldProps } = this.props.form;
        return (

            <div className={'min-height-100vh bg-white'}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color={'#000'} />}
                    onLeftClick={() => console.log('back')}
                    leftContent={<span className={'font-size-14'} style={{color:'#000'}}>验证码</span>}
                />

                <InputItem
                    {...getFieldProps('digit')}
                    type="digit"
                    placeholder=""
                    maxLength={4}
                    onChange={this.checkCaptcha()}
                ><span className={'font-size-14'}>&nbsp;</span></InputItem>
            </div>
        )
    }
}


const renderPhoneCapycha  = createForm()(phoneCaptcha)

export default renderPhoneCapycha