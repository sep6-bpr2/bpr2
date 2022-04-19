
DROP TABLE IF EXISTS "KonfAir DRIFT$Item Attribute Value Mapping"
CREATE TABLE "KonfAir DRIFT$Item Attribute Value Mapping" (
    "timestamp" TIMESTAMP,
    "Table ID" INT,
    "No_" nvarchar(40),
    "Item Attribute Value ID" INT,
    "Item Attribute ID" INT
);

INSERT INTO "KonfAir DRIFT$Item Attribute Value Mapping" VALUES (null, '27', '47827', '8301', '3');
INSERT INTO "KonfAir DRIFT$Item Attribute Value Mapping" VALUES (null, '27', '47827', '9249', '4');
INSERT INTO "KonfAir DRIFT$Item Attribute Value Mapping" VALUES (null, '27', '47827', '11965', '49');
INSERT INTO "KonfAir DRIFT$Item Attribute Value Mapping" VALUES (null, '27', '47827', '10268', '51');
INSERT INTO "KonfAir DRIFT$Item Attribute Value Mapping" VALUES (null, '27', '47827', '10906', '70');
INSERT INTO "KonfAir DRIFT$Item Attribute Value Mapping" VALUES (null, '27', '47827', '11657', '104');
INSERT INTO "KonfAir DRIFT$Item Attribute Value Mapping" VALUES (null, '27', '47827', '11672', '109');

DROP TABLE IF EXISTS "KonfAir DRIFT$Item Attribute"
CREATE TABLE "KonfAir DRIFT$Item Attribute" (
    "timestamp" TIMESTAMP,
    "ID" INT,
    "Name" nvarchar(500),
    "Blocked" TINYINT,
    "Type" nvarchar(40),
    "Unit of Measure" nvarchar(60)
);

INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 3, 'Højde', null, 'Decimal', 'mm');
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 4, 'Bredde', null, 'Decimal', 'mm');
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 49, 'Dybde', null, 'Decimal', 'mm');
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 51, 'ISO 16890', null, 'Option', null);
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 70, 'Webshop', null, 'Option', null);
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 104, 'Paneltype', null, 'Option', null);
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 109, 'Ramme (panelfilter)', null, 'Option', null);

INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 1, 'height mm', null, '1', 'mm');
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 2, 'height cm', null, '1', 'cm');
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 5, 'color', null, '2', 'text');
INSERT INTO "KonfAir DRIFT$Item Attribute" VALUES (null, 6, 'label', null, '3', 'option');


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

INSERT INTO "KonfAir DRIFT$Item Atrribute Value" VALUES (null, 3, 8301, '300.00', 300, 0, null, null);
INSERT INTO "KonfAir DRIFT$Item Atrribute Value" VALUES (null, 4, 9249, '390.00', 390, 0, null, null);
INSERT INTO "KonfAir DRIFT$Item Atrribute Value" VALUES (null, 49, 11965, '47', 47, 0, null, null);
INSERT INTO "KonfAir DRIFT$Item Atrribute Value" VALUES (null, 51, 10268, 'ISO ePM10 50%', 0, 0, null, null);
INSERT INTO "KonfAir DRIFT$Item Atrribute Value" VALUES (null, 70, 10906, 'Ja', 0, 0, null, null);
INSERT INTO "KonfAir DRIFT$Item Atrribute Value" VALUES (null, 104, 11657, 'Z-line', 0, 0, null, null);
INSERT INTO "KonfAir DRIFT$Item Atrribute Value" VALUES (null, 109, 11672, 'Fiber', 0, 0, null, null);

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
-- This is not a real one 
INSERT INTO "KonfAir DRIFT$Production Order" VALUES ('464646', '123456789', 'Denmark, Give', '2022-06-12 17:00:00', 240);


DROP TABLE IF EXISTS "KonfAir DRIFT$Item";
CREATE TABLE "KonfAir DRIFT$Item" (
    "No_" nvarchar(40),
    "Description" nvarchar(100),
    "Item Category Code" nvarchar(40)
);
-- This is not a real one 
INSERT INTO "KonfAir DRIFT$Item" VALUES ('123456789', 'This is the description of the item', '65487'); 

-- Real one
INSERT INTO "KonfAir DRIFT$Item" VALUES ('47827', 'Panelfilter 390x300x47', '32110');


