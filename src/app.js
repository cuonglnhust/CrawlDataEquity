import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
const coinsRouter = require('./routes/coins');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(__dirname + '../public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        callback(null, true);
    }
}));

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({ limit: '500mb' }));

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../media')))
app.use(express.static(path.join(__dirname, '../build')))

// Setup middlewares
import { isIP } from 'net';
app.use((req, res, next) => {
    if (isIP(req.hostname) == 0) {
        req.baseUri = req.protocol + '://' + req.hostname + '/';
    } else {
        if (!req.secure) {
            let port = app.get('port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 80 ? '' : (':' + port)) + '/';
        } else {
            let port = app.get('https_port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 443 ? '' : (':' + port)) + '/';
        }
    }
    next();
});

// Setup other routes
app.use('/api', routes);

// Mid3rd.scheduleCheckActiveKey();

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

//app.use('/coin-test', coinsRouter)
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'views'));
});

export default app;