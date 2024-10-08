
DROP TABLE IF EXISTS [KonfAir DRIFT$Item Attribute Value Mapping];
CREATE TABLE [KonfAir DRIFT$Item Attribute Value Mapping] (
    [timestamp] TIMESTAMP,
    [Table ID] INT,
    [No_] nvarchar(40),
    [Item Attribute Value ID] INT,
    [Item Attribute ID] INT
);

INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '8301', '3');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '9249', '4');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '11965', '49');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '10268', '51');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '10906', '70');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '11657', '104');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '11672', '109');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '12000', '110');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '12001', '111');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '47827', '12002', '112');

-- Completed
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '1111', '111111', '3');
INSERT INTO [KonfAir DRIFT$Item Attribute Value Mapping] ([Table ID], No_, [Item Attribute Value ID], [Item Attribute ID]) VALUES ('27', '1111', '2222222', '112');


DROP TABLE IF EXISTS [KonfAir DRIFT$Item Attribute];
CREATE TABLE [KonfAir DRIFT$Item Attribute] (
    [timestamp] TIMESTAMP,
    [ID] INT,
    [Name] nvarchar(500),
    [Blocked] TINYINT,
    [Type] INT,
    [Unit of Measure] nvarchar(60)
);

INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (3, 'Højde', null, 3, 'mm');
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (4, 'Bredde', null, 3, 'mm');
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (49, 'Dybde', null, 3, 'mm');
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (51, 'ISO 16890', null, 0, null);
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (70, 'Webshop', null, 0, null);
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (104, 'Paneltype', null, 0, null);
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (109, 'Ramme (panelfilter)', null, 0, null);
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (110, 'Number example', null, 3, 'mm');
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (111, 'Text example', null, 0, null);
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (112, 'Option example', null, 0, null);
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (1, 'height mm', null, 3, 'mm');
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (2, 'height cm', null, 3, 'cm');
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (5, 'color', null, 1, 'text');
INSERT INTO [KonfAir DRIFT$Item Attribute] (ID, Name, Blocked, Type, [Unit of Measure]) VALUES (6, 'label', null, 0, 0);

DROP TABLE IF EXISTS [KonfAir DRIFT$Item Attribute Value];
CREATE TABLE [KonfAir DRIFT$Item Attribute Value] (
    [timestamp] TIMESTAMP,
    [Attribute ID] INT,
    [ID] INT,
    [Value] nvarchar(500),
    [Numeric Value] DECIMAL(17),
    [Blocked] TINYINT,
    [Datasheet_C] nvarchar(500),
    [Vendor Datasheet_C] nvarchar(500)
)

INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (3, 8301, '300.00', 300, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (4, 9249, '390.00', 390, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (49, 11965, '47', 47, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (51, 10268, 'ISO ePM10 50%', 0, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (70, 10906, 'Ja', 0, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (104, 11657, 'Z-line', 0, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (109, 11672, 'Fiber', 0, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (110, 12000, '340.00', 340, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (111, 12001, 'ISO e', 0, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (112, 12002, 'Fiber glass', 0, 0, null, null);

-- For completed one
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (3, 111111, '301.00', 301, 0, null, null);
INSERT INTO [KonfAir DRIFT$Item Attribute Value] ([Attribute ID], ID, Value, [Numeric Value], Blocked, Datasheet_C, [Vendor Datasheet_C]) VALUES (112, 2222222, 'Fiber', 0, 0, null, null);

DROP TABLE IF EXISTS [KonfAir DRIFT$Item Category];
CREATE TABLE [KonfAir DRIFT$Item Category] (
    [timestamp] TIMESTAMP,
    [Code] nvarchar(40),
    [Parent Category] nvarchar(40),
    [Description] nvarchar(100),
    [Indentation] INT,
    [Presentation Order] INT,
    [Has Children] TINYINT,
    [Last Modified Date Time] datetime,
    [Id] INT
);

DROP TABLE IF EXISTS [KonfAir DRIFT$Production Order];
CREATE TABLE [KonfAir DRIFT$Production Order] (
    [No_] nvarchar(40),
    [Source No_] nvarchar(40),
    [Location Code] nvarchar(20),
    [Due Date] datetime,
    [Quantity] decimal(17),
    [status] int
);

INSERT INTO [KonfAir DRIFT$Production Order] (No_, [Source No_], [Location Code], [Due Date], Quantity, status) VALUES ('1', '234', 'DK', N'2022-05-03 20:38:59.000', 240, 3);
INSERT INTO [KonfAir DRIFT$Production Order] (No_, [Source No_], [Location Code], [Due Date], Quantity, status) VALUES ('2', '345', 'DK', N'2022-05-05 09:53:58.000', 56, 3);
INSERT INTO [KonfAir DRIFT$Production Order] (No_, [Source No_], [Location Code], [Due Date], Quantity, status) VALUES ('3', '239', 'LIT', N'2022-05-05 09:54:26.000', 2000, 3);
INSERT INTO [KonfAir DRIFT$Production Order] (No_, [Source No_], [Location Code], [Due Date], Quantity, status) VALUES ('4', '534', 'DK', N'2022-05-05 09:55:10.000', 98, 2);
INSERT INTO [KonfAir DRIFT$Production Order] (No_, [Source No_], [Location Code], [Due Date], Quantity, status) VALUES ('5', '16', N'DK', N'2022-05-09 22:31:05.000', 50, 3);


-- This is not a real one 
INSERT INTO [KonfAir DRIFT$Production Order] ([No_], [Source No_], [Location Code], [Due Date], [Quantity], [status]) VALUES ('464646', '123456789', 'DK', '2022-06-12 17:00:00', 240, 3);

-- Real one
INSERT INTO [KonfAir DRIFT$Production Order] ([No_], [Source No_], [Location Code], [Due Date], [Quantity], [status]) VALUES ('464646', '47827', 'DK', '2022-06-12 17:00:00', 240, 3);

-- Completed oneac
INSERT INTO [KonfAir DRIFT$Production Order] ([No_], [Source No_], [Location Code], [Due Date], [Quantity], [status]) VALUES ('464646', '1111', 'DK', '2022-06-12 17:00:00', 240, 3);
INSERT INTO [KonfAir DRIFT$Production Order] ([No_], [Source No_], [Location Code], [Due Date], [Quantity], [status]) VALUES ('464646', '65656', 'LIT', '2022-06-12 17:00:00', 240, 3);
INSERT INTO [KonfAir DRIFT$Item Category] (Code, [Parent Category], Description, Indentation, [Presentation Order], [Has Children], [Last Modified Date Time], Id) VALUES ('32110', null, null, null, null, null, null, null);
INSERT INTO [KonfAir DRIFT$Item Category] (Code, [Parent Category], Description, Indentation, [Presentation Order], [Has Children], [Last Modified Date Time], Id) VALUES ('204567', null, null, null, null, null, null, null);

DROP TABLE IF EXISTS [KonfAir DRIFT$Item];
CREATE TABLE [KonfAir DRIFT$Item] (
    [No_] nvarchar(40),
    [Description] nvarchar(100),
    [Item Category Code] nvarchar(40)
);
-- This is not a real one 
INSERT INTO [KonfAir DRIFT$Item] ([No_], [Description], [Item Category Code]) VALUES ('123456789', 'This is the description of the item', '65487'); 
-- Real one
INSERT INTO [KonfAir DRIFT$Item] ([No_], [Description], [Item Category Code]) VALUES ('47827', 'Panelfilter 390x300x47', '32110');
-- Completed one
INSERT INTO [KonfAir DRIFT$Item] ([No_], [Description], [Item Category Code]) VALUES ('1111', 'Filterfilter 390x300x47', '32110');

