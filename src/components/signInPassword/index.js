import React from "react";
import {Icon, InputItem, List, NavBar, Toast} from "antd-mobile";
import {Button} from "antd";
import request from '../../api'
import {connect} from "react-redux";

class SignByPsw extends React.Component {
    constructor(props){
        super(props)
        this.state={
            value: '',
            phone: '',
            password: ''
        }
        this.getList = this.getList.bind(this)
    }

    // componentDidMount(){
        // console.log(1)
        // console.log(cookies.get())
        // console.log(this.props.history.location.state.phone)
    // }

    onChange = (value) => {
        this.setState({
            password: value,
            phone: this.props.history.location.state.phone.replace(/\s+/g,"")

        },()=>{
            // console.log(this.state)
        });
    }


    handleApply (){
        // console.log(this.state)
        request.get(`/login/cellphone?phone=${this.state.phone}&password=${this.state.password}`)
            .then(res=>{
                console.log(res)

                this.props.login()
                this.props.storeUser(res.profile)
                this.loadingToast()

            })
            .catch(err=>{
                alert(err)
            })

    }

    loadingToast (){
        Toast.loading('loading...',1,()=>{
            this.props.history.push('/home')
        })
    }

    getList (){
        request.get('/login/status')
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                alert(err)
            })
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
                    onLeftClick={() => this.props.history.go(-1)}
                    leftContent={<span className={'font-size-14'} style={{color:'#000'}}>手机登录</span>}
                />
                <form>
                    <List>
                        <InputItem
                            {...getFieldProps}
                            type="password"
                            placeholder="请输入密码"
                            extra={fgPsw}
                            onChange={this.onChange}
                            style={{fontSize:'12px'}}
                        />
                        <div className={'px-5 mx-5 mt-5'}>
                            <Button block shape={'round'}  onClick={this.handleApply.bind(this)}>登录</Button>
                            {/*<button onClick={this.getList}>验证</button>*/}
                        </div>
                    </List>
                </form>



            </div>
        )
    }
}

function mapStateToProps (state){
    return {
        userInfo: state.userInfo,
        loginState: state.loginState
    }

}

const mapDispatchToProps = (dispatch)=>{
    return {
        login:()=>dispatch({type:'signIn'}),
        storeUser: (info)=> dispatch({type:'saveUserInfo',info:info}),
        unlogin: ()=>dispatch({type:'logOut'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignByPsw)
