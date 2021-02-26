export class ProcessCodePathResolver{
    public resolverMap : Map<string,string> = new Map<string, string>([
        ["TANULO_CSOPORTJANAK_MODOSITASA_KERELEMRE", "tanulo-valasztas"]
    ]);

    public getNextPage(processCode : string) : string{
        const targetPath = this.resolverMap.get(processCode);
        if(targetPath){
            return targetPath;
        }else{
            return processCode;
        }
    }
}
