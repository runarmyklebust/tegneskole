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
            app.name + ':infobox'
        ]
    });

    var hits = result.hits;
    var infoboxes = [];

    // Loop through the contents and extract the needed data
    for (var i = 0; i < hits.length; i++) {
        var infobox = {};
        infobox.name = hits[i].displayName;
        infobox.heading = hits[i].data.heading;
        infobox.preface = hits[i].data.preface;
        infobox.description = hits[i].data.description;
        infoboxes.push(infobox);
    }

    // Add the country data to the model
    model.infoboxes = infoboxes;

    // Specify the view file to use
    var view = resolve('infobox.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }
};
