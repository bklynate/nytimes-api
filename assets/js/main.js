// this attachs a click event to ALL buttons on the page
$('button').on('click', function(event) {

  // this stops stops the default behavior
  // and stops the page from reloading due to the submit buttons
  // default behavior.
  event.preventDefault();

  // this line grabs the value of the search input
  var queryItem = $("#search").val();
  var startYear = "&begin_date=" + $("#startYear").val();
  var endYear = "&end_date=" + $("#endYear").val();
  var limit = $("#article-amount").val();

  // this is the api call with the queryItem
  // concatenated into the string
  var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q="' + queryItem + '"&sort=newest';
  var apiKey = '&&api-key=0ae332e50b7a4da8a9a8c64c50efbbec'
  console.log(queryItem);

  url += startYear;
  url += endYear;
  url += apiKey;

  console.log(url);
  // start of the Ajax call
  $.ajax({
    url: url,
    method: 'GET'
  }).done(function(response){
    console.log(response);
    res = response;
    $("#results").empty();
    // for the number of results returned
    for(var i = 0; i < limit; i++){
      console.log(res.response.docs[i].headline.main);
      // create a new element
      articleElements = $("<div>");
      numberButton = $('<span>');
      numberButton.addClass("badge pull-left");
      numberButton.text(i+1);
      articleLink = $('<a>').attr("href", res.response.docs[i].web_url);
      storyHeadline = $('<h2>').text(res.response.docs[i].headline.main);
      storyHeadline.prepend(numberButton);
      articleLink.append(storyHeadline);

      storySnippet = $("<p>").text(res.response.docs[i].snippet);
      articleElements.append(storySnippet);

      articleElements.prepend(articleLink);
      hr = $('<hr/>');

      articleElements.append(hr);
      // attachs the results of the iteration to the 'results' div
      $('#results').append(articleElements);
    }
  });
})
