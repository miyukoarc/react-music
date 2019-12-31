import React from "react";
import {Icon, InputItem, List, NavBar} from "antd-mobile";
import {Button} from "antd";

class SignByPsw extends React.Component {
    constructor(props){
        super(props)
        this.state={
            value: ''
        }
    }

    componentDidMount(){
        console.log(1)
        console.log(this.props.location.phone)
    }


    render (){
        const {...getFieldProps} = this.props.form
        const fgPsw = (
            <a href="" className={'font-size-12'}>忘记密码?</a>
        );
        return (
            <div className={'min-height-100vh bg-white'}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color={'#000'} />}
                    onLeftClick={() => console.log('back')}
                    leftContent={<span className={'font-size-14'} style={{color:'#000'}}>手机登录</span>}
                />
                <form>
                    <List>
                        <InputItem
                            {...getFieldProps}
                            type="password"
                            placeholder="请输入密码"
                            extra={fgPsw}
                            style={{fontSize:'12px'}}
                        />
                        <div className={'px-5 mx-5 mt-5'}>
                            <Button block shape={'round'} disabled={this.props.hasPost} onClick={this.handleApply}>登录</Button>
                        </div>
                    </List>
                </form>



            </div>
        )
    }
}

export default SignByPsw