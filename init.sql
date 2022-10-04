CREATE SCHEMA workout;
CREATE USER service_user LOGIN PASSWORD 'password';
 GRANT ALL ON SCHEMA workout TO service_user;    
 END;
