-- Run this once in your MySQL database (request_management)
-- It adds created_at to requests table if it doesn't already exist

ALTER TABLE requests
ADD COLUMN IF NOT EXISTS created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
