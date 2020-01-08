import React from 'react';

class Secondary extends React.Component {
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
        return null
    }
    componentDidMount() {
        this.props.putSecondary('2');
    }

    render(){
        return (
            <div>
                <Nav {...this.props}/>
                <span>这是第二个</span>
            </div>
        )
    }
}

function Nav (props){
    return (
        <div>
            <button onClick={()=>props.history.goBack()}>后退</button>
            <button onClick={()=>props.history.push('/third')}>下一页</button>
        </div>
    )
}

export default Secondary
