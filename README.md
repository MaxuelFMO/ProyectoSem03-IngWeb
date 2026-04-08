# Entregable de Semana 3 - desarrollo de crud
El sistema se tiene una carpeta DB la cual contiene el codigo de sql `venta_db.sql` para la creacion de la db con su tabla 

```sql
CREATE DATABASE ventas_db;
USE ventas_db;
CREATE TABLE ventas (
 id INT AUTO_INCREMENT PRIMARY KEY,
 cliente VARCHAR(100),
 producto VARCHAR(100),
 cantidad INT,
 precio DECIMAL(10,2),
 total DECIMAL(10,2)
);
```
