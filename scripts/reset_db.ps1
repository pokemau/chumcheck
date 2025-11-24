# pwsh ./scripts/reset_db.ps1

$DB_NAME = "chumcheck"
$DB_USER = "postgres"

psql -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS `"$DB_NAME`" WITH (FORCE);"

psql -U $DB_USER -d postgres -c "CREATE DATABASE `"$DB_NAME`";"

Write-Host "Database '$DB_NAME' has been dropped and recreated successfully."