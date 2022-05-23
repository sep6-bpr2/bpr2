BEGIN TRANSACTION
    DECLARE @FreqID int;
    INSERT INTO [dbo].[Frequency] VALUES 
    (@frequencyNumber, @val0,@val1,@val2,@val3,@val4,@val5,@val6,@val7,@val8,@val9,@val10,@val11,@val12GETDATE(), );
    SELECT @FreqID = scope_identity();
    INSERT INTO ControlPoint
    (frequencyId, controlPointNumber, image, upperTolerance, lowerTolerance, inputType, measurementType, validFrom)
    VALUES (@FreqID, @controlPointNumber, @image, @upperTolerance, @lowerTolerance, @type, @measurementType, GETDATE() );

    INSERT INTO Description VALUES (@controlPointNumber,'english', @engDescription, GETDATE())
    INSERT INTO Description VALUES (@controlPointNumber,'danish', @dkDescription, GETDATE())
    INSERT INTO Description VALUES (@controlPointNumber,'lithuanian', @ltDescription, GETDATE())
    INSERT INTO ItemCategoryControlPoint VALUES (@code0, @controlPointNumber, GETDATE())  
COMMIT