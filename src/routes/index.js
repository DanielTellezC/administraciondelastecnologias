const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { find, findById } = require('../models/rollos');
const rollos = require('../models/rollos');
const User = require('../models/user');
const empleadosentrada = require('../models/empleadosentrada');
const empleadossalida = require('../models/empleadossalida');
const menu = require('../models/menu');
const queja = require('../models/quejas');
const proveedor = require('../models/proveedores');

////////// Index /////////////////////
router.get('/',(req, res) => {
    res.render('index')
})

//////////////Signup ////////////////
router.get('/signup',(req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

/////////////////Signin ////////////////////
router.get('/signin',(req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

/////////Logout (Salir)///////////////
router.get('/logout', (req,res,next) =>{
    req.logOut();
    res.redirect('/signin');
});

////////////////// perfil del usuario /////////////////
router.post('/profile', async function(req, res, next){
    const rollonuevo = new rollos(req.body);
    console.log(rollonuevo);
    const user = req.user.id;
    rollonuevo.cuenta = user;
    console.log('Usuario', user);
    await rollonuevo.save();
    res.redirect('profile');
});


router.get('/profile',isAuthenticated, (req, res, next) => {
    res.render('profile');
});
/////////////////// Menú ////////////////////////
router.get('/menu', (req, res, next) => {
    res.render('menu');
});

router.post('/menu', async function(req, res, next){
    const menunuevo = new menu(req.body);
    console.log(menunuevo);
    ///// const user = req.user.id;
    ///// menunuevo.cuenta = user;
    await menunuevo.save();
    res.redirect('menu');
});

//////////////////// Mostrar menú ////////////////////
router.get('/mostrarmenu', mostrarmenu ,(req, res, next) => {
});

async function mostrarmenu(req,res,next){
    const menus = await menu.find();
    
    res.render('mostrarmenu', { menus });
}

////////////////// Editar menú //////////////////
router.get('/editarmenu/:id', async(req, res , next) =>{
    const {id} = req.params;
    console.log('Este es el id', id)
    const menus = await menu.findById(id);
    res.render('editarmenu', {menus});
});

router.post('/editar/:id', mostrarmenu ,async(req, res, next) =>{
    const {id} = req.params;
    await menu.update({_id:id}, req.body);
    res.redirect('/');
});

router.get('/eliminar/:id',async(req,res,next) =>{
    const {id} = req.params;
    await menu.remove({_id:id});
    res.redirect('/mostrarmenu');
});

/////////////////// Buzón de quejas ////////////////
router.get('/buzon', isAuthenticated, mostrarquejas , async(req, res, next) =>{

});

router.post('/postearqueja', async(req, res, next) => { 
    const quejanueva = new queja(req.body);
    quejanueva.cuenta = req.user.id;
    await quejanueva.save();
    res.redirect('buzon')
});

async function mostrarquejas(req,res,next){
    const quejas = await queja.find();  
    res.render('buzondequejas', { quejas });
}

//////////////////////////// Proveedores /////////////////////////
router.get('/proveedores', isAuthenticated ,async(req, res, next) => {
    res.render('proveedores');
});

router.post('/agregarproveedor', isAuthenticated ,  async(req, res, next) =>{
    const proveedornuevo = new proveedor(req.body);
    proveedornuevo.cuenta = req.user.id;
    await proveedornuevo.save();
    res.redirect('proveedores');
})

async function mostrarproveedores(req, res, next){
    const proveedores = await proveedor.find();
    res.render('listaproveedores', { proveedores });
}

/////////////////// Lista de proveedores //////////////

router.get('/listaproveedores', mostrarproveedores , isAuthenticated,(req, res, next) => {

});

router.get('/editarproveedor/:id',async(req, res, next) =>{
    const {id} = req.params;
    const proveedores = await proveedor.findById(id);
    res.render('editarproveedor', {proveedores});
});

router.post('/editarproveedorn/:id', mostrarproveedores ,async(req, res,next) =>{
    const {id} = req.params;
    await menu.update({_id, id}, req.body);
    res.redirect
});

router.get('/eliminarproveedor/:id',async(req,res,next) =>{
    const {id} = req.params;
    await proveedor.remove({_id:id});
    res.redirect('/listaproveedores');
});



/////////////////// inventario de rollos ///////////
router.get('/inventario', isAuthenticated,lecrollos , async (req,res,next) =>{
    
});

async function lecrollos(req,res,next){
    const rollo = await rollos.find({ cuenta:req.user.id  });
    res.render('inventario', { rollo });
};

///////////////registro de llegada de los empleados///////////
router.get('/empleados', isAuthenticated,lecempleadosEn,(req,res,next) =>{
    
});
router.post('/empleados_entrada', async function(req,res,next){
    const empleadosEntadaN = new empleadosentrada(req.body);
    console.log(empleadosEntadaN);
    empleadosEntadaN.cuenta = req.user.id;
    await empleadosEntadaN.save();
    res.redirect('empleados');
});
router.post('/empleados_salida', async function(req,res,next){
    const empleadosSalidaN = new empleadossalida(req.body);
    empleadosSalidaN.cuenta = req.user.id;
    await empleadosSalidaN.save();
    res.redirect('empleados');
});
async function lecempleadosEn(req,res,next){
    const empleadosEnN = await empleadosentrada.find({ cuenta:req.user.id });
    const empleadosSaN = await empleadossalida.find({ cuenta:req.user.id});
    res.render('empleados', { empleadosEnN, empleadosSaN });
}

/////////////funcion de autenticación para las sesiones /////////////////////
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;