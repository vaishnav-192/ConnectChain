// Function to post data to the backend

const PORT = 3000; // The variable 'PORT' should be set by the backend and available in the global scope.

// Construct the ROOT_NODE_ADDRESS using the fetched port number
const ROOT_NODE_ADDRESS = `http://localhost:${PORT}`;
const BLOCKCHAIN_ENDPOINT = `${ROOT_NODE_ADDRESS}/api/blocks`;
const MINE_ENDPOINT = `${ROOT_NODE_ADDRESS}/api/mine`;

async function postData() {
    const dataInput = document.getElementById('dataInput');
    const data = dataInput.value.trim();

    if (!data) {
        alert('Please enter data.');
        return;
    }

    let url = `${ROOT_NODE_ADDRESS}/api/mine`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            //throw new Error('Error posting data to the blockchain network.');
            console.log(`error`)
        }
        dataInput.value = '';
        alert('Data posted to the blockchain network successfully!');
    } catch (error) {
        console.error(error);
        alert('An error occurred while posting data to the blockchain network.');
    }
}

// Function to update the displayed messages
async function updateMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear previous messages

    let url = `${ROOT_NODE_ADDRESS}/api/blocks`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            //throw new Error('Error fetching blockchain data.');
            console.log(`error`)
        }
        const blockchain = await response.json();
        blockchain.forEach((block) => {
            const message = document.createElement('p');
            message.textContent = `Data: ${block.data}`;
            messagesDiv.appendChild(message);
        });
    } catch (error) {
        console.error(error);
        //alert('An error occurred while fetching blockchain data.');
    }
}

// Update messages every 2 seconds
setInterval(updateMessages, 2000);
