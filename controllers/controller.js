//import modules
const router = express.Router();


const controller = {

    getIndex: function (req, res) {

        // render `../views/index.hbs`
        res.render('login');
    }
}

module.exports = controller;