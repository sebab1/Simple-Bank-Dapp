const Bank = artifacts.require('Bank.sol')

contract("Bank,", async (accounts) => {
    // Testing that a user can deposit x amount in to the decentralized bank
    it("User deposits 1 ETH into the bank", async () => {
        const bank = await Bank.new()
        const depositor = accounts[3]
        const amount = web3.utils.toWei('1', 'ether')

        await bank.deposit({ from: depositor, value: amount })

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        console.log("Balance: ", balance)

        assert.equal(balance, 1)
    })

    // Testing that the user can withdraw x amount from the bank again
    it("User deposits 2 ETH to the bank and then withdraws 1", async () => {
        const bank = await Bank.new()
        const depositor = accounts[4]
        const amount = web3.utils.toWei('2', 'ether')

        let bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
        console.log("Bank total: ", bankTotalBalance)

        await bank.deposit({ from: depositor, value: amount })

        bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
        console.log("Bank total: ", bankTotalBalance)

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        
        assert.equal(balance, 2)

        const withdraw_amount = web3.utils.toWei('1', 'ether')
        await bank.withdraw(withdraw_amount, { from: depositor })

        bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
        console.log("Bank total: ", bankTotalBalance)

        balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        
        assert.equal(balance, 1)

        assert.equal(parseInt(bankTotalBalance), 1)
    })

    // Checking differrent user accounts' balance
    it("Check requester's balance", async function() {
        const bank = await Bank.new()

        // Just picking two random accounts used to test via Ganache
        const accountOne = accounts[1];
        const accountTwo = accounts[4];

        let accountOneBalance = (await web3.eth.getBalance(accountOne));
        accountOneBalance = parseFloat(web3.utils.fromWei(accountOneBalance, 'ether'))

        let accountTwoBalance = (await web3.eth.getBalance(accountTwo));
        accountTwoBalance = parseFloat(web3.utils.fromWei(accountTwoBalance, 'ether'))

        console.log("Balance of ", accountOne, " is: ", accountOneBalance, "ETH")
        console.log("Balance of ", accountTwo, " is: ", accountTwoBalance, "ETH")
    })
})