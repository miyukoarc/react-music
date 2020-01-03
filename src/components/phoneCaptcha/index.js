import * as React from "react";
import {Icon, InputItem, List, NavBar, Toast} from "antd-mobile";
import {createForm} from "rc-form";
import {Button} from "antd";
import {withRouter} from "react-router";

class phoneCaptcha extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            hasError:false
        }
    }

    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入正确的验证码');
        }
    }
    onChange = (value) => {
        console.log(value)
        if (value.replace(/\s/g, '').length != 4) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
            phone:value,
        },()=>{
            console.log(this.state)

        });

    }

    componentWillMount() {
        console.log(this.props)
    }

    componentDidMount() {
        console.log(this.props)
    }

    handleApply (){

    }
    render (){
        const { getFieldProps } = this.props.form;
        return (

            <div className={'min-height-100vh bg-white'}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color={'#000'} />}
                    onLeftClick={() => console.log(this.props)}
                    leftContent={<span className={'font-size-14'} style={{color:'#000'}}>验证码</span>}
                />
                <List>
                    <InputItem
                        type="digit"
                        placeholder=""
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}

                    ><span className={'font-size-14'}>+86{this.props.location.state.phone.replace(/\s+/g,"")}</span></InputItem>
                    <div className={'px-5 mx-5 mt-5'}>
                        <Button block shape={'round'} disabled={this.props.hasPost} onClick={this.handleApply}>登录</Button>
                    </div>
                </List>


            </div>
        )
    }
}


const renderPhoneCapycha  = createForm()(phoneCaptcha)

export default withRouter(renderPhoneCapycha)
