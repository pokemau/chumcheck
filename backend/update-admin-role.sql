-- Run this SQL to update the admin user role to Manager
-- This will allow login to the admin panel

UPDATE users
SET role = 'Manager'
WHERE email = 'admin@chumcheck.com';

-- Verify the update
SELECT id, email, role, "firstName", "lastName"
FROM users
WHERE email = 'admin@chumcheck.com';
