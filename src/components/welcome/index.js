import React from 'react'

class Welcome extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            countDown: 4
        }

        this.handleClick = this.handleClick.bind(this)

    }
    
    componentDidMount(){
        let timer = setInterval(()=>{
            this.setState({
                countDown: this.state.countDown -=1
            },()=>{
                console.log(this.state.countDown);
                
                if(this.state.countDown===0){
                    this.props.history.push('/home');
                    clearInterval(timer)
                }
            })

        },1000)
    }


    handleClick (){

        fetch('https://10.10.10.234:8080/token?page=0&size=20')

        .then(res => res.json())

        .then(data => {
            console.log(data);
            this.setState({list:data})
        })
        .catch(err => alert(err))
    }

    render (){
        return (
            <div>
                <span>欢迎</span>
                <span>{this.state.countDown}</span>
            </div>
        )
    }
}


export default Welcome