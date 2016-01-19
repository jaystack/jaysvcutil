declare module "jaydata-dynamic-metadata"{
	export class DynamicMetadata{
		constructor($data:any);
		service(serviceUri:any, config?:any, callback?:any);
		initService(serviceUri:any, config?:any, callback?:any);
	}
	export class MetadataHandler{
		constructor($data:any, options:any);
		parse(text:string):any;
	}
}
