DROP TABLE IF EXISTS [dbo].[AttributeControlPoint];
CREATE TABLE [dbo].[AttributeControlPoint](
    [attributeId] int NOT NULL,
    [controlPointId] int NOT NULL,
    [minValue] float,
    [maxValue] float,
    [validFrom] DATETIME,
    [validTo] DATETIME,
);

DROP TABLE IF EXISTS [dbo].[ControlPoint];
CREATE TABLE [dbo].[ControlPoint](
    [id] int IDENTITY(1, 1),
    [frequencyid] int,
    [controlPointNumber] int,
    [image] nvarchar(MAX),
    [upperTolerance] float,
    [lowerTolerance] float,
    [inputType] int,
    [measurementType] int,
    [validFrom] DATETIME,
    [validTo] DATETIME,
);

DROP TABLE IF EXISTS [dbo].[Description];
CREATE TABLE [dbo].[Description](
    [id] int IDENTITY(1, 1),
    [controlPointId] int,
    [language] nvarchar(1000),
    [description] nvarchar(1000),
    [validFrom] DATETIME,
    [validTo] DATETIME,
);

DROP TABLE IF EXISTS [dbo].[ItemCategoryControlPoint];
CREATE TABLE [dbo].[ItemCategoryControlPoint](
    [itemCategoryCode] int,
    [controlPointId] int,
    [validFrom] DATETIME,
    [validTo] DATETIME,
);

DROP TABLE IF EXISTS [dbo].[Option];
CREATE TABLE [dbo].[Option](
    [id] int IDENTITY(1, 1),
    [controlPointId] int,
    [value] nvarchar(1000),
    [validFrom] DATETIME,
    [validTo] DATETIME,
);

DROP TABLE IF EXISTS [dbo].[QAReport];
CREATE TABLE [dbo].[QAReport](
    [id] int IDENTITY(1, 1),
    [itemId] int,
    [status] bit,
    [completionDate] DATETIME,
    [createdDate] DATETIME,
);

DROP TABLE IF EXISTS [dbo].[QAReportControlPointValue];
CREATE TABLE [dbo].[QAReportControlPointValue](
    [id] int IDENTITY(1, 1),
    [qaReportId] int,
    [controlPointId] int,
    [author] nvarchar(50),
    [value] nvarchar(50)
);

DROP TABLE IF EXISTS [dbo].[SystemUser];
CREATE TABLE [dbo].[SystemUser](
    [id] int IDENTITY(1, 1),
    [username] nvarchar(50),
    [role] nvarchar(20),
    [validFrom] DATETIME,
    [validTo] DATETIME,
);

DROP TABLE IF EXISTS [dbo].[Frequency];
create table [dbo].[Frequency]
(
    [id]     int IDENTITY(1, 1),
    [frequencyNumber] int,
    [to25]   int,
    [to50]   int,
    [to100]  int,
    [to200]  int,
    [to300]  int,
    [to500]  int,
    [to700]  int,
    [to1000] int,
    [to1500] int,
    [to2000] int,
    [to3000] int,
    [to4000] int,
    [to5000] int,
    [validFrom] DATETIME,
    [validTo] DATETIME,
)

DROP TABLE IF EXISTS [dbo].[ItemCategoryFrequency];
create table [dbo].[ItemCategoryFrequency]
(
    id          int identity(1,1),
    code        nvarchar(1000),
    frequencyId int,
)


INSERT INTO [dbo].[SystemUser] (username, role, validFrom) VALUES ('admin', 'admin', GETDATE());
INSERT INTO [dbo].[SystemUser] (username, role, validFrom) VALUES ('worker', 'qa employee', GETDATE());


INSERT INTO [dbo].[ItemCategoryFrequency] (code, frequencyId) VALUES ('32110', 3);


INSERT INTO [dbo].[Frequency] (frequencyNumber, to25, to50, to100, to200, to300, to500, to700, to1000, to1500, to2000, to3000, to4000, to5000, validFrom) VALUES (1, 23, 2, 343, 5, 5, 6, 66, 7, 5, 76, 76, 766, 69, GETDATE());
INSERT INTO [dbo].[Frequency] (frequencyNumber, to25, to50, to100, to200, to300, to500, to700, to1000, to1500, to2000, to3000, to4000, to5000, validFrom) VALUES (2, 25, 5, 345, 7, 7, 8, 68, 9, 7, 78, 78, 768, 71, GETDATE());
INSERT INTO [dbo].[Frequency] (frequencyNumber, to25, to50, to100, to200, to300, to500, to700, to1000, to1500, to2000, to3000, to4000, to5000, validFrom) VALUES (3, 63, 2, 343, 3, 8, 6, 66, 7, 5, 76, 76, 766, 69, GETDATE());

