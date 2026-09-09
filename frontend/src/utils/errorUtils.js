import { toast } from "react-toastify";

/**
 * Extract a user-friendly error message from RTK Query or other errors.
 * Handles multiple error shapes consistently.
 * @param {Object} error - The error object from RTK Query or catch block
 * @returns {string} - Human-readable error message
 */
export const getErrorMessage = (error) => {
  return (
    error?.data?.message ||
    error?.message ||
    error?.error ||
    "An unexpected error occurred"
  );
};

/**
 * Display an error toast with consistent message extraction.
 * Use in catch blocks to show user-friendly error notifications.
 * @param {Object} error - The error object from RTK Query or catch block
 */
export const showErrorToast = (error) => {
  toast.error(getErrorMessage(error));
};
