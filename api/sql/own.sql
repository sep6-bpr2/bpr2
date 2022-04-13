DROP TABLE IF EXISTS [EnviormentDatabase].dbo.Measurement
CREATE TABLE [dbo].[AttributeControlPoint](
	[attributeId] [int] NOT NULL,
	[ControlPointId] [int] NOT NULL,
)

CREATE TABLE [dbo].[ControlPoint](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[frequency] [int] NOT NULL,
	[image] [nvarchar](1000) NOT NULL,
	[tolerance] [nvarchar](1000) NULL,
	[type] [nvarchar](1000) NOT NULL,
)

CREATE TABLE [dbo].[Description](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[controlPointId] [int] NOT NULL,
	[language] [nvarchar](1000) NOT NULL,
	[description] [nvarchar](1000) NOT NULL,
)

CREATE TABLE [dbo].[ItemCategoryControlPoint](
	[ItemCategoryCode] [int] NOT NULL,
	[ControlPointId] [int] NOT NULL,
)

CREATE TABLE [dbo].[Option](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[value] [nvarchar](1000) NOT NULL,
	[controlPointId] [int] NOT NULL,
)

CREATE TABLE [dbo].[Order](
	[id] IDENTITY(1,1) NOT NULL,
	[articleNo] [nvarchar](1000) NOT NULL,
	[location] [nvarchar](1000) NOT NULL,
)

CREATE TABLE [dbo].[QAReport](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[status] [bit] NOT NULL,
	[itemId] [int] NOT NULL,
)

CREATE TABLE [dbo].[QAReportControlPoint](
	[QAReportId] [int] NOT NULL,
	[ControlPointId] [int] NOT NULL,
)

CREATE TABLE [dbo].[SystemUser](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](1000) NOT NULL,
	[role] [nvarchar](1000) NOT NULL,
)

CREATE TABLE [dbo].[SystemUserQAReport](
	[userId] [int] NOT NULL,
	[QAReportId] [int] NOT NULL,
)

CREATE TABLE [dbo].[Production Order](
	[No_] [int] IDENTITY(1,1) NULL,
	[Source No_] [int] NOT NULL,
	[Location Code] [nvarchar](1000) NOT NULL,
)