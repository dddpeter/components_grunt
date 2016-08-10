/**
 * Created by dddpe on 2016-8-5.
 */
var MyForm=React.createClass(
    {
        getInitialState:function(){
            return {myName:'None'}
        },
        handleClick:function(){
            this.refs.myName.focus();
        },
        changeMyName:function(event){
            this.setState({ myName : event.target.value });
        },
        render:function() {
            var myName=this.state.myName;
            return (
                <form>
                    <input type="text" value={ myName } ref="myName" onChange={this.changeMyName} placeholder="请输入用户名"/>
                    <input type="button" value="点击这里开始输入" onClick={ this.handleClick }/>
                    <p>{ myName }</p>
                </form>
            )
        }
    }

);
ReactDOM.render(
    <MyForm></MyForm>,
    document.getElementById('example')
);