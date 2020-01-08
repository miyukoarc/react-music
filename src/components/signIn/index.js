import * as React from "react";
import {Icon, InputItem, NavBar,List,Toast } from "antd-mobile";
import { createForm } from 'rc-form';
import {Button} from "antd";
import request from "../../api"
import { connect } from 'react-redux'
import {withRouter} from "react-router";


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
        this.state={
            hasError: false,
            routeKey: ''
        }
    }
    state = {
        type: 'money',
        isPhone: true
    }


    static getDerivedStateFromProps (nextProps,prevState){
        if(nextProps){
            console.log(nextProps, prevState)
            return { routeKey: prevState.routeKey}
        }
        return null;
    }


    onErrorClick = () => {
        if (this.state.hasError) {
          Toast.info('Please enter 11 digits');
        }
      }
      onChange = (value) => {
          console.log(value)
        if (value.replace(/\s/g, '').length !== 11) {
          this.setState({
            hasError: true,
          });
        } else {
          this.setState({
            hasError: false,
          });
        }
        this.setState({
          value
        });
      }

      handleApply = ()=>{
        this.checkHasSignUp()
      }

    showToast(){
        Toast.info('发送成功',2,()=>{
            this.props.history.push({pathname:'/phoneCaptcha',state:{phone:this.state.value}})
        })
    }

    checkHasSignUp (){
        request.get('/cellphone/existence/check?phone='+this.state.value.replace(/\s+/g,""))
            .then(res=>{
                this.handleRouter(res)
            })
            .catch(err=>{
                alert(err)
            })
    }

    handleRouter (obj){
        if(obj instanceof Object){
            if(obj.hasPassword){
                this.props.history.push({pathname:'/signInPsw',state:{phone:this.state.value}})
            }else{
                this.props.history.push({pathname:'/phoneCaptcha',state:{phone:this.state.value}})
            }

        }else{
            alert('参数错误')
        }
    }




    render (){
        const { match, location, history } = this.props
        const { getFieldProps } = this.props.form;
        const { postCaptcha } = this.props;
        let { type, isPhone } = this.state;
        return(
            <div className={'min-height-100vh bg-white'}  >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color={'#000'} />}
                    onLeftClick={() => this.props.history.go(-1)}
                    leftContent={<span className={'font-size-14'} style={{color:'#000'}}>手机号登录</span>}
                />

                <div className={'px-2'}>
                    <span className={'font-size-12'}>未注册手机号登录后将自动创建账号</span>
                </div>

                <List>
                {/* <InputItem
                    {...getFieldProps('phone')}
                    type="phone"
                    placeholder=""
                    value={this.state.phone}
                ></InputItem>
                     */}
                    <InputItem
                        type="phone"
                        placeholder="input your phone"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}
                        extra={this.props.hasPost?this.props.count:''}
                    ><span className={'font-size-14'}>+86</span>
                    </InputItem>
                    <div className={'px-5 mx-5 mt-5'}>
                        <button onClick={()=>this.props.history.push({pathname:"/signIn"})}>返回</button>
                        <Button block shape={'round'} disabled={this.props.hasPost} onClick={this.handleApply}>下一步</Button>
                    </div>
                </List>




            </div>
        )
    }
}

// function showToast (){
//   Toast.info('发送成功',2,()=>{
//       this.props.history.push('/phoneCaptcha')
//   })
// }

//需要渲染什么数据
function mapStateToProps(state) {
    return {
        count: state.count,
        hasPost: state.hasPost
    }
}
//需要触发什么行为
const mapDispatchToProps = (dispatch)=>{
    return {
        // postCaptcha : () => dispatch({ type: 'captchaPost'}),
        startCount: () => dispatch({type:'countOn'}),
        counting: () => dispatch({type: 'onCounting'}),
        endCount: ()=>dispatch({type:'countOff'}),
        asyncCount: ()=>dispatch({type:'asyncCounting'})
        // PayIncrease: () => dispatch({ type: 'plus' }),
        // PayDecrease: () => dispatch({ type: 'minus' }),
        // PayAny: (num) => dispatch({ type: 'any', num:num})
    }
}

let renderSignIn =  createForm()(SignIn)

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(renderSignIn))
