import React from 'react';

class First extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps){
            console.log(nextProps,prevState)
            return {}
        }
        return null;
    }
    componentDidMount() {
        this.props.putFirst('1');
    }

    render(){
        return (
            <div>
                <Nav {...this.props}/>
                <span>这是第一个</span>
            </div>
        )
    }
}
function Nav (props){
    return (
        <div>
            <button onClick={()=>props.history.goBack()}>后退</button>
            <button onClick={()=>props.history.push('/secondary')}>下一页</button>
        </div>
    )
}

export default First
