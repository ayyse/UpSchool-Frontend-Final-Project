import { useState, useEffect } from 'react';
import {Button, Dropdown, Input} from 'semantic-ui-react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { v4 as uuidv4 } from 'uuid';
import "../styles/Console.css"

const Console = () => {
    const [requestedAmount, setRequestedAmount] = useState(0);
    const [selectedCrawlType, setSelectedCrawlType] = useState('All');
    const [events, setEvents] = useState([]);

    const crawlTypes = [
        'All',
        'OnDiscount',
        'NonDiscount',
    ];

    useEffect(() => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7015/Hubs/CrawlerLogHub')
            .withAutomaticReconnect()
            .build();

        hubConnection.on('NewSeleniumLogAdded', (seleniumLogDto) => {
            setEvents((prevEvents) => [...prevEvents, seleniumLogDto]);
        });

        hubConnection.start();

        return () => {
            hubConnection.stop();
        };
    }, []);

    const createGetAllProductsOrder = async () => {
        const order = {
            id: uuidv4(),
            productCrawlType: selectedCrawlType,
        };

        await fetch('Orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });

        const hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7015/Hubs/CrawlerLogHub')
            .withAutomaticReconnect()
            .build();

        let count = 0;

        hubConnection.on('GetAll', async (productDto) => {
            switch (selectedCrawlType) {
                case 'All':
                    if (count < requestedAmount) {
                        await saveProduct(productDto, order);
                        count++;
                    }
                    break;

                case 'OnDiscount':
                    if (count < requestedAmount && productDto.isOnSale) {
                        await saveProduct(productDto, order);
                        count++;
                    }
                    break;

                case 'NonDiscount':
                    if (count < requestedAmount && !productDto.isOnSale) {
                        await saveProduct(productDto, order);
                        count++;
                    }
                    break;

                default:
                    break;
            }
        });

        hubConnection.start();
    };

    const saveProduct = async (productDto, order) => {
        const command = {
            name: productDto.name,
            picture: productDto.picture,
            price: productDto.price,
            salePrice: productDto.salePrice,
            isOnSale: productDto.isOnSale,
            orderId: order.id,
        };

        await fetch('Products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(command),
        });
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <Input
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(e.target.value)}
                    style={{ width: "200px", marginRight: "20px" }}
                />

                <Dropdown style={{ marginRight: "20px" }} text={selectedCrawlType}>
                    <Dropdown.Menu>

                        {crawlTypes.map((crawlType) => (
                            <Dropdown.Item key={crawlType} onClick={() => setSelectedCrawlType(crawlType)}>
                                {crawlType}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Button variant="primary" onClick={createGetAllProductsOrder}>
                    Start Crawl
                </Button>
            </div>
            <div className="terminal space shadow">
                <div className="top">
                    <div className="btns">
                        <span className="circle red"></span>
                        <span className="circle yellow"></span>
                        <span className="circle green"></span>
                    </div>
                    <div className="title">Crawler Logs</div>
                </div>
                <pre className="body">
          {events.map((log) => (
              <p key={log.sentOn}>{`${log.sentOn} | ${log.message}`}</p>
          ))}
        </pre>
            </div>
        </>
    );
};

export default Console;
