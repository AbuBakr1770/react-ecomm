const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {isAuthenticatedUser, authorizedRole} = require("../middleware/auth");


router.route('/register').post(userController.registerUser)
router.route('/login').post(userController.loginUser)

router.route('/forgotPassword').post(userController.forgotPassword)
router.route('/password/reset/:token').put(userController.resetPassword)
router.route('/me').get(isAuthenticatedUser, userController.getOneUserDetails)
router.route('/password/change').put(isAuthenticatedUser, userController.changePassword)
router.route('/me/update').put(isAuthenticatedUser, userController.changeProfile)

router.route('/admin/getusers').get(isAuthenticatedUser, authorizedRole('admin'), userController.getAllUsers)

router.route('/admin/getuser/:id')
    .get(isAuthenticatedUser, authorizedRole('admin'), userController.getoneUserAdmin)
    .put(isAuthenticatedUser, authorizedRole('admin'), userController.updateUserRole)
    .delete(isAuthenticatedUser, authorizedRole('admin'), userController.deleteUser)


router.route('/logout').post(userController.logoutUser)

module.exports = router