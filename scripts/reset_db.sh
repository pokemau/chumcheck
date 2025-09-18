#!/bin/bash

# Database name
DB_NAME="chumcheck"
DB_USER="postgres"

# Drop the database forcefully
psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS \"$DB_NAME\" WITH (FORCE);"

# Create the database again
psql -U "$DB_USER" -d postgres -c "CREATE DATABASE \"$DB_NAME\";"

echo "Database '$DB_NAME' has been dropped and recreated successfully."

