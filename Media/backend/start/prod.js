const helmet = require("helmet");
const compression = require("compression");

module.exports = function(app){
    app.use(helmet(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "https://code.jquery.com/jquery-3.2.1.slim.min.js", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js", "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"],
                //    styleSrc: ["'self'", "fonts.googleapis.com", "'unsafe-inline'"],
                }
            },
        })
    
    ));
    app.use(compression());
}