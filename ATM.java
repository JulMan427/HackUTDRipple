import java.util.HashMap;

class Account {
    private String accountNumber;
    private String pin;
    private double balance;

    //Constructor for Account
    public Account(String accountNumber, String pin, double balance) {
        this.accountNumber = accountNumber;
        this.pin = pin;
        this.balance = balance;
    }

    //Methods to return account variables
    public String getAccountNumber() {
        return accountNumber;
    }

    public String getPin() {
        return pin;
    }

    public double getBalance() {
        return balance;
    }

    // Deposit money
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Deposit amount must be positive.");
        }
    }

    // Withdraw money
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else if (amount > balance) {
            System.out.println("Insufficient funds.");
        } else {
            System.out.println("Withdrawal amount must be positive.");
        }
    }
    
    // Transfer money to another account
    public boolean transfer(Account toAccount, double amount) {
        if(amount<0){
            System.out.println("Transfered amount must be positive.");
            return false;
        }else if(amount>10000){
            System.out.println("Transfer amount over tranfer limit.");
            return false;
        } else if(amount> this.balance){
            System.out.println("Insuffecient funds in account.");
            return false;
        } else{
            balance -= amount;
            toAccount.deposit(amount);
            System.out.println("Transferred: $" + amount + " to account " + toAccount.getAccountNumber());
            return true;
        }
    }
}

public class ATM {
    private HashMap<String, Account> accountDatabase;
    private Account loggedInAccount;

    // Constructor for ATM, initializes the account database
    public ATM() {
        accountDatabase = new HashMap<>();
    }

    //Method for admin or staff adding a new account to the database
    public boolean addAccount(String accountNumber, String pin){
        boolean allNums = true;
        boolean pinNums = true;
        for(int i = 0; i<accountNumber.length(); i++){
            if (!Character.isDigit(accountNumber.charAt(i))) {
                allNums=false;
            }
        }
        for(int i = 0; i<pin.length(); i++){
            if (!Character.isDigit(pin.charAt(i))) {
                pinNums=false;
            }
        }
        if(accountNumber.length()<8 || accountNumber.length()>17 || allNums == false){
            System.out.println("Invalid account number.");
            return false;
        }else if(pin.length() != 4 || pinNums==false){
            System.out.println("Invalid PIN created.");
            return false;
        }else{
            accountDatabase.put(accountNumber, new Account(accountNumber, pin, 0));
            return true;
        }
    }

    //Method for admin or staff to manualy load balance into a user's account
    public boolean adminAddBalance(String accountNumber, double balance){
        Account account = accountDatabase.get(accountNumber);
        if (account != null) {
            account.deposit(balance);
            System.out.println("Balance succesfully added to account.");
            return true;
        } else {
            System.out.println("Invalid account number or PIN.");
            return false;
        }
    }

    // Method to login to an account
    public boolean login(String accountNumber, String pin) {
        Account account = accountDatabase.get(accountNumber);
        if (account != null && account.getPin().equals(pin)) {
            loggedInAccount = account;
            System.out.println("Login successful.");
            return true;
        } else {
            System.out.println("Invalid account number or PIN.");
            return false;
        }
    }

    // Logout from the current account
    public void logout() {
        loggedInAccount = null;
        System.out.println("Logged out.");
    }

    // Check balance of the logged-in user
    public void checkBalance() {
        if (loggedInAccount != null) {
            System.out.println("Current Balance: $" + loggedInAccount.getBalance());
        } else {
            System.out.println("You must log in first.");
        }
    }

    // Deposit money into the logged-in user's account
    public void deposit(double amount) {
        if (loggedInAccount != null) {
            loggedInAccount.deposit(amount);
        } else {
            System.out.println("You must log in first.");
        }
    }

    // Withdraw money from the logged-in user's account
    public void withdraw(double amount) {
        if (loggedInAccount != null) {
            loggedInAccount.withdraw(amount);
        } else {
            System.out.println("You must log in first.");
        }
    }

    // Transfer money from the logged-in user's account to another account
    public void transfer(String toAccountNumber, double amount) {
        if (loggedInAccount != null) {
            if(toAccountNumber.length()>=8&&toAccountNumber.length()<=17){
                boolean allNums=true;
                for (int i = 0; i < toAccountNumber.length(); i++) {
                    if (!Character.isDigit(toAccountNumber.charAt(i))) {
                        allNums=false;
                    }
                }
                if(allNums){
                    Account toAccount = accountDatabase.get(toAccountNumber);
                    if (toAccount != null) {
                        loggedInAccount.transfer(toAccount, amount);
                    } else {
                        System.out.println("Invalid target account number.");
                    }
                } else{
                    System.out.println("Invalid Transfer Account Number");
                }
            }else{
                System.out.println("Invalid Transfer Account Number");
            }
        } else {
            System.out.println("You must log in first.");
        }
    }


    // Main method to run the ATM system
    public static void main(String[] args) {
        ATM atm = new ATM();

        //Create the account that will have money transfered to it
        atm.addAccount("3400867568", "0387");
        atm.adminAddBalance("3400867568", 200);

        //Create the account that will transfer the money
        atm.addAccount("123456789", "1234");
        atm.adminAddBalance("123456789", 800);

        //Log into account that will transfer money
        atm.login("123456789", "1234");
        //Check currentbalance
        atm.checkBalance();

        //Test case where transfer number is a negative amount
        atm.transfer("3400867568", -50);

        //Test case where transfer number is greater than current user balance
        atm.transfer("3400867568", 900);

        //Test case where transfer number is over daily transfer limit
        atm.transfer("3400867568", 10001);

        //Test case where inputted account number is not between 8 and 17 digits
        atm.transfer( "10984", 500);

        //Test case where inputted account number contains characters other than numbers
        atm.transfer("abcd", 500);

        //Succesful transfer test case
        atm.transfer("3400867568", 500);
        //Check new balance
        atm.checkBalance();
        //logout of current user
        atm.logout();

        //Log into account that previous user transfered to
        atm.login("3400867568", "0387");
        //Check new balance
        atm.checkBalance();

    }
}