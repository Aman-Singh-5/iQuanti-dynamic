import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import ProductCard from "./ProductCard";

export const Landing = () => {
    const [data, setData] = useState([]);
    const [showMoreData, setShowMoreData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dev1api.credello.com/static-products');
            setData(response.data);
            // Initialize the showMoreData state with false for each card initially
            setShowMoreData(new Array(response.data.length).fill(false));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleMoreButtonClick = (index) => {
        // Create a copy of the showMoreData state array to avoid mutating the state directly
        const updatedShowMoreData = [...showMoreData];
        // Toggle the visibility of the card at the specified index
        updatedShowMoreData[index] = !updatedShowMoreData[index];
        setShowMoreData(updatedShowMoreData);
    };


    const handleSortOptionChange = (option) => {
        // Update the sort option and sort the data accordingly
        let sortedData = [...data];
        switch (option) {
            case 'APR Min':
                sortedData.sort((a, b) => a.apr.min - b.apr.min);
                break;
            case 'APR Max':
                sortedData.sort((a, b) => a.apr.max - b.apr.max);
                break;
            case 'Monthly Payment':
                sortedData.sort((a, b) => a.monthly_payment - b.monthly_payment);
                break;
            case 'Origination Fees':
                sortedData.sort((a, b) => a.origination_fee.min - b.origination_fee.min);
                break;
            default:
                // No sort option selected, use the original order
                break;
        }
        setData(sortedData);
    };


    if (data.length === 0) {
        // Loading state, you can show a loader here while data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="nav">
                            <Dropdown>
                                <Dropdown.Toggle className="nav-button" id="dropdown-basic">
                                    Sort By
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleSortOptionChange('APR Min')} href="#">APR Min</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortOptionChange('APR Max')} href="#">APR Max</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortOptionChange('Monthly Payment')} href="#">Monthly Payment</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortOptionChange('Origination Fees')} href="#">Origination Fees</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    {data.map((item, index) => (
                         <ProductCard
                         key={item.lender_id}
                         item={item}
                         showMore={showMoreData[index]}
                         onMoreButtonClick={() => handleMoreButtonClick(index)}
                     />
                 ))}
                </Container>
            </section>
        </>
    );
};
