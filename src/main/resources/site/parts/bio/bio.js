var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function
var contentLib = require('/lib/xp/content');


// Handle the GET request
exports.get = function (req) {

    // Get the country content and extract the needed data from the JSON
    var content = contentLib.get({
        key: '9af0bcaa-4c72-4236-9b5e-c83df4c4072a'
    });

    // Prepare the model object with the needed data extracted from the content
    var model = {
        name: content.displayName,
        description: content.data.description,
        image: portal.imageUrl({
            path: '/tegnekurs/morten-kildevld-larsen/morten.jpg',
            scale: 'max(300)',
            format: 'jpeg'
        })
    };

    // Specify the view file to use
    var view = resolve('bio.html');

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, model)
    }
};