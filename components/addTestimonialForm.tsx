"use client";

import { useState } from "react";
import { addTestimonial } from "@/services/dataService";
import { FiX, FiStar, FiAlertCircle } from "react-icons/fi";

interface AddTestimonialFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTestimonialForm({
  onClose,
  onSuccess,
}: AddTestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    location: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    review?: string;
    location?: string;
  }>({});

  // Validation helper function
  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        if (value.trim().length > 50) return "Name must not exceed 50 characters";
        return null;

      case "location":
        if (!value.trim()) return "Location is required";
        if (value.trim().length < 2) return "Location must be at least 2 characters";
        if (value.trim().length > 50) return "Location must not exceed 50 characters";
        return null;

      case "review":
        if (!value.trim()) return "Review is required";
        if (value.trim().length < 10)
          return `Review must be at least 10 characters (${value.trim().length}/10)`;
        if (value.trim().length > 500)
          return "Review must not exceed 500 characters";
        return null;

      default:
        return null;
    }
  };

  // Check if all fields are valid
  const isFormValid = (): boolean => {
    return (
      !validateField("name", formData.name) &&
      !validateField("location", formData.location) &&
      !validateField("review", formData.review)
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));

    // Real-time validation
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Final validation
    if (!isFormValid()) {
      const errors: { [key: string]: string } = {};
      const nameError = validateField("name", formData.name);
      const locationError = validateField("location", formData.location);
      const reviewError = validateField("review", formData.review);

      if (nameError) errors.name = nameError;
      if (locationError) errors.location = locationError;
      if (reviewError) errors.review = reviewError;

      setFieldErrors(errors);
      setError("Please fill in all fields correctly before submitting.");
      return;
    }

    setLoading(true);

    try {
      await addTestimonial(formData);
      setSuccess(true);
      setFormData({
        name: "",
        review: "",
        location: "",
        rating: 5,
      });
      setFieldErrors({});

      // Close form after success
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit testimonial",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center z-55 mt-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full md:w-[400px] h-[610px]">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-6 flex items-center justify-between rounded-t-3xl">
          <h3 className="text-2xl font-bold">Share Your Experience</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium">
              ✓ Thank you! Your testimonial has been submitted successfully.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2 flex items-center gap-1">
              Your Name *
              {fieldErrors.name && (
                <FiAlertCircle className="w-4 h-4 text-red-500" />
              )}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={loading || success}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed ${
                fieldErrors.name
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-dark mb-2 flex items-center gap-1">
              Your Location *
              {fieldErrors.location && (
                <FiAlertCircle className="w-4 h-4 text-red-500" />
              )}
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              disabled={loading || success}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed ${
                fieldErrors.location
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            {fieldErrors.location && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.location}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-3">
              Your Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  disabled={loading || success}
                  className="transition-all disabled:cursor-not-allowed"
                >
                  <FiStar
                    className={`w-8 h-8 transition-all ${
                      star <= formData.rating
                        ? "text-accent fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <label htmlFor="review" className="block text-sm font-semibold text-dark mb-2 flex items-center gap-1">
              Your Review *
              {fieldErrors.review && (
                <FiAlertCircle className="w-4 h-4 text-red-500" />
              )}
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Share your experience (minimum 10 characters)"
              rows={3}
              disabled={loading || success}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed ${
                fieldErrors.review
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              <p className={`text-xs ${
                fieldErrors.review ? "text-red-500" : "text-gray-500"
              }`}>
                {formData.review.length}/500 characters
              </p>
              {fieldErrors.review && (
                <p className="text-red-500 text-xs">{fieldErrors.review}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading || success}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success || !isFormValid()}
              title={!isFormValid() ? "Please fill in all fields correctly" : ""}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
