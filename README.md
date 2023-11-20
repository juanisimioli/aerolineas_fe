# Aerolineas Front End

Hello! I'm Juanisimioli, a frontend developer venturing into the blockchain ecosystem. I'm practicing by building decentralized applications (dapps) from scratch using NextJS 14 + Ethers 6.8 + Hardhat 2.19 + Solidity 0.8.18.

## Overview

This dapp facilitates the purchase of flight tickets using cryptocurrency. Each seat from one destination to another on a specific flight is represented as an NFT. This allows users to perform various actions such as canceling reservations, purchasing tickets, making free transfer reservations, or even reselling tickets at a desired price for others to buy.

<br/>

## dApp

The application is developed entirely by Juanisimioli and is available for your use. Feel free to provide feedback or even consider hiring me!

This project is crafted with cutting-edge technologies to ensure a robust and modern development experience:

- **Next.js 14:** Leveraging the power of the latest Next.js version for a seamless and efficient web application.
- **Material UI:** Employing the sleek and responsive design components of Material UI to enhance the user interface.
- **Ethers:** Utilizing Ethers to seamlessly integrate blockchain functionality, providing a secure and reliable foundation for blockchain interactions.

You can experience it live at [www.aerolineas.net.ar](https://www.aerolineas.net.ar). Please ensure you have MetaMask installed to interact with the dapp and use Sepolia Testnet.

You can also explore the backend repository [here](https://github.com/juanisimioli/aerolineas_be) (built with Hardhat 2.19 + Solidity 0.8.18).

**Note**: In the `config.js` file, you have the flexibility to tailor the allowed chain IDs for various testnets or networks. Feel free to customize these settings to align with your specific blockchain environment. Additionally, the file allows you to effortlessly update contract addresses based on your preferences. Simply modify the corresponding fields to ensure seamless integration with your chosen blockchain configurations.

## Contract ABI Location

Inside the `contract` folder, you'll find the ABI (Application Binary Interface) of the contract. In case you make any modifications to the smart contract within the [Aerolineas repository](https://github.com/juanisimioli/aerolineas_be), kindly update the ABI file by replacing it with the newly generated version.

## Installation and Development Mode

First install all dependencies

```shell
npm run install
```

Initiate the development mode

```shell
npm run dev
```

## Connect to Hardhat Network

To integrate the Hardhat network with your front-end application, you need to manually add the network to your MetaMask. Follow these steps:

1. Open MetaMask in your browser.

2. Click on the network dropdown in the top right corner of the MetaMask extension.

3. Select "Custom RPC" from the list.

4. In the "New RPC URL" field, enter the URL for the Hardhat network. This is typically `http://localhost:8545` if you are running Hardhat locally.

5. Optionally, you can provide a name for the network (e.g., "Hardhat Network").

6. In the "Chain ID" field, enter `1337` for the Hardhat network.

7. Click "Save" to add the custom network.

Now, your MetaMask is configured to connect to the Hardhat network, allowing your front-end application to interact seamlessly during development. For more detailed instructions, you can refer to the official MetaMask documentation [here](https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/).

## Contact me

I would love to hear from you! Whether you have questions, feedback, or just want to connect, please don't hesitate to reach out via email at [juanisimioli@gmail.com](mailto:juanisimioli@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/juanisimioli/). Learning together in this community is a wonderful experience, and I'm always open to feedback and collaboration.

## Demo

https://github.com/juanisimioli/aerolineas_fe/assets/48897558/d5a87636-5b7a-440d-960e-5c8f0b6436df
