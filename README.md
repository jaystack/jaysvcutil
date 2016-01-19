__JaySvcUtil__ is a command line tool that downloads an __OData__ service definition ($metadata) and creates a full featured [JayData](http://jaydata.org) / JavaScript client environment by generating the necessary boilerplate code for you. All you need to do is to include the generated context file and you can start using the OData service with the high level, JavaScript optimized JayData API that supports JavaScript Language Query (JSLQ) and crud operations.

If you are a data API developer you can distribute the generated context and let your users handle data with a manner.

As an example we will use the [Northwind database made available online](http://services.odata.org/V4/Northwind/Northwind.svc) for testing purposes by Microsoft.

## Install JaySvcUtil

```$ npm install -g jaysvcutil```

## Using JaySvcUtil

```$ jaysvcutil –-metadataUri http://services.odata.org/V4/Northwind/Northwind.svc --out northwind.js```

## JaySvcUtil commandline parameters

| parameter | description | default value |
| :--------- | :----------- | :------------- |
| *--metadataUri, -m* | Required. The uri of the oData $metadata definition. Can be an online resource or a local file as well | |
| *--out, -o* | The name of the generated output file. | JayDataContext.js |
| *--namespace, -n* | The namespace of the generated JayData EntitContext class. | Taken from the service metadata. |
| *--contextBaseClass, -c* | The name of the base class for the generated entity context. | $data.EntityContext |
| *--entityBaseClass, -e* | The name of the base class for the generated entity types. | $data.Entity |
| *--entitySetBaseClass, -s* | The name of the base class for the generated entity sets. | $data.EntitySet |
| *--collectionBaseClass, -a* | The name of the base class for the generated entity sets. | Array |
| *--autoCreateContext, -b*  | Create an instance of the context with default parameters.	| false |
| *--contextInstanceName, -x* | The name of the automatically generated context instance under the context namespace. | context |
| *--help, -h* | Displays parameter options | |
| *--username, -u* | The username to authenticate with | |
| *--password, -p* | The account password | |	 

### More info

Visit [JayData.org](http://jaydata.org).  
You can download JayData from npm with ```npm install jaydata```.
