# Form Validation Features

This document describes the enhanced validation features implemented for the contact and live demo forms.

## Phone Number Validation

### Features
- **Numbers Only**: Only numeric characters are allowed as input
- **International Support**: Supports international phone numbers with country codes
- **Indian Numbers**: Specifically optimized for Indian phone numbers (+91 format)
- **Format Flexibility**: Accepts common phone number formats with spaces, dashes, and parentheses

### Validation Rules
- **Local Numbers**: 7-15 digits (e.g., 9876543210, 555-123-4567)
- **International Numbers**: 8-16 digits starting with + (e.g., +91 98765 43210, +1 555 123 4567)
- **Maximum Length**: 20 characters including formatting characters

### Allowed Characters
- Numbers (0-9)
- Plus sign (+) at the beginning for international numbers
- Spaces, dashes (-), parentheses ( ), for formatting
- All other characters are blocked during input

### Examples of Valid Numbers
- `+91 98765 43210` (Indian mobile)
- `+1 (555) 123-4567` (US format)
- `+44 20 7946 0958` (UK format)
- `9876543210` (Local Indian number)
- `555-123-4567` (US local format)

## Email Validation

### Features
- **Strict Format**: Ensures proper email structure
- **Invalid Pattern Detection**: Prevents common invalid email patterns
- **Domain Length Check**: Validates domain length limits
- **Real-time Validation**: Immediate feedback on input

### Validation Rules
- Must contain exactly one @ symbol
- Local part before @ must contain valid characters
- Domain after @ must be valid and have proper TLD
- Maximum domain length: 253 characters
- Prevents consecutive special characters (.., --, __)

### Examples of Valid Emails
- `user@example.com`
- `user.name+tag@domain.co.uk`
- `test123@test-domain.org`
- `admin@company-name.com`

### Examples of Invalid Emails
- `user..name@example.com` (consecutive dots)
- `user--name@example.com` (consecutive dashes)
- `user__name@example.com` (consecutive underscores)
- `user@` (missing domain)
- `@example.com` (missing local part)

## Implementation Details

### Frontend Validation
- Uses React Hook Form with custom validation functions
- Real-time input validation with immediate feedback
- Prevents invalid characters from being typed
- Consistent error messages across all forms

### Backend Validation
- Server-side validation using express-validator
- Custom validation functions for phone numbers
- Email validation using built-in isEmail() validator
- Consistent validation rules between frontend and backend

### Utility Functions
- `validatePhoneNumber()`: Validates phone number format and length
- `validateEmail()`: Validates email format with additional checks
- `preventNonPhoneChars()`: Prevents invalid characters during typing
- `formatPhoneNumber()`: Formats phone numbers for display

## Forms Updated

1. **Contact Form** (`/contact`)
   - Phone number validation
   - Enhanced email validation
   - Real-time input restrictions

2. **Live Demo Form** (`/live-demo`)
   - Phone number validation
   - Enhanced email validation
   - Real-time input restrictions

3. **Login Forms** (`/login`, `/admin/login`)
   - Enhanced email validation
   - Consistent validation across all forms

## Testing

Run the validation test file to verify functionality:
```bash
cd client/src/utils
node validation.test.js
```

## Future Enhancements

- Phone number formatting on blur
- Country code selection dropdown
- SMS verification for phone numbers
- Email verification system
- Custom validation error messages in multiple languages
