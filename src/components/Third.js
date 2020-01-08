import React from 'react'
class Third extends React.Component{
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
        this.props.putThird('3');
    }

    render(){
        return (
            <div>
                <Nav {...this.props}/>
                <span>这是第三页</span>
            </div>
        )
    }
}
function Nav (props){
    return (
        <div>
            <button onClick={()=>props.history.goBack()}>后退</button>
            <button onClick={()=>props.history.push('/first')}>下一页</button>
        </div>
    )
}

export default Third
