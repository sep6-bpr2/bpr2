DROP TABLE IF EXISTS [dbo].[AttributeControlPoint];
CREATE TABLE [dbo].[AttributeControlPoint](
    [attributeId] int,
    [ControlPointId] int,
    [minValue] float,
    [maxValue] float,
);

DROP TABLE IF EXISTS [dbo].[ControlPoint];
CREATE TABLE [dbo].[ControlPoint](
    [id] int IDENTITY(1, 1),
    [frequencyid] int,
    [image] varbinary,
    [upperTolerance] float,
    [lowerTolerance] float,
    [type] int,
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
    [ItemCategoryCode] int,
    [ControlPointId] int,
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

DROP TABLE IF EXISTS [dbo].[QAReportControlPoint];
CREATE TABLE [dbo].[QAReportControlPoint](
    [QAReportId] int,
    [ControlPointId] int,
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
CREATE TABLE [dbo].[SystemUserQAReport](
    [userId] int, 
    [QAReportId] int
);

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
    Code        nvarchar(1000),
    frequencyid int
)

INSERT INTO [dbo].[Frequency] (to25, to50, to100, to200, to300, to500, to700, to1000, to1500, to2000, to3000, to4000, to5000) VALUES (23, 2, 343, 5, 5, 6, 66, 7, 5, 76, 76, 766, 69);


----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance) values (1, null, 3, null, null)

insert into ItemCategoryControlPoint (ItemCategoryCode, ControlPointId) values (32110, 1)
insert into AttributeControlPoint (attributeId, ControlPointId, minValue, maxValue) values (3, 1, null, null)

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance) values (1, null, 3, null, null)

insert into ItemCategoryControlPoint (ItemCategoryCode, ControlPointId) values (32110, 2)
insert into AttributeControlPoint (attributeId, ControlPointId, minValue, maxValue) values (4, 2, 300, 400)

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance) values (1, null, 3, null, null)

insert into ItemCategoryControlPoint (ItemCategoryCode, ControlPointId) values (32110, 3)
insert into AttributeControlPoint (attributeId, ControlPointId, minValue, maxValue) values (49, 3, 30, 50)

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance) values (1, null, 1, null, null)

insert into ItemCategoryControlPoint (ItemCategoryCode, ControlPointId) values (32110, 4)
insert into AttributeControlPoint (attributeId, ControlPointId, minValue, maxValue) values (51, 4, null, null)


----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance) values (1, null, 0, null, null)

insert into ItemCategoryControlPoint (ItemCategoryCode, ControlPointId) values (32110, 5)
insert into AttributeControlPoint (attributeId, ControlPointId, minValue, maxValue) values (70, 5, null, null)


----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance) values (1, null, 0, null, null)

insert into ItemCategoryControlPoint (ItemCategoryCode, ControlPointId) values (32110, 6)
insert into AttributeControlPoint (attributeId, ControlPointId, minValue, maxValue) values (104, 6, null, null)

----------------
insert into ControlPoint (frequencyid, image, type, upperTolerance, lowerTolerance) values (1, null, 0, null, null)

insert into ItemCategoryControlPoint (ItemCategoryCode, ControlPointId) values (32110, 7)
insert into AttributeControlPoint (attributeId, ControlPointId, minValue, maxValue) values (109, 7, null, null)