-- INCOMPLETE ORDER
-- ONE TIME CONTROL POINTS
----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (1 ,GETDATE(), 1, 'File1652206892425298.png', 3, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 1, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (3, 1, null, null, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (1,'english', 'Descirption of the control point 1', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (1,'danish', 'Descirption of the control point 1', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (1,'lithuanian', 'Descirption of the control point 1', GETDATE())
----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (2 ,GETDATE(), 1, null, 3, 1, 1, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 2, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (4, 2, 300, 400, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (2,'english', 'This is a description 2', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (2,'danish', 'This is a description 2', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (2,'lithuanian', 'This is a description 2', GETDATE())
----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (3 ,GETDATE(), 1, 'File1652206892425298.png', 3, 6, 1, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 3, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (49, 3, 30, 50, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (3,'english', 'This is a description 3', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (3,'danish', 'This is a description 3', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (3,'lithuanian', 'This is a description 3', GETDATE())
----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (4 ,GETDATE(), 1, 'File1652206892425298.png', 1, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 4, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (51, 4, null, null, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (4,'english', 'This is a description 4', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (4,'danish', 'This is a description 4', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (4,'lithuanian', 'This is a description 4', GETDATE())

----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (5 ,GETDATE(), 1, 'File1652206892425298.png', 0, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 5, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (70, 5, null, null, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (5,'english', 'This is a description 5', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (5,'danish', 'This is a description 5', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (5,'lithuanian', 'This is a description 5', GETDATE())

insert into [Option] (controlPointId, value, validFrom) values (5, 'Yes', GETDATE())
insert into [Option] (controlPointId, value, validFrom) values (5, 'No', GETDATE())

----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (6 ,GETDATE(), 1, 'File1652206892425298.png', 0, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 6, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (104, 6, null, null, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (6,'english', 'This is a description 6', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (6,'danish', 'This is a description 6', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (6,'lithuanian', 'This is a description 6', GETDATE())

insert into [Option] (controlPointId, value, validFrom) values (6, 'Yes', GETDATE())
insert into [Option] (controlPointId, value, validFrom) values (6, 'No', GETDATE())

----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (7 ,GETDATE(), 1, 'File1652206892425298.png', 0, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 7, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (109, 7, null, null, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (7,'english', 'This is a description 7', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (7,'danish', 'This is a description 7', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (7,'lithuanian', 'This is a description 7', GETDATE())

insert into [Option] (controlPointId, value, validFrom) values (7, 'Yes', GETDATE())
insert into [Option] (controlPointId, value, validFrom) values (7, 'No', GETDATE())



-- MULTIPLE TIME CONTROL POINTS
----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (8 ,GETDATE(), null, 'File1652206892425298.png', 3, 6, 1, 0)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 8, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (110, 8, 300, 400, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (8,'english', 'This is a description 8', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (8,'danish', 'This is a description 8', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (8,'lithuanian', 'This is a description 8', GETDATE())
----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (9 ,GETDATE(), 1, 'File1652206892425298.png', 1, null, null, 0)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 9, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (111, 9, null, null, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (9,'english', 'This is a description 9', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (9,'danish', 'This is a description 9', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (9,'lithuanian', 'This is a description 9', GETDATE())
----------------
insert into ControlPoint (controlPointNumber, validFrom, frequencyid, image, inputType, upperTolerance, lowerTolerance, measurementType) values (10 ,GETDATE(), 2, 'File1652206892425298.png', 0, null, null, 0)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom) values (32110, 10, GETDATE())
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom) values (112, 10, null, null, GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (10,'english', 'This is a description 10', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (10,'danish', 'This is a description 10', GETDATE())
insert into [Description] (controlPointId, language, description, validFrom) values (10,'lithuanian', 'This is a description 10', GETDATE())

insert into [Option] (controlPointId, value, validFrom) values (10, 'Yes', GETDATE())
insert into [Option] (controlPointId, value, validFrom) values (10, 'No', GETDATE())


--- Completed order 
INSERT INTO QAReport (itemId, status, completionDate) VALUES (1111, 1, GETDATE())

INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 1, '32323', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'No', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'No', 'worker');

