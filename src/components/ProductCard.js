import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';

const ProductCard = ({ item, showMore, onMoreButtonClick }) => {
    return (
        <div className="card-outer-div" key={item.lender_id}>
            <Row>
                <Col lg={4}>
                    <div className="card-left">
                        <h4>{item.lender_name}</h4>
                        <img src={item.lender_image} alt={item.lender_name} />
                        <Button className="get-offer-button" href={item.apply_url}>Get Offers</Button>
                        <p className="text-center" style={{color: "#777C81", width:"18rem"}}>on Credelio</p>
                    </div>
                </Col>

                <Col lg={8} className="card-right">
                    <div className="d-flex data">
                        <div className="blue-box-outer">
                            <div className="blue-box">
                                <p>{item.apr.min}%-{item.apr.max}%</p>
                            </div>
                            <p>Est. APR Range</p>
                        </div>
                        <div className="blue-box-outer">
                            <div className="blue-box">
                                <p>{item.apr.min}%-{item.apr.max}%</p>
                            </div>
                            <p>Mo. Payment</p>
                        </div>

                        <div className="blue-box-outer">
                            <div className="blue-box">
                                <p>{item.origination_fee.min}%-{item.origination_fee.max}%</p>
                            </div>
                            <p>origination Fee</p>
                        </div>
                    </div>

                    <h2 className="card-right-heading"><span>Good For: </span>{item.best_for}</h2>

                    <div className="pros-cons-div">
                        <h2>Pros & Cons</h2>
                        {/* <div className="list d-flex">
                           
                        </div> */}
                    </div>

                    {showMore && (
                        // Additional data to be displayed when "More" button is clicked
                        <div className="additional-content-wrapper">
                            <div className="list-wrapper">
                                <ul>
                                    {item.detailed_info.pro.split('|').map((pro, index) => (
                                        <li key={index}><TiTick /> {pro}</li>
                                    ))}
                                </ul>
                                <ul>
                                    {item.detailed_info.con.split('|').map((con, index) => (
                                        <li key={index}><RxCross2 /> {con}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="qualification-box">
                                <h3>Qualification Requirements</h3>
                                <div className="qualification-box-content d-flex">
                                    <p>Min.Credit Score: <b>{item.detailed_info.min_credit_score}</b></p>
                                    <p>Max. Dti ratio: <b>{item.detailed_info.max_debt_income_ratio}</b></p>
                                </div>
                            </div>

                            <div className="fees-box">
                                <h3>Fees & penality</h3>
                                <div className="fees-box-content d-flex">
                                    <p>Late penalities: <b>{item.detailed_info.late_penalties}</b></p>
                                    <p>Prepayment fees: <b>{item.detailed_info.prepayment_fee}</b></p>
                                    <p>Returned payment fees: <b>{item.returned_payment_fee}</b></p>
                                </div>
                            </div>

                            <div className="additional-content-btn d-flex">
                                <Button className="read-full-review" href={item.review_url}> Read Full Review</Button>
                                <Button className="get-offer-button btnn" href={item.apply_url}>Get Offers</Button>
                            </div>
                        </div>
                    )}

                    <Button className={` ${showMore ? 'less-btn' : 'more-btn'}`} onClick={onMoreButtonClick}>
                        {showMore ? "Show Less" : "More"}
                    </Button>

                </Col>
            </Row>
        </div>
    );
};

export default ProductCard;
