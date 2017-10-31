document.getElementById('myForm').addEventListener('submit', addBookmark);

function addBookmark(event){
    event.preventDefault();
    
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    // TODO - check for valid url

    console.log(bookmark);
    if(localStorage.getItem('bookmarks') == null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));        
    }else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
    }
    showBookmarks();
}


function showBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    document.getElementById('bookmarks').innerHTML='';
    bookmarks.forEach(function(element) {
        document.getElementById('bookmarks').innerHTML+=
        '<div class="well">'+
        '   <h4>'+element.name+'</h4>'+
        '   <a class="btn btn-success" target="_blank" href="'+element.url+'">Visit</a>'+
        '   <a class="btn btn-danger" onclick="deleteBookmark(\''+ element.url +'\')" href="#">Delete</a>'+
        '</div>';
    }, this);
}


function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var index = 0; index < bookmarks.length; index++) {
        if (bookmarks[index].url == url) {
            bookmarks.splice(index, 1);
        }
    }   
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    console.log(url+' deleted');
    showBookmarks();
}