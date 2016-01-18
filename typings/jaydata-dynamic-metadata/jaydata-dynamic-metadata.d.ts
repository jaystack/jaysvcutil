declare module "jaydata-dynamic-metadata"{
	export class DynamicMetadata{
		constructor($data:any);
		service(serviceUri:any, config?:any, callback?:any);
		initService(serviceUri:any, config?:any, callback?:any);
	}
}
