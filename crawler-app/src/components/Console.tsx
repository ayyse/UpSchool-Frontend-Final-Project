import '../styles/Console.css'
import {Button, Dropdown, DropdownItem, Input} from 'semantic-ui-react';
import {useState} from "react";
function Console() {

    const [requestedAmount, setRequestedAmount] = useState(0);

    return (
        <>
            <div className="d-flex justify-content-center" style={{ marginBottom: "20px" }}>
                <Input
                    TValue="int"
                    value={requestedAmount}
                    onValueChange={setRequestedAmount}
                    style={{ width: "200px", marginRight: "20px" }}
                />

                <Dropdown style={{ marginRight: "20px" }}>
                    <DropdownItem color="Color.Primary">
                        All
                    </DropdownItem>
                </Dropdown>

                <Button primary>
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
                    <div className="title">bash -- 70x32</div>
                </div>
                <pre className="body">
                </pre>
            </div>
        </>
    )
}

export default Console;

