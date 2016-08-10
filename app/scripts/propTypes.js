/**
 * Created by dddpe on 2016-8-5.
 */
var MyTitle=React.createClass({
    propTypes:{
        title:React.PropTypes.string.isRequired
    },
    getDefaultProps : function () {
        return {
                title : '这只是一个测试哦'
            };
    },
    render:function() {
        return <h1>{ this.props.title }</h1>
    }
}
);

ReactDOM.render(
    <div><MyTitle title="不含默认值的测试哦"></MyTitle> <MyTitle></MyTitle></div>,
    document.getElementById('example')
);