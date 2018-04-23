// create a global array called cars.
var posts = [];
var idPost = 0;

var isEmpty = function(str) {
    return (!str || 0 === str.length || !str.trim);
}
//function definition
var addPost = function(){
    //debugger;
    let post = {};
    // give us the value of the post text input
    post.text = $('.post-input').val();
    // update the id of the post
    post.id = idPost;
   
    if (!(isEmpty(post.text)) || !(isEmpty(post.id)))
    {
        // Add a new value in the cars array
        posts.push(post);
        // Invoke renderCars inside your click handler just below
        // where you're invoking the addCar function.
        renderPosts();
        // Clears the form 
        // clear the post-input placeholder
        $('.post-input').val("");
        idPost++;

    }
};

var removePost = function(){
    //debugger;
    // get the id of the element to delete
    var idToRemove = $(this).closest(".post").data().id;
    // find the index in the posts array that match the id of the element to delete
    for (var i=0; i<posts.length; i++){
        
        if (idToRemove == posts[i].id)
        {
            posts.splice(i,1);
            break;
        }
    }
    // delete the row of the posts array
    renderPosts();
};

var renderPosts = function(){
    // 1 - Empty the posts <ul> so that it no longer has any <li> elements
    $('.posts-list').empty();
    // 2 - Loop through the posts array,
    // inside the loop append the cars to the cars <ul>
    var liValue = "";
    for (var i=0; i < posts.length; i++) {
        var removeButton = '<button type="button" class="btn btn-primary remove-post">REMOVE</button>';
        var liValue = "<li> <p class = 'post' data-id=" + posts[i].id + ">" + removeButton + posts[i].text +  "</> </li>";
        $('.posts-list').append(liValue);
        // Remove the post from the array and consequently the page.
        // Call the removePost method more than once when clicking 
        // on the remove button
       
        // don't work
        //$('.remove').on('click', 'li', removePost);
    }
    $('.remove-post').click(removePost);
};

//addPost() === invocation
$('.add-post').click(addPost);
//don't work (preventing invokation of the removePost method 
// more than one time when clicking the remove button 
//$('.add-post').on('click', 'li', addPost); 


