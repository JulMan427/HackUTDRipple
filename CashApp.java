import java.util.HashMap;
import java.util.Scanner;

class Account {
    private String username;
    private String password;
    private String phoneNumber;
    private String email;
    private String bankAccountNumber;
    private String bankPin;
    private double bankBalance;
    private double appBalance;
    private HashMap<String, Account> friends;

    // Constructor for Account
    public Account(String username, String password, String phoneNumber, String email) {
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.bankAccountNumber = null;
        this.bankPin = null;
        this.bankBalance = 5000; // Default balance for linked bank accounts
        this.appBalance = 0;
        this.friends = new HashMap<>();
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public double getAppBalance() {
        return appBalance;
    }

    public double getBankBalance() {
        return bankBalance;
    }

    // Add a friend
    public void addFriend(Account friend) {
        if (!friends.containsKey(friend.getUsername())) {
            friends.put(friend.getUsername(), friend);
            System.out.println(friend.getUsername() + " added as a friend.");
        } else {
            System.out.println(friend.getUsername() + " is already your friend.");
        }
    }

    // Display friends
    public void displayFriends() {
        System.out.println("Your friends:");
        for (String friendUsername : friends.keySet()) {
            System.out.println("- " + friendUsername);
        }
    }

    // Link a bank account
    public void linkBankAccount(String bankAccountNumber, String bankPin) {
        this.bankAccountNumber = bankAccountNumber;
        this.bankPin = bankPin;
        System.out.println("Bank account linked successfully.");
    }

    // Transfer money from bank account to app balance
    public void transferFromBank(double amount) {
        if (amount > 0 && amount <= bankBalance) {
            bankBalance -= amount;
            appBalance += amount;
            System.out.println("Transferred $" + amount + " from bank account to app balance.");
        } else {
            System.out.println("Invalid amount or insufficient funds in the bank account.");
        }
    }

    // Transfer money to another user
    public void transferToUser(Account recipient, double amount) {
        if (amount > 0 && amount <= appBalance) {
            appBalance -= amount;
            recipient.appBalance += amount;
            System.out.println("Transferred $" + amount + " to " + recipient.getUsername() + ".");
        } else {
            System.out.println("Invalid amount or insufficient funds in app balance.");
        }
    }
}

public class CashApp {
    private HashMap<String, Account> accountsByUsername;
    private HashMap<String, Account> accountsByPhoneNumber;
    private HashMap<String, Account> accountsByEmail;
    private Account loggedInAccount;
    private Scanner scanner;

    // Constructor
    public CashApp() {
        accountsByUsername = new HashMap<>();
        accountsByPhoneNumber = new HashMap<>();
        accountsByEmail = new HashMap<>();
        scanner = new Scanner(System.in);
    }

    // Main menu
    public void start() {
        while (true) {
            System.out.println("\n--- Welcome to Cash App ---");
            System.out.println("1. Login");
            System.out.println("2. Create New Account");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    login();
                    break;
                case 2:
                    createAccount();
                    break;
                case 3:
                    System.out.println("Thank you for using Cash App!");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    // Login process
    private void login() {
        System.out.println("\n--- Login ---");
        System.out.print("Enter username, email, or phone number: ");
        String identifier = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        Account account = accountsByUsername.getOrDefault(identifier,
                accountsByPhoneNumber.getOrDefault(identifier, accountsByEmail.get(identifier)));

        if (account != null && account.getPassword().equals(password)) {
            loggedInAccount = account;
            System.out.println("Login successful.");
            homeScreen();
        } else {
            System.out.println("Invalid credentials. Please try again.");
        }
    }

    // Account creation process
    private void createAccount() {
        System.out.println("\n--- Create New Account ---");
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        if (accountsByUsername.containsKey(username)) {
            System.out.println("Username already exists. Please try again.");
            return;
        }

        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter phone number: ");
        String phoneNumber = scanner.nextLine();

        if (accountsByPhoneNumber.containsKey(phoneNumber)) {
            System.out.println("Phone number already registered.");
        } else if (accountsByEmail.containsKey(email)) {
            System.out.println("Email already registered.");
        } else {
            Account newAccount = new Account(username, password, phoneNumber, email);
            accountsByUsername.put(username, newAccount);
            accountsByPhoneNumber.put(phoneNumber, newAccount);
            accountsByEmail.put(email, newAccount);
            System.out.println("Account created successfully.");
        }
    }

    // Home screen
    private void homeScreen() {
        while (loggedInAccount != null) {
            System.out.println("\n--- Home ---");
            System.out.println("1. View Balance");
            System.out.println("2. Transfer Money");
            System.out.println("3. Add Friend");
            System.out.println("4. Link Bank Account");
            System.out.println("5. Transfer From Bank to App");
            System.out.println("6. View Friends");
            System.out.println("7. Logout");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    System.out.println("App Balance: $" + loggedInAccount.getAppBalance());
                    System.out.println("Bank Balance: $" + loggedInAccount.getBankBalance());
                    break;
                case 2:
                    transferMoney();
                    break;
                case 3:
                    addFriend();
                    break;
                case 4:
                    linkBankAccount();
                    break;
                case 5:
                    transferFromBank();
                    break;
                case 6:
                    loggedInAccount.displayFriends();
                    break;
                case 7:
                    logout();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    // Transfer money
    private void transferMoney() {
        System.out.print("Enter recipient username: ");
        String recipientUsername = scanner.nextLine();
        System.out.print("Enter amount to transfer: ");
        double amount = scanner.nextDouble();
        scanner.nextLine(); // Consume newline

        Account recipient = accountsByUsername.get(recipientUsername);
        if (recipient != null) {
            loggedInAccount.transferToUser(recipient, amount);
        } else {
            System.out.println("Recipient not found.");
        }
    }

    // Add a friend
    private void addFriend() {
        System.out.print("Enter friend's username: ");
        String friendUsername = scanner.nextLine();

        Account friend = accountsByUsername.get(friendUsername);
        if (friend != null) {
            loggedInAccount.addFriend(friend);
        } else {
            System.out.println("Friend not found.");
        }
    }

    // Link a bank account
    private void linkBankAccount() {
        System.out.print("Enter bank account number: ");
        String bankAccountNumber = scanner.nextLine();
        System.out.print("Enter bank PIN: ");
        String bankPin = scanner.nextLine();

        loggedInAccount.linkBankAccount(bankAccountNumber, bankPin);
    }

    // Transfer from bank to app balance
    private void transferFromBank() {
        System.out.print("Enter amount to transfer from bank to app: ");
        double amount = scanner.nextDouble();
        scanner.nextLine(); // Consume newline

        loggedInAccount.transferFromBank(amount);
    }

    // Logout
    private void logout() {
        loggedInAccount = null;
        System.out.println("Logged out.");
    }

    // Main method
    public static void main(String[] args) {
        CashApp app = new CashApp();
        app.start();
    }
}
