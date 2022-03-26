/****** Object:  Table [dbo].[AttributeControlPoint]    Script Date: 26/03/2022 19:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AttributeControlPoint](
	[attributeId] [int] NOT NULL,
	[ControlPointId] [int] NOT NULL,
 CONSTRAINT [AttributeControlPoint_pkey] PRIMARY KEY CLUSTERED 
(
	[attributeId] ASC,
	[ControlPointId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ControlPoint]    Script Date: 26/03/2022 19:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ControlPoint](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[frequency] [int] NOT NULL,
	[image] [nvarchar](1000) NOT NULL,
	[tolerance] [nvarchar](1000) NULL,
	[type] [nvarchar](1000) NOT NULL,
 CONSTRAINT [ControlPoint_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Description]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Description](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[controlPointId] [int] NOT NULL,
	[language] [nvarchar](1000) NOT NULL,
	[description] [nvarchar](1000) NOT NULL,
 CONSTRAINT [Description_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemCategoryControlPoint]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemCategoryControlPoint](
	[ItemCategoryCode] [int] NOT NULL,
	[ControlPointId] [int] NOT NULL,
 CONSTRAINT [ItemCategoryControlPoint_pkey] PRIMARY KEY CLUSTERED 
(
	[ItemCategoryCode] ASC,
	[ControlPointId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Option]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Option](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[value] [nvarchar](1000) NOT NULL,
	[controlPointId] [int] NOT NULL,
 CONSTRAINT [Option_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[id] [nvarchar](1000) NOT NULL,
	[articleNo] [nvarchar](1000) NOT NULL,
	[location] [nvarchar](1000) NOT NULL,
 CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QAReport]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QAReport](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[status] [bit] NOT NULL,
	[itemId] [int] NOT NULL,
 CONSTRAINT [QAReport_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QAReportControlPoint]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QAReportControlPoint](
	[QAReportId] [int] NOT NULL,
	[ControlPointId] [int] NOT NULL,
 CONSTRAINT [QAReportControlPoint_pkey] PRIMARY KEY CLUSTERED 
(
	[QAReportId] ASC,
	[ControlPointId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SystemUser]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SystemUser](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](1000) NOT NULL,
	[role] [nvarchar](1000) NOT NULL,
 CONSTRAINT [SystemUser_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SystemUserQAReport]    Script Date: 26/03/2022 19:14:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SystemUserQAReport](
	[userId] [int] NOT NULL,
	[QAReportId] [int] NOT NULL,
 CONSTRAINT [SystemUserQAReport_pkey] PRIMARY KEY CLUSTERED 
(
	[userId] ASC,
	[QAReportId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AttributeControlPoint]  WITH CHECK ADD  CONSTRAINT [AttributeControlPoint_ControlPointId_fkey] FOREIGN KEY([ControlPointId])
REFERENCES [dbo].[ControlPoint] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[AttributeControlPoint] CHECK CONSTRAINT [AttributeControlPoint_ControlPointId_fkey]
GO
ALTER TABLE [dbo].[Description]  WITH CHECK ADD  CONSTRAINT [Description_controlPointId_fkey] FOREIGN KEY([controlPointId])
REFERENCES [dbo].[ControlPoint] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Description] CHECK CONSTRAINT [Description_controlPointId_fkey]
GO
ALTER TABLE [dbo].[ItemCategoryControlPoint]  WITH CHECK ADD  CONSTRAINT [ItemCategoryControlPoint_ControlPointId_fkey] FOREIGN KEY([ControlPointId])
REFERENCES [dbo].[ControlPoint] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ItemCategoryControlPoint] CHECK CONSTRAINT [ItemCategoryControlPoint_ControlPointId_fkey]
GO
ALTER TABLE [dbo].[Option]  WITH CHECK ADD  CONSTRAINT [Option_controlPointId_fkey] FOREIGN KEY([controlPointId])
REFERENCES [dbo].[ControlPoint] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Option] CHECK CONSTRAINT [Option_controlPointId_fkey]
GO
ALTER TABLE [dbo].[QAReportControlPoint]  WITH CHECK ADD  CONSTRAINT [QAReportControlPoint_ControlPointId_fkey] FOREIGN KEY([ControlPointId])
REFERENCES [dbo].[ControlPoint] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[QAReportControlPoint] CHECK CONSTRAINT [QAReportControlPoint_ControlPointId_fkey]
GO
ALTER TABLE [dbo].[QAReportControlPoint]  WITH CHECK ADD  CONSTRAINT [QAReportControlPoint_QAReportId_fkey] FOREIGN KEY([QAReportId])
REFERENCES [dbo].[QAReport] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[QAReportControlPoint] CHECK CONSTRAINT [QAReportControlPoint_QAReportId_fkey]
GO
ALTER TABLE [dbo].[SystemUserQAReport]  WITH CHECK ADD  CONSTRAINT [SystemUserQAReport_QAReportId_fkey] FOREIGN KEY([QAReportId])
REFERENCES [dbo].[QAReport] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[SystemUserQAReport] CHECK CONSTRAINT [SystemUserQAReport_QAReportId_fkey]
GO
ALTER TABLE [dbo].[SystemUserQAReport]  WITH CHECK ADD  CONSTRAINT [SystemUserQAReport_userId_fkey] FOREIGN KEY([userId])
REFERENCES [dbo].[SystemUser] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[SystemUserQAReport] CHECK CONSTRAINT [SystemUserQAReport_userId_fkey]
GO
USE [master]
GO
ALTER DATABASE [OurDatabase] SET  READ_WRITE 
GO
