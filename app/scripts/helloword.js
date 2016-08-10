// tutorial1.js
var comments=[
    {
    author:'Pete Hunt',
    comment:'This is one comment'
    },
    {
        author:'Jordan Walke',
        comment:'This is *another* comment'
    }
];
var Comment=React.createClass({
    render:function(){
        return(
            <div className="comment">
                <h2 className="commentAuthor">
                    { this.props.author }
                </h2>
                {this.props.children}
            </div>
        );
    }
});
var CommentList=React.createClass({
    render:function(){
        return(
            <div className="commentList">
                {
                    comments.map(function(c){
                        return <Comment key={c.author} author={ c.author }>{ c.comment }</Comment>
                    })
                }
            </div>
        );
    }
});
var CommentForm=React.createClass({
    render:function(){
        return(
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});
var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList></CommentList>
                <CommentForm></CommentForm>
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById('example')
);