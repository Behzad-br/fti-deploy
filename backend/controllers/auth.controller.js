const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('[AuthController] loginUser error:', error);
        next(error);
    }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('[AuthController] getMe error:', error);
        next(error);
    }
};

/**
 * @desc    Update user password
 * @route   PUT /api/auth/password
 * @access  Private
 */
const updatePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    try {
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Please provide both current and new passwords' });
        }

        const user = await User.findById(req.user._id);

        if (user && (await user.matchPassword(currentPassword))) {
            user.password = newPassword; // password pre-save hook handles hashing
            await user.save();
            
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(401).json({ message: 'Invalid current password' });
        }
    } catch (error) {
        console.error('[AuthController] updatePassword error:', error);
        next(error);
    }
};

/**
 * @desc    Create new employee account
 * @route   POST /api/auth/employee
 * @access  Private (Admin Only)
 */
const createEmployee = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const newEmployee = await User.create({
            name,
            email,
            password,
            role: 'employee'
        });

        res.status(201).json({
            _id: newEmployee._id,
            name: newEmployee.name,
            email: newEmployee.email,
            role: newEmployee.role
        });
    } catch (error) {
        console.error('[AuthController] createEmployee error:', error);
        next(error);
    }
};

/**
 * @desc    Get all employees
 * @route   GET /api/auth/employees
 * @access  Private (Admin Only)
 */
const getEmployees = async (req, res, next) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('-password');
        res.json(employees);
    } catch (error) {
        console.error('[AuthController] getEmployees error:', error);
        next(error);
    }
};

/**
 * @desc    Delete employee account
 * @route   DELETE /api/auth/employee/:id
 * @access  Private (Admin Only)
 */
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        if (!user || user.role === 'admin') {
            return res.status(404).json({ message: 'Employee not found or cannot delete admin' });
        }

        await User.deleteOne({ _id: id });
        res.json({ message: 'Employee removed successfully' });
    } catch (error) {
        console.error('[AuthController] deleteEmployee error:', error);
        next(error);
    }
};

module.exports = {
    loginUser,
    getMe,
    updatePassword,
    createEmployee,
    getEmployees,
    deleteEmployee
};
