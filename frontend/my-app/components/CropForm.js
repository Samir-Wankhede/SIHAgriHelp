"use client";
import { useState } from 'react';

const CropForm = () => {
    const [formData, setFormData] = useState({
        crop: '',
        cropYear: '',
        season: '',
        state: '',
        area: '',
        production: '',
        annualRainfall: '',
        fertilizer: '',
        pesticide: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4005/api/submit-crop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log('Result:', result);
        } catch (error) {
            console.error('Error submitting data', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Crop Data Form</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label htmlFor="crop" className="text-lg font-medium mb-2">Crop:</label>
                    <select
                        name="crop"
                        value={formData.crop}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">Select Crop</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Rice">Rice</option>
                        <option value="Maize">Maize</option>
                        {/* Add more crop options here */}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="cropYear" className="text-lg font-medium mb-2">Crop Year:</label>
                    <input
                        type="number"
                        name="cropYear"
                        value={formData.cropYear}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="season" className="text-lg font-medium mb-2">Season:</label>
                    <select
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">Select Season</option>
                        <option value="Kharif">Kharif</option>
                        <option value="Rabi">Rabi</option>
                        <option value="Whole Year">Whole Year</option>
                        {/* Add more season options here */}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="state" className="text-lg font-medium mb-2">State:</label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">Select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Karnataka">Karnataka</option>
                        {/* Add more state options here */}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="area" className="text-lg font-medium mb-2">Area (in hectares):</label>
                    <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="production" className="text-lg font-medium mb-2">Production (in metric tons):</label>
                    <input
                        type="number"
                        name="production"
                        value={formData.production}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="annualRainfall" className="text-lg font-medium mb-2">Annual Rainfall (in mm):</label>
                    <input
                        type="number"
                        name="annualRainfall"
                        value={formData.annualRainfall}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fertilizer" className="text-lg font-medium mb-2">Fertilizer (in kilograms):</label>
                    <input
                        type="number"
                        name="fertilizer"
                        value={formData.fertilizer}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pesticide" className="text-lg font-medium mb-2">Pesticide (in kilograms):</label>
                    <input
                        type="number"
                        name="pesticide"
                        value={formData.pesticide}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CropForm;
