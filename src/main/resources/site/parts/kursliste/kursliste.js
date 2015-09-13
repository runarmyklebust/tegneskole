var thymeleaf = require('/lib/xp/thymeleaf'); // Import the thymeleaf render function
var contentLib = require('/lib/xp/content'); // Import the content service functions
var portal = require('/lib/xp/portal'); // Import the portal functions

// Handle the GET request
exports.get = function (req) {
    var model = {};

    // Get all the country contents
    var result = contentLib.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ':kurs'
        ]
    });

    var hits = result.hits;
    var courses = [];

    // Loop through the contents and extract the needed data
    for (var i = 0; i < hits.length; i++) {
        var course = {};
        course.name = hits[i].displayName;
        course.description = hits[i].data.description;
        course.startup = hits[i].data.startup;
        course.occurrences = hits[i].data.occurrences;
        course.price = hits[i].data.price;
        course.time = hits[i].data.time;
        course.location = hits[i].data.location;
        courses.push(course);
    }

    // Add the country data to the model
    model.courses = courses;

    // Specify the view file to use
    var view = resolve('kursliste.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }
};
