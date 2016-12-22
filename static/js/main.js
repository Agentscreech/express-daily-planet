$('.delete-link').on('click', function(e) {
    e.preventDefault();
    var element = $(this);
    var article = element.attr('href');
    $.ajax({
        method: 'DELETE',
        url: article
    }).done(function(data) {
        // get data returned from the DELETE route
        console.log(data);

        // do stuff when the DELETE action is complete
        // element.remove();

        // or, you can redirect to another page
        window.location = '/articles';
    });
});

$('.put-form').on('submit', function(e) {
  e.preventDefault();
  var articleElement = $(this);
  var articleUrl = articleElement.attr('action');
  var articleData = articleElement.serialize();
  console.log(articleUrl);
  console.log(articleData);
  $.ajax({
    method: 'PUT',
    url: articleUrl,
    data: articleData
  }).done(function(data) {
    // get data returned from the PUT route
    console.log(data);

    // do stuff when the PUT action is complete
    // teamElement.remove();

    // or, you can redirect to another page
    window.location = '/articles';
  });
});
