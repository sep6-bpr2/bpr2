# Bachelor project 2022 Spring (Rafal, Rokas, Simon)

The project was made for a real company that needed to digitalize their quality assurance proccess. The company used this project as the foundation for their production infrastructure. All the passwords and secrets in this repository are already expired.
<br/>
<br/>
To know more about the project look at documentation: <b>"Project_and_Process_Reports.pdf"</b>.<br/>




## Old readme 
To try it out 
add a docker container of mssql db
docker pull mcr.microsoft.com/mssql/server
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=konf123!proj" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04
