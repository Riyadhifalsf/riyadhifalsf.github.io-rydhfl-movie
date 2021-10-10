String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '45ad56dd',
            's' : $('#search-input').val()
        },
        success: function(result) {
            if(result.Response == "True") {
                 let movies = result.Search;
                 
                 $.each(movies, function(i, data) {
                     $("#movie-list").append(`
                        <div class="col-md-3">
                            <div class="card mb-4">
                                <img class="card-img-top" src="` + data.Poster + `" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">`+ data.Title + ` (` + data.Year +  `)` + `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">` + data.Type.capitalize() +`</h6>
                                <a href="#" class="card-link see-detail" data-target="#seeDetailMovie" data-toggle="modal" data-id="`+ data.imdbID +`">See Movie</a>
                                </div>
                            </div>
                        </div>
                     `)
                 })

                 $('#search-input').val('')
            } else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class=\"text-center\">` + result.Error + `</h1>
                </div>`)
            }
        }
    });
}

$('#search-button').on('click', function() {

    searchMovie()

});

$('#search-input').on('keyup', function(e) {
    if(e.keyCode == 13) {
        searchMovie()
    }
});

$('#movie-list').on('click', '.see-detail', function() {

    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '45ad56dd',
            'i' : $(this).data('id')
        },
        success: function(movie) {

            if(movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">

                            <div class="col-md-4">
                                <img class="img-fluid" src="`+ movie.Poster +`" >
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title + ` (` + movie.Year +  `)` + `</h3></li>
                                    <li class="list-group-item">Released: `+ movie.Released +`</li>
                                    <li class="list-group-item">Genre: `+ movie.Genre +`</li>
                                    <li class="list-group-item">Rating: ⭐`+ movie.Ratings[0].Value +`</li>
                                    <li class="list-group-item">Duration: `+ movie.Runtime +`</li>
                                    <li class="list-group-item">Synopsis: `+ movie.Plot +`</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                `)
            }

        }
    })

})