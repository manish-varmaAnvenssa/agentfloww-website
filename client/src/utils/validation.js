// Validation utility functions for forms

/**
 * Validates phone number format and length
 * Supports international numbers including Indian numbers
 * @param {string} phone - Phone number to validate
 * @returns {string|true} - Error message or true if valid
 */
export const validatePhoneNumber = (phone) => {
  if (!phone) return 'Phone number is required';
  
  // Remove all non-digit characters except + at the start
  const cleanNumber = phone.replace(/[^\d+]/g, '');
  
  if (cleanNumber.startsWith('+')) {
    // International number: + followed by 7-15 digits
    if (cleanNumber.length < 8 || cleanNumber.length > 16) {
      return 'International phone number must be 8-16 digits';
    }
  } else {
    // Local number: 7-15 digits
    if (cleanNumber.length < 7 || cleanNumber.length > 15) {
      return 'Phone number must be 7-15 digits';
    }
  }
  
  return true;
};

/**
 * Validates email format with additional checks
 * @param {string} email - Email to validate
 * @returns {string|true} - Error message or true if valid
 */
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  
  // Basic email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  // Check for common invalid patterns
  if (email.includes('..') || email.includes('--') || email.includes('__')) {
    return 'Email contains invalid characters';
  }
  
  // Check domain length
  const domain = email.split('@')[1];
  if (domain && domain.length > 253) {
    return 'Email domain is too long';
  }
  
  return true;
};

/**
 * Prevents non-phone characters from being typed
 * @param {KeyboardEvent} e - Key press event
 */
export const preventNonPhoneChars = (e) => {
  // Allow only numbers, +, -, (, ), and space
  const allowedChars = /[\d\s\+\-\(\)]/;
  if (!allowedChars.test(e.key)) {
    e.preventDefault();
  }
};

/**
 * Formats phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  const cleanNumber = phone.replace(/[^\d+]/g, '');
  
  if (cleanNumber.startsWith('+')) {
    // Format international numbers
    const countryCode = cleanNumber.substring(0, 3);
    const number = cleanNumber.substring(3);
    
    if (countryCode === '+91' && number.length === 10) {
      // Indian number format: +91 98765 43210
      return `${countryCode} ${number.substring(0, 5)} ${number.substring(5)}`;
    } else {
      // Other international formats
      return cleanNumber;
    }
  } else {
    // Format local numbers
    if (cleanNumber.length === 10) {
      // 10-digit format: (555) 123-4567
      return `(${cleanNumber.substring(0, 3)}) ${cleanNumber.substring(3, 6)}-${cleanNumber.substring(6)}`;
    }
    return cleanNumber;
  }
};
