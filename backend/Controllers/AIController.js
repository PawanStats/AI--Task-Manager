const getAISuggestions = (req, res) => {
    try {
        const suggestions = [
            "Organize your project folder structure",
            "Write documentation for your current project",
            "Learn one new React hook today"
        ];
        
        res.status(200).json({
            message: 'AI suggestions fetched successfully',
            success: true,
            suggestions
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch AI suggestions',
            success: false
        });
    }
};

module.exports = {
    getAISuggestions
};
