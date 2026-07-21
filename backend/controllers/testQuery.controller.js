const TestQueryModel = require('../models/core/TestQueryModel');

/**
 * @desc    Submit a new test query
 * @route   POST /api/test-queries
 * @access  Public
 */
const submitTestQuery = async (req, res) => {
    try {
        const { testType, name, phone, email, preferredBranch, qualification, passingYear } = req.body;

        if (!testType || !name || !phone || !preferredBranch) {
            return res.status(400).json({ message: 'Please provide all required fields (testType, name, phone, preferredBranch)' });
        }

        const newQuery = {
            id: Date.now().toString(),
            testType,
            name,
            phone,
            email: email || '',
            preferredBranch,
            qualification: qualification || '',
            passingYear: passingYear || '',
            createdAt: new Date().toISOString()
        };

        TestQueryModel.add(newQuery);

        res.status(201).json({ message: 'Test query submitted successfully', query: newQuery });
    } catch (error) {
        console.error('Error submitting test query:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Get all test queries
 * @route   GET /api/test-queries
 * @access  Private (Admin/Employee)
 */
const getTestQueries = async (req, res) => {
    try {
        const queries = TestQueryModel.getAll();
        // Sort descending by createdAt
        queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(queries);
    } catch (error) {
        console.error('Error fetching test queries:', error);
        res.status(500).json({ message: 'Server error fetching test queries' });
    }
};

/**
 * @desc    Delete a test query
 * @route   DELETE /api/test-queries/:id
 * @access  Private (Admin)
 */
const deleteTestQuery = async (req, res) => {
    try {
        const { id } = req.params;
        TestQueryModel.deleteById(id);
        res.json({ message: 'Test query deleted successfully' });
    } catch (error) {
        console.error('Error deleting test query:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    submitTestQuery,
    getTestQueries,
    deleteTestQuery
};
