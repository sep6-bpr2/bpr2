CREATE TABLE "KonfAir DRIFT$Item" (
    "No_" nvarchar(40),
    "Description" nvarchar(100),
    "Description 2" nvarchar(100),
    "Item Category Code" nvarchar(40)

);

CREATE TABLE "KonfAir DRIFT$Item Attribute Value Mapping" (
    "timestamp" TIMESTAMP,
    "Table ID" INT,
    "No_" nvarchar(40),
    "Item Attribute Value ID" INT,
    "Item Attribute ID" INT
);

CREATE TABLE "KonfAir DRIFT$Item Attribute" (
    "timestamp" TIMESTAMP,
    "ID" INT,
    "Name" nvarchar(500),
    "Blocked" TINYINT,
    "Type" INT,
    "Unit of Measure" nvarchar(60)
);

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