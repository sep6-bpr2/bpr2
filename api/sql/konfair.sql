
DROP TABLE IF EXISTS "KonfAir DRIFT$Item Attribute Value Mapping"
CREATE TABLE "KonfAir DRIFT$Item Attribute Value Mapping" (
    "timestamp" TIMESTAMP,
    "Table ID" INT,
    "No_" nvarchar(40),
    "Item Attribute Value ID" INT,
    "Item Attribute ID" INT
);

DROP TABLE IF EXISTS "KonfAir DRIFT$Item Attribute"
CREATE TABLE "KonfAir DRIFT$Item Attribute" (
    "timestamp" TIMESTAMP,
    "ID" INT,
    "Name" nvarchar(500),
    "Blocked" TINYINT,
    "Type" INT,
    "Unit of Measure" nvarchar(60)
);

DROP TABLE IF EXISTS "KonfAir DRIFT$Item Atrribute Value"
CREATE TABLE "KonfAir DRIFT$Item Atrribute Value" (
    "timestamp" TIMESTAMP,
    "Attribute ID" INT,
    "ID" INT,
    "Value" nvarchar(500),
    "Numeric Value" DECIMAL(17),
    "Blocked" TINYINT,
    "Datasheet_C" nvarchar(500),
    "Vendor Datasheet_C" nvarchar(500)
)

DROP TABLE IF EXISTS "KonfAir DRIFT$Item Category"
CREATE TABLE "KonfAir DRIFT$Item Category" (
    "timestamp" TIMESTAMP,
    "Code" nvarchar(40),
    "Parent Category" nvarchar(40),
    "Description" nvarchar(100),
    "Indentation" INT,
    "Presentation Order" INT,
    "Has Children" nvarchar(40),
    "Last Modified Date Time" nvarchar(40),
    "Id" nvarchar(40)
);

DROP TABLE IF EXISTS "KonfAir DRIFT$Production Order"
CREATE TABLE "KonfAir DRIFT$Production Order" (
    "No_" nvarchar(40),
    "Source No_" nvarchar(40),
    "Location Code" nvarchar(20),
    "Due Date" datetime,
    "Quantity" decimal(17)
);

DROP TABLE IF EXISTS "KonfAir DRIFT$Item";
CREATE TABLE "KonfAir DRIFT$Item" (
    "No_" nvarchar(40),
    "Description" nvarchar(100),
    "Item Category Code" nvarchar(40)
);


INSERT INTO "KonfAir DRIFT$Item" VALUES ('123456789', 'This is the description of the item', '65487'); 

INSERT INTO "KonfAir DRIFT$Production Order" VALUES ('464646', '123456789', 'Denmark, Give', '2022-06-12 17:00:00', 240);
