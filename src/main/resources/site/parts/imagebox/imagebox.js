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
            app.name + ':imagepicker'
        ]
    });

    var hits = result.hits;
    var images = [];

    // Loop through the contents and extract the needed data
    for (var i = 0; i < hits.length; i++) {
        var image = {};
        image.url = portal.imageUrl({
            id: hits[i].data.image,
            scale: 'block(330,300)',
            format: 'jpeg'
        });

        log.info('Image= ' +image.url);

        images.push(image);
    }

    // Add the country data to the model
    model.images = images;

    // Specify the view file to use
    var view = resolve('imagebox.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }
};
