__JaySvcUtil__ is a command line tool that downloads an __OData__ service definition ($metadata) and creates a full featured [JayData](http://jaydata.org) / JavaScript client environment by generating the necessary boilerplate code for you. All you need to do is to include the generated context file and you can start using the OData service with the high level, JavaScript optimized JayData API that supports JavaScript Language Query (JSLQ) and crud operations.

If you are a data API developer you can distribute the generated context and let your users handle data with a manner.

As an example we will use the [Northwind database made available online](http://services.odata.org/V4/Northwind/Northwind.svc) for testing purposes by Microsoft.

## Install JaySvcUtil

```$ npm install -g jaysvcutil```

## Using JaySvcUtil

```$ jaysvcutil –-metadataUri http://services.odata.org/V4/Northwind/Northwind.svc --out northwind.js```

## JaySvcUtil command line parameters

```
Usage: jaysvcutil --metadataUri <OData server url>

Options:
  -m, --metadataUri          The URI of the OData $metadata definition. Can be
                             an online resource or a local file as well.
  -o, --out                  The name of the generated output file. Default is
                             JayDataContext.js.
  -t, --dts                  The name of the generated TypeScript definition
                             file. Default is JayDataContext.d.ts.
  -n, --namespace            The namespace of the generated JayData
                             EntityContext class. Default is taken from the
                             metadata.
  -c, --contextBaseClass     The name of the base class for the generated
                             entity context. Default is $data.EntityContext.
  -e, --entityBaseClass      The name of the base class for the generated
                             entity types. Default is $data.Entity.
  -s, --entitySetBaseClass   The name of the base class for the generated
                             entity sets. Default is $data.EntitySet.
  -a, --collectionBaseClass  The name of the base class for the generated
                             entity sets. Default is Array.
  -b, --autoCreateContext    Create an instance of the context with default
                             parameters. Default is false.
  -x, --contextInstanceName  The name of the automatically generated context
                             instance under the context namespace. Default is
                             "context".
  -u, --userName             The network username for an authenticated OData
                             service.
  -p, --password             The network password for an authenticated OData
                             service.
  -h, --help                 Dispaly this help screen.
```

### More info

Visit [JayData.org](http://jaydata.org).  
You can download JayData from npm with ```npm install jaydata```.
