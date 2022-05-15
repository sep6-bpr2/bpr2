DROP TABLE IF EXISTS [dbo].[AttributeControlPoint];
CREATE TABLE [dbo].[AttributeControlPoint](
    [attributeId] int NOT NULL,
    [controlPointId] int NOT NULL,
    [minValue] float,
    [maxValue] float,
);

DROP TABLE IF EXISTS [dbo].[ControlPoint];
CREATE TABLE [dbo].[ControlPoint](
    [id] int IDENTITY(1, 1),
    [frequencyid] int, -- difference
    [image] nvarchar(MAX),-- difference
    [upperTolerance] float,
    [lowerTolerance] float,
    [type] int,
    [controlPointType] int-- difference
);

DROP TABLE IF EXISTS [dbo].[Description];
CREATE TABLE [dbo].[Description](
    [id] int IDENTITY(1, 1),
    [controlPointId] int,
    [language] nvarchar(1000),
    [description] nvarchar(1000),
);

DROP TABLE IF EXISTS [dbo].[ItemCategoryControlPoint];
CREATE TABLE [dbo].[ItemCategoryControlPoint](
    [itemCategoryCode] int, -- difference
    [controlPointId] int,
);

DROP TABLE IF EXISTS [dbo].[Option];
CREATE TABLE [dbo].[Option](
    [id] int IDENTITY(1, 1),
    [controlPointId] int,
    [value] nvarchar(1000),
);

DROP TABLE IF EXISTS [dbo].[QAReport];
CREATE TABLE [dbo].[QAReport](
    [id] int IDENTITY(1, 1),
    [itemId] int,
    [status] bit,
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
);

INSERT INTO [dbo].[SystemUser] VALUES ('admin', 'admin');
INSERT INTO [dbo].[SystemUser] VALUES ('worker', 'qa employee');

DROP TABLE IF EXISTS [dbo].[SystemUserQAReport];


DROP TABLE IF EXISTS [dbo].[Frequency];
create table [dbo].[Frequency]
(
    [id]     int IDENTITY(1, 1),
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
    [to5000] int
)

DROP TABLE IF EXISTS [dbo].[ItemCategoryFrequency];
create table [dbo].[ItemCategoryFrequency]
(
    id          int identity(1,1),
    code        nvarchar(1000),
    frequencyid int
)

INSERT INTO [dbo].[Frequency] (to25, to50, to100, to200, to300, to500, to700, to1000, to1500, to2000, to3000, to4000, to5000) VALUES (23, 2, 343, 5, 5, 6, 66, 7, 5, 76, 76, 766, 69);
INSERT INTO [dbo].[Frequency] (to25, to50, to100, to200, to300, to500, to700, to1000, to1500, to2000, to3000, to4000, to5000) VALUES (25, 5, 345, 7, 7, 8, 68, 9, 7, 78, 78, 768, 71);

-- INCOMPLETE ORDER
-- ONE TIME CONTROL POINTS
----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 3, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 1)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (3, 1, null, null)
insert into [Description] (controlPointId, language, description) values (1,'gb', 'This is a description')

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 3, 1, 1, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 2)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (4, 2, 300, 400)
insert into [Description] (controlPointId, language, description) values (2,'gb', 'This is a description')

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 3, 6, 1, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 3)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (49, 3, 30, 50)
insert into [Description] (controlPointId, language, description) values (3,'gb', 'This is a description')

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 1, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 4)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (51, 4, null, null)
insert into [Description] (controlPointId, language, description) values (4,'gb', 'This is a description')


----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 0, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 5)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (70, 5, null, null)
insert into [Description] (controlPointId, language, description) values (5,'gb', 'This is a description')

insert into [Option] (controlPointId, value) values (5, 'Yes')
insert into [Option] (controlPointId, value) values (5, 'No')

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 0, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 6)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (104, 6, null, null)
insert into [Description] (controlPointId, language, description) values (6,'gb', 'This is a description')

insert into [Option] (controlPointId, value) values (6, 'Yes')
insert into [Option] (controlPointId, value) values (6, 'No')

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 0, null, null, 1)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 7)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (109, 7, null, null)
insert into [Description] (controlPointId, language, description) values (7,'gb', 'This is a description')

insert into [Option] (controlPointId, value) values (7, 'Yes')
insert into [Option] (controlPointId, value) values (7, 'No')



-- MULTIPLE TIME CONTROL POINTS
----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 3, 6, 1, 0)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 8)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (110, 8, 300, 400)
insert into [Description] (controlPointId, language, description) values (8,'gb', 'This is a description')

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (1, 'File1652206892425298.png', 1, null, null, 0)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 9)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (111, 9, null, null)
insert into [Description] (controlPointId, language, description) values (9,'gb', 'This is a description')

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance, controlPointType) values (2, 'File1652206892425298.png', 0, null, null, 0)

insert into ItemCategoryControlPoint (itemCategoryCode, controlPointId) values (32110, 10)
insert into AttributeControlPoint (attributeId, controlPointId, minValue, maxValue) values (112, 10, null, null)
insert into [Description] (controlPointId, language, description) values (10,'gb', 'This is a description')

insert into [Option] (controlPointId, value) values (10, 'Yes')
insert into [Option] (controlPointId, value) values (10, 'No')


--- Completed order 
INSERT INTO QAReport (itemId, status) VALUES (1111, 0)

INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 1, '32323', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'Yes', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'No', 'worker');
INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(1, 10, 'No', 'worker');