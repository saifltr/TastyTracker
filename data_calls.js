function fetchCities() {
    $('body').LoadingOverlay("show");
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cities",
        type: "GET",
        headers: {
            "user-key": "13ebf4d581f468d8eeb74af40a4a0b6f"
        },
        data: {
            q: $('#city_name').val(),
        },
        success: function(data) {
            $('body').LoadingOverlay("hide");
            console.log(JSON.stringify(data));
            $('#results').empty();
            for (var i = 0; i < data.location_suggestions.length; i++) {
                $('#results').append(
                    '<div class="col-md-3 col-sm-12">' +
                    '<div class="card">' +
                    '<div class="card-body">' + '<h3>' + data.location_suggestions[i].name + '</h3>' +
                    '<button class="btn btn-info" onclick="fetchRestaurants( \'' +
                    data.location_suggestions[i].id + '\')">' +
                    'Search for "' + data.location_suggestions[i].name + '"' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
        }
    });
}

function fetchRestaurants(entity_id) {
    $('body').LoadingOverlay("show");
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search",
        type: "GET",
        headers: {
            "user-key": "13ebf4d581f468d8eeb74af40a4a0b6f"
        },
        data: {
            entity_id: entity_id,
            entity_type: 'city',
            // q: '',
            // start: '',
            // count: '',
            // lat: '',
            // lon: '',
            // radius: '',
            // cuisines: '',
            // establishment_type: '',
            // collection_id: '',
            // category: '',
            // sort: '',
            // order: '',
        },
        success: function(data) {
            $('body').LoadingOverlay("hide");
            console.log(JSON.stringify(data));
            $('#results').empty();
            for (var i = 0; i < data.restaurants.length; i++) {
                $('#results').append(
                    '<div class="col-md-3 col-sm-12">' +
                        '<span class="top-left-tag-rating"> Rated ' + data.restaurants[i].restaurant.user_rating.aggregate_rating + ' <i class="fa fa-star"></i></span>' +
                        '<img src="https://i.pinimg.com/originals/97/e9/42/97e942ce7fc4e9d4ea6d844a382f251f.gif" data-src="' + data.restaurants[i].restaurant.featured_image + '" class="card-img-top" alt="" style="min-height:250px !important;max-height:250px !important;" > ' + 
                    '<div class="card-body" style="min-height:250px !important;max-height:250px!important; overflow: hidden;">' + '<h5>' + data.restaurants[i].restaurant.name + '</h5>' +
                    '<small class="text-info">' + data.restaurants[i].restaurant.cuisines + '</small>' + '<br>' +
                    '<i class="fa fa-clock"></i> ' + data.restaurants[i].restaurant.timings + '<br>' +
                    '<i class="fa fa-phone"></i> ' + data.restaurants[i].restaurant.phone_numbers +
                    '<br>' +
                    '<br>' +
                    '<a class="btn btn-info btn-sm" target="_blank" href="' +
                    data.restaurants[i].restaurant.order_url + '">Order Now</a>' +
                    '<a class="btn btn-primary btn-sm" target="_blank" href = "http://maps.google.com/?q=' + encodeURIComponent(data.restaurants[i].restaurant.location.address) + '"> <i class="fa fa-map - marker "></i> </a>' +
                    (
                        data.restaurants[i].restaurant.phone_numbers.length == 14 ||
                        data.restaurants[i].restaurant.phone_numbers.length == 12 ?
                        '<a class="btn btn-success btn-sm" target="_blank"href = "https://api.whatsapp.com/send?phone=' +
                        encodeURIComponent(data.restaurants[i].restaurant.location.address) + '"> <i class="fab fa-whatsapp "></i> </a>' :
                        ''
                    ) +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
                console.log(i);
            }
            $('img.card-img-top').Lazy();
        }
    });
}