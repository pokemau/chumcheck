#!/bin/bash


drop database chumcheck with (force);
create database chumcheck;
psql -U postgres -d chumcheck -f chumcheck_2025-03-04_025337.sql
