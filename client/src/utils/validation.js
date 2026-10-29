// Validation utility functions for forms

/**
 * Validates phone number format and length
 * Supports international numbers including Indian numbers
 * @param {string} phone - Phone number to validate
 * @returns {string|true} - Error message or true if valid
 */
export const validatePhoneNumber = (phone) => {
  if (!phone) return 'Phone number is required';
  
  const cleanPhone = phone.trim();
  // Reject if contains letters or typical invalid symbols
  const validPhonePattern = /^\+?[\d\s\-()]+$/;
  if (!validPhonePattern.test(cleanPhone)) {
    return 'Phone number contains invalid characters';
  }
  
  // Remove all non-digit characters
  const cleanNumber = cleanPhone.replace(/[^\d]/g, '');
  
  if (cleanPhone.startsWith('+')) {
    // International number: 10-15 digits
    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
      return 'International phone number must be 10-15 digits';
    }
  } else {
    // Local number: 9-11 digits
    if (cleanNumber.length < 9 || cleanNumber.length > 11) {
      return 'Phone number must be 9-11 digits';
    }
  }
  
  return true;
};

export const countryCodes = [
  { code: '+91', flag: '🇮🇳', name: 'India', length: 10 },
  { code: '+971', flag: '🇦🇪', name: 'UAE', length: 9 },
  { code: '+1', flag: '🇺🇸', name: 'US/Canada', length: 10 },
  { code: '+44', flag: '🇬🇧', name: 'UK', length: 10 },
  { code: '+65', flag: '🇸🇬', name: 'Singapore', length: 8 },
  { code: '+61', flag: '🇦🇺', name: 'Australia', length: 9 },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', length: 9 },
  { code: '+974', flag: '🇶🇦', name: 'Qatar', length: 8 },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain', length: 8 },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait', length: 8 },
  { code: '+968', flag: '🇴🇲', name: 'Oman', length: 8 },
  { code: '+20', flag: '🇪🇬', name: 'Egypt', length: 10 },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan', length: 10 },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh', length: 10 },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia', length: 9 },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia', length: 10 },
  { code: '+63', flag: '🇵🇭', name: 'Philippines', length: 10 },
  { code: '+66', flag: '🇹🇭', name: 'Thailand', length: 9 },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam', length: 9 },
  { code: '+86', flag: '🇨🇳', name: 'China', length: 11 },
  { code: '+81', flag: '🇯🇵', name: 'Japan', length: 10 },
  { code: '+82', flag: '🇰🇷', name: 'South Korea', length: 10 },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong', length: 8 },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan', length: 9 },
  { code: '+33', flag: '🇫🇷', name: 'France', length: 9 },
  { code: '+49', flag: '🇩🇪', name: 'Germany', length: 11 },
  { code: '+39', flag: '🇮🇹', name: 'Italy', length: 10 },
  { code: '+34', flag: '🇪🇸', name: 'Spain', length: 9 },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands', length: 9 },
  { code: '+32', flag: '🇧🇪', name: 'Belgium', length: 9 },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland', length: 9 },
  { code: '+46', flag: '🇸🇪', name: 'Sweden', length: 9 },
  { code: '+47', flag: '🇳🇴', name: 'Norway', length: 8 },
  { code: '+45', flag: '🇩🇰', name: 'Denmark', length: 8 },
  { code: '+353', flag: '🇮🇪', name: 'Ireland', length: 9 },
  { code: '+55', flag: '🇧🇷', name: 'Brazil', length: 11 },
  { code: '+52', flag: '🇲🇽', name: 'Mexico', length: 10 },
  { code: '+54', flag: '🇦🇷', name: 'Argentina', length: 10 },
  { code: '+27', flag: '🇿🇦', name: 'South Africa', length: 9 },
  { code: '+90', flag: '🇹🇷', name: 'Turkey', length: 10 },
  { code: '+972', flag: '🇮🇱', name: 'Israel', length: 9 },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand', length: 9 },
  { code: '+7', flag: '🇷🇺', name: 'Russia', length: 10 }
];

/**
 * Validates country-specific phone digit lengths
 * @param {string} val - Phone number digits
 * @param {string} countryCode - Country dialing prefix (e.g. +91)
 * @returns {string|true} - Error message or true if valid
 */
export const validatePhoneDigits = (val, countryCode) => {
  if (!val) return 'Phone number digits are required';
  const clean = val.replace(/[^\d]/g, '');
  
  const matchedCountry = countryCodes.find(c => c.code === countryCode);
  if (matchedCountry) {
    if (clean.length !== matchedCountry.length) {
      return `${matchedCountry.name} phone number must be exactly ${matchedCountry.length} digits`;
    }
  } else {
    if (clean.length < 7 || clean.length > 12) {
      return 'Phone number must be between 7 and 12 digits';
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
