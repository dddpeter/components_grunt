/**
 * Created by dddpe on 2016-8-5.
 */
var LikedButton=React.createClass(
    {
        getInitialState:function(){
            return {liked:false,opacity: 1.0};
        },
        toggleLiked:function(){
           this.setState({liked:!this.state.liked});
        },
        componentDidMount: function () {
            this.timer = setInterval(function () {
                var opacity = this.state.opacity;
                opacity -= .05;
                if (opacity < 0.1) {
                    opacity = 1.0;
                }
                this.setState({
                    opacity: opacity
                });
            }.bind(this), 100);
        },
        render:function(){
            var text=this.state.liked?'已经点赞':'还没有点赞';
            return (
                <button style={{opacity: this.state.opacity}} onClick={this.toggleLiked}>
                    你{ text },点击改变状态.
                </button>
            );
        }
    }
);

ReactDOM.render(
    <LikedButton/>,
    document.getElementById('example')
);