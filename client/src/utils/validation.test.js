// Test file for validation functions
import { validatePhoneNumber, validateEmail, formatPhoneNumber } from './validation';

// Test phone number validation
console.log('=== Phone Number Validation Tests ===');

// Valid phone numbers
console.log('Valid Indian number (+91 98765 43210):', validatePhoneNumber('+91 98765 43210'));
console.log('Valid US number (+1 555 123 4567):', validatePhoneNumber('+1 555 123 4567'));
console.log('Valid local number (9876543210):', validatePhoneNumber('9876543210'));
console.log('Valid local number (555-123-4567):', validatePhoneNumber('555-123-4567'));

// Invalid phone numbers
console.log('Invalid number (too short):', validatePhoneNumber('123'));
console.log('Invalid number (too long):', validatePhoneNumber('+91 98765 43210 12345'));
console.log('Invalid number (no digits):', validatePhoneNumber('abc'));
console.log('Invalid number (wrong format):', validatePhoneNumber('++91 98765 43210'));

console.log('\n=== Email Validation Tests ===');

// Valid emails
console.log('Valid email (test@example.com):', validateEmail('test@example.com'));
console.log('Valid email (user.name+tag@domain.co.uk):', validateEmail('user.name+tag@domain.co.uk'));
console.log('Valid email (test123@test-domain.org):', validateEmail('test123@test-domain.org'));

// Invalid emails
console.log('Invalid email (no @):', validateEmail('testexample.com'));
console.log('Invalid email (no domain):', validateEmail('test@'));
console.log('Invalid email (double dots):', validateEmail('test..test@example.com'));
console.log('Invalid email (double dashes):', validateEmail('test--test@example.com'));
console.log('Invalid email (double underscores):', validateEmail('test__test@example.com'));

console.log('\n=== Phone Number Formatting Tests ===');

// Format phone numbers
console.log('Format Indian number:', formatPhoneNumber('+919876543210'));
console.log('Format US number:', formatPhoneNumber('5551234567'));
console.log('Format international number:', formatPhoneNumber('+44123456789'));
