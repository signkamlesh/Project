public without sharing class DemoApex {
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAllAccounts(String search,Integer records) {
      search='%'+search+'%';
        return [Select Id,Name from account where name like :search limit :records ];

    }
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAllAccountsByType(String search,Integer records) {
      search='%'+search+'%';
        return [Select Id,Name,Type,Industry,Phone from account where Type like :search limit :records ];

    }
    
    @AuraEnabled
    public static boolean saveImperativeAccount(String accountName,String Phone,String Type,String Industry,Id accountId){
     account acc = new account();
        acc.id=accountId;
        acc.Name=accountName;
        acc.Type=Type;
        acc.Industry=Industry;
        acc.Phone=Phone;
        update acc;
        
        return true;   
    }
}