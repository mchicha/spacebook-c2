var SpacebookApp = function () {
  var posts = [];

  // the current id to assign to a post
    var currentId = 0;
    var $posts = $('.posts');

    var _findPostById = function (id) {
      for (var i = 0; i < posts.length; i += 1) {
        if (posts[i].id === id) {
          return posts[i];
        }
      }
    }

    var createPost = function (text) {
      var post = {
        text: text,
        id: currentId,
        comments: []
      }
      currentId += 1;

      posts.push(post);
    }

    var renderPosts = function () {
      $posts.empty();

      for (var i = 0; i < posts.length; i += 1) {
        var post = posts[i];

        var commentsContainer = '<div class="comments-container">' +
          '<input type="text" class="comment-name">' +
          '<button class="btn btn-primary add-comment">Post Comment</button> <div class="comments"></div></div>';
 
        $posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>');
      }
      
      $('.add-comment').on('click', function () {
        //var text = $('.comment-name').val();
        var text = $(this).parent().find('.comment-name').val();

        //var text = $(current).parent().find('.comment-name').val();
        app.createComment(this, text);
        // Update the view of the comments
        app.renderComments(this);
      });
    }

    var renderComments = function (currentPost) {
      // Get the id of the post from which we wrote comments
      var id = $(currentPost).closest('.post').data().id;
      // Get the post from which we have to update the view
      var post = _findPostById(id);
      var $comments = $(currentPost).parent().find(".comments");
      // Clear the comments area
      $comments.empty();
      
      for (var i = 0; i < post.comments.length; i ++) {
        var comment = post.comments[i].text;
        // Build the commentElement string to include a remove button
        var commentElement = '<p><a href="#" class="remove-comment">remove</a> ' + comment + '</p>';
        // Add the commentElement to the web page
        $comments.append('<div class="comment" data-id=' + i + '>' + commentElement + '</div>');
      }
      $('.comment').on('click', function () {
        
        app.removeComment(this);
        // Update the view of the comments
        app.renderComments(this);
      });
      
    }

    var removePost = function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      var id = $clickedPost.data().id;

      var post = _findPostById(id);

      posts.splice(posts.indexOf(post), 1);
      $clickedPost.remove();
    }

    var removeComment = function(currentComment){
      // Get the post element that contains the comment to remove
      var $post = $(currentComment).closest('.post');
      // Get the id of post
      var id = $post.data().id;
      // Get the post object
      var post = _findPostById(id);
      // Get the comment to remove
      var $clickedComment = $(currentComment).closest('.comment');
      // Get the id of the comment to remove
      var idComment = $clickedComment.data().id;
      
      // Delete the comment from the comments array of the post
      post.comments.splice(idComment, 1);
      // Remove the comment from the screen
      $clickedComment.remove();
    }

    var createComment = function (currentPost, textComment) {
      
      var $clickedPost = $(currentPost).closest('.post');
      var id = $clickedPost.data().id;
      var post = _findPostById(id);
      var comment = { text: textComment };
      post.comments.push(comment);
    }

    var toggleComments = function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    }

    return {
      createPost: createPost,
      renderPosts: renderPosts,
      removePost: removePost,
      createComment: createComment,
      renderComments: renderComments,
      removeComment: removeComment,
      toggleComments: toggleComments
    }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
    var text = $('#post-name').val();

    app.createPost(text);
    app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
    app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
    app.toggleComments(this);
    app.renderComments(this);
});